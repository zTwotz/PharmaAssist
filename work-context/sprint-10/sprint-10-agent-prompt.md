# Sprint 10 AI Agent Prompt — PharmaAssist AI Intelligence

> **Release-hardening execution prompt**
>
> Repository path:
>
> `work-context/sprint-10/sprint-10-agent-prompt.md`
>
> Chỉ chạy sau khi Sprint 9 Final Review và Sprint 10 Audit đều PASS.

---

# 1. Vai trò và mục tiêu

Bạn là AI Coding Agent chính của Sprint 10.

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

Core Epics:
PAC-EPIC-18
PAC-EPIC-19
PAC-EPIC-20
PAC-EPIC-21

Initial CI:
N/A — GitHub Actions chưa được cấu hình

Initial merge gate:
Local Quality Gate

Final release gate:
Local Quality Gate + applicable GitHub Actions checks
```

Mục tiêu:

```text
xây test foundation
→ tạo curated deterministic seed
→ xây local-only demo reset
→ rebuild Neo4j projection
→ bổ sung high-risk regression suites
→ chạy full MVP smoke
→ xác minh official setup commands
→ cấu hình GitHub Actions
→ hoàn thiện documentation và release evidence
```

Sprint 10 là release-hardening sprint. Không mở thêm business feature mới.

---

# 2. Authorization Gate

Chỉ bắt đầu code khi:

```text
Sprint 9 Final Review = PASS
Ready for Sprint 10 = Yes

Sprint 10 Audit = PASS
Mandatory Gates PASS = 20/20
Ready to implement Sprint 10 = Yes

101/101 exact Task branches = Verified
6/6 Release Story branches = Verified
4/4 Core Epic branches = Verified

Safe PostgreSQL/Supabase test target = Approved
Safe demo-reset target = Approved
Safe Neo4j rebuild scope = Approved
Testing baseline = Verified
CI implementation design = Approved

Blocking findings = 0
High findings = 0
```

Nếu thiếu bất kỳ điều kiện nào:

```text
Không sửa production/release code
Không chạy demo:reset
Không apply Sprint 10 seed/migration
Không tạo GitHub Actions workflow
Không tự tạo branch
Không dùng branch gần giống
Cập nhật audit/progress với blocker thật
Dừng ở trạng thái BLOCKED
```

---

# 3. Tài liệu bắt buộc

Đọc:

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
```

`Jira/branch-on-jira.md` là nguồn duy nhất cho Jira Key và exact branch.

---

# 4. Skill Routing

Mọi Task tuân thủ:

```text
karpathy-principles
```

Chọn thêm theo phạm vi:

```text
Backend testing / NestJS:
ecc-backend + ecc-testing + tdd

Prisma / Supabase / seed / cleanup:
ecc-database + ecc-security + ecc-testing + tdd

Demo reset / destructive guard:
ecc-backend + ecc-database + ecc-security + mattpocock-engineering

Neo4j rebuild:
ecc-backend + ecc-database + ecc-security + tdd

Frontend component tests:
ecc-frontend + modern-web-guidance + ecc-testing + tdd

Playwright / smoke:
ecc-testing + mattpocock-engineering

GitHub Actions:
git-github + ecc-security + ecc-code-quality

Documentation:
writing-plans + mattpocock-productivity

Debug / flaky / concurrency:
mattpocock-engineering + ecc-testing + tdd

Task nhiều module:
superpowers-workflow hoặc writing-plans
```

Trước mỗi Task, báo:

```text
Skills selected:
- ...

Reason:
...
```

Không dùng planning để trì hoãn Task đã có Acceptance Criteria rõ.

---

# 5. First Technical Task

Bắt đầu bằng test foundation:

```text
Logical Task:
PAC-TASK-436 / TASK-436

Jira Key:
PAC-646

Task:
Add backend unit test setup

Exact branch:
test/PAC-646-task-436-add-backend-unit-test-setup
```

Kiểm tra branch:

```bash
git fetch --all --prune
git branch -r --list "origin/test/PAC-646-task-436-add-backend-unit-test-setup"
```

Nếu branch không tồn tại:

```text
Dừng
Không chạy git switch -c
Không chạy git checkout -b
Không tạo replacement branch
Không sửa branch slug
Báo blocker cho Project Owner
```

---

# 6. Technical Execution Order

## Phase 1 — Testing Foundation

```text
PAC-TASK-436 / PAC-646 / test/PAC-646-task-436-add-backend-unit-test-setup
→ PAC-TASK-437 / PAC-647 / test/PAC-647-task-437-add-backend-integration-test-setup-with-isolated-cl
→ PAC-TASK-438 / PAC-648 / test/PAC-648-task-438-add-frontend-component-test-setup
→ PAC-TASK-439 / PAC-649 / test/PAC-649-task-439-add-playwright-e2e-test-setup-for-chrome-desktop
→ PAC-TASK-440 / PAC-650 / feature/PAC-650-task-440-add-postman-manual-api-collection-structure
```

## Phase 2 — Curated Demo Data

```text
PAC-TASK-425 / PAC-635 / feature/PAC-635-task-425-create-curated-mvp-seed-dataset
→ PAC-TASK-426 / PAC-636 / feature/PAC-636-task-426-seed-demo-users-by-role
→ PAC-TASK-427 / PAC-637 / feature/PAC-637-task-427-seed-first-login-demo-account
→ PAC-TASK-428 / PAC-638 / feature/PAC-638-task-428-generate-dynamic-expiry-dates-for-demo-batches
→ PAC-TASK-429 / PAC-639 / feature/PAC-639-task-429-seed-fefo-multi-batch-demo-scenario
→ PAC-TASK-430 / PAC-640 / feature/PAC-640-task-430-seed-expired-batch-excluded-from-sellable-stock
→ PAC-TASK-431 / PAC-641 / feature/PAC-641-task-431-seed-paid-order-with-handled-high-alert
→ PAC-TASK-432 / PAC-642 / feature/PAC-642-task-432-seed-report-data-with-paid-draft-cancelled-and-fail
```

## Phase 3 — Local Demo Reset and Graph Rebuild

