# Sprint 9 Progress — PharmaAssist AI Intelligence

> **Repository path đề xuất:** `work-context/sprint-9/sprint-9-progress.md`
>
> Tài liệu này ghi nhận technical progress, verification evidence và handoff của Sprint 9. Jira do Project Owner cập nhật thủ công.

## Canonical Sources

1. `Jira/branch-on-jira.md` — nguồn duy nhất cho Jira Key và exact branch.
2. `Jira/jira-mapping.md` — mapping Logical Key ↔ Jira Key.
3. `work-context/sprint-9/sprint-9.md` — phạm vi, dependency và Definition of Done.
4. `Jira/3_Stories.md` — Story và Acceptance Criteria.
5. `Jira/4C_Task_List_MVP_AI_Graph_Report_Demo_291_435.md` — Task mapping.
6. `Jira/4C_Task_Description_MVP_AI_Graph_Report_Demo_291_435.md` — yêu cầu chi tiết.

Quy tắc:

- Không đổi, rút gọn hoặc tự tạo branch thay thế.
- Task/Bug PR luôn target `develop`.
- Không tạo Story PR hoặc Epic PR.
- Story/Epic review chạy trên latest `develop`.
- GitHub Actions chưa cấu hình: `CI = N/A`; dùng Local Quality Gate.
- PostgreSQL là source of truth.
- Neo4j chỉ cung cấp read projection/context.
- Graph-RAG chỉ giải thích, không quyết định checkout.
- Staff không được gửi raw Cypher.
- Reports phải deterministic; AI không tính report totals.
- Chỉ Project Owner merge `develop → main` và cập nhật Jira.

---

# 1. Sprint Information

| Mục | Nội dung |
|---|---|
| Sprint | Sprint 9 |
| Tên Sprint | Graph-RAG, PostgreSQL Fallback, Reports & System Settings |
| Scope | MVP / Core |
| Core Epics | PAC-EPIC-15, PAC-EPIC-16, PAC-EPIC-17 |
| Supporting Epic | PAC-EPIC-19 |
| Stories | US-129 → US-141 và US-144 |
| Số Story triển khai | 14 |
| Story Points | 45 |
| Tasks | PAC-TASK-391 → PAC-TASK-424 |
| Số Task | 34 |
| Task Jira Keys | PAC-601 → PAC-634 |
| Branch inventory | 51 = 34 Task + 14 Story legacy + 3 Core Epic legacy |
| Task/Bug PR target | `develop` |
| PostgreSQL | Source of truth |
| Neo4j | Read projection/context |
| AI baseline | Sprint 7 provider, guardrail, prompt và audit |
| Graph baseline | Sprint 8 sync, projection và freshness |
| CI | N/A — GitHub Actions chưa được cấu hình |
| Merge gate | Local Quality Gate |
| Jira management | Manual by Project Owner |
| Current phase | Prepared |
| Sprint 8 Final Review | PASS |
| Sprint 9 Audit | PASS |
| Ready to implement Sprint 9 | Yes |
| Ready for Sprint 10 | No |

# 2. Official Workflow

```text
Task/Bug branch đã tồn tại
→ pull latest develop
→ đọc Task và Acceptance Criteria
→ code đúng Task scope
→ targeted checks
→ Prisma/Supabase/Neo4j/AI verification khi cần
→ review diff, secret, raw Cypher và deterministic logic
→ commit + push
→ PR vào develop
→ Local Quality Gate PASS
→ merge vào develop
→ xác minh merge SHA trên remote develop
→ cập nhật technical progress
→ tiếp tục Task kế tiếp theo technical order
```

Story completion: Acceptance Review trên latest `develop`.

Epic completion:

```text
PAC-EPIC-15 Graph-RAG Integration/Regression Review
PAC-EPIC-16 Reports Deterministic Review
PAC-EPIC-17 System Settings Review
```

Sprint 9 chỉ được triển khai sau khi Sprint 8 Final Review PASS và Sprint 9 Audit PASS.

