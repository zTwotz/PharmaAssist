# Product Variant Catalog Future Scope

> **Status:** FUTURE / PROPOSED / NOT IMPLEMENTED
> **Logical Task:** PAC-TASK-562
> **Jira Key:** PAC-772
> **Story:** US-163
> **Epic:** PAC-EPIC-33
> **Component:** Product Variant Catalog
> **Implementation authorization:** No

## 1. Mục đích và Phạm vi (Objective & Scope)
Tài liệu này định nghĩa cấu trúc tương lai cho Danh mục sản phẩm thương mại (Commercial Product Catalog), bao gồm việc hỗ trợ các Sản phẩm (Products) và Biến thể sản phẩm (Product Variants). Mục đích là để phân tách dữ liệu "Thuốc y tế" (Medicine Core Data) với dữ liệu "Sản phẩm thương mại" dùng để bán trực tuyến và quản lý marketing.

## 2. Giới hạn MVP (MVP Boundary)
- **Trong phiên bản MVP hiện tại**, mọi quy trình bán hàng, kiểm kho, và thanh toán (POS Checkout) đều sử dụng `medicine_id` làm Business Key duy nhất.
- Không tồn tại các khái niệm `Product` hay `Product Variant` (ví dụ: cùng một loại Paracetamol nhưng chia thành dạng hộp 10 vỉ, dạng chai, dạng viên lẻ) dưới dạng các thực thể độc lập trong cơ sở dữ liệu. Chỉ quản lý Unit/Conversion theo Batch.

## 3. Các yêu cầu trong tương lai (Future Requirements)
- **Product Catalog Structure:**
  - `Product`: Đại diện cho một mặt hàng bán lẻ thương mại (ví dụ: "Thực phẩm chức năng Omega 3"). Nó có thể chứa nội dung marketing, mô tả SEO, hình ảnh, đánh giá.
  - `Product Variant`: Đại diện cho các phiên bản cụ thể của một Product (ví dụ: Lọ 30 viên, Lọ 60 viên). Một Variant sẽ liên kết với đúng một `medicine_id` để trừ tồn kho.
- **Tách biệt Core và Commerce:** `Medicine` giữ vai trò làm Master Data y tế (hoạt chất, hàm lượng, cảnh báo), trong khi `Product/Variant` dùng làm Master Data thương mại (giá bán online, khuyến mãi, hình ảnh).
- **Quy trình bán hàng (Sales Flow):** Online Checkout (PAC-EPIC-32) sẽ sử dụng `variant_id` làm khóa thêm vào giỏ hàng. Tại thời điểm Checkout, hệ thống sẽ ánh xạ `variant_id` sang `medicine_id` tương ứng để tương tác với Core Inventory.

## 4. Dependencies (Các hệ thống phụ thuộc)
- **Online Commerce Storefront (PAC-EPIC-32):** Product Catalog là cốt lõi để xây dựng tính năng trưng bày sản phẩm trên website/app.
- **Inventory Service:** Phải xây dựng cơ chế ánh xạ chính xác để khi một Product Variant được bán, hệ thống biết phải trừ đúng bao nhiêu đơn vị của `medicine_id` tương ứng.

## 5. Quyết định chưa chốt (Open Decisions)
- Quyết định: Khi cấu hình Product Variant, làm thế nào để đảm bảo hệ số quy đổi (Conversion Rate) của Variant khớp hoàn toàn với cấu hình Unit trong Inventory Batch?
  - *Decision Owner:* Architect / Product Manager.

## 6. Traceability
- **Logical Task:** PAC-TASK-562
- **Story:** US-163
- **Epic:** PAC-EPIC-33
- **Component:** Product Variant Catalog
- **Branch:** `docs/PAC-772-task-562-document-product-variant-catalog-future-scope`

## 7. Guardrail (Cấm Implementation)
> **NGHIÊM CẤM TRIỂN KHAI:** Tài liệu này hoàn toàn thuộc về phạm vi Mở rộng Thương mại Tương lai. Tuyệt đối không được thay thế `medicine_id` bằng bất kỳ ID nào khác (như Product ID hay Variant ID) trong các luồng Sales POS và Inventory hiện tại của MVP. Không thiết kế thêm bảng Product/Variant vào Prisma Schema trong Sprint MVP.
