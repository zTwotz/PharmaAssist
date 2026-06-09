# 5_Sprint.md

# Sprint Plan cho PharmaAssist AI Intelligence

## 1. Mục đích tài liệu

Tài liệu này mô tả kế hoạch Sprint chính thức cho dự án **PharmaAssist AI Intelligence**, dựa trên bộ Jira Task đã được tạo lại từ đầu với prefix **PAC**.

Tài liệu này sử dụng các tài liệu Jira trước đó:

```text
1_Components.md
2_Epic.md
3_Stories.md
4A_Task_List_MVP_Foundation_001_145.md
4A_Task_Description_MVP_Foundation_001_145.md
4B_Task_List_MVP_POS_Interaction_Checkout_146_290.md
4B_Task_Description_MVP_POS_Interaction_Checkout_146_290.md
4C_Task_List_MVP_AI_Graph_Report_Demo_291_435.md
4C_Task_Description_MVP_AI_Graph_Report_Demo_291_435.md
4D_Task_List_Testing_Advanced_Future_436_580.md
4D_Task_Description_Testing_Advanced_Future_436_580.md
```

Mục tiêu của `5_Sprint.md` là:

1. Chia 580 Task thành các sprint/wave thực thi rõ ràng.
2. Phân biệt Task bắt buộc cho MVP với Task Should-have và Future.
3. Xác định dependency và critical path.
4. Hỗ trợ nhóm 4 người phân công công việc.
5. Làm rõ sprint nào là điều kiện hoàn thành MVP.
6. Tránh hiểu nhầm rằng Advanced/Future là blocker trước demo.
7. Chuẩn bị cho `branch-on-jira.md`.

---

## 2. Nguyên tắc lập Sprint

Dự án có deadline rất ngắn, vì vậy Sprint trong tài liệu này được hiểu là **execution sprint / delivery wave**, không nhất thiết là sprint 2 tuần truyền thống.

Các sprint cần được triển khai theo nguyên tắc:

| Nguyên tắc                | Diễn giải                                                  |
| ------------------------- | ---------------------------------------------------------- |
| Ưu tiên MVP trước         | Chỉ các Task MVP mới là điều kiện hoàn thành sản phẩm demo |
| Làm theo dependency       | Auth/DB/Inventory phải đi trước POS/Checkout/AI/Graph      |
| Chia nhỏ cho AI agent     | Task đã chia nhỏ để AI agent có thể code theo từng module  |
| Backend contract trước UI | API/schema/service cần rõ trước khi UI tích hợp            |
| Test song song            | Test không đợi cuối cùng mới làm                           |
| Demo reset bắt buộc       | Demo data, graph rebuild và smoke test là phần bắt buộc    |
| Advanced không chặn MVP   | Sprint 11 chỉ là backlog nâng cao                          |
| Future không code MVP     | Sprint 12 chỉ là documentation/backlog expansion           |

---

## 3. Phân loại Scope tổng thể

| Scope                           |                      Task range | Số Task | Ý nghĩa                                                                                    |
| ------------------------------- | ------------------------------: | ------: | ------------------------------------------------------------------------------------------ |
| MVP Execution                   | `PAC-TASK-001` → `PAC-TASK-435` |     435 | Core product implementation: Auth, Inventory, POS, Checkout, AI, Graph, Reports, Demo Data |
| MVP Testing / Release Readiness | `PAC-TASK-436` → `PAC-TASK-525` |      90 | Test, CI, setup, documentation, release/demo readiness                                     |
| Should-have / Advanced Backlog  | `PAC-TASK-526` → `PAC-TASK-555` |      30 | Advanced UI/features, không chặn MVP                                                       |
| Future / Commercial Expansion   | `PAC-TASK-556` → `PAC-TASK-580` |      25 | Future documentation/backlog, không implement trong MVP                                    |
| **Tổng**                        | `PAC-TASK-001` → `PAC-TASK-580` | **580** | Toàn bộ Jira Task set                                                                      |

Kết luận scope:

```text
MVP completion gate = PAC-TASK-001 → PAC-TASK-525
Advanced backlog = PAC-TASK-526 → PAC-TASK-555
Future backlog = PAC-TASK-556 → PAC-TASK-580
```

---

## 4. Team assumption

Team chính thức có **4 thành viên**. Vì capacity cụ thể từng người chưa được xác nhận, tài liệu này dùng role phân công tạm thời theo năng lực/module.

| Ký hiệu  | Vai trò đề xuất                  | Trách nhiệm chính                                                                  |
| -------- | -------------------------------- | ---------------------------------------------------------------------------------- |
| Member A | Backend / Database Lead          | Prisma schema, NestJS API, transaction, Auth/RBAC, Inventory, Checkout             |
| Member B | Frontend Lead                    | Next.js UI, POS, dashboard, forms, invoice, settings, AI/Graph UI                  |
| Member C | AI / Graph Lead                  | Google AI, MockAI, Guardrail, Audit, Graph Sync, Neo4j, Graph-RAG                  |
| Member D | QA / DevOps / Documentation Lead | Testing, CI, setup guide, demo reset, smoke test, documentation, release checklist |

Ghi chú:

```text
Tên thành viên thật sẽ được điền sau trong Jira.
Không được assume 4 người có capacity bằng nhau.
Sprint commitment phải dựa trên task-hour thực tế nếu nhóm có estimate.
```

---

## 5. Tổng quan Sprint

