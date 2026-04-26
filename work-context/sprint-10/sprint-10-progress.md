# Sprint 10 Progress — PharmaAssist AI Intelligence

> **Repository path đề xuất:** `work-context/sprint-10/sprint-10-progress.md`
>
> Tài liệu này theo dõi implementation, verification, CI transition, demo readiness và release evidence của Sprint 10. Jira do Project Owner cập nhật thủ công.

## Canonical Sources

1. `Jira/branch-on-jira.md` — nguồn duy nhất cho Jira Key và exact branch.
2. `Jira/jira-mapping.md` — Logical Key ↔ Jira Key.
3. `Jira/3_Stories.md` — Release Story và Acceptance Criteria.
4. `Jira/4C_Task_List_MVP_AI_Graph_Report_Demo_291_435.md`.
5. `Jira/4D_Task_List_Testing_Advanced_Future_436_580.md`.
6. `Jira/4C_Task_Description_MVP_AI_Graph_Report_Demo_291_435.md`.
7. `Jira/4D_Task_Description_Testing_Advanced_Future_436_580.md`.
8. `Jira/5_Sprint.md`.
9. `work-context/sprint-10/sprint-10.md`.
10. Sprint 1 → Sprint 9 Final Review reports.
11. Current repository, Prisma migrations, test scripts, Supabase/Neo4j environments và GitHub state.

Quy tắc:

- Không đổi, rút gọn hoặc tự tạo branch thay thế.
- Task/Bug PR target `develop`.
- Không tạo Story PR hoặc Epic PR.
- Chỉ Project Owner merge `develop → main`.
- PostgreSQL tiếp tục là source of truth.
- Neo4j là read projection.
- Demo reset chỉ chạy trong local-safe environment.
- Không chạy destructive tests trên demo/staging/production.
- Docker không phải official setup path.
- Chrome desktop là browser MVP chính.
- Screenshots/video không thay thế running product.
- Trước khi GitHub Actions được cấu hình: `CI = N/A`.
- Sau khi CI được cấu hình: Local Quality Gate và applicable CI checks đều bắt buộc.

---

# 1. Sprint Information

| Mục | Nội dung |
|---|---|
| Sprint | Sprint 10 |
| Tên | Demo Data, Demo Reset, Testing, CI, Setup, Documentation & Release Readiness |
| Scope | MVP Release |
| Core Epics | PAC-EPIC-18, PAC-EPIC-19, PAC-EPIC-20, PAC-EPIC-21 |
| Release Stories | US-145 → US-150 |
| Release Story count | 6 |
| Release Story Points | 26 |
| Tasks | PAC-TASK-425 → PAC-TASK-525 |
| Task count | 101 |
| Task Jira Keys | PAC-635 → PAC-735 |
| Branch inventory | 111 = 101 Task + 6 Release Story + 4 Core Epic |
| Cross-sprint regression references | 37 prior Stories |
| Initial CI | N/A — GitHub Actions chưa được cấu hình |
| Final CI expectation | GitHub Actions configured and green |
| Initial merge gate | Local Quality Gate |
| Final release gate | Local Quality Gate + applicable CI checks |
| Official setup | Local Node.js/Next.js/NestJS/Prisma + cloud Supabase/Neo4j |
| Browser target | Chrome desktop; basic responsive verification |
| Jira management | Manual by Project Owner |
| Current phase | Prepared |
| Sprint 9 Final Review | Pending |
| Sprint 10 Audit | Pending |
| Ready to implement Sprint 10 | No |
| Ready for MVP Release | No |

# 2. Official Workflow

```text
exact Task/Bug branch đã tồn tại
→ pull latest develop
→ đọc Task + Acceptance Criteria
→ implement/test đúng scope
→ controlled Supabase/Neo4j checks khi cần
→ review diff, secrets, cleanup và destructive-risk
→ commit + push
→ PR vào develop
→ Local Quality Gate
→ applicable CI checks sau khi CI active
→ merge
→ verify merge SHA trên origin/develop
→ cập nhật progress
```

Story completion:

```text
latest develop
→ Release Story Acceptance Review
→ PASS/FAIL
```

Epic completion:

```text
PAC-EPIC-18 — Data Seed & Demo Reset Review
PAC-EPIC-19 — Testing & Release Readiness Review
PAC-EPIC-20 — DevOps & CI Review
PAC-EPIC-21 — Documentation & Traceability Review
```

Không tạo Story PR hoặc Epic PR.

# 3. Progress Update Cadence

Cập nhật tài liệu khi:

1. Task/Bug PR đã merge hoặc bị blocker.
2. Release Story Acceptance Review hoàn tất.
3. Core Epic Review hoàn tất.
4. Seed/reset/smoke evidence thay đổi.
5. Test infrastructure hoặc high-risk suite thay đổi.
6. GitHub Actions được kích hoạt hoặc workflow status thay đổi.
7. Setup/documentation verification hoàn tất.
8. Kết thúc phiên hoặc cần handoff.
9. Sprint 10 Final Review hoàn tất.

Không tạo documentation-only PR sau mỗi Task chỉ để ghi merge SHA. Có thể đồng bộ progress trong Task kế tiếp hoặc cuối phiên.

# 4. Sprint Summary

| Hạng mục | Tổng | Not started | In progress | Ready for merge | Technically complete |
|---|---:|---:|---:|---:|---:|
| Core Epic Reviews | 4 | 4 | 0 | 0 | 0 |
| Release Story Reviews | 6 | 6 | 0 | 0 | 0 |
| Task implementation | 101 | 101 | 0 | 0 | 0 |
| Bug candidates | 0 | 0 | 0 | 0 | 0 |

## Completion Counters

- [ ] 101/101 exact Task branches used.
- [ ] 101/101 applicable Task/Bug PRs merged into `develop`.
- [ ] 6/6 Release Story Acceptance Reviews PASS.
- [ ] PAC-EPIC-18 Review PASS.
- [ ] PAC-EPIC-19 Review PASS.
- [ ] PAC-EPIC-20 Review PASS.
- [ ] PAC-EPIC-21 Review PASS.
- [ ] Curated seed PASS.
- [ ] Dynamic expiry PASS.
- [ ] FEFO multi-batch scenario PASS.
- [ ] Handled HIGH alert demo scenario PASS.
- [ ] Report-ready data PASS.
- [ ] `demo:reset` local guard PASS.
- [ ] Neo4j projection rebuild PASS.
- [ ] Graph freshness after reset PASS.
- [ ] Smoke-after-reset PASS.
- [ ] Backend unit/integration infrastructure PASS.
- [ ] Frontend component test infrastructure PASS.
- [ ] Playwright Chrome desktop setup PASS.
- [ ] Postman collection structure PASS.
- [ ] High-risk regression suites PASS.
- [ ] Full MVP smoke PASS.
- [ ] Basic responsive verification PASS.
- [ ] GitHub Actions configured.
- [ ] Applicable CI checks PASS.
- [ ] CI destructive-test guard PASS.
- [ ] Setup/run commands verified.
- [ ] Documentation and traceability PASS.
- [ ] Release checklist PASS.
- [ ] Known limitations PASS.
- [ ] Final smoke report template PASS.
- [ ] Blocking defects = 0.
- [ ] High defects = 0.
- [ ] Sprint 10 Final Review PASS.
- [ ] Ready for MVP Release = Yes.

# 5. Tool and Environment Evidence

