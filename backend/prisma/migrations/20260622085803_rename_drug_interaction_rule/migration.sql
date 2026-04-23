/*
  Warnings:

  - You are about to drop the `drug_interactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "drug_interactions" DROP CONSTRAINT "drug_interactions_active_ingredient_a_id_fkey";

-- DropForeignKey
ALTER TABLE "drug_interactions" DROP CONSTRAINT "drug_interactions_active_ingredient_b_id_fkey";

-- DropForeignKey
ALTER TABLE "interaction_alerts" DROP CONSTRAINT "interaction_alerts_interaction_id_fkey";

-- DropTable
DROP TABLE "drug_interactions";

-- CreateTable
CREATE TABLE "drug_interaction_rules" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "active_ingredient_a_id" INTEGER NOT NULL,
    "active_ingredient_b_id" INTEGER NOT NULL,
    "severity" TEXT NOT NULL,
    "description" TEXT,
    "recommendation" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "drug_interaction_rules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "drug_interaction_rules_code_key" ON "drug_interaction_rules"("code");

-- AddForeignKey
ALTER TABLE "drug_interaction_rules" ADD CONSTRAINT "drug_interaction_rules_active_ingredient_a_id_fkey" FOREIGN KEY ("active_ingredient_a_id") REFERENCES "active_ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drug_interaction_rules" ADD CONSTRAINT "drug_interaction_rules_active_ingredient_b_id_fkey" FOREIGN KEY ("active_ingredient_b_id") REFERENCES "active_ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interaction_alerts" ADD CONSTRAINT "interaction_alerts_interaction_id_fkey" FOREIGN KEY ("interaction_id") REFERENCES "drug_interaction_rules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
