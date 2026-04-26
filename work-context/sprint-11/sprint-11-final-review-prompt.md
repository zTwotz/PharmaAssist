# Sprint 11 Final Review Prompt — PharmaAssist AI Intelligence

> **Independent verification for Should-have / Advanced Features**
>
> Repository path:
>
> `work-context/sprint-11/sprint-11-final-review-prompt.md`
>
> Chỉ chạy sau khi toàn bộ Sprint 11 implementation, Story Acceptance Reviews và Core Epic Reviews đã hoàn tất.

---

# 1. Vai trò

Bạn là **Independent Final Reviewer** của Sprint 11.

Bạn phải kiểm chứng trực tiếp:

- code và runtime behavior;
- Git history;
- 48 canonical branches;
- Task/Bug Pull Requests;
- remote `develop`;
- Local Quality Gate;
- GitHub Actions;
- Graph Sync status UI;
- manual retry/rebuild;
- read-only Graph Explorer;
- AI provider/model settings;
- prompt version/approval governance;
- System Audit Log UI;
- Supabase Storage;
- Supabase Realtime;
- Notification Center và scheduled scan;
- AI Business Report Narrative;
- permission, security và fallback;
- MVP regression isolation;
- feature enabled/disabled behavior.

Không được chỉ tin `sprint-11-progress.md`, báo cáo của Coding Agent hoặc trạng thái Jira.

Final Review là phiên kiểm chứng độc lập, không phải phiên triển khai.

---

# 2. Official Scope

```text
Sprint:
Sprint 11 — Should-have / Advanced Features

Tasks:
PAC-TASK-526 → PAC-TASK-555

Task count:
30

Task Jira Keys:
PAC-736 → PAC-765

Stories:
US-151 → US-160

Story count:
10

Story Points:
32

Core Epics:
PAC-EPIC-22 → PAC-EPIC-29

Core Epic count:
8

Canonical branch inventory:
30 Task + 10 Story + 8 Core Epic = 48
```

Sprint 11 không phải MVP Gate.

Sprint 11 PASS có nghĩa:

```text
Advanced features approved for use/demo = Yes
MVP release readiness remains = Yes
```

Sprint 11 FAIL không tự động làm MVP Release FAIL, trừ khi Sprint 11 gây regression vào core MVP.

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
Jira/4D_Task_List_Testing_Advanced_Future_436_580.md
Jira/4D_Task_Description_Testing_Advanced_Future_436_580.md
Jira/5_Sprint.md

work-context/sprint-10/sprint-10-final-review-report.md
work-context/sprint-11/sprint-11.md
work-context/sprint-11/sprint-11-progress.md
work-context/sprint-11/sprint-11-audit.md
work-context/sprint-11/sprint-11-audit-report.md
work-context/sprint-11/sprint-11-agent-prompt.md
```

Đọc thêm:

- backend/frontend `package.json`;
- Prisma schema và migrations;
- Supabase Storage config và bucket policy;
- Supabase Realtime subscriptions/RLS;
- Neo4j Graph Sync, Graph-RAG và query-template modules;
- AI provider/model settings;
- prompt template/version/approval modules;
- System Audit Log modules;
- scheduler/job infrastructure;
- notification modules;
- deterministic report modules;
- AI Guardrail và AI Audit;
- GitHub Actions workflow files;
- GitHub PR/merge/check history.

Canonical priority:

```text
Jira/branch-on-jira.md
→ code và Git history
→ GitHub PR/merge/CI evidence
→ Prisma/Supabase/Neo4j/runtime evidence
→ running-product evidence
→ Sprint documents
→ Jira manual status
```

---

# 4. Reviewer Restrictions

Trong Final Review:

- Không triển khai feature mới.
- Không sửa Acceptance Criteria.
- Không sửa expected result chỉ để test xanh.
- Không tự tạo branch.
- Không tự tạo Jira Bug Key.
- Không merge `develop → main`.
- Không chạy destructive action trên shared Supabase/Neo4j.
- Không chạy notification scheduler trên production/shared data.
- Không thay Realtime publication/configuration.
- Không đổi AI provider/model chính thức.
- Không upload file thử vào production/shared bucket.
- Không dùng screenshots/video thay running product.
- Không ghi CI PASS nếu workflow không chạy thật.
- Không tuyên bố PASS khi còn Mandatory Gate FAIL/BLOCKED.
- Không sửa production code ngoài phiên Bug Fix được Project Owner phê duyệt.

---

# 5. Kết quả hợp lệ

## PASS

```text
Mandatory Gates PASS = 20/20

Tasks verified = 30/30
Stories reviewed = 10/10
Core Epics reviewed = 8/8
Branches reconciled = 48/48
Applicable PRs merged = All

Local Quality Gate = PASS
GitHub Actions = N/A — full CI reserved for main/release

Blocking findings = 0
High findings = 0

