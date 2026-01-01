import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard that verifies the JWT signature and extracts user payload.
 * It uses the 'jwt' Passport strategy under the hood.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (err || !user) {
      throw new UnauthorizedException(err?.message || 'Authentication failed');
    }
    return user;
  }
}
