import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';

jest.mock('jwks-rsa', () => ({
  passportJwtSecret: jest.fn(() => 'mock-secret'),
}));

import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { AdjustmentsService } from '../src/inventories/adjustments/adjustments.service';

describe('Inventory Adjustments API (e2e)', () => {
  let app: INestApplication<App>;
  let mockUser: any;

  const mockAdjustmentsService = {
    create: jest.fn().mockResolvedValue({ id: 1, status: 'DRAFT' }),
    findAll: jest.fn().mockResolvedValue([{ id: 1, status: 'DRAFT' }]),
    findOne: jest.fn().mockResolvedValue({ id: 1, status: 'DRAFT' }),
    addLine: jest.fn().mockResolvedValue({ id: 1 }),
    confirm: jest.fn().mockResolvedValue({ id: 1, status: 'CONFIRMED' }),
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
      .overrideProvider(AdjustmentsService)
      .useValue(mockAdjustmentsService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    mockUser = null;
    jest.clearAllMocks();
  });

  describe('ADMIN or WAREHOUSE role endpoints', () => {
    it('POST /inventory/adjustments should deny access without proper role', async () => {
      mockUser = { id: 'user1', roles: ['STAFF'] };
      const response = await request(app.getHttpServer())
        .post('/inventory/adjustments')
        .send({ storeId: 1, reason: 'Lost' });
      expect(response.status).toBe(403);
    });

    it('POST /inventory/adjustments should allow access with WAREHOUSE role', async () => {
      mockUser = { id: 'user1', roles: ['WAREHOUSE'] };
      const response = await request(app.getHttpServer())
        .post('/inventory/adjustments')
        .send({ storeId: 1, reason: 'Lost' });
      expect(response.status).toBe(201);
    });

    it('POST /inventory/adjustments should return 400 if reason is missing', async () => {
      mockUser = { id: 'user1', roles: ['WAREHOUSE'] };
      const response = await request(app.getHttpServer())
        .post('/inventory/adjustments')
        .send({ storeId: 1 });
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        expect.arrayContaining(['Lý do kiểm kho là bắt buộc']),
      );
    });

    it('GET /inventory/adjustments should allow access with ADMIN role', async () => {
      mockUser = { id: 'user1', roles: ['ADMIN'] };
      const response = await request(app.getHttpServer()).get(
        '/inventory/adjustments',
      );
      expect(response.status).toBe(200);
    });

    it('GET /inventory/adjustments/:id should allow access with WAREHOUSE role', async () => {
      mockUser = { id: 'user1', roles: ['WAREHOUSE'] };
      const response = await request(app.getHttpServer()).get(
        '/inventory/adjustments/1',
      );
      expect(response.status).toBe(200);
    });

    it('POST /inventory/adjustments/:id/lines should allow access with ADMIN role', async () => {
      mockUser = { id: 'user1', roles: ['ADMIN'] };
      const addLineDto = {
        medicineId: 1,
        medicineBatchId: 1,
        expectedQuantity: 10,
        actualQuantity: 8,
        adjustmentType: 'DECREASE',
      };
      const response = await request(app.getHttpServer())
        .post('/inventory/adjustments/1/lines')
        .send(addLineDto);
      expect(response.status).toBe(201);
    });

    it('POST /inventory/adjustments/:id/confirm should allow access with WAREHOUSE role', async () => {
      mockUser = { id: 'user1', roles: ['WAREHOUSE'] };
      const response = await request(app.getHttpServer()).post(
        '/inventory/adjustments/1/confirm',
      );
      expect(response.status).toBe(201);
    });
  });
});
