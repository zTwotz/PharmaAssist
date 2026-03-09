# Sprint 2: Wave 0 - Existing Code Audit

## Báo Cáo Kiểm Tra Hệ Thống Chức Năng (PAC-TASK-053 → PAC-TASK-101)

### Thông tin chung & Các điểm kiểm tra quan trọng
1. **ActiveIngredient model/module/API/UI:** Model `ActiveIngredient` đã tồn tại trong Prisma, nhưng chưa có module backend API (`src/active-ingredients` missing) và UI trên frontend.
2. **Medicine–ActiveIngredient mapping:** Schema mapping (`MedicineIngredient`) đã có, nhưng backend API và UI mapping form chưa được thực hiện.
3. **Supplier model/module/API/UI:** Model `Supplier` đã có, backend module `suppliers` đã có đủ API (GET, POST, PATCH, DELETE), và UI cơ sở có tại `frontend/src/app/suppliers`.
4. **Permission codes:** Schema có bảng Permission, nhưng cần kiểm tra kĩ thêm trong seed data xem các code cho module Medicine & Supplier đã có đầy đủ chưa.
5. **Database seed/crawled data:** Có thể sử dụng để seed ban đầu, tuy nhiên thành phần hoạt chất cần được chuẩn hóa (normalize) theo PAC-TASK-084/085 trước khi chính thức map.
6. **Sử dụng `medicine_id` hay `product_variant_id`:** Các bảng quản lý kho, giao dịch (Inventory, StockBatch, StockMovement, OrderDetail) đều đang dùng tham chiếu đến `productVariantId`. Model Medicine cũng link đến `productId`.
7. **Bắt buộc `selling_price > 0`:** Tại Database, `ProductVariant.sellingPrice` có kiểu Decimal với default `0.00`, chưa có Check Constraint. Backend API chưa có logic validate rõ ràng.
8. **Medicine deactivate có phải soft deactivate không:** Model có trường `status`, tuy nhiên chưa có API deactivate chính thức cho Medicine.
9. **Chặn thuốc inactive khỏi POS:** Chưa triển khai kiểm tra trạng thái trong luồng bán.
10. **Chặn supplier inactive khỏi Stock Import:** Chưa được thực thi.
11. **Raw scraped ingredient strings:** Hiện chưa có logic mapping chính thức, do vậy raw string chưa bị sử dụng sai mục đích trong codebase hiện tại, nhưng cần chú ý khi viết API.
12. **Model/Event nền cho Graph Sync:** Hoàn toàn chưa có.

---

### Bảng Đánh Giá Trạng Thái Task

