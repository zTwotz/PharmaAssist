# PharmaAssist — Sprint 1 Working Context

> File này là ngữ cảnh làm việc chính thức cho Sprint 1.
> Gemini / AI Agent phải đọc file này trước khi audit, sửa code hoặc hoàn thiện Sprint 1.

---

# 1. Sprint Metadata

| Mục                | Nội dung                                     |
| ------------------ | -------------------------------------------- |
| Project            | PharmaAssist AI Intelligence                 |
| Sprint             | Sprint 1                                     |
| Sprint name        | Auth, Supabase Auth, RBAC & User Account     |
| Scope              | MVP / Core                                   |
| MVP Gate           | Có                                           |
| Jira Project Key   | PAC                                          |
| Story range        | US-01 → US-12                                |
| Task range         | PAC-TASK-001 → PAC-TASK-052                  |
| Tổng số User Story | 12                                           |
| Tổng số Task       | 52                                           |
| Epic liên quan     | PAC-EPIC-01, PAC-EPIC-02, PAC-EPIC-19        |
| Component chính    | Auth & RBAC                                  |
| File audit         | `work-context/sprint-1/sprint-1-audit.md`    |
| File progress      | `work-context/sprint-1/sprint-1-progress.md` |

---

# 2. Mục đích của file này

File này dùng để hướng dẫn AI Agent làm việc với Sprint 1 theo đúng cấu trúc repo hiện tại.

AI Agent phải dùng file này để:

1. Hiểu phạm vi Sprint 1.
2. Biết Sprint 1 gồm Epic, User Story và Task nào.
3. Audit code hiện tại trước khi sửa.
4. Không tạo lại project từ đầu.
5. Không tạo file evidence riêng cho từng task nếu chưa cần.
6. Cập nhật tiến độ vào `work-context/sprint-1/sprint-1-progress.md`.
7. Ghi kết quả audit vào `work-context/sprint-1/sprint-1-audit.md`.
8. Không mở rộng scope sang Sprint 2.
9. Không phá baseline Supabase Auth, RBAC và User Account đã chốt.

---

# 3. Repo hiện tại

Repo hiện tại không phải dự án trống. AI Agent phải tận dụng cấu trúc đã có.

Các thư mục quan trọng:

```text
.agents/
AGENTS.md
DOC/
Jira/
database/
backend/
frontend/
work-context/
```

## 3.1. Agent rules

Repo đã có:

```text
AGENTS.md
.agents/DESIGN.md
.agents/agent/planner_agent.md
.agents/agent/backend_agent.md
.agents/agent/database_agent.md
.agents/agent/frontend_agent.md
.agents/agent/qa_agent.md
.agents/rules/rules-w-pharmaassist.md
.agents/workflows/workflows-w-pharmaassist.md
```

AI Agent phải đọc `AGENTS.md` và các rule liên quan trước khi sửa code.

## 3.2. Backend hiện tại

Backend nằm tại:

```text
backend/
```

Backend hiện có NestJS, Prisma và các module:

```text
backend/src/auth
backend/src/users
backend/src/roles
backend/src/medicines
backend/src/orders
backend/src/interactions
backend/src/products
backend/src/prisma
```

Đặc biệt cần audit kỹ:

```text
backend/src/auth/jwt-auth.guard.ts
backend/src/auth/jwt.strategy.ts
backend/src/auth/roles.decorator.ts
backend/src/auth/roles.guard.ts
backend/src/auth/auth.service.ts
backend/src/auth/auth.controller.ts
```

Lý do: Sprint 1 baseline yêu cầu **Supabase Auth**, không phải custom JWT auth.

## 3.3. Frontend hiện tại

Frontend nằm tại:

```text
frontend/
```

Frontend hiện có Next.js và các file liên quan Sprint 1:

```text
frontend/src/app/login/page.tsx
frontend/src/context/auth-context.tsx
frontend/src/components/route-guard.tsx
frontend/src/components/sidebar.tsx
frontend/src/lib/supabase.ts
frontend/src/lib/auth-service.ts
frontend/src/lib/api.ts
frontend/src/app/dashboard/staff/page.tsx
frontend/src/app/dashboard/staff/new/page.tsx
frontend/src/app/dashboard/staff/components/UpdateStaffDialog.tsx
```

AI Agent phải sửa code hiện có nếu có thể, không tạo file trùng không cần thiết.

## 3.4. Database hiện tại

Database và Prisma nằm tại:

```text
backend/prisma/schema.prisma
backend/prisma/seed.ts
backend/prisma/migrations/
database/schema/1_100_bang.md
database/schema/01_auth_rbac.sql
database/schema/99_seed_demo_data.sql
database/optimized/
database/normalized/
```

Dự án sử dụng `database/schema/1_100_bang.md` làm Master Database Blueprint.

Tuy nhiên, Sprint 1 chỉ tập trung nhóm Auth/RBAC/User Account, không implement toàn bộ 100 bảng.

## 3.5. Work context hiện tại

Sprint 1 dùng đúng 3 file:

```text
work-context/sprint-1/sprint-1.md
work-context/sprint-1/sprint-1-audit.md
work-context/sprint-1/sprint-1-progress.md
```

Không tạo thêm nhiều file nếu chưa cần.

---

# 4. Source of Truth Priority

Khi có mâu thuẫn, AI Agent ưu tiên theo thứ tự:

1. `AGENTS.md`
2. `.agents/rules/rules-w-pharmaassist.md`
3. `work-context/sprint-1/sprint-1.md`
4. `DOC/01_project_overview_current_baseline.md`
5. `DOC/06_software_requirements_specification.md`
6. `DOC/07_roles_permissions_authorization.md`
7. `DOC/12_api_specification.md`
8. `DOC/13_database_design_erd.md`
9. `DOC/14_prisma_schema_migration_design.md`
10. `Jira/3_Stories.md`
11. `Jira/4A_Task_MVP_Foundation_001_145.md`
12. `Jira/5_Sprint.md`
13. `database/schema/1_100_bang.md`
14. Existing source code

Quy tắc xử lý conflict:

```text
Nếu code hiện tại mâu thuẫn với baseline, không tự ý sửa ngay.
Trước tiên ghi conflict vào sprint-1-audit.md.
Sau đó đề xuất cách sửa an toàn.
Chỉ sửa code khi người dùng yêu cầu hoặc khi task/wave đã được cho phép.
```

---

# 5. Sprint 1 Baseline

Sprint 1 là nền móng bảo mật của toàn bộ hệ thống.

Sprint 1 phải hoàn thiện:

1. Supabase Auth frontend.
2. Logout và session cleanup.
3. Backend Supabase token validation.
4. AuthGuard cho protected APIs.
5. Current user profile.
6. Multi-role RBAC.
7. Permission-based API Guard.
8. Permission-aware frontend UI.
9. Staff ownership scope.
10. Warehouse access restrictions.
11. Admin tạo tài khoản nhân viên.
12. First-login password change.
13. Account active/inactive status.
14. Audit log cho thay đổi trạng thái tài khoản.
15. Test/checklist tối thiểu cho Auth/RBAC.

---

# 6. Hard Guardrails

AI Agent tuyệt đối không được:

1. Không thay Supabase Auth bằng custom JWT.
2. Không tạo custom username/password auth riêng.
3. Không lưu `password_hash` trong PostgreSQL.
4. Không tự tạo bảng password/session thay Supabase.
5. Không bỏ qua Supabase token validation ở backend.
6. Không chỉ dùng role-only authorization nếu task yêu cầu permission-based guard.
7. Không để Warehouse truy cập POS, Checkout hoặc InteractionAlert.
8. Không để Staff xem dữ liệu toàn hệ thống nếu không có quyền Admin.
9. Không implement toàn bộ 100 bảng trong Sprint 1.
10. Không triển khai đầy đủ Medicine/Inventory/POS/AI/Graph trong Sprint 1.
11. Không chạy lệnh phá dữ liệu như `prisma migrate reset`, `supabase db reset`, `rm -rf`, `git clean -fdx` nếu chưa được phép.
12. Không tạo nhiều file evidence riêng từng task nếu người dùng chưa yêu cầu.
13. Không tạo thêm thư mục phức tạp ngoài `work-context/sprint-1`.