| Tool/Area | Status | Required for | Evidence |
|---|---|---|---|
| Git/GitHub | Pending | Branch, PR, merge, remote and CI verification | — |
| Local Quality Gate | Pending | Mọi Task/Bug PR | — |
| GitHub Actions | Not configured | Final Sprint 10 CI gate | CI = N/A |
| PostgreSQL/Supabase | Pending | Seed, reset, integration tests, reports, smoke | — |
| Safe local PostgreSQL target | Pending | `demo:reset` và destructive-safe verification | — |
| Neo4j AuraDB | Pending | Graph rebuild, freshness and Graph-RAG smoke | — |
| Safe Neo4j target | Pending | Controlled rebuild and failure testing | — |
| Backend test runner | Pending | Unit/integration/high-risk suites | — |
| Frontend component test runner | Pending | UI regression | — |
| Playwright Chrome desktop | Pending | Critical E2E | — |
| Postman collection | Pending | Manual API smoke | — |
| Node.js/npm | Pending | Official local setup | — |
| Docker | Optional/N/A | Không phải official setup path | — |
| Jira | Project Owner managed | Manual status/comment/Bug updates | AI write actions disabled |

# 6. CI Transition Register

| Stage | Condition | Required gate | Status | Evidence |
|---|---|---|---|---|
| Before PAC-TASK-493 | GitHub Actions chưa cấu hình | Local Quality Gate | Active | — |
| PAC-TASK-493 → PAC-TASK-505 | CI implementation | Local Quality Gate; workflow-specific checks khi sẵn sàng | Pending | — |
| After CI activation | Workflows merged and enabled | Local Quality Gate + applicable CI checks | Pending | — |
| Final Release | Required checks green on current develop/PR evidence | Local Quality Gate + CI | Pending | — |

Rules:

- Không ghi CI PASS nếu workflow chỉ tồn tại nhưng chưa chạy.
- Không coi GitHub Actions thay thế Local Quality Gate.
- Không chạy destructive integration tests trên shared/demo database trong CI.
- Workflow phải dùng least-privilege permissions và secrets an toàn.

# 7. Local Quality Gate Evidence

| Issue | Lint/Typecheck | Unit tests | Integration/E2E | Build | Prisma | Supabase | Neo4j | Cleanup/Safety | CI | Conflict | Gate | Evidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Chưa cập nhật | Pending/N/A | Pending/N/A | Pending/N/A | Pending/N/A | Pending/N/A | Pending/N/A | Pending/N/A | Pending | N/A/Pending | Pending | Pending | — |

N/A chuẩn:

```text
Supabase = N/A — no persistent data impact
Neo4j = N/A — no graph data/rebuild impact
CI = N/A — GitHub Actions not yet configured for this Task
```

Sau khi CI active, không dùng `CI = N/A` cho Task có applicable required checks.

# 8. Seed Data Verification Log

| Verification ID | Task/Story | Scenario | Expected | Actual | PostgreSQL evidence | Neo4j evidence | Result | Notes |
|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | Pending | — |

Required seed scenarios:

- Admin, Staff và Warehouse demo users.
- First-login account.
- Active and inactive medicine.
- Normal, expired and near-expiry batches.
- Multiple batches for FEFO.
- LOW/MEDIUM/HIGH interaction rules.
- PAID order with handled HIGH alert.
- DRAFT and CANCELLED orders.
- Failed payment attempt.
- Report-ready deterministic data.
- Graph-ready medicine/ingredient/rule data.

# 9. Dynamic Expiry Verification Log

| Verification ID | Task | Runtime date | Threshold | Expired batch | Near-expiry batch | Normal batch | Result | Evidence |
|---|---|---|---:|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | Pending | — |

Rules:

- Expiry dates phải tính tương đối theo ngày chạy.
- Không dùng ngày cố định sớm trở nên vô hiệu.
- Expired không bị nhầm near-expiry.
- Near-expiry phải dùng current threshold setting.

# 10. Demo Reset Safety and Execution Log

| Reset ID | Environment | Guard result | PostgreSQL reset | Seed | Neo4j rebuild | Freshness | Smoke | Cleanup | Result | Evidence |
|---|---|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | — | — | Pending | — |

Fail-closed checks:

- [ ] Explicit local-safe environment.
- [ ] Database/project identity verified.
- [ ] Shared demo/staging/production blocked.
- [ ] Neo4j target verified.
- [ ] Credentials not printed.
- [ ] Partial failure aborts clearly.
- [ ] Reset report is structured.
- [ ] No global destructive command outside approved local scope.

# 11. Graph Rebuild and Freshness Log

| Verification ID | Reset/Task | PostgreSQL source count | Neo4j node/edge count | Failed jobs | Freshness status | Result | Evidence |
|---|---|---:|---:|---:|---|---|---|
| Chưa có | — | — | — | — | — | Pending | — |

Required:

- Projection rebuilt from PostgreSQL.
- Medicine, ActiveIngredient, CONTAINS, INTERACTS_WITH present.
- Canonical edge semantics preserved.
- Freshness becomes FRESH after successful rebuild.
- Failure does not corrupt PostgreSQL source data.

# 12. Automated Testing Infrastructure Progress

| Layer | Task | Expected | Status | Command | Evidence |
|---|---|---|---|---|---|
| Backend unit | PAC-TASK-436 | Unit runner and sample | Not started | — | — |
| Backend integration | PAC-TASK-437 | Isolated cleanup strategy | Technically complete | d5e4759 | — |
| Frontend component | PAC-TASK-438 | Component runner and sample | Technically complete | be9ac96 | — |
| Playwright | PAC-TASK-439 | Chrome desktop E2E | Technically complete | 898da6a | — |
| Postman | PAC-TASK-440 | Structured manual collection | Technically complete | 4414f4e | — |

# 13. High-risk Regression Verification Register

