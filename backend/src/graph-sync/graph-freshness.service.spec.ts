import { Test, TestingModule } from '@nestjs/testing';
import { GraphFreshnessService } from './graph-freshness.service';
import { PrismaService } from '../prisma/prisma.service';
import { Neo4jService } from '../neo4j/neo4j.service';
import { GraphSyncStatus } from './types/graph-sync.types';

describe('GraphFreshnessService', () => {
  let service: GraphFreshnessService;
  let prismaService: PrismaService;
  let neo4jService: Neo4jService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GraphFreshnessService,
        {
          provide: PrismaService,
          useValue: {
            graphSyncOutbox: {
              findFirst: jest.fn(),
            },
          },
        },
        {
          provide: Neo4jService,
          useValue: {
            read: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GraphFreshnessService>(GraphFreshnessService);
    prismaService = module.get<PrismaService>(PrismaService);
    neo4jService = module.get<Neo4jService>(Neo4jService);
  });

  it('should return stale if there is a pending job', async () => {
    (
      prismaService.graphSyncOutbox.findFirst as jest.Mock
    ).mockResolvedValueOnce({ id: '1' });

    const result = await service.checkFreshness();

    expect(result.isStale).toBe(true);
    expect(result.reason).toBe('PENDING_OUTBOX');
  });

  it('should return stale if there is a failed job', async () => {
    (prismaService.graphSyncOutbox.findFirst as jest.Mock)
      .mockResolvedValueOnce(null) // pending
      .mockResolvedValueOnce({ id: '2' }); // failed

    const result = await service.checkFreshness();

    expect(result.isStale).toBe(true);
    expect(result.reason).toBe('FAILED_OUTBOX');
  });

  it('should return fresh if no pending or failed jobs and no projection to check', async () => {
    (prismaService.graphSyncOutbox.findFirst as jest.Mock).mockResolvedValue(
      null,
    );

    const result = await service.checkFreshness();

    expect(result.isStale).toBe(false);
  });

  it('should return missing projection if Neo4j returns no records', async () => {
    (prismaService.graphSyncOutbox.findFirst as jest.Mock).mockResolvedValue(
      null,
    );
    (neo4jService.read as jest.Mock).mockResolvedValueOnce({ records: [] });

    const result = await service.checkFreshness({
      aggregateType: 'MEDICINE',
      aggregateId: 'med1',
      expectedSourceVersion: 10,
    });

    expect(result.isStale).toBe(true);
    expect(result.reason).toBe('MISSING_PROJECTION');
  });

  it('should return stale projection if Neo4j sourceVersion is less than expected', async () => {
    (prismaService.graphSyncOutbox.findFirst as jest.Mock).mockResolvedValue(
      null,
    );
    (neo4jService.read as jest.Mock).mockResolvedValueOnce({
      records: [
        {
          get: () => 5, // sourceVersion = 5
        },
      ],
    });

    const result = await service.checkFreshness({
      aggregateType: 'MEDICINE',
      aggregateId: 'med1',
      expectedSourceVersion: 10,
    });

    expect(result.isStale).toBe(true);
    expect(result.reason).toBe('STALE_PROJECTION');
  });

  it('should return fresh if projection sourceVersion is equal or greater', async () => {
    (prismaService.graphSyncOutbox.findFirst as jest.Mock).mockResolvedValue(
      null,
    );
    (neo4jService.read as jest.Mock).mockResolvedValueOnce({
      records: [
        {
          get: () => 10, // sourceVersion = 10
        },
      ],
    });

    const result = await service.checkFreshness({
      aggregateType: 'MEDICINE',
      aggregateId: 'med1',
      expectedSourceVersion: 10,
    });

    expect(result.isStale).toBe(false);
  });
});
