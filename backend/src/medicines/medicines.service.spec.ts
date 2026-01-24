/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Test, TestingModule } from '@nestjs/testing';
import { MedicinesService } from './medicines.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('MedicinesService', () => {
  let service: MedicinesService;

  const mockPrismaService = {
    medicine: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    product: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    productVariant: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    medicineIngredient: {
      findMany: jest.fn(),
      deleteMany: jest.fn(),
      create: jest.fn(),
    },
    activeIngredient: {
      findMany: jest.fn(),
    },
    graphSyncOutbox: {
      create: jest.fn(),
    },
    $transaction: jest.fn((cb: any) => cb(mockPrismaService)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicinesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<MedicinesService>(MedicinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMedicine', () => {
    it('should throw BadRequestException if sellingPrice is <= 0', async () => {
      const dto = {
        code: 'MED-123',
        name: 'Test Med',
        categoryId: 1,
        medicineCode: 'M-123',
        dosageFormId: 1,
        medicineUnitId: 1,
        sellingPrice: 0,
      };

      await expect(service.createMedicine(dto)).rejects.toThrow(
        new BadRequestException('Giá bán phải lớn hơn 0'),
      );
    });

    it('should throw BadRequestException if sellingPrice is negative', async () => {
      const dto = {
        code: 'MED-123',
        name: 'Test Med',
        categoryId: 1,
        medicineCode: 'M-123',
        dosageFormId: 1,
        medicineUnitId: 1,
        sellingPrice: -10,
      };

      await expect(service.createMedicine(dto)).rejects.toThrow(
        new BadRequestException('Giá bán phải lớn hơn 0'),
      );
    });
  });

  describe('updateMedicine', () => {
    it('should throw NotFoundException if medicine does not exist', async () => {
      mockPrismaService.medicine.findUnique.mockResolvedValue(null);

      const dto = {
        name: 'Updated Med',
        sellingPrice: 50,
      };

      await expect(service.updateMedicine(999, dto)).rejects.toThrow(
        new NotFoundException('Không tìm thấy thuốc'),
      );
    });

    it('should throw BadRequestException if sellingPrice is <= 0', async () => {
      mockPrismaService.medicine.findUnique.mockResolvedValue({
        id: 1,
        productId: 1,
        medicineCode: 'M-123',
        product: { id: 1, code: 'MED-123', name: 'Test Med', slug: 'test-med' },
      });

      const dto = {
        sellingPrice: 0,
      };

      await expect(service.updateMedicine(1, dto)).rejects.toThrow(
        new BadRequestException('Giá bán phải lớn hơn 0'),
      );
    });
  });

  describe('getIngredients', () => {
    it('should throw NotFoundException if medicine does not exist', async () => {
      mockPrismaService.medicine.findUnique.mockResolvedValue(null);
      await expect(service.getIngredients(999)).rejects.toThrow(
        new NotFoundException('Không tìm thấy thuốc'),
      );
    });

    it('should return medicine ingredients if medicine exists', async () => {
      mockPrismaService.medicine.findUnique.mockResolvedValue({ id: 1 });
      const mockIngredients = [
        {
          id: 1,
          medicineId: 1,
          activeIngredientId: 2,
          strength: '500mg',
          activeIngredient: { id: 2, name: 'Paracetamol' },
        },
      ];
      mockPrismaService.medicineIngredient.findMany.mockResolvedValue(
        mockIngredients,
      );

      const result = await service.getIngredients(1);
      expect(result).toEqual(mockIngredients);
    });
  });

  describe('updateIngredients', () => {
    it('should throw NotFoundException if medicine does not exist', async () => {
      mockPrismaService.medicine.findUnique.mockResolvedValue(null);
      const dto = { ingredients: [] };
      await expect(service.updateIngredients(999, dto)).rejects.toThrow(
        new NotFoundException('Không tìm thấy thuốc'),
      );
    });

    it('should throw BadRequestException if duplicate ingredients are provided', async () => {
      mockPrismaService.medicine.findUnique.mockResolvedValue({ id: 1 });
      const dto = {
        ingredients: [
          { activeIngredientId: 2, strength: '500mg' },
          { activeIngredientId: 2, strength: '250mg' },
        ],
      };
      await expect(service.updateIngredients(1, dto)).rejects.toThrow(
        new BadRequestException(
          'Danh sách hoạt chất có chứa bản ghi trùng lặp',
        ),
      );
    });

    it('should throw BadRequestException if an ingredient does not exist', async () => {
      mockPrismaService.medicine.findUnique.mockResolvedValue({ id: 1 });
      const dto = {
        ingredients: [{ activeIngredientId: 2, strength: '500mg' }],
      };
      mockPrismaService.activeIngredient.findMany.mockResolvedValue([]);
      await expect(service.updateIngredients(1, dto)).rejects.toThrow(
        new BadRequestException(
          'Một hoặc nhiều hoạt chất không tồn tại trong hệ thống',
        ),
      );
    });

    it('should throw BadRequestException if an ingredient is inactive', async () => {
      mockPrismaService.medicine.findUnique.mockResolvedValue({ id: 1 });
      const dto = {
        ingredients: [{ activeIngredientId: 2, strength: '500mg' }],
      };
      mockPrismaService.activeIngredient.findMany.mockResolvedValue([
        { id: 2, name: 'Paracetamol', status: 'INACTIVE' },
      ]);
      await expect(service.updateIngredients(1, dto)).rejects.toThrow(
        new BadRequestException(
          'Không thể liên kết hoạt chất đã tắt hoạt động: Paracetamol',
        ),
      );
    });

    it('should successfully update mapping and create GraphSyncOutbox entry', async () => {
      mockPrismaService.medicine.findUnique.mockResolvedValue({ id: 1 });
      const dto = {
        ingredients: [
          { activeIngredientId: 2, strength: '500mg', note: 'Take with water' },
        ],
      };
      mockPrismaService.activeIngredient.findMany.mockResolvedValue([
        { id: 2, name: 'Paracetamol', status: 'ACTIVE' },
      ]);

      const mockCreated = {
        medicineId: 1,
        activeIngredientId: 2,
        strength: '500mg',
        note: 'Take with water',
        activeIngredient: { id: 2, name: 'Paracetamol' },
      };
      mockPrismaService.medicineIngredient.deleteMany.mockResolvedValue({
        count: 1,
      });
      mockPrismaService.medicineIngredient.create.mockResolvedValue(
        mockCreated,
      );
      mockPrismaService.graphSyncOutbox.create.mockResolvedValue({ id: 1 });

      const result = await service.updateIngredients(1, dto);
      expect(result).toEqual([mockCreated]);
      expect(
        mockPrismaService.medicineIngredient.deleteMany,
      ).toHaveBeenCalledWith({
        where: { medicineId: 1 },
      });
      expect(mockPrismaService.graphSyncOutbox.create).toHaveBeenCalledWith({
        data: {
          entityType: 'MEDICINE_INGREDIENT',
          entityId: 1,
          action: 'UPDATE',
          payload: {
            medicineId: 1,
            ingredients: [
              {
                activeIngredientId: 2,
                name: 'Paracetamol',
                strength: '500mg',
                note: 'Take with water',
              },
            ],
          },
        },
      });
    });
  });
});
