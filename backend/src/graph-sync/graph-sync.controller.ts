import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { PrismaService } from '../prisma/prisma.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('graph-sync')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('graph-sync')
export class GraphSyncController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('status')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get Graph Sync Status list' })
  async getStatusList(
    @Query('take') take?: string,
    @Query('skip') skip?: string,
  ) {
    const skipNum = skip ? parseInt(skip, 10) : 0;
    const takeNum = take ? parseInt(take, 10) : 50;

    const [items, total] = await Promise.all([
      this.prisma.graphSyncOutbox.findMany({
        skip: skipNum,
        take: takeNum,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.graphSyncOutbox.count(),
    ]);

    return { data: items, total };
  }

  @Get('status/:id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get Graph Sync Status detail' })
  async getStatusDetail(@Param('id') id: string) {
    const job = await this.prisma.graphSyncOutbox.findUnique({
      where: { id },
      include: { attempts: true },
    });
    return job;
  }
}
