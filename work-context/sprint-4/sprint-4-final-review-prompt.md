# Sprint 4 Final Review Prompt — PharmaAssist AI Intelligence

> **MCP-enabled final quality gate from Sprint 4 to Sprint 5**
>
> Repository path:
>
> `work-context/sprint-4/sprint-4-final-review-prompt.md`
>
> This prompt must be executed only after Sprint 4 implementation is reported complete.
> It does not assume that Jira statuses, GitHub merges, tests or Supabase data are correct.
> Every result must be verified using actual evidence.

---

# I. Role and Final Review Objective

You are the final reviewer for Sprint 4 of **PharmaAssist AI Intelligence**.

You must independently verify:

```text
PAC-EPIC-07 — Inventory Adjustment
PAC-EPIC-08 — POS Draft Order
US-49 → US-68
PAC-TASK-161 → PAC-TASK-226
Cross-sprint PAC-TASK-185 → US-38 → PAC-EPIC-05
```

You must use:

- **Jira MCP** for issue status, transition history, comments, links and Bugs.
- **GitHub MCP** for branches, commits, Pull Requests, CI checks and merge evidence.
- **Supabase MCP** for schema inspection and safe data testing.
- Local repository tools for source review, lint, tests, Prisma checks and builds.

Your final output must be exactly one of:

```text
Sprint 4 Final Review = PASS
Ready for Sprint 5 = Yes
```

or:

```text
Sprint 4 Final Review = FAIL
Ready for Sprint 5 = No
```

or:

```text
Sprint 4 Final Review = BLOCKED
Ready for Sprint 5 = No
```

Never set `Ready for Sprint 5 = Yes` based only on checkboxes or prior AI claims.

---

# II. Documents to Read

Read before reviewing:

1. `AGENTS.md`
2. `.agents/rules/rules-w-pharmaassist.md`
3. `WORKING-CONTEXT.md`
4. `DESIGN.md`
5. `work-context/sprint-3/sprint-3.md`
6. `work-context/sprint-3/sprint-3-progress.md`
7. `work-context/sprint-3/sprint-3-audit.md`
8. `work-context/sprint-4/sprint-4.md`
9. `work-context/sprint-4/sprint-4-progress.md`
10. `work-context/sprint-4/sprint-4-audit.md`
11. `work-context/sprint-4/sprint-4-agent-prompt.md`
12. `work-context/sprint-5/sprint-5.md`
13. `work-context/sprint-5/sprint-5-progress.md`
14. `work-context/sprint-5/sprint-5-audit.md`
15. `Jira/2_Epic.md`
16. `Jira/3_Stories.md`
17. `Jira/4B_Task_List_MVP_POS_Interaction_Checkout_146_290.md`
18. `Jira/4B_Task_Description_MVP_POS_Interaction_Checkout_146_290.md`
19. `Jira/5_Sprint.md`
20. `Jira/jira-mapping.md`
21. `Jira/branch-on-jira.md`
22. Prisma schema and all migrations.
23. Backend and frontend source code.
24. Relevant SRS, roles, permissions, API, database, UI/UX and testing documents.

Priority:

1. `branch-on-jira.md` decides exact branch names.
2. Jira MCP decides actual issue status and available transitions.
3. GitHub MCP decides actual branch, PR, checks and merge evidence.
4. Supabase MCP decides actual schema and data evidence.
5. Repository code and test output decide implementation correctness.
6. Sprint progress/audit files are tracking documents, not proof by themselves.

---

# III. Final Review Safety Rules

- Do not create new Sprint 4 Epic, Story or Task branches.
- Do not rename existing branches.
- Do not merge directly to `main`.
- Do not force-push `develop` or `main`.
- Do not falsify Pass, Done, Merged or test evidence.
- Do not run destructive tests on production or demo Supabase data.
- Do not modify schema manually in Supabase.
- Do not mark a DONE issue back to IN REVIEW or IN PROGRESS.
- If a DONE issue contains a defect, create a Jira Bug.
- If an issue is in IN REVIEW and fails review, transition it to IN PROGRESS before fixing.
- Each Jira transition must occur one state at a time.
- Do not implement Sprint 5 features during Sprint 4 final review.

---

# IV. MCP Connectivity Gate

Before reviewing code, verify all MCP connections.

## Jira MCP

- [ ] Can read PAC-EPIC-07 and PAC-EPIC-08.
- [ ] Can read US-49 → US-68.
- [ ] Can read PAC-TASK-161 → PAC-TASK-226.
- [ ] Can read US-38 and PAC-EPIC-05 for PAC-TASK-185.
- [ ] Can inspect current status.
- [ ] Can inspect available transitions.
- [ ] Can read comments and issue links.
- [ ] Can create Bug issues.
- [ ] Can link Bugs to affected issues.
- [ ] Can verify status after transition.

## GitHub MCP

- [ ] Can identify the correct repository.
- [ ] Can list branches.
- [ ] Can inspect commit history.
- [ ] Can inspect Pull Requests.
- [ ] Can inspect PR head/base.
- [ ] Can inspect CI checks.
- [ ] Can inspect review state.
- [ ] Can inspect `mergedAt` and merge SHA.
- [ ] Can verify changes on `develop`.

## Supabase MCP

- [ ] Can identify the Supabase project.
- [ ] Can identify the environment type.
- [ ] Can inspect schema and migration state.
- [ ] Can run safe read queries.
- [ ] Can create isolated test fixtures only if environment is authorized.
- [ ] Can verify data before and after API calls.
- [ ] Can verify transaction rollback.
- [ ] Can clean up only test-run data.

If any required MCP is unavailable:

```text
Sprint 4 Final Review = BLOCKED
Ready for Sprint 5 = No
```

Record the blocker and stop before claiming PASS.

---

# V. Jira Workflow Audit

Official workflow:

```text
TO DO → IN PROGRESS → IN REVIEW → DONE
```

Review failure loop:

```text
IN REVIEW → IN PROGRESS → IN REVIEW
```

