# Sprint 11 AI Agent Prompt — PharmaAssist AI Intelligence

> **Should-have / Advanced implementation prompt**
>
> Repository path:
>
> `work-context/sprint-11/sprint-11-agent-prompt.md`
>
> Chỉ chạy sau khi Sprint 10 Final Review, Project Leader approval và Sprint 11 Audit đều PASS.

---

# 1. Vai trò và mục tiêu

Bạn là AI Coding Agent chính của Sprint 11.

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

Mục tiêu:

```text
permission-safe Graph Sync observability
→ controlled retry/rebuild
→ read-only Graph Explorer
→ AI provider/prompt governance UI
→ System Audit Log UI
→ Supabase Storage medicine images
→ Supabase Realtime inventory UX
→ Notification Center and scheduled scan
→ AI Business Report Narrative
```

Sprint 11 là Should-have / Advanced. Không phải MVP Gate.

Mọi advanced feature phải:

- không làm giảm MVP release readiness;
- có safe fallback hoặc graceful absence;
- không thay đổi deterministic business rules;
- không trở thành source of truth mới;
- không được bật cho use/demo chính thức trước Story/Epic Review PASS.

---

# 2. Authorization Gate

Chỉ bắt đầu code khi:

```text
Sprint 10 Final Review = PASS
Ready for MVP Release = Yes
MVP release baseline/tag = Recorded

Project Leader approval = Yes
Team capacity = Available

Sprint 11 Audit = PASS
Mandatory Gates PASS = 20/20
Ready to implement Sprint 11 = Yes

30/30 exact Task branches = Verified
10/10 Story branches = Verified
8/8 Core Epic branches = Verified

Blocking findings = 0
High findings = 0
```

Nếu thiếu một điều kiện:

```text
Không sửa Sprint 11 production code
Không chạy graph retry/rebuild
Không upload file vào shared/production bucket
Không thay Realtime publication
Không chạy scheduled job trên shared data
Không đổi AI provider/model
Không tự tạo branch
Không tạo PR
Không merge PR
Cập nhật progress với blocker thật
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
Jira/4D_Task_List_Testing_Advanced_Future_436_580.md
Jira/4D_Task_Description_Testing_Advanced_Future_436_580.md
Jira/5_Sprint.md

work-context/sprint-10/sprint-10-final-review-report.md
work-context/sprint-11/sprint-11.md
work-context/sprint-11/sprint-11-progress.md
work-context/sprint-11/sprint-11-audit.md
work-context/sprint-11/sprint-11-audit-report.md
```

Đọc thêm theo phạm vi Task:

- backend/frontend `package.json`;
- Prisma schema và migrations;
- Graph Sync, Graph-RAG và freshness modules;
- current Neo4j query templates;
- AI provider/model settings;
- prompt template/version/approval modules;
- System Audit Log modules;
- medicine APIs và UI;
- Supabase Storage configuration;
- Supabase Realtime configuration;
- inventory/POS state management;
- scheduler/job infrastructure;
- notification modules;
- deterministic report modules;
- AI Guardrail và AI Audit;
- GitHub Actions workflows.

`Jira/branch-on-jira.md` là nguồn duy nhất cho Jira Key và exact branch.

---

# 4. Skill Routing

Mọi Task:

```text
karpathy-principles
```

Chọn thêm theo phạm vi:

```text
Graph Sync status / retry / rebuild:
ecc-backend + ecc-database + ecc-security + ecc-testing + tdd

Graph Explorer:
ecc-backend + ecc-frontend + ecc-database + ecc-security + tdd

AI Provider / Prompt Governance:
ecc-backend + ecc-frontend + ecc-security + ecc-testing + tdd

System Audit Log:
ecc-backend + ecc-frontend + ecc-security + ecc-database + tdd

Supabase Storage:
ecc-backend + ecc-frontend + ecc-security + ecc-database + tdd

Supabase Realtime:
ecc-backend + ecc-frontend + modern-web-guidance + ecc-testing

Notification Center / Scheduler:
ecc-backend + ecc-frontend + ecc-database + ecc-security + tdd

AI Business Narrative:
ecc-backend + ecc-frontend + ecc-security + ecc-testing + tdd

Git/PR/CI:
git-github + ecc-code-quality

Task nhiều module:
superpowers-workflow hoặc writing-plans

Debug/concurrency/flaky:
mattpocock-engineering + ecc-testing + tdd
```

Trước mỗi Task, báo:

```text
Skills selected:
- ...

Reason:
...
```

Không dùng planning để trì hoãn Task đã rõ Acceptance Criteria.

---

# 5. First Technical Task

Bắt đầu bằng permission safety:

```text
Logical Task:
PAC-TASK-530 / TASK-530

Jira Key:
PAC-740

Task:
Add Graph Sync Status permission checks

Exact branch:
feature/PAC-740-task-530-add-graph-sync-status-permission-checks
```

Kiểm tra:

```bash
git fetch --all --prune
git branch -r --list "origin/feature/PAC-740-task-530-add-graph-sync-status-permission-checks"
```

Nếu exact branch không tồn tại:

```text
Dừng
Không chạy git switch -c
Không chạy git checkout -b
Không tự tạo replacement branch
Không sửa hoặc rút gọn branch slug
Báo blocker cho Project Owner
```

---

# 6. Technical Execution Order

## Phase 1 — Graph Sync Observability and Permission Safety

| Order | Logical Task | Jira Key | Task | Exact branch |
|---:|---|---|---|---|
| 1 | PAC-TASK-530 | PAC-740 | Add Graph Sync Status permission checks | `feature/PAC-740-task-530-add-graph-sync-status-permission-checks` |
| 2 | PAC-TASK-526 | PAC-736 | Build Admin Graph Sync Status list UI | `feature/PAC-736-task-526-build-admin-graph-sync-status-list-ui` |
| 3 | PAC-TASK-527 | PAC-737 | Build Graph Sync job detail UI | `feature/PAC-737-task-527-build-graph-sync-job-detail-ui` |

