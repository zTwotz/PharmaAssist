import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { PrismaService } from '../prisma/prisma.service';

describe('OrdersService', () => {
  let service: OrdersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: PrismaService,
          useValue: {
            order: {
              findMany: jest.fn(),
            },
          },
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
});