# 3. Progress Update Cadence

Chỉ cập nhật tài liệu này khi:

1. Task/Bug PR đã merge hoặc bị blocker.
2. Story Acceptance Review hoàn tất.
3. Core Epic Review hoàn tất.
4. Có Prisma/Supabase/Neo4j/AI evidence.
5. Có Graph-RAG fallback, provenance hoặc freshness verification.
6. Có report calculation hoặc settings verification.
7. Kết thúc phiên làm việc hoặc cần handoff.
8. Sprint Final Review hoàn tất.

Không tạo documentation-only PR sau mỗi Task chỉ để ghi merge SHA. Có thể đồng bộ progress trong Task kế tiếp hoặc cuối phiên.

# 4. Sprint Summary

| Hạng mục | Tổng | Not started | In progress | Ready for merge | Technically complete |
|---|---:|---:|---:|---:|---:|
| Core Epic technical reviews | 3 | 3 | 0 | 0 | 0 |
| Story Acceptance Reviews | 14 | 14 | 0 | 0 | 0 |
| Task implementation | 34 | 34 | 0 | 0 | 0 |
| Bug candidates | 0 | 0 | 0 | 0 | 0 |

## Completion Counters

- [ ] 34/34 exact Task branches used.
- [ ] 34/34 applicable Task/Bug PRs merged into `develop`.
- [ ] 14/14 Story Acceptance Reviews PASS.
- [ ] PAC-EPIC-15 Graph-RAG Review PASS.
- [ ] PAC-EPIC-16 Reports Review PASS.
- [ ] PAC-EPIC-17 System Settings Review PASS.
- [ ] Allowlisted and parameterized graph queries PASS.
- [ ] Graph-RAG provenance metadata PASS.
- [ ] Graph-RAG freshness metadata PASS.
- [ ] PostgreSQL fallback for unavailable/stale graph PASS.
- [ ] Raw Cypher no-access PASS.
- [ ] Graph-not-checkout guard PASS.
- [ ] AI guardrail/audit regression PASS.
- [ ] Revenue Report deterministic verification PASS.
- [ ] Top Medicines Report deterministic verification PASS.
- [ ] Inventory Report from MedicineBatch PASS.
- [ ] Near-expiry threshold model/default/API/UI/tests PASS.
- [ ] Prisma/Supabase/Neo4j verification PASS.
- [ ] Sprint 9 Final Review PASS.
- [ ] Blocking defects = 0.
- [ ] High defects = 0.
- [ ] Ready for Sprint 10 = Yes.

# 5. Tool and Environment Evidence

| Tool/Area | Status | Required for | Evidence |
|---|---|---|---|
| GitHub/Git | Pending | Branch, PR, merge và remote verification | — |
| Local Quality Gate | Pending | Mọi Task/Bug PR | — |
| PostgreSQL/Supabase access | Pending | Fallback, reports, settings và migration verification | — |
| Safe Supabase environment | Pending | Controlled write/integration tests | — |
| Neo4j AuraDB access | Pending | Graph-RAG context và failure-path verification | — |
| Safe Neo4j environment | Pending | Controlled read/availability tests | — |
| Neo4j backend driver | Pending | Runtime Graph-RAG | — |
| Sprint 7 AI provider/guardrails | Pending verification | Graph-RAG response pipeline | — |
| Sprint 8 freshness service | Pending verification | Graph selection/fallback | — |
| Jira | Project Owner managed | Manual status/comment/Bug updates | AI write actions disabled |
| GitHub Actions | Not configured | Không dùng trong Sprint 9 | CI = N/A |

# 6. Local Quality Gate Evidence

| Issue | Lint/Typecheck | Targeted tests | Build | Prisma | Supabase | Neo4j | AI/Guardrail | Diff/Security review | Conflict | Gate | Evidence |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Chưa cập nhật | Pending/N/A | Pending | Pending/N/A | Pending/N/A | Pending/N/A | Pending/N/A | Pending/N/A | Pending | Pending | Pending | — |

