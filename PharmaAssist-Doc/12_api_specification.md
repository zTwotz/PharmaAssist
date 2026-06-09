# Document 12 — API Specification

# Tài liệu 12 — Đặc tả API chính thức

---

## Metadata

| Mục               | Nội dung                                                                                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID       | DOC-12                                                                                                                                                   |
| File name         | `12_api_specification.md`                                                                                                                                |
| Document Name     | API Specification                                                                                                                                        |
| Tên tiếng Việt    | Đặc tả API                                                                                                                                               |
| Project           | PharmaAssist AI Intelligence                                                                                                                             |
| Version           | 1.0 Draft                                                                                                                                                |
| Status            | Draft                                                                                                                                                    |
| Created Date      | 08/06/2026                                                                                                                                               |
| Last Updated      | 08/06/2026                                                                                                                                               |
| Owner             | Backend Lead / System Analyst                                                                                                                            |
| Reviewer          | Backend Developer, Frontend Developer, Tester, API Reviewer, Project Leader                                                                              |
| Baseline Source   | Document 06 — SRS, Document 07 — Roles/Permissions, Document 08 — Use Case Specification, Document 10 — System Architecture, Document 11 — Module Design |
| Related Documents | Document 06, Document 07, Document 13, Document 14, Document 15, Document 20                                                                             |
| Language Rule     | Nội dung chính viết bằng tiếng Việt; tên file/tên tài liệu, endpoint, enum, field, permission key và thuật ngữ kỹ thuật giữ tiếng Anh khi cần            |
| API Style         | REST API                                                                                                                                                 |
| API Version       | `/api/v1`                                                                                                                                                |
| Authentication    | Supabase Auth access token                                                                                                                               |
| Source of Truth   | PostgreSQL                                                                                                                                               |
| ORM               | Prisma                                                                                                                                                   |
| Runtime           | NestJS / Node.js                                                                                                                                         |

---

## 1. Mục đích tài liệu

Tài liệu **API Specification** đặc tả REST API chính thức cho contract giữa **Next.js frontend** và **NestJS backend** của hệ thống **PharmaAssist AI Intelligence**.

Tài liệu này mô tả:

1. Nguyên tắc thiết kế API.
2. Base URL và versioning.
3. Authentication model.
4. Authorization model.
5. Common request headers.
6. Common response format.
7. Error response format.
8. Pagination/filter/sort conventions.
9. Idempotency conventions.
10. Audit conventions.
11. API groups theo module.
12. Endpoint detail template.
13. Endpoint list và endpoint detail quan trọng.
14. MVP/Should-have/Future API classification.
15. Deprecated/rejected API patterns.
16. Traceability từ API sang SRS, ERD/Prisma, UI và Testing.

Tài liệu này là contract để:

1. Backend Developer triển khai controllers/services/guards.
2. Frontend Developer gọi API nhất quán.
3. Tester tạo Postman collection và API tests.
4. Project Leader kiểm soát scope.
5. API reviewer kiểm tra authorization, validation, idempotency và audit.

Tài liệu này **không** viết full database schema, không viết Prisma model, không viết UI design, không viết use case narrative dài và không viết test case chi tiết.

---

## 2. API Design Principles

### 2.1. RESTful but command-aware

API dùng RESTful style cho CRUD/query, nhưng với các nghiệp vụ có side effect phức tạp, API dùng command endpoint rõ ràng.

Ví dụ:

| Loại                | Pattern                                   |
| ------------------- | ----------------------------------------- |
| Query list          | `GET /api/v1/medicines`                   |
| Query detail        | `GET /api/v1/medicines/{id}`              |
| Create resource     | `POST /api/v1/medicines`                  |
| Update resource     | `PATCH /api/v1/medicines/{id}`            |
| Deactivate resource | `POST /api/v1/medicines/{id}/deactivate`  |
| Confirm workflow    | `POST /api/v1/stock-imports/{id}/confirm` |
| Execute command     | `POST /api/v1/checkout`                   |

Checkout là command chính thức để hoàn tất order/payment/invoice.

### 2.2. Backend is source of business truth

Frontend có thể validate sớm, nhưng backend phải validate lại:

1. Authentication.
2. Authorization.
3. Ownership.
4. Entity status.
5. Business rules.
6. Stock.
7. FEFO.
8. HIGH alert acknowledgement/note.
9. Payment rule.
10. Invoice rule.
11. AI guardrail.
12. Graph freshness.
13. Demo reset environment.

### 2.3. PostgreSQL source of truth

API đọc/ghi dữ liệu nghiệp vụ chính thức từ PostgreSQL.

Neo4j chỉ phục vụ graph projection/Graph-RAG.

API không được dùng Neo4j để thay thế PostgreSQL cho:

1. Stock.
2. Checkout.
3. Payment.
4. Invoice.
5. InteractionAlert official history.
6. Interaction rule source of truth.
7. Reports deterministic.

### 2.4. Permission-based authorization

Mỗi protected endpoint phải khai báo:

1. Auth required.
2. Permission required.
3. Ownership rule nếu có.
4. Data scope.
5. State rule.
6. Audit behavior nếu có.

Không chỉ dựa vào role name.

### 2.5. Explicit ownership

Staff chỉ được truy cập dữ liệu thuộc ownership scope:

1. Own Draft Orders.
2. Own Orders.
3. Payments thuộc own Orders.
4. Invoices thuộc own Orders.
5. InteractionAlerts thuộc own Orders.
6. AI Copilot context thuộc own Orders/Alerts.

Admin có all-scope permission.

Warehouse không truy cập POS/payment/invoice/interaction alert/graph trong MVP.

### 2.6. Idempotency for dangerous commands

Các command có nguy cơ xử lý lặp phải hỗ trợ idempotency.

Bắt buộc:

1. `POST /api/v1/checkout`.

Khuyến nghị:

1. `POST /api/v1/stock-imports/{id}/confirm`.
2. `POST /api/v1/inventory-adjustments/{id}/confirm`.
3. Demo reset command nếu exposed nội bộ.

### 2.7. Audit by design

Các API command quan trọng phải ghi audit hoặc trace.

Ví dụ:

1. User created/deactivated.
2. Role assigned/removed.
3. Supplier deactivated.
4. Medicine deactivated.
5. Stock Import confirmed/cancelled.
6. Inventory Adjustment confirmed.
7. Checkout success/failure quan trọng.
8. DrugInteraction Rule changed.
9. HIGH alert acknowledged/noted.
10. AI request/fallback/guardrail block.
11. Graph Sync failure.
12. System Settings update.
13. Demo reset.

### 2.8. Safe AI and Graph APIs

AI APIs phải qua guardrail và audit.

Graph APIs phải:

1. Read-only.
2. Không expose raw Cypher cho Staff.
3. Kiểm tra graph freshness.
4. Fallback PostgreSQL cho interaction explanation nếu graph stale/unavailable.
5. Trả safe error cho pure graph query không có fallback.

---

## 3. Base URL and Versioning

### 3.1. Base URL

Development/local example:

```text
http://localhost:3001/api/v1
```

Frontend should read API base URL from environment config.

### 3.2. API version

Current API version:

```text
/api/v1
```

### 3.3. Versioning rules

1. Breaking changes phải tạo version mới hoặc được ghi rõ trong changelog.
2. Không đổi response shape của endpoint MVP mà không cập nhật frontend/tests.
3. New optional field có thể thêm nếu không phá client.
4. Deprecated endpoint phải có migration path.
5. Rejected endpoint patterns không được thêm lại vì tiện tạm thời.

---

## 4. Authentication Model

### 4.1. Authentication provider

Authentication chính thức dùng:

```text
Supabase Auth
```

Frontend login trực tiếp với Supabase Auth SDK hoặc flow tương đương.

Backend nhận Supabase access token qua header:

```http
Authorization: Bearer <supabase_access_token>
```

### 4.2. Backend authentication flow

Mỗi protected API request:

1. Client gửi `Authorization: Bearer <token>`.
2. Backend verify Supabase access token.
3. Backend extract Supabase user ID.
4. Backend tìm `user_profile`.
5. Backend check `is_active`.
6. Backend check `must_change_password` nếu endpoint không thuộc allowlist.
7. Backend load roles/permissions.
8. Backend tiếp tục authorization.

### 4.3. Auth endpoints

Backend không cần endpoint login password riêng nếu frontend dùng Supabase SDK.

Backend cung cấp endpoints để:

1. Lấy current profile.
2. Lấy effective permissions.
3. Hoàn tất first-login flow.
4. Logout có thể do Supabase SDK xử lý phía frontend.

### 4.4. Password rules

1. Backend không nhận/lưu password để tự xác thực.
2. PostgreSQL không lưu password/password_hash.
3. Password update dùng Supabase Auth.
4. Admin tạo staff account thông qua Supabase Admin integration hoặc workflow tương đương.
5. `must_change_password` là application-level flag, không phải password storage.

---

## 5. Authorization Model

### 5.1. Authorization layers

Protected endpoint phải đi qua:

1. Authentication check.
2. User profile check.
3. User active check.
4. Must-change-password check nếu áp dụng.
5. Permission check.
6. Ownership check nếu áp dụng.
7. Entity status validation.
8. Business rule validation.

### 5.2. Permission declaration

Mỗi endpoint trong tài liệu này khai báo permission dạng:

```text
permission.key
```

Ví dụ:

1. `medicine.create`.
2. `stock_import.confirm`.
3. `checkout.execute_own`.
4. `checkout.execute_all`.
5. `interaction_alert.note_own_order`.
6. `ai_copilot.generate_note_draft`.

### 5.3. OR permission

Một endpoint có thể cho phép nhiều permission.

Ví dụ:

```text
checkout.execute_own OR checkout.execute_all
```

Backend phải:

1. Nếu user có all permission, không cần ownership check.
2. Nếu user chỉ có own permission, phải check ownership.
3. Nếu user không có permission nào, trả forbidden.

### 5.4. Role reference

Roles chính thức:

1. Admin.
2. Staff.
3. Warehouse.

Role chỉ dùng như reference cho người đọc. Backend phải kiểm tra permission.

### 5.5. Ownership

Ownership applies to:

1. Order.
2. Payment.
3. Invoice.
4. InteractionAlert.
5. AI request context.

Staff own scope:

1. `created_by = current_user`.
2. hoặc `processed_by = current_user`.
3. hoặc rule tương đương đã được chốt trong service.

### 5.6. Authorization error codes

| Situation                |    HTTP | Error code                      |
| ------------------------ | ------: | ------------------------------- |
| Missing token            |     401 | `AUTH_REQUIRED`                 |
| Invalid/expired token    |     401 | `AUTH_INVALID_TOKEN`            |
| Profile not found        |     403 | `AUTH_PROFILE_NOT_FOUND`        |
| User inactive            |     403 | `AUTH_USER_INACTIVE`            |
| Password change required |     403 | `AUTH_PASSWORD_CHANGE_REQUIRED` |
| Missing permission       |     403 | `AUTH_FORBIDDEN`                |
| Ownership denied         |     403 | `AUTH_OWNERSHIP_DENIED`         |
| Feature not in scope     | 403/404 | `FEATURE_NOT_AVAILABLE`         |

---

## 6. Common Request Headers

### 6.1. Required headers

```http
Content-Type: application/json
Authorization: Bearer <supabase_access_token>
```

`Authorization` required for protected endpoints.

### 6.2. Optional/common headers

```http
X-Request-Id: <uuid>
Idempotency-Key: <uuid-or-client-generated-key>
X-Client-Version: <frontend-version>
```

### 6.3. Idempotency header

Required for:

```http
POST /api/v1/checkout
```

Recommended for:

1. Confirm Stock Import.
2. Confirm Inventory Adjustment.
3. Demo reset command if exposed.

### 6.4. Request ID

`X-Request-Id` is recommended for tracing.

If client does not provide it, backend may generate request ID.

---

## 7. Common Response Format

### 7.1. Success response format

Standard success response:

```json
{
  "success": true,
  "data": {},
  "meta": {
    "requestId": "req_123",
    "timestamp": "2026-06-08T10:00:00.000Z"
  }
}
```

### 7.2. List response format

```json
{
  "success": true,
  "data": [
    {}
  ],
  "meta": {
    "requestId": "req_123",
    "timestamp": "2026-06-08T10:00:00.000Z",
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "totalItems": 100,
      "totalPages": 5
    }
  }
}
```

### 7.3. Command response format

```json
{
  "success": true,
  "data": {
    "status": "COMPLETED",
    "resourceId": "uuid",
    "message": "Command completed successfully"
  },
  "meta": {
    "requestId": "req_123",
    "timestamp": "2026-06-08T10:00:00.000Z"
  }
}
```

### 7.4. Nullable data

If resource is not found, API should return error, not `success: true` with null, unless endpoint is designed as optional lookup.

---

## 8. Error Response Format

### 8.1. Standard error response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "sellingPrice",
        "issue": "Selling price must be greater than 0"
      }
    ]
  },
  "meta": {
    "requestId": "req_123",
    "timestamp": "2026-06-08T10:00:00.000Z"
  }
}
```

### 8.2. Common HTTP statuses

| HTTP Status | Meaning                              |
| ----------: | ------------------------------------ |
|         200 | Success                              |
|         201 | Created                              |
|         204 | Success with no body, use sparingly  |
|         400 | Bad request / validation             |
|         401 | Authentication required/invalid      |
|         403 | Forbidden / ownership denied         |
|         404 | Resource not found                   |
|         409 | Conflict / duplicate / invalid state |
|         422 | Business rule violation              |
|         429 | Rate limited                         |
|         500 | Internal server error                |
|         503 | External dependency unavailable      |

### 8.3. Common error codes

| Code                            | Meaning                                     |
| ------------------------------- | ------------------------------------------- |
| `AUTH_REQUIRED`                 | Missing authentication                      |
| `AUTH_INVALID_TOKEN`            | Invalid/expired token                       |
| `AUTH_PROFILE_NOT_FOUND`        | Supabase user has no internal profile       |
| `AUTH_USER_INACTIVE`            | User profile inactive                       |
| `AUTH_PASSWORD_CHANGE_REQUIRED` | User must change password first             |
| `AUTH_FORBIDDEN`                | Missing permission                          |
| `AUTH_OWNERSHIP_DENIED`         | Not resource owner                          |
| `VALIDATION_ERROR`              | Request validation failed                   |
| `RESOURCE_NOT_FOUND`            | Resource not found                          |
| `RESOURCE_CONFLICT`             | Duplicate/conflict                          |
| `INVALID_STATE`                 | Resource state does not allow action        |
| `BUSINESS_RULE_VIOLATION`       | Business rule denied                        |
| `INSUFFICIENT_STOCK`            | Stock not enough                            |
| `HIGH_ALERT_UNRESOLVED`         | HIGH alert lacks acknowledgement/note       |
| `IDEMPOTENCY_PAYLOAD_MISMATCH`  | Same idempotency key with different payload |
| `PAYMENT_FAILED`                | Payment simulation failed                   |
| `AI_GUARDRAIL_BLOCKED`          | AI request/response blocked                 |
| `AI_PROVIDER_UNAVAILABLE`       | AI provider failed and no fallback usable   |
| `GRAPH_STALE`                   | Graph data stale                            |
| `GRAPH_UNAVAILABLE`             | Neo4j unavailable                           |
| `DEMO_RESET_ENV_DENIED`         | Demo reset not allowed in current env       |

---

## 9. Pagination / Filter / Sort Conventions

### 9.1. Pagination query params

```text
?page=1&pageSize=20
```

Rules:

1. Default `page = 1`.
2. Default `pageSize = 20`.
3. Max `pageSize` should be limited, for example 100.
4. Large exports are not MVP unless specified.

### 9.2. Sorting query params

```text
?sortBy=createdAt&sortOrder=desc
```

Rules:

1. `sortOrder` allowed values: `asc`, `desc`.
2. Backend must allowlist sortable fields.
3. Unknown sort field returns validation error or defaults safely.

### 9.3. Filtering query params

Examples:

```text
?search=para
?status=ACTIVE
?fromDate=2026-06-01&toDate=2026-06-08
?severity=HIGH
?medicineId=uuid
?withinDays=90
```

Rules:

1. Filter fields must be allowlisted.
2. Date range must be validated.
3. `withinDays` in reports/filter does not change System Setting.
4. Staff filters still restricted by ownership.

### 9.4. List response metadata

All paginated list endpoints should return:

```json
"pagination": {
  "page": 1,
  "pageSize": 20,
  "totalItems": 100,
  "totalPages": 5
}
```

---

## 10. Idempotency Conventions

### 10.1. Header

```http
Idempotency-Key: <client-generated-key>
```

### 10.2. Required endpoint

```http
POST /api/v1/checkout
```

### 10.3. Behavior

If same key and same payload:

1. Return previous result.
2. Do not process again.
3. Do not deduct stock again.
4. Do not create duplicate payment.
5. Do not create duplicate invoice.

If same key and different payload:

1. Return `409 Conflict`.
2. Error code: `IDEMPOTENCY_PAYLOAD_MISMATCH`.

### 10.4. Idempotency record

Backend should store:

1. idempotency key.
2. user id.
3. endpoint/operation.
4. request hash.
5. status.
6. response summary.
7. related resource id.
8. created_at.
9. completed_at.

### 10.5. Recommended idempotency for confirm endpoints

For confirm endpoints, idempotency is recommended but state validation still required.

Example:

1. Confirm Stock Import already CONFIRMED returns previous success or invalid state depending implementation convention.
2. Confirm must never double-add stock.

---

## 11. Audit Conventions

### 11.1. Audit fields

Audit log should capture:

1. actor user id.
2. action.
3. resource type.
4. resource id.
5. timestamp.
6. request id.
7. before/after summary if safe.
8. metadata.
9. result status.
10. error code if failed.

### 11.2. Audit required commands

Audit required for:

1. User create/deactivate.
2. Role assignment/removal.
3. Medicine deactivate.
4. Supplier deactivate.
5. Stock Import confirm/cancel.
6. Inventory Adjustment confirm.
7. Checkout success.
8. DrugInteraction Rule create/update/deactivate.
9. HIGH alert acknowledgement.
10. HIGH alert consultation note.
11. System Settings update.
12. AI request.
13. AI guardrail block.
14. AI fallback.
15. Graph Sync failure.
16. Demo reset run.

### 11.3. AI Audit

AI Audit must capture AI-specific metadata:

1. provider_requested.
2. provider_used.
3. fallback_used.
4. fallback_reason.
5. prompt_template_id/version.
6. input_guardrail_status.
7. output_guardrail_status.
8. schema_validation_status.
9. latency_ms.
10. minimized input/output summary.
11. no raw PII.

### 11.4. Audit response behavior

API does not need to expose audit in every response.

Audit failures:

1. Critical audit failure may fail command if audit is mandatory for traceability.
2. Non-critical logging failure may be recorded separately depending implementation decision.
3. HIGH alert acknowledgement/note audit should be strongly consistent.

---

# 12. Endpoint Detail Template

Mỗi endpoint chi tiết dùng template sau:

| Field                | Nội dung                           |
| -------------------- | ---------------------------------- |
| Method               | HTTP method                        |
| Path                 | Endpoint path                      |
| Purpose              | Mục đích                           |
| Scope                | MVP / Should-have / Future         |
| Auth required        | Yes/No                             |
| Permission required  | Permission key hoặc OR permissions |
| Request params       | Path/query params                  |
| Request body         | Body schema summary                |
| Response body        | Response schema summary            |
| Validation           | Input validation                   |
| Business rules       | Business rules enforced            |
| Error cases          | Error codes                        |
| Audit                | Audit behavior                     |
| Idempotency          | Required/Recommended/No            |
| Related requirements | FR/BR/NFR IDs                      |
| UI consumers         | Screens/components gọi API         |
| Notes                | Ghi chú                            |

---

# 13. API Groups

---

# 13.1. Auth/Profile APIs

## 13.1.1. Endpoint list

| Method | Path                         | Purpose                                                 | Scope       |
| ------ | ---------------------------- | ------------------------------------------------------- | ----------- |
| GET    | `/auth/me`                   | Lấy current user profile, roles, permissions            | MVP         |
| POST   | `/auth/complete-first-login` | Hoàn tất first-login password-change flag               | MVP         |
| GET    | `/auth/permissions`          | Lấy effective permissions của current user              | MVP         |
| POST   | `/auth/logout`               | Optional backend logout hook; Supabase SDK có thể xử lý | Should-have |

### Important note

Login bằng email/password được xử lý bởi Supabase Auth SDK, không phải custom backend `/auth/login` bằng username/password.

---

## 13.1.2. GET `/auth/me`

| Field                | Nội dung                                                                              |
| -------------------- | ------------------------------------------------------------------------------------- |
| Method               | GET                                                                                   |
| Path                 | `/api/v1/auth/me`                                                                     |
| Purpose              | Lấy thông tin user hiện tại, roles và permissions                                     |
| Scope                | MVP                                                                                   |
| Auth required        | Yes                                                                                   |
| Permission required  | Authenticated user                                                                    |
| Request params       | None                                                                                  |
| Request body         | None                                                                                  |
| Response body        | User profile, roles, permissions, mustChangePassword                                  |
| Validation           | Token valid; user profile exists; user active                                         |
| Business rules       | Supabase Auth là auth chính thức; PostgreSQL profile bắt buộc                         |
| Error cases          | `AUTH_REQUIRED`, `AUTH_INVALID_TOKEN`, `AUTH_PROFILE_NOT_FOUND`, `AUTH_USER_INACTIVE` |
| Audit                | No, optional security log                                                             |
| Idempotency          | No                                                                                    |
| Related requirements | FR-AUTH-001 to FR-AUTH-012, FR-RBAC                                                   |
| UI consumers         | App shell, role-based navigation, dashboard                                           |

### Response example

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_001",
      "supabaseUserId": "uuid",
      "email": "admin@example.com",
      "fullName": "Admin Demo",
      "isActive": true,
      "mustChangePassword": false
    },
    "roles": ["Admin"],
    "permissions": [
      "medicine.read",
      "medicine.create",
      "checkout.execute_all",
      "settings.update_near_expiry_threshold"
    ]
  },
  "meta": {
    "requestId": "req_001",
    "timestamp": "2026-06-08T10:00:00.000Z"
  }
}
```

---

## 13.1.3. POST `/auth/complete-first-login`

| Field                | Nội dung                                                                    |
| -------------------- | --------------------------------------------------------------------------- |
| Method               | POST                                                                        |
| Path                 | `/api/v1/auth/complete-first-login`                                         |
| Purpose              | Cập nhật trạng thái first-login sau khi user đổi mật khẩu qua Supabase Auth |
| Scope                | MVP                                                                         |
| Auth required        | Yes                                                                         |
| Permission required  | `user.complete_first_login` or self-authenticated special guard             |
| Request body         | `{ "passwordUpdated": true }`                                               |
| Response body        | Updated profile flag                                                        |
| Validation           | User authenticated; passwordUpdated true                                    |
| Business rules       | Password update thực hiện qua Supabase Auth; PostgreSQL chỉ lưu flag        |
| Error cases          | `AUTH_REQUIRED`, `VALIDATION_ERROR`, `AUTH_PROFILE_NOT_FOUND`               |
| Audit                | Recommended                                                                 |
| Idempotency          | No                                                                          |
| Related requirements | FR-AUTH-006, FR-AUTH-007, FR-AUTH-009                                       |
| UI consumers         | First-login password change screen                                          |

---

# 13.2. User/Role/Permission APIs

## 13.2.1. Endpoint list

| Method | Path                         | Purpose                         | Scope       |
| ------ | ---------------------------- | ------------------------------- | ----------- |
| GET    | `/users`                     | Danh sách users                 | MVP         |
| POST   | `/users`                     | Tạo user nội bộ + Supabase user | MVP         |
| GET    | `/users/{id}`                | Xem user detail                 | MVP         |
| PATCH  | `/users/{id}`                | Cập nhật user profile nội bộ    | MVP         |
| POST   | `/users/{id}/deactivate`     | Deactivate user                 | MVP         |
| POST   | `/users/{id}/roles`          | Gán role cho user               | MVP         |
| DELETE | `/users/{id}/roles/{roleId}` | Gỡ role khỏi user               | MVP         |
| GET    | `/roles`                     | Xem roles                       | MVP         |
| GET    | `/permissions`               | Xem permissions                 | MVP         |
| GET    | `/roles/{id}/permissions`    | Xem permissions của role        | MVP         |
| PUT    | `/roles/{id}/permissions`    | Quản lý role-permission mapping | Should-have |

---

## 13.2.2. POST `/users`

| Field                | Nội dung                                                                            |
| -------------------- | ----------------------------------------------------------------------------------- |
| Method               | POST                                                                                |
| Path                 | `/api/v1/users`                                                                     |
| Purpose              | Admin tạo user mới và user profile nội bộ                                           |
| Scope                | MVP                                                                                 |
| Auth required        | Yes                                                                                 |
| Permission required  | `user.create`                                                                       |
| Request body         | email, fullName, roleIds, mustChangePassword                                        |
| Response body        | Created user profile                                                                |
| Validation           | Email valid; roleIds valid; duplicate email handled                                 |
| Business rules       | Supabase Auth tạo credential; PostgreSQL không lưu password                         |
| Error cases          | `AUTH_FORBIDDEN`, `VALIDATION_ERROR`, `RESOURCE_CONFLICT`, `EXTERNAL_SERVICE_ERROR` |
| Audit                | Required                                                                            |
| Idempotency          | Recommended                                                                         |
| Related requirements | FR-AUTH-008, FR-RBAC                                                                |
| UI consumers         | Admin User Management                                                               |

### Request example

```json
{
  "email": "staff@example.com",
  "fullName": "Staff Demo",
  "roleIds": ["role_staff"],
  "mustChangePassword": true
}
```

### Response example

```json
{
  "success": true,
  "data": {
    "id": "usr_002",
    "email": "staff@example.com",
    "fullName": "Staff Demo",
    "isActive": true,
    "mustChangePassword": true,
    "roles": ["Staff"]
  },
  "meta": {
    "requestId": "req_002",
    "timestamp": "2026-06-08T10:00:00.000Z"
  }
}
```

---

## 13.2.3. POST `/users/{id}/roles`

| Field                | Nội dung                                                                     |
| -------------------- | ---------------------------------------------------------------------------- |
| Method               | POST                                                                         |
| Path                 | `/api/v1/users/{id}/roles`                                                   |
| Purpose              | Gán role cho user                                                            |
| Scope                | MVP                                                                          |
| Auth required        | Yes                                                                          |
| Permission required  | `user.assign_role`                                                           |
| Request params       | `id`                                                                         |
| Request body         | `{ "roleId": "role_staff" }`                                                 |
| Response body        | Updated user role list                                                       |
| Validation           | User exists; role exists; role active; no duplicate active mapping           |
| Business rules       | Multi-role RBAC; effective permissions là union                              |
| Error cases          | `RESOURCE_NOT_FOUND`, `RESOURCE_CONFLICT`, `AUTH_FORBIDDEN`, `INVALID_STATE` |
| Audit                | Required                                                                     |
| Idempotency          | No                                                                           |
| Related requirements | FR-RBAC-001 to FR-RBAC-014                                                   |
| UI consumers         | Admin User Management                                                        |

---

# 13.3. Medicine APIs

## 13.3.1. Endpoint list

| Method | Path                           | Purpose                     | Scope |
| ------ | ------------------------------ | --------------------------- | ----- |
| GET    | `/medicines`                   | List/search medicines       | MVP   |
| POST   | `/medicines`                   | Create medicine             | MVP   |
| GET    | `/medicines/{id}`              | Medicine detail             | MVP   |
| PATCH  | `/medicines/{id}`              | Update medicine             | MVP   |
| POST   | `/medicines/{id}/deactivate`   | Deactivate medicine         | MVP   |
| GET    | `/medicines/{id}/availability` | Sellable stock availability | MVP   |
| GET    | `/medicines/{id}/batches`      | Batch list for medicine     | MVP   |

---

## 13.3.2. GET `/medicines`

| Field                | Nội dung                                                                         |
| -------------------- | -------------------------------------------------------------------------------- |
| Method               | GET                                                                              |
| Path                 | `/api/v1/medicines`                                                              |
| Purpose              | Danh sách/tìm kiếm Medicine                                                      |
| Scope                | MVP                                                                              |
| Auth required        | Yes                                                                              |
| Permission required  | `medicine.read` OR `medicine.read_sales` OR `medicine.read_inventory`            |
| Query params         | `search`, `status`, `page`, `pageSize`, `sortBy`, `sortOrder`                    |
| Response body        | Paginated medicine list                                                          |
| Validation           | Allowlisted filters/sorts                                                        |
| Business rules       | Staff sales view chỉ thấy medicine phù hợp bán hàng; Warehouse inventory context |
| Error cases          | `AUTH_FORBIDDEN`, `VALIDATION_ERROR`                                             |
| Audit                | No                                                                               |
| Idempotency          | No                                                                               |
| Related requirements | FR-MED-004, FR-MED-005                                                           |
| UI consumers         | Medicine list, POS search, Inventory context                                     |

---

## 13.3.3. POST `/medicines`

| Field                | Nội dung                                                                  |
| -------------------- | ------------------------------------------------------------------------- |
| Method               | POST                                                                      |
| Path                 | `/api/v1/medicines`                                                       |
| Purpose              | Admin tạo Medicine                                                        |
| Scope                | MVP                                                                       |
| Auth required        | Yes                                                                       |
| Permission required  | `medicine.create`                                                         |
| Request body         | name, unit, sellingPrice, minStock, status, metadata                      |
| Response body        | Created medicine                                                          |
| Validation           | Required fields; sellingPrice > 0 for sellable medicine                   |
| Business rules       | Medicine là sales/inventory key trong MVP; product_variant không thay thế |
| Error cases          | `VALIDATION_ERROR`, `RESOURCE_CONFLICT`, `AUTH_FORBIDDEN`                 |
| Audit                | Recommended                                                               |
| Idempotency          | No                                                                        |
| Related requirements | FR-MED-001, FR-MED-006                                                    |
| UI consumers         | Admin Medicine create form                                                |

### Request example

```json
{
  "name": "Paracetamol 500mg",
  "unit": "tablet",
  "sellingPrice": 1500,
  "minStock": 100,
  "status": "ACTIVE"
}
```

---

## 13.3.4. POST `/medicines/{id}/deactivate`

| Field                | Nội dung                                                                                |
| -------------------- | --------------------------------------------------------------------------------------- |
| Method               | POST                                                                                    |
| Path                 | `/api/v1/medicines/{id}/deactivate`                                                     |
| Purpose              | Deactivate Medicine                                                                     |
| Scope                | MVP                                                                                     |
| Auth required        | Yes                                                                                     |
| Permission required  | `medicine.deactivate`                                                                   |
| Request params       | `id`                                                                                    |
| Request body         | `{ "reason": "No longer sold" }` optional/recommended                                   |
| Response body        | Updated medicine status                                                                 |
| Validation           | Medicine exists; not already inactive                                                   |
| Business rules       | Không hard delete medicine có lịch sử; inactive medicine không thêm vào Draft Order mới |
| Error cases          | `RESOURCE_NOT_FOUND`, `INVALID_STATE`, `AUTH_FORBIDDEN`                                 |
| Audit                | Required                                                                                |
| Idempotency          | No                                                                                      |
| Related requirements | FR-MED-003, FR-MED-008                                                                  |
| UI consumers         | Admin Medicine detail                                                                   |

---

# 13.4. ActiveIngredient APIs

## 13.4.1. Endpoint list

| Method | Path                                  | Purpose                        | Scope      |
| ------ | ------------------------------------- | ------------------------------ | ---------- |
| GET    | `/active-ingredients`                 | List/search active ingredients | MVP        |
| POST   | `/active-ingredients`                 | Create active ingredient       | MVP        |
| GET    | `/active-ingredients/{id}`            | Ingredient detail              | MVP        |
| PATCH  | `/active-ingredients/{id}`            | Update active ingredient       | MVP        |
| POST   | `/active-ingredients/{id}/deactivate` | Deactivate active ingredient   | MVP/Should |

---

## 13.4.2. POST `/active-ingredients`

| Field                | Nội dung                                                                |
| -------------------- | ----------------------------------------------------------------------- |
| Method               | POST                                                                    |
| Path                 | `/api/v1/active-ingredients`                                            |
| Purpose              | Admin tạo ActiveIngredient                                              |
| Scope                | MVP                                                                     |
| Auth required        | Yes                                                                     |
| Permission required  | `active_ingredient.create`                                              |
| Request body         | name, normalizedName, description optional                              |
| Response body        | Created active ingredient                                               |
| Validation           | Name required; duplicate normalizedName prevented                       |
| Business rules       | Curated ActiveIngredient; không auto-promote scraped ingredient strings |
| Error cases          | `VALIDATION_ERROR`, `RESOURCE_CONFLICT`, `AUTH_FORBIDDEN`               |
| Audit                | Recommended                                                             |
| Idempotency          | No                                                                      |
| Related requirements | FR-ACT-001, FR-ACT-008                                                  |
| UI consumers         | ActiveIngredient management screen                                      |

---

# 13.5. Medicine–ActiveIngredient Mapping APIs

## 13.5.1. Endpoint list

| Method | Path                                                | Purpose                  | Scope |
| ------ | --------------------------------------------------- | ------------------------ | ----- |
| GET    | `/medicines/{id}/active-ingredients`                | Xem mapping của Medicine | MVP   |
| PUT    | `/medicines/{id}/active-ingredients`                | Replace/update mapping   | MVP   |
| POST   | `/medicines/{id}/active-ingredients/{ingredientId}` | Add one mapping          | MVP   |
| DELETE | `/medicines/{id}/active-ingredients/{ingredientId}` | Remove mapping           | MVP   |

---

## 13.5.2. PUT `/medicines/{id}/active-ingredients`

| Field                | Nội dung                                                             |
| -------------------- | -------------------------------------------------------------------- |
| Method               | PUT                                                                  |
| Path                 | `/api/v1/medicines/{id}/active-ingredients`                          |
| Purpose              | Cập nhật danh sách ActiveIngredients của Medicine                    |
| Scope                | MVP                                                                  |
| Auth required        | Yes                                                                  |
| Permission required  | `medicine_ingredient_mapping.manage`                                 |
| Request params       | `id` medicine id                                                     |
| Request body         | Array of ingredient mappings                                         |
| Response body        | Updated mapping                                                      |
| Validation           | Medicine exists; ingredients exist; no duplicate ingredient          |
| Business rules       | Interaction checking dựa trên mapping này; graph sync event required |
| Error cases          | `RESOURCE_NOT_FOUND`, `VALIDATION_ERROR`, `AUTH_FORBIDDEN`           |
| Audit                | Recommended                                                          |
| Idempotency          | No                                                                   |
| Related requirements | FR-ACT-005, FR-ACT-007, FR-GSY-008                                   |
| UI consumers         | Medicine form ingredient mapping component                           |

### Request example

```json
{
  "ingredients": [
    {
      "activeIngredientId": "ing_001",
      "amountText": "500mg"
    }
  ]
}
```

---

# 13.6. Supplier APIs

## 13.6.1. Endpoint list

| Method | Path                         | Purpose               | Scope |
| ------ | ---------------------------- | --------------------- | ----- |
| GET    | `/suppliers`                 | List/search suppliers | MVP   |
| POST   | `/suppliers`                 | Create supplier       | MVP   |
| GET    | `/suppliers/{id}`            | Supplier detail       | MVP   |
| PATCH  | `/suppliers/{id}`            | Update supplier       | MVP   |
| POST   | `/suppliers/{id}/deactivate` | Deactivate supplier   | MVP   |

---

## 13.6.2. POST `/suppliers`

| Field                | Nội dung                                                    |
| -------------------- | ----------------------------------------------------------- |
| Method               | POST                                                        |
| Path                 | `/api/v1/suppliers`                                         |
| Purpose              | Tạo Supplier                                                |
| Scope                | MVP                                                         |
| Auth required        | Yes                                                         |
| Permission required  | `supplier.create`                                           |
| Request body         | name, phone, email, address, status optional                |
| Response body        | Created supplier                                            |
| Validation           | Name required; duplicate rules if any                       |
| Business rules       | Warehouse được tạo Supplier; Supplier dùng cho Stock Import |
| Error cases          | `VALIDATION_ERROR`, `RESOURCE_CONFLICT`, `AUTH_FORBIDDEN`   |
| Audit                | Recommended                                                 |
| Idempotency          | No                                                          |
| Related requirements | FR-SUP-001 to FR-SUP-003                                    |
| UI consumers         | Supplier management, Stock Import flow                      |

---

## 13.6.3. POST `/suppliers/{id}/deactivate`

| Field                | Nội dung                                                                             |
| -------------------- | ------------------------------------------------------------------------------------ |
| Method               | POST                                                                                 |
| Path                 | `/api/v1/suppliers/{id}/deactivate`                                                  |
| Purpose              | Admin deactivate Supplier                                                            |
| Scope                | MVP                                                                                  |
| Auth required        | Yes                                                                                  |
| Permission required  | `supplier.deactivate`                                                                |
| Request body         | `{ "reason": "No longer used" }` optional/recommended                                |
| Response body        | Updated supplier                                                                     |
| Validation           | Supplier exists; active                                                              |
| Business rules       | Chỉ Admin deactivate; Warehouse không deactivate; không hard delete supplier history |
| Error cases          | `AUTH_FORBIDDEN`, `RESOURCE_NOT_FOUND`, `INVALID_STATE`                              |
| Audit                | Required                                                                             |
| Idempotency          | No                                                                                   |
| Related requirements | FR-SUP-004 to FR-SUP-006                                                             |
| UI consumers         | Admin Supplier detail                                                                |

---

# 13.7. Inventory Summary APIs

## 13.7.1. Endpoint list

| Method | Path                            | Purpose                       | Scope |
| ------ | ------------------------------- | ----------------------------- | ----- |
| GET    | `/inventory/summary`            | Inventory summary by Medicine | MVP   |
| GET    | `/inventory/low-stock`          | Low-stock medicines           | MVP   |
| GET    | `/inventory/near-expiry`        | Near-expiry batches/medicines | MVP   |
| GET    | `/inventory/expired`            | Expired batches               | MVP   |
| GET    | `/inventory/sales-availability` | POS sales availability lookup | MVP   |

---

## 13.7.2. GET `/inventory/summary`

| Field                | Nội dung                                                            |
| -------------------- | ------------------------------------------------------------------- |
| Method               | GET                                                                 |
| Path                 | `/api/v1/inventory/summary`                                         |
| Purpose              | Xem tổng quan tồn kho tính từ MedicineBatch                         |
| Scope                | MVP                                                                 |
| Auth required        | Yes                                                                 |
| Permission required  | `inventory.read_summary`                                            |
| Query params         | `search`, `lowStock`, `nearExpiry`, `page`, `pageSize`              |
| Response body        | Medicine inventory summary list                                     |
| Validation           | Query params allowlisted                                            |
| Business rules       | MedicineBatch source of truth; expired excluded from sellable stock |
| Error cases          | `AUTH_FORBIDDEN`, `VALIDATION_ERROR`                                |
| Audit                | No                                                                  |
| Idempotency          | No                                                                  |
| Related requirements | FR-BAT, FR-RPT-011                                                  |
| UI consumers         | Inventory Summary screen                                            |

### Response item example

```json
{
  "medicineId": "med_001",
  "medicineName": "Paracetamol 500mg",
  "totalQuantity": 300,
  "sellableQuantity": 250,
  "expiredQuantity": 50,
  "nearExpiryQuantity": 80,
  "minStock": 100,
  "isLowStock": false
}
```

---

## 13.7.3. GET `/inventory/sales-availability`

| Field                | Nội dung                                                                         |
| -------------------- | -------------------------------------------------------------------------------- |
| Method               | GET                                                                              |
| Path                 | `/api/v1/inventory/sales-availability`                                           |
| Purpose              | POS lookup sellable stock cho danh sách medicines                                |
| Scope                | MVP                                                                              |
| Auth required        | Yes                                                                              |
| Permission required  | `inventory.read_sales_availability`                                              |
| Query params         | `medicineIds=med_001,med_002`                                                    |
| Response body        | Sellable availability by medicine                                                |
| Validation           | medicineIds required/valid                                                       |
| Business rules       | Staff chỉ thấy sale-relevant availability, không thấy full operational dashboard |
| Error cases          | `AUTH_FORBIDDEN`, `VALIDATION_ERROR`                                             |
| Audit                | No                                                                               |
| Idempotency          | No                                                                               |
| Related requirements | FR-POS-008, FR-BAT-012                                                           |
| UI consumers         | POS medicine search/order item panel                                             |

---

# 13.8. MedicineBatch APIs

## 13.8.1. Endpoint list

| Method | Path                      | Purpose             | Scope |
| ------ | ------------------------- | ------------------- | ----- |
| GET    | `/medicine-batches`       | List/search batches | MVP   |
| GET    | `/medicine-batches/{id}`  | Batch detail        | MVP   |
| GET    | `/medicines/{id}/batches` | Batches by medicine | MVP   |

### Important note

No public API for direct quantity edit.

Rejected:

```http
PATCH /medicine-batches/{id}/quantity
```

Quantity changes only through:

1. Stock Import confirm.
2. Inventory Adjustment confirm.
3. Checkout.

---

## 13.8.2. GET `/medicine-batches/{id}`

| Field                | Nội dung                                                               |
| -------------------- | ---------------------------------------------------------------------- |
| Method               | GET                                                                    |
| Path                 | `/api/v1/medicine-batches/{id}`                                        |
| Purpose              | Xem Batch Detail                                                       |
| Scope                | MVP                                                                    |
| Auth required        | Yes                                                                    |
| Permission required  | `inventory.read_batch`                                                 |
| Request params       | `id`                                                                   |
| Response body        | Batch detail                                                           |
| Validation           | Batch exists                                                           |
| Business rules       | Batch status, expiry, quantity are read-only except official workflows |
| Error cases          | `RESOURCE_NOT_FOUND`, `AUTH_FORBIDDEN`                                 |
| Audit                | No                                                                     |
| Idempotency          | No                                                                     |
| Related requirements | FR-BAT                                                                 |
| UI consumers         | Batch Detail screen                                                    |

---

# 13.9. Stock Import APIs

## 13.9.1. Endpoint list

| Method | Path                                     | Purpose                          | Scope |
| ------ | ---------------------------------------- | -------------------------------- | ----- |
| GET    | `/stock-imports`                         | List stock imports               | MVP   |
| POST   | `/stock-imports`                         | Create Stock Import Draft        | MVP   |
| GET    | `/stock-imports/{id}`                    | Stock Import detail              | MVP   |
| PATCH  | `/stock-imports/{id}`                    | Update Draft Stock Import header | MVP   |
| POST   | `/stock-imports/{id}/details`            | Add detail line                  | MVP   |
| PATCH  | `/stock-imports/{id}/details/{detailId}` | Update detail line               | MVP   |
| DELETE | `/stock-imports/{id}/details/{detailId}` | Remove detail line               | MVP   |
| POST   | `/stock-imports/{id}/cancel`             | Cancel Draft Stock Import        | MVP   |
| POST   | `/stock-imports/{id}/confirm`            | Confirm Stock Import             | MVP   |

---

## 13.9.2. POST `/stock-imports`

| Field                | Nội dung                                                                    |
| -------------------- | --------------------------------------------------------------------------- |
| Method               | POST                                                                        |
| Path                 | `/api/v1/stock-imports`                                                     |
| Purpose              | Tạo Stock Import Draft                                                      |
| Scope                | MVP                                                                         |
| Auth required        | Yes                                                                         |
| Permission required  | `stock_import.create`                                                       |
| Request body         | supplierId, note optional, details optional                                 |
| Response body        | Created DRAFT import                                                        |
| Validation           | Supplier active; detail fields valid if provided                            |
| Business rules       | Import starts as DRAFT; details must have Medicine, batch, expiry, quantity |
| Error cases          | `AUTH_FORBIDDEN`, `VALIDATION_ERROR`, `RESOURCE_NOT_FOUND`                  |
| Audit                | Optional on create                                                          |
| Idempotency          | No                                                                          |
| Related requirements | FR-STI-001 to FR-STI-008                                                    |
| UI consumers         | Stock Import create screen                                                  |

---

## 13.9.3. POST `/stock-imports/{id}/confirm`

| Field                | Nội dung                                                                       |
| -------------------- | ------------------------------------------------------------------------------ |
| Method               | POST                                                                           |
| Path                 | `/api/v1/stock-imports/{id}/confirm`                                           |
| Purpose              | Confirm Stock Import và cập nhật MedicineBatch                                 |
| Scope                | MVP                                                                            |
| Auth required        | Yes                                                                            |
| Permission required  | `stock_import.confirm`                                                         |
| Request params       | `id`                                                                           |
| Request body         | `{ "confirmedNote": "optional" }`                                              |
| Response body        | Confirmed import, affected batches summary                                     |
| Validation           | Import exists; status DRAFT; details valid                                     |
| Business rules       | Confirm mới cập nhật batch; no double confirm; expiry mismatch reject          |
| Error cases          | `INVALID_STATE`, `VALIDATION_ERROR`, `BATCH_EXPIRY_MISMATCH`, `AUTH_FORBIDDEN` |
| Audit                | Required                                                                       |
| Idempotency          | Recommended                                                                    |
| Related requirements | FR-STI-010 to FR-STI-016, FR-BAT                                               |
| UI consumers         | Stock Import detail screen                                                     |

### Response example

```json
{
  "success": true,
  "data": {
    "stockImportId": "sti_001",
    "status": "CONFIRMED",
    "affectedBatches": [
      {
        "medicineBatchId": "bat_001",
        "medicineId": "med_001",
        "batchNumber": "BATCH-001",
        "expiryDate": "2026-10-01",
        "quantityAdded": 100,
        "quantityRemaining": 100
      }
    ]
  },
  "meta": {
    "requestId": "req_010",
    "timestamp": "2026-06-08T10:00:00.000Z"
  }
}
```

---

# 13.10. Inventory Adjustment APIs

## 13.10.1. Endpoint list

| Method | Path                                  | Purpose                              | Scope |
| ------ | ------------------------------------- | ------------------------------------ | ----- |
| GET    | `/inventory-adjustments`              | List adjustments                     | MVP   |
| POST   | `/inventory-adjustments`              | Create adjustment                    | MVP   |
| GET    | `/inventory-adjustments/{id}`         | Adjustment detail                    | MVP   |
| PATCH  | `/inventory-adjustments/{id}`         | Update draft adjustment if supported | MVP   |
| POST   | `/inventory-adjustments/{id}/confirm` | Confirm adjustment                   | MVP   |
| POST   | `/inventory-adjustments/{id}/cancel`  | Cancel draft adjustment if supported | MVP   |

---

## 13.10.2. POST `/inventory-adjustments`

| Field                | Nội dung                                                   |
| -------------------- | ---------------------------------------------------------- |
| Method               | POST                                                       |
| Path                 | `/api/v1/inventory-adjustments`                            |
| Purpose              | Tạo Inventory Adjustment                                   |
| Scope                | MVP                                                        |
| Auth required        | Yes                                                        |
| Permission required  | `inventory_adjustment.create`                              |
| Request body         | reason, details array                                      |
| Response body        | Created adjustment                                         |
| Validation           | reason required; batch exists; quantity change valid       |
| Business rules       | Adjustment must have reason; no direct stock edit          |
| Error cases          | `VALIDATION_ERROR`, `RESOURCE_NOT_FOUND`, `AUTH_FORBIDDEN` |
| Audit                | Optional on create                                         |
| Idempotency          | No                                                         |
| Related requirements | FR-ADJ-001 to FR-ADJ-004                                   |
| UI consumers         | Inventory Adjustment create screen                         |

### Request example

```json
{
  "reason": "Physical stock count correction",
  "details": [
    {
      "medicineBatchId": "bat_001",
      "quantityChange": -5
    }
  ]
}
```

---

## 13.10.3. POST `/inventory-adjustments/{id}/confirm`

| Field                | Nội dung                                                                |
| -------------------- | ----------------------------------------------------------------------- |
| Method               | POST                                                                    |
| Path                 | `/api/v1/inventory-adjustments/{id}/confirm`                            |
| Purpose              | Confirm adjustment và cập nhật MedicineBatch                            |
| Scope                | MVP                                                                     |
| Auth required        | Yes                                                                     |
| Permission required  | `inventory_adjustment.confirm`                                          |
| Request params       | `id`                                                                    |
| Response body        | Confirmed adjustment                                                    |
| Validation           | Adjustment valid; reason exists; no negative batch quantity             |
| Business rules       | Confirmed adjustment immutable; correction via new adjustment           |
| Error cases          | `INVALID_STATE`, `VALIDATION_ERROR`, `NEGATIVE_STOCK`, `AUTH_FORBIDDEN` |
| Audit                | Required                                                                |
| Idempotency          | Recommended                                                             |
| Related requirements | FR-ADJ-005 to FR-ADJ-010                                                |
| UI consumers         | Inventory Adjustment detail                                             |

---

# 13.11. Order/POS APIs

## 13.11.1. Endpoint list

| Method | Path                          | Purpose                   | Scope |
| ------ | ----------------------------- | ------------------------- | ----- |
| GET    | `/orders`                     | List orders by scope      | MVP   |
| POST   | `/orders`                     | Create Draft Order        | MVP   |
| GET    | `/orders/{id}`                | Order detail              | MVP   |
| PATCH  | `/orders/{id}`                | Update Draft Order header | MVP   |
| POST   | `/orders/{id}/items`          | Add item                  | MVP   |
| PATCH  | `/orders/{id}/items/{itemId}` | Update item quantity      | MVP   |
| DELETE | `/orders/{id}/items/{itemId}` | Remove item               | MVP   |
| POST   | `/orders/{id}/cancel`         | Cancel Draft Order        | MVP   |

### Important rejected endpoint

Do **not** use:

```http
POST /api/v1/orders/{id}/pay
```

as main command to complete order.

Official completion command is:

```http
POST /api/v1/checkout
```

---

## 13.11.2. POST `/orders`

| Field                | Nội dung                                |
| -------------------- | --------------------------------------- |
| Method               | POST                                    |
| Path                 | `/api/v1/orders`                        |
| Purpose              | Tạo Draft Order                         |
| Scope                | MVP                                     |
| Auth required        | Yes                                     |
| Permission required  | `order.create`                          |
| Request body         | customerId optional/null, note optional |
| Response body        | Created Draft Order                     |
| Validation           | User allowed; customer optional         |
| Business rules       | Supports walk-in customer; status DRAFT |
| Error cases          | `AUTH_FORBIDDEN`, `VALIDATION_ERROR`    |
| Audit                | Optional                                |
| Idempotency          | No                                      |
| Related requirements | FR-POS-001 to FR-POS-003                |
| UI consumers         | POS screen                              |

### Request example

```json
{
  "customerId": null,
  "note": "Walk-in customer"
}
```

---

## 13.11.3. POST `/orders/{id}/items`

| Field                | Nội dung                                                                          |
| -------------------- | --------------------------------------------------------------------------------- |
| Method               | POST                                                                              |
| Path                 | `/api/v1/orders/{id}/items`                                                       |
| Purpose              | Thêm Medicine vào Draft Order                                                     |
| Scope                | MVP                                                                               |
| Auth required        | Yes                                                                               |
| Permission required  | `order.add_item_own` OR `order.update_any_draft`                                  |
| Request params       | `id` order id                                                                     |
| Request body         | medicineId, quantity                                                              |
| Response body        | Updated order with alerts summary                                                 |
| Validation           | Order DRAFT; medicine active; quantity > 0                                        |
| Business rules       | Staff own order only; triggers interaction check; persists alerts                 |
| Error cases          | `AUTH_OWNERSHIP_DENIED`, `INVALID_STATE`, `VALIDATION_ERROR`, `MEDICINE_INACTIVE` |
| Audit                | Optional                                                                          |
| Idempotency          | No                                                                                |
| Related requirements | FR-POS-004, FR-POS-010, FR-ALT-001                                                |
| UI consumers         | POS order panel                                                                   |

### Response example

```json
{
  "success": true,
  "data": {
    "order": {
      "id": "ord_001",
      "status": "DRAFT",
      "items": [
        {
          "id": "item_001",
          "medicineId": "med_001",
          "medicineName": "Paracetamol 500mg",
          "quantity": 2,
          "unitPrice": 1500,
          "lineTotal": 3000
        }
      ],
      "total": 3000
    },
    "alerts": [
      {
        "id": "alt_001",
        "severity": "HIGH",
        "title": "Potential interaction",
        "requiresAcknowledgement": true,
        "requiresConsultationNote": true,
        "isResolvedForCheckout": false
      }
    ]
  },
  "meta": {
    "requestId": "req_020",
    "timestamp": "2026-06-08T10:00:00.000Z"
  }
}
```

---

## 13.11.4. POST `/orders/{id}/cancel`

| Field                | Nội dung                                                   |
| -------------------- | ---------------------------------------------------------- |
| Method               | POST                                                       |
| Path                 | `/api/v1/orders/{id}/cancel`                               |
| Purpose              | Cancel Draft Order                                         |
| Scope                | MVP                                                        |
| Auth required        | Yes                                                        |
| Permission required  | `order.cancel_own_draft` OR `order.cancel_any_draft`       |
| Request body         | reason optional                                            |
| Response body        | Cancelled order                                            |
| Validation           | Order exists; status DRAFT                                 |
| Business rules       | Staff own DRAFT only; Admin any DRAFT; PAID cannot cancel  |
| Error cases          | `INVALID_STATE`, `AUTH_OWNERSHIP_DENIED`, `AUTH_FORBIDDEN` |
| Audit                | Recommended                                                |
| Idempotency          | No                                                         |
| Related requirements | FR-POS-011 to FR-POS-014                                   |
| UI consumers         | Order Detail, POS                                          |

---

# 13.12. Interaction Checking APIs

## 13.12.1. Endpoint list

| Method | Path                                 | Purpose                       | Scope       |
| ------ | ------------------------------------ | ----------------------------- | ----------- |
| GET    | `/drug-interactions`                 | List rules                    | MVP         |
| POST   | `/drug-interactions`                 | Create rule                   | MVP         |
| GET    | `/drug-interactions/{id}`            | Rule detail                   | MVP         |
| PATCH  | `/drug-interactions/{id}`            | Update rule                   | MVP         |
| POST   | `/drug-interactions/{id}/deactivate` | Deactivate rule               | MVP         |
| POST   | `/orders/{id}/interactions/check`    | Order-based interaction check | MVP         |
| POST   | `/interactions/check`                | Standalone Admin/demo check   | MVP utility |

---

## 13.12.2. POST `/drug-interactions`

| Field                | Nội dung                                                            |
| -------------------- | ------------------------------------------------------------------- |
| Method               | POST                                                                |
| Path                 | `/api/v1/drug-interactions`                                         |
| Purpose              | Admin tạo ActiveIngredient-level interaction rule                   |
| Scope                | MVP                                                                 |
| Auth required        | Yes                                                                 |
| Permission required  | `drug_interaction.create`                                           |
| Request body         | ingredientAId, ingredientBId, severity, description, recommendation |
| Response body        | Created rule                                                        |
| Validation           | Ingredients exist; severity LOW/MEDIUM/HIGH; no duplicate A-B/B-A   |
| Business rules       | Official rule at ActiveIngredient level; CRITICAL not MVP           |
| Error cases          | `VALIDATION_ERROR`, `RESOURCE_CONFLICT`, `AUTH_FORBIDDEN`           |
| Audit                | Required                                                            |
| Idempotency          | No                                                                  |
| Related requirements | FR-DRG-001 to FR-DRG-009                                            |
| UI consumers         | DrugInteraction Rule Management                                     |

---

## 13.12.3. POST `/orders/{id}/interactions/check`

| Field                | Nội dung                                                        |
| -------------------- | --------------------------------------------------------------- |
| Method               | POST                                                            |
| Path                 | `/api/v1/orders/{id}/interactions/check`                        |
| Purpose              | Kiểm tra interaction cho Order và persist InteractionAlert      |
| Scope                | MVP                                                             |
| Auth required        | Yes                                                             |
| Permission required  | `interaction.check_order_own` OR `interaction.check_order_all`  |
| Request params       | `id` order id                                                   |
| Response body        | Interaction alerts for order                                    |
| Validation           | Order exists; user owns or all-scope                            |
| Business rules       | Order-based check creates/updates InteractionAlert history      |
| Error cases          | `AUTH_OWNERSHIP_DENIED`, `RESOURCE_NOT_FOUND`, `AUTH_FORBIDDEN` |
| Audit                | Optional; alert changes are traceable                           |
| Idempotency          | No                                                              |
| Related requirements | FR-DRG-011, FR-ALT-001                                          |
| UI consumers         | POS, Order Detail                                               |

---

## 13.12.4. POST `/interactions/check`

| Field                | Nội dung                                       |
| -------------------- | ---------------------------------------------- |
| Method               | POST                                           |
| Path                 | `/api/v1/interactions/check`                   |
| Purpose              | Standalone Admin/demo interaction check        |
| Scope                | MVP utility                                    |
| Auth required        | Yes                                            |
| Permission required  | `interaction.check_standalone`                 |
| Request body         | medicineIds or activeIngredientIds             |
| Response body        | Interaction result only                        |
| Validation           | Inputs valid                                   |
| Business rules       | Does not create Order InteractionAlert history |
| Error cases          | `VALIDATION_ERROR`, `AUTH_FORBIDDEN`           |
| Audit                | Optional                                       |
| Idempotency          | No                                             |
| Related requirements | FR-DRG-010                                     |
| UI consumers         | Admin/demo utility                             |

---

# 13.13. InteractionAlert APIs

## 13.13.1. Endpoint list

| Method | Path                                         | Purpose                | Scope |
| ------ | -------------------------------------------- | ---------------------- | ----- |
| GET    | `/orders/{id}/interaction-alerts`            | Alerts for order       | MVP   |
| POST   | `/interaction-alerts/{id}/acknowledge`       | Acknowledge HIGH alert | MVP   |
| POST   | `/interaction-alerts/{id}/consultation-note` | Save consultation note | MVP   |
| GET    | `/interaction-alerts/history`                | Admin alert history    | MVP   |

---

## 13.13.2. POST `/interaction-alerts/{id}/acknowledge`

| Field                | Nội dung                                                                         |
| -------------------- | -------------------------------------------------------------------------------- |
| Method               | POST                                                                             |
| Path                 | `/api/v1/interaction-alerts/{id}/acknowledge`                                    |
| Purpose              | Acknowledge HIGH alert                                                           |
| Scope                | MVP                                                                              |
| Auth required        | Yes                                                                              |
| Permission required  | `interaction_alert.acknowledge_own_order` OR `interaction_alert.acknowledge_all` |
| Request params       | `id` alert id                                                                    |
| Request body         | `{ "acknowledged": true }`                                                       |
| Response body        | Updated alert                                                                    |
| Validation           | Alert exists; active; severity HIGH                                              |
| Business rules       | HIGH requires acknowledgement before checkout                                    |
| Error cases          | `RESOURCE_NOT_FOUND`, `INVALID_STATE`, `AUTH_OWNERSHIP_DENIED`                   |
| Audit                | Required                                                                         |
| Idempotency          | No                                                                               |
| Related requirements | FR-ALT-009, FR-ALT-012                                                           |
| UI consumers         | POS alert panel, Order Detail                                                    |

---

## 13.13.3. POST `/interaction-alerts/{id}/consultation-note`

| Field                | Nội dung                                                              |
| -------------------- | --------------------------------------------------------------------- |
| Method               | POST                                                                  |
| Path                 | `/api/v1/interaction-alerts/{id}/consultation-note`                   |
| Purpose              | Lưu consultation note cho HIGH alert                                  |
| Scope                | MVP                                                                   |
| Auth required        | Yes                                                                   |
| Permission required  | `interaction_alert.note_own_order` OR `interaction_alert.note_all`    |
| Request body         | `{ "note": "..." }`                                                   |
| Response body        | Updated alert                                                         |
| Validation           | Alert exists; active; severity HIGH; note non-empty                   |
| Business rules       | Mỗi HIGH alert cần note riêng; AI draft chỉ lưu sau user confirmation |
| Error cases          | `VALIDATION_ERROR`, `INVALID_STATE`, `AUTH_OWNERSHIP_DENIED`          |
| Audit                | Required                                                              |
| Idempotency          | No                                                                    |
| Related requirements | FR-ALT-010, FR-ALT-011, FR-ALT-013                                    |
| UI consumers         | POS alert panel                                                       |

---

## 13.13.4. GET `/interaction-alerts/history`

