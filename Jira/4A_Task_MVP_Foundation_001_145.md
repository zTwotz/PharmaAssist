# 4A_Task_MVP_Foundation_001_145.md

# Danh sách Task phần 1/4 cho PharmaAssist AI Intelligence

Tài liệu này là phần đầu tiên trong bộ **4 tài liệu Task** của dự án **PharmaAssist AI Intelligence**.

Phạm vi tài liệu này:

```text
PAC-TASK-001 → PAC-TASK-145
```

Nội dung chính:

1. Auth & RBAC.
2. User / Staff Account Management.
3. Medicine Management.
4. ActiveIngredient Management.
5. Medicine–ActiveIngredient Mapping.
6. Supplier Management.
7. Inventory & MedicineBatch.
8. Stock Import.

Các Task trong tài liệu này thuộc **MVP / Core** và là nền tảng bắt buộc trước khi triển khai POS, Checkout, AI và Graph.

---

## Quy ước chung khi tạo Task trên Jira

| **Field trên Jira**       | **Giá trị chung**                                                                  |
| ------------------------- | ---------------------------------------------------------------------------------- |
| Work type                 | Task                                                                               |
| Status                    | To Do                                                                              |
| Parent / Linked work item | Gắn với Story tương ứng, ví dụ `US-01`                                             |
| Parent Epic               | Gắn với Epic tương ứng, ví dụ `PAC-EPIC-01`                                        |
| Assignee                  | Automatic hoặc chọn thành viên nhóm                                                |
| Fix versions              | Để trống                                                                           |
| Team                      | Để trống hoặc chọn team nếu nhóm đã tạo                                            |
| Sprint                    | Gắn theo Sprint trong bảng                                                         |
| Summary                   | Có mã Task ở đầu, ví dụ `PAC-TASK-001 - Configure Supabase Auth client in Next.js` |
| Component                 | Dùng Component chính thức trong `1_Components.md`                                  |
| Labels                    | Theo module, ví dụ `auth`, `rbac`, `medicine`, `batch`, `stock-import`             |
| Scope                     | MVP / Core                                                                         |

---

# Danh sách 145 Task phần 1/4

