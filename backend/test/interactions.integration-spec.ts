import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';

jest.mock('jwks-rsa', () => ({
  passportJwtSecret: jest.fn(() => 'mock-secret'),
}));

import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { InteractionsService } from '../src/interactions/interactions.service';

describe('Interactions API (e2e)', () => {
  let app: INestApplication<App>;
  let mockUser: any;

  const mockInteractionsService = {
    findAll: jest.fn().mockResolvedValue([]),
    createInteraction: jest.fn().mockResolvedValue({ id: 1 }),
    checkInteractions: jest.fn().mockResolvedValue([]),
    updateInteraction: jest.fn().mockResolvedValue({ id: 1 }),
    deactivateInteraction: jest.fn().mockResolvedValue({ id: 1 }),
    checkOrderInteractions: jest.fn().mockResolvedValue([]),
    acknowledgeAlert: jest.fn().mockResolvedValue({ id: 1 }),
    getAlertHistory: jest.fn().mockResolvedValue([]),
  };

  beforeAll(async () => {
    const mockJwtGuard = {
      canActivate: (context: any) => {
        const req = context.switchToHttp().getRequest();
        if (!mockUser) {
          return false;
        }
        req.user = mockUser;
        // Mock permissions if necessary, but actually permissions guard uses req.user.permissions
        // We will provide permissions in mockUser
        return true;
      },
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtGuard)
      .overrideProvider(InteractionsService)
      .useValue(mockInteractionsService)
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

  describe('DrugInteraction Rule endpoints', () => {
    it('GET /interactions should deny access without MANAGE_DRUG_INTERACTIONS permission', async () => {
      mockUser = { id: 'user1', roles: ['STAFF'], permissions: ['CREATE_ORDER'] };
      const response = await request(app.getHttpServer() as any).get('/interactions');
      expect(response.status).toBe(403);
    });

    it('GET /interactions should allow access with MANAGE_DRUG_INTERACTIONS permission', async () => {
      mockUser = { id: 'user1', roles: ['ADMIN'], permissions: ['MANAGE_DRUG_INTERACTIONS'] };
      const response = await request(app.getHttpServer() as any).get('/interactions');
      expect(response.status).toBe(200);
    });

    it('POST /interactions should allow access with MANAGE_DRUG_INTERACTIONS permission', async () => {
      mockUser = { id: 'user1', roles: ['ADMIN'], permissions: ['MANAGE_DRUG_INTERACTIONS'] };
      const createDto = {
        activeIngredientAId: 1,
        activeIngredientBId: 2,
        severity: 'HIGH',
        description: 'Test',
      };
      const response = await request(app.getHttpServer() as any).post('/interactions').send(createDto);
      expect(response.status).toBe(201);
    });

    it('PATCH /interactions/:id should allow access with MANAGE_DRUG_INTERACTIONS permission', async () => {
      mockUser = { id: 'user1', roles: ['ADMIN'], permissions: ['MANAGE_DRUG_INTERACTIONS'] };
      const response = await request(app.getHttpServer() as any).patch('/interactions/1').send({ severity: 'MEDIUM' });
      expect(response.status).toBe(200);
    });

    it('DELETE /interactions/:id should allow access with MANAGE_DRUG_INTERACTIONS permission', async () => {
      mockUser = { id: 'user1', roles: ['ADMIN'], permissions: ['MANAGE_DRUG_INTERACTIONS'] };
      const response = await request(app.getHttpServer() as any).delete('/interactions/1');
      expect(response.status).toBe(200);
    });
  });
});
