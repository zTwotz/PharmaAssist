import { Module } from '@nestjs/common';
import { StockImportsController } from './stock-imports.controller';
import { StockImportsService } from './stock-imports.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StockImportsController],
  providers: [StockImportsService],
  exports: [StockImportsService],
})
export class StockImportsModule {}