N/A chuẩn:

```text
Supabase = N/A — no persistent data impact
Neo4j = N/A — no graph query/projection impact
AI = N/A — no AI or Graph-RAG behavior impact
```

Local Quality Gate chỉ PASS khi mọi check phù hợp đều PASS hoặc có N/A hợp lệ.

# 7. Graph-RAG Verification Log

| Verification ID | Story/Task | Scenario | Graph availability | Freshness | Expected source | Actual source | graphUsed | Provenance | Result | Evidence |
|---|---|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | — | — | Pending | — |

Suggested ID:

```text
S9-GRAPH-RAG-<TASK>-<timestamp-or-uuid>
```

Scenarios cần evidence:

- Fresh graph explanation.
- Medicine → CONTAINS → ActiveIngredient context.
- ActiveIngredient → INTERACTS_WITH context.
- Correct `graphUsed=true`.
- Provenance chứa source IDs/rule IDs.
- Freshness status/reason đúng.
- Graph context vẫn qua AI guardrail/output validation.

# 8. PostgreSQL Fallback Verification Log

| Verification ID | Story/Task | Trigger | Graph status | PostgreSQL source | Expected response | Actual response | graphUsed | degraded/fallback reason | Result | Evidence |
|---|---|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | — | — | Pending | — |

Required scenarios:

```text
Neo4j unavailable
Graph stale from pending job
Graph stale from failed job
Missing projection/sourceVersion mismatch
Graph-only query without fallback
```

# 9. Raw Cypher and Checkout Independence Log

| Verification ID | Story/Task | Scenario | Actor | Expected | Actual | Result | Evidence |
|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | Pending | — |

Required evidence:

- Staff cannot submit raw Cypher.
- No generic arbitrary Cypher endpoint is exposed.
- Allowlisted templates are parameterized.
- Graph/AI response does not alter checkout decision.
- Neo4j unavailable/stale does not unlock or block checkout differently.

# 10. AI Safety and Audit Regression Log

| Verification ID | Story/Task | Input guardrail | PII minimization | Provider/fallback | Output validation | Audit/provenance | Result | Evidence |
|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | Pending | — |

Graph-RAG phải tái sử dụng Sprint 7 safety baseline, không bypass guardrails hoặc audit.

# 11. Report Verification Log

| Verification ID | Report | Story/Task | Scenario | Expected calculation | Actual calculation | Filters/time boundary | Permission | Result | Evidence |
|---|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | — | Pending | — |

Required scenarios:

## Revenue

- Chỉ PAID orders.
- Exclude DRAFT, CANCELLED và failed payment attempts.
- Date range validation.
- Deterministic totals.

## Top Medicines

- PAID data only.
- Deterministic quantity aggregation và ranking.
- Stable handling of ties theo repository contract.

## Inventory

- MedicineBatch là source of truth.
- Expired batches không thuộc sellable quantity.
- Near-expiry dùng setting.
- Permission đúng cho Admin/Warehouse.

# 12. System Settings Verification Log

| Verification ID | Story/Task | Scenario | Expected | Actual | Database state | Permission | Result | Evidence |
|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | Pending | — |

Required scenarios:

- Default threshold = 90.
- Valid Admin update.
- Invalid/negative/non-integer rejection.
- Unauthorized update rejection.
- Near-expiry calculation đọc giá trị mới.
- No duplicate hard-coded threshold after service adoption.

# 13. Core Epic Technical Progress

## PAC-EPIC-15 — Graph-RAG

- **Jira Key:** `PAC-15`
- **Legacy Epic branch:** `epic/PAC-15-epic-15-graph-rag`
- **Branch usage:** Traceability only — no Epic PR
- **Technical review branch:** `develop`

