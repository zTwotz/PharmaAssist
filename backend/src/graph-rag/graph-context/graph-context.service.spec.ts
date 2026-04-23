import { Test, TestingModule } from '@nestjs/testing';
import { GraphContextService } from './graph-context.service';
import { Neo4jService } from '../../neo4j/neo4j.service';
import { GraphQueryTemplateService } from '../graph-query-template/graph-query-template.service';
import { AllowlistedQueryType } from '../graph-query-template/graph-query-template.types';
import { NotFoundException } from '@nestjs/common';
import { GraphFreshnessService } from '../../graph-sync/graph-freshness.service';
import { GraphUnavailableException } from './exceptions/graph-unavailable.exception';

describe('GraphContextService', () => {
  let service: GraphContextService;
  let neo4jService: jest.Mocked<Neo4jService>;
  let queryTemplateService: jest.Mocked<GraphQueryTemplateService>;
  let graphFreshnessService: jest.Mocked<GraphFreshnessService>;

  beforeEach(async () => {
    neo4jService = {
      read: jest.fn(),
    } as any;

    queryTemplateService = {
      getTemplate: jest.fn(),
    };

    graphFreshnessService = {
      checkFreshness: jest.fn().mockResolvedValue({ isStale: false }),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GraphContextService,
        { provide: Neo4jService, useValue: neo4jService },
        { provide: GraphQueryTemplateService, useValue: queryTemplateService },
        { provide: GraphFreshnessService, useValue: graphFreshnessService },
      ],
    }).compile();

    service = module.get<GraphContextService>(GraphContextService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('executeGraphOnlyQuery', () => {
    it('should throw GraphUnavailableException if graph is stale', async () => {
      graphFreshnessService.checkFreshness.mockResolvedValueOnce({
        isStale: true,
        reason: 'PENDING_OUTBOX',
      });

      await expect(
        service.executeGraphOnlyQuery(
          AllowlistedQueryType.MEDICINE_CONTAINS_ACTIVE_INGREDIENT,
          {},
        ),
      ).rejects.toThrow(GraphUnavailableException);
      expect(neo4jService.read).not.toHaveBeenCalled();
    });

    it('should throw GraphUnavailableException if Neo4j throws', async () => {
      graphFreshnessService.checkFreshness.mockResolvedValueOnce({
        isStale: false,
      });
      queryTemplateService.getTemplate.mockReturnValueOnce({
        query: 'MATCH (n) RETURN n',
        params: {},
      });
      neo4jService.read.mockRejectedValueOnce(new Error('Connection refused'));

      await expect(
        service.executeGraphOnlyQuery(
          AllowlistedQueryType.MEDICINE_CONTAINS_ACTIVE_INGREDIENT,
          {},
        ),
      ).rejects.toThrow(GraphUnavailableException);
    });

    it('should return result if successful', async () => {
      graphFreshnessService.checkFreshness.mockResolvedValueOnce({
        isStale: false,
      });
      queryTemplateService.getTemplate.mockReturnValueOnce({
        query: 'MATCH (n) RETURN n',
        params: {},
      });
      neo4jService.read.mockResolvedValueOnce({ records: [] } as any);

      const result = await service.executeGraphOnlyQuery(
        AllowlistedQueryType.MEDICINE_CONTAINS_ACTIVE_INGREDIENT,
        {},
      );
      expect(result.records).toEqual([]);
    });
  });

  describe('getMedicineContainsActiveIngredientContext', () => {
    it('should query active ingredients for a medicine slug and return mapped context', async () => {
      // Mock the template
      queryTemplateService.getTemplate.mockReturnValue({
        query: 'MATCH ...',
        params: { medicineSlug: 'panadol' },
      });

      // Mock neo4j result
      neo4jService.read.mockResolvedValue({
        records: [
          {
            get: (key: string) => {
              if (key === 'm')
                return {
                  properties: {
                    slug: 'panadol',
                    name: 'Panadol Extra',
                    isActive: true,
                  },
                };
              if (key === 'a')
                return {
                  properties: {
                    slug: 'paracetamol',
                    name: 'Paracetamol',
                    isActive: true,
                  },
                };
              return null;
            },
          },
          {
            get: (key: string) => {
              if (key === 'm')
                return {
                  properties: {
                    slug: 'panadol',
                    name: 'Panadol Extra',
                    isActive: true,
                  },
                };
              if (key === 'a')
                return {
                  properties: {
                    slug: 'caffeine',
                    name: 'Caffeine',
                    isActive: true,
                  },
                };
              return null;
            },
          },
        ],
      } as any);

      const result =
        await service.getMedicineContainsActiveIngredientContext('panadol');

      expect(queryTemplateService.getTemplate).toHaveBeenCalledWith(
        AllowlistedQueryType.MEDICINE_CONTAINS_ACTIVE_INGREDIENT,
        { medicineSlug: 'panadol' },
      );
      expect(neo4jService.read).toHaveBeenCalledWith('MATCH ...', {
        medicineSlug: 'panadol',
      });

      expect(result).toEqual({
        medicine: { slug: 'panadol', name: 'Panadol Extra' },
        activeIngredients: [
          { slug: 'paracetamol', name: 'Paracetamol' },
          { slug: 'caffeine', name: 'Caffeine' },
        ],
      });
    });

    it('should throw NotFoundException if neo4j returns no records', async () => {
      queryTemplateService.getTemplate.mockReturnValue({
        query: '',
        params: {},
      });
      neo4jService.read.mockResolvedValue({ records: [] } as any);

      await expect(
        service.getMedicineContainsActiveIngredientContext('unknown-slug'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should filter out inactive data if queried graph contains inactive entities', async () => {
      queryTemplateService.getTemplate.mockReturnValue({
        query: '',
        params: {},
      });

      neo4jService.read.mockResolvedValue({
        records: [
          {
            get: (key: string) => {
              if (key === 'm')
                return {
                  properties: { slug: 'med1', name: 'Med1', isActive: true },
                };
              if (key === 'a')
                return {
                  properties: {
                    slug: 'active1',
                    name: 'Active1',
                    isActive: false,
                  },
                }; // INACTIVE!
              return null;
            },
          },
          {
            get: (key: string) => {
              if (key === 'm')
                return {
                  properties: { slug: 'med1', name: 'Med1', isActive: true },
                };
              if (key === 'a')
                return {
                  properties: {
                    slug: 'active2',
                    name: 'Active2',
                    isActive: true,
                  },
                }; // ACTIVE!
              return null;
            },
          },
        ],
      } as any);

      const result =
        await service.getMedicineContainsActiveIngredientContext('med1');

      // Should only contain Active2
      expect(result.activeIngredients).toHaveLength(1);
      expect(result.activeIngredients[0].slug).toBe('active2');
    });
  });

  describe('getActiveIngredientInteractsWithContext', () => {
    it('should query interactions for an active ingredient slug and return mapped context', async () => {
      queryTemplateService.getTemplate.mockReturnValue({
        query: 'MATCH ...',
        params: { activeIngredientSlug: 'paracetamol' },
      });

      neo4jService.read.mockResolvedValue({
        records: [
          {
            get: (key: string) => {
              if (key === 'a1')
                return {
                  properties: {
                    slug: 'paracetamol',
                    name: 'Paracetamol',
                    isActive: true,
                  },
                };
              if (key === 'r')
                return {
                  properties: {
                    severity: 'Moderate',
                    description: 'May increase liver damage',
                  },
                };
              if (key === 'a2')
                return {
                  properties: {
                    slug: 'alcohol',
                    name: 'Alcohol',
                    isActive: true,
                  },
                };
              return null;
            },
          },
        ],
      } as any);

      const result =
        await service.getActiveIngredientInteractsWithContext('paracetamol');

      expect(queryTemplateService.getTemplate).toHaveBeenCalledWith(
        AllowlistedQueryType.ACTIVE_INGREDIENT_INTERACTS_WITH,
        { activeIngredientSlug: 'paracetamol' },
      );

      expect(result).toEqual({
        activeIngredient: { slug: 'paracetamol', name: 'Paracetamol' },
        interactions: [
          {
            interactingIngredient: { slug: 'alcohol', name: 'Alcohol' },
            severity: 'Moderate',
            description: 'May increase liver damage',
          },
        ],
      });
    });

    it('should filter out interactions with inactive ingredients', async () => {
      queryTemplateService.getTemplate.mockReturnValue({
        query: '',
        params: {},
      });

      neo4jService.read.mockResolvedValue({
        records: [
          {
            get: (key: string) => {
              if (key === 'a1')
                return {
                  properties: {
                    slug: 'paracetamol',
                    name: 'Paracetamol',
                    isActive: true,
                  },
                };
              if (key === 'r') return { properties: { severity: 'High' } };
              if (key === 'a2')
                return {
                  properties: {
                    slug: 'inactive-drug',
                    name: 'Inactive Drug',
                    isActive: false,
                  },
                };
              return null;
            },
          },
        ],
      } as any);

      const result =
        await service.getActiveIngredientInteractsWithContext('paracetamol');

      expect(result.interactions).toHaveLength(0);
    });

    it('should throw NotFoundException if a1 is inactive or not found', async () => {
      queryTemplateService.getTemplate.mockReturnValue({
        query: '',
        params: {},
      });
      neo4jService.read.mockResolvedValue({ records: [] } as any);

      await expect(
        service.getActiveIngredientInteractsWithContext('unknown'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