| Field                | Nội dung                                                        |
| -------------------- | --------------------------------------------------------------- |
| Method               | GET                                                             |
| Path                 | `/api/v1/interaction-alerts/history`                            |
| Purpose              | Admin xem InteractionAlert History toàn hệ thống                |
| Scope                | MVP                                                             |
| Auth required        | Yes                                                             |
| Permission required  | `interaction_alert.read_all`                                    |
| Query params         | severity, orderId, medicineId, fromDate, toDate, page, pageSize |
| Response body        | Paginated alert history                                         |
| Validation           | Filter allowlist                                                |
| Business rules       | Warehouse no access; Staff no all-history access                |
| Error cases          | `AUTH_FORBIDDEN`, `VALIDATION_ERROR`                            |
| Audit                | Optional                                                        |
| Idempotency          | No                                                              |
| Related requirements | FR-ALT-014, FR-ALT-015                                          |
| UI consumers         | Admin InteractionAlert History screen                           |

---

# 13.14. Checkout API

## 13.14.1. Endpoint list

| Method | Path        | Purpose                      | Scope |
| ------ | ----------- | ---------------------------- | ----- |
| POST   | `/checkout` | Execute checkout transaction | MVP   |

---

## 13.14.2. POST `/checkout`

| Field                | Nội dung                                                                                                         |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Method               | POST                                                                                                             |
| Path                 | `/api/v1/checkout`                                                                                               |
| Purpose              | Hoàn tất Draft Order bằng transaction chính thức                                                                 |
| Scope                | MVP                                                                                                              |
| Auth required        | Yes                                                                                                              |
| Permission required  | `checkout.execute_own` OR `checkout.execute_all`                                                                 |
| Headers              | `Idempotency-Key` required                                                                                       |
| Request body         | orderId, payment method/data                                                                                     |
| Response body        | Checkout result: order, payment, invoice, allocations summary                                                    |
| Validation           | Order DRAFT; items exist; stock sufficient; HIGH alerts resolved; payment valid                                  |
| Business rules       | FEFO; one successful payment; invoice after payment success; rollback on failure                                 |
| Error cases          | `INVALID_STATE`, `INSUFFICIENT_STOCK`, `HIGH_ALERT_UNRESOLVED`, `PAYMENT_FAILED`, `IDEMPOTENCY_PAYLOAD_MISMATCH` |
| Audit                | Required                                                                                                         |
| Idempotency          | Required                                                                                                         |
| Related requirements | FR-CHK-001 to FR-CHK-024                                                                                         |
| UI consumers         | Checkout route/full-height panel                                                                                 |

### Request example — cash

```json
{
  "orderId": "ord_001",
  "payment": {
    "method": "CASH",
    "amountTendered": 100000
  }
}
```

### Request example — simulated bank transfer

```json
{
  "orderId": "ord_001",
  "payment": {
    "method": "BANK_TRANSFER_SIMULATION",
    "transactionReference": "BANK-DEMO-0001"
  }
}
```

### Success response example

```json
{
  "success": true,
  "data": {
    "order": {
      "id": "ord_001",
      "status": "PAID",
      "totalAmount": 45000
    },
    "payment": {
      "id": "pay_001",
      "status": "SUCCESS",
      "method": "CASH",
      "amountDue": 45000,
      "amountTendered": 100000,
      "changeAmount": 55000
    },
    "invoice": {
      "id": "inv_001",
      "invoiceNumber": "INV-20260608-001",
      "issuedAt": "2026-06-08T10:00:00.000Z"
    },
    "allocations": [
      {
        "orderItemId": "item_001",
        "medicineBatchId": "bat_001",
        "quantityAllocated": 2,
        "expiryDate": "2026-09-01"
      }
    ]
  },
  "meta": {
    "requestId": "req_checkout_001",
    "timestamp": "2026-06-08T10:00:00.000Z"
  }
}
```

### HIGH alert unresolved error example

```json
{
  "success": false,
  "error": {
    "code": "HIGH_ALERT_UNRESOLVED",
    "message": "Checkout is blocked because one or more HIGH interaction alerts require acknowledgement and consultation note.",
    "details": [
      {
        "interactionAlertId": "alt_001",
        "requiresAcknowledgement": true,
        "hasAcknowledgement": false,
        "requiresConsultationNote": true,
        "hasConsultationNote": false
      }
    ]
  },
  "meta": {
    "requestId": "req_checkout_002",
    "timestamp": "2026-06-08T10:00:00.000Z"
  }
}
```

---

# 13.15. Payment Read APIs

## 13.15.1. Endpoint list

| Method | Path                    | Purpose                | Scope |
| ------ | ----------------------- | ---------------------- | ----- |
| GET    | `/payments`             | List payments by scope | MVP   |
| GET    | `/payments/{id}`        | Payment detail         | MVP   |
| GET    | `/orders/{id}/payments` | Payments for order     | MVP   |

### Important note

No public payment creation command outside checkout.

Rejected:

```http
POST /api/v1/payments
```

as official order completion.

---

## 13.15.2. GET `/payments/{id}`

| Field                | Nội dung                                                        |
| -------------------- | --------------------------------------------------------------- |
| Method               | GET                                                             |
| Path                 | `/api/v1/payments/{id}`                                         |
| Purpose              | Xem payment detail                                              |
| Scope                | MVP                                                             |
| Auth required        | Yes                                                             |
| Permission required  | `payment.read_own` OR `payment.read_all`                        |
| Request params       | `id`                                                            |
| Response body        | Payment detail                                                  |
| Validation           | Payment exists; Staff ownership if own                          |
| Business rules       | Warehouse no access                                             |
| Error cases          | `RESOURCE_NOT_FOUND`, `AUTH_OWNERSHIP_DENIED`, `AUTH_FORBIDDEN` |
| Audit                | No                                                              |
| Idempotency          | No                                                              |
| Related requirements | FR-PAY                                                          |
| UI consumers         | Order Detail, Admin payment view                                |

---

# 13.16. Invoice APIs

## 13.16.1. Endpoint list

| Method | Path                   | Purpose                | Scope |
| ------ | ---------------------- | ---------------------- | ----- |
| GET    | `/invoices`            | List invoices by scope | MVP   |
| GET    | `/invoices/{id}`       | Invoice detail         | MVP   |
| GET    | `/orders/{id}/invoice` | Invoice by order       | MVP   |

### Important note

No public invoice creation command outside checkout.

Rejected:

```http
POST /api/v1/invoices
```

as official order completion.

---

## 13.16.2. GET `/invoices/{id}`

| Field                | Nội dung                                                           |
| -------------------- | ------------------------------------------------------------------ |
| Method               | GET                                                                |
| Path                 | `/api/v1/invoices/{id}`                                            |
| Purpose              | Xem invoice detail                                                 |
| Scope                | MVP                                                                |
| Auth required        | Yes                                                                |
| Permission required  | `invoice.read_own` OR `invoice.read_all`                           |
| Request params       | `id`                                                               |
| Response body        | Invoice snapshot                                                   |
| Validation           | Invoice exists; Staff ownership if own                             |
| Business rules       | Invoice created only after successful payment; Warehouse no access |
| Error cases          | `RESOURCE_NOT_FOUND`, `AUTH_OWNERSHIP_DENIED`, `AUTH_FORBIDDEN`    |
| Audit                | No                                                                 |
| Idempotency          | No                                                                 |
| Related requirements | FR-INV                                                             |
| UI consumers         | Invoice view, Checkout success, Order Detail                       |

---

# 13.17. AI Copilot APIs

## 13.17.1. Endpoint list

| Method | Path                                          | Purpose                           | Scope              |
| ------ | --------------------------------------------- | --------------------------------- | ------------------ |
| POST   | `/ai/interaction-alerts/{alertId}/explain`    | AI explain alert                  | MVP                |
| POST   | `/ai/interaction-alerts/{alertId}/note-draft` | Generate consultation note draft  | MVP                |
| POST   | `/ai/safe-follow-up-questions`                | Generate safe follow-up questions | MVP if implemented |
| GET    | `/ai/prompts`                                 | View prompt templates             | MVP/Internal/Admin |
| PATCH  | `/ai/prompts/{id}`                            | Edit prompt template              | Should-have        |

---

## 13.17.2. POST `/ai/interaction-alerts/{alertId}/explain`

| Field                | Nội dung                                                                   |
| -------------------- | -------------------------------------------------------------------------- |
| Method               | POST                                                                       |
| Path                 | `/api/v1/ai/interaction-alerts/{alertId}/explain`                          |
| Purpose              | Tạo AI explanation cho InteractionAlert                                    |
| Scope                | MVP                                                                        |
| Auth required        | Yes                                                                        |
| Permission required  | `ai_copilot.use_interaction_explanation`                                   |
| Request params       | `alertId`                                                                  |
| Request body         | optional short context                                                     |
| Response body        | Safe explanation, provider/fallback metadata                               |
| Validation           | Alert exists; user owns order or Admin; context safe                       |
| Business rules       | AI no diagnosis/prescribing/dosage; guardrail and audit required           |
| Error cases          | `AI_GUARDRAIL_BLOCKED`, `AI_PROVIDER_UNAVAILABLE`, `AUTH_OWNERSHIP_DENIED` |
| Audit                | AI Audit required                                                          |
| Idempotency          | No                                                                         |
| Related requirements | FR-AIC, FR-AIG, FR-AIA                                                     |
| UI consumers         | POS AI Copilot panel                                                       |

### Response example

```json
{
  "success": true,
  "data": {
    "explanation": "This interaction alert should be reviewed carefully. The system detected a HIGH-severity interaction based on active ingredients. Please follow pharmacy consultation workflow.",
    "disclaimer": "AI output is for support only and does not replace professional medical judgment.",
    "providerUsed": "GOOGLE_AI",
    "fallbackUsed": false,
    "guardrailStatus": {
      "input": "PASSED",
      "output": "PASSED"
    }
  },
  "meta": {
    "requestId": "req_ai_001",
    "timestamp": "2026-06-08T10:00:00.000Z"
  }
}
```

---

## 13.17.3. POST `/ai/interaction-alerts/{alertId}/note-draft`

| Field                | Nội dung                                                         |
| -------------------- | ---------------------------------------------------------------- |
| Method               | POST                                                             |
| Path                 | `/api/v1/ai/interaction-alerts/{alertId}/note-draft`             |
| Purpose              | Tạo consultation note draft                                      |
| Scope                | MVP                                                              |
| Auth required        | Yes                                                              |
| Permission required  | `ai_copilot.generate_note_draft`                                 |
| Request body         | optional short context                                           |
| Response body        | Draft note, not official                                         |
| Validation           | Alert active; severity HIGH; user owns order or Admin            |
| Business rules       | Draft không tự động lưu thành official consultation note         |
| Error cases          | `AI_GUARDRAIL_BLOCKED`, `AUTH_OWNERSHIP_DENIED`, `INVALID_STATE` |
| Audit                | AI Audit required                                                |
| Idempotency          | No                                                               |
| Related requirements | FR-AIC-003 to FR-AIC-005                                         |
| UI consumers         | HIGH alert note panel                                            |

---

# 13.18. AI Audit APIs

## 13.18.1. Endpoint list

| Method | Path                  | Purpose                    | Scope |
| ------ | --------------------- | -------------------------- | ----- |
| GET    | `/ai-audit-logs`      | Admin list AI audit logs   | MVP   |
| GET    | `/ai-audit-logs/{id}` | Admin view AI audit detail | MVP   |

---

## 13.18.2. GET `/ai-audit-logs`

| Field                | Nội dung                                                                         |
| -------------------- | -------------------------------------------------------------------------------- |
| Method               | GET                                                                              |
| Path                 | `/api/v1/ai-audit-logs`                                                          |
| Purpose              | Admin xem AI Audit Log                                                           |
| Scope                | MVP                                                                              |
| Auth required        | Yes                                                                              |
| Permission required  | `ai_audit.read_all`                                                              |
| Query params         | actionType, providerUsed, fallbackUsed, status, fromDate, toDate, page, pageSize |
| Response body        | Paginated AI audit logs                                                          |
| Validation           | Filter allowlist                                                                 |
| Business rules       | No raw PII exposed                                                               |
| Error cases          | `AUTH_FORBIDDEN`, `VALIDATION_ERROR`                                             |
| Audit                | Optional read log                                                                |
| Idempotency          | No                                                                               |
| Related requirements | FR-AIA                                                                           |
| UI consumers         | Admin AI Audit screen                                                            |

