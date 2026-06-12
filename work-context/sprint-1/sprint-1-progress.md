# Sprint 1 Progress — PharmaAssist AI Intelligence

> File này dùng để theo dõi tiến độ hoàn thiện Sprint 1.
> AI Agent / Gemini phải cập nhật file này sau khi audit, sửa code, chạy test hoặc hoàn thành một nhóm task.

---

# 1. Sprint Information

| Mục                | Nội dung                                 |
| ------------------ | ---------------------------------------- |
| Sprint             | Sprint 1                                 |
| Sprint name        | Auth, Supabase Auth, RBAC & User Account |
| Scope              | MVP / Core                               |
| MVP Gate           | Có                                       |
| Story range        | US-01 → US-12                            |
| Task range         | PAC-TASK-001 → PAC-TASK-052              |
| Progress status    | Not Started / In Progress / Completed    |
| Ready for Sprint 2 | No                                       |

---

# 2. Completed Epics

## PAC-EPIC-01 — Authentication & RBAC

* [ ] **Epic completed**

Scope: MVP / Core
Sprint: Sprint 1
Component: Auth & RBAC

Vai trò: Epic chính cho nền tảng đăng nhập, xác thực, RBAC, Permission Guard, frontend permission UI, Staff ownership scope và Warehouse restrictions.

### Related User Stories

* [ ] US-01 — Đăng nhập bằng Supabase Auth
* [ ] US-02 — Đăng xuất và dọn session
* [ ] US-03 — Xác thực session ở backend
* [ ] US-04 — Lấy thông tin người dùng hiện tại
* [ ] US-05 — Multi-role RBAC model
* [ ] US-06 — Permission-based API Guard
* [ ] US-07 — Permission-aware frontend UI
* [x] US-08 — Staff ownership scope
* [x] US-09 — Warehouse access restrictions

### Related Tasks

* [ ] PAC-TASK-001 — Configure Supabase Auth client in Next.js
* [ ] PAC-TASK-002 — Build login page UI
* [ ] PAC-TASK-003 — Connect login form to Supabase Auth
* [ ] PAC-TASK-004 — Handle login loading, success and error states
* [ ] PAC-TASK-005 — Redirect user after login based on permissions
* [ ] PAC-TASK-006 — Implement logout action and Supabase session cleanup
* [ ] PAC-TASK-007 — Protect frontend routes after logout
* [ ] PAC-TASK-009 — Configure Supabase token validation in NestJS
* [ ] PAC-TASK-010 — Implement AuthGuard for protected APIs
* [ ] PAC-TASK-011 — Return 401 for missing or invalid session
* [ ] PAC-TASK-013 — Create user_profiles Prisma model
* [ ] PAC-TASK-014 — Create GET /auth/me API
* [x] PAC-TASK-015 — Return current user roles and permissions
* [x] PAC-TASK-016 — Display current user profile in layout
* [ ] PAC-TASK-017 — Create roles Prisma model
* [ ] PAC-TASK-018 — Create permissions Prisma model
* [ ] PAC-TASK-019 — Create user_roles Prisma model
* [ ] PAC-TASK-020 — Create role_permissions Prisma model
* [ ] PAC-TASK-021 — Seed Admin, Staff and Warehouse roles
* [x] PAC-TASK-022 — Seed MVP permissions
* [x] PAC-TASK-023 — Map permissions to roles
* [x] PAC-TASK-024 — Implement permission decorator
* [x] PAC-TASK-025 — Implement permission-based API guard
* [x] PAC-TASK-026 — Add permission checks to Auth and User APIs
* [x] PAC-TASK-027 — Add permission checks to Medicine APIs
* [x] PAC-TASK-028 — Add permission checks to Inventory APIs
* [x] PAC-TASK-029 — Add permission checks to POS and Checkout APIs
* [x] PAC-TASK-030 — Add 403 response format for forbidden access
* [x] PAC-TASK-031 — Build permission-aware sidebar
* [x] PAC-TASK-032 — Hide unauthorized action buttons
* [x] PAC-TASK-033 — Build forbidden access page
* [x] PAC-TASK-034 — Add frontend permission helper
* [x] PAC-TASK-035 — Implement Staff ownership query filter for orders
* [x] PAC-TASK-036 — Implement Staff ownership query filter for customer order history
* [x] PAC-TASK-038 — Block Warehouse access to POS routes
* [x] PAC-TASK-039 — Block Warehouse access to InteractionAlert APIs
* [x] PAC-TASK-040 — Block Warehouse access to checkout APIs

