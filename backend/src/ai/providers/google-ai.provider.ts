import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { AiProvider } from '../interfaces/ai-provider.interface';
import { AiProviderType } from '../types/ai-provider.enum';
import {
  AiResponse,
  InteractionExplanationInput,
  InteractionExplanationOutput,
  ConsultationNoteDraftInput,
  ConsultationNoteDraftOutput,
  FollowUpQuestionsInput,
  FollowUpQuestionsOutput,
} from '../types/ai-payloads.type';
import { AiConfigService } from '../ai-config.service';
import {
  AiProviderException,
  AiTimeoutException,
} from '../exceptions/ai.exception';
import { PromptsService } from '../prompts.service';

@Injectable()
export class GoogleAiProvider implements AiProvider {
  private readonly logger = new Logger(GoogleAiProvider.name);
  private model: GenerativeModel;

  constructor(
    private readonly configService: AiConfigService,
    private readonly promptsService: PromptsService,
  ) {
    const genAI = new GoogleGenerativeAI(this.configService.googleAiApiKey);
    this.model = genAI.getGenerativeModel({
      model: this.configService.googleAiModel,
    });
  }

  async generateInteractionExplanation(
    input: InteractionExplanationInput,
  ): Promise<AiResponse<InteractionExplanationOutput>> {
    const startTime = Date.now();
    try {
      const template = await this.promptsService.getPromptTemplate('interaction_explanation');
      const prompt = this.promptsService.compilePrompt(template.content, {
        activeIngredients: input.activeIngredients.join(', '),
        medicines: input.medicines.join(', '),
        ruleDescription: input.ruleDescription,
        alertContext: input.alertContext,
      });

      const result = await this.executeWithTimeout(
        this.model.generateContent(prompt),
      );
      const text = result.response.text();
      const parsed = this.parseJsonResponse<InteractionExplanationOutput>(text);

      return {
        data: parsed,
        metadata: {
          providerRequested: AiProviderType.GOOGLE,
          providerUsed: AiProviderType.GOOGLE,
          promptVersion: template.version,
          durationMs: Date.now() - startTime,
        },
      };
    } catch (error) {
      this.logger.error(
        `Google AI Error (generateInteractionExplanation): ${(error as Error).message}`,
        (error as Error).stack,
      );
      if (error instanceof AiProviderException) throw error;
      throw new AiProviderException(
        `Google AI generateInteractionExplanation failed: ${(error as Error).message}`,
        error as Error,
      );
    }
  }

  async generateConsultationNoteDraft(
    input: ConsultationNoteDraftInput,
  ): Promise<AiResponse<ConsultationNoteDraftOutput>> {
    const startTime = Date.now();
    try {
      const template = await this.promptsService.getPromptTemplate('consultation_note');
      const prompt = this.promptsService.compilePrompt(template.content, {
        orderContext: input.orderContext,
        alertContext: input.alertContext,
      });

      const result = await this.executeWithTimeout(
        this.model.generateContent(prompt),
      );
      const text = result.response.text();
      const parsed = this.parseJsonResponse<ConsultationNoteDraftOutput>(text);

      return {
        data: parsed,
        metadata: {
          providerRequested: AiProviderType.GOOGLE,
          providerUsed: AiProviderType.GOOGLE,
          promptVersion: template.version,
          durationMs: Date.now() - startTime,
        },
      };
    } catch (error) {
      this.logger.error(
        `Google AI Error (generateConsultationNoteDraft): ${(error as Error).message}`,
        (error as Error).stack,
      );
      if (error instanceof AiProviderException) throw error;
      throw new AiProviderException(
        `Google AI generateConsultationNoteDraft failed: ${(error as Error).message}`,
        error as Error,
      );
    }
  }

  async generateFollowUpQuestions(
    input: FollowUpQuestionsInput,
  ): Promise<AiResponse<FollowUpQuestionsOutput>> {
    const startTime = Date.now();
    try {
      const template = await this.promptsService.getPromptTemplate('follow_up_questions');
      const prompt = this.promptsService.compilePrompt(template.content, {
        shortContext: input.shortContext,
      });

      const result = await this.executeWithTimeout(
        this.model.generateContent(prompt),
      );
      const text = result.response.text();
      const parsed = this.parseJsonResponse<FollowUpQuestionsOutput>(text);

      return {
        data: parsed,
        metadata: {
          providerRequested: AiProviderType.GOOGLE,
          providerUsed: AiProviderType.GOOGLE,
          promptVersion: template.version,
          durationMs: Date.now() - startTime,
        },
      };
    } catch (error) {
      this.logger.error(
        `Google AI Error (generateFollowUpQuestions): ${(error as Error).message}`,
        (error as Error).stack,
      );
      if (error instanceof AiProviderException) throw error;
      throw new AiProviderException(
        `Google AI generateFollowUpQuestions failed: ${(error as Error).message}`,
        error as Error,
      );
    }
  }

  private parseJsonResponse<T>(text: string): T {
    try {
      const cleaned = text
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();
      return JSON.parse(cleaned) as T;
    } catch (error) {
      this.logger.error(
        `Failed to parse AI JSON response: ${text}`,
        (error as Error).stack,
      );
      throw new AiProviderException('AI response is not valid JSON');
    }
  }

  private async executeWithTimeout<T>(
    promise: Promise<T>,
    timeoutMs = 15000,
  ): Promise<T> {
    let timeoutId: NodeJS.Timeout;

    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new AiTimeoutException(timeoutMs));
      }, timeoutMs);
    });

    try {
      return await Promise.race([promise, timeoutPromise]);
    } catch (error) {
      if (error instanceof AiTimeoutException) {
        throw error;
      }
      throw new AiProviderException(
        `AI request failed: ${(error as Error).message}`,
        error as Error,
      );
    } finally {
      clearTimeout(timeoutId!);
    }
  }
}