## Phase 2 — Controlled Graph Retry and Rebuild

| Order | Logical Task | Jira Key | Task | Exact branch |
|---:|---|---|---|---|
| 1 | PAC-TASK-528 | PAC-738 | Build manual graph retry action for Admin | `feature/PAC-738-task-528-build-manual-graph-retry-action-for-admin` |
| 2 | PAC-TASK-529 | PAC-739 | Build manual graph rebuild action for Admin | `feature/PAC-739-task-529-build-manual-graph-rebuild-action-for-admin` |

## Phase 3 — Read-only Graph Explorer

| Order | Logical Task | Jira Key | Task | Exact branch |
|---:|---|---|---|---|
| 1 | PAC-TASK-535 | PAC-745 | Ensure Graph Explorer uses allowlisted templates only | `feature/PAC-745-task-535-ensure-graph-explorer-uses-allowlisted-templates-on` |
| 2 | PAC-TASK-534 | PAC-744 | Add Graph Explorer permission checks | `feature/PAC-744-task-534-add-graph-explorer-permission-checks` |
| 3 | PAC-TASK-531 | PAC-741 | Build read-only Graph Explorer UI | `feature/PAC-741-task-531-build-read-only-graph-explorer-ui` |
| 4 | PAC-TASK-532 | PAC-742 | Build Graph Explorer node detail panel | `feature/PAC-742-task-532-build-graph-explorer-node-detail-panel` |
| 5 | PAC-TASK-533 | PAC-743 | Build Graph Explorer relationship detail panel | `feature/PAC-743-task-533-build-graph-explorer-relationship-detail-panel` |

## Phase 4 — AI Provider and Prompt Governance UI

| Order | Logical Task | Jira Key | Task | Exact branch |
|---:|---|---|---|---|
| 1 | PAC-TASK-536 | PAC-746 | Build AI Provider Settings UI | `feature/PAC-746-task-536-build-ai-provider-settings-ui` |
| 2 | PAC-TASK-537 | PAC-747 | Build AI model configuration UI | `feature/PAC-747-task-537-build-ai-model-configuration-ui` |
| 3 | PAC-TASK-538 | PAC-748 | Build Prompt Management list UI | `feature/PAC-748-task-538-build-prompt-management-list-ui` |
| 4 | PAC-TASK-539 | PAC-749 | Build Prompt Management version detail UI | `feature/PAC-749-task-539-build-prompt-management-version-detail-ui` |
| 5 | PAC-TASK-540 | PAC-750 | Add prompt approval status display | `feature/PAC-750-task-540-add-prompt-approval-status-display` |

## Phase 5 — System Audit Log UI

| Order | Logical Task | Jira Key | Task | Exact branch |
|---:|---|---|---|---|
| 1 | PAC-TASK-541 | PAC-751 | Build System Audit Log UI | `feature/PAC-751-task-541-build-system-audit-log-ui` |
| 2 | PAC-TASK-542 | PAC-752 | Add System Audit Log filters | `feature/PAC-752-task-542-add-system-audit-log-filters` |

## Phase 6 — Supabase Storage for Medicine Images

| Order | Logical Task | Jira Key | Task | Exact branch |
|---:|---|---|---|---|
| 1 | PAC-TASK-545 | PAC-755 | Add Supabase Storage file validation | `feature/PAC-755-task-545-add-supabase-storage-file-validation` |
| 2 | PAC-TASK-543 | PAC-753 | Implement Supabase Storage upload flow for medicine images | `feature/PAC-753-task-543-implement-supabase-storage-upload-flow-for-medicine` |
| 3 | PAC-TASK-544 | PAC-754 | Build medicine image upload UI | `feature/PAC-754-task-544-build-medicine-image-upload-ui` |

## Phase 7 — Supabase Realtime Inventory UX

| Order | Logical Task | Jira Key | Task | Exact branch |
|---:|---|---|---|---|
| 1 | PAC-TASK-546 | PAC-756 | Implement Supabase Realtime inventory update listener | `feature/PAC-756-task-546-implement-supabase-realtime-inventory-update-listen` |
| 2 | PAC-TASK-548 | PAC-758 | Add realtime fallback polling behavior | `feature/PAC-758-task-548-add-realtime-fallback-polling-behavior` |
| 3 | PAC-TASK-547 | PAC-757 | Build realtime POS stock refresh behavior | `feature/PAC-757-task-547-build-realtime-pos-stock-refresh-behavior` |

## Phase 8 — Notification Center and Scheduled Near-expiry Scan

| Order | Logical Task | Jira Key | Task | Exact branch |
|---:|---|---|---|---|
| 1 | PAC-TASK-550 | PAC-760 | Implement low-stock notification generation | `feature/PAC-760-task-550-implement-low-stock-notification-generation` |
| 2 | PAC-TASK-551 | PAC-761 | Implement near-expiry notification generation | `feature/PAC-761-task-551-implement-near-expiry-notification-generation` |
| 3 | PAC-TASK-553 | PAC-763 | Implement scheduled near-expiry scan job | `feature/PAC-763-task-553-implement-scheduled-near-expiry-scan-job` |
| 4 | PAC-TASK-549 | PAC-759 | Build Notification Center UI | `feature/PAC-759-task-549-build-notification-center-ui` |
| 5 | PAC-TASK-552 | PAC-762 | Build read/unread notification state | `feature/PAC-762-task-552-build-read-unread-notification-state` |

## Phase 9 — AI Business Report Narrative

