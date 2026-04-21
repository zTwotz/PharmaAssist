import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Controller, Get, UseGuards, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { RolesGuard } from '../src/auth/roles.guard';
import { PermissionsGuard } from '../src/auth/permissions.guard';
import { Roles } from '../src/auth/roles.decorator';
import { RequirePermissions } from '../src/auth/permissions.decorator';

// Create a dummy controller to test the guards
@Controller('test-rbac')
class TestRbacController {
  @Get('public')
  publicRoute() {
    return { message: 'public' };
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  protectedRoute() {
    return { message: 'protected' };
  }

  @Get('admin-only')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  adminOnly() {
    return { message: 'admin-only' };
  }

  @Get('permission-only')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('inventory.read')
  permissionOnly() {
    return { message: 'permission-only' };
  }
}

describe('Auth & RBAC Integration', () => {
  let app: INestApplication<App>;
  let mockUser: any;

  beforeAll(async () => {
    // We mock JwtAuthGuard to simply return true and inject a user based on the mockUser state
    const mockJwtGuard = {
      canActivate: (context: any) => {
        const req = context.switchToHttp().getRequest();
        if (!mockUser) {
          return false; // Unauthorized
        }
        req.user = mockUser;
        return true;
      },
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [TestRbacController],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    mockUser = null; // Reset user state
  });

  it('should allow public access', async () => {
    const response = await request(app.getHttpServer() as any).get('/test-rbac/public');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'public' });
  });

  it('should deny protected access without user', async () => {
    const response = await request(app.getHttpServer() as any).get('/test-rbac/protected');
    expect(response.status).toBe(403); // NestJS returns 403 when custom guard returns false
  });

  it('should allow protected access with user', async () => {
    mockUser = { id: '1' };
    const response = await request(app.getHttpServer() as any).get('/test-rbac/protected');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'protected' });
  });

  it('should deny admin-only access for user without Admin role', async () => {
    mockUser = { id: '1', roles: ['Staff'] };
    const response = await request(app.getHttpServer() as any).get('/test-rbac/admin-only');
    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Access denied: You do not have permission to access this resource');
  });

  it('should allow admin-only access for user with Admin role', async () => {
    mockUser = { id: '1', roles: ['Admin'] };
    const response = await request(app.getHttpServer() as any).get('/test-rbac/admin-only');
    expect(response.status).toBe(200);
  });

  it('should deny permission-only access for user without required permission', async () => {
    mockUser = { id: '1', permissions: ['pos.read'] };
    const response = await request(app.getHttpServer() as any).get('/test-rbac/permission-only');
    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Access Denied: You do not have the required permissions for this action');
  });

  it('should allow permission-only access for user with required permission', async () => {
    mockUser = { id: '1', permissions: ['inventory.read'] };
    const response = await request(app.getHttpServer() as any).get('/test-rbac/permission-only');
    expect(response.status).toBe(200);
  });
});