Forbidden:

```text
TO DO → IN REVIEW
TO DO → DONE
IN PROGRESS → DONE
IN PROGRESS → TO DO
DONE → IN REVIEW
DONE → IN PROGRESS
```

## Required counts

| Scope | Expected |
|---|---:|
| Business Epics | 2 |
| Primary Stories | 20 |
| Sprint Tasks | 66 |
| Cross-sprint Task | 1 within the 66 |
| Cross-sprint Story parent | US-38 |
| Cross-sprint Epic parent | PAC-EPIC-05 |

## Audit steps

For every Epic, Story and Task:

1. Read current Jira status.
2. Read transition history when available.
3. Verify no illegal status jump.
4. Verify Jira parent/link relationships.
5. Verify issue comments include branch, PR, tests and completion evidence.
6. Verify Bugs are linked when defects occurred.
7. Verify DONE is supported by merged PR and test evidence.

## Completion requirement

Before PASS:

- [ ] PAC-EPIC-07 is DONE.
- [ ] PAC-EPIC-08 is DONE.
- [ ] US-49 → US-68 are DONE.
- [ ] PAC-TASK-161 → PAC-TASK-226 are DONE.
- [ ] PAC-TASK-185 remains linked to US-38 / PAC-EPIC-05.
- [ ] No issue skipped required workflow states.
- [ ] No DONE issue was illegally reopened.
- [ ] All Blocking Bugs are DONE.
- [ ] No unresolved High Bug affects Sprint 5.

If status is incorrect but issue is not DONE, use only valid one-step transitions.

If a DONE issue fails final review, create a Bug. Do not reopen the issue.

---

# VI. GitHub Branch, Commit, PR and Merge Audit

## Branch rules

- All planned Sprint 4 branches already exist.
- Exact branch names come from `branch-on-jira.md`.
- Do not create replacement branches for naming mismatches.
- Bugfix branches are allowed only after Jira creates a Bug and returns a real Jira key.

## Commit audit

For each new commit created directly on an issue branch:

### Task branch

```text
<TASK-JIRA-KEY> T-xxx: <message>
```

### Story branch integration fix

```text
<STORY-JIRA-KEY> US-xx: <message>
```

### Epic branch integration fix

```text
<EPIC-JIRA-KEY> EPIC-xx: <message>
```

### Bugfix branch

```text
<BUG-JIRA-KEY> BUG: <message>
```

Verify:

- [ ] Jira key matches the current issue branch.
- [ ] Commit is not empty/fake.
- [ ] Commit does not include secrets.
- [ ] Commit does not mix unrelated scope.
- [ ] Story/Epic integration fixes use Story/Epic Jira keys.
- [ ] Existing inherited parent commits are not incorrectly flagged.

## PR hierarchy

Required:

```text
Task → Story
Story → Epic
Epic → develop
```

Cross-sprint task:

```text
PAC-TASK-185
→ US-38
→ PAC-EPIC-05
→ develop
```

Forbidden:

```text
Task → Epic
Task → develop
Story → develop
Epic → main
```

Verify every PR:

- [ ] Correct source branch.
- [ ] Correct target branch.
- [ ] PR title contains Jira key and logical key.
- [ ] PR description contains scope and test evidence.
- [ ] Required checks pass.
- [ ] No unresolved blocking review threads.
- [ ] Merge occurred.
- [ ] Merge SHA is recorded.
- [ ] Branch was not deleted if project evidence rules require preservation.

## Develop verification

After all Epic PRs:

- [ ] `develop` contains PAC-EPIC-07.
- [ ] `develop` contains PAC-EPIC-08.
- [ ] `develop` contains PAC-TASK-185 hardening through PAC-EPIC-05.
- [ ] No Sprint 4 implementation remains only on child branches.
- [ ] No unrelated future-scope code was merged.

---

# VII. Exact Sprint 4 Branch Registry

> Copy branch names exactly. Do not regenerate slugs.

## PAC-EPIC-07

- Jira Key: `PAC-7`
- Exact Epic branch: `epic/PAC-7-EPIC-07-inventory-adjustment`
- Required PR target: `develop`

| Story | Jira Key | Exact Story branch | Required PR target |
|---|---|---|---|
| US-49 — Tạo Inventory Adjustment | `PAC-88` | `story/PAC-88-US-49-create-inventory-adjustment` | `epic/PAC-7-EPIC-07-inventory-adjustment` |

### Task branches

| Task | Jira Key | Exact Task branch | Required PR target |
|---|---|---|---|
| PAC-TASK-161 — Create inventory_adjustments Prisma model | `PAC-370` | `feature/PAC-370-T-161-inventory-adjustments-model` | `story/PAC-88-US-49-create-inventory-adjustment` |
| PAC-TASK-162 — Create inventory_adjustment_lines Prisma model | `PAC-371` | `feature/PAC-371-T-162-inventory-adjustment-lines-model` | `story/PAC-88-US-49-create-inventory-adjustment` |
| PAC-TASK-163 — Implement create Inventory Adjustment API | `PAC-372` | `feature/PAC-372-T-163-create-inventory-adjustment-api` | `story/PAC-88-US-49-create-inventory-adjustment` |
| PAC-TASK-164 — Build create Inventory Adjustment screen | `PAC-373` | `feature/PAC-373-T-164-create-inventory-adjustment-screen` | `story/PAC-88-US-49-create-inventory-adjustment` |
| PAC-TASK-166 — Validate adjustment type and quantity | `PAC-375` | `feature/PAC-375-T-166-adjustment-type-quantity-validation` | `story/PAC-88-US-49-create-inventory-adjustment` |

| US-50 — Adjustment bắt buộc reason | `PAC-89` | `story/PAC-89-US-50-adjustment-required-reason` | `epic/PAC-7-EPIC-07-inventory-adjustment` |

### Task branches

