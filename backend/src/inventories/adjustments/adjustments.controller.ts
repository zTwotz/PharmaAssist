import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AdjustmentsService } from './adjustments.service';
import {
  CreateAdjustmentDto,
  CreateAdjustmentLineDto,
} from './dto/create-adjustment.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

// PAC-178: Add Warehouse permission for create/confirm adjustment
@Controller('inventory/adjustments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdjustmentsController {
  constructor(private readonly adjustmentsService: AdjustmentsService) {}

  @Post()
  @Roles('ADMIN', 'WAREHOUSE')
  async create(@Req() req: any, @Body() createDto: CreateAdjustmentDto) {
    return this.adjustmentsService.create(req.user.id, createDto);
  }

  @Get()
  @Roles('ADMIN', 'WAREHOUSE')
  async findAll() {
    return this.adjustmentsService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'WAREHOUSE')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.adjustmentsService.findOne(id);
  }

  @Post(':id/lines')
  @Roles('ADMIN', 'WAREHOUSE')
  async addLine(
    @Param('id', ParseIntPipe) id: number,
    @Body() addLineDto: CreateAdjustmentLineDto,
  ) {
    return this.adjustmentsService.addLine(id, addLineDto);
  }

  @Post(':id/confirm')
  @Roles('ADMIN', 'WAREHOUSE')
  async confirm(@Param('id', ParseIntPipe) id: number) {
    return this.adjustmentsService.confirm(id);
  }
}
