'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useCart } from '@/context/cart-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Plus, 
  Minus, 
  ShoppingCart, 
  Check,
  Star,
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';

interface Ingredient {
  name: string;
  strength: string;
  note?: string | null;
}

interface MedicineDetail {
  id: number;
  medicineCode: string;
  registrationNumber: string | null;
  requiresPrescription: boolean;
  usageNote: string | null;
  storageInstruction: string | null;
  shelfLifeMonths: number | null;
  dosageForm: string;
  ingredients: Ingredient[];
}

interface ProductImage {
  id: number;
  imageUrl: string;
  altText: string | null;
  isPrimary: boolean;
  sortOrder: number;
}

interface ProductVariant {
  id: number;
  sku: string;
  variantName: string;
  sellingPrice: number;
  unit: string;
  status: string;
}

interface Brand {
  id: number;
  code: string;
  name: string;
  slug: string;
  logoUrl: string | null;
}

interface Category {
  id: number;
  code: string;
  name: string;
  slug: string;
}

interface Manufacturer {
  id: number;
  code: string;
  name: string;
  country: string;
}

interface ProductDetailProps {
  product: {
    id: number;
    code: string;
    name: string;
    slug: string;
    productType: string;
    shortDescription: string | null;
    description: string | null;
    status: string;
    brand: Brand | null;
    category: Category;
    manufacturer: Manufacturer | null;
    images: ProductImage[];
    variants: ProductVariant[];
    medicineDetail: MedicineDetail | null;
  };
  relatedProducts?: {
    id: number;
    name: string;
    slug: string;
    imageUrl: string;
    price: number;
    unit: string;
  }[];
}

