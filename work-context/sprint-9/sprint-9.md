# Sprint 9 — Graph-RAG, PostgreSQL Fallback, Reports & System Settings

> **PharmaAssist AI Intelligence**
>
> Repository path đề xuất:
>
> `work-context/sprint-9/sprint-9.md`

## Canonical Sources

1. `Jira/branch-on-jira.md` — Jira Key và exact branch.
2. `Jira/3_Stories.md` — Story, priority, Story Point và Acceptance Criteria.
3. `Jira/4C_Task_List_MVP_AI_Graph_Report_Demo_291_435.md` — Task mapping.
4. `Jira/4C_Task_Description_MVP_AI_Graph_Report_Demo_291_435.md` — yêu cầu chi tiết.
5. `Jira/5_Sprint.md` — Sprint range và MVP gate.
6. Sprint 7 AI safety/provider baseline.
7. Sprint 8 Graph Sync/projection/freshness baseline.

Quy tắc:

- PostgreSQL tiếp tục là source of truth.
- Neo4j chỉ cung cấp read context cho Graph-RAG.
- `Jira/branch-on-jira.md` là nguồn duy nhất cho exact branch.
- Không đổi, rút gọn hoặc tự tạo branch thay thế.
- Task/Bug PR target `develop`; không tạo Story PR hoặc Epic PR.
- GitHub Actions chưa được cấu hình; dùng Local Quality Gate.
- Chỉ Project Owner merge `develop → main`.
- AI/Graph không quyết định checkout.
- Staff không được gửi raw Cypher.
- Reports phải deterministic; AI không tính số liệu báo cáo.

> Trạng thái chuẩn bị:
>
> ```text
> Sprint 9 = Prepared
> Sprint 8 = In progress
> Sprint 8 Final Review = Pending
> Sprint 9 Audit = Pending
> Ready to implement Sprint 9 = No
> ```

---

# 1. Sprint Overview

| Mục | Nội dung |
|---|---|
| Sprint | Sprint 9 |
| Tên | Graph-RAG, PostgreSQL Fallback, Reports & System Settings |
| Scope | MVP / Core |
| Core Epics | PAC-EPIC-15, PAC-EPIC-16, PAC-EPIC-17 |
| Supporting Epic | PAC-EPIC-19 |
| Implementation Stories | US-129 → US-141 và US-144 |
| Dependency Stories | US-142 và US-143 đã hoàn tất trong Sprint 7 |
| Số Story triển khai | 14 |
| Story Points | 45 |
| Tasks | PAC-TASK-391 → PAC-TASK-424 |
| Số Task | 34 |
| Task Jira Keys | PAC-601 → PAC-634 |
| Branch inventory | 51 = 34 Task + 14 Story legacy + 3 Core Epic legacy |
| PostgreSQL | Source of truth |
| Neo4j | Read projection/context source |
| AI | Sprint 7 provider, guardrail, audit và prompt baseline |
| CI | N/A — GitHub Actions chưa được cấu hình |
| Merge gate | Local Quality Gate |
| Jira management | Manual by Project Owner |

> Story group trong Sprint plan được ghi tổng quát là `US-129 → US-144`. Tuy nhiên, Sprint 9 chỉ có Task triển khai cho `US-129 → US-141` và `US-144`. `US-142` và `US-143` là dependency đã hoàn thành trong Sprint 7.

Phân bố Task:

| Parent Epic | Số Task |
|---|---:|
| PAC-EPIC-15 — Graph-RAG | 16 |
| PAC-EPIC-16 — Reports | 9 |
| PAC-EPIC-17 — System Settings | 4 |
| PAC-EPIC-19 — Testing & Setup | 5 |
| **Tổng** | **34** |

# 2. Sprint Goal

```text
Fresh Neo4j projection
→ allowlisted Graph-RAG context
→ provenance + freshness metadata
→ AI explanation qua Sprint 7 guardrails

Neo4j unavailable/stale
→ PostgreSQL deterministic fallback
→ graphUsed=false + degraded/freshness indicator

Operational PostgreSQL data
→ deterministic Reports
→ configurable near-expiry threshold
```

Sprint 9 không biến Neo4j thành source of truth và không thay thế nghiệp vụ rule-based bằng AI.

# 3. Implementation Authorization Gate

Chỉ bắt đầu code khi:

```text
Sprint 8 Final Review = PASS
Ready for Sprint 9 = Yes
Latest develop = Stable

Sprint 9 Audit status = Completed
Mandatory Gates PASS = All
Ready to implement Sprint 9 = Yes

34/34 exact Task branches = Verified
14/14 exact Story branches = Verified
3/3 Core Epic branches = Verified

Graph Sync outbox = Stable
Neo4j projection = Stable
Freshness contract = Stable
Supabase/PostgreSQL environment = Safe
Neo4j AuraDB environment = Safe
Open Blocking Technical Defects = 0
```