| Sprint    | Scope       |                      Task range | Mục tiêu chính                                                     | MVP Gate |
| --------- | ----------- | ------------------------------: | ------------------------------------------------------------------ | -------- |
| Sprint 1  | MVP         | `PAC-TASK-001` → `PAC-TASK-052` | Auth, Supabase, RBAC, User Account                                 | Có       |
| Sprint 2  | MVP         | `PAC-TASK-053` → `PAC-TASK-101` | Medicine, ActiveIngredient, Supplier                               | Có       |
| Sprint 3  | MVP         | `PAC-TASK-102` → `PAC-TASK-160` | MedicineBatch, Inventory Summary, Stock Import                     | Có       |
| Sprint 4  | MVP         | `PAC-TASK-161` → `PAC-TASK-226` | Inventory Adjustment, POS Draft Order                              | Có       |
| Sprint 5  | MVP         | `PAC-TASK-227` → `PAC-TASK-258` | DrugInteraction Rule, InteractionAlert, HIGH Alert handling        | Có       |
| Sprint 6  | MVP         | `PAC-TASK-259` → `PAC-TASK-290` | Checkout, FEFO, Payment, Invoice                                   | Có       |
| Sprint 7  | MVP         | `PAC-TASK-291` → `PAC-TASK-355` | AI Copilot, Google AI, MockAI, Guardrail, Audit, Prompt Versioning | Có       |
| Sprint 8  | MVP         | `PAC-TASK-356` → `PAC-TASK-390` | Graph Sync, Neo4j Projection, Freshness Detection                  | Có       |
| Sprint 9  | MVP         | `PAC-TASK-391` → `PAC-TASK-424` | Graph-RAG, Reports, System Settings                                | Có       |
| Sprint 10 | MVP Release | `PAC-TASK-425` → `PAC-TASK-525` | Demo Data, Demo Reset, Testing, CI, Setup, Docs, Release Readiness | Có       |
| Sprint 11 | Advanced    | `PAC-TASK-526` → `PAC-TASK-555` | Should-have / Advanced features                                    | Không    |
| Sprint 12 | Future      | `PAC-TASK-556` → `PAC-TASK-580` | Future / Commercial Expansion backlog                              | Không    |

---

# 6. MVP Execution Sprint Plan

---

## Sprint 1 — Auth, Supabase Auth, RBAC & User Account

### Task range

```text
PAC-TASK-001 → PAC-TASK-052
```

### Mục tiêu Sprint

Xây nền tảng đăng nhập, session, phân quyền và tài khoản người dùng nội bộ.

### Epic liên quan

```text
PAC-EPIC-01 — Authentication & RBAC
PAC-EPIC-02 — Admin / User Management
PAC-EPIC-19 — Testing & Setup
```

### Story group

```text
US-01 → US-12
```

### Nội dung chính

| Nhóm việc                                  |                      Task range |
| ------------------------------------------ | ------------------------------: |
| Supabase Auth frontend                     | `PAC-TASK-001` → `PAC-TASK-008` |
| Supabase token validation backend          | `PAC-TASK-009` → `PAC-TASK-012` |
| User profile, roles, permissions schema    | `PAC-TASK-013` → `PAC-TASK-023` |
| Permission decorator/guard                 | `PAC-TASK-024` → `PAC-TASK-030` |
| Permission-aware UI                        | `PAC-TASK-031` → `PAC-TASK-034` |
| Staff ownership and Warehouse restrictions | `PAC-TASK-035` → `PAC-TASK-040` |
| Admin staff account management             | `PAC-TASK-041` → `PAC-TASK-052` |

### Phân công đề xuất

| Member   | Công việc chính                                                             |
| -------- | --------------------------------------------------------------------------- |
| Member A | Supabase backend validation, Prisma RBAC schema, AuthGuard, PermissionGuard |
| Member B | Login UI, route guard, sidebar permission UI                                |
| Member C | Hỗ trợ permission model nếu cần cho AI/Graph access sau này                 |
| Member D | Auth/RBAC smoke test, checklist, test cases                                 |

### Dependency

Không phụ thuộc sprint trước.

### Definition of Done

* User đăng nhập bằng Supabase Auth.
* Backend validate Supabase token.
* Có `user_profiles`, roles, permissions, user_roles, role_permissions.
* API protected trả 401/403 đúng.
* Sidebar và action button hiển thị theo permission.
* Admin tạo staff account được.
* First-login password change flow có nền tảng.
* Không có custom JWT/password hash.

### Out-of-scope guard

```text
Không tạo custom username/password auth.
Không lưu password_hash trong PostgreSQL.
Không dùng role-only authorization bỏ qua permission.
```

---

## Sprint 2 — Medicine, ActiveIngredient & Supplier

### Task range

```text
PAC-TASK-053 → PAC-TASK-101
```

### Mục tiêu Sprint

Xây dữ liệu nền cho thuốc, hoạt chất, mapping thuốc-hoạt chất và nhà cung cấp.

### Epic liên quan

```text
PAC-EPIC-03 — Medicine & ActiveIngredient
PAC-EPIC-04 — Supplier
PAC-EPIC-21 — Documentation
```

### Story group

```text
US-13 → US-26
```

### Nội dung chính

| Nhóm việc                         |                      Task range |
| --------------------------------- | ------------------------------: |
| Medicine schema/API/UI            | `PAC-TASK-053` → `PAC-TASK-071` |
| ActiveIngredient schema/API/UI    | `PAC-TASK-072` → `PAC-TASK-077` |
| Medicine–ActiveIngredient mapping | `PAC-TASK-078` → `PAC-TASK-089` |
| Supplier schema/API/UI            | `PAC-TASK-090` → `PAC-TASK-101` |

### Phân công đề xuất

| Member   | Công việc chính                                  |
| -------- | ------------------------------------------------ |
| Member A | Prisma models, Medicine/Ingredient/Supplier APIs |
| Member B | Medicine UI, ActiveIngredient UI, Supplier UI    |
| Member C | Mapping chuẩn bị cho Interaction/Graph Sync      |
| Member D | API tests, data quality checklist                |

### Dependency

Phụ thuộc Sprint 1:

```text
AuthGuard
PermissionGuard
User roles/permissions
```

### Definition of Done

* Medicine CRUD hoạt động.
* `selling_price > 0` được enforce.
* ActiveIngredient CRUD hoạt động.
* Medicine–ActiveIngredient mapping hoạt động.
* Supplier CRUD hoạt động.
* Inactive supplier không dùng cho Stock Import mới.
* Graph sync event được chuẩn bị cho Medicine/Ingredient/Mapping changes.