Sprint 11 Final Review = PASS
Advanced features approved for use/demo = Yes
MVP release readiness remains = Yes
```

## FAIL

```text
Sprint 11 Final Review = FAIL
Advanced features approved for use/demo = No
MVP release readiness remains = Yes/No based on regression evidence
```

## BLOCKED

```text
Sprint 11 Final Review = BLOCKED
Advanced features approved for use/demo = No
MVP release readiness remains = Yes unless a verified regression exists
```

---

# 6. Mandatory Gates

Sprint 11 Final Review gồm 20 Gate:

1. Sprint 10/MVP baseline integrity.
2. Repository and remote integrity.
3. Sprint scope and traceability.
4. Exact branch reconciliation.
5. PR and merge reconciliation.
6. Task completion.
7. Story Acceptance Reviews.
8. Core Epic Reviews.
9. Backend quality gate.
10. Frontend quality gate.
11. Graph Sync status permission and observability.
12. Retry/rebuild safety and auditability.
13. Read-only Graph Explorer security.
14. AI provider/model and prompt governance.
15. System Audit Log privacy/read-only behavior.
16. Supabase Storage security and lifecycle.
17. Supabase Realtime fallback and checkout authority.
18. Notification Center and scheduled-job correctness.
19. AI Business Narrative and full MVP regression isolation.
20. Findings and final authorization.

---

# 7. Gate 01 — Sprint 10/MVP Baseline Integrity

Verify:

- [ ] Sprint 10 Final Review = PASS.
- [ ] Ready for MVP Release = Yes.
- [ ] MVP release baseline/tag/commit recorded.
- [ ] Sprint 10 Tasks = 101/101.
- [ ] Sprint 10 Release Stories = 6/6.
- [ ] Sprint 10 Core Epics = 4/4.
- [ ] Sprint 10 branches = 111/111.
- [ ] Blocking MVP findings = 0.
- [ ] High MVP findings = 0.
- [ ] Sprint 11 did not modify MVP release criteria.
- [ ] Sprint 11 did not remove mandatory tests or guards.
- [ ] Sprint 11 did not make advanced features mandatory for MVP use.
- [ ] Rollback/reference to MVP baseline remains possible.

```text
Gate 01 = PASS / FAIL / BLOCKED
```

---

# 8. Gate 02 — Repository and Remote Integrity

Run:

```bash
git fetch --all --prune
git switch develop
git pull origin develop
git status --short
git rev-parse HEAD
git rev-parse origin/develop
git log origin/develop --oneline -n 250
```

Verify:

- [ ] Current branch = `develop`.
- [ ] `HEAD = origin/develop`.
- [ ] Working tree clean.
- [ ] No unresolved conflicts.
- [ ] No untracked source/migration/workflow file.
- [ ] No debug bypass.
- [ ] No disabled safety guard.
- [ ] No hidden feature flag forcing incomplete feature on.
- [ ] Sprint 11 implementation exists on remote `develop`.
- [ ] `WORKING-CONTEXT.md` reflects latest state.
- [ ] No Sprint 12 scope mixed in.

Sensitive scan:

```bash
git ls-files | grep -E '(^|/)\.env($|\.)|\.pem$|\.p12$|(^|/)id_rsa$|service-account.*\.json$' || true
```

```text
Gate 02 = PASS / FAIL / BLOCKED
```

---

# 9. Gate 03 — Sprint Scope and Traceability

Reconcile:

```text
Tasks = 30
Stories = 10
Core Epics = 8
Story Points = 32
```

Verify:

- [ ] PAC-TASK-526 → PAC-TASK-555 complete.
- [ ] PAC-736 → PAC-765 mapped correctly.
- [ ] US-151 → US-160 complete.
- [ ] PAC-EPIC-22 → PAC-EPIC-29 complete.
- [ ] Each Task maps to correct Story/Epic.
- [ ] Sprint 12 Tasks PAC-TASK-556 → PAC-TASK-580 not implemented.
- [ ] No raw Cypher console.
- [ ] No graph-editing feature.
- [ ] No AI medical advice.
- [ ] No AI recalculation of reports.
- [ ] No Realtime checkout authority.
- [ ] No multi-store/multi-warehouse scope creep.
- [ ] No customer portal/e-commerce scope creep.

```text
Gate 03 = PASS / FAIL / BLOCKED
```

---

# 10. Gate 04 — Exact Branch Reconciliation

Expected:

```text
Task branches = 30
Story branches = 10
Core Epic branches = 8
Total = 48
```

First logical Task:

```text
PAC-TASK-526
PAC-736
feature/PAC-736-task-526-build-admin-graph-sync-status-list-ui
```

First technical Task:

```text
PAC-TASK-530
PAC-740
feature/PAC-740-task-530-add-graph-sync-status-permission-checks
```

Last Task:

```text
PAC-TASK-555
PAC-765
feature/PAC-765-task-555-build-ai-business-report-narrative-ui
```

Verify:

- [ ] 30/30 Task branches.
- [ ] 10/10 Story branches.
- [ ] 8/8 Core Epic branches.
- [ ] No replacement branch.
- [ ] No renamed/shortened branch.
- [ ] No Story PR.
- [ ] No Epic PR.
- [ ] Technical execution order did not alter Jira mapping.

```text
Gate 04 = PASS / FAIL / BLOCKED
```

---

# 11. Gate 05 — PR and Merge Reconciliation

Verify on GitHub:

- [ ] Every applicable Task/Bug PR targets `develop`.
- [ ] Every applicable PR is merged.
- [ ] No Task exists only locally.
- [ ] No Task branch remains unmerged without approved deferment.
- [ ] Merge SHA appears on `origin/develop`.
- [ ] PR title/commit contains correct Jira Key.
- [ ] Local Quality Gate evidence exists.
- [ ] Applicable CI runs link to correct commit/PR.
- [ ] No direct push to `main`.
- [ ] AI did not merge `develop → main`.
- [ ] No Story/Epic PR.
- [ ] No open blocking PR.

Report:

```text
Applicable PRs expected:
Applicable PRs merged:
Open PRs:
Closed-unmerged PRs:
Deferred Tasks:
Missing merge evidence:
```

```text
Gate 05 = PASS / FAIL / BLOCKED
```

---

# 12. Gate 06 — Task Completion

For all 30 Tasks:

- [ ] Read Task description.
- [ ] Verify Acceptance Criteria.
- [ ] Inspect code/tests/docs.
- [ ] Verify exact branch.
- [ ] Verify PR and merge SHA.
- [ ] Verify Local Quality Gate.
- [ ] Verify applicable CI.
- [ ] Verify permission/security/fallback.
- [ ] Verify MVP regression.
- [ ] Verify no TODO falsely marked complete.
- [ ] Verify no out-of-scope implementation.

Required:

```text
Tasks verified = 30/30
Incomplete = 0
Failed verification = 0
Blocked = 0
```

| Logical Task | Jira Key | Story | Epic | Exact branch | Verification | PR/Merge evidence | Result |
|---|---|---|---|---|---|---|---|
| PAC-TASK-526 | PAC-736 | US-151 | PAC-EPIC-22 | `feature/PAC-736-task-526-build-admin-graph-sync-status-list-ui` | Pending | — | Pending |
| PAC-TASK-527 | PAC-737 | US-151 | PAC-EPIC-22 | `feature/PAC-737-task-527-build-graph-sync-job-detail-ui` | Pending | — | Pending |
| PAC-TASK-528 | PAC-738 | US-152 | PAC-EPIC-22 | `feature/PAC-738-task-528-build-manual-graph-retry-action-for-admin` | Pending | — | Pending |
| PAC-TASK-529 | PAC-739 | US-152 | PAC-EPIC-22 | `feature/PAC-739-task-529-build-manual-graph-rebuild-action-for-admin` | Pending | — | Pending |
| PAC-TASK-530 | PAC-740 | US-151 | PAC-EPIC-22 | `feature/PAC-740-task-530-add-graph-sync-status-permission-checks` | Pending | — | Pending |
| PAC-TASK-531 | PAC-741 | US-153 | PAC-EPIC-23 | `feature/PAC-741-task-531-build-read-only-graph-explorer-ui` | Pending | — | Pending |
| PAC-TASK-532 | PAC-742 | US-153 | PAC-EPIC-23 | `feature/PAC-742-task-532-build-graph-explorer-node-detail-panel` | Pending | — | Pending |
| PAC-TASK-533 | PAC-743 | US-153 | PAC-EPIC-23 | `feature/PAC-743-task-533-build-graph-explorer-relationship-detail-panel` | Pending | — | Pending |
| PAC-TASK-534 | PAC-744 | US-153 | PAC-EPIC-23 | `feature/PAC-744-task-534-add-graph-explorer-permission-checks` | Pending | — | Pending |
| PAC-TASK-535 | PAC-745 | US-153 | PAC-EPIC-23 | `feature/PAC-745-task-535-ensure-graph-explorer-uses-allowlisted-templates-on` | Pending | — | Pending |
| PAC-TASK-536 | PAC-746 | US-154 | PAC-EPIC-24 | `feature/PAC-746-task-536-build-ai-provider-settings-ui` | Pending | — | Pending |
| PAC-TASK-537 | PAC-747 | US-154 | PAC-EPIC-24 | `feature/PAC-747-task-537-build-ai-model-configuration-ui` | Pending | — | Pending |
| PAC-TASK-538 | PAC-748 | US-155 | PAC-EPIC-24 | `feature/PAC-748-task-538-build-prompt-management-list-ui` | Pending | — | Pending |
| PAC-TASK-539 | PAC-749 | US-155 | PAC-EPIC-24 | `feature/PAC-749-task-539-build-prompt-management-version-detail-ui` | Pending | — | Pending |
| PAC-TASK-540 | PAC-750 | US-155 | PAC-EPIC-24 | `feature/PAC-750-task-540-add-prompt-approval-status-display` | Pending | — | Pending |
| PAC-TASK-541 | PAC-751 | US-156 | PAC-EPIC-25 | `feature/PAC-751-task-541-build-system-audit-log-ui` | Pending | — | Pending |
| PAC-TASK-542 | PAC-752 | US-156 | PAC-EPIC-25 | `feature/PAC-752-task-542-add-system-audit-log-filters` | Pending | — | Pending |
| PAC-TASK-543 | PAC-753 | US-157 | PAC-EPIC-26 | `feature/PAC-753-task-543-implement-supabase-storage-upload-flow-for-medicine` | Pending | — | Pending |
| PAC-TASK-544 | PAC-754 | US-157 | PAC-EPIC-26 | `feature/PAC-754-task-544-build-medicine-image-upload-ui` | Pending | — | Pending |
| PAC-TASK-545 | PAC-755 | US-157 | PAC-EPIC-26 | `feature/PAC-755-task-545-add-supabase-storage-file-validation` | Pending | — | Pending |
| PAC-TASK-546 | PAC-756 | US-158 | PAC-EPIC-27 | `feature/PAC-756-task-546-implement-supabase-realtime-inventory-update-listen` | Pending | — | Pending |
| PAC-TASK-547 | PAC-757 | US-158 | PAC-EPIC-27 | `feature/PAC-757-task-547-build-realtime-pos-stock-refresh-behavior` | Pending | — | Pending |
| PAC-TASK-548 | PAC-758 | US-158 | PAC-EPIC-27 | `feature/PAC-758-task-548-add-realtime-fallback-polling-behavior` | Pending | — | Pending |
| PAC-TASK-549 | PAC-759 | US-159 | PAC-EPIC-28 | `feature/PAC-759-task-549-build-notification-center-ui` | Pending | — | Pending |
| PAC-TASK-550 | PAC-760 | US-159 | PAC-EPIC-28 | `feature/PAC-760-task-550-implement-low-stock-notification-generation` | Pending | — | Pending |
| PAC-TASK-551 | PAC-761 | US-159 | PAC-EPIC-28 | `feature/PAC-761-task-551-implement-near-expiry-notification-generation` | Pending | — | Pending |
| PAC-TASK-552 | PAC-762 | US-159 | PAC-EPIC-28 | `feature/PAC-762-task-552-build-read-unread-notification-state` | Pending | — | Pending |
| PAC-TASK-553 | PAC-763 | US-159 | PAC-EPIC-28 | `feature/PAC-763-task-553-implement-scheduled-near-expiry-scan-job` | Pending | — | Pending |
| PAC-TASK-554 | PAC-764 | US-160 | PAC-EPIC-29 | `feature/PAC-764-task-554-implement-ai-business-report-narrative-api` | Pending | — | Pending |
| PAC-TASK-555 | PAC-765 | US-160 | PAC-EPIC-29 | `feature/PAC-765-task-555-build-ai-business-report-narrative-ui` | Pending | — | Pending |

```text
Gate 06 = PASS / FAIL / BLOCKED
```

---

# 13. Gate 07 — Story Acceptance Reviews

Expected:

```text
US-151 → US-160
Total = 10
```

For each Story:

- [ ] All direct Tasks merged.
- [ ] Acceptance Criteria verified on latest `develop`.
- [ ] Permission/security/fallback PASS.
- [ ] Advanced feature enabled path PASS.
- [ ] Advanced feature disabled/unavailable path PASS.
- [ ] MVP regression PASS.
- [ ] No Blocking/High finding.
- [ ] No Story PR.

Required:

```text
Story Acceptance Reviews PASS = 10/10
```

| Story | Jira Key | Summary | Points | Direct Tasks | Acceptance Review | MVP regression | Result |
|---|---|---|---:|---|---|---|---|
| US-151 | PAC-191 | Admin Graph Sync Status UI | 3 | PAC-TASK-526, PAC-TASK-527, PAC-TASK-530 | Pending | Pending | Pending |
| US-152 | PAC-192 | Manual graph retry/rebuild UI | 3 | PAC-TASK-528, PAC-TASK-529 | Pending | Pending | Pending |
| US-153 | PAC-193 | Read-only Graph Explorer | 5 | PAC-TASK-531, PAC-TASK-532, PAC-TASK-533, PAC-TASK-534, PAC-TASK-535 | Pending | Pending | Pending |
| US-154 | PAC-194 | AI Provider Settings UI | 3 | PAC-TASK-536, PAC-TASK-537 | Pending | Pending | Pending |
| US-155 | PAC-195 | Prompt Management UI | 3 | PAC-TASK-538, PAC-TASK-539, PAC-TASK-540 | Pending | Pending | Pending |
| US-156 | PAC-196 | System Audit Log UI | 3 | PAC-TASK-541, PAC-TASK-542 | Pending | Pending | Pending |
| US-157 | PAC-197 | Supabase Storage for medicine images | 3 | PAC-TASK-543, PAC-TASK-544, PAC-TASK-545 | Pending | Pending | Pending |
| US-158 | PAC-198 | Supabase Realtime inventory updates | 3 | PAC-TASK-546, PAC-TASK-547, PAC-TASK-548 | Pending | Pending | Pending |
| US-159 | PAC-199 | Notification Center | 3 | PAC-TASK-549, PAC-TASK-550, PAC-TASK-551, PAC-TASK-552, PAC-TASK-553 | Pending | Pending | Pending |
| US-160 | PAC-200 | AI Business Report Narrative | 3 | PAC-TASK-554, PAC-TASK-555 | Pending | Pending | Pending |

```text
Gate 07 = PASS / FAIL / BLOCKED
```

---

# 14. Gate 08 — Core Epic Reviews

Required Core Epic Reviews:

1. PAC-EPIC-22 — Admin Graph Sync Status UI.
2. PAC-EPIC-23 — Read-only Graph Explorer.
3. PAC-EPIC-24 — AI Provider & Prompt Management UI.
4. PAC-EPIC-25 — System Audit Log UI.
5. PAC-EPIC-26 — Supabase Storage for Medicine Images.
6. PAC-EPIC-27 — Supabase Realtime Inventory Updates.
7. PAC-EPIC-28 — Notification Center.
8. PAC-EPIC-29 — AI Business Report Narrative.

For each Epic:

- [ ] Related Tasks complete.
- [ ] Related Story Reviews PASS.
- [ ] Permission/security PASS.
- [ ] Fallback/degraded behavior PASS.
- [ ] MVP enabled/disabled regression PASS.
- [ ] No Blocking/High finding.
- [ ] No Epic PR.

| Core Epic | Jira Key | Name | Direct Tasks | Epic Review | Security/Fallback | MVP regression | Result |
|---|---|---|---:|---|---|---|---|
| PAC-EPIC-22 | PAC-22 | Admin Graph Sync Status UI | 5 | Pending | Pending | Pending | Pending |
| PAC-EPIC-23 | PAC-23 | Read-only Graph Explorer | 5 | Pending | Pending | Pending | Pending |
| PAC-EPIC-24 | PAC-24 | AI Provider & Prompt Management UI | 5 | Pending | Pending | Pending | Pending |
| PAC-EPIC-25 | PAC-25 | System Audit Log UI | 2 | Pending | Pending | Pending | Pending |
| PAC-EPIC-26 | PAC-26 | Supabase Storage for Medicine Images | 3 | Pending | Pending | Pending | Pending |
| PAC-EPIC-27 | PAC-27 | Supabase Realtime Inventory Updates | 3 | Pending | Pending | Pending | Pending |
| PAC-EPIC-28 | PAC-28 | Notification Center | 5 | Pending | Pending | Pending | Pending |
| PAC-EPIC-29 | PAC-29 | AI Business Report Narrative | 2 | Pending | Pending | Pending | Pending |

```text
Gate 08 = PASS / FAIL / BLOCKED
```

---

# 15. Gate 09 — Backend Quality Gate

Read backend `package.json` and run actual scripts.

Minimum:

```bash
cd backend
npm run lint
npm run build
npm run test
npm run test:e2e
npx prisma validate
npx prisma generate
```

Run dedicated typecheck if present.

Record:

```text
Backend lint:
Backend typecheck:
Backend build:
Unit tests:
Integration/E2E:
Skipped tests:
Flaky/retried tests:
Prisma validate:
Prisma generate:
```

Rules:

- Lint error blocks PASS.
- Skipped high-risk tests require justification.
- Retry-only PASS must be disclosed.
- No destructive tests on shared environment.
- No advanced feature may weaken existing MVP tests.
- `git status --short` must remain clean after checks.

```text
Gate 09 = PASS / FAIL / BLOCKED
```

---

# 16. Gate 10 — Frontend Quality Gate

Read frontend `package.json`.

Minimum:

```bash
cd frontend
npm run lint
npm run build
```

Run component tests and Playwright if available.

Record:

```text
Frontend lint:
Frontend warnings:
Frontend build:
Component tests:
Playwright Chrome:
Responsive checks:
Skipped tests:
Flaky/retried tests:
```

Verify:

- Permission-aware UI.
- Loading/empty/error/degraded states.
- Feature hidden/disabled when unavailable.
- Chrome/Chromium desktop PASS.
- Basic responsive PASS.
- No secret exposed in client bundle/log.
- MVP UI remains usable without advanced features.

```text
Gate 10 = PASS / FAIL / BLOCKED
```

---

# 17. Gate 11 — Graph Sync Status Permission and Observability

Verify:

- [ ] Admin can view job list.
- [ ] Admin can view job detail.
- [ ] Staff denied.
- [ ] Warehouse denied.
- [ ] Pending/success/failed states correct.
- [ ] Freshness/degraded state correct.
- [ ] Error summary redacted.
- [ ] Pagination/filter stable if supported.
- [ ] Frontend does not connect Neo4j directly.
- [ ] No credential/internal connection info exposed.
- [ ] API contract stable.
- [ ] UI unavailable does not break Graph Sync backend.

Required actor matrix:

| Actor | Expected |
|---|---|
| Admin | Allowed |
| Staff | Denied |
| Warehouse | Denied |

```text
Gate 11 = PASS / FAIL / BLOCKED
```

---

# 18. Gate 12 — Retry/Rebuild Safety and Auditability

Verify:

- [ ] Admin-only.
- [ ] Explicit confirmation.
- [ ] Environment/target check.
- [ ] Bounded projection scope.
- [ ] Lock/idempotency or concurrency control.
- [ ] No global delete on shared AuraDB.
- [ ] PostgreSQL remains unchanged.
- [ ] Action result stored/displayed.
- [ ] Failure isolated.
- [ ] Safe error summary.
- [ ] Audit event created where supported.
- [ ] Duplicate action handled safely.
- [ ] UI timeout/retry behavior reasonable.
- [ ] Disabled/unavailable action does not break MVP.
- [ ] No checkout dependency.

Forbidden shared command:

```cypher
MATCH (n) DETACH DELETE n
```

```text
Gate 12 = PASS / FAIL / BLOCKED
```

---

# 19. Gate 13 — Read-only Graph Explorer Security

Verify:

- [ ] Medicine → CONTAINS → ActiveIngredient works.
- [ ] ActiveIngredient → INTERACTS_WITH → ActiveIngredient works.
- [ ] Node detail is read-only.
- [ ] Relationship detail is read-only.
- [ ] Only allowlisted query types.
- [ ] Parameterized queries.
- [ ] Entity IDs validated.
- [ ] Depth/count bounded.
- [ ] Timeout applied.
- [ ] Unknown query type rejected.
- [ ] Raw Cypher rejected.
- [ ] Arbitrary traversal rejected.
- [ ] Internal Cypher not exposed.
- [ ] Neo4j credential not exposed.
- [ ] Graph unavailable gives safe error/degraded state.
- [ ] Explorer never authorizes checkout.
- [ ] Explorer unavailable does not break POS/Checkout.

Required:

```text
Raw Cypher request
→ rejected
→ query executed = false
```

```text
Gate 13 = PASS / FAIL / BLOCKED
```

---

# 20. Gate 14 — AI Provider/Model and Prompt Governance

## Provider/Model

Verify:

- [ ] Admin-only update.
- [ ] Provider allowlist.
- [ ] Model allowlist.
- [ ] Invalid values rejected by backend.
- [ ] API key/secret never returned.
- [ ] No client-side secret storage.
- [ ] Google AI remains primary.
- [ ] MockAI fallback remains available.
- [ ] Config changes audited where supported.

## Prompt Governance

Verify:

- [ ] Prompt list displays safe metadata.
- [ ] Version detail correct.
- [ ] Approval status visible.
- [ ] Unapproved prompt cannot be active.
- [ ] Version history not overwritten.
- [ ] Prompt version recorded in AI Audit.
- [ ] UI cannot bypass backend approval.
- [ ] Sensitive prompt content follows permission policy.
- [ ] Existing approved prompt flow remains operational when UI unavailable.

```text
Gate 14 = PASS / FAIL / BLOCKED
```

---

# 21. Gate 15 — System Audit Log Privacy and Read-only Behavior

Verify:

- [ ] Admin-only.
- [ ] Unauthorized actors denied.
- [ ] Read-only.
- [ ] No edit/delete UI/API.
- [ ] Stable pagination.
- [ ] Valid date/action/actor/entity filters.
- [ ] Loading/empty/error states.
- [ ] PII minimized/redacted.
- [ ] Token/password/connection string absent.
- [ ] Historical audit immutable.
- [ ] Error details safe.
- [ ] Audit UI unavailable does not affect audit persistence.
- [ ] No unplanned export feature.

```text
Gate 15 = PASS / FAIL / BLOCKED
```

---

# 22. Gate 16 — Supabase Storage Security and Lifecycle

Verify:

- [ ] Authorized upload succeeds.
- [ ] Unauthorized upload denied.
- [ ] Allowed image type accepted.
- [ ] Dangerous/executable type rejected.
- [ ] Oversized file rejected.
- [ ] MIME spoof handled where detectable.
- [ ] Filename/path traversal blocked.
- [ ] Safe object naming/path.
- [ ] Service-role key backend-only.
- [ ] Public/private/signed URL policy correct.
- [ ] Medicine metadata updated correctly.
- [ ] Failed metadata update cleanup handled.
- [ ] Replacement/removal behavior correct.
- [ ] Orphan strategy documented.
- [ ] Medicine without image still works.
- [ ] Storage unavailable does not break Medicine CRUD/POS.
- [ ] Test bucket/environment safe.
- [ ] No secret in logs/errors/client bundle.

```text
Gate 16 = PASS / FAIL / BLOCKED
```

---

# 23. Gate 17 — Supabase Realtime Fallback and Checkout Authority

Verify:

- [ ] Scoped channel/table subscription.
- [ ] RLS/permission implications correct.
- [ ] Listener cleanup/unsubscribe.
- [ ] Inventory event refreshes displayed stock.
- [ ] Duplicate/out-of-order event handled.
- [ ] Disconnect detected.
- [ ] Reconnect works.
- [ ] Fallback polling/manual refresh works.
- [ ] Polling interval bounded.
- [ ] No listener leak.
- [ ] Draft order not silently modified.
- [ ] Backend checkout revalidates stock.
- [ ] FEFO still backend controlled.
- [ ] Interaction check still authoritative.
- [ ] Realtime unavailable does not make POS unusable.
- [ ] MVP path works with Realtime disabled.

Required invariant:

```text
Realtime = UX enhancement
Backend checkout validation = authority
```

```text
Gate 17 = PASS / FAIL / BLOCKED
```

---

# 24. Gate 18 — Notification Center and Scheduled-job Correctness

Verify:

- [ ] Notification access user-scoped.
- [ ] Unauthorized users cannot view others' notifications.
- [ ] Low-stock uses sellable quantity.
- [ ] Expired batches excluded.
- [ ] Near-expiry uses current setting.
- [ ] Expired not duplicated as near-expiry.
- [ ] Duplicate suppression works.
- [ ] Read/unread works per user.
- [ ] Center loading/empty/error states.
- [ ] Scheduled scan bounded.
- [ ] Job idempotent/retry-safe.
- [ ] Scheduler concurrency controlled where needed.
- [ ] Job observable.
- [ ] Failed job does not alter inventory.
- [ ] No external notification channel beyond scope.
- [ ] Notification feature disabled/unavailable does not break reports/dashboard.

```text
Gate 18 = PASS / FAIL / BLOCKED
```

---

# 25. Gate 19 — AI Business Narrative and MVP Regression Isolation

## AI Business Narrative

Verify:

- [ ] Input comes from deterministic report output.
- [ ] AI does not calculate totals.
- [ ] AI does not rank medicines independently.
- [ ] AI does not calculate inventory quantities.
- [ ] Numeric report remains authoritative.
- [ ] Narrative cannot override report.
- [ ] Filters/date range preserved.
- [ ] Prompt version/provider/model recorded.
- [ ] Guardrail applies.
- [ ] AI Audit applies.
- [ ] Disclaimer present.
- [ ] PII minimized.
- [ ] Context/token bounded.
- [ ] Provider failure has safe fallback/error.
- [ ] MockAI path works where supported.
- [ ] No diagnosis/prescribing/dosage.
- [ ] Narrative UI loading/empty/error states.

## Full MVP Regression Isolation

Run/verify:

```text
Advanced feature enabled → MVP PASS
Advanced feature disabled/unavailable → MVP PASS
```

Core MVP areas:

- Auth/RBAC.
- Medicine/Inventory.
- Stock Import/Adjustment.
- POS Draft Order.
- Interaction Check/HIGH handling.
- Checkout/FEFO.
- Payment/Invoice.
- AI Guardrail/Audit.
- Graph-RAG fallback.
- Reports.
- System Settings.
- Demo reset/smoke.
- GitHub Actions.

If Sprint 11 causes a verified core regression:

```text
MVP release readiness remains = No
```

until fixed and re-reviewed.

```text
Gate 19 = PASS / FAIL / BLOCKED
```

---

# 26. Gate 20 — Findings and Final Authorization

PASS only when:

```text
Gate 01 → Gate 19 = PASS

