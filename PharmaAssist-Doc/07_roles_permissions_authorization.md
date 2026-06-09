# Document 07 — User Roles, Permissions & Authorization Specification

# Tài liệu 07 — Đặc tả vai trò người dùng, quyền hạn và phân quyền truy cập

---

## Metadata

| Mục               | Nội dung                                                                                                                                                                           |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID       | DOC-07                                                                                                                                                                             |
| File name         | `07_roles_permissions_authorization.md`                                                                                                                                            |
| Document Name     | User Roles, Permissions & Authorization Specification                                                                                                                              |
| Tên tiếng Việt    | Đặc tả vai trò người dùng, quyền hạn và phân quyền truy cập                                                                                                                        |
| Project           | PharmaAssist AI Intelligence                                                                                                                                                       |
| Version           | 1.0 Draft                                                                                                                                                                          |
| Status            | Draft                                                                                                                                                                              |
| Created Date      | 08/06/2026                                                                                                                                                                         |
| Last Updated      | 08/06/2026                                                                                                                                                                         |
| Owner             | System Analyst / Backend Lead                                                                                                                                                      |
| Reviewer          | Project Leader, Backend Developer, Frontend Developer, Tester, Security Reviewer nếu có                                                                                            |
| Baseline Source   | Document 01 — Project Overview & Current Baseline, Document 04 — Decision Log & Scope Control, Document 06 — Software Requirements Specification, baseline authorization decisions |
| Related Documents | Document 06, Document 08, Document 12, Document 13, Document 14, Document 15, Document 20                                                                                          |
| Language Rule     | Nội dung chính viết bằng tiếng Việt; tên file/tên tài liệu có thể giữ tiếng Anh                                                                                                    |
| Terminology Rule  | Giữ nguyên tên công nghệ, module, entity, API, table, enum, permission key và thuật ngữ kỹ thuật cần thiết bằng tiếng Anh                                                          |

---

## 1. Mục đích tài liệu

Tài liệu **User Roles, Permissions & Authorization Specification** đặc tả mô hình người dùng, multi-role RBAC, permissions, ownership rules, data scope rules và authorization behavior cho toàn bộ hệ thống **PharmaAssist AI Intelligence**.

Mục đích chính của tài liệu:

1. Xác định nguyên tắc authorization chính thức của hệ thống.
2. Làm rõ quan hệ giữa **Supabase Auth** và user profile nội bộ.
3. Đặc tả mô hình user profile, role, permission, user-role mapping và role-permission mapping.
4. Xác định các role chính thức trong MVP: **Admin**, **Staff**, **Warehouse**.
5. Định nghĩa permission naming convention.
6. Xây dựng permission matrix theo module.
7. Đặc tả ownership-based access rules.
8. Đặc tả data scope rules cho các nghiệp vụ quan trọng.
9. Đặc tả UI visibility rules.
10. Đặc tả API authorization rules.
11. Đưa ra kỳ vọng với backend guard/interceptor.
12. Đặc tả access denied/error behavior.
13. Phân loại authorization scope theo MVP, Should-have, Future và Out of Scope.
14. Đưa ra test scenarios cho authorization.
15. Tạo traceability từ authorization specification sang SRS, API, UI và Testing.

Tài liệu này không phải Supabase setup guide, không viết full Prisma schema, không viết full API contract, không viết UI layout chi tiết và không viết business process ngoài phạm vi authorization.

---

## 2. Authorization Principles

### 2.1. Authentication và authorization là hai lớp khác nhau

Hệ thống phải phân biệt rõ:

| Lớp            | Vai trò                                            |
| -------------- | -------------------------------------------------- |
| Authentication | Xác minh user là ai                                |
| Authorization  | Xác định user được phép làm gì và trên dữ liệu nào |

Trong baseline chính thức:

1. **Supabase Auth** phụ trách authentication.
2. Backend phụ trách authorization.
3. PostgreSQL lưu user profile, roles, permissions, user-role mappings và role-permission mappings.
4. Frontend chỉ hỗ trợ hiển thị UI theo quyền, không quyết định quyền cuối cùng.
5. Backend là nguồn kiểm tra quyền chính thức.

### 2.2. Backend là nơi enforce quyền chính thức

Backend phải enforce:

1. User đã authenticated hay chưa.
2. User profile có tồn tại và active hay không.
3. User có role phù hợp hay không.
4. User có permission cần thiết hay không.
5. User có thuộc ownership scope của dữ liệu hay không.
6. User có được phép thao tác trên trạng thái hiện tại của entity hay không.
7. User có được phép truy cập module hoặc action đang gọi hay không.

Frontend không được xem là lớp bảo mật chính.

### 2.3. Permission-based authorization là chính thức

Hệ thống không được chỉ hard-code logic kiểu:

```text
if role == Admin then allow
```

Thay vào đó, hệ thống phải kiểm tra permission. Role chỉ là nhóm quyền.

Ví dụ:

| Sai hướng                                  | Đúng hướng                                                                                                |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Nếu role = Staff thì cho checkout          | Nếu user có permission `checkout.execute` và order thuộc ownership scope thì cho checkout                 |
| Nếu role = Warehouse thì cho sửa inventory | Nếu user có permission `inventory_adjustment.create` hoặc `inventory_adjustment.confirm` thì cho thao tác |
| Nếu role = Admin thì cho xem alert         | Nếu user có permission `interaction_alert.read_all` thì cho xem                                           |

### 2.4. Multi-role RBAC là baseline

Một user có thể có nhiều role thông qua user-role mapping.

Ví dụ:

1. Một user có thể vừa là Admin vừa là Staff nếu được gán nhiều role.
2. Quyền hiệu lực của user là hợp các permissions từ các role active.
3. Nếu một permission được cấp bởi bất kỳ role active nào, user có permission đó.
4. Nếu một role bị deactivate hoặc bị gỡ khỏi user, permissions từ role đó không còn hiệu lực.
5. Nếu user inactive, không được truy cập chức năng nghiệp vụ dù vẫn có role.

### 2.5. Ownership-based access là bắt buộc với Staff

Staff không được xem toàn bộ dữ liệu bán hàng.

Staff chỉ được thao tác trong ownership scope, ví dụ:

1. Draft Order do Staff tạo.
2. Order do Staff xử lý.
3. Payment/Invoice thuộc Order do Staff tạo hoặc xử lý.
4. InteractionAlert trong Order thuộc ownership scope.
5. Checkout chỉ với Order thuộc ownership scope.

Admin có thể xem toàn bộ.

Warehouse không truy cập sales/payment/invoice/interaction alert trong MVP.

### 2.6. Data scope không chỉ là role

Data scope có thể phụ thuộc vào:

1. Role.
2. Permission.
3. Ownership.
4. Entity status.
5. Module.
6. Business rule.
7. Scope classification MVP/Should-have/Future.
8. Query filter được backend enforce.

Ví dụ:

* Staff có thể có permission `order.read_own`, nhưng không có `order.read_all`.
* Admin có `order.read_all`.
* Warehouse không có `order.read_own` hoặc `order.read_all` trong MVP.

### 2.7. Least privilege

Mỗi role chỉ được cấp quyền tối thiểu cần thiết để thực hiện nhiệm vụ.

Nguyên tắc:

1. Staff chỉ có quyền bán hàng và xử lý alert trong POS.
2. Warehouse chỉ có quyền kho và supplier ở mức được chốt.
3. Admin có quyền quản trị rộng.
4. Không cấp quyền Graph Explorer cho Warehouse trong MVP.
5. Không cấp raw Cypher cho bất kỳ user vận hành nào trong MVP.
6. Không cấp quyền AI Audit cho Staff hoặc Warehouse trong MVP.

### 2.8. Audit-friendly authorization

Các nghiệp vụ quan trọng phải lưu actor để truy vết:

1. User tạo Order.
2. User xử lý Checkout.
3. User acknowledge HIGH alert.
4. User nhập consultation note.
5. User confirm Stock Import.
6. User confirm Inventory Adjustment.
7. User deactivate Supplier.
8. User thay đổi DrugInteraction Rule.
9. User gọi AI Copilot.
10. User thay đổi System Settings.

---

## 3. Supabase Auth Relationship

### 3.1. Vai trò của Supabase Auth

Supabase Auth là authentication provider chính thức.

Supabase Auth quản lý:

1. Email.
2. Password.
3. Password update.
4. Session.
5. Access token.
6. Refresh token nếu dùng.
7. Supabase user ID.
8. Supabase Admin operations nếu dùng để tạo user.

Supabase Auth không phải nơi quản lý business permission chi tiết của PharmaAssist.

### 3.2. Vai trò của PostgreSQL nghiệp vụ

PostgreSQL nghiệp vụ lưu authorization data:

1. User profile nội bộ.
2. Roles.
3. Permissions.
4. User-role mappings.
5. Role-permission mappings.
6. User active/inactive status.
7. must_change_password application-level flag nếu cần.
8. Audit actor references.

PostgreSQL không lưu:

1. Password.
2. Password hash.
3. Custom JWT secret cho authentication chính.
4. Raw authentication credential.

### 3.3. Mapping giữa Supabase user và user profile

Mỗi Supabase user hợp lệ phải có một user profile nội bộ tương ứng.

User profile cần liên kết với Supabase user ID.

Luồng logic:

1. User đăng nhập qua Supabase Auth.
2. Frontend nhận session/access token.
3. Frontend gọi backend kèm access token.
4. Backend verify token với Supabase.
5. Backend lấy Supabase user ID từ token.
6. Backend tìm user profile nội bộ.
7. Backend kiểm tra user profile active.
8. Backend load roles và permissions.
9. Backend xử lý request theo permission và ownership.

### 3.4. First-login password-change flow

Baseline cho phép có selected demo user với `must_change_password = true` để demo first-login flow.

Quy tắc:

1. Demo accounts chính có thể `must_change_password = false` để trình bày nhanh.
2. Một new-staff demo account có thể `must_change_password = true`.
3. Nếu user có `must_change_password = true`, user phải đổi mật khẩu trước khi vào các chức năng chính.
4. Password update phải dùng Supabase Auth mechanism.
5. Sau khi đổi mật khẩu thành công, backend cập nhật cờ nội bộ thành false.
6. Backend phải chặn các nghiệp vụ chính nếu user chưa hoàn tất required password change.

