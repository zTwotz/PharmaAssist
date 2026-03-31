import { AiProviderType } from './ai-provider.enum';

export interface AiMetadata {
  providerRequested: AiProviderType;
  providerUsed: AiProviderType;
  fallbackReason?: string;
  durationMs?: number;
}

export interface AiResponse<T> {
  data: T;
  metadata: AiMetadata;
}

// 1. Interaction Explanation
export interface InteractionExplanationInput {
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
  alertContext: string;
  orderContext: string;
}

export interface ConsultationNoteDraftOutput {
  draftNote: string;
  disclaimer: string;
}

// 3. Follow-up Questions
export interface FollowUpQuestionsInput {
  shortContext: string;
}

export interface FollowUpQuestionsOutput {
  questions: string[];
  disclaimer: string;
}