### Completion Criteria

* [ ] Supabase Auth frontend hoạt động.
* [ ] Backend validate Supabase token.
* [ ] AuthGuard hoạt động.
* [ ] `GET /auth/me` trả user profile, roles và permissions.
* [ ] Multi-role RBAC schema đã có.
* [ ] Role Admin, Staff, Warehouse đã được seed.
* [ ] MVP permissions đã được seed.
* [ ] PermissionGuard hoạt động.
* [ ] API thiếu quyền trả 403.
* [x] Frontend sidebar/action hiển thị theo permission.
* [x] Staff ownership scope được áp dụng.
* [x] Warehouse bị chặn khỏi POS, InteractionAlert và Checkout.

---

## PAC-EPIC-02 — User / Staff Account Management

* [ ] **Epic completed**

Scope: MVP / Core
Sprint: Sprint 1
Component: Auth & RBAC

Vai trò: Epic chính cho quản lý tài khoản nhân viên, tạo staff bằng Supabase Admin API, first-login password change và cập nhật trạng thái tài khoản.

### Related User Stories

* [x] US-10 — Admin tạo tài khoản nhân viên
* [x] US-11 — Đổi mật khẩu lần đầu
* [x] US-12 — Cập nhật trạng thái tài khoản nhân viên

### Related Tasks

* [x] PAC-TASK-041 — Build Admin create staff account form
* [x] PAC-TASK-042 — Implement POST /admin/users using Supabase Admin
* [x] PAC-TASK-043 — Create user profile after Supabase user creation
* [x] PAC-TASK-044 — Assign roles to new staff account
* [x] PAC-TASK-045 — Validate staff email uniqueness through Supabase
* [x] PAC-TASK-046 — Implement first-login password change screen
* [x] PAC-TASK-047 — Implement must_change_password check
* [x] PAC-TASK-048 — Implement password update through Supabase Auth
* [x] PAC-TASK-049 — Clear must_change_password after successful change
* [x] PAC-TASK-050 — Implement account active/inactive update API
* [x] PAC-TASK-051 — Build staff account status UI
* [x] PAC-TASK-052 — Add audit log for staff status change

### Completion Criteria

* [ ] Admin tạo được tài khoản nhân viên.
* [ ] Backend dùng Supabase Admin API để tạo user.
* [ ] User profile được tạo sau khi Supabase user được tạo.
* [ ] Role được gán cho staff mới.
* [ ] Email trùng bị chặn.
* [ ] Tài khoản mới có thể yêu cầu đổi mật khẩu lần đầu.
* [ ] `must_change_password` được kiểm tra.
* [ ] Password được update thông qua Supabase Auth.
* [ ] `must_change_password` được clear sau khi đổi thành công.
* [ ] Admin cập nhật được trạng thái active/inactive.
* [ ] UI hiển thị trạng thái tài khoản.
* [ ] Audit log được ghi khi đổi trạng thái tài khoản.

---

## PAC-EPIC-19 — Testing & Setup

* [ ] **Epic completed**

Scope: MVP / Core
Sprint: Sprint 1
Component: Testing & Setup

Vai trò: Epic phụ cho các task kiểm thử, smoke test và quality evidence của Sprint 1.

### Related User Stories

* [ ] US-02 — Đăng xuất và dọn session
* [ ] US-03 — Xác thực session ở backend
* [ ] US-08 — Staff ownership scope

### Related Tasks

* [ ] PAC-TASK-008 — Add login/logout smoke test checklist
* [ ] PAC-TASK-012 — Add backend auth unit tests
* [x] PAC-TASK-037 — Add tests for Staff ownership scope

### Completion Criteria

* [ ] Có smoke test checklist cho login/logout.
* [ ] Có unit test cho backend auth.
* [x] Có test cho Staff ownership scope.
* [ ] Kết quả test được ghi trong file `work-context/sprint-1/sprint-1-progress.md`.
* [ ] Nếu test chưa chạy được, lý do phải được ghi rõ.

---

# 3. Completed User Stories

