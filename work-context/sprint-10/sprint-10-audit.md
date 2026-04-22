# Sprint 10 Audit — PharmaAssist AI Intelligence

> **Pre-implementation release-hardening audit**
>
> Repository path đề xuất:
>
> `work-context/sprint-10/sprint-10-audit.md`
>
> Tài liệu này phải được hoàn thành trước khi chạy `sprint-10-agent-prompt.md`.

---

# 1. Audit Purpose

Sprint 10 Audit xác minh rằng toàn bộ MVP từ Sprint 1 đến Sprint 9 đã ổn định và repository đã đủ điều kiện để triển khai:

```text
Curated Demo Data
Demo Reset
Testing Infrastructure
High-risk Regression Testing
Full MVP Smoke Testing
GitHub Actions
Setup Documentation
Release Readiness
```

Audit không phải phiên coding.

Trong Audit:

- Không triển khai Sprint 10 feature/release code.
- Không chạy `demo:reset`.
- Không apply migration hoặc seed Sprint 10.
- Không tạo hay sửa GitHub Actions workflow.
- Không chạy destructive test trên database dùng chung.
- Không chạy destructive Cypher trên AuraDB dùng chung.
- Không tự tạo branch thay thế.
- Không tạo hoặc merge PR.
- Không bắt đầu Sprint 10 implementation.

Kết quả hợp lệ:

```text
Sprint 10 Audit = PASS
Mandatory Gates PASS = 20/20
Ready to implement Sprint 10 = Yes
```

hoặc:

```text
Sprint 10 Audit = FAIL
Ready to implement Sprint 10 = No
```

hoặc:

```text
Sprint 10 Audit = BLOCKED
Ready to implement Sprint 10 = No
```

---

# 2. Official Sprint 10 Scope

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

Branch inventory:
101 Task + 6 Release Story + 4 Core Epic = 111
```

Cross-sprint regression Tasks:

```text
PAC-TASK-441 → PAC-TASK-479
```

Các Task này kiểm thử lại capability của Sprint 1–9 nhưng không mở lại các Story cũ.

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
10. `Jira/4D_Task_List_Testing_Advanced_Future_436_580.md`
11. `Jira/4C_Task_Description_MVP_AI_Graph_Report_Demo_291_435.md`
12. `Jira/4D_Task_Description_Testing_Advanced_Future_436_580.md`
13. `Jira/5_Sprint.md`
14. Sprint 1 → Sprint 9 Final Review reports.
15. `work-context/sprint-10/sprint-10.md`
16. `work-context/sprint-10/sprint-10-progress.md`
17. Prisma schema và migrations.
18. Backend/frontend `package.json`.
19. Existing test infrastructure.
20. Existing seed/reset scripts.
21. Existing GitHub Actions state.
22. Supabase/PostgreSQL và Neo4j environment configuration.
23. Current Git/GitHub state.

Canonical priority:

```text
Jira/branch-on-jira.md
→ repository và Git history
→ GitHub PR/branch/workflow evidence
→ Prisma/Supabase/Neo4j evidence
→ Sprint documents
→ Jira manual status
```

---

# 4. Mandatory Gates

Sprint 10 Audit gồm 20 Gate:

1. Sprint 9 Final Review dependency.
2. Repository and remote baseline.
3. Sprint scope and mapping.
4. Exact branch inventory.
5. GitHub capability and branch workflow.
6. Official local setup and runtime baseline.
7. PostgreSQL/Supabase safety and test isolation.
8. Neo4j AuraDB safety and rebuild readiness.
9. Curated seed dataset design.
10. Dynamic expiry and deterministic demo scenarios.
11. Demo reset fail-closed safety.
12. Testing infrastructure readiness.
13. High-risk regression test design.
14. Full MVP smoke, Chrome E2E and responsive strategy.
15. GitHub Actions and CI transition design.
16. Prisma, migration, seed and cleanup readiness.
17. Documentation, traceability and release-evidence readiness.
18. Security, secrets and destructive-operation guards.
19. Execution order, ownership and release governance.
20. Findings and final authorization.

PASS yêu cầu:

```text
Mandatory Gates PASS = 20/20
Blocking findings = 0
High findings = 0
```

---

# 5. Gate 01 — Sprint 9 Final Review Dependency

Xác minh:

- [ ] Sprint 9 implementation hoàn tất.
- [ ] Sprint 9 Final Review = PASS.
- [ ] Ready for Sprint 10 = Yes.
- [ ] 34/34 Sprint 9 Tasks verified.
- [ ] 14/14 Sprint 9 Story Reviews PASS.
- [ ] 3/3 Sprint 9 Core Epic Reviews PASS.
- [ ] Graph-RAG ổn định.
- [ ] PostgreSQL fallback ổn định.
- [ ] Reports deterministic ổn định.
- [ ] System Settings ổn định.
- [ ] Blocking Sprint 9 defects = 0.
- [ ] High Sprint 9 defects = 0.
- [ ] Latest Sprint 9 changes có trên remote `develop`.

Nếu Sprint 9 Final Review chưa PASS:

```text
Gate 01 = BLOCKED
Ready to implement Sprint 10 = No
```

Evidence:

| Evidence | Expected | Actual | Result |
|---|---|---|---|
| Sprint 9 Final Review | PASS | — | Pending |
| Ready for Sprint 10 | Yes | — | Pending |
| Sprint 9 Tasks | 34/34 | — | Pending |
| Sprint 9 Stories | 14/14 | — | Pending |
| Sprint 9 Core Epics | 3/3 | — | Pending |
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
git log origin/develop --oneline -n 200
```

