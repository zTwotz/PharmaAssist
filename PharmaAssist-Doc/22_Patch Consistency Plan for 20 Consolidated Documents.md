# Patch Consistency Plan for 20 Consolidated Documents

# Kế hoạch chỉnh đồng bộ cuối cùng cho bộ 20 tài liệu PharmaAssist AI Intelligence

---

## Metadata

| Mục                   | Nội dung                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------- |
| Patch Document ID     | PATCH-CONSISTENCY-01                                                                                    |
| Suggested file name   | `00_patch_consistency_plan.md`                                                                          |
| Project               | PharmaAssist AI Intelligence                                                                            |
| Version               | 1.0                                                                                                     |
| Status                | Ready for application                                                                                   |
| Created Date          | 08/06/2026                                                                                              |
| Owner                 | Project Leader / Documentation Owner                                                                    |
| Applies to            | Document 01–20                                                                                          |
| Purpose               | Chuẩn hóa baseline, thuật ngữ, scope, traceability và các wording dễ gây hiểu nhầm trước khi chốt final |
| Priority              | High                                                                                                    |
| Output after applying | Bộ Document 01–20 đồng bộ, nhất quán và sẵn sàng export final                                           |

---

# 1. Mục đích của Patch Consistency

Bản Patch Consistency này dùng để chỉnh đồng bộ lần cuối cho bộ **20 consolidated documents** của dự án **PharmaAssist AI Intelligence**.

Mục tiêu:

1. Loại bỏ wording mơ hồ.
2. Chuẩn hóa thuật ngữ xuyên suốt 20 tài liệu.
3. Đảm bảo không tài liệu nào quay lại baseline cũ.
4. Làm rõ MVP / Should-have / Future / Out of Scope.
5. Làm rõ các ranh giới quan trọng:

   * AI Audit backend/API/UI.
   * Graph Sync backend vs Graph Sync Status UI.
   * Audit logging backend vs System Audit Log UI.
   * AI provider configuration.
   * Graph source version/freshness.
   * Consultation note evidence.
6. Chuẩn bị cho bước tiếp theo: Requirement ID Registry, Use Case ID Registry, Test Case ID Registry và Traceability Matrix.

Patch này **không tạo scope mới**. Patch này chỉ chuẩn hóa và làm rõ những gì đã được baseline chính thức xác nhận.

---

# 2. Nguyên tắc áp dụng patch

Khi áp dụng patch cho Document 01–20, cần tuân thủ:

1. Không thay đổi baseline đã chốt.
2. Không thêm module MVP mới ngoài baseline.
3. Không đưa nội dung implementation quá sâu vào sai document.
4. Không biến Should-have thành MVP nếu chưa được chốt.
5. Không biến Future / Commercial Expansion thành MVP.
6. Không dùng lại quyết định cũ đã bị thay thế.
7. Không sửa tên công nghệ/entity/API/table/enum sai nghĩa.
8. Nội dung chính vẫn viết bằng tiếng Việt.
9. Tên công nghệ, module, entity, API, table, enum và thuật ngữ kỹ thuật giữ tiếng Anh khi cần.
10. Các patch wording nên được áp dụng nhất quán ở tất cả tài liệu liên quan.

---

# 3. Patch Summary

| Patch ID | Tên patch                                                              | Priority | Tài liệu ảnh hưởng chính           |
| -------- | ---------------------------------------------------------------------- | -------: | ---------------------------------- |
| PC-01    | Chuẩn hóa AI Audit MVP scope                                           |     High | Doc 15, 16, 19, 20                 |
| PC-02    | Chốt Graph sourceVersion & freshness strategy                          |     High | Doc 13, 14, 17, 20                 |
| PC-03    | Đổi ConsultationSessions thành InteractionAlert consultation evidence  |     High | Doc 18, 13, 14 nếu có nhắc         |
| PC-04    | Phân biệt Graph Sync backend MVP và Graph Sync Status UI Should-have   |     High | Doc 12, 15, 17, 19, 20             |
| PC-05    | Phân biệt Audit backend MVP và System Audit Log UI Should-have         |     High | Doc 06, 11, 13, 15, 19, 20         |
| PC-06    | Làm rõ AIProviderConfig optional nhưng provider/model config mandatory |   Medium | Doc 14, 16, 20                     |
| PC-07    | Chuẩn hóa thuật ngữ toàn bộ bộ tài liệu                                |     High | Doc 01–20                          |
| PC-08    | Chuẩn hóa wording về Customer Management                               |   Medium | Doc 01, 03, 05, 06, 07, 08, 15, 19 |
| PC-09    | Chuẩn hóa wording về full 100-table database                           |   Medium | Doc 01, 03, 04, 13, 14, 18         |
| PC-10    | Chuẩn hóa wording về testing stack unresolved                          |   Medium | Doc 19, 20                         |
| PC-11    | Chuẩn hóa wording về demo/staging environment unresolved               |   Medium | Doc 02, 19, 20                     |
| PC-12    | Thêm final consistency checklist vào cuối mỗi tài liệu nếu cần         |      Low | Doc 01–20                          |

---

# 4. PC-01 — Chuẩn hóa AI Audit MVP Scope

## 4.1. Vấn đề

Trong một số tài liệu, **AI Audit** được xác định là MVP, nhưng **AI Audit Log UI** đôi khi được viết như tùy chọn hoặc “nếu cần”.

Điều này có thể khiến team hiểu sai rằng AI Audit chỉ là optional.

## 4.2. Quyết định chuẩn

Cần thống nhất:

```text
AI Audit backend, API và dữ liệu audit là MVP bắt buộc.
MVP nên có một màn hình Admin AI Audit Log tối thiểu để chứng minh traceability khi demo.
Các dashboard AI observability nâng cao là Should-have.
```

## 4.3. Wording chuẩn để dùng trong tài liệu

Dùng wording sau:

> **AI Audit backend, API và dữ liệu audit là MVP bắt buộc. Hệ thống cần ghi nhận các AI request quan trọng, provider requested/used, fallback status, prompt version, guardrail status, schema validation status, latency và minimized summaries. MVP nên có một màn hình Admin AI Audit Log tối thiểu để chứng minh traceability trong demo. Các dashboard AI observability nâng cao, biểu đồ phân tích AI hoặc UI cấu hình nâng cao thuộc Should-have.**

## 4.4. Tài liệu cần sửa

### Document 15 — UI/UX Screen Specification

Sửa mọi chỗ viết:

```text
AI Audit Log nếu MVP/role phù hợp
```

thành:

```text
AI Audit Log tối thiểu cho Admin là MVP để chứng minh traceability; dashboard AI observability nâng cao là Should-have.
```

Trong screen list, nên ghi:

```text
AI Audit Log — MVP minimal Admin screen
```

### Document 16 — AI Architecture, Guardrail & Audit Design

Thêm vào phần AI Audit:

```text
AI Audit persistence/backend/API là MVP bắt buộc. Admin AI Audit Log screen tối thiểu là MVP để phục vụ demo traceability. Advanced AI observability dashboard là Should-have.
```

### Document 19 — Project Management, Jira & Release Plan

Trong Epic AI Guardrail & Audit, thêm story:

```text
Implement minimal Admin AI Audit Log screen.
```

Và phân loại:

```text
Minimal AI Audit Log UI = MVP.
Advanced AI observability dashboard = Should-have.
```

### Document 20 — Testing, Demo & Setup Guide

Trong Smoke Test và Demo Checklist, ghi:

```text
Admin can view AI Audit Log.
AI Audit Log shows provider, fallback, prompt version and guardrail status.
```

## 4.5. Acceptance Criteria

Patch PC-01 hoàn tất khi:

1. Không tài liệu nào viết AI Audit như optional.
2. AI Audit backend/API/data được ghi là MVP.
3. Minimal Admin AI Audit Log screen được ghi là MVP.
4. Advanced AI observability dashboard được ghi là Should-have.
5. Document 15/16/19/20 dùng wording thống nhất.

---

# 5. PC-02 — Chốt Graph sourceVersion & Freshness Strategy

## 5.1. Vấn đề

Document 17 đã mô tả Graph freshness dựa vào source version và outbox state, nhưng sourceVersion implementation chưa đủ rõ. Nếu không khóa, team có thể chỉ dựa vào `updated_at` hoặc thời gian sync, làm freshness yếu.

## 5.2. Quyết định chuẩn

MVP nên dùng explicit `version` field cho các bảng nguồn được project sang Neo4j.

Các bảng graph-source nên có:

```text
medicines.version
active_ingredients.version
medicine_ingredients.version
drug_interactions.version
```

Mỗi khi dữ liệu nguồn thay đổi, `version` tăng lên.

GraphProjectionVersion lưu version đã được project.

Graph freshness được xác định bằng:

```text
source version + Graph Sync Outbox state
```

không chỉ dựa trên thời gian.

## 5.3. Wording chuẩn để dùng trong tài liệu

> **Các bảng nguồn dùng để projection sang Neo4j nên có field `version` rõ ràng. Trong MVP, các bảng `medicines`, `active_ingredients`, `medicine_ingredients` và `drug_interactions` nên có `version`. Mỗi khi bản ghi được tạo mới, cập nhật hoặc deactivate, version tăng lên. `graph_projection_versions` lưu source version mới nhất đã được project sang Neo4j. Graph freshness được xác định bằng source version kết hợp với trạng thái `graph_sync_outbox`, không chỉ dựa trên elapsed time hoặc `syncedAt`.**

## 5.4. Tài liệu cần sửa

### Document 13 — Database Design & ERD

Trong table-by-table design của:

1. `medicines`
2. `active_ingredients`
3. `medicine_ingredients`
4. `drug_interactions`

thêm conceptual column:

```text
version — integer, required, default 1, incremented on relevant update/deactivation for graph freshness.
```

Trong phần Graph Sync/Freshness, thêm:

```text
Graph-source tables use explicit version fields where possible.
```

### Document 14 — Prisma Schema & Migration Design

Trong Prisma strategy, thêm:

```text
Graph-source models should include version Int @default(1).
```

Ghi chú:

```text
Version increment must be handled by service logic or database trigger strategy, depending implementation choice.
```

### Document 17 — Knowledge Graph, Neo4j Sync & Graph-RAG Design

Thêm subsection:

```text
MVP Source Version Implementation
```

Nội dung:

```text
MVP uses explicit source version fields for graph-source entities. Freshness check compares PostgreSQL source version with projected source version and relevant outbox state.
```

### Document 20 — Testing, Demo & Setup Guide

Trong Graph Smoke Test, thêm checks:

1. Source rows have version.
2. GraphProjectionVersion records projected version.
3. Freshness fails if outbox has pending/failed newer version.
4. Freshness passes after worker/rebuild projects latest version.

## 5.5. Acceptance Criteria

Patch PC-02 hoàn tất khi:

1. Document 13 có `version` cho graph-source tables.
2. Document 14 có Prisma/migration strategy cho `version`.
3. Document 17 dùng explicit sourceVersion strategy.
4. Document 20 có smoke tests cho version/freshness.
5. Không tài liệu nào mô tả freshness chỉ dựa vào thời gian.

---

# 6. PC-03 — Đổi ConsultationSessions thành InteractionAlert Consultation Evidence

## 6.1. Vấn đề

Document 18 có nhắc `ConsultationSessions` trong seed data groups. Điều này dễ khiến team hiểu nhầm rằng MVP cần một bảng `consultation_sessions` riêng.

Baseline hiện tại không yêu cầu bảng `ConsultationSession` riêng cho MVP. HIGH alert consultation note chính thức được lưu trên `InteractionAlert`.

