import { Test, TestingModule } from '@nestjs/testing';
import { GraphRagFallbackService } from './graph-rag-fallback.service';
import { GraphFreshnessService } from '../../graph-sync/graph-freshness/graph-freshness.service';

describe('GraphRagFallbackService', () => {
  let service: GraphRagFallbackService;
  let freshnessService: GraphFreshnessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GraphRagFallbackService,
        {
          provide: GraphFreshnessService,
          useValue: {
            evaluateFreshness: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GraphRagFallbackService>(GraphRagFallbackService);
    freshnessService = module.get<GraphFreshnessService>(GraphFreshnessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getContextForQuery', () => {
    const query = 'Ibuprofen interactions';

    it('should fall back to PostgreSQL (graphUsed=false) with warning if Neo4j is unavailable', async () => {
      const result = await service.getContextForQuery(query, false);

      expect(result.graphUsed).toBe(false);
      expect(result.context).toContain('[Relational Context]');
      expect(result.warnings).toBeDefined();
      expect(result.warnings![0]).toContain('Graph database is unavailable');
      // Should not even check freshness if graph is unavailable
      expect(freshnessService.evaluateFreshness).not.toHaveBeenCalled();
    });

    it('should fall back to PostgreSQL (graphUsed=false) with warning if graph is stale', async () => {
      (freshnessService.evaluateFreshness as jest.Mock).mockResolvedValue({
        isFresh: false,
        reason: 'Pending jobs exist',
      });

      const result = await service.getContextForQuery(query, true);

      expect(freshnessService.evaluateFreshness).toHaveBeenCalled();
      expect(result.graphUsed).toBe(false);
      expect(result.context).toContain('[Relational Context]');
      expect(result.warnings).toBeDefined();
      expect(result.warnings![0]).toContain('Graph data is stale');
      expect(result.warnings![0]).toContain('Pending jobs exist');
    });

    it('should use Graph (graphUsed=true) without warnings if Neo4j is available and graph is fresh', async () => {
      (freshnessService.evaluateFreshness as jest.Mock).mockResolvedValue({
        isFresh: true,
      });

      const result = await service.getContextForQuery(query, true);

      expect(freshnessService.evaluateFreshness).toHaveBeenCalled();
      expect(result.graphUsed).toBe(true);
      expect(result.context).toContain('[Graph Context]');
      expect(result.warnings).toBeUndefined();
    });

    it('should fall back to PostgreSQL if Neo4j query throws an exception, even if fresh', async () => {
      (freshnessService.evaluateFreshness as jest.Mock).mockResolvedValue({
        isFresh: true,
      });

      // Mock private method getNeo4jContext to throw an error
      jest.spyOn(service as any, 'getNeo4jContext').mockRejectedValue(new Error('Connection timeout'));

      const result = await service.getContextForQuery(query, true);

      expect(result.graphUsed).toBe(false);
      expect(result.context).toContain('[Relational Context]');
      expect(result.warnings).toBeDefined();
      expect(result.warnings![0]).toContain('Error querying graph');
    });
  });
});