| Task | Jira Key | Exact Task branch | Required PR target |
|---|---|---|---|
| PAC-TASK-167 — Enforce required adjustment reason in backend | `PAC-376` | `feature/PAC-376-T-167-required-adjustment-reason-backend` | `story/PAC-89-US-50-adjustment-required-reason` |
| PAC-TASK-168 — Add required reason validation in UI | `PAC-377` | `feature/PAC-377-T-168-required-adjustment-reason-ui` | `story/PAC-89-US-50-adjustment-required-reason` |
| PAC-TASK-183 — Add tests for required adjustment reason | `PAC-392` | `test/PAC-392-T-183-required-reason-tests` | `story/PAC-89-US-50-adjustment-required-reason` |

| US-51 — Chọn MedicineBatch khi adjustment | `PAC-90` | `story/PAC-90-US-51-adjustment-medicinebatch-selector` | `epic/PAC-7-EPIC-07-inventory-adjustment` |

### Task branches

| Task | Jira Key | Exact Task branch | Required PR target |
|---|---|---|---|
| PAC-TASK-165 — Build MedicineBatch selector for adjustment | `PAC-374` | `feature/PAC-374-T-165-medicinebatch-selector-adjustment` | `story/PAC-90-US-51-adjustment-medicinebatch-selector` |
| PAC-TASK-169 — Show batch before/after quantity preview | `PAC-378` | `feature/PAC-378-T-169-batch-before-after-preview` | `story/PAC-90-US-51-adjustment-medicinebatch-selector` |

| US-52 — Confirm Inventory Adjustment transaction | `PAC-91` | `story/PAC-91-US-52-confirm-inventory-adjustment` | `epic/PAC-7-EPIC-07-inventory-adjustment` |

### Task branches

| Task | Jira Key | Exact Task branch | Required PR target |
|---|---|---|---|
| PAC-TASK-170 — Implement confirm Inventory Adjustment transaction | `PAC-379` | `feature/PAC-379-T-170-confirm-inventory-adjustment-transaction` | `story/PAC-91-US-52-confirm-inventory-adjustment` |
| PAC-TASK-171 — Update MedicineBatch through adjustment transaction only | `PAC-380` | `feature/PAC-380-T-171-update-batch-through-adjustment-only` | `story/PAC-91-US-52-confirm-inventory-adjustment` |
| PAC-TASK-173 — Lock confirmed Inventory Adjustment | `PAC-382` | `feature/PAC-382-T-173-lock-confirmed-adjustment` | `story/PAC-91-US-52-confirm-inventory-adjustment` |
| PAC-TASK-188 — Refresh Inventory Summary after adjustment confirm | `PAC-397` | `feature/PAC-397-T-188-refresh-inventory-after-adjustment` | `story/PAC-91-US-52-confirm-inventory-adjustment` |

| US-53 — Chặn adjustment làm quantity âm | `PAC-92` | `story/PAC-92-US-53-block-negative-adjustment` | `epic/PAC-7-EPIC-07-inventory-adjustment` |

### Task branches

| Task | Jira Key | Exact Task branch | Required PR target |
|---|---|---|---|
| PAC-TASK-172 — Prevent adjustment from making quantity negative | `PAC-381` | `feature/PAC-381-T-172-prevent-negative-adjustment` | `story/PAC-92-US-53-block-negative-adjustment` |
| PAC-TASK-182 — Add tests for negative quantity adjustment | `PAC-391` | `test/PAC-391-T-182-negative-adjustment-tests` | `story/PAC-92-US-53-block-negative-adjustment` |

| US-54 — Warehouse tạo và confirm adjustment | `PAC-93` | `story/PAC-93-US-54-warehouse-adjustment-permission` | `epic/PAC-7-EPIC-07-inventory-adjustment` |

### Task branches

| Task | Jira Key | Exact Task branch | Required PR target |
|---|---|---|---|
| PAC-TASK-178 — Add Warehouse permission for create/confirm adjustment | `PAC-387` | `feature/PAC-387-T-178-warehouse-adjustment-permission` | `story/PAC-93-US-54-warehouse-adjustment-permission` |
| PAC-TASK-184 — Add tests for Warehouse adjustment permission | `PAC-393` | `test/PAC-393-T-184-warehouse-adjustment-permission-tests` | `story/PAC-93-US-54-warehouse-adjustment-permission` |

| US-55 — Audit Inventory Adjustment | `PAC-94` | `story/PAC-94-US-55-inventory-adjustment-audit` | `epic/PAC-7-EPIC-07-inventory-adjustment` |

### Task branches

| Task | Jira Key | Exact Task branch | Required PR target |
|---|---|---|---|
| PAC-TASK-180 — Write audit log for Inventory Adjustment | `PAC-389` | `feature/PAC-389-T-180-inventory-adjustment-audit-log` | `story/PAC-94-US-55-inventory-adjustment-audit` |
| PAC-TASK-181 — Display adjustment audit information in UI | `PAC-390` | `feature/PAC-390-T-181-adjustment-audit-ui` | `story/PAC-94-US-55-inventory-adjustment-audit` |

| US-56 — Inventory Adjustment history | `PAC-95` | `story/PAC-95-US-56-inventory-adjustment-history` | `epic/PAC-7-EPIC-07-inventory-adjustment` |

### Task branches

