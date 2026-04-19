import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  constructor(private prisma: PrismaService) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        'SUPABASE_URL and SUPABASE_ANON_KEY (or SUPABASE_PUBLISHABLE_KEY) must be defined in env variables',
      );
    }

    this.supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  async login(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    const { session, user } = data;

    if (!session || !user) {
      throw new UnauthorizedException('Authentication failed');
    }

    // Fetch local user profile and roles
    const userProfile = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: {
        userProfile: true,
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!userProfile) {
      throw new UnauthorizedException(
        'User profile not found in system database.',
      );
    }

    if (userProfile.status !== 'ACTIVE') {
      throw new ForbiddenException('User account is currently inactive.');
    }

    const roles = userProfile.userRoles.map((ur) => ur.role.name);
    const permissions = Array.from(
      new Set(
        userProfile.userRoles.flatMap((ur) =>
          ur.role.rolePermissions.map((rp) => rp.permission.code),
        ),
      ),
    );

    return {
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
      user: {
        id: userProfile.id,
        email: userProfile.email,
        fullName: userProfile.fullName,
        roles,
        permissions,
        mustChangePassword:
          userProfile.userProfile?.mustChangePassword ?? false,
      },
    };
  }

  async clearMustChangePassword(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        userProfile: {
          update: {
            mustChangePassword: false,
          },
        },
      },
    });
    return { success: true };
  }
}
