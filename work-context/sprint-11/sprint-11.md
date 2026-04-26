# Sprint 11 — Should-have / Advanced Features

> **Status:** Prepared only  
> **Scope:** Should-have / Advanced  
> **MVP Gate:** No  
> **Implementation authorization:** Not granted

---

## Canonical Sources

1. `Jira/branch-on-jira.md` — exact Jira Key và exact branch.
2. `Jira/jira-mapping.md`.
3. `Jira/2_Epic.md`.
4. `Jira/3_Stories.md`.
5. `Jira/4D_Task_List_Testing_Advanced_Future_436_580.md`.
6. `Jira/4D_Task_Description_Testing_Advanced_Future_436_580.md`.
7. `Jira/5_Sprint.md`.
8. Sprint 10 Final Review Report.
9. Current repository, Prisma schema, Supabase, Neo4j và GitHub state.

`Jira/branch-on-jira.md` là nguồn duy nhất cho branch name. Không được tự rút gọn hoặc tạo branch thay thế.

---

# 1. Sprint Overview

| Mục | Nội dung |
|---|---|
| Sprint | Sprint 11 |
| Tên | Should-have / Advanced Features |
| Scope | Should-have / Advanced |
| MVP Gate | Không |
| Tasks | PAC-TASK-526 → PAC-TASK-555 |
| Task count | 30 |
| Task Jira Keys | PAC-736 → PAC-765 |
| Stories | US-151 → US-160 |
| Story count | 10 |
| Story Points | 32 |
| Core Epics | PAC-EPIC-22 → PAC-EPIC-29 |
| Core Epic count | 8 |
| Canonical branches | 48 = 30 Task + 10 Story + 8 Epic |
| Initial status | Prepared |
| Ready to implement Sprint 11 | No |
| MVP Release dependency | Sprint 10 Final Review PASS |
| Additional approval | Project Leader approval required |

Sprint 11 không phải điều kiện hoàn thành MVP. Sprint này chỉ được triển khai sau khi MVP đã đạt release readiness và không còn Blocking/High defects.

---

# 2. Sprint Goal

Mục tiêu Sprint 11 là bổ sung các tính năng nâng cao có giá trị vận hành và trình diễn:

- Admin giám sát, retry và rebuild Graph Sync an toàn.
- Graph Explorer read-only.
- UI quản lý AI provider/model và prompt metadata.
- UI xem System Audit Log.
- Upload ảnh thuốc bằng Supabase Storage.
- Realtime inventory UX với fallback.
- Notification Center cho low-stock và near-expiry.
- AI narrative giải thích báo cáo deterministic.

Các tính năng này phải giữ nguyên toàn bộ business rule và safety baseline của MVP.

---

# 3. Implementation Authorization Gate

Chỉ triển khai Sprint 11 khi:

```text
Sprint 10 Final Review = PASS
Ready for MVP Release = Yes
Blocking MVP defects = 0
High MVP defects = 0

MVP release baseline/tag = Recorded
Project Leader approval = Yes
Team capacity = Available
Sprint 11 Audit = PASS
Ready to implement Sprint 11 = Yes
```

Nếu một điều kiện chưa đạt:

```text
Sprint 11 status = Prepared
Ready to implement Sprint 11 = No
Không bắt đầu coding
```

Sprint 11 không được trì hoãn release, làm mất tính ổn định của MVP hoặc trở thành lý do để chưa phát hành MVP.

---

# 4. Mandatory Dependencies

## 4.1 Sprint 10

Sprint 10 phải hoàn thành:

- Curated demo data.
- Demo reset và smoke.
- High-risk regression tests.
- GitHub Actions.
- Setup và documentation.
- Sprint 10 Final Review PASS.
- Ready for MVP Release = Yes.

## 4.2 Backend capabilities

Sprint 11 UI không được thay thế backend mandatory capability. Các backend foundation phải đã tồn tại:

- Graph Sync jobs, retry/failure metadata và freshness.
- Safe graph rebuild service.
- Allowlisted graph query templates.
- AI provider/model configuration.
- Prompt template versioning và approval metadata.
- System audit logging.
- Medicine và inventory APIs.
- Deterministic reports.
- AI Guardrail và AI Audit.

Nếu backend contract chưa tồn tại, ghi blocker hoặc tạo Bug/Task đúng Jira workflow. Không tự mở rộng scope âm thầm.

---

# 5. Core Invariants

## 5.1 Should-have isolation

- Sprint 11 không phải MVP gate.
- Feature chưa hoàn tất không được làm hỏng MVP.
- Mỗi advanced feature phải có graceful absence/fallback.
- Advanced UI không được thay backend validation.
- Không sửa core business rules để phục vụ UI.

## 5.2 Graph safety

- PostgreSQL là source of truth.
- Neo4j chỉ là read projection.
- Graph Explorer read-only.
- Không raw Cypher.
- Chỉ dùng allowlisted query types và parameterized queries.
- Manual retry/rebuild chỉ dành cho Admin.
- Rebuild phải có confirmation, audit và environment safety.
- Không dùng graph để quyết định checkout.