Tasks verified = 30/30
Stories reviewed = 10/10
Core Epics reviewed = 8/8
Branches reconciled = 48/48
Applicable PRs merged = All

Local Quality Gate = PASS
GitHub Actions = N/A — full CI reserved for main/release

Blocking findings = 0
High findings = 0
```

PASS state:

```text
Sprint 11 Final Review = PASS
Mandatory Gates PASS = 20/20
Advanced features approved for use/demo = Yes
MVP release readiness remains = Yes
```

Blocker/High:

```text
Sprint 11 Final Review = FAIL/BLOCKED
Advanced features approved for use/demo = No
```

MVP release readiness only changes to No when a real core MVP regression is verified.

```text
Gate 20 = PASS / FAIL / BLOCKED
```

---

# 27. Findings Register

| Finding ID | Gate | Severity | Area | Finding | MVP regression | Evidence | Required action | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|
| S11-FR-001 | — | — | — | Chưa có | — | — | — | — | Open |

Severity:

```text
Blocker
High
Medium
Low
Observation
```

Do not delete findings. Update status/evidence when resolved.

---

# 28. Bug Candidate Workflow

Final Reviewer does not create Jira Bug Keys.

When finding a defect:

```text
Bug Candidate:
Severity:
Affected Task/Story/Epic:
MVP regression: Yes/No
Actual:
Expected:
Evidence:
Suggested fix scope:
Release/demo impact:
```

Project Owner creates Jira Bug.

Fix only through exact Bug branch and PR to `develop`.

Re-run all affected Gates after merge.

---

# 29. Required Final Review Report

Create:

```text
work-context/sprint-11/sprint-11-final-review-report.md
```

Required structure:

```markdown
# Sprint 11 Final Review Report

