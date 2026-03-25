# Sprint 6 Progress — PharmaAssist AI Intelligence

> Technical progress tracker for the official lean workflow.
>
> Repository path:
>
> `work-context/sprint-6/sprint-6-progress.md`

## Canonical Branch Source

`Jira/branch-on-jira.md` là file cuối cùng và chính thức cho toàn bộ Jira Key, Logical Key và exact branch name của Sprint 6.

Quy tắc sử dụng:

1. Sao chép nguyên văn branch từ cột **“Nhánh Git tương ứng”**.
2. Không tự rút gọn, đổi chữ hoa/thường hoặc thay branch slug.
3. Task/Bug PR luôn target `develop`.
4. Story/Epic branch chỉ giữ cho legacy/traceability; không tạo Story PR hoặc Epic PR.
5. Chỉ Project Owner được merge `develop → main`.
6. Sprint 6 Audit phải xác minh branch thực tế trên GitHub; mismatch là blocker và không được tự tạo branch thay thế.


> Jira is managed manually by the Project Owner. This file records technical evidence and recommended Jira status only.

---

# 1. Sprint Information

| Mục | Nội dung |
|---|---|
| Sprint | Sprint 6 |
| Tên Sprint | Checkout, FEFO, Payment & Invoice |
| Business Epic | PAC-EPIC-11 |
| User Story | US-83 → US-98 |
| Số User Story | 16 |
| Task | PAC-TASK-259 → PAC-TASK-290 |
| Số Task | 32 |
| Implementation branches | 32 Task branches |
| Legacy/traceability branches | 16 Story branches + 1 Epic branch |
| Task/Bug PR target | `develop` |
| Story PR | Not required |
| Epic PR | Not required |
| AI Task/Bug merge | Enabled after Merge Gate PASS |
| Jira management | Manual by Project Owner |
| Release merge | `develop → main` by Project Owner only |
| Current phase | Prepared |
| Ready to implement Sprint 6 | No |
| Ready for release | No |

---

# 2. Official Workflow

```text
Task/Bug branch
→ code
→ targeted tests
→ Supabase verification when persistent data is affected
→ commit + push
→ PR into develop
→ CI/diff/scope/conflict gate
→ AI merge into develop
→ update technical progress
→ continue next Task
```

Story completion: Acceptance Review on latest `develop`.

Epic completion: Integration/Regression Review on latest `develop`.

Release: Project Owner reviews and merges `develop → main` after Sprint Final Review PASS.

## Jira ownership

- AI does not transition Jira issues, add Jira comments or create Jira Bugs.
- AI records `Recommended Jira status` and Bug candidates.
- Project Owner performs all Jira write actions.

---

# 3. Progress Update Cadence

AI updates this file only:

1. after a Task/Bug PR is merged or blocked;
2. after a Story Acceptance Review;
3. after an Epic Integration/Regression Review;
4. at the end of a work session or interruption checkpoint;
5. after Sprint Final Review.

Do not update this file after every intermediate command, checkout, test line or CI poll.

---

# 4. Sprint Summary

| Hạng mục | Tổng | Not started | In progress | Ready for merge | Technically complete |
|---|---:|---:|---:|---:|---:|
| Epic technical review | 1 | 1 | 0 | 0 | 0 |
| Story acceptance review | 16 | 16 | 0 | 0 | 0 |
| Task implementation | 32 | 32 | 0 | 0 | 0 |
| Bug candidates | 0 | 0 | 0 | 0 | 0 |

## Completion counters

- [ ] 32/32 Task implementation branches used.
- [ ] 32/32 Task/Bug PRs merged into `develop`.
- [ ] 16/16 Story Acceptance Reviews PASS.
- [ ] 1/1 Epic Integration/Regression Review PASS.
- [ ] Sprint Final Review PASS.
- [ ] No unresolved Blocking/High technical defect.
- [ ] Ready for release = Yes.

---

# 5. Tool and Environment Evidence

| Tool/Area | Status | Required for | Evidence |
|---|---|---|---|
| GitHub/Git | Pending | Task/Bug branch, PR, CI, merge | — |
| Supabase MCP | Pending | Persistent-data verification only | — |
| Safe Supabase environment | Pending | Write-based data tests | — |
| Jira | Project Owner managed | Manual status/comment/Bug updates | AI write actions disabled |

---

# 6. Supabase Test Run Log

Only create a Test Run when the work affects persistent data, schema, migration, transaction, authorization data, inventory, Payment, Invoice, InteractionAlert or idempotency.

