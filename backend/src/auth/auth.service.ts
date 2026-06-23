import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;
  private supabaseAdmin: SupabaseClient;

  constructor(private prisma: PrismaService) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey =
      process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

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

    const supabaseServiceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
    
    if (supabaseServiceRoleKey) {
      this.supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });
    }
  }

  async register(dto: import('./dto/register.dto').RegisterDto) {
    if (!this.supabaseAdmin) {
      throw new InternalServerErrorException('Supabase Admin key is not configured.');
    }

    const { email, password, fullName } = dto;
    const username = email.split('@')[0];

    // Check existing user in Prisma
    const existingUser = await this.prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existingUser) {
      throw new BadRequestException('Email hoặc Username đã tồn tại trong hệ thống');
    }

    // Get CUSTOMER role
    const role = await this.prisma.role.findFirst({ where: { code: 'CUSTOMER' } });
    if (!role) {
      throw new InternalServerErrorException('Không tìm thấy vai trò CUSTOMER trong hệ thống');
    }

    // Create user in Supabase
    const { data: authData, error: authError } = await this.supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName }
    });

    if (authError) {
      if (authError.message.includes('User already registered') || authError.status === 422) {
        throw new BadRequestException('Email đã tồn tại trên hệ thống xác thực');
      }
      throw new BadRequestException(`Lỗi tạo tài khoản: ${authError.message}`);
    }

    const authUserId = authData.user.id;

    // Create user in Prisma
    try {
      const newUser = await this.prisma.user.create({
        data: {
          id: authUserId,
          email,
          username,
          fullName,
          status: 'ACTIVE',
          userRoles: {
            create: { roleId: role.id },
          },
          userProfile: {
            create: { mustChangePassword: false },
          },
        },
      });

      return {
        message: 'Tạo tài khoản thành công',
        user: newUser,
      };
    } catch (e) {
      await this.supabaseAdmin.auth.admin.deleteUser(authUserId);
      throw new InternalServerErrorException('Lỗi lưu tài khoản, vui lòng thử lại sau.');
    }
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