| Task | Jira Key | Parent Story | Module | Status | Success path | Validation/permission | Failure isolation/rollback | Idempotency/concurrency | Evidence |
|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-441 | PAC-651 | US-01 | Add Auth and RBAC test suite | Technically complete | 2885cac | PASS | N/A | N/A | — |
| PAC-TASK-442 | PAC-652 | US-10 | Add User Management permission tests | Technically complete | 9eb43f6 | PASS | N/A | N/A | — |
| PAC-TASK-443 | PAC-653 | US-13 | Add Medicine Management API tests | Technically complete | 6b58e93 | PASS | N/A | N/A | — |
| PAC-TASK-444 | PAC-654 | US-19 | Add ActiveIngredient mapping tests | Technically complete | 815151a | PASS | N/A | N/A | — |
| PAC-TASK-445 | PAC-655 | US-23 | Add Supplier Management API tests | Technically complete | 06031ad | PASS | N/A | N/A | — |
| PAC-TASK-446 | PAC-656 | US-27 | Add MedicineBatch source-of-truth tests | Technically complete | 851cd85 | PASS | N/A | N/A | — |
| PAC-TASK-447 | PAC-657 | US-32 | Add sellable quantity and expired batch tests | Technically complete | e920841 | PASS | N/A | N/A | — |
| PAC-TASK-448 | PAC-658 | US-35 | Add near-expiry threshold tests | Technically complete | 486913d | PASS | N/A | N/A | — |
| PAC-TASK-449 | PAC-659 | US-44 | Add Stock Import transaction tests | Technically complete | da0bc9e | PASS | N/A | N/A | — |
| PAC-TASK-450 | PAC-660 | US-45 | Add Stock Import batch merge and expiry mismatch tests | Technically complete | ccedd21 | PASS | N/A | N/A | — |
| PAC-TASK-451 | PAC-661 | US-52 | Add Inventory Adjustment transaction tests | Technically complete | 9ef663b | PASS | N/A | N/A | — |
| PAC-TASK-452 | PAC-662 | US-55 | Add Inventory Adjustment audit and reason tests | Technically complete | 9cd85bb | PASS | N/A | N/A | — |
| PAC-TASK-453 | PAC-663 | US-57 | Add POS Draft Order API tests | Technically complete | b32d6d3 | PASS | N/A | N/A | — |
| PAC-TASK-454 | PAC-664 | US-57 | Add POS Draft Order UI smoke tests | Technically complete | 796f7d9 | PASS | N/A | N/A | — |
| PAC-TASK-455 | PAC-665 | US-65 | Add Staff order ownership tests | Technically complete | fb159ac | PASS | N/A | N/A | — |
| PAC-TASK-456 | PAC-666 | US-67 | Add Draft Order cancel status tests | Technically complete | fe86f1b | PASS | N/A | N/A | — |
| PAC-TASK-457 | PAC-667 | US-69 | Add DrugInteraction Rule API tests | Technically complete | f0935a7 | PASS | N/A | N/A | — |
| PAC-TASK-458 | PAC-668 | US-72 | Add ActiveIngredient-derived interaction tests | Technically complete | e5cd496 | PASS | N/A | N/A | — |
| PAC-TASK-459 | PAC-669 | US-74 | Add InteractionAlert persistence tests | Technically complete | 49928ca | PASS | N/A | N/A | — |
| PAC-TASK-460 | PAC-670 | US-76 | Add InteractionAlert display_count tests | Technically complete | 75bb2c2 | PASS | N/A | N/A | — |
| PAC-TASK-461 | PAC-671 | US-78 | Add HIGH alert acknowledgement tests | Technically complete | 283218c | PASS | N/A | N/A | — |
| PAC-TASK-462 | PAC-672 | US-79 | Add HIGH alert consultation note tests | Technically complete | bbccbed | PASS | N/A | N/A | — |
| PAC-TASK-463 | PAC-673 | US-80 | Add checkout blocker tests for unresolved HIGH alerts | Technically complete | f14a59a | PASS | N/A | N/A | — |
| PAC-TASK-464 | PAC-674 | US-83 | Add Checkout transaction success tests | Technically complete | dd41a9e | PASS | N/A | N/A | — |
| PAC-TASK-465 | PAC-675 | US-92 | Add Checkout rollback failure tests | Technically complete | 3f35de7 | PASS | N/A | N/A | — |
| PAC-TASK-466 | PAC-676 | US-88 | Add FEFO allocation unit tests | Technically complete | 61dbcb7 | PASS | N/A | N/A | — |
| PAC-TASK-467 | PAC-677 | US-88 | Add FEFO multi-batch allocation tests | Technically complete | 5fa4352 | PASS | N/A | N/A | — |
| PAC-TASK-468 | PAC-678 | US-91 | Add Checkout idempotency tests | Technically complete | e3499c7 | PASS | N/A | N/A | — |
| PAC-TASK-469 | PAC-679 | US-93 | Add Payment cash handling tests | Technically complete | 4b65ba1 | PASS | N/A | N/A | — |
| PAC-TASK-470 | PAC-680 | US-96 | Add Payment one SUCCESS rule tests | Technically complete | b260a1b | PASS | N/A | N/A | — |
| PAC-TASK-471 | PAC-681 | US-97 | Add Invoice generation tests | Technically complete | cac2c48 | PASS | N/A | N/A | — |
| PAC-TASK-472 | PAC-682 | US-105 | Add AI Guardrail high-risk test suite | Technically complete | 1de1f79 | PASS | N/A | N/A | — |
| PAC-TASK-473 | PAC-683 | US-114 | Add AI Audit privacy tests | Technically complete | 95e61b9 | PASS | N/A | N/A | — |
| PAC-TASK-474 | PAC-684 | US-104 | Add AI provider fallback tests | Technically complete | fd5f2c0 | PASS | N/A | N/A | — |
| PAC-TASK-475 | PAC-685 | US-117 | Add Graph Sync outbox and retry tests | Technically complete | e822b09 | PASS | N/A | N/A | — |
| PAC-TASK-476 | PAC-686 | US-119 | Add Neo4j projection tests | Technically complete | aed8789 | PASS | N/A | N/A | — |
| PAC-TASK-477 | PAC-687 | US-127 | Add Graph freshness tests | Technically complete | b1e2156 | PASS | N/A | N/A | — |
| PAC-TASK-478 | PAC-688 | US-132 | Add Graph-RAG fallback tests | Technically complete | 6f36d0b | PASS | N/A | N/A | — |
| PAC-TASK-479 | PAC-689 | US-137 | Add Reports deterministic calculation tests | Technically complete | 6205a48 | PASS | N/A | N/A | — |

# 14. Full MVP Smoke Test Log

| Smoke Run | Environment | Reset ID | Browser/API | Result | Failed step | Evidence |
|---|---|---|---|---|---|---|
| Chưa có | — | — | — | Pending | — | — |

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

# 15. Chrome Desktop and Responsive Verification

| Verification | Target | Status | Evidence |
|---|---|---|---|
| Critical Playwright flows | Chrome/Chromium desktop | Pending | — |
| Login/POS/Checkout layout | Desktop | Pending | — |
| Inventory/Reports layout | Desktop | Pending | — |
| Basic responsive checks | Supported widths | Pending | — |
| Full cross-browser matrix | Out of scope | N/A | — |

# 16. Setup and Operational Command Verification

| Area | Expected command/document | Verified | Result | Evidence |
|---|---|---|---|---|
| Root install/setup | Real repository command | No | Pending | — |
| Backend install/run | Real repository command | No | Pending | — |
| Frontend install/run | Real repository command | No | Pending | — |
| Prisma generate | Real repository command | No | Pending | — |
| Prisma migrate | Safe command | No | Pending | — |
| Seed | Curated deterministic seed | No | Pending | — |
| Graph rebuild | Safe projection rebuild | No | Pending | — |
| Demo reset | Local-only guarded command | No | Pending | — |
| Backend tests | Unit/integration commands | No | Pending | — |
| Frontend tests | Component command | No | Pending | — |
| Playwright | Chrome desktop command | No | Pending | — |
| Postman | Collection/environment guide | No | Pending | — |

Docs phải khớp command thật trong `package.json` và repository.

# 17. GitHub Actions Verification Register

| Workflow/Check | Task owner | Workflow file | Trigger | Permissions | Secrets | Last run | Result | Evidence |
|---|---|---|---|---|---|---|---|---|
| Lint/type | — | — | — | Pending | Pending | — | Pending | — |
| Frontend build | — | — | — | Pending | Pending | — | Pending | — |
| Backend build | — | — | — | Pending | Pending | — | Pending | — |
| Unit tests | — | — | — | Pending | Pending | — | Pending | — |
| Integration tests | — | — | — | Pending | Pending | — | Pending | — |
| Prisma validate | — | — | — | Pending | Pending | — | Pending | — |
| Migration check | — | — | — | Pending | Pending | — | Pending | — |
| Destructive-test guard | — | — | — | Pending | Pending | — | Pending | — |

# 18. Documentation and Release Evidence Register

| Deliverable | Task owner | Status | Verified against repository | Evidence |
|---|---|---|---|---|
| Root README setup | — | Not started | No | — |
| Backend setup/run | — | Not started | No | — |
| Frontend setup/run | — | Not started | No | — |
| Environment variables | — | Not started | No | — |
| Supabase setup | — | Not started | No | — |
| Neo4j AuraDB setup | — | Not started | No | — |
| Google AI/MockAI guide | — | Not started | No | — |
| Prisma generate/migrate | — | Not started | No | — |
| Seed command | — | Not started | No | — |
| Graph rebuild command | — | Not started | No | — |
| Demo reset command | — | Not started | No | — |
| Demo accounts | — | Not started | No | — |
| Demo scripts | — | Not started | No | — |
| Traceability summary | — | Not started | No | — |
| Release checklist | — | Not started | No | — |
| Known limitations | — | Not started | No | — |
| Contingency evidence list | — | Not started | No | — |
| Final smoke report template | — | Not started | No | — |

