import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AdjustmentsService } from './adjustments.service';
import { CreateAdjustmentDto } from './dto/create-adjustment.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('inventory/adjustments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdjustmentsController {
  constructor(private readonly adjustmentsService: AdjustmentsService) {}

  @Post()
  @Roles('ADMIN', 'WAREHOUSE')
  async create(@Req() req: any, @Body() createDto: CreateAdjustmentDto) {
    return this.adjustmentsService.create(req.user.id, createDto);
  }
}
