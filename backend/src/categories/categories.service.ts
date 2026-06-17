import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
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

  async findAll() {
    // Return all categories with parent info and products count
    return this.prisma.productCategory.findMany({
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const category = await this.prisma.productCategory.findUnique({
      where: { id },
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`Danh mục ID ${id} không tồn tại.`);
    }

    return category;
  }

  async create(dto: CreateCategoryDto) {
    // Check code uniqueness
    const existing = await this.prisma.productCategory.findUnique({
      where: { code: dto.code },
    });
    if (existing) {
      throw new BadRequestException(`Mã danh mục ${dto.code} đã tồn tại.`);
    }

    // Check parent exists
    if (dto.parentId) {
      const parent = await this.prisma.productCategory.findUnique({
        where: { id: dto.parentId },
      });
      if (!parent) {
        throw new BadRequestException(`Danh mục cha ID ${dto.parentId} không tồn tại.`);
      }
    }

    const slug = this.generateSlug(dto.name);

    return this.prisma.$transaction(async (tx) => {
      const category = await tx.productCategory.create({
        data: {
          code: dto.code,
          name: dto.name,
          slug,
          parentId: dto.parentId || null,
          description: dto.description || null,
          imageUrl: dto.imageUrl || null,
          sortOrder: dto.sortOrder || 0,
          status: dto.status || 'ACTIVE',
        },
      });

      await this.rebuildClosures(tx);

      return category;
    });
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.prisma.productCategory.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Danh mục ID ${id} không tồn tại.`);
    }

    // Check code uniqueness
    if (dto.code && dto.code !== category.code) {
      const existing = await this.prisma.productCategory.findUnique({
        where: { code: dto.code },
      });
      if (existing) {
        throw new BadRequestException(`Mã danh mục ${dto.code} đã tồn tại.`);
      }
    }

    // Check parent cycle
    if (dto.parentId) {
      if (dto.parentId === id) {
        throw new BadRequestException('Danh mục cha không thể là chính nó.');
      }

      // Check if target parent is a descendant of this category
      const descendants = await this.prisma.categoryClosure.findMany({
        where: { ancestorId: id },
      });
      const descendantIds = descendants.map((d) => d.descendantId);
      if (descendantIds.includes(dto.parentId)) {
        throw new BadRequestException('Danh mục cha không thể là danh mục con/cháu của danh mục này.');
      }
    }

    const slug = dto.name ? this.generateSlug(dto.name) : undefined;

    return this.prisma.$transaction(async (tx) => {
      const updatedCategory = await tx.productCategory.update({
        where: { id },
        data: {
          code: dto.code,
          name: dto.name,
          slug: slug !== undefined ? slug : undefined,
          parentId: dto.parentId === null ? null : dto.parentId,
          description: dto.description,
          imageUrl: dto.imageUrl,
          sortOrder: dto.sortOrder,
          status: dto.status,
        },
      });

      if (dto.parentId !== undefined) {
        await this.rebuildClosures(tx);
      }

      return updatedCategory;
    });
  }

  async delete(id: number) {
    const category = await this.prisma.productCategory.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Danh mục ID ${id} không tồn tại.`);
    }

    // Check sub-categories
    const childCount = await this.prisma.productCategory.count({
      where: { parentId: id },
    });
    if (childCount > 0) {
      throw new BadRequestException('Không thể xóa danh mục này vì có danh mục con bên dưới.');
    }

    // Check products
    const productCount = await this.prisma.product.count({
      where: { categoryId: id },
    });
    if (productCount > 0) {
      throw new BadRequestException('Không thể xóa danh mục này vì đang có thuốc/sản phẩm liên kết.');
    }

    return this.prisma.$transaction(async (tx) => {
      // Delete closures first
      await tx.categoryClosure.deleteMany({
        where: {
          OR: [
            { ancestorId: id },
            { descendantId: id },
          ],
        },
      });

      const deleted = await tx.productCategory.delete({
        where: { id },
      });

      await this.rebuildClosures(tx);

      return deleted;
    });
  }

  /**
   * Rebuilds the entire category closures table based on current parentId hierarchy.
   */
  private async rebuildClosures(tx: any) {
    // 1. Delete all existing closures
    await tx.categoryClosure.deleteMany({});

    // 2. Fetch all categories
    const categories = await tx.productCategory.findMany({
      select: {
        id: true,
        parentId: true,
      },
    });

    const categoryMap = new Map<number, number | null>();
    categories.forEach((cat: { id: number; parentId: number | null }) => {
      categoryMap.set(cat.id, cat.parentId);
    });

    const closuresToCreate: { ancestorId: number; descendantId: number; depth: number }[] = [];

    // 3. Rebuild paths
    categories.forEach((cat: { id: number; parentId: number | null }) => {
      // Add self link
      closuresToCreate.push({
        ancestorId: cat.id,
        descendantId: cat.id,
        depth: 0,
      });

      // Trace ancestors
      let currentParentId = cat.parentId;
      let depth = 1;
      while (currentParentId) {
        closuresToCreate.push({
          ancestorId: currentParentId,
          descendantId: cat.id,
          depth: depth,
        });

        // Move up
        currentParentId = categoryMap.get(currentParentId) || null;
        depth++;
      }
    });


    // 4. Batch insert closures
    if (closuresToCreate.length > 0) {
      await tx.categoryClosure.createMany({
        data: closuresToCreate,
        skipDuplicates: true,
      });
    }
  }
}
