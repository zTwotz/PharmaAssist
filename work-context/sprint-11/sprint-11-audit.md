# Sprint 11 Audit — PharmaAssist AI Intelligence

> **Pre-implementation audit for Should-have / Advanced Features**
>
> Repository path đề xuất:
>
> `work-context/sprint-11/sprint-11-audit.md`
>
> Tài liệu này phải được hoàn thành trước khi chạy `sprint-11-agent-prompt.md`.

---

# 1. Audit Purpose

Sprint 11 Audit xác minh rằng MVP Release baseline đã ổn định và repository đủ điều kiện triển khai các tính năng nâng cao:

```text
Admin Graph Sync Status UI
Controlled Graph Retry/Rebuild
Read-only Graph Explorer
AI Provider & Prompt Governance UI
System Audit Log UI
Supabase Storage for Medicine Images
Supabase Realtime Inventory UX
Notification Center
AI Business Report Narrative
```

Sprint 11 không phải MVP Gate.

Audit phải bảo đảm rằng:

- MVP release readiness không bị hạ thấp.
- Advanced features có thể bị tắt hoặc unavailable mà MVP vẫn hoạt động.
- PostgreSQL vẫn là source of truth.
- Neo4j vẫn chỉ là read projection.
- Realtime không trở thành checkout authority.
- AI Narrative không tự tính report data.
- Storage, notification và graph actions có permission/safety guard rõ.
- Không có secret bị expose.
- Sprint 11 không triển khai Sprint 12 scope.

Audit không phải phiên coding.

Trong Audit:

- Không triển khai Sprint 11 feature code.
- Không chạy graph rebuild destructive.
- Không chạy scheduled notification job trên shared data.
- Không upload file thử lên production/shared bucket.
- Không thay đổi Supabase Realtime publication/configuration.
- Không sửa AI provider/model configuration.
- Không tạo GitHub Actions mới trừ khi Audit chỉ ghi nhận gap.
- Không tự tạo branch.
- Không tạo PR.
- Không merge PR.
- Không merge `develop → main`.
- Không cập nhật Jira trực tiếp.

Kết quả hợp lệ:

```text
Sprint 11 Audit = PASS
Mandatory Gates PASS = 20/20
Ready to implement Sprint 11 = Yes
```

hoặc:

```text
Sprint 11 Audit = FAIL
Ready to implement Sprint 11 = No
```

hoặc:

```text
Sprint 11 Audit = BLOCKED
Ready to implement Sprint 11 = No
```

---

# 2. Official Sprint 11 Scope

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

Branch inventory:
30 Task + 10 Story + 8 Core Epic = 48
```

Recommended first technical Task:

```text
PAC-TASK-530
PAC-740
feature/PAC-740-task-530-add-graph-sync-status-permission-checks
```

---

# 3. Canonical Sources

Đọc và đối chiếu:

1. `AGENTS.md`
2. `.agents/rules/rules-w-pharmaassist.md`
3. `WORKING-CONTEXT.md`
4. `DESIGN.md`
5. `Jira/branch-on-jira.md`
6. `Jira/jira-mapping.md`
7. `Jira/2_Epic.md`
8. `Jira/3_Stories.md`
9. `Jira/4D_Task_List_Testing_Advanced_Future_436_580.md`
10. `Jira/4D_Task_Description_Testing_Advanced_Future_436_580.md`
11. `Jira/5_Sprint.md`
12. Sprint 10 Final Review Report.
13. MVP release checklist/tag/baseline evidence.
14. `work-context/sprint-11/sprint-11.md`
15. `work-context/sprint-11/sprint-11-progress.md`
16. Current Prisma schema và migrations.
17. Backend/frontend `package.json`.
18. Current Supabase Storage configuration.
19. Current Supabase Realtime configuration.
20. Current Neo4j services, Graph Sync và Graph-RAG modules.
21. Current AI provider/prompt configuration modules.
22. Current audit-log modules.
23. Current notification/scheduler capabilities.
24. Current Git/GitHub state và GitHub Actions runs.

Canonical priority:

```text
Jira/branch-on-jira.md
→ repository và Git history
→ GitHub PR/branch/CI evidence
→ Prisma/Supabase/Neo4j/runtime evidence
→ Sprint documents
→ Jira manual status
```

`Jira/branch-on-jira.md` là nguồn duy nhất cho Jira Key và exact branch.

---

# 4. Mandatory Gates

Sprint 11 Audit gồm 20 Gate:

1. Sprint 10 Final Review and MVP release baseline.
2. Repository and remote integrity.
3. Sprint scope and mapping.
4. Exact branch inventory.
5. GitHub workflow and CI readiness.
6. Project approval, capacity and release isolation.
7. Graph Sync status contract readiness.
8. Manual retry/rebuild safety readiness.
9. Read-only Graph Explorer safety.
10. AI provider/model configuration safety.
11. Prompt governance and approval readiness.
12. System Audit Log privacy/read-only readiness.
13. Supabase Storage security and lifecycle readiness.
14. Supabase Realtime fallback and checkout-authority safety.
15. Notification Center data rules and scheduled-job safety.
16. AI Business Narrative deterministic-input safety.
17. Testing strategy and MVP regression isolation.
18. Security, secrets and destructive-operation guards.
19. Technical execution order and governance.
20. Findings and final authorization.

PASS yêu cầu:

```text
Mandatory Gates PASS = 20/20
Blocking findings = 0
High findings = 0
```

---

# 5. Gate 01 — Sprint 10 Final Review and MVP Release Baseline

Xác minh:

- [ ] Sprint 10 Final Review = PASS.
- [ ] Ready for MVP Release = Yes.
- [ ] Sprint 10 Tasks = 101/101.
- [ ] Sprint 10 Release Stories = 6/6 PASS.
- [ ] Sprint 10 Core Epics = 4/4 PASS.
- [ ] Sprint 10 canonical branches = 111/111.
- [ ] Local Quality Gate = PASS.
- [ ] Applicable GitHub Actions checks = PASS.
- [ ] Blocking MVP findings = 0.
- [ ] High MVP findings = 0.
- [ ] MVP release baseline/tag/commit đã được ghi lại.
- [ ] Latest release-ready code tồn tại trên remote `develop`.
- [ ] Sprint 11 không cần thay đổi release criteria của MVP.

Nếu Sprint 10 Final Review chưa PASS:

```text
Gate 01 = BLOCKED
Ready to implement Sprint 11 = No
```

Evidence:

| Evidence | Expected | Actual | Result |
|---|---|---|---|
| Sprint 10 Final Review | PASS | — | Pending |
| Ready for MVP Release | Yes | — | Pending |
| Tasks | 101/101 | — | Pending |
| Release Stories | 6/6 | — | Pending |
| Core Epics | 4/4 | — | Pending |
| Branches | 111/111 | — | Pending |
| Blocking/High | 0/0 | — | Pending |
| MVP release baseline | Recorded | — | Pending |

```text
Gate 01 = PASS / FAIL / BLOCKED
```

---

# 6. Gate 02 — Repository and Remote Integrity

Commands:

```bash
git fetch --all --prune
git switch develop
git pull origin develop
git status --short
git rev-parse HEAD
git rev-parse origin/develop
git log origin/develop --oneline -n 250
```

Checklist:

- [ ] Current branch là `develop`.
- [ ] `HEAD = origin/develop`.
- [ ] Working tree sạch.
- [ ] Không unresolved conflict.
- [ ] Không untracked source/migration/workflow file quan trọng.
- [ ] Không debug bypass.
- [ ] Không disabled guard/test tạm thời.
- [ ] Sprint 10 Final Review report tồn tại trên `develop`.
- [ ] MVP release baseline xác định được.
- [ ] Sprint 11 implementation chưa bắt đầu.
- [ ] Không có Sprint 12 implementation chen vào.
- [ ] `WORKING-CONTEXT.md` phản ánh trạng thái mới nhất.

Sensitive-file scan:

```bash
git ls-files | grep -E '(^|/)\.env($|\.)|\.pem$|\.p12$|(^|/)id_rsa$|service-account.*\.json$' || true
```

```text
Gate 02 = PASS / FAIL / BLOCKED
```

---

# 7. Gate 03 — Sprint Scope and Mapping

Xác minh:

```text
Tasks = PAC-TASK-526 → PAC-TASK-555
Task count = 30
Jira Keys = PAC-736 → PAC-765

Stories = US-151 → US-160
Story count = 10
Story Points = 32

Core Epics = PAC-EPIC-22 → PAC-EPIC-29
Core Epic count = 8
```

Checklist:

- [ ] 30 Task đủ và không trùng.
- [ ] Mỗi Task map đúng Story/Epic.
- [ ] 10 Story đủ và không trùng.
- [ ] 8 Core Epic đủ và không trùng.
- [ ] Sprint 12 Tasks `PAC-TASK-556 → PAC-TASK-580` không bị kéo vào.
- [ ] Sprint 11 không thay đổi MVP acceptance criteria.
- [ ] Không biến advanced feature thành MVP dependency.
- [ ] Không mở rộng thành multi-store/multi-warehouse.
- [ ] Không thêm customer portal/e-commerce ngoài scope.
- [ ] Không raw Cypher console.
- [ ] Không graph write/editing feature.
- [ ] Không AI diagnosis/prescribing/dosage.
- [ ] Không AI tự tính report totals.
- [ ] Không Realtime làm checkout authority.

Summary:

| Scope | Expected | Actual | Result |
|---|---:|---:|---|
| Tasks | 30 | — | Pending |
| Stories | 10 | — | Pending |
| Core Epics | 8 | — | Pending |
| Story Points | 32 | — | Pending |

```text
Gate 03 = PASS / FAIL / BLOCKED
```

---

# 8. Gate 04 — Exact Branch Inventory

Expected:

```text
30 Task branches
10 Story branches
8 Core Epic branches
Total = 48
```

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

Last Task:

```text
PAC-TASK-555
PAC-765
feature/PAC-765-task-555-build-ai-business-report-narrative-ui
```

Checklist:

- [ ] 30/30 Task branches verified.
- [ ] 10/10 Story branches verified.
- [ ] 8/8 Core Epic branches verified.
- [ ] Không replacement branch.
- [ ] Không shortened/renamed branch.
- [ ] Technical order không đổi Jira mapping.
- [ ] Story/Epic branches chỉ dùng traceability.
- [ ] Không Story PR.
- [ ] Không Epic PR.

| Category | Expected | Verified | Result |
|---|---:|---:|---|
| Task | 30 | — | Pending |
| Story | 10 | — | Pending |
| Core Epic | 8 | — | Pending |
| **Total** | **48** | — | Pending |

Nếu branch thiếu:

```text
Không tự tạo branch
Không sửa branch slug
Không dùng branch gần giống
Dừng và báo blocker
```

```text
Gate 04 = PASS / FAIL / BLOCKED
```

---

# 9. Gate 05 — GitHub Workflow and CI Readiness

Xác minh:

- [ ] GitHub authentication hoạt động.
- [ ] Có quyền đọc 48 relevant remote branches.
- [ ] Có quyền push exact Task/Bug branch.
- [ ] Có quyền tạo PR vào `develop`.
- [ ] Có quyền đọc workflow runs/checks.
- [ ] GitHub Actions từ Sprint 10 đang hoạt động.
- [ ] Required checks đã được xác định.
- [ ] Local Quality Gate vẫn bắt buộc.
- [ ] Applicable CI checks bắt buộc.
- [ ] AI Agent không push trực tiếp `develop`.
- [ ] AI Agent không push trực tiếp `main`.
- [ ] AI Agent không merge `develop → main`.
- [ ] Không Story PR.
- [ ] Không Epic PR.
- [ ] Jira do Project Owner quản lý thủ công.

Expected Sprint 11 gate:

```text
Local Quality Gate = PASS
Applicable GitHub Actions checks = PASS
```

Không được dùng:

```text
CI = N/A
```

trừ khi Task thực sự không có applicable workflow và lý do được ghi rõ.

```text
Gate 05 = PASS / FAIL / BLOCKED
```

---

# 10. Gate 06 — Project Approval, Capacity and Release Isolation

Checklist:

- [ ] Project Leader approval = Yes.
- [ ] Team capacity cho Sprint 11 = Available.
- [ ] MVP release baseline/tag đã ghi.
- [ ] Sprint 11 không chặn MVP release.
- [ ] Advanced features có thể tắt/ẩn khi chưa PASS.
- [ ] Feature flag/permission strategy được xác định khi phù hợp.
- [ ] Incomplete advanced feature không expose.
- [ ] Rollback path về MVP baseline được xác định.
- [ ] Release branch/tag không bị thay đổi bởi Sprint 11 ngoài quy trình owner.
- [ ] Scope ưu tiên safety-first.
- [ ] Không giả định mọi thành viên có capacity như nhau.
- [ ] Project Owner chịu trách nhiệm Jira và `develop → main`.

Nếu Project Leader chưa phê duyệt:

```text
Gate 06 = BLOCKED
Ready to implement Sprint 11 = No
```

```text
Gate 06 = PASS / FAIL / BLOCKED
```

---

# 11. Gate 07 — Graph Sync Status Contract Readiness

Xác minh backend capability hiện có:

- [ ] Graph Sync job entity/status tồn tại.
- [ ] Pending/success/failed states rõ.
- [ ] Job detail contract rõ.
- [ ] Error summary có thể redacted.
- [ ] Freshness/degraded metadata tồn tại.
- [ ] List pagination/filter contract rõ nếu cần.
- [ ] Admin permission guard có chỗ tích hợp rõ.
- [ ] Staff/Warehouse phải bị từ chối.
- [ ] UI không được truy cập Neo4j trực tiếp.
- [ ] UI không được lấy raw connection info.
- [ ] Status endpoint không expose credentials.
- [ ] Current data đủ để xây UI mà không sửa business source-of-truth.

Required verification matrix:

| Actor | Expected |
|---|---|
| Admin | View list/detail |
| Staff | 403/hidden |
| Warehouse | 403/hidden |

```text
Gate 07 = PASS / FAIL / BLOCKED
```

---

# 12. Gate 08 — Manual Retry/Rebuild Safety Readiness

Xác minh:

- [ ] Safe retry service đã tồn tại hoặc contract rõ.
- [ ] Safe rebuild service đã tồn tại hoặc contract rõ.
- [ ] Action là Admin-only.
- [ ] Explicit confirmation strategy.
- [ ] Idempotency hoặc lock/concurrency guard.
- [ ] Environment/target verification.
- [ ] Rebuild scope bounded theo project/projection.
- [ ] Không global delete shared AuraDB.
- [ ] PostgreSQL không bị sửa bởi retry/rebuild.
- [ ] Failure isolation rõ.
- [ ] Action result/status được lưu.
- [ ] Audit event được tạo khi backend hỗ trợ.
- [ ] UI có thể hiển thị safe error summary.
- [ ] Manual action không bypass Graph Sync queue/rules tùy tiện.
- [ ] Không chạy action trong Audit.

Forbidden:

```cypher
MATCH (n) DETACH DELETE n
```

trên shared AuraDB.

```text
Gate 08 = PASS / FAIL / BLOCKED
```

---

# 13. Gate 09 — Read-only Graph Explorer Safety

Xác minh:

- [ ] Backend allowlisted query templates tồn tại.
- [ ] Không generic raw Cypher endpoint.
- [ ] Medicine → CONTAINS → ActiveIngredient supported.
- [ ] ActiveIngredient → INTERACTS_WITH → ActiveIngredient supported.
- [ ] Query parameters tách khỏi query string.
- [ ] Entity IDs validate.
- [ ] Depth/result count bounded.
- [ ] Timeout có hiệu lực.
- [ ] Node detail read-only.
- [ ] Relationship detail read-only.
- [ ] Unknown query type rejected.
- [ ] Raw Cypher input rejected.
- [ ] Internal Cypher không trả frontend.
- [ ] Neo4j credential không expose.
- [ ] Graph Explorer không quyết định checkout.
- [ ] Graph unavailable có safe error/degraded state.

Required rejection:

```text
raw Cypher request
→ rejected
→ query executed = false
```

```text
Gate 09 = PASS / FAIL / BLOCKED
```

---

# 14. Gate 10 — AI Provider/Model Configuration Safety

Xác minh:

- [ ] Provider configuration contract đã tồn tại.
- [ ] Model configuration contract đã tồn tại.
- [ ] Provider allowlist rõ.
- [ ] Model allowlist rõ.
- [ ] Secret/API key không trả frontend.
- [ ] Frontend chỉ hiển thị safe metadata.
- [ ] Backend validate provider/model.
- [ ] Unauthorized actor bị từ chối.
- [ ] Admin-only update.
- [ ] Invalid provider/model rejected.
- [ ] Google AI primary vẫn đúng.
- [ ] MockAI fallback vẫn có.
- [ ] Config change có audit khi backend hỗ trợ.
- [ ] No client-side provider secret storage.
- [ ] No secret in logs/errors.

```text
Gate 10 = PASS / FAIL / BLOCKED
```

---

# 15. Gate 11 — Prompt Governance and Approval Readiness

Xác minh:

- [ ] Prompt template entity/version tồn tại.
- [ ] Version metadata rõ.
- [ ] Approval status rõ.
- [ ] Active/approved semantics rõ.
- [ ] Unapproved prompt không được dùng chính thức.
- [ ] UI list/detail chỉ hiển thị safe metadata.
- [ ] Prompt body permission policy rõ.
- [ ] Prompt update/approval permission rõ.
- [ ] Prompt version recorded trong AI Audit.
- [ ] Historical audit không bị sửa khi prompt version mới tạo.
- [ ] Không overwrite version history.
- [ ] No secret embedded trong prompt metadata.
- [ ] MockAI path vẫn ghi version phù hợp.
- [ ] UI không bypass backend approval rule.

```text
Gate 11 = PASS / FAIL / BLOCKED
```

---

# 16. Gate 12 — System Audit Log Privacy and Read-only Readiness

Xác minh:

- [ ] Audit log entity/API tồn tại.
- [ ] Admin-only access.
- [ ] Read-only endpoint.
- [ ] Không edit/delete API cho UI.
- [ ] Pagination stable.
- [ ] Date/action/actor/entity filters validate.
- [ ] PII minimization/redaction.
- [ ] Token/password/connection string không lưu/hiển thị.
- [ ] Error payload không chứa secret.
- [ ] Historical audit immutability giữ nguyên.
- [ ] Empty/error/loading states có thể hỗ trợ.
- [ ] Unauthorized actors rejected.
- [ ] Export nếu không có trong Task thì không tự thêm.
- [ ] Audit log UI không thay audit persistence semantics.

```text
Gate 12 = PASS / FAIL / BLOCKED
```

---

# 17. Gate 13 — Supabase Storage Security and Lifecycle Readiness

Xác minh:

- [ ] Bucket strategy rõ.
- [ ] Public/private/signed URL policy rõ.
- [ ] Authorized upload permission rõ.
- [ ] Backend/service boundary rõ.
- [ ] Service-role key không ở frontend.
- [ ] Allowed MIME types rõ.
- [ ] File extension validation.
- [ ] File-size limit.
- [ ] Client MIME không được tin mù quáng.
- [ ] Executable/dangerous files rejected.
- [ ] Safe object path/naming.
- [ ] Filename injection/path traversal guarded.
- [ ] Medicine metadata update contract rõ.
- [ ] Failed metadata update có cleanup strategy.
- [ ] Replacement/removal semantics rõ.
- [ ] Orphan cleanup strategy rõ khi khả thi.
- [ ] Medicine không có ảnh vẫn hoạt động.
- [ ] Storage down không làm Medicine CRUD/POS hỏng.
- [ ] Test bucket/environment strategy an toàn.
- [ ] Không upload file trong Audit.

```text
Gate 13 = PASS / FAIL / BLOCKED
```

---

# 18. Gate 14 — Supabase Realtime Fallback and Checkout Safety

Xác minh:

- [ ] Realtime channel/table scope rõ.
- [ ] Subscription permission/RLS implications rõ.
- [ ] Event payload không chứa secret.
- [ ] Listener cleanup/unsubscribe.
- [ ] Reconnect strategy.
- [ ] Duplicate/out-of-order event strategy.
- [ ] Fallback polling/manual refresh.
- [ ] Polling interval bounded.
- [ ] No event/listener leak.
- [ ] Draft order không tự thay đổi ngoài kiểm soát.
- [ ] POS UI chỉ refresh displayed stock.
- [ ] Backend checkout revalidates sellable stock.
- [ ] Realtime không bypass FEFO.
- [ ] Realtime không bypass interaction check.
- [ ] Realtime unavailable không làm POS unusable.
- [ ] Current browser target Chrome/Chromium desktop.

Required invariant:

```text
Realtime = UX enhancement
Backend checkout validation = authority
```

```text
Gate 14 = PASS / FAIL / BLOCKED
```

---

# 19. Gate 15 — Notification Center and Scheduled-job Safety

Xác minh:

- [ ] Notification entity/data model tồn tại hoặc design rõ.
- [ ] User-scoped read/unread state.
- [ ] Unauthorized user không đọc notification người khác.
- [ ] Low-stock dùng sellable quantity.
- [ ] Expired batch không tính sellable.
- [ ] Near-expiry dùng current System Setting.
- [ ] Expired không bị duplicate thành near-expiry.
- [ ] Duplicate suppression key/window rõ.
- [ ] Scheduled scan bounded.
- [ ] Scheduler ownership/leader-election strategy rõ khi cần.
- [ ] Job idempotency/retry.
- [ ] Job status/log/observability.
- [ ] Failure không làm hỏng inventory data.
- [ ] Notification Center loading/empty/error states.
- [ ] Job không thay dashboard/report.
- [ ] Không gửi external notification channel ngoài scope.
- [ ] Không chạy job trên shared data trong Audit.

```text
Gate 15 = PASS / FAIL / BLOCKED
```

---

# 20. Gate 16 — AI Business Narrative Deterministic-input Safety

Xác minh:

- [ ] Input lấy từ report output deterministic.
- [ ] AI không query raw transactional data tùy ý.
- [ ] AI không tự tính revenue totals.
- [ ] AI không tự xếp hạng Top Medicines.
- [ ] AI không tự tính inventory quantities.
- [ ] Numeric report vẫn là authoritative display.
- [ ] Narrative không override report.
- [ ] Prompt template/version rõ.
- [ ] Provider/model recorded.
- [ ] Guardrail áp dụng.
- [ ] AI Audit áp dụng.
- [ ] Disclaimer áp dụng.
- [ ] PII minimized.
- [ ] Provider failure có safe fallback/error.
- [ ] MockAI path có thể demo/test.
- [ ] Diagnosis/prescribing/dosage blocked.
- [ ] Narrative UI có loading/empty/error state.
- [ ] Report filters/date range preserved in context.
- [ ] Token/context size bounded.

```text
Gate 16 = PASS / FAIL / BLOCKED
```

---

# 21. Gate 17 — Testing Strategy and MVP Regression Isolation

Xác minh planned tests:

- [ ] Graph Sync Admin permission.
- [ ] Staff/Warehouse denial.
- [ ] Retry/rebuild confirmation.
- [ ] Retry/rebuild concurrency/idempotency.
- [ ] Raw Cypher rejection.
- [ ] Query allowlist/parameter/bounds.
- [ ] AI provider/model validation.
- [ ] Secret exposure tests.
- [ ] Prompt approval/version tests.
- [ ] Audit-log permission/privacy tests.
- [ ] Storage type/size/path validation.
- [ ] Storage failure cleanup.
- [ ] Realtime event/reconnect/fallback tests.
- [ ] Checkout backend-authority regression.
- [ ] Notification calculation/dedup tests.
- [ ] Scheduled-job idempotency.
- [ ] AI Narrative deterministic-input/guardrail/audit tests.
- [ ] Chrome desktop E2E where critical.
- [ ] Basic responsive checks.
- [ ] MVP smoke/regression after each Epic or phase.

Required isolation rule:

```text
Advanced feature enabled → MVP remains PASS
Advanced feature disabled/unavailable → MVP remains PASS
```

Không dùng production/shared environment cho destructive tests.

```text
Gate 17 = PASS / FAIL / BLOCKED
```

---

# 22. Gate 18 — Security, Secrets and Destructive-operation Guards

Review:

- [ ] Supabase service-role key not in frontend.
- [ ] Neo4j credentials not exposed.
- [ ] Google AI key not exposed.
- [ ] GitHub secrets not hard-coded.
- [ ] Audit logs redact sensitive values.
- [ ] Graph errors redact connection details.
- [ ] Storage errors redact bucket/internal credentials.
- [ ] Realtime payload does not expose unnecessary PII.
- [ ] Notification data user-scoped.
- [ ] Prompt bodies/metadata follow permission policy.
- [ ] No raw Cypher endpoint.
- [ ] No graph write/editing UI.
- [ ] No global Neo4j delete on shared AuraDB.
- [ ] No production/shared upload/delete in tests.
- [ ] No scheduled job against wrong environment.
- [ ] No AI diagnosis/prescribing/dosage.
- [ ] No production deployment action added silently.
- [ ] CI permissions least privilege.
- [ ] Logs/evidence contain no secrets.
- [ ] File-upload path traversal guarded.
- [ ] SSRF/untrusted URL fetch avoided unless explicitly safe.

```text
Gate 18 = PASS / FAIL / BLOCKED
```

---

# 23. Gate 19 — Technical Execution Order and Governance

Recommended order:

```text
Graph permission safety
→ Graph Sync status UI
→ retry/rebuild
→ Graph Explorer
→ AI provider/prompt governance UI
→ Audit Log UI
→ Storage
→ Realtime
→ Notifications/scheduler
→ AI Business Narrative
```

Checklist:

- [ ] First technical Task = PAC-TASK-530.
- [ ] Permission guards đi trước Graph Sync UI/action.
- [ ] Safe retry/rebuild contract đi trước UI trigger.
- [ ] Allowlist security đi trước Graph Explorer usage.
- [ ] AI config secret safety đi trước UI.
- [ ] Storage validation đi trước broad upload UI.
- [ ] Realtime fallback đi cùng hoặc trước POS integration.
- [ ] Notification rules đi trước scheduled job rollout.
- [ ] AI Narrative dùng report contract đã ổn định.
- [ ] Task/Bug PR target `develop`.
- [ ] Không Story/Epic PR.
- [ ] Project Owner quản lý Jira.
- [ ] Project Owner merge `develop → main`.
- [ ] Incomplete feature được ẩn/tắt.
- [ ] MVP release baseline có rollback path.
- [ ] Sprint 11 không làm chậm release.
- [ ] Sprint 12 scope không bị kéo vào.

```text
Gate 19 = PASS / FAIL / BLOCKED
```

---

# 24. Gate 20 — Findings and Final Authorization

PASS chỉ khi:

```text
Gate 01 → Gate 19 = PASS

Tasks reconciled = 30/30
Stories reconciled = 10/10
Core Epics reconciled = 8/8
Branches verified = 48/48

Blocking findings = 0
High findings = 0

Sprint 11 Audit = PASS
Mandatory Gates PASS = 20/20
Ready to implement Sprint 11 = Yes
```

Nếu có Medium/Low:

- Ghi impact.
- Ghi owner.
- Ghi remediation.
- Xác định có chặn implementation hay không.

Nếu có Blocker/High:

```text
Sprint 11 Audit = FAIL/BLOCKED
Ready to implement Sprint 11 = No
```

```text
Gate 20 = PASS / FAIL / BLOCKED
```

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

| Finding ID | Gate | Severity | Area | Finding | MVP impact | Evidence | Required action | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|
| S11-AUD-001 | — | — | — | Chưa có | — | — | — | — | Open |

Rules:

- Không xóa finding.
- Khi resolved, cập nhật evidence/status.
- Blocker/High chặn `Ready to implement Sprint 11 = Yes`.
- Finding làm hỏng MVP phải được ưu tiên hơn advanced feature.

---

# 26. Branch Verification Register

## 26.1 Core Epic branches

| Epic | Expected | Remote verified | Result |
|---|---|---|---|
| PAC-EPIC-22 | Exact branch từ `branch-on-jira.md` | Pending | Pending |
| PAC-EPIC-23 | Exact branch từ `branch-on-jira.md` | Pending | Pending |
| PAC-EPIC-24 | Exact branch từ `branch-on-jira.md` | Pending | Pending |
| PAC-EPIC-25 | Exact branch từ `branch-on-jira.md` | Pending | Pending |
| PAC-EPIC-26 | Exact branch từ `branch-on-jira.md` | Pending | Pending |
| PAC-EPIC-27 | Exact branch từ `branch-on-jira.md` | Pending | Pending |
| PAC-EPIC-28 | Exact branch từ `branch-on-jira.md` | Pending | Pending |
| PAC-EPIC-29 | Exact branch từ `branch-on-jira.md` | Pending | Pending |

## 26.2 Story branches

| Story | Expected | Remote verified | Result |
|---|---|---|---|
| US-151 → US-160 | 10 exact branches | Pending | Pending |

## 26.3 Task branches

| Task range | Jira range | Expected | Remote verified | Result |
|---|---|---:|---:|---|
| PAC-TASK-526 → PAC-TASK-555 | PAC-736 → PAC-765 | 30 | — | Pending |

---

# 27. Environment and Capability Verification Register

| Environment/Capability | Expected | Actual | Evidence | Result |
|---|---|---|---|---|
| Git remote | Accessible | — | — | Pending |
| GitHub Actions | Active/green baseline | — | — | Pending |
| Local develop | Synced with origin | — | — | Pending |
| MVP release baseline | Recorded | — | — | Pending |
| Project Leader approval | Yes | — | — | Pending |
| Supabase/PostgreSQL | Safe | — | — | Pending |
| Supabase Storage | Safe config | — | — | Pending |
| Supabase Realtime | Safe scoped subscription | — | — | Pending |
| Neo4j AuraDB | Safe/readable | — | — | Pending |
| Graph retry/rebuild service | Safe/bounded | — | — | Pending |
| Graph query allowlist | Available | — | — | Pending |
| AI provider/model config | Safe contract | — | — | Pending |
| Prompt governance | Versioned/approved | — | — | Pending |
| System Audit Log | Read-only/privacy-safe | — | — | Pending |
| Notification scheduler | Bounded/idempotent | — | — | Pending |
| Backend tests | Available | — | — | Pending |
| Frontend tests | Available | — | — | Pending |
| Playwright Chrome | Available | — | — | Pending |

---

# 28. Audit Report Template

```markdown
# Sprint 11 Audit Report

