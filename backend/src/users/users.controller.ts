import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Patch,
  Param,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffRoleStatusDto } from './dto/update-staff.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { RequirePermissions } from '../auth/permissions.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('staff')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('VIEW_USERS')
  async getStaffs() {
    return this.usersService.getStaffs();
  }

  @Post('staff')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('MANAGE_USERS')
  // Fulfills PAC-TASK-042: Implement POST /admin/users (staff) using Supabase Admin
  async createStaffAccount(@Body() createStaffDto: CreateStaffDto) {
    const newUser = await this.usersService.createStaffAccount(createStaffDto);
    return {
      message: 'Tạo tài khoản nhân viên thành công',
      user: newUser,
    };
  }

  @Patch('staff/:id/role-status')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('MANAGE_USERS')
  async updateStaffRoleStatus(
    @Param('id') id: string,
    @Body() updateStaffRoleStatusDto: UpdateStaffRoleStatusDto,
    @Request() req: { user: { id: string } },
  ) {
    const updatedUser = await this.usersService.updateStaffRoleStatus(
      id,
      req.user.id,
      updateStaffRoleStatusDto,
    );
    return {
      message: 'Cập nhật nhân viên thành công',
      user: updatedUser,
    };
  }
}
