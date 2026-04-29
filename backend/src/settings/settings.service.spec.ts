import { Test, TestingModule } from '@nestjs/testing';
import { SettingsService } from './settings.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('SettingsService', () => {
  let service: SettingsService;
  let prisma: jest.Mocked<PrismaService>;

  const mockSetting = {
    id: 1,
    key: 'near_expiry_threshold_days',
    value: '90',
    valueType: 'integer',
    label: 'Near Expiry Warning Threshold (days)',
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SettingsService,
        {
          provide: PrismaService,
          useValue: {
            systemSetting: {
              findMany: jest.fn().mockResolvedValue([mockSetting]),
              findUnique: jest.fn().mockResolvedValue(mockSetting),
              update: jest
                .fn()
                .mockResolvedValue({ ...mockSetting, value: '120' }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<SettingsService>(SettingsService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllSettings', () => {
    it('should return array of settings', async () => {
      const result = await service.getAllSettings();
      expect(result).toHaveLength(1);
    });
  });

  describe('getSetting', () => {
    it('should return a setting by key', async () => {
      const result = await service.getSetting('near_expiry_threshold_days');
      expect(result.value).toBe('90');
    });

    it('should throw NotFoundException if setting not found', async () => {
      (prisma.systemSetting.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.getSetting('unknown_key')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateSetting', () => {
    it('should update a valid integer setting', async () => {
      const result = await service.updateSetting(
        'near_expiry_threshold_days',
        '120',
      );
      expect(result.value).toBe('120');
    });

    it('should throw BadRequestException for invalid integer value', async () => {
      await expect(
        service.updateSetting('near_expiry_threshold_days', 'invalid'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for negative integer value', async () => {
      await expect(
        service.updateSetting('near_expiry_threshold_days', '-10'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if key does not exist', async () => {
      (prisma.systemSetting.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.updateSetting('unknown_key', '100')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getNearExpiryThresholdDays', () => {
    it('should return the threshold as a number', async () => {
      const threshold = await service.getNearExpiryThresholdDays();
      expect(threshold).toBe(90);
    });

    it('should return 90 as default when setting not found', async () => {
      (prisma.systemSetting.findUnique as jest.Mock).mockResolvedValue(null);
      const threshold = await service.getNearExpiryThresholdDays();
      expect(threshold).toBe(90);
    });
  });
});