Nếu thiếu một gate:

- Không triển khai Sprint 9 production code.
- Không sử dụng stale/unverified graph cho Graph-RAG.
- Không apply report/settings migration trên environment không an toàn.
- Không tự tạo branch thay thế.
- Ghi blocker vào `sprint-9-audit.md`.

# 4. Mandatory Dependencies

## 4.1 Sprint 7 — AI safety and provider baseline

- Google AI primary và MockAI fallback hoạt động.
- Input/output guardrails hoạt động.
- Structured output validation và PII minimization hoạt động.
- Prompt version và AI Audit metadata hoạt động.
- Graph context không bypass guardrail hoặc audit.

## 4.2 Sprint 8 — Graph baseline

- GraphSyncOutbox, worker và retries ổn định.
- Medicine, ActiveIngredient, CONTAINS và INTERACTS_WITH projection ổn định.
- Canonical interaction edge ổn định.
- Projection metadata sẵn sàng.
- Freshness service phân biệt fresh, stale, missing và unavailable.
- Neo4j unavailable không ảnh hưởng core system.

## 4.3 Reports and settings dependencies

- PAID order, payment và invoice data ổn định.
- Order status `DRAFT/PAID/CANCELLED` ổn định.
- MedicineBatch là inventory source of truth.
- Sellable quantity loại expired batches.
- Role/permission baseline hoạt động.

# 5. Business Rules and Invariants

## 5.1 Graph-RAG is explain-only

- Chỉ hỗ trợ giải thích interaction.
- Không chẩn đoán, kê đơn hoặc đưa liều dùng.
- Không tạo hoặc thay đổi DrugInteractionRule.
- Không xác nhận HIGH alert.
- Không quyết định checkout.
- AI output vẫn qua Sprint 7 guardrails.

## 5.2 Allowlisted queries only

- Staff không nhập raw Cypher.
- Backend không expose raw Cypher endpoint cho Staff.
- Chỉ dùng template allowlisted và parameterized.
- Validate Medicine/Ingredient IDs.
- Không nối raw input vào Cypher.

## 5.3 Graph selection and fallback

```text
Graph available + FRESH
→ use allowlisted Neo4j context
→ graphUsed=true

Graph unavailable
→ PostgreSQL fallback cho interaction explanation
→ graphUsed=false
→ degraded=true

Graph stale/missing projection
→ không dùng stale graph làm context chính
→ PostgreSQL fallback
→ graphUsed=false
→ freshness warning

Graph-only query + không có fallback
→ safe error
→ không fabricate data
```

## 5.4 Provenance

Response phải cho biết:

- Graph hay PostgreSQL đã được dùng.
- Rule/entity IDs liên quan.
- Freshness status và reason.
- Fallback reason.
- Prompt/provider/audit metadata theo Sprint 7.

## 5.5 Checkout independence

- Checkout dùng PostgreSQL/rule-based validation.
- Neo4j stale/unavailable không thay đổi checkout decision.
- AI text, provenance hoặc `graphUsed` không làm authorization condition.
- Graph-RAG chỉ là explanation layer.

## 5.6 Deterministic Reports

Revenue:

- Chỉ tính PAID orders.
- Không tính DRAFT, CANCELLED hoặc failed payment.
- Filter ngày được validate.

Top Medicines:

- Chỉ từ PAID orders.
- Tính từ authoritative order/allocation data.
- Sort deterministic.

Inventory:

- MedicineBatch là source of truth.
- Sellable loại expired.
- Near-expiry dùng threshold setting.
- Admin/Warehouse xem theo quyền.

AI không được tính hoặc thay đổi report totals.

## 5.7 System Settings

- Near-expiry threshold mặc định 90 ngày.
- Admin có quyền cập nhật.
- Threshold phải validate.
- Setting ảnh hưởng near-expiry calculation.
- Provider/Prompt Management UI không phải Sprint 9 MVP.

# 6. Scope

## In scope

- Graph-RAG explanation service và allowlisted query templates.
- Medicine/Ingredient graph context builder.
- `graphUsed`, provenance và freshness metadata.
- PostgreSQL fallback cho unavailable/stale graph.
- Safe error cho graph-only query.
- Raw Cypher guard và graph-not-checkout guard.
- Graph-RAG metadata UI và tests.
- Revenue, Top Medicines và Inventory Reports.
- Report filters, states và permissions.
- `system_settings` model.
- Near-expiry default/API/UI/tests.

## Out of scope

