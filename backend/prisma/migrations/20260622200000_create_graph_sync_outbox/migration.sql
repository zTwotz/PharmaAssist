-- CreateEnum
CREATE TYPE "GraphSyncStatus" AS ENUM ('PENDING', 'PROCESSING', 'SUCCEEDED', 'RETRY_SCHEDULED', 'FAILED', 'SKIPPED');

-- CreateEnum
CREATE TYPE "GraphSyncAttemptStatus" AS ENUM ('SUCCESS', 'FAILED');

-- CreateEnum
CREATE TYPE "GraphSyncEventType" AS ENUM ('MEDICINE_UPSERT', 'MEDICINE_DEACTIVATE', 'ACTIVE_INGREDIENT_UPSERT', 'ACTIVE_INGREDIENT_DEACTIVATE', 'MEDICINE_INGREDIENT_MAPPING_UPSERT', 'MEDICINE_INGREDIENT_MAPPING_DEACTIVATE', 'DRUG_INTERACTION_UPSERT', 'DRUG_INTERACTION_DEACTIVATE', 'GRAPH_REBUILD_REQUESTED');

-- AlterTable
ALTER TABLE "graph_sync_outbox" DROP CONSTRAINT "graph_sync_outbox_pkey",
DROP COLUMN "action",
DROP COLUMN "entity_id",
DROP COLUMN "entity_type",
DROP COLUMN "error",
ADD COLUMN     "aggregate_id" TEXT NOT NULL,
ADD COLUMN     "aggregate_type" TEXT NOT NULL,
ADD COLUMN     "event_type" "GraphSyncEventType" NOT NULL,
ADD COLUMN     "last_error_code" TEXT,
ADD COLUMN     "last_error_message" TEXT,
ADD COLUMN     "next_retry_at" TIMESTAMP(3),
ADD COLUMN     "processed_at" TIMESTAMP(3),
ADD COLUMN     "retry_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "source_version" BIGINT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "GraphSyncStatus" NOT NULL DEFAULT 'PENDING',
ADD CONSTRAINT "graph_sync_outbox_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "graph_sync_attempts" (
    "id" TEXT NOT NULL,
    "outbox_id" TEXT NOT NULL,
    "attempt_number" INTEGER NOT NULL,
    "status" "GraphSyncAttemptStatus" NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "finished_at" TIMESTAMP(3),
    "duration_ms" INTEGER,
    "error_code" TEXT,
    "error_message" TEXT,
    "neo4j_operation_summary" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "graph_sync_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "graph_sync_attempts_outbox_id_idx" ON "graph_sync_attempts"("outbox_id");

-- CreateIndex
CREATE INDEX "graph_sync_attempts_status_idx" ON "graph_sync_attempts"("status");

-- CreateIndex
CREATE INDEX "graph_sync_attempts_started_at_idx" ON "graph_sync_attempts"("started_at");

-- CreateIndex
CREATE INDEX "graph_sync_outbox_status_idx" ON "graph_sync_outbox"("status");

-- CreateIndex
CREATE INDEX "graph_sync_outbox_aggregate_type_idx" ON "graph_sync_outbox"("aggregate_type");

-- CreateIndex
CREATE INDEX "graph_sync_outbox_aggregate_id_idx" ON "graph_sync_outbox"("aggregate_id");

-- CreateIndex
CREATE INDEX "graph_sync_outbox_aggregate_type_aggregate_id_source_versio_idx" ON "graph_sync_outbox"("aggregate_type", "aggregate_id", "source_version");

-- CreateIndex
CREATE INDEX "graph_sync_outbox_next_retry_at_idx" ON "graph_sync_outbox"("next_retry_at");

-- CreateIndex
CREATE INDEX "graph_sync_outbox_created_at_idx" ON "graph_sync_outbox"("created_at");

-- AddForeignKey
ALTER TABLE "graph_sync_attempts" ADD CONSTRAINT "graph_sync_attempts_outbox_id_fkey" FOREIGN KEY ("outbox_id") REFERENCES "graph_sync_outbox"("id") ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE graph_sync_outbox ADD CONSTRAINT graph_sync_outbox_retry_count_non_negative CHECK (retry_count >= 0);

ALTER TABLE graph_sync_attempts ADD CONSTRAINT graph_sync_attempts_attempt_number_positive CHECK (attempt_number > 0);
