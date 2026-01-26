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
}