# 19. Core Epic Technical Progress

## PAC-EPIC-18 — Data Seed & Demo Reset

| Field | Value |
|---|---|
| Jira Key | PAC-18 |
| Exact branch | `epic/PAC-18-epic-18-data-seed-demo-reset` |
| Review branch | `develop` |
| Status | Not started |
| Tasks merged | 0/11 |
| Release Stories PASS | 0/2 |
| Review | Pending |

Checklist:

- [ ] Curated seed complete.
- [ ] Dynamic expiry complete.
- [ ] FEFO scenario complete.
- [ ] Handled HIGH scenario complete.
- [ ] Report-ready data complete.
- [ ] Local-only reset guard PASS.
- [ ] Graph rebuild PASS.
- [ ] Smoke-after-reset PASS.
- [ ] No destructive shared-environment behavior.

## PAC-EPIC-19 — Testing, Smoke Test & Release Readiness

| Field | Value |
|---|---|
| Jira Key | PAC-19 |
| Exact branch | `epic/PAC-19-epic-19-testing-smoke-test-release-readiness` |
| Review branch | `develop` |
| Status | Not started |
| Tasks merged | 0/45 |
| Release Stories PASS | 0/1 |
| Review | Pending |

Checklist:

- [ ] Test infrastructure complete.
- [ ] High-risk regression suites complete.
- [ ] Full MVP smoke PASS.
- [ ] Test isolation/cleanup PASS.
- [ ] Chrome desktop E2E PASS.
- [ ] Basic responsive verification PASS.
- [ ] No destructive tests against shared/demo data.

## PAC-EPIC-20 — DevOps, CI & Setup

| Field | Value |
|---|---|
| Jira Key | PAC-20 |
| Exact branch | `epic/PAC-20-epic-20-devops-ci-setup` |
| Review branch | `develop` |
| Status | Not started |
| Tasks merged | 0/25 |
| Release Stories PASS | 0/1 |
| Review | Pending |

Checklist:

- [ ] Local setup commands verified.
- [ ] GitHub Actions configured.
- [ ] Required CI checks green.
- [ ] Least-privilege permissions.
- [ ] Secret handling PASS.
- [ ] Destructive-test guard PASS.
- [ ] No hidden Docker dependency.

## PAC-EPIC-21 — Documentation & Traceability

| Field | Value |
|---|---|
| Jira Key | PAC-21 |
| Exact branch | `epic/PAC-21-epic-21-documentation-traceability` |
| Review branch | `develop` |
| Status | Not started |
| Tasks merged | 0/20 |
| Release Stories PASS | 0/2 |
| Review | Pending |

Checklist:

- [ ] README/setup docs match repository.
- [ ] Demo scripts complete.
- [ ] Traceability complete.
- [ ] Release checklist complete.
- [ ] Known limitations complete.
- [ ] Contingency evidence complete.
- [ ] Final smoke template complete.
- [ ] Screenshots/video not used as substitute for running product.

# 20. Release Story Acceptance Progress

| Story | Jira Key | Summary | Points | Direct Tasks | Status | Acceptance Review | Evidence | Exact branch | Recommended Jira status |
|---|---|---|---:|---:|---|---|---|---|---|
| US-145 | PAC-185 | Curated MVP seed data | 5 | 3 | Not started | Pending | — | `story/PAC-185-us-145-curated-mvp-seed-data` | TO DO |
| US-146 | PAC-186 | Demo users by role | 3 | 3 | Not started | Pending | — | `story/PAC-186-us-146-demo-users-by-role` | TO DO |
| US-147 | PAC-187 | Dynamic expiry dates for demo | 3 | 1 | Not started | Pending | — | `story/PAC-187-us-147-dynamic-expiry-dates-for-demo` | TO DO |
| US-148 | PAC-188 | FEFO multi-batch demo scenario | 5 | 2 | Not started | Pending | — | `story/PAC-188-us-148-fefo-multi-batch-demo-scenario` | TO DO |
| US-149 | PAC-189 | Seed PAID order with HIGH alert | 5 | 1 | Not started | Pending | — | `story/PAC-189-us-149-seed-paid-order-with-high-alert` | TO DO |
| US-150 | PAC-190 | Local-only demo reset with graph rebuild and smoke test | 5 | 49 | Not started | Pending | — | `story/PAC-190-us-150-local-only-demo-reset-with-graph-rebuild-and-smoke-te` | TO DO |

Release Story review rules:

- Chạy trên latest `develop`.
- Mọi direct child Task phải merge.
- Relevant cross-sprint regression evidence phải có.
- Không tạo Story PR.
- Chỉ PASS khi không còn Blocking/High defect.

# 21. Task Progress Register

