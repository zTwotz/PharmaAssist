# Sprint 8 Final Review Prompt — PharmaAssist AI Intelligence

> **Independent final quality gate từ Sprint 8 sang Sprint 9**
>
> Repository path:
>
> `work-context/sprint-8/sprint-8-final-review-prompt.md`
>
> Chỉ chạy prompt này sau khi Sprint 8 implementation được báo cáo hoàn tất.

---

# 1. Vai trò và quyết định cuối

Bạn là AI Reviewer độc lập cho Sprint 8.

Phạm vi cần review:

```text
Sprint:
Sprint 8 — Graph Sync, Neo4j Projection & Freshness Detection

Tasks:
PAC-TASK-356 → PAC-TASK-390

Task count:
35

Stories:
US-117 → US-128

Story count:
12

Core Epic:
PAC-EPIC-14 — Graph Sync & Neo4j Projection

Supporting Epics:
PAC-EPIC-19 — Testing
PAC-EPIC-21 — Documentation

Canonical Task Jira range:
PAC-566 → PAC-600

PostgreSQL:
Source of truth

Neo4j:
Read projection

Runtime:
Backend Neo4j driver/service

MCP:
Optional development/admin tooling only

CI:
N/A — GitHub Actions chưa được cấu hình

Quality gate:
Local Quality Gate
```

Quyết định cuối chỉ được là:

```text
Sprint 8 Final Review = PASS
Ready for Sprint 9 = Yes
```

hoặc:

```text
Sprint 8 Final Review = FAIL
Ready for Sprint 9 = No
```

hoặc:

```text
Sprint 8 Final Review = BLOCKED
Ready for Sprint 9 = No
```

Không dùng:

```text
Ready for release = Yes
```

Sprint 8 chỉ cho phép chuyển sang Sprint 9.

Không tin hoàn toàn vào báo cáo của Coding Agent hoặc `sprint-8-progress.md`. Phải kiểm chứng độc lập bằng code, Git, GitHub, Prisma, Supabase/PostgreSQL, Neo4j và test evidence.

---

# 2. Tài liệu bắt buộc

Đọc và đối chiếu:

1. `AGENTS.md`
2. `.agents/rules/rules-w-pharmaassist.md`
3. `WORKING-CONTEXT.md`
4. `DESIGN.md`
5. `Jira/branch-on-jira.md`
6. `Jira/jira-mapping.md`
7. `Jira/2_Epic.md`
8. `Jira/3_Stories.md`
9. `Jira/4C_Task_List_MVP_AI_Graph_Report_Demo_291_435.md`
10. `Jira/4C_Task_Description_MVP_AI_Graph_Report_Demo_291_435.md`
11. `Jira/5_Sprint.md`
12. Sprint 7 Final Review evidence.
13. `work-context/sprint-8/sprint-8.md`
14. `work-context/sprint-8/sprint-8-progress.md`
15. `work-context/sprint-8/sprint-8-audit.md`
16. `work-context/sprint-8/sprint-8-agent-prompt.md`
17. Prisma schema và migrations.
18. Medicine, ActiveIngredient, mapping và DrugInteractionRule code.
19. GraphSyncOutbox, worker, Neo4j connection và projection code.
20. Freshness service/contract.
21. Tests, fixtures và smoke evidence.
22. Sprint 9 plan/audit documents nếu đã được chuẩn bị.

Evidence priority:

1. `Jira/branch-on-jira.md`
2. Repository code và Git history
3. GitHub PR/merge evidence
4. Prisma schema và migrations
5. Supabase/PostgreSQL schema/data evidence
6. Neo4j schema/data evidence
7. Local tests/builds
8. Sprint documents
9. Jira status do Project Owner quản lý

---

# 3. Final Review rules

