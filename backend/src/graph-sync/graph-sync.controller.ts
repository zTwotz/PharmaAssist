import { Controller, Get, Post, Param, UseGuards, Query, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { PrismaService } from '../prisma/prisma.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GraphSyncStatus } from '@prisma/client';

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

  @Post('status/:id/retry')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Manually retry a Graph Sync job' })
  async retryJob(@Param('id') id: string) {
    const job = await this.prisma.graphSyncOutbox.findUnique({ where: { id } });
    if (!job) {
      throw new NotFoundException('Graph sync job not found');
    }
    if (job.status === GraphSyncStatus.SUCCEEDED || job.status === GraphSyncStatus.PENDING) {
      throw new BadRequestException(`Cannot retry job with status ${job.status}`);
    }

    return this.prisma.graphSyncOutbox.update({
      where: { id },
      data: {
        status: GraphSyncStatus.PENDING,
        retryCount: 0,
        nextRetryAt: null,
        lastErrorCode: null,
        lastErrorMessage: null,
      },
    });
  }

  @Post('rebuild')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Request manual full Graph rebuild' })
  async requestRebuild() {
    return this.prisma.graphSyncOutbox.create({
      data: {
        eventType: 'GRAPH_REBUILD_REQUESTED',
        aggregateType: 'SYSTEM',
        aggregateId: 'GRAPH_REBUILD',
        sourceVersion: BigInt(Date.now()),
        payload: {},
        status: GraphSyncStatus.PENDING,
      },
    });
  }
}