| Test Run ID | Environment | Story/Task | Scenario | Fixture IDs | Pre-test Evidence | Post-test Evidence | Rollback | Cleanup | Result |
|---|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | — | — | Pending |

Suggested format:

```text
S6-<STORY>-<TASK>-<timestamp-or-uuid>
```

For non-persistent Tasks:

```text
Supabase verification = N/A — no persistent data impact
```

---

# 7. Epic Technical Progress

- **Logical Epic:** `PAC-EPIC-11`
- **Jira Key:** `PAC-11`
- **Legacy Epic branch:** `epic/PAC-11-epic-11-checkout-fefo-payment-invoice`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

| Epic | Technical status | Stories PASS | Integration/Regression Review | Full test evidence | Prisma/Migration | Supabase evidence | Blocking defects | Recommended Jira status | User Jira confirmation |
|---|---|---:|---|---|---|---|---|---|---|
| PAC-EPIC-11 | Not started | 0/16 | Pending | Pending | Pending | Pending | — | TO DO | — |

## Epic completion checklist

- [ ] 16/16 Story Acceptance Reviews PASS on `develop`.
- [ ] Epic Integration/Regression Review PASS on latest `develop`.
- [ ] Full backend/frontend tests and builds PASS as configured.
- [ ] Prisma validate/generate and migration verification PASS.
- [ ] Supabase Epic scenarios PASS when applicable.
- [ ] No unresolved Blocking/High technical defect.
- [ ] No Epic PR created.
- [ ] Recommended Jira status recorded for Project Owner.

---

# US-83 — Checkout API transaction

- **Jira Key:** `PAC-122`
- **Legacy Story branch:** `story/PAC-122-us-83-checkout-api-transaction`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Integration tests | Supabase evidence | Blocking defects | Recommended Jira status | User Jira confirmation |
|---|---:|---|---|---|---|---|---|
| Not started | 0/6 | Pending | Pending | Pending/N/A | — | TO DO | — |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-259 — Define Checkout DTO and validation schema | `PAC-469` | Not started | `feature/PAC-469-task-259-define-checkout-dto-and-validation-schema` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |
| PAC-TASK-260 — Implement CheckoutController POST /checkout | `PAC-470` | DONE | `feature/PAC-470-task-260-implement-checkoutcontroller-post-checkout` | `754dafe` | `#777` | `develop` | Merged | PASS | N/A | — | TO DO |
| PAC-TASK-261 — Implement CheckoutService transaction skeleton | `PAC-471` | Not started | `feature/PAC-471-task-261-implement-checkoutservice-transaction-skeleton` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |
| PAC-TASK-266 — Build Checkout full page or full-height panel UI | `PAC-476` | Not started | `feature/PAC-476-task-266-build-checkout-full-page-or-full-height-panel-ui` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |
| PAC-TASK-288 — Update order status to PAID only after successful checkout | `PAC-498` | Not started | `feature/PAC-498-task-288-update-order-status-to-paid-only-after-successful-c` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |
| PAC-TASK-289 — Add checkout integration tests | `PAC-499` | Not started | `test/PAC-499-task-289-add-checkout-integration-tests` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |

## Story completion checklist

- [ ] All child Task PRs merged into `develop`.
- [ ] Every Task has correct Jira Key in commit and PR evidence.
- [ ] Targeted tests PASS for every Task.
- [ ] Supabase evidence exists only where persistent data is affected; otherwise valid N/A.
- [ ] Story Acceptance Review runs on latest `develop`.
- [ ] Story acceptance criteria PASS.
- [ ] Story-level integration tests PASS.
- [ ] No Blocking technical defect.
- [ ] No Story PR created.
- [ ] Recommended Jira status recorded.

---

# US-84 — Checkout actor permission and ownership

- **Jira Key:** `PAC-123`
- **Legacy Story branch:** `story/PAC-123-us-84-checkout-validation-pipeline`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Integration tests | Supabase evidence | Blocking defects | Recommended Jira status | User Jira confirmation |
|---|---:|---|---|---|---|---|---|
| Not started | 0/1 | Pending | Pending | Pending/N/A | — | TO DO | — |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-262 — Validate checkout actor permission and order ownership | `PAC-472` | Not started | `feature/PAC-472-task-262-validate-checkout-actor-permission-and-order-owners` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |

## Story completion checklist

