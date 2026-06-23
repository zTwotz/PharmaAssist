"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
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
  ChevronLeft,
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
  Bot,
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
    href: "/thuc-pham-chuc-nang/than-kinh-nao",
    count: 55,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {/* Brain outline with details */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a6 6 0 01-6-6c0-2 1.5-3.5 2-4.5.5-1 0-2.5.5-3.5A3.5 3.5 0 0112 4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a6 6 0 006-6c0-2-1.5-3.5-2-4.5-.5-1 0-2.5-.5-3.5A3.5 3.5 0 0012 4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v16.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12.5h3M16.5 12.5h-3M8.5 9h2.5M15.5 9h-2.5" />
      </svg>
    )
  },
  {
    id: "vitamin",
    name: "Vitamin & Khoáng chất",
    filterName: "Vitamin & Khoáng chất",
    href: "/thuc-pham-chuc-nang/vitamin-and-khoang-chat",
    count: 83,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {/* Medicine/Vitamin Bottle with label */}
        <rect x="8" y="3" width="8" height="2" rx="0.5" />
        <rect x="6" y="5" width="12" height="15" rx="1.5" />
        <rect x="6" y="9" width="12" height="6" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    )
  },
  {
    id: "hormone",
    name: "Sinh lý - Nội tiết tố",
    filterName: "Sinh lý - Nội tiết tố",
    href: "/thuc-pham-chuc-nang/sinh-ly-noi-tiet-to",
    count: 44,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {/* Two bottles side-by-side */}
        <rect x="5" y="6" width="6" height="13" rx="1" />
        <rect x="6.5" y="4" width="3" height="2" rx="0.5" />
        <rect x="13" y="6" width="6" height="13" rx="1" />
        <rect x="14.5" y="4" width="3" height="2" rx="0.5" />
        <path d="M8 10v5M16 10v5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: "cardio",
    name: "Tim mạch - Huyết áp",
    filterName: "Tim mạch - Huyết áp",
    href: "/thuc-pham-chuc-nang/tim-mach-huyet-ap",
    count: 21,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {/* Heart with ECG pulse line */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h2.5l1.5-3.5 2 7 1.5-5 1.5 2.5H20" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21C6 14 3.5 10 3.5 7.5a4.5 4.5 0 018.5-2 4.5 4.5 0 018.5 2c0 2.5-2.5 6.5-8.5 13.5z" />
      </svg>
    )
  },
  {
    id: "immune",
    name: "Miễn dịch - Đề kháng",
    filterName: "Miễn dịch - Đề kháng",
    href: "/thuc-pham-chuc-nang/mien-dich-de-khang",
    count: 48,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {/* Shield with checkmark */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 11.5l2 2 4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  },
  {
    id: "digest",
    name: "Tiêu hóa",
    filterName: "Tiêu hóa",
    href: "/thuc-pham-chuc-nang/tieu-hoa",
    count: 70,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {/* Stomach shape */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c0 3-3 4-3 7 0 4.5 3.5 7 7 7s5-2 5-5.5c0-3.5-3.5-5.5-4-7.5M12 3v3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 13.5c1 1.5 2.5 1.5 3.5 0" />
      </svg>
    )
  },
  {
    id: "skin-solution",
    name: "Giải pháp làn da",
    filterName: "Giải pháp làn da",
    href: "/duoc-my-pham/giai-phap-lan-da",
    count: 71,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {/* Medical cross above skin layers */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v6M9 6h6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 14c4-2 6 2 10 0s6-2 10 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 18c4-2 6 2 10 0s6-2 10 0" />
      </svg>
    )
  },
  {
    id: "face-care",
    name: "Chăm sóc da mặt",
    filterName: "Chăm sóc da mặt",
    href: "/duoc-my-pham/cham-soc-da-mat",
    count: 158,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {/* Smiley face with sparkles */}
        <circle cx="12" cy="12" r="9" />
        <circle cx="9" cy="10.5" r="1" fill="currentColor" />
        <circle cx="15" cy="10.5" r="1" fill="currentColor" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 14.5c1.5 1.5 3.5 1.5 5 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12a1.5 1.5 0 103 0 1.5 1.5 0 10-3 0M15 12a1.5 1.5 0 103 0 1.5 1.5 0 10-3 0" />
      </svg>
    )
  },
  {
    id: "beauty",
    name: "Hỗ trợ làm đẹp",
    filterName: "Hỗ trợ làm đẹp",
    href: "/thuc-pham-chuc-nang/ho-tro-lam-dep",
    count: 18,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {/* Droplet with swirl/leaf */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.5 4.5-7 8.5-7 11.5A7 7 0 0012 21a7 7 0 007-6.5c0-3-2.5-7-7-11.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c2 0 3.5 1.5 3.5 3.5S14 18 12 18" />
      </svg>
    )
  },
  {
    id: "sex",
    name: "Hỗ trợ tình dục",
    filterName: "Hỗ trợ tình dục",
    href: "/cham-soc-ca-nhan/ho-tro-tinh-duc",
    count: 41,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {/* Intertwined gender symbols */}
        <circle cx="9.5" cy="14.5" r="4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 19v3M7.5 20.5h4" />
        <circle cx="14.5" cy="9.5" r="4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 5.5h3v3M17.5 8.5l4-4" />
      </svg>
    )
  },
  {
    id: "milk",
    name: "Sữa",
    filterName: "Sữa",
    href: "/thuc-pham-chuc-nang/sua",
    count: 43,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {/* Milk carton */}
        <rect x="8" y="7" width="8" height="13" rx="1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l4-4 4 4M8 11h8M12 11v9" />
      </svg>
    )
  },
  {
    id: "monitoring",
    name: "Dụng cụ theo dõi",
    filterName: "Dụng cụ theo dõi",
    href: "/thiet-bi-y-te/dung-cu-theo-doi",
    count: 95,
    icon: (
      <svg className="w-10 h-10 text-[#024ad8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {/* Stethoscope */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5v5a7 7 0 0014 0V5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 17v3M9 20h6" />
        <circle cx="5" cy="4" r="1.5" fill="currentColor" />
        <circle cx="19" cy="4" r="1.5" fill="currentColor" />
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
  return <img src={src} alt={name} className="w-full h-full object-contain p-0.5" referrerPolicy="no-referrer" />;
};

export const RETAIL_PRODUCT_MAP: Record<string, { id: string; dbId: number; name: string; price: number; unit: string; imageUrl: string; activeIngredient: string; isAvailable: boolean }> = {
  "fohepta-milk": {
    id: "fohepta-milk",
    dbId: 0,
    name: "Sữa dinh dưỡng dành cho bệnh nhân gan Fohepta Vitadairy (400g)",
    price: 205600,
    unit: "Hộp",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/00501988_sua_cho_benh_nhan_gan_fohepta_vitadairy_400g_5342_6360_large_91621ed7fb.jpg",
    activeIngredient: "Dinh dưỡng y học cho bệnh nhân gan",
    isAvailable: true
  },
  "ensure-gold-800g": {
    id: "ensure-gold-800g",
    dbId: 0,
    name: "Sữa tăng cường sức khỏe khối cơ tăng miễn dịch Ensure Gold (800g)",
    price: 837000,
    unit: "Hộp",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09287_8364c9dcac.jpg",
    activeIngredient: "Dinh dưỡng hỗ trợ sức khỏe khối cơ",
    isAvailable: true
  },
  "ensure-gold-less-sweet-800g": {
    id: "ensure-gold-less-sweet-800g",
    dbId: 0,
    name: "Sữa tăng cường sức khỏe khối cơ tăng miễn dịch Ensure Gold ít ngọt (800g)",
    price: 837000,
    unit: "Hộp",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09287_8364c9dcac.jpg",
    activeIngredient: "Dinh dưỡng hỗ trợ sức khỏe khối cơ (ít ngọt)",
    isAvailable: true
  },
  "icreo-glico-800g": {
    id: "icreo-glico-800g",
    dbId: 0,
    name: "Sữa cân bằng dinh dưỡng Icreo Balance Glico Nhật Bản (800g)",
    price: 933120,
    unit: "Hộp",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/sua_ho_tro_he_mien_dich_va_tieu_hoa_khoe_manh_cho_tre_tu_0_thang_tuoi_icreo_balance_milk_glico_800g_00022636_3_16f858ea19.jpg",
    activeIngredient: "Dinh dưỡng cân bằng cho bé",
    isAvailable: true
  },
  "glucerna-800g": {
    id: "glucerna-800g",
    dbId: 0,
    name: "Sữa bổ sung dinh dưỡng đặc biệt cho người đái tháo đường Glucerna (800g)",
    price: 842000,
    unit: "Hộp",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09275_85d45ab994.jpg",
    activeIngredient: "Dinh dưỡng đặc chế cho người tiểu đường",
    isAvailable: true
  },
  "nmn-pqq-kenko": {
    id: "nmn-pqq-kenko",
    dbId: 0,
    name: "Viên uống hỗ trợ chống lão hóa, cải thiện làn da và tăng đề kháng NMN PQQ Kenko (Hộp 60 Viên)",
    price: 6675000,
    unit: "Hộp",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09707_b7893a5b10.jpg",
    activeIngredient: "NMN PQQ Kenko chống lão hóa",
    isAvailable: true
  },
  "kudos-daily": {
    id: "kudos-daily",
    dbId: 0,
    name: "Viên sủi giúp bổ sung các vitamin cho cơ thể Kudos Daily Vitamins (Tuýp 20 Viên)",
    price: 118150,
    unit: "Tuýp",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09335_24b9811179.jpg",
    activeIngredient: "Bổ sung vitamin cho cơ thể",
    isAvailable: true
  },
  "nano-fucoidan": {
    id: "nano-fucoidan",
    dbId: 0,
    name: "Viên uống hỗ trợ chống oxy hóa, hạn chế gốc tự do, tăng cường sức đề kháng Nano Fucoidan (Hộp 30 Viên)",
    price: 792000,
    unit: "Hộp",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09799_e7eb582916.jpg",
    activeIngredient: "Nano Fucoidan chống oxy hóa",
    isAvailable: true
  },
  "brauer-dha": {
    id: "brauer-dha",
    dbId: 0,
    name: "Viên hỗ trợ phát triển não bộ sức khỏe cho mắt Brauer Baby & Kids Ultra Pure DHA (Hộp 60 Viên)",
    price: 388800,
    unit: "Hộp",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/Vien_ho_tro_phat_trien_nao_bo_suc_khoe_cho_mat_Brauer_Baby_and_Kids_Ultra_Pure_DHA_00033687_79d080f5b6.png",
    activeIngredient: "DHA phát triển não bộ cho trẻ",
    isAvailable: true
  },
  "achimmadang-box": {
    id: "achimmadang-box",
    dbId: 0,
    name: "Nước Sâm Nguyên Củ Achimmadang Inbosam Biok Korea Root Drink (Hộp 10 Chai x 120ml)",
    price: 400000,
    unit: "Hộp",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/00502882_nuoc_sam_nguyen_cu_achimmadang_inbosam_biok_korea_root_dkink_10_chai_x_120ml_2001_6396_large_10523086de.jpg",
    activeIngredient: "Nước sâm nguyên củ bồi bổ sức khỏe",
    isAvailable: true
  },
  "achimmadang-bottle": {
    id: "achimmadang-bottle",
    dbId: 0,
    name: "Nước Sâm Nguyên Củ Achimmadang Inbosam Biok Korea Root Drink (Chai 120ml)",
    price: 40000,
    unit: "Chai",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/00502882_nuoc_sam_nguyen_cu_achimmadang_inbosam_biok_korea_root_dkink_10_chai_x_120ml_2001_6396_large_10523086de.jpg",
    activeIngredient: "Nước sâm nguyên củ bồi bổ sức khỏe",
    isAvailable: true
  },
  "aloclair-plus": {
    id: "aloclair-plus",
    dbId: 0,
    name: "Chai xịt nhiệt miệng, tay chân miệng Aloclair Plus 15ml (Hộp x 15ml)",
    price: 229000,
    unit: "Hộp",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/CHAI_XIT_NHIET_MIENG_TAY_CHAN_MIENG_ALOCLAIR_PLUS_15_ML_00502899_6_d4a9ad973b.jpg",
    activeIngredient: "Aloclair Plus xịt nhiệt miệng",
    isAvailable: true
  },
  "aloclair-gel": {
    id: "aloclair-gel",
    dbId: 0,
    name: "Gel bôi miệng Aloclair Plus Alliance 8ml giảm nhiệt miệng, tay chân miệng",
    price: 175000,
    unit: "Tuýp",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/CHAI_XIT_NHIET_MIENG_TAY_CHAN_MIENG_ALOCLAIR_PLUS_15_ML_00502899_7_c7528bf5e9.jpg",
    activeIngredient: "Gel bôi nhiệt miệng",
    isAvailable: true
  },
  "pearlie-wash": {
    id: "pearlie-wash",
    dbId: 0,
    name: "Nước Súc Miệng Pearlie White Chlor-Rinse Plus (250ml)",
    price: 175000,
    unit: "Chai",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_01900_6fe44907dd.jpg",
    activeIngredient: "Nước súc miệng kháng khuẩn",
    isAvailable: true
  },
  "subac-gel": {
    id: "subac-gel",
    dbId: 0,
    name: "Gel bôi Su Bạc kháng khuẩn, làm sạch da (25g)",
    price: 150000,
    unit: "Hộp",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/00006940_su_bac_gel_lam_sach_sat_khuan_da_8596_63aa_large_5e8c66eecc.jpg",
    activeIngredient: "Gel sát khuẩn da Su Bạc",
    isAvailable: true
  },
  "fysoline-septi-box": {
    id: "fysoline-septi-box",
    dbId: 0,
    name: "Nước muối sinh lý Fysoline Septinasal (Hộp 20 Ống x 5ml)",
    price: 193000,
    unit: "Hộp",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09757_76bf71dab2.png",
    activeIngredient: "Nước muối kháng viêm vệ sinh mũi",
    isAvailable: true
  },
  "fysoline-septi-tube": {
    id: "fysoline-septi-tube",
    dbId: 0,
    name: "Nước muối sinh lý Fysoline Septinasal (Ống 5ml)",
    price: 9650,
    unit: "Ống",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09757_76bf71dab2.png",
    activeIngredient: "Nước muối kháng viêm vệ sinh mũi",
    isAvailable: true
  },
  "fysoline-iso-box": {
    id: "fysoline-iso-box",
    dbId: 0,
    name: "Nước muối sinh lý Fysoline Isotonique đẳng trương (Hộp 40 Ống x 5ml)",
    price: 166000,
    unit: "Hộp",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09895_dac9a658d8.jpg",
    activeIngredient: "Nước muối vệ sinh mắt mũi hàng ngày",
    isAvailable: true
  },
  "fysoline-iso-tube": {
    id: "fysoline-iso-tube",
    dbId: 0,
    name: "Nước muối sinh lý Fysoline Isotonique đẳng trương (Ống 5ml)",
    price: 4150,
    unit: "Ống",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09895_dac9a658d8.jpg",
    activeIngredient: "Nước muối vệ sinh mắt mũi hàng ngày",
    isAvailable: true
  },
  "famapro-box": {
    id: "famapro-box",
    dbId: 0,
    name: "Khẩu trang 4 lớp Famapro Extra màu trắng (Hộp 5 Gói x 10 Cái)",
    price: 40000,
    unit: "Hộp",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_08159_6dcd5953f8.jpg",
    activeIngredient: "Khẩu trang y tế ngăn khuẩn",
    isAvailable: true
  },
  "famapro-pack": {
    id: "famapro-pack",
    dbId: 0,
    name: "Khẩu trang 4 lớp Famapro Extra màu trắng (Gói 10 Cái)",
    price: 8000,
    unit: "Gói",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_08159_6dcd5953f8.jpg",
    activeIngredient: "Khẩu trang y tế ngăn khuẩn",
    isAvailable: true
  },
  "dolphin-mask": {
    id: "dolphin-mask",
    dbId: 0,
    name: "Khẩu trang trẻ em 4 lớp 3D Dolphin Mask (Hộp 10 Cái)",
    price: 24000,
    unit: "Hộp",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/IMG_0188_f4db0565ff.jpg",
    activeIngredient: "Khẩu trang trẻ em ngăn khói bụi",
    isAvailable: true
  },
  "panadol-hop": {
    id: "panadol-hop",
    dbId: 0,
    name: "Viên nén Panadol Extra đỏ GSK giảm đau hạ sốt (Hộp 15 Vỉ x 12 Viên)",
    price: 252000,
    unit: "Hộp",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_099842_74c1fc532a.png",
    activeIngredient: "Paracetamol 500mg, Caffeine 65mg",
    isAvailable: true
  },
  "panadol-vi": {
    id: "panadol-vi",
    dbId: 0,
    name: "Viên nén Panadol Extra đỏ GSK giảm đau hạ sốt (Vỉ 12 Viên)",
    price: 16800,
    unit: "Vỉ",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_099842_74c1fc532a.png",
    activeIngredient: "Paracetamol 500mg, Caffeine 65mg",
    isAvailable: true
  },
  "panadol-vien": {
    id: "panadol-vien",
    dbId: 0,
    name: "Viên nén Panadol Extra đỏ GSK giảm đau hạ sốt (Viên)",
    price: 1400,
    unit: "Viên",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_099842_74c1fc532a.png",
    activeIngredient: "Paracetamol 500mg, Caffeine 65mg",
    isAvailable: true
  },
  "acemuc-hop": {
    id: "acemuc-hop",
    dbId: 0,
    name: "Thuốc Acemuc 200mg Sanofi long đờm tiêu nhầy (Hộp 3 Vỉ x 10 Viên)",
    price: 81000,
    unit: "Hộp",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/acemuc_200_3x10_sanofi_00000462_73028f19a5.png",
    activeIngredient: "Acetylcysteine 200mg",
    isAvailable: true
  },
  "acemuc-vi": {
    id: "acemuc-vi",
    dbId: 0,
    name: "Thuốc Acemuc 200mg Sanofi long đờm tiêu nhầy (Vỉ 10 Viên)",
    price: 27000,
    unit: "Vỉ",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/acemuc_200_3x10_sanofi_00000462_73028f19a5.png",
    activeIngredient: "Acetylcysteine 200mg",
    isAvailable: true
  },
  "acemuc-vien": {
    id: "acemuc-vien",
    dbId: 0,
    name: "Thuốc Acemuc 200mg Sanofi long đờm tiêu nhầy (Viên)",
    price: 2700,
    unit: "Viên",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/acemuc_200_3x10_sanofi_00000462_73028f19a5.png",
    activeIngredient: "Acetylcysteine 200mg",
    isAvailable: true
  },
  "telfast-hop": {
    id: "telfast-hop",
    dbId: 0,
    name: "Thuốc chống dị ứng Telfast HD 180mg Sanofi (Hộp 3 Vỉ x 10 Viên)",
    price: 268000,
    unit: "Hộp",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/1_467af3daf4.png",
    activeIngredient: "Fexofenadine HCl 180mg",
    isAvailable: true
  },
  "telfast-vi": {
    id: "telfast-vi",
    dbId: 0,
    name: "Thuốc chống dị ứng Telfast HD 180mg Sanofi (Vỉ 10 Viên)",
    price: 89330,
    unit: "Vỉ",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/1_467af3daf4.png",
    activeIngredient: "Fexofenadine HCl 180mg",
    isAvailable: true
  },
  "telfast-vien": {
    id: "telfast-vien",
    dbId: 0,
    name: "Thuốc chống dị ứng Telfast HD 180mg Sanofi (Viên)",
    price: 8933,
    unit: "Viên",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/1_467af3daf4.png",
    activeIngredient: "Fexofenadine HCl 180mg",
    isAvailable: true
  },
  "kudos-vitc": {
    id: "kudos-vitc",
    dbId: 0,
    name: "Viên sủi giúp bổ sung vitamin C cho cơ thể Kudos Vitamin C 1000mg (Tuýp 20 Viên)",
    price: 113400,
    unit: "Tuýp",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09324_db795e136a.jpg",
    activeIngredient: "Vitamin C 1000mg",
    isAvailable: true
  },
  "kamizol-orange-box": {
    id: "kamizol-orange-box",
    dbId: 0,
    name: "Nước Bù Điện Giải Kamizol Vị Cam (Thùng 24 Chai x 250ml)",
    price: 201600,
    unit: "Thùng",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/IMG_5064_7c5c85e337.jpg",
    activeIngredient: "Nước bù nước điện giải vị cam",
    isAvailable: true
  },
  "kamizol-orange-bottle": {
    id: "kamizol-orange-bottle",
    dbId: 0,
    name: "Nước Bù Điện Giải Kamizol Vị Cam (Chai 250ml)",
    price: 8400,
    unit: "Chai",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/IMG_5064_7c5c85e337.jpg",
    activeIngredient: "Nước bù nước điện giải vị cam",
    isAvailable: true
  },
  "kamizol-lemon-box": {
    id: "kamizol-lemon-box",
    dbId: 0,
    name: "Nước Bù Điện Giải Kamizol Vị Chanh (Thùng 24 Chai x 250ml)",
    price: 201600,
    unit: "Thùng",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/IMG_5077_cc650f0dc4.jpg",
    activeIngredient: "Nước bù nước điện giải vị chanh",
    isAvailable: true
  },
  "kamizol-lemon-bottle": {
    id: "kamizol-lemon-bottle",
    dbId: 0,
    name: "Nước Bù Điện Giải Kamizol Vị Chanh (Chai 250ml)",
    price: 8400,
    unit: "Chai",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/IMG_5077_cc650f0dc4.jpg",
    activeIngredient: "Nước bù nước điện giải vị chanh",
    isAvailable: true
  },
  "kamizol-powder": {
    id: "kamizol-powder",
    dbId: 0,
    name: "Bột Điện Giải Vị Chanh Dây Kamizol Sports Drink Powder (Hộp 5 Gói x 25g)",
    price: 32000,
    unit: "Hộp",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_06452_66c43d8446.jpg",
    activeIngredient: "Bột điện giải vị chanh dây",
    isAvailable: true
  },
  "microlife-nc200": {
    id: "microlife-nc200",
    dbId: 0,
    name: "Nhiệt kế hồng ngoại đo trán Microlife NC200",
    price: 990000,
    unit: "Hộp",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/00502788_nhiet_ke_hong_ngoai_do_tran_microlife_nc200_7708_6391_large_84c0ed9d82.jpg",
    activeIngredient: "Thiết bị đo thân nhiệt hồng ngoại",
    isAvailable: true
  }
};

const FLASH_SALE_PRODUCTS = [
  {
    id: "fohepta-milk",
    dbId: 0,
    origin: "VN",
    discount: "-20%",
    slug: "sua-dinh-duong-danh-cho-benh-nhan-gan-fohepta-vitadairy-400g",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/00501988_sua_cho_benh_nhan_gan_fohepta_vitadairy_400g_5342_6360_large_91621ed7fb.jpg",
    name: "Sữa dinh dưỡng dành cho bệnh nhân gan Fohepta Vitadairy (400g)",
    price: 205600,
    originalPrice: 257000,
    unit: "Hộp",
    soldQty: 6,
    totalQty: 400,
    activeIngredient: "Dinh dưỡng y học cho bệnh nhân gan",
    isAvailable: true
  },
  {
    id: "ensure-original-liquid",
    dbId: 0,
    origin: "US",
    discount: "-72kđ",
    slug: "sua-bo-sung-dinh-duong-ho-tro-tieu-hoa-ensure-original-huong-vani-4-loc-x-6-chai",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_02727_0f957dbeee.jpg",
    name: "Sữa bổ sung dinh dưỡng hỗ trợ tiêu hóa Ensure Original nước...",
    price: 912000,
    originalPrice: 984000,
    unit: "Thùng",
    soldQty: 50,
    totalQty: 50,
    activeIngredient: "Dinh dưỡng hỗ trợ tiêu hóa",
    isAvailable: false
  },
  {
    id: "ensure-gold-800g",
    dbId: 0,
    origin: "US",
    discount: "-95kđ",
    slug: "sua-tang-cuong-suc-khoe-khoi-co-tang-mien-dich-ensure-gold-strengthpro-huong-vani-800g",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09287_8364c9dcac.jpg",
    name: "Sữa tăng cường sức khỏe khối cơ tăng miễn dịch Ensure Gold...",
    price: 837000,
    originalPrice: 932000,
    unit: "Hộp",
    soldQty: 38,
    totalQty: 50,
    activeIngredient: "Dinh dưỡng hỗ trợ sức khỏe khối cơ",
    isAvailable: true
  },
  {
    id: "ensure-gold-less-sweet-800g",
    dbId: 0,
    origin: "US",
    discount: "-95kđ",
    slug: "sua-tang-cuong-suc-khoe-khoi-co-tang-mien-dich-ensure-gold-strengthpro-huong-vani-it-ngot-800g",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09287_8364c9dcac.jpg",
    name: "Sữa tăng cường sức khỏe khối cơ tăng miễn dịch Ensure Gold ít ngọt...",
    price: 837000,
    originalPrice: 932000,
    unit: "Hộp",
    soldQty: 22,
    totalQty: 50,
    activeIngredient: "Dinh dưỡng hỗ trợ sức khỏe khối cơ (ít ngọt)",
    isAvailable: true
  },
  {
    id: "icreo-glico-800g",
    dbId: 0,
    origin: "JP",
    discount: "-19%",
    slug: "sua-ho-tro-he-mien-dich-va-tieu-hoa-khoe-manh-cho-tre-tu-0-thang-tuoi-icreo-balance-milk-glico-800g",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/sua_ho_tro_he_mien_dich_va_tieu_hoa_khoe_manh_cho_tre_tu_0_thang_tuoi_icreo_balance_milk_glico_800g_00022636_3_16f858ea19.jpg",
    name: "Sữa cân bằng dinh dưỡng Icreo Balance Glico Nhật Bản...",
    price: 933120,
    originalPrice: 1152000,
    unit: "Hộp",
    soldQty: 1,
    totalQty: 50,
    activeIngredient: "Dinh dưỡng cân bằng cho bé",
    isAvailable: true
  },
  {
    id: "glucerna-800g",
    dbId: 0,
    origin: "US",
    discount: "-80kđ",
    slug: "sua-bo-sung-dinh-duong-dac-biet-cho-nguoi-dai-thao-duong-glucerna-abbott-800g",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09275_85d45ab994.jpg",
    name: "Sữa bổ sung dinh dưỡng đặc biệt cho người đái đường Glucerna...",
    price: 842000,
    originalPrice: 922000,
    unit: "Hộp",
    soldQty: 27,
    totalQty: 50,
    activeIngredient: "Dinh dưỡng đặc chế cho người tiểu đường",
    isAvailable: true
  },
  {
    id: "ensure-gold-400g",
    dbId: 0,
    origin: "US",
    discount: "-62kđ",
    slug: "sua-tang-cuong-suc-khoe-tang-cuong-mien-dich-ensure-gold-strengthpro-huong-vani-400g",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09287_8364c9dcac.jpg",
    name: "Sữa bột Ensure Gold StrengthPro hương Vani 400g...",
    price: 418000,
    originalPrice: 480000,
    unit: "Hộp",
    soldQty: 12,
    totalQty: 50,
    activeIngredient: "Dinh dưỡng hỗ trợ sức khỏe khối cơ 400g",
    isAvailable: true
  },
  {
    id: "glucerna-400g",
    dbId: 0,
    origin: "US",
    discount: "-65kđ",
    slug: "sua-bot-abbott-glucerna-huong-lua-mach-lon-400g",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09275_85d45ab994.jpg",
    name: "Sữa bột Abbott Glucerna Hương Lúa Mạch 400g...",
    price: 420000,
    originalPrice: 485000,
    unit: "Hộp",
    soldQty: 15,
    totalQty: 50,
    activeIngredient: "Dinh dưỡng đặc chế cho người tiểu đường 400g",
    isAvailable: true
  }
];

const BEST_SELLING_PRODUCTS = [
  {
    id: "nmn-pqq-kenko",
    dbId: 0,
    origin: "JP",
    originLabel: "Nhật Bản",
    discount: "-25%",
    slug: "vien-uong-ho-tro-chong-lao-hoa-cai-thien-lan-da-va-tang-de-khang-nmn-pqq-kenko-60-vien",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_03542_6bfa8a6508.jpg",
    name: "Viên uống hỗ trợ chống lão hóa, cải thiện làn da và tăng đề kháng NMN...",
    price: 6675000,
    originalPrice: 8900000,
    unit: "Hộp",
    spec: "Hộp 60 Viên",
    activeIngredient: "NMN PQQ Kenko chống lão hóa",
    isAvailable: true
  },
  {
    id: "kudos-daily",
    dbId: 0,
    origin: "DE",
    originLabel: "Đức",
    discount: "-15%",
    slug: "vien-sui-giup-bo-sung-cac-vitamin-cho-co-the-kudos-daily-vitamins-plus-biotin-and-ginseng-huong-cam-20-vien",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09335_24b9811179.jpg",
    name: "Viên sủi giúp bổ sung các vitamin cho cơ thể Kudos Daily Vitamins...",
    price: 118150,
    originalPrice: 139000,
    unit: "Tuýp",
    spec: "Tuýp 20 Viên",
    activeIngredient: "Bổ sung vitamin cho cơ thể",
    isAvailable: true
  },
  {
    id: "nano-fucoidan",
    dbId: 0,
    origin: "VN",
    originLabel: "Việt Nam",
    discount: "-20%",
    slug: "vien-uong-ho-tro-chong-oxy-hoa-han-che-goc-tu-do-tang-cuong-suc-khoe-nano-fucoidan-biochempha-30v",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09799_e7eb582916.jpg",
    name: "Viên uống hỗ trợ chống oxy hóa, hạn chế gốc tự do, tăng cường sức...",
    price: 792000,
    originalPrice: 990000,
    unit: "Hộp",
    spec: "Hộp 30 Viên",
    activeIngredient: "Nano Fucoidan chống oxy hóa",
    isAvailable: true
  },
  {
    id: "brauer-dha",
    dbId: 0,
    origin: "AU",
    originLabel: "Úc",
    discount: "-20%",
    slug: "vien-uong-ho-tro-tang-cuong-suc-khoe-phu-nu-mang-thai-va-cho-con-bu-brauer-ultra-pure-dha-for-pregnancy-and-breastfeeding-60-vien",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/Vien_ho_tro_phat_trien_nao_bo_suc_khoe_cho_mat_Brauer_Baby_and_Kids_Ultra_Pure_DHA_00033687_79d080f5b6.png",
    name: "Viên hỗ trợ phát triển não bộ sức khỏe cho mắt Brauer Baby & Ki...",
    price: 388800,
    originalPrice: 486000,
    unit: "Hộp",
    spec: "Hộp 60 Viên",
    activeIngredient: "DHA phát triển não bộ cho trẻ",
    isAvailable: true
  },
  {
    id: "achimmadang",
    dbId: 0,
    origin: "KR",
    originLabel: "Hàn Quốc",
    discount: "-20%",
    slug: "nuoc-sam-nguyen-cu-achimmadang-inbosam-biok-korea-root-drink-10-chai-x-120ml",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/00502882_nuoc_sam_nguyen_cu_achimmadang_inbosam_biok_korea_root_dkink_10_chai_x_120ml_2001_6396_large_10523086de.jpg",
    name: "Nước Sâm Nguyên Củ Achimmadang Inbosam Biok Korea Root Drink...",
    price: 400000,
    originalPrice: 500000,
    unit: "Hộp",
    spec: "Hộp 10 Chai x 120ml",
    isSamsung: true,
    activeIngredient: "Nước sâm nguyên củ bồi bổ sức khỏe",
    isAvailable: true
  },
  {
    id: "aloclair-plus",
    dbId: 0,
    origin: "GB",
    originLabel: "Anh",
    discount: null,
    slug: "chai-xit-nhiet-mieng-tay-chan-mieng-aloclair-plus-15ml-ho-tro-dieu-tri-cac-vet-thuong-trong-khoang-mieng",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/CHAI_XIT_NHIET_MIENG_TAY_CHAN_MIENG_ALOCLAIR_PLUS_15_ML_00502899_6_d4a9ad973b.jpg",
    name: "Chai xịt nhiệt miệng, tay chân miệng Aloclair Plus 15ml hỗ trợ điều...",
    price: 229000,
    unit: "Hộp",
    spec: "Hộp x 15ml",
    activeIngredient: "Aloclair Plus xịt nhiệt miệng",
    isAvailable: true
  },
  {
    id: "kamizol-orange",
    dbId: 0,
    origin: "VN",
    originLabel: "Việt Nam",
    discount: "-16%",
    slug: "nuoc-bu-dien-giai-kamizol-vi-cam-chai-250ml",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/IMG_5064_7c5c85e337.jpg",
    name: "Nước Bù Điện Giải Kamizol Vị Cam (Chai 250ml)",
    price: 8400,
    originalPrice: 10000,
    unit: "Chai",
    spec: "Chai 250ml",
    activeIngredient: "Nước bù nước điện giải vị cam",
    isAvailable: true
  },
  {
    id: "kudos-vitc",
    dbId: 0,
    origin: "DE",
    originLabel: "Đức",
    discount: "-12%",
    slug: "vien-sui-giup-bo-sung-vitamin-c-cho-co-the-kudos-vitamin-c-1000mg-tuyp-20-vien",
    imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09324_db795e136a.jpg",
    name: "Viên sủi giúp bổ sung vitamin C cho cơ thể Kudos Vitamin C 1000mg...",
    price: 113400,
    originalPrice: 130000,
    unit: "Tuýp",
    spec: "Tuýp 20 Viên",
    activeIngredient: "Vitamin C 1000mg",
    isAvailable: true
  }
];

const SIDE_EFFECTS_DATA = [
  { name: "Paracetamol (Acetaminophen)", brand: "Panadol, Hapacol, Efferalgan", active: "Paracetamol", desc: "Giảm đau, hạ sốt nhanh chóng.", sideEffects: "Buồn nôn, dị ứng da (hiếm gặp). Nguy cơ hoại tử gan cấp tính nếu sử dụng quá liều quy định (>4g/ngày) hoặc kết hợp với rượu.", warning: "Tuyệt đối không uống rượu trong thời gian dùng thuốc. Tránh dùng chung với các thuốc khác chứa paracetamol để tránh quá liều." },
  { name: "Ibuprofen", brand: "Gofen, Alaxan", active: "Ibuprofen", desc: "Giảm đau kháng viêm không steroid (NSAID).", sideEffects: "Đau dạ dày, buồn nôn, đầy hơi, chóng mặt, nhức đầu. Có thể gây loét hoặc chảy máu dạ dày nếu dùng liều cao kéo dài.", warning: "Nên uống thuốc sau khi ăn no để giảm kích ứng dạ dày. Thận trọng với người có tiền sử loét dạ dày, suy thận." },
  { name: "Aspirin (Acid Acetylsalicylic)", brand: "Aspirin 81mg, Aspirin PH8", active: "Aspirin", desc: "Giảm đau, kháng viêm, phòng ngừa huyết khối (đột quỵ, nhồi máu cơ tim).", sideEffects: "Ợ chua, đau bao tử, chảy máu kéo dài. Có nguy cơ gây hội chứng Reye cực nguy hiểm ở trẻ dưới 16 tuổi.", warning: "Không dùng cho trẻ em dưới 16 tuổi bị sốt do virus. Thận trọng với người dễ chảy máu hoặc hen suyễn." },
  { name: "Amoxicillin", brand: "Clamoxyl, Ospamox", active: "Amoxicillin", desc: "Kháng sinh nhóm Penicillin điều trị nhiễm khuẩn.", sideEffects: "Tiêu chảy, phát ban da, buồn nôn, nhiễm nấm men (ngứa âm đạo/tưa miệng).", warning: "Phải dùng đủ liều theo chỉ định để tránh kháng thuốc. Kháng sinh có thể làm giảm hiệu lực của thuốc tránh thai hàng ngày." },
  { name: "Omeprazole", brand: "Lomex, Omez", active: "Omeprazole", desc: "Thuốc ức chế bơm proton (PPI) giảm tiết acid dạ dày.", sideEffects: "Tiêu chảy, đau bụng, buồn nôn, nhức đầu. Dùng lâu năm có thể giảm hấp thu vitamin B12, loãng xương.", warning: "Nên uống trước khi ăn sáng 30 phút. Không tự ý lạm dụng thuốc kéo dài mà không có chỉ định." }
];

const INTERACTIONS_DATA = [
  { key: "paracetamol-rượu", nameA: "Paracetamol", nameB: "Rượu", severity: "HIGH", severityText: "Cực kỳ nguy hiểm", bg: "bg-red-50 border-red-200 text-red-950", iconBg: "bg-red-500 text-white", desc: "Rượu kích thích men gan CYP2E1 hoạt động mạnh, làm tăng tốc độ chuyển hóa Paracetamol thành chất độc NAPQI gây hoại tử tế bào gan cấp tính, có thể dẫn đến tử vong.", recommendation: "Tuyệt đối không uống rượu hoặc đồ uống có cồn trước, trong và sau khi sử dụng Paracetamol ít nhất 24 giờ." },
  { key: "ibuprofen-aspirin", nameA: "Ibuprofen", nameB: "Aspirin", severity: "HIGH", severityText: "Nguy hiểm", bg: "bg-red-50 border-red-200 text-red-950", iconBg: "bg-red-500 text-white", desc: "Cả hai đều thuộc nhóm NSAID. Ibuprofen cạnh tranh vị trí liên kết với tiểu cầu của Aspirin làm giảm tác dụng bảo vệ tim mạch của Aspirin, đồng thời tăng gấp đôi nguy cơ loét và chảy máu dạ dày.", recommendation: "Không tự ý dùng chung. Nếu bắt buộc phải dùng cả hai, hãy uống Aspirin trước Ibuprofen ít nhất 30 phút hoặc uống Ibuprofen sau Aspirin ít nhất 8 giờ." },
  { key: "amoxicillin-tránh thai", nameA: "Amoxicillin", nameB: "Thuốc tránh thai", severity: "MEDIUM", severityText: "Cần lưu ý", bg: "bg-yellow-50 border-yellow-200 text-yellow-950", iconBg: "bg-yellow-500 text-white", desc: "Amoxicillin tiêu diệt vi khuẩn đường ruột, làm giảm chu trình gan ruột của estrogen trong thuốc tránh thai, từ đó có thể làm giảm nồng độ và hiệu quả ngừa thai.", recommendation: "Nên sử dụng thêm biện pháp tránh thai dự phòng (như bao cao su) trong suốt thời gian dùng kháng sinh và 7 ngày sau đó." },
  { key: "omeprazole-clopidogrel", nameA: "Omeprazole", nameB: "Clopidogrel", severity: "HIGH", severityText: "Nguy hiểm", bg: "bg-red-50 border-red-200 text-red-950", iconBg: "bg-red-500 text-white", desc: "Omeprazole ức chế enzyme CYP2C19 ở gan, là enzyme cần thiết để chuyển hóa Clopidogrel (tiền chất) thành dạng hoạt động. Việc này làm giảm mạnh hiệu quả chống đông máu của Clopidogrel, tăng nguy cơ đột quỵ.", recommendation: "Tránh dùng Omeprazole khi đang điều trị bằng Clopidogrel. Hãy tham khảo dược sĩ để đổi sang PPI ít ảnh hưởng hơn như Pantoprazole hoặc Esomeprazole." }
];

const AI_BOT_QAS = [
  { q: "Paracetamol uống chung với Ibuprofen được không?", a: "Có thể phối hợp Paracetamol và Ibuprofen trong một số trường hợp đau mức độ vừa đến nặng (như đau răng, đau sau phẫu thuật) vì chúng có cơ chế giảm đau khác nhau. Tuy nhiên, không nên lạm dụng phối hợp này thường xuyên. Hãy tuân thủ đúng liều lượng tối đa của từng loại thuốc (Paracetamol tối đa 4g/ngày, Ibuprofen tối đa 1.2g/ngày) và luôn uống Ibuprofen sau khi ăn no để tránh loét dạ dày." },
  { q: "Tại sao không được uống rượu khi dùng thuốc giảm đau?", a: "Uống rượu khi dùng Paracetamol làm tăng độc tính trên gan gấp nhiều lần, dễ gây suy gan cấp hoại tử. Uống rượu khi dùng thuốc giảm đau kháng viêm NSAID (như Ibuprofen, Aspirin) làm tăng đáng kể nguy cơ kích ứng, viêm loét và xuất huyết dạ dày do rượu và NSAID đều bào mòn lớp nhầy bảo vệ dạ dày." },
  { q: "Kháng sinh Amoxicillin uống thế nào là đúng?", a: "Amoxicillin nên được uống ngay trước hoặc trong bữa ăn để giảm thiểu tác dụng phụ trên đường tiêu hóa. Điều cực kỳ quan trọng là bạn phải uống đúng giờ, đủ liều và đủ số ngày bác sĩ kê ngay cả khi các triệu chứng bệnh đã biến mất hoàn toàn. Việc dừng kháng sinh giữa chừng là nguyên nhân hàng đầu dẫn đến tình trạng kháng kháng sinh nguy hiểm." }
];

export default function HomePage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = useMemo(() => [
    {
      id: 1,
      brand: "SANOFI",
      subBrand: "ENTEROGERMINA BABY COMFORT",
      title: "Thêm Lợi Khuẩn Tốt",
      titleHighlight: "Chăm Bụng Bé Khỏe",
      voucherLabel: "Tặng voucher",
      voucherValue: "50.000Đ",
      voucherNote: "*Voucher tiêm chủng",
      priceLabel: "Giá chỉ",
      priceValue: "475.000Đ",
      priceUnit: "1 Hộp",
      link: "/san-pham/men-vi-sinh-enterogermina-baby-comfort-sanofi-cho-tre-so-sinh-chua-loi-khuan-bb12-lo-8ml",
      imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/enterogermina_4_ty_ong_5ml_2x10_sanofi_00030670_e8cd62ab8d.png",
      badgeText: "Men vi sinh 4 tỷ bào tử",
      bgClass: "bg-gradient-to-r from-[#d6f8ff] to-[#e0f2fe]",
      accentBg: "bg-[#22c55e]/15",
      accentText: "text-[#16a34a]",
      pillText: "Men vi sinh",
      btnText: "Mua Ngay"
    },
    {
      id: 2,
      brand: "ABBOTT",
      subBrand: "ENSURE GOLD STRENGTHPRO",
      title: "Dinh Dưỡng Hợp Chuẩn",
      titleHighlight: "Tăng Cường Sức Khỏe",
      voucherLabel: "Tặng voucher",
      voucherValue: "79.000Đ",
      voucherNote: "*Khi mua thùng 24 chai",
      priceLabel: "Giá chỉ từ",
      priceValue: "58.710Đ",
      priceUnit: "1 Chai",
      link: "/san-pham/sua-tang-cuong-suc-khoe-tang-cuong-mien-dich-ensure-gold-strengthpro-huong-vani-237ml",
      imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_02727_0f957dbeee.jpg",
      badgeText: "Dinh dưỡng y học Hoa Kỳ",
      bgClass: "bg-gradient-to-r from-[#fef3c7] to-[#fffbeb]",
      accentBg: "bg-[#d97706]/15",
      accentText: "text-[#d97706]",
      pillText: "Sữa dinh dưỡng",
      btnText: "Mua Ngay"
    },
    {
      id: 3,
      brand: "GSK",
      subBrand: "PANADOL EXTRA ĐỎ",
      title: "Giảm Đau Nhanh Chóng",
      titleHighlight: "Hạ Sốt Hiệu Quả",
      voucherLabel: "Giảm giá",
      voucherValue: "10%",
      voucherNote: "*Độc quyền online",
      priceLabel: "Giá chỉ",
      priceValue: "135.000Đ",
      priceUnit: "Hộp 180 viên",
      link: "/san-pham/vien-nen-panadol-extra-do-gsk-giam-manh-cac-con-dau-ha-sot-dieu-tri-dau-dau-dau-lung-15-vi-x-12-vien",
      imageUrl: "https://cdn.nhathuoclongchau.com.vn/v1/static/00007804_panadol_extra_do_gsk_7125_large_03ea089025.jpg",
      badgeText: "Giảm đau mạnh mẽ",
      bgClass: "bg-gradient-to-r from-[#fee2e2] to-[#fef2f2]",
      accentBg: "bg-[#dc2626]/15",
      accentText: "text-[#dc2626]",
      pillText: "Thuốc không kê đơn",
      btnText: "Mua Ngay"
    }
  ], []);

  // Autoplay slider every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const [medicines, setMedicines] = useState<Medicine[]>(MOCK_MEDICINES);
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addToCart } = useCart();
  const setCart = (updateFn: (prev: Record<string, number>) => Record<string, number>) => {
    try {
      const result = typeof updateFn === 'function' ? updateFn({}) : updateFn;
      if (result) {
        const keys = Object.keys(result);
        if (keys.length > 0) {
          const activeKey = keys[0];
          const productInfo = RETAIL_PRODUCT_MAP[activeKey];
          if (productInfo) {
            addToCart(productInfo);
          } else {
            console.warn("Unknown product key in setCart wrapper:", activeKey);
          }
        }
      }
    } catch (e) {
      console.error("Error in fake setCart wrapper:", e);
    }
  };
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [showSideEffectModal, setShowSideEffectModal] = useState(false);
  const [seSearchQuery, setSeSearchQuery] = useState("");
  const [selectedSeDrug, setSelectedSeDrug] = useState<typeof SIDE_EFFECTS_DATA[0] | null>(null);
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [iaDrugA, setIaDrugA] = useState("");
  const [iaDrugB, setIaDrugB] = useState("");
  const [iaResult, setIaResult] = useState<typeof INTERACTIONS_DATA[0] | null | "clean">(null);
  const [showAICopilotModal, setShowAICopilotModal] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([
    { sender: 'bot', text: 'Xin chào! Tôi là Trợ lý AI Dược sĩ của PharmaAssist. Bạn có câu hỏi nào về tác dụng phụ hay cách sử dụng thuốc an toàn không?' }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleSendChatMessage = (textToSend?: string) => {
    const msgText = textToSend || chatInput;
    if (!msgText.trim() || isChatLoading) return;

    setChatMessages(prev => [...prev, { sender: 'user', text: msgText }]);
    if (!textToSend) setChatInput("");
    setIsChatLoading(true);

    setTimeout(() => {
      const normalizedQuery = msgText.toLowerCase();
      
      const matchedQA = AI_BOT_QAS.find(qa => 
        normalizedQuery.includes(qa.q.toLowerCase()) || 
        qa.q.toLowerCase().split(' ').filter(word => word.length > 3).every(word => normalizedQuery.includes(word))
      );

      let botResponse = "";
      if (matchedQA) {
        botResponse = matchedQA.a;
      } else {
        if (normalizedQuery.includes("paracetamol") || normalizedQuery.includes("panadol") || normalizedQuery.includes("hapacol")) {
          botResponse = "Paracetamol (Acetaminophen) là thuốc hạ sốt, giảm đau phổ biến. Liều dùng an toàn tối đa cho người lớn là 4000mg (4g) mỗi 24 giờ. Tác dụng phụ đáng lo ngại nhất là độc tính trên gan nếu dùng quá liều hoặc dùng chung với rượu bia. Tuyệt đối không dùng chung rượu bia khi uống thuốc này.";
        } else if (normalizedQuery.includes("ibuprofen") || normalizedQuery.includes("aspirin") || normalizedQuery.includes("nsaid")) {
          botResponse = "Các thuốc kháng viêm không steroid (NSAID) như Ibuprofen hoặc Aspirin giúp giảm đau và chống viêm tốt, nhưng chúng kích ứng niêm mạc dạ dày. Tác dụng phụ thường gặp là đau bụng, đầy hơi, ợ chua. Dùng lâu ngày gây loét và xuất huyết tiêu hóa. Bạn nên uống thuốc sau bữa ăn no để giảm kích ứng.";
        } else if (normalizedQuery.includes("amoxicillin") || normalizedQuery.includes("kháng sinh")) {
          botResponse = "Amoxicillin là kháng sinh nhóm Penicillin dùng trị nhiễm khuẩn. Các tác dụng phụ thường gặp gồm tiêu chảy, nổi mề đay, mẩn ngứa. Lưu ý quan trọng là bạn phải hoàn thành đúng liệu trình kháng sinh mà bác sĩ chỉ định (không tự ý dừng khi thấy bớt bệnh) để ngăn ngừa hiện tượng vi khuẩn kháng thuốc.";
        } else {
          botResponse = "Cảm ơn bạn đã đặt câu hỏi về thuốc. Tác dụng phụ của thuốc này có thể bao gồm buồn nôn, nhức đầu hoặc dị ứng da nhẹ ở người nhạy cảm. Bạn nên tuân thủ đúng liều lượng bác sĩ kê, tránh kết hợp nhiều thuốc không rõ nguồn gốc và hạn chế dùng chất kích thích. Nếu có triệu chứng nặng như khó thở, phát ban diện rộng, hãy đến ngay cơ sở y tế gần nhất.";
        }
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
      setIsChatLoading(false);
    }, 1000);
  };

  const handleCheckInteraction = () => {
    if (!iaDrugA || !iaDrugB) {
      setToastMessage("Vui lòng chọn hoặc nhập đủ cả 2 loại thuốc để kiểm tra.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    if (iaDrugA.toLowerCase().trim() === iaDrugB.toLowerCase().trim()) {
      setToastMessage("Vui lòng chọn 2 loại thuốc khác nhau.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    const found = INTERACTIONS_DATA.find(item => {
      const matchNormal = item.nameA.toLowerCase() === iaDrugA.toLowerCase() && item.nameB.toLowerCase() === iaDrugB.toLowerCase();
      const matchReverse = item.nameA.toLowerCase() === iaDrugB.toLowerCase() && item.nameB.toLowerCase() === iaDrugA.toLowerCase();
      return matchNormal || matchReverse;
    });

    if (found) {
      setIaResult(found);
    } else {
      setIaResult("clean");
    }
  };
  const [activeSubId, setActiveSubId] = useState<string>("supplements-vitamin");
  const [loading, setLoading] = useState(true);
  const [samsungUnit, setSamsungUnit] = useState<"hop" | "chai">("hop");
  const [activeDiseaseGroupTab, setActiveDiseaseGroupTab] = useState<"doi-tuong" | "mua">("doi-tuong");
  const [activeSeasonalTab, setActiveSeasonalTab] = useState<number>(0);
  const [showSeasonalSolutionModal, setShowSeasonalSolutionModal] = useState(false);
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

  const [flashSaleOffset, setFlashSaleOffset] = useState(0);
  const [activeFlashSaleTab, setActiveFlashSaleTab] = useState<"current" | "upcoming">("current");
  const [showAllFlashSale, setShowAllFlashSale] = useState(false);
  const [bestSellingOffset, setBestSellingOffset] = useState(0);

  const handleFlashSalePrev = () => {
    setFlashSaleOffset(prev => (prev - 1 + 3) % 3);
  };
  const handleFlashSaleNext = () => {
    setFlashSaleOffset(prev => (prev + 1) % 3);
  };

  const handleBestSellingPrev = () => {
    setBestSellingOffset(prev => (prev - 1 + 3) % 3);
  };
  const handleBestSellingNext = () => {
    setBestSellingOffset(prev => (prev + 1) % 3);
  };

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
    const slug = categoryName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    router.push(`/${slug}`);
  };

  // Fetch API data
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api/v1";
        
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
      } catch (err: any) {
        // Use warn instead of error to avoid Next.js dev overlay for expected network failures during dev
        console.warn("API not reachable, using fallback mock data. Reason: " + (err?.message || "Failed to fetch"));
      } finally {
        setLoading(false);
      }
    };

    fetchApiData();
  }, []);

  // Cart total count
  // const cartCount = useMemo(() => {
    // return Object.values(cart).reduce((sum, count) => sum + count, 0);
  // }, [cart]);

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
    addToCart({
      id: med.id,
      dbId: isNaN(Number(med.id.replace(/\D/g, ''))) ? 0 : Number(med.id.replace(/\D/g, '')),
      name: med.name,
      price: med.price,
      unit: med.unit,
      imageUrl: med.imageUrl || 'https://cdn.nhathuoclongchau.com.vn/rx_product_placeholder.png',
      activeIngredient: med.activeIngredient || med.name,
      isAvailable: med.isAvailable
    });
    triggerToast(`Đã thêm ${med.name} vào giỏ hàng.`);
  };

  const slide = slides[currentSlide];

  return (
    <div className="flex flex-col min-h-screen bg-canvas font-sans text-ink">

      {/* MAIN CONTAINER */}
      <main className="flex-1">
        
        {/* 3. HERO BANNER & QUICK ACTIONS REDESIGN */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col gap-6">
          
          {/* Top Banner Row (Grid layout) */}
          <div className="grid grid-cols-12 gap-4">
            
            {/* Left Big Carousel Banner */}
            <div className={`col-span-12 lg:col-span-8 ${slide.bgClass} rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 min-h-[300px]`}>
              {/* Decorative background illustrations */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-300 to-indigo-300 opacity-20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 left-10 w-32 h-32 bg-cyan-300 opacity-15 rounded-full blur-2xl pointer-events-none" />
              
              {/* Left text column */}
              <div className="flex flex-col gap-4 max-w-md relative z-10 text-left">
                <div className="flex items-center gap-1.5">
                  <div className="bg-[#024ad8] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {slide.brand}
                  </div>
                  <span className="text-[11px] text-[#024ad8] font-bold tracking-wide uppercase">
                    {slide.subBrand}
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#111827] leading-tight">
                  {slide.title}<br />
                  <span className="text-[#024ad8]">{slide.titleHighlight}</span>
                </h2>
                
                {/* Orange voucher tags */}
                <div className="flex items-stretch gap-2 bg-[#ff5a00] text-white p-3 rounded-2xl max-w-sm shadow-sm">
                  <div className="flex flex-col justify-center pr-3 border-r border-white/20">
                    <span className="text-[10px] opacity-90 font-medium">{slide.voucherLabel}</span>
                    <strong className="text-sm md:text-base font-black">{slide.voucherValue}</strong>
                    <span className="text-[8px] opacity-80">{slide.voucherNote}</span>
                  </div>
                  <div className="flex flex-col justify-center pl-1">
                    <span className="text-[10px] opacity-90 font-medium">{slide.priceLabel}</span>
                    <strong className="text-sm md:text-base font-black">{slide.priceValue}</strong>
                    <span className="text-[8px] opacity-80">{slide.priceUnit}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <Link 
                    href={slide.link}
                    className="bg-[#024ad8] hover:bg-[#01359c] text-white text-xs font-bold px-6 py-3 rounded-full shadow-md transition-all duration-300 hover:scale-102 uppercase tracking-wider text-center"
                  >
                    {slide.btnText}
                  </Link>
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
                  <div className={`absolute top-2 left-6 ${slide.accentBg} ${slide.accentText} p-2 rounded-full border border-green-200/50 shadow-sm animate-pulse`}>
                    <Activity size={20} />
                  </div>
                  
                  {/* Real product image */}
                  <img 
                    src={slide.imageUrl} 
                    alt={slide.subBrand} 
                    className="w-40 h-40 object-contain drop-shadow-xl relative z-10 hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                  
                  {/* Badge indicator */}
                  <div className="absolute -bottom-2 right-4 bg-white/90 backdrop-blur-sm border border-fog px-3 py-1.5 rounded-xl shadow-sm text-center flex items-center gap-1.5 z-20">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                    <span className="text-[10px] font-bold text-[#374151]">{slide.badgeText}</span>
                  </div>
                </div>
              </div>

              {/* Carousel navigation arrows */}
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white hover:bg-cloud border border-fog flex items-center justify-center shadow-sm text-[#4b5563] hover:text-[#111827] z-20 transition-colors"
              >
                <ChevronRight size={16} className="rotate-180" />
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentSlide(prev => (prev + 1) % slides.length);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white hover:bg-cloud border border-fog flex items-center justify-center shadow-sm text-[#4b5563] hover:text-[#111827] z-20 transition-colors"
              >
                <ChevronRight size={16} />
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentSlide(index);
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-[#024ad8] w-4' : 'bg-gray-400/50'}`}
                  />
                ))}
              </div>
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
                <div 
                  onClick={() => setActiveFlashSaleTab("current")}
                  className={`px-4 py-2 rounded-xl shadow-sm text-center flex flex-col justify-center cursor-pointer transition-colors ${activeFlashSaleTab === "current" ? "bg-white text-[#ea3829] border border-[#ea3829]/15" : "text-graphite hover:text-primary"}`}
                >
                  <span className={`text-[10px] ${activeFlashSaleTab === "current" ? "font-black" : "font-bold"}`}>08:00 - 22:00, 04/06</span>
                  <span className="text-[9px] uppercase tracking-wide opacity-90">Đang diễn ra</span>
                </div>
                <div 
                  onClick={() => setActiveFlashSaleTab("upcoming")}
                  className={`px-4 py-2 rounded-xl shadow-sm text-center flex flex-col justify-center cursor-pointer transition-colors ${activeFlashSaleTab === "upcoming" ? "bg-white text-[#ea3829] border border-[#ea3829]/15" : "text-graphite hover:text-primary"}`}
                >
                  <span className={`text-[10px] ${activeFlashSaleTab === "upcoming" ? "font-black" : "font-bold"}`}>08:00 - 22:00, 05/06</span>
                  <span className="text-[9px] uppercase tracking-wide opacity-90">Sắp diễn ra</span>
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
              {(showAllFlashSale ? FLASH_SALE_PRODUCTS : FLASH_SALE_PRODUCTS.slice(flashSaleOffset, flashSaleOffset + 6)).map((product) => {
                const isOutOfStock = !product.isAvailable || product.soldQty >= product.totalQty;
                return (
                  <div key={product.id} className="bg-white rounded-2xl border border-sky-100/70 p-3.5 flex flex-col justify-between hover:shadow-lg hover:border-[#024ad8]/20 transition-all duration-300 group relative">
                    {/* Sale label top */}
                    <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
                      <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        {product.origin === "VN" ? "🇻🇳 VN" : product.origin === "US" ? "🇺🇸 US" : product.origin === "JP" ? "🇯🇵 JP" : product.origin}
                      </span>
                      {product.discount && (
                        <span className="bg-[#ea3829] text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg shadow-sm">
                          {product.discount}
                        </span>
                      )}
                    </div>
                    
                    <Link href={`/thuoc/${product.slug || product.id}`} className="block cursor-pointer">
                      <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className={`w-full h-full object-contain p-2 ${isOutOfStock ? "grayscale opacity-80" : ""}`}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (target.src !== 'https://placehold.co/300x300?text=No+Image') {
                              target.src = 'https://placehold.co/300x300?text=No+Image';
                            }
                          }}
                        />
                        {isOutOfStock && (
                          <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                            <span className="bg-[#ea3829] text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-md uppercase tracking-wider">
                              Đã cháy hàng
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link href={`/thuoc/${product.slug || product.id}`} className="block hover:underline">
                          <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-2 min-h-[30px] group-hover:text-[#024ad8] transition-colors text-left">
                            {product.name}
                          </h4>
                        </Link>
                        <div className="flex flex-col mt-1 text-left">
                          <div className="flex items-baseline gap-1">
                            <strong className="text-[13px] font-black text-[#024ad8]">{product.price.toLocaleString("vi-VN")}đ</strong>
                            <span className="text-[9px] text-graphite font-semibold">/ {product.unit}</span>
                          </div>
                          {product.originalPrice && (
                            <span className="text-[9px] text-gray-400 line-through">{product.originalPrice.toLocaleString("vi-VN")}đ</span>
                          )}
                        </div>
                      </div>

                      {/* Progress stock bar */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-[9px] font-black text-rose-600 mb-1">
                          <span className="flex items-center gap-0.5">🔥 Đã bán {product.soldQty}/{product.totalQty}</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#fef2f2] border border-red-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#f43f5e] to-[#ea580c] rounded-full" style={{ width: `${Math.round((product.soldQty / product.totalQty) * 100)}%` }} />
                        </div>
                        
                        {isOutOfStock ? (
                          <Link 
                            href={`/thuoc/${product.slug || product.id}`}
                            className="w-full bg-cloud text-graphite text-[10px] font-bold py-2 rounded-xl mt-3 uppercase tracking-wider text-center block"
                          >
                            Xem chi tiết
                          </Link>
                        ) : activeFlashSaleTab === "upcoming" ? (
                          <button 
                            disabled
                            className="w-full bg-fog text-graphite cursor-not-allowed text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                          >
                            Sắp mở bán
                          </button>
                        ) : (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart({
                                id: product.id,
                                dbId: product.dbId,
                                name: product.name,
                                price: product.price,
                                unit: product.unit,
                                imageUrl: product.imageUrl,
                                activeIngredient: product.activeIngredient || "",
                                isAvailable: product.isAvailable
                              });
                              triggerToast(`Đã thêm ${product.name.split("...")[0].split("(")[0]} vào giỏ hàng.`);
                            }}
                            className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                          >
                            Chọn mua
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom link: Xem tất cả */}
            <div className="flex justify-center mt-6">
              <button 
                onClick={() => setShowAllFlashSale(!showAllFlashSale)}
                className="text-[#024ad8] hover:text-[#01359c] font-black text-xs flex items-center gap-1 cursor-pointer transition-colors hover:underline"
              >
                {showAllFlashSale ? "Thu gọn <" : "Xem tất cả >"}
              </button>
            </div>
            
            {/* Aesthetic slide prev button indicator */}
            {!showAllFlashSale && (
              <div 
                onClick={handleFlashSalePrev}
                className="absolute top-[60%] left-2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-sky-100 hover:bg-cloud flex items-center justify-center shadow-md text-[#4b5563] hover:text-[#111827] cursor-pointer transition-colors z-20 md:flex hidden"
              >
                <ChevronLeft size={16} />
              </div>
            )}

            {/* Aesthetic slide next button indicator */}
            {!showAllFlashSale && (
              <div 
                onClick={handleFlashSaleNext}
                className="absolute top-[60%] right-2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-sky-100 hover:bg-cloud flex items-center justify-center shadow-md text-[#4b5563] hover:text-[#111827] cursor-pointer transition-colors z-20 md:flex hidden"
              >
                <ChevronRight size={16} />
              </div>
            )}
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
              {BEST_SELLING_PRODUCTS.slice(bestSellingOffset, bestSellingOffset + 6).map((product) => {
                const isOutOfStock = !product.isAvailable;
                return (
                  <div key={product.id} className="bg-white rounded-2xl p-3.5 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group relative">
                    <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
                      <span className="bg-cloud text-graphite border border-fog text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        {product.originLabel}
                      </span>
                      {product.discount && (
                        <span className="bg-[#ea3829] text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg shadow-sm">
                          {product.discount}
                        </span>
                      )}
                    </div>
                    
                    <Link href={`/thuoc/${product.slug || product.id}`} className="block cursor-pointer">
                      <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-full h-full object-contain p-2"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (target.src !== 'https://placehold.co/300x300?text=No+Image') {
                              target.src = 'https://placehold.co/300x300?text=No+Image';
                            }
                          }}
                        />
                      </div>
                    </Link>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link href={`/thuoc/${product.slug || product.id}`} className="block hover:underline">
                          <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors text-left">
                            {product.name}
                          </h4>
                        </Link>
                        
                        {product.isSamsung ? (
                          <>
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
                          </>
                        ) : (
                          <div className="flex flex-col mt-1 text-left">
                            <div className="flex items-baseline gap-1">
                              <strong className="text-[13px] font-black text-[#024ad8]">{product.price.toLocaleString("vi-VN")}đ</strong>
                              <span className="text-[9px] text-graphite font-semibold">/ {product.unit}</span>
                            </div>
                            {product.originalPrice && (
                              <span className="text-[9px] text-gray-400 line-through">{product.originalPrice.toLocaleString("vi-VN")}đ</span>
                            )}
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="inline-block bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2.5 py-1 rounded-lg mt-3">
                          {product.isSamsung ? (samsungUnit === "hop" ? "Hộp 10 Chai x 120ml" : "Chai 120ml") : product.spec}
                        </div>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (product.isSamsung) {
                              const isBox = samsungUnit === "hop";
                              addToCart({
                                id: isBox ? "achimmadang-box" : "achimmadang-bottle",
                                dbId: 0,
                                name: `Nước Sâm Nguyên Củ Achimmadang Inbosam Biok Korea Root Drink (${isBox ? "Hộp 10 Chai x 120ml" : "Chai 120ml"})`,
                                price: isBox ? 400000 : 40000,
                                unit: isBox ? "Hộp" : "Chai",
                                imageUrl: product.imageUrl,
                                activeIngredient: product.activeIngredient,
                                isAvailable: true
                              });
                              triggerToast(`Đã thêm Nước Sâm Achimmadang (${samsungUnit === "hop" ? "Hộp" : "Chai"}) vào giỏ hàng.`);
                            } else {
                              addToCart({
                                id: product.id,
                                dbId: product.dbId,
                                name: product.name,
                                price: product.price,
                                unit: product.unit,
                                imageUrl: product.imageUrl,
                                activeIngredient: product.activeIngredient || "",
                                isAvailable: product.isAvailable
                              });
                              triggerToast(`Đã thêm ${product.name.split("...")[0].split("(")[0]} vào giỏ hàng.`);
                            }
                          }}
                          className="w-full bg-[#024ad8] hover:bg-[#01359c] text-white text-[10px] font-bold py-2 rounded-xl mt-3 transition-colors shadow-sm uppercase tracking-wider"
                        >
                          Chọn mua
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom link: Xem tất cả */}
            <div className="flex justify-center mt-6">
              <Link 
                href="/thuc-pham-chuc-nang"
                className="text-white hover:text-blue-100 font-black text-xs flex items-center gap-1 cursor-pointer transition-colors hover:underline"
              >
                Xem tất cả &gt;
              </Link>
            </div>
            
            {/* Aesthetic slide prev button indicator */}
            <div 
              onClick={handleBestSellingPrev}
              className="absolute top-[50%] -left-4 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-sky-100 hover:bg-cloud flex items-center justify-center shadow-md text-[#4b5563] hover:text-[#111827] cursor-pointer transition-colors z-20 md:flex hidden"
            >
              <ChevronLeft size={16} />
            </div>

            {/* Aesthetic slide next button indicator */}
            <div 
              onClick={handleBestSellingNext}
              className="absolute top-[50%] -right-4 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-sky-100 hover:bg-cloud flex items-center justify-center shadow-md text-[#4b5563] hover:text-[#111827] cursor-pointer transition-colors z-20 md:flex hidden"
            >
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
              return (
                <Link
                  key={cat.id}
                  href={cat.href || '#'}
                  className="p-5 rounded-2xl text-center flex flex-col items-center justify-between border bg-white border-fog hover:border-[#024ad8]/20 hover:scale-102 hover:shadow-lg transition-all duration-300 h-full min-h-[158px] group relative shadow-sm"
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
                </Link>
              );
            })}
          </div>
        </section>

        {/* 5.5. SMART SIDE EFFECT WARNING BANNER (CẢNH BÁO TÁC DỤNG PHỤ THÔNG MINH) */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="bg-gradient-to-r from-[#024ad8] via-[#1d4ed8] to-[#1e40af] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-sm flex flex-col lg:flex-row justify-between items-center gap-6 min-h-[220px]">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 left-1/3 w-64 h-64 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

            {/* Left Content Column */}
            <div className="flex-1 flex flex-col justify-between relative z-10 w-full">
              <div className="text-left">
                <h2 className="text-xl md:text-2xl font-black text-white tracking-wide flex items-center gap-2">
                  <span className="bg-white/20 p-1.5 rounded-lg text-white">
                    <AlertTriangle size={20} className="text-yellow-300 animate-pulse" />
                  </span>
                  Cảnh báo tác dụng phụ thông minh
                </h2>
                <p className="text-xs md:text-sm text-blue-100/90 font-semibold mt-1">
                  Nhận biết sớm và phòng ngừa các tác dụng phụ không mong muốn của thuốc!
                </p>
              </div>

              {/* Three Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                
                {/* Card 1 */}
                <div 
                  onClick={() => {
                    setShowSideEffectModal(true);
                    setSeSearchQuery("");
                    setSelectedSeDrug(null);
                  }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-sky-100/10 flex items-center gap-3.5 hover:shadow-md hover:scale-102 transition-all duration-300 group cursor-pointer"
                >
                  <div className="bg-[#eff6ff] text-[#024ad8] p-3 rounded-2xl shrink-0 group-hover:bg-[#024ad8]/10 transition-colors flex items-center justify-center">
                    <Pill className="w-8 h-8 text-[#024ad8]" />
                  </div>
                  <div className="flex flex-col justify-between h-full text-left">
                    <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-2 min-h-[30px]">
                      Tra cứu tác dụng phụ thuốc phổ biến
                    </h4>
                    <span className="text-[11px] font-black text-[#024ad8] hover:text-[#01359c] mt-2 flex items-center gap-0.5 group-hover:underline">
                      Bắt đầu
                    </span>
                  </div>
                </div>

                {/* Card 2 */}
                <div 
                  onClick={() => {
                    setShowInteractionModal(true);
                    setIaDrugA("");
                    setIaDrugB("");
                    setIaResult(null);
                  }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-sky-100/10 flex items-center gap-3.5 hover:shadow-md hover:scale-102 transition-all duration-300 group cursor-pointer"
                >
                  <div className="bg-[#eff6ff] text-[#024ad8] p-3 rounded-2xl shrink-0 group-hover:bg-[#024ad8]/10 transition-colors flex items-center justify-center">
                    <Activity className="w-8 h-8 text-[#024ad8]" />
                  </div>
                  <div className="flex flex-col justify-between h-full text-left">
                    <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-2 min-h-[30px]">
                      Kiểm tra tương tác thuốc nguy hại
                    </h4>
                    <span className="text-[11px] font-black text-[#024ad8] hover:text-[#01359c] mt-2 flex items-center gap-0.5 group-hover:underline">
                      Bắt đầu
                    </span>
                  </div>
                </div>

                {/* Card 3 */}
                <div 
                  onClick={() => setShowAICopilotModal(true)}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-sky-100/10 flex items-center gap-3.5 hover:shadow-md hover:scale-102 transition-all duration-300 group cursor-pointer"
                >
                  <div className="bg-[#eff6ff] text-[#024ad8] p-3 rounded-2xl shrink-0 group-hover:bg-[#024ad8]/10 transition-colors flex items-center justify-center">
                    <Brain className="w-8 h-8 text-[#024ad8]" />
                  </div>
                  <div className="flex flex-col justify-between h-full text-left">
                    <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-2 min-h-[30px]">
                      Trợ lý dược sĩ AI tư vấn tác dụng phụ
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
                alt="Dược sĩ hỗ trợ tác dụng phụ" 
                className="w-[220px] md:w-[240px] lg:w-[260px] h-auto object-contain drop-shadow-2xl z-10 hover:scale-102 transition-transform duration-300 relative -bottom-8" 
              />
            </div>
            
            {/* Aesthetic slide next button indicator */}
            <div 
              onClick={() => {
                setShowSideEffectModal(true);
                setSeSearchQuery("");
                setSelectedSeDrug(null);
              }}
              className="absolute top-[50%] right-2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-sky-100 hover:bg-cloud flex items-center justify-center shadow-md text-[#4b5563] hover:text-[#111827] cursor-pointer transition-colors z-20 md:flex hidden"
            >
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
                    onClick={() => setShowSeasonalSolutionModal(true)}
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
                      <Link href="/thuoc/gel-boi-mieng-aloclair-plus-alliance-8ml" className="block w-full cursor-pointer">
                        <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                          <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/CHAI_XIT_NHIET_MIENG_TAY_CHAN_MIENG_ALOCLAIR_PLUS_15_ML_00502899_7_c7528bf5e9.jpg" alt="Aloclair Gel" className="w-full h-full object-contain p-2" />
                        </div>
                      </Link>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <Link href="/thuoc/gel-boi-mieng-aloclair-plus-alliance-8ml" className="block text-left mb-1 cursor-pointer">
                            <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                              Gel bôi miệng Aloclair Plus Alliance 8ml giảm nhiệt miệng, tay chân...
                            </h4>
                          </Link>
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
                      <Link href="/thuoc/chai-xit-nhiet-mieng-tay-chan-mieng-aloclair-plus-15ml-ho-tro-dieu-tri-cac-vet-thuong-trong-khoang-mieng" className="block w-full cursor-pointer">
                        <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                          <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/CHAI_XIT_NHIET_MIENG_TAY_CHAN_MIENG_ALOCLAIR_PLUS_15_ML_00502899_6_d4a9ad973b.jpg" alt="Aloclair Spray" className="w-full h-full object-contain p-2" />
                        </div>
                      </Link>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <Link href="/thuoc/chai-xit-nhiet-mieng-tay-chan-mieng-aloclair-plus-15ml-ho-tro-dieu-tri-cac-vet-thuong-trong-khoang-mieng" className="block text-left mb-1 cursor-pointer">
                            <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                              Chai xịt nhiệt miệng, tay chân miệng Aloclair Plus 15ml hỗ trợ điều...
                            </h4>
                          </Link>
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
                      <Link href="/thuoc/nuoc-suc-mieng-pearlie-white-chlor-rinse-plus-250ml" className="block w-full cursor-pointer">
                        <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                          <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_01900_6fe44907dd.jpg" alt="Pearlie Mouthwash" className="w-full h-full object-contain p-2" />
                        </div>
                      </Link>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <Link href="/thuoc/nuoc-suc-mieng-pearlie-white-chlor-rinse-plus-250ml" className="block text-left mb-1 cursor-pointer">
                            <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                              Nước Súc Miệng Pearlie White Chlor-Rinse Plus (250ml)
                            </h4>
                          </Link>
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
                      <Link href="/thuoc/gel-boi-su-bac-khang-khuan-lam-sach-da-25g" className="block w-full cursor-pointer">
                        <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                          <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/00006940_su_bac_gel_lam_sach_sat_khuan_da_8596_63aa_large_5e8c66eecc.jpg" alt="Su Bac Gel" className="w-full h-full object-contain p-2" />
                        </div>
                      </Link>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <Link href="/thuoc/gel-boi-su-bac-khang-khuan-lam-sach-da-25g" className="block text-left mb-1 cursor-pointer">
                            <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                              Gel bôi Su Bạc kháng khuẩn, làm sạch da (25g)
                            </h4>
                          </Link>
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
                      <Link href="/thuoc/nuoc-muoi-sinh-ly-fysoline-septinasal-20-ong-x-5ml-giup-giam-so-mui-viem-mui-nghet-mui-dung-duoc-cho-tre-so-sinh" className="block w-full cursor-pointer">
                        <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                          <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09757_76bf71dab2.png" alt="Fysoline Septinasal" className="w-full h-full object-contain p-2" />
                        </div>
                      </Link>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <Link href="/thuoc/nuoc-muoi-sinh-ly-fysoline-septinasal-20-ong-x-5ml-giup-giam-so-mui-viem-mui-nghet-mui-dung-duoc-cho-tre-so-sinh" className="block text-left mb-1 cursor-pointer">
                            <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                              Nước muối sinh lý Fysoline Septinasal (20 ống x 5ml) giúp giảm...
                            </h4>
                          </Link>
                          
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
                      <Link href="/thuoc/nuoc-muoi-sinh-ly-fysoline-isotonique-dang-truong-40-ong-x-5ml-giup-ve-sinh-mat-mui-hang-ngay" className="block w-full cursor-pointer">
                        <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                          <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09895_dac9a658d8.jpg" alt="Fysoline Isotonique" className="w-full h-full object-contain p-2" />
                        </div>
                      </Link>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <Link href="/thuoc/nuoc-muoi-sinh-ly-fysoline-isotonique-dang-truong-40-ong-x-5ml-giup-ve-sinh-mat-mui-hang-ngay" className="block text-left mb-1 cursor-pointer">
                            <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                              Nước muối sinh lý Fysoline Isotonique đẳng trương (40 ống x...
                            </h4>
                          </Link>
                          
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
                      <Link href="/thuoc/khau-trang-4-lop-famapro-extra-mau-trang-50-cai-nam-anh-ngan-khoi-bui-vi-khuan" className="block w-full cursor-pointer">
                        <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                          <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_08159_6dcd5953f8.jpg" alt="Famapro Mask" className="w-full h-full object-contain p-2" />
                        </div>
                      </Link>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <Link href="/thuoc/khau-trang-4-lop-famapro-extra-mau-trang-50-cai-nam-anh-ngan-khoi-bui-vi-khuan" className="block text-left mb-1 cursor-pointer">
                            <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                              Khẩu trang 4 lớp Famapro Extra màu trắng (50 cái) Nam A...
                            </h4>
                          </Link>
                          
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
                      <Link href="/thuoc/khau-trang-tre-em-4-lop-3d-dolphin-mask-10-cai-ngan-khoi-bui-vi-khuan-va-giot-ban" className="block w-full cursor-pointer">
                        <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                          <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/IMG_0188_f4db0565ff.jpg" alt="Dolphin Mask" className="w-full h-full object-contain p-2" />
                        </div>
                      </Link>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <Link href="/thuoc/khau-trang-tre-em-4-lop-3d-dolphin-mask-10-cai-ngan-khoi-bui-vi-khuan-va-giot-ban" className="block text-left mb-1 cursor-pointer">
                            <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                              Khẩu trang trẻ em 4 lớp 3D Dolphin Mask (10 cái) ngăn khói bụi, vi...
                            </h4>
                          </Link>
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
                      <Link href="/thuoc/vien-nen-panadol-extra-do-gsk-giam-manh-cac-con-dau-ha-sot-dieu-tri-dau-dau-dau-lung-15-vi-x-12-vien" className="block w-full cursor-pointer">
                        <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                          <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_099842_74c1fc532a.png" alt="Panadol Extra" className="w-full h-full object-contain p-2" />
                        </div>
                      </Link>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <Link href="/thuoc/vien-nen-panadol-extra-do-gsk-giam-manh-cac-con-dau-ha-sot-dieu-tri-dau-dau-dau-lung-15-vi-x-12-vien" className="block text-left mb-1 cursor-pointer">
                            <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                              Viên nén Panadol Extra đỏ GSK giảm mạnh các cơn đau, hạ sốt, điều...
                            </h4>
                          </Link>
                          
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
                      <Link href="/thuoc/thuoc-acemuc-200mg-sanofi-long-dam-tieu-nhay-giam-ho-3-vi-x-10-vien" className="block w-full cursor-pointer">
                        <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                          <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/acemuc_200_3x10_sanofi_00000462_73028f19a5.png" alt="Acemuc" className="w-full h-full object-contain p-2" />
                        </div>
                      </Link>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <Link href="/thuoc/thuoc-acemuc-200mg-sanofi-long-dam-tieu-nhay-giam-ho-3-vi-x-10-vien" className="block text-left mb-1 cursor-pointer">
                            <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                              Thuốc Acemuc 200mg Sanofi long đờm, tiêu nhầy, giảm ho...
                            </h4>
                          </Link>
                          
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
                              triggerToast(`Đã thêm Acemuc (${acemucUnit === "hop" ? "Hộp" : "Vỉ" /* Viên */}) vào giỏ hàng.`);
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
                      <Link href="/thuoc/thuoc-chong-di-ung-telfast-hd-180mg-sanofi-giam-trieu-chung-viem-mui-di-ung-may-day-vo-can-man-tinh-3-vi-x-10-vien" className="block w-full cursor-pointer">
                        <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                          <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/1_467af3daf4.png" alt="Telfast 180" className="w-full h-full object-contain p-2" />
                        </div>
                      </Link>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <Link href="/thuoc/thuoc-chong-di-ung-telfast-hd-180mg-sanofi-giam-trieu-chung-viem-mui-di-ung-may-day-vo-can-man-tinh-3-vi-x-10-vien" className="block text-left mb-1 cursor-pointer">
                            <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                              Thuốc chống dị ứng Telfast HD 180mg Sanofi giảm triệu...
                            </h4>
                          </Link>
                          
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
                      <Link href="/thuoc/vien-sui-giup-bo-sung-vitamin-c-cho-co-the-kudos-vitamin-c-1000mg-huong-chanh-20-vien" className="block w-full cursor-pointer">
                        <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                          <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_09324_db795e136a.jpg" alt="Kudos Vitamin C" className="w-full h-full object-contain p-2" />
                        </div>
                      </Link>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <Link href="/thuoc/vien-sui-giup-bo-sung-vitamin-c-cho-co-the-kudos-vitamin-c-1000mg-huong-chanh-20-vien" className="block text-left mb-1 cursor-pointer">
                            <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                              Viên sủi giúp bổ sung vitamin C cho cơ thể Kudos Vitamin C...
                            </h4>
                          </Link>
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
                      <Link href="/thuoc/nuoc-bu-dien-giai-kamizol-vi-cam-250ml" className="block w-full cursor-pointer">
                        <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                          <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/IMG_5064_7c5c85e337.jpg" alt="Kamizol Orange" className="w-full h-full object-contain p-2" />
                        </div>
                      </Link>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <Link href="/thuoc/nuoc-bu-dien-giai-kamizol-vi-cam-250ml" className="block text-left mb-1 cursor-pointer">
                            <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                              Nước Bù Điện Giải Kamizol Vị Cam (250ml)
                            </h4>
                          </Link>
                          
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
                      <Link href="/thuoc/nuoc-bu-dien-giai-kamizol-vi-chanh-250ml" className="block w-full cursor-pointer">
                        <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                          <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/IMG_5077_cc650f0dc4.jpg" alt="Kamizol Lemon" className="w-full h-full object-contain p-2" />
                        </div>
                      </Link>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <Link href="/thuoc/nuoc-bu-dien-giai-kamizol-vi-chanh-250ml" className="block text-left mb-1 cursor-pointer">
                            <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                              Nước Bù Điện Giải Kamizol Vị Chanh (250ml)
                            </h4>
                          </Link>
                          
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
                      <Link href="/thuoc/bot-dien-giai-vi-chanh-day-kamizol-sports-drink-powder-5-goi-x-25g" className="block w-full cursor-pointer">
                        <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                          <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/DSC_06452_66c43d8446.jpg" alt="Kamizol Powder" className="w-full h-full object-contain p-2" />
                        </div>
                      </Link>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <Link href="/thuoc/bot-dien-giai-vi-chanh-day-kamizol-sports-drink-powder-5-goi-x-25g" className="block text-left mb-1 cursor-pointer">
                            <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                              Bột Điện Giải Vị Chanh Dây Kamizol Sports Drink Powder (5 gói x...
                            </h4>
                          </Link>
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
                      <Link href="/thuoc/nhiet-ke-hong-ngoai-do-tran-microlife-nc200" className="block w-full cursor-pointer">
                        <div className="bg-cloud aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                          <img src="https://cdn.nhathuoclongchau.com.vn/v1/static/00502788_nhiet_ke_hong_ngoai_do_tran_microlife_nc200_7708_6391_large_84c0ed9d82.jpg" alt="Microlife NC200" className="w-full h-full object-contain p-2" />
                        </div>
                      </Link>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <Link href="/thuoc/nhiet-ke-hong-ngoai-do-tran-microlife-nc200" className="block text-left mb-1 cursor-pointer">
                            <h4 className="text-[11px] font-bold text-ink leading-tight line-clamp-3 min-h-[42px] group-hover:text-[#024ad8] transition-colors">
                              Nhiệt kế hồng ngoại đo trán Microlife NC200
                            </h4>
                          </Link>
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
                <Link href="/benh/nam-gioi" className="block cursor-pointer">
                  <img src="/benh_nam_gioi.png" alt="Bệnh Nam Giới" className="w-full h-[140px] object-cover rounded-xl mb-4 hover:opacity-95 transition-opacity" />
                  <h3 className="font-black text-[15px] text-ink mb-3 uppercase tracking-wide hover:text-[#024ad8] transition-colors">Bệnh Nam Giới</h3>
                </Link>
                <ul className="flex-1 flex flex-col gap-2 mb-4">
                  {[
                    { name: "Loãng xương ở nam", slug: "loang-xuong-o-nam" },
                    { name: "Di tinh, mộng tinh", slug: "di-tinh-mong-tinh" },
                    { name: "Hẹp bao quy đầu", slug: "hep-bao-quy-dau" },
                    { name: "Yếu sinh lý", slug: "yeu-sinh-ly" }
                  ].map((item, i) => (
                    <li key={i}>
                      <Link href={`/benh/${item.slug}`} className="text-[13px] text-gray-500 font-semibold flex items-center gap-2 hover:text-[#024ad8] transition-colors">
                        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/benh/nam-gioi" className="text-[#024ad8] font-bold text-xs flex items-center gap-1 hover:underline mt-2">
                  Tìm hiểu thêm <ChevronRight size={14} />
                </Link>
              </div>

              {/* Card 2: Bệnh Nữ Giới */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-fog flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <Link href="/benh/nu-gioi" className="block cursor-pointer">
                  <img src="/benh_nu_gioi.png" alt="Bệnh Nữ Giới" className="w-full h-[140px] object-cover rounded-xl mb-4 hover:opacity-95 transition-opacity" />
                  <h3 className="font-black text-[15px] text-ink mb-3 uppercase tracking-wide hover:text-[#024ad8] transition-colors">Bệnh Nữ Giới</h3>
                </Link>
                <ul className="flex-1 flex flex-col gap-2 mb-4">
                  {[
                    { name: "Hội chứng tiền kinh nguyệt", slug: "hoi-chung-tien-kinh-nguyet" },
                    { name: "Hội chứng tiền mãn kinh", slug: "hoi-chung-tien-man-kinh" },
                    { name: "Chậm kinh", slug: "cham-kinh" },
                    { name: "Mất kinh", slug: "mat-kinh" }
                  ].map((item, i) => (
                    <li key={i}>
                      <Link href={`/benh/${item.slug}`} className="text-[13px] text-gray-500 font-semibold flex items-center gap-2 hover:text-[#024ad8] transition-colors">
                        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/benh/nu-gioi" className="text-[#024ad8] font-bold text-xs flex items-center gap-1 hover:underline mt-2">
                  Tìm hiểu thêm <ChevronRight size={14} />
                </Link>
              </div>

              {/* Card 3: Bệnh Người Già */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-fog flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <Link href="/benh/nguoi-gia" className="block cursor-pointer">
                  <img src="/benh_nguoi_gia.png" alt="Bệnh Người Già" className="w-full h-[140px] object-cover rounded-xl mb-4 hover:opacity-95 transition-opacity" />
                  <h3 className="font-black text-[15px] text-ink mb-3 uppercase tracking-wide hover:text-[#024ad8] transition-colors">Bệnh Người Già</h3>
                </Link>
                <ul className="flex-1 flex flex-col gap-2 mb-4">
                  {[
                    { name: "Alzheimer", slug: "alzheimer" },
                    { name: "Parkinson", slug: "parkinson" },
                    { name: "Parkinson thứ phát", slug: "parkinson-thu-phat" },
                    { name: "Đục thủy tinh thể ở người già", slug: "duc-thuy-tinh-the-o-nguoi-gia" }
                  ].map((item, i) => (
                    <li key={i}>
                      <Link href={`/benh/${item.slug}`} className="text-[13px] text-gray-500 font-semibold flex items-center gap-2 hover:text-[#024ad8] transition-colors">
                        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/benh/nguoi-gia" className="text-[#024ad8] font-bold text-xs flex items-center gap-1 hover:underline mt-2">
                  Tìm hiểu thêm <ChevronRight size={14} />
                </Link>
              </div>

              {/* Card 4: Bệnh Trẻ Em */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-fog flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <Link href="/benh/tre-em" className="block cursor-pointer">
                  <img src="/benh_tre_em.png" alt="Bệnh Trẻ Em" className="w-full h-[140px] object-cover rounded-xl mb-4 hover:opacity-95 transition-opacity" />
                  <h3 className="font-black text-[15px] text-ink mb-3 uppercase tracking-wide hover:text-[#024ad8] transition-colors">Bệnh Trẻ Em</h3>
                </Link>
                <ul className="flex-1 flex flex-col gap-2 mb-4">
                  {[
                    { name: "Bại não trẻ em", slug: "bai-nao-tre-em" },
                    { name: "Tự kỷ", slug: "tu-ky" },
                    { name: "Uốn ván", slug: "uon-van" },
                    { name: "Tắc ruột sơ sinh", slug: "tac-ruot-so-sinh" }
                  ].map((item, i) => (
                    <li key={i}>
                      <Link href={`/benh/${item.slug}`} className="text-[13px] text-gray-500 font-semibold flex items-center gap-2 hover:text-[#024ad8] transition-colors">
                        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/benh/tre-em" className="text-[#024ad8] font-bold text-xs flex items-center gap-1 hover:underline mt-2">
                  Tìm hiểu thêm <ChevronRight size={14} />
                </Link>
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
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== 'https://placehold.co/300x300?text=No+Image') {
                        target.src = 'https://placehold.co/300x300?text=No+Image';
                      }
                    }}
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

      {/* 1. SMART SIDE EFFECT SEARCH MODAL */}
      {showSideEffectModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl border border-sky-100 flex flex-col animate-scaleUp">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-[#024ad8] to-[#1e40af] p-6 text-white flex justify-between items-center sticky top-0 z-10">
              <div>
                <h3 className="text-lg font-black flex items-center gap-2">
                  <Pill size={20} className="text-yellow-300" />
                  Tra cứu tác dụng phụ thuốc
                </h3>
                <p className="text-xs text-blue-100/80 font-bold mt-1">
                  Tìm kiếm thông tin tác dụng phụ và cảnh báo sử dụng thuốc an toàn
                </p>
              </div>
              <button 
                onClick={() => setShowSideEffectModal(false)}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5">
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  value={seSearchQuery}
                  onChange={(e) => {
                    setSeSearchQuery(e.target.value);
                    setSelectedSeDrug(null);
                  }}
                  placeholder="Nhập tên thuốc hoặc hoạt chất (Ví dụ: Paracetamol, Ibuprofen...)" 
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-sky-100 outline-none text-xs font-bold focus:border-[#024ad8] focus:ring-2 focus:ring-[#024ad8]/10 transition-all bg-[#f8fafc]"
                />
              </div>

              {/* Drug list or selected drug detail */}
              {!selectedSeDrug ? (
                <div>
                  <h4 className="text-[11px] font-extrabold text-gray-400 mb-3 uppercase tracking-wider">
                    {seSearchQuery ? "Kết quả tìm kiếm" : "Thuốc phổ biến trong tủ thuốc của bạn"}
                  </h4>
                  <div className="flex flex-col gap-3">
                    {SIDE_EFFECTS_DATA.filter(drug => 
                      drug.name.toLowerCase().includes(seSearchQuery.toLowerCase()) || 
                      drug.active.toLowerCase().includes(seSearchQuery.toLowerCase()) ||
                      drug.brand.toLowerCase().includes(seSearchQuery.toLowerCase())
                    ).map((drug, index) => (
                      <div 
                        key={index}
                        onClick={() => setSelectedSeDrug(drug)}
                        className="p-4 rounded-2xl border border-sky-50 bg-white hover:border-[#024ad8]/30 hover:shadow-md cursor-pointer transition-all duration-300 group flex justify-between items-center"
                      >
                        <div className="text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-ink group-hover:text-[#024ad8] transition-colors">{drug.name}</span>
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-blue-50 text-[#024ad8] font-bold border border-blue-100">{drug.active}</span>
                          </div>
                          <p className="text-[10px] text-gray-400 font-bold mt-1">Biệt dược: {drug.brand}</p>
                          <p className="text-[11px] text-gray-600 mt-1 line-clamp-1">{drug.desc}</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-400 group-hover:text-[#024ad8] group-hover:translate-x-0.5 transition-all" />
                      </div>
                    ))}
                    {SIDE_EFFECTS_DATA.filter(drug => 
                      drug.name.toLowerCase().includes(seSearchQuery.toLowerCase()) || 
                      drug.active.toLowerCase().includes(seSearchQuery.toLowerCase()) ||
                      drug.brand.toLowerCase().includes(seSearchQuery.toLowerCase())
                    ).length === 0 && (
                      <div className="text-center py-8 text-gray-400 text-xs font-semibold">
                        Không tìm thấy thông tin tác dụng phụ cho từ khóa &quot;{seSearchQuery}&quot;.
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  {/* Back button */}
                  <button 
                    onClick={() => setSelectedSeDrug(null)}
                    className="self-start text-[#024ad8] text-[11px] font-extrabold hover:underline flex items-center gap-1 mb-1"
                  >
                    <ChevronLeft size={14} /> Quay lại danh sách
                  </button>

                  {/* Drug Info Detail */}
                  <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100/50 text-left">
                    <h4 className="text-sm font-black text-[#024ad8]">{selectedSeDrug.name}</h4>
                    <p className="text-[11px] text-gray-500 font-bold mt-1">Biệt dược phổ biến: {selectedSeDrug.brand}</p>
                    <p className="text-[11px] text-gray-500 font-bold">Hoạt chất: {selectedSeDrug.active}</p>
                    <p className="text-[12px] text-ink font-semibold mt-3 bg-white p-3 rounded-xl border border-sky-100">{selectedSeDrug.desc}</p>
                  </div>

                  {/* Side effects content */}
                  <div className="text-left">
                    <h5 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">Tác dụng phụ có thể gặp</h5>
                    <div className="p-4 rounded-2xl bg-red-50/40 border border-red-100 text-red-950 text-xs font-semibold leading-relaxed">
                      {selectedSeDrug.sideEffects}
                    </div>
                  </div>

                  {/* Clinical warning */}
                  <div className="text-left">
                    <h5 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">Cảnh báo y tế đặc biệt</h5>
                    <div className="p-4 rounded-2xl bg-yellow-50/40 border border-yellow-100 text-yellow-950 text-xs font-semibold leading-relaxed flex gap-2">
                      <AlertTriangle className="text-yellow-600 shrink-0 mt-0.5" size={16} />
                      <span>{selectedSeDrug.warning}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <div className="bg-sky-50/40 border border-sky-100 rounded-2xl p-4 text-[10px] text-sky-950 flex gap-2.5 text-left mt-auto">
                <Info size={16} className="text-[#024ad8] shrink-0 mt-0.5" />
                <span>
                  <strong>Miễn trừ trách nhiệm:</strong> Thông tin trên đây được tổng hợp cho mục đích tra cứu tham khảo học tập. Người bệnh không được tự ý ngưng dùng thuốc hoặc tự ý thay đổi liều dùng khi chưa có chỉ định và sự hướng dẫn của bác sĩ chuyên khoa hoặc dược sĩ chuyên môn.
                </span>
              </div>

            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-4 border-t border-sky-100 flex justify-end">
              <button 
                onClick={() => setShowSideEffectModal(false)}
                className="bg-[#024ad8] hover:bg-[#01359c] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition-colors"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 2. DRUG INTERACTION MODAL */}
      {showInteractionModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-white rounded-3xl w-full max-w-xl max-h-[85vh] overflow-hidden shadow-2xl border border-sky-100 flex flex-col animate-scaleUp">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-[#024ad8] to-[#1e40af] p-6 text-white flex justify-between items-center sticky top-0 z-10">
              <div>
                <h3 className="text-lg font-black flex items-center gap-2">
                  <Activity size={20} className="text-yellow-300" />
                  Kiểm tra tương tác thuốc chéo
                </h3>
                <p className="text-xs text-blue-100/80 font-bold mt-1">
                  Đánh giá mức độ tương tác nguy hiểm giữa hai loại thuốc dùng chung
                </p>
              </div>
              <button 
                onClick={() => setShowInteractionModal(false)}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
              
              {/* Select Drugs Section */}
              <div className="grid grid-cols-2 gap-4">
                {/* Drug A */}
                <div className="flex flex-col gap-2 text-left">
                  <label className="text-[11px] font-extrabold text-gray-400 uppercase">Thuốc / Chất A</label>
                  <select 
                    value={iaDrugA}
                    onChange={(e) => {
                      setIaDrugA(e.target.value);
                      setIaResult(null);
                    }}
                    className="w-full p-3 rounded-xl border border-sky-100 text-xs font-bold outline-none focus:border-[#024ad8] bg-[#f8fafc] cursor-pointer"
                  >
                    <option value="">-- Chọn thuốc A --</option>
                    <option value="Paracetamol">Paracetamol (Panadol)</option>
                    <option value="Ibuprofen">Ibuprofen (Gofen)</option>
                    <option value="Aspirin">Aspirin</option>
                    <option value="Amoxicillin">Amoxicillin</option>
                    <option value="Omeprazole">Omeprazole</option>
                    <option value="Rượu">Rượu (Ethanol)</option>
                    <option value="Thuốc tránh thai">Thuốc tránh thai hàng ngày</option>
                    <option value="Clopidogrel">Clopidogrel (Thuốc chống đông)</option>
                  </select>
                </div>

                {/* Drug B */}
                <div className="flex flex-col gap-2 text-left">
                  <label className="text-[11px] font-extrabold text-gray-400 uppercase">Thuốc / Chất B</label>
                  <select 
                    value={iaDrugB}
                    onChange={(e) => {
                      setIaDrugB(e.target.value);
                      setIaResult(null);
                    }}
                    className="w-full p-3 rounded-xl border border-sky-100 text-xs font-bold outline-none focus:border-[#024ad8] bg-[#f8fafc] cursor-pointer"
                  >
                    <option value="">-- Chọn thuốc B --</option>
                    <option value="Paracetamol">Paracetamol (Panadol)</option>
                    <option value="Ibuprofen">Ibuprofen (Gofen)</option>
                    <option value="Aspirin">Aspirin</option>
                    <option value="Amoxicillin">Amoxicillin</option>
                    <option value="Omeprazole">Omeprazole</option>
                    <option value="Rượu">Rượu (Ethanol)</option>
                    <option value="Thuốc tránh thai">Thuốc tránh thai hàng ngày</option>
                    <option value="Clopidogrel">Clopidogrel (Thuốc chống đông)</option>
                  </select>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={handleCheckInteraction}
                className="w-full py-3 rounded-2xl bg-[#024ad8] hover:bg-[#01359c] text-white text-xs font-extrabold transition-all duration-300 shadow-md flex items-center justify-center gap-1.5"
              >
                Kiểm tra tương tác
              </button>

              {/* Result Area */}
              {iaResult !== null && (
                <div className="animate-fadeIn text-left">
                  {iaResult === "clean" ? (
                    <div className="p-5 rounded-2xl bg-green-50 border border-green-200 text-green-950 flex gap-3 text-xs font-bold">
                      <div className="bg-green-5050 text-white p-1 rounded-full shrink-0 flex items-center justify-center w-6 h-6 bg-green-500">
                        <Check size={14} />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-black text-green-900">Không tìm thấy tương tác bất lợi</h4>
                        <p className="font-semibold text-green-800/80 mt-1">Chưa ghi nhận tương tác bất lợi trực tiếp hoặc nguy cơ cao giữa {iaDrugA} và {iaDrugB} trong cơ sở dữ liệu y khoa của PharmaAssist.</p>
                      </div>
                    </div>
                  ) : (
                    <div className={`p-5 rounded-2xl border flex gap-3 text-xs font-bold ${iaResult.bg}`}>
                      <div className={`p-1.5 rounded-full shrink-0 flex items-center justify-center w-8 h-8 ${iaResult.iconBg}`}>
                        <AlertTriangle size={18} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-black">{iaDrugA} &harr; {iaDrugB}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/10 font-black uppercase tracking-wider">{iaResult.severityText}</span>
                        </div>
                        
                        <div className="mt-3">
                          <h5 className="text-[10px] text-gray-500 uppercase tracking-wider font-extrabold">Cơ chế & Tác hại</h5>
                          <p className="mt-0.5 leading-relaxed text-gray-800 font-semibold">{iaResult.desc}</p>
                        </div>

                        <div className="mt-3">
                          <h5 className="text-[10px] text-gray-500 uppercase tracking-wider font-extrabold">Khuyến cáo chuyên khoa</h5>
                          <p className="mt-0.5 leading-relaxed text-[#024ad8] font-bold">{iaResult.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Disclaimer */}
              <div className="bg-sky-50/40 border border-sky-100 rounded-2xl p-4 text-[10px] text-sky-950 flex gap-2.5 text-left mt-auto">
                <Info size={16} className="text-[#024ad8] shrink-0 mt-0.5" />
                <span>
                  <strong>Miễn trừ trách nhiệm:</strong> Kết quả tương tác trên đây chỉ có giá trị tham khảo giáo dục lâm sàng. Bệnh nhân tuyệt đối không tự ý ngưng hoặc thay đổi phác đồ thuốc điều trị mà không hỏi ý kiến trực tiếp của Bác sĩ điều trị hoặc Dược sĩ phụ trách chuyên môn.
                </span>
              </div>

            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-4 border-t border-sky-100 flex justify-end">
              <button 
                onClick={() => setShowInteractionModal(false)}
                className="bg-white hover:bg-gray-100 text-gray-600 text-xs font-bold px-6 py-2.5 rounded-xl border border-gray-200 transition-colors"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 3. AI PHARMACIST COPILOT CHAT MODAL */}
      {showAICopilotModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-white rounded-3xl w-full max-w-lg h-[80vh] overflow-hidden shadow-2xl border border-sky-100 flex flex-col animate-scaleUp">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-[#024ad8] to-[#1e40af] p-5 text-white flex justify-between items-center sticky top-0 z-10 shadow-sm shrink-0">
              <div className="flex items-center gap-2.5 text-left">
                <div className="bg-white/20 p-2 rounded-xl text-white">
                  <Brain size={20} className="text-yellow-300 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-black">Trợ lý Dược sĩ AI</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                    <span className="text-[9px] text-green-300 font-bold uppercase tracking-wider">Hỗ trợ y tế trực tuyến 24/7</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowAICopilotModal(false)}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="p-5 flex-1 overflow-y-auto bg-gray-50 flex flex-col gap-4">
              
              {/* Bot welcome & Suggestion QAs */}
              <div className="flex flex-col gap-3">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index}
                    className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
                  >
                    {msg.sender === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#024ad8] to-[#1e40af] text-white flex items-center justify-center text-xs font-black shrink-0">
                        AI
                      </div>
                    )}
                    <div className={`p-3.5 rounded-2xl text-xs font-semibold leading-relaxed shadow-sm text-left ${msg.sender === 'user' ? 'bg-[#024ad8] text-white rounded-tr-none' : 'bg-white text-ink border border-sky-100/50 rounded-tl-none'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isChatLoading && (
                  <div className="flex gap-2 max-w-[85%] self-start animate-pulse">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#024ad8] to-[#1e40af] text-white flex items-center justify-center text-xs font-black shrink-0">
                      AI
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white border border-sky-100/50 text-xs font-bold text-gray-400 rounded-tl-none flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestions Chips when there are only few messages */}
              {chatMessages.length === 1 && (
                <div className="mt-2 text-left shrink-0">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">Câu hỏi y học thường gặp</span>
                  <div className="flex flex-col gap-2">
                    {AI_BOT_QAS.map((qa, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendChatMessage(qa.q)}
                        disabled={isChatLoading}
                        className="text-[11px] font-bold text-left p-3 rounded-xl border border-sky-100 bg-white hover:border-[#024ad8]/40 hover:bg-blue-50/20 text-[#024ad8] transition-all"
                      >
                        {qa.q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Disclaimer Bar */}
            <div className="bg-yellow-50/80 px-4 py-2 border-t border-b border-yellow-100 text-[9px] text-yellow-900/90 text-center font-bold shrink-0">
              * Khuyến cáo: AI chỉ dùng cho mô phỏng học tập. Không tự chẩn đoán bệnh lý y tế thực tế!
            </div>

            {/* Chat Input Area */}
            <div className="p-4 bg-white border-t border-gray-150 flex items-center gap-3 shrink-0">
              <input 
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                placeholder="Hỏi về tác dụng phụ, cách dùng thuốc..."
                disabled={isChatLoading}
                className="flex-1 p-3 rounded-xl border border-gray-200 text-xs font-bold outline-none focus:border-[#024ad8] transition-colors"
              />
              <button 
                onClick={() => handleSendChatMessage()}
                disabled={!chatInput.trim() || isChatLoading}
                className={`px-4 py-3 rounded-xl text-xs font-extrabold text-white transition-all shadow-sm ${chatInput.trim() && !isChatLoading ? 'bg-[#024ad8] hover:bg-[#01359c]' : 'bg-gray-300 cursor-not-allowed'}`}
              >
                Gửi
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 4. SEASONAL SOLUTION MODAL */}
      {showSeasonalSolutionModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-white rounded-3xl border border-fog shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-slideUp">
            
            {/* Header */}
            <div className="bg-[#024ad8] p-5 md:p-6 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                </div>
                <div>
                  <h3 className="text-white text-lg font-black">Giải pháp phòng bệnh mùa</h3>
                  <p className="text-white/80 text-[11px] font-medium">
                    {activeSeasonalTab === 0 ? "Tay chân miệng" :
                     activeSeasonalTab === 1 ? "Viêm não mô cầu" :
                     activeSeasonalTab === 2 ? "Cúm mùa" : "Sốt xuất huyết"}
                  </p>
                </div>
              </div>
              <button onClick={() => setShowSeasonalSolutionModal(false)} className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
              
              {/* Epidemiology Block */}
              <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 md:p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-xl z-10">Cảnh báo dịch tễ</div>
                <div className="flex gap-4 relative z-10">
                  <div className="text-rose-500 mt-1 shrink-0"><AlertTriangle size={24} /></div>
                  <div>
                    <h4 className="text-[13px] font-black text-rose-800 mb-1">Mức độ lây lan nguy hiểm</h4>
                    <p className="text-[12px] text-rose-700/90 leading-relaxed font-medium">
                      {activeSeasonalTab === 0 && "Tay chân miệng lây qua đường tiêu hóa và tiếp xúc trực tiếp. Vi rút có khả năng sống lâu trong môi trường bên ngoài, lây nhanh ở các trường mầm non."}
                      {activeSeasonalTab === 1 && "Viêm não mô cầu lây qua đường hô hấp khi tiếp xúc gần. Bệnh tiến triển cực kỳ nhanh trong 24 giờ, có khả năng gây tử vong cao nếu không cấp cứu kịp."}
                      {activeSeasonalTab === 2 && "Cúm mùa có khả năng lây lan diện rộng qua đường hô hấp. Các chủng cúm liên tục biến đổi, gây nguy hiểm cho người già, trẻ nhỏ và người suy giảm miễn dịch."}
                      {activeSeasonalTab === 3 && "Sốt xuất huyết lây qua muỗi vằn Aedes. Không lây từ người sang người nhưng dễ bùng phát thành dịch tại các khu dân cư đông đúc, có vùng nước đọng."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Protocol Block */}
              <div>
                <h4 className="text-[14px] font-black text-[#1a1a1a] mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-[#024ad8] rounded-full"></div>
                  Phác đồ dự phòng & Chăm sóc
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-cloud border border-fog rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2 text-[#024ad8]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      <h5 className="text-[12px] font-bold text-ink">Phòng ngừa</h5>
                    </div>
                    <ul className="text-[11px] text-graphite space-y-2 font-medium">
                      {activeSeasonalTab === 0 && (
                        <><li>• Rửa tay thường xuyên bằng xà phòng.</li><li>• Vệ sinh đồ chơi, bề mặt tiếp xúc.</li><li>• Ăn chín, uống sôi, không chung muỗng thìa.</li></>
                      )}
                      {activeSeasonalTab === 1 && (
                        <><li>• Tiêm vắc xin não mô cầu (A, C, Y, W, B).</li><li>• Đeo khẩu trang khi đến nơi đông người.</li><li>• Súc họng bằng nước muối sinh lý.</li></>
                      )}
                      {activeSeasonalTab === 2 && (
                        <><li>• Tiêm vắc xin cúm nhắc lại hàng năm.</li><li>• Giữ ấm cơ thể, tăng cường vitamin C.</li><li>• Tránh tiếp xúc với người bệnh cúm.</li></>
                      )}
                      {activeSeasonalTab === 3 && (
                        <><li>• Ngủ mùng, dùng kem xua muỗi.</li><li>• Diệt loăng quăng, lật úp vật chứa nước.</li><li>• Phun thuốc diệt muỗi quanh khu vực sống.</li></>
                      )}
                    </ul>
                  </div>

                  <div className="bg-cloud border border-fog rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2 text-emerald-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      <h5 className="text-[12px] font-bold text-ink">Xử trí ban đầu</h5>
                    </div>
                    <ul className="text-[11px] text-graphite space-y-2 font-medium">
                      {activeSeasonalTab === 0 && (
                        <><li>• Hạ sốt nếu trẻ sốt cao &gt; 38.5°C.</li><li>• Dùng thuốc bôi làm dịu vết loét miệng.</li><li>• Cho ăn thức ăn lỏng, mát, chia nhỏ bữa.</li></>
                      )}
                      {activeSeasonalTab === 1 && (
                        <><li>• <span className="text-rose-600 font-bold">Lưu ý:</span> Đưa đi cấp cứu ngay lập tức.</li><li>• Tuyệt đối không tự ý dùng kháng sinh.</li><li>• Cách ly bệnh nhân để tránh lây nhiễm.</li></>
                      )}
                      {activeSeasonalTab === 2 && (
                        <><li>• Uống nhiều nước ấm, nghỉ ngơi.</li><li>• Dùng thuốc hạ sốt, giảm đau (Paracetamol).</li><li>• Súc họng, xịt mũi để thông đường thở.</li></>
                      )}
                      {activeSeasonalTab === 3 && (
                        <><li>• Bù nước Oresol, nước trái cây liên tục.</li><li>• Chỉ dùng Paracetamol hạ sốt, <span className="text-rose-600 font-bold">tuyệt đối không dùng Ibuprofen/Aspirin</span>.</li></>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer with AI CTA */}
            <div className="bg-cloud border-t border-fog p-5 md:p-6 shrink-0 flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="flex items-center gap-3 text-[#024ad8]">
                <div className="bg-[#024ad8]/10 p-2 rounded-full shrink-0"><Bot size={20} /></div>
                <p className="text-[11px] font-medium text-ink leading-tight">Bạn có triệu chứng bất thường?<br/>Hãy hỏi Dược sĩ AI để được tư vấn thêm.</p>
              </div>
              <button
                onClick={() => {
                  setShowSeasonalSolutionModal(false);
                  setShowAICopilotModal(true);
                  const diseaseNames = ["Tay chân miệng", "Viêm não mô cầu", "Cúm mùa", "Sốt xuất huyết"];
                  setChatInput(`Tôi muốn hỏi về cách chăm sóc bệnh ${diseaseNames[activeSeasonalTab]}`);
                }}
                className="w-full md:w-auto px-6 py-2.5 bg-gradient-to-r from-[#024ad8] to-[#1e40af] hover:from-[#1e40af] hover:to-[#01359c] text-white text-[12px] font-bold rounded-xl shadow-md transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Hỏi Dược sĩ AI
              </button>
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