| Order | Logical Task | Jira Key | Task | Exact branch |
|---:|---|---|---|---|
| 1 | PAC-TASK-554 | PAC-764 | Implement AI Business Report Narrative API | `feature/PAC-764-task-554-implement-ai-business-report-narrative-api` |
| 2 | PAC-TASK-555 | PAC-765 | Build AI Business Report Narrative UI | `feature/PAC-765-task-555-build-ai-business-report-narrative-ui` |

Technical order chỉ thay đổi thứ tự triển khai an toàn. Không thay đổi Logical Task, Jira Key, Story/Epic mapping hoặc exact branch.

---

# 7. Core Invariants

## 7.1 MVP release isolation

- Sprint 11 không phải MVP Gate.
- Sprint 11 không được làm chậm MVP release.
- MVP release baseline/tag phải được ghi trước Sprint 11.
- Feature chưa PASS phải ẩn/tắt hoặc không expose.
- Advanced feature lỗi hoặc unavailable không được làm core MVP unusable.
- Mọi MVP regression phải được ưu tiên sửa trước advanced feature.

## 7.2 PostgreSQL and Neo4j

- PostgreSQL là source of truth.
- Neo4j là read projection.
- Graph Sync status UI chỉ quan sát backend state.
- Retry/rebuild không sửa PostgreSQL source.
- Graph Explorer read-only.
- Không raw Cypher.
- Không arbitrary graph traversal.
- Không graph editing.
- Không dùng graph để quyết định checkout.

## 7.3 AI governance

- Google AI primary, MockAI fallback.
- Không expose API key.
- Provider/model chỉ từ allowlist.
- Prompt versioning và approval không bị bypass.
- AI Guardrail, AI Audit và disclaimer tiếp tục bắt buộc.
- Không diagnosis, prescribing hoặc dosage advice.
- AI Narrative chỉ giải thích deterministic report output.
- AI không tự tính totals, ranking hoặc inventory quantity.

## 7.4 Storage

- Supabase service-role key backend-only.
- File type, size, extension và path phải validate.
- Không tin client MIME một cách mù quáng.
- Medicine không có ảnh vẫn hoạt động.
- Storage failure không làm hỏng Medicine CRUD/POS.
- Failed upload/metadata flow có cleanup hợp lý.

## 7.5 Realtime

- Realtime chỉ cải thiện UX.
- Backend checkout validation là authority.
- Realtime không bypass FEFO.
- Realtime không bypass interaction check.
- Disconnect/reconnect/fallback phải rõ.
- Draft order không tự thay đổi ngoài kiểm soát.

## 7.6 Notifications

- Low-stock dùng sellable quantity.
- Expired stock không được tính sellable.
- Near-expiry dùng current System Setting.
- Expired không bị duplicate thành near-expiry.
- Read/unread state user-scoped.
- Scheduled job bounded, idempotent và observable.

---

# 8. Feature Safety Contracts

## 8.1 Graph Sync Status

- Admin-only.
- Staff/Warehouse bị từ chối.
- Pending/success/failed hiển thị chính xác.
- Error summary redacted.
- Freshness/degraded state đúng.
- Frontend không kết nối Neo4j trực tiếp.

## 8.2 Retry and Rebuild

- Admin-only.
- Explicit confirmation.
- Environment/target verification.
- Lock hoặc idempotency.
- Bounded scope.
- Không global delete trên shared AuraDB.
- Result/audit evidence.
- Failure không làm hỏng PostgreSQL.

## 8.3 Graph Explorer

- Allowlisted query types.
- Parameterized Cypher.
- Entity validation.
- Bounded depth/results.
- Timeout.
- Read-only node/relationship detail.
- Raw Cypher rejected.
- Internal query/credential không expose.
- Không quyết định checkout.

## 8.4 AI Provider and Prompt UI

- API key không hiển thị.
- Provider/model allowlist.
- Backend validation.
- Admin-only update.
- Prompt version và approval status rõ.
- Unapproved prompt không active.
- Historical version không overwrite.
- Config/prompt changes audited khi backend hỗ trợ.

## 8.5 Audit Log UI

- Admin-only.
- Read-only.
- Pagination.
- Validated filters.
- No edit/delete.
- PII/secret redaction.
- Historical log immutability.

## 8.6 Storage

- Authorized upload.
- Type/size/path validation.
- Dangerous file rejection.
- Safe object naming.
- Metadata update and cleanup.
- No service-role key in frontend.
- Safe behavior when Storage unavailable.

## 8.7 Realtime

- Scoped subscription.
- Listener cleanup.
- Duplicate/out-of-order handling.
- Reconnect.
- Bounded polling/manual fallback.
- Backend stock revalidation.
- No POS unusability on disconnect.

## 8.8 Notifications

- Permission-aware.
- User-scoped.
- Deterministic source conditions.
- Duplicate suppression.
- Read/unread.
- Bounded scheduled scan.
- Retry/observability.
- No external channel beyond scope.

## 8.9 AI Narrative

- Deterministic report input.
- Numeric report remains authoritative.
- PII minimization.
- Prompt version/provider/model recorded.
- Guardrail/Audit/disclaimer.
- Bounded context.
- Safe provider failure/fallback.
- No medical advice.

---

# 9. Workflow Mỗi Task

```text
pull latest develop
→ verify exact branch exists
→ checkout exact branch
→ read Task and Acceptance Criteria
→ select skills
→ inspect current backend/frontend/contracts
→ verify MVP baseline affected by Task
→ write targeted tests first when appropriate
→ implement minimal safe scope
→ run targeted checks
→ run permission/security/fallback tests
→ run MVP regression checks
→ review diff/secrets/destructive risk
→ commit
→ push
→ PR into develop
→ Local Quality Gate
→ applicable GitHub Actions checks
→ merge
→ verify merge SHA on origin/develop
→ update sprint-11-progress.md
→ continue next Task
```

