# Real Catalog Data Import Future Workflow

> **Status:** FUTURE / PROPOSED / NOT IMPLEMENTED
> **Logical Task:** PAC-TASK-564
> **Jira Key:** PAC-774
> **Story:** US-163
> **Epic:** PAC-EPIC-33
> **Component:** Product Variant Catalog
> **Implementation authorization:** No

## 1. Mục đích và Phạm vi (Objective & Scope)
Tài liệu này xác định quy trình tương lai để nhập khẩu (import) lượng lớn dữ liệu dược phẩm thực tế (Real Catalog Data) từ các cơ sở dữ liệu quốc gia, nhà cung cấp, hoặc tệp CSV/Excel do khách hàng cung cấp. Việc chuẩn hóa quy trình này là cần thiết để bảo vệ tính toàn vẹn của dữ liệu hệ thống (Core Operational Data).

## 2. Giới hạn MVP (MVP Boundary)
- **Trong phiên bản MVP hiện tại**, dữ liệu mẫu (Seed Data) được tạo sẵn một cách có kiểm soát và đã qua bước phân tích cẩn thận (curated).
- Không tồn tại tính năng Import/Export hàng loạt cho `Medicine`, `Category`, hay `ActiveIngredient`. Việc tạo mới dữ liệu phải được thực hiện thủ công qua UI của Quản trị viên (Admin).
- Không sử dụng dữ liệu thô (raw data) không xác định nguồn gốc để đẩy trực tiếp vào database MVP.

## 3. Các yêu cầu quy trình trong tương lai (Future ETL Workflow Requirements)
Quá trình xử lý dữ liệu thô (Extract, Transform, Load - ETL) cần trải qua các bước:
- **Staging Area (Vùng đệm):** Dữ liệu raw tải lên không được lưu thẳng vào các bảng Core (`Medicine`, v.v.) mà phải lưu vào các bảng đệm tạm thời (ví dụ: `ImportStaging`).
- **Data Quality Checks (Kiểm tra chất lượng):** Hệ thống sẽ chạy các validation rules để quét: trùng lặp mã đăng ký (registration_number), thiếu hoạt chất (active_ingredients), sai lệch định dạng.
- **Mapping (Ánh xạ):** Chuyển đổi dữ liệu từ file thô sang chuẩn của PharmaAssist:
  - Tách chuỗi hoạt chất thành danh sách `ActiveIngredient`.
  - Phân loại (Category) tự động hoặc gán thủ công.
  - Phân tách dữ liệu thương mại (`Product/Variant`) với dữ liệu y tế (`Medicine`).
- **Review & Curate (Kiểm duyệt):** Dược sĩ trưởng hoặc Admin phải xem xét (review) dữ liệu Staging. Chỉ khi được "Approve", dữ liệu mới được di chuyển sang Core Data.

## 4. Dependencies (Các hệ thống phụ thuộc)
- **Background Jobs (Queue/Worker):** Xử lý hàng chục ngàn dòng dữ liệu không thể làm đồng bộ qua HTTP Request thông thường. Yêu cầu tích hợp hệ thống Queue (Redis/BullMQ) để chạy dưới nền.
- **Product Variant Catalog (PAC-EPIC-33):** Dữ liệu import thường chứa cả thông tin biến thể (ví dụ: Quy cách đóng gói Hộp 3 vỉ, Lọ 60 viên). Cần có cấu trúc Product Variant để đón nhận lượng thông tin này.

## 5. Quyết định chưa chốt (Open Decisions)
- Quyết định: Khi phát hiện một loại thuốc trong file Import bị trùng lặp số đăng ký (registration_number) với dữ liệu đã có trong hệ thống, hệ thống sẽ thực hiện Ghi đè (Overwrite), Bỏ qua (Skip), hay Báo cáo lỗi (Report Error)?
  - *Decision Owner:* Project Owner / Pharmacy Manager.

## 6. Traceability
- **Logical Task:** PAC-TASK-564
- **Story:** US-163
- **Epic:** PAC-EPIC-33
- **Component:** Product Variant Catalog
- **Branch:** `docs/PAC-774-task-564-document-real-catalog-data-import-future-workflow`

## 7. Guardrail (Cấm Implementation)
> **NGHIÊM CẤM TRIỂN KHAI:** Tài liệu này hoàn toàn thuộc về phạm vi Mở rộng Thương mại Tương lai. Tuyệt đối không được viết tính năng import/upload CSV/Excel thẳng vào bảng `Medicine` hoặc `ActiveIngredient` trong MVP. Việc tạo seed cho MVP phải duy trì tính Curated và Manual.
