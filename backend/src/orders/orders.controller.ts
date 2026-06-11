import { Controller, Post, Body, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Roles('ADMIN', 'STAFF')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo đơn hàng mới (POS) và trừ tồn kho' })
  @ApiResponse({
    status: 201,
    description: 'Đơn hàng đã được tạo thành công.',
  })
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get()
  @Roles('ADMIN', 'STAFF')
  @ApiOperation({ summary: 'Lấy danh sách lịch sử đơn hàng POS' })
  async findAll() {
    return this.ordersService.findAll();
  }
}
