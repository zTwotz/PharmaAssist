import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env['DATABASE_URL'] });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Bắt đầu seed dữ liệu Đơn thuốc mẫu (Combo)...');

  // Lấy ngẫu nhiên vài thuốc đang có
  const allMedicines = await prisma.medicine.findMany({
    where: { status: 'ACTIVE' },
    take: 10
  });

  if (allMedicines.length < 5) {
    console.log('⚠️ Không đủ thuốc trong CSDL để tạo combo. Hãy seed dữ liệu thuốc trước!');
    return;
  }

  const combos = [
    {
      code: 'COMBO-CAM-CUM',
      name: 'Đơn thuốc Cảm cúm (Người lớn)',
      description: 'Bao gồm giảm đau, hạ sốt, giảm ho và viên ngậm.',
      medicines: [allMedicines[0], allMedicines[1], allMedicines[2]]
    },
    {
      code: 'COMBO-DA-DAY',
      name: 'Đơn thuốc Đau dạ dày',
      description: 'Bao gồm kháng axit, bọc niêm mạc và giảm tiết.',
      medicines: [allMedicines[3], allMedicines[4]]
    },
    {
      code: 'COMBO-TANG-DE-KHANG',
      name: 'Combo Tăng đề kháng',
      description: 'Vitamin tổng hợp, Kẽm và Vitamin C.',
      medicines: [allMedicines[5], allMedicines[6], allMedicines[7]]
    }
  ];

  for (const combo of combos) {
    // Upsert the group
    const group = await prisma.medicineGroup.upsert({
      where: { code: combo.code },
      update: {
        name: combo.name,
        description: combo.description,
        status: 'ACTIVE'
      },
      create: {
        code: combo.code,
        name: combo.name,
        description: combo.description,
        status: 'ACTIVE'
      }
    });

    // Clear existing members
    await prisma.medicineGroupMember.deleteMany({
      where: { medicineGroupId: group.id }
    });

    // Add new members
    for (const med of combo.medicines) {
      if (med) {
        await prisma.medicineGroupMember.create({
          data: {
            medicineGroupId: group.id,
            medicineId: med.id
          }
        });
      }
    }

    console.log(`✅ Đã seed combo: ${combo.name} (${combo.medicines.length} thuốc)`);
  }

  console.log('🎉 Hoàn tất seed dữ liệu Combo!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
