# Final Review tổng thể bộ 580 Task trước khi tạo `5_Sprint.md`

# 1. Kết luận tổng quan

Bộ Task hiện tại đã đủ cấu trúc để chuyển sang giai đoạn lập `5_Sprint.md`.

Đã hoàn tất đủ 8 tài liệu Task:

```text
4A_Task_List_MVP_Foundation_001_145.md
4A_Task_Description_MVP_Foundation_001_145.md

4B_Task_List_MVP_POS_Interaction_Checkout_146_290.md
4B_Task_Description_MVP_POS_Interaction_Checkout_146_290.md

4C_Task_List_MVP_AI_Graph_Report_Demo_291_435.md
4C_Task_Description_MVP_AI_Graph_Report_Demo_291_435.md

4D_Task_List_Testing_Advanced_Future_436_580.md
4D_Task_Description_Testing_Advanced_Future_436_580.md
```

Tổng số Task:

```text
PAC-TASK-001 → PAC-TASK-580
```

Kết luận:

```text
PASS có điều kiện
```

Có thể tiếp tục sang `5_Sprint.md`, nhưng trước khi lập Sprint chính thức nên áp dụng một số patch nhỏ để tránh Jira bị rối khi nhập vào hệ thống.

---

# 2. Kiểm tra numbering và Jira key

## 2.1. Task numbering

Kết quả kiểm tra:

| Hạng mục                                        | Kết quả |
| ----------------------------------------------- | ------- |
| Task bắt đầu từ `PAC-TASK-001`                  | PASS    |
| Task kết thúc ở `PAC-TASK-580`                  | PASS    |
| Chia đúng 4 nhóm, mỗi nhóm 145 Task             | PASS    |
| Không thấy gap số thứ tự lớn                    | PASS    |
| Không thấy Task key trùng trong các range chính | PASS    |

Phân bổ:

| Nhóm |                           Range | Số Task | Trạng thái |
| ---- | ------------------------------: | ------: | ---------- |
| 4A   | `PAC-TASK-001` → `PAC-TASK-145` |     145 | PASS       |
| 4B   | `PAC-TASK-146` → `PAC-TASK-290` |     145 | PASS       |
| 4C   | `PAC-TASK-291` → `PAC-TASK-435` |     145 | PASS       |
| 4D   | `PAC-TASK-436` → `PAC-TASK-580` |     145 | PASS       |
| Tổng | `PAC-TASK-001` → `PAC-TASK-580` |     580 | PASS       |

## 2.2. Jira prefix

Kết quả:

```text
PASS
```

Toàn bộ Task dùng prefix:

```text
PAC
```

Không còn dùng prefix cũ:

```text
PAI
```

Đây là đúng với quyết định mới của dự án.

---

# 3. Kiểm tra phân bổ nội dung theo nhóm Task

## 3.1. 4A — MVP Foundation

Phạm vi:

```text
PAC-TASK-001 → PAC-TASK-145
```

Nội dung chính:

* Auth & RBAC.
* Supabase Auth.
* User / Staff Account.
* Medicine.
* ActiveIngredient.
* Medicine–ActiveIngredient Mapping.
* Supplier.
* MedicineBatch.
* Stock Import nền tảng.

Đánh giá:

```text
PASS
```

4A bám đúng baseline mới:

* Không quay lại custom username/password.
* Không dùng `password_hash`.
* Có Supabase Auth.
* Có RBAC/permission.
* Có MedicineBatch làm source of truth.
* Có ActiveIngredient mapping.
* Có Supplier.
* Có Stock Import theo batch.

Ghi chú nhỏ:

```text
Nên đảm bảo Component name trong 4A khớp chính xác với 1_Components.md.
```

---

## 3.2. 4B — MVP POS, Interaction, Checkout

Phạm vi:

```text
PAC-TASK-146 → PAC-TASK-290
```

Nội dung chính:

* Stock Import completion.
* Inventory Adjustment.
* POS Draft Order.
* DrugInteraction Rule.
* InteractionAlert.
* HIGH alert acknowledgement/note.
* Checkout.
* FEFO.
* Payment.
* Invoice.

Đánh giá:

```text
PASS
```

4B là nhóm Task quan trọng nhất cho nghiệp vụ bán thuốc và đã bám baseline tốt:

* POS dùng Draft Order.
* Checkout chính thức qua `POST /checkout`.
* FEFO allocation có task riêng.
* Payment và Invoice nằm trong checkout transaction.
* HIGH alert bắt buộc acknowledgement và consultation note.
* Interaction rule ở cấp ActiveIngredient.
* InteractionAlert được persist.
* Warehouse bị chặn khỏi InteractionAlert.

Ghi chú nhỏ:

```text
Các Task test trong 4B và 4D có một phần overlap. Nên đánh dấu 4B là feature-level tests, còn 4D là final regression / smoke / CI tests để tránh AI agent code trùng.
```

---

## 3.3. 4C — MVP AI, Graph, Reports, Demo

Phạm vi:

```text
PAC-TASK-291 → PAC-TASK-435
```

Nội dung chính:

* AI Copilot.
* Google AI provider.
* MockAI fallback.
* AI Guardrail.
* AI Audit.
* Prompt versioning.
* Graph Sync Outbox.
* Neo4j Projection.
* Graph freshness.
* Graph-RAG.
* PostgreSQL fallback.
* Reports.
* System Settings.
* Demo data.
* Demo reset.

Đánh giá:

```text
PASS
```

4C bám đúng baseline kỹ thuật nổi bật của dự án:

* Google AI là primary provider.
* MockAI chỉ là fallback.
* AI Guardrail bắt buộc.
* AI Audit bắt buộc.
* Prompt có version.
* Graph Sync dùng outbox/worker.
* Neo4j chỉ là projection.
* Graph-RAG có freshness/provenance/fallback.
* Reports deterministic, không phụ thuộc AI.
* Demo reset local-only.

Ghi chú nhỏ:

```text
Một số Task test trong 4C trùng ý với 4D. Nên giữ 4C là module test tại thời điểm implement, 4D là regression/final validation.
```

---

## 3.4. 4D — Testing, DevOps, Documentation, Advanced, Future

Phạm vi:

```text
PAC-TASK-436 → PAC-TASK-580
```

Nội dung chính:

* Automated tests.
* High-risk module tests.
* DevOps/CI.
* Setup guide.
* Documentation.
* Release readiness.
* Should-have / Advanced.
* Future / Commercial Expansion.

Đánh giá:

```text
PASS có điều kiện
```

4D rất hữu ích vì gom toàn bộ phần kiểm thử, setup, release và backlog nâng cao. Tuy nhiên cần patch cách hiểu Sprint/Scope để không làm nhóm tưởng rằng toàn bộ 4D đều phải implement ngay.

Các nhóm trong 4D nên hiểu như sau:

| Range                           | Scope đúng                                                      |
| ------------------------------- | --------------------------------------------------------------- |
| `PAC-TASK-436` → `PAC-TASK-525` | MVP Testing / DevOps / Documentation / Release readiness        |
| `PAC-TASK-526` → `PAC-TASK-555` | Should-have / Advanced, không chặn MVP                          |
| `PAC-TASK-556` → `PAC-TASK-580` | Future / Commercial Expansion, chủ yếu là documentation backlog |

Patch cần làm:

```text
Trong 5_Sprint.md, không đưa Sprint 11 và Sprint 12 vào MVP deadline nếu thời gian không đủ.
Nên đặt chúng là Advanced Backlog và Future Backlog.
```

---

# 4. Kiểm tra baseline chính thức

## 4.1. Các baseline đã được giữ đúng

| Baseline                                                | Trạng thái |
| ------------------------------------------------------- | ---------- |
| Frontend dùng Next.js                                   | PASS       |
| Backend dùng NestJS / Node.js                           | PASS       |
| ORM dùng Prisma                                         | PASS       |
| Authentication dùng Supabase Auth                       | PASS       |
| Không lưu password trong PostgreSQL                     | PASS       |
| PostgreSQL là source of truth                           | PASS       |
| MedicineBatch là inventory source of truth              | PASS       |
| FEFO allocation khi checkout                            | PASS       |
| Checkout transactional `POST /checkout`                 | PASS       |
| Payment và Invoice tạo trong checkout transaction       | PASS       |
| ActiveIngredient-level interaction rule                 | PASS       |
| InteractionAlert persisted                              | PASS       |
| HIGH alert bắt buộc acknowledgement + consultation note | PASS       |
| Google AI primary provider                              | PASS       |
| MockAI fallback                                         | PASS       |
| AI Guardrail + AI Audit bắt buộc                        | PASS       |
| Neo4j là graph projection                               | PASS       |
| Graph Sync outbox/worker/retry/failure logging          | PASS       |
| Graph-RAG có freshness/provenance/fallback              | PASS       |
| Reports deterministic                                   | PASS       |
| Demo reset local-only                                   | PASS       |

