import { Module } from '@nestjs/common';
import { GraphContextService } from './graph-context.service';
import { Neo4jModule } from '../../neo4j/neo4j.module';
import { GraphQueryTemplateModule } from '../graph-query-template/graph-query-template.module';

@Module({
  imports: [Neo4jModule, GraphQueryTemplateModule],
  providers: [GraphContextService],
  exports: [GraphContextService],
})
export class GraphContextModule {}
