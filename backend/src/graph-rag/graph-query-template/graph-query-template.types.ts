export enum AllowlistedQueryType {
  MEDICINE_CONTAINS_ACTIVE_INGREDIENT = 'MEDICINE_CONTAINS_ACTIVE_INGREDIENT',
  ACTIVE_INGREDIENT_INTERACTS_WITH = 'ACTIVE_INGREDIENT_INTERACTS_WITH',
}

export interface GraphQueryTemplateResult {
  query: string;
  params: Record<string, any>;
}
