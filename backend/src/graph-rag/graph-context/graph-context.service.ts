import { Injectable, NotFoundException } from '@nestjs/common';
import { Neo4jService } from '../../neo4j/neo4j.service';
import { GraphQueryTemplateService } from '../graph-query-template/graph-query-template.service';
import { AllowlistedQueryType } from '../graph-query-template/graph-query-template.types';
import { GraphFreshnessService } from '../../graph-sync/graph-freshness.service';
import { GraphUnavailableException } from './exceptions/graph-unavailable.exception';

export interface MedicineContext {
  medicine: {
    slug: string;
    name: string;
  };
  activeIngredients: Array<{
    slug: string;
    name: string;
  }>;
}

export interface ActiveIngredientContext {
  activeIngredient: {
    slug: string;
    name: string;
  };
  interactions: Array<{
    interactingIngredient: {
      slug: string;
      name: string;
    };
    severity: string;
    description: string;
  }>;
}

@Injectable()
export class GraphContextService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly queryTemplateService: GraphQueryTemplateService,
    private readonly graphFreshnessService: GraphFreshnessService,
  ) {}

  /**
   * Safe execution wrapper for graph-only queries.
   * Ensures that if the graph is stale or unavailable, we throw a safe error (503)
   * instead of a 500 stack trace, since these queries don't have a PostgreSQL fallback.
   */
  async executeGraphOnlyQuery(
    queryType: AllowlistedQueryType,
    params: Record<string, any>,
  ) {
    // 1. Check global freshness. If stale, fail fast.
    const freshness = await this.graphFreshnessService.checkFreshness();
    if (freshness.isStale) {
      throw new GraphUnavailableException(freshness.reason);
    }

    const template = this.queryTemplateService.getTemplate(queryType, params);

    // 2. Execute and catch Neo4j connection errors
    try {
      const result = await this.neo4jService.read(
        template.query,
        template.params,
      );
      return result;
    } catch (error) {
      // Catch any neo4j-driver errors and wrap in a safe HTTP exception
      throw new GraphUnavailableException(error.message);
    }
  }

  /**
   * Retrieves the relational context of a Medicine containing its Active Ingredients.
   * Ensures data is filtered for isActive: true.
   */
  async getMedicineContainsActiveIngredientContext(
    medicineSlug: string,
  ): Promise<MedicineContext> {
    const template = this.queryTemplateService.getTemplate(
      AllowlistedQueryType.MEDICINE_CONTAINS_ACTIVE_INGREDIENT,
      { medicineSlug },
    );

    const result = await this.neo4jService.read(
      template.query,
      template.params,
    );

    if (!result.records || result.records.length === 0) {
      throw new NotFoundException(
        `No graph context found for medicine slug: ${medicineSlug}`,
      );
    }

    let medicineProps: any = null;
    const activeIngredients: Array<{ slug: string; name: string }> = [];

    for (const record of result.records) {
      const mNode = record.get('m');
      const aNode = record.get('a');

      if (mNode && mNode.properties) {
        // Ensure medicine is active
        if (mNode.properties.isActive !== false) {
          if (!medicineProps) {
            medicineProps = mNode.properties;
          }
        }
      }

      if (aNode && aNode.properties) {
        // Ensure active ingredient is active
        if (aNode.properties.isActive !== false) {
          // Avoid duplicates
          const exists = activeIngredients.find(
            (ai) => ai.slug === aNode.properties.slug,
          );
          if (!exists) {
            activeIngredients.push({
              slug: aNode.properties.slug,
              name: aNode.properties.name,
            });
          }
        }
      }
    }

    if (!medicineProps) {
      throw new NotFoundException(
        `Medicine slug: ${medicineSlug} is inactive or not found in graph.`,
      );
    }

    return {
      medicine: {
        slug: medicineProps.slug,
        name: medicineProps.name,
      },
      activeIngredients,
    };
  }

  /**
   * Retrieves the interactions context of an Active Ingredient.
   * Ensures data is filtered for isActive: true.
   */
  async getActiveIngredientInteractsWithContext(
    activeIngredientSlug: string,
  ): Promise<ActiveIngredientContext> {
    const template = this.queryTemplateService.getTemplate(
      AllowlistedQueryType.ACTIVE_INGREDIENT_INTERACTS_WITH,
      { activeIngredientSlug },
    );

    const result = await this.neo4jService.read(
      template.query,
      template.params,
    );

    if (!result.records || result.records.length === 0) {
      throw new NotFoundException(
        `No graph context found for active ingredient slug: ${activeIngredientSlug}`,
      );
    }

    let primaryIngredientProps: any = null;
    const interactions: Array<{
      interactingIngredient: { slug: string; name: string };
      severity: string;
      description: string;
    }> = [];

    for (const record of result.records) {
      const a1Node = record.get('a1');
      const rRel = record.get('r');
      const a2Node = record.get('a2');

      if (a1Node && a1Node.properties) {
        if (a1Node.properties.isActive !== false) {
          if (!primaryIngredientProps) {
            primaryIngredientProps = a1Node.properties;
          }
        }
      }

      if (a2Node && a2Node.properties && rRel && rRel.properties) {
        if (a2Node.properties.isActive !== false && primaryIngredientProps) {
          // Avoid duplicates
          const exists = interactions.find(
            (i) => i.interactingIngredient.slug === a2Node.properties.slug,
          );
          if (!exists) {
            interactions.push({
              interactingIngredient: {
                slug: a2Node.properties.slug,
                name: a2Node.properties.name,
              },
              severity: rRel.properties.severity || 'Unknown',
              description: rRel.properties.description || '',
            });
          }
        }
      }
    }

    if (!primaryIngredientProps) {
      throw new NotFoundException(
        `Active ingredient slug: ${activeIngredientSlug} is inactive or not found in graph.`,
      );
    }

    return {
      activeIngredient: {
        slug: primaryIngredientProps.slug,
        name: primaryIngredientProps.name,
      },
      interactions,
    };
  }
}