- Admin Graph Sync Status UI.
- Manual graph retry/rebuild UI.
- Graph Explorer.
- Raw Cypher console.
- AI Provider/Prompt Management UI.
- System Audit Log UI.
- AI Business Report Narrative.
- Forecasting.
- Multi-store/multi-warehouse reports.
- Graph quyết định checkout.
- AI tính report totals.

# 7. Ownership and Tools

| Trách nhiệm | Owner |
|---|---|
| Jira status/issue creation | Project Owner |
| Exact branch registry | `Jira/branch-on-jira.md` |
| Graph-RAG backend | AI Coding Agent / Developer |
| Reports APIs | Backend / Database owner |
| Graph-RAG/Reports/Settings UI | Frontend owner |
| Task PR và merge vào `develop` | AI Coding Agent khi Local Quality Gate PASS |
| `develop → main` | Project Owner only |
| Credential custody | Project Owner-designated owner |
| Bug Jira Key | Project Owner |

# 8. Local Quality Gate

```text
CI = N/A — GitHub Actions chưa được cấu hình
```

Task PR chỉ merge khi:

1. Exact branch và Jira Key đúng.
2. Acceptance Criteria hoàn thành.
3. PR target `develop`.
4. Diff đúng scope và không conflict.
5. Relevant lint/typecheck/tests/build PASS.
6. Prisma validate/generate PASS khi liên quan.
7. Supabase/Neo4j verification PASS hoặc N/A hợp lệ.
8. AI guardrail/audit regression PASS khi liên quan.
9. Deterministic report checks PASS khi liên quan.
10. Không secret, raw Cypher exposure hoặc destructive query.
11. GitHub báo mergeable.

# 9. Git Execution

```text
pull latest develop
→ checkout exact Task branch đã tồn tại
→ implement
→ targeted checks
→ review diff/security
→ commit/push
→ PR vào develop
→ Local Quality Gate
→ merge
→ verify remote develop
→ update progress
```

Không tự tạo branch mới hoặc branch gần giống nếu exact branch không tồn tại.

Commit format:

```text
<type>(<scope>): <JIRA-KEY> <short English message>
```

Ví dụ:

```text
feat(graph-rag): PAC-601 implement interaction explanation service
```

# 10. Recommended Technical Execution Order

## Phase 1 — Query Security and Context Foundation

```text
PAC-TASK-392
→ PAC-TASK-393
→ PAC-TASK-394
→ PAC-TASK-395
→ PAC-TASK-391
```

## Phase 2 — Provenance and Freshness

```text
PAC-TASK-396
→ PAC-TASK-397
→ PAC-TASK-398
→ PAC-TASK-399
```

## Phase 3 — Fallback and Safety Guards

```text
PAC-TASK-400
→ PAC-TASK-401
→ PAC-TASK-402
→ PAC-TASK-403
→ PAC-TASK-404
→ PAC-TASK-405
```

## Phase 4 — Graph-RAG UI and Tests

```text
PAC-TASK-406
→ PAC-TASK-407
→ PAC-TASK-408
→ PAC-TASK-409
→ PAC-TASK-410
```

## Phase 5 — Deterministic Reports

```text
PAC-TASK-411
→ PAC-TASK-414
→ PAC-TASK-416
→ PAC-TASK-419
→ PAC-TASK-413
→ PAC-TASK-412
→ PAC-TASK-415
→ PAC-TASK-417
→ PAC-TASK-418
```

## Phase 6 — System Settings

```text
PAC-TASK-420
→ PAC-TASK-421
→ PAC-TASK-422
→ PAC-TASK-423
→ PAC-TASK-424
```

# 11. Story and Task Plan

## US-129 — Graph-RAG interaction explanation

| Field | Value |
|---|---|
| Jira Key | PAC-169 |
| Parent Epic | PAC-EPIC-15 - Graph-RAG |
| Priority | High |
| Story Points | 5 |
| Exact Story branch | `story/PAC-169-us-129-graph-rag-interaction-explanation` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-391 | PAC-601 | Implement Graph-RAG interaction explanation service | High | `feature/PAC-601-task-391-implement-graph-rag-interaction-explanation-service` |
| PAC-TASK-392 | PAC-602 | Build allowlisted graph query templates | Highest | `feature/PAC-602-task-392-build-allowlisted-graph-query-templates` |
| PAC-TASK-393 | PAC-603 | Query Medicine-CONTAINS-ActiveIngredient context | High | `feature/PAC-603-task-393-query-medicine-contains-activeingredient-context` |
| PAC-TASK-394 | PAC-604 | Query ActiveIngredient INTERACTS_WITH context | High | `feature/PAC-604-task-394-query-activeingredient-interacts-with-context` |
| PAC-TASK-395 | PAC-605 | Add Graph-RAG context builder for AI Copilot | High | `feature/PAC-605-task-395-add-graph-rag-context-builder-for-ai-copilot` |
| PAC-TASK-406 | PAC-616 | Build Graph-RAG explanation UI metadata display | Medium | `feature/PAC-616-task-406-build-graph-rag-explanation-ui-metadata-display` |