| **Task Key** | **Summary**                                                                      | **Linked Story** | **Parent Epic** | **Component**               | **Priority** | **Sprint** | **Assignee** |
| ------------ | -------------------------------------------------------------------------------- | ---------------- | --------------- | --------------------------- | ------------ | ---------- | ------------ |
| PAC-TASK-001 | PAC-TASK-001 - Configure Supabase Auth client in Next.js                         | US-01            | PAC-EPIC-01     | Auth & RBAC                 | Highest      | Sprint 1   | Automatic    |
| PAC-TASK-002 | PAC-TASK-002 - Build login page UI                                               | US-01            | PAC-EPIC-01     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-003 | PAC-TASK-003 - Connect login form to Supabase Auth                               | US-01            | PAC-EPIC-01     | Auth & RBAC                 | Highest      | Sprint 1   | Automatic    |
| PAC-TASK-004 | PAC-TASK-004 - Handle login loading, success and error states                    | US-01            | PAC-EPIC-01     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-005 | PAC-TASK-005 - Redirect user after login based on permissions                    | US-01            | PAC-EPIC-01     | Auth & RBAC                 | Medium       | Sprint 1   | Automatic    |
| PAC-TASK-006 | PAC-TASK-006 - Implement logout action and Supabase session cleanup              | US-02            | PAC-EPIC-01     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-007 | PAC-TASK-007 - Protect frontend routes after logout                              | US-02            | PAC-EPIC-01     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-008 | PAC-TASK-008 - Add login/logout smoke test checklist                             | US-02            | PAC-EPIC-19     | Testing & Setup             | Medium       | Sprint 1   | Automatic    |
| PAC-TASK-009 | PAC-TASK-009 - Configure Supabase token validation in NestJS                     | US-03            | PAC-EPIC-01     | Auth & RBAC                 | Highest      | Sprint 1   | Automatic    |
| PAC-TASK-010 | PAC-TASK-010 - Implement AuthGuard for protected APIs                            | US-03            | PAC-EPIC-01     | Auth & RBAC                 | Highest      | Sprint 1   | Automatic    |
| PAC-TASK-011 | PAC-TASK-011 - Return 401 for missing or invalid session                         | US-03            | PAC-EPIC-01     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-012 | PAC-TASK-012 - Add backend auth unit tests                                       | US-03            | PAC-EPIC-19     | Testing & Setup             | High         | Sprint 1   | Automatic    |
| PAC-TASK-013 | PAC-TASK-013 - Create user_profiles Prisma model                                 | US-04            | PAC-EPIC-01     | Auth & RBAC                 | Highest      | Sprint 1   | Automatic    |
| PAC-TASK-014 | PAC-TASK-014 - Create GET /auth/me API                                           | US-04            | PAC-EPIC-01     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-015 | PAC-TASK-015 - Return current user roles and permissions                         | US-04            | PAC-EPIC-01     | Auth & RBAC                 | Highest      | Sprint 1   | Automatic    |
| PAC-TASK-016 | PAC-TASK-016 - Display current user profile in layout                            | US-04            | PAC-EPIC-01     | Auth & RBAC                 | Medium       | Sprint 1   | Automatic    |
| PAC-TASK-017 | PAC-TASK-017 - Create roles Prisma model                                         | US-05            | PAC-EPIC-01     | Auth & RBAC                 | Highest      | Sprint 1   | Automatic    |
| PAC-TASK-018 | PAC-TASK-018 - Create permissions Prisma model                                   | US-05            | PAC-EPIC-01     | Auth & RBAC                 | Highest      | Sprint 1   | Automatic    |
| PAC-TASK-019 | PAC-TASK-019 - Create user_roles Prisma model                                    | US-05            | PAC-EPIC-01     | Auth & RBAC                 | Highest      | Sprint 1   | Automatic    |
| PAC-TASK-020 | PAC-TASK-020 - Create role_permissions Prisma model                              | US-05            | PAC-EPIC-01     | Auth & RBAC                 | Highest      | Sprint 1   | Automatic    |
| PAC-TASK-021 | PAC-TASK-021 - Seed Admin, Staff and Warehouse roles                             | US-05            | PAC-EPIC-01     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-022 | PAC-TASK-022 - Seed MVP permissions                                              | US-05            | PAC-EPIC-01     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-023 | PAC-TASK-023 - Map permissions to roles                                          | US-05            | PAC-EPIC-01     | Auth & RBAC                 | Highest      | Sprint 1   | Automatic    |
| PAC-TASK-024 | PAC-TASK-024 - Implement permission decorator                                    | US-06            | PAC-EPIC-01     | Auth & RBAC                 | Highest      | Sprint 1   | Automatic    |
| PAC-TASK-025 | PAC-TASK-025 - Implement permission-based API guard                              | US-06            | PAC-EPIC-01     | Auth & RBAC                 | Highest      | Sprint 1   | Automatic    |
| PAC-TASK-026 | PAC-TASK-026 - Add permission checks to Auth and User APIs                       | US-06            | PAC-EPIC-01     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-027 | PAC-TASK-027 - Add permission checks to Medicine APIs                            | US-06            | PAC-EPIC-01     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-028 | PAC-TASK-028 - Add permission checks to Inventory APIs                           | US-06            | PAC-EPIC-01     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-029 | PAC-TASK-029 - Add permission checks to POS and Checkout APIs                    | US-06            | PAC-EPIC-01     | Auth & RBAC                 | Highest      | Sprint 1   | Automatic    |
| PAC-TASK-030 | PAC-TASK-030 - Add 403 response format for forbidden access                      | US-06            | PAC-EPIC-01     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-031 | PAC-TASK-031 - Build permission-aware sidebar                                    | US-07            | PAC-EPIC-01     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-032 | PAC-TASK-032 - Hide unauthorized action buttons                                  | US-07            | PAC-EPIC-01     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-033 | PAC-TASK-033 - Build forbidden access page                                       | US-07            | PAC-EPIC-01     | Auth & RBAC                 | Medium       | Sprint 1   | Automatic    |
| PAC-TASK-034 | PAC-TASK-034 - Add frontend permission helper                                    | US-07            | PAC-EPIC-01     | Auth & RBAC                 | Medium       | Sprint 1   | Automatic    |
| PAC-TASK-035 | PAC-TASK-035 - Implement Staff ownership query filter for orders                 | US-08            | PAC-EPIC-01     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-036 | PAC-TASK-036 - Implement Staff ownership query filter for customer order history | US-08            | PAC-EPIC-01     | Auth & RBAC                 | Medium       | Sprint 1   | Automatic    |
| PAC-TASK-037 | PAC-TASK-037 - Add tests for Staff ownership scope                               | US-08            | PAC-EPIC-19     | Testing & Setup             | High         | Sprint 1   | Automatic    |
| PAC-TASK-038 | PAC-TASK-038 - Block Warehouse access to POS routes                              | US-09            | PAC-EPIC-01     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-039 | PAC-TASK-039 - Block Warehouse access to InteractionAlert APIs                   | US-09            | PAC-EPIC-01     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-040 | PAC-TASK-040 - Block Warehouse access to checkout APIs                           | US-09            | PAC-EPIC-01     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-041 | PAC-TASK-041 - Build Admin create staff account form                             | US-10            | PAC-EPIC-02     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-042 | PAC-TASK-042 - Implement POST /admin/users using Supabase Admin                  | US-10            | PAC-EPIC-02     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-043 | PAC-TASK-043 - Create user profile after Supabase user creation                  | US-10            | PAC-EPIC-02     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-044 | PAC-TASK-044 - Assign roles to new staff account                                 | US-10            | PAC-EPIC-02     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-045 | PAC-TASK-045 - Validate staff email uniqueness through Supabase                  | US-10            | PAC-EPIC-02     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-046 | PAC-TASK-046 - Implement first-login password change screen                      | US-11            | PAC-EPIC-02     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-047 | PAC-TASK-047 - Implement must_change_password check                              | US-11            | PAC-EPIC-02     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-048 | PAC-TASK-048 - Implement password update through Supabase Auth                   | US-11            | PAC-EPIC-02     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-049 | PAC-TASK-049 - Clear must_change_password after successful change                | US-11            | PAC-EPIC-02     | Auth & RBAC                 | High         | Sprint 1   | Automatic    |
| PAC-TASK-050 | PAC-TASK-050 - Implement account active/inactive update API                      | US-12            | PAC-EPIC-02     | Auth & RBAC                 | Medium       | Sprint 1   | Automatic    |
| PAC-TASK-051 | PAC-TASK-051 - Build staff account status UI                                     | US-12            | PAC-EPIC-02     | Auth & RBAC                 | Medium       | Sprint 1   | Automatic    |
| PAC-TASK-052 | PAC-TASK-052 - Add audit log for staff status change                             | US-12            | PAC-EPIC-02     | Auth & RBAC                 | Medium       | Sprint 1   | Automatic    |
| PAC-TASK-053 | PAC-TASK-053 - Create medicines Prisma model                                     | US-13            | PAC-EPIC-03     | Medicine & ActiveIngredient | Highest      | Sprint 2   | Automatic    |
| PAC-TASK-054 | PAC-TASK-054 - Add medicine code uniqueness constraint                           | US-13            | PAC-EPIC-03     | Medicine & ActiveIngredient | High         | Sprint 2   | Automatic    |
| PAC-TASK-055 | PAC-TASK-055 - Implement POST /medicines API                                     | US-13            | PAC-EPIC-03     | Medicine & ActiveIngredient | Highest      | Sprint 2   | Automatic    |
| PAC-TASK-056 | PAC-TASK-056 - Build medicine create form                                        | US-13            | PAC-EPIC-03     | Medicine & ActiveIngredient | High         | Sprint 2   | Automatic    |
| PAC-TASK-057 | PAC-TASK-057 - Add medicine create success/error UI state                        | US-13            | PAC-EPIC-03     | Medicine & ActiveIngredient | Medium       | Sprint 2   | Automatic    |
| PAC-TASK-058 | PAC-TASK-058 - Implement PATCH /medicines/{id} API                               | US-14            | PAC-EPIC-03     | Medicine & ActiveIngredient | High         | Sprint 2   | Automatic    |
| PAC-TASK-059 | PAC-TASK-059 - Build medicine edit form                                          | US-14            | PAC-EPIC-03     | Medicine & ActiveIngredient | High         | Sprint 2   | Automatic    |
| PAC-TASK-060 | PAC-TASK-060 - Add medicine update validation and errors                         | US-14            | PAC-EPIC-03     | Medicine & ActiveIngredient | Medium       | Sprint 2   | Automatic    |
| PAC-TASK-061 | PAC-TASK-061 - Implement medicine list API with pagination                       | US-15            | PAC-EPIC-03     | Medicine & ActiveIngredient | High         | Sprint 2   | Automatic    |
| PAC-TASK-062 | PAC-TASK-062 - Implement medicine search by code/name                            | US-15            | PAC-EPIC-03     | Medicine & ActiveIngredient | High         | Sprint 2   | Automatic    |
| PAC-TASK-063 | PAC-TASK-063 - Implement medicine filters                                        | US-15            | PAC-EPIC-03     | Medicine & ActiveIngredient | Medium       | Sprint 2   | Automatic    |
| PAC-TASK-064 | PAC-TASK-064 - Build medicine list table                                         | US-15            | PAC-EPIC-03     | Medicine & ActiveIngredient | High         | Sprint 2   | Automatic    |
| PAC-TASK-065 | PAC-TASK-065 - Add medicine list empty/loading/error states                      | US-15            | PAC-EPIC-03     | Medicine & ActiveIngredient | Medium       | Sprint 2   | Automatic    |
| PAC-TASK-066 | PAC-TASK-066 - Implement medicine deactivate API                                 | US-16            | PAC-EPIC-03     | Medicine & ActiveIngredient | Medium       | Sprint 2   | Automatic    |
| PAC-TASK-067 | PAC-TASK-067 - Add deactivate action in medicine UI                              | US-16            | PAC-EPIC-03     | Medicine & ActiveIngredient | Medium       | Sprint 2   | Automatic    |
| PAC-TASK-068 | PAC-TASK-068 - Prevent inactive medicines from POS selection                     | US-16            | PAC-EPIC-03     | Medicine & ActiveIngredient | High         | Sprint 2   | Automatic    |
| PAC-TASK-069 | PAC-TASK-069 - Enforce selling_price greater than 0 in backend                   | US-17            | PAC-EPIC-03     | Medicine & ActiveIngredient | High         | Sprint 2   | Automatic    |
| PAC-TASK-070 | PAC-TASK-070 - Add selling price validation in UI                                | US-17            | PAC-EPIC-03     | Medicine & ActiveIngredient | Medium       | Sprint 2   | Automatic    |
| PAC-TASK-071 | PAC-TASK-071 - Add tests for medicine price validation                           | US-17            | PAC-EPIC-19     | Testing & Setup             | Medium       | Sprint 2   | Automatic    |
| PAC-TASK-072 | PAC-TASK-072 - Create active_ingredients Prisma model                            | US-18            | PAC-EPIC-03     | Medicine & ActiveIngredient | Highest      | Sprint 2   | Automatic    |
| PAC-TASK-073 | PAC-TASK-073 - Implement ActiveIngredient create API                             | US-18            | PAC-EPIC-03     | Medicine & ActiveIngredient | Highest      | Sprint 2   | Automatic    |
| PAC-TASK-074 | PAC-TASK-074 - Implement ActiveIngredient update API                             | US-18            | PAC-EPIC-03     | Medicine & ActiveIngredient | High         | Sprint 2   | Automatic    |
| PAC-TASK-075 | PAC-TASK-075 - Implement ActiveIngredient list/search API                        | US-18            | PAC-EPIC-03     | Medicine & ActiveIngredient | High         | Sprint 2   | Automatic    |
| PAC-TASK-076 | PAC-TASK-076 - Build ActiveIngredient management screen                          | US-18            | PAC-EPIC-03     | Medicine & ActiveIngredient | High         | Sprint 2   | Automatic    |
| PAC-TASK-077 | PAC-TASK-077 - Add ActiveIngredient create/edit form validation                  | US-18            | PAC-EPIC-03     | Medicine & ActiveIngredient | Medium       | Sprint 2   | Automatic    |
| PAC-TASK-078 | PAC-TASK-078 - Create medicine_active_ingredients mapping schema                 | US-19            | PAC-EPIC-03     | Medicine & ActiveIngredient | Highest      | Sprint 2   | Automatic    |
| PAC-TASK-079 | PAC-TASK-079 - Implement Medicine-Ingredient mapping API                         | US-19            | PAC-EPIC-03     | Medicine & ActiveIngredient | Highest      | Sprint 2   | Automatic    |
| PAC-TASK-080 | PAC-TASK-080 - Build ingredient mapping component in Medicine form               | US-19            | PAC-EPIC-03     | Medicine & ActiveIngredient | High         | Sprint 2   | Automatic    |
| PAC-TASK-081 | PAC-TASK-081 - Show mapped ingredients in medicine detail                        | US-19            | PAC-EPIC-03     | Medicine & ActiveIngredient | Medium       | Sprint 2   | Automatic    |
| PAC-TASK-082 | PAC-TASK-082 - Add unique validation for ingredient mapping                      | US-20            | PAC-EPIC-03     | Medicine & ActiveIngredient | High         | Sprint 2   | Automatic    |
| PAC-TASK-083 | PAC-TASK-083 - Prevent mapping inactive ingredient if not allowed                | US-20            | PAC-EPIC-03     | Medicine & ActiveIngredient | Medium       | Sprint 2   | Automatic    |
| PAC-TASK-084 | PAC-TASK-084 - Normalize ActiveIngredient names                                  | US-21            | PAC-EPIC-03     | Medicine & ActiveIngredient | Medium       | Sprint 2   | Automatic    |
| PAC-TASK-085 | PAC-TASK-085 - Reject raw scraped ingredient strings in official mapping         | US-21            | PAC-EPIC-03     | Medicine & ActiveIngredient | Medium       | Sprint 2   | Automatic    |
| PAC-TASK-086 | PAC-TASK-086 - Add ActiveIngredient data quality review checklist                | US-21            | PAC-EPIC-21     | Documentation               | Medium       | Sprint 2   | Automatic    |
| PAC-TASK-087 | PAC-TASK-087 - Create graph sync event when Medicine changes                     | US-22            | PAC-EPIC-03     | Medicine & ActiveIngredient | High         | Sprint 2   | Automatic    |
| PAC-TASK-088 | PAC-TASK-088 - Create graph sync event when ActiveIngredient changes             | US-22            | PAC-EPIC-03     | Medicine & ActiveIngredient | High         | Sprint 2   | Automatic    |
| PAC-TASK-089 | PAC-TASK-089 - Create graph sync event when Ingredient mapping changes           | US-22            | PAC-EPIC-03     | Medicine & ActiveIngredient | High         | Sprint 2   | Automatic    |
| PAC-TASK-090 | PAC-TASK-090 - Create suppliers Prisma model                                     | US-23            | PAC-EPIC-04     | Supplier                    | High         | Sprint 2   | Automatic    |
| PAC-TASK-091 | PAC-TASK-091 - Implement supplier create API                                     | US-23            | PAC-EPIC-04     | Supplier                    | High         | Sprint 2   | Automatic    |
| PAC-TASK-092 | PAC-TASK-092 - Build supplier create form                                        | US-23            | PAC-EPIC-04     | Supplier                    | Medium       | Sprint 2   | Automatic    |
| PAC-TASK-093 | PAC-TASK-093 - Validate supplier required fields                                 | US-23            | PAC-EPIC-04     | Supplier                    | Medium       | Sprint 2   | Automatic    |
| PAC-TASK-094 | PAC-TASK-094 - Implement supplier list/search API                                | US-24            | PAC-EPIC-04     | Supplier                    | High         | Sprint 2   | Automatic    |
| PAC-TASK-095 | PAC-TASK-095 - Implement supplier update API                                     | US-24            | PAC-EPIC-04     | Supplier                    | High         | Sprint 2   | Automatic    |
| PAC-TASK-096 | PAC-TASK-096 - Build supplier list and edit screen                               | US-24            | PAC-EPIC-04     | Supplier                    | Medium       | Sprint 2   | Automatic    |
| PAC-TASK-097 | PAC-TASK-097 - Implement Admin-only supplier deactivate API                      | US-25            | PAC-EPIC-04     | Supplier                    | High         | Sprint 2   | Automatic    |
| PAC-TASK-098 | PAC-TASK-098 - Add supplier deactivate confirmation UI                           | US-25            | PAC-EPIC-04     | Supplier                    | Medium       | Sprint 2   | Automatic    |
| PAC-TASK-099 | PAC-TASK-099 - Prevent inactive supplier in new Stock Import                     | US-25            | PAC-EPIC-04     | Supplier                    | High         | Sprint 2   | Automatic    |
| PAC-TASK-100 | PAC-TASK-100 - Link active supplier selection to Stock Import                    | US-26            | PAC-EPIC-04     | Supplier                    | Medium       | Sprint 2   | Automatic    |
| PAC-TASK-101 | PAC-TASK-101 - Build supplier selector for Stock Import UI                       | US-26            | PAC-EPIC-04     | Supplier                    | Medium       | Sprint 2   | Automatic    |
| PAC-TASK-102 | PAC-TASK-102 - Create medicine_batches Prisma model                              | US-27            | PAC-EPIC-05     | Inventory & MedicineBatch   | Highest      | Sprint 3   | Automatic    |
| PAC-TASK-103 | PAC-TASK-103 - Add MedicineBatch indexes and constraints                         | US-27            | PAC-EPIC-05     | Inventory & MedicineBatch   | Highest      | Sprint 3   | Automatic    |
| PAC-TASK-104 | PAC-TASK-104 - Remove aggregate inventory source-of-truth assumptions            | US-27            | PAC-EPIC-05     | Inventory & MedicineBatch   | Highest      | Sprint 3   | Automatic    |
| PAC-TASK-105 | PAC-TASK-105 - Document MedicineBatch as inventory source of truth               | US-27            | PAC-EPIC-21     | Documentation               | High         | Sprint 3   | Automatic    |
| PAC-TASK-106 | PAC-TASK-106 - Enforce required batch_number                                     | US-28            | PAC-EPIC-05     | Inventory & MedicineBatch   | Highest      | Sprint 3   | Automatic    |
| PAC-TASK-107 | PAC-TASK-107 - Normalize batch_number before comparison                          | US-28            | PAC-EPIC-05     | Inventory & MedicineBatch   | High         | Sprint 3   | Automatic    |
| PAC-TASK-108 | PAC-TASK-108 - Add UI validation for batch_number                                | US-28            | PAC-EPIC-05     | Inventory & MedicineBatch   | Medium       | Sprint 3   | Automatic    |
| PAC-TASK-109 | PAC-TASK-109 - Implement batch identity validation service                       | US-29            | PAC-EPIC-05     | Inventory & MedicineBatch   | Highest      | Sprint 3   | Automatic    |
| PAC-TASK-110 | PAC-TASK-110 - Add migration constraint for medicine/batch/expiry uniqueness     | US-29            | PAC-EPIC-05     | Inventory & MedicineBatch   | Highest      | Sprint 3   | Automatic    |
| PAC-TASK-111 | PAC-TASK-111 - Add batch identity unit tests                                     | US-29            | PAC-EPIC-19     | Testing & Setup             | High         | Sprint 3   | Automatic    |
| PAC-TASK-112 | PAC-TASK-112 - Implement inventory summary query from MedicineBatch              | US-30            | PAC-EPIC-05     | Inventory & MedicineBatch   | Highest      | Sprint 3   | Automatic    |
| PAC-TASK-113 | PAC-TASK-113 - Build Inventory Summary screen                                    | US-30            | PAC-EPIC-05     | Inventory & MedicineBatch   | High         | Sprint 3   | Automatic    |
| PAC-TASK-114 | PAC-TASK-114 - Add search/filter to Inventory Summary                            | US-30            | PAC-EPIC-05     | Inventory & MedicineBatch   | Medium       | Sprint 3   | Automatic    |
| PAC-TASK-115 | PAC-TASK-115 - Implement Batch Detail API                                        | US-31            | PAC-EPIC-05     | Inventory & MedicineBatch   | High         | Sprint 3   | Automatic    |
| PAC-TASK-116 | PAC-TASK-116 - Build Batch Detail screen                                         | US-31            | PAC-EPIC-05     | Inventory & MedicineBatch   | Medium       | Sprint 3   | Automatic    |
| PAC-TASK-117 | PAC-TASK-117 - Display expired/near-expiry/sellable batch status                 | US-31            | PAC-EPIC-05     | Inventory & MedicineBatch   | Medium       | Sprint 3   | Automatic    |
| PAC-TASK-118 | PAC-TASK-118 - Implement sellable quantity calculation service                   | US-32            | PAC-EPIC-05     | Inventory & MedicineBatch   | Highest      | Sprint 3   | Automatic    |
| PAC-TASK-119 | PAC-TASK-119 - Add tests for sellable quantity calculation                       | US-32            | PAC-EPIC-19     | Testing & Setup             | High         | Sprint 3   | Automatic    |
| PAC-TASK-120 | PAC-TASK-120 - Exclude expired batches from sellable stock                       | US-33            | PAC-EPIC-05     | Inventory & MedicineBatch   | Highest      | Sprint 3   | Automatic    |
| PAC-TASK-121 | PAC-TASK-121 - Add tests for expired batch exclusion                             | US-33            | PAC-EPIC-19     | Testing & Setup             | High         | Sprint 3   | Automatic    |
| PAC-TASK-122 | PAC-TASK-122 - Implement low-stock calculation from sellable quantity            | US-34            | PAC-EPIC-05     | Inventory & MedicineBatch   | High         | Sprint 3   | Automatic    |
| PAC-TASK-123 | PAC-TASK-123 - Display low-stock state for Admin/Warehouse                       | US-34            | PAC-EPIC-05     | Inventory & MedicineBatch   | Medium       | Sprint 3   | Automatic    |
| PAC-TASK-124 | PAC-TASK-124 - Hide general low-stock dashboard from Staff                       | US-34            | PAC-EPIC-05     | Inventory & MedicineBatch   | Medium       | Sprint 3   | Automatic    |
| PAC-TASK-125 | PAC-TASK-125 - Implement near-expiry calculation with threshold                  | US-35            | PAC-EPIC-05     | Inventory & MedicineBatch   | High         | Sprint 3   | Automatic    |
| PAC-TASK-126 | PAC-TASK-126 - Display near-expiry batch state                                   | US-35            | PAC-EPIC-05     | Inventory & MedicineBatch   | Medium       | Sprint 3   | Automatic    |
| PAC-TASK-127 | PAC-TASK-127 - Build Admin/Warehouse inventory dashboard cards                   | US-36            | PAC-EPIC-05     | Inventory & MedicineBatch   | Medium       | Sprint 3   | Automatic    |
| PAC-TASK-128 | PAC-TASK-128 - Build POS sellable stock display                                  | US-37            | PAC-EPIC-05     | Inventory & MedicineBatch   | High         | Sprint 3   | Automatic    |
| PAC-TASK-129 | PAC-TASK-129 - Remove direct quantity edit from Batch Detail UI                  | US-38            | PAC-EPIC-05     | Inventory & MedicineBatch   | Highest      | Sprint 3   | Automatic    |
| PAC-TASK-130 | PAC-TASK-130 - Ensure no public API directly edits batch quantity                | US-38            | PAC-EPIC-05     | Inventory & MedicineBatch   | Highest      | Sprint 3   | Automatic    |
| PAC-TASK-131 | PAC-TASK-131 - Create stock_imports Prisma model                                 | US-39            | PAC-EPIC-06     | Stock Import                | High         | Sprint 3   | Automatic    |
| PAC-TASK-132 | PAC-TASK-132 - Implement create Stock Import draft API                           | US-39            | PAC-EPIC-06     | Stock Import                | High         | Sprint 3   | Automatic    |
| PAC-TASK-133 | PAC-TASK-133 - Build create Stock Import screen                                  | US-39            | PAC-EPIC-06     | Stock Import                | Medium       | Sprint 3   | Automatic    |
| PAC-TASK-134 | PAC-TASK-134 - Create stock_import_lines Prisma model                            | US-40            | PAC-EPIC-06     | Stock Import                | High         | Sprint 3   | Automatic    |
| PAC-TASK-135 | PAC-TASK-135 - Implement add stock import line API                               | US-40            | PAC-EPIC-06     | Stock Import                | High         | Sprint 3   | Automatic    |
| PAC-TASK-136 | PAC-TASK-136 - Build stock import line editor UI                                 | US-40            | PAC-EPIC-06     | Stock Import                | High         | Sprint 3   | Automatic    |
| PAC-TASK-137 | PAC-TASK-137 - Implement update draft import line API                            | US-41            | PAC-EPIC-06     | Stock Import                | Medium       | Sprint 3   | Automatic    |
| PAC-TASK-138 | PAC-TASK-138 - Implement delete draft import line API                            | US-41            | PAC-EPIC-06     | Stock Import                | Medium       | Sprint 3   | Automatic    |
| PAC-TASK-139 | PAC-TASK-139 - Disable edit/delete for confirmed import lines                    | US-41            | PAC-EPIC-06     | Stock Import                | Medium       | Sprint 3   | Automatic    |
| PAC-TASK-140 | PAC-TASK-140 - Validate active supplier before confirm import                    | US-42            | PAC-EPIC-06     | Stock Import                | High         | Sprint 3   | Automatic    |
| PAC-TASK-141 | PAC-TASK-141 - Validate batch number in import line                              | US-43            | PAC-EPIC-06     | Stock Import                | Highest      | Sprint 3   | Automatic    |
| PAC-TASK-142 | PAC-TASK-142 - Validate expiry date in import line                               | US-43            | PAC-EPIC-06     | Stock Import                | Highest      | Sprint 3   | Automatic    |
| PAC-TASK-143 | PAC-TASK-143 - Implement confirm Stock Import transaction skeleton               | US-44            | PAC-EPIC-06     | Stock Import                | Highest      | Sprint 3   | Automatic    |
| PAC-TASK-144 | PAC-TASK-144 - Apply stock import lines to MedicineBatch                         | US-44            | PAC-EPIC-06     | Stock Import                | Highest      | Sprint 3   | Automatic    |
| PAC-TASK-145 | PAC-TASK-145 - Rollback Stock Import confirm on any invalid line                 | US-44            | PAC-EPIC-06     | Stock Import                | Highest      | Sprint 3   | Automatic    |

---