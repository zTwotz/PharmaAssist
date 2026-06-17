# Document 19 — Project Management, Jira & Release Plan

# Tài liệu 19 — Quản lý dự án, Jira & kế hoạch release/demo

---

## Metadata

| Mục                        | Nội dung                                                                                                                                                                                                                                            |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID                | DOC-19                                                                                                                                                                                                                                              |
| File name                  | `19_project_management_jira_release_plan.md`                                                                                                                                                                                                        |
| Document Name              | Project Management, Jira & Release Plan                                                                                                                                                                                                             |
| Tên tiếng Việt             | Quản lý dự án, Jira và kế hoạch release/demo                                                                                                                                                                                                        |
| Project                    | PharmaAssist AI Intelligence                                                                                                                                                                                                                        |
| Version                    | 1.0 Draft                                                                                                                                                                                                                                           |
| Status                     | Draft                                                                                                                                                                                                                                               |
| Created Date               | 08/06/2026                                                                                                                                                                                                                                          |
| Last Updated               | 08/06/2026                                                                                                                                                                                                                                          |
| Owner                      | Project Leader / Scrum Coordinator                                                                                                                                                                                                                  |
| Reviewer                   | Developer, Tester, Release/Demo Owner, Giảng viên hướng dẫn                                                                                                                                                                                         |
| Baseline Source            | Document 03 — Vision & Scope, Document 04 — Decision Log & Scope Control, Document 05 — BRD, Document 06 — SRS, Document 08 — Use Case, Document 12 — API Specification, Document 15 — UI/UX Screen Specification, Document 20 — Testing/Demo/Setup |
| Project Tracking           | Jira                                                                                                                                                                                                                                                |
| Source Code                | GitHub                                                                                                                                                                                                                                              |
| Branch Model               | `main`, `develop`, short-lived feature/bugfix/docs branches                                                                                                                                                                                         |
| Team Size                  | 4 members                                                                                                                                                                                                                                           |
| Target Release/Demo Freeze | 16/06/2026 at latest                                                                                                                                                                                                                                |
| Final Deadline             | Before 17/06/2026                                                                                                                                                                                                                                   |
| Language Rule              | Nội dung chính viết bằng tiếng Việt; tên công nghệ, branch, issue type, status, enum và thuật ngữ kỹ thuật giữ tiếng Anh khi cần                                                                                                                    |

---

## 1. Mục đích tài liệu

Tài liệu **Project Management, Jira & Release Plan** mô tả kế hoạch quản lý dự án chính thức cho **PharmaAssist AI Intelligence**.

Tài liệu này xác định:

1. Project management approach.
2. Team structure.
3. Roles and responsibilities.
4. Jira là source of truth cho quản lý công việc.
5. Cách sử dụng GitHub.
6. Jira component structure.
7. Epic structure aligned với baseline mới.
8. Story writing standard.
9. Task writing standard.
10. Definition of Ready.
11. Definition of Done.
12. Sprint/execution cycle plan.
13. Capacity planning rules.
14. Branch model.
15. Commit/PR rules.
16. CI quality gate.
17. Release/demo freeze plan.
18. Release ownership.
19. Unresolved PM decisions.
20. Change control.
21. Jira revision checklist.
22. Traceability từ Jira sang SRS/API/UI/Testing.

Tài liệu này **không** viết lại SRS, không viết API detail, không viết ERD/Prisma, không viết test cases đầy đủ, không tạo branch riêng cho từng Epic nếu không cần, không dùng Jira cũ nếu lệch baseline và không bỏ CI gate đã chốt.

---

## 2. Project Management Approach

### 2.1. Phương pháp quản lý dự án

Dự án sử dụng phương pháp quản lý linh hoạt theo hướng **Agile/Scrum-light**, phù hợp với nhóm nhỏ 4 thành viên và thời gian còn lại ngắn.

Đặc điểm chính:

1. Làm việc theo execution cycle ngắn.
2. Ưu tiên MVP demo-ready.
3. Jira làm nơi quản lý Epic/Story/Task/status.
4. GitHub quản lý source code, PR và CI.
5. Mỗi task cần có owner rõ ràng.
6. Mỗi story cần trace được về requirement/UI/API/test.
7. Scope change phải được Project Leader phê duyệt.
8. Release/demo freeze phải có quality gate.

### 2.2. Vì sao không dùng sprint 2 tuần

Do deadline final trước **17/06/2026**, sprint 2 tuần không phù hợp.

Thay vào đó, dùng:

1. Execution cycle 1 tuần hoặc ngắn hơn.
2. Daily/near-daily check-in.
3. Scope triage liên tục.
4. Freeze sớm trước demo.
5. Tập trung critical path.

### 2.3. Nguyên tắc quản lý

Dự án cần tuân thủ:

1. Baseline đã chốt là nguồn quyết định chính.
2. Jira cũ cần major revision nếu lệch baseline.
3. Không đưa scope cũ đã bị thay thế quay lại.
4. Không làm feature không phục vụ MVP nếu ảnh hưởng deadline.
5. Không merge code không qua CI gate.
6. Không demo bằng mock thay cho chức năng required nếu baseline yêu cầu real integration.
7. MockAI chỉ là fallback.
8. Neo4j/Graph Sync là MVP technical capability.
9. Demo data phải reproducible.
10. Release freeze phải dựa trên test exit, không chỉ dựa trên cảm tính nhóm.

---

## 3. Team Structure

### 3.1. Official team size

Team chính thức gồm:

```text
4 members
```

Exact weekly/hourly capacity per member hiện chưa được chốt.

Do đó, sprint commitment phải dựa trên:

1. Task-hour estimate.
2. Named ownership.
3. Availability thực tế từng người.
4. Critical path priority.
5. Không mặc định mỗi người có capacity bằng nhau.

### 3.2. Suggested role distribution

Vì team 4 người, một người có thể giữ nhiều vai trò.

| Role                | Suggested owner type               | Ghi chú                                 |
| ------------------- | ---------------------------------- | --------------------------------------- |
| Project Leader      | 1 member                           | Scope owner, decision owner             |
| Backend Lead        | 1 member                           | NestJS, Prisma, API, checkout           |
| Frontend Lead       | 1 member                           | Next.js, UI, POS, dashboard             |
| Tester / QA Owner   | 1 member                           | Test cases, smoke test, demo validation |
| AI/Graph Developer  | Có thể là Backend Lead hoặc shared | AI, Graph Sync, Graph-RAG               |
| Release/Demo Owner  | Chưa chốt                          | Cần bổ nhiệm                            |
| Release/Demo Backup | Chưa chốt                          | Cần bổ nhiệm                            |

### 3.3. Cross-functional responsibility

Do nhóm nhỏ, mỗi thành viên cần hỗ trợ ngoài vai trò chính khi cần:

1. Backend Developer có thể hỗ trợ seed/demo reset.
2. Frontend Developer có thể hỗ trợ UI test.
3. Tester có thể hỗ trợ Postman/manual API validation.
4. Project Leader có thể hỗ trợ scope triage và documentation.
5. AI/Graph work có thể chia nhỏ giữa backend và tester để smoke test.

---

## 4. Roles and Responsibilities

### 4.1. Project Leader

Project Leader chịu trách nhiệm:

1. Phê duyệt scope baseline.
2. Phê duyệt scope change.
3. Ưu tiên MVP vs Should-have/Future.
4. Xác nhận release/demo readiness.
5. Theo dõi Jira progress.
6. Chốt unresolved decisions khi cần.
7. Đảm bảo tài liệu được cập nhật theo decision log.
8. Đánh giá rủi ro deadline.
9. Điều phối nhóm 4 người.
10. Giao tiếp với giảng viên nếu cần.

### 4.2. Scrum Master / Coordinator

Nếu có người giữ vai trò coordinator, trách nhiệm gồm:

1. Điều phối daily check-in.
2. Nhắc cập nhật Jira status.
3. Theo dõi blocker.
4. Tổng hợp progress.
5. Chuẩn bị sprint/execution cycle board.
6. Hỗ trợ Project Leader triage.

Vai trò này có thể do Project Leader kiêm nhiệm.

### 4.3. Backend Developer

Backend Developer chịu trách nhiệm:

1. NestJS module implementation.
2. Prisma schema/migration.
3. Supabase Auth integration.
4. RBAC/authorization guards.
5. API implementation.
6. Checkout transaction.
7. FEFO allocation.
8. InteractionAlert lifecycle.
9. AI Orchestrator/Guardrail/Audit.
10. Graph Sync Worker.
11. Graph-RAG backend.
12. Reports API.
13. System Settings API.
14. Integration tests.

### 4.4. Frontend Developer

Frontend Developer chịu trách nhiệm:

1. Next.js app shell.
2. Role-based navigation.
3. Login/first-login flow.
4. Medicine UI.
5. Inventory UI.
6. POS UI.
7. Interaction Alert Panel.
8. AI Copilot Panel.
9. Checkout Route/Panel.
10. Order/Invoice UI.
11. Reports UI.
12. System Settings UI.
13. Graph-RAG UI.
14. Error/loading/empty states.
15. E2E support.

### 4.5. Tester / QA Owner

Tester chịu trách nhiệm:

1. Test strategy execution.
2. Manual test cases.
3. API validation.
4. E2E scenarios.
5. Smoke test before release.
6. Bug reproduction.
7. Test exit report.
8. Traceability check.
9. Demo flow validation.
10. Regression validation after fixes.

### 4.6. AI/Graph Developer

AI/Graph Developer chịu trách nhiệm:

1. Google AI provider integration.
2. MockAI fallback.
3. Prompt templates.
4. Guardrail implementation.
5. AI Audit.
6. Graph Sync Outbox.
7. Neo4j projection.
8. Freshness detection.
9. Graph-RAG query templates.
10. PostgreSQL fallback behavior.
11. Graph smoke checks.

### 4.7. Release/Demo Owner

Release/Demo Owner cần được bổ nhiệm.

Trách nhiệm:

1. Quản lý release checklist.
2. Đảm bảo demo freeze đúng hạn.
3. Chạy demo reset/smoke test.
4. Xác nhận CI pass.
5. Chuẩn bị demo script.
6. Chuẩn bị backup evidence.
7. Quản lý release PR từ `develop` sang `main`.
8. Báo cáo readiness cho Project Leader.

### 4.8. Release/Demo Backup

Backup cần được bổ nhiệm.

Trách nhiệm:

1. Có thể thay Release/Demo Owner khi vắng.
2. Biết cách chạy demo.
3. Biết cách reset data local.
4. Biết cách kiểm tra smoke test.
5. Biết cách rollback demo nếu lỗi.

---

## 5. Jira as Source of Truth

### 5.1. Official rule

Jira là source of truth cho:

1. Epic.
2. Story.
3. Task.
4. Bug.
5. Sprint/execution cycle.
6. Status.
7. Assignee.
8. Priority.
9. Acceptance criteria.
10. Traceability.

GitHub là source of truth cho:

1. Source code.
2. Branch.
3. Commit.
4. Pull Request.
5. CI checks.
6. Code review.

### 5.2. Jira must be revised

Jira hiện có cần **major revision** vì tài liệu cũ/backlog cũ có nhiều điểm lệch baseline:

1. Custom username/password/JWT.
2. Aggregate inventory.
3. Medicine-level interaction.
4. MockAI-only.
5. MockGraph-only.
6. Payment/invoice tách khỏi checkout.
7. Thiếu Supplier.
8. Thiếu ActiveIngredient.
9. Thiếu MedicineBatch.
10. Thiếu FEFO.
11. Thiếu Inventory Adjustment.
12. Thiếu InteractionAlert lifecycle.
13. Thiếu AI Guardrail/Audit.
14. Thiếu Graph Sync Outbox/Freshness.
15. Thiếu Graph-RAG module riêng.
16. Thiếu System Settings.
17. Thiếu report MVP.
18. Thiếu demo reset workflow.

### 5.3. Jira issue hierarchy

Recommended hierarchy:

```text
Project
→ Epic
→ Story
→ Task/Sub-task
→ Bug
```

### 5.4. Jira status workflow

Recommended statuses:

1. `Backlog`
2. `Ready`
3. `In Progress`
4. `In Review`
5. `Testing`
6. `Blocked`
7. `Done`
8. `Deferred`

### 5.5. Jira priority levels

Recommended priorities:

| Priority | Meaning              |
| -------- | -------------------- |
| P0       | Release/demo blocker |
| P1       | MVP critical         |
| P2       | MVP important        |
| P3       | Should-have          |
| P4       | Future/deferred      |

### 5.6. Jira issue labels

Recommended labels:

1. `mvp`
2. `should-have`
3. `future`
4. `backend`
5. `frontend`
6. `database`
7. `ai`
8. `graph`
9. `testing`
10. `demo`
11. `security`
12. `bug`
13. `blocker`
14. `docs`
15. `scope-change`

---

## 6. GitHub Usage

### 6.1. GitHub role

GitHub dùng cho:

1. Source code repository.
2. Branch management.
3. Pull Requests.
4. Code review.
5. CI workflow.
6. Commit linking to Jira.
7. Release PR.
8. Issue discussion nếu cần, nhưng Jira vẫn là planning source of truth.

### 6.2. GitHub issue usage

Nếu dùng GitHub Issues, chỉ nên dùng cho:

1. Technical bug linked back to Jira.
2. PR discussion.
3. CI failure tracking.
4. Code-specific tasks.

Không dùng GitHub Issues thay thế Jira backlog.

### 6.3. PR linking rule

Mỗi PR phải liên kết Jira issue key.

Example branch/PR title:

```text
PAI-123 Implement checkout FEFO transaction
```

Commit message example:

```text
PAI-123 implement FEFO allocation in checkout service
```

### 6.4. GitHub Projects

Nếu dùng GitHub Projects, chỉ là bổ trợ kỹ thuật.

Jira vẫn là nơi quản lý chính.

---

## 7. Jira Component Structure

### 7.1. Component principles

