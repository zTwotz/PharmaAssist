# Sprint 10 — Demo Data, Testing, CI, Documentation & Release Readiness

> **PharmaAssist AI Intelligence**
>
> Repository path đề xuất:
>
> `work-context/sprint-10/sprint-10.md`

## Canonical Sources

1. `Jira/branch-on-jira.md` — Jira Key và exact branch.
2. `Jira/jira-mapping.md` — Logical Key ↔ Jira Key.
3. `Jira/2_Epic.md` — Epic baseline.
4. `Jira/3_Stories.md` — Story và Acceptance Criteria.
5. `Jira/4C_Task_List_MVP_AI_Graph_Report_Demo_291_435.md`.
6. `Jira/4D_Task_List_Testing_Advanced_Future_436_580.md`.
7. `Jira/4C_Task_Description_MVP_AI_Graph_Report_Demo_291_435.md`.
8. `Jira/4D_Task_Description_Testing_Advanced_Future_436_580.md`.
9. `Jira/5_Sprint.md`.
10. Sprint 1 → Sprint 9 Final Review reports.
11. Current repository, Prisma schema, migrations, test scripts và GitHub state.

Quy tắc:

- `Jira/branch-on-jira.md` là nguồn duy nhất cho exact branch.
- Không đổi, rút gọn hoặc tự tạo branch thay thế.
- Task/Bug PR target `develop`.
- Không tạo Story PR hoặc Epic PR.
- Chỉ Project Owner merge `develop → main`.
- PostgreSQL tiếp tục là source of truth.
- Neo4j là read projection.
- AI và Graph chỉ hỗ trợ; không thay thế nghiệp vụ deterministic.
- Không chạy destructive tests trên demo/staging/production database.
- Docker không phải official setup path.
- Chrome desktop là browser mục tiêu chính.
- Screenshots/video không thay thế running product.

> Trạng thái chuẩn bị:
>
> ```text
> Sprint 10 = Prepared
> Sprint 9 = In progress
> Sprint 9 Final Review = Pending
> Sprint 10 Audit = Pending
> Ready to implement Sprint 10 = No
> ```

---

# 1. Sprint Overview

| Mục | Nội dung |
|---|---|
| Sprint | Sprint 10 |
| Tên | Demo Data, Demo Reset, Testing, CI, Setup, Documentation & Release Readiness |
| Scope | MVP Release |
| Core Epics | PAC-EPIC-18, PAC-EPIC-19, PAC-EPIC-20, PAC-EPIC-21 |
| Release Stories | US-145 → US-150 |
| Số Release Story | 6 |
| Release Story Points | 26 |
| Tasks | PAC-TASK-425 → PAC-TASK-525 |
| Số Task | 101 |
| Task Jira Keys | PAC-635 → PAC-735 |
| Branch inventory | 111 = 101 Task + 6 Release Story + 4 Core Epic |
| Cross-sprint regression references | 37 prior Stories |
| Initial CI state | N/A — GitHub Actions chưa được cấu hình |
| Final CI expectation | GitHub Actions configured and green |
| Primary merge gate | Local Quality Gate |
| Final release gate | Local Quality Gate + applicable CI checks |
| Official setup | Local Node.js/Next.js/NestJS/Prisma + cloud Supabase/Neo4j |
| Browser target | Chrome desktop; basic responsive verification |
| Jira management | Manual by Project Owner |

Task distribution:

| Epic | Số Task |
|---|---:|
| PAC-EPIC-18 — Data Seed & Demo Reset | 11 |
| PAC-EPIC-19 — Testing, Smoke Test & Release Readiness | 45 |
| PAC-EPIC-20 — DevOps, CI & Setup | 25 |
| PAC-EPIC-21 — Documentation & Traceability | 20 |
| **Tổng** | **101** |

> Các Task `PAC-TASK-441 → PAC-TASK-479` tham chiếu lại 37 Story từ Sprint 1–9 để kiểm thử hồi quy. Những Story này không bị mở lại và không được cộng vào 6 Release Story của Sprint 10.

Cross-sprint Story references:

```text
US-01, US-10, US-13, US-19, US-23, US-27, US-32, US-35, US-44, US-45, US-52, US-55, US-57, US-65, US-67, US-69, US-72, US-74, US-76, US-78, US-79, US-80, US-83, US-88, US-91, US-92, US-93, US-96, US-97, US-104, US-105, US-114, US-117, US-119, US-127, US-132, US-137
```

# 2. Sprint Goal

Hoàn thiện khả năng dựng lại môi trường demo, kiểm chứng toàn bộ MVP và đóng gói bằng chứng release:

```text
curated deterministic seed
→ local-only demo reset
→ Neo4j projection rebuild
→ high-risk regression suites
→ full MVP smoke test
→ setup and operational commands
→ GitHub Actions
→ documentation and release readiness
```

Sprint 10 là release-hardening sprint. Không mở rộng thêm nghiệp vụ mới.

# 3. Implementation Authorization Gate

Chỉ bắt đầu code Sprint 10 khi:

```text
Sprint 9 Final Review = PASS
Ready for Sprint 10 = Yes
Latest develop = Stable

Sprint 10 Audit = PASS
Mandatory Gates = All PASS
Ready to implement Sprint 10 = Yes

101/101 exact Task branches = Verified
6/6 Release Story branches = Verified
4/4 Core Epic branches = Verified

Safe PostgreSQL/Supabase test strategy = Approved
Safe Neo4j strategy = Approved
Demo reset guard design = Approved
Testing scripts baseline = Verified
GitHub access = Verified
Blocking findings = 0
High findings = 0
```

Nếu thiếu một gate:

- Không triển khai Sprint 10 production/release code.
- Không chạy `demo:reset`.
- Không apply destructive migration hoặc seed.
- Không cấu hình workflow bằng giả định.
- Không tự tạo branch thay thế.
- Ghi blocker trong Sprint 10 Audit.

# 4. Mandatory Dependencies

## 4.1 Sprint 1 → Sprint 9

Tất cả MVP capability phải ổn định:

- Auth/RBAC và user management.
- Medicine/ActiveIngredient/Supplier.
- MedicineBatch, Stock Import và Inventory Adjustment.
- POS Draft Order.
- DrugInteraction Rules và InteractionAlert.
- HIGH acknowledgement và consultation note.
- Checkout, FEFO, Payment và Invoice.
- AI provider, guardrails, prompt versioning và AI Audit.
- Graph Sync, Neo4j projection và freshness.
- Graph-RAG, PostgreSQL fallback, Reports và System Settings.

## 4.2 Release baseline

- PostgreSQL là source of truth.
- Demo data phải deterministic và có thể reset.
- Graph rebuild phải tạo lại projection từ PostgreSQL.
- Demo reset chỉ được chạy trong local-safe environment.
- High-risk tests không được phá demo database.
- CI không thay thế Local Quality Gate.
- Release evidence phải phản ánh running product thật.

# 5. Business Rules and Invariants

## 5.1 Curated demo data

Seed phải có:

- Admin, Staff và Warehouse demo users.
- First-login account.
- Medicines và normalized ActiveIngredients.
- Suppliers.
- Multiple MedicineBatch records.
- Expired, near-expiry và sellable batches.
- FEFO multi-batch allocation scenario.
- DrugInteraction Rules LOW/MEDIUM/HIGH.
- PAID order với handled HIGH alert.
- DRAFT và CANCELLED orders.
- Failed payment attempt.
- Report-ready deterministic data.
- AI/Graph-ready entities.

Không dùng dữ liệu mơ hồ khiến demo kết quả thay đổi ngẫu nhiên.

## 5.2 Dynamic expiry dates

- Expiry dates được tính tương đối theo ngày chạy seed/reset.
- Luôn có expired batch.
- Luôn có near-expiry batch theo current threshold.
- Luôn có normal sellable batch.
- Không phụ thuộc ngày cố định đã hết hiệu lực.

## 5.3 Demo reset

- Chỉ chạy local-safe environment.
- Phải fail closed khi environment không an toàn.
- Reset PostgreSQL theo controlled strategy.
- Seed curated data.
- Rebuild Neo4j projection từ PostgreSQL.
- Chạy smoke tests sau reset.
- Không chạy trên demo/staging/production.
- Không chứa credentials trong output.
- Không dùng destructive global cleanup ngoài safe scope đã được phê duyệt.

## 5.4 Testing isolation

Dự án không bắt buộc provisioning một PostgreSQL database riêng cho automated tests.

Do đó:

- Integration tests phải có strict isolation và cleanup.
- Không chạy destructive tests trên demo database.
- Ưu tiên local non-demo environment hoặc test schema/config khi khả thi.
- Cleanup phải giới hạn đúng dữ liệu test.
- Không dùng `reset all` tùy tiện.
- Test failures không được để lại dirty state.

## 5.5 Testing coverage

Không có global mandatory coverage percentage cho toàn bộ codebase.

Bắt buộc ưu tiên high-risk modules:

