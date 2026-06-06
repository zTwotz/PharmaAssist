import React from "react";
import {
  Activity,
  Heart,
  ClipboardList,
  Sparkles,
  AlertTriangle,
  Check,
  User,
  FileText,
  Shield,
  Brain,
  Droplets,
  Wind,
  Flame,
  Eye
} from "lucide-react";

export interface MegaProduct {
  name: string;
  price: number;
  unit: string;
  image: string;
  discount?: number;
  originalPrice?: number;
}

export interface MegaSubCategory {
  id: string;
  name: string;
  iconName: string;
  children: string[];
  featuredProducts: MegaProduct[];
}

export interface MegaCategory {
  id: string;
  name: string;
  subCategories: MegaSubCategory[];
}

export const NAV_MEGA_MENU_DATA: MegaCategory[] = [
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

export function renderMenuIcon(iconName: string) {
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

export const renderSubcatThumbnail = (name: string) => {
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
