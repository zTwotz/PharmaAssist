# Customer Purchase History Expansion Future Scope

> **Status:** FUTURE / PROPOSED / NOT IMPLEMENTED
> **Logical Task:** PAC-TASK-558
> **Jira Key:** PAC-768
> **Story:** US-161
> **Epic:** PAC-EPIC-31
> **Component:** Customer Management
> **Implementation authorization:** No

## 1. Mục đích và Phạm vi (Objective & Scope)
Tài liệu này xác định quy mô tương lai của tính năng theo dõi lịch sử mua hàng (Customer Purchase History). Tính năng này liên kết các đơn hàng tại quầy (POS) và đơn hàng trực tuyến (Online Commerce) về cùng một hồ sơ khách hàng định danh, giúp cá nhân hóa dịch vụ, theo dõi điểm thưởng (loyalty) và áp dụng các khuyến mãi dựa trên lịch sử mua sắm.

## 2. Giới hạn MVP (MVP Boundary)
Trong phiên bản MVP hiện tại, lịch sử đơn hàng chỉ được lưu dưới dạng thông tin hóa đơn độc lập, không gắn với bất kỳ hồ sơ khách hàng cá nhân nào. Việc truy xuất lịch sử đơn hàng chỉ phục vụ cho kế toán và quản lý, không phục vụ khách hàng.

## 3. Các yêu cầu trong tương lai (Future Requirements)
- **Liên kết đơn hàng (Order Linkage):** Khi đơn hàng bán lẻ được thanh toán, Staff có thể gắn số điện thoại khách hàng để lưu vào lịch sử. Đối với đơn trực tuyến, lịch sử tự động gắn với tài khoản đang đăng nhập.
- **Truy xuất lịch sử mua sắm:** Khách hàng có thể xem lại toàn bộ các sản phẩm đã mua (thuốc, thực phẩm chức năng, v.v.), ngày mua, số tiền, trạng thái điểm thưởng, và tra cứu hóa đơn điện tử nếu có.
- **Đề xuất mua lại (Reorder Suggestions):** Dựa vào chu kỳ sử dụng thuốc, hệ thống có thể đề xuất khách hàng mua lại thông qua ứng dụng di động hoặc cửa hàng trực tuyến.

## 4. Phân quyền và Sở hữu (Ownership & Permissions)
- **Order Ownership (Quyền sở hữu đơn hàng):** Khách hàng là người sở hữu dữ liệu lịch sử mua hàng của chính mình (có quyền xem, yêu cầu trích xuất).
- **Staff Visibility (Quyền của nhân viên):** Staff chỉ được xem lịch sử mua sắm của khách hàng khi khách hàng đó đến mua trực tiếp tại quầy và cung cấp số điện thoại hoặc mã thành viên để Staff tư vấn.
- **Admin Read-All (Quyền quản trị):** Admin được quyền truy xuất và phân tích toàn bộ lịch sử mua sắm trên hệ thống để phục vụ báo cáo doanh thu và hành vi tiêu dùng. Tuy nhiên, quyền này phải được giới hạn và chỉ cấp cho những nhân sự cấp cao được ủy quyền.

## 5. Quyền riêng tư (Privacy Considerations)
- Lịch sử mua sắm liên quan đến thuốc kê đơn hoặc thuốc đặc trị được xem là **Dữ liệu sức khỏe nhạy cảm (PHI - Protected Health Information)**.
- Phải đảm bảo mã hóa (encryption) đối với lịch sử mua sắm khi lưu trữ.
- Nhân viên (Staff) không được phép tự ý tra cứu lịch sử mua hàng của khách hàng nếu khách hàng không đang có mặt tại cửa hàng hoặc không yêu cầu. Cần có cơ chế log truy cập (Audit log) mỗi khi Staff mở hồ sơ khách hàng.

## 6. Risks, Assumptions và Limitations
- **Rủi ro:** Rò rỉ lịch sử mua thuốc nhạy cảm của khách hàng sẽ gây ảnh hưởng nghiêm trọng đến uy tín và vi phạm luật bảo vệ dữ liệu.
- **Giả định:** Tất cả các giao dịch POS tương lai sẽ cung cấp tùy chọn liên kết khách hàng một cách nhanh chóng (bằng barcode/SĐT) mà không gây ùn tắc.
- **Giới hạn:** Lịch sử mua sắm không được xóa hoàn toàn khi khách hàng yêu cầu "Right to be Forgotten" vì yêu cầu lưu trữ hóa đơn kế toán bắt buộc. Chỉ có thể xóa định danh PII (Ẩn danh hóa).

## 7. Quyết định chưa chốt (Open Decisions)
- Quyết định: Khi thực hiện ẩn danh hóa (anonymization) theo yêu cầu xóa tài khoản, các đơn thuốc có giữ lại thông tin đơn thuốc gốc (prescription) hay không?
  - *Decision Owner:* Security Lead / Legal Advisor.

## 8. Traceability
- **Logical Task:** PAC-TASK-558
- **Story:** US-161
- **Epic:** PAC-EPIC-31
- **Component:** Customer Management
- **Branch:** `docs/PAC-768-task-558-document-customer-purchase-history-expansion`

## 9. Guardrail (Cấm Implementation)
> **NGHIÊM CẤM TRIỂN KHAI:** Tài liệu này hoàn toàn thuộc về phạm vi Mở rộng Thương mại Tương lai. Tuyệt đối không được cập nhật Schema Prisma để thêm quan hệ giữa `Order` và `Customer`, không tạo API endpoint, và không cập nhật giao diện POS để hỗ trợ tính năng này trong Sprint hiện tại.
