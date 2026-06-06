"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import mappedImages from "./mapped_images.json";
import { 
  Search, 
  ShoppingCart, 
  User, 
  Phone, 
  MapPin, 
  Lock, 
  Check, 
  AlertTriangle, 
  Info, 
  ArrowRight, 
  ShieldCheck, 
  Heart,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ClipboardList,
  FileText,
  Clock,
  X,
  Eye,
  Activity,
  Shield,
  Brain,
  Droplets,
  Wind,
  Flame,
  Pill,
  Syringe
} from "lucide-react";

// Types
interface Medicine {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  isAvailable: boolean;
  activeIngredient: string;
  dosageForm: string;
  description: string;
  usage: string;
  sideEffects: string;
  imageUrl?: string;
  storage?: string;
}

// Mock Categories
const MOCK_CATEGORIES = [
  { id: "pain", name: "Giảm đau - hạ sốt", count: 12 },
  { id: "flu", name: "Cảm cúm - ho", count: 8 },
  { id: "digest", name: "Tiêu hóa", count: 15 },
  { id: "vitamins", name: "Vitamin & khoáng chất", count: 24 },
  { id: "dermatology", name: "Da liễu", count: 9 },
  { id: "cardio", name: "Tim mạch - huyết áp", count: 11 },
  { id: "device", name: "Thiết bị y tế", count: 6 },
  { id: "other", name: "Sản phẩm khác", count: 14 }
];

const FEATURED_CATEGORIES = [
  {
    id: "brain",
    name: "Thần kinh não",
    filterName: "Thần kinh não",
    count: 55,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 9.5c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5v1.5c0 1.5-1 2.5-2.5 2.5s-2.5-1-2.5-2.5V9.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 9.5c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5h5c2.5 0 4.5-2 4.5-4.5s-2-4.5-4.5-4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7V3m-4 1c0-.5.5-1 1-1h6c.5 0 1 .5 1 1" />
      </svg>
    )
  },
  {
    id: "vitamin",
    name: "Vitamin & Khoáng chất",
    filterName: "Vitamin & Khoáng chất",
    count: 83,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="7" y="5" width="10" height="14" rx="2" />
        <line x1="7" y1="10" x2="17" y2="10" />
        <circle cx="12" cy="14" r="1.5" />
        <text x="12" y="8.5" textAnchor="middle" fontSize="4.5" fontWeight="900" fill="currentColor" stroke="none">VIT</text>
      </svg>
    )
  },
  {
    id: "hormone",
    name: "Sinh lý - Nội tiết tố",
    filterName: "Sinh lý - Nội tiết tố",
    count: 44,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="5" y="8" width="6" height="11" rx="1.5" />
        <rect x="13" y="8" width="6" height="11" rx="1.5" />
        <circle cx="8" cy="12" r="1" />
        <circle cx="16" cy="12" r="1" />
        <text x="8" y="17" textAnchor="middle" fontSize="5" fontWeight="900" fill="currentColor" stroke="none">♀</text>
        <text x="16" y="17" textAnchor="middle" fontSize="5" fontWeight="900" fill="currentColor" stroke="none">♂</text>
        <path d="M8 5v3M16 5v3" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: "cardio",
    name: "Tim mạch - Huyết áp",
    filterName: "Tim mạch - Huyết áp",
    count: 21,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        <path d="M6 9.5h2.5l1.5-2.5 1.5 5 1.5-4 1.5 1.5h2.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: "immune",
    name: "Miễn dịch - Đề kháng",
    filterName: "Miễn dịch - Đề kháng",
    count: 48,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    id: "digest",
    name: "Tiêu hóa",
    filterName: "Tiêu hóa",
    count: 70,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 9c0-1.5 2-3 4-3s4 1.5 4 3c0 3 6-1 6 3v4c0 3-4 5-8 5s-6-2-6-5V9z" />
        <path d="M9 12h6M9 15h3" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: "skin-solution",
    name: "Giải pháp làn da",
    filterName: "Giải pháp làn da",
    count: 71,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4 14s2-2 4-2 4 2 4 2 2-2 4-2 4 2 4 2" strokeLinecap="round" />
        <path d="M4 18s2-2 4-2 4 2 4 2 2-2 4-2 4 2 4 2" strokeLinecap="round" />
        <rect x="10" y="4" width="4" height="5" rx="2" fill="currentColor" opacity="0.1" />
        <path d="M12 3.5v6M9.5 6h5" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    id: "face-care",
    name: "Chăm sóc da mặt",
    filterName: "Chăm sóc da mặt",
    count: 158,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="9" cy="10" rx="1.5" ry="2" fill="currentColor" />
        <ellipse cx="15" cy="10" rx="1.5" ry="2" fill="currentColor" />
        <path d="M8 15s1.5 2 4 2 4-2 4-2" strokeLinecap="round" />
        <circle cx="5" cy="6" r="0.8" fill="currentColor" />
        <circle cx="19" cy="6" r="0.8" fill="currentColor" />
      </svg>
    )
  },
  {
    id: "beauty",
    name: "Hỗ trợ làm đẹp",
    filterName: "Hỗ trợ làm đẹp",
    count: 18,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 4c-3.333 0-5 2.5-5 5.5S8.667 15 12 15s5-2 5-5.5S15.333 4 12 4z" />
        <path d="M7 11.5c.5.5 1.5.5 2 0s.5-1.5 0-2" />
        <circle cx="12" cy="9.5" r="1.5" fill="currentColor" />
      </svg>
    )
  },
  {
    id: "sex",
    name: "Hỗ trợ tình dục",
    filterName: "Hỗ trợ tình dục",
    count: 41,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="9" cy="14" r="4" />
        <line x1="9" y1="10" x2="9" y2="4" />
        <line x1="6" y1="7" x2="12" y2="7" />
        <circle cx="15" cy="9" r="4" />
        <line x1="18" y1="9" x2="22" y2="5" />
        <line x1="18" y1="5" x2="22" y2="5" />
        <line x1="22" y1="9" x2="22" y2="5" />
      </svg>
    )
  },
  {
    id: "milk",
    name: "Sữa",
    filterName: "Sữa",
    count: 43,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="7" y="6" width="10" height="14" rx="2" />
        <ellipse cx="12" cy="6" rx="4" ry="1.5" />
        <path d="M7 10h10" />
        <circle cx="12" cy="14" r="2.5" fill="currentColor" opacity="0.1" />
      </svg>
    )
  },
  {
    id: "monitoring",
    name: "Dụng cụ theo dõi",
    filterName: "Dụng cụ theo dõi",
    count: 95,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4.5 4v5a7.5 7.5 0 0015 0V4" />
        <path d="M12 16.5v4.5M10 21h4" />
        <circle cx="4.5" cy="4" r="1" fill="currentColor" />
        <circle cx="19.5" cy="4" r="1" fill="currentColor" />
      </svg>
    )
  }
];

// Mock Medicines
const MOCK_MEDICINES: Medicine[] = [
  {
    id: "MED001",
    name: "Paracetamol 500mg",
    category: "Giảm đau - hạ sốt",
    price: 1500,
    unit: "viên",
    isAvailable: true,
    activeIngredient: "Paracetamol 500mg",
    dosageForm: "Viên nén",
    description: "Thuốc giảm đau nhanh và hạ sốt hiệu quả cho người lớn và trẻ em trên 12 tuổi.",
    usage: "Uống 1-2 viên mỗi 4-6 giờ khi cần thiết, không quá 8 viên/ngày.",
    sideEffects: "Ít gặp, có thể gây dị ứng da, phát ban hoặc tổn thương gan nếu dùng quá liều kéo dài."
  },
  {
    id: "MED002",
    name: "Ibuprofen 400mg",
    category: "Giảm đau - hạ sốt",
    price: 3000,
    unit: "viên",
    isAvailable: true,
    activeIngredient: "Ibuprofen 400mg",
    dosageForm: "Viên nén bao phim",
    description: "Thuốc kháng viêm không steroid (NSAID), giảm đau và giảm viêm xương khớp hiệu quả.",
    usage: "Uống 1 viên sau ăn, ngày 2-3 lần. Không dùng cho người loét dạ dày tiến triển.",
    sideEffects: "Rối loạn tiêu hóa, đau dạ dày, buồn nôn, đau đầu, chóng mặt."
  },
  {
    id: "MED003",
    name: "Vitamin C 500mg",
    category: "Vitamin & khoáng chất",
    price: 2000,
    unit: "viên",
    isAvailable: true,
    activeIngredient: "Acid Ascorbic 500mg",
    dosageForm: "Viên sủi",
    description: "Bổ sung Vitamin C giúp tăng cường sức đề kháng, hỗ trợ hệ miễn dịch và chống oxy hóa.",
    usage: "Hòa tan 1 viên trong 200ml nước đun sôi để nguội, uống 1 viên/ngày vào buổi sáng.",
    sideEffects: "Dùng liều cao kéo dài có thể gây sỏi thận, rối loạn tiêu hóa nhẹ."
  },
  {
    id: "MED004",
    name: "Omeprazole 20mg",
    category: "Tiêu hóa",
    price: 3500,
    unit: "viên",
    isAvailable: true,
    activeIngredient: "Omeprazole 20mg",
    dosageForm: "Viên nang tan trong ruột",
    description: "Thuốc ức chế bơm proton (PPI), điều trị loét dạ dày - tá tràng và trào ngược dạ dày thực quản (GERD).",
    usage: "Uống 1 viên trước bữa ăn sáng 30 phút, nuốt nguyên viên không nhai nát.",
    sideEffects: "Đau đầu, tiêu chảy, táo bón, đau bụng, buồn nôn."
  },
  {
    id: "MED005",
    name: "Loratadine 10mg",
    category: "Cảm cúm - ho",
    price: 2500,
    unit: "viên",
    isAvailable: false,
    activeIngredient: "Loratadine 10mg",
    dosageForm: "Viên nén",
    description: "Thuốc kháng histamin thế hệ 2, điều trị viêm mũi dị ứng, hắt hơi, sổ mũi và ngứa ngáy nổi mề đay.",
    usage: "Uống 1 viên/ngày, uống cùng hoặc ngoài bữa ăn.",
    sideEffects: "Mệt mỏi, khô miệng, đau đầu nhẹ, ít gây buồn ngủ hơn thế hệ 1."
  },
  {
    id: "MED006",
    name: "Telfast 180mg",
    category: "Cảm cúm - ho",
    price: 9000,
    unit: "viên",
    isAvailable: true,
    activeIngredient: "Fexofenadine hydrochloride 180mg",
    dosageForm: "Viên nén bao phim",
    description: "Thuốc kháng dị ứng thế hệ mới hiệu quả cao, điều trị các triệu chứng viêm mũi dị ứng kéo dài.",
    usage: "Uống 1 viên/ngày với nước lọc. Không dùng chung với nước trái cây.",
    sideEffects: "Buồn ngủ nhẹ, mệt mỏi, khô miệng, đau đầu."
  },
  {
    id: "MED007",
    name: "Dung dịch sát khuẩn tay",
    category: "Sản phẩm khác",
    price: 25000,
    unit: "chai",
    isAvailable: true,
    activeIngredient: "Ethanol 70%, Glycerin, Aloe Vera",
    dosageForm: "Dung dịch xịt tay khô",
    description: "Nước rửa tay nhanh giúp diệt khuẩn 99.9% tức thì, giữ ẩm da tay mềm mại.",
    usage: "Xịt trực tiếp một lượng vừa đủ vào lòng bàn tay, xoa đều các ngón tay cho đến khi khô.",
    sideEffects: "Có thể gây khô da nếu dùng quá nhiều lần, tránh tiếp xúc trực tiếp với mắt."
  },
  {
    id: "MED008",
    name: "Nhiệt kế điện tử hồng ngoại",
    category: "Thiết bị y tế",
    price: 150000,
    unit: "cái",
    isAvailable: true,
    activeIngredient: "Cảm biến nhiệt hồng ngoại hồng ngoại",
    dosageForm: "Thiết bị điện tử cầm tay",
    description: "Đo nhiệt độ trán không tiếp xúc trong 1 giây, độ chính xác cao, có cảnh báo sốt bằng âm thanh.",
    usage: "Hướng cảm biến vào giữa trán ở khoảng cách 1-3cm, nhấn nút đo và đọc kết quả trên màn hình LCD.",
    sideEffects: "Không có tác dụng phụ y học."
  }
];

interface MegaProduct {
  name: string;
  price: number;
  unit: string;
  image: string;
  discount?: number;
  originalPrice?: number;
}

interface MegaSubCategory {
  id: string;
  name: string;
  iconName: string;
  children: string[];
  featuredProducts: MegaProduct[];
}

interface MegaCategory {
  id: string;
  name: string;
  subCategories: MegaSubCategory[];
}

