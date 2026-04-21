# Sprint 9 Final Review Prompt — PharmaAssist AI Intelligence

> **Independent final verification prompt**
>
> Repository path:
>
> `work-context/sprint-9/sprint-9-final-review-prompt.md`
>
> Chỉ chạy sau khi toàn bộ Sprint 9 implementation, Story Acceptance Review và Core Epic Review đã hoàn tất.

---

# 1. Vai trò

Bạn là **Independent Final Reviewer** của Sprint 9.

Bạn không được dựa hoàn toàn vào trạng thái trong progress document hoặc báo cáo của coding agent. Phải kiểm chứng trực tiếp:

- code;
- Git;
- remote branches;
- Pull Requests;
- remote `develop`;
- Prisma schema và migrations;
- Supabase/PostgreSQL;
- Neo4j AuraDB;
- backend;
- frontend;
- unit/integration/E2E tests;
- Graph-RAG behavior;
- PostgreSQL fallback;
- deterministic Reports;
- System Settings;
- AI safety, audit và checkout independence.

Final Review là phiên xác minh độc lập, không phải phiên triển khai tính năng.

---

# 2. Phạm vi chính thức

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

Canonical branch inventory:
34 Task + 14 Story + 3 Core Epic = 51
```

Dependency Stories:

```text
US-142 — AI provider/model backend config
US-143 — Seed official prompt templates
```

Hai Story trên là Sprint 7 dependency và không được tính là Story triển khai lại của Sprint 9.

---

# 3. Tài liệu bắt buộc phải đọc

Đọc và đối chiếu:

```text
AGENTS.md
.agents/rules/rules-w-pharmaassist.md
WORKING-CONTEXT.md
DESIGN.md

Jira/branch-on-jira.md
Jira/jira-mapping.md
Jira/2_Epic.md
Jira/3_Stories.md
Jira/4C_Task_List_MVP_AI_Graph_Report_Demo_291_435.md
Jira/4C_Task_Description_MVP_AI_Graph_Report_Demo_291_435.md
Jira/5_Sprint.md

work-context/sprint-7/sprint-7-final-review-report.md
work-context/sprint-8/sprint-8-final-review-report.md

work-context/sprint-9/sprint-9.md
work-context/sprint-9/sprint-9-progress.md
work-context/sprint-9/sprint-9-audit.md
work-context/sprint-9/sprint-9-agent-prompt.md
```

Đọc thêm:

- Prisma schema và migrations.
- Backend `package.json`.
- Frontend `package.json`.
- Graph-RAG modules/services/tests.
- Graph Sync/freshness modules từ Sprint 8.
- AI provider/guardrail/audit modules từ Sprint 7.
- Reports modules.
- System Settings modules.
- Git history và GitHub PR history.

Canonical priority:

```text
Jira/branch-on-jira.md
→ code và Git history
→ GitHub PR/merge evidence
→ Prisma/Supabase/Neo4j evidence
→ Sprint documents
→ Jira manual status
```

---

# 4. Reviewer restrictions

Trong Final Review:

- Không triển khai feature mới.
- Không thay đổi acceptance criteria.
- Không sửa test expectation chỉ để test xanh.
- Không tự tạo branch.
- Không tạo Jira Bug Key.
- Không merge `develop → main`.
- Không xóa hoặc reset dữ liệu dùng chung.
- Không chạy destructive Cypher trên AuraDB dùng chung.
- Không tuyên bố PASS dựa trên báo cáo mà chưa kiểm chứng.
- Không sửa production code trừ khi Project Owner mở phiên fix riêng qua Bug branch.

Documentation-only evidence update được phép sau khi review xong.

---

# 5. Kết quả hợp lệ

## PASS

Chỉ được PASS khi:

```text
Mandatory Gates PASS = 18/18

Tasks verified = 34/34
Stories reviewed = 14/14
Core Epics reviewed = 3/3
Branches reconciled = 51/51
Applicable PRs merged = All

