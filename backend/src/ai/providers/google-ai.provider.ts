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

@Injectable()
export class GoogleAiProvider implements AiProvider {
  private readonly logger = new Logger(GoogleAiProvider.name);
  private model: GenerativeModel;

  constructor(private readonly configService: AiConfigService) {
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
      const prompt = `Bạn là một trợ lý ảo hỗ trợ dược sĩ tại nhà thuốc.
Nhiệm vụ: Giải thích về cảnh báo tương tác thuốc sau đây.
Hoạt chất: ${input.activeIngredients.join(', ')}.
Thuốc: ${input.medicines.join(', ')}.
Mô tả cảnh báo: ${input.ruleDescription}.
Ngữ cảnh bổ sung: ${input.alertContext}.

Hãy trả về dưới định dạng JSON hợp lệ với 2 trường:
{
  "explanation": "Giải thích ngắn gọn (2-3 câu) về lý do tương tác và hậu quả có thể xảy ra.",
  "disclaimer": "Một câu cảnh báo rằng đây chỉ là thông tin tham khảo từ AI, dược sĩ cần tự đưa ra quyết định."
}`;

      const result = await this.model.generateContent(prompt);
      const text = result.response.text();
      const parsed = this.parseJsonResponse<InteractionExplanationOutput>(text);

      return {
        data: parsed,
        metadata: {
          providerRequested: AiProviderType.GOOGLE,
          providerUsed: AiProviderType.GOOGLE,
          durationMs: Date.now() - startTime,
        },
      };
    } catch (error) {
      this.logger.error(
        `Google AI Error (generateInteractionExplanation): ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async generateConsultationNoteDraft(
    input: ConsultationNoteDraftInput,
  ): Promise<AiResponse<ConsultationNoteDraftOutput>> {
    const startTime = Date.now();
    try {
      const prompt = `Bạn là một trợ lý ảo hỗ trợ dược sĩ tại nhà thuốc.
Nhiệm vụ: Viết nháp ghi chú tư vấn cho bệnh nhân.
Ngữ cảnh đơn hàng: ${input.orderContext}.
Ngữ cảnh cảnh báo tương tác: ${input.alertContext}.

Hãy trả về dưới định dạng JSON hợp lệ với 2 trường:
{
  "draftNote": "Nội dung ghi chú tư vấn (ngắn gọn, dễ hiểu, các lời khuyên khi dùng chung thuốc).",
  "disclaimer": "Một câu cảnh báo rằng đây chỉ là gợi ý từ AI."
}`;

      const result = await this.model.generateContent(prompt);
      const text = result.response.text();
      const parsed = this.parseJsonResponse<ConsultationNoteDraftOutput>(text);

      return {
        data: parsed,
        metadata: {
          providerRequested: AiProviderType.GOOGLE,
          providerUsed: AiProviderType.GOOGLE,
          durationMs: Date.now() - startTime,
        },
      };
    } catch (error) {
      this.logger.error(
        `Google AI Error (generateConsultationNoteDraft): ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async generateFollowUpQuestions(
    input: FollowUpQuestionsInput,
  ): Promise<AiResponse<FollowUpQuestionsOutput>> {
    const startTime = Date.now();
    try {
      const prompt = `Bạn là trợ lý ảo cho dược sĩ.
Nhiệm vụ: Đề xuất 3 câu hỏi ngắn gọn dược sĩ nên hỏi bệnh nhân để đảm bảo an toàn dùng thuốc.
Ngữ cảnh: ${input.shortContext}.

Hãy trả về định dạng JSON hợp lệ với 2 trường:
{
  "questions": ["Câu 1", "Câu 2", "Câu 3"],
  "disclaimer": "Câu cảnh báo: thông tin chỉ mang tính tham khảo từ AI."
}`;

      const result = await this.model.generateContent(prompt);
      const text = result.response.text();
      const parsed = this.parseJsonResponse<FollowUpQuestionsOutput>(text);

      return {
        data: parsed,
        metadata: {
          providerRequested: AiProviderType.GOOGLE,
          providerUsed: AiProviderType.GOOGLE,
          durationMs: Date.now() - startTime,
        },
      };
    } catch (error) {
      this.logger.error(
        `Google AI Error (generateFollowUpQuestions): ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
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
      throw new Error('AI response is not valid JSON');
    }
  }
}
