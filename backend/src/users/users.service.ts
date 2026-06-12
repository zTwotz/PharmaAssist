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
            // Fulfills PAC-TASK-044: Assign roles to new staff account
            create: {
              roleId,
            },
          },
          userProfile: {
            create: {
              mustChangePassword: true,
            },
          },
        },
        include: {
          userRoles: {
            include: {
              role: true,
            },
          },
          userProfile: true,
        },
      });

      return newUser;
    } catch (dbError) {
      // Rollback Supabase user if DB creation fails
      await this.supabaseAdmin.auth.admin.deleteUser(authUserId);
      throw new InternalServerErrorException('Lỗi lưu tài khoản vào cơ sở dữ liệu, đã rollback.');
    }
  }

  async getStaffs() {
    return this.prisma.user.findMany({
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateStaffRoleStatus(id: string, dto: import('./dto/update-staff.dto').UpdateStaffRoleStatusDto) {
    const { roleId, status } = dto;
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new BadRequestException('Nhân viên không tồn tại');
    }

    // Nếu cập nhật trạng thái
    if (status && status !== user.status) {
      // Update Prisma
      await this.prisma.user.update({
        where: { id },
        data: { status },
      });

      // Update Supabase Auth if needed
      if (status === 'INACTIVE' || status === 'BANNED' || status === 'SUSPENDED') {
         await this.supabaseAdmin.auth.admin.updateUserById(id, { ban_duration: '87600h' });
      } else if (status === 'ACTIVE') {
         await this.supabaseAdmin.auth.admin.updateUserById(id, { ban_duration: 'none' });
      }
    }

    // Nếu cập nhật vai trò
    if (roleId) {
      const role = await this.prisma.role.findUnique({ where: { id: roleId } });
      if (!role) {
        throw new BadRequestException('Vai trò không tồn tại');
      }

      // Xóa tất cả roles cũ và thêm role mới
      await this.prisma.userRole.deleteMany({
        where: { userId: id },
      });

      await this.prisma.userRole.create({
        data: {
          userId: id,
          roleId,
        },
      });
    }

    return this.prisma.user.findUnique({
      where: { id },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });
  }
}
