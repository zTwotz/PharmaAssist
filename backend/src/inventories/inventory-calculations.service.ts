import { Injectable } from '@nestjs/common';
import { MedicineBatch } from '@prisma/client';

@Injectable()
export class InventoryCalculationsService {
  /**
   * Tính số lượng có thể bán được (sellable quantity).
   * Lô thuốc hết hạn (expired) sẽ không được tính.
   * Lô thuốc có số lượng <= 0 sẽ không được tính.
   */
  calculateSellableQuantity(
    batches: Pick<MedicineBatch, 'quantity' | 'expiryDate'>[],
    referenceDate: Date = new Date(),
  ): number {
    return batches
      .filter(
        (batch) =>
          !this.isBatchExpired(batch, referenceDate) && batch.quantity > 0,
      )
      .reduce((sum, batch) => sum + batch.quantity, 0);
  }

  /**
   * Kiểm tra lô thuốc đã hết hạn chưa.
   * Lô hết hạn nếu expiryDate < referenceDate (start of day).
   */
  isBatchExpired(
    batch: Pick<MedicineBatch, 'expiryDate'>,
    referenceDate: Date = new Date(),
  ): boolean {
    const today = new Date(referenceDate);
    today.setUTCHours(0, 0, 0, 0);

    const expiry = new Date(batch.expiryDate);
    expiry.setUTCHours(0, 0, 0, 0);

    return expiry.getTime() < today.getTime();
  }

  /**
   * Kiểm tra lô thuốc sắp hết hạn.
   * Lô sắp hết hạn nếu còn hạn sử dụng nhưng số ngày còn lại <= thresholdDays.
   */
  isBatchNearExpiry(
    batch: Pick<MedicineBatch, 'expiryDate'>,
    thresholdDays: number = 90,
    referenceDate: Date = new Date(),
  ): boolean {
    if (this.isBatchExpired(batch, referenceDate)) {
      return false; // Nếu đã expired thì không đánh dấu là near-expiry nữa để tránh trùng lặp trạng thái
    }

    const today = new Date(referenceDate);
    today.setUTCHours(0, 0, 0, 0);

    const expiry = new Date(batch.expiryDate);
    expiry.setUTCHours(0, 0, 0, 0);

    const timeDiff = expiry.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysDiff <= thresholdDays;
  }

  /**
   * Tính trạng thái sắp hết hàng.
   * Dựa trên sellable quantity so sánh với minQuantity (ngưỡng tối thiểu).
   */
  isLowStock(sellableQuantity: number, minQuantity: number): boolean {
    return sellableQuantity < minQuantity;
  }
}