- Không triển khai feature mới trong Final Review.
- Không mở rộng sang Sprint 9 Graph-RAG.
- Không thay đổi exact branch name.
- Không tạo Story PR hoặc Epic PR.
- Không push trực tiếp vào `develop` hoặc `main`.
- Không merge `develop → main`.
- Không sửa Jira bằng AI.
- Không tự tạo Jira Bug Key.
- Không chạy destructive migration.
- Không chạy destructive Cypher trên AuraDB dùng chung.
- Không để credentials xuất hiện trong evidence.
- Không báo CI PASS.
- Ghi đúng:

```text
CI = N/A — GitHub Actions chưa được cấu hình
Local Quality Gate evidence = PASS/FAIL
```

Nếu cần sửa defect:

```text
Project Owner cung cấp Jira Bug Key
→ exact Bug branch
→ sửa
→ local checks
→ PR vào develop
→ merge
→ chạy lại Final Review
```

---

# 4. Mandatory Final Review Gates

Final Review gồm 16 Gate:

1. Scope and Sprint 7 dependency.
2. Exact branch and Jira mapping.
3. GitHub PR and merge evidence.
4. Repository baseline and scope integrity.
5. PostgreSQL source-of-truth and transactional outbox.
6. Worker claiming, idempotency and retry.
7. Neo4j driver, configuration and secret safety.
8. Medicine and ActiveIngredient projection.
9. CONTAINS projection.
10. INTERACTS_WITH canonical projection.
11. Deactivation/reactivation semantics.
12. Projection metadata and freshness detection.
13. Failure isolation and core-system independence.
14. Prisma, migrations, Supabase and Neo4j evidence.
15. Tests and Local Quality Gate.
16. Story/Epic/Sprint completion and Sprint 9 handoff.

PASS yêu cầu:

```text
Mandatory Gates PASS = 16/16
Blocking findings = 0
High findings = 0
```

---

# 5. Gate 01 — Scope and Sprint 7 dependency

Xác minh:

- [ ] Sprint 7 Final Review = PASS.
- [ ] `Ready for Sprint 8 = Yes`.
- [ ] Sprint 8 Audit PASS 18/18 trước implementation.
- [ ] Latest remote `develop` chứa toàn bộ Sprint 8 changes.
- [ ] Phạm vi đúng `PAC-TASK-356 → PAC-TASK-390`.
- [ ] Có đúng 35 Task, 12 Story và 1 Core Epic.
- [ ] Không có Task Sprint 9 bị kéo vào.
- [ ] Không có Graph-RAG orchestration trong Sprint 8.
- [ ] Không có Admin Graph Explorer/Retry UI ngoài scope.
- [ ] PostgreSQL vẫn là source of truth.
- [ ] Neo4j chỉ là projection.

Expected scope:

```text
PAC-TASK-356 → PAC-TASK-390
US-117 → US-128
PAC-EPIC-14
```

```text
Gate 01 = PASS / FAIL / BLOCKED
```

---

# 6. Gate 02 — Exact branch and Jira mapping

Canonical source:

```text
Jira/branch-on-jira.md
```

Expected branch inventory:

```text
35 Task branches
12 Story branches — traceability only
1 Core Epic branch — traceability only
Total = 48
```

First Task:

```text
Logical Task:
PAC-TASK-356 / T-356

Jira Key:
PAC-566

Exact branch:
feature/PAC-566-task-356-create-graph-sync-outbox-prisma-model
```

Last Task:

```text
Logical Task:
PAC-TASK-390 / T-390

Jira Key:
PAC-600

Exact branch:
feature/PAC-600-task-390-add-graph-sync-traceability-notes
```

Checklist:

- [ ] 35/35 Task branches khớp canonical registry.
- [ ] 12/12 Story branches khớp canonical registry.
- [ ] 1/1 Core Epic branch khớp canonical registry.
- [ ] Không có alternate/shortened branch.
- [ ] Không tự sửa branch slug.
- [ ] Commit message chứa Jira Key thật.
- [ ] PR head branch đúng.
- [ ] PR base là `develop`.
- [ ] Story/Epic branch không dùng làm merge layer.

