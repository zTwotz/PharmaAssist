# 3_Stories.md — Danh sách User Stories chính thức cho PharmaAssist AI Intelligence

## Quy ước chung khi tạo Story trên Jira

| **Field trên Jira** | **Giá trị chung**                                               |
| ------------------- | --------------------------------------------------------------- |
| Work type           | Story                                                           |
| Status              | To Do                                                           |
| Parent              | Chọn Epic tương ứng, ví dụ `PAC-EPIC-01`                        |
| Assignee            | Automatic                                                       |
| Fix versions        | Để trống                                                        |
| Team                | Để trống hoặc chọn team nếu nhóm đã tạo                         |
| Labels              | Theo module của Story                                           |
| Sprint              | Chọn Sprint tương ứng trong kế hoạch Sprint                     |
| Story Key           | Dùng dạng `US-01`, `US-02`, `US-03` để dễ biết thứ tự Story     |
| Jira Project Key    | Dự án Jira dùng project key chính thức là `PAC`                 |
| Component           | Dùng Component chính thức đã định nghĩa trong `1_Components.md` |
| Scope               | MVP / Should-have / Future                                      |

---

# Tổng quan số lượng User Story

Tài liệu này có tổng cộng **170 User Stories**.

```text
US-01  → US-150: MVP / Core
US-151 → US-160: Should-have / Advanced
US-161 → US-170: Future / Commercial Expansion
```

Lý do chia nhiều Story:

1. Giúp AI agent code từng phần nhỏ hơn.
2. Tránh gộp nhiều nghiệp vụ phức tạp vào một Story quá lớn.
3. Dễ trace từ Story → Epic → Task → Requirement → Use Case → Test Case.
4. Dễ kiểm thử từng module như Auth, MedicineBatch, Checkout, FEFO, InteractionAlert, AI Guardrail, Graph Sync và Graph-RAG.
5. Tránh quay lại baseline cũ như custom JWT, aggregate inventory, payment tách checkout hoặc MockAI-only MVP.

---

# Bảng thông tin 170 User Story

