import { Injectable, Logger } from '@nestjs/common';
import { AiConfigService } from './ai-config.service';
import { GoogleAiProvider } from './providers/google-ai.provider';
import { MockAiProvider } from './providers/mock-ai.provider';
import { AiProviderType } from './types/ai-provider.enum';
import { AiProviderException } from './exceptions/ai.exception';
import { AiAuditLogService } from './ai-audit-log.service';
import { AiGuardrailService } from './ai-guardrail.service';
import { AiPiiMinimizerService } from './ai-pii-minimizer.service';
import { PrismaService } from '../prisma/prisma.service';
import { GraphRagBuilderService } from '../graph-rag/graph-rag-builder/graph-rag-builder.service';
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
    private readonly prisma: PrismaService,
    private readonly graphRagBuilderService: GraphRagBuilderService,
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
    rawInput: T,
  ): Promise<AiResponse<U>> {
    let response: AiResponse<U> | null = null;
    let errorToThrow: any = null;
    const primaryProviderType =
      (await this.configService.getPrimaryProvider()) || AiProviderType.GOOGLE;

    const startTime = Date.now();
    const input = this.redactPii(rawInput); // Redact early

    try {
      // Guardrail check
      this.aiGuardrailService.checkInput(JSON.stringify(input));

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

      // Only fallback if error is AiProviderException. Guardrail exceptions (BadRequestException) should NOT trigger fallback.
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
        userId: (rawInput as any).userId, // Add userId from raw input
        providerRequested: primaryProviderType,
        providerUsed: response?.metadata?.providerUsed || primaryProviderType,
        promptType: methodName,
        promptVersion: response?.metadata?.promptVersion,
        requestSummary: JSON.stringify(input),
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
    // PAC-TASK-391: Build Graph-RAG Context
    let medicineSlugs: string[] = [];
    if (input.medicineIds && input.medicineIds.length > 0) {
      const dbMedicines = await this.prisma.medicine.findMany({
        where: { id: { in: input.medicineIds } },
        include: { product: true },
      });
      medicineSlugs = dbMedicines.map((m) => m.product.slug);
    } else if (input.medicines && input.medicines.length > 0) {
      const dbProducts = await this.prisma.product.findMany({
        where: { name: { in: input.medicines } },
      });
      medicineSlugs = dbProducts.map((p) => p.slug);
    }

    if (medicineSlugs.length > 0) {
      const graphData =
        await this.graphRagBuilderService.buildContextForMedicines(
          medicineSlugs,
        );
      const graphText = this.graphRagBuilderService.formatContextAsText(
        graphData,
        {
          isStale:
            graphData.fallbackUsed &&
            graphData.fallbackReason === 'STALE_GRAPH',
          staleReason: graphData.fallbackReason,
        },
      );
      input.graphContext = graphText;

      const response = await this.executeWithFallback<
        InteractionExplanationInput,
        InteractionExplanationOutput
      >('generateInteractionExplanation', input);

      if (response.metadata) {
        response.metadata.graphUsed =
          graphData.medicines.length > 0 || graphData.interactions.length > 0;
        response.metadata.graphFresh = !(
          graphData.fallbackUsed && graphData.fallbackReason === 'STALE_GRAPH'
        );
        if (graphData.fallbackReason) {
          response.metadata.fallbackReason = graphData.fallbackReason;
        }
      }
      return response;
    }

    return this.executeWithFallback<
      InteractionExplanationInput,
      InteractionExplanationOutput
    >('generateInteractionExplanation', input);
  }

  async generateConsultationNoteDraft(
    input: ConsultationNoteDraftInput,
  ): Promise<AiResponse<ConsultationNoteDraftOutput>> {
    return this.executeWithFallback<
      ConsultationNoteDraftInput,
      ConsultationNoteDraftOutput
    >('generateConsultationNoteDraft', input);
  }

  async generateFollowUpQuestions(
    input: FollowUpQuestionsInput,
  ): Promise<AiResponse<FollowUpQuestionsOutput>> {
    return this.executeWithFallback('generateFollowUpQuestions', input);
  }
}
