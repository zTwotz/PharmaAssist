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

  it('should build provenance metadata correctly', () => {
    const data = {
      medicines: [
        {
          medicine: { slug: 'med1', name: 'Med 1' },
          activeIngredients: [
            { slug: 'ai1', name: 'AI 1' },
            { slug: 'ai2', name: 'AI 2' },
          ],
        },
      ],
      interactions: [
        {
          activeIngredient: { slug: 'ai1', name: 'AI 1' },
          interactions: [
            {
              interactingIngredient: { slug: 'ai3', name: 'AI 3' },
              severity: 'High',
              description: 'desc',
            },
          ],
        },
      ],
    };

    const metadata = service.buildProvenanceMetadata(data);

    expect(metadata.graphUsed).toBe(true);
    expect(metadata.fetchedAt).toBeDefined();
    expect(metadata.medicineSlugs).toContain('med1');
    expect(metadata.activeIngredientSlugs).toContain('ai1');
    expect(metadata.activeIngredientSlugs).toContain('ai2');
    expect(metadata.activeIngredientSlugs).toContain('ai3');
    expect(metadata.interactionPairs).toHaveLength(1);
    expect(metadata.interactionPairs[0]).toEqual({
      ingredient1: 'ai1',
      ingredient2: 'ai3',
      severity: 'High',
    });
  });

  it('should return graphUsed false when no data exists', () => {
    const data = { medicines: [], interactions: [] };
    const metadata = service.buildProvenanceMetadata(data);
    expect(metadata.graphUsed).toBe(false);
    expect(metadata.fetchedAt).toBeDefined();
  });
});
