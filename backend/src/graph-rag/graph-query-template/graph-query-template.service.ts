import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import {
  AllowlistedQueryType,
  GraphQueryTemplateResult,
} from './graph-query-template.types';

@Injectable()
export class GraphQueryTemplateService {
  /**
   * Retrieves a safe, parameterizable Cypher query based on the allowlisted query type.
   * Prevents raw Cypher injection and limits traversal depth/size.
   */
  public getTemplate(
    queryType: AllowlistedQueryType,
    params: Record<string, any>,
  ): GraphQueryTemplateResult {
    if (
      !queryType ||
      !Object.values(AllowlistedQueryType).includes(queryType)
    ) {
      throw new ForbiddenException(
        'Raw Cypher execution or unauthorized query type is strictly prohibited.',
      );
    }

    switch (queryType) {
      case AllowlistedQueryType.MEDICINE_CONTAINS_ACTIVE_INGREDIENT:
        if (!params.medicineSlug) {
          throw new BadRequestException(
            'Missing required parameter: medicineSlug',
          );
        }
        return {
          query: `
            MATCH (m:Medicine {slug: $medicineSlug})-[:CONTAINS]->(a:ActiveIngredient)
            RETURN m, a
            LIMIT 50
          `.trim(),
          params: {
            medicineSlug: params.medicineSlug,
          },
        };

      case AllowlistedQueryType.ACTIVE_INGREDIENT_INTERACTS_WITH:
        if (!params.activeIngredientSlug) {
          throw new BadRequestException(
            'Missing required parameter: activeIngredientSlug',
          );
        }
        return {
          query: `
            MATCH (a1:ActiveIngredient {slug: $activeIngredientSlug})-[r:INTERACTS_WITH]-(a2:ActiveIngredient)
            RETURN a1, r, a2
            LIMIT 50
          `.trim(),
          params: {
            activeIngredientSlug: params.activeIngredientSlug,
          },
        };

      default:
        throw new ForbiddenException('Unauthorized query template requested.');
    }
  }
}
