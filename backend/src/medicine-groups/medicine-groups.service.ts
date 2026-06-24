import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MedicineGroupsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const groups = await this.prisma.medicineGroup.findMany({
      where: { status: 'ACTIVE' },
      include: {
        members: {
          include: {
            medicine: {
              include: {
                product: {
                  include: {
                    variants: {
                      include: { unit: true },
                    },
                    images: true,
                  },
                },
                unit: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return groups.map((group) => ({
      id: group.id,
      name: group.name,
      description: group.description,
      members: group.members.map((member) => ({
        medicine: {
          id: member.medicine.id,
          name: member.medicine.product.name,
          sku: member.medicine.product.variants[0]?.sku || '',
          sellingPrice: Number(member.medicine.product.variants[0]?.sellingPrice || 0),
          imageUrl: member.medicine.product.images[0]?.imageUrl || null,
          baseUnit: member.medicine.unit?.name || '',
          product: {
            variants: member.medicine.product.variants.map((v) => ({ id: v.id })),
          },
        },
      })),
    }));
  }
}
