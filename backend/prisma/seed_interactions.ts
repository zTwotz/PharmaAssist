import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env['DATABASE_URL'] });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Bắt đầu seed dữ liệu Cảnh báo tương tác thuốc thực tế...');

  // Helper function to find active ingredient by keyword exact/partial
  const findIngredient = async (keyword: string) => {
    const list = await prisma.activeIngredient.findMany({
      where: {
        normalizedName: {
          contains: keyword.toLowerCase(),
        },
      },
      take: 1
    });
    return list[0];
  };

  // 1. Canxi + Sắt (Giảm hấp thu)
  const canxi = await findIngredient('canxi') || await findIngredient('calcium');
  const sat = await findIngredient('sắt') || await findIngredient('iron');

  if (canxi && sat && canxi.id !== sat.id) {
    await prisma.drugInteractionRule.upsert({
      where: { code: 'INT-CA-FE' },
      update: {},
      create: {
        code: 'INT-CA-FE',
        activeIngredientAId: canxi.id,
        activeIngredientBId: sat.id,
        severity: 'MODERATE',
        description: 'Canxi làm giảm đáng kể sự hấp thu của Sắt (Iron) khi dùng chung. Sự cạnh tranh hấp thu tại ruột làm giảm hiệu quả điều trị thiếu máu hoặc bổ sung sắt.',
        recommendation: 'Khuyên bệnh nhân uống hai loại thuốc/thực phẩm bảo vệ sức khỏe này cách xa nhau ít nhất 2 giờ. Uống Sắt lúc đói (hoặc cùng Vitamin C) và Canxi sau ăn.',
      },
    });
    console.log(`✅ Đã seed tương tác: ${canxi.name} + ${sat.name}`);
  }

  // 2. Kẽm + Canxi / Sắt (Cạnh tranh hấp thu)
  const kem = await findIngredient('kẽm') || await findIngredient('zinc');
  if (kem && sat && kem.id !== sat.id) {
    await prisma.drugInteractionRule.upsert({
      where: { code: 'INT-ZN-FE' },
      update: {},
      create: {
        code: 'INT-ZN-FE',
        activeIngredientAId: kem.id,
        activeIngredientBId: sat.id,
        severity: 'LOW',
        description: 'Bổ sung Sắt liều cao (>25mg) có thể làm giảm hấp thu Kẽm (Zinc) do cạnh tranh kênh vận chuyển tại niêm mạc ruột.',
        recommendation: 'Nên uống cách xa nhau từ 2-3 giờ, đặc biệt nếu dùng liều cao, để tối ưu hóa sự hấp thu của cả hai khoáng chất.',
      },
    });
    console.log(`✅ Đã seed tương tác: ${kem.name} + ${sat.name}`);
  }

  // 3. Sắt + Vitamin C (Tương tác có lợi - tăng hấp thu)
  const vitaminC = await findIngredient('vitamin c') || await findIngredient('ascorbic acid');
  if (sat && vitaminC && sat.id !== vitaminC.id) {
    await prisma.drugInteractionRule.upsert({
      where: { code: 'INT-FE-VITC' },
      update: {},
      create: {
        code: 'INT-FE-VITC',
        activeIngredientAId: sat.id,
        activeIngredientBId: vitaminC.id,
        severity: 'INFO',
        description: 'TƯƠNG TÁC CÓ LỢI: Vitamin C giúp chuyển hóa ion Sắt thành dạng dễ hấp thu hơn ở đường ruột, tăng cường hiệu quả bổ sung Sắt.',
        recommendation: 'Khuyên bệnh nhân nên uống Sắt cùng với Vitamin C (hoặc nước cam, chanh) để đạt hiệu quả hấp thu tốt nhất.',
      },
    });
    console.log(`✅ Đã seed tương tác: ${sat.name} + ${vitaminC.name}`);
  }

  console.log('🎉 Hoàn tất seed dữ liệu tương tác thuốc!');
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