## 6.2. Quyết định chuẩn

Dùng thuật ngữ:

```text
InteractionAlert consultation evidence
```

hoặc tiếng Việt:

```text
bằng chứng tư vấn gắn với InteractionAlert
```

## 6.3. Wording chuẩn để dùng trong tài liệu

> **MVP không yêu cầu bảng `ConsultationSession` riêng. Bằng chứng tư vấn chính thức cho HIGH alert được lưu trực tiếp trên `InteractionAlert`, bao gồm `acknowledged_by`, `acknowledged_at`, `consultation_note`, `consultation_note_by` và `consultation_note_at`. Nếu sau này cần mô hình consultation session riêng, nội dung đó thuộc Should-have hoặc Future / Commercial Expansion và không thay thế rule per-HIGH-alert consultation note.**

## 6.4. Tài liệu cần sửa

### Document 18 — Data Strategy, Catalog Reference & MVP Seed Plan

Replace:

```text
ConsultationSessions
```

with:

```text
InteractionAlert consultation evidence
```

or:

```text
Bằng chứng tư vấn gắn với InteractionAlert
```

Trong seed group list, dùng:

```text
InteractionAlert consultation evidence
```

Không dùng:

```text
ConsultationSessions
```

như một seed group MVP.

### Document 13 / 14

Nếu có nhắc `ConsultationSession` như MVP table/model thì sửa thành:

```text
No separate ConsultationSession table/model is required for MVP.
```

Nếu muốn giữ concept này, chuyển sang:

```text
Should-have / Future
```

## 6.5. Acceptance Criteria

Patch PC-03 hoàn tất khi:

1. Không tài liệu nào yêu cầu `ConsultationSession` table trong MVP.
2. Document 18 dùng `InteractionAlert consultation evidence`.
3. HIGH consultation note vẫn rõ là field chính thức trên `InteractionAlert`.
4. AI draft vẫn không được lưu tự động thành official note.

---

# 7. PC-04 — Phân biệt Graph Sync Backend MVP và Graph Sync Status UI Should-have

## 7.1. Vấn đề

Một số tài liệu có nhắc Graph Sync Status API/UI là Should-have. Điều này đúng với UI quản trị, nhưng có thể gây hiểu nhầm rằng Graph Sync backend cũng là Should-have.

Baseline đã chốt: Graph Sync backend là MVP.

## 7.2. Quyết định chuẩn

```text
Graph Sync backend, Graph Sync Outbox, Worker, Retry, Attempts/Logs và Freshness Detection là MVP.
Admin Graph Sync Status/retry UI và các API quản trị tương ứng là Should-have.
```

## 7.3. Wording chuẩn để dùng trong tài liệu

> **Graph Sync backend là MVP. Hệ thống phải có Graph Sync Outbox, Worker, retry handling, attempts/logs, audit/failure logging và freshness detection để đồng bộ PostgreSQL source data sang Neo4j projection. Màn hình Admin Graph Sync Status/retry và các API quản trị thủ công cho retry/rebuild là Should-have, không phải điều kiện hoàn thành MVP nếu backend sync/freshness đã hoạt động và có thể kiểm chứng bằng logs/smoke checks.**

## 7.4. Tài liệu cần sửa

### Document 12 — API Specification

Trong phần Graph Sync APIs, ghi:

```text
Graph Sync backend is MVP.
Graph Sync Status/retry management APIs are Should-have unless required for demo evidence.
```

### Document 15 — UI/UX Screen Specification

Trong screen list:

```text
Graph Sync Status screen — Should-have.
```

Thêm note:

```text
Graph Sync backend and freshness indicator are still MVP.
```

### Document 17 — Knowledge Graph, Neo4j Sync & Graph-RAG Design

Đảm bảo phần Graph Sync Architecture ghi rõ:

```text
Outbox, Worker, Retry, Attempts/Logs and Freshness Detection are MVP.
```

Phần UI/API quản trị ghi:

```text
Admin Graph Sync Status/retry UI is Should-have.
```

### Document 19 — Project Management, Jira & Release Plan

Trong Epic Graph Sync & Graph-RAG:

MVP stories:

1. Graph Sync Outbox.
2. Worker.
3. Retry.
4. Attempts/logs.
5. Freshness detection.
6. Graph-RAG fallback.

Should-have stories:

1. Graph Sync Status UI.
2. Manual retry UI.
3. Graph rebuild UI.

### Document 20 — Testing, Demo & Setup Guide

Trong Smoke Test:

```text
Graph Sync backend/freshness must pass.
Graph Sync Status UI is optional/Should-have.
```

## 7.5. Acceptance Criteria

Patch PC-04 hoàn tất khi:

1. Graph Sync backend luôn được ghi là MVP.
2. Graph Sync Status UI luôn được ghi là Should-have.
3. Không tài liệu nào làm mờ yêu cầu outbox/worker/retry/freshness.
4. Testing/smoke vẫn kiểm tra Graph Sync backend.

---

# 8. PC-05 — Phân biệt Audit Backend MVP và System Audit Log UI Should-have

## 8.1. Vấn đề

Một số tài liệu ghi System Audit Log UI là Should-have, trong khi backend audit logging là bắt buộc. Cần làm rõ hai khái niệm này.

## 8.2. Quyết định chuẩn

```text
Backend audit logging cho các nghiệp vụ quan trọng là MVP.
Full Admin System Audit Log UI là Should-have.
```

## 8.3. Wording chuẩn để dùng trong tài liệu

> **Backend audit logging cho các nghiệp vụ quan trọng là MVP. Hệ thống cần ghi nhận các hành động quan trọng như user/role change, supplier deactivation, stock import confirmation, inventory adjustment confirmation, checkout, HIGH alert acknowledgement/note, AI audit event và Graph Sync failure. Màn hình Admin System Audit Log đầy đủ là Should-have, trừ khi được yêu cầu riêng cho demo.**