| Task | Jira Key | Exact Task branch | Required PR target |
|---|---|---|---|
| PAC-TASK-174 — Create Inventory Adjustment list API | `PAC-383` | `feature/PAC-383-T-174-inventory-adjustment-list-api` | `story/PAC-95-US-56-inventory-adjustment-history` |
| PAC-TASK-175 — Build Inventory Adjustment history list UI | `PAC-384` | `feature/PAC-384-T-175-inventory-adjustment-history-ui` | `story/PAC-95-US-56-inventory-adjustment-history` |
| PAC-TASK-176 — Implement Inventory Adjustment detail API | `PAC-385` | `feature/PAC-385-T-176-inventory-adjustment-detail-api` | `story/PAC-95-US-56-inventory-adjustment-history` |
| PAC-TASK-177 — Build Inventory Adjustment detail screen | `PAC-386` | `feature/PAC-386-T-177-inventory-adjustment-detail-screen` | `story/PAC-95-US-56-inventory-adjustment-history` |
| PAC-TASK-179 — Add Admin permission for adjustment history and review | `PAC-388` | `feature/PAC-388-T-179-admin-adjustment-review-permission` | `story/PAC-95-US-56-inventory-adjustment-history` |
| PAC-TASK-186 — Implement cancel Draft Inventory Adjustment API | `PAC-395` | `feature/PAC-395-T-186-cancel-draft-adjustment-api` | `story/PAC-95-US-56-inventory-adjustment-history` |
| PAC-TASK-187 — Build cancel Draft Inventory Adjustment UI | `PAC-396` | `feature/PAC-396-T-187-cancel-draft-adjustment-ui` | `story/PAC-95-US-56-inventory-adjustment-history` |
| PAC-TASK-189 — Add Inventory Adjustment smoke test checklist | `PAC-398` | `test/PAC-398-T-189-inventory-adjustment-smoke-checklist` | `story/PAC-95-US-56-inventory-adjustment-history` |
| PAC-TASK-190 — Add Inventory Adjustment traceability notes | `PAC-399` | `docs/PAC-399-T-190-inventory-adjustment-traceability-notes` | `story/PAC-95-US-56-inventory-adjustment-history` |

## PAC-EPIC-08

- Jira Key: `PAC-8`
- Exact Epic branch: `epic/PAC-8-EPIC-08-pos-draft-order`
- Required PR target: `develop`

| Story | Jira Key | Exact Story branch | Required PR target |
|---|---|---|---|
| US-57 — Tạo POS Draft Order | `PAC-96` | `story/PAC-96-US-57-create-pos-draft-order` | `epic/PAC-8-EPIC-08-pos-draft-order` |

### Task branches

| Task | Jira Key | Exact Task branch | Required PR target |
|---|---|---|---|
| PAC-TASK-191 — Create orders Prisma model | `PAC-400` | `feature/PAC-400-T-191-orders-model` | `story/PAC-96-US-57-create-pos-draft-order` |
| PAC-TASK-192 — Create order_items Prisma model | `PAC-401` | `feature/PAC-401-T-192-order-items-model` | `story/PAC-96-US-57-create-pos-draft-order` |
| PAC-TASK-193 — Add order status enum DRAFT/PAID/CANCELLED | `PAC-402` | `feature/PAC-402-T-193-order-status-enum` | `story/PAC-96-US-57-create-pos-draft-order` |
| PAC-TASK-194 — Implement create Draft Order API | `PAC-403` | `feature/PAC-403-T-194-create-draft-order-api` | `story/PAC-96-US-57-create-pos-draft-order` |
| PAC-TASK-195 — Build POS Draft Order screen | `PAC-404` | `feature/PAC-404-T-195-pos-draft-order-screen` | `story/PAC-96-US-57-create-pos-draft-order` |
| PAC-TASK-225 — Add POS API integration tests | `PAC-434` | `test/PAC-434-T-225-pos-api-integration-tests` | `story/PAC-96-US-57-create-pos-draft-order` |

| US-58 — POS medicine search | `PAC-97` | `story/PAC-97-US-58-pos-medicine-search` | `epic/PAC-8-EPIC-08-pos-draft-order` |

### Task branches

| Task | Jira Key | Exact Task branch | Required PR target |
|---|---|---|---|
| PAC-TASK-196 — Implement POS medicine search API | `PAC-405` | `feature/PAC-405-T-196-pos-medicine-search-api` | `story/PAC-97-US-58-pos-medicine-search` |
| PAC-TASK-197 — Build POS medicine search component | `PAC-406` | `feature/PAC-406-T-197-pos-medicine-search-component` | `story/PAC-97-US-58-pos-medicine-search` |
| PAC-TASK-198 — Display sellable stock in POS search results | `PAC-407` | `feature/PAC-407-T-198-pos-sellable-stock-display` | `story/PAC-97-US-58-pos-medicine-search` |

| US-59 — Add medicine to Draft Order | `PAC-98` | `story/PAC-98-US-59-add-medicine-to-draft-order` | `epic/PAC-8-EPIC-08-pos-draft-order` |

### Task branches

| Task | Jira Key | Exact Task branch | Required PR target |
|---|---|---|---|
| PAC-TASK-199 — Implement add item to Draft Order API | `PAC-408` | `feature/PAC-408-T-199-add-item-draft-order-api` | `story/PAC-98-US-59-add-medicine-to-draft-order` |
| PAC-TASK-200 — Build add-to-order action in POS | `PAC-409` | `feature/PAC-409-T-200-add-to-order-action` | `story/PAC-98-US-59-add-medicine-to-draft-order` |
| PAC-TASK-201 — Validate active medicine when adding POS item | `PAC-410` | `feature/PAC-410-T-201-active-medicine-validation-pos` | `story/PAC-98-US-59-add-medicine-to-draft-order` |

| US-60 — Update Draft Order quantity | `PAC-99` | `story/PAC-99-US-60-update-draft-order-quantity` | `epic/PAC-8-EPIC-08-pos-draft-order` |

### Task branches

| Task | Jira Key | Exact Task branch | Required PR target |
|---|---|---|---|
| PAC-TASK-202 — Implement update Draft Order item quantity API | `PAC-411` | `feature/PAC-411-T-202-update-draft-order-quantity-api` | `story/PAC-99-US-60-update-draft-order-quantity` |
| PAC-TASK-203 — Build quantity controls in Draft Order UI | `PAC-412` | `feature/PAC-412-T-203-draft-order-quantity-controls-ui` | `story/PAC-99-US-60-update-draft-order-quantity` |
| PAC-TASK-204 — Validate Draft Order quantity greater than zero | `PAC-413` | `feature/PAC-413-T-204-draft-order-quantity-positive-validation` | `story/PAC-99-US-60-update-draft-order-quantity` |

