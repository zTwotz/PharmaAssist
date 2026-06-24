import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    include: {
      variants: {
        include: {
          batches: true,
          inventories: true,
        }
      }
    }
  });

  for (const product of products) {
    for (const variant of product.variants) {
      const totalBatches = variant.batches.reduce((sum: number, b: any) => sum + b.currentQuantity, 0);
      const totalInventories = variant.inventories.reduce((sum: number, i: any) => sum + i.quantity, 0);
      console.log(`Product: ${product.name} (Variant: ${variant.sku}) | Batches qty: ${totalBatches} | Inventories qty: ${totalInventories}`);
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