## 8.4. Tài liệu cần sửa

### Document 06 — SRS

Trong Audit/logging requirements:

```text
Backend audit logging for critical operations is MVP.
Full Admin System Audit Log UI is Should-have.
```

### Document 11 — Module Design

Audit Module:

```text
Audit recording service is MVP.
Full audit browsing UI is Should-have.
```

### Document 13 — Database Design & ERD

`audit_logs` table:

```text
MVP backend audit storage for critical operations.
```

### Document 15 — UI/UX Screen Specification

System Audit Log screen:

```text
Should-have.
```

Nhưng thêm note:

```text
Backend audit logging remains MVP.
```

### Document 19 — Project Management, Jira & Release Plan

Epic/Stories:

MVP:

```text
Implement backend audit logging for critical operations.
```

Should-have:

```text
Implement Admin System Audit Log UI.
```

### Document 20 — Testing, Demo & Setup Guide

Testing:

1. Verify audit log created for critical backend operations.
2. System Audit Log UI is Should-have.

## 8.5. Acceptance Criteria

Patch PC-05 hoàn tất khi:

1. Backend audit logging được ghi là MVP.
2. System Audit Log UI được ghi là Should-have.
3. Không tài liệu nào hiểu audit logging là optional.
4. AI Audit vẫn là module riêng, không bị nhập nhầm với generic AuditLog.

---

# 9. PC-06 — Làm rõ AIProviderConfig Optional nhưng Provider/Model Config Mandatory

## 9.1. Vấn đề

Baseline nói AI provider/model configuration là bắt buộc. Tuy nhiên, database model `AIProviderConfig` có thể optional nếu MVP dùng environment variables.

Cần tránh hiểu nhầm rằng provider/model config optional.

## 9.2. Quyết định chuẩn

```text
Cấu hình provider/model cho AI là bắt buộc.
AIProviderConfig database model là tùy chọn nếu MVP dùng environment variables.
```

## 9.3. Wording chuẩn để dùng trong tài liệu

> **Cấu hình provider/model cho AI là bắt buộc trong MVP. Hệ thống phải biết primary provider, fallback provider, model name, timeout, fallback enabled flag, guardrail enabled flag và audit enabled flag. Tuy nhiên, database model `AIProviderConfig` là tùy chọn nếu MVP dùng environment variables để cấu hình các giá trị này. Admin Provider/Model Configuration UI là Should-have.**

## 9.4. Tài liệu cần sửa

### Document 14 — Prisma Schema & Migration Design

Trong AI model group:

```text
AIProviderConfig model is optional if environment-based configuration is used for MVP.
Provider/model configuration itself is mandatory.
```

### Document 16 — AI Architecture, Guardrail & Audit Design

Trong Provider/model configuration:

```text
Configuration may come from environment variables or database.
Admin configuration UI is Should-have.
```

### Document 20 — Testing, Demo & Setup Guide

Trong AI provider setup:

```text
Provider/model configuration must exist through environment variables or database configuration.
AIProviderConfig table is optional if env config is used.
```

## 9.5. Acceptance Criteria

Patch PC-06 hoàn tất khi:

1. Provider/model configuration luôn được ghi là mandatory.
2. AIProviderConfig DB model được ghi là optional implementation choice.
3. Admin provider/model UI được ghi là Should-have.
4. Không tài liệu nào nói AI provider config optional theo nghĩa không cần cấu hình.

---

# 10. PC-07 — Chuẩn hóa thuật ngữ toàn bộ bộ tài liệu

## 10.1. Mục tiêu

Đảm bảo tất cả Document 01–20 dùng cùng một bộ thuật ngữ.

## 10.2. Bảng chuẩn hóa thuật ngữ

| Không dùng / hạn chế dùng | Dùng thống nhất                               |
| ------------------------- | --------------------------------------------- |
| Should have               |                                               |
| Should Have               |                                               |
| Nice-to-have              | Should-have                                   |
| Future Scope              |                                               |
| Commercial Future         |                                               |
| Expansion Scope           | Future / Commercial Expansion                 |
| AI log                    | AI Audit Log                                  |
| AI Audit table            | `ai_audit_logs` nếu nói table                 |
| Ghi chú tư vấn            | consultation note / ghi chú tư vấn            |
| Tư vấn note               | consultation note                             |
| Graph status              | Graph freshness nếu nói độ mới của graph      |
| Graph Sync status         | Graph Sync status nếu nói trạng thái job/sync |
| Inventory source          | MedicineBatch source of truth                 |
| Inventory table source    | MedicineBatch source of truth                 |
| Payment PAID              | Payment SUCCESS                               |
| Payment paid              | Payment SUCCESS                               |
| Order SUCCESS             | Order PAID                                    |
| READY_FOR_CHECKOUT        | Không dùng trong MVP                          |
| Critical severity         | Không dùng trong MVP                          |
| CRITICAL alert            | Out of Scope                                  |
| Customer user             | Customer stakeholder / walk-in customer       |
| Customer portal           | Future / Commercial Expansion                 |
| MockAI main provider      | MockAI fallback                               |
| MockGraph                 | Không dùng làm MVP runtime                    |
| Medicine interaction rule | ActiveIngredient-level DrugInteraction Rule   |
| Direct pay endpoint       | Checkout API                                  |

## 10.3. Official enum wording

Use consistent enum values:

### Order Status

```text
DRAFT
PAID
CANCELLED
```

### Payment Status

```text
SUCCESS
FAILED
```

### Stock Import Status

```text
DRAFT
CONFIRMED
CANCELLED
```

### Inventory Adjustment Status

```text
DRAFT
CONFIRMED
CANCELLED
```

### Interaction Severity

```text
LOW
MEDIUM
HIGH
```

### Prompt Template Status

