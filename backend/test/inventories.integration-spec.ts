import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';

jest.mock('jwks-rsa', () => ({
  passportJwtSecret: jest.fn(() => 'mock-secret'),
}));

import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { InventoriesService } from '../src/inventories/inventories.service';

describe('Inventories Management API (e2e)', () => {
  let app: INestApplication<App>;
  let mockUser: any;

  const mockInventoriesService = {
    findAll: jest
      .fn()
      .mockResolvedValue([{ id: 1, medicineId: 1, sellableQuantity: 100 }]),
    findOne: jest
      .fn()
      .mockResolvedValue({ id: 1, medicineId: 1, sellableQuantity: 100 }),
    update: jest
      .fn()
      .mockResolvedValue({ id: 1, medicineId: 1, sellableQuantity: 150 }),
    findBatchesByInventory: jest
      .fn()
      .mockResolvedValue([{ id: 1, batchNumber: 'BATCH-001' }]),
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
      .overrideProvider(InventoriesService)
      .useValue(mockInventoriesService)
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
    it('GET /inventories should deny access without proper role', async () => {
      mockUser = { id: 'user1', roles: ['STAFF'] };
      const response = await request(app.getHttpServer()).get('/inventories');
      expect(response.status).toBe(403);
    });

    it('GET /inventories should allow access with WAREHOUSE role', async () => {
      mockUser = { id: 'user1', roles: ['WAREHOUSE'] };
      const response = await request(app.getHttpServer()).get('/inventories');
      expect(response.status).toBe(200);
      expect(mockInventoriesService.findAll).toHaveBeenCalled();
    });

    it('GET /inventories/:id should allow access with ADMIN role', async () => {
      mockUser = { id: 'user1', roles: ['ADMIN'] };
      const response = await request(app.getHttpServer()).get('/inventories/1');
      expect(response.status).toBe(200);
      expect(mockInventoriesService.findOne).toHaveBeenCalledWith(1);
    });

    it('PUT /inventories/:id should deny access without proper role', async () => {
      mockUser = { id: 'user1', roles: ['STAFF'] };
      const response = await request(app.getHttpServer())
        .put('/inventories/1')
        .send({ minQuantity: 150 });
      expect(response.status).toBe(403);
    });

    it('PUT /inventories/:id should allow access with WAREHOUSE role', async () => {
      mockUser = { id: 'user1', roles: ['WAREHOUSE'] };
      const response = await request(app.getHttpServer())
        .put('/inventories/1')
        .send({ minQuantity: 150 });
      expect(response.status).toBe(200);
      expect(mockInventoriesService.update).toHaveBeenCalledWith(1, {
        minQuantity: 150,
      });
    });

    it('GET /inventories/:id/batches should allow access with ADMIN role', async () => {
      mockUser = { id: 'user1', roles: ['ADMIN'] };
      const response = await request(app.getHttpServer()).get(
        '/inventories/1/batches',
      );
      expect(response.status).toBe(200);
      expect(
        mockInventoriesService.findBatchesByInventory,
      ).toHaveBeenCalledWith(1);
    });
  });
});
