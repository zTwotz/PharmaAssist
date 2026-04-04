import { Injectable, Logger } from '@nestjs/common';
import { AiConfigService } from './ai-config.service';
import { GoogleAiProvider } from './providers/google-ai.provider';
import { MockAiProvider } from './providers/mock-ai.provider';
import { AiProviderType } from './types/ai-provider.enum';
import { AiProviderException } from './exceptions/ai.exception';
import { AiAuditLogService } from './ai-audit-log.service';
import { AiGuardrailService } from './ai-guardrail.service';
import { AiPiiMinimizerService } from './ai-pii-minimizer.service';
import {
  AiResponse,
  InteractionExplanationInput,
  InteractionExplanationOutput,
  ConsultationNoteDraftInput,
  ConsultationNoteDraftOutput,
  FollowUpQuestionsInput,
  FollowUpQuestionsOutput,
} from './types/ai-payloads.type';
import { CircuitBreaker, RateLimiter } from './utils/ai-guards';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly circuitBreaker = new CircuitBreaker(5, 30000); // 5 failures, 30s reset
  private readonly rateLimiter = new RateLimiter(20, 60000); // 20 requests per minute

  constructor(
    private readonly configService: AiConfigService,
    private readonly googleAiProvider: GoogleAiProvider,
    private readonly mockAiProvider: MockAiProvider,
    private readonly aiAuditLogService: AiAuditLogService,
    private readonly aiGuardrailService: AiGuardrailService,
    private readonly aiPiiMinimizerService: AiPiiMinimizerService,
  ) {}

  /**
   * Simple redaction to prevent raw PII (like customer names in orderContext)
   * from being saved into AI audit logs.
   */
  private redactPii(input: any): any {
    return this.aiPiiMinimizerService.minimizeObject(input);
  }

  private async executeWithFallback<T, U>(
    methodName: string,
    input: T,
  ): Promise<AiResponse<U>> {
    const primaryProviderType = await this.configService.getPrimaryProvider();
    let response: AiResponse<U> | null = null;
    let errorToThrow: any = null;

    const startTime = Date.now();

    try {
      this.logger.debug(
        `Attempting AI request ${methodName} with primary provider: ${primaryProviderType}`,
      );

      this.rateLimiter.checkLimit();

      if (primaryProviderType === AiProviderType.GOOGLE) {
        response = await this.circuitBreaker.fire(async () => {
          return (await (this.googleAiProvider as any)[methodName](
            input,
          )) as AiResponse<U>;
        });
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
        (await this.configService.isFallbackEnabled()) &&
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

    if (!errorToThrow && response) {
      try {
        this.aiGuardrailService.checkOutput(JSON.stringify(response.data));
      } catch (guardrailError) {
        errorToThrow = guardrailError;
        // Strip out the data since it was blocked
        response.data = null as any;
        if (!response.metadata) response.metadata = {} as any;
        response.metadata.guardrailStatus = 'blocked';
      }
    }

    const latencyMs = Date.now() - startTime;

    // Fire and forget audit log
    this.aiAuditLogService
      .log({
        userId: (input as any).userId, // Add userId from input (which extends BaseAiInput implicitly now)
        providerRequested: primaryProviderType,
        providerUsed: response?.metadata?.providerUsed || primaryProviderType,
        promptType: methodName,
        promptVersion: response?.metadata?.promptVersion,
        requestSummary: JSON.stringify(this.redactPii(input)),
        responseSummary: response?.data
          ? JSON.stringify(response.data)
          : undefined,
        guardrailStatus:
          response?.metadata?.guardrailStatus ||
          (errorToThrow ? 'blocked' : 'passed'),
        fallbackReason: response?.metadata?.fallbackReason,
        latencyMs: response?.metadata?.durationMs || latencyMs,
      })
      .catch((e) => this.logger.error('Failed to invoke audit log service', e));

    if (errorToThrow) {
      throw errorToThrow;
    }

    return response!;
  }

  async generateInteractionExplanation(
    input: InteractionExplanationInput,
  ): Promise<AiResponse<InteractionExplanationOutput>> {
    const minimizedInput = this.aiPiiMinimizerService.minimizeObject(input);
    this.aiGuardrailService.checkInput(JSON.stringify(minimizedInput));
    return this.executeWithFallback(
      'generateInteractionExplanation',
      minimizedInput,
    );
  }

  async generateConsultationNoteDraft(
    input: ConsultationNoteDraftInput,
  ): Promise<AiResponse<ConsultationNoteDraftOutput>> {
    const minimizedInput = this.aiPiiMinimizerService.minimizeObject(input);
    this.aiGuardrailService.checkInput(JSON.stringify(minimizedInput));
    return this.executeWithFallback(
      'generateConsultationNoteDraft',
      minimizedInput,
    );
  }

  async generateFollowUpQuestions(
    input: FollowUpQuestionsInput,
  ): Promise<AiResponse<FollowUpQuestionsOutput>> {
    const minimizedInput = this.aiPiiMinimizerService.minimizeObject(input);
    this.aiGuardrailService.checkInput(JSON.stringify(minimizedInput));
    return this.executeWithFallback(
      'generateFollowUpQuestions',
      minimizedInput,
    );
  }
}
