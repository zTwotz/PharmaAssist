# Sprint 8 — Graph Sync, Neo4j Projection & Freshness Detection

> **PharmaAssist AI Intelligence**
>
> Repository path đề xuất:
>
> `work-context/sprint-8/sprint-8.md`

## Canonical Sources

Các nguồn chính thức:

1. `Jira/branch-on-jira.md` — Jira Key và exact branch.
2. `Jira/3_Stories.md` — Story, Epic, priority và acceptance criteria.
3. `Jira/4C_Task_List_MVP_AI_Graph_Report_Demo_291_435.md` — Task mapping.
4. `Jira/4C_Task_Description_MVP_AI_Graph_Report_Demo_291_435.md` — yêu cầu chi tiết.
5. `Jira/5_Sprint.md` — Sprint range và MVP gate.

Quy tắc:

- PostgreSQL là source of truth; Neo4j chỉ là projection.
- `Jira/branch-on-jira.md` là nguồn duy nhất cho exact branch.
- Không đổi, rút gọn hoặc tự tạo branch thay thế.
- Task/Bug PR target `develop`; không tạo Story PR hoặc Epic PR.
- GitHub Actions chưa được cấu hình; dùng Local Quality Gate.
- Chỉ Project Owner được merge `develop → main`.
- Neo4j MCP là công cụ hỗ trợ phát triển tùy chọn, không phải runtime dependency của ứng dụng.
- Runtime chính thức dùng Neo4j driver/service ở backend.

> Trạng thái chuẩn bị:
>
> ```text
> Sprint 8 = Prepared
> Sprint 7 = In progress
> Sprint 7 Final Review = Pending
> Sprint 8 Audit = Pending
> Ready to implement Sprint 8 = No
> ```

---

# 1. Sprint Overview

| Mục | Nội dung |
|---|---|
| Sprint | Sprint 8 |
| Tên | Graph Sync, Neo4j Projection & Freshness Detection |
| Scope | MVP / Core |
| Core Epic | PAC-EPIC-14 — Graph Sync & Neo4j Projection |
| Supporting Epics | PAC-EPIC-19, PAC-EPIC-21 |
| Stories | US-117 → US-128 |
| Số Story | 12 |
| Story Points | 44 |
| Tasks | PAC-TASK-356 → PAC-TASK-390 |
| Số Task | 35 |
| Task Jira Keys | PAC-566 → PAC-600 |
| Branch inventory | 48 = 35 Task + 12 Story legacy + 1 Core Epic legacy |
| PostgreSQL | Source of truth |
| Neo4j AuraDB | Read projection |
| Runtime integration | Backend Neo4j driver/service |
| MCP | Optional development/admin tooling only |
| CI | N/A — GitHub Actions chưa được cấu hình |
| Merge gate | Local Quality Gate |
| Jira management | Manual by Project Owner |

Phân bố Task:

| Parent Epic | Số Task |
|---|---:|
| PAC-EPIC-14 | 29 |
| PAC-EPIC-19 | 5 |
| PAC-EPIC-21 | 1 |
| **Tổng** | **35** |

# 2. Sprint Goal

Xây dựng pipeline đồng bộ đáng tin cậy từ PostgreSQL sang Neo4j:

```text
PostgreSQL source transaction
→ transactional outbox event
→ safe/idempotent worker claim
→ Neo4j node/relationship upsert
→ projection metadata
→ retry/failure evidence
→ freshness detection
```

Sprint 8 chỉ tạo nền Graph Sync và freshness. Graph-RAG query, provenance response và PostgreSQL fallback orchestration thuộc Sprint 9.

# 3. Implementation Authorization Gate

Chỉ bắt đầu code Sprint 8 khi:

```text
Sprint 7 Final Review = PASS
Ready for Sprint 8 = Yes
Latest develop = Stable
Sprint 8 Audit status = Completed
Ready to implement Sprint 8 = Yes
35/35 exact Task branches = Verified
12/12 exact Story branches = Verified
1/1 Core Epic branch = Verified
Neo4j AuraDB connection = Safe and verified
Supabase/PostgreSQL environment = Safe
Open Blocking Technical Defects = 0
```

Nếu thiếu một gate:

- Không triển khai Sprint 8 production code.
- Không tạo/apply migration Graph Sync.
- Không ghi dữ liệu thử nghiệm không kiểm soát lên AuraDB dùng chung.
- Không tự tạo branch thay thế.
- Ghi blocker vào `sprint-8-audit.md`.

