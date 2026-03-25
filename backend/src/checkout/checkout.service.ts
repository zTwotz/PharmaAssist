import { Injectable } from '@nestjs/common';
import { CheckoutDto } from './dto/checkout.dto';

@Injectable()
export class CheckoutService {
  checkout(userId: string, idempotencyKey: string, dto: CheckoutDto) {
    // To be implemented in PAC-TASK-261
    return {
      success: true,
      data: {
        order: { id: dto.orderId, status: 'PAID' },
        message: 'Checkout simulation success',
      },
    };
  }
}