Jira Components nên bám sát module baseline, không bám thiết kế cũ.

Component phải giúp:

1. Assign ownership.
2. Filter work.
3. Track progress theo module.
4. Trace sang SRS/API/UI/test.
5. Không tạo quá nhiều component nhỏ gây rối.

### 7.2. Recommended components

| Component                     | Scope                                      |
| ----------------------------- | ------------------------------------------ |
| `Auth & RBAC`                 | Supabase Auth, profile, roles, permissions |
| `Medicine & ActiveIngredient` | Medicine, ActiveIngredient, mapping        |
| `Supplier`                    | Supplier management                        |
| `Inventory & MedicineBatch`   | Batch, inventory summary, low/near expiry  |
| `Stock Import`                | Import draft/confirm                       |
| `Inventory Adjustment`        | Adjustment workflow                        |
| `POS & Orders`                | Draft Order, order history/detail          |
| `Checkout`                    | FEFO transaction, payment, invoice         |
| `InteractionAlert`            | Drug interaction check, alert lifecycle    |
| `AI Guardrail & Audit`        | AI Copilot, prompt, provider, audit        |
| `Graph Sync & Graph-RAG`      | Neo4j, outbox, freshness, Graph-RAG        |
| `Reports`                     | Revenue, top medicines, inventory report   |
| `System Settings`             | Near-expiry threshold                      |
| `Data & Demo`                 | Seed, demo reset, demo scenarios           |
| `Testing & QA`                | Test cases, smoke, E2E                     |
| `Documentation`               | Consolidated docs                          |
| `DevOps & CI`                 | GitHub Actions, build, env config          |

### 7.3. Components not recommended

Do not create components based on outdated design:

1. `Custom JWT Auth`.
2. `Aggregate Inventory`.
3. `Medicine Interaction`.
4. `Mock Graph`.
5. `MockAI-only`.
6. `Orders Pay Endpoint`.
7. `Full Customer MVP`.
8. `100-table MVP`.

---

## 8. Epic Structure Aligned to Baseline

### 8.1. Epic naming standard

Epic name format:

```text
[Epic Code] Epic Name
```

Example:

```text
PAI-EPIC-01 Auth & RBAC
```

Each Epic should include:

1. Business goal.
2. MVP scope.
3. Out of scope.
4. Linked SRS sections.
5. Linked UI/API docs.
6. Acceptance criteria.
7. Demo relevance.

---

## 8.2. Epic list

### PAI-EPIC-01 — Auth & RBAC

Scope:

1. Supabase Auth login.
2. UserProfile mapping.
3. First-login password change.
4. Roles.
5. Permissions.
6. Multi-role RBAC.
7. Ownership rules.
8. Role-based navigation.

Out of scope:

1. Custom username/password.
2. Password/password_hash storage.
3. Custom JWT credential implementation.

Key stories:

1. Implement Supabase login flow.
2. Implement `GET /auth/me`.
3. Implement UserProfile model/API.
4. Implement Admin create staff account.
5. Implement first-login password change.
6. Seed roles/permissions.
7. Implement backend authorization guard.
8. Implement role-based sidebar.
9. Test Staff ownership.
10. Test Warehouse access limits.

---

### PAI-EPIC-02 — Medicine & ActiveIngredient

Scope:

1. Medicine CRUD/deactivation.
2. ActiveIngredient management.
3. Medicine–ActiveIngredient mapping.
4. Price validation.
5. Graph Sync events for changes.

Out of scope:

1. ProductVariant as MVP sales key.
2. Full scraped catalog import.
3. Full commercial catalog.

Key stories:

1. Medicine list/create/edit/deactivate.
2. ActiveIngredient list/create/edit.
3. Medicine form ingredient mapping.
4. Validate selling_price > 0.
5. Prevent duplicate active mapping.
6. Generate graph sync outbox on mapping/rule changes.
7. Seed curated medicines and ingredients.

---

### PAI-EPIC-03 — Supplier

Scope:

1. Supplier list/create/update.
2. Admin deactivate supplier.
3. Warehouse create/update but no deactivate.
4. Supplier used in Stock Import.

Out of scope:

1. Supplier contract.
2. Supplier portal.
3. Purchase order commercial workflow.

Key stories:

1. Supplier API.
2. Supplier UI.
3. Supplier authorization.
4. Supplier seed.
5. Supplier linked to Stock Import.

---

### PAI-EPIC-04 — Inventory & MedicineBatch

Scope:

1. MedicineBatch source of truth.
2. Inventory Summary.
3. Batch Detail.
4. Low-stock from sellable quantity.
5. Near-expiry using default 90 days.
6. Expired batch exclusion.

Out of scope:

1. Aggregate inventory source.
2. Direct quantity edit.
3. Multi-warehouse stock transfer.

Key stories:

1. MedicineBatch model/API.
2. Inventory summary API.
3. Batch detail UI.
4. Low-stock calculation.
5. Near-expiry calculation.
6. Expired batch exclusion.
7. Inventory report support.

---

### PAI-EPIC-05 — Stock Import

Scope:

1. Draft Stock Import.
2. Stock Import details.
3. Confirm Stock Import.
4. Batch creation/merge.
5. Expiry mismatch rejection.
6. Confirmed immutability.

Out of scope:

1. Purchase order workflow.
2. Supplier invoice accounting.

Key stories:

1. Stock Import model/API.
2. Stock Import UI.
3. Confirm import transaction.
4. Validate batch number/expiry/quantity.
5. Reject expiry mismatch.
6. Show affected batches.
7. Test no double confirm.

---

### PAI-EPIC-06 — Inventory Adjustment

Scope:

1. Draft Inventory Adjustment.
2. Reason required.
3. Batch-level quantity change.
4. Confirm Adjustment transaction.
5. No negative stock.
6. Audit.

Out of scope:

1. Direct stock edit.
2. Admin approval workflow for every adjustment.

Key stories:

1. Adjustment model/API.
2. Adjustment UI.
3. Reason validation.
4. Confirm transaction.
5. Before/after quantity snapshot.
6. Negative stock block.
7. Audit log.

---

### PAI-EPIC-07 — POS & Checkout

Scope:

1. POS Draft Order.
2. Order items.
3. Staff ownership.
4. Checkout dedicated route/panel.
5. FEFO allocation.
6. Payment simulation.
7. Invoice generation.
8. Idempotency.
9. Transaction rollback.

Out of scope:

1. `POST /orders/{id}/pay` as main command.
2. Direct invoice creation.
3. Refund/returns.
4. Real bank integration.

Key stories:

1. POS create Draft Order.
2. Add/update/remove order item.
3. Sales availability display.
4. Checkout API.
5. FEFO allocation.
6. Cash payment.
7. Bank transfer simulation.
8. Invoice creation.
9. Idempotency.
10. Checkout failure preserves Draft.
11. Order History/Detail UI.
12. Invoice View UI.

---

### PAI-EPIC-08 — InteractionAlert

Scope:

1. ActiveIngredient-level interaction check.
2. Persist InteractionAlert.
3. Alert display count.
4. Active/inactive alert lifecycle.
5. HIGH acknowledgement.
6. HIGH consultation note.
7. Admin alert history.

