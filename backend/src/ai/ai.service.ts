import { Injectable, Logger } from '@nestjs/common';
import { AiConfigService } from './ai-config.service';
import { GoogleAiProvider } from './providers/google-ai.provider';
import { MockAiProvider } from './providers/mock-ai.provider';
import { AiProviderType } from './types/ai-provider.enum';
import { AiProviderException } from './exceptions/ai.exception';
import { AiAuditLogService } from './ai-audit-log.service';
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
    private readonly aiAuditLogService: AiAuditLogService,
  ) {}

  private async executeWithFallback<T, U>(
    methodName: string,
    input: T,
  ): Promise<AiResponse<U>> {
    const primaryProviderType = this.configService.primaryProvider;
    let response: AiResponse<U> | null = null;
    let errorToThrow: any = null;

    const startTime = Date.now();

    try {
      this.logger.debug(
        `Attempting AI request ${methodName} with primary provider: ${primaryProviderType}`,
      );

      if (primaryProviderType === AiProviderType.GOOGLE) {
        response = (await (this.googleAiProvider as any)[methodName](
          input,
        )) as AiResponse<U>;
      } else {
        throw new AiProviderException(
          `Unsupported primary provider: ${primaryProviderType}`,
        );
      }
    } catch (error) {
      this.logger.warn(
        `Primary provider ${primaryProviderType} failed for ${methodName}. Error: ${(error as Error).message}`,
      );

      if (
        this.configService.isFallbackEnabled &&
        error instanceof AiProviderException
      ) {
        this.logger.log(`Falling back to Mock AI for ${methodName}`);
        try {
          response = (await (this.mockAiProvider as any)[methodName](
            input,
          )) as AiResponse<U>;

          response.metadata.fallbackReason = (error as Error).message;
          response.metadata.providerRequested = primaryProviderType;
        } catch (fallbackError) {
          errorToThrow = fallbackError;
        }
      } else {
        errorToThrow = error;
      }
    }

    const latencyMs = Date.now() - startTime;

    // Fire and forget audit log
    this.aiAuditLogService.log({
      providerRequested: primaryProviderType,
      providerUsed: response?.metadata?.providerUsed || primaryProviderType,
      promptType: methodName,
      requestSummary: JSON.stringify(input),
      responseSummary: response ? JSON.stringify(response.data) : undefined,
      guardrailStatus: errorToThrow ? 'blocked' : 'passed',
      fallbackReason: response?.metadata?.fallbackReason,
      latencyMs: response?.metadata?.durationMs || latencyMs,
    }).catch(e => this.logger.error('Failed to invoke audit log service', e));

    if (errorToThrow) {
      throw errorToThrow;
    }

    return response!;
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
