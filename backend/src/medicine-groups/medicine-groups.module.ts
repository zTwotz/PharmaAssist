import { Module } from '@nestjs/common';
import { MedicineGroupsService } from './medicine-groups.service';
import { MedicineGroupsController } from './medicine-groups.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MedicineGroupsService],
  controllers: [MedicineGroupsController]
})
export class MedicineGroupsModule {}
