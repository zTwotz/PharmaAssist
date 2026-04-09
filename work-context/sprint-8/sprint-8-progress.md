# Sprint 8 Progress — PharmaAssist AI Intelligence

> **Repository path đề xuất:** `work-context/sprint-8/sprint-8-progress.md`
>
> Tài liệu này ghi nhận technical progress và evidence của Sprint 8. Jira do Project Owner cập nhật thủ công.

## Canonical Sources

1. `Jira/branch-on-jira.md` — nguồn duy nhất cho Jira Key và exact branch.
2. `Jira/jira-mapping.md` — mapping Logical Key ↔ Jira Key.
3. `work-context/sprint-8/sprint-8.md` — phạm vi, dependency và Definition of Done.
4. `Jira/4C_Task_List_MVP_AI_Graph_Report_Demo_291_435.md` — Task mapping.
5. `Jira/4C_Task_Description_MVP_AI_Graph_Report_Demo_291_435.md` — yêu cầu chi tiết.

Quy tắc:

- Không đổi, rút gọn hoặc tự tạo branch thay thế.
- Task/Bug PR luôn target `develop`.
- Không tạo Story PR hoặc Epic PR.
- Story/Epic review chạy trên latest `develop`.
- GitHub Actions chưa cấu hình: `CI = N/A`; dùng Local Quality Gate.
- PostgreSQL là source of truth; Neo4j chỉ là projection.
- Neo4j MCP chỉ là tooling hỗ trợ, không phải runtime dependency.
- Chỉ Project Owner được merge `develop → main` và cập nhật Jira.

---

# 1. Sprint Information

| Mục | Nội dung |
|---|---|
| Sprint | Sprint 8 |
| Tên Sprint | Graph Sync, Neo4j Projection & Freshness Detection |
| Scope | MVP / Core |
| Core Epic | PAC-EPIC-14 |
| Supporting Epics | PAC-EPIC-19, PAC-EPIC-21 |
| Stories | US-117 → US-128 |
| Số Story | 12 |
| Story Points | 44 |
| Tasks | PAC-TASK-356 → PAC-TASK-390 |
| Số Task | 35 |
| Task Jira Keys | PAC-566 → PAC-600 |
| Branch inventory | 48 = 35 Task + 12 Story legacy + 1 Core Epic legacy |
| Task/Bug PR target | `develop` |
| PostgreSQL | Source of truth |
| Neo4j | Read projection |
| CI | N/A — GitHub Actions chưa được cấu hình |
| Merge gate | Local Quality Gate |
| Jira management | Manual by Project Owner |
| Current phase | Prepared |
| Sprint 7 Final Review | Pending |
| Sprint 8 Audit | Pending |
| Ready to implement Sprint 8 | No |
| Ready for Sprint 9 | No |

# 2. Official Workflow

```text
Task/Bug branch đã tồn tại
→ pull latest develop
→ code đúng Task scope
→ targeted local checks
→ Prisma/Supabase/Neo4j verification khi cần
→ review diff, secret và destructive query
→ commit + push
→ PR vào develop
→ Local Quality Gate PASS
→ merge vào develop
→ xác minh merge SHA trên remote develop
→ cập nhật technical progress
→ tiếp tục Task kế tiếp
```

Story completion: Acceptance Review trên latest `develop`.

Epic completion: PAC-EPIC-14 Integration/Regression Review trên latest `develop`.

Sprint 8 chỉ được triển khai sau khi Sprint 7 Final Review PASS và Sprint 8 Audit PASS.

# 3. Progress Update Cadence

Chỉ cập nhật tài liệu này khi:

1. Task/Bug PR đã merge hoặc bị blocker.
2. Story Acceptance Review hoàn tất.
3. Core Epic Review hoàn tất.
4. Có migration, Supabase hoặc Neo4j verification evidence.
5. Kết thúc phiên làm việc hoặc cần handoff.
6. Sprint Final Review hoàn tất.

Không tạo documentation-only PR sau mỗi Task chỉ để ghi merge SHA. Có thể đồng bộ progress trong Task kế tiếp hoặc cuối phiên.

# 4. Sprint Summary

