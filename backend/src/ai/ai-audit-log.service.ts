import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateAiAuditLogDto {
  userId?: string;
  orderId?: number;
  alertId?: number;
  providerRequested: string;
  providerUsed: string;
  model?: string;
  promptType: string;
  promptVersion?: string;
  requestSummary?: string;
  responseSummary?: string;
  guardrailStatus?: string;
  fallbackReason?: string;
  latencyMs?: number;
  requestId?: string;
}

@Injectable()
export class AiAuditLogService {
  private readonly logger = new Logger(AiAuditLogService.name);

  constructor(private readonly prisma: PrismaService) {}

  async log(dto: CreateAiAuditLogDto): Promise<void> {
    try {
      await this.prisma.aiAuditLog.create({
        data: dto,
      });
    } catch (error) {
      this.logger.error('Failed to write AI audit log', error);
      // Fire and forget, don't throw to avoid breaking the main flow
    }
  }
}
