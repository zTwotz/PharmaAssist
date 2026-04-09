import { Module } from '@nestjs/common';
import { GraphSyncWorkerService } from './graph-sync-worker/graph-sync-worker.service';
import { GraphFreshnessService } from './graph-freshness.service';

@Module({
  providers: [GraphSyncWorkerService, GraphFreshnessService],
  exports: [GraphFreshnessService],
})
export class GraphSyncModule {}
