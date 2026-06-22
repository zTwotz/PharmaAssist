# Delivery Status Future Workflow

> **Status:** FUTURE / PROPOSED / NOT IMPLEMENTED
> **Logical Task:** PAC-TASK-576
> **Jira Key:** PAC-786
> **Story:** US-169
> **Epic:** PAC-EPIC-38
> **Component:** Shipping & Delivery
> **Implementation authorization:** No

## 1. Mục đích và Phạm vi (Objective & Scope)
Tài liệu này xác định luồng trạng thái giao hàng (Delivery Status Workflow) dự kiến cho hệ thống PharmaAssist. Luồng này sẽ quản lý vòng đời của một đơn hàng kể từ khi được khách hàng đặt online cho đến khi hàng hóa được giao thành công hoặc hoàn trả.

## 2. Giới hạn MVP (MVP Boundary)
- **SalesOrder Status MVP:** Hiện tại, vòng đời đơn hàng (`SalesOrder`) chỉ có 3 trạng thái tĩnh phục vụ bán tại quầy (OTC):
  1. `DRAFT`: Đang tạo đơn, quét mã vạch.
  2. `PAID`: Đã thanh toán và giao thuốc cho khách hàng.
  3. `CANCELLED`: Đơn bị hủy trước khi thanh toán.
- KHÔNG tồn tại trạng thái trung gian phản ánh việc chuẩn bị hàng, chờ vận chuyển, hay đang giao hàng.

## 3. Workflow Vận chuyển tương lai (Future Delivery Workflow)
Khi ra mắt tính năng đặt hàng trực tuyến (Online Commerce), vòng đời đơn hàng sẽ cần thêm một bảng độc lập (Ví dụ: `DeliveryShipment`) hoặc mở rộng trực tiếp Enum của `SalesOrder` để bao gồm:

- **PENDING:** Đơn hàng vừa được đặt, đang chờ hệ thống kiểm tra tồn kho và xác nhận thanh toán (nếu trả trước).
- **PREPARING / PROCESSING:** Nhân viên nhà thuốc đang nhặt thuốc và đóng gói. Trạng thái này có thể in phiếu xuất kho phụ.
- **READY_FOR_PICKUP:** Hàng đã đóng gói xong, chờ Shipper đến lấy hoặc chờ khách hàng đến lấy (BOPIS - Buy Online Pick Up In Store).
- **SHIPPED / IN_TRANSIT:** Gói hàng đã được bàn giao cho đối tác vận chuyển (3PL). Từ giai đoạn này, trách nhiệm bảo quản hàng hóa tạm thời thuộc về bên vận chuyển.
- **DELIVERED:** Khách hàng đã nhận được hàng. Đơn hàng chuyển sang trạng thái chốt doanh thu.
- **RETURNED / FAILED_DELIVERY:** Giao hàng thất bại (khách không nghe máy, sai địa chỉ, khách từ chối nhận). Hàng sẽ được nhập lại kho.
- **CANCELLED:** Hủy đơn hàng ở bất kỳ khâu nào trước khi gửi cho Shipper.

## 4. Ràng buộc Audit & Tracking (Audit & Tracking Requirements)
- Do tính chất nhạy cảm của Dược phẩm (nhiệt độ bảo quản, hạn sử dụng), quá trình `IN_TRANSIT` cần được theo dõi sát sao.
- Mọi chuyển đổi trạng thái (Transition) phải được ghi log vào hệ thống `AuditLog` với `actor_id` tương ứng (Nhân viên xác nhận, System API Webhook từ bên vận chuyển, v.v.).

## 5. Traceability
- **Logical Task:** PAC-TASK-576
- **Story:** US-169
- **Epic:** PAC-EPIC-38
- **Component:** Shipping & Delivery
- **Branch:** `docs/PAC-786-task-576-document-delivery-status-future-workflow`

## 6. Guardrail (Cấm Implementation)
> **NGHIÊM CẤM TRIỂN KHAI:** Tài liệu này hoàn toàn thuộc về phạm vi Mở rộng Thương mại Tương lai. Tuyệt đối không được thêm các trạng thái `PENDING`, `SHIPPED` hay `DELIVERED` vào Enum `OrderStatus` trong file Prisma của Sprint hiện tại. Việc phá vỡ cấu trúc `DRAFT -> PAID -> CANCELLED` đơn giản của MVP sẽ làm sụp đổ toàn bộ bộ test Checkout.
