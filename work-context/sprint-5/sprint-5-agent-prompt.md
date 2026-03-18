# Sprint 5 AI Agent Prompt — PharmaAssist AI Intelligence

> **MCP-enabled execution prompt**
>
> Repository path:
>
> `work-context/sprint-5/sprint-5-agent-prompt.md`
>
> This prompt controls the implementation of Sprint 5 and requires coordinated use of:
>
> - Jira MCP
> - GitHub MCP
> - Supabase MCP
>
> The AI Agent must continuously update:
>
> - `work-context/sprint-5/sprint-5-progress.md`
> - `work-context/sprint-5/sprint-5-audit.md`
> - `WORKING-CONTEXT.md`

---

# I. Role

You are the primary AI Coding Agent for **PharmaAssist AI Intelligence**.

Your responsibility is to implement Sprint 5:

```text
PAC-EPIC-09 — DrugInteraction Rule
PAC-EPIC-10 — InteractionAlert
US-69 → US-82
PAC-TASK-227 → PAC-TASK-258
```

You must coordinate Jira, GitHub and Supabase evidence during the entire workflow.

The required execution flow is:

```text
Read Jira issue
→ verify current Jira status
→ TO DO → IN PROGRESS
→ verify exact existing branch with GitHub MCP
→ checkout exact branch
→ inspect code and data dependencies
→ implement
→ test code
→ test and verify data with Supabase MCP
→ review diff
→ commit with correct Jira Key
→ push exact branch
→ create PR to correct parent branch
→ IN PROGRESS → IN REVIEW
→ verify PR checks and review
→ fix review findings if needed
→ merge PR
→ verify merge result
→ IN REVIEW → DONE
→ update progress, audit and working context
```

When any defect is found:

```text
Create Jira BUG
→ BUG starts in TO DO
→ TO DO → IN PROGRESS
→ create Bugfix branch using Bug Jira Key
→ reproduce defect
→ add regression test
→ fix defect
→ test code
→ verify data with Supabase MCP
→ commit with Bug Jira Key
→ push
→ create PR
→ IN PROGRESS → IN REVIEW
→ review/checks
→ merge
→ verify regression
→ IN REVIEW → DONE
```

---

# II. Implementation Authorization Gate

Do not begin Sprint 5 implementation unless all conditions are true:

```text
Audit status = Completed
Ready to implement Sprint 5 = Yes
Sprint 4 = Completed
Sprint 4 Epic PRs merged into develop
Jira MCP = Connected
GitHub MCP = Connected
Supabase MCP = Connected
Supabase test environment = Confirmed safe
Exact 48 Sprint 5 branches = Verified
Blocking Bugs = 0
```

If any condition fails:

1. Keep every Sprint 5 issue in `TO DO`.
2. Do not change business code.
3. Record the blocker in `sprint-5-audit.md`.
4. Record the status in `sprint-5-progress.md`.
5. Stop implementation.

---

# III. Mandatory Documents

Read before implementation:

1. `AGENTS.md`
2. `.agents/rules/rules-w-pharmaassist.md`
3. `WORKING-CONTEXT.md`
4. `DESIGN.md`
5. `work-context/sprint-4/sprint-4.md`
6. `work-context/sprint-4/sprint-4-progress.md`
7. `work-context/sprint-4/sprint-4-audit.md`
8. `work-context/sprint-4/sprint-4-final-review-prompt.md`
9. `work-context/sprint-5/sprint-5.md`
10. `work-context/sprint-5/sprint-5-progress.md`
11. `work-context/sprint-5/sprint-5-audit.md`
12. `Jira/2_Epic.md`
13. `Jira/3_Stories.md`
14. `Jira/4B_Task_List_MVP_POS_Interaction_Checkout_146_290.md`
15. `Jira/4B_Task_Description_MVP_POS_Interaction_Checkout_146_290.md`
16. `Jira/5_Sprint.md`
17. `Jira/jira-mapping.md`
18. `Jira/branch-on-jira.md`
19. Prisma schema and migrations.
20. Relevant SRS, API, database, UI/UX and testing documents.

Source priority:

1. `branch-on-jira.md` decides the exact pre-created branch.
2. `jira-mapping.md` decides the actual Jira key.
3. Jira MCP decides current status and available transitions.
4. GitHub MCP decides real branch, commit, PR and merge evidence.
5. Supabase MCP decides real schema and data-test evidence.
6. Task List/Description decide scope and expected result.

---

# IV. Non-negotiable Sprint 5 Baseline

## DrugInteraction Rule

- PostgreSQL is source of truth.
- Rule level is ActiveIngredient–ActiveIngredient.
- Medicine–Medicine is not the official rule source.
- Interaction pair is semantically symmetric.
- Prevent duplicate reverse pairs.
- Severity is only LOW, MEDIUM or HIGH.
- CRITICAL is not allowed.
- Rules can be updated and deactivated.
- Inactive rules do not create new alerts.
- Graph Sync event is allowed.
- Neo4j worker/projection is out of Sprint 5.

## InteractionAlert

- Interaction check is Order-based.
- Displayed alerts must be persisted.
- Save snapshot severity, description and recommendation.
- One active alert per Order and interaction rule.
- Redisplay updates `display_count` and `last_displayed_at`.
- Redisplay must not reset acknowledgement or note.
- HIGH requires acknowledgement.
- HIGH requires a non-empty consultation note per alert.
- Backend blocks checkout contract when HIGH remains unresolved.
- Admin can view alert history.
- Warehouse cannot access InteractionAlert.

