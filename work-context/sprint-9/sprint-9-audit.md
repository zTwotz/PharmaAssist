# Sprint 9 Audit — PharmaAssist AI Intelligence

> **Pre-implementation technical and operational audit**
>
> Repository path đề xuất:
>
> `work-context/sprint-9/sprint-9-audit.md`
>
> Tài liệu này phải được hoàn thành trước khi chạy `sprint-9-agent-prompt.md`.

---

# 1. Audit Purpose

Sprint 9 Audit xác minh repository, dependency, branch inventory, môi trường và thiết kế đã đủ an toàn để triển khai:

```text
Graph-RAG
PostgreSQL fallback
Reports
System Settings
```

Audit không phải phiên coding.

Trong Audit:

- Không triển khai feature mới.
- Không apply migration Sprint 9.
- Không tạo hoặc sửa production data.
- Không ghi thử nghiệm không kiểm soát lên Neo4j AuraDB.
- Không tạo branch thay thế.
- Không merge PR.
- Không bắt đầu Sprint 9 implementation.

Kết quả hợp lệ:

```text
Sprint 9 Audit = PASS
Mandatory Gates PASS = 18/18
Ready to implement Sprint 9 = Yes
```

hoặc:

```text
Sprint 9 Audit = FAIL
Ready to implement Sprint 9 = No
```

hoặc:

```text
Sprint 9 Audit = BLOCKED
Ready to implement Sprint 9 = No
```

---

# 2. Official Sprint 9 Scope

```text
Sprint:
Sprint 9 — Graph-RAG, PostgreSQL Fallback, Reports & System Settings

Tasks:
PAC-TASK-391 → PAC-TASK-424

Task count:
34

Task Jira Keys:
PAC-601 → PAC-634

Implementation Stories:
US-129 → US-141
US-144

Story count:
14

Story Points:
45

Core Epics:
PAC-EPIC-15 — Graph-RAG
PAC-EPIC-16 — Reports
PAC-EPIC-17 — System Settings

Supporting Epic:
PAC-EPIC-19 — Testing, Smoke Test & Release Readiness

Branch inventory:
34 Task + 14 Story + 3 Core Epic = 51
```

Dependencies:

```text
US-142 — AI provider/model backend config
US-143 — Seed official prompt templates
```

hai Story trên đã hoàn tất trong Sprint 7 và chỉ là dependency; không triển khai lại trong Sprint 9.

---

# 3. Canonical Sources

Đọc và đối chiếu:

1. `AGENTS.md`
2. `.agents/rules/rules-w-pharmaassist.md`
3. `WORKING-CONTEXT.md`
4. `DESIGN.md`
5. `Jira/branch-on-jira.md`
6. `Jira/jira-mapping.md`
7. `Jira/2_Epic.md`
8. `Jira/3_Stories.md`
9. `Jira/4C_Task_List_MVP_AI_Graph_Report_Demo_291_435.md`
10. `Jira/4C_Task_Description_MVP_AI_Graph_Report_Demo_291_435.md`
11. `Jira/5_Sprint.md`
12. Sprint 7 Final Review report.
13. Sprint 8 plan, progress, audit và Final Review report.
14. `work-context/sprint-9/sprint-9.md`
15. `work-context/sprint-9/sprint-9-progress.md`
16. Prisma schema và migrations.
17. Sprint 7 AI provider, guardrail, prompt và audit implementation.
18. Sprint 8 Graph Sync, projection và freshness implementation.
19. Existing Reports, Inventory, Order, Payment, Invoice và Settings code.
20. Current Git/GitHub state.

Canonical priority:

```text
Jira/branch-on-jira.md
→ repository/Git history
→ GitHub
→ Prisma/Supabase/Neo4j evidence
→ Sprint documents
→ Jira manual status
```

---

# 4. Mandatory Gates

Sprint 9 Audit gồm 18 Gate:

1. Sprint 8 Final Review dependency.
2. Repository and remote baseline.
3. Sprint scope and mapping.
4. Exact branch inventory.
5. GitHub capability and workflow.
6. PostgreSQL/Supabase safety.
7. Neo4j AuraDB safety.
8. Sprint 7 AI safety/provider dependency.
9. Sprint 8 Graph Sync/projection dependency.
10. Graph-RAG architecture and source-selection design.
11. Allowlisted query and raw Cypher security.
12. Provenance, freshness and fallback contract.
13. Checkout independence and medical safety.
14. Reports deterministic design.
15. System Settings and near-expiry design.
16. Prisma/migration and data-impact readiness.
17. Testing and Local Quality Gate readiness.
18. Findings, blockers and final authorization.

