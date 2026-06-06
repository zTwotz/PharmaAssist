import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InteractionsService {
  constructor(private prisma: PrismaService) {}

  async checkInteractions(medicineIds: number[]) {
    // Only check if we have at least 2 medicines
    if (!medicineIds || medicineIds.length < 2) {
      return { interactions: [] };
    }

    // Query the database for any interactions between these medicines
    const interactions = await this.prisma.drugInteraction.findMany({
      where: {
        isActive: true,
        OR: [
          {
            medicineAId: { in: medicineIds },
            medicineBId: { in: medicineIds },
          },
        ],
      },
      include: {
        medicineA: {
          include: {
            product: {
              select: { name: true },
            },
          },
        },
        medicineB: {
          include: {
            product: {
              select: { name: true },
            },
          },
        },
      },
    });

    // Format the response
    const formattedInteractions = interactions.map((interaction) => ({
      id: interaction.id,
      severity: interaction.severity,
      medicineA: {
        id: interaction.medicineA.id,
        name: interaction.medicineA.product?.name || `Medicine ${interaction.medicineA.id}`,
      },
      medicineB: {
        id: interaction.medicineB.id,
        name: interaction.medicineB.product?.name || `Medicine ${interaction.medicineB.id}`,
      },
      description: interaction.description,
      recommendation: interaction.recommendation,
    }));

    return {
      interactions: formattedInteractions,
      hasInteractions: formattedInteractions.length > 0,
      severeInteractionsCount: formattedInteractions.filter(
        (i) => i.severity === 'SEVERE' || i.severity === 'Nghiêm trọng'
      ).length,
    };
  }
}
