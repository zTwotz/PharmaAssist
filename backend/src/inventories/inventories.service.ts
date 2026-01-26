import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InventoryCalculationsService } from './inventory-calculations.service';

@Injectable()
export class InventoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly calculations: InventoryCalculationsService,
  ) {}

  async findAll() {
    const inventories = await this.prisma.inventory.findMany({
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

    return inventories.map((inv: any) => {
      const medicines = inv.productVariant?.product?.medicines || [];
      const allBatches = medicines
        .flatMap((m: any) => m.batches)
        .filter((b: any) => b && b.warehouseId === inv.warehouseId);

      const sellableQuantity = this.calculations.calculateSellableQuantity(allBatches);
      const isLowStock = this.calculations.isLowStock(sellableQuantity, inv.minQuantity);
      
      const nearExpiryCount = allBatches.filter((b: any) => this.calculations.isBatchNearExpiry(b, 90)).length;
      const expiredCount = allBatches.filter((b: any) => this.calculations.isBatchExpired(b)).length;

      return {
        ...inv,
        quantity: sellableQuantity, // Override with source-of-truth quantity
        sellableQuantity,
        isLowStock,
        totalBatches: allBatches.length,
        nearExpiryBatchesCount: nearExpiryCount,
        expiredBatchesCount: expiredCount,
      };
    });
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
      .flatMap((m: any) => m.batches)
      .filter((b: any) => b && b.warehouseId === inv.warehouseId);

    const sellableQuantity = this.calculations.calculateSellableQuantity(allBatches);
    const isLowStock = this.calculations.isLowStock(sellableQuantity, inv.minQuantity);
    
    const nearExpiryCount = allBatches.filter((b: any) => this.calculations.isBatchNearExpiry(b, 90)).length;
    const expiredCount = allBatches.filter((b: any) => this.calculations.isBatchExpired(b)).length;

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
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!inventory) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }

    const medicines = inventory.productVariant?.product?.medicines || [];
    const allBatches = medicines
      .flatMap((m: any) => m.batches)
      .filter((b: any) => b && b.warehouseId === inventory.warehouseId);

    // Sort by expiryDate ascending
    return allBatches.sort((a: any, b: any) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());
  }
}