# 4. Mandatory Dependencies

## 4.1 Sprint 2 and Sprint 5 domain dependencies

- Medicine và ActiveIngredient có stable relational ID.
- Medicine–ActiveIngredient mapping hoạt động.
- DrugInteractionRule là ActiveIngredient–ActiveIngredient.
- Deactivation status và source update metadata có thể truy xuất.

## 4.2 Sprint 7 dependency

- Sprint 7 Final Review PASS trước khi Sprint 8 implementation bắt đầu.
- AI services không được phụ thuộc trực tiếp vào Neo4j trong Sprint 8.
- Sprint 8 không sửa AI safety, Prompt hoặc AI Audit ngoài dependency thật.

## 4.3 Infrastructure dependencies

- Neo4j AuraDB instance tồn tại và backend có URI/username/password qua environment.
- Credentials không commit Git và không chia sẻ trong tài liệu.
- Backend package có Neo4j driver phù hợp hoặc Task 363 bổ sung theo repository thực tế.
- PostgreSQL/Supabase test environment an toàn.
- Migration strategy và cleanup strategy đã được xác minh.

# 5. Business Rules and Invariants

## 5.1 PostgreSQL remains authoritative

- Mọi Medicine, ActiveIngredient, mapping và DrugInteractionRule authoritative nằm ở PostgreSQL.
- Neo4j không được ghi ngược để thay đổi nghiệp vụ PostgreSQL.
- POS, interaction check và checkout không phụ thuộc Neo4j.
- Neo4j unavailable không được làm hỏng các core transaction.

## 5.2 Transactional outbox

- Source change và outbox event phải được ghi trong cùng PostgreSQL transaction khi có thể.
- Không dual-write trực tiếp `PostgreSQL → Neo4j` từ controller/service business.
- Event phải có entity type, entity ID, event type và source version.
- Outbox phải hỗ trợ retry, failure evidence và freshness detection.

## 5.3 Job lifecycle

```text
PENDING → PROCESSING → SUCCESS
                    ↘ retry/PENDING
                    ↘ FAILED
```

- Claiming phải atomic/idempotent.
- Nhiều worker không được xử lý cùng một job đồng thời.
- Job không được retry vô hạn.
- Error summary không chứa secret.

## 5.4 Projection identity

- Medicine node key dùng relational Medicine ID.
- ActiveIngredient node key dùng relational ActiveIngredient ID.
- Không tạo node từ raw scraped ingredient string.
- Upsert phải idempotent; rerun không tạo duplicate.

## 5.5 Graph model

```text
(Medicine)-[:CONTAINS]->(ActiveIngredient)
(ActiveIngredient)-[:INTERACTS_WITH]->(ActiveIngredient)
```

INTERACTS_WITH properties tối thiểu:

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

- Không tạo Medicine–Medicine authoritative edge.
- Không cần Interaction node trong MVP.

## 5.6 Canonical interaction edge

- Lưu một hướng canonical dựa trên stable relational ID hoặc normalized key.
- Semantically, interaction vẫn symmetric khi query.
- Không lưu cả hai chiều nếu không có thiết kế chống duplicate rõ ràng.

## 5.7 Deactivation

- Entity/rule deactivate được projection thành `isActive=false`.
- Không hard-delete nếu cần provenance.
- Normal queries chỉ lấy active nodes/edges.
- Debug/admin scope có thể xem inactive data nếu được phân quyền ở Sprint sau.

## 5.8 Projection metadata and freshness

- Không chỉ dựa vào `syncedAt` elapsed time.
- Freshness phải xét source version và relevant outbox state.
- Graph stale khi có pending relevant job, failed relevant job hoặc projected sourceVersion thiếu/cũ.
- Stale/unavailable graph không được dùng âm thầm.
- Sprint 9 phải dùng freshness status để quyết định PostgreSQL fallback.

## 5.9 Neo4j secret and query safety

- URI, username, password chỉ ở backend environment.
- Không log credentials.
- Cypher dùng parameters; không nối chuỗi từ input không tin cậy.
- MCP không thay thế application driver.
- Raw Cypher seed không phải official sync pipeline.

# 6. Scope

## In scope

- GraphSyncOutbox Prisma model và status enum.
- Outbox emitters cho Medicine, ActiveIngredient, mapping và DrugInteractionRule.
- Neo4j connection service và health check.
- Worker loop, claiming, handlers và idempotent upsert.
- Medicine/ActiveIngredient nodes.
- CONTAINS và INTERACTS_WITH relationships.
- Canonical edge direction.
- Active/inactive semantics.
- Projection metadata.
- Retry, max retry, failure logging và audit.
- Freshness detection.
- Unit/integration tests và traceability.

