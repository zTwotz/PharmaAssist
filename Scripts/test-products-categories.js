const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  // 1. Fetch total products count
  const { count: totalCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });

  console.log('Total products count:', totalCount);

  // 2. Fetch a few products and print their category_id
  const { data: sampleProducts } = await supabase
    .from('products')
    .select('id, name, category_id')
    .limit(5);

  console.log('Sample products with category_id:', sampleProducts);

  // 3. Fetch count of products grouped by category_id
  const { data: categoryCounts } = await supabase
    .from('products')
    .select('category_id');
  
  const counts = {};
  categoryCounts.forEach(p => {
    counts[p.category_id] = (counts[p.category_id] || 0) + 1;
  });

  console.log('Products per category_id (sample):', Object.entries(counts).slice(0, 10));
}

check();