### 3.5. Supabase Auth không thay thế RBAC

Supabase Auth chỉ xác định user là ai.

Supabase Auth không thay thế:

1. Role model.
2. Permission model.
3. User-role mapping.
4. Role-permission mapping.
5. Ownership checking.
6. Business authorization.
7. Module-level access control.

---

## 4. User Profile Model Overview

Document này không viết full Prisma schema, nhưng xác định user profile model ở mức authorization.

### 4.1. User profile purpose

User profile dùng để:

1. Liên kết Supabase Auth user với dữ liệu nghiệp vụ.
2. Lưu thông tin hiển thị cơ bản.
3. Lưu trạng thái nội bộ.
4. Lưu thông tin phục vụ authorization.
5. Làm actor trong audit logs.
6. Gắn với created_by, updated_by, processed_by, acknowledged_by.

### 4.2. User profile fields overview

User profile nên có các nhóm thông tin sau:

| Nhóm           | Ví dụ field            | Mục đích                          |
| -------------- | ---------------------- | --------------------------------- |
| Identity link  | supabase_user_id       | Liên kết Supabase Auth            |
| Display        | full_name, email       | Hiển thị user trong UI/audit      |
| Status         | is_active              | Chặn user nội bộ inactive         |
| First login    | must_change_password   | Flow đổi mật khẩu lần đầu nếu cần |
| Audit metadata | created_at, updated_at | Truy vết                          |
| Optional       | phone, avatar_url      | Should-have/Future nếu cần        |

### 4.3. User active status

Quy tắc:

1. User inactive không được truy cập nghiệp vụ chính.
2. User inactive có thể vẫn tồn tại để giữ audit history.
3. Không nên xóa cứng user đã có lịch sử nghiệp vụ.
4. Nếu user bị deactivate, roles có thể giữ lại nhưng không tạo quyền hiệu lực.
5. Backend phải kiểm tra user status sau khi verify token.

### 4.4. User identity in audit

Các entity/action sau cần lưu actor khi phù hợp:

1. Stock Import created_by.
2. Stock Import confirmed_by.
3. Inventory Adjustment created_by.
4. Inventory Adjustment confirmed_by.
5. Order created_by.
6. Order processed_by.
7. Payment processed_by.
8. InteractionAlert acknowledged_by.
9. InteractionAlert consultation_note_by hoặc tương đương.
10. AI Audit user_id.
11. DrugInteraction Rule created_by/updated_by.
12. Supplier created_by/updated_by/deactivated_by.
13. System Settings updated_by.

---

## 5. Role Model

### 5.1. Role definition

Role là nhóm quyền nghiệp vụ được gán cho user.

Role không nên chứa business logic trực tiếp. Role chỉ gom permissions.

Ví dụ:

1. Admin role có nhiều permissions quản trị.
2. Staff role có permissions bán hàng.
3. Warehouse role có permissions kho.

### 5.2. Official MVP roles

MVP chỉ có ba role chính thức:

1. Admin.
2. Staff.
3. Warehouse.

Không tự thêm role mới nếu chưa có quyết định scope change.

### 5.3. Role status

Role nên có trạng thái active/inactive.

Quy tắc:

1. Active role mới cấp permissions.
2. Inactive role không cấp permission hiệu lực.
3. Không nên xóa cứng role nếu đã có lịch sử mapping hoặc audit.
4. Role built-in như Admin/Staff/Warehouse nên được seed.

### 5.4. Role mutability

Trong MVP:

1. Các built-in roles có thể được seed.
2. Admin có thể quản lý user-role assignment nếu UI có trong MVP.
3. Full role/permission management UI chi tiết có thể giới hạn theo scope triển khai.
4. Permission set chính thức phải bám baseline và không tự ý thêm quyền ngoài scope.

### 5.5. Role không thay thế permission

Không dùng role trực tiếp để quyết định mọi action. Role cần được resolve thành permissions.

Ví dụ:

* Admin được checkout vì có `checkout.execute_all` hoặc permission tương đương, không chỉ vì tên role là Admin.
* Staff được checkout vì có `checkout.execute_own`.
* Warehouse không checkout vì không có permission checkout.

---

## 6. Permission Model

### 6.1. Permission definition

Permission là quyền thực hiện một action cụ thể trên một resource hoặc module.

Permission nên có cấu trúc ổn định, có thể trace sang:

1. SRS.
2. API.
3. UI.
4. Testing.
5. Audit.

### 6.2. Permission granularity

Permission nên đủ chi tiết để kiểm soát:

1. Create.
2. Read own.
3. Read all.
4. Update.
5. Deactivate.
6. Cancel.
7. Confirm.
8. Execute.
9. Manage.
10. View audit.
11. Use AI.
12. Use Graph.
13. Manage settings.

Không nên quá nhỏ đến mức khó quản lý trong MVP, nhưng phải đủ để đáp ứng các baseline authorization decisions.

### 6.3. Permission attributes overview

Một permission nên có:

| Field                 | Mục đích                |
| --------------------- | ----------------------- |
| key                   | Permission key duy nhất |
| name                  | Tên hiển thị            |
| description           | Mô tả quyền             |
| module                | Module liên quan        |
| action                | Action chính            |
| scope                 | own/all/system/module   |
| is_active             | Trạng thái              |
| created_at/updated_at | Audit metadata          |

### 6.4. Permission evaluation

Khi xử lý request, backend cần:

1. Verify user authenticated.
2. Load active user profile.
3. Load active roles của user.
4. Load active permissions của các roles.
5. Kiểm tra permission cần thiết.
6. Kiểm tra ownership/data scope nếu permission chỉ là own.
7. Kiểm tra entity status nếu action phụ thuộc trạng thái.
8. Cho phép hoặc từ chối.

### 6.5. Permission không được lấy từ frontend

Frontend có thể dùng permissions để render menu và button, nhưng:

1. Frontend không tự quyết định cho phép action.
2. Frontend không được gửi role/permission để backend tin.
3. Backend phải tự resolve permission từ database.
4. API phải hoạt động an toàn ngay cả khi frontend bị bypass.

---

## 7. Multi-role RBAC

### 7.1. Multi-role principle

Một user có thể có nhiều role.

Effective permissions = hợp permissions của tất cả active roles được gán cho active user.

Ví dụ:

| User   | Roles             | Effective behavior                                                             |
| ------ | ----------------- | ------------------------------------------------------------------------------ |
| User A | Staff             | Chỉ sales own scope                                                            |
| User B | Warehouse         | Chỉ kho/supplier scope                                                         |
| User C | Admin             | Quản trị toàn hệ thống                                                         |
| User D | Staff + Warehouse | Có cả quyền bán hàng own scope và quyền kho, nếu được Project Leader/Admin cấp |
| User E | Admin + Staff     | Có quyền Admin, bao gồm sales all scope                                        |

### 7.2. Conflict handling

Nếu user có nhiều role:

1. Permissions được cộng dồn.
2. Deny không được model phức tạp trong MVP trừ khi có quyết định riêng.
3. Nếu một role inactive, bỏ qua permissions từ role đó.
4. Nếu user inactive, deny tất cả protected operations.
5. Nếu permission inactive, không có hiệu lực.
6. Nếu permission yêu cầu ownership, vẫn phải kiểm tra ownership.

### 7.3. Multi-role risk

Multi-role có thể làm user có quyền rộng hơn dự kiến.

Cách giảm rủi ro:

1. Admin phải cẩn thận khi gán nhiều role.
2. UI nên hiển thị roles hiện tại của user.
3. Sensitive permissions cần test rõ.
4. Audit user-role changes nếu triển khai.
5. Release demo accounts nên đơn giản: một account Admin, một Staff, một Warehouse, một optional new-staff.

---

## 8. User-role Mapping

### 8.1. Purpose

User-role mapping xác định user nào có role nào.

### 8.2. Required behavior

Hệ thống phải hỗ trợ:

1. Gán role cho user.
2. Gỡ role khỏi user.
3. Kiểm tra active mappings.
4. Không tạo duplicate active mapping cùng user-role.
5. Giữ lịch sử hoặc metadata khi cần audit.

### 8.3. MVP mapping

MVP demo accounts tối thiểu:

| Demo user             | Role      |
| --------------------- | --------- |
| Admin demo            | Admin     |
| Staff demo            | Staff     |
| Warehouse demo        | Warehouse |
| New-staff demo nếu có | Staff     |

### 8.4. User-role assignment permissions

| Action                     | Admin | Staff | Warehouse |
| -------------------------- | ----: | ----: | --------: |
| View user-role assignments |   Yes |    No |        No |
| Assign role                |   Yes |    No |        No |
| Remove role                |   Yes |    No |        No |
| Assign Admin role          |   Yes |    No |        No |
| Assign Staff role          |   Yes |    No |        No |
| Assign Warehouse role      |   Yes |    No |        No |

### 8.5. User-role mapping audit

Nên audit:

1. Role assigned.
2. Role removed.
3. User deactivated.
4. User reactivated.
5. User first-login status updated.

---

## 9. Role-permission Mapping

### 9.1. Purpose

Role-permission mapping xác định role nào có permission nào.

### 9.2. Required behavior

Hệ thống phải:

1. Seed permissions chính thức.
2. Seed role-permission mappings cho Admin, Staff, Warehouse.
3. Load effective permissions từ role-permission mappings.
4. Không hard-code toàn bộ permissions chỉ trong frontend.
5. Cho phép backend kiểm tra permission key ổn định.

### 9.3. Role-permission assignment in MVP

Trong MVP, role-permission mappings có thể được seed cố định theo baseline.

Admin UI để chỉnh sửa permission matrix có thể là Should-have/Future nếu chưa nằm trong MVP implementation plan.

### 9.4. Role-permission audit

Nếu có UI/API quản lý role-permission:

1. Mọi thay đổi phải audit.
2. Không được tự gỡ quyền Admin quan trọng làm mất quyền quản trị nếu chưa có safety mechanism.
3. Không được cấp quyền Out of Scope như raw Cypher cho Staff.
4. Không được cấp Warehouse quyền InteractionAlert trong MVP.

---

## 10. Official Roles

## 10.1. Admin

### 10.1.1. Role purpose

Admin là người quản trị hệ thống và có phạm vi quyền rộng nhất trong MVP.

Admin đại diện cho:

1. Chủ nhà thuốc.
2. Quản lý hệ thống.
3. Người kiểm soát quy tắc tương tác.
4. Người xem báo cáo và audit.
5. Người có thể thực hiện nghiệp vụ bán hàng khi cần.

### 10.1.2. Admin capabilities

Admin có thể:

1. Quản lý user profile.
2. Gán/gỡ role cho user.
3. Xem roles và permissions.
4. Quản lý Medicine.
5. Quản lý ActiveIngredient.
6. Mapping Medicine–ActiveIngredient.
7. Quản lý Supplier, bao gồm deactivate.
8. Xem Inventory Summary.
9. Xem MedicineBatch.
10. Tạo/confirm Inventory Adjustment.
11. Xem Stock Import.
12. Quản lý DrugInteraction Rule.
13. Xem InteractionAlert History.
14. Tạo Draft Order.
15. Thực hiện các thao tác sales như Staff.
16. Checkout bất kỳ Draft Order hợp lệ.
17. Xem toàn bộ Orders.
18. Xem Payment.
19. Xem Invoice.
20. Xem Revenue Report.
21. Xem Top Medicines Report.
22. Xem Inventory Report.
23. Cấu hình near-expiry threshold.
24. Xem AI Audit.
25. Dùng AI Copilot.
26. Dùng Graph Explorer/Graph-RAG trong phạm vi MVP.
27. Xem Graph Sync evidence/log nếu có.
28. Chạy hoặc kiểm tra demo reset nếu ở local và được cấp quyền kỹ thuật.

### 10.1.3. Admin restrictions

Admin vẫn phải tuân thủ business rules:

1. Không được checkout order không phải DRAFT.
2. Không được bán batch hết hạn.
3. Không được bỏ qua FEFO.
4. Không được checkout khi HIGH alert chưa acknowledgement/note.
5. Không được tạo selling_price <= 0.
6. Không được tạo Medicine–Medicine interaction rule làm official rule.
7. Không được dùng AI để chẩn đoán/kê đơn/liều dùng.
8. Không được chạy demo reset ở môi trường không local.
9. Không được bypass data integrity rules.

---

## 10.2. Staff

### 10.2.1. Role purpose

Staff là nhân viên bán thuốc tại quầy, sử dụng POS để tạo Draft Order, xử lý cảnh báo và checkout đơn hàng hợp lệ.

### 10.2.2. Staff capabilities

Staff có thể:

1. Đăng nhập.
2. Xem profile của mình.
3. Xem Medicine active phục vụ bán hàng.
4. Xem sellable stock trong POS.
5. Tạo Draft Order.
6. Thêm Medicine vào Draft Order.
7. Sửa quantity trong Draft Order.
8. Xóa item khỏi Draft Order.
9. Cancel Draft Order trong ownership scope.
10. Xem Order do mình tạo hoặc xử lý.
11. Xem InteractionAlert trong Order thuộc ownership scope.
12. Acknowledge HIGH alert trong Order thuộc scope.
13. Nhập consultation note cho HIGH alert trong Order thuộc scope.
14. Dùng AI Copilot trong POS flow.
15. Checkout Draft Order thuộc ownership scope nếu validation passed.
16. Xem Payment/Invoice của Order thuộc ownership scope.
17. Dùng Graph-RAG/Graph Explorer read-only nếu được cấp permission trong MVP scope.

### 10.2.3. Staff restrictions

Staff không được:

1. Quản lý user.
2. Gán/gỡ role.
3. Quản lý permissions.
4. Quản lý Supplier.
5. Deactivate Supplier.
6. Tạo/confirm Stock Import.
7. Tạo/confirm Inventory Adjustment.
8. Quản lý DrugInteraction Rule.
9. Xem InteractionAlert History toàn hệ thống.
10. Xem toàn bộ Orders.
11. Xem Payment/Invoice ngoài ownership scope.
12. Xem AI Audit Log.
13. Quản lý Graph Sync.
14. Submit raw Cypher.
15. Chạy demo reset.
16. Thay đổi System Settings.
17. Xem operational low-stock/near-expiry dashboard tổng quát.
18. Bypass HIGH alert handling.

---

## 10.3. Warehouse

### 10.3.1. Role purpose

Warehouse là nhân viên kho, phụ trách supplier, nhập kho, tồn kho theo batch và điều chỉnh tồn kho.

### 10.3.2. Warehouse capabilities

Warehouse có thể:

1. Đăng nhập.
2. Xem profile của mình.
3. Xem Medicine.
4. Xem Supplier.
5. Tạo Supplier.
6. Cập nhật Supplier.
7. Xem Inventory Summary.
8. Xem MedicineBatch.
9. Xem low-stock và near-expiry operational information.
10. Tạo Stock Import.
11. Cập nhật Draft Stock Import.
12. Cancel Draft Stock Import.
13. Confirm Stock Import.
14. Tạo Inventory Adjustment.
15. Confirm Inventory Adjustment.
16. Xem Inventory Report.
17. Xem audit evidence liên quan đến thao tác kho nếu UI/API hỗ trợ.

### 10.3.3. Warehouse restrictions

Warehouse không được:

1. Deactivate Supplier.
2. Quản lý user.
3. Quản lý role/permission.
4. Tạo Draft Order.
5. Thêm item vào Order.
6. Checkout.
7. Xem Payment.
8. Xem Invoice.
9. Xem InteractionAlert.
10. Acknowledge HIGH alert.
11. Nhập consultation note.
12. Quản lý DrugInteraction Rule.
13. Dùng AI Copilot trong POS flow.
14. Xem AI Audit Log.
15. Dùng Graph Explorer trong MVP.
16. Dùng Graph-RAG trong MVP.
17. Submit raw Cypher.
18. Thay đổi System Settings nếu không được cấp quyền Admin.

---

## 11. Permission Naming Convention

### 11.1. Format

Permission key nên dùng format:

```text
[module].[action]_[scope]
```

Hoặc nếu action không cần scope:

```text
[module].[action]
```

Ví dụ:

```text
order.read_own
order.read_all
order.create
order.cancel_own
checkout.execute_own
checkout.execute_all
supplier.deactivate
interaction_alert.read_all
ai_copilot.use
graph_rag.use_readonly
```

### 11.2. Naming components

| Component | Ý nghĩa              | Ví dụ                                 |
| --------- | -------------------- | ------------------------------------- |
| module    | Module hoặc resource | order, medicine, supplier             |
| action    | Hành động            | read, create, update, cancel, confirm |
| scope     | Phạm vi dữ liệu      | own, all, readonly, manage            |

### 11.3. Common actions

| Action      | Ý nghĩa                           |
| ----------- | --------------------------------- |
| read        | Xem dữ liệu                       |
| read_own    | Xem dữ liệu thuộc ownership scope |
| read_all    | Xem toàn bộ dữ liệu               |
| create      | Tạo mới                           |
| update      | Cập nhật                          |
| deactivate  | Vô hiệu hóa                       |
| cancel      | Hủy                               |
| cancel_own  | Hủy dữ liệu thuộc ownership       |
| confirm     | Xác nhận                          |
| execute     | Thực thi nghiệp vụ                |
| manage      | Quản lý đầy đủ                    |
| acknowledge | Xác nhận cảnh báo                 |
| note        | Ghi note                          |
| use         | Sử dụng chức năng                 |
| export      | Xuất dữ liệu nếu có               |
| view_audit  | Xem audit                         |

### 11.4. Scope suffix

| Scope    | Ý nghĩa                           |
| -------- | --------------------------------- |
| own      | Chỉ dữ liệu thuộc ownership scope |
| all      | Toàn bộ dữ liệu                   |
| readonly | Chỉ đọc                           |
| manage   | Quản lý đầy đủ                    |
| system   | Cấu hình hệ thống                 |
| local    | Chỉ local environment/tooling     |

### 11.5. Naming rules

1. Permission key phải viết lowercase.
2. Dùng underscore cho nhiều từ trong action/scope.
3. Không dùng khoảng trắng.
4. Không dùng tên tiếng Việt trong permission key.
5. Permission key phải ổn định để trace sang API/UI/testing.
6. Không tạo permission mới nếu chưa thuộc baseline hoặc chưa có scope approval.
7. Không cấp permission Out of Scope cho role MVP.

---

## 12. Permission Matrix theo Module

Ký hiệu:

| Ký hiệu | Ý nghĩa                             |
| ------- | ----------------------------------- |
| Yes     | Role có quyền trong MVP             |
| Own     | Role có quyền trong ownership scope |
| Read    | Chỉ đọc                             |
| No      | Không có quyền trong MVP            |
| Should  | Should-have, không chặn MVP         |
| Future  | Future scope                        |

---

## 12.1. Auth/User Permissions

| Permission Key             | Mô tả                                           |  Admin |  Staff | Warehouse | Scope              |
| -------------------------- | ----------------------------------------------- | -----: | -----: | --------: | ------------------ |
| auth.login                 | Đăng nhập qua Supabase Auth                     |    Yes |    Yes |       Yes | MVP                |
| auth.logout                | Đăng xuất                                       |    Yes |    Yes |       Yes | MVP                |
| profile.read_self          | Xem profile của chính mình                      |    Yes |    Yes |       Yes | MVP                |
| profile.update_self_basic  | Cập nhật thông tin cơ bản của mình nếu cho phép | Should | Should |    Should | Should-have        |
| user.read_all              | Xem danh sách user                              |    Yes |     No |        No | MVP                |
| user.create                | Tạo user nội bộ/Supabase staff account          |    Yes |     No |        No | MVP                |
| user.update                | Cập nhật user profile nội bộ                    |    Yes |     No |        No | MVP                |
| user.deactivate            | Deactivate user                                 |    Yes |     No |        No | MVP                |
| user.assign_role           | Gán role cho user                               |    Yes |     No |        No | MVP                |
| user.remove_role           | Gỡ role khỏi user                               |    Yes |     No |        No | MVP                |
| user.force_password_change | Đặt must_change_password nếu cần                |    Yes |     No |        No | MVP                |
| user.complete_first_login  | Hoàn tất first-login của chính mình             |    Yes |    Yes |       Yes | MVP                |
| role.read                  | Xem roles                                       |    Yes |     No |        No | MVP                |
| permission.read            | Xem permissions                                 |    Yes |     No |        No | MVP                |
| role_permission.manage     | Quản lý role-permission matrix                  | Should |     No |        No | Should-have/Future |

