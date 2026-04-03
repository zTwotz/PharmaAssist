import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { AiConfigService } from './ai-config.service';
import { AiService } from './ai.service';
import { AiAuditLogService } from './ai-audit-log.service';
import { AiAuditLogController } from './ai-audit-log.controller';
import { AiController } from './ai.controller';
import { GoogleAiProvider } from './providers/google-ai.provider';
import { MockAiProvider } from './providers/mock-ai.provider';
import { PromptsService } from './prompts.service';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule],
  controllers: [AiAuditLogController, AiController],
  providers: [AiConfigService, AiService, AiAuditLogService, GoogleAiProvider, MockAiProvider, PromptsService],
  exports: [AiConfigService, AiService, AiAuditLogService, PromptsService],
})
export class AiModule {}
