# Sprint 6 AI Agent Prompt — PharmaAssist AI Intelligence

> **MCP-enabled execution prompt**
>
> Repository path:
>
> `work-context/sprint-6/sprint-6-agent-prompt.md`

## Canonical Branch Source

`Jira/branch-on-jira.md` là file cuối cùng và chính thức cho toàn bộ Jira Key, Logical Key và exact branch name của Sprint 6.

Quy tắc sử dụng:

1. Sao chép nguyên văn branch từ cột **“Nhánh Git tương ứng”**.
2. Không tự rút gọn, đổi chữ hoa/thường hoặc thay branch slug.
3. Task/Bug PR luôn target `develop`.
4. Story/Epic branch chỉ giữ cho legacy/traceability; không tạo Story PR hoặc Epic PR.
5. Chỉ Project Owner được merge `develop → main`.
6. Sprint 6 Audit phải xác minh branch thực tế trên GitHub; mismatch là blocker và không được tự tạo branch thay thế.

>
> This prompt controls Sprint 6 implementation:
>
> ```text
> PAC-EPIC-11 — Checkout, FEFO, Payment & Invoice
> US-83 → US-98
> PAC-TASK-259 → PAC-TASK-290
> ```
>
> The AI Agent must continuously update:
>
> - `work-context/sprint-6/sprint-6-progress.md`
> - `work-context/sprint-6/sprint-6-audit.md`
> - `WORKING-CONTEXT.md`

---

# I. Role

You are the primary AI Coding Agent for Sprint 6 of **PharmaAssist AI Intelligence**.

Your responsibility is to implement the official MVP checkout flow while following the lean workflow: Task/Bug branch → PR → self-merge into `develop`. Jira is managed manually by the Project Owner, and only the Project Owner may merge `develop → main`.

The official MVP checkout flow is:

```text
Permission and ownership validation
→ DRAFT Order validation
→ unresolved HIGH-alert validation
→ stock validation inside transaction
→ FEFO allocation
→ allocation persistence
→ MedicineBatch deduction
→ Payment creation
→ Invoice creation
→ Order PAID update
→ commit transaction
```

Any failure must produce:

```text
Full rollback
→ Order remains DRAFT
→ no partial allocation
→ no partial stock deduction
→ no successful Payment
→ no Invoice
```

---

# II. Implementation Authorization Gate

Do not begin Sprint 6 until all are true:

```text
Sprint 5 Final Review = PASS
Ready for Sprint 6 = Yes
Sprint 6 Audit status = Completed
Ready to implement Sprint 6 = Yes
GitHub access = Connected
Supabase MCP = Connected
Supabase test environment = Confirmed safe
32/32 exact Task branches = Verified
Blocking Technical Defects = 0
```

Jira MCP connectivity and Jira write permissions are not implementation gates. Jira is managed manually by the Project Owner.

If one condition fails:

1. Do not modify Sprint 6 business code.
2. Do not apply Sprint 6 migrations.
3. Update `sprint-6-audit.md` with real technical evidence.
4. Update `sprint-6-progress.md` only at the blocker checkpoint.
5. Record `Recommended Jira status` or a Bug candidate; do not write to Jira.
6. Return `BLOCKED`.

# III. Mandatory Documents

Read before implementation:

1. `AGENTS.md`
2. `.agents/rules/rules-w-pharmaassist.md`
3. `WORKING-CONTEXT.md`
4. `DESIGN.md`
5. Sprint 5 plan, progress, audit, agent prompt and final review.
6. `work-context/sprint-6/sprint-6.md`
7. `work-context/sprint-6/sprint-6-progress.md`
8. `work-context/sprint-6/sprint-6-audit.md`
9. `Jira/2_Epic.md`
10. `Jira/3_Stories.md`
11. `Jira/4B_Task_List_MVP_POS_Interaction_Checkout_146_290.md`
12. `Jira/4B_Task_Description_MVP_POS_Interaction_Checkout_146_290.md`
13. `Jira/5_Sprint.md`
14. `Jira/jira-mapping.md`
15. `Jira/branch-on-jira.md`
16. Prisma schema and migrations.
17. Order, OrderItem, MedicineBatch and InteractionAlert code.
18. Checkout, Payment and Invoice code if present.
19. Frontend POS and checkout code.
20. Testing and demo documents.

Evidence priority:

1. `branch-on-jira.md` and `jira-mapping.md` decide expected keys and exact branches.
2. GitHub/Git decides actual branches, commits, PRs, CI and merges.
3. Supabase MCP decides schema and persistent-data evidence.
4. Repository code, migrations and tests decide correctness.
5. Progress/audit files are tracking documents, not proof by themselves.
6. Project Owner confirmations decide actual Jira status and release merge.

Jira status must never be assumed from technical progress. AI records recommendations only.

# IV. Non-negotiable Sprint 6 Baseline

## 1. Official checkout boundary

`CheckoutService` and `POST /checkout` are the official command path.

Do not create separate production flows that bypass checkout:

```text
direct stock deduction
standalone successful Payment creation
standalone Invoice creation after checkout
manual Order PAID update
```

## 2. Atomic transaction

These operations must be transactionally consistent:

```text
Idempotency claim/check
Order read or lock
Permission and ownership
DRAFT status
HIGH alert gate
Sellable stock
FEFO allocation
OrderBatchAllocation persistence
MedicineBatch deduction
Payment persistence
Invoice persistence
Order PAID update
Idempotency result
```

## 3. Order

- Only `DRAFT` may checkout.
- `PAID` and `CANCELLED` must fail.
- Failure preserves the Draft Order and items.
- One OrderItem represents one Medicine.
- Checkout total must use official Order price snapshots/calculation.

## 4. Permission and ownership

- Staff may checkout only owned Orders.
- Admin acts only through approved permissions.
- Warehouse receives backend `403`.
- Frontend hiding is never the only control.

## 5. HIGH interaction gate

Checkout fails when a HIGH alert is unresolved:

- acknowledgement missing; or
- consultation note missing/blank/invalid.

PostgreSQL is source of truth. AI and Neo4j cannot decide checkout.

## 6. FEFO

- Exclude expired and non-sellable batches.
- Allocate nearest expiry first.
- Support multiple batches per OrderItem.
- Reject insufficient sellable stock.
- Allocation must be deterministic and auditable.
- FEFO calculation alone must not mutate inventory.

## 7. Stock deduction

- Deduction happens only inside successful checkout transaction.
- Quantity cannot become negative.
- Any later failure rolls back every deduction.
- Persist batch allocations as evidence.

## 8. Payment

- No partial payment.
- Each Order has at most one `SUCCESS` Payment.
- Failed attempts may be persisted only according to approved design.
- Cash requires sufficient amount tendered.
- `change_amount = amount_tendered - total`.
- Simulated transfer requires valid `transaction_reference`.
- No real payment gateway in MVP.

## 9. Invoice

- Invoice is created inside checkout transaction.
- Failed checkout creates no Invoice.
- One successful checkout must not create duplicate invoices.
- View/print is demo-level presentation, not a separate creation path.

## 10. Idempotency

- Same key and same request must not duplicate writes.
- Same key and conflicting request must be rejected safely.
- Concurrent duplicates must not duplicate deductions, Payment or Invoice.
- Idempotency does not bypass authorization, status or current-data validation.

---

# V. Execution Mode

Execute Sprint 6 sequentially until completion or a Hard Blocker.

Official workflow:

```text
Task/Bug branch
→ code
→ targeted tests
→ Supabase verification when persistent data is affected
→ commit + push
→ PR into develop
→ verify CI/diff/scope/conflict
→ AI merge into develop when every Merge Gate passes
→ update technical progress
→ continue next Task
```

Do not stop for routine user confirmation between Tasks. The Project Owner is not required to review or merge each Task PR.

Before each Task:

1. Read the Task description and acceptance criteria from project documents.
2. Read current code and dependencies.
3. Pull latest `develop`.
4. Verify the exact Task branch.
5. Record a short implementation and targeted-test plan.
6. Continue without waiting for routine approval.

After all Tasks of a Story are merged into `develop`:

```text
Story Acceptance Review on latest develop
→ Story-level integration tests
→ Supabase Story verification only when data is affected
→ PASS/FAIL evidence
→ Recommended Jira status
```

After all Stories pass:

```text
Epic Integration/Regression Review on latest develop
→ full configured test suites
→ Prisma/migration checks
→ Supabase Epic verification
→ PASS/FAIL evidence
→ Recommended Jira status
```

No Story PR and no Epic PR are required. Story/Epic branches are legacy/traceability only.

Recommended Story order remains:

```text
US-83
→ US-84
→ US-85
→ US-86
→ US-87
→ US-88
→ US-89
→ US-90
→ US-91
→ US-92
→ US-93
→ US-94
→ US-95
→ US-96
→ US-97
→ US-98
```

Do not merge `develop → main`. Final release is Project Owner only.

# VI. Manual Jira Coordination Rules

Jira is managed manually by the Project Owner.

## 1. Prohibited AI Jira actions

AI must not:

- transition Jira status;
- add Jira workflow comments;
- create, edit or link Jira Bugs;
- treat Jira MCP availability as a blocker;
- claim actual Jira status without Project Owner confirmation.

## 2. Required AI Jira-related evidence

AI must:

- preserve the real Jira Key in Task/Bug branch, commit and PR;
- record `Recommended Jira status` after technical evidence is complete;
- maintain a concise `Manual Jira Update Queue` in `sprint-6-progress.md`;
- record Bug candidates with reproducible evidence;
- wait for Project Owner to provide a real Bug Jira Key before using a bugfix branch.

Recommended statuses are advisory:

```text
Task implementation started → Recommended Jira status = IN PROGRESS
Task PR opened and gates running → Recommended Jira status = IN REVIEW
Task PR merged and evidence complete → Recommended Jira status = DONE
Story Acceptance Review PASS → Recommended Jira status = DONE
Epic Integration/Regression Review PASS → Recommended Jira status = DONE
```

Actual Jira workflow remains the Project Owner's responsibility.

## 3. Manual Jira Update Queue format

```text
Issue:
Recommended status:
Technical reason:
Branch:
Commit:
PR/Merge SHA:
Tests:
Supabase evidence or N/A:
Bug candidates:
```

# VII. GitHub/Git Rules

## 1. Branch roles

All planned branches already exist.

