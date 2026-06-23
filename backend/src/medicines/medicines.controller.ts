import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Put,
  Param,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { UpdateMedicineIngredientsDto } from './dto/update-medicine-ingredients.dto';
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

  @Get('top-selling')
  @RequirePermissions('VIEW_MEDICINES')
  async getTopSelling() {
    return this.medicinesService.getTopSelling();
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

  @Get(':id/active-ingredients')
  @RequirePermissions('VIEW_MEDICINES')
  async getIngredients(@Param('id', ParseIntPipe) id: number) {
    return this.medicinesService.getIngredients(id);
  }

  @Put(':id/active-ingredients')
  @RequirePermissions('MANAGE_MEDICINES')
  async updateIngredients(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIngredientsDto: UpdateMedicineIngredientsDto,
  ) {
    return this.medicinesService.updateIngredients(id, updateIngredientsDto);
  }

  @Get()
  @RequirePermissions('VIEW_MEDICINES')
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('categoryId') categoryId?: string,
    @Query('prescription') prescription?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    const categoryIdNum = categoryId ? parseInt(categoryId, 10) : undefined;
    return this.medicinesService.findAll({
      page: pageNum,
      limit: limitNum,
      search,
      status,
      categoryId: categoryIdNum,
      prescription,
    });
  }
}