---

# 7. Sprint 1 Epics

## 7.1. PAC-EPIC-01 — Authentication & RBAC

Vai trò: Epic chính cho Auth, RBAC, Permission Guard, Permission UI, Staff scope và Warehouse restrictions.

Related User Stories:

* US-01 — Đăng nhập bằng Supabase Auth
* US-02 — Đăng xuất và dọn session
* US-03 — Xác thực session ở backend
* US-04 — Lấy thông tin người dùng hiện tại
* US-05 — Multi-role RBAC model
* US-06 — Permission-based API Guard
* US-07 — Permission-aware frontend UI
* US-08 — Staff ownership scope
* US-09 — Warehouse access restrictions

Related Tasks:

* PAC-TASK-001 → PAC-TASK-007
* PAC-TASK-009 → PAC-TASK-011
* PAC-TASK-013 → PAC-TASK-036
* PAC-TASK-038 → PAC-TASK-040

---

## 7.2. PAC-EPIC-02 — User / Staff Account Management

Vai trò: Epic chính cho quản lý tài khoản nhân viên.

Related User Stories:

* US-10 — Admin tạo tài khoản nhân viên
* US-11 — Đổi mật khẩu lần đầu
* US-12 — Cập nhật trạng thái tài khoản nhân viên

Related Tasks:

* PAC-TASK-041 → PAC-TASK-052

---

## 7.3. PAC-EPIC-19 — Testing & Setup

Vai trò: Epic phụ cho kiểm thử Sprint 1.

Related User Stories:

* US-02 — Đăng xuất và dọn session
* US-03 — Xác thực session ở backend
* US-08 — Staff ownership scope

Related Tasks:

* PAC-TASK-008
* PAC-TASK-012
* PAC-TASK-037

---

# 8. User Story và Task Mapping

## US-01 — Đăng nhập bằng Supabase Auth

Tasks:

* PAC-TASK-001 — Configure Supabase Auth client in Next.js
* PAC-TASK-002 — Build login page UI
* PAC-TASK-003 — Connect login form to Supabase Auth
* PAC-TASK-004 — Handle login loading, success and error states
* PAC-TASK-005 — Redirect user after login based on permissions

Expected result:

```text
frontend/src/lib/supabase.ts đúng Supabase client.
frontend/src/app/login/page.tsx login bằng Supabase Auth.
Login có loading/error/success.
Sau login redirect đúng.
```

---

## US-02 — Đăng xuất và dọn session

Tasks:

* PAC-TASK-006 — Implement logout action and Supabase session cleanup
* PAC-TASK-007 — Protect frontend routes after logout
* PAC-TASK-008 — Add login/logout smoke test checklist

Expected result:

```text
Logout gọi Supabase signOut.
Protected route không truy cập được sau logout.
Có checklist login/logout trong sprint-1-progress.md hoặc sprint-1-audit.md.
```

---

## US-03 — Xác thực session ở backend

Tasks:

* PAC-TASK-009 — Configure Supabase token validation in NestJS
* PAC-TASK-010 — Implement AuthGuard for protected APIs
* PAC-TASK-011 — Return 401 for missing or invalid session
* PAC-TASK-012 — Add backend auth unit tests

Expected result:

```text
Backend validate Supabase token.
Không dùng custom JWT làm auth chính.
Protected API thiếu/sai token trả 401.
Có test hoặc test plan cho AuthGuard.
```

Important audit target:

```text
backend/src/auth/jwt-auth.guard.ts
backend/src/auth/jwt.strategy.ts
```

