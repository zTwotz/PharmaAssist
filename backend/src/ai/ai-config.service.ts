import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AiProviderType } from './types/ai-provider.enum';

@Injectable()
export class AiConfigService {
  private readonly logger = new Logger(AiConfigService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async getPrimaryProvider(): Promise<AiProviderType> {
    const dbConfig = await this.prisma.aiProviderConfig.findFirst({
      where: { isEnabled: true },
      orderBy: { priority: 'asc' },
    });

    if (dbConfig?.providerKey) {
      if (
        Object.values(AiProviderType).includes(
          dbConfig.providerKey as AiProviderType,
        )
      ) {
        return dbConfig.providerKey as AiProviderType;
      }
      this.logger.warn(`Invalid provider from DB: ${dbConfig.providerKey}`);
    }

    const provider = this.configService.get<string>(
      'AI_PRIMARY_PROVIDER',
      AiProviderType.GOOGLE,
    );

    if (Object.values(AiProviderType).includes(provider as AiProviderType)) {
      return provider as AiProviderType;
    }

    this.logger.warn(
      `Invalid provider from Env: ${provider}, defaulting to GOOGLE`,
    );
    return AiProviderType.GOOGLE;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async isFallbackEnabled(): Promise<boolean> {
    // Check DB first: if there's a second enabled provider, fallback is essentially enabled.
    // However, explicit flag might be in SystemSettings in the future.
    // For now, rely on Env.
    return (
      this.configService.get<string>('AI_FALLBACK_ENABLED', 'true') === 'true'
    );
  }

  async getFallbackProvider(): Promise<AiProviderType> {
    const dbConfigs = await this.prisma.aiProviderConfig.findMany({
      where: { isEnabled: true },
      orderBy: { priority: 'asc' },
    });

    if (dbConfigs.length > 1 && dbConfigs[1].providerKey) {
      if (
        Object.values(AiProviderType).includes(
          dbConfigs[1].providerKey as AiProviderType,
        )
      ) {
        return dbConfigs[1].providerKey as AiProviderType;
      }
    }

    const provider = this.configService.get<string>(
      'AI_FALLBACK_PROVIDER',
      AiProviderType.MOCK,
    );
    if (Object.values(AiProviderType).includes(provider as AiProviderType)) {
      return provider as AiProviderType;
    }
    return AiProviderType.MOCK;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async getGoogleAiApiKey(): Promise<string> {
    const key = this.configService.get<string>('GEMINI_API_KEY');
    if (!key) {
      throw new Error('GEMINI_API_KEY must be defined for Google AI provider');
    }
    if (key.trim().length === 0) {
      throw new Error('GEMINI_API_KEY cannot be empty');
    }
    return key;
  }

  async getGoogleAiModel(): Promise<string> {
    const dbConfig = await this.prisma.aiProviderConfig.findUnique({
      where: { providerKey: AiProviderType.GOOGLE },
    });

    if (dbConfig?.modelName && dbConfig.modelName.trim().length > 0) {
      return dbConfig.modelName;
    }

    const envModel = this.configService.get<string>(
      'GEMINI_MODEL',
      'gemini-1.5-pro',
    );
    if (!envModel || envModel.trim().length === 0) {
      return 'gemini-1.5-pro';
    }
    return envModel;
  }
}