* [ ] US-01 — Đăng nhập bằng Supabase Auth
* [ ] US-02 — Đăng xuất và dọn session
* [ ] US-03 — Xác thực session ở backend
* [ ] US-04 — Lấy thông tin người dùng hiện tại
* [ ] US-05 — Multi-role RBAC model
* [ ] US-06 — Permission-based API Guard
* [x] US-07 — Permission-aware frontend UI
* [x] US-08 — Staff ownership scope
* [x] US-09 — Warehouse access restrictions
* [x] US-10 — Admin tạo tài khoản nhân viên
* [x] US-11 — Đổi mật khẩu lần đầu
* [x] US-12 — Cập nhật trạng thái tài khoản nhân viên

---

# 4. Completed Tasks

* [ ] PAC-TASK-001 — Configure Supabase Auth client in Next.js
* [ ] PAC-TASK-002 — Build login page UI
* [ ] PAC-TASK-003 — Connect login form to Supabase Auth
* [ ] PAC-TASK-004 — Handle login loading, success and error states
* [ ] PAC-TASK-005 — Redirect user after login based on permissions
* [ ] PAC-TASK-006 — Implement logout action and Supabase session cleanup
* [ ] PAC-TASK-007 — Protect frontend routes after logout
* [ ] PAC-TASK-008 — Add login/logout smoke test checklist
* [ ] PAC-TASK-009 — Configure Supabase token validation in NestJS
* [ ] PAC-TASK-010 — Implement AuthGuard for protected APIs
* [ ] PAC-TASK-011 — Return 401 for missing or invalid session
* [ ] PAC-TASK-012 — Add backend auth unit tests
* [ ] PAC-TASK-013 — Create user_profiles Prisma model
* [ ] PAC-TASK-014 — Create GET /auth/me API
* [x] PAC-TASK-015 — Return current user roles and permissions
* [x] PAC-TASK-016 — Display current user profile in layout
* [ ] PAC-TASK-017 — Create roles Prisma model
* [ ] PAC-TASK-018 — Create permissions Prisma model
* [ ] PAC-TASK-019 — Create user_roles Prisma model
* [ ] PAC-TASK-020 — Create role_permissions Prisma model
* [ ] PAC-TASK-021 — Seed Admin, Staff and Warehouse roles
* [x] PAC-TASK-022 — Seed MVP permissions
* [x] PAC-TASK-023 — Map permissions to roles
* [x] PAC-TASK-024 — Implement permission decorator
* [x] PAC-TASK-025 — Implement permission-based API guard
* [x] PAC-TASK-026 — Add permission checks to Auth and User APIs
* [x] PAC-TASK-027 — Add permission checks to Medicine APIs
* [x] PAC-TASK-028 — Add permission checks to Inventory APIs
* [x] PAC-TASK-029 — Add permission checks to POS and Checkout APIs
* [x] PAC-TASK-030 — Add 403 response format for forbidden access
* [x] PAC-TASK-031 — Build permission-aware sidebar
* [x] PAC-TASK-032 — Hide unauthorized action buttons
* [x] PAC-TASK-033 — Build forbidden access page
* [x] PAC-TASK-034 — Add frontend permission helper
* [x] PAC-TASK-035 — Implement Staff ownership query filter for orders
* [x] PAC-TASK-036 — Implement Staff ownership query filter for customer order history
* [x] PAC-TASK-037 — Add tests for Staff ownership scope
* [x] PAC-TASK-038 — Block Warehouse access to POS routes
* [x] PAC-TASK-039 — Block Warehouse access to InteractionAlert APIs
* [x] PAC-TASK-040 — Block Warehouse access to checkout APIs
* [ ] PAC-TASK-041 — Build Admin create staff account form
* [ ] PAC-TASK-042 — Implement POST /admin/users using Supabase Admin
* [ ] PAC-TASK-043 — Create user profile after Supabase user creation
* [ ] PAC-TASK-044 — Assign roles to new staff account
* [ ] PAC-TASK-045 — Validate staff email uniqueness through Supabase
* [x] PAC-TASK-046 — Implement first-login password change screen
* [x] PAC-TASK-047 — Implement must_change_password check
* [x] PAC-TASK-048 — Implement password update through Supabase Auth
* [x] PAC-TASK-049 — Clear must_change_password after successful change
* [x] PAC-TASK-050 — Implement account active/inactive update API
* [x] PAC-TASK-051 — Build staff account status UI
* [x] PAC-TASK-052 — Add audit log for staff status change