## Out of scope

- Graph-RAG orchestration và query answer generation.
- PostgreSQL fallback response implementation cho Graph-RAG.
- Admin Graph Sync Status UI.
- Read-only Graph Explorer.
- Manual retry/rebuild UI.
- AI Business Narrative.
- Neo4j làm source of truth.
- Neo4j quyết định checkout.
- Multi-store graph.

# 7. Ownership and Tool Responsibilities

| Trách nhiệm | Owner |
|---|---|
| Jira status/issue creation | Project Owner |
| Exact branch registry | `Jira/branch-on-jira.md` |
| Backend Graph Sync implementation | AI Coding Agent / Developer |
| Neo4j AuraDB account and credential custody | Project Owner-designated owner |
| Task PR creation and merge to `develop` | AI Coding Agent khi Local Quality Gate PASS |
| `develop → main` | Project Owner only |
| Graph data verification | AI Coding Agent trên environment an toàn |
| Bug Jira Key | Project Owner |

# 8. Local Quality Gate

GitHub Actions chưa được cấu hình:

```text
CI = N/A — GitHub Actions chưa được cấu hình
```

Task PR chỉ merge khi:

1. Exact Task branch và Jira Key đúng.
2. Acceptance criteria hoàn thành.
3. PR target `develop`.
4. Diff đúng phạm vi.
5. Không conflict.
6. Relevant lint/typecheck/tests PASS.
7. Prisma validate/generate PASS khi liên quan.
8. Supabase verification PASS hoặc N/A hợp lệ.
9. Neo4j verification PASS hoặc N/A hợp lệ.
10. Không secret hoặc credential.
11. Không destructive query/data reset.
12. GitHub báo mergeable.

N/A chuẩn:

```text
Supabase = N/A — no persistent data impact
Neo4j = N/A — no graph projection impact
```

# 9. Git Execution and Jira Coordination

Workflow:

```text
Pull latest develop
→ checkout exact Task branch đã tồn tại
→ implement
→ targeted local checks
→ review diff/secrets
→ commit/push
→ PR vào develop
→ Local Quality Gate
→ merge
→ verify remote develop
→ update progress
```

Không được tự tạo branch mới hoặc branch gần giống nếu exact branch không tồn tại. Khi branch thiếu, dừng và báo blocker.

Commit format:

```text
<type>(<scope>): <JIRA-KEY> <short English message>
```

Ví dụ:

```text
feat(graph): PAC-566 add graph sync outbox model
```

# 10. Bug Candidate Workflow

AI không tự tạo Jira Bug Key.

```text
Bug Candidate:
Severity:
Affected Task/Story:
Actual:
Expected:
Evidence:
```

Chỉ tạo Bug branch khi Project Owner cung cấp Jira Bug Key thật.

# 11. Recommended Technical Execution Order

## 11.1 Phase 1 — Transactional Outbox Foundation

```text
PAC-TASK-356 → PAC-TASK-357 → PAC-TASK-358 → PAC-TASK-359 → PAC-TASK-360 → PAC-TASK-361
```

## 11.2 Phase 2 — Neo4j Connection, Worker and Claiming

```text
PAC-TASK-363 → PAC-TASK-364 → PAC-TASK-362 → PAC-TASK-365
```

## 11.3 Phase 3 — Projection Model and Active-data Semantics

```text
PAC-TASK-366 → PAC-TASK-367 → PAC-TASK-368 → PAC-TASK-369 → PAC-TASK-370 → PAC-TASK-371 → PAC-TASK-372 → PAC-TASK-373 → PAC-TASK-374 → PAC-TASK-375 → PAC-TASK-380
```

## 11.4 Phase 4 — Retry, Failure Logging and Audit

```text
PAC-TASK-376 → PAC-TASK-377 → PAC-TASK-378 → PAC-TASK-379
```

## 11.5 Phase 5 — Freshness Detection

```text
PAC-TASK-381 → PAC-TASK-382 → PAC-TASK-383 → PAC-TASK-384
```

## 11.6 Phase 6 — Tests and Traceability

```text
PAC-TASK-385 → PAC-TASK-386 → PAC-TASK-387 → PAC-TASK-388 → PAC-TASK-389 → PAC-TASK-390
```

