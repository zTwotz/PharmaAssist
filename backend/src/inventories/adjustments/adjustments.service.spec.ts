import { Test, TestingModule } from '@nestjs/testing';
import { AdjustmentsService } from './adjustments.service';
import { PrismaService } from '../../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('AdjustmentsService', () => {
  let service: AdjustmentsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdjustmentsService,
        {
          provide: PrismaService,
          useValue: {
            inventoryAdjustment: {
              findUnique: jest.fn(),
            },
            $transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AdjustmentsService>(AdjustmentsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('addLine', () => {
    it('PAC-TASK-182: should throw BadRequestException if actualQuantity is negative', async () => {
      jest.spyOn(prisma.inventoryAdjustment, 'findUnique').mockResolvedValue({
        id: 1,
        status: 'DRAFT',
      } as any);

      await expect(
        service.addLine(1, { actualQuantity: -5, expectedQuantity: 10 }),
      ).rejects.toThrow(BadRequestException);
      
      await expect(
        service.addLine(1, { actualQuantity: -5, expectedQuantity: 10 }),
      ).rejects.toThrow('Quantities cannot be negative');
    });
  });

  describe('confirm', () => {
    it('PAC-TASK-182: should throw BadRequestException if any line has negative actualQuantity', async () => {
      jest.spyOn(prisma, '$transaction').mockImplementation(async (callback) => {
        // mock the transaction object `tx`
        const tx = {
          inventoryAdjustment: {
            findUnique: jest.fn().mockResolvedValue({
              id: 1,
              status: 'DRAFT',
              reason: 'Lỗi kiểm kê',
              lines: [
                { id: 1, actualQuantity: -1 },
              ],
            }),
          },
        };
        return callback(tx as any);
      });

      await expect(service.confirm(1)).rejects.toThrow(BadRequestException);
      await expect(service.confirm(1)).rejects.toThrow('Số lượng sau điều chỉnh không thể âm');
    });
  });
});
