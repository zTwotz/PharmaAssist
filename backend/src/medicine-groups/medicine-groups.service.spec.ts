import { Test, TestingModule } from '@nestjs/testing';
import { MedicineGroupsService } from './medicine-groups.service';
import { PrismaService } from '../prisma/prisma.service';

describe('MedicineGroupsService', () => {
  let service: MedicineGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicineGroupsService,
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<MedicineGroupsService>(MedicineGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