## 5.3 AI governance

- Không expose API key hoặc secret.
- Model chỉ chọn từ allowlist.
- Prompt chưa approved không được dùng chính thức.
- AI Business Narrative chỉ giải thích số liệu deterministic.
- AI không tự tính doanh thu, ranking hoặc tồn kho.
- Guardrail, disclaimer và AI Audit vẫn bắt buộc.

## 5.4 Storage safety

- Supabase service-role key không được đưa ra frontend.
- File type và size phải được validate.
- Không tin MIME type từ client một cách mù quáng.
- Không cho upload file thực thi hoặc file nguy hiểm.
- Medicine không có ảnh vẫn phải hoạt động bình thường.

## 5.5 Realtime safety

- Realtime chỉ cải thiện UX.
- Checkout backend vẫn phải validate sellable stock cuối cùng.
- Realtime failure không làm POS unusable.
- Phải có fallback polling hoặc manual refresh.
- Không tự động checkout hoặc thay đổi order từ realtime event.

## 5.6 Notification safety

- Low-stock dựa trên sellable quantity.
- Expired batch không được tính sellable.
- Near-expiry dùng current System Setting.
- Expired và near-expiry không bị nhầm.
- Tránh duplicate notification quá mức.
- Scheduled job không thay thế dashboard/report.

---

# 6. Scope

## In scope

- Admin Graph Sync Status list/detail.
- Admin manual retry/rebuild.
- Graph Sync permission guards.
- Read-only Graph Explorer.
- Node và relationship details.
- Allowlisted graph query enforcement.
- AI provider/model settings UI.
- Prompt list/version/approval status UI.
- System Audit Log UI và filters.
- Medicine image upload bằng Supabase Storage.
- Storage validation.
- Supabase Realtime inventory listener.
- POS stock refresh và fallback polling.
- Notification Center.
- Low-stock và near-expiry notification generation.
- Read/unread state.
- Scheduled near-expiry scan.
- AI Business Report Narrative API/UI.

## Out of scope

- Không thay đổi MVP acceptance criteria.
- Không thay PostgreSQL bằng Neo4j.
- Không raw Cypher console.
- Không graph editing.
- Không tự sửa source data trong Neo4j.
- Không expose AI/Neo4j/Supabase secrets.
- Không dùng realtime làm checkout authority.
- Không thêm diagnosis, prescribing hoặc dosage advice.
- Không để AI tính report totals.
- Không triển khai Sprint 12 Future scope.
- Không làm full e-commerce, customer portal, multi-store hoặc multi-warehouse.
- Không xem Sprint 11 là điều kiện Ready for MVP Release.

---

# 7. Technical Execution Order

Thứ tự dưới đây ưu tiên permission, safety và backend boundary trước các UI/action có rủi ro.

## Phase 1 — Graph Sync Observability and Permission Safety

| Task | Jira Key | Summary | Exact branch |
|---|---|---|---|
| PAC-TASK-530 | PAC-740 | Add Graph Sync Status permission checks | `feature/PAC-740-task-530-add-graph-sync-status-permission-checks` |
| PAC-TASK-526 | PAC-736 | Build Admin Graph Sync Status list UI | `feature/PAC-736-task-526-build-admin-graph-sync-status-list-ui` |
| PAC-TASK-527 | PAC-737 | Build Graph Sync job detail UI | `feature/PAC-737-task-527-build-graph-sync-job-detail-ui` |

## Phase 2 — Controlled Graph Retry and Rebuild

| Task | Jira Key | Summary | Exact branch |
|---|---|---|---|
| PAC-TASK-528 | PAC-738 | Build manual graph retry action for Admin | `feature/PAC-738-task-528-build-manual-graph-retry-action-for-admin` |
| PAC-TASK-529 | PAC-739 | Build manual graph rebuild action for Admin | `feature/PAC-739-task-529-build-manual-graph-rebuild-action-for-admin` |

## Phase 3 — Read-only Graph Explorer

| Task | Jira Key | Summary | Exact branch |
|---|---|---|---|
| PAC-TASK-535 | PAC-745 | Ensure Graph Explorer uses allowlisted templates only | `feature/PAC-745-task-535-ensure-graph-explorer-uses-allowlisted-templates-on` |
| PAC-TASK-534 | PAC-744 | Add Graph Explorer permission checks | `feature/PAC-744-task-534-add-graph-explorer-permission-checks` |
| PAC-TASK-531 | PAC-741 | Build read-only Graph Explorer UI | `feature/PAC-741-task-531-build-read-only-graph-explorer-ui` |
| PAC-TASK-532 | PAC-742 | Build Graph Explorer node detail panel | `feature/PAC-742-task-532-build-graph-explorer-node-detail-panel` |
| PAC-TASK-533 | PAC-743 | Build Graph Explorer relationship detail panel | `feature/PAC-743-task-533-build-graph-explorer-relationship-detail-panel` |

