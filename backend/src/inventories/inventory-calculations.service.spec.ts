import { Test, TestingModule } from '@nestjs/testing';
import { InventoryCalculationsService } from './inventory-calculations.service';

describe('InventoryCalculationsService', () => {
  let service: InventoryCalculationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryCalculationsService],
    }).compile();

    service = module.get<InventoryCalculationsService>(InventoryCalculationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('isBatchExpired', () => {
    it('should return true for dates before reference date', () => {
      const batch = { expiryDate: new Date('2025-01-01') };
      const reference = new Date('2025-01-02');
      expect(service.isBatchExpired(batch, reference)).toBe(true);
    });

    it('should return false for exact same date (inclusive end of day logic or start of day logic)', () => {
      const batch = { expiryDate: new Date('2025-01-01') };
      const reference = new Date('2025-01-01');
      expect(service.isBatchExpired(batch, reference)).toBe(false);
    });

    it('should return false for future dates', () => {
      const batch = { expiryDate: new Date('2025-01-02') };
      const reference = new Date('2025-01-01');
      expect(service.isBatchExpired(batch, reference)).toBe(false);
    });
  });

  describe('isBatchNearExpiry', () => {
    it('should return false if already expired', () => {
      const batch = { expiryDate: new Date('2025-01-01') };
      const reference = new Date('2025-01-10');
      expect(service.isBatchNearExpiry(batch, 90, reference)).toBe(false);
    });

    it('should return true if exactly on threshold boundary', () => {
      const reference = new Date('2025-01-01');
      const batch = { expiryDate: new Date('2025-04-01') }; // ~90 days
      // Let's use exactly 10 days for simpler math
      const batch10 = { expiryDate: new Date('2025-01-11') };
      expect(service.isBatchNearExpiry(batch10, 10, reference)).toBe(true);
    });

    it('should return false if further than threshold', () => {
      const reference = new Date('2025-01-01');
      const batch = { expiryDate: new Date('2025-01-12') };
      expect(service.isBatchNearExpiry(batch, 10, reference)).toBe(false);
    });
  });

  describe('calculateSellableQuantity', () => {
    it('should only sum batches that are not expired and quantity > 0', () => {
      const reference = new Date('2025-01-01');
      const batches = [
        { quantity: 100, expiryDate: new Date('2025-02-01') }, // sellable
        { quantity: 50, expiryDate: new Date('2025-01-01') },  // sellable (expires today, still valid)
        { quantity: 200, expiryDate: new Date('2024-12-31') }, // EXPIRED
        { quantity: 0, expiryDate: new Date('2025-03-01') },   // empty quantity
      ];

      expect(service.calculateSellableQuantity(batches, reference)).toBe(150);
    });
  });

  describe('isLowStock', () => {
    it('should return true if sellable quantity is less than minQuantity', () => {
      expect(service.isLowStock(9, 10)).toBe(true);
    });

    it('should return false if sellable quantity equals minQuantity', () => {
      expect(service.isLowStock(10, 10)).toBe(false);
    });

    it('should return false if sellable quantity is greater than minQuantity', () => {
      expect(service.isLowStock(15, 10)).toBe(false);
    });
  });
});
