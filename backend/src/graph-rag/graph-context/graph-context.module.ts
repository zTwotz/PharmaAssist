import { Module } from '@nestjs/common';
import { GraphContextService } from './graph-context.service';
import { PostgresContextService } from './postgres-context.service';
import { Neo4jModule } from '../../neo4j/neo4j.module';
import { GraphQueryTemplateModule } from '../graph-query-template/graph-query-template.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { GraphSyncModule } from '../../graph-sync/graph-sync.module';

@Module({
  imports: [
    Neo4jModule,
    GraphQueryTemplateModule,
    PrismaModule,
    GraphSyncModule,
  ],
  providers: [GraphContextService, PostgresContextService],
  exports: [GraphContextService, PostgresContextService],
})
export class GraphContextModule {}
