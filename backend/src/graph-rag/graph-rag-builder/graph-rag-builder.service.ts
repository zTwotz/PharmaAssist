import { Injectable, Logger } from '@nestjs/common';
import {
  GraphContextService,
  MedicineContext,
  ActiveIngredientContext,
} from '../graph-context/graph-context.service';

export interface GraphRagContextData {
  medicines: MedicineContext[];
  interactions: ActiveIngredientContext[];
}

export interface GraphRagProvenanceMetadata {
  graphUsed: boolean;
  medicineSlugs: string[];
  activeIngredientSlugs: string[];
  interactionPairs: Array<{
    ingredient1: string;
    ingredient2: string;
    severity: string;
  }>;
}

@Injectable()
export class GraphRagBuilderService {
  private readonly logger = new Logger(GraphRagBuilderService.name);

  constructor(private readonly graphContextService: GraphContextService) {}

  /**
   * Aggregates Graph-RAG context for a list of medicine slugs.
   */
  async buildContextForMedicines(
    medicineSlugs: string[],
  ): Promise<GraphRagContextData> {
    const medicines: MedicineContext[] = [];
    const activeIngredientsSet = new Set<string>();

    // 1. Fetch medicine context (and collect active ingredients)
    for (const slug of medicineSlugs) {
      try {
        const medCtx =
          await this.graphContextService.getMedicineContainsActiveIngredientContext(
            slug,
          );
        medicines.push(medCtx);
        for (const ai of medCtx.activeIngredients) {
          activeIngredientsSet.add(ai.slug);
        }
      } catch (error) {
        this.logger.warn(
          `Failed to fetch medicine context for slug: ${slug} - ${error.message}`,
        );
      }
    }

    // 2. Fetch interaction context for all discovered active ingredients
    const interactions: ActiveIngredientContext[] = [];
    for (const aiSlug of Array.from(activeIngredientsSet)) {
      try {
        const intCtx =
          await this.graphContextService.getActiveIngredientInteractsWithContext(
            aiSlug,
          );
        if (intCtx.interactions && intCtx.interactions.length > 0) {
          interactions.push(intCtx);
        }
      } catch (error) {
        this.logger.warn(
          `Failed to fetch interaction context for active ingredient: ${aiSlug} - ${error.message}`,
        );
      }
    }

    return { medicines, interactions };
  }

  /**
   * Formats the structured Graph-RAG data into a textual prompt suitable for an LLM.
   */
  formatContextAsText(data: GraphRagContextData): string {
    let text = '=== GRAPH KNOWLEDGE BASE CONTEXT ===\n\n';

    text += 'MEDICINES AND INGREDIENTS:\n';
    if (data.medicines.length === 0) {
      text += 'No relevant medicines found in graph.\n';
    } else {
      for (const med of data.medicines) {
        text += `- ${med.medicine.name} (Slug: ${med.medicine.slug})\n`;
        text += `  Active Ingredients: ${med.activeIngredients.map((ai) => ai.name).join(', ') || 'None known'}\n`;
      }
    }

    text += '\nKNOWN DRUG INTERACTIONS:\n';
    if (data.interactions.length === 0) {
      text += 'No known interactions found among the active ingredients.\n';
    } else {
      for (const interactionCtx of data.interactions) {
        const aiName = interactionCtx.activeIngredient.name;
        for (const int of interactionCtx.interactions) {
          text += `- ${aiName} INTERACTS WITH ${int.interactingIngredient.name}:\n`;
          text += `  Severity: ${int.severity}\n`;
          text += `  Description: ${int.description}\n`;
        }
      }
    }

    text += '\n====================================';
    return text;
  }

  /**
   * Extracts structured provenance metadata from the graph context.
   * Useful for the frontend to render citations and UI highlights.
   */
  buildProvenanceMetadata(
    data: GraphRagContextData,
  ): GraphRagProvenanceMetadata {
    const graphUsed = data.medicines.length > 0 || data.interactions.length > 0;
    const medicineSlugs = new Set<string>();
    const activeIngredientSlugs = new Set<string>();
    const interactionPairs: Array<{
      ingredient1: string;
      ingredient2: string;
      severity: string;
    }> = [];

    for (const med of data.medicines) {
      medicineSlugs.add(med.medicine.slug);
      for (const ai of med.activeIngredients) {
        activeIngredientSlugs.add(ai.slug);
      }
    }

    for (const interactionCtx of data.interactions) {
      const slug1 = interactionCtx.activeIngredient.slug;
      activeIngredientSlugs.add(slug1);

      for (const int of interactionCtx.interactions) {
        const slug2 = int.interactingIngredient.slug;
        activeIngredientSlugs.add(slug2);

        // Add interaction pair (prevent dupes regardless of ordering if needed, but here we just list them)
        interactionPairs.push({
          ingredient1: slug1,
          ingredient2: slug2,
          severity: int.severity,
        });
      }
    }

    return {
      graphUsed,
      medicineSlugs: Array.from(medicineSlugs),
      activeIngredientSlugs: Array.from(activeIngredientSlugs),
      interactionPairs,
    };
  }
}
