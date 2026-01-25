import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.customer.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException(`Khách hàng ID ${id} không tồn tại.`);
    }

    return customer;
  }

  async create(dto: CreateCustomerDto) {
    let code = dto.code;

    // Auto-generate code if empty
    if (!code) {
      code = `CUST-${Date.now()}`;
    } else {
      const existing = await this.prisma.customer.findUnique({
        where: { code },
      });
      if (existing) {
        throw new BadRequestException(`Mã khách hàng ${code} đã tồn tại.`);
      }
    }

    const dob = dto.dateOfBirth ? new Date(dto.dateOfBirth) : null;

    return this.prisma.customer.create({
      data: {
        code,
        fullName: dto.fullName,
        phone: dto.phone || null,
        email: dto.email || null,
        gender: dto.gender || null,
        dateOfBirth: dob,
        status: dto.status || 'ACTIVE',
      },
    });
  }

  async update(id: number, dto: UpdateCustomerDto) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });
    if (!customer) {
      throw new NotFoundException(`Khách hàng ID ${id} không tồn tại.`);
    }

    if (dto.code && dto.code !== customer.code) {
      const existing = await this.prisma.customer.findUnique({
        where: { code: dto.code },
      });
      if (existing) {
        throw new BadRequestException(`Mã khách hàng ${dto.code} đã tồn tại.`);
      }
    }

    const dob =
      dto.dateOfBirth !== undefined
        ? dto.dateOfBirth
          ? new Date(dto.dateOfBirth)
          : null
        : undefined;

    return this.prisma.customer.update({
      where: { id },
      data: {
        code: dto.code,
        fullName: dto.fullName,
        phone: dto.phone,
        email: dto.email,
        gender: dto.gender,
        dateOfBirth: dob,
        status: dto.status,
      },
    });
  }

  async delete(id: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });
    if (!customer) {
      throw new NotFoundException(`Khách hàng ID ${id} không tồn tại.`);
    }

    // Check if customer has orders or invoices
    const ordersCount = await this.prisma.order.count({
      where: { customerId: id },
    });
    if (ordersCount > 0) {
      throw new BadRequestException(
        'Không thể xóa khách hàng vì đã có lịch sử đơn hàng.',
      );
    }

    const invoicesCount = await this.prisma.invoice.count({
      where: { customerId: id },
    });
    if (invoicesCount > 0) {
      throw new BadRequestException(
        'Không thể xóa khách hàng vì đã có lịch sử hóa đơn.',
      );
    }

    return this.prisma.customer.delete({
      where: { id },
    });
  }
}
