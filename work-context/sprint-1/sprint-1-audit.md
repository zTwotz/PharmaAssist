# Wave 0 — Sprint 1 Existing Code Audit

This document contains the audit of the existing codebase for Sprint 1 (Auth, Supabase Auth, RBAC & User Account).

## 1. Audit Summary

- **Frontend Login & Supabase Auth**: Hiện tại frontend có sử dụng client của Supabase. Việc login được thực hiện bằng cách gọi API của Backend (`/auth/login`), Backend dùng Supabase Auth server-side để xác thực và trả về session tokens cho Frontend lưu session. Cách này an toàn và không conflict với baseline. `auth-context.tsx` hiện tại chỉ lưu `roles`, chưa có `permissions`.
- **Backend Auth & JWT**: Backend đang dùng `jwt.strategy.ts` và xác thực chữ ký token thông qua JWKS endpoint của Supabase (`${supabaseUrl}/auth/v1/.well-known/jwks.json`). **KHÔNG sử dụng custom JWT secret.** Đây là implementation đúng chuẩn và tuân thủ chặt chẽ hard guardrails.
- **RBAC**: Database schema (Prisma) đã có đủ các bảng: `users`, `user_profiles`, `roles`, `permissions`, `user_roles`, `role_permissions`. Tuy nhiên, Guard ở backend hiện tại là `RolesGuard` (chỉ check role), chưa implement `PermissionGuard`. File `seed.ts` đã tạo role nhưng chưa tạo MVP permissions.
- **Auth/Me API**: `GET /auth/me` đã hoạt động nhưng mới chỉ trả về `roles`, chưa join và trả về `permissions`.

## 2. Task Assessment

| Task | Story | Status | Evidence | Conflict / Notes |
|------|-------|--------|----------|------------------|
| PAC-TASK-001 | US-01 | Done | `frontend/src/lib/supabase.ts` | Configured properly. |
| PAC-TASK-002 | US-01 | Done | `frontend/src/app/login/page.tsx` | UI is built. |
| PAC-TASK-003 | US-01 | Done | `frontend/src/lib/auth-service.ts` | Connected via Backend proxy, safe and works with Supabase. |
| PAC-TASK-004 | US-01 | Done | `frontend/src/app/login/page.tsx` | Handled properly. |
| PAC-TASK-005 | US-01 | Partial | `frontend/src/context/auth-context.tsx` | Redirects natively but lacks permission-based logic. |
| PAC-TASK-006 | US-02 | Done | `frontend/src/context/auth-context.tsx` | `supabase.auth.signOut()` used. |
| PAC-TASK-007 | US-02 | Done | `frontend/src/context/auth-context.tsx` | Handled via React Router/Next navigation on auth state change. |
| PAC-TASK-008 | US-02 | Missing | | No smoke test checklist found. |
| PAC-TASK-009 | US-03 | Done | `backend/src/auth/jwt.strategy.ts` | Validates via JWKS properly. No custom secret! |
| PAC-TASK-010 | US-03 | Done | `backend/src/auth/jwt-auth.guard.ts` | Implemented via Passport. |
| PAC-TASK-011 | US-03 | Done | | Standard Passport behavior. |
| PAC-TASK-012 | US-03 | Missing | | Unit tests not present yet. |
| PAC-TASK-013 | US-04 | Done | `backend/prisma/schema.prisma` | `UserProfile` model exists. |
| PAC-TASK-014 | US-04 | Done | `backend/src/auth/auth.controller.ts` | API endpoint exists. |
| PAC-TASK-015 | US-04 | Partial | `backend/src/auth/auth.service.ts` | Only returns roles. Needs to return permissions too. |
| PAC-TASK-016 | US-04 | Partial | | Requires UI integration for permissions. |
| PAC-TASK-017 | US-05 | Done | `backend/prisma/schema.prisma` | `Role` model exists. |
| PAC-TASK-018 | US-05 | Done | `backend/prisma/schema.prisma` | `Permission` model exists. |
| PAC-TASK-019 | US-05 | Done | `backend/prisma/schema.prisma` | `UserRole` model exists. |
| PAC-TASK-020 | US-05 | Done | `backend/prisma/schema.prisma` | `RolePermission` model exists. |
| PAC-TASK-021 | US-05 | Done | `backend/prisma/seed.ts` | Seeded Admin, Staff, Warehouse. |
| PAC-TASK-022 | US-05 | Missing | `backend/prisma/seed.ts` | Permissions not seeded. |
| PAC-TASK-023 | US-05 | Missing | `backend/prisma/seed.ts` | Role to permission mapping not seeded. |
| PAC-TASK-024 | US-06 | Missing | `backend/src/auth/roles.decorator.ts` | Only role decorator exists. |
| PAC-TASK-025 | US-06 | Missing | `backend/src/auth/roles.guard.ts` | Only RolesGuard exists. |
| PAC-TASK-026 | US-06 | Missing | | |
| PAC-TASK-027 | US-06 | Missing | | |
| PAC-TASK-028 | US-06 | Missing | | |
| PAC-TASK-029 | US-06 | Missing | | |
| PAC-TASK-030 | US-06 | Missing | | |
| PAC-TASK-031 | US-07 | Missing | | |
| PAC-TASK-032 | US-07 | Missing | | |
| PAC-TASK-033 | US-07 | Missing | | |
| PAC-TASK-034 | US-07 | Missing | | |
| PAC-TASK-035 | US-08 | Missing | | |
| PAC-TASK-036 | US-08 | Missing | | |
| PAC-TASK-037 | US-08 | Missing | | |
| PAC-TASK-038 | US-09 | Missing | | |
| PAC-TASK-039 | US-09 | Missing | | |
| PAC-TASK-040 | US-09 | Missing | | |
| PAC-TASK-041 | US-10 | Missing | | |
| PAC-TASK-042 | US-10 | Missing | | |
| PAC-TASK-043 | US-10 | Missing | | |
| PAC-TASK-044 | US-10 | Missing | | |
| PAC-TASK-045 | US-10 | Missing | | |
| PAC-TASK-046 | US-11 | Missing | | |
| PAC-TASK-047 | US-11 | Missing | | |
| PAC-TASK-048 | US-11 | Missing | | |
| PAC-TASK-049 | US-11 | Missing | | |
| PAC-TASK-050 | US-12 | Missing | | |
| PAC-TASK-051 | US-12 | Missing | | |
| PAC-TASK-052 | US-12 | Missing | | |
