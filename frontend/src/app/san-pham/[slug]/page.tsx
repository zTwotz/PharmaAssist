import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ProductDetailClient from './ProductDetailClient';
import { ChevronRight } from 'lucide-react';

export const revalidate = 60; // Cache page for 60 seconds

// Type definitions matching backend DTO
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

async function fetchProduct(slug: string): Promise<ProductDetailData | null> {
  if (!slug) return null;
  let targetSlug = slug;
  // Map Long Chau URL slug alias to database full slug
  if (slug === 'vien-uong-sac-dep-truong-tho-va-tre-hoa-da-nmn-pqq-kenko-60-v' || slug.includes('nmn-pqq-kenko')) {
    targetSlug = 'vien-uong-ho-tro-chong-lao-hoa-cai-thien-lan-da-va-tang-de-khang-nmn-pqq-kenko-60-vien';
  }

  // Fallback mocks for seasonal products not in DB
  if (targetSlug === 'gel-boi-mieng-aloclair-plus-alliance-8ml') {
    return {
      id: 99001,
      code: 'ALOCLAIRGEL8',
      name: 'Gel bôi miệng Aloclair Plus Alliance (8ml)',
      slug: 'gel-boi-mieng-aloclair-plus-alliance-8ml',
      productType: 'Thực phẩm chức năng',
      shortDescription: 'Hỗ trợ làm dịu cơn đau do nhiệt miệng, tay chân miệng nhanh chóng bằng màng bảo vệ vết loét.',
      description: 'Gel bôi miệng Aloclair Plus giúp làm giảm đau nhanh chóng và thúc đẩy lành vết thương trong các trường hợp nhiệt miệng, loét miệng, chấn thương khoang miệng do niềng răng hoặc răng giả gây ra.',
      status: 'AVAILABLE',
      brand: { id: 991, code: 'ALLIANCE', name: 'Alliance', slug: 'alliance', logoUrl: null },
      category: { id: 992, code: 'NHIETMIENG', name: 'Chăm sóc răng miệng', slug: 'cham-soc-rang-mieng' },
      manufacturer: { id: 993, code: 'ALLIANCE_MFG', name: 'Alliance Pharma', country: 'Vương Quốc Anh' },
      images: [
        { id: 990011, imageUrl: 'https://cdn.nhathuoclongchau.com.vn/v1/static/CHAI_XIT_NHIET_MIENG_TAY_CHAN_MIENG_ALOCLAIR_PLUS_15_ML_00502899_7_c7528bf5e9.jpg', altText: 'Aloclair Gel', isPrimary: true, sortOrder: 1 }
      ],
      variants: [
        { id: 990012, sku: 'ALOCLAIRGEL8-T8', variantName: 'Tuýp 8ml', sellingPrice: 175000, unit: 'tuýp', status: 'AVAILABLE' }
      ],
      medicineDetail: {
        id: 990013,
        medicineCode: 'ALOCLAIRGEL8_MED',
        registrationNumber: 'Đang cập nhật',
        requiresPrescription: false,
        usageNote: 'Thoa trực tiếp vào vết loét miệng.',
        storageInstruction: 'Bảo quản nơi khô ráo thoáng mát, tránh ánh sáng trực tiếp.',
        shelfLifeMonths: 36,
        dosageForm: 'Gel bôi miệng',
        ingredients: [
          { name: 'Aloe vera', strength: 'Phù hợp' },
          { name: 'Hyaluronic acid', strength: 'Phù hợp' },
          { name: 'Glycyrrhetinic acid', strength: 'Phù hợp' }
        ]
      }
    };
  }

  if (targetSlug === 'gel-boi-su-bac-khang-khuan-lam-sach-da-25g') {
    return {
      id: 99002,
      code: 'SUBACGEL25',
      name: 'Gel bôi ngoài da Su Bạc kháng khuẩn, làm sạch da (25g)',
      slug: 'gel-boi-su-bac-khang-khuan-lam-sach-da-25g',
      productType: 'Thực phẩm chức năng',
      shortDescription: 'Giúp kháng khuẩn, làm sạch da, đẩy nhanh quá trình lành vết thương và ngăn ngừa sẹo.',
      description: 'Gel bôi da Su Bạc sử dụng công nghệ Nano Bạc kết hợp Chitosan và Sầu đâu giúp kháng khuẩn diện rộng, làm dịu vết mẩn ngứa, côn trùng cắn và phòng ngừa sẹo thâm cực kỳ hiệu quả cho bé khi bị thủy đậu, chân tay miệng.',
      status: 'AVAILABLE',
      brand: { id: 994, code: 'AAU', name: 'Á Âu', slug: 'a-au', logoUrl: null },
      category: { id: 995, code: 'DALIEU', name: 'Da liễu', slug: 'da-lieu' },
      manufacturer: { id: 996, code: 'IMC', name: 'IMC Việt Nam', country: 'Việt Nam' },
      images: [
        { id: 990021, imageUrl: 'https://cdn.nhathuoclongchau.com.vn/v1/static/00006940_su_bac_gel_lam_sach_sat_khuan_da_8596_63aa_large_5e8c66eecc.jpg', altText: 'Su Bac Gel', isPrimary: true, sortOrder: 1 }
      ],
      variants: [
        { id: 990022, sku: 'SUBAC-H25', variantName: 'Hộp 25g', sellingPrice: 150000, unit: 'hộp', status: 'AVAILABLE' }
      ],
      medicineDetail: {
        id: 990023,
        medicineCode: 'SUBACGEL25_MED',
        registrationNumber: 'Đang cập nhật',
        requiresPrescription: false,
        usageNote: 'Bôi lên vùng da bị tổn thương sau khi làm sạch bằng khăn ấm.',
        storageInstruction: 'Bảo quản dưới 30 độ C, tránh ẩm.',
        shelfLifeMonths: 36,
        dosageForm: 'Gel bôi ngoài da',
        ingredients: [
          { name: 'Nano bạc', strength: 'Phù hợp' },
          { name: 'Chitosan', strength: 'Phù hợp' },
          { name: 'Dịch chiết sầu đâu', strength: 'Phù hợp' }
        ]
      }
    };
  }

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  
  // 1. Try fetching from NestJS Backend API
  try {
    const res = await fetch(`${apiBaseUrl}/products/${targetSlug}`, {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      return await res.json();
    }
    console.warn(`NestJS API product details returned non-OK status: ${res.status}`);
  } catch (err) {
    console.error(`Failed to fetch from NestJS API at ${apiBaseUrl}:`, err);
  }

  // 2. Fallback to Supabase client directly
  console.log(`Attempting fallback direct query to Supabase for slug: ${targetSlug}`);
  try {
    const { data: rawProduct, error } = await supabase
      .from('products')
      .select(`
        id, code, name, slug, product_type, short_description, description, status,
        brand:brands (id, code, name, slug, logo_url),
        category:product_categories (id, code, name, slug),
        manufacturer:manufacturers (id, code, name, country:countries (name)),
        images:product_images (id, image_url, alt_text, is_primary, sort_order),
        variants:product_variants (id, sku, variant_name, selling_price, status, unit:medicine_units (name)),
        medicines (
          id, medicine_code, registration_number, requires_prescription, usage_note, storage_instruction, shelf_life_months,
          dosageForm:dosage_forms (name),
          ingredients:medicine_ingredients (
            strength,
            activeIngredient:active_ingredients (name)
          )
        )
      `)
      .eq('slug', targetSlug)
      .single();

    if (error || !rawProduct) {
      console.error('Error fetching directly from Supabase:', error);
      return null;
    }

    const p = rawProduct as any;
    const brandData = Array.isArray(p.brand) ? p.brand[0] : p.brand;
    const categoryData = Array.isArray(p.category) ? p.category[0] : p.category;
    const manufacturerData = Array.isArray(p.manufacturer) ? p.manufacturer[0] : p.manufacturer;
    const medicine = Array.isArray(p.medicines) ? p.medicines[0] : p.medicines;
    
    // Map raw Supabase structure to DTO format
    return {
      id: p.id,
      code: p.code,
      name: p.name,
      slug: p.slug,
      productType: p.product_type,
      shortDescription: p.short_description,
      description: p.description,
      status: p.status,
      brand: brandData ? {
        id: brandData.id,
        code: brandData.code,
        name: brandData.name,
        slug: brandData.slug,
        logoUrl: brandData.logo_url || null,
      } : null,
      category: categoryData ? {
        id: categoryData.id,
        code: categoryData.code,
        name: categoryData.name,
        slug: categoryData.slug,
      } : {
        id: 0,
        code: 'unknown',
        name: 'Sản phẩm',
        slug: 'san-pham'
      },
      manufacturer: manufacturerData ? {
        id: manufacturerData.id,
        code: manufacturerData.code,
        name: manufacturerData.name,
        country: (Array.isArray(manufacturerData.country) ? manufacturerData.country[0]?.name : manufacturerData.country?.name) || 'Đang cập nhật',
      } : null,
      images: (p.images || []).map((img: any) => ({
        id: img.id,
        imageUrl: img.image_url,
        altText: img.alt_text,
        isPrimary: img.is_primary,
        sortOrder: img.sort_order,
      })),
      variants: (p.variants || []).map((v: any) => ({
        id: v.id,
        sku: v.sku,
        variantName: v.variant_name,
        sellingPrice: Number(v.selling_price),
        unit: v.unit?.name || 'viên',
        status: v.status,
      })),
      medicineDetail: medicine ? {
        id: medicine.id,
        medicineCode: medicine.medicine_code,
        registrationNumber: medicine.registration_number,
        requiresPrescription: medicine.requires_prescription,
        usageNote: medicine.usage_note,
        storageInstruction: medicine.storage_instruction,
        shelfLifeMonths: medicine.shelf_life_months,
        dosageForm: (Array.isArray(medicine.dosageForm) ? medicine.dosageForm[0]?.name : medicine.dosageForm?.name) || 'Đang cập nhật',
        ingredients: (medicine.ingredients || []).map((ing: any) => {
          const actIng = Array.isArray(ing.activeIngredient) ? ing.activeIngredient[0] : ing.activeIngredient;
          return {
            name: actIng?.name || 'Hoạt chất',
            strength: ing.strength,
            note: ing.note,
          };
        }),
      } : null,
    };
  } catch (dbErr) {
    console.error('Direct Supabase fetch encountered fatal error:', dbErr);
  }

  return null;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  const product = await fetchProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-16">
      {/* Dynamic Breadcrumbs */}
      <div className="bg-white border-b border-gray-100/60 sticky top-0 z-20 lg:relative lg:top-auto">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center gap-1.5 text-xs font-semibold text-gray-500 overflow-x-auto scrollbar-none whitespace-nowrap">
          <Link href="/" className="hover:text-[#024ad8] transition-colors">Trang chủ</Link>
          <ChevronRight size={12} className="text-gray-300 shrink-0" />
          
          <Link 
            href={`/${product.category.slug}`} 
            className="hover:text-[#024ad8] transition-colors"
          >
            {product.category.name}
          </Link>
          <ChevronRight size={12} className="text-gray-300 shrink-0" />
          
          <span className="text-gray-900 font-bold truncate max-w-[200px] sm:max-w-sm">
            {product.name}
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <ProductDetailClient product={product} />
      </div>
    </div>
  );
}
