# Sprint 11 Progress — PharmaAssist AI Intelligence

> **Repository path đề xuất:** `work-context/sprint-11/sprint-11-progress.md`
>
> Tài liệu theo dõi implementation, verification, MVP regression protection và advanced-feature readiness của Sprint 11. Jira do Project Owner cập nhật thủ công.

---

## Canonical Sources

1. `Jira/branch-on-jira.md` — nguồn duy nhất cho Jira Key và exact branch.
2. `Jira/jira-mapping.md`.
3. `Jira/2_Epic.md`.
4. `Jira/3_Stories.md`.
5. `Jira/4D_Task_List_Testing_Advanced_Future_436_580.md`.
6. `Jira/4D_Task_Description_Testing_Advanced_Future_436_580.md`.
7. `Jira/5_Sprint.md`.
8. `work-context/sprint-11/sprint-11.md`.
9. Sprint 10 Final Review Report.
10. Current repository, Prisma schema, Supabase, Neo4j, GitHub Actions và GitHub state.

Quy tắc:

- Sprint 11 là Should-have / Advanced, không phải MVP Gate.
- Không bắt đầu implementation trước Sprint 10 Final Review PASS và Sprint 11 Audit PASS.
- Không đổi, rút gọn hoặc tự tạo branch thay thế.
- Task/Bug PR target `develop`.
- Không tạo Story PR hoặc Epic PR.
- Chỉ Project Owner merge `develop → main`.
- PostgreSQL là source of truth.
- Neo4j là read projection.
- Graph Explorer chỉ read-only và chỉ dùng allowlisted templates.
- Realtime chỉ cải thiện UX, không là checkout authority.
- AI Narrative chỉ giải thích số liệu deterministic.
- Không expose Supabase, Neo4j hoặc AI secrets.
- Advanced feature lỗi hoặc chưa hoàn tất không được làm mất MVP release readiness.
- Local Quality Gate và GitHub Actions (N/A for PRs to develop) đều bắt buộc sau Sprint 10.

---

# 1. Sprint Information

| Mục | Nội dung |
|---|---|
| Sprint | Sprint 11 |
| Tên | Should-have / Advanced Features |
| Scope | Should-have / Advanced |
| MVP Gate | Không |
| Core Epics | PAC-EPIC-22 → PAC-EPIC-29 |
| Core Epic count | 8 |
| Stories | US-151 → US-160 |
| Story count | 10 |
| Story Points | 32 |
| Tasks | PAC-TASK-526 → PAC-TASK-555 |
| Task count | 30 |
| Task Jira Keys | PAC-736 → PAC-765 |
| Branch inventory | 48 = 30 Task + 10 Story + 8 Epic |
| Initial status | Prepared |
| Sprint 10 Final Review | Pending |
| Ready for MVP Release | No until Sprint 10 Final Review PASS |
| Project Leader approval | Pending |
| Sprint 11 Audit | Pending |
| Ready to implement Sprint 11 | No |
| Advanced features approved for use/demo | No |
| Jira management | Manual by Project Owner |
| Browser target | Chrome/Chromium desktop; basic responsive |
| CI expectation | Local Quality Gate + GitHub Actions (N/A for PRs to develop) |

---

# 2. Official Workflow

```text
Sprint 10 Final Review PASS
→ MVP release baseline/tag recorded
→ Project Leader approval
→ Sprint 11 Audit PASS
→ exact Task branch verification
→ latest develop
→ read Task and Acceptance Criteria
→ implement minimum safe scope
→ targeted tests and MVP regression
→ security/fallback review
→ commit and push
→ PR into develop
→ Local Quality Gate
→ GitHub Actions = N/A — full CI intentionally reserved for main/release
→ merge
→ verify merge SHA on origin/develop
→ update progress
```

Story completion:

```text
all direct Tasks merged
→ latest develop
→ Story Acceptance Review
→ PASS/FAIL
```

Epic completion:

```text
all related Stories/Tasks verified
→ latest develop
→ Core Epic Review
→ PASS/FAIL
```

Không tạo Story PR hoặc Epic PR.

---

# 3. Progress Update Cadence

Cập nhật khi:

1. Sprint 10 Final Review hoặc MVP baseline thay đổi.
2. Project Leader approval thay đổi.
3. Sprint 11 Audit hoàn tất.
4. Task/Bug PR merge hoặc bị blocker.
5. Story Acceptance Review hoàn tất.
6. Core Epic Review hoàn tất.
7. Permission/security/fallback evidence thay đổi.
8. Supabase Storage/Realtime evidence thay đổi.
9. Notification job hoặc duplicate-suppression evidence thay đổi.
10. AI Narrative guardrail/audit evidence thay đổi.
11. MVP regression hoặc feature isolation thay đổi.
12. Kết thúc phiên hoặc cần handoff.
13. Sprint 11 Final Review hoàn tất.

Không tạo documentation-only PR sau từng Task chỉ để ghi merge SHA. Có thể đồng bộ trong Task tiếp theo hoặc cuối phiên.

---

# 4. Sprint Summary

| Hạng mục | Tổng | Not started | In progress | Ready for merge | Technically complete | Review PASS |
|---|---:|---:|---:|---:|---:|---:|
| Core Epic Reviews | 8 | 8 | 0 | 0 | 0 | 0 |
| Story Acceptance Reviews | 10 | 10 | 0 | 0 | 0 | 0 |
| Task implementation | 30 | 30 | 0 | 0 | 0 | 0 |
| Bug candidates | 0 | 0 | 0 | 0 | 0 | 0 |

