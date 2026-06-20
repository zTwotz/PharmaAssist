# Multi-warehouse Future Scope

> **Status:** FUTURE / PROPOSED / NOT IMPLEMENTED
> **Logical Task:** PAC-TASK-567
> **Jira Key:** PAC-777
> **Story:** US-165
> **Epic:** PAC-EPIC-34
> **Component:** Multi-store / Multi-warehouse
> **Implementation authorization:** No

## 1. Mục đích và Phạm vi (Objective & Scope)
Tài liệu này xác định các yêu cầu tương lai cho việc quản lý Đa kho (Multi-warehouse). Khi quy mô kinh doanh mở rộng, hệ thống cần hỗ trợ việc phân tách vật lý (ví dụ: Kho Trung Tâm, Kho Cửa Hàng, Kho Hàng Hủy) để kiểm soát chặt chẽ việc nhập, xuất và lưu trữ hàng hóa.

## 2. Giới hạn MVP (MVP Boundary)
- **Trong phiên bản MVP hiện tại**, toàn bộ thuốc trong hệ thống được coi là đang nằm trong một không gian vật lý duy nhất (Single Logical Default Warehouse).
- Các thao tác Nhập kho (Stock Import) hay Xuất kho/Bán hàng (Sales/Checkout) đều làm thay đổi số lượng tồn kho của một lô (Batch) duy nhất mà không quan tâm lô đó đang đặt ở kệ nào, tầng nào hay kho nào.
- Hệ thống không có bảng `Warehouse` hay cột `warehouse_id` trong Prisma Schema.

## 3. Các yêu cầu trong tương lai (Future Requirements)
- **Location-based Inventory:** Mỗi Lô hàng (`MedicineBatch`) khi được nhập vào hệ thống phải được chỉ định rõ thuộc về `warehouse_id` nào. Cùng một lô của nhà sản xuất (Batch Number) có thể được lưu trữ ở nhiều kho khác nhau với số lượng khác nhau.
- **Warehouse Roles:**
  - `Main Warehouse` (Kho tổng): Nơi tiếp nhận hàng hóa từ nhà cung cấp.
  - `Store Warehouse` (Kho cửa hàng): Nơi chứa hàng để bán trực tiếp (POS).
  - `Quarantine/Defect Warehouse` (Kho biệt trữ/Kho lỗi): Dùng để chứa hàng cận date hoặc hàng hỏng chờ xử lý.
- **Stock Movement:** Bất kỳ sự di chuyển hàng hóa nào giữa các kho (ví dụ: Từ Kho Tổng xuất về Kho Cửa hàng) đều phải được ghi lại thông qua tính năng Stock Transfer (PAC-EPIC-35).

## 4. Dependencies (Các hệ thống phụ thuộc)
- **Stock Transfer Workflow (PAC-EPIC-35):** Là chức năng lõi bắt buộc phải có khi kích hoạt Multi-warehouse để luân chuyển hàng.
- **Order Routing (FEFO/FIFO Logic):** Khi một đơn hàng (Online Commerce) được đặt, hệ thống cần có logic để quyết định xuất kho từ Warehouse nào (thường là kho gần khách hàng nhất hoặc kho cửa hàng).

## 5. Quyết định chưa chốt (Open Decisions)
- Quyết định: Khi nhân viên bán hàng tại POS thực hiện thanh toán, hệ thống có tự động trừ tồn kho vào "Kho Cửa hàng" của nhân viên đó không, hay cho phép nhân viên chọn kho để trừ (ví dụ trường hợp cửa hàng hết hàng nhưng kho tổng còn)?
  - *Decision Owner:* Project Owner / Warehouse Manager.

## 6. Traceability
- **Logical Task:** PAC-TASK-567
- **Story:** US-165
- **Epic:** PAC-EPIC-34
- **Component:** Multi-store / Multi-warehouse
- **Branch:** `docs/PAC-777-task-567-document-multi-warehouse-future-scope`

## 7. Guardrail (Cấm Implementation)
> **NGHIÊM CẤM TRIỂN KHAI:** Tài liệu này hoàn toàn thuộc về phạm vi Mở rộng Thương mại Tương lai. Tuyệt đối không được thêm bảng `Warehouse`, `Location` hay trường `warehouse_id` vào các luồng Inventory/Batch trong MVP. Logic trừ tồn kho (FEFO) hiện tại phải duy trì giả định Single Warehouse.
