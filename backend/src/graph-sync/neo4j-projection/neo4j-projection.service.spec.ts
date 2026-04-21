import { Test, TestingModule } from '@nestjs/testing';
import { Neo4jProjectionService } from './neo4j-projection.service';

describe('Neo4jProjectionService', () => {
  let service: Neo4jProjectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Neo4jProjectionService],
    }).compile();

    service = module.get<Neo4jProjectionService>(Neo4jProjectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('projectMedicineNode', () => {
    it('should project a Medicine node correctly', () => {
      const mockMedicine = {
        id: 1,
        registrationNumber: 'REG-123',
        dosageForm: 'Tablet',
        product: {
          name: 'Panadol',
        },
      };

      const result = service.projectMedicineNode(mockMedicine, 1);

      expect(result.label).toBe('Medicine');
      expect(result.properties.id).toBe(1);
      expect(result.properties.name).toBe('Panadol');
      expect(result.properties.registrationNumber).toBe('REG-123');
      expect(result.properties.dosageForm).toBe('Tablet');
      expect(result.properties.sourceVersion).toBe(1);
      expect(result.properties.syncedAt).toBeDefined();
    });
  });

  describe('projectActiveIngredientNode', () => {
    it('should project an ActiveIngredient node correctly', () => {
      const mockIngredient = {
        id: 10,
        name: 'Paracetamol',
      };

      const result = service.projectActiveIngredientNode(mockIngredient, 2);

      expect(result.label).toBe('ActiveIngredient');
      expect(result.properties.id).toBe(10);
      expect(result.properties.name).toBe('Paracetamol');
      expect(result.properties.sourceVersion).toBe(2);
      expect(result.properties.syncedAt).toBeDefined();
    });
  });

  describe('projectContainsRelationship', () => {
    it('should project a CONTAINS relationship correctly', () => {
      const result = service.projectContainsRelationship(1, 10, 3, '500mg');

      expect(result.type).toBe('CONTAINS');
      expect(result.from).toEqual({ label: 'Medicine', id: 1 });
      expect(result.to).toEqual({ label: 'ActiveIngredient', id: 10 });
      expect(result.properties.strength).toBe('500mg');
      expect(result.properties.sourceVersion).toBe(3);
      expect(result.properties.syncedAt).toBeDefined();
    });
  });

  describe('projectInteractsWithRelationship', () => {
    it('should project an INTERACTS_WITH relationship correctly', () => {
      const result = service.projectInteractsWithRelationship(
        1,
        2,
        'SEVERE',
        4,
      );

      expect(result.type).toBe('INTERACTS_WITH');
      expect(result.from).toEqual({ label: 'Medicine', id: 1 });
      expect(result.to).toEqual({ label: 'Medicine', id: 2 });
      expect(result.properties.severity).toBe('SEVERE');
      expect(result.properties.sourceVersion).toBe(4);
      expect(result.properties.syncedAt).toBeDefined();
    });
  });
});
