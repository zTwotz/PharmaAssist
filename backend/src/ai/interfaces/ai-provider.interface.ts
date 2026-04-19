import {
  AiResponse,
  ConsultationNoteDraftInput,
  ConsultationNoteDraftOutput,
  FollowUpQuestionsInput,
  FollowUpQuestionsOutput,
  InteractionExplanationInput,
  InteractionExplanationOutput,
} from '../types/ai-payloads.type';

export interface AiProvider {
  /**
   * Generates an explanation for an interaction alert.
   */
  generateInteractionExplanation(
    input: InteractionExplanationInput,
  ): Promise<AiResponse<InteractionExplanationOutput>>;

  /**
   * Generates a consultation note draft based on an alert and order.
   */
  generateConsultationNoteDraft(
    input: ConsultationNoteDraftInput,
  ): Promise<AiResponse<ConsultationNoteDraftOutput>>;

  /**
   * Generates safe follow-up questions based on a short context.
   */
  generateFollowUpQuestions(
    input: FollowUpQuestionsInput,
  ): Promise<AiResponse<FollowUpQuestionsOutput>>;
}

export const AI_PROVIDER_TOKEN = Symbol('AI_PROVIDER_TOKEN');
