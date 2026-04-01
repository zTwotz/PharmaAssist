import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiConfigService } from './ai-config.service';
import { AiService } from './ai.service';
import { GoogleAiProvider } from './providers/google-ai.provider';
import { MockAiProvider } from './providers/mock-ai.provider';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [AiConfigService, AiService, GoogleAiProvider, MockAiProvider],
  exports: [AiConfigService, AiService],
})
export class AiModule {}