```text
PAC-TASK-433 / PAC-643 / feature/PAC-643-task-433-implement-demo-reset-local-only-environment-guard
→ PAC-TASK-434 / PAC-644 / feature/PAC-644-task-434-rebuild-neo4j-projection-during-demo-reset
```

## Phase 4 — High-risk and Cross-sprint Regression Testing

```text
PAC-TASK-441 / PAC-651 / test/PAC-651-task-441-add-auth-and-rbac-test-suite
→ PAC-TASK-442 / PAC-652 / test/PAC-652-task-442-add-user-management-permission-tests
→ PAC-TASK-443 / PAC-653 / test/PAC-653-task-443-add-medicine-management-api-tests
→ PAC-TASK-444 / PAC-654 / test/PAC-654-task-444-add-activeingredient-mapping-tests
→ PAC-TASK-445 / PAC-655 / test/PAC-655-task-445-add-supplier-management-api-tests
→ PAC-TASK-446 / PAC-656 / test/PAC-656-task-446-add-medicinebatch-source-of-truth-tests
→ PAC-TASK-447 / PAC-657 / test/PAC-657-task-447-add-sellable-quantity-and-expired-batch-tests
→ PAC-TASK-448 / PAC-658 / test/PAC-658-task-448-add-near-expiry-threshold-tests
→ PAC-TASK-449 / PAC-659 / test/PAC-659-task-449-add-stock-import-transaction-tests
→ PAC-TASK-450 / PAC-660 / test/PAC-660-task-450-add-stock-import-batch-merge-and-expiry-mismatch-te
→ PAC-TASK-451 / PAC-661 / test/PAC-661-task-451-add-inventory-adjustment-transaction-tests
→ PAC-TASK-452 / PAC-662 / test/PAC-662-task-452-add-inventory-adjustment-audit-and-reason-tests
→ PAC-TASK-453 / PAC-663 / test/PAC-663-task-453-add-pos-draft-order-api-tests
→ PAC-TASK-454 / PAC-664 / test/PAC-664-task-454-add-pos-draft-order-ui-smoke-tests
→ PAC-TASK-455 / PAC-665 / test/PAC-665-task-455-add-staff-order-ownership-tests
→ PAC-TASK-456 / PAC-666 / test/PAC-666-task-456-add-draft-order-cancel-status-tests
→ PAC-TASK-457 / PAC-667 / test/PAC-667-task-457-add-druginteraction-rule-api-tests
→ PAC-TASK-458 / PAC-668 / test/PAC-668-task-458-add-activeingredient-derived-interaction-tests
→ PAC-TASK-459 / PAC-669 / test/PAC-669-task-459-add-interactionalert-persistence-tests
→ PAC-TASK-460 / PAC-670 / test/PAC-670-task-460-add-interactionalert-display-count-tests
→ PAC-TASK-461 / PAC-671 / test/PAC-671-task-461-add-high-alert-acknowledgement-tests
→ PAC-TASK-462 / PAC-672 / test/PAC-672-task-462-add-high-alert-consultation-note-tests
→ PAC-TASK-463 / PAC-673 / test/PAC-673-task-463-add-checkout-blocker-tests-for-unresolved-high-aler
→ PAC-TASK-464 / PAC-674 / test/PAC-674-task-464-add-checkout-transaction-success-tests
→ PAC-TASK-465 / PAC-675 / test/PAC-675-task-465-add-checkout-rollback-failure-tests
→ PAC-TASK-466 / PAC-676 / test/PAC-676-task-466-add-fefo-allocation-unit-tests
→ PAC-TASK-467 / PAC-677 / test/PAC-677-task-467-add-fefo-multi-batch-allocation-tests
→ PAC-TASK-468 / PAC-678 / test/PAC-678-task-468-add-checkout-idempotency-tests
→ PAC-TASK-469 / PAC-679 / test/PAC-679-task-469-add-payment-cash-handling-tests
→ PAC-TASK-470 / PAC-680 / test/PAC-680-task-470-add-payment-one-success-rule-tests
→ PAC-TASK-471 / PAC-681 / test/PAC-681-task-471-add-invoice-generation-tests
→ PAC-TASK-472 / PAC-682 / test/PAC-682-task-472-add-ai-guardrail-high-risk-test-suite
→ PAC-TASK-473 / PAC-683 / test/PAC-683-task-473-add-ai-audit-privacy-tests
→ PAC-TASK-474 / PAC-684 / test/PAC-684-task-474-add-ai-provider-fallback-tests
→ PAC-TASK-475 / PAC-685 / test/PAC-685-task-475-add-graph-sync-outbox-and-retry-tests
→ PAC-TASK-476 / PAC-686 / test/PAC-686-task-476-add-neo4j-projection-tests
→ PAC-TASK-477 / PAC-687 / test/PAC-687-task-477-add-graph-freshness-tests
→ PAC-TASK-478 / PAC-688 / test/PAC-688-task-478-add-graph-rag-fallback-tests
→ PAC-TASK-479 / PAC-689 / test/PAC-689-task-479-add-reports-deterministic-calculation-tests
```

## Phase 5 — Full MVP Smoke after Reset

```text
PAC-TASK-480 / PAC-690 / test/PAC-690-task-480-add-full-mvp-smoke-test-checklist
→ PAC-TASK-435 / PAC-645 / test/PAC-645-task-435-run-smoke-tests-after-demo-reset
```

## Phase 6 — Local Setup and Operational Commands