Out of scope:

1. Medicine-level official interaction.
2. CRITICAL severity.
3. Warehouse alert access.

Key stories:

1. DrugInteraction Rule API/UI.
2. Interaction check when order changes.
3. Persist InteractionAlert.
4. Update display_count.
5. HIGH ack API/UI.
6. HIGH note API/UI.
7. Checkout block if unresolved.
8. InteractionAlert History screen.
9. Test inactive alert lifecycle.

---

### PAI-EPIC-09 — AI Guardrail & Audit

Scope:

1. Google AI Provider.
2. MockAI fallback.
3. AI Orchestrator.
4. PromptTemplates with version.
5. Input Guardrail.
6. Output Guardrail.
7. Structured output validation.
8. Consultation note draft.
9. Safe follow-up questions.
10. AI Audit Log.

Out of scope:

1. AI diagnosis.
2. AI prescribing.
3. AI dosage advice.
4. AI auto-save official note.
5. MockAI-only as MVP.

Key stories:

1. PromptTemplate seed.
2. GoogleAIAdapter.
3. MockAIAdapter.
4. AI Orchestrator.
5. Input Guardrail.
6. Output Guardrail.
7. AI explanation API.
8. Note draft API.
9. AI Audit persistence.
10. Admin AI Audit UI.
11. Guardrail refusal test.

---

### PAI-EPIC-10 — Graph Sync & Graph-RAG

Scope:

1. Neo4j projection.
2. Medicine nodes.
3. ActiveIngredient nodes.
4. CONTAINS relationship.
5. INTERACTS_WITH relationship.
6. Graph Sync Outbox.
7. Worker/retry.
8. Graph freshness.
9. Graph-RAG read-only.
10. PostgreSQL fallback.

Out of scope:

1. DrugGroup without taxonomy.
2. Symptom/Condition/RedFlag.
3. riskScore.
4. Raw Cypher UI.
5. Graph as source of truth.

Key stories:

1. Neo4j connection.
2. Graph node projection.
3. Relationship projection.
4. Outbox generation.
5. Worker processing.
6. Retry attempts.
7. Freshness check.
8. Graph-RAG query templates.
9. PostgreSQL fallback.
10. Graph Explorer UI.
11. Test stale graph behavior.

---

### PAI-EPIC-11 — Reports

Scope:

1. Revenue Report.
2. Top Medicines Report.
3. Inventory Report.
4. Report filters.
5. Exclusion rules.

Out of scope:

1. Advanced analytics.
2. Forecasting.
3. AI report narrative as MVP blocker.

Key stories:

1. Revenue report API/UI.
2. Top Medicines report API/UI.
3. Inventory report API/UI.
4. Paid-only revenue calculation.
5. Expired excluded from sellable stock.
6. Report seed data validation.

---

### PAI-EPIC-12 — Data & Demo

Scope:

1. Curated seed.
2. Demo users.
3. Demo medicines.
4. Dynamic expiry dates.
5. FEFO scenario.
6. HIGH interaction scenario.
7. Failed payment scenario.
8. Demo reset local-only.
9. Graph rebuild.
10. Smoke checks.

Out of scope:

1. Full scraped data import.
2. Real personal data.
3. Full commercial seed.
4. Standalone Cypher official graph seed.

Key stories:

1. Seed roles/users.
2. Seed medicines/ingredients.
3. Seed stock/import/batches.
4. Seed orders/payments/invoices.
5. Seed interaction alerts.
6. Seed AI prompts/audit.
7. Implement demo reset.
8. Implement local-only safeguards.
9. Implement smoke checks.
10. Demo script.

---

### PAI-EPIC-13 — Testing & Setup

Scope:

1. Local setup.
2. Environment configuration.
3. Test plan.
4. Smoke test.
5. API tests.
6. E2E tests.
7. Release checklist.
8. Documentation setup guide.

Out of scope:

1. Docker as official setup path.
2. Full cross-browser coverage.
3. Global mandatory coverage percentage.
4. Destructive tests against demo DB.

Key stories:

1. Setup guide.
2. Env example.
3. Prisma validation.
4. Backend tests.
5. Frontend tests.
6. E2E demo flow.
7. Smoke test report.
8. Test exit report.

---

## 9. Story Writing Standard

### 9.1. Story format

Each story should follow:

```text
As a [role],
I want [capability],
so that [business/demo value].
```

### 9.2. Required fields for Story

Each Story must include:

1. Summary.
2. User role.
3. Business value.
4. Scope.
5. Out of scope.
6. Acceptance criteria.
7. Related SRS requirement IDs.
8. Related API endpoints if applicable.
9. Related UI screens if applicable.
10. Related database models if applicable.
11. Test notes.
12. Priority.
13. Component.
14. Assignee.
15. Estimate.

### 9.3. Good story example

```text
As a Staff user,
I want checkout to allocate stock using FEFO,
so that the system sells the batch with the nearest expiry date first and preserves batch traceability.
```

Acceptance criteria:

1. Checkout uses only sellable non-expired batches.
2. Nearest expiry batch is allocated first.
3. Allocation can span multiple batches.
4. Batch quantities are deducted in one transaction.
5. Allocation records are visible in Order Detail.
6. Checkout rolls back if stock insufficient.
7. Test verifies expired batch is excluded.

### 9.4. Bad story examples

Bad:

```text
Implement payment.
```

Reason:

1. Too broad.
2. No acceptance criteria.
3. No role.
4. No scope.
5. Does not mention checkout transaction.

Bad:

```text
Create JWT login.
```

Reason:

1. Conflicts with Supabase Auth baseline.

Bad:

```text
Create inventory table.
```

Reason:

1. Could imply aggregate inventory source of truth.

---

## 10. Task Writing Standard

### 10.1. Task purpose

Task breaks Story into implementable work.

Tasks should be small enough to complete and review quickly.

### 10.2. Required fields for Task

Each task should include:

1. Parent Story.
2. Component.
3. Task description.
4. Technical scope.
5. Acceptance checklist.
6. Owner.
7. Estimate.
8. Dependencies.
9. PR link when completed.
10. Test evidence if applicable.

### 10.3. Task categories

Common task types:

1. Backend model/migration.
2. Backend service.
3. Backend controller/API.
4. Backend guard/authorization.
5. Frontend page.
6. Frontend component.
7. API integration.
8. Seed data.
9. Test.
10. Documentation.
11. CI/config.
12. Bugfix.

### 10.4. Task size guideline

Recommended task size:

| Size      | Guideline                 |
| --------- | ------------------------- |
| Small     | 1–3 hours                 |
| Medium    | 4–6 hours                 |
| Large     | Split if > 1 day          |
| Too large | Convert to multiple tasks |

### 10.5. Task example

Parent Story:

```text
PAI-123 Checkout applies FEFO
```

Tasks:

1. Add allocation service method.
2. Add transaction wrapper.
3. Add Payment creation.
4. Add Invoice creation.
5. Add idempotency check.
6. Add integration test.
7. Add Checkout UI success/error state.

