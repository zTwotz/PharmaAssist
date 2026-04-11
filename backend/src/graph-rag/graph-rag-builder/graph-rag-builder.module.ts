import { Module } from '@nestjs/common';
import { GraphRagBuilderService } from './graph-rag-builder.service';
import { GraphContextModule } from '../graph-context/graph-context.module';

@Module({
  imports: [GraphContextModule],
  providers: [GraphRagBuilderService],
  exports: [GraphRagBuilderService],
})
export class GraphRagBuilderModule {}
