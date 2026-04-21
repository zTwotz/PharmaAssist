import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface GraphFreshnessStatus {
  isFresh: boolean;
  reason?: string;
  pendingJobs: number;
  failedJobs: number;
}

@Injectable()
export class GraphFreshnessService {
  constructor(private prisma: PrismaService) {}

  /**
   * Evaluates the freshness of the Neo4j graph compared to the PostgreSQL database.
   * Neo4j is considered FRESH if:
   * 1. There are no PENDING jobs in GraphSyncOutbox
   * 2. There are no FAILED jobs in GraphSyncOutbox
   */
  async evaluateFreshness(): Promise<GraphFreshnessStatus> {
    const pendingJobs = await this.prisma.graphSyncOutbox.count({
      where: { status: 'PENDING' },
    });

    const failedJobs = await this.prisma.graphSyncOutbox.count({
      where: { status: 'FAILED' },
    });

    if (pendingJobs > 0) {
      return {
        isFresh: false,
        reason: 'Pending graph sync jobs exist',
        pendingJobs,
        failedJobs,
      };
    }

    if (failedJobs > 0) {
      return {
        isFresh: false,
        reason: 'Failed graph sync jobs exist',
        pendingJobs,
        failedJobs,
      };
    }

    return {
      isFresh: true,
      reason: 'Graph is fully synchronized with PostgreSQL',
      pendingJobs: 0,
      failedJobs: 0,
    };
  }

  /**
   * Detects if a node lacks a sourceVersion, making it stale.
   * This is a mock function for Neo4j node metadata verification.
   */
  verifyNodeSourceVersion(node: any): boolean {
    if (!node.properties || !node.properties.sourceVersion) {
      return false;
    }
    return true;
  }
}
