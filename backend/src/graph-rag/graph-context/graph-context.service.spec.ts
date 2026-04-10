import { Test, TestingModule } from '@nestjs/testing';
import { GraphContextService } from './graph-context.service';
import { Neo4jService } from '../../neo4j/neo4j.service';
import { GraphQueryTemplateService } from '../graph-query-template/graph-query-template.service';
import { AllowlistedQueryType } from '../graph-query-template/graph-query-template.types';
import { NotFoundException } from '@nestjs/common';

describe('GraphContextService', () => {
  let service: GraphContextService;
  let neo4jService: jest.Mocked<Neo4jService>;
  let queryTemplateService: jest.Mocked<GraphQueryTemplateService>;

  beforeEach(async () => {
    neo4jService = {
      read: jest.fn(),
    } as any;

    queryTemplateService = {
      getTemplate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GraphContextService,
        { provide: Neo4jService, useValue: neo4jService },
        { provide: GraphQueryTemplateService, useValue: queryTemplateService },
      ],
    }).compile();

    service = module.get<GraphContextService>(GraphContextService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
});
