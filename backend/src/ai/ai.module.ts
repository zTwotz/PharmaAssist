import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiConfigService } from './ai-config.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [AiConfigService],
  exports: [AiConfigService],
})
export class AiModule {}
