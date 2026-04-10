import { Module } from '@nestjs/common';
import { GraphSyncWorkerService } from './graph-sync-worker/graph-sync-worker.service';

@Module({
  providers: [GraphSyncWorkerService]
})
export class GraphSyncModule {}
