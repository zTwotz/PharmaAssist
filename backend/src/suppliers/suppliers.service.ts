import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {}

  async findAll(status?: string) {
    const where: any = {};
    if (status && (status === 'ACTIVE' || status === 'INACTIVE')) {
      where.status = status;
    }
    return this.prisma.supplier.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
    });

    if (!supplier) {
      throw new NotFoundException(`Nhà cung cấp ID ${id} không tồn tại.`);
    }

    return supplier;
  }

  async create(dto: CreateSupplierDto) {
    let code = dto.code;

    // Auto-generate code if empty
    if (!code) {
      code = `SUPP-${Date.now()}`;
    } else {
      const existing = await this.prisma.supplier.findUnique({
        where: { code },
      });
      if (existing) {
        throw new BadRequestException(`Mã nhà cung cấp ${code} đã tồn tại.`);
      }
    }

    return this.prisma.supplier.create({
      data: {
        code,
        name: dto.name,
        phone: dto.phone || null,
        email: dto.email || null,
        address: dto.address || null,
        taxCode: dto.taxCode || null,
        status: dto.status || 'ACTIVE',
      },
    });
  }

  async update(id: number, dto: UpdateSupplierDto) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
    });
    if (!supplier) {
      throw new NotFoundException(`Nhà cung cấp ID ${id} không tồn tại.`);
    }

    if (dto.code && dto.code !== supplier.code) {
      const existing = await this.prisma.supplier.findUnique({
        where: { code: dto.code },
      });
      if (existing) {
        throw new BadRequestException(
          `Mã nhà cung cấp ${dto.code} đã tồn tại.`,
        );
      }
    }

    return this.prisma.supplier.update({
      where: { id },
      data: {
        code: dto.code,
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        address: dto.address,
        taxCode: dto.taxCode,
        status: dto.status,
      },
    });
  }

  async deactivate(id: number) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
    });
    if (!supplier) {
      throw new NotFoundException(`Nhà cung cấp ID ${id} không tồn tại.`);
    }

    return this.prisma.supplier.update({
      where: { id },
      data: {
        status: 'INACTIVE',
      },
    });
  }

  async delete(id: number) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
    });
    if (!supplier) {
      throw new NotFoundException(`Nhà cung cấp ID ${id} không tồn tại.`);
    }

    // Check purchase orders
    const poCount = await this.prisma.purchaseOrder.count({
      where: { supplierId: id },
    });
    if (poCount > 0) {
      throw new BadRequestException(
        'Không thể xóa nhà cung cấp vì đã có lịch sử đặt hàng.',
      );
    }

    // Check stock imports
    const importCount = await this.prisma.stockImport.count({
      where: { supplierId: id },
    });
    if (importCount > 0) {
      throw new BadRequestException(
        'Không thể xóa nhà cung cấp vì đã có lịch sử nhập kho.',
      );
    }

    return this.prisma.supplier.delete({
      where: { id },
    });
  }
}