PASS yêu cầu:

```text
Mandatory Gates PASS = 18/18
Blocking findings = 0
High findings = 0
```

---

# 5. Gate 01 — Sprint 8 Final Review Dependency

Xác minh:

- [ ] Sprint 8 implementation đã hoàn tất.
- [ ] Sprint 8 Final Review = PASS.
- [ ] Ready for Sprint 9 = Yes.
- [ ] 35/35 Sprint 8 Tasks verified.
- [ ] 12/12 Sprint 8 Story Reviews PASS.
- [ ] PAC-EPIC-14 Review PASS.
- [ ] GraphSyncOutbox ổn định.
- [ ] Graph Sync worker ổn định.
- [ ] Neo4j projection ổn định.
- [ ] Freshness contract ổn định.
- [ ] Blocking Sprint 8 defects = 0.
- [ ] High Sprint 8 defects = 0.
- [ ] Latest Sprint 8 changes có trên remote `develop`.

Nếu Sprint 8 Final Review chưa PASS:

```text
Gate 01 = BLOCKED
Ready to implement Sprint 9 = No
```

Evidence:

| Evidence | Expected | Actual | Result |
|---|---|---|---|
| Sprint 8 Final Review | PASS | — | Pending |
| Ready for Sprint 9 | Yes | — | Pending |
| Sprint 8 Tasks | 35/35 | — | Pending |
| Sprint 8 Stories | 12/12 | — | Pending |
| PAC-EPIC-14 | PASS | — | Pending |
| Blocking/High defects | 0/0 | — | Pending |

```text
Gate 01 = PASS / FAIL / BLOCKED
```

---

# 6. Gate 02 — Repository and Remote Baseline

Commands:

```bash
git fetch --all --prune
git switch develop
git pull origin develop
git status --short
git rev-parse HEAD
git rev-parse origin/develop
git log origin/develop --oneline -n 100
```

Checklist:

- [ ] Local branch là `develop`.
- [ ] `HEAD = origin/develop`.
- [ ] Working tree sạch.
- [ ] Không có untracked source/migration file quan trọng.
- [ ] Không có unresolved conflict.
- [ ] Không có debug-only code từ Sprint 8.
- [ ] Không có uncommitted output do lint `--fix`.
- [ ] `WORKING-CONTEXT.md` phản ánh trạng thái mới nhất.
- [ ] Sprint 8 Final Review evidence có trên repository hoặc được cung cấp rõ.
- [ ] Không có Sprint 9 feature code bị triển khai trước Audit.

Sensitive file check:

```bash
git ls-files | grep -E '(^|/)\.env($|\.)|\.pem$|\.p12$|(^|/)id_rsa$' || true
```

```text
Gate 02 = PASS / FAIL / BLOCKED
```

---

# 7. Gate 03 — Sprint Scope and Mapping

Xác minh chính xác:

```text
Tasks = PAC-TASK-391 → PAC-TASK-424
Task Jira Keys = PAC-601 → PAC-634
Stories = US-129 → US-141 và US-144
Story count = 14
Story Points = 45
Core Epics = PAC-EPIC-15, PAC-EPIC-16, PAC-EPIC-17
```

Checklist:

- [ ] Có đúng 34 Task.
- [ ] Không thiếu hoặc trùng Logical Task.
- [ ] Mỗi Task map đúng Story.
- [ ] Mỗi Task map đúng Epic.
- [ ] US-142 và US-143 được ghi là dependency, không triển khai lại.
- [ ] Không kéo Admin Graph Sync UI vào Sprint 9.
- [ ] Không kéo Graph Explorer vào Sprint 9.
- [ ] Không kéo AI Provider/Prompt Management UI vào Sprint 9.
- [ ] Không kéo AI Business Report Narrative vào Sprint 9.
- [ ] Không kéo future/commercial backlog vào Sprint 9.
- [ ] Report scope chỉ gồm Revenue, Top Medicines, Inventory.
- [ ] Settings scope chỉ gồm near-expiry threshold MVP.

Summary:

| Scope | Expected | Actual | Result |
|---|---:|---:|---|
| Tasks | 34 | — | Pending |
| Stories | 14 | — | Pending |
| Core Epics | 3 | — | Pending |
| Story Points | 45 | — | Pending |

```text
Gate 03 = PASS / FAIL / BLOCKED
```

---

# 8. Gate 04 — Exact Branch Inventory

Canonical source:

```text
Jira/branch-on-jira.md
```

