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
      mockPrismaService.supplier.findUnique.mockResolvedValue({ id: 1, status: 'INACTIVE' });
      await expect(service.createDraft({ supplierId: 1, warehouseId: 1 }, 'user-id'))
        .rejects
        .toThrow(BadRequestException);
    });

    it('should create draft if supplier is active and warehouse exists', async () => {
      mockPrismaService.supplier.findUnique.mockResolvedValue({ id: 1, status: 'ACTIVE' });
      mockPrismaService.warehouse.findUnique.mockResolvedValue({ id: 1 });
      mockPrismaService.stockImport.create.mockResolvedValue({ id: 1, status: 'DRAFT' });

      const result = await service.createDraft({ supplierId: 1, warehouseId: 1 }, 'user-id');
      expect(result).toBeDefined();
      expect(result.status).toBe('DRAFT');
    });
  });

  describe('findOne', () => {
    it('should throw error if import does not exist', async () => {
      mockPrismaService.stockImport.findUnique = jest.fn().mockResolvedValue(null);
      await expect(service.findOne(99))
        .rejects
        .toThrow(NotFoundException);
    });

    it('should return import if it exists', async () => {
      mockPrismaService.stockImport.findUnique = jest.fn().mockResolvedValue({ id: 1, status: 'DRAFT' });
      const result = await service.findOne(1);
      expect(result.id).toBe(1);
    });
  });

  describe('addLine', () => {
    it('should throw error if import does not exist', async () => {
      mockPrismaService.stockImport.findUnique = jest.fn().mockResolvedValue(null);
      await expect(service.addLine(99, { medicineId: 1, batchNumber: 'B1', quantity: 10, importPrice: 100, expiryDate: '2099-01-01' }))
        .rejects
        .toThrow(BadRequestException);
    });

    it('should throw error if import is not DRAFT', async () => {
      mockPrismaService.stockImport.findUnique = jest.fn().mockResolvedValue({ id: 1, status: 'CONFIRMED' });
      await expect(service.addLine(1, { medicineId: 1, batchNumber: 'B1', quantity: 10, importPrice: 100, expiryDate: '2099-01-01' }))
        .rejects
        .toThrow(BadRequestException);
    });

    it('should throw error if expiry date is in the past', async () => {
      mockPrismaService.stockImport.findUnique = jest.fn().mockResolvedValue({ id: 1, status: 'DRAFT' });
      mockPrismaService.medicine = { findUnique: jest.fn().mockResolvedValue({ id: 1, status: 'ACTIVE' }) } as any;
      
      await expect(service.addLine(1, { medicineId: 1, batchNumber: 'B1', quantity: 10, importPrice: 100, expiryDate: '2000-01-01' }))
        .rejects
        .toThrow(BadRequestException);
    });
  });

  describe('updateLine', () => {
    it('should throw error if import is not DRAFT', async () => {
      mockPrismaService.stockImport.findUnique = jest.fn().mockResolvedValue({ id: 1, status: 'CONFIRMED' });
      await expect(service.updateLine(1, 1, { quantity: 5 }))
        .rejects
        .toThrow(BadRequestException);
    });

    it('should throw error if detail not found', async () => {
      mockPrismaService.stockImport.findUnique = jest.fn().mockResolvedValue({ id: 1, status: 'DRAFT' });
      mockPrismaService.stockImportDetail.findUnique = jest.fn().mockResolvedValue(null);
      await expect(service.updateLine(1, 1, { quantity: 5 }))
        .rejects
        .toThrow(BadRequestException);
    });
  });

  describe('removeLine', () => {
    it('should throw error if import is not DRAFT', async () => {
      mockPrismaService.stockImport.findUnique = jest.fn().mockResolvedValue({ id: 1, status: 'CONFIRMED' });
      await expect(service.removeLine(1, 1))
        .rejects
        .toThrow(BadRequestException);
    });

    it('should throw error if detail not found', async () => {
      mockPrismaService.stockImport.findUnique = jest.fn().mockResolvedValue({ id: 1, status: 'DRAFT' });
      mockPrismaService.stockImportDetail.findUnique = jest.fn().mockResolvedValue(null);
      await expect(service.removeLine(1, 1))
        .rejects
        .toThrow(BadRequestException);
    });
  });
});