### Out-of-scope guard

```text
Không dùng product_variant_id làm sales key MVP.
Không dùng raw scraped ingredient string làm official mapping.
Không dùng Medicine–Medicine rule làm source of truth.
```

---

## Sprint 3 — MedicineBatch, Inventory Summary & Stock Import

### Task range

```text
PAC-TASK-102 → PAC-TASK-160
```

### Mục tiêu Sprint

Xây inventory source of truth bằng `MedicineBatch` và hoàn thiện Stock Import theo transaction.

### Epic liên quan

```text
PAC-EPIC-05 — Inventory & MedicineBatch
PAC-EPIC-06 — Stock Import
PAC-EPIC-19 — Testing & Setup
```

### Story group

```text
US-27 → US-48
```

### Nội dung chính

| Nhóm việc                                            |                      Task range |
| ---------------------------------------------------- | ------------------------------: |
| MedicineBatch schema/source-of-truth                 | `PAC-TASK-102` → `PAC-TASK-111` |
| Inventory Summary / Batch Detail / sellable quantity | `PAC-TASK-112` → `PAC-TASK-130` |
| Stock Import draft/lines/confirm base                | `PAC-TASK-131` → `PAC-TASK-145` |
| Stock Import merge/mismatch/immutability/audit/tests | `PAC-TASK-146` → `PAC-TASK-160` |

### Phân công đề xuất

| Member   | Công việc chính                                                |
| -------- | -------------------------------------------------------------- |
| Member A | MedicineBatch schema, Stock Import transaction                 |
| Member B | Inventory Summary, Batch Detail, Stock Import UI               |
| Member C | Graph sync event alignment for inventory-related Medicine data |
| Member D | Batch identity, merge, expiry mismatch, smoke tests            |

### Dependency

Phụ thuộc Sprint 2:

```text
Medicine
Supplier
ActiveIngredient mapping optional for later interaction
```

### Definition of Done

* MedicineBatch là inventory source of truth.
* Batch number và expiry date bắt buộc.
* Sellable quantity loại expired batch.
* Inventory Summary tính từ MedicineBatch.
* Stock Import Draft tạo được.
* Confirm Stock Import chạy transaction.
* Merge batch chỉ khi medicine/batch/expiry trùng.
* Expiry mismatch bị reject.
* Confirmed Stock Import read-only.
* Không có direct quantity edit.

### Out-of-scope guard

```text
Không dùng aggregate inventory làm source of truth.
Không sửa trực tiếp MedicineBatch quantity.
Không merge batch nếu expiry mismatch.
```

---

## Sprint 4 — Inventory Adjustment & POS Draft Order

### Task range

```text
PAC-TASK-161 → PAC-TASK-226
```

### Mục tiêu Sprint

Xây workflow điều chỉnh tồn kho có audit và tạo POS Draft Order để chuẩn bị checkout.

### Epic liên quan

```text
PAC-EPIC-07 — Inventory Adjustment
PAC-EPIC-08 — POS & Checkout
PAC-EPIC-19 — Testing & Setup
```

### Story group

```text
US-49 → US-68
```

### Nội dung chính

| Nhóm việc                          |                      Task range |
| ---------------------------------- | ------------------------------: |
| Inventory Adjustment schema/API/UI | `PAC-TASK-161` → `PAC-TASK-190` |
| POS Order schema/API/UI            | `PAC-TASK-191` → `PAC-TASK-226` |

### Phân công đề xuất

| Member   | Công việc chính                              |
| -------- | -------------------------------------------- |
| Member A | Adjustment transaction, Order/OrderItem APIs |
| Member B | Adjustment UI, POS Draft Order UI            |
| Member C | Hỗ trợ interaction trigger points trong POS  |
| Member D | Adjustment/POS tests and smoke checklist     |

### Dependency

Phụ thuộc Sprint 3:

```text
MedicineBatch
Inventory Summary
Sellable quantity
Stock Import
```

### Definition of Done

* Inventory Adjustment có reason bắt buộc.
* Confirm Adjustment cập nhật MedicineBatch trong transaction.
* Không cho quantity âm.
* Confirmed Adjustment read-only.
* POS tạo Draft Order được.
* POS search medicine active.
* POS hiển thị sellable stock.
* Add/update/remove item hoạt động.
* Walk-in customer được hỗ trợ.
* Staff ownership scope được áp dụng.
* Checkout failure giữ lại Draft Order.

### Out-of-scope guard

```text
Không có full Customer Management trong MVP POS.
Không có coupon/discount trong Draft Order total.
Không cho Warehouse dùng POS.
```

---

## Sprint 5 — DrugInteraction Rule & InteractionAlert

### Task range

```text
PAC-TASK-227 → PAC-TASK-258
```

### Mục tiêu Sprint

Xây rule tương tác thuốc cấp ActiveIngredient và persisted InteractionAlert lifecycle.

### Epic liên quan

```text
PAC-EPIC-09 — DrugInteraction Rule
PAC-EPIC-10 — InteractionAlert
PAC-EPIC-19 — Testing & Setup
```

### Story group

```text
US-69 → US-82
```

### Nội dung chính

| Nhóm việc                               |                      Task range |
| --------------------------------------- | ------------------------------: |
| DrugInteraction Rule                    | `PAC-TASK-227` → `PAC-TASK-236` |
| Order interaction check service/API     | `PAC-TASK-237` → `PAC-TASK-238` |
| InteractionAlert persistence/lifecycle  | `PAC-TASK-239` → `PAC-TASK-244` |
| HIGH acknowledgement/note/blocker       | `PAC-TASK-245` → `PAC-TASK-251` |
| Alert history/access/tests/traceability | `PAC-TASK-252` → `PAC-TASK-258` |

### Phân công đề xuất

