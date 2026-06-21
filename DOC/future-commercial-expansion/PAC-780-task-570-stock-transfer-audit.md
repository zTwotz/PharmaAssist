# Stock Transfer Audit Future Requirement

> **Status:** FUTURE / PROPOSED / NOT IMPLEMENTED
> **Logical Task:** PAC-TASK-570
> **Jira Key:** PAC-780
> **Story:** US-166
> **Epic:** PAC-EPIC-35
> **Component:** Stock Transfer
> **Implementation authorization:** No

## 1. Mục đích và Phạm vi (Objective & Scope)
Tài liệu này xác định các yêu cầu về Kiểm toán (Audit) và Truy vết (Traceability) cho quy trình Luân chuyển hàng hóa (Stock Transfer) trong tương lai. Do việc di chuyển vật lý hàng hóa (thuốc) mang rủi ro mất mát, thất thoát hoặc hỏng hóc, hệ thống yêu cầu một cơ chế ghi nhận chặt chẽ từng bước thay đổi trạng thái của phiếu xuất/nhập kho nội bộ.

## 2. Giới hạn MVP (MVP Boundary)
- **Trong phiên bản MVP hiện tại**, hệ thống sử dụng một Kho mặc định (Default Warehouse), do đó KHÔNG CÓ tính năng chuyển kho.
- Các bản ghi Nhật ký Tồn kho (Inventory Ledger) hiện tại chỉ ghi nhận hành động `IMPORT` (Nhập từ Supplier) và `SALE` (Bán ra), không có loại giao dịch (Transaction Type) `TRANSFER_OUT` hoặc `TRANSFER_IN`.
- Module `AuditLog` MVP không bắt sự kiện liên quan đến Stock Transfer.

## 3. Các yêu cầu trong tương lai (Future Requirements)
Khi triển khai tính năng Stock Transfer, hệ thống Audit phải ghi nhận bắt buộc các thông tin sau:
- **Actors (Người thực hiện):**
  - Người tạo phiếu chuyển (Creator) tại Source Warehouse.
  - Người duyệt phiếu chuyển (Approver) (nếu yêu cầu).
  - Người xác nhận xuất hàng (Dispatcher) tại Source Warehouse.
  - Người xác nhận nhận hàng (Receiver) tại Destination Warehouse.
- **Data Points:**
  - Cửa hàng/Kho gửi (Source Store/Warehouse) và Cửa hàng/Kho nhận (Destination Store/Warehouse).
  - Số Batch (Batch Number), Hạn sử dụng (Expiry Date) và Số lượng luân chuyển (Quantity).
- **Status Transitions (Thay đổi trạng thái):** Bất kỳ lúc nào phiếu chuyển đổi trạng thái (Ví dụ từ `PENDING` sang `IN_TRANSIT`), hệ thống phải ghi lại thời gian (Timestamp) và User thực hiện.
- **Ledger Integration:** Việc xuất hàng khỏi kho A phải tạo ra một bản ghi `- Quantity` trong Ledger của Kho A. Việc nhập hàng vào Kho B phải tạo ra bản ghi `+ Quantity` trong Ledger của Kho B. Tổng số lượng trên toàn hệ thống không thay đổi, trừ phi có Discrepancy (Hao hụt).

## 4. Dependencies (Các hệ thống phụ thuộc)
- **Stock Transfer Workflow (PAC-TASK-569):** Luồng nghiệp vụ gốc.
- **Global Audit Module:** Hệ thống lưu log (Supabase Audit/Postgres Trigger) cần được mở rộng để hỗ trợ bảng `StockTransfer`.

## 5. Quyết định chưa chốt (Open Decisions)
- Quyết định: Nếu có hao hụt trong quá trình luân chuyển (Ví dụ mất hàng dọc đường), bản ghi Audit sẽ quy trách nhiệm (Liability) hao hụt đó cho ai? Cửa hàng gửi, Cửa hàng nhận hay một bên thứ 3 (Logistics)?
  - *Decision Owner:* Project Owner / Warehouse Manager.

## 6. Traceability
- **Logical Task:** PAC-TASK-570
- **Story:** US-166
- **Epic:** PAC-EPIC-35
- **Component:** Stock Transfer
- **Branch:** `docs/PAC-780-task-570-document-stock-transfer-audit-future-requirement`

## 7. Guardrail (Cấm Implementation)
> **NGHIÊM CẤM TRIỂN KHAI:** Tài liệu này hoàn toàn thuộc về phạm vi Mở rộng Thương mại Tương lai. Tuyệt đối không được thêm các bảng Audit riêng cho Transfer hay sửa đổi `InventoryLedger` MVP trong Sprint hiện tại. Việc tuân thủ giới hạn MVP giúp hệ thống giữ được hiệu suất tối đa cho các tính năng cốt lõi.