## Decision

Sprint 11 Audit = PASS/FAIL/BLOCKED
Mandatory Gates PASS = x/20
Ready to implement Sprint 11 = Yes/No
MVP release readiness remains = Yes/No

## Dependency Status

- Sprint 10 Final Review:
- Ready for MVP Release:
- MVP release baseline/tag:
- Project Leader approval:
- Team capacity:
- Latest develop SHA:
- Working tree:
- Blocking/High MVP defects:

## Scope

- Tasks reconciled: x/30
- Stories reconciled: x/10
- Core Epics reconciled: x/8
- Branches verified: x/48

## Gate Results

1. Sprint 10/MVP baseline:
2. Repository integrity:
3. Scope/mapping:
4. Exact branches:
5. GitHub/CI:
6. Approval/capacity/release isolation:
7. Graph Sync status:
8. Retry/rebuild safety:
9. Graph Explorer:
10. AI provider/model:
11. Prompt governance:
12. Audit Log:
13. Supabase Storage:
14. Supabase Realtime:
15. Notifications/scheduler:
16. AI Narrative:
17. Testing/MVP isolation:
18. Security/destructive guards:
19. Execution/governance:
20. Final authorization:

## Findings

- Blocking:
- High:
- Medium:
- Low:
- Observations:

## Implementation Start

