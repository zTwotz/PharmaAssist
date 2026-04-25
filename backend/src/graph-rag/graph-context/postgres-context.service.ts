import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  MedicineContext,
  ActiveIngredientContext,
} from './graph-context.service';

@Injectable()
export class PostgresContextService {
  constructor(private readonly prisma: PrismaService) {}

  async getMedicineContainsActiveIngredientContext(
    medicineSlug: string,
  ): Promise<MedicineContext> {
    const medicine = await this.prisma.medicine.findFirst({
      where: { product: { slug: medicineSlug }, status: 'ACTIVE' },
      include: {
        product: true,
        ingredients: {
          include: {
            activeIngredient: true,
          },
        },
      },
    });

    if (!medicine || !medicine.product) {
      throw new NotFoundException(
        `Medicine slug: ${medicineSlug} is inactive or not found in PostgreSQL.`,
      );
    }

    const activeIngredients: Array<{ slug: string; name: string }> = [];

    for (const mapping of medicine.ingredients) {
      const ai = mapping.activeIngredient;
      if (ai && ai.status === 'ACTIVE') {
        const exists = activeIngredients.find(
          (a) => a.slug === ai.normalizedName,
        );
        if (!exists) {
          activeIngredients.push({ slug: ai.normalizedName, name: ai.name });
        }
      }
    }

    return {
      medicine: {
        slug: medicine.product.slug,
        name: medicine.product.name,
      },
      activeIngredients,
    };
  }

  async getActiveIngredientInteractsWithContext(
    activeIngredientSlug: string,
  ): Promise<ActiveIngredientContext> {
    const ai = await this.prisma.activeIngredient.findFirst({
      where: { normalizedName: activeIngredientSlug, status: 'ACTIVE' },
      include: {
        interactionsA: {
          include: { activeIngredientB: true },
          where: { isActive: true },
        },
        interactionsB: {
          include: { activeIngredientA: true },
          where: { isActive: true },
        },
      },
    });

    if (!ai) {
      throw new NotFoundException(
        `Active ingredient slug: ${activeIngredientSlug} is inactive or not found in PostgreSQL.`,
      );
    }

    const interactions: Array<{
      interactingIngredient: { slug: string; name: string };
      severity: string;
      description: string;
    }> = [];

    // Rules where ai is A
    for (const rule of ai.interactionsA) {
      const interactingAi = rule.activeIngredientB;
      if (interactingAi && interactingAi.status === 'ACTIVE') {
        const exists = interactions.find(
          (i) => i.interactingIngredient.slug === interactingAi.normalizedName,
        );
        if (!exists) {
          interactions.push({
            interactingIngredient: {
              slug: interactingAi.normalizedName,
              name: interactingAi.name,
            },
            severity: rule.severity || 'Unknown',
            description: rule.description || '',
          });
        }
      }
    }

    // Rules where ai is B
    for (const rule of ai.interactionsB) {
      const interactingAi = rule.activeIngredientA;
      if (interactingAi && interactingAi.status === 'ACTIVE') {
        const exists = interactions.find(
          (i) => i.interactingIngredient.slug === interactingAi.normalizedName,
        );
        if (!exists) {
          interactions.push({
            interactingIngredient: {
              slug: interactingAi.normalizedName,
              name: interactingAi.name,
            },
            severity: rule.severity || 'Unknown',
            description: rule.description || '',
          });
        }
      }
    }

    return {
      activeIngredient: {
        slug: ai.normalizedName,
        name: ai.name,
      },
      interactions,
    };
  }
}
