import { Test, TestingModule } from '@nestjs/testing';
import { StockImportsController } from './stock-imports.controller';
import { StockImportsService } from './stock-imports.service';

describe('StockImportsController', () => {
  let controller: StockImportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockImportsController],
      providers: [
        {
          provide: StockImportsService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<StockImportsController>(StockImportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