## Completion Counters

- [ ] Sprint 10 Final Review PASS.
- [ ] Ready for MVP Release = Yes.
- [ ] MVP release baseline/tag recorded.
- [ ] Project Leader approval = Yes.
- [ ] Sprint 11 Audit PASS.
- [ ] 48/48 canonical branches reconciled.
- [ ] 30/30 exact Task branches used.
- [ ] 30/30 applicable Task/Bug PRs merged into `develop`.
- [ ] 10/10 Story Acceptance Reviews PASS.
- [ ] 8/8 Core Epic Reviews PASS.
- [ ] Graph Sync Status UI permission-safe.
- [ ] Manual retry/rebuild safe, bounded and audited.
- [ ] Graph Explorer read-only and allowlisted.
- [ ] AI provider/model secrets protected.
- [ ] Prompt version/approval governance preserved.
- [ ] System Audit Log UI read-only and permission-safe.
- [ ] Medicine image upload validated.
- [ ] Storage error cleanup verified.
- [ ] Realtime inventory listener PASS.
- [ ] Realtime reconnect/fallback PASS.
- [ ] Checkout remains backend-authoritative.
- [ ] Low-stock notifications use sellable quantity.
- [ ] Near-expiry notifications use current threshold.
- [ ] Notification duplicate suppression PASS.
- [ ] Scheduled near-expiry job bounded and observable.
- [ ] AI Business Narrative uses deterministic report data.
- [ ] AI Guardrail/Audit/disclaimer PASS.
- [ ] MVP behavior PASS with advanced features enabled.
- [ ] MVP behavior PASS with advanced features unavailable/disabled.
- [ ] Local Quality Gate PASS.
- [ ] GitHub Actions = N/A — full CI reserved for main/release.
- [ ] Blocking defects = 0.
- [ ] High defects = 0.
- [ ] Sprint 11 Final Review PASS.
- [ ] Advanced features approved for use/demo = Yes.
- [ ] MVP release readiness remains = Yes.

---

# 5. Authorization Gate Register

| Gate | Required state | Current state | Evidence | Result |
|---|---|---|---|---|
| Sprint 10 Final Review | PASS | Pending | — | Pending |
| Ready for MVP Release | Yes | No/Pending | — | Pending |
| Blocking MVP defects | 0 | Pending verification | — | Pending |
| High MVP defects | 0 | Pending verification | — | Pending |
| MVP release baseline/tag | Recorded | Not recorded | — | Pending |
| Project Leader approval | Yes | Pending | — | Pending |
| Team capacity | Available | Pending | — | Pending |
| Sprint 11 Audit | PASS | Not created | — | Pending |
| Ready to implement Sprint 11 | Yes | No | — | Pending |

Authorization rule:

```text
Nếu một Gate chưa PASS:
Không bắt đầu Sprint 11 implementation.
```

---

# 6. MVP Baseline Protection Register

| Baseline area | Sprint 10 expected state | Sprint 11 allowed impact | Current evidence | Result |
|---|---|---|---|---|
| Auth/RBAC | Stable | Không thay core auth flow | — | Pending |
| Medicine/Inventory | Stable | UI/storage/realtime enhancement only | — | Pending |
| POS/Checkout | Stable | Realtime UX only; backend remains authoritative | — | Pending |
| Interaction/HIGH alert | Stable | Không thay deterministic rules | — | Pending |
| Payment/Invoice | Stable | Không thay | — | Pending |
| AI Guardrail/Audit | Stable | Governance UI/narrative must reuse guardrails | — | Pending |
| Graph Sync/Graph-RAG | Stable | Observability/read-only/admin action only | — | Pending |
| Reports | Deterministic | AI narrative may explain only | — | Pending |
| System Settings | Stable | Near-expiry consumers use current value | — | Pending |
| Demo reset/tests/CI | Stable | Must remain green | — | Pending |

Mọi MVP regression phải được ghi là Bug Candidate và chặn feature liên quan.

---

# 7. Tool and Environment Evidence

| Tool/Area | Status | Required for | Evidence |
|---|---|---|---|
| Git/GitHub | Pending | Branch, PR, merge and remote verification | — |
| Local Quality Gate | Pending | Mọi Task/Bug PR | — |
| GitHub Actions | Pending verification | GitHub Actions = N/A — full CI intentionally reserved for main/release | — |
| PostgreSQL/Supabase | Pending | Storage metadata, notifications, audit logs, reports | — |
| Neo4j AuraDB | Pending | Sync status, retry/rebuild, Graph Explorer | — |
| Supabase Storage | Pending | Medicine image upload | — |
| Supabase Realtime | Pending | Inventory update listener | — |
| Scheduler/job runner | Pending | Near-expiry scan | — |
| Google AI/MockAI | Pending | AI Business Narrative | — |
| Backend test runner | Pending | API/security/job tests | — |
| Frontend test runner | Pending | UI/component tests | — |
| Playwright Chrome | Pending | Critical advanced-feature E2E | — |
| Jira | Project Owner managed | Manual status/comment/Bug updates | AI write actions disabled |

---

# 8. Local Quality Gate and CI Evidence