| Hạng mục | Tổng | Not started | In progress | Ready for merge | Technically complete |
|---|---:|---:|---:|---:|---:|
| Core Epic technical review | 1 | 1 | 0 | 0 | 0 |
| Story Acceptance Review | 12 | 12 | 0 | 0 | 0 |
| Task implementation | 35 | 35 | 0 | 0 | 0 |
| Bug candidates | 0 | 0 | 0 | 0 | 0 |

## Completion Counters

- [ ] 35/35 exact Task branches used.
- [ ] 35/35 applicable Task/Bug PRs merged into `develop`.
- [ ] 12/12 Story Acceptance Reviews PASS.
- [ ] PAC-EPIC-14 Integration/Regression Review PASS.
- [ ] Transactional outbox verification PASS.
- [ ] Worker claim/idempotency verification PASS.
- [ ] Medicine and ActiveIngredient projection PASS.
- [ ] CONTAINS and INTERACTS_WITH projection PASS.
- [ ] Canonical directed edge verification PASS.
- [ ] Retry/failure evidence PASS.
- [ ] Deactivation semantics PASS.
- [ ] Graph freshness detection PASS.
- [ ] Prisma/Supabase/Neo4j verification PASS.
- [ ] Sprint 8 Final Review PASS.
- [ ] Blocking defects = 0.
- [ ] High defects = 0.
- [ ] Ready for Sprint 9 = Yes.

# 5. Tool and Environment Evidence

| Tool/Area | Status | Required for | Evidence |
|---|---|---|---|
| GitHub/Git | Pending | Branch, PR, merge và remote verification | — |
| Local Quality Gate | Pending | Mọi Task/Bug PR | — |
| PostgreSQL/Supabase access | Pending | Outbox schema, migration và source-data verification | — |
| Safe Supabase environment | Pending | Controlled write tests | — |
| Neo4j AuraDB access | Pending | Projection và freshness verification | — |
| Safe Neo4j environment | Pending | Controlled graph write/cleanup | — |
| Neo4j backend driver | Pending | Runtime Graph Sync | — |
| Neo4j MCP | Optional | Development/admin inspection only | N/A unless used |
| Jira | Project Owner managed | Manual status/comment/Bug updates | AI write actions disabled |
| GitHub Actions | Not configured | Không dùng trong Sprint 8 | CI = N/A |

# 6. Local Quality Gate Evidence

| Issue | Lint/Typecheck | Targeted tests | Build | Prisma | Supabase | Neo4j | Diff/Secret review | Conflict | Gate | Evidence |
|---|---|---|---|---|---|---|---|---|---|---|
| Chưa cập nhật | Pending/N/A | Pending | Pending/N/A | Pending/N/A | Pending/N/A | Pending/N/A | Pending | Pending | Pending | — |

Local Quality Gate chỉ PASS khi các kiểm tra phù hợp với Task đều PASS hoặc có N/A hợp lệ.

N/A chuẩn:

```text
Supabase = N/A — no persistent data impact
Neo4j = N/A — no graph projection impact
```

# 7. PostgreSQL / Supabase Test Run Log

Dùng cho Task ảnh hưởng outbox schema, source transaction, status/retry fields hoặc migration.

| Test Run ID | Environment | Story/Task | Scenario | Fixture IDs | Pre-test | Post-test | Cleanup/Rollback | Result | Evidence |
|---|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | — | Pending | — |

Suggested ID:

```text
S8-PG-<TASK>-<timestamp-or-uuid>
```

# 8. Neo4j Verification Log

Không ghi URI, username hoặc password vào evidence.

| Verification ID | Environment | Story/Task | Entity/Relationship | Source IDs | Pre-state | Post-state | Idempotency | Cleanup | Result | Evidence |
|---|---|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | — | — | Pending | — |

Suggested ID:

```text
S8-NEO4J-<TASK>-<timestamp-or-uuid>
```

# 9. Graph Freshness Verification Log

| Verification ID | Relevant entity | Source version | Projected version | Pending job | Failed job | Expected status | Actual status | Reason | Result |
|---|---|---:|---:|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | — | — | Pending |

Freshness không được đánh giá chỉ bằng thời gian kể từ `syncedAt`.

# 10. Core Epic Technical Progress

