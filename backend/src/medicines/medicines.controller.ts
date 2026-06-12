import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { RequirePermissions } from '../auth/permissions.decorator';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';

@Controller('medicines')
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

  @Get('reference-data')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('VIEW_MEDICINES')
  async getReferenceData() {
    return this.medicinesService.getReferenceData();
  }

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('MANAGE_MEDICINES')
  async createMedicine(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicinesService.createMedicine(createMedicineDto);
  }
}
