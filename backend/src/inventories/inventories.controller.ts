import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('inventories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Get()
  @Roles('ADMIN', 'WAREHOUSE')
  async findAll() {
    return this.inventoriesService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'WAREHOUSE')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inventoriesService.findOne(id);
  }

  @Put(':id')
  @Roles('ADMIN', 'WAREHOUSE')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.inventoriesService.update(id, updateInventoryDto);
  }

  @Get(':id/batches')
  @Roles('ADMIN', 'WAREHOUSE')
  async getBatches(@Param('id', ParseIntPipe) id: number) {
    return this.inventoriesService.findBatchesByInventory(id);
  }
}
