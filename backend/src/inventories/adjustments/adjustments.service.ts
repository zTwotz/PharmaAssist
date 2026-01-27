import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAdjustmentDto } from './dto/create-adjustment.dto';

@Injectable()
export class AdjustmentsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createDto: CreateAdjustmentDto) {
    const { storeId, reason, note, lines } = createDto;

    const store = await this.prisma.store.findUnique({
      where: { id: storeId },
    });
    if (!store) {
      throw new BadRequestException('Store not found');
    }

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const count = await this.prisma.inventoryAdjustment.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    });
    const seq = (count + 1).toString().padStart(4, '0');
    const code = `ADJ-${dateStr}-${seq}`;

    const adjustment = await this.prisma.inventoryAdjustment.create({
      data: {
        code,
        storeId,
        createdById: userId,
        status: 'DRAFT',
        reason,
        note,
        lines: {
          create: lines?.map((line) => ({
            medicineId: line.medicineId,
            medicineBatchId: line.medicineBatchId,
            expectedQuantity: line.expectedQuantity,
            actualQuantity: line.actualQuantity,
            adjustmentType: line.adjustmentType,
          })) || [],
        },
      },
      include: {
        lines: true,
      },
    });

    return adjustment;
  }

  async findOne(id: number) {
    const adjustment = await this.prisma.inventoryAdjustment.findUnique({
      where: { id },
      include: {
        lines: {
          include: {
            medicine: true,
            medicineBatch: true,
          },
        },
        store: true,
        createdBy: true,
      },
    });

    if (!adjustment) {
      throw new BadRequestException('Inventory adjustment not found');
    }

    return adjustment;
  }

  async addLine(adjustmentId: number, dto: any) {
    const adjustment = await this.prisma.inventoryAdjustment.findUnique({
      where: { id: adjustmentId },
    });

    if (!adjustment) {
      throw new BadRequestException('Inventory adjustment not found');
    }

    if (adjustment.status !== 'DRAFT') {
      throw new BadRequestException('Can only add lines to DRAFT adjustments');
    }

    if (dto.actualQuantity < 0 || dto.expectedQuantity < 0) {
      throw new BadRequestException('Quantities cannot be negative');
    }

    let calculatedType = 'SET';
    if (dto.actualQuantity > dto.expectedQuantity) {
      calculatedType = 'INCREASE';
    } else if (dto.actualQuantity < dto.expectedQuantity) {
      calculatedType = 'DECREASE';
    }

    return this.prisma.inventoryAdjustmentLine.create({
      data: {
        adjustmentId,
        medicineId: dto.medicineId,
        medicineBatchId: dto.medicineBatchId,
        expectedQuantity: dto.expectedQuantity,
        actualQuantity: dto.actualQuantity,
        adjustmentType: calculatedType,
      },
    });
  }
}
