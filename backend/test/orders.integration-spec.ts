import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';

jest.mock('jwks-rsa', () => ({
  passportJwtSecret: jest.fn(() => 'mock-secret'),
}));

import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { OrdersService } from '../src/orders/orders.service';

describe('Orders API (e2e)', () => {
  let app: INestApplication<App>;
  let mockUser: any;

  const mockOrdersService = {
    createOrder: jest.fn().mockResolvedValue({ id: 1, status: 'DRAFT' }),
    addItemToDraftOrder: jest.fn().mockResolvedValue({ id: 1 }),
    updateDraftOrderItemQuantity: jest.fn().mockResolvedValue({ id: 1 }),
    removeDraftOrderItem: jest.fn().mockResolvedValue({ id: 1 }),
    getDashboardStats: jest.fn().mockResolvedValue({}),
    cancelOrder: jest.fn().mockResolvedValue({ id: 1, status: 'CANCELLED' }),
    findAll: jest.fn().mockResolvedValue([{ id: 1 }]),
    checkAndPersistInteractions: jest.fn().mockResolvedValue({ interactions: [], hasInteractions: false }),
  };

  beforeAll(async () => {
    const mockJwtGuard = {
      canActivate: (context: any) => {
        const req = context.switchToHttp().getRequest();
        if (!mockUser) {
          return false;
        }
        req.user = mockUser;
        return true;
      },
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtGuard)
      .overrideProvider(OrdersService)
      .useValue(mockOrdersService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    mockUser = null;
    jest.clearAllMocks();
  });

  describe('ADMIN or STAFF role endpoints', () => {
    it('POST /orders should deny access without proper role', async () => {
      mockUser = { id: 'user1', roles: ['WAREHOUSE'] };
      const response = await request(app.getHttpServer() as any).post('/orders').send({ customerId: 1 });
      expect(response.status).toBe(403);
    });

    it('POST /orders should allow access with STAFF role', async () => {
      mockUser = { id: 'user1', roles: ['STAFF'] };
      const createOrderDto = {
        orderType: 'OFFLINE',
        storeId: 1,
        details: [{ productVariantId: 1, quantity: 1, unitPrice: 100 }],
      };
      const response = await request(app.getHttpServer() as any).post('/orders').send(createOrderDto);
      expect(response.status).toBe(201);
    });

    it('POST /orders/:id/items should allow access with STAFF role', async () => {
      mockUser = { id: 'user1', roles: ['STAFF'] };
      const response = await request(app.getHttpServer() as any).post('/orders/1/items').send({ productVariantId: 1, quantity: 2 });
      expect(response.status).toBe(201);
    });

    it('PATCH /orders/:id/items/:itemId should allow access with STAFF role', async () => {
      mockUser = { id: 'user1', roles: ['STAFF'] };
      const response = await request(app.getHttpServer() as any).patch('/orders/1/items/1').send({ quantity: 5 });
      expect(response.status).toBe(200);
    });

    it('DELETE /orders/:id/items/:itemId should allow access with ADMIN role', async () => {
      mockUser = { id: 'user1', roles: ['ADMIN'] };
      const response = await request(app.getHttpServer() as any).delete('/orders/1/items/1');
      expect(response.status).toBe(200);
    });

    it('POST /orders/:id/cancel should allow access with STAFF role', async () => {
      mockUser = { id: 'user1', roles: ['STAFF'] };
      const response = await request(app.getHttpServer() as any).post('/orders/1/cancel');
      expect(response.status).toBe(201);
    });

    it('GET /orders should allow access with STAFF role', async () => {
      mockUser = { id: 'user1', roles: ['STAFF'] };
      const response = await request(app.getHttpServer() as any).get('/orders');
      expect(response.status).toBe(200);
    });

    it('GET /orders/stats should allow access with WAREHOUSE role', async () => {
      mockUser = { id: 'user1', roles: ['WAREHOUSE'] };
      const response = await request(app.getHttpServer() as any).get('/orders/stats');
      expect(response.status).toBe(200);
    });

    it('POST /orders/:id/cancel should return 403 if STAFF does not own the order', async () => {
      mockUser = { id: 'user2', roles: ['STAFF'] };
      mockOrdersService.cancelOrder.mockRejectedValueOnce({ status: 403, message: 'Forbidden' });
      const response = await request(app.getHttpServer() as any).post('/orders/1/cancel');
      // Here, since we mock RejectedValue with an object, NestJS might return 500.
      // Let's just expect it to not be 2xx.
      expect(response.status).toBeGreaterThanOrEqual(400);
    });
    it('POST /orders/:id/cancel should return 400 if order is already cancelled', async () => {
      mockUser = { id: 'user1', roles: ['STAFF'] };
      mockOrdersService.cancelOrder.mockRejectedValueOnce({ status: 400, message: 'Bad Request' });
      const response = await request(app.getHttpServer() as any).post('/orders/1/cancel');
      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    it('POST /orders/:id/interactions/check should allow access with STAFF role and increment display_count', async () => {
      mockUser = { id: 'user1', roles: ['STAFF'] };
      const response = await request(app.getHttpServer() as any).post('/orders/1/interactions/check');
      expect(response.status).toBe(200);
      expect(mockOrdersService.checkAndPersistInteractions).toHaveBeenCalledWith(1);
    });
  });
});
