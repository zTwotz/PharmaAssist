import { Test, TestingModule } from '@nestjs/testing';
import { AdjustmentsController } from './adjustments.controller';
import { AdjustmentsService } from './adjustments.service';
import { Roles } from '../../auth/roles.decorator';

describe('AdjustmentsController', () => {
  let controller: AdjustmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdjustmentsController],
      providers: [
        {
          provide: AdjustmentsService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AdjustmentsController>(AdjustmentsController);
  });

  describe('PAC-TASK-184: Warehouse permissions', () => {
    it('create should have ADMIN and WAREHOUSE roles', () => {
      const roles = Reflect.getMetadata('roles', controller.create);
      expect(roles).toEqual(['ADMIN', 'WAREHOUSE']);
    });

    it('findOne should have ADMIN and WAREHOUSE roles', () => {
      const roles = Reflect.getMetadata('roles', controller.findOne);
      expect(roles).toEqual(['ADMIN', 'WAREHOUSE']);
    });

    it('addLine should have ADMIN and WAREHOUSE roles', () => {
      const roles = Reflect.getMetadata('roles', controller.addLine);
      expect(roles).toEqual(['ADMIN', 'WAREHOUSE']);
    });

    it('confirm should have ADMIN and WAREHOUSE roles', () => {
      const roles = Reflect.getMetadata('roles', controller.confirm);
      expect(roles).toEqual(['ADMIN', 'WAREHOUSE']);
    });
  });
});
