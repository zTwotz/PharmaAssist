import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Neo4jService } from '../neo4j/neo4j.service';
import { GraphSyncStatus } from './types/graph-sync.types';

export interface FreshnessCheckRequest {
  aggregateType?: string;
  aggregateId?: string;
  expectedSourceVersion?: number;
}

export interface FreshnessResult {
  isStale: boolean;
  reason?: 'PENDING_OUTBOX' | 'FAILED_OUTBOX' | 'STALE_PROJECTION' | 'MISSING_PROJECTION';
}

@Injectable()
export class GraphFreshnessService {
  private readonly logger = new Logger(GraphFreshnessService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly neo4jService: Neo4jService,
  ) {}

  async checkFreshness(req?: FreshnessCheckRequest): Promise<FreshnessResult> {
    const pendingWhere: any = {
      status: { in: [GraphSyncStatus.PENDING, GraphSyncStatus.PROCESSING, GraphSyncStatus.RETRY_SCHEDULED] },
    };
    if (req?.aggregateType) pendingWhere.aggregateType = req.aggregateType;
    if (req?.aggregateId) pendingWhere.aggregateId = req.aggregateId;

    const pendingJob = await this.prisma.graphSyncOutbox.findFirst({ where: pendingWhere });
    if (pendingJob) return { isStale: true, reason: 'PENDING_OUTBOX' };

    const failedWhere: any = { status: GraphSyncStatus.FAILED };
    if (req?.aggregateType) failedWhere.aggregateType = req.aggregateType;
    if (req?.aggregateId) failedWhere.aggregateId = req.aggregateId;

    const failedJob = await this.prisma.graphSyncOutbox.findFirst({ where: failedWhere });
    if (failedJob) return { isStale: true, reason: 'FAILED_OUTBOX' };

    if (req?.aggregateType && req?.aggregateId && req?.expectedSourceVersion !== undefined) {
      let cypher = '';
      if (req.aggregateType === 'MEDICINE' || req.aggregateType === 'ACTIVE_INGREDIENT') {
        const label = req.aggregateType === 'MEDICINE' ? 'Medicine' : 'ActiveIngredient';
        cypher = `MATCH (n:${label} {id: $id}) RETURN n.sourceVersion AS sourceVersion`;
      } else if (req.aggregateType === 'DRUG_INTERACTION_RULE') {
        cypher = `MATCH ()-[r:INTERACTS_WITH {id: $id}]->() RETURN r.sourceVersion AS sourceVersion LIMIT 1`;
      } else if (req.aggregateType === 'MEDICINE_INGREDIENT_MAPPING') {
        cypher = `MATCH ()-[r:CONTAINS_INGREDIENT {id: $id}]->() RETURN r.sourceVersion AS sourceVersion LIMIT 1`;
      }

      if (cypher) {
        try {
          const result = await this.neo4jService.read(cypher, { id: req.aggregateId });
          if (!result.records || result.records.length === 0) {
            return { isStale: true, reason: 'MISSING_PROJECTION' };
          }
          
          const sourceVersionNeo4j = result.records[0].get('sourceVersion');
          let versionVal: number;
          if (typeof sourceVersionNeo4j === 'number') {
            versionVal = sourceVersionNeo4j;
          } else if (sourceVersionNeo4j && typeof sourceVersionNeo4j.toNumber === 'function') {
            versionVal = sourceVersionNeo4j.toNumber();
          } else {
            versionVal = Number(sourceVersionNeo4j);
          }

          if (versionVal < req.expectedSourceVersion) {
            return { isStale: true, reason: 'STALE_PROJECTION' };
          }
        } catch (error) {
          this.logger.error(`Error checking freshness for ${req.aggregateType} ${req.aggregateId}`, error);
          return { isStale: true, reason: 'MISSING_PROJECTION' };
        }
      }
    }

    return { isStale: false };
  }
}