## Phase 4 — AI Provider and Prompt Governance UI

| Task | Jira Key | Summary | Exact branch |
|---|---|---|---|
| PAC-TASK-536 | PAC-746 | Build AI Provider Settings UI | `feature/PAC-746-task-536-build-ai-provider-settings-ui` |
| PAC-TASK-537 | PAC-747 | Build AI model configuration UI | `feature/PAC-747-task-537-build-ai-model-configuration-ui` |
| PAC-TASK-538 | PAC-748 | Build Prompt Management list UI | `feature/PAC-748-task-538-build-prompt-management-list-ui` |
| PAC-TASK-539 | PAC-749 | Build Prompt Management version detail UI | `feature/PAC-749-task-539-build-prompt-management-version-detail-ui` |
| PAC-TASK-540 | PAC-750 | Add prompt approval status display | `feature/PAC-750-task-540-add-prompt-approval-status-display` |

## Phase 5 — System Audit Log UI

| Task | Jira Key | Summary | Exact branch |
|---|---|---|---|
| PAC-TASK-541 | PAC-751 | Build System Audit Log UI | `feature/PAC-751-task-541-build-system-audit-log-ui` |
| PAC-TASK-542 | PAC-752 | Add System Audit Log filters | `feature/PAC-752-task-542-add-system-audit-log-filters` |

## Phase 6 — Supabase Storage for Medicine Images

| Task | Jira Key | Summary | Exact branch |
|---|---|---|---|
| PAC-TASK-545 | PAC-755 | Add Supabase Storage file validation | `feature/PAC-755-task-545-add-supabase-storage-file-validation` |
| PAC-TASK-543 | PAC-753 | Implement Supabase Storage upload flow for medicine images | `feature/PAC-753-task-543-implement-supabase-storage-upload-flow-for-medicine` |
| PAC-TASK-544 | PAC-754 | Build medicine image upload UI | `feature/PAC-754-task-544-build-medicine-image-upload-ui` |

## Phase 7 — Supabase Realtime Inventory UX

| Task | Jira Key | Summary | Exact branch |
|---|---|---|---|
| PAC-TASK-546 | PAC-756 | Implement Supabase Realtime inventory update listener | `feature/PAC-756-task-546-implement-supabase-realtime-inventory-update-listen` |
| PAC-TASK-548 | PAC-758 | Add realtime fallback polling behavior | `feature/PAC-758-task-548-add-realtime-fallback-polling-behavior` |
| PAC-TASK-547 | PAC-757 | Build realtime POS stock refresh behavior | `feature/PAC-757-task-547-build-realtime-pos-stock-refresh-behavior` |

## Phase 8 — Notification Center and Scheduled Near-expiry Scan

| Task | Jira Key | Summary | Exact branch |
|---|---|---|---|
| PAC-TASK-550 | PAC-760 | Implement low-stock notification generation | `feature/PAC-760-task-550-implement-low-stock-notification-generation` |
| PAC-TASK-551 | PAC-761 | Implement near-expiry notification generation | `feature/PAC-761-task-551-implement-near-expiry-notification-generation` |
| PAC-TASK-553 | PAC-763 | Implement scheduled near-expiry scan job | `feature/PAC-763-task-553-implement-scheduled-near-expiry-scan-job` |
| PAC-TASK-549 | PAC-759 | Build Notification Center UI | `feature/PAC-759-task-549-build-notification-center-ui` |
| PAC-TASK-552 | PAC-762 | Build read/unread notification state | `feature/PAC-762-task-552-build-read-unread-notification-state` |

## Phase 9 — AI Business Report Narrative

| Task | Jira Key | Summary | Exact branch |
|---|---|---|---|
| PAC-TASK-554 | PAC-764 | Implement AI Business Report Narrative API | `feature/PAC-764-task-554-implement-ai-business-report-narrative-api` |
| PAC-TASK-555 | PAC-765 | Build AI Business Report Narrative UI | `feature/PAC-765-task-555-build-ai-business-report-narrative-ui` |

First logical Task:

```text
PAC-TASK-526
PAC-736
feature/PAC-736-task-526-build-admin-graph-sync-status-list-ui
```

Recommended first technical Task:

```text
PAC-TASK-530
PAC-740
feature/PAC-740-task-530-add-graph-sync-status-permission-checks
```

Technical order không thay đổi Logical Task, Jira Key hoặc exact branch.

---

# 8. Phase Acceptance Gates

## Phase 1 — Graph Sync observability

- Admin-only access.
- Staff/Warehouse bị 403.
- Pending/success/failed status đúng.
- Error summary không chứa secret.
- Freshness/degraded state hiển thị đúng.

## Phase 2 — Retry/rebuild

- Chỉ Admin.
- Confirmation bắt buộc.
- Action idempotent hoặc có lock phù hợp.
- Không chạy trong environment không phù hợp.
- Có audit và result summary.
- Không sửa PostgreSQL source data.

