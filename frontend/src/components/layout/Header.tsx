"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  User,
  Phone,
  MapPin,
  Lock,
  Sparkles,
  ChevronRight,
  ChevronDown,
  X
} from "lucide-react";
import { NAV_MEGA_MENU_DATA, renderMenuIcon, renderSubcatThumbnail } from "@/lib/constants/menu";

export function Header() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeSubId, setActiveSubId] = useState<string>("supplements-vitamin");
  const cartCount = 0; // Tạm thời tĩnh

  const handleCategoryClick = (e: React.MouseEvent, ...names: string[]) => {
    e.preventDefault();
    const slugPath = names.map(name => {
      // Hardcode exception based on categories.md
      if (name === "Cơ xương khớp" && names[0] === "Thực phẩm chức năng") {
        return "co-xuong-khop-cat000247";
      }
      return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/&/g, "and") // Fix for & character
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
    }).join("/");
    router.push(`/${slugPath}`);
  };

  return (
    <>
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
                    onClick={(e) => handleCategoryClick(e, cat.name)}
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
                                      onClick={(e) => handleCategoryClick(e, cat.name, sub.name, child)}
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
                                    onClick={(e) => handleCategoryClick(e, cat.name, sub.name)}
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
                                      onClick={(e) => handleCategoryClick(e, cat.name, sub.name)}
                                    >
                                      <div className="bg-cloud aspect-square rounded-lg flex items-center justify-center overflow-hidden mb-2 relative">
                                        {prod.discount && (
                                          <div className="absolute top-1 left-1 bg-[#ea3829] text-white text-[9px] font-black px-1.5 py-0.5 rounded-md z-10">
                                            -{prod.discount}%
                                          </div>
                                        )}
                                        {(() => {
                                          const finalImage = prod.image;
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
    </>
  );
}
