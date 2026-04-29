import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';

jest.mock('jwks-rsa', () => ({
  passportJwtSecret: jest.fn(() => 'mock-secret'),
}));

import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { ActiveIngredientsService } from '../src/active-ingredients/active-ingredients.service';

describe('Active Ingredient Mapping API (e2e)', () => {
  let app: INestApplication<App>;
  let mockUser: any;

  const mockActiveIngredientsService = {
    create: jest.fn().mockResolvedValue({ id: 1, name: 'Paracetamol' }),
    update: jest.fn().mockResolvedValue({ id: 1, name: 'Paracetamol Updated' }),
    findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Paracetamol' }),
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
      .overrideProvider(ActiveIngredientsService)
      .useValue(mockActiveIngredientsService)
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
    it('GET /active-ingredients/:id should deny access without VIEW_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['OTHER_PERM'] };
      const response = await request(app.getHttpServer()).get(
        '/active-ingredients/1',
      );
      expect(response.status).toBe(403);
    });

    it('GET /active-ingredients/:id should allow access with VIEW_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['VIEW_MEDICINES'] };
      const response = await request(app.getHttpServer()).get(
        '/active-ingredients/1',
      );
      expect(response.status).toBe(200);
      expect(mockActiveIngredientsService.findOne).toHaveBeenCalledWith(1);
    });

    it('GET /active-ingredients should deny access without VIEW_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['OTHER_PERM'] };
      const response = await request(app.getHttpServer()).get(
        '/active-ingredients',
      );
      expect(response.status).toBe(403);
    });

    it('GET /active-ingredients should allow access with VIEW_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['VIEW_MEDICINES'] };
      const response = await request(app.getHttpServer()).get(
        '/active-ingredients',
      );
      expect(response.status).toBe(200);
      expect(mockActiveIngredientsService.findAll).toHaveBeenCalled();
    });
  });

  describe('MANAGE_MEDICINES permission endpoints', () => {
    const createDto = {
      name: 'New Ingredient',
      description: 'Test',
    };

    it('POST /active-ingredients should deny access without MANAGE_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['VIEW_MEDICINES'] };
      const response = await request(app.getHttpServer())
        .post('/active-ingredients')
        .send(createDto);
      expect(response.status).toBe(403);
    });

    it('POST /active-ingredients should allow access with MANAGE_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['MANAGE_MEDICINES'] };
      const response = await request(app.getHttpServer())
        .post('/active-ingredients')
        .send(createDto);
      expect(response.status).toBe(201);
      expect(mockActiveIngredientsService.create).toHaveBeenCalledWith(
        createDto,
      );
    });

    it('PATCH /active-ingredients/:id should deny access without MANAGE_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['VIEW_MEDICINES'] };
      const response = await request(app.getHttpServer())
        .patch('/active-ingredients/1')
        .send({ name: 'Updated' });
      expect(response.status).toBe(403);
    });

    it('PATCH /active-ingredients/:id should allow access with MANAGE_MEDICINES', async () => {
      mockUser = { id: 'user1', permissions: ['MANAGE_MEDICINES'] };
      const response = await request(app.getHttpServer())
        .patch('/active-ingredients/1')
        .send({ name: 'Updated' });
      expect(response.status).toBe(200);
      expect(mockActiveIngredientsService.update).toHaveBeenCalledWith(1, {
        name: 'Updated',
      });
    });
  });
});