| Member   | Công việc chính                                      |
| -------- | ---------------------------------------------------- |
| Member A | Interaction rule API, InteractionAlert model/service |
| Member B | InteractionAlert panel, HIGH acknowledge/note UI     |
| Member C | Align rule changes with Graph Sync events            |
| Member D | HIGH alert tests, Warehouse no-access tests          |

### Dependency

Phụ thuộc Sprint 2 và Sprint 4:

```text
ActiveIngredient
Medicine–ActiveIngredient mapping
POS Draft Order
OrderItem
```

### Definition of Done

* DrugInteractionRule dùng ActiveIngredient–ActiveIngredient.
* Severity chỉ gồm LOW/MEDIUM/HIGH.
* Interaction check theo order.
* InteractionAlert được persist.
* Snapshot fields được lưu.
* `display_count` và `last_displayed_at` hoạt động.
* Mỗi order/rule chỉ có một active alert.
* HIGH alert cần acknowledgement.
* HIGH alert cần consultation note.
* Checkout bị block nếu HIGH unresolved.
* Warehouse không truy cập InteractionAlert.

### Out-of-scope guard

```text
Không dùng Medicine–Medicine rule làm source of truth.
Không có CRITICAL severity trong MVP.
Không chỉ hiển thị alert tạm mà không persist.
Không cho HIGH alert checkout nếu thiếu acknowledgement hoặc consultation note.
```

---

## Sprint 6 — Checkout, FEFO, Payment & Invoice

### Task range

```text
PAC-TASK-259 → PAC-TASK-290
```

### Mục tiêu Sprint

Xây checkout transaction chính thức, FEFO allocation, payment và invoice.

### Epic liên quan

```text
PAC-EPIC-11 — Checkout, FEFO, Payment & Invoice
PAC-EPIC-19 — Testing & Setup
```

### Story group

```text
US-83 → US-98
```

### Nội dung chính

| Nhóm việc                |                      Task range |
| ------------------------ | ------------------------------: |
| Checkout DTO/API/service | `PAC-TASK-259` → `PAC-TASK-267` |
| FEFO allocation          | `PAC-TASK-268` → `PAC-TASK-275` |
| Idempotency              | `PAC-TASK-276` → `PAC-TASK-278` |
| Payment                  | `PAC-TASK-279` → `PAC-TASK-284` |
| Invoice                  | `PAC-TASK-285` → `PAC-TASK-288` |
| Checkout/FEFO tests      | `PAC-TASK-289` → `PAC-TASK-290` |

### Phân công đề xuất

| Member   | Công việc chính                                     |
| -------- | --------------------------------------------------- |
| Member A | CheckoutService transaction, FEFO, Payment, Invoice |
| Member B | Checkout UI, payment selector, invoice view/print   |
| Member C | Ensure Graph/AI not used for checkout decision      |
| Member D | Checkout, FEFO, idempotency, rollback tests         |

### Dependency

Phụ thuộc Sprint 3, Sprint 4 và Sprint 5:

```text
MedicineBatch
Sellable quantity
Draft Order
InteractionAlert
HIGH alert acknowledgement/note
```

### Definition of Done

* `POST /checkout` là checkout flow chính thức.
* Checkout chạy trong transaction.
* Validate order status DRAFT.
* Validate ownership/permission.
* Validate HIGH alerts resolved.
* Validate stock trong transaction.
* FEFO chọn batch gần hết hạn trước.
* Multi-batch allocation hoạt động.
* Expired batch bị loại.
* Payment tạo trong transaction.
* Mỗi order chỉ có một SUCCESS payment.
* Invoice tạo trong transaction.
* Order chỉ chuyển PAID sau khi checkout thành công.
* Rollback nếu bất kỳ bước nào lỗi.
* Idempotency chống double-submit.

### Out-of-scope guard

```text
Không dùng /orders/{id}/pay làm flow chính.
Không tạo payment/invoice ngoài checkout transaction.
Không để Neo4j quyết định checkout.
Không có refund/return workflow trong MVP.
```

---

## Sprint 7 — AI Copilot, Google AI, MockAI, Guardrail, Audit

### Task range

```text
PAC-TASK-291 → PAC-TASK-355
```

### Mục tiêu Sprint

Xây AI Copilot an toàn, có Google AI primary, MockAI fallback, guardrail, audit và prompt versioning.

### Epic liên quan

```text
PAC-EPIC-12 — AI Copilot
PAC-EPIC-13 — AI Guardrail & Audit
PAC-EPIC-17 — System Settings / AI Config
PAC-EPIC-19 — Testing & Setup
```

### Story group

```text
US-99 → US-116
US-142 → US-143
```

### Nội dung chính

| Nhóm việc                                        |                      Task range |
| ------------------------------------------------ | ------------------------------: |
| Provider abstraction, Google AI, MockAI fallback | `PAC-TASK-291` → `PAC-TASK-297` |
| AI explanation and note draft                    | `PAC-TASK-298` → `PAC-TASK-307` |
| Safe follow-up questions                         | `PAC-TASK-308` → `PAC-TASK-310` |
| AI permission guards                             | `PAC-TASK-311` → `PAC-TASK-315` |
| Input guardrail                                  | `PAC-TASK-316` → `PAC-TASK-323` |
| Output guardrail/schema validation               | `PAC-TASK-324` → `PAC-TASK-328` |
| AI Audit Log                                     | `PAC-TASK-329` → `PAC-TASK-337` |
| Prompt templates/versioning/config               | `PAC-TASK-338` → `PAC-TASK-345` |
| AI tests/traceability                            | `PAC-TASK-346` → `PAC-TASK-355` |

### Phân công đề xuất

| Member   | Công việc chính                                         |
| -------- | ------------------------------------------------------- |
| Member A | AI APIs, audit model, permission guards                 |
| Member B | AI explanation/draft UI, disclaimer, fallback states    |
| Member C | Google AI adapter, MockAI, guardrail, prompt versioning |
| Member D | AI guardrail/audit/fallback tests                       |