| Issue | Lint/Typecheck | Unit tests | Integration/E2E | Build | Prisma | Supabase | Neo4j | Security/Fallback | MVP regression | CI | Conflict | Gate | Evidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Chưa cập nhật | Pending/N/A | Pending/N/A | Pending/N/A | Pending/N/A | Pending/N/A | Pending/N/A | Pending/N/A | Pending | Pending | Pending | Pending | Pending | Pending | — |

N/A chuẩn:

```text
Supabase = N/A — no storage/realtime/persistent-data impact
Neo4j = N/A — no graph query/retry/rebuild impact
AI = N/A — no provider/prompt/narrative impact
```

Không được ghi GitHub Actions = N/A — full CI intentionally reserved for main/release sau khi GitHub Actions đã trở thành required gate, trừ khi Task không có applicable workflow và lý do được ghi rõ.

---

# 9. Technical Phase Progress

## Phase 1 — Graph Sync Observability and Permission Safety

| Task | Jira Key | Summary | Status | Exact branch | PR | Merge SHA |
|---|---|---|---|---|---|---|
| PAC-TASK-530 | PAC-740 | Add Graph Sync Status permission checks | Done | `feature/PAC-740-task-530-add-graph-sync-status-permission-checks` | #865 | e23b59e31e7e3c305b21f96fdbd1024288fa00db |
| PAC-TASK-526 | PAC-736 | Build Admin Graph Sync Status list UI | Completed | `feature/PAC-736-task-526-build-admin-graph-sync-status-list-ui` | — | 2c94e39 |
| PAC-TASK-527 | PAC-737 | Build Graph Sync job detail UI | Completed | `feature/PAC-737-task-527-build-graph-sync-job-detail-ui` | — | c2fc0ce |

## Phase 2 — Controlled Graph Retry and Rebuild

| Task | Jira Key | Summary | Status | Exact branch | PR | Merge SHA |
|---|---|---|---|---|---|---|
| PAC-TASK-528 | PAC-738 | Build manual graph retry action for Admin | Not started | `feature/PAC-738-task-528-build-manual-graph-retry-action-for-admin` | — | — |
| PAC-TASK-529 | PAC-739 | Build manual graph rebuild action for Admin | Not started | `feature/PAC-739-task-529-build-manual-graph-rebuild-action-for-admin` | — | — |

## Phase 3 — Read-only Graph Explorer

| Task | Jira Key | Summary | Status | Exact branch | PR | Merge SHA |
|---|---|---|---|---|---|---|
| PAC-TASK-535 | PAC-745 | Ensure Graph Explorer uses allowlisted templates only | Not started | `feature/PAC-745-task-535-ensure-graph-explorer-uses-allowlisted-templates-on` | — | — |
| PAC-TASK-534 | PAC-744 | Add Graph Explorer permission checks | Not started | `feature/PAC-744-task-534-add-graph-explorer-permission-checks` | — | — |
| PAC-TASK-531 | PAC-741 | Build read-only Graph Explorer UI | Not started | `feature/PAC-741-task-531-build-read-only-graph-explorer-ui` | — | — |
| PAC-TASK-532 | PAC-742 | Build Graph Explorer node detail panel | Not started | `feature/PAC-742-task-532-build-graph-explorer-node-detail-panel` | — | — |
| PAC-TASK-533 | PAC-743 | Build Graph Explorer relationship detail panel | Not started | `feature/PAC-743-task-533-build-graph-explorer-relationship-detail-panel` | — | — |

## Phase 4 — AI Provider and Prompt Governance UI

| Task | Jira Key | Summary | Status | Exact branch | PR | Merge SHA |
|---|---|---|---|---|---|---|
| PAC-TASK-536 | PAC-746 | Build AI Provider Settings UI | Not started | `feature/PAC-746-task-536-build-ai-provider-settings-ui` | — | — |
| PAC-TASK-537 | PAC-747 | Build AI model configuration UI | Not started | `feature/PAC-747-task-537-build-ai-model-configuration-ui` | — | — |
| PAC-TASK-538 | PAC-748 | Build Prompt Management list UI | Not started | `feature/PAC-748-task-538-build-prompt-management-list-ui` | — | — |
| PAC-TASK-539 | PAC-749 | Build Prompt Management version detail UI | Not started | `feature/PAC-749-task-539-build-prompt-management-version-detail-ui` | — | — |
| PAC-TASK-540 | PAC-750 | Add prompt approval status display | Not started | `feature/PAC-750-task-540-add-prompt-approval-status-display` | — | — |

## Phase 5 — System Audit Log UI

| Task | Jira Key | Summary | Status | Exact branch | PR | Merge SHA |
|---|---|---|---|---|---|---|
| PAC-TASK-541 | PAC-751 | Build System Audit Log UI | Not started | `feature/PAC-751-task-541-build-system-audit-log-ui` | — | — |
| PAC-TASK-542 | PAC-752 | Add System Audit Log filters | Not started | `feature/PAC-752-task-542-add-system-audit-log-filters` | — | — |

## Phase 6 — Supabase Storage for Medicine Images

