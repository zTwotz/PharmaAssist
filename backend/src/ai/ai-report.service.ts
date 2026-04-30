import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AiReportService {
  constructor(private readonly prisma: PrismaService) {}

  async generateBusinessNarrative(startDate: string, endDate: string) {
    // Mock narrative generation
    return {
      narrative: `Business Report (${startDate} to ${endDate}): Revenue has increased by 15% due to higher demand for OTC medicines. Inventory levels are stable, though 3 items require restock. AI recommends maintaining current promotion strategies.`,
      insights: [
        'Revenue +15%',
        '3 items need restock',
        'OTC medicines driving growth',
      ],
      generatedAt: new Date(),
    };
  }
}
