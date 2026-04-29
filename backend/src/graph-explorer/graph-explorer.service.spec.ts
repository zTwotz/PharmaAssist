import { Test, TestingModule } from '@nestjs/testing';
import { GraphExplorerService } from './graph-explorer.service';
import { Neo4jService } from '../neo4j/neo4j.service';

describe('GraphExplorerService', () => {
  let service: GraphExplorerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GraphExplorerService,
        {
          provide: Neo4jService,
          useValue: {
            read: jest.fn().mockResolvedValue({ records: [] }),
            write: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GraphExplorerService>(GraphExplorerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