| Logical Task | Jira Key | Parent Story | Summary | Exact branch | Status | Commit | PR | Merge SHA | Local Gate | Supabase | Neo4j | CI | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-425 | PAC-635 | US-145 | Create curated MVP seed dataset | `feature/PAC-635-task-425-create-curated-mvp-seed-dataset` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-426 | PAC-636 | US-146 | Seed demo users by role | `feature/PAC-636-task-426-seed-demo-users-by-role` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-427 | PAC-637 | US-146 | Seed first-login demo account | `feature/PAC-637-task-427-seed-first-login-demo-account` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-428 | PAC-638 | US-147 | Generate dynamic expiry dates for demo batches | `feature/PAC-638-task-428-generate-dynamic-expiry-dates-for-demo-batches` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-429 | PAC-639 | US-148 | Seed FEFO multi-batch demo scenario | `feature/PAC-639-task-429-seed-fefo-multi-batch-demo-scenario` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-430 | PAC-640 | US-148 | Seed expired batch excluded from sellable stock | `feature/PAC-640-task-430-seed-expired-batch-excluded-from-sellable-stock` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-431 | PAC-641 | US-149 | Seed PAID order with handled HIGH alert | `feature/PAC-641-task-431-seed-paid-order-with-handled-high-alert` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-432 | PAC-642 | US-145 | Seed report data with PAID, DRAFT, CANCELLED and failed-payment cases | `feature/PAC-642-task-432-seed-report-data-with-paid-draft-cancelled-and-fail` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-433 | PAC-643 | US-150 | Implement demo:reset local-only environment guard | `feature/PAC-643-task-433-implement-demo-reset-local-only-environment-guard` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-434 | PAC-644 | US-150 | Rebuild Neo4j projection during demo reset | `feature/PAC-644-task-434-rebuild-neo4j-projection-during-demo-reset` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-435 | PAC-645 | US-150 | Run smoke tests after demo reset | `test/PAC-645-task-435-run-smoke-tests-after-demo-reset` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-436 | PAC-646 | US-150 | Add backend unit test setup | `test/PAC-646-task-436-add-backend-unit-test-setup` | Technically complete | — | — | 76febfa | Pass | N/A | N/A | Pass | DONE |
| PAC-TASK-437 | PAC-647 | US-150 | Add backend integration test setup with isolated cleanup | `test/PAC-647-task-437-add-backend-integration-test-setup-with-isolated-cl` | Technically complete | d5e4759 | `test/PAC-647...` | d5e4759 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-438 | PAC-648 | US-150 | Add frontend component test setup | `test/PAC-648-task-438-add-frontend-component-test-setup` | Technically complete | be9ac96 | `test/PAC-648...` | be9ac96 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-439 | PAC-649 | US-150 | Add Playwright E2E test setup for Chrome desktop | `test/PAC-649-task-439-add-playwright-e2e-test-setup-for-chrome-desktop` | Technically complete | 898da6a | `test/PAC-649...` | 898da6a | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-440 | PAC-650 | US-150 | Add Postman manual API collection structure | `feature/PAC-650-task-440-add-postman-manual-api-collection-structure` | Technically complete | 4414f4e | `feature/PAC-650...` | 4414f4e | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-441 | PAC-651 | US-01 | Add Auth and RBAC test suite | `test/PAC-651-task-441-add-auth-and-rbac-test-suite` | Technically complete | 2885cac | `test/PAC-651...` | 2885cac | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-442 | PAC-652 | US-10 | Add User Management permission tests | `test/PAC-652-task-442-add-user-management-permission-tests` | Technically complete | 9eb43f6 | `test/PAC-652...` | 9eb43f6 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-443 | PAC-653 | US-13 | Add Medicine Management API tests | `test/PAC-653-task-443-add-medicine-management-api-tests` | Technically complete | 6b58e93 | `test/PAC-653...` | 6b58e93 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-444 | PAC-654 | US-19 | Add ActiveIngredient mapping tests | `test/PAC-654-task-444-add-activeingredient-mapping-tests` | Technically complete | 815151a | `test/PAC-654...` | 815151a | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-445 | PAC-655 | US-23 | Add Supplier Management API tests | `test/PAC-655-task-445-add-supplier-management-api-tests` | Technically complete | 06031ad | `test/PAC-655...` | 06031ad | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-446 | PAC-656 | US-27 | Add MedicineBatch source-of-truth tests | `test/PAC-656-task-446-add-medicinebatch-source-of-truth-tests` | Technically complete | 851cd85 | `test/PAC-656...` | 851cd85 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-447 | PAC-657 | US-32 | Add sellable quantity and expired batch tests | `test/PAC-657-task-447-add-sellable-quantity-and-expired-batch-tests` | Technically complete | e920841 | `test/PAC-657...` | e920841 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-448 | PAC-658 | US-35 | Add near-expiry threshold tests | `test/PAC-658-task-448-add-near-expiry-threshold-tests` | Technically complete | 486913d | `test/PAC-658...` | 486913d | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-449 | PAC-659 | US-44 | Add Stock Import transaction tests | `test/PAC-659-task-449-add-stock-import-transaction-tests` | Technically complete | da0bc9e | `test/PAC-659...` | da0bc9e | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-450 | PAC-660 | US-45 | Add Stock Import batch merge and expiry mismatch tests | `test/PAC-660-task-450-add-stock-import-batch-merge-and-expiry-mismatch-te` | Technically complete | ccedd21 | `test/PAC-660...` | ccedd21 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-451 | PAC-661 | US-52 | Add Inventory Adjustment transaction tests | `test/PAC-661-task-451-add-inventory-adjustment-transaction-tests` | Technically complete | 9ef663b | `test/PAC-661...` | 9ef663b | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-452 | PAC-662 | US-55 | Add Inventory Adjustment audit and reason tests | `test/PAC-662-task-452-add-inventory-adjustment-audit-and-reason-tests` | Technically complete | 9cd85bb | `test/PAC-662...` | 9cd85bb | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-453 | PAC-663 | US-57 | Add POS Draft Order API tests | `test/PAC-663-task-453-add-pos-draft-order-api-tests` | Technically complete | b32d6d3 | `test/PAC-663...` | b32d6d3 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-454 | PAC-664 | US-57 | Add POS Draft Order UI smoke tests | `test/PAC-664-task-454-add-pos-draft-order-ui-smoke-tests` | Technically complete | 796f7d9 | `test/PAC-664...` | 796f7d9 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-455 | PAC-665 | US-65 | Add Staff order ownership tests | `test/PAC-665-task-455-add-staff-order-ownership-tests` | Technically complete | fb159ac | `test/PAC-665...` | fb159ac | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-456 | PAC-666 | US-67 | Add Draft Order cancel status tests | `test/PAC-666-task-456-add-draft-order-cancel-status-tests` | Technically complete | fe86f1b | `test/PAC-666...` | fe86f1b | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-457 | PAC-667 | US-69 | Add DrugInteraction Rule API tests | `test/PAC-667-task-457-add-druginteraction-rule-api-tests` | Technically complete | f0935a7 | `test/PAC-667...` | f0935a7 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-458 | PAC-668 | US-72 | Add ActiveIngredient-derived interaction tests | `test/PAC-668-task-458-add-activeingredient-derived-interaction-tests` | Technically complete | e5cd496 | `test/PAC-668...` | e5cd496 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-459 | PAC-669 | US-74 | Add InteractionAlert persistence tests | `test/PAC-669-task-459-add-interactionalert-persistence-tests` | Technically complete | 49928ca | `test/PAC-669...` | 49928ca | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-460 | PAC-670 | US-76 | Add InteractionAlert display_count tests | `test/PAC-670-task-460-add-interactionalert-display-count-tests` | Technically complete | 75bb2c2 | `test/PAC-670...` | 75bb2c2 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-461 | PAC-671 | US-78 | Add HIGH alert acknowledgement tests | `test/PAC-671-task-461-add-high-alert-acknowledgement-tests` | Technically complete | 283218c | `test/PAC-671...` | 283218c | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-462 | PAC-672 | US-79 | Add HIGH alert consultation note tests | `test/PAC-672-task-462-add-high-alert-consultation-note-tests` | Technically complete | bbccbed | `test/PAC-672...` | bbccbed | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-463 | PAC-673 | US-80 | Add checkout blocker tests for unresolved HIGH alerts | `test/PAC-673-task-463-add-checkout-blocker-tests-for-unresolved-high-aler` | Technically complete | f14a59a | `test/PAC-673...` | f14a59a | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-464 | PAC-674 | US-83 | Add Checkout transaction success tests | `test/PAC-674-task-464-add-checkout-transaction-success-tests` | Technically complete | dd41a9e | `test/PAC-674...` | dd41a9e | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-465 | PAC-675 | US-92 | Add Checkout rollback failure tests | `test/PAC-675-task-465-add-checkout-rollback-failure-tests` | Technically complete | 3f35de7 | `test/PAC-675...` | 3f35de7 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-466 | PAC-676 | US-88 | Add FEFO allocation unit tests | `test/PAC-676-task-466-add-fefo-allocation-unit-tests` | Technically complete | 61dbcb7 | `test/PAC-676...` | 61dbcb7 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-467 | PAC-677 | US-88 | Add FEFO multi-batch allocation tests | `test/PAC-677-task-467-add-fefo-multi-batch-allocation-tests` | Technically complete | 5fa4352 | `test/PAC-677...` | 5fa4352 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-468 | PAC-678 | US-91 | Add Checkout idempotency tests | `test/PAC-678-task-468-add-checkout-idempotency-tests` | Technically complete | e3499c7 | `test/PAC-678...` | e3499c7 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-469 | PAC-679 | US-93 | Add Payment cash handling tests | `test/PAC-679-task-469-add-payment-cash-handling-tests` | Technically complete | 4b65ba1 | `test/PAC-679...` | 4b65ba1 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-470 | PAC-680 | US-96 | Add Payment one SUCCESS rule tests | `test/PAC-680-task-470-add-payment-one-success-rule-tests` | Technically complete | b260a1b | `test/PAC-680...` | b260a1b | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-471 | PAC-681 | US-97 | Add Invoice generation tests | `test/PAC-681-task-471-add-invoice-generation-tests` | Technically complete | cac2c48 | `test/PAC-681...` | cac2c48 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-472 | PAC-682 | US-105 | Add AI Guardrail high-risk test suite | `test/PAC-682-task-472-add-ai-guardrail-high-risk-test-suite` | Technically complete | 1de1f79 | `test/PAC-682...` | 1de1f79 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-473 | PAC-683 | US-114 | Add AI Audit privacy tests | `test/PAC-683-task-473-add-ai-audit-privacy-tests` | Technically complete | 95e61b9 | `test/PAC-683...` | 95e61b9 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-474 | PAC-684 | US-104 | Add AI provider fallback tests | `test/PAC-684-task-474-add-ai-provider-fallback-tests` | Technically complete | fd5f2c0 | `test/PAC-684...` | fd5f2c0 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-475 | PAC-685 | US-117 | Add Graph Sync outbox and retry tests | `test/PAC-685-task-475-add-graph-sync-outbox-and-retry-tests` | Technically complete | e822b09 | `test/PAC-685...` | e822b09 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-476 | PAC-686 | US-119 | Add Neo4j projection tests | `test/PAC-686-task-476-add-neo4j-projection-tests` | Technically complete | aed8789 | `test/PAC-686...` | 7849051 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-477 | PAC-687 | US-127 | Add Graph freshness tests | `test/PAC-687-task-477-add-graph-freshness-tests` | Technically complete | b1e2156 | `test/PAC-687...` | b1e2156 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-478 | PAC-688 | US-132 | Add Graph-RAG fallback tests | `test/PAC-688-task-478-add-graph-rag-fallback-tests` | Technically complete | 6f36d0b | `test/PAC-688...` | 6f36d0b | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-479 | PAC-689 | US-137 | Add Reports deterministic calculation tests | `test/PAC-689-task-479-add-reports-deterministic-calculation-tests` | Technically complete | 6205a48 | `test/PAC-689...` | 6205a48 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-480 | PAC-690 | US-150 | Add full MVP smoke test checklist | `test/PAC-690-task-480-add-full-mvp-smoke-test-checklist` | Technically complete | 2f9b6bb | `test/PAC-690...` | 2f9b6bb | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-481 | PAC-691 | US-150 | Configure local Node.js project setup guide | `feature/PAC-691-task-481-configure-local-node-js-project-setup-guide` | Technically complete | ffeb048 | `feature/PAC-6...` | ffeb048 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-482 | PAC-692 | US-150 | Configure frontend environment variables guide | `feature/PAC-692-task-482-configure-frontend-environment-variables-guide` | Technically complete | 8a0bbf5 | `feature/PAC-6...` | 8a0bbf5 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-483 | PAC-693 | US-150 | Configure backend environment variables guide | `feature/PAC-693-task-483-configure-backend-environment-variables-guide` | Technically complete | f48b3ea | `feature/PAC-6...` | f48b3ea | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-484 | PAC-694 | US-150 | Configure Supabase project setup instructions | `feature/PAC-694-task-484-configure-supabase-project-setup-instructions` | Technically complete | 7f578b6 | `feature/PAC-6...` | 7f578b6 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-485 | PAC-695 | US-150 | Configure Neo4j AuraDB setup instructions | `feature/PAC-695-task-485-configure-neo4j-auradb-setup-instructions` | Technically complete | 68fa1ae | `feature/PAC-6...` | 68fa1ae | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-486 | PAC-696 | US-142 | Configure Google AI API key setup instructions | `feature/PAC-696-task-486-configure-google-ai-api-key-setup-instructions` | Technically complete | a7f4c0e | `feature/PAC-6...` | a7f4c0e | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-487 | PAC-697 | US-104 | Configure MockAI fallback setup instructions | `feature/PAC-697-task-487-configure-mockai-fallback-setup-instructions` | Technically complete | b83e9c5 | `feature/PAC-6...` | b83e9c5 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-488 | PAC-698 | US-150 | Add Prisma generate and migrate setup command | `feature/PAC-698-task-488-add-prisma-generate-and-migrate-setup-command` | Technically complete | 2e29af1 | `feature/PAC-6...` | 2e29af1 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-489 | PAC-699 | US-145 | Add seed command for curated MVP data | `feature/PAC-699-task-489-add-seed-command-for-curated-mvp-data` | Technically complete | 71c27bf | `feature/PAC-6...` | 71c27bf | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-490 | PAC-700 | US-150 | Add graph projection rebuild command | `feature/PAC-700-task-490-add-graph-projection-rebuild-command` | Technically complete | 4cc12a7 | `feature/PAC-7...` | 4cc12a7 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-491 | PAC-701 | US-150 | Add demo reset command entrypoint | `feature/PAC-701-task-491-add-demo-reset-command-entrypoint` | Technically complete | 230b0fe | `feature/PAC-7...` | 230b0fe | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-492 | PAC-702 | US-150 | Add demo reset environment safety checks | `feature/PAC-702-task-492-add-demo-reset-environment-safety-checks` | Technically complete | 09e3318 | `feature/PAC-7...` | 09e3318 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-493 | PAC-703 | US-150 | Configure GitHub Actions lint check | `feature/PAC-703-task-493-configure-github-actions-lint-check` | Technically complete | f9de728 | `feature/PAC-7...` | f9de728 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-494 | PAC-704 | US-150 | Configure GitHub Actions type check | `feature/PAC-704-task-494-configure-github-actions-type-check` | Technically complete | 804a565 | `feature/PAC-7...` | 804a565 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-495 | PAC-705 | US-150 | Configure GitHub Actions frontend build | `feature/PAC-705-task-495-configure-github-actions-frontend-build` | Technically complete | 0d2863c | `feature/PAC-7...` | 0d2863c | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-496 | PAC-706 | US-150 | Configure GitHub Actions backend build | `feature/PAC-706-task-496-configure-github-actions-backend-build` | Technically complete | 0269dbe | `feature/PAC-7...` | 0269dbe | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-497 | PAC-707 | US-150 | Configure GitHub Actions unit test check | `test/PAC-707-task-497-configure-github-actions-unit-test-check` | Technically complete | 6f38408 | `test/PAC-7...` | 6f38408 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-498 | PAC-708 | US-150 | Configure GitHub Actions integration test check | `test/PAC-708-task-498-configure-github-actions-integration-test-check` | Technically complete | 3cf45ff | `test/PAC-7...` | 3cf45ff | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-499 | PAC-709 | US-150 | Configure Prisma schema validation check | `feature/PAC-709-task-499-configure-prisma-schema-validation-check` | Technically complete | 4746b91 | `feature/PAC-7...` | 4746b91 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-500 | PAC-710 | US-150 | Configure Prisma migration check | `feature/PAC-710-task-500-configure-prisma-migration-check` | Technically complete | ffd0d57 | `feature/PAC-7...` | ffd0d57 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-501 | PAC-711 | US-150 | Add CI guard to prevent destructive tests against demo database | `test/PAC-711-task-501-add-ci-guard-to-prevent-destructive-tests-against-d` | Technically complete | 093d613 | `test/PAC-7...` | 093d613 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-502 | PAC-712 | US-150 | Add CI branch protection expectation notes | `feature/PAC-712-task-502-add-ci-branch-protection-expectation-notes` | Technically complete | 3496410 | `feature/PAC-7...` | 3496410 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-503 | PAC-713 | US-150 | Add local-only guard for demo:reset script | `feature/PAC-713-task-503-add-local-only-guard-for-demo-reset-script` | Technically complete | 4844f1b | `feature/PAC-7...` | 4844f1b | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-504 | PAC-714 | US-150 | Add Chrome desktop target verification checklist | `feature/PAC-714-task-504-add-chrome-desktop-target-verification-checklist` | Technically complete | 211e48e | `feature/PAC-7...` | 211e48e | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-505 | PAC-715 | US-150 | Add basic responsive verification checklist | `feature/PAC-715-task-505-add-basic-responsive-verification-checklist` | Technically complete | 3a26b0b | `feature/PAC-7...` | 3a26b0b | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-506 | PAC-716 | US-150 | Write project README setup section | `docs/PAC-716-task-506-write-project-readme-setup-section` | Technically complete | 6da916d | `docs/PAC-7...` | 6da916d | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-507 | PAC-717 | US-150 | Write backend setup and run instructions | `feature/PAC-717-task-507-write-backend-setup-and-run-instructions` | Technically complete | c633f0b | `feature/PAC-7...` | c633f0b | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-508 | PAC-718 | US-150 | Write frontend setup and run instructions | `feature/PAC-718-task-508-write-frontend-setup-and-run-instructions` | Technically complete | 84e20e2 | `feature/PAC-7...` | 84e20e2 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-509 | PAC-719 | US-150 | Write database migration and seed instructions | `feature/PAC-719-task-509-write-database-migration-and-seed-instructions` | Technically complete | e803c49 | `feature/PAC-7...` | e803c49 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-510 | PAC-720 | US-150 | Write Supabase Auth setup notes | `feature/PAC-720-task-510-write-supabase-auth-setup-notes` | Technically complete | 1aab10d | `feature/PAC-7...` | 1aab10d | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-511 | PAC-721 | US-150 | Write Neo4j setup and graph rebuild notes | `feature/PAC-721-task-511-write-neo4j-setup-and-graph-rebuild-notes` | Technically complete | 06c7515 | `feature/PAC-7...` | 06c7515 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-512 | PAC-722 | US-142 | Write AI provider and MockAI fallback setup notes | `feature/PAC-722-task-512-write-ai-provider-and-mockai-fallback-setup-notes` | Technically complete | 5adf525 | `feature/PAC-7...` | 5adf525 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-513 | PAC-723 | US-146 | Write demo account guide | `feature/PAC-723-task-513-write-demo-account-guide` | Technically complete | a4fa85b | `feature/PAC-7...` | a4fa85b | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-514 | PAC-724 | US-150 | Write demo scenario script for login and role switching | `feature/PAC-724-task-514-write-demo-scenario-script-for-login-and-role-switc` | Technically complete | 9c6837e | `feature/PAC-7...` | 9c6837e | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-515 | PAC-725 | US-150 | Write demo scenario script for Stock Import and MedicineBatch | `feature/PAC-725-task-515-write-demo-scenario-script-for-stock-import-and-med` | Technically complete | 83fd268 | `feature/PAC-7...` | 83fd268 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-516 | PAC-726 | US-150 | Write demo scenario script for POS and Checkout | `feature/PAC-726-task-516-write-demo-scenario-script-for-pos-and-checkout` | Technically complete | 35695da | `feature/PAC-7...` | 35695da | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-517 | PAC-727 | US-150 | Write demo scenario script for InteractionAlert and HIGH note | `feature/PAC-727-task-517-write-demo-scenario-script-for-interactionalert-and` | Technically complete | 3674e9e | `feature/PAC-7...` | 3674e9e | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-518 | PAC-728 | US-150 | Write demo scenario script for AI Copilot and AI Audit | `feature/PAC-728-task-518-write-demo-scenario-script-for-ai-copilot-and-ai-au` | Technically complete | 12df48f | `feature/PAC-7...` | 12df48f | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-519 | PAC-729 | US-150 | Write demo scenario script for Graph Sync and Graph-RAG | `feature/PAC-729-task-519-write-demo-scenario-script-for-graph-sync-and-graph` | Technically complete | 467e39c | `feature/PAC-7...` | 467e39c | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-520 | PAC-730 | US-150 | Write demo scenario script for Reports and Settings | `feature/PAC-730-task-520-write-demo-scenario-script-for-reports-and-settings` | Technically complete | c7a4df5 | `feature/PAC-7...` | c7a4df5 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-521 | PAC-731 | US-150 | Write MVP traceability matrix summary | `feature/PAC-731-task-521-write-mvp-traceability-matrix-summary` | Technically complete | 5b6d7ae | `feature/PAC-7...` | 5b6d7ae | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-522 | PAC-732 | US-150 | Write release/demo readiness checklist | `feature/PAC-732-task-522-write-release-demo-readiness-checklist` | Technically complete | 5598130 | `feature/PAC-7...` | 5598130 | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-523 | PAC-733 | US-150 | Write known limitations and out-of-scope guard section | `feature/PAC-733-task-523-write-known-limitations-and-out-of-scope-guard-sect` | Technically complete | 95ceeca | `feature/PAC-7...` | 95ceeca | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-524 | PAC-734 | US-150 | Prepare contingency evidence screenshots list | `feature/PAC-734-task-524-prepare-contingency-evidence-screenshots-list` | Technically complete | 46ec0ec | `feature/PAC-7...` | 46ec0ec | PASS | N/A | N/A | N/A | Done |
| PAC-TASK-525 | PAC-735 | US-150 | Prepare final smoke test report template | `test/PAC-735-task-525-prepare-final-smoke-test-report-template` | Technically complete | 14cf90c | `feature/PAC-7...` | 14cf90c | PASS | N/A | N/A | N/A | Done |

