import { Test, TestingModule } from '@nestjs/testing';
import { GraphSyncWorkerService } from './graph-sync-worker.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Neo4jService } from '../../neo4j/neo4j.service';

describe('GraphSyncWorkerService', () => {
  let service: GraphSyncWorkerService;

  beforeEach(async () => {
    const mockPrismaService = {
      graphSyncOutbox: {
        findMany: jest.fn().mockResolvedValue([]),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
        update: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GraphSyncWorkerService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: Neo4jService,
          useValue: {
            write: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<GraphSyncWorkerService>(GraphSyncWorkerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