---

## 12.2. Medicine Permissions

| Permission Key                 | Mô tả                                   |  Admin | Staff | Warehouse | Scope              |
| ------------------------------ | --------------------------------------- | -----: | ----: | --------: | ------------------ |
| medicine.read                  | Xem Medicine                            |    Yes |   Yes |       Yes | MVP                |
| medicine.search                | Tìm kiếm Medicine                       |    Yes |   Yes |       Yes | MVP                |
| medicine.create                | Tạo Medicine                            |    Yes |    No |        No | MVP                |
| medicine.update                | Cập nhật Medicine                       |    Yes |    No |        No | MVP                |
| medicine.deactivate            | Deactivate Medicine                     |    Yes |    No |        No | MVP                |
| medicine.read_sales            | Xem Medicine phục vụ bán hàng trong POS |    Yes |   Yes |        No | MVP                |
| medicine.read_inventory        | Xem Medicine phục vụ kho                |    Yes |    No |       Yes | MVP                |
| medicine.manage_price          | Cập nhật selling price                  |    Yes |    No |        No | MVP                |
| medicine.manage_status         | Cập nhật active/inactive                |    Yes |    No |        No | MVP                |
| medicine.import_reference_data | Import dữ liệu tham khảo nếu có tooling | Should |    No |        No | Should-have/Future |

---

## 12.3. ActiveIngredient Permissions

| Permission Key                     | Mô tả                                     | Admin | Staff | Warehouse | Scope |
| ---------------------------------- | ----------------------------------------- | ----: | ----: | --------: | ----- |
| active_ingredient.read             | Xem ActiveIngredient                      |   Yes |  Read |      Read | MVP   |
| active_ingredient.search           | Tìm kiếm ActiveIngredient                 |   Yes |  Read |      Read | MVP   |
| active_ingredient.create           | Tạo ActiveIngredient                      |   Yes |    No |        No | MVP   |
| active_ingredient.update           | Cập nhật ActiveIngredient                 |   Yes |    No |        No | MVP   |
| active_ingredient.deactivate       | Deactivate ActiveIngredient               |   Yes |    No |        No | MVP   |
| medicine_ingredient_mapping.read   | Xem mapping Medicine–ActiveIngredient     |   Yes |  Read |      Read | MVP   |
| medicine_ingredient_mapping.manage | Quản lý mapping Medicine–ActiveIngredient |   Yes |    No |        No | MVP   |

---

## 12.4. Supplier Permissions

| Permission Key           | Mô tả                      | Admin | Staff | Warehouse | Scope        |
| ------------------------ | -------------------------- | ----: | ----: | --------: | ------------ |
| supplier.read            | Xem Supplier               |   Yes |    No |       Yes | MVP          |
| supplier.create          | Tạo Supplier               |   Yes |    No |       Yes | MVP          |
| supplier.update          | Cập nhật Supplier          |   Yes |    No |       Yes | MVP          |
| supplier.deactivate      | Deactivate Supplier        |   Yes |    No |        No | MVP          |
| supplier.read_for_import | Chọn Supplier khi nhập kho |   Yes |    No |       Yes | MVP          |
| supplier.delete_hard     | Xóa cứng Supplier          |    No |    No |        No | Out of Scope |

---

## 12.5. Inventory Permissions

| Permission Key                    | Mô tả                                 |  Admin | Staff | Warehouse | Scope        |
| --------------------------------- | ------------------------------------- | -----: | ----: | --------: | ------------ |
| inventory.read_summary            | Xem Inventory Summary                 |    Yes |    No |       Yes | MVP          |
| inventory.read_sales_availability | Xem sellable stock trong POS          |    Yes |   Yes |        No | MVP          |
| inventory.read_batch              | Xem Batch Detail                      |    Yes |    No |       Yes | MVP          |
| inventory.read_low_stock          | Xem low-stock operational dashboard   |    Yes |    No |       Yes | MVP          |
| inventory.read_near_expiry        | Xem near-expiry operational dashboard |    Yes |    No |       Yes | MVP          |
| inventory.read_expired            | Xem expired batch report/detail       |    Yes |    No |       Yes | MVP          |
| inventory.direct_update_quantity  | Sửa trực tiếp số lượng tồn            |     No |    No |        No | Out of Scope |
| inventory.export                  | Export inventory nếu có               | Should |    No |    Should | Should-have  |

---

## 12.6. Stock Import Permissions

| Permission Key                 | Mô tả                          | Admin | Staff | Warehouse | Scope        |
| ------------------------------ | ------------------------------ | ----: | ----: | --------: | ------------ |
| stock_import.read              | Xem Stock Import               |   Yes |    No |       Yes | MVP          |
| stock_import.create            | Tạo Stock Import               |   Yes |    No |       Yes | MVP          |
| stock_import.update_draft      | Cập nhật DRAFT Stock Import    |   Yes |    No |       Yes | MVP          |
| stock_import.cancel_draft      | Cancel DRAFT Stock Import      |   Yes |    No |       Yes | MVP          |
| stock_import.confirm           | Confirm Stock Import           |   Yes |    No |       Yes | MVP          |
| stock_import.read_detail       | Xem Stock Import Detail        |   Yes |    No |       Yes | MVP          |
| stock_import.delete_confirmed  | Xóa Stock Import đã confirm    |    No |    No |        No | Out of Scope |
| stock_import.confirm_cancelled | Confirm Stock Import đã cancel |    No |    No |        No | Out of Scope |

---

## 12.7. Inventory Adjustment Permissions

| Permission Key                            | Mô tả                                                 |  Admin | Staff | Warehouse | Scope        |
| ----------------------------------------- | ----------------------------------------------------- | -----: | ----: | --------: | ------------ |
| inventory_adjustment.read                 | Xem Inventory Adjustment                              |    Yes |    No |       Yes | MVP          |
| inventory_adjustment.create               | Tạo Inventory Adjustment                              |    Yes |    No |       Yes | MVP          |
| inventory_adjustment.update_draft         | Cập nhật Draft Adjustment nếu hỗ trợ trạng thái draft |    Yes |    No |       Yes | MVP          |
| inventory_adjustment.confirm              | Confirm Inventory Adjustment                          |    Yes |    No |       Yes | MVP          |
| inventory_adjustment.read_detail          | Xem Adjustment Detail                                 |    Yes |    No |       Yes | MVP          |
| inventory_adjustment.delete_confirmed     | Xóa adjustment đã confirm                             |     No |    No |        No | Out of Scope |
| inventory_adjustment.direct_quantity_edit | Sửa trực tiếp quantity qua adjustment bypass          |     No |    No |        No | Out of Scope |
| inventory_adjustment.approve              | Approval nhiều cấp                                    | Future |    No |    Future | Future       |

---

## 12.8. POS Permissions

| Permission Key         | Mô tả                                    |  Admin | Staff | Warehouse | Scope        |
| ---------------------- | ---------------------------------------- | -----: | ----: | --------: | ------------ |
| order.create           | Tạo Draft Order                          |    Yes |   Yes |        No | MVP          |
| order.read_own         | Xem Order thuộc ownership scope          |    Yes |   Yes |        No | MVP          |
| order.read_all         | Xem toàn bộ Orders                       |    Yes |    No |        No | MVP          |
| order.update_own_draft | Cập nhật Draft Order của mình            |    Yes |   Yes |        No | MVP          |
| order.update_any_draft | Cập nhật mọi Draft Order                 |    Yes |    No |        No | MVP          |
| order.cancel_own_draft | Cancel Draft Order của mình              |    Yes |   Yes |        No | MVP          |
| order.cancel_any_draft | Cancel mọi Draft Order                   |    Yes |    No |        No | MVP          |
| order.add_item_own     | Thêm item vào Draft Order của mình       |    Yes |   Yes |        No | MVP          |
| order.update_item_own  | Cập nhật item trong Draft Order của mình |    Yes |   Yes |        No | MVP          |
| order.remove_item_own  | Xóa item trong Draft Order của mình      |    Yes |   Yes |        No | MVP          |
| order.modify_paid      | Sửa PAID Order                           |     No |    No |        No | Out of Scope |
| customer.walk_in_sale  | Bán cho khách lẻ                         |    Yes |   Yes |        No | MVP          |
| customer.manage        | Full Customer Management                 | Should |    No |        No | Should-have  |

---

## 12.9. Checkout Permissions

| Permission Key             | Mô tả                                         | Admin | Staff | Warehouse | Scope        |
| -------------------------- | --------------------------------------------- | ----: | ----: | --------: | ------------ |
| checkout.execute_own       | Checkout Order thuộc ownership scope          |   Yes |   Yes |        No | MVP          |
| checkout.execute_all       | Checkout mọi Draft Order hợp lệ               |   Yes |    No |        No | MVP          |
| checkout.retry_own         | Retry checkout với idempotency scope của mình |   Yes |   Yes |        No | MVP          |
| checkout.retry_all         | Retry checkout mọi order                      |   Yes |    No |        No | MVP          |
| checkout.bypass_high_alert | Bỏ qua HIGH alert                             |    No |    No |        No | Out of Scope |
| checkout.bypass_stock      | Bỏ qua stock validation                       |    No |    No |        No | Out of Scope |
| checkout.bypass_fefo       | Bỏ qua FEFO                                   |    No |    No |        No | Out of Scope |

---

## 12.10. Payment/Invoice Permissions

| Permission Key                      | Mô tả                                |  Admin | Staff | Warehouse | Scope        |
| ----------------------------------- | ------------------------------------ | -----: | ----: | --------: | ------------ |
| payment.read_own                    | Xem payment thuộc order của mình     |    Yes |   Yes |        No | MVP          |
| payment.read_all                    | Xem tất cả payments                  |    Yes |    No |        No | MVP          |
| payment.create_attempt_via_checkout | Tạo payment attempt qua checkout     |    Yes |   Yes |        No | MVP          |
| payment.create_direct               | Tạo payment trực tiếp ngoài checkout |     No |    No |        No | Out of Scope |
| payment.refund                      | Refund                               | Future |    No |        No | Future       |
| invoice.read_own                    | Xem invoice thuộc order của mình     |    Yes |   Yes |        No | MVP          |
| invoice.read_all                    | Xem tất cả invoices                  |    Yes |    No |        No | MVP          |
| invoice.create_via_checkout         | Tạo invoice qua checkout             |    Yes |   Yes |        No | MVP          |
| invoice.create_direct               | Tạo invoice trực tiếp ngoài checkout |     No |    No |        No | Out of Scope |
| invoice.void                        | Void/reversal invoice                | Future |    No |        No | Future       |

---

## 12.11. Interaction Permissions

| Permission Key                          | Mô tả                                                 | Admin | Staff | Warehouse | Scope |
| --------------------------------------- | ----------------------------------------------------- | ----: | ----: | --------: | ----- |
| drug_interaction.read                   | Xem DrugInteraction Rules                             |   Yes |  Read |        No | MVP   |
| drug_interaction.create                 | Tạo DrugInteraction Rule                              |   Yes |    No |        No | MVP   |
| drug_interaction.update                 | Cập nhật DrugInteraction Rule                         |   Yes |    No |        No | MVP   |
| drug_interaction.deactivate             | Deactivate DrugInteraction Rule                       |   Yes |    No |        No | MVP   |
| interaction.check_order_own             | Check interaction cho Order của mình                  |   Yes |   Yes |        No | MVP   |
| interaction.check_order_all             | Check interaction cho mọi Order                       |   Yes |    No |        No | MVP   |
| interaction.check_standalone            | Standalone check cho Admin/demo utility               |   Yes |    No |        No | MVP   |
| interaction_alert.read_own_order        | Xem alert trong Order của mình                        |   Yes |   Yes |        No | MVP   |
| interaction_alert.read_all              | Xem InteractionAlert History toàn hệ thống            |   Yes |    No |        No | MVP   |
| interaction_alert.acknowledge_own_order | Acknowledge HIGH alert trong Order của mình           |   Yes |   Yes |        No | MVP   |
| interaction_alert.acknowledge_all       | Acknowledge HIGH alert mọi Order                      |   Yes |    No |        No | MVP   |
| interaction_alert.note_own_order        | Nhập consultation note cho alert trong Order của mình |   Yes |   Yes |        No | MVP   |
| interaction_alert.note_all              | Nhập consultation note cho mọi Order                  |   Yes |    No |        No | MVP   |

---

## 12.12. AI Permissions

| Permission Key                           | Mô tả                                                |  Admin |  Staff | Warehouse | Scope        |
| ---------------------------------------- | ---------------------------------------------------- | -----: | -----: | --------: | ------------ |
| ai_copilot.use_interaction_explanation   | Dùng AI giải thích InteractionAlert                  |    Yes |    Yes |        No | MVP          |
| ai_copilot.generate_note_draft           | Tạo consultation note draft                          |    Yes |    Yes |        No | MVP          |
| ai_copilot.use_symptom_context_questions | Dùng symptom/context để tạo safe follow-up questions |    Yes |    Yes |        No | MVP          |
| ai_audit.read_all                        | Xem toàn bộ AI Audit                                 |    Yes |     No |        No | MVP          |
| ai_audit.read_own                        | Xem AI Audit của chính mình                          | Should | Should |        No | Should-have  |
| ai_prompt.read                           | Xem prompt templates                                 |    Yes |     No |        No | MVP/Internal |
| ai_prompt.edit                           | Chỉnh prompt templates                               | Should |     No |        No | Should-have  |
| ai_provider_config.manage                | Quản lý provider/model config bằng UI                | Should |     No |        No | Should-have  |
| ai_diagnosis.request                     | Yêu cầu AI chẩn đoán                                 |     No |     No |        No | Out of Scope |
| ai_prescribing.request                   | Yêu cầu AI kê đơn                                    |     No |     No |        No | Out of Scope |
| ai_dosage.request                        | Yêu cầu AI đưa liều dùng cụ thể                      |     No |     No |        No | Out of Scope |

---

## 12.13. Graph Permissions

| Permission Key                   | Mô tả                                   |  Admin | Staff | Warehouse | Scope        |
| -------------------------------- | --------------------------------------- | -----: | ----: | --------: | ------------ |
| graph_explorer.read              | Xem Graph Explorer read-only            |    Yes |   Yes |        No | MVP          |
| graph_rag.use_readonly           | Dùng Graph-RAG read-only                |    Yes |   Yes |        No | MVP          |
| graph_sync.read_status           | Xem Graph Sync status/log               | Should |    No |        No | Should-have  |
| graph_sync.retry                 | Retry Graph Sync job qua UI             | Should |    No |        No | Should-have  |
| graph_sync.manage                | Quản lý Graph Sync                      | Should |    No |        No | Should-have  |
| graph.raw_cypher                 | Submit raw Cypher                       |     No |    No |        No | Out of Scope |
| graph.manage_projection_directly | Sửa Neo4j trực tiếp như source of truth |     No |    No |        No | Out of Scope |

Lưu ý:

1. Staff có thể có read-only Graph Explorer/Graph-RAG nếu được cấp trong MVP.
2. Staff không được submit raw Cypher.
3. Warehouse không có Graph Explorer/Graph-RAG access trong MVP.
4. Graph access phải tuân theo permission và data scope.

---

## 12.14. Reports Permissions

| Permission Key               | Mô tả                                    |  Admin |  Staff | Warehouse | Scope              |
| ---------------------------- | ---------------------------------------- | -----: | -----: | --------: | ------------------ |
| report.revenue.read          | Xem Revenue Report                       |    Yes |     No |        No | MVP                |
| report.top_medicines.read    | Xem Top Medicines Report                 |    Yes |     No |        No | MVP                |
| report.inventory.read        | Xem Inventory Report                     |    Yes |     No |       Yes | MVP                |
| report.sales_own.read        | Xem báo cáo nhỏ về sales của mình nếu có | Should | Should |        No | Should-have        |
| report.ai_narrative.generate | Tạo AI report narrative                  | Should |     No |        No | Should-have        |
| report.advanced.read         | Xem advanced analytics                   | Should |     No |    Should | Should-have/Future |
| report.forecast.read         | Xem forecast                             | Future |     No |    Future | Future             |

---

## 12.15. Settings Permissions

| Permission Key                        | Mô tả                             |  Admin | Staff | Warehouse | Scope       |
| ------------------------------------- | --------------------------------- | -----: | ----: | --------: | ----------- |
| settings.read                         | Xem System Settings               |    Yes |    No |        No | MVP         |
| settings.update_near_expiry_threshold | Cập nhật near-expiry threshold    |    Yes |    No |        No | MVP         |
| settings.update_ai_provider           | Cập nhật AI provider/model qua UI | Should |    No |        No | Should-have |
| settings.update_prompt                | Cập nhật prompt settings qua UI   | Should |    No |        No | Should-have |
| settings.update_security              | Cập nhật security settings        | Future |    No |        No | Future      |

---

## 12.16. Audit Permissions

| Permission Key       | Mô tả                             |  Admin | Staff | Warehouse | Scope       |
| -------------------- | --------------------------------- | -----: | ----: | --------: | ----------- |
| audit.read_system    | Xem System Audit Log UI           | Should |    No |        No | Should-have |
| audit.read_ai        | Xem AI Audit Log                  |    Yes |    No |        No | MVP         |
| audit.read_inventory | Xem audit liên quan kho nếu UI có |    Yes |    No |    Should | Should-have |
| audit.read_sales     | Xem audit sales                   |    Yes |    No |        No | Should-have |
| audit.export         | Export audit                      | Future |    No |        No | Future      |

Lưu ý:

1. Backend audit logging là MVP.
2. Generic System Audit Log UI là Should-have.
3. AI Audit Admin view là MVP nếu cần evidence cho AI use.
4. Warehouse có thể xem audit kho ở Should-have nếu có UI phù hợp.

---

## 13. Ownership-based Access Rules

### 13.1. Ownership definition

Ownership là quan hệ xác định user có quyền trên dữ liệu cụ thể vì user đã tạo, xử lý hoặc được giao dữ liệu đó.

Trong MVP, ownership quan trọng nhất áp dụng cho Staff trong sales flow.

### 13.2. Order ownership

Một Order thuộc ownership scope của Staff nếu:

1. Staff là `created_by` của Order.
2. Staff là `processed_by` của Order.
3. Hoặc có rule tương đương được phê duyệt trong SRS/API.

Quy tắc:

1. Staff có `order.read_own` chỉ xem Orders thuộc ownership.
2. Staff có `order.update_own_draft` chỉ sửa Draft Order thuộc ownership.
3. Staff có `order.cancel_own_draft` chỉ cancel Draft Order thuộc ownership.
4. Staff có `checkout.execute_own` chỉ checkout Draft Order thuộc ownership.
5. Admin có `order.read_all` và `checkout.execute_all`.

### 13.3. Payment ownership

Payment thuộc ownership scope của Staff nếu Payment gắn với Order thuộc ownership scope của Staff.

Quy tắc:

1. Staff chỉ xem payment của Order mình tạo/xử lý.
2. Staff không xem tất cả payment.
3. Admin xem tất cả payment.
4. Warehouse không xem payment trong MVP.

### 13.4. Invoice ownership

Invoice thuộc ownership scope của Staff nếu Invoice gắn với Order thuộc ownership scope của Staff.

Quy tắc:

1. Staff chỉ xem invoice của Order mình tạo/xử lý.
2. Admin xem tất cả invoice.
3. Warehouse không xem invoice trong MVP.

### 13.5. InteractionAlert ownership

InteractionAlert thuộc ownership scope của Staff nếu alert gắn với Order thuộc ownership scope của Staff.

Quy tắc:

1. Staff xem alert trong Order của mình.
2. Staff acknowledge/note HIGH alert trong Order của mình.
3. Staff không xem InteractionAlert History toàn hệ thống.
4. Admin xem InteractionAlert History toàn hệ thống.
5. Warehouse không xem InteractionAlert trong MVP.

### 13.6. AI ownership

AI Audit record liên quan đến Staff có thể gắn với user_id, order_id hoặc interaction_alert_id.

MVP rule:

1. Admin xem AI Audit Log.
2. Staff không xem AI Audit Log trong MVP.
3. Staff chỉ nhận response của AI request mình gọi trong UI flow.
4. AI Audit read_own có thể là Should-have.

### 13.7. Graph data ownership

Graph-RAG và Graph Explorer là read-only.

Quy tắc MVP:

1. Admin có read-only graph access.
2. Staff có read-only graph access nếu được cấp permission.
3. Staff không submit raw Cypher.
4. Warehouse không có graph access trong MVP.
5. Graph-RAG output không được tiết lộ dữ liệu ngoài quyền user.

---

## 14. Data Scope Rules

### 14.1. Admin data scope

Admin data scope:

1. All users.
2. All roles/permissions.
3. All medicines.
4. All active ingredients.
5. All suppliers.
6. All inventory data.
7. All stock imports.
8. All inventory adjustments.
9. All orders.
10. All payments.
11. All invoices.
12. All interaction rules.
13. All interaction alerts.
14. AI Audit.
15. Graph read access.
16. Reports.
17. Settings.

Admin vẫn bị ràng buộc bởi business rules và data integrity.

### 14.2. Staff data scope

Staff data scope:

1. Medicine active for sales.
2. Sellable stock in POS.
3. Draft Orders owned by Staff.
4. Orders created or processed by Staff.
5. InteractionAlerts attached to Staff-owned Orders.
6. Payments attached to Staff-owned Orders.
7. Invoices attached to Staff-owned Orders.
8. AI Copilot within POS context.
9. Graph read-only if permission granted.

Staff không có scope:

1. All orders.
2. Inventory dashboard operational.
3. Supplier management.
4. DrugInteraction Rule management.
5. AI Audit.
6. System Settings.
7. Graph Sync management.
8. Warehouse workflows.

### 14.3. Warehouse data scope

Warehouse data scope:

1. Medicine read for inventory context.
2. Supplier read/create/update.
3. Inventory Summary.
4. MedicineBatch.
5. Stock Import.
6. Inventory Adjustment.
7. Low-stock.
8. Near-expiry.
9. Inventory Report.

Warehouse không có scope:

1. Orders.
2. Checkout.
3. Payment.
4. Invoice.
5. InteractionAlert.
6. AI Copilot in POS.
7. AI Audit.
8. Graph Explorer.
9. Graph-RAG.
10. DrugInteraction Rule management.
11. System Settings unless later approved.

### 14.4. Environment data scope

Demo reset scope:

1. Chỉ local environment.
2. Không demo/staging.
3. Không production.
4. Không unknown environment.
5. Phải có guard rõ ràng.

Testing data scope:

1. Destructive tests không chạy trên demo DB.
2. Integration tests phải isolation/cleanup.
3. Demo seed không dùng dữ liệu cá nhân thật.

---

## 15. UI Visibility Rules

### 15.1. General rule

Frontend phải dùng user permissions để hiển thị menu, button và action phù hợp.

Nhưng:

1. UI visibility không thay thế backend authorization.
2. UI không được expose action mà user chắc chắn không có quyền.
3. Button bị ẩn/disable vẫn phải được backend kiểm tra nếu user gọi API trực tiếp.
4. UI phải rõ ràng để user không bị nhầm vai trò.

### 15.2. Admin UI visibility

Admin có thể thấy:

1. Dashboard Admin.
2. User Management.
3. Role/Permission view nếu trong MVP.
4. Medicine.
5. ActiveIngredient.
6. Supplier.
7. Inventory Summary.
8. Batch Detail.
9. Stock Import.
10. Inventory Adjustment.
11. POS.
12. Order History.
13. Order Detail.
14. Checkout.
15. Payment/Invoice views.
16. DrugInteraction Rule Management.
17. InteractionAlert History.
18. AI Copilot.
19. AI Audit.
20. Graph Explorer.
21. Graph-RAG.
22. Reports.
23. System Settings.
24. Graph Sync Status nếu Should-have được triển khai.
25. Generic System Audit nếu Should-have được triển khai.

### 15.3. Staff UI visibility

Staff có thể thấy:

1. POS.
2. Draft Order.
3. Order History của mình.
4. Order Detail của mình.
5. Checkout panel/route.
6. InteractionAlert trong Order của mình.
7. AI Copilot trong POS context.
8. Invoice/Payment của Order thuộc scope.
9. Medicine search trong POS.
10. Sellable stock trong POS.
11. Graph Explorer/Graph-RAG read-only nếu được cấp.

Staff không thấy:

1. User Management.
2. Role/Permission Management.
3. Supplier Management.
4. Stock Import.
5. Inventory Adjustment.
6. General low-stock dashboard.
7. General near-expiry dashboard.
8. DrugInteraction Rule Management.
9. InteractionAlert History toàn hệ thống.
10. AI Audit.
11. System Settings.
12. Graph Sync Status.
13. Raw Cypher tool.
14. Reports doanh thu toàn hệ thống.

### 15.4. Warehouse UI visibility

Warehouse có thể thấy:

1. Inventory Summary.
2. Batch Detail.
3. Medicine read-only.
4. Supplier Management cơ bản.
5. Stock Import.
6. Inventory Adjustment.
7. Low-stock dashboard.
8. Near-expiry dashboard.
9. Inventory Report.

Warehouse không thấy:

1. POS.
2. Checkout.
3. Payment.
4. Invoice.
5. Order management.
6. InteractionAlert.
7. DrugInteraction Rule Management.
8. AI Copilot trong POS.
9. AI Audit.
10. Graph Explorer.
11. Graph-RAG.
12. System Settings.
13. Revenue Report.
14. Top Medicines Report nếu không được cấp riêng.

### 15.5. UI disabled vs hidden

Recommended behavior:

| Trường hợp                                  | UI behavior                                       |
| ------------------------------------------- | ------------------------------------------------- |
| User không có permission module             | Ẩn menu/module                                    |
| User có read nhưng không có create          | Hiển thị list, ẩn create button                   |
| User có read nhưng entity không đúng status | Disable action và hiển thị lý do                  |
| Staff không owner resource                  | Không hiển thị resource hoặc trả access denied    |
| Checkout validation fail                    | Hiển thị lỗi và giữ Draft Order                   |
| HIGH alert chưa note                        | Hiển thị yêu cầu nhập consultation note           |
| AI guardrail block                          | Hiển thị safe refusal                             |
| Graph stale                                 | Hiển thị degraded/freshness indicator nếu áp dụng |

---

## 16. API Authorization Rules

### 16.1. General API authorization rule

Mọi protected API phải:

1. Yêu cầu valid Supabase access token.
2. Resolve user profile nội bộ.
3. Kiểm tra user active.
4. Resolve effective permissions.
5. Kiểm tra permission required.
6. Kiểm tra ownership/data scope nếu cần.
7. Kiểm tra entity status nếu liên quan.
8. Ghi audit/log nếu action quan trọng.
9. Trả error phù hợp nếu bị từ chối.

### 16.2. API permission annotation expectation

Mỗi API endpoint trong Document 12 nên có:

1. Required authentication.
2. Required permissions.
3. Ownership rule nếu có.
4. Allowed roles tham khảo.
5. Error cases liên quan authorization.
6. Audit behavior nếu action quan trọng.

Ví dụ format trong API spec:

```text
Authentication: Required
Required Permission: order.update_own_draft OR order.update_any_draft
Ownership Rule: Staff can update only own Draft Order
Status Rule: Order must be DRAFT
Forbidden: if user lacks permission or ownership
```

### 16.3. API authorization by module

| Module               | Authorization expectation                                            |
| -------------------- | -------------------------------------------------------------------- |
| Auth/User            | Admin quản lý user; mọi user đọc self profile                        |
| Medicine             | Admin write; Staff/Warehouse read theo context                       |
| ActiveIngredient     | Admin write; Staff/Warehouse read                                    |
| Supplier             | Warehouse create/update/read; Admin deactivate                       |
| Inventory            | Admin/Warehouse operational read; Staff chỉ sales availability       |
| Stock Import         | Admin/Warehouse create/update/confirm                                |
| Inventory Adjustment | Admin/Warehouse create/confirm                                       |
| POS                  | Admin/Staff; Staff own scope                                         |
| Checkout             | Admin all; Staff own scope; Warehouse no                             |
| Payment/Invoice      | Admin all; Staff own scope; Warehouse no                             |
| Interaction Rule     | Admin manage; Staff read/check via POS; Warehouse no                 |
| InteractionAlert     | Admin all; Staff own order; Warehouse no                             |
| AI                   | Admin/Staff POS context; Warehouse no                                |
| Graph                | Admin/Staff read-only; Warehouse no MVP                              |
| Reports              | Admin revenue/top/inventory; Warehouse inventory; Staff limited/none |
| Settings             | Admin only                                                           |
| Audit                | Admin; selected audit UI Should-have                                 |

### 16.4. State-based authorization

API must combine permission with entity state.

Examples:

| Entity               | State rule                                                            |
| -------------------- | --------------------------------------------------------------------- |
| Order                | Only DRAFT can be edited/cancelled/checked out                        |
| Order                | PAID cannot be directly edited/cancelled                              |
| Stock Import         | DRAFT can be edited                                                   |
| Stock Import         | CONFIRMED cannot be confirmed again                                   |
| Stock Import         | CANCELLED cannot be confirmed                                         |
| Inventory Adjustment | Confirmed adjustment cannot be edited directly                        |
| MedicineBatch        | quantity_remaining cannot go negative                                 |
| InteractionAlert     | HIGH unresolved blocks checkout                                       |
| Supplier             | Deactivated supplier cannot be used for new import unless rule allows |
| Medicine             | Inactive Medicine cannot be added to new Draft Order                  |

---

## 17. Backend Guard/Interceptor Expectations

### 17.1. Authentication guard

Authentication guard phải:

1. Extract Supabase access token.
2. Verify token.
3. Reject missing/invalid/expired token.
4. Attach authenticated Supabase user information to request context.
5. Not trust user identity from request body.

### 17.2. User profile guard

User profile guard phải:

1. Load user profile by Supabase user ID.
2. Reject if profile not found.
3. Reject if profile inactive.
4. Attach user profile to request context.
5. Check must_change_password if required.

### 17.3. Permission guard

Permission guard phải:

1. Load effective permissions.
2. Check required permission key.
3. Support OR permissions.
4. Support permission scopes like own/all.
5. Reject forbidden actions.
6. Make permission info available to downstream logic if needed.

### 17.4. Ownership guard

Ownership guard phải:

1. Identify resource being accessed.
2. Determine owner/creator/processor.
3. Compare with current user.
4. Allow Admin all-scope permissions.
5. Allow Staff own-scope permissions.
6. Reject if user lacks ownership.
7. Avoid trusting ownership ID from request body.

### 17.5. Status/business guard

Status/business guard hoặc service-level validation phải:

1. Reject editing PAID Order.
2. Reject checkout non-DRAFT Order.
3. Reject confirm already CONFIRMED Stock Import.
4. Reject quantity negative adjustment.
5. Reject unresolved HIGH alert checkout.
6. Reject direct payment/invoice creation outside checkout.
7. Reject expired batch sale.
8. Reject unsafe AI requests.

### 17.6. Audit interceptor expectation

Audit interceptor hoặc service-level audit should:

1. Log critical action actor.
2. Log before/after or summary where appropriate.
3. Avoid logging raw PII.
4. Log failure events if important.
5. Log AI audit separately with AI metadata.
6. Log Graph Sync attempts/failures.

### 17.7. Guard ordering

Recommended order:

1. AuthenticationGuard.
2. UserProfileGuard.
3. MustChangePasswordGuard if needed.
4. PermissionGuard.
5. OwnershipGuard.
6. Business/status validation in service layer.
7. Audit/logging after action or on failure.

---

## 18. Access Denied/Error Behavior

### 18.1. Error categories

| Error type               | Meaning                                                 | Example                    |
| ------------------------ | ------------------------------------------------------- | -------------------------- |
| Unauthenticated          | User chưa login hoặc token invalid                      | Missing token              |
| Profile not found        | Supabase user chưa có profile nội bộ                    | No user profile            |
| User inactive            | User profile inactive                                   | Deactivated staff          |
| Password change required | User phải đổi mật khẩu trước                            | first-login flow           |
| Forbidden                | User thiếu permission                                   | Warehouse checkout         |
| Ownership denied         | User có permission own nhưng resource không thuộc scope | Staff xem order người khác |
| State denied             | Action không hợp lệ với trạng thái entity               | Checkout PAID order        |
| Business rule denied     | Vi phạm business rule                                   | HIGH alert chưa note       |
| Scope denied             | Feature thuộc Should-have/Future/Out of Scope           | Raw Cypher                 |
| Environment denied       | Action không được phép trong environment hiện tại       | demo reset ở production    |

### 18.2. Error behavior by case

| Case                            | Expected behavior                          |
| ------------------------------- | ------------------------------------------ |
| Missing/invalid token           | Return authentication required             |
| Token valid but profile missing | Return user profile not configured         |
| User inactive                   | Return account disabled                    |
| must_change_password true       | Redirect/return password change required   |
| Missing permission              | Return forbidden                           |
| Staff access other staff order  | Return ownership denied                    |
| Warehouse access POS            | Return forbidden                           |
| Staff view all orders           | Return forbidden                           |
| Warehouse view InteractionAlert | Return forbidden                           |
| Staff submit raw Cypher         | Return forbidden/scope denied              |
| Checkout unresolved HIGH        | Return business rule error                 |
| Demo reset non-local            | Return environment denied                  |
| AI unsafe request               | Return safe refusal, not raw unsafe output |

### 18.3. Error message principles

1. Error message phải đủ rõ để user hiểu cần làm gì.
2. Không tiết lộ dữ liệu nhạy cảm của resource không thuộc quyền.
3. Không tiết lộ chi tiết security/internal stack.
4. Với Staff/Warehouse, message nên hướng dẫn liên hệ Admin nếu cần quyền.
5. Với validation nghiệp vụ, message nên nêu lỗi cụ thể như thiếu consultation note hoặc stock không đủ.
6. Với AI guardrail, message phải an toàn và không chứa raw unsafe output.

### 18.4. Logging denied access

Backend nên log:

1. Repeated forbidden attempts.
2. Access to sensitive modules.
3. Demo reset denied by environment.
4. Raw Cypher attempt.
5. Unauthorized AI Audit access.
6. Unauthorized InteractionAlert History access.
7. Checkout denied due to business rules if useful for audit/debug.

---

## 19. MVP / Should-have / Future Authorization Scope

### 19.1. MVP authorization scope

MVP must include authorization for:

1. Supabase authenticated access.
2. Active/inactive user profile check.
3. Multi-role RBAC.
4. Admin/Staff/Warehouse roles.
5. Permission-based backend authorization.
6. Ownership-based sales access for Staff.
7. Supplier permissions for Warehouse/Admin.
8. Inventory permissions for Warehouse/Admin.
9. POS permissions for Staff/Admin.
10. Checkout permissions for Staff/Admin.
11. Payment/Invoice ownership for Staff.
12. InteractionAlert ownership for Staff.
13. InteractionAlert History for Admin.
14. AI Copilot for Staff/Admin.
15. AI Audit for Admin.
16. Graph read-only for Admin/Staff if enabled.
17. No Graph access for Warehouse.
18. Settings for Admin.
19. Demo reset local guard.

### 19.2. Should-have authorization scope

Should-have authorization includes:

1. Full Customer Management permissions.
2. Customer purchase history permissions.
3. Generic System Audit Log UI permissions.
4. Admin prompt editing permissions.
5. Admin AI provider/model UI permissions.
6. Graph Sync Status/retry UI permissions.
7. AI Audit read_own for Staff.
8. Inventory audit read for Warehouse.
9. Advanced report permissions.
10. Notification permissions.

### 19.3. Future authorization scope

Future authorization includes:

1. Customer portal role.
2. Pharmacist role nếu sau này tách khỏi Staff.
3. Accountant role nếu có finance module.
4. Multi-store manager.
5. Warehouse by location.
6. Supplier portal user.
7. Delivery/shipping role.
8. Refund/return approval permissions.
9. Real payment reconciliation permissions.
10. Advanced medical knowledge manager.
11. Commercial admin roles.

Các role này không được tự thêm vào MVP nếu chưa có quyết định mới.

### 19.4. Out of Scope authorization

Không cấp permissions cho:

1. AI diagnosis.
2. AI prescribing.
3. AI dosage advice.
4. Raw Cypher access cho Staff.
5. Warehouse InteractionAlert access.
6. Warehouse Graph Explorer access trong MVP.
7. Direct inventory quantity edit.
8. Checkout bypass stock.
9. Checkout bypass FEFO.
10. Checkout bypass HIGH alert.
11. Direct payment creation outside checkout.
12. Direct invoice creation outside checkout.
13. Demo reset outside local.
14. Hard delete entities with history.

---

## 20. Test Scenarios for Authorization

Các scenarios dưới đây là định hướng cho Document 20, chưa phải test case chi tiết đầy đủ.

### 20.1. Authentication scenarios

| Scenario ID | Scenario                                         | Expected Result                            |
| ----------- | ------------------------------------------------ | ------------------------------------------ |
| AUTH-SC-001 | User không gửi token gọi protected API           | Reject authentication required             |
| AUTH-SC-002 | User gửi token invalid                           | Reject invalid token                       |
| AUTH-SC-003 | Supabase user hợp lệ nhưng chưa có profile       | Reject profile not configured              |
| AUTH-SC-004 | User profile inactive                            | Reject account disabled                    |
| AUTH-SC-005 | User must_change_password true truy cập main app | Redirect/deny, require password change     |
| AUTH-SC-006 | User đổi mật khẩu first-login thành công         | must_change_password false, access allowed |

### 20.2. Admin scenarios

| Scenario ID | Scenario                                     | Expected Result         |
| ----------- | -------------------------------------------- | ----------------------- |
| ADM-SC-001  | Admin xem tất cả orders                      | Allowed                 |
| ADM-SC-002  | Admin deactivate Supplier                    | Allowed                 |
| ADM-SC-003  | Admin quản lý DrugInteraction Rule           | Allowed                 |
| ADM-SC-004  | Admin xem InteractionAlert History           | Allowed                 |
| ADM-SC-005  | Admin xem AI Audit                           | Allowed                 |
| ADM-SC-006  | Admin thay near-expiry threshold             | Allowed                 |
| ADM-SC-007  | Admin checkout Draft Order có HIGH chưa note | Denied by business rule |
| ADM-SC-008  | Admin cố tạo Medicine selling_price = 0      | Denied by validation    |

### 20.3. Staff scenarios

