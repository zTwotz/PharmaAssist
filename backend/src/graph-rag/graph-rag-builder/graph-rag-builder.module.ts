import { Module } from '@nestjs/common';
import { GraphRagBuilderService } from './graph-rag-builder.service';
import { GraphContextModule } from '../graph-context/graph-context.module';
import { GraphSyncModule } from '../../graph-sync/graph-sync.module';

@Module({
  imports: [GraphContextModule, GraphSyncModule],
  providers: [GraphRagBuilderService],
  exports: [GraphRagBuilderService],
})
export class GraphRagBuilderModule {}