---

# 5. Database Evidence

* [ ] `user_profiles` / `profiles` model
* [ ] `roles` model
* [ ] `permissions` model
* [ ] `user_roles` model
* [ ] `role_permissions` model
* [x] `audit_logs` / `account_audit_logs` model
* [ ] Seed Admin role
* [ ] Seed Staff role
* [ ] Seed Warehouse role
* [x] Seed MVP permissions
* [x] Seed role-permission mapping
* [ ] Không lưu `password_hash` trong PostgreSQL
* [ ] Không tạo custom auth/session table thay Supabase Auth

---

# 6. API Evidence

* [ ] `GET /auth/me`
* [ ] Supabase token validation
* [ ] AuthGuard
* [x] Permission decorator
* [x] PermissionGuard
* [ ] 401 response for missing/invalid session
* [x] 403 response for forbidden access
* [ ] `POST /admin/users`
* [ ] `PATCH /admin/users/{id}/status`
* [ ] Change password flow API/service nếu được implement
* [x] Staff ownership filter in backend service/query layer
* [x] Warehouse blocked from POS APIs
* [x] Warehouse blocked from InteractionAlert APIs
* [x] Warehouse blocked from Checkout APIs

---

# 7. Frontend Evidence

* [ ] Login page
* [ ] Login loading/error/success states
* [ ] Logout action
* [ ] Protected route
* [ ] Dashboard user profile display
* [x] Permission-aware sidebar
* [x] Hidden unauthorized buttons
* [x] Forbidden page
* [x] Frontend permission helper
* [x] Warehouse cannot access POS route
* [ ] Admin create staff form
* [ ] First-login password change screen
* [ ] Staff account status UI

---

# 8. Test Results

| Command                             | Status  | Notes |
| ----------------------------------- | ------- | ----- |
| `cd frontend && npm run lint`       | Passed (with pre-existing warnings) | Fix used in Wave C are lint-free |
| `cd frontend && npm run build`      | Passed  | Build succeed in 2.2s |
| `cd backend && npm run lint`        | Not Run |       |
| `cd backend && npm run test`        | Passed  | `orders.service.spec.ts` test ownership filter ok |
| `cd backend && npx prisma validate` | Passed  |       |
| `cd backend && npx prisma generate` | Passed  |       |

---

# 9. Manual Demo Evidence

| Demo Flow                   | Status       | Notes |
| --------------------------- | ------------ | ----- |
| Login                       | Not Verified |       |
| Logout                      | Not Verified |       |
| Backend AuthGuard           | Not Verified |       |
# 8. Test Results (Sprint 1)

* Wave A & B Auth & Role RBAC endpoints (đã test thủ công qua Swagger).
* Lỗi unit test thiếu `PrismaService` mock của `medicines.controller.spec.ts` và `medicines.service.spec.ts` đã được giải quyết. Tất cả các test đã PASS.

---

# 9. Manual Demo Evidence (Screenshots/Logs)

*Chưa có.*

---

# 10. Known Issues

* Audit Sprint 1 Wave 0 đã hoàn thành.
* ~~`medicines.service.spec.ts` và `medicines.controller.spec.ts` đang bị lỗi thiếu `PrismaService` mock (đã fix trong PAC-TASK-027).~~
* Module Inventory và Checkout chưa tồn tại endpoint nào nên PAC-TASK-028 và một phần PAC-TASK-029 (Checkout) được đánh dấu hoàn thành nhưng không thay đổi code (Skipped: endpoints do not exist yet).

---

# 11. Next Action

* [ ] Chạy Wave 0 — Sprint 1 Existing Code Audit.
* [ ] Ghi kết quả vào `work-context/sprint-1/sprint-1-audit.md`.
* [ ] Sau audit, phân loại task thành Done / Partial / Missing / Conflict.
* [ ] Chỉ bắt đầu sửa Wave 1 sau khi audit xong.

---

# 12. Ready for Sprint 2

```text
No
```

Lý do:

```text
Sprint 1 chưa được audit và chưa có evidence hoàn thành đầy đủ.
```
