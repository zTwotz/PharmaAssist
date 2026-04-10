import { Injectable, NotFoundException } from '@nestjs/common';
import { Neo4jService } from '../../neo4j/neo4j.service';
import { GraphQueryTemplateService } from '../graph-query-template/graph-query-template.service';
import { AllowlistedQueryType } from '../graph-query-template/graph-query-template.types';

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

@Injectable()
export class GraphContextService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly queryTemplateService: GraphQueryTemplateService,
  ) {}

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
}