Thứ tự trên tối ưu dependency kỹ thuật. Logical Task, Jira Key và exact branch vẫn giữ nguyên.

# 12. Story and Task Plan

## US-117 — Graph Sync Outbox

| Field | Value |
|---|---|
| Jira Key | PAC-157 |
| Parent Epic | PAC-EPIC-14 |
| Priority | Highest |
| Story Points | 5 |
| Exact Story branch | `story/PAC-157-us-117-graph-sync-outbox` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-356 | PAC-566 | Create graph_sync_outbox Prisma model | Highest | `feature/PAC-566-task-356-create-graph-sync-outbox-prisma-model` |
| PAC-TASK-357 | PAC-567 | Add graph sync job status enum | High | `feature/PAC-567-task-357-add-graph-sync-job-status-enum` |
| PAC-TASK-358 | PAC-568 | Emit outbox event from Medicine changes | High | `feature/PAC-568-task-358-emit-outbox-event-from-medicine-changes` |
| PAC-TASK-359 | PAC-569 | Emit outbox event from ActiveIngredient changes | High | `feature/PAC-569-task-359-emit-outbox-event-from-activeingredient-changes` |
| PAC-TASK-360 | PAC-570 | Emit outbox event from Medicine-Ingredient mapping changes | High | `feature/PAC-570-task-360-emit-outbox-event-from-medicine-ingredient-mapping-` |
| PAC-TASK-361 | PAC-571 | Emit outbox event from DrugInteractionRule changes | High | `feature/PAC-571-task-361-emit-outbox-event-from-druginteractionrule-changes` |
| PAC-TASK-390 | PAC-600 | Add Graph Sync traceability notes | Medium | `feature/PAC-600-task-390-add-graph-sync-traceability-notes` |

Acceptance Review:

- Source changes create outbox events.
- Event contains entity type, source ID, event type and source version.
- PostgreSQL remains source of truth.

## US-118 — Graph Sync Worker

| Field | Value |
|---|---|
| Jira Key | PAC-158 |
| Parent Epic | PAC-EPIC-14 |
| Priority | Highest |
| Story Points | 5 |
| Exact Story branch | `story/PAC-158-us-118-graph-sync-worker` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-362 | PAC-572 | Implement Graph Sync worker loop | Highest | `feature/PAC-572-task-362-implement-graph-sync-worker-loop` |
| PAC-TASK-363 | PAC-573 | Configure Neo4j connection service | High | `feature/PAC-573-task-363-configure-neo4j-connection-service` |
| PAC-TASK-364 | PAC-574 | Add Neo4j health check | Medium | `feature/PAC-574-task-364-add-neo4j-health-check` |
| PAC-TASK-365 | PAC-575 | Implement idempotent graph job claiming | High | `feature/PAC-575-task-365-implement-idempotent-graph-job-claiming` |
| PAC-TASK-385 | PAC-595 | Add Graph Sync worker unit tests | High | `test/PAC-595-task-385-add-graph-sync-worker-unit-tests` |

Acceptance Review:

- Worker claims pending jobs safely.
- Updates success/failure state and supports retry.
- Duplicate processing does not duplicate graph data.

## US-119 — Project Medicine node to Neo4j

| Field | Value |
|---|---|
| Jira Key | PAC-159 |
| Parent Epic | PAC-EPIC-14 |
| Priority | High |
| Story Points | 3 |
| Exact Story branch | `story/PAC-159-us-119-project-medicine-node-to-neo4j` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-366 | PAC-576 | Upsert Medicine node to Neo4j | High | `feature/PAC-576-task-366-upsert-medicine-node-to-neo4j` |
| PAC-TASK-386 | PAC-596 | Add Neo4j projection integration tests | High | `test/PAC-596-task-386-add-neo4j-projection-integration-tests` |

Acceptance Review:

- Medicine node uses relational ID.
- Active/source metadata is stored.
- Neo4j remains projection only.

## US-120 — Project ActiveIngredient node to Neo4j

| Field | Value |
|---|---|
| Jira Key | PAC-160 |
| Parent Epic | PAC-EPIC-14 |
| Priority | High |
| Story Points | 3 |
| Exact Story branch | `story/PAC-160-us-120-project-activeingredient-node-to-neo4j` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-367 | PAC-577 | Upsert ActiveIngredient node to Neo4j | High | `feature/PAC-577-task-367-upsert-activeingredient-node-to-neo4j` |

Acceptance Review:

- ActiveIngredient node uses relational ID.
- Raw scraped strings are not authoritative nodes.
- Update/deactivate is projected correctly.

