import { Controller, Post, Get, Body, Query, Request, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { RequirePermissions } from '../auth/permissions.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('VIEW_SALES')
  @ApiOperation({ summary: 'Lấy danh sách đơn hàng (Staff/Admin)' })
  @ApiQuery({ name: 'customerId', required: false, type: Number, description: 'Lọc theo ID khách hàng' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách đơn hàng được phép xem.' })
  async getOrders(@Request() req: any, @Query('customerId') customerId?: string) {
    const custId = customerId ? parseInt(customerId, 10) : undefined;
    return this.ordersService.getOrders(req.user, custId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('CREATE_ORDER')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo đơn hàng mới (POS) và trừ tồn kho' })
  @ApiResponse({
    status: 201,
    description: 'Đơn hàng đã được tạo thành công.',
  })
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }
}
