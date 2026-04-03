import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiProviderType } from './types/ai-provider.enum';

@Injectable()
export class AiConfigService {
  constructor(private configService: ConfigService) {}

  get primaryProvider(): AiProviderType {
    const provider = this.configService.get<string>(
      'AI_PRIMARY_PROVIDER',
      AiProviderType.GOOGLE,
    );
    return provider as AiProviderType;
  }

  get isFallbackEnabled(): boolean {
    return (
      this.configService.get<string>('AI_FALLBACK_ENABLED', 'true') === 'true'
    );
  }

  get fallbackProvider(): AiProviderType {
    const provider = this.configService.get<string>(
      'AI_FALLBACK_PROVIDER',
      AiProviderType.MOCK,
    );
    return provider as AiProviderType;
  }

  get googleAiApiKey(): string {
    const key = this.configService.get<string>('GEMINI_API_KEY');
    if (!key) {
      throw new Error('GEMINI_API_KEY must be defined for Google AI provider');
    }
    return key;
  }

  get googleAiModel(): string {
    return this.configService.get<string>('GEMINI_MODEL', 'gemini-1.5-pro');
  }
}