- Auth/RBAC.
- MedicineBatch source of truth.
- Stock Import.
- Inventory Adjustment.
- InteractionAlert/HIGH handling.
- Checkout/FEFO/idempotency/rollback.
- Payment/Invoice.
- AI Guardrail/Audit.
- Graph Sync/Graph-RAG fallback.
- Reports deterministic calculations.
- Demo reset safety.

## 5.6 CI transition

Trước `PAC-TASK-493`:

```text
CI = N/A — GitHub Actions chưa được cấu hình
Quality Gate = Local Quality Gate
```

Sau khi workflow CI được cấu hình và merge:

```text
Local Quality Gate = vẫn bắt buộc
Applicable GitHub Actions checks = phải PASS
```

Sprint Final Review phải kiểm chứng CI thật, không chỉ workflow YAML tồn tại.

## 5.7 Setup baseline

Official setup:

```text
local Node.js
Next.js
NestJS
Prisma
cloud Supabase
Neo4j AuraDB
Google AI hoặc MockAI fallback
```

Docker chỉ là optional alternative, không phải official path.

## 5.8 Browser baseline

- Chrome desktop là MVP target.
- Basic responsive checks bắt buộc.
- Full cross-browser matrix ngoài MVP.
- Playwright target Chrome desktop.

# 6. Scope

## In scope

- Curated MVP seed.
- Demo users và first-login account.
- Dynamic expiry dates.
- FEFO multi-batch scenario.
- PAID/HIGH-alert scenario.
- Report-ready data.
- Local-only demo reset.
- Graph projection rebuild.
- Smoke tests after reset.
- Unit/integration/component/E2E/Postman test setup.
- High-risk regression suites.
- Full MVP smoke checklist.
- Local setup commands and environment guides.
- GitHub Actions lint/type/build/test/Prisma/migration checks.
- CI guard against destructive demo-database tests.
- README, setup, demo, traceability và release documentation.
- Known limitations.
- Contingency evidence list.
- Final smoke report template.

## Out of scope

- New business feature.
- Multi-store/multi-warehouse.
- Online commerce.
- Customer management expansion.
- Promotion/coupon.
- Shipping/delivery.
- Forecasting.
- Full cross-browser support.
- Docker as official setup.
- Screenshots/video as substitute for working demo.
- Production deployment automation.
- Destructive tests on shared environments.

# 7. Ownership and Tool Responsibilities

| Trách nhiệm | Owner |
|---|---|
| Jira status và Bug creation | Project Owner |
| Exact branch registry | `Jira/branch-on-jira.md` |
| Seed/reset implementation | Backend/Database owner |
| Test infrastructure and suites | Testing owner + module owners |
| GitHub Actions | DevOps owner |
| Setup and release docs | Documentation/Release owner |
| Task/Bug PR merge into `develop` | AI Coding Agent khi gate PASS |
| `develop → main` | Project Owner only |
| Supabase/Neo4j credentials | Project Owner-designated owner |
| Final release approval | Project Owner |

# 8. Quality Gates

## 8.1 Initial phase

```text
CI = N/A — GitHub Actions chưa được cấu hình
Quality Gate = Local Quality Gate
```

## 8.2 After CI activation

```text
Quality Gate =
Local Quality Gate
+ applicable GitHub Actions checks
```

Task PR chỉ merge khi:

1. Exact branch/Jira Key đúng.
2. Acceptance Criteria hoàn thành.
3. PR target `develop`.
4. Diff đúng scope.
5. Relevant lint/typecheck/tests/build PASS.
6. Prisma validate/generate PASS khi liên quan.
7. Controlled Supabase verification PASS hoặc N/A hợp lệ.
8. Controlled Neo4j verification PASS hoặc N/A hợp lệ.
9. Cleanup/isolation evidence hợp lệ.
10. Không secret.
11. Không destructive command ngoài safe guard.
12. Workflow YAML an toàn khi liên quan.
13. Không conflict.
14. GitHub mergeability PASS.
15. Applicable CI checks PASS sau khi CI được kích hoạt.

# 9. Recommended Technical Execution Order

## Phase 1 — Testing Foundation

```text
PAC-TASK-436
→ PAC-TASK-437
→ PAC-TASK-438
→ PAC-TASK-439
→ PAC-TASK-440
```

| Logical Task | Jira Key | Parent Story | Summary | Priority | Exact branch |
|---|---|---|---|---|---|
| PAC-TASK-436 | PAC-646 | US-150 | Add backend unit test setup | Highest | `test/PAC-646-task-436-add-backend-unit-test-setup` |
| PAC-TASK-437 | PAC-647 | US-150 | Add backend integration test setup with isolated cleanup | Highest | `test/PAC-647-task-437-add-backend-integration-test-setup-with-isolated-cl` |
| PAC-TASK-438 | PAC-648 | US-150 | Add frontend component test setup | High | `test/PAC-648-task-438-add-frontend-component-test-setup` |
| PAC-TASK-439 | PAC-649 | US-150 | Add Playwright E2E test setup for Chrome desktop | High | `test/PAC-649-task-439-add-playwright-e2e-test-setup-for-chrome-desktop` |
| PAC-TASK-440 | PAC-650 | US-150 | Add Postman manual API collection structure | Medium | `feature/PAC-650-task-440-add-postman-manual-api-collection-structure` |
## Phase 2 — Curated Demo Data

```text
PAC-TASK-425
→ PAC-TASK-426
→ PAC-TASK-427
→ PAC-TASK-428
→ PAC-TASK-429
→ PAC-TASK-430
→ PAC-TASK-431
→ PAC-TASK-432
```

| Logical Task | Jira Key | Parent Story | Summary | Priority | Exact branch |
|---|---|---|---|---|---|
| PAC-TASK-425 | PAC-635 | US-145 | Create curated MVP seed dataset | High | `feature/PAC-635-task-425-create-curated-mvp-seed-dataset` |
| PAC-TASK-426 | PAC-636 | US-146 | Seed demo users by role | High | `feature/PAC-636-task-426-seed-demo-users-by-role` |
| PAC-TASK-427 | PAC-637 | US-146 | Seed first-login demo account | Medium | `feature/PAC-637-task-427-seed-first-login-demo-account` |
| PAC-TASK-428 | PAC-638 | US-147 | Generate dynamic expiry dates for demo batches | High | `feature/PAC-638-task-428-generate-dynamic-expiry-dates-for-demo-batches` |
| PAC-TASK-429 | PAC-639 | US-148 | Seed FEFO multi-batch demo scenario | Highest | `feature/PAC-639-task-429-seed-fefo-multi-batch-demo-scenario` |
| PAC-TASK-430 | PAC-640 | US-148 | Seed expired batch excluded from sellable stock | High | `feature/PAC-640-task-430-seed-expired-batch-excluded-from-sellable-stock` |
| PAC-TASK-431 | PAC-641 | US-149 | Seed PAID order with handled HIGH alert | Highest | `feature/PAC-641-task-431-seed-paid-order-with-handled-high-alert` |
| PAC-TASK-432 | PAC-642 | US-145 | Seed report data with PAID, DRAFT, CANCELLED and failed-payment cases | High | `feature/PAC-642-task-432-seed-report-data-with-paid-draft-cancelled-and-fail` |
## Phase 3 — Local Demo Reset and Graph Rebuild

```text
PAC-TASK-433
→ PAC-TASK-434
```

| Logical Task | Jira Key | Parent Story | Summary | Priority | Exact branch |
|---|---|---|---|---|---|
| PAC-TASK-433 | PAC-643 | US-150 | Implement demo:reset local-only environment guard | Highest | `feature/PAC-643-task-433-implement-demo-reset-local-only-environment-guard` |
| PAC-TASK-434 | PAC-644 | US-150 | Rebuild Neo4j projection during demo reset | High | `feature/PAC-644-task-434-rebuild-neo4j-projection-during-demo-reset` |
## Phase 4 — High-risk and Cross-sprint Regression Testing

```text
PAC-TASK-441
→ PAC-TASK-442
→ PAC-TASK-443
→ PAC-TASK-444
→ PAC-TASK-445
→ PAC-TASK-446
→ PAC-TASK-447
→ PAC-TASK-448
→ PAC-TASK-449
→ PAC-TASK-450
→ PAC-TASK-451
→ PAC-TASK-452
→ PAC-TASK-453
→ PAC-TASK-454
→ PAC-TASK-455
→ PAC-TASK-456
→ PAC-TASK-457
→ PAC-TASK-458
→ PAC-TASK-459
→ PAC-TASK-460
→ PAC-TASK-461
→ PAC-TASK-462
→ PAC-TASK-463
→ PAC-TASK-464
→ PAC-TASK-465
→ PAC-TASK-466
→ PAC-TASK-467
→ PAC-TASK-468
→ PAC-TASK-469
→ PAC-TASK-470
→ PAC-TASK-471
→ PAC-TASK-472
→ PAC-TASK-473
→ PAC-TASK-474
→ PAC-TASK-475
→ PAC-TASK-476
→ PAC-TASK-477
→ PAC-TASK-478
→ PAC-TASK-479
```

| Logical Task | Jira Key | Parent Story | Summary | Priority | Exact branch |
|---|---|---|---|---|---|
| PAC-TASK-441 | PAC-651 | US-01 | Add Auth and RBAC test suite | Highest | `test/PAC-651-task-441-add-auth-and-rbac-test-suite` |
| PAC-TASK-442 | PAC-652 | US-10 | Add User Management permission tests | High | `test/PAC-652-task-442-add-user-management-permission-tests` |
| PAC-TASK-443 | PAC-653 | US-13 | Add Medicine Management API tests | High | `test/PAC-653-task-443-add-medicine-management-api-tests` |
| PAC-TASK-444 | PAC-654 | US-19 | Add ActiveIngredient mapping tests | High | `test/PAC-654-task-444-add-activeingredient-mapping-tests` |
| PAC-TASK-445 | PAC-655 | US-23 | Add Supplier Management API tests | Medium | `test/PAC-655-task-445-add-supplier-management-api-tests` |
| PAC-TASK-446 | PAC-656 | US-27 | Add MedicineBatch source-of-truth tests | Highest | `test/PAC-656-task-446-add-medicinebatch-source-of-truth-tests` |
| PAC-TASK-447 | PAC-657 | US-32 | Add sellable quantity and expired batch tests | Highest | `test/PAC-657-task-447-add-sellable-quantity-and-expired-batch-tests` |
| PAC-TASK-448 | PAC-658 | US-35 | Add near-expiry threshold tests | High | `test/PAC-658-task-448-add-near-expiry-threshold-tests` |
| PAC-TASK-449 | PAC-659 | US-44 | Add Stock Import transaction tests | Highest | `test/PAC-659-task-449-add-stock-import-transaction-tests` |
| PAC-TASK-450 | PAC-660 | US-45 | Add Stock Import batch merge and expiry mismatch tests | Highest | `test/PAC-660-task-450-add-stock-import-batch-merge-and-expiry-mismatch-te` |
| PAC-TASK-451 | PAC-661 | US-52 | Add Inventory Adjustment transaction tests | Highest | `test/PAC-661-task-451-add-inventory-adjustment-transaction-tests` |
| PAC-TASK-452 | PAC-662 | US-55 | Add Inventory Adjustment audit and reason tests | High | `test/PAC-662-task-452-add-inventory-adjustment-audit-and-reason-tests` |
| PAC-TASK-453 | PAC-663 | US-57 | Add POS Draft Order API tests | Highest | `test/PAC-663-task-453-add-pos-draft-order-api-tests` |
| PAC-TASK-454 | PAC-664 | US-57 | Add POS Draft Order UI smoke tests | High | `test/PAC-664-task-454-add-pos-draft-order-ui-smoke-tests` |
| PAC-TASK-455 | PAC-665 | US-65 | Add Staff order ownership tests | Highest | `test/PAC-665-task-455-add-staff-order-ownership-tests` |
| PAC-TASK-456 | PAC-666 | US-67 | Add Draft Order cancel status tests | High | `test/PAC-666-task-456-add-draft-order-cancel-status-tests` |
| PAC-TASK-457 | PAC-667 | US-69 | Add DrugInteraction Rule API tests | High | `test/PAC-667-task-457-add-druginteraction-rule-api-tests` |
| PAC-TASK-458 | PAC-668 | US-72 | Add ActiveIngredient-derived interaction tests | Highest | `test/PAC-668-task-458-add-activeingredient-derived-interaction-tests` |
| PAC-TASK-459 | PAC-669 | US-74 | Add InteractionAlert persistence tests | Highest | `test/PAC-669-task-459-add-interactionalert-persistence-tests` |
| PAC-TASK-460 | PAC-670 | US-76 | Add InteractionAlert display_count tests | High | `test/PAC-670-task-460-add-interactionalert-display-count-tests` |
| PAC-TASK-461 | PAC-671 | US-78 | Add HIGH alert acknowledgement tests | Highest | `test/PAC-671-task-461-add-high-alert-acknowledgement-tests` |
| PAC-TASK-462 | PAC-672 | US-79 | Add HIGH alert consultation note tests | Highest | `test/PAC-672-task-462-add-high-alert-consultation-note-tests` |
| PAC-TASK-463 | PAC-673 | US-80 | Add checkout blocker tests for unresolved HIGH alerts | Highest | `test/PAC-673-task-463-add-checkout-blocker-tests-for-unresolved-high-aler` |
| PAC-TASK-464 | PAC-674 | US-83 | Add Checkout transaction success tests | Highest | `test/PAC-674-task-464-add-checkout-transaction-success-tests` |
| PAC-TASK-465 | PAC-675 | US-92 | Add Checkout rollback failure tests | Highest | `test/PAC-675-task-465-add-checkout-rollback-failure-tests` |
| PAC-TASK-466 | PAC-676 | US-88 | Add FEFO allocation unit tests | Highest | `test/PAC-676-task-466-add-fefo-allocation-unit-tests` |
| PAC-TASK-467 | PAC-677 | US-88 | Add FEFO multi-batch allocation tests | Highest | `test/PAC-677-task-467-add-fefo-multi-batch-allocation-tests` |
| PAC-TASK-468 | PAC-678 | US-91 | Add Checkout idempotency tests | Highest | `test/PAC-678-task-468-add-checkout-idempotency-tests` |
| PAC-TASK-469 | PAC-679 | US-93 | Add Payment cash handling tests | High | `test/PAC-679-task-469-add-payment-cash-handling-tests` |
| PAC-TASK-470 | PAC-680 | US-96 | Add Payment one SUCCESS rule tests | Highest | `test/PAC-680-task-470-add-payment-one-success-rule-tests` |
| PAC-TASK-471 | PAC-681 | US-97 | Add Invoice generation tests | High | `test/PAC-681-task-471-add-invoice-generation-tests` |
| PAC-TASK-472 | PAC-682 | US-105 | Add AI Guardrail high-risk test suite | Highest | `test/PAC-682-task-472-add-ai-guardrail-high-risk-test-suite` |
| PAC-TASK-473 | PAC-683 | US-114 | Add AI Audit privacy tests | Highest | `test/PAC-683-task-473-add-ai-audit-privacy-tests` |
| PAC-TASK-474 | PAC-684 | US-104 | Add AI provider fallback tests | High | `test/PAC-684-task-474-add-ai-provider-fallback-tests` |
| PAC-TASK-475 | PAC-685 | US-117 | Add Graph Sync outbox and retry tests | Highest | `test/PAC-685-task-475-add-graph-sync-outbox-and-retry-tests` |
| PAC-TASK-476 | PAC-686 | US-119 | Add Neo4j projection tests | High | `test/PAC-686-task-476-add-neo4j-projection-tests` |
| PAC-TASK-477 | PAC-687 | US-127 | Add Graph freshness tests | Highest | `test/PAC-687-task-477-add-graph-freshness-tests` |
| PAC-TASK-478 | PAC-688 | US-132 | Add Graph-RAG fallback tests | Highest | `test/PAC-688-task-478-add-graph-rag-fallback-tests` |
| PAC-TASK-479 | PAC-689 | US-137 | Add Reports deterministic calculation tests | High | `test/PAC-689-task-479-add-reports-deterministic-calculation-tests` |
## Phase 5 — Full MVP Smoke after Reset

```text
PAC-TASK-480
→ PAC-TASK-435
```

| Logical Task | Jira Key | Parent Story | Summary | Priority | Exact branch |
|---|---|---|---|---|---|
| PAC-TASK-435 | PAC-645 | US-150 | Run smoke tests after demo reset | Highest | `test/PAC-645-task-435-run-smoke-tests-after-demo-reset` |
| PAC-TASK-480 | PAC-690 | US-150 | Add full MVP smoke test checklist | Highest | `test/PAC-690-task-480-add-full-mvp-smoke-test-checklist` |
## Phase 6 — Local Setup and Operational Commands

```text
PAC-TASK-481
→ PAC-TASK-482
→ PAC-TASK-483
→ PAC-TASK-484
→ PAC-TASK-485
→ PAC-TASK-486
→ PAC-TASK-487
→ PAC-TASK-488
→ PAC-TASK-489
→ PAC-TASK-490
→ PAC-TASK-491
→ PAC-TASK-492
```

| Logical Task | Jira Key | Parent Story | Summary | Priority | Exact branch |
|---|---|---|---|---|---|
| PAC-TASK-481 | PAC-691 | US-150 | Configure local Node.js project setup guide | High | `feature/PAC-691-task-481-configure-local-node-js-project-setup-guide` |
| PAC-TASK-482 | PAC-692 | US-150 | Configure frontend environment variables guide | High | `feature/PAC-692-task-482-configure-frontend-environment-variables-guide` |
| PAC-TASK-483 | PAC-693 | US-150 | Configure backend environment variables guide | High | `feature/PAC-693-task-483-configure-backend-environment-variables-guide` |
| PAC-TASK-484 | PAC-694 | US-150 | Configure Supabase project setup instructions | High | `feature/PAC-694-task-484-configure-supabase-project-setup-instructions` |
| PAC-TASK-485 | PAC-695 | US-150 | Configure Neo4j AuraDB setup instructions | High | `feature/PAC-695-task-485-configure-neo4j-auradb-setup-instructions` |
| PAC-TASK-486 | PAC-696 | US-142 | Configure Google AI API key setup instructions | High | `feature/PAC-696-task-486-configure-google-ai-api-key-setup-instructions` |
| PAC-TASK-487 | PAC-697 | US-104 | Configure MockAI fallback setup instructions | Medium | `feature/PAC-697-task-487-configure-mockai-fallback-setup-instructions` |
| PAC-TASK-488 | PAC-698 | US-150 | Add Prisma generate and migrate setup command | High | `feature/PAC-698-task-488-add-prisma-generate-and-migrate-setup-command` |
| PAC-TASK-489 | PAC-699 | US-145 | Add seed command for curated MVP data | High | `feature/PAC-699-task-489-add-seed-command-for-curated-mvp-data` |
| PAC-TASK-490 | PAC-700 | US-150 | Add graph projection rebuild command | High | `feature/PAC-700-task-490-add-graph-projection-rebuild-command` |
| PAC-TASK-491 | PAC-701 | US-150 | Add demo reset command entrypoint | Highest | `feature/PAC-701-task-491-add-demo-reset-command-entrypoint` |
| PAC-TASK-492 | PAC-702 | US-150 | Add demo reset environment safety checks | Highest | `feature/PAC-702-task-492-add-demo-reset-environment-safety-checks` |
## Phase 7 — GitHub Actions and CI Safety

```text
PAC-TASK-493
→ PAC-TASK-494
→ PAC-TASK-495
→ PAC-TASK-496
→ PAC-TASK-497
→ PAC-TASK-498
→ PAC-TASK-499
→ PAC-TASK-500
→ PAC-TASK-501
→ PAC-TASK-502
→ PAC-TASK-503
→ PAC-TASK-504
→ PAC-TASK-505
```

| Logical Task | Jira Key | Parent Story | Summary | Priority | Exact branch |
|---|---|---|---|---|---|
| PAC-TASK-493 | PAC-703 | US-150 | Configure GitHub Actions lint check | High | `feature/PAC-703-task-493-configure-github-actions-lint-check` |
| PAC-TASK-494 | PAC-704 | US-150 | Configure GitHub Actions type check | High | `feature/PAC-704-task-494-configure-github-actions-type-check` |
| PAC-TASK-495 | PAC-705 | US-150 | Configure GitHub Actions frontend build | High | `feature/PAC-705-task-495-configure-github-actions-frontend-build` |
| PAC-TASK-496 | PAC-706 | US-150 | Configure GitHub Actions backend build | High | `feature/PAC-706-task-496-configure-github-actions-backend-build` |
| PAC-TASK-497 | PAC-707 | US-150 | Configure GitHub Actions unit test check | High | `test/PAC-707-task-497-configure-github-actions-unit-test-check` |
| PAC-TASK-498 | PAC-708 | US-150 | Configure GitHub Actions integration test check | High | `test/PAC-708-task-498-configure-github-actions-integration-test-check` |
| PAC-TASK-499 | PAC-709 | US-150 | Configure Prisma schema validation check | High | `feature/PAC-709-task-499-configure-prisma-schema-validation-check` |
| PAC-TASK-500 | PAC-710 | US-150 | Configure Prisma migration check | High | `feature/PAC-710-task-500-configure-prisma-migration-check` |
| PAC-TASK-501 | PAC-711 | US-150 | Add CI guard to prevent destructive tests against demo database | Highest | `test/PAC-711-task-501-add-ci-guard-to-prevent-destructive-tests-against-d` |
| PAC-TASK-502 | PAC-712 | US-150 | Add CI branch protection expectation notes | Medium | `feature/PAC-712-task-502-add-ci-branch-protection-expectation-notes` |
| PAC-TASK-503 | PAC-713 | US-150 | Add local-only guard for demo:reset script | Highest | `feature/PAC-713-task-503-add-local-only-guard-for-demo-reset-script` |
| PAC-TASK-504 | PAC-714 | US-150 | Add Chrome desktop target verification checklist | Medium | `feature/PAC-714-task-504-add-chrome-desktop-target-verification-checklist` |
| PAC-TASK-505 | PAC-715 | US-150 | Add basic responsive verification checklist | Low | `feature/PAC-715-task-505-add-basic-responsive-verification-checklist` |
## Phase 8 — Documentation and Release Readiness

```text
PAC-TASK-506
→ PAC-TASK-507
→ PAC-TASK-508
→ PAC-TASK-509
→ PAC-TASK-510
→ PAC-TASK-511
→ PAC-TASK-512
→ PAC-TASK-513
→ PAC-TASK-514
→ PAC-TASK-515
→ PAC-TASK-516
→ PAC-TASK-517
→ PAC-TASK-518
→ PAC-TASK-519
→ PAC-TASK-520
→ PAC-TASK-521
→ PAC-TASK-522
→ PAC-TASK-523
→ PAC-TASK-524
→ PAC-TASK-525
```

| Logical Task | Jira Key | Parent Story | Summary | Priority | Exact branch |
|---|---|---|---|---|---|
| PAC-TASK-506 | PAC-716 | US-150 | Write project README setup section | High | `docs/PAC-716-task-506-write-project-readme-setup-section` |
| PAC-TASK-507 | PAC-717 | US-150 | Write backend setup and run instructions | High | `feature/PAC-717-task-507-write-backend-setup-and-run-instructions` |
| PAC-TASK-508 | PAC-718 | US-150 | Write frontend setup and run instructions | High | `feature/PAC-718-task-508-write-frontend-setup-and-run-instructions` |
| PAC-TASK-509 | PAC-719 | US-150 | Write database migration and seed instructions | High | `feature/PAC-719-task-509-write-database-migration-and-seed-instructions` |
| PAC-TASK-510 | PAC-720 | US-150 | Write Supabase Auth setup notes | High | `feature/PAC-720-task-510-write-supabase-auth-setup-notes` |
| PAC-TASK-511 | PAC-721 | US-150 | Write Neo4j setup and graph rebuild notes | High | `feature/PAC-721-task-511-write-neo4j-setup-and-graph-rebuild-notes` |
| PAC-TASK-512 | PAC-722 | US-142 | Write AI provider and MockAI fallback setup notes | High | `feature/PAC-722-task-512-write-ai-provider-and-mockai-fallback-setup-notes` |
| PAC-TASK-513 | PAC-723 | US-146 | Write demo account guide | Medium | `feature/PAC-723-task-513-write-demo-account-guide` |
| PAC-TASK-514 | PAC-724 | US-150 | Write demo scenario script for login and role switching | Medium | `feature/PAC-724-task-514-write-demo-scenario-script-for-login-and-role-switc` |
| PAC-TASK-515 | PAC-725 | US-150 | Write demo scenario script for Stock Import and MedicineBatch | High | `feature/PAC-725-task-515-write-demo-scenario-script-for-stock-import-and-med` |
| PAC-TASK-516 | PAC-726 | US-150 | Write demo scenario script for POS and Checkout | Highest | `feature/PAC-726-task-516-write-demo-scenario-script-for-pos-and-checkout` |
| PAC-TASK-517 | PAC-727 | US-150 | Write demo scenario script for InteractionAlert and HIGH note | Highest | `feature/PAC-727-task-517-write-demo-scenario-script-for-interactionalert-and` |
| PAC-TASK-518 | PAC-728 | US-150 | Write demo scenario script for AI Copilot and AI Audit | High | `feature/PAC-728-task-518-write-demo-scenario-script-for-ai-copilot-and-ai-au` |
| PAC-TASK-519 | PAC-729 | US-150 | Write demo scenario script for Graph Sync and Graph-RAG | High | `feature/PAC-729-task-519-write-demo-scenario-script-for-graph-sync-and-graph` |
| PAC-TASK-520 | PAC-730 | US-150 | Write demo scenario script for Reports and Settings | Medium | `feature/PAC-730-task-520-write-demo-scenario-script-for-reports-and-settings` |
| PAC-TASK-521 | PAC-731 | US-150 | Write MVP traceability matrix summary | High | `feature/PAC-731-task-521-write-mvp-traceability-matrix-summary` |
| PAC-TASK-522 | PAC-732 | US-150 | Write release/demo readiness checklist | Highest | `feature/PAC-732-task-522-write-release-demo-readiness-checklist` |
| PAC-TASK-523 | PAC-733 | US-150 | Write known limitations and out-of-scope guard section | High | `feature/PAC-733-task-523-write-known-limitations-and-out-of-scope-guard-sect` |
| PAC-TASK-524 | PAC-734 | US-150 | Prepare contingency evidence screenshots list | Medium | `feature/PAC-734-task-524-prepare-contingency-evidence-screenshots-list` |
| PAC-TASK-525 | PAC-735 | US-150 | Prepare final smoke test report template | High | `test/PAC-735-task-525-prepare-final-smoke-test-report-template` |

# 10. Release Story Plan

## US-145 — Curated MVP seed data

| Field | Value |
|---|---|
| Jira Key | PAC-185 |
| Parent Epic | PAC-EPIC-18 - Data Seed & Demo Reset |
| Priority | High |
| Story Points | 5 |
| Exact Story branch | `story/PAC-185-us-145-curated-mvp-seed-data` |
| Direct Sprint 10 Tasks | 3 |

Tasks:

| Logical Task | Jira Key | Parent Story | Summary | Priority | Exact branch |
|---|---|---|---|---|---|
| PAC-TASK-425 | PAC-635 | US-145 | Create curated MVP seed dataset | High | `feature/PAC-635-task-425-create-curated-mvp-seed-dataset` |
| PAC-TASK-432 | PAC-642 | US-145 | Seed report data with PAID, DRAFT, CANCELLED and failed-payment cases | High | `feature/PAC-642-task-432-seed-report-data-with-paid-draft-cancelled-and-fail` |
| PAC-TASK-489 | PAC-699 | US-145 | Add seed command for curated MVP data | High | `feature/PAC-699-task-489-add-seed-command-for-curated-mvp-data` |

Acceptance Review:

- Có medicines, active ingredients, suppliers, batches.
- Dữ liệu đủ cho POS, interaction, reports.
- Không seed toàn bộ 100-table commercial data.
- Dữ liệu có thể reset được.

## US-146 — Demo users by role

| Field | Value |
|---|---|
| Jira Key | PAC-186 |
| Parent Epic | PAC-EPIC-18 - Data Seed & Demo Reset |
| Priority | High |
| Story Points | 3 |
| Exact Story branch | `story/PAC-186-us-146-demo-users-by-role` |
| Direct Sprint 10 Tasks | 3 |

Tasks:

| Logical Task | Jira Key | Parent Story | Summary | Priority | Exact branch |
|---|---|---|---|---|---|
| PAC-TASK-426 | PAC-636 | US-146 | Seed demo users by role | High | `feature/PAC-636-task-426-seed-demo-users-by-role` |
| PAC-TASK-427 | PAC-637 | US-146 | Seed first-login demo account | Medium | `feature/PAC-637-task-427-seed-first-login-demo-account` |
| PAC-TASK-513 | PAC-723 | US-146 | Write demo account guide | Medium | `feature/PAC-723-task-513-write-demo-account-guide` |

Acceptance Review:

- Có Admin, Staff, Warehouse.
- Quyền đúng theo role.
- Demo account chính không bị must_change_password nếu dùng để demo nhanh.
- Có tài khoản first-login nếu cần trình bày flow.

## US-147 — Dynamic expiry dates for demo

| Field | Value |
|---|---|
| Jira Key | PAC-187 |
| Parent Epic | PAC-EPIC-18 - Data Seed & Demo Reset |
| Priority | High |
| Story Points | 3 |
| Exact Story branch | `story/PAC-187-us-147-dynamic-expiry-dates-for-demo` |
| Direct Sprint 10 Tasks | 1 |

Tasks:

| Logical Task | Jira Key | Parent Story | Summary | Priority | Exact branch |
|---|---|---|---|---|---|
| PAC-TASK-428 | PAC-638 | US-147 | Generate dynamic expiry dates for demo batches | High | `feature/PAC-638-task-428-generate-dynamic-expiry-dates-for-demo-batches` |

Acceptance Review:

- Near-expiry/expired dates tính tương đối theo ngày reset.
- Demo không bị hỏng khi chạy ngày khác.
- FEFO scenario vẫn ổn.
- Seed script rõ ràng.

## US-148 — FEFO multi-batch demo scenario

| Field | Value |
|---|---|
| Jira Key | PAC-188 |
| Parent Epic | PAC-EPIC-18 - Data Seed & Demo Reset |
| Priority | Highest |
| Story Points | 5 |
| Exact Story branch | `story/PAC-188-us-148-fefo-multi-batch-demo-scenario` |
| Direct Sprint 10 Tasks | 2 |

Tasks:

| Logical Task | Jira Key | Parent Story | Summary | Priority | Exact branch |
|---|---|---|---|---|---|
| PAC-TASK-429 | PAC-639 | US-148 | Seed FEFO multi-batch demo scenario | Highest | `feature/PAC-639-task-429-seed-fefo-multi-batch-demo-scenario` |
| PAC-TASK-430 | PAC-640 | US-148 | Seed expired batch excluded from sellable stock | High | `feature/PAC-640-task-430-seed-expired-batch-excluded-from-sellable-stock` |

Acceptance Review:

- Có batch expired, near-expiry, normal.
- FEFO chọn batch hết hạn gần nhất nhưng chưa expired.
- Có case allocate nhiều batch.
- Smoke test kiểm tra allocation.

## US-149 — Seed PAID order with HIGH alert

| Field | Value |
|---|---|
| Jira Key | PAC-189 |
| Parent Epic | PAC-EPIC-18 - Data Seed & Demo Reset |
| Priority | Highest |
| Story Points | 5 |
| Exact Story branch | `story/PAC-189-us-149-seed-paid-order-with-high-alert` |
| Direct Sprint 10 Tasks | 1 |

Tasks:

| Logical Task | Jira Key | Parent Story | Summary | Priority | Exact branch |
|---|---|---|---|---|---|
| PAC-TASK-431 | PAC-641 | US-149 | Seed PAID order with handled HIGH alert | Highest | `feature/PAC-641-task-431-seed-paid-order-with-handled-high-alert` |

Acceptance Review:

- Order status PAID.
- Có HIGH InteractionAlert acknowledged.
- Có consultation note.
- Có payment success, invoice, batch allocations.

## US-150 — Local-only demo reset with graph rebuild and smoke test

| Field | Value |
|---|---|
| Jira Key | PAC-190 |
| Parent Epic | PAC-EPIC-18 - Data Seed & Demo Reset |
| Priority | Highest |
| Story Points | 5 |
| Exact Story branch | `story/PAC-190-us-150-local-only-demo-reset-with-graph-rebuild-and-smoke-te` |
| Direct Sprint 10 Tasks | 49 |

Tasks:

| Logical Task | Jira Key | Parent Story | Summary | Priority | Exact branch |
|---|---|---|---|---|---|
| PAC-TASK-433 | PAC-643 | US-150 | Implement demo:reset local-only environment guard | Highest | `feature/PAC-643-task-433-implement-demo-reset-local-only-environment-guard` |
| PAC-TASK-434 | PAC-644 | US-150 | Rebuild Neo4j projection during demo reset | High | `feature/PAC-644-task-434-rebuild-neo4j-projection-during-demo-reset` |
| PAC-TASK-435 | PAC-645 | US-150 | Run smoke tests after demo reset | Highest | `test/PAC-645-task-435-run-smoke-tests-after-demo-reset` |
| PAC-TASK-436 | PAC-646 | US-150 | Add backend unit test setup | Highest | `test/PAC-646-task-436-add-backend-unit-test-setup` |
| PAC-TASK-437 | PAC-647 | US-150 | Add backend integration test setup with isolated cleanup | Highest | `test/PAC-647-task-437-add-backend-integration-test-setup-with-isolated-cl` |
| PAC-TASK-438 | PAC-648 | US-150 | Add frontend component test setup | High | `test/PAC-648-task-438-add-frontend-component-test-setup` |
| PAC-TASK-439 | PAC-649 | US-150 | Add Playwright E2E test setup for Chrome desktop | High | `test/PAC-649-task-439-add-playwright-e2e-test-setup-for-chrome-desktop` |
| PAC-TASK-440 | PAC-650 | US-150 | Add Postman manual API collection structure | Medium | `feature/PAC-650-task-440-add-postman-manual-api-collection-structure` |
| PAC-TASK-480 | PAC-690 | US-150 | Add full MVP smoke test checklist | Highest | `test/PAC-690-task-480-add-full-mvp-smoke-test-checklist` |
| PAC-TASK-481 | PAC-691 | US-150 | Configure local Node.js project setup guide | High | `feature/PAC-691-task-481-configure-local-node-js-project-setup-guide` |
| PAC-TASK-482 | PAC-692 | US-150 | Configure frontend environment variables guide | High | `feature/PAC-692-task-482-configure-frontend-environment-variables-guide` |
| PAC-TASK-483 | PAC-693 | US-150 | Configure backend environment variables guide | High | `feature/PAC-693-task-483-configure-backend-environment-variables-guide` |
| PAC-TASK-484 | PAC-694 | US-150 | Configure Supabase project setup instructions | High | `feature/PAC-694-task-484-configure-supabase-project-setup-instructions` |
| PAC-TASK-485 | PAC-695 | US-150 | Configure Neo4j AuraDB setup instructions | High | `feature/PAC-695-task-485-configure-neo4j-auradb-setup-instructions` |
| PAC-TASK-488 | PAC-698 | US-150 | Add Prisma generate and migrate setup command | High | `feature/PAC-698-task-488-add-prisma-generate-and-migrate-setup-command` |
| PAC-TASK-490 | PAC-700 | US-150 | Add graph projection rebuild command | High | `feature/PAC-700-task-490-add-graph-projection-rebuild-command` |
| PAC-TASK-491 | PAC-701 | US-150 | Add demo reset command entrypoint | Highest | `feature/PAC-701-task-491-add-demo-reset-command-entrypoint` |
| PAC-TASK-492 | PAC-702 | US-150 | Add demo reset environment safety checks | Highest | `feature/PAC-702-task-492-add-demo-reset-environment-safety-checks` |
| PAC-TASK-493 | PAC-703 | US-150 | Configure GitHub Actions lint check | High | `feature/PAC-703-task-493-configure-github-actions-lint-check` |
| PAC-TASK-494 | PAC-704 | US-150 | Configure GitHub Actions type check | High | `feature/PAC-704-task-494-configure-github-actions-type-check` |
| PAC-TASK-495 | PAC-705 | US-150 | Configure GitHub Actions frontend build | High | `feature/PAC-705-task-495-configure-github-actions-frontend-build` |
| PAC-TASK-496 | PAC-706 | US-150 | Configure GitHub Actions backend build | High | `feature/PAC-706-task-496-configure-github-actions-backend-build` |
| PAC-TASK-497 | PAC-707 | US-150 | Configure GitHub Actions unit test check | High | `test/PAC-707-task-497-configure-github-actions-unit-test-check` |
| PAC-TASK-498 | PAC-708 | US-150 | Configure GitHub Actions integration test check | High | `test/PAC-708-task-498-configure-github-actions-integration-test-check` |
| PAC-TASK-499 | PAC-709 | US-150 | Configure Prisma schema validation check | High | `feature/PAC-709-task-499-configure-prisma-schema-validation-check` |
| PAC-TASK-500 | PAC-710 | US-150 | Configure Prisma migration check | High | `feature/PAC-710-task-500-configure-prisma-migration-check` |
| PAC-TASK-501 | PAC-711 | US-150 | Add CI guard to prevent destructive tests against demo database | Highest | `test/PAC-711-task-501-add-ci-guard-to-prevent-destructive-tests-against-d` |
| PAC-TASK-502 | PAC-712 | US-150 | Add CI branch protection expectation notes | Medium | `feature/PAC-712-task-502-add-ci-branch-protection-expectation-notes` |
| PAC-TASK-503 | PAC-713 | US-150 | Add local-only guard for demo:reset script | Highest | `feature/PAC-713-task-503-add-local-only-guard-for-demo-reset-script` |
| PAC-TASK-504 | PAC-714 | US-150 | Add Chrome desktop target verification checklist | Medium | `feature/PAC-714-task-504-add-chrome-desktop-target-verification-checklist` |
| PAC-TASK-505 | PAC-715 | US-150 | Add basic responsive verification checklist | Low | `feature/PAC-715-task-505-add-basic-responsive-verification-checklist` |
| PAC-TASK-506 | PAC-716 | US-150 | Write project README setup section | High | `docs/PAC-716-task-506-write-project-readme-setup-section` |
| PAC-TASK-507 | PAC-717 | US-150 | Write backend setup and run instructions | High | `feature/PAC-717-task-507-write-backend-setup-and-run-instructions` |
| PAC-TASK-508 | PAC-718 | US-150 | Write frontend setup and run instructions | High | `feature/PAC-718-task-508-write-frontend-setup-and-run-instructions` |
| PAC-TASK-509 | PAC-719 | US-150 | Write database migration and seed instructions | High | `feature/PAC-719-task-509-write-database-migration-and-seed-instructions` |
| PAC-TASK-510 | PAC-720 | US-150 | Write Supabase Auth setup notes | High | `feature/PAC-720-task-510-write-supabase-auth-setup-notes` |
| PAC-TASK-511 | PAC-721 | US-150 | Write Neo4j setup and graph rebuild notes | High | `feature/PAC-721-task-511-write-neo4j-setup-and-graph-rebuild-notes` |
| PAC-TASK-514 | PAC-724 | US-150 | Write demo scenario script for login and role switching | Medium | `feature/PAC-724-task-514-write-demo-scenario-script-for-login-and-role-switc` |
| PAC-TASK-515 | PAC-725 | US-150 | Write demo scenario script for Stock Import and MedicineBatch | High | `feature/PAC-725-task-515-write-demo-scenario-script-for-stock-import-and-med` |
| PAC-TASK-516 | PAC-726 | US-150 | Write demo scenario script for POS and Checkout | Highest | `feature/PAC-726-task-516-write-demo-scenario-script-for-pos-and-checkout` |
| PAC-TASK-517 | PAC-727 | US-150 | Write demo scenario script for InteractionAlert and HIGH note | Highest | `feature/PAC-727-task-517-write-demo-scenario-script-for-interactionalert-and` |
| PAC-TASK-518 | PAC-728 | US-150 | Write demo scenario script for AI Copilot and AI Audit | High | `feature/PAC-728-task-518-write-demo-scenario-script-for-ai-copilot-and-ai-au` |
| PAC-TASK-519 | PAC-729 | US-150 | Write demo scenario script for Graph Sync and Graph-RAG | High | `feature/PAC-729-task-519-write-demo-scenario-script-for-graph-sync-and-graph` |
| PAC-TASK-520 | PAC-730 | US-150 | Write demo scenario script for Reports and Settings | Medium | `feature/PAC-730-task-520-write-demo-scenario-script-for-reports-and-settings` |
| PAC-TASK-521 | PAC-731 | US-150 | Write MVP traceability matrix summary | High | `feature/PAC-731-task-521-write-mvp-traceability-matrix-summary` |
| PAC-TASK-522 | PAC-732 | US-150 | Write release/demo readiness checklist | Highest | `feature/PAC-732-task-522-write-release-demo-readiness-checklist` |
| PAC-TASK-523 | PAC-733 | US-150 | Write known limitations and out-of-scope guard section | High | `feature/PAC-733-task-523-write-known-limitations-and-out-of-scope-guard-sect` |
| PAC-TASK-524 | PAC-734 | US-150 | Prepare contingency evidence screenshots list | Medium | `feature/PAC-734-task-524-prepare-contingency-evidence-screenshots-list` |
| PAC-TASK-525 | PAC-735 | US-150 | Prepare final smoke test report template | High | `test/PAC-735-task-525-prepare-final-smoke-test-report-template` |

Acceptance Review:

- `demo:reset` chỉ chạy local.
- Refuse staging/production/unknown env.
- Sau reset rebuild Neo4j projection.
- Chạy smoke test sau reset.

# 11. Cross-sprint Regression Task Policy

Các Task `PAC-TASK-441 → PAC-TASK-479` kiểm thử lại Story của Sprint 1–9.

Rules:

- Không mở lại parent Story chỉ vì thêm regression test.
- Không tạo Story PR.
- Không thay đổi acceptance criteria cũ.
- Nếu phát hiện defect, tạo Bug Candidate.
- Chỉ sửa defect sau khi Project Owner cung cấp Jira Bug Key thật.
- Test Task PR vẫn target `develop`.
- Regression result được ghi vào Sprint 10 progress/final review.

# 12. Demo Reset Contract

Expected pipeline:

```text
verify local-safe environment
→ acquire reset lock nếu cần
→ clear only approved local data
→ migrate/validate schema
→ seed curated PostgreSQL data
→ rebuild Neo4j projection
→ verify freshness
→ run smoke tests
→ emit structured reset report
```

Fail-closed checks tối thiểu:

- Environment name.
- Database host/project identity.
- Explicit local-only flag.
- No production/staging/demo shared target.
- Required confirmation mechanism phù hợp automation.
- Neo4j target verification.
- No credential echo.
- Abort on partial failure.

# 13. Seed Data Contract

Seed execution phải idempotent hoặc reset-controlled.

Required scenario matrix:

| Scenario | Required |
|---|---|
| Admin user | Yes |
| Staff user | Yes |
| Warehouse user | Yes |
| First-login account | Yes |
| Active medicines | Yes |
| Inactive medicine | Recommended |
| Normal sellable batch | Yes |
| Expired batch | Yes |
| Near-expiry batch | Yes |
| FEFO multi-batch order | Yes |
| LOW/MEDIUM/HIGH rule | Yes |
| Handled HIGH alert | Yes |
| PAID order | Yes |
| DRAFT order | Yes |
| CANCELLED order | Yes |
| Failed payment attempt | Yes |
| Report data | Yes |
| Graph projection data | Yes |

# 14. Testing Strategy

## Test layers

- Backend unit tests.
- Backend integration tests.
- Frontend component tests.
- Chrome desktop Playwright E2E.
- Postman manual API collection.
- Module-level regression.
- Full MVP smoke test.

## High-risk acceptance

Mọi high-risk module phải có:

- Success path.
- Validation failure.
- Permission failure.
- Transaction rollback hoặc failure isolation khi liên quan.
- Idempotency/concurrency khi liên quan.
- No destructive test behavior.
- Cleanup evidence.

## Full MVP smoke flow

Tối thiểu:

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