| Task | Jira Key | Summary | Status | Exact branch | PR | Merge SHA |
|---|---|---|---|---|---|---|
| PAC-TASK-545 | PAC-755 | Add Supabase Storage file validation | Not started | `feature/PAC-755-task-545-add-supabase-storage-file-validation` | — | — |
| PAC-TASK-543 | PAC-753 | Implement Supabase Storage upload flow for medicine images | Not started | `feature/PAC-753-task-543-implement-supabase-storage-upload-flow-for-medicine` | — | — |
| PAC-TASK-544 | PAC-754 | Build medicine image upload UI | Not started | `feature/PAC-754-task-544-build-medicine-image-upload-ui` | — | — |

## Phase 7 — Supabase Realtime Inventory UX

| Task | Jira Key | Summary | Status | Exact branch | PR | Merge SHA |
|---|---|---|---|---|---|---|
| PAC-TASK-546 | PAC-756 | Implement Supabase Realtime inventory update listener | Not started | `feature/PAC-756-task-546-implement-supabase-realtime-inventory-update-listen` | — | — |
| PAC-TASK-548 | PAC-758 | Add realtime fallback polling behavior | Not started | `feature/PAC-758-task-548-add-realtime-fallback-polling-behavior` | — | — |
| PAC-TASK-547 | PAC-757 | Build realtime POS stock refresh behavior | Not started | `feature/PAC-757-task-547-build-realtime-pos-stock-refresh-behavior` | — | — |

## Phase 8 — Notification Center and Scheduled Near-expiry Scan

| Task | Jira Key | Summary | Status | Exact branch | PR | Merge SHA |
|---|---|---|---|---|---|---|
| PAC-TASK-550 | PAC-760 | Implement low-stock notification generation | Not started | `feature/PAC-760-task-550-implement-low-stock-notification-generation` | — | — |
| PAC-TASK-551 | PAC-761 | Implement near-expiry notification generation | Not started | `feature/PAC-761-task-551-implement-near-expiry-notification-generation` | — | — |
| PAC-TASK-553 | PAC-763 | Implement scheduled near-expiry scan job | Not started | `feature/PAC-763-task-553-implement-scheduled-near-expiry-scan-job` | — | — |
| PAC-TASK-549 | PAC-759 | Build Notification Center UI | Not started | `feature/PAC-759-task-549-build-notification-center-ui` | — | — |
| PAC-TASK-552 | PAC-762 | Build read/unread notification state | Not started | `feature/PAC-762-task-552-build-read-unread-notification-state` | — | — |

## Phase 9 — AI Business Report Narrative

| Task | Jira Key | Summary | Status | Exact branch | PR | Merge SHA |
|---|---|---|---|---|---|---|
| PAC-TASK-554 | PAC-764 | Implement AI Business Report Narrative API | Not started | `feature/PAC-764-task-554-implement-ai-business-report-narrative-api` | — | — |
| PAC-TASK-555 | PAC-765 | Build AI Business Report Narrative UI | Not started | `feature/PAC-765-task-555-build-ai-business-report-narrative-ui` | — | — |

---

# 10. Graph Sync Status Verification Log

| Verification ID | Task/Story | Actor | Job state | Expected UI/API | Actual | Permission | Result | Evidence |
|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | Pending | — |

Required scenarios:

- Admin xem danh sách job.
- Admin xem detail.
- Staff bị từ chối.
- Warehouse bị từ chối.
- Pending/success/failed hiển thị đúng.
- Error summary không chứa secret.
- Freshness/degraded state hiển thị đúng.
- Pagination/filter nếu contract hỗ trợ.

---

# 11. Graph Retry and Rebuild Safety Log

| Action ID | Task | Environment | Actor | Confirmation | Lock/idempotency | PostgreSQL impact | Neo4j result | Audit | Result | Evidence |
|---|---|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | — | — | Pending | — |

Required safeguards:

- Admin-only.
- Explicit confirmation.
- Safe environment and target verification.
- Bounded retry/rebuild scope.
- No global delete on shared AuraDB.
- PostgreSQL remains source of truth.
- Failure does not corrupt PostgreSQL.
- Action result and error summary recorded.
- Concurrent action controlled.
- Audit record created where supported.

---

# 12. Graph Explorer Security Log

| Verification ID | Task | Query type | Actor | Allowlist | Parameterized | Bound/limit | Raw Cypher rejected | Result | Evidence |
|---|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | — | Pending | — |

Required scenarios:

- Admin/allowed actor can access according to agreed permission.
- Unauthorized actors rejected.
- Medicine → CONTAINS → ActiveIngredient query.
- ActiveIngredient → INTERACTS_WITH → ActiveIngredient query.
- Node detail read-only.
- Relationship detail read-only.
- Unknown query type rejected.
- Raw Cypher rejected.
- No arbitrary traversal.
- Result depth/count bounded.
- Internal query and credentials not exposed.
- Graph Explorer never authorizes checkout.

---

# 13. AI Provider and Prompt Governance Log

| Verification ID | Task/Story | Scenario | Expected | Actual | Secret exposure | Audit/version | Result | Evidence |
|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | Pending | — |

Required scenarios:

- Provider setting UI does not expose API key.
- Provider value is allowlisted.
- Model value is allowlisted.
- Invalid provider/model rejected by backend.
- Prompt list displays stable metadata.
- Prompt version detail displays version and status.
- Approval status visible.
- Unapproved prompt cannot become active official prompt.
- Changes are audited where backend supports them.
- MockAI fallback remains available.

---

# 14. System Audit Log UI Verification

