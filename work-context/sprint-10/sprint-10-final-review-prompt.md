# Sprint 10 Final Review Prompt — PharmaAssist AI Intelligence

> **Independent MVP release-readiness verification prompt**
>
> Repository path:
>
> `work-context/sprint-10/sprint-10-final-review-prompt.md`
>
> Chỉ chạy sau khi toàn bộ Sprint 10 implementation, Release Story Acceptance Review và Core Epic Review đã hoàn tất.

---

# 1. Vai trò

Bạn là **Independent Final Reviewer** của Sprint 10 và MVP Release.

Bạn phải kiểm chứng trực tiếp:

- code;
- Git history;
- exact branches;
- Pull Requests;
- remote `develop`;
- Prisma schema và migrations;
- Supabase/PostgreSQL;
- Neo4j AuraDB;
- curated demo seed;
- dynamic expiry;
- local-only demo reset;
- graph rebuild và freshness;
- backend/frontend test infrastructure;
- high-risk regression suites;
- full MVP smoke;
- Chrome desktop E2E;
- basic responsive checks;
- GitHub Actions;
- setup commands;
- documentation, traceability và release evidence.

Không được chỉ tin vào `sprint-10-progress.md`, báo cáo của Coding Agent hoặc trạng thái Jira.

Final Review là phiên kiểm chứng độc lập, không phải phiên triển khai.

---

# 2. Phạm vi chính thức

```text
Sprint:
Sprint 10 — Demo Data, Demo Reset, Testing, CI, Setup, Documentation & Release Readiness

Tasks:
PAC-TASK-425 → PAC-TASK-525

Task count:
101

Task Jira Keys:
PAC-635 → PAC-735

Release Stories:
US-145 → US-150

Release Story count:
6

Release Story Points:
26

Core Epics:
PAC-EPIC-18 — Data Seed & Demo Reset
PAC-EPIC-19 — Testing, Smoke Test & Release Readiness
PAC-EPIC-20 — DevOps, CI & Setup
PAC-EPIC-21 — Documentation & Traceability

Canonical branch inventory:
101 Task + 6 Release Story + 4 Core Epic = 111
```

Cross-sprint regression Tasks:

```text
PAC-TASK-441 → PAC-TASK-479
```

Các Task này kiểm thử capability từ Sprint 1–9 nhưng không mở lại Story cũ.

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
Jira/4D_Task_List_Testing_Advanced_Future_436_580.md
Jira/4C_Task_Description_MVP_AI_Graph_Report_Demo_291_435.md
Jira/4D_Task_Description_Testing_Advanced_Future_436_580.md
Jira/5_Sprint.md

work-context/sprint-9/sprint-9-final-review-report.md

work-context/sprint-10/sprint-10.md
work-context/sprint-10/sprint-10-progress.md
work-context/sprint-10/sprint-10-audit.md
work-context/sprint-10/sprint-10-agent-prompt.md
```

Đọc thêm:

- Backend/frontend `package.json`.
- Prisma schema và migrations.
- Seed/reset/rebuild scripts.
- Test helpers, fixtures và cleanup utilities.
- Playwright configuration.
- Postman collections/environments.
- GitHub Actions workflow files.
- Root/backend/frontend README và setup docs.
- GitHub PR history và workflow run history.

Canonical priority:

```text
Jira/branch-on-jira.md
→ code và Git history
→ GitHub PR/merge/check evidence
→ Prisma/Supabase/Neo4j evidence
→ running-product evidence
→ Sprint documents
→ Jira manual status
```

---

# 4. Reviewer Restrictions

Trong Final Review:

- Không triển khai business feature mới.
- Không thay đổi Acceptance Criteria.
- Không sửa expected result chỉ để test xanh.
- Không tự tạo branch.
- Không tự tạo Jira Bug Key.
- Không merge `develop → main`.
- Không chạy destructive tests trên shared/demo/staging/production.
- Không chạy destructive Cypher trên shared AuraDB.
- Không dùng screenshots/video thay running product.
- Không ghi CI PASS chỉ vì workflow YAML tồn tại.
- Không tuyên bố MVP Release Ready nếu còn Mandatory Gate FAIL/BLOCKED.
- Không sửa production code trừ khi Project Owner mở phiên Bug Fix riêng.

Documentation-only evidence update được phép sau khi review hoàn tất.

---

# 5. Kết quả hợp lệ

## PASS

Chỉ PASS khi:

```text
Mandatory Gates PASS = 20/20

