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

  describe('findAll', () => {
    it('should return all suppliers if status is not provided', async () => {
      const mockSuppliers = [
        { id: 1, name: 'Supplier A', status: 'ACTIVE' },
        { id: 2, name: 'Supplier B', status: 'INACTIVE' },
      ];
      mockPrismaService.supplier.findMany.mockResolvedValue(mockSuppliers);

      const result = await service.findAll();
      expect(result).toEqual(mockSuppliers);
      expect(mockPrismaService.supplier.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should filter by active status', async () => {
      mockPrismaService.supplier.findMany.mockResolvedValue([]);
      await service.findAll('ACTIVE');
      expect(mockPrismaService.supplier.findMany).toHaveBeenCalledWith({
        where: { status: 'ACTIVE' },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('update', () => {
    it('should throw NotFoundException if supplier does not exist', async () => {
      mockPrismaService.supplier.findUnique.mockResolvedValue(null);
      await expect(service.update(999, { name: 'New Name' })).rejects.toThrow(
        new NotFoundException('Nhà cung cấp ID 999 không tồn tại.'),
      );
    });

    it('should throw BadRequestException if new code already exists', async () => {
      const mockExisting = { id: 1, code: 'SUPP-001', name: 'Supplier A' };
      const mockConflict = { id: 2, code: 'SUPP-002', name: 'Supplier B' };

      mockPrismaService.supplier.findUnique.mockImplementation(({ where }) => {
        if (where.id === 1) return Promise.resolve(mockExisting);
        if (where.code === 'SUPP-002') return Promise.resolve(mockConflict);
        return Promise.resolve(null);
      });

      await expect(service.update(1, { code: 'SUPP-002' })).rejects.toThrow(
        new BadRequestException('Mã nhà cung cấp SUPP-002 đã tồn tại.'),
      );
    });

    it('should successfully update supplier', async () => {
      const mockExisting = { id: 1, code: 'SUPP-001', name: 'Supplier A' };
      mockPrismaService.supplier.findUnique.mockResolvedValue(mockExisting);
      mockPrismaService.supplier.update.mockResolvedValue({ id: 1, code: 'SUPP-001', name: 'Updated A' });

      const result = await service.update(1, { name: 'Updated A' });
      expect(result.name).toEqual('Updated A');
    });
  });

  describe('deactivate', () => {
    it('should throw NotFoundException if supplier does not exist', async () => {
      mockPrismaService.supplier.findUnique.mockResolvedValue(null);
      await expect(service.deactivate(999)).rejects.toThrow(
        new NotFoundException('Nhà cung cấp ID 999 không tồn tại.'),
      );
    });

    it('should successfully deactivate supplier', async () => {
      const mockSupplier = { id: 1, code: 'SUPP-001', name: 'Supplier A', status: 'ACTIVE' };
      mockPrismaService.supplier.findUnique.mockResolvedValue(mockSupplier);
      mockPrismaService.supplier.update.mockResolvedValue({ id: 1, ...mockSupplier, status: 'INACTIVE' });

      const result = await service.deactivate(1);
      expect(result.status).toEqual('INACTIVE');
      expect(mockPrismaService.supplier.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { status: 'INACTIVE' },
      });
    });
  });
});
