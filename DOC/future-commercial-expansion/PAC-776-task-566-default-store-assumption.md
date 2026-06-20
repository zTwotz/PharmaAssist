# Default Store Assumption for MVP

> **Status:** MVP ASSUMPTION / CURRENT BASELINE
> **Logical Task:** PAC-TASK-566
> **Jira Key:** PAC-776
> **Story:** US-164
> **Epic:** PAC-EPIC-34
> **Component:** Multi-store / Multi-warehouse
> **Implementation authorization:** Yes (For documenting current baseline only)

## 1. Mục đích và Phạm vi (Objective & Scope)
Tài liệu này ghi nhận rõ giả định "Một cửa hàng mặc định" (Single Logical Default Store) đang được áp dụng trong phiên bản MVP của PharmaAssist. Việc định nghĩa rõ giả định này giúp đội ngũ phát triển và kiểm thử hiểu rõ giới hạn hệ thống hiện tại, tránh việc thêm các tính năng chọn lựa cửa hàng không cần thiết vào UI hoặc Data Model.

## 2. Giả định MVP (MVP Assumption)
- **Logical Default Store:** Hệ thống mặc định hiểu rằng toàn bộ tổ chức/doanh nghiệp chỉ đang vận hành MỘT cửa hàng duy nhất. Không có ID cửa hàng nào được truyền qua API hay lưu trữ.
- **Inventory & Orders:** Toàn bộ dữ liệu Lô hàng (Batches), Đơn hàng (Orders), và Doanh thu (Invoices/Reports) đều thuộc về một tập dữ liệu tập trung duy nhất. Không có sự phân chia số lượng tồn kho theo chi nhánh.
- **Role-Based Access Control (RBAC):** Quyền của nhân viên được áp dụng toàn cục (Global). Nếu một nhân viên có quyền `inventory.view`, họ sẽ nhìn thấy toàn bộ tồn kho của hệ thống.
- **Giao diện người dùng (UI):** Không có màn hình "Chọn cửa hàng" (Select Store) khi đăng nhập, cũng không có Dropdown chọn cửa hàng trong màn hình Bán hàng (POS) hay Báo cáo.

## 3. Ảnh hưởng đến quy trình Kiểm thử (Testing Implications)
- **Unit/Integration Tests:** Các bài test không cần tạo mock data cho `Store` hoặc kiểm thử kịch bản "Nhân viên cửa hàng A cố gắng xem dữ liệu cửa hàng B".
- **E2E Tests:** Các luồng kiểm thử mặc định bỏ qua bước chọn Location/Store.

## 4. Các yêu cầu trong tương lai (Future Multi-store Expansion)
Trong tương lai (PAC-TASK-565), khi Multi-store được triển khai:
- Dữ liệu cũ của MVP sẽ tự động được gán vào `Store ID = 1` (Main Store) trong quá trình Data Migration.
- Sẽ cần viết script chuyển đổi dữ liệu (Data Migration Script) để đảm bảo không phá vỡ cấu trúc của các Đơn hàng (Orders) và Tồn kho (Batches) hiện có.

## 5. Quyết định đã chốt (Closed Decisions)
- Quyết định: MVP sẽ bỏ qua hoàn toàn kiến trúc Multi-store để tập trung vào luồng POS và Inventory cốt lõi. Việc hỗ trợ nhiều cửa hàng sẽ được xử lý trong các bản cập nhật thương mại sau này.
  - *Decision Owner:* Project Owner / System Architect.

## 6. Traceability
- **Logical Task:** PAC-TASK-566
- **Story:** US-164
- **Epic:** PAC-EPIC-34
- **Component:** Multi-store / Multi-warehouse
- **Branch:** `docs/PAC-776-task-566-document-default-store-assumption-for-mvp`

## 7. Guardrail (Cấm Implementation)
> **NGHIÊM CẤM TRIỂN KHAI:** Tài liệu này khẳng định giả định Single Store cho MVP. Tuyệt đối không được thiết kế bảng `Store` hoặc tạo các màn hình quản lý Cửa hàng trong Sprint hiện tại. Việc thêm tính năng Multi-store nằm ngoài scope MVP và sẽ gây lỗi nghiêm trọng cho các module đang phụ thuộc vào kiến trúc hiện tại.
