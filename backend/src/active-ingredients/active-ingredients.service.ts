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
import { GraphSyncEventType } from '../graph-sync/types/graph-sync.types';

@Injectable()
export class ActiveIngredientsService {
  constructor(private readonly prisma: PrismaService) {}

  private normalizeName(name: string): string {
    if (!name) return '';
    // Trim, replace multiple spaces with a single space, and convert to Title Case
    const clean = name.trim().replace(/\s+/g, ' ');
    return clean
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  private generateNormalizedName(name: string): string {
    if (!name) return '';
    // Trim, replace multiple spaces with a single space, and convert to lowercase
    return name.trim().toLowerCase().replace(/\s+/g, ' ');
  }

  private generateCode(name: string): string {
    const cleanName = name.trim().replace(/\s+/g, ' ');
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
    const name = this.normalizeName(dto.name);
    if (!name) {
      throw new BadRequestException('Tên hoạt chất không được để trống');
    }

    const normalizedName = this.generateNormalizedName(dto.name);

    // Check name uniqueness (using unique index)
    const existingName = await this.prisma.activeIngredient.findUnique({
      where: { normalizedName },
    });
    if (existingName) {
      throw new BadRequestException('Tên hoạt chất đã tồn tại');
    }

    const code = dto.code ? dto.code.trim() : this.generateCode(name);

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
          name,
          normalizedName,
          description: dto.description?.trim(),
          status: 'ACTIVE',
        },
      });

      // Write GraphSyncOutbox event
      await tx.graphSyncOutbox.create({
        data: {
          eventType: GraphSyncEventType.ACTIVE_INGREDIENT_UPSERT,
          aggregateType: 'ACTIVE_INGREDIENT',
          aggregateId: String(activeIngredient.id),
          sourceVersion: Date.now(),
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
      const name = this.normalizeName(dto.name);
      if (!name) {
        throw new BadRequestException('Tên hoạt chất không được để trống');
      }

      const normalizedName = this.generateNormalizedName(dto.name);

      const existingName = await this.prisma.activeIngredient.findFirst({
        where: {
          normalizedName,
          id: { not: id },
        },
      });
      if (existingName) {
        throw new BadRequestException('Tên hoạt chất đã tồn tại');
      }

      updateData.name = name;
      updateData.normalizedName = normalizedName;
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
          eventType:
            updated.status === 'ACTIVE'
              ? GraphSyncEventType.ACTIVE_INGREDIENT_UPSERT
              : GraphSyncEventType.ACTIVE_INGREDIENT_DEACTIVATE,
          aggregateType: 'ACTIVE_INGREDIENT',
          aggregateId: String(updated.id),
          sourceVersion: Date.now(),
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
