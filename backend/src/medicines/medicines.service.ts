import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';

@Injectable()
export class MedicinesService {
  constructor(private prisma: PrismaService) {}

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim() + '-' + Date.now().toString(36);
  }

  async createMedicine(dto: CreateMedicineDto) {
    // Check if product code or medicine code already exists
    const existingProduct = await this.prisma.product.findUnique({
      where: { code: dto.code },
    });
    if (existingProduct) {
      throw new BadRequestException('Product code already exists');
    }

    const existingMedicine = await this.prisma.medicine.findUnique({
      where: { medicineCode: dto.medicineCode },
    });
    if (existingMedicine) {
      throw new BadRequestException('Medicine code already exists');
    }

    const slug = this.generateSlug(dto.name);

    return await this.prisma.$transaction(async (tx) => {
      // 1. Create Product
      const product = await tx.product.create({
        data: {
          code: dto.code,
          name: dto.name,
          slug,
          categoryId: dto.categoryId,
          brandId: dto.brandId,
          manufacturerId: dto.manufacturerId,
          shortDescription: dto.shortDescription,
          description: dto.description,
          productType: 'MEDICINE',
          status: 'ACTIVE',
        },
      });

      // 2. Create Medicine details
      const medicine = await tx.medicine.create({
        data: {
          productId: product.id,
          medicineCode: dto.medicineCode,
          registrationNumber: dto.registrationNumber,
          dosageFormId: dto.dosageFormId,
          medicineUnitId: dto.medicineUnitId,
          requiresPrescription: dto.requiresPrescription || false,
          usageNote: dto.usageNote,
          storageInstruction: dto.storageInstruction,
          shelfLifeMonths: dto.shelfLifeMonths,
          status: 'ACTIVE',
        },
      });

      return { product, medicine };
    });
  }

  async getReferenceData() {
    const [categories, units, dosageForms, brands, manufacturers] = await Promise.all([
      this.prisma.productCategory.findMany({ where: { status: 'ACTIVE' }, select: { id: true, name: true, code: true } }),
      this.prisma.medicineUnit.findMany({ select: { id: true, name: true, code: true } }),
      this.prisma.dosageForm.findMany({ select: { id: true, name: true, code: true } }),
      this.prisma.brand.findMany({ where: { status: 'ACTIVE' }, select: { id: true, name: true, code: true } }),
      this.prisma.manufacturer.findMany({ where: { status: 'ACTIVE' }, select: { id: true, name: true, code: true } }),
    ]);

    return {
      categories,
      units,
      dosageForms,
      brands,
      manufacturers,
    };
  }
}