Status values:

```text
Not started
In progress
Ready for merge
Technically complete
Blocked
Failed verification
N/A
```

Chỉ ghi `Technically complete` khi PR đã merge và merge SHA xuất hiện trên remote `develop`.

# 22. Technical Phase Progress

| Phase | Technical order | Status | Completion | Evidence |
|---|---|---|---:|---|
| Phase 1 — Testing Foundation | PAC-TASK-436 → PAC-TASK-437 → PAC-TASK-438 → PAC-TASK-439 → PAC-TASK-440 | Not started | 0/5 | — |
| Phase 2 — Curated Demo Data | PAC-TASK-425 → PAC-TASK-426 → PAC-TASK-427 → PAC-TASK-428 → PAC-TASK-429 → PAC-TASK-430 → PAC-TASK-431 → PAC-TASK-432 | Not started | 0/8 | — |
| Phase 3 — Local Demo Reset and Graph Rebuild | PAC-TASK-433 → PAC-TASK-434 | Not started | 0/2 | — |
| Phase 4 — High-risk and Cross-sprint Regression Testing | PAC-TASK-441 → PAC-TASK-442 → PAC-TASK-443 → PAC-TASK-444 → PAC-TASK-445 → PAC-TASK-446 → PAC-TASK-447 → PAC-TASK-448 → PAC-TASK-449 → PAC-TASK-450 → PAC-TASK-451 → PAC-TASK-452 → PAC-TASK-453 → PAC-TASK-454 → PAC-TASK-455 → PAC-TASK-456 → PAC-TASK-457 → PAC-TASK-458 → PAC-TASK-459 → PAC-TASK-460 → PAC-TASK-461 → PAC-TASK-462 → PAC-TASK-463 → PAC-TASK-464 → PAC-TASK-465 → PAC-TASK-466 → PAC-TASK-467 → PAC-TASK-468 → PAC-TASK-469 → PAC-TASK-470 → PAC-TASK-471 → PAC-TASK-472 → PAC-TASK-473 → PAC-TASK-474 → PAC-TASK-475 → PAC-TASK-476 → PAC-TASK-477 → PAC-TASK-478 → PAC-TASK-479 | Not started | 0/39 | — |
| Phase 5 — Full MVP Smoke after Reset | PAC-TASK-480 → PAC-TASK-435 | Not started | 0/2 | — |
| Phase 6 — Local Setup and Operational Commands | PAC-TASK-481 → PAC-TASK-482 → PAC-TASK-483 → PAC-TASK-484 → PAC-TASK-485 → PAC-TASK-486 → PAC-TASK-487 → PAC-TASK-488 → PAC-TASK-489 → PAC-TASK-490 → PAC-TASK-491 → PAC-TASK-492 | Not started | 0/12 | — |
| Phase 7 — GitHub Actions and CI Safety | PAC-TASK-493 → PAC-TASK-494 → PAC-TASK-495 → PAC-TASK-496 → PAC-TASK-497 → PAC-TASK-498 → PAC-TASK-499 → PAC-TASK-500 → PAC-TASK-501 → PAC-TASK-502 → PAC-TASK-503 → PAC-TASK-504 → PAC-TASK-505 | Not started | 0/13 | — |
| Phase 8 — Documentation and Release Readiness | PAC-TASK-506 → PAC-TASK-507 → PAC-TASK-508 → PAC-TASK-509 → PAC-TASK-510 → PAC-TASK-511 → PAC-TASK-512 → PAC-TASK-513 → PAC-TASK-514 → PAC-TASK-515 → PAC-TASK-516 → PAC-TASK-517 → PAC-TASK-518 → PAC-TASK-519 → PAC-TASK-520 → PAC-TASK-521 → PAC-TASK-522 → PAC-TASK-523 → PAC-TASK-524 → PAC-TASK-525 | Not started | 0/20 | — |

