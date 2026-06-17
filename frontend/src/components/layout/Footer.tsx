"use client";

import React from "react";
import Link from "next/link";
import { MapPin, ShieldCheck, Info } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  // Hide footer on management and POS routes
  const hidePaths = ['/pos', '/login', '/dashboard', '/medicines', '/inventory', '/sales', '/customers', '/suppliers'];
  const shouldHide = hidePaths.some(path => pathname === path || pathname.startsWith('/dashboard') || pathname.startsWith('/pos'));
  if (shouldHide) return null;
  return (
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
  );
}
