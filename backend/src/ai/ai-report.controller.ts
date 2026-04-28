
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AiReportService } from './ai-report.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('admin/reports/ai-narrative')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AiReportController {
  constructor(private readonly aiReportService: AiReportService) {}

  @Get()
  @Roles('ADMIN')
  async getBusinessNarrative(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.aiReportService.generateBusinessNarrative(startDate, endDate);
  }
}