## Phase 3 — Graph Explorer

- Read-only.
- Không raw Cypher.
- Allowlisted query types.
- Parameterized queries.
- Depth/result bounded.
- Không quyết định checkout.

## Phase 4 — AI governance UI

- Không expose secret.
- Provider/model allowlist.
- Prompt version rõ.
- Approval status rõ.
- Unapproved prompt không active.
- Thay đổi config có audit nếu backend hỗ trợ.

## Phase 5 — System Audit Log

- Admin-only.
- Read-only.
- Pagination.
- Filters validate.
- Không lộ PII/secret.
- Không cho sửa/xóa audit log.

## Phase 6 — Storage

- Permission check.
- File size/type validation.
- Safe storage path.
- No service-role key on frontend.
- Medicine without image still works.
- Error cleanup không để orphan file khi khả thi.

## Phase 7 — Realtime

- Realtime event cập nhật UI.
- Backend validation vẫn authoritative.
- Reconnect/fallback hoạt động.
- Không event storm hoặc polling quá mức.
- Draft order không tự thay đổi ngoài kiểm soát.

## Phase 8 — Notifications

- Permission-aware.
- Low-stock đúng sellable quantity.
- Near-expiry đúng threshold.
- Duplicate suppression.
- Read/unread state per user.
- Scheduled job bounded và observable.

## Phase 9 — AI narrative

- Input là report data đã tính deterministic.
- AI không tự tính số liệu.
- PII minimization.
- Guardrail, audit và disclaimer.
- Provider failure có safe fallback/error.
- Narrative không thay bảng số liệu chính.

---

# 9. Story Plan

## US-151 — Admin Graph Sync Status UI

- **Story Points:** 3
- **Parent:** PAC-EPIC-22 - Admin Graph Sync Status UI
- **Component:** Admin Graph Sync Status
- **Direct Tasks:** PAC-TASK-526, PAC-TASK-527, PAC-TASK-530

### Acceptance Criteria

- Admin thấy pending/failed jobs.
- Hiển thị freshness/degraded status.
- Đây là Should-have, không chặn MVP.
- Staff/Warehouse không quản lý graph sync.

### Sprint 11 Review Notes

- Chỉ được xem là hoàn thành khi mọi direct Task đã merge vào `develop`.
- Không tạo Story PR.
- Phải giữ nguyên trạng thái Should-have, không biến thành MVP dependency.

## US-152 — Manual graph retry/rebuild UI

- **Story Points:** 3
- **Parent:** PAC-EPIC-22 - Admin Graph Sync Status UI
- **Component:** Admin Graph Sync Status
- **Direct Tasks:** PAC-TASK-528, PAC-TASK-529

### Acceptance Criteria

- Admin retry failed job.
- Admin trigger rebuild nếu có quyền.
- Có confirmation trước action nguy hiểm.
- Không sửa trực tiếp source data trong Neo4j.

### Sprint 11 Review Notes

- Chỉ được xem là hoàn thành khi mọi direct Task đã merge vào `develop`.
- Không tạo Story PR.
- Phải giữ nguyên trạng thái Should-have, không biến thành MVP dependency.

## US-153 — Read-only Graph Explorer

- **Story Points:** 5
- **Parent:** PAC-EPIC-23 - Read-only Graph Explorer
- **Component:** Graph Explorer
- **Direct Tasks:** PAC-TASK-531, PAC-TASK-532, PAC-TASK-533, PAC-TASK-534, PAC-TASK-535

### Acceptance Criteria

- Xem Medicine, ActiveIngredient, CONTAINS, INTERACTS_WITH.
- Read-only.
- Không raw Cypher.
- Không dùng để quyết định checkout.

### Sprint 11 Review Notes

- Chỉ được xem là hoàn thành khi mọi direct Task đã merge vào `develop`.
- Không tạo Story PR.
- Phải giữ nguyên trạng thái Should-have, không biến thành MVP dependency.

## US-154 — AI Provider Settings UI

- **Story Points:** 3
- **Parent:** PAC-EPIC-24 - AI Provider & Prompt Management UI
- **Component:** AI Provider Settings UI
- **Direct Tasks:** PAC-TASK-536, PAC-TASK-537

### Acceptance Criteria

- Admin xem provider config.
- Không expose secret/API key.
- Có test connection nếu làm.
- Should-have, không bắt buộc MVP.

### Sprint 11 Review Notes

- Chỉ được xem là hoàn thành khi mọi direct Task đã merge vào `develop`.
- Không tạo Story PR.
- Phải giữ nguyên trạng thái Should-have, không biến thành MVP dependency.

## US-155 — Prompt Management UI

- **Story Points:** 3
- **Parent:** PAC-EPIC-24 - AI Provider & Prompt Management UI
- **Component:** Prompt Management UI
- **Direct Tasks:** PAC-TASK-538, PAC-TASK-539, PAC-TASK-540

### Acceptance Criteria

