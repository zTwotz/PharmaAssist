# Document 10 — System Architecture Document

# Tài liệu 10 — Tài liệu kiến trúc hệ thống

---

## Metadata

| Mục               | Nội dung                                                                                                                           |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Document ID       | DOC-10                                                                                                                             |
| File name         | `10_system_architecture_document.md`                                                                                               |
| Document Name     | System Architecture Document                                                                                                       |
| Tên tiếng Việt    | Tài liệu kiến trúc hệ thống                                                                                                        |
| Project           | PharmaAssist AI Intelligence                                                                                                       |
| Version           | 1.0 Draft                                                                                                                          |
| Status            | Draft                                                                                                                              |
| Created Date      | 08/06/2026                                                                                                                         |
| Last Updated      | 08/06/2026                                                                                                                         |
| Owner             | Software Architect / Project Leader                                                                                                |
| Reviewer          | Backend Developer, Frontend Developer, AI/Graph Developer, DevOps/Release Owner, Tester, Giảng viên hướng dẫn                      |
| Baseline Source   | Document 01, Document 06, Document 07, Document 08, Document 09                                                                    |
| Related Documents | Document 11, Document 12, Document 13, Document 14, Document 16, Document 17, Document 20                                          |
| Language Rule     | Nội dung chính viết bằng tiếng Việt; tên file/tên tài liệu có thể giữ tiếng Anh                                                    |
| Terminology Rule  | Giữ nguyên tên công nghệ, module, entity, API, table, enum, class/service/component và thuật ngữ kỹ thuật cần thiết bằng tiếng Anh |

---

## 1. Mục đích tài liệu

Tài liệu **System Architecture Document** mô tả kiến trúc tổng thể của hệ thống **PharmaAssist AI Intelligence**.

Mục đích chính của tài liệu:

1. Xác định mục tiêu kiến trúc.
2. Xác định nguyên tắc kiến trúc.
3. Mô tả system context.
4. Mô tả high-level architecture.
5. Mô tả frontend architecture dùng **Next.js**.
6. Mô tả backend architecture dùng **NestJS / Node.js**.
7. Mô tả authentication architecture dùng **Supabase Auth**.
8. Mô tả database architecture dùng **PostgreSQL** và **Prisma**.
9. Mô tả inventory architecture dựa trên **MedicineBatch**.
10. Mô tả checkout architecture có **transaction**, **idempotency**, **FEFO**, **payment** và **invoice**.
11. Mô tả interaction architecture dựa trên **ActiveIngredient** và **InteractionAlert**.
12. Mô tả AI architecture overview gồm **Google AI Provider**, **MockAI fallback**, **Guardrail** và **Audit**.
13. Mô tả graph architecture overview gồm **Neo4j projection**, **Graph Sync** và **Graph-RAG**.
14. Xác định integration boundaries.
15. Xác định deployment architecture.
16. Xác định environment configuration.
17. Tóm tắt security architecture.
18. Tóm tắt observability/audit.
19. Xác định failure/fallback strategy.
20. Phân định architecture boundaries theo MVP, Should-have, Future và Out of Scope.

Tài liệu này không thay thế:

1. Document 11 — Module Design Document.
2. Document 12 — API Specification.
3. Document 13 — Database Design & ERD.
4. Document 14 — Prisma Schema & Migration Design.
5. Document 16 — AI Architecture, Guardrail & Audit Design.
6. Document 17 — Knowledge Graph, Neo4j Sync & Graph-RAG Design.
7. Document 20 — Testing, Demo & Setup Guide.

Tài liệu này mô tả kiến trúc ở mức **trung bình đến cao**, đủ để nhóm phát triển hiểu cách hệ thống được tổ chức nhưng không đi vào schema/code quá sâu.

---

## 2. Architecture Goals

Kiến trúc hệ thống phải đạt các mục tiêu sau.

### 2.1. Mục tiêu nghiệp vụ

1. Hỗ trợ quản lý nhà thuốc ở mức MVP.
2. Hỗ trợ quản lý thuốc, hoạt chất, supplier, batch inventory, stock import và inventory adjustment.
3. Hỗ trợ POS bán thuốc tại quầy.
4. Hỗ trợ khách lẻ/walk-in customer.
5. Hỗ trợ kiểm tra tương tác thuốc dựa trên ActiveIngredient.
6. Persist InteractionAlert để truy vết.
7. Bắt buộc xử lý HIGH alert trước checkout.
8. Hỗ trợ checkout nhất quán, an toàn và có thể rollback.
9. Hỗ trợ payment simulation và invoice.
10. Hỗ trợ reports cơ bản: revenue, top medicines, inventory.
11. Hỗ trợ demo data có thể reset và tái tạo.

### 2.2. Mục tiêu kỹ thuật

1. Dùng **Next.js** cho frontend.
2. Dùng **NestJS / Node.js** cho backend.
3. Dùng **Prisma** làm ORM.
4. Dùng **Supabase Auth** cho authentication.
5. Dùng **PostgreSQL** làm source of truth.
6. Dùng **Neo4j** làm graph projection.
7. Dùng **Google AI Provider** làm provider ưu tiên.
8. Dùng **MockAI** làm fallback.
9. Thiết kế backend theo modular monolith.
10. Tách rõ modules nghiệp vụ.
11. Tách rõ AI, Graph Sync và Graph-RAG khỏi nghiệp vụ CRUD thông thường.
12. Đảm bảo business rules nằm ở backend service layer.
13. Đảm bảo authorization được enforce ở backend.
14. Đảm bảo Graph Sync có outbox/worker/retry/audit/freshness detection.
15. Đảm bảo AI có guardrail và audit.

### 2.3. Mục tiêu an toàn dữ liệu

1. Không lưu password/password_hash trong PostgreSQL nghiệp vụ.
2. Không dùng custom username/password/JWT auth.
3. Không dùng aggregate inventory làm source of truth.
4. Không bán batch hết hạn.
5. Không cho checkout nếu HIGH alert chưa acknowledgement hoặc chưa có consultation note.
6. Không cho AI chẩn đoán, kê đơn hoặc đưa liều dùng cụ thể.
7. Không lưu raw PII trong AI Audit.
8. Không dùng graph stale mà không fallback/warning.
9. Không chạy demo reset ở môi trường không phải local.

### 2.4. Mục tiêu demo

1. Demo được login theo role.
2. Demo được Admin/Staff/Warehouse flow.
3. Demo được batch inventory.
4. Demo được FEFO.
5. Demo được HIGH interaction alert blocking.
6. Demo được AI explanation/draft và guardrail refusal.
7. Demo được checkout transaction.
8. Demo được reports.
9. Demo được Neo4j graph projection.
10. Demo được Graph-RAG fallback.
11. Demo được local demo reset.

---

## 3. Architecture Principles

### 3.1. PostgreSQL là source of truth

PostgreSQL là nguồn dữ liệu chính thức cho toàn bộ nghiệp vụ.

Áp dụng cho:

1. User profile.
2. Roles/permissions.
3. Medicine.
4. ActiveIngredient.
5. Supplier.
6. MedicineBatch.
7. Stock Import.
8. Inventory Adjustment.
9. Order.
10. Payment.
11. Invoice.
12. DrugInteraction Rule.
13. InteractionAlert.
14. AI Audit.
15. Graph Sync Outbox.
16. System Settings.
17. Demo seed state.

Neo4j chỉ là projection. Neo4j không được dùng làm nguồn dữ liệu chính thức để quyết định nghiệp vụ quan trọng như checkout, stock, payment hoặc alert blocking.

### 3.2. Backend owns business rules

Business rules phải nằm ở backend service layer.

Frontend có thể validate để cải thiện UX, nhưng backend phải validate lại:

1. Permission.
2. Ownership.
3. Entity status.
4. Stock availability.
5. FEFO allocation.
6. HIGH alert resolution.
7. Payment validity.
8. Invoice generation rule.
9. AI guardrail.
10. Graph freshness.
11. Demo reset environment guard.

### 3.3. Authentication tách khỏi authorization

Authentication dùng Supabase Auth.

Authorization dùng:

1. User profile trong PostgreSQL.
2. Roles.
3. Permissions.
4. User-role mapping.
5. Role-permission mapping.
6. Ownership rules.
7. Backend guards/services.

Supabase Auth xác định user là ai. Backend xác định user được làm gì và trên dữ liệu nào.

### 3.4. MedicineBatch là inventory source of truth

Inventory không được dựa trên aggregate inventory table làm source of truth.

Tồn kho được xác định từ:

1. MedicineBatch.
2. Stock Import confirmed.
3. Inventory Adjustment confirmed.
4. Order item batch allocations.
5. Checkout FEFO deduction.

Inventory Summary chỉ là calculated view/query/result, không phải nguồn dữ liệu chính.

### 3.5. Checkout là transaction boundary chính

Checkout là nghiệp vụ chính thức để hoàn tất order.

Checkout phải xử lý nhất quán:

1. Validate order.
2. Validate ownership.
3. Validate stock.
4. Validate HIGH alerts.
5. Apply FEFO.
6. Create batch allocations.
7. Deduct stock.
8. Create payment attempt.
9. Mark order PAID nếu payment success.
10. Create invoice.
11. Write audit.
12. Commit hoặc rollback.

Không dùng public command tách rời như `/orders/{id}/pay` làm command chính để hoàn tất order.

### 3.6. Interaction rule ở cấp ActiveIngredient

DrugInteraction Rule chính thức ở cấp:

```text
ActiveIngredient — ActiveIngredient
```

Không dùng Medicine–Medicine interaction rule làm official rule.

Medicine interaction được suy ra từ:

```text
Medicine -> ActiveIngredient -> DrugInteractionRule -> ActiveIngredient -> Medicine
```

### 3.7. InteractionAlert phải persist

Mọi InteractionAlert đã hiển thị trong order phải được lưu.

Đặc biệt:

1. HIGH alert cần acknowledgement.
2. HIGH alert cần consultation note.
3. LOW/MEDIUM không bắt buộc acknowledgement/note.
4. Alert không còn áp dụng chuyển inactive, không bị xóa tùy tiện.
5. Checkout phải kiểm tra active HIGH alerts trước khi hoàn tất.

### 3.8. AI safe by design

AI không được là nguồn quyết định nghiệp vụ chính thức.

AI chỉ hỗ trợ:

1. Giải thích interaction alert.
2. Tạo consultation note draft.
3. Gợi ý câu hỏi follow-up an toàn nếu thuộc scope.

AI bắt buộc có:

1. Input guardrail.
2. Output guardrail.
3. PII minimization/redaction.
4. Prompt versioning.
5. AI Audit.
6. Provider fallback.
7. Safe refusal.

### 3.9. Graph projection, not graph authority

Neo4j chỉ dùng để:

1. Biểu diễn quan hệ Medicine–ActiveIngredient.
2. Biểu diễn ActiveIngredient-level interactions.
3. Hỗ trợ Graph Explorer.
4. Hỗ trợ Graph-RAG.

Neo4j không quyết định checkout, stock, payment hoặc alert blocking.

Nếu Neo4j stale/unavailable:

1. Interaction explanation fallback sang PostgreSQL authoritative context.
2. Pure graph query không có fallback trả safe error.
3. Không dùng graph stale mà không warning.

### 3.10. MVP boundaries rõ ràng

Kiến trúc MVP không được bị kéo lệch bởi Future/Commercial features.

MVP tập trung vào:

1. Internal pharmacy system.
2. POS.
3. Batch inventory.
4. Interaction safety.
5. AI safe assistance.
6. Graph projection.
7. Reports.
8. Demo reset.

Không đưa online commerce, cart, shipping, coupon, refund, multi-store, full customer portal hoặc full 100-table schema vào MVP.

---

## 4. System Context

### 4.1. System context summary

PharmaAssist AI Intelligence là hệ thống web nội bộ cho nhà thuốc, gồm frontend Next.js, backend NestJS, PostgreSQL source of truth, Supabase Auth, Neo4j projection, Google AI Provider, MockAI fallback và Graph Sync Worker.

### 4.2. External actors/systems

| Actor/System        | Vai trò                                                      |
| ------------------- | ------------------------------------------------------------ |
| Admin               | Quản trị hệ thống, users, medicine, rules, reports, settings |
| Staff               | Bán thuốc tại POS, xử lý alerts, checkout                    |
| Warehouse           | Quản lý supplier, stock import, inventory, adjustment        |
| Customer / Khách lẻ | Người mua tại quầy, nhận invoice, không đăng nhập MVP        |
| Supabase Auth       | Authentication provider                                      |
| PostgreSQL          | Source of truth database                                     |
| Neo4j               | Graph projection                                             |
| Google AI Provider  | Preferred AI model provider                                  |
| MockAI              | Fallback AI provider                                         |
| GitHub              | Code, PR, CI                                                 |
| Jira                | Project management source of truth                           |
| Local environment   | Demo reset and development tooling                           |

### 4.3. System context boundaries

Bên trong hệ thống:

1. Next.js frontend.
2. NestJS backend.
3. Prisma data access.
4. Business modules.
5. AI orchestration.
6. Guardrail.
7. AI Audit.
8. Graph Sync Worker.
9. Graph-RAG.
10. Demo reset tooling.

Bên ngoài hệ thống:

1. Supabase Auth.
2. Supabase PostgreSQL/PostgreSQL hosting.
3. Google AI Provider.
4. Neo4j AuraDB/Neo4j service.
5. GitHub.
6. Jira.

### 4.4. Context diagram dạng text

```text
[Admin / Staff / Warehouse]
          |
          v
   [Next.js Frontend]
          |
          v
   [NestJS Backend API]
     |      |       |
     |      |       +--> [Google AI Provider]
     |      |       +--> [MockAI Fallback]
     |      |
     |      +--> [Neo4j Projection]
     |
     +--> [PostgreSQL Source of Truth]
     |
     +--> [Supabase Auth]

[Graph Sync Worker]
     |
     +--> reads outbox from PostgreSQL
     +--> updates Neo4j projection

[Demo Reset Tooling - Local Only]
     |
     +--> resets PostgreSQL demo data
     +--> verifies/provisions Supabase demo users
     +--> rebuilds Neo4j projection
     +--> runs smoke checks
```

---

## 5. High-level Architecture Diagram

### 5.1. Logical architecture

```text
┌──────────────────────────────────────────────────────────────────────┐
│                           User Browser                               │
│             Admin / Staff / Warehouse — Chrome Desktop                │
└───────────────────────────────┬──────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│                         Next.js Frontend                              │
│  Route Groups | Role-based UI | API Client | POS | Admin | Warehouse  │
└───────────────────────────────┬──────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│                         NestJS Backend API                            │
│                                                                      │
│  Controllers                                                         │
│  Guards: AuthGuard | UserProfileGuard | PermissionGuard | Ownership   │
│  Services: Medicine | Inventory | POS | Checkout | AI | Graph-RAG     │
│  Workers: Graph Sync Worker                                          │
│                                                                      │
└───────────────┬───────────────┬────────────────┬────────────────────┘
                │               │                │
                ▼               ▼                ▼
┌──────────────────────┐ ┌────────────────┐ ┌─────────────────────────┐
│ PostgreSQL            │ │ Supabase Auth  │ │ Google AI Provider       │
│ Source of Truth        │ │ Authentication │ │ Preferred AI Provider    │
└───────────┬──────────┘ └────────────────┘ └───────────┬─────────────┘
            │                                             │
            │                                             ▼
            │                                  ┌──────────────────────┐
            │                                  │ MockAI Fallback       │
            │                                  └──────────────────────┘
            ▼
┌──────────────────────┐
│ Graph Sync Outbox     │
└───────────┬──────────┘
            │
            ▼
┌──────────────────────┐
│ Graph Sync Worker     │
└───────────┬──────────┘
            │
            ▼
┌──────────────────────┐
│ Neo4j Projection      │
│ Medicine/Ingredient   │
│ Interaction Graph     │
└──────────────────────┘
```

### 5.2. Layered architecture