## Decision

Sprint 11 Final Review = PASS/FAIL/BLOCKED
Mandatory Gates PASS = x/20
Advanced features approved for use/demo = Yes/No
MVP release readiness remains = Yes/No

## Scope Reconciliation

- Tasks verified: x/30
- Stories reviewed: x/10
- Core Epics reviewed: x/8
- Branches reconciled: x/48
- Applicable PRs merged: x/x

## Repository

- Local develop SHA:
- Remote develop SHA:
- Working tree:
- Secret scan:
- MVP release baseline:

## Quality Gates

### Backend
- Lint:
- Typecheck:
- Build:
- Unit:
- Integration/E2E:
- Prisma:
- Skipped/flaky:

### Frontend
- Lint:
- Build:
- Component tests:
- Playwright:
- Responsive:
- Skipped/flaky:

### CI
- Latest workflow runs:
- Required checks:
- Local Quality Gate:
- Applicable CI:

## Advanced Feature Verification

- Graph Sync Status:
- Retry/Rebuild:
- Graph Explorer:
- AI Provider/Model:
- Prompt Governance:
- Audit Log:
- Supabase Storage:
- Supabase Realtime:
- Notifications/Scheduler:
- AI Business Narrative:

## MVP Regression Isolation

- Feature-enabled path:
- Feature-disabled/unavailable path:
- Core MVP smoke:
- Verified regressions:

## Gate Results

1. MVP baseline:
2. Repository:
3. Scope:
4. Branches:
5. PR/merge:
6. Tasks:
7. Stories:
8. Epics:
9. Backend:
10. Frontend:
11. Graph Status:
12. Retry/Rebuild:
13. Graph Explorer:
14. AI Governance:
15. Audit Log:
16. Storage:
17. Realtime:
18. Notifications:
19. Narrative/MVP regression:
20. Authorization:

## Findings

- Blocking:
- High:
- Medium:
- Low:
- Observations:

## Final State

Sprint 11 Final Review =
Advanced features approved for use/demo =
MVP release readiness remains =
Project Owner may choose advanced features for demo =
```

---

# 30. Documentation Updates

After review:

1. Update `sprint-11-progress.md`.
2. Update `WORKING-CONTEXT.md`.
3. Create `sprint-11-final-review-report.md`.
4. Commit/push documentation through valid workflow.
5. Do not alter production code in documentation update.
6. Do not merge `develop → main`.

If PASS:

```text
Sprint 11 Final Review = PASS
Advanced features approved for use/demo = Yes
MVP release readiness remains = Yes
```

Project Owner decides whether advanced features are included in demo/release.

---

# 31. Final Output to Project Owner

```text
Decision: PASS / FAIL / BLOCKED
Mandatory Gates: x/20