Acceptance Review:

- Query graph context theo interaction.
- Kết hợp context cho AI explanation.
- Có guardrail AI.
- Không dùng graph quyết định checkout.

## US-130 — Graph-RAG provenance metadata

| Field | Value |
|---|---|
| Jira Key | PAC-170 |
| Parent Epic | PAC-EPIC-15 - Graph-RAG |
| Priority | High |
| Story Points | 3 |
| Exact Story branch | `story/PAC-170-us-130-graph-rag-provenance-metadata` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-396 | PAC-606 | Return Graph-RAG provenance metadata | High | `feature/PAC-606-task-396-return-graph-rag-provenance-metadata` |
| PAC-TASK-397 | PAC-607 | Return graphUsed flag in Graph-RAG response | High | `feature/PAC-607-task-397-return-graphused-flag-in-graph-rag-response` |

Acceptance Review:

- Response có nguồn dữ liệu/rule id.
- Cho biết context đến từ graph hay PostgreSQL.
- Metadata hiển thị/ghi log được.
- Không trả output không có nguồn rõ.

## US-131 — Graph-RAG freshness metadata

| Field | Value |
|---|---|
| Jira Key | PAC-171 |
| Parent Epic | PAC-EPIC-15 - Graph-RAG |
| Priority | Highest |
| Story Points | 3 |
| Exact Story branch | `story/PAC-171-us-131-graph-rag-freshness-metadata` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-398 | PAC-608 | Return Graph-RAG freshness metadata | Highest | `feature/PAC-608-task-398-return-graph-rag-freshness-metadata` |
| PAC-TASK-399 | PAC-609 | Add freshness warning to Graph-RAG response | Highest | `feature/PAC-609-task-399-add-freshness-warning-to-graph-rag-response` |

Acceptance Review:

- Response có graph freshness status.
- Nếu stale thì có warning/fallback.
- Không dùng stale graph âm thầm.
- Có test cho stale graph.

## US-132 — PostgreSQL fallback khi Neo4j unavailable

| Field | Value |
|---|---|
| Jira Key | PAC-172 |
| Parent Epic | PAC-EPIC-15 - Graph-RAG |
| Priority | Highest |
| Story Points | 5 |
| Exact Story branch | `story/PAC-172-us-132-postgresql-fallback-khi-neo4j-unavailable` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-400 | PAC-610 | Implement PostgreSQL fallback when Neo4j unavailable | Highest | `feature/PAC-610-task-400-implement-postgresql-fallback-when-neo4j-unavailabl` |
| PAC-TASK-407 | PAC-617 | Add Graph-RAG PostgreSQL fallback tests | Highest | `test/PAC-617-task-407-add-graph-rag-postgresql-fallback-tests` |

Acceptance Review:

- Neo4j unavailable không làm vỡ interaction explanation nếu có relational fallback.
- Response có graphUsed=false.
- Có degraded indicator.
- Ghi log/audit nếu cần.

## US-133 — PostgreSQL fallback khi graph stale

| Field | Value |
|---|---|
| Jira Key | PAC-173 |
| Parent Epic | PAC-EPIC-15 - Graph-RAG |
| Priority | Highest |
| Story Points | 5 |
| Exact Story branch | `story/PAC-173-us-133-postgresql-fallback-khi-graph-stale` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-401 | PAC-611 | Implement PostgreSQL fallback when graph stale | Highest | `feature/PAC-611-task-401-implement-postgresql-fallback-when-graph-stale` |
| PAC-TASK-408 | PAC-618 | Add stale graph fallback tests | Highest | `test/PAC-618-task-408-add-stale-graph-fallback-tests` |

Acceptance Review:

- Detect graph stale.
- Không dùng stale graph làm context chính.
- Fallback PostgreSQL cho interaction explanation.
- Response có warning/freshness indicator.

## US-134 — Safe error cho graph-only query

| Field | Value |
|---|---|
| Jira Key | PAC-174 |
| Parent Epic | PAC-EPIC-15 - Graph-RAG |
| Priority | High |
| Story Points | 3 |
| Exact Story branch | `story/PAC-174-us-134-safe-error-cho-graph-only-query` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-402 | PAC-612 | Implement safe error for graph-only query without fallback | High | `feature/PAC-612-task-402-implement-safe-error-for-graph-only-query-without-f` |

