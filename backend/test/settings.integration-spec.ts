import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';

jest.mock('jwks-rsa', () => ({
  passportJwtSecret: jest.fn(() => 'mock-secret'),
}));

import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { SettingsService } from '../src/settings/settings.service';

describe('Settings Management API (e2e)', () => {
  let app: INestApplication<App>;
  let mockUser: any;

  const mockSettingsService = {
    getAllSettings: jest
      .fn()
      .mockResolvedValue([{ key: 'near_expiry_threshold_days', value: '90' }]),
    getSetting: jest
      .fn()
      .mockResolvedValue({ key: 'near_expiry_threshold_days', value: '90' }),
    updateSetting: jest
      .fn()
      .mockResolvedValue({ key: 'near_expiry_threshold_days', value: '120' }),
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
      .overrideProvider(SettingsService)
      .useValue(mockSettingsService)
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
    it('GET /settings should deny access without ADMIN role', async () => {
      mockUser = { id: 'user1', roles: ['STAFF'] };
      const response = await request(app.getHttpServer()).get('/settings');
      expect(response.status).toBe(403);
    });

    it('GET /settings should allow access with ADMIN role', async () => {
      mockUser = { id: 'user1', roles: ['ADMIN'] };
      const response = await request(app.getHttpServer()).get('/settings');
      expect(response.status).toBe(200);
      expect(mockSettingsService.getAllSettings).toHaveBeenCalled();
    });

    it('GET /settings/:key should allow access with ADMIN role', async () => {
      mockUser = { id: 'user1', roles: ['ADMIN'] };
      const response = await request(app.getHttpServer()).get(
        '/settings/near_expiry_threshold_days',
      );
      expect(response.status).toBe(200);
      expect(mockSettingsService.getSetting).toHaveBeenCalledWith(
        'near_expiry_threshold_days',
      );
    });

    it('PATCH /settings/:key should deny access without ADMIN role', async () => {
      mockUser = { id: 'user1', roles: ['STAFF'] };
      const response = await request(app.getHttpServer())
        .patch('/settings/near_expiry_threshold_days')
        .send({ value: '120' });
      expect(response.status).toBe(403);
    });

    it('PATCH /settings/:key should allow access with ADMIN role', async () => {
      mockUser = { id: 'user1', roles: ['ADMIN'] };
      const response = await request(app.getHttpServer())
        .patch('/settings/near_expiry_threshold_days')
        .send({ value: '120' });
      expect(response.status).toBe(200);
      expect(mockSettingsService.updateSetting).toHaveBeenCalledWith(
        'near_expiry_threshold_days',
        '120',
      );
    });
  });
});
