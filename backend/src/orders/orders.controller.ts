import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Post,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AddOrderItemDto } from './dto/add-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
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
  @ApiOperation({ summary: 'Tạo đơn nháp POS (Draft Order)' })
  @ApiResponse({
    status: 201,
    description: 'Đơn hàng đã được tạo thành công.',
  })
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Post(':id/items')
  @Roles('ADMIN', 'STAFF')
  @ApiOperation({ summary: 'Thêm sản phẩm vào Draft Order' })
  async addItemToDraftOrder(
    @Param('id') id: string,
    @Body() addOrderItemDto: AddOrderItemDto,
  ) {
    return this.ordersService.addItemToDraftOrder(Number(id), addOrderItemDto);
  }

  @Patch(':id/items/:itemId')
  @Roles('ADMIN', 'STAFF')
  @ApiOperation({ summary: 'Cập nhật số lượng sản phẩm trong Draft Order' })
  async updateDraftOrderItemQuantity(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.ordersService.updateDraftOrderItemQuantity(
      Number(id),
      Number(itemId),
      updateOrderItemDto,
    );
  }

  @Delete(':id/items/:itemId')
  @Roles('ADMIN', 'STAFF')
  @ApiOperation({ summary: 'Xóa sản phẩm khỏi Draft Order' })
  async removeDraftOrderItem(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
  ) {
    return this.ordersService.removeDraftOrderItem(Number(id), Number(itemId));
  }

  @Get('stats')
  @Roles('ADMIN', 'STAFF', 'WAREHOUSE')
  @ApiOperation({ summary: 'Lấy số liệu thống kê tổng quan cho Dashboard' })
  async getDashboardStats() {
    return this.ordersService.getDashboardStats();
  }

  @Post(':id/cancel')
  @Roles('ADMIN', 'STAFF')
  @ApiOperation({ summary: 'Hủy đơn hàng' })
  async cancelOrder(
    @Param('id') id: string,
    @Req() req: { user: { id: string; roles: string[] } },
  ) {
    return this.ordersService.cancelOrder(Number(id), req.user);
  }

  @Get(':id')
  @Roles('ADMIN', 'STAFF')
  @ApiOperation({ summary: 'Lấy danh sách lịch sử đơn hàng POS' })
  async findAll() {
    return this.ordersService.findAll();
  }
  @Post(':id/items')
  @Roles('ADMIN', 'STAFF')
  @ApiOperation({ summary: 'Thêm sản phẩm vào Draft Order' })
  async addItemToDraftOrder(
    @Param('id') id: string,
    @Body() addOrderItemDto: AddOrderItemDto,
  ) {
    return this.ordersService.addItemToDraftOrder(Number(id), addOrderItemDto);
  }
}
