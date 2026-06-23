# Product Images and Documents Commercial Scope

> **Status:** FUTURE / PROPOSED / NOT IMPLEMENTED
> **Logical Task:** PAC-TASK-563
> **Jira Key:** PAC-773
> **Story:** US-163
> **Epic:** PAC-EPIC-33
> **Component:** Product Variant Catalog
> **Implementation authorization:** No

## 1. Mục đích và Phạm vi (Objective & Scope)
Tài liệu này xác định phạm vi mở rộng trong tương lai cho việc lưu trữ và quản lý Hình ảnh sản phẩm (Product Images) và Tài liệu kèm theo (Product Documents) như hướng dẫn sử dụng, giấy chứng nhận y tế. Các dữ liệu đa phương tiện (media) này là thành phần thiết yếu để xây dựng giao diện hiển thị cho danh mục sản phẩm trực tuyến (Online Product Catalog).

## 2. Giới hạn MVP (MVP Boundary)
- **Trong phiên bản MVP hiện tại**, hệ thống Dược phẩm (Medicine) hoàn toàn quản lý bằng các trường văn bản (text fields) như `name`, `registration_number`, `active_ingredients`.
- Không có yêu cầu tải lên, lưu trữ hoặc hiển thị hình ảnh sản phẩm tại màn hình POS hay màn hình Quản lý thuốc.
- Mọi dữ liệu media đều bị lược bỏ để tập trung vào logic lõi: Quản lý Kho (Inventory) và Thanh toán (Checkout).

## 3. Các yêu cầu trong tương lai (Future Requirements)
- **Product Images (Hình ảnh sản phẩm):**
  - Hỗ trợ tải lên nhiều hình ảnh cho mỗi `Product` hoặc `Product Variant` (ví dụ: ảnh mặt trước, ảnh thành phần, ảnh hộp/lọ).
  - Cần hệ thống quản lý thứ tự hiển thị (is_primary, sort_order).
  - Yêu cầu tự động resize/optimize hình ảnh (thumbnail, medium, large) để tăng tốc độ tải trang web.
- **Product Documents (Tài liệu sản phẩm):**
  - Lưu trữ file PDF cho Hướng dẫn sử dụng gốc (Package Insert) hoặc Giấy chứng nhận xuất xứ (C/O), Giấy phép lưu hành.
  - Phục vụ việc cho phép khách hàng tải xuống hoặc Dược sĩ tra cứu nhanh tài liệu chính thống.

## 4. Kiến trúc Lưu trữ (Storage Architecture Future)
Việc lưu trữ các file media không nên nằm trực tiếp trong database PostgreSQL.
- **Supabase Storage:** Sẽ được cấu hình thành một Bucket riêng biệt (ví dụ: `product-media-bucket`).
- **CDN Integration:** Cần sử dụng CDN (Cloudflare hoặc tích hợp sẵn của Supabase) để phân phối hình ảnh tĩnh nhanh chóng đến End-User.
- Các bảng dữ liệu trung gian (Future Data Tables) sẽ chỉ lưu trữ URL:
  - `ProductImage`: `image_id`, `product_id`, `image_url`, `is_primary`.
  - `ProductDocument`: `doc_id`, `product_id`, `doc_url`, `doc_type`.

## 5. Quyết định chưa chốt (Open Decisions)
- Quyết định: Kích thước tối đa (Max File Size) và các định dạng hỗ trợ (WebP vs JPEG/PNG) cho việc tải ảnh sản phẩm?
  - *Decision Owner:* Frontend Lead / Architect.

## 6. Traceability
- **Logical Task:** PAC-TASK-563
- **Story:** US-163
- **Epic:** PAC-EPIC-33
- **Component:** Product Variant Catalog
- **Branch:** `docs/PAC-773-task-563-document-product-images-and-documents-commercial-sc`

## 7. Guardrail (Cấm Implementation)
> **NGHIÊM CẤM TRIỂN KHAI:** Tài liệu này hoàn toàn thuộc về phạm vi Mở rộng Thương mại Tương lai. Tuyệt đối không được cấu hình Supabase Storage Bucket, không thêm trường `image_url` vào bảng `Medicine`, và không tạo các API Endpoint liên quan đến upload file trong Sprint MVP hiện tại.
