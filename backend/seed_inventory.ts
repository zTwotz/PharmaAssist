import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial data for inventory...');

  let store = await prisma.store.findFirst();
  if (!store) {
    store = await prisma.store.create({
      data: { code: 'ST001', name: 'Cửa Hàng Chi Nhánh 1', address: '456 Đường XYZ, Quận 3, TP.HCM', status: 'ACTIVE' }
    });
  }

  let warehouse = await prisma.warehouse.findFirst();
  if (!warehouse) {
    warehouse = await prisma.warehouse.create({
      data: { storeId: store.id, code: 'WH001', name: 'Kho Trung Tâm', address: '123 Đường ABC, Quận 1, TP.HCM', status: 'ACTIVE' }
    });
  }

  let supplier = await prisma.supplier.findFirst();
  if (!supplier) {
    supplier = await prisma.supplier.create({
      data: { code: 'SUP001', name: 'Nhà Cung Cấp Dược Phẩm Việt', taxCode: '0101234567', address: '789 Đường LMN, Hà Nội', status: 'ACTIVE' }
    });
  }

  const medicines = await prisma.medicine.findMany({
    take: 50,
    include: { product: { include: { variants: true } } }
  });

  const stockImport = await prisma.stockImport.create({
    data: {
      code: `IMP-${Date.now()}`,
      supplierId: supplier.id,
      warehouseId: warehouse.id,
      totalAmount: 0,
      status: 'COMPLETED',
      confirmedAt: new Date(),
      createdBy: 'System Seed',
      notes: 'Initial stock import for testing'
    }
  });

  let totalAmount = 0;

  for (const med of medicines) {
    const variant = med.product?.variants?.[0];
    if (!variant) continue;

    const qty = Math.floor(Math.random() * 50) + 10;
    const price = Math.floor(Math.random() * 50000) + 5000;
    const batchNumber = `BATCH-${Date.now()}-${med.id}`;
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 2);
    const mfgDate = new Date();
    mfgDate.setMonth(mfgDate.getMonth() - 1);

    totalAmount += qty * price;

    await prisma.stockImportDetail.create({
      data: {
        stockImportId: stockImport.id,
        medicineId: med.id,
        batchNumber: batchNumber,
        quantity: qty,
        importPrice: price,
        expiryDate: expiryDate,
        lineTotal: qty * price,
      }
    });

    await prisma.medicineBatch.create({
      data: {
        medicineId: med.id,
        warehouseId: warehouse.id,
        batchNumber: batchNumber,
        quantity: qty,
        expiryDate: expiryDate,
        importPrice: price,
      }
    });

    await prisma.stockBatch.create({
      data: {
        productVariantId: variant.id,
        warehouseId: warehouse.id,
        batchNumber: batchNumber,
        quantity: qty,
        manufacturingDate: mfgDate,
        expiryDate: expiryDate,
        importPrice: price,
      }
    });

    const inventory = await prisma.inventory.findFirst({
      where: { productVariantId: variant.id, warehouseId: warehouse.id, storeId: store.id }
    });

    if (inventory) {
      await prisma.inventory.update({
        where: { id: inventory.id },
        data: { quantity: inventory.quantity + qty }
      });
    } else {
      await prisma.inventory.create({
        data: {
          productVariantId: variant.id,
          warehouseId: warehouse.id,
          storeId: store.id,
          quantity: qty,
          reservedQuantity: 0,
          minQuantity: 10,
        }
      });
    }
  }

  await prisma.stockImport.update({
    where: { id: stockImport.id },
    data: { totalAmount }
  });

  console.log(`Successfully seeded inventory for ${medicines.length} medicines!`);
}

main().catch(e => console.error(e)).finally(async () => await prisma.$disconnect());
