'use client';

import React, { useState, useMemo } from 'react';
import { useCart } from '@/context/cart-context';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Minus, 
  ShoppingCart, 
  Zap, 
  ShieldCheck, 
  RotateCcw, 
  Award, 
  Heart,
  Share2,
  Check,
  ChevronRight
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
}

export default function ProductDetailClient({ product }: ProductDetailProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  // Selected Variant (default to first active variant)
  const activeVariants = useMemo(() => {
    return product.variants.filter(v => v.status === 'ACTIVE');
  }, [product.variants]);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    activeVariants.length > 0 ? activeVariants[0] : null
  );

  // Gallery state
  const [activeImage, setActiveImage] = useState<string>(
    product.images.find(img => img.isPrimary)?.imageUrl || 
    product.images[0]?.imageUrl || 
    'https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_03542_6bfa8a6508.jpg'
  );

  // Quantity state
  const [quantity, setQuantity] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active section for scrolling navigation
  const [activeNavSection, setActiveNavSection] = useState<string>('description');

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
    });

    triggerToast(`Đã thêm ${quantity} ${selectedVariant.unit} vào giỏ hàng thành công!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/cart');
  };

  const scrollToSection = (id: string) => {
    setActiveNavSection(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Sections navigation list
  const navSections = [
    { id: 'description', label: 'Mô tả sản phẩm' },
    { id: 'ingredients', label: 'Thành phần' },
    { id: 'benefits', label: 'Công dụng' },
    { id: 'dosage', label: 'Liều dùng & Cách dùng' },
    { id: 'precautions', label: 'Lưu ý y khoa' },
    { id: 'storage', label: 'Bảo quản' }
  ];

  return (
    <div className="w-full">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-gray-900/95 text-white border border-gray-800 shadow-2xl rounded-2xl px-6 py-4 flex items-center gap-3 animate-slide-up max-w-sm backdrop-blur-md">
          <div className="bg-[#52c41a] text-white p-1 rounded-full">
            <Check size={16} />
          </div>
          <p className="text-sm font-semibold leading-normal">{toastMessage}</p>
        </div>
      )}

      {/* Main product summary card */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-8 lg:gap-12 mb-8">
        
        {/* Left column: Image Gallery */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="bg-[#f8fafc] border border-gray-50 aspect-square w-full rounded-2xl flex items-center justify-center p-6 relative overflow-hidden group">
            {product.medicineDetail?.requiresPrescription && (
              <span className="absolute top-4 left-4 bg-red-100 text-red-600 text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-lg border border-red-200 z-10">
                Thuốc kê đơn
              </span>
            )}
            <img 
              src={activeImage} 
              alt={product.name} 
              className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* Thumbnails list */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {product.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(img.imageUrl)}
                  className={`w-20 h-20 shrink-0 bg-[#f8fafc] border rounded-xl overflow-hidden p-1 flex items-center justify-center transition-all ${activeImage === img.imageUrl ? 'border-[#024ad8] ring-2 ring-[#024ad8]/10' : 'border-gray-200 hover:border-gray-400'}`}
                >
                  <img src={img.imageUrl} alt={img.altText || product.name} className="w-full h-full object-contain mix-blend-multiply" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right column: Purchase options & brief info */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Brand and category */}
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              {product.brand && (
                <span className="text-[#024ad8] hover:underline cursor-pointer">
                  {product.brand.name}
                </span>
              )}
              {product.brand && <span>•</span>}
              <span>{product.category.name}</span>
            </div>

            {/* Product Name */}
            <h1 className="text-xl md:text-2xl font-black text-gray-900 leading-snug">
              {product.name}
            </h1>

            {/* SKU and SKU Code */}
            <div className="text-xs text-gray-400 font-medium">
              Mã sản phẩm: <span className="font-bold text-gray-700">{selectedVariant?.sku || product.code}</span>
            </div>

            {/* Price display */}
            <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100/30">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl md:text-3xl font-black text-[#024ad8]">
                  {selectedVariant ? formatPrice(selectedVariant.sellingPrice) : 'Liên hệ'}
                </span>
                {selectedVariant && (
                  <span className="text-xs font-bold text-gray-500">
                    / {selectedVariant.unit}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#024ad8] font-bold mt-1.5 flex items-center gap-1">
                <span>⚡</span> Giá đã bao gồm thuế. Miễn phí vận chuyển cho đơn hàng từ 300.000đ.
              </p>
            </div>

            {/* Variant / Unit selection */}
            {activeVariants.length > 1 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Chọn Đơn Vị Tính:</span>
                <div className="flex flex-wrap gap-2.5">
                  {activeVariants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setSelectedVariant(v);
                        setQuantity(1); // Reset quantity
                      }}
                      className={`px-4 py-2 border rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${selectedVariant?.id === v.id ? 'border-[#024ad8] bg-[#024ad8]/5 text-[#024ad8] shadow-sm' : 'border-gray-200 hover:border-gray-400 bg-white text-gray-700'}`}
                    >
                      {v.unit}
                      {selectedVariant?.id === v.id && (
                        <div className="w-3.5 h-3.5 bg-[#024ad8] text-white rounded-full flex items-center justify-center p-0.5">
                          <Check size={10} strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 py-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Số Lượng:</span>
              <div className="flex items-center border border-gray-300 rounded-xl bg-white overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2.5 hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center text-sm font-black text-gray-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2.5 hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="space-y-3.5 mt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!selectedVariant}
                className="flex-1 bg-white hover:bg-blue-50/50 border-2 border-[#024ad8] text-[#024ad8] font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 uppercase text-xs tracking-wider disabled:opacity-50"
              >
                <ShoppingCart size={16} />
                Chọn mua
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={!selectedVariant}
                className="flex-1 bg-[#024ad8] hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 uppercase text-xs tracking-wider disabled:opacity-50"
              >
                <Zap size={16} />
                Mua ngay
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3.5 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-600 font-semibold">
                <ShieldCheck size={18} className="text-[#024ad8]" />
                <span>100% Chính hãng</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 font-semibold">
                <RotateCcw size={18} className="text-[#024ad8]" />
                <span>Đổi trả 30 ngày</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 font-semibold col-span-2">
                <Award size={18} className="text-[#024ad8]" />
                <span>Thương hiệu: {product.brand?.name || 'Đang cập nhật'} • {product.manufacturer?.country || 'Nhật Bản'}</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Details structure (Tabs Navigation & Content Sections) */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Detail Contents (75%) */}
        <div className="flex-1 space-y-6 lg:max-w-[calc(100%-320px)]">
          
          {/* Scroll Navigation Header (Sticky on desktop) */}
          <div className="sticky top-14 z-20 bg-[#f8fafc] py-2 border-b border-gray-200/60 hidden lg:block">
            <div className="flex gap-4 overflow-x-auto">
              {navSections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`text-xs font-bold pb-2 transition-all relative shrink-0 ${activeNavSection === sec.id ? 'text-[#024ad8] border-b-2 border-[#024ad8]' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  {sec.label}
                </button>
              ))}
            </div>
          </div>

          {/* 1. Description Section */}
          <div id="description" className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm scroll-mt-28">
            <h2 className="text-lg font-black text-gray-900 mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#024ad8] rounded-full"></span>
              Mô tả sản phẩm
            </h2>
            <div className="text-sm text-gray-700 leading-relaxed space-y-3 whitespace-pre-line">
              {product.description || product.shortDescription || 'Thông tin mô tả sản phẩm đang được cập nhật.'}
            </div>
          </div>

          {/* 2. Ingredients Section */}
          <div id="ingredients" className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm scroll-mt-28">
            <h2 className="text-lg font-black text-gray-900 mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#024ad8] rounded-full"></span>
              Thành phần hoạt chất
            </h2>
            
            {product.medicineDetail?.ingredients && product.medicineDetail.ingredients.length > 0 ? (
              <div className="overflow-hidden border border-gray-100 rounded-2xl">
                <table className="min-w-full divide-y divide-gray-100 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3.5 text-left font-black text-gray-800 uppercase tracking-wider text-xs">Tên hoạt chất</th>
                      <th className="px-6 py-3.5 text-left font-black text-gray-800 uppercase tracking-wider text-xs">Hàm lượng</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100 font-medium text-gray-700">
                    {product.medicineDetail.ingredients.map((ing, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">{ing.name}</td>
                        <td className="px-6 py-4">{ing.strength}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-gray-500 font-medium">Đang cập nhật danh sách thành phần hoạt chất chi tiết.</p>
            )}
          </div>

          {/* 3. Benefits Section */}
          <div id="benefits" className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm scroll-mt-28">
            <h2 className="text-lg font-black text-gray-900 mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#024ad8] rounded-full"></span>
              Công dụng
            </h2>
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {product.shortDescription || 'Hỗ trợ nâng cao sức khỏe, cải thiện sắc đẹp và tăng cường sức đề kháng cho cơ thể.'}
            </div>
          </div>

          {/* 4. Dosage Section */}
          <div id="dosage" className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm scroll-mt-28">
            <h2 className="text-lg font-black text-gray-900 mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#024ad8] rounded-full"></span>
              Liều dùng & Cách dùng
            </h2>
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {product.medicineDetail?.usageNote || 'Sử dụng theo chỉ định trực tiếp từ dược sĩ hoặc bác sĩ chuyên khoa.'}
            </div>
          </div>

          {/* 5. Precautions Section */}
          <div id="precautions" className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm scroll-mt-28">
            <h2 className="text-lg font-black text-gray-900 mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#024ad8] rounded-full"></span>
              Lưu ý y khoa
            </h2>
            <div className="text-sm text-gray-700 leading-relaxed bg-amber-50 border border-amber-100 rounded-2xl p-4 text-amber-900 font-medium">
              💡 Cảnh báo và thông tin mang tính chất tham khảo y khoa. AI Copilot hay hệ thống không thay thế các chẩn đoán trực tiếp từ chuyên viên y tế chuyên nghiệp. Đọc kỹ hướng dẫn sử dụng trước khi dùng.
            </div>
          </div>

          {/* 6. Storage Section */}
          <div id="storage" className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm scroll-mt-28">
            <h2 className="text-lg font-black text-gray-900 mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#024ad8] rounded-full"></span>
              Bảo quản
            </h2>
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {product.medicineDetail?.storageInstruction || 'Nơi khô ráo, thoáng mát, tránh ánh sáng mặt trời chiếu trực tiếp. Tránh xa tầm tay trẻ em.'}
            </div>
          </div>

        </div>

        {/* Right Side: Medical Metadata Card (25% - width 280px) */}
        <div className="w-full lg:w-[280px] shrink-0">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-5 sticky top-20">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
              Thông tin chi tiết
            </h3>
            
            <div className="space-y-4 text-xs font-semibold text-gray-600">
              {/* Box Info */}
              <div>
                <span className="text-gray-400 block font-medium mb-1">Quy cách</span>
                <span className="text-gray-900">{selectedVariant?.variantName || 'Hộp 60 viên'}</span>
              </div>
              
              {/* Brand Info */}
              <div>
                <span className="text-gray-400 block font-medium mb-1">Thương hiệu</span>
                <span className="text-[#024ad8] font-bold">{product.brand?.name || 'Đang cập nhật'}</span>
              </div>
              
              {/* Manufacturer */}
              <div>
                <span className="text-gray-400 block font-medium mb-1">Nhà sản xuất</span>
                <span className="text-gray-900">{product.manufacturer?.name || 'Đang cập nhật'}</span>
              </div>
              
              {/* Country */}
              <div>
                <span className="text-gray-400 block font-medium mb-1">Nước sản xuất</span>
                <span className="text-gray-900">{product.manufacturer?.country || 'Nhật Bản'}</span>
              </div>
              
              {/* Dosage Form */}
              <div>
                <span className="text-gray-400 block font-medium mb-1">Dạng bào chế</span>
                <span className="text-gray-900">{product.medicineDetail?.dosageForm || 'Viên nang'}</span>
              </div>

              {/* Shelf life */}
              {product.medicineDetail?.shelfLifeMonths && (
                <div>
                  <span className="text-gray-400 block font-medium mb-1">Hạn dùng</span>
                  <span className="text-gray-900">{product.medicineDetail.shelfLifeMonths} tháng</span>
                </div>
              )}
              
              {/* Registration Number */}
              {product.medicineDetail?.registrationNumber && (
                <div>
                  <span className="text-gray-400 block font-medium mb-1">Số đăng ký / Số công bố</span>
                  <span className="text-gray-900 font-mono">{product.medicineDetail.registrationNumber}</span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
