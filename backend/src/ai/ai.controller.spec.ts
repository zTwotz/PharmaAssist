import { Test, TestingModule } from '@nestjs/testing';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { GenerateInteractionExplanationDto } from './dto/generate-interaction-explanation.dto';

describe('AiController', () => {
  let controller: AiController;
  let aiService: AiService;

  beforeEach(async () => {
    const mockAiService = {
      generateInteractionExplanation: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiController],
      providers: [
        { provide: AiService, useValue: mockAiService },
      ],
    }).compile();

    controller = module.get<AiController>(AiController);
    aiService = module.get<AiService>(AiService);
  });

  it('should call generateInteractionExplanation on AiService', async () => {
    const dto: GenerateInteractionExplanationDto = {
      alertContext: 'Warning',
      medicines: ['Med A'],
      activeIngredients: ['Ing A'],
      ruleDescription: 'Rule 1',
    };
    const req = { user: { id: 'user-1' } };
    const mockResult = { data: { explanation: 'Test explanation', disclaimer: 'Test disclaimer' }, metadata: {} };

    jest.spyOn(aiService, 'generateInteractionExplanation').mockResolvedValue(mockResult as any);

    const result = await controller.generateInteractionExplanation(req, dto);

    expect(result).toEqual(mockResult);
    expect(aiService.generateInteractionExplanation).toHaveBeenCalledWith({
      userId: 'user-1',
      ...dto,
    });
  });
});