| Technical status | Stories PASS | Tasks merged | Integration/Regression Review | PostgreSQL evidence | Neo4j evidence | AI evidence | Blocking defects | Recommended Jira status |
|---|---:|---:|---|---|---|---|---|---|
| Not started | 0/8 | 0/20 | Pending | Pending | Pending | Pending | — | TO DO |

Checklist:

- [ ] Allowlisted Graph-RAG queries PASS.
- [ ] Provenance/freshness metadata PASS.
- [ ] PostgreSQL fallback PASS.
- [ ] Raw Cypher no-access PASS.
- [ ] Graph-not-checkout guard PASS.
- [ ] AI safety/audit regression PASS.
- [ ] No unresolved Blocking/High defect.
- [ ] No Epic PR.

## PAC-EPIC-16 — Reports

- **Jira Key:** `PAC-16`
- **Legacy Epic branch:** `epic/PAC-16-epic-16-reports`
- **Branch usage:** Traceability only — no Epic PR
- **Technical review branch:** `develop`

| Technical status | Stories PASS | Tasks merged | Deterministic Review | PostgreSQL evidence | UI evidence | Blocking defects | Recommended Jira status |
|---|---:|---:|---|---|---|---|---|
| Not started | 0/4 | 0/9 | Pending | Pending | Pending | — | TO DO |

Checklist:

- [ ] Revenue only PAID PASS.
- [ ] Top Medicines deterministic PASS.
- [ ] Inventory from MedicineBatch PASS.
- [ ] Filters/states/permissions PASS.
- [ ] No AI-calculated totals.
- [ ] No unresolved Blocking/High defect.
- [ ] No Epic PR.

## PAC-EPIC-17 — System Settings

- **Jira Key:** `PAC-17`
- **Legacy Epic branch:** `epic/PAC-17-epic-17-system-settings`
- **Branch usage:** Traceability only — no Epic PR
- **Technical review branch:** `develop`

| Technical status | Stories PASS | Tasks merged | Settings Review | Prisma/Supabase evidence | UI evidence | Blocking defects | Recommended Jira status |
|---|---:|---:|---|---|---|---|---|
| Not started | 0/2 | 0/5 | Pending | Pending | Pending | — | TO DO |

Checklist:

- [ ] System settings schema/migration PASS.
- [ ] Default 90-day threshold PASS.
- [ ] Admin update API PASS.
- [ ] Minimal Settings UI PASS.
- [ ] Validation/permission tests PASS.
- [ ] Inventory calculation consumes setting.
- [ ] No unresolved Blocking/High defect.
- [ ] No Epic PR.

# 14. Story Acceptance Review Progress

| Story | Jira Key | Summary | Points | Tasks | Status | Acceptance Review | Evidence | Recommended Jira status |
|---|---|---|---:|---:|---|---|---|---|
| US-129 | PAC-169 | Graph-RAG interaction explanation | 5 | 6 | Not started | Pending | — | TO DO |
| US-130 | PAC-170 | Graph-RAG provenance metadata | 3 | 2 | Not started | Pending | — | TO DO |
| US-131 | PAC-171 | Graph-RAG freshness metadata | 3 | 2 | Not started | Pending | — | TO DO |
| US-132 | PAC-172 | PostgreSQL fallback khi Neo4j unavailable | 5 | 2 | Not started | Pending | — | TO DO |
| US-133 | PAC-173 | PostgreSQL fallback khi graph stale | 5 | 2 | Not started | Pending | — | TO DO |
| US-134 | PAC-174 | Safe error cho graph-only query | 3 | 1 | Not started | Pending | — | TO DO |
| US-135 | PAC-175 | Không cho Staff submit raw Cypher | 2 | 3 | Not started | Pending | — | TO DO |
| US-136 | PAC-176 | Graph không quyết định checkout | 2 | 2 | Not started | Pending | — | TO DO |
| US-137 | PAC-177 | Revenue Report | 3 | 3 | Not started | Pending | — | TO DO |
| US-138 | PAC-178 | Top Medicines Report | 3 | 2 | Not started | Pending | — | TO DO |
| US-139 | PAC-179 | Inventory Report | 3 | 2 | Not started | Pending | — | TO DO |
| US-140 | PAC-180 | Basic report filters | 2 | 2 | Not started | Pending | — | TO DO |
| US-141 | PAC-181 | Near-expiry threshold setting | 3 | 4 | Not started | Pending | — | TO DO |
| US-144 | PAC-184 | System settings UI tối thiểu | 3 | 1 | Not started | Pending | — | TO DO |