| Task | Story | Status | Evidence | Conflict / Notes |
|---|---|---|---|---|
| PAC-TASK-053 | US-13 | Done | `schema.prisma` (Medicine model) | Đã có model |
| PAC-TASK-054 | US-13 | Done | `schema.prisma` (medicineCode @unique) | |
| PAC-TASK-055 | US-13 | Done | `medicines.controller.ts` | Có POST /medicines |
| PAC-TASK-056 | US-13 | Done | `app/medicines/new` | UI đã được tạo cơ bản |
| PAC-TASK-057 | US-13 | Partial | N/A | Tích hợp thành công/lỗi chưa được xác nhận đầy đủ |
| PAC-TASK-058 | US-14 | Missing | `medicines.controller.ts` | Không có API PATCH |
| PAC-TASK-059 | US-14 | Missing | N/A | Chưa có form chỉnh sửa UI |
| PAC-TASK-060 | US-14 | Missing | N/A | Chưa có validation edit |
| PAC-TASK-061 | US-15 | Partial | `medicines.controller.ts` | Có `findAll` nhưng thiếu tham số phân trang |
| PAC-TASK-062 | US-15 | Done | `medicines.controller.ts` | API `search` query by term có tồn tại |
| PAC-TASK-063 | US-15 | Missing | N/A | Chưa có các tham số filter đầy đủ |
| PAC-TASK-064 | US-15 | Done | `app/medicines/page.tsx` | Có bảng danh sách |
| PAC-TASK-065 | US-15 | Partial | N/A | |
| PAC-TASK-066 | US-16 | Missing | `medicines.controller.ts` | Thiếu API thay đổi status deactivate |
| PAC-TASK-067 | US-16 | Missing | N/A | Không có nút UI deactivate |
| PAC-TASK-068 | US-16 | Missing | N/A | Pos chưa kiểm tra status |
| PAC-TASK-069 | US-17 | Partial | `schema.prisma` | DB có default 0.00, không có constraint cứng |
| PAC-TASK-070 | US-17 | Missing | N/A | Form chưa validate giá |
| PAC-TASK-071 | US-17 | Missing | N/A | Không có tests |
| PAC-TASK-072 | US-18 | Done | `schema.prisma` | Model `ActiveIngredient` tồn tại |
| PAC-TASK-073 | US-18 | Missing | `src/active-ingredients` | Module chưa tồn tại |
| PAC-TASK-074 | US-18 | Missing | `src/active-ingredients` | |
| PAC-TASK-075 | US-18 | Missing | `src/active-ingredients` | |
| PAC-TASK-076 | US-18 | Missing | N/A | UI chưa có |
| PAC-TASK-077 | US-18 | Missing | N/A | |
| PAC-TASK-078 | US-19 | Done | `schema.prisma` | Model `MedicineIngredient` tồn tại |
| PAC-TASK-079 | US-19 | Missing | N/A | Backend API chưa hỗ trợ thêm/sửa mapping |
| PAC-TASK-080 | US-19 | Missing | N/A | UI form không có mục ingredient mapping |
| PAC-TASK-081 | US-19 | Missing | N/A | UI chi tiết không hiển thị mapping |
| PAC-TASK-082 | US-20 | Missing | N/A | |
| PAC-TASK-083 | US-20 | Missing | N/A | |
| PAC-TASK-084 | US-21 | Missing | N/A | Chưa có chuẩn hóa dữ liệu string |
| PAC-TASK-085 | US-21 | Missing | N/A | |
| PAC-TASK-086 | US-21 | Missing | N/A | Tài liệu checklist review chất lượng chưa có |
| PAC-TASK-087 | US-22 | Missing | N/A | Chưa tích hợp Event Emitter cho Sync |
| PAC-TASK-088 | US-22 | Missing | N/A | |
| PAC-TASK-089 | US-22 | Missing | N/A | |
| PAC-TASK-090 | US-23 | Done | `schema.prisma` | Bảng `Supplier` tồn tại |
| PAC-TASK-091 | US-23 | Done | `suppliers.controller.ts` | API POST tồn tại |
| PAC-TASK-092 | US-23 | Partial | `app/suppliers` | Tồn tại thư mục, cần check UI sâu |
| PAC-TASK-093 | US-23 | Partial | N/A | |
| PAC-TASK-094 | US-24 | Done | `suppliers.controller.ts` | API GET `findAll` tồn tại |
| PAC-TASK-095 | US-24 | Done | `suppliers.controller.ts` | API PATCH `:id` tồn tại |
| PAC-TASK-096 | US-24 | Partial | `app/suppliers` | |
| PAC-TASK-097 | US-25 | Conflict | `suppliers.controller.ts` | API là Delete, cho cả WAREHOUSE truy cập, không phải soft deactivate và Admin-only |
| PAC-TASK-098 | US-25 | Missing | N/A | Chưa có confirm UI |
| PAC-TASK-099 | US-25 | Missing | N/A | Stock import chưa kiểm tra supplier status |
| PAC-TASK-100 | US-26 | Missing | N/A | |
| PAC-TASK-101 | US-26 | Missing | N/A | Chưa có dropdown lọc trên Stock Import UI |

---

## Đề Xuất Thứ Tự Triển Khai (Deployment Dependency Order)

Để đảm bảo an toàn và tính toàn vẹn của hệ thống, Sprint 2 nên được triển khai theo chuỗi dependency sau:

1. **Giai đoạn 1: Foundation Của Active Ingredient**
   - Hoàn tất API và Module Backend cho `ActiveIngredient` (PAC-TASK-073, 074, 075).
   - Xây dựng UI quản lý ActiveIngredient (PAC-TASK-076).
   - *Lý do:* Medicine phụ thuộc vào ActiveIngredient có sẵn để mapping, nên thành phần này phải lên trước.

2. **Giai đoạn 2: Củng Cố & Mở Rộng Medicine**
   - Sửa lỗi/bổ sung PATCH API và list filter, pagination cho Medicine (PAC-TASK-058, 061, 063).
   - Thêm cơ chế deactivate soft-delete cho Medicine và validation giá (PAC-TASK-066, 069, 070).
   - *Lý do:* Các API cốt lõi này cần hoàn thiện trước khi đắp thêm giao diện.

3. **Giai đoạn 3: Mapping & Normalization**
   - Triển khai API cho phép liên kết `Medicine` với `ActiveIngredient` (PAC-TASK-079, 082).
   - Xây dựng UI Mapping và ngăn chặn việc gán raw string lỗi (PAC-TASK-080, 084, 085).

4. **Giai đoạn 4: Supplier Foundation & Refactoring**
   - Refactor lại API Supplier: Chuyển đổi từ DELETE cứng sang Soft Deactivate, siết chặt quyền (`Admin-only` theo yêu cầu PAC-TASK-097).
   - Ràng buộc Supplier Active với màn hình Stock Import (PAC-TASK-099, 100, 101).

5. **Giai đoạn 5: Tích Hợp Ràng Buộc & Events**
   - Tạo các event Trigger (Graph Sync Events) mỗi khi có sự thay đổi ở Medicine/Ingredients (PAC-TASK-087, 088, 089).
   - Triển khai việc test toàn diện và validation ở tầng POS.
