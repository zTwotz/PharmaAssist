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
          create:
            lines?.map((line) => ({
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

  async findAll() {
    return this.prisma.inventoryAdjustment.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        createdBy: true,
        store: true,
        _count: {
          select: { lines: true }
        }
      },
    });
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
  // PAC-170: Implement confirm Inventory Adjustment transaction
  // PAC-173: Lock confirmed Inventory Adjustment
  async confirm(id: number) {
    return this.prisma.$transaction(async (tx) => {
      const adjustment = await tx.inventoryAdjustment.findUnique({
        where: { id },
        include: { lines: true },
      });

      if (!adjustment) {
        throw new BadRequestException('Inventory adjustment not found');
      }
      if (adjustment.status !== 'DRAFT') {
        throw new BadRequestException('Can only confirm DRAFT adjustments');
      }

      if (!adjustment.reason) {
        throw new BadRequestException('Vui lòng chọn lý do kiểm kho');
      }
      if (adjustment.reason === 'Khác' && !adjustment.note) {
        throw new BadRequestException(
          'Vui lòng nhập ghi chú khi chọn lý do "Khác"',
        );
      }

      if (adjustment.lines.length === 0) {
        throw new BadRequestException(
          'Không thể xác nhận phiếu chưa có dữ liệu kiểm kê',
        );
      }

      for (const line of adjustment.lines) {
        // PAC-172: Prevent adjustment from making quantity negative
        if (line.actualQuantity < 0) {
          throw new BadRequestException('Số lượng sau điều chỉnh không thể âm');
        }
        // PAC-171: Update MedicineBatch through adjustment transaction only
        await tx.medicineBatch.update({
          where: { id: line.medicineBatchId },
          data: { quantity: line.actualQuantity },
        });

        const medicine = await tx.medicine.findUnique({
          where: { id: line.medicineId },
          include: { product: { include: { variants: true } } },
        });

        if (medicine && medicine.product.variants.length > 0) {
          const defaultVariant = medicine.product.variants[0];

          const allBatches = await tx.medicineBatch.findMany({
            where: { medicineId: line.medicineId },
          });

          const totalQty = allBatches.reduce((sum, b) => sum + b.quantity, 0);

          // PAC-188: Refresh Inventory Summary after adjustment confirm
          await tx.inventory.updateMany({
            where: {
              storeId: adjustment.storeId,
              productVariantId: defaultVariant.id,
            },
            data: {
              quantity: totalQty,
            },
          });
        }
      }

      // PAC-180: Write audit log for Inventory Adjustment by setting status and confirmedAt
      return tx.inventoryAdjustment.update({
        where: { id },
        data: {
          status: 'CONFIRMED',
          confirmedAt: new Date(),
        },
      });
    });
  }
}