- [ ] All child Task PRs merged into `develop`.
- [ ] Every Task has correct Jira Key in commit and PR evidence.
- [ ] Targeted tests PASS for every Task.
- [ ] Supabase evidence exists only where persistent data is affected; otherwise valid N/A.
- [ ] Story Acceptance Review runs on latest `develop`.
- [ ] Story acceptance criteria PASS.
- [ ] Story-level integration tests PASS.
- [ ] No Blocking technical defect.
- [ ] No Story PR created.
- [ ] Recommended Jira status recorded.

---

# US-85 — Checkout only Draft Order

- **Jira Key:** `PAC-124`
- **Legacy Story branch:** `story/PAC-124-us-85-validate-order-status-draft`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Integration tests | Supabase evidence | Blocking defects | Recommended Jira status | User Jira confirmation |
|---|---:|---|---|---|---|---|---|
| Not started | 0/1 | Pending | Pending | Pending/N/A | — | TO DO | — |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-263 — Validate order exists and status is DRAFT | `PAC-473` | Not started | `feature/PAC-473-task-263-validate-order-exists-and-status-is-draft` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |

## Story completion checklist

- [ ] All child Task PRs merged into `develop`.
- [ ] Every Task has correct Jira Key in commit and PR evidence.
- [ ] Targeted tests PASS for every Task.
- [ ] Supabase evidence exists only where persistent data is affected; otherwise valid N/A.
- [ ] Story Acceptance Review runs on latest `develop`.
- [ ] Story acceptance criteria PASS.
- [ ] Story-level integration tests PASS.
- [ ] No Blocking technical defect.
- [ ] No Story PR created.
- [ ] Recommended Jira status recorded.

---

# US-86 — Validate HIGH alerts before payment

- **Jira Key:** `PAC-125`
- **Legacy Story branch:** `story/PAC-125-us-86-validate-unresolved-high-alerts`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Integration tests | Supabase evidence | Blocking defects | Recommended Jira status | User Jira confirmation |
|---|---:|---|---|---|---|---|---|
| Not started | 0/1 | Pending | Pending | Pending/N/A | — | TO DO | — |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-264 — Validate unresolved HIGH alerts before payment | `PAC-474` | Not started | `feature/PAC-474-task-264-validate-unresolved-high-alerts-before-payment` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |

## Story completion checklist

- [ ] All child Task PRs merged into `develop`.
- [ ] Every Task has correct Jira Key in commit and PR evidence.
- [ ] Targeted tests PASS for every Task.
- [ ] Supabase evidence exists only where persistent data is affected; otherwise valid N/A.
- [ ] Story Acceptance Review runs on latest `develop`.
- [ ] Story acceptance criteria PASS.
- [ ] Story-level integration tests PASS.
- [ ] No Blocking technical defect.
- [ ] No Story PR created.
- [ ] Recommended Jira status recorded.

---

# US-87 — Validate stock inside checkout transaction

- **Jira Key:** `PAC-126`
- **Legacy Story branch:** `story/PAC-126-us-87-validate-sellable-stock-truoc-checkout`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Integration tests | Supabase evidence | Blocking defects | Recommended Jira status | User Jira confirmation |
|---|---:|---|---|---|---|---|---|
| Not started | 0/1 | Pending | Pending | Pending/N/A | — | TO DO | — |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-265 — Validate sellable stock inside checkout transaction | `PAC-475` | Not started | `feature/PAC-475-task-265-validate-sellable-stock-inside-checkout-transaction` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |

## Story completion checklist

- [ ] All child Task PRs merged into `develop`.
- [ ] Every Task has correct Jira Key in commit and PR evidence.
- [ ] Targeted tests PASS for every Task.
- [ ] Supabase evidence exists only where persistent data is affected; otherwise valid N/A.
- [ ] Story Acceptance Review runs on latest `develop`.
- [ ] Story acceptance criteria PASS.
- [ ] Story-level integration tests PASS.
- [ ] No Blocking technical defect.
- [ ] No Story PR created.
- [ ] Recommended Jira status recorded.

---

# US-88 — FEFO allocation