## PAC-EPIC-14 — Graph Sync & Neo4j Projection

- **Jira Key:** `PAC-14`
- **Legacy Epic branch:** `epic/PAC-14-epic-14-graph-sync-neo4j-projection`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

| Technical status | Stories PASS | Tasks merged | Integration/Regression Review | PostgreSQL evidence | Neo4j evidence | Blocking defects | Recommended Jira status |
|---|---:|---:|---|---|---|---|---|
| Not started | 0/12 | 0/29 core tasks | Pending | Pending | Pending | — | TO DO |

### Epic completion checklist

- [ ] 12/12 Story Acceptance Reviews PASS trên latest `develop`.
- [ ] 29/29 EPIC-14 Task changes verified.
- [ ] Transactional outbox PASS.
- [ ] Worker claiming/idempotency PASS.
- [ ] Neo4j projection PASS.
- [ ] Retry/failure/freshness regression PASS.
- [ ] PostgreSQL/Supabase/Neo4j evidence PASS.
- [ ] Không có unresolved Blocking/High defect.
- [ ] Không tạo Epic PR.
- [ ] Recommended Jira status được ghi cho Project Owner.

# 11. Story Acceptance Review Progress

| Story | Jira Key | Summary | Points | Tasks | Status | Acceptance Review | Evidence | Recommended Jira status |
|---|---|---|---:|---:|---|---|---|---|
| US-117 | PAC-157 | Graph Sync Outbox | 5 | 7 | Not started | Pending | — | TO DO |
| US-118 | PAC-158 | Graph Sync Worker | 5 | 5 | Not started | Pending | — | TO DO |
| US-119 | PAC-159 | Project Medicine node to Neo4j | 3 | 2 | Not started | Pending | — | TO DO |
| US-120 | PAC-160 | Project ActiveIngredient node to Neo4j | 3 | 1 | Not started | Pending | — | TO DO |
| US-121 | PAC-161 | Project CONTAINS relationship | 3 | 1 | Not started | Pending | — | TO DO |
| US-122 | PAC-162 | Project INTERACTS_WITH relationship | 5 | 3 | Not started | Pending | — | TO DO |
| US-123 | PAC-163 | Canonical directed interaction edge | 3 | 1 | Not started | Pending | — | TO DO |
| US-124 | PAC-164 | Store graph projection metadata | 3 | 2 | Not started | Pending | — | TO DO |
| US-125 | PAC-165 | Retry failed graph sync jobs | 3 | 3 | Not started | Pending | — | TO DO |
| US-126 | PAC-166 | Log graph sync failures | 3 | 2 | Not started | Pending | — | TO DO |
| US-127 | PAC-167 | Graph freshness detection | 5 | 5 | Not started | Pending | — | TO DO |
| US-128 | PAC-168 | Deactivated graph entity with isActive=false | 3 | 3 | Not started | Pending | — | TO DO |

Story review rules:

- Chạy trên latest `develop` sau khi mọi Task của Story đã merge.
- Không tạo Story PR.
- Xác minh acceptance criteria, relevant tests và persistent-data evidence.
- Chỉ ghi PASS khi không còn Blocking/High defect trong Story scope.

# 12. Task Progress Register

