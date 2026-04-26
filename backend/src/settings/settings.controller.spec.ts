import { Test, TestingModule } from '@nestjs/testing';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Reflector } from '@nestjs/core';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('SettingsController', () => {
  let controller: SettingsController;
  let settingsService: jest.Mocked<SettingsService>;

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
      controllers: [SettingsController],
      providers: [
        {
          provide: SettingsService,
          useValue: {
            getAllSettings: jest.fn().mockResolvedValue([mockSetting]),
            getSetting: jest.fn().mockResolvedValue(mockSetting),
            updateSetting: jest
              .fn()
              .mockResolvedValue({ ...mockSetting, value: '120' }),
          },
        },
        Reflector,
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<SettingsController>(SettingsController);
    settingsService = module.get(SettingsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllSettings', () => {
    it('should return all settings', async () => {
      const result = await controller.getAllSettings();
      expect(result).toHaveLength(1);
      expect(result[0].key).toBe('near_expiry_threshold_days');
    });
  });

  describe('getSetting', () => {
    it('should return a setting by key', async () => {
      const result = await controller.getSetting('near_expiry_threshold_days');
      expect(result.value).toBe('90');
    });
  });

  describe('updateSetting', () => {
    it('should update a setting value', async () => {
      const result = await controller.updateSetting(
        'near_expiry_threshold_days',
        { value: '120' },
      );
      expect(result.value).toBe('120');
      expect(settingsService.updateSetting).toHaveBeenCalledWith(
        'near_expiry_threshold_days',
        '120',
      );
    });
  });
});