| Verification ID | Task | Actor | Filters | Pagination | PII/secret review | Read-only | Result | Evidence |
|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | Pending | — |

Required scenarios:

- Admin access.
- Unauthorized access rejected.
- Read-only behavior.
- Date/action/actor/entity filters validate.
- Pagination stable.
- Empty/error states.
- No edit/delete action.
- No raw secret/token/password.
- Sensitive payload is redacted/minimized.

---

# 15. Supabase Storage Verification Log

| Upload ID | Task | Actor | File type | Size | Server validation | Storage path | Metadata update | Failure cleanup | Result | Evidence |
|---|---|---|---|---:|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | — | — | Pending | — |

Required scenarios:

- Authorized upload succeeds.
- Unauthorized upload rejected.
- Allowed image type accepted.
- Executable/dangerous type rejected.
- Oversized file rejected.
- Client MIME spoof rejected where detectable.
- Safe object path.
- Service-role key remains backend-only.
- Medicine without image still works.
- Failed metadata update does not leave uncontrolled orphan where cleanup is feasible.
- Image replacement/removal semantics follow agreed contract.
- Signed/public URL policy is documented and safe.

---

# 16. Supabase Realtime Verification Log

| Event ID | Task | Scenario | Expected UI | Backend authority preserved | Reconnect | Fallback polling | Result | Evidence |
|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | Pending | — |

Required scenarios:

- Inventory change event refreshes displayed stock.
- Duplicate/out-of-order event handled safely.
- Disconnect detected.
- Reconnect works.
- Fallback polling/manual refresh works.
- Polling interval bounded.
- No event listener leak.
- Draft order is not silently altered.
- Checkout revalidates stock on backend.
- Realtime unavailable does not make POS unusable.

---

# 17. Notification Verification Log

| Notification ID | Task | Type | Source condition | User | Duplicate key/window | Read state | Scheduled job | Result | Evidence |
|---|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | — | Pending | — |

Required scenarios:

- Low-stock uses sellable quantity.
- Expired stock excluded.
- Near-expiry uses current setting.
- Expired not duplicated as near-expiry.
- Duplicate notifications suppressed.
- Read/unread state is user-scoped.
- Unauthorized users cannot read others' notifications.
- Scheduled scan is bounded and observable.
- Failed scan can be retried safely.
- Notification Center loading/empty/error states.
- Job does not replace dashboard/report.

---

# 18. AI Business Narrative Verification Log

| Narrative ID | Task | Report type | Deterministic input | Guardrail | Provider/fallback | Audit | Disclaimer | Result | Evidence |
|---|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | — | Pending | — |

Required scenarios:

- Revenue report narrative.
- Top Medicines narrative.
- Inventory narrative if included by contract.
- Input comes from deterministic report output.
- AI does not recalculate totals/ranking/stock.
- PII minimized.
- Prompt version recorded.
- Provider/model recorded.
- Safe fallback/error on provider failure.
- Disclaimer present.
- Narrative cannot override numeric report.
- No diagnosis/prescribing/dosage content.

---

# 19. MVP Regression and Feature Isolation Matrix

| Advanced feature | Enabled path | Disabled/unavailable path | MVP capability protected | Expected | Actual | Result | Evidence |
|---|---|---|---|---|---|---|---|
| Graph Sync Status UI | Admin sees status | UI hidden/unavailable | Graph Sync backend | MVP continues | — | Pending | — |
| Retry/Rebuild UI | Safe Admin action | Action unavailable | Graph-RAG fallback | MVP continues | — | Pending | — |
| Graph Explorer | Read-only query | Explorer unavailable | POS/Checkout | MVP continues | — | Pending | — |
| AI Provider UI | Config visible | UI unavailable | Existing AI config | MVP continues | — | Pending | — |
| Prompt UI | Metadata visible | UI unavailable | Approved prompts | MVP continues | — | Pending | — |
| Audit Log UI | Read-only view | UI unavailable | Audit persistence | MVP continues | — | Pending | — |
| Medicine Images | Image available | No image/Storage down | Medicine CRUD/POS | MVP continues | — | Pending | — |
| Realtime Inventory | Live refresh | Disconnect/fallback | Checkout stock validation | MVP continues | — | Pending | — |
| Notification Center | Notifications visible | Job/UI unavailable | Inventory dashboard/reports | MVP continues | — | Pending | — |
| AI Narrative | Narrative visible | Provider failure | Numeric reports | MVP continues | — | Pending | — |

---

# 20. Task Implementation Register