Nếu các file này đang là auth chính, đánh dấu Conflict trong audit.

---

## US-04 — Lấy thông tin người dùng hiện tại

Tasks:

* PAC-TASK-013 — Create user_profiles Prisma model
* PAC-TASK-014 — Create GET /auth/me API
* PAC-TASK-015 — Return current user roles and permissions
* PAC-TASK-016 — Display current user profile in layout

Expected result:

```text
Có user profile liên kết Supabase auth user.
GET /auth/me trả profile, roles, permissions.
Frontend layout hiển thị current user.
```

---

## US-05 — Multi-role RBAC model

Tasks:

* PAC-TASK-017 — Create roles Prisma model
* PAC-TASK-018 — Create permissions Prisma model
* PAC-TASK-019 — Create user_roles Prisma model
* PAC-TASK-020 — Create role_permissions Prisma model
* PAC-TASK-021 — Seed Admin, Staff and Warehouse roles
* PAC-TASK-022 — Seed MVP permissions
* PAC-TASK-023 — Map permissions to roles

Expected result:

```text
Một user có thể có nhiều role.
Role có nhiều permission.
Seed đủ Admin, Staff, Warehouse.
Seed đủ MVP permissions.
```

---

## US-06 — Permission-based API Guard

Tasks:

* PAC-TASK-024 — Implement permission decorator
* PAC-TASK-025 — Implement permission-based API guard
* PAC-TASK-026 — Add permission checks to Auth and User APIs
* PAC-TASK-027 — Add permission checks to Medicine APIs
* PAC-TASK-028 — Add permission checks to Inventory APIs
* PAC-TASK-029 — Add permission checks to POS and Checkout APIs
* PAC-TASK-030 — Add 403 response format for forbidden access

Expected result:

```text
Có Permission decorator.
Có PermissionGuard.
API thiếu quyền trả 403.
Không chỉ dùng role-only guard.
```

Important audit target:

```text
backend/src/auth/roles.decorator.ts
backend/src/auth/roles.guard.ts
```

Nếu hiện tại chỉ check role, đánh dấu Partial hoặc Conflict.

---

## US-07 — Permission-aware frontend UI

Tasks:

* PAC-TASK-031 — Build permission-aware sidebar
* PAC-TASK-032 — Hide unauthorized action buttons
* PAC-TASK-033 — Build forbidden access page
* PAC-TASK-034 — Add frontend permission helper

Expected result:

```text
Sidebar hiển thị theo permission.
Action button ẩn nếu không có quyền.
Có trang forbidden.
Có helper hasPermission / hasAnyPermission / hasAllPermissions.
```

Important audit target:

```text
frontend/src/components/sidebar.tsx
frontend/src/lib/constants/menu.tsx
frontend/src/components/route-guard.tsx
```

---

## US-08 — Staff ownership scope

Tasks:

* PAC-TASK-035 — Implement Staff ownership query filter for orders
* PAC-TASK-036 — Implement Staff ownership query filter for customer order history
* PAC-TASK-037 — Add tests for Staff ownership scope

Expected result:

```text
Staff chỉ xem order thuộc mình.
Admin xem được toàn bộ.
Ownership filter nằm ở backend service/query layer.
```

Important audit target:

```text
backend/src/orders/orders.service.ts
```

---

## US-09 — Warehouse access restrictions

Tasks:

* PAC-TASK-038 — Block Warehouse access to POS routes
* PAC-TASK-039 — Block Warehouse access to InteractionAlert APIs
* PAC-TASK-040 — Block Warehouse access to checkout APIs

Expected result:

```text
Warehouse không vào POS.
Warehouse không gọi checkout APIs.
Warehouse không gọi InteractionAlert APIs.
Restriction phải có cả frontend và backend.
```

Important audit target:

```text
frontend/src/app/pos/page.tsx
frontend/src/app/pos/layout.tsx
backend/src/interactions/interactions.controller.ts
backend/src/orders/orders.controller.ts
```

