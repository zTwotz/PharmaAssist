import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { RevenueReportQueryDto } from './dto/revenue-report.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('revenue')
  @Roles('ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Get revenue report metrics' })
  getRevenueReport(@Query() query: RevenueReportQueryDto) {
    return this.reportsService.getRevenueReport(query);
  }
}