| US-61 — Remove item from Draft Order | `PAC-100` | `story/PAC-100-US-61-remove-draft-order-item` | `epic/PAC-8-EPIC-08-pos-draft-order` |

### Task branches

| Task | Jira Key | Exact Task branch | Required PR target |
|---|---|---|---|
| PAC-TASK-206 — Implement remove item from Draft Order API | `PAC-415` | `feature/PAC-415-T-206-remove-item-draft-order-api` | `story/PAC-100-US-61-remove-draft-order-item` |
| PAC-TASK-207 — Build remove item action in POS | `PAC-416` | `feature/PAC-416-T-207-remove-item-action-pos` | `story/PAC-100-US-61-remove-draft-order-item` |

| US-62 — Draft Order total calculation | `PAC-101` | `story/PAC-101-US-62-draft-order-total-calculation` | `epic/PAC-8-EPIC-08-pos-draft-order` |

### Task branches

| Task | Jira Key | Exact Task branch | Required PR target |
|---|---|---|---|
| PAC-TASK-208 — Implement Draft Order total calculation service | `PAC-417` | `feature/PAC-417-T-208-draft-order-total-service` | `story/PAC-101-US-62-draft-order-total-calculation` |
| PAC-TASK-209 — Display Draft Order totals in POS UI | `PAC-418` | `feature/PAC-418-T-209-draft-order-total-ui` | `story/PAC-101-US-62-draft-order-total-calculation` |
| PAC-TASK-210 — Ensure no coupon or discount logic in MVP Draft Order total | `PAC-419` | `feature/PAC-419-T-210-no-coupon-discount-mvp-total` | `story/PAC-101-US-62-draft-order-total-calculation` |

| US-63 — Validate sellable stock ở POS | `PAC-102` | `story/PAC-102-US-63-pos-sellable-stock-validation` | `epic/PAC-8-EPIC-08-pos-draft-order` |

### Task branches

| Task | Jira Key | Exact Task branch | Required PR target |
|---|---|---|---|
| PAC-TASK-205 — Validate sellable stock when updating Draft Order quantity | `PAC-414` | `feature/PAC-414-T-205-sellable-stock-quantity-validation` | `story/PAC-102-US-63-pos-sellable-stock-validation` |
| PAC-TASK-211 — Show POS stock validation errors | `PAC-420` | `feature/PAC-420-T-211-pos-stock-validation-errors` | `story/PAC-102-US-63-pos-sellable-stock-validation` |

| US-64 — Walk-in customer support | `PAC-103` | `story/PAC-103-US-64-walk-in-customer-support` | `epic/PAC-8-EPIC-08-pos-draft-order` |

### Task branches

| Task | Jira Key | Exact Task branch | Required PR target |
|---|---|---|---|
| PAC-TASK-212 — Implement walk-in customer support in order model | `PAC-421` | `feature/PAC-421-T-212-walk-in-customer-order-model` | `story/PAC-103-US-64-walk-in-customer-support` |
| PAC-TASK-213 — Display walk-in customer option in POS | `PAC-422` | `feature/PAC-422-T-213-walk-in-customer-pos-option` | `story/PAC-103-US-64-walk-in-customer-support` |
| PAC-TASK-214 — Keep full Customer Management out of MVP POS flow | `PAC-423` | `feature/PAC-423-T-214-keep-full-customer-management-out-mvp` | `story/PAC-103-US-64-walk-in-customer-support` |

| US-65 — Staff scoped order list | `PAC-104` | `story/PAC-104-US-65-staff-scoped-order-list` | `epic/PAC-8-EPIC-08-pos-draft-order` |

### Task branches

| Task | Jira Key | Exact Task branch | Required PR target |
|---|---|---|---|
| PAC-TASK-215 — Apply Staff ownership scope to order list API | `PAC-424` | `feature/PAC-424-T-215-staff-order-ownership-api` | `story/PAC-104-US-65-staff-scoped-order-list` |
| PAC-TASK-216 — Build Staff scoped order list UI | `PAC-425` | `feature/PAC-425-T-216-staff-scoped-order-list-ui` | `story/PAC-104-US-65-staff-scoped-order-list` |
| PAC-TASK-224 — Build Order Detail screen for DRAFT/PAID/CANCELLED | `PAC-433` | `feature/PAC-433-T-224-order-detail-screen` | `story/PAC-104-US-65-staff-scoped-order-list` |

| US-66 — Admin all-orders list | `PAC-105` | `story/PAC-105-US-66-admin-all-orders-list` | `epic/PAC-8-EPIC-08-pos-draft-order` |

### Task branches

| Task | Jira Key | Exact Task branch | Required PR target |
|---|---|---|---|
| PAC-TASK-217 — Implement Admin all-orders list API | `PAC-426` | `feature/PAC-426-T-217-admin-all-orders-api` | `story/PAC-105-US-66-admin-all-orders-list` |
| PAC-TASK-218 — Build Admin all-orders UI | `PAC-427` | `feature/PAC-427-T-218-admin-all-orders-ui` | `story/PAC-105-US-66-admin-all-orders-list` |

| US-67 — Cancel Draft Order | `PAC-106` | `story/PAC-106-US-67-cancel-draft-order` | `epic/PAC-8-EPIC-08-pos-draft-order` |

### Task branches

| Task | Jira Key | Exact Task branch | Required PR target |
|---|---|---|---|
| PAC-TASK-219 — Implement cancel Draft Order API | `PAC-428` | `feature/PAC-428-T-219-cancel-draft-order-api` | `story/PAC-106-US-67-cancel-draft-order` |
| PAC-TASK-220 — Build cancel Draft Order UI | `PAC-429` | `feature/PAC-429-T-220-cancel-draft-order-ui` | `story/PAC-106-US-67-cancel-draft-order` |
| PAC-TASK-221 — Prevent cancel PAID or already CANCELLED order | `PAC-430` | `feature/PAC-430-T-221-prevent-cancel-paid-cancelled-order` | `story/PAC-106-US-67-cancel-draft-order` |

