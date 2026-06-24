import { PrismaClient } from './src/prisma/prisma.service';

const prisma = new PrismaClient();
async function run() {
  const batches = await prisma.medicineBatch.findMany({ take: 5 });
  console.log("Medicine batches:", batches);
}
run();
