import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { UpdateMedicineIngredientsDto } from './dto/update-medicine-ingredients.dto';

@Injectable()
export class MedicinesService {
  constructor(private prisma: PrismaService) {}

  private generateSlug(name: string): string {
    return (
      name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim() +
      '-' +
      Date.now().toString(36)
    );
  }

  async createMedicine(dto: CreateMedicineDto) {
    if (dto.sellingPrice !== undefined && dto.sellingPrice <= 0) {
      throw new BadRequestException('Giá bán phải lớn hơn 0');
    }

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

      // 3. Create default ProductVariant
      await tx.productVariant.create({
        data: {
          productId: product.id,
          sku: `SKU-${dto.code}`,
          variantName: dto.name,
          unitId: dto.medicineUnitId,
          sellingPrice: dto.sellingPrice || 1.0,
          status: 'ACTIVE',
        },
      });

      // 4. Create GraphSyncOutbox event
      await tx.graphSyncOutbox.create({
        data: {
          entityType: 'MEDICINE',
          entityId: medicine.id,
          action: 'CREATE',
          payload: {
            id: medicine.id,
            code: medicine.medicineCode,
            name: product.name,
            status: medicine.status,
          },
        },
      });

      return { product, medicine };
    });
  }

  async updateMedicine(id: number, dto: UpdateMedicineDto) {
    const medicine = await this.prisma.medicine.findUnique({
      where: { id },
      include: { product: true },
    });
    if (!medicine) {
      throw new NotFoundException('Không tìm thấy thuốc');
    }

    if (dto.sellingPrice !== undefined && dto.sellingPrice <= 0) {
      throw new BadRequestException('Giá bán phải lớn hơn 0');
    }

    if (dto.code && dto.code !== medicine.product.code) {
      const existingProduct = await this.prisma.product.findUnique({
        where: { code: dto.code },
      });
      if (existingProduct) {
        throw new BadRequestException('Mã sản phẩm đã tồn tại');
      }
    }

    if (dto.medicineCode && dto.medicineCode !== medicine.medicineCode) {
      const existingMedicine = await this.prisma.medicine.findUnique({
        where: { medicineCode: dto.medicineCode },
      });
      if (existingMedicine) {
        throw new BadRequestException('Mã thuốc đã tồn tại');
      }
    }

    const slug =
      dto.name && dto.name !== medicine.product.name
        ? this.generateSlug(dto.name)
        : medicine.product.slug;

    return await this.prisma.$transaction(async (tx) => {
      // 1. Update Product
      const product = await tx.product.update({
        where: { id: medicine.productId },
        data: {
          code: dto.code,
          name: dto.name,
          slug,
          categoryId: dto.categoryId,
          brandId: dto.brandId,
          manufacturerId: dto.manufacturerId,
          shortDescription: dto.shortDescription,
          description: dto.description,
        },
      });

      // 2. Update Medicine
      const updatedMedicine = await tx.medicine.update({
        where: { id },
        data: {
          medicineCode: dto.medicineCode,
          registrationNumber: dto.registrationNumber,
          dosageFormId: dto.dosageFormId,
          medicineUnitId: dto.medicineUnitId,
          requiresPrescription: dto.requiresPrescription,
          usageNote: dto.usageNote,
          storageInstruction: dto.storageInstruction,
          shelfLifeMonths: dto.shelfLifeMonths,
        },
      });

      // 3. Update or create ProductVariant
      const variantSku = dto.code
        ? `SKU-${dto.code}`
        : `SKU-${medicine.product.code}`;
      const existingVariant = await tx.productVariant.findFirst({
        where: { productId: medicine.productId },
      });

      if (existingVariant) {
        await tx.productVariant.update({
          where: { id: existingVariant.id },
          data: {
            sku: dto.code ? `SKU-${dto.code}` : undefined,
            variantName: dto.name || undefined,
            unitId: dto.medicineUnitId || undefined,
            sellingPrice:
              dto.sellingPrice !== undefined ? dto.sellingPrice : undefined,
          },
        });
      } else {
        await tx.productVariant.create({
          data: {
            productId: medicine.productId,
            sku: variantSku,
            variantName: dto.name || medicine.product.name,
            unitId: dto.medicineUnitId || medicine.medicineUnitId,
            sellingPrice:
              dto.sellingPrice !== undefined ? dto.sellingPrice : 1.0,
            status: 'ACTIVE',
          },
        });
      }

      // 4. Create GraphSyncOutbox event
      await tx.graphSyncOutbox.create({
        data: {
          entityType: 'MEDICINE',
          entityId: id,
          action: 'UPDATE',
          payload: {
            id,
            code: updatedMedicine.medicineCode,
            name: product.name,
            status: updatedMedicine.status,
          },
        },
      });

      return { product, medicine: updatedMedicine };
    });
  }

  async toggleStatus(id: number, status: string) {
    const medicine = await this.prisma.medicine.findUnique({
      where: { id },
    });
    if (!medicine) {
      throw new NotFoundException('Không tìm thấy thuốc');
    }

    if (status !== 'ACTIVE' && status !== 'INACTIVE') {
      throw new BadRequestException('Trạng thái không hợp lệ');
    }

    return await this.prisma.$transaction(async (tx) => {
      // Update medicine status
      const updatedMed = await tx.medicine.update({
        where: { id },
        data: { status },
      });

      // Update associated product status
      const updatedProduct = await tx.product.update({
        where: { id: medicine.productId },
        data: { status: status === 'ACTIVE' ? 'ACTIVE' : 'DRAFT' },
      });

      // Update variants
      await tx.productVariant.updateMany({
        where: { productId: medicine.productId },
        data: { status },
      });

      // Create GraphSyncOutbox event
      await tx.graphSyncOutbox.create({
        data: {
          entityType: 'MEDICINE',
          entityId: id,
          action: 'UPDATE',
          payload: {
            id,
            code: updatedMed.medicineCode,
            name: updatedProduct.name,
            status: updatedMed.status,
          },
        },
      });

      return updatedMed;
    });
  }

  async getIngredients(medicineId: number) {
    const medicine = await this.prisma.medicine.findUnique({
      where: { id: medicineId },
    });
    if (!medicine) {
      throw new NotFoundException('Không tìm thấy thuốc');
    }

    return this.prisma.medicineIngredient.findMany({
      where: { medicineId },
      include: {
        activeIngredient: true,
      },
    });
  }

  async updateIngredients(
    medicineId: number,
    dto: UpdateMedicineIngredientsDto,
  ) {
    const medicine = await this.prisma.medicine.findUnique({
      where: { id: medicineId },
    });
    if (!medicine) {
      throw new NotFoundException('Không tìm thấy thuốc');
    }

    // 1. Verify duplicates
    const ingredientIds = dto.ingredients.map((i) => i.activeIngredientId);
    const uniqueIds = new Set(ingredientIds);
    if (uniqueIds.size !== ingredientIds.length) {
      throw new BadRequestException(
        'Danh sách hoạt chất có chứa bản ghi trùng lặp',
      );
    }

    // 2. Fetch all mapped active ingredients to verify existence and active status
    const activeIngredients = await this.prisma.activeIngredient.findMany({
      where: {
        id: { in: ingredientIds },
      },
    });

    if (activeIngredients.length !== uniqueIds.size) {
      throw new BadRequestException(
        'Một hoặc nhiều hoạt chất không tồn tại trong hệ thống',
      );
    }

    // US-20 check: Prevent mapping inactive ingredient
    const inactiveIngredient = activeIngredients.find(
      (ai) => ai.status !== 'ACTIVE',
    );
    if (inactiveIngredient) {
      throw new BadRequestException(
        `Không thể liên kết hoạt chất đã tắt hoạt động: ${inactiveIngredient.name}`,
      );
    }

    // 3. Execute in transaction
    return await this.prisma.$transaction(async (tx) => {
      // Delete existing mappings
      await tx.medicineIngredient.deleteMany({
        where: { medicineId },
      });

      // Create new mappings
      const createdMappings = await Promise.all(
        dto.ingredients.map((item) =>
          tx.medicineIngredient.create({
            data: {
              medicineId,
              activeIngredientId: item.activeIngredientId,
              strength: item.strength.trim(),
              note: item.note?.trim() || null,
            },
            include: {
              activeIngredient: true,
            },
          }),
        ),
      );

      // Write GraphSyncOutbox event
      await tx.graphSyncOutbox.create({
        data: {
          entityType: 'MEDICINE_INGREDIENT',
          entityId: medicineId,
          action: 'UPDATE',
          payload: {
            medicineId,
            ingredients: createdMappings.map((cm) => ({
              activeIngredientId: cm.activeIngredientId,
              name: cm.activeIngredient.name,
              strength: cm.strength,
              note: cm.note,
            })),
          },
        },
      });

      return createdMappings;
    });
  }

  async getReferenceData() {
    const [categories, units, dosageForms, brands, manufacturers] =
      await Promise.all([
        this.prisma.productCategory.findMany({
          where: { status: 'ACTIVE' },
          select: { id: true, name: true, code: true },
        }),
        this.prisma.medicineUnit.findMany({
          select: { id: true, name: true, code: true },
        }),
        this.prisma.dosageForm.findMany({
          select: { id: true, name: true, code: true },
        }),
        this.prisma.brand.findMany({
          where: { status: 'ACTIVE' },
          select: { id: true, name: true, code: true },
        }),
        this.prisma.manufacturer.findMany({
          where: { status: 'ACTIVE' },
          select: { id: true, name: true, code: true },
        }),
      ]);

    return {
      categories,
      units,
      dosageForms,
      brands,
      manufacturers,
    };
  }

  async findOne(id: number) {
    const medicine = await this.prisma.medicine.findUnique({
      where: { id },
      include: {
        product: {
          include: {
            category: true,
            brand: true,
            manufacturer: true,
            variants: true,
          },
        },
        dosageForm: true,
        unit: true,
        ingredients: {
          include: {
            activeIngredient: true,
          },
        },
      },
    });

    if (!medicine) {
      throw new NotFoundException('Không tìm thấy thuốc');
    }

    return medicine;
  }

  async findAll(options?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    categoryId?: number;
    prescription?: string;
  }) {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const search = options?.search;
    const status = options?.status;
    const categoryId = options?.categoryId;
    const prescription = options?.prescription;

    const andConditions: Prisma.MedicineWhereInput[] = [];

    if (status && status !== 'ALL') {
      andConditions.push({ status });
    }

    if (categoryId) {
      andConditions.push({
        product: {
          categoryId: categoryId,
        },
      });
    }

    if (prescription && prescription !== 'ALL') {
      andConditions.push({
        requiresPrescription: prescription === 'YES',
      });
    }

    if (search && search.trim().length > 0) {
      const cleanSearch = search.trim();
      andConditions.push({
        OR: [
          { medicineCode: { contains: cleanSearch, mode: 'insensitive' } },
          { product: { name: { contains: cleanSearch, mode: 'insensitive' } } },
          { product: { code: { contains: cleanSearch, mode: 'insensitive' } } },
          {
            ingredients: {
              some: {
                activeIngredient: {
                  name: { contains: cleanSearch, mode: 'insensitive' },
                },
              },
            },
          },
        ],
      });
    }

    const whereClause: Prisma.MedicineWhereInput =
      andConditions.length > 0 ? { AND: andConditions } : {};

    const total = await this.prisma.medicine.count({ where: whereClause });
    const data = await this.prisma.medicine.findMany({
      where: whereClause,
      include: {
        product: {
          include: {
            category: true,
            brand: true,
            manufacturer: true,
            variants: {
              include: {
                unit: true,
              },
            },
          },
        },
        dosageForm: true,
        unit: true,
        ingredients: {
          include: {
            activeIngredient: true,
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async search(term: string) {
    if (!term || term.trim().length < 2) return [];

    const variants = await this.prisma.productVariant.findMany({
      where: {
        status: 'ACTIVE',
        OR: [
          { variantName: { contains: term, mode: 'insensitive' } },
          { sku: { contains: term, mode: 'insensitive' } },
          { product: { name: { contains: term, mode: 'insensitive' } } },
        ],
      },
      include: {
        unit: true,
        product: {
          include: {
            medicines: true,
          },
        },
        inventories: true,
      },
      take: 10,
    });

    return variants.map((v) => ({
      id: v.id,
      sku: v.sku,
      variant_name: v.variantName,
      selling_price: v.sellingPrice,
      unit: v.unit,
      product: {
        id: v.product.id,
        name: v.product.name,
        medicines: v.product.medicines.map((m) => ({ id: m.id })),
      },
      inventories: v.inventories.map((inv) => ({ quantity: inv.quantity })),
    }));
  }
}
