# Sprint 8 Audit — PharmaAssist AI Intelligence

> **Pre-implementation audit cho Sprint 8**
>
> Repository path đề xuất:
>
> `work-context/sprint-8/sprint-8-audit.md`
>
> Audit này xác minh mức độ sẵn sàng trước khi triển khai Graph Sync, Neo4j Projection và Freshness Detection. Không triển khai production code, không tạo/apply migration Sprint 8 và không ghi dữ liệu thử nghiệm không kiểm soát lên Neo4j AuraDB trong quá trình audit.

---

# 1. Initial Status

| Field | Initial value |
|---|---|
| Audit status | **Not started** |
| Sprint 7 implementation | In progress |
| Sprint 7 Final Review | Pending |
| Ready for Sprint 8 | No |
| Ready to implement Sprint 8 | **No** |
| Latest `develop` stable | Not verified |
| GitHub access | Not verified |
| PostgreSQL/Supabase access | Not verified |
| Safe Supabase environment | Not verified |
| Neo4j AuraDB access | Not verified |
| Safe Neo4j environment | Not verified |
| Neo4j backend driver | Not verified |
| Exact Sprint 8 branch inventory | Not verified |
| Open Blocking/High defects | Unknown |
| Final decision | Not evaluated |

Kết quả hợp lệ sau audit:

```text
Audit status = Completed
Ready to implement Sprint 8 = Yes
Mandatory Gates PASS = 18/18
Blocking findings = None
```

hoặc:

```text
Audit status = Completed
Ready to implement Sprint 8 = No
Blocking findings = <count>
```

hoặc:

```text
Audit status = Blocked
Ready to implement Sprint 8 = No
Blocking reason = <reason>
```

Không được ghi `Ready to implement Sprint 8 = Yes` nếu còn bất kỳ Mandatory Gate nào chưa PASS.

---

# 2. Audit Scope

Sprint 8 có phạm vi chính thức:

```text
Tasks: PAC-TASK-356 → PAC-TASK-390
Task count: 35

Stories: US-117 → US-128
Story count: 12

Core Epic:
PAC-EPIC-14 — Graph Sync & Neo4j Projection

Supporting Epics:
PAC-EPIC-19 — Testing
PAC-EPIC-21 — Documentation

Prepared Task Jira range:
PAC-566 → PAC-600

Expected branch inventory:
35 Task + 12 Story + 1 Core Epic = 48

PostgreSQL:
Source of truth

Neo4j:
Read projection

Runtime integration:
Backend Neo4j driver/service

MCP:
Optional development/admin tooling only

CI:
N/A — GitHub Actions chưa được cấu hình

Merge gate:
Local Quality Gate
```

Audit gồm 18 Mandatory Gates:

1. Sprint 7 Final Review dependency.
2. Repository baseline and canonical documents.
3. Sprint scope and Logical Key mapping.
4. Exact branch inventory.
5. GitHub PR and merge capability.
6. PostgreSQL/Supabase safe environment.
7. Neo4j AuraDB safe environment.
8. Domain model and source-data dependencies.
9. Transactional outbox design.
10. Worker claiming, idempotency and retry design.
11. Neo4j driver, credential and Cypher safety.
12. Projection identity and graph model.
13. Canonical interaction edge and deactivation semantics.
14. Projection metadata and freshness design.
15. Failure isolation and core-system independence.
16. Prisma schema and migration safety.
17. Local testing and Local Quality Gate readiness.
18. Defects, risks and final authorization.

---

# 3. Audit Rules

- Audit trước, code sau.
- Không sửa production code trong lúc audit.
- Không tạo hoặc apply Sprint 8 migration trong lúc audit.
- Không tự tạo branch mới hoặc branch gần giống để thay thế.
- Không chỉnh sửa/rút gọn exact branch.
- `Jira/branch-on-jira.md` là nguồn duy nhất cho exact branch.
- Task/Bug PR target `develop`.
- Không tạo Story PR hoặc Epic PR.
- Không merge `develop → main`.
- Jira do Project Owner quản lý.
- GitHub Actions không phải gate Sprint 8.
- Không báo `CI = PASS`.
- Ghi đúng:

```text
CI = N/A — GitHub Actions chưa được cấu hình
Local Quality Gate = Pending/PASS/FAIL
```

- PostgreSQL là source of truth.
- Neo4j chỉ là projection.
- Không dual-write trực tiếp từ controller/business service sang Neo4j.
- Neo4j MCP không thay thế backend runtime driver.
- Không ghi URI, username, password hoặc token vào audit evidence.
- Không chạy destructive test trên production/demo Supabase hoặc AuraDB.
- Không hard-delete graph data nếu cần provenance.
- Không để Neo4j availability ảnh hưởng POS, Interaction Check hoặc Checkout.
- Không kéo Graph-RAG hoặc Sprint 9 implementation vào Sprint 8.

---

# 4. Required Documents and Evidence Priority

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
12. Sprint 7 plan/progress/audit/agent prompt/final review.
13. `work-context/sprint-8/sprint-8.md`
14. `work-context/sprint-8/sprint-8-progress.md`
15. Prisma schema và migrations.
16. Medicine, ActiveIngredient, MedicineActiveIngredient và DrugInteractionRule code.
17. Existing worker/job/outbox patterns nếu có.
18. Existing environment/configuration loader.
19. Existing logging/audit infrastructure.
20. Existing test scripts và test setup.
21. Neo4j AuraDB configuration evidence.
22. GitHub remote branches và PR capability evidence.

