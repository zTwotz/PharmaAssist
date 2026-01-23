import { Controller, Post, Body, Get, Patch, Param, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { RequirePermissions } from '../auth/permissions.decorator';

@Controller('medicines')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

  @Get('reference-data')
  @RequirePermissions('MANAGE_MEDICINES')
  async getReferenceData() {
    return this.medicinesService.getReferenceData();
  }

  @Post()
  @RequirePermissions('MANAGE_MEDICINES')
  async createMedicine(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicinesService.createMedicine(createMedicineDto);
  }

  @Get('search')
  @RequirePermissions('VIEW_MEDICINES')
  async search(@Query('term') term: string) {
    return this.medicinesService.search(term);
  }

  @Get(':id')
  @RequirePermissions('VIEW_MEDICINES')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicinesService.findOne(id);
  }

  @Patch(':id')
  @RequirePermissions('MANAGE_MEDICINES')
  async updateMedicine(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ) {
    return this.medicinesService.updateMedicine(id, updateMedicineDto);
  }

  @Patch(':id/status')
  @RequirePermissions('MANAGE_MEDICINES')
  async toggleStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
  ) {
    return this.medicinesService.toggleStatus(id, status);
  }

  @Get()
  @RequirePermissions('VIEW_MEDICINES')
  async findAll() {
    return this.medicinesService.findAll();
  }
}