| Layer                      | Responsibility                                                                    |
| -------------------------- | --------------------------------------------------------------------------------- |
| Presentation Layer         | Next.js pages/routes/components, role-based UI, POS/Admin/Warehouse screens       |
| API Layer                  | NestJS controllers, request validation, auth/permission guards                    |
| Application Service Layer  | Use-case services such as CheckoutService, StockImportService, AIOrchestrator     |
| Domain Logic Layer         | Business rules, FEFO, interaction checking, alert lifecycle, ownership validation |
| Data Access Layer          | Prisma ORM, repositories/query services if used                                   |
| Source of Truth Data Layer | PostgreSQL                                                                        |
| Graph Projection Layer     | Graph Sync Outbox, Worker, Neo4j                                                  |
| External Service Layer     | Supabase Auth, Google AI Provider, MockAI                                         |
| Audit/Observability Layer  | Audit logs, AI audit, graph sync attempts, error logs                             |
| Tooling Layer              | Demo reset, seed, smoke checks, CI scripts                                        |

### 5.3. Architecture style

Recommended architecture style:

1. **Modular Monolith** cho backend.
2. **Feature/module-based frontend organization** cho Next.js.
3. **PostgreSQL source-of-truth** data architecture.
4. **Outbox-based projection** cho Neo4j.
5. **Provider abstraction** cho AI.
6. **Service-layer transaction boundary** cho checkout.
7. **Backend-enforced RBAC/ownership**.

Không chọn microservices cho MVP vì:

1. Team nhỏ.
2. Timeline ngắn.
3. Complexity không cần thiết.
4. Modular monolith đủ để thể hiện module boundaries.
5. Dễ demo, test và deploy hơn.

---

## 6. Frontend Architecture

### 6.1. Technology

Frontend chính thức dùng:

```text
Next.js
```

Vai trò frontend:

1. Hiển thị giao diện theo role.
2. Cung cấp POS flow.
3. Cung cấp Admin screens.
4. Cung cấp Warehouse screens.
5. Gọi backend API qua API client.
6. Hiển thị validation/error states.
7. Hiển thị AI/Graph outputs an toàn.
8. Không chứa business rules quyết định cuối cùng.
9. Không thay thế backend authorization.

### 6.2. Frontend responsibilities

Frontend chịu trách nhiệm:

1. Routing.
2. Layout.
3. Sidebar/menu theo role.
4. Form validation cơ bản.
5. Table/list/detail pages.
6. POS cart/draft order UI.
7. Checkout UI.
8. Interaction alert UI.
9. AI Copilot panel.
10. Graph-RAG UI.
11. Reports UI.
12. System Settings UI.
13. Handling access denied.
14. Handling loading/error/empty states.
15. Calling backend API consistently.

Frontend không chịu trách nhiệm cuối cùng cho:

1. Authentication validity.
2. Permission enforcement.
3. Ownership enforcement.
4. Stock deduction.
5. FEFO allocation.
6. Payment success authority.
7. Invoice creation authority.
8. Interaction rule authority.
9. HIGH alert blocking authority.
10. AI safety enforcement.
11. Graph freshness authority.

### 6.3. Route groups

Recommended route grouping:

```text
/app
  /(auth)
    /login
    /first-login-change-password

  /(app)
    /dashboard

    /admin
      /users
      /roles-permissions
      /medicines
      /active-ingredients
      /suppliers
      /interaction-rules
      /interaction-alert-history
      /ai-audit
      /settings

    /warehouse
      /suppliers
      /inventory
      /inventory/[medicineId]/batches
      /stock-imports
      /stock-imports/[id]
      /inventory-adjustments
      /inventory-adjustments/[id]
      /reports/inventory

    /sales
      /pos
      /orders
      /orders/[id]
      /orders/[id]/checkout
      /invoices/[id]

    /reports
      /revenue
      /top-medicines
      /inventory

    /ai
      /copilot

    /graph
      /explorer
      /rag
```

Route groups có thể điều chỉnh ở UI/UX document, nhưng phải giữ nguyên authorization boundary.

### 6.4. Role-based UI

Frontend phải render UI theo effective permissions.

Ví dụ:

| Role      | UI chính                                                                                                                               |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Admin     | Admin dashboard, user management, medicine, active ingredient, supplier, interaction rules, reports, AI Audit, settings, POS if needed |
| Staff     | POS, own orders, checkout, own invoices, AI Copilot, interaction alerts, graph read-only nếu có                                        |
| Warehouse | Supplier, stock import, inventory, batch detail, inventory adjustment, inventory report                                                |

Quy tắc:

1. Staff không thấy Supplier Management.
2. Staff không thấy Stock Import.
3. Staff không thấy Inventory Adjustment.
4. Staff không thấy global low-stock/near-expiry dashboard.
5. Warehouse không thấy POS.
6. Warehouse không thấy Checkout.
7. Warehouse không thấy Payment/Invoice.
8. Warehouse không thấy InteractionAlert.
9. Warehouse không thấy Graph Explorer/Graph-RAG trong MVP.
10. Admin thấy hầu hết module MVP.

### 6.5. API client architecture

Frontend nên dùng API client thống nhất.

API client chịu trách nhiệm:

1. Gắn access token vào request.
2. Xử lý 401 unauthenticated.
3. Xử lý 403 forbidden.
4. Xử lý ownership denied.
5. Xử lý validation errors.
6. Xử lý server errors.
7. Xử lý idempotency key cho checkout.
8. Chuẩn hóa error display.
9. Tách endpoint calls khỏi UI components.

Suggested structure:

```text
src/
  lib/
    api/
      client.ts
      auth.api.ts
      medicine.api.ts
      inventory.api.ts
      order.api.ts
      checkout.api.ts
      ai.api.ts
      graph.api.ts
      reports.api.ts
```

### 6.6. Frontend state management

Frontend state nên phân loại:

1. Auth/session state.
2. User context/permission state.
3. Form state.
4. POS draft order state.
5. Server data cache.
6. UI state.
7. AI output state.
8. Error state.

POS draft order state phải đồng bộ với backend. Frontend không được tự xem local cart là source of truth cuối cùng.

### 6.7. Frontend handling for checkout

Checkout UI phải:

1. Dùng dedicated route hoặc full-height dedicated panel.
2. Không dùng small modal cho checkout chính.
3. Hiển thị order summary.
4. Hiển thị HIGH alert status.
5. Hiển thị stock validation result nếu lỗi.
6. Thu thập payment method.
7. Gửi idempotency key.
8. Giữ Draft Order nếu validation fail.
9. Hiển thị invoice sau checkout success.

### 6.8. Frontend handling for AI/Graph

AI UI phải:

1. Hiển thị disclaimer.
2. Không tự động lưu AI draft thành consultation note.
3. Yêu cầu user xác nhận note.
4. Hiển thị safe refusal.
5. Hiển thị fallback/degraded indicator nếu provider fallback hoặc graph fallback.
6. Không hiển thị raw unsafe output.

Graph-RAG UI phải:

1. Chỉ read-only.
2. Không cho Staff submit raw Cypher.
3. Không hiển thị graph stale như dữ liệu chắc chắn.
4. Hiển thị `graphUsed=false` hoặc degraded indicator nếu fallback.

---

## 7. Backend Architecture

### 7.1. Technology

Backend chính thức dùng:

```text
NestJS / Node.js
```

Backend chịu trách nhiệm chính cho:

1. API endpoints.
2. Authentication token verification.
3. User profile loading.
4. RBAC/permission checking.
5. Ownership checking.
6. Business rules.
7. Transactions.
8. FEFO allocation.
9. Interaction checking.
10. InteractionAlert lifecycle.
11. AI orchestration.
12. AI Guardrail.
13. AI Audit.
14. Graph Sync.
15. Graph-RAG.
16. Reports.
17. Demo reset tooling if implemented in backend/tool scripts.
18. Audit logging.

### 7.2. Backend module structure

Recommended NestJS modules:

```text
src/
  modules/
    auth/
    users/
    roles-permissions/
    medicines/
    active-ingredients/
    suppliers/
    inventory/
    stock-imports/
    inventory-adjustments/
    orders/
    checkout/
    payments/
    invoices/
    interactions/
    interaction-alerts/
    ai/
    ai-audit/
    graph-sync/
    graph-rag/
    reports/
    settings/
    audit/
    demo-reset/
```

