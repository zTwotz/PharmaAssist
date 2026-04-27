import { Module } from '@nestjs/common';
import { GraphExplorerService } from './graph-explorer.service';
import { GraphExplorerController } from './graph-explorer.controller';
import { Neo4jModule } from '../neo4j/neo4j.module';

@Module({
  imports: [Neo4jModule],
  controllers: [GraphExplorerController],
  providers: [GraphExplorerService]
})
export class GraphExplorerModule {}