Evidence priority:

1. Canonical branch registry.
2. Repository code và Git history.
3. GitHub PR/merge evidence.
4. Prisma schema và migrations.
5. Supabase/PostgreSQL schema/data evidence.
6. Neo4j schema/data evidence.
7. Local test/build evidence.
8. Sprint progress/audit documents.
9. Jira manual status do Project Owner xác nhận.

---

# 5. Gate 01 — Sprint 7 Final Review Dependency

Sprint 8 implementation chỉ được bắt đầu khi Sprint 7 hoàn tất độc lập.

Checklist:

- [ ] Sprint 7 Task implementation hoàn tất.
- [ ] Sprint 7 Final Review report tồn tại.
- [ ] `Sprint 7 Final Review = PASS`.
- [ ] `Ready for Sprint 8 = Yes`.
- [ ] Latest Sprint 7 changes đã nằm trên remote `develop`.
- [ ] Không còn open Sprint 7 Task/Bug PR ảnh hưởng Sprint 8.
- [ ] Không có Blocking/High defect từ Sprint 7.
- [ ] AI Copilot không phụ thuộc Neo4j cho core behavior.
- [ ] Sprint 8 không cần sửa lại Sprint 7 architecture trước khi bắt đầu.

| Dependency | Required | Actual | Result | Severity |
|---|---|---|---|---|
| Sprint 7 Final Review | PASS | Pending | Pending | Blocker |
| Ready for Sprint 8 | Yes | No/Pending | Pending | Blocker |
| Latest `develop` | Stable | Not verified | Pending | Blocker |
| Open Sprint 7 blockers | 0 | Unknown | Pending | Blocker |
| Open Sprint 7 PRs | 0 | Unknown | Pending | Blocker |

```text
Gate 01 = Not evaluated
```

---

# 6. Gate 02 — Repository Baseline and Canonical Documents

Checklist:

- [ ] `AGENTS.md` được đọc.
- [ ] `.agents/rules/rules-w-pharmaassist.md` được đọc.
- [ ] `WORKING-CONTEXT.md` phản ánh trạng thái sau Sprint 7.
- [ ] `DESIGN.md` thống nhất với PostgreSQL source-of-truth và Neo4j projection.
- [ ] `sprint-8.md` và `sprint-8-progress.md` tồn tại.
- [ ] Không có tài liệu cũ yêu cầu Neo4j làm source of truth.
- [ ] Không có tài liệu cũ yêu cầu Graph-RAG trong Sprint 8.
- [ ] Không có workflow cũ yêu cầu Task → Story → Epic PR.
- [ ] Local `develop` đồng bộ `origin/develop`.
- [ ] Working tree sạch hoặc thay đổi được giải thích.
- [ ] Package manager và scripts thật đã được xác định.
- [ ] Existing logging/configuration conventions được xác định.

| Check | Evidence | Result | Finding |
|---|---|---|---|
| Rules and design aligned | — | Pending | — |
| Sprint 8 documents aligned | — | Pending | — |
| Local/remote `develop` aligned | — | Pending | — |
| Working tree controlled | — | Pending | — |
| Package scripts identified | — | Pending | — |
| Legacy Graph conflicts | — | Pending | — |

```text
Gate 02 = Not evaluated
```

---

# 7. Gate 03 — Sprint Scope and Logical Key Mapping

Expected scope:

```text
PAC-TASK-356 → PAC-TASK-390
35 Tasks

US-117 → US-128
12 Stories

PAC-EPIC-14
1 Core Epic
```

Prepared static mapping:

```text
Task Jira Keys:
PAC-566 → PAC-600
```

Checklist:

- [ ] Có đủ 35 Logical Tasks.
- [ ] Không thiếu Task trong range 356–390.
- [ ] Không có duplicate Logical Task.
- [ ] Có đủ 12 Stories.
- [ ] Mỗi Task map đúng Story.
- [ ] Mỗi Story map đúng PAC-EPIC-14 hoặc supporting Epic theo Task list.
- [ ] Task priorities/component phù hợp canonical source.
- [ ] Không có Task Sprint 9 lọt vào Sprint 8.
- [ ] Supporting testing/docs Tasks vẫn nằm trong Sprint scope.
- [ ] `sprint-8.md` và `sprint-8-progress.md` dùng cùng mapping.

Static precheck đã chuẩn bị:

```text
Task count = 35
Missing Task IDs = 0
Story count = 12
Core Epic count = 1
```

Static precheck không thay thế repository/runtime audit.

```text
Gate 03 = Not evaluated
```

---

# 8. Gate 04 — Exact Branch Inventory

Canonical source:

```text
Jira/branch-on-jira.md
```

Expected inventory:

```text
35 Task branches
12 Story branches — legacy/traceability only
1 Core Epic branch — legacy/traceability only
Total = 48
```

Prepared first Task:

```text
Logical Task:
PAC-TASK-356 / TASK-356

Prepared Jira Key:
PAC-566

Prepared exact branch:
feature/PAC-566-task-356-create-graph-sync-outbox-prisma-model
```

Prepared last Task:

```text
Logical Task:
PAC-TASK-390 / TASK-390

Prepared Jira Key:
PAC-600

Prepared exact branch:
feature/PAC-600-task-390-add-graph-sync-traceability-notes
```

Checklist:

- [ ] 35/35 Task branches khớp canonical registry.
- [ ] 12/12 Story branches khớp canonical registry.
- [ ] 1/1 Core Epic branch khớp canonical registry.
- [ ] Không có duplicate branch.
- [ ] Không có alternate/shortened branch.
- [ ] Không tự sửa slug bị cắt hoặc kết thúc bằng dấu `-`.
- [ ] First Task branch xác minh trên remote.
- [ ] Last Task branch xác minh trên remote.
- [ ] `sprint-8.md` đồng bộ canonical registry.
- [ ] `sprint-8-progress.md` đồng bộ canonical registry.

| Category | Expected | Verified | Result |
|---|---:|---:|---|
| Task | 35 | 0 | Pending |
| Story | 12 | 0 | Pending |
| Core Epic | 1 | 0 | Pending |
| **Total** | **48** | **0** | **Pending** |

Nếu branch không tồn tại:

```text
Dừng
→ báo blocker
→ không tự tạo branch
→ không dùng branch gần giống
```

```text
Gate 04 = Not evaluated
```

---

# 9. Gate 05 — GitHub PR and Merge Capability

Workflow:

```text
Task/Bug branch
→ PR vào develop
→ Local Quality Gate
→ merge vào develop
```

Checklist:

- [ ] Repository remote đúng.
- [ ] Có quyền fetch/pull `develop`.
- [ ] Có quyền checkout/push exact Task branch.
- [ ] Có quyền tạo PR vào `develop`.
- [ ] Có quyền merge Task/Bug PR khi gate PASS.
- [ ] Direct push vào `develop` không được dùng.
- [ ] Story/Epic PR không được dùng.
- [ ] `develop → main` chỉ Project Owner.
- [ ] GitHub không yêu cầu CI check không tồn tại.
- [ ] Có thể xác minh merge SHA và remote `develop`.
- [ ] Branch protection/ruleset không chặn workflow ngoài dự kiến.

| Capability | Actual | Evidence | Result |
|---|---|---|---|
| Fetch/pull `develop` | Unknown | — | Pending |
| Push exact Task branch | Unknown | — | Pending |
| Create PR to `develop` | Unknown | — | Pending |
| Merge Task/Bug PR | Unknown | — | Pending |
| Verify merge SHA | Unknown | — | Pending |
| CI required checks | Must be N/A/Off | — | Pending |

```text
Gate 05 = Not evaluated
```

---

# 10. Gate 06 — PostgreSQL / Supabase Safe Environment

Checklist:

- [ ] Supabase/PostgreSQL environment được xác định.
- [ ] Không phải production/demo database đang dùng để chấm bài.
- [ ] Có quyền đọc schema.
- [ ] Controlled write verification được phép.
- [ ] Có cleanup/rollback strategy.
- [ ] Không reset toàn bộ database.
- [ ] Không chạy destructive migration.
- [ ] Migration Sprint 8 chỉ apply sau authorization.
- [ ] Database URL/service-role key không ghi vào tài liệu.
- [ ] Test fixtures dùng relational IDs có kiểm soát.
- [ ] Outbox test không làm nhiễu production worker.
- [ ] Có cách tắt/pause worker hoặc namespace test data khi cần.

| Area | Required | Actual | Result |
|---|---|---|---|
| Connection available | Yes | Not verified | Pending |
| Environment safe | Yes | Not verified | Pending |
| Schema read access | Yes | Not verified | Pending |
| Controlled writes | Yes | Not verified | Pending |
| Cleanup strategy | Defined | Not verified | Pending |
| Worker isolation | Defined | Not verified | Pending |
| Secret exposure | None | Not verified | Pending |

```text
Gate 06 = Not evaluated
```

---

# 11. Gate 07 — Neo4j AuraDB Safe Environment

Checklist:

- [ ] AuraDB instance tồn tại.
- [ ] Instance name/ownership được xác định.
- [ ] Người quản lý credential được xác định.
- [ ] URI, username, password được lưu an toàn.
- [ ] Credentials chỉ nằm trong backend environment/secret store.
- [ ] Không commit credential vào Git.
- [ ] Không đưa credential vào log hoặc audit evidence.
- [ ] Có quyền đọc/ghi cần thiết.
- [ ] Có controlled test namespace hoặc cleanup strategy.
- [ ] Không chạy `MATCH (n) DETACH DELETE n` trên instance dùng chung.
- [ ] Có cách xác minh node/relationship trước và sau test.
- [ ] Có health-check strategy.
- [ ] Có strategy khi AuraDB unavailable.
- [ ] Neo4j MCP nếu dùng chỉ là tooling hỗ trợ.
- [ ] Runtime vẫn dùng backend Neo4j driver/service.

| Area | Required | Actual | Result |
|---|---|---|---|
| AuraDB available | Yes | Not verified | Pending |
| Credential custody | Defined | Not verified | Pending |
| Backend env config | Safe | Not verified | Pending |
| Read/write permission | Controlled | Not verified | Pending |
| Test cleanup | Defined | Not verified | Pending |
| Health check | Defined | Not verified | Pending |
| Outage handling | Safe | Not verified | Pending |
| MCP dependency | Optional only | Not verified | Pending |

```text
Gate 07 = Not evaluated
```

---

# 12. Gate 08 — Domain Model and Source-data Dependencies

Sprint 8 cần các source entities ổn định:

```text
Medicine
ActiveIngredient
MedicineActiveIngredient
DrugInteractionRule
```

Checklist:

- [ ] Medicine có stable relational ID.
- [ ] ActiveIngredient có stable relational ID.
- [ ] Medicine–ActiveIngredient mapping là authoritative.
- [ ] DrugInteractionRule map ActiveIngredient ↔ ActiveIngredient.
- [ ] Rule severity/description/recommendation có source fields rõ.
- [ ] Entity/rule active state có thể truy xuất.
- [ ] `updatedAt` hoặc sourceVersion strategy có thể xác định.
- [ ] Không dùng medicine name hoặc ingredient display name làm graph identity.
- [ ] Raw scraped ingredient string không trở thành authoritative node.
- [ ] Existing service update paths được xác định để emit outbox.
- [ ] Bulk seed/import/update path được xác định.
- [ ] Deactivate/reactivate path được xác định.

| Dependency | Existing state | Evidence | Result |
|---|---|---|---|
| Medicine identity | Unknown | — | Pending |
| ActiveIngredient identity | Unknown | — | Pending |
| MedicineActiveIngredient mapping | Unknown | — | Pending |
| DrugInteractionRule model | Unknown | — | Pending |
| Active/deactivate semantics | Unknown | — | Pending |
| Source version strategy | Unknown | — | Pending |
| Update paths | Unknown | — | Pending |

```text
Gate 08 = Not evaluated
```

---

# 13. Gate 09 — Transactional Outbox Design

Required pattern:

```text
PostgreSQL source change
+ GraphSyncOutbox event
= same transaction
```

Không dùng:

```text
Business service saves PostgreSQL
→ calls Neo4j directly
```

Checklist:

- [ ] `GraphSyncOutbox` model/design được xác định.
- [ ] Status enum/lifecycle được xác định.
- [ ] Event type được xác định.
- [ ] Entity type được xác định.
- [ ] Entity ID dùng relational ID.
- [ ] Source version được lưu hoặc derivable.
- [ ] Source transaction và outbox insert nhất quán.
- [ ] Update/deactivate events được emit.
- [ ] Idempotency/deduplication key strategy được xác định.
- [ ] Payload không chứa secret.
- [ ] Payload không chứa dữ liệu thừa.
- [ ] Indexes hỗ trợ pending-job query.
- [ ] Cleanup/retention strategy được xác định.
- [ ] Existing source flows không bị thay đổi ngoài phạm vi cần thiết.
- [ ] Transaction failure không tạo orphan outbox event.
- [ ] Outbox insert failure rollback source change khi bắt buộc.

Potential fields:

```text
id
entityType
entityId
eventType
sourceVersion
status
attemptCount
maxAttempts
nextAttemptAt
lockedAt
lockedBy
processedAt
lastErrorCode
lastErrorSummary
createdAt
updatedAt
```

Audit không ép tên field nếu repository convention khác, nhưng semantics phải tương đương.

```text
Gate 09 = Not evaluated
```

---

# 14. Gate 10 — Worker Claiming, Idempotency and Retry Design

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

- [ ] Worker process/boundary được xác định.
- [ ] Poll interval có giới hạn.
- [ ] Claiming là atomic hoặc concurrency-safe.
- [ ] Nhiều worker không claim cùng job.
- [ ] Lock timeout/stale-processing recovery được xác định.
- [ ] Handler dispatch theo entity/event type.
- [ ] Same event replay không tạo duplicate graph data.
- [ ] Retry count có giới hạn.
- [ ] Backoff strategy được xác định.
- [ ] Permanent errors không retry vô hạn.
- [ ] Failure code/summary được lưu an toàn.
- [ ] Worker shutdown đóng connection đúng.
- [ ] Worker không làm crash API process.
- [ ] Worker outage không ảnh hưởng core transaction.
- [ ] Tests cho parallel claim/replay/retry được chuẩn bị.

| Scenario | Expected | Evidence | Result |
|---|---|---|---|
| Two workers claim same job | One owner only | — | Pending |
| Same event processed twice | Same graph state | — | Pending |
| Transient Neo4j error | Bounded retry | — | Pending |
| Permanent data error | FAILED with safe evidence | — | Pending |
| Worker restarts | Pending/stale jobs recover safely | — | Pending |
| API remains online | Core app unaffected | — | Pending |

```text
Gate 10 = Not evaluated
```

---

# 15. Gate 11 — Neo4j Driver, Credential and Cypher Safety

Checklist:

- [ ] Neo4j driver package/version được xác định.
- [ ] Connection service nằm ở backend.
- [ ] URI/username/password đọc từ environment.
- [ ] Missing config trả safe error hoặc disables worker safely.
- [ ] Driver lifecycle được quản lý.
- [ ] Health check không expose credential.
- [ ] Cypher dùng parameters.
- [ ] Không nối raw user input vào Cypher.
- [ ] Query timeout có giới hạn.
- [ ] Session/transaction đóng đúng.
- [ ] Error mapping không log secret.
- [ ] Connection retry không vô hạn.
- [ ] Test doubles/mocks được xác định.
- [ ] MCP không phải runtime dependency.
- [ ] App có thể khởi động an toàn khi graph integration được cấu hình theo environment policy.

| Area | Existing state | Required action | Result |
|---|---|---|---|
| Neo4j driver | Unknown | Inspect | Pending |
| Connection service | Unknown | Inspect | Pending |
| Env validation | Unknown | Inspect | Pending |
| Parameterized Cypher | Unknown | Inspect | Pending |
| Health check | Unknown | Inspect | Pending |
| Driver shutdown | Unknown | Inspect | Pending |
| Error/log safety | Unknown | Inspect | Pending |

```text
Gate 11 = Not evaluated
```

---

# 16. Gate 12 — Projection Identity and Graph Model

Required nodes:

```text
(:Medicine {sourceId: <PostgreSQL Medicine ID>})
(:ActiveIngredient {sourceId: <PostgreSQL ActiveIngredient ID>})
```

Required relationships:

```text
(Medicine)-[:CONTAINS]->(ActiveIngredient)

(ActiveIngredient)-[:INTERACTS_WITH]->(ActiveIngredient)
```

Checklist:

- [ ] Medicine identity dùng relational ID.
- [ ] ActiveIngredient identity dùng relational ID.
- [ ] Unique constraints/index strategy được xác định.
- [ ] Node upsert là idempotent.
- [ ] Node update không tạo duplicate.
- [ ] CONTAINS upsert là idempotent.
- [ ] INTERACTS_WITH upsert là idempotent.
- [ ] Không tạo Medicine–Medicine authoritative relationship.
- [ ] Không cần Interaction node trong MVP.
- [ ] Rule properties được project đúng.
- [ ] `isActive`, source metadata và sync metadata được project.
- [ ] Missing referenced source entity được xử lý an toàn.
- [ ] Rebuild/replay strategy không tạo duplicate.
- [ ] Queries normal scope lọc active data.

INTERACTS_WITH metadata tối thiểu:

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

```text
Gate 12 = Not evaluated
```

---

# 17. Gate 13 — Canonical Interaction Edge and Deactivation

Canonical interaction rule:

- Lưu một hướng canonical dựa trên stable relational IDs.
- Query semantics vẫn coi interaction là symmetric.
- Reverse input không tạo relationship thứ hai ngoài kiểm soát.

Checklist:

- [ ] Canonical ordering function được xác định.
- [ ] Ordering dùng stable relational IDs hoặc normalized stable key.
- [ ] Reverse source order cho cùng rule cho cùng graph identity.
- [ ] Không lưu uncontrolled A→B và B→A duplicate.
- [ ] Unique/merge strategy hỗ trợ canonical edge.
- [ ] Query layer có thể đọc interaction theo cả hai phía.
- [ ] Rule deactivate cập nhật `isActive=false`.
- [ ] Medicine/ingredient deactivate cập nhật projection phù hợp.
- [ ] Không hard-delete nếu provenance cần giữ.
- [ ] Reactivation xử lý được.
- [ ] Normal queries loại inactive data.
- [ ] Deactivation không làm mất audit/provenance.

| Scenario | Expected | Evidence | Result |
|---|---|---|---|
| Rule A-B | One canonical edge | — | Pending |
| Rule input B-A | Same canonical edge | — | Pending |
| Rule update | Properties updated | — | Pending |
| Rule deactivate | `isActive=false` | — | Pending |
| Rule reactivate | Same edge active again | — | Pending |
| Normal query | Inactive excluded | — | Pending |

```text
Gate 13 = Not evaluated
```

---

# 18. Gate 14 — Projection Metadata and Freshness Design

Freshness không được chỉ dựa vào:

```text
currentTime - syncedAt
```

Freshness phải xét:

```text
sourceVersion
projected sourceVersion
relevant pending jobs
relevant failed jobs
missing projection
graph availability
```

Checklist:

- [ ] Source version strategy được xác định.
- [ ] Projected version được lưu.
- [ ] `sourceUpdatedAt` được lưu hoặc derivable.
- [ ] `syncedAt` được lưu.
- [ ] Relevant outbox jobs có thể query theo entity.
- [ ] Pending relevant job → stale.
- [ ] Failed relevant job → stale.
- [ ] Missing projection → stale.
- [ ] Projected version < source version → stale.
- [ ] Graph unavailable → unavailable/stale.
- [ ] Freshness response có machine-readable status.
- [ ] Freshness response có reason.
- [ ] Freshness check không mutate data.
- [ ] Sprint 9 có thể dùng result để fallback PostgreSQL.
- [ ] Không âm thầm dùng stale graph.

Suggested status contract:

```text
FRESH
STALE_PENDING_SYNC
STALE_FAILED_SYNC
STALE_VERSION_MISMATCH
MISSING_PROJECTION
GRAPH_UNAVAILABLE
```

Audit không ép exact enum nếu repository convention khác, nhưng semantics phải rõ.

```text
Gate 14 = Not evaluated
```

---

# 19. Gate 15 — Failure Isolation and Core-system Independence

Checklist:

- [ ] PostgreSQL source transaction không gọi Neo4j trực tiếp.
- [ ] Neo4j failure không rollback business transaction đã commit.
- [ ] Outbox giữ evidence để retry.
- [ ] POS không phụ thuộc graph connection.
- [ ] Interaction Check deterministic không phụ thuộc Neo4j.
- [ ] Checkout không phụ thuộc Neo4j.
- [ ] AI Copilot Sprint 7 không bị bắt buộc dùng graph.
- [ ] Worker crash không crash API.
- [ ] Health check graph không làm app trả lỗi toàn cục.
- [ ] Log graph failure không chứa credential.
- [ ] Failure storm có backoff/rate protection.
- [ ] Failed job có thể được quan sát/audit.
- [ ] Core database load không bị polling quá mức.
- [ ] App startup policy khi Neo4j unavailable được xác định.

Required failure scenarios:

```text
AuraDB unavailable
DNS/network failure
Invalid credentials
Cypher error
Transient timeout
Duplicate event
Malformed source data
Worker process restart
```

Mỗi scenario phải có expected safe behavior.

```text
Gate 15 = Not evaluated
```

---

# 20. Gate 16 — Prisma Schema and Migration Safety

Expected persistent scope:

```text
GraphSyncOutbox
GraphSyncJobStatus
source/retry/failure metadata
```

Checklist:

- [ ] Existing schema không đã có duplicate outbox model.
- [ ] Enum/model naming phù hợp convention.
- [ ] Migration additive.
- [ ] Không drop/rename source business tables.
- [ ] Indexes cho status/nextAttemptAt/createdAt phù hợp.
- [ ] Entity type/entity ID lookup được index khi cần.
- [ ] Retry/lock fields hỗ trợ concurrency design.
- [ ] Error fields không chứa raw credential.
- [ ] Payload size/type được giới hạn hợp lý.
- [ ] Prisma validate/generate strategy được xác định.
- [ ] Migration apply chỉ trên safe environment.
- [ ] Rollback/cleanup plan được xác định.
- [ ] No manual schema edits để né migration.
- [ ] Existing migrations không conflict.
- [ ] Worker schema và source transaction strategy tương thích.

| Check | Existing state | Evidence | Result |
|---|---|---|---|
| Duplicate model/enum | Unknown | — | Pending |
| Migration safety | Unknown | — | Pending |
| Index strategy | Unknown | — | Pending |
| Claim/retry fields | Unknown | — | Pending |
| Prisma scripts | Unknown | — | Pending |
| Safe apply environment | Unknown | — | Pending |

```text
Gate 16 = Not evaluated
```

---

# 21. Gate 17 — Local Testing and Local Quality Gate Readiness

GitHub Actions chưa được cấu hình:

```text
CI = N/A — GitHub Actions chưa được cấu hình
```

Audit phải xác định script thật trong repository:

| Area | Script/command | Exists | Baseline result |
|---|---|---|---|
| Backend lint | — | Unknown | Pending |
| Backend typecheck | — | Unknown | Pending |
| Backend targeted tests | — | Unknown | Pending |
| Backend build | — | Unknown | Pending |
| Prisma validate | — | Unknown | Pending |
| Prisma generate | — | Unknown | Pending |
| Migration status/check | — | Unknown | Pending |
| Supabase controlled tests | — | Unknown | Pending |
| Neo4j unit/contract tests | — | Unknown | Pending |
| Neo4j controlled integration | — | Unknown | Pending |

Required test strategy:

- [ ] Outbox emitter tests.
- [ ] Source transaction + outbox consistency tests.
- [ ] Worker atomic claim tests.
- [ ] Worker replay/idempotency tests.
- [ ] Retry and max-attempt tests.
- [ ] Medicine node tests.
- [ ] ActiveIngredient node tests.
- [ ] CONTAINS tests.
- [ ] INTERACTS_WITH canonical edge tests.
- [ ] Deactivation/reactivation tests.
- [ ] Freshness pending/failed/version-mismatch tests.
- [ ] AuraDB unavailable safety tests.
- [ ] POS/checkout independence regression.
- [ ] Secret/log safety review.
- [ ] Controlled integration cleanup strategy.

Local Quality Gate cho mỗi Task:

1. Exact branch và Jira Key đúng.
2. Acceptance criteria hoàn thành.
3. PR target `develop`.
4. Relevant tests PASS.
5. Lint/typecheck/build PASS hoặc N/A hợp lệ.
6. Prisma validate/generate PASS khi liên quan.
7. Supabase verification PASS hoặc N/A hợp lệ.
8. Neo4j verification PASS hoặc N/A hợp lệ.
9. Không destructive query.
10. Không credential/secret.
11. Diff đúng scope.
12. Không conflict.
13. GitHub báo mergeable.

```text
Gate 17 = Not evaluated
```

---

# 22. Gate 18 — Defects, Risks and Final Authorization

## Defects

- [ ] Blocking technical defects = 0.
- [ ] High technical defects = 0.
- [ ] Không có unresolved source-of-truth conflict.
- [ ] Không có unresolved dual-write path.
- [ ] Không có unresolved duplicate projection risk.
- [ ] Không có unresolved worker concurrency risk.
- [ ] Không có unresolved credential exposure.
- [ ] Không có unresolved destructive cleanup risk.
- [ ] Không có unresolved freshness ambiguity.

## Risk register

