import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { GetAiAuditLogsDto } from './dto/get-ai-audit-logs.dto';

export interface CreateAiAuditLogDto {
  userId: string;
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

  async getLogs(query: GetAiAuditLogsDto) {
    const { page = 1, limit = 20, providerUsed, guardrailStatus, promptType, startDate, endDate } = query;

    const where: Prisma.AiAuditLogWhereInput = {};

    if (providerUsed) {
      where.providerUsed = providerUsed;
    }

    if (guardrailStatus) {
      where.guardrailStatus = guardrailStatus;
    }

    if (promptType) {
      where.promptType = promptType;
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate);
      }
    }

    const [items, total] = await Promise.all([
      this.prisma.aiAuditLog.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        // Only return necessary metadata, omit heavy or sensitive raw responses if requested
        select: {
          id: true,
          userId: true,
          orderId: true,
          alertId: true,
          providerRequested: true,
          providerUsed: true,
          model: true,
          promptType: true,
          promptVersion: true,
          guardrailStatus: true,
          fallbackReason: true,
          latencyMs: true,
          requestId: true,
          createdAt: true,
          // Exclude requestSummary and responseSummary to keep payload small and secure
        },
      }),
      this.prisma.aiAuditLog.count({ where }),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
