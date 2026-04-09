-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "amount_tendered" DECIMAL(12,2),
ADD COLUMN     "change_amount" DECIMAL(12,2),
ADD COLUMN     "transaction_reference" TEXT;
