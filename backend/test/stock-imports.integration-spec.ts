import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import request from 'supertest';

jest.mock('jwks-rsa', () => ({
  passportJwtSecret: jest.fn(() => 'mock-secret'),
}));

import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { StockImportsService } from '../src/stock-imports/stock-imports.service';

describe('Stock Imports Management API (e2e)', () => {
  let app: INestApplication<App>;
  let mockUser: any;

  const mockStockImportsService = {
    createDraft: jest.fn().mockResolvedValue({ id: 1, status: 'DRAFT' }),
    getWarehouses: jest
      .fn()
      .mockResolvedValue([{ id: 1, name: 'Main Warehouse' }]),
    getActiveSuppliers: jest
      .fn()
      .mockResolvedValue([{ id: 1, name: 'Supplier A' }]),
    findOne: jest.fn().mockResolvedValue({ id: 1, status: 'DRAFT' }),
    confirmImport: jest.fn().mockResolvedValue({ id: 1, status: 'COMPLETED' }),
    addLine: jest.fn().mockResolvedValue({ id: 1, importId: 1 }),
    updateLine: jest.fn().mockResolvedValue({ id: 1, quantity: 10 }),
    removeLine: jest.fn().mockResolvedValue({ success: true }),
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
      .overrideProvider(StockImportsService)
      .useValue(mockStockImportsService)
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
    it('GET /stock-imports/warehouses should deny access without proper role', async () => {
      mockUser = { id: 'user1', roles: ['STAFF'] };
      const response = await request(app.getHttpServer()).get(
        '/stock-imports/warehouses',
      );
      expect(response.status).toBe(403);
    });

    it('GET /stock-imports/warehouses should allow access with WAREHOUSE role', async () => {
      mockUser = { id: 'user1', roles: ['WAREHOUSE'] };
      const response = await request(app.getHttpServer()).get(
        '/stock-imports/warehouses',
      );
      expect(response.status).toBe(200);
    });

    it('GET /stock-imports/suppliers/active should allow access with ADMIN role', async () => {
      mockUser = { id: 'user1', roles: ['ADMIN'] };
      const response = await request(app.getHttpServer()).get(
        '/stock-imports/suppliers/active',
      );
      expect(response.status).toBe(200);
    });

    it('POST /stock-imports should deny access without proper role', async () => {
      mockUser = { id: 'user1', roles: ['STAFF'] };
      const response = await request(app.getHttpServer())
        .post('/stock-imports')
        .send({ warehouseId: 1, supplierId: 1 });
      expect(response.status).toBe(403);
    });

    it('POST /stock-imports should allow access with ADMIN role', async () => {
      mockUser = { id: 'user1', roles: ['ADMIN'] };
      const response = await request(app.getHttpServer())
        .post('/stock-imports')
        .send({ warehouseId: 1, supplierId: 1 });
      expect(response.status).toBe(201);
    });

    it('POST /stock-imports/:id/confirm should allow access with WAREHOUSE role and handle batch merge', async () => {
      mockUser = { id: 'user1', roles: ['WAREHOUSE'] };
      mockStockImportsService.confirmImport.mockResolvedValueOnce({
        id: 1,
        status: 'COMPLETED',
      });
      const response = await request(app.getHttpServer()).post(
        '/stock-imports/1/confirm',
      );
      expect(response.status).toBe(201);
    });

    it('POST /stock-imports/:id/confirm should return 400 on expiry mismatch', async () => {
      mockUser = { id: 'user1', roles: ['WAREHOUSE'] };
      mockStockImportsService.confirmImport.mockRejectedValueOnce(
        new BadRequestException('Expiry mismatch'),
      );
      const response = await request(app.getHttpServer()).post(
        '/stock-imports/1/confirm',
      );
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Expiry mismatch');
    });

    it('POST /stock-imports/:id/lines should allow access with ADMIN role', async () => {
      mockUser = { id: 'user1', roles: ['ADMIN'] };
      const addLineDto = {
        medicineId: 1,
        batchNumber: 'B01',
        expiryDate: '2025-01-01',
        quantity: 10,
        importPrice: 100,
      };
      const response = await request(app.getHttpServer())
        .post('/stock-imports/1/lines')
        .send(addLineDto);
      expect(response.status).toBe(201);
    });

    it('PUT /stock-imports/:id/lines/:lineId should allow access with WAREHOUSE role', async () => {
      mockUser = { id: 'user1', roles: ['WAREHOUSE'] };
      const response = await request(app.getHttpServer())
        .put('/stock-imports/1/lines/1')
        .send({ quantity: 20 });
      expect(response.status).toBe(200);
    });

    it('DELETE /stock-imports/:id/lines/:lineId should allow access with ADMIN role', async () => {
      mockUser = { id: 'user1', roles: ['ADMIN'] };
      const response = await request(app.getHttpServer()).delete(
        '/stock-imports/1/lines/1',
      );
      expect(response.status).toBe(200);
    });
  });
});