## US-121 — Project CONTAINS relationship

| Field | Value |
|---|---|
| Jira Key | PAC-161 |
| Parent Epic | PAC-EPIC-14 |
| Priority | High |
| Story Points | 3 |
| Exact Story branch | `story/PAC-161-us-121-project-contains-relationship` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-368 | PAC-578 | Upsert CONTAINS relationship | High | `feature/PAC-578-task-368-upsert-contains-relationship` |

Acceptance Review:

- CONTAINS is upserted from official mapping.
- Mapping changes are reflected.
- No duplicate relationship.

## US-122 — Project INTERACTS_WITH relationship

| Field | Value |
|---|---|
| Jira Key | PAC-162 |
| Parent Epic | PAC-EPIC-14 |
| Priority | Highest |
| Story Points | 5 |
| Exact Story branch | `story/PAC-162-us-122-project-interacts-with-relationship` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-369 | PAC-579 | Upsert INTERACTS_WITH relationship | Highest | `feature/PAC-579-task-369-upsert-interacts-with-relationship` |
| PAC-TASK-371 | PAC-581 | Store rule properties on INTERACTS_WITH relationship | High | `feature/PAC-581-task-371-store-rule-properties-on-interacts-with-relationshi` |
| PAC-TASK-387 | PAC-597 | Add INTERACTS_WITH projection tests | High | `test/PAC-597-task-387-add-interacts-with-projection-tests` |

Acceptance Review:

- INTERACTS_WITH is projected between ActiveIngredient nodes.
- Rule properties and provenance are stored.
- No Medicine–Medicine authoritative edge.

## US-123 — Canonical directed interaction edge

| Field | Value |
|---|---|
| Jira Key | PAC-163 |
| Parent Epic | PAC-EPIC-14 |
| Priority | High |
| Story Points | 3 |
| Exact Story branch | `story/PAC-163-us-123-canonical-directed-interaction-edge` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-370 | PAC-580 | Implement canonical directed interaction edge logic | High | `feature/PAC-580-task-370-implement-canonical-directed-interaction-edge-logic` |

Acceptance Review:

- One canonical direction is used.
- Queries preserve semantic symmetry.
- Reverse input does not create uncontrolled duplicates.

## US-124 — Store graph projection metadata

| Field | Value |
|---|---|
| Jira Key | PAC-164 |
| Parent Epic | PAC-EPIC-14 |
| Priority | High |
| Story Points | 3 |
| Exact Story branch | `story/PAC-164-us-124-store-graph-projection-metadata` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-372 | PAC-582 | Store sourceVersion, sourceUpdatedAt and syncedAt metadata | High | `feature/PAC-582-task-372-store-sourceversion-sourceupdatedat-and-syncedat-me` |
| PAC-TASK-380 | PAC-590 | Implement graph projection source version tracking | High | `feature/PAC-590-task-380-implement-graph-projection-source-version-tracking` |

Acceptance Review:

- sourceVersion, sourceUpdatedAt and syncedAt are stored.
- Metadata supports freshness decisions.
- Freshness is not time-only.

## US-125 — Retry failed graph sync jobs

| Field | Value |
|---|---|
| Jira Key | PAC-165 |
| Parent Epic | PAC-EPIC-14 |
| Priority | High |
| Story Points | 3 |
| Exact Story branch | `story/PAC-165-us-125-retry-failed-graph-sync-jobs` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-376 | PAC-586 | Implement retry logic for failed graph sync jobs | High | `feature/PAC-586-task-376-implement-retry-logic-for-failed-graph-sync-jobs` |
| PAC-TASK-377 | PAC-587 | Add max retry and failed status handling | High | `feature/PAC-587-task-377-add-max-retry-and-failed-status-handling` |
| PAC-TASK-389 | PAC-599 | Add graph sync retry and failure tests | High | `test/PAC-599-task-389-add-graph-sync-retry-and-failure-tests` |

Acceptance Review:

- Failed jobs retry within a limit.
- Retry count and final FAILED status are persisted.
- No infinite retry.

## US-126 — Log graph sync failures

| Field | Value |
|---|---|
| Jira Key | PAC-166 |
| Parent Epic | PAC-EPIC-14 |
| Priority | High |
| Story Points | 3 |
| Exact Story branch | `story/PAC-166-us-126-log-graph-sync-failures` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-378 | PAC-588 | Log graph sync failure details | High | `feature/PAC-588-task-378-log-graph-sync-failure-details` |
| PAC-TASK-379 | PAC-589 | Write audit log for graph sync failures | Medium | `feature/PAC-589-task-379-write-audit-log-for-graph-sync-failures` |