const NAV_MEGA_MENU_DATA: MegaCategory[] = [
  {
    id: "supplements",
    name: "Thực phẩm chức năng",
    subCategories: [
      {
        id: "supplements-vitamin",
        name: "Vitamin & Khoáng chất",
        iconName: "Activity",
        children: ["Dầu cá - Omega 3", "Kẽm - Magie", "Vitamin tổng hợp", "Canxi & Vitamin D", "Vitamin C", "Xem thêm"],
        featuredProducts: [
          { name: "Viên uống hỗ trợ sức khoẻ tim mạch, giảm mỡ máu, tốt...", price: 330000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_08880_009cf2ede8.jpg" },
          { name: "Viên uống bổ sung canxi, giúp tăng chiều cao cho trẻ...", price: 480000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00001517_calcium_corbiere_5ml_sanofi_7413_5b35_large_dadec585bf.JPG" },
          { name: "Viên uống bổ sung vitamin và khoáng chất cho cơ thể,...", price: 410000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/IMG_2328_89edc7895e.jpg" },
          { name: "Siro bổ sung canxi & vitamin D3, K2 cho cơ thể Canxi-...", price: 115000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_00511_937fafcbf1.jpg" },
          { name: "Siro bổ sung chất xơ, tăng cường sức đề kháng cho trẻ...", price: 480000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00502536_vien_nghe_mat_ong_royal_honey_250g_9512_637e_large_7ef79609f0.jpg" }
        ]
      },
      {
        id: "supplements-immunity",
        name: "Miễn dịch - Đề kháng",
        iconName: "Shield",
        children: [],
        featuredProducts: [
          { name: "Dung dịch hỗ trợ phát triển xương, răng cho trẻ D3...", price: 270000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/IMG_2328_89edc7895e.jpg" },
          { name: "Siro giúp xương răng chắc khỏe, bổ sung vitamin D3 +...", price: 396000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00502210_vien_uong_bo_sung_dau_hoa_anh_thao_cho_phu_nu_tien_man_kinh_kenkan_seishun_primrose_60v_5885_6334_large_f92ec17740.jpg" },
          { name: "Viên sủi bổ sung calci và vitamin cho trẻ em Kudos Kids...", price: 135150, unit: "Tuýp", discount: 15, originalPrice: 159000, image: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_00507_429b55cc3c.jpg" },
          { name: "Siro giúp bổ sung lợi khuẩn, tốt cho đường ruột Immun...", price: 600000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/Optibac_FW_30_Front_Panel_With_The_Format_SQ_Pack_Shot_VIETNAM_e7e7290a6d.png" },
          { name: "Viên sủi tăng cường sức đề kháng cho cơ thể Optimax...", price: 129000, unit: "Tuýp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/coenzyme_q10_2x15_doppelherz_00051039_6_b63bec1ce6.png" }
        ]
      },
      {
        id: "supplements-hormone",
        name: "Sinh lý - Nội tiết tố",
        iconName: "Flame",
        children: ["Sinh lý nam", "Cân bằng nội tiết tố", "Sinh lý nữ", "Tiền mãn kinh - mãn kinh"],
        featuredProducts: [
          { name: "Viên uống bổ sung lợi khuẩn, D-mannose, việt quất...", price: 685000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00000780_sam_agela_gold_dep_da_can_bang_noi_tiet_to_nu_5615_62af_large_8eba87f31b.jpg" },
          { name: "Viên uống hỗ trợ bổ thận, tăng cường sinh lực Sâm Nhu...", price: 125000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00500768_mens_ginseng_alipas_new_ecogreen_60v_1645_62b5_large_ceb7d7acd7.jpg" },
          { name: "Viên uống hỗ trợ tăng cường sinh lý và tăng khả năng...", price: 1300000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00028815_alipas_new_ecogreen_30v_7132_5f99_large_8101b96b1b.JPG" },
          { name: "Viên uống hỗ trợ tăng sinh lý nữ, tăng cường nội tiết tố n...", price: 660000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00502210_vien_uong_bo_sung_dau_hoa_anh_thao_cho_phu_nu_tien_man_kinh_kenkan_seishun_primrose_60v_5885_6334_large_f92ec17740.jpg" },
          { name: "Viên uống giúp bổ thận, tráng dương, tăng cường sinh l...", price: 660000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00005685_tinh_chat_hau_oyster_plus_tang_cuong_sinh_luc_phai_manh_3213_62ae_large_c5942edd08.jpg" }
        ]
      },
      {
        id: "supplements-eye",
        name: "Mắt - Thị lực",
        iconName: "Eye",
        children: ["Mỏi mắt, khô mắt", "Tăng cường thị lực"],
        featuredProducts: [
          { name: "Viên uống bổ mắt Wit Ecogreen (30 viên)", price: 330000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00020710_dasbrain_pharmametics_30v_1177_6065_large_49dd64ad5b.jpg" },
          { name: "Viên uống hỗ trợ bổ mắt Blackmores Macu-Vision (125 viên)", price: 540000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00005468_ocuvite_vitamin_bo_mat_cua_my_4233_62b1_large_619ecef744.jpg" },
          { name: "Nước nhỏ mắt Rohto Vita 40 bổ sung vitamin (12ml)", price: 35000, unit: "Chai", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_03550_8a7532c9b1.jpg" },
          { name: "Dầu cá tự nhiên Omega-3 Fish Oil 1000mg Blackmores", price: 360000, unit: "Lọ", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_00511_937fafcbf1.jpg" },
          { name: "Viên uống cải thiện cận thị Ocuvite Lutein (60 viên)", price: 420000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00345343_coq10_my_vien_uong_bo_tim_mach_2605_5c45_large_985993d8bd.jpg" }
        ]
      },
      {
        id: "supplements-digest",
        name: "Tiêu hóa",
        iconName: "ClipboardList",
        children: ["Men vi sinh", "Dạ dày, tá tràng", "Đại tràng", "Nhuận tràng, táo bón", "Khó tiêu", "Hỗ trợ ăn ngon"],
        featuredProducts: [
          { name: "Cốm vi sinh bổ sung lợi khuẩn đường ruột Lacto Biomin...", price: 149000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/Optibac_FW_30_Front_Panel_With_The_Format_SQ_Pack_Shot_VIETNAM_e7e7290a6d.png" },
          { name: "Siro bổ sung lợi khuẩn cho hệ tiêu hóa, giảm rối loạn...", price: 560000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/hon_dich_uong_phosphalugel_26_goi_x_20g_sanofi_00005924_510123ad08.jpg" },
          { name: "Bào tử lợi khuẩn cho người tiêu chảy cấp tính, rối loạn tiêu...", price: 270000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09972_98633478a4.jpg" },
          { name: "Bột hòa tan giúp ăn ngon miệng, tăng cường tiêu hóa, c...", price: 360000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00502536_vien_nghe_mat_ong_royal_honey_250g_9512_637e_large_7ef79609f0.jpg" },
          { name: "Bào tử lợi khuẩn giúp giảm rối loạn tiêu hóa, cân bằng...", price: 167400, unit: "Hộp", discount: 10, originalPrice: 186000, image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00501706_vien_uong_bao_ve_gan_pharma_world_milk_thistle_60v_3202_6302_large_c595132390.jpg" }
        ]
      },
      {
        id: "supplements-brain",
        name: "Thần kinh não",
        iconName: "Brain",
        children: ["Bổ não", "Cải thiện trí nhớ", "Hỗ trợ giấc ngủ"],
        featuredProducts: [
          { name: "Viên uống bổ não Ginkgo Biloba 120mg Trunature (340 viên)", price: 450000, unit: "Lọ", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00003337_ginkgo_biloba_60mg_60v_natures_bounty_8579_63db_large_dc0d941fcd.jpg" },
          { name: "Viên uống OTiV cải thiện mất ngủ đau đầu (30 viên)", price: 330000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/sotivex_7860223cf5.jpg" },
          { name: "Viên uống giảm stress Melatonin 5mg Natrol (90 viên)", price: 280000, unit: "Lọ", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00003337_ad07a40b42.png" },
          { name: "Hoạt huyết dưỡng não Cerebrolysin Ampoules", price: 180000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00020710_dasbrain_pharmametics_30v_1177_6065_large_49dd64ad5b.jpg" },
          { name: "Dầu cá bổ não Brain DHA Kid Bio Island (60 viên)", price: 350000, unit: "Lọ", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_08098_a8caaa2d58.jpg" }
        ]
      },
      {
        id: "supplements-beauty",
        name: "Hỗ trợ làm đẹp",
        iconName: "Sparkles",
        children: ["Đẹp da collagen", "Ngừa lão hóa", "Trị mụn", "Sáng da"],
        featuredProducts: [
          { name: "Viên uống bổ sung Collagen Careline Bio-Marine (100 viên)", price: 390000, unit: "Lọ", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_08098_a8caaa2d58.jpg" },
          { name: "Viên uống hỗ trợ sáng da L-Glutathione 500mg Puritans", price: 550000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/WHT_Foam_50_g_Tube_3_D_8_7_2021_copy_884e0fad9a.jpg" },
          { name: "Viên uống hỗ trợ ngăn ngừa mụn trứng cá Acnacare", price: 120000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/123_a6e7c21fce.jpg" },
          { name: "Tinh chất Eucerin Elasticity Filler 3D giảm lão hóa", price: 980000, unit: "Chai", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/Acne_Foam_50g_73db9e4f86.jpg" },
          { name: "Viên uống Biotin 10,000mcg Puritan's Pride hỗ trợ tóc", price: 320000, unit: "Lọ", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00000780_sam_agela_gold_dep_da_can_bang_noi_tiet_to_nu_5615_62af_large_8eba87f31b.jpg" }
        ]
      },
      {
        id: "supplements-diabetes",
        name: "Đường huyết - Tiểu đường",
        iconName: "Droplets",
        children: ["Hạ đường huyết", "Dinh dưỡng tiểu đường", "Biến chứng tiểu đường"],
        featuredProducts: [
          { name: "Viên uống hỗ trợ hạ đường huyết Diabetna Nam Dược", price: 110000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00009750_tra_diabetna_giup_ha_duong_huyet_6138_5ffb_large_1a722bcc2c.JPG" },
          { name: "Sữa bột Glucerna Abbott hỗ trợ người tiểu đường 850g", price: 850000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09275_85d45ab994.jpg" },
          { name: "Viên uống ổn định đường huyết Advanced Glucose", price: 650000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_07923_9fb27ccf16.jpg" },
          { name: "Viên uống Chromium hỗ trợ tuyến tụy cải thiện insulin", price: 250000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00501706_vien_uong_bao_ve_gan_pharma_world_milk_thistle_60v_3202_6302_large_c595132390.jpg" },
          { name: "Trà dây túi lọc hỗ trợ ổn định đường ruột dạ dày", price: 45000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/tra_thao_moc_atiso_20_tui_loc_x_2g_datino_premium_tea_00040886_1_49f34e811c.jpg" }
        ]
      },
      {
        id: "supplements-heart-cardio",
        name: "Tim mạch - Huyết áp",
        iconName: "Heart",
        children: ["Huyết áp cao", "Mỡ máu", "Phòng đột quỵ", "Bổ tim Coenzyme Q10"],
        featuredProducts: [
          { name: "Viên uống hỗ trợ tim mạch Coenzyme Q10 Blackmores", price: 620000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00022519_co_q10_150mg_blackmores_30v_8058_634e_large_a509ba6b8e.jpg" },
          { name: "Viên uống Nattospes hỗ trợ phòng ngừa tai biến mạch máu", price: 165000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/IMG_6883_37a908aa20.jpg" },
          { name: "Dầu cá Fish Oil 1000mg Kirkland Signature (400 viên)", price: 480000, unit: "Chai", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_00511_937fafcbf1.jpg" },
          { name: "Viên uống hỗ trợ tim mạch Cardiocare Vitabiotics", price: 380000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00345343_coq10_my_vien_uong_bo_tim_mach_2605_5c45_large_985993d8bd.jpg" },
          { name: "Viên dầu cá tinh khiết Omega-3 Triple Strength Webbers", price: 590000, unit: "Lọ", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/coenzyme_q10_2x15_doppelherz_00051039_6_b63bec1ce6.png" }
        ]
      },
      {
        id: "supplements-respiratory",
        name: "Hô hấp - Tai mũi họng",
        iconName: "Wind",
        children: ["Bổ phế giảm ho", "Súc họng", "Xịt mũi", "Tăng đề kháng hô hấp"],
        featuredProducts: [
          { name: "Siro ho bổ phế Prospan Đức hỗ trợ giảm ho hiệu quả", price: 95000, unit: "Chai", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_00282_fd7adc8b01.png" },
          { name: "Xịt mũi nước muối biển Sterimar cho bé và gia đình", price: 110000, unit: "Chai", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_03550_8a7532c9b1.jpg" },
          { name: "Nước súc miệng diệt khuẩn sát trùng họng Betadine", price: 85000, unit: "Chai", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_01900_6fe44907dd.jpg" },
          { name: "Viên ngậm bổ phế giảm ho mát họng Nam Dược (24 viên)", price: 35000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00002923_eugica_candy_9939_62ad_large_491323344e.jpg" },
          { name: "Thuốc xịt mũi hỗ trợ giảm viêm xoang ngạt mũi Coldi-B", price: 25000, unit: "Chai", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00502210_vien_uong_bo_sung_dau_hoa_anh_thao_cho_phu_nu_tien_man_kinh_kenkan_seishun_primrose_60v_5885_6334_large_f92ec17740.jpg" }
        ]
      },
      {
        id: "supplements-joint-bone",
        name: "Cơ xương khớp",
        iconName: "Activity",
        children: ["Hỗ trợ xương khớp", "Hỗ trợ gout"],
        featuredProducts: [
          { name: "Viên bổ sung canxi, khoáng chất giảm nguy cơ loãng...", price: 920000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00001517_calcium_corbiere_5ml_sanofi_7413_5b35_large_dadec585bf.JPG" },
          { name: "Viên uống bổ sung canxi giúp xương răng chắc khỏe...", price: 347000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00032397_jex_the_he_moi_eco_60v_8040_62b0_large_0e07e3b7bb.jpg" },
          { name: "Viên uống giúp xương và răng chắc khỏe, giảm nguy c...", price: 599000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/thuoc_glucosamine_stada_1500mg_sachet_30_goi_00033098_b66b8e113b.png" },
          { name: "Viên uống giúp giảm đau khớp, khô khớp, bổ sung chấ...", price: 960000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00345343_coq10_my_vien_uong_bo_tim_mach_2605_5c45_large_985993d8bd.jpg" },
          { name: "Viên uống giúp tăng tiết dịch khớp, giảm thoái hóa khớp...", price: 650000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_00511_937fafcbf1.jpg" }
        ]
      }
    ]
  },
  {
    id: "cosmetics",
    name: "Dược mỹ phẩm",
    subCategories: [
      {
        id: "cosmetics-face",
        name: "Chăm sóc da mặt",
        iconName: "Sparkles",
        children: ["Sữa rửa mặt dịu nhẹ", "Kem chống nắng phổ rộng", "Serum trị mụn mờ thâm", "Kem dưỡng ẩm chuyên sâu", "Toner cấp ẩm phục hồi"],
        featuredProducts: [
          { name: "La Roche-Posay Anthelios SPF 50+", price: 485000, unit: "tuýp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_05612_2244c1f439.jpg" },
          { name: "Nước tẩy trang Bioderma Sensibio H2O 500ml", price: 425000, unit: "chai", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/1_f6ec63aa2a.jpg" },
          { name: "Sữa rửa mặt CeraVe Hydrating Cleanser", price: 370000, unit: "chai", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00502231_sua_rua_mat_lam_sach_sau_danh_cho_da_thuong_va_da_kho_cerave_hydrating_cleanser_mb094520_236ml_3680_6346_large_3e97372089.jpg" },
          { name: "Xịt khoáng Vichy Eau Thermale 150ml", price: 320000, unit: "chai", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00029018_vichy_eau_thermale_mineralizing_thermal_water_150ml_m5028921_xit_khoang_2470_6425_large_86f0c320a2.jpg" },
          { name: "Klairs Supple Preparation Facial Toner", price: 290000, unit: "chai", image: "" }
        ]
      },
      {
        id: "cosmetics-hair",
        name: "Chăm sóc tóc & da đầu",
        iconName: "Activity",
        children: ["Dầu gội trị gàu nấm", "Dầu gội ngăn rụng tóc", "Tinh chất mọc tóc", "Biotin đẹp tóc"],
        featuredProducts: [
          { name: "Dầu gội Vichy Dercos trị gàu 200ml", price: 395000, unit: "chai", image: "" },
          { name: "Dầu gội Megumi ngăn rụng tóc", price: 220000, unit: "chai", image: "" },
          { name: "Serum mọc tóc Thái Dương", price: 150000, unit: "chai", image: "" },
          { name: "Kẹo dẻo tóc Biotin Nature's Bounty", price: 320000, unit: "hộp", image: "" },
          { name: "Kem xả phục hồi tóc Tresemme Salon", price: 180000, unit: "chai", image: "" }
        ]
      }
    ]
  },
  {
    id: "medicines",
    name: "Thuốc",
    subCategories: [
      {
        id: "medicines-pain",
        name: "Giảm đau - Hạ sốt",
        iconName: "AlertTriangle",
        children: ["Paracetamol 500mg/650mg", "Ibuprofen kháng viêm", "Efferalgan viên sủi", "Giảm đau nửa đầu"],
        featuredProducts: [
          { name: "Panadol Extra giảm đau nhanh", price: 45000, unit: "hộp", image: "" },
          { name: "Hapacol 650mg hạ sốt cực nhanh", price: 38000, unit: "hộp", image: "" },
          { name: "Efferalgan 500mg sủi bọt", price: 52000, unit: "hộp", image: "" },
          { name: "Ibuprofen 400mg kháng viêm", price: 60000, unit: "hộp", image: "" },
          { name: "Alaxan giảm đau cơ khớp", price: 110000, unit: "hộp", image: "" }
        ]
      },
      {
        id: "medicines-digest",
        name: "Tiêu hóa - Dạ dày",
        iconName: "ClipboardList",
        children: ["Thuốc đau dạ dày trào ngược", "Thuốc tiêu chảy cấp", "Men tiêu hóa", "Thuốc táo bón"],
        featuredProducts: [
          { name: "Gaviscon Dual Action trị trào ngược", price: 175000, unit: "hộp", image: "" },
          { name: "Phosphalugel chữ P đau dạ dày", price: 120000, unit: "hộp", image: "" },
          { name: "Smecta trị tiêu chảy cấp", price: 115000, unit: "hộp", image: "" },
          { name: "Duphalac nhuận tràng", price: 130000, unit: "hộp", image: "" },
          { name: "Berberin kháng khuẩn đường ruột", price: 20000, unit: "lọ", image: "" }
        ]
      }
    ]
  },
  {
    id: "personal-care",
    name: "Chăm sóc cá nhân",
    subCategories: [
      {
        id: "personal-care-sexual",
        name: "Hỗ trợ tình dục",
        iconName: "Heart",
        children: ["Bao cao su", "Gel bôi trơn"],
        featuredProducts: [
          { name: "Bao cao su Okamoto Crown kích cỡ nhỏ, siêu...", price: 56000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09707_b7893a5b10.jpg" },
          { name: "Bao cao su Sagami Classic siêu mỏng, nhiều chất bôi trơn...", price: 133200, unit: "Hộp", discount: 10, originalPrice: 148000, image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00002664_durex_fetherlite_3s_2345_62b5_large_bd6f01fc54.jpg" },
          { name: "Bao cao su Sagami Love Me Gold siêu mỏng, trơn, không...", price: 72000, unit: "Hộp", discount: 20, originalPrice: 90000, image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00002664_durex_fetherlite_3s_2345_62b5_large_bd6f01fc54.jpg" },
          { name: "Bao cao su Safefit Freezer Max S52 chứa nhiều gel là...", price: 49000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00502536_vien_nghe_mat_ong_royal_honey_250g_9512_637e_large_7ef79609f0.jpg" },
          { name: "Bao cao su Safefit 003 S52 siêu mỏng, không gây kích ứn...", price: 59000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00502804_bang_ve_sinh_dang_tampon_sofy_soft_9_mieng_7954_6396_large_1993f2916e.jpg" }
        ]
      },
      {
        id: "personal-care-food",
        name: "Thực phẩm - Đồ uống",
        iconName: "Activity",
        children: ["Sữa bột công thức", "Nước yến sào", "Trà thảo mộc", "Dinh dưỡng y học"],
        featuredProducts: [
          { name: "Sữa dinh dưỡng y học Fohepta Vitadairy (400g)", price: 285000, unit: "Lon", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/00501988_sua_cho_benh_nhan_gan_fohepta_vitadairy_400g_5342_6360_large_91621ed7fb.jpg" },
          { name: "Nước Yến Sào Nunest Đông Trùng Hạ Thảo (Hũ 70ml)", price: 45000, unit: "Hũ", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_00062_6c2770609f.jpg" },
          { name: "Trà Thảo Mộc Atiso Datino Premium Tea", price: 75000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/tra_thao_moc_atiso_20_tui_loc_x_2g_datino_premium_tea_00040886_1_49f34e811c.jpg" },
          { name: "Sữa Bột Dinh Dưỡng Glucerna Abbott Vani (850g)", price: 820000, unit: "Hộp", image: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09275_85d45ab994.jpg" }
        ]
      },
      {
        id: "personal-care-hygiene",
        name: "Vệ sinh cá nhân",
        iconName: "User",
        children: ["Sữa tắm diệt khuẩn", "Lăn khử mùi", "Nước rửa tay nhanh", "Dung dịch vệ sinh"],
        featuredProducts: [
          { name: "Sữa tắm diệt khuẩn Lifebuoy bảo vệ", price: 165000, unit: "chai", image: "" },
          { name: "Lăn khử mùi Etiaxil trị hôi nách", price: 260000, unit: "chai", image: "" },
          { name: "Gel rửa tay khô sát khuẩn Green Cross", price: 45000, unit: "chai", image: "" },
          { name: "Dầu gội Head & Shoulders mát lạnh", price: 155000, unit: "chai", image: "" },
          { name: "Xà bông sữa dê tắm trắng da", price: 35000, unit: "cục", image: "" }
        ]
      },
      {
        id: "personal-care-dental",
        name: "Chăm sóc răng miệng",
        iconName: "Check",
        children: ["Kem đánh răng", "Nước súc miệng", "Bàn chải điện", "Chỉ nha khoa"],
        featuredProducts: [
          { name: "Kem đánh răng Sensodyne Rapid Action", price: 85000, unit: "tuýp", image: "" },
          { name: "Nước súc miệng Listerine Cool Mint 500ml", price: 95000, unit: "chai", image: "" },
          { name: "Bàn chải điện Oral-B Vitality", price: 550000, unit: "cái", image: "" },
          { name: "Chỉ nha khoa Oral-B Essential Floss", price: 55000, unit: "cuộn", image: "" },
          { name: "Kem đánh răng Colgate 200g", price: 42000, unit: "tuýp", image: "" }
        ]
      },
      {
        id: "personal-care-household",
        name: "Đồ dùng gia đình",
        iconName: "Sparkles",
        children: ["Nước lau sàn", "Xịt côn trùng", "Khăn ướt", "Nước rửa chén"],
        featuredProducts: []
      },
      {
        id: "personal-care-general",
        name: "Hàng tổng hợp",
        iconName: "FileText",
        children: ["Khẩu trang vải", "Bông tẩy trang", "Tăm bông"],
        featuredProducts: []
      },
      {
        id: "personal-care-essential-oils",
        name: "Tinh dầu các loại",
        iconName: "Activity",
        children: ["Tinh dầu sả chanh", "Tinh dầu tràm", "Tinh dầu bạc hà"],
        featuredProducts: []
      },
      {
        id: "personal-care-beauty-devices",
        name: "Thiết bị làm đẹp",
        iconName: "Sparkles",
        children: ["Máy rửa mặt", "Máy massage da mặt", "Lược điện"],
        featuredProducts: []
      }
    ]
  },
  {
    id: "medical-devices",
    name: "Thiết bị y tế",
    subCategories: [
      {
        id: "medical-devices-monitors",
        name: "Máy đo & Theo dõi",
        iconName: "Activity",
        children: ["Máy đo huyết áp tự động", "Máy đo đường huyết tại nhà", "Nhiệt kế hồng ngoại đo trán", "Máy đo nồng độ oxy SpO2"],
        featuredProducts: [
          { name: "Máy đo huyết áp Omron HEM-7120", price: 980000, unit: "cái", image: "" },
          { name: "Nhiệt kế hồng ngoại đo trán Microlife", price: 780000, unit: "cái", image: "" },
          { name: "Máy đo đường huyết Accu-Chek Instant", price: 1150000, unit: "cái", image: "" },
          { name: "Máy đo SpO2 cầm tay Beurer PO30", price: 650000, unit: "cái", image: "" },
          { name: "Nhiệt kế điện tử kẹp nách Omron", price: 95000, unit: "cái", image: "" }
        ]
      },
      {
        id: "medical-devices-consumables",
        name: "Vật tư tiêu hao",
        iconName: "FileText",
        children: ["Khẩu trang y tế 4 lớp", "Bông băng gạc cuộn", "Cồn sát trùng 70 độ", "Kim tiêm insulin"],
        featuredProducts: [
          { name: "Khẩu trang y tế 4 lớp (Hộp 50 cái)", price: 45000, unit: "hộp", image: "" },
          { name: "Bông y tế Bạch Tuyết 100g", price: 25000, unit: "cuộn", image: "" },
          { name: "Cồn y tế 70 độ chai 500ml", price: 15000, unit: "chai", image: "" },
          { name: "Băng cá nhân Urgo túi 100 miếng", price: 65000, unit: "hộp", image: "" },
          { name: "Gạc rơ lưỡi tiệt trùng Đông Fa", price: 32000, unit: "hộp", image: "" }
        ]
      }
    ]
  }
];

function renderMenuIcon(iconName: string) {
  switch (iconName) {
    case "Activity":
      return <Activity size={18} />;
    case "Heart":
      return <Heart size={18} />;
    case "ClipboardList":
      return <ClipboardList size={18} />;
    case "Sparkles":
      return <Sparkles size={18} />;
    case "AlertTriangle":
      return <AlertTriangle size={18} />;
    case "Check":
      return <Check size={18} />;
    case "User":
      return <User size={18} />;
    case "FileText":
      return <FileText size={18} />;
    case "Shield":
      return <Shield size={18} />;
    case "Brain":
      return <Brain size={18} />;
    case "Droplets":
      return <Droplets size={18} />;
    case "Wind":
      return <Wind size={18} />;
    case "Flame":
      return <Flame size={18} />;
    case "Eye":
      return <Eye size={18} />;
    default:
      return <Sparkles size={18} />;
  }
}


const renderSubcatThumbnail = (name: string) => {
  const images: Record<string, string> = {
    // Vitamin & Khoáng chất
    "Dầu cá - Omega 3": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_05020_ce6da165fb.jpg",
    "Kẽm - Magie": "https://cdn.nhathuoclongchau.com.vn/v1/static/00005685_tinh_chat_hau_oyster_plus_tang_cuong_sinh_luc_phai_manh_3213_62ae_large_c5942edd08.jpg",
    "Vitamin tổng hợp": "https://cdn.nhathuoclongchau.com.vn/v1/static/coenzyme_q10_2x15_doppelherz_00051039_6_b63bec1ce6.png",
    "Canxi & Vitamin D": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_05520_3e8211d9fa.jpg",
    "Vitamin C": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_00507_429b55cc3c.jpg",
    
    // Miễn dịch - Đề kháng
    "Tăng đề kháng": "https://cdn.nhathuoclongchau.com.vn/v1/static/Optibac_FW_30_Front_Panel_With_The_Format_SQ_Pack_Shot_VIETNAM_e7e7290a6d.png",
    "Đông trùng hạ thảo": "https://cdn.nhathuoclongchau.com.vn/v1/static/vien_uong_dong_trung_ha_thao_cordyceps_1500mg_60v_pharma_world_00045393_1_3c77c5f08e.png",
    "Yến sào": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_07253_b8c427cb66.jpg",
    "Linh chi": "https://cdn.nhathuoclongchau.com.vn/v1/static/00501706_vien_uong_bao_ve_gan_pharma_world_milk_thistle_60v_3202_6302_large_c595132390.jpg",

    // Sinh lý - Nội tiết tố
    "Sinh lý nam": "https://cdn.nhathuoclongchau.com.vn/v1/static/00500768_mens_ginseng_alipas_new_ecogreen_60v_1645_62b5_large_ceb7d7acd7.jpg",
    "Sinh lý nữ": "https://cdn.nhathuoclongchau.com.vn/v1/static/00000780_sam_agela_gold_dep_da_can_bang_noi_tiet_to_nu_5615_62af_large_8eba87f31b.jpg",
    "Tăng cường sinh lực": "https://cdn.nhathuoclongchau.com.vn/v1/static/00028815_alipas_new_ecogreen_30v_7132_5f99_large_8101b96b1b.JPG",
    "Cân bằng nội tiết tố": "https://cdn.nhathuoclongchau.com.vn/v1/static/00028719_maca_f_female_empower_60v_1127_5f62_large_1cfb41e9b6.JPG",
    "Tiền mãn kinh - mãn kinh": "https://cdn.nhathuoclongchau.com.vn/v1/static/vien_uong_giup_tang_noi_tiet_to_nu_cho_phu_nu_tien_man_kinh_lady_plus_60v_vitamins_for_life_00051536_5_6c3d8a2822.png",

    // Mắt - Thị lực
    "Mỏi mắt, khô mắt": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_03550_8a7532c9b1.jpg",
    "Tăng cường thị lực": "https://cdn.nhathuoclongchau.com.vn/v1/static/00005468_ocuvite_vitamin_bo_mat_cua_my_4233_62b1_large_619ecef744.jpg",
    "Bổ mắt": "https://cdn.nhathuoclongchau.com.vn/v1/static/00020710_dasbrain_pharmametics_30v_1177_6065_large_49dd64ad5b.jpg",
    "Nước nhỏ mắt": "https://cdn.nhathuoclongchau.com.vn/v1/static/gel_rua_tay_kho_natural_hand_sanitizer_sat_khuan_lam_sach_tay_250ml_00031658_1_2c1c64b096.png",
    "Cận thị": "https://cdn.nhathuoclongchau.com.vn/v1/static/00503116_bong_tay_trang_tron_kamicare_120_mieng_9336_642c_large_dd9d9ee6ee.jpg",
    "Đục thủy tinh thể": "https://cdn.nhathuoclongchau.com.vn/v1/static/00032867_vien_sang_mat_hai_thuong_vuong_60v_8865_61af_large_ce9a194628.jpg",

    // Tiêu hóa
    "Men vi sinh": "https://cdn.nhathuoclongchau.com.vn/v1/static/Optibac_FW_30_Front_Panel_With_The_Format_SQ_Pack_Shot_VIETNAM_e7e7290a6d.png",
    "Dạ dày, tá tràng": "https://cdn.nhathuoclongchau.com.vn/v1/static/hon_dich_uong_phosphalugel_26_goi_x_20g_sanofi_00005924_510123ad08.jpg",
    "Đại tràng": "https://cdn.nhathuoclongchau.com.vn/v1/static/00033284_vien_uong_ho_tro_dai_trang_bifido_plus_jpanwell_30v_5543_61e9_large_9d369d6c67.jpg",
    "Nhuận tràng, táo bón": "https://cdn.nhathuoclongchau.com.vn/v1/static/tra_thao_moc_atiso_20_tui_loc_x_2g_datino_premium_tea_00040886_1_49f34e811c.jpg",
    "Khó tiêu": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_03252_a5016c6737.jpg",
    "Hỗ trợ ăn ngon": "https://cdn.nhathuoclongchau.com.vn/v1/static/00501623_soki_deli_18_goi_x_4g_4693_62fb_large_29dea8fcc9.jpg",

    // Thần kinh não
    "Bổ não": "https://cdn.nhathuoclongchau.com.vn/v1/static/00003337_ginkgo_biloba_60mg_60v_natures_bounty_8579_63db_large_dc0d941fcd.jpg",
    "Cải thiện trí nhớ": "https://cdn.nhathuoclongchau.com.vn/v1/static/sotivex_7860223cf5.jpg",
    "Hỗ trợ giấc ngủ": "https://cdn.nhathuoclongchau.com.vn/v1/static/vien_uong_ho_tro_giam_cang_thang_cebraton_premium_60v_traphaco_00051158_1_10ad1f712c.png",

    // Hỗ trợ làm đẹp
    "Đẹp da collagen": "https://cdn.nhathuoclongchau.com.vn/v1/static/nuoc_uong_bo_sung_collagen_giup_giam_lao_hoa_da_28_2_ong_x_25ml_elasten_00051118_1_f71391b12a.jpg",
    "Ngừa lão hóa": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_02845_d1c99603c5.jpg",
    "Trị mụn": "https://cdn.nhathuoclongchau.com.vn/v1/static/acnes_gel_hop_and_tuyp_cb38d31f7a.jpg",
    "Sáng da": "https://cdn.nhathuoclongchau.com.vn/v1/static/00345339_collagen_with_vitamin_c_vien_bo_sung_collagen_1653_5fd9_large_cb88640c41.JPG",

    // Đường huyết - Tiểu đường
    "Hạ đường huyết": "https://cdn.nhathuoclongchau.com.vn/v1/static/IMG_3624_d4aa0421ec.jpg",
    "Dinh dưỡng tiểu đường": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09275_85d45ab994.jpg",
    "Biến chứng tiểu đường": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_05463_4289216657.jpg",

    // Tim mạch - Huyết áp
    "Huyết áp cao": "https://cdn.nhathuoclongchau.com.vn/v1/static/00032923_vien_uong_cai_thien_tim_mach_hato_gold_jpanwell_60v_8446_61aa_large_da46bcb91d.jpg",
    "Mỡ máu": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09562_e7057bdf13.png",
    "Phòng đột quỵ": "https://cdn.nhathuoclongchau.com.vn/v1/static/IMG_6883_37a908aa20.jpg",
    "Bổ tim Coenzyme Q10": "https://cdn.nhathuoclongchau.com.vn/v1/static/00033383_vien_uong_ho_tro_tim_mach_omega_plus_10_vitamins_for_life_60v_1049_620b_large_51c80bec0e.jpg",

    // Hô hấp - Tai mũi họng
    "Bổ phế giảm ho": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09352_ae155b3fe6.jpg",
    "Súc họng": "https://cdn.nhathuoclongchau.com.vn/v1/static/00022773_sedagol_pro_bio_30ml_5837_61b3_large_a04e12389b.JPG",
    "Xịt mũi": "https://cdn.nhathuoclongchau.com.vn/v1/static/00501599_siro_ginkid_hocam_new_80ml_ho_tro_giam_ho_bo_phe_1484_62fd_large_575a34209b.jpg",
    "Tăng đề kháng hô hấp": "https://cdn.nhathuoclongchau.com.vn/v1/static/TUK_06978_61e60f9408.jpg",

    // Cơ xương khớp
    "Hỗ trợ xương khớp": "https://cdn.nhathuoclongchau.com.vn/v1/static/00032918_glucosamine_and_chondroitin_jpanwell_120v_9745_61a5_large_41ffa86dc1.JPG",
    "Hỗ trợ gout": "https://cdn.nhathuoclongchau.com.vn/v1/static/00021930_uricare_60v_2657_6007_large_4f5c9e57c5.JPG",
    "Giảm thoái hóa khớp": "https://cdn.nhathuoclongchau.com.vn/v1/static/00032397_jex_the_he_moi_eco_60v_8040_62b0_large_0e07e3b7bb.jpg",
    "Tái tạo sụn khớp": "https://cdn.nhathuoclongchau.com.vn/v1/static/thuoc_glucosamine_stada_1500mg_sachet_30_goi_00033098_b66b8e113b.png",
    "Canxi hữu cơ": "https://cdn.nhathuoclongchau.com.vn/v1/static/00001517_calcium_corbiere_5ml_sanofi_7413_5b35_large_dadec585bf.JPG",

    // Chăm sóc cá nhân
    "Bao cao su": "https://cdn.nhathuoclongchau.com.vn/v1/static/00002664_durex_fetherlite_3s_2345_62b5_large_bd6f01fc54.jpg",
    "Gel bôi trơn": "https://cdn.nhathuoclongchau.com.vn/v1/static/00010731_durex_kyjelly_50g_3479_62b5_large_8734c6b877.jpg",
    "Sữa bột công thức": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_00282_fd7adc8b01.png",
    "Nước yến sào": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_00062_6c2770609f.jpg",
    "Trà thảo mộc": "https://cdn.nhathuoclongchau.com.vn/v1/static/tra_thao_moc_atiso_20_tui_loc_x_2g_datino_premium_tea_00040886_1_49f34e811c.jpg",
    "Dinh dưỡng y học": "https://cdn.nhathuoclongchau.com.vn/v1/static/00501706_vien_uong_bao_ve_gan_pharma_world_milk_thistle_60v_3202_6302_large_c595132390.jpg",
    "Sữa tắm diệt khuẩn": "https://cdn.nhathuoclongchau.com.vn/v1/static/sua_tam_goi_toan_than_top_to_toe_baby_bath_500ml_johnsons_00051097_1_d5beda674a.jpg",
    "Lăn khử mùi": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_03550_8a7532c9b1.jpg",
    "Nước rửa tay nhanh": "https://cdn.nhathuoclongchau.com.vn/v1/static/gel_rua_tay_kho_natural_hand_sanitizer_sat_khuan_lam_sach_tay_250ml_00031658_1_2c1c64b096.png",
    "Dung dịch vệ sinh": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_03252_a5016c6737.jpg",
    "Kem đánh răng": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_03219_cafa168f18.jpg",
    "Nước súc miệng": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_01900_6fe44907dd.jpg",
    "Bàn chải điện": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_04212_d9308525fc.png",
    "Chỉ nha khoa": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09978_bdd21a415a.jpg",
    "Nước lau sàn": "https://cdn.nhathuoclongchau.com.vn/v1/static/00030815_khan_uot_con_let_green_90_mieng_6291_62b9_large_78c18de29c.jpg",
    "Xịt côn trùng": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_04355_4b29519833.jpg",
    "Khăn ướt": "https://cdn.nhathuoclongchau.com.vn/v1/static/00022532_khan_giay_uot_grace_samjung_100_to_6981_5e99_large_0a0360329c.JPG",
    "Nước rửa chén": "https://cdn.nhathuoclongchau.com.vn/v1/static/00005146_natri_clorid_1000ml_2375_63ab_large_9dfb38cd40.jpg",
    "Khẩu trang vải": "https://cdn.nhathuoclongchau.com.vn/v1/static/IMG_0158_f0aca2eb4f.jpg",
    "Bông tẩy trang": "https://cdn.nhathuoclongchau.com.vn/v1/static/00503116_bong_tay_trang_tron_kamicare_120_mieng_9336_642c_large_dd9d9ee6ee.jpg",
    "Tăm bông": "https://cdn.nhathuoclongchau.com.vn/v1/static/00503115_tam_bong_so_sinh_kamicare_hop_tron_200_que_dau_bong_sieu_nho_9562_642c_large_ece19e4a73.jpg",
    "Tinh dầu sả chanh": "https://cdn.nhathuoclongchau.com.vn/v1/static/00032124_tinh_dau_khu_khuan_chong_virus_sa_chanh_thao_nguyen_200ml_6909_62ae_large_34861898cc.jpg",
    "Tinh dầu tràm": "https://cdn.nhathuoclongchau.com.vn/v1/static/00031887_tinh_dau_tram_me_doan_50ml_3272_62af_large_9f42f0cd06.jpg",
    "Tinh dầu bạc hà": "https://cdn.nhathuoclongchau.com.vn/v1/static/00005428_nuoc_suc_mieng_thai_duong_500ml_huong_bac_ha_9548_62ad_large_6819a4ce8a.jpg",
    "Máy rửa mặt": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_05449_a1d9fce6f5.jpg",
    "Máy massage da mặt": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_02425_5e841896cc.jpg",
    "Lược điện": "https://cdn.nhathuoclongchau.com.vn/v1/static/00500018_may_tam_nuoc_cam_tay_6_che_do_halio_professional_cordless_oral_irrigator_2358_6272_large_8abea1086e.jpg",
 
    // Thiết bị y tế
    "Máy đo huyết áp tự động": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09784_7491e9a96a.jpg",
    "Máy đo đường huyết tại nhà": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09381_9b6bfa8108.jpg",
    "Nhiệt kế hồng ngoại đo trán": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_07314_820bccb99a.png",
    "Máy đo nồng độ oxy SpO2": "https://cdn.nhathuoclongchau.com.vn/v1/static/00500018_may_tam_nuoc_cam_tay_6_che_do_halio_professional_cordless_oral_irrigator_2358_6272_large_8abea1086e.jpg",
    "Khẩu trang y tế 4 lớp": "https://cdn.nhathuoclongchau.com.vn/v1/static/IMG_0158_f0aca2eb4f.jpg",
    "Bông băng gạc cuộn": "https://cdn.nhathuoclongchau.com.vn/v1/static/00500739_bong_y_te_quick_nurse_1kg_5805_62b3_large_72cd282c0d.jpg",
    "Cồn sát trùng 70 độ": "https://cdn.nhathuoclongchau.com.vn/v1/static/00031338_gac_tam_con_quick_nurse_6x6cm_hop_100_mieng_8478_62b5_large_cbd8c0e8ef.jpg",
    "Kim tiêm insulin": "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_05221_ef378bb216.jpg"
  };
  
  if (name === "Xem thêm") {
    return (
      <span className="text-gray-400 font-bold tracking-widest text-[20px] leading-none mb-1">...</span>
    );
  }
  
  const src = images[name] || "https://cdn.nhathuoclongchau.com.vn/v1/static/00020710_dasbrain_pharmametics_30v_1177_6065_large_49dd64ad5b.jpg";
  return <img src={src} alt={name} className="w-full h-full object-contain p-0.5" />;
};

export default function HomePage() {
  const [medicines, setMedicines] = useState<Medicine[]>(MOCK_MEDICINES);
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [activeSubId, setActiveSubId] = useState<string>("supplements-vitamin");
  const [loading, setLoading] = useState(true);
  const [samsungUnit, setSamsungUnit] = useState<"hop" | "chai">("hop");
  const [activeDiseaseGroupTab, setActiveDiseaseGroupTab] = useState<"doi-tuong" | "mua">("doi-tuong");
  const [activeSeasonalTab, setActiveSeasonalTab] = useState<number>(0);
  const [fysolineSeptiUnit, setFysolineSeptiUnit] = useState<"hop" | "ong">("hop");
  const [fysolineIsoUnit, setFysolineIsoUnit] = useState<"hop" | "ong">("hop");
  const [famaproUnit, setFamaproUnit] = useState<"hop" | "goi">("hop");
  const [panadolUnit, setPanadolUnit] = useState<"vien" | "vi" | "hop">("vien");
  const [acemucUnit, setAcemucUnit] = useState<"vien" | "vi" | "hop">("vien");
  const [telfastUnit, setTelfastUnit] = useState<"vien" | "vi" | "hop">("vien");
  const [kamizolOrangeUnit, setKamizolOrangeUnit] = useState<"chai" | "thung">("chai");
  const [kamizolLemonUnit, setKamizolLemonUnit] = useState<"chai" | "thung">("chai");

  // State for Flash Sale Countdown
  const [timeLeft, setTimeLeft] = useState({
    hours: 9,
    minutes: 29,
    seconds: 37
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 9;
              minutes = 29;
              seconds = 37;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Smooth scroll and set category filter on menu click
  const handleCategoryClick = (categoryName: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedCategory(categoryName);
    const target = document.getElementById("featured-medicines");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Fetch API data
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";
        
        // Fetch featured medicines
        const medRes = await fetch(`${apiBaseUrl}/products/featured`);
        if (medRes.ok) {
          const medData = await medRes.json();
          if (medData && medData.length > 0) {
            const mappedMeds = medData.map((item: any) => ({
              ...item,
              sideEffects: item.sideEffects || "Ít gặp, có thể gây dị ứng hoặc tác dụng nhẹ trên đường tiêu hóa."
            }));
            setMedicines(mappedMeds);
          }
        }

        // Fetch categories
        const catRes = await fetch(`${apiBaseUrl}/products/categories`);
        if (catRes.ok) {
          const catData = await catRes.json();
          if (catData && catData.length > 0) {
            const mappedCats = catData.map((item: any) => ({
              id: item.id,
              name: item.name,
              count: item.count || 0
            }));
            setCategories(mappedCats);
          }
        }
      } catch (err) {
        console.error("Error fetching data from API, using fallback mock data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApiData();
  }, []);

  // Cart total count
  const cartCount = useMemo(() => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  }, [cart]);

  // Filtered medicines
  const filteredMedicines = useMemo(() => {
    return medicines.filter(med => {
      const matchesSearch = 
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.activeIngredient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory 
        ? med.category.toLowerCase() === selectedCategory.toLowerCase()
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, medicines]);

  // Toast helper
  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Add to cart handler
  const handleAddToCart = (med: Medicine, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!med.isAvailable) {
      triggerToast(`Sản phẩm ${med.name} đang tạm hết hàng.`);
      return;
    }
    setCart(prev => ({
      ...prev,
      [med.id]: (prev[med.id] || 0) + 1
    }));
    triggerToast(`Đã thêm ${med.name} vào giỏ hàng.`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-canvas font-sans text-ink">
      {/* SEO Tags (Meta-structure simulated via Next.js client-side fallback metadata or direct render) */}
      <head>
        <title>PharmaAssist - Tra Cứu Thuốc Nhanh, Mua Thuốc Thuận Tiện</title>
        <meta name="description" content="Hệ thống PharmaAssist hỗ trợ tra cứu thuốc nhanh chóng, xem danh mục nổi bật, tìm kiếm hoạt chất, mua thuốc thuận tiện và hỗ trợ cảnh báo tương tác thuốc tự động." />
      </head>

      {/* 1. TOP BAR */}
      <div className="bg-ink-soft text-white text-xs py-2 px-4 md:px-8 border-b border-charcoal">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="flex items-center gap-1 font-medium hover:text-primary-soft transition-colors cursor-pointer">
              <Phone size={14} className="text-primary-bright" />
              Hotline tư vấn: <strong className="text-primary-soft">1800 6868</strong> (Miễn phí)
            </span>
            <span className="flex items-center gap-1 opacity-95">
              <MapPin size={14} className="text-primary-bright" />
              Địa chỉ: 123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. HCM
            </span>
          </div>
          <Link 
            href="/login" 
            id="btn-staff-login-topbar"
            className="flex items-center gap-1.5 bg-charcoal hover:bg-primary-deep text-white px-3 py-1 rounded-md transition-all duration-300 text-xs border border-graphite"
          >
            <Lock size={12} className="text-primary-bright" />
            Nhân viên đăng nhập
          </Link>
        </div>
      </div>

      {/* 2. HEADER CHÍNH */}
      <header className="sticky top-0 z-40 bg-canvas/90 backdrop-blur-md border-b border-fog shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link href="/" id="logo-link" className="flex items-center gap-2 group">
              <div className="bg-primary text-white p-2.5 rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300">
                <Sparkles size={24} />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-ink group-hover:text-primary transition-colors">
                  Pharma<span className="text-primary">Assist</span>
                </span>
                <span className="block text-[10px] text-graphite tracking-widest uppercase -mt-1">
                  AI Intelligence
                </span>
              </div>
            </Link>
            
            {/* Mobile Actions Header */}
            <div className="flex items-center gap-2 md:hidden">
              <Link href="/cart" id="mobile-cart-btn" className="relative p-2 text-ink hover:text-primary transition-colors">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-bloom-coral text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link href="/login" id="mobile-login-btn" className="p-2 text-ink hover:text-primary transition-colors">
                <User size={22} />
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full md:max-w-2xl relative">
            <div className="relative flex items-center">
              <input
                type="text"
                id="main-search-input"
                placeholder="Tìm tên thuốc, hoạt chất, danh mục..."
                className="w-full pl-11 pr-4 py-2.5 bg-cloud border border-steel focus:border-primary focus:bg-white rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-soft"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 text-graphite pointer-events-none" size={18} />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 text-graphite hover:text-ink transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/cart" 
              id="desktop-cart-link"
              className="relative flex items-center gap-2 bg-cloud hover:bg-primary-soft text-ink hover:text-primary-deep px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium border border-fog"
            >
              <ShoppingCart size={18} />
              Giỏ hàng
              {cartCount > 0 ? (
                <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              ) : (
                <span className="text-xs text-graphite">0</span>
              )}
            </Link>
            <Link 
              href="/login" 
              id="desktop-login-link"
              className="flex items-center gap-2 bg-primary hover:bg-primary-deep text-white px-5 py-2 rounded-xl transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg"
            >
              <User size={18} />
              Đăng nhập
            </Link>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="bg-white border-t-2 border-[#024ad8] relative overflow-visible shadow-sm">
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative overflow-visible flex items-center justify-start gap-8 h-14">

            {NAV_MEGA_MENU_DATA.map((cat) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <div 
                  key={cat.id} 
                  className="group overflow-visible"
                  onMouseEnter={() => {
                    if (cat.subCategories.length > 0) {
                      setActiveSubId(cat.subCategories[0].id);
                    }
                  }}
                >
                  <button
                    onClick={(e) => handleCategoryClick(cat.name, e)}
                    className={`flex items-center gap-1.5 py-4 text-sm font-bold transition-all duration-200 border-b-2 border-transparent ${
                      isSelected 
                        ? "text-[#024ad8] border-[#024ad8]" 
                        : "text-ink hover:text-[#024ad8] hover:border-[#024ad8]"
                    }`}
                  >
                    {cat.name}
                    <ChevronDown size={12} className="text-graphite group-hover:rotate-180 transition-transform duration-300" />
                  </button>

                  {/* Mega Menu Dropdown */}
                  <div className="absolute top-full left-4 right-4 bg-white border border-fog shadow-2xl rounded-3xl p-6 hidden group-hover:flex z-50 animate-fadeIn min-h-[380px]">
                    {/* Container 2 cột */}
                    <div className="grid grid-cols-12 gap-6 w-full text-left">
                      {/* Cột trái (danh mục mẹ - cấp 2) */}
                      <div className="col-span-4 border-r border-fog pr-4 flex flex-col gap-1">
                        <span className="text-[10px] text-graphite font-bold uppercase tracking-wider mb-2.5 block">
                          Nhóm sản phẩm
                        </span>
                        {cat.subCategories.map((sub) => {
                          const isSubActive = activeSubId === sub.id;
                          return (
                            <div
                              key={sub.id}
                              onMouseEnter={() => setActiveSubId(sub.id)}
                              className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-300 ${
                                isSubActive 
                                  ? "bg-[#024ad8]/5 text-[#024ad8] font-bold" 
                                  : "hover:bg-cloud text-ink font-medium"
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div className={`p-1.5 rounded-lg ${isSubActive ? "bg-[#024ad8]/10 text-[#024ad8]" : "bg-cloud text-graphite"}`}>
                                  {renderMenuIcon(sub.iconName)}
                                </div>
                                <span className="text-xs">{sub.name}</span>
                              </div>
                              <ChevronRight size={14} className={`transition-transform duration-300 ${isSubActive ? "translate-x-1" : "opacity-50"}`} />
                            </div>
                          );
                        })}
                      </div>

                      {/* Cột phải (danh mục con - cấp 3 & sản phẩm bán chạy) */}
                      <div className="col-span-8 pl-4 flex flex-col justify-between">
                        {cat.subCategories.map((sub) => {
                          if (activeSubId !== sub.id) return null;
                          return (
                            <div key={sub.id} className="flex flex-col gap-6 h-full justify-between animate-fadeIn">
                              {/* Danh mục con */}
                              <div>
                                <span className="text-[10px] text-graphite font-bold uppercase tracking-wider mb-2.5 block">
                                  Danh mục con nổi bật
                                </span>
                                <div className="grid grid-cols-3 gap-4">
                                  {sub.children.map((child, idx) => (
                                    <button
                                      key={idx}
                                      onClick={(e) => handleCategoryClick(child, e)}
                                      className="flex items-center gap-3.5 bg-white hover:bg-cloud text-ink text-xs md:text-[13px] font-bold p-3.5 rounded-2xl border border-fog hover:border-[#024ad8]/20 transition-all duration-300 text-left shadow-sm min-h-[60px]"
                                    >
                                      <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center bg-cloud shrink-0">
                                        {renderSubcatThumbnail(child)}
                                      </div>
                                      <span className="line-clamp-2 leading-snug">{child}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Sản phẩm bán chạy */}
                              <div>
                                <div className="flex items-center justify-between mb-3 border-b border-fog pb-2">
                                  <span className="text-[10px] text-graphite font-bold uppercase tracking-wider">
                                    Sản phẩm bán chạy nhất
                                  </span>
                                  <span 
                                    className="text-[10px] text-[#024ad8] font-bold flex items-center gap-0.5 cursor-pointer hover:underline"
                                    onClick={(e) => handleCategoryClick(sub.name, e)}
                                  >
                                    Xem tất cả
                                    <ChevronRight size={12} />
                                  </span>
                                </div>
                                <div className="grid grid-cols-5 gap-3">
                                  {sub.featuredProducts.map((prod, pIdx) => (
                                    <div 
                                      key={pIdx} 
                                      className="bg-white rounded-xl border border-fog p-2 flex flex-col justify-between hover:border-[#024ad8]/30 transition-all duration-300 group/prod cursor-pointer relative"
                                      onClick={(e) => handleCategoryClick(sub.name, e)}
                                    >
                                      <div className="bg-cloud aspect-square rounded-lg flex items-center justify-center overflow-hidden mb-2 relative">
                                        {prod.discount && (
                                          <div className="absolute top-1 left-1 bg-[#ea3829] text-white text-[9px] font-black px-1.5 py-0.5 rounded-md z-10">
                                            -{prod.discount}%
                                          </div>
                                        )}
                                        {(() => {
                                          const finalImage = mappedImages[prod.name as keyof typeof mappedImages] || prod.image;
                                          return finalImage ? (
                                            <img 
                                              src={finalImage} 
                                              alt={prod.name} 
                                              className="w-full h-full object-contain p-1 group-hover/prod:scale-105 transition-transform" 
                                            />
                                          ) : (
                                            <Sparkles size={24} className="text-[#024ad8]/20" />
                                          );
                                        })()}
                                      </div>
                                      <div>
                                        <h5 className="text-[10px] font-bold text-ink line-clamp-2 leading-tight group-hover/prod:text-[#024ad8] transition-colors min-h-[28px]">
                                          {prod.name}
                                        </h5>
                                        <div className="flex flex-col mt-1">
                                          <div className="flex items-baseline justify-between">
                                            <span className="text-[10px] font-black text-[#024ad8]">
                                              {prod.price.toLocaleString("vi-VN")}đ
                                            </span>
                                            <span className="text-[9px] text-graphite">/{prod.unit}</span>
                                          </div>
                                          {prod.originalPrice && (
                                            <span className="text-[9px] text-gray-400 line-through mt-0.5">
                                              {prod.originalPrice.toLocaleString("vi-VN")}đ
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <Link 
              href="#vaccination" 
              className="text-xs hover:text-[#024ad8] transition-colors py-3 border-b-2 border-transparent hover:border-[#024ad8] shrink-0"
            >
              Tiêm chủng
            </Link>
            <div className="group overflow-visible shrink-0">
              <button
                className="flex items-center gap-1 py-3 text-xs text-ink hover:text-[#024ad8] transition-colors border-b-2 border-transparent"
              >
                Bệnh & Góc sức khỏe
                <ChevronDown size={12} className="text-graphite group-hover:rotate-180 transition-transform duration-300" />
              </button>
            </div>
            <Link 
              href="#store-system" 
              className="text-xs hover:text-[#024ad8] transition-colors py-3 border-b-2 border-transparent hover:border-[#024ad8] shrink-0"
            >
              Hệ thống nhà thuốc
            </Link>
          </div>
        </nav>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1">
        
        {/* 3. HERO BANNER & QUICK ACTIONS REDESIGN */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col gap-6">
          
          {/* Top Banner Row (Grid layout) */}
          <div className="grid grid-cols-12 gap-4">
            
            {/* Left Big Carousel Banner */}
            <div className="col-span-12 lg:col-span-8 bg-[#d6f8ff] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 min-h-[300px]">
              {/* Decorative background illustrations */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#93c5fd] opacity-20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 left-10 w-32 h-32 bg-[#22d3ee] opacity-15 rounded-full blur-2xl pointer-events-none" />
              
              {/* Left text column */}
              <div className="flex flex-col gap-4 max-w-md relative z-10 text-left">
                <div className="flex items-center gap-1.5">
                  <div className="bg-[#024ad8] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    SANOFI
                  </div>
                  <span className="text-[11px] text-[#024ad8] font-bold tracking-wide uppercase">
                    enterogermina baby comfort
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#111827] leading-tight">
                  Thêm Lợi Khuẩn Tốt<br />
                  <span className="text-[#024ad8]">Chăm Bụng Bé Khỏe</span>
                </h2>
                
                {/* Orange voucher tags */}
                <div className="flex items-stretch gap-2 bg-[#ff5a00] text-white p-3 rounded-2xl max-w-sm shadow-sm">
                  <div className="flex flex-col justify-center pr-3 border-r border-white/20">
                    <span className="text-[10px] opacity-90 font-medium">Tặng voucher</span>
                    <strong className="text-sm md:text-base font-black">50.000Đ</strong>
                    <span className="text-[8px] opacity-80">*Voucher tiêm chủng</span>
                  </div>
                  <div className="flex flex-col justify-center pl-1">
                    <span className="text-[10px] opacity-90 font-medium">Giá chỉ</span>
                    <strong className="text-sm md:text-base font-black">475.000Đ</strong>
                    <span className="text-[8px] opacity-80">1 Hộp</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <button 
                    onClick={() => {
                      const target = document.getElementById("featured-medicines");
                      if (target) target.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-[#024ad8] hover:bg-[#01359c] text-white text-xs font-bold px-6 py-3 rounded-full shadow-md transition-all duration-300 hover:scale-102 uppercase tracking-wider"
                  >
                    Mua Ngay
                  </button>
                  <div className="flex flex-col text-left">
                    <strong className="text-xs text-[#024ad8] font-bold">FREESHIP</strong>
                    <span className="text-[9px] text-[#6b7280] font-medium">*Khi đặt qua App</span>
                  </div>
                </div>
              </div>

              {/* Right image/illustration column */}
              <div className="relative z-10 w-full md:w-auto mt-6 md:mt-0 flex justify-center items-center shrink-0">
                <div className="relative w-64 h-56 flex items-center justify-center">
                  {/* Circle background decorator */}
                  <div className="absolute w-44 h-44 rounded-full bg-white/60 border border-cyan-100 flex items-center justify-center shadow-inner" />
                  
                  {/* Stomach/gut health indicator icon */}
                  <div className="absolute top-2 left-6 bg-[#22c55e]/15 text-[#16a34a] p-2 rounded-full border border-green-200/50 shadow-sm animate-pulse">
                    <Activity size={20} />
                  </div>
                  
                  {/* Enterogermina real product image from DB */}
                  <img 
                    src="https://cdn.nhathuoclongchau.com.vn/v1/static/enterogermina_4_ty_ong_5ml_2x10_sanofi_00030670_e8cd62ab8d.png" 
                    alt="Enterogermina" 
                    className="w-40 h-40 object-contain drop-shadow-xl relative z-10 hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Mother-baby label indicator */}
                  <div className="absolute -bottom-2 right-4 bg-white/90 backdrop-blur-sm border border-fog px-3 py-1.5 rounded-xl shadow-sm text-center flex items-center gap-1.5 z-20">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                    <span className="text-[10px] font-bold text-[#374151]">Men vi sinh 4 tỷ bào tử</span>
                  </div>
                </div>
              </div>

              {/* Carousel navigation arrows (aesthetic indicator) */}
              <button className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white hover:bg-cloud border border-fog flex items-center justify-center shadow-sm text-[#4b5563] hover:text-[#111827] z-20 transition-colors">
                <ChevronRight size={16} className="rotate-180" />
              </button>
              <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white hover:bg-cloud border border-fog flex items-center justify-center shadow-sm text-[#4b5563] hover:text-[#111827] z-20 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Right Side Column (2 Banners Stacked) */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
              
              {/* Upper Blue Banner: Ung Thư */}
              <div className="bg-gradient-to-br from-[#024ad8] to-[#2563eb] rounded-3xl p-5 flex justify-between items-center relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 min-h-[142px] group cursor-pointer text-left">
                {/* Decorative purple ribbon icon bg */}
                <div className="absolute right-2 top-0 opacity-15 text-white pointer-events-none group-hover:scale-110 transition-transform duration-500">
                  <ShieldCheck size={110} />
                </div>
                
                <div className="flex flex-col gap-2 max-w-[70%] relative z-10 text-white">
                  <h3 className="text-base font-extrabold tracking-wide uppercase leading-snug group-hover:text-cyan-100 transition-colors">
                    Hiểu Về Ung Thư<br />Từ A - Z
                  </h3>
                  <p className="text-[11px] leading-relaxed text-blue-100/90 font-medium">
                    Thông tin được biên soạn và kiểm duyệt bởi đội ngũ chuyên gia y tế.
                  </p>
                </div>
                
                {/* Purple ribbon representation */}
                <div className="relative z-10 flex items-center justify-center bg-white/10 border border-white/20 p-3 rounded-2xl shrink-0 group-hover:bg-white/20 transition-colors">
                  <div className="text-white relative">
                    {/* SVG purple ribbon symbol */}
                    <svg className="w-8 h-10 text-[#a855f7]" viewBox="0 0 24 30" fill="currentColor">
                      <path d="M12 2C8.686 2 6 4.686 6 8c0 3.314 3.018 7.371 6 11.5 2.982-4.129 6-8.186 6-11.5 0-3.314-2.686-6-6-6zm0 8.5c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Lower Greenish-Blue Banner: Nghị Quyết */}
              <div className="bg-gradient-to-br from-[#e0f7fc] to-[#bbf7f2] rounded-3xl p-5 flex justify-between items-center relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 min-h-[142px] group cursor-pointer text-left">
                {/* Decorative map bg shape */}
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none group-hover:scale-105 transition-transform duration-500">
                  <MapPin size={100} className="text-[#0891b2]" />
                </div>
                
                <div className="flex flex-col gap-2 max-w-[65%] relative z-10">
                  <h3 className="text-xs md:text-sm font-extrabold text-[#0f172a] uppercase tracking-wide leading-snug group-hover:text-[#024ad8] transition-colors">
                    Cập nhật địa chỉ<br />theo nghị quyết mới
                  </h3>
                  <p className="text-[10px] text-[#475569] font-semibold leading-tight">
                    Hiển thị đồng thời địa chỉ trước và sau sáp nhập.
                  </p>
                  <button className="bg-[#ea3829] hover:bg-[#c02316] text-white text-[10px] font-black px-4 py-1.5 rounded-full w-fit shadow-sm mt-1 transition-colors uppercase tracking-wider">
                    Tra Cứu Ngay
                  </button>
                </div>
                
                {/* Map illustration representation */}
                <div className="relative z-10 bg-white/80 p-3 rounded-2xl shrink-0 shadow-sm border border-cyan-100 group-hover:bg-white transition-colors">
                  <svg className="w-8 h-8 text-[#0891b2]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Row - 6 Quick Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-2">
            
            {/* Action 1: Cần mua thuốc */}
            <button 
              onClick={() => {
                const target = document.getElementById("featured-medicines");
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white rounded-2xl p-4 border border-fog shadow-sm hover:shadow-md hover:border-[#024ad8]/20 hover:scale-102 transition-all duration-300 flex items-center gap-3 text-left group"
            >
              <div className="bg-[#eff6ff] text-[#024ad8] p-3 rounded-xl group-hover:bg-[#024ad8]/10 transition-colors shrink-0">
                <Pill size={22} className="group-hover:rotate-12 transition-transform" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs md:text-sm font-extrabold text-[#1f2937] leading-tight">Cần mua</span>
                <span className="text-xs md:text-sm font-extrabold text-[#1f2937] leading-tight">thuốc</span>
              </div>
            </button>

            {/* Action 2: Tư vấn với Dược Sĩ */}
            <a 
              href="#about-system"
              className="bg-white rounded-2xl p-4 border border-fog shadow-sm hover:shadow-md hover:border-[#024ad8]/20 hover:scale-102 transition-all duration-300 flex items-center gap-3 text-left group"
            >
              <div className="bg-[#eff6ff] text-[#024ad8] p-3 rounded-xl group-hover:bg-[#024ad8]/10 transition-colors shrink-0">
                <svg className="w-[22px] h-[22px] text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs md:text-sm font-extrabold text-[#1f2937] leading-tight">Tư vấn với</span>
                <span className="text-xs md:text-sm font-extrabold text-[#1f2937] leading-tight">Dược Sĩ</span>
              </div>
            </a>

            {/* Action 3: Đơn của tôi */}
            <Link 
              href="/cart"
              className="bg-white rounded-2xl p-4 border border-fog shadow-sm hover:shadow-md hover:border-[#024ad8]/20 hover:scale-102 transition-all duration-300 flex items-center gap-3 text-left group"
            >
              <div className="bg-[#eff6ff] text-[#024ad8] p-3 rounded-xl group-hover:bg-[#024ad8]/10 transition-colors shrink-0">
                <FileText size={22} className="group-hover:translate-y-[-1px] transition-transform" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs md:text-sm font-extrabold text-[#1f2937] leading-tight">Đơn của</span>
                <span className="text-xs md:text-sm font-extrabold text-[#1f2937] leading-tight">tôi</span>
              </div>
            </Link>

            {/* Action 4: Tìm nhà thuốc */}
            <a 
              href="#store-system"
              className="bg-white rounded-2xl p-4 border border-fog shadow-sm hover:shadow-md hover:border-[#024ad8]/20 hover:scale-102 transition-all duration-300 flex items-center gap-3 text-left group"
            >
              <div className="bg-[#eff6ff] text-[#024ad8] p-3 rounded-xl group-hover:bg-[#024ad8]/10 transition-colors shrink-0">
                <MapPin size={22} className="group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs md:text-sm font-extrabold text-[#1f2937] leading-tight">Tìm nhà</span>
                <span className="text-xs md:text-sm font-extrabold text-[#1f2937] leading-tight">thuốc</span>
              </div>
            </a>

            {/* Action 5: Tiêm Vắc xin */}
            <a 
              href="#vaccination"
              className="bg-white rounded-2xl p-4 border border-fog shadow-sm hover:shadow-md hover:border-[#024ad8]/20 hover:scale-102 transition-all duration-300 flex items-center gap-3 text-left group"
            >
              <div className="bg-[#eff6ff] text-[#024ad8] p-3 rounded-xl group-hover:bg-[#024ad8]/10 transition-colors shrink-0">
                <Syringe size={22} className="group-hover:rotate-6 transition-transform" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs md:text-sm font-extrabold text-[#1f2937] leading-tight">Tiêm Vắc</span>
                <span className="text-xs md:text-sm font-extrabold text-[#1f2937] leading-tight">xin</span>
              </div>
            </a>

            {/* Action 6: Tra thuốc chính hãng */}
            <button 
              onClick={() => {
                const target = document.getElementById("featured-medicines");
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white rounded-2xl p-4 border border-fog shadow-sm hover:shadow-md hover:border-[#024ad8]/20 hover:scale-102 transition-all duration-300 flex items-center gap-3 text-left group"
            >
              <div className="bg-[#eff6ff] text-[#024ad8] p-3 rounded-xl group-hover:bg-[#024ad8]/10 transition-colors shrink-0">
                <ShieldCheck size={22} className="group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs md:text-sm font-extrabold text-[#1f2937] leading-tight">Tra thuốc</span>
                <span className="text-xs md:text-sm font-extrabold text-[#1f2937] leading-tight">chính hãng</span>
              </div>
            </button>
          </div>
        </section>

        {/* 4. FLASH SALE SECTION */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="bg-gradient-to-b from-[#e0f2fe] via-sky-50/50 to-white rounded-3xl p-6 border-2 border-sky-100/50 shadow-sm relative overflow-hidden">
            {/* Header Flash Sale with dynamic lightning badge and button */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 border-b border-sky-100 pb-4">
              <div className="flex items-center gap-3">
                {/* 3D-like flash sale text title */}
                <div className="flex items-center gap-1 bg-[#ea3829] text-white font-black text-lg md:text-xl px-4 py-2 rounded-2xl shadow-md uppercase tracking-wider skew-x-[-6deg] relative">
                  <span className="text-yellow-300 animate-pulse mr-1">⚡</span>
                  FLASHSALE GIÁ TỐT
                  {/* Decorative ice block */}
                  <span className="absolute -top-2 -right-3 text-base">🧊</span>
                </div>
                {/* Xem thế lệ link */}
                <span className="text-[10px] text-graphite hover:text-[#024ad8] font-bold cursor-pointer underline decoration-dotted">
                  Xem thể lệ &gt;
                </span>
              </div>
              
              {/* Tabs time frames */}
              <div className="flex items-center gap-2 bg-cloud/80 p-1 rounded-2xl border border-fog shrink-0">
                <div className="bg-white text-[#ea3829] border border-[#ea3829]/15 font-black text-xs px-4 py-2 rounded-xl shadow-sm text-center flex flex-col justify-center">
                  <span className="text-[10px] font-black">08:00 - 22:00, 04/06</span>
                  <span className="text-[9px] uppercase tracking-wide opacity-90">Đang diễn ra</span>
                </div>
                <div className="text-graphite font-bold text-[#475569] text-xs px-4 py-2 text-center flex flex-col justify-center cursor-pointer hover:text-primary transition-colors">
                  <span className="text-[10px] font-bold">08:00 - 22:00, 05/06</span>
                  <span className="text-[9px] uppercase tracking-wide opacity-80">Sắp diễn ra</span>
                </div>
              </div>

              {/* Countdown timer clock */}
              <div className="flex items-center gap-2 bg-white/95 px-4 py-2 rounded-2xl border border-sky-100 shadow-sm shrink-0">
                <span className="text-xs font-extrabold text-[#475569]">Kết thúc sau</span>
                <div className="flex items-center gap-1">
                  <span className="bg-[#ea3829] text-white font-black text-xs px-2.5 py-1.5 rounded-lg shadow-sm">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs font-black text-[#ea3829]">:</span>
                  <span className="bg-[#ea3829] text-white font-black text-xs px-2.5 py-1.5 rounded-lg shadow-sm">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs font-black text-[#ea3829]">:</span>
                  <span className="bg-[#ea3829] text-white font-black text-xs px-2.5 py-1.5 rounded-lg shadow-sm">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

            {/* Grid list product items */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              
              {/* Product 1 */}
              <div className="bg-white rounded-2xl border border-sky-100/70 p-3.5 flex flex-col justify-between hover:shadow-lg hover:border-[#024ad8]/20 transition-all duration-300 group relative">
                {/* Sale label top */}
                <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
                  <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    🇻🇳 VN
                  </span>
                  <span className="bg-[#ea3829] text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg shadow-sm">
                    -20%
                  </span>
                </div>
                
                <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                  <img 
                    src="https://cdn.nhathuoclongchau.com.vn/v1/static/00501988_sua_cho_benh_nhan_gan_fohepta_vitadairy_400g_5342_6360_large_91621ed7fb.jpg" 
                    alt="Sữa Fohepta" 
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-2 min-h-[30px] group-hover:text-[#024ad8] transition-colors text-left">
                      Sữa dinh dưỡng dành cho bệnh nhân gan Fohepta Vitadairy...
                    </h4>
                    <div className="flex flex-col mt-1 text-left">
                      <div className="flex items-baseline gap-1">
                        <strong className="text-[13px] font-black text-[#024ad8]">205.600đ</strong>
                        <span className="text-[9px] text-graphite font-semibold">/ Hộp</span>
                      </div>
                      <span className="text-[9px] text-gray-400 line-through">257.000đ</span>
                    </div>
                  </div>

                  {/* Progress stock bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[9px] font-black text-rose-600 mb-1">
                      <span className="flex items-center gap-0.5">🔥 Đã bán 6/400</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#fef2f2] border border-red-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#f43f5e] to-[#ea580c] rounded-full" style={{ width: "2%" }} />
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setCart(prev => ({ ...prev, "fohepta-milk": (prev["fohepta-milk"] || 0) + 1 }));
                        triggerToast("Đã thêm Sữa Fohepta vào giỏ hàng.");
                      }}
                      className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                    >
                      Chọn mua
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 2 */}
              <div className="bg-white rounded-2xl border border-sky-100/70 p-3.5 flex flex-col justify-between hover:shadow-lg hover:border-[#024ad8]/20 transition-all duration-300 group relative opacity-95">
                <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
                  <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    🇺🇸 US
                  </span>
                  <span className="bg-[#ea3829] text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg shadow-sm">
                    -72kđ
                  </span>
                </div>
                
                <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative">
                  <img 
                    src="https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_02727_0f957dbeee.jpg" 
                    alt="Sữa Ensure nước" 
                    className="w-full h-full object-contain p-2 grayscale opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                    <span className="bg-[#ea3829] text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-md uppercase tracking-wider">
                      Đã cháy hàng
                    </span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-2 min-h-[30px] text-left">
                      Sữa bổ sung dinh dưỡng hỗ trợ tiêu hóa Ensure Original nước...
                    </h4>
                    <div className="flex flex-col mt-1 text-left">
                      <div className="flex items-baseline gap-1">
                        <strong className="text-[13px] font-black text-[#024ad8]">912.000đ</strong>
                        <span className="text-[9px] text-graphite font-semibold">/ Thùng</span>
                      </div>
                      <span className="text-[9px] text-gray-400 line-through">984.000đ</span>
                    </div>
                  </div>

                  {/* Progress stock bar */}
                  <div className="mt-3">
                    <div className="w-full h-1.5 bg-[#ea3829] rounded-full overflow-hidden">
                      <div className="h-full bg-[#ea3829]" style={{ width: "100%" }} />
                    </div>
                    
                    <button 
                      disabled
                      className="w-full bg-cloud text-graphite text-[10px] font-bold py-2 rounded-xl mt-3 cursor-not-allowed uppercase tracking-wider"
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 3 */}
              <div className="bg-white rounded-2xl border border-sky-100/70 p-3.5 flex flex-col justify-between hover:shadow-lg hover:border-[#024ad8]/20 transition-all duration-300 group relative">
                <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
                  <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    🇺🇸 US
                  </span>
                  <span className="bg-[#ea3829] text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg shadow-sm">
                    -95kđ
                  </span>
                </div>
                
                <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                  <img 
                    src="https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09287_8364c9dcac.jpg" 
                    alt="Sữa Ensure Gold" 
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-2 min-h-[30px] group-hover:text-[#024ad8] transition-colors text-left">
                      Sữa tăng cường sức khỏe khối cơ tăng miễn dịch Ensure Gold...
                    </h4>
                    <div className="flex flex-col mt-1 text-left">
                      <div className="flex items-baseline gap-1">
                        <strong className="text-[13px] font-black text-[#024ad8]">837.000đ</strong>
                        <span className="text-[9px] text-graphite font-semibold">/ Hộp</span>
                      </div>
                      <span className="text-[9px] text-gray-400 line-through">932.000đ</span>
                    </div>
                  </div>

                  {/* Progress stock bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[9px] font-black text-rose-600 mb-1">
                      <span className="flex items-center gap-0.5">🔥 Đã bán 38/50</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#fef2f2] border border-red-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#f43f5e] to-[#ea580c] rounded-full" style={{ width: "76%" }} />
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setCart(prev => ({ ...prev, "ensure-gold-800g": (prev["ensure-gold-800g"] || 0) + 1 }));
                        triggerToast("Đã thêm Sữa Ensure Gold vào giỏ hàng.");
                      }}
                      className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                    >
                      Chọn mua
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 4 */}
              <div className="bg-white rounded-2xl border border-sky-100/70 p-3.5 flex flex-col justify-between hover:shadow-lg hover:border-[#024ad8]/20 transition-all duration-300 group relative">
                <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
                  <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    🇺🇸 US
                  </span>
                  <span className="bg-[#ea3829] text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg shadow-sm">
                    -95kđ
                  </span>
                </div>
                
                <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                  <img 
                    src="https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09287_8364c9dcac.jpg" 
                    alt="Sữa Ensure Gold" 
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-2 min-h-[30px] group-hover:text-[#024ad8] transition-colors text-left">
                      Sữa tăng cường sức khỏe khối cơ tăng miễn dịch Ensure Gold ít ngọt...
                    </h4>
                    <div className="flex flex-col mt-1 text-left">
                      <div className="flex items-baseline gap-1">
                        <strong className="text-[13px] font-black text-[#024ad8]">837.000đ</strong>
                        <span className="text-[9px] text-graphite font-semibold">/ Hộp</span>
                      </div>
                      <span className="text-[9px] text-gray-400 line-through">932.000đ</span>
                    </div>
                  </div>

                  {/* Progress stock bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[9px] font-black text-rose-600 mb-1">
                      <span className="flex items-center gap-0.5">🔥 Đã bán 22/50</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#fef2f2] border border-red-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#f43f5e] to-[#ea580c] rounded-full" style={{ width: "44%" }} />
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setCart(prev => ({ ...prev, "ensure-gold-800g": (prev["ensure-gold-800g"] || 0) + 1 }));
                        triggerToast("Đã thêm Sữa Ensure Gold vào giỏ hàng.");
                      }}
                      className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                    >
                      Chọn mua
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 5 */}
              <div className="bg-white rounded-2xl border border-sky-100/70 p-3.5 flex flex-col justify-between hover:shadow-lg hover:border-[#024ad8]/20 transition-all duration-300 group relative">
                <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
                  <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    🇯🇵 JP
                  </span>
                  <span className="bg-[#ea3829] text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg shadow-sm">
                    -19%
                  </span>
                </div>
                
                <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                  <img 
                    src="https://cdn.nhathuoclongchau.com.vn/v1/static/sua_ho_tro_he_mien_dich_va_tieu_hoa_khoe_manh_cho_tre_tu_0_thang_tuoi_icreo_balance_milk_glico_800g_00022636_3_16f858ea19.jpg" 
                    alt="Sữa Icreo Glico" 
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-2 min-h-[30px] group-hover:text-[#024ad8] transition-colors text-left">
                      Sữa cân bằng dinh dưỡng Icreo Balance Glico Nhật Bản...
                    </h4>
                    <div className="flex flex-col mt-1 text-left">
                      <div className="flex items-baseline gap-1">
                        <strong className="text-[13px] font-black text-[#024ad8]">933.120đ</strong>
                        <span className="text-[9px] text-graphite font-semibold">/ Hộp</span>
                      </div>
                      <span className="text-[9px] text-gray-400 line-through">1.152.000đ</span>
                    </div>
                  </div>

                  {/* Progress stock bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[9px] font-black text-rose-600 mb-1">
                      <span className="flex items-center gap-0.5">🔥 Đã bán 1/50</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#fef2f2] border border-red-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#f43f5e] to-[#ea580c] rounded-full" style={{ width: "2%" }} />
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setCart(prev => ({ ...prev, "icreo-glico-800g": (prev["icreo-glico-800g"] || 0) + 1 }));
                        triggerToast("Đã thêm Sữa Icreo Glico vào giỏ hàng.");
                      }}
                      className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                    >
                      Chọn mua
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 6 */}
              <div className="bg-white rounded-2xl border border-sky-100/70 p-3.5 flex flex-col justify-between hover:shadow-lg hover:border-[#024ad8]/20 transition-all duration-300 group relative">
                <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
                  <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    🇺🇸 US
                  </span>
                  <span className="bg-[#ea3829] text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg shadow-sm">
                    -80kđ
                  </span>
                </div>
                
                <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                  <img 
                    src="https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09275_85d45ab994.jpg" 
                    alt="Sữa Glucerna" 
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-2 min-h-[30px] group-hover:text-[#024ad8] transition-colors text-left">
                      Sữa bổ sung dinh dưỡng đặc biệt cho người đái đường Glucerna...
                    </h4>
                    <div className="flex flex-col mt-1 text-left">
                      <div className="flex items-baseline gap-1">
                        <strong className="text-[13px] font-black text-[#024ad8]">842.000đ</strong>
                        <span className="text-[9px] text-graphite font-semibold">/ Hộp</span>
                      </div>
                      <span className="text-[9px] text-gray-400 line-through">922.000đ</span>
                    </div>
                  </div>

                  {/* Progress stock bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[9px] font-black text-rose-600 mb-1">
                      <span className="flex items-center gap-0.5">🔥 Đã bán 27/50</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#fef2f2] border border-red-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#f43f5e] to-[#ea580c] rounded-full" style={{ width: "54%" }} />
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setCart(prev => ({ ...prev, "glucerna-800g": (prev["glucerna-800g"] || 0) + 1 }));
                        triggerToast("Đã thêm Sữa Glucerna vào giỏ hàng.");
                      }}
                      className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                    >
                      Chọn mua
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom link: Xem tất cả */}
            <div className="flex justify-center mt-6">
              <span 
                className="text-[#024ad8] hover:text-[#01359c] font-black text-xs flex items-center gap-1 cursor-pointer transition-colors hover:underline"
                onClick={() => {
                  const target = document.getElementById("featured-medicines");
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Xem tất cả &gt;
              </span>
            </div>
            
            {/* Aesthetic slide next button indicator (positioned absolute outside the slide container) */}
            <div className="absolute top-[60%] right-2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-sky-100 hover:bg-cloud flex items-center justify-center shadow-md text-[#4b5563] hover:text-[#111827] cursor-pointer transition-colors z-20 md:flex hidden">
              <ChevronRight size={16} />
            </div>
          </div>
        </section>

        {/* 4.5. BEST SELLING PRODUCTS (SẢN PHẨM BÁN CHẠY) */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          {/* Blue Container with thick border and padded inner content */}
          <div className="bg-[#024ad8] rounded-3xl p-6 pt-10 pb-8 border border-blue-700 shadow-lg relative">
            
            {/* Centered Red Tab at the top border */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2">
              <div className="bg-[#ea3829] text-white font-extrabold text-xs md:text-sm px-8 py-2 rounded-2xl shadow-md uppercase tracking-wider skew-x-[-6deg] relative border border-red-500/20">
                Sản phẩm bán chạy
              </div>
            </div>

            {/* Product Grid - Responsive layout containing 6 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              
              {/* Product 1: NMN */}
              <div className="bg-white rounded-2xl p-3.5 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group relative">
                <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
                  <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    🇯🇵 Nhật Bản
                  </span>
                  <span className="bg-[#ea3829] text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg shadow-sm">
                    -25%
                  </span>
                </div>
                
                <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                  <img 
                    src="https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_03542_6bfa8a6508.jpg" 
                    alt="NMN PQQ Kenko" 
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors text-left">
                      Viên uống hỗ trợ chống lão hóa, cải thiện làn da và tăng đề kháng NMN...
                    </h4>
                    <div className="flex flex-col mt-1 text-left">
                      <div className="flex items-baseline gap-1">
                        <strong className="text-[13px] font-black text-[#024ad8]">6.675.000đ</strong>
                        <span className="text-[9px] text-graphite font-semibold">/ Hộp</span>
                      </div>
                      <span className="text-[9px] text-gray-400 line-through">8.900.000đ</span>
                    </div>
                  </div>

                  <div>
                    <div className="inline-block bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2.5 py-1 rounded-lg mt-3">
                      Hộp 60 Viên
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setCart(prev => ({ ...prev, "nmn-pqq-kenko": (prev["nmn-pqq-kenko"] || 0) + 1 }));
                        triggerToast("Đã thêm NMN PQQ Kenko vào giỏ hàng.");
                      }}
                      className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                    >
                      Chọn mua
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 2: Kudos */}
              <div className="bg-white rounded-2xl p-3.5 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group relative">
                <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
                  <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    🇩🇪 Đức
                  </span>
                  <span className="bg-[#ea3829] text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg shadow-sm">
                    -15%
                  </span>
                </div>
                
                <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                  <img 
                    src="https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09335_24b9811179.jpg" 
                    alt="Kudos Daily Vitamins" 
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors text-left">
                      Viên sủi giúp bổ sung các vitamin cho cơ thể Kudos Daily Vitamins...
                    </h4>
                    <div className="flex flex-col mt-1 text-left">
                      <div className="flex items-baseline gap-1">
                        <strong className="text-[13px] font-black text-[#024ad8]">118.150đ</strong>
                        <span className="text-[9px] text-graphite font-semibold">/ Tuýp</span>
                      </div>
                      <span className="text-[9px] text-gray-400 line-through">139.000đ</span>
                    </div>
                  </div>

                  <div>
                    <div className="inline-block bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2.5 py-1 rounded-lg mt-3">
                      Tuýp 20 Viên
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setCart(prev => ({ ...prev, "kudos-daily": (prev["kudos-daily"] || 0) + 1 }));
                        triggerToast("Đã thêm Kudos Daily Vitamins vào giỏ hàng.");
                      }}
                      className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                    >
                      Chọn mua
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 3: Nano Fucoidan */}
              <div className="bg-white rounded-2xl p-3.5 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group relative">
                <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
                  <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    🇻🇳 Việt Nam
                  </span>
                  <span className="bg-[#ea3829] text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg shadow-sm">
                    -20%
                  </span>
                </div>
                
                <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                  <img 
                    src="https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09799_e7eb582916.jpg" 
                    alt="Nano Fucoidan" 
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors text-left">
                      Viên uống hỗ trợ chống oxy hóa, hạn chế gốc tự do, tăng cường sức...
                    </h4>
                    <div className="flex flex-col mt-1 text-left">
                      <div className="flex items-baseline gap-1">
                        <strong className="text-[13px] font-black text-[#024ad8]">792.000đ</strong>
                        <span className="text-[9px] text-graphite font-semibold">/ Hộp</span>
                      </div>
                      <span className="text-[9px] text-gray-400 line-through">990.000đ</span>
                    </div>
                  </div>

                  <div>
                    <div className="inline-block bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2.5 py-1 rounded-lg mt-3">
                      Hộp 30 Viên
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setCart(prev => ({ ...prev, "nano-fucoidan": (prev["nano-fucoidan"] || 0) + 1 }));
                        triggerToast("Đã thêm Nano Fucoidan vào giỏ hàng.");
                      }}
                      className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                    >
                      Chọn mua
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 4: Brauer DHA */}
              <div className="bg-white rounded-2xl p-3.5 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group relative">
                <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
                  <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    🇦🇺 Úc
                  </span>
                  <span className="bg-[#ea3829] text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg shadow-sm">
                    -20%
                  </span>
                </div>
                
                <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                  <img 
                    src="https://cdn.nhathuoclongchau.com.vn/v1/static/Vien_ho_tro_phat_trien_nao_bo_suc_khoe_cho_mat_Brauer_Baby_and_Kids_Ultra_Pure_DHA_00033687_79d080f5b6.png" 
                    alt="Brauer Baby & Kids" 
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors text-left">
                      Viên hỗ trợ phát triển não bộ sức khỏe cho mắt Brauer Baby & Ki...
                    </h4>
                    <div className="flex flex-col mt-1 text-left">
                      <div className="flex items-baseline gap-1">
                        <strong className="text-[13px] font-black text-[#024ad8]">388.800đ</strong>
                        <span className="text-[9px] text-graphite font-semibold">/ Hộp</span>
                      </div>
                      <span className="text-[9px] text-gray-400 line-through">486.000đ</span>
                    </div>
                  </div>

                  <div>
                    <div className="inline-block bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2.5 py-1 rounded-lg mt-3">
                      Hộp 60 Viên
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setCart(prev => ({ ...prev, "brauer-dha": (prev["brauer-dha"] || 0) + 1 }));
                        triggerToast("Đã thêm Brauer DHA vào giỏ hàng.");
                      }}
                      className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                    >
                      Chọn mua
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 5: Nước sâm Achimmadang */}
              <div className="bg-white rounded-2xl p-3.5 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group relative">
                <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
                  <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    🇰🇷 Hàn Quốc
                  </span>
                  <span className="bg-[#ea3829] text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg shadow-sm">
                    -20%
                  </span>
                </div>
                
                <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                  <img 
                    src="https://cdn.nhathuoclongchau.com.vn/v1/static/00502882_nuoc_sam_nguyen_cu_achimmadang_inbosam_biok_korea_root_dkink_10_chai_x_120ml_2001_6396_large_10523086de.jpg" 
                    alt="Nước Sâm Achimmadang" 
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors text-left">
                      Nước Sâm Nguyên Củ Achimmadang Inbosam Biok Korea Root Drink...
                    </h4>
                    
                    {/* Unit Switcher Tabs */}
                    <div className="flex items-center gap-1.5 mt-2 bg-cloud p-0.5 rounded-lg border border-fog w-fit">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSamsungUnit("hop");
                        }}
                        className={`text-[9px] font-bold px-2 py-0.5 rounded ${samsungUnit === "hop" ? "bg-white text-[#024ad8] shadow-sm border border-sky-100" : "text-graphite hover:text-ink"}`}
                      >
                        Hộp
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSamsungUnit("chai");
                        }}
                        className={`text-[9px] font-bold px-2 py-0.5 rounded ${samsungUnit === "chai" ? "bg-white text-[#024ad8] shadow-sm border border-sky-100" : "text-graphite hover:text-ink"}`}
                      >
                        Chai
                      </button>
                    </div>

                    <div className="flex flex-col mt-1 text-left">
                      <div className="flex items-baseline gap-1">
                        <strong className="text-[13px] font-black text-[#024ad8]">
                          {samsungUnit === "hop" ? "400.000đ" : "40.000đ"}
                        </strong>
                        <span className="text-[9px] text-graphite font-semibold">
                          / {samsungUnit === "hop" ? "Hộp" : "Chai"}
                        </span>
                      </div>
                      <span className="text-[9px] text-gray-400 line-through">
                        {samsungUnit === "hop" ? "500.000đ" : "50.000đ"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="inline-block bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2.5 py-1 rounded-lg mt-3">
                      {samsungUnit === "hop" ? "Hộp 10 Chai x 120ml" : "Chai 120ml"}
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        const key = samsungUnit === "hop" ? "achimmadang-box" : "achimmadang-bottle";
                        setCart(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
                        triggerToast(`Đã thêm Nước Sâm Achimmadang (${samsungUnit === "hop" ? "Hộp" : "Chai"}) vào giỏ hàng.`);
                      }}
                      className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                    >
                      Chọn mua
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 6: Aloclair Plus */}
              <div className="bg-white rounded-2xl p-3.5 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group relative">
                <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
                  <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    🇬🇧 Anh
                  </span>
                </div>
                
                <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                  <img 
                    src="https://cdn.nhathuoclongchau.com.vn/v1/static/CHAI_XIT_NHIET_MIENG_TAY_CHAN_MIENG_ALOCLAIR_PLUS_15_ML_00502899_6_d4a9ad973b.jpg" 
                    alt="Aloclair Plus" 
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors text-left">
                      Chai xịt nhiệt miệng, tay chân miệng Aloclair Plus 15ml hỗ trợ điều...
                    </h4>
                    <div className="flex flex-col mt-1 text-left">
                      <div className="flex items-baseline gap-1">
                        <strong className="text-[13px] font-black text-[#024ad8]">229.000đ</strong>
                        <span className="text-[9px] text-graphite font-semibold">/ Hộp</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="inline-block bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2.5 py-1 rounded-lg mt-3">
                      Hộp x 15ml
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setCart(prev => ({ ...prev, "aloclair-plus": (prev["aloclair-plus"] || 0) + 1 }));
                        triggerToast("Đã thêm Chai xịt Aloclair Plus vào giỏ hàng.");
                      }}
                      className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                    >
                      Chọn mua
                    </button>
                  </div>
                </div>
              </div>

            </div>
            
            {/* Aesthetic slide next button indicator */}
            <div className="absolute top-[50%] -right-4 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-sky-100 hover:bg-cloud flex items-center justify-center shadow-md text-[#4b5563] hover:text-[#111827] cursor-pointer transition-colors z-20 md:flex hidden">
              <ChevronRight size={16} />
            </div>

          </div>
        </section>

        {/* 5. DANH MỤC NỔI BẬT */}
        <section id="medicine-categories" className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">
          {/* Header layout matching the Long Chau design */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-fog pb-4">
            <div className="flex items-center gap-3">
              {/* Blue Trophy/Award badge circle icon */}
              <div className="bg-[#024ad8]/10 text-[#024ad8] p-2.5 rounded-full shadow-sm flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.375M7.5 18.75v-3.375c0-.621.503-1.125 1.125-1.125h.375m9 0A3.375 3.375 0 0121 10.875v-1.5c0-.621-.503-1.125-1.125-1.125h-.375m-9 0H9.75M12 3v12.375" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-[#1a1a1a]">Danh mục nổi bật</h2>
            </div>
            
            {/* Show display all button if filtered */}
            {selectedCategory && (
              <button 
                onClick={() => setSelectedCategory(null)}
                className="text-xs text-[#024ad8] hover:text-[#01359c] font-black flex items-center gap-1 transition-colors hover:underline"
              >
                Hiển thị tất cả thuốc
                <ChevronRight size={14} />
              </button>
            )}
          </div>

          {/* Grid Layout of 12 categories: 2 columns on mobile, 3 on sm, 4 on md, 6 on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {FEATURED_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory?.toLowerCase() === cat.filterName.toLowerCase();
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(isSelected ? null : cat.filterName)}
                  className={`p-5 rounded-2xl text-center flex flex-col items-center justify-between border transition-all duration-300 hover:scale-102 hover:shadow-lg h-full min-h-[158px] group relative ${
                    isSelected 
                      ? "bg-[#eff6ff] border-[#024ad8]/40 shadow-sm" 
                      : "bg-white border-fog hover:border-[#024ad8]/20 shadow-sm"
                  }`}
                >
                  {/* Category SVG Icon */}
                  <div className="flex-1 flex items-center justify-center mb-3">
                    {cat.icon}
                  </div>

                  <div className="w-full">
                    <span className="text-[12px] font-extrabold leading-tight block text-[#1a1a1a] group-hover:text-[#024ad8] transition-colors line-clamp-2">
                      {cat.name}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold block mt-1">
                      {cat.count} sản phẩm
                    </span>
                  </div>

                  {/* Active highlight bar indicator */}
                  {isSelected && (
                    <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-[#024ad8] rounded-t-full" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* 5.5. HEALTH CHECK BANNER (KIỂM TRA SỨC KHỎE) */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="bg-gradient-to-r from-[#024ad8] via-[#1d4ed8] to-[#1e40af] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-sm flex flex-col lg:flex-row justify-between items-center gap-6 min-h-[220px]">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 left-1/3 w-64 h-64 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

            {/* Left Content Column */}
            <div className="flex-1 flex flex-col justify-between relative z-10 w-full">
              <div className="text-left">
                <h2 className="text-xl md:text-2xl font-black text-white tracking-wide">
                  Kiểm tra sức khỏe
                </h2>
                <p className="text-xs md:text-sm text-blue-100/90 font-semibold mt-1">
                  Kết quả đánh giá sẽ cho bạn lời khuyên xử trí phù hợp!
                </p>
              </div>

              {/* Three Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                
                {/* Card 1 */}
                <div 
                  onClick={() => triggerToast("Bài kiểm tra trí nhớ đang được chuẩn bị...")}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-sky-100/10 flex items-center gap-3.5 hover:shadow-md hover:scale-102 transition-all duration-300 group cursor-pointer"
                >
                  <div className="bg-[#eff6ff] text-[#024ad8] p-3 rounded-2xl shrink-0 group-hover:bg-[#024ad8]/10 transition-colors flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 9.5c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5v1.5c0 1.5-1 2.5-2.5 2.5s-2.5-1-2.5-2.5V9.5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 9.5c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5h5c2.5 0 4.5-2 4.5-4.5s-2-4.5-4.5-4.5" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-between h-full text-left">
                    <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-2 min-h-[30px]">
                      Bài kiểm tra trí nhớ và mức độ tập trung chú ý
                    </h4>
                    <span className="text-[11px] font-black text-[#024ad8] hover:text-[#01359c] mt-2 flex items-center gap-0.5 group-hover:underline">
                      Bắt đầu
                    </span>
                  </div>
                </div>

                {/* Card 2 */}
                <div 
                  onClick={() => triggerToast("Bài kiểm tra sàng lọc đái tháo đường đang được chuẩn bị...")}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-sky-100/10 flex items-center gap-3.5 hover:shadow-md hover:scale-102 transition-all duration-300 group cursor-pointer"
                >
                  <div className="bg-[#eff6ff] text-[#024ad8] p-3 rounded-2xl shrink-0 group-hover:bg-[#024ad8]/10 transition-colors flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="7" y="5" width="10" height="14" rx="2" />
                      <circle cx="12" cy="12" r="3" />
                      <line x1="12" y1="5" x2="12" y2="7" />
                      <line x1="10" y1="12" x2="14" y2="12" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-between h-full text-left">
                    <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-2 min-h-[30px]">
                      Bài kiểm tra sàng lọc nguy cơ tiền đái tháo đường
                    </h4>
                    <span className="text-[11px] font-black text-[#024ad8] hover:text-[#01359c] mt-2 flex items-center gap-0.5 group-hover:underline">
                      Bắt đầu
                    </span>
                  </div>
                </div>

                {/* Card 3 */}
                <div 
                  onClick={() => triggerToast("Bài kiểm tra suy giáp đang được chuẩn bị...")}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-sky-100/10 flex items-center gap-3.5 hover:shadow-md hover:scale-102 transition-all duration-300 group cursor-pointer"
                >
                  <div className="bg-[#eff6ff] text-[#024ad8] p-3 rounded-2xl shrink-0 group-hover:bg-[#024ad8]/10 transition-colors flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4c-3.333 0-5 2.5-5 5.5S8.667 15 12 15s5-2 5-5.5S15.333 4 12 4z" />
                      <circle cx="9" cy="9.5" r="1.5" fill="currentColor" />
                      <circle cx="15" cy="9.5" r="1.5" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-between h-full text-left">
                    <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-2 min-h-[30px]">
                      Bài kiểm tra khả năng suy giáp
                    </h4>
                    <span className="text-[11px] font-black text-[#024ad8] hover:text-[#01359c] mt-2 flex items-center gap-0.5 group-hover:underline">
                      Bắt đầu
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Pharmacists Graphic Illustration */}
            <div className="relative w-full lg:w-[260px] flex items-end justify-center lg:justify-end shrink-0 select-none pointer-events-none mt-4 lg:mt-0 max-h-[220px] overflow-visible">
              <div className="absolute w-48 h-48 rounded-full bg-white/10 blur-xl bottom-4 right-4 pointer-events-none" />
              <img 
                src="/friendly_pharmacists.png" 
                alt="Dược sĩ hỗ trợ kiểm tra sức khỏe" 
                className="w-[220px] md:w-[240px] lg:w-[260px] h-auto object-contain drop-shadow-2xl z-10 hover:scale-102 transition-transform duration-300 relative -bottom-8" 
              />
            </div>
            
            {/* Aesthetic slide next button indicator */}
            <div className="absolute top-[50%] right-2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-sky-100 hover:bg-cloud flex items-center justify-center shadow-md text-[#4b5563] hover:text-[#111827] cursor-pointer transition-colors z-20 md:flex hidden">
              <ChevronRight size={16} />
            </div>

          </div>
        </section>



        {/* 5.6. DISEASE SECTION (BỆNH) */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          
          {/* Header Row */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#024ad8] text-white p-1 rounded-full shadow-sm flex items-center justify-center w-6 h-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-6-6h12" />
                </svg>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-[#1a1a1a]">Bệnh</h2>
            </div>
            
            <div className="h-4 w-px bg-fog mx-1"></div>
            
            <span className="text-[#024ad8] text-xs font-bold cursor-pointer hover:underline flex items-center group">
              Xem tất cả <ChevronRight size={14} className="ml-0.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          {/* Group Tabs Row */}
          <div className="flex gap-2 mb-6">
            <button 
              onClick={() => setActiveDiseaseGroupTab("doi-tuong")}
              className={`px-4 py-1.5 rounded-full text-[13px] font-bold border transition-colors ${activeDiseaseGroupTab === "doi-tuong" ? "border-[#024ad8] text-[#024ad8] bg-white shadow-sm flex items-center gap-1" : "border-transparent text-gray-500 hover:text-gray-800 bg-white"}`}
            >
              Bệnh theo đối tượng
              {activeDiseaseGroupTab === "doi-tuong" && (
                <svg className="w-3 h-3 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              )}
            </button>
            <button 
              onClick={() => setActiveDiseaseGroupTab("mua")}
              className={`px-4 py-1.5 rounded-full text-[13px] font-bold border transition-colors ${activeDiseaseGroupTab === "mua" ? "border-[#024ad8] text-[#024ad8] bg-white shadow-sm flex items-center gap-1" : "border-transparent text-gray-500 hover:text-gray-800 bg-white"}`}
            >
              Bệnh theo mùa
              {activeDiseaseGroupTab === "mua" && (
                <svg className="w-3 h-3 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              )}
            </button>
          </div>

          {/* Content Body */}
          {activeDiseaseGroupTab === "mua" ? (
            <div className="bg-[#024ad8] rounded-3xl p-6 pt-0 border border-blue-700 shadow-lg relative overflow-hidden flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
              {/* Blue Container with White Tabs Header */}
            
            {/* Header Tabs Row */}
            <div className="flex bg-white/10 rounded-t-3xl -mx-6 px-6 py-2 border-b border-white/10 overflow-x-auto scrollbar-hide shrink-0">
              <div className="flex gap-2">
                {[
                  { label: "Tay chân miệng", index: 0 },
                  { label: "Viêm não mô cầu", index: 1 },
                  { label: "Cúm", index: 2 },
                  { label: "Sốt xuất huyết", index: 3 }
                ].map((tab) => (
                  <button
                    key={tab.index}
                    onClick={() => setActiveSeasonalTab(tab.index)}
                    className={`px-6 py-3 rounded-t-2xl font-extrabold text-xs md:text-sm transition-all duration-300 ${
                      activeSeasonalTab === tab.index
                        ? "bg-white text-[#024ad8] shadow-sm"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Row: Left Info Card + Right 4 Products Card */}
            <div className="grid grid-cols-12 gap-5 items-stretch">
              
              {/* Left Info Card (Paper look with mascot at bottom) */}
              <div className="col-span-12 lg:col-span-3 bg-white rounded-2xl p-6 flex flex-col justify-between relative shadow-md min-h-[300px] border-r-4 border-cyan-400">
                {/* Decorative virus floating items (simulated via SVG) */}
                <div className="absolute top-2 right-2 text-cyan-400/20 opacity-70 animate-spin" style={{ animationDuration: "12s" }}>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2a1 1 0 011 1v1.07A8.001 8.001 0 0119.93 11H21a1 1 0 010 2h-1.07A8.001 8.001 0 0113 19.93V21a1 1 0 01-2 0v-1.07A8.001 8.001 0 014.07 13H3a1 1 0 010-2h1.07A8.001 8.001 0 0111 4.07V3a1 1 0 011-1zm0 4a6 6 0 100 12 6 6 0 000-12z" />
                  </svg>
                </div>

                <div className="text-left relative z-10">
                  <p className="text-[12px] md:text-[13px] font-bold text-ink leading-relaxed whitespace-pre-line">
                    {activeSeasonalTab === 0 && (
                      <>
                        Tay chân miệng có xu hướng quay lại theo mùa, dễ bùng phát tại trường học và khu vực đông trẻ nhỏ. <strong className="text-[#ea3829]">Trẻ dưới 5 tuổi</strong> là nhóm dễ bị ảnh hưởng và có nguy cơ lây lan nhanh.{"\n\n"}
                        <strong className="text-[#024ad8]">Chủ động giữ vệ sinh tay</strong> và <strong className="text-[#024ad8]">theo dõi dấu hiệu sớm</strong> là điều cần thiết. Đừng để đến khi trẻ bỏ ăn, sốt cao mới xử trí.
                      </>
                    )}
                    {activeSeasonalTab === 1 && (
                      <>
                        Viêm màng não do não mô cầu có dấu hiệu quay lại với nguy cơ lây lan nhanh trong cộng đồng. <strong className="text-[#ea3829]">Trẻ nhỏ, thanh thiếu niên và người sống tập thể</strong> là nhóm dễ bị ảnh hưởng.{"\n\n"}
                        <strong className="text-[#024ad8]">Chủ động nhận diện sớm</strong> dấu hiệu như sốt cao, cứng cổ và <strong className="text-[#024ad8]">tiêm vắc xin đầy đủ</strong> là rất cần thiết. Đừng để đến khi bệnh diễn tiến nặng mới xử trí.
                      </>
                    )}
                    {activeSeasonalTab === 2 && (
                      <>
                        Cúm khiến cơ thể mệt mỏi, dễ đuối sức, đặc biệt ở người lớn tuổi và trẻ nhỏ. <strong className="text-[#ea3829]">Thời tiết thay đổi</strong> là lúc virus cúm có nguy cơ bùng phát mạnh trở lại.{"\n\n"}
                        <strong className="text-[#024ad8]">Chủ động chăm sóc sức khỏe</strong>, tăng cường đề kháng và <strong className="text-[#024ad8]">tiêm vắc xin cúm</strong> hàng năm có thể giúp giảm nguy cơ mắc bệnh cho cả gia đình.
                      </>
                    )}
                    {activeSeasonalTab === 3 && (
                      <>
                        Sốt xuất huyết <strong className="text-[#ea3829]">đang gia tăng nhanh chóng</strong>, nhiều ca trở nặng vì phát hiện trễ hoặc chủ quan.{"\n\n"}
                        Trong gia đình, người lớn tuổi và trẻ nhỏ là những đối tượng dễ bị tổn thương nhất. <strong className="text-[#024ad8]">Đừng để đến khi sốt cao</strong>, kiệt sức mới lo bù nước hay tăng đề kháng.
                      </>
                    )}
                  </p>
                </div>

                <div className="flex flex-col gap-2 mt-4 relative z-10">
                  <button 
                    onClick={() => triggerToast("Khám phá giải pháp chăm sóc y tế...")}
                    className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-black py-2 rounded-full transition-colors shadow-sm uppercase tracking-wider text-center"
                  >
                    Khám phá ngay giải pháp
                  </button>
                </div>

                {/* Cute Mascot Graphic aligned at the bottom left */}
                <img 
                  src="/mascot.png" 
                  alt="Mascot PharmaAssist" 
                  className="w-20 h-20 absolute -bottom-3 -left-4 object-contain drop-shadow-md select-none pointer-events-none z-20"
                />
              </div>

              {/* Right Side: 4 Product Cards */}
              <div className="col-span-12 lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                
                {/* Render Tab 0 (Tay chân miệng) */}
                {activeSeasonalTab === 0 && (
                  <>
                    {/* Prod 1: Aloclair Gel */}
                    <div className="bg-white rounded-2xl p-3 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group relative">
                      <div className="absolute top-2 left-2 z-10">
                        <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          🇬🇧 Anh
                        </span>
                      </div>
                      <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                        <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/CHAI_XIT_NHIET_MIENG_TAY_CHAN_MIENG_ALOCLAIR_PLUS_15_ML_00502899_7_c7528bf5e9.jpg" alt="Aloclair Gel" className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                            Gel bôi miệng Aloclair Plus Alliance 8ml giảm nhiệt miệng, tay chân...
                          </h4>
                          <div className="flex items-baseline gap-1 mt-2">
                            <strong className="text-[13px] font-black text-[#024ad8]">175.000đ</strong>
                            <span className="text-[9px] text-graphite font-semibold">/ Tuýp</span>
                          </div>
                        </div>
                        <div>
                          <div className="inline-block bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2 py-0.5 rounded-lg mt-3">
                            Tuýp x 8ml
                          </div>
                          <button 
                            onClick={() => {
                              setCart(prev => ({ ...prev, "aloclair-gel": (prev["aloclair-gel"] || 0) + 1 }));
                              triggerToast("Đã thêm Gel Aloclair Plus vào giỏ hàng.");
                            }}
                            className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                          >
                            Chọn mua
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Prod 2: Aloclair Spray */}
                    <div className="bg-white rounded-2xl p-3 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group relative">
                      <div className="absolute top-2 left-2 z-10">
                        <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          🇬🇧 Anh
                        </span>
                      </div>
                      <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                        <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/CHAI_XIT_NHIET_MIENG_TAY_CHAN_MIENG_ALOCLAIR_PLUS_15_ML_00502899_6_d4a9ad973b.jpg" alt="Aloclair Spray" className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                            Chai xịt nhiệt miệng, tay chân miệng Aloclair Plus 15ml hỗ trợ điều...
                          </h4>
                          <div className="flex items-baseline gap-1 mt-2">
                            <strong className="text-[13px] font-black text-[#024ad8]">229.000đ</strong>
                            <span className="text-[9px] text-graphite font-semibold">/ Hộp</span>
                          </div>
                        </div>
                        <div>
                          <div className="inline-block bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2 py-0.5 rounded-lg mt-3">
                            Hộp x 15ml
                          </div>
                          <button 
                            onClick={() => {
                              setCart(prev => ({ ...prev, "aloclair-plus": (prev["aloclair-plus"] || 0) + 1 }));
                              triggerToast("Đã thêm Chai xịt Aloclair Plus vào giỏ hàng.");
                            }}
                            className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                          >
                            Chọn mua
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Prod 3: Pearlie Mouthwash */}
                    <div className="bg-white rounded-2xl p-3 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group relative">
                      <div className="absolute top-2 left-2 z-10">
                        <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          🇸🇬 Singapore
                        </span>
                      </div>
                      <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                        <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_01900_6fe44907dd.jpg" alt="Pearlie Mouthwash" className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                            Nước Súc Miệng Pearlie White Chlor-Rinse Plus (250ml)
                          </h4>
                          <div className="flex items-baseline gap-1 mt-2">
                            <strong className="text-[13px] font-black text-[#024ad8]">175.000đ</strong>
                            <span className="text-[9px] text-graphite font-semibold">/ Chai</span>
                          </div>
                        </div>
                        <div>
                          <div className="inline-block bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2 py-0.5 rounded-lg mt-3">
                            Chai x 250ml
                          </div>
                          <button 
                            onClick={() => {
                              setCart(prev => ({ ...prev, "pearlie-wash": (prev["pearlie-wash"] || 0) + 1 }));
                              triggerToast("Đã thêm Nước súc miệng Pearlie White vào giỏ hàng.");
                            }}
                            className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                          >
                            Chọn mua
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Prod 4: Su Bac Gel */}
                    <div className="bg-white rounded-2xl p-3 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group relative">
                      <div className="absolute top-2 left-2 z-10">
                        <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          🇻🇳 Việt Nam
                        </span>
                      </div>
                      <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                        <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/00006940_su_bac_gel_lam_sach_sat_khuan_da_8596_63aa_large_5e8c66eecc.jpg" alt="Su Bac Gel" className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                            Gel bôi Su Bạc kháng khuẩn, làm sạch da (25g)
                          </h4>
                          <div className="flex items-baseline gap-1 mt-2">
                            <strong className="text-[13px] font-black text-[#024ad8]">150.000đ</strong>
                            <span className="text-[9px] text-graphite font-semibold">/ Hộp</span>
                          </div>
                        </div>
                        <div>
                          <div className="inline-block bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2 py-0.5 rounded-lg mt-3">
                            Hộp x 25g
                          </div>
                          <button 
                            onClick={() => {
                              setCart(prev => ({ ...prev, "subac-gel": (prev["subac-gel"] || 0) + 1 }));
                              triggerToast("Đã thêm Gel Su Bạc vào giỏ hàng.");
                            }}
                            className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                          >
                            Chọn mua
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Render Tab 1 (Viêm não mô cầu) */}
                {activeSeasonalTab === 1 && (
                  <>
                    {/* Prod 1: Fysoline Septinasal */}
                    <div className="bg-white rounded-2xl p-3 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group relative">
                      <div className="absolute top-2 left-2 z-10">
                        <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          🇫🇷 Pháp
                        </span>
                      </div>
                      <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                        <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09757_76bf71dab2.png" alt="Fysoline Septinasal" className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                            Nước muối sinh lý Fysoline Septinasal (20 ống x 5ml) giúp giảm...
                          </h4>
                          
                          {/* Unit switcher */}
                          <div className="flex items-center gap-1.5 mt-2 bg-cloud p-0.5 rounded-lg border border-fog w-fit">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setFysolineSeptiUnit("hop"); }}
                              className={`text-[9px] font-bold px-2 py-0.5 rounded ${fysolineSeptiUnit === "hop" ? "bg-white text-[#024ad8] shadow-sm border border-sky-100" : "text-graphite hover:text-ink"}`}
                            >
                              Hộp
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setFysolineSeptiUnit("ong"); }}
                              className={`text-[9px] font-bold px-2 py-0.5 rounded ${fysolineSeptiUnit === "ong" ? "bg-white text-[#024ad8] shadow-sm border border-sky-100" : "text-graphite hover:text-ink"}`}
                            >
                              Ống
                            </button>
                          </div>

                          <div className="flex items-baseline gap-1 mt-2">
                            <strong className="text-[13px] font-black text-[#024ad8]">
                              {fysolineSeptiUnit === "hop" ? "193.000đ" : "9.650đ"}
                            </strong>
                            <span className="text-[9px] text-graphite font-semibold">
                              / {fysolineSeptiUnit === "hop" ? "Hộp" : "Ống"}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="inline-block bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2 py-0.5 rounded-lg mt-3">
                            {fysolineSeptiUnit === "hop" ? "Hộp 20 Ống x 5ml" : "Ống 5ml"}
                          </div>
                          <button 
                            onClick={() => {
                              const key = fysolineSeptiUnit === "hop" ? "fysoline-septi-box" : "fysoline-septi-tube";
                              setCart(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
                              triggerToast(`Đã thêm Fysoline Septinasal (${fysolineSeptiUnit === "hop" ? "Hộp" : "Ống"}) vào giỏ hàng.`);
                            }}
                            className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                          >
                            Chọn mua
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Prod 2: Fysoline Isotonique */}
                    <div className="bg-white rounded-2xl p-3 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group relative">
                      <div className="absolute top-2 left-2 z-10">
                        <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          🇫🇷 Pháp
                        </span>
                      </div>
                      <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                        <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09895_dac9a658d8.jpg" alt="Fysoline Isotonique" className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                            Nước muối sinh lý Fysoline Isotonique đẳng trương (40 ống x...
                          </h4>
                          
                          {/* Unit switcher */}
                          <div className="flex items-center gap-1.5 mt-2 bg-cloud p-0.5 rounded-lg border border-fog w-fit">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setFysolineIsoUnit("hop"); }}
                              className={`text-[9px] font-bold px-2 py-0.5 rounded ${fysolineIsoUnit === "hop" ? "bg-white text-[#024ad8] shadow-sm border border-sky-100" : "text-graphite hover:text-ink"}`}
                            >
                              Hộp
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setFysolineIsoUnit("ong"); }}
                              className={`text-[9px] font-bold px-2 py-0.5 rounded ${fysolineIsoUnit === "ong" ? "bg-white text-[#024ad8] shadow-sm border border-sky-100" : "text-graphite hover:text-ink"}`}
                            >
                              Ống
                            </button>
                          </div>

                          <div className="flex items-baseline gap-1 mt-2">
                            <strong className="text-[13px] font-black text-[#024ad8]">
                              {fysolineIsoUnit === "hop" ? "166.000đ" : "4.150đ"}
                            </strong>
                            <span className="text-[9px] text-graphite font-semibold">
                              / {fysolineIsoUnit === "hop" ? "Hộp" : "Ống"}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="inline-block bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2 py-0.5 rounded-lg mt-3">
                            {fysolineIsoUnit === "hop" ? "Hộp 40 Ống x 5ml" : "Ống 5ml"}
                          </div>
                          <button 
                            onClick={() => {
                              const key = fysolineIsoUnit === "hop" ? "fysoline-iso-box" : "fysoline-iso-tube";
                              setCart(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
                              triggerToast(`Đã thêm Fysoline Isotonique (${fysolineIsoUnit === "hop" ? "Hộp" : "Ống"}) vào giỏ hàng.`);
                            }}
                            className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                          >
                            Chọn mua
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Prod 3: Famapro Mask */}
                    <div className="bg-white rounded-2xl p-3 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group relative">
                      <div className="absolute top-2 left-2 z-10">
                        <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          🇻🇳 Việt Nam
                        </span>
                      </div>
                      <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                        <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_08159_6dcd5953f8.jpg" alt="Famapro Mask" className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                            Khẩu trang 4 lớp Famapro Extra màu trắng (50 cái) Nam A...
                          </h4>
                          
                          {/* Unit switcher */}
                          <div className="flex items-center gap-1.5 mt-2 bg-cloud p-0.5 rounded-lg border border-fog w-fit">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setFamaproUnit("hop"); }}
                              className={`text-[9px] font-bold px-2 py-0.5 rounded ${famaproUnit === "hop" ? "bg-white text-[#024ad8] shadow-sm border border-sky-100" : "text-graphite hover:text-ink"}`}
                            >
                              Hộp
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setFamaproUnit("goi"); }}
                              className={`text-[9px] font-bold px-2 py-0.5 rounded ${famaproUnit === "goi" ? "bg-white text-[#024ad8] shadow-sm border border-sky-100" : "text-graphite hover:text-ink"}`}
                            >
                              Gói
                            </button>
                          </div>

                          <div className="flex items-baseline gap-1 mt-2">
                            <strong className="text-[13px] font-black text-[#024ad8]">
                              {famaproUnit === "hop" ? "40.000đ" : "8.000đ"}
                            </strong>
                            <span className="text-[9px] text-graphite font-semibold">
                              / {famaproUnit === "hop" ? "Hộp" : "Gói"}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="inline-block bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2 py-0.5 rounded-lg mt-3">
                            {famaproUnit === "hop" ? "Hộp 5 Gói x 10 Cái" : "Gói 10 Cái"}
                          </div>
                          <button 
                            onClick={() => {
                              const key = famaproUnit === "hop" ? "famapro-box" : "famapro-pack";
                              setCart(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
                              triggerToast(`Đã thêm Khẩu trang Famapro (${famaproUnit === "hop" ? "Hộp" : "Gói"}) vào giỏ hàng.`);
                            }}
                            className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                          >
                            Chọn mua
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Prod 4: Dolphin Mask */}
                    <div className="bg-white rounded-2xl p-3 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group relative">
                      <div className="absolute top-2 left-2 z-10">
                        <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          🇻🇳 Việt Nam
                        </span>
                      </div>
                      <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                        <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/IMG_0188_f4db0565ff.jpg" alt="Dolphin Mask" className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                            Khẩu trang trẻ em 4 lớp 3D Dolphin Mask (10 cái) ngăn khói bụi, vi...
                          </h4>
                          <div className="flex items-baseline gap-1 mt-2">
                            <strong className="text-[13px] font-black text-[#024ad8]">24.000đ</strong>
                            <span className="text-[9px] text-graphite font-semibold">/ Hộp</span>
                          </div>
                        </div>
                        <div>
                          <div className="inline-block bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2 py-0.5 rounded-lg mt-3">
                            Hộp 10 Cái
                          </div>
                          <button 
                            onClick={() => {
                              setCart(prev => ({ ...prev, "dolphin-mask": (prev["dolphin-mask"] || 0) + 1 }));
                              triggerToast("Đã thêm Khẩu trang Dolphin vào giỏ hàng.");
                            }}
                            className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                          >
                            Chọn mua
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Render Tab 2 (Cúm) */}
                {activeSeasonalTab === 2 && (
                  <>
                    {/* Prod 1: Panadol Extra */}
                    <div className="bg-white rounded-2xl p-3 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group relative">
                      <div className="absolute top-2 left-2 z-10">
                        <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          🇬🇧 Anh
                        </span>
                      </div>
                      <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                        <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_099842_74c1fc532a.png" alt="Panadol Extra" className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                            Viên nén Panadol Extra đỏ GSK giảm mạnh các cơn đau, hạ sốt, điều...
                          </h4>
                          
                          {/* Unit switcher */}
                          <div className="flex items-center gap-1.5 mt-2 bg-cloud p-0.5 rounded-lg border border-fog w-fit">
                            {["Hộp", "Vỉ", "Viên"].map((unit) => {
                              const val = unit === "Hộp" ? "hop" : unit === "Vỉ" ? "vi" : "vien";
                              return (
                                <button 
                                  key={val}
                                  onClick={(e) => { e.stopPropagation(); setPanadolUnit(val as any); }}
                                  className={`text-[9px] font-bold px-2 py-0.5 rounded ${panadolUnit === val ? "bg-white text-[#024ad8] shadow-sm border border-sky-100" : "text-graphite hover:text-ink"}`}
                                >
                                  {unit}
                                </button>
                              );
                            })}
                          </div>

                          <div className="flex items-baseline gap-1 mt-2">
                            <strong className="text-[13px] font-black text-[#024ad8]">
                              {panadolUnit === "hop" ? "252.000đ" : panadolUnit === "vi" ? "16.800đ" : "1.400đ"}
                            </strong>
                            <span className="text-[9px] text-graphite font-semibold">
                              / {panadolUnit === "hop" ? "Hộp" : panadolUnit === "vi" ? "Vỉ" : "Viên"}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="inline-block bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2 py-0.5 rounded-lg mt-3">
                            {panadolUnit === "hop" ? "Hộp 15 Vỉ x 12 Viên" : panadolUnit === "vi" ? "Vỉ 12 Viên" : "1 Viên"}
                          </div>
                          <button 
                            onClick={() => {
                              const key = `panadol-${panadolUnit}`;
                              setCart(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
                              triggerToast(`Đã thêm Panadol Extra (${panadolUnit === "hop" ? "Hộp" : panadolUnit === "vi" ? "Vỉ" : "Viên"}) vào giỏ hàng.`);
                            }}
                            className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                          >
                            Chọn mua
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Prod 2: Acemuc */}
                    <div className="bg-white rounded-2xl p-3 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group relative">
                      <div className="absolute top-2 left-2 z-10">
                        <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          🇫🇷 Pháp
                        </span>
                      </div>
                      <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                        <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/acemuc_200_3x10_sanofi_00000462_73028f19a5.png" alt="Acemuc" className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                            Thuốc Acemuc 200mg Sanofi long đờm, tiêu nhầy, giảm ho...
                          </h4>
                          
                          {/* Unit switcher */}
                          <div className="flex items-center gap-1.5 mt-2 bg-cloud p-0.5 rounded-lg border border-fog w-fit">
                            {["Hộp", "Vỉ", "Viên"].map((unit) => {
                              const val = unit === "Hộp" ? "hop" : unit === "Vỉ" ? "vi" : "vien";
                              return (
                                <button 
                                  key={val}
                                  onClick={(e) => { e.stopPropagation(); setAcemucUnit(val as any); }}
                                  className={`text-[9px] font-bold px-2 py-0.5 rounded ${acemucUnit === val ? "bg-white text-[#024ad8] shadow-sm border border-sky-100" : "text-graphite hover:text-ink"}`}
                                >
                                  {unit}
                                </button>
                              );
                            })}
                          </div>

                          <div className="flex items-baseline gap-1 mt-2">
                            <strong className="text-[13px] font-black text-[#024ad8]">
                              {acemucUnit === "hop" ? "81.000đ" : acemucUnit === "vi" ? "27.000đ" : "2.700đ"}
                            </strong>
                            <span className="text-[9px] text-graphite font-semibold">
                              / {acemucUnit === "hop" ? "Hộp" : acemucUnit === "vi" ? "Vỉ" : "Viên"}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="inline-block bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2 py-0.5 rounded-lg mt-3">
                            {acemucUnit === "hop" ? "Hộp 3 Vỉ x 10 Viên" : acemucUnit === "vi" ? "Vỉ 10 Viên" : "1 Viên"}
                          </div>
                          <button 
                            onClick={() => {
                              const key = `acemuc-${acemucUnit}`;
                              setCart(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
                              triggerToast(`Đã thêm Acemuc (${acemucUnit === "hop" ? "Hộp" : "Chai" /* wait, Viên */}) vào giỏ hàng.`);
                            }}
                            className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                          >
                            Chọn mua
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Prod 3: Telfast */}
                    <div className="bg-white rounded-2xl p-3 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group relative">
                      <div className="absolute top-2 left-2 z-10">
                        <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          🇫🇷 Pháp
                        </span>
                      </div>
                      <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                        <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/1_467af3daf4.png" alt="Telfast 180" className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                            Thuốc chống dị ứng Telfast HD 180mg Sanofi giảm triệu...
                          </h4>
                          
                          {/* Unit switcher */}
                          <div className="flex items-center gap-1.5 mt-2 bg-cloud p-0.5 rounded-lg border border-fog w-fit">
                            {["Hộp", "Vỉ", "Viên"].map((unit) => {
                              const val = unit === "Hộp" ? "hop" : unit === "Vỉ" ? "vi" : "vien";
                              return (
                                <button 
                                  key={val}
                                  onClick={(e) => { e.stopPropagation(); setTelfastUnit(val as any); }}
                                  className={`text-[9px] font-bold px-2 py-0.5 rounded ${telfastUnit === val ? "bg-white text-[#024ad8] shadow-sm border border-sky-100" : "text-graphite hover:text-ink"}`}
                                >
                                  {unit}
                                </button>
                              );
                            })}
                          </div>

                          <div className="flex items-baseline gap-1 mt-2">
                            <strong className="text-[13px] font-black text-[#024ad8]">
                              {telfastUnit === "hop" ? "268.000đ" : telfastUnit === "vi" ? "89.330đ" : "8.933đ"}
                            </strong>
                            <span className="text-[9px] text-graphite font-semibold">
                              / {telfastUnit === "hop" ? "Hộp" : telfastUnit === "vi" ? "Vỉ" : "Viên"}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="inline-block bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2 py-0.5 rounded-lg mt-3">
                            {telfastUnit === "hop" ? "Hộp 3 Vỉ x 10 Viên" : telfastUnit === "vi" ? "Vỉ 10 Viên" : "1 Viên"}
                          </div>
                          <button 
                            onClick={() => {
                              const key = `telfast-${telfastUnit}`;
                              setCart(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
                              triggerToast(`Đã thêm Telfast HD (${telfastUnit === "hop" ? "Hộp" : "Vỉ" /* Viên */}) vào giỏ hàng.`);
                            }}
                            className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                          >
                            Chọn mua
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Prod 4: Kudos Vitamin C */}
                    <div className="bg-white rounded-2xl p-3 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group relative">
                      <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
                        <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          🇩🇪 Đức
                        </span>
                        <span className="bg-[#ea3829] text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg shadow-sm">
                          -10%
                        </span>
                      </div>
                      <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                        <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09324_db795e136a.jpg" alt="Kudos Vitamin C" className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                            Viên sủi giúp bổ sung vitamin C cho cơ thể Kudos Vitamin C...
                          </h4>
                          <div className="flex flex-col mt-2">
                            <div className="flex items-baseline gap-1">
                              <strong className="text-[13px] font-black text-[#024ad8]">113.400đ</strong>
                              <span className="text-[9px] text-graphite font-semibold">/ Tuýp</span>
                            </div>
                            <span className="text-[9px] text-gray-400 line-through">126.000đ</span>
                          </div>
                        </div>
                        <div>
                          <div className="inline-block bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2 py-0.5 rounded-lg mt-3">
                            Tuýp 20 Viên
                          </div>
                          <button 
                            onClick={() => {
                              setCart(prev => ({ ...prev, "kudos-vitc": (prev["kudos-vitc"] || 0) + 1 }));
                              triggerToast("Đã thêm Kudos Vitamin C vào giỏ hàng.");
                            }}
                            className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                          >
                            Chọn mua
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Render Tab 3 (Sốt xuất huyết) */}
                {activeSeasonalTab === 3 && (
                  <>
                    {/* Prod 1: Kamizol Orange */}
                    <div className="bg-white rounded-2xl p-3 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group relative">
                      <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
                        <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          🇻🇳 Việt Nam
                        </span>
                        <span className="bg-[#ea3829] text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg shadow-sm">
                          -20%
                        </span>
                      </div>
                      <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                        <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/IMG_5064_7c5c85e337.jpg" alt="Kamizol Orange" className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                            Nước Bù Điện Giải Kamizol Vị Cam (250ml)
                          </h4>
                          
                          {/* Unit switcher */}
                          <div className="flex items-center gap-1.5 mt-2 bg-cloud p-0.5 rounded-lg border border-fog w-fit">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setKamizolOrangeUnit("thung"); }}
                              className={`text-[9px] font-bold px-2 py-0.5 rounded ${kamizolOrangeUnit === "thung" ? "bg-white text-[#024ad8] shadow-sm border border-sky-100" : "text-graphite hover:text-ink"}`}
                            >
                              Thùng
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setKamizolOrangeUnit("chai"); }}
                              className={`text-[9px] font-bold px-2 py-0.5 rounded ${kamizolOrangeUnit === "chai" ? "bg-white text-[#024ad8] shadow-sm border border-sky-100" : "text-graphite hover:text-ink"}`}
                            >
                              Chai
                            </button>
                          </div>

                          <div className="flex flex-col mt-2">
                            <div className="flex items-baseline gap-1">
                              <strong className="text-[13px] font-black text-[#024ad8]">
                                {kamizolOrangeUnit === "thung" ? "201.600đ" : "8.400đ"}
                              </strong>
                              <span className="text-[9px] text-graphite font-semibold">
                                / {kamizolOrangeUnit === "thung" ? "Thùng" : "Chai"}
                              </span>
                            </div>
                            <span className="text-[9px] text-gray-400 line-through">
                              {kamizolOrangeUnit === "thung" ? "252.000đ" : "10.500đ"}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="inline-block bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2 py-0.5 rounded-lg mt-3">
                            {kamizolOrangeUnit === "thung" ? "Thùng 24 Chai x 250ml" : "Chai 250ml"}
                          </div>
                          <button 
                            onClick={() => {
                              const key = kamizolOrangeUnit === "thung" ? "kamizol-orange-box" : "kamizol-orange-bottle";
                              setCart(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
                              triggerToast(`Đã thêm Kamizol Cam (${kamizolOrangeUnit === "thung" ? "Thùng" : "Chai"}) vào giỏ hàng.`);
                            }}
                            className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                          >
                            Chọn mua
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Prod 2: Kamizol Lemon */}
                    <div className="bg-white rounded-2xl p-3 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group relative">
                      <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
                        <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          🇻🇳 Việt Nam
                        </span>
                        <span className="bg-[#ea3829] text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg shadow-sm">
                          -20%
                        </span>
                      </div>
                      <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                        <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/IMG_5077_cc650f0dc4.jpg" alt="Kamizol Lemon" className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                            Nước Bù Điện Giải Kamizol Vị Chanh (250ml)
                          </h4>
                          
                          {/* Unit switcher */}
                          <div className="flex items-center gap-1.5 mt-2 bg-cloud p-0.5 rounded-lg border border-fog w-fit">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setKamizolLemonUnit("thung"); }}
                              className={`text-[9px] font-bold px-2 py-0.5 rounded ${kamizolLemonUnit === "thung" ? "bg-white text-[#024ad8] shadow-sm border border-sky-100" : "text-graphite hover:text-ink"}`}
                            >
                              Thùng
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setKamizolLemonUnit("chai"); }}
                              className={`text-[9px] font-bold px-2 py-0.5 rounded ${kamizolLemonUnit === "chai" ? "bg-white text-[#024ad8] shadow-sm border border-sky-100" : "text-graphite hover:text-ink"}`}
                            >
                              Chai
                            </button>
                          </div>

                          <div className="flex flex-col mt-2">
                            <div className="flex items-baseline gap-1">
                              <strong className="text-[13px] font-black text-[#024ad8]">
                                {kamizolLemonUnit === "thung" ? "201.600đ" : "8.400đ"}
                              </strong>
                              <span className="text-[9px] text-graphite font-semibold">
                                / {kamizolLemonUnit === "thung" ? "Thùng" : "Chai"}
                              </span>
                            </div>
                            <span className="text-[9px] text-gray-400 line-through">
                              {kamizolLemonUnit === "thung" ? "252.000đ" : "10.500đ"}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="inline-block bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2 py-0.5 rounded-lg mt-3">
                            {kamizolLemonUnit === "thung" ? "Thùng 24 Chai x 250ml" : "Chai 250ml"}
                          </div>
                          <button 
                            onClick={() => {
                              const key = kamizolLemonUnit === "thung" ? "kamizol-lemon-box" : "kamizol-lemon-bottle";
                              setCart(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
                              triggerToast(`Đã thêm Kamizol Chanh (${kamizolLemonUnit === "thung" ? "Thùng" : "Chai"}) vào giỏ hàng.`);
                            }}
                            className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                          >
                            Chọn mua
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Prod 3: Kamizol Powder */}
                    <div className="bg-white rounded-2xl p-3 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group relative">
                      <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
                        <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          🇻🇳 Việt Nam
                        </span>
                        <span className="bg-[#ea3829] text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg shadow-sm">
                          -20%
                        </span>
                      </div>
                      <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                        <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_06452_66c43d8446.jpg" alt="Kamizol Powder" className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                            Bột Điện Giải Vị Chanh Dây Kamizol Sports Drink Powder (5 gói x...
                          </h4>
                          <div className="flex flex-col mt-2">
                            <div className="flex items-baseline gap-1">
                              <strong className="text-[13px] font-black text-[#024ad8]">32.000đ</strong>
                              <span className="text-[9px] text-graphite font-semibold">/ Hộp</span>
                            </div>
                            <span className="text-[9px] text-gray-400 line-through">40.000đ</span>
                          </div>
                        </div>
                        <div>
                          <div className="inline-block bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2 py-0.5 rounded-lg mt-3">
                            Hộp 5 Gói x 25g
                          </div>
                          <button 
                            onClick={() => {
                              setCart(prev => ({ ...prev, "kamizol-powder": (prev["kamizol-powder"] || 0) + 1 }));
                              triggerToast("Đã thêm Bột điện giải Kamizol vào giỏ hàng.");
                            }}
                            className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                          >
                            Chọn mua
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Prod 4: Microlife Thermometer */}
                    <div className="bg-white rounded-2xl p-3 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group relative">
                      <div className="absolute top-2 left-2 z-10">
                        <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          🇨🇭 Thụy Sĩ
                        </span>
                      </div>
                      <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                        <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/00502788_nhiet_ke_hong_ngoai_do_tran_microlife_nc200_7708_6391_large_84c0ed9d82.jpg" alt="Microlife NC200" className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                            Nhiệt kế hồng ngoại đo trán Microlife NC200
                          </h4>
                          <div className="flex items-baseline gap-1 mt-2">
                            <strong className="text-[13px] font-black text-[#024ad8]">990.000đ</strong>
                            <span className="text-[9px] text-graphite font-semibold">/ Hộp</span>
                          </div>
                        </div>
                        <div>
                          <div className="inline-block bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2.5 py-1 rounded-lg mt-3">
                            Hộp 1 Cái
                          </div>
                          <button 
                            onClick={() => {
                              setCart(prev => ({ ...prev, "microlife-nc200": (prev["microlife-nc200"] || 0) + 1 }));
                              triggerToast("Đã thêm Nhiệt kế Microlife NC200 vào giỏ hàng.");
                            }}
                            className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                          >
                            Chọn mua
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

              </div>

            </div>

            {/* Aesthetic slide next button indicator */}
            <div className="absolute top-[60%] right-2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-sky-100 hover:bg-cloud flex items-center justify-center shadow-md text-[#4b5563] hover:text-[#111827] cursor-pointer transition-colors z-20 md:flex hidden">
              <ChevronRight size={16} />
            </div>

          </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in zoom-in-95 duration-300">
              {/* Demographic Diseases Grid (Bệnh theo đối tượng) */}
              
              {/* Card 1: Bệnh Nam Giới */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-fog flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <img src="/benh_nam_gioi.png" alt="Bệnh Nam Giới" className="w-full h-[140px] object-cover rounded-xl mb-4" />
                <h3 className="font-black text-[15px] text-ink mb-3 uppercase tracking-wide">Bệnh Nam Giới</h3>
                <ul className="flex-1 flex flex-col gap-2 mb-4">
                  {["Loãng xương ở nam", "Di tinh, mộng tinh", "Hẹp bao quy đầu", "Yếu sinh lý"].map((item, i) => (
                    <li key={i} className="text-[13px] text-gray-500 font-semibold flex items-center gap-2 hover:text-[#024ad8] cursor-pointer transition-colors">
                      <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="text-[#024ad8] font-bold text-xs flex items-center gap-1 cursor-pointer hover:underline">
                  Tìm hiểu thêm <ChevronRight size={14} />
                </div>
              </div>

              {/* Card 2: Bệnh Nữ Giới */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-fog flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <img src="/benh_nu_gioi.png" alt="Bệnh Nữ Giới" className="w-full h-[140px] object-cover rounded-xl mb-4" />
                <h3 className="font-black text-[15px] text-ink mb-3 uppercase tracking-wide">Bệnh Nữ Giới</h3>
                <ul className="flex-1 flex flex-col gap-2 mb-4">
                  {["Hội chứng tiền kinh nguyệt", "Hội chứng tiền mãn kinh", "Chậm kinh", "Mất kinh"].map((item, i) => (
                    <li key={i} className="text-[13px] text-gray-500 font-semibold flex items-center gap-2 hover:text-[#024ad8] cursor-pointer transition-colors">
                      <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="text-[#024ad8] font-bold text-xs flex items-center gap-1 cursor-pointer hover:underline">
                  Tìm hiểu thêm <ChevronRight size={14} />
                </div>
              </div>

              {/* Card 3: Bệnh Người Già */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-fog flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <img src="/benh_nguoi_gia.png" alt="Bệnh Người Già" className="w-full h-[140px] object-cover rounded-xl mb-4" />
                <h3 className="font-black text-[15px] text-ink mb-3 uppercase tracking-wide">Bệnh Người Già</h3>
                <ul className="flex-1 flex flex-col gap-2 mb-4">
                  {["Alzheimer", "Parkinson", "Parkinson thứ phát", "Đục thủy tinh thể ở người già"].map((item, i) => (
                    <li key={i} className="text-[13px] text-gray-500 font-semibold flex items-center gap-2 hover:text-[#024ad8] cursor-pointer transition-colors">
                      <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="text-[#024ad8] font-bold text-xs flex items-center gap-1 cursor-pointer hover:underline">
                  Tìm hiểu thêm <ChevronRight size={14} />
                </div>
              </div>

              {/* Card 4: Bệnh Trẻ Em */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-fog flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <img src="/benh_tre_em.png" alt="Bệnh Trẻ Em" className="w-full h-[140px] object-cover rounded-xl mb-4" />
                <h3 className="font-black text-[15px] text-ink mb-3 uppercase tracking-wide">Bệnh Trẻ Em</h3>
                <ul className="flex-1 flex flex-col gap-2 mb-4">
                  {["Bại não trẻ em", "Tự kỷ", "Uốn ván", "Tắc ruột sơ sinh"].map((item, i) => (
                    <li key={i} className="text-[13px] text-gray-500 font-semibold flex items-center gap-2 hover:text-[#024ad8] cursor-pointer transition-colors">
                      <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="text-[#024ad8] font-bold text-xs flex items-center gap-1 cursor-pointer hover:underline">
                  Tìm hiểu thêm <ChevronRight size={14} />
                </div>
              </div>

            </div>
          )}

          {/* Trust Indicators Section */}
          <div className="mt-8 border-t border-fog/60 pt-6 px-2 flex flex-wrap justify-between gap-6 md:gap-4 items-center">
            
            <div className="flex items-center gap-3 min-w-[200px]">
              <div className="text-[#024ad8]">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-black text-[#1a1a1a]">Thuốc chính hãng</span>
                <span className="text-[11px] font-semibold text-gray-500">đa dạng và chuyên sâu</span>
              </div>
            </div>

            <div className="flex items-center gap-3 min-w-[200px]">
              <div className="text-[#024ad8]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-black text-[#1a1a1a]">Đổi trả trong 30 ngày</span>
                <span className="text-[11px] font-semibold text-gray-500">kể từ ngày mua hàng</span>
              </div>
            </div>

            <div className="flex items-center gap-3 min-w-[200px]">
              <div className="text-[#024ad8]">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-black text-[#1a1a1a]">Cam kết 100%</span>
                <span className="text-[11px] font-semibold text-gray-500">chất lượng sản phẩm</span>
              </div>
            </div>

            <div className="flex items-center gap-3 min-w-[200px]">
              <div className="text-[#024ad8]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-black text-[#1a1a1a]">Miễn phí vận chuyển</span>
                <span className="text-[11px] font-semibold text-gray-500">theo chính sách giao hàng</span>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* 9. FOOTER */}
      <footer className="bg-white">
        {/* Blue Bar */}
        <div className="bg-[#024ad8] py-4 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white">
              <MapPin size={24} className="text-white" />
              <span className="text-base font-bold">Xem hệ thống nhà thuốc trên toàn quốc</span>
            </div>
            <button className="bg-white text-[#024ad8] font-bold text-sm px-6 py-2.5 rounded-full hover:bg-cloud transition-colors shadow-sm">
              Xem danh sách nhà thuốc
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 border-b border-fog">
          {/* Column 1: VỀ CHÚNG TÔI */}
          <div>
            <h4 className="text-[11px] font-bold text-ink uppercase mb-4 tracking-wide">Về chúng tôi</h4>
            <ul className="flex flex-col gap-3 text-[13px] text-gray-600 font-medium">
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Giới thiệu</Link></li>
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Hệ thống của hàng</Link></li>
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Giấy phép kinh doanh</Link></li>
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Quy chế hoạt động</Link></li>
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Chính sách đặt cọc</Link></li>
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Chính sách nội dung</Link></li>
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Chính sách đổi trả thuốc</Link></li>
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Chính sách giao hàng</Link></li>
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Chính sách bảo mật</Link></li>
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Chính sách thanh toán</Link></li>
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Kiểm tra hóa đơn điện tử</Link></li>
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Tra cứu thông tin bảo hành</Link></li>
            </ul>
          </div>

          {/* Column 2: DANH MỤC */}
          <div>
            <h4 className="text-[11px] font-bold text-ink uppercase mb-4 tracking-wide">Danh mục</h4>
            <ul className="flex flex-col gap-3 text-[13px] text-gray-600 font-medium">
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Thực phẩm chức năng</Link></li>
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Dược mỹ phẩm</Link></li>
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Thuốc</Link></li>
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Chăm sóc cá nhân</Link></li>
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Trang thiết bị y tế</Link></li>
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Góc sức khỏe</Link></li>
            </ul>
          </div>

          {/* Column 3: TÌM HIỂU THÊM */}
          <div>
            <h4 className="text-[11px] font-bold text-ink uppercase mb-4 tracking-wide">Tìm hiểu thêm</h4>
            <ul className="flex flex-col gap-3 text-[13px] text-gray-600 font-medium">
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Góc sức khoẻ</Link></li>
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Tra cứu thuốc</Link></li>
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Tra cứu dược chất</Link></li>
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Tra cứu dược liệu</Link></li>
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Bệnh thường gặp</Link></li>
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Bệnh viện</Link></li>
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Đội ngũ chuyên môn</Link></li>
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Tin tức tuyển dụng</Link></li>
              <li><Link href="#" className="hover:text-[#024ad8] transition-colors">Tin tức sự kiện</Link></li>
            </ul>
          </div>

          {/* Column 4: TỔNG ĐÀI */}
          <div>
            <h4 className="text-[11px] font-bold text-ink uppercase mb-4 tracking-wide">Tổng đài (8:00 - 22:00)</h4>
            <ul className="flex flex-col gap-4 text-[13px] text-gray-600 font-medium">
              <li>
                Tư vấn mua hàng<br/>
                <strong className="text-[#024ad8] text-[14px]">18006928</strong> (Nhánh 1)
              </li>
              <li>
                Tư vấn Tiêm chủng<br/>
                <strong className="text-[#024ad8] text-[14px]">18006928</strong> (Nhánh 2)
              </li>
              <li>
                Tư vấn Xét nghiệm<br/>
                <strong className="text-[#024ad8] text-[14px]">18006928</strong> (Nhánh 3)
              </li>
              <li>
                Góp ý, khiếu nại và tiếp nhận cảnh báo thông tin vi phạm<br/>
                <strong className="text-[#024ad8] text-[14px]">18006928</strong> (Nhánh 4)
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-[11px] font-bold text-ink uppercase mb-3 tracking-wide">Chứng nhận bởi</h4>
              <div className="flex gap-2 items-center">
                <div className="bg-cloud text-ink font-bold text-[10px] px-2 py-1 border border-fog rounded flex items-center gap-1">
                  <ShieldCheck size={12} className="text-blue-500" /> Đã thông báo Bộ Công Thương
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-[11px] font-bold text-ink uppercase mb-3 tracking-wide">Hỗ trợ thanh toán</h4>
              <div className="flex gap-2 items-center flex-wrap">
                <div className="bg-cloud text-[10px] font-bold text-[#1434CB] border border-fog px-2 py-1 rounded shadow-sm">VISA</div>
                <div className="bg-cloud text-[10px] font-bold text-[#EB001B] border border-fog px-2 py-1 rounded shadow-sm">MasterCard</div>
                <div className="bg-cloud text-[10px] font-bold text-[#A50064] border border-fog px-2 py-1 rounded shadow-sm">MoMo</div>
                <div className="bg-cloud text-[10px] font-bold text-[#005BAA] border border-fog px-2 py-1 rounded shadow-sm">VNPay</div>
              </div>
            </div>
          </div>

          {/* Column 5: KẾT NỐI */}
          <div>
            <h4 className="text-[11px] font-bold text-ink uppercase mb-4 tracking-wide">Kết nối với chúng tôi</h4>
            <div className="flex gap-3 mb-6">
              <a href="#" className="text-[#024ad8] hover:opacity-80 transition-opacity">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
              </a>
              <a href="#" className="text-sky-500 hover:opacity-80 transition-opacity">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.11.03-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.25.38-.51 1.07-.78 4.2-1.82 7.01-3.04 8.43-3.63 4-.1.45.69.34.98.34z"/></svg>
              </a>
            </div>

            <h4 className="text-[11px] font-bold text-ink uppercase mb-4 tracking-wide">Tải ứng dụng Long Châu</h4>
            <div className="flex gap-2 items-start">
              <img src="/qr_code_app.png" alt="QR Code Long Chau App" className="w-[100px] h-[100px] border border-fog rounded-lg shadow-sm" />
            </div>
          </div>
        </div>

        {/* Footer Bottom / Disclaimer */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col gap-4 text-center">
          <div className="bg-bloom-wine/40 border border-bloom-deep/50 rounded-2xl p-4 text-xs text-bloom-rose leading-relaxed max-w-4xl mx-auto flex items-start gap-2 shadow-sm">
            <Info size={18} className="text-bloom-coral shrink-0 mt-0.5" />
            <p className="text-left">
              <strong>Tuyên bố miễn trừ trách nhiệm (Disclaimer):</strong> Toàn bộ dữ liệu hiển thị trên hệ thống là dữ liệu giả lập được sử dụng cho mục đích chạy thử nghiệm đồ án. Thông tin không thay thế cho các tư vấn chuyên môn của chuyên gia y tế thật.
            </p>
          </div>
          
          <div className="text-[12px] text-gray-500 font-medium leading-relaxed mt-2 space-y-1">
            <p className="text-sm font-bold text-ink mb-1">ĐỒ ÁN MÔN HỌC: CÔNG NGHỆ PHẦN MỀM</p>
            <p>Trường Đại học Công Nghệ Hutech</p>
            <p>Đề tài: Xây dựng hệ thống quản lý nhà thuốc PharmaAssist tích hợp kiểm tra tương tác thuốc</p>
            <p className="pt-2 text-primary font-semibold">Nhóm phát triển: PharmaAssist Team • Năm thực hiện: 2026</p>
            <p className="text-[10px] italic mt-2 text-gray-400">Website được xây dựng với mục đích học thuật, mọi thông tin chỉ mang tính chất minh họa và không có giá trị y khoa thực tế.</p>
          </div>
        </div>
      </footer>

      {/* 10. DETAIL MEDICINE MODAL */}
      {selectedMedicine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl border border-fog shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-hidden animate-slideUp">
            
            {/* Modal Header */}
            <div className="bg-cloud p-6 border-b border-fog flex justify-between items-center sticky top-0 z-10">
              <div>
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider block">
                  {selectedMedicine.category}
                </span>
                <h2 className="text-xl font-extrabold text-ink">
                  {selectedMedicine.name}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedMedicine(null)}
                className="text-graphite hover:text-ink hover:bg-fog p-1.5 rounded-full transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              
              {/* Image inside Modal if available */}
              {selectedMedicine.imageUrl && (
                <div className="bg-cloud h-48 w-full rounded-2xl flex items-center justify-center border border-fog overflow-hidden">
                  <img 
                    src={selectedMedicine.imageUrl} 
                    alt={selectedMedicine.name} 
                    className="h-full object-contain p-4" 
                  />
                </div>
              )}
              
              {/* Properties Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-cloud p-3 rounded-xl border border-fog">
                  <span className="text-[10px] text-graphite block">Hoạt chất chính</span>
                  <strong className="text-xs text-ink">{selectedMedicine.activeIngredient}</strong>
                </div>
                <div className="bg-cloud p-3 rounded-xl border border-fog">
                  <span className="text-[10px] text-graphite block">Dạng bào chế</span>
                  <strong className="text-xs text-ink">{selectedMedicine.dosageForm}</strong>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-ink mb-1.5 uppercase tracking-wider">
                  Mô tả thuốc
                </h4>
                <p className="text-xs text-ink-soft leading-relaxed bg-cloud p-3 rounded-xl border border-fog">
                  {selectedMedicine.description}
                </p>
              </div>

               {/* Usage Instructions */}
              <div>
                <h4 className="text-xs font-bold text-ink mb-1.5 uppercase tracking-wider">
                  Hướng dẫn sử dụng & Liều dùng
                </h4>
                <p className="text-xs text-ink-soft leading-relaxed bg-cloud p-3 rounded-xl border border-fog">
                  {selectedMedicine.usage}
                </p>
              </div>

              {/* Storage Instruction if available */}
              {selectedMedicine.storage && (
                <div>
                  <h4 className="text-xs font-bold text-ink mb-1.5 uppercase tracking-wider">
                    Hướng dẫn bảo quản
                  </h4>
                  <p className="text-xs text-ink-soft leading-relaxed bg-cloud p-3 rounded-xl border border-fog">
                    {selectedMedicine.storage}
                  </p>
                </div>
              )}

              {/* Side Effects */}
              <div>
                <h4 className="text-xs font-bold text-ink mb-1.5 uppercase tracking-wider">
                  Tác dụng phụ có thể gặp
                </h4>
                <p className="text-xs text-bloom-deep leading-relaxed bg-bloom-rose/40 p-3 rounded-xl border border-bloom-rose">
                  {selectedMedicine.sideEffects}
                </p>
              </div>

              {/* Warning / Disclaimer inside Modal */}
              <div className="bg-bloom-wine/10 border border-bloom-coral/30 rounded-xl p-3 text-[11px] text-bloom-deep flex gap-2">
                <Info size={16} className="text-bloom-coral shrink-0 mt-0.5" />
                <span>
                  * Thuốc chỉ dùng cho mục đích chạy thử đồ án. Không tự ý áp dụng y khoa thực tế.
                </span>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-cloud p-4 border-t border-fog flex justify-between items-center sticky bottom-0 z-10">
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-primary">
                  {selectedMedicine.price.toLocaleString("vi-VN")}đ
                </span>
                <span className="text-xs text-graphite">/ {selectedMedicine.unit}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedMedicine(null)}
                  className="bg-white hover:bg-fog text-ink text-xs font-bold px-4 py-2.5 rounded-xl border border-fog transition-all duration-300"
                >
                  Đóng
                </button>
                <button
                  onClick={(e) => { handleAddToCart(selectedMedicine, e); setSelectedMedicine(null); }}
                  disabled={!selectedMedicine.isAvailable}
                  className={`flex items-center justify-center gap-1.5 text-xs font-bold px-6 py-2.5 rounded-xl transition-all duration-300 ${
                    selectedMedicine.isAvailable 
                      ? "bg-primary hover:bg-primary-deep text-white shadow-sm" 
                      : "bg-steel text-white cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart size={14} />
                  Thêm vào giỏ
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TOAST SYSTEM */}
      {showToast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-ink text-white py-3 px-4 rounded-xl shadow-2xl border border-charcoal flex items-center justify-between gap-3 animate-slideIn">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-white p-1 rounded-md shrink-0">
              <Check size={14} />
            </div>
            <p className="text-xs font-medium">{toastMessage}</p>
          </div>
          <button 
            onClick={() => setShowToast(false)}
            className="text-graphite hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}

    </div>
  );
}
