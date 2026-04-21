import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
  private readonly logger = new Logger(SettingsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getAllSettings() {
    return this.prisma.systemSetting.findMany({
      orderBy: { key: 'asc' }
    });
  }

  async getSetting(key: string) {
    const setting = await this.prisma.systemSetting.findUnique({ where: { key } });
    if (!setting) throw new NotFoundException(`Setting '${key}' not found`);
    return setting;
  }

  // PAC-TASK-422: Update a setting value with type validation
  async updateSetting(key: string, value: string) {
    const existing = await this.prisma.systemSetting.findUnique({ where: { key } });
    if (!existing) throw new NotFoundException(`Setting '${key}' not found`);

    // Validate value against the declared type
    if (existing.valueType === 'integer') {
      const parsed = parseInt(value, 10);
      if (isNaN(parsed) || parsed < 0) {
        throw new BadRequestException(`Setting '${key}' requires a non-negative integer value`);
      }
    }

    return this.prisma.systemSetting.update({
      where: { key },
      data: { value }
    });
  }

  // Helper: get near-expiry threshold as a number
  async getNearExpiryThresholdDays(): Promise<number> {
    try {
      const setting = await this.prisma.systemSetting.findUnique({
        where: { key: 'near_expiry_threshold_days' }
      });
      return setting ? parseInt(setting.value, 10) : 90;
    } catch {
      // Return safe default if DB unavailable
      return 90;
    }
  }
}
