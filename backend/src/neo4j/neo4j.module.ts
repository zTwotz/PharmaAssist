import { Module, Global } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { Neo4jController } from './neo4j.controller';

@Global()
@Module({
  providers: [Neo4jService],
  exports: [Neo4jService],
  controllers: [Neo4jController],
})
export class Neo4jModule {}
