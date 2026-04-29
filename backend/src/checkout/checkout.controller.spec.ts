import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { ExecutionContext } from '@nestjs/common';
import { CheckoutDto, PaymentMethod } from './dto/checkout.dto';

describe('CheckoutController', () => {
  let controller: CheckoutController;
  let service: CheckoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckoutController],
      providers: [
        {
          provide: CheckoutService,
          useValue: {
            checkout: jest.fn().mockResolvedValue({
              success: true,
              data: { order: { id: 'test-order', status: 'PAID' } },
            }),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: (context: ExecutionContext) => true })
      .overrideGuard(PermissionsGuard)
      .useValue({ canActivate: (context: ExecutionContext) => true })
      .compile();

    controller = module.get<CheckoutController>(CheckoutController);
    service = module.get<CheckoutService>(CheckoutService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should process checkout successfully', async () => {
    const dto: CheckoutDto = {
      orderId: 1,
      payment: { method: PaymentMethod.CASH, amountTendered: 100000 },
    };
    const req = {
      user: { id: 'test-user', sub: 'test-user', roles: ['STAFF'] },
      headers: { 'x-idempotency-key': 'test-key' },
    };
    const result = await controller.checkout(req, 'test-key', dto);
    expect(service.checkout).toHaveBeenCalledWith(req.user, 'test-key', dto);
    expect(result.success).toBe(true);
  });
});