| Category | Expected | Verified | Result |
|---|---:|---:|---|
| Task | 35 | — | Pending |
| Story traceability | 12 | — | Pending |
| Core Epic traceability | 1 | — | Pending |
| **Total** | **48** | — | Pending |

```text
Gate 02 = PASS / FAIL / BLOCKED
```

---

# 7. Gate 03 — GitHub PR and merge evidence

Workflow chính thức:

```text
Task/Bug branch
→ PR vào develop
→ Local Quality Gate
→ merge vào develop
```

Checklist:

- [ ] Mọi applicable Task có PR.
- [ ] Source branch đúng canonical registry.
- [ ] Base branch là `develop`.
- [ ] PR state là MERGED.
- [ ] Merge/squash SHA tồn tại.
- [ ] Thay đổi xuất hiện trên remote `develop`.
- [ ] Không có Story PR.
- [ ] Không có Epic PR.
- [ ] Không có direct push vào `main`.
- [ ] Không có duplicate PR gây duplicate changes.
- [ ] Không còn open Sprint 8 Task/Bug PR.
- [ ] Không có unmerged blocking fix.

Summary:

| Metric | Expected | Actual |
|---|---:|---:|
| Completed Tasks | 35 | — |
| Applicable PRs merged | All | — |
| Open Sprint 8 PRs | 0 | — |
| Merge SHA verified | All applicable | — |

```text
Gate 03 = PASS / FAIL / BLOCKED
```

---

# 8. Gate 04 — Repository baseline and scope integrity

- [ ] Local `develop` đồng bộ `origin/develop`.
- [ ] Working tree sạch hoặc thay đổi được giải thích.
- [ ] Không còn debug code.
- [ ] Không còn TODO/FIXME mang tính blocker.
- [ ] Không có `.env`, credential, private key hoặc token được track.
- [ ] Không có direct dual-write từ business service sang Neo4j.
- [ ] Không có Neo4j dependency trong POS/Checkout.
- [ ] Không có Graph-RAG implementation bị kéo vào sớm.
- [ ] Không có MCP runtime dependency.
- [ ] Error response không lộ URI/password/stack trace.
- [ ] Cypher không nối raw input không tin cậy.
- [ ] API/DTO/config naming nhất quán.

Commands:

```bash
git fetch --all --prune
git switch develop
git pull origin develop
git status --short
git log origin/develop --oneline -n 100
```

Sensitive file review:

```bash
git ls-files | grep -E '(^|/)\.env($|\.)|\.pem$|\.p12$|(^|/)id_rsa$' || true
```

```text
Gate 04 = PASS / FAIL / BLOCKED
```

---

# 9. Gate 05 — PostgreSQL source-of-truth and transactional outbox

Required architecture:

```text
PostgreSQL source change
+ GraphSyncOutbox event
= same transaction
```

Forbidden architecture:

```text
Business transaction
→ direct Neo4j write
```

Checklist:

- [ ] PostgreSQL remains authoritative.
- [ ] GraphSyncOutbox model exists.
- [ ] Status/lifecycle fields exist.
- [ ] Source entity type and ID are stored.
- [ ] Source version is stored or derivable.
- [ ] Event type is explicit.
- [ ] Source update and outbox insert are transactionally consistent.
- [ ] Outbox insert failure rolls back required source change.
- [ ] No orphan event after transaction failure.
- [ ] Update/deactivate/reactivate paths emit events.
- [ ] Payload is minimal and contains no credential.
- [ ] Pending query indexes are appropriate.
- [ ] Cleanup/retention is documented.
- [ ] Existing business flows remain stable.

Required evidence:

```text
source update success
→ matching outbox event exists

transaction failure
→ neither source update nor outbox event is partially committed
```

```text
Gate 05 = PASS / FAIL / BLOCKED
```

---

# 10. Gate 06 — Worker claiming, idempotency and retry

Expected lifecycle:

```text
PENDING
→ PROCESSING
→ SUCCESS

PROCESSING
→ PENDING/retry

PROCESSING
→ FAILED
```