Blocking findings = 0
High findings = 0

Local Quality Gate = PASS
Sprint 9 Final Review = PASS
Ready for Sprint 10 = Yes
```

## FAIL

Dùng khi implementation hoặc tests sai nhưng có thể sửa qua Bug workflow.

```text
Sprint 9 Final Review = FAIL
Ready for Sprint 10 = No
```

## BLOCKED

Dùng khi không thể hoàn tất verification do thiếu quyền, thiếu environment, missing branch/evidence hoặc dependency chưa sẵn sàng.

```text
Sprint 9 Final Review = BLOCKED
Ready for Sprint 10 = No
```

---

# 6. Mandatory Gates

Sprint 9 Final Review gồm 18 Gate:

1. Repository and remote integrity.
2. Sprint scope and traceability.
3. Exact branch reconciliation.
4. PR and merge reconciliation.
5. Task completion.
6. Story Acceptance Reviews.
7. Core Epic Reviews.
8. Backend quality gate.
9. Frontend quality gate.
10. Prisma, migrations and Supabase.
11. Neo4j and Sprint 8 graph baseline.
12. Graph-RAG fresh path.
13. PostgreSQL fallback and safe-error paths.
14. Raw Cypher, provenance and freshness security.
15. Checkout independence and AI medical safety.
16. Deterministic Reports.
17. System Settings and near-expiry integration.
18. Findings and final authorization.

---

# 7. Gate 01 — Repository and Remote Integrity

Chạy:

```bash
git fetch --all --prune
git switch develop
git pull origin develop
git status --short
git rev-parse HEAD
git rev-parse origin/develop
git log origin/develop --oneline -n 150
```

Yêu cầu:

- [ ] Đang ở `develop`.
- [ ] `HEAD = origin/develop`.
- [ ] Working tree sạch.
- [ ] Không có file do lint `--fix` thay đổi nhưng chưa commit.
- [ ] Không có unresolved conflict.
- [ ] Không có untracked migration/source file quan trọng.
- [ ] Không có debug-only bypass.
- [ ] Không có secret trong tracked files.
- [ ] Sprint 9 implementation thực sự tồn tại trên remote `develop`.
- [ ] Không có Sprint 10 production implementation chen vào phạm vi review.

Sensitive file check:

```bash
git ls-files | grep -E '(^|/)\.env($|\.)|\.pem$|\.p12$|(^|/)id_rsa$' || true
```

```text
Gate 01 = PASS / FAIL / BLOCKED
```

---

# 8. Gate 02 — Sprint Scope and Traceability

Reconcile:

```text
34 Tasks
14 implementation Stories
3 Core Epics
45 Story Points
```

Checklist:

- [ ] PAC-TASK-391 → PAC-TASK-424 đủ 34 Task.
- [ ] PAC-601 → PAC-634 map đúng.
- [ ] US-129 → US-141 và US-144 đủ 14 Story.
- [ ] US-142 và US-143 chỉ là dependency.
- [ ] Mỗi Task map đúng Story và Epic.
- [ ] Không thiếu Task.
- [ ] Không trùng Task.
- [ ] Không kéo Graph Explorer/Admin Graph UI vào Sprint 9.
- [ ] Không kéo AI Provider/Prompt Management UI vào Sprint 9.
- [ ] Không kéo AI Business Report Narrative vào Sprint 9.
- [ ] Không kéo future/commercial backlog vào Sprint 9.
- [ ] Report scope đúng: Revenue, Top Medicines, Inventory.
- [ ] Settings scope đúng: near-expiry threshold MVP.

```text
Gate 02 = PASS / FAIL / BLOCKED
```

---

# 9. Gate 03 — Exact Branch Reconciliation

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
PAC-601
feature/PAC-601-task-391-implement-graph-rag-interaction-explanation-service
```

First technical Task:

```text
PAC-TASK-392
PAC-602
feature/PAC-602-task-392-build-allowlisted-graph-query-templates
```

