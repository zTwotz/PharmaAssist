import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStockImportDto } from './dto/create-stock-import.dto';

@Injectable()
export class StockImportsService {
  constructor(private readonly prisma: PrismaService) {}

  async createDraft(createDto: CreateStockImportDto, userId: string) {
    const { supplierId, warehouseId, notes } = createDto;

    const supplier = await this.prisma.supplier.findUnique({
      where: { id: supplierId },
    });

    if (!supplier) {
      throw new BadRequestException('Nhà cung cấp không tồn tại');
    }

    if (supplier.status !== 'ACTIVE') {
      throw new BadRequestException(
        'Không thể nhập hàng từ nhà cung cấp đã ngừng hoạt động',
      );
    }

    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id: warehouseId },
    });

    if (!warehouse) {
      throw new BadRequestException('Kho không tồn tại');
    }

    // Generate unique code IMP-YYYYMMDDHHmmss
    const date = new Date();
    const code = `IMP-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date.getSeconds().toString().padStart(2, '0')}`;

    const draft = await this.prisma.stockImport.create({
      data: {
        code,
        supplierId,
        warehouseId,
        notes,
        createdBy: userId,
        status: 'DRAFT',
      },
      include: {
        supplier: true,
        warehouse: true,
      },
    });

    return draft;
  }

  async getWarehouses() {
    return this.prisma.warehouse.findMany({
      where: { status: 'ACTIVE' },
    });
  }

  async getActiveSuppliers() {
    return this.prisma.supplier.findMany({
      where: { status: 'ACTIVE' },
    });
  }

  async findOne(id: number) {
    const stockImport = await this.prisma.stockImport.findUnique({
      where: { id },
      include: {
        supplier: true,
        warehouse: true,
        details: {
          include: {
            medicine: true,
          },
        },
      },
    });

    if (!stockImport) {
      throw new NotFoundException('Phiếu nhập không tồn tại');
    }

    return stockImport;
  }

  async addLine(importId: number, dto: import('./dto/add-stock-import-line.dto').AddStockImportLineDto) {
    const stockImport = await this.prisma.stockImport.findUnique({
      where: { id: importId },
    });

    if (!stockImport) {
      throw new BadRequestException('Phiếu nhập không tồn tại');
    }

    if (stockImport.status !== 'DRAFT') {
      throw new BadRequestException('Chỉ có thể thêm sản phẩm vào phiếu nhập nháp');
    }

    const medicine = await this.prisma.medicine.findUnique({
      where: { id: dto.medicineId },
    });

    if (!medicine || medicine.status !== 'ACTIVE') {
      throw new BadRequestException('Thuốc không tồn tại hoặc đã ngừng kinh doanh');
    }

    const expiryDate = new Date(dto.expiryDate);
    if (expiryDate <= new Date()) {
      throw new BadRequestException('Hạn sử dụng phải ở tương lai');
    }

    const lineTotal = dto.quantity * dto.importPrice;

    return this.prisma.$transaction(async (tx) => {
      const detail = await tx.stockImportDetail.create({
        data: {
          stockImportId: importId,
          medicineId: dto.medicineId,
          batchNumber: dto.batchNumber,
          quantity: dto.quantity,
          importPrice: dto.importPrice,
          expiryDate,
          lineTotal,
        },
        include: {
          medicine: true,
        },
      });

      await tx.stockImport.update({
        where: { id: importId },
        data: {
          totalAmount: { increment: lineTotal },
        },
      });

      return detail;
    });
  }

  async updateLine(importId: number, lineId: number, dto: import('./dto/update-stock-import-line.dto').UpdateStockImportLineDto) {
    const stockImport = await this.prisma.stockImport.findUnique({
      where: { id: importId },
    });

    if (!stockImport) {
      throw new BadRequestException('Phiếu nhập không tồn tại');
    }

    if (stockImport.status !== 'DRAFT') {
      throw new BadRequestException('Chỉ có thể sửa sản phẩm trong phiếu nhập nháp');
    }

    const detail = await this.prisma.stockImportDetail.findUnique({
      where: { id: lineId },
    });

    if (!detail || detail.stockImportId !== importId) {
      throw new BadRequestException('Chi tiết phiếu nhập không tồn tại');
    }

    if (dto.expiryDate) {
      const expiryDate = new Date(dto.expiryDate);
      if (expiryDate <= new Date()) {
        throw new BadRequestException('Hạn sử dụng phải ở tương lai');
      }
    }

    const newQuantity = dto.quantity ?? detail.quantity;
    const newImportPrice = dto.importPrice ?? Number(detail.importPrice);
    const newLineTotal = newQuantity * newImportPrice;
    const difference = newLineTotal - Number(detail.lineTotal);

    return this.prisma.$transaction(async (tx) => {
      const updatedDetail = await tx.stockImportDetail.update({
        where: { id: lineId },
        data: {
          batchNumber: dto.batchNumber,
          quantity: dto.quantity,
          importPrice: dto.importPrice,
          expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : undefined,
          lineTotal: newLineTotal,
        },
        include: {
          medicine: true,
        },
      });

      await tx.stockImport.update({
        where: { id: importId },
        data: {
          totalAmount: { increment: difference },
        },
      });

      return updatedDetail;
    });
  }

  async removeLine(importId: number, lineId: number) {
    const stockImport = await this.prisma.stockImport.findUnique({
      where: { id: importId },
    });

    if (!stockImport) {
      throw new BadRequestException('Phiếu nhập không tồn tại');
    }

    if (stockImport.status !== 'DRAFT') {
      throw new BadRequestException('Chỉ có thể xóa sản phẩm trong phiếu nhập nháp');
    }

    const detail = await this.prisma.stockImportDetail.findUnique({
      where: { id: lineId },
    });

    if (!detail || detail.stockImportId !== importId) {
      throw new BadRequestException('Chi tiết phiếu nhập không tồn tại');
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.stockImportDetail.delete({
        where: { id: lineId },
      });

      await tx.stockImport.update({
        where: { id: importId },
        data: {
          totalAmount: { decrement: detail.lineTotal },
        },
      });

      return { success: true };
    });
  }
}
