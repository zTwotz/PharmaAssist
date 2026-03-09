import { Test, TestingModule } from '@nestjs/testing';
import { StockImportsController } from './stock-imports.controller';

describe('StockImportsController', () => {
  let controller: StockImportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockImportsController],
    }).compile();

    controller = module.get<StockImportsController>(StockImportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
