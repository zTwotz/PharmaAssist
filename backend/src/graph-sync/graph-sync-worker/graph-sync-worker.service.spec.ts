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
      $transaction: jest.fn(async (args) => {
        if (typeof args === 'function') {
          return args(mockPrismaService);
        }
        return Promise.all(args);
      }),
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
      eventType: GraphSyncEventType.MEDICINE_UPSERT,
      payload: {
        id: 'med1',
        name: 'Paracetamol',
        status: 'ACTIVE',
      },
      sourceVersion: '1',
      status: GraphSyncStatus.PENDING,
      retryCount: 0,
      createdAt: new Date(),
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
      eventType: GraphSyncEventType.MEDICINE_UPSERT,
      payload: {
        id: 'med1',
        name: 'Paracetamol',
        status: 'ACTIVE',
      },
      sourceVersion: '1',
      status: GraphSyncStatus.PENDING,
      retryCount: 5,
      createdAt: new Date(),
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

  it('should project MEDICINE_UPSERT correctly', async () => {
    const job = {
      id: 'job1',
      aggregateType: 'MEDICINE',
      aggregateId: 'med1',
      eventType: GraphSyncEventType.MEDICINE_UPSERT,
      payload: {
        id: 'med1',
        name: 'Paracetamol',
        status: 'ACTIVE',
      },
      sourceVersion: '1',
      status: GraphSyncStatus.PENDING,
      retryCount: 0,
      createdAt: new Date(),
    };
    (prismaService.graphSyncOutbox.findMany as jest.Mock).mockResolvedValue([job]);

    await service.processPendingJobs();

    expect(neo4jService.write).toHaveBeenCalledWith(
      expect.stringContaining('MERGE (m:Medicine {id: $id})'),
      expect.objectContaining({
        id: 'med1',
        name: 'Paracetamol',
        sourceVersion: 1,
      }),
    );
    expect(prismaService.graphSyncOutbox.update).toHaveBeenCalledWith({
      where: { id: 'job1' },
      data: expect.objectContaining({ status: GraphSyncStatus.SUCCEEDED }),
    });
  });

  it('should project ACTIVE_INGREDIENT_UPSERT correctly', async () => {
    const job = {
      id: 'job2',
      aggregateType: 'ACTIVE_INGREDIENT',
      aggregateId: 'ai1',
      eventType: GraphSyncEventType.ACTIVE_INGREDIENT_UPSERT,
      payload: {
        id: 'ai1',
        name: 'Ibuprofen',
        status: 'ACTIVE',
      },
      sourceVersion: '1',
      status: GraphSyncStatus.PENDING,
      retryCount: 0,
      createdAt: new Date(),
    };
    (prismaService.graphSyncOutbox.findMany as jest.Mock).mockResolvedValue([job]);

    await service.processPendingJobs();

    expect(neo4jService.write).toHaveBeenCalledWith(
      expect.stringContaining('MERGE (a:ActiveIngredient {id: $id})'),
      expect.objectContaining({
        id: 'ai1',
        name: 'Ibuprofen',
        sourceVersion: 1,
      }),
    );
    expect(prismaService.graphSyncOutbox.update).toHaveBeenCalledWith({
      where: { id: 'job2' },
      data: expect.objectContaining({ status: GraphSyncStatus.SUCCEEDED }),
    });
  });

  it('should project DRUG_INTERACTION_UPSERT correctly', async () => {
    const job = {
      id: 'job3',
      aggregateType: 'DRUG_INTERACTION_RULE',
      aggregateId: 'di1',
      eventType: GraphSyncEventType.DRUG_INTERACTION_UPSERT,
      payload: {
        id: 'di1',
        activeIngredientAId: '1',
        activeIngredientBId: '2',
        severity: 'MAJOR',
        status: 'ACTIVE',
      },
      sourceVersion: '1',
      status: GraphSyncStatus.PENDING,
      retryCount: 0,
      createdAt: new Date(),
    };
    (prismaService.graphSyncOutbox.findMany as jest.Mock).mockResolvedValue([job]);

    await service.processPendingJobs();

    expect(neo4jService.write).toHaveBeenCalledWith(
      expect.stringContaining('MERGE (a)-[r:INTERACTS_WITH {id: $id}]->(b)'),
      expect.objectContaining({
        id: 'di1',
        aId: '1',
        bId: '2',
        severity: 'MAJOR',
        sourceVersion: 1,
      }),
    );
    expect(prismaService.graphSyncOutbox.update).toHaveBeenCalledWith({
      where: { id: 'job3' },
      data: expect.objectContaining({ status: GraphSyncStatus.SUCCEEDED }),
    });
  });
});
