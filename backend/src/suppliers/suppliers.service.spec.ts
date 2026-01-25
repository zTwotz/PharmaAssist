import { Test, TestingModule } from '@nestjs/testing';
import { SuppliersService } from './suppliers.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('SuppliersService', () => {
  let service: SuppliersService;

  const mockPrismaService = {
    supplier: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    purchaseOrder: {
      count: jest.fn(),
    },
    stockImport: {
      count: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuppliersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<SuppliersService>(SuppliersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create supplier with provided code', async () => {
      const dto = {
        code: 'SUPP-001',
        name: 'Supplier A',
        phone: '0123456789',
        email: 'suppa@gmail.com',
        address: '123 Street',
        taxCode: 'TAX-001',
        status: 'ACTIVE',
      };

      mockPrismaService.supplier.findUnique.mockResolvedValue(null);
      mockPrismaService.supplier.create.mockResolvedValue({ id: 1, ...dto });

      const result = await service.create(dto);
      expect(result).toEqual({ id: 1, ...dto });
      expect(mockPrismaService.supplier.findUnique).toHaveBeenCalledWith({
        where: { code: 'SUPP-001' },
      });
      expect(mockPrismaService.supplier.create).toHaveBeenCalledWith({
        data: {
          code: 'SUPP-001',
          name: 'Supplier A',
          phone: '0123456789',
          email: 'suppa@gmail.com',
          address: '123 Street',
          taxCode: 'TAX-001',
          status: 'ACTIVE',
        },
      });
    });

    it('should auto-generate code if not provided', async () => {
      const dto = {
        name: 'Supplier B',
      };

      mockPrismaService.supplier.create.mockImplementation((args: any) => {
        return Promise.resolve({
          id: 2,
          name: dto.name,
          code: args.data.code,
          phone: null,
          email: null,
          address: null,
          taxCode: null,
          status: 'ACTIVE',
        });
      });

      const result = await service.create(dto);
      expect(result.code).toBeDefined();
      expect(result.code).toContain('SUPP-');
    });

    it('should throw BadRequestException if code already exists', async () => {
      const dto = {
        code: 'SUPP-001',
        name: 'Supplier A',
      };

      mockPrismaService.supplier.findUnique.mockResolvedValue({ id: 1, code: 'SUPP-001' });

      await expect(service.create(dto)).rejects.toThrow(
        new BadRequestException('Mã nhà cung cấp SUPP-001 đã tồn tại.'),
      );
    });
  });
});