---

## 11. Definition of Ready

A Story is Ready only if:

1. Scope is clear.
2. MVP/Should-have/Future classification is known.
3. Acceptance criteria exist.
4. Related requirement is linked.
5. Related API/UI/database impact is understood.
6. Dependencies are identified.
7. Owner or candidate owner is clear.
8. Estimate is provided.
9. No unresolved decision blocks implementation.
10. Out of scope is stated when risk of scope creep exists.
11. Test expectation is defined.
12. UX/API contract is sufficiently clear.

### 11.1. Not Ready examples

Not Ready if:

1. “Implement AI” without specific use case.
2. “Inventory” without MedicineBatch/FEFO rule.
3. “Payment” without checkout transaction boundary.
4. “Graph” without source/freshness/fallback rule.
5. “Customer management” marked MVP blocker.
6. “Use scraped ingredients directly” without curation.

---

## 12. Definition of Done

A Story is Done only if:

1. Code implemented.
2. Requirement acceptance criteria met.
3. Role/permission behavior implemented.
4. Error states handled.
5. Loading/empty states handled if UI story.
6. Backend validation implemented.
7. Tests added or manual test evidence documented.
8. Prisma migration checked if database changed.
9. Seed updated if demo data needed.
10. API/UI traceability updated.
11. CI gate passes.
12. PR reviewed and merged.
13. Jira status updated.
14. No known P0/P1 bug remains for that story.
15. Documentation updated if behavior changed.

### 12.1. Additional Done criteria for critical modules

For Checkout:

1. Transaction works.
2. Idempotency works.
3. FEFO works.
4. Rollback works.
5. One SUCCESS payment rule works.
6. Invoice generated only after success.

For InteractionAlert:

1. Alert persists.
2. HIGH ack/note required.
3. Checkout block verified.
4. History view works.

For AI:

1. Guardrail works.
2. AI Audit writes.
3. Fallback works.
4. Unsafe requests blocked.
5. No raw PII in audit.

For Graph:

1. Outbox created.
2. Worker processes.
3. Freshness calculated.
4. Fallback/safe error works.
5. No raw Cypher exposed.

---

## 13. Sprint / Execution Cycle Plan

### 13.1. Timeline rule

Final deadline:

```text
Before 17/06/2026
```

Target release/demo freeze:

```text
16/06/2026 at latest
```

### 13.2. Execution cycle recommendation

Use short cycles:

1. Cycle 1 — Baseline correction and core backend.
2. Cycle 2 — Critical feature integration.
3. Cycle 3 — Demo stabilization and testing.
4. Freeze — bugfix only.

Because current date in project planning is close to deadline, cycle length should be:

```text
1 week or shorter
```

### 13.3. Suggested phase plan

#### Phase 1 — Baseline/Jira correction

Goals:

1. Revise Jira epics/stories.
2. Remove outdated work.
3. Create MVP critical path.
4. Assign owners.
5. Confirm release owner/backup.
6. Confirm environment plan.

Outputs:

1. Clean Jira backlog.
2. Prioritized MVP stories.
3. Task estimates.
4. Initial release checklist.

#### Phase 2 — Core implementation

Focus:

1. Auth/RBAC.
2. Medicine/ActiveIngredient.
3. Supplier.
4. MedicineBatch.
5. Stock Import.
6. Inventory Adjustment.
7. POS/Order.
8. InteractionAlert.
9. Checkout.

#### Phase 3 — AI/Graph/Reports integration

Focus:

1. AI Guardrail/Audit.
2. Google AI provider.
3. MockAI fallback.
4. Graph Sync.
5. Graph-RAG.
6. Reports.
7. System Settings.

#### Phase 4 — Data/demo/testing

Focus:

1. Curated seed.
2. Demo reset.
3. Graph rebuild.
4. Smoke test.
5. E2E demo flow.
6. Bugfix.
7. Documentation alignment.

#### Phase 5 — Release/demo freeze

Focus:

1. No new scope.
2. Fix P0/P1 bugs only.
3. Run CI.
4. Run smoke test.
5. Final demo script.
6. Release PR from `develop` to `main`.

---

## 14. Capacity Planning Rules

### 14.1. Capacity uncertainty

Exact weekly/hourly capacity per member is unresolved.

Therefore:

1. Do not assume equal capacity.
2. Do not assign all members same workload automatically.
3. Use explicit estimates.
4. Use owner-based commitment.
5. Track blocked tasks daily.

### 14.2. Capacity planning template

For each member:

| Field               | Description                   |
| ------------------- | ----------------------------- |
| Member              | Name                          |
| Available hours     | Estimated for cycle           |
| Primary role        | Backend/Frontend/Testing/etc. |
| Assigned P0/P1 work | Critical tasks                |
| Support work        | Secondary tasks               |
| Risk                | Availability/ramp-up/blocker  |

### 14.3. Critical path priority

Work must prioritize:

1. Auth/RBAC.
2. Medicine/ActiveIngredient.
3. MedicineBatch/Inventory.
4. Stock Import.
5. POS/Checkout.
6. InteractionAlert.
7. AI Guardrail/Audit.
8. Graph Sync/Graph-RAG.
9. Reports.
10. Demo reset/smoke.

Should-have work starts only after critical path is stable.

### 14.4. WIP limit

Recommended WIP limits:

1. Each person max 1–2 active stories.
2. Avoid many half-finished modules.
3. Finish vertical slices.
4. Merge small PRs frequently.
5. Prioritize integration over isolated code.

---

## 15. Branch Model

### 15.1. Official branch model

Official branches:

1. `main`
2. `develop`
3. short-lived `feature/*`
4. short-lived `bugfix/*`
5. short-lived `docs/*`
6. optional `hotfix/*`

### 15.2. main branch

`main` contains:

1. Release/demo-ready code.
2. Code that passed quality gates.
3. Stable release snapshots.

Rules:

1. No direct commits.
2. Merge only by reviewed release PR from `develop`.
3. CI must pass.
4. Project Leader/Release Owner approval required.

### 15.3. develop branch

`develop` contains:

1. Integrated upcoming release work.
2. Feature merges after PR review.
3. CI-passing integration code.

Rules:

1. No broken code.
2. PR required.
3. CI gate required.
4. Used for integration testing before release.

### 15.4. feature branches

Format:

```text
feature/PAI-123-short-description
```

Examples:

```text
feature/PAI-123-checkout-fefo
feature/PAI-145-ai-audit-log
feature/PAI-167-graph-sync-worker
```

### 15.5. bugfix branches

Format:

```text
bugfix/PAI-234-short-description
```

Example:

```text
bugfix/PAI-234-fix-high-alert-checkout-block
```

### 15.6. docs branches

Format:

```text
docs/PAI-300-update-api-spec
```

### 15.7. Branches not recommended

Do not create long-lived branch per Epic unless necessary.

Avoid:

1. `auth-epic`
2. `inventory-epic`
3. `ai-epic`
4. `graph-epic`

Reason:

1. Causes merge conflicts.
2. Delays integration.
3. Hides issues until late.

---

## 16. Commit / PR Rules

