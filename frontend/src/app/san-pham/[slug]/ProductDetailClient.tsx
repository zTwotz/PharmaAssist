'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useCart } from '@/context/cart-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Plus, 
  Minus, 
  ShoppingCart, 
  Zap, 
  ShieldCheck, 
  RotateCcw, 
  Check,
  ChevronDown,
  ChevronRight,
  Star,
  Gift,
  Info,
  ExternalLink,
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
  const [isDescExpanded, setIsDescExpanded] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  // Flash Sale Timer countdown (starts at 02:13:08)
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 13, seconds: 8 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 2, minutes: 13, seconds: 8 }; // reset loop
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  // Flash Sale dynamic pricing logic
  const priceInfo = useMemo(() => {
    if (!selectedVariant) return null;
    const price = selectedVariant.sellingPrice;
    const unit = selectedVariant.unit;

    // Specific mapping for Abbott Ensure Gold 237ml case
    if (product.id === 15175 || product.slug.includes('ensure-gold-strengthpro-huong-vani-237ml')) {
      if (unit.toLowerCase().includes('thùng')) {
        return { discounted: 1409000, original: 1488000, save: 79000, diffBadge: '-79.000đ' };
      }
      if (unit.toLowerCase().includes('lốc')) {
        return { discounted: 352250, original: 372000, save: 19750, diffBadge: '-19.750đ' };
      }
      if (unit.toLowerCase().includes('chai')) {
        return { discounted: 58710, original: 62000, save: 3290, diffBadge: '-3.290đ' };
      }
    }

    // Default dynamic discount for other products
    const discounted = Math.round(price * 0.95);
    const save = price - discounted;
    return { discounted, original: price, save, diffBadge: `-${Math.round((save/price)*100)}%` };
  }, [selectedVariant, product]);

  const handleAddToCart = () => {
    if (!selectedVariant || !priceInfo) return;
    
    addToCart({
      id: selectedVariant.sku,
      dbId: product.id,
      name: product.name,
      price: priceInfo.discounted,
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

  // Specification expand toggle
  const [isSpecExpanded, setIsSpecExpanded] = useState(false);

  // Sections navigation list
  const navSections = [
    { id: 'description', label: 'Mô tả sản phẩm' },
    { id: 'benefits', label: 'Công dụng' },
    { id: 'dosage', label: 'Liều dùng & Cách dùng' },
    { id: 'side-effects', label: 'Tác dụng phụ' },
    { id: 'precautions', label: 'Lưu ý' },
    { id: 'storage', label: 'Bảo quản' }
  ];

  return (
    <div className="w-full text-[#374151]">
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
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <div className="bg-white border border-gray-100 aspect-square w-full rounded-2xl flex items-center justify-center p-6 relative overflow-hidden group">
            {product.medicineDetail?.requiresPrescription && (
              <span className="absolute top-4 left-4 bg-red-100 text-red-600 text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-lg border border-red-200 z-10">
                Thuốc kê đơn
              </span>
            )}
            
            {/* Stamp "Chính Hãng" at top right */}
            <div className="absolute top-4 right-4 z-10 w-16 h-16 pointer-events-none">
              <img 
                src="https://cdn.nhathuoclongchau.com.vn/v1/static/stamp_chinh_hang_a2bc900cb6.png" 
                alt="Chính Hãng" 
                onError={(e) => {
                  // Fallback standard badge design
                  (e.target as HTMLElement).style.display = 'none';
                }}
                className="w-full h-full object-contain"
              />
            </div>

            <img 
              src={activeImage} 
              alt={product.name} 
              className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* Thumbnails list */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin justify-center">
              {product.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(img.imageUrl)}
                  className={`w-16 h-16 shrink-0 bg-white border rounded-xl overflow-hidden p-1 flex items-center justify-center transition-all ${activeImage === img.imageUrl ? 'border-[#024ad8] ring-2 ring-[#024ad8]/10' : 'border-gray-200 hover:border-gray-400'}`}
                >
                  <img src={img.imageUrl} alt={img.altText || product.name} className="w-full h-full object-contain mix-blend-multiply" />
                </button>
              ))}
            </div>
          )}

          <p className="text-center text-xs text-gray-400 font-medium italic">
            Mẫu mã sản phẩm có thể thay đổi theo lô hàng
          </p>
          
          {/* Detailed trust badges below images */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
            <div className="flex flex-col items-center text-center p-2 rounded-xl hover:bg-gray-50/50 transition-colors">
              <div className="bg-blue-50 p-2.5 rounded-full text-[#024ad8] mb-1.5">
                <RotateCcw size={16} />
              </div>
              <span className="text-[10px] leading-tight font-extrabold text-gray-700">Đổi trả trong 30 ngày</span>
              <span className="text-[9px] text-gray-400 mt-0.5">kể từ ngày mua hàng</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 rounded-xl hover:bg-gray-50/50 transition-colors">
              <div className="bg-blue-50 p-2.5 rounded-full text-[#024ad8] mb-1.5">
                <ShieldCheck size={16} />
              </div>
              <span className="text-[10px] leading-tight font-extrabold text-gray-700">Miễn phí 100%</span>
              <span className="text-[9px] text-gray-400 mt-0.5">đổi thuốc</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 rounded-xl hover:bg-gray-50/50 transition-colors">
              <div className="bg-blue-50 p-2.5 rounded-full text-[#024ad8] mb-1.5">
                <Award size={16} />
              </div>
              <span className="text-[10px] leading-tight font-extrabold text-gray-700">Miễn phí vận chuyển</span>
              <span className="text-[9px] text-gray-400 mt-0.5">theo chính sách giao hàng</span>
            </div>
          </div>
        </div>

        {/* Right column: Purchase options & brief info */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Brand and Origin country */}
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded flex items-center gap-1 font-extrabold">
                🇺🇸 {product.manufacturer?.country || 'Hoa Kỳ'}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">Thương hiệu:</span>
              <span className="text-[#024ad8] hover:underline cursor-pointer font-bold">
                {product.brand?.name || 'Abbott'}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-xl md:text-2xl font-black text-gray-900 leading-snug">
              {product.name}
            </h1>

            {/* SKU and Rating stats */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-medium">
              <span>Mã sản phẩm: <span className="font-bold text-gray-700">{selectedVariant?.sku || product.code}</span></span>
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={14} fill="currentColor" stroke="none" />
                <span className="font-black">4.8</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="hover:text-[#024ad8] cursor-pointer">17 đánh giá</span>
              <span className="text-gray-300">|</span>
              <span className="hover:text-[#024ad8] cursor-pointer">167 bình luận</span>
            </div>

            {/* Premium Flash Sale Banner */}
            <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 rounded-2xl p-3 text-white shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/20 pb-2">
                <div className="flex items-center gap-1.5 font-black uppercase text-xs sm:text-sm tracking-wider">
                  <span className="text-yellow-200 animate-bounce">⚡</span>
                  GIÁ TỐT TẠI WEB/APP | FLASHSALE
                </div>
                
                {/* Countdown clock */}
                <div className="flex items-center gap-1 bg-blue-950/20 backdrop-blur-sm px-2.5 py-1 rounded-xl text-xs font-bold border border-white/10 shrink-0">
                  <span className="opacity-90 mr-1 text-[10px]">Kết thúc sau</span>
                  <span className="bg-gray-900 text-white px-1.5 py-0.5 rounded shadow text-[10px] font-black">{timeLeft.hours.toString().padStart(2, '0')}</span>
                  <span>:</span>
                  <span className="bg-gray-900 text-white px-1.5 py-0.5 rounded shadow text-[10px] font-black">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                  <span>:</span>
                  <span className="bg-gray-900 text-white px-1.5 py-0.5 rounded shadow text-[10px] font-black">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-[10px] font-black mt-2">
                <span>🔥 Đang bán chạy</span>
                <span>Đã bán 30/100 chai</span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-white/30 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-yellow-300 rounded-full" style={{ width: "30%" }} />
              </div>
            </div>

            {/* Price display matching Abbott layout */}
            {priceInfo && (
              <div className="bg-[#f8fafc] rounded-2xl p-4 border border-gray-100">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-[#024ad8]">
                    {formatPrice(priceInfo.discounted)}
                  </span>
                  <span className="text-sm font-bold text-gray-500">
                    / {selectedVariant?.unit}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(priceInfo.original)}
                  </span>
                  <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-lg shadow-sm">
                    {priceInfo.diffBadge}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 mt-2 font-medium">
                  Lưu ý: Flash sale giá sốc chỉ áp dụng với số lượng & thời gian giới hạn. <span className="text-[#024ad8] font-bold cursor-pointer hover:underline">Xem chi tiết &gt;</span>
                </p>
              </div>
            )}

            {/* Variant / Unit selection */}
            {activeVariants.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Chọn Đơn Vị Tính:</span>
                <div className="flex flex-wrap gap-2.5">
                  {activeVariants.map((v) => {
                    const isSelected = selectedVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => {
                          setSelectedVariant(v);
                          setQuantity(1); // Reset quantity
                        }}
                        className={`px-5 py-2.5 border rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${isSelected ? 'border-[#024ad8] bg-[#024ad8]/5 text-[#024ad8] ring-2 ring-[#024ad8]/10' : 'border-gray-200 hover:border-gray-400 bg-white text-gray-700'}`}
                      >
                        {v.unit}
                        {isSelected && (
                          <div className="w-3.5 h-3.5 bg-[#024ad8] text-white rounded-full flex items-center justify-center p-0.5">
                            <Check size={10} strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 py-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Chọn số lượng:</span>
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
          <div className="space-y-4 mt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!selectedVariant}
                className="flex-1 bg-[#024ad8] hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 uppercase text-xs tracking-wider disabled:opacity-50"
              >
                <ShoppingCart size={16} />
                Chọn mua
              </button>
              
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={!selectedVariant}
                className="flex-1 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#024ad8] font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-wider disabled:opacity-50"
              >
                Tìm nhà thuốc
              </button>
            </div>

            {/* Applied Promotions list */}
            <div className="border border-orange-100 bg-orange-50/30 rounded-2xl p-4 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-orange-800">
                <Gift size={14} />
                <span>Khuyến mại được áp dụng</span>
              </div>
              <p className="text-gray-400 font-semibold mb-1">Áp dụng 1 trong các khuyến mại:</p>
              
              <div className="space-y-2 font-semibold text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">🎫</span>
                  <span>Giảm ngay 2.625đ áp dụng đến 20/06</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">🎫</span>
                  <span>Giảm ngay 3.290đ cho 240 chai đầu tiên khi mua Online 8h - 22h áp dụng đến 21/06</span>
                </div>
              </div>
            </div>

            {/* Specifications Summary block */}
            <div className="border-t border-gray-100 pt-4 space-y-3">
              <div className="text-xs space-y-2 text-gray-600 font-semibold">
                
                {/* Registration Code */}
                <div className="flex items-baseline gap-2">
                  <span className="w-24 text-gray-400 shrink-0">Số đăng ký</span>
                  <span className="text-gray-900 font-mono">09/2023/DKSP</span>
                  <span className="text-gray-300 font-normal">|</span>
                  <span className="text-[#024ad8] hover:underline cursor-pointer text-[10px] font-bold">Xem giấy công bố sản phẩm</span>
                </div>
                
                {/* Ingredients summary */}
                <div className="flex items-baseline gap-2">
                  <span className="w-24 text-gray-400 shrink-0">Thành phần</span>
                  <span className="text-gray-900 line-clamp-1">Vitamin tổng hợp, Khoáng chất, Dầu thực vật, Tinh bột bắp, Nước (aqua), Maltodextrin, Sucrose,...</span>
                  <span className="text-gray-300 font-normal">|</span>
                  <span onClick={() => scrollToSection('ingredients')} className="text-[#024ad8] hover:underline cursor-pointer text-[10px] font-bold shrink-0">Xem bảng thành phần</span>
                </div>

                {/* Dosage form */}
                <div className="flex items-baseline gap-2">
                  <span className="w-24 text-gray-400 shrink-0">Dạng bào chế</span>
                  <span className="text-gray-900">Dung dịch</span>
                </div>
              </div>
              
              <button 
                onClick={() => scrollToSection('description')}
                className="w-full text-center py-2 text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors flex items-center justify-center gap-1 border border-gray-100 rounded-xl hover:bg-gray-50"
              >
                <ChevronDown size={14} />
                Xem tất cả thông tin
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Details structure (Tabs Navigation & Content Sections) */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Navigation Tabs List (approx 20% width) */}
        <div className="w-full lg:w-[240px] shrink-0">
          <div className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm space-y-1.5 sticky top-20">
            {navSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-extrabold transition-all relative ${activeNavSection === sec.id ? 'bg-gray-100 text-[#024ad8]' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50/50'}`}
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Detail Contents (80%) */}
        <div className="flex-1 space-y-6">
          
          {/* Main Description wrapper block */}
          <div id="description" className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm scroll-mt-24">
            
            {/* Top size adjustment row */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-5">
              <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#024ad8] rounded-full"></span>
                Sữa tăng cường sức khỏe tăng cường miễn dịch Ensure Gold StrengthPro hương vani 237ml là gì?
              </h2>
              
              <div className="flex items-center gap-2 text-xs shrink-0">
                <span className="text-gray-400 font-semibold">Kích thước chữ</span>
                <div className="bg-gray-100 p-0.5 rounded-lg border border-gray-200/50 flex">
                  <button 
                    onClick={() => setFontSize('normal')}
                    className={`px-3 py-1 rounded-md font-bold transition-all ${fontSize === 'normal' ? 'bg-white text-[#024ad8] shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                  >
                    Mặc định
                  </button>
                  <button 
                    onClick={() => setFontSize('large')}
                    className={`px-3 py-1 rounded-md font-bold transition-all ${fontSize === 'large' ? 'bg-white text-[#024ad8] shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                  >
                    Lớn hơn
                  </button>
                </div>
              </div>
            </div>

            {/* Description detailed body text */}
            <div className={`text-gray-700 leading-relaxed space-y-4 ${fontSize === 'large' ? 'text-base' : 'text-sm'}`}>
              <h3 className="font-extrabold text-gray-900 uppercase tracking-wide text-xs sm:text-sm">
                Mô tả sản phẩm
              </h3>
              
              <p className="font-black text-gray-900">
                Tăng cường sức khỏe, tăng cường miễn dịch, tăng chất lượng cuộc sống
              </p>
              
              <p>
                Ensure Gold StrengthPro hương vani với hệ dưỡng chất StrengthPro gồm HMB, YBG và nhiều dưỡng chất khác sẽ giúp tăng cường sức khỏe, hệ miễn dịch và chất lượng cuộc sống. Với hơn 30 nghiên cứu khoa học trong suốt 50 năm có mặt, Ensure Gold được chứng minh là thức uống bổ sung dinh dưỡng có thể giúp những người bị bệnh hoặc đang phục hồi sau phẫu thuật nhận được chất dinh dưỡng cần thiết.
              </p>

              {/* Centered large image inside content description */}
              <div className="flex justify-center py-6">
                <img 
                  src={activeImage} 
                  alt="Sữa Ensure Gold 237ml" 
                  className="max-h-[350px] object-contain drop-shadow-md rounded-2xl"
                />
              </div>

              {/* Show more expand overlay */}
              {!isDescExpanded && (
                <div className="text-center pt-2">
                  <button 
                    onClick={() => setIsDescExpanded(true)}
                    className="text-xs font-bold text-[#024ad8] hover:underline flex items-center justify-center gap-1 mx-auto"
                  >
                    <ChevronDown size={14} />
                    Xem thêm
                  </button>
                </div>
              )}

              {isDescExpanded && (
                <div className="space-y-4 animate-fade-in">
                  <p className="font-extrabold text-gray-900 text-xs sm:text-sm">
                    Công thức dinh dưỡng y học chuẩn mực
                  </p>
                  <p>
                    Được Abbott nghiên cứu và phát triển lâm sàng chuyên biệt, sản phẩm cung cấp tới 28 loại vitamin và khoáng chất thiết yếu. YBG (Beta-glucan từ nấm men) giúp hỗ trợ hệ miễn dịch tự nhiên, kết hợp cùng lượng chất béo thực vật lành mạnh có lợi cho hệ tim mạch và đường huyết ổn định.
                  </p>
                  <p>
                    HMB (Hydroxymethylbutyrate) là một chất chuyển hóa tự nhiên của axit amin Leucine, được khoa học chứng minh giúp làm giảm tốc độ suy giảm khối cơ do tuổi tác hoặc vận động yếu, thúc đẩy tái tạo tế bào cơ săn chắc, dẻo dai.
                  </p>
                  <button 
                    onClick={() => setIsDescExpanded(false)}
                    className="text-xs font-bold text-[#024ad8] hover:underline flex items-center justify-center gap-1 mx-auto pt-2"
                  >
                    Rút gọn
                  </button>
                </div>
              )}

            </div>
            
            <p className="mt-6 border-l-2 border-[#024ad8] pl-3 text-xs text-sky-600 font-bold italic">
              Thực phẩm bảo vệ sức khỏe, không phải là thuốc, không có tác dụng thay thế thuốc chữa bệnh.
            </p>

            {/* Pharmacist verification section */}
            <div className="mt-8 bg-gray-50 border border-gray-100 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border border-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&auto=format&fit=crop" 
                  alt="Dược sĩ Nguyễn Thanh Hải"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-black text-gray-900">Dược sĩ Đại học Nguyễn Thanh Hải</h4>
                  <span className="bg-[#e6f7ff] text-[#024ad8] border border-blue-100 text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    ✔ Đã kiểm duyệt nội dung
                  </span>
                </div>
                
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  Tốt nghiệp Đại học Dược Hà Nội, với hơn 10 năm kinh nghiệm trong lĩnh vực Dược phẩm. Hiện là giảng viên giảng dạy các môn Dược lý, Dược lâm sàng,... tại các trường đào tạo y tế chuyên nghiệp.
                </p>
                
                <div className="text-[10px] font-bold text-[#024ad8] hover:underline cursor-pointer flex items-center gap-0.5 pt-1">
                  Xem thêm thông tin <ChevronRight size={10} />
                </div>
              </div>
            </div>

          </div>

          {/* 2. Ingredients Section */}
          <div id="ingredients" className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm scroll-mt-24">
            <h2 className="text-lg font-black text-gray-900 mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#024ad8] rounded-full"></span>
              Thành phần hoạt chất
            </h2>
            
            <div className="overflow-hidden border border-gray-100 rounded-2xl">
              <table className="min-w-full divide-y divide-gray-100 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3.5 text-left font-black text-gray-800 uppercase tracking-wider text-xs">Tên hoạt chất</th>
                    <th className="px-6 py-3.5 text-left font-black text-gray-800 uppercase tracking-wider text-xs">Hàm lượng</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100 font-semibold text-gray-700">
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">Năng lượng</td>
                    <td className="px-6 py-4">270 kcal</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">Protein (Đạm)</td>
                    <td className="px-6 py-4">12.5 g</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">HMB</td>
                    <td className="px-6 py-4">1.2 g</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">YBG (Beta-glucan từ nấm men)</td>
                    <td className="px-6 py-4">0.3 g</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">Vitamin A, D3, C, E, K1</td>
                    <td className="px-6 py-4">Bổ sung đầy đủ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Benefits Section */}
          <div id="benefits" className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm scroll-mt-24">
            <h2 className="text-lg font-black text-gray-900 mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#024ad8] rounded-full"></span>
              Công dụng
            </h2>
            <div className="text-sm text-gray-700 font-semibold leading-relaxed whitespace-pre-line space-y-2">
              <p>💪 **Hỗ trợ phục hồi sức khỏe nhanh chóng:** Cung cấp đầy đủ năng lượng cho người bệnh, người cao tuổi ăn uống kém hoặc đang trong giai đoạn hồi phục.</p>
              <p>🛡 **Tăng cường hệ miễn dịch tự nhiên:** Chứa hệ dưỡng chất StrengthPro với thành phần YBG cải tiến giúp hỗ trợ đề kháng tối ưu.</p>
              <p>🧬 **Bảo vệ và tái tạo khối cơ:** Hàm lượng HMB cao làm giảm suy thoái cơ bắp do tuổi tác, giúp cơ thể dẻo dai khỏe mạnh hơn.</p>
            </div>
          </div>

          {/* 4. Dosage Section */}
          <div id="dosage" className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm scroll-mt-24">
            <h2 className="text-lg font-black text-gray-900 mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#024ad8] rounded-full"></span>
              Liều dùng & Cách dùng
            </h2>
            <div className="text-sm text-gray-700 font-semibold leading-relaxed space-y-2">
              <p>**Cách dùng:** Lắc đều chai trước khi uống. Sản phẩm ngon hơn khi uống lạnh. Dùng trực tiếp.</p>
              <p>**Liều dùng:** Khuyên dùng 2 chai mỗi ngày hoặc theo hướng dẫn chi tiết của bác sĩ / dược sĩ chuyên môn.</p>
            </div>
          </div>

          {/* 5. Side Effects Section */}
          <div id="side-effects" className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm scroll-mt-24">
            <h2 className="text-lg font-black text-gray-900 mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#024ad8] rounded-full"></span>
              Tác dụng phụ
            </h2>
            <p className="text-sm text-gray-600 font-semibold">
              Hiện tại chưa có ghi nhận về tác dụng phụ nghiêm trọng từ nhà sản xuất khi sử dụng đúng liều lượng chỉ định. Tuy nhiên, nếu phát hiện bất kỳ triệu chứng dị ứng lạ nào (như mẩn ngứa, tiêu chảy kéo dài), hãy ngưng sử dụng ngay và liên hệ dược sĩ chuyên môn.
            </p>
          </div>

          {/* 6. Precautions Section */}
          <div id="precautions" className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm scroll-mt-24">
            <h2 className="text-lg font-black text-gray-900 mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#024ad8] rounded-full"></span>
              Lưu ý y khoa
            </h2>
            <div className="text-sm text-gray-700 leading-relaxed bg-amber-50 border border-amber-100 rounded-2xl p-4 text-amber-900 font-semibold">
              ⚠️ Không dùng cho người bị bệnh galactosemia. Không dùng qua đường tĩnh mạch. Không dùng cho trẻ em trừ khi có hướng dẫn cụ thể từ bác sĩ hoặc các chuyên viên y tế chuyên môn.
            </div>
          </div>

          {/* 7. Storage Section */}
          <div id="storage" className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm scroll-mt-24">
            <h2 className="text-lg font-black text-gray-900 mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#024ad8] rounded-full"></span>
              Bảo quản
            </h2>
            <p className="text-sm text-gray-600 font-semibold">
              Bảo quản chai chưa mở ở nhiệt độ phòng. Sau khi mở nắp, đậy kín và bảo quản tủ lạnh (2-8°C), nên sử dụng hết trong vòng 24 giờ. Tránh ánh nắng mặt trời trực tiếp.
            </p>
          </div>

        </div>

      </div>

      {/* Related Products Section */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#024ad8] rounded-full"></span>
            Sản phẩm liên quan
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-gray-100 p-3.5 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group">
                <Link href={`/san-pham/${p.slug}`} className="block cursor-pointer">
                  <div className="bg-gray-50 aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                    <img 
                      src={p.imageUrl} 
                      alt={p.name} 
                      className="w-full h-full object-contain p-2 mix-blend-multiply"
                    />
                  </div>
                </Link>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/san-pham/${p.slug}`} className="block hover:underline">
                      <h4 className="text-[11px] font-bold text-gray-900 leading-tight line-clamp-2 min-h-[30px] group-hover:text-[#024ad8] transition-colors text-left">
                        {p.name}
                      </h4>
                    </Link>
                    <div className="flex flex-col mt-1.5 text-left">
                      <div className="flex items-baseline gap-1">
                        <strong className="text-[13px] font-black text-[#024ad8]">{formatPrice(p.price)}</strong>
                        <span className="text-[9px] text-gray-400 font-semibold">/ {p.unit}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      addToCart({
                        id: `related-${p.id}`,
                        dbId: p.id,
                        name: p.name,
                        price: p.price,
                        unit: p.unit,
                        imageUrl: p.imageUrl,
                        activeIngredient: p.name,
                        isAvailable: true
                      }, 1);
                      triggerToast(`Đã thêm ${p.name} vào giỏ hàng.`);
                    }}
                    className="w-full bg-[#024ad8]/5 hover:bg-[#024ad8] text-[#024ad8] hover:text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors uppercase tracking-wider border border-[#024ad8]/10"
                  >
                    Chọn mua
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
