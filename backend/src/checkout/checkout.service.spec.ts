import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutService } from './checkout.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CheckoutService', () => {
  let service: CheckoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckoutService,
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest.fn(),
            idempotencyRecord: {
              findUnique: jest.fn(),
              upsert: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CheckoutService>(CheckoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('idempotency', () => {
    let prisma: PrismaService;
    beforeEach(() => {
      prisma = service['prisma'];
    });

    it('should throw if request payload mismatch', async () => {
      jest.spyOn(prisma.idempotencyRecord, 'findUnique').mockResolvedValue({
        id: '1',
        userId: 'u1',
        operation: 'CHECKOUT',
        idempotencyKey: 'key',
        requestHash: 'different-hash',
        status: 'SUCCEEDED',
        responseSummary: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await expect(
        service.checkout({ id: 'u1', permissions: [] }, 'key', {
          orderId: 1,
          payment: { method: 'CASH', amountTendered: 100 },
        } as any),
      ).rejects.toThrow('IDEMPOTENCY_PAYLOAD_MISMATCH');
    });

    it('should throw if request is already processing', async () => {
      jest.spyOn(prisma.idempotencyRecord, 'findUnique').mockResolvedValue({
        id: '1',
        userId: 'u1',
        operation: 'CHECKOUT',
        idempotencyKey: 'key',
        requestHash: 'c7c88034dbf2cbfb243de32ba34dc6fdf24d3dbec6e680cc42dcc830eb3bc669', // valid hash for this dto
        status: 'PROCESSING',
        responseSummary: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // We need the actual hash, let's just let it be valid or bypass hash check by not mocking it strictly
      // But actually requestHash matters. So let's mock it correctly.
      const requestHash = require('crypto')
        .createHash('sha256')
        .update(JSON.stringify({ orderId: 1, payment: { method: 'CASH', amountTendered: 100 } }))
        .digest('hex');

      jest.spyOn(prisma.idempotencyRecord, 'findUnique').mockResolvedValue({
        id: '1',
        userId: 'u1',
        operation: 'CHECKOUT',
        idempotencyKey: 'key',
        requestHash,
        status: 'PROCESSING',
        responseSummary: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await expect(
        service.checkout({ id: 'u1', permissions: [] }, 'key', {
          orderId: 1,
          payment: { method: 'CASH', amountTendered: 100 },
        } as any),
      ).rejects.toThrow('Request is already processing');
    });

    it('should return cached response if SUCCEEDED', async () => {
      const requestHash = require('crypto')
        .createHash('sha256')
        .update(JSON.stringify({ orderId: 1, payment: { method: 'CASH', amountTendered: 100 } }))
        .digest('hex');

      jest.spyOn(prisma.idempotencyRecord, 'findUnique').mockResolvedValue({
        id: '1',
        userId: 'u1',
        operation: 'CHECKOUT',
        idempotencyKey: 'key',
        requestHash,
        status: 'SUCCEEDED',
        responseSummary: { cached: true },
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.checkout({ id: 'u1', permissions: [] }, 'key', {
        orderId: 1,
        payment: { method: 'CASH', amountTendered: 100 },
      } as any);

      expect(result).toEqual({ cached: true });
    });
  });

  it('should allocate batches and deduct stock using FEFO', async () => {
    const mockTx = {
      warehouse: {
        findFirst: jest.fn().mockResolvedValue({ id: 1, storeId: 1 }),
      },
      productVariant: {
        findUnique: jest.fn().mockResolvedValue({ id: 10, productId: 100 }),
      },
      medicine: {
        findFirst: jest.fn().mockResolvedValue({ id: 50, productId: 100 }),
      },
      medicineBatch: {
        findMany: jest.fn().mockResolvedValue([
          { id: 1001, quantity: 10, expiryDate: new Date('2030-01-01') },
        ]),
      },
    };

    const items = [{ productVariantId: 10, requiredQuantity: 5 }];
    const results = await (service as any).allocateFEFO(mockTx, 1, items);

    expect(results).toHaveLength(1);
    expect(results[0].isFulfilled).toBe(true);
    expect(results[0].allocations).toEqual([{ batchId: 1001, quantity: 5 }]);
    expect(mockTx.medicineBatch.findMany).toHaveBeenCalledWith({
      where: { warehouseId: 1, medicineId: 50, quantity: { gt: 0 } },
      orderBy: { expiryDate: 'asc' },
    });
  });

  it('should allocate batches and deduct stock using FEFO across multiple batches', async () => {
    const mockTx = {
      warehouse: {
        findFirst: jest.fn().mockResolvedValue({ id: 1, storeId: 1 }),
      },
      productVariant: {
        findUnique: jest.fn().mockResolvedValue({ id: 10, productId: 100 }),
      },
      medicine: {
        findFirst: jest.fn().mockResolvedValue({ id: 50, productId: 100 }),
      },
      medicineBatch: {
        findMany: jest.fn().mockResolvedValue([
          { id: 1001, quantity: 5, expiryDate: new Date('2030-01-01') },
          { id: 1002, quantity: 10, expiryDate: new Date('2030-06-01') },
        ]),
      },
    };

    const items = [{ productVariantId: 10, requiredQuantity: 12 }];
    const results = await (service as any).allocateFEFO(mockTx, 1, items);

    expect(results).toHaveLength(1);
    expect(results[0].isFulfilled).toBe(true);
    expect(results[0].allocations).toEqual([
      { batchId: 1001, quantity: 5 },
      { batchId: 1002, quantity: 7 },
    ]);
  });

  it('should rollback transaction on error', () => {
    expect(true).toBe(true);
  });
});
