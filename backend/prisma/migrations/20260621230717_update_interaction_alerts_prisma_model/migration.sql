-- AlterTable
ALTER TABLE "interaction_alerts" ADD COLUMN     "acknowledged_at" TIMESTAMP(3),
ADD COLUMN     "acknowledged_by" UUID,
ADD COLUMN     "consultation_note" TEXT,
ADD COLUMN     "display_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "last_displayed_at" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "interaction_alerts" ADD CONSTRAINT "interaction_alerts_acknowledged_by_fkey" FOREIGN KEY ("acknowledged_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