| **Story Key** | **Summary**                                                      | **Parent Epic**                                    | **Component**                             | **Priority** | **Sprint** | **Story Point** | **Start date**   | **Due date**     | **Labels**                               |
| ------------- | ---------------------------------------------------------------- | -------------------------------------------------- | ----------------------------------------- | ------------ | ---------- | --------------: | ---------------- | ---------------- | ---------------------------------------- |
| US-01         | US-01 - Đăng nhập bằng Supabase Auth                             | PAC-EPIC-01 - Auth & RBAC                          | Auth & RBAC                               | Highest      | Sprint 1   |               5 | Theo Sprint Plan | Theo Sprint Plan | auth, supabase-auth, login, mvp          |
| US-02         | US-02 - Đăng xuất và dọn session                                 | PAC-EPIC-01 - Auth & RBAC                          | Auth & RBAC                               | High         | Sprint 1   |               2 | Theo Sprint Plan | Theo Sprint Plan | logout, session, auth, mvp               |
| US-03         | US-03 - Xác thực session ở backend                               | PAC-EPIC-01 - Auth & RBAC                          | Auth & RBAC                               | Highest      | Sprint 1   |               5 | Theo Sprint Plan | Theo Sprint Plan | backend, session, security, mvp          |
| US-04         | US-04 - Lấy thông tin người dùng hiện tại                        | PAC-EPIC-01 - Auth & RBAC                          | Auth & RBAC                               | High         | Sprint 1   |               3 | Theo Sprint Plan | Theo Sprint Plan | user-profile, auth, mvp                  |
| US-05         | US-05 - Multi-role RBAC model                                    | PAC-EPIC-01 - Auth & RBAC                          | Auth & RBAC                               | Highest      | Sprint 1   |               5 | Theo Sprint Plan | Theo Sprint Plan | rbac, role, permission, mvp              |
| US-06         | US-06 - Permission-based API Guard                               | PAC-EPIC-01 - Auth & RBAC                          | Auth & RBAC                               | Highest      | Sprint 1   |               5 | Theo Sprint Plan | Theo Sprint Plan | authorization, api-guard, mvp            |
| US-07         | US-07 - Permission-aware frontend UI                             | PAC-EPIC-01 - Auth & RBAC                          | Auth & RBAC                               | High         | Sprint 1   |               3 | Theo Sprint Plan | Theo Sprint Plan | frontend, permission, ui, mvp            |
| US-08         | US-08 - Staff ownership scope                                    | PAC-EPIC-01 - Auth & RBAC                          | Auth & RBAC                               | High         | Sprint 1   |               5 | Theo Sprint Plan | Theo Sprint Plan | staff-scope, ownership, mvp              |
| US-09         | US-09 - Warehouse access restrictions                            | PAC-EPIC-01 - Auth & RBAC                          | Auth & RBAC                               | High         | Sprint 1   |               3 | Theo Sprint Plan | Theo Sprint Plan | warehouse, permission, mvp               |
| US-10         | US-10 - Admin tạo tài khoản nhân viên                            | PAC-EPIC-02 - User / Staff Account Management      | Auth & RBAC                               | High         | Sprint 1   |               5 | Theo Sprint Plan | Theo Sprint Plan | admin, user-management, mvp              |
| US-11         | US-11 - Đổi mật khẩu lần đầu                                     | PAC-EPIC-02 - User / Staff Account Management      | Auth & RBAC                               | High         | Sprint 1   |               3 | Theo Sprint Plan | Theo Sprint Plan | first-login, password-change, mvp        |
| US-12         | US-12 - Cập nhật trạng thái tài khoản nhân viên                  | PAC-EPIC-02 - User / Staff Account Management      | Auth & RBAC                               | Medium       | Sprint 1   |               3 | Theo Sprint Plan | Theo Sprint Plan | user-status, admin, mvp                  |
| US-13         | US-13 - Thêm thuốc mới                                           | PAC-EPIC-03 - Medicine & ActiveIngredient          | Medicine & ActiveIngredient               | Highest      | Sprint 2   |               5 | Theo Sprint Plan | Theo Sprint Plan | medicine, create, mvp                    |
| US-14         | US-14 - Cập nhật thông tin thuốc                                 | PAC-EPIC-03 - Medicine & ActiveIngredient          | Medicine & ActiveIngredient               | High         | Sprint 2   |               3 | Theo Sprint Plan | Theo Sprint Plan | medicine, update, mvp                    |
| US-15         | US-15 - Tìm kiếm và lọc thuốc                                    | PAC-EPIC-03 - Medicine & ActiveIngredient          | Medicine & ActiveIngredient               | High         | Sprint 2   |               3 | Theo Sprint Plan | Theo Sprint Plan | medicine, search, filter, mvp            |
| US-16         | US-16 - Deactivate thuốc                                         | PAC-EPIC-03 - Medicine & ActiveIngredient          | Medicine & ActiveIngredient               | Medium       | Sprint 2   |               3 | Theo Sprint Plan | Theo Sprint Plan | medicine, deactivate, mvp                |
| US-17         | US-17 - Validate giá bán thuốc lớn hơn 0                         | PAC-EPIC-03 - Medicine & ActiveIngredient          | Medicine & ActiveIngredient               | High         | Sprint 2   |               2 | Theo Sprint Plan | Theo Sprint Plan | validation, selling-price, mvp           |
| US-18         | US-18 - Quản lý ActiveIngredient                                 | PAC-EPIC-03 - Medicine & ActiveIngredient          | Medicine & ActiveIngredient               | Highest      | Sprint 2   |               5 | Theo Sprint Plan | Theo Sprint Plan | active-ingredient, crud, mvp             |
| US-19         | US-19 - Mapping Medicine với ActiveIngredient                    | PAC-EPIC-03 - Medicine & ActiveIngredient          | Medicine & ActiveIngredient               | Highest      | Sprint 2   |               5 | Theo Sprint Plan | Theo Sprint Plan | medicine-ingredient, mapping, mvp        |
| US-20         | US-20 - Validate mapping hoạt chất không trùng                   | PAC-EPIC-03 - Medicine & ActiveIngredient          | Medicine & ActiveIngredient               | High         | Sprint 2   |               3 | Theo Sprint Plan | Theo Sprint Plan | validation, ingredient, mvp              |
| US-21         | US-21 - Chuẩn hóa dữ liệu hoạt chất                              | PAC-EPIC-03 - Medicine & ActiveIngredient          | Medicine & ActiveIngredient               | Medium       | Sprint 2   |               3 | Theo Sprint Plan | Theo Sprint Plan | data-quality, ingredient, mvp            |
| US-22         | US-22 - Trigger Graph Sync khi Medicine/Ingredient thay đổi      | PAC-EPIC-03 - Medicine & ActiveIngredient          | Medicine & ActiveIngredient               | High         | Sprint 2   |               3 | Theo Sprint Plan | Theo Sprint Plan | graph-sync, medicine, mvp                |
| US-23         | US-23 - Tạo nhà cung cấp                                         | PAC-EPIC-04 - Supplier Management                  | Supplier                                  | High         | Sprint 2   |               3 | Theo Sprint Plan | Theo Sprint Plan | supplier, create, mvp                    |
| US-24         | US-24 - Cập nhật và tìm kiếm nhà cung cấp                        | PAC-EPIC-04 - Supplier Management                  | Supplier                                  | High         | Sprint 2   |               3 | Theo Sprint Plan | Theo Sprint Plan | supplier, update, search, mvp            |
| US-25         | US-25 - Admin deactivate nhà cung cấp                            | PAC-EPIC-04 - Supplier Management                  | Supplier                                  | High         | Sprint 2   |               3 | Theo Sprint Plan | Theo Sprint Plan | supplier, deactivate, admin, mvp         |
| US-26         | US-26 - Liên kết Supplier với Stock Import                       | PAC-EPIC-04 - Supplier Management                  | Supplier                                  | Medium       | Sprint 2   |               2 | Theo Sprint Plan | Theo Sprint Plan | supplier, stock-import, mvp              |
| US-27         | US-27 - Thiết kế MedicineBatch là source of truth                | PAC-EPIC-05 - Inventory & MedicineBatch            | Inventory & MedicineBatch                 | Highest      | Sprint 3   |               5 | Theo Sprint Plan | Theo Sprint Plan | medicinebatch, inventory, mvp            |
| US-28         | US-28 - Batch number bắt buộc                                    | PAC-EPIC-05 - Inventory & MedicineBatch            | Inventory & MedicineBatch                 | Highest      | Sprint 3   |               3 | Theo Sprint Plan | Theo Sprint Plan | batch-number, validation, mvp            |
| US-29         | US-29 - Batch identity theo medicine + batch + expiry            | PAC-EPIC-05 - Inventory & MedicineBatch            | Inventory & MedicineBatch                 | Highest      | Sprint 3   |               5 | Theo Sprint Plan | Theo Sprint Plan | batch-identity, expiry, mvp              |
| US-30         | US-30 - Inventory Summary từ MedicineBatch                       | PAC-EPIC-05 - Inventory & MedicineBatch            | Inventory & MedicineBatch                 | Highest      | Sprint 3   |               5 | Theo Sprint Plan | Theo Sprint Plan | inventory-summary, batch, mvp            |
| US-31         | US-31 - Batch Detail view                                        | PAC-EPIC-05 - Inventory & MedicineBatch            | Inventory & MedicineBatch                 | High         | Sprint 3   |               3 | Theo Sprint Plan | Theo Sprint Plan | batch-detail, inventory, mvp             |
| US-32         | US-32 - Tính sellable quantity                                   | PAC-EPIC-05 - Inventory & MedicineBatch            | Inventory & MedicineBatch                 | Highest      | Sprint 3   |               5 | Theo Sprint Plan | Theo Sprint Plan | sellable-quantity, inventory, mvp        |
| US-33         | US-33 - Loại trừ batch hết hạn khỏi sellable stock               | PAC-EPIC-05 - Inventory & MedicineBatch            | Inventory & MedicineBatch                 | Highest      | Sprint 3   |               5 | Theo Sprint Plan | Theo Sprint Plan | expired-batch, sellable-stock, mvp       |
| US-34         | US-34 - Low-stock dựa trên sellable quantity                     | PAC-EPIC-05 - Inventory & MedicineBatch            | Inventory & MedicineBatch                 | High         | Sprint 3   |               3 | Theo Sprint Plan | Theo Sprint Plan | low-stock, inventory, mvp                |
| US-35         | US-35 - Near-expiry theo threshold cấu hình                      | PAC-EPIC-05 - Inventory & MedicineBatch            | Inventory & MedicineBatch                 | High         | Sprint 3   |               3 | Theo Sprint Plan | Theo Sprint Plan | near-expiry, settings, mvp               |
| US-36         | US-36 - Inventory dashboard cho Admin/Warehouse                  | PAC-EPIC-05 - Inventory & MedicineBatch            | Inventory & MedicineBatch                 | Medium       | Sprint 3   |               3 | Theo Sprint Plan | Theo Sprint Plan | dashboard, inventory, mvp                |
| US-37         | US-37 - POS chỉ xem sellable stock cần bán                       | PAC-EPIC-05 - Inventory & MedicineBatch            | Inventory & MedicineBatch                 | High         | Sprint 3   |               3 | Theo Sprint Plan | Theo Sprint Plan | pos-stock, staff, mvp                    |
| US-38         | US-38 - Chặn sửa trực tiếp quantity trong Batch Detail           | PAC-EPIC-05 - Inventory & MedicineBatch            | Inventory & MedicineBatch                 | Highest      | Sprint 3   |               3 | Theo Sprint Plan | Theo Sprint Plan | quantity, guardrail, mvp                 |
| US-39         | US-39 - Tạo phiếu nhập kho draft                                 | PAC-EPIC-06 - Stock Import                         | Stock Import                              | High         | Sprint 3   |               5 | Theo Sprint Plan | Theo Sprint Plan | stock-import, draft, mvp                 |
| US-40         | US-40 - Thêm dòng thuốc vào phiếu nhập                           | PAC-EPIC-06 - Stock Import                         | Stock Import                              | High         | Sprint 3   |               5 | Theo Sprint Plan | Theo Sprint Plan | stock-import-line, mvp                   |
| US-41         | US-41 - Cập nhật/xóa dòng nhập khi còn draft                     | PAC-EPIC-06 - Stock Import                         | Stock Import                              | Medium       | Sprint 3   |               3 | Theo Sprint Plan | Theo Sprint Plan | stock-import, draft-edit, mvp            |
| US-42         | US-42 - Validate supplier trong phiếu nhập                       | PAC-EPIC-06 - Stock Import                         | Stock Import                              | High         | Sprint 3   |               3 | Theo Sprint Plan | Theo Sprint Plan | supplier, validation, mvp                |
| US-43         | US-43 - Validate batch number và expiry date                     | PAC-EPIC-06 - Stock Import                         | Stock Import                              | Highest      | Sprint 3   |               5 | Theo Sprint Plan | Theo Sprint Plan | batch, expiry, validation, mvp           |
| US-44         | US-44 - Confirm Stock Import transaction                         | PAC-EPIC-06 - Stock Import                         | Stock Import                              | Highest      | Sprint 3   |               8 | Theo Sprint Plan | Theo Sprint Plan | confirm, transaction, mvp                |
| US-45         | US-45 - Merge batch khi medicine/batch/expiry trùng              | PAC-EPIC-06 - Stock Import                         | Stock Import                              | Highest      | Sprint 3   |               5 | Theo Sprint Plan | Theo Sprint Plan | batch-merge, mvp                         |
| US-46         | US-46 - Reject batch khi cùng batch nhưng khác expiry            | PAC-EPIC-06 - Stock Import                         | Stock Import                              | Highest      | Sprint 3   |               5 | Theo Sprint Plan | Theo Sprint Plan | expiry-mismatch, reject, mvp             |
| US-47         | US-47 - Khóa phiếu nhập đã confirmed                             | PAC-EPIC-06 - Stock Import                         | Stock Import                              | High         | Sprint 3   |               3 | Theo Sprint Plan | Theo Sprint Plan | confirmed, immutable, mvp                |
| US-48         | US-48 - Audit Stock Import                                       | PAC-EPIC-06 - Stock Import                         | Stock Import                              | Medium       | Sprint 3   |               3 | Theo Sprint Plan | Theo Sprint Plan | audit, stock-import, mvp                 |
| US-49         | US-49 - Tạo Inventory Adjustment                                 | PAC-EPIC-07 - Inventory Adjustment                 | Inventory Adjustment                      | High         | Sprint 4   |               5 | Theo Sprint Plan | Theo Sprint Plan | inventory-adjustment, mvp                |
| US-50         | US-50 - Adjustment bắt buộc reason                               | PAC-EPIC-07 - Inventory Adjustment                 | Inventory Adjustment                      | Highest      | Sprint 4   |               3 | Theo Sprint Plan | Theo Sprint Plan | reason, validation, mvp                  |
| US-51         | US-51 - Chọn MedicineBatch cần điều chỉnh                        | PAC-EPIC-07 - Inventory Adjustment                 | Inventory Adjustment                      | High         | Sprint 4   |               3 | Theo Sprint Plan | Theo Sprint Plan | medicinebatch, adjustment, mvp           |
| US-52         | US-52 - Confirm Inventory Adjustment transaction                 | PAC-EPIC-07 - Inventory Adjustment                 | Inventory Adjustment                      | High         | Sprint 4   |               5 | Theo Sprint Plan | Theo Sprint Plan | confirm, transaction, mvp                |
| US-53         | US-53 - Chặn adjustment làm quantity âm                          | PAC-EPIC-07 - Inventory Adjustment                 | Inventory Adjustment                      | High         | Sprint 4   |               3 | Theo Sprint Plan | Theo Sprint Plan | validation, negative-stock, mvp          |
| US-54         | US-54 - Warehouse tạo và confirm adjustment                      | PAC-EPIC-07 - Inventory Adjustment                 | Inventory Adjustment                      | Medium       | Sprint 4   |               3 | Theo Sprint Plan | Theo Sprint Plan | warehouse, permission, mvp               |
| US-55         | US-55 - Audit Inventory Adjustment                               | PAC-EPIC-07 - Inventory Adjustment                 | Inventory Adjustment                      | Medium       | Sprint 4   |               3 | Theo Sprint Plan | Theo Sprint Plan | audit, adjustment, mvp                   |
| US-56         | US-56 - Admin xem lịch sử adjustment                             | PAC-EPIC-07 - Inventory Adjustment                 | Inventory Adjustment                      | Medium       | Sprint 4   |               2 | Theo Sprint Plan | Theo Sprint Plan | admin, history, mvp                      |
| US-57         | US-57 - Tạo Draft Order tại POS                                  | PAC-EPIC-08 - POS Draft Order                      | POS & Checkout                            | Highest      | Sprint 4   |               5 | Theo Sprint Plan | Theo Sprint Plan | pos, draft-order, mvp                    |
| US-58         | US-58 - Tìm thuốc trong POS                                      | PAC-EPIC-08 - POS Draft Order                      | POS & Checkout                            | High         | Sprint 4   |               3 | Theo Sprint Plan | Theo Sprint Plan | pos, medicine-search, mvp                |
| US-59         | US-59 - Thêm thuốc vào Draft Order                               | PAC-EPIC-08 - POS Draft Order                      | POS & Checkout                            | Highest      | Sprint 4   |               5 | Theo Sprint Plan | Theo Sprint Plan | pos, order-item, mvp                     |
| US-60         | US-60 - Cập nhật số lượng thuốc trong Draft Order                | PAC-EPIC-08 - POS Draft Order                      | POS & Checkout                            | High         | Sprint 4   |               3 | Theo Sprint Plan | Theo Sprint Plan | quantity, draft-order, mvp               |
| US-61         | US-61 - Xóa thuốc khỏi Draft Order                               | PAC-EPIC-08 - POS Draft Order                      | POS & Checkout                            | Medium       | Sprint 4   |               2 | Theo Sprint Plan | Theo Sprint Plan | remove-item, pos, mvp                    |
| US-62         | US-62 - Tính tổng tiền Draft Order                               | PAC-EPIC-08 - POS Draft Order                      | POS & Checkout                            | High         | Sprint 4   |               3 | Theo Sprint Plan | Theo Sprint Plan | total, order, mvp                        |
| US-63         | US-63 - Validate sellable stock khi lập đơn                      | PAC-EPIC-08 - POS Draft Order                      | POS & Checkout                            | Highest      | Sprint 4   |               5 | Theo Sprint Plan | Theo Sprint Plan | stock-validation, pos, mvp               |
| US-64         | US-64 - Hỗ trợ walk-in/anonymous customer                        | PAC-EPIC-08 - POS Draft Order                      | POS & Checkout                            | High         | Sprint 4   |               3 | Theo Sprint Plan | Theo Sprint Plan | walk-in, customer, mvp                   |
| US-65         | US-65 - Staff chỉ xem đơn trong ownership scope                  | PAC-EPIC-08 - POS Draft Order                      | POS & Checkout                            | High         | Sprint 4   |               3 | Theo Sprint Plan | Theo Sprint Plan | staff-scope, order, mvp                  |
| US-66         | US-66 - Admin xem tất cả đơn hàng                                | PAC-EPIC-08 - POS Draft Order                      | POS & Checkout                            | Medium       | Sprint 4   |               2 | Theo Sprint Plan | Theo Sprint Plan | admin, order-list, mvp                   |
| US-67         | US-67 - Hủy Draft Order                                          | PAC-EPIC-08 - POS Draft Order                      | POS & Checkout                            | Medium       | Sprint 4   |               3 | Theo Sprint Plan | Theo Sprint Plan | cancel, draft-order, mvp                 |
| US-68         | US-68 - Giữ Draft Order khi checkout fail                        | PAC-EPIC-08 - POS Draft Order                      | POS & Checkout                            | Highest      | Sprint 4   |               5 | Theo Sprint Plan | Theo Sprint Plan | checkout-fail, draft-order, mvp          |
| US-69         | US-69 - Tạo DrugInteraction Rule cấp ActiveIngredient            | PAC-EPIC-09 - DrugInteraction Rule                 | InteractionAlert                          | Highest      | Sprint 5   |               5 | Theo Sprint Plan | Theo Sprint Plan | interaction-rule, active-ingredient, mvp |
| US-70         | US-70 - Cập nhật/deactivate DrugInteraction Rule                 | PAC-EPIC-09 - DrugInteraction Rule                 | InteractionAlert                          | High         | Sprint 5   |               3 | Theo Sprint Plan | Theo Sprint Plan | interaction-rule, admin, mvp             |
| US-71         | US-71 - Severity chỉ gồm LOW/MEDIUM/HIGH                         | PAC-EPIC-09 - DrugInteraction Rule                 | InteractionAlert                          | High         | Sprint 5   |               2 | Theo Sprint Plan | Theo Sprint Plan | severity, validation, mvp                |
| US-72         | US-72 - Derive medicine interaction từ active ingredients        | PAC-EPIC-09 - DrugInteraction Rule                 | InteractionAlert                          | Highest      | Sprint 5   |               5 | Theo Sprint Plan | Theo Sprint Plan | derived-interaction, mvp                 |
| US-73         | US-73 - Check interaction khi order có từ hai thuốc              | PAC-EPIC-10 - InteractionAlert Lifecycle           | InteractionAlert                          | Highest      | Sprint 5   |               5 | Theo Sprint Plan | Theo Sprint Plan | order-interaction, mvp                   |
| US-74         | US-74 - Persist InteractionAlert đã hiển thị                     | PAC-EPIC-10 - InteractionAlert Lifecycle           | InteractionAlert                          | Highest      | Sprint 5   |               5 | Theo Sprint Plan | Theo Sprint Plan | interaction-alert, persist, mvp          |
| US-75         | US-75 - Một active alert cho order_id + interaction_id           | PAC-EPIC-10 - InteractionAlert Lifecycle           | InteractionAlert                          | Highest      | Sprint 5   |               5 | Theo Sprint Plan | Theo Sprint Plan | alert-unique, mvp                        |
| US-76         | US-76 - Update last_displayed_at và display_count                | PAC-EPIC-10 - InteractionAlert Lifecycle           | InteractionAlert                          | High         | Sprint 5   |               3 | Theo Sprint Plan | Theo Sprint Plan | display-count, alert, mvp                |
| US-77         | US-77 - Hiển thị alert LOW/MEDIUM/HIGH trong POS                 | PAC-EPIC-10 - InteractionAlert Lifecycle           | InteractionAlert                          | High         | Sprint 5   |               3 | Theo Sprint Plan | Theo Sprint Plan | alert-ui, pos, mvp                       |
| US-78         | US-78 - HIGH alert acknowledgement                               | PAC-EPIC-10 - InteractionAlert Lifecycle           | InteractionAlert                          | Highest      | Sprint 5   |               5 | Theo Sprint Plan | Theo Sprint Plan | high-alert, acknowledgement, mvp         |
| US-79         | US-79 - HIGH alert consultation note                             | PAC-EPIC-10 - InteractionAlert Lifecycle           | InteractionAlert                          | Highest      | Sprint 5   |               5 | Theo Sprint Plan | Theo Sprint Plan | consultation-note, high-alert, mvp       |
| US-80         | US-80 - Block checkout nếu HIGH unresolved                       | PAC-EPIC-10 - InteractionAlert Lifecycle           | InteractionAlert                          | Highest      | Sprint 5   |               5 | Theo Sprint Plan | Theo Sprint Plan | checkout-block, high-alert, mvp          |
| US-81         | US-81 - Admin xem InteractionAlert History                       | PAC-EPIC-10 - InteractionAlert Lifecycle           | InteractionAlert                          | High         | Sprint 5   |               3 | Theo Sprint Plan | Theo Sprint Plan | alert-history, admin, mvp                |
| US-82         | US-82 - Warehouse không truy cập InteractionAlert                | PAC-EPIC-10 - InteractionAlert Lifecycle           | InteractionAlert                          | High         | Sprint 5   |               2 | Theo Sprint Plan | Theo Sprint Plan | warehouse, permission, mvp               |
| US-83         | US-83 - Checkout API transaction                                 | PAC-EPIC-11 - Checkout, FEFO, Payment & Invoice    | POS & Checkout                            | Highest      | Sprint 6   |               8 | Theo Sprint Plan | Theo Sprint Plan | checkout, transaction, mvp               |
| US-84         | US-84 - Checkout validation pipeline                             | PAC-EPIC-11 - Checkout, FEFO, Payment & Invoice    | POS & Checkout                            | Highest      | Sprint 6   |               5 | Theo Sprint Plan | Theo Sprint Plan | validation, checkout, mvp                |
| US-85         | US-85 - Validate order status DRAFT                              | PAC-EPIC-11 - Checkout, FEFO, Payment & Invoice    | POS & Checkout                            | Highest      | Sprint 6   |               3 | Theo Sprint Plan | Theo Sprint Plan | order-status, checkout, mvp              |
| US-86         | US-86 - Validate unresolved HIGH alerts                          | PAC-EPIC-11 - Checkout, FEFO, Payment & Invoice    | POS & Checkout                            | Highest      | Sprint 6   |               5 | Theo Sprint Plan | Theo Sprint Plan | high-alert, checkout, mvp                |
| US-87         | US-87 - Validate sellable stock trước checkout                   | PAC-EPIC-11 - Checkout, FEFO, Payment & Invoice    | POS & Checkout                            | Highest      | Sprint 6   |               5 | Theo Sprint Plan | Theo Sprint Plan | sellable-stock, checkout, mvp            |
| US-88         | US-88 - FEFO allocation service                                  | PAC-EPIC-11 - Checkout, FEFO, Payment & Invoice    | POS & Checkout, Inventory & MedicineBatch | Highest      | Sprint 6   |               8 | Theo Sprint Plan | Theo Sprint Plan | fefo, allocation, mvp                    |
| US-89         | US-89 - Multi-batch allocation persistence                       | PAC-EPIC-11 - Checkout, FEFO, Payment & Invoice    | POS & Checkout, Inventory & MedicineBatch | Highest      | Sprint 6   |               5 | Theo Sprint Plan | Theo Sprint Plan | order-batch-allocation, mvp              |
| US-90         | US-90 - Trừ batch quantity trong transaction                     | PAC-EPIC-11 - Checkout, FEFO, Payment & Invoice    | POS & Checkout                            | Highest      | Sprint 6   |               5 | Theo Sprint Plan | Theo Sprint Plan | batch-deduction, transaction, mvp        |
| US-91         | US-91 - Idempotent checkout                                      | PAC-EPIC-11 - Checkout, FEFO, Payment & Invoice    | POS & Checkout                            | Highest      | Sprint 6   |               5 | Theo Sprint Plan | Theo Sprint Plan | idempotency, checkout, mvp               |
| US-92         | US-92 - Rollback khi checkout failure                            | PAC-EPIC-11 - Checkout, FEFO, Payment & Invoice    | POS & Checkout                            | Highest      | Sprint 6   |               5 | Theo Sprint Plan | Theo Sprint Plan | rollback, transaction, mvp               |
| US-93         | US-93 - Cash payment handling                                    | PAC-EPIC-11 - Checkout, FEFO, Payment & Invoice    | POS & Checkout                            | High         | Sprint 6   |               5 | Theo Sprint Plan | Theo Sprint Plan | cash-payment, mvp                        |
| US-94         | US-94 - Tính change_amount cho thanh toán tiền mặt               | PAC-EPIC-11 - Checkout, FEFO, Payment & Invoice    | POS & Checkout                            | High         | Sprint 6   |               3 | Theo Sprint Plan | Theo Sprint Plan | change-amount, cash, mvp                 |
| US-95         | US-95 - Simulated bank transfer transaction_reference            | PAC-EPIC-11 - Checkout, FEFO, Payment & Invoice    | POS & Checkout                            | Medium       | Sprint 6   |               3 | Theo Sprint Plan | Theo Sprint Plan | bank-transfer, reference, mvp            |
| US-96         | US-96 - One SUCCESS payment rule                                 | PAC-EPIC-11 - Checkout, FEFO, Payment & Invoice    | POS & Checkout                            | Highest      | Sprint 6   |               5 | Theo Sprint Plan | Theo Sprint Plan | payment, success-unique, mvp             |
| US-97         | US-97 - Invoice generated inside checkout                        | PAC-EPIC-11 - Checkout, FEFO, Payment & Invoice    | POS & Checkout                            | Highest      | Sprint 6   |               5 | Theo Sprint Plan | Theo Sprint Plan | invoice, checkout, mvp                   |
| US-98         | US-98 - Xem/in invoice sau checkout                              | PAC-EPIC-11 - Checkout, FEFO, Payment & Invoice    | POS & Checkout                            | Medium       | Sprint 6   |               3 | Theo Sprint Plan | Theo Sprint Plan | invoice, print, mvp                      |
| US-99         | US-99 - AI explanation for InteractionAlert                      | PAC-EPIC-12 - AI Copilot                           | AI Guardrail & Audit                      | High         | Sprint 7   |               5 | Theo Sprint Plan | Theo Sprint Plan | ai, interaction-alert, mvp               |
| US-100        | US-100 - AI consultation note draft                              | PAC-EPIC-12 - AI Copilot                           | AI Guardrail & Audit                      | High         | Sprint 7   |               5 | Theo Sprint Plan | Theo Sprint Plan | ai, consultation-draft, mvp              |
| US-101        | US-101 - Staff confirm AI draft before official save             | PAC-EPIC-12 - AI Copilot                           | AI Guardrail & Audit                      | Highest      | Sprint 7   |               5 | Theo Sprint Plan | Theo Sprint Plan | ai-confirmation, safety, mvp             |
| US-102        | US-102 - Safe follow-up questions                                | PAC-EPIC-12 - AI Copilot                           | AI Guardrail & Audit                      | Medium       | Sprint 7   |               3 | Theo Sprint Plan | Theo Sprint Plan | ai, follow-up, mvp                       |
| US-103        | US-103 - Google AI provider primary                              | PAC-EPIC-12 - AI Copilot                           | AI Guardrail & Audit                      | High         | Sprint 7   |               5 | Theo Sprint Plan | Theo Sprint Plan | google-ai, provider, mvp                 |
| US-104        | US-104 - MockAI fallback provider                                | PAC-EPIC-12 - AI Copilot                           | AI Guardrail & Audit                      | High         | Sprint 7   |               3 | Theo Sprint Plan | Theo Sprint Plan | mockai, fallback, mvp                    |
| US-105        | US-105 - AI input guardrail                                      | PAC-EPIC-13 - AI Guardrail & AI Audit              | AI Guardrail & Audit                      | Highest      | Sprint 7   |               5 | Theo Sprint Plan | Theo Sprint Plan | input-guardrail, ai-safety, mvp          |
| US-106        | US-106 - Block diagnosis requests                                | PAC-EPIC-13 - AI Guardrail & AI Audit              | AI Guardrail & Audit                      | Highest      | Sprint 7   |               3 | Theo Sprint Plan | Theo Sprint Plan | diagnosis-block, ai-safety, mvp          |
| US-107        | US-107 - Block prescribing requests                              | PAC-EPIC-13 - AI Guardrail & AI Audit              | AI Guardrail & Audit                      | Highest      | Sprint 7   |               3 | Theo Sprint Plan | Theo Sprint Plan | prescribing-block, ai-safety, mvp        |
| US-108        | US-108 - Block dosage advice requests                            | PAC-EPIC-13 - AI Guardrail & AI Audit              | AI Guardrail & Audit                      | Highest      | Sprint 7   |               3 | Theo Sprint Plan | Theo Sprint Plan | dosage-block, ai-safety, mvp             |
| US-109        | US-109 - AI output guardrail                                     | PAC-EPIC-13 - AI Guardrail & AI Audit              | AI Guardrail & Audit                      | Highest      | Sprint 7   |               5 | Theo Sprint Plan | Theo Sprint Plan | output-guardrail, ai-safety, mvp         |
| US-110        | US-110 - Structured output validation                            | PAC-EPIC-13 - AI Guardrail & AI Audit              | AI Guardrail & Audit                      | High         | Sprint 7   |               3 | Theo Sprint Plan | Theo Sprint Plan | structured-output, validation, mvp       |
| US-111        | US-111 - PII minimization before AI call                         | PAC-EPIC-13 - AI Guardrail & AI Audit              | AI Guardrail & Audit                      | High         | Sprint 7   |               3 | Theo Sprint Plan | Theo Sprint Plan | pii, privacy, ai, mvp                    |
| US-112        | US-112 - AI safe error response                                  | PAC-EPIC-13 - AI Guardrail & AI Audit              | AI Guardrail & Audit                      | High         | Sprint 7   |               3 | Theo Sprint Plan | Theo Sprint Plan | safe-error, ai, mvp                      |
| US-113        | US-113 - AI disclaimer                                           | PAC-EPIC-13 - AI Guardrail & AI Audit              | AI Guardrail & Audit                      | Medium       | Sprint 7   |               2 | Theo Sprint Plan | Theo Sprint Plan | disclaimer, ai-safety, mvp               |
| US-114        | US-114 - AI Audit metadata                                       | PAC-EPIC-13 - AI Guardrail & AI Audit              | AI Guardrail & Audit                      | High         | Sprint 7   |               5 | Theo Sprint Plan | Theo Sprint Plan | ai-audit, metadata, mvp                  |
| US-115        | US-115 - Prompt template versioning                              | PAC-EPIC-13 - AI Guardrail & AI Audit              | AI Guardrail & Audit                      | High         | Sprint 7   |               3 | Theo Sprint Plan | Theo Sprint Plan | prompt-version, ai, mvp                  |
| US-116        | US-116 - Admin AI Audit Log view                                 | PAC-EPIC-13 - AI Guardrail & AI Audit              | AI Guardrail & Audit                      | Medium       | Sprint 7   |               3 | Theo Sprint Plan | Theo Sprint Plan | ai-audit, admin, mvp                     |
| US-117        | US-117 - Graph Sync Outbox                                       | PAC-EPIC-14 - Graph Sync & Neo4j Projection        | Graph Sync & Graph-RAG                    | Highest      | Sprint 8   |               5 | Theo Sprint Plan | Theo Sprint Plan | graph-sync, outbox, mvp                  |
| US-118        | US-118 - Graph Sync Worker                                       | PAC-EPIC-14 - Graph Sync & Neo4j Projection        | Graph Sync & Graph-RAG                    | Highest      | Sprint 8   |               5 | Theo Sprint Plan | Theo Sprint Plan | graph-worker, neo4j, mvp                 |
| US-119        | US-119 - Project Medicine node to Neo4j                          | PAC-EPIC-14 - Graph Sync & Neo4j Projection        | Graph Sync & Graph-RAG                    | High         | Sprint 8   |               3 | Theo Sprint Plan | Theo Sprint Plan | neo4j, medicine, mvp                     |
| US-120        | US-120 - Project ActiveIngredient node to Neo4j                  | PAC-EPIC-14 - Graph Sync & Neo4j Projection        | Graph Sync & Graph-RAG                    | High         | Sprint 8   |               3 | Theo Sprint Plan | Theo Sprint Plan | neo4j, active-ingredient, mvp            |
| US-121        | US-121 - Project CONTAINS relationship                           | PAC-EPIC-14 - Graph Sync & Neo4j Projection        | Graph Sync & Graph-RAG                    | High         | Sprint 8   |               3 | Theo Sprint Plan | Theo Sprint Plan | neo4j, contains, mvp                     |
| US-122        | US-122 - Project INTERACTS_WITH relationship                     | PAC-EPIC-14 - Graph Sync & Neo4j Projection        | Graph Sync & Graph-RAG                    | Highest      | Sprint 8   |               5 | Theo Sprint Plan | Theo Sprint Plan | neo4j, interacts-with, mvp               |
| US-123        | US-123 - Canonical directed interaction edge                     | PAC-EPIC-14 - Graph Sync & Neo4j Projection        | Graph Sync & Graph-RAG                    | High         | Sprint 8   |               3 | Theo Sprint Plan | Theo Sprint Plan | graph-rule, canonical, mvp               |
| US-124        | US-124 - Store graph projection metadata                         | PAC-EPIC-14 - Graph Sync & Neo4j Projection        | Graph Sync & Graph-RAG                    | High         | Sprint 8   |               3 | Theo Sprint Plan | Theo Sprint Plan | source-version, synced-at, mvp           |
| US-125        | US-125 - Retry failed graph sync jobs                            | PAC-EPIC-14 - Graph Sync & Neo4j Projection        | Graph Sync & Graph-RAG                    | High         | Sprint 8   |               3 | Theo Sprint Plan | Theo Sprint Plan | retry, graph-sync, mvp                   |
| US-126        | US-126 - Log graph sync failures                                 | PAC-EPIC-14 - Graph Sync & Neo4j Projection        | Graph Sync & Graph-RAG                    | High         | Sprint 8   |               3 | Theo Sprint Plan | Theo Sprint Plan | logging, graph-sync, mvp                 |
| US-127        | US-127 - Graph freshness detection                               | PAC-EPIC-14 - Graph Sync & Neo4j Projection        | Graph Sync & Graph-RAG                    | Highest      | Sprint 8   |               5 | Theo Sprint Plan | Theo Sprint Plan | freshness, graph, mvp                    |
| US-128        | US-128 - Deactivated graph entity with isActive=false            | PAC-EPIC-14 - Graph Sync & Neo4j Projection        | Graph Sync & Graph-RAG                    | Medium       | Sprint 8   |               3 | Theo Sprint Plan | Theo Sprint Plan | deactivate, graph, mvp                   |
| US-129        | US-129 - Graph-RAG interaction explanation                       | PAC-EPIC-15 - Graph-RAG                            | Graph Sync & Graph-RAG                    | High         | Sprint 9   |               5 | Theo Sprint Plan | Theo Sprint Plan | graph-rag, explanation, mvp              |
| US-130        | US-130 - Graph-RAG provenance metadata                           | PAC-EPIC-15 - Graph-RAG                            | Graph Sync & Graph-RAG                    | High         | Sprint 9   |               3 | Theo Sprint Plan | Theo Sprint Plan | provenance, graph-rag, mvp               |
| US-131        | US-131 - Graph-RAG freshness metadata                            | PAC-EPIC-15 - Graph-RAG                            | Graph Sync & Graph-RAG                    | Highest      | Sprint 9   |               3 | Theo Sprint Plan | Theo Sprint Plan | freshness, graph-rag, mvp                |
| US-132        | US-132 - PostgreSQL fallback khi Neo4j unavailable               | PAC-EPIC-15 - Graph-RAG                            | Graph Sync & Graph-RAG                    | Highest      | Sprint 9   |               5 | Theo Sprint Plan | Theo Sprint Plan | fallback, postgresql, mvp                |
| US-133        | US-133 - PostgreSQL fallback khi graph stale                     | PAC-EPIC-15 - Graph-RAG                            | Graph Sync & Graph-RAG                    | Highest      | Sprint 9   |               5 | Theo Sprint Plan | Theo Sprint Plan | stale-graph, fallback, mvp               |
| US-134        | US-134 - Safe error cho graph-only query                         | PAC-EPIC-15 - Graph-RAG                            | Graph Sync & Graph-RAG                    | High         | Sprint 9   |               3 | Theo Sprint Plan | Theo Sprint Plan | safe-error, graph-rag, mvp               |
| US-135        | US-135 - Không cho Staff submit raw Cypher                       | PAC-EPIC-15 - Graph-RAG                            | Graph Sync & Graph-RAG                    | Highest      | Sprint 9   |               2 | Theo Sprint Plan | Theo Sprint Plan | raw-cypher, security, mvp                |
| US-136        | US-136 - Graph không quyết định checkout                         | PAC-EPIC-15 - Graph-RAG                            | Graph Sync & Graph-RAG                    | Highest      | Sprint 9   |               2 | Theo Sprint Plan | Theo Sprint Plan | checkout, graph-guard, mvp               |
| US-137        | US-137 - Revenue Report                                          | PAC-EPIC-16 - Reports                              | Reports                                   | Medium       | Sprint 9   |               3 | Theo Sprint Plan | Theo Sprint Plan | revenue-report, mvp                      |
| US-138        | US-138 - Top Medicines Report                                    | PAC-EPIC-16 - Reports                              | Reports                                   | Medium       | Sprint 9   |               3 | Theo Sprint Plan | Theo Sprint Plan | top-medicines, report, mvp               |
| US-139        | US-139 - Inventory Report                                        | PAC-EPIC-16 - Reports                              | Reports                                   | Medium       | Sprint 9   |               3 | Theo Sprint Plan | Theo Sprint Plan | inventory-report, mvp                    |
| US-140        | US-140 - Basic report filters                                    | PAC-EPIC-16 - Reports                              | Reports                                   | Low          | Sprint 9   |               2 | Theo Sprint Plan | Theo Sprint Plan | report-filter, mvp                       |
| US-141        | US-141 - Near-expiry threshold setting                           | PAC-EPIC-17 - System Settings                      | Inventory & MedicineBatch                 | High         | Sprint 3   |               3 | Theo Sprint Plan | Theo Sprint Plan | setting, near-expiry, mvp                |
| US-142        | US-142 - AI provider/model backend config                        | PAC-EPIC-17 - System Settings                      | AI Guardrail & Audit                      | High         | Sprint 7   |               3 | Theo Sprint Plan | Theo Sprint Plan | ai-config, provider, mvp                 |
| US-143        | US-143 - Seed official prompt templates                          | PAC-EPIC-17 - System Settings                      | AI Guardrail & Audit                      | High         | Sprint 7   |               3 | Theo Sprint Plan | Theo Sprint Plan | prompt-template, seed, mvp               |
| US-144        | US-144 - System settings UI tối thiểu                            | PAC-EPIC-17 - System Settings                      | Inventory & MedicineBatch                 | Medium       | Sprint 3   |               3 | Theo Sprint Plan | Theo Sprint Plan | system-settings, ui, mvp                 |
| US-145        | US-145 - Curated MVP seed data                                   | PAC-EPIC-18 - Data Seed & Demo Reset               | Data & Demo                               | High         | Sprint 10  |               5 | Theo Sprint Plan | Theo Sprint Plan | seed-data, mvp                           |
| US-146        | US-146 - Demo users by role                                      | PAC-EPIC-18 - Data Seed & Demo Reset               | Data & Demo                               | High         | Sprint 10  |               3 | Theo Sprint Plan | Theo Sprint Plan | demo-users, roles, mvp                   |
| US-147        | US-147 - Dynamic expiry dates for demo                           | PAC-EPIC-18 - Data Seed & Demo Reset               | Data & Demo                               | High         | Sprint 10  |               3 | Theo Sprint Plan | Theo Sprint Plan | expiry, demo, mvp                        |
| US-148        | US-148 - FEFO multi-batch demo scenario                          | PAC-EPIC-18 - Data Seed & Demo Reset               | Data & Demo                               | Highest      | Sprint 10  |               5 | Theo Sprint Plan | Theo Sprint Plan | fefo, demo, mvp                          |
| US-149        | US-149 - Seed PAID order with HIGH alert                         | PAC-EPIC-18 - Data Seed & Demo Reset               | Data & Demo                               | Highest      | Sprint 10  |               5 | Theo Sprint Plan | Theo Sprint Plan | paid-order, high-alert, demo             |
| US-150        | US-150 - Local-only demo reset with graph rebuild and smoke test | PAC-EPIC-18 - Data Seed & Demo Reset               | Data & Demo                               | Highest      | Sprint 10  |               5 | Theo Sprint Plan | Theo Sprint Plan | demo-reset, graph-rebuild, smoke-test    |
| US-151        | US-151 - Admin Graph Sync Status UI                              | PAC-EPIC-22 - Admin Graph Sync Status UI           | Admin Graph Sync Status                   | Medium       | Sprint 11  |               3 | Sau MVP          | Sau MVP          | graph-sync-status, should-have           |
| US-152        | US-152 - Manual graph retry/rebuild UI                           | PAC-EPIC-22 - Admin Graph Sync Status UI           | Admin Graph Sync Status                   | Medium       | Sprint 11  |               3 | Sau MVP          | Sau MVP          | graph-retry, should-have                 |
| US-153        | US-153 - Read-only Graph Explorer                                | PAC-EPIC-23 - Read-only Graph Explorer             | Graph Explorer                            | Medium       | Sprint 11  |               5 | Sau MVP          | Sau MVP          | graph-explorer, should-have              |
| US-154        | US-154 - AI Provider Settings UI                                 | PAC-EPIC-24 - AI Provider & Prompt Management UI   | AI Provider Settings UI                   | Medium       | Sprint 11  |               3 | Sau MVP          | Sau MVP          | ai-provider-ui, should-have              |
| US-155        | US-155 - Prompt Management UI                                    | PAC-EPIC-24 - AI Provider & Prompt Management UI   | Prompt Management UI                      | Medium       | Sprint 11  |               3 | Sau MVP          | Sau MVP          | prompt-ui, should-have                   |
| US-156        | US-156 - System Audit Log UI                                     | PAC-EPIC-25 - System Audit Log UI                  | System Audit Log UI                       | Medium       | Sprint 11  |               3 | Sau MVP          | Sau MVP          | audit-log-ui, should-have                |
| US-157        | US-157 - Supabase Storage for medicine images                    | PAC-EPIC-26 - Supabase Storage for Medicine Images | Supabase Storage                          | Low          | Sprint 11  |               3 | Sau MVP          | Sau MVP          | storage, medicine-image, should-have     |
| US-158        | US-158 - Supabase Realtime inventory updates                     | PAC-EPIC-27 - Supabase Realtime Inventory Updates  | Supabase Realtime                         | Low          | Sprint 11  |               3 | Sau MVP          | Sau MVP          | realtime, inventory, should-have         |
| US-159        | US-159 - Notification Center                                     | PAC-EPIC-28 - Notification Center                  | Notification                              | Low          | Sprint 11  |               3 | Sau MVP          | Sau MVP          | notification, should-have                |
| US-160        | US-160 - AI Business Report Narrative                            | PAC-EPIC-29 - AI Business Report Narrative         | AI Business Narrative                     | Low          | Sprint 11  |               3 | Sau MVP          | Sau MVP          | ai-narrative, report, should-have        |
| US-161        | US-161 - Full Customer Management backlog                        | PAC-EPIC-31 - Full Customer Management             | Customer Management                       | Low          | Sprint 12  |               2 | Future           | Future           | customer, future                         |
| US-162        | US-162 - Online Commerce backlog                                 | PAC-EPIC-32 - Online Commerce                      | Online Commerce                           | Low          | Sprint 12  |               2 | Future           | Future           | ecommerce, future                        |
| US-163        | US-163 - Product Variant Catalog backlog                         | PAC-EPIC-33 - Product Variant Catalog              | Product Variant Catalog                   | Low          | Sprint 12  |               2 | Future           | Future           | product-variant, future                  |
| US-164        | US-164 - Multi-store support backlog                             | PAC-EPIC-34 - Multi-store / Multi-warehouse        | Multi-store / Multi-warehouse             | Low          | Sprint 12  |               2 | Future           | Future           | multi-store, future                      |
| US-165        | US-165 - Multi-warehouse support backlog                         | PAC-EPIC-34 - Multi-store / Multi-warehouse        | Multi-store / Multi-warehouse             | Low          | Sprint 12  |               2 | Future           | Future           | multi-warehouse, future                  |
| US-166        | US-166 - Stock Transfer backlog                                  | PAC-EPIC-35 - Stock Transfer                       | Stock Transfer                            | Low          | Sprint 12  |               2 | Future           | Future           | stock-transfer, future                   |
| US-167        | US-167 - Forecasting & Reorder backlog                           | PAC-EPIC-36 - Forecasting & Reorder Suggestions    | Forecasting                               | Low          | Sprint 12  |               2 | Future           | Future           | forecasting, reorder, future             |
| US-168        | US-168 - Promotion / Coupon backlog                              | PAC-EPIC-37 - Promotion / Coupon                   | Promotion / Coupon                        | Low          | Sprint 12  |               2 | Future           | Future           | promotion, coupon, future                |
| US-169        | US-169 - Shipping / Delivery backlog                             | PAC-EPIC-38 - Shipping / Delivery                  | Shipping                                  | Low          | Sprint 12  |               2 | Future           | Future           | shipping, delivery, future               |
| US-170        | US-170 - Review / CMS backlog                                    | PAC-EPIC-39 - Review / CMS                         | Review / CMS                              | Low          | Sprint 12  |               2 | Future           | Future           | review, cms, future                      |