```text
DRAFT
APPROVED
RETIRED
```

### Graph Freshness Status

```text
FRESH
STALE
UNAVAILABLE
UNKNOWN
FALLBACK_USED
NO_FALLBACK
```

## 10.4. Acceptance Criteria

Patch PC-07 hoàn tất khi:

1. Tất cả tài liệu dùng “Should-have”.
2. Tất cả tài liệu dùng “Future / Commercial Expansion”.
3. Không dùng Payment PAID.
4. Không dùng Order SUCCESS.
5. Không dùng Medicine-level interaction rule như official rule.
6. Không dùng MockAI như primary-only MVP.
7. Không dùng Customer như authenticated MVP actor.
8. Thuật ngữ AI/Graph/Inventory/Checkout thống nhất.

---

# 11. PC-08 — Chuẩn hóa wording về Customer Management

## 11.1. Vấn đề

Baseline nói Customer Management là Should-have, nhưng POS phải hỗ trợ walk-in/anonymous customer. Cần tránh hiểu nhầm Customer Management là MVP blocker.

## 11.2. Quyết định chuẩn

```text
Full Customer Management is Should-have.
POS MVP supports walk-in/anonymous customers.
Customer is not an authenticated MVP user.
```

## 11.3. Wording chuẩn

> **Full Customer Management không phải điều kiện bắt buộc của MVP. MVP POS phải hỗ trợ walk-in/anonymous customers để bán hàng không cần hồ sơ khách hàng đầy đủ. Customer chỉ là external stakeholder/supporting party nhận invoice, không phải authenticated user trong MVP. Customer portal và customer account management thuộc Should-have hoặc Future / Commercial Expansion tùy phạm vi sau này.**

## 11.4. Tài liệu cần sửa

1. Document 01.
2. Document 03.
3. Document 05.
4. Document 06.
5. Document 07.
6. Document 08.
7. Document 15.
8. Document 19.

## 11.5. Acceptance Criteria

Patch PC-08 hoàn tất khi:

1. Không tài liệu nào biến full Customer Management thành MVP blocker.
2. POS walk-in/anonymous customer vẫn được ghi là MVP requirement.
3. Customer không là authenticated MVP actor.
4. Customer portal nằm Future / Commercial Expansion.

---

# 12. PC-09 — Chuẩn hóa wording về full 100-table database

## 12.1. Vấn đề

Dự án đã phân tích 100-table database, nhưng baseline xác nhận đây là extended/commercial design, không phải full MVP schema.

## 12.2. Quyết định chuẩn

```text
The 100-table database is extended/commercial design.
MVP implements only the core subset required for scope.
```

## 12.3. Wording chuẩn

> **Database 100 bảng là extended/commercial-scale design dùng để tham khảo và định hướng mở rộng tương lai. MVP không triển khai toàn bộ 100 bảng. MVP chỉ triển khai core subset cần thiết cho Auth/RBAC, Medicine, ActiveIngredient, Supplier, MedicineBatch, Stock Import, Inventory Adjustment, POS/Checkout, Payment/Invoice, InteractionAlert, AI Audit, Graph Sync, Settings, Reports và Demo Reset.**

## 12.4. Tài liệu cần sửa

1. Document 01.
2. Document 03.
3. Document 04.
4. Document 13.
5. Document 14.
6. Document 18.

## 12.5. Acceptance Criteria

Patch PC-09 hoàn tất khi:

1. Không tài liệu nào nói full 100-table schema là MVP.
2. Document 13 phân biệt rõ MVP core subset và extended/commercial scope.
3. Document 14 không model full 100-table database như MVP.
4. Document 18 không seed full 100-table data.

---

# 13. PC-10 — Chuẩn hóa wording về Testing Stack unresolved

## 13.1. Vấn đề

Testing stack recommended đã có, nhưng official automated testing toolchain chưa được chốt hoàn toàn.

## 13.2. Quyết định chuẩn

```text
Recommended testing stack is Jest, Supertest, React Testing Library, Playwright and Postman.
Official automated testing stack remains unresolved until explicitly adopted.
Equivalent tools may be used if they cover the same test responsibilities.
```

## 13.3. Wording chuẩn

> **Recommended testing stack là Jest cho backend unit/integration, Jest + Supertest cho API integration, React Testing Library cho frontend component tests, Playwright cho E2E và Postman cho manual API collection. Tuy nhiên, official automated testing toolchain vẫn là unresolved implementation choice cho đến khi team chính thức adopt. Dù dùng tool nào, CI/test plan vẫn phải cover lint, type check, unit tests, integration tests, Prisma validation, migration check, frontend build và backend build.**

## 13.4. Tài liệu cần sửa

1. Document 19.
2. Document 20.

## 13.5. Acceptance Criteria

Patch PC-10 hoàn tất khi:

1. Recommended stack được ghi rõ.
2. Unresolved status được ghi rõ.
3. CI quality gate vẫn bắt buộc.
4. Không tài liệu nào yêu cầu coverage global bắt buộc.

---

# 14. PC-11 — Chuẩn hóa wording về Demo/Staging Environment unresolved

## 14.1. Vấn đề

Dedicated demo/staging environment vẫn unresolved. Tuy nhiên, `demo:reset` chỉ được phép local.

## 14.2. Quyết định chuẩn

```text
Dedicated demo/staging environment is recommended but unresolved.
demo:reset is local-only and must refuse demo/staging/production/unknown environments.
```

## 14.3. Wording chuẩn

> **Dedicated demo/staging environment được khuyến nghị để tăng độ ổn định khi demo, nhưng hiện vẫn là unresolved PM/DevOps decision. Dù có demo/staging environment hay không, `demo:reset` chỉ được phép chạy trong local environment. Script phải từ chối chạy trong demo, staging, production hoặc unknown environment.**

## 14.4. Tài liệu cần sửa

