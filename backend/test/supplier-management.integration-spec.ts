import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';

jest.mock('jwks-rsa', () => ({
  passportJwtSecret: jest.fn(() => 'mock-secret'),
}));

import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { SuppliersService } from '../src/suppliers/suppliers.service';

describe('Supplier Management API (e2e)', () => {
  let app: INestApplication<App>;
  let mockUser: any;

  const mockSuppliersService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Supplier A' }]),
    findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Supplier A' }),
    create: jest.fn().mockResolvedValue({ id: 1, name: 'Supplier A' }),
    update: jest.fn().mockResolvedValue({ id: 1, name: 'Supplier A Updated' }),
    deactivate: jest
      .fn()
      .mockResolvedValue({ id: 1, name: 'Supplier A', status: 'INACTIVE' }),
    delete: jest.fn().mockResolvedValue({ message: 'Supplier deleted' }),
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
      .overrideProvider(SuppliersService)
      .useValue(mockSuppliersService)
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

  describe('ADMIN role endpoints', () => {
    it('PATCH /suppliers/:id/deactivate should deny access without ADMIN role', async () => {
      mockUser = { id: 'user1', roles: ['WAREHOUSE'] };
      const response = await request(app.getHttpServer()).patch(
        '/suppliers/1/deactivate',
      );
      expect(response.status).toBe(403);
    });

    it('PATCH /suppliers/:id/deactivate should allow access with ADMIN role', async () => {
      mockUser = { id: 'user1', roles: ['ADMIN'] };
      const response = await request(app.getHttpServer()).patch(
        '/suppliers/1/deactivate',
      );
      expect(response.status).toBe(200);
      expect(mockSuppliersService.deactivate).toHaveBeenCalledWith(1);
    });
  });

  describe('ADMIN or WAREHOUSE role endpoints', () => {
    const createDto = {
      name: 'New Supplier',
    };

    it('GET /suppliers should deny access without proper role', async () => {
      mockUser = { id: 'user1', roles: ['STAFF'] };
      const response = await request(app.getHttpServer()).get('/suppliers');
      expect(response.status).toBe(403);
    });

    it('GET /suppliers should allow access with WAREHOUSE role', async () => {
      mockUser = { id: 'user1', roles: ['WAREHOUSE'] };
      const response = await request(app.getHttpServer()).get('/suppliers');
      expect(response.status).toBe(200);
      expect(mockSuppliersService.findAll).toHaveBeenCalled();
    });

    it('GET /suppliers/:id should allow access with ADMIN role', async () => {
      mockUser = { id: 'user1', roles: ['ADMIN'] };
      const response = await request(app.getHttpServer()).get('/suppliers/1');
      expect(response.status).toBe(200);
      expect(mockSuppliersService.findOne).toHaveBeenCalledWith(1);
    });

    it('POST /suppliers should deny access without proper role', async () => {
      mockUser = { id: 'user1', roles: ['STAFF'] };
      const response = await request(app.getHttpServer())
        .post('/suppliers')
        .send(createDto);
      expect(response.status).toBe(403);
    });

    it('POST /suppliers should allow access with WAREHOUSE role', async () => {
      mockUser = { id: 'user1', roles: ['WAREHOUSE'] };
      const response = await request(app.getHttpServer())
        .post('/suppliers')
        .send(createDto);
      expect(response.status).toBe(201);
      expect(mockSuppliersService.create).toHaveBeenCalledWith(createDto);
    });

    it('PATCH /suppliers/:id should deny access without proper role', async () => {
      mockUser = { id: 'user1', roles: ['STAFF'] };
      const response = await request(app.getHttpServer())
        .patch('/suppliers/1')
        .send({ name: 'Updated' });
      expect(response.status).toBe(403);
    });

    it('PATCH /suppliers/:id should allow access with WAREHOUSE role', async () => {
      mockUser = { id: 'user1', roles: ['WAREHOUSE'] };
      const response = await request(app.getHttpServer())
        .patch('/suppliers/1')
        .send({ name: 'Updated' });
      expect(response.status).toBe(200);
      expect(mockSuppliersService.update).toHaveBeenCalledWith(1, {
        name: 'Updated',
      });
    });

    it('DELETE /suppliers/:id should allow access with ADMIN role', async () => {
      mockUser = { id: 'user1', roles: ['ADMIN'] };
      const response = await request(app.getHttpServer()).delete(
        '/suppliers/1',
      );
      expect(response.status).toBe(200);
      expect(mockSuppliersService.delete).toHaveBeenCalledWith(1);
    });
  });
});
