import { Module } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './inventories.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { InventoryCalculationsService } from './inventory-calculations.service';

@Module({
  imports: [PrismaModule],
  controllers: [InventoriesController],
  providers: [InventoriesService, InventoryCalculationsService],
  exports: [InventoriesService, InventoryCalculationsService],
})
export class InventoriesModule {}