---

## US-10 — Admin tạo tài khoản nhân viên

Tasks:

* PAC-TASK-041 — Build Admin create staff account form
* PAC-TASK-042 — Implement POST /admin/users using Supabase Admin
* PAC-TASK-043 — Create user profile after Supabase user creation
* PAC-TASK-044 — Assign roles to new staff account
* PAC-TASK-045 — Validate staff email uniqueness through Supabase

Expected result:

```text
Admin tạo được staff.
Backend dùng Supabase Admin API.
Sau khi tạo Supabase user, tạo profile nghiệp vụ.
Gán role cho staff mới.
Email trùng bị chặn.
```

Important audit target:

```text
frontend/src/app/dashboard/staff/new/page.tsx
backend/src/users/users.controller.ts
backend/src/users/users.service.ts
backend/src/users/dto/create-staff.dto.ts
```

---

## US-11 — Đổi mật khẩu lần đầu

Tasks:

* PAC-TASK-046 — Implement first-login password change screen
* PAC-TASK-047 — Implement must_change_password check
* PAC-TASK-048 — Implement password update through Supabase Auth
* PAC-TASK-049 — Clear must_change_password after successful change

Expected result:

```text
User mới có thể bị bắt đổi mật khẩu lần đầu.
Đổi password thông qua Supabase Auth.
Sau khi đổi thành công, clear must_change_password.
Không tự lưu password trong PostgreSQL.
```

---

## US-12 — Cập nhật trạng thái tài khoản nhân viên

Tasks:

* PAC-TASK-050 — Implement account active/inactive update API
* PAC-TASK-051 — Build staff account status UI
* PAC-TASK-052 — Add audit log for staff status change

Expected result:

```text
Admin cập nhật trạng thái ACTIVE/INACTIVE.
UI hiển thị trạng thái tài khoản.
Có audit log khi thay đổi trạng thái.
```

Important audit target:

```text
frontend/src/app/dashboard/staff/components/UpdateStaffDialog.tsx
backend/src/users/dto/update-staff.dto.ts
backend/src/users/users.service.ts
```

---

# 9. Implementation Waves

AI Agent phải làm theo wave, không làm toàn bộ Sprint 1 một lần.

## Wave 0 — Sprint 1 Existing Code Audit

Trước khi sửa code, AI Agent phải audit.

Output bắt buộc:

```text
work-context/sprint-1/sprint-1-audit.md
```

Audit phải kiểm tra:

1. Frontend Supabase client.
2. Login page.
3. Auth context.
4. Route guard.
5. Backend auth module.
6. JWT files có đang là auth chính không.
7. Roles guard có phải role-only không.
8. Prisma schema có profile/roles/permissions/user_roles/role_permissions không.
9. Seed có Admin/Staff/Warehouse không.
10. Staff dashboard/user management hiện có gì.
11. Các task Sprint 1 đang Done / Partial / Missing / Conflict.

Không sửa code trong Wave 0.

---

## Wave 1 — Supabase Auth Frontend

Tasks:

```text
PAC-TASK-001 → PAC-TASK-008
```

Cách làm:

```text
Reuse frontend/src/lib/supabase.ts nếu đã có.
Reuse frontend/src/app/login/page.tsx nếu đã có.
Reuse frontend/src/context/auth-context.tsx nếu đã có.
Reuse frontend/src/components/route-guard.tsx nếu đã có.
Không tạo login page mới nếu page hiện tại sửa được.
```

---

## Wave 2 — Backend Supabase Auth Foundation

Tasks:

```text
PAC-TASK-009 → PAC-TASK-016
```

Cách làm:

```text
Audit JWT legacy trước.
Không xóa jwt-auth.guard.ts hoặc jwt.strategy.ts ngay nếu còn dependency.
Tạo hoặc refactor Supabase token validation đúng baseline.
Tạo AuthGuard đúng Supabase.
Tạo /auth/me trả profile, roles, permissions.
```