Expected:

```text
34 Task branches
14 Story branches
3 Core Epic branches
Total = 51
```

First logical Task:

```text
PAC-TASK-391
Jira Key: PAC-601
Exact branch:
feature/PAC-601-task-391-implement-graph-rag-interaction-explanation-service
```

First technical execution Task:

```text
PAC-TASK-392
Jira Key: PAC-602
Exact branch:
feature/PAC-602-task-392-build-allowlisted-graph-query-templates
```

Last Task:

```text
PAC-TASK-424
Jira Key: PAC-634
Exact branch:
test/PAC-634-task-424-add-system-settings-validation-and-tests
```

Checklist:

- [ ] 34/34 exact Task branches map đúng.
- [ ] 14/14 exact Story branches map đúng.
- [ ] 3/3 Core Epic branches map đúng.
- [ ] Exact branches tồn tại trên remote.
- [ ] Không có shortened/replacement branch.
- [ ] Không có branch slug bị tự sửa.
- [ ] Các canonical slug bị cắt ngắn vẫn được dùng nguyên văn.
- [ ] Technical order không làm thay đổi Logical/Jira mapping.
- [ ] Story/Epic branches chỉ dùng traceability, không tạo merge layer.

| Category | Expected | Verified | Result |
|---|---:|---:|---|
| Task | 34 | — | Pending |
| Story | 14 | — | Pending |
| Core Epic | 3 | — | Pending |
| **Total** | **51** | — | Pending |

Nếu exact branch thiếu:

```text
Không tự tạo branch
Không dùng branch gần giống
Dừng và báo blocker
```

```text
Gate 04 = PASS / FAIL / BLOCKED
```

---

# 9. Gate 05 — GitHub Capability and Workflow

Workflow chính thức:

```text
Task/Bug branch
→ PR vào develop
→ Local Quality Gate
→ merge vào develop
```

Checklist:

- [ ] GitHub authentication hoạt động.
- [ ] Có quyền đọc remote branches.
- [ ] Có quyền push exact Task branches.
- [ ] Có quyền tạo PR vào `develop`.
- [ ] Có quyền kiểm tra mergeability.
- [ ] Có quyền merge Task/Bug PR khi Local Quality Gate PASS.
- [ ] Không cần tạo Story PR.
- [ ] Không cần tạo Epic PR.
- [ ] Không push trực tiếp vào `develop`.
- [ ] Không push trực tiếp vào `main`.
- [ ] AI Agent không merge `develop → main`.
- [ ] Jira không phải implementation gate.
- [ ] Project Owner quản lý Jira thủ công.

GitHub Actions:

```text
CI = N/A — GitHub Actions chưa được cấu hình
Quality Gate = Local Quality Gate
```

```text
Gate 05 = PASS / FAIL / BLOCKED
```

---

# 10. Gate 06 — PostgreSQL and Supabase Safety

Checklist:

- [ ] Xác định Supabase/PostgreSQL environment dùng cho Sprint 9.
- [ ] Không chạy destructive tests trên demo/production database.
- [ ] Có controlled test data hoặc cleanup strategy.
- [ ] PostgreSQL tiếp tục là source of truth.
- [ ] Graph-RAG fallback có relational source tương ứng.
- [ ] Orders/Payments/Invoices data đủ cho report verification.
- [ ] MedicineBatch data đủ cho Inventory Report.
- [ ] System Settings migration có safe environment.
- [ ] Prisma migration history sạch.
- [ ] Không có drift chưa giải thích.
- [ ] Không reset toàn bộ database.
- [ ] Không sửa schema thủ công để né migration.
- [ ] Credentials không nằm trong source/log/evidence.

Required data scenarios:

```text
PAID order
DRAFT order
CANCELLED order
failed payment attempt
multiple medicines
expired batch
near-expiry batch
normal sellable batch
```

```text
Gate 06 = PASS / FAIL / BLOCKED
```

---

# 11. Gate 07 — Neo4j AuraDB Safety

Checklist:

- [ ] AuraDB URI/username/password có trong backend environment.
- [ ] Không có credential trong source hoặc docs.
- [ ] Runtime dùng backend Neo4j driver/service.
- [ ] MCP chỉ là tooling hỗ trợ.
- [ ] AuraDB health check an toàn.
- [ ] Có projected Medicine nodes.
- [ ] Có projected ActiveIngredient nodes.
- [ ] Có CONTAINS relationships.
- [ ] Có INTERACTS_WITH relationships.
- [ ] Projection metadata có `sourceVersion` hoặc equivalent.
- [ ] Freshness service đọc được trạng thái.
- [ ] Có test strategy cho unavailable/stale graph.
- [ ] Không chạy destructive global cleanup.
- [ ] Không expose raw Neo4j driver/session cho frontend.
- [ ] Không dùng production graph cho destructive tests.

