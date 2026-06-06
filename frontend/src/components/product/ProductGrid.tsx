import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

export function ProductGrid({ products, totalCount, currentPage, totalPages }: any) {
  return (
    <div className="w-full">
      <div className="mb-4 text-sm text-gray-500">
        Tìm thấy <span className="font-bold text-gray-900">{totalCount}</span> sản phẩm
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
            const price = product.product_prices?.[0]?.price || 0;
            const originalPrice = product.product_prices?.[0]?.original_price;
            const unit = product.product_prices?.[0]?.unit_name || 'Hộp';
            
            return (
              <div key={product.id} className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-[#024ad8]/30 transition-all duration-300 transform hover:-translate-y-1">
                {/* Sale Badge */}
                {originalPrice && originalPrice > price && (
                  <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                    -{Math.round((1 - price/originalPrice) * 100)}%
                  </div>
                )}
                
                <Link href={`/san-pham/${product.slug}`} className="relative p-4 flex items-center justify-center bg-white aspect-square">
                  <img 
                    src={product.image_url || 'https://cdn.nhathuoclongchau.com.vn/rx_product_placeholder.png'} 
                    alt={product.name}
                    className="object-contain max-h-full max-w-full transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://cdn.nhathuoclongchau.com.vn/rx_product_placeholder.png' }}
                  />
                </Link>

                <div className="p-4 flex flex-col flex-1 border-t border-gray-50 bg-gray-50/30">
                  <Link href={`/san-pham/${product.slug}`} className="mb-2">
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

                    <Button className="w-full bg-white text-[#024ad8] border border-[#024ad8] hover:bg-[#024ad8] hover:text-white transition-colors shadow-sm rounded-xl h-10 font-semibold group-hover:bg-[#024ad8] group-hover:text-white">
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious href={`?page=${currentPage - 1}`} />
                </PaginationItem>
              )}
              
              {/* Simple pagination numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = i + 1;
                // Center around current page if possible
                if (totalPages > 5 && currentPage > 3) {
                  pageNum = currentPage - 2 + i;
                  if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                }
                
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink 
                      href={`?page=${pageNum}`}
                      isActive={currentPage === pageNum}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext href={`?page=${currentPage + 1}`} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
