import { GraphSyncStatus, GraphSyncAttemptStatus, GraphSyncEventType } from '@prisma/client';

export { GraphSyncStatus, GraphSyncAttemptStatus, GraphSyncEventType };

export interface GraphSyncEventPayload {
  entityType: string;
  entityId: string;
  eventType: GraphSyncEventType;
  sourceVersion: number;
  data?: any; // Additional contextual data if needed
}

export const MAX_GRAPH_SYNC_RETRIES = 3;
