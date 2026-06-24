import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
  const batches = await prisma.medicineBatch.findMany({ take: 5 });
  console.log(batches);
}
run();