---

# 13.19. Graph-RAG APIs

## 13.19.1. Endpoint list

| Method | Path                                      | Purpose                               | Scope |
| ------ | ----------------------------------------- | ------------------------------------- | ----- |
| POST   | `/graph-rag/query`                        | Ask Graph-RAG                         | MVP   |
| GET    | `/graph/explorer/medicines/{id}`          | Read graph view for medicine          | MVP   |
| GET    | `/graph/explorer/active-ingredients/{id}` | Read graph view for active ingredient | MVP   |

### Important note

No raw Cypher API for Staff.

Rejected:

```http
POST /api/v1/graph/cypher
```

for Staff or general users.

---

## 13.19.2. POST `/graph-rag/query`

| Field                | Nội dung                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| Method               | POST                                                                                              |
| Path                 | `/api/v1/graph-rag/query`                                                                         |
| Purpose              | Read-only Graph-RAG query                                                                         |
| Scope                | MVP                                                                                               |
| Auth required        | Yes                                                                                               |
| Permission required  | `graph_rag.use_readonly`                                                                          |
| Request body         | question, context optional                                                                        |
| Response body        | answer, graphUsed, freshness, provenance                                                          |
| Validation           | Query safe; no raw Cypher; allowed query type                                                     |
| Business rules       | Check freshness; fallback PostgreSQL for interaction explanation; safe error for pure graph query |
| Error cases          | `GRAPH_STALE`, `GRAPH_UNAVAILABLE`, `AUTH_FORBIDDEN`, `AI_GUARDRAIL_BLOCKED`                      |
| Audit                | Recommended                                                                                       |
| Idempotency          | No                                                                                                |
| Related requirements | FR-GRG                                                                                            |
| UI consumers         | Graph-RAG screen, AI/Graph screens                                                                |

### Request example

```json
{
  "question": "Giải thích vì sao hai thuốc trong đơn này có cảnh báo tương tác?",
  "context": {
    "orderId": "ord_001",
    "interactionAlertId": "alt_001"
  }
}
```

### Response example

```json
{
  "success": true,
  "data": {
    "answer": "Cảnh báo được suy ra từ mối quan hệ giữa các hoạt chất của các thuốc trong đơn.",
    "graphUsed": true,
    "freshness": {
      "status": "FRESH",
      "checkedAt": "2026-06-08T10:00:00.000Z"
    },
    "provenance": [
      {
        "type": "INTERACTS_WITH",
        "ruleId": "rule_001",
        "source": "PostgreSQL projected to Neo4j"
      }
    ]
  },
  "meta": {
    "requestId": "req_graph_001",
    "timestamp": "2026-06-08T10:00:00.000Z"
  }
}
```

---

# 13.20. Graph Sync Status APIs — Should-have

## 13.20.1. Endpoint list

| Method | Path                          | Purpose                | Scope                       |
| ------ | ----------------------------- | ---------------------- | --------------------------- |
| GET    | `/graph-sync/status`          | View graph sync status | Should-have                 |
| GET    | `/graph-sync/jobs`            | List sync jobs         | Should-have                 |
| POST   | `/graph-sync/jobs/{id}/retry` | Retry failed job       | Should-have                 |
| POST   | `/graph-sync/rebuild`         | Rebuild projection     | Should-have/Admin technical |

### Notes

Backend Graph Sync is MVP. Admin UI/API for status/retry is Should-have.

---

# 13.21. Reports APIs

## 13.21.1. Endpoint list

| Method | Path                     | Purpose              | Scope       |
| ------ | ------------------------ | -------------------- | ----------- |
| GET    | `/reports/revenue`       | Revenue Report       | MVP         |
| GET    | `/reports/top-medicines` | Top Medicines Report | MVP         |
| GET    | `/reports/inventory`     | Inventory Report     | MVP         |
| POST   | `/reports/narrative/ai`  | AI report narrative  | Should-have |

---

## 13.21.2. GET `/reports/revenue`

| Field                | Nội dung                                                                      |
| -------------------- | ----------------------------------------------------------------------------- |
| Method               | GET                                                                           |
| Path                 | `/api/v1/reports/revenue`                                                     |
| Purpose              | Admin xem revenue report                                                      |
| Scope                | MVP                                                                           |
| Auth required        | Yes                                                                           |
| Permission required  | `report.revenue.read`                                                         |
| Query params         | fromDate, toDate, groupBy optional                                            |
| Response body        | Revenue totals and breakdown                                                  |
| Validation           | Valid date range                                                              |
| Business rules       | Include PAID orders and SUCCESS payments only; exclude DRAFT/CANCELLED/FAILED |
| Error cases          | `AUTH_FORBIDDEN`, `VALIDATION_ERROR`                                          |
| Audit                | No                                                                            |
| Idempotency          | No                                                                            |
| Related requirements | FR-RPT-001 to FR-RPT-005                                                      |
| UI consumers         | Revenue Report screen                                                         |

---

## 13.21.3. GET `/reports/top-medicines`

| Field                | Nội dung                             |
| -------------------- | ------------------------------------ |
| Method               | GET                                  |
| Path                 | `/api/v1/reports/top-medicines`      |
| Purpose              | Admin xem top medicines              |
| Scope                | MVP                                  |
| Auth required        | Yes                                  |
| Permission required  | `report.top_medicines.read`          |
| Query params         | fromDate, toDate, limit, sortBy      |
| Response body        | Top medicine list                    |
| Validation           | Limit max; date valid                |
| Business rules       | Based on PAID orders only            |
| Error cases          | `AUTH_FORBIDDEN`, `VALIDATION_ERROR` |
| Audit                | No                                   |
| Idempotency          | No                                   |
| Related requirements | FR-RPT-006 to FR-RPT-008             |
| UI consumers         | Top Medicines Report screen          |

---

## 13.21.4. GET `/reports/inventory`

| Field                | Nội dung                                                                                     |
| -------------------- | -------------------------------------------------------------------------------------------- |
| Method               | GET                                                                                          |
| Path                 | `/api/v1/reports/inventory`                                                                  |
| Purpose              | Inventory report                                                                             |
| Scope                | MVP                                                                                          |
| Auth required        | Yes                                                                                          |
| Permission required  | `report.inventory.read`                                                                      |
| Query params         | lowStock, nearExpiry, withinDays, page, pageSize                                             |
| Response body        | Inventory report list                                                                        |
| Validation           | withinDays positive if provided                                                              |
| Business rules       | Based on MedicineBatch; low-stock from sellable quantity; withinDays does not change setting |
| Error cases          | `AUTH_FORBIDDEN`, `VALIDATION_ERROR`                                                         |
| Audit                | No                                                                                           |
| Idempotency          | No                                                                                           |
| Related requirements | FR-RPT-009 to FR-RPT-014                                                                     |
| UI consumers         | Inventory Report screen                                                                      |

---

# 13.22. System Settings APIs

## 13.22.1. Endpoint list

| Method | Path                              | Purpose                      | Scope       |
| ------ | --------------------------------- | ---------------------------- | ----------- |
| GET    | `/settings`                       | Get system settings          | MVP         |
| PATCH  | `/settings/near-expiry-threshold` | Update near-expiry threshold | MVP         |
| GET    | `/settings/near-expiry-threshold` | Get threshold only           | MVP         |
| PATCH  | `/settings/ai-provider`           | Update AI provider config    | Should-have |
| PATCH  | `/settings/prompts`               | Update prompt config         | Should-have |

---

## 13.22.2. PATCH `/settings/near-expiry-threshold`

| Field                | Nội dung                                                        |
| -------------------- | --------------------------------------------------------------- |
| Method               | PATCH                                                           |
| Path                 | `/api/v1/settings/near-expiry-threshold`                        |
| Purpose              | Admin cập nhật near-expiry threshold                            |
| Scope                | MVP                                                             |
| Auth required        | Yes                                                             |
| Permission required  | `settings.update_near_expiry_threshold`                         |
| Request body         | `{ "days": 90 }`                                                |
| Response body        | Updated setting                                                 |
| Validation           | days positive; within allowed range                             |
| Business rules       | Default 90 days; report withinDays does not update this setting |
| Error cases          | `AUTH_FORBIDDEN`, `VALIDATION_ERROR`                            |
| Audit                | Required                                                        |
| Idempotency          | No                                                              |
| Related requirements | FR-SET-001 to FR-SET-005                                        |
| UI consumers         | Admin System Settings screen                                    |

---

# 13.23. Demo Reset APIs — Local/Internal Only

## 13.23.1. Endpoint list

| Method | Path                    | Purpose                      | Scope             |
| ------ | ----------------------- | ---------------------------- | ----------------- |
| POST   | `/internal/demo/reset`  | Run demo reset               | MVP local tooling |
| GET    | `/internal/demo/status` | Check demo seed/smoke status | MVP local tooling |

### Important warning

These endpoints should not be exposed in demo/staging/production.

Recommended approach: implement as local command/script rather than public API.

If API exists, it must be:

1. Local only.
2. Admin/technical token protected.
3. Environment guarded.
4. Refuse unknown/demo/staging/production.

---

## 13.23.2. POST `/internal/demo/reset`

| Field                | Nội dung                                                      |
| -------------------- | ------------------------------------------------------------- |
| Method               | POST                                                          |
| Path                 | `/api/v1/internal/demo/reset`                                 |
| Purpose              | Reset local demo data                                         |
| Scope                | MVP local only                                                |
| Auth required        | Yes or technical local guard                                  |
| Permission required  | Technical local/admin-only                                    |
| Request body         | `{ "confirmLocalReset": true }`                               |
| Response body        | Reset result and smoke check summary                          |
| Validation           | Environment must be local; confirm flag true                  |
| Business rules       | Must refuse demo/staging/production/unknown                   |
| Error cases          | `DEMO_RESET_ENV_DENIED`, `VALIDATION_ERROR`, `INTERNAL_ERROR` |
| Audit                | Required/local log                                            |
| Idempotency          | Recommended                                                   |
| Related requirements | FR-DMO-001 to FR-DMO-016                                      |
| UI consumers         | None; local tooling                                           |

---

# 14. MVP / Should-have / Future API Classification

## 14.1. MVP APIs

MVP includes:

1. Auth/Profile APIs.
2. User/Role/Permission APIs.
3. Medicine APIs.
4. ActiveIngredient APIs.
5. Medicine–ActiveIngredient Mapping APIs.
6. Supplier APIs.
7. Inventory Summary APIs.
8. MedicineBatch read APIs.
9. Stock Import APIs.
10. Inventory Adjustment APIs.
11. Order/POS APIs.
12. Interaction Checking APIs.
13. InteractionAlert APIs.
14. Checkout API.
15. Payment read APIs.
16. Invoice APIs.
17. AI Copilot APIs.
18. AI Audit APIs.
19. Graph-RAG APIs.
20. Reports APIs.
21. System Settings APIs.
22. Demo Reset local tooling/API if implemented.

## 14.2. Should-have APIs

Should-have includes:

1. Full Customer Management APIs.
2. Customer purchase history APIs.
3. Generic System Audit Log APIs.
4. Graph Sync Status/retry APIs.
5. Admin Prompt Editing APIs.
6. Admin AI Provider/Model Config APIs.
7. AI Report Narrative APIs.
8. Advanced Chart APIs.
9. Notification APIs.
10. Reorder Suggestion APIs.

## 14.3. Future APIs

Future includes:

1. Online commerce APIs.
2. Cart APIs.
3. Wishlist APIs.
4. Shipping APIs.
5. Coupon APIs.
6. Review APIs.
7. CMS APIs.
8. Customer Portal APIs.
9. Multi-store APIs.
10. Multi-warehouse APIs.
11. Stock Transfer APIs.
12. Purchase Order APIs.
13. Supplier Contract APIs.
14. Refund APIs.
15. Return APIs.
16. Credit Note APIs.
17. Real Payment Gateway APIs.
18. Bank Reconciliation APIs.
19. AI Cache APIs.
20. DrugGroup Taxonomy APIs.
21. Symptom/Condition/RedFlag graph enrichment APIs.

---

# 15. Deprecated / Rejected API Patterns

The following API patterns are rejected and must not be used as official MVP contract.

## 15.1. Custom auth endpoint

Rejected:

```http
POST /api/v1/auth/login
```