```text
PAC-TASK-481 / PAC-691 / feature/PAC-691-task-481-configure-local-node-js-project-setup-guide
→ PAC-TASK-482 / PAC-692 / feature/PAC-692-task-482-configure-frontend-environment-variables-guide
→ PAC-TASK-483 / PAC-693 / feature/PAC-693-task-483-configure-backend-environment-variables-guide
→ PAC-TASK-484 / PAC-694 / feature/PAC-694-task-484-configure-supabase-project-setup-instructions
→ PAC-TASK-485 / PAC-695 / feature/PAC-695-task-485-configure-neo4j-auradb-setup-instructions
→ PAC-TASK-486 / PAC-696 / feature/PAC-696-task-486-configure-google-ai-api-key-setup-instructions
→ PAC-TASK-487 / PAC-697 / feature/PAC-697-task-487-configure-mockai-fallback-setup-instructions
→ PAC-TASK-488 / PAC-698 / feature/PAC-698-task-488-add-prisma-generate-and-migrate-setup-command
→ PAC-TASK-489 / PAC-699 / feature/PAC-699-task-489-add-seed-command-for-curated-mvp-data
→ PAC-TASK-490 / PAC-700 / feature/PAC-700-task-490-add-graph-projection-rebuild-command
→ PAC-TASK-491 / PAC-701 / feature/PAC-701-task-491-add-demo-reset-command-entrypoint
→ PAC-TASK-492 / PAC-702 / feature/PAC-702-task-492-add-demo-reset-environment-safety-checks
```

## Phase 7 — GitHub Actions and CI Safety

```text
PAC-TASK-493 / PAC-703 / feature/PAC-703-task-493-configure-github-actions-lint-check
→ PAC-TASK-494 / PAC-704 / feature/PAC-704-task-494-configure-github-actions-type-check
→ PAC-TASK-495 / PAC-705 / feature/PAC-705-task-495-configure-github-actions-frontend-build
→ PAC-TASK-496 / PAC-706 / feature/PAC-706-task-496-configure-github-actions-backend-build
→ PAC-TASK-497 / PAC-707 / test/PAC-707-task-497-configure-github-actions-unit-test-check
→ PAC-TASK-498 / PAC-708 / test/PAC-708-task-498-configure-github-actions-integration-test-check
→ PAC-TASK-499 / PAC-709 / feature/PAC-709-task-499-configure-prisma-schema-validation-check
→ PAC-TASK-500 / PAC-710 / feature/PAC-710-task-500-configure-prisma-migration-check
→ PAC-TASK-501 / PAC-711 / test/PAC-711-task-501-add-ci-guard-to-prevent-destructive-tests-against-d
→ PAC-TASK-502 / PAC-712 / feature/PAC-712-task-502-add-ci-branch-protection-expectation-notes
→ PAC-TASK-503 / PAC-713 / feature/PAC-713-task-503-add-local-only-guard-for-demo-reset-script
→ PAC-TASK-504 / PAC-714 / feature/PAC-714-task-504-add-chrome-desktop-target-verification-checklist
→ PAC-TASK-505 / PAC-715 / feature/PAC-715-task-505-add-basic-responsive-verification-checklist
```

## Phase 8 — Documentation and Release Readiness

```text
PAC-TASK-506 / PAC-716 / docs/PAC-716-task-506-write-project-readme-setup-section
→ PAC-TASK-507 / PAC-717 / feature/PAC-717-task-507-write-backend-setup-and-run-instructions
→ PAC-TASK-508 / PAC-718 / feature/PAC-718-task-508-write-frontend-setup-and-run-instructions
→ PAC-TASK-509 / PAC-719 / feature/PAC-719-task-509-write-database-migration-and-seed-instructions
→ PAC-TASK-510 / PAC-720 / feature/PAC-720-task-510-write-supabase-auth-setup-notes
→ PAC-TASK-511 / PAC-721 / feature/PAC-721-task-511-write-neo4j-setup-and-graph-rebuild-notes
→ PAC-TASK-512 / PAC-722 / feature/PAC-722-task-512-write-ai-provider-and-mockai-fallback-setup-notes
→ PAC-TASK-513 / PAC-723 / feature/PAC-723-task-513-write-demo-account-guide
→ PAC-TASK-514 / PAC-724 / feature/PAC-724-task-514-write-demo-scenario-script-for-login-and-role-switc
→ PAC-TASK-515 / PAC-725 / feature/PAC-725-task-515-write-demo-scenario-script-for-stock-import-and-med
→ PAC-TASK-516 / PAC-726 / feature/PAC-726-task-516-write-demo-scenario-script-for-pos-and-checkout
→ PAC-TASK-517 / PAC-727 / feature/PAC-727-task-517-write-demo-scenario-script-for-interactionalert-and
→ PAC-TASK-518 / PAC-728 / feature/PAC-728-task-518-write-demo-scenario-script-for-ai-copilot-and-ai-au
→ PAC-TASK-519 / PAC-729 / feature/PAC-729-task-519-write-demo-scenario-script-for-graph-sync-and-graph
→ PAC-TASK-520 / PAC-730 / feature/PAC-730-task-520-write-demo-scenario-script-for-reports-and-settings
→ PAC-TASK-521 / PAC-731 / feature/PAC-731-task-521-write-mvp-traceability-matrix-summary
→ PAC-TASK-522 / PAC-732 / feature/PAC-732-task-522-write-release-demo-readiness-checklist
→ PAC-TASK-523 / PAC-733 / feature/PAC-733-task-523-write-known-limitations-and-out-of-scope-guard-sect
→ PAC-TASK-524 / PAC-734 / feature/PAC-734-task-524-prepare-contingency-evidence-screenshots-list
→ PAC-TASK-525 / PAC-735 / test/PAC-735-task-525-prepare-final-smoke-test-report-template
```


Technical order không thay đổi Logical Task, Jira Key hoặc exact branch.

---

# 7. Release-hardening Invariants

## 7.1 PostgreSQL and inventory

- PostgreSQL là source of truth.
- MedicineBatch là inventory source of truth.
- Không dùng destructive global cleanup trên shared target.
- Test data phải có isolation và cleanup.
- Demo data phải deterministic.
- Reports chỉ tính authoritative deterministic data.

## 7.2 Neo4j

- Neo4j là read projection.
- Rebuild lấy source từ PostgreSQL.
- Không dùng graph làm checkout authority.
- Không global delete trên shared AuraDB.
- Rebuild phải xác minh counts và freshness.
- MCP không là runtime dependency.

## 7.3 AI

- Google AI primary, MockAI fallback.
- Guardrails và AI Audit vẫn bắt buộc.
- Không diagnosis, prescribing hoặc dosage advice.
- AI không tính report totals.
- Demo data không trở thành medical record thật.

## 7.4 Demo reset

