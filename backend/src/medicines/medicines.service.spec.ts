/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
});