- Admin xem prompt version.
- Có thể tạo version mới nếu scope cho phép.
- Có audit thay đổi prompt.
- Unapproved prompt không chạy chính thức.

### Sprint 11 Review Notes

- Chỉ được xem là hoàn thành khi mọi direct Task đã merge vào `develop`.
- Không tạo Story PR.
- Phải giữ nguyên trạng thái Should-have, không biến thành MVP dependency.

## US-156 — System Audit Log UI

- **Story Points:** 3
- **Parent:** PAC-EPIC-25 - System Audit Log UI
- **Component:** System Audit Log UI
- **Direct Tasks:** PAC-TASK-541, PAC-TASK-542

### Acceptance Criteria

- Admin xem audit logs.
- Filter theo actor/action/entity/date.
- Không cho sửa audit log.
- Backend audit vẫn mandatory dù UI là Should-have.

### Sprint 11 Review Notes

- Chỉ được xem là hoàn thành khi mọi direct Task đã merge vào `develop`.
- Không tạo Story PR.
- Phải giữ nguyên trạng thái Should-have, không biến thành MVP dependency.

## US-157 — Supabase Storage for medicine images

- **Story Points:** 3
- **Parent:** PAC-EPIC-26 - Supabase Storage for Medicine Images
- **Component:** Supabase Storage
- **Direct Tasks:** PAC-TASK-543, PAC-TASK-544, PAC-TASK-545

### Acceptance Criteria

- Upload file hợp lệ.
- Validate size/type.
- Hiển thị ảnh trong Medicine/POS nếu có.
- Không ảnh hưởng MVP khi chưa có ảnh.

### Sprint 11 Review Notes

- Chỉ được xem là hoàn thành khi mọi direct Task đã merge vào `develop`.
- Không tạo Story PR.
- Phải giữ nguyên trạng thái Should-have, không biến thành MVP dependency.

## US-158 — Supabase Realtime inventory updates

- **Story Points:** 3
- **Parent:** PAC-EPIC-27 - Supabase Realtime Inventory Updates
- **Component:** Supabase Realtime
- **Direct Tasks:** PAC-TASK-546, PAC-TASK-547, PAC-TASK-548

### Acceptance Criteria

- UI nhận update tồn kho.
- Có stale warning nếu cần.
- Backend checkout vẫn validate chính thức.
- Realtime không thay thế transaction validation.

### Sprint 11 Review Notes

- Chỉ được xem là hoàn thành khi mọi direct Task đã merge vào `develop`.
- Không tạo Story PR.
- Phải giữ nguyên trạng thái Should-have, không biến thành MVP dependency.

## US-159 — Notification Center

- **Story Points:** 3
- **Parent:** PAC-EPIC-28 - Notification Center
- **Component:** Notification
- **Direct Tasks:** PAC-TASK-549, PAC-TASK-550, PAC-TASK-551, PAC-TASK-552, PAC-TASK-553

### Acceptance Criteria

- Hiển thị notification low-stock/near-expiry/system.
- Mark read/unread.
- Permission-aware.
- Không thay thế dashboard/report.

### Sprint 11 Review Notes

- Chỉ được xem là hoàn thành khi mọi direct Task đã merge vào `develop`.
- Không tạo Story PR.
- Phải giữ nguyên trạng thái Should-have, không biến thành MVP dependency.

## US-160 — AI Business Report Narrative

- **Story Points:** 3
- **Parent:** PAC-EPIC-29 - AI Business Report Narrative
- **Component:** AI Business Narrative
- **Direct Tasks:** PAC-TASK-554, PAC-TASK-555

### Acceptance Criteria

- AI chỉ giải thích số liệu đã tính deterministic.
- Không tự tính doanh thu.
- Có disclaimer.
- Có AI audit metadata.

### Sprint 11 Review Notes

- Chỉ được xem là hoàn thành khi mọi direct Task đã merge vào `develop`.
- Không tạo Story PR.
- Phải giữ nguyên trạng thái Should-have, không biến thành MVP dependency.


---

# 10. Story and Epic Review Policy

## Story Review

Mỗi Story chỉ PASS khi:

- Mọi direct Task đã merge vào `develop`.
- Acceptance Criteria được kiểm chứng trên latest `develop`.
- Permission, safety và fallback tests PASS.
- Không có Blocker/High finding.
- Không tạo Story PR.

## Epic Review

Thực hiện 8 Core Epic Reviews:

1. PAC-EPIC-22 — Admin Graph Sync Status UI.
2. PAC-EPIC-23 — Read-only Graph Explorer.
3. PAC-EPIC-24 — AI Provider & Prompt Management UI.
4. PAC-EPIC-25 — System Audit Log UI.
5. PAC-EPIC-26 — Supabase Storage for Medicine Images.
6. PAC-EPIC-27 — Supabase Realtime Inventory Updates.
7. PAC-EPIC-28 — Notification Center.
8. PAC-EPIC-29 — AI Business Report Narrative.

