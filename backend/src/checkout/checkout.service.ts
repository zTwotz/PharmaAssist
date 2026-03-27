import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CheckoutDto } from './dto/checkout.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FefoAllocationItem, FefoAllocationResult } from './checkout.types';

@Injectable()
export class CheckoutService {
  constructor(private readonly prisma: PrismaService) {}

  async checkout(
    user: { id: string; permissions: string[] },
    idempotencyKey: string,
    dto: CheckoutDto,
  ) {
    // Implement Checkout transaction skeleton
    return this.prisma.$transaction(async (tx) => {
      // 1. Check idempotency (PAC-TASK-267)

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

      // 8. OrderBatchAllocation persistence (PAC-TASK-274)

      // 9. MedicineBatch deduction (PAC-TASK-275)

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    }

    return results;
  }
}