### 16.1. Commit message rule

Commit should include Jira key.

Format:

```text
PAI-123 short description
```

Examples:

```text
PAI-123 implement checkout idempotency check
PAI-145 add ai audit log model
PAI-167 add graph sync retry worker
```

### 16.2. PR title rule

PR title should include Jira key:

```text
PAI-123 Implement checkout FEFO transaction
```

### 16.3. PR description template

Each PR should include:

1. Jira issue link.
2. Summary.
3. Changes made.
4. Screenshots if UI.
5. API/test notes.
6. Migration notes if database changed.
7. Seed notes if data changed.
8. Risk/rollback notes.
9. Checklist.

### 16.4. PR checklist

Minimum PR checklist:

| Item                            |            Required |
| ------------------------------- | ------------------: |
| Linked Jira issue               |                 Yes |
| CI passed                       |                 Yes |
| Tests added/updated             |       If applicable |
| Manual test notes               |                 Yes |
| No secrets committed            |                 Yes |
| No password/password_hash added |                 Yes |
| No baseline conflict            |                 Yes |
| Migration reviewed              |       If applicable |
| UI screenshot attached          |               If UI |
| Documentation updated           | If behavior changed |

### 16.5. Review rules

1. At least one reviewer required.
2. Critical modules should have stricter review.
3. Checkout/Interaction/AI/Graph changes need careful review.
4. Reviewer should check baseline conflict.
5. PR should not mix unrelated features.

### 16.6. Merge rules

Merge to `develop` only if:

1. PR approved.
2. CI passes.
3. No unresolved critical comment.
4. Jira issue moved to correct status.
5. Migration/seed impact understood.

Merge to `main` only through release PR.

---

## 17. CI Quality Gate

### 17.1. Official minimum CI gate

The minimum CI quality gate includes:

1. Lint.
2. Type check.
3. Unit tests.
4. Integration tests.
5. Prisma validation.
6. Migration check.
7. Frontend build.
8. Backend build.

These checks are required for merges to:

1. `develop`.
2. `main`.

### 17.2. Recommended CI stages

#### Stage 1 — Install

1. Install dependencies.
2. Verify lockfile.
3. Cache dependencies if needed.

#### Stage 2 — Static validation

1. Lint frontend.
2. Lint backend.
3. Type check frontend.
4. Type check backend.

#### Stage 3 — Prisma validation

1. `prisma validate`.
2. `prisma format --check` if available.
3. Migration status/check.

#### Stage 4 — Tests

1. Backend unit tests.
2. Backend integration tests.
3. Frontend component tests if implemented.
4. Critical service tests:

   * Checkout.
   * FEFO.
   * InteractionAlert.
   * AI Guardrail.
   * Graph Sync.

#### Stage 5 — Build

1. Backend build.
2. Frontend build.

### 17.3. CI failure rule

If CI fails:

1. PR cannot merge.
2. Assignee fixes or reverts.
3. Jira remains In Review/In Progress.
4. Release freeze cannot proceed.

### 17.4. Tests not finalized note

Automated testing toolchain is not fully finalized, but recommended stack is:

1. Jest for backend unit/integration.
2. Jest + Supertest for API integration.
3. React Testing Library for frontend components.
4. Playwright for E2E.
5. Postman for manual API collection.

Until officially adopted, CI must still include equivalent checks for:

1. lint.
2. type check.
3. unit/integration tests.
4. migration validation.
5. builds.

---

## 18. Release / Demo Freeze Plan

### 18.1. Release freeze target

Target release/demo freeze:

```text
16/06/2026 at latest
```

Final deadline:

```text
Before 17/06/2026
```

### 18.2. Freeze meaning

After freeze:

1. No new features.
2. No scope expansion.
3. No refactor unless fixing blocker.
4. Only P0/P1 bugfix.
5. Only demo stabilization.
6. Documentation finalization allowed.
7. Seed/smoke fixes allowed if demo-blocking.

### 18.3. Freeze entry criteria

To enter freeze:

1. `develop` CI passes.
2. Critical MVP flows work.
3. Demo reset works locally.
4. Smoke test passes.
5. No open P0 bug.
6. P1 bugs have owner or accepted workaround.
7. Graph projection works or fallback behavior documented.
8. AI provider/fallback works.
9. Reports show data.
10. Demo script prepared.

### 18.4. Critical MVP demo flows

Freeze must verify:

1. Login as Admin/Staff/Warehouse.
2. First-login password change demo.
3. Admin user/role view.
4. Medicine/ActiveIngredient management.
5. Supplier/Stock Import confirm.
6. Inventory Summary and Batch Detail.
7. Inventory Adjustment confirm.
8. POS Draft Order.
9. HIGH InteractionAlert handling.
10. AI explanation/note draft.
11. Checkout with FEFO.
12. Payment and Invoice.
13. Order History/Detail.
14. Reports.
15. System Settings near-expiry threshold.
16. Graph-RAG path/provenance.
17. AI Audit Log.

### 18.5. Release PR

Release PR flow:

```text
develop → main
```

Release PR must include:

1. Summary of implemented MVP scope.
2. CI result.
3. Smoke test result.
4. Known limitations.
5. Demo reset command note.
6. Environment note.
7. Approval from Release/Demo Owner.
8. Approval from Project Leader.

### 18.6. Backup evidence

Backup evidence may include:

1. Screenshots.
2. Postman collection.
3. Optional video.
4. Smoke test output.
5. Seed summary.
6. Graph projection screenshot.
7. AI Audit screenshot.

Important:

Backup evidence does not replace running product.

---

## 19. Release Ownership

### 19.1. Required ownership

Before release freeze, the team must name:

1. Release/Demo Owner.
2. Release/Demo Backup.

This remains unresolved until assigned.

### 19.2. Release/Demo Owner responsibilities

1. Own release checklist.
2. Ensure CI passes.
3. Run demo reset.
4. Run smoke test.
5. Validate demo script.
6. Prepare release PR.
7. Track blockers.
8. Coordinate final bugfix.
9. Confirm freeze readiness.
10. Report to Project Leader.

### 19.3. Backup responsibilities

1. Re-run demo if needed.
2. Execute demo reset.
3. Understand environment.
4. Recover from common failure.
5. Present backup evidence if needed.

### 19.4. Release readiness sign-off

Release readiness requires:

1. Tester report.
2. Release/Demo Owner confirmation.
3. Project Leader approval.

Informal team confidence alone is not sufficient.

---

## 20. Unresolved PM Decisions

### 20.1. Unresolved decision list

| ID       | Decision                           | Status     | Recommended default                                                  |
| -------- | ---------------------------------- | ---------- | -------------------------------------------------------------------- |
| PM-UR-01 | Exact capacity per member          | Unresolved | Estimate per task and assign named owner                             |
| PM-UR-02 | Dedicated demo/staging environment | Unresolved | Create separate demo/staging if possible                             |
| PM-UR-03 | Release/Demo Owner                 | Unresolved | Assign one primary owner                                             |
| PM-UR-04 | Release/Demo Backup                | Unresolved | Assign one backup                                                    |
| PM-UR-05 | Final automated testing stack      | Unresolved | Use recommended Jest/Supertest/RTL/Playwright/Postman unless changed |
| PM-UR-06 | Final environment ownership        | Unresolved | Release/Demo Owner manages env readiness                             |

