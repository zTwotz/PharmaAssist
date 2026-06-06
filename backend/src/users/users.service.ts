import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { CreateStaffDto } from './dto/create-staff.dto';

@Injectable()
export class UsersService {
  private supabaseAdmin: SupabaseClient;

  constructor(private prisma: PrismaService) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be defined');
    }

    this.supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  async createStaffAccount(dto: CreateStaffDto) {
    const { email, username, password, fullName, phone, roleId } = dto;

    // 1. Check if email or username already exists in Prisma
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      throw new BadRequestException('Email hoặc Username đã tồn tại trong hệ thống');
    }

    // 2. Check if role exists
    const role = await this.prisma.role.findUnique({ where: { id: roleId } });
    if (!role) {
      throw new BadRequestException('Vai trò (Role) không tồn tại');
    }

    // 3. Create user in Supabase Auth via Admin API
    const { data: authData, error: authError } = await this.supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) {
      throw new BadRequestException(`Lỗi tạo tài khoản Supabase: ${authError.message}`);
    }

    const authUserId = authData.user.id;

    // 4. Create user in Prisma DB and link Role
    try {
      const newUser = await this.prisma.user.create({
        data: {
          id: authUserId,
          email,
          username,
          fullName,
          phone,
          status: 'ACTIVE',
          userRoles: {
            create: {
              roleId,
            },
          },
        },
        include: {
          userRoles: {
            include: {
              role: true,
            },
          },
        },
      });

      return newUser;
    } catch (dbError) {
      // Rollback Supabase user if DB creation fails
      await this.supabaseAdmin.auth.admin.deleteUser(authUserId);
      throw new InternalServerErrorException('Lỗi lưu tài khoản vào cơ sở dữ liệu, đã rollback.');
    }
  }
}