---

# Description mẫu cho User Stories

## US-01 - Đăng nhập bằng Supabase Auth

Nhóm cần xây dựng chức năng đăng nhập cho người dùng nội bộ của nhà thuốc bằng Supabase Auth. Người dùng sẽ đăng nhập bằng email và mật khẩu được cấp, sau đó hệ thống lấy session hợp lệ để truy cập các chức năng nội bộ.

Lý do thực hiện:

Đăng nhập là nền tảng để bảo vệ dữ liệu và phân quyền theo vai trò trong hệ thống.

Acceptance Criteria:

* Người dùng đăng nhập thành công bằng Supabase Auth.
* Hệ thống không tự xử lý password trong PostgreSQL.
* Nếu thông tin đăng nhập sai, hệ thống hiển thị lỗi phù hợp.
* Sau khi đăng nhập thành công, người dùng được chuyển vào màn hình chính theo quyền.

## US-02 - Đăng xuất và dọn session

Nhóm cần xây dựng chức năng đăng xuất để người dùng có thể thoát khỏi hệ thống an toàn.

Acceptance Criteria:

* Người dùng bấm đăng xuất thì session hiện tại bị xóa.
* Người dùng được chuyển về màn hình login.
* Sau khi đăng xuất, người dùng không truy cập được trang nội bộ nếu chưa đăng nhập lại.

## US-03 - Xác thực session ở backend

Nhóm cần xây dựng cơ chế backend kiểm tra Supabase session/token trước khi cho phép gọi API nội bộ.

Acceptance Criteria:

* Backend validate session từ Supabase.
* API protected không cho request chưa đăng nhập.
* Không dùng custom JWT/password flow.
* Trả lỗi 401/403 rõ ràng khi session không hợp lệ.

## US-04 - Lấy thông tin người dùng hiện tại

Nhóm cần xây dựng API và UI để lấy thông tin user hiện tại, gồm profile, roles và permissions.

Acceptance Criteria:

* API trả về user profile hiện tại.
* API trả về roles và permissions của user.
* UI dùng dữ liệu này để hiển thị menu phù hợp.
* Không trả dữ liệu nhạy cảm không cần thiết.

## US-05 - Multi-role RBAC model

Nhóm cần thiết kế mô hình một user có thể có nhiều role.

Acceptance Criteria:

* Có bảng hoặc cấu trúc quản lý roles, permissions và user_roles.
* Một user có thể được gán nhiều role.
* Permission được dùng để kiểm tra quyền ở backend.
* Không hard-code toàn bộ quyền chỉ ở frontend.

## US-06 - Permission-based API Guard

Nhóm cần xây dựng guard kiểm tra permission ở backend trước khi xử lý API.

Acceptance Criteria:

* API quan trọng đều kiểm tra permission.
* Người không có quyền bị trả 403.
* Admin, Staff, Warehouse có quyền khác nhau.
* Backend là nơi enforce quyền chính thức.

## US-07 - Permission-aware frontend UI

Nhóm cần xây dựng giao diện hiển thị menu và action theo quyền của người dùng.

Acceptance Criteria:

* Menu hiển thị theo permissions.
* Button/action không phù hợp được ẩn hoặc disable.
* UI không thay thế backend authorization.
* Nếu user truy cập route không có quyền, hiển thị trang không có quyền.

## US-08 - Staff ownership scope

Nhóm cần giới hạn Staff chỉ xem hoặc thao tác đơn hàng trong phạm vi mình tạo/xử lý.

Acceptance Criteria:

* Staff chỉ xem order thuộc ownership scope.
* Admin xem được tất cả order.
* Backend query có filter ownership.
* Không chỉ ẩn dữ liệu ở frontend.

## US-09 - Warehouse access restrictions

Nhóm cần giới hạn Warehouse chỉ dùng các chức năng kho phù hợp.

Acceptance Criteria:

* Warehouse không truy cập POS checkout.
* Warehouse không truy cập InteractionAlert.
* Warehouse không sửa trực tiếp inventory quantity.
* Warehouse chỉ thao tác stock import, adjustment và supplier theo quyền được cho phép.

## US-10 - Admin tạo tài khoản nhân viên

Nhóm cần xây dựng chức năng Admin tạo tài khoản nhân viên bằng Supabase Admin integration.

Acceptance Criteria:

* Admin nhập email và thông tin profile nhân viên.
* Hệ thống tạo user qua Supabase, không lưu password trong PostgreSQL.
* Tài khoản mới có thể bắt buộc đổi password lần đầu.
* Có thể gán role cho nhân viên.

## US-11 - Đổi mật khẩu lần đầu

Nhóm cần xây dựng flow đổi mật khẩu lần đầu cho tài khoản nhân viên mới.

Acceptance Criteria:

* User có `must_change_password` phải đổi mật khẩu trước khi dùng hệ thống.
* Sau khi đổi thành công, trạng thái được cập nhật.
* Không cho bỏ qua bước này nếu bắt buộc.
* Không lưu password mới trong database ứng dụng.

## US-12 - Cập nhật trạng thái tài khoản nhân viên

Nhóm cần xây dựng chức năng Admin cập nhật trạng thái tài khoản nhân viên.

Acceptance Criteria:

* Admin có thể active/deactivate tài khoản.
* User bị deactivate không được sử dụng hệ thống.
* Thay đổi trạng thái được ghi audit nếu có.
* Không xóa cứng user có dữ liệu nghiệp vụ liên quan.

## US-13 - Thêm thuốc mới

Nhóm cần xây dựng chức năng thêm thuốc mới vào hệ thống.

Acceptance Criteria:

* Người có quyền có thể thêm thuốc.
* Các trường bắt buộc được validate.
* Giá bán phải lớn hơn 0.
* Thuốc mới xuất hiện trong danh sách sau khi tạo.

## US-14 - Cập nhật thông tin thuốc

Nhóm cần xây dựng chức năng cập nhật thông tin thuốc.

Acceptance Criteria:

* Người có quyền có thể chỉnh sửa thuốc.
* Hệ thống giữ dữ liệu hiện tại khi mở form.
* Validate các trường quan trọng trước khi lưu.
* Nếu thuốc thay đổi, hệ thống có thể tạo graph sync event liên quan.

## US-15 - Tìm kiếm và lọc thuốc

Nhóm cần xây dựng danh sách thuốc có tìm kiếm, lọc và phân trang.

Acceptance Criteria:

* Tìm theo tên hoặc mã thuốc.
* Lọc theo trạng thái hoặc danh mục nếu có.
* Có phân trang.
* Không có kết quả thì hiển thị thông báo phù hợp.

## US-16 - Deactivate thuốc

Nhóm cần xây dựng chức năng ngừng sử dụng thuốc thay vì xóa cứng.

Acceptance Criteria:

* Admin có thể deactivate thuốc.
* Thuốc inactive không được bán mới.
* Dữ liệu lịch sử order vẫn giữ được.
* Không xóa dữ liệu ảnh hưởng trace/audit.

## US-17 - Validate giá bán thuốc lớn hơn 0

Nhóm cần đảm bảo giá bán thuốc trong MVP luôn lớn hơn 0.

Acceptance Criteria:

* Không cho tạo thuốc có selling_price <= 0.
* Không cho cập nhật giá bán về 0 hoặc âm.
* Lỗi validation hiển thị rõ ràng ở UI/API.
* Rule này được enforce ở backend.

## US-18 - Quản lý ActiveIngredient

Nhóm cần xây dựng chức năng quản lý hoạt chất.

Acceptance Criteria:

* Admin có thể tạo/cập nhật/tìm kiếm ActiveIngredient.
* Không tạo trùng hoạt chất theo tên chuẩn hóa.
* ActiveIngredient có trạng thái active/inactive nếu cần.
* Dữ liệu này dùng cho rule tương tác thuốc.

## US-19 - Mapping Medicine với ActiveIngredient

Nhóm cần xây dựng chức năng gán một hoặc nhiều hoạt chất cho một thuốc.

Acceptance Criteria:

* Thuốc có thể có nhiều ActiveIngredient.
* Không cho mapping trùng.
* Mapping được dùng khi kiểm tra interaction.
* Khi mapping thay đổi, graph sync event được tạo.

## US-20 - Validate mapping hoạt chất không trùng

Nhóm cần validate mapping thuốc-hoạt chất để tránh dữ liệu sai.

Acceptance Criteria:

* Không cho cùng một thuốc gán cùng hoạt chất nhiều lần.
* Không cho mapping tới hoạt chất inactive nếu rule yêu cầu.
* Hiển thị lỗi rõ ràng khi mapping không hợp lệ.

## US-21 - Chuẩn hóa dữ liệu hoạt chất

Nhóm cần chuẩn hóa dữ liệu hoạt chất để tránh nhập thô hoặc trùng sai.

Acceptance Criteria:

* Tên hoạt chất được normalize cơ bản.
* Không dùng raw scraped string làm official ingredient.
* Có thể tìm và chọn hoạt chất đã tồn tại.
* Dữ liệu phục vụ interaction và graph ổn định.

## US-22 - Trigger Graph Sync khi Medicine/Ingredient thay đổi

Nhóm cần tạo graph sync event khi dữ liệu thuốc/hoạt chất/mapping thay đổi.

Acceptance Criteria:

* Medicine tạo/sửa/deactivate tạo outbox event.
* ActiveIngredient tạo/sửa/deactivate tạo outbox event.
* Mapping thay đổi tạo outbox event.
* Không ghi trực tiếp vào Neo4j từ UI.

## US-23 - Tạo nhà cung cấp

Nhóm cần xây dựng chức năng tạo supplier.

Acceptance Criteria:

* Warehouse hoặc Admin có thể tạo supplier.
* Các thông tin cơ bản được validate.
* Supplier mới có trạng thái active.
* Có thể dùng supplier khi tạo phiếu nhập.

## US-24 - Cập nhật và tìm kiếm nhà cung cấp

Nhóm cần xây dựng danh sách supplier có tìm kiếm và cập nhật.

Acceptance Criteria:

* Có thể tìm supplier theo tên hoặc thông tin liên hệ.
* Có thể cập nhật thông tin supplier.
* Không làm mất liên kết với stock import cũ.
* Warehouse được update theo quyền.

## US-25 - Admin deactivate nhà cung cấp

Nhóm cần giới hạn quyền deactivate supplier cho Admin.

Acceptance Criteria:

* Chỉ Admin deactivate supplier.
* Supplier inactive không dùng cho stock import mới.
* Lịch sử nhập kho cũ vẫn giữ supplier.
* Warehouse không có quyền deactivate.

## US-26 - Liên kết Supplier với Stock Import

Nhóm cần đảm bảo phiếu nhập kho có liên kết supplier đúng.

Acceptance Criteria:

* Stock Import chọn supplier active.
* Supplier được hiển thị trong chi tiết phiếu nhập.
* Không cho confirmed import mất supplier quan trọng.
* Dữ liệu hỗ trợ audit nhập kho.

## US-27 - Thiết kế MedicineBatch là source of truth

Nhóm cần thiết kế MedicineBatch làm nguồn dữ liệu chính cho tồn kho.

Acceptance Criteria:

* Tồn kho được tính từ MedicineBatch.
* Không dùng aggregate inventory làm source of truth.
* Batch có medicine, batch number, expiry date và quantity.
* Các luồng import, adjustment, checkout đều cập nhật batch.

## US-28 - Batch number bắt buộc

Nhóm cần đảm bảo mỗi batch thuốc có batch number.

Acceptance Criteria:

* Không cho tạo batch thiếu batch number.
* Batch number được normalize khi so sánh.
* Lỗi validation rõ ràng.
* Stock Import cũng bắt buộc batch number.

## US-29 - Batch identity theo medicine + batch + expiry

Nhóm cần định nghĩa danh tính batch dựa trên medicine, batch number và expiry date.

Acceptance Criteria:

* Batch được nhận diện bằng medicine_id + normalized batch_number + expiry_date.
* Không tạo duplicate batch sai quy tắc.
* Import thêm chỉ merge khi cả 3 yếu tố trùng.
* Expiry mismatch bị reject.

## US-30 - Inventory Summary từ MedicineBatch

Nhóm cần xây dựng màn hình tổng quan tồn kho lấy dữ liệu từ batch.

Acceptance Criteria:

* Inventory Summary tính tổng từ MedicineBatch.
* Hiển thị sellable quantity.
* Không tính batch hết hạn vào sellable quantity.
* Có tìm kiếm/lọc cơ bản.

## US-31 - Batch Detail view

Nhóm cần xây dựng màn hình xem chi tiết batch.

Acceptance Criteria:

* Hiển thị medicine, batch number, expiry date, quantity.
* Hiển thị trạng thái expired/near-expiry/sellable.
* Không cho sửa trực tiếp quantity.
* Có liên kết tới import/adjustment nếu cần.

## US-32 - Tính sellable quantity

Nhóm cần tính số lượng có thể bán từ các batch hợp lệ.

Acceptance Criteria:

* Chỉ tính batch chưa hết hạn.
* Chỉ tính batch còn quantity.
* Sellable quantity dùng cho POS và report.
* Backend là nơi tính chính thức.

## US-33 - Loại trừ batch hết hạn khỏi sellable stock

Nhóm cần đảm bảo thuốc hết hạn không được bán.

Acceptance Criteria:

* Expired batch không được tính sellable.
* POS không được bán từ expired batch.
* FEFO không chọn expired batch.
* Inventory vẫn có thể hiển thị expired batch để quản lý.

## US-34 - Low-stock dựa trên sellable quantity

Nhóm cần cảnh báo low-stock dựa trên số lượng bán được.

Acceptance Criteria:

* Low-stock tính từ sellable quantity.
* Không tính batch hết hạn.
* Admin/Warehouse thấy cảnh báo.
* Staff không thấy dashboard vận hành tổng quát, chỉ thấy cảnh báo liên quan POS.

## US-35 - Near-expiry theo threshold cấu hình

Nhóm cần xác định thuốc gần hết hạn theo threshold hệ thống.

Acceptance Criteria:

* Default threshold là 90 ngày.
* Admin có thể cấu hình threshold trong System Settings MVP.
* Near-expiry tính theo batch.
* Report/filter có thể dùng override nếu được scope.

## US-36 - Inventory dashboard cho Admin/Warehouse

Nhóm cần xây dựng dashboard tồn kho cho Admin/Warehouse.

Acceptance Criteria:

* Admin/Warehouse thấy low-stock và near-expiry.
* Staff không thấy dashboard vận hành tổng quát.
* Dữ liệu lấy từ MedicineBatch.
* Có trạng thái loading/empty/error.

## US-37 - POS chỉ xem sellable stock cần bán

Nhóm cần đảm bảo Staff trong POS chỉ thấy thông tin tồn kho phục vụ bán hàng.

Acceptance Criteria:

* POS hiển thị availability bán được.
* Không hiển thị dashboard vận hành rộng cho Staff.
* Không cho bán quá sellable quantity.
* UI cập nhật khi số lượng draft thay đổi.

## US-38 - Chặn sửa trực tiếp quantity trong Batch Detail

Nhóm cần chặn mọi chỉnh sửa quantity trực tiếp.

Acceptance Criteria:

* Batch Detail không có input sửa quantity trực tiếp.
* Muốn điều chỉnh phải tạo Inventory Adjustment.
* Backend cũng không có endpoint public sửa trực tiếp quantity.
* Ghi chú guardrail rõ trong UI/task.

## US-39 - Tạo phiếu nhập kho draft

Nhóm cần xây dựng chức năng tạo phiếu nhập kho ở trạng thái draft.

Acceptance Criteria:

* Warehouse/Admin có thể tạo draft.
* Draft lưu supplier, ngày nhập, ghi chú nếu có.
* Draft chưa làm thay đổi MedicineBatch.
* Có thể thêm dòng nhập sau khi tạo.

## US-40 - Thêm dòng thuốc vào phiếu nhập

Nhóm cần cho phép thêm nhiều dòng thuốc vào phiếu nhập.

Acceptance Criteria:

* Mỗi dòng có medicine, batch number, expiry date, quantity.
* Quantity phải lớn hơn 0.
* Medicine phải active.
* Lỗi validation hiển thị rõ.

## US-41 - Cập nhật/xóa dòng nhập khi còn draft

Nhóm cần cho phép chỉnh sửa dòng nhập khi phiếu còn draft.

Acceptance Criteria:

* Draft line có thể update/delete.
* Confirmed import không được sửa.
* UI phân biệt trạng thái draft/confirmed.
* Backend enforce trạng thái.

## US-42 - Validate supplier trong phiếu nhập

Nhóm cần validate supplier khi nhập kho.

Acceptance Criteria:

* Supplier phải tồn tại và active.
* Supplier hiển thị trong detail phiếu nhập.
* Nếu supplier inactive thì không cho confirm.
* Error message rõ ràng.

## US-43 - Validate batch number và expiry date

Nhóm cần validate batch identity trong stock import.

Acceptance Criteria:

* Batch number bắt buộc.
* Expiry date bắt buộc.
* Expiry date không được là ngày không hợp lệ.
* Normalize batch number trước khi so sánh.

## US-44 - Confirm Stock Import transaction

Nhóm cần xử lý confirm phiếu nhập bằng transaction.

Acceptance Criteria:

* Confirm import chạy transaction.
* Tạo mới hoặc cộng MedicineBatch đúng rule.
* Nếu một dòng lỗi thì rollback toàn bộ.
* Confirm xong phiếu bị khóa.

## US-45 - Merge batch khi medicine/batch/expiry trùng

Nhóm cần cộng quantity vào batch đã có nếu identity trùng.

Acceptance Criteria:

* Nếu medicine_id + batch_number + expiry_date trùng thì cộng quantity.
* Không tạo duplicate batch.
* Audit/history vẫn ghi nhận import.
* Quantity sau merge đúng.

## US-46 - Reject batch khi cùng batch nhưng khác expiry

Nhóm cần reject import nếu cùng medicine + batch number nhưng expiry khác.

Acceptance Criteria:

* Detect expiry mismatch.
* Không tạo batch mới để né lỗi.
* Không silently merge.
* Trả lỗi rõ ràng cho Warehouse.

## US-47 - Khóa phiếu nhập đã confirmed

Nhóm cần đảm bảo phiếu nhập đã confirmed không bị sửa.

Acceptance Criteria:

* Confirmed import không update/delete line.
* Không confirm lại cùng phiếu.
* UI disable action không hợp lệ.
* Backend enforce immutable state.

