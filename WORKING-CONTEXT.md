# Working Context - PharmaAssist AI Intelligence

Last updated: 2026-06-21

## Purpose
Dự án phát triển website quản lý nhà thuốc thông minh **PharmaAssist AI Intelligence** phục vụ môn học **Công Nghệ Phần Mềm**. Repo chứa mã nguồn Frontend, Backend, tài liệu đặc tả và thiết kế.

---

## Current Truth
- **Nhánh chính:** `main`
- **Database:** Kết nối Supabase Cloud PostgreSQL (Project Ref: `opzhotrjpxlldflcnzzq`).
- **Jira:** Đồng bộ cloud workspace `pharmaassist.atlassian.net` (Dự án `PAC`).
- **Technology Stack:**
  - **Frontend:** Next.js (React + TypeScript), Tailwind CSS, Shadcn UI / Lucide Icons.
  - **Backend:** NestJS (TypeScript), Prisma ORM, Supabase Auth + JWT Verification, class-validator.
  - **Database:** Supabase Cloud PostgreSQL.
  - **Supabase Features:** Auth, Triggers/Functions, Storage, Realtime, pg_cron.
  - **AI Integration:** Gemini API (phục vụ AI Pharmacist Copilot).
- **Trạng thái code:** Đã hoàn thành bộ khung (boilerplate) Frontend/Backend, thiết lập 100 bảng database và nạp dữ liệu seed thành công.

---

## Current Constraints
- **Quy tắc Git Commit:** Tuân thủ Conventional Commits và bắt buộc gắn Jira issue key (`PAC-xxx`).
- **Quy tắc Ngôn ngữ:** Code và comment hoàn toàn bằng tiếng Anh. Phản hồi người dùng bằng tiếng Việt.
- **Bảo mật:** Không commit file `.env`, credentials, API Keys lên Git.
- **Y khoa:** Hệ thống chỉ mang tính chất tham khảo, không đưa ra chẩn đoán hay kê đơn điều trị.

---

## 📋 Active Queues (Sprint 2 & Upcoming)
- **PAC-19 (In Progress):** Develop Product Listing Page (PLP) with advanced filtering, pagination, and sorting.
  - *Status:* Created `app/san-pham/page.tsx`, `FilterSidebar.tsx`, `ProductGrid.tsx`. Installed shadcn-ui components. Integrated Supabase server-side fetching with category tree building. Header updated to link to PLP.
- **PAC-20 (Completed):** Develop Product Detail Page (PDP) with responsive layout and rich data from Supabase.
  - *Status:* Implemented NestJS Backend API GET `/products/:slug` with Prisma relational query. Created Next.js server page with Hybrid Fallback Fetching and client components (`ProductDetailClient.tsx`). Integrated shopping cart adding and navigation. Link connected on home page.
- **PAC-14 (Todo):** Global search with Debounce.
- **PAC-21 (Todo):** Shopping Cart functionality.
- [x] Thiết lập khung dự án Frontend & Backend (NestJS + Next.js + Prisma ORM).
- [x] Thiết kế & migration database schema trên Supabase (Khởi tạo 100 bảng database).
- [x] Triển khai Xác thực & Phân quyền Auth & RBAC (Sprint 1 - PAC-43 đến PAC-50).
- [x] Triển khai Quản lý nhân viên & thuốc (Sprint 2 - PAC-51 đến PAC-67) -> **Đã hoàn thành 100% (Quality Gate Verified)**.
- [x] Triển khai Quản lý Tồn kho & Nhập kho (Sprint 3 - PAC-68 đến PAC-84, PAC-87 đến PAC-92) -> **Đã hoàn thành 100% (Quality Gate Verified)**.
- [ ] Triển khai Luồng bán hàng POS & Kiểm tra tương tác thuốc (Sprint 4 - PAC-85, PAC-86, PAC-93 đến PAC-110).
- [ ] Báo cáo & Dashboard tổng quan (Sprint 5 - PAC-111 đến PAC-120).
- [ ] Triển khai AI Copilot Foundation (Sprint 6 - PAC-128 đến PAC-133, PAC-157 đến PAC-180).
- [ ] Triển khai AI Guardrail & Audit Log (Sprint 7 - PAC-134 đến PAC-138, PAC-181 đến PAC-199).
- [ ] Triển khai Supabase Storage, Realtime & Notification (Sprint 8 - PAC-139 đến PAC-145, PAC-200 đến PAC-222).
- [ ] Triển khai Knowledge Graph & Graph-RAG (Sprint 9 - PAC-146 đến PAC-150, PAC-223 đến PAC-238).
- [ ] Triển khai Forecast, Advanced Testing & Final Demo (Sprint 10 - PAC-151 đến PAC-156, PAC-239 đến PAC-258).

---

