import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CheckoutDto } from './dto/checkout.dto';
import { PrismaService } from '../prisma/prisma.service';

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
}
