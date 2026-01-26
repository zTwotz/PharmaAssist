import { Controller, Post, Body, UseGuards, Req, Get, Param, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { StockImportsService } from './stock-imports.service';
import { CreateStockImportDto } from './dto/create-stock-import.dto';
import { AddStockImportLineDto } from './dto/add-stock-import-line.dto';
import { UpdateStockImportLineDto } from './dto/update-stock-import-line.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('stock-imports')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StockImportsController {
  constructor(private readonly stockImportsService: StockImportsService) {}

  @Post()
  @Roles('ADMIN', 'WAREHOUSE')
  createDraft(@Body() createDto: CreateStockImportDto, @Req() req: { user?: { id: string } }) {
    const userId = req.user?.id || 'SYSTEM';
    return this.stockImportsService.createDraft(createDto, userId);
  }

  @Get('warehouses')
  @Roles('ADMIN', 'WAREHOUSE')
  getWarehouses() {
    return this.stockImportsService.getWarehouses();
  }

  @Get('suppliers/active')
  @Roles('ADMIN', 'WAREHOUSE')
  getActiveSuppliers() {
    return this.stockImportsService.getActiveSuppliers();
  }

  @Get(':id')
  @Roles('ADMIN', 'WAREHOUSE')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.stockImportsService.findOne(id);
  }

  @Post(':id/lines')
  @Roles('ADMIN', 'WAREHOUSE')
  addLine(
    @Param('id', ParseIntPipe) id: number,
    @Body() addLineDto: AddStockImportLineDto,
  ) {
    return this.stockImportsService.addLine(id, addLineDto);
  }

  @Put(':id/lines/:lineId')
  @Roles('ADMIN', 'WAREHOUSE')
  updateLine(
    @Param('id', ParseIntPipe) id: number,
    @Param('lineId', ParseIntPipe) lineId: number,
    @Body() updateDto: UpdateStockImportLineDto,
  ) {
    return this.stockImportsService.updateLine(id, lineId, updateDto);
  }

  @Delete(':id/lines/:lineId')
  @Roles('ADMIN', 'WAREHOUSE')
  removeLine(
    @Param('id', ParseIntPipe) id: number,
    @Param('lineId', ParseIntPipe) lineId: number,
  ) {
    return this.stockImportsService.removeLine(id, lineId);
  }
}
