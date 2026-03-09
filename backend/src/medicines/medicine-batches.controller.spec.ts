import { Test, TestingModule } from '@nestjs/testing';
import { MedicineBatchesController } from './medicine-batches.controller';
import { MedicineBatchesService } from './medicine-batches.service';

describe('MedicineBatchesController', () => {
  let controller: MedicineBatchesController;
  let service: MedicineBatchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicineBatchesController],
      providers: [
        {
          provide: MedicineBatchesService,
          useValue: {
            findAllByMedicine: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MedicineBatchesController>(
      MedicineBatchesController,
    );
    service = module.get<MedicineBatchesService>(MedicineBatchesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return batches by medicine', async () => {
    const batches = [{ id: 1, batchNumber: 'B1' }];
    jest.spyOn(service, 'findAllByMedicine').mockResolvedValue(batches as any);

    expect(await controller.findAllByMedicine(1)).toEqual(batches);
    expect(service.findAllByMedicine).toHaveBeenCalledWith(1);
  });

  it('should return a single batch', async () => {
    const batch = { id: 1, batchNumber: 'B1' };
    jest.spyOn(service, 'findOne').mockResolvedValue(batch as any);

    expect(await controller.findOne(1)).toEqual(batch);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });
});