---

## Wave 3 — RBAC Schema and Seed

Tasks:

```text
PAC-TASK-017 → PAC-TASK-023
```

Cách làm:

```text
Kiểm tra schema.prisma trước.
Nếu đã có roles/users thì reuse.
Nếu thiếu permissions/user_roles/role_permissions thì bổ sung.
Seed Admin, Staff, Warehouse.
Seed MVP permissions.
```

---

## Wave 4 — PermissionGuard and API Protection

Tasks:

```text
PAC-TASK-024 → PAC-TASK-030
```

Cách làm:

```text
Không chỉ dùng RolesGuard.
Tạo PermissionGuard hoặc refactor RolesGuard thành permission-based guard.
Gắn guard vào Auth/User APIs.
Với Medicine/Inventory/POS/Checkout, chỉ gắn guard hoặc placeholder cần thiết.
Không triển khai nghiệp vụ đầy đủ ngoài Sprint 1.
```

---

## Wave 5 — Frontend Permission UI

Tasks:

```text
PAC-TASK-031 → PAC-TASK-034
```

Cách làm:

```text
Reuse sidebar.tsx.
Reuse menu.tsx.
Tạo helper permission nếu chưa có.
Tạo /forbidden nếu chưa có.
Ẩn menu/action theo permission.
```

---

## Wave 6 — Staff/Warehouse Restrictions

Tasks:

```text
PAC-TASK-035 → PAC-TASK-040
```

Cách làm:

```text
Staff ownership phải nằm ở backend query/service layer.
Warehouse restriction phải có frontend route guard và backend API guard.
Không chỉ ẩn UI.
```

---

## Wave 7 — Admin Staff Account Management

Tasks:

```text
PAC-TASK-041 → PAC-TASK-052
```

Cách làm:

```text
Reuse dashboard/staff pages.
Reuse users module.
Tạo staff bằng Supabase Admin API.
Tạo profile sau khi tạo Supabase user.
Gán role.
Validate email uniqueness.
Thêm must_change_password flow.
Thêm active/inactive status.
Thêm audit log.
```

---

# 10. Progress Tracking

Không tạo 52 file evidence riêng nếu chưa cần.

AI Agent chỉ cập nhật một file:

```text
work-context/sprint-1/sprint-1-progress.md
```

File progress phải có:

1. Completed Epics.
2. Completed User Stories.
3. Completed Tasks.
4. Database Evidence.
5. API Evidence.
6. Frontend Evidence.
7. Test Results.
8. Manual Demo Evidence.
9. Known Issues.
10. Ready for Sprint 2: Yes/No.

---

# 11. Audit Status Format

Trong `work-context/sprint-1/sprint-1-audit.md`, mỗi task dùng format:

```md
| Task | Story | Status | Evidence | Conflict / Notes |
|---|---|---|---|---|
| PAC-TASK-001 | US-01 | Done / Partial / Missing / Conflict | ... | ... |
```

Ý nghĩa status:

| Status   | Ý nghĩa                                    |
| -------- | ------------------------------------------ |
| Done     | Đã có code đúng baseline                   |
| Partial  | Đã có một phần nhưng thiếu hoặc cần sửa    |
| Missing  | Chưa có                                    |
| Conflict | Có code nhưng lệch baseline hoặc nguy hiểm |

---

# 12. Minimal Commands

Backend:

```bash
cd backend
npm install
npm run lint
npm run test
npx prisma validate
npx prisma generate
```

Frontend:

```bash
cd frontend
npm install
npm run lint
npm run build
```

Không chạy:

```bash
npx prisma migrate reset
supabase db reset
rm -rf
git clean -fdx
docker compose down -v
```

---

# 13. Prompt đầu tiên cho Gemini

Dùng prompt này trước khi sửa code:

```text
Bạn là AI Coding Agent cho dự án PharmaAssist AI Intelligence.

Hãy đọc các file sau:

1. AGENTS.md
2. .agents/rules/rules-w-pharmaassist.md
3. work-context/sprint-1/sprint-1.md
4. DOC/07_roles_permissions_authorization.md
5. DOC/12_api_specification.md
6. DOC/14_prisma_schema_migration_design.md
7. Jira/4A_Task_MVP_Foundation_001_145.md
8. Jira/5_Sprint.md

Sau đó thực hiện Wave 0 — Sprint 1 Existing Code Audit.

Yêu cầu:
- Không sửa code.
- Không tạo file mới ngoài work-context/sprint-1/sprint-1-audit.md nếu chưa cần.
- Audit frontend, backend, prisma, seed, route guard, auth guard, role/permission guard.
- Đánh giá PAC-TASK-001 → PAC-TASK-052 theo trạng thái Done / Partial / Missing / Conflict.
- Đặc biệt kiểm tra backend có đang dùng custom JWT không.
- Đặc biệt kiểm tra frontend login có đang dùng Supabase Auth không.
- Ghi báo cáo vào work-context/sprint-1/sprint-1-audit.md.
```

---

# 14. Prompt sau khi audit xong

Sau khi có `sprint-1-audit.md`, dùng prompt:

```text
Dựa trên work-context/sprint-1/sprint-1-audit.md, hãy đề xuất thứ tự sửa Sprint 1 an toàn nhất.

Không sửa code ngay.

Hãy nhóm các task thành:
1. Done — giữ nguyên.
2. Partial — cần chỉnh.
3. Missing — cần làm mới.
4. Conflict — cần refactor cẩn thận.

Sau đó đề xuất Wave 1 nên làm những task nào trước.
```

---

# 15. Prompt bắt đầu Wave 1

Chỉ dùng sau khi audit xong:

```text
Bắt đầu Wave 1 — Supabase Auth Frontend.

Tasks:
PAC-TASK-001 → PAC-TASK-008

Yêu cầu:
1. Dựa trên sprint-1-audit.md.
2. Reuse code hiện có trong frontend.
3. Không tạo login page mới nếu frontend/src/app/login/page.tsx sửa được.
4. Không sửa backend trong Wave 1.
5. Không mở rộng scope ngoài Auth frontend.
6. Sau khi sửa, cập nhật work-context/sprint-1/sprint-1-progress.md.
7. Chạy frontend lint/build nếu có.
8. Báo cáo files changed, tests run, known issues.
```

---

# 16. Completion Criteria

Sprint 1 hoàn thành khi:

1. `sprint-1-audit.md` đã có.
2. `sprint-1-progress.md` tick xong các Epic, US và Task Sprint 1.
3. Supabase login/logout hoạt động.
4. Backend validate Supabase token.
5. AuthGuard hoạt động.
6. `/auth/me` trả profile, roles, permissions.
7. Multi-role RBAC hoạt động.
8. PermissionGuard hoạt động.
9. Frontend sidebar/action theo permission.
10. Staff ownership scope hoạt động.
11. Warehouse bị chặn khỏi POS/Checkout/InteractionAlert.
12. Admin tạo được staff bằng Supabase Admin API.
13. First-login password change hoạt động.
14. Account active/inactive hoạt động.
15. Audit log status change hoạt động.
16. Test/lint/build/prisma validate đã chạy hoặc có lý do rõ nếu chưa chạy.
17. Không còn conflict nghiêm trọng với baseline.
18. Ready for Sprint 2 = Yes.

---

# 17. Final Reminder

Sprint 1 không phải để code thật nhiều module.

Sprint 1 chỉ có một mục tiêu chính:

```text
Làm nền Auth + Supabase + RBAC + User Account đủ chắc để các sprint sau dùng.
```

AI Agent phải ưu tiên:

```text
Audit trước.
Sửa sau.
Reuse code hiện có.
Không tạo trùng.
Không custom JWT.
Không password_hash.
Không mở rộng scope.
Không tạo nhiều file không cần thiết.
```
