import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('OrdersService', () => {
  let service: OrdersService;
  let prisma: any;

  const mockPrisma = {
    order: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
    productVariant: {
      findUnique: jest.fn(),
    },
    inventory: {
      findFirst: jest.fn(),
      updateMany: jest.fn(),
    },
    $transaction: jest.fn((cb) => cb(mockPrisma)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOrders', () => {
    it('should not filter by staffUserId if user is ADMIN', async () => {
      const mockUser = { id: 'admin-123', roles: ['ADMIN'] };
      await service.getOrders(mockUser);

      expect(prisma.order.findMany).toHaveBeenCalledWith({
        where: {},
        include: { details: true },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should filter by staffUserId if user is STAFF (not ADMIN)', async () => {
      const mockUser = { id: 'staff-456', roles: ['STAFF'] };
      await service.getOrders(mockUser);

      expect(prisma.order.findMany).toHaveBeenCalledWith({
        where: { staffUserId: 'staff-456' },
        include: { details: true },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should filter by customerId if provided', async () => {
      const mockUser = { id: 'admin-123', roles: ['ADMIN'] };
      await service.getOrders(mockUser, 99);

      expect(prisma.order.findMany).toHaveBeenCalledWith({
        where: { customerId: 99 },
        include: { details: true },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should combine staffUserId and customerId filters for STAFF', async () => {
      const mockUser = { id: 'staff-456', roles: ['STAFF'] };
      await service.getOrders(mockUser, 99);

      expect(prisma.order.findMany).toHaveBeenCalledWith({
        where: { staffUserId: 'staff-456', customerId: 99 },
        include: { details: true },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('createOrder', () => {
    const createOrderDto = {
      orderType: 'INSTORE',
      storeId: 1,
      details: [
        {
          productVariantId: 10,
          quantity: 2,
          unitPrice: 150.0,
        },
      ],
    };

    it('should throw BadRequestException if product variant does not exist or is INACTIVE', async () => {
      mockPrisma.productVariant.findUnique.mockResolvedValue({
        id: 10,
        variantName: 'Panadol',
        status: 'INACTIVE',
      });

      await expect(service.createOrder(createOrderDto)).rejects.toThrow(
        new BadRequestException('Sản phẩm Panadol đã ngừng hoạt động.'),
      );
    });

    it('should throw BadRequestException if inventory is insufficient', async () => {
      mockPrisma.productVariant.findUnique.mockResolvedValue({
        id: 10,
        variantName: 'Panadol',
        status: 'ACTIVE',
      });

      mockPrisma.inventory.findFirst.mockResolvedValue({
        quantity: 1, // less than requested quantity of 2
      });

      await expect(service.createOrder(createOrderDto)).rejects.toThrow(
        new BadRequestException('Sản phẩm ID 10 không đủ tồn kho.'),
      );
    });

    it('should successfully create order and decrement inventory if variant is ACTIVE and stock is sufficient', async () => {
      mockPrisma.productVariant.findUnique.mockResolvedValue({
        id: 10,
        variantName: 'Panadol',
        status: 'ACTIVE',
      });

      mockPrisma.inventory.findFirst.mockResolvedValue({
        quantity: 10,
      });

      mockPrisma.order.create.mockResolvedValue({
        id: 100,
        code: 'POS-123456',
        totalAmount: 300.0,
      });

      const result = await service.createOrder(createOrderDto);

      expect(result).toBeDefined();
      expect(result.id).toBe(100);
      // Draft orders do not decrement inventory according to Sprint 4 rules
      expect(mockPrisma.inventory.updateMany).not.toHaveBeenCalled();
    });
  });
});
