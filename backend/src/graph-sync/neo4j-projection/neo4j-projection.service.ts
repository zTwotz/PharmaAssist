import { Injectable } from '@nestjs/common';

@Injectable()
export class Neo4jProjectionService {
  /**
   * Projects a Medicine record to a Neo4j node structure.
   */
  projectMedicineNode(medicine: any, sourceVersion: number) {
    return {
      label: 'Medicine',
      properties: {
        id: medicine.id,
        name: medicine.product?.name || '',
        registrationNumber: medicine.registrationNumber || '',
        dosageForm: medicine.dosageForm || '',
        sourceVersion,
        syncedAt: new Date().toISOString(),
      },
    };
  }

  /**
   * Projects an ActiveIngredient record to a Neo4j node structure.
   */
  projectActiveIngredientNode(ingredient: any, sourceVersion: number) {
    return {
      label: 'ActiveIngredient',
      properties: {
        id: ingredient.id,
        name: ingredient.name,
        sourceVersion,
        syncedAt: new Date().toISOString(),
      },
    };
  }

  /**
   * Projects a CONTAINS relationship (Medicine -> ActiveIngredient).
   */
  projectContainsRelationship(
    medicineId: number,
    ingredientId: number,
    sourceVersion: number,
    strength?: string,
  ) {
    return {
      type: 'CONTAINS',
      from: { label: 'Medicine', id: medicineId },
      to: { label: 'ActiveIngredient', id: ingredientId },
      properties: {
        strength: strength || '',
        sourceVersion,
        syncedAt: new Date().toISOString(),
      },
    };
  }

  /**
   * Projects an INTERACTS_WITH relationship (Medicine -> Medicine).
   */
  projectInteractsWithRelationship(
    medicineAId: number,
    medicineBId: number,
    severity: string,
    sourceVersion: number,
  ) {
    return {
      type: 'INTERACTS_WITH',
      from: { label: 'Medicine', id: medicineAId },
      to: { label: 'Medicine', id: medicineBId },
      properties: {
        severity,
        sourceVersion,
        syncedAt: new Date().toISOString(),
      },
    };
  }
}
