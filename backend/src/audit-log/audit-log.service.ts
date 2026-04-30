import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetAuditLogsDto } from './dto/get-audit-logs.dto';

@Injectable()
export class AuditLogService {
  constructor(private readonly prisma: PrismaService) {}

  async getLogs(query: GetAuditLogsDto) {
    const {
      page = 1,
      limit = 20,
      action,
      entityType,
      userId,
      startDate,
      endDate,
    } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (action) where.action = action;
    if (entityType) where.entityType = entityType;
    if (userId) where.userId = userId;

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setUTCHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }

    const [items, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { fullName: true, email: true } } },
      }),
      this.prisma.auditLog.count({ where }),
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