| # | Logical Task | Jira Key | Story | Epic | Priority | Status | Exact branch | PR | Merge SHA | Gate |
|---:|---|---|---|---|---|---|---|---|---|---|
| 1 | PAC-TASK-526 | PAC-736 | US-151 | PAC-EPIC-22 | Medium | Completed | `feature/PAC-736-task-526-build-admin-graph-sync-status-list-ui` | merged | 2c94e39 | PASS |
| 2 | PAC-TASK-527 | PAC-737 | US-151 | PAC-EPIC-22 | Low | Completed | `feature/PAC-737-task-527-build-graph-sync-job-detail-ui` | merged | c2fc0ce | PASS |
| 3 | PAC-TASK-528 | PAC-738 | US-152 | PAC-EPIC-22 | Medium | Not started | `feature/PAC-738-task-528-build-manual-graph-retry-action-for-admin` | — | — | Pending |
| 4 | PAC-TASK-529 | PAC-739 | US-152 | PAC-EPIC-22 | Medium | Not started | `feature/PAC-739-task-529-build-manual-graph-rebuild-action-for-admin` | — | — | Pending |
| 5 | PAC-TASK-530 | PAC-740 | US-151 | PAC-EPIC-22 | Medium | Done | `feature/PAC-740-task-530-add-graph-sync-status-permission-checks` | #865 | e23b59e31e7e3c305b21f96fdbd1024288fa00db | In Review |
| 6 | PAC-TASK-531 | PAC-741 | US-153 | PAC-EPIC-23 | Medium | Not started | `feature/PAC-741-task-531-build-read-only-graph-explorer-ui` | — | — | Pending |
| 7 | PAC-TASK-532 | PAC-742 | US-153 | PAC-EPIC-23 | Low | Not started | `feature/PAC-742-task-532-build-graph-explorer-node-detail-panel` | — | — | Pending |
| 8 | PAC-TASK-533 | PAC-743 | US-153 | PAC-EPIC-23 | Low | Not started | `feature/PAC-743-task-533-build-graph-explorer-relationship-detail-panel` | — | — | Pending |
| 9 | PAC-TASK-534 | PAC-744 | US-153 | PAC-EPIC-23 | Medium | Not started | `feature/PAC-744-task-534-add-graph-explorer-permission-checks` | — | — | Pending |
| 10 | PAC-TASK-535 | PAC-745 | US-153 | PAC-EPIC-23 | High | Not started | `feature/PAC-745-task-535-ensure-graph-explorer-uses-allowlisted-templates-on` | — | — | Pending |
| 11 | PAC-TASK-536 | PAC-746 | US-154 | PAC-EPIC-24 | Medium | Not started | `feature/PAC-746-task-536-build-ai-provider-settings-ui` | — | — | Pending |
| 12 | PAC-TASK-537 | PAC-747 | US-154 | PAC-EPIC-24 | Low | Not started | `feature/PAC-747-task-537-build-ai-model-configuration-ui` | — | — | Pending |
| 13 | PAC-TASK-538 | PAC-748 | US-155 | PAC-EPIC-24 | Medium | Not started | `feature/PAC-748-task-538-build-prompt-management-list-ui` | — | — | Pending |
| 14 | PAC-TASK-539 | PAC-749 | US-155 | PAC-EPIC-24 | Low | Not started | `feature/PAC-749-task-539-build-prompt-management-version-detail-ui` | — | — | Pending |
| 15 | PAC-TASK-540 | PAC-750 | US-155 | PAC-EPIC-24 | Low | Not started | `feature/PAC-750-task-540-add-prompt-approval-status-display` | — | — | Pending |
| 16 | PAC-TASK-541 | PAC-751 | US-156 | PAC-EPIC-25 | Medium | Not started | `feature/PAC-751-task-541-build-system-audit-log-ui` | — | — | Pending |
| 17 | PAC-TASK-542 | PAC-752 | US-156 | PAC-EPIC-25 | Low | Not started | `feature/PAC-752-task-542-add-system-audit-log-filters` | — | — | Pending |
| 18 | PAC-TASK-543 | PAC-753 | US-157 | PAC-EPIC-26 | Low | Not started | `feature/PAC-753-task-543-implement-supabase-storage-upload-flow-for-medicine` | — | — | Pending |
| 19 | PAC-TASK-544 | PAC-754 | US-157 | PAC-EPIC-26 | Low | Not started | `feature/PAC-754-task-544-build-medicine-image-upload-ui` | — | — | Pending |
| 20 | PAC-TASK-545 | PAC-755 | US-157 | PAC-EPIC-26 | Low | Not started | `feature/PAC-755-task-545-add-supabase-storage-file-validation` | — | — | Pending |
| 21 | PAC-TASK-546 | PAC-756 | US-158 | PAC-EPIC-27 | Low | Not started | `feature/PAC-756-task-546-implement-supabase-realtime-inventory-update-listen` | — | — | Pending |
| 22 | PAC-TASK-547 | PAC-757 | US-158 | PAC-EPIC-27 | Low | Not started | `feature/PAC-757-task-547-build-realtime-pos-stock-refresh-behavior` | — | — | Pending |
| 23 | PAC-TASK-548 | PAC-758 | US-158 | PAC-EPIC-27 | Low | Not started | `feature/PAC-758-task-548-add-realtime-fallback-polling-behavior` | — | — | Pending |
| 24 | PAC-TASK-549 | PAC-759 | US-159 | PAC-EPIC-28 | Low | Not started | `feature/PAC-759-task-549-build-notification-center-ui` | — | — | Pending |
| 25 | PAC-TASK-550 | PAC-760 | US-159 | PAC-EPIC-28 | Low | Not started | `feature/PAC-760-task-550-implement-low-stock-notification-generation` | — | — | Pending |
| 26 | PAC-TASK-551 | PAC-761 | US-159 | PAC-EPIC-28 | Low | Not started | `feature/PAC-761-task-551-implement-near-expiry-notification-generation` | — | — | Pending |
| 27 | PAC-TASK-552 | PAC-762 | US-159 | PAC-EPIC-28 | Low | Not started | `feature/PAC-762-task-552-build-read-unread-notification-state` | — | — | Pending |
| 28 | PAC-TASK-553 | PAC-763 | US-159 | PAC-EPIC-28 | Low | Not started | `feature/PAC-763-task-553-implement-scheduled-near-expiry-scan-job` | — | — | Pending |
| 29 | PAC-TASK-554 | PAC-764 | US-160 | PAC-EPIC-29 | Low | Not started | `feature/PAC-764-task-554-implement-ai-business-report-narrative-api` | — | — | Pending |
| 30 | PAC-TASK-555 | PAC-765 | US-160 | PAC-EPIC-29 | Low | Not started | `feature/PAC-765-task-555-build-ai-business-report-narrative-ui` | — | — | Pending |

