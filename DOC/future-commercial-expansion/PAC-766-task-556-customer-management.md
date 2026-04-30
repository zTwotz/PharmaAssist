# Full Customer Management Future Scope

> **Status:** FUTURE / PROPOSED / NOT IMPLEMENTED
> **Logical Task:** PAC-TASK-556
> **Jira Key:** PAC-766
> **Story:** US-161
> **Epic:** PAC-EPIC-31
> **Component:** Customer Management
> **Implementation authorization:** No

## 1. Business Objective và Commercial Value
Mục tiêu cốt lõi của tính năng Quản lý Khách hàng (Customer Management) trong tương lai là cung cấp khả năng cá nhân hóa trải nghiệm khách hàng, theo dõi lịch sử mua hàng, và phát triển các chương trình khách hàng thân thiết (loyalty programs). Giá trị thương mại mang lại bao gồm: tăng tỷ lệ giữ chân khách hàng (retention rate), khả năng gợi ý thuốc/sản phẩm dựa trên lịch sử mua sắm, và quản lý các đợt khuyến mãi hướng đối tượng một cách hiệu quả.

## 2. MVP Boundary (Giới hạn cho MVP hiện tại)
Trong phạm vi MVP hiện tại của PharmaAssist:
- Mọi đơn hàng bán lẻ tại POS đều được coi là của **Walk-in / Anonymous Customer** (Khách hàng vãng lai / vô danh).
- Không yêu cầu cung cấp danh tính, số điện thoại hay thông tin cá nhân.
- Không lưu thông tin khách hàng vào cơ sở dữ liệu.

## 3. Proposed Actors và Permission Boundaries
Các tác nhân đề xuất cho tính năng này bao gồm:
- **Khách hàng (Customer):** Có khả năng tự quản lý hồ sơ, xem lại lịch sử mua sắm (nếu mở rộng lên e-commerce).
- **Nhân viên nhà thuốc (Staff):** Có quyền tra cứu thông tin khách hàng cơ bản, xem lịch sử mua sắm để tư vấn, cấp phát điểm thưởng.
- **Quản lý / Chủ nhà thuốc (Admin):** Có quyền quản lý toàn bộ dữ liệu khách hàng, xóa hồ sơ khách hàng, và thiết lập các cấp bậc/điểm thưởng (Loyalty configuration).

## 4. Future Customer Capabilities
Các năng lực tương lai cần có cho phân hệ Khách hàng:
- **Tạo và Cập nhật Hồ sơ (Profile CRUD):** Lưu trữ tên, số điện thoại, địa chỉ, tuổi, nhóm máu, lịch sử dị ứng thuốc.
- **Quản lý Lịch sử Mua sắm:** Liên kết đơn hàng bán lẻ tại POS và đơn hàng online với tài khoản khách hàng.
- **Quản lý Thẻ Thành viên / Tích điểm:** Tích lũy và quy đổi điểm thưởng.
- **Quản lý Khuyến mãi:** Nhận coupon và các ưu đãi cá nhân hóa.

## 5. Conceptual Entities (Thực thể Khái niệm)
*Lưu ý: Đây là thiết kế khái niệm, KHÔNG áp dụng thành schema thực tế.*
- `Customer`: Profile thông tin cá nhân cơ bản (Name, Phone, Email).
- `CustomerHealthRecord`: Dữ liệu tiền sử bệnh lý, dị ứng (Cần tuân thủ quy định bảo mật y tế HIPAA/PHI).
- `CustomerLoyalty`: Điểm tích lũy, cấp bậc thành viên.
- `CustomerAddress`: Danh sách địa chỉ giao hàng (dùng cho Online Commerce).

## 6. Privacy, PII, Consent, Retention và Deletion
- **Privacy & PII:** Mọi thông tin cá nhân (PII) và thông tin y tế (PHI) phải được mã hóa tại rest và in-transit.
- **Consent:** Khách hàng phải đồng ý bằng văn bản/điện tử khi lưu trữ tiền sử dị ứng và thông tin liên lạc.
- **Retention:** Dữ liệu cá nhân sẽ được lưu trữ trong thời gian khách hàng còn hoạt động, và có chính sách tự hủy sau X năm không giao dịch.
- **Deletion (Right to be Forgotten):** Quy trình xóa mềm (soft delete) hoặc ẩn thông tin PII khi khách hàng yêu cầu xóa tài khoản, trong khi vẫn phải giữ lại log giao dịch tài chính cho mục đích kiểm toán.

## 7. Ownership, Authorization và Auditability
- **Ownership:** Khách hàng sở hữu dữ liệu của họ. Nhà thuốc chỉ là đơn vị ủy thác quản lý (Data Processor / Custodian).
- **Authorization:** Yêu cầu quyền `read:customer` cho Staff và `manage:customer` cho Admin.
- **Auditability:** Mọi thao tác xem, sửa, xóa trên hồ sơ khách hàng phải được ghi nhận vào hệ thống Audit Log (Actor, Action, Timestamp, IP).

## 8. Dependencies
Tính năng Customer Management có tác động và phụ thuộc tới các module khác:
- **Online Commerce:** Phụ thuộc vào Customer Profile để cho phép đăng nhập và tự checkout.
- **Payment & Shipping:** Liên kết trực tiếp CustomerAddress vào đơn giao hàng.
- **Reports:** Cung cấp dữ liệu phân tích tập khách hàng (Demographic, LTV - Lifetime Value).
- **CMS / Review:** Cho phép khách hàng đã mua sản phẩm được viết đánh giá (Verified Review).

## 9. Risks, Assumptions và Limitations
- **Risks:** Lộ lọt dữ liệu y tế nhạy cảm (PHI) có thể dẫn tới hậu quả pháp lý nghiêm trọng.
- **Assumptions:** Giả định rằng hệ thống có đủ năng lực xử lý mã hóa dữ liệu.
- **Limitations:** Việc xác thực danh tính khách hàng tại cửa hàng (POS) tốn thời gian, có thể làm giảm tốc độ thanh toán trong giờ cao điểm.

## 10. Open Decisions và Decision Owners
- **Open Decision 1:** Chọn mô hình định danh khách hàng (Dùng SĐT làm định danh chính hay Email?). *Decision Owner: Project Owner.*
- **Open Decision 2:** Mức độ bảo mật cần thiết cho hồ sơ tiền sử dị ứng (Có cần thiết kế DB riêng cho PHI không?). *Decision Owner: Architect / Security Lead.*

## 11. Traceability
- **Logical Task:** PAC-TASK-556
- **Story:** US-161
- **Epic:** PAC-EPIC-31
- **Component:** Customer Management
- **Branch:** `docs/PAC-766-task-556-document-full-customer-management-future-scope`

## 12. Guardrail (Cấm Implementation)
> **NGHIÊM CẤM TRIỂN KHAI:** Tài liệu này hoàn toàn thuộc về phạm vi Mở rộng Thương mại Tương lai (Future/Commercial Expansion). Bất kỳ AI Agent hay Developer nào thực hiện sửa đổi Prisma schema, backend API, frontend UI, Neo4j runtime hoặc workflow thực tế để tích hợp Customer Management trong Sprint hiện tại (khi chưa được cấp quyền thực thi product code) đều vi phạm nguyên tắc dự án nghiêm trọng.