Last Task:

```text
PAC-TASK-424
PAC-634
test/PAC-634-task-424-add-system-settings-validation-and-tests
```

Checklist:

- [ ] 34/34 Task branches reconciled.
- [ ] 14/14 Story branches reconciled.
- [ ] 3/3 Core Epic branches reconciled.
- [ ] Không có replacement branch.
- [ ] Không có branch gần giống được dùng thay canonical branch.
- [ ] Canonical slug bị cắt ngắn vẫn được dùng nguyên văn.
- [ ] Technical order không làm sai Jira mapping.
- [ ] Story/Epic branches chỉ là traceability branches.
- [ ] Không có Story PR hoặc Epic PR.

```text
Gate 03 = PASS / FAIL / BLOCKED
```

---

# 10. Gate 04 — PR and Merge Reconciliation

Xác minh trực tiếp trên GitHub:

- [ ] Mọi applicable Task/Bug PR target `develop`.
- [ ] Mọi applicable PR đã merge.
- [ ] Không có Task chỉ tồn tại local.
- [ ] Không có Task chỉ push branch nhưng chưa merge.
- [ ] Không có direct push vào `main`.
- [ ] Không có AI merge `develop → main`.
- [ ] Không có open blocking Task PR.
- [ ] Không có conflict unresolved.
- [ ] Merge SHA xuất hiện trên remote `develop`.
- [ ] PR title/commit chứa đúng Jira Key.
- [ ] Không có Story PR.
- [ ] Không có Epic PR.

Report:

```text
Applicable PRs expected:
Applicable PRs merged:
Open PRs:
Closed-unmerged PRs:
Missing PR evidence:
```

```text
Gate 04 = PASS / FAIL / BLOCKED
```

---

# 11. Gate 05 — Task Completion

Đối với 34 Task:

- [ ] Đọc Task description.
- [ ] Kiểm tra Acceptance Criteria.
- [ ] Kiểm tra code thực tế.
- [ ] Kiểm tra tests.
- [ ] Kiểm tra PR và merge SHA.
- [ ] Kiểm tra đúng scope.
- [ ] Kiểm tra không có TODO giả hoàn thành.
- [ ] Kiểm tra N/A evidence hợp lệ.
- [ ] Kiểm tra progress không mâu thuẫn với code/Git.

Required result:

```text
Tasks verified = 34/34
Incomplete Tasks = 0
Blocked Tasks = 0
Failed verification Tasks = 0
```

```text
Gate 05 = PASS / FAIL / BLOCKED
```

---

# 12. Gate 06 — Story Acceptance Reviews

Review trên latest `develop`.

Expected:

```text
US-129 → US-141
US-144

Total = 14
```

Với mỗi Story:

- [ ] Mọi child Task đã merge.
- [ ] Acceptance Criteria được kiểm chứng.
- [ ] Relevant tests PASS.
- [ ] PostgreSQL/Neo4j/AI evidence phù hợp.
- [ ] Không có Blocking/High finding.
- [ ] Không dựa vào Story branch để tích hợp.
- [ ] Không tạo Story PR.

Required result:

```text
Story Acceptance Reviews PASS = 14/14
```

```text
Gate 06 = PASS / FAIL / BLOCKED
```

---

# 13. Gate 07 — Core Epic Reviews

## PAC-EPIC-15 — Graph-RAG

Xác minh:

- [ ] Allowlisted Graph-RAG queries.
- [ ] Fresh graph path.
- [ ] Provenance.
- [ ] Freshness metadata.
- [ ] PostgreSQL fallback.
- [ ] Raw Cypher no-access.
- [ ] Graph-not-checkout.
- [ ] AI guardrail/audit integration.
- [ ] Graph-RAG UI metadata.
- [ ] Relevant integration/regression tests.

## PAC-EPIC-16 — Reports

Xác minh:

- [ ] Revenue deterministic.
- [ ] PAID-only.
- [ ] DRAFT/CANCELLED/failed payment exclusion.
- [ ] Top Medicines deterministic.
- [ ] Inventory from MedicineBatch.
- [ ] Filters.
- [ ] Permission checks.
- [ ] UI states.
- [ ] No AI-calculated totals.

## PAC-EPIC-17 — System Settings

Xác minh:

- [ ] Prisma model/migration.
- [ ] Default 90.
- [ ] Settings API.
- [ ] Admin-only update.
- [ ] Minimal Settings UI.
- [ ] Validation tests.
- [ ] Near-expiry integration.
- [ ] No duplicate hard-coded threshold.

Required:

```text
PAC-EPIC-15 Review = PASS
PAC-EPIC-16 Review = PASS
PAC-EPIC-17 Review = PASS
```

```text
Gate 07 = PASS / FAIL / BLOCKED
```

---

# 14. Gate 08 — Backend Quality Gate

Đọc backend `package.json`, rồi chạy mọi script bắt buộc có thật.

Tối thiểu:

```bash
cd backend
npm run lint
npm run build
npm run test
npm run test:e2e
npx prisma validate
npx prisma generate
```

Nếu repository có typecheck riêng, phải chạy.

Ghi chính xác:

```text
Backend lint:
Backend typecheck:
Backend build:
Backend unit tests:
Backend integration/E2E:
Skipped tests:
Prisma validate:
Prisma generate:
```

Rules:

- `eslint --fix` có thể sửa file; sau khi chạy phải kiểm tra `git status --short`.
- Không ghi “x/x passed” sai tổng khi có skipped tests.
- Mọi skipped test phải có lý do hợp lệ.
- Flaky/retry-only PASS không được che giấu.
- Không bỏ qua failed test ngoài Sprint 9 nếu regression liên quan.

```text
Gate 08 = PASS / FAIL / BLOCKED
```

---

# 15. Gate 09 — Frontend Quality Gate

Đọc frontend `package.json`.

Tối thiểu:

```bash
cd frontend
npm run lint
npm run build
```

Chạy component/browser/E2E tests nếu project đã có script và Sprint 9 UI phụ thuộc.

Ghi:

```text
Frontend lint errors:
Frontend lint warnings:
Frontend build:
Component tests:
Browser/E2E:
```

Rules:

- Error chặn PASS.
- Warning phải được review, không tự động xem mọi warning là vô hại.
- Graph-RAG metadata UI, Reports UI và Settings UI phải build được.
- Permission-aware UI không được expose unauthorized action.

```text
Gate 09 = PASS / FAIL / BLOCKED
```

---

# 16. Gate 10 — Prisma, Migrations and Supabase

Xác minh:

- [ ] Prisma schema hợp lệ.
- [ ] Migrations đầy đủ.
- [ ] Không có drift chưa giải thích.
- [ ] `system_settings` model đúng scope.
- [ ] Unique/index strategy hợp lý.
- [ ] Default threshold seed idempotent.
- [ ] Không drop/rename unrelated tables.
- [ ] Không sửa database thủ công để né migration.
- [ ] Controlled Supabase apply có evidence.
- [ ] Settings read/update smoke test PASS.
- [ ] Cleanup strategy an toàn.
- [ ] Không destructive reset.
- [ ] Không credential trong schema/data/evidence.

Required commands theo repository:

```text
prisma validate
prisma generate
migration status/check
controlled migration apply
controlled query verification
```

Report:

```text
Schema:
Migration:
Drift:
Supabase apply:
Seed/default:
Settings smoke test:
Cleanup:
```

```text
Gate 10 = PASS / FAIL / BLOCKED
```

---

# 17. Gate 11 — Neo4j and Sprint 8 Graph Baseline

Xác minh:

- [ ] Neo4j driver/service cấu hình đúng.
- [ ] AuraDB credentials chỉ ở backend environment.
- [ ] Health check PASS.
- [ ] Medicine nodes tồn tại.
- [ ] ActiveIngredient nodes tồn tại.
- [ ] CONTAINS relationships tồn tại.
- [ ] INTERACTS_WITH relationships tồn tại.
- [ ] Canonical direction đúng.
- [ ] `isActive` semantics đúng.
- [ ] Projection metadata tồn tại.
- [ ] Freshness service hoạt động.
- [ ] Pending/failed/version mismatch/missing projection được phát hiện.
- [ ] Neo4j unavailable không crash core system.
- [ ] Không destructive global cleanup.
- [ ] MCP không trở thành runtime dependency.

Forbidden on shared AuraDB:

```cypher
MATCH (n) DETACH DELETE n
```

```text
Gate 11 = PASS / FAIL / BLOCKED
```

---

# 18. Gate 12 — Graph-RAG Fresh Path

Required flow:

```text
validated request
→ input guardrail
→ resolve entities
→ freshness = FRESH
→ allowlisted Neo4j query
→ bounded graph context
→ AI provider
→ structured output validation
→ output guardrail
→ AI Audit
→ response metadata
```

Verify:

- [ ] Fresh graph được chọn.
- [ ] `graphUsed=true`.
- [ ] `sourceType` phản ánh Neo4j/graph.
- [ ] Medicine → CONTAINS → ActiveIngredient context đúng.
- [ ] ActiveIngredient → INTERACTS_WITH context đúng.
- [ ] Query parameterized.
- [ ] Context bounded.
- [ ] Provenance có source IDs/rule IDs.
- [ ] Freshness status/reason đúng.
- [ ] Disclaimer tồn tại.
- [ ] Request/audit reference tồn tại.
- [ ] AI output không fabricate unsupported interaction.
- [ ] Input/output guardrails PASS.
- [ ] AI Audit ghi source/provider/prompt/guardrail metadata.

```text
Gate 12 = PASS / FAIL / BLOCKED
```

---

# 19. Gate 13 — PostgreSQL Fallback and Safe Errors

Required scenarios:

| Graph state | Expected source | graphUsed | Expected |
|---|---|---:|---|
| unavailable | PostgreSQL | false | degraded fallback |
| stale pending | PostgreSQL | false | freshness warning |
| stale failed | PostgreSQL | false | freshness warning |
| version mismatch | PostgreSQL | false | freshness warning |
| missing projection | PostgreSQL | false | fallback/warning |
| graph-only no fallback | none | false | safe error |

Verify:

- [ ] Fallback dùng deterministic relational source.
- [ ] Không dùng stale graph âm thầm.
- [ ] `graphUsed=false` đúng.
- [ ] `fallbackReason` đúng.
- [ ] `degraded`/warning đúng.
- [ ] Không fabricate graph context.
- [ ] Graph-only no-fallback trả safe error.
- [ ] Provider/guardrail/audit flow vẫn đúng.
- [ ] Neo4j outage không làm request treo vô hạn.
- [ ] Timeout/retry bounded.

```text
Gate 13 = PASS / FAIL / BLOCKED
```

---

# 20. Gate 14 — Raw Cypher, Provenance and Freshness Security

Verify:

- [ ] Staff không thể gửi raw Cypher.
- [ ] Generic Cypher endpoint không được expose.
- [ ] Backend guard từ chối raw Cypher.
- [ ] Query không được thực thi khi bị từ chối.
- [ ] All inputs parameterized.
- [ ] Không nối raw input vào query.
- [ ] Response không lộ internal Cypher.
- [ ] Response không lộ Neo4j credentials.
- [ ] Provenance không chứa raw secret/PII.
- [ ] Freshness metadata phản ánh đúng state.
- [ ] Missing projection không được báo FRESH.
- [ ] Graph unavailable không bị ghi sai thành FRESH.
- [ ] Frontend hiển thị metadata an toàn.
- [ ] Logs không chứa credential.

Expected raw Cypher result:

