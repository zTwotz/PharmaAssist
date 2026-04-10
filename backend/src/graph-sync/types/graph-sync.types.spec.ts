import { GraphSyncStatus, GraphSyncAttemptStatus, GraphSyncEventType, MAX_GRAPH_SYNC_RETRIES } from './graph-sync.types';

describe('Graph Sync Types and Enums', () => {
  it('should export GraphSyncStatus correctly', () => {
    expect(GraphSyncStatus).toBeDefined();
    expect(GraphSyncStatus.PENDING).toBe('PENDING');
    expect(GraphSyncStatus.PROCESSING).toBe('PROCESSING');
    expect(GraphSyncStatus.SUCCEEDED).toBe('SUCCEEDED');
    expect(GraphSyncStatus.FAILED).toBe('FAILED');
    expect(GraphSyncStatus.RETRY_SCHEDULED).toBe('RETRY_SCHEDULED');
    expect(GraphSyncStatus.SKIPPED).toBe('SKIPPED');
  });

  it('should export GraphSyncAttemptStatus correctly', () => {
    expect(GraphSyncAttemptStatus).toBeDefined();
    expect(GraphSyncAttemptStatus.SUCCESS).toBe('SUCCESS');
    expect(GraphSyncAttemptStatus.FAILED).toBe('FAILED');
  });

  it('should export GraphSyncEventType correctly', () => {
    expect(GraphSyncEventType).toBeDefined();
    expect(GraphSyncEventType.MEDICINE_UPSERT).toBe('MEDICINE_UPSERT');
    expect(GraphSyncEventType.MEDICINE_DEACTIVATE).toBe('MEDICINE_DEACTIVATE');
    expect(GraphSyncEventType.ACTIVE_INGREDIENT_UPSERT).toBe('ACTIVE_INGREDIENT_UPSERT');
  });

  it('should export MAX_GRAPH_SYNC_RETRIES correctly', () => {
    expect(MAX_GRAPH_SYNC_RETRIES).toBe(3);
  });
});
