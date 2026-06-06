import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';

@Controller('medicines')
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

  @Get('reference-data')
  async getReferenceData() {
    return this.medicinesService.getReferenceData();
  }

  @Post()
  async createMedicine(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicinesService.createMedicine(createMedicineDto);
  }
}