Không tạo Epic PR.

---

# 11. Testing Strategy

Mỗi Task phải có targeted tests phù hợp.

## Required test categories

- Permission/authorization tests.
- Loading, empty, error và degraded UI states.
- API contract tests.
- Security validation.
- Fallback behavior.
- Idempotency/concurrency cho retry/rebuild/jobs.
- File validation và upload failure cleanup.
- Realtime disconnect/reconnect/fallback.
- Notification duplicate suppression.
- AI guardrail/audit/disclaimer.
- Regression tests bảo vệ MVP core.

## Browser target

- Chrome/Chromium desktop là target chính.
- Basic responsive checks.
- Full cross-browser không phải gate.

## Regression rule

Mọi advanced feature phải chứng minh:

```text
MVP behavior vẫn hoạt động khi feature bật
MVP behavior vẫn hoạt động khi feature tắt hoặc lỗi
```

---

# 12. Quality Gate

Sprint 11 bắt đầu sau Sprint 10 nên GitHub Actions đã được kỳ vọng hoạt động.

Mỗi Task/Bug PR cần:

- Exact branch đúng.
- PR target `develop`.
- Local Quality Gate PASS.
- GitHub Actions = N/A — full CI reserved for main/release by approved project policy.
- Targeted tests PASS.
- Build PASS.
- Security/diff review PASS.
- No secret.
- No destructive shared-environment action.
- No regression của MVP.

Không merge nếu CI hoặc Local Quality Gate FAIL.

---

# 13. Git and Jira Workflow

```text
Task/Bug branch
→ PR vào develop
→ Local Quality Gate
→ GitHub Actions
→ merge
→ verify merge SHA trên origin/develop
```

Không:

- push trực tiếp `develop`;
- push trực tiếp `main`;
- tạo Story PR;
- tạo Epic PR;
- merge `develop → main`;
- tự tạo Jira Bug Key;
- tự đổi Jira status.

Jira do Project Owner quản lý thủ công.

---

# 14. Release and Demo Policy

Sprint 11 không được làm chậm MVP release.

Khuyến nghị:

- Ghi lại MVP release tag/baseline trước khi bắt đầu Sprint 11.
- Feature nâng cao nên có permission hoặc feature flag khi phù hợp.
- Chỉ đưa feature vào demo nếu Story Review PASS.
- Feature chưa PASS phải được ẩn hoặc tắt.
- Không trình diễn manual graph rebuild trên dữ liệu shared nếu chưa có safe environment.
- Không coi screenshots là bằng chứng thay cho running product.

Nếu Sprint 11 dừng giữa chừng:

```text
MVP release readiness vẫn giữ nguyên
Incomplete advanced features không được expose
Ready for MVP Release không bị đổi thành No
```

trừ khi Sprint 11 gây regression vào core MVP.

---

# 15. Exact Branch Registry

## 15.1 Core Epic branches

| Epic | Jira Key | Name | Task count | Exact branch |
|---|---|---|---:|---|
| PAC-EPIC-22 | PAC-22 | Admin Graph Sync Status UI | 5 | `epic/PAC-22-epic-22-admin-graph-sync-status-ui` |
| PAC-EPIC-23 | PAC-23 | Read-only Graph Explorer | 5 | `epic/PAC-23-epic-23-read-only-graph-explorer` |
| PAC-EPIC-24 | PAC-24 | AI Provider & Prompt Management UI | 5 | `epic/PAC-24-epic-24-ai-provider-prompt-management-ui` |
| PAC-EPIC-25 | PAC-25 | System Audit Log UI | 2 | `epic/PAC-25-epic-25-system-audit-log-ui` |
| PAC-EPIC-26 | PAC-26 | Supabase Storage for Medicine Images | 3 | `epic/PAC-26-epic-26-supabase-storage-for-medicine-images` |
| PAC-EPIC-27 | PAC-27 | Supabase Realtime Inventory Updates | 3 | `epic/PAC-27-epic-27-supabase-realtime-inventory-updates` |
| PAC-EPIC-28 | PAC-28 | Notification Center | 5 | `epic/PAC-28-epic-28-notification-center` |
| PAC-EPIC-29 | PAC-29 | AI Business Report Narrative | 2 | `epic/PAC-29-epic-29-ai-business-report-narrative` |

## 15.2 Story branches

