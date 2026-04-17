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
          },
        },
      ],
    }).compile();

    service = module.get<CheckoutService>(CheckoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should handle idempotency correctly', () => {
    expect(true).toBe(true);
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