Story review rules:

- Chạy trên latest `develop` sau khi mọi Task của Story đã merge.
- Không tạo Story PR.
- Xác minh Acceptance Criteria và relevant tests.
- Kiểm tra PostgreSQL/Neo4j/AI evidence theo Story scope.
- Chỉ ghi PASS khi không còn Blocking/High defect.

# 15. Task Progress Register

| Logical Task | Jira Key | Story | Summary | Exact branch | Status | Commit | PR | Merge SHA | Local Gate | PostgreSQL/Supabase | Neo4j | AI/Guardrail | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-391 | PAC-601 | US-129 | Implement Graph-RAG interaction explanation service | `feature/PAC-601-task-391-implement-graph-rag-interaction-explanation-service` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-392 | PAC-602 | US-129 | Build allowlisted graph query templates | `feature/PAC-602-task-392-build-allowlisted-graph-query-templates` | Technically complete | feat(graph-rag): PAC-602 add allowlisted graph query templates | Yes | 2f94b63 | PASS | N/A | N/A | N/A | DONE |
| PAC-TASK-393 | PAC-603 | US-129 | Query Medicine-CONTAINS-ActiveIngredient context | `feature/PAC-603-task-393-query-medicine-contains-activeingredient-context` | Technically complete | feat(graph-rag): PAC-603 query medicine-contains-activeingredient context | Yes | PENDING_MERGE | PASS | N/A | N/A | N/A | DONE |
| PAC-TASK-394 | PAC-604 | US-129 | Query ActiveIngredient INTERACTS_WITH context | `feature/PAC-604-task-394-query-activeingredient-interacts-with-context` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-395 | PAC-605 | US-129 | Add Graph-RAG context builder for AI Copilot | `feature/PAC-605-task-395-add-graph-rag-context-builder-for-ai-copilot` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-396 | PAC-606 | US-130 | Return Graph-RAG provenance metadata | `feature/PAC-606-task-396-return-graph-rag-provenance-metadata` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-397 | PAC-607 | US-130 | Return graphUsed flag in Graph-RAG response | `feature/PAC-607-task-397-return-graphused-flag-in-graph-rag-response` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-398 | PAC-608 | US-131 | Return Graph-RAG freshness metadata | `feature/PAC-608-task-398-return-graph-rag-freshness-metadata` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-399 | PAC-609 | US-131 | Add freshness warning to Graph-RAG response | `feature/PAC-609-task-399-add-freshness-warning-to-graph-rag-response` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-400 | PAC-610 | US-132 | Implement PostgreSQL fallback when Neo4j unavailable | `feature/PAC-610-task-400-implement-postgresql-fallback-when-neo4j-unavailabl` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-401 | PAC-611 | US-133 | Implement PostgreSQL fallback when graph stale | `feature/PAC-611-task-401-implement-postgresql-fallback-when-graph-stale` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-402 | PAC-612 | US-134 | Implement safe error for graph-only query without fallback | `feature/PAC-612-task-402-implement-safe-error-for-graph-only-query-without-f` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-403 | PAC-613 | US-135 | Ensure Staff cannot submit raw Cypher | `feature/PAC-613-task-403-ensure-staff-cannot-submit-raw-cypher` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-404 | PAC-614 | US-135 | Add backend guard against raw Cypher APIs for Staff | `feature/PAC-614-task-404-add-backend-guard-against-raw-cypher-apis-for-staff` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-405 | PAC-615 | US-136 | Ensure Graph-RAG does not decide checkout | `feature/PAC-615-task-405-ensure-graph-rag-does-not-decide-checkout` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-406 | PAC-616 | US-129 | Build Graph-RAG explanation UI metadata display | `feature/PAC-616-task-406-build-graph-rag-explanation-ui-metadata-display` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-407 | PAC-617 | US-132 | Add Graph-RAG PostgreSQL fallback tests | `test/PAC-617-task-407-add-graph-rag-postgresql-fallback-tests` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-408 | PAC-618 | US-133 | Add stale graph fallback tests | `test/PAC-618-task-408-add-stale-graph-fallback-tests` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-409 | PAC-619 | US-135 | Add raw Cypher no-access tests | `test/PAC-619-task-409-add-raw-cypher-no-access-tests` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-410 | PAC-620 | US-136 | Add graph-not-checkout guard tests | `test/PAC-620-task-410-add-graph-not-checkout-guard-tests` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-411 | PAC-621 | US-137 | Implement Revenue Report API | `feature/PAC-621-task-411-implement-revenue-report-api` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-412 | PAC-622 | US-137 | Build Revenue Report UI | `feature/PAC-622-task-412-build-revenue-report-ui` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-413 | PAC-623 | US-140 | Add revenue report filters by date and status | `feature/PAC-623-task-413-add-revenue-report-filters-by-date-and-status` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-414 | PAC-624 | US-138 | Implement Top Medicines Report API | `feature/PAC-624-task-414-implement-top-medicines-report-api` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-415 | PAC-625 | US-138 | Build Top Medicines Report UI | `feature/PAC-625-task-415-build-top-medicines-report-ui` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-416 | PAC-626 | US-139 | Implement Inventory Report API from MedicineBatch | `feature/PAC-626-task-416-implement-inventory-report-api-from-medicinebatch` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-417 | PAC-627 | US-139 | Build Inventory Report UI | `feature/PAC-627-task-417-build-inventory-report-ui` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-418 | PAC-628 | US-140 | Add report empty, loading and error states | `feature/PAC-628-task-418-add-report-empty-loading-and-error-states` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-419 | PAC-629 | US-137 | Add report permission checks | `feature/PAC-629-task-419-add-report-permission-checks` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-420 | PAC-630 | US-141 | Create system_settings Prisma model | `feature/PAC-630-task-420-create-system-settings-prisma-model` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-421 | PAC-631 | US-141 | Seed default near-expiry threshold as 90 days | `feature/PAC-631-task-421-seed-default-near-expiry-threshold-as-90-days` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-422 | PAC-632 | US-141 | Implement near-expiry threshold settings API | `feature/PAC-632-task-422-implement-near-expiry-threshold-settings-api` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-423 | PAC-633 | US-144 | Build minimal System Settings UI for near-expiry threshold | `feature/PAC-633-task-423-build-minimal-system-settings-ui-for-near-expiry-th` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |
| PAC-TASK-424 | PAC-634 | US-141 | Add system settings validation and tests | `test/PAC-634-task-424-add-system-settings-validation-and-tests` | Not started | — | — | — | Pending | Pending/N/A | Pending/N/A | Pending/N/A | TO DO |

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

