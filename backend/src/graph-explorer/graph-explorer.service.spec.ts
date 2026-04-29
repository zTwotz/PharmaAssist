import { Test, TestingModule } from '@nestjs/testing';
import { GraphExplorerService } from './graph-explorer.service';

describe('GraphExplorerService', () => {
  let service: GraphExplorerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphExplorerService],
    }).compile();

    service = module.get<GraphExplorerService>(GraphExplorerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