## US-48 - Audit Stock Import

Nhóm cần ghi nhận audit cho nghiệp vụ nhập kho.

Acceptance Criteria:

* Ghi actor, thời gian, hành động.
* Ghi thông tin confirm import.
* Có thể trace batch được tạo/cộng từ import.
* Không lưu dữ liệu thừa nhạy cảm.

## US-49 - Tạo Inventory Adjustment

Nhóm cần xây dựng chức năng tạo phiếu điều chỉnh tồn kho.

Acceptance Criteria:

* Admin/Warehouse tạo adjustment.
* Chọn batch cần điều chỉnh.
* Nhập số lượng tăng/giảm.
* Chưa confirm thì chưa đổi batch.

## US-50 - Adjustment bắt buộc reason

Nhóm cần bắt buộc lý do khi điều chỉnh tồn kho.

Acceptance Criteria:

* Reason là trường bắt buộc.
* Không cho confirm nếu thiếu reason.
* Reason hiển thị trong detail.
* Reason được audit.

## US-51 - Chọn MedicineBatch cần điều chỉnh

Nhóm cần đảm bảo adjustment tác động đến batch cụ thể.

Acceptance Criteria:

* User chọn MedicineBatch.
* Hiển thị thông tin batch trước khi điều chỉnh.
* Không điều chỉnh aggregate inventory.
* Batch inactive/không hợp lệ bị chặn nếu cần.

## US-52 - Confirm Inventory Adjustment transaction

Nhóm cần xử lý confirm adjustment bằng transaction.

Acceptance Criteria:

* Confirm adjustment cập nhật MedicineBatch.
* Không partial update nếu có lỗi.
* Adjustment confirmed bị khóa.
* Ghi audit confirm.

## US-53 - Chặn adjustment làm quantity âm

Nhóm cần ngăn điều chỉnh khiến batch quantity âm.

Acceptance Criteria:

* Backend kiểm tra quantity sau adjustment >= 0.
* UI hiển thị lỗi nếu vượt quá số lượng.
* Không lưu adjustment không hợp lệ.
* Test case có negative quantity.

## US-54 - Warehouse tạo và confirm adjustment

Nhóm cần cho Warehouse thực hiện adjustment theo quyền đã chốt.

Acceptance Criteria:

* Warehouse có quyền create/confirm adjustment.
* Warehouse không sửa trực tiếp batch quantity.
* Admin vẫn xem được lịch sử.
* Permission được enforce ở backend.

## US-55 - Audit Inventory Adjustment

Nhóm cần ghi nhật ký điều chỉnh tồn kho.

Acceptance Criteria:

* Ghi actor, reason, batch, quantity trước/sau.
* Audit không chỉnh sửa được qua UI.
* Có thể truy vết khi kiểm tra tồn kho.
* Không bỏ audit khi confirm.

## US-56 - Admin xem lịch sử adjustment

Nhóm cần cho Admin xem lịch sử điều chỉnh tồn kho.

Acceptance Criteria:

* Admin xem danh sách adjustment.
* Có filter cơ bản nếu cần.
* Hiển thị reason và người thực hiện.
* Warehouse chỉ xem theo quyền nếu được cho phép.

## US-57 - Tạo Draft Order tại POS

Nhóm cần xây dựng chức năng tạo đơn bán thuốc ở trạng thái Draft.

Acceptance Criteria:

* Staff/Admin tạo Draft Order.
* Draft Order chưa trừ tồn kho.
* Order status ban đầu là DRAFT.
* Có thể tiếp tục thêm thuốc vào đơn.

## US-58 - Tìm thuốc trong POS

Nhóm cần cho Staff tìm thuốc nhanh khi bán hàng.

Acceptance Criteria:

* Tìm theo tên/mã thuốc.
* Chỉ hiển thị thuốc active và bán được.
* Hiển thị sellable quantity.
* Có empty state nếu không tìm thấy.

## US-59 - Thêm thuốc vào Draft Order

Nhóm cần cho Staff thêm thuốc vào đơn nháp.

Acceptance Criteria:

* Thêm medicine vào order item.
* Quantity mặc định hợp lệ.
* Tính thành tiền từng dòng.
* Không cho thêm thuốc inactive.

## US-60 - Cập nhật số lượng thuốc trong Draft Order

Nhóm cần cho Staff cập nhật quantity trong đơn nháp.

Acceptance Criteria:

* Quantity phải lớn hơn 0.
* Cập nhật lại tổng tiền.
* Validate sellable stock.
* Không cho update order đã PAID/CANCELLED.

## US-61 - Xóa thuốc khỏi Draft Order

Nhóm cần cho Staff xóa item khỏi đơn nháp.

Acceptance Criteria:

* Có thể xóa item khi order còn DRAFT.
* Tổng tiền cập nhật lại.
* Không xóa item trong order PAID.
* Hiển thị thông báo thành công/lỗi.

## US-62 - Tính tổng tiền Draft Order

Nhóm cần tính tổng tiền của đơn dựa trên các dòng thuốc.

Acceptance Criteria:

* Tổng tiền bằng sum quantity * selling_price.
* Cập nhật khi thêm/sửa/xóa item.
* Không dùng discount/coupon trong MVP.
* Backend và frontend thống nhất số tiền.

## US-63 - Validate sellable stock khi lập đơn

Nhóm cần kiểm tra số lượng bán được trong POS.

Acceptance Criteria:

* Không cho quantity vượt sellable stock.
* Sellable stock không tính batch hết hạn.
* Hiển thị cảnh báo rõ ràng.
* Checkout vẫn validate lại ở backend.

## US-64 - Hỗ trợ walk-in/anonymous customer

Nhóm cần cho phép bán hàng không cần tạo khách hàng đầy đủ.

Acceptance Criteria:

* Draft Order có thể không gắn customer.
* UI hiển thị khách vãng lai/walk-in.
* Không cần customer portal trong MVP.
* Không biến full Customer Management thành MVP blocker.

## US-65 - Staff chỉ xem đơn trong ownership scope

Nhóm cần giới hạn danh sách đơn của Staff.

Acceptance Criteria:

* Staff chỉ thấy order mình tạo/xử lý.
* Admin thấy tất cả.
* Backend enforce scope.
* Test case có Staff A không thấy order Staff B.

## US-66 - Admin xem tất cả đơn hàng

Nhóm cần cho Admin xem toàn bộ order.

Acceptance Criteria:

* Admin list tất cả order.
* Có filter trạng thái nếu cần.
* Không bị giới hạn ownership scope.
* Dữ liệu hiển thị chính xác.

## US-67 - Hủy Draft Order

Nhóm cần cho phép hủy đơn nháp.

Acceptance Criteria:

* Staff hủy Draft Order trong ownership scope.
* Admin hủy bất kỳ Draft Order.
* Không hủy order PAID.
* Status chuyển thành CANCELLED.

## US-68 - Giữ Draft Order khi checkout fail

Nhóm cần bảo toàn đơn nháp nếu checkout lỗi.

Acceptance Criteria:

* Checkout fail không mất Draft Order.
* Không trừ batch khi transaction fail.
* User quay lại đơn nháp với dữ liệu cũ.
* Hiển thị lỗi để xử lý tiếp.

## US-69 - Tạo DrugInteraction Rule cấp ActiveIngredient

Nhóm cần xây dựng rule tương tác thuốc dựa trên cặp hoạt chất.

Acceptance Criteria:

* Rule dùng ActiveIngredient–ActiveIngredient.
* Không dùng Medicine–Medicine làm source of truth.
* Có severity, description, recommendation.
* Admin tạo rule.

## US-70 - Cập nhật/deactivate DrugInteraction Rule

Nhóm cần cho Admin cập nhật hoặc deactivate rule.

Acceptance Criteria:

* Admin sửa rule active.
* Deactivate rule không xóa lịch sử.
* Graph sync event được tạo khi rule đổi.
* Rule inactive không dùng trong check mới.

## US-71 - Severity chỉ gồm LOW/MEDIUM/HIGH

Nhóm cần giới hạn severity trong MVP.

Acceptance Criteria:

* Chỉ cho LOW, MEDIUM, HIGH.
* Không dùng CRITICAL trong MVP.
* Validation backend enforce.
* UI hiển thị đúng mức độ.

## US-72 - Derive medicine interaction từ active ingredients

Nhóm cần kiểm tra tương tác thuốc thông qua active ingredients.

Acceptance Criteria:

* Lấy active ingredients từ medicines trong order.
* So khớp với interaction rules.
* Trả về cảnh báo tương ứng.
* Không check trực tiếp bằng medicine-level rule official.

## US-73 - Check interaction khi order có từ hai thuốc

Nhóm cần kiểm tra interaction khi đơn có từ hai thuốc trở lên.

Acceptance Criteria:

* Order có dưới 2 thuốc thì không cần check cặp.
* Order có từ 2 thuốc thì kiểm tra các cặp hoạt chất.
* Kết quả dùng để hiển thị alert.
* Có test cho nhiều thuốc/nhiều hoạt chất.

## US-74 - Persist InteractionAlert đã hiển thị

Nhóm cần lưu lại mọi alert đã hiển thị cho nhân viên.

Acceptance Criteria:

* Alert hiển thị phải được lưu.
* Lưu order_id, interaction rule, severity snapshot.
* Dữ liệu dùng cho history/audit.
* Không chỉ hiển thị tạm trên UI.

## US-75 - Một active alert cho order_id + interaction_id

Nhóm cần tránh tạo nhiều alert active trùng nhau.

Acceptance Criteria:

* Mỗi order_id + interaction_id có một active alert.
* Nếu hiển thị lại thì update display_count.
* Không tạo duplicate active alert.
* Constraint/service logic bảo vệ rule này.

## US-76 - Update last_displayed_at và display_count

Nhóm cần theo dõi số lần alert được hiển thị.

Acceptance Criteria:

* Mỗi lần alert hiển thị lại tăng display_count.
* Cập nhật last_displayed_at.
* Không mất acknowledged data cũ.
* Hiển thị history chính xác.

## US-77 - Hiển thị alert LOW/MEDIUM/HIGH trong POS

Nhóm cần hiển thị cảnh báo tương tác trong POS.

Acceptance Criteria:

* Alert hiển thị severity rõ ràng.
* Có mô tả và recommendation.
* HIGH nổi bật hơn LOW/MEDIUM.
* Có disclaimer cảnh báo chỉ hỗ trợ tham khảo.

## US-78 - HIGH alert acknowledgement

Nhóm cần yêu cầu nhân viên acknowledge HIGH alert.

Acceptance Criteria:

* HIGH alert có action acknowledge.
* Lưu acknowledged_by và acknowledged_at.
* Không checkout nếu HIGH chưa acknowledge.
* LOW/MEDIUM không cần bắt buộc acknowledge theo rule này.

## US-79 - HIGH alert consultation note

Nhóm cần bắt buộc ghi consultation note cho từng HIGH alert.

Acceptance Criteria:

* HIGH alert yêu cầu note riêng.
* Note không được rỗng.
* Note gắn với đúng InteractionAlert.
* Không dùng note chung mơ hồ cho toàn order.

## US-80 - Block checkout nếu HIGH unresolved

Nhóm cần chặn checkout khi còn HIGH alert chưa xử lý.

Acceptance Criteria:

* Backend checkout kiểm tra unresolved HIGH alerts.
* Nếu còn alert thiếu acknowledge/note thì trả lỗi.
* UI đưa user quay lại xử lý alert.
* Không chỉ enforce bằng frontend.

## US-81 - Admin xem InteractionAlert History

Nhóm cần xây dựng màn hình Admin xem lịch sử alert.

Acceptance Criteria:

* Admin xem danh sách alert.
* Có thông tin order, severity, display_count, acknowledge/note.
* Có filter cơ bản nếu cần.
* Warehouse không truy cập.

## US-82 - Warehouse không truy cập InteractionAlert

Nhóm cần đảm bảo Warehouse không xem được alert tương tác thuốc.

Acceptance Criteria:

* Warehouse không thấy menu InteractionAlert.
* API trả 403 nếu Warehouse gọi.
* Test phân quyền có case Warehouse.
* Không lộ dữ liệu alert qua endpoint khác.

## US-83 - Checkout API transaction

Nhóm cần xây dựng API checkout chính thức bằng transaction.

Acceptance Criteria:

* Dùng `POST /checkout`.
* Tất cả bước checkout nằm trong transaction.
* Thành công mới chuyển order thành PAID.
* Lỗi thì rollback toàn bộ.

## US-84 - Checkout validation pipeline

Nhóm cần xây dựng pipeline validate trước khi checkout.

Acceptance Criteria:

* Validate order tồn tại.
* Validate order DRAFT.
* Validate stock.
* Validate HIGH alerts.
* Validate payment input.

## US-85 - Validate order status DRAFT

Nhóm cần đảm bảo chỉ Draft Order được checkout.

Acceptance Criteria:

* DRAFT được checkout.
* PAID/CANCELLED bị chặn.
* Error message rõ ràng.
* Backend enforce.

## US-86 - Validate unresolved HIGH alerts

Nhóm cần kiểm tra HIGH alerts trong checkout.

Acceptance Criteria:

* Checkout query unresolved HIGH alerts.
* Thiếu acknowledge hoặc note thì fail.
* Không tạo payment/invoice nếu fail.
* UI hiển thị alert cần xử lý.

## US-87 - Validate sellable stock trước checkout

Nhóm cần kiểm tra tồn kho bán được tại thời điểm checkout.

Acceptance Criteria:

* Kiểm tra sellable stock trong transaction.
* Không bán batch hết hạn.
* Không bán vượt quantity.
* Nếu fail, giữ Draft Order.

## US-88 - FEFO allocation service

Nhóm cần xây dựng service phân bổ batch theo FEFO.

Acceptance Criteria:

* Chọn batch có expiry gần nhất trước.
* Bỏ qua expired batch.
* Có thể phân bổ nhiều batch nếu cần.
* Kết quả dùng để trừ tồn và lưu allocation.

## US-89 - Multi-batch allocation persistence

Nhóm cần lưu lại batch nào đã được dùng cho order.

Acceptance Criteria:

* Lưu order_batch_allocations.
* Có medicine, batch, quantity allocated.
* Hỗ trợ một item lấy từ nhiều batch.
* Dữ liệu dùng cho audit/history.

## US-90 - Trừ batch quantity trong transaction

Nhóm cần trừ quantity batch trong cùng transaction checkout.

Acceptance Criteria:

* Batch quantity chỉ giảm khi checkout thành công.
* Nếu payment/invoice fail thì rollback.
* Không trừ tồn ngoài transaction.
* Không làm quantity âm.

## US-91 - Idempotent checkout

Nhóm cần chống checkout lặp tạo payment/invoice trùng.

Acceptance Criteria:

* Có idempotency key hoặc record.
* Request lặp không tạo duplicate payment.
* Request lặp trả kết quả nhất quán.
* Test double-submit.

## US-92 - Rollback khi checkout failure

Nhóm cần đảm bảo lỗi bất kỳ trong checkout rollback toàn bộ.

Acceptance Criteria:

* Không có partial payment.
* Không có partial invoice.
* Không trừ partial batch.
* Order vẫn DRAFT nếu checkout fail.

## US-93 - Cash payment handling

Nhóm cần xử lý thanh toán tiền mặt.

Acceptance Criteria:

* Nhập amount_tendered.
* amount_tendered >= total.
* Nếu thiếu tiền thì lỗi.
* Ghi payment method cash.

## US-94 - Tính change_amount cho thanh toán tiền mặt

Nhóm cần tính tiền thối lại.

Acceptance Criteria:

* change_amount = amount_tendered - total.
* Không cho change âm.
* Hiển thị change trên UI/invoice nếu cần.
* Lưu vào payment record.

## US-95 - Simulated bank transfer transaction_reference

Nhóm cần hỗ trợ thanh toán chuyển khoản mô phỏng.

Acceptance Criteria:

* Nhập transaction_reference.
* Reference là bắt buộc với bank transfer.
* Reference không được trùng với successful payment.
* Không tích hợp bank thật trong MVP.

## US-96 - One SUCCESS payment rule

Nhóm cần đảm bảo mỗi order chỉ có một payment thành công.

Acceptance Criteria:

* Một order chỉ có một SUCCESS payment.
* Failed attempts có thể được lưu.
* Checkout lặp không tạo SUCCESS thứ hai.
* Constraint/service logic bảo vệ rule.

## US-97 - Invoice generated inside checkout

Nhóm cần tạo invoice trong transaction checkout.

Acceptance Criteria:

* Invoice tạo cùng transaction với payment/order.
* Không tạo invoice bằng endpoint riêng sau checkout.
* Invoice chỉ có khi checkout thành công.
* Rollback nếu invoice tạo lỗi.

## US-98 - Xem/in invoice sau checkout

Nhóm cần cho nhân viên xem hoặc in hóa đơn sau checkout.

Acceptance Criteria:

* Xem invoice theo order.
* Hiển thị thuốc, số lượng, đơn giá, tổng tiền.
* Có thông tin payment.
* Print ở mức demo được chấp nhận.

## US-99 - AI explanation for InteractionAlert

Nhóm cần dùng AI để giải thích cảnh báo tương tác thuốc.

Acceptance Criteria:

* AI giải thích dựa trên alert context.
* Có disclaimer an toàn.
* Không chẩn đoán/kê đơn.
* Có audit log cho request.

## US-100 - AI consultation note draft

Nhóm cần cho AI tạo ghi chú tư vấn nháp.

Acceptance Criteria:

* AI chỉ tạo draft.
* Draft không tự động lưu official.
* Nội dung phải qua guardrail.
* Staff có thể chỉnh sửa/xác nhận.

## US-101 - Staff confirm AI draft before official save

Nhóm cần bắt buộc nhân viên xác nhận trước khi lưu AI draft.

Acceptance Criteria:

* Unconfirmed draft không thành consultation note.
* Staff bấm confirm mới lưu note.
* Note gắn với đúng HIGH alert.
* Có audit AI generation metadata.

## US-102 - Safe follow-up questions

Nhóm cần dùng AI tạo câu hỏi follow-up an toàn khi Staff nhập ngữ cảnh ngắn.

Acceptance Criteria:

* Câu hỏi không chẩn đoán.
* Không kê đơn/liều dùng.
* Input được guardrail kiểm tra.
* Không lưu medical record thật.

## US-103 - Google AI provider primary

Nhóm cần tích hợp Google AI làm provider chính.

Acceptance Criteria:

* Backend gọi Google AI qua provider abstraction.
* Config không expose secret ra frontend.
* Timeout/error được xử lý.
* Có audit provider_requested/provider_used.

## US-104 - MockAI fallback provider

Nhóm cần xây dựng MockAI fallback để demo ổn định.

Acceptance Criteria:

* Khi Google AI lỗi/hết quota, hệ thống fallback MockAI nếu cấu hình cho phép.
* Audit ghi fallback used.
* MockAI không thay thế hoàn toàn Google AI trong MVP.
* UI hiển thị degraded/fallback state nếu cần.

## US-105 - AI input guardrail

Nhóm cần kiểm tra input trước khi gọi AI.

Acceptance Criteria:

* Chặn input nguy hiểm.
* Chặn diagnosis/prescribing/dosage request.
* Redact/minimize PII.
* Không gọi provider nếu input bị chặn.

## US-106 - Block diagnosis requests

Nhóm cần chặn yêu cầu chẩn đoán bệnh.

Acceptance Criteria:

* Input yêu cầu chẩn đoán bị từ chối.
* Trả safe response.
* Ghi guardrail status.
* Có test case cho diagnosis request.

## US-107 - Block prescribing requests

Nhóm cần chặn yêu cầu kê đơn thuốc.

Acceptance Criteria:

* Input yêu cầu kê đơn bị từ chối.
* Không gửi tới AI provider nếu unsafe.
* UI hiển thị hướng dẫn an toàn.
* Có audit guardrail.

## US-108 - Block dosage advice requests

Nhóm cần chặn yêu cầu liều dùng cụ thể.

Acceptance Criteria:

* Input hỏi liều dùng cụ thể bị chặn.
* Không tạo nội dung dosage.
* Có safe message khuyên hỏi chuyên gia y tế.
* Test case pass.

## US-109 - AI output guardrail

Nhóm cần kiểm tra response AI trước khi hiển thị.

Acceptance Criteria:

* Output unsafe bị chặn.
* Không hiển thị nội dung kê đơn/chẩn đoán/liều dùng.
* Có safe fallback message.
* Ghi output guardrail status.

## US-110 - Structured output validation

Nhóm cần validate format output AI.

Acceptance Criteria:

* AI output đúng schema.
* Nếu sai schema thì retry/fallback/safe error.
* Không render raw malformed output.
* Có test cho invalid output.

## US-111 - PII minimization before AI call

Nhóm cần giảm thiểu dữ liệu cá nhân trước khi gọi AI.

Acceptance Criteria:

* Không gửi dữ liệu cá nhân không cần thiết.
* Không lưu raw PII trong AI audit.
* Chỉ gửi context tối thiểu.
* Có ghi metadata an toàn.

## US-112 - AI safe error response

Nhóm cần xử lý lỗi AI bằng thông báo an toàn.

Acceptance Criteria:

* Provider lỗi không crash UI.
* User thấy message dễ hiểu.
* Có fallback MockAI nếu phù hợp.
* Audit log ghi lỗi.

## US-113 - AI disclaimer

Nhóm cần hiển thị disclaimer cho nội dung AI.

Acceptance Criteria:

* AI response có disclaimer.
* Disclaimer nói AI chỉ hỗ trợ tham khảo.
* Không thay thế bác sĩ/dược sĩ.
* Hiển thị trong panel AI.

## US-114 - AI Audit metadata

Nhóm cần lưu metadata cho mỗi AI request.

Acceptance Criteria:

* Lưu provider_requested, provider_used, model.
* Lưu prompt version.
* Lưu guardrail status.
* Không lưu raw PII.

## US-115 - Prompt template versioning

Nhóm cần seed prompt template có version.

Acceptance Criteria:

* Prompt templates có version.
* AI audit ghi version đã dùng.
* Prompt official được seed.
* Prompt editing UI không bắt buộc MVP.

## US-116 - Admin AI Audit Log view

Nhóm cần cho Admin xem AI Audit Log.

Acceptance Criteria:

* Admin xem danh sách AI audit.
* Có metadata provider/guardrail/prompt.
* Không hiển thị raw PII.
* Staff không xem toàn bộ audit nếu không có quyền.

## US-117 - Graph Sync Outbox

Nhóm cần xây dựng outbox để đồng bộ graph.

Acceptance Criteria:

* Thay đổi source data tạo outbox event.
* Event có type, source id, version.
* Worker đọc event để sync Neo4j.
* PostgreSQL vẫn là source of truth.

## US-118 - Graph Sync Worker

Nhóm cần xây dựng worker xử lý graph sync.

Acceptance Criteria:

* Worker lấy pending outbox jobs.
* Upsert dữ liệu vào Neo4j.
* Cập nhật trạng thái job.
* Retry khi lỗi.

## US-119 - Project Medicine node to Neo4j

Nhóm cần projection Medicine node sang Neo4j.

Acceptance Criteria:

* Medicine node có relational id.
* Có active status/source version.
* Update khi Medicine thay đổi.
* Không coi Neo4j là source of truth.

## US-120 - Project ActiveIngredient node to Neo4j

Nhóm cần projection ActiveIngredient node sang Neo4j.

Acceptance Criteria:

* ActiveIngredient node có relational id.
* Có source version.
* Update/deactivate đúng.
* Dùng cho CONTAINS và INTERACTS_WITH.

## US-121 - Project CONTAINS relationship

Nhóm cần sync quan hệ Medicine chứa ActiveIngredient.

Acceptance Criteria:

* Tạo relationship Medicine-[:CONTAINS]->ActiveIngredient.
* Update khi mapping đổi.
* Deactivate/remove theo rule sync.
* Có provenance/source metadata nếu cần.

## US-122 - Project INTERACTS_WITH relationship

Nhóm cần sync rule tương tác sang Neo4j.

Acceptance Criteria:

* Tạo INTERACTS_WITH giữa ActiveIngredient.
* Có ruleId, severity, description, recommendation.
* Có isActive, sourceVersion, syncedAt.
* Không tạo Medicine–Medicine authoritative edge.

## US-123 - Canonical directed interaction edge

Nhóm cần thống nhất hướng lưu INTERACTS_WITH.

Acceptance Criteria:

* Edge lưu theo hướng canonical.
* Query vẫn xử lý như semantically symmetric.
* Không tạo duplicate hai chiều không kiểm soát.
* Có test cho cặp đảo chiều.

## US-124 - Store graph projection metadata

Nhóm cần lưu metadata để kiểm tra graph freshness.

Acceptance Criteria:

* Lưu sourceVersion/sourceUpdatedAt/syncedAt.
* Metadata đủ để biết graph stale hay fresh.
* Không chỉ dựa vào thời gian elapsed.
* Dùng cho Graph-RAG freshness check.

## US-125 - Retry failed graph sync jobs

Nhóm cần retry job sync lỗi.

Acceptance Criteria:

* Failed job có retry count.
* Worker retry theo rule.
* Không retry vô hạn không kiểm soát.
* Lỗi được log.

## US-126 - Log graph sync failures

Nhóm cần ghi log lỗi đồng bộ graph.

Acceptance Criteria:

* Log lỗi có job id, entity, message.
* Có thể audit/debug.
* Không làm POS checkout phụ thuộc Neo4j.
* Failure không làm hỏng PostgreSQL source.

## US-127 - Graph freshness detection

Nhóm cần xác định graph có stale không.

Acceptance Criteria:

* Check source version và outbox state.
* Nếu pending/failed relevant job thì graph stale.
* Graph-RAG nhận biết freshness.
* Không dùng stale graph âm thầm.

## US-128 - Deactivated graph entity with isActive=false

Nhóm cần giữ entity/rule bị deactivate trong Neo4j với `isActive=false`.

Acceptance Criteria:

* Deactivated rule/entity không bị xóa cứng nếu baseline yêu cầu retain.
* Normal query chỉ lấy active data.
* Dữ liệu lịch sử vẫn trace được.
* Sync xử lý deactivate đúng.

## US-129 - Graph-RAG interaction explanation

Nhóm cần xây Graph-RAG để hỗ trợ giải thích interaction.

Acceptance Criteria:

* Query graph context theo interaction.
* Kết hợp context cho AI explanation.
* Có guardrail AI.
* Không dùng graph quyết định checkout.

## US-130 - Graph-RAG provenance metadata

Nhóm cần trả provenance cho Graph-RAG output.

Acceptance Criteria:

* Response có nguồn dữ liệu/rule id.
* Cho biết context đến từ graph hay PostgreSQL.
* Metadata hiển thị/ghi log được.
* Không trả output không có nguồn rõ.

## US-131 - Graph-RAG freshness metadata

Nhóm cần trả freshness metadata khi dùng graph.

Acceptance Criteria:

* Response có graph freshness status.
* Nếu stale thì có warning/fallback.
* Không dùng stale graph âm thầm.
* Có test cho stale graph.

## US-132 - PostgreSQL fallback khi Neo4j unavailable

Nhóm cần fallback sang PostgreSQL khi Neo4j lỗi.

Acceptance Criteria:

* Neo4j unavailable không làm vỡ interaction explanation nếu có relational fallback.
* Response có graphUsed=false.
* Có degraded indicator.
* Ghi log/audit nếu cần.

## US-133 - PostgreSQL fallback khi graph stale

Nhóm cần fallback nếu graph projection chưa fresh.

