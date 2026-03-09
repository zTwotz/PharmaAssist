import { Test, TestingModule } from '@nestjs/testing';
import { StockImportsService } from './stock-imports.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const mockPrismaService = {
  supplier: {
    findUnique: jest.fn(),
  },
  warehouse: {
    findUnique: jest.fn(),
  },
  medicine: {
    findUnique: jest.fn(),
  },
  stockImport: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  stockImportDetail: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findFirst: jest.fn(),
  },
  medicineBatch: {
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  auditLog: {
    create: jest.fn(),
  },
  $transaction: jest.fn((callback) => callback(mockPrismaService)),
};

describe('StockImportsService', () => {
  let service: StockImportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockImportsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<StockImportsService>(StockImportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createDraft', () => {
    it('should throw error if supplier is inactive', async () => {
      mockPrismaService.supplier.findUnique.mockResolvedValue({
        id: 1,
        status: 'INACTIVE',
      });
      await expect(
        service.createDraft({ supplierId: 1, warehouseId: 1 }, 'user-id'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should create draft if supplier is active and warehouse exists', async () => {
      mockPrismaService.supplier.findUnique.mockResolvedValue({
        id: 1,
        status: 'ACTIVE',
      });
      mockPrismaService.warehouse.findUnique.mockResolvedValue({ id: 1 });
      mockPrismaService.stockImport.create.mockResolvedValue({
        id: 1,
        status: 'DRAFT',
      });

      const result = await service.createDraft(
        { supplierId: 1, warehouseId: 1 },
        'user-id',
      );
      expect(result).toBeDefined();
      expect(result.status).toBe('DRAFT');
    });
  });

  describe('findOne', () => {
    it('should throw error if import does not exist', async () => {
      mockPrismaService.stockImport.findUnique = jest
        .fn()
        .mockResolvedValue(null);
      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });

    it('should return import if it exists', async () => {
      mockPrismaService.stockImport.findUnique = jest
        .fn()
        .mockResolvedValue({ id: 1, status: 'DRAFT' });
      const result = await service.findOne(1);
      expect(result.id).toBe(1);
    });
  });

  describe('addLine', () => {
    it('should throw error if import does not exist', async () => {
      mockPrismaService.stockImport.findUnique = jest
        .fn()
        .mockResolvedValue(null);
      await expect(
        service.addLine(99, {
          medicineId: 1,
          batchNumber: 'B1',
          quantity: 10,
          importPrice: 100,
          expiryDate: '2099-01-01',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw error if import is not DRAFT', async () => {
      mockPrismaService.stockImport.findUnique = jest
        .fn()
        .mockResolvedValue({ id: 1, status: 'CONFIRMED' });
      await expect(
        service.addLine(1, {
          medicineId: 1,
          batchNumber: 'B1',
          quantity: 10,
          importPrice: 100,
          expiryDate: '2099-01-01',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw error if expiry date is in the past', async () => {
      mockPrismaService.stockImport.findUnique = jest
        .fn()
        .mockResolvedValue({ id: 1, status: 'DRAFT' });
      mockPrismaService.medicine = {
        findUnique: jest.fn().mockResolvedValue({ id: 1, status: 'ACTIVE' }),
      } as any;

      await expect(
        service.addLine(1, {
          medicineId: 1,
          batchNumber: 'B1',
          quantity: 10,
          importPrice: 100,
          expiryDate: '2000-01-01',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('updateLine', () => {
    it('should throw error if import is not DRAFT', async () => {
      mockPrismaService.stockImport.findUnique = jest
        .fn()
        .mockResolvedValue({ id: 1, status: 'CONFIRMED' });
      await expect(service.updateLine(1, 1, { quantity: 5 })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw error if detail not found', async () => {
      mockPrismaService.stockImport.findUnique = jest
        .fn()
        .mockResolvedValue({ id: 1, status: 'DRAFT' });
      mockPrismaService.stockImportDetail.findUnique = jest
        .fn()
        .mockResolvedValue(null);
      await expect(service.updateLine(1, 1, { quantity: 5 })).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('removeLine', () => {
    it('should throw error if import is not DRAFT', async () => {
      mockPrismaService.stockImport.findUnique = jest
        .fn()
        .mockResolvedValue({ id: 1, status: 'CONFIRMED' });
      await expect(service.removeLine(1, 1)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw error if detail not found', async () => {
      mockPrismaService.stockImport.findUnique = jest
        .fn()
        .mockResolvedValue({ id: 1, status: 'DRAFT' });
      mockPrismaService.stockImportDetail.findUnique = jest
        .fn()
        .mockResolvedValue(null);
      await expect(service.removeLine(1, 1)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('confirmImport', () => {
    it('should throw error if import not found', async () => {
      mockPrismaService.stockImport.findUnique = jest
        .fn()
        .mockResolvedValue(null);
      await expect(service.confirmImport(1, 'user1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw error if import is not DRAFT', async () => {
      mockPrismaService.stockImport.findUnique = jest
        .fn()
        .mockResolvedValue({ id: 1, status: 'CONFIRMED' });
      await expect(service.confirmImport(1, 'user1')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw error if supplier is INACTIVE', async () => {
      mockPrismaService.stockImport.findUnique = jest.fn().mockResolvedValue({
        id: 1,
        status: 'DRAFT',
        supplier: { status: 'INACTIVE' },
      });
      await expect(service.confirmImport(1, 'user1')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw error if import has no details', async () => {
      mockPrismaService.stockImport.findUnique = jest.fn().mockResolvedValue({
        id: 1,
        status: 'DRAFT',
        supplier: { status: 'ACTIVE' },
        details: [],
      });
      await expect(service.confirmImport(1, 'user1')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should merge batches correctly when everything is valid', async () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);

      mockPrismaService.stockImport.findUnique = jest.fn().mockResolvedValue({
        id: 1,
        status: 'DRAFT',
        warehouseId: 1,
        supplier: { status: 'ACTIVE' },
        details: [
          {
            medicineId: 1,
            batchNumber: 'B1',
            quantity: 10,
            expiryDate: futureDate,
            importPrice: 100,
          },
        ],
      });

      // Mock finding an existing batch that matches exactly
      mockPrismaService.medicineBatch.findFirst = jest.fn().mockResolvedValue({
        id: 1,
        medicineId: 1,
        batchNumber: 'B1',
        expiryDate: futureDate,
      });

      mockPrismaService.auditLog.create = jest.fn().mockResolvedValue({});
      mockPrismaService.stockImport.update = jest
        .fn()
        .mockResolvedValue({ status: 'CONFIRMED' });
      mockPrismaService.medicineBatch.update = jest.fn().mockResolvedValue({});
      mockPrismaService.medicineBatch.create = jest.fn().mockResolvedValue({});

      await service.confirmImport(1, 'user1');

      expect(mockPrismaService.auditLog.create).toHaveBeenCalled();
      expect(mockPrismaService.stockImport.update).toHaveBeenCalled();
      expect(mockPrismaService.medicineBatch.update).toHaveBeenCalled();
      expect(mockPrismaService.medicineBatch.create).not.toHaveBeenCalled();
    });

    it('should throw error if expiry mismatch occurs', async () => {
      const importExpiry = new Date('2025-01-01');
      const existingExpiry = new Date('2026-01-01');

      mockPrismaService.stockImport.findUnique = jest.fn().mockResolvedValue({
        id: 1,
        status: 'DRAFT',
        warehouseId: 1,
        supplier: { status: 'ACTIVE' },
        details: [
          {
            medicineId: 1,
            batchNumber: 'B1',
            quantity: 10,
            expiryDate: importExpiry,
            importPrice: 100,
          },
        ],
      });

      // Existing batch has different expiry
      mockPrismaService.medicineBatch.findFirst = jest.fn().mockResolvedValue({
        id: 1,
        medicineId: 1,
        batchNumber: 'B1',
        expiryDate: existingExpiry,
      });

      await expect(service.confirmImport(1, 'user1')).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
