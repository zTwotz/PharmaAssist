import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { MedicineBatchesService } from './medicine-batches.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('medicine-batches')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MedicineBatchesController {
  constructor(
    private readonly medicineBatchesService: MedicineBatchesService,
  ) {}

  @Get('medicine/:medicineId')
  @Roles('ADMIN', 'WAREHOUSE')
  async findAllByMedicine(
    @Param('medicineId', ParseIntPipe) medicineId: number,
  ) {
    return this.medicineBatchesService.findAllByMedicine(medicineId);
  }

  @Get(':id')
  @Roles('ADMIN', 'WAREHOUSE')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicineBatchesService.findOne(id);
  }
}
