import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CheckoutDto } from './dto/checkout.dto';
import { PrismaService } from '../prisma/prisma.service';
import {
  FefoAllocationItem,
  FefoAllocationResult,
  AllocatedBatch,
} from './checkout.types';
import * as crypto from 'crypto';

@Injectable()
export class CheckoutService {
  constructor(private readonly prisma: PrismaService) {}

  async checkout(
    user: { id: string; permissions: string[] },
    idempotencyKey: string,
    dto: CheckoutDto,
  ) {
    const requestHash = crypto
      .createHash('sha256')
      .update(JSON.stringify(dto))
      .digest('hex');

    const existingRecord = await this.prisma.idempotencyRecord.findUnique({
      where: {
        userId_operation_idempotencyKey: {
          userId: user.id,
          operation: 'CHECKOUT',
          idempotencyKey,
        },
      },
    });

    if (existingRecord) {
      if (existingRecord.requestHash !== requestHash) {
        throw new BadRequestException('IDEMPOTENCY_PAYLOAD_MISMATCH');
      }
      if (existingRecord.status === 'PROCESSING') {
        throw new BadRequestException('Request is already processing');
      }
      if (existingRecord.status === 'SUCCEEDED') {
        return existingRecord.responseSummary as any;
      }
    }

    const idempotencyRecord = await this.prisma.idempotencyRecord.upsert({
      where: {
        userId_operation_idempotencyKey: {
          userId: user.id,
          operation: 'CHECKOUT',
          idempotencyKey,
        },
      },
      update: {
        status: 'PROCESSING',
        requestHash,
      },
      create: {
        userId: user.id,
        operation: 'CHECKOUT',
        idempotencyKey,
        requestHash,
        status: 'PROCESSING',
      },
    });

    try {
      const result = await this.prisma.$transaction(async (tx) => {
        // 1. Check idempotency (PAC-TASK-267) (Handled outside transaction)

        // 2. Lock or read order (PAC-TASK-263)
        const order = await tx.order.findUnique({
          where: { id: dto.orderId },
          include: { details: true, interactionAlerts: true },
        });

        if (!order) {
          throw new BadRequestException('Order not found');
        }

        // 3. Permission & Ownership (PAC-TASK-262)
        const hasExecuteAll = user.permissions.includes('checkout.execute_all');
        if (!hasExecuteAll) {
          if (order.staffUserId !== user.id) {
            throw new ForbiddenException(
              'You do not have permission to checkout this order',
            );
          }
        }

        // 4. Validate DRAFT status (PAC-TASK-263)
        if (order.status !== 'DRAFT') {
          throw new BadRequestException('Order status is not DRAFT');
        }
        if (!order.details || order.details.length === 0) {
          throw new BadRequestException('Order has no items');
        }

        // 5. HIGH alert gate (PAC-TASK-264)
        const hasUnresolvedHighAlerts = order.interactionAlerts?.some(
          (alert) => alert.severity === 'HIGH' && !alert.isAcknowledged,
        );
        if (hasUnresolvedHighAlerts) {
          throw new BadRequestException(
            'Cannot checkout: Order has unresolved HIGH severity interaction alerts',
          );
        }

        // 6. Sellable stock validation (PAC-TASK-265)
        for (const item of order.details) {
          // Find inventory for this variant at the order's store
          const inventory = await tx.inventory.findFirst({
            where: {
              storeId: order.storeId,
              productVariantId: item.productVariantId,
            },
          });

          const totalStock = inventory ? inventory.quantity : 0;

          // Find sum of quantities in OTHER draft orders
          const otherDrafts = await tx.orderDetail.aggregate({
            _sum: {
              quantity: true,
            },
            where: {
              productVariantId: item.productVariantId,
              orderId: { not: order.id },
              order: {
                storeId: order.storeId,
                status: 'DRAFT',
              },
            },
          });

          const draftReserved = otherDrafts._sum.quantity || 0;
          const sellableStock = totalStock - draftReserved;

          if (item.quantity > sellableStock) {
            throw new BadRequestException(
              `Cannot checkout: Item quantity ${item.quantity} exceeds sellable stock ${sellableStock} for variant ${item.productVariantId}`,
            );
          }
        }

        // 7. FEFO Allocation (PAC-TASK-268 to 273)
        const allocationItems = order.details.map((d) => ({
          productVariantId: d.productVariantId,
          requiredQuantity: d.quantity,
        }));
        const fefoResults = await this.allocateFEFO(
          tx,
          order.storeId,
          allocationItems,
        );

        // 8. OrderBatchAllocation persistence (PAC-TASK-274)
        // 9. MedicineBatch deduction (PAC-TASK-275)
        for (const fefo of fefoResults) {
          const detail = order.details.find(
            (d) => d.productVariantId === fefo.productVariantId,
          );
          if (!detail) continue;

          for (const alloc of fefo.allocations) {
            await tx.orderBatchAllocation.create({
              data: {
                orderDetailId: detail.id,
                medicineBatchId: alloc.batchId,
                quantity: alloc.quantity,
              },
            });

            await tx.medicineBatch.update({
              where: { id: alloc.batchId },
              data: {
                quantity: { decrement: alloc.quantity },
              },
            });
          }
        }

        // 10. Payment persistence (PAC-TASK-276 to 279)

        // 11. Invoice persistence (PAC-TASK-280)

        // 12. Update order status to PAID (PAC-TASK-288)

        return {
          success: true,
          data: {
            order: { id: order.id, status: 'PAID' },
            message: 'Checkout simulation success',
          },
        };
      });

      await this.prisma.idempotencyRecord.update({
        where: { id: idempotencyRecord.id },
        data: {
          status: 'SUCCEEDED',
          responseSummary: result as any,
          resourceType: 'Order',
          resourceId: dto.orderId.toString(),
        },
      });

      return result;
    } catch (error) {
      await this.prisma.idempotencyRecord.update({
        where: { id: idempotencyRecord.id },
        data: {
          status: 'FAILED',
          errorCode: error.message || 'UNKNOWN_ERROR',
        },
      });
      throw error;
    }
  }