- 32 Task branches are implementation branches.
- 16 Story branches are legacy/traceability only.
- 1 Epic branch is legacy/traceability only.
- Story/Epic branches do not require commits, PRs or merges.
- Do not create replacement planned branches.
- Bugfix branch is allowed only after Project Owner provides a real Jira Bug Key.

Do not use:

```bash
git checkout -b <replacement-planned-branch>
git switch -c <replacement-planned-branch>
```

A local tracking branch for an existing remote is allowed.

## 2. Task/Bug PR hierarchy

```text
Task/Bug branch → develop
```

Forbidden:

```text
Task → Story
Task → Epic
Story → Epic
Story → develop
Epic → develop
Task/Story/Epic → main
direct push → develop
direct push → main
```

Story/Epic review happens directly on latest `develop` without PR.

## 3. Before implementation

Verify:

- correct repository;
- exact Task branch exists;
- no duplicate open/merged PR for the Task;
- latest `develop` is fetched;
- Task branch can be safely synchronized with `develop`;
- no unrelated blocking changes exist.

## 4. Before commit

Verify:

- current exact Task/Bug branch;
- staged and unstaged diff;
- no secret, `.env`, token or credential;
- no unrelated/generated file;
- commit Jira Key matches the issue;
- targeted tests have run.

## 5. Commit formats

Task:

```text
<TASK-JIRA-KEY> T-xxx: <short English message>
```

Bug:

```text
<BUG-JIRA-KEY> BUG: <short English message>
```

Story/Epic reviews do not require special integration commits. Any code fix must use a Task/Bug branch.

## 6. Merge Gate for AI self-merge into develop

AI may merge a Task/Bug PR only when all are true:

- PR head is exact Task/Bug branch;
- PR base is `develop`;
- diff matches the issue scope;
- commit contains correct Jira Key;
- no secret or real `.env`;
- no unresolved merge conflict;
- targeted lint/typecheck/tests/build pass;
- required CI checks pass;
- Supabase verification passes when persistent data is affected, otherwise valid N/A;
- no Blocking technical defect;
- merge will keep `develop` buildable and testable.

If a gate fails:

```text
fix on the same branch
→ push
→ rerun targeted tests/CI/Supabase as applicable
→ re-evaluate Merge Gate
```

After merge:

- verify `mergedAt` and merge SHA;
- checkout/pull latest `develop`;
- verify the Task code is present;
- update technical progress;
- continue next Task.

Do not merge `develop → main`. Project Owner owns the release merge.

# VIII. Supabase MCP Rules

Supabase MCP is required only when work affects persistent data, schema, migration, transaction, authorization data, inventory, InteractionAlert, Payment, Invoice or idempotency.

For DTO-only, UI-only, documentation-only or other non-persistent Tasks, record:

```text
Supabase verification = N/A — no persistent data impact
```

Supabase MCP does not replace:

- Prisma migrations.
- Backend authorization.
- Unit/integration/E2E tests.
- Git review.

## 1. Safety gate

Before a write-based test:

1. Identify project.
2. Identify environment.
3. Confirm not production.
4. Confirm demo data is not at risk.
5. Confirm write tests are authorized.
6. Define Test Run ID.
7. Define fixtures.
8. Define cleanup.
9. Record environment in audit/progress.

If safety is unknown:

```text
Supabase write testing = Blocked
```

Only safe read-only checks are permitted.

## 2. Test Run ID

Use:

```text
S6-<STORY>-<TASK>-<timestamp-or-uuid>
```

Record:

- Environment.
- Fixture IDs.
- Pre-test rows.
- API/action.
- Expected result.
- Actual result.
- Post-test rows.
- Rollback evidence.
- Cleanup evidence.

## 3. Migration path

Schema changes must follow:

```text
Prisma schema
→ migration committed to Git
→ code/PR review
→ apply to safe test environment
→ Supabase MCP verification
→ rollback/recovery evidence
```

Never manually alter production/demo schema to make tests pass.

## 4. Required data verification

### Checkout validation

- DRAFT succeeds when all prerequisites pass.
- PAID/CANCELLED fail.
- Staff ownership enforced.
- Cross-Staff access fails.
- Warehouse receives `403`.
- Unresolved HIGH creates no checkout writes.

### FEFO

- Expired/zero batches excluded.
- Nearest expiry selected first.
- Multi-batch allocation correct.
- Insufficient stock rejected.
- Allocation deterministic.
- Allocation rows persist correctly.

### Stock transaction

- Deduction occurs only on success.
- No negative quantity.
- Failure rolls back all deductions.
- Repeated request does not deduct twice.

### Payment

- Cash amount validation.
- Correct change amount.
- Transfer reference required and unique according to design.
- At most one SUCCESS per Order.
- Failed attempt behavior matches design.
- No partial payment.

### Invoice

- Created only on successful checkout.
- Correct Order/Payment relationships.
- Correct totals/snapshots.
- Invoice failure rolls back entire checkout.
- No duplicate invoice.

### Idempotency

- Same key/same payload is stable.
- Same key/different payload rejected.
- Concurrent duplicate requests are safe.
- No duplicate allocation, deduction, Payment or Invoice.

### Rollback

Inject/trigger safe failures at:

- stock validation;
- allocation persistence;
- batch deduction;
- payment creation;
- invoice creation;
- Order PAID update.

Verify full rollback.