1. Document 02.
2. Document 19.
3. Document 20.

## 14.5. Acceptance Criteria

Patch PC-11 hoàn tất khi:

1. Dedicated demo/staging được ghi là recommended but unresolved.
2. `demo:reset` local-only được ghi ở Document 18/20.
3. Không tài liệu nào cho phép destructive reset trên demo/staging/prod.

---

# 15. PC-12 — Thêm Final Consistency Checklist nếu cần

## 15.1. Mục tiêu

Mỗi tài liệu không nhất thiết phải có checklist dài, nhưng trước khi export final, nên dùng checklist chung để kiểm tra.

## 15.2. Checklist chung

Áp dụng cho từng Document 01–20:

| Check                                                | Expected |
| ---------------------------------------------------- | -------- |
| Tên file đúng Master Index                           | Yes      |
| Mục đích đúng blueprint                              | Yes      |
| Không viết quá sâu vào sai document                  | Yes      |
| Nội dung chính bằng tiếng Việt                       | Yes      |
| Tên công nghệ/entity/API/table giữ tiếng Anh khi cần | Yes      |
| MVP/Should-have/Future/Out of Scope rõ               | Yes      |
| Không quay lại baseline cũ                           | Yes      |
| Thuật ngữ thống nhất                                 | Yes      |
| Related documents đúng                               | Yes      |
| Traceability đủ ở mức phù hợp                        | Yes      |
| No custom JWT/password baseline                      | Yes      |
| No aggregate inventory source of truth               | Yes      |
| No Medicine-level official interaction rule          | Yes      |
| No MockAI-only MVP                                   | Yes      |
| No full 100-table MVP                                | Yes      |
| No missing HIGH ack/note rule                        | Yes      |
| No missing Graph Sync/freshness rule                 | Yes      |

## 15.3. Acceptance Criteria

Patch PC-12 hoàn tất khi:

1. Documentation Owner đã rà từng tài liệu theo checklist.
2. Các lỗi terminology/scope đã sửa.
3. Tài liệu sẵn sàng bước Requirement ID Registry.

---

# 16. Document-by-Document Patch Application Checklist

## Document 01 — Project Overview & Current Baseline

Cần kiểm tra/sửa:

1. AI Audit ghi là MVP.
2. Minimal Admin AI Audit Log screen ghi là MVP hoặc demo evidence UI.
3. Customer Management không phải MVP blocker.
4. Full 100-table database không phải MVP.
5. Catalog data chỉ reference.
6. Graph Sync backend là MVP.
7. Graph Sync Status UI là Should-have.
8. Thuật ngữ Should-have / Future / Commercial Expansion thống nhất.

---

## Document 02 — Project Charter

Cần kiểm tra/sửa:

1. Dedicated demo/staging environment ghi là recommended but unresolved.
2. Release/demo freeze target rõ.
3. Success criteria không thêm scope mới.
4. Project constraints giữ đúng baseline.
5. Không biến full Customer Management thành MVP.
6. Không biến Docker thành official setup path.

---

## Document 03 — Vision & Scope Document

Cần kiểm tra/sửa:

1. Full Customer Management nằm Should-have.
2. Customer portal nằm Future / Commercial Expansion.
3. Database 100 bảng là extended/commercial.
4. AI/Graph là MVP capability.
5. MockAI là fallback.
6. Graph-RAG là module riêng.
7. Scope không quá implementation.

---

## Document 04 — Decision Log & Scope Control

Cần kiểm tra/sửa:

1. Thêm decision về AI Audit UI minimal MVP nếu chưa có.
2. Thêm decision về Graph sourceVersion nếu đã chốt.
3. Thêm replaced decisions:

   * Custom JWT.
   * Aggregate inventory.
   * Medicine-level interaction.
   * MockAI-only.
   * Full 100-table MVP.
4. Unresolved decisions cập nhật:

   * Release/Demo Owner.
   * Backup.
   * Dedicated demo/staging.
   * Testing stack.
   * Capacity.

---

## Document 05 — Business Requirements Document

Cần kiểm tra/sửa:

1. Business requirement không quá kỹ thuật.
2. Customer Management không là MVP blocker.
3. Walk-in/anonymous customer là MVP POS need.
4. AI Audit business need rõ.
5. Graph Sync/Graph-RAG business/technical capability rõ.
6. MedicineBatch là inventory source of truth.
7. Interaction rule ActiveIngredient-level.

---

## Document 06 — SRS

Cần kiểm tra/sửa:

1. Audit backend logging là MVP.
2. AI Audit backend/API/data là MVP.
3. Minimal Admin AI Audit Log screen nếu thuộc UI MVP thì trace sang Doc15.
4. Graph Sync backend là MVP.
5. Graph Sync Status UI/API là Should-have.
6. Business rules có HIGH ack/note.
7. Payment status dùng SUCCESS/FAILED.
8. Order status dùng DRAFT/PAID/CANCELLED.
9. Customer Management scope đúng.
10. Có chỗ sẵn để thêm Requirement ID Registry ở bước tiếp theo.

---

## Document 07 — Roles, Permissions & Authorization

Cần kiểm tra/sửa:

1. Customer không là authenticated MVP user.
2. Staff chỉ own orders.
3. Admin all orders.
4. Warehouse không access POS/Checkout/InteractionAlert/AI sales/Graph-RAG trong MVP.
5. AI Audit Log Admin-only.
6. Graph Sync Status UI permission Should-have.
7. Generic System Audit UI Should-have.

---

## Document 08 — Use Case Specification

Cần kiểm tra/sửa:

1. Customer chỉ là external stakeholder/supporting actor.
2. AI components không là primary human actors.
3. HIGH Alert Handling là use case riêng.
4. Checkout là use case riêng.
5. Graph-RAG là use case riêng.
6. Demo Reset technical/admin use case rõ.
7. Không đưa full Customer Management vào MVP use cases.

