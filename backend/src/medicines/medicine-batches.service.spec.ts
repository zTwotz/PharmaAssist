import { Test, TestingModule } from '@nestjs/testing';
import { MedicineBatchesService } from './medicine-batches.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('MedicineBatchesService', () => {
  let service: MedicineBatchesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicineBatchesService,
        {
          provide: PrismaService,
          useValue: {
            medicineBatch: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<MedicineBatchesService>(MedicineBatchesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('normalizeBatchNumber', () => {
    it('should uppercase and trim batch number', () => {
      expect(service.normalizeBatchNumber('  lot-123 ')).toBe('LOT-123');
    });
  });

  describe('normalizeExpiryDate', () => {
    it('should set UTC hours to 0', () => {
      const date = service.normalizeExpiryDate('2025-12-31T23:59:59Z');
      expect(date.getUTCHours()).toBe(0);
      expect(date.getUTCMinutes()).toBe(0);
    });
    
    it('should throw error on invalid date', () => {
      expect(() => service.normalizeExpiryDate('invalid')).toThrow(BadRequestException);
    });
  });

  describe('validateAndGetBatchIdentity', () => {
    it('should return null batchId for new batch', async () => {
      jest.spyOn(prisma.medicineBatch, 'findMany').mockResolvedValue([]);
      
      const result = await service.validateAndGetBatchIdentity('med1', 'LOT1', '2025-12-31');
      expect(result.batchId).toBeNull();
      expect(result.normalizedBatch).toBe('LOT1');
    });

    it('should return batchId when exact match exists', async () => {
      const expiry = service.normalizeExpiryDate('2025-12-31');
      jest.spyOn(prisma.medicineBatch, 'findMany').mockResolvedValue([
        { id: 'batch1', medicineId: 'med1', batchNumber: 'LOT1', expiryDate: expiry, quantity: 100, createdAt: new Date(), updatedAt: new Date() }
      ]);
      
      const result = await service.validateAndGetBatchIdentity('med1', 'lot1', '2025-12-31');
      expect(result.batchId).toBe('batch1');
    });

    it('should throw BadRequestException when batch exists with different expiry', async () => {
      const existingExpiry = service.normalizeExpiryDate('2026-01-01');
      jest.spyOn(prisma.medicineBatch, 'findMany').mockResolvedValue([
        { id: 'batch1', medicineId: 'med1', batchNumber: 'LOT1', expiryDate: existingExpiry, quantity: 100, createdAt: new Date(), updatedAt: new Date() }
      ]);
      
      await expect(service.validateAndGetBatchIdentity('med1', 'LOT1', '2025-12-31'))
        .rejects
        .toThrow(BadRequestException);
    });
  });
});