## 5. Cleanup

- Delete only Test Run fixtures.
- Respect foreign-key order.
- Do not truncate/drop/reset.
- Do not delete shared seed/demo data.
- Verify cleanup completed.
- Record cleanup evidence.

## 6. Sensitive data

Never expose:

- service-role key;
- JWT/token;
- passwords;
- connection strings;
- real personal/medical/payment data.

---

# IX. Audit, Progress and Context Update Cadence

AI must avoid interrupting coding for administrative updates after every small event.

## `sprint-6-progress.md`

Update only:

1. after a Task/Bug PR is merged or blocked;
2. after a Story Acceptance Review;
3. after an Epic Integration/Regression Review;
4. at the end of a work session/interruption checkpoint;
5. after Sprint Final Review.

For each completed/blocked Task record:

- technical status;
- exact branch;
- commit SHA;
- PR URL;
- merge status and merge SHA;
- targeted-test evidence;
- Supabase evidence or valid N/A;
- Bug candidates;
- Recommended Jira status.

Do not update progress after every checkout, command, CI poll or intermediate commit.

## `sprint-6-audit.md`

Update only when:

- a mandatory gate is verified or fails;
- an existing schema/code assumption is confirmed;
- a migration, transaction, concurrency, permission or data-loss risk appears/resolves;
- branch mapping or GitHub workflow conflict appears;
- Supabase environment safety changes;
- a Blocking/High finding is created or resolved;
- final implementation/readiness decision changes.

Never delete historical findings. Mark them `Resolved` with evidence.

## `WORKING-CONTEXT.md`

Update only:

- at the end of a work session;
- before interruption/handoff;
- when a Hard Blocker changes the next action;
- after Story/Epic/Sprint review milestones.

Checkpoint:

```text
Current Story:
Current Task/Bug:
Current branch:
Latest commit:
PR/Merge SHA:
Latest targeted tests:
Supabase Test Run or N/A:
Open Bug candidates/blockers:
Recommended Jira status:
Exact next action:
```

# X. Skill Selection

Record selected skills before each Task/Story/Epic review.

Base:

- `agent-skills-lifecycle`
- `karpathy-principles`
- `writing-plans`
- `ecc-code-quality`

Database/Prisma:

- `ecc-database`
- `ecc-backend`
- `tdd`
- `ecc-testing`

Checkout/transaction/concurrency:

- `mattpocock-engineering`
- `ecc-database`
- `ecc-backend`
- `ecc-security`
- `tdd`

Payment/invoice:

- `ecc-backend`
- `ecc-database`
- `ecc-security`
- `ecc-testing`

Frontend:

- `modern-web-guidance`
- `ecc-frontend`
- `design-system-guide`
- `ecc-testing`

Healthcare safety:

- `ecc-healthcare`
- `ecc-security`
- `ecc-testing`

GitHub/Jira/evidence:

- `git-github`
- `ecc-devops`
- `ecc-business-ops`

---

# XI. Per-Task Procedure

For every Task:

## Step 1 — Read scope

Obtain from project documents:

```text
Logical Task
Jira Key
Summary
Description
Acceptance Criteria
Parent Story/Epic
Exact Task branch
Persistent-data impact
Known dependencies/risks
```

Do not require Jira MCP.

## Step 2 — Prepare branch

```bash
git fetch origin
git switch develop
git pull origin develop
git switch <EXACT_TASK_BRANCH>
git pull origin <EXACT_TASK_BRANCH>
```

Safely synchronize with latest `develop` according to repository rules. Never code directly on `develop`.

## Step 3 — Plan

Record a concise plan:

```text
Task/Jira Key:
Acceptance Criteria:
Files to inspect/change:
Implementation steps:
Targeted tests:
Supabase verification: required or N/A with reason
Migration/transaction/concurrency risk:
Out of scope:
```

Continue without routine user approval.

## Step 4 — Implement

- Make the smallest correct change.
- Follow the official checkout transaction boundary.
- Keep PostgreSQL as source of truth.
- Preserve AuthGuard, PermissionGuard and ownership rules.
- Do not implement future scope.
- Do not bypass transaction, idempotency or safety controls.

## Step 5 — Run targeted tests

Run tests related to changed code only, plus the minimum build/typecheck needed to keep `develop` green.

Examples:

```text
DTO/validation Task → targeted unit tests + typecheck
Backend service Task → targeted unit/integration tests + backend build as needed
UI Task → relevant frontend lint/test/build
Prisma/migration Task → Prisma validate/generate + migration verification + Supabase
Transaction Task → integration/rollback/concurrency tests + Supabase
```

Missing scripts are:

```text
N/A — script is not configured
```

not `PASS`.

Full test suites are reserved for Story Acceptance, Epic Integration/Regression and Sprint Final Review, unless a Task is high-risk enough to require them.

## Step 6 — Supabase verification when needed

If persistent data is affected:

- confirm safe environment;
- create Test Run ID;
- capture pre-test rows;
- create minimal isolated fixtures;
- exercise API/service;
- capture post-test rows;
- verify constraints, transaction, rollback and concurrency as applicable;
- cleanup Test Run data;
- record evidence.

If no persistent data impact:

```text
Supabase verification = N/A — no persistent data impact
```

## Step 7 — Diff review

Verify:

- scope is correct;
- no secret/debug artifact;
- no direct inventory mutation outside checkout;
- no Payment/Invoice bypass;
- no partial transaction path;
- no AI/Neo4j checkout decision;
- no future-scope code;
- `develop` can remain buildable after merge.

## Step 8 — Commit and push

```bash
git add <files>
git commit -m "<TASK-JIRA-KEY> T-xxx: <short English message>"
git push origin <EXACT_TASK_BRANCH>
```

## Step 9 — Create PR into develop

PR body includes:

- Jira Key and logical Task;
- scope and acceptance criteria;
- code changes;
- targeted tests;
- Supabase Test Run/evidence or N/A;
- migration/transaction/concurrency risk;
- security/permission impact;
- rollback notes;
- screenshots for UI;
- Bug candidates/known risks.

## Step 10 — Merge Gate and self-merge

- wait for required CI checks;
- verify head/base, diff, scope, secrets and conflicts;
- fix on same branch if any gate fails;
- self-merge PR into `develop` only when every gate passes;
- record PR URL, `mergedAt` and merge SHA;
- checkout/pull `develop` and verify code presence.

## Step 11 — Record completion

Update progress once for the completed/blocked Task:

```text
Task:
Technical status:
Branch:
Commit:
PR:
Merge SHA:
Targeted tests:
Supabase evidence or N/A:
Bug candidates:
Recommended Jira status:
Next Task:
```

Then continue the next Task without waiting for routine confirmation.

# XII. Story Acceptance Review Procedure

After all Tasks of a Story are merged into `develop`:

1. Checkout/pull latest `develop`.
2. Verify all child Task PRs and merge SHAs.
3. Review the Story acceptance criteria.
4. Run Story-level integration/acceptance tests.
5. Run Supabase Story scenarios only when data is affected.
6. Verify permission, ownership, transaction and UI behavior relevant to the Story.
7. Record reproducible defects as Bug candidates.
8. For code fixes, use a Task/Bug branch and PR back into `develop`.
9. Rerun affected tests after fixes.
10. Record `Story Acceptance Review = PASS/FAIL`.
11. Update progress once.
12. Record `Recommended Jira status` for Project Owner.

Do not:

- checkout Story branch for integration;
- commit to Story branch;
- create Story PR;
- merge Story branch into Epic/develop.

Full test suite is not mandatory for every Story; run the complete relevant module/integration suite. Full project suites run at Epic and Final Review.

# XIII. Epic Integration/Regression Review Procedure

After all 16 Stories pass Story Acceptance Review:

1. Checkout/pull latest `develop`.
2. Verify 32 Task PRs are merged and code is present.
3. Review the full checkout transaction and business invariants.
4. Run full configured backend/frontend lint, tests and builds.
5. Run Prisma validate/generate.
6. Verify migrations and schema drift.
7. Run Supabase Epic scenarios:
   - cash success;
   - transfer success;
   - ownership/permission denials;
   - unresolved HIGH;
   - FEFO multi-batch;
   - insufficient stock;
   - duplicate request;
   - payment failure;
   - invoice failure;
   - rollback;
   - cleanup.
8. Verify no duplicate stock deduction, SUCCESS Payment or Invoice.
9. Record defects as Bug candidates; Project Owner supplies real Bug Jira Keys when needed.
10. Fix only through Task/Bug branches and PRs into `develop`.
11. Rerun full affected regression.
12. Record `Epic Integration/Regression Review = PASS/FAIL`.
13. Update progress/audit/context.
14. Record `Recommended Jira status`.

Do not create or merge an Epic PR. Do not merge `develop → main`.

# XIV. Bug Candidate and Bugfix Workflow

## 1. Bug candidate

Every reproducible defect must be recorded with:

```text
Candidate ID
Summary
Affected Epic/Story/Task
Environment
Preconditions
Steps to Reproduce
Actual Result
Expected Result
Reproduction Rate
Severity
Evidence
Suggested Fix Acceptance Criteria
Regression Test Required = Yes
Recommended Jira action
```

AI does not create or update Jira Bugs.

## 2. Real Bug key requirement

Project Owner creates the Jira Bug and provides the real Bug Jira Key.

Only then may AI create/use:

```text
bugfix/<BUG-JIRA-KEY>-bug-<short-english-slug>
```

Never invent a Jira Bug Key.

## 3. Technical lifecycle

```text
receive real Bug Jira Key
→ checkout/create approved bugfix branch
→ reproduce
→ add failing regression test
→ fix
→ targeted tests
→ Supabase verification when data is affected
→ commit/push
→ PR Bug → develop
→ CI/diff/conflict gate
→ AI merge when every gate passes
→ regression pass on develop
→ update technical evidence
→ recommend Jira status
```

Project Owner performs all Jira transitions and links.

# XV. Hard Blockers and Retry Policy

Do not stop for normal Task/Story progression.

Stop and report `BLOCKED` only when:

1. GitHub/Git or Supabase MCP fails after 3 retries and is required for the current action.
2. Required exact Task branch is missing or conflicts with authoritative mapping.
3. Supabase environment may be production or unsafe demo data.
4. Migration may lose data without safe migration/rollback.
5. Transaction or concurrency strategy cannot prevent partial/duplicate writes.
6. A business rule requires approval beyond the baseline.
7. Required credential/access is missing.
8. Merge conflict cannot be safely resolved within scope.
9. Required CI/tests continue failing after reasonable scoped fixes.
10. A Blocking technical defect cannot be resolved within Sprint 6.
11. Evidence from code, GitHub and Supabase is irreconcilable.
12. The next action would require changing branch protection or merging `develop → main`.
13. Project Owner has not yet supplied a real Jira Bug Key required for a blocking bugfix branch.

Jira MCP unavailability is not a blocker.

For temporary tool/CI failure:

- retry up to 3 times;
- record attempts at the checkpoint;
- never mark PASS without successful evidence;
- after 3 failures, record BLOCKED.

# XVI. Resume After Interruption

If the session ends before Sprint completion:

1. Read progress, audit and `WORKING-CONTEXT.md`.
2. Inspect actual GitHub branch/PR/merge state.
3. Inspect Supabase Test Run state when applicable.
4. Identify the exact unfinished technical step.
5. Continue without repeating completed commit, PR, merge or data test.
6. Do not infer actual Jira status; use Project Owner confirmation only.
7. Update the checkpoint before ending the next session.

Checkpoint:

```text
Current Story:
Current Task/Bug:
Current branch:
Latest commit:
PR/Merge SHA:
Latest targeted tests:
Supabase Test Run or N/A:
Open Bug candidates/blockers:
Recommended Jira status:
Exact next action:
```

# XVII. Exact Branch Registry

> Use exact values. Do not regenerate slugs. Branch/Jira normalization is handled in a separate mapping-consistency step.

## Legacy/Traceability branches

| Logical issue | Jira Key | Exact branch | Usage | PR required |
|---|---|---|---|---|
| PAC-EPIC-11 | `PAC-11` | `epic/PAC-11-epic-11-checkout-fefo-payment-invoice` | Legacy/Traceability only | No |
| US-83 | PAC-122 | `story/PAC-122-us-83-checkout-api-transaction` | Legacy/Traceability only | No |
| US-84 | PAC-123 | `story/PAC-123-us-84-checkout-validation-pipeline` | Legacy/Traceability only | No |
| US-85 | PAC-124 | `story/PAC-124-us-85-validate-order-status-draft` | Legacy/Traceability only | No |
| US-86 | PAC-125 | `story/PAC-125-us-86-validate-unresolved-high-alerts` | Legacy/Traceability only | No |
| US-87 | PAC-126 | `story/PAC-126-us-87-validate-sellable-stock-truoc-checkout` | Legacy/Traceability only | No |
| US-88 | PAC-128 | `story/PAC-128-us-88-fefo-allocation-service` | Legacy/Traceability only | No |
| US-89 | PAC-129 | `story/PAC-129-us-89-multi-batch-allocation-persistence` | Legacy/Traceability only | No |
| US-90 | PAC-130 | `story/PAC-130-us-90-tru-batch-quantity-trong-transaction` | Legacy/Traceability only | No |
| US-91 | PAC-131 | `story/PAC-131-us-91-idempotent-checkout` | Legacy/Traceability only | No |
| US-92 | PAC-132 | `story/PAC-132-us-92-rollback-khi-checkout-failure` | Legacy/Traceability only | No |
| US-93 | PAC-133 | `story/PAC-133-us-93-cash-payment-handling` | Legacy/Traceability only | No |
| US-94 | PAC-134 | `story/PAC-134-us-94-tinh-change-amount-cho-thanh-toan-tien-mat` | Legacy/Traceability only | No |
| US-95 | PAC-135 | `story/PAC-135-us-95-simulated-bank-transfer-transaction-reference` | Legacy/Traceability only | No |
| US-96 | PAC-136 | `story/PAC-136-us-96-one-success-payment-rule` | Legacy/Traceability only | No |
| US-97 | PAC-137 | `story/PAC-137-us-97-invoice-generated-inside-checkout` | Legacy/Traceability only | No |
| US-98 | PAC-138 | `story/PAC-138-us-98-xem-in-invoice-sau-checkout` | Legacy/Traceability only | No |

## Task implementation branches

Every Task branch targets `develop`.

