# Multi-store Future Scope

> **Status:** FUTURE / PROPOSED / NOT IMPLEMENTED
> **Logical Task:** PAC-TASK-565
> **Jira Key:** PAC-775
> **Story:** US-164
> **Epic:** PAC-EPIC-34
> **Component:** Multi-store / Multi-warehouse
> **Implementation authorization:** No

## 1. Mục đích và Phạm vi (Objective & Scope)
Tài liệu này xác định các yêu cầu tương lai để hỗ trợ Hệ thống chuỗi cửa hàng (Multi-store), cho phép một tổ chức y tế hoặc doanh nghiệp quản lý nhiều chi nhánh nhà thuốc trên cùng một nền tảng phần mềm. Mục tiêu là phân tách dữ liệu bán hàng, kho bãi và nhân sự theo từng cửa hàng độc lập, nhưng vẫn duy trì khả năng báo cáo tổng hợp ở cấp độ công ty (Company/Organization).

## 2. Giới hạn MVP (MVP Boundary)
- **Trong phiên bản MVP hiện tại**, hệ thống hoạt động dựa trên giả định Cửa hàng mặc định (Single Logical Default Store). Toàn bộ đơn hàng (Orders), lô thuốc (Batches), báo cáo (Reports) và nhân viên (Staff) đều thuộc về một cửa hàng duy nhất.
- Không tồn tại khái niệm `Store` hoặc `Branch` trong cơ sở dữ liệu.
- Quản trị viên (Admin) và Nhân viên (Staff) có quyền truy cập toàn cục vào mọi dữ liệu của hệ thống, chỉ bị giới hạn bởi Role (Vai trò nghiệp vụ) chứ không bị giới hạn bởi Location (Vị trí làm việc).

## 3. Các yêu cầu trong tương lai (Future Requirements)
- **Data Isolation (Cô lập dữ liệu):** Mỗi Order, Invoice, Inventory Batch phải được gắn với một `store_id` cụ thể.
- **Location-based RBAC (Phân quyền theo vị trí):** Nhân viên bán hàng tại Cửa hàng A không được phép xem đơn hàng hoặc tồn kho của Cửa hàng B, trừ khi được cấp quyền `View_All_Stores`.
- **Global Master Data:** Danh mục thuốc (Medicine), Khách hàng (Customer Profile) sẽ dùng chung toàn hệ thống, nhưng Lịch sử mua hàng (Purchase History) và Tồn kho (Inventory) sẽ chia theo Store.
- **Consolidated Reporting:** Owner/Admin có khả năng xem báo cáo doanh thu riêng lẻ từng cửa hàng hoặc tổng hợp toàn chuỗi.

## 4. Dependencies (Các hệ thống phụ thuộc)
- **Supabase Row Level Security (RLS) Future:** Phải viết lại toàn bộ policy RLS để kiểm tra thêm điều kiện `store_id` so với quyền hạn của user đang đăng nhập.
- **Stock Transfer (PAC-EPIC-35):** Khi có nhiều cửa hàng, sẽ phát sinh nhu cầu luân chuyển hàng hóa (Stock Transfer) giữa các cửa hàng với nhau.

## 5. Quyết định chưa chốt (Open Decisions)
- Quyết định: Một khách hàng (Customer) khi đăng ký thành viên tại Cửa hàng A có được mặc định hưởng quyền lợi thành viên (Point, Tier) tại Cửa hàng B không, hay mỗi cửa hàng quản lý Loyalty riêng biệt?
  - *Decision Owner:* Project Owner / Marketing Lead.

## 6. Traceability
- **Logical Task:** PAC-TASK-565
- **Story:** US-164
- **Epic:** PAC-EPIC-34
- **Component:** Multi-store / Multi-warehouse
- **Branch:** `docs/PAC-775-task-565-document-multi-store-future-scope`

## 7. Guardrail (Cấm Implementation)
> **NGHIÊM CẤM TRIỂN KHAI:** Tài liệu này hoàn toàn thuộc về phạm vi Mở rộng Thương mại Tương lai. Tuyệt đối không được thêm bảng `Store`, `Branch` hay cột `store_id` vào Prisma Schema, cũng như không thay đổi logic RBAC/Guard trong Sprint MVP hiện tại. Hệ thống phải duy trì giả định Single Store.