if it implements custom username/password/JWT authentication.

Reason:

1. Supabase Auth is official.
2. PostgreSQL must not store password/password_hash.

## 15.2. Main payment command on Order

Rejected:

```http
POST /api/v1/orders/{id}/pay
```

as main order completion command.

Reason:

1. Checkout is official command.
2. Payment/invoice/stock deduction must be transactional.
3. Prevent split flow inconsistency.

## 15.3. Public direct payment creation

Rejected:

```http
POST /api/v1/payments
```

as public command to complete an order.

Reason:

1. Payment must be created through checkout.
2. One-successful-payment rule enforced inside checkout/payment service.

## 15.4. Public direct invoice creation

Rejected:

```http
POST /api/v1/invoices
```

as public command to complete an order.

Reason:

1. Invoice must be created after successful payment through checkout.
2. Prevent invoice without PAID order.

## 15.5. Direct inventory quantity update

Rejected:

```http
PATCH /api/v1/medicine-batches/{id}/quantity
```

Reason:

1. Inventory changes must go through Stock Import, Inventory Adjustment or Checkout.
2. Direct edit breaks audit and traceability.

## 15.6. Medicine-level official interaction rule

Rejected:

```http
POST /api/v1/medicine-interactions
```

as official MVP rule.

Reason:

1. Official rule is ActiveIngredient–ActiveIngredient.
2. Medicine interaction is derived from ingredients.

## 15.7. Raw Cypher API for Staff

Rejected:

```http
POST /api/v1/graph/cypher
```

Reason:

1. Security risk.
2. Staff cannot submit raw Cypher.
3. Graph-RAG must use allowlisted query templates.

## 15.8. Demo reset public production API

Rejected:

```http
POST /api/v1/demo/reset
```

if accessible outside local.

Reason:

1. Destructive.
2. Must refuse demo/staging/production/unknown environments.

---

# 16. API-to-SRS Traceability

| API Group                 | SRS Requirement Group               |
| ------------------------- | ----------------------------------- |
| Auth/Profile APIs         | FR-AUTH, FR-RBAC, NFR-SEC           |
| User/Role/Permission APIs | FR-RBAC, DR-ID, BR-AUTH             |
| Medicine APIs             | FR-MED, DR-MED, BR-MED              |
| ActiveIngredient APIs     | FR-ACT, DR-MED, BR-MED              |
| Mapping APIs              | FR-ACT, FR-GSY                      |
| Supplier APIs             | FR-SUP, BR-SUP                      |
| Inventory APIs            | FR-BAT, BR-INV, FR-RPT              |
| MedicineBatch APIs        | FR-BAT                              |
| Stock Import APIs         | FR-STI, BR-STI                      |
| Inventory Adjustment APIs | FR-ADJ, BR-ADJ                      |
| Order/POS APIs            | FR-POS, BR-SALES                    |
| Interaction APIs          | FR-DRG, BR-INT                      |
| InteractionAlert APIs     | FR-ALT, BR-ALT                      |
| Checkout API              | FR-CHK, BR-SALES, NFR-REL, NFR-DINT |
| Payment APIs              | FR-PAY, BR-PAY                      |
| Invoice APIs              | FR-INV, BR-PAY                      |
| AI Copilot APIs           | FR-AIC, FR-AIG, FR-AIA              |
| AI Audit APIs             | FR-AIA                              |
| Graph-RAG APIs            | FR-GRG, FR-GSY, BR-GPH              |
| Reports APIs              | FR-RPT                              |
| Settings APIs             | FR-SET                              |
| Demo Reset APIs           | FR-DMO                              |

---

# 17. API-to-ERD / Prisma Traceability

| API Group            | Main database entities                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| Auth/Profile         | user_profiles                                                                                                |
| User/Role/Permission | users/user_profiles, roles, permissions, user_roles, role_permissions                                        |
| Medicine             | medicines                                                                                                    |
| ActiveIngredient     | active_ingredients                                                                                           |
| Mapping              | medicine_ingredients                                                                                         |
| Supplier             | suppliers                                                                                                    |
| Inventory Summary    | medicine_batches, medicines                                                                                  |
| MedicineBatch        | medicine_batches                                                                                             |
| Stock Import         | stock_imports, stock_import_details, medicine_batches                                                        |
| Inventory Adjustment | inventory_adjustments, inventory_adjustment_details, medicine_batches                                        |
| Order/POS            | orders, order_items                                                                                          |
| Interaction          | drug_interactions, active_ingredients, medicine_ingredients                                                  |
| InteractionAlert     | interaction_alerts                                                                                           |
| Checkout             | orders, order_items, order_item_batch_allocations, medicine_batches, payments, invoices, idempotency_records |
| Payment              | payments                                                                                                     |
| Invoice              | invoices                                                                                                     |
| AI Copilot           | prompt_templates, ai_audit_logs                                                                              |
| AI Audit             | ai_audit_logs                                                                                                |
| Graph-RAG            | graph_sync_outbox, graph_sync_attempts, Neo4j projection                                                     |
| Reports              | orders, payments, invoices, order_items, medicine_batches, allocations                                       |
| Settings             | system_settings                                                                                              |
| Demo Reset           | seed data across MVP entities                                                                                |

---

# 18. API-to-UI Traceability

| UI Area                     | API Groups                                                        |
| --------------------------- | ----------------------------------------------------------------- |
| Login                       | Auth/Profile, Supabase Auth                                       |
| App Shell / Sidebar         | Auth/Profile, Permissions                                         |
| User Management             | User/Role/Permission                                              |
| Medicine Management         | Medicine, ActiveIngredient, Mapping                               |
| Supplier Management         | Supplier                                                          |
| Inventory Summary           | Inventory Summary, MedicineBatch                                  |
| Batch Detail                | MedicineBatch                                                     |
| Stock Import                | Stock Import, Supplier, Medicine                                  |
| Inventory Adjustment        | Inventory Adjustment, MedicineBatch                               |
| POS                         | Order/POS, Medicine, Inventory availability, InteractionAlert, AI |
| Checkout                    | Checkout, Payment, Invoice, InteractionAlert                      |
| Order History/Detail        | Order/POS, Payment, Invoice, InteractionAlert                     |
| Interaction Rule Management | Interaction APIs                                                  |
| InteractionAlert History    | InteractionAlert APIs                                             |
| AI Copilot Panel            | AI Copilot APIs                                                   |
| AI Audit                    | AI Audit APIs                                                     |
| Graph-RAG                   | Graph-RAG APIs                                                    |
| Reports                     | Reports APIs                                                      |
| System Settings             | Settings APIs                                                     |
| Demo tooling                | Demo Reset local tooling                                          |

---

# 19. API-to-Testing Traceability

| API Group            | Test focus                                                             |
| -------------------- | ---------------------------------------------------------------------- |
| Auth/Profile         | Token valid/invalid, inactive user, first-login                        |
| User/Role/Permission | Permission matrix, role assignment, forbidden cases                    |
| Medicine             | Create/update/deactivate, price validation                             |
| ActiveIngredient     | CRUD, duplicate, mapping                                               |
| Supplier             | Warehouse create/update, Admin deactivate, Warehouse deactivate denied |
| Inventory            | Sellable stock, expired exclusion, low-stock, near-expiry              |
| MedicineBatch        | Read-only quantity, no direct edit                                     |
| Stock Import         | Draft, confirm, expiry mismatch, no double confirm                     |
| Inventory Adjustment | Reason required, no negative stock, confirm                            |
| Order/POS            | Draft, item add/update/remove, ownership                               |
| Interaction          | ActiveIngredient rule, duplicate A-B/B-A, standalone check             |
| InteractionAlert     | Persist, acknowledge, note, history permissions                        |
| Checkout             | Transaction, idempotency, FEFO, high alert block, rollback             |
| Payment              | Cash amount, bank reference, one success                               |
| Invoice              | Created after checkout, read ownership                                 |
| AI Copilot           | Guardrail, fallback, audit                                             |
| AI Audit             | No raw PII, Admin-only access                                          |
| Graph-RAG            | Fresh graph, stale fallback, safe error, no raw Cypher                 |
| Reports              | Revenue exclusions, top medicines, inventory report                    |
| Settings             | Default 90, update threshold                                           |
| Demo Reset           | Local-only guard, seed and smoke checks                                |

---

## 20. API Review Checklist

Before implementation/release, API must satisfy:

| Checklist item                                                   | Expected |
| ---------------------------------------------------------------- | -------- |
| All protected endpoints require Supabase token                   | Yes      |
| Backend resolves user profile and permissions                    | Yes      |
| Staff endpoints enforce ownership                                | Yes      |
| Warehouse blocked from POS/payment/invoice/interaction/graph MVP | Yes      |
| No custom username/password/JWT auth                             | Yes      |
| No password/password_hash in PostgreSQL                          | Yes      |
| No direct inventory quantity update API                          | Yes      |
| No `/orders/{id}/pay` main command                               | Yes      |
| No public `POST /payments` for order completion                  | Yes      |
| No public `POST /invoices` for order completion                  | Yes      |
| Checkout has idempotency                                         | Yes      |
| Checkout validates HIGH alerts                                   | Yes      |
| Checkout applies FEFO                                            | Yes      |
| Stock Import confirm prevents double stock add                   | Yes      |
| Inventory Adjustment prevents negative stock                     | Yes      |
| Interaction rules are ActiveIngredient-level                     | Yes      |
| InteractionAlert persists and supports ack/note                  | Yes      |
| AI APIs use guardrail and audit                                  | Yes      |
| Graph-RAG checks freshness/fallback                              | Yes      |
| Demo reset local-only                                            | Yes      |

---

## 21. Kết luận

Document 12 — API Specification đã xác định REST API contract chính thức cho **PharmaAssist AI Intelligence**.

Tài liệu này đã mô tả:

1. API design principles.
2. Base URL and versioning.
3. Authentication model với Supabase Auth.
4. Authorization model dựa trên permission và ownership.
5. Common request headers.
6. Common response format.
7. Error response format.
8. Pagination/filter/sort conventions.
9. Idempotency conventions.
10. Audit conventions.
11. API groups theo module.
12. Endpoint detail template.
13. Endpoint list và endpoint detail quan trọng.
14. MVP/Should-have/Future API classification.
15. Deprecated/rejected API patterns.
16. API-to-SRS traceability.
17. API-to-ERD/Prisma traceability.
18. API-to-UI traceability.
19. API-to-testing traceability.
20. API review checklist.

Các baseline quan trọng được giữ đúng:

1. Supabase Auth là authentication chính thức.
2. Backend không triển khai custom username/password/JWT auth.
3. PostgreSQL không lưu password/password_hash.
4. Permission-based authorization và ownership enforcement.
5. MedicineBatch là inventory source of truth.
6. Không có API direct edit quantity.
7. Stock Import confirm cập nhật batch.
8. Inventory Adjustment là workflow điều chỉnh tồn kho.
9. POS hỗ trợ khách lẻ.
10. Interaction rule ở cấp ActiveIngredient–ActiveIngredient.
11. InteractionAlert phải persist.
12. HIGH alert cần acknowledgement và consultation note.
13. Checkout là command chính thức để hoàn tất order/payment/invoice.
14. Checkout có transaction và idempotency.
15. Checkout áp dụng FEFO.
16. Không dùng `/orders/{id}/pay` làm command chính.
17. Không tạo public payment/invoice command để thay checkout.
18. AI Copilot có Guardrail và AI Audit.
19. Google AI Provider là provider ưu tiên; MockAI là fallback.
20. Graph-RAG là module riêng.
21. Graph Sync có outbox/worker/retry/audit/freshness.
22. Không có raw Cypher API cho Staff.
23. Reports MVP deterministic.
24. System Settings MVP gồm near-expiry threshold.
25. Demo reset chỉ local/internal.

Document 12 là đầu vào trực tiếp cho:

1. Backend controller/service implementation.
2. Frontend API client.
3. Postman collection.
4. API integration tests.
5. Document 13 — Database Design & ERD.
6. Document 14 — Prisma Schema & Migration Design.
7. Document 15 — UI/UX Screen Specification.
8. Document 20 — Testing, Demo & Setup Guide.

Bước tiếp theo hợp lý là viết **Document 13 — Database Design & ERD**, vì API contract đã xác định rõ resource, command, data ownership và traceability cần chuyển thành ERD/database design chính thức.
