import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AiConfigService } from './ai-config.service';
import { AiProviderType } from './types/ai-provider.enum';

describe('AiConfigService', () => {
  let service: AiConfigService;
  let mockConfigService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    mockConfigService = {
      get: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiConfigService,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AiConfigService>(AiConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return primary provider default as GOOGLE', () => {
    mockConfigService.get.mockImplementation((key, def) => def);
    expect(service.primaryProvider).toEqual(AiProviderType.GOOGLE);
  });

  it('should return google AI API key when defined', () => {
    mockConfigService.get.mockReturnValue('test-key');
    expect(service.googleAiApiKey).toEqual('test-key');
    expect(mockConfigService.get).toHaveBeenCalledWith('GEMINI_API_KEY');
  });

  it('should throw error if google AI API key is undefined', () => {
    mockConfigService.get.mockReturnValue(undefined);
    expect(() => service.googleAiApiKey).toThrow(
      'GEMINI_API_KEY must be defined for Google AI provider',
    );
  });
});