Acceptance Review:

- Graph-only query không fallback được thì trả safe error.
- Không fabricate dữ liệu.
- Error message dễ hiểu.
- Không crash UI.

## US-135 — Không cho Staff submit raw Cypher

| Field | Value |
|---|---|
| Jira Key | PAC-175 |
| Parent Epic | PAC-EPIC-15 - Graph-RAG |
| Priority | Highest |
| Story Points | 2 |
| Exact Story branch | `story/PAC-175-us-135-khong-cho-staff-submit-raw-cypher` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-403 | PAC-613 | Ensure Staff cannot submit raw Cypher | Highest | `feature/PAC-613-task-403-ensure-staff-cannot-submit-raw-cypher` |
| PAC-TASK-404 | PAC-614 | Add backend guard against raw Cypher APIs for Staff | Highest | `feature/PAC-614-task-404-add-backend-guard-against-raw-cypher-apis-for-staff` |
| PAC-TASK-409 | PAC-619 | Add raw Cypher no-access tests | Highest | `test/PAC-619-task-409-add-raw-cypher-no-access-tests` |

Acceptance Review:

- Staff không có raw Cypher input.
- Backend không expose raw Cypher endpoint cho Staff.
- Chỉ dùng query template allowlisted.
- Test permission pass.

## US-136 — Graph không quyết định checkout

| Field | Value |
|---|---|
| Jira Key | PAC-176 |
| Parent Epic | PAC-EPIC-15 - Graph-RAG |
| Priority | Highest |
| Story Points | 2 |
| Exact Story branch | `story/PAC-176-us-136-graph-khong-quyet-dinh-checkout` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-405 | PAC-615 | Ensure Graph-RAG does not decide checkout | Highest | `feature/PAC-615-task-405-ensure-graph-rag-does-not-decide-checkout` |
| PAC-TASK-410 | PAC-620 | Add graph-not-checkout guard tests | Highest | `test/PAC-620-task-410-add-graph-not-checkout-guard-tests` |

Acceptance Review:

- Checkout dùng PostgreSQL/rule-based validation.
- Neo4j stale/unavailable không làm checkout sai logic.
- Graph chỉ hỗ trợ explain/RAG.
- Guardrail ghi rõ trong code/test.

## US-137 — Revenue Report

| Field | Value |
|---|---|
| Jira Key | PAC-177 |
| Parent Epic | PAC-EPIC-16 - Reports |
| Priority | Medium |
| Story Points | 3 |
| Exact Story branch | `story/PAC-177-us-137-revenue-report` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-411 | PAC-621 | Implement Revenue Report API | Medium | `feature/PAC-621-task-411-implement-revenue-report-api` |
| PAC-TASK-412 | PAC-622 | Build Revenue Report UI | Medium | `feature/PAC-622-task-412-build-revenue-report-ui` |
| PAC-TASK-419 | PAC-629 | Add report permission checks | Medium | `feature/PAC-629-task-419-add-report-permission-checks` |

Acceptance Review:

- Chỉ tính PAID orders.
- Không tính failed/cancelled/draft.
- Có filter ngày cơ bản.
- Số liệu deterministic, không dùng AI để tính.

## US-138 — Top Medicines Report

| Field | Value |
|---|---|
| Jira Key | PAC-178 |
| Parent Epic | PAC-EPIC-16 - Reports |
| Priority | Medium |
| Story Points | 3 |
| Exact Story branch | `story/PAC-178-us-138-top-medicines-report` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-414 | PAC-624 | Implement Top Medicines Report API | Medium | `feature/PAC-624-task-414-implement-top-medicines-report-api` |
| PAC-TASK-415 | PAC-625 | Build Top Medicines Report UI | Medium | `feature/PAC-625-task-415-build-top-medicines-report-ui` |

Acceptance Review:

- Tính từ order_items/order_batch_allocations của PAID orders.
- Hiển thị thuốc và số lượng bán.
- Có sắp xếp theo số lượng.
- Không dùng forecast/AI để thay số liệu.

## US-139 — Inventory Report

| Field | Value |
|---|---|
| Jira Key | PAC-179 |
| Parent Epic | PAC-EPIC-16 - Reports |
| Priority | Medium |
| Story Points | 3 |
| Exact Story branch | `story/PAC-179-us-139-inventory-report` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-416 | PAC-626 | Implement Inventory Report API from MedicineBatch | Medium | `feature/PAC-626-task-416-implement-inventory-report-api-from-medicinebatch` |
| PAC-TASK-417 | PAC-627 | Build Inventory Report UI | Medium | `feature/PAC-627-task-417-build-inventory-report-ui` |