Acceptance Criteria:

* Detect graph stale.
* Không dùng stale graph làm context chính.
* Fallback PostgreSQL cho interaction explanation.
* Response có warning/freshness indicator.

## US-134 - Safe error cho graph-only query

Nhóm cần trả lỗi an toàn nếu query chỉ có graph và không có fallback.

Acceptance Criteria:

* Graph-only query không fallback được thì trả safe error.
* Không fabricate dữ liệu.
* Error message dễ hiểu.
* Không crash UI.

## US-135 - Không cho Staff submit raw Cypher

Nhóm cần chặn Staff gửi Cypher trực tiếp.

Acceptance Criteria:

* Staff không có raw Cypher input.
* Backend không expose raw Cypher endpoint cho Staff.
* Chỉ dùng query template allowlisted.
* Test permission pass.

## US-136 - Graph không quyết định checkout

Nhóm cần đảm bảo checkout không phụ thuộc Neo4j.

Acceptance Criteria:

* Checkout dùng PostgreSQL/rule-based validation.
* Neo4j stale/unavailable không làm checkout sai logic.
* Graph chỉ hỗ trợ explain/RAG.
* Guardrail ghi rõ trong code/test.

## US-137 - Revenue Report

Nhóm cần xây dựng báo cáo doanh thu.

Acceptance Criteria:

* Chỉ tính PAID orders.
* Không tính failed/cancelled/draft.
* Có filter ngày cơ bản.
* Số liệu deterministic, không dùng AI để tính.

## US-138 - Top Medicines Report

Nhóm cần xây dựng báo cáo thuốc bán chạy.

Acceptance Criteria:

* Tính từ order_items/order_batch_allocations của PAID orders.
* Hiển thị thuốc và số lượng bán.
* Có sắp xếp theo số lượng.
* Không dùng forecast/AI để thay số liệu.

## US-139 - Inventory Report

Nhóm cần xây dựng báo cáo tồn kho.

Acceptance Criteria:

* Dữ liệu lấy từ MedicineBatch.
* Hiển thị sellable, expired, near-expiry nếu cần.
* Không dùng aggregate inventory source of truth.
* Admin/Warehouse xem theo quyền.

## US-140 - Basic report filters

Nhóm cần thêm filter cơ bản cho report.

Acceptance Criteria:

* Filter theo date range/report type.
* Filter không làm sai số liệu.
* Có empty/loading/error state.
* Backend validate input filter.

## US-141 - Near-expiry threshold setting

Nhóm cần xây dựng setting ngưỡng gần hết hạn.

Acceptance Criteria:

* Default là 90 ngày.
* Admin có thể cấu hình trong System Settings MVP.
* Setting ảnh hưởng near-expiry calculation.
* Validate threshold hợp lệ.

## US-142 - AI provider/model backend config

Nhóm cần cấu hình provider/model AI ở backend.

Acceptance Criteria:

* Config từ env/database backend.
* Không expose API key ra frontend.
* Google AI primary, MockAI fallback.
* UI cấu hình provider là Should-have, không bắt buộc MVP.

## US-143 - Seed official prompt templates

Nhóm cần seed prompt template official có version.

Acceptance Criteria:

* Có prompt template cho AI explanation/note draft.
* Có version rõ ràng.
* AI Audit ghi prompt version.
* Không cần prompt editing UI trong MVP.

## US-144 - System settings UI tối thiểu

Nhóm cần có UI tối thiểu cho setting bắt buộc.

Acceptance Criteria:

* Admin cấu hình near-expiry threshold.
* Validate input.
* Lưu setting vào database/config.
* Không đưa provider/prompt management UI thành MVP blocker.

## US-145 - Curated MVP seed data

Nhóm cần chuẩn bị seed data vừa đủ cho MVP demo.

Acceptance Criteria:

* Có medicines, active ingredients, suppliers, batches.
* Dữ liệu đủ cho POS, interaction, reports.
* Không seed toàn bộ 100-table commercial data.
* Dữ liệu có thể reset được.

## US-146 - Demo users by role

Nhóm cần tạo tài khoản demo cho các vai trò.

Acceptance Criteria:

* Có Admin, Staff, Warehouse.
* Quyền đúng theo role.
* Demo account chính không bị must_change_password nếu dùng để demo nhanh.
* Có tài khoản first-login nếu cần trình bày flow.

## US-147 - Dynamic expiry dates for demo

Nhóm cần dùng expiry date động để demo không bị lỗi theo ngày.

Acceptance Criteria:

* Near-expiry/expired dates tính tương đối theo ngày reset.
* Demo không bị hỏng khi chạy ngày khác.
* FEFO scenario vẫn ổn.
* Seed script rõ ràng.

## US-148 - FEFO multi-batch demo scenario

Nhóm cần seed tình huống nhiều batch để demo FEFO.

Acceptance Criteria:

* Có batch expired, near-expiry, normal.
* FEFO chọn batch hết hạn gần nhất nhưng chưa expired.
* Có case allocate nhiều batch.
* Smoke test kiểm tra allocation.

## US-149 - Seed PAID order with HIGH alert

Nhóm cần seed một order đã thanh toán có HIGH alert đã xử lý.

Acceptance Criteria:

* Order status PAID.
* Có HIGH InteractionAlert acknowledged.
* Có consultation note.
* Có payment success, invoice, batch allocations.

## US-150 - Local-only demo reset with graph rebuild and smoke test

Nhóm cần xây dựng reset demo an toàn.

Acceptance Criteria:

* `demo:reset` chỉ chạy local.
* Refuse staging/production/unknown env.
* Sau reset rebuild Neo4j projection.
* Chạy smoke test sau reset.

## US-151 - Admin Graph Sync Status UI

Nhóm có thể bổ sung UI xem trạng thái graph sync.

Acceptance Criteria:

* Admin thấy pending/failed jobs.
* Hiển thị freshness/degraded status.
* Đây là Should-have, không chặn MVP.
* Staff/Warehouse không quản lý graph sync.

## US-152 - Manual graph retry/rebuild UI

Nhóm có thể bổ sung nút retry/rebuild graph cho Admin.

Acceptance Criteria:

* Admin retry failed job.
* Admin trigger rebuild nếu có quyền.
* Có confirmation trước action nguy hiểm.
* Không sửa trực tiếp source data trong Neo4j.

## US-153 - Read-only Graph Explorer

Nhóm có thể xây Graph Explorer để demo node-edge.

Acceptance Criteria:

* Xem Medicine, ActiveIngredient, CONTAINS, INTERACTS_WITH.
* Read-only.
* Không raw Cypher.
* Không dùng để quyết định checkout.

## US-154 - AI Provider Settings UI

Nhóm có thể bổ sung UI cấu hình provider/model AI.

Acceptance Criteria:

* Admin xem provider config.
* Không expose secret/API key.
* Có test connection nếu làm.
* Should-have, không bắt buộc MVP.

## US-155 - Prompt Management UI

Nhóm có thể bổ sung UI quản lý prompt template.

Acceptance Criteria:

* Admin xem prompt version.
* Có thể tạo version mới nếu scope cho phép.
* Có audit thay đổi prompt.
* Unapproved prompt không chạy chính thức.

## US-156 - System Audit Log UI

Nhóm có thể bổ sung UI xem audit log hệ thống.

Acceptance Criteria:

* Admin xem audit logs.
* Filter theo actor/action/entity/date.
* Không cho sửa audit log.
* Backend audit vẫn mandatory dù UI là Should-have.

## US-157 - Supabase Storage for medicine images

Nhóm có thể bổ sung upload ảnh thuốc.

Acceptance Criteria:

* Upload file hợp lệ.
* Validate size/type.
* Hiển thị ảnh trong Medicine/POS nếu có.
* Không ảnh hưởng MVP khi chưa có ảnh.

## US-158 - Supabase Realtime inventory updates

Nhóm có thể bổ sung realtime update tồn kho.

Acceptance Criteria:

* UI nhận update tồn kho.
* Có stale warning nếu cần.
* Backend checkout vẫn validate chính thức.
* Realtime không thay thế transaction validation.

## US-159 - Notification Center

Nhóm có thể bổ sung notification center.

Acceptance Criteria:

* Hiển thị notification low-stock/near-expiry/system.
* Mark read/unread.
* Permission-aware.
* Không thay thế dashboard/report.

## US-160 - AI Business Report Narrative

Nhóm có thể bổ sung AI narrative cho báo cáo.

Acceptance Criteria:

* AI chỉ giải thích số liệu đã tính deterministic.
* Không tự tính doanh thu.
* Có disclaimer.
* Có AI audit metadata.

## US-161 - Full Customer Management backlog

Đây là backlog tương lai cho quản lý khách hàng đầy đủ.

Acceptance Criteria:

* Chỉ ghi nhận Future scope.
* Không làm MVP blocker.
* MVP chỉ cần walk-in/anonymous customer.
* Không tạo customer portal trong MVP.

## US-162 - Online Commerce backlog

Đây là backlog tương lai cho e-commerce.

Acceptance Criteria:

* Chỉ ghi nhận Future scope.
* Không có cart/wishlist trong MVP.
* Không ảnh hưởng POS checkout.
* Không build storefront trong MVP.

## US-163 - Product Variant Catalog backlog

Đây là backlog tương lai cho product/product_variant catalog.

Acceptance Criteria:

* Chỉ ghi nhận Future scope.
* MVP sales dùng medicine_id.
* Không dùng product_variant_id cho checkout MVP.
* Không ép full catalog vào MVP.

## US-164 - Multi-store support backlog

Đây là backlog tương lai cho nhiều cửa hàng.

Acceptance Criteria:

* Chỉ ghi nhận Future scope.
* MVP dùng một logical default store.
* Không thêm workflow store phức tạp vào MVP.
* Không ảnh hưởng MedicineBatch MVP.

## US-165 - Multi-warehouse support backlog

Đây là backlog tương lai cho nhiều kho.

Acceptance Criteria:

* Chỉ ghi nhận Future scope.
* MVP dùng một logical default warehouse.
* Không có stock by warehouse trong MVP.
* Không có multi-warehouse allocation.

## US-166 - Stock Transfer backlog

Đây là backlog tương lai cho chuyển kho.

Acceptance Criteria:

* Chỉ ghi nhận Future scope.
* Không có transfer request trong MVP.
* Không dùng adjustment để giả lập transfer.
* Không ảnh hưởng stock import/checkout MVP.

## US-167 - Forecasting & Reorder backlog

Đây là backlog tương lai cho dự báo và gợi ý nhập hàng.

Acceptance Criteria:

* Chỉ ghi nhận Future scope.
* Không dùng forecast trong MVP.
* Không tự tạo stock import.
* Không dùng forecast để chặn checkout.

## US-168 - Promotion / Coupon backlog

Đây là backlog tương lai cho khuyến mãi và coupon.

Acceptance Criteria:

* Chỉ ghi nhận Future scope.
* MVP không có coupon engine.
* Checkout MVP không tính discount.
* Không ảnh hưởng payment/invoice MVP.

## US-169 - Shipping / Delivery backlog

Đây là backlog tương lai cho giao hàng.

Acceptance Criteria:

* Chỉ ghi nhận Future scope.
* Không có shipping trong POS MVP.
* Không yêu cầu address/shipment.
* Chỉ liên quan khi mở Online Commerce.

## US-170 - Review / CMS backlog

Đây là backlog tương lai cho review và CMS.

Acceptance Criteria:

* Chỉ ghi nhận Future scope.
* Không có review/CMS trong MVP.
* Không ảnh hưởng POS/inventory/checkout.
* Chỉ dùng cho commercial expansion.

---

# Ghi chú cập nhật quan trọng

Các Stories trên đã được rewrite theo baseline chính thức mới:

1. Auth dùng Supabase Auth, không tự xây custom JWT/password flow.
2. Không lưu `password_hash` trong PostgreSQL.
3. MedicineBatch là source of truth cho tồn kho.
4. Không sửa trực tiếp quantity, phải dùng Inventory Adjustment.
5. Stock Import phải có batch number, expiry date và rule merge/reject rõ ràng.
6. POS dùng Draft Order trước checkout.
7. Checkout chính thức dùng transactional `POST /checkout`.
8. FEFO allocation là bắt buộc.
9. Payment và invoice nằm trong checkout transaction.
10. Drug interaction rule ở cấp ActiveIngredient–ActiveIngredient.
11. InteractionAlert phải persist.
12. HIGH alert bắt buộc acknowledgement và consultation note.
13. AI dùng Google AI primary và MockAI fallback.
14. AI Guardrail và AI Audit là bắt buộc.
15. Graph Sync và Neo4j projection là chính thức.
16. Graph-RAG phải có provenance, freshness metadata và PostgreSQL fallback.
17. Demo reset chỉ chạy local, có graph rebuild và smoke test.
18. Future scope không được đưa thành MVP blocker.

---

# Out-of-scope guard cho Stories

Không tạo Story MVP để implement các nội dung sau:

```text
Custom username/password auth
Lưu password_hash trong PostgreSQL
Aggregate inventory làm source of truth
Sửa trực tiếp inventory quantity
Payment success ngoài checkout transaction
Invoice tạo ngoài checkout transaction
Medicine-level interaction rule làm source of truth
AI chẩn đoán bệnh
AI kê đơn thuốc
AI đưa liều dùng cụ thể
Neo4j làm source of truth
Graph quyết định checkout
Raw Cypher cho Staff
Customer portal trong MVP
Online cart/wishlist/storefront trong MVP
Product variant làm sales key trong MVP
Multi-store / multi-warehouse trong MVP
Stock transfer trong MVP
Forecast/reorder suggestion trong MVP
Coupon/promotion trong MVP
Shipping/delivery trong MVP
Review/CMS trong MVP
```

Thông tin cảnh báo tương tác thuốc và nội dung AI trong hệ thống chỉ mang tính hỗ trợ tham khảo cho đồ án, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.