Status definitions:

```text
Not started
In progress
Blocked
Ready for merge
Technically complete
Failed verification
Deferred
```

`Technically complete` chỉ dùng khi:

- exact branch đúng;
- PR merged vào `develop`;
- merge SHA xuất hiện trên `origin/develop`;
- Local Quality Gate PASS;
- GitHub Actions = N/A — full CI intentionally reserved for main/release;
- MVP regression evidence hợp lệ.

---

# 21. Story Acceptance Review Register

| Story | Jira Key | Points | Direct Tasks | Task completion | Acceptance Review | Findings | Exact branch |
|---|---|---:|---|---|---|---|---|
| US-151 | PAC-191 | 3 | PAC-TASK-526, PAC-TASK-527, PAC-TASK-530 | 3/3 | Pending | — | `story/PAC-191-us-151-admin-graph-sync-status-ui` |
| US-152 | PAC-192 | 3 | PAC-TASK-528, PAC-TASK-529 | 0/2 | Pending | — | `story/PAC-192-us-152-manual-graph-retry-rebuild-ui` |
| US-153 | PAC-193 | 5 | PAC-TASK-531, PAC-TASK-532, PAC-TASK-533, PAC-TASK-534, PAC-TASK-535 | 0/5 | Pending | — | `story/PAC-193-us-153-read-only-graph-explorer` |
| US-154 | PAC-194 | 3 | PAC-TASK-536, PAC-TASK-537 | 0/2 | Pending | — | `story/PAC-194-us-154-ai-provider-settings-ui` |
| US-155 | PAC-195 | 3 | PAC-TASK-538, PAC-TASK-539, PAC-TASK-540 | 0/3 | Pending | — | `story/PAC-195-us-155-prompt-management-ui` |
| US-156 | PAC-196 | 3 | PAC-TASK-541, PAC-TASK-542 | 0/2 | Pending | — | `story/PAC-196-us-156-system-audit-log-ui` |
| US-157 | PAC-197 | 3 | PAC-TASK-543, PAC-TASK-544, PAC-TASK-545 | 0/3 | Pending | — | `story/PAC-197-us-157-supabase-storage-for-medicine-images` |
| US-158 | PAC-198 | 3 | PAC-TASK-546, PAC-TASK-547, PAC-TASK-548 | 0/3 | Pending | — | `story/PAC-198-us-158-supabase-realtime-inventory-updates` |
| US-159 | PAC-199 | 3 | PAC-TASK-549, PAC-TASK-550, PAC-TASK-551, PAC-TASK-552, PAC-TASK-553 | 0/5 | Pending | — | `story/PAC-199-us-159-notification-center` |
| US-160 | PAC-200 | 3 | PAC-TASK-554, PAC-TASK-555 | 0/2 | Pending | — | `story/PAC-200-us-160-ai-business-report-narrative` |

Story Review rules:

- Direct Tasks đã merge đầy đủ.
- Review trên latest `develop`.
- Acceptance Criteria PASS.
- Permission/security/fallback PASS.
- MVP regression PASS.
- Không có Blocking/High finding.
- Không tạo Story PR.

---

# 22. Core Epic Review Register

| Epic | Jira Key | Name | Direct Tasks | Task completion | Epic Review | Findings | Exact branch |
|---|---|---|---:|---|---|---|---|
| PAC-EPIC-22 | PAC-22 | Admin Graph Sync Status UI | 5 | 0/5 | Pending | — | `epic/PAC-22-epic-22-admin-graph-sync-status-ui` |
| PAC-EPIC-23 | PAC-23 | Read-only Graph Explorer | 5 | 0/5 | Pending | — | `epic/PAC-23-epic-23-read-only-graph-explorer` |
| PAC-EPIC-24 | PAC-24 | AI Provider & Prompt Management UI | 5 | 0/5 | Pending | — | `epic/PAC-24-epic-24-ai-provider-prompt-management-ui` |
| PAC-EPIC-25 | PAC-25 | System Audit Log UI | 2 | 0/2 | Pending | — | `epic/PAC-25-epic-25-system-audit-log-ui` |
| PAC-EPIC-26 | PAC-26 | Supabase Storage for Medicine Images | 3 | 0/3 | Pending | — | `epic/PAC-26-epic-26-supabase-storage-for-medicine-images` |
| PAC-EPIC-27 | PAC-27 | Supabase Realtime Inventory Updates | 3 | 0/3 | Pending | — | `epic/PAC-27-epic-27-supabase-realtime-inventory-updates` |
| PAC-EPIC-28 | PAC-28 | Notification Center | 5 | 0/5 | Pending | — | `epic/PAC-28-epic-28-notification-center` |
| PAC-EPIC-29 | PAC-29 | AI Business Report Narrative | 2 | 0/2 | Pending | — | `epic/PAC-29-epic-29-ai-business-report-narrative` |

