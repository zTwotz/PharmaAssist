import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
}
