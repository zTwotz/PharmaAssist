import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';
import { GraphSyncStatus } from '../types/graph-sync.types';

@Injectable()
export class GraphSyncWorkerService {
  private readonly logger = new Logger(GraphSyncWorkerService.name);
  private isProcessing = false;

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async processPendingJobs() {
    if (this.isProcessing) {
      return;
    }
    this.isProcessing = true;

    try {
      // Find pending jobs
      // Limit to 50 at a time to prevent memory issues
      const pendingJobs = await this.prisma.graphSyncOutbox.findMany({
        where: {
          status: GraphSyncStatus.PENDING,
          // We will add retry logic later, for now just PENDING
        },
        orderBy: {
          createdAt: 'asc',
        },
        take: 50,
      });

      if (pendingJobs.length > 0) {
        this.logger.log(`Found ${pendingJobs.length} pending graph sync jobs.`);
        
        for (const job of pendingJobs) {
          // Idempotent claiming: try to update status from PENDING to PROCESSING
          const claimResult = await this.prisma.graphSyncOutbox.updateMany({
            where: {
              id: job.id,
              status: GraphSyncStatus.PENDING,
            },
            data: {
              status: GraphSyncStatus.PROCESSING,
              updatedAt: new Date(),
            },
          });

          if (claimResult.count === 1) {
            // Successfully claimed
            await this.processJob(job);
          } else {
            // Job was claimed by another worker instance or already processed
            this.logger.debug(`Job ${job.id} was already claimed or processed.`);
          }
        }
      }
    } catch (error) {
      this.logger.error('Error processing graph sync jobs', error);
    } finally {
      this.isProcessing = false;
    }
  }

  private async processJob(job: any) {
    // Placeholder for claiming and actual processing
    this.logger.debug(`Processing job ${job.id} of type ${job.eventType}`);
    
    // In PAC-TASK-365 we will implement idempotent claiming
    // For now, just mark it as SUCCESS to prevent infinite loops during manual testing
    try {
      await this.prisma.graphSyncOutbox.update({
        where: { id: job.id },
        data: {
          status: GraphSyncStatus.SUCCESS,
          updatedAt: new Date(),
        },
      });
      this.logger.debug(`Successfully processed job ${job.id}`);
    } catch (error) {
      this.logger.error(`Failed to process job ${job.id}`, error);
      await this.prisma.graphSyncOutbox.update({
        where: { id: job.id },
        data: {
          status: GraphSyncStatus.FAILED,
          errorSummary: error.message,
          updatedAt: new Date(),
        },
      });
    }
  }
}