# 23. Prisma, Seed and Migration Register

| Change | Task | Branch | Migration/seed file | Prisma validate | Prisma generate | Controlled apply | Idempotency | Cleanup/rollback | Result |
|---|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | Pending | Pending | Pending/N/A | Pending/N/A | — | Pending |

# 24. Test Isolation and Cleanup Register

| Suite/Task | Data target | Isolation strategy | Cleanup strategy | Shared/demo guard | Result | Evidence |
|---|---|---|---|---|---|---|
| Chưa có | — | — | — | Pending | Pending | — |

Rules:

- Không dùng destructive global cleanup trên demo/staging/production.
- Cleanup chỉ xóa dữ liệu test có namespace/identifier rõ.
- Failure không để lại dirty state.
- Integration tests phải tái lập được.

# 25. Findings Register

| Finding ID | Severity | Phase/Task/Story/Epic | Finding | Evidence | Required action | Owner | Status |
|---|---|---|---|---|---|---|---|
| S10-FIND-001 | — | — | Chưa có | — | — | — | Open |

Severity:

```text
Blocker
High
Medium
Low
Observation
```

Không xóa finding; khi resolved phải cập nhật evidence và status.

# 26. Bug Candidate Register

AI không tự tạo Jira Bug Key.

| Candidate ID | Severity | Affected scope | Summary | Evidence | Jira Bug Key required | Status |
|---|---|---|---|---|---|---|
| S10-BUG-CAND-001 | — | — | Chưa có | — | No | Open |

