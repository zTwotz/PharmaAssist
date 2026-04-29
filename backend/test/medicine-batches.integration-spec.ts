import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';

jest.mock('jwks-rsa', () => ({
  passportJwtSecret: jest.fn(() => 'mock-secret'),
}));

import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { MedicineBatchesService } from '../src/medicines/medicine-batches.service';

describe('MedicineBatch Management API (e2e)', () => {
  let app: INestApplication<App>;
  let mockUser: any;

  const mockMedicineBatchesService = {
    findAllByMedicine: jest
      .fn()
      .mockResolvedValue([{ id: 1, batchNumber: 'BATCH-001' }]),
    findOne: jest.fn().mockResolvedValue({ id: 1, batchNumber: 'BATCH-001' }),
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
      .overrideProvider(MedicineBatchesService)
      .useValue(mockMedicineBatchesService)
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
    it('GET /medicine-batches/medicine/:medicineId should deny access without proper role', async () => {
      mockUser = { id: 'user1', roles: ['STAFF'] };
      const response = await request(app.getHttpServer()).get(
        '/medicine-batches/medicine/1',
      );
      expect(response.status).toBe(403);
    });

    it('GET /medicine-batches/medicine/:medicineId should allow access with WAREHOUSE role', async () => {
      mockUser = { id: 'user1', roles: ['WAREHOUSE'] };
      const response = await request(app.getHttpServer()).get(
        '/medicine-batches/medicine/1',
      );
      expect(response.status).toBe(200);
      expect(mockMedicineBatchesService.findAllByMedicine).toHaveBeenCalledWith(
        1,
      );
    });

    it('GET /medicine-batches/medicine/:medicineId should allow access with ADMIN role', async () => {
      mockUser = { id: 'user1', roles: ['ADMIN'] };
      const response = await request(app.getHttpServer()).get(
        '/medicine-batches/medicine/1',
      );
      expect(response.status).toBe(200);
    });

    it('GET /medicine-batches/:id should deny access without proper role', async () => {
      mockUser = { id: 'user1', roles: ['STAFF'] };
      const response = await request(app.getHttpServer()).get(
        '/medicine-batches/1',
      );
      expect(response.status).toBe(403);
    });

    it('GET /medicine-batches/:id should allow access with ADMIN role', async () => {
      mockUser = { id: 'user1', roles: ['ADMIN'] };
      const response = await request(app.getHttpServer()).get(
        '/medicine-batches/1',
      );
      expect(response.status).toBe(200);
      expect(mockMedicineBatchesService.findOne).toHaveBeenCalledWith(1);
    });

    it('GET /medicine-batches/:id should allow access with WAREHOUSE role', async () => {
      mockUser = { id: 'user1', roles: ['WAREHOUSE'] };
      const response = await request(app.getHttpServer()).get(
        '/medicine-batches/1',
      );
      expect(response.status).toBe(200);
    });
  });
});