| Risk | Required mitigation | Actual | Result |
|---|---|---|---|
| Duplicate outbox events | Idempotent projection/dedup | Not verified | Pending |
| Two workers claim same job | Atomic claim | Not verified | Pending |
| Neo4j unavailable | Retry + core isolation | Not verified | Pending |
| Stale graph silently used | Explicit freshness status | Not verified | Pending |
| Credential exposure | Backend env only | Not verified | Pending |
| AuraDB test pollution | Controlled fixtures/cleanup | Not verified | Pending |
| Migration drift | Prisma/migration verification | Not verified | Pending |
| Inactive data returned | `isActive` filtering | Not verified | Pending |
| Reverse interaction duplicates | Canonical direction | Not verified | Pending |

## Final authorization table

| Mandatory Gate | Result |
|---|---|
| Gate 01 — Sprint 7 dependency | Pending |
| Gate 02 — Repository baseline | Pending |
| Gate 03 — Scope/mapping | Pending |
| Gate 04 — Exact branches | Pending |
| Gate 05 — GitHub capability | Pending |
| Gate 06 — Supabase safety | Pending |
| Gate 07 — Neo4j safety | Pending |
| Gate 08 — Domain dependencies | Pending |
| Gate 09 — Transactional outbox | Pending |
| Gate 10 — Worker/idempotency/retry | Pending |
| Gate 11 — Driver/Cypher/secret safety | Pending |
| Gate 12 — Projection model | Pending |
| Gate 13 — Canonical edge/deactivation | Pending |
| Gate 14 — Freshness design | Pending |
| Gate 15 — Failure isolation | Pending |
| Gate 16 — Prisma/migration | Pending |
| Gate 17 — Tests/Local Quality Gate | Pending |
| Gate 18 — Defects/final authorization | Pending |

```text
Gate 18 = Not evaluated
```

---

# 23. Task Coverage Audit

Audit Task ở mức phạm vi và dependency. Không triển khai code.

## Phase 1 — Transactional Outbox Foundation

```text
PAC-TASK-356 → PAC-TASK-361
```

Kiểm tra:

- Prisma model/status.
- Migration safety.
- Event contract.
- Medicine/Ingredient/Mapping/Rule emitters.
- Source transaction consistency.

## Phase 2 — Neo4j Connection, Worker and Claiming

```text
PAC-TASK-362 → PAC-TASK-365
```

Kiểm tra:

- Worker loop.
- Neo4j connection service.
- Health check.
- Atomic/idempotent job claiming.

## Phase 3 — Projection and Active-data Semantics

```text
PAC-TASK-366 → PAC-TASK-375
PAC-TASK-380
```

Kiểm tra:

- Medicine node.
- ActiveIngredient node.
- CONTAINS.
- INTERACTS_WITH.
- Canonical edge.
- Source metadata.
- Deactivation/active filters.

## Phase 4 — Retry, Failure Logging and Audit

```text
PAC-TASK-376 → PAC-TASK-379
```

Kiểm tra:

- Retry policy.
- Max retry.
- Safe failure logs.
- Failure audit/evidence.

## Phase 5 — Freshness Detection

```text
PAC-TASK-381 → PAC-TASK-384
```

Kiểm tra:

- Freshness service/contract.
- Pending/failed job state.
- Source/projected version mismatch.
- Missing/unavailable graph state.

## Phase 6 — Tests and Traceability

```text
PAC-TASK-385 → PAC-TASK-390
```

Kiểm tra:

- Outbox tests.
- Worker tests.
- Projection tests.
- Freshness tests.
- Regression/safety evidence.
- Traceability notes.

Coverage checklist:

- [ ] 35/35 Tasks nằm trong phase.
- [ ] Không thiếu Task.
- [ ] Không có Task Sprint 9.
- [ ] Technical order hợp dependency.
- [ ] Logical Task/Jira/branch mapping được xác minh.

---

# 24. Story Readiness Audit

| Story | Readiness | Mandatory dependency | Result |
|---|---|---|---|
| US-117 — Graph Sync Outbox | Unknown | Prisma/source transactions | Pending |
| US-118 — Graph Sync Worker | Unknown | Outbox and atomic claim | Pending |
| US-119 — Medicine Projection | Unknown | Driver and source identity | Pending |
| US-120 — ActiveIngredient Projection | Unknown | Driver and source identity | Pending |
| US-121 — CONTAINS Projection | Unknown | Mapping source and idempotency | Pending |
| US-122 — INTERACTS_WITH Projection | Unknown | Rule source and canonical model | Pending |
| US-123 — Canonical Interaction Edge | Unknown | Stable ordering and upsert | Pending |
| US-124 — Projection Metadata | Unknown | Source version strategy | Pending |
| US-125 — Retry Policy | Unknown | Worker lifecycle and backoff | Pending |
| US-126 — Failure Logging/Audit | Unknown | Safe log and status fields | Pending |
| US-127 — Freshness Detection | Unknown | Outbox state and source versions | Pending |
| US-128 — Deactivation Semantics | Unknown | Active state and query filters | Pending |

Checklist:

- [ ] 12/12 Stories mapped.
- [ ] Acceptance criteria không mâu thuẫn.
- [ ] Dependencies được ghi.
- [ ] Story branches chỉ dùng traceability.
- [ ] Story Acceptance Review chạy trên latest `develop`.

---

# 25. Static Branch Reconciliation Record

Static prepared mapping đã kiểm tra từ local project documents:

```text
Tasks found: 35
Missing Task IDs: 0

Story branches found: 12
Core Epic branches found: 1

First Task:
PAC-TASK-356
PAC-566
feature/PAC-566-task-356-create-graph-sync-outbox-prisma-model

Last Task:
PAC-TASK-390
PAC-600
feature/PAC-600-task-390-add-graph-sync-traceability-notes
```

Lưu ý:

- Đây chỉ là local document reconciliation.
- Remote branch existence vẫn là `Pending`.
- Không được chuyển Gate 04 thành PASS nếu chưa kiểm tra GitHub remote.

---

# 26. Findings Register

Severity:

```text
Blocker
High
Medium
Low
Observation
```

| Finding ID | Gate | Severity | Finding | Evidence | Required remediation | Owner | Status |
|---|---|---|---|---|---|---|---|
| S8-AUD-001 | — | — | Chưa có | — | — | — | Open |

Rules:

- Blocker: không được bắt đầu Sprint 8.
- High: phải xử lý trước Task bị ảnh hưởng.
- Medium/Low: ghi mitigation rõ.
- Observation: không phải defect.
- Không xóa finding; cập nhật status/evidence.

---

# 27. Bug Candidate Register

AI không tự tạo Jira Bug Key.

| Candidate ID | Severity | Affected Task/Story | Summary | Evidence | Needs Jira Bug Key | Status |
|---|---|---|---|---|---|---|
| S8-BUG-CAND-001 | — | — | Chưa có | — | No | Open |

Mẫu:

```text
Bug Candidate:
Severity:
Affected Task/Story:
Steps to Reproduce:
Actual:
Expected:
Evidence:
Suggested branch slug:
Project Owner decision required: Yes/No
```

---

# 28. Remediation Plan

| Remediation ID | Finding | Action | Validation | Owner | Target state | Status |
|---|---|---|---|---|---|---|
| S8-REM-001 | — | Chưa có | — | — | — | Not started |

Không sửa production code trong audit trừ khi Project Owner chuyển thành Task/Bug có Jira Key thật.

Documentation-only reconciliation có thể thực hiện riêng theo workflow hợp lệ.

---

# 29. Final Audit Decision

Chỉ PASS khi:

- 18/18 Mandatory Gates PASS.
- Sprint 7 Final Review PASS.
- latest `develop` stable.
- 35/35 Task branches verified.
- 12/12 Story branches verified.
- 1/1 Core Epic branch verified.
- GitHub PR/merge workflow hoạt động.
- Supabase/PostgreSQL environment an toàn.
- Neo4j AuraDB environment an toàn.
- Credentials an toàn.
- Transactional outbox design rõ.
- Worker atomic claim/idempotency/retry rõ.
- Projection identity/model rõ.
- Canonical edge rõ.
- Deactivation semantics rõ.
- Freshness contract rõ.
- Failure isolation rõ.
- Prisma/migration strategy an toàn.
- Local testing strategy sẵn sàng.
- Blocking findings = 0.
- High findings ảnh hưởng Task đầu tiên = 0.

## Final checklist

- [ ] Mandatory Gates PASS = 18/18.
- [ ] Blocking findings = 0.
- [ ] High findings affecting implementation = 0.
- [ ] 35/35 Tasks audited.
- [ ] 12/12 Stories audited.
- [ ] 48/48 expected branches reconciled với canonical registry và remote.
- [ ] First Task Jira/branch confirmed.
- [ ] `sprint-8.md` synchronized.
- [ ] `sprint-8-progress.md` synchronized.
- [ ] `WORKING-CONTEXT.md` ready for Sprint 8.
- [ ] Project Owner authorization recorded.

Current result:

```text
Audit status = Not started
Ready to implement Sprint 8 = No
Mandatory Gates PASS = 0/18
Blocking findings = Unknown
Recommended first Task = Pending authorization
```

Sau khi audit PASS, expected first Task theo prepared mapping:

```text
Logical Task:
PAC-TASK-356 / TASK-356

Jira Key:
PAC-566

Exact branch:
feature/PAC-566-task-356-create-graph-sync-outbox-prisma-model
```

Phải xác minh lại branch trong canonical registry và trên remote trước khi checkout.

---

# 30. Audit Report Summary

Điền sau khi thực hiện audit:

```text
Sprint: Sprint 8
Audit status:
Ready to implement Sprint 8:
Mandatory Gates PASS:
Sprint 7 Final Review:
Latest develop:
Tasks audited:
Stories audited:
Branches reconciled:
GitHub capability:
Supabase environment:
Neo4j AuraDB environment:
Credential safety:
Domain dependencies:
Transactional outbox:
Worker claiming/idempotency:
Retry/failure policy:
Projection model:
Canonical edge:
Deactivation:
Freshness:
Failure isolation:
Prisma/migration:
Local Quality Gate readiness:
Blocking findings:
High findings:
Open Bug Candidates:
Recommended first Task:
Recommended Jira Key:
Recommended exact branch:
Final decision:
```

---

# 31. Current Official State

```text
Sprint 7 implementation = In progress
Sprint 7 Final Review = Pending
Sprint 8 plan = Prepared
Sprint 8 progress tracker = Prepared
Sprint 8 audit = Not started
Sprint 8 agent prompt = Not created
Sprint 8 final review prompt = Not created
Ready to implement Sprint 8 = No
CI = N/A — GitHub Actions chưa được cấu hình
Quality Gate = Local Quality Gate
```
