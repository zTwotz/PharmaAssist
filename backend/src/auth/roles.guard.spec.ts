import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: jest.Mocked<Reflector>;

  beforeEach(() => {
    reflector = {
      getAllAndOverride: jest.fn(),
    } as unknown as jest.Mocked<Reflector>;
    guard = new RolesGuard(reflector);
  });

  const mockExecutionContext = (user?: any): ExecutionContext => {
    return {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          user,
        }),
      }),
    } as unknown as ExecutionContext;
  };

  it('should return true if no roles are required', () => {
    reflector.getAllAndOverride.mockReturnValue(undefined);
    const context = mockExecutionContext();
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should return true if required roles is empty array', () => {
    reflector.getAllAndOverride.mockReturnValue([]);
    const context = mockExecutionContext();
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should throw ForbiddenException if user is missing', () => {
    reflector.getAllAndOverride.mockReturnValue(['Admin']);
    const context = mockExecutionContext(undefined);
    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    expect(() => guard.canActivate(context)).toThrow('Access denied: No role mapping found for this user session');
  });

  it('should throw ForbiddenException if user has no roles array', () => {
    reflector.getAllAndOverride.mockReturnValue(['Admin']);
    const context = mockExecutionContext({ id: 'user1' });
    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    expect(() => guard.canActivate(context)).toThrow('Access denied: No role mapping found for this user session');
  });

  it('should return true if user has at least one required role', () => {
    reflector.getAllAndOverride.mockReturnValue(['Admin', 'Staff']);
    const context = mockExecutionContext({
      id: 'user1',
      roles: ['Staff'],
    });
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should throw ForbiddenException if user does not have any of the required roles', () => {
    reflector.getAllAndOverride.mockReturnValue(['Admin', 'Manager']);
    const context = mockExecutionContext({
      id: 'user1',
      roles: ['Staff'],
    });
    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    expect(() => guard.canActivate(context)).toThrow('Access denied: You do not have permission to access this resource');
  });
});