```text
403 hoặc safe validated rejection theo API contract
query executed = false
```

```text
Gate 14 = PASS / FAIL / BLOCKED
```

---

# 21. Gate 15 — Checkout Independence and AI Medical Safety

Verify:

- [ ] Checkout vẫn dùng PostgreSQL/rule-based interaction logic.
- [ ] Graph-RAG không là authorization source.
- [ ] Neo4j unavailable không đổi checkout decision.
- [ ] Stale graph không đổi checkout decision.
- [ ] Graph-RAG không acknowledge HIGH alert.
- [ ] Graph-RAG không unlock unresolved HIGH alert.
- [ ] Graph-RAG không tự lưu official consultation note.
- [ ] Human confirmation requirement vẫn đúng.
- [ ] AI failure không chặn manual note flow.
- [ ] Diagnosis blocked.
- [ ] Prescribing blocked.
- [ ] Dosage advice blocked.
- [ ] Provider không được gọi khi input bị block.
- [ ] PII minimization PASS.
- [ ] Structured output validation PASS.
- [ ] Output guardrail PASS.
- [ ] AI Audit không lưu raw PII/secret.
- [ ] Disclaimer PASS.

Required invariant:

```text
Graph/AI response
≠ checkout authorization source
```

```text
Gate 15 = PASS / FAIL / BLOCKED
```

---

# 22. Gate 16 — Deterministic Reports

## Revenue Report

Verify:

- [ ] Chỉ tính PAID orders.
- [ ] Exclude DRAFT.
- [ ] Exclude CANCELLED.
- [ ] Exclude failed payment attempts.
- [ ] Không double-count duplicate/success payment.
- [ ] Date filters validate.
- [ ] Date boundary/timezone behavior nhất quán.
- [ ] Totals deterministic.
- [ ] AI không tính hoặc thay đổi revenue.

## Top Medicines

Verify:

- [ ] PAID data only.
- [ ] Authoritative quantity source.
- [ ] Aggregation deterministic.
- [ ] Ranking deterministic.
- [ ] Tie behavior ổn định.
- [ ] Inactive medicine vẫn giữ historical sales.
- [ ] AI không thay đổi ranking.

## Inventory Report

Verify:

- [ ] MedicineBatch là source of truth.
- [ ] totalQuantity đúng semantics.
- [ ] sellableQuantity loại expired.
- [ ] expiredQuantity đúng.
- [ ] nearExpiryQuantity dùng setting.
- [ ] Low-stock không tính expired stock.
- [ ] Không dùng aggregate table làm source of truth.

## Filters, permissions and UI

Verify:

- [ ] Admin report permission đúng.
- [ ] Warehouse inventory access đúng.
- [ ] Staff không có inventory-wide access ngoài baseline.
- [ ] Filters hoạt động.
- [ ] Empty state đúng.
- [ ] Loading state đúng.
- [ ] Error state đúng.
- [ ] Build/tests PASS.

```text
Gate 16 = PASS / FAIL / BLOCKED
```

---

# 23. Gate 17 — System Settings and Near-expiry Integration

Verify:

- [ ] `system_settings` hoặc equivalent model tồn tại.
- [ ] Unique setting key.
- [ ] Default threshold = 90.
- [ ] Seed/default idempotent.
- [ ] Threshold integer.
- [ ] Threshold > 0.
- [ ] Maximum bound hợp lý.
- [ ] Admin-only update.
- [ ] Unauthorized update bị từ chối.
- [ ] Read path hoạt động.
- [ ] Minimal UI hoạt động.
- [ ] Validation errors đúng.
- [ ] Near-expiry calculation đọc setting mới.
- [ ] Inventory report đọc setting mới.
- [ ] Không còn duplicate hard-coded threshold ở active paths.
- [ ] Update metadata/audit theo convention.
- [ ] Prisma/Supabase verification PASS.
- [ ] Tests PASS.

Required scenarios:

```text
default 90
valid Admin update
negative rejected
zero rejected
non-integer rejected
unauthorized rejected
near-expiry output changes after valid update
```

```text
Gate 17 = PASS / FAIL / BLOCKED
```

---

# 24. Gate 18 — Findings and Final Authorization

Review toàn bộ findings.

PASS chỉ khi:

```text
Gate 01 → Gate 17 = PASS

Tasks verified = 34/34
Stories reviewed = 14/14
Core Epics reviewed = 3/3
Branches reconciled = 51/51
Applicable PRs merged = All

Blocking findings = 0
High findings = 0

Local Quality Gate = PASS
```

Medium/Low findings phải có:

- impact;
- owner;
- remediation;
- quyết định có chặn Sprint 10 hay không.

Blocker/High:

```text
Sprint 9 Final Review = FAIL/BLOCKED
Ready for Sprint 10 = No
```

```text
Gate 18 = PASS / FAIL / BLOCKED
```

---

# 25. Findings Register

| Finding ID | Gate | Severity | Area | Finding | Evidence | Required action | Owner | Status |
|---|---|---|---|---|---|---|---|---|
| S9-FR-001 | — | — | — | Chưa có | — | — | — | Open |

Severity:

```text
Blocker
High
Medium
Low
Observation
```

Không xóa finding. Khi resolved, cập nhật evidence và status.

---

# 26. Bug Candidate Workflow

AI Final Reviewer không tự tạo Jira Bug Key.

Khi phát hiện defect:

```text
Bug Candidate:
Severity:
Affected Task/Story/Epic:
Actual:
Expected:
Evidence:
Suggested fix scope:
```

Ghi vào:

```text
work-context/sprint-9/sprint-9-progress.md
work-context/sprint-9/sprint-9-final-review-report.md
```

Project Owner tạo Jira Bug. Fix chỉ được thực hiện qua exact Bug branch.

---

# 27. Required Final Review Report

Tạo:

```text
work-context/sprint-9/sprint-9-final-review-report.md
```

Report bắt buộc:

```markdown
# Sprint 9 Final Review Report

## Decision

Sprint 9 Final Review = PASS/FAIL/BLOCKED
Mandatory Gates PASS = x/18
Ready for Sprint 10 = Yes/No

## Scope Reconciliation

- Tasks verified: x/34
- Stories reviewed: x/14
- Core Epics reviewed: x/3
- Branches reconciled: x/51
- Applicable PRs merged: x/x

## Repository

- Local develop SHA:
- Remote develop SHA:
- Working tree:
- Uncommitted changes:
- Secret scan:

## Local Quality Gate

### Backend
- Lint:
- Typecheck:
- Build:
- Unit tests:
- Integration/E2E:
- Skipped tests:
- Prisma validate:
- Prisma generate:

### Frontend
- Lint:
- Warnings:
- Build:
- Component tests:
- Browser/E2E:

### Infrastructure
- Prisma/migrations:
- Supabase:
- Neo4j:
- Graph freshness:

## Graph-RAG

- Fresh graph path:
- Allowlisted queries:
- graphUsed:
- Provenance:
- Freshness:
- Unavailable fallback:
- Stale fallback:
- Missing projection:
- Graph-only safe error:
- Raw Cypher rejection:

## AI and Checkout Safety

- Input guardrail:
- Diagnosis block:
- Prescribing block:
- Dosage block:
- PII minimization:
- Structured output:
- Output guardrail:
- AI Audit:
- Disclaimer:
- Checkout independence:
- Human confirmation:

## Reports

- Revenue PAID-only:
- Revenue exclusions:
- Date filters:
- Top Medicines:
- Inventory from MedicineBatch:
- Expired exclusion:
- Permissions:
- UI states:

## System Settings

- Model/migration:
- Default 90:
- Admin update:
- Validation:
- Unauthorized rejection:
- Near-expiry integration:
- Inventory report integration:

## Gate Results

1. Repository integrity:
2. Scope/traceability:
3. Branch reconciliation:
4. PR/merge reconciliation:
5. Task completion:
6. Story reviews:
7. Epic reviews:
8. Backend quality:
9. Frontend quality:
10. Prisma/Supabase:
11. Neo4j/graph baseline:
12. Graph-RAG fresh path:
13. Fallback/safe errors:
14. Raw Cypher/provenance/freshness:
15. Checkout/AI safety:
16. Reports:
17. System Settings:
18. Final authorization:

## Findings

- Blocking:
- High:
- Medium:
- Low:
- Observations:

## Final State

Sprint 9 Final Review =
Ready for Sprint 10 =
Sprint 10 Audit may start =
Sprint 10 implementation may start =
CI = N/A — GitHub Actions chưa được cấu hình
Quality Gate = Local Quality Gate
```

