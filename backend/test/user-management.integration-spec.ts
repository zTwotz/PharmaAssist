import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';

jest.mock('jwks-rsa', () => ({
  passportJwtSecret: jest.fn(() => 'mock-secret'),
}));

import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { UsersService } from '../src/users/users.service';

describe('User Management Permissions (e2e)', () => {
  let app: INestApplication<App>;
  let mockUser: any;

  const mockUsersService = {
    getStaffs: jest
      .fn()
      .mockResolvedValue([{ id: 'staff1', email: 'staff1@test.com' }]),
    createStaffAccount: jest
      .fn()
      .mockResolvedValue({ id: 'staff2', email: 'staff2@test.com' }),
    updateStaffRoleStatus: jest
      .fn()
      .mockResolvedValue({ id: 'staff1', status: 'INACTIVE' }),
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
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
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

  describe('GET /users/staff', () => {
    it('should deny access if user does not have VIEW_USERS permission', async () => {
      mockUser = { id: 'user1', permissions: ['OTHER_PERM'] };
      const response = await request(app.getHttpServer()).get('/users/staff');
      expect(response.status).toBe(403);
      expect(mockUsersService.getStaffs).not.toHaveBeenCalled();
    });

    it('should allow access if user has VIEW_USERS permission', async () => {
      mockUser = { id: 'user1', permissions: ['VIEW_USERS'] };
      const response = await request(app.getHttpServer()).get('/users/staff');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { id: 'staff1', email: 'staff1@test.com' },
      ]);
      expect(mockUsersService.getStaffs).toHaveBeenCalled();
    });
  });

  describe('POST /users/staff', () => {
    const createPayload = {
      email: 'staff@test.com',
      username: 'new_staff',
      password: 'Password123!',
      fullName: 'New Staff',
      roleId: 2,
    };

    it('should deny access if user does not have MANAGE_USERS permission', async () => {
      mockUser = { id: 'user1', permissions: ['VIEW_USERS'] };
      const response = await request(app.getHttpServer())
        .post('/users/staff')
        .send(createPayload);
      expect(response.status).toBe(403);
      expect(mockUsersService.createStaffAccount).not.toHaveBeenCalled();
    });

    it('should allow access if user has MANAGE_USERS permission', async () => {
      mockUser = { id: 'user1', permissions: ['MANAGE_USERS'] };
      const response = await request(app.getHttpServer())
        .post('/users/staff')
        .send(createPayload);
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Tạo tài khoản nhân viên thành công');
      expect(mockUsersService.createStaffAccount).toHaveBeenCalledWith(
        createPayload,
      );
    });
  });

  describe('PATCH /users/staff/:id/role-status', () => {
    const updatePayload = {
      status: 'INACTIVE',
    };

    it('should deny access if user does not have MANAGE_USERS permission', async () => {
      mockUser = { id: 'user1', permissions: ['VIEW_USERS'] };
      const response = await request(app.getHttpServer())
        .patch('/users/staff/staff1/role-status')
        .send(updatePayload);
      expect(response.status).toBe(403);
      expect(mockUsersService.updateStaffRoleStatus).not.toHaveBeenCalled();
    });

    it('should allow access if user has MANAGE_USERS permission', async () => {
      mockUser = { id: 'user1', permissions: ['MANAGE_USERS'] };
      const response = await request(app.getHttpServer())
        .patch('/users/staff/staff1/role-status')
        .send(updatePayload);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Cập nhật nhân viên thành công');
      expect(mockUsersService.updateStaffRoleStatus).toHaveBeenCalledWith(
        'staff1',
        'user1',
        updatePayload,
      );
    });
  });
});