## Interfaces
- **Jira Board:** [pharmaassist.atlassian.net](https://pharmaassist.atlassian.net) (Project: `PAC`).
- **Đặc tả hệ thống:** Thư mục [PharmaAssist-Doc](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/PharmaAssist-Doc).
- **Quy tắc làm việc:** File [rules-w-pharmaassist.md](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/.agents/rules/rules-w-pharmaassist.md).

---

## 📓 Latest Execution Notes

### 2026-06-22 (Bổ sung phần Các bài viết liên quan & Sửa lỗi cấu trúc thư mục route Bệnh lý học)
- **Sửa lỗi thư mục route bệnh lý**: Đã tái cấu trúc thư mục động từ bị lỗi cú pháp `[slug` và subfolder `]` thành thư mục Next.js dynamic route chuẩn `src/app/benh/[slug]/page.tsx`. Khôi phục hoàn toàn khả năng truy cập các trang bệnh học trực tiếp như `/benh/klinefelter` thay vì bị redirect/fallback về trang catalog sản phẩm.
- **Thêm phần Các bài viết liên quan**: Thiết kế và triển khai thành công khu vực "Các bài viết liên quan" dạng lưới 4 cột ở dưới cùng của trang chi tiết bệnh lý, tự động lọc lấy tối đa 16 bệnh khác cùng chuyên mục (ví dụ: hiển thị các bệnh Nam giới khác khi đang xem Klinefelter). Định dạng tiêu đề chữ thường và icon quyển sách giống hệt UI Nhà thuốc Long Châu.
- **Xử lý ảnh lỗi thông minh**: Viết component `DiseaseImage` để xử lý fallback khi link ảnh bị lỗi, thay bằng một khung gradient màu xanh-tím nhạt kèm icon ống nghe `🩺` và tên bệnh viết hoa đậm vô cùng premium.
- **Kiểm thử & Linter**: Biên dịch TypeScript (`npx tsc --noEmit`) thành công 100% không có lỗi, linter frontend sạch sẽ và xác minh hiển thị thực tế trên trình duyệt thông qua browser agent hoạt động hoàn hảo.

### 2026-06-21 (Sprint 4 Progress - PDP Improvements, Homepage Banner Carousel & Dynamic Product Sliders)
- **Homepage Flash Sale & Best Selling Dynamic Sliders & Redirection:**
  - Declared `FLASH_SALE_PRODUCTS` and `BEST_SELLING_PRODUCTS` arrays (8 items each) to dynamically back the homepage product listings.
  - Implemented cyclical Next/Prev controls for both sections using React state hooks (`flashSaleOffset`, `bestSellingOffset`), dynamically slicing to display 6 products at a time.
  - Connected the "Xem tất cả" (View All) buttons to redirect directly to the Product Listing Page at `/thuc-pham-chuc-nang` instead of scroll anchors.
  - Verified frontend build with 0 compilation and TypeScript errors.
- **Redesigned Product Detail Page (PDP) & Added Related Products:**
  - Redesigned the product detail client layout `ProductDetailClient.tsx` to match the design for Abbott Ensure Gold StrengthPro 237ml, adding country badge (Hoa Kỳ), rating metadata, a countdown Flash Sale banner with progress bar, dynamic unit pricing (Thùng, Lốc, Chai), specifications summary, font size toggle, and a verified pharmacist bio section.
  - Implemented a "Sản phẩm liên quan" (Related Products) section at the bottom of the PDP, fetching similar items in the same category from Supabase (with mocks for seasonal/static categories).
  - Connected the static Flash Sale and Best Selling product cards on the homepage (`page.tsx`) to their correct details pages (`/san-pham/[slug]`).
  - Added a `useMemo` filter inside `ProductDetailClient.tsx` to filter out duplicate image URLs returned by the database.
- **Homepage Header Banner Slider:**
  - Re-implemented the main hero banner section on the homepage (`page.tsx`) as a dynamic interactive carousel.
  - Added 3 slides (Enterogermina Baby Comfort, Ensure Gold StrengthPro, Panadol Extra) bound with real database product detail routes.
  - Made the prev/next navigation buttons fully functional (using state hooks) and added elegant bottom dot indicators.
  - Verified frontend build with 0 compilation and TypeScript errors.

### 2026-06-21 (Sprint 3 Completion)
- **Sprint 3 Quality Gate Review & Completion:**
  - Hoàn thành toàn diện 22 User Stories (US-27 đến US-48) và 59 tasks thuộc `PAC-EPIC-05` (Inventory & MedicineBatch) và `PAC-EPIC-06` (Stock Import).
  - Triển khai thành công Backend API và giao diện UI cho: MedicineBatch là Source of Truth, Inventory Summary (Sellable Quantity, Low-stock, Near-expiry), Stock Import (Draft, Validations, Confirm transaction, Merge Batch, Expiry Reject), và Audit Logging.
  - Chạy PASS 100% bộ kiểm thử tự động `StockImportsService` (18/18 Unit Tests).
  - Biên dịch (build) thành công cả frontend Next.js và backend NestJS không còn lỗi TypeScript.
  - Cập nhật tài liệu nghiệm thu Sprint 3 (`sprint-3-progress.md`, `sprint-3-smoke-test.md`, `WORKING-CONTEXT.md`).
  - Toàn bộ code đã được commit và merge lên nhánh `develop`. Đã tạo Pull Request `develop -> main` chờ duyệt. Đủ điều kiện chuyển sang Sprint 4.

### 2026-06-21
- **Sprint 2 Quality Gate Review & Completion:**
  - Hoàn thành toàn diện việc kiểm duyệt 49 tasks (PAC-TASK-053 đến PAC-TASK-101) thuộc `PAC-EPIC-03` và `PAC-EPIC-04`.
  - Dọn sạch 100% lỗi linter (ESLint / TypeScript warning) ở cả frontend Next.js và backend NestJS. Sửa lỗi hoisting, import thừa và state-in-effect trong component `CategoryList.tsx` và clean up type checks cho `SupplierSelector.tsx`.
  - Chạy PASS 100% bộ kiểm thử tự động backend NestJS (65 unit tests, 10 e2e tests).
  - Biên dịch (build) thành công cả frontend Next.js và backend NestJS.
  - Cập nhật tài liệu nghiệm thu Sprint 2 (`sprint-2-progress.md`, `sprint-2-audit.md`, `WORKING-CONTEXT.md`).
  - Toàn bộ code đã được commit và push lên nhánh `develop`. Đủ điều kiện chuyển sang Sprint 3.

### 2026-06-11
- **Triển khai Dashboard Tổng Quan với Số Liệu Thực (`/dashboard`):**
  - **Backend API**: Thêm endpoint `GET /api/orders/stats` tổng hợp doanh thu hôm nay, số đơn, tổng SKU còn kho và cảnh báo sắp hết hàng qua `Promise.all` cho hiệu suất cao. Dùng raw SQL để so sánh `quantity <= min_quantity`.
  - **Frontend Dashboard**: Viết lại hoàn toàn trang [/dashboard](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/frontend/src/app/dashboard/page.tsx) với 4 thẻ stat có skeleton loading animation và trend indicators, bảng 5 đơn gần nhất, 5 quick-action links, tự động làm mới mỗi 60 giây và nút refresh thủ công.
- **Hoàn thành các phân hệ quản lý Thuốc, Tồn kho & Lịch sử Bán hàng POS (Sprint 2/3/4):**

  - **Quản lý Thuốc (`/medicines`)**: Tạo component [MedicineList.tsx](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/frontend/src/components/medicines/MedicineList.tsx) và tích hợp vào trang [/medicines](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/frontend/src/app/medicines/page.tsx) để hiển thị danh sách dược phẩm thực tế từ API, hỗ trợ tìm kiếm nâng cao (biệt dược, mã, hoạt chất), lọc theo danh mục, phân loại kê đơn, và xem chi tiết biệt dược cùng cấu hình các SKU.
  - **Quản lý Tồn kho (`/inventory`)**: Triển khai trang [/inventory](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/frontend/src/app/inventory/page.tsx) với các thống kê tổng quan (tổng hàng, hết hàng, sắp hết hàng, an toàn), bộ lọc tìm kiếm và bảng tồn kho thực tế. Tích hợp Dialog điều chỉnh số lượng tồn kho và ngưỡng cảnh báo tối thiểu, tự động tạo transaction cập nhật DB và ghi lịch sử Stock Movement.
  - **Lịch sử Bán hàng (`/sales`)**: Chuyển đổi trang [/sales](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/frontend/src/app/sales/page.tsx) thành Lịch sử bán hàng. Hiển thị chi tiết hóa đơn, kênh bán, tổng tiền, dược sĩ bán và khách hàng. Tích hợp biên lai in ấn K80 và xuất PDF trực tiếp. Cập nhật [sidebar.tsx](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/frontend/src/components/sidebar.tsx) để tách biệt "Bán hàng (POS)" dẫn tới [/pos](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/frontend/src/app/pos/page.tsx) và "Lịch sử bán hàng" dẫn tới [/sales](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/frontend/src/app/sales/page.tsx).
  - **Sửa lỗi đè layout bán lẻ**: Cấu hình ẩn Header và Footer bán lẻ trên các trang nội bộ quản trị, đăng nhập và màn hình bán lẻ `/pos` chuyên dụng để tránh vỡ giao diện.
  - **Biên dịch & Kiểm định**: Cả Backend NestJS và Frontend Next.js biên dịch thành công 100% không có lỗi TypeScript hay cảnh báo import.
- **Sửa lỗi thêm và hiển thị sản phẩm trong giỏ hàng (Retail Cart Bugs):**
  - **Sửa lỗi nút "Chọn mua"**: Sửa lỗi so sánh trạng thái `'AVAILABLE'` (sai lệch so với dữ liệu thực tế trong DB là `'ACTIVE'`) trong [ProductGrid.tsx](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/frontend/src/components/product/ProductGrid.tsx). Chấp nhận cả `'ACTIVE'` và `'AVAILABLE'` giúp khôi phục hoàn toàn chức năng nút **Chọn mua** ngoài trang danh sách sản phẩm.
  - **Sửa lỗi thêm sản phẩm khi không đăng nhập & Bệnh theo mùa**: Bổ sung hàm `setCart` giả lập được gõ kiểu (typed) để chuyển hướng an toàn tất cả các yêu cầu thêm sản phẩm (bấm nút "Chọn mua") từ các danh sách sản phẩm tĩnh (như 16 sản phẩm Tab Bệnh theo mùa ngoài trang chủ) sang lưu trữ trong giỏ hàng thực tế (`useCart`). Đồng thời giải quyết hoàn toàn lỗi build do khai báo thiếu `setCart` và lỗi type check `implicit any`. Giờ đây, người dùng vãng lai chưa đăng nhập vẫn có thể tự do thêm mọi sản phẩm vào giỏ hàng và chỉ bắt buộc đăng nhập khi bấm nút thanh toán tại trang `/cart`.
  - **Sửa lỗi giỏ hàng trống khi chuyển trang**: Thiết lập cơ chế kiểm soát hydration (`mounted` guard) trong [page.tsx](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/frontend/src/app/cart/page.tsx) trang `/cart` để đảm bảo dữ liệu từ `localStorage` được đồng bộ hóa và hiển thị chính xác 100% trên client side.
- **Triển khai Xem chi tiết, In & Xuất PDF Hóa đơn POS:**
  - **Giao diện & Chức năng**: Xây dựng component [InvoiceModal.tsx](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/frontend/src/components/pos/InvoiceModal.tsx) hiển thị chi tiết hóa đơn (thông tin nhà thuốc, mã hóa đơn `POS-xxx`, danh sách mặt hàng, số lượng, đơn giá, thành tiền và tổng thanh toán).
  - **In ấn & Xuất PDF**: Tích hợp CSS `@media print` tối ưu riêng cho khổ in nhiệt K80 (rộng 80mm) giúp tự động ẩn toàn bộ Sidebar, Header và các nút bấm của trình duyệt khi in. Hỗ trợ in nhiệt thực tế và xuất file PDF sắc nét qua công cụ in của hệ thống.
  - **Tích hợp POS**: Gắn modal hóa đơn vào cuối quy trình thanh toán thành công trong [CheckoutPanel.tsx](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/frontend/src/components/pos/CheckoutPanel.tsx) thay thế cho hộp thoại alert đơn giản.
- **Triển khai Quản lý Khách hàng & Nhà cung cấp (CRUD):**
  - **Backend APIs**: Phát triển đầy đủ các controllers, services, DTOs cho cả `customers` và `suppliers` với logic tự sinh mã (CUST-/SUPP-), chặn xóa nếu phát sinh đơn hàng (với Khách hàng) hoặc đặt hàng/nhập kho (với Nhà cung cấp).
  - **Frontend UI & Phân quyền**:
    - Thiết kế trang quản lý khách hàng tại [/customers/page.tsx](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/frontend/src/app/customers/page.tsx) chỉ cho phép `ADMIN` và `STAFF` truy cập.
    - Thiết kế trang quản lý nhà cung cấp tại [/suppliers/page.tsx](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/frontend/src/app/suppliers/page.tsx) chỉ cho phép `ADMIN` và `WAREHOUSE` truy cập.
    - Cập nhật Sidebar để đồng bộ menu và hiển thị theo quyền.
    - Xử lý cache token qua `localStorage` để giải quyết lỗi treo API auth.
    - Tối ưu hóa [Header.tsx](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/frontend/src/components/layout/Header.tsx) để tự động ẩn nút "Đăng nhập" tĩnh và thay bằng Tên người dùng liên kết vào "Trang quản lý" kèm chức năng "Đăng xuất" nhanh trên cả Topbar, Desktop và Mobile. Đồng thời thiết kế lại layout chống co giãn (shrink-0, whitespace-nowrap), tăng padding và đổi nền xanh thương hiệu nhạt để nâng cao thẩm mỹ UI bán lẻ.
  - **Biên dịch**: Compile thành công cả Backend NestJS và Frontend Next.js (`npm run build` hoàn tất 100% không có lỗi TypeScript/Turbopack).
- **Triển khai Quản lý danh mục thuốc (CRUD):**
  - **Backend API**: Thiết lập module `categories` mới với đầy đủ CRUD APIs, tự động kiểm tra lỗi lặp vòng gán cha và tự động tính toán lại bảng Closure Table `category_closures` trong transaction khi cây danh mục thay đổi.
  - **Frontend UI**: Chuyển đổi trang `/medicines` thành dạng tab, tích hợp component `CategoryList.tsx` để thực hiện tìm kiếm, lọc trạng thái và CRUD danh mục bằng dialog trực quan.
  - **Xác thực build**: Compile thành công cả Backend NestJS và Frontend Next.js.
- **Cập nhật Danh mục nổi bật (Featured Categories - PAC-19):**
  - **Đồng bộ Icons**: Cập nhật bộ 12 icons phẳng tối giản (Thần kinh não, Vitamin, Sinh lý, Tim mạch, Miễn dịch, Tiêu hóa, Giải pháp làn da, Chăm sóc da mặt, Hỗ trợ làm đẹp, Hỗ trợ tình dục, Sữa, Dụng cụ theo dõi) sử dụng màu xanh dương `#024ad8` đồng nhất và sắc nét hơn, bám sát theo thiết kế thực tế của hệ thống Nhà thuốc Long Châu gốc.
  - **Xác thực build**: Chạy thành công quy trình compile và kiểm tra mã nguồn (`npm run build`) không có bất kỳ cảnh báo hay lỗi biên dịch nào.


### 2026-06-10
- **Triển khai Trang Chi Tiết Sản Phẩm (PDP - PAC-20):**
  - **Backend API**: Bổ sung endpoint `GET /api/products/:slug` trong [products.controller.ts](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/backend/src/products/products.controller.ts) và [products.service.ts](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/backend/src/products/products.service.ts) để join các thông tin y tế y khoa, hoạt chất, quy cách, dạng bào chế của thuốc qua Prisma.
  - **Frontend PDP Route**: Tạo dynamic route `/san-pham/[slug]` tại [page.tsx](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/frontend/src/app/san-pham/%5Bslug%5D/page.tsx) hỗ trợ Hybrid Fetching (gọi Backend API hoặc tự động fallback query Supabase Client trực tiếp để tăng tính sẵn sàng 100%).
  - **Giao diện & Tương tác**: Xây dựng Client Component [ProductDetailClient.tsx](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/frontend/src/app/san-pham/%5Bslug%5D/ProductDetailClient.tsx) với giao diện cao cấp màu xanh thương hiệu Long Châu `#024ad8`, hỗ trợ chọn ảnh nhỏ, chọn đơn vị tính (vỉ/hộp/viên) tự động đổi giá, tăng giảm số lượng, tích hợp thêm giỏ hàng bằng `useCart` thực tế và các tab thông tin y khoa chi tiết.
  - **Tích hợp liên kết**: Gắn link card sản phẩm NMN PQQ Kenko tại mục "Sản phẩm bán chạy" ở trang chủ dẫn trực tiếp sang trang chi tiết mới.
  - **Xác thực build**: Đã compile thành công 100% không lỗi trên cả NestJS Backend và Next.js Frontend.
- **Khởi chạy & Khắc phục Đăng nhập:**
  - Giải quyết xung đột merge trong file [layout.tsx](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/frontend/src/app/layout.tsx), tích hợp thành công `CartProvider` cùng layout `Header` và `Footer`.
  - Khôi phục công cụ CLI [run.js](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/run.js) từ nhánh `main` để khởi chạy đồng thời Frontend và Backend.
  - Cập nhật tài liệu hướng dẫn tài khoản demo trong [README.md](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/README.md) thành các tài khoản chính xác theo dữ liệu seed thực tế (`admin@pharmaassist.com`, `staff@pharmaassist.com`, `warehouse@pharmaassist.com`).
  - Biên dịch thành công cả Frontend và Backend (0 errors) và khởi động máy chủ tại cổng 3000 (Next.js) và 3001 (NestJS).
  - Khắc phục triệt để lỗi treo trạng thái "Đang xác thực..." bằng cách bỏ qua Supabase `getSession` cho các request đăng nhập trong interceptor của [api.ts](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/frontend/src/lib/api.ts) và bọc các phương thức Supabase (`getSession`, `setSession`) trong [auth-context.tsx](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/frontend/src/context/auth-context.tsx) bằng một wrapper `withTimeout` giới hạn 3 giây để tránh treo UI khi kết nối hoặc bộ nhớ Supabase bị trễ.
  - Loại bỏ 3 mục điều hướng không hoạt động ở thanh menu Header: "Tiêm chủng", "Bệnh & Góc sức khỏe", và "Hệ thống nhà thuốc".
  - Căn giữa các mục menu của thanh điều hướng ở [Header.tsx](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/PharmaAssist/frontend/src/components/layout/Header.tsx) bằng cách thay thế `justify-start` bằng `justify-center` để thiết kế cân đối và cân bằng hơn.
  - **Gắn liên kết cho toàn bộ card sản phẩm mùa vụ (PAC-19/PAC-20):**
    - Đã bọc liên kết `<Link>` cho toàn bộ 16 sản phẩm thuộc section "Gợi ý theo mùa" (gồm Tab 0: Tay chân miệng, Tab 1: Viêm não mô cầu, Tab 2: Cúm, Tab 3: Sốt xuất huyết) dẫn trực tiếp đến trang chi tiết sản phẩm (`/san-pham/[slug]`).
    - Đã tích hợp logic fallback giả lập dữ liệu y khoa trực tiếp cho các sản phẩm chưa có trong Database (Aloclair Gel và Su Bạc Gel) tại trang chi tiết để đảm bảo 100% không bị lỗi 404.
    - Khắc phục lỗi biên dịch TypeScript trong frontend do lỗi typo `"panadolUnit" === "vi"` (thừa dấu ngoặc kép quanh biến `panadolUnit`).
    - Xác minh và biên dịch thành công 100% toàn bộ hệ thống frontend Next.js (`npm run build` hoàn tất với 0 lỗi).

- **[6/6/2026] PAC-19:** 
  - Verified `database/raw` vs `database/state` mapped perfectly to Supabase tables (`product_categories`, `brands`, `products`, `product_prices`).
  - Created `category.ts` utility to build category tree from raw Supabase data.
  - Created `FilterSidebar` utilizing Shadcn UI `Accordion`, `Checkbox`, `Slider`. Fixed Base UI types.
  - Implemented `ProductGrid` with pagination and discount badges.
  - Built `app/san-pham/page.tsx` as a Server Component fetching products directly via Supabase client with complex filters (`minPrice`, `maxPrice`, `category_id` in descendants, `brand_id`).
  - Updated Header's `handleCategoryClick` to navigate to `/san-pham?category=slug`. Code committed.

### 2026-06-07
- **Tách Component Header & Footer (PAC-19):** Đã bóc tách thành công phần `Header` và `Footer` từ trang chủ `app/page.tsx` thành các component độc lập (`src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`). Các danh mục menu (`NAV_MEGA_MENU_DATA`) và logic render mega menu được chuyển vào thư viện constants (`src/lib/constants/menu.tsx`).
- **Global Layout (PAC-19):** Đã cập nhật `src/app/layout.tsx` để tích hợp `Header` và `Footer` vào global layout, giúp tất cả các trang (bao gồm cả trang chi tiết danh mục `/thuoc`, `/thuc-pham-chuc-nang`...) đều có đầy đủ navigation và phần thông tin cuối trang như trang chủ.
- **Dynamic Category Page (PAC-19):** Đã sửa đổi `src/app/[...categorySlug]/page.tsx` để tối ưu câu truy vấn Supabase, fix lỗi order by parameter (tránh sử dụng referenced table trong sort khi không cần thiết) và cải thiện cơ chế log lỗi `Error fetching products`. Trang danh mục động nay hỗ trợ hiển thị toàn bộ 76 danh mục con dựa trên file database schema mà không gặp lỗi Prisma/Supabase.

- **Bệnh theo đối tượng Section (PAC-19):** Mở rộng block "Bệnh theo mùa" thành block "Bệnh" tổng quát, tích hợp thanh tab chuyển đổi giữa "Bệnh theo đối tượng" và "Bệnh theo mùa". Triển khai 4 thẻ đối tượng (Nam giới, Nữ giới, Người già, Trẻ em) với hình ảnh 3D cao cấp (AI generated) kèm danh sách các bệnh lý phổ biến và đường dẫn tìm hiểu thêm. Đồng thời bổ sung dải 4 Trust Indicators (Thuốc chính hãng, Đổi trả 30 ngày, Cam kết 100%, Miễn phí vận chuyển) ở phần dưới cùng của block để tăng độ tin cậy theo đúng chuẩn UI Long Châu. Chuyển đổi toàn bộ hiệu ứng micro-animations mượt mà. Đã commit và push lên nhánh `feature/PAC-19-demographic-disease`.
- **Dọn dẹp layout & Long Chau Footer (PAC-19):** Dọn dẹp bỏ các section trung gian hiển thị dưới khối "Bệnh" để nối trực tiếp xuống Footer. Thiết kế lại toàn bộ Footer bám sát UI Long Châu gốc với cấu trúc dải băng ngang màu xanh tìm kiếm nhà thuốc, 5 cột Footer (Về chúng tôi, Danh mục, Tìm hiểu thêm, Tổng đài, Kết nối mạng xã hội/Tải ứng dụng), QR Code tải app (AI generated) và khối văn bản pháp lý. Commit và push vào nhánh `feature/PAC-19-demographic-disease`.

### 2026-06-04
- **Bệnh theo mùa Section (PAC-19):** Hoàn thành tích hợp block "Bệnh theo mùa" (Seasonal Diseases) ngay dưới phần "Kiểm tra sức khỏe" của trang chủ. Thiết kế thanh Tab chuyển đổi linh hoạt giữa 4 bệnh (Tay chân miệng, Viêm não mô cầu, Cúm, Sốt xuất huyết). Mỗi bệnh đi kèm mô tả y học chính xác, Mascot chú robot thông minh y tế (lưu tại `mascot.png`) và danh sách 4 thẻ sản phẩm liên quan từ CDN database Supabase. Tích hợp bộ chọn đơn vị động (Hộp, Vỉ, Viên, Chai, Ống, Thùng) cập nhật giá động qua React State. Sửa hoàn toàn lỗi biên dịch JSX do thẻ đóng bị dư thừa từ các phiên trước. Sửa triệt để lỗi hiển thị ảnh (403/404) của các sản phẩm Aloclair Gel, Khẩu trang Famapro, và Thuốc Acemuc bằng cách truy vấn lấy link ảnh CDN thực tế (200 OK) thông qua Supabase.
- **Kiểm tra sức khỏe Section Implementation (PAC-19):** Triển khai banner "Kiểm tra sức khỏe" ngay dưới danh mục nổi bật. Sử dụng ảnh đồ họa 2 dược sĩ thân thiện chất lượng cao được AI generate và lưu trực tiếp trong thư mục public (`friendly_pharmacists.png`). Banner gồm 3 thẻ kiểm tra (Trí nhớ & tập trung, Tiền đái tháo đường, Suy giáp) được thiết kế bo góc, có micro-animations zoom nhẹ khi hover và click sẽ kích hoạt toast thông báo.
- **Danh mục nổi bật Section Redesign (PAC-19):** Thiết kế lại khối "Danh mục nổi bật" gồm 12 danh mục chính (Thần kinh não, Vitamin, Sinh lý, Tim mạch, Miễn dịch, Tiêu hóa, Làn da, Da mặt, Làm đẹp, Tình dục, Sữa, Dụng cụ theo dõi) sử dụng 12 biểu tượng SVG vector tùy biến màu xanh dương `#024ad8` và số lượng sản phẩm thật khớp 100% với giao diện Long Châu. Click chọn danh mục sẽ lọc sản phẩm ở danh sách thuốc bên dưới theo cơ chế khớp không phân biệt chữ hoa chữ thường.
- **Sản phẩm bán chạy Section Redesign (PAC-19):** Đã thiết kế và tích hợp phần "Sản phẩm bán chạy" ngay bên dưới phần Flash Sale của trang chủ. Giao diện được thiết kế với khung viền xanh đậm bo góc lớn, có tab đỏ nổi bật skew nghiêng đúng nguyên bản thiết kế Long Châu. Tích hợp 6 sản phẩm bán chạy thật từ database (NMN PQQ Kenko, Kudos Daily Vitamins, Nano Fucoidan, Brauer Baby & Kids DHA, Nước sâm Achimmadang, Aloclair Plus) sử dụng liên kết hình ảnh CDN hoạt động tốt (200 OK). Riêng nước sâm Achimmadang có bộ chọn tab "Hộp" / "Chai" hoạt động động bằng React state để chuyển đổi đơn vị và cập nhật giá tương ứng.
- **Thực phẩm chức năng Redesign & Image Fixes (PAC-19):** Giải quyết triệt để các đường link ảnh đại diện danh mục con bị lỗi 403/404 trong mega menu. Thay thế các link ảnh lỗi bằng các link ảnh CDN thực tế, hợp lệ (200 OK) được lấy từ cơ sở dữ liệu Supabase. Sửa 5 link ảnh sản phẩm nổi bật bị lỗi 404 (La Roche-Posay, Bioderma, CeraVe, Vichy, Cardiocare) thành ảnh thật trong database. Biên dịch thành công Next.js frontend cục bộ.
- **Trang chủ Redesign & Hero Section (PAC-19):** Thiết kế lại bố cục Hero section của trang chủ theo mẫu Long Châu. Tích hợp banner lớn men vi sinh Enterogermina (sử dụng hình ảnh sản phẩm thật và thông tin khuyến mãi), 2 banner phụ bên phải (Hiểu về Ung Thư A-Z và Cập nhật địa chỉ theo nghị quyết mới), cùng thanh 6 nút chức năng Quick Actions ngang tinh tế, hỗ trợ responsive và micro-animations.

### 2026-06-02
- **UI Navigation Redesign & Mega Menu:** Hoàn thành triển khai giao diện Mega Dropdown Menu (cấu trúc cây thư mục Mẹ - Con) cho cả 5 danh mục chính trên Navbar trang chủ Retail. Thiết kế bố cục hai cột, hoạt động hoàn toàn bằng hover. Khi rê chuột vào danh mục Mẹ (cấp 2) ở cột trái, danh mục Con (cấp 3) và 5 sản phẩm bán chạy tương ứng ở cột phải sẽ thay đổi tức thì, tích hợp ảnh thật từ nhà thuốc Long Châu. Khắc phục hoàn toàn lỗi ẩn menu do overflow và named group compile error.
- **Image Mapping Audit:** Kiểm tra toàn diện danh mục ảnh đại diện của các danh mục con trong `renderSubcatThumbnail`. Đã ánh xạ toàn bộ danh mục con (Cận thị, Đục thủy tinh thể, Bao cao su, Gel bôi trơn, Tinh dầu, Thiết bị răng miệng, Thiết bị y tế, các nhóm mỹ phẩm, thực phẩm, v.v.) sang các liên kết hình ảnh CDN duy nhất từ Long Châu nhằm tránh hiện tượng các danh mục con hiển thị cùng một hình ảnh mặc định.


### 2026-05-30
- **Ghi nhận Nhánh Git Jira:** Phát triển thành công script `generate_branches.py` tự động hóa việc ánh xạ và dịch thuật 262 issue trên Jira sang tên nhánh Git tiếng Anh chuẩn slug (kebab-case), lưu tại [branch-on-jira.md](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/Jira/branch-on-jira.md).
- **Nạp dữ liệu Long Châu:** Chạy thành công script `seed_crawled_data.ts` nạp 100% dữ liệu mẫu từ Long Châu lên database Supabase (15 bảng, 5657 thuốc, 7608 sản phẩm, 15982 biến thể giá, 41524 hình ảnh và các thành phần khác), giải quyết triệt để xung đột unique constraints và lỗi khóa ngoại.
- **Chốt Stack Công Nghệ:** Nhóm thống nhất giữ nguyên Next.js + NestJS + Prisma ORM + Supabase do khung boilerplate đã chạy ổn định và database 100 bảng đã nạp dữ liệu hoàn chỉnh.

### Lịch sử tích lũy trước đó (22/05 - 27/05)
- **Database & Migration:** Thiết kế và chạy migration khởi tạo thành công 100 bảng database thương mại lớn theo đặc tả [1_100_bang.md](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/database/schema/1_100_bang.md). Hoàn tất viết tài liệu đặc tả [datasave.md](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/database/datasave.md).
- **Sprint 1 (Auth & RBAC):** Hoàn thành triển khai xác thực JWT Supabase trên NestJS Backend sử dụng dynamic JWKS keys qua `jwks-rsa`. Phân quyền Sidebar và RouteGuard ở Frontend Next.js hoạt động ổn định. Cập nhật 8 Jira tickets (`PAC-43` -> `PAC-50`) sang Done.
- **Data Collector Pipeline:** Phát triển bộ crawler sử dụng Playwright và TypeScript thu thập, chuẩn hóa, validate dữ liệu (bằng Zod) và xuất báo cáo dữ liệu thuốc từ Long Châu.
- **Jira Integration:** Tạo thành công 102 Tasks phần nâng cao (từ `T-79` đến `T-180`) trên Jira Cloud, đồng bộ hóa mã Jira Key vào file [4.1_Task.md](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/Jira/4.1_Task.md).
- **Jira Integration (Batch 4B):** Tự động tạo 145 Tasks (PAC-368 đến PAC-512) và nối link thành công.
- **Đã điều chỉnh Batch 4B:** Đã ghi đè lại chính xác dải PAC-356 đến PAC-500 theo đúng yêu cầu.


## Sprint 5 Pre-Implementation Audit
- Completed verification via Jira, GitHub, and Supabase MCPs.
- Ready to implement Sprint 5: Yes.
- Sprint 5 Final Review = FAIL
- Ready for Sprint 6 = No
- Sprint 5 implementation = Incomplete
- Current next issue = PAC-TASK-227

## 2026-06-22 - Sprint 6 Final Review
- Sprint 6 Final Review = PASS.
- Mandatory Gates: 14/14.
- Code has been fully tested and audited on the `develop` branch.
- Neo4j MCP configuration updated successfully.
- **Next steps**: Project Owner can merge `develop` to `main`. Sprint 7 Audit may start.

## 2026-06-23 - Sprint 7 Final Review
- Sprint 7 Final Review = PASS.
- Mandatory Gates: 16/16.
- Code has been fully tested and audited on the `develop` branch. Defects S7-FR-BUG-001, S7-FR-BUG-002, and PAC-793 resolved.
- All 65 Tasks implemented and merged.
- **Next steps**: Project Owner can merge `develop` to `main`. Sprint 8 Audit may start.

## 2026-06-23 - Sprint 8 Final Review
- Sprint 8 Final Review = PASS.
- Mandatory Gates: 16/16.
- Code has been fully tested and audited on the `develop` branch.
- All 35 Tasks implemented and merged.
- **Next steps**: Project Owner can merge `develop` to `main`. Sprint 9 Audit may start.

## 2026-06-23 - Sprint 9 Audit
- Sprint 9 Audit = PASS.
- Mandatory Gates: 18/18.
- Repository, environment, dependencies, and baseline verified.
- **Next steps**: Ready to implement Sprint 9. First task: PAC-TASK-392.
