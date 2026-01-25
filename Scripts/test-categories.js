const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  const { data, error } = await supabase
    .from('product_categories')
    .select('id, name, slug, parent_id');

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Categories count:', data.length);
    console.log('Sample Categories with slug "than-kinh-nao":', data.filter(c => c.slug.includes('than-kinh-nao')));
    console.log('All level 1 categories (parent_id is null):', data.filter(c => c.parent_id === null));
  }
}

check();