Forbidden:

```cypher
MATCH (n) DETACH DELETE n
```

trên AuraDB dùng chung.

```text
Gate 07 = PASS / FAIL / BLOCKED
```

---

# 12. Gate 08 — Sprint 7 AI Safety and Provider Dependency

Xác minh:

- [ ] Provider abstraction tồn tại.
- [ ] Google AI primary provider hoạt động hoặc được cấu hình an toàn.
- [ ] MockAI fallback hoạt động.
- [ ] Input guardrail hoạt động.
- [ ] Diagnosis request bị block.
- [ ] Prescribing request bị block.
- [ ] Dosage-advice request bị block.
- [ ] Provider không được gọi khi input bị block.
- [ ] PII minimization hoạt động.
- [ ] Structured output validation hoạt động.
- [ ] Output guardrail hoạt động.
- [ ] Prompt template/versioning hoạt động.
- [ ] AI Audit metadata hoạt động.
- [ ] Audit không lưu raw PII/secret.
- [ ] AI disclaimer contract tồn tại.
- [ ] Graph-RAG pipeline có thể tái sử dụng các control này.

Required rule:

```text
Graph context không được bypass AI Guardrail,
Structured Output Validation hoặc AI Audit.
```

```text
Gate 08 = PASS / FAIL / BLOCKED
```

---

# 13. Gate 09 — Sprint 8 Graph Dependency

Xác minh trực tiếp code/evidence:

- [ ] GraphSyncOutbox model và migration ổn định.
- [ ] Worker loop ổn định.
- [ ] Atomic/idempotent claiming ổn định.
- [ ] Retry/max attempts ổn định.
- [ ] Medicine projection ổn định.
- [ ] ActiveIngredient projection ổn định.
- [ ] CONTAINS projection ổn định.
- [ ] Canonical INTERACTS_WITH projection ổn định.
- [ ] Deactivation semantics ổn định.
- [ ] Projection metadata ổn định.
- [ ] Freshness service contract ổn định.
- [ ] Unavailable graph không làm crash API.
- [ ] SourceVersion mismatch có thể phát hiện.
- [ ] Pending/failed relevant jobs có thể phát hiện.
- [ ] Missing projection có thể phát hiện.

Sprint 9 không được tự viết lại Graph Sync foundation nếu Sprint 8 dependency chưa ổn định.

```text
Gate 09 = PASS / FAIL / BLOCKED
```

---

# 14. Gate 10 — Graph-RAG Architecture and Source Selection

Expected architecture:

```text
Validated request
→ input guardrail
→ resolve relational entities
→ freshness check
→ choose Neo4j or PostgreSQL source
→ build bounded context
→ AI provider
→ structured output validation
→ output guardrail
→ AI Audit
→ response with source/provenance/freshness metadata
```

Checklist:

- [ ] Graph-RAG là explanation-only layer.
- [ ] PostgreSQL vẫn là source of truth.
- [ ] Neo4j chỉ là read context.
- [ ] Source-selection decision nằm ở backend.
- [ ] Fresh graph mới được dùng.
- [ ] Stale/missing/unavailable graph không được dùng âm thầm.
- [ ] PostgreSQL fallback dùng deterministic relational queries.
- [ ] Graph-only no-fallback path trả safe error.
- [ ] Không fabricate missing graph context.
- [ ] Context builder có size/boundary hợp lý.
- [ ] Graph context không chứa unnecessary PII.
- [ ] AI answer không thay đổi interaction rule.
- [ ] Không direct graph write trong Graph-RAG request.

```text
Gate 10 = PASS / FAIL / BLOCKED
```

---

# 15. Gate 11 — Allowlisted Queries and Raw Cypher Security

Checklist:

- [ ] Có design cho allowlisted graph query templates.
- [ ] Medicine → CONTAINS → ActiveIngredient template được xác định.
- [ ] ActiveIngredient → INTERACTS_WITH → ActiveIngredient template được xác định.
- [ ] Query parameters được validate.
- [ ] Cypher được parameterized.
- [ ] Không nối raw user input vào Cypher.
- [ ] Staff không nhập raw Cypher.
- [ ] Không expose generic Cypher endpoint.
- [ ] Backend guard từ chối raw Cypher request.
- [ ] Query result được bounded.
- [ ] Timeout được bounded.
- [ ] Neo4j session được đóng đúng.
- [ ] Logs không chứa query secrets/credentials.
- [ ] Test plan có raw Cypher no-access.

