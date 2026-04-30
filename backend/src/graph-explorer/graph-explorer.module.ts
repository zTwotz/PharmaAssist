import { Module } from '@nestjs/common';
import { GraphExplorerService } from './graph-explorer.service';
import { GraphExplorerController } from './graph-explorer.controller';
import { Neo4jModule } from '../neo4j/neo4j.module';
import { GraphSyncModule } from '../graph-sync/graph-sync.module';

@Module({
  imports: [Neo4jModule, GraphSyncModule],
  controllers: [GraphExplorerController],
  providers: [GraphExplorerService],
})
export class GraphExplorerModule {}
