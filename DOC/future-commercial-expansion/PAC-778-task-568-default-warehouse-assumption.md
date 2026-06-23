# Default Warehouse Assumption for MVP

> **Status:** MVP ASSUMPTION / CURRENT BASELINE
> **Logical Task:** PAC-TASK-568
> **Jira Key:** PAC-778
> **Story:** US-165
> **Epic:** PAC-EPIC-34
> **Component:** Multi-store / Multi-warehouse
> **Implementation authorization:** Yes (For documenting current baseline only)

## 1. Mục đích và Phạm vi (Objective & Scope)
Tài liệu này xác nhận cấu trúc kho bãi đang được sử dụng trong bản phát hành MVP của hệ thống PharmaAssist. Việc thống nhất giả định "Một kho lưu trữ mặc định" (Single Logical Default Warehouse) giúp cố định phạm vi của các tính năng Quản lý Tồn kho (Inventory Management) và Bán hàng (POS), tránh thiết kế thừa các luồng nghiệp vụ phức tạp.

## 2. Giả định MVP (MVP Assumption)
- **Logical Default Warehouse:** Hệ thống coi toàn bộ thuốc, vật tư y tế hiện có thuộc về MỘT không gian vật lý duy nhất. Không có sự phân biệt giữa Kho tổng, Kho cửa hàng hay Kho biệt trữ.
- **MedicineBatch Logic:** Mỗi lô thuốc (`MedicineBatch`) khi tạo ra sẽ tự động thuộc về hệ thống kho chung này. Không có trường dữ liệu nào (ví dụ `warehouse_id`, `location_id`, `zone`) được sử dụng để phân loại vị trí của lô thuốc.
- **Stock Movement:**
  - Tồn kho chỉ thay đổi thông qua 2 thao tác: Nhập hàng (Stock Import) và Bán hàng (Checkout/POS).
  - Hoàn toàn KHÔNG CÓ tính năng luân chuyển nội bộ (Stock Transfer) giữa các kho.
- **Giao diện người dùng (UI):** Các màn hình tạo phiếu nhập kho, kiểm kê, bán hàng không chứa thành phần chọn Kho (Warehouse Selector).

## 3. Ảnh hưởng đến quy trình Kiểm thử (Testing & Demo Implications)
- **Data Seeding:** Quá trình tạo dữ liệu mẫu (Seed) cho Inventory không cần quan tâm đến phân bổ kho bãi.
- **Demo Scenarios:** Các kịch bản demo cho Stakeholders (Bác sĩ, Dược sĩ quản lý) sẽ giả định hệ thống đang phục vụ một nhà thuốc độc lập có kho liền kề.

## 4. Các yêu cầu trong tương lai (Future Expansion)
Trong tương lai (PAC-TASK-567), khi tính năng Multi-warehouse được kích hoạt:
- Tương tự như Multi-store, dữ liệu lô hàng MVP sẽ được gán tự động vào `Warehouse ID = 1` (Main Warehouse).
- Cần phát triển thêm các báo cáo chênh lệch tồn kho, luân chuyển hàng hóa.

## 5. Quyết định đã chốt (Closed Decisions)
- Quyết định: Loại bỏ hoàn toàn khái niệm Warehouse khỏi Data Model của bản MVP để giảm độ phức tạp khi tính toán FEFO.
  - *Decision Owner:* Project Owner / System Architect.

## 6. Traceability
- **Logical Task:** PAC-TASK-568
- **Story:** US-165
- **Epic:** PAC-EPIC-34
- **Component:** Multi-store / Multi-warehouse
- **Branch:** `docs/PAC-778-task-568-document-default-warehouse-assumption-for-mvp`

## 7. Guardrail (Cấm Implementation)
> **NGHIÊM CẤM TRIỂN KHAI:** Tài liệu này khẳng định giả định Single Warehouse cho MVP. Tuyệt đối không được thêm bất kỳ trường dữ liệu hay UI component nào liên quan đến việc chọn Kho. Mọi nỗ lực thêm tính năng luân chuyển nội bộ trong giai đoạn này đều vi phạm giới hạn MVP.