- **Jira Key:** `PAC-128`
- **Legacy Story branch:** `story/PAC-128-us-88-fefo-allocation-service`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Integration tests | Supabase evidence | Blocking defects | Recommended Jira status | User Jira confirmation |
|---|---:|---|---|---|---|---|---|
| Not started | 0/6 | Pending | Pending | Pending/N/A | — | TO DO | — |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-268 — Define FEFO allocation input/output model | `PAC-478` | Not started | `feature/PAC-478-task-268-define-fefo-allocation-input-output-model` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |
| PAC-TASK-269 — Query sellable MedicineBatch for FEFO | `PAC-479` | Not started | `feature/PAC-479-task-269-query-sellable-medicinebatch-for-fefo` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |
| PAC-TASK-270 — Sort FEFO batches by nearest expiry date | `PAC-480` | Not started | `feature/PAC-480-task-270-sort-fefo-batches-by-nearest-expiry-date` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |
| PAC-TASK-271 — Allocate requested quantity across multiple batches | `PAC-481` | Not started | `feature/PAC-481-task-271-allocate-requested-quantity-across-multiple-batches` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |
| PAC-TASK-272 — Reject FEFO allocation when sellable stock is insufficient | `PAC-482` | Not started | `feature/PAC-482-task-272-reject-fefo-allocation-when-sellable-stock-is-insuf` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |
| PAC-TASK-290 — Add FEFO, idempotency and rollback tests | `PAC-500` | Not started | `test/PAC-500-task-290-add-fefo-idempotency-and-rollback-tests` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |

## Story completion checklist

- [ ] All child Task PRs merged into `develop`.
- [ ] Every Task has correct Jira Key in commit and PR evidence.
- [ ] Targeted tests PASS for every Task.
- [ ] Supabase evidence exists only where persistent data is affected; otherwise valid N/A.
- [ ] Story Acceptance Review runs on latest `develop`.
- [ ] Story acceptance criteria PASS.
- [ ] Story-level integration tests PASS.
- [ ] No Blocking technical defect.
- [ ] No Story PR created.
- [ ] Recommended Jira status recorded.

---

# US-89 — Persist Order batch allocations

- **Jira Key:** `PAC-129`
- **Legacy Story branch:** `story/PAC-129-us-89-multi-batch-allocation-persistence`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Integration tests | Supabase evidence | Blocking defects | Recommended Jira status | User Jira confirmation |
|---|---:|---|---|---|---|---|---|
| Not started | 0/2 | Pending | Pending | Pending/N/A | — | TO DO | — |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-273 — Create order_batch_allocations Prisma model | `PAC-483` | Not started | `feature/PAC-483-task-273-create-order-batch-allocations-prisma-model` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |
| PAC-TASK-274 — Persist order_batch_allocations during checkout | `PAC-484` | Not started | `feature/PAC-484-task-274-persist-order-batch-allocations-during-checkout` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |

## Story completion checklist

- [ ] All child Task PRs merged into `develop`.
- [ ] Every Task has correct Jira Key in commit and PR evidence.
- [ ] Targeted tests PASS for every Task.
- [ ] Supabase evidence exists only where persistent data is affected; otherwise valid N/A.
- [ ] Story Acceptance Review runs on latest `develop`.
- [ ] Story acceptance criteria PASS.
- [ ] Story-level integration tests PASS.
- [ ] No Blocking technical defect.
- [ ] No Story PR created.
- [ ] Recommended Jira status recorded.

---

# US-90 — Deduct MedicineBatch in checkout

- **Jira Key:** `PAC-130`
- **Legacy Story branch:** `story/PAC-130-us-90-tru-batch-quantity-trong-transaction`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Integration tests | Supabase evidence | Blocking defects | Recommended Jira status | User Jira confirmation |
|---|---:|---|---|---|---|---|---|
| Not started | 0/1 | Pending | Pending | Pending/N/A | — | TO DO | — |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-275 — Deduct MedicineBatch quantities inside checkout transaction | `PAC-485` | Not started | `feature/PAC-485-task-275-deduct-medicinebatch-quantities-inside-checkout-tra` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |

## Story completion checklist

- [ ] All child Task PRs merged into `develop`.
- [ ] Every Task has correct Jira Key in commit and PR evidence.
- [ ] Targeted tests PASS for every Task.
- [ ] Supabase evidence exists only where persistent data is affected; otherwise valid N/A.
- [ ] Story Acceptance Review runs on latest `develop`.
- [ ] Story acceptance criteria PASS.
- [ ] Story-level integration tests PASS.
- [ ] No Blocking technical defect.
- [ ] No Story PR created.
- [ ] Recommended Jira status recorded.

---

# US-91 — Checkout idempotency

