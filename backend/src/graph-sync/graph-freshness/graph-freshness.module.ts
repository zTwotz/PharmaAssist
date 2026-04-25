import { Module } from '@nestjs/common';
import { GraphFreshnessService } from './graph-freshness.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [GraphFreshnessService],
  exports: [GraphFreshnessService],
})
export class GraphFreshnessModule {}
