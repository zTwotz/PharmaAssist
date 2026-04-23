export interface FefoAllocationItem {
  productVariantId: number;
  requiredQuantity: number;
}

export interface AllocatedBatch {
  batchId: number;
  quantity: number;
}

export interface FefoAllocationResult {
  productVariantId: number;
  isFulfilled: boolean;
  allocations: AllocatedBatch[];
  shortage: number;
}