| Logical Task | Jira Key | Story | Summary | Exact branch | Status | Commit | PR | Merge SHA | Local Gate | PostgreSQL/Supabase | Neo4j | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-356 | PAC-566 | US-117 | Create graph_sync_outbox Prisma model | `feature/PAC-566-task-356-create-graph-sync-outbox-prisma-model` | Technically complete | 031705d | #828 | 17effadbfcefadc5f26897d48c89c7e8a2a912e4 | PASS | PASS | N/A | DONE |
| PAC-TASK-357 | PAC-567 | US-117 | Add graph sync job status enum | `feature/PAC-567-task-357-add-graph-sync-job-status-enum` | Technically complete | 1cf00de | #829 | a14db719042de81646de117352a8938f7731d181 | PASS | N/A | N/A | DONE |
| PAC-TASK-358 | PAC-568 | US-117 | Emit outbox event from Medicine changes | `feature/PAC-568-task-358-emit-outbox-event-from-medicine-changes` | Technically complete | PR #830 | Pass | Pass | Done | N/A | N/A | DONE |
| PAC-TASK-359 | PAC-569 | US-117 | Emit outbox event from ActiveIngredient changes | `feature/PAC-569-task-359-emit-outbox-event-from-activeingredient-changes` | Technically complete | PR #831 | Pass | Pass | Done | N/A | N/A | DONE |
| PAC-TASK-360 | PAC-570 | US-117 | Emit outbox event from Medicine-Ingredient mapping changes | `feature/PAC-570-task-360-emit-outbox-event-from-medicine-ingredient-mapping-` | Done | PR #832 | Pass | Pass | Done | N/A | N/A | DONE |
| PAC-TASK-361 | PAC-571 | US-117 | Emit outbox event from DrugInteractionRule changes | `feature/PAC-571-task-361-emit-outbox-event-from-druginteractionrule-changes` | Done | PR #833 | Pass | Pass | Done | N/A | N/A | DONE |
| PAC-TASK-362 | PAC-572 | US-118 | Implement Graph Sync worker loop | `feature/PAC-572-task-362-implement-graph-sync-worker-loop` | Done | Done | Done | Done | Done | Done | Done | DONE |
| PAC-TASK-363 | PAC-573 | US-118 | Configure Neo4j connection service | `feature/PAC-573-task-363-configure-neo4j-connection-service` | Done | Done | Done | Done | Done | Done | Done | DONE |
| PAC-TASK-364 | PAC-574 | US-118 | Add Neo4j health check | `feature/PAC-574-task-364-add-neo4j-health-check` | Done | Done | Done | Done | Done | Done | Done | DONE |
| PAC-TASK-365 | PAC-575 | US-118 | Implement idempotent graph job claiming | `feature/PAC-575-task-365-implement-idempotent-graph-job-claiming` | Done | Done | Done | Done | Done | Done | Done | DONE |
| PAC-TASK-366 | PAC-576 | US-119 | Upsert Medicine node to Neo4j | `feature/PAC-576-task-366-upsert-medicine-node-to-neo4j` | Technically complete | Done | Done | Done | Done | Done | Done | DONE |
| PAC-TASK-367 | PAC-577 | US-120 | Upsert ActiveIngredient node to Neo4j | `feature/PAC-577-task-367-upsert-activeingredient-node-to-neo4j` | Technically complete | Done | Done | Done | Done | Done | Done | DONE |
| PAC-TASK-368 | PAC-578 | US-121 | Upsert CONTAINS relationship | `feature/PAC-578-task-368-upsert-contains-relationship` | Technically complete | Done | Done | Done | Done | Done | Done | DONE |
| PAC-TASK-369 | PAC-579 | US-122 | Upsert INTERACTS_WITH relationship | `feature/PAC-579-task-369-upsert-interacts-with-relationship` | Technically complete | Done | Done | Done | Done | Done | Done | DONE |
| PAC-TASK-370 | PAC-580 | US-123 | Implement canonical directed interaction edge logic | `feature/PAC-580-task-370-implement-canonical-directed-interaction-edge-logic` | Technically complete | Done | Done | Done | Done | Done | Done | DONE |
| PAC-TASK-371 | PAC-581 | US-122 | Store rule properties on INTERACTS_WITH relationship | `feature/PAC-581-task-371-store-rule-properties-on-interacts-with-relationshi` | Technically complete | Done | Done | Done | Done | Done | Done | DONE |
| PAC-TASK-372 | PAC-582 | US-124 | Store sourceVersion, sourceUpdatedAt and syncedAt metadata | `feature/PAC-582-task-372-store-sourceversion-sourceupdatedat-and-syncedat-me` | Technically complete | Done | Done | Done | Done | Done | Done | DONE |
| PAC-TASK-373 | PAC-583 | US-128 | Mark deactivated Medicine and ActiveIngredient as isActive=false | `feature/PAC-583-task-373-mark-deactivated-medicine-and-activeingredient-as-i` | Technically complete | Done | Done | Done | Done | Done | Done | DONE |
| PAC-TASK-374 | PAC-584 | US-128 | Mark deactivated interaction rule edge as isActive=false | `feature/PAC-584-task-374-mark-deactivated-interaction-rule-edge-as-isactive-` | Technically complete | Done | Done | Done | Done | Done | Done | DONE |
| PAC-TASK-375 | PAC-585 | US-128 | Filter normal Neo4j queries to active data only | `feature/PAC-585-task-375-filter-normal-neo4j-queries-to-active-data-only` | Technically complete | Done | Done | Done | Done | Done | Done | DONE |
| PAC-TASK-376 | PAC-586 | US-125 | Implement retry logic for failed graph sync jobs | `feature/PAC-586-task-376-implement-retry-logic-for-failed-graph-sync-jobs` | Technically complete | Done | Done | Done | Done | Done | Done | DONE |
| PAC-TASK-377 | PAC-587 | US-125 | Add max retry and failed status handling | `feature/PAC-587-task-377-add-max-retry-and-failed-status-handling` | Technically complete | Done | Done | Done | Done | Done | Done | DONE |
| PAC-TASK-378 | PAC-588 | US-126 | Log graph sync failure details | `feature/PAC-588-task-378-log-graph-sync-failure-details` | Technically complete | Done | Done | Done | Done | Done | Done | DONE |
| PAC-TASK-379 | PAC-589 | US-126 | Write audit log for graph sync failures | `feature/PAC-589-task-379-write-audit-log-for-graph-sync-failures` | Technically complete | Done | Done | Done | Done | Done | Done | DONE |
| PAC-TASK-380 | PAC-590 | US-124 | Implement graph projection source version tracking | `feature/PAC-590-task-380-implement-graph-projection-source-version-tracking` | Technically complete | Done | Done | Done | Done | Done | Done | DONE |
| PAC-TASK-381 | PAC-591 | US-127 | Implement graph freshness detection service | `feature/PAC-591-task-381-implement-graph-freshness-detection-service` | Technically complete | Done | Done | Done | Done | Done | Done | DONE |
| PAC-TASK-382 | PAC-592 | US-127 | Detect stale graph from pending outbox job | `feature/PAC-592-task-382-detect-stale-graph-from-pending-outbox-job` | Technically complete | Done | Done | Done | Done | Done | Done | DONE |
| PAC-TASK-383 | PAC-593 | US-127 | Detect stale graph from failed relevant outbox job | `feature/PAC-593-task-383-detect-stale-graph-from-failed-relevant-outbox-job` | Technically complete | Done | Done | Done | Done | Done | Done | DONE |
| PAC-TASK-384 | PAC-594 | US-127 | Detect stale graph from missing sourceVersion projection | `feature/PAC-594-task-384-detect-stale-graph-from-missing-sourceversion-proje` | Technically complete | Done | Done | Done | Done | Done | Done | DONE |
| PAC-TASK-385 | PAC-595 | US-118 | Add Graph Sync worker unit tests | `test/PAC-595-task-385-add-graph-sync-worker-unit-tests` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-386 | PAC-596 | US-119 | Add Neo4j projection integration tests | `test/PAC-596-task-386-add-neo4j-projection-integration-tests` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-387 | PAC-597 | US-122 | Add INTERACTS_WITH projection tests | `test/PAC-597-task-387-add-interacts-with-projection-tests` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-388 | PAC-598 | US-127 | Add graph freshness detection tests | `test/PAC-598-task-388-add-graph-freshness-detection-tests` | Technically complete | Done | Done | Done | Done | Done | Done | DONE |
| PAC-TASK-389 | PAC-599 | US-125 | Add graph sync retry and failure tests | `test/PAC-599-task-389-add-graph-sync-retry-and-failure-tests` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-390 | PAC-600 | US-117 | Add Graph Sync traceability notes | `feature/PAC-600-task-390-add-graph-sync-traceability-notes` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | TO DO |