Acceptance Review:

- Dữ liệu lấy từ MedicineBatch.
- Hiển thị sellable, expired, near-expiry nếu cần.
- Không dùng aggregate inventory source of truth.
- Admin/Warehouse xem theo quyền.

## US-140 — Basic report filters

| Field | Value |
|---|---|
| Jira Key | PAC-180 |
| Parent Epic | PAC-EPIC-16 - Reports |
| Priority | Low |
| Story Points | 2 |
| Exact Story branch | `story/PAC-180-us-140-basic-report-filters` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-413 | PAC-623 | Add revenue report filters by date and status | Low | `feature/PAC-623-task-413-add-revenue-report-filters-by-date-and-status` |
| PAC-TASK-418 | PAC-628 | Add report empty, loading and error states | Low | `feature/PAC-628-task-418-add-report-empty-loading-and-error-states` |

Acceptance Review:

- Filter theo date range/report type.
- Filter không làm sai số liệu.
- Có empty/loading/error state.
- Backend validate input filter.

## US-141 — Near-expiry threshold setting

| Field | Value |
|---|---|
| Jira Key | PAC-181 |
| Parent Epic | PAC-EPIC-17 - System Settings |
| Priority | High |
| Story Points | 3 |
| Exact Story branch | `story/PAC-181-us-141-near-expiry-threshold-setting` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-420 | PAC-630 | Create system_settings Prisma model | High | `feature/PAC-630-task-420-create-system-settings-prisma-model` |
| PAC-TASK-421 | PAC-631 | Seed default near-expiry threshold as 90 days | High | `feature/PAC-631-task-421-seed-default-near-expiry-threshold-as-90-days` |
| PAC-TASK-422 | PAC-632 | Implement near-expiry threshold settings API | High | `feature/PAC-632-task-422-implement-near-expiry-threshold-settings-api` |
| PAC-TASK-424 | PAC-634 | Add system settings validation and tests | Medium | `test/PAC-634-task-424-add-system-settings-validation-and-tests` |

Acceptance Review:

- Default là 90 ngày.
- Admin có thể cấu hình trong System Settings MVP.
- Setting ảnh hưởng near-expiry calculation.
- Validate threshold hợp lệ.

## US-144 — System settings UI tối thiểu

| Field | Value |
|---|---|
| Jira Key | PAC-184 |
| Parent Epic | PAC-EPIC-17 - System Settings |
| Priority | Medium |
| Story Points | 3 |
| Exact Story branch | `story/PAC-184-us-144-system-settings-ui-toi-thieu` |

Tasks:

| Logical Task | Jira Key | Summary | Priority | Exact branch |
|---|---|---|---|---|
| PAC-TASK-423 | PAC-633 | Build minimal System Settings UI for near-expiry threshold | Medium | `feature/PAC-633-task-423-build-minimal-system-settings-ui-for-near-expiry-th` |

Acceptance Review:

- Admin cấu hình near-expiry threshold.
- Validate input.
- Lưu setting vào database/config.
- Không đưa provider/prompt management UI thành MVP blocker.

# 12. Exact Branch Registry

## 12.1 Epic branches

| Logical Epic | Jira Key | Exact branch | Usage |
|---|---|---|---|
| PAC-EPIC-15 | PAC-15 | `epic/PAC-15-epic-15-graph-rag` | Core traceability |
| PAC-EPIC-16 | PAC-16 | `epic/PAC-16-epic-16-reports` | Core traceability |
| PAC-EPIC-17 | PAC-17 | `epic/PAC-17-epic-17-system-settings` | Core traceability |
| PAC-EPIC-19 | PAC-19 | `epic/PAC-19-epic-19-testing-smoke-test-release-readiness` | Supporting cross-sprint |

Chỉ ba Core Epic được tính trong 51-branch Sprint inventory.

## 12.2 Story branches

| Story | Jira Key | Exact branch |
|---|---|---|
| US-129 | PAC-169 | `story/PAC-169-us-129-graph-rag-interaction-explanation` |
| US-130 | PAC-170 | `story/PAC-170-us-130-graph-rag-provenance-metadata` |
| US-131 | PAC-171 | `story/PAC-171-us-131-graph-rag-freshness-metadata` |
| US-132 | PAC-172 | `story/PAC-172-us-132-postgresql-fallback-khi-neo4j-unavailable` |
| US-133 | PAC-173 | `story/PAC-173-us-133-postgresql-fallback-khi-graph-stale` |
| US-134 | PAC-174 | `story/PAC-174-us-134-safe-error-cho-graph-only-query` |
| US-135 | PAC-175 | `story/PAC-175-us-135-khong-cho-staff-submit-raw-cypher` |
| US-136 | PAC-176 | `story/PAC-176-us-136-graph-khong-quyet-dinh-checkout` |
| US-137 | PAC-177 | `story/PAC-177-us-137-revenue-report` |
| US-138 | PAC-178 | `story/PAC-178-us-138-top-medicines-report` |
| US-139 | PAC-179 | `story/PAC-179-us-139-inventory-report` |
| US-140 | PAC-180 | `story/PAC-180-us-140-basic-report-filters` |
| US-141 | PAC-181 | `story/PAC-181-us-141-near-expiry-threshold-setting` |
| US-144 | PAC-184 | `story/PAC-184-us-144-system-settings-ui-toi-thieu` |

