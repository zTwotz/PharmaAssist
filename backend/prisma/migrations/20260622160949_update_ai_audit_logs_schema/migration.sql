/*
  Warnings:

  - You are about to drop the column `provider` on the `ai_audit_logs` table. All the data in the column will be lost.
  - Added the required column `provider_requested` to the `ai_audit_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider_used` to the `ai_audit_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ai_audit_logs" DROP COLUMN "provider",
ADD COLUMN     "fallback_reason" TEXT,
ADD COLUMN     "latency_ms" INTEGER,
ADD COLUMN     "model" TEXT,
ADD COLUMN     "prompt_version" TEXT,
ADD COLUMN     "provider_requested" TEXT NOT NULL,
ADD COLUMN     "provider_used" TEXT NOT NULL,
ADD COLUMN     "request_id" TEXT,
ALTER COLUMN "request_summary" DROP NOT NULL,
ALTER COLUMN "response_summary" DROP NOT NULL,
ALTER COLUMN "guardrail_status" DROP NOT NULL;