Status values:

```text
Not started
In progress
Ready for merge
Technically complete
Blocked
Failed verification
N/A
```

Chỉ ghi `Technically complete` sau khi PR đã merge và merge SHA xuất hiện trên remote `develop`.

# 13. Technical Phase Progress

| Phase | Task scope | Status | Completion | Key evidence |
|---|---|---|---:|---|
| Phase 1 — Transactional Outbox Foundation | PAC-TASK-356 → PAC-TASK-361 | In progress | 2/6 | a14db719042de81646de117352a8938f7731d181 |
| Phase 2 — Neo4j Connection, Worker and Claiming | PAC-TASK-362 → PAC-TASK-365 | Not started | 0/4 | — |
| Phase 3 — Projection and Active-data Semantics | PAC-TASK-366 → PAC-TASK-375; PAC-TASK-380 | Not started | 0/11 | — |
| Phase 4 — Retry, Failure Logging and Audit | PAC-TASK-376 → PAC-TASK-379 | Not started | 0/4 | — |
| Phase 5 — Freshness Detection | PAC-TASK-381 → PAC-TASK-384 | Not started | 0/4 | — |
| Phase 6 — Tests and Traceability | PAC-TASK-385 → PAC-TASK-390 | Not started | 0/6 | — |

# 14. Graph Sync Invariant Checklist