Checklist:

- [ ] Worker loop exists.
- [ ] Claiming is atomic/concurrency-safe.
- [ ] Two workers cannot process the same job concurrently.
- [ ] Lock timeout/recovery exists.
- [ ] Handler dispatch is deterministic.
- [ ] Same event replay is idempotent.
- [ ] Retry count is bounded.
- [ ] Backoff is bounded.
- [ ] Permanent error does not retry forever.
- [ ] Failure code/summary is persisted safely.
- [ ] Worker restart recovers safely.
- [ ] Worker shutdown closes resources.
- [ ] Worker failure does not crash API.
- [ ] Polling does not overload PostgreSQL.

Required scenarios:

```text
two workers / one job
same event replay
transient Neo4j error
permanent projection error
worker restart
stale PROCESSING recovery
max attempts reached
```

```text
Gate 06 = PASS / FAIL / BLOCKED
```

---

# 11. Gate 07 — Neo4j driver, configuration and secret safety

Checklist:

- [ ] Runtime uses backend Neo4j driver/service.
- [ ] MCP is optional tooling only.
- [ ] URI/username/password read from backend environment.
- [ ] Missing config fails safely.
- [ ] Driver lifecycle is managed.
- [ ] Health check does not expose credentials.
- [ ] Cypher is parameterized.
- [ ] Query timeout is bounded.
- [ ] Connection retry is bounded.
- [ ] Sessions/transactions close correctly.
- [ ] Logs do not contain credentials.
- [ ] Frontend does not receive graph credentials.
- [ ] Database does not store graph credentials.
- [ ] AuraDB environment used for verification is safe.
- [ ] No destructive global cleanup query is used.

Forbidden:

```cypher
MATCH (n) DETACH DELETE n
```

trên instance dùng chung.

```text
Gate 07 = PASS / FAIL / BLOCKED
```

---

# 12. Gate 08 — Medicine and ActiveIngredient projection

Required identity:

```text
Medicine sourceId = PostgreSQL Medicine ID
ActiveIngredient sourceId = PostgreSQL ActiveIngredient ID
```

Checklist:

- [ ] Medicine node uses relational identity.
- [ ] ActiveIngredient node uses relational identity.
- [ ] Unique constraint/index strategy exists.
- [ ] Node upsert is idempotent.
- [ ] Node update does not create duplicate.
- [ ] Raw scraped ingredient strings are not authoritative nodes.
- [ ] `isActive` is projected.
- [ ] `sourceVersion` is projected.
- [ ] `sourceUpdatedAt` is projected.
- [ ] `syncedAt` is projected.
- [ ] Missing source data is handled safely.
- [ ] Replay produces same graph state.
- [ ] Controlled Neo4j verification PASS.

Required evidence:

```text
first projection
→ one node

same event replay
→ still one node

source update
→ same node updated
```

```text
Gate 08 = PASS / FAIL / BLOCKED
```

---

# 13. Gate 09 — CONTAINS projection

Required relationship:

```text
(Medicine)-[:CONTAINS]->(ActiveIngredient)
```

Checklist:

- [ ] Source is official MedicineActiveIngredient mapping.
- [ ] Relationship uses stable source IDs.
- [ ] Upsert is idempotent.
- [ ] Replay does not create duplicate relationship.
- [ ] Mapping update is reflected.
- [ ] Mapping deactivate/removal semantics are explicit.
- [ ] Missing Medicine/Ingredient node is handled safely.
- [ ] Relationship metadata is sufficient.
- [ ] No raw string relationship source is used.
- [ ] Controlled Neo4j verification PASS.

Required scenarios:

```text
new mapping
existing mapping replay
mapping update
mapping deactivate/remove
missing source node
```

```text
Gate 09 = PASS / FAIL / BLOCKED
```

---

# 14. Gate 10 — INTERACTS_WITH canonical projection

Required relationship:

```text
(ActiveIngredient)-[:INTERACTS_WITH]->(ActiveIngredient)
```

Required metadata:

```text
ruleId
severity
description
recommendation
isActive
sourceVersion
sourceUpdatedAt
syncedAt
```

Checklist:

- [ ] Relationship source is DrugInteractionRule.
- [ ] Relationship is between ActiveIngredient nodes.
- [ ] No Medicine–Medicine authoritative edge exists.
- [ ] Canonical direction uses stable relational IDs.
- [ ] Reverse input maps to same canonical relationship.
- [ ] Upsert is idempotent.
- [ ] Rule update changes same relationship.
- [ ] Rule replay does not duplicate relationship.
- [ ] Query semantics support both ingredient directions.
- [ ] Rule provenance remains traceable.
- [ ] Controlled Neo4j verification PASS.

Required scenarios:

```text
A-B first projection
B-A equivalent source order
same rule replay
severity update
recommendation update
```

```text
Gate 10 = PASS / FAIL / BLOCKED
```

---

# 15. Gate 11 — Deactivation and reactivation semantics

Checklist:

- [ ] Medicine deactivate updates `isActive=false`.
- [ ] ActiveIngredient deactivate updates `isActive=false`.
- [ ] DrugInteractionRule deactivate updates relationship `isActive=false`.
- [ ] Mapping deactivate/remove behavior is explicit.
- [ ] No hard-delete when provenance must remain.
- [ ] Reactivation uses same node/relationship identity.
- [ ] Normal queries exclude inactive data.
- [ ] Debug/admin queries can include inactive data only when intended.
- [ ] History/provenance is preserved.
- [ ] Deactivation replay remains idempotent.
- [ ] Tests PASS.

Required scenarios:

```text
active → inactive
inactive replay
inactive → active
normal active-only query
provenance inspection
```

```text
Gate 11 = PASS / FAIL / BLOCKED
```

---

# 16. Gate 12 — Projection metadata and freshness detection

Freshness must not rely only on elapsed time from `syncedAt`.

Required signals:

```text
sourceVersion
projected sourceVersion
pending relevant job
failed relevant job
missing projection
graph availability
```

Checklist:

- [ ] Source version strategy is defined.
- [ ] Projected version is stored.
- [ ] `sourceUpdatedAt` is stored/derivable.
- [ ] `syncedAt` is stored.
- [ ] Relevant outbox jobs can be queried by entity.
- [ ] Pending job marks graph stale.
- [ ] Failed job marks graph stale.
- [ ] Version mismatch marks graph stale.
- [ ] Missing projection is distinct.
- [ ] Graph unavailable is distinct.
- [ ] Freshness result has machine-readable status.
- [ ] Freshness result has reason.
- [ ] Freshness check does not mutate data.
- [ ] Stale graph is not silently trusted.
- [ ] Sprint 9 can consume the contract for PostgreSQL fallback.

Expected equivalent states:

```text
FRESH
STALE_PENDING_SYNC
STALE_FAILED_SYNC
STALE_VERSION_MISMATCH
MISSING_PROJECTION
GRAPH_UNAVAILABLE
```

```text
Gate 12 = PASS / FAIL / BLOCKED
```

---

# 17. Gate 13 — Failure isolation and core-system independence

Checklist:

- [ ] Neo4j write is asynchronous from source business transaction.
- [ ] Graph failure does not corrupt PostgreSQL source state.
- [ ] Outbox preserves retry evidence.
- [ ] POS remains operational when Neo4j is unavailable.
- [ ] Interaction Check remains operational.
- [ ] Checkout remains operational.
- [ ] Sprint 7 AI Copilot remains operational without graph.
- [ ] Worker crash does not crash API.
- [ ] Graph health failure does not make whole app unavailable.
- [ ] Failure storms use backoff/rate protection.
- [ ] Safe error summaries contain no credential.
- [ ] Core database polling load is acceptable.
- [ ] Source-of-truth behavior is unchanged.

