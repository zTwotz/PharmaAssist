import { Injectable, Logger } from '@nestjs/common';
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

@Injectable()
export class MockAiProvider implements AiProvider {
  private readonly logger = new Logger(MockAiProvider.name);

  async generateInteractionExplanation(
    input: InteractionExplanationInput,
  ): Promise<AiResponse<InteractionExplanationOutput>> {
    const startTime = Date.now();
    await new Promise((resolve) => setTimeout(resolve, 50));
    this.logger.debug(
      `Generating mock interaction explanation for rules: ${input.ruleDescription}`,
    );

    return {
      data: {
        explanation:
          'Thông tin mẫu từ hệ thống dự phòng: Có khả năng xảy ra tương tác giữa các hoạt chất được kê. Xin dược sĩ lưu ý theo dõi các biểu hiện lâm sàng của bệnh nhân.',
        disclaimer:
          'CẢNH BÁO: Đây là thông tin mẫu dự phòng do AI không phản hồi. Dược sĩ phải dựa vào chuyên môn để quyết định.',
      },
      metadata: {
        providerRequested: AiProviderType.MOCK,
        providerUsed: AiProviderType.MOCK,
        durationMs: Date.now() - startTime,
      },
    };
  }

  async generateConsultationNoteDraft(
    input: ConsultationNoteDraftInput,
  ): Promise<AiResponse<ConsultationNoteDraftOutput>> {
    const startTime = Date.now();
    await new Promise((resolve) => setTimeout(resolve, 50));
    this.logger.debug(
      `Generating mock consultation note draft for order: ${input.orderContext.substring(0, 20)}...`,
    );

    return {
      data: {
        draftNote:
          'Ghi chú tư vấn mẫu: Xin uống thuốc đúng giờ. Nên giãn cách thời gian sử dụng các loại thuốc có khả năng tương tác ít nhất 2 giờ. Nếu có dấu hiệu bất thường xin ngừng thuốc và tái khám.',
        disclaimer:
          'CẢNH BÁO: Đây là ghi chú mẫu dự phòng. Vui lòng tự chỉnh sửa theo tình trạng thực tế của người bệnh.',
      },
      metadata: {
        providerRequested: AiProviderType.MOCK,
        providerUsed: AiProviderType.MOCK,
        durationMs: Date.now() - startTime,
      },
    };
  }

  async generateFollowUpQuestions(
    input: FollowUpQuestionsInput,
  ): Promise<AiResponse<FollowUpQuestionsOutput>> {
    const startTime = Date.now();
    await new Promise((resolve) => setTimeout(resolve, 50));
    this.logger.debug(
      `Generating mock follow-up questions for context: ${input.shortContext.substring(0, 20)}...`,
    );

    return {
      data: {
        questions: [
          'Bệnh nhân có tiền sử dị ứng với loại thuốc nào không?',
          'Bệnh nhân có đang sử dụng thuốc điều trị bệnh mạn tính nào khác không?',
          'Bệnh nhân có đang mang thai hay cho con bú không?',
        ],
        disclaimer:
          'CẢNH BÁO: Đây là câu hỏi mẫu dự phòng. Dược sĩ cần cân nhắc thêm.',
      },
      metadata: {
        providerRequested: AiProviderType.MOCK,
        providerUsed: AiProviderType.MOCK,
        durationMs: Date.now() - startTime,
      },
    };
  }
}
