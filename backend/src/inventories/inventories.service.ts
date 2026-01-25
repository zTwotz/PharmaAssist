import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InventoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.inventory.findMany({
      include: {
        productVariant: {
          include: {
            unit: true,
            product: {
              include: {
                category: true,
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
  }

  async update(id: number, data: { quantity: number; minQuantity?: number }) {
    const inventory = await this.prisma.inventory.findUnique({
      where: { id },
      include: {
        productVariant: true,
      },
    });

    if (!inventory) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }

    const previousQuantity = inventory.quantity;

    return this.prisma.$transaction(async (tx) => {
      // 1. Update inventory
      const updated = await tx.inventory.update({
        where: { id },
        data: {
          quantity: data.quantity,
          minQuantity: data.minQuantity !== undefined ? data.minQuantity : inventory.minQuantity,
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

      // 2. Log movement if quantity changed
      if (previousQuantity !== data.quantity) {
        const type = data.quantity > previousQuantity ? 'IN' : 'OUT';
        const diff = Math.abs(data.quantity - previousQuantity);

        // Find a stock batch to link, or create a default one if none exists
        let batch = await tx.stockBatch.findFirst({
          where: { productVariantId: inventory.productVariantId },
        });

        if (!batch) {
          batch = await tx.stockBatch.create({
            data: {
              productVariantId: inventory.productVariantId,
              warehouseId: inventory.warehouseId,
              batchNumber: `BAT-ADJ-${Date.now()}`,
              quantity: data.quantity,
              manufacturingDate: new Date(),
              expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
              importPrice: 0.00,
              status: 'ACTIVE',
            },
          });
        }

        await tx.stockMovement.create({
          data: {
            productVariantId: inventory.productVariantId,
            warehouseId: inventory.warehouseId,
            batchId: batch.id,
            quantityChange: diff,
            movementType: type,
            referenceType: 'ADJUSTMENT',
            referenceId: id,
          },
        });
      }

      return updated;
    });
  }
}