First technical Task:
PAC-TASK-530

Jira Key:
PAC-740

Exact branch:
feature/PAC-740-task-530-add-graph-sync-status-permission-checks

Implementation may start:
Yes/No
```

---

# 29. Initial and PASS States

Initial state:

```text
Sprint 10 implementation = In progress / pending completion
Sprint 10 Final Review = Pending
Ready for MVP Release = No

Sprint 11 plan = Prepared
Sprint 11 progress tracker = Prepared
Sprint 11 audit = Not started
Sprint 11 agent prompt = Not created
Sprint 11 final review prompt = Not created

Project Leader approval = Pending
Ready to implement Sprint 11 = No
```

PASS state:

```text
Sprint 10 Final Review = PASS
Ready for MVP Release = Yes
MVP release baseline/tag = Recorded
Project Leader approval = Yes

Sprint 11 Audit = PASS
Mandatory Gates PASS = 20/20
Blocking findings = 0
High findings = 0

30/30 exact Task branches = Verified
10/10 Story branches = Verified
8/8 Core Epic branches = Verified

Graph safety baseline = Approved
AI governance baseline = Approved
Storage safety baseline = Approved
Realtime fallback baseline = Approved
Notification rules/job safety = Approved
AI Narrative deterministic-input safety = Approved
MVP regression isolation = Approved