| US-68 — Preserve Draft Order after checkout failure | `PAC-107` | `story/PAC-107-US-68-preserve-draft-order-after-checkout-failure` | `epic/PAC-8-EPIC-08-pos-draft-order` |

### Task branches

| Task | Jira Key | Exact Task branch | Required PR target |
|---|---|---|---|
| PAC-TASK-222 — Preserve Draft Order after checkout failure in UI | `PAC-431` | `feature/PAC-431-T-222-preserve-draft-order-checkout-failure-ui` | `story/PAC-107-US-68-preserve-draft-order-after-checkout-failure` |
| PAC-TASK-223 — Restore checkout error state back to Draft Order | `PAC-432` | `feature/PAC-432-T-223-restore-checkout-error-to-draft-order` | `story/PAC-107-US-68-preserve-draft-order-after-checkout-failure` |
| PAC-TASK-226 — Add POS frontend smoke test checklist | `PAC-435` | `test/PAC-435-T-226-pos-frontend-smoke-checklist` | `story/PAC-107-US-68-preserve-draft-order-after-checkout-failure` |

## Cross-sprint PAC-TASK-185

- Task Jira Key: `PAC-394`
- Exact Task branch: `feature/PAC-394-T-185-block-direct-batch-quantity-update`
- Linked Story: `US-38 / PAC-77`
- Exact Story branch: `story/PAC-77-US-38-block-direct-batch-quantity-edit`
- Parent Epic: `PAC-EPIC-05 / PAC-5`
- Exact Epic branch: `epic/PAC-5-EPIC-05-inventory-medicinebatch`
- Required path:

```text
feature/PAC-394-T-185-block-direct-batch-quantity-update
→ story/PAC-77-US-38-block-direct-batch-quantity-edit
→ epic/PAC-5-EPIC-05-inventory-medicinebatch
→ develop
```



---

# VIII. Code Quality and Repository Verification

Start from updated `develop`:

```bash
git fetch origin
git switch develop
git pull origin develop
git status
git log --oneline --decorate -50
```

Verify:

- [ ] Workspace is clean before final tests.
- [ ] No uncommitted Sprint 4 change remains.
- [ ] No temporary debug code.
- [ ] No committed `.env`.
- [ ] No credentials, tokens or service-role keys.
- [ ] No generated build output committed accidentally.
- [ ] No silent error swallowing.
- [ ] No unsafe direct database workaround.
- [ ] No unauthorized type bypass.
- [ ] No future-scope implementation.

Run only scripts that exist.

Typical backend verification:

```bash
cd backend
npm run lint
npm run test
npm run test:e2e
npx prisma validate
npx prisma generate
npm run build
```

Typical frontend verification:

```bash
cd frontend
npm run lint
npm run test
npm run build
```

If a script does not exist:

```text
N/A — script is not configured
```

Do not record a missing script as PASS.

---

# IX. Supabase Environment Safety Gate

Supabase MCP is used for data verification, not uncontrolled database modification.

Before any write test:

- [ ] Project/environment is identified.
- [ ] Environment is not production.
- [ ] Destructive tests are not run on demo data.
- [ ] Write testing is explicitly safe.
- [ ] Test Run ID is defined.
- [ ] Fixture plan is defined.
- [ ] Cleanup plan is defined.
- [ ] Cleanup is scoped to Test Run ID.
- [ ] No real personal/medical data is used.
- [ ] No service-role key appears in evidence.

If environment safety is unknown:

- Only read-only inspection is allowed.
- Data-write tests are BLOCKED.
- Final review cannot PASS if mandatory transaction tests lack trustworthy evidence.

Test Run ID format:

```text
S4-FINAL-<MODULE>-<timestamp-or-uuid>
```

---

# X. Prisma, Migration and Schema Audit

Use repository files and Supabase MCP.

Verify:

- [ ] Prisma schema validates.
- [ ] Prisma client generates.
- [ ] Migration history is consistent.
- [ ] No failed migration exists.
- [ ] No schema drift exists between Prisma and Supabase.
- [ ] InventoryAdjustment migration is applied.
- [ ] InventoryAdjustmentLine migration is applied.
- [ ] Order migration is applied.
- [ ] OrderItem migration is applied.
- [ ] Order status enum is DRAFT/PAID/CANCELLED only.
- [ ] Foreign keys are correct.
- [ ] Required indexes/constraints exist.
- [ ] Existing data remains compatible.
- [ ] No manual schema change exists outside migration history.
- [ ] Rollback/recovery notes exist for risky migrations.

Any unresolved schema drift is a Blocker.

---

# XI. Inventory Adjustment Final Review

## Schema and workflow

Verify:

- [ ] `InventoryAdjustment` exists.
- [ ] `InventoryAdjustmentLine` exists.
- [ ] Each line references a MedicineBatch.
- [ ] Adjustment has Draft/Confirmed/Cancelled lifecycle.
- [ ] Draft creation does not change MedicineBatch.
- [ ] Reason is required.
- [ ] Reason is trimmed.
- [ ] Whitespace-only reason is rejected.
- [ ] Adjustment quantity/type validation works.
- [ ] Before/after quantity preview is correct.
- [ ] Confirm uses a database transaction.
- [ ] One invalid line rolls back all lines.
- [ ] Quantity cannot become negative.
- [ ] Confirmed adjustment is immutable.
- [ ] Draft adjustment can be cancelled.
- [ ] Cancelling Draft does not change stock.
- [ ] Audit records actor, reason, batch, before/after and timestamp.
- [ ] Inventory Summary refreshes after confirm.

## Permission

Verify:

- [ ] Warehouse can create/confirm adjustment.
- [ ] Admin can review history.
- [ ] Staff is denied without permission.
- [ ] Backend enforces permission.
- [ ] Frontend visibility is not the sole control.

## Direct quantity update hardening

Verify PAC-TASK-185:

- [ ] No public API directly edits `MedicineBatch.quantity`.
- [ ] No public service method bypasses Import/Adjustment/Checkout workflow.
- [ ] Task is merged through US-38/PAC-EPIC-05.
- [ ] Regression evidence exists.
- [ ] No duplicate workaround route exists.

