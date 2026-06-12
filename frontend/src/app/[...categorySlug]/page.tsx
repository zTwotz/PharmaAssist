import React from 'react';
import { supabase } from '@/lib/supabase';
import { FilterSidebar } from '@/components/product/FilterSidebar';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SubCategoryCards } from '@/components/product/SubCategoryCards';
import { buildCategoryTree, getCategoryAndDescendantIds, findCategoryNodeBySlug } from '@/lib/utils/category';
import Link from 'next/link';

export const revalidate = 60; // Cache page for 60 seconds

export default async function DynamicProductListingPage(props: {
  params: Promise<{ categorySlug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const slugArray = params.categorySlug || [];
  const activeSlug = slugArray.length > 0 ? slugArray[slugArray.length - 1] : undefined;

  const brandCodes = typeof searchParams.brand === 'string' 
    ? [searchParams.brand] 
    : Array.isArray(searchParams.brand) ? searchParams.brand : [];
  
  const minPrice = typeof searchParams.minPrice === 'string' ? parseInt(searchParams.minPrice) : 0;
  const maxPrice = typeof searchParams.maxPrice === 'string' ? parseInt(searchParams.maxPrice) : 5000000;
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : undefined;
  
  const limit = 12;
  const offset = 0;

  // 1. Fetch Categories
  const { data: rawCategories } = await supabase
    .from('product_categories')
    .select('id, parent_id, code, name, slug')
    .order('sort_order', { ascending: true });

  const categoryTree = buildCategoryTree(rawCategories || []);
  let descendantIds: number[] = [];
  let subCategories: any[] = [];
  let categoryName = 'Tất cả sản phẩm';
  let activeNodeSlug: string | undefined;
  
  if (activeSlug) {
    let selectedNode = findCategoryNodeBySlug(categoryTree, activeSlug);
    // Fallback to parent slug if child (Level 3) is not in DB
    if (!selectedNode && slugArray.length > 1) {
      selectedNode = findCategoryNodeBySlug(categoryTree, slugArray[slugArray.length - 2]);
    }
    
    if (selectedNode) {
      descendantIds = getCategoryAndDescendantIds(selectedNode);
      categoryName = selectedNode.name;
      subCategories = selectedNode.children || [];
      activeNodeSlug = selectedNode.slug;
    }
  }

  // 2. Fetch Brands
  const { data: brands } = await supabase
    .from('brands')
    .select('code, name, id')
    .order('name', { ascending: true });

  // 3. Fetch Products
  // FIX: Don't use !inner on product_prices unless we are actually filtering by price strictly.
  // Using Left Join (without !inner) ensures we get products even if they don't have a price row yet.
  const isFilteringPrice = minPrice > 0 || maxPrice < 5000000;
  
  let query = supabase
    .from('products')
    .select(`
      id, name, slug,
      product_variants${isFilteringPrice ? '!inner' : ''} (selling_price, variant_name),
      product_images (image_url, is_primary)
    `, { count: 'exact' });

  if (isFilteringPrice) {
    query = query.gte('product_variants.selling_price', minPrice).lte('product_variants.selling_price', maxPrice);
  }

  if (descendantIds.length > 0) {
    query = query.in('category_id', descendantIds);
  }

  let selectedBrandIds: number[] = [];
  if (brandCodes.length > 0 && brands) {
    selectedBrandIds = brands
      .filter(b => brandCodes.includes(b.code))
      .map(b => b.id);
    if (selectedBrandIds.length > 0) {
      query = query.in('brand_id', selectedBrandIds);
    }
  }

  // Handle Sort
  // Currently sorting by joined table column 'selling_price' can cause PostgREST errors if not mapped properly
  // so we'll default to created_at
  query = query.order('created_at', { ascending: false });

  query = query.range(offset, offset + limit - 1);

  const { data: products, count, error } = await query;
  
  if (error) {
    console.error("Error fetching products:", JSON.stringify(error, null, 2));
  }

  const totalCount = count || 0;

  // Breadcrumb
  const breadcrumbs = [];
  if (slugArray.length > 0) {
    let currentPath = '';
    for (const s of slugArray) {
      currentPath += `/${s}`;
      const node = findCategoryNodeBySlug(categoryTree, s);
      breadcrumbs.push({ name: node?.name || s, href: currentPath });
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-[#024ad8] transition-colors">Trang chủ</Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.href}>
              <span className="mx-2 text-gray-300">/</span>
              <Link href={crumb.href} className={idx === breadcrumbs.length - 1 ? "text-gray-900 font-medium" : "hover:text-[#024ad8]"}>
                {crumb.name}
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-8">
        
        {subCategories.length > 0 && (
          <SubCategoryCards 
            subCategories={subCategories} 
            parentName={categoryName} 
            parentPath={`/${slugArray.join('/')}`} 
          />
        )}
        
        {!subCategories.length && activeSlug && (
           <h2 className="text-3xl font-bold text-gray-900 mb-6">{categoryName}</h2>
        )}
        
        {!activeSlug && (
           <h2 className="text-3xl font-bold text-gray-900 mb-6">Tất cả sản phẩm</h2>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[280px] shrink-0">
            <FilterSidebar categoryTree={categoryTree} brands={brands || []} activeNodeSlug={activeNodeSlug} />
          </div>

          <div className="flex-1 min-w-0">
            <ProductGrid 
              initialProducts={products || []} 
              totalCount={totalCount}
              categoryIds={descendantIds}
              brandIds={selectedBrandIds}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
