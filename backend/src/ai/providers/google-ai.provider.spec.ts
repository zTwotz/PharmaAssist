import { Test, TestingModule } from '@nestjs/testing';
import { GoogleAiProvider } from './google-ai.provider';
import { AiConfigService } from '../ai-config.service';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AiProviderType } from '../types/ai-provider.enum';
import {
  AiProviderException,
  AiTimeoutException,
} from '../exceptions/ai.exception';

// Mock @google/generative-ai
jest.mock('@google/generative-ai');

describe('GoogleAiProvider', () => {
  let provider: GoogleAiProvider;
  let mockConfigService: jest.Mocked<AiConfigService>;
  let mockModel: any;

  beforeEach(async () => {
    mockConfigService = {
      googleAiApiKey: 'mock-api-key',
      googleAiModel: 'gemini-1.5-pro',
      primaryProvider: AiProviderType.GOOGLE,
      fallbackProvider: AiProviderType.MOCK,
      isFallbackEnabled: true,
    } as any;

    mockModel = {
      generateContent: jest.fn(),
    };

    (GoogleGenerativeAI as jest.Mock).mockImplementation(() => ({
      getGenerativeModel: jest.fn().mockReturnValue(mockModel),
    }));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoogleAiProvider,
        { provide: AiConfigService, useValue: mockConfigService },
      ],
    }).compile();

    provider = module.get<GoogleAiProvider>(GoogleAiProvider);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  describe('generateInteractionExplanation', () => {
    const input = {
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
      jest.advanceTimersByTime(16000); // Trigger 15s timeout

      await expect(promise).rejects.toThrow(AiTimeoutException);
    });
  });

  describe('generateConsultationNoteDraft', () => {
    const input = {
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