Tasks verified = 101/101
Release Stories reviewed = 6/6
Core Epics reviewed = 4/4
Branches reconciled = 111/111
Applicable PRs merged = All

Local Quality Gate = PASS
Applicable GitHub Actions checks = PASS

Blocking findings = 0
High findings = 0

Sprint 10 Final Review = PASS
Ready for MVP Release = Yes
```

## FAIL

Dùng khi implementation, tests, seed/reset, CI hoặc documentation sai nhưng có thể sửa qua Bug workflow:

```text
Sprint 10 Final Review = FAIL
Ready for MVP Release = No
```

## BLOCKED

Dùng khi thiếu quyền, thiếu environment, thiếu branch/PR/run evidence hoặc không thể kiểm chứng running product:

```text
Sprint 10 Final Review = BLOCKED
Ready for MVP Release = No
```

---

# 6. Mandatory Gates

Sprint 10 Final Review gồm 20 Gate:

1. Repository and remote integrity.
2. Sprint scope and traceability.
3. Exact branch reconciliation.
4. PR and merge reconciliation.
5. Task completion.
6. Release Story Acceptance Reviews.
7. Core Epic Reviews.
8. Backend quality gate.
9. Frontend quality gate.
10. Prisma, migrations, Supabase and seed verification.
11. Demo reset safety and reproducibility.
12. Neo4j rebuild and freshness verification.
13. Testing infrastructure verification.
14. High-risk regression suites.
15. Full MVP smoke, Chrome E2E and responsive checks.
16. GitHub Actions and CI verification.
17. Official setup and operational commands.
18. Documentation, traceability and release evidence.
19. Security, secrets and destructive-operation guards.
20. Findings and final authorization.

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
git log origin/develop --oneline -n 250
```

Yêu cầu:

- [ ] Đang ở `develop`.
- [ ] `HEAD = origin/develop`.
- [ ] Working tree sạch.
- [ ] Không có unresolved conflict.
- [ ] Không có untracked source/migration/workflow file quan trọng.
- [ ] Không có file do lint `--fix` thay đổi nhưng chưa commit.
- [ ] Không có debug bypass.
- [ ] Không có temporary disable của guard/test/cleanup.
- [ ] Không có Sprint 11/12 implementation chen vào Sprint 10 review.
- [ ] Sprint 10 code thực sự có trên remote `develop`.
- [ ] `WORKING-CONTEXT.md` phản ánh latest state.

Sensitive file check:

```bash
git ls-files | grep -E '(^|/)\.env($|\.)|\.pem$|\.p12$|(^|/)id_rsa$|service-account.*\.json$' || true
```

```text
Gate 01 = PASS / FAIL / BLOCKED
```

---

# 8. Gate 02 — Sprint Scope and Traceability

Reconcile:

```text
101 Tasks
6 Release Stories
4 Core Epics
26 Story Points
```

Checklist:

- [ ] PAC-TASK-425 → PAC-TASK-525 đủ 101 Task.
- [ ] PAC-635 → PAC-735 map đúng.
- [ ] US-145 → US-150 đủ 6 Release Story.
- [ ] PAC-EPIC-18 → PAC-EPIC-21 đủ 4 Core Epic.
- [ ] Mỗi Task map đúng Story/Epic.
- [ ] PAC-TASK-526 → PAC-TASK-555 không bị kéo vào.
- [ ] PAC-TASK-556 → PAC-TASK-580 không bị triển khai.
- [ ] Cross-sprint test Tasks không mở lại Story cũ.
- [ ] Sprint 10 không thêm business feature mới.
- [ ] Docker không bị biến thành official setup.
- [ ] Full cross-browser không bị biến thành MVP gate.
- [ ] Screenshots/video không thay running-product requirement.

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
101 Task branches
6 Release Story branches
4 Core Epic branches
Total = 111
```

First logical Sprint Task:

```text
PAC-TASK-425
PAC-635
feature/PAC-635-task-425-create-curated-mvp-seed-dataset
```

First technical Task:

```text
PAC-TASK-436
PAC-646
test/PAC-646-task-436-add-backend-unit-test-setup
```

Last Task:

```text
PAC-TASK-525
PAC-735
test/PAC-735-task-525-prepare-final-smoke-test-report-template
```

Checklist:

- [ ] 101/101 Task branches reconciled.
- [ ] 6/6 Release Story branches reconciled.
- [ ] 4/4 Core Epic branches reconciled.
- [ ] Không có replacement branch.
- [ ] Không dùng branch gần giống.
- [ ] Canonical slug bị cắt ngắn vẫn dùng nguyên văn.
- [ ] Technical order không làm sai Jira mapping.
- [ ] Story/Epic branches chỉ là traceability branches.
- [ ] Không có Story PR.
- [ ] Không có Epic PR.

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
- [ ] AI Agent không merge `develop → main`.
- [ ] Không có open blocking Task PR.
- [ ] Không có conflict unresolved.
- [ ] Merge SHA xuất hiện trên remote `develop`.
- [ ] PR title/commit chứa đúng Jira Key.
- [ ] CI runs gắn đúng commit/PR khi applicable.
- [ ] Không có Story PR.
- [ ] Không có Epic PR.

Report:

```text
Applicable PRs expected:
Applicable PRs merged:
Open PRs:
Closed-unmerged PRs:
Missing merge evidence:
```

```text
Gate 04 = PASS / FAIL / BLOCKED
```

---

# 11. Gate 05 — Task Completion

Đối với 101 Task:

- [ ] Đọc Task description.
- [ ] Kiểm tra Acceptance Criteria.
- [ ] Kiểm tra code/test/docs thực tế.
- [ ] Kiểm tra PR và merge SHA.
- [ ] Kiểm tra đúng scope.
- [ ] Kiểm tra không có TODO giả hoàn thành.
- [ ] Kiểm tra N/A evidence hợp lệ.
- [ ] Kiểm tra progress không mâu thuẫn với code/Git.
- [ ] Kiểm tra test isolation/cleanup khi liên quan.
- [ ] Kiểm tra CI evidence sau CI activation.

Required result:

```text
Tasks verified = 101/101
Incomplete Tasks = 0
Blocked Tasks = 0
Failed verification Tasks = 0
```

```text
Gate 05 = PASS / FAIL / BLOCKED
```

---

# 12. Gate 06 — Release Story Acceptance Reviews

Review trên latest `develop`.

Expected:

```text
US-145
US-146
US-147
US-148
US-149
US-150

Total = 6
```

Với mỗi Story:

- [ ] Mọi direct Task đã merge.
- [ ] Acceptance Criteria được kiểm chứng.
- [ ] Relevant cross-sprint regression evidence tồn tại.
- [ ] Relevant seed/reset/test/CI/docs evidence tồn tại.
- [ ] Không có Blocking/High finding.
- [ ] Không dùng Story branch để tích hợp.
- [ ] Không tạo Story PR.

Required result:

```text
Release Story Acceptance Reviews PASS = 6/6
```

```text
Gate 06 = PASS / FAIL / BLOCKED
```

---

# 13. Gate 07 — Core Epic Reviews

## PAC-EPIC-18 — Data Seed & Demo Reset

Xác minh:

- [ ] Curated deterministic seed.
- [ ] Demo users và first-login account.
- [ ] Dynamic expiry.
- [ ] FEFO multi-batch scenario.
- [ ] LOW/MEDIUM/HIGH rules.
- [ ] Handled HIGH alert.
- [ ] PAID/DRAFT/CANCELLED orders.
- [ ] Failed payment attempt.
- [ ] Report-ready data.
- [ ] Local-only demo reset.
- [ ] Neo4j rebuild.
- [ ] Smoke-after-reset.
- [ ] No destructive shared-target behavior.

## PAC-EPIC-19 — Testing, Smoke Test & Release Readiness

Xác minh:

- [ ] Backend unit setup.
- [ ] Backend integration isolation.
- [ ] Frontend component setup.
- [ ] Playwright Chrome desktop.
- [ ] Postman collection.
- [ ] High-risk regression suites.
- [ ] Full MVP smoke.
- [ ] Basic responsive checks.
- [ ] Cleanup evidence.
- [ ] No destructive test behavior.

## PAC-EPIC-20 — DevOps, CI & Setup

Xác minh:

- [ ] Official local setup commands.
- [ ] GitHub Actions configured.
- [ ] Required checks run thật.
- [ ] Least-privilege permissions.
- [ ] Secret handling.
- [ ] Destructive-test guard.
- [ ] No hidden Docker dependency.
- [ ] No production deployment side effect.

## PAC-EPIC-21 — Documentation & Traceability

Xác minh:

- [ ] README/setup docs.
- [ ] Environment-variable guide.
- [ ] Supabase/Neo4j/Google AI/MockAI guide.
- [ ] Seed/reset/rebuild commands.
- [ ] Demo accounts và scripts.
- [ ] Traceability summary.
- [ ] Release checklist.
- [ ] Known limitations.
- [ ] Contingency evidence.
- [ ] Final smoke report template.
- [ ] Docs khớp repository thật.

Required:

```text
PAC-EPIC-18 Review = PASS
PAC-EPIC-19 Review = PASS
PAC-EPIC-20 Review = PASS
PAC-EPIC-21 Review = PASS
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

