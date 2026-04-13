import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RevenueReportQueryDto } from './dto/revenue-report.dto';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getRevenueReport(query: RevenueReportQueryDto) {
    const { startDate, endDate, status } = query;

    const whereClause: any = {};

    if (startDate || endDate) {
      whereClause.createdAt = {};
      if (startDate) {
        whereClause.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        whereClause.createdAt.lte = new Date(endDate);
      }
    }

    if (status) {
      whereClause.status = status;
    } else {
      // By default, only count PAID orders for revenue? 
      // If we want all, we just don't add status filter.
      // Usually revenue is based on completed/paid orders.
      // For now, let's respect the query or default to what's asked.
    }

    // PAC-TASK-411: Revenue Report calculation
    // Revenue = sum of Order.totalAmount
    // COGS = sum of OrderBatchAllocation.quantity * MedicineBatch.importPrice
    const orders = await this.prisma.order.findMany({
      where: whereClause,
      select: {
        totalAmount: true,
        details: {
          select: {
            allocations: {
              select: {
                quantity: true,
                medicineBatch: {
                  select: {
                    importPrice: true
                  }
                }
              }
            }
          }
        }
      }
    });

    let totalRevenue = 0;
    let totalCogs = 0;

    for (const order of orders) {
      totalRevenue += Number(order.totalAmount);
      
      for (const detail of order.details) {
        for (const allocation of detail.allocations) {
          totalCogs += allocation.quantity * Number(allocation.medicineBatch.importPrice);
        }
      }
    }

    const grossProfit = totalRevenue - totalCogs;

    return {
      totalRevenue,
      totalCogs,
      grossProfit,
      orderCount: orders.length
    };
  }
}
