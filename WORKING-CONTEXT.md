# Working Context - PharmaAssist AI Intelligence

Last updated: 2026-05-30

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
- **PAC-20 (Todo):** Develop Product Detail Page (PDP) with responsive layout and rich data from Supabase.
- **PAC-14 (Todo):** Global search with Debounce.
- **PAC-21 (Todo):** Shopping Cart functionality.
- [x] Thiết lập khung dự án Frontend & Backend (NestJS + Next.js + Prisma ORM).
- [x] Thiết kế & migration database schema trên Supabase (Khởi tạo 100 bảng database).
- [x] Triển khai Xác thực & Phân quyền Auth & RBAC (Sprint 1 - PAC-43 đến PAC-50).
- [/] Triển khai Quản lý nhân viên & thuốc (Sprint 2 - PAC-51 đến PAC-67) -> **Đang thực hiện**.
- [ ] Triển khai Quản lý Tồn kho & Nhập kho (Sprint 3 - PAC-68 đến PAC-84, PAC-87 đến PAC-92).
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
- **[6/6/2026] PAC-19:** 
  - Verified `database/raw` vs `database/state` mapped perfectly to Supabase tables (`product_categories`, `brands`, `products`, `product_prices`).
  - Created `category.ts` utility to build category tree from raw Supabase data.
  - Created `FilterSidebar` utilizing Shadcn UI `Accordion`, `Checkbox`, `Slider`. Fixed Base UI types.
  - Implemented `ProductGrid` with pagination and discount badges.
  - Built `app/san-pham/page.tsx` as a Server Component fetching products directly via Supabase client with complex filters (`minPrice`, `maxPrice`, `category_id` in descendants, `brand_id`).
  - Updated Header's `handleCategoryClick` to navigate to `/san-pham?category=slug`. Code committed.

### 2026-06-07
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