Preparation:

```bash
git fetch --all --prune
git switch develop
git pull origin develop
git status --short
git rev-parse HEAD
git rev-parse origin/develop
git branch -r --list "origin/<EXACT_TASK_BRANCH>"
git switch <EXACT_TASK_BRANCH>
```

Nếu branch thiếu, dừng và báo blocker.

---

# 10. Local Quality Gate and CI

Không tự đoán command. Đọc `package.json`.

Applicable checks:

```text
lint
typecheck
targeted unit tests
targeted integration/API tests
frontend component tests
Chrome/Playwright tests khi cần
backend build
frontend build
Prisma validate/generate khi liên quan
Supabase Storage/Realtime controlled verification
Neo4j controlled verification
permission/security/fallback review
MVP regression
```

Sau lint có `--fix`:

```bash
git status --short
```

Merge gate:

```text
Local Quality Gate = PASS
Applicable GitHub Actions checks = PASS
```

Không ghi `CI = N/A` theo mặc định trong Sprint 11. Chỉ N/A khi Task thực sự không có applicable workflow và có lý do rõ.

Không merge khi Local Gate hoặc CI FAIL.

---

# 11. Testing Rules

Mỗi Task phải test khi phù hợp:

```text
success path
validation failure
permission failure
loading/empty/error states
fallback/degraded behavior
idempotency/concurrency
cleanup
security/privacy
MVP regression
```

Required advanced-feature isolation:

```text
Feature enabled → MVP remains PASS
Feature disabled/unavailable → MVP remains PASS
```

## Graph tests

- Admin permission.
- Staff/Warehouse denial.
- Retry/rebuild confirmation.
- Retry/rebuild concurrency.
- Raw Cypher rejection.
- Query allowlist/parameters/bounds.
- No checkout authority.

## AI governance tests

- Invalid provider/model rejected.
- Secret not returned/logged.
- Prompt approval/version enforced.
- Unapproved prompt not active.
- Audit metadata correct.

## Storage tests

- Authorized/unauthorized upload.
- Allowed/rejected types.
- Size limit.
- Path traversal/filename safety.
- Failure cleanup.
- Storage unavailable fallback.

## Realtime tests

- Event update.
- Duplicate/out-of-order event.
- Disconnect/reconnect.
- Fallback polling.
- Listener cleanup.
- Backend checkout revalidation.

## Notification tests

- Low-stock sellable quantity.
- Near-expiry current threshold.
- Expired exclusion.
- Duplicate suppression.
- User-scoped read/unread.
- Scheduled job retry/idempotency.

## Narrative tests

- Deterministic input.
- No recalculation.
- Guardrail/Audit/disclaimer.
- Provider failure/fallback.
- PII minimization.
- Numeric report remains authoritative.

---

# 12. Security and Destructive-operation Rules

Không được:

- expose Supabase service-role key;
- expose Neo4j credentials;
- expose Google AI key;
- hard-code GitHub secrets;
- add generic raw Cypher endpoint;
- add graph write/editing UI;
- run global Neo4j delete on shared AuraDB;
- upload/delete files against production/shared bucket during tests;
- run notification scheduler against wrong environment;
- change Realtime publication without approved plan;
- log token/password/connection string;
- let user access another user's notifications;
- let frontend choose arbitrary provider/model;
- allow path traversal or dangerous file upload;
- let AI provide diagnosis/prescription/dosage;
- add production deployment action silently.

Forbidden shared-AuraDB command:

```cypher
MATCH (n) DETACH DELETE n
```

---

# 13. Git, Commit and PR

Dùng `git-github`.

Commit format:

```text
<type>(<scope>): <JIRA-KEY> <short English message>
```

Ví dụ first Task:

```text
feat(graph-sync): PAC-740 add graph sync status permission checks
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
- merge `develop → main`;
- tự tạo replacement branch;
- tự tạo Jira Bug Key;
- cập nhật Jira trực tiếp.

Sau merge:

```bash
git fetch origin
git log origin/develop --oneline -n 30
```

Chỉ ghi Task technically complete khi merge SHA có trên `origin/develop`.

---

# 14. Jira and Bug Workflow

Jira do Project Owner quản lý.

AI chỉ ghi:

```text
Recommended Jira status = DONE
```

Khi phát hiện defect ngoài Task scope:

```text
Bug Candidate:
Severity:
Affected Task/Story/Epic:
MVP regression: Yes/No
Actual:
Expected:
Evidence:
Suggested fix scope:
```

Project Owner tạo Jira Bug Key. Chỉ sửa qua exact Bug branch.

MVP regression phải được ưu tiên hơn advanced feature.

---

# 15. Báo cáo Sau Mỗi Task

```text
✅ Hoàn thành [PAC-TASK-xxx] — [Task name]

Skills used:
- ...

Đã làm:
Tests:
Permission/security:
Fallback/degraded behavior:
MVP regression:
PostgreSQL/Supabase:
Neo4j:
Storage/Realtime:
AI/Prompt/Audit:
Branch:
Commit:
PR:
Merge SHA:
Local Quality Gate: PASS
Applicable CI checks: PASS/N/A with reason
Recommended Jira status: DONE
Next Task:
```

Nếu blocked:

```text
📌 [PAC-TASK-xxx] chưa hoàn thành

