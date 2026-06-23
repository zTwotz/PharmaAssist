import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MedicineGroupsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.medicineGroup.findMany({
      where: { status: 'ACTIVE' },
      include: {
        members: {
          include: {
            medicine: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