Checklist:

- [ ] Local branch là `develop`.
- [ ] `HEAD = origin/develop`.
- [ ] Working tree sạch.
- [ ] Không có unresolved conflict.
- [ ] Không có untracked migration/source/workflow file quan trọng.
- [ ] Không có file do lint `--fix` thay đổi nhưng chưa commit.
- [ ] Không có debug bypass từ Sprint 9.
- [ ] Không có Sprint 10 implementation bị làm trước Audit.
- [ ] Sprint 9 Final Review report tồn tại và khớp code/Git.
- [ ] `WORKING-CONTEXT.md` phản ánh trạng thái mới nhất.

Sensitive file check:

```bash
git ls-files | grep -E '(^|/)\.env($|\.)|\.pem$|\.p12$|(^|/)id_rsa$|service-account.*\.json$' || true
```

```text
Gate 02 = PASS / FAIL / BLOCKED
```

---

# 7. Gate 03 — Sprint Scope and Mapping

Xác minh:

```text
Tasks = PAC-TASK-425 → PAC-TASK-525
Task count = 101
Task Jira Keys = PAC-635 → PAC-735
Release Stories = US-145 → US-150
Release Story count = 6
Story Points = 26
Core Epics = PAC-EPIC-18 → PAC-EPIC-21
```

Checklist:

- [ ] Có đúng 101 Task.
- [ ] Không thiếu hoặc trùng Logical Task.
- [ ] Mỗi Task map đúng Story và Epic.
- [ ] `PAC-TASK-425 → PAC-TASK-435` thuộc demo data/reset.
- [ ] `PAC-TASK-436 → PAC-TASK-480` thuộc testing/smoke.
- [ ] `PAC-TASK-481 → PAC-TASK-505` thuộc setup/CI.
- [ ] `PAC-TASK-506 → PAC-TASK-525` thuộc docs/release.
- [ ] `PAC-TASK-526 → PAC-TASK-555` không bị kéo vào Sprint 10.
- [ ] `PAC-TASK-556 → PAC-TASK-580` không bị triển khai.
- [ ] Cross-sprint test references không mở lại Story cũ.
- [ ] Sprint 10 không thêm business feature mới.
- [ ] Docker không bị biến thành official setup path.
- [ ] Full cross-browser testing không bị kéo vào MVP.

Summary:

| Scope | Expected | Actual | Result |
|---|---:|---:|---|
| Tasks | 101 | — | Pending |
| Release Stories | 6 | — | Pending |
| Core Epics | 4 | — | Pending |
| Story Points | 26 | — | Pending |

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
101 Task branches
6 Release Story branches
4 Core Epic branches
Total = 111
```

First logical Sprint Task:

```text
PAC-TASK-425
Jira Key: PAC-635
Exact branch:
feature/PAC-635-task-425-create-curated-mvp-seed-dataset
```

First technical execution Task:

```text
PAC-TASK-436
Jira Key: PAC-646
Exact branch:
test/PAC-646-task-436-add-backend-unit-test-setup
```

Last Task:

```text
PAC-TASK-525
Jira Key: PAC-735
Exact branch:
test/PAC-735-task-525-prepare-final-smoke-test-report-template
```

Checklist:

- [ ] 101/101 Task branches map đúng.
- [ ] 6/6 Release Story branches map đúng.
- [ ] 4/4 Core Epic branches map đúng.
- [ ] Exact branches tồn tại trên remote.
- [ ] Không có replacement branch.
- [ ] Không có shortened branch tự tạo.
- [ ] Canonical slug bị cắt ngắn vẫn được dùng nguyên văn.
- [ ] Technical order không làm sai Jira mapping.
- [ ] Story/Epic branches chỉ dùng traceability.
- [ ] Không tạo Story/Epic PR.

| Category | Expected | Verified | Result |
|---|---:|---:|---|
| Task | 101 | — | Pending |
| Release Story | 6 | — | Pending |
| Core Epic | 4 | — | Pending |
| **Total** | **111** | — | Pending |

Nếu exact branch thiếu:

```text
Không tự tạo branch
Không dùng branch gần giống
Không sửa branch slug
Dừng và báo blocker
```

```text
Gate 04 = PASS / FAIL / BLOCKED
```

---

# 9. Gate 05 — GitHub Capability and Branch Workflow

Checklist:

- [ ] GitHub authentication hoạt động.
- [ ] Có quyền đọc hơn 111 relevant remote branches.
- [ ] Có quyền push exact Task/Bug branches.
- [ ] Có quyền tạo PR vào `develop`.
- [ ] Có quyền đọc workflow runs/checks.
- [ ] Có quyền kiểm tra mergeability.
- [ ] AI Agent có thể merge Task/Bug PR khi gate PASS.
- [ ] Không push trực tiếp vào `develop`.
- [ ] Không push trực tiếp vào `main`.
- [ ] Không merge `develop → main`.
- [ ] Không tạo Story PR.
- [ ] Không tạo Epic PR.
- [ ] Jira không phải implementation gate.
- [ ] Project Owner quản lý Jira thủ công.

Current CI wording trước Task 493:

```text
CI = N/A — GitHub Actions chưa được cấu hình
Quality Gate = Local Quality Gate
```

```text
Gate 05 = PASS / FAIL / BLOCKED
```

---

# 10. Gate 06 — Official Local Setup and Runtime Baseline

Official setup:

```text
Local Node.js
Next.js
NestJS
Prisma
Cloud Supabase/PostgreSQL
Neo4j AuraDB
Google AI primary
MockAI fallback
```

Checklist:

- [ ] Node.js version requirement xác định.
- [ ] Package manager xác định.
- [ ] Root/backend/frontend install commands xác định.
- [ ] Backend run command xác định.
- [ ] Frontend run command xác định.
- [ ] Prisma generate command xác định.
- [ ] Migration command xác định.
- [ ] Seed command hiện tại xác định.
- [ ] Graph worker/run command xác định.
- [ ] Graph rebuild command hiện tại xác định hoặc gap được ghi.
- [ ] Environment variable inventory xác định.
- [ ] Chrome desktop có thể chạy app.
- [ ] Không có hidden Docker dependency.
- [ ] Docker chỉ optional.
- [ ] MockAI fallback có thể dùng khi Google AI unavailable.

Không tự đoán command. Đọc `package.json` và code thật.

```text
Gate 06 = PASS / FAIL / BLOCKED
```

---

# 11. Gate 07 — PostgreSQL/Supabase Safety and Test Isolation

Dự án không bắt buộc có PostgreSQL database riêng cho automated tests.

Do đó phải xác minh:

- [ ] Environment dùng cho automated tests được nhận diện rõ.
- [ ] Không dùng demo/staging/production cho destructive tests.
- [ ] Có local non-demo hoặc isolated schema/config khi khả thi.
- [ ] Có namespace/test-run identifier cho dữ liệu test.
- [ ] Cleanup giới hạn đúng dữ liệu test.
- [ ] Failure không để dirty state.
- [ ] Parallel test strategy không gây collision.
- [ ] Integration tests không gọi global reset.
- [ ] Supabase project identity có thể kiểm tra.
- [ ] `demo:reset` target khác test target nếu cần.
- [ ] Demo data không bị integration tests xóa.
- [ ] Credentials không xuất hiện trong logs/evidence.
- [ ] Prisma migration history sạch.
- [ ] Không có drift chưa giải thích.

Required safeguard:

```text
Test target không được là shared demo/staging/production.
```

```text
Gate 07 = PASS / FAIL / BLOCKED
```

---

# 12. Gate 08 — Neo4j AuraDB Safety and Rebuild Readiness

Checklist:

- [ ] Neo4j URI/username/password nằm trong backend environment.
- [ ] Credentials không có trong source/docs/log.
- [ ] Runtime dùng backend Neo4j driver/service.
- [ ] MCP chỉ là admin/dev tooling, không phải runtime dependency.
- [ ] Current graph health check hoạt động.
- [ ] Medicine projection tồn tại.
- [ ] ActiveIngredient projection tồn tại.
- [ ] CONTAINS relationships tồn tại.
- [ ] INTERACTS_WITH relationships tồn tại.
- [ ] Canonical direction còn đúng.
- [ ] Freshness service hoạt động.
- [ ] Rebuild scope có thể giới hạn theo project/source.
- [ ] Rebuild không xóa graph ngoài approved scope.
- [ ] Không dùng global destructive cleanup trên shared AuraDB.
- [ ] Failure không làm hỏng PostgreSQL source.
- [ ] Có strategy xác minh counts/freshness sau rebuild.

Forbidden trên AuraDB dùng chung:

```cypher
MATCH (n) DETACH DELETE n
```

```text
Gate 08 = PASS / FAIL / BLOCKED
```

---

# 13. Gate 09 — Curated Seed Dataset Design

Seed dataset phải deterministic và đủ demo:

- [ ] Admin demo user.
- [ ] Staff demo user.
- [ ] Warehouse demo user.
- [ ] First-login account.
- [ ] Stable role/permission mapping.
- [ ] Medicines.
- [ ] Normalized ActiveIngredients.
- [ ] Medicine–ActiveIngredient mappings.
- [ ] Suppliers.
- [ ] Multiple MedicineBatches.
- [ ] Expired batch.
- [ ] Near-expiry batch.
- [ ] Normal sellable batch.
- [ ] FEFO multi-batch scenario.
- [ ] LOW interaction rule.
- [ ] MEDIUM interaction rule.
- [ ] HIGH interaction rule.
- [ ] Handled HIGH alert scenario.
- [ ] PAID order.
- [ ] DRAFT order.
- [ ] CANCELLED order.
- [ ] Failed payment attempt.
- [ ] Report-ready deterministic data.
- [ ] Graph-ready source data.
- [ ] AI/Graph-RAG demo data.
- [ ] Stable identifiers or lookup keys.
- [ ] Seeder idempotent hoặc reset-controlled.

Không seed dữ liệu ngẫu nhiên làm kết quả demo thay đổi không kiểm soát.

```text
Gate 09 = PASS / FAIL / BLOCKED
```

---

# 14. Gate 10 — Dynamic Expiry and Deterministic Demo Scenarios

Checklist:

- [ ] Expiry dates được tính tương đối theo ngày chạy.
- [ ] Luôn có một expired batch.
- [ ] Luôn có một near-expiry batch.
- [ ] Luôn có một normal sellable batch.
- [ ] Near-expiry dùng current setting threshold.
- [ ] Expired không bị nhầm near-expiry.
- [ ] FEFO order phân bổ qua nhiều batch.
- [ ] Số lượng batch đủ để demo FEFO rõ ràng.
- [ ] HIGH alert scenario có acknowledgement.
- [ ] HIGH alert scenario có consultation note.
- [ ] PAID order có Payment/Invoice.
- [ ] Failed payment không bị tính doanh thu.
- [ ] Revenue report có kết quả xác định.
- [ ] Top Medicines report có ranking xác định.
- [ ] Inventory report có expired/near-expiry/sellable data.
- [ ] Seed lại cùng ngày tạo kết quả nghiệp vụ tương đương.
- [ ] Seed vào ngày khác vẫn giữ semantic scenario.

```text
Gate 10 = PASS / FAIL / BLOCKED
```

---

# 15. Gate 11 — Demo Reset Fail-closed Safety

Expected pipeline:

```text
verify local-safe environment
→ acquire reset lock nếu cần
→ clear approved local data only
→ validate/migrate schema
→ seed curated PostgreSQL data
→ rebuild Neo4j projection
→ verify freshness
→ run smoke tests
→ emit structured reset report
```

Checklist:

- [ ] Environment name được kiểm tra.
- [ ] PostgreSQL host/project identity được kiểm tra.
- [ ] Explicit local-only flag tồn tại.
- [ ] Shared demo/staging/production bị block.
- [ ] Neo4j target identity được kiểm tra.
- [ ] Reset không in credentials.
- [ ] Reset không yêu cầu interactive input không phù hợp automation, hoặc có strategy rõ.
- [ ] Partial failure abort rõ ràng.
- [ ] PostgreSQL failure không tiếp tục graph rebuild.
- [ ] Graph rebuild failure được báo rõ.
- [ ] Smoke failure làm reset report FAIL.
- [ ] Có reset lock hoặc concurrency guard khi cần.
- [ ] Không chạy global destructive command ngoài approved local scope.
- [ ] Structured reset report đủ để audit.
- [ ] `demo:reset` command chưa được chạy trong Audit.

```text
Gate 11 = PASS / FAIL / BLOCKED
```

---

# 16. Gate 12 — Testing Infrastructure Readiness

Xác minh baseline hiện tại trước khi thực hiện Tasks 436–440:

- [ ] Backend unit test runner hiện có được xác định.
- [ ] Backend integration/E2E runner hiện có được xác định.
- [ ] Frontend test runner hiện có hoặc gap được ghi.
- [ ] Playwright hiện có hoặc gap được ghi.
- [ ] Postman collection hiện có hoặc gap được ghi.
- [ ] Test folder conventions xác định.
- [ ] Mock/fake strategy xác định.
- [ ] Supabase integration test isolation strategy xác định.
- [ ] Neo4j mock/live test boundary xác định.
- [ ] Test commands đọc từ `package.json`.
- [ ] Existing test count/baseline được ghi.
- [ ] Existing skipped tests được review.
- [ ] No destructive test helper.
- [ ] Chrome/Chromium desktop target rõ.
- [ ] Full cross-browser không phải MVP gate.

First technical Task after Audit PASS:

```text
PAC-TASK-436
PAC-646
test/PAC-646-task-436-add-backend-unit-test-setup
```

```text
Gate 12 = PASS / FAIL / BLOCKED
```

---

# 17. Gate 13 — High-risk Regression Test Design

Required high-risk areas:

- [ ] Auth/session.
- [ ] RBAC/permissions.
- [ ] User Management permissions.
- [ ] Medicine validation.
- [ ] ActiveIngredient mapping.
- [ ] Supplier permissions.
- [ ] MedicineBatch source of truth.
- [ ] Sellable/expired quantity.
- [ ] Near-expiry threshold.
- [ ] Stock Import transaction.
- [ ] Batch merge/expiry mismatch.
- [ ] Inventory Adjustment transaction.
- [ ] Adjustment reason/audit.
- [ ] POS Draft Order.
- [ ] Staff ownership.
- [ ] Order cancel states.
- [ ] DrugInteractionRule.
- [ ] ActiveIngredient-derived interactions.
- [ ] InteractionAlert persistence/display count.
- [ ] HIGH acknowledgement/note.
- [ ] Unresolved HIGH checkout blocker.
- [ ] Checkout transaction/rollback.
- [ ] FEFO multi-batch.
- [ ] Checkout idempotency.
- [ ] Payment one-success rule.
- [ ] Invoice.
- [ ] AI Guardrail.
- [ ] AI Audit privacy.
- [ ] AI provider fallback.
- [ ] Graph Sync.
- [ ] Graph freshness.
- [ ] Graph-RAG fallback/raw Cypher/checkout independence.
- [ ] Reports deterministic calculations.
- [ ] System Settings.
- [ ] Demo reset safety.

Mỗi high-risk suite cần có khi phù hợp:

```text
success path
validation failure
permission failure
rollback/failure isolation
idempotency/concurrency
cleanup evidence
```

Không đặt global coverage percentage bắt buộc cho toàn codebase.

```text
Gate 13 = PASS / FAIL / BLOCKED
```

---

# 18. Gate 14 — Full MVP Smoke, Chrome E2E and Responsive Strategy

Full smoke flow:

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

Checklist:

- [ ] Smoke test chạy sau demo reset.
- [ ] Smoke test dùng curated demo accounts.
- [ ] Expected result của từng bước rõ.
- [ ] Chrome/Chromium desktop là E2E target.
- [ ] Login critical path có E2E.
- [ ] POS/Interaction/Checkout critical path có E2E hoặc kế hoạch rõ.
- [ ] Reports/Settings có smoke coverage.
- [ ] Graph unavailable fallback có smoke coverage.
- [ ] Basic responsive widths được xác định.
- [ ] Full cross-browser matrix ghi N/A/out of scope.
- [ ] Manual Postman support không thay thế automated tests.
- [ ] Screenshots/video chỉ là contingency evidence.
- [ ] Running product vẫn là release requirement.

```text
Gate 14 = PASS / FAIL / BLOCKED
```

---

# 19. Gate 15 — GitHub Actions and CI Transition Design

Initial state:

```text
CI = N/A — GitHub Actions chưa được cấu hình
Quality Gate = Local Quality Gate
```

Final Sprint 10 expectation:

```text
GitHub Actions configured
Local Quality Gate remains required
Applicable CI checks pass
```

Checklist:

- [ ] Workflow scope xác định.
- [ ] Lint check.
- [ ] Typecheck check.
- [ ] Backend build.
- [ ] Frontend build.
- [ ] Unit tests.
- [ ] Integration tests.
- [ ] Prisma validate.
- [ ] Migration check.
- [ ] Destructive-test guard.
- [ ] Least-privilege `permissions`.
- [ ] No plaintext secrets.
- [ ] No production/demo database connection by default.
- [ ] Stable working directories.
- [ ] Node/package-manager version pinned reasonably.
- [ ] Dependency cache không làm sai correctness.
- [ ] No deployment side effects.
- [ ] No hidden Docker requirement.
- [ ] Trigger strategy hợp lý cho PR/develop.
- [ ] Required check transition được ghi rõ.
- [ ] Workflow phải được chạy thật trước Final Review.

Không ghi CI PASS chỉ vì YAML tồn tại.

```text
Gate 15 = PASS / FAIL / BLOCKED
```

---

# 20. Gate 16 — Prisma, Migration, Seed and Cleanup Readiness

Checklist:

- [ ] Sprint 9 migrations đã ổn định.
- [ ] Prisma schema validate baseline PASS.
- [ ] Prisma generate baseline PASS.
- [ ] Không có drift chưa giải thích.
- [ ] Seed không cần destructive schema reset.
- [ ] Seed dùng upsert/stable key hoặc reset-controlled strategy.
- [ ] Dynamic date generation có timezone strategy rõ.
- [ ] Demo reset không drop unrelated schema.
- [ ] Migration check trong CI không apply production changes.
- [ ] Test cleanup không dùng global truncate trên shared target.
- [ ] Cleanup có namespace/test-run identifier.
- [ ] Graph rebuild lấy dữ liệu từ PostgreSQL source.
- [ ] Failed seed không để partial ambiguous state.
- [ ] Failed reset có report và recovery guidance.
- [ ] Credentials không được persist.
- [ ] Rollback/re-run strategy rõ.

Expected verification plan:

```text
prisma validate
prisma generate
migration status/check
controlled local seed
controlled local reset
controlled graph rebuild
smoke verification
cleanup/re-run evidence
```

```text
Gate 16 = PASS / FAIL / BLOCKED
```

---

# 21. Gate 17 — Documentation, Traceability and Release Evidence Readiness

Required documentation scope:

- [ ] Root README setup.
- [ ] Backend setup/run.
- [ ] Frontend setup/run.
- [ ] Environment variables.
- [ ] Supabase setup.
- [ ] Neo4j AuraDB setup.
- [ ] Google AI configuration.
- [ ] MockAI fallback.
- [ ] Prisma generate/migrate.
- [ ] Seed command.
- [ ] Graph rebuild command.
- [ ] Demo reset command.
- [ ] Demo account guide.
- [ ] Login/RBAC demo script.
- [ ] Inventory/Stock Import demo script.
- [ ] POS/Interaction/Checkout demo script.
- [ ] AI/Graph-RAG demo script.
- [ ] Reports/Settings demo script.
- [ ] Traceability summary.
- [ ] Release checklist.
- [ ] Demo freeze checklist.
- [ ] Known limitations/out-of-scope.
- [ ] Contingency evidence list.
- [ ] Final smoke report template.

Checklist:

- [ ] Docs dùng command thật.
- [ ] Docs không chứa secret.
- [ ] Docker không được mô tả là official path.
- [ ] Chrome desktop scope được ghi đúng.
- [ ] Screenshots/video không thay thế running demo.
- [ ] Jira/manual workflow được ghi đúng.
- [ ] CI transition được ghi đúng.
- [ ] Release Story/Epic traceability strategy rõ.

```text
Gate 17 = PASS / FAIL / BLOCKED
```

---

# 22. Gate 18 — Security, Secrets and Destructive-operation Guards

Review:

- [ ] Supabase service-role key không ở frontend.
- [ ] Neo4j password không tracked.
- [ ] Google AI key không tracked.
- [ ] GitHub secrets không hard-code.
- [ ] Logs không echo full connection strings.
- [ ] Test output không in tokens/passwords.
- [ ] Demo accounts không dùng production credentials.
- [ ] `demo:reset` fail closed.
- [ ] CI destructive-test guard fail closed.
- [ ] No `prisma migrate reset` against shared target.
- [ ] No unrestricted `TRUNCATE ... CASCADE` against shared target.
- [ ] No global Neo4j delete on shared AuraDB.
- [ ] Reset/rebuild permission boundary rõ.
- [ ] GitHub workflow permissions least privilege.
- [ ] Artifact/evidence không chứa PII/secrets.
- [ ] AI Audit privacy baseline vẫn được bảo vệ.
- [ ] Test data không biến thành real medical record.
- [ ] No production deployment action trong Sprint 10 CI.

```text
Gate 18 = PASS / FAIL / BLOCKED
```

---

# 23. Gate 19 — Execution Order, Ownership and Release Governance

Recommended technical order:

```text
Testing Foundation
→ Curated Demo Data
→ Demo Reset/Graph Rebuild
→ High-risk Regression
→ Full Smoke
→ Setup Commands
→ GitHub Actions
→ Documentation/Release Evidence
```

Checklist:

- [ ] First technical Task là PAC-TASK-436.
- [ ] Test infrastructure đi trước broad regression suites.
- [ ] Seed data đi trước demo reset validation.
- [ ] Demo reset đi trước final smoke.
- [ ] CI workflows chỉ dùng command đã được xác minh local.
- [ ] Documentation hoàn thiện sau khi commands ổn định.
- [ ] Task/Bug PR target `develop`.
- [ ] Story/Epic không có PR.
- [ ] Project Owner quản lý Jira.
- [ ] Project Owner merge `develop → main`.
- [ ] AI Agent không release production.
- [ ] Release approval thuộc Project Owner.
- [ ] Bug Candidate workflow có owner rõ.
- [ ] Team capacity không được giả định bằng nhau.
- [ ] Sprint 10 không bị coi là nơi thêm feature mới.

First technical Task:

```text
PAC-TASK-436
PAC-646
test/PAC-646-task-436-add-backend-unit-test-setup
```

```text
Gate 19 = PASS / FAIL / BLOCKED
```

---

# 24. Gate 20 — Findings and Final Authorization

PASS chỉ khi:

```text
Gate 01 → Gate 19 = PASS