Status:
Blocker:
MVP impact:
Evidence:
Required owner action:
Next safe step:
```

---

# 16. Story and Epic Reviews

## Story Reviews

Stories:

```text
US-151 → US-160
```

Flow:

```text
all direct Tasks merged
→ latest develop
→ Acceptance Criteria review
→ permission/security/fallback verification
→ MVP regression verification
→ PASS/FAIL
```

Không tạo Story PR.

## Core Epic Reviews

```text
PAC-EPIC-22 — Admin Graph Sync Status UI
PAC-EPIC-23 — Read-only Graph Explorer
PAC-EPIC-24 — AI Provider & Prompt Management UI
PAC-EPIC-25 — System Audit Log UI
PAC-EPIC-26 — Supabase Storage for Medicine Images
PAC-EPIC-27 — Supabase Realtime Inventory Updates
PAC-EPIC-28 — Notification Center
PAC-EPIC-29 — AI Business Report Narrative
```

Không tạo Epic PR.

Feature chỉ được approved for use/demo sau Story/Epic Review PASS.

---

# 17. Progress Updates

Cập nhật `sprint-11-progress.md` khi:

- Authorization Gate thay đổi.
- Task/Bug PR merge hoặc blocked.
- Story Review hoàn tất.
- Epic Review hoàn tất.
- Graph safety evidence thay đổi.
- Storage/Realtime evidence thay đổi.
- Notification/scheduler evidence thay đổi.
- AI Narrative evidence thay đổi.
- MVP regression hoặc feature isolation thay đổi.
- Kết thúc phiên.
- Sprint 11 Final Review hoàn tất.

Cập nhật `WORKING-CONTEXT.md` ở handoff hợp lý.

Không tạo documentation-only PR sau từng Task chỉ để ghi merge SHA nếu workflow cho phép đồng bộ trong Task tiếp theo/cuối phiên.

---

# 18. Stop Conditions

Dừng khi:

- Authorization Gate chưa PASS.
- Exact branch thiếu.
- MVP baseline chưa ghi.
- Project Leader chưa phê duyệt.
- Shared environment không an toàn.
- Graph retry/rebuild scope không an toàn.
- Storage bucket/credential policy không rõ.
- Realtime RLS/publication implications không rõ.
- Scheduled job có nguy cơ chạy sai environment.
- AI provider/prompt secret safety không rõ.
- Required Local Gate hoặc CI FAIL.
- GitHub không cho tạo/merge PR.
- Cần Jira Bug Key.
- Có Blocker/High MVP regression.
- Hết giới hạn phiên.
- Sprint 11 Final Review hoàn tất.

Cuối phiên:

1. Cập nhật progress.
2. Cập nhật WORKING-CONTEXT.
3. Ghi current/next Task.
4. Ghi tests, CI, PR và merge SHA.
5. Không merge `develop → main`.
6. Không thay đổi Ready for MVP Release thành No trừ khi có regression thật.

---

# 19. Story Details

## US-151 — Admin Graph Sync Status UI

```text
Jira Key: PAC-191
Parent: PAC-EPIC-22 - Admin Graph Sync Status UI
Component: Admin Graph Sync Status
Story Points: 3
Direct Tasks: PAC-TASK-526, PAC-TASK-527, PAC-TASK-530
Traceability branch: story/PAC-191-us-151-admin-graph-sync-status-ui
```

Acceptance Criteria:

- Admin thấy pending/failed jobs.
- Hiển thị freshness/degraded status.
- Đây là Should-have, không chặn MVP.
- Staff/Warehouse không quản lý graph sync.

Agent rules:

- Không tạo Story PR.
- Chỉ review trên latest `develop` sau khi mọi direct Task đã merge.
- Phải kiểm tra permission, security, fallback và MVP regression.
- Story chưa PASS không được bật cho use/demo chính thức.

## US-152 — Manual graph retry/rebuild UI

```text
Jira Key: PAC-192
Parent: PAC-EPIC-22 - Admin Graph Sync Status UI
Component: Admin Graph Sync Status
Story Points: 3
Direct Tasks: PAC-TASK-528, PAC-TASK-529
Traceability branch: story/PAC-192-us-152-manual-graph-retry-rebuild-ui
```

Acceptance Criteria:

- Admin retry failed job.
- Admin trigger rebuild nếu có quyền.
- Có confirmation trước action nguy hiểm.
- Không sửa trực tiếp source data trong Neo4j.

Agent rules:

- Không tạo Story PR.
- Chỉ review trên latest `develop` sau khi mọi direct Task đã merge.
- Phải kiểm tra permission, security, fallback và MVP regression.
- Story chưa PASS không được bật cho use/demo chính thức.

## US-153 — Read-only Graph Explorer

```text
Jira Key: PAC-193
Parent: PAC-EPIC-23 - Read-only Graph Explorer
Component: Graph Explorer
Story Points: 5
Direct Tasks: PAC-TASK-531, PAC-TASK-532, PAC-TASK-533, PAC-TASK-534, PAC-TASK-535
Traceability branch: story/PAC-193-us-153-read-only-graph-explorer
```

Acceptance Criteria:

- Xem Medicine, ActiveIngredient, CONTAINS, INTERACTS_WITH.
- Read-only.
- Không raw Cypher.
- Không dùng để quyết định checkout.

Agent rules:

- Không tạo Story PR.
- Chỉ review trên latest `develop` sau khi mọi direct Task đã merge.
- Phải kiểm tra permission, security, fallback và MVP regression.
- Story chưa PASS không được bật cho use/demo chính thức.

## US-154 — AI Provider Settings UI

```text
Jira Key: PAC-194
Parent: PAC-EPIC-24 - AI Provider & Prompt Management UI
Component: AI Provider Settings UI
Story Points: 3
Direct Tasks: PAC-TASK-536, PAC-TASK-537
Traceability branch: story/PAC-194-us-154-ai-provider-settings-ui
```

Acceptance Criteria:

- Admin xem provider config.
- Không expose secret/API key.
- Có test connection nếu làm.
- Should-have, không bắt buộc MVP.

Agent rules:

- Không tạo Story PR.
- Chỉ review trên latest `develop` sau khi mọi direct Task đã merge.
- Phải kiểm tra permission, security, fallback và MVP regression.
- Story chưa PASS không được bật cho use/demo chính thức.

## US-155 — Prompt Management UI

```text
Jira Key: PAC-195
Parent: PAC-EPIC-24 - AI Provider & Prompt Management UI
Component: Prompt Management UI
Story Points: 3
Direct Tasks: PAC-TASK-538, PAC-TASK-539, PAC-TASK-540
Traceability branch: story/PAC-195-us-155-prompt-management-ui
```

Acceptance Criteria:

- Admin xem prompt version.
- Có thể tạo version mới nếu scope cho phép.
- Có audit thay đổi prompt.
- Unapproved prompt không chạy chính thức.

Agent rules:

- Không tạo Story PR.
- Chỉ review trên latest `develop` sau khi mọi direct Task đã merge.
- Phải kiểm tra permission, security, fallback và MVP regression.
- Story chưa PASS không được bật cho use/demo chính thức.

## US-156 — System Audit Log UI

```text
Jira Key: PAC-196
Parent: PAC-EPIC-25 - System Audit Log UI
Component: System Audit Log UI
Story Points: 3
Direct Tasks: PAC-TASK-541, PAC-TASK-542
Traceability branch: story/PAC-196-us-156-system-audit-log-ui
```

Acceptance Criteria:

- Admin xem audit logs.
- Filter theo actor/action/entity/date.
- Không cho sửa audit log.
- Backend audit vẫn mandatory dù UI là Should-have.

Agent rules:

- Không tạo Story PR.
- Chỉ review trên latest `develop` sau khi mọi direct Task đã merge.
- Phải kiểm tra permission, security, fallback và MVP regression.
- Story chưa PASS không được bật cho use/demo chính thức.

## US-157 — Supabase Storage for medicine images

```text
Jira Key: PAC-197
Parent: PAC-EPIC-26 - Supabase Storage for Medicine Images
Component: Supabase Storage
Story Points: 3
Direct Tasks: PAC-TASK-543, PAC-TASK-544, PAC-TASK-545
Traceability branch: story/PAC-197-us-157-supabase-storage-for-medicine-images
```

Acceptance Criteria:

- Upload file hợp lệ.
- Validate size/type.
- Hiển thị ảnh trong Medicine/POS nếu có.
- Không ảnh hưởng MVP khi chưa có ảnh.

Agent rules:

- Không tạo Story PR.
- Chỉ review trên latest `develop` sau khi mọi direct Task đã merge.
- Phải kiểm tra permission, security, fallback và MVP regression.
- Story chưa PASS không được bật cho use/demo chính thức.

## US-158 — Supabase Realtime inventory updates

```text
Jira Key: PAC-198
Parent: PAC-EPIC-27 - Supabase Realtime Inventory Updates
Component: Supabase Realtime
Story Points: 3
Direct Tasks: PAC-TASK-546, PAC-TASK-547, PAC-TASK-548
Traceability branch: story/PAC-198-us-158-supabase-realtime-inventory-updates
```

Acceptance Criteria:

- UI nhận update tồn kho.
- Có stale warning nếu cần.
- Backend checkout vẫn validate chính thức.
- Realtime không thay thế transaction validation.

Agent rules:

- Không tạo Story PR.
- Chỉ review trên latest `develop` sau khi mọi direct Task đã merge.
- Phải kiểm tra permission, security, fallback và MVP regression.
- Story chưa PASS không được bật cho use/demo chính thức.

## US-159 — Notification Center

```text
Jira Key: PAC-199
Parent: PAC-EPIC-28 - Notification Center
Component: Notification
Story Points: 3
Direct Tasks: PAC-TASK-549, PAC-TASK-550, PAC-TASK-551, PAC-TASK-552, PAC-TASK-553
Traceability branch: story/PAC-199-us-159-notification-center
```

Acceptance Criteria:

- Hiển thị notification low-stock/near-expiry/system.
- Mark read/unread.
- Permission-aware.
- Không thay thế dashboard/report.

Agent rules:

- Không tạo Story PR.
- Chỉ review trên latest `develop` sau khi mọi direct Task đã merge.
- Phải kiểm tra permission, security, fallback và MVP regression.
- Story chưa PASS không được bật cho use/demo chính thức.

## US-160 — AI Business Report Narrative

```text
Jira Key: PAC-200
Parent: PAC-EPIC-29 - AI Business Report Narrative
Component: AI Business Narrative
Story Points: 3
Direct Tasks: PAC-TASK-554, PAC-TASK-555
Traceability branch: story/PAC-200-us-160-ai-business-report-narrative
```

Acceptance Criteria:

- AI chỉ giải thích số liệu đã tính deterministic.
- Không tự tính doanh thu.
- Có disclaimer.
- Có AI audit metadata.

Agent rules:

- Không tạo Story PR.
- Chỉ review trên latest `develop` sau khi mọi direct Task đã merge.
- Phải kiểm tra permission, security, fallback và MVP regression.
- Story chưa PASS không được bật cho use/demo chính thức.


---

# 20. Core Epic Branch Registry

| Core Epic | Jira Key | Name | Direct Tasks | Exact branch |
|---|---|---|---:|---|
| PAC-EPIC-22 | PAC-22 | Admin Graph Sync Status UI | 5 | `epic/PAC-22-epic-22-admin-graph-sync-status-ui` |
| PAC-EPIC-23 | PAC-23 | Read-only Graph Explorer | 5 | `epic/PAC-23-epic-23-read-only-graph-explorer` |
| PAC-EPIC-24 | PAC-24 | AI Provider & Prompt Management UI | 5 | `epic/PAC-24-epic-24-ai-provider-prompt-management-ui` |
| PAC-EPIC-25 | PAC-25 | System Audit Log UI | 2 | `epic/PAC-25-epic-25-system-audit-log-ui` |
| PAC-EPIC-26 | PAC-26 | Supabase Storage for Medicine Images | 3 | `epic/PAC-26-epic-26-supabase-storage-for-medicine-images` |
| PAC-EPIC-27 | PAC-27 | Supabase Realtime Inventory Updates | 3 | `epic/PAC-27-epic-27-supabase-realtime-inventory-updates` |
| PAC-EPIC-28 | PAC-28 | Notification Center | 5 | `epic/PAC-28-epic-28-notification-center` |
| PAC-EPIC-29 | PAC-29 | AI Business Report Narrative | 2 | `epic/PAC-29-epic-29-ai-business-report-narrative` |

# 21. Story Branch Registry

| Story | Jira Key | Story Points | Direct Tasks | Exact branch |
|---|---|---:|---|---|
| US-151 | PAC-191 | 3 | PAC-TASK-526, PAC-TASK-527, PAC-TASK-530 | `story/PAC-191-us-151-admin-graph-sync-status-ui` |
| US-152 | PAC-192 | 3 | PAC-TASK-528, PAC-TASK-529 | `story/PAC-192-us-152-manual-graph-retry-rebuild-ui` |
| US-153 | PAC-193 | 5 | PAC-TASK-531, PAC-TASK-532, PAC-TASK-533, PAC-TASK-534, PAC-TASK-535 | `story/PAC-193-us-153-read-only-graph-explorer` |
| US-154 | PAC-194 | 3 | PAC-TASK-536, PAC-TASK-537 | `story/PAC-194-us-154-ai-provider-settings-ui` |
| US-155 | PAC-195 | 3 | PAC-TASK-538, PAC-TASK-539, PAC-TASK-540 | `story/PAC-195-us-155-prompt-management-ui` |
| US-156 | PAC-196 | 3 | PAC-TASK-541, PAC-TASK-542 | `story/PAC-196-us-156-system-audit-log-ui` |
| US-157 | PAC-197 | 3 | PAC-TASK-543, PAC-TASK-544, PAC-TASK-545 | `story/PAC-197-us-157-supabase-storage-for-medicine-images` |
| US-158 | PAC-198 | 3 | PAC-TASK-546, PAC-TASK-547, PAC-TASK-548 | `story/PAC-198-us-158-supabase-realtime-inventory-updates` |
| US-159 | PAC-199 | 3 | PAC-TASK-549, PAC-TASK-550, PAC-TASK-551, PAC-TASK-552, PAC-TASK-553 | `story/PAC-199-us-159-notification-center` |
| US-160 | PAC-200 | 3 | PAC-TASK-554, PAC-TASK-555 | `story/PAC-200-us-160-ai-business-report-narrative` |

# 22. Exact Task Branch Registry

| Logical Task | Jira Key | Story | Epic | Component | Task | Exact branch |
|---|---|---|---|---|---|---|
| PAC-TASK-526 | PAC-736 | US-151 | PAC-EPIC-22 | Admin Graph Sync Status | Build Admin Graph Sync Status list UI | `feature/PAC-736-task-526-build-admin-graph-sync-status-list-ui` |
| PAC-TASK-527 | PAC-737 | US-151 | PAC-EPIC-22 | Admin Graph Sync Status | Build Graph Sync job detail UI | `feature/PAC-737-task-527-build-graph-sync-job-detail-ui` |
| PAC-TASK-528 | PAC-738 | US-152 | PAC-EPIC-22 | Admin Graph Sync Status | Build manual graph retry action for Admin | `feature/PAC-738-task-528-build-manual-graph-retry-action-for-admin` |
| PAC-TASK-529 | PAC-739 | US-152 | PAC-EPIC-22 | Admin Graph Sync Status | Build manual graph rebuild action for Admin | `feature/PAC-739-task-529-build-manual-graph-rebuild-action-for-admin` |
| PAC-TASK-530 | PAC-740 | US-151 | PAC-EPIC-22 | Admin Graph Sync Status | Add Graph Sync Status permission checks | `feature/PAC-740-task-530-add-graph-sync-status-permission-checks` |
| PAC-TASK-531 | PAC-741 | US-153 | PAC-EPIC-23 | Graph Explorer | Build read-only Graph Explorer UI | `feature/PAC-741-task-531-build-read-only-graph-explorer-ui` |
| PAC-TASK-532 | PAC-742 | US-153 | PAC-EPIC-23 | Graph Explorer | Build Graph Explorer node detail panel | `feature/PAC-742-task-532-build-graph-explorer-node-detail-panel` |
| PAC-TASK-533 | PAC-743 | US-153 | PAC-EPIC-23 | Graph Explorer | Build Graph Explorer relationship detail panel | `feature/PAC-743-task-533-build-graph-explorer-relationship-detail-panel` |
| PAC-TASK-534 | PAC-744 | US-153 | PAC-EPIC-23 | Graph Explorer | Add Graph Explorer permission checks | `feature/PAC-744-task-534-add-graph-explorer-permission-checks` |
| PAC-TASK-535 | PAC-745 | US-153 | PAC-EPIC-23 | Graph Explorer | Ensure Graph Explorer uses allowlisted templates only | `feature/PAC-745-task-535-ensure-graph-explorer-uses-allowlisted-templates-on` |
| PAC-TASK-536 | PAC-746 | US-154 | PAC-EPIC-24 | AI Provider Settings UI | Build AI Provider Settings UI | `feature/PAC-746-task-536-build-ai-provider-settings-ui` |
| PAC-TASK-537 | PAC-747 | US-154 | PAC-EPIC-24 | AI Provider Settings UI | Build AI model configuration UI | `feature/PAC-747-task-537-build-ai-model-configuration-ui` |
| PAC-TASK-538 | PAC-748 | US-155 | PAC-EPIC-24 | Prompt Management UI | Build Prompt Management list UI | `feature/PAC-748-task-538-build-prompt-management-list-ui` |
| PAC-TASK-539 | PAC-749 | US-155 | PAC-EPIC-24 | Prompt Management UI | Build Prompt Management version detail UI | `feature/PAC-749-task-539-build-prompt-management-version-detail-ui` |
| PAC-TASK-540 | PAC-750 | US-155 | PAC-EPIC-24 | Prompt Management UI | Add prompt approval status display | `feature/PAC-750-task-540-add-prompt-approval-status-display` |
| PAC-TASK-541 | PAC-751 | US-156 | PAC-EPIC-25 | System Audit Log UI | Build System Audit Log UI | `feature/PAC-751-task-541-build-system-audit-log-ui` |
| PAC-TASK-542 | PAC-752 | US-156 | PAC-EPIC-25 | System Audit Log UI | Add System Audit Log filters | `feature/PAC-752-task-542-add-system-audit-log-filters` |
| PAC-TASK-543 | PAC-753 | US-157 | PAC-EPIC-26 | Supabase Storage | Implement Supabase Storage upload flow for medicine images | `feature/PAC-753-task-543-implement-supabase-storage-upload-flow-for-medicine` |
| PAC-TASK-544 | PAC-754 | US-157 | PAC-EPIC-26 | Supabase Storage | Build medicine image upload UI | `feature/PAC-754-task-544-build-medicine-image-upload-ui` |
| PAC-TASK-545 | PAC-755 | US-157 | PAC-EPIC-26 | Supabase Storage | Add Supabase Storage file validation | `feature/PAC-755-task-545-add-supabase-storage-file-validation` |
| PAC-TASK-546 | PAC-756 | US-158 | PAC-EPIC-27 | Supabase Realtime | Implement Supabase Realtime inventory update listener | `feature/PAC-756-task-546-implement-supabase-realtime-inventory-update-listen` |
| PAC-TASK-547 | PAC-757 | US-158 | PAC-EPIC-27 | Supabase Realtime | Build realtime POS stock refresh behavior | `feature/PAC-757-task-547-build-realtime-pos-stock-refresh-behavior` |
| PAC-TASK-548 | PAC-758 | US-158 | PAC-EPIC-27 | Supabase Realtime | Add realtime fallback polling behavior | `feature/PAC-758-task-548-add-realtime-fallback-polling-behavior` |
| PAC-TASK-549 | PAC-759 | US-159 | PAC-EPIC-28 | Notification | Build Notification Center UI | `feature/PAC-759-task-549-build-notification-center-ui` |
| PAC-TASK-550 | PAC-760 | US-159 | PAC-EPIC-28 | Notification | Implement low-stock notification generation | `feature/PAC-760-task-550-implement-low-stock-notification-generation` |
| PAC-TASK-551 | PAC-761 | US-159 | PAC-EPIC-28 | Notification | Implement near-expiry notification generation | `feature/PAC-761-task-551-implement-near-expiry-notification-generation` |
| PAC-TASK-552 | PAC-762 | US-159 | PAC-EPIC-28 | Notification | Build read/unread notification state | `feature/PAC-762-task-552-build-read-unread-notification-state` |
| PAC-TASK-553 | PAC-763 | US-159 | PAC-EPIC-28 | Scheduled Job | Implement scheduled near-expiry scan job | `feature/PAC-763-task-553-implement-scheduled-near-expiry-scan-job` |
| PAC-TASK-554 | PAC-764 | US-160 | PAC-EPIC-29 | AI Business Narrative | Implement AI Business Report Narrative API | `feature/PAC-764-task-554-implement-ai-business-report-narrative-api` |
| PAC-TASK-555 | PAC-765 | US-160 | PAC-EPIC-29 | AI Business Narrative | Build AI Business Report Narrative UI | `feature/PAC-765-task-555-build-ai-business-report-narrative-ui` |

---

# 23. Definition of Done

```text
30/30 Tasks verified
10/10 Story Reviews PASS
8/8 Core Epic Reviews PASS
48/48 canonical branches reconciled
All applicable PRs merged

