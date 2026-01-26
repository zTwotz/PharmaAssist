import { Module } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { MedicinesController } from './medicines.controller';
import { MedicineBatchesService } from './medicine-batches.service';

@Module({
  providers: [MedicinesService, MedicineBatchesService],
  controllers: [MedicinesController],
  exports: [MedicinesService, MedicineBatchesService],
})
export class MedicinesModule {}