---

## Document 09 — UML Diagram Package

Cần kiểm tra/sửa:

1. Overall Use Case Diagram không có AI components như human actors.
2. Customer không authenticated actor.
3. Class diagrams không có custom password auth.
4. Class diagrams không có aggregate inventory source.
5. Class diagrams có MedicineBatch.
6. Class diagrams có ActiveIngredient.
7. Class diagrams có InteractionAlert.
8. Class diagrams có GraphSyncOutbox.
9. Graph Sync Status UI nếu vẽ thì marked Should-have.

---

## Document 10 — System Architecture Document

Cần kiểm tra/sửa:

1. AI Audit backend/API/data là MVP.
2. Graph Sync backend là MVP.
3. Graph Sync Status UI Should-have.
4. AIProviderConfig DB optional nhưng config mandatory.
5. System Audit UI Should-have nhưng backend audit MVP.
6. PostgreSQL source of truth rõ.
7. Neo4j projection rõ.
8. No stale graph silently.

---

## Document 11 — Module Design Document

Cần kiểm tra/sửa:

1. Audit Module ghi backend audit MVP.
2. AI Module ghi AI Audit MVP.
3. Graph Module ghi backend sync/freshness MVP.
4. Graph Sync Status UI/API marked Should-have.
5. Checkout Module là transaction owner.
6. Payment/Invoice modules không có command tách checkout.
7. Inventory Module không direct edit quantity.
8. InteractionAlert Module lưu ack/note.

---

## Document 12 — API Specification

Cần kiểm tra/sửa:

1. Checkout API là command chính.
2. Không dùng `POST /orders/{id}/pay` làm main command.
3. Không có direct invoice creation command cho normal flow.
4. AI Audit APIs MVP nếu minimal UI/API required.
5. Graph Sync Status/retry APIs Should-have.
6. Graph-RAG API không expose raw Cypher.
7. Payment read APIs không thay checkout.
8. InteractionAlert ack/note APIs rõ.
9. Idempotency convention rõ.
10. Error format consistent.

---

## Document 13 — Database Design & ERD

Cần kiểm tra/sửa:

1. Không có password/password_hash.
2. Không có aggregate inventory source of truth.
3. Có MedicineBatch.
4. Có Stock Import/Details.
5. Có Inventory Adjustment/Details.
6. Có Payment SUCCESS partial uniqueness.
7. Có InteractionAlert ack/note/display fields.
8. Có AI Audit Log table.
9. Có AuditLog backend table.
10. Có Graph Sync Outbox/Attempts/ProjectionVersion.
11. Graph-source tables có `version`.
12. Không có ConsultationSession MVP table.
13. Full 100-table schema marked extended/commercial.

---

## Document 14 — Prisma Schema & Migration Design

Cần kiểm tra/sửa:

1. Không có password/password_hash model field.
2. Không model aggregate inventory source.
3. Graph-source models có `version`.
4. AIProviderConfig model optional nếu env config.
5. Provider/model configuration mandatory.
6. Raw SQL constraints/partial indexes được nhắc.
7. No ConsultationSession MVP model.
8. No full 100-table MVP schema.
9. Migration safety rules rõ.

---

## Document 15 — UI/UX Screen Specification

Cần kiểm tra/sửa:

1. Minimal Admin AI Audit Log screen = MVP.
2. Advanced AI observability = Should-have.
3. Graph Sync Status UI = Should-have.
4. System Audit Log UI = Should-have.
5. Staff không thấy low-stock/near-expiry dashboard widgets.
6. MedicineBatch không top-level sidebar.
7. Checkout route/full-height panel, không small modal.
8. Warehouse không thấy POS/InteractionAlert/AI sales/Graph-RAG.
9. Customer không authenticated UI.

---

## Document 16 — AI Architecture, Guardrail & Audit Design

Cần kiểm tra/sửa:

1. AI Audit backend/API/data MVP.
2. Minimal Admin AI Audit Log screen trace sang Doc15.
3. AIProviderConfig DB optional nhưng config mandatory.
4. Google AI Provider preferred.
5. MockAI fallback only.
6. Prompt version recorded.
7. No diagnosis/prescribing/dosage.
8. AI draft không auto-save official note.
9. Graph-RAG là separate module.
10. PostgreSQL fallback khi graph stale.

---

## Document 17 — Knowledge Graph, Neo4j Sync & Graph-RAG Design

Cần kiểm tra/sửa:

1. Graph Sync backend MVP.
2. Graph Sync Status/retry UI Should-have.
3. Graph-source version strategy explicit.
4. Freshness dùng source version + outbox state.
5. No DrugGroup without taxonomy.
6. No Symptom/Condition/RedFlag MVP.
7. No riskScore severity/checkout.
8. No Medicine–Medicine authoritative edge.
9. No raw Cypher for Staff.
10. PostgreSQL fallback rõ.

---

## Document 18 — Data Strategy, Catalog Reference & MVP Seed Plan

Cần kiểm tra/sửa:

1. Đổi ConsultationSessions thành InteractionAlert consultation evidence.
2. Không có separate ConsultationSession table trong MVP.
3. Catalog data reference only.
4. Curated operational seed riêng.
5. No price = 0 for sellable medicine.
6. No raw scraped ingredients as official active ingredients.
7. Graph projection from PostgreSQL, no standalone Cypher official seed.
8. Dynamic expiry dates.
9. FEFO scenario.
10. HIGH interaction scenario.
11. Failed payment scenario.
12. Report-ready paid orders.

---

## Document 19 — Project Management, Jira & Release Plan

Cần kiểm tra/sửa:

1. Minimal AI Audit Log UI story = MVP.
2. Advanced AI observability story = Should-have.
3. Graph Sync backend stories = MVP.
4. Graph Sync Status UI stories = Should-have.
5. System Audit backend story = MVP.
6. System Audit Log UI story = Should-have.
7. Testing stack unresolved but recommended.
8. Dedicated demo/staging unresolved.
9. Release/Demo Owner unresolved.
10. Capacity unresolved.
11. Jira old baseline replacement clear.