Acceptance Review:

- Failures have safe logs/audit evidence.
- No credentials are exposed.
- PostgreSQL/core flows remain unaffected.

## US-127 — Graph freshness detection

| Field | Value |
|---|---|
| Jira Key | PAC-167 |
| Parent Epic | PAC-EPIC-14 |
| Priority | Highest |
| Story Points | 5 |
| Exact Story branch | `story/PAC-167-us-127-graph-freshness-detection` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-381 | PAC-591 | Implement graph freshness detection service | Highest | `feature/PAC-591-task-381-implement-graph-freshness-detection-service` |
| PAC-TASK-382 | PAC-592 | Detect stale graph from pending outbox job | Highest | `feature/PAC-592-task-382-detect-stale-graph-from-pending-outbox-job` |
| PAC-TASK-383 | PAC-593 | Detect stale graph from failed relevant outbox job | Highest | `feature/PAC-593-task-383-detect-stale-graph-from-failed-relevant-outbox-job` |
| PAC-TASK-384 | PAC-594 | Detect stale graph from missing sourceVersion projection | Highest | `feature/PAC-594-task-384-detect-stale-graph-from-missing-sourceversion-proje` |
| PAC-TASK-388 | PAC-598 | Add graph freshness detection tests | Highest | `test/PAC-598-task-388-add-graph-freshness-detection-tests` |

Acceptance Review:

- Freshness checks source version and relevant outbox state.
- Pending/failed/missing projection returns stale with a reason.
- Stale graph is not silently trusted.

## US-128 — Deactivated graph entity with isActive=false

| Field | Value |
|---|---|
| Jira Key | PAC-168 |
| Parent Epic | PAC-EPIC-14 |
| Priority | Medium |
| Story Points | 3 |
| Exact Story branch | `story/PAC-168-us-128-deactivated-graph-entity-with-isactive-false` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-373 | PAC-583 | Mark deactivated Medicine and ActiveIngredient as isActive=false | Medium | `feature/PAC-583-task-373-mark-deactivated-medicine-and-activeingredient-as-i` |
| PAC-TASK-374 | PAC-584 | Mark deactivated interaction rule edge as isActive=false | Medium | `feature/PAC-584-task-374-mark-deactivated-interaction-rule-edge-as-isactive-` |
| PAC-TASK-375 | PAC-585 | Filter normal Neo4j queries to active data only | Medium | `feature/PAC-585-task-375-filter-normal-neo4j-queries-to-active-data-only` |

Acceptance Review:

- Deactivated data uses isActive=false.
- Normal queries filter inactive data.
- History/provenance remains traceable.

# 13. Exact Branch Registry

## 13.1 Core and supporting Epic branches

| Logical Epic | Jira Key | Exact branch | Usage |
|---|---|---|---|
| EPIC-14 | PAC-14 | `epic/PAC-14-epic-14-graph-sync-neo4j-projection` | Core legacy/traceability only |
| EPIC-19 | PAC-19 | `epic/PAC-19-epic-19-testing-smoke-test-release-readiness` | Supporting legacy/traceability only |
| EPIC-21 | PAC-21 | `epic/PAC-21-epic-21-documentation-traceability` | Supporting legacy/traceability only |

Chỉ EPIC-14 được tính trong 48-branch Sprint inventory. EPIC-19 và EPIC-21 là cross-sprint supporting branches.

## 13.2 Story branches

| Story | Jira Key | Exact branch |
|---|---|---|
| US-117 | PAC-157 | `story/PAC-157-us-117-graph-sync-outbox` |
| US-118 | PAC-158 | `story/PAC-158-us-118-graph-sync-worker` |
| US-119 | PAC-159 | `story/PAC-159-us-119-project-medicine-node-to-neo4j` |
| US-120 | PAC-160 | `story/PAC-160-us-120-project-activeingredient-node-to-neo4j` |
| US-121 | PAC-161 | `story/PAC-161-us-121-project-contains-relationship` |
| US-122 | PAC-162 | `story/PAC-162-us-122-project-interacts-with-relationship` |
| US-123 | PAC-163 | `story/PAC-163-us-123-canonical-directed-interaction-edge` |
| US-124 | PAC-164 | `story/PAC-164-us-124-store-graph-projection-metadata` |
| US-125 | PAC-165 | `story/PAC-165-us-125-retry-failed-graph-sync-jobs` |
| US-126 | PAC-166 | `story/PAC-166-us-126-log-graph-sync-failures` |
| US-127 | PAC-167 | `story/PAC-167-us-127-graph-freshness-detection` |
| US-128 | PAC-168 | `story/PAC-168-us-128-deactivated-graph-entity-with-isactive-false` |