### 7.3. Controllers

Controllers chịu trách nhiệm:

1. Nhận request.
2. Áp dụng guards.
3. Validate DTO ở mức request shape.
4. Gọi application services.
5. Trả response.
6. Không chứa business logic phức tạp.

Controllers không nên:

1. Tự viết FEFO logic.
2. Tự trừ stock.
3. Tự tạo invoice.
4. Tự gọi AI provider trực tiếp.
5. Tự query Neo4j trực tiếp.
6. Tự enforce business rules sâu.

### 7.4. Services

Services chịu trách nhiệm business logic.

Ví dụ:

| Service                    | Responsibility                                 |
| -------------------------- | ---------------------------------------------- |
| AuthService                | Verify token integration, user context support |
| AuthorizationService       | Resolve roles/permissions, ownership checks    |
| MedicineService            | Medicine CRUD, active/inactive validation      |
| ActiveIngredientService    | Ingredient CRUD, medicine-ingredient mapping   |
| SupplierService            | Supplier management, deactivate rule           |
| InventoryService           | MedicineBatch, sellable stock, FEFO allocation |
| StockImportService         | Stock import lifecycle and confirm transaction |
| InventoryAdjustmentService | Adjustment lifecycle and confirm transaction   |
| OrderService               | Draft order lifecycle                          |
| InteractionService         | ActiveIngredient-level rule checking           |
| InteractionAlertService    | Alert persistence, HIGH validation             |
| CheckoutService            | Transactional checkout boundary                |
| PaymentService             | Payment simulation                             |
| InvoiceService             | Invoice creation/view                          |
| AIOrchestrator             | AI request orchestration                       |
| GuardrailService           | AI input/output safety                         |
| AIAuditService             | AI audit logging                               |
| GraphSyncService           | Outbox creation and sync metadata              |
| GraphSyncWorker            | Process outbox to Neo4j                        |
| GraphRagService            | Graph-RAG query/fallback                       |
| ReportService              | Deterministic reports                          |
| SettingsService            | System settings                                |
| AuditLogService            | System audit records                           |
| DemoResetService           | Local reset workflow                           |

### 7.5. Guards

Backend guards should include:

1. `SupabaseAuthGuard`.
2. `UserProfileGuard`.
3. `MustChangePasswordGuard`.
4. `PermissionGuard`.
5. `OwnershipGuard`.

Recommended order:

```text
SupabaseAuthGuard
→ UserProfileGuard
→ MustChangePasswordGuard
→ PermissionGuard
→ OwnershipGuard
→ Service-level business validation
```

### 7.6. Workers

Workers are used for background or asynchronous tasks.

MVP worker:

1. Graph Sync Worker.

Possible optional workers:

1. Demo smoke check runner.
2. Retry worker for AI/Graph if needed.
3. Report precompute worker — not required MVP.

Graph Sync Worker must:

1. Read pending outbox events.
2. Load authoritative source data from PostgreSQL.
3. Upsert projection into Neo4j.
4. Handle deactivation.
5. Retry failures.
6. Record attempts.
7. Update freshness metadata.

### 7.7. Backend transaction boundaries

Important transaction boundaries:

| Transaction                  |              Required? | Notes                                                       |
| ---------------------------- | ---------------------: | ----------------------------------------------------------- |
| Stock Import Confirm         |                    Yes | Create/update MedicineBatch and confirm import atomically   |
| Inventory Adjustment Confirm |                    Yes | Update MedicineBatch and confirm adjustment atomically      |
| Checkout                     |                    Yes | Order/payment/invoice/allocation/batch deduction atomically |
| Role assignment              |            Recommended | Update user-role mapping consistently                       |
| Interaction alert update     |            Recommended | Persist alert state consistently                            |
| Demo reset                   | Yes/controlled batches | Local only, may use multiple controlled transactions        |

### 7.8. Backend rules not to bypass

Backend must never bypass:

1. Supabase token verification.
2. User active check.
3. Permission check.
4. Ownership check.
5. Medicine active check for new sale.
6. MedicineBatch stock validation.
7. Expired batch exclusion.
8. FEFO allocation.
9. HIGH alert acknowledgement/note.
10. Payment one-success rule.
11. Invoice one-per-paid-order rule.
12. AI guardrail.
13. Graph freshness check.
14. Demo reset environment guard.

---

## 8. Authentication Architecture

### 8.1. Authentication provider

Official provider:

```text
Supabase Auth
```

Supabase Auth handles:

1. Email/password login.
2. Password storage.
3. Password update.
4. Session management.
5. Access tokens.
6. User ID.
7. Admin user creation if used.

### 8.2. User profile mapping

Backend maps Supabase user to internal user profile.

Flow:

```text
Supabase access token
→ Backend verifies token
→ Extract Supabase user ID
→ Find user_profiles.supabase_user_id
→ Check is_active
→ Check must_change_password
→ Load roles and permissions
→ Build user context
```

### 8.3. Authorization guard

Authorization guard must check:

1. Token valid.
2. User profile exists.
3. User active.
4. User completed required password change.
5. Permission exists.
6. Ownership scope if applicable.
7. Entity state if applicable.

### 8.4. Password handling

Rules:

1. PostgreSQL does not store password.
2. PostgreSQL does not store password_hash.
3. Password creation/update handled by Supabase Auth.
4. Temporary password flow must use Supabase Admin integration or equivalent.
5. Application-level `must_change_password` only indicates required flow, not actual credential storage.

### 8.5. Multi-role RBAC

Backend computes effective permissions from:

1. User roles.
2. Active roles.
3. Role-permission mappings.
4. Active permissions.

Effective permission is union of all role permissions.

### 8.6. Ownership

Ownership enforcement applies especially to Staff:

1. Staff order access.
2. Staff checkout.
3. Staff payment/invoice view.
4. Staff InteractionAlert handling.
5. Staff AI Copilot context.

Admin can use all-scope permission. Warehouse has no sales ownership scope in MVP.

---

## 9. Database Architecture

### 9.1. Primary database

Primary database:

```text
PostgreSQL
```

Access layer:

```text
Prisma ORM
```

### 9.2. PostgreSQL responsibilities

PostgreSQL stores:

1. Identity profiles and RBAC data.
2. Medicine.
3. ActiveIngredient.
4. Medicine–ActiveIngredient mapping.
5. Supplier.
6. MedicineBatch.
7. StockImport and details.
8. InventoryAdjustment and details.
9. Orders.
10. OrderItems.
11. OrderItemBatchAllocations.
12. Payments.
13. Invoices.
14. DrugInteractionRules.
15. InteractionAlerts.
16. PromptTemplates.
17. AIAuditLogs.
18. GraphSyncOutbox.
19. GraphSyncAttempts/logs.
20. SystemSettings.
21. AuditLogs.
22. Demo seed data.

### 9.3. Prisma responsibilities

Prisma handles:

1. Type-safe database access.
2. Schema definition.
3. Migrations.
4. Transaction handling.
5. Relations.
6. Query composition.
7. Integration with NestJS services.

Prisma schema details are defined in Document 14, not here.

### 9.4. Source of truth boundaries

| Data               | Source of Truth                                             |
| ------------------ | ----------------------------------------------------------- |
| Users/profile/RBAC | PostgreSQL + Supabase Auth for credentials                  |
| Medicine           | PostgreSQL                                                  |
| ActiveIngredient   | PostgreSQL                                                  |
| Inventory quantity | MedicineBatch in PostgreSQL                                 |
| Interaction rule   | PostgreSQL                                                  |
| InteractionAlert   | PostgreSQL                                                  |
| Checkout result    | PostgreSQL                                                  |
| Payment simulation | PostgreSQL                                                  |
| Invoice            | PostgreSQL                                                  |
| AI audit           | PostgreSQL                                                  |
| Graph projection   | Derived from PostgreSQL                                     |
| Reports            | Computed from PostgreSQL                                    |
| Demo state         | PostgreSQL seed + Supabase users + Neo4j projection rebuild |

### 9.5. Extended 100-table database boundary

The 100-table database design is an extended/commercial-scale reference, not mandatory MVP schema.

MVP should implement core subset only.

