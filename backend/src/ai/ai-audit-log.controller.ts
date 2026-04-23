import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AiAuditLogService } from './ai-audit-log.service';
import { GetAiAuditLogsDto } from './dto/get-ai-audit-logs.dto';
import { RequirePermissions } from '../auth/permissions.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';

@Controller('admin/ai-audit-logs')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class AiAuditLogController {
  constructor(private readonly aiAuditLogService: AiAuditLogService) {}

  @Get()
  @RequirePermissions('ai_audit.read_all')
  async getLogs(@Query() query: GetAiAuditLogsDto) {
    return this.aiAuditLogService.getLogs(query);
  }
}