`demo:reset` phải fail closed:

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

Không chạy trên demo/staging/production.

## 7.5 CI

Trước khi CI active:

```text
CI = N/A — GitHub Actions chưa được cấu hình
Quality Gate = Local Quality Gate
```

Sau khi CI active:

```text
Quality Gate =
Local Quality Gate
+ applicable GitHub Actions checks
```

YAML tồn tại không đồng nghĩa CI PASS. Workflow phải chạy thật.

---

# 8. Curated Seed Contract

Seed phải tạo được:

- Admin, Staff và Warehouse demo users.
- First-login account.
- Medicines và normalized ActiveIngredients.
- Medicine–ActiveIngredient mappings.
- Suppliers.
- Normal sellable batches.
- Expired batch.
- Near-expiry batch.
- FEFO multi-batch scenario.
- LOW/MEDIUM/HIGH interaction rules.
- PAID order với handled HIGH alert.
- DRAFT order.
- CANCELLED order.
- Failed payment attempt.
- Report-ready deterministic data.
- Graph-ready source data.
- AI/Graph-RAG demo data.

Seed phải idempotent hoặc reset-controlled.

Không dùng dữ liệu random làm thay đổi kết quả demo.

---

# 9. Dynamic Expiry Contract

- Expiry dates tính tương đối theo ngày chạy.
- Luôn có expired batch.
- Luôn có near-expiry batch.
- Luôn có normal sellable batch.
- Near-expiry dùng current setting threshold.
- Expired không bị tính near-expiry.
- Seed ở ngày khác vẫn giữ semantic scenario.
- FEFO scenario phải vẫn rõ ràng.

---

# 10. Test Isolation and Cleanup

Dự án không bắt buộc provisioning database test riêng.

Do đó:

- Xác minh target trước mỗi integration run.
- Không dùng shared demo/staging/production.
- Dùng namespace/test-run identifier.
- Cleanup chỉ xóa dữ liệu do test tạo.
- Failure không để dirty state.
- Không dùng global truncate/reset ngoài approved local target.
- Parallel tests không collision.
- Neo4j live tests phải bounded và cleanup an toàn.

Nếu không chứng minh target an toàn:

```text
Không chạy test destructive
Dừng và báo blocker
```

---

# 11. High-risk Regression Rules

Các suite phải bao phủ khi phù hợp:

```text
success path
validation failure
permission failure
transaction rollback/failure isolation
idempotency/concurrency
cleanup evidence
```

High-risk areas:

- Auth/RBAC.
- User Management.
- Medicine/ActiveIngredient/Supplier.
- MedicineBatch/sellable/expired/near-expiry.
- Stock Import.
- Inventory Adjustment.
- POS Draft Order.
- DrugInteractionRule.
- InteractionAlert và HIGH handling.
- Checkout/FEFO/idempotency/rollback.
- Payment/Invoice.
- AI Guardrail/Audit/fallback.
- Graph Sync/freshness.
- Graph-RAG fallback/raw Cypher/checkout independence.
- Reports.
- System Settings.
- Demo reset safety.

Không áp global mandatory coverage percentage cho toàn bộ codebase.

---

# 12. Full MVP Smoke Contract

Required flow:

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

Rules:

- Chạy sau successful demo reset.
- Dùng curated accounts.
- Chrome/Chromium desktop là target chính.
- Basic responsive verification bắt buộc.
- Full cross-browser matrix ngoài scope.
- Postman hỗ trợ manual smoke, không thay automated tests.
- Screenshots/video chỉ contingency evidence.

---

# 13. GitHub Actions Contract

Required checks:

- Lint.
- Typecheck.
- Backend build.
- Frontend build.
- Unit tests.
- Integration tests.
- Prisma validate.
- Migration check.
- Destructive-test guard.

Workflow rules:

- Least-privilege permissions.
- No plaintext secrets.
- No shared demo/production DB by default.
- No deployment side effects.
- Stable working directories.
- Reasonable Node/package-manager pin.
- No hidden Docker dependency.
- Clear failure output.
- Workflow phải chạy thật trước Sprint Final Review.

---

# 14. Workflow Mỗi Task

```text
pull latest develop
→ verify exact branch exists
→ checkout exact branch
→ read Task + Acceptance Criteria
→ select skills
→ inspect current repository/scripts
→ write tests first when appropriate
→ implement minimal correct scope
→ run targeted checks
→ run controlled Supabase/Neo4j verification when needed
→ review diff/secrets/destructive-risk/cleanup
→ commit
→ push
→ create PR into develop
→ Local Quality Gate
→ applicable CI checks after CI active
→ merge
→ verify merge SHA on origin/develop
→ update sprint-10-progress.md
→ continue next Task
```

Preparation:

```bash
git fetch --all --prune
git switch develop
git pull origin develop
git status --short
git branch -r --list "origin/<EXACT_TASK_BRANCH>"
git switch <EXACT_TASK_BRANCH>
```

Nếu branch thiếu, dừng và báo blocker.

---

# 15. Local Quality Gate

Không tự đoán command. Đọc `package.json`.

Task-level checks phù hợp:

```text
lint
typecheck
targeted unit tests
targeted integration/E2E
build
Prisma validate/generate
controlled Supabase verification
controlled Neo4j verification
cleanup verification
security/diff review
```

Sau lint có `--fix`:

```bash
git status --short
```

Chỉ merge khi:

1. Exact branch/Jira Key đúng.
2. Acceptance Criteria hoàn thành.
3. PR target `develop`.
4. Diff đúng scope.
5. Relevant tests PASS.
6. Lint/typecheck/build PASS hoặc N/A hợp lệ.
7. Prisma checks PASS khi liên quan.
8. Supabase/Neo4j checks PASS hoặc N/A hợp lệ.
9. Test isolation/cleanup evidence hợp lệ.
10. Không secret.
11. Không destructive command ngoài approved local target.
12. Không conflict.
13. Applicable CI checks PASS sau khi CI active.

Nếu FAIL:

```text
Không merge
Sửa trên cùng exact branch
Chạy lại checks
Push lại
Chỉ merge khi PASS
```

---