Future-ready tables may remain in ERD documentation for expansion, but:

1. They must not become MVP blockers.
2. They must not define required API/UI/test scope for MVP.
3. They must not replace MedicineBatch.
4. They must not force online commerce into MVP.
5. They must not move sales core from medicine_id to product_variant_id in MVP.

---

## 10. Inventory Architecture

### 10.1. Inventory source of truth

Inventory source of truth:

```text
MedicineBatch
```

MedicineBatch represents one batch/lot of a Medicine.

Core concepts:

1. Medicine.
2. Batch number.
3. Normalized batch number.
4. Expiry date.
5. Quantity received.
6. Quantity remaining.
7. Import source.
8. Status/active if needed.

### 10.2. Inventory-changing workflows

Only official workflows can change stock:

1. Confirm Stock Import.
2. Confirm Inventory Adjustment.
3. Checkout with FEFO.

Direct quantity edit is out of scope.

### 10.3. Stock Import architecture

Stock Import flow:

```text
Create Draft
→ Add details
→ Validate batch/expiry/quantity
→ Confirm
→ Create/update MedicineBatch
→ Audit
```

Batch merge rule:

1. Same medicine.
2. Same normalized batch number.
3. Same expiry date.

If same medicine + same normalized batch number but expiry date differs:

```text
Reject
```

### 10.4. Inventory Adjustment architecture

Inventory Adjustment flow:

```text
Create adjustment
→ Choose MedicineBatch
→ Enter quantity change
→ Enter reason
→ Validate non-negative result
→ Confirm
→ Update MedicineBatch
→ Audit
```

Adjustment must not make quantity remaining negative.

### 10.5. Sellable stock

Sellable stock excludes:

1. Expired batches.
2. Inactive/unavailable batches if such status exists.
3. Quantity already deducted.
4. Quantity not remaining.

Sellable quantity is used for:

1. POS availability.
2. Checkout stock validation.
3. Low-stock calculation.
4. Inventory report.

### 10.6. Near-expiry

Near-expiry is calculated using:

1. System setting.
2. Default threshold: 90 days.
3. Optional report/filter override `withinDays`, which does not change system setting.

### 10.7. FEFO architecture

FEFO means:

```text
First Expired, First Out
```

Checkout allocation order:

1. Only sellable batches.
2. Sort by earliest expiry date.
3. Deduct from nearest expiry first.
4. Continue to next batch if quantity needed remains.
5. Create allocation records for traceability.

FEFO is executed inside checkout transaction.

---

## 11. Checkout Architecture

### 11.1. Checkout as application service

Checkout is handled by:

```text
CheckoutService
```

CheckoutService coordinates:

1. OrderService.
2. InteractionAlertService.
3. InventoryService.
4. PaymentService.
5. InvoiceService.
6. AuditLogService.
7. Prisma transaction.

### 11.2. Checkout transaction

Checkout must be atomic.

Inside transaction:

1. Validate order.
2. Validate stock.
3. Allocate batches.
4. Deduct stock.
5. Create payment attempt.
6. Mark order PAID if payment success.
7. Create invoice.
8. Create audit.
9. Create idempotency record/update result.
10. Commit.

If any critical step fails:

```text
Rollback
```

### 11.3. Checkout validations

Before success, checkout must validate:

1. User authenticated.
2. User has permission.
3. Staff owns order if applicable.
4. Order exists.
5. Order status is DRAFT.
6. Order has items.
7. Items are valid.
8. Total is recalculated by backend.
9. Medicine is valid/active according to rule.
10. Stock is sufficient.
11. Active HIGH alerts acknowledged.
12. Active HIGH alerts have consultation notes.
13. Payment data valid.
14. Idempotency key valid.

### 11.4. Idempotency

Checkout must support idempotency to prevent:

1. Double stock deduction.
2. Duplicate successful payment.
3. Duplicate invoice.
4. Double order state update.

Recommended logic:

```text
Client sends idempotency key
→ Backend checks existing idempotency record
→ If same key + same payload already completed: return previous result
→ If same key + different payload: reject
→ If new key: process checkout
→ Store result/status
```

### 11.5. Payment architecture

Payment in MVP is simulation.

Supported concepts:

1. SUCCESS.
2. FAILED.
3. Cash payment.
4. Simulated bank transfer.
5. amount_tendered.
6. change_amount.
7. transaction_reference for simulated bank transfer.
8. One successful payment per order.
9. Failed attempts may be retained.

Real bank integration is Future.

### 11.6. Invoice architecture

Invoice is created only after successful payment.

Invoice must:

1. Link to PAID Order.
2. Be unique per PAID Order.
3. Store snapshot data needed for display.
4. Be viewable by Admin or Staff owner.
5. Not be created manually outside checkout as official completion flow.

Invoice reversal/credit note is Future.

### 11.7. Checkout failure behavior

| Failure                            | Result                     |
| ---------------------------------- | -------------------------- |
| Order not DRAFT                    | Reject                     |
| Order empty                        | Reject                     |
| Stock insufficient                 | Reject, keep Draft         |
| HIGH alert missing acknowledgement | Reject, keep Draft         |
| HIGH alert missing note            | Reject, keep Draft         |
| Payment failed                     | Order not PAID, no invoice |
| Transaction error                  | Rollback                   |
| Idempotency payload mismatch       | Reject                     |
| Duplicate checkout retry same key  | Return previous result     |

---

## 12. Interaction Architecture

### 12.1. Interaction rule model

Official interaction rule:

```text
ActiveIngredient A interacts with ActiveIngredient B
```

Rule contains:

1. ingredientA.
2. ingredientB.
3. severity.
4. description.
5. recommendation.
6. active/inactive status.
7. source/version metadata if needed.

Severity MVP:

1. LOW.
2. MEDIUM.
3. HIGH.

CRITICAL is Future.

### 12.2. Interaction checking flow

Flow:

```text
Order items changed
→ Load Medicines
→ Load ActiveIngredients for each Medicine
→ Build ActiveIngredient pairs
→ Match active DrugInteractionRules
→ Create/update InteractionAlerts
→ Inactivate no-longer-applicable alerts
→ Return alerts to POS
```

### 12.3. InteractionAlert architecture

InteractionAlert is persisted record of displayed alert.

It should store:

1. Order reference.
2. DrugInteractionRule reference.
3. Severity snapshot.
4. Description snapshot.
5. Recommendation snapshot.
6. Display metadata.
7. Active/inactive status.
8. Acknowledgement fields for HIGH.
9. Consultation note fields for HIGH.
10. Actor/time metadata.

### 12.4. HIGH alert enforcement

Checkout calls InteractionAlertService to validate:

1. No active HIGH alert unresolved.
2. Every active HIGH alert has acknowledgement.
3. Every active HIGH alert has consultation note.

If not:

```text
Checkout rejected
```

### 12.5. Standalone interaction check

Standalone interaction check can exist as Admin/demo utility, but:

1. It is not the official POS interaction history.
2. It does not create order alert history.
3. It does not replace order-based interaction check.
4. It should not affect checkout.

---

## 13. AI Architecture Overview

Detailed AI specification belongs to Document 16. This section defines architecture overview only.

### 13.1. AI components

AI architecture includes:

1. AI Copilot UI.
2. AI Controller/API.
3. AIOrchestrator.
4. Prompt Builder.
5. Context Builder.
6. GuardrailService.
7. GoogleAIAdapter.
8. MockAIAdapter.
9. AIAuditService.
10. PromptTemplate storage.
11. Provider configuration.

### 13.2. Provider strategy

Provider priority:

```text
Google AI Provider → MockAI fallback
```

Google AI Provider is preferred.

MockAI is fallback for:

1. Provider unavailable.
2. Timeout.
3. Quota issue.
4. Configuration missing.
5. Demo stability.

MockAI-only is not accepted as final MVP AI architecture unless real provider cannot be used during a specific demo run and fallback is transparently logged.

### 13.3. AI request flow

```text
User requests AI explanation/draft
→ Backend checks permission/ownership
→ Context Builder builds minimized context
→ Input Guardrail checks request
→ Prompt Builder selects prompt template/version
→ AIOrchestrator calls Google AI Provider
→ On failure, fallback to MockAI
→ Output Guardrail validates response
→ AI Audit records metadata
→ Frontend displays safe response
```

