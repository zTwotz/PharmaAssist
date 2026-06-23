import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const users = await prisma.user.count();
  const products = await prisma.product.count();
  console.log(`Users count: ${users}`);
  console.log(`Products count: ${products}`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