Required failure scenarios:

```text
AuraDB unavailable
invalid credentials
network timeout
Cypher error
malformed source data
worker restart
duplicate event
```

```text
Gate 13 = PASS / FAIL / BLOCKED
```

---

# 18. Gate 14 — Prisma, migrations, Supabase and Neo4j evidence

Expected persistent scope:

```text
GraphSyncOutbox
GraphSyncJobStatus
source/retry/failure metadata
```

Checklist:

- [ ] Prisma schema is valid.
- [ ] Migration files are committed.
- [ ] Migration history is consistent.
- [ ] No unexplained drift.
- [ ] Migration is additive or safely planned.
- [ ] No unauthorized drop/rename of source tables.
- [ ] Indexes support polling/claiming.
- [ ] Lock/retry fields support concurrency design.
- [ ] Error fields do not store credentials.
- [ ] Supabase verification uses safe environment.
- [ ] Neo4j verification uses safe environment.
- [ ] Test fixtures are cleaned up.
- [ ] No destructive database reset.
- [ ] No destructive AuraDB-wide cleanup.
- [ ] Prisma validate/generate PASS.
- [ ] Controlled success/failure verification PASS.

Evidence summary:

| Area | Required | Actual | Result |
|---|---|---|---|
| Prisma validate | PASS | — | Pending |
| Prisma generate | PASS | — | Pending |
| Migration status | Clean | — | Pending |
| Supabase apply | Safe/PASS | — | Pending |
| Outbox data | Verified | — | Pending |
| Neo4j projection | Verified | — | Pending |
| Cleanup | Verified | — | Pending |

```text
Gate 14 = PASS / FAIL / BLOCKED
```

---

# 19. Gate 15 — Tests and Local Quality Gate

GitHub Actions:

```text
CI = N/A — GitHub Actions chưa được cấu hình
```

Required regression:

- [ ] Backend lint PASS.
- [ ] Backend typecheck PASS.
- [ ] Backend build PASS.
- [ ] Relevant unit tests PASS.
- [ ] Relevant integration tests PASS.
- [ ] Outbox emitter tests PASS.
- [ ] Source transaction consistency tests PASS.
- [ ] Atomic claim tests PASS.
- [ ] Duplicate worker prevention tests PASS.
- [ ] Replay/idempotency tests PASS.
- [ ] Retry/max-attempt tests PASS.
- [ ] Medicine projection tests PASS.
- [ ] ActiveIngredient projection tests PASS.
- [ ] CONTAINS tests PASS.
- [ ] INTERACTS_WITH canonical edge tests PASS.
- [ ] Deactivation/reactivation tests PASS.
- [ ] Freshness state tests PASS.
- [ ] AuraDB unavailable safety tests PASS.
- [ ] POS/Checkout independence regression PASS.
- [ ] Prisma validate/generate PASS.
- [ ] Controlled Supabase verification PASS.
- [ ] Controlled Neo4j verification PASS.

Local Quality Gate evidence:

- [ ] 35/35 Task Local Quality Gates PASS.
- [ ] N/A values have valid reasons.
- [ ] No required check was skipped.
- [ ] No secret in diff/log/evidence.
- [ ] No out-of-scope implementation.
- [ ] Full commands and exit status are recorded.

```text
Gate 15 = PASS / FAIL / BLOCKED
```

---

# 20. Gate 16 — Completion, defects and Sprint 9 handoff

## Task completion

- [ ] 35/35 Tasks complete.
- [ ] All applicable PRs merged into `develop`.
- [ ] No open Sprint 8 Task/Bug PR.
- [ ] Branch/commit/PR/merge evidence complete.

## Story review

- [ ] 12/12 Story Acceptance Reviews PASS.
- [ ] Reviews run on latest `develop`.
- [ ] No Story PR.
- [ ] No Story merge layer.

## Epic review

- [ ] PAC-EPIC-14 Integration/Regression Review PASS.
- [ ] Review run on latest `develop`.
- [ ] No Epic PR.
- [ ] No Epic merge layer.