### Dependency

Phụ thuộc Sprint 5:

```text
InteractionAlert
HIGH alert consultation note
Order context
```

### Definition of Done

* Google AI là provider chính.
* MockAI fallback hoạt động khi Google AI lỗi.
* AI không chẩn đoán/kê đơn/đưa liều cụ thể.
* Input guardrail và output guardrail hoạt động.
* AI explanation hiển thị với disclaimer.
* AI draft không tự lưu official note.
* Staff phải confirm note.
* AI Audit ghi provider/model/prompt/guardrail/fallback/latency.
* AI Audit không lưu raw PII.
* Prompt có version.

### Out-of-scope guard

```text
Không làm MockAI-only MVP.
Không cho AI tự động lưu consultation note.
Không lưu raw PII trong AI Audit.
Không expose AI API key frontend.
```

---

## Sprint 8 — Graph Sync, Neo4j Projection & Freshness

### Task range

```text
PAC-TASK-356 → PAC-TASK-390
```

### Mục tiêu Sprint

Xây Graph Sync outbox/worker, Neo4j projection và graph freshness detection.

### Epic liên quan

```text
PAC-EPIC-14 — Graph Sync & Neo4j Projection
PAC-EPIC-19 — Testing & Setup
PAC-EPIC-21 — Documentation
```

### Story group

```text
US-117 → US-128
```

### Nội dung chính

| Nhóm việc                              |                      Task range |
| -------------------------------------- | ------------------------------: |
| Graph sync outbox model/events         | `PAC-TASK-356` → `PAC-TASK-361` |
| Worker, Neo4j connection, job claiming | `PAC-TASK-362` → `PAC-TASK-365` |
| Node/relationship projection           | `PAC-TASK-366` → `PAC-TASK-375` |
| Retry/failure/audit                    | `PAC-TASK-376` → `PAC-TASK-379` |
| Source version/freshness               | `PAC-TASK-380` → `PAC-TASK-384` |
| Graph tests/traceability               | `PAC-TASK-385` → `PAC-TASK-390` |

### Phân công đề xuất

| Member   | Công việc chính                                       |
| -------- | ----------------------------------------------------- |
| Member A | Outbox schema, source event emission                  |
| Member B | Không chính, chỉ hỗ trợ UI/debug nếu cần              |
| Member C | Neo4j service, projection handlers, freshness service |
| Member D | Graph Sync tests, retry/failure/freshness validation  |

### Dependency

Phụ thuộc Sprint 2, Sprint 5 và Sprint 7:

```text
Medicine
ActiveIngredient
Medicine–ActiveIngredient mapping
DrugInteractionRule
AI/Graph-RAG needs
```

### Definition of Done

* GraphSyncOutbox có status/retry/error.
* Medicine/ActiveIngredient/Mapping/InteractionRule thay đổi tạo outbox event.
* Worker xử lý job.
* Neo4j có Medicine node.
* Neo4j có ActiveIngredient node.
* Neo4j có CONTAINS relationship.
* Neo4j có INTERACTS_WITH relationship.
* Edge có ruleId/severity/description/recommendation.
* Deactivated data set `isActive=false`.
* Normal graph query chỉ dùng active data.
* Retry/failure logging hoạt động.
* Freshness detection phát hiện pending/failed/missing sourceVersion.

### Out-of-scope guard

```text
Không dùng Neo4j làm source of truth.
Không dùng standalone Cypher seed làm official sync.
Không tạo Medicine–Medicine authoritative edge.
Không suy DrugGroup từ MedicineCategory.
Không dùng riskScore cho checkout/severity.
```

---

## Sprint 9 — Graph-RAG, Reports & System Settings

### Task range

```text
PAC-TASK-391 → PAC-TASK-424
```

### Mục tiêu Sprint

Xây Graph-RAG có provenance/freshness/fallback, đồng thời hoàn thiện Reports và System Settings MVP.

### Epic liên quan

```text
PAC-EPIC-15 — Graph-RAG
PAC-EPIC-16 — Reports
PAC-EPIC-17 — System Settings
PAC-EPIC-19 — Testing & Setup
```

### Story group

```text
US-129 → US-144
```

### Nội dung chính

| Nhóm việc                                       |                      Task range |
| ----------------------------------------------- | ------------------------------: |
| Graph-RAG service/query/context                 | `PAC-TASK-391` → `PAC-TASK-395` |
| Provenance/freshness metadata                   | `PAC-TASK-396` → `PAC-TASK-399` |
| PostgreSQL fallback/safe error/raw Cypher guard | `PAC-TASK-400` → `PAC-TASK-410` |
| Reports                                         | `PAC-TASK-411` → `PAC-TASK-419` |
| System Settings near-expiry threshold           | `PAC-TASK-420` → `PAC-TASK-424` |

### Phân công đề xuất

| Member   | Công việc chính                                            |
| -------- | ---------------------------------------------------------- |
| Member A | PostgreSQL fallback, Reports APIs, System Settings APIs    |
| Member B | Graph-RAG metadata UI, Reports UI, Settings UI             |
| Member C | Graph-RAG service, allowlisted queries, freshness/fallback |
| Member D | Graph-RAG fallback tests, report tests, settings tests     |

### Dependency

Phụ thuộc Sprint 8 và Sprint 6:

```text
Graph Sync
Neo4j projection
InteractionAlert
Paid orders
MedicineBatch
```

### Definition of Done

* Graph-RAG không nhận raw Cypher từ Staff.
* Graph-RAG dùng allowlisted query templates.
* Response có `graphUsed`.
* Response có provenance metadata.
* Response có freshness metadata.
* Neo4j unavailable thì fallback PostgreSQL cho interaction explanation.
* Graph stale thì fallback PostgreSQL.
* Graph-only query không fallback được thì trả safe error.
* Graph không quyết định checkout.
* Revenue Report deterministic.
* Top Medicines Report deterministic.
* Inventory Report từ MedicineBatch.
* System Settings có near-expiry threshold default 90 ngày.

