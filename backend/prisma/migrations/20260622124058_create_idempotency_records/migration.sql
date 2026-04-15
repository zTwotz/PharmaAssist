-- CreateEnum
CREATE TYPE "IdempotencyStatus" AS ENUM ('PROCESSING', 'SUCCEEDED', 'FAILED');

-- CreateTable
CREATE TABLE "idempotency_records" (
    "id" UUID NOT NULL,
    "idempotency_key" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "operation" TEXT NOT NULL,
    "request_hash" TEXT NOT NULL,
    "status" "IdempotencyStatus" NOT NULL,
    "resource_type" TEXT,
    "resource_id" TEXT,
    "response_summary" JSONB,
    "error_code" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "idempotency_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "idempotency_records_user_id_operation_idempotency_key_key" ON "idempotency_records"("user_id", "operation", "idempotency_key");

-- AddForeignKey
ALTER TABLE "idempotency_records" ADD CONSTRAINT "idempotency_records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
