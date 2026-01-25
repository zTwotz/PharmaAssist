import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn(),
    clearMustChangePassword: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return session tokens from authService', async () => {
      const loginDto = { email: 'test@example.com', password: 'password123' };
      const expectedResult = {
        user: { id: 'user-1' },
        session: { access_token: 'token' },
      };
      mockAuthService.login.mockResolvedValue(expectedResult);

      const result = await controller.login(loginDto);
      expect(authService.login).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getProfile', () => {
    it('should return user object from request', async () => {
      const mockReq = {
        user: {
          id: 'user-1',
          email: 'test@example.com',
          roles: ['STAFF'],
          permissions: ['read:orders'],
        },
      };

      const result = await controller.getProfile(mockReq);
      expect(result).toEqual(mockReq.user);
    });
  });

  describe('clearMustChangePassword', () => {
    it('should call authService.clearMustChangePassword with user id', async () => {
      const mockReq = { user: { id: 'user-123' } };
      mockAuthService.clearMustChangePassword.mockResolvedValue({
        success: true,
      });

      const result = await controller.clearMustChangePassword(mockReq);
      expect(authService.clearMustChangePassword).toHaveBeenCalledWith(
        'user-123',
      );
      expect(result).toEqual({ success: true });
    });
  });
});