# 16. Technical Phase Progress

| Phase | Technical order | Status | Completion | Key evidence |
|---|---|---|---:|---|
| Phase 1 — Query Security and Context Foundation | 392 → 393 → 394 → 395 → 391 | Not started | 0/5 | — |
| Phase 2 — Provenance and Freshness | 396 → 397 → 398 → 399 | Not started | 0/4 | — |
| Phase 3 — Fallback and Safety Guards | 400 → 401 → 402 → 403 → 404 → 405 | Not started | 0/6 | — |
| Phase 4 — Graph-RAG UI and Tests | 406 → 407 → 408 → 409 → 410 | Not started | 0/5 | — |
| Phase 5 — Deterministic Reports | 411 → 414 → 416 → 419 → 413 → 412 → 415 → 417 → 418 | Not started | 0/9 | — |
| Phase 6 — System Settings | 420 → 421 → 422 → 423 → 424 | Not started | 0/5 | — |

# 17. Graph-RAG Invariant Checklist

## Source and query safety

- [ ] PostgreSQL remains source of truth.
- [ ] Neo4j is read context only.
- [ ] Only allowlisted query templates are used.
- [ ] All Cypher inputs are parameterized.
- [ ] Staff cannot submit raw Cypher.
- [ ] No arbitrary graph traversal endpoint is exposed.