---

# 28. Documentation Updates

Sau khi review:

1. Cập nhật `sprint-9-progress.md`.
2. Cập nhật `WORKING-CONTEXT.md`.
3. Tạo `sprint-9-final-review-report.md`.
4. Commit và push documentation theo workflow hợp lệ.
5. Không sửa production code trong documentation update.
6. Không merge `develop → main`.

Nếu PASS:

```text
Sprint 9 Final Review = PASS
Ready for Sprint 10 = Yes
Sprint 10 Audit may start = Yes
Sprint 10 implementation may start = No
```

Sprint 10 implementation chỉ được bắt đầu sau Sprint 10 Audit PASS.

---

# 29. Final Output Format

Trả Project Owner:

```text
Decision: PASS / FAIL / BLOCKED
Mandatory Gates: x/18
Tasks verified: x/34
Stories reviewed: x/14
Core Epics reviewed: x/3
Branches reconciled: x/51
PRs merged: x/x

Backend checks: PASS/FAIL/BLOCKED
Frontend checks: PASS/FAIL/BLOCKED
Prisma/Supabase: PASS/FAIL/BLOCKED
Neo4j/Graph baseline: PASS/FAIL/BLOCKED
Graph-RAG fresh path: PASS/FAIL/BLOCKED
PostgreSQL fallback: PASS/FAIL/BLOCKED
Raw Cypher security: PASS/FAIL/BLOCKED
AI/Checkout safety: PASS/FAIL/BLOCKED
Reports: PASS/FAIL/BLOCKED
System Settings: PASS/FAIL/BLOCKED

Blocking findings:
High findings:
Required actions:

Sprint 9 Final Review:
Ready for Sprint 10:
Sprint 10 Audit may start:
Sprint 10 implementation may start:
```

Không tuyên bố PASS nếu còn một Mandatory Gate FAIL/BLOCKED.

---

# 30. Start Instruction

Thực hiện theo thứ tự:

1. Đọc toàn bộ canonical sources.
2. Xác minh latest local/remote `develop`.
3. Reconcile 34 Tasks, 14 Stories, 3 Core Epics.
4. Reconcile 51 canonical branches.
5. Reconcile mọi applicable PR và merge SHA.
6. Verify 34/34 Task completion.
7. Chạy 14 Story Acceptance Reviews.
8. Chạy 3 Core Epic Reviews.
9. Chạy backend quality gate.
10. Chạy frontend quality gate.
11. Verify Prisma/migrations/Supabase.
12. Verify Neo4j và Sprint 8 graph baseline.
13. Verify Graph-RAG fresh path.
14. Verify unavailable/stale/missing fallback.
15. Verify raw Cypher security, provenance và freshness.
16. Verify checkout independence và AI safety.
17. Verify deterministic Reports.
18. Verify System Settings và near-expiry integration.
19. Ghi findings.
20. Tạo Final Review Report.
21. Cập nhật progress và WORKING-CONTEXT.
22. Chỉ PASS khi 18/18 Gate PASS.
23. Không bắt đầu Sprint 10 implementation.
