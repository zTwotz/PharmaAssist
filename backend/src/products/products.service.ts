import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getFeaturedProducts() {
    // Query featured products (status = ACTIVE, productType = MEDICINE)
    const products = await this.prisma.product.findMany({
      where: {
        status: 'ACTIVE',
        productType: 'MEDICINE',
      },
      take: 24, // Lấy 24 sản phẩm mẫu để hiển thị
      include: {
        category: true,
        variants: {
          where: { status: 'ACTIVE' },
          include: {
            unit: true,
          },
        },
        images: {
          take: 1,
        },
        medicines: {
          include: {
            dosageForm: true,
            ingredients: {
              include: {
                activeIngredient: true,
              },
            },
          },
        },
      },
    });

    // Map to client DTO
    return products.map((product) => {
      const firstVariant = product.variants[0];
      const medicineDetail = product.medicines[0];
      const imageUrl = product.images[0]?.imageUrl || '';

      const activeIngredients =
        medicineDetail?.ingredients
          ?.map((ing) => `${ing.activeIngredient.name} ${ing.strength}`)
          .join(', ') || '';

      return {
        id: product.code,
        dbId: product.id,
        name: product.name,
        category: product.category.name,
        price: firstVariant ? Number(firstVariant.sellingPrice) : 0,
        unit: firstVariant?.unit?.name || 'viên',
        isAvailable: firstVariant ? firstVariant.status === 'ACTIVE' : false,
        activeIngredient: activeIngredients || product.name,
        dosageForm: medicineDetail?.dosageForm?.name || 'Viên nén',
        description:
          product.description ||
          product.shortDescription ||
          'Chưa có mô tả chi tiết.',
        usage: medicineDetail?.usageNote || 'Uống theo chỉ dẫn của dược sĩ.',
        imageUrl,
      };
    });
  }

  async getCategories() {
    // Fetch categories that have active products
    const categories = await this.prisma.productCategory.findMany({
      where: { status: 'ACTIVE' },
      take: 12,
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    return categories.map((cat) => ({
      id: cat.code,
      name: cat.name,
      count: cat._count.products,
    }));
  }

  async getProductBySlug(slug: string) {
    let targetSlug = slug;
    // Map Long Chau URL slug alias to database full slug
    if (
      slug ===
        'vien-uong-sac-dep-truong-tho-va-tre-hoa-da-nmn-pqq-kenko-60-v' ||
      slug.includes('nmn-pqq-kenko')
    ) {
      targetSlug =
        'vien-uong-ho-tro-chong-lao-hoa-cai-thien-lan-da-va-tang-de-khang-nmn-pqq-kenko-60-vien';
    }
    const product = await this.prisma.product.findUnique({
      where: { slug: targetSlug },
      include: {
        category: true,
        brand: true,
        manufacturer: {
          include: {
            country: true,
          },
        },
        images: {
          orderBy: {
            sortOrder: 'asc',
          },
        },
        variants: {
          where: { status: 'ACTIVE' },
          include: {
            unit: true,
          },
        },
        medicines: {
          where: { status: 'ACTIVE' },
          include: {
            dosageForm: true,
            ingredients: {
              include: {
                activeIngredient: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with slug ${slug} not found`);
    }

    const medicineDetail = product.medicines[0];

    return {
      id: product.id,
      code: product.code,
      name: product.name,
      slug: product.slug,
      productType: product.productType,
      shortDescription: product.shortDescription,
      description: product.description,
      status: product.status,
      brand: product.brand
        ? {
            id: product.brand.id,
            code: product.brand.code,
            name: product.brand.name,
            slug: product.brand.slug,
            logoUrl: product.brand.logoUrl,
          }
        : null,
      category: {
        id: product.category.id,
        code: product.category.code,
        name: product.category.name,
        slug: product.category.slug,
      },
      manufacturer: product.manufacturer
        ? {
            id: product.manufacturer.id,
            code: product.manufacturer.code,
            name: product.manufacturer.name,
            country: product.manufacturer.country?.name || 'Đang cập nhật',
          }
        : null,
      images: product.images.map((img) => ({
        id: img.id,
        imageUrl: img.imageUrl,
        altText: img.altText,
        isPrimary: img.isPrimary,
        sortOrder: img.sortOrder,
      })),
      variants: product.variants.map((variant) => ({
        id: variant.id,
        sku: variant.sku,
        variantName: variant.variantName,
        sellingPrice: Number(variant.sellingPrice),
        unit: variant.unit?.name || 'viên',
        status: variant.status,
      })),
      medicineDetail: medicineDetail
        ? {
            id: medicineDetail.id,
            medicineCode: medicineDetail.medicineCode,
            registrationNumber: medicineDetail.registrationNumber,
            requiresPrescription: medicineDetail.requiresPrescription,
            usageNote: medicineDetail.usageNote,
            storageInstruction: medicineDetail.storageInstruction,
            shelfLifeMonths: medicineDetail.shelfLifeMonths,
            dosageForm: medicineDetail.dosageForm?.name || 'Đang cập nhật',
            ingredients: medicineDetail.ingredients.map((ing) => ({
              name: ing.activeIngredient.name,
              strength: ing.strength,
              note: ing.note,
            })),
          }
        : null,
    };
  }
}