Tasks verified: x/30
Stories reviewed: x/10
Core Epics reviewed: x/8
Branches reconciled: x/48
PRs merged: x/x

Backend checks:
Frontend checks:
GitHub Actions:
Graph Sync Status:
Retry/Rebuild:
Graph Explorer:
AI Provider/Model:
Prompt Governance:
System Audit Log:
Supabase Storage:
Supabase Realtime:
Notification Center:
Scheduled scan:
AI Business Narrative:
MVP feature-enabled regression:
MVP feature-disabled regression:
Security/secrets:

Blocking findings:
High findings:
Required actions:

Sprint 11 Final Review:
Advanced features approved for use/demo:
MVP release readiness remains:
```

Do not declare PASS until all 20/20 Mandatory Gates have direct evidence.

---

# 32. Start Instruction

Execute in order:

1. Read all canonical sources.
2. Verify Sprint 10 Final Review and MVP release baseline.
3. Verify latest local/remote `develop`.
4. Reconcile 30 Tasks, 10 Stories and 8 Core Epics.
5. Reconcile 48 canonical branches.
6. Reconcile all applicable PRs and merge SHAs.
7. Verify 30/30 Tasks.
8. Run 10 Story Acceptance Reviews.
9. Run 8 Core Epic Reviews.
10. Run backend quality gate.
11. Run frontend quality gate.
12. Verify Graph Sync Status permissions.
13. Verify retry/rebuild safety.
14. Verify Graph Explorer security.
15. Verify AI provider/model and prompt governance.
16. Verify Audit Log privacy/read-only behavior.
17. Verify Supabase Storage.
18. Verify Supabase Realtime and checkout authority.
19. Verify Notification Center and scheduler.
20. Verify AI Narrative.
21. Run full MVP regression with advanced features enabled.
22. Run/verify MVP behavior with advanced features disabled/unavailable.
23. Review secrets/destructive-operation guards.
24. Record findings.
25. Create Final Review Report.
26. Update progress and WORKING-CONTEXT.
27. PASS only when 20/20 Gates PASS.
28. Do not merge `develop → main`.
