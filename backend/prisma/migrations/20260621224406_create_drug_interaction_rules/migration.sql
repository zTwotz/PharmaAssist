/*
  Warnings:

  - You are about to drop the column `medicine_a_id` on the `drug_interactions` table. All the data in the column will be lost.
  - You are about to drop the column `medicine_b_id` on the `drug_interactions` table. All the data in the column will be lost.
  - Added the required column `active_ingredient_a_id` to the `drug_interactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `active_ingredient_b_id` to the `drug_interactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "drug_interactions" DROP CONSTRAINT "drug_interactions_medicine_a_id_fkey";

-- DropForeignKey
ALTER TABLE "drug_interactions" DROP CONSTRAINT "drug_interactions_medicine_b_id_fkey";

-- AlterTable
ALTER TABLE "drug_interactions" DROP COLUMN "medicine_a_id",
DROP COLUMN "medicine_b_id",
ADD COLUMN     "active_ingredient_a_id" INTEGER NOT NULL,
ADD COLUMN     "active_ingredient_b_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "drug_interactions" ADD CONSTRAINT "drug_interactions_active_ingredient_a_id_fkey" FOREIGN KEY ("active_ingredient_a_id") REFERENCES "active_ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drug_interactions" ADD CONSTRAINT "drug_interactions_active_ingredient_b_id_fkey" FOREIGN KEY ("active_ingredient_b_id") REFERENCES "active_ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