### 13.4. AI use cases

MVP AI supports:

1. InteractionAlert explanation.
2. Consultation note draft.
3. Safe follow-up questions from short Staff-entered context if implemented.

Should-have:

1. AI-generated business report narrative.

Out of Scope:

1. Diagnosis.
2. Prescribing.
3. Dosage advice.
4. Replacing healthcare professionals.
5. Storing raw PII in AI Audit.
6. AI Cache.

### 13.5. AI Audit overview

AI Audit must record:

1. User.
2. Action type.
3. Related order/alert if any.
4. Provider requested.
5. Provider used.
6. Fallback used.
7. Fallback reason.
8. Prompt version.
9. Input guardrail status.
10. Output guardrail status.
11. Schema validation status if applicable.
12. Latency if available.
13. Error status/code.
14. Minimized input/output summary.

AI Audit must not store raw PII.

---

## 14. Graph Architecture Overview

Detailed graph design belongs to Document 17. This section defines architecture overview only.

### 14.1. Graph components

Graph architecture includes:

1. PostgreSQL source data.
2. Graph Sync Outbox.
3. Graph Sync Worker.
4. Graph Sync attempts/logs.
5. Neo4j projection.
6. Graph freshness detection.
7. Graph-RAG Service.
8. PostgreSQL fallback for interaction explanation.
9. Graph Explorer read-only UI if implemented.

### 14.2. Core graph MVP

Core graph includes:

1. Medicine nodes.
2. ActiveIngredient nodes.
3. CONTAINS relationships.
4. INTERACTS_WITH relationships between ActiveIngredient nodes.

No authoritative Medicine–Medicine interaction edges in MVP.

No DrugGroup in core MVP unless authoritative taxonomy is later approved.

No Symptom/Condition/RedFlag/Recommendation enrichment in core MVP.

### 14.3. Graph Sync architecture

Graph Sync flow:

```text
Domain data changes in PostgreSQL
→ Domain service writes Graph Sync Outbox event
→ Worker picks event
→ Worker loads source data/version from PostgreSQL
→ Worker upserts Neo4j node/relationship
→ Worker marks success/failure
→ Worker updates sync/freshness metadata
```

Graph Sync covers:

1. Medicine.
2. ActiveIngredient.
3. Medicine–ActiveIngredient mapping.
4. DrugInteraction Rule.

Graph Sync must handle:

1. Create.
2. Update.
3. Deactivate.
4. Retry.
5. Out-of-order/replayed events.
6. Freshness detection.
7. Failure logging.

### 14.4. Graph-RAG architecture

Graph-RAG flow:

```text
User asks Graph-RAG query
→ Backend checks permission
→ Query is classified
→ Graph freshness checked
→ If graph fresh: query Neo4j via allowlisted templates
→ If graph stale/unavailable and query has fallback: use PostgreSQL
→ If pure graph query has no fallback: return safe error
→ Response includes provenance/freshness/degraded indicator
```

### 14.5. Graph access rules

1. Admin has graph read access.
2. Staff has read-only graph/Graph-RAG access if permission granted.
3. Warehouse has no Graph Explorer access in MVP.
4. No raw Cypher for Staff.
5. Normal graph queries return active data only.
6. Deactivated projected nodes/relationships may remain in Neo4j with `isActive=false`.

### 14.6. Graph freshness

Graph freshness is determined by:

1. PostgreSQL source versions.
2. Graph Sync Outbox state.
3. Pending jobs.
4. Failed jobs.
5. Projected source version in Neo4j or metadata.

Not only elapsed time.

If required source version is not projected or relevant job pending/failed:

```text
Graph is stale for that query
```

---

## 15. Integration Architecture

### 15.1. Integration overview

| Integration                  | Direction                               | Purpose                         |
| ---------------------------- | --------------------------------------- | ------------------------------- |
| Frontend → Backend           | HTTP/API                                | App operations                  |
| Backend → Supabase Auth      | Verify token/admin user creation        | Authentication                  |
| Backend → PostgreSQL         | Prisma                                  | Source of truth data            |
| Backend/Worker → Neo4j       | Neo4j client                            | Graph projection/query          |
| Backend → Google AI Provider | Provider adapter                        | AI explanation/draft            |
| Backend → MockAI             | Local/internal adapter                  | AI fallback                     |
| Backend → GitHub/Jira        | Mostly project process, not runtime MVP | Project management traceability |

### 15.2. Supabase Auth integration boundary

Backend relies on Supabase Auth for:

1. Token verification.
2. User ID.
3. Password changes.
4. Admin-created accounts if used.

Backend does not use Supabase Auth for:

1. Business permissions.
2. Ownership.
3. Role matrix.
4. Audit actor logic beyond user identity link.

### 15.3. PostgreSQL integration boundary

Backend uses PostgreSQL for all authoritative reads/writes.

PostgreSQL should not be bypassed by:

1. Neo4j for business truth.
2. Frontend local state.
3. AI output.
4. Manual demo graph seed as official state.

### 15.4. Neo4j integration boundary

Neo4j receives projection from Graph Sync.

Neo4j is used by:

1. Graph Explorer.
2. Graph-RAG.
3. Optional graph-based explanation context.

Neo4j is not used to:

1. Decide stock.
2. Deduct inventory.
3. Mark order paid.
4. Create invoice.
5. Persist official InteractionAlert.
6. Override PostgreSQL interaction rules.

### 15.5. AI provider integration boundary

Google AI Provider is called through adapter.

Provider response must pass:

1. Output guardrail.
2. Structured validation if required.
3. AI audit logging.

Provider output is not automatically official business data.

AI draft becomes official consultation note only when Staff/Admin confirms.

---

## 16. Deployment Architecture

### 16.1. MVP deployment shape

Recommended MVP/demo deployment:

1. User browser: Chrome desktop/laptop.
2. Frontend: Next.js app.
3. Backend: NestJS API.
4. Database: Supabase PostgreSQL/PostgreSQL.
5. Auth: Supabase Auth.
6. Graph: Neo4j AuraDB or Neo4j instance.
7. AI: Google AI Provider.
8. Fallback: MockAI inside backend.
9. Worker: Graph Sync Worker.
10. Local tooling: demo reset command.

### 16.2. Development environment

Primary setup:

1. Local Node.js.
2. Next.js frontend.
3. NestJS backend.
4. Prisma.
5. Cloud Supabase.
6. Neo4j AuraDB or accessible Neo4j.
7. Google AI key if available.
8. MockAI fallback.
9. Local `.env`.

Docker is optional, not official setup path.

### 16.3. Demo/staging environment

Dedicated demo/staging environment is recommended but not yet fully finalized.

If created, it should have:

1. Separate Supabase project.
2. Separate PostgreSQL data.
3. Separate Neo4j database.
4. Separate AI configuration.
5. Demo seed.
6. No destructive demo reset.
7. Release/demo freeze snapshot.

### 16.4. Production environment

Production deployment is not the main target of MVP đồ án.

If discussed, production would require additional:

1. Security hardening.
2. Monitoring.
3. Backup/restore.
4. Compliance review.
5. Real incident response.
6. Secrets management.
7. Production migration process.
8. Production data protection.

These are Future/Commercial scope unless required by class submission.

### 16.5. Deployment diagram summary

```text
[Browser]
   |
   v
[Next.js Frontend]
   |
   v
[NestJS Backend API] ----> [Supabase Auth]
   |        |       |
   |        |       +----> [Google AI Provider]
   |        |       +----> [MockAI]
   |        |
   |        +----> [Neo4j Projection]
   |
   +----> [PostgreSQL Source of Truth]

[Graph Sync Worker]
   |
   +----> [PostgreSQL Outbox]
   +----> [Neo4j Projection]

[Demo Reset Tool]
   |
   +----> Local only
```

---

## 17. Environment Configuration

### 17.1. Required environment variables overview

Actual variable names may be finalized in setup guide, but configuration groups should include:

| Group      | Purpose                                                         |
| ---------- | --------------------------------------------------------------- |
| App        | Environment name, app URL, API URL                              |
| Database   | PostgreSQL connection URL                                       |
| Supabase   | Supabase project URL, anon key, service role key if needed      |
| Auth       | JWT verification/public key settings if needed through Supabase |
| Neo4j      | URI, username, password, database name                          |
| AI         | Provider name, model name, API key, timeout                     |
| MockAI     | Enable/disable fallback                                         |
| Graph Sync | Worker enable, retry limit, retry interval                      |
| Demo Reset | Local-only safety flags                                         |
| Logging    | Log level                                                       |
| CI/Test    | Test environment indicators                                     |

### 17.2. Environment names

Recommended environment names:

1. `local`.
2. `test`.
3. `demo`.
4. `staging`.
5. `production`.

Demo reset must only allow:

```text
local
```

and must refuse:

1. `demo`.
2. `staging`.
3. `production`.
4. unknown/empty environment.

### 17.3. AI configuration

Backend must support provider/model configuration through:

1. Environment configuration.
2. Database configuration if implemented.
3. Admin UI as Should-have.

Minimum needed:

1. Preferred provider.
2. Model name.
3. API key.
4. Timeout.
5. Fallback enabled.
6. Prompt version.

### 17.4. Graph configuration

Graph configuration must include:

1. Neo4j URI.
2. Credentials.
3. Database name if needed.
4. Sync enabled.
5. Worker interval.
6. Retry limit.
7. Freshness settings/metadata behavior.

### 17.5. Secrets handling

Secrets must not be committed to GitHub.

Secrets include:

1. Supabase service role key.
2. PostgreSQL connection string.
3. Neo4j credentials.
4. Google AI API key.
5. Any private tokens.

---

## 18. Security Architecture Overview

### 18.1. Authentication security

1. Supabase Auth manages credentials.
2. Backend verifies token.
3. Backend does not accept user identity from request body.
4. Backend maps token user to user profile.
5. User inactive blocked.

### 18.2. Authorization security

1. Multi-role RBAC.
2. Permission-based access.
3. Ownership rules for Staff.
4. Module-specific access restrictions.
5. Backend guards.
6. Frontend visibility for UX only.
7. Warehouse blocked from sales/payment/interaction/graph MVP.
8. Staff blocked from admin, supplier, inventory adjustment and global alert history.

### 18.3. Data security

1. PostgreSQL stores authoritative data.
2. No password/password_hash stored.
3. AI Audit no raw PII.
4. Demo seed no real personal data.
5. Destructive reset local only.
6. Raw Cypher not exposed to Staff.

### 18.4. AI safety security

1. Input guardrail.
2. Output guardrail.
3. Safe refusal.
4. No diagnosis.
5. No prescribing.
6. No dosage advice.
7. No raw unsafe output display.
8. Draft requires human confirmation.

### 18.5. Checkout security

1. Server-side recalculation.
2. Server-side stock validation.
3. Server-side HIGH alert validation.
4. Server-side FEFO.
5. Transaction.
6. Idempotency.
7. No direct payment/invoice completion outside checkout.

---

## 19. Observability / Audit Overview

### 19.1. Audit categories

Audit/logging must cover:

1. Authentication/security events where appropriate.
2. User/role changes.
3. Supplier deactivate.
4. Medicine deactivate.
5. Stock Import confirm/cancel.
6. Inventory Adjustment confirm.
7. Checkout success/failure.
8. Payment attempts.
9. Invoice creation.
10. DrugInteraction Rule changes.
11. HIGH alert acknowledgement.
12. HIGH alert consultation note.
13. AI Audit.
14. Graph Sync attempts/failures.
15. System Settings update.
16. Demo reset execution.

### 19.2. AI Audit

AI Audit is separate from generic audit because it needs AI-specific metadata:

1. Provider requested.
2. Provider used.
3. Fallback.
4. Prompt version.
5. Guardrail statuses.
6. Schema validation.
7. Latency.
8. Minimized summaries.

### 19.3. Graph Sync observability

Graph Sync should log:

1. Job created.
2. Job picked.
3. Attempt count.
4. Success.
5. Failure.
6. Retry scheduled.
7. Retry exhausted.
8. Source version.
9. Projected version.
10. Freshness impact.

### 19.4. Demo observability

Demo reset should output:

1. Environment detected.
2. Whether reset allowed.
3. Users provisioned.
4. Seed data created.
5. Graph rebuilt/synced.
6. Freshness status.
7. Smoke test result.
8. Failure reason if any.

---

## 20. Failure / Fallback Strategy

### 20.1. Supabase Auth failure

| Failure                                             | Strategy                         |
| --------------------------------------------------- | -------------------------------- |
| Login fails                                         | Show login error                 |
| Token invalid/expired                               | Require re-login or refresh      |
| Supabase unavailable                                | Protected operations unavailable |
| User created in Supabase but profile creation fails | Rollback/cleanup/manual recovery |

### 20.2. PostgreSQL failure

PostgreSQL is source of truth. If PostgreSQL unavailable:

1. Backend cannot safely perform business operations.
2. POS/checkout should not proceed.
3. Reports unavailable.
4. Graph should not be used as substitute for source of truth.
5. System returns safe operational error.

### 20.3. Neo4j failure

If Neo4j unavailable:

1. POS still works.
2. Checkout still works using PostgreSQL.
3. Interaction checking still works using PostgreSQL.
4. Graph Explorer unavailable.
5. Graph-RAG fallback to PostgreSQL for interaction explanation.
6. Pure graph query returns safe error.
7. Graph Sync jobs retry.

### 20.4. Graph stale

If graph stale:

1. Do not silently use stale graph.
2. Use PostgreSQL fallback for interaction explanation.
3. Return `graphUsed=false`/degraded indicator.
4. Pure graph query returns safe error.
5. Admin Graph Sync Status UI is Should-have, but backend metadata must exist.

### 20.5. Google AI Provider failure

If Google AI Provider fails:

1. Use MockAI fallback if enabled.
2. Log fallback reason.
3. Record AI Audit.
4. UI may show degraded/fallback indicator.
5. Do not block checkout solely because AI explanation unavailable.
6. HIGH alert still requires human acknowledgement/note.

### 20.6. AI Guardrail failure

If guardrail cannot validate safely:

1. Prefer safe refusal.
2. Do not show raw unsafe output.
3. Log guardrail failure.
4. Do not auto-save AI output.

### 20.7. Checkout failure

Checkout failures:

| Failure              | Strategy                                |
| -------------------- | --------------------------------------- |
| Validation failure   | Keep Draft Order                        |
| Stock insufficient   | Reject checkout, show stock error       |
| HIGH unresolved      | Reject checkout, show alert requirement |
| Payment failure      | Do not mark PAID, no invoice            |
| Transaction error    | Rollback                                |
| Idempotency retry    | Return previous result                  |
| Idempotency mismatch | Reject                                  |

### 20.8. Demo reset failure

If demo reset fails:

1. Stop safely.
2. Report failure reason.
3. Do not claim demo ready.
4. Do not run on non-local.
5. Smoke tests must detect incomplete reset.

---

## 21. MVP / Should-have / Future Architecture Boundaries

### 21.1. MVP architecture

MVP architecture includes:

1. Next.js frontend.
2. NestJS backend.
3. Prisma.
4. Supabase Auth.
5. PostgreSQL source of truth.
6. Multi-role RBAC.
7. Admin/Staff/Warehouse roles.
8. Medicine and ActiveIngredient modules.
9. Supplier module.
10. MedicineBatch inventory.
11. Stock Import.
12. Inventory Adjustment.
13. POS Draft Order.
14. Interaction checking.
15. InteractionAlert lifecycle.
16. Transactional Checkout.
17. Payment simulation.
18. Invoice.
19. Reports.
20. System Settings for near-expiry threshold.
21. AI Copilot.
22. Google AI Provider.
23. MockAI fallback.
24. AI Guardrail.
25. AI Audit.
26. Neo4j projection.
27. Graph Sync.
28. Graph-RAG.
29. Curated seed.
30. Local demo reset.

### 21.2. Should-have architecture

Should-have architecture includes:

1. Full Customer Management UI/module.
2. Generic System Audit Log UI.
3. Graph Sync Status/retry UI.
4. Admin prompt editing UI.
5. Admin AI provider/model configuration UI.
6. AI-generated report narrative.
7. Advanced charts.
8. Notification.
9. Supabase Storage if needed.
10. Supabase Realtime if needed.
11. Simple forecast.
12. Simple reorder suggestion.

Should-have must not block MVP.

### 21.3. Future / Commercial architecture

Future architecture includes:

1. Online commerce.
2. Product variants as commerce core.
3. Cart.
4. Wishlist.
5. Shipping.
6. Coupon.
7. Review.
8. CMS.
9. Customer portal.
10. Multi-store.
11. Multi-warehouse.
12. Stock transfer.
13. Purchase order workflow.
14. Supplier contract management.
15. Refund.
16. Return.
17. Credit note.
18. Invoice reversal.
19. Real payment gateway.
20. Real bank integration.
21. Advanced analytics.
22. AI Cache.
23. DrugGroup taxonomy.
24. Symptom/Condition/RedFlag graph enrichment.
25. CRITICAL severity.
26. Full mobile support.
27. Full cross-browser testing.
28. Commercial-scale 100-table implementation.

### 21.4. Out of Scope architecture

Out of Scope for current MVP:

1. Custom username/password/JWT auth.
2. Storing password/password_hash in PostgreSQL.
3. Aggregate inventory source of truth.
4. Medicine-level official interaction rule.
5. MockAI-only MVP.
6. MockGraph-only MVP.
7. Payment/invoice command outside checkout as official completion flow.
8. Full Customer Management as MVP blocker.
9. Full 100-table schema as MVP requirement.
10. Using all scraped ingredients as official ActiveIngredients.
11. selling_price = 0 seed as sellable product.
12. Skipping HIGH acknowledgement/note.
13. Skipping Graph Sync Outbox.
14. Skipping graph freshness detection.
15. AI diagnosis.
16. AI prescribing.
17. AI dosage advice.
18. Raw Cypher for Staff.
19. Demo reset outside local.

---

## 22. Architecture Decision Summary

| Decision ID | Architecture Decision                                          | Status   |
| ----------- | -------------------------------------------------------------- | -------- |
| ARCH-001    | Use Next.js for frontend                                       | Approved |
| ARCH-002    | Use NestJS / Node.js for backend                               | Approved |
| ARCH-003    | Use Prisma ORM                                                 | Approved |
| ARCH-004    | Use Supabase Auth for authentication                           | Approved |
| ARCH-005    | Use PostgreSQL as source of truth                              | Approved |
| ARCH-006    | Use Neo4j as graph projection                                  | Approved |
| ARCH-007    | Use MedicineBatch as inventory source of truth                 | Approved |
| ARCH-008    | Use FEFO in checkout                                           | Approved |
| ARCH-009    | Use checkout as transaction boundary for order/payment/invoice | Approved |
| ARCH-010    | Use ActiveIngredient-level interaction rules                   | Approved |
| ARCH-011    | Persist InteractionAlert lifecycle                             | Approved |
| ARCH-012    | Require HIGH acknowledgement and consultation note             | Approved |
| ARCH-013    | Use Google AI Provider as preferred AI provider                | Approved |
| ARCH-014    | Use MockAI as fallback                                         | Approved |
| ARCH-015    | Include AI Guardrail and AI Audit in MVP                       | Approved |
| ARCH-016    | Include Graph Sync and Graph-RAG in MVP                        | Approved |
| ARCH-017    | Use Graph Sync Outbox/Worker/Retry/Audit/Freshness             | Approved |
| ARCH-018    | Keep full 100-table database as future/commercial reference    | Approved |
| ARCH-019    | Use curated operational seed for MVP demo                      | Approved |
| ARCH-020    | Demo reset local only                                          | Approved |

---

## 23. Architecture Risks and Mitigations

| Risk                              | Impact                             | Mitigation                                              |
| --------------------------------- | ---------------------------------- | ------------------------------------------------------- |
| Scope quá rộng                    | MVP không hoàn thành               | Giữ MVP boundaries, defer Should-have/Future            |
| Checkout transaction phức tạp     | Stock/payment/invoice inconsistent | Ưu tiên CheckoutService, idempotency, transaction tests |
| FEFO sai                          | Demo inventory không thuyết phục   | Seed multi-batch scenario, test allocation              |
| HIGH alert bị bypass              | Safety failure                     | Backend validation, checkout tests                      |
| Supabase Auth mapping lỗi         | User không vào app                 | Profile provisioning checks, demo user smoke test       |
| AI provider lỗi                   | AI demo không ổn định              | MockAI fallback, audit fallback                         |
| AI unsafe output                  | Safety issue                       | Input/output guardrail, safe refusal                    |
| Neo4j stale                       | Graph output sai                   | Freshness detection, PostgreSQL fallback                |
| Graph Sync worker lỗi             | Graph demo fail                    | Retry/logs, rebuild projection, smoke check             |
| Demo reset chạy sai env           | Mất dữ liệu                        | Environment guard, local-only rule                      |
| Jira cũ dẫn implement sai         | Scope drift                        | Use Document 01/04/06/10 as baseline                    |
| Full 100-table schema gây quá tải | Delay MVP                          | Core subset only for MVP                                |

---

## 24. Kết luận

Document 10 — System Architecture Document đã mô tả kiến trúc tổng thể của **PharmaAssist AI Intelligence** ở mức architecture.

Tài liệu này xác định rõ:

1. Architecture goals.
2. Architecture principles.
3. System context.
4. High-level architecture.
5. Frontend architecture với Next.js.
6. Backend architecture với NestJS / Node.js.
7. Authentication architecture với Supabase Auth.
8. Database architecture với PostgreSQL và Prisma.
9. Inventory architecture dựa trên MedicineBatch.
10. Checkout architecture với transaction, idempotency, FEFO, payment và invoice.
11. Interaction architecture dựa trên ActiveIngredient và InteractionAlert.
12. AI architecture overview với Google AI Provider, MockAI fallback, Guardrail và Audit.
13. Graph architecture overview với Neo4j projection, Graph Sync và Graph-RAG.
14. Integration architecture.
15. Deployment architecture.
16. Environment configuration.
17. Security architecture overview.
18. Observability/audit overview.
19. Failure/fallback strategy.
20. MVP/Should-have/Future/Out of Scope architecture boundaries.
21. Architecture decision summary.
22. Architecture risks and mitigations.

Các baseline quan trọng được giữ:

1. Frontend dùng Next.js.
2. Backend dùng NestJS / Node.js.
3. ORM dùng Prisma.
4. Authentication dùng Supabase Auth.
5. PostgreSQL là source of truth.
6. Neo4j là graph projection.
7. MedicineBatch là inventory source of truth.
8. Checkout dùng FEFO.
9. Checkout là transaction chính thức để hoàn tất order/payment/invoice.
10. DrugInteraction Rule ở cấp ActiveIngredient–ActiveIngredient.
11. InteractionAlert phải persist.
12. HIGH alert cần acknowledgement và consultation note trước checkout.
13. AI Guardrail và AI Audit là MVP.
14. Google AI Provider là provider ưu tiên.
15. MockAI là fallback.
16. Graph Sync và Graph-RAG là MVP.
17. Graph Sync phải có outbox/worker/retry/audit/freshness detection.
18. Database 100 bảng là extended/commercial design, không phải full MVP schema.
19. Real catalog data chỉ là reference, MVP cần curated operational seed.
20. Demo reset chỉ chạy local.

Document 10 là đầu vào trực tiếp cho:

1. Document 11 — Module Design Document.
2. Document 12 — API Specification.
3. Document 13 — Database Design & ERD.
4. Document 14 — Prisma Schema & Migration Design.
5. Document 16 — AI Architecture, Guardrail & Audit Design.
6. Document 17 — Knowledge Graph, Neo4j Sync & Graph-RAG Design.
7. Document 20 — Testing, Demo & Setup Guide.

Bước tiếp theo hợp lý là viết **Document 11 — Module Design Document**, vì kiến trúc tổng thể đã xác định component boundaries và cần được chuyển thành thiết kế module cụ thể cho backend/frontend/service responsibilities.