## 12.3 Task branches

| Logical Task | Jira Key | Exact branch |
|---|---|---|
| PAC-TASK-391 | PAC-601 | `feature/PAC-601-task-391-implement-graph-rag-interaction-explanation-service` |
| PAC-TASK-392 | PAC-602 | `feature/PAC-602-task-392-build-allowlisted-graph-query-templates` |
| PAC-TASK-393 | PAC-603 | `feature/PAC-603-task-393-query-medicine-contains-activeingredient-context` |
| PAC-TASK-394 | PAC-604 | `feature/PAC-604-task-394-query-activeingredient-interacts-with-context` |
| PAC-TASK-395 | PAC-605 | `feature/PAC-605-task-395-add-graph-rag-context-builder-for-ai-copilot` |
| PAC-TASK-396 | PAC-606 | `feature/PAC-606-task-396-return-graph-rag-provenance-metadata` |
| PAC-TASK-397 | PAC-607 | `feature/PAC-607-task-397-return-graphused-flag-in-graph-rag-response` |
| PAC-TASK-398 | PAC-608 | `feature/PAC-608-task-398-return-graph-rag-freshness-metadata` |
| PAC-TASK-399 | PAC-609 | `feature/PAC-609-task-399-add-freshness-warning-to-graph-rag-response` |
| PAC-TASK-400 | PAC-610 | `feature/PAC-610-task-400-implement-postgresql-fallback-when-neo4j-unavailabl` |
| PAC-TASK-401 | PAC-611 | `feature/PAC-611-task-401-implement-postgresql-fallback-when-graph-stale` |
| PAC-TASK-402 | PAC-612 | `feature/PAC-612-task-402-implement-safe-error-for-graph-only-query-without-f` |
| PAC-TASK-403 | PAC-613 | `feature/PAC-613-task-403-ensure-staff-cannot-submit-raw-cypher` |
| PAC-TASK-404 | PAC-614 | `feature/PAC-614-task-404-add-backend-guard-against-raw-cypher-apis-for-staff` |
| PAC-TASK-405 | PAC-615 | `feature/PAC-615-task-405-ensure-graph-rag-does-not-decide-checkout` |
| PAC-TASK-406 | PAC-616 | `feature/PAC-616-task-406-build-graph-rag-explanation-ui-metadata-display` |
| PAC-TASK-407 | PAC-617 | `test/PAC-617-task-407-add-graph-rag-postgresql-fallback-tests` |
| PAC-TASK-408 | PAC-618 | `test/PAC-618-task-408-add-stale-graph-fallback-tests` |
| PAC-TASK-409 | PAC-619 | `test/PAC-619-task-409-add-raw-cypher-no-access-tests` |
| PAC-TASK-410 | PAC-620 | `test/PAC-620-task-410-add-graph-not-checkout-guard-tests` |
| PAC-TASK-411 | PAC-621 | `feature/PAC-621-task-411-implement-revenue-report-api` |
| PAC-TASK-412 | PAC-622 | `feature/PAC-622-task-412-build-revenue-report-ui` |
| PAC-TASK-413 | PAC-623 | `feature/PAC-623-task-413-add-revenue-report-filters-by-date-and-status` |
| PAC-TASK-414 | PAC-624 | `feature/PAC-624-task-414-implement-top-medicines-report-api` |
| PAC-TASK-415 | PAC-625 | `feature/PAC-625-task-415-build-top-medicines-report-ui` |
| PAC-TASK-416 | PAC-626 | `feature/PAC-626-task-416-implement-inventory-report-api-from-medicinebatch` |
| PAC-TASK-417 | PAC-627 | `feature/PAC-627-task-417-build-inventory-report-ui` |
| PAC-TASK-418 | PAC-628 | `feature/PAC-628-task-418-add-report-empty-loading-and-error-states` |
| PAC-TASK-419 | PAC-629 | `feature/PAC-629-task-419-add-report-permission-checks` |
| PAC-TASK-420 | PAC-630 | `feature/PAC-630-task-420-create-system-settings-prisma-model` |
| PAC-TASK-421 | PAC-631 | `feature/PAC-631-task-421-seed-default-near-expiry-threshold-as-90-days` |
| PAC-TASK-422 | PAC-632 | `feature/PAC-632-task-422-implement-near-expiry-threshold-settings-api` |
| PAC-TASK-423 | PAC-633 | `feature/PAC-633-task-423-build-minimal-system-settings-ui-for-near-expiry-th` |
| PAC-TASK-424 | PAC-634 | `test/PAC-634-task-424-add-system-settings-validation-and-tests` |