  private async allocateFEFO(
    tx: any,
    storeId: number,
    items: FefoAllocationItem[],
  ): Promise<FefoAllocationResult[]> {
    const results: FefoAllocationResult[] = [];

    const warehouse = await tx.warehouse.findFirst({
      where: { storeId },
    });

    if (!warehouse) {
      throw new BadRequestException(
        `Store ${storeId} has no warehouse for FEFO allocation`,
      );
    }

    for (const item of items) {
      const variant = await tx.productVariant.findUnique({
        where: { id: item.productVariantId },
      });

      if (!variant) {
        throw new BadRequestException(
          `Variant ${item.productVariantId} not found`,
        );
      }

      const medicine = await tx.medicine.findFirst({
        where: { productId: variant.productId },
      });

      // If it's not a medicine, we skip FEFO allocation (or handle it differently if needed)
      if (!medicine) {
        continue;
      }

      // PAC-TASK-269: Query sellable MedicineBatch for FEFO
      // PAC-TASK-270: Sort FEFO batches by nearest expiry date

      const batches = await tx.medicineBatch.findMany({
        where: {
          warehouseId: warehouse.id,
          medicineId: medicine.id,
          quantity: { gt: 0 },
        },
        orderBy: {
          // Sorted by nearest expiry date for FEFO (PAC-TASK-270)
          expiryDate: 'asc',
        },
      });

      // PAC-TASK-271: Allocate requested quantity across multiple batches
      let remainingQuantity = item.requiredQuantity;
      const allocations: AllocatedBatch[] = [];

      for (const batch of batches) {
        if (remainingQuantity <= 0) break;

        const allocateQty = Math.min(batch.quantity, remainingQuantity);
        if (allocateQty > 0) {
          allocations.push({
            batchId: batch.id,
            quantity: allocateQty,
          });
          remainingQuantity -= allocateQty;
        }
      }

      const isFulfilled = remainingQuantity === 0;

      // PAC-TASK-272: Reject FEFO allocation when sellable stock is insufficient
      if (!isFulfilled) {
        throw new BadRequestException(
          `Insufficient batches to allocate ${item.requiredQuantity} for variant ${item.productVariantId}. Shortage: ${remainingQuantity}`,
        );
      }

      results.push({
        productVariantId: item.productVariantId,
        isFulfilled,
        allocations,
        shortage: remainingQuantity,
      });
    }

    return results;
  }
}
