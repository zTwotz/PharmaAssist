import { Test, TestingModule } from '@nestjs/testing';
import { GraphRagBuilderService } from './graph-rag-builder.service';
import { GraphContextService } from '../graph-context/graph-context.service';

describe('GraphRagBuilderService', () => {
  let service: GraphRagBuilderService;
  let graphContextService: jest.Mocked<GraphContextService>;

  beforeEach(async () => {
    graphContextService = {
      getMedicineContainsActiveIngredientContext: jest.fn(),
      getActiveIngredientInteractsWithContext: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GraphRagBuilderService,
        { provide: GraphContextService, useValue: graphContextService },
      ],
    }).compile();

    service = module.get<GraphRagBuilderService>(GraphRagBuilderService);
  });

  it('should build context for given medicine slugs', async () => {
    graphContextService.getMedicineContainsActiveIngredientContext
      .mockResolvedValueOnce({
        medicine: { slug: 'med1', name: 'Med 1' },
        activeIngredients: [{ slug: 'ai1', name: 'AI 1' }],
      })
      .mockResolvedValueOnce({
        medicine: { slug: 'med2', name: 'Med 2' },
        activeIngredients: [{ slug: 'ai2', name: 'AI 2' }],
      });

    graphContextService.getActiveIngredientInteractsWithContext
      .mockResolvedValueOnce({
        activeIngredient: { slug: 'ai1', name: 'AI 1' },
        interactions: [
          {
            interactingIngredient: { slug: 'ai2', name: 'AI 2' },
            severity: 'High',
            description: 'Bad interaction',
          },
        ],
      })
      .mockResolvedValueOnce({
        activeIngredient: { slug: 'ai2', name: 'AI 2' },
        interactions: [
          {
            interactingIngredient: { slug: 'ai1', name: 'AI 1' },
            severity: 'High',
            description: 'Bad interaction',
          },
        ],
      });

    const result = await service.buildContextForMedicines(['med1', 'med2']);

    expect(
      graphContextService.getMedicineContainsActiveIngredientContext,
    ).toHaveBeenCalledTimes(2);
    expect(
      graphContextService.getActiveIngredientInteractsWithContext,
    ).toHaveBeenCalledTimes(2);

    expect(result.medicines).toHaveLength(2);
    expect(result.interactions).toHaveLength(2);
    // Output string format test
    const text = service.formatContextAsText(result);
    expect(text).toContain('Med 1');
    expect(text).toContain('Bad interaction');
  });

  it('should ignore not found medicines gracefully', async () => {
    graphContextService.getMedicineContainsActiveIngredientContext.mockRejectedValue(
      new Error('Not found'),
    );
    const result = await service.buildContextForMedicines(['unknown-med']);
    expect(result.medicines).toHaveLength(0);
    expect(result.interactions).toHaveLength(0);
  });
});
