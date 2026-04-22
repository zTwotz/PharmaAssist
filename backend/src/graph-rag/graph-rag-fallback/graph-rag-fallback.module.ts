import { Module } from '@nestjs/common';
import { GraphRagFallbackService } from './graph-rag-fallback.service';
import { GraphFreshnessModule } from '../../graph-sync/graph-freshness/graph-freshness.module';

@Module({
  imports: [GraphFreshnessModule],
  providers: [GraphRagFallbackService],
  exports: [GraphRagFallbackService],
})
export class GraphRagFallbackModule {}