## Selection and fallback

- [ ] Fresh graph path uses Neo4j context.
- [ ] Unavailable graph falls back to PostgreSQL.
- [ ] Stale graph falls back to PostgreSQL.
- [ ] Missing projection does not get treated as fresh.
- [ ] Graph-only query without fallback returns safe error.
- [ ] `graphUsed`, degraded state và fallback reason are correct.

## Provenance and AI safety

- [ ] Response includes source/provenance metadata.
- [ ] Freshness status/reason is included.
- [ ] Graph context passes input/output guardrails.
- [ ] PII minimization remains active.
- [ ] AI Audit records provider, prompt, source và guardrail metadata.
- [ ] No raw graph credential or secret is exposed.

## Checkout independence

- [ ] Graph-RAG cannot acknowledge HIGH alert.
- [ ] Graph-RAG cannot create official consultation note without confirmation.
- [ ] Graph-RAG cannot decide checkout.
- [ ] Neo4j outage does not change checkout authorization.

# 18. Prisma and Migration Register

| Migration/Schema change | Task | Branch | Migration file | Prisma validate | Prisma generate | Supabase apply | Rollback/cleanup | Result |
|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | Pending | Pending | Pending/N/A | — | Pending |

Expected persistent scope:

```text
system_settings
near-expiry threshold default/seed
updated metadata theo repository convention
```

Graph-RAG Task không mặc định cần migration nếu chỉ dùng Sprint 8 graph/freshness baseline.

# 19. Deterministic Report Evidence

| Scope | Expected | Actual | Result | Evidence |
|---|---|---|---|---|
| Revenue | PAID orders only | — | Pending | — |
| Revenue exclusions | DRAFT/CANCELLED/failed payment excluded | — | Pending | — |
| Revenue date filters | Validated boundaries | — | Pending | — |
| Top Medicines | Deterministic PAID quantity aggregation | — | Pending | — |
| Inventory | MedicineBatch source of truth | — | Pending | — |
| Sellable quantity | Expired batches excluded | — | Pending | — |
| Near-expiry | Current system setting used | — | Pending | — |
| Permissions | Correct Admin/Warehouse/Staff behavior | — | Pending | — |

# 20. Security and Privacy Evidence

| Area | Expected | Result | Evidence |
|---|---|---|---|
| Raw Cypher | Not accepted from Staff | Pending | — |
| Cypher parameterization | No raw input concatenation | Pending | — |
| Neo4j credentials | Backend env only; absent from logs/evidence | Pending | — |
| PII minimization | Active before AI call | Pending | — |
| Unsafe AI categories | Diagnosis/prescribing/dosage blocked | Pending | — |
| AI audit | No raw PII/secret | Pending | — |
| Checkout authorization | Independent from Graph-RAG | Pending | — |

# 21. Findings Register

| Finding ID | Severity | Story/Task | Finding | Evidence | Required action | Owner | Status |
|---|---|---|---|---|---|---|---|
| S9-FIND-001 | — | — | Chưa có | — | — | — | Open |

Severity:

```text
Blocker
High
Medium
Low
Observation
```

# 22. Bug Candidate Register

AI không tự tạo Jira Bug Key.

| Candidate ID | Severity | Affected Task/Story | Summary | Evidence | Jira Bug Key required | Status |
|---|---|---|---|---|---|---|
| S9-BUG-CAND-001 | — | — | Chưa có | — | No | Open |