---

# XII. Supabase Data Tests — Inventory Adjustment

Create isolated fixtures only in a safe environment.

Minimum fixtures:

- Admin user/profile/role.
- Warehouse user/profile/role.
- Staff user/profile/role.
- Medicine.
- MedicineBatch with known quantity.
- Draft Inventory Adjustment.
- Multi-line adjustment where appropriate.

Required cases:

1. Create Draft Adjustment.
2. Verify stock unchanged before confirm.
3. Reject missing reason.
4. Reject whitespace-only reason.
5. Confirm increase.
6. Confirm decrease.
7. Reject negative result.
8. Multi-line failure rolls back all lines.
9. Confirmed adjustment cannot be edited or confirmed twice.
10. Cancel Draft leaves stock unchanged.
11. Audit data persists.
12. Inventory summary reflects confirmed value.
13. Warehouse authorized.
14. Staff denied.
15. Direct batch quantity update path unavailable.

For each case record:

```text
Test Run ID
Fixture IDs
Pre-test rows
API/action
Expected result
Actual result
Post-test rows
Rollback evidence
Cleanup result
```

---

# XIII. POS Draft Order Final Review

## Schema and lifecycle

Verify:

- [ ] `Order` exists.
- [ ] `OrderItem` exists.
- [ ] Status only DRAFT/PAID/CANCELLED.
- [ ] Order ownership fields exist.
- [ ] Customer can be null/walk-in.
- [ ] One medicine item per Order is enforced.
- [ ] Quantity must be greater than zero.
- [ ] Item price/line total behavior is deterministic.
- [ ] Draft creation does not deduct inventory.

## Search and item management

Verify:

- [ ] Search returns active medicines.
- [ ] Inactive medicine is excluded from new sale.
- [ ] Sellable stock excludes expired batches.
- [ ] Add item works.
- [ ] Duplicate medicine behavior follows one-item rule.
- [ ] Update quantity works.
- [ ] Quantity over sellable stock is rejected.
- [ ] Remove item works.
- [ ] Total updates after add/update/remove.
- [ ] No coupon/discount/promotion logic exists.

## Ownership and permission

Verify:

- [ ] Staff sees only own Orders.
- [ ] Staff A cannot access Staff B Order by direct API.
- [ ] Admin can view all Orders.
- [ ] Warehouse cannot access POS.
- [ ] Backend enforces all restrictions.

## Cancellation and failure recovery

Verify:

- [ ] Staff cancels own DRAFT.
- [ ] Admin cancels any DRAFT.
- [ ] PAID cannot be cancelled.
- [ ] CANCELLED cannot be cancelled again.
- [ ] Cancel does not deduct or restore inventory.
- [ ] Checkout failure preserves Draft Order.
- [ ] Items and total remain after failure.
- [ ] No Payment/Invoice is created by Sprint 4 failure path.
- [ ] No FEFO allocation or stock deduction occurs in Draft flow.
- [ ] Order Detail shows DRAFT/PAID/CANCELLED correctly.

---

# XIV. Supabase Data Tests — POS Draft Order

Minimum fixtures:

- Admin.
- Staff A.
- Staff B.
- Warehouse.
- Active medicine with sellable batches.
- Inactive medicine.
- Expired batch.
- Walk-in Order.
- Orders owned by Staff A and Staff B.

Required cases:

1. Create Draft Order as Staff.
2. Create Draft Order as Admin if permission allows.
3. Reject Warehouse access.
4. Search active medicine.
5. Exclude inactive medicine.
6. Exclude expired stock from sellable quantity.
7. Add item.
8. Enforce one item per medicine.
9. Reject quantity zero/negative.
10. Reject quantity over sellable stock.
11. Update quantity and total.
12. Remove item and recalculate total.
13. Create walk-in Order without customer profile.
14. Staff A cannot read Staff B Order.
15. Admin can read all Orders.
16. Cancel DRAFT.
17. Reject cancelling PAID.
18. Reject cancelling CANCELLED.
19. Verify Draft creation does not alter MedicineBatch.
20. Verify checkout failure preserves Order and items.

Record Test Run IDs, before/after rows and cleanup evidence.

---

# XV. UI and Manual Verification

Official browser target: Chrome desktop.

## Inventory Adjustment UI

- [ ] Create screen works.
- [ ] Required reason feedback works.
- [ ] Batch selector shows medicine, batch, expiry and quantity.
- [ ] Before/after preview is correct.
- [ ] Confirm success state works.
- [ ] Negative quantity error is clear.
- [ ] Confirmed view is read-only.
- [ ] History and detail work.
- [ ] Audit metadata is visible.
- [ ] Cancel Draft works.
- [ ] Permission-aware navigation/actions work.
- [ ] Loading, empty, error and success states exist.

## POS UI

- [ ] Draft Order screen works.
- [ ] Medicine search works.
- [ ] Sellable stock is visible.
- [ ] Add/update/remove item works.
- [ ] Total updates correctly.
- [ ] No coupon/discount UI.
- [ ] Walk-in state is clear.
- [ ] Staff scoped list works.
- [ ] Admin all-orders list works.
- [ ] Warehouse is denied.
- [ ] Cancel Draft works.
- [ ] Checkout failure preserves UI state.
- [ ] Order Detail renders all statuses.
- [ ] Loading, empty, error and success states exist.
- [ ] Basic responsive check passes.

Capture screenshots for important pass/fail states without exposing sensitive data.

---

# XVI. Bug Workflow During Final Review

Every reproducible defect must become a Jira issue of type `BUG`.

## Required Bug content

```text
Summary
Issue Type = Bug
Sprint
Component
Affected Epic
Affected Story
Affected Task
Environment
Preconditions
Steps to Reproduce
Actual Result
Expected Result
Reproduction Rate
Severity
Priority
Evidence
Suspected Area
Fix Acceptance Criteria
Regression Test Required = Yes
```