# 16. Git, Commit and PR

Dùng `git-github`.

Commit format:

```text
<type>(<scope>): <JIRA-KEY> <short English message>
```

Ví dụ first Task:

```text
test(backend): PAC-646 add backend unit test setup
```

Workflow:

```text
Task/Bug branch → develop
```

Không:

- push trực tiếp `develop`;
- push trực tiếp `main`;
- tạo Story PR;
- tạo Epic PR;
- tự tạo replacement branch;
- merge `develop → main`;
- release production.

Sau merge:

```bash
git fetch origin
git log origin/develop --oneline -n 30
```

---

# 17. Jira and Bug Workflow

Jira do Project Owner quản lý.

AI không:

- đổi Jira status;
- comment Jira;
- tạo Jira Bug Key;
- dùng Jira connectivity làm implementation gate.

AI chỉ ghi:

```text
Recommended Jira status = DONE
```

Bug ngoài Task scope:

```text
Bug Candidate:
Severity:
Affected Task/Story/Epic:
Actual:
Expected:
Evidence:
Suggested fix scope:
```

Chỉ sửa qua exact Bug branch sau khi Project Owner cung cấp Jira Bug Key thật.

---

# 18. Báo Cáo Sau Mỗi Task

Chỉ báo hoàn thành khi PR đã merge và remote `develop` chứa thay đổi.

```text
✅ Hoàn thành [PAC-TASK-xxx] — [Task name]

Skills used:
- ...

Đã làm:
Tests:
Test isolation/cleanup:
Supabase/PostgreSQL:
Neo4j:
Demo reset impact:
CI:
Security review:
Branch:
Commit:
PR:
Merge SHA:
Local Quality Gate: PASS
Applicable CI checks: PASS/N/A
Recommended Jira status: DONE
Next Task:
```

Nếu bị chặn:

```text
📌 [PAC-TASK-xxx] chưa hoàn thành

Status:
Blocker:
Evidence:
Required owner action:
Next safe step:
```

---

# 19. Progress, Story and Epic Reviews

Cập nhật `sprint-10-progress.md` khi:

- Task PR merge;
- Task bị blocker;
- seed/reset/test/CI evidence thay đổi;
- Release Story Review hoàn tất;
- Core Epic Review hoàn tất;
- kết thúc phiên;
- Final Review hoàn tất.

Release Story Review:

```text
mọi direct Task đã merge
→ latest develop
→ Acceptance Review
→ PASS/FAIL
```

Release Stories:

```text
US-145
US-146
US-147
US-148
US-149
US-150
```

Không tạo Story PR.

Core Epic Reviews:

```text
PAC-EPIC-18 — Data Seed & Demo Reset Review
PAC-EPIC-19 — Testing & Release Readiness Review
PAC-EPIC-20 — DevOps & CI Review
PAC-EPIC-21 — Documentation & Traceability Review
```

Không tạo Epic PR.

---

# 20. Stop Conditions

Dừng khi:

- Authorization Gate chưa PASS.
- Exact branch không tồn tại.
- PostgreSQL/Supabase target không an toàn.
- Neo4j rebuild scope không an toàn.
- Demo reset guard chưa đủ.
- Migration/seed có nguy cơ mất dữ liệu.
- Destructive test có thể chạm shared target.
- CI workflow có nguy cơ dùng production/demo secrets.
- GitHub không cho tạo/merge PR.
- Required checks không PASS.
- Cần Jira Bug Key.
- Hết giới hạn phiên.
- Sprint 10 Final Review hoàn tất.

Cuối phiên:

1. Cập nhật `sprint-10-progress.md`.
2. Cập nhật `WORKING-CONTEXT.md`.
3. Ghi Task hiện tại và Task tiếp theo.
4. Ghi PR, merge SHA và evidence.
5. Không tuyên bố Sprint hoàn thành nếu Final Review chưa PASS.
6. Không merge `develop → main`.

---

# 21. Release Story Branch Registry

| Story | Jira Key | Summary | Points | Exact branch |
|---|---|---|---:|---|
| US-145 | PAC-185 | Curated MVP seed data | 5 | `story/PAC-185-us-145-curated-mvp-seed-data` |
| US-146 | PAC-186 | Demo users by role | 3 | `story/PAC-186-us-146-demo-users-by-role` |
| US-147 | PAC-187 | Dynamic expiry dates for demo | 3 | `story/PAC-187-us-147-dynamic-expiry-dates-for-demo` |
| US-148 | PAC-188 | FEFO multi-batch demo scenario | 5 | `story/PAC-188-us-148-fefo-multi-batch-demo-scenario` |
| US-149 | PAC-189 | Seed PAID order with HIGH alert | 5 | `story/PAC-189-us-149-seed-paid-order-with-high-alert` |
| US-150 | PAC-190 | Local-only demo reset with graph rebuild and smoke test | 5 | `story/PAC-190-us-150-local-only-demo-reset-with-graph-rebuild-and-smoke-te` |

# 22. Core Epic Branch Registry

| Epic | Jira Key | Exact branch |
|---|---|---|
| PAC-EPIC-18 | PAC-18 | `epic/PAC-18-epic-18-data-seed-demo-reset` |
| PAC-EPIC-19 | PAC-19 | `epic/PAC-19-epic-19-testing-smoke-test-release-readiness` |
| PAC-EPIC-20 | PAC-20 | `epic/PAC-20-epic-20-devops-ci-setup` |
| PAC-EPIC-21 | PAC-21 | `epic/PAC-21-epic-21-documentation-traceability` |

# 23. Exact Task Branch Registry