Nếu có typecheck riêng, phải chạy.

Ghi chính xác:

```text
Backend lint:
Backend typecheck:
Backend build:
Backend unit tests:
Backend integration/E2E:
Skipped tests:
Flaky/retried tests:
Prisma validate:
Prisma generate:
```

Rules:

- Sau lint có `--fix`, kiểm tra `git status --short`.
- Không ghi sai tổng số test.
- Mọi skipped test phải có lý do.
- Retry-only PASS phải được ghi.
- Không bỏ qua regression ngoài Sprint 10 nếu ảnh hưởng MVP.
- Không chạy destructive integration suite trên shared target.

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

Chạy component tests và Playwright nếu có script.

Ghi:

```text
Frontend lint errors:
Frontend lint warnings:
Frontend build:
Component tests:
Playwright:
Skipped tests:
Flaky/retried tests:
```

Rules:

- Error chặn PASS.
- Warning phải được review.
- Login/POS/Checkout/Inventory/Reports/Settings UI phải build được.
- Permission-aware UI không được expose unauthorized actions.
- Chrome desktop là browser target chính.
- Basic responsive checks phải có evidence.

```text
Gate 09 = PASS / FAIL / BLOCKED
```

---

# 16. Gate 10 — Prisma, Migrations, Supabase and Seed Verification

Xác minh:

- [ ] Prisma schema hợp lệ.
- [ ] Migrations up-to-date.
- [ ] Không có drift chưa giải thích.
- [ ] Seed chạy được trong safe local target.
- [ ] Seed idempotent hoặc reset-controlled.
- [ ] Stable lookup keys.
- [ ] Dynamic dates đúng timezone strategy.
- [ ] Admin/Staff/Warehouse users đúng.
- [ ] First-login account đúng.
- [ ] Medicine/Ingredient/Supplier data đúng.
- [ ] Expired/near-expiry/sellable batches đúng.
- [ ] FEFO scenario đúng.
- [ ] HIGH alert scenario đúng.
- [ ] PAID/DRAFT/CANCELLED/failed payment đúng.
- [ ] Report-ready data deterministic.
- [ ] Seed không in credentials.
- [ ] Seed failure không để ambiguous partial state.
- [ ] Re-run strategy hoạt động.

Report:

```text
Schema:
Migration:
Drift:
Safe target:
Seed command:
Seed run:
Idempotency/re-run:
Dynamic dates:
Demo scenarios:
Cleanup:
```

```text
Gate 10 = PASS / FAIL / BLOCKED
```

---

# 17. Gate 11 — Demo Reset Safety and Reproducibility

Expected pipeline:

```text
verify local-safe environment
→ clear approved local data only
→ validate/migrate schema
→ seed curated PostgreSQL data
→ rebuild Neo4j projection
→ verify freshness
→ run smoke tests
→ emit structured report
```

Verify:

- [ ] Explicit local-only guard.
- [ ] PostgreSQL project identity verification.
- [ ] Neo4j target verification.
- [ ] Shared demo/staging/production blocked.
- [ ] Credentials không được in.
- [ ] Không global truncate/reset ngoài approved local target.
- [ ] Partial failure abort rõ.
- [ ] Reset lock/concurrency guard khi cần.
- [ ] Smoke failure làm reset result FAIL.
- [ ] Structured reset report tồn tại.
- [ ] Chạy reset ít nhất hai lần hoặc re-run evidence tương đương.
- [ ] Kết quả nghiệp vụ tái lập.
- [ ] Không dirty state sau failed run.
- [ ] Recovery guidance có thật.

