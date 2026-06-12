import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    
    if (!user || !user.permissions) {
      throw new ForbiddenException({
        statusCode: 403,
        message: 'Access Denied: Missing permissions',
        error: 'Forbidden',
      });
    }

    // Require all listed permissions. Alternatively, can use some() if ANY permission is enough.
    // Given typical enterprise RBAC, if multiple are listed, usually it means ALL are required, 
    // or we can adjust logic as needed. We'll use every() here.
    const hasPermission = requiredPermissions.every((permission) => 
      user.permissions.includes(permission)
    );

    if (!hasPermission) {
      throw new ForbiddenException({
        statusCode: 403,
        message: 'Access Denied: You do not have the required permissions for this action',
        error: 'Forbidden',
        required: requiredPermissions,
      });
    }

    return true;
  }
}
