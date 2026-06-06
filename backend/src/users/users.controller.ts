import { Controller, Post, Body, UseGuards, Get, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffRoleStatusDto } from './dto/update-staff.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('staff')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async getStaffs() {
    return this.usersService.getStaffs();
  }

  @Post('staff')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async createStaffAccount(@Body() createStaffDto: CreateStaffDto) {
    const newUser = await this.usersService.createStaffAccount(createStaffDto);
    return {
      message: 'Tạo tài khoản nhân viên thành công',
      user: newUser,
    };
  }

  @Patch('staff/:id/role-status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async updateStaffRoleStatus(
    @Param('id') id: string,
    @Body() updateStaffRoleStatusDto: UpdateStaffRoleStatusDto,
  ) {
    const updatedUser = await this.usersService.updateStaffRoleStatus(id, updateStaffRoleStatusDto);
    return {
      message: 'Cập nhật nhân viên thành công',
      user: updatedUser,
    };
  }
}
