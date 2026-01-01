const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- PHARMAASSIST DATA SUMMARY ---');
  
  const userCount = await prisma.user.count();
  const profileCount = await prisma.userProfile.count();
  const roleCount = await prisma.role.count();
  const medicineCount = await prisma.medicine.count();
  
  console.log(`Users: ${userCount}`);
  console.log(`UserProfiles: ${profileCount}`);
  console.log(`Roles: ${roleCount}`);
  console.log(`Medicines: ${medicineCount}`);
  
  const users = await prisma.user.findMany({
    include: {
      profile: true,
      roles: { include: { role: true } }
    }
  });
  
  console.log('\n--- USERS ---');
  users.forEach(u => {
    console.log(`ID: ${u.id} | Email: ${u.email} | Roles: ${u.roles.map(r => r.role.name).join(', ')}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
