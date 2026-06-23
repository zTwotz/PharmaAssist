import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async generateLowStockNotifications() {
    // Logic to scan inventory and create low stock notifications
    return { success: true, message: 'Low stock scan completed' };
  }

  async generateNearExpiryNotifications() {
    // Logic to scan batches and create near expiry notifications
    return { success: true, message: 'Near expiry scan completed' };
  }

  async markAsRead(id: number, userId: string) {
    return this.prisma.notificationRecipient.updateMany({
      where: { notificationId: id, userId },
      data: { isRead: true, readAt: new Date() },
    });
  }

  async getMyNotifications(userId: string) {
    return this.prisma.notificationRecipient.findMany({
      where: { userId },
      include: { notification: true },
      orderBy: { notification: { createdAt: 'desc' } },
      take: 50,
    });
  }
}
