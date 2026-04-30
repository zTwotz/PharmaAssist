# Customer Profile CRUD Future Scope

> **Status:** FUTURE / PROPOSED / NOT IMPLEMENTED
> **Logical Task:** PAC-TASK-557
> **Jira Key:** PAC-767
> **Story:** US-161
> **Epic:** PAC-EPIC-31
> **Component:** Customer Management
> **Implementation authorization:** No

## 1. Mục đích và Phạm vi
Tài liệu này xác định các yêu cầu và thiết kế ý niệm (conceptual) cho tính năng quản lý hồ sơ khách hàng (Customer Profile CRUD) sẽ được triển khai trong tương lai. Mọi tính năng này hiện **không nằm trong MVP** và không được phép implement code.

## 2. Các hành động CRUD ý niệm (Conceptual CRUD)

### Create (Tạo mới)
- **Tác nhân:** Staff, Admin, hoặc Khách hàng (khi tự đăng ký qua Online Commerce).
- **Quy trình:** Yêu cầu xác thực Consent (đồng ý chia sẻ dữ liệu) trước khi tạo hồ sơ có chứa thông tin sức khỏe (PHI) và liên hệ (PII).

### Read (Đọc/Tra cứu)
- **Tác nhân:**
  - Staff: Chỉ được tìm kiếm khách hàng bằng số điện thoại để hỗ trợ tích điểm, tư vấn.
  - Admin: Được quyền xem toàn bộ dữ liệu.
  - Khách hàng: Chỉ được xem dữ liệu của chính mình (Self-service).

### Update (Cập nhật)
- Khách hàng tự cập nhật thông tin qua ứng dụng/web cá nhân.
- Staff hỗ trợ cập nhật khi khách hàng yêu cầu tại quầy (yêu cầu xác thực OTP/thẻ cứng nếu có).

### Delete (Xóa)
- Tuân thủ quy định Right to be Forgotten (Xóa mềm - Soft Delete).
- **Lưu ý:** Việc xóa hồ sơ khách hàng chỉ ẩn thông tin định danh (PII/PHI), nhưng vẫn giữ nguyên metadata giao dịch tài chính để phục vụ kế toán và kiểm toán.

## 3. Các trường dữ liệu đề xuất (Proposed Fields)
- `id`: Định danh duy nhất (UUID).
- `full_name`: Tên đầy đủ (PII).
- `phone_number`: Số điện thoại (PII) - Dùng làm định danh thay thế để tìm kiếm tại quầy.
- `email`: Địa chỉ email (PII).
- `date_of_birth`: Ngày sinh (PII).
- `medical_history`: Tiền sử bệnh lý, dị ứng thuốc (PHI).
- `consent_status`: Trạng thái đồng ý điều khoản bảo mật (Boolean + Timestamp).
- `loyalty_points`: Điểm thành viên.

## 4. Bảo mật, Quyền riêng tư và Audit (Privacy, Security & Audit)
- **Privacy & Security:** Các trường chứa PII (`phone_number`, `email`, `date_of_birth`) và PHI (`medical_history`) bắt buộc phải được mã hóa (encrypted) cả khi lưu trữ (at rest) và truyền tải (in transit).
- **Retention (Lưu giữ):** Dữ liệu được lưu giữ đến khi khách hàng yêu cầu xóa hoặc sau một thời gian dài (ví dụ: 5 năm) không có hoạt động. Quyết định về thời gian lưu giữ cụ thể cần sự tham gia của Data/Security Owner.
- **Auditability:** Bất kỳ thao tác Update, Delete, hay Read dữ liệu PHI/PII nào từ Staff hoặc Admin đều phải được ghi log đầy đủ (Actor, Action, Resource, Timestamp) vào Audit System.

## 5. Traceability
- **Logical Task:** PAC-TASK-557
- **Story:** US-161
- **Epic:** PAC-EPIC-31
- **Component:** Customer Management
- **Branch:** `docs/PAC-767-task-557-document-customer-profile-crud-future-scope`

## 6. Guardrail (Cấm Implementation)
> **NGHIÊM CẤM TRIỂN KHAI:** Tài liệu này hoàn toàn thuộc về phạm vi Mở rộng Thương mại Tương lai. Không được phép thay đổi Prisma Schema, tạo Backend API, hoặc viết Frontend UI liên quan đến Customer Profile trong Sprint hiện tại.