### Out-of-scope guard

```text
Không dùng stale graph âm thầm.
Không cho Staff submit raw Cypher.
Không để AI/Graph tự tính doanh thu thay deterministic report.
Không đưa AI Business Narrative vào MVP mandatory report.
```

---

## Sprint 10 — Demo Data, Demo Reset, Testing, CI, Setup, Documentation & Release Readiness

### Task range

```text
PAC-TASK-425 → PAC-TASK-525
```

### Mục tiêu Sprint

Hoàn thiện dữ liệu demo, demo reset, kiểm thử, CI, setup guide, documentation và release readiness.

### Epic liên quan

```text
PAC-EPIC-18 — Data & Demo
PAC-EPIC-19 — Testing & Setup
PAC-EPIC-20 — DevOps & CI
PAC-EPIC-21 — Documentation
```

### Story group

```text
US-145 → US-150
```

### Nội dung chính

| Nhóm việc                           |                      Task range |
| ----------------------------------- | ------------------------------: |
| Demo data and demo reset            | `PAC-TASK-425` → `PAC-TASK-435` |
| Automated and high-risk testing     | `PAC-TASK-436` → `PAC-TASK-480` |
| Setup/DevOps/CI                     | `PAC-TASK-481` → `PAC-TASK-505` |
| Documentation and release readiness | `PAC-TASK-506` → `PAC-TASK-525` |

### Phân công đề xuất

| Member   | Công việc chính                                             |
| -------- | ----------------------------------------------------------- |
| Member A | Fix backend bugs found by tests, migration/seed readiness   |
| Member B | Fix UI bugs, demo scripts for UI flows                      |
| Member C | Graph/AI demo reset, fallback validation                    |
| Member D | Test suite, CI, setup docs, release checklist, smoke report |

### Dependency

Phụ thuộc tất cả Sprint MVP trước:

```text
Sprint 1 → Sprint 9
```

### Definition of Done

* Curated MVP seed data có đủ Auth, Medicine, Batch, Supplier, Interaction, Orders, Reports.
* Demo users theo role hoạt động.
* Dynamic expiry dates hoạt động.
* FEFO multi-batch scenario có dữ liệu.
* PAID order with handled HIGH alert có dữ liệu.
* `demo:reset` chỉ chạy local.
* Demo reset rebuild Neo4j projection.
* Smoke tests chạy sau demo reset.
* CI có lint, type check, unit tests, integration tests, Prisma validation, migration check, frontend build, backend build.
* README/setup docs hoàn chỉnh.
* Demo scripts hoàn chỉnh.
* Release readiness checklist hoàn chỉnh.
* Final smoke test report template có sẵn.

### Out-of-scope guard

```text
Không chạy destructive tests trên demo/staging/production database.
Không biến Docker thành official setup path.
Không xem screenshots/video là thay thế running product.
Không bắt buộc full cross-browser testing.
```

---

# 7. Advanced Backlog

## Sprint 11 — Should-have / Advanced Backlog

### Task range

```text
PAC-TASK-526 → PAC-TASK-555
```

### Scope

```text
Should-have / Advanced
```

### MVP Gate

```text
Không
```

### Mục tiêu

Sprint này chứa các tính năng nâng cao có giá trị, nhưng **không phải điều kiện hoàn thành MVP**.

### Nội dung chính

| Nhóm                         |                      Task range | Ghi chú     |
| ---------------------------- | ------------------------------: | ----------- |
| Admin Graph Sync Status      | `PAC-TASK-526` → `PAC-TASK-530` | Should-have |
| Graph Explorer               | `PAC-TASK-531` → `PAC-TASK-535` | Should-have |
| AI Provider Settings UI      | `PAC-TASK-536` → `PAC-TASK-537` | Should-have |
| Prompt Management UI         | `PAC-TASK-538` → `PAC-TASK-540` | Should-have |
| System Audit Log UI          | `PAC-TASK-541` → `PAC-TASK-542` | Should-have |
| Supabase Storage             | `PAC-TASK-543` → `PAC-TASK-545` | Should-have |
| Supabase Realtime            | `PAC-TASK-546` → `PAC-TASK-548` | Should-have |
| Notification / Scheduled Job | `PAC-TASK-549` → `PAC-TASK-553` | Should-have |
| AI Business Report Narrative | `PAC-TASK-554` → `PAC-TASK-555` | Should-have |

### Điều kiện triển khai

Chỉ triển khai Sprint 11 nếu:

1. MVP Sprint 1–10 đã đạt release readiness.
2. Critical bugs đã được xử lý.
3. Team còn thời gian trước demo.
4. Project Leader đồng ý đưa vào demo.

### Out-of-scope guard

```text
Không để Sprint 11 làm chậm MVP release.
Không xem Advanced UI là bắt buộc để hoàn thành MVP.
Không thay backend mandatory feature bằng Advanced UI.
```

---

# 8. Future Backlog

## Sprint 12 — Future / Commercial Expansion Backlog

### Task range

```text
PAC-TASK-556 → PAC-TASK-580
```

### Scope

```text
Future / Commercial Expansion
```

### MVP Gate

```text
Không
```

### Mục tiêu

Sprint này không phải sprint code MVP. Đây là nhóm Task ghi nhận future scope, commercial expansion và out-of-scope guardrails.

### Nội dung chính