## 13.3 Task branches

| Logical Task | Jira Key | Exact branch |
|---|---|---|
| PAC-TASK-356 | PAC-566 | `feature/PAC-566-task-356-create-graph-sync-outbox-prisma-model` |
| PAC-TASK-357 | PAC-567 | `feature/PAC-567-task-357-add-graph-sync-job-status-enum` |
| PAC-TASK-358 | PAC-568 | `feature/PAC-568-task-358-emit-outbox-event-from-medicine-changes` |
| PAC-TASK-359 | PAC-569 | `feature/PAC-569-task-359-emit-outbox-event-from-activeingredient-changes` |
| PAC-TASK-360 | PAC-570 | `feature/PAC-570-task-360-emit-outbox-event-from-medicine-ingredient-mapping-` |
| PAC-TASK-361 | PAC-571 | `feature/PAC-571-task-361-emit-outbox-event-from-druginteractionrule-changes` |
| PAC-TASK-362 | PAC-572 | `feature/PAC-572-task-362-implement-graph-sync-worker-loop` |
| PAC-TASK-363 | PAC-573 | `feature/PAC-573-task-363-configure-neo4j-connection-service` |
| PAC-TASK-364 | PAC-574 | `feature/PAC-574-task-364-add-neo4j-health-check` |
| PAC-TASK-365 | PAC-575 | `feature/PAC-575-task-365-implement-idempotent-graph-job-claiming` |
| PAC-TASK-366 | PAC-576 | `feature/PAC-576-task-366-upsert-medicine-node-to-neo4j` |
| PAC-TASK-367 | PAC-577 | `feature/PAC-577-task-367-upsert-activeingredient-node-to-neo4j` |
| PAC-TASK-368 | PAC-578 | `feature/PAC-578-task-368-upsert-contains-relationship` |
| PAC-TASK-369 | PAC-579 | `feature/PAC-579-task-369-upsert-interacts-with-relationship` |
| PAC-TASK-370 | PAC-580 | `feature/PAC-580-task-370-implement-canonical-directed-interaction-edge-logic` |
| PAC-TASK-371 | PAC-581 | `feature/PAC-581-task-371-store-rule-properties-on-interacts-with-relationshi` |
| PAC-TASK-372 | PAC-582 | `feature/PAC-582-task-372-store-sourceversion-sourceupdatedat-and-syncedat-me` |
| PAC-TASK-373 | PAC-583 | `feature/PAC-583-task-373-mark-deactivated-medicine-and-activeingredient-as-i` |
| PAC-TASK-374 | PAC-584 | `feature/PAC-584-task-374-mark-deactivated-interaction-rule-edge-as-isactive-` |
| PAC-TASK-375 | PAC-585 | `feature/PAC-585-task-375-filter-normal-neo4j-queries-to-active-data-only` |
| PAC-TASK-376 | PAC-586 | `feature/PAC-586-task-376-implement-retry-logic-for-failed-graph-sync-jobs` |
| PAC-TASK-377 | PAC-587 | `feature/PAC-587-task-377-add-max-retry-and-failed-status-handling` |
| PAC-TASK-378 | PAC-588 | `feature/PAC-588-task-378-log-graph-sync-failure-details` |
| PAC-TASK-379 | PAC-589 | `feature/PAC-589-task-379-write-audit-log-for-graph-sync-failures` |
| PAC-TASK-380 | PAC-590 | `feature/PAC-590-task-380-implement-graph-projection-source-version-tracking` |
| PAC-TASK-381 | PAC-591 | `feature/PAC-591-task-381-implement-graph-freshness-detection-service` |
| PAC-TASK-382 | PAC-592 | `feature/PAC-592-task-382-detect-stale-graph-from-pending-outbox-job` |
| PAC-TASK-383 | PAC-593 | `feature/PAC-593-task-383-detect-stale-graph-from-failed-relevant-outbox-job` |
| PAC-TASK-384 | PAC-594 | `feature/PAC-594-task-384-detect-stale-graph-from-missing-sourceversion-proje` |
| PAC-TASK-385 | PAC-595 | `test/PAC-595-task-385-add-graph-sync-worker-unit-tests` |
| PAC-TASK-386 | PAC-596 | `test/PAC-596-task-386-add-neo4j-projection-integration-tests` |
| PAC-TASK-387 | PAC-597 | `test/PAC-597-task-387-add-interacts-with-projection-tests` |
| PAC-TASK-388 | PAC-598 | `test/PAC-598-task-388-add-graph-freshness-detection-tests` |
| PAC-TASK-389 | PAC-599 | `test/PAC-599-task-389-add-graph-sync-retry-and-failure-tests` |
| PAC-TASK-390 | PAC-600 | `feature/PAC-600-task-390-add-graph-sync-traceability-notes` |

