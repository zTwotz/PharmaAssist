import { UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(() => {
    guard = new JwtAuthGuard();
  });

  describe('handleRequest', () => {
    it('should throw UnauthorizedException if an error is passed', () => {
      const error = new Error('Some JWT error');
      expect(() => guard.handleRequest(error, null)).toThrow(UnauthorizedException);
      expect(() => guard.handleRequest(error, null)).toThrow('Some JWT error');
    });

    it('should throw UnauthorizedException if user is missing', () => {
      expect(() => guard.handleRequest(null, null)).toThrow(UnauthorizedException);
      expect(() => guard.handleRequest(null, null)).toThrow('Authentication failed');
    });

    it('should return user object if no error and user exists', () => {
      const mockUser = { id: 'user-1', roles: ['Admin'] };
      const result = guard.handleRequest(null, mockUser);
      expect(result).toBe(mockUser);
    });
  });
});