Tasks reconciled = 101/101
Release Stories reconciled = 6/6
Core Epics reconciled = 4/4
Branches verified = 111/111

Blocking findings = 0
High findings = 0

Sprint 10 Audit = PASS
Mandatory Gates PASS = 20/20
Ready to implement Sprint 10 = Yes
```

Nếu có Medium/Low:

- Ghi impact.
- Ghi owner.
- Ghi remediation.
- Xác định có chặn implementation hay không.

Nếu có Blocker/High:

```text
Sprint 10 Audit = FAIL/BLOCKED
Ready to implement Sprint 10 = No
```

```text
Gate 20 = PASS / FAIL / BLOCKED
```

---

# 25. Findings Register

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
| S10-AUD-001 | — | — | Chưa có | — | — | — | Open |

Rules:

- Không xóa finding.
- Khi resolved, cập nhật evidence và status.
- Observation không phải defect.
- Blocker/High chặn `Ready to implement Sprint 10 = Yes`.

---

# 26. Branch Verification Register

## 26.1 Core Epic branches

| Epic | Jira Key | Expected branch | Remote verified | Usage |
|---|---|---|---|---|
| PAC-EPIC-18 | PAC-18 | `epic/PAC-18-epic-18-data-seed-demo-reset` | Pending | Traceability only |
| PAC-EPIC-19 | PAC-19 | `epic/PAC-19-epic-19-testing-smoke-test-release-readiness` | Pending | Traceability only |
| PAC-EPIC-20 | PAC-20 | `epic/PAC-20-epic-20-devops-ci-setup` | Pending | Traceability only |
| PAC-EPIC-21 | PAC-21 | `epic/PAC-21-epic-21-documentation-traceability` | Pending | Traceability only |

## 26.2 Release Story branches

| Story | Jira Key | Remote verified |
|---|---|---|
| US-145 | PAC-185 | Pending |
| US-146 | PAC-186 | Pending |
| US-147 | PAC-187 | Pending |
| US-148 | PAC-188 | Pending |
| US-149 | PAC-189 | Pending |
| US-150 | PAC-190 | Pending |

## 26.3 Task branches

| Task range | Jira range | Expected | Remote verified | Result |
|---|---|---:|---:|---|
| PAC-TASK-425 → PAC-TASK-525 | PAC-635 → PAC-735 | 101 | — | Pending |

Detailed exact branches phải được kiểm tra từ `Jira/branch-on-jira.md` và `sprint-10-progress.md`.

---

# 27. Environment Verification Register

| Environment/Tool | Expected | Actual | Evidence | Result |
|---|---|---|---|---|
| Git remote | Accessible | — | — | Pending |
| GitHub PR workflow | Available | — | — | Pending |
| GitHub Actions state | Not configured initially | — | — | Pending |
| Local develop | Synced with origin | — | — | Pending |
| Node/package manager | Compatible | — | — | Pending |
| Supabase/PostgreSQL | Safe | — | — | Pending |
| Safe test target | Identified | — | — | Pending |
| Safe demo-reset target | Identified | — | — | Pending |
| Prisma schema | Valid baseline | — | — | Pending |
| Neo4j AuraDB | Safe/readable | — | — | Pending |
| Safe graph rebuild scope | Identified | — | — | Pending |
| Google AI | Configured or safe fallback | — | — | Pending |
| Backend test runner | Available/baseline known | — | — | Pending |
| Frontend test runner | Available or gap recorded | — | — | Pending |
| Playwright Chrome | Available or gap recorded | — | — | Pending |
| Postman | Available or gap recorded | — | — | Pending |

---

# 28. Audit Report Template

```markdown
# Sprint 10 Audit Report

