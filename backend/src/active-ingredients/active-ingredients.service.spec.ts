/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { ActiveIngredientsService } from './active-ingredients.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ActiveIngredientsService', () => {
  let service: ActiveIngredientsService;

  const mockPrisma = {
    activeIngredient: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    graphSyncOutbox: {
      create: jest.fn(),
    },
    $transaction: jest.fn((cb: any) => cb(mockPrisma)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActiveIngredientsService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<ActiveIngredientsService>(ActiveIngredientsService);

    // Reset mocks
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw BadRequestException if name is empty', async () => {
      await expect(service.create({ name: '   ' })).rejects.toThrow(
        new BadRequestException('Tên hoạt chất không được để trống'),
      );
    });

    it('should normalize name and throw BadRequestException if name already exists', async () => {
      mockPrisma.activeIngredient.findFirst.mockResolvedValue({
        id: 1,
        name: 'Paracetamol',
      });

      await expect(
        service.create({ name: '  Paracetamol   ' }),
      ).rejects.toThrow(new BadRequestException('Tên hoạt chất đã tồn tại'));
      expect(mockPrisma.activeIngredient.findFirst).toHaveBeenCalledWith({
        where: { name: { equals: 'Paracetamol', mode: 'insensitive' } },
      });
    });

    it('should generate code and write to DB and outbox if valid', async () => {
      mockPrisma.activeIngredient.findFirst.mockResolvedValue(null);
      mockPrisma.activeIngredient.findUnique.mockResolvedValue(null);
      mockPrisma.activeIngredient.create.mockResolvedValue({
        id: 10,
        code: 'ACT-P-1234',
        name: 'Paracetamol',
        status: 'ACTIVE',
      });

      const result = await service.create({ name: '  Paracetamol ' });

      expect(result).toBeDefined();
      expect(result.id).toBe(10);
      expect(mockPrisma.activeIngredient.create).toHaveBeenCalled();
      expect(mockPrisma.graphSyncOutbox.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          entityType: 'ACTIVE_INGREDIENT',
          entityId: 10,
          action: 'CREATE',
        }),
      });
    });
  });

  describe('update', () => {
    it('should throw NotFoundException if ingredient does not exist', async () => {
      mockPrisma.activeIngredient.findUnique.mockResolvedValue(null);

      await expect(service.update(99, { name: 'New Name' })).rejects.toThrow(
        new NotFoundException('Không tìm thấy hoạt chất'),
      );
    });

    it('should throw BadRequestException if new name already exists on another record', async () => {
      mockPrisma.activeIngredient.findUnique.mockResolvedValue({
        id: 1,
        name: 'Ibuprofen',
      });
      mockPrisma.activeIngredient.findFirst.mockResolvedValue({
        id: 2,
        name: 'Paracetamol',
      });

      await expect(service.update(1, { name: 'Paracetamol' })).rejects.toThrow(
        new BadRequestException('Tên hoạt chất đã tồn tại'),
      );
    });

    it('should successfully update and write to outbox', async () => {
      mockPrisma.activeIngredient.findUnique.mockResolvedValue({
        id: 1,
        name: 'Ibuprofen',
        status: 'ACTIVE',
      });
      mockPrisma.activeIngredient.findFirst.mockResolvedValue(null);
      mockPrisma.activeIngredient.update.mockResolvedValue({
        id: 1,
        name: 'Ibuprofen Updated',
        status: 'INACTIVE',
      });

      const result = await service.update(1, {
        name: 'Ibuprofen Updated',
        status: 'INACTIVE',
      });

      expect(result.name).toBe('Ibuprofen Updated');
      expect(result.status).toBe('INACTIVE');
      expect(mockPrisma.graphSyncOutbox.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          entityType: 'ACTIVE_INGREDIENT',
          entityId: 1,
          action: 'UPDATE',
        }),
      });
    });
  });

  describe('findOne', () => {
    it('should return the active ingredient if found', async () => {
      mockPrisma.activeIngredient.findUnique.mockResolvedValue({
        id: 5,
        name: 'Aspirin',
      });

      const result = await service.findOne(5);
      expect(result.name).toBe('Aspirin');
    });

    it('should throw NotFoundException if not found', async () => {
      mockPrisma.activeIngredient.findUnique.mockResolvedValue(null);

      await expect(service.findOne(5)).rejects.toThrow(
        new NotFoundException('Không tìm thấy hoạt chất'),
      );
    });
  });

  describe('findAll', () => {
    it('should query database with pagination and search filters', async () => {
      mockPrisma.activeIngredient.count.mockResolvedValue(1);
      mockPrisma.activeIngredient.findMany.mockResolvedValue([
        { id: 1, name: 'Paracetamol' },
      ]);

      const result = await service.findAll({
        page: 2,
        limit: 5,
        search: 'para',
        status: 'ACTIVE',
      });

      expect(result.total).toBe(1);
      expect(result.data).toHaveLength(1);
      expect(mockPrisma.activeIngredient.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 5,
          take: 5,
        }),
      );
    });
  });
});
