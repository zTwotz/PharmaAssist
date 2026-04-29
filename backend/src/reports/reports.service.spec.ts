import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ReportsService', () => {
  let service: ReportsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: PrismaService,
          useValue: {
            order: {
              findMany: jest.fn(),
            },
            orderDetail: {
              findMany: jest.fn(),
            },
            inventory: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRevenueReport', () => {
    it('should correctly calculate totalRevenue, totalCogs, and grossProfit deterministically', async () => {
      const mockOrders = [
        {
          totalAmount: 1000,
          details: [
            {
              allocations: [
                { quantity: 2, medicineBatch: { importPrice: 200 } },
                { quantity: 1, medicineBatch: { importPrice: 300 } },
              ],
            },
          ],
        },
        {
          totalAmount: 500,
          details: [
            {
              allocations: [
                { quantity: 5, medicineBatch: { importPrice: 50 } },
              ],
            },
          ],
        },
      ];

      (prismaService.order.findMany as jest.Mock).mockResolvedValue(mockOrders);

      const result = await service.getRevenueReport({ status: 'PAID' });

      // Check filters
      expect(prismaService.order.findMany).toHaveBeenCalledWith({
        where: { status: 'PAID' },
        select: expect.any(Object),
      });

      // totalRevenue = 1000 + 500 = 1500
      expect(result.totalRevenue).toBe(1500);

      // totalCogs = (2 * 200 + 1 * 300) + (5 * 50) = 400 + 300 + 250 = 950
      expect(result.totalCogs).toBe(950);

      // grossProfit = 1500 - 950 = 550
      expect(result.grossProfit).toBe(550);
      expect(result.orderCount).toBe(2);
    });

    it('should apply date filters correctly', async () => {
      (prismaService.order.findMany as jest.Mock).mockResolvedValue([]);

      const startDate = '2025-01-01';
      const endDate = '2025-01-31';
      await service.getRevenueReport({ startDate, endDate });

      expect(prismaService.order.findMany).toHaveBeenCalledWith({
        where: {
          createdAt: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        },
        select: expect.any(Object),
      });
    });
  });

  describe('getTopMedicinesReport', () => {
    it('should calculate top medicines deterministically by summing quantities and revenues per SKU', async () => {
      const mockOrderDetails = [
        {
          quantity: 10,
          lineTotal: 500,
          productVariant: {
            sku: 'SKU-001',
            variantName: 'Box',
            product: { name: 'Panadol' },
          },
        },
        {
          quantity: 5,
          lineTotal: 250,
          productVariant: {
            sku: 'SKU-001',
            variantName: 'Box',
            product: { name: 'Panadol' },
          },
        },
        {
          quantity: 20,
          lineTotal: 1000,
          productVariant: {
            sku: 'SKU-002',
            variantName: 'Blister',
            product: { name: 'Amoxicillin' },
          },
        },
      ];

      (prismaService.orderDetail.findMany as jest.Mock).mockResolvedValue(
        mockOrderDetails,
      );

      const result = await service.getTopMedicinesReport({ limit: 5 });

      expect(result.total).toBe(2);
      expect(result.items.length).toBe(2);

      // SKU-002: 20 sold
      // SKU-001: 15 sold
      expect(result.items[0].sku).toBe('SKU-002');
      expect(result.items[0].quantitySold).toBe(20);
      expect(result.items[0].revenue).toBe(1000);

      expect(result.items[1].sku).toBe('SKU-001');
      expect(result.items[1].quantitySold).toBe(15);
      expect(result.items[1].revenue).toBe(750);
    });
  });

  describe('getInventoryReport', () => {
    it('should calculate available quantity deterministically', async () => {
      const mockInventories = [
        {
          quantity: 100,
          reservedQuantity: 20,
          minQuantity: 30,
          warehouse: { name: 'Main' },
          productVariant: {
            sku: 'SKU-A',
            variantName: 'Box',
            product: { name: 'DrugA', slug: 'drug-a' },
          },
        },
        {
          quantity: 50,
          reservedQuantity: 40,
          minQuantity: 20,
          warehouse: { name: 'Main' },
          productVariant: {
            sku: 'SKU-B',
            variantName: 'Box',
            product: { name: 'DrugB', slug: 'drug-b' },
          },
        },
      ];

      (prismaService.inventory.findMany as jest.Mock).mockResolvedValue(
        mockInventories,
      );

      const result = await service.getInventoryReport({});

      expect(result.total).toBe(2);
      expect(result.items.length).toBe(2);

      // Sorted by availableQuantity asc
      // SKU-B available = 10 (low)
      // SKU-A available = 80 (normal)

      expect(result.items[0].sku).toBe('SKU-B');
      expect(result.items[0].availableQuantity).toBe(10);
      expect(result.items[0].stockStatus).toBe('low');

      expect(result.items[1].sku).toBe('SKU-A');
      expect(result.items[1].availableQuantity).toBe(80);
      expect(result.items[1].stockStatus).toBe('normal');
    });

    it('should filter by stockStatus correctly', async () => {
      const mockInventories = [
        {
          quantity: 50,
          reservedQuantity: 40,
          minQuantity: 20, // available 10 <= 20 => low
          warehouse: { name: 'Main' },
          productVariant: {
            sku: 'SKU-B',
            variantName: 'Box',
            product: { name: 'B', slug: 'b' },
          },
        },
        {
          quantity: 100,
          reservedQuantity: 10,
          minQuantity: 20, // available 90 > 20 => normal
          warehouse: { name: 'Main' },
          productVariant: {
            sku: 'SKU-C',
            variantName: 'Box',
            product: { name: 'C', slug: 'c' },
          },
        },
      ];

      (prismaService.inventory.findMany as jest.Mock).mockResolvedValue(
        mockInventories,
      );

      const result = await service.getInventoryReport({ stockStatus: 'low' });

      expect(result.total).toBe(1);
      expect(result.items[0].sku).toBe('SKU-B');
    });
  });
});
