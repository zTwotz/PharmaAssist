import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { GraphRagBuilderModule } from '../graph-rag/graph-rag-builder/graph-rag-builder.module';
import { AiConfigService } from './ai-config.service';
import { AiService } from './ai.service';
import { AiAuditLogService } from './ai-audit-log.service';
import { AiAuditLogController } from './ai-audit-log.controller';
import { AiPiiMinimizerService } from './ai-pii-minimizer.service';
import { AiController } from './ai.controller';
import { AiConfigController } from './ai-config.controller';
import { GoogleAiProvider } from './providers/google-ai.provider';
import { MockAiProvider } from './providers/mock-ai.provider';
import { PromptsService } from './prompts.service';
import { AiGuardrailService } from './ai-guardrail.service';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, GraphRagBuilderModule],
  controllers: [AiAuditLogController, AiController, AiConfigController],
  providers: [
    AiConfigService,
    AiService,
    AiAuditLogService,
    GoogleAiProvider,
    MockAiProvider,
    PromptsService,
    AiGuardrailService,
    AiPiiMinimizerService,
  ],
  exports: [
    AiConfigService,
    AiService,
    AiAuditLogService,
    PromptsService,
    AiGuardrailService,
    AiPiiMinimizerService,
  ],
})
export class AiModule {}
