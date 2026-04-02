import { AiProviderType } from './ai-provider.enum';

export interface AiMetadata {
  /**
   * The provider that was initially requested by the system (e.g. from AiConfigService).
   * Used for tracking and audit logs to understand intent vs reality.
   */
  providerRequested: AiProviderType;

  /**
   * The provider that actually fulfilled the request.
   * If fallback occurred, this will differ from providerRequested.
   */
  providerUsed: AiProviderType;

  /**
   * Reason for fallback if providerUsed !== providerRequested.
   */
  fallbackReason?: string;

  /**
   * Duration of the AI request in milliseconds.
   */
  durationMs?: number;
}

export interface AiResponse<T> {
  data: T;
  metadata: AiMetadata;
}

// 1. Interaction Explanation
export interface InteractionExplanationInput {
  userId: string;
  alertContext: string;
  medicines: string[];
  activeIngredients: string[];
  ruleDescription: string;
}

export interface InteractionExplanationOutput {
  explanation: string;
  disclaimer: string;
}

// 2. Consultation Note Draft
export interface ConsultationNoteDraftInput {
  userId: string;
  alertContext: string;
  orderContext: string;
}

export interface ConsultationNoteDraftOutput {
  draftNote: string;
  disclaimer: string;
}

// 3. Follow-up Questions
export interface FollowUpQuestionsInput {
  userId: string;
  shortContext: string;
}

export interface FollowUpQuestionsOutput {
  questions: string[];
  disclaimer: string;
}
