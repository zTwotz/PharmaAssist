import { Test, TestingModule } from '@nestjs/testing';
import { MedicineGroupsController } from './medicine-groups.controller';

describe('MedicineGroupsController', () => {
  let controller: MedicineGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicineGroupsController],
    }).compile();

    controller = module.get<MedicineGroupsController>(MedicineGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
