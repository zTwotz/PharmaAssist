import { Controller, Get, Post, Param, UseGuards, Req } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('admin/notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getMyNotifications(@Req() req: any) {
    return this.notificationsService.getMyNotifications(req.user.id);
  }

  @Post(':id/read')
  async markAsRead(@Param('id') id: string, @Req() req: any) {
    return this.notificationsService.markAsRead(parseInt(id, 10), req.user.id);
  }

  @Post('jobs/low-stock-scan')
  @Roles('ADMIN')
  async runLowStockScan() {
    return this.notificationsService.generateLowStockNotifications();
  }

  @Post('jobs/near-expiry-scan')
  @Roles('ADMIN')
  async runNearExpiryScan() {
    return this.notificationsService.generateNearExpiryNotifications();
  }
}
