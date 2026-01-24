import { Test, TestingModule } from '@nestjs/testing';
import { MedicinesController } from './medicines.controller';
import { MedicinesService } from './medicines.service';

describe('MedicinesController', () => {
  let controller: MedicinesController;
  let service: MedicinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicinesController],
      providers: [
        {
          provide: MedicinesService,
          useValue: {
            getReferenceData: jest.fn(),
            createMedicine: jest.fn(),
            findOne: jest.fn(),
            updateMedicine: jest.fn(),
            search: jest.fn(),
            findAll: jest.fn(),
            getIngredients: jest.fn(),
            updateIngredients: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MedicinesController>(MedicinesController);
    service = module.get<MedicinesService>(MedicinesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getIngredients', () => {
    it('should call medicinesService.getIngredients with the parsed ID', async () => {
      const getIngredientsSpy = jest
        .spyOn(service, 'getIngredients')
        .mockResolvedValue([]);

      const result = await controller.getIngredients(123);
      expect(getIngredientsSpy).toHaveBeenCalledWith(123);
      expect(result).toEqual([]);
    });
  });

  describe('updateIngredients', () => {
    it('should call medicinesService.updateIngredients with ID and DTO', async () => {
      const updateIngredientsSpy = jest
        .spyOn(service, 'updateIngredients')
        .mockResolvedValue([]);

      const dto = {
        ingredients: [
          { activeIngredientId: 2, strength: '500mg', note: 'test' },
        ],
      };

      const result = await controller.updateIngredients(123, dto);
      expect(updateIngredientsSpy).toHaveBeenCalledWith(123, dto);
      expect(result).toEqual([]);
    });
  });
});