- **Jira Key:** `PAC-131`
- **Legacy Story branch:** `story/PAC-131-us-91-idempotent-checkout`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Integration tests | Supabase evidence | Blocking defects | Recommended Jira status | User Jira confirmation |
|---|---:|---|---|---|---|---|---|
| Not started | 0/2 | Pending | Pending | Pending/N/A | — | TO DO | — |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-276 — Create idempotency_records Prisma model | `PAC-486` | Not started | `feature/PAC-486-task-276-create-idempotency-records-prisma-model` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |
| PAC-TASK-277 — Implement idempotency key handling for checkout | `PAC-487` | Not started | `feature/PAC-487-task-277-implement-idempotency-key-handling-for-checkout` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |

## Story completion checklist

- [ ] All child Task PRs merged into `develop`.
- [ ] Every Task has correct Jira Key in commit and PR evidence.
- [ ] Targeted tests PASS for every Task.
- [ ] Supabase evidence exists only where persistent data is affected; otherwise valid N/A.
- [ ] Story Acceptance Review runs on latest `develop`.
- [ ] Story acceptance criteria PASS.
- [ ] Story-level integration tests PASS.
- [ ] No Blocking technical defect.
- [ ] No Story PR created.
- [ ] Recommended Jira status recorded.

---

# US-92 — Checkout rollback

- **Jira Key:** `PAC-132`
- **Legacy Story branch:** `story/PAC-132-us-92-rollback-khi-checkout-failure`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Integration tests | Supabase evidence | Blocking defects | Recommended Jira status | User Jira confirmation |
|---|---:|---|---|---|---|---|---|
| Not started | 0/1 | Pending | Pending | Pending/N/A | — | TO DO | — |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-278 — Rollback checkout transaction on failure | `PAC-488` | Not started | `feature/PAC-488-task-278-rollback-checkout-transaction-on-failure` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |

## Story completion checklist

- [ ] All child Task PRs merged into `develop`.
- [ ] Every Task has correct Jira Key in commit and PR evidence.
- [ ] Targeted tests PASS for every Task.
- [ ] Supabase evidence exists only where persistent data is affected; otherwise valid N/A.
- [ ] Story Acceptance Review runs on latest `develop`.
- [ ] Story acceptance criteria PASS.
- [ ] Story-level integration tests PASS.
- [ ] No Blocking technical defect.
- [ ] No Story PR created.
- [ ] Recommended Jira status recorded.

---

# US-93 — Payment handling

- **Jira Key:** `PAC-133`
- **Legacy Story branch:** `story/PAC-133-us-93-cash-payment-handling`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Integration tests | Supabase evidence | Blocking defects | Recommended Jira status | User Jira confirmation |
|---|---:|---|---|---|---|---|---|
| Not started | 0/3 | Pending | Pending | Pending/N/A | — | TO DO | — |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-267 — Build payment method selector in Checkout UI | `PAC-477` | Not started | `feature/PAC-477-task-267-build-payment-method-selector-in-checkout-ui` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |
| PAC-TASK-279 — Create payments Prisma model | `PAC-489` | Not started | `feature/PAC-489-task-279-create-payments-prisma-model` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |
| PAC-TASK-280 — Implement cash payment handling inside checkout | `PAC-490` | Not started | `feature/PAC-490-task-280-implement-cash-payment-handling-inside-checkout` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |

## Story completion checklist

- [ ] All child Task PRs merged into `develop`.
- [ ] Every Task has correct Jira Key in commit and PR evidence.
- [ ] Targeted tests PASS for every Task.
- [ ] Supabase evidence exists only where persistent data is affected; otherwise valid N/A.
- [ ] Story Acceptance Review runs on latest `develop`.
- [ ] Story acceptance criteria PASS.
- [ ] Story-level integration tests PASS.
- [ ] No Blocking technical defect.
- [ ] No Story PR created.
- [ ] Recommended Jira status recorded.

---

# US-94 — Cash change amount

- **Jira Key:** `PAC-134`
- **Legacy Story branch:** `story/PAC-134-us-94-tinh-change-amount-cho-thanh-toan-tien-mat`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Integration tests | Supabase evidence | Blocking defects | Recommended Jira status | User Jira confirmation |
|---|---:|---|---|---|---|---|---|
| Not started | 0/1 | Pending | Pending | Pending/N/A | — | TO DO | — |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-281 — Calculate and persist change_amount | `PAC-491` | Not started | `feature/PAC-491-task-281-calculate-and-persist-change-amount` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |

## Story completion checklist