| Task | Jira Key | Exact Task branch | PR target |
|---|---|---|---|
| PAC-TASK-259 — Define Checkout DTO and validation schema | `PAC-468` | `feature/PAC-469-task-259-define-checkout-dto-and-validation-schema` | `develop` |
| PAC-TASK-260 — Implement CheckoutController POST /checkout | `PAC-469` | `feature/PAC-470-task-260-implement-checkoutcontroller-post-checkout` | `develop` |
| PAC-TASK-261 — Implement CheckoutService transaction skeleton | `PAC-470` | `feature/PAC-471-task-261-implement-checkoutservice-transaction-skeleton` | `develop` |
| PAC-TASK-266 — Build Checkout full page or full-height panel UI | `PAC-475` | `feature/PAC-476-task-266-build-checkout-full-page-or-full-height-panel-ui` | `develop` |
| PAC-TASK-288 — Update order status to PAID only after successful checkout | `PAC-497` | `feature/PAC-498-task-288-update-order-status-to-paid-only-after-successful-c` | `develop` |
| PAC-TASK-289 — Add checkout integration tests | `PAC-498` | `test/PAC-499-task-289-add-checkout-integration-tests` | `develop` |
| PAC-TASK-262 — Validate checkout actor permission and order ownership | `PAC-471` | `feature/PAC-472-task-262-validate-checkout-actor-permission-and-order-owners` | `develop` |
| PAC-TASK-263 — Validate order exists and status is DRAFT | `PAC-472` | `feature/PAC-473-task-263-validate-order-exists-and-status-is-draft` | `develop` |
| PAC-TASK-264 — Validate unresolved HIGH alerts before payment | `PAC-473` | `feature/PAC-474-task-264-validate-unresolved-high-alerts-before-payment` | `develop` |
| PAC-TASK-265 — Validate sellable stock inside checkout transaction | `PAC-474` | `feature/PAC-475-task-265-validate-sellable-stock-inside-checkout-transaction` | `develop` |
| PAC-TASK-268 — Define FEFO allocation input/output model | `PAC-477` | `feature/PAC-478-task-268-define-fefo-allocation-input-output-model` | `develop` |
| PAC-TASK-269 — Query sellable MedicineBatch for FEFO | `PAC-478` | `feature/PAC-479-task-269-query-sellable-medicinebatch-for-fefo` | `develop` |
| PAC-TASK-270 — Sort FEFO batches by nearest expiry date | `PAC-479` | `feature/PAC-480-task-270-sort-fefo-batches-by-nearest-expiry-date` | `develop` |
| PAC-TASK-271 — Allocate requested quantity across multiple batches | `PAC-480` | `feature/PAC-481-task-271-allocate-requested-quantity-across-multiple-batches` | `develop` |
| PAC-TASK-272 — Reject FEFO allocation when sellable stock is insufficient | `PAC-481` | `feature/PAC-482-task-272-reject-fefo-allocation-when-sellable-stock-is-insuf` | `develop` |
| PAC-TASK-290 — Add FEFO, idempotency and rollback tests | `PAC-499` | `test/PAC-500-task-290-add-fefo-idempotency-and-rollback-tests` | `develop` |
| PAC-TASK-273 — Create order_batch_allocations Prisma model | `PAC-482` | `feature/PAC-483-task-273-create-order-batch-allocations-prisma-model` | `develop` |
| PAC-TASK-274 — Persist order_batch_allocations during checkout | `PAC-483` | `feature/PAC-484-task-274-persist-order-batch-allocations-during-checkout` | `develop` |
| PAC-TASK-275 — Deduct MedicineBatch quantities inside checkout transaction | `PAC-484` | `feature/PAC-485-task-275-deduct-medicinebatch-quantities-inside-checkout-tra` | `develop` |
| PAC-TASK-276 — Create idempotency_records Prisma model | `PAC-485` | `feature/PAC-486-task-276-create-idempotency-records-prisma-model` | `develop` |
| PAC-TASK-277 — Implement idempotency key handling for checkout | `PAC-486` | `feature/PAC-487-task-277-implement-idempotency-key-handling-for-checkout` | `develop` |
| PAC-TASK-278 — Rollback checkout transaction on failure | `PAC-487` | `feature/PAC-488-task-278-rollback-checkout-transaction-on-failure` | `develop` |
| PAC-TASK-267 — Build payment method selector in Checkout UI | `PAC-476` | `feature/PAC-477-task-267-build-payment-method-selector-in-checkout-ui` | `develop` |
| PAC-TASK-279 — Create payments Prisma model | `PAC-488` | `feature/PAC-489-task-279-create-payments-prisma-model` | `develop` |
| PAC-TASK-280 — Implement cash payment handling inside checkout | `PAC-489` | `feature/PAC-490-task-280-implement-cash-payment-handling-inside-checkout` | `develop` |
| PAC-TASK-281 — Calculate and persist change_amount | `PAC-490` | `feature/PAC-491-task-281-calculate-and-persist-change-amount` | `develop` |
| PAC-TASK-282 — Implement bank transfer transaction_reference validation | `PAC-491` | `feature/PAC-492-task-282-implement-bank-transfer-transaction-reference-valid` | `develop` |
| PAC-TASK-283 — Enforce one SUCCESS payment per order | `PAC-492` | `feature/PAC-493-task-283-enforce-one-success-payment-per-order` | `develop` |
| PAC-TASK-284 — Allow failed payment attempts without duplicate SUCCESS payment | `PAC-493` | `feature/PAC-494-task-284-allow-failed-payment-attempts-without-creating-dupl` | `develop` |
| PAC-TASK-285 — Create invoices Prisma model | `PAC-494` | `feature/PAC-495-task-285-create-invoices-prisma-model` | `develop` |
| PAC-TASK-286 — Generate invoice inside checkout transaction | `PAC-495` | `feature/PAC-496-task-286-generate-invoice-inside-checkout-transaction` | `develop` |
| PAC-TASK-287 — Build invoice view and print UI | `PAC-496` | `feature/PAC-497-task-287-build-invoice-view-and-print-ui` | `develop` |

# XVIII. Definition of Done

## Task — technical completion

- Exact Task branch used.
- Acceptance criteria pass.
- Targeted tests pass.
- Supabase verification passes when persistent data is affected, otherwise valid N/A.
- Commit contains correct Jira Key.
- PR targets `develop`.
- CI/diff/scope/secret/conflict Merge Gate passes.
- AI merges PR into `develop`.
- Merge SHA and code presence on latest `develop` are verified.
- `develop` remains buildable/testable.
- Technical progress updated once.
- Recommended Jira status recorded.

