import { Test, TestingModule } from '@nestjs/testing';
import { AiService } from './ai.service';
import { AiConfigService } from './ai-config.service';
import { GoogleAiProvider } from './providers/google-ai.provider';
import { MockAiProvider } from './providers/mock-ai.provider';
import { AiProviderType } from './types/ai-provider.enum';
import { AiProviderException } from './exceptions/ai.exception';
import { AiAuditLogService } from './ai-audit-log.service';
import { AiGuardrailService } from './ai-guardrail.service';
import { AiPiiMinimizerService } from './ai-pii-minimizer.service';

describe('AiService', () => {
  let service: AiService;
  let mockConfigService: any;
  let mockGoogleAiProvider: any;
  let mockMockAiProvider: Partial<MockAiProvider>;
  let mockAuditLogService: Partial<AiAuditLogService>;
  let mockGuardrailService: Partial<AiGuardrailService>;
  let mockPiiMinimizerService: Partial<AiPiiMinimizerService>;

  beforeEach(async () => {
    mockConfigService = {
      getPrimaryProvider: jest.fn().mockResolvedValue(AiProviderType.GOOGLE),
      isFallbackEnabled: jest.fn().mockResolvedValue(true),
    };

    mockGoogleAiProvider = {
      generateInteractionExplanation: jest.fn().mockResolvedValue({
        data: {
          explanation: 'Google Explanation',
          severity: 'medium',
          recommendation: 'Google Rec',
        },
        metadata: { providerUsed: AiProviderType.GOOGLE },
      }),
      generateConsultationNoteDraft: jest.fn().mockResolvedValue({
        data: {
          draftNote: "Sample Note",
          disclaimer: "Disclaimer"
          
        },
        metadata: { providerUsed: AiProviderType.GOOGLE },
      }),
      generateFollowUpQuestions: jest.fn().mockResolvedValue({
        data: { questions: ['Google Q1?'] },
        metadata: { providerUsed: AiProviderType.GOOGLE },
      }),
    };

    mockMockAiProvider = {
      generateInteractionExplanation: jest.fn().mockResolvedValue({
        data: {
          explanation: 'Mock Explanation',
          severity: 'low',
          recommendation: 'Mock Rec',
        },
        metadata: { providerUsed: AiProviderType.MOCK },
      }),
      generateConsultationNoteDraft: jest.fn().mockResolvedValue({
        data: {
          disclaimer: "Disclaimer"
          
        },
        metadata: { providerUsed: AiProviderType.MOCK },
      }),
      generateFollowUpQuestions: jest.fn().mockResolvedValue({
        data: { questions: ['Mock Q1?'] },
        metadata: { providerUsed: AiProviderType.MOCK },
      }),
    };

    mockAuditLogService = {
      log: jest.fn().mockResolvedValue(undefined),
    };

    mockGuardrailService = {
      checkInput: jest.fn(),
      checkOutput: jest.fn(),
    };

    mockPiiMinimizerService = {
      minimizeObject: jest.fn().mockImplementation((input) => input),
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
        { provide: MockAiProvider, useValue: mockMockAiProvider },
        { provide: AiAuditLogService, useValue: mockAuditLogService },
        { provide: AiGuardrailService, useValue: mockGuardrailService },
        { provide: AiPiiMinimizerService, useValue: mockPiiMinimizerService },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call Google AI successfully', async () => {
    const input = {
      userId: 'test-user',
      alertContext: 'ctx',
      medicines: [],
      activeIngredients: [],
      ruleDescription: 'desc',
    };
    const result = await service.generateInteractionExplanation(input);

    expect(
      mockGoogleAiProvider.generateInteractionExplanation,
    ).toHaveBeenCalledWith(expect.objectContaining(input));
    expect(result.data.explanation).toEqual('Google Explanation');
    expect(result.metadata.providerUsed).toEqual(AiProviderType.GOOGLE);
  });

  it('should fallback to Mock AI if Google AI fails with AiProviderException and fallback is enabled', async () => {
    const googleError = new AiProviderException('Google is down');

    mockGoogleAiProvider.generateInteractionExplanation.mockRejectedValue(
      googleError,
    );

    const result = await service.generateInteractionExplanation({
      userId: 'test-user',
      alertContext: 'ctx',
      medicines: [],
      activeIngredients: [],
      ruleDescription: 'desc',
    });

    expect(result.data.explanation).toEqual('Mock Explanation');
    expect(result.metadata.fallbackReason).toEqual('Google is down');
    expect(result.metadata.providerRequested).toEqual(AiProviderType.GOOGLE);
    expect(
      mockGoogleAiProvider.generateInteractionExplanation,
    ).toHaveBeenCalled();
    expect(
      mockMockAiProvider.generateInteractionExplanation,
    ).toHaveBeenCalled();
  });

  it('should throw error if Google AI fails with AiProviderException but fallback is disabled', async () => {
    mockConfigService.isFallbackEnabled.mockResolvedValue(false);
    const googleError = new AiProviderException('Google is down');

    mockGoogleAiProvider.generateInteractionExplanation.mockRejectedValue(
      googleError,
    );

    await expect(
      service.generateInteractionExplanation({
        userId: 'test-user',
        alertContext: 'ctx',
        medicines: [],
        activeIngredients: [],
        ruleDescription: 'desc',
      }),
    ).rejects.toThrow('Google is down');

    expect(
      mockGoogleAiProvider.generateInteractionExplanation,
    ).toHaveBeenCalled();
    expect(
      mockMockAiProvider.generateInteractionExplanation,
    ).not.toHaveBeenCalled();
  });

  it('should throw error immediately if error is not AiProviderException', async () => {
    const genericError = new Error('Generic error');

    mockGoogleAiProvider.generateInteractionExplanation.mockRejectedValue(
      genericError,
    );

    await expect(
      service.generateInteractionExplanation({
        userId: 'test-user',
        alertContext: 'ctx',
        medicines: [],
        activeIngredients: [],
        ruleDescription: 'desc',
      }),
    ).rejects.toThrow('Generic error');

    expect(
      mockGoogleAiProvider.generateInteractionExplanation,
    ).toHaveBeenCalled();
    expect(
      mockMockAiProvider.generateInteractionExplanation,
    ).not.toHaveBeenCalled(); // No fallback for generic error
  });

  it('should call Google AI successfully', async () => {
    const input = {
      userId: 'test-user',
      alertContext: 'ctx',
      orderContext: 'order',
    };
    const result = await service.generateConsultationNoteDraft(input);

    expect(
      mockGoogleAiProvider.generateConsultationNoteDraft,
    ).toHaveBeenCalledWith(expect.objectContaining(input));
    expect(result.data).toHaveProperty('draftNote');
    expect(result.metadata.providerUsed).toEqual(AiProviderType.GOOGLE);
  });

  it('should fallback to Mock AI for generateFollowUpQuestions', async () => {
    const googleError = new AiProviderException('Quota exceeded');

    mockGoogleAiProvider.generateFollowUpQuestions.mockRejectedValue(
      googleError,
    );

    const result = await service.generateFollowUpQuestions({
      userId: 'test-user',
      shortContext: 'ctx',
    });

    expect(result.data.questions).toEqual(['Mock Q1?']);
    expect(result.metadata.fallbackReason).toEqual('Quota exceeded');
  });
});