- [ ] All child Task PRs merged into `develop`.
- [ ] Every Task has correct Jira Key in commit and PR evidence.
- [ ] Targeted tests PASS for every Task.
- [ ] Supabase evidence exists only where persistent data is affected; otherwise valid N/A.
- [ ] Story Acceptance Review runs on latest `develop`.
- [ ] Story acceptance criteria PASS.
- [ ] Story-level integration tests PASS.
- [ ] No Blocking technical defect.
- [ ] No Story PR created.
- [ ] Recommended Jira status recorded.

---

# US-95 — Bank transfer transaction reference

- **Jira Key:** `PAC-135`
- **Legacy Story branch:** `story/PAC-135-us-95-simulated-bank-transfer-transaction-reference`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Integration tests | Supabase evidence | Blocking defects | Recommended Jira status | User Jira confirmation |
|---|---:|---|---|---|---|---|---|
| Not started | 0/1 | Pending | Pending | Pending/N/A | — | TO DO | — |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-282 — Implement bank transfer transaction_reference validation | `PAC-492` | Not started | `feature/PAC-492-task-282-implement-bank-transfer-transaction-reference-valid` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |

## Story completion checklist

- [ ] All child Task PRs merged into `develop`.
- [ ] Every Task has correct Jira Key in commit and PR evidence.
- [ ] Targeted tests PASS for every Task.
- [ ] Supabase evidence exists only where persistent data is affected; otherwise valid N/A.
- [ ] Story Acceptance Review runs on latest `develop`.
- [ ] Story acceptance criteria PASS.
- [ ] Story-level integration tests PASS.
- [ ] No Blocking technical defect.
- [ ] No Story PR created.
- [ ] Recommended Jira status recorded.

---

# US-96 — One SUCCESS payment per order

- **Jira Key:** `PAC-136`
- **Legacy Story branch:** `story/PAC-136-us-96-one-success-payment-rule`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Integration tests | Supabase evidence | Blocking defects | Recommended Jira status | User Jira confirmation |
|---|---:|---|---|---|---|---|---|
| Not started | 0/2 | Pending | Pending | Pending/N/A | — | TO DO | — |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-283 — Enforce one SUCCESS payment per order | `PAC-493` | Not started | `feature/PAC-493-task-283-enforce-one-success-payment-per-order` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |
| PAC-TASK-284 — Allow failed payment attempts without duplicate SUCCESS payment | `PAC-494` | Not started | `feature/PAC-494-task-284-allow-failed-payment-attempts-without-creating-dupl` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |

## Story completion checklist

- [ ] All child Task PRs merged into `develop`.
- [ ] Every Task has correct Jira Key in commit and PR evidence.
- [ ] Targeted tests PASS for every Task.
- [ ] Supabase evidence exists only where persistent data is affected; otherwise valid N/A.
- [ ] Story Acceptance Review runs on latest `develop`.
- [ ] Story acceptance criteria PASS.
- [ ] Story-level integration tests PASS.
- [ ] No Blocking technical defect.
- [ ] No Story PR created.
- [ ] Recommended Jira status recorded.

---

# US-97 — Invoice generation

- **Jira Key:** `PAC-137`
- **Legacy Story branch:** `story/PAC-137-us-97-invoice-generated-inside-checkout`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Integration tests | Supabase evidence | Blocking defects | Recommended Jira status | User Jira confirmation |
|---|---:|---|---|---|---|---|---|
| Not started | 0/2 | Pending | Pending | Pending/N/A | — | TO DO | — |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-285 — Create invoices Prisma model | `PAC-495` | Not started | `feature/PAC-495-task-285-create-invoices-prisma-model` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |
| PAC-TASK-286 — Generate invoice inside checkout transaction | `PAC-496` | Not started | `feature/PAC-496-task-286-generate-invoice-inside-checkout-transaction` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |

## Story completion checklist

- [ ] All child Task PRs merged into `develop`.
- [ ] Every Task has correct Jira Key in commit and PR evidence.
- [ ] Targeted tests PASS for every Task.
- [ ] Supabase evidence exists only where persistent data is affected; otherwise valid N/A.
- [ ] Story Acceptance Review runs on latest `develop`.
- [ ] Story acceptance criteria PASS.
- [ ] Story-level integration tests PASS.
- [ ] No Blocking technical defect.
- [ ] No Story PR created.
- [ ] Recommended Jira status recorded.

---

# US-98 — Invoice view and print

