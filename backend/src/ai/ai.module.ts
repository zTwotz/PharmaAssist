import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { AiConfigService } from './ai-config.service';
import { AiService } from './ai.service';
import { AiAuditLogService } from './ai-audit-log.service';
import { GoogleAiProvider } from './providers/google-ai.provider';
import { MockAiProvider } from './providers/mock-ai.provider';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule],
  providers: [AiConfigService, AiService, AiAuditLogService, GoogleAiProvider, MockAiProvider],
  exports: [AiConfigService, AiService, AiAuditLogService],
})
export class AiModule {}