## Defects

- [ ] Blocking defects = 0.
- [ ] High defects = 0.
- [ ] No unresolved duplicate-projection defect.
- [ ] No unresolved worker-concurrency defect.
- [ ] No unresolved source-of-truth defect.
- [ ] No unresolved credential exposure.
- [ ] No unresolved freshness defect.
- [ ] No unresolved destructive cleanup risk.

## Documentation

- [ ] `sprint-8-progress.md` updated.
- [ ] `WORKING-CONTEXT.md` updated.
- [ ] Graph Sync traceability notes complete.
- [ ] Jira manual update queue prepared.
- [ ] Sprint 9 dependency handoff documented.

## Sprint 9 readiness

Sprint 9 may depend on:

```text
stable GraphSyncOutbox
working Neo4j projection
freshness contract
sourceVersion metadata
safe Neo4j connection
PostgreSQL source-of-truth fallback readiness
```

```text
Gate 16 = PASS / FAIL / BLOCKED
```

---

# 21. Findings Register

Severity:

```text
Blocker
High
Medium
Low
Observation
```

| Finding ID | Gate | Severity | Finding | Evidence | Required action | Status |
|---|---|---|---|---|---|---|
| S8-FR-001 | — | — | Chưa có | — | — | Open |

Rules:

- Blocker/High làm Final Review FAIL hoặc BLOCKED.
- Medium/Low phải ghi tác động và remediation.
- Observation không phải defect.
- Không xóa finding; chỉ cập nhật status/evidence.

---

# 22. Bug Candidate Register

AI không tự tạo Jira Bug Key.

| Candidate ID | Severity | Affected Task/Story | Summary | Evidence | Needs Jira Bug Key | Status |
|---|---|---|---|---|---|---|
| S8-FR-BUG-001 | — | — | Chưa có | — | No | Open |

Mẫu:

```text
Bug Candidate:
Severity:
Affected Task/Story:
Steps to Reproduce:
Actual:
Expected:
Evidence:
Project Owner decision required: Yes/No
```

---

# 23. Final decision rules

## PASS

Chỉ PASS khi:

```text
16/16 Mandatory Gates PASS
35/35 Tasks verified
12/12 Story Reviews PASS
PAC-EPIC-14 Review PASS
All applicable PRs merged into develop
Transactional outbox PASS
Worker atomic claim/idempotency PASS
Retry/failure handling PASS
Medicine/Ingredient projection PASS
CONTAINS PASS
Canonical INTERACTS_WITH PASS
Deactivation/reactivation PASS
Freshness detection PASS
Failure isolation PASS
Prisma/Supabase/Neo4j PASS
Blocking defects = 0
High defects = 0
```

Kết quả:

```text
Sprint 8 Final Review = PASS
Ready for Sprint 9 = Yes
```

## FAIL

Dùng khi implementation hoặc test không đạt nhưng có thể sửa:

```text
Sprint 8 Final Review = FAIL
Ready for Sprint 9 = No
Failed Gates:
Required fixes:
```

## BLOCKED

Dùng khi không thể kiểm chứng vì thiếu quyền, environment hoặc evidence:

```text
Sprint 8 Final Review = BLOCKED
Ready for Sprint 9 = No
Blocking reason:
Required owner action:
```

Không PASS khi:

- test chưa chạy;
- applicable PR chưa merge;
- branch sai;
- outbox transaction chưa verify;
- worker concurrency chưa verify;
- Neo4j projection chưa verify;
- freshness chưa verify;
- Supabase/Neo4j environment chưa an toàn;
- Blocking/High defect còn mở.

---

# 24. Final report format