| Story | Jira Key | Summary | Points | Direct Tasks | Exact branch |
|---|---|---|---:|---:|---|
| US-151 | PAC-191 | Admin Graph Sync Status UI | 3 | 3 | `story/PAC-191-us-151-admin-graph-sync-status-ui` |
| US-152 | PAC-192 | Manual graph retry/rebuild UI | 3 | 2 | `story/PAC-192-us-152-manual-graph-retry-rebuild-ui` |
| US-153 | PAC-193 | Read-only Graph Explorer | 5 | 5 | `story/PAC-193-us-153-read-only-graph-explorer` |
| US-154 | PAC-194 | AI Provider Settings UI | 3 | 2 | `story/PAC-194-us-154-ai-provider-settings-ui` |
| US-155 | PAC-195 | Prompt Management UI | 3 | 3 | `story/PAC-195-us-155-prompt-management-ui` |
| US-156 | PAC-196 | System Audit Log UI | 3 | 2 | `story/PAC-196-us-156-system-audit-log-ui` |
| US-157 | PAC-197 | Supabase Storage for medicine images | 3 | 3 | `story/PAC-197-us-157-supabase-storage-for-medicine-images` |
| US-158 | PAC-198 | Supabase Realtime inventory updates | 3 | 3 | `story/PAC-198-us-158-supabase-realtime-inventory-updates` |
| US-159 | PAC-199 | Notification Center | 3 | 5 | `story/PAC-199-us-159-notification-center` |
| US-160 | PAC-200 | AI Business Report Narrative | 3 | 2 | `story/PAC-200-us-160-ai-business-report-narrative` |

## 15.3 Task branches

| Logical Task | Jira Key | Story | Epic | Summary | Exact branch |
|---|---|---|---|---|---|
| PAC-TASK-526 | PAC-736 | US-151 | PAC-EPIC-22 | Build Admin Graph Sync Status list UI | `feature/PAC-736-task-526-build-admin-graph-sync-status-list-ui` |
| PAC-TASK-527 | PAC-737 | US-151 | PAC-EPIC-22 | Build Graph Sync job detail UI | `feature/PAC-737-task-527-build-graph-sync-job-detail-ui` |
| PAC-TASK-528 | PAC-738 | US-152 | PAC-EPIC-22 | Build manual graph retry action for Admin | `feature/PAC-738-task-528-build-manual-graph-retry-action-for-admin` |
| PAC-TASK-529 | PAC-739 | US-152 | PAC-EPIC-22 | Build manual graph rebuild action for Admin | `feature/PAC-739-task-529-build-manual-graph-rebuild-action-for-admin` |
| PAC-TASK-530 | PAC-740 | US-151 | PAC-EPIC-22 | Add Graph Sync Status permission checks | `feature/PAC-740-task-530-add-graph-sync-status-permission-checks` |
| PAC-TASK-531 | PAC-741 | US-153 | PAC-EPIC-23 | Build read-only Graph Explorer UI | `feature/PAC-741-task-531-build-read-only-graph-explorer-ui` |
| PAC-TASK-532 | PAC-742 | US-153 | PAC-EPIC-23 | Build Graph Explorer node detail panel | `feature/PAC-742-task-532-build-graph-explorer-node-detail-panel` |
| PAC-TASK-533 | PAC-743 | US-153 | PAC-EPIC-23 | Build Graph Explorer relationship detail panel | `feature/PAC-743-task-533-build-graph-explorer-relationship-detail-panel` |
| PAC-TASK-534 | PAC-744 | US-153 | PAC-EPIC-23 | Add Graph Explorer permission checks | `feature/PAC-744-task-534-add-graph-explorer-permission-checks` |
| PAC-TASK-535 | PAC-745 | US-153 | PAC-EPIC-23 | Ensure Graph Explorer uses allowlisted templates only | `feature/PAC-745-task-535-ensure-graph-explorer-uses-allowlisted-templates-on` |
| PAC-TASK-536 | PAC-746 | US-154 | PAC-EPIC-24 | Build AI Provider Settings UI | `feature/PAC-746-task-536-build-ai-provider-settings-ui` |
| PAC-TASK-537 | PAC-747 | US-154 | PAC-EPIC-24 | Build AI model configuration UI | `feature/PAC-747-task-537-build-ai-model-configuration-ui` |
| PAC-TASK-538 | PAC-748 | US-155 | PAC-EPIC-24 | Build Prompt Management list UI | `feature/PAC-748-task-538-build-prompt-management-list-ui` |
| PAC-TASK-539 | PAC-749 | US-155 | PAC-EPIC-24 | Build Prompt Management version detail UI | `feature/PAC-749-task-539-build-prompt-management-version-detail-ui` |
| PAC-TASK-540 | PAC-750 | US-155 | PAC-EPIC-24 | Add prompt approval status display | `feature/PAC-750-task-540-add-prompt-approval-status-display` |
| PAC-TASK-541 | PAC-751 | US-156 | PAC-EPIC-25 | Build System Audit Log UI | `feature/PAC-751-task-541-build-system-audit-log-ui` |
| PAC-TASK-542 | PAC-752 | US-156 | PAC-EPIC-25 | Add System Audit Log filters | `feature/PAC-752-task-542-add-system-audit-log-filters` |
| PAC-TASK-543 | PAC-753 | US-157 | PAC-EPIC-26 | Implement Supabase Storage upload flow for medicine images | `feature/PAC-753-task-543-implement-supabase-storage-upload-flow-for-medicine` |
| PAC-TASK-544 | PAC-754 | US-157 | PAC-EPIC-26 | Build medicine image upload UI | `feature/PAC-754-task-544-build-medicine-image-upload-ui` |
| PAC-TASK-545 | PAC-755 | US-157 | PAC-EPIC-26 | Add Supabase Storage file validation | `feature/PAC-755-task-545-add-supabase-storage-file-validation` |
| PAC-TASK-546 | PAC-756 | US-158 | PAC-EPIC-27 | Implement Supabase Realtime inventory update listener | `feature/PAC-756-task-546-implement-supabase-realtime-inventory-update-listen` |
| PAC-TASK-547 | PAC-757 | US-158 | PAC-EPIC-27 | Build realtime POS stock refresh behavior | `feature/PAC-757-task-547-build-realtime-pos-stock-refresh-behavior` |
| PAC-TASK-548 | PAC-758 | US-158 | PAC-EPIC-27 | Add realtime fallback polling behavior | `feature/PAC-758-task-548-add-realtime-fallback-polling-behavior` |
| PAC-TASK-549 | PAC-759 | US-159 | PAC-EPIC-28 | Build Notification Center UI | `feature/PAC-759-task-549-build-notification-center-ui` |
| PAC-TASK-550 | PAC-760 | US-159 | PAC-EPIC-28 | Implement low-stock notification generation | `feature/PAC-760-task-550-implement-low-stock-notification-generation` |
| PAC-TASK-551 | PAC-761 | US-159 | PAC-EPIC-28 | Implement near-expiry notification generation | `feature/PAC-761-task-551-implement-near-expiry-notification-generation` |
| PAC-TASK-552 | PAC-762 | US-159 | PAC-EPIC-28 | Build read/unread notification state | `feature/PAC-762-task-552-build-read-unread-notification-state` |
| PAC-TASK-553 | PAC-763 | US-159 | PAC-EPIC-28 | Implement scheduled near-expiry scan job | `feature/PAC-763-task-553-implement-scheduled-near-expiry-scan-job` |
| PAC-TASK-554 | PAC-764 | US-160 | PAC-EPIC-29 | Implement AI Business Report Narrative API | `feature/PAC-764-task-554-implement-ai-business-report-narrative-api` |
| PAC-TASK-555 | PAC-765 | US-160 | PAC-EPIC-29 | Build AI Business Report Narrative UI | `feature/PAC-765-task-555-build-ai-business-report-narrative-ui` |

