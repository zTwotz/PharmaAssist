import { Test, TestingModule } from '@nestjs/testing';
import { GraphFreshnessService } from './graph-freshness.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('GraphFreshnessService', () => {
  let service: GraphFreshnessService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GraphFreshnessService,
        {
          provide: PrismaService,
          useValue: {
            graphSyncOutbox: {
              count: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<GraphFreshnessService>(GraphFreshnessService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('evaluateFreshness', () => {
    it('should return FRESH status when no pending or failed jobs exist', async () => {
      // Mock count to return 0 for both PENDING and FAILED
      (prismaService.graphSyncOutbox.count as jest.Mock).mockResolvedValue(0);

      const result = await service.evaluateFreshness();

      expect(prismaService.graphSyncOutbox.count).toHaveBeenCalledTimes(2);
      expect(result.isFresh).toBe(true);
      expect(result.reason).toBe('Graph is fully synchronized with PostgreSQL');
      expect(result.pendingJobs).toBe(0);
      expect(result.failedJobs).toBe(0);
    });

    it('should return STALE status (isFresh=false) when pending jobs exist', async () => {
      // Mock count to return 5 for PENDING, and 0 for FAILED
      (prismaService.graphSyncOutbox.count as jest.Mock).mockImplementation(
        ({ where }) => {
          if (where.status === 'PENDING') return Promise.resolve(5);
          return Promise.resolve(0);
        },
      );

      const result = await service.evaluateFreshness();

      expect(result.isFresh).toBe(false);
      expect(result.reason).toBe('Pending graph sync jobs exist');
      expect(result.pendingJobs).toBe(5);
    });

    it('should return STALE status (isFresh=false) when failed jobs exist', async () => {
      // Mock count to return 0 for PENDING, and 2 for FAILED
      (prismaService.graphSyncOutbox.count as jest.Mock).mockImplementation(
        ({ where }) => {
          if (where.status === 'PENDING') return Promise.resolve(0);
          if (where.status === 'FAILED') return Promise.resolve(2);
          return Promise.resolve(0);
        },
      );

      const result = await service.evaluateFreshness();

      expect(result.isFresh).toBe(false);
      expect(result.reason).toBe('Failed graph sync jobs exist');
      expect(result.failedJobs).toBe(2);
    });
  });

  describe('verifyNodeSourceVersion', () => {
    it('should return true for a node with sourceVersion', () => {
      const validNode = { properties: { sourceVersion: 1234567890 } };
      expect(service.verifyNodeSourceVersion(validNode)).toBe(true);
    });

    it('should return false for a node without sourceVersion', () => {
      const staleNode = { properties: { name: 'Panadol' } };
      expect(service.verifyNodeSourceVersion(staleNode)).toBe(false);
    });

    it('should return false for a node with missing properties', () => {
      const emptyNode = {};
      expect(service.verifyNodeSourceVersion(emptyNode)).toBe(false);
    });
  });
});
