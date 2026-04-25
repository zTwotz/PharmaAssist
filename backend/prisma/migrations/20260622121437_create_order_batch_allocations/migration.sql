-- CreateTable
CREATE TABLE "order_batch_allocations" (
    "id" SERIAL NOT NULL,
    "order_detail_id" INTEGER NOT NULL,
    "medicine_batch_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_batch_allocations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order_batch_allocations" ADD CONSTRAINT "order_batch_allocations_order_detail_id_fkey" FOREIGN KEY ("order_detail_id") REFERENCES "order_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_batch_allocations" ADD CONSTRAINT "order_batch_allocations_medicine_batch_id_fkey" FOREIGN KEY ("medicine_batch_id") REFERENCES "medicine_batches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
