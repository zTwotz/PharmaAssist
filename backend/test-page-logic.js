const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function buildCategoryTree(categories) {
  const categoryMap = new Map();
  const tree = [];

  categories.forEach((cat) => {
    categoryMap.set(cat.id, {
      id: cat.id,
      parent_id: cat.parent_id,
      code: cat.code,
      name: cat.name,
      slug: cat.slug,
      children: [],
    });
  });

  categories.forEach((cat) => {
    const node = categoryMap.get(cat.id);
    if (node) {
      if (cat.parent_id === null) {
        tree.push(node);
      } else {
        const parent = categoryMap.get(cat.parent_id);
        if (parent) {
          parent.children.push(node);
        } else {
          tree.push(node);
        }
      }
    }
  });

  return tree;
}

function getCategoryAndDescendantIds(node) {
  let ids = [node.id];
  if (node.children && node.children.length > 0) {
    node.children.forEach(child => {
      ids = ids.concat(getCategoryAndDescendantIds(child));
    });
  }
  return ids;
}

function findCategoryNodeBySlug(nodes, slug) {
  for (const node of nodes) {
    if (node.slug === slug) return node;
    if (node.children && node.children.length > 0) {
      const found = findCategoryNodeBySlug(node.children, slug);
      if (found) return found;
    }
  }
  return null;
}

async function runTest() {
  const slugArray = ['thuc-pham-chuc-nang', 'than-kinh-nao'];
  const activeSlug = slugArray[slugArray.length - 1];

  const { data: rawCategories } = await supabase
    .from('product_categories')
    .select('id, parent_id, code, name, slug')
    .order('sort_order', { ascending: true });

  const categoryTree = buildCategoryTree(rawCategories || []);
  let descendantIds = [];
  let categoryName = 'Tất cả sản phẩm';
  let selectedNode = findCategoryNodeBySlug(categoryTree, activeSlug);

  console.log('activeSlug:', activeSlug);
  console.log('found selectedNode:', !!selectedNode);
  
  if (selectedNode) {
    descendantIds = getCategoryAndDescendantIds(selectedNode);
    categoryName = selectedNode.name;
    console.log('categoryName:', categoryName);
    console.log('descendantIds:', descendantIds);
  }

  // Let's run the exact query that is in Category Page!
  let query = supabase
    .from('products')
    .select(`
      id, name, slug, category_id
    `, { count: 'exact' });

  if (descendantIds.length > 0) {
    query = query.in('category_id', descendantIds);
  }

  const { data: products, count, error } = await query.limit(5);
  console.log('Count returned:', count);
  console.log('Products:', products);
}

runTest();