## PostgreSQL source of truth

- [ ] Source entities remain authoritative in PostgreSQL.
- [ ] Neo4j write failure does not corrupt source transaction.
- [ ] Neo4j never writes business changes back to PostgreSQL.
- [ ] POS, interaction check and checkout remain independent from graph availability.

## Transactional outbox

- [ ] Source change and outbox event are transactionally consistent.
- [ ] No controller/service performs unsafe direct dual-write.
- [ ] Event contains entity type, entity ID, event type and source version.
- [ ] Outbox query has suitable indexes.

## Worker

- [ ] Atomic claim prevents duplicate concurrent processing.
- [ ] Job lifecycle is explicit.
- [ ] Retry count is bounded.
- [ ] Failed state and safe error summary persist.
- [ ] Reprocessing the same event is idempotent.

## Projection

- [ ] Medicine nodes use relational IDs.
- [ ] ActiveIngredient nodes use relational IDs.
- [ ] Raw scraped strings are not authoritative nodes.
- [ ] CONTAINS is idempotent.
- [ ] INTERACTS_WITH is canonical and idempotent.
- [ ] `isActive=false` preserves provenance.
- [ ] Normal queries exclude inactive data.

## Freshness

- [ ] Source version is persisted/projected.
- [ ] Pending relevant jobs mark graph stale.
- [ ] Failed relevant jobs mark graph stale.
- [ ] Missing/outdated projection marks graph stale.
- [ ] Freshness response has machine-readable reason.
- [ ] Stale graph is not silently trusted.

# 15. Prisma and Migration Register

| Migration/Schema change | Task | Branch | Migration file | Prisma validate | Prisma generate | Supabase apply | Rollback/cleanup | Result |
|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | Pending | Pending | Pending/N/A | — | Pending |

Expected persistent scope:

```text
GraphSyncOutbox
GraphSyncJobStatus
source version metadata or derivation
retry/failure metadata
```

# 16. Neo4j Projection Evidence

| Scope | Expected | Actual | Result | Evidence |
|---|---|---|---|---|
| Medicine nodes | Stable relational identity, active/source metadata | — | Pending | — |
| ActiveIngredient nodes | Stable relational identity, active/source metadata | — | Pending | — |
| CONTAINS | No duplicate relationships | — | Pending | — |
| INTERACTS_WITH | Canonical direction and rule properties | — | Pending | — |
| Deactivation | `isActive=false`, normal filters exclude inactive | — | Pending | — |
| Idempotency | Replay does not create duplicate graph data | — | Pending | — |
| Failure behavior | Source systems remain operational | — | Pending | — |

# 17. Retry and Failure Evidence

| Scenario | Expected | Task/Story | Result | Evidence |
|---|---|---|---|---|
| Transient Neo4j error | Bounded retry | US-125 | Pending | — |
| Max retry reached | Job becomes FAILED | US-125 | Pending | — |
| Duplicate worker claim | Only one processor owns job | US-118 | Pending | — |
| Same event replay | Idempotent graph state | US-118 | Pending | — |
| Failure log | Safe summary, no credentials | US-126 | Pending | — |
| Neo4j unavailable | POS/checkout unaffected | Cross-cutting | Pending | — |

# 18. Findings Register

