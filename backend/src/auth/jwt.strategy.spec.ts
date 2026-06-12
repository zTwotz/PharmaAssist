import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { UnauthorizedException, ForbiddenException } from '@nestjs/common';

jest.mock('jwks-rsa', () => ({
  passportJwtSecret: jest.fn(() => 'mock-secret'),
}));

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let prismaService: PrismaService;

  beforeEach(async () => {
    // Mock SUPABASE_URL for JwtStrategy constructor
    process.env.SUPABASE_URL = 'https://mock-supabase.com';

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validate', () => {
    it('should throw UnauthorizedException if payload is invalid', async () => {
      await expect(strategy.validate(null)).rejects.toThrow(UnauthorizedException);
      await expect(strategy.validate({})).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if user is not found in database', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
      await expect(strategy.validate({ sub: 'user-1' })).rejects.toThrow(UnauthorizedException);
    });

    it('should throw ForbiddenException if user status is not ACTIVE', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue({
        status: 'INACTIVE',
      } as any);
      await expect(strategy.validate({ sub: 'user-1' })).rejects.toThrow(ForbiddenException);
    });

    it('should return valid user payload with mustChangePassword true', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        fullName: 'Test User',
        status: 'ACTIVE',
        userRoles: [
          {
            role: {
              name: 'Staff',
              rolePermissions: [
                { permission: { code: 'pos.access' } },
              ],
            },
          },
        ],
        userProfile: {
          mustChangePassword: true,
        },
      } as any);

      const result = await strategy.validate({ sub: 'user-1' });

      expect(result).toEqual({
        id: 'user-1',
        email: 'test@example.com',
        fullName: 'Test User',
        roles: ['Staff'],
        permissions: ['pos.access'],
        mustChangePassword: true,
      });
    });

    it('should return valid user payload with mustChangePassword false if userProfile is missing', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue({
        id: 'user-1',
        email: 'test2@example.com',
        fullName: 'Test User 2',
        status: 'ACTIVE',
        userRoles: [],
        userProfile: null,
      } as any);

      const result = await strategy.validate({ sub: 'user-1' });

      expect(result).toEqual({
        id: 'user-1',
        email: 'test2@example.com',
        fullName: 'Test User 2',
        roles: [],
        permissions: [],
        mustChangePassword: false,
      });
    });
  });
});