## Decision

Sprint 10 Audit = PASS/FAIL/BLOCKED
Mandatory Gates PASS = x/20
Ready to implement Sprint 10 = Yes/No

## Dependency Status

- Sprint 9 Final Review:
- Ready for Sprint 10:
- Latest develop SHA:
- Working tree:
- Blocking/High Sprint 9 defects:

## Scope

- Tasks reconciled: x/101
- Release Stories reconciled: x/6
- Core Epics reconciled: x/4
- Branches verified: x/111

## Gate Results

1. Sprint 9 dependency:
2. Repository baseline:
3. Scope/mapping:
4. Exact branch inventory:
5. GitHub workflow:
6. Official setup/runtime:
7. PostgreSQL/Supabase safety:
8. Neo4j safety/rebuild:
9. Curated seed design:
10. Dynamic expiry/demo scenarios:
11. Demo reset safety:
12. Testing infrastructure:
13. High-risk regression design:
14. Full smoke/E2E/responsive:
15. GitHub Actions/CI transition:
16. Prisma/migration/seed readiness:
17. Documentation/release evidence:
18. Security/destructive guards:
19. Execution/governance:
20. Final authorization:

## Key Evidence

- Branch inventory:
- Existing test baseline:
- Supabase/PostgreSQL:
- Neo4j:
- Demo reset design:
- Seed design:
- Test isolation:
- CI design:
- Setup commands:
- Documentation baseline:
- Security review:

## Findings

- Blocking:
- High:
- Medium:
- Low:
- Observations:

## Implementation Start

First technical Task:
PAC-TASK-436

Jira Key:
PAC-646

Exact branch:
test/PAC-646-task-436-add-backend-unit-test-setup

Implementation may start:
Yes/No
```

---

# 29. Initial and PASS States

Initial state:

```text
Sprint 9 implementation = In progress
Sprint 9 Final Review = Pending
Sprint 10 plan = Prepared
Sprint 10 progress tracker = Prepared
Sprint 10 audit = Not started
Sprint 10 agent prompt = Not created
Sprint 10 final review prompt = Not created
Ready to implement Sprint 10 = No
Ready for MVP Release = No
```

PASS state:

```text
Sprint 9 Final Review = PASS
Ready for Sprint 10 = Yes

Sprint 10 Audit = PASS
Mandatory Gates PASS = 20/20
Blocking findings = 0
High findings = 0

101/101 exact Task branches = Verified
6/6 Release Story branches = Verified
4/4 Core Epic branches = Verified

Safe test environment = Approved
Safe demo reset environment = Approved
Safe Neo4j rebuild scope = Approved
Testing baseline = Verified
CI implementation design = Approved
Release documentation plan = Approved

Ready to implement Sprint 10 = Yes
Ready for MVP Release = No

