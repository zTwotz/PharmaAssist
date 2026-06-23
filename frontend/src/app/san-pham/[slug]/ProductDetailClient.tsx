'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import {
  ShoppingCart,
  CheckCircle,
  AlertTriangle,
  Package,
  FlaskConical,
  Info,
  Thermometer,
  Clock,
  Star,
  Truck,
  Shield,
  Plus,
  Minus,
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

interface ProductDetailData {
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
}

interface Props {
  product: ProductDetailData;
  relatedProducts: Array<{
    id: number;
    name: string;
    slug: string;
    imageUrl: string;
    price: number;
    unit: string;
  }>;
}

const formatPrice = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

export default function ProductDetailClient({ product, relatedProducts }: Props) {
  const { addToCart } = useCart();

  const sortedImages = [...product.images].sort((a, b) => {
    if (a.isPrimary) return -1;
    if (b.isPrimary) return 1;
    return a.sortOrder - b.sortOrder;
  });

  const [selectedImage, setSelectedImage] = useState(sortedImages[0]?.imageUrl || '');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const price = selectedVariant?.sellingPrice ?? 0;
  const unit = selectedVariant?.unit ?? 'Hộp';

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    addToCart(
      {
        id: `${product.id}-${selectedVariant.id}`,
        dbId: product.id,
        name: product.name,
        price: selectedVariant.sellingPrice,
        unit: selectedVariant.unit,
        imageUrl: sortedImages[0]?.imageUrl || '',
        activeIngredient:
          product.medicineDetail?.ingredients?.map((i) => i.name).join(', ') ||
          product.shortDescription ||
          product.name,
        isAvailable: product.status === 'AVAILABLE' || product.status === 'ACTIVE',
      },
      quantity
    );

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Main product section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left: Image Gallery */}
          <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-100">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100 mb-3">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://placehold.co/400x400?text=No+Image';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-24 h-24 text-gray-300" />
                </div>
              )}
              {product.medicineDetail?.requiresPrescription && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                  <AlertTriangle size={10} /> Cần đơn thuốc
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {sortedImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {sortedImages.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(img.imageUrl)}
                    className={`w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === img.imageUrl
                        ? 'border-[#024ad8]'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={img.imageUrl}
                      alt={img.altText || product.name}
                      className="w-full h-full object-contain p-1"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="p-6 flex flex-col gap-4">
            {/* Category badge */}
            <div className="flex items-center gap-2">
              <Link
                href={`/${product.category.slug}`}
                className="text-xs font-semibold text-[#024ad8] bg-[#024ad8]/8 px-3 py-1 rounded-full hover:bg-[#024ad8]/15 transition-colors"
              >
                {product.category.name}
              </Link>
              {product.brand && (
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {product.brand.name}
                </span>
              )}
            </div>

            {/* Product name */}
            <h1 className="text-xl md:text-2xl font-black text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating placeholder */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-gray-500 font-medium">5.0 (128 đánh giá)</span>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-[#024ad8]/5 to-blue-50 rounded-xl p-4">
              <div className="text-3xl font-black text-[#024ad8]">{formatPrice(price)}</div>
              <div className="text-sm text-gray-500 mt-0.5">
                Giá / <span className="font-semibold">{unit}</span>
              </div>
            </div>

            {/* Variant selection */}
            {product.variants.length > 1 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                  Quy cách đóng gói
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-3 py-2 rounded-lg border text-sm font-semibold transition-all ${
                        selectedVariant?.id === variant.id
                          ? 'border-[#024ad8] bg-[#024ad8] text-white shadow-sm'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-[#024ad8] hover:text-[#024ad8]'
                      }`}
                    >
                      {variant.variantName}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                Số lượng
              </span>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 hover:bg-gray-100 text-gray-600 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center text-sm font-bold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 hover:bg-gray-100 text-gray-600 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
              <span className="text-sm font-bold text-gray-900">
                = {formatPrice(price * quantity)}
              </span>
            </div>

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant || addedToCart}
              className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-base transition-all duration-300 shadow-md ${
                addedToCart
                  ? 'bg-green-500 text-white shadow-green-200'
                  : 'bg-[#024ad8] hover:bg-blue-700 text-white hover:shadow-blue-200 hover:shadow-lg active:scale-[0.98]'
              }`}
            >
              {addedToCart ? (
                <>
                  <CheckCircle size={20} /> Đã thêm vào giỏ hàng!
                </>
              ) : (
                <>
                  <ShoppingCart size={20} /> Thêm vào giỏ hàng
                </>
              )}
            </button>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Truck size={14} className="text-[#024ad8] shrink-0" />
                <span>Miễn phí vận chuyển đơn &gt;300k</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Shield size={14} className="text-green-500 shrink-0" />
                <span>Sản phẩm chính hãng 100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Short description */}
      {product.shortDescription && (
        <div className="bg-blue-50 border border-[#024ad8]/15 rounded-2xl p-5 flex gap-3">
          <Info size={20} className="text-[#024ad8] shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed font-medium">
            {product.shortDescription}
          </p>
        </div>
      )}

      {/* Medicine detail & Description in two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Medicine Details */}
        {product.medicineDetail && (
          <div className="space-y-4">
            {/* Ingredients */}
            {product.medicineDetail.ingredients?.length > 0 && (
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-3">
                <h2 className="font-bold text-gray-900 flex items-center gap-2 text-sm uppercase tracking-wide">
                  <FlaskConical size={16} className="text-[#024ad8]" /> Hoạt chất
                </h2>
                <div className="space-y-2">
                  {product.medicineDetail.ingredients.map((ing, idx) => (
                    <div key={idx} className="flex justify-between items-start gap-2 text-sm">
                      <span className="font-semibold text-gray-800">{ing.name}</span>
                      <span className="text-gray-500 text-right">{ing.strength}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other details */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-3">
              <h2 className="font-bold text-gray-900 flex items-center gap-2 text-sm uppercase tracking-wide">
                <Info size={16} className="text-[#024ad8]" /> Thông tin chi tiết
              </h2>
              <div className="space-y-2 text-sm">
                {product.medicineDetail.dosageForm && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Dạng bào chế</span>
                    <span className="font-semibold text-gray-800 text-right">
                      {product.medicineDetail.dosageForm}
                    </span>
                  </div>
                )}
                {product.manufacturer && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Nhà sản xuất</span>
                    <span className="font-semibold text-gray-800 text-right">
                      {product.manufacturer.name}
                    </span>
                  </div>
                )}
                {product.manufacturer?.country && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Xuất xứ</span>
                    <span className="font-semibold text-gray-800">{product.manufacturer.country}</span>
                  </div>
                )}
                {product.medicineDetail.shelfLifeMonths && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Clock size={12} /> Hạn sử dụng
                    </span>
                    <span className="font-semibold text-gray-800">
                      {product.medicineDetail.shelfLifeMonths} tháng
                    </span>
                  </div>
                )}
                {product.medicineDetail.storageInstruction && (
                  <div className="flex gap-2 pt-1 border-t border-gray-100">
                    <Thermometer size={14} className="text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {product.medicineDetail.storageInstruction}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Usage */}
            {product.medicineDetail.usageNote && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-2">
                <h2 className="font-bold text-amber-800 flex items-center gap-2 text-sm uppercase tracking-wide">
                  <AlertTriangle size={16} /> Liều dùng & Cách dùng
                </h2>
                <p className="text-sm text-amber-700 leading-relaxed">
                  {product.medicineDetail.usageNote}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Right: Description */}
        <div className={product.medicineDetail ? 'lg:col-span-2' : 'lg:col-span-3'}>
          {product.description && (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-4 text-base uppercase tracking-wide flex items-center gap-2">
                <Package size={16} className="text-[#024ad8]" /> Mô tả sản phẩm
              </h2>
              <div
                className="prose prose-sm max-w-none text-gray-700 prose-headings:text-gray-900 prose-a:text-[#024ad8]"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-black text-gray-900">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((related) => (
              <Link
                key={related.id}
                href={`/san-pham/${related.slug}`}
                className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-[#024ad8]/30 transition-all duration-300 overflow-hidden group"
              >
                <div className="aspect-square bg-gray-50 flex items-center justify-center p-3 overflow-hidden">
                  <img
                    src={related.imageUrl}
                    alt={related.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://placehold.co/200x200?text=No+Image';
                    }}
                  />
                </div>
                <div className="p-3 space-y-1">
                  <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug">
                    {related.name}
                  </p>
                  <p className="text-sm font-black text-[#024ad8]">
                    {formatPrice(related.price)}
                    <span className="text-xs font-medium text-gray-400 ml-1">/{related.unit}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
