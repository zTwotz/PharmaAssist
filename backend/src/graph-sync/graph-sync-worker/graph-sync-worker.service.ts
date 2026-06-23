import { Injectable, Logger } from '@nestjs/common';
import { GraphSyncAttemptStatus } from '@prisma/client';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';
import {
  GraphSyncEventType,
  GraphSyncStatus,
  MAX_GRAPH_SYNC_RETRIES,
} from '../types/graph-sync.types';
import { Neo4jService } from '../../neo4j/neo4j.service';

@Injectable()
export class GraphSyncWorkerService {
  private readonly logger = new Logger(GraphSyncWorkerService.name);
  private isProcessing = false;

  constructor(
    private readonly prisma: PrismaService,
    private readonly neo4jService: Neo4jService,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async processPendingJobs() {
    if (this.isProcessing) {
      return;
    }
    this.isProcessing = true;

    try {
      const pendingJobs = await this.prisma.graphSyncOutbox.findMany({
        where: {
          OR: [
            { status: GraphSyncStatus.PENDING },
            {
              status: GraphSyncStatus.RETRY_SCHEDULED,
              nextRetryAt: { lte: new Date() },
            },
          ],
        },
        orderBy: {
          createdAt: 'asc',
        },
        take: 50,
      });

      if (pendingJobs.length > 0) {
        this.logger.log(`Found ${pendingJobs.length} pending graph sync jobs.`);

        for (const job of pendingJobs) {
          const claimResult = await this.prisma.graphSyncOutbox.updateMany({
            where: {
              id: job.id,
              status: job.status,
            },
            data: {
              status: GraphSyncStatus.PROCESSING,
              updatedAt: new Date(),
            },
          });

          if (claimResult.count === 1) {
            await this.processJob(job);
          } else {
            this.logger.debug(
              `Job ${job.id} was already claimed or processed.`,
            );
          }
        }
      }
    } catch (error) {
      this.logger.error('Error processing graph sync jobs', error);
    } finally {
      this.isProcessing = false;
    }
  }

  private async processJob(job: any) {
    const startedAt = new Date();
    this.logger.debug(`Processing job ${job.id} of type ${job.eventType}`);

    try {
      if (job.eventType === GraphSyncEventType.MEDICINE_UPSERT) {
        const payload = job.payload;
        const cypher = `
          MERGE (m:Medicine {id: $id})
          SET m.code = $code,
              m.name = $name,
              m.isActive = $isActive,
              m.sourceVersion = $sourceVersion,
              m.sourceUpdatedAt = $sourceUpdatedAt,
              m.syncedAt = timestamp()
        `;
        const params = {
          id: String(payload.id),
          code: payload.code,
          name: payload.name,
          isActive: payload.status === 'ACTIVE',
          sourceVersion: Number(job.sourceVersion),
          sourceUpdatedAt: job.createdAt.toISOString(),
        };
        await this.neo4jService.write(cypher, params);
      } else if (
        job.eventType === GraphSyncEventType.ACTIVE_INGREDIENT_UPSERT
      ) {
        const payload = job.payload;
        const cypher = `
          MERGE (a:ActiveIngredient {id: $id})
          SET a.code = $code,
              a.name = $name,
              a.isActive = $isActive,
              a.sourceVersion = $sourceVersion,
              a.sourceUpdatedAt = $sourceUpdatedAt,
              a.syncedAt = timestamp()
        `;
        const params = {
          id: String(payload.id),
          code: payload.code,
          name: payload.name,
          isActive: payload.status === 'ACTIVE',
          sourceVersion: Number(job.sourceVersion),
          sourceUpdatedAt: job.createdAt.toISOString(),
        };
        await this.neo4jService.write(cypher, params);
      } else if (
        job.eventType === GraphSyncEventType.MEDICINE_INGREDIENT_MAPPING_UPSERT
      ) {
        const payload = job.payload;
        const cypher = `
          MATCH (m:Medicine {id: $medicineId})
          OPTIONAL MATCH (m)-[r:CONTAINS]->()
          DELETE r
          WITH m
          UNWIND $ingredients AS ing
          MATCH (a:ActiveIngredient {id: ing.activeIngredientId})
          MERGE (m)-[new_r:CONTAINS]->(a)
          SET new_r.strength = ing.strength,
              new_r.note = ing.note,
              new_r.sourceVersion = $sourceVersion,
              new_r.syncedAt = timestamp()
        `;
        const params = {
          medicineId: String(payload.medicineId),
          ingredients: payload.ingredients.map((ing: any) => ({
            activeIngredientId: String(ing.activeIngredientId),
            strength: ing.strength,
            note: ing.note,
          })),
          sourceVersion: Number(job.sourceVersion),
        };
        await this.neo4jService.write(cypher, params);
      } else if (job.eventType === GraphSyncEventType.DRUG_INTERACTION_UPSERT) {
        const payload = job.payload;
        const cypher = `
          MATCH (a:ActiveIngredient {id: $aId})
          MATCH (b:ActiveIngredient {id: $bId})
          MERGE (a)-[r:INTERACTS_WITH {id: $id}]->(b)
          SET r.code = $code,
              r.severity = $severity,
              r.isActive = $isActive,
              r.sourceVersion = $sourceVersion,
              r.syncedAt = timestamp()
        `;
        const aIdNum = Number(payload.activeIngredientAId);
        const bIdNum = Number(payload.activeIngredientBId);
        const [aId, bId] =
          aIdNum < bIdNum ? [aIdNum, bIdNum] : [bIdNum, aIdNum];

        const params = {
          id: String(payload.id),
          code: payload.code,
          aId: String(aId),
          bId: String(bId),
          severity: payload.severity,
          isActive: payload.isActive,
          sourceVersion: Number(job.sourceVersion),
        };
        await this.neo4jService.write(cypher, params);
      } else if (job.eventType === GraphSyncEventType.MEDICINE_DEACTIVATE) {
        const payload = job.payload;
        const cypher = `
          MATCH (m:Medicine {id: $id})
          SET m.isActive = false,
              m.sourceVersion = $sourceVersion,
              m.syncedAt = timestamp()
        `;
        const params = {
          id: String(payload.id),
          sourceVersion: Number(job.sourceVersion),
        };
        await this.neo4jService.write(cypher, params);
      } else if (
        job.eventType === GraphSyncEventType.ACTIVE_INGREDIENT_DEACTIVATE
      ) {
        const payload = job.payload;
        const cypher = `
          MATCH (a:ActiveIngredient {id: $id})
          SET a.isActive = false,
              a.sourceVersion = $sourceVersion,
              a.syncedAt = timestamp()
        `;
        const params = {
          id: String(payload.id),
          sourceVersion: Number(job.sourceVersion),
        };
        await this.neo4jService.write(cypher, params);
      } else if (
        job.eventType === GraphSyncEventType.DRUG_INTERACTION_DEACTIVATE
      ) {
        const payload = job.payload;
        const cypher = `
          MATCH ()-[r:INTERACTS_WITH {id: $id}]->()
          SET r.isActive = false,
              r.sourceVersion = $sourceVersion,
              r.syncedAt = timestamp()
        `;
        const params = {
          id: String(payload.id),
          sourceVersion: Number(job.sourceVersion),
        };
        await this.neo4jService.write(cypher, params);
      } else if (job.eventType === GraphSyncEventType.GRAPH_REBUILD_REQUESTED) {
        this.logger.log(
          'Executing GRAPH_REBUILD_REQUESTED: clearing Neo4j and rebuilding...',
        );

        // 1. Clear Graph
        await this.neo4jService.write(
          'MATCH (n) WHERE n:Medicine OR n:ActiveIngredient DETACH DELETE n',
        );

        // 2. Active Ingredients
        const ingredients = await this.prisma.activeIngredient.findMany({
          where: { status: 'ACTIVE' },
        });
        for (const ing of ingredients) {
          await this.neo4jService.write(
            `
            MERGE (a:ActiveIngredient {id: $id})
            SET a.code = $code, a.name = $name, a.isActive = true, a.sourceVersion = 1, a.sourceUpdatedAt = $u, a.syncedAt = timestamp()
          `,
            {
              id: String(ing.id),
              code: ing.code,
              name: ing.name,
              u: ing.createdAt.toISOString(),
            },
          );
        }

        // 3. Medicines
        const medicines = await this.prisma.medicine.findMany({
          where: { status: 'ACTIVE' },
          include: { product: true, ingredients: true },
        });

        for (const med of medicines) {
          await this.neo4jService.write(
            `
            MERGE (m:Medicine {id: $id})
            SET m.code = $code, m.name = $name, m.isActive = true, m.sourceVersion = 1, m.sourceUpdatedAt = $u, m.syncedAt = timestamp()
          `,
            {
              id: String(med.id),
              code: med.product?.code || '',
              name: med.product?.name || '',
              u: med.createdAt.toISOString(),
            },
          );

          for (const map of med.ingredients) {
            await this.neo4jService.write(
              `
              MATCH (m:Medicine {id: $mId}), (a:ActiveIngredient {id: $aId})
              MERGE (m)-[r:CONTAINS]->(a)
              SET r.strength = $strength, r.syncedAt = timestamp()
            `,
              {
                mId: String(med.id),
                aId: String(map.activeIngredientId),
                strength: map.strength || '',
              },
            );
          }
        }

        // 4. Drug Interactions
        const interactions = await this.prisma.drugInteractionRule.findMany({
          where: { isActive: true },
        });
        for (const ix of interactions) {
          const aIdNum = Number(ix.activeIngredientAId);
          const bIdNum = Number(ix.activeIngredientBId);
          const [aId, bId] =
            aIdNum < bIdNum ? [aIdNum, bIdNum] : [bIdNum, aIdNum];
          await this.neo4jService.write(
            `
            MATCH (a:ActiveIngredient {id: $aId}), (b:ActiveIngredient {id: $bId})
            MERGE (a)-[r:INTERACTS_WITH {id: $id}]->(b)
            SET r.code = $code, r.severity = $severity, r.isActive = true, r.syncedAt = timestamp()
          `,
            {
              id: String(ix.id),
              code: ix.code,
              aId: String(aId),
              bId: String(bId),
              severity: ix.severity,
            },
          );
        }

        this.logger.log('Graph rebuild completed.');
      } else {
        this.logger.warn(`Unhandled event type: ${job.eventType}`);
      }

      const finishedAt = new Date();
      const durationMs = finishedAt.getTime() - startedAt.getTime();

      await this.prisma.$transaction([
        this.prisma.graphSyncOutbox.update({
          where: { id: job.id },
          data: {
            status: GraphSyncStatus.SUCCEEDED,
            updatedAt: new Date(),
          },
        }),
        this.prisma.graphSyncAttempt.create({
          data: {
            outboxId: job.id,
            attemptNumber: job.retryCount + 1,
            status: GraphSyncAttemptStatus.SUCCESS,
            startedAt,
            finishedAt,
            durationMs,
          },
        }),
      ]);

      this.logger.debug(`Successfully processed job ${job.id}`);
    } catch (error) {
      this.logger.error(`Failed to process job ${job.id}`, error);

      const finishedAt = new Date();
      const durationMs = finishedAt.getTime() - startedAt.getTime();
      const newRetryCount = job.retryCount + 1;

      const attemptData = {
        outboxId: job.id,
        attemptNumber: newRetryCount,
        status: GraphSyncAttemptStatus.FAILED,
        startedAt,
        finishedAt,
        durationMs,
        errorMessage: error.message,
        errorCode: error.code || null,
      };

      if (newRetryCount >= MAX_GRAPH_SYNC_RETRIES) {
        await this.prisma.$transaction([
          this.prisma.graphSyncOutbox.update({
            where: { id: job.id },
            data: {
              status: GraphSyncStatus.FAILED,
              retryCount: newRetryCount,
              lastErrorMessage: error.message,
              updatedAt: new Date(),
            },
          }),
          this.prisma.graphSyncAttempt.create({ data: attemptData }),
        ]);
      } else {
        const backoffMinutes =
          newRetryCount === 1 ? 1 : newRetryCount === 2 ? 5 : 15;
        const nextRetryAt = new Date(Date.now() + backoffMinutes * 60000);

        await this.prisma.$transaction([
          this.prisma.graphSyncOutbox.update({
            where: { id: job.id },
            data: {
              status: GraphSyncStatus.RETRY_SCHEDULED,
              retryCount: newRetryCount,
              nextRetryAt,
              lastErrorMessage: error.message,
              updatedAt: new Date(),
            },
          }),
          this.prisma.graphSyncAttempt.create({ data: attemptData }),
        ]);
      }
    }
  }
}
