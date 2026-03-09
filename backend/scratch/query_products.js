const { Client } = require('pg');

async function main() {
  const client = new Client({
    connectionString: "postgresql://postgres.qzkfadxzqkqinreeivqt:Twot2k5Supabase@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres",
  });
  await client.connect();
  try {
    const res = await client.query(`
      SELECT id, code, name, slug 
      FROM products
      WHERE name LIKE '%Ensure Gold StrengthPro%'
    `);
    console.log(JSON.stringify(res.rows, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

main();
