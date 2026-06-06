'use server';

import { supabase } from '@/lib/supabase';

export async function fetchMoreProducts(params: {
  categoryIds?: number[];
  brandIds?: number[];
  minPrice: number;
  maxPrice: number;
  limit: number;
  offset: number;
  sort?: string;
}) {
  const { categoryIds, brandIds, minPrice, maxPrice, limit, offset, sort } = params;

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

  if (categoryIds && categoryIds.length > 0) {
    query = query.in('category_id', categoryIds);
  }

  if (brandIds && brandIds.length > 0) {
    query = query.in('brand_id', brandIds);
  }

  // Handle Sort
  if (sort === 'price_asc') {
    query = query.order('selling_price', { referencedTable: 'product_variants', ascending: true });
  } else if (sort === 'price_desc') {
    query = query.order('selling_price', { referencedTable: 'product_variants', ascending: false });
  } else {
    // default (bán chạy or newest)
    query = query.order('created_at', { ascending: false });
  }

  // Pagination
  query = query.range(offset, offset + limit - 1);

  const { data: products, count, error } = await query;
  
  if (error) {
    console.error("Error fetching more products:", error);
    throw new Error('Failed to fetch products');
  }

  return {
    products: products || [],
    totalCount: count || 0
  };
}