## Out of scope

- Full checkout transaction.
- FEFO allocation.
- MedicineBatch deduction.
- Payment.
- Invoice.
- AI explanation or AI note drafting.
- Neo4j worker/projection.
- Graph-RAG.
- Diagnosis, prescribing or dosage advice.
- New Epic/Story/Task branches.

---

# V. Jira MCP Rules

## 1. Issue status workflow

Only these transitions are valid:

```text
TO DO → IN PROGRESS
IN PROGRESS → IN REVIEW
IN REVIEW → IN PROGRESS
IN REVIEW → DONE
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

Rules:

- Perform exactly one transition at a time.
- Read issue status before every transition.
- Read available Jira transitions before acting.
- Read the issue again after transition.
- Do not trust cached status.
- DONE is terminal.
- If a DONE issue has a defect, create a Bug instead of reopening it.

## 2. Task lifecycle

Before beginning a Task:

1. Read Task using Jira MCP.
2. Confirm logical Task, Jira Key, Story parent and current status.
3. Confirm current status is `TO DO`.
4. Confirm exact Task branch with GitHub MCP.
5. Confirm Story branch and Epic branch.
6. Add a Jira start comment.
7. Transition Task `TO DO → IN PROGRESS`.
8. Verify Task is `IN PROGRESS`.

After implementation:

1. Commit and push.
2. Create Task PR to exact Story branch.
3. Add Jira review comment with commit, PR and tests.
4. Transition Task `IN PROGRESS → IN REVIEW`.
5. Verify `IN REVIEW`.

When PR review fails:

1. Transition `IN REVIEW → IN PROGRESS`.
2. Fix on the same Task branch.
3. Commit with Task Jira Key.
4. Push and rerun checks.
5. Transition `IN PROGRESS → IN REVIEW`.

Task can become DONE only when:

- PR is merged into exact Story branch.
- Checks pass.
- Acceptance criteria pass.
- Supabase evidence is complete when data is affected.
- No Blocking Bug remains.
- Merge SHA is recorded.

Then:

```text
IN REVIEW → DONE
```

## 3. Story lifecycle

When first Task begins:

```text
Story: TO DO → IN PROGRESS
```

Keep Story in `IN PROGRESS` while Tasks are being implemented.

When all Task PRs are merged:

1. Checkout exact Story branch.
2. Pull latest Story branch.
3. Run Story-level integration review using skills.
4. Run tests and Supabase data verification.
5. Check Story acceptance criteria.
6. Fix integration issues directly on Story branch.
7. Story-level fix commits must use Story Jira Key.
8. Push Story branch.
9. Create Story PR to exact Epic branch.
10. Transition Story `IN PROGRESS → IN REVIEW`.
11. Verify PR checks.
12. Merge Story PR.
13. Verify merge into Epic.
14. Transition Story `IN REVIEW → DONE`.

If review fails:

```text
IN REVIEW → IN PROGRESS
→ fix
→ IN PROGRESS → IN REVIEW
```

## 4. Epic lifecycle

When first Story begins:

```text
Epic: TO DO → IN PROGRESS
```

When all Stories are DONE:

1. Checkout exact Epic branch.
2. Pull latest.
3. Run Epic-level review.
4. Run full Epic tests and Supabase verification.
5. Check every Story PR is merged.
6. Fix Epic integration issues directly on Epic branch.
7. Epic-level fix commits use Epic Jira Key.
8. Push Epic branch.
9. Create Epic PR to `develop`.
10. Transition Epic `IN PROGRESS → IN REVIEW`.
11. Verify checks.
12. Merge Epic PR to `develop`.
13. Verify merge SHA and code on `develop`.
14. Transition Epic `IN REVIEW → DONE`.

## 5. Required Jira comments

Start comment:

```text
Started implementation

Logical issue: <logical-key>
Exact branch: <branch>
Parent issue: <parent>
Selected skills: <skills>
Implementation plan: <summary>
Supabase test plan: <summary or N/A>
```

Review comment:

```text
Ready for review

Commit: <SHA>
Pull Request: <URL>
Tests: <commands and results>
Supabase evidence: <test-run ID / result / N/A>
Known issues: <none or list>
```

Completion comment:

```text
Completed

