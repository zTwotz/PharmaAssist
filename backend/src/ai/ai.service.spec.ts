import { Test, TestingModule } from '@nestjs/testing';
import { AiService } from './ai.service';
import { AiConfigService } from './ai-config.service';
import { GoogleAiProvider } from './providers/google-ai.provider';
import { MockAiProvider } from './providers/mock-ai.provider';
import { AiProviderType } from './types/ai-provider.enum';
import { AiProviderException } from './exceptions/ai.exception';
import { AiAuditLogService } from './ai-audit-log.service';

describe('AiService', () => {
  let service: AiService;
  let mockConfigService: any;
  let mockGoogleAiProvider: any;
  let mockMockAiProvider: any;

  beforeEach(async () => {
    mockConfigService = {
      primaryProvider: AiProviderType.GOOGLE,
      isFallbackEnabled: true,
    };

    mockGoogleAiProvider = {
      generateInteractionExplanation: jest.fn(),
      generateConsultationNoteDraft: jest.fn(),
      generateFollowUpQuestions: jest.fn(),
    };

    mockMockAiProvider = {
      generateInteractionExplanation: jest.fn(),
      generateConsultationNoteDraft: jest.fn(),
      generateFollowUpQuestions: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        {
          provide: AiConfigService,
          useValue: mockConfigService,
        },
        {
          provide: GoogleAiProvider,
          useValue: mockGoogleAiProvider,
        },
        {
          provide: MockAiProvider,
          useValue: mockMockAiProvider,
        },
        {
          provide: AiAuditLogService,
          useValue: {
            log: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call Google AI successfully', async () => {
    const mockResponse = {
      data: { explanation: 'test', disclaimer: 'test' },
      metadata: { providerRequested: AiProviderType.GOOGLE, providerUsed: AiProviderType.GOOGLE },
    };

    mockGoogleAiProvider.generateInteractionExplanation.mockResolvedValue(mockResponse);

    const result = await service.generateInteractionExplanation({
      userId: 'test-user',
      alertContext: 'ctx', medicines: [], activeIngredients: [], ruleDescription: 'desc',
    });

    expect(result).toEqual(mockResponse);
    expect(mockGoogleAiProvider.generateInteractionExplanation).toHaveBeenCalled();
    expect(mockMockAiProvider.generateInteractionExplanation).not.toHaveBeenCalled();
  });

  it('should fallback to Mock AI if Google AI fails with AiProviderException and fallback is enabled', async () => {
    const googleError = new AiProviderException('Google is down');
    const mockResponse = {
      data: { explanation: 'mock', disclaimer: 'mock' },
      metadata: { providerRequested: AiProviderType.MOCK, providerUsed: AiProviderType.MOCK },
    };

    mockGoogleAiProvider.generateInteractionExplanation.mockRejectedValue(googleError);
    mockMockAiProvider.generateInteractionExplanation.mockResolvedValue(mockResponse);

    const result = await service.generateInteractionExplanation({
      userId: 'test-user',
      alertContext: 'ctx', medicines: [], activeIngredients: [], ruleDescription: 'desc',
    });

    expect(result.data.explanation).toEqual('mock');
    expect(result.metadata.fallbackReason).toEqual('Google is down');
    expect(result.metadata.providerRequested).toEqual(AiProviderType.GOOGLE);
    expect(mockGoogleAiProvider.generateInteractionExplanation).toHaveBeenCalled();
    expect(mockMockAiProvider.generateInteractionExplanation).toHaveBeenCalled();
  });

  it('should throw error if Google AI fails with AiProviderException but fallback is disabled', async () => {
    mockConfigService.isFallbackEnabled = false;
    const googleError = new AiProviderException('Google is down');

    mockGoogleAiProvider.generateInteractionExplanation.mockRejectedValue(googleError);

    await expect(service.generateInteractionExplanation({
      userId: 'test-user',
      alertContext: 'ctx', medicines: [], activeIngredients: [], ruleDescription: 'desc',
    })).rejects.toThrow('Google is down');

    expect(mockGoogleAiProvider.generateInteractionExplanation).toHaveBeenCalled();
    expect(mockMockAiProvider.generateInteractionExplanation).not.toHaveBeenCalled();
  });

  it('should throw error immediately if error is not AiProviderException', async () => {
    const genericError = new Error('Generic error');

    mockGoogleAiProvider.generateInteractionExplanation.mockRejectedValue(genericError);

    await expect(service.generateInteractionExplanation({
      userId: 'test-user',
      alertContext: 'ctx', medicines: [], activeIngredients: [], ruleDescription: 'desc',
    })).rejects.toThrow('Generic error');

    expect(mockGoogleAiProvider.generateInteractionExplanation).toHaveBeenCalled();
    expect(mockMockAiProvider.generateInteractionExplanation).not.toHaveBeenCalled(); // No fallback for generic error
  });

  it('should fallback to Mock AI for generateConsultationNoteDraft', async () => {
    const googleError = new AiProviderException('Timeout');
    const mockResponse = {
      data: { draftNote: 'mock note', disclaimer: 'mock' },
      metadata: { providerRequested: AiProviderType.MOCK, providerUsed: AiProviderType.MOCK },
    };

    mockGoogleAiProvider.generateConsultationNoteDraft.mockRejectedValue(googleError);
    mockMockAiProvider.generateConsultationNoteDraft.mockResolvedValue(mockResponse);

    const result = await service.generateConsultationNoteDraft({
      userId: 'test-user',
      alertContext: 'ctx', orderContext: 'order',
    });

    expect(result.data.draftNote).toEqual('mock note');
    expect(result.metadata.fallbackReason).toEqual('Timeout');
  });

  it('should fallback to Mock AI for generateFollowUpQuestions', async () => {
    const googleError = new AiProviderException('Quota exceeded');
    const mockResponse = {
      data: { questions: ['Q1'], disclaimer: 'mock' },
      metadata: { providerRequested: AiProviderType.MOCK, providerUsed: AiProviderType.MOCK },
    };

    mockGoogleAiProvider.generateFollowUpQuestions.mockRejectedValue(googleError);
    mockMockAiProvider.generateFollowUpQuestions.mockResolvedValue(mockResponse);

    const result = await service.generateFollowUpQuestions({
      userId: 'test-user',
      shortContext: 'ctx',
    });

    expect(result.data.questions).toEqual(['Q1']);
    expect(result.metadata.fallbackReason).toEqual('Quota exceeded');
  });
});