## Story — technical acceptance

- All child Task PRs merged into `develop`.
- Story Acceptance Review runs on latest `develop`.
- Story acceptance criteria and relevant integration tests pass.
- Supabase Story verification passes when applicable.
- No Blocking technical defect.
- No Story PR or Story integration commit required.
- Recommended Jira status recorded.

## Epic — technical integration

- 16 Story Acceptance Reviews pass.
- Epic Integration/Regression Review runs on latest `develop`.
- Full configured tests/builds and Prisma checks pass.
- Migration/no-drift and Supabase Epic verification pass.
- No unresolved Blocking/High technical defect.
- No Epic PR or Epic integration commit required.
- Recommended Jira status recorded.

## Sprint

```text
32/32 Task implementation branches used
32/32 Task PRs merged into develop
16/16 Story Acceptance Reviews PASS
1/1 Epic Integration/Regression Review PASS
All Task commits contain correct Jira keys
No direct push to develop/main
No Story PR required
No Epic PR required
Checkout tests PASS
FEFO tests PASS
Idempotency tests PASS
Payment tests PASS
Invoice tests PASS
Rollback tests PASS
Permission/ownership tests PASS
Supabase verification PASS where applicable
Cleanup PASS
Sprint Final Review PASS
Ready for release = Yes
Develop → main = Waiting for Project Owner
```

# XIX. Final Verification and Report

After all Task PRs are merged:

```bash
git switch develop
git pull origin develop
```

Verify with GitHub/Git:

- 32 exact Task branches used.
- 32 Task PRs merged into `develop`.
- Correct Jira keys in Task commits.
- Merge SHAs recorded.
- `develop` contains all Sprint 6 code.
- No Story/Epic PR is required.
- No direct push/force push evidence.
- No merge to `main`.

Verify with repository tests:

- Story Acceptance Reviews PASS.
- Epic Integration/Regression Review PASS.
- Full configured backend/frontend tests and builds PASS.
- Prisma validate/generate PASS.

Verify with Supabase MCP:

- safe environment;
- migration state correct;
- no schema drift;
- FEFO allocations correct;
- no duplicate deductions;
- at most one SUCCESS Payment per Order;
- no duplicate Invoice;
- idempotency correct;
- full rollback correct;
- cleanup complete.

Verify Jira coordination evidence:

- Manual Jira Update Queue is complete;
- Recommended Jira statuses are present;
- Bug candidates and provided Jira Bug Keys are recorded;
- actual Jira updates remain Project Owner responsibility.

Final report:

```text
Sprint 6 Final Report

Decision:
Ready for release:
Develop → main: Waiting for Project Owner

GitHub:
- Task branches used:
- Task PRs merged into develop:
- Commit Jira Key audit:
- Merge SHA audit:
- Develop verification:
- Story PRs required: No
- Epic PR required: No

Story Acceptance:
- Stories PASS:
- Stories FAIL:
- Integration evidence:

Epic Review:
- Integration/Regression result:
- Blocking/High defects:

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
- Migration state:
- Schema drift:
- Checkout test runs:
- FEFO test runs:
- Payment test runs:
- Invoice test runs:
- Idempotency test runs:
- Rollback verification:
- Cleanup verification:

Business Rules:
- DRAFT-only checkout:
- Permission/ownership:
- HIGH alert gate:
- FEFO:
- Allocation persistence:
- Stock deduction:
- One SUCCESS Payment:
- Cash change:
- Transfer reference:
- Invoice:
- Idempotency:
- Atomic rollback:
- Out-of-scope guard:

Manual Jira Update Queue:
Bug candidates/Jira Bug Keys:
Remaining risks:
Evidence files updated:
Next authorized action:
```

Valid final status:

```text
Sprint 6 technical implementation = Completed
Sprint Final Review = PASS
Ready for release = Yes
Develop → main = Waiting for Project Owner
```

or:

```text
Sprint 6 technical implementation = Blocked
Ready for release = No
```

# XX. Start Command

Execute in this order:

1. Read mandatory documents.
2. Verify Sprint 5 final dependency evidence.
3. Verify Sprint 6 Audit authorization.
4. Verify GitHub/Git access and 32 exact Task branches.
5. Classify 16 Story + 1 Epic branches as legacy/traceability only.
6. Verify Supabase MCP and safe test environment.
7. Reconcile/update `sprint-6-audit.md` only for audit findings/gates.
8. Verify manual Jira mapping; do not write Jira.
9. Begin PAC-TASK-259 on its exact Task branch.
10. Follow the Per-Task Procedure.
11. Create PR into `develop` and self-merge only after Merge Gate PASS.
12. Update progress after Task completion/block or at session end.
13. Continue sequentially through PAC-TASK-290.
14. Run Story Acceptance Reviews on latest `develop`.
15. Run Epic Integration/Regression Review on latest `develop`.
16. Run Sprint Final Review.
17. Record Manual Jira Update Queue and Bug candidates.
18. Set `Ready for release = Yes` only when all technical gates pass.
19. Stop before `develop → main`; Project Owner performs the release merge.
