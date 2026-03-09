import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MedicineBatchesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Chuẩn hóa batch number: Loại bỏ khoảng trắng thừa, chuyển thành chữ hoa
   */
  normalizeBatchNumber(batchNumber: string): string {
    if (!batchNumber) return '';
    return batchNumber.trim().toUpperCase();
  }

  /**
   * Chuẩn hóa expiry date: Đưa về 00:00:00 UTC để tránh lệch timezone
   */
  normalizeExpiryDate(expiryDate: Date | string): Date {
    const d = new Date(expiryDate);
    if (isNaN(d.getTime())) {
      throw new BadRequestException('Invalid expiry date format.');
    }
    d.setUTCHours(0, 0, 0, 0);
    return d;
  }

  /**
   * Xác thực danh tính batch và lấy batch Id nếu đã tồn tại.
   * Chặn trường hợp cùng medicineId, cùng batchNumber nhưng khác expiryDate.
   */
  async validateAndGetBatchIdentity(
    medicineId: number,
    rawBatchNumber: string,
    rawExpiryDate: Date | string,
  ): Promise<{
    batchId: number | null;
    normalizedBatch: string;
    normalizedExpiry: Date;
  }> {
    const normalizedBatch = this.normalizeBatchNumber(rawBatchNumber);
    const normalizedExpiry = this.normalizeExpiryDate(rawExpiryDate);

    if (!normalizedBatch) {
      throw new BadRequestException('Batch number cannot be empty.');
    }

    // Tìm các batch trùng medicineId và batchNumber
    const existingBatches = await this.prisma.medicineBatch.findMany({
      where: {
        medicineId,
        batchNumber: normalizedBatch,
      },
    });

    if (existingBatches.length > 0) {
      const match = existingBatches.find(
        (b) => b.expiryDate.getTime() === normalizedExpiry.getTime(),
      );

      if (match) {
        // Batch đã tồn tại, có thể merge
        return { batchId: match.id, normalizedBatch, normalizedExpiry };
      } else {
        // Cùng số lô nhưng khác hạn sử dụng -> Dữ liệu không nhất quán
        throw new BadRequestException(
          `Batch number ${normalizedBatch} for medicine ${medicineId} already exists with a different expiry date.`,
        );
      }
    }

    // Lô hoàn toàn mới
    return { batchId: null, normalizedBatch, normalizedExpiry };
  }

  async findAllByMedicine(medicineId: number) {
    return this.prisma.medicineBatch.findMany({
      where: { medicineId },
      include: {
        warehouse: true,
      },
      orderBy: { expiryDate: 'asc' },
    });
  }

  async findOne(id: number) {
    const batch = await this.prisma.medicineBatch.findUnique({
      where: { id },
      include: {
        medicine: true,
        warehouse: true,
      },
    });

    if (!batch) {
      throw new BadRequestException('Batch not found');
    }

    return batch;
  }
}
