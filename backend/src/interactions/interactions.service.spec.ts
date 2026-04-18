import { Test, TestingModule } from '@nestjs/testing';
import { InteractionsService } from './interactions.service';
import { PrismaService } from '../prisma/prisma.service';

describe('InteractionsService', () => {
  let service: InteractionsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InteractionsService,
        {
          provide: PrismaService,
          useValue: {
            medicine: {
              findMany: jest.fn(),
            },
            drugInteractionRule: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
            activeIngredient: {
              findUnique: jest.fn(),
            },
            graphSyncOutbox: {
              create: jest.fn(),
            },
            $transaction: jest.fn((cb: any) => cb(prismaService)),
          },
        },
      ],
    }).compile();

    service = module.get<InteractionsService>(InteractionsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createInteraction', () => {
    it('should throw BadRequestException if ingredient A and B are the same', async () => {
      await expect(
        service.createInteraction({
          activeIngredientAId: 1,
          activeIngredientBId: 1,
          severity: 'HIGH',
        }),
      ).rejects.toThrow('Hai hoạt chất phải khác nhau');
    });

    it('should successfully create interaction and write to graphSyncOutbox (PAC-TASK-475)', async () => {
      const mockRule = {
        id: 1,
        activeIngredientAId: 2,
        activeIngredientBId: 3,
        severity: 'HIGH',
      };
      (prismaService.activeIngredient.findUnique as jest.Mock).mockResolvedValue({});
      (prismaService.drugInteractionRule.findFirst as jest.Mock) = jest.fn().mockResolvedValue(null);
      (prismaService.drugInteractionRule.create as jest.Mock).mockResolvedValue(mockRule);
      ((prismaService as any).graphSyncOutbox.create as jest.Mock).mockResolvedValue({ id: 10 });

      const result = await service.createInteraction({
        activeIngredientAId: 2,
        activeIngredientBId: 3,
        severity: 'HIGH',
      });

      expect(result).toEqual(mockRule);
      expect((prismaService as any).graphSyncOutbox.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          eventType: 'DRUG_INTERACTION_UPSERT',
          aggregateType: 'DRUG_INTERACTION_RULE',
          aggregateId: '1',
          payload: expect.any(Object),
        }),
      });
    });
  });

  describe('updateInteraction', () => {
    it('should throw BadRequestException if interaction rule does not exist', async () => {
      (
        prismaService.drugInteractionRule.findUnique as jest.Mock
      ).mockResolvedValue(null);
      await expect(
        service.updateInteraction(999, { severity: 'LOW' }),
      ).rejects.toThrow('Luật tương tác không tồn tại');
    });

    it('should successfully update interaction and write to graphSyncOutbox (PAC-TASK-475)', async () => {
      const mockRule = {
        id: 1,
        activeIngredientAId: 2,
        activeIngredientBId: 3,
        severity: 'HIGH',
      };
      (prismaService.drugInteractionRule.findUnique as jest.Mock).mockResolvedValue(mockRule);
      const mockUpdatedRule = { ...mockRule, severity: 'LOW' };
      (prismaService.drugInteractionRule.update as jest.Mock).mockResolvedValue(mockUpdatedRule);
      ((prismaService as any).graphSyncOutbox.create as jest.Mock).mockResolvedValue({ id: 11 });

      const result = await service.updateInteraction(1, { severity: 'LOW' });

      expect(result).toEqual(mockUpdatedRule);
      expect((prismaService as any).graphSyncOutbox.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          eventType: 'DRUG_INTERACTION_UPSERT',
          aggregateType: 'DRUG_INTERACTION_RULE',
          aggregateId: '1',
          payload: expect.any(Object),
        }),
      });
    });
  });

  describe('deactivateInteraction', () => {
    it('should throw BadRequestException if interaction rule does not exist', async () => {
      (
        prismaService.drugInteractionRule.findUnique as jest.Mock
      ).mockResolvedValue(null);
      await expect(service.deactivateInteraction(999)).rejects.toThrow(
        'Luật tương tác không tồn tại',
      );
    });

    it('should successfully deactivate interaction and write to graphSyncOutbox (PAC-TASK-475)', async () => {
      const mockRule = {
        id: 1,
        activeIngredientAId: 2,
        activeIngredientBId: 3,
        severity: 'HIGH',
      };
      (prismaService.drugInteractionRule.findUnique as jest.Mock).mockResolvedValue(mockRule);
      const mockUpdatedRule = { ...mockRule, isActive: false };
      (prismaService.drugInteractionRule.update as jest.Mock).mockResolvedValue(mockUpdatedRule);
      ((prismaService as any).graphSyncOutbox.create as jest.Mock).mockResolvedValue({ id: 12 });

      const result = await service.deactivateInteraction(1);

      expect(result).toEqual(mockUpdatedRule);
      expect((prismaService as any).graphSyncOutbox.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          eventType: 'DRUG_INTERACTION_DEACTIVATE',
          aggregateType: 'DRUG_INTERACTION_RULE',
          aggregateId: '1',
          payload: expect.any(Object),
        }),
      });
    });
  });

  describe('checkInteractions', () => {
    it('should return empty interactions if less than 2 medicines are provided', async () => {
      const result = await service.checkInteractions([1]);
      expect(result).toEqual({
        interactions: [],
        hasInteractions: false,
        severeInteractionsCount: 0,
      });
    });

    // PAC-TASK-236: Added tests for derived medicine interactions
    it('should derive interactions from medicine active ingredients correctly', async () => {
      (prismaService.medicine.findMany as jest.Mock).mockResolvedValue([
        {
          id: 1,
          medicineCode: 'MED-1',
          ingredients: [{ activeIngredientId: 101 }],
        },
        {
          id: 2,
          medicineCode: 'MED-2',
          ingredients: [{ activeIngredientId: 102 }],
        },
      ]);

      (
        prismaService.drugInteractionRule.findMany as jest.Mock
      ).mockResolvedValue([
        {
          id: 1,
          activeIngredientAId: 101,
          activeIngredientBId: 102,
          severity: 'HIGH',
          description: 'High risk interaction',
          recommendation: 'Do not use together',
          activeIngredientA: { name: 'Aspirin' },
          activeIngredientB: { name: 'Ibuprofen' },
        },
      ]);

      const result = await service.checkInteractions([1, 2]);

      expect(prismaService.medicine.findMany).toHaveBeenCalledWith({
        where: { id: { in: [1, 2] } },
        include: { ingredients: true },
      });
      expect(prismaService.drugInteractionRule.findMany).toHaveBeenCalledWith({
        where: { isActive: true },
        include: { activeIngredientA: true, activeIngredientB: true },
      });

      expect(result.hasInteractions).toBe(true);
      expect(result.severeInteractionsCount).toBe(1);
      expect(result.interactions.length).toBe(1);
      expect(result.interactions[0]).toEqual({
        medicineAId: 1,
        medicineACode: 'MED-1',
        medicineBId: 2,
        medicineBCode: 'MED-2',
        ruleId: 1,
        severity: 'HIGH',
        description: 'High risk interaction',
        recommendation: 'Do not use together',
        activeIngredientAName: 'Aspirin',
        activeIngredientBName: 'Ibuprofen',
      });
    });
  });
});
