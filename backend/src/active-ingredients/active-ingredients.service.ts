import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  CreateActiveIngredientDto,
  UpdateActiveIngredientDto,
} from './dto/active-ingredients.dto';

@Injectable()
export class ActiveIngredientsService {
  constructor(private readonly prisma: PrismaService) {}

  private normalizeName(name: string): string {
    if (!name) return '';
    // Trim and replace multiple spaces with a single space
    return name.trim().replace(/\s+/g, ' ');
  }

  private generateCode(name: string): string {
    const cleanName = this.normalizeName(name);
    const words = cleanName.split(' ');
    const prefix = words
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `ACT-${prefix}-${randomSuffix}`;
  }

  async create(dto: CreateActiveIngredientDto) {
    const normalizedName = this.normalizeName(dto.name);
    if (!normalizedName) {
      throw new BadRequestException('Tên hoạt chất không được để trống');
    }

    // Check name uniqueness (case-insensitive)
    const existingName = await this.prisma.activeIngredient.findFirst({
      where: { name: { equals: normalizedName, mode: 'insensitive' } },
    });
    if (existingName) {
      throw new BadRequestException('Tên hoạt chất đã tồn tại');
    }

    const code = dto.code ? dto.code.trim() : this.generateCode(normalizedName);

    // Check code uniqueness
    const existingCode = await this.prisma.activeIngredient.findUnique({
      where: { code },
    });
    if (existingCode) {
      throw new BadRequestException('Mã hoạt chất đã tồn tại');
    }

    return await this.prisma.$transaction(async (tx) => {
      const activeIngredient = await tx.activeIngredient.create({
        data: {
          code,
          name: normalizedName,
          description: dto.description?.trim(),
          status: 'ACTIVE',
        },
      });

      // Write GraphSyncOutbox event
      await tx.graphSyncOutbox.create({
        data: {
          entityType: 'ACTIVE_INGREDIENT',
          entityId: activeIngredient.id,
          action: 'CREATE',
          payload: {
            id: activeIngredient.id,
            code: activeIngredient.code,
            name: activeIngredient.name,
            status: activeIngredient.status,
          },
        },
      });

      return activeIngredient;
    });
  }

  async update(id: number, dto: UpdateActiveIngredientDto) {
    const ingredient = await this.prisma.activeIngredient.findUnique({
      where: { id },
    });
    if (!ingredient) {
      throw new NotFoundException('Không tìm thấy hoạt chất');
    }

    const updateData: Prisma.ActiveIngredientUpdateInput = {};

    if (dto.name !== undefined) {
      const normalizedName = this.normalizeName(dto.name);
      if (!normalizedName) {
        throw new BadRequestException('Tên hoạt chất không được để trống');
      }

      const existingName = await this.prisma.activeIngredient.findFirst({
        where: {
          name: { equals: normalizedName, mode: 'insensitive' },
          id: { not: id },
        },
      });
      if (existingName) {
        throw new BadRequestException('Tên hoạt chất đã tồn tại');
      }

      updateData.name = normalizedName;
    }

    if (dto.description !== undefined) {
      updateData.description = dto.description?.trim() || null;
    }

    if (dto.status !== undefined) {
      if (dto.status !== 'ACTIVE' && dto.status !== 'INACTIVE') {
        throw new BadRequestException('Trạng thái không hợp lệ');
      }
      updateData.status = dto.status;
    }

    if (Object.keys(updateData).length === 0) {
      return ingredient;
    }

    return await this.prisma.$transaction(async (tx) => {
      const updated = await tx.activeIngredient.update({
        where: { id },
        data: updateData,
      });

      // Write GraphSyncOutbox event
      await tx.graphSyncOutbox.create({
        data: {
          entityType: 'ACTIVE_INGREDIENT',
          entityId: updated.id,
          action: 'UPDATE',
          payload: {
            id: updated.id,
            code: updated.code,
            name: updated.name,
            status: updated.status,
          },
        },
      });

      return updated;
    });
  }

  async findOne(id: number) {
    const ingredient = await this.prisma.activeIngredient.findUnique({
      where: { id },
    });
    if (!ingredient) {
      throw new NotFoundException('Không tìm thấy hoạt chất');
    }
    return ingredient;
  }

  async findAll(options?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }) {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const search = options?.search;
    const status = options?.status;

    const andFilters: Prisma.ActiveIngredientWhereInput[] = [];

    if (status && status !== 'ALL') {
      andFilters.push({ status });
    }

    if (search && search.trim().length > 0) {
      const cleanSearch = search.trim();
      andFilters.push({
        OR: [
          { name: { contains: cleanSearch, mode: 'insensitive' } },
          { code: { contains: cleanSearch, mode: 'insensitive' } },
          { description: { contains: cleanSearch, mode: 'insensitive' } },
        ],
      });
    }

    const where: Prisma.ActiveIngredientWhereInput =
      andFilters.length > 0 ? { AND: andFilters } : {};

    const total = await this.prisma.activeIngredient.count({
      where,
    });
    const data = await this.prisma.activeIngredient.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        name: 'asc',
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
}
