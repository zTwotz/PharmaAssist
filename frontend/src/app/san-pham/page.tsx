import { supabase } from '@/lib/supabase';
import { FilterSidebar } from '@/components/product/FilterSidebar';
import { ProductGrid } from '@/components/product/ProductGrid';
import { buildCategoryTree, getCategoryAndDescendantIds, findCategoryNodeBySlug } from '@/lib/utils/category';
import Link from 'next/link';

export const revalidate = 60; // Cache page for 60 seconds

export default async function ProductListingPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const categorySlug = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const brandCodes = typeof searchParams.brand === 'string' 
    ? [searchParams.brand] 
    : Array.isArray(searchParams.brand) ? searchParams.brand : [];
  
  const minPrice = typeof searchParams.minPrice === 'string' ? parseInt(searchParams.minPrice) : 0;
  const maxPrice = typeof searchParams.maxPrice === 'string' ? parseInt(searchParams.maxPrice) : 5000000;
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const limit = 24;
  const offset = (page - 1) * limit;

  // 1. Fetch Categories for Sidebar Tree
  const { data: rawCategories } = await supabase
    .from('product_categories')
    .select('id, parent_id, code, name, slug')
    .order('sort_order', { ascending: true });

  const categoryTree = buildCategoryTree(rawCategories || []);
  let descendantIds: number[] = [];
  
  if (categorySlug) {
    const selectedNode = findCategoryNodeBySlug(categoryTree, categorySlug);
    if (selectedNode) {
      descendantIds = getCategoryAndDescendantIds(selectedNode);
    }
  }

  // 2. Fetch Brands for Sidebar
  const { data: brands } = await supabase
    .from('brands')
    .select('code, name, id')
    .order('name', { ascending: true });

  // 3. Fetch Products based on filters
  let query = supabase
    .from('products')
    .select(`
      id, name, slug, image_url,
      product_prices!inner (price, original_price, unit_name)
    `, { count: 'exact' })
    .gte('product_prices.price', minPrice)
    .lte('product_prices.price', maxPrice);

  if (descendantIds.length > 0) {
    query = query.in('category_id', descendantIds);
  }

  if (brandCodes.length > 0 && brands) {
    const selectedBrandIds = brands
      .filter(b => brandCodes.includes(b.code))
      .map(b => b.id);
    if (selectedBrandIds.length > 0) {
      query = query.in('brand_id', selectedBrandIds);
    }
  }

  // Pagination
  query = query.range(offset, offset + limit - 1).order('created_at', { ascending: false });

  const { data: products, count } = await query;
  
  const totalCount = count || 0;
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-[#024ad8] transition-colors">Trang chủ</Link>
          <span className="mx-2 text-gray-300">/</span>
          <span className="text-gray-900 font-medium">Sản phẩm</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-[280px] shrink-0">
            <FilterSidebar categoryTree={categoryTree} brands={brands || []} />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="mb-6 flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <h1 className="text-xl font-bold text-gray-900">
                {categorySlug ? rawCategories?.find(c => c.slug === categorySlug)?.name : 'Tất cả sản phẩm'}
              </h1>
              <div className="text-sm text-gray-500">
                Hiển thị {products?.length || 0} trên {totalCount} kết quả
              </div>
            </div>
            
            <ProductGrid 
              products={products || []} 
              totalCount={totalCount}
              currentPage={page}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