### 20.2. Rules for unresolved decisions

1. Do not block execution if recommended default is safe.
2. Do not assume unresolved item is approved.
3. Mark Jira items dependent on unresolved decisions.
4. Project Leader must approve final choice.
5. Update Decision Log when resolved.

---

## 21. Change Control

### 21.1. Scope owner

Project Leader is scope owner.

Major scope changes require Project Leader approval.

### 21.2. Scope change categories

| Category                        | Example                        | Approval                            |
| ------------------------------- | ------------------------------ | ----------------------------------- |
| Minor clarification             | Rename label, adjust text      | Project Leader or owner             |
| Technical implementation detail | Library choice inside baseline | Tech owner + Project Leader if risk |
| MVP scope change                | Add/remove MVP feature         | Project Leader                      |
| Business rule change            | Change checkout/alert rule     | Project Leader, update Decision Log |
| Architecture change             | Replace Supabase/Prisma/Neo4j  | Project Leader, major review        |
| Deadline/release change         | Freeze date change             | Project Leader                      |

### 21.3. Change request template

Each change request should include:

```text
Change Request ID:
Title:
Requested by:
Date:
Current baseline:
Proposed change:
Reason:
Scope impact:
Affected documents:
Affected Jira epics/stories:
Affected API/UI/database/testing:
Risk:
Decision:
Approved by:
Decision date:
```

### 21.4. Change impact matrix

Any approved change must update affected artifacts.

| Change area   | Documents likely affected   |
| ------------- | --------------------------- |
| Scope         | Document 03, 04, 05, 06, 19 |
| Business rule | Document 04, 05, 06, 08, 20 |
| API           | Document 06, 12, 20         |
| UI            | Document 15, 20             |
| Database      | Document 13, 14, 18, 20     |
| AI            | Document 16, 12, 15, 20     |
| Graph         | Document 17, 12, 16, 20     |
| Testing       | Document 20, 19             |
| Demo data     | Document 18, 20             |

### 21.5. Rejected scope returns

The following must not be reintroduced without explicit scope change approval:

1. Custom username/password/JWT auth.
2. Password/password_hash in PostgreSQL.
3. Aggregate inventory source of truth.
4. Medicine-level official interaction.
5. MockAI-only MVP.
6. MockGraph-only MVP.
7. Direct payment/invoice command outside checkout.
8. `POST /orders/{id}/pay` as main command.
9. Full Customer Management as MVP blocker.
10. Full 100-table schema as MVP.
11. Raw scraped ingredients as official ActiveIngredients.
12. Price = 0 seed for sellable medicines.
13. Dropping HIGH acknowledgement/note.
14. Dropping Graph Sync Outbox/Freshness.

---

## 22. Jira Revision Checklist

### 22.1. Remove or rewrite outdated Jira items

Existing Jira must be revised to remove/rewrite items based on old design.

Remove/rewrite items mentioning:

1. Custom JWT.
2. Username/password auth.
3. Password hash.
4. Aggregate inventory.
5. Direct quantity edit.
6. Medicine-level interaction rule.
7. MockAI-only MVP.
8. MockGraph-only MVP.
9. `/orders/{id}/pay` as official payment command.
10. Direct invoice creation.
11. Full Customer Management as MVP.
12. 100-table schema as MVP requirement.
13. ProductVariant as MVP sales key.
14. Raw Cypher user API.
15. DrugGroup from category data.

### 22.2. Add missing MVP Jira items

Jira must add missing stories for:

1. Supabase Auth integration.
2. UserProfile mapping.
3. First-login password change.
4. Multi-role RBAC.
5. Permission matrix.
6. Supplier Management.
7. ActiveIngredient Management.
8. MedicineIngredient mapping.
9. MedicineBatch.
10. Stock Import confirm.
11. Inventory Adjustment confirm.
12. Inventory Summary/Batch Detail.
13. FEFO checkout.
14. Idempotency.
15. Payment attempts and one-success rule.
16. Invoice after checkout.
17. ActiveIngredient-level DrugInteraction.
18. InteractionAlert lifecycle.
19. HIGH acknowledgement/note.
20. InteractionAlert History.
21. AI Guardrail.
22. AI Audit.
23. Google AI Provider.
24. MockAI fallback.
25. Graph Sync Outbox.
26. Graph Sync Worker.
27. Freshness detection.
28. Graph-RAG.
29. PostgreSQL fallback.
30. Reports.
31. System Settings near-expiry threshold.
32. Curated seed.
33. Demo reset local-only.
34. Smoke tests.

### 22.3. Update priorities

Set P0/P1 for:

1. Auth/RBAC.
2. Medicine/ActiveIngredient.
3. MedicineBatch/Inventory.
4. POS/Checkout.
5. InteractionAlert.
6. AI Guardrail/Audit.
7. Graph Sync/Graph-RAG.
8. Reports.
9. Demo reset/smoke.

Move to P3/P4:

1. Full Customer Management.
2. Advanced analytics.
3. AI report narrative.
4. Prompt editing UI.
5. Provider config UI.
6. Graph Sync Status UI.
7. Full audit log UI.
8. Multi-store/multi-warehouse.
9. Online commerce.
10. Refund/return.

### 22.4. Add traceability fields

Each Jira story should include:

1. SRS reference.
2. API reference.
3. UI screen reference.
4. Test reference.
5. MVP/Should-have/Future label.
6. Demo relevance.

---

## 23. Traceability Jira → SRS / API / UI / Testing

### 23.1. Traceability principle

Every MVP Jira Story must map to at least one:

1. SRS requirement.
2. Use Case or UI screen.
3. API group or backend module.
4. Test scenario.

### 23.2. Traceability matrix example

| Jira Epic                 | SRS                            | API                                    | UI                              | Testing                        |
| ------------------------- | ------------------------------ | -------------------------------------- | ------------------------------- | ------------------------------ |
| Auth & RBAC               | FR-AUTH, FR-RBAC               | Auth/Profile, User APIs                | Login, User Management          | Auth/RBAC tests                |
| Medicine/ActiveIngredient | FR-MED, FR-ACT                 | Medicine, ActiveIngredient APIs        | Medicine, Ingredient screens    | CRUD/mapping tests             |
| Supplier                  | FR-SUP                         | Supplier APIs                          | Supplier screens                | Supplier permission tests      |
| Inventory/MedicineBatch   | FR-BAT                         | Inventory APIs                         | Inventory Summary, Batch Detail | Batch/expiry tests             |
| Stock Import              | FR-STI                         | Stock Import APIs                      | Stock Import screens            | Confirm/expiry mismatch tests  |
| Inventory Adjustment      | FR-ADJ                         | Adjustment APIs                        | Adjustment screens              | Reason/negative stock tests    |
| POS/Checkout              | FR-POS, FR-CHK, FR-PAY, FR-INV | Order, Checkout, Payment, Invoice APIs | POS, Checkout, Invoice          | FEFO/payment/invoice tests     |
| InteractionAlert          | FR-DRG, FR-ALT                 | Interaction, Alert APIs                | Alert Panel, Alert History      | HIGH ack/note tests            |
| AI Guardrail/Audit        | FR-AIC, FR-AIG, FR-AIA         | AI APIs                                | AI Copilot, AI Audit            | Guardrail/audit/fallback tests |
| Graph Sync/Graph-RAG      | FR-GSY, FR-GRG                 | Graph APIs                             | Graph-RAG, Graph Explorer       | Sync/freshness/fallback tests  |
| Reports                   | FR-RPT                         | Reports APIs                           | Reports screens                 | Report correctness tests       |
| Data/Demo                 | FR-DMO                         | Demo reset/internal                    | Demo flows                      | Smoke tests                    |