Mẫu:

```text
Bug Candidate:
Severity:
Affected Task/Story:
Actual:
Expected:
Evidence:
```

# 23. Manual Jira Update Queue

| Logical Issue | Jira Key | Recommended status | Technical evidence | Project Owner action | Status |
|---|---|---|---|---|---|
| Chưa có | — | — | — | — | Pending |

AI chỉ đề xuất trạng thái. Project Owner thực hiện mọi Jira write action.

# 24. Session Handoff

| Field | Current value |
|---|---|
| Current phase | Prepared |
| Current Task | None |
| Current Jira Key | None |
| Current exact branch | None |
| Current PR | None |
| Last merged Task | None |
| Last merge SHA | None |
| Next Task | PAC-TASK-392 |
| Next Jira Key | PAC-602 |
| Next exact branch | `feature/PAC-602-task-392-build-allowlisted-graph-query-templates` |
| Blockers | Sprint 8 Final Review and Sprint 9 Audit pending |

Khi kết thúc phiên:

1. Cập nhật current/next Task.
2. Ghi PR, merge SHA và blocker.
3. Ghi PostgreSQL/Neo4j/AI/report/settings evidence.
4. Cập nhật `WORKING-CONTEXT.md`.
5. Không tuyên bố Sprint hoàn thành nếu Final Review chưa PASS.

# 25. Sprint Final Review Checklist

- [ ] 34/34 Tasks verified.
- [ ] 34/34 applicable PRs merged into `develop`.
- [ ] 14/14 Story Acceptance Reviews PASS.
- [ ] PAC-EPIC-15 Review PASS.
- [ ] PAC-EPIC-16 Review PASS.
- [ ] PAC-EPIC-17 Review PASS.
- [ ] 51/51 canonical branches reconciled.
- [ ] Backend/frontend lint, typecheck và build PASS.
- [ ] Relevant unit/integration/E2E tests PASS.
- [ ] Graph-RAG fresh path PASS.
- [ ] Unavailable/stale PostgreSQL fallback PASS.
- [ ] Provenance/freshness metadata PASS.
- [ ] Raw Cypher no-access PASS.
- [ ] Graph-not-checkout guard PASS.
- [ ] AI safety/audit regression PASS.
- [ ] Revenue/Top Medicines/Inventory reports PASS.
- [ ] System Settings model/default/API/UI/tests PASS.
- [ ] Prisma validate/generate/migration evidence PASS.
- [ ] Controlled Supabase verification PASS.
- [ ] Controlled Neo4j verification PASS.
- [ ] Blocking defects = 0.
- [ ] High defects = 0.
- [ ] Sprint 9 Final Review = PASS.
- [ ] Ready for Sprint 10 = Yes.

# 26. Final Progress Report Template

```markdown
# Sprint 9 Progress Report

## Status

- Sprint 8 Final Review: PASS/FAIL/Pending
- Sprint 9 Audit: PASS/FAIL/Pending
- Ready to implement Sprint 9: Yes/No
- Tasks complete: x/34
- Stories PASS: x/14
- Epic Reviews: x/3
- Blocking findings: x
- High findings: x

## Evidence

- Latest develop SHA:
- Last merged Task:
- Last PR:
- Graph-RAG:
- PostgreSQL fallback:
- Raw Cypher/checkout guards:
- AI safety/audit:
- Reports:
- System Settings:
- Prisma/Supabase:
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

# 27. Current Official State

```text
Sprint 8 implementation = Completed
Sprint 8 Final Review = PASS
Sprint 9 plan = Prepared
Sprint 9 progress tracker = Prepared
Sprint 9 audit = PASS
Sprint 9 agent prompt = Prepared
Sprint 9 final review prompt = Prepared
Ready to implement Sprint 9 = Yes
CI = N/A — GitHub Actions chưa được cấu hình
Quality Gate = Local Quality Gate
```
