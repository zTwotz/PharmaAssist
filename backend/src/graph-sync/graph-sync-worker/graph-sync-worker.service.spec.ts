import { Test, TestingModule } from '@nestjs/testing';
import { GraphSyncWorkerService } from './graph-sync-worker.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Neo4jService } from '../../neo4j/neo4j.service';
import { GraphSyncStatus, GraphSyncEventType } from '../types/graph-sync.types';

describe('GraphSyncWorkerService', () => {
  let service: GraphSyncWorkerService;
  let prismaService: PrismaService;
  let neo4jService: Neo4jService;

  beforeEach(async () => {
    const mockPrismaService = {
      graphSyncOutbox: {
        findMany: jest.fn().mockResolvedValue([]),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
        update: jest.fn(),
      },
      $transaction: jest.fn((callback) => callback(mockPrismaService)),
      graphSyncAttempt: {
        create: jest.fn(),
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
    prismaService = module.get<PrismaService>(PrismaService);
    neo4jService = module.get<Neo4jService>(Neo4jService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not process if no jobs are pending', async () => {
    await service.processPendingJobs();
    expect(prismaService.graphSyncOutbox.updateMany).not.toHaveBeenCalled();
  });

  it('should retry failed job within max retries', async () => {
    const job = {
      id: 'job1',
      aggregateType: 'MEDICINE',
      aggregateId: 'med1',
      eventType: GraphSyncEventType.MEDICINE_CREATED,
      payload: {},
      status: GraphSyncStatus.PENDING,
      retryCount: 0,
    };
    (prismaService.graphSyncOutbox.findMany as jest.Mock).mockResolvedValue([job]);
    (neo4jService.write as jest.Mock).mockRejectedValue(new Error('Neo4j Error'));

    await service.processPendingJobs();

    expect(prismaService.graphSyncOutbox.update).toHaveBeenCalledWith({
      where: { id: 'job1' },
      data: expect.objectContaining({
        status: GraphSyncStatus.RETRY_SCHEDULED,
        retryCount: 1,
      }),
    });
    expect(prismaService.graphSyncAttempt.create).toHaveBeenCalled();
  });

  it('should mark failed job as FAILED when max retries exceeded', async () => {
    const job = {
      id: 'job1',
      aggregateType: 'MEDICINE',
      aggregateId: 'med1',
      eventType: GraphSyncEventType.MEDICINE_CREATED,
      payload: {},
      status: GraphSyncStatus.PENDING,
      retryCount: 5,
    };
    (prismaService.graphSyncOutbox.findMany as jest.Mock).mockResolvedValue([job]);
    (neo4jService.write as jest.Mock).mockRejectedValue(new Error('Neo4j Error'));

    await service.processPendingJobs();

    expect(prismaService.graphSyncOutbox.update).toHaveBeenCalledWith({
      where: { id: 'job1' },
      data: expect.objectContaining({
        status: GraphSyncStatus.FAILED,
        retryCount: 6,
      }),
    });
  });
});
