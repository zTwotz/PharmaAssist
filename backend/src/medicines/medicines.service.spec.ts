import { Test, TestingModule } from '@nestjs/testing';
import { MedicinesService } from './medicines.service';
import { PrismaService } from '../prisma/prisma.service';

describe('MedicinesService', () => {
  let service: MedicinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicinesService,
        {
          provide: PrismaService,
          useValue: {
            medicine: { findMany: jest.fn(), create: jest.fn() },
            medicineCategory: { findMany: jest.fn() },
            unit: { findMany: jest.fn() },
          },
        },
      ],
    }).compile();

    service = module.get<MedicinesService>(MedicinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
