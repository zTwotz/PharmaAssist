import { Module } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './inventories.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InventoriesController],
  providers: [InventoriesService],
  exports: [InventoriesService],
})
export class InventoriesModule {}