| Nhóm                                  |                      Task range | Ghi chú              |
| ------------------------------------- | ------------------------------: | -------------------- |
| Full Customer Management              | `PAC-TASK-556` → `PAC-TASK-558` | Future               |
| Online Commerce                       | `PAC-TASK-559` → `PAC-TASK-561` | Future               |
| Product Variant Catalog               | `PAC-TASK-562` → `PAC-TASK-564` | Future               |
| Multi-store                           | `PAC-TASK-565` → `PAC-TASK-566` | Future               |
| Multi-warehouse                       | `PAC-TASK-567` → `PAC-TASK-568` | Future               |
| Stock Transfer                        | `PAC-TASK-569` → `PAC-TASK-570` | Future               |
| Forecasting                           | `PAC-TASK-571` → `PAC-TASK-572` | Future               |
| Promotion / Coupon                    | `PAC-TASK-573` → `PAC-TASK-574` | Future               |
| Shipping / Delivery                   | `PAC-TASK-575` → `PAC-TASK-576` | Future               |
| Review / CMS                          | `PAC-TASK-577` → `PAC-TASK-578` | Future               |
| Commercial dependency / AI guardrails | `PAC-TASK-579` → `PAC-TASK-580` | Future documentation |

### Điều kiện triển khai

Không triển khai code cho Sprint 12 trong MVP.

Sprint 12 chỉ dùng để:

1. Ghi backlog.
2. Ghi scope guardrails.
3. Ghi dependency future.
4. Tránh AI agent tự thêm chức năng ngoài scope.

### Out-of-scope guard

```text
Không implement online storefront/cart/wishlist trong MVP.
Không dùng ProductVariant làm sales key MVP.
Không implement multi-store/multi-warehouse workflow trong MVP.
Không implement stock transfer trong MVP.
Không implement promotion/coupon trong MVP checkout.
Không implement shipping/delivery trong MVP.
Không implement review/CMS trong MVP.
```

---

# 9. Critical Path MVP

Critical path là chuỗi công việc nếu trễ sẽ ảnh hưởng trực tiếp đến demo MVP.

```text
Sprint 1: Auth / RBAC
→ Sprint 2: Medicine / ActiveIngredient / Supplier
→ Sprint 3: MedicineBatch / Stock Import
→ Sprint 4: POS Draft Order
→ Sprint 5: InteractionAlert
→ Sprint 6: Checkout / FEFO / Payment / Invoice
→ Sprint 7: AI Guardrail / AI Audit / AI Copilot
→ Sprint 8: Graph Sync / Neo4j Projection
→ Sprint 9: Graph-RAG / Reports / Settings
→ Sprint 10: Demo Reset / CI / Smoke Test / Documentation
```

## Critical modules

| Module                 | Vì sao critical                        |
| ---------------------- | -------------------------------------- |
| Auth / RBAC            | Không có thì không thể bảo vệ hệ thống |
| MedicineBatch          | Source of truth cho tồn kho            |
| Stock Import           | Dữ liệu tồn kho bắt đầu từ đây         |
| POS Draft Order        | Luồng bán hàng bắt đầu từ đây          |
| InteractionAlert       | Điểm an toàn thuốc chính               |
| Checkout               | Luồng nghiệp vụ quan trọng nhất        |
| FEFO                   | Điều kiện inventory correctness        |
| Payment / Invoice      | Điều kiện order PAID hợp lệ            |
| AI Guardrail / Audit   | Điều kiện dùng AI an toàn              |
| Graph Sync / Graph-RAG | Điểm kỹ thuật nổi bật                  |
| Demo Reset             | Điều kiện demo tái lập                 |
| Smoke Test             | Điều kiện release/demo approval        |

---

# 10. Parallel Execution Plan cho nhóm 4 người

Vì deadline ngắn, nhóm không nên làm tuần tự hoàn toàn. Một số sprint có thể chạy song song theo dependency.

## Wave A — Foundation

| Member   | Việc                                       |
| -------- | ------------------------------------------ |
| Member A | Auth backend, Prisma RBAC                  |
| Member B | Login/layout/sidebar                       |
| Member C | Chuẩn bị AI/Graph config skeleton          |
| Member D | Setup test structure, Auth smoke checklist |

## Wave B — Core Data

| Member   | Việc                                        |
| -------- | ------------------------------------------- |
| Member A | MedicineBatch, Stock Import transaction     |
| Member B | Medicine/Inventory/Supplier UI              |
| Member C | ActiveIngredient mapping, graph event hooks |
| Member D | Batch identity, stock import tests          |

## Wave C — POS + Safety

| Member   | Việc                                              |
| -------- | ------------------------------------------------- |
| Member A | POS APIs, InteractionAlert, Checkout              |
| Member B | POS UI, HIGH alert UI, Checkout UI, Invoice UI    |
| Member C | Interaction rule alignment, AI draft entry points |
| Member D | POS/Interaction/Checkout/FEFO tests               |

## Wave D — AI + Graph

| Member   | Việc                                        |
| -------- | ------------------------------------------- |
| Member A | AI APIs, audit schema, fallback support     |
| Member B | AI/Graph metadata UI                        |
| Member C | Google AI, Guardrail, Graph Sync, Graph-RAG |
| Member D | AI/Graph safety tests                       |

## Wave E — Release

| Member   | Việc                                          |
| -------- | --------------------------------------------- |
| Member A | Fix backend critical bugs                     |
| Member B | Fix frontend critical bugs                    |
| Member C | Verify AI/Graph fallback                      |
| Member D | CI, demo reset, smoke test, release checklist |

---

# 11. MVP Release Gate

MVP chỉ được xem là sẵn sàng demo khi đạt các điều kiện sau.

## 11.1. Functional Gate

| Gate                 | Điều kiện                                            |
| -------------------- | ---------------------------------------------------- |
| Auth                 | Supabase Auth login/logout/protected route hoạt động |
| RBAC                 | Admin, Staff, Warehouse có quyền đúng                |
| Medicine             | Medicine và ActiveIngredient quản lý được            |
| Inventory            | MedicineBatch là source of truth                     |
| Stock Import         | Confirm import update batch đúng                     |
| Inventory Adjustment | Có reason, audit, không âm                           |
| POS                  | Draft Order tạo/sửa/xóa item được                    |
| InteractionAlert     | HIGH alert persist và bắt acknowledge/note           |
| Checkout             | Transactional `POST /checkout` hoạt động             |
| FEFO                 | Multi-batch allocation đúng                          |
| Payment              | Cash/bank simulation đúng                            |
| Invoice              | Invoice tạo trong checkout                           |
| AI                   | Google AI/MockAI, Guardrail, Audit hoạt động         |
| Graph                | Graph Sync, Neo4j Projection, Graph-RAG hoạt động    |
| Reports              | Revenue, Top Medicines, Inventory report hoạt động   |
| Settings             | Near-expiry threshold default 90 và update được      |
| Demo Reset           | Local-only reset, graph rebuild, smoke test          |