Ready to implement Sprint 11 = Yes
MVP release readiness remains = Yes
```

First technical Task after PASS:

```text
PAC-TASK-530
PAC-740
feature/PAC-740-task-530-add-graph-sync-status-permission-checks
```

---

# 30. Start Instruction for Auditor

Thực hiện:

1. Đọc toàn bộ canonical sources.
2. Xác minh Sprint 10 Final Review PASS.
3. Xác minh Ready for MVP Release = Yes.
4. Xác minh MVP release baseline/tag.
5. Xác minh Project Leader approval và team capacity.
6. Đồng bộ và kiểm tra remote `develop`.
7. Reconcile 30 Tasks, 10 Stories và 8 Core Epics.
8. Verify 48 exact branches.
9. Xác minh GitHub Actions và required checks.
10. Review Graph Sync status contract.
11. Review retry/rebuild safety.
12. Review Graph Explorer read-only/allowlist safety.
13. Review AI provider/model secret safety.
14. Review prompt governance.
15. Review Audit Log privacy/read-only behavior.
16. Review Supabase Storage validation/lifecycle.
17. Review Supabase Realtime fallback và checkout authority.
18. Review Notification rules và scheduled-job safety.
19. Review AI Narrative deterministic-input/guardrail/audit.
20. Review testing và MVP feature-isolation strategy.
21. Review secrets/destructive-operation guards.
22. Review execution order và governance.
23. Ghi findings.
24. Tạo Sprint 11 Audit Report.
25. Chỉ ghi `Ready to implement Sprint 11 = Yes` khi 20/20 Gate PASS.
26. Không bắt đầu coding trong Audit.