## Lifecycle

```text
Create BUG in TO DO
→ TO DO → IN PROGRESS
→ create bugfix branch after Jira returns Bug key
→ reproduce and add regression test
→ fix
→ code tests
→ Supabase data verification when relevant
→ commit with Bug Jira Key
→ push
→ PR
→ IN PROGRESS → IN REVIEW
→ checks/review
→ merge
→ regression pass
→ IN REVIEW → DONE
```

Bugfix branch:

```text
bugfix/<BUG-JIRA-KEY>-bug-<short-english-slug>
```

## PR target

| Defect detected in | Target |
|---|---|
| Task still under review | Affected Task branch |
| Story review | Affected Story branch |
| Epic review | Affected Epic branch |
| Final Sprint review on develop | `develop` |
| Defect in a DONE issue | Current appropriate integration branch, normally `develop` |

If a parent issue is IN REVIEW and the Bug blocks it:

```text
Parent IN REVIEW → IN PROGRESS
```

After Bug completion, rerun parent review and transition it normally.

If parent issue is DONE, do not reopen it.

---

# XVII. Out-of-Scope Regression Guard

Fail the review if Sprint 4 introduces:

- Full checkout transaction.
- FEFO allocation.
- MedicineBatch deduction during Draft Order.
- Payment.
- Invoice.
- DrugInteraction Rule.
- InteractionAlert.
- HIGH acknowledgement or note.
- AI Copilot.
- Neo4j projection.
- Graph-RAG.
- Coupon/discount/promotion.
- Full Customer Management.
- Multi-store/multi-warehouse.
- Direct MedicineBatch quantity editing.
- Custom JWT replacing Supabase Auth.

---

# XVIII. Evidence Updates

Update continuously:

```text
work-context/sprint-4/sprint-4-progress.md
work-context/sprint-4/sprint-4-audit.md
WORKING-CONTEXT.md
```

When the final decision is made, also update the Sprint 5 gate in:

```text
work-context/sprint-5/sprint-5.md
work-context/sprint-5/sprint-5-progress.md
work-context/sprint-5/sprint-5-audit.md
```

Do not set Sprint 5 implementation authorization until the final review is PASS.

Required evidence:

- Jira status and transition evidence.
- Exact branch.
- Commit SHA/message.
- PR URL.
- PR head/base.
- CI checks.
- Merge SHA/time.
- Automated tests.
- Manual UI results.
- Supabase Test Run IDs.
- Schema/migration evidence.
- Linked Bugs.
- Blocking Bugs.
- Cleanup evidence.

---

# XIX. Final Decision Rules

## PASS

Use only when all are true:

- All Jira issues are correctly DONE.
- All required PRs are merged through the correct hierarchy.
- `develop` contains all Sprint 4 changes.
- Exact branch audit passes.
- Commit Jira Key audit passes.
- Code tests and builds pass.
- Prisma and migration checks pass.
- Supabase data tests pass.
- Permission and ownership checks pass.
- InventoryAdjustment rules pass.
- POS Draft Order rules pass.
- PAC-TASK-185 hardening passes.
- No Blocker Bug remains.
- No unresolved High Bug affects Sprint 5.
- No out-of-scope implementation exists.
- Audit/progress evidence is complete.

Output:

```text
Sprint 4 Final Review = PASS
Ready for Sprint 5 = Yes
```

## FAIL

Use when review completed and one or more required checks fail but remediation is possible.

Output:

```text
Sprint 4 Final Review = FAIL
Ready for Sprint 5 = No
```

Create Bugs/remediation items and keep Sprint 5 issues in TO DO.

## BLOCKED

Use when review cannot be completed because evidence, MCP access, environment safety or a dependency is unavailable.

Output:

```text
Sprint 4 Final Review = BLOCKED
Ready for Sprint 5 = No
```

---

# XX. Final Report Template

```text
Sprint 4 Final Review

Decision:
Ready for Sprint 5:

MCP Connectivity:
- Jira:
- GitHub:
- Supabase:

Jira:
- Epic DONE:
- Story DONE:
- Task DONE:
- Illegal transitions:
- Open Bugs:
- Blocking Bugs:

GitHub:
- Exact branches:
- Task PRs:
- Story PRs:
- Epic PRs:
- Cross-sprint PAC-TASK-185:
- Commit Jira Key audit:
- Develop verification:

Code:
- Backend lint:
- Backend tests:
- Backend E2E:
- Backend build:
- Frontend lint:
- Frontend tests:
- Frontend build:
- Prisma validate:
- Prisma generate:

Supabase:
- Environment:
- Schema drift:
- Migration state:
- Inventory Adjustment test runs:
- POS Draft Order test runs:
- Rollback verification:
- Cleanup verification:

Business Rules:
- Inventory Adjustment:
- Direct MedicineBatch update blocked:
- POS Draft Order:
- Ownership:
- Permissions:
- Out-of-scope guard:

Findings:
- Blocker:
- High:
- Medium:
- Low:

Bugs created:
Bugs resolved:
Remaining risks:

Evidence files updated:
Next authorized action:
```

---

# XXI. Execution Order

1. Read all mandatory documents.
2. Verify Jira, GitHub and Supabase MCP connections.
3. Audit Jira issue counts, parent links, statuses and transitions.
4. Audit exact branches.
5. Audit commits.
6. Audit PR hierarchy and merges.
7. Pull latest `develop`.
8. Review Prisma schema and migrations.
9. Run repository tests and builds.
10. Confirm Supabase environment safety.
11. Run Inventory Adjustment data tests.
12. Run POS Draft Order data tests.
13. Run permission and ownership tests.
14. Run manual UI checks.
15. Create and resolve Bugs for defects.
16. Rerun all failed checks.
17. Update Sprint 4 progress/audit.
18. Produce the final report.
19. Set `Ready for Sprint 5 = Yes` only when the decision is PASS.
20. Keep all Sprint 5 Jira issues in TO DO until authorization is confirmed.
