import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AiConfigService } from './ai-config.service';
import { AiProviderType } from './types/ai-provider.enum';

describe('AiConfigService', () => {
  let service: AiConfigService;
  let mockConfigService: jest.Mocked<ConfigService>;
  let mockPrismaService: any;

  beforeEach(async () => {
    mockConfigService = {
      get: jest.fn(),
    } as any;

    mockPrismaService = {
      aiProviderConfig: {
        findFirst: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiConfigService,
        { provide: ConfigService, useValue: mockConfigService },
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<AiConfigService>(AiConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return primary provider from DB if found', async () => {
    mockPrismaService.aiProviderConfig.findFirst.mockResolvedValue({
      providerKey: AiProviderType.MOCK,
    });
    expect(await service.getPrimaryProvider()).toEqual(AiProviderType.MOCK);
  });

  it('should return primary provider from env if DB is null', async () => {
    mockPrismaService.aiProviderConfig.findFirst.mockResolvedValue(null);
    mockConfigService.get.mockReturnValue(AiProviderType.MOCK);
    expect(await service.getPrimaryProvider()).toEqual(AiProviderType.MOCK);
  });

  it('should fallback to GOOGLE if no valid config found', async () => {
    mockPrismaService.aiProviderConfig.findFirst.mockResolvedValue(null);
    mockConfigService.get.mockReturnValue(undefined);
    expect(await service.getPrimaryProvider()).toEqual(AiProviderType.GOOGLE);
  });

  it('should return google AI API key when defined', async () => {
    mockConfigService.get.mockReturnValue('test-key');
    expect(await service.getGoogleAiApiKey()).toEqual('test-key');
    expect(mockConfigService.get).toHaveBeenCalledWith('GEMINI_API_KEY');
  });

  it('should throw error if google AI API key is undefined or empty', async () => {
    mockConfigService.get.mockReturnValue('   ');
    await expect(service.getGoogleAiApiKey()).rejects.toThrow(
      'GEMINI_API_KEY cannot be empty',
    );
  });
});
