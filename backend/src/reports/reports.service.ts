import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  RevenueReportQueryDto,
  TopMedicinesQueryDto,
  InventoryReportQueryDto,
} from './dto/revenue-report.dto';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getRevenueReport(query: RevenueReportQueryDto) {
    const { startDate, endDate, status } = query;

    const whereClause: Record<string, unknown> = {};

    if (startDate || endDate) {
      const dateFilter: Record<string, Date> = {};
      if (startDate) dateFilter.gte = new Date(startDate);
      if (endDate) dateFilter.lte = new Date(endDate);
      whereClause.createdAt = dateFilter;
    }

    if (status) whereClause.status = status;

    // PAC-TASK-411: Revenue = sum of Order.totalAmount
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
                medicineBatch: { select: { importPrice: true } },
              },
            },
          },
        },
      },
    });

    let totalRevenue = 0;
    let totalCogs = 0;

    for (const order of orders) {
      totalRevenue += Number(order.totalAmount);
      for (const detail of order.details) {
        for (const allocation of detail.allocations) {
          totalCogs +=
            allocation.quantity * Number(allocation.medicineBatch.importPrice);
        }
      }
    }

    const grossProfit = totalRevenue - totalCogs;
    return { totalRevenue, totalCogs, grossProfit, orderCount: orders.length };
  }

  // PAC-TASK-414: Top Medicines Report — group OrderDetail by productVariant → product.name
  async getTopMedicinesReport(query: TopMedicinesQueryDto) {
    const { startDate, endDate, status, limit = 10 } = query;

    const orderWhere: Record<string, unknown> = {};
    if (startDate || endDate) {
      const dateFilter: Record<string, Date> = {};
      if (startDate) dateFilter.gte = new Date(startDate);
      if (endDate) dateFilter.lte = new Date(endDate);
      orderWhere.createdAt = dateFilter;
    }
    if (status) orderWhere.status = status;

    const orderDetails = await this.prisma.orderDetail.findMany({
      where: { order: orderWhere },
      select: {
        quantity: true,
        lineTotal: true,
        productVariant: {
          select: {
            sku: true,
            variantName: true,
            product: { select: { name: true } },
          },
        },
      },
    });

    // Aggregate by SKU
    const aggregated = new Map<
      string,
      { name: string; sku: string; quantitySold: number; revenue: number }
    >();
    for (const detail of orderDetails) {
      const sku = detail.productVariant.sku;
      const existing = aggregated.get(sku);
      if (existing) {
        existing.quantitySold += detail.quantity;
        existing.revenue += Number(detail.lineTotal);
      } else {
        aggregated.set(sku, {
          name: `${detail.productVariant.product.name} - ${detail.productVariant.variantName}`,
          sku,
          quantitySold: detail.quantity,
          revenue: Number(detail.lineTotal),
        });
      }
    }

    // Sort by quantity sold descending and take top N
    const sorted = Array.from(aggregated.values())
      .sort((a, b) => b.quantitySold - a.quantitySold)
      .slice(0, limit);

    return { items: sorted, total: aggregated.size };
  }

  // PAC-TASK-416: Inventory Report — stock levels per product variant from Inventory table
  async getInventoryReport(query: InventoryReportQueryDto) {
    const { warehouseId, stockStatus } = query;

    const whereClause: Record<string, unknown> = {};
    if (warehouseId) whereClause.warehouseId = warehouseId;

    const inventories = await this.prisma.inventory.findMany({
      where: whereClause,
      select: {
        quantity: true,
        reservedQuantity: true,
        minQuantity: true,
        warehouse: { select: { name: true } },
        productVariant: {
          select: {
            sku: true,
            variantName: true,
            product: { select: { name: true, slug: true } },
          },
        },
      },
    });

    // Map and compute stock status
    const items = inventories.map((inv) => {
      const availableQty = inv.quantity - inv.reservedQuantity;
      const computedStatus: string =
        availableQty <= inv.minQuantity ? 'low' : 'normal';
      return {
        sku: inv.productVariant.sku,
        medicineName: `${inv.productVariant.product.name} - ${inv.productVariant.variantName}`,
        slug: inv.productVariant.product.slug,
        warehouse: inv.warehouse.name,
        totalStock: inv.quantity,
        reservedQuantity: inv.reservedQuantity,
        availableQuantity: availableQty,
        minQuantity: inv.minQuantity,
        stockStatus: computedStatus,
      };
    });

    // Filter by stockStatus if requested
    const filtered =
      stockStatus && stockStatus !== 'all'
        ? items.filter((i) => i.stockStatus === stockStatus)
        : items;

    return {
      items: filtered.sort((a, b) => a.availableQuantity - b.availableQuantity),
      total: filtered.length,
    };
  }
}
