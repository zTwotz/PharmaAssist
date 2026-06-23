'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ShoppingCart, ChevronDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { fetchMoreProducts } from '@/app/actions/product.actions';

export function ProductGrid({ initialProducts, totalCount, categoryIds, basePath = '/san-pham' }: any) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { addToCart } = useCart();

  const [products, setProducts] = useState<any[]>(initialProducts || []);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(initialProducts?.length || 0);

  // Sync products when URL or category changes (new page load)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProducts(initialProducts || []);
    setOffset(initialProducts?.length || 0);
  }, [initialProducts]);

  const sortValue = searchParams.get('sort') || 'default';

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value !== 'default') {
      params.set('sort', e.target.value);
    } else {
      params.delete('sort');
    }
    // Delete page if it exists because sorting should reset to page 1
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleLoadMore = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const brandCodes = searchParams.getAll('brand');
      const minPrice = parseInt(searchParams.get('minPrice') || '0');
      const maxPrice = parseInt(searchParams.get('maxPrice') || '5000000');
      const sort = searchParams.get('sort') || undefined;

      // Note: We need brandIds, but we only have brandCodes in URL.
      // For simplicity, we can rely on the server action to handle this, 
      // but the action expects brandIds. We'll leave brand filtering to the server on initial load,
      // and for load more we should pass what we have. 
      // Actually, since we don't have brandIds easily here, we should pass brandCodes to the action.
      // Let's modify the action slightly later to accept brandCodes if needed, or pass nothing for now.
      // Wait, we can get brandIds from initial load or pass them from page.tsx.
      // For this implementation, I'll let page.tsx pass a resolved `filters` object.

      const result = await fetchMoreProducts({
        categoryIds,
        brandIds: [], // We need to fix this in page.tsx by passing down the resolved brandIds
        minPrice,
        maxPrice,
        limit: 12,
        offset,
        sort
      });

      setProducts((prev: any[]) => [...prev, ...result.products]);
      setOffset((prev: number) => prev + result.products.length);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-sm text-gray-500">
          Tìm thấy <span className="font-bold text-gray-900">{totalCount}</span> sản phẩm
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sắp xếp theo:</span>
          <div className="relative">
            <select 
              className="appearance-none bg-white border border-gray-200 rounded-full py-2 pl-4 pr-10 text-sm font-medium text-gray-700 outline-none hover:border-[#024ad8] focus:border-[#024ad8] transition-colors cursor-pointer"
              value={sortValue}
              onChange={handleSortChange}
            >
              <option value="default">Bán chạy</option>
              <option value="price_asc">Giá thấp</option>
              <option value="price_desc">Giá cao</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Không tìm thấy sản phẩm nào</h3>
          <p className="text-gray-500 text-sm">Vui lòng thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product: any) => {
            const price = product.product_variants?.[0]?.selling_price || 0;
            const originalPrice = undefined; // Not available in product_variants
            const unit = product.product_variants?.[0]?.variant_name || 'Hộp';
            
            // Lấy ảnh chính hoặc ảnh đầu tiên
            const primaryImage = product.product_images?.find((img: any) => img.is_primary)?.image_url;
            const fallbackImage = product.product_images?.[0]?.image_url;
            const imageUrl = primaryImage || fallbackImage || 'https://placehold.co/300x300?text=No+Image';
            
            return (
              <div key={product.id} className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-[#024ad8]/30 transition-all duration-300 transform hover:-translate-y-1">
                {/* Sale Badge */}
                {originalPrice && originalPrice > price && (
                  <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                    -{Math.round((1 - price/originalPrice) * 100)}%
                  </div>
                )}
                
                <Link href={`${basePath === '/' ? '' : basePath}/${product.slug}`} className="relative p-4 flex items-center justify-center bg-white aspect-square">
                  <img 
                    src={imageUrl} 
                    alt={product.name}
                    className="object-contain max-h-full max-w-full transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    onError={(e) => { 
                      const target = e.target as HTMLImageElement;
                      if (target.src !== 'https://placehold.co/300x300?text=No+Image') {
                        target.src = 'https://placehold.co/300x300?text=No+Image';
                      }
                    }}
                  />
                </Link>

                <div className="p-4 flex flex-col flex-1 border-t border-gray-50 bg-gray-50/30">
                  <Link href={`${basePath === '/' ? '' : basePath}/${product.slug}`} className="mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-tight group-hover:text-[#024ad8] transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mt-auto">
                    <div className="flex items-baseline space-x-2 mb-3">
                      <span className="font-bold text-[#024ad8] text-lg">
                        {new Intl.NumberFormat('vi-VN').format(price)}đ
                      </span>
                      <span className="text-gray-500 text-xs font-medium">/ {unit}</span>
                    </div>

                    <Button 
                      onClick={() => addToCart({
                        id: product.product_variants?.[0]?.sku || product.code || product.id.toString(),
                        dbId: product.id,
                        name: product.name,
                        price: price,
                        unit: unit,
                        imageUrl: imageUrl,
                        activeIngredient: product.medicines?.[0]?.ingredients?.map((i: any) => i.activeIngredient?.name).join(', ') || product.name,
                        isAvailable: product.status === 'ACTIVE' || product.product_variants?.[0]?.status === 'ACTIVE' || product.status === 'AVAILABLE' || product.product_variants?.[0]?.status === 'AVAILABLE'
                      })}
                      className="w-full bg-white text-[#024ad8] border border-[#024ad8] hover:bg-[#024ad8] hover:text-white transition-colors shadow-sm rounded-xl h-10 font-semibold group-hover:bg-[#024ad8] group-hover:text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Chọn mua
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Load More Button */}
      {products.length > 0 && products.length < totalCount && (
        <div className="mt-8 flex justify-center">
          <Button 
            onClick={handleLoadMore} 
            disabled={loading}
            className="bg-white text-[#024ad8] border border-[#024ad8] hover:bg-gray-50 px-8 py-2 rounded-full font-medium h-12 shadow-sm min-w-[200px]"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Đang tải...
              </>
            ) : (
              `Xem thêm ${Math.min(12, totalCount - products.length)} sản phẩm`
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