export default function ProductDetailClient({ product, relatedProducts = [] }: ProductDetailProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  // Selected Variant (default to first active variant)
  const activeVariants = useMemo(() => {
    return product.variants?.filter(v => v.status === 'ACTIVE') || [];
  }, [product.variants]);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    activeVariants.length > 0 ? activeVariants[0] : null
  );

  // Deduplicate images
  const uniqueImages = useMemo(() => {
    const seen = new Set<string>();
    return (product.images || []).filter(img => {
      if (seen.has(img.imageUrl)) return false;
      seen.add(img.imageUrl);
      return true;
    });
  }, [product.images]);

  // Gallery state
  const [activeImage, setActiveImage] = useState<string>(() => {
    return uniqueImages.find(img => img.isPrimary)?.imageUrl || 
      uniqueImages[0]?.imageUrl || 
      'https://placehold.co/600x600/f8fafc/a1a1aa?text=No+Image';
  });

  // Sync active image when product changes
  useEffect(() => {
    const defaultImg = uniqueImages.find(img => img.isPrimary)?.imageUrl || 
      uniqueImages[0]?.imageUrl || 
      'https://placehold.co/600x600/f8fafc/a1a1aa?text=No+Image';
    setActiveImage(defaultImg);
  }, [uniqueImages]);

  // Quantity state
  const [quantity, setQuantity] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Format currency helper
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleQuantityChange = (val: number) => {
    if (val < 1) return;
    setQuantity(val);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const activeIngredientsString = useMemo(() => {
    return product.medicineDetail?.ingredients
      ?.map(ing => `${ing.name} ${ing.strength}`)
      .join(', ') || '';
  }, [product.medicineDetail]);

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    
    addToCart({
      id: selectedVariant.sku,
      dbId: product.id,
      name: product.name,
      price: selectedVariant.sellingPrice,
      unit: selectedVariant.unit,
      imageUrl: product.images[0]?.imageUrl || activeImage,
      activeIngredient: activeIngredientsString || product.name,
      isAvailable: selectedVariant.status === 'ACTIVE'
    }, quantity);

    triggerToast(`Đã thêm ${quantity} ${selectedVariant.unit} vào giỏ hàng thành công!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/cart');
  };

  return (
    <div className="w-full text-[#333333] font-sans bg-[#f6f7f9] min-h-screen pb-24">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-8 z-50 bg-green-600 text-white shadow-xl rounded px-5 py-3 flex items-center gap-3 animate-slide-up">
          <Check size={18} strokeWidth={3} />
          <p className="text-sm font-medium leading-tight">{toastMessage}</p>
        </div>
      )}



      <div className="max-w-[1200px] mx-auto px-4 md:px-0">
        
        {/* Main product summary card */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm flex flex-col md:flex-row gap-8 lg:gap-12 mb-4">
          
          {/* Left column: Image Gallery */}
          <div className="w-full md:w-[450px] shrink-0 flex flex-col md:flex-row gap-4">
            
            {/* Main Image */}
            <div className="w-full md:order-2">
              <div className="bg-white rounded-xl flex items-center justify-center relative overflow-hidden group aspect-square border border-gray-100">
                {product.medicineDetail?.requiresPrescription && (
                  <span className="absolute top-3 left-3 bg-[#e8f1fa] text-[#024ad8] text-xs font-bold px-2.5 py-1 rounded">
                    Thuốc kê đơn
                  </span>
                )}
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="w-[90%] h-[90%] object-contain"
                />
              </div>
            </div>

            {/* Thumbnails list (Vertical on Desktop, Horizontal on Mobile) */}
            {uniqueImages.length > 1 && (
              <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 scrollbar-hide md:w-20 shrink-0 md:order-1">
                {uniqueImages.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImage(img.imageUrl)}
                    className={`w-[60px] h-[60px] md:w-[72px] md:h-[72px] shrink-0 bg-white rounded-xl overflow-hidden p-1 flex items-center justify-center transition-all duration-200 border-2 ${activeImage === img.imageUrl ? 'border-[#024ad8]' : 'border-gray-100 hover:border-[#024ad8]'}`}
                  >
                    <img src={img.imageUrl} alt={img.altText || product.name} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
            
          </div>

          {/* Right column: Purchase options & brief info */}
          <div className="w-full flex-1 flex flex-col">
            
            <div className="space-y-4">
              
              {/* Product Name */}
              <h1 className="text-xl md:text-[22px] font-bold text-gray-900 leading-snug">
                {product.name}
              </h1>

              {/* SKU, Brand, Rating */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                {product.brand && (
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Thương hiệu:</span>
                    <span className="text-[#024ad8] font-medium hover:underline cursor-pointer">{product.brand.name}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Mã SP:</span>
                  <span className="font-medium text-gray-800">{selectedVariant?.sku || product.code}</span>
                </div>

                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={14} fill="currentColor" stroke="none" />
                  <Star size={14} fill="currentColor" stroke="none" />
                  <Star size={14} fill="currentColor" stroke="none" />
                  <Star size={14} fill="currentColor" stroke="none" />
                  <Star size={14} fill="currentColor" stroke="none" />
                  <span className="text-gray-500 ml-1 text-xs">(12 đánh giá)</span>
                </div>
              </div>

              {/* Price block */}
              {selectedVariant && (
                <div className="py-2 mt-2 flex items-end gap-2">
                  <span className="text-[32px] font-bold text-[#024ad8] leading-none">
                    {formatPrice(selectedVariant.sellingPrice)}
                  </span>
                  <span className="text-gray-500 text-sm font-medium mb-1">
                    / {selectedVariant.unit}
                  </span>
                </div>
              )}

              {/* Unit Selection */}
              {activeVariants.length > 0 && (
                <div className="pt-2">
                  <div className="text-sm font-medium text-gray-700 mb-2">Đơn vị tính:</div>
                  <div className="flex flex-wrap gap-2">
                    {activeVariants.map((v) => {
                      const isSelected = selectedVariant?.id === v.id;
                      return (
                        <button
                          key={v.id}
                          onClick={() => {
                            setSelectedVariant(v);
                            setQuantity(1);
                          }}
                          className={`px-4 py-1.5 rounded text-sm font-medium transition-colors border ${isSelected ? 'border-[#024ad8] bg-[#eff5ff] text-[#024ad8]' : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'}`}
                        >
                          {v.unit}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="pt-2 flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Số lượng:</span>
                <div className="flex items-center border border-gray-300 rounded h-[36px] bg-white">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-9 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50"
                  >
                    <Minus size={14} />
                  </button>
                  <input 
                    type="text" 
                    value={quantity}
                    readOnly
                    className="w-10 text-center text-sm font-medium text-gray-900 border-x border-gray-300 h-full focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-9 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 w-full md:w-3/4">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!selectedVariant}
                  className="flex-1 bg-white border border-[#024ad8] text-[#024ad8] font-semibold h-[48px] rounded-full transition-colors hover:bg-[#eff5ff] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <ShoppingCart size={20} />
                  Thêm vào giỏ
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={!selectedVariant}
                  className="flex-1 bg-[#024ad8] text-white font-semibold h-[48px] rounded-full transition-colors hover:bg-[#023eb8] disabled:opacity-50"
                >
                  MUA NGAY
                </button>
              </div>
              
              {/* Trust block */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-6 mt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShieldCheck size={20} className="text-[#024ad8]" />
                  <span>100% Chính hãng</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Award size={20} className="text-[#024ad8]" />
                  <span>Đổi trả trong 30 ngày</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Details structure (Content Sections stacked vertically) */}
        <div className="flex flex-col md:flex-row gap-4 lg:gap-6 w-full">
          
          {/* Main Content (Left) */}
          <div className="flex-1 space-y-4 lg:space-y-6">
            
            {/* 1. Description Section */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm">
              <h2 className="text-[18px] font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                Mô tả sản phẩm
              </h2>

              <div className="text-gray-700 leading-relaxed text-[15px] space-y-4">
                {product.shortDescription && (
                  <p className="font-semibold text-gray-900">
                    {product.shortDescription}
                  </p>
                )}
                
                {product.description ? (
                  <div className="prose prose-sm max-w-none prose-a:text-[#024ad8] prose-img:rounded-lg">
                    {/* Render HTML description safely or use dangerouslySetInnerHTML */}
                    <div dangerouslySetInnerHTML={{ __html: product.description }} />
                  </div>
                ) : (
                  <p>Đang cập nhật thông tin chi tiết.</p>
                )}
              </div>
            </div>

            {/* 2. Ingredients Section */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm">
              <h2 className="text-[18px] font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                Thành phần
              </h2>
              
              {product.medicineDetail?.ingredients && product.medicineDetail.ingredients.length > 0 ? (
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 text-[15px]">
                    <thead className="bg-[#f8f9fa]">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-800">Thành phần</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-800">Hàm lượng</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {product.medicineDetail.ingredients.map((ing, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-[#f8f9fa]"}>
                          <td className="px-4 py-3 font-medium text-gray-800">{ing.name}</td>
                          <td className="px-4 py-3 text-gray-600">{ing.strength}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 text-[15px]">Chưa có thông tin chi tiết về thành phần.</p>
              )}
            </div>

            {/* 3. Usage & Storage Section */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm">
              <h2 className="text-[18px] font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                Hướng dẫn sử dụng
              </h2>
              
              <div className="space-y-6 text-[15px] text-gray-700">
                {product.medicineDetail?.usageNote && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Cách dùng:</h3>
                    <p className="leading-relaxed">{product.medicineDetail.usageNote}</p>
                  </div>
                )}

                {product.medicineDetail?.storageInstruction && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Bảo quản:</h3>
                    <p className="leading-relaxed">{product.medicineDetail.storageInstruction}</p>
                  </div>
                )}
                
                {!product.medicineDetail?.usageNote && !product.medicineDetail?.storageInstruction && (
                  <p className="text-gray-600">Đang cập nhật hướng dẫn sử dụng.</p>
                )}
              </div>
            </div>

          </div>

          {/* Right Sidebar (Optional, for Related products later) */}
          <div className="w-full md:w-[320px] shrink-0 space-y-4">
             {/* We can leave this empty or place a small placeholder banner */}
             <div className="bg-white rounded-2xl p-5 shadow-sm text-center border border-[#eff5ff]">
               <img src="https://cdn.nhathuoclongchau.com.vn/unsafe/828x0/filters:quality(90):format(webp)/Banner_364x115_ca0b299c85.png" alt="Banner" className="rounded-lg w-full mb-3" />
               <p className="text-sm text-gray-600 font-medium">Tư vấn sức khỏe cùng Dược sĩ</p>
               <a href="tel:18006928" className="text-[#024ad8] font-bold text-xl mt-1 block">1800 6928</a>
             </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