---

# 16. Bug Candidate Workflow

AI không tự tạo Jira Bug Key.

Khi phát hiện defect:

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

Nếu defect làm hỏng MVP:

- Dừng advanced feature liên quan.
- Ưu tiên bảo vệ MVP release baseline.
- Project Owner tạo Jira Bug.
- Fix qua exact Bug branch.
- Chạy lại regression và affected Story/Epic Review.

---

# 17. Definition of Done

```text
30/30 Tasks verified
10/10 Story Reviews PASS
8/8 Core Epic Reviews PASS
48/48 canonical branches reconciled
All applicable PRs merged

Graph Sync Status UI permission-safe
Manual retry/rebuild safe and audited
Graph Explorer read-only and allowlisted
AI provider/model secrets protected
Prompt approval governance preserved
System Audit Log UI read-only
Medicine image upload validated
Realtime has safe fallback
Notifications deterministic and deduplicated
AI narrative uses deterministic report data

Local Quality Gate PASS
GitHub Actions = N/A — full CI reserved for main/release
Blocking findings = 0
High findings = 0

Sprint 11 Final Review = PASS
Advanced features approved for use/demo = Yes
MVP release readiness remains = Yes
```

Sprint 11 completion không phải điều kiện để MVP Release Ready.

---

# 18. Final Checklist

- [ ] Sprint 10 Final Review PASS.
- [ ] Ready for MVP Release = Yes.
- [ ] Project Leader approves Sprint 11.
- [ ] Sprint 11 Audit PASS.
- [ ] 30/30 Tasks complete.
- [ ] 10/10 Story Reviews PASS.
- [ ] 8/8 Epic Reviews PASS.
- [ ] 48/48 branches reconciled.
- [ ] Permission and security tests PASS.
- [ ] MVP regression tests PASS.
- [ ] Local Quality Gate PASS.
- [ ] GitHub Actions = N/A — full CI reserved for main/release.
- [ ] Blocking findings = 0.
- [ ] High findings = 0.
- [ ] Sprint 11 Final Review PASS.
- [ ] Ready for MVP Release remains Yes.

---

# 19. Current Official State

```text
Sprint 10 implementation = In progress / pending completion
Sprint 10 Final Review = Pending
Ready for MVP Release = No until Sprint 10 Final Review PASS

Sprint 11 plan = Prepared
Sprint 11 progress tracker = Not created
Sprint 11 audit = Not created
Sprint 11 agent prompt = Not created
Sprint 11 final review prompt = Not created

Ready to implement Sprint 11 = No
```

Tài liệu tiếp theo:

```text
sprint-11-progress.md
```
