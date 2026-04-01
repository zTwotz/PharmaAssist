import { Injectable, Logger } from '@nestjs/common';
import { AiConfigService } from './ai-config.service';
import { GoogleAiProvider } from './providers/google-ai.provider';
import { MockAiProvider } from './providers/mock-ai.provider';
import { AiProviderType } from './types/ai-provider.enum';
import { AiProviderException } from './exceptions/ai.exception';
import {
  AiResponse,
  InteractionExplanationInput,
  InteractionExplanationOutput,
  ConsultationNoteDraftInput,
  ConsultationNoteDraftOutput,
  FollowUpQuestionsInput,
  FollowUpQuestionsOutput,
} from './types/ai-payloads.type';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly configService: AiConfigService,
    private readonly googleAiProvider: GoogleAiProvider,
    private readonly mockAiProvider: MockAiProvider,
  ) {}

  private async executeWithFallback<T, U>(
    methodName: string,
    input: T,
  ): Promise<AiResponse<U>> {
    const primaryProviderType = this.configService.primaryProvider;

    try {
      this.logger.debug(
        `Attempting AI request ${methodName} with primary provider: ${primaryProviderType}`,
      );

      // We only have Google AI as primary for now
      if (primaryProviderType === AiProviderType.GOOGLE) {
        return (await (this.googleAiProvider as any)[methodName](
          input,
        )) as AiResponse<U>;
      }

      throw new AiProviderException(
        `Unsupported primary provider: ${primaryProviderType}`,
      );
    } catch (error) {
      this.logger.warn(
        `Primary provider ${primaryProviderType} failed for ${methodName}. Error: ${(error as Error).message}`,
      );

      // Only fallback for AI Provider exceptions (timeout, quota, etc)
      // Do not fallback for validation or guardrail errors if they happen here
      if (
        this.configService.isFallbackEnabled &&
        error instanceof AiProviderException
      ) {
        this.logger.log(`Falling back to Mock AI for ${methodName}`);
        const fallbackResponse = (await (this.mockAiProvider as any)[
          methodName
        ](input)) as AiResponse<U>;

        // Decorate metadata with fallback reason
        fallbackResponse.metadata.fallbackReason = (error as Error).message;
        fallbackResponse.metadata.providerRequested = primaryProviderType;

        return fallbackResponse;
      }

      throw error;
    }
  }

  async generateInteractionExplanation(
    input: InteractionExplanationInput,
  ): Promise<AiResponse<InteractionExplanationOutput>> {
    return this.executeWithFallback('generateInteractionExplanation', input);
  }

  async generateConsultationNoteDraft(
    input: ConsultationNoteDraftInput,
  ): Promise<AiResponse<ConsultationNoteDraftOutput>> {
    return this.executeWithFallback('generateConsultationNoteDraft', input);
  }

  async generateFollowUpQuestions(
    input: FollowUpQuestionsInput,
  ): Promise<AiResponse<FollowUpQuestionsOutput>> {
    return this.executeWithFallback('generateFollowUpQuestions', input);
  }
}
