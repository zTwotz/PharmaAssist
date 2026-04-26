import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Reflector } from '@nestjs/core';

describe('ReportsController', () => {
  let controller: ReportsController;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [
        {
          provide: ReportsService,
          useValue: {
            getRevenueReport: jest.fn().mockResolvedValue({
              totalRevenue: 0,
              totalCogs: 0,
              grossProfit: 0,
              orderCount: 0,
            }),
            getTopMedicinesReport: jest
              .fn()
              .mockResolvedValue({ items: [], total: 0 }),
            getInventoryReport: jest
              .fn()
              .mockResolvedValue({ items: [], total: 0 }),
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

    controller = module.get<ReportsController>(ReportsController);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // PAC-TASK-419: Verify permission decorators on endpoints
  it('revenue endpoint has Roles decorator with ADMIN and MANAGER', () => {
    const roles = reflector.get<string[]>('roles', controller.getRevenueReport);
    expect(roles).toContain('ADMIN');
    expect(roles).toContain('MANAGER');
  });

  it('top-medicines endpoint has Roles decorator with ADMIN and MANAGER', () => {
    const roles = reflector.get<string[]>(
      'roles',
      controller.getTopMedicinesReport,
    );
    expect(roles).toContain('ADMIN');
    expect(roles).toContain('MANAGER');
  });

  it('inventory endpoint has Roles decorator with ADMIN, MANAGER and WAREHOUSE', () => {
    const roles = reflector.get<string[]>(
      'roles',
      controller.getInventoryReport,
    );
    expect(roles).toContain('ADMIN');
    expect(roles).toContain('MANAGER');
    expect(roles).toContain('WAREHOUSE');
  });

  it('should return revenue data', async () => {
    const result = await controller.getRevenueReport({});
    expect(result).toHaveProperty('totalRevenue');
    expect(result).toHaveProperty('totalCogs');
    expect(result).toHaveProperty('grossProfit');
    expect(result).toHaveProperty('orderCount');
  });

  it('should return top medicines data', async () => {
    const result = await controller.getTopMedicinesReport({});
    expect(result).toHaveProperty('items');
    expect(result).toHaveProperty('total');
  });

  it('should return inventory data', async () => {
    const result = await controller.getInventoryReport({});
    expect(result).toHaveProperty('items');
    expect(result).toHaveProperty('total');
  });
});