| Logical Task | Jira Key | Summary | Exact branch |
|---|---|---|---|
| PAC-TASK-425 | PAC-635 | Create curated MVP seed dataset | `feature/PAC-635-task-425-create-curated-mvp-seed-dataset` |
| PAC-TASK-426 | PAC-636 | Seed demo users by role | `feature/PAC-636-task-426-seed-demo-users-by-role` |
| PAC-TASK-427 | PAC-637 | Seed first-login demo account | `feature/PAC-637-task-427-seed-first-login-demo-account` |
| PAC-TASK-428 | PAC-638 | Generate dynamic expiry dates for demo batches | `feature/PAC-638-task-428-generate-dynamic-expiry-dates-for-demo-batches` |
| PAC-TASK-429 | PAC-639 | Seed FEFO multi-batch demo scenario | `feature/PAC-639-task-429-seed-fefo-multi-batch-demo-scenario` |
| PAC-TASK-430 | PAC-640 | Seed expired batch excluded from sellable stock | `feature/PAC-640-task-430-seed-expired-batch-excluded-from-sellable-stock` |
| PAC-TASK-431 | PAC-641 | Seed PAID order with handled HIGH alert | `feature/PAC-641-task-431-seed-paid-order-with-handled-high-alert` |
| PAC-TASK-432 | PAC-642 | Seed report data with PAID, DRAFT, CANCELLED and failed-payment cases | `feature/PAC-642-task-432-seed-report-data-with-paid-draft-cancelled-and-fail` |
| PAC-TASK-433 | PAC-643 | Implement demo:reset local-only environment guard | `feature/PAC-643-task-433-implement-demo-reset-local-only-environment-guard` |
| PAC-TASK-434 | PAC-644 | Rebuild Neo4j projection during demo reset | `feature/PAC-644-task-434-rebuild-neo4j-projection-during-demo-reset` |
| PAC-TASK-435 | PAC-645 | Run smoke tests after demo reset | `test/PAC-645-task-435-run-smoke-tests-after-demo-reset` |
| PAC-TASK-436 | PAC-646 | Add backend unit test setup | `test/PAC-646-task-436-add-backend-unit-test-setup` |
| PAC-TASK-437 | PAC-647 | Add backend integration test setup with isolated cleanup | `test/PAC-647-task-437-add-backend-integration-test-setup-with-isolated-cl` |
| PAC-TASK-438 | PAC-648 | Add frontend component test setup | `test/PAC-648-task-438-add-frontend-component-test-setup` |
| PAC-TASK-439 | PAC-649 | Add Playwright E2E test setup for Chrome desktop | `test/PAC-649-task-439-add-playwright-e2e-test-setup-for-chrome-desktop` |
| PAC-TASK-440 | PAC-650 | Add Postman manual API collection structure | `feature/PAC-650-task-440-add-postman-manual-api-collection-structure` |
| PAC-TASK-441 | PAC-651 | Add Auth and RBAC test suite | `test/PAC-651-task-441-add-auth-and-rbac-test-suite` |
| PAC-TASK-442 | PAC-652 | Add User Management permission tests | `test/PAC-652-task-442-add-user-management-permission-tests` |
| PAC-TASK-443 | PAC-653 | Add Medicine Management API tests | `test/PAC-653-task-443-add-medicine-management-api-tests` |
| PAC-TASK-444 | PAC-654 | Add ActiveIngredient mapping tests | `test/PAC-654-task-444-add-activeingredient-mapping-tests` |
| PAC-TASK-445 | PAC-655 | Add Supplier Management API tests | `test/PAC-655-task-445-add-supplier-management-api-tests` |
| PAC-TASK-446 | PAC-656 | Add MedicineBatch source-of-truth tests | `test/PAC-656-task-446-add-medicinebatch-source-of-truth-tests` |
| PAC-TASK-447 | PAC-657 | Add sellable quantity and expired batch tests | `test/PAC-657-task-447-add-sellable-quantity-and-expired-batch-tests` |
| PAC-TASK-448 | PAC-658 | Add near-expiry threshold tests | `test/PAC-658-task-448-add-near-expiry-threshold-tests` |
| PAC-TASK-449 | PAC-659 | Add Stock Import transaction tests | `test/PAC-659-task-449-add-stock-import-transaction-tests` |
| PAC-TASK-450 | PAC-660 | Add Stock Import batch merge and expiry mismatch tests | `test/PAC-660-task-450-add-stock-import-batch-merge-and-expiry-mismatch-te` |
| PAC-TASK-451 | PAC-661 | Add Inventory Adjustment transaction tests | `test/PAC-661-task-451-add-inventory-adjustment-transaction-tests` |
| PAC-TASK-452 | PAC-662 | Add Inventory Adjustment audit and reason tests | `test/PAC-662-task-452-add-inventory-adjustment-audit-and-reason-tests` |
| PAC-TASK-453 | PAC-663 | Add POS Draft Order API tests | `test/PAC-663-task-453-add-pos-draft-order-api-tests` |
| PAC-TASK-454 | PAC-664 | Add POS Draft Order UI smoke tests | `test/PAC-664-task-454-add-pos-draft-order-ui-smoke-tests` |
| PAC-TASK-455 | PAC-665 | Add Staff order ownership tests | `test/PAC-665-task-455-add-staff-order-ownership-tests` |
| PAC-TASK-456 | PAC-666 | Add Draft Order cancel status tests | `test/PAC-666-task-456-add-draft-order-cancel-status-tests` |
| PAC-TASK-457 | PAC-667 | Add DrugInteraction Rule API tests | `test/PAC-667-task-457-add-druginteraction-rule-api-tests` |
| PAC-TASK-458 | PAC-668 | Add ActiveIngredient-derived interaction tests | `test/PAC-668-task-458-add-activeingredient-derived-interaction-tests` |
| PAC-TASK-459 | PAC-669 | Add InteractionAlert persistence tests | `test/PAC-669-task-459-add-interactionalert-persistence-tests` |
| PAC-TASK-460 | PAC-670 | Add InteractionAlert display_count tests | `test/PAC-670-task-460-add-interactionalert-display-count-tests` |
| PAC-TASK-461 | PAC-671 | Add HIGH alert acknowledgement tests | `test/PAC-671-task-461-add-high-alert-acknowledgement-tests` |
| PAC-TASK-462 | PAC-672 | Add HIGH alert consultation note tests | `test/PAC-672-task-462-add-high-alert-consultation-note-tests` |
| PAC-TASK-463 | PAC-673 | Add checkout blocker tests for unresolved HIGH alerts | `test/PAC-673-task-463-add-checkout-blocker-tests-for-unresolved-high-aler` |
| PAC-TASK-464 | PAC-674 | Add Checkout transaction success tests | `test/PAC-674-task-464-add-checkout-transaction-success-tests` |
| PAC-TASK-465 | PAC-675 | Add Checkout rollback failure tests | `test/PAC-675-task-465-add-checkout-rollback-failure-tests` |
| PAC-TASK-466 | PAC-676 | Add FEFO allocation unit tests | `test/PAC-676-task-466-add-fefo-allocation-unit-tests` |
| PAC-TASK-467 | PAC-677 | Add FEFO multi-batch allocation tests | `test/PAC-677-task-467-add-fefo-multi-batch-allocation-tests` |
| PAC-TASK-468 | PAC-678 | Add Checkout idempotency tests | `test/PAC-678-task-468-add-checkout-idempotency-tests` |
| PAC-TASK-469 | PAC-679 | Add Payment cash handling tests | `test/PAC-679-task-469-add-payment-cash-handling-tests` |
| PAC-TASK-470 | PAC-680 | Add Payment one SUCCESS rule tests | `test/PAC-680-task-470-add-payment-one-success-rule-tests` |
| PAC-TASK-471 | PAC-681 | Add Invoice generation tests | `test/PAC-681-task-471-add-invoice-generation-tests` |
| PAC-TASK-472 | PAC-682 | Add AI Guardrail high-risk test suite | `test/PAC-682-task-472-add-ai-guardrail-high-risk-test-suite` |
| PAC-TASK-473 | PAC-683 | Add AI Audit privacy tests | `test/PAC-683-task-473-add-ai-audit-privacy-tests` |
| PAC-TASK-474 | PAC-684 | Add AI provider fallback tests | `test/PAC-684-task-474-add-ai-provider-fallback-tests` |
| PAC-TASK-475 | PAC-685 | Add Graph Sync outbox and retry tests | `test/PAC-685-task-475-add-graph-sync-outbox-and-retry-tests` |
| PAC-TASK-476 | PAC-686 | Add Neo4j projection tests | `test/PAC-686-task-476-add-neo4j-projection-tests` |
| PAC-TASK-477 | PAC-687 | Add Graph freshness tests | `test/PAC-687-task-477-add-graph-freshness-tests` |
| PAC-TASK-478 | PAC-688 | Add Graph-RAG fallback tests | `test/PAC-688-task-478-add-graph-rag-fallback-tests` |
| PAC-TASK-479 | PAC-689 | Add Reports deterministic calculation tests | `test/PAC-689-task-479-add-reports-deterministic-calculation-tests` |
| PAC-TASK-480 | PAC-690 | Add full MVP smoke test checklist | `test/PAC-690-task-480-add-full-mvp-smoke-test-checklist` |
| PAC-TASK-481 | PAC-691 | Configure local Node.js project setup guide | `feature/PAC-691-task-481-configure-local-node-js-project-setup-guide` |
| PAC-TASK-482 | PAC-692 | Configure frontend environment variables guide | `feature/PAC-692-task-482-configure-frontend-environment-variables-guide` |
| PAC-TASK-483 | PAC-693 | Configure backend environment variables guide | `feature/PAC-693-task-483-configure-backend-environment-variables-guide` |
| PAC-TASK-484 | PAC-694 | Configure Supabase project setup instructions | `feature/PAC-694-task-484-configure-supabase-project-setup-instructions` |
| PAC-TASK-485 | PAC-695 | Configure Neo4j AuraDB setup instructions | `feature/PAC-695-task-485-configure-neo4j-auradb-setup-instructions` |
| PAC-TASK-486 | PAC-696 | Configure Google AI API key setup instructions | `feature/PAC-696-task-486-configure-google-ai-api-key-setup-instructions` |
| PAC-TASK-487 | PAC-697 | Configure MockAI fallback setup instructions | `feature/PAC-697-task-487-configure-mockai-fallback-setup-instructions` |
| PAC-TASK-488 | PAC-698 | Add Prisma generate and migrate setup command | `feature/PAC-698-task-488-add-prisma-generate-and-migrate-setup-command` |
| PAC-TASK-489 | PAC-699 | Add seed command for curated MVP data | `feature/PAC-699-task-489-add-seed-command-for-curated-mvp-data` |
| PAC-TASK-490 | PAC-700 | Add graph projection rebuild command | `feature/PAC-700-task-490-add-graph-projection-rebuild-command` |
| PAC-TASK-491 | PAC-701 | Add demo reset command entrypoint | `feature/PAC-701-task-491-add-demo-reset-command-entrypoint` |
| PAC-TASK-492 | PAC-702 | Add demo reset environment safety checks | `feature/PAC-702-task-492-add-demo-reset-environment-safety-checks` |
| PAC-TASK-493 | PAC-703 | Configure GitHub Actions lint check | `feature/PAC-703-task-493-configure-github-actions-lint-check` |
| PAC-TASK-494 | PAC-704 | Configure GitHub Actions type check | `feature/PAC-704-task-494-configure-github-actions-type-check` |
| PAC-TASK-495 | PAC-705 | Configure GitHub Actions frontend build | `feature/PAC-705-task-495-configure-github-actions-frontend-build` |
| PAC-TASK-496 | PAC-706 | Configure GitHub Actions backend build | `feature/PAC-706-task-496-configure-github-actions-backend-build` |
| PAC-TASK-497 | PAC-707 | Configure GitHub Actions unit test check | `test/PAC-707-task-497-configure-github-actions-unit-test-check` |
| PAC-TASK-498 | PAC-708 | Configure GitHub Actions integration test check | `test/PAC-708-task-498-configure-github-actions-integration-test-check` |
| PAC-TASK-499 | PAC-709 | Configure Prisma schema validation check | `feature/PAC-709-task-499-configure-prisma-schema-validation-check` |
| PAC-TASK-500 | PAC-710 | Configure Prisma migration check | `feature/PAC-710-task-500-configure-prisma-migration-check` |
| PAC-TASK-501 | PAC-711 | Add CI guard to prevent destructive tests against demo database | `test/PAC-711-task-501-add-ci-guard-to-prevent-destructive-tests-against-d` |
| PAC-TASK-502 | PAC-712 | Add CI branch protection expectation notes | `feature/PAC-712-task-502-add-ci-branch-protection-expectation-notes` |
| PAC-TASK-503 | PAC-713 | Add local-only guard for demo:reset script | `feature/PAC-713-task-503-add-local-only-guard-for-demo-reset-script` |
| PAC-TASK-504 | PAC-714 | Add Chrome desktop target verification checklist | `feature/PAC-714-task-504-add-chrome-desktop-target-verification-checklist` |
| PAC-TASK-505 | PAC-715 | Add basic responsive verification checklist | `feature/PAC-715-task-505-add-basic-responsive-verification-checklist` |
| PAC-TASK-506 | PAC-716 | Write project README setup section | `docs/PAC-716-task-506-write-project-readme-setup-section` |
| PAC-TASK-507 | PAC-717 | Write backend setup and run instructions | `feature/PAC-717-task-507-write-backend-setup-and-run-instructions` |
| PAC-TASK-508 | PAC-718 | Write frontend setup and run instructions | `feature/PAC-718-task-508-write-frontend-setup-and-run-instructions` |
| PAC-TASK-509 | PAC-719 | Write database migration and seed instructions | `feature/PAC-719-task-509-write-database-migration-and-seed-instructions` |
| PAC-TASK-510 | PAC-720 | Write Supabase Auth setup notes | `feature/PAC-720-task-510-write-supabase-auth-setup-notes` |
| PAC-TASK-511 | PAC-721 | Write Neo4j setup and graph rebuild notes | `feature/PAC-721-task-511-write-neo4j-setup-and-graph-rebuild-notes` |
| PAC-TASK-512 | PAC-722 | Write AI provider and MockAI fallback setup notes | `feature/PAC-722-task-512-write-ai-provider-and-mockai-fallback-setup-notes` |
| PAC-TASK-513 | PAC-723 | Write demo account guide | `feature/PAC-723-task-513-write-demo-account-guide` |
| PAC-TASK-514 | PAC-724 | Write demo scenario script for login and role switching | `feature/PAC-724-task-514-write-demo-scenario-script-for-login-and-role-switc` |
| PAC-TASK-515 | PAC-725 | Write demo scenario script for Stock Import and MedicineBatch | `feature/PAC-725-task-515-write-demo-scenario-script-for-stock-import-and-med` |
| PAC-TASK-516 | PAC-726 | Write demo scenario script for POS and Checkout | `feature/PAC-726-task-516-write-demo-scenario-script-for-pos-and-checkout` |
| PAC-TASK-517 | PAC-727 | Write demo scenario script for InteractionAlert and HIGH note | `feature/PAC-727-task-517-write-demo-scenario-script-for-interactionalert-and` |
| PAC-TASK-518 | PAC-728 | Write demo scenario script for AI Copilot and AI Audit | `feature/PAC-728-task-518-write-demo-scenario-script-for-ai-copilot-and-ai-au` |
| PAC-TASK-519 | PAC-729 | Write demo scenario script for Graph Sync and Graph-RAG | `feature/PAC-729-task-519-write-demo-scenario-script-for-graph-sync-and-graph` |
| PAC-TASK-520 | PAC-730 | Write demo scenario script for Reports and Settings | `feature/PAC-730-task-520-write-demo-scenario-script-for-reports-and-settings` |
| PAC-TASK-521 | PAC-731 | Write MVP traceability matrix summary | `feature/PAC-731-task-521-write-mvp-traceability-matrix-summary` |
| PAC-TASK-522 | PAC-732 | Write release/demo readiness checklist | `feature/PAC-732-task-522-write-release-demo-readiness-checklist` |
| PAC-TASK-523 | PAC-733 | Write known limitations and out-of-scope guard section | `feature/PAC-733-task-523-write-known-limitations-and-out-of-scope-guard-sect` |
| PAC-TASK-524 | PAC-734 | Prepare contingency evidence screenshots list | `feature/PAC-734-task-524-prepare-contingency-evidence-screenshots-list` |
| PAC-TASK-525 | PAC-735 | Prepare final smoke test report template | `test/PAC-735-task-525-prepare-final-smoke-test-report-template` |