---

## Document 20 — Testing, Demo & Setup Guide

Cần kiểm tra/sửa:

1. AI Audit Log UI smoke check.
2. Graph source version/freshness smoke check.
3. Graph Sync backend smoke check.
4. Graph Sync Status UI not required for MVP.
5. System Audit backend checks.
6. Testing stack unresolved wording.
7. No destructive tests against demo DB.
8. `demo:reset` local-only.
9. Browser target Chrome desktop/laptop.
10. Screenshots/Postman/video are contingency evidence only.
11. High-risk tests include Checkout/FEFO/Interaction/AI Guardrail.

---

# 17. Global Search/Replace Checklist

Trước khi export final, search toàn bộ 20 tài liệu:

## 17.1. Search terms cần kiểm tra

```text
Should have
Should Have
Future Scope
AI log
Payment PAID
Order SUCCESS
READY_FOR_CHECKOUT
CRITICAL
ConsultationSessions
custom JWT
password_hash
aggregate inventory
Medicine-level interaction
MockAI-only
MockGraph
/orders/{id}/pay
raw Cypher
100-table MVP
```

## 17.2. Expected action

| Search term                | Action                                                         |
| -------------------------- | -------------------------------------------------------------- |
| Should have / Should Have  | Replace with Should-have                                       |
| Future Scope               | Replace/normalize to Future / Commercial Expansion             |
| AI log                     | Clarify AI Audit Log                                           |
| Payment PAID               | Replace with Payment SUCCESS                                   |
| Order SUCCESS              | Replace with Order PAID                                        |
| READY_FOR_CHECKOUT         | Remove or mark rejected/out of MVP                             |
| CRITICAL                   | Mark Out of Scope                                              |
| ConsultationSessions       | Replace with InteractionAlert consultation evidence            |
| custom JWT                 | Only allowed in rejected/replaced decisions                    |
| password_hash              | Only allowed in rejected/replaced decisions                    |
| aggregate inventory        | Only allowed in rejected/replaced decisions                    |
| Medicine-level interaction | Only allowed as rejected/non-authoritative derived explanation |
| MockAI-only                | Only allowed as rejected pattern                               |
| MockGraph                  | Only allowed as rejected pattern                               |
| /orders/{id}/pay           | Only allowed as rejected/deprecated pattern                    |
| raw Cypher                 | Only allowed as rejected/security restriction                  |
| 100-table MVP              | Replace with extended/commercial design, not MVP               |

---

# 18. Patch Application Order

Áp dụng patch theo thứ tự sau:

```text
1. PC-07 — Chuẩn hóa thuật ngữ toàn cục
2. PC-01 — AI Audit MVP scope
3. PC-02 — Graph sourceVersion/freshness
4. PC-03 — Consultation evidence wording
5. PC-04 — Graph Sync backend vs UI
6. PC-05 — Audit backend vs UI
7. PC-06 — AIProviderConfig wording
8. PC-08 — Customer Management wording
9. PC-09 — 100-table database wording
10. PC-10 — Testing stack unresolved
11. PC-11 — Demo/staging unresolved
12. PC-12 — Final checklist
```

Lý do:

1. Thuật ngữ nên sửa trước để tránh lặp lỗi.
2. AI/Graph/Audit là baseline rủi ro cao.
3. Sau đó mới sửa scope wording.
4. Cuối cùng dùng checklist để rà lại.

---

# 19. Definition of Done for Patch Consistency

Patch Consistency được xem là hoàn tất khi:

1. Document 01–20 không còn wording mâu thuẫn baseline.
2. AI Audit scope đã thống nhất.
3. Graph sourceVersion/freshness đã thống nhất.
4. ConsultationSessions không còn là MVP table/seed group.
5. Graph Sync backend MVP vs UI Should-have đã rõ.
6. Audit backend MVP vs UI Should-have đã rõ.
7. AIProviderConfig wording đã rõ.
8. Customer Management scope đã rõ.
9. 100-table database scope đã rõ.
10. Testing stack unresolved status đã rõ.
11. Demo/staging unresolved status đã rõ.
12. Thuật ngữ Should-have / Future / Commercial Expansion thống nhất.
13. Enum names thống nhất.
14. Không có thiết kế cũ bị cấm quay lại.
15. Bộ tài liệu sẵn sàng cho bước Requirement ID Registry.

---

# 20. Output sau khi áp dụng patch

Sau khi áp dụng patch này, bộ tài liệu cần có trạng thái:

```text
Document 01–20 — Consistency Patched
```

Sau đó mới chuyển sang các bước:

1. Requirement ID Registry.
2. Use Case ID Registry.
3. Test Case ID Registry.
4. Traceability Matrix.
5. Jira Components/Epics/Stories revision.
6. Code Gap Analysis.
7. Implementation critical path planning.

---

# 21. Kết luận

Patch Consistency này là bước khóa đồng bộ cuối cùng trước khi chốt final bộ **20 consolidated documents** của dự án **PharmaAssist AI Intelligence**.

Các patch quan trọng nhất cần áp dụng là:

1. **PC-01 — AI Audit MVP scope.**
2. **PC-02 — Graph sourceVersion & freshness.**
3. **PC-03 — InteractionAlert consultation evidence.**
4. **PC-04 — Graph Sync backend MVP vs UI Should-have.**
5. **PC-05 — Audit backend MVP vs System Audit UI Should-have.**
6. **PC-06 — AIProviderConfig wording.**
7. **PC-07 — Global terminology normalization.**

Sau khi áp dụng xong, bộ Document 01–20 sẽ đủ ổn định để bước sang giai đoạn traceability và Jira implementation planning.