> Một số branch canonical có slug bị cắt ngắn hoặc kết thúc bằng dấu `-`. Phải dùng nguyên văn từ registry; không tự sửa cho đẹp.

# 14. Database and Migration Requirements

Expected persistent scope:

```text
GraphSyncOutbox
GraphSyncJobStatus enum
source version fields or version derivation
failure/audit metadata where required
```

Yêu cầu:

- Prisma schema và migration phải commit cùng Task liên quan.
- `prisma validate` và `prisma generate` PASS.
- Migration additive; không phá source tables.
- Index cho status, next-attempt/created time, entity type/entity ID phù hợp.
- Claiming/retry logic phải có concurrency-safe database strategy.
- Không lưu Neo4j credentials trong PostgreSQL.
- Test data phải cleanup an toàn.

# 15. Neo4j Projection Requirements

- Dùng parameterized Cypher.
- Driver lifecycle đóng đúng khi shutdown.
- Health check không expose credential.
- Node/edge upsert dùng stable source IDs.
- Rerun cùng event phải idempotent.
- `isActive`, `sourceVersion`, `sourceUpdatedAt`, `syncedAt` nhất quán.
- Projection failure không rollback source business transaction đã commit; outbox giữ evidence để retry.
- Không dùng AuraDB làm test target phá dữ liệu nếu là instance nhóm/demo.

# 16. Testing Requirements

Task-level:

- Outbox emitter unit/integration tests.
- Worker claim/success/failure tests.
- Retry/max retry tests.
- Node/relationship projection tests.
- Canonical edge tests.
- Deactivation and active-filter tests.
- Freshness pending/failed/version-mismatch tests.
- Secret/log safety review.

Story/Epic/Sprint review:

- Latest `develop`.
- Relevant backend lint/typecheck/build.
- Prisma validate/generate/migration status.
- Controlled PostgreSQL/Supabase verification.
- Controlled Neo4j projection verification.
- No duplicate nodes/edges.
- Neo4j unavailable/stale does not affect POS/checkout.

# 17. Definition of Done

Sprint 8 hoàn thành khi:

```text
35/35 Task PRs merged into develop
12/12 Story Acceptance Reviews PASS
PAC-EPIC-14 Integration/Regression Review PASS
Transactional outbox PASS
Idempotent worker claiming PASS
Medicine/ActiveIngredient projection PASS
CONTAINS/INTERACTS_WITH projection PASS
Canonical edge PASS
Deactivation semantics PASS
Retry/failure evidence PASS
Freshness detection PASS
Prisma/Supabase/Neo4j verification PASS
Blocking defects = 0
High defects = 0
Sprint 8 Final Review = PASS
Ready for Sprint 9 = Yes
```

Không ghi `Ready for release = Yes`.

# 18. Preparation Deliverables

Bộ tài liệu Sprint 8:

```text
work-context/sprint-8/
├── sprint-8.md
├── sprint-8-progress.md
├── sprint-8-audit.md
├── sprint-8-agent-prompt.md
└── sprint-8-final-review-prompt.md
```

Thứ tự:

```text
Prepare sprint-8.md
→ sprint-8-progress.md
→ sprint-8-audit.md
→ sprint-8-agent-prompt.md
→ sprint-8-final-review-prompt.md
→ Sprint 7 Final Review PASS
→ run Sprint 8 Audit
→ Audit PASS
→ implement Sprint 8
```

# 19. Current Official State

```text
Sprint 7 implementation = In progress
Sprint 8 plan = Prepared
Sprint 8 progress tracker = Not created
Sprint 8 audit = Not created
Sprint 8 agent prompt = Not created
Sprint 8 final review prompt = Not created
Ready to implement Sprint 8 = No
CI = N/A — GitHub Actions chưa được cấu hình
Quality Gate = Local Quality Gate
```