| Scenario ID | Scenario                                            | Expected Result                 |
| ----------- | --------------------------------------------------- | ------------------------------- |
| STF-SC-001  | Staff tạo Draft Order                               | Allowed                         |
| STF-SC-002  | Staff thêm active Medicine vào Draft Order của mình | Allowed                         |
| STF-SC-003  | Staff sửa Order của Staff khác                      | Ownership denied                |
| STF-SC-004  | Staff xem all orders                                | Forbidden                       |
| STF-SC-005  | Staff cancel Draft Order của mình                   | Allowed                         |
| STF-SC-006  | Staff cancel PAID Order                             | Denied by state/business rule   |
| STF-SC-007  | Staff checkout Order của mình                       | Allowed if validations pass     |
| STF-SC-008  | Staff checkout Order người khác                     | Ownership denied                |
| STF-SC-009  | Staff acknowledge HIGH alert trong Order của mình   | Allowed                         |
| STF-SC-010  | Staff xem InteractionAlert History toàn hệ thống    | Forbidden                       |
| STF-SC-011  | Staff gọi AI explanation trong POS                  | Allowed                         |
| STF-SC-012  | Staff xem AI Audit Log                              | Forbidden                       |
| STF-SC-013  | Staff submit raw Cypher                             | Forbidden                       |
| STF-SC-014  | Staff xem Supplier Management                       | Hidden in UI / forbidden in API |

### 20.4. Warehouse scenarios

| Scenario ID | Scenario                               | Expected Result |
| ----------- | -------------------------------------- | --------------- |
| WH-SC-001   | Warehouse xem Supplier                 | Allowed         |
| WH-SC-002   | Warehouse tạo Supplier                 | Allowed         |
| WH-SC-003   | Warehouse cập nhật Supplier            | Allowed         |
| WH-SC-004   | Warehouse deactivate Supplier          | Forbidden       |
| WH-SC-005   | Warehouse tạo Stock Import             | Allowed         |
| WH-SC-006   | Warehouse confirm Stock Import         | Allowed         |
| WH-SC-007   | Warehouse tạo Inventory Adjustment     | Allowed         |
| WH-SC-008   | Warehouse confirm Inventory Adjustment | Allowed         |
| WH-SC-009   | Warehouse tạo Draft Order              | Forbidden       |
| WH-SC-010   | Warehouse checkout                     | Forbidden       |
| WH-SC-011   | Warehouse xem Payment                  | Forbidden       |
| WH-SC-012   | Warehouse xem Invoice                  | Forbidden       |
| WH-SC-013   | Warehouse xem InteractionAlert         | Forbidden       |
| WH-SC-014   | Warehouse dùng Graph Explorer          | Forbidden       |
| WH-SC-015   | Warehouse xem Inventory Report         | Allowed         |

### 20.5. Multi-role scenarios

| Scenario ID | Scenario                                                                  | Expected Result                     |
| ----------- | ------------------------------------------------------------------------- | ----------------------------------- |
| MR-SC-001   | User có Staff + Warehouse roles tạo Draft Order                           | Allowed nếu có Staff permission     |
| MR-SC-002   | User có Staff + Warehouse roles confirm Stock Import                      | Allowed nếu có Warehouse permission |
| MR-SC-003   | User có inactive Warehouse role và active Staff role confirm Stock Import | Forbidden                           |
| MR-SC-004   | User inactive dù có Admin role                                            | Denied account disabled             |
| MR-SC-005   | Permission inactive trong role active                                     | Permission không có hiệu lực        |

### 20.6. UI visibility scenarios

| Scenario ID | Scenario                                         | Expected Result                                        |
| ----------- | ------------------------------------------------ | ------------------------------------------------------ |
| UI-SC-001   | Staff login                                      | Không thấy Supplier/Stock Import/Adjustment management |
| UI-SC-002   | Warehouse login                                  | Không thấy POS/Checkout/Payment/Invoice                |
| UI-SC-003   | Admin login                                      | Thấy menu quản trị và reports                          |
| UI-SC-004   | Staff mở trực tiếp URL admin screen              | Backend/API forbidden                                  |
| UI-SC-005   | Warehouse mở direct URL InteractionAlert History | Backend/API forbidden                                  |
| UI-SC-006   | Staff xem button checkout khi HIGH chưa note     | Button disabled hoặc checkout trả business error       |

### 20.7. Security abuse scenarios

| Scenario ID | Scenario                                                  | Expected Result                |
| ----------- | --------------------------------------------------------- | ------------------------------ |
| SEC-SC-001  | User chỉnh request body để set created_by thành user khác | Backend ignore/reject          |
| SEC-SC-002  | Staff gọi API read all orders trực tiếp                   | Forbidden                      |
| SEC-SC-003  | Warehouse gọi checkout API trực tiếp                      | Forbidden                      |
| SEC-SC-004  | Staff cố tạo payment trực tiếp ngoài checkout             | Forbidden/Out of Scope         |
| SEC-SC-005  | User gọi demo reset ở production env                      | Environment denied             |
| SEC-SC-006  | User gọi raw Cypher endpoint nếu tồn tại                  | Forbidden/endpoint not exposed |

---

## 21. Traceability to SRS/API/UI/Testing

### 21.1. Traceability to SRS

| Authorization Area      | Related SRS Requirement Groups  |
| ----------------------- | ------------------------------- |
| Supabase Auth           | FR-AUTH, NFR-SEC                |
| User profile            | FR-AUTH, DR-ID                  |
| Roles/permissions       | FR-RBAC, BR-AUTH                |
| Admin role              | FR-RBAC, Authorization Summary  |
| Staff ownership         | FR-RBAC, FR-POS, FR-CHK         |
| Warehouse restrictions  | FR-RBAC, FR-SUP, FR-STI, FR-ADJ |
| InteractionAlert access | FR-ALT, BR-ALT                  |
| AI access               | FR-AIC, FR-AIA                  |
| Graph access            | FR-GRG, FR-GSY                  |
| Reports access          | FR-RPT                          |
| Settings access         | FR-SET                          |
| Demo reset guard        | FR-DMO, NFR-SEC                 |

### 21.2. Traceability to API Specification

Document 12 phải dùng Document 07 để ghi cho mỗi endpoint:

1. Authentication required.
2. Required permission key.
3. Allowed roles reference.
4. Ownership rule.
5. Data scope rule.
6. State rule.
7. Error behavior.
8. Audit requirement.

Ví dụ trace:

| API group            | Required authorization source                       |
| -------------------- | --------------------------------------------------- |
| Auth/User APIs       | Auth/User permission matrix                         |
| Medicine APIs        | Medicine permission matrix                          |
| Supplier APIs        | Supplier permission matrix                          |
| Inventory APIs       | Inventory/Stock Import/Adjustment permission matrix |
| Order APIs           | POS ownership rules                                 |
| Checkout API         | Checkout permissions + business guard               |
| Payment/Invoice APIs | Payment/Invoice ownership                           |
| Interaction APIs     | Interaction permissions                             |
| AI APIs              | AI permission matrix + guardrail                    |
| Graph APIs           | Graph permissions + raw Cypher restrictions         |
| Report APIs          | Report permissions                                  |
| Settings APIs        | Settings permissions                                |
| Demo tooling APIs    | Demo reset environment guard                        |

### 21.3. Traceability to UI/UX Specification

Document 15 phải dùng Document 07 để xác định:

1. Sidebar visibility.
2. Menu visibility.
3. Button visibility.
4. Disabled states.
5. Access denied pages.
6. Role-specific dashboard widgets.
7. Staff POS-only warnings.
8. Warehouse inventory dashboard.
9. Admin system settings.
10. Admin InteractionAlert History.
11. AI/Graph UI access.

### 21.4. Traceability to Testing

Document 20 phải dùng Document 07 để tạo test cases cho:

1. Authentication required.
2. Token invalid.
3. Profile inactive.
4. must_change_password.
5. Permission denied.
6. Ownership denied.
7. Staff own order access.
8. Warehouse restricted modules.
9. Admin full access.
10. Multi-role union behavior.
11. UI visibility.
12. Direct API bypass attempts.
13. Raw Cypher forbidden.
14. Demo reset local guard.
15. HIGH alert authorization.
16. AI audit access restriction.

---

## 22. Kết luận

Document 07 — User Roles, Permissions & Authorization Specification xác định mô hình phân quyền chính thức cho **PharmaAssist AI Intelligence**.

Các điểm quan trọng đã được chốt trong tài liệu này:

1. Supabase Auth phụ trách authentication.
2. PostgreSQL nghiệp vụ lưu user profile, roles, permissions và mappings.
3. Backend là nơi enforce authorization chính thức.
4. Frontend visibility chỉ hỗ trợ UX, không thay thế backend authorization.
5. Hệ thống dùng multi-role RBAC.
6. Một user có thể có nhiều role.
7. Quyền hiệu lực là hợp permissions từ active roles.
8. MVP có ba role chính thức: Admin, Staff, Warehouse.
9. Không tự thêm role mới ngoài baseline.
10. Admin có quyền quản trị rộng nhưng vẫn bị ràng buộc bởi business rules.
11. Staff bị giới hạn theo ownership scope trong sales flow.
12. Warehouse chỉ có quyền kho/supplier/inventory, không có quyền sales/payment/interaction/graph trong MVP.
13. Permission naming convention dùng dạng `module.action_scope`.
14. Permission matrix đã được xác định theo module.
15. Ownership rules áp dụng cho Order, Payment, Invoice và InteractionAlert.
16. UI phải ẩn/disable chức năng theo quyền nhưng backend vẫn kiểm tra lại.
17. API phải khai báo authentication, permission, ownership, state rule và error behavior.
18. Backend cần guard/interceptor cho authentication, user profile, permission, ownership và audit.
19. Access denied behavior phải rõ ràng, an toàn và không lộ dữ liệu ngoài quyền.
20. Authorization test scenarios được định hướng cho Document 20.

Document 07 là đầu vào trực tiếp cho:

1. Document 08 — Use Case Specification.
2. Document 12 — API Specification.
3. Document 13 — Database Design & ERD.
4. Document 14 — Prisma Schema & Migration Design.
5. Document 15 — UI/UX Screen Specification.
6. Document 20 — Testing, Demo & Setup Guide.

Bước tiếp theo hợp lý là viết **Document 08 — Use Case Specification**, vì role, permission và ownership đã đủ rõ để đặc tả use cases theo actor và phạm vi truy cập.