```markdown
# Sprint 8 Final Review Report

## Decision

Sprint 8 Final Review = PASS/FAIL/BLOCKED
Ready for Sprint 9 = Yes/No

## Scope

- Tasks verified: x/35
- Stories reviewed: x/12
- Epic reviewed: x/1
- Branches reconciled: x/48
- Applicable PRs merged: x/x
- Open Sprint 8 PRs: x

## Gate Results

1. Scope/dependency: PASS/FAIL/BLOCKED
2. Branch/Jira mapping: PASS/FAIL/BLOCKED
3. GitHub PR/merge evidence: PASS/FAIL/BLOCKED
4. Repository baseline: PASS/FAIL/BLOCKED
5. Source-of-truth/outbox: PASS/FAIL/BLOCKED
6. Worker/idempotency/retry: PASS/FAIL/BLOCKED
7. Neo4j driver/config/security: PASS/FAIL/BLOCKED
8. Medicine/Ingredient projection: PASS/FAIL/BLOCKED
9. CONTAINS projection: PASS/FAIL/BLOCKED
10. INTERACTS_WITH canonical projection: PASS/FAIL/BLOCKED
11. Deactivation/reactivation: PASS/FAIL/BLOCKED
12. Freshness detection: PASS/FAIL/BLOCKED
13. Failure isolation: PASS/FAIL/BLOCKED
14. Prisma/Supabase/Neo4j: PASS/FAIL/BLOCKED
15. Tests/Local Quality Gate: PASS/FAIL/BLOCKED
16. Completion/defects/handoff: PASS/FAIL/BLOCKED

## Key Evidence

- develop SHA:
- Representative PRs:
- Outbox transaction:
- Worker claim/idempotency:
- Retry/failure:
- Medicine projection:
- ActiveIngredient projection:
- CONTAINS:
- INTERACTS_WITH:
- Deactivation:
- Freshness:
- Failure isolation:
- Prisma/migration:
- Supabase:
- Neo4j:
- Local tests/build:

## Findings

- Blocking:
- High:
- Medium:
- Low:
- Observations:

## Required Actions

- None / list actions

## Sprint 9 Handoff

- Next Sprint: Sprint 9
- Scope: Graph-RAG, PostgreSQL fallback, provenance and AI explanation over graph
- Sprint 9 Audit may start: Yes/No
- Sprint 9 implementation may start: No — requires Sprint 9 Audit PASS
```

---

# 25. Sprint 9 handoff

Chỉ khi:

```text
Sprint 8 Final Review = PASS
Ready for Sprint 9 = Yes
```

Handoff phải ghi tối thiểu:

```text
GraphSyncOutbox = Stable
Worker = Stable
Neo4j projection = Stable
Freshness contract = Stable
PostgreSQL remains source of truth
Neo4j stale/unavailable state = Detectable
Sprint 9 Audit may start = Yes
Sprint 9 implementation may start = No
```

Phải xác minh Sprint 9 Task range, Jira Keys và exact branches từ canonical project documents trước khi tạo prompt triển khai Sprint 9.

Final Reviewer không được bắt đầu Sprint 9 implementation trong cùng phiên review.

---

# 26. Start Instruction

Bắt đầu Final Review theo thứ tự:

1. Đọc toàn bộ tài liệu bắt buộc.
2. Xác minh remote `develop`.
3. Đối chiếu 35 Task, 12 Story, 1 Core Epic và 48 branch.
4. Kiểm tra PR/merge evidence.
5. Review PostgreSQL source-of-truth và outbox transaction.
6. Verify worker claiming, idempotency và retry.
7. Verify Neo4j driver, credentials và Cypher safety.
8. Verify Medicine/ActiveIngredient projection.
9. Verify CONTAINS.
10. Verify canonical INTERACTS_WITH.
11. Verify deactivation/reactivation.
12. Verify freshness detection.
13. Verify failure isolation.
14. Verify Prisma/Supabase/Neo4j.
15. Chạy local tests/builds.
16. Kiểm tra open defects.
17. Cập nhật Findings Register.
18. Xuất Final Review Report.
19. Chỉ ghi `Ready for Sprint 9 = Yes` khi 16/16 Gates PASS.
20. Không merge `develop → main`.
