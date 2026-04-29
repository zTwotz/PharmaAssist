import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CustomersService', () => {
  let service: CustomersService;
  let mockPrismaService: any;

  beforeEach(async () => {
    mockPrismaService = {
      customer: {
        findMany: jest
          .fn()
          .mockResolvedValue([{ id: 1, fullName: 'Test Customer' }]),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all customers', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{ id: 1, fullName: 'Test Customer' }]);
    expect(mockPrismaService.customer.findMany).toHaveBeenCalled();
  });
});
