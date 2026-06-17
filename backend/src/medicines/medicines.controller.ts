import { Controller, Post, Body, Get, UseGuards, Query } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('medicines')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

  @Get('reference-data')
  @Roles('ADMIN', 'WAREHOUSE')
  async getReferenceData() {
    return this.medicinesService.getReferenceData();
  }

  @Post()
  @Roles('ADMIN', 'WAREHOUSE')
  async createMedicine(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicinesService.createMedicine(createMedicineDto);
  }

  @Get('search')
  @Roles('ADMIN', 'STAFF', 'WAREHOUSE')
  async search(@Query('term') term: string) {
    return this.medicinesService.search(term);
  }

  @Get()
  @Roles('ADMIN', 'WAREHOUSE')
  async findAll() {
    return this.medicinesService.findAll();
  }
}
