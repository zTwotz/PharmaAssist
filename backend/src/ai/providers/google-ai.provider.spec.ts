import { Test, TestingModule } from '@nestjs/testing';
import { GoogleAiProvider } from './google-ai.provider';
import { AiConfigService } from '../ai-config.service';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AiProviderType } from '../types/ai-provider.enum';
import {
  AiProviderException,
  AiTimeoutException,
} from '../exceptions/ai.exception';
import { PromptsService } from '../prompts.service';

const mockGoogleGenerativeAI = {
  getGenerativeModel: jest.fn(),
};

jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest
    .fn()
    .mockImplementation(() => mockGoogleGenerativeAI),
}));

describe('GoogleAiProvider', () => {
  let provider: GoogleAiProvider;
  let mockConfigService: jest.Mocked<AiConfigService>;
  let mockPromptsService: jest.Mocked<PromptsService>;
  let mockModel: any;

  beforeEach(async () => {
    mockConfigService = {
      googleAiApiKey: 'test-api-key',
      googleAiModel: 'gemini-1.5-flash',
      primaryProvider: AiProviderType.GOOGLE,
      fallbackProvider: AiProviderType.MOCK,
      isFallbackEnabled: true,
    } as unknown as jest.Mocked<AiConfigService>;

    mockPromptsService = {
      getPromptTemplate: jest.fn(),
      compilePrompt: jest.fn(),
    } as unknown as jest.Mocked<PromptsService>;

    mockModel = {
      generateContent: jest.fn(),
    };
    mockGoogleGenerativeAI.getGenerativeModel.mockReturnValue(mockModel);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoogleAiProvider,
        { provide: AiConfigService, useValue: mockConfigService },
        { provide: PromptsService, useValue: mockPromptsService },
      ],
    }).compile();

    mockPromptsService.getPromptTemplate.mockResolvedValue({
      content: 'mock prompt template',
      version: 'v1.0',
    });
    mockPromptsService.compilePrompt.mockReturnValue('compiled prompt');

    provider = module.get<GoogleAiProvider>(GoogleAiProvider);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  describe('generateInteractionExplanation', () => {
    const input = {
      userId: 'test-user',
      alertContext: 'context',
      medicines: ['Med A', 'Med B'],
      activeIngredients: ['Ing A', 'Ing B'],
      ruleDescription: 'rule desc',
    };

    it('should return valid AiResponse when Google AI succeeds', async () => {
      const mockResponseText = JSON.stringify({
        explanation: 'This is an explanation.',
        disclaimer: 'This is a disclaimer.',
      });

      mockModel.generateContent.mockResolvedValue({
        response: { text: () => mockResponseText },
      });

      const result = await provider.generateInteractionExplanation(input);

      expect(result.data.explanation).toEqual('This is an explanation.');
      expect(result.data.disclaimer).toEqual('This is a disclaimer.');
      expect(result.metadata.providerUsed).toEqual(AiProviderType.GOOGLE);
    });

    it('should throw AiProviderException if response is not valid JSON', async () => {
      mockModel.generateContent.mockResolvedValue({
        response: { text: () => 'Invalid JSON string' },
      });

      await expect(
        provider.generateInteractionExplanation(input),
      ).rejects.toThrow(AiProviderException);
    });

    it('should throw AiTimeoutException if Google AI takes too long', async () => {
      jest.useFakeTimers();

      mockModel.generateContent.mockImplementation(() => {
        return new Promise((resolve) => setTimeout(resolve, 20000));
      });

      const promise = provider.generateInteractionExplanation(input);
      await Promise.resolve(); // Flush microtasks so the timeout is registered
      jest.advanceTimersByTime(16000); // Trigger 15s timeout

      await expect(promise).rejects.toThrow(AiTimeoutException);
    });
  });

  describe('generateConsultationNoteDraft', () => {
    const input = {
      userId: 'test-user',
      alertContext: 'alert context',
      orderContext: 'order context',
    };

    it('should return valid AiResponse when Google AI succeeds', async () => {
      const mockResponseText = JSON.stringify({
        draftNote: 'Note content.',
        disclaimer: 'Disclaimer content.',
      });

      mockModel.generateContent.mockResolvedValue({
        response: { text: () => mockResponseText },
      });

      const result = await provider.generateConsultationNoteDraft(input);

      expect(result.data.draftNote).toEqual('Note content.');
      expect(result.data.disclaimer).toEqual('Disclaimer content.');
      expect(result.metadata.providerUsed).toEqual(AiProviderType.GOOGLE);
    });
  });

  describe('generateFollowUpQuestions', () => {
    const input = {
      userId: 'test-user',
      shortContext: 'short context',
    };

    it('should return valid AiResponse when Google AI succeeds', async () => {
      const mockResponseText = JSON.stringify({
        questions: ['Question 1', 'Question 2'],
        disclaimer: 'Disclaimer content.',
      });

      mockModel.generateContent.mockResolvedValue({
        response: { text: () => mockResponseText },
      });

      const result = await provider.generateFollowUpQuestions(input);

      expect(result.data.questions).toHaveLength(2);
      expect(result.data.disclaimer).toEqual('Disclaimer content.');
      expect(result.metadata.providerUsed).toEqual(AiProviderType.GOOGLE);
    });

    it('should parse JSON even if wrapped in markdown', async () => {
      const mockResponseText =
        '```json\n{"questions": ["Q1"], "disclaimer": "D1"}\n```';

      mockModel.generateContent.mockResolvedValue({
        response: { text: () => mockResponseText },
      });

      const result = await provider.generateFollowUpQuestions(input);

      expect(result.data.questions).toEqual(['Q1']);
      expect(result.data.disclaimer).toEqual('D1');
    });
  });
});