- **Jira Key:** `PAC-138`
- **Legacy Story branch:** `story/PAC-138-us-98-xem-in-invoice-sau-checkout`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Integration tests | Supabase evidence | Blocking defects | Recommended Jira status | User Jira confirmation |
|---|---:|---|---|---|---|---|---|
| Not started | 0/1 | Pending | Pending | Pending/N/A | — | TO DO | — |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-287 — Build invoice view and print UI | `PAC-497` | Not started | `feature/PAC-497-task-287-build-invoice-view-and-print-ui` | — | — | Not opened | — | Pending | Pending/N/A | — | TO DO |

## Story completion checklist

- [ ] All child Task PRs merged into `develop`.
- [ ] Every Task has correct Jira Key in commit and PR evidence.
- [ ] Targeted tests PASS for every Task.
- [ ] Supabase evidence exists only where persistent data is affected; otherwise valid N/A.
- [ ] Story Acceptance Review runs on latest `develop`.
- [ ] Story acceptance criteria PASS.
- [ ] Story-level integration tests PASS.
- [ ] No Blocking technical defect.
- [ ] No Story PR created.
- [ ] Recommended Jira status recorded.

---

# 8. Manual Jira Update Queue

AI adds a row only after technical evidence supports a recommendation. Project Owner performs the actual Jira update.

| Issue | Recommended status | Technical reason | Commit/PR/Review evidence | Tests | Bug candidates | User confirmed |
|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — |

---

# 9. Bug Candidate Register

AI records reproducible defects here. Project Owner creates the Jira Bug and returns the real Bug Jira Key before a bugfix branch is used.

| Candidate ID | Summary | Severity | Affected scope | Steps/Evidence | Suggested Jira action | Jira Bug Key | Technical status | Branch | PR/Merge | Regression |
|---|---|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | — | — | — | — |

---

# 10. PR and Merge Evidence

## Task/Bug → develop

| Issue | Source branch | Target | PR URL | CI | Diff/scope review | Conflict | Merge status | Merge SHA |
|---|---|---|---|---|---|---|---|---|
| Chưa cập nhật | — | `develop` | — | — | — | — | — | — |

## develop → main

| Sprint | Source | Target | Final Review | PR URL | Owner review | Merge status |
|---|---|---|---|---|---|---|
| Sprint 6 | `develop` | `main` | Pending | — | Waiting for Project Owner | Not opened |

---

# 11. Automated Test Results

## Per-Task targeted tests

| Task | Targeted lint/typecheck/test/build | Result | Evidence |
|---|---|---|---|
| Chưa cập nhật | — | Pending | — |

## Story Acceptance tests

| Story | Integration/acceptance commands | Result | Evidence |
|---|---|---|---|
| Chưa cập nhật | — | Pending | — |

## Epic and Sprint full-suite tests

| Kiểm tra | Chạy tại | Trạng thái | Lệnh/Evidence | Ghi chú |
|---|---|---|---|---|
| Backend lint | Epic/Final Review | Chưa chạy | — | — |
| Backend unit tests | Epic/Final Review | Chưa chạy | — | — |
| Backend integration tests | Story/Epic/Final Review | Chưa chạy | — | — |
| Backend E2E | Epic/Final Review nếu cấu hình | Chưa chạy | — | N/A nếu script không tồn tại |
| Backend build | Epic/Final Review | Chưa chạy | — | — |
| Frontend lint | Epic/Final Review | Chưa chạy | — | — |
| Frontend tests | Story/Epic/Final Review nếu cấu hình | Chưa chạy | — | N/A nếu script không tồn tại |
| Frontend build | Epic/Final Review | Chưa chạy | — | — |
| Prisma validate | Epic/Final Review và migration Tasks | Chưa chạy | — | — |
| Prisma generate | Epic/Final Review và migration Tasks | Chưa chạy | — | — |
| Migration verification | Epic/Final Review | Chưa chạy | — | Supabase evidence required |
| Checkout regression | Epic/Final Review | Chưa chạy | — | — |
| FEFO regression | Story/Epic/Final Review | Chưa chạy | — | — |
| Idempotency regression | Story/Epic/Final Review | Chưa chạy | — | — |
| Rollback regression | Story/Epic/Final Review | Chưa chạy | — | — |
| Payment regression | Story/Epic/Final Review | Chưa chạy | — | — |
| Invoice regression | Story/Epic/Final Review | Chưa chạy | — | — |

---

# 12. Supabase Data Verification Checklist

## Environment and safety

