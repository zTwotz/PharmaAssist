import { Test, TestingModule } from '@nestjs/testing';
import { PromptsService } from './prompts.service';
import { PrismaService } from '../prisma/prisma.service';
import { InternalServerErrorException } from '@nestjs/common';

describe('PromptsService', () => {
  let service: PromptsService;
  let mockPrismaService: any;

  beforeEach(async () => {
    mockPrismaService = {
      promptTemplate: {
        findFirst: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PromptsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<PromptsService>(PromptsService);
  });

  it('should return prompt template if active template is found', async () => {
    mockPrismaService.promptTemplate.findFirst.mockResolvedValue({
      code: 'test_use_case',
      version: 'v1.0',
      content: 'Hello {{name}}',
      status: 'ACTIVE',
    });

    const result = await service.getPromptTemplate('test_use_case');
    expect(result).toEqual({
      content: 'Hello {{name}}',
      version: 'v1.0',
    });
    expect(mockPrismaService.promptTemplate.findFirst).toHaveBeenCalledWith({
      where: { code: 'test_use_case', status: 'ACTIVE' },
      orderBy: { version: 'desc' },
    });
  });

  it('should throw InternalServerErrorException if no active template is found', async () => {
    mockPrismaService.promptTemplate.findFirst.mockResolvedValue(null);

    await expect(service.getPromptTemplate('missing_use_case')).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('should compile prompt with given variables', () => {
    const template = 'Hello {{name}}, you are {{age}} years old.';
    const compiled = service.compilePrompt(template, {
      name: 'Alice',
      age: '30',
    });
    expect(compiled).toBe('Hello Alice, you are 30 years old.');
  });
});
