import { Test, TestingModule } from '@nestjs/testing';
import { GraphSyncWorkerService } from './graph-sync-worker.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('GraphSyncWorkerService', () => {
  let service: GraphSyncWorkerService;

  beforeEach(async () => {
    const mockPrismaService = {
      graphSyncOutbox: {
        findMany: jest.fn().mockResolvedValue([]),
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
      ],
    }).compile();

    service = module.get<GraphSyncWorkerService>(GraphSyncWorkerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