Required expected result:

```text
Staff raw Cypher submission
→ 403/validated safe rejection theo API contract
→ query không được thực thi
```

```text
Gate 11 = PASS / FAIL / BLOCKED
```

---

# 16. Gate 12 — Provenance, Freshness and Fallback Contract

Response contract phải có semantics tương đương:

```text
answer/explanation
graphUsed
degraded
sourceType
provenance
freshness.status
freshness.reason
fallbackReason
disclaimer
requestId/audit reference
```

Checklist:

- [ ] `graphUsed=true` chỉ khi graph thực sự được dùng.
- [ ] `graphUsed=false` khi dùng PostgreSQL fallback.
- [ ] Provenance có source IDs/rule IDs phù hợp.
- [ ] Freshness status được trả.
- [ ] Freshness reason được trả.
- [ ] Fallback reason được trả khi có.
- [ ] Missing projection không được báo FRESH.
- [ ] Pending job dẫn tới stale/fallback.
- [ ] Failed job dẫn tới stale/fallback.
- [ ] SourceVersion mismatch dẫn tới stale/fallback.
- [ ] Graph unavailable dẫn tới fallback hoặc safe error.
- [ ] Không lộ internal Cypher.
- [ ] Không lộ credentials.
- [ ] Contract đủ cho frontend metadata display.
- [ ] AI Audit có thể ghi source/provenance/fallback metadata.

Required scenario matrix:

| Graph state | Expected source | graphUsed | Expected response |
|---|---|---:|---|
| Available + fresh | Neo4j | true | Graph context + provenance |
| Unavailable | PostgreSQL | false | Fallback + degraded reason |
| Stale pending | PostgreSQL | false | Fallback + freshness warning |
| Stale failed | PostgreSQL | false | Fallback + freshness warning |
| Version mismatch | PostgreSQL | false | Fallback + freshness warning |
| Graph-only/no fallback | None | false | Safe error |

```text
Gate 12 = PASS / FAIL / BLOCKED
```

---

# 17. Gate 13 — Checkout Independence and Medical Safety

Checklist:

- [ ] Graph-RAG không quyết định checkout.
- [ ] Graph-RAG không unlock unresolved HIGH alert.
- [ ] Graph-RAG không acknowledge HIGH alert.
- [ ] Graph-RAG không tự lưu official consultation note.
- [ ] Staff confirmation requirement vẫn giữ nguyên.
- [ ] Neo4j unavailable không làm thay đổi checkout authorization.
- [ ] Stale graph không làm thay đổi checkout authorization.
- [ ] AI failure không chặn manual consultation-note flow.
- [ ] Graph-RAG không đưa diagnosis.
- [ ] Graph-RAG không kê đơn.
- [ ] Graph-RAG không đưa dosage advice.
- [ ] Existing AI guardrail regression plan tồn tại.
- [ ] Disclaimer được giữ.
- [ ] Graph context không trở thành medical record ngoài scope.
- [ ] Checkout vẫn dùng deterministic PostgreSQL interaction rules.

Required assertion:

```text
Graph/AI response
≠ checkout authorization source
```

```text
Gate 13 = PASS / FAIL / BLOCKED
```

---

# 18. Gate 14 — Reports Deterministic Design

## Revenue Report

- [ ] Chỉ tính PAID orders.
- [ ] Exclude DRAFT.
- [ ] Exclude CANCELLED.
- [ ] Exclude failed payment attempts.
- [ ] Không double-count duplicate payments.
- [ ] Date filters có validation.
- [ ] Timezone/date-boundary strategy rõ.
- [ ] Calculation nằm ở deterministic backend/database query.
- [ ] AI không tính revenue.

## Top Medicines Report

- [ ] Chỉ tính PAID order items/allocations.
- [ ] Quantity aggregation source rõ.
- [ ] Sort/rank deterministic.
- [ ] Tie behavior được xác định.
- [ ] Inactive medicine history không làm mất historical sales.
- [ ] AI không thay đổi ranking.

## Inventory Report

- [ ] MedicineBatch là source of truth.
- [ ] totalQuantity semantics rõ.
- [ ] sellableQuantity loại expired batches.
- [ ] expiredQuantity semantics rõ.
- [ ] nearExpiryQuantity dùng threshold setting.
- [ ] Low-stock rule không bị tính từ expired stock.
- [ ] Không dùng aggregate inventory table làm authoritative source.