## 4.2. Các baseline sai cũ đã được tránh

| Baseline sai cũ                                     | Trạng thái |
| --------------------------------------------------- | ---------- |
| Custom username/password auth                       | Đã tránh   |
| Custom JWT thay Supabase Auth                       | Đã tránh   |
| `password_hash` trong PostgreSQL                    | Đã tránh   |
| Aggregate inventory làm source of truth             | Đã tránh   |
| Sửa trực tiếp batch quantity                        | Đã tránh   |
| Medicine-level interaction rule làm source of truth | Đã tránh   |
| MockAI-only MVP                                     | Đã tránh   |
| Neo4j làm source of truth                           | Đã tránh   |
| Graph quyết định checkout                           | Đã tránh   |
| AI tự động lưu official consultation note           | Đã tránh   |
| CRITICAL severity trong MVP                         | Đã tránh   |
| ProductVariant làm sales key MVP                    | Đã tránh   |
| Online commerce trong MVP                           | Đã tránh   |

Kết luận baseline:

```text
PASS
```

---

# 5. Vấn đề cần patch trước khi tạo `5_Sprint.md`

## P0 — Cần patch trước khi nhập Jira hoặc lập Sprint chính thức

### P0.1. Thêm cột hoặc label `Scope`

Hiện các Task List có quy ước Scope, nhưng bảng Task chưa có cột Scope cụ thể.

Nên thêm một trong hai cách:

Cách 1 — thêm cột:

```text
Scope
```

Giá trị:

```text
MVP
Should-have
Future
Out-of-scope Guard
```

Cách 2 — thêm label:

```text
scope:mvp
scope:should-have
scope:future
scope:guardrail
```

Khuyến nghị:

```text
Nên thêm cột Scope trong 5_Sprint.md và khi nhập Jira.
```

Lý do:

* Tránh việc `PAC-TASK-526` → `PAC-TASK-580` bị hiểu là phải code cho MVP.
* Giúp sprint planning rõ hơn.
* Giúp AI agent biết Task nào chỉ là documentation/future backlog.

---

### P0.2. Chuẩn hóa lại ý nghĩa Sprint 11 và Sprint 12

Trong 4D, các Task Should-have và Future đang gắn với Sprint 11 và Sprint 12.

Cần ghi rõ:

```text
Sprint 11 = Advanced Backlog / Optional Sprint
Sprint 12 = Future Backlog / Commercial Expansion Documentation
```

Không nên xem Sprint 11/12 là sprint bắt buộc trước demo MVP.

Patch đề xuất trong `5_Sprint.md`:

```text
MVP Execution Sprint / Release Wave: chỉ tập trung đến PAC-TASK-525.
Advanced Backlog: PAC-TASK-526 → PAC-TASK-555.
Future Backlog: PAC-TASK-556 → PAC-TASK-580.
```

---

### P0.3. Tránh trùng lặp testing task giữa 4A/4B/4C và 4D

Một số Task test đã xuất hiện ở module cụ thể, sau đó 4D lại có test tổng hợp.

Ví dụ:

| Module-level Task                                              | Final testing Task              |
| -------------------------------------------------------------- | ------------------------------- |
| `PAC-TASK-147`, `PAC-TASK-151`, `PAC-TASK-155`, `PAC-TASK-159` | `PAC-TASK-449`, `PAC-TASK-450`  |
| `PAC-TASK-255`, `PAC-TASK-256`                                 | `PAC-TASK-459` → `PAC-TASK-463` |
| `PAC-TASK-346` → `PAC-TASK-354`                                | `PAC-TASK-472` → `PAC-TASK-474` |
| `PAC-TASK-385` → `PAC-TASK-389`                                | `PAC-TASK-475` → `PAC-TASK-478` |

Không cần xóa Task, nhưng cần định nghĩa lại ý nghĩa:

```text
Task test trong 4A/4B/4C = test đi kèm khi implement module.
Task test trong 4D = final regression, coverage review, CI integration, smoke/E2E confirmation.
```

Patch Summary nên thêm từ khóa:

```text
Consolidate
Regression
Final validation
Coverage review
Smoke checklist
```

Ví dụ:

```text
PAC-TASK-449 - Consolidate Stock Import transaction regression tests
PAC-TASK-472 - Consolidate AI Guardrail high-risk regression test suite
PAC-TASK-475 - Consolidate Graph Sync outbox and retry regression tests
```

---

### P0.4. Kiểm tra Component name khớp với `1_Components.md`

Các Task đang dùng nhiều component như:

```text
Auth & RBAC
Medicine & ActiveIngredient
Inventory & MedicineBatch
Stock Import
Inventory Adjustment
POS & Checkout
InteractionAlert
AI Guardrail & Audit
Graph Sync & Graph-RAG
Reports
Data & Demo
Testing & Setup
DevOps & CI
Documentation
Admin Graph Sync Status
Graph Explorer
AI Provider Settings UI
Prompt Management UI
System Audit Log UI
Supabase Storage
Supabase Realtime
Notification
Scheduled Job
AI Business Narrative
Online Commerce
Product Variant Catalog
Multi-store / Multi-warehouse
Stock Transfer
Forecasting
Promotion / Coupon
Shipping
Review / CMS
```

Cần đảm bảo toàn bộ các component này đã có trong `1_Components.md`.

Nếu `1_Components.md` không muốn quá nhiều component, có thể gom lại:

| Component trong Task    | Có thể gom về                       |
| ----------------------- | ----------------------------------- |
| AI Provider Settings UI | AI Guardrail & Audit                |
| Prompt Management UI    | AI Guardrail & Audit                |
| AI Business Narrative   | Reports hoặc AI Guardrail & Audit   |
| Admin Graph Sync Status | Graph Sync & Graph-RAG              |
| System Audit Log UI     | Admin Management hoặc Documentation |
| Data & Demo             | Testing & Setup hoặc DevOps & CI    |
| Promotion / Coupon      | Future / Commercial Expansion       |
| Shipping                | Future / Commercial Expansion       |
| Review / CMS            | Future / Commercial Expansion       |

Khuyến nghị:

```text
Không cần đổi Task ID.
Chỉ cần chuẩn hóa Component name trước khi nhập Jira.
```

---

### P0.5. Bổ sung Traceability fields

Yêu cầu ban đầu của Jira docs có nhắc đến:

* Requirement ID.
* Use Case ID.
* Test Case ID.
* Trace ID.
* API.
* UI.
* Database.
* Authorization.

Task Description hiện đã có nhiều thông tin kỹ thuật, nhưng Task List chưa có đầy đủ cột trace.

Không nên viết lại toàn bộ 580 Description, nhưng nên thêm một phụ lục hoặc mapping trong `5_Sprint.md` hoặc tạo thêm file phụ:

```text
4E_Task_Traceability_Map.md
```

Tối thiểu cần có mapping cấp Story:

```text
Story → Requirement ID → Use Case ID → Test Case ID → Related Task Range
```

Ví dụ:

| Story  | Requirement   | Use Case  | Test Case     | Task Range                  |
| ------ | ------------- | --------- | ------------- | --------------------------- |
| US-83  | REQ-CHK-01    | UC-CHK-01 | TC-CHK-001    | PAC-TASK-259 → PAC-TASK-267 |
| US-88  | REQ-FEFO-01   | UC-CHK-02 | TC-FEFO-001   | PAC-TASK-268 → PAC-TASK-272 |
| US-105 | REQ-AI-GRD-01 | UC-AI-02  | TC-AI-GRD-001 | PAC-TASK-316 → PAC-TASK-317 |

Khuyến nghị:

```text
Có thể tạo 4E_Task_Traceability_Map.md sau 5_Sprint.md nếu muốn,
nhưng trong 5_Sprint.md cần ít nhất ghi rõ Task group nào map với Story/Epic/Test group nào.
```

---

# 6. Kiểm tra Epic / Story relation

## 6.1. Epic relation

Bộ Task đang sử dụng các Epic từ:

```text
PAC-EPIC-01 → PAC-EPIC-39
```

Cần kiểm tra lại `2_Epic.md` xem đã có đủ các Epic này chưa.

Nếu `2_Epic.md` chưa có đủ `PAC-EPIC-22` → `PAC-EPIC-39`, cần bổ sung hoặc đổi các Task future/advanced về Epic đã có.

Nhóm Epic có vẻ hợp lý:

| Epic group                       | Đánh giá          |
| -------------------------------- | ----------------- |
| Auth / RBAC                      | PASS              |
| Medicine / Inventory             | PASS              |
| POS / Checkout                   | PASS              |
| InteractionAlert                 | PASS              |
| AI / Guardrail / Audit           | PASS              |
| Graph Sync / Graph-RAG           | PASS              |
| Reports / Settings / Demo        | PASS              |
| Testing / DevOps / Documentation | PASS              |
| Should-have / Future Expansion   | PASS có điều kiện |

Điều kiện:

```text
Epic Registry phải có đầy đủ các Epic được reference.
```

---

## 6.2. Story relation

Task đang dùng Story từ:

```text
US-01 → US-170
```

Đánh giá:

```text
PASS có điều kiện
```

Cần kiểm tra lại `3_Stories.md` để đảm bảo:

* Có đủ Story `US-01` → `US-170`.
* Tên Story khớp với nội dung Task.
* Một Story không bị gánh quá nhiều nhóm không liên quan.

Điểm cần chú ý:

```text
US-150 đang được dùng rất nhiều trong 4C/4D cho demo reset, setup, testing, CI, docs, release readiness.
```

Nếu trong `3_Stories.md`, `US-150` chỉ mô tả demo reset thì không nên dùng nó cho toàn bộ testing/setup/docs.

Patch đề xuất:

| Hiện tại                                          | Nên cân nhắc                                                                                    |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Nhiều Task 4D cùng gắn `US-150`                   | Tách thành nhiều Story: Testing Setup, CI Pipeline, Setup Guide, Demo Script, Release Checklist |
| `US-150` dùng cho demo reset và release readiness | Giữ `US-150` cho demo reset, tạo Story riêng cho CI/docs nếu cần                                |

Không bắt buộc sửa ngay nếu nhóm muốn giữ đơn giản, nhưng khi làm `5_Sprint.md` cần ghi rõ `US-150` là umbrella story cho Testing/Demo/Release.

---

# 7. Kiểm tra Scope MVP / Should-have / Future

## 7.1. MVP / Core

Các Task MVP chính:

```text
PAC-TASK-001 → PAC-TASK-525
```

Trong đó:

| Range   | Nội dung                                    |
| ------- | ------------------------------------------- |
| 001–145 | MVP foundation                              |
| 146–290 | POS, Interaction, Checkout                  |
| 291–435 | AI, Graph, Reports, Demo                    |
| 436–525 | Testing, CI, setup, docs, release readiness |

Đánh giá:

```text
PASS
```

## 7.2. Should-have / Advanced

Các Task Should-have:

```text
PAC-TASK-526 → PAC-TASK-555
```

Bao gồm:

* Admin Graph Sync Status UI.
* Graph Explorer.
* AI Provider Settings UI.
* Prompt Management UI.
* System Audit Log UI.
* Supabase Storage.
* Supabase Realtime.
* Notification.
* Scheduled Job.
* AI Business Report Narrative.

Đánh giá:

```text
PASS
```

Điều kiện:

```text
Không đưa các Task này vào MVP completion gate.
```

## 7.3. Future / Commercial Expansion

Các Task Future:

```text
PAC-TASK-556 → PAC-TASK-580
```

Bao gồm:

* Full Customer Management.
* Online Commerce.
* Product Variant Catalog.
* Multi-store.
* Multi-warehouse.
* Stock Transfer.
* Forecasting.
* Promotion/Coupon.
* Shipping/Delivery.
* Review/CMS.
* Commercial expansion dependency map.

Đánh giá:

```text
PASS
```

Điều kiện:

```text
Chỉ để documentation/backlog, không code trong MVP.
```

---

# 8. Kiểm tra AI Agent readiness

## 8.1. Điểm mạnh

Bộ Task hiện tại rất phù hợp để AI agent code vì:

* Task được chia nhỏ.
* Mỗi Task có key rõ.
* Summary rõ hành động.
* Description có mục tiêu, nội dung công việc, kết quả mong đợi.
* Có guardrails kỹ thuật.
* Có phân biệt MVP/Advanced/Future ở mức nội dung.
* Các luồng rủi ro cao như Checkout, FEFO, InteractionAlert, AI Guardrail, Graph Sync đều có Task riêng.

Đánh giá:

```text
PASS
```

## 8.2. Rủi ro với AI agent

AI agent có thể bị nhầm ở các điểm sau nếu không patch:

| Rủi ro                            | Cách xử lý                                        |
| --------------------------------- | ------------------------------------------------- |
| Tưởng Should-have/Future là MVP   | Thêm Scope column/label                           |
| Code trùng test tasks             | Ghi rõ module test vs regression test             |
| Dùng Component chưa có trong Jira | Chuẩn hóa Component registry                      |
| Dùng `US-150` quá rộng            | Tạo Story grouping hoặc giải thích umbrella story |
| Code cả Sprint 11/12 trước demo   | Đánh dấu Advanced/Future Backlog                  |
| Thiếu Requirement/UC/Test trace   | Tạo traceability mapping                          |

---

# 9. Patch Consistency đề xuất trước khi tạo `5_Sprint.md`

## Patch 1 — Thêm Scope classification

Áp dụng mapping:

```text
PAC-TASK-001 → PAC-TASK-525: MVP
PAC-TASK-526 → PAC-TASK-555: Should-have / Advanced
PAC-TASK-556 → PAC-TASK-580: Future / Commercial Expansion
```

## Patch 2 — Chuẩn hóa Sprint interpretation

Áp dụng:

```text
Sprint 1 → Sprint 10: MVP execution / release readiness
Sprint 11: Advanced Backlog
Sprint 12: Future Backlog
```

## Patch 3 — Chuẩn hóa testing duplicate semantics

Áp dụng:

```text
4A/4B/4C test tasks = module-level implementation tests
4D test tasks = final regression / CI / smoke / coverage validation
```

## Patch 4 — Kiểm tra Component Registry

Trước khi nhập Jira, kiểm tra:

```text
Tất cả component trong Task List phải tồn tại trong 1_Components.md.
```

Nếu không, hoặc bổ sung component, hoặc gom về component đã có.

## Patch 5 — Bổ sung traceability mapping

Có thể làm theo một trong hai cách:

Cách A:

```text
Thêm traceability section trong 5_Sprint.md.
```

Cách B:

```text
Tạo file riêng 4E_Task_Traceability_Map.md.
```

Khuyến nghị:

```text
Làm traceability tối thiểu trong 5_Sprint.md trước.
Nếu cần chi tiết hơn thì tạo 4E sau.
```

---

# 10. Quyết định sau review

## Có cần viết lại 580 Task không?

```text
Không cần.
```

Bộ 580 Task hiện tại đủ tốt để tiếp tục.

## Có cần sửa Task ID không?

```text
Không cần.
```

Task ID đã ổn và liên tục.

## Có cần xóa Task không?

```text
Không cần.
```

Chỉ cần làm rõ Scope và ý nghĩa các nhóm Task.

## Có cần sửa lớn Description không?

```text
Không cần.
```

Description đã đủ cho AI agent code ở mức Task.

## Có cần patch trước `5_Sprint.md` không?

```text
Có, nhưng patch ở mức planning/metadata, không phải viết lại toàn bộ Task.
```

---

# 11. Kết luận final review

Bộ 580 Task đạt yêu cầu để chuyển sang `5_Sprint.md`.

Kết quả review:

| Hạng mục                   | Kết quả                            |
| -------------------------- | ---------------------------------- |
| Numbering                  | PASS                               |
| Jira prefix PAC            | PASS                               |
| Baseline kỹ thuật          | PASS                               |
| MVP coverage               | PASS                               |
| AI / Graph coverage        | PASS                               |
| POS / Checkout coverage    | PASS                               |
| Testing coverage           | PASS                               |
| Advanced/Future separation | PASS có điều kiện                  |
| Traceability fields        | Cần bổ sung mapping                |
| Component consistency      | Cần kiểm tra với `1_Components.md` |
| Sprint readiness           | PASS sau khi áp dụng patch         |

Kết luận:

```text
Bộ Task có thể dùng làm nền tảng cho 5_Sprint.md.
Trước khi lập sprint, cần áp dụng patch về Scope, Sprint interpretation, Component consistency và Traceability mapping.
```

Bước tiếp theo nên làm:

```text
Tạo 5_Sprint.md
```

Trong `5_Sprint.md`, cần không chỉ chia Task theo Sprint, mà còn phải:

1. Phân loại MVP / Should-have / Future.
2. Xác định sprint nào là bắt buộc trước demo.
3. Gắn Task với Epic/Story.
4. Chia theo 4 thành viên.
5. Xác định dependency và critical path.
6. Đặt release/demo freeze.
7. Tách Advanced/Future khỏi MVP completion gate.
