import { Test, TestingModule } from '@nestjs/testing';
import { GraphQueryTemplateService } from './graph-query-template.service';
import { ForbiddenException } from '@nestjs/common';
import { AllowlistedQueryType } from './graph-query-template.types';

describe('GraphQueryTemplateService', () => {
  let service: GraphQueryTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphQueryTemplateService],
    }).compile();

    service = module.get<GraphQueryTemplateService>(GraphQueryTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTemplate', () => {
    it('should return correct template for MEDICINE_CONTAINS_ACTIVE_INGREDIENT', () => {
      const params = { medicineSlug: 'panadol' };
      const result = service.getTemplate(
        AllowlistedQueryType.MEDICINE_CONTAINS_ACTIVE_INGREDIENT,
        params,
      );

      expect(result.query).toContain(
        'MATCH (m:Medicine {slug: $medicineSlug})-[:CONTAINS]->(a:ActiveIngredient)',
      );
      expect(result.query).toContain('LIMIT');
      expect(result.params).toEqual({ medicineSlug: 'panadol' });
    });

    it('should return correct template for ACTIVE_INGREDIENT_INTERACTS_WITH', () => {
      const params = { activeIngredientSlug: 'paracetamol' };
      const result = service.getTemplate(
        AllowlistedQueryType.ACTIVE_INGREDIENT_INTERACTS_WITH,
        params,
      );

      expect(result.query).toContain(
        'MATCH (a1:ActiveIngredient {slug: $activeIngredientSlug})-[r:INTERACTS_WITH]-(a2:ActiveIngredient)',
      );
      expect(result.query).toContain('LIMIT');
      expect(result.params).toEqual({ activeIngredientSlug: 'paracetamol' });
    });

    it('should throw ForbiddenException if query type is not in allowlist', () => {
      expect(() => {
        service.getTemplate('RAW_CYPHER' as any, {});
      }).toThrow(ForbiddenException);
    });

    it('should throw ForbiddenException if query type is undefined', () => {
      expect(() => {
        service.getTemplate(undefined as any, {});
      }).toThrow(ForbiddenException);
    });

    it('should sanitize or strictly require parameters to exist', () => {
      // If parameter is missing, it should probably throw or handle it
      expect(() => {
        service.getTemplate(
          AllowlistedQueryType.MEDICINE_CONTAINS_ACTIVE_INGREDIENT,
          {},
        );
      }).toThrow('Missing required parameter: medicineSlug');
    });
  });
});