Merged PR: <URL>
Merge commit: <SHA>
Target branch: <branch>
Regression result: <result>
Supabase verification: <result or N/A>
Linked Bugs: <none or keys>
```

---

# VI. GitHub MCP Rules

## 1. Existing branch rule

All Sprint 5 Epic, Story and Task branches already exist.

Do not create:

- Epic branch.
- Story branch.
- Task branch.
- Wave branch.
- Review branch.
- Temporary branch.
- General fix branch.

Do not run:

```bash
git checkout -b ...
git switch -c ...
```

It is allowed to create a local tracking reference for an existing remote branch:

```bash
git switch --track origin/<EXACT_BRANCH>
```

## 2. Required GitHub verification

Before code:

- Verify remote branch exists.
- Verify current branch exact name.
- Verify branch Jira Key matches issue.
- Verify target parent branch exists.
- Inspect branch history.
- Check for existing open/merged PR.
- Do not duplicate a PR.

Before commit:

- Review `git status`.
- Review unstaged and staged diff.
- Verify no secret or `.env`.
- Verify no generated build output.
- Verify current branch.
- Verify commit Jira Key matches branch issue.

Before merge:

- Verify PR head and base.
- Verify checks pass.
- Verify no unresolved review thread.
- Verify no Blocking Bug.
- Verify Supabase data evidence where required.
- Record PR URL, merge time and merge SHA.

## 3. Commit formats

Task branch:

```text
<TASK-JIRA-KEY> T-xxx: <short English message>
```

Story branch integration fix:

```text
<STORY-JIRA-KEY> US-xx: <short English fix message>
```

Epic branch integration fix:

```text
<EPIC-JIRA-KEY> EPIC-xx: <short English fix message>
```

Bugfix branch:

```text
<BUG-JIRA-KEY> BUG: <short English fix message>
```

Examples:

```text
PAC-436 T-227: add drug interaction rule model
PAC-113 US-74: fix alert snapshot integration
PAC-10 EPIC-10: fix interaction alert regression
PAC-790 BUG: preserve acknowledgement on alert redisplay
```

## 4. PR hierarchy

```text
Task branch → Story branch
Story branch → Epic branch
Epic branch → develop
```

Forbidden:

```text
Task → Epic
Task → develop
Task → main
Story → develop
Story → main
Epic → main
```

Do not delete branches after merge.

Do not automatically merge `develop → main`.

---

# VII. Supabase MCP Rules for Data Testing

Supabase MCP is used primarily for **testing, verification and data evidence**.

It does not replace:

- Prisma migrations.
- Backend authorization.
- Automated unit/integration tests.
- Git-based schema management.

## 1. Environment safety gate

Before any write query:

1. Identify Supabase project.
2. Identify environment type.
3. Confirm it is not production.
4. Confirm destructive tests are not run against demo data.
5. Confirm write-based testing is authorized.
6. Define Test Run ID.
7. Define fixture creation.
8. Define cleanup query.
9. Record environment in `sprint-5-audit.md`.

If environment safety is unknown:

```text
Supabase write testing = Blocked
```

Only safe read-only inspection is allowed.

## 2. Test Run ID

Every data-test session must use an identifiable marker where technically possible:

```text
S5-<STORY>-<TASK>-<timestamp-or-uuid>
```

Example:

```text
S5-US74-T240-20260622-001
```

Record:

- Test Run ID.
- Environment.
- Fixtures created.
- Rows inspected.
- Expected result.
- Actual result.
- Cleanup result.

## 3. Supabase checks before implementation

Use Supabase MCP to inspect:

- Existing tables.
- Columns and types.
- Enums.
- Foreign keys.
- Unique constraints.
- Indexes.
- Migration state.
- Existing test fixtures.
- Role/profile records.
- Order and OrderItem fixtures.
- ActiveIngredient mappings.

Do not change schema manually to make code pass.

Schema changes must be:

```text
Prisma schema
→ migration in Git
→ reviewed PR
→ applied to safe test environment
→ verified with Supabase MCP
```

## 4. Required Sprint 5 data verification

### DrugInteraction Rule

Verify:

- Two ActiveIngredient foreign keys.
- Canonical/symmetric pair logic.
- Reverse duplicate prevention.
- Self-pair validation.
- Severity only LOW/MEDIUM/HIGH.
- Description/recommendation persistence.
- `isActive` behavior.
- Update/deactivate behavior.
- Inactive rule excluded from new checks.

### Derived interaction

Prepare fixtures:

- Medicine A with Ingredient A.
- Medicine B with Ingredient B.
- Active rule A ↔ B.
- Medicine with multiple ingredients.
- No-interaction case.
- Inactive-rule case.

Verify derived results from PostgreSQL data.

### Order interaction check

Prepare:

- DRAFT Order with fewer than two medicines.
- DRAFT Order with two interacting medicines.
- DRAFT Order with multiple medicines.
- Staff A order.
- Staff B order.
- Admin access.
- Warehouse denial.

Verify Order scope and interaction candidates.

### InteractionAlert persistence

Verify:

- First display inserts an alert.
- Snapshot severity/description/recommendation is stored.
- Order and rule references are correct.
- Redisplay does not create another active alert.
- `display_count` increments.
- `last_displayed_at` changes.
- Acknowledgement and note are not reset.

### HIGH handling

Verify:

- Acknowledgement stores actor and timestamp.
- Empty/whitespace note is rejected.
- Note is attached to the correct HIGH alert.
- Unresolved HIGH is blocked by backend validator.
- Resolved HIGH passes the blocker contract.
- Blocking does not create payment/invoice or deduct inventory.

### Permission

Verify through API behavior and safe fixtures:

- Admin can access history.
- Staff only accesses authorized Order alerts.
- Staff A cannot access Staff B Order alerts.
- Warehouse receives `403`.
- No secondary endpoint leaks alert data.

## 5. Transaction and rollback verification

When a Task changes multiple records:

- Capture pre-test rows.
- Trigger success path.
- Verify all expected changes.
- Trigger failure path.
- Verify partial changes did not remain.
- Record transaction evidence.
- Cleanup only test-run rows.

## 6. Cleanup

Cleanup rules:

- Delete only fixtures belonging to the Test Run ID.
- Respect foreign-key order.
- Do not delete shared seed data.
- Do not reset the database.
- Do not truncate tables.
- Do not drop schema.
- Verify cleanup completed.
- Record cleanup evidence.

## 7. Sensitive data

Never place in Jira, GitHub, logs or documents:

- Supabase service-role key.
- JWT/token.
- Password.
- Personal customer information.
- Real medical data.
- Secret connection string.

Redact sensitive values in evidence.

---

# VIII. Audit and Progress Update Rules

## `sprint-5-audit.md`

Update during pre-implementation and whenever a new risk is discovered.

Required updates:

- Audit status.
- Sprint 4 dependency.
- MCP connectivity.
- Supabase environment.
- Schema and migration findings.
- Existing interaction code.
- Existing alert code.
- Exact branch findings.
- Open/Blocking Bugs.
- Remediation status.
- Final implementation decision.

Do not change:

```text
Ready to implement Sprint 5 = Yes
```

unless every mandatory audit gate passes.

## `sprint-5-progress.md`

Update after every meaningful event:

- Jira transition.
- Branch checkout.
- Commit.
- Push.
- PR creation.
- Review result.
- Merge.
- Test run.
- Supabase test run.
- Bug creation.
- Bug status change.
- Story/Epic completion.

For each issue record:

- Current Jira status.
- Previous status.
- Exact branch.
- Commit SHA.
- PR URL.
- Merge target.
- Merge status.
- Test evidence.
- Supabase evidence.
- Linked Bugs.
- Blocking Bugs.

Never remove previous evidence.

---

# IX. Skill Selection

Every Task, Story review and Epic review must record selected skills.

Base:

- `agent-skills-lifecycle`
- `karpathy-principles`
- `writing-plans`
- `ecc-code-quality`

Database:

- `ecc-database`
- `ecc-backend`
- `tdd`
- `ecc-testing`

Backend/API:

- `ecc-backend`
- `ecc-security`
- `tdd`
- `ecc-testing`

Interaction/medical safety:

- `ecc-healthcare`
- `ecc-backend`
- `ecc-security`
- `ecc-testing`

Frontend:

- `modern-web-guidance`
- `ecc-frontend`
- `design-system-guide`
- `ecc-testing`

Concurrency/transaction:

- `mattpocock-engineering`
- `ecc-database`
- `ecc-backend`
- `tdd`

GitHub/Jira/evidence:

- `git-github`
- `ecc-devops`
- `ecc-business-ops`

Documentation:

- `mattpocock-productivity`
- `ecc-business-ops`

---

# X. Task Execution Procedure

For each Task:

## Step 1 — Read Jira

Use Jira MCP to obtain:

```text
Jira Key
Logical Task
Summary
Description
Acceptance Criteria
Parent Story
Parent Epic
Current status
Available transitions
Linked Bugs
Blocking Bugs
```

Do not proceed if current status is not expected.

## Step 2 — Resolve exact branches

Use the registry below and GitHub MCP:

```text
Exact Task branch
Exact Story branch
Exact Epic branch
```

Verify all exist.

## Step 3 — Start Task

- Add Jira start comment.
- Transition `TO DO → IN PROGRESS`.
- Verify status.
- Update progress.

## Step 4 — Checkout existing branch

```bash
git fetch origin
git switch <EXACT_TASK_BRANCH>
git pull origin <EXACT_TASK_BRANCH>
```

If only remote exists:

```bash
git switch --track origin/<EXACT_TASK_BRANCH>
```

Do not create a new issue branch.

## Step 5 — Sync parent safely

Fetch exact Story branch.

Prefer fast-forward where possible.

If merge commit is necessary, message must use Task Jira Key:

```text
<TASK-JIRA-KEY> T-xxx: sync parent Story branch
```

Do not force push.

## Step 6 — Plan

Record:

```text
Task:
Jira Key:
Exact Task branch:
Target Story branch:
Selected skills:
Acceptance Criteria:
Files to inspect:
Implementation steps:
Automated test plan:
Supabase data-test plan:
Migration risk:
Permission risk:
Out of scope:
```

## Step 7 — Implement

- Follow TDD where appropriate.
- Make the smallest correct change.
- Keep PostgreSQL source of truth.
- Do not implement later Sprint scope.
- Do not bypass authorization.
- Do not alter demo/production data manually.

## Step 8 — Test code

Run only existing scripts.

Typical backend commands:

```bash
npm run lint
npm run test
npm run test:e2e
npx prisma validate
npx prisma generate
npm run build
```

Typical frontend commands:

```bash
npm run lint
npm run test
npm run build
```

If a script does not exist:

```text
N/A — script is not configured
```

## Step 9 — Test data using Supabase MCP

- Confirm safe environment.
- Create/identify Test Run ID.
- Capture pre-test evidence.
- Create minimal fixtures if authorized.
- Exercise API/service.
- Capture post-test evidence.
- Verify constraints and business rules.
- Verify rollback/failure path.
- Cleanup test-run fixtures.
- Record result in progress.

If Task has no data effect:

```text
Supabase data evidence = N/A — no persistent data change
```

## Step 10 — Diff review

Check:

- Correct scope.
- No secret.
- No `.env`.
- No debug output.
- No unsafe `any`.
- No direct database workaround.
- No direct Neo4j checkout dependency.
- No full checkout/FEFO/payment/invoice.
- No unauthorized role access.

## Step 11 — Commit and push

```bash
git add <files>
git commit -m "<TASK-JIRA-KEY> T-xxx: <short English message>"
git push origin <EXACT_TASK_BRANCH>
```

Verify commit appears on GitHub.

## Step 12 — Create PR

Task PR:

```text
head = exact Task branch
base = exact Story branch
```

PR title:

```text
<TASK-JIRA-KEY> T-xxx: <summary>
```

PR body must include:

- Jira issue.
- Story and Epic.
- Scope.
- What changed.
- Acceptance criteria.
- How tested.
- Supabase Test Run ID/evidence.
- Migration risk.
- Security/permission risk.
- Rollback notes.
- Screenshots if UI.
- Known issues.
- Linked Bugs.

## Step 13 — Move to IN REVIEW

- Add Jira review comment.
- Transition `IN PROGRESS → IN REVIEW`.
- Verify status.
- Update progress.

## Step 14 — Review and merge

If review fails:

```text
IN REVIEW → IN PROGRESS
→ fix on same Task branch
→ test
→ Supabase verification
→ commit with Task Jira Key
→ push
→ IN PROGRESS → IN REVIEW
```

When approved:

- Merge Task PR into Story branch.
- Verify merge.
- Record merge SHA.
- Transition `IN REVIEW → DONE`.
- Add completion comment.
- Update progress.

---

# XI. Story Review Procedure

After all Tasks in a Story are DONE:

1. Verify every Task PR merged into exact Story branch.
2. Checkout Story branch.
3. Pull latest.
4. Run Story integration review using skills.
5. Run Story-level code tests.
6. Run Supabase data verification.
7. Verify Story acceptance criteria.
8. Search for defects.
9. Create Jira Bug for every defect.
10. Resolve Blocking Bugs.
11. Fix integration issues directly on Story branch when they are not separate defects.
12. Commit Story fixes using Story Jira Key.
13. Push Story branch.
14. Create Story PR to Epic.
15. Transition Story `IN PROGRESS → IN REVIEW`.
16. Verify PR checks.
17. Merge Story PR.
18. Verify merge into Epic.
19. Transition Story `IN REVIEW → DONE`.
20. Update progress and audit.

---

# XII. Epic Review Procedure

After all Stories in an Epic are DONE:

1. Verify all Story PRs merged into Epic.
2. Checkout Epic branch.
3. Pull latest.
4. Run full Epic integration review.
5. Run lint, tests, builds and Prisma checks.
6. Run Epic-level Supabase verification.
7. Verify permissions and ownership.
8. Verify migration and data constraints.
9. Search for open/Blocking Bugs.
10. Resolve Blocking Bugs.
11. Fix Epic integration issues directly on Epic branch.
12. Commit Epic fixes using Epic Jira Key.
13. Push Epic branch.
14. Create Epic PR to `develop`.
15. Transition Epic `IN PROGRESS → IN REVIEW`.
16. Verify checks and review.
17. Merge Epic PR.
18. Verify merge SHA and code in `develop`.
19. Transition Epic `IN REVIEW → DONE`.
20. Update progress, audit and working context.

---

# XIII. Bug Workflow

Every reproducible defect must be tracked as Jira issue type `BUG`.

## 1. Create Bug

Use Jira MCP.

The Bug must begin in:

```text
TO DO
```

Required fields:

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

## 2. Determine parent issue impact

If parent issue is in `IN REVIEW` and Bug blocks acceptance criteria:

```text
Parent: IN REVIEW → IN PROGRESS
```

If parent issue is DONE:

- Do not reopen it.
- Link the Bug to the DONE issue.
- Fix through the appropriate current integration branch.

## 3. Start Bug

- Read Bug status.
- Transition `TO DO → IN PROGRESS`.
- Verify.
- Update Bug Register.

## 4. Create bugfix branch

Bug is the only dynamic branch exception.

Create branch only after Jira returns real Bug Jira Key:

```text
bugfix/<BUG-JIRA-KEY>-bug-<short-english-slug>
```

Do not create a bugfix branch before the Bug exists.

## 5. Choose PR target

| Detection point | Bugfix PR target |
|---|---|
| During Task work | Affected Task branch |
| During Story review | Affected Story branch |
| During Epic review | Affected Epic branch |
| During final Sprint verification | `develop` |
| After previous issue is DONE | Current appropriate integration branch, usually `develop` |

## 6. Reproduce and test

- Reproduce before fix.
- Add a failing regression test.
- Capture Supabase pre-fix data if relevant.
- Fix.
- Run regression test.
- Capture Supabase post-fix evidence.
- Verify no regression.
- Cleanup fixtures.

## 7. Commit and PR

Commit:

```text
<BUG-JIRA-KEY> BUG: <short English message>
```

PR title:

```text
<BUG-JIRA-KEY> BUG: <summary>
```

## 8. Review and complete

After PR opens:

```text
IN PROGRESS → IN REVIEW
```

If review fails:

```text
IN REVIEW → IN PROGRESS
```

After merge and regression pass:

```text
IN REVIEW → DONE
```

Then rerun the parent Task/Story/Epic review.

---

# XIV. Exact Sprint 5 Branch Registry

> Copy these values exactly. Do not regenerate slugs.

## PAC-EPIC-09

- Jira Key: `PAC-9`
- Exact Epic branch: `epic/PAC-9-EPIC-09-drug-interaction-rule`
- PR target: `develop`

| Story | Jira Key | Exact Story branch | PR target |
|---|---|---|---|
| US-69 — Create ActiveIngredient-level interaction rule | `PAC-108` | `story/PAC-108-US-69-create-activeingredient-interaction-rule` | `epic/PAC-9-EPIC-09-drug-interaction-rule` |

### Tasks

| Task | Jira Key | Exact Task branch | PR target |
|---|---|---|---|
| PAC-TASK-227 — Create drug_interaction_rules Prisma model | `PAC-436` | `feature/PAC-436-T-227-drug-interaction-rules-model` | `story/PAC-108-US-69-create-activeingredient-interaction-rule` |
| PAC-TASK-228 — Implement create ActiveIngredient-level interaction rule API | `PAC-437` | `feature/PAC-437-T-228-create-activeingredient-interaction-rule-api` | `story/PAC-108-US-69-create-activeingredient-interaction-rule` |
| PAC-TASK-229 — Build DrugInteraction Rule management screen | `PAC-438` | `feature/PAC-438-T-229-drug-interaction-rule-management-screen` | `story/PAC-108-US-69-create-activeingredient-interaction-rule` |
| PAC-TASK-230 — Validate two ActiveIngredients in interaction rule | `PAC-439` | `feature/PAC-439-T-230-two-activeingredients-validation` | `story/PAC-108-US-69-create-activeingredient-interaction-rule` |

| US-71 — Validate interaction severity enum | `PAC-110` | `story/PAC-110-US-71-validate-interaction-severity` | `epic/PAC-9-EPIC-09-drug-interaction-rule` |

### Tasks

| Task | Jira Key | Exact Task branch | PR target |
|---|---|---|---|
| PAC-TASK-234 — Validate severity enum LOW/MEDIUM/HIGH only | `PAC-443` | `feature/PAC-443-T-234-severity-enum-validation` | `story/PAC-110-US-71-validate-interaction-severity` |

| US-70 — Update and deactivate DrugInteraction Rule | `PAC-109` | `story/PAC-109-US-70-update-deactivate-interaction-rule` | `epic/PAC-9-EPIC-09-drug-interaction-rule` |

### Tasks

| Task | Jira Key | Exact Task branch | PR target |
|---|---|---|---|
| PAC-TASK-231 — Implement update DrugInteraction Rule API | `PAC-440` | `feature/PAC-440-T-231-update-interaction-rule-api` | `story/PAC-109-US-70-update-deactivate-interaction-rule` |
| PAC-TASK-232 — Implement deactivate DrugInteraction Rule API | `PAC-441` | `feature/PAC-441-T-232-deactivate-interaction-rule-api` | `story/PAC-109-US-70-update-deactivate-interaction-rule` |
| PAC-TASK-233 — Trigger Graph Sync event on interaction rule change | `PAC-442` | `feature/PAC-442-T-233-graph-sync-event-rule-change` | `story/PAC-109-US-70-update-deactivate-interaction-rule` |

| US-72 — Derive medicine interaction from active ingredients | `PAC-111` | `story/PAC-111-US-72-derive-interaction-from-activeingredients` | `epic/PAC-9-EPIC-09-drug-interaction-rule` |

### Tasks

| Task | Jira Key | Exact Task branch | PR target |
|---|---|---|---|
| PAC-TASK-235 — Implement derive interaction from Medicine ActiveIngredients | `PAC-444` | `feature/PAC-444-T-235-derive-interaction-from-activeingredients` | `story/PAC-111-US-72-derive-interaction-from-activeingredients` |
| PAC-TASK-236 — Add tests for derived medicine interactions | `PAC-445` | `test/PAC-445-T-236-derived-interaction-tests` | `story/PAC-111-US-72-derive-interaction-from-activeingredients` |

## PAC-EPIC-10

- Jira Key: `PAC-10`
- Exact Epic branch: `epic/PAC-10-EPIC-10-interaction-alert`
- PR target: `develop`

| Story | Jira Key | Exact Story branch | PR target |
|---|---|---|---|
| US-73 — Order-based interaction check | `PAC-112` | `story/PAC-112-US-73-order-interaction-check` | `epic/PAC-10-EPIC-10-interaction-alert` |

### Tasks

| Task | Jira Key | Exact Task branch | PR target |
|---|---|---|---|
| PAC-TASK-237 — Implement Order interaction check service | `PAC-446` | `feature/PAC-446-T-237-order-interaction-check-service` | `story/PAC-112-US-73-order-interaction-check` |
| PAC-TASK-238 — Implement POST /orders/{id}/interactions/check API | `PAC-447` | `feature/PAC-447-T-238-order-interactions-check-api` | `story/PAC-112-US-73-order-interaction-check` |

| US-74 — Persist InteractionAlert | `PAC-113` | `story/PAC-113-US-74-persist-interaction-alert` | `epic/PAC-10-EPIC-10-interaction-alert` |

### Tasks

| Task | Jira Key | Exact Task branch | PR target |
|---|---|---|---|
| PAC-TASK-239 — Create interaction_alerts Prisma model | `PAC-448` | `feature/PAC-448-T-239-interaction-alerts-model` | `story/PAC-113-US-74-persist-interaction-alert` |
| PAC-TASK-240 — Persist displayed InteractionAlert snapshot fields | `PAC-449` | `feature/PAC-449-T-240-persist-alert-snapshot-fields` | `story/PAC-113-US-74-persist-interaction-alert` |
| PAC-TASK-255 — Add InteractionAlert lifecycle integration tests | `PAC-464` | `test/PAC-464-T-255-interaction-alert-lifecycle-tests` | `story/PAC-113-US-74-persist-interaction-alert` |
| PAC-TASK-258 — Add InteractionAlert snapshot and traceability notes | `PAC-467` | `docs/PAC-467-T-258-interaction-alert-traceability-notes` | `story/PAC-113-US-74-persist-interaction-alert` |

| US-75 — One active alert per order and rule | `PAC-114` | `story/PAC-114-US-75-one-active-alert-per-order-rule` | `epic/PAC-10-EPIC-10-interaction-alert` |

### Tasks

| Task | Jira Key | Exact Task branch | PR target |
|---|---|---|---|
| PAC-TASK-241 — Enforce one active alert per Order and interaction rule | `PAC-450` | `feature/PAC-450-T-241-one-active-alert-per-order-rule` | `story/PAC-114-US-75-one-active-alert-per-order-rule` |

| US-76 — InteractionAlert display count | `PAC-115` | `story/PAC-115-US-76-interaction-alert-display-count` | `epic/PAC-10-EPIC-10-interaction-alert` |

### Tasks

| Task | Jira Key | Exact Task branch | PR target |
|---|---|---|---|
| PAC-TASK-242 — Update display_count and last_displayed_at | `PAC-451` | `feature/PAC-451-T-242-update-display-count-last-displayed` | `story/PAC-115-US-76-interaction-alert-display-count` |

| US-77 — POS InteractionAlert panel | `PAC-116` | `story/PAC-116-US-77-pos-interaction-alert-panel` | `epic/PAC-10-EPIC-10-interaction-alert` |

### Tasks

| Task | Jira Key | Exact Task branch | PR target |
|---|---|---|---|
| PAC-TASK-243 — Build POS InteractionAlert panel | `PAC-452` | `feature/PAC-452-T-243-pos-interaction-alert-panel` | `story/PAC-116-US-77-pos-interaction-alert-panel` |
| PAC-TASK-244 — Implement LOW/MEDIUM/HIGH alert display logic | `PAC-453` | `feature/PAC-453-T-244-alert-severity-display-logic` | `story/PAC-116-US-77-pos-interaction-alert-panel` |

| US-78 — HIGH alert acknowledgement | `PAC-117` | `story/PAC-117-US-78-high-alert-acknowledgement` | `epic/PAC-10-EPIC-10-interaction-alert` |

### Tasks

| Task | Jira Key | Exact Task branch | PR target |
|---|---|---|---|
| PAC-TASK-245 — Build HIGH alert acknowledgement UI | `PAC-454` | `feature/PAC-454-T-245-high-alert-acknowledgement-ui` | `story/PAC-117-US-78-high-alert-acknowledgement` |
| PAC-TASK-246 — Implement acknowledge InteractionAlert API | `PAC-455` | `feature/PAC-455-T-246-acknowledge-interaction-alert-api` | `story/PAC-117-US-78-high-alert-acknowledgement` |
| PAC-TASK-256 — Add HIGH acknowledgement and consultation note tests | `PAC-465` | `test/PAC-465-T-256-high-acknowledgement-note-tests` | `story/PAC-117-US-78-high-alert-acknowledgement` |

| US-79 — HIGH alert consultation note | `PAC-118` | `story/PAC-118-US-79-high-alert-consultation-note` | `epic/PAC-10-EPIC-10-interaction-alert` |

### Tasks

| Task | Jira Key | Exact Task branch | PR target |
|---|---|---|---|
| PAC-TASK-247 — Build HIGH alert consultation note UI | `PAC-456` | `feature/PAC-456-T-247-high-alert-consultation-note-ui` | `story/PAC-118-US-79-high-alert-consultation-note` |
| PAC-TASK-248 — Implement consultation note API per HIGH alert | `PAC-457` | `feature/PAC-457-T-248-consultation-note-api-per-high-alert` | `story/PAC-118-US-79-high-alert-consultation-note` |
| PAC-TASK-249 — Validate HIGH alert consultation note is not empty | `PAC-458` | `feature/PAC-458-T-249-high-alert-note-not-empty-validation` | `story/PAC-118-US-79-high-alert-consultation-note` |

| US-80 — Checkout blocker for unresolved HIGH alert | `PAC-119` | `story/PAC-119-US-80-checkout-blocker-high-alert` | `epic/PAC-10-EPIC-10-interaction-alert` |

### Tasks

| Task | Jira Key | Exact Task branch | PR target |
|---|---|---|---|
| PAC-TASK-250 — Implement checkout blocker for unresolved HIGH alerts | `PAC-459` | `feature/PAC-459-T-250-checkout-blocker-unresolved-high-alerts` | `story/PAC-119-US-80-checkout-blocker-high-alert` |
| PAC-TASK-251 — Build UI prompt when checkout is blocked by HIGH alert | `PAC-460` | `feature/PAC-460-T-251-ui-prompt-checkout-blocked-high-alert` | `story/PAC-119-US-80-checkout-blocker-high-alert` |

| US-81 — Admin InteractionAlert History | `PAC-120` | `story/PAC-120-US-81-admin-interaction-alert-history` | `epic/PAC-10-EPIC-10-interaction-alert` |

### Tasks

| Task | Jira Key | Exact Task branch | PR target |
|---|---|---|---|
| PAC-TASK-252 — Build Admin InteractionAlert History API and UI | `PAC-461` | `feature/PAC-461-T-252-admin-interaction-alert-history-api-ui` | `story/PAC-120-US-81-admin-interaction-alert-history` |
| PAC-TASK-257 — Add filters to InteractionAlert History | `PAC-466` | `feature/PAC-466-T-257-interaction-alert-history-filters` | `story/PAC-120-US-81-admin-interaction-alert-history` |

| US-82 — Warehouse no-access to InteractionAlert | `PAC-121` | `story/PAC-121-US-82-warehouse-no-access-interaction-alert` | `epic/PAC-10-EPIC-10-interaction-alert` |

### Tasks

| Task | Jira Key | Exact Task branch | PR target |
|---|---|---|---|
| PAC-TASK-253 — Enforce Warehouse no-access to InteractionAlert APIs | `PAC-462` | `feature/PAC-462-T-253-warehouse-no-access-interaction-alert` | `story/PAC-121-US-82-warehouse-no-access-interaction-alert` |
| PAC-TASK-254 — Add tests for Warehouse no-access to InteractionAlert | `PAC-463` | `test/PAC-463-T-254-warehouse-no-access-alert-tests` | `story/PAC-121-US-82-warehouse-no-access-interaction-alert` |



---

# XV. Required Execution Order

## Pre-implementation

1. Complete Sprint 5 audit.
2. Verify `Ready to implement Sprint 5 = Yes`.
3. Verify all MCP connections.
4. Verify Supabase safe test environment.
5. Verify exact 48 branches.
6. Verify all Sprint 5 Jira issues are `TO DO`.
7. Verify no Blocking Bug.

## PAC-EPIC-09

1. US-69
2. US-71
3. US-70
4. US-72
5. Epic review
6. Epic PR → `develop`
7. Epic DONE

## PAC-EPIC-10

1. US-73
2. US-74
3. US-75
4. US-76
5. US-77
6. US-78
7. US-79
8. US-80
9. US-81
10. US-82
11. Epic review
12. Epic PR → `develop`
13. Epic DONE

Do not start the next Story until the current Story has been merged into its Epic and moved to DONE.

Do not start PAC-EPIC-10 until PAC-EPIC-09 has been merged into `develop` and moved to DONE, unless the project rules explicitly authorize parallel execution.

---

# XVI. Definition of Done

## Task

- Exact Task branch used.
- Jira status followed valid transitions.
- Acceptance criteria passed.
- Code tests passed.
- Supabase verification passed or valid N/A.
- Commit contains Task Jira Key.
- PR targets exact Story branch.
- PR merged.
- Merge SHA recorded.
- Task is DONE.
- Progress updated.

## Story

- All Tasks DONE.
- All Task PRs merged.
- Story integration review passed.
- Supabase Story verification passed.
- No Blocking Bug.
- Story fix commits use Story Jira Key.
- Story PR targets Epic.
- Story PR merged.
- Story is DONE.
- Progress updated.

## Epic

- All Stories DONE.
- Epic review passed.
- Full tests/builds passed.
- Supabase Epic verification passed.
- No Blocking Bug.
- Epic fix commits use Epic Jira Key.
- Epic PR targets `develop`.
- Epic PR merged.
- Epic is DONE.
- Progress and audit updated.

## Sprint

- 32 Tasks DONE.
- 14 Stories DONE.
- 2 Epics DONE.
- 48 exact pre-created branches used.
- No unauthorized branch created.
- All Jira transitions valid.
- All PR hierarchy valid.
- All commit Jira Keys correct.
- All Blocking Bugs DONE.
- Automated tests pass.
- Supabase data tests pass.
- Migration/constraint verification passes.
- Manual UI verification passes.
- `Ready for Sprint 6 = Yes`.

---

# XVII. Final Verification

After both Epics merge into `develop`:

```bash
git switch develop
git pull origin develop
```

Run existing project verification commands.

Use Jira MCP to verify:

- 2 Epics DONE.
- 14 Stories DONE.
- 32 Tasks DONE.
- Bugs resolved or explicitly non-blocking.

Use GitHub MCP to verify:

- Correct PR hierarchy.
- All required PRs merged.
- Merge SHAs recorded.
- No Sprint 5 Task/Story/Epic branch was newly invented.
- `develop` contains Sprint 5 changes.

Use Supabase MCP to verify:

- Schema matches migrations.
- Interaction rules persist correctly.
- Interaction alerts persist correctly.
- Duplicate prevention works.
- Display count works.
- HIGH acknowledgement/note works.
- Permission fixtures produce expected results.
- Cleanup completed.
- No destructive test affected demo/production data.

Only then update:

```text
Ready for Sprint 6 = Yes
```

Do not automatically merge `develop → main`.

---

# XVIII. Start Command

Execute in this order:

1. Read mandatory documents.
2. Verify implementation authorization gate.
3. Verify Jira MCP.
4. Verify GitHub MCP.
5. Verify Supabase MCP and test environment.
6. Complete/update `sprint-5-audit.md`.
7. Verify exact 48 branches.
8. Verify all Sprint 5 Jira issues are `TO DO`.
9. Select the first Story and Task.
10. Follow the Task workflow exactly.
11. Update `sprint-5-progress.md` after every event.
12. Create Jira Bugs for defects.
13. Complete Story review and merge.
14. Complete Epic review and merge.
15. Repeat until Sprint completion.
16. Run final verification.
17. Set `Ready for Sprint 6 = Yes` only when all gates pass.
