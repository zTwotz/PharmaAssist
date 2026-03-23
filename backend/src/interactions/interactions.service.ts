import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDrugInteractionDto } from './dto/create-drug-interaction.dto';
import { UpdateDrugInteractionDto } from './dto/update-drug-interaction.dto';

@Injectable()
export class InteractionsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.drugInteractionRule.findMany({
      include: {
        activeIngredientA: true,
        activeIngredientB: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createInteraction(dto: CreateDrugInteractionDto) {
    if (dto.activeIngredientAId === dto.activeIngredientBId) {
      throw new BadRequestException('Hai hoạt chất phải khác nhau');
    }

    const [ingredientA, ingredientB] = await Promise.all([
      this.prisma.activeIngredient.findUnique({
        where: { id: dto.activeIngredientAId },
      }),
      this.prisma.activeIngredient.findUnique({
        where: { id: dto.activeIngredientBId },
      }),
    ]);

    if (!ingredientA || !ingredientB) {
      throw new BadRequestException('Hoạt chất không tồn tại');
    }

    const existingRule = await this.prisma.drugInteractionRule.findFirst({
      where: {
        OR: [
          {
            activeIngredientAId: dto.activeIngredientAId,
            activeIngredientBId: dto.activeIngredientBId,
          },
          {
            activeIngredientAId: dto.activeIngredientBId,
            activeIngredientBId: dto.activeIngredientAId,
          },
        ],
      },
    });

    if (existingRule) {
      throw new BadRequestException(
        'Luật tương tác giữa 2 hoạt chất này đã tồn tại',
      );
    }

    const code = `DI-${Date.now()}`;
    return this.prisma.$transaction(async (tx) => {
      const interaction = await tx.drugInteractionRule.create({
        data: {
          code,
          activeIngredientAId: dto.activeIngredientAId,
          activeIngredientBId: dto.activeIngredientBId,
          severity: dto.severity,
          description: dto.description,
          recommendation: dto.recommendation,
        },
      });

      await tx.graphSyncOutbox.create({
        data: {
          entityType: 'InteractionRule',
          entityId: interaction.id,
          action: 'CREATE',
        },
      });

      return interaction;
    });
  }

  async updateInteraction(id: number, dto: UpdateDrugInteractionDto) {
    const existingRule = await this.prisma.drugInteractionRule.findUnique({
      where: { id },
    });

    if (!existingRule) {
      throw new BadRequestException('Luật tương tác không tồn tại');
    }

    return this.prisma.$transaction(async (tx) => {
      const interaction = await tx.drugInteractionRule.update({
        where: { id },
        data: {
          severity: dto.severity !== undefined ? dto.severity : undefined,
          description:
            dto.description !== undefined ? dto.description : undefined,
          recommendation:
            dto.recommendation !== undefined ? dto.recommendation : undefined,
        },
      });

      await tx.graphSyncOutbox.create({
        data: {
          entityType: 'InteractionRule',
          entityId: interaction.id,
          action: 'UPDATE',
        },
      });

      return interaction;
    });
  }

  async deactivateInteraction(id: number) {
    const existingRule = await this.prisma.drugInteractionRule.findUnique({
      where: { id },
    });

    if (!existingRule) {
      throw new BadRequestException('Luật tương tác không tồn tại');
    }

    return this.prisma.$transaction(async (tx) => {
      const interaction = await tx.drugInteractionRule.update({
        where: { id },
        data: {
          isActive: false,
        },
      });

      await tx.graphSyncOutbox.create({
        data: {
          entityType: 'InteractionRule',
          entityId: interaction.id,
          action: 'DEACTIVATE',
        },
      });

      return interaction;
    });
  }

  async checkInteractions(medicineIds: number[]) {
    // Only check if we have at least 2 medicines
    if (!medicineIds || medicineIds.length < 2) {
      return {
        interactions: [],
        hasInteractions: false,
        severeInteractionsCount: 0,
      };
    }

    const medicines = await this.prisma.medicine.findMany({
      where: { id: { in: medicineIds } },
      include: {
        ingredients: true,
      },
    });

    const activeRules = await this.prisma.drugInteractionRule.findMany({
      where: { isActive: true },
      include: {
        activeIngredientA: true,
        activeIngredientB: true,
      },
    });

    const interactions = [];
    let severeInteractionsCount = 0;

    for (let i = 0; i < medicines.length; i++) {
      for (let j = i + 1; j < medicines.length; j++) {
        const medA = medicines[i];
        const medB = medicines[j];

        const medAIngredients = medA.ingredients.map(
          (ing) => ing.activeIngredientId,
        );
        const medBIngredients = medB.ingredients.map(
          (ing) => ing.activeIngredientId,
        );

        for (const rule of activeRules) {
          const matchNormal =
            medAIngredients.includes(rule.activeIngredientAId) &&
            medBIngredients.includes(rule.activeIngredientBId);
          const matchReverse =
            medAIngredients.includes(rule.activeIngredientBId) &&
            medBIngredients.includes(rule.activeIngredientAId);

          if (matchNormal || matchReverse) {
            interactions.push({
              medicineAId: medA.id,
              medicineACode: medA.medicineCode,
              medicineBId: medB.id,
              medicineBCode: medB.medicineCode,
              ruleId: rule.id,
              severity: rule.severity,
              description: rule.description,
              recommendation: rule.recommendation,
              activeIngredientAName: rule.activeIngredientA.name,
              activeIngredientBName: rule.activeIngredientB.name,
            });
            if (rule.severity === 'HIGH') {
              severeInteractionsCount++;
            }
          }
        }
      }
    }

    return {
      interactions,
      hasInteractions: interactions.length > 0,
      severeInteractionsCount,
    };
  }

  async checkOrderInteractions(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        details: {
          include: {
            productVariant: {
              include: {
                product: {
                  include: {
                    medicines: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    const medicineIds: number[] = [];
    for (const detail of order.details) {
      const product = detail.productVariant?.product;
      if (product && product.medicines && product.medicines.length > 0) {
        medicineIds.push(...product.medicines.map((m) => m.id));
      }
    }

    const uniqueMedicineIds = Array.from(new Set(medicineIds));

    return this.checkInteractions(uniqueMedicineIds);
  }

  async acknowledgeAlert(alertId: number, staffUserId: string, note?: string) {
    const alert = await this.prisma.interactionAlert.findUnique({
      where: { id: alertId },
      include: { order: true },
    });

    if (!alert) {
      throw new NotFoundException('Không tìm thấy cảnh báo tương tác');
    }

    if (alert.isAcknowledged) {
      throw new BadRequestException('Cảnh báo này đã được xác nhận');
    }

    if (alert.severity === 'HIGH' && (!note || note.trim().length === 0)) {
      throw new BadRequestException(
        'Ghi chú tư vấn là bắt buộc đối với cảnh báo HIGH',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const updatedAlert = await tx.interactionAlert.update({
        where: { id: alertId },
        data: {
          isAcknowledged: true,
          acknowledgedBy: staffUserId,
          acknowledgedAt: new Date(),
          consultationNote: note,
        },
      });

      if (note && note.trim().length > 0 && alert.order.customerId) {
        await tx.consultationNote.create({
          data: {
            orderId: alert.orderId,
            customerId: alert.order.customerId,
            staffUserId: staffUserId,
            note: note,
            source: 'SYSTEM_INTERACTION_ALERT',
          },
        });
      }

      return updatedAlert;
    });
  }

  async getAlertHistory(query: {
    severity?: string;
    orderCode?: string;
    isAcknowledged?: boolean;
  }) {
    const where: any = {};
    if (query.severity) {
      where.severity = query.severity;
    }
    if (query.orderCode) {
      where.order = {
        code: {
          contains: query.orderCode,
          mode: 'insensitive',
        },
      };
    }
    if (query.isAcknowledged !== undefined) {
      where.isAcknowledged = query.isAcknowledged;
    }

    return this.prisma.interactionAlert.findMany({
      where,
      include: {
        order: {
          select: {
            id: true,
            code: true,
            status: true,
            createdAt: true,
            staffUserId: true,
            customerId: true,
            totalAmount: true,
            customer: {
              select: {
                id: true,
                fullName: true,
                phone: true,
              },
            },
          },
        },
        interaction: {
          select: {
            id: true,
            code: true,
            description: true,
            activeIngredientA: true,
            activeIngredientB: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