| Finding ID | Severity | Story/Task | Finding | Evidence | Required action | Owner | Status |
|---|---|---|---|---|---|---|---|
| S8-FIND-001 | — | — | Chưa có | — | — | — | Open |

Severity:

```text
Blocker
High
Medium
Low
Observation
```

# 19. Bug Candidate Register

AI không tự tạo Jira Bug Key.

| Candidate ID | Severity | Affected Task/Story | Summary | Evidence | Jira Bug Key required | Status |
|---|---|---|---|---|---|---|
| S8-BUG-CAND-001 | — | — | Chưa có | — | No | Open |

Mẫu:

```text
Bug Candidate:
Severity:
Affected Task/Story:
Actual:
Expected:
Evidence:
```

# 20. Manual Jira Update Queue

| Logical Issue | Jira Key | Recommended status | Technical evidence | Project Owner action | Status |
|---|---|---|---|---|---|
| Chưa có | — | — | — | — | Pending |

AI chỉ đề xuất trạng thái. Project Owner thực hiện mọi Jira write action.

# 21. Session Handoff

| Field | Current value |
|---|---|
| Current phase | Phase 1 — Transactional Outbox Foundation |
| Current Task | PAC-TASK-373 |
| Current Jira Key | PAC-583 |
| Current exact branch | `feature/PAC-583-task-373-mark-deactivated-medicine-and-activeingredient-as-i` |
| Current PR | None |
| Last merged Task | PAC-TASK-357 |
| Last merge SHA | a14db719042de81646de117352a8938f7731d181 |
| Next Task | PAC-TASK-359 |
| Next Jira Key | PAC-569 |
| Next exact branch | `feature/PAC-569-task-359-emit-outbox-event-from-activeingredient-changes` |
| Blockers | None |

Khi kết thúc phiên:

1. Cập nhật current/next Task.
2. Ghi PR, merge SHA và blocker.
3. Cập nhật `WORKING-CONTEXT.md`.
4. Không tuyên bố Sprint hoàn thành nếu Final Review chưa PASS.

# 22. Sprint Final Review Checklist

- [ ] 35/35 Tasks verified.
- [ ] 35/35 applicable PRs merged into `develop`.
- [ ] 12/12 Story Acceptance Reviews PASS.
- [ ] PAC-EPIC-14 Review PASS.
- [ ] 48/48 canonical branches reconciled.
- [ ] Backend lint/typecheck/build PASS.
- [ ] Relevant unit/integration tests PASS.
- [ ] Prisma validate/generate/migration evidence PASS.
- [ ] Controlled Supabase verification PASS.
- [ ] Controlled Neo4j verification PASS.
- [ ] No duplicate nodes/relationships.
- [ ] Retry/failure tests PASS.
- [ ] Freshness tests PASS.
- [ ] Neo4j outage does not affect POS/checkout.
- [ ] Blocking defects = 0.
- [ ] High defects = 0.
- [ ] Sprint 8 Final Review = PASS.
- [ ] Ready for Sprint 9 = Yes.

# 23. Final Progress Report Template

```markdown
# Sprint 8 Progress Report

## Status

- Sprint 7 Final Review: PASS/FAIL/Pending
- Sprint 8 Audit: PASS/FAIL/Pending
- Ready to implement Sprint 8: Yes/No
- Tasks complete: x/35
- Stories PASS: x/12
- Epic Review: PASS/FAIL/Pending
- Blocking findings: x
- High findings: x

## Evidence

- Latest develop SHA:
- Last merged Task:
- Last PR:
- PostgreSQL/Supabase:
- Neo4j:
- Tests/builds:
- Local Quality Gate:
- CI: N/A — GitHub Actions chưa được cấu hình

## Next

- Next Task:
- Jira Key:
- Exact branch:
- Blocker/owner action:
```

# 24. Current Official State

```text
Sprint 7 implementation = In progress
Sprint 8 plan = Prepared
Sprint 8 progress tracker = Prepared
Sprint 8 audit = Not created
Sprint 8 agent prompt = Not created
Sprint 8 final review prompt = Not created
Ready to implement Sprint 8 = No
CI = N/A — GitHub Actions chưa được cấu hình
Quality Gate = Local Quality Gate
```
