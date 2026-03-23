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
            },
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
  });

  describe('updateInteraction', () => {
    it('should throw BadRequestException if interaction rule does not exist', async () => {
      (prismaService.drugInteractionRule.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(
        service.updateInteraction(999, { severity: 'LOW' }),
      ).rejects.toThrow('Luật tương tác không tồn tại');
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

      (prismaService.drugInteractionRule.findMany as jest.Mock).mockResolvedValue([
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
