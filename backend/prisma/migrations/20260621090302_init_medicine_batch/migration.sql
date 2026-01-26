/*
  Warnings:

  - You are about to drop the column `product_variant_id` on the `stock_import_details` table. All the data in the column will be lost.
  - You are about to drop the column `imported_by` on the `stock_imports` table. All the data in the column will be lost.
  - Added the required column `medicine_id` to the `stock_import_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `stock_imports` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "stock_import_details" DROP CONSTRAINT "stock_import_details_product_variant_id_fkey";

-- AlterTable
ALTER TABLE "stock_import_details" DROP COLUMN "product_variant_id",
ADD COLUMN     "medicine_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "stock_imports" DROP COLUMN "imported_by",
ADD COLUMN     "confirmed_at" TIMESTAMP(3),
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ALTER COLUMN "status" SET DEFAULT 'DRAFT';

-- CreateTable
CREATE TABLE "medicine_batches" (
    "id" SERIAL NOT NULL,
    "medicine_id" INTEGER NOT NULL,
    "warehouse_id" INTEGER NOT NULL,
    "batch_number" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "expiry_date" TIMESTAMP(3) NOT NULL,
    "import_price" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medicine_batches_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "medicine_batches_medicine_id_idx" ON "medicine_batches"("medicine_id");

-- CreateIndex
CREATE INDEX "medicine_batches_expiry_date_idx" ON "medicine_batches"("expiry_date");

-- CreateIndex
CREATE UNIQUE INDEX "medicine_batches_medicine_id_batch_number_expiry_date_key" ON "medicine_batches"("medicine_id", "batch_number", "expiry_date");

-- AddForeignKey
ALTER TABLE "medicine_batches" ADD CONSTRAINT "medicine_batches_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "medicines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicine_batches" ADD CONSTRAINT "medicine_batches_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_import_details" ADD CONSTRAINT "stock_import_details_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "medicines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
