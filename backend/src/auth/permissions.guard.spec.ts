import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsGuard } from './permissions.guard';

describe('PermissionsGuard', () => {
  let guard: PermissionsGuard;
  let reflector: jest.Mocked<Reflector>;

  beforeEach(() => {
    reflector = {
      getAllAndOverride: jest.fn(),
    } as unknown as jest.Mocked<Reflector>;
    guard = new PermissionsGuard(reflector);
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

  it('should return true if no permissions are required', () => {
    reflector.getAllAndOverride.mockReturnValue(undefined);
    const context = mockExecutionContext();
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should return true if required permissions is empty array', () => {
    reflector.getAllAndOverride.mockReturnValue([]);
    const context = mockExecutionContext();
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should throw ForbiddenException if user is missing', () => {
    reflector.getAllAndOverride.mockReturnValue(['read:data']);
    const context = mockExecutionContext(undefined);
    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    expect(() => guard.canActivate(context)).toThrow('Access Denied: Missing permissions');
  });

  it('should throw ForbiddenException if user has no permissions array', () => {
    reflector.getAllAndOverride.mockReturnValue(['read:data']);
    const context = mockExecutionContext({ id: 'user1' });
    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    expect(() => guard.canActivate(context)).toThrow('Access Denied: Missing permissions');
  });

  it('should return true if user has all required permissions', () => {
    reflector.getAllAndOverride.mockReturnValue(['read:data', 'write:data']);
    const context = mockExecutionContext({
      id: 'user1',
      permissions: ['read:data', 'write:data', 'delete:data'],
    });
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should throw ForbiddenException if user is missing some required permissions', () => {
    reflector.getAllAndOverride.mockReturnValue(['read:data', 'write:data']);
    const context = mockExecutionContext({
      id: 'user1',
      permissions: ['read:data'], // Missing write:data
    });
    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    expect(() => guard.canActivate(context)).toThrow('Access Denied: You do not have the required permissions for this action');
  });
});