### 23.3. Jira ticket traceability template

Each MVP story should include:

```text
Related SRS:
Related Use Case:
Related API:
Related UI:
Related DB/Prisma:
Related Test:
Demo relevance:
```

### 23.4. Traceability quality rule

A story without traceability is not Ready unless it is:

1. Pure infrastructure task.
2. Pure documentation task.
3. Bugfix with linked bug context.

---

## 24. Project Risk Management

### 24.1. Key risks

| Risk                  | Impact                | Mitigation                                   |
| --------------------- | --------------------- | -------------------------------------------- |
| Too much scope        | Miss deadline         | Strict MVP/Should-have/Future classification |
| Jira old baseline     | Wrong implementation  | Major Jira revision                          |
| Checkout complexity   | Critical demo failure | Prioritize early, test deeply                |
| AI provider failure   | Demo instability      | MockAI fallback                              |
| Neo4j sync failure    | Graph demo degraded   | PostgreSQL fallback + smoke test             |
| Seed instability      | Demo inconsistent     | Local demo reset + smoke checks              |
| Team capacity unclear | Overcommitment        | Task-hour estimate and named owner           |
| CI failures late      | Release delay         | Run CI continuously                          |
| UI incomplete         | Demo hard to follow   | Prioritize critical flows                    |
| Testing too late      | Hidden bugs           | Continuous smoke/regression                  |

### 24.2. Risk severity rule

P0 risk:

1. Blocks demo.
2. Breaks checkout.
3. Breaks login.
4. Breaks data reset.
5. Breaks core seed.
6. Breaks high alert safety.

P1 risk:

1. Affects important MVP module.
2. Has workaround but degrades demo.
3. Fails critical test but not total blocker.

P2/P3:

1. Should-have.
2. Cosmetic.
3. Non-critical enhancement.

---

## 25. Release Readiness Checklist

Before release/demo:

| Item                                              | Expected |
| ------------------------------------------------- | -------- |
| Jira P0 complete                                  | Yes      |
| Jira P1 complete or accepted workaround           | Yes      |
| CI passes on develop                              | Yes      |
| Release PR ready                                  | Yes      |
| Demo reset local works                            | Yes      |
| Smoke test passes                                 | Yes      |
| Supabase demo users provisioned                   | Yes      |
| Prisma migrations applied                         | Yes      |
| Seed data valid                                   | Yes      |
| Neo4j projection fresh                            | Yes      |
| Google AI configured or fallback ready            | Yes      |
| MockAI fallback verified                          | Yes      |
| POS to checkout flow works                        | Yes      |
| HIGH alert flow works                             | Yes      |
| FEFO allocation works                             | Yes      |
| Invoice view works                                | Yes      |
| Reports work                                      | Yes      |
| Graph-RAG works or fallback behavior demonstrated | Yes      |
| AI Audit visible/checkable                        | Yes      |
| Known limitations documented                      | Yes      |
| Demo script prepared                              | Yes      |
| Release/Demo Owner signs off                      | Yes      |
| Tester signs off                                  | Yes      |
| Project Leader approves                           | Yes      |

---

## 26. Kết luận

Document 19 — Project Management, Jira & Release Plan đã xác định kế hoạch quản lý dự án, cấu trúc Jira, GitHub workflow, execution cycle, CI gate, release/demo freeze, ownership và change control cho **PharmaAssist AI Intelligence**.

Tài liệu này đã làm rõ:

1. Dự án dùng Agile/Scrum-light với execution cycle ngắn.
2. Team chính thức có 4 thành viên.
3. Jira là source of truth cho planning/status.
4. GitHub là source of truth cho source code/PR/CI.
5. Jira cũ cần major revision theo baseline mới.
6. Component structure phải bám module baseline.
7. Epic structure phải gồm:

   * Auth/RBAC.
   * Medicine/ActiveIngredient.
   * Supplier.
   * Inventory/MedicineBatch.
   * Stock Import.
   * Inventory Adjustment.
   * POS/Checkout.
   * InteractionAlert.
   * AI Guardrail/Audit.
   * Graph Sync/Graph-RAG.
   * Reports.
   * Data/Demo.
   * Testing/Setup.
8. Story/Task standards đã được định nghĩa.
9. Definition of Ready và Definition of Done đã được xác định.
10. Execution cycle nên là 1 tuần hoặc ngắn hơn.
11. Capacity planning phải dựa trên task-hour estimate và named ownership.
12. Branch model chính thức là:

* `main`.
* `develop`.
* short-lived feature/bugfix/docs branches.

13. Merge vào `main` chỉ qua release PR từ `develop`.
14. CI quality gate gồm:

* lint.
* type check.
* unit tests.
* integration tests.
* Prisma validation.
* migration check.
* frontend build.
* backend build.

15. Release/demo freeze target là 16/06/2026 at latest.
16. Release/Demo Owner và Backup vẫn cần được bổ nhiệm.
17. Scope change phải được Project Leader phê duyệt.
18. Jira revision checklist đã chỉ rõ những item cần xóa/sửa/thêm.
19. Traceability Jira → SRS/API/UI/Testing đã được thiết lập.
20. Release readiness checklist đã được xác định.

Các baseline quan trọng được giữ đúng:

1. Không quay lại custom JWT/password auth.
2. Không lưu password/password_hash trong PostgreSQL.
3. Không dùng aggregate inventory làm source of truth.
4. Không dùng Medicine-level interaction rule làm official rule.
5. Không dùng MockAI-only hoặc MockGraph-only làm MVP.
6. Không tách payment/invoice khỏi checkout transaction.
7. Không dùng `/orders/{id}/pay` làm command chính.
8. Không đưa full Customer Management thành MVP blocker.
9. Không đưa full 100-table schema thành MVP.
10. Không bỏ HIGH acknowledgement/consultation note.
11. Không bỏ Graph Sync Outbox/freshness.
12. Không bỏ CI gate đã chốt.

Document 19 là input trực tiếp cho:

1. Jira backlog revision.
2. Sprint/execution cycle setup.
3. GitHub branch/PR workflow.
4. CI configuration.
5. Release/demo freeze planning.
6. Demo readiness tracking.
7. Document 20 — Testing, Demo & Setup Guide.
