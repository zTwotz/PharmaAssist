import { Test, TestingModule } from '@nestjs/testing';
import { MedicinesController } from './medicines.controller';
import { MedicinesService } from './medicines.service';

describe('MedicinesController', () => {
  let controller: MedicinesController;

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
          },
        },
      ],
    }).compile();

    controller = module.get<MedicinesController>(MedicinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