> Một số canonical branch slug bị cắt ngắn. Phải dùng nguyên văn từ registry.

# 13. Graph-RAG Contract

Response có semantics tương đương:

```text
answer/explanation
graphUsed
degraded
sourceType
provenance
freshness.status
freshness.reason
fallbackReason
disclaimer
requestId/audit reference
```

Allowlisted paths:

```text
Medicine
→ CONTAINS
→ ActiveIngredient

ActiveIngredient
→ INTERACTS_WITH
→ ActiveIngredient
```

Không expose arbitrary traversal cho Staff.

# 14. Reports Contract

Revenue:

```text
PAID orders only
validated date range
deterministic total
```

Top Medicines:

```text
medicineId
medicineName
quantitySold
rank/order
```

Inventory:

```text
medicineId
medicineName
totalQuantity
sellableQuantity
expiredQuantity
nearExpiryQuantity
```

# 15. System Settings Contract

Expected semantics:

```text
nearExpiryThresholdDays
default = 90
Admin-only update
safe read for inventory calculation
updatedAt/updatedBy theo repository convention
```

Không hard-code threshold ở nhiều module sau khi Settings service tồn tại.

# 16. Testing Strategy

Graph-RAG:

- Allowlisted/parameterized query selection.
- Fresh graph path.
- Unavailable/stale/missing fallback.
- Graph-only safe error.
- `graphUsed`, provenance và freshness correctness.
- Raw Cypher no-access.
- Checkout independence.
- AI guardrail/audit regression.

Reports:

- Revenue chỉ PAID.
- Exclude DRAFT/CANCELLED/failed payments.
- Date boundary behavior.
- Top Medicines deterministic.
- Inventory từ MedicineBatch.
- Expired exclusion và threshold behavior.
- Permission và UI states.

Settings:

- Default 90.
- Valid update.
- Invalid/negative/non-integer rejection.
- Admin write access.
- Unauthorized rejection.
- Near-expiry calculation đọc setting mới.
- Prisma migration/seed safety.

# 17. Story and Epic Review

Sau khi mọi Task của Story đã merge:

```text
latest develop
→ Story acceptance checks
→ PASS/FAIL
```

Không tạo Story PR.

Epic reviews:

```text
PAC-EPIC-15 — Graph-RAG Integration/Regression Review
PAC-EPIC-16 — Reports Deterministic Review
PAC-EPIC-17 — System Settings Review
```

Không tạo Epic PR.

# 18. Definition of Done

```text
34/34 Tasks verified
14/14 Story Acceptance Reviews PASS
3/3 Core Epic Reviews PASS

Allowlisted Graph-RAG PASS
Provenance/freshness PASS
PostgreSQL fallback PASS
Raw Cypher guard PASS
Graph-not-checkout guard PASS

Revenue/Top Medicines/Inventory Reports PASS
Report filters/states/permissions PASS

Near-expiry threshold model/default/API/UI/tests PASS

Prisma/Supabase/Neo4j PASS
Blocking defects = 0
High defects = 0
Sprint 9 Final Review = PASS
Ready for Sprint 10 = Yes
```

# 19. Final Checklist

- [ ] Sprint 8 Final Review PASS.
- [ ] Sprint 9 Audit PASS.
- [ ] 34/34 Task branches verified.
- [ ] 14/14 Story branches verified.
- [ ] 3/3 Core Epic branches verified.
- [ ] Staff cannot submit raw Cypher.
- [ ] `graphUsed`, provenance và freshness correct.
- [ ] Unavailable/stale graph falls back to PostgreSQL.
- [ ] Graph-only no-fallback returns safe error.
- [ ] Graph does not decide checkout.
- [ ] Reports deterministic.
- [ ] Revenue only PAID.
- [ ] Inventory report uses MedicineBatch.
- [ ] Threshold defaults to 90 days.
- [ ] Admin-only settings update.
- [ ] Local Quality Gates PASS.
- [ ] All applicable PRs merged into `develop`.
- [ ] No Blocking/High defect.
- [ ] AI Agent did not merge `develop → main`.
