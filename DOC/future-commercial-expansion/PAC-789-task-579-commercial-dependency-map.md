# Commercial Expansion Dependency Map

> **Status:** FUTURE / PROPOSED / NOT IMPLEMENTED
> **Logical Task:** PAC-TASK-579
> **Jira Key:** PAC-789
> **Story:** US-170
> **Epic:** PAC-EPIC-39
> **Component:** Architecture & Roadmap
> **Implementation authorization:** No

## 1. Mục đích và Phạm vi (Objective & Scope)
Tài liệu này cung cấp bản đồ phụ thuộc (Dependency Map) cho tất cả các tính năng thuộc giai đoạn Mở rộng Thương mại (Commercial Expansion). Việc thiết lập lộ trình rõ ràng giúp đội ngũ phát triển không triển khai sai thứ tự, tránh tình trạng xây dựng tính năng mà thiếu hệ thống nền tảng.

## 2. Bản đồ Phụ thuộc (Dependency Map)

### 2.1. Nhóm Online Commerce (Thương mại Điện tử)
Tâm điểm của giai đoạn thương mại là `Online Storefront` (Web/App cho khách mua hàng tự phục vụ).
- **Online Commerce** phụ thuộc vào:
  - **Customer Identity (PAC-EPIC-31):** Khách hàng phải có tài khoản đăng nhập (B2C/B2B).
  - **Product Catalog (PAC-EPIC-29):** Thuốc phải có hình ảnh, mô tả chi tiết, bài viết SEO thay vì chỉ có mã vạch và tên nội bộ.
  - **Online Payment:** Tích hợp Cổng thanh toán (VNPay, MoMo, Stripe) để xử lý thanh toán không chạm.
  - **Shipping & Delivery (PAC-TASK-575):** Phải có hệ thống tính phí ship và theo dõi giao hàng.

### 2.2. Nhóm Scale Operations (Vận hành Đa chi nhánh)
Khi chuỗi nhà thuốc mở rộng, hệ thống phải đáp ứng vận hành chuỗi.
- **Multi-Store / Multi-Warehouse (PAC-EPIC-34):**
  - Phụ thuộc vào **Stock Transfer (PAC-EPIC-35)**: Không thể có nhiều kho nếu không có luồng luân chuyển hàng hóa giữa các kho.
  - Yêu cầu thiết kế lại RBAC: Cần phân cấp quyền (Ví dụ: `STORE_MANAGER` chỉ xem được dữ liệu của Store A, `GLOBAL_ADMIN` xem được toàn bộ).

### 2.3. Nhóm Marketing & Growth (Tiếp thị và Tăng trưởng)
- **Promotion & Coupon (PAC-EPIC-37):**
  - Ảnh hưởng trực tiếp đến **Checkout POS** và **Online Checkout**.
  - Phụ thuộc mạnh mẽ vào hệ thống Báo cáo Kế toán (Phải bóc tách Gross Revenue và Net Revenue).
- **Product Review & CMS (PAC-EPIC-39):**
  - Phụ thuộc vào **Online Storefront**: Review chỉ hiển thị trên Web bán hàng.

### 2.4. Nhóm Intelligence (Phân tích nâng cao)
- **Forecasting & Reorder Suggestions (PAC-EPIC-36):**
  - Phụ thuộc vào **Sales History Data**: Phải có dữ liệu bán hàng chuẩn xác ít nhất 3-6 tháng từ MVP.
  - Phụ thuộc vào **Inventory Thresholds**: Cần thiết lập Min/Max stock level cho từng SKU.

## 3. Thứ tự Triển khai Đề xuất (Proposed Implementation Sequence)
Nếu dự án bước vào Phase 2 (Commercial), trình tự an toàn nhất là:
1. Nâng cấp RBAC và Multi-Warehouse (Vận hành chuỗi).
2. Triển khai Customer Identity và Product Catalog (Chuẩn bị dữ liệu).
3. Tích hợp Payment và Shipping (Xây móng e-Commerce).
4. Ra mắt Online Storefront (Khai trương online).
5. Kích hoạt Promotion & Coupon (Thúc đẩy sales).
6. Áp dụng AI Forecasting & Analytics (Tối ưu hóa).

## 4. Traceability
- **Logical Task:** PAC-TASK-579
- **Story:** US-170
- **Epic:** PAC-EPIC-39
- **Component:** Architecture & Roadmap
- **Branch:** `docs/PAC-789-task-579-document-commercial-expansion-dependency-map`

## 5. Guardrail (Cấm Implementation)
> **NGHIÊM CẤM TRIỂN KHAI:** Tài liệu này là Lộ trình Tương lai (Future Roadmap). Tuyệt đối không được kéo các task thuộc Nhóm 2.1, 2.2, 2.3, 2.4 vào Backlog của Sprint hiện tại. MVP chỉ tập trung vào một nhà thuốc duy nhất (Single-store), bán tại quầy (OTC), không khuyến mãi, không giao hàng.
