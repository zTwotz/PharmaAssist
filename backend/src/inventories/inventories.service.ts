import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InventoryCalculationsService } from './inventory-calculations.service';

@Injectable()
export class InventoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly calculations: InventoryCalculationsService,
  ) {}

  async findAll(params?: { page: number; limit: number; search: string; status: string }) {
    const { page = 1, limit = 20, search = '', status = 'ALL' } = params || {};
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.productVariant = {
        OR: [
          { sku: { contains: search, mode: 'insensitive' } },
          { variantName: { contains: search, mode: 'insensitive' } },
          { product: { name: { contains: search, mode: 'insensitive' } } },
        ]
      };
    }

    const inventories = await this.prisma.inventory.findMany({
      where,
      include: {
        productVariant: {
          include: {
            unit: true,
            product: {
              include: {
                category: true,
                medicines: {
                  include: {
                    batches: true,
                  },
                },
              },
            },
          },
        },
        store: true,
        warehouse: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    const processed = inventories.map((inv: any) => {
      const medicines = inv.productVariant?.product?.medicines || [];
      const allBatches = medicines
        .flatMap((m: { batches?: any[] }) => m.batches || [])
        .filter((b: any) => b && b.warehouseId === inv.warehouseId);

      const sellableQuantity =
        this.calculations.calculateSellableQuantity(allBatches);
      const isLowStock = this.calculations.isLowStock(
        sellableQuantity,
        inv.minQuantity,
      );

      const nearExpiryCount = allBatches.filter((b: any) =>
        this.calculations.isBatchNearExpiry(b, 90),
      ).length;
      const expiredCount = allBatches.filter((b: any) =>
        this.calculations.isBatchExpired(b),
      ).length;

      return {
        ...inv,
        quantity: sellableQuantity,
        sellableQuantity,
        isLowStock,
        totalBatches: allBatches.length,
        nearExpiryBatchesCount: nearExpiryCount,
        expiredBatchesCount: expiredCount,
      };
    });

    // Calculate stats
    const stats = {
      totalItems: processed.length,
      outOfStockCount: processed.filter((item: any) => item.quantity === 0).length,
      lowStockCount: processed.filter((item: any) => item.quantity > 0 && item.quantity <= item.minQuantity).length,
      normalStockCount: processed.filter((item: any) => item.quantity > item.minQuantity).length,
    };

    // Filter by status
    const filtered = processed.filter((item: any) => {
      if (status === 'LOW') return item.isLowStock;
      if (status === 'OUT') return item.quantity === 0;
      if (status === 'OK') return !item.isLowStock && item.quantity > 0;
      if (status === 'NEAR_EXPIRY') return item.nearExpiryBatchesCount > 0;
      if (status === 'EXPIRED') return item.expiredBatchesCount > 0;
      return true;
    });

    // Paginate
    const paginatedData = filtered.slice(skip, skip + limit);

    return {
      data: paginatedData,
      stats,
      total: filtered.length,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    const inv = await this.prisma.inventory.findUnique({
      where: { id },
      include: {
        productVariant: {
          include: {
            unit: true,
            product: {
              include: {
                category: true,
                medicines: {
                  include: {
                    batches: true,
                  },
                },
              },
            },
          },
        },
        store: true,
        warehouse: true,
      },
    });

    if (!inv) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }

    const medicines = inv.productVariant?.product?.medicines || [];
    const allBatches = medicines
      .flatMap((m: { batches?: any[] }) => m.batches || [])
      .filter((b: any) => b && b.warehouseId === inv.warehouseId);

    const sellableQuantity =
      this.calculations.calculateSellableQuantity(allBatches);
    const isLowStock = this.calculations.isLowStock(
      sellableQuantity,
      inv.minQuantity,
    );

    const nearExpiryCount = allBatches.filter((b: any) =>
      this.calculations.isBatchNearExpiry(b, 90),
    ).length;
    const expiredCount = allBatches.filter((b: any) =>
      this.calculations.isBatchExpired(b),
    ).length;

    return {
      ...inv,
      quantity: sellableQuantity,
      sellableQuantity,
      isLowStock,
      totalBatches: allBatches.length,
      nearExpiryBatchesCount: nearExpiryCount,
      expiredBatchesCount: expiredCount,
    };
  }

  async update(id: number, data: { minQuantity: number }) {
    const inventory = await this.prisma.inventory.findUnique({
      where: { id },
    });

    if (!inventory) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }

    return this.prisma.inventory.update({
      where: { id },
      data: {
        minQuantity: data.minQuantity,
      },
      include: {
        productVariant: {
          include: {
            unit: true,
            product: true,
          },
        },
      },
    });
  }

  async findBatchesByInventory(id: number) {
    const inventory: any = await this.prisma.inventory.findUnique({
      where: { id },
      include: {
        productVariant: {
          include: {
            product: {
              include: {
                medicines: {
                  include: {
                    batches: {
                      include: {
                        warehouse: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!inventory) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }

    const medicines = inventory.productVariant?.product?.medicines || [];
    const allBatches = medicines
      .flatMap((m: { batches?: any[] }) => m.batches || [])
      .filter((b: any) => b && b.warehouseId === inventory.warehouseId);

    // Sort by expiryDate ascending
    return allBatches.sort(
      (a: { expiryDate: Date | string }, b: { expiryDate: Date | string }) =>
        new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime(),
    );
  }
}
