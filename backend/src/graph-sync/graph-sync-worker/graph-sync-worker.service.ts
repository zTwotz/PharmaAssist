import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';
import { GraphSyncEventType, GraphSyncStatus } from '../types/graph-sync.types';
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
          status: GraphSyncStatus.PENDING,
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
              status: GraphSyncStatus.PENDING,
            },
            data: {
              status: GraphSyncStatus.PROCESSING,
              updatedAt: new Date(),
            },
          });

          if (claimResult.count === 1) {
            await this.processJob(job);
          } else {
            this.logger.debug(`Job ${job.id} was already claimed or processed.`);
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
    this.logger.debug(`Processing job ${job.id} of type ${job.eventType}`);
    
    try {
      if (job.eventType === GraphSyncEventType.MEDICINE_UPSERT) {
        const payload = job.payload as any;
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
      } else if (job.eventType === GraphSyncEventType.ACTIVE_INGREDIENT_UPSERT) {
        const payload = job.payload as any;
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
      } else if (job.eventType === GraphSyncEventType.MEDICINE_INGREDIENT_MAPPING_UPSERT) {
        const payload = job.payload as any;
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
      } else if (job.eventType === GraphSyncEventType.DRUG_INTERACTION_RULE_UPSERT) {
        const payload = job.payload as any;
        const cypher = `
          MATCH (a:ActiveIngredient {id: $aId})
          MATCH (b:ActiveIngredient {id: $bId})
          MERGE (a)-[r:INTERACTS_WITH {id: $id}]-(b)
          SET r.code = $code,
              r.severity = $severity,
              r.isActive = $isActive,
              r.sourceVersion = $sourceVersion,
              r.syncedAt = timestamp()
        `;
        const params = {
          id: String(payload.id),
          code: payload.code,
          aId: String(payload.activeIngredientAId),
          bId: String(payload.activeIngredientBId),
          severity: payload.severity,
          isActive: payload.isActive,
          sourceVersion: Number(job.sourceVersion),
        };
        await this.neo4jService.write(cypher, params);
      } else {
      }

      await this.prisma.graphSyncOutbox.update({
        where: { id: job.id },
        data: {
          status: GraphSyncStatus.SUCCEEDED,
          updatedAt: new Date(),
        },
      });
      this.logger.debug(`Successfully processed job ${job.id}`);
    } catch (error) {
      this.logger.error(`Failed to process job ${job.id}`, error);
      await this.prisma.graphSyncOutbox.update({
        where: { id: job.id },
        data: {
          status: GraphSyncStatus.FAILED,
          errorSummary: error.message,
          updatedAt: new Date(),
        },
      });
    }
  }
}