# 15. CI Contract

Required workflow capabilities:

- Lint.
- Type check.
- Frontend build.
- Backend build.
- Unit tests.
- Integration tests.
- Prisma schema validation.
- Migration check.
- Guard against destructive tests on demo database.

CI design rules:

- Least-privilege permissions.
- No plaintext secrets.
- No destructive database command.
- Explicit environment guards.
- Dependency caching when safe.
- Clear failure output.
- Stable working directories.
- No hidden requirement for Docker.
- No deployment side effect.

# 16. Setup and Documentation Contract

Required documentation:

- Root README setup section.
- Backend setup/run.
- Frontend setup/run.
- Environment variables.
- Supabase setup.
- Neo4j AuraDB setup.
- Google AI key.
- MockAI fallback.
- Prisma generate/migrate.
- Seed command.
- Graph rebuild command.
- Demo reset command.
- Demo accounts.
- Demo scripts for core flows.
- Traceability summary.
- Release readiness checklist.
- Known limitations/out-of-scope.
- Contingency evidence list.
- Final smoke report template.

Docs phải khớp command thật trong repository.

# 17. Exact Branch Registry

## 17.1 Core Epic branches

| Logical Epic | Jira Key | Exact branch |
|---|---|---|
| EPIC-18 | PAC-18 | `epic/PAC-18-epic-18-data-seed-demo-reset` |
| EPIC-19 | PAC-19 | `epic/PAC-19-epic-19-testing-smoke-test-release-readiness` |
| EPIC-20 | PAC-20 | `epic/PAC-20-epic-20-devops-ci-setup` |
| EPIC-21 | PAC-21 | `epic/PAC-21-epic-21-documentation-traceability` |

## 17.2 Release Story branches

| Story | Jira Key | Exact branch |
|---|---|---|
| US-145 | PAC-185 | `story/PAC-185-us-145-curated-mvp-seed-data` |
| US-146 | PAC-186 | `story/PAC-186-us-146-demo-users-by-role` |
| US-147 | PAC-187 | `story/PAC-187-us-147-dynamic-expiry-dates-for-demo` |
| US-148 | PAC-188 | `story/PAC-188-us-148-fefo-multi-batch-demo-scenario` |
| US-149 | PAC-189 | `story/PAC-189-us-149-seed-paid-order-with-high-alert` |
| US-150 | PAC-190 | `story/PAC-190-us-150-local-only-demo-reset-with-graph-rebuild-and-smoke-te` |

## 17.3 Task branches

| Logical Task | Jira Key | Exact branch |
|---|---|---|
| PAC-TASK-425 | PAC-635 | `feature/PAC-635-task-425-create-curated-mvp-seed-dataset` |
| PAC-TASK-426 | PAC-636 | `feature/PAC-636-task-426-seed-demo-users-by-role` |
| PAC-TASK-427 | PAC-637 | `feature/PAC-637-task-427-seed-first-login-demo-account` |
| PAC-TASK-428 | PAC-638 | `feature/PAC-638-task-428-generate-dynamic-expiry-dates-for-demo-batches` |
| PAC-TASK-429 | PAC-639 | `feature/PAC-639-task-429-seed-fefo-multi-batch-demo-scenario` |
| PAC-TASK-430 | PAC-640 | `feature/PAC-640-task-430-seed-expired-batch-excluded-from-sellable-stock` |
| PAC-TASK-431 | PAC-641 | `feature/PAC-641-task-431-seed-paid-order-with-handled-high-alert` |
| PAC-TASK-432 | PAC-642 | `feature/PAC-642-task-432-seed-report-data-with-paid-draft-cancelled-and-fail` |
| PAC-TASK-433 | PAC-643 | `feature/PAC-643-task-433-implement-demo-reset-local-only-environment-guard` |
| PAC-TASK-434 | PAC-644 | `feature/PAC-644-task-434-rebuild-neo4j-projection-during-demo-reset` |
| PAC-TASK-435 | PAC-645 | `test/PAC-645-task-435-run-smoke-tests-after-demo-reset` |
| PAC-TASK-436 | PAC-646 | `test/PAC-646-task-436-add-backend-unit-test-setup` |
| PAC-TASK-437 | PAC-647 | `test/PAC-647-task-437-add-backend-integration-test-setup-with-isolated-cl` |
| PAC-TASK-438 | PAC-648 | `test/PAC-648-task-438-add-frontend-component-test-setup` |
| PAC-TASK-439 | PAC-649 | `test/PAC-649-task-439-add-playwright-e2e-test-setup-for-chrome-desktop` |
| PAC-TASK-440 | PAC-650 | `feature/PAC-650-task-440-add-postman-manual-api-collection-structure` |
| PAC-TASK-441 | PAC-651 | `test/PAC-651-task-441-add-auth-and-rbac-test-suite` |
| PAC-TASK-442 | PAC-652 | `test/PAC-652-task-442-add-user-management-permission-tests` |
| PAC-TASK-443 | PAC-653 | `test/PAC-653-task-443-add-medicine-management-api-tests` |
| PAC-TASK-444 | PAC-654 | `test/PAC-654-task-444-add-activeingredient-mapping-tests` |
| PAC-TASK-445 | PAC-655 | `test/PAC-655-task-445-add-supplier-management-api-tests` |
| PAC-TASK-446 | PAC-656 | `test/PAC-656-task-446-add-medicinebatch-source-of-truth-tests` |
| PAC-TASK-447 | PAC-657 | `test/PAC-657-task-447-add-sellable-quantity-and-expired-batch-tests` |
| PAC-TASK-448 | PAC-658 | `test/PAC-658-task-448-add-near-expiry-threshold-tests` |
| PAC-TASK-449 | PAC-659 | `test/PAC-659-task-449-add-stock-import-transaction-tests` |
| PAC-TASK-450 | PAC-660 | `test/PAC-660-task-450-add-stock-import-batch-merge-and-expiry-mismatch-te` |
| PAC-TASK-451 | PAC-661 | `test/PAC-661-task-451-add-inventory-adjustment-transaction-tests` |
| PAC-TASK-452 | PAC-662 | `test/PAC-662-task-452-add-inventory-adjustment-audit-and-reason-tests` |
| PAC-TASK-453 | PAC-663 | `test/PAC-663-task-453-add-pos-draft-order-api-tests` |
| PAC-TASK-454 | PAC-664 | `test/PAC-664-task-454-add-pos-draft-order-ui-smoke-tests` |
| PAC-TASK-455 | PAC-665 | `test/PAC-665-task-455-add-staff-order-ownership-tests` |
| PAC-TASK-456 | PAC-666 | `test/PAC-666-task-456-add-draft-order-cancel-status-tests` |
| PAC-TASK-457 | PAC-667 | `test/PAC-667-task-457-add-druginteraction-rule-api-tests` |
| PAC-TASK-458 | PAC-668 | `test/PAC-668-task-458-add-activeingredient-derived-interaction-tests` |
| PAC-TASK-459 | PAC-669 | `test/PAC-669-task-459-add-interactionalert-persistence-tests` |
| PAC-TASK-460 | PAC-670 | `test/PAC-670-task-460-add-interactionalert-display-count-tests` |
| PAC-TASK-461 | PAC-671 | `test/PAC-671-task-461-add-high-alert-acknowledgement-tests` |
| PAC-TASK-462 | PAC-672 | `test/PAC-672-task-462-add-high-alert-consultation-note-tests` |
| PAC-TASK-463 | PAC-673 | `test/PAC-673-task-463-add-checkout-blocker-tests-for-unresolved-high-aler` |
| PAC-TASK-464 | PAC-674 | `test/PAC-674-task-464-add-checkout-transaction-success-tests` |
| PAC-TASK-465 | PAC-675 | `test/PAC-675-task-465-add-checkout-rollback-failure-tests` |
| PAC-TASK-466 | PAC-676 | `test/PAC-676-task-466-add-fefo-allocation-unit-tests` |
| PAC-TASK-467 | PAC-677 | `test/PAC-677-task-467-add-fefo-multi-batch-allocation-tests` |
| PAC-TASK-468 | PAC-678 | `test/PAC-678-task-468-add-checkout-idempotency-tests` |
| PAC-TASK-469 | PAC-679 | `test/PAC-679-task-469-add-payment-cash-handling-tests` |
| PAC-TASK-470 | PAC-680 | `test/PAC-680-task-470-add-payment-one-success-rule-tests` |
| PAC-TASK-471 | PAC-681 | `test/PAC-681-task-471-add-invoice-generation-tests` |
| PAC-TASK-472 | PAC-682 | `test/PAC-682-task-472-add-ai-guardrail-high-risk-test-suite` |
| PAC-TASK-473 | PAC-683 | `test/PAC-683-task-473-add-ai-audit-privacy-tests` |
| PAC-TASK-474 | PAC-684 | `test/PAC-684-task-474-add-ai-provider-fallback-tests` |
| PAC-TASK-475 | PAC-685 | `test/PAC-685-task-475-add-graph-sync-outbox-and-retry-tests` |
| PAC-TASK-476 | PAC-686 | `test/PAC-686-task-476-add-neo4j-projection-tests` |
| PAC-TASK-477 | PAC-687 | `test/PAC-687-task-477-add-graph-freshness-tests` |
| PAC-TASK-478 | PAC-688 | `test/PAC-688-task-478-add-graph-rag-fallback-tests` |
| PAC-TASK-479 | PAC-689 | `test/PAC-689-task-479-add-reports-deterministic-calculation-tests` |
| PAC-TASK-480 | PAC-690 | `test/PAC-690-task-480-add-full-mvp-smoke-test-checklist` |
| PAC-TASK-481 | PAC-691 | `feature/PAC-691-task-481-configure-local-node-js-project-setup-guide` |
| PAC-TASK-482 | PAC-692 | `feature/PAC-692-task-482-configure-frontend-environment-variables-guide` |
| PAC-TASK-483 | PAC-693 | `feature/PAC-693-task-483-configure-backend-environment-variables-guide` |
| PAC-TASK-484 | PAC-694 | `feature/PAC-694-task-484-configure-supabase-project-setup-instructions` |
| PAC-TASK-485 | PAC-695 | `feature/PAC-695-task-485-configure-neo4j-auradb-setup-instructions` |
| PAC-TASK-486 | PAC-696 | `feature/PAC-696-task-486-configure-google-ai-api-key-setup-instructions` |
| PAC-TASK-487 | PAC-697 | `feature/PAC-697-task-487-configure-mockai-fallback-setup-instructions` |
| PAC-TASK-488 | PAC-698 | `feature/PAC-698-task-488-add-prisma-generate-and-migrate-setup-command` |
| PAC-TASK-489 | PAC-699 | `feature/PAC-699-task-489-add-seed-command-for-curated-mvp-data` |
| PAC-TASK-490 | PAC-700 | `feature/PAC-700-task-490-add-graph-projection-rebuild-command` |
| PAC-TASK-491 | PAC-701 | `feature/PAC-701-task-491-add-demo-reset-command-entrypoint` |
| PAC-TASK-492 | PAC-702 | `feature/PAC-702-task-492-add-demo-reset-environment-safety-checks` |
| PAC-TASK-493 | PAC-703 | `feature/PAC-703-task-493-configure-github-actions-lint-check` |
| PAC-TASK-494 | PAC-704 | `feature/PAC-704-task-494-configure-github-actions-type-check` |
| PAC-TASK-495 | PAC-705 | `feature/PAC-705-task-495-configure-github-actions-frontend-build` |
| PAC-TASK-496 | PAC-706 | `feature/PAC-706-task-496-configure-github-actions-backend-build` |
| PAC-TASK-497 | PAC-707 | `test/PAC-707-task-497-configure-github-actions-unit-test-check` |
| PAC-TASK-498 | PAC-708 | `test/PAC-708-task-498-configure-github-actions-integration-test-check` |
| PAC-TASK-499 | PAC-709 | `feature/PAC-709-task-499-configure-prisma-schema-validation-check` |
| PAC-TASK-500 | PAC-710 | `feature/PAC-710-task-500-configure-prisma-migration-check` |
| PAC-TASK-501 | PAC-711 | `test/PAC-711-task-501-add-ci-guard-to-prevent-destructive-tests-against-d` |
| PAC-TASK-502 | PAC-712 | `feature/PAC-712-task-502-add-ci-branch-protection-expectation-notes` |
| PAC-TASK-503 | PAC-713 | `feature/PAC-713-task-503-add-local-only-guard-for-demo-reset-script` |
| PAC-TASK-504 | PAC-714 | `feature/PAC-714-task-504-add-chrome-desktop-target-verification-checklist` |
| PAC-TASK-505 | PAC-715 | `feature/PAC-715-task-505-add-basic-responsive-verification-checklist` |
| PAC-TASK-506 | PAC-716 | `docs/PAC-716-task-506-write-project-readme-setup-section` |
| PAC-TASK-507 | PAC-717 | `feature/PAC-717-task-507-write-backend-setup-and-run-instructions` |
| PAC-TASK-508 | PAC-718 | `feature/PAC-718-task-508-write-frontend-setup-and-run-instructions` |
| PAC-TASK-509 | PAC-719 | `feature/PAC-719-task-509-write-database-migration-and-seed-instructions` |
| PAC-TASK-510 | PAC-720 | `feature/PAC-720-task-510-write-supabase-auth-setup-notes` |
| PAC-TASK-511 | PAC-721 | `feature/PAC-721-task-511-write-neo4j-setup-and-graph-rebuild-notes` |
| PAC-TASK-512 | PAC-722 | `feature/PAC-722-task-512-write-ai-provider-and-mockai-fallback-setup-notes` |
| PAC-TASK-513 | PAC-723 | `feature/PAC-723-task-513-write-demo-account-guide` |
| PAC-TASK-514 | PAC-724 | `feature/PAC-724-task-514-write-demo-scenario-script-for-login-and-role-switc` |
| PAC-TASK-515 | PAC-725 | `feature/PAC-725-task-515-write-demo-scenario-script-for-stock-import-and-med` |
| PAC-TASK-516 | PAC-726 | `feature/PAC-726-task-516-write-demo-scenario-script-for-pos-and-checkout` |
| PAC-TASK-517 | PAC-727 | `feature/PAC-727-task-517-write-demo-scenario-script-for-interactionalert-and` |
| PAC-TASK-518 | PAC-728 | `feature/PAC-728-task-518-write-demo-scenario-script-for-ai-copilot-and-ai-au` |
| PAC-TASK-519 | PAC-729 | `feature/PAC-729-task-519-write-demo-scenario-script-for-graph-sync-and-graph` |
| PAC-TASK-520 | PAC-730 | `feature/PAC-730-task-520-write-demo-scenario-script-for-reports-and-settings` |
| PAC-TASK-521 | PAC-731 | `feature/PAC-731-task-521-write-mvp-traceability-matrix-summary` |
| PAC-TASK-522 | PAC-732 | `feature/PAC-732-task-522-write-release-demo-readiness-checklist` |
| PAC-TASK-523 | PAC-733 | `feature/PAC-733-task-523-write-known-limitations-and-out-of-scope-guard-sect` |
| PAC-TASK-524 | PAC-734 | `feature/PAC-734-task-524-prepare-contingency-evidence-screenshots-list` |
| PAC-TASK-525 | PAC-735 | `test/PAC-735-task-525-prepare-final-smoke-test-report-template` |

