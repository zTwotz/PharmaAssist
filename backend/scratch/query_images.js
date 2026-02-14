const { Client } = require('pg');

async function main() {
  const client = new Client({
    connectionString: "postgresql://postgres.qzkfadxzqkqinreeivqt:Twot2k5Supabase@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres",
  });
  await client.connect();
  try {
    const res = await client.query(`
      SELECT pi.id, pi.image_url, pi.is_primary, pi.sort_order 
      FROM product_images pi
      JOIN products p ON p.id = pi.product_id
      WHERE p.slug LIKE '%ensure-gold-strengthpro-huong-vani-237ml%'
      ORDER BY pi.sort_order ASC
    `);
    console.log(JSON.stringify(res.rows, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

main();