CI = N/A — GitHub Actions chưa được cấu hình
Quality Gate = Local Quality Gate
```

First technical Task after PASS:

```text
PAC-TASK-436
PAC-646
test/PAC-646-task-436-add-backend-unit-test-setup
```

---

# 30. Start Instruction for Auditor

Thực hiện:

1. Đọc toàn bộ canonical sources.
2. Xác minh Sprint 9 Final Review PASS.
3. Đồng bộ và kiểm tra remote `develop`.
4. Reconcile 101 Tasks, 6 Release Stories và 4 Core Epics.
5. Verify 111 exact branches.
6. Xác minh GitHub workflow và permissions.
7. Xác minh official local setup/runtime baseline.
8. Xác minh safe PostgreSQL/Supabase test strategy.
9. Xác minh safe Neo4j rebuild strategy.
10. Review curated seed design.
11. Review dynamic expiry/demo scenario design.
12. Review demo-reset fail-closed design.
13. Review test infrastructure readiness.
14. Review high-risk regression plan.
15. Review full MVP smoke, Chrome E2E và responsive plan.
16. Review GitHub Actions/CI transition design.
17. Review Prisma/migration/seed/cleanup readiness.
18. Review documentation/release-evidence plan.
19. Review secret/destructive-operation guards.
20. Review execution order và governance.
21. Ghi findings.
22. Xuất Sprint 10 Audit Report.
23. Chỉ ghi `Ready to implement Sprint 10 = Yes` khi 20/20 Gate PASS.
24. Không bắt đầu coding trong Audit.