Epic Review rules:

- Related Tasks/Stories complete.
- Review trên latest `develop`.
- Backend authority và source-of-truth rules giữ nguyên.
- Security/fallback/MVP regression PASS.
- Không tạo Epic PR.

---

# 23. Canonical Branch Reconciliation

| Category | Expected | Verified | Missing | Duplicate/replacement | Result |
|---|---:|---:|---:|---:|---|
| Task branches | 30 | 0 | 30 | 0 | Pending |
| Story branches | 10 | 0 | 10 | 0 | Pending |
| Core Epic branches | 8 | 0 | 8 | 0 | Pending |
| **Total** | **48** | **0** | **48** | **0** | **Pending** |

First logical Task:

```text
PAC-TASK-526
PAC-736
feature/PAC-736-task-526-build-admin-graph-sync-status-list-ui
```

Recommended first technical Task:

```text
PAC-TASK-526
PAC-736
feature/PAC-736-task-526-build-admin-graph-sync-status-list-ui
```

Last Task:

```text
PAC-TASK-555
PAC-765
feature/PAC-765-task-555-build-ai-business-report-narrative-ui
```

Nếu branch thiếu:

```text
Không tự tạo branch
Không dùng branch gần giống
Không sửa branch slug
Báo blocker cho Project Owner
```

---

# 24. PR and Merge Register

| PR | Task/Bug | Exact branch | Target | Local Gate | CI | Review | Merge SHA | Remote verified | Result |
|---|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | `develop` | — | — | — | — | — | Pending |

Không push trực tiếp vào `develop` hoặc `main`.

---

# 25. Findings Register

Severity:

```text
Blocker
High
Medium
Low
Observation
```

| Finding ID | Task/Story/Epic | Severity | Area | Finding | MVP regression | Evidence | Required action | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | — | — | Open |

Rules:

- Không xóa finding.
- Khi resolved, cập nhật evidence và status.
- Blocker/High chặn Task/Story/Epic liên quan.
- MVP regression phải được ưu tiên trước advanced feature.

---

# 26. Bug Candidate Register

| Candidate | Severity | Affected scope | MVP regression | Actual | Expected | Evidence | Suggested fix | Jira Bug Key | Status |
|---|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | — | Pending owner | — |

AI không tự tạo Jira Bug Key.

---

# 27. Deferred and Feature-disable Register

| Feature/Task | Reason | User-visible state | Feature flag/permission strategy | MVP impact | Owner | Review date | Status |
|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | None expected | — | — | — |

Feature chưa PASS phải được ẩn, tắt hoặc không expose theo cách an toàn.

---

# 28. Session Handoff

## Current session

```text
Sprint 11 plan = Prepared
Sprint 11 progress tracker = Prepared
Sprint 11 audit = Not created
Sprint 11 agent prompt = Not created
Sprint 11 final review prompt = Not created

Sprint 10 Final Review = Pending
Ready for MVP Release = No
Project Leader approval = Pending
Ready to implement Sprint 11 = No

Current Task = PAC-TASK-527 (Done)
Next technical Task = PAC-TASK-528 / PAC-738
```

## Required handoff fields

```text
Current branch:
Current Task:
Task status:
Files changed:
Tests run:
Local Quality Gate:
PR review:
GitHub Actions: N/A — full CI reserved for main/release
Branch:
Commit:
PR:
Merge SHA:
Remote develop verification:
Supabase evidence:
Neo4j evidence:
Security/fallback evidence:
MVP regression evidence:
PR:
Merge SHA:
Blockers:
Next Task:
```

---

# 29. Sprint 11 Final Review Readiness

Final Review chỉ được chạy khi:

- [ ] 30/30 Tasks technically complete.
- [ ] 10/10 Story Acceptance Reviews PASS.
- [ ] 8/8 Core Epic Reviews PASS.
- [ ] 48/48 branches reconciled.
- [ ] All applicable PRs merged.
- [ ] Local Quality Gate PASS.
- [ ] GitHub Actions = N/A — full CI reserved for main/release.
- [ ] Graph permission/safety tests PASS.
- [ ] Graph Explorer raw-Cypher rejection PASS.
- [ ] AI governance and secret protection PASS.
- [ ] Audit Log PII/secret review PASS.
- [ ] Storage validation and cleanup PASS.
- [ ] Realtime reconnect/fallback PASS.
- [ ] Notification calculation/dedup PASS.
- [ ] AI Narrative deterministic-input/guardrail PASS.
- [ ] MVP regression matrix PASS.
- [ ] Blocking findings = 0.
- [ ] High findings = 0.
- [ ] MVP release readiness remains Yes.

---

# 30. Current Official State

```text
Sprint 10 implementation = In progress / pending completion
Sprint 10 Final Review = Pending
Ready for MVP Release = No until Sprint 10 Final Review PASS

Sprint 11 plan = Prepared
Sprint 11 progress tracker = Prepared
Sprint 11 audit = Not created
Sprint 11 agent prompt = Not created
Sprint 11 final review prompt = Not created

Ready to implement Sprint 11 = No
Advanced features approved for use/demo = No
```

Tài liệu tiếp theo:

```text
sprint-11-audit.md
```
