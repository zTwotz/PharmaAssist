import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UnauthorizedException, ForbiddenException } from '@nestjs/common';

// Mock Supabase
const mockSignInWithPassword = jest.fn();
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    auth: {
      signInWithPassword: mockSignInWithPassword,
    },
  })),
}));

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    process.env.SUPABASE_URL = 'https://mock-supabase.com';
    process.env.SUPABASE_ANON_KEY = 'mock-anon-key';

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should throw UnauthorizedException if supabase auth fails', async () => {
      mockSignInWithPassword.mockResolvedValue({
        data: { session: null, user: null },
        error: { message: 'Invalid credentials' },
      });

      await expect(
        service.login('test@example.com', 'password'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if local user not found', async () => {
      mockSignInWithPassword.mockResolvedValue({
        data: {
          session: { access_token: 'token', refresh_token: 'refresh' },
          user: { id: 'user-1' },
        },
        error: null,
      });

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      await expect(
        service.login('test@example.com', 'password'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw ForbiddenException if user is INACTIVE', async () => {
      mockSignInWithPassword.mockResolvedValue({
        data: {
          session: { access_token: 'token', refresh_token: 'refresh' },
          user: { id: 'user-1' },
        },
        error: null,
      });

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue({
        id: 'user-1',
        status: 'INACTIVE',
      } as any);

      await expect(
        service.login('test@example.com', 'password'),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should return valid user object and token with mustChangePassword true', async () => {
      mockSignInWithPassword.mockResolvedValue({
        data: {
          session: { access_token: 'token', refresh_token: 'refresh' },
          user: { id: 'user-1' },
        },
        error: null,
      });

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        fullName: 'Test User',
        status: 'ACTIVE',
        userRoles: [],
        userProfile: {
          mustChangePassword: true,
        },
      } as any);

      const result = await service.login('test@example.com', 'password');

      expect(result).toEqual({
        accessToken: 'token',
        refreshToken: 'refresh',
        user: {
          id: 'user-1',
          email: 'test@example.com',
          fullName: 'Test User',
          roles: [],
          permissions: [],
          mustChangePassword: true,
        },
      });
    });
  });

  describe('clearMustChangePassword', () => {
    it('should update userProfile relation with mustChangePassword = false', async () => {
      jest.spyOn(prismaService.user, 'update').mockResolvedValue({} as any);

      const result = await service.clearMustChangePassword('user-1');

      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: {
          userProfile: {
            update: {
              mustChangePassword: false,
            },
          },
        },
      });
      expect(result).toEqual({ success: true });
    });
  });
});