```text
Gate 11 = PASS / FAIL / BLOCKED
```

---

# 18. Gate 12 — Neo4j Rebuild and Freshness Verification

Verify:

- [ ] Rebuild lấy source từ PostgreSQL.
- [ ] Medicine nodes đúng.
- [ ] ActiveIngredient nodes đúng.
- [ ] CONTAINS relationships đúng.
- [ ] INTERACTS_WITH relationships đúng.
- [ ] Canonical direction đúng.
- [ ] `isActive` semantics đúng.
- [ ] Projection metadata đúng.
- [ ] Freshness trở thành FRESH sau rebuild thành công.
- [ ] Counts/provenance được kiểm tra.
- [ ] Rebuild bounded theo approved scope.
- [ ] Không global delete trên shared AuraDB.
- [ ] Failure không làm hỏng PostgreSQL.
- [ ] Graph-RAG smoke hoạt động sau rebuild.
- [ ] PostgreSQL fallback vẫn hoạt động khi graph unavailable.

Forbidden trên shared AuraDB:

```cypher
MATCH (n) DETACH DELETE n
```

```text
Gate 12 = PASS / FAIL / BLOCKED
```

---

# 19. Gate 13 — Testing Infrastructure Verification

Verify:

- [ ] Backend unit runner.
- [ ] Backend integration/E2E runner.
- [ ] Isolated cleanup helper.
- [ ] Frontend component runner.
- [ ] Playwright Chrome desktop config.
- [ ] Postman collection structure.
- [ ] Test folder conventions.
- [ ] Mock/fake boundaries.
- [ ] Supabase test target guard.
- [ ] Neo4j mock/live boundary.
- [ ] Parallel-run collision guard.
- [ ] Cleanup on success/failure.
- [ ] Commands documented and real.
- [ ] Sample tests replaced or retained appropriately.
- [ ] No destructive helper against shared target.
- [ ] CI can invoke the same verified commands.

```text
Gate 13 = PASS / FAIL / BLOCKED
```

---

# 20. Gate 14 — High-risk Regression Suites

Required areas:

- Auth/session.
- RBAC/permissions.
- User Management.
- Medicine/Ingredient/Supplier.
- MedicineBatch source of truth.
- Sellable/expired/near-expiry.
- Stock Import.
- Inventory Adjustment.
- POS Draft Order.
- DrugInteractionRule.
- InteractionAlert/HIGH handling.
- Checkout/FEFO/idempotency/rollback.
- Payment/Invoice.
- AI Guardrail/Audit/fallback.
- Graph Sync/freshness.
- Graph-RAG fallback/raw Cypher/checkout independence.
- Reports deterministic calculations.
- System Settings.
- Demo reset safety.

Mỗi suite cần, khi phù hợp:

```text
success path
validation failure
permission failure
rollback/failure isolation
idempotency/concurrency
cleanup evidence
```

Verify:

- [ ] All planned suites exist.
- [ ] All required suites run.
- [ ] No silent skipped high-risk suite.
- [ ] No shared-target destructive behavior.
- [ ] Failures are reproducible.
- [ ] Test evidence links to Task/Story/Epic.
- [ ] Không dùng global coverage percentage làm false PASS.
- [ ] Blocking/High defects = 0.

```text
Gate 14 = PASS / FAIL / BLOCKED
```

---

# 21. Gate 15 — Full MVP Smoke, Chrome E2E and Responsive Checks

Required smoke:

```text
Login/RBAC
→ Medicine/Ingredient/Supplier
→ Stock Import
→ Inventory Summary
→ Inventory Adjustment
→ POS Draft Order
→ Interaction Check
→ HIGH acknowledgement/note
→ Checkout/FEFO
→ Payment/Invoice
→ AI explanation/guardrail
→ Graph Sync/Graph-RAG fallback
→ Reports/Settings
```

Verify:

- [ ] Smoke chạy sau successful reset.
- [ ] Curated accounts dùng được.
- [ ] Từng bước có expected result.
- [ ] Full flow PASS.
- [ ] Chrome/Chromium desktop E2E PASS.
- [ ] Login E2E PASS.
- [ ] POS/Checkout E2E PASS.
- [ ] Reports/Settings smoke PASS.
- [ ] Graph unavailable fallback PASS.
- [ ] Basic responsive widths PASS.
- [ ] Full cross-browser = N/A/out of scope.
- [ ] Postman manual collection verified.
- [ ] Running product được kiểm chứng.
- [ ] Screenshots/video chỉ là contingency evidence.

```text
Gate 15 = PASS / FAIL / BLOCKED
```

---

# 22. Gate 16 — GitHub Actions and CI Verification

Initial baseline:

```text
CI = N/A — GitHub Actions chưa được cấu hình
```

Final expectation:

```text
GitHub Actions configured
Local Quality Gate remains required
Applicable CI checks PASS
```

Verify:

- [ ] Workflow files merged.
- [ ] Lint check runs.
- [ ] Typecheck runs.
- [ ] Backend build runs.
- [ ] Frontend build runs.
- [ ] Unit tests run.
- [ ] Integration tests run safely.
- [ ] Prisma validate runs.
- [ ] Migration check runs.
- [ ] Destructive-test guard runs.
- [ ] Least-privilege permissions.
- [ ] Secrets from GitHub Secrets/Variables.
- [ ] No production/demo database default.
- [ ] No deployment side effect.
- [ ] No hidden Docker dependency.
- [ ] Node/package-manager versions appropriate.
- [ ] Workflows triggered on intended PR/develop events.
- [ ] Required checks run against current code.
- [ ] Latest applicable workflow runs = green.
- [ ] Workflow cancellation/retry does not hide failure.
- [ ] Local Quality Gate evidence still exists.

Không ghi PASS khi workflow chỉ tồn tại nhưng chưa chạy.

```text
Gate 16 = PASS / FAIL / BLOCKED
```

---

# 23. Gate 17 — Official Setup and Operational Commands

Verify on a clean or controlled environment:

- [ ] Root install/setup command.
- [ ] Backend install command.
- [ ] Frontend install command.
- [ ] Backend run command.
- [ ] Frontend run command.
- [ ] Prisma generate command.
- [ ] Migration command.
- [ ] Seed command.
- [ ] Graph worker command.
- [ ] Graph rebuild command.
- [ ] Demo reset command.
- [ ] Backend unit command.
- [ ] Backend integration/E2E command.
- [ ] Frontend component command.
- [ ] Playwright command.
- [ ] Postman guide.
- [ ] Environment-variable guide.
- [ ] Google AI configuration.
- [ ] MockAI fallback.
- [ ] Docker not required.
- [ ] Chrome desktop target documented.

Docs phải khớp `package.json` và running repository.

```text
Gate 17 = PASS / FAIL / BLOCKED
```

---

# 24. Gate 18 — Documentation, Traceability and Release Evidence

Verify:

- [ ] Root README.
- [ ] Backend setup/run guide.
- [ ] Frontend setup/run guide.
- [ ] Environment-variable documentation.
- [ ] Supabase setup guide.
- [ ] Neo4j AuraDB guide.
- [ ] Google AI/MockAI guide.
- [ ] Prisma/migration/seed guide.
- [ ] Graph rebuild guide.
- [ ] Demo reset guide.
- [ ] Demo accounts.
- [ ] Login/RBAC demo script.
- [ ] Inventory/Stock Import demo script.
- [ ] POS/Interaction/Checkout demo script.
- [ ] AI/Graph-RAG demo script.
- [ ] Reports/Settings demo script.
- [ ] Traceability summary.
- [ ] Release readiness checklist.
- [ ] Demo freeze checklist.
- [ ] Known limitations/out-of-scope.
- [ ] Contingency evidence list.
- [ ] Final smoke report template.
- [ ] Docs contain no secret.
- [ ] Docs use real commands.
- [ ] Evidence references current develop/code.

```text
Gate 18 = PASS / FAIL / BLOCKED
```

---

# 25. Gate 19 — Security, Secrets and Destructive-operation Guards

Verify:

- [ ] Supabase service-role key not in frontend.
- [ ] Neo4j password not tracked.
- [ ] Google AI key not tracked.
- [ ] GitHub secrets not hard-coded.
- [ ] Logs do not print full connection strings.
- [ ] Tests do not print tokens/passwords.
- [ ] Demo accounts are not production credentials.
- [ ] `demo:reset` fails closed.
- [ ] CI destructive-test guard fails closed.
- [ ] No `prisma migrate reset` against shared target.
- [ ] No unrestricted `TRUNCATE ... CASCADE` on shared target.
- [ ] No global Neo4j delete on shared AuraDB.
- [ ] Reset/rebuild permission boundary correct.
- [ ] GitHub workflow permissions least privilege.
- [ ] Artifacts/evidence contain no PII/secrets.
- [ ] AI Audit privacy baseline preserved.
- [ ] Test data is not real medical record.
- [ ] No production deployment action.
- [ ] No shell injection from untrusted inputs.
- [ ] Cleanup commands are scoped and auditable.

```text
Gate 19 = PASS / FAIL / BLOCKED
```

---

# 26. Gate 20 — Findings and Final Authorization

PASS chỉ khi:

```text
Gate 01 → Gate 19 = PASS

Tasks verified = 101/101
Release Stories reviewed = 6/6
Core Epics reviewed = 4/4
Branches reconciled = 111/111
Applicable PRs merged = All

Local Quality Gate = PASS
Applicable GitHub Actions checks = PASS

Blocking findings = 0
High findings = 0
```

Medium/Low findings phải có:

- impact;
- owner;
- remediation;
- release decision.

Blocker/High:

```text
Sprint 10 Final Review = FAIL/BLOCKED
Ready for MVP Release = No
```

PASS:

```text
Sprint 10 Final Review = PASS
Mandatory Gates PASS = 20/20
Ready for MVP Release = Yes
```

```text
Gate 20 = PASS / FAIL / BLOCKED
```

---

# 27. Findings Register

| Finding ID | Gate | Severity | Area | Finding | Evidence | Required action | Owner | Status |
|---|---|---|---|---|---|---|---|---|
| S10-FR-001 | — | — | — | Chưa có | — | — | — | Open |

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

# 28. Bug Candidate Workflow

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
Release impact:
```

Ghi vào:

```text
work-context/sprint-10/sprint-10-progress.md
work-context/sprint-10/sprint-10-final-review-report.md
```

Project Owner tạo Jira Bug. Fix chỉ thực hiện qua exact Bug branch.

---

# 29. Required Final Review Report

Tạo:

```text
work-context/sprint-10/sprint-10-final-review-report.md
```

Report bắt buộc:

```markdown
# Sprint 10 Final Review Report

## Decision

Sprint 10 Final Review = PASS/FAIL/BLOCKED
Mandatory Gates PASS = x/20
Ready for MVP Release = Yes/No

## Scope Reconciliation

- Tasks verified: x/101
- Release Stories reviewed: x/6
- Core Epics reviewed: x/4
- Branches reconciled: x/111
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
- Flaky/retried:
- Prisma validate:
- Prisma generate:

### Frontend
- Lint:
- Warnings:
- Build:
- Component tests:
- Playwright:
- Skipped tests:
- Flaky/retried:

## Data and Reset

- Safe PostgreSQL target:
- Curated seed:
- Dynamic expiry:
- Idempotent/re-run:
- Demo reset guard:
- Reset reproducibility:
- Structured reset report:
- Cleanup:

## Neo4j

- Safe target:
- Rebuild:
- Nodes/edges:
- Canonical direction:
- Freshness:
- Failure isolation:
- PostgreSQL fallback:

## Regression and Smoke

- Test infrastructure:
- High-risk suites:
- Full MVP smoke:
- Chrome desktop E2E:
- Basic responsive:
- Postman:

## CI

- Workflow files:
- Lint/type:
- Backend build:
- Frontend build:
- Unit tests:
- Integration tests:
- Prisma validate:
- Migration check:
- Destructive-test guard:
- Latest runs:
- Required checks:
- Local Quality Gate:

## Setup and Documentation

- Root setup:
- Backend setup:
- Frontend setup:
- Environment variables:
- Supabase:
- Neo4j:
- Google AI/MockAI:
- Prisma/migration:
- Seed:
- Graph rebuild:
- Demo reset:
- Demo accounts/scripts:
- Traceability:
- Release checklist:
- Known limitations:
- Contingency evidence:
- Final smoke template:

## Gate Results

1. Repository integrity:
2. Scope/traceability:
3. Branch reconciliation:
4. PR/merge reconciliation:
5. Task completion:
6. Release Story reviews:
7. Core Epic reviews:
8. Backend quality:
9. Frontend quality:
10. Prisma/Supabase/seed:
11. Demo reset:
12. Neo4j rebuild/freshness:
13. Testing infrastructure:
14. High-risk regression:
15. Full smoke/E2E/responsive:
16. GitHub Actions/CI:
17. Setup commands:
18. Documentation/release evidence:
19. Security/destructive guards:
20. Final authorization:

## Findings

- Blocking:
- High:
- Medium:
- Low:
- Observations:

## Final State

Sprint 10 Final Review =
Ready for MVP Release =
Release freeze may start =
Project Owner may merge develop → main =
CI =
Quality Gate =
```

---

# 30. Documentation Updates

Sau review:

1. Cập nhật `sprint-10-progress.md`.
2. Cập nhật `WORKING-CONTEXT.md`.
3. Tạo `sprint-10-final-review-report.md`.
4. Commit và push documentation theo workflow hợp lệ.
5. Không sửa production code trong documentation update.
6. Không merge `develop → main`.

Nếu PASS:

```text
Sprint 10 Final Review = PASS
Ready for MVP Release = Yes
Release freeze may start = Yes
Project Owner may merge develop → main = Yes, after owner review
```

AI Agent không tự merge `develop → main`.

---

# 31. Final Output Format

Trả Project Owner:

```text
Decision: PASS / FAIL / BLOCKED
Mandatory Gates: x/20
Tasks verified: x/101
Release Stories reviewed: x/6
Core Epics reviewed: x/4
Branches reconciled: x/111
PRs merged: x/x

Backend checks: PASS/FAIL/BLOCKED
Frontend checks: PASS/FAIL/BLOCKED
Prisma/Supabase/Seed: PASS/FAIL/BLOCKED
Demo reset: PASS/FAIL/BLOCKED
Neo4j rebuild/freshness: PASS/FAIL/BLOCKED
Test infrastructure: PASS/FAIL/BLOCKED
High-risk regression: PASS/FAIL/BLOCKED
Full smoke/Chrome E2E: PASS/FAIL/BLOCKED
GitHub Actions/CI: PASS/FAIL/BLOCKED
Setup commands: PASS/FAIL/BLOCKED
Documentation/traceability: PASS/FAIL/BLOCKED
Security/destructive guards: PASS/FAIL/BLOCKED

Blocking findings:
High findings:
Required actions:

Sprint 10 Final Review:
Ready for MVP Release:
Release freeze may start:
Project Owner may merge develop → main:
```

Không tuyên bố PASS nếu còn một Mandatory Gate FAIL/BLOCKED.

---

# 32. Start Instruction

Thực hiện theo thứ tự:

1. Đọc toàn bộ canonical sources.
2. Xác minh latest local/remote `develop`.
3. Reconcile 101 Tasks, 6 Release Stories và 4 Core Epics.
4. Reconcile 111 canonical branches.
5. Reconcile mọi applicable PR và merge SHA.
6. Verify 101/101 Task completion.
7. Chạy 6 Release Story Acceptance Reviews.
8. Chạy 4 Core Epic Reviews.
9. Chạy backend quality gate.
10. Chạy frontend quality gate.
11. Verify Prisma/migrations/Supabase/seed.
12. Verify demo reset safety và reproducibility.
13. Verify Neo4j rebuild và freshness.
14. Verify test infrastructure.
15. Chạy high-risk regression suites.
16. Chạy full MVP smoke.
17. Chạy Chrome desktop E2E và basic responsive checks.
18. Verify GitHub Actions và latest workflow runs.
19. Verify official setup commands.
20. Verify documentation, traceability và release evidence.
21. Verify secrets và destructive-operation guards.
22. Ghi findings.
23. Tạo Final Review Report.
24. Cập nhật progress và WORKING-CONTEXT.
25. Chỉ PASS khi 20/20 Gate PASS.
26. Không tự merge `develop → main`.