Mẫu:

```text
Bug Candidate:
Severity:
Affected Task/Story/Epic:
Actual:
Expected:
Evidence:
Suggested fix scope:
```

# 27. Manual Jira Update Queue

| Logical Issue | Jira Key | Recommended status | Technical evidence | Project Owner action | Status |
|---|---|---|---|---|---|
| Chưa có | — | — | — | — | Pending |

AI chỉ đề xuất; Project Owner thực hiện Jira write actions.

# 28. Session Handoff

| Field | Current value |
|---|---|
| Current phase | Prepared |
| Current Task | PAC-TASK-475 |
| Current Jira Key | PAC-685 |
| Current exact branch | `test/PAC-685-task-475-add-graph-sync-outbox-and-retry-tests` |
| Current PR | Merged |
| Last merged Task | PAC-TASK-475 |
| Last merge SHA | e822b09 |
| Next Task | PAC-TASK-476 |
| Next Jira Key | PAC-686 |
| Next exact branch | `test/PAC-686-task-476-add-neo4j-projection-tests` |
| CI state | N/A — GitHub Actions chưa được cấu hình |
| Blockers | Sprint 9 Final Review and Sprint 10 Audit pending |

Technical order bắt đầu bằng Testing Foundation để xác nhận test infrastructure trước khi mở rộng seed/reset và regression suites.

# 29. Sprint Final Review Checklist

- [ ] 101/101 Tasks verified.
- [ ] 101/101 applicable PRs merged.
- [ ] 6/6 Release Story Reviews PASS.
- [ ] 4/4 Core Epic Reviews PASS.
- [ ] 111/111 canonical branches reconciled.
- [ ] Curated seed PASS.
- [ ] Dynamic expiry PASS.
- [ ] FEFO and HIGH-alert demo scenarios PASS.
- [ ] Demo reset local guard PASS.
- [ ] Neo4j rebuild/freshness PASS.
- [ ] Smoke-after-reset PASS.
- [ ] Backend unit/integration infrastructure PASS.
- [ ] Frontend component tests PASS.
- [ ] Chrome desktop Playwright PASS.
- [ ] Postman collection verified.
- [ ] High-risk regression suites PASS.
- [ ] Full MVP smoke PASS.
- [ ] Basic responsive checks PASS.
- [ ] GitHub Actions configured and green.
- [ ] CI destructive-test guard PASS.
- [ ] Prisma/migrations PASS.
- [ ] Controlled Supabase/Neo4j evidence PASS.
- [ ] Setup commands verified.
- [ ] Documentation matches repository.
- [ ] Release evidence complete.
- [ ] Blocking defects = 0.
- [ ] High defects = 0.
- [ ] Sprint 10 Final Review PASS.
- [ ] Ready for MVP Release = Yes.

# 30. Final Progress Report Template

```markdown
# Sprint 10 Progress Report

## Status

- Sprint 9 Final Review: PASS/FAIL/Pending
- Sprint 10 Audit: PASS/FAIL/Pending
- Ready to implement Sprint 10: Yes/No
- Tasks complete: x/101
- Release Stories PASS: x/6
- Core Epic Reviews: x/4
- Blocking findings: x
- High findings: x
- Ready for MVP Release: Yes/No

## Evidence

- Latest develop SHA:
- Last merged Task:
- Last PR:
- Seed:
- Dynamic expiry:
- Demo reset:
- Neo4j rebuild/freshness:
- High-risk tests:
- Full smoke:
- Chrome desktop E2E:
- CI workflows/checks:
- Prisma/Supabase:
- Neo4j:
- Setup:
- Documentation:
- Local Quality Gate:
- CI state:

## Next

- Next Task:
- Jira Key:
- Exact branch:
- Blocker/owner action:
```

# 31. Current Official State

```text
Sprint 9 implementation = Completed
Sprint 9 Final Review = Completed
Sprint 10 plan = Prepared
Sprint 10 progress tracker = Prepared
Sprint 10 audit = Pending
Sprint 10 agent prompt = Created
Sprint 10 final review prompt = Pending
Ready to implement Sprint 10 = Completed
Ready for MVP Release = In progress

CI = N/A — GitHub Actions chưa được cấu hình
Quality Gate = Local Quality Gate
```