## Filters, states and permissions

- [ ] Admin report permissions được xác định.
- [ ] Warehouse inventory report permission được xác định.
- [ ] Staff không nhận inventory-wide access ngoài baseline.
- [ ] Empty/loading/error states được xác định.
- [ ] Pagination/limits hợp lý nếu cần.
- [ ] Query performance/index assumptions được kiểm tra.

```text
Gate 14 = PASS / FAIL / BLOCKED
```

---

# 19. Gate 15 — System Settings and Near-expiry Design

Expected scope:

```text
system_settings
nearExpiryThresholdDays
default = 90
Admin-only update
```

Checklist:

- [ ] Prisma model design phù hợp convention.
- [ ] Có strategy tránh duplicate setting key.
- [ ] Default 90 được seed hoặc fallback an toàn.
- [ ] Threshold là integer.
- [ ] Threshold phải lớn hơn 0.
- [ ] Có bounded maximum hợp lý.
- [ ] Admin-only update.
- [ ] Unauthorized request bị từ chối.
- [ ] Read path đủ cho inventory calculation.
- [ ] Update metadata/audit theo repository convention.
- [ ] Không hard-code threshold ở nhiều module sau khi Settings service tồn tại.
- [ ] Existing near-expiry calculation có integration point rõ.
- [ ] Minimal UI scope rõ.
- [ ] Provider/Prompt Settings UI không bị kéo vào.
- [ ] Test plan gồm default, valid, invalid và permission scenarios.

```text
Gate 15 = PASS / FAIL / BLOCKED
```

---

# 20. Gate 16 — Prisma, Migration and Data-impact Readiness

Checklist:

- [ ] Xác định Task nào cần Prisma schema change.
- [ ] `PAC-TASK-420` là migration/model owner.
- [ ] `PAC-TASK-421` là default seed owner.
- [ ] Graph-RAG Task không tạo redundant tables nếu không cần.
- [ ] Migration là additive hoặc có safe plan.
- [ ] Không drop/rename unrelated tables.
- [ ] Unique/index strategy rõ.
- [ ] Seed idempotent.
- [ ] Prisma validate/generate command tồn tại.
- [ ] Supabase apply strategy rõ.
- [ ] Controlled verification strategy rõ.
- [ ] Rollback/cleanup strategy rõ.
- [ ] No credential persisted.
- [ ] No destructive reset.
- [ ] Migration ordering không conflict Sprint 8 migrations.

Expected verification:

```text
npx prisma validate
npx prisma generate
migration status/check
controlled Supabase apply
settings read/update smoke test
cleanup evidence
```

```text
Gate 16 = PASS / FAIL / BLOCKED
```

---

# 21. Gate 17 — Testing and Local Quality Gate Readiness

Kiểm tra scripts thật trong repository; không tự đoán.

Required test areas:

## Graph-RAG

- [ ] Fresh graph path.
- [ ] Allowlisted query selection.
- [ ] Parameterized query.
- [ ] Unavailable fallback.
- [ ] Stale pending fallback.
- [ ] Stale failed fallback.
- [ ] Version mismatch fallback.
- [ ] Missing projection fallback.
- [ ] Graph-only safe error.
- [ ] Provenance.
- [ ] `graphUsed`.
- [ ] Freshness warning.
- [ ] Raw Cypher no-access.
- [ ] Graph-not-checkout.
- [ ] AI guardrail/audit regression.

## Reports

- [ ] Revenue PAID-only.
- [ ] DRAFT/CANCELLED/failed payment exclusions.
- [ ] Date filters.
- [ ] Top Medicines aggregation/ranking.
- [ ] Inventory from MedicineBatch.
- [ ] Expired exclusion.
- [ ] Threshold behavior.
- [ ] Permission tests.
- [ ] UI states.

## Settings

- [ ] Default 90.
- [ ] Valid update.
- [ ] Invalid/negative/non-integer rejection.
- [ ] Admin update permission.
- [ ] Unauthorized rejection.
- [ ] Near-expiry integration.
- [ ] Prisma migration/seed safety.

Local Quality Gate design:

```text
lint
typecheck
targeted tests
build
Prisma validate/generate
controlled Supabase verification
controlled Neo4j verification
AI safety regression
diff/security review
```

Checklist:

- [ ] Backend scripts xác định.
- [ ] Frontend scripts xác định.
- [ ] Unit/integration/E2E strategy xác định.
- [ ] Neo4j driver mock/fake strategy xác định.
- [ ] Controlled live AuraDB checks giới hạn an toàn.
- [ ] Supabase test cleanup strategy xác định.
- [ ] No destructive test environment.
- [ ] CI wording đúng: N/A.
- [ ] Task-level Local Quality Gate template sẵn sàng.
- [ ] Story/Epic full regression points được xác định.

```text
Gate 17 = PASS / FAIL / BLOCKED
```

---

# 22. Gate 18 — Findings and Final Authorization

Review tất cả findings.

Authorization PASS chỉ khi:

```text
Gate 01 → Gate 17 = PASS
Blocking findings = 0
High findings = 0

Sprint 9 Audit = PASS
Mandatory Gates PASS = 18/18
Ready to implement Sprint 9 = Yes
```

Nếu có Medium/Low:

- Ghi tác động.
- Ghi owner.
- Ghi remediation.
- Xác định có chặn implementation hay không.

Nếu có Blocker/High:

```text
Sprint 9 Audit = FAIL/BLOCKED
Ready to implement Sprint 9 = No
```

```text
Gate 18 = PASS / FAIL / BLOCKED
```

---

# 23. Findings Register

Severity:

```text
Blocker
High
Medium
Low
Observation
```

| Finding ID | Gate | Severity | Finding | Evidence | Required action | Owner | Status |
|---|---|---|---|---|---|---|---|
| S9-AUD-001 | — | — | Chưa có | — | — | — | Open |

Rules:

- Không xóa finding.
- Khi resolved, cập nhật status và evidence.
- Observation không phải defect.
- Blocker/High ngăn `Ready to implement Sprint 9 = Yes`.

---

# 24. Branch Verification Register

## 24.1 Core Epic branches

| Epic | Jira Key | Expected branch | Remote verified | Usage |
|---|---|---|---|---|
| PAC-EPIC-15 | PAC-15 | `epic/PAC-15-epic-15-graph-rag` | Pending | Traceability only |
| PAC-EPIC-16 | PAC-16 | `epic/PAC-16-epic-16-reports` | Pending | Traceability only |
| PAC-EPIC-17 | PAC-17 | `epic/PAC-17-epic-17-system-settings` | Pending | Traceability only |

## 24.2 Story branches

| Story | Jira Key | Remote verified |
|---|---|---|
| US-129 | PAC-169 | Pending |
| US-130 | PAC-170 | Pending |
| US-131 | PAC-171 | Pending |
| US-132 | PAC-172 | Pending |
| US-133 | PAC-173 | Pending |
| US-134 | PAC-174 | Pending |
| US-135 | PAC-175 | Pending |
| US-136 | PAC-176 | Pending |
| US-137 | PAC-177 | Pending |
| US-138 | PAC-178 | Pending |
| US-139 | PAC-179 | Pending |
| US-140 | PAC-180 | Pending |
| US-141 | PAC-181 | Pending |
| US-144 | PAC-184 | Pending |

## 24.3 Task branches

| Task range | Jira range | Expected | Remote verified | Result |
|---|---|---:|---:|---|
| PAC-TASK-391 → PAC-TASK-424 | PAC-601 → PAC-634 | 34 | — | Pending |

Detailed exact branches phải được kiểm tra từ `Jira/branch-on-jira.md` và `sprint-9-progress.md`.

---

# 25. Environment Verification Register

| Environment/Tool | Expected | Actual | Evidence | Result |
|---|---|---|---|---|
| Git remote | Accessible | — | — | Pending |
| GitHub PR workflow | Available | — | — | Pending |
| Local develop | Synced with origin | — | — | Pending |
| Supabase/PostgreSQL | Safe | — | — | Pending |
| Prisma schema | Valid baseline | — | — | Pending |
| Neo4j AuraDB | Safe/readable | — | — | Pending |
| Neo4j backend driver | Configured | — | — | Pending |
| AI provider | Safe/configured | — | — | Pending |
| MockAI fallback | Available | — | — | Pending |
| GitHub Actions | Not configured | N/A | — | N/A |

---

# 26. Audit Report Template

