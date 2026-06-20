# Stock Transfer Future Workflow

> **Status:** FUTURE / PROPOSED / NOT IMPLEMENTED
> **Logical Task:** PAC-TASK-569
> **Jira Key:** PAC-779
> **Story:** US-166
> **Epic:** PAC-EPIC-35
> **Component:** Stock Transfer
> **Implementation authorization:** No

## 1. Mục đích và Phạm vi (Objective & Scope)
Tài liệu này định nghĩa luồng nghiệp vụ luân chuyển hàng hóa (Stock Transfer) trong tương lai. Khi hệ thống hỗ trợ nhiều Kho (Multi-warehouse) hoặc nhiều Cửa hàng (Multi-store), việc điều chuyển hàng giữa các địa điểm để tối ưu hóa tồn kho và đáp ứng nhu cầu kinh doanh là bắt buộc.

## 2. Giới hạn MVP (MVP Boundary)
- **Phiên bản MVP hiện tại** đang hoạt động dưới giả định "Một kho duy nhất" (Single Default Warehouse).
- Không có khái niệm điều chuyển hàng hóa. Mọi thay đổi tồn kho chỉ phát sinh từ Nhập hàng mới từ Supplier (Stock Import) và Xuất bán cho khách hàng (Checkout).
- Bảng `MedicineBatch` không có bất kỳ trạng thái `IN_TRANSIT` hay logic trừ tồn tạm thời nào.

## 3. Các yêu cầu trong tương lai (Future Requirements)
- **Điều kiện tiên quyết:** Chức năng này phụ thuộc trực tiếp vào PAC-EPIC-34 (Multi-store / Multi-warehouse). Chỉ khi hệ thống đã phân biệt được `warehouse_id` thì mới có thể luân chuyển.
- **Workflow các trạng thái dự kiến (Expected Statuses):**
  1. `DRAFT`: Phiếu luân chuyển được tạo.
  2. `PENDING_APPROVAL`: Chờ Quản lý/Chủ chuỗi phê duyệt (nếu số lượng lớn).
  3. `IN_TRANSIT`: Hàng đã xuất khỏi kho đi (Source Warehouse) nhưng chưa nhập vào kho đến (Destination Warehouse). Trong trạng thái này, hệ thống phải treo số lượng luân chuyển để không cho phép bán.
  4. `COMPLETED`: Kho nhận đã xác nhận nhận đủ hàng.
  5. `CANCELLED`: Hủy lệnh chuyển kho.
- **Xử lý hao hụt (Discrepancy Handling):** Cần có luồng cho phép Kho nhận báo cáo thiếu hụt hoặc hư hỏng trong quá trình vận chuyển (Ví dụ: Gửi 100 hộp, nhận 98 hộp nguyên vẹn, 2 hộp móp méo).

## 4. Dependencies (Các hệ thống phụ thuộc)
- **Multi-warehouse (PAC-TASK-567):** Bắt buộc phải triển khai trước.
- **Audit/Ledger (PAC-TASK-570):** Toàn bộ quá trình luân chuyển phải được ghi nhận vào nhật ký kho (Inventory Ledger) để truy vết.

## 5. Quyết định chưa chốt (Open Decisions)
- Quyết định: Trong thời gian hàng `IN_TRANSIT`, phần tồn kho đó sẽ được hệ thống tính là Tài sản của Cửa hàng gửi (Source) hay Cửa hàng nhận (Destination), hay thuộc về một kho ảo "Đang vận chuyển"?
  - *Decision Owner:* Chief Accountant / Project Owner.

## 6. Traceability
- **Logical Task:** PAC-TASK-569
- **Story:** US-166
- **Epic:** PAC-EPIC-35
- **Component:** Stock Transfer
- **Branch:** `docs/PAC-779-task-569-document-stock-transfer-future-workflow`

## 7. Guardrail (Cấm Implementation)
> **NGHIÊM CẤM TRIỂN KHAI:** Tài liệu này hoàn toàn thuộc về phạm vi Mở rộng Thương mại Tương lai. Tuyệt đối không được thiết kế các bảng như `StockTransfer`, `TransferItem` hay UI chuyển kho trong Sprint hiện tại. Điều này sẽ phá vỡ tính đơn giản của cấu trúc Tồn kho MVP.
