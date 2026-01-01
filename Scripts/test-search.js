const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSearch() {
  const term = 'Paracetamol';
  console.log(`Searching for "${term}" using variant_name ilike...`);

  const { data, error } = await supabase
    .from('product_variants')
    .select(`
      id,
      sku,
      variant_name,
      selling_price,
      unit:medicine_units(name),
      product:products(
        id,
        name,
        medicines(id)
      ),
      inventories(quantity)
    `)
    .ilike('variant_name', `%${term}%`)
    .limit(10);

  if (error) {
    console.error('Search error:', error);
  } else {
    console.log('Results length:', data?.length);
    console.log('Results sample:', JSON.stringify(data, null, 2));
  }
}

testSearch();