```markdown
# Sprint 9 Audit Report

## Decision

Sprint 9 Audit = PASS/FAIL/BLOCKED
Mandatory Gates PASS = x/18
Ready to implement Sprint 9 = Yes/No

## Dependency Status

- Sprint 8 Final Review:
- Ready for Sprint 9:
- Latest develop SHA:
- Working tree:
- Blocking/High Sprint 8 defects:

## Scope

- Tasks reconciled: x/34
- Stories reconciled: x/14
- Core Epics reconciled: x/3
- Branches verified: x/51

## Gate Results

1. Sprint 8 dependency: PASS/FAIL/BLOCKED
2. Repository baseline: PASS/FAIL/BLOCKED
3. Scope/mapping: PASS/FAIL/BLOCKED
4. Exact branch inventory: PASS/FAIL/BLOCKED
5. GitHub capability: PASS/FAIL/BLOCKED
6. PostgreSQL/Supabase safety: PASS/FAIL/BLOCKED
7. Neo4j safety: PASS/FAIL/BLOCKED
8. Sprint 7 AI dependency: PASS/FAIL/BLOCKED
9. Sprint 8 Graph dependency: PASS/FAIL/BLOCKED
10. Graph-RAG architecture: PASS/FAIL/BLOCKED
11. Query/raw Cypher security: PASS/FAIL/BLOCKED
12. Provenance/freshness/fallback: PASS/FAIL/BLOCKED
13. Checkout/medical safety: PASS/FAIL/BLOCKED
14. Reports design: PASS/FAIL/BLOCKED
15. System Settings design: PASS/FAIL/BLOCKED
16. Prisma/migration readiness: PASS/FAIL/BLOCKED
17. Testing/Local Quality Gate: PASS/FAIL/BLOCKED
18. Final authorization: PASS/FAIL/BLOCKED

## Key Evidence

- Branch inventory:
- Supabase/PostgreSQL:
- Neo4j:
- AI provider/guardrails:
- Graph Sync/freshness:
- Graph-RAG design:
- Reports design:
- Settings design:
- Test scripts:
- Security review:

## Findings

- Blocking:
- High:
- Medium:
- Low:
- Observations:

## Implementation Start

First technical Task:
PAC-TASK-392

Jira Key:
PAC-602

Exact branch:
feature/PAC-602-task-392-build-allowlisted-graph-query-templates

Implementation may start:
Yes/No
```

---

# 27. Final Authorization State

Initial state:

```text
Sprint 8 implementation = In progress
Sprint 8 Final Review = Pending
Sprint 9 plan = Prepared
Sprint 9 progress tracker = Prepared
Sprint 9 audit = Not started
Sprint 9 agent prompt = Not created
Sprint 9 final review prompt = Not created
Ready to implement Sprint 9 = No
```

PASS state:

```text
Sprint 8 Final Review = PASS
Ready for Sprint 9 = Yes

Sprint 9 Audit status = Completed
Sprint 9 Audit = PASS
Mandatory Gates PASS = 18/18
Blocking findings = 0
High findings = 0

34/34 exact Task branches = Verified
14/14 exact Story branches = Verified
3/3 Core Epic branches = Verified

PostgreSQL/Supabase environment = Safe
Neo4j AuraDB environment = Safe
AI provider/guardrail baseline = Stable
Graph Sync/freshness baseline = Stable

Ready to implement Sprint 9 = Yes
CI = N/A — GitHub Actions chưa được cấu hình
Quality Gate = Local Quality Gate
```

First technical Task after PASS:

```text
PAC-TASK-392
PAC-602
feature/PAC-602-task-392-build-allowlisted-graph-query-templates
```

Nếu exact branch không tồn tại trên remote:

```text
Ready to implement Sprint 9 = No
Blocker = Missing canonical branch
```

---

# 28. Start Instruction for Auditor

Thực hiện theo thứ tự:

1. Đọc toàn bộ canonical sources.
2. Xác minh Sprint 8 Final Review.
3. Đồng bộ và kiểm tra remote `develop`.
4. Reconcile 34 Tasks, 14 Stories và 3 Core Epics.
5. Verify 51 exact branches trên remote.
6. Xác minh GitHub workflow.
7. Xác minh safe Supabase/PostgreSQL environment.
8. Xác minh safe Neo4j AuraDB environment.
9. Xác minh Sprint 7 AI safety/provider baseline.
10. Xác minh Sprint 8 Graph Sync/freshness baseline.
11. Review Graph-RAG architecture.
12. Review allowlisted query/raw Cypher security.
13. Review provenance/freshness/fallback contract.
14. Review checkout và medical safety.
15. Review deterministic report design.
16. Review System Settings design.
17. Review Prisma/migration/test readiness.
18. Ghi findings.
19. Xuất Sprint 9 Audit Report.
20. Chỉ ghi `Ready to implement Sprint 9 = Yes` khi 18/18 Gate PASS.
21. Không bắt đầu coding trong Audit.