- [ ] Development/test environment identified.
- [ ] No destructive test on production/demo.
- [ ] Test Run ID and fixture IDs recorded when write testing is required.
- [ ] Cleanup deletes only Test Run data.
- [ ] No secret/token in evidence.

## Checkout

- [ ] Only `DRAFT` Order can checkout.
- [ ] Staff ownership enforced.
- [ ] Admin access follows permission.
- [ ] Warehouse receives `403`.
- [ ] Unresolved HIGH blocks checkout.
- [ ] Failed checkout preserves `DRAFT`.

## FEFO and inventory

- [ ] Expired/zero batches excluded.
- [ ] Nearest expiry selected first.
- [ ] Multi-batch allocation correct.
- [ ] Insufficient stock rejected.
- [ ] Allocation rows persisted correctly.
- [ ] Batch quantity changes only on successful checkout.
- [ ] No negative quantity or partial deduction.

## Payment, Invoice and idempotency

- [ ] Cash validation and `change_amount` correct.
- [ ] Transfer reference required and unique according to design.
- [ ] At most one SUCCESS Payment per Order.
- [ ] Failed attempts do not create duplicate SUCCESS.
- [ ] Invoice created only on successful checkout.
- [ ] Invoice failure rolls back all writes.
- [ ] Same idempotency key does not duplicate allocation, deduction, Payment or Invoice.

---

# 13. Manual UI Checklist

- [ ] Checkout page/panel works.
- [ ] Payment method selector works.
- [ ] Cash amount and change display correctly.
- [ ] Bank reference validation is clear.
- [ ] HIGH blocker is clear.
- [ ] Insufficient-stock error preserves Draft.
- [ ] Double-submit creates no duplicate.
- [ ] Successful checkout displays Invoice.
- [ ] Invoice view/print works at demo level.
- [ ] Staff/Admin/Warehouse access behaves correctly.
- [ ] Loading, empty, error and success states exist.
- [ ] Chrome desktop and basic responsive checks pass.

---

# 14. Migration and Database Evidence

| Hạng mục | Trạng thái | Migration/Schema Evidence | Supabase Evidence | Risk | Result |
|---|---|---|---|---|---|
| order_batch_allocations | Pending | — | — | High | — |
| idempotency_records | Pending | — | — | High | — |
| payments | Pending | — | — | High | — |
| invoices | Pending | — | — | High | — |
| one SUCCESS constraint | Pending | — | — | High | — |
| bank reference uniqueness | Pending | — | — | Medium | — |
| allocation FK/indexes | Pending | — | — | High | — |
| schema drift check | Pending | — | — | Blocker | — |
| migration rollback/recovery | Pending | — | — | High | — |

---

# 15. Final Sprint 6 Verification

Only set `Ready for release = Yes` when:

- [ ] 32/32 Task implementation branches used.
- [ ] 32/32 Task/Bug PRs merged into `develop`.
- [ ] Every Task commit contains the correct Jira Key.
- [ ] No direct push to `develop` or `main`.
- [ ] 16/16 Story Acceptance Reviews PASS on latest `develop`.
- [ ] 1/1 Epic Integration/Regression Review PASS on latest `develop`.
- [ ] No Story PR or Epic PR required/created for integration.
- [ ] Backend/frontend tests and builds PASS as configured.
- [ ] Prisma validate/generate and migration verification PASS.
- [ ] No schema drift.
- [ ] Checkout, FEFO, Payment, Invoice, idempotency and rollback verification PASS.
- [ ] Supabase verification and cleanup PASS where applicable.
- [ ] Permission/ownership verification PASS.
- [ ] Manual UI verification PASS.
- [ ] No unresolved Blocking/High technical defect.
- [ ] Sprint Final Review PASS.
- [ ] Manual Jira Update Queue is complete for Project Owner.

```text
Ready for release = No
Develop → main = Waiting for Project Owner
```

---

# 16. Current Official State

```text
Jira management = Manual by Project Owner
AI Jira write actions = Disabled
Git workflow = Task/Bug → develop
AI Task/Bug PR merge = Enabled after Merge Gate PASS
Story PR = Not required
Epic PR = Not required
Story completion = Acceptance Review on develop
Epic completion = Integration/Regression Review on develop
develop → main = Project Owner only

Sprint 5 Final Review = PASS
Ready for Sprint 6 = Yes
Sprint 6 Progress = Prepared
Sprint 6 implementation = Not authorized until Audit PASS
Ready to implement Sprint 6 = No
Ready for release = No
```
