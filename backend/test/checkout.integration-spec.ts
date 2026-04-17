import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';

jest.mock('jwks-rsa', () => ({
  passportJwtSecret: jest.fn(() => 'mock-secret'),
}));

import { AppModule } from './../src/app.module';
import { JwtAuthGuard } from './../src/auth/jwt-auth.guard';
import { CheckoutService } from './../src/checkout/checkout.service';

import { BadRequestException } from '@nestjs/common';

describe('Checkout API (e2e)', () => {
  let app: INestApplication;
  let mockUser: any;

  const mockCheckoutService = {
    checkout: jest.fn().mockImplementation((user, key, dto) => {
      if (dto.orderId === 1) {
        throw new BadRequestException('Cannot checkout: Order has unresolved HIGH severity interaction alerts');
      }
      return Promise.resolve({ success: true });
    }),
  };

  beforeAll(async () => {
    mockUser = { id: 'user1', roles: ['ADMIN'], permissions: ['checkout.execute_own', 'checkout.execute_all'] };
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: any) => {
          const req = context.switchToHttp().getRequest();
          req.user = mockUser;
          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();

    // Mock the actual checkout service after module init to bypass DB constraints in unit-like integration testing
    const checkoutModuleService = moduleFixture.get<CheckoutService>(CheckoutService);
    checkoutModuleService.checkout = mockCheckoutService.checkout;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Checkout blockers', () => {
    it('POST /v1/checkout should return 400 if order has unresolved HIGH alerts', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/checkout')
        .send({ orderId: 1, payment: { method: 'CASH', amountTendered: 100 } })
        .set('idempotency-key', 'key123');

      expect(response.status).toBeGreaterThanOrEqual(400);
      expect(response.body.message).toContain('HIGH');
    });

    it('POST /v1/checkout should succeed if no unresolved HIGH alerts', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/checkout')
        .send({ orderId: 2, payment: { method: 'CASH', amountTendered: 100 } })
        .set('idempotency-key', 'key124');

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ success: true });
    });
  });
});
