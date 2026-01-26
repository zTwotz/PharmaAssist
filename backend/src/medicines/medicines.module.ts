import { Module } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { MedicinesController } from './medicines.controller';
import { MedicineBatchesService } from './medicine-batches.service';
import { MedicineBatchesController } from './medicine-batches.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MedicinesController, MedicineBatchesController],
  providers: [MedicinesService, MedicineBatchesService],
  exports: [MedicinesService, MedicineBatchesService],
})
export class MedicinesModule {}