> Một số branch slug canonical bị cắt ngắn. Phải dùng nguyên văn từ registry.

# 18. Story and Epic Reviews

## Release Story Review

Sau khi child Tasks merge:

```text
latest develop
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

## Core Epic Reviews

- PAC-EPIC-18 — Data Seed & Demo Reset Review.
- PAC-EPIC-19 — Testing & Release Readiness Review.
- PAC-EPIC-20 — DevOps & CI Review.
- PAC-EPIC-21 — Documentation & Traceability Review.

Không tạo Epic PR.

# 19. Bug Candidate Workflow

AI không tự tạo Jira Bug Key.

```text
Bug Candidate:
Severity:
Affected Task/Story/Epic:
Actual:
Expected:
Evidence:
Suggested fix scope:
```

Project Owner tạo Jira Bug. Fix qua exact Bug branch và PR vào `develop`.

# 20. Definition of Done

Sprint 10 hoàn thành khi:

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
Report data PASS

demo:reset local guard PASS
Neo4j rebuild PASS
Smoke-after-reset PASS

High-risk regression suites PASS
Full MVP smoke PASS
Chrome desktop E2E PASS
Basic responsive verification PASS

GitHub Actions configured
Required CI checks PASS
CI destructive-test guard PASS

Setup docs PASS
Demo scripts PASS
Traceability PASS
Release checklist PASS
Known limitations PASS
Final smoke template PASS

Blocking defects = 0
High defects = 0
Sprint 10 Final Review = PASS
Ready for MVP Release = Yes
```

# 21. Final Checklist

- [ ] Sprint 9 Final Review PASS.
- [ ] Sprint 10 Audit PASS.
- [ ] 101/101 Task branches verified.
- [ ] 6/6 Release Story branches verified.
- [ ] 4/4 Core Epic branches verified.
- [ ] Safe test environment approved.
- [ ] Curated seed data complete.
- [ ] Dynamic expiry reliable.
- [ ] Demo reset fail-closed and local-only.
- [ ] Neo4j rebuild and freshness PASS.
- [ ] Smoke tests run after reset.
- [ ] High-risk suites PASS.
- [ ] No destructive tests against demo/shared data.
- [ ] Chrome desktop E2E PASS.
- [ ] Basic responsive verification PASS.
- [ ] GitHub Actions configured and green.
- [ ] Local Quality Gate remains PASS.
- [ ] Setup commands verified.
- [ ] Documentation matches repository.
- [ ] Release evidence complete.
- [ ] No Blocking/High defect.
- [ ] AI Agent did not merge `develop → main`.
- [ ] Ready for MVP Release = Yes.