## 11.2. Quality Gate

| Gate              | Điều kiện                  |
| ----------------- | -------------------------- |
| Lint              | PASS                       |
| Type check        | PASS                       |
| Unit tests        | PASS cho critical modules  |
| Integration tests | PASS cho high-risk modules |
| Prisma validate   | PASS                       |
| Migration check   | PASS                       |
| Frontend build    | PASS                       |
| Backend build     | PASS                       |
| Smoke test        | PASS                       |
| Demo data         | Reproducible               |
| Known issues      | Không có blocker           |

## 11.3. Safety Gate

| Gate              | Điều kiện                                 |
| ----------------- | ----------------------------------------- |
| HIGH alert        | Không checkout nếu thiếu acknowledge/note |
| AI diagnosis      | Bị chặn                                   |
| AI prescribing    | Bị chặn                                   |
| AI dosage advice  | Bị chặn                                   |
| AI Audit          | Không lưu raw PII                         |
| Graph stale       | Không dùng âm thầm                        |
| Neo4j unavailable | Fallback PostgreSQL hoặc safe error       |
| Demo reset        | Refuse ngoài local                        |
| Database test     | Không phá demo/staging/production         |

---

# 12. Sprint Completion Rules

Một Sprint chỉ được xem là Done khi:

1. Các Task chính trong Sprint đã hoàn thành.
2. API contract đã rõ.
3. UI tích hợp với backend.
4. Authorization được enforce ở backend.
5. Validation và error handling hoạt động.
6. Test tối thiểu cho module đã có.
7. Không vi phạm out-of-scope guard.
8. Không quay lại baseline cũ.
9. Không dùng prefix `PAI`.
10. Không tạo scope mới ngoài MVP khi chưa được duyệt.

---

# 13. Jira Status Flow đề xuất

| Status         | Ý nghĩa                            |
| -------------- | ---------------------------------- |
| To Do          | Chưa bắt đầu                       |
| In Progress    | Đang làm                           |
| In Review      | Đang review code hoặc tài liệu     |
| Blocked        | Bị chặn bởi dependency             |
| Ready for Test | Code xong, chờ test                |
| Testing        | Đang kiểm thử                      |
| Done           | Hoàn thành theo Definition of Done |

---

# 14. Priority Rules

| Priority | Dùng cho                                                                                                             |
| -------- | -------------------------------------------------------------------------------------------------------------------- |
| Highest  | Auth, MedicineBatch, Stock Import transaction, Checkout, FEFO, HIGH alert, AI Guardrail, Graph freshness, demo reset |
| High     | Core API/UI, RBAC, InteractionAlert, AI Audit, Graph Sync, CI                                                        |
| Medium   | Supporting UI, filters, documentation, smoke checklist                                                               |
| Low      | Advanced/Future documentation, optional UI improvements                                                              |

---

# 15. Sprint Planning Notes cho Jira

Khi nhập Task vào Jira:

1. Dùng đúng prefix `PAC`.
2. Không đổi Task Key.
3. Gắn đúng Parent Epic.
4. Gắn đúng Linked Story.
5. Thêm label scope:

```text
scope:mvp
scope:advanced
scope:future
```

6. Thêm label module:

```text
auth
rbac
medicine
batch
stock-import
pos
checkout
fefo
interaction-alert
ai
guardrail
audit
graph-sync
graph-rag
reports
demo-reset
testing
ci
documentation
```

7. Với Task `PAC-TASK-526` trở đi, không đưa vào MVP release gate.
8. Với Task `PAC-TASK-556` trở đi, chỉ nhập backlog future/documentation nếu cần.

---

# 16. Final Sprint Summary

| Category                      |                      Task range | Số Task | Release meaning    |
| ----------------------------- | ------------------------------: | ------: | ------------------ |
| MVP Implementation            | `PAC-TASK-001` → `PAC-TASK-435` |     435 | Bắt buộc           |
| MVP Testing / Release         | `PAC-TASK-436` → `PAC-TASK-525` |      90 | Bắt buộc           |
| Should-have / Advanced        | `PAC-TASK-526` → `PAC-TASK-555` |      30 | Không bắt buộc     |
| Future / Commercial Expansion | `PAC-TASK-556` → `PAC-TASK-580` |      25 | Không code MVP     |
| **Total**                     | `PAC-TASK-001` → `PAC-TASK-580` | **580** | Full Jira Task set |

---

# 17. Kết luận

`5_Sprint.md` chia bộ 580 Task thành 12 sprint/wave:

```text
Sprint 1 → Sprint 10: MVP Execution + Release Readiness
Sprint 11: Should-have / Advanced Backlog
Sprint 12: Future / Commercial Expansion Backlog
```

MVP completion gate chính thức là:

```text
PAC-TASK-001 → PAC-TASK-525
```

Advanced và Future không được xem là điều kiện bắt buộc trước demo:

```text
PAC-TASK-526 → PAC-TASK-555: Should-have / Advanced
PAC-TASK-556 → PAC-TASK-580: Future / Commercial Expansion
```

Tài liệu tiếp theo nên làm sau `5_Sprint.md` là:

```text
branch-on-jira.md
```

Mục tiêu của `branch-on-jira.md` là định nghĩa branch model, naming convention, Jira issue key convention, PR rule, CI gate và cách liên kết branch/commit/PR với Jira Task.