Graph Sync Status permission-safe
Retry/rebuild safe, bounded and audited
Graph Explorer read-only and allowlisted
Raw Cypher rejected
AI provider/model secrets protected
Prompt approval/version governance preserved
System Audit Log read-only and privacy-safe
Medicine image upload validated
Storage failure cleanup verified
Realtime reconnect/fallback verified
Checkout remains backend-authoritative
Notifications deterministic and deduplicated
Scheduled scan bounded and observable
AI Narrative uses deterministic report data
AI Guardrail/Audit/disclaimer PASS

Feature enabled → MVP PASS
Feature disabled/unavailable → MVP PASS

Local Quality Gate PASS
Applicable GitHub Actions PASS
Blocking findings = 0
High findings = 0

Sprint 11 Final Review = PASS
Advanced features approved for use/demo = Yes
MVP release readiness remains = Yes
```

---

# 24. Start Instruction

Thực hiện:

1. Đọc toàn bộ tài liệu bắt buộc.
2. Xác minh Sprint 10 Final Review PASS.
3. Xác minh Ready for MVP Release = Yes.
4. Xác minh MVP release baseline/tag.
5. Xác minh Project Leader approval.
6. Xác minh Sprint 11 Audit PASS 20/20.
7. Xác minh latest `develop`.
8. Xác minh exact branch của first technical Task.
9. Chọn skills.
10. Bắt đầu `PAC-TASK-530 / PAC-740`.
11. Code, test, security review, MVP regression, commit, push và PR vào `develop`.
12. Merge chỉ khi Local Quality Gate và applicable CI đều PASS.
13. Verify merge SHA.
14. Cập nhật progress.
15. Tiếp tục theo technical order.
16. Dừng trước `develop → main`.

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
