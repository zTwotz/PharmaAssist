import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';

jest.mock('jwks-rsa', () => ({
  passportJwtSecret: jest.fn(() => 'mock-secret'),
}));

import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { MedicinesService } from '../src/medicines/medicines.service';

describe('Medicine Management API (e2e)', () => {
  let app: INestApplication<App>;
  let mockUser: any;

  const mockMedicinesService = {
    getReferenceData: jest.fn().mockResolvedValue({ categories: [] }),
    createMedicine: jest.fn().mockResolvedValue({ id: 1, code: 'MED001' }),
    search: jest.fn().mockResolvedValue([{ id: 1, name: 'Paracetamol' }]),
    findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Paracetamol' }),
    updateMedicine: jest
      .fn()
      .mockResolvedValue({ id: 1, name: 'Paracetamol Updated' }),
    toggleStatus: jest.fn().mockResolvedValue({ id: 1, status: 'INACTIVE' }),
    getIngredients: jest.fn().mockResolvedValue([]),
    updateIngredients: jest.fn().mockResolvedValue({ message: 'Success' }),
    findAll: jest.fn().mockResolvedValue({ data: [], total: 0 }),
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
      .overrideProvider(MedicinesService)
      .useValue(mockMedicinesService)
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

  describe('VIEW_MEDICINES permission endpoints', () => {
    it('GET /medicines/search should deny access without VIEW_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['OTHER_PERM'] };
      const response = await request(app.getHttpServer()).get(
        '/medicines/search?term=para',
      );
      expect(response.status).toBe(403);
    });

    it('GET /medicines/search should allow access with VIEW_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['VIEW_MEDICINES'] };
      const response = await request(app.getHttpServer()).get(
        '/medicines/search?term=para',
      );
      expect(response.status).toBe(200);
      expect(mockMedicinesService.search).toHaveBeenCalledWith('para');
    });

    it('GET /medicines/:id should deny access without VIEW_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['OTHER_PERM'] };
      const response = await request(app.getHttpServer()).get('/medicines/1');
      expect(response.status).toBe(403);
    });

    it('GET /medicines/:id should allow access with VIEW_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['VIEW_MEDICINES'] };
      const response = await request(app.getHttpServer()).get('/medicines/1');
      expect(response.status).toBe(200);
      expect(mockMedicinesService.findOne).toHaveBeenCalledWith(1);
    });

    it('GET /medicines/:id/active-ingredients should deny access without VIEW_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['OTHER_PERM'] };
      const response = await request(app.getHttpServer()).get(
        '/medicines/1/active-ingredients',
      );
      expect(response.status).toBe(403);
    });

    it('GET /medicines/:id/active-ingredients should allow access with VIEW_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['VIEW_MEDICINES'] };
      const response = await request(app.getHttpServer()).get(
        '/medicines/1/active-ingredients',
      );
      expect(response.status).toBe(200);
      expect(mockMedicinesService.getIngredients).toHaveBeenCalledWith(1);
    });

    it('GET /medicines should deny access without VIEW_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['OTHER_PERM'] };
      const response = await request(app.getHttpServer()).get('/medicines');
      expect(response.status).toBe(403);
    });

    it('GET /medicines should allow access with VIEW_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['VIEW_MEDICINES'] };
      const response = await request(app.getHttpServer()).get('/medicines');
      expect(response.status).toBe(200);
      expect(mockMedicinesService.findAll).toHaveBeenCalled();
    });
  });

  describe('MANAGE_MEDICINES permission endpoints', () => {
    it('GET /medicines/reference-data should deny access without MANAGE_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['VIEW_MEDICINES'] };
      const response = await request(app.getHttpServer()).get(
        '/medicines/reference-data',
      );
      expect(response.status).toBe(403);
    });

    it('GET /medicines/reference-data should allow access with MANAGE_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['MANAGE_MEDICINES'] };
      const response = await request(app.getHttpServer()).get(
        '/medicines/reference-data',
      );
      expect(response.status).toBe(200);
      expect(mockMedicinesService.getReferenceData).toHaveBeenCalled();
    });

    it('POST /medicines should deny access without MANAGE_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['VIEW_MEDICINES'] };
      const createDto = {
        code: 'MED-123',
        name: 'New Medicine',
        categoryId: 1,
        medicineCode: 'MCODE-123',
        dosageFormId: 1,
        medicineUnitId: 1,
        requiresPrescription: true,
      };
      const response = await request(app.getHttpServer())
        .post('/medicines')
        .send(createDto);
      expect(response.status).toBe(403);
    });

    it('POST /medicines should allow access with MANAGE_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['MANAGE_MEDICINES'] };
      const createDto = {
        code: 'MED-123',
        name: 'New Medicine',
        categoryId: 1,
        medicineCode: 'MCODE-123',
        dosageFormId: 1,
        medicineUnitId: 1,
        requiresPrescription: true,
      };
      const response = await request(app.getHttpServer())
        .post('/medicines')
        .send(createDto);
      expect(response.status).toBe(201);
      expect(mockMedicinesService.createMedicine).toHaveBeenCalledWith(
        createDto,
      );
    });

    it('PATCH /medicines/:id should deny access without MANAGE_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['VIEW_MEDICINES'] };
      const response = await request(app.getHttpServer())
        .patch('/medicines/1')
        .send({ name: 'Updated' });
      expect(response.status).toBe(403);
    });

    it('PATCH /medicines/:id should allow access with MANAGE_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['MANAGE_MEDICINES'] };
      const response = await request(app.getHttpServer())
        .patch('/medicines/1')
        .send({ name: 'Updated' });
      expect(response.status).toBe(200);
      expect(mockMedicinesService.updateMedicine).toHaveBeenCalledWith(1, {
        name: 'Updated',
      });
    });

    it('PATCH /medicines/:id/status should deny access without MANAGE_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['VIEW_MEDICINES'] };
      const response = await request(app.getHttpServer())
        .patch('/medicines/1/status')
        .send({ status: 'INACTIVE' });
      expect(response.status).toBe(403);
    });

    it('PATCH /medicines/:id/status should allow access with MANAGE_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['MANAGE_MEDICINES'] };
      const response = await request(app.getHttpServer())
        .patch('/medicines/1/status')
        .send({ status: 'INACTIVE' });
      expect(response.status).toBe(200);
      expect(mockMedicinesService.toggleStatus).toHaveBeenCalledWith(
        1,
        'INACTIVE',
      );
    });

    it('PUT /medicines/:id/active-ingredients should deny access without MANAGE_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['VIEW_MEDICINES'] };
      const payload = { ingredients: [] };
      const response = await request(app.getHttpServer())
        .put('/medicines/1/active-ingredients')
        .send(payload);
      expect(response.status).toBe(403);
    });

    it('PUT /medicines/:id/active-ingredients should allow access with MANAGE_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['MANAGE_MEDICINES'] };
      const payload = {
        ingredients: [{ activeIngredientId: 1, strength: '500mg' }],
      };
      const response = await request(app.getHttpServer())
        .put('/medicines/1/active-ingredients')
        .send(payload);
      expect(response.status).toBe(200);
      expect(mockMedicinesService.updateIngredients).toHaveBeenCalledWith(
        1,
        payload,
      );
    });
  });
});