---

# 24. Definition of Done

```text
101/101 Tasks verified
6/6 Release Story Reviews PASS
4/4 Core Epic Reviews PASS
111/111 canonical branches reconciled
All applicable PRs merged

Curated seed PASS
Dynamic expiry PASS
FEFO demo scenario PASS
Handled HIGH alert scenario PASS
Report-ready data PASS

demo:reset local guard PASS
Neo4j rebuild PASS
Graph freshness PASS
Smoke-after-reset PASS

Backend unit/integration setup PASS
Frontend component setup PASS
Playwright Chrome desktop PASS
Postman collection PASS
High-risk regression suites PASS
Full MVP smoke PASS
Basic responsive verification PASS

GitHub Actions configured
Required CI checks PASS
CI destructive-test guard PASS
Local Quality Gate remains PASS

Setup commands verified
Documentation matches repository
Traceability PASS
Release checklist PASS
Known limitations PASS
Contingency evidence PASS
Final smoke template PASS

Blocking defects = 0
High defects = 0

Sprint 10 Final Review = PASS
Ready for MVP Release = Yes
```

---

# 25. Start Instruction

Thực hiện:

1. Đọc toàn bộ tài liệu bắt buộc.
2. Xác minh Sprint 9 Final Review PASS.
3. Xác minh Sprint 10 Audit PASS 20/20.
4. Xác minh latest `develop`.
5. Xác minh safe PostgreSQL/Supabase target.
6. Xác minh safe Neo4j scope.
7. Xác minh exact branch của first Task.
8. Chọn skills.
9. Bắt đầu `PAC-TASK-436 / PAC-646`.
10. Code, test, commit, push và PR vào `develop`.
11. Merge chỉ khi Local Quality Gate PASS.
12. Sau khi CI active, applicable CI checks cũng phải PASS.
13. Verify merge SHA.
14. Cập nhật progress.
15. Tiếp tục theo technical order.
16. Dừng trước `develop → main`.

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
