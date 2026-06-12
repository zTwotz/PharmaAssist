# Document 17 — Knowledge Graph, Neo4j Sync & Graph-RAG Design

# Tài liệu 17 — Thiết kế Knowledge Graph, Neo4j Sync & Graph-RAG

---

## Metadata

| Mục             | Nội dung                                                                                                                                                                                                                          |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID     | DOC-17                                                                                                                                                                                                                            |
| File name       | `17_knowledge_graph_neo4j_graphrag.md`                                                                                                                                                                                            |
| Document Name   | Knowledge Graph, Neo4j Sync & Graph-RAG Design                                                                                                                                                                                    |
| Tên tiếng Việt  | Thiết kế Knowledge Graph, Neo4j Sync và Graph-RAG                                                                                                                                                                                 |
| Project         | PharmaAssist AI Intelligence                                                                                                                                                                                                      |
| Version         | 1.0 Draft                                                                                                                                                                                                                         |
| Status          | Draft                                                                                                                                                                                                                             |
| Created Date    | 08/06/2026                                                                                                                                                                                                                        |
| Last Updated    | 08/06/2026                                                                                                                                                                                                                        |
| Owner           | Graph Developer / Backend Lead                                                                                                                                                                                                    |
| Reviewer        | Backend Developer, AI Developer, Database Designer, Tester, Project Leader                                                                                                                                                        |
| Baseline Source | Document 06 — SRS, Document 12 — API Specification, Document 13 — Database Design & ERD, Document 14 — Prisma Schema & Migration Design, Document 16 — AI Architecture, Document 18 — Demo Data, Document 20 — Testing/Demo/Setup |
| Source of Truth | PostgreSQL                                                                                                                                                                                                                        |
| Graph Database  | Neo4j                                                                                                                                                                                                                             |
| ORM / DB Access | Prisma for PostgreSQL                                                                                                                                                                                                             |
| Graph Runtime   | Neo4j Driver / Graph Service                                                                                                                                                                                                      |
| AI Integration  | Graph-RAG + AI Copilot, through safe context only                                                                                                                                                                                 |
| Language Rule   | Nội dung chính viết bằng tiếng Việt; tên công nghệ, node, relationship, property, API, enum, table và thuật ngữ kỹ thuật giữ tiếng Anh khi cần                                                                                    |

---

## 1. Mục đích tài liệu

Tài liệu **Knowledge Graph, Neo4j Sync & Graph-RAG Design** đặc tả thiết kế graph chính thức cho hệ thống **PharmaAssist AI Intelligence**.

Tài liệu này tập trung vào:

1. Graph scope chính thức.
2. Trách nhiệm của PostgreSQL và Neo4j.
3. Core graph MVP model.
4. Neo4j node design.
5. Neo4j relationship design.
6. Quy tắc canonical direction cho `INTERACTS_WITH`.
7. Symmetric query behavior.
8. Relationship properties.
9. Mapping từ PostgreSQL source sang Neo4j projection.
10. Graph Sync architecture:

* Outbox.
* Worker.
* Retry.
* Attempts/logs.
* Audit.
* Failure handling.

11. Freshness detection:

* Source version.
* Outbox state.
* Pending/failed jobs.

12. Stale graph behavior.
13. Graph-RAG architecture.
14. Allowlisted Graph-RAG query templates.
15. Provenance/freshness metadata.
16. PostgreSQL fallback cho interaction explanation.
17. Safe error cho pure graph queries.
18. Security restrictions.
19. MVP/Should-have/Future graph scope.
20. Graph test requirements.
21. Traceability sang SRS/API/AI/Data/Testing.

Tài liệu này **không** viết AI prompt chi tiết, không viết full API request/response, không viết Prisma schema, không đưa Medicine–Medicine authoritative edges, không dùng Interaction node nếu baseline chưa chọn, không đưa DrugGroup vào MVP nếu chưa có taxonomy, không dùng `riskScore` ảnh hưởng checkout/severity và không cho stale graph dùng mà không warning.

---

## 2. Graph Scope

### 2.1. Vai trò của Knowledge Graph trong dự án

Knowledge Graph trong PharmaAssist AI Intelligence dùng để biểu diễn quan hệ giữa:

1. Medicine.
2. ActiveIngredient.
3. Medicine chứa ActiveIngredient.
4. ActiveIngredient tương tác với ActiveIngredient.

Graph giúp hệ thống:

1. Trực quan hóa quan hệ Medicine–ActiveIngredient.
2. Trực quan hóa quan hệ ActiveIngredient–ActiveIngredient interaction.
3. Hỗ trợ Graph-RAG giải thích vì sao một order có cảnh báo tương tác.
4. Cung cấp provenance rõ ràng cho AI explanation.
5. Thể hiện technical complexity của dự án.
6. Bổ trợ AI Copilot bằng graph context an toàn.

Graph **không** thay thế PostgreSQL.

### 2.2. MVP graph scope

MVP graph chỉ bao gồm:

1. Node `Medicine`.
2. Node `ActiveIngredient`.
3. Relationship `CONTAINS`.
4. Relationship `INTERACTS_WITH`.

MVP Graph Sync phải đồng bộ từ PostgreSQL sang Neo4j cho:

1. `medicines`.
2. `active_ingredients`.
3. `medicine_ingredients`.
4. `drug_interactions`.

MVP Graph-RAG phải hỗ trợ:

1. Giải thích interaction dựa trên graph nếu graph fresh.
2. Trả provenance.
3. Trả freshness metadata.
4. Fallback sang PostgreSQL nếu graph stale/unavailable cho interaction explanation.
5. Safe error cho pure graph query không có fallback.
6. Không expose raw Cypher cho Staff.

### 2.3. Graph is projection

Neo4j graph là projection.

Điều này có nghĩa:

1. Dữ liệu gốc nằm trong PostgreSQL.
2. Neo4j được cập nhật thông qua Graph Sync.
3. Nếu Neo4j lỗi, PostgreSQL vẫn là nguồn chính thức.
4. Checkout không phụ thuộc vào Neo4j.
5. InteractionAlert không phụ thuộc vào Neo4j để được persist.
6. Reports không tính từ Neo4j.
7. DrugInteraction Rule không được tạo/chỉnh sửa trực tiếp trong Neo4j.

### 2.4. Graph usage boundaries

Graph được dùng cho:

1. Graph Explorer read-only.
2. Graph-RAG read-only.
3. AI explanation context nếu graph fresh.
4. Demo visualization.
5. Provenance explanation.

Graph không được dùng cho:

1. Checkout validation.
2. Stock validation.
3. FEFO allocation.
4. Payment.
5. Invoice.
6. HIGH alert acknowledgement/note rule.
7. Official DrugInteraction Rule editing.
8. Official inventory/report calculation.

---

## 3. PostgreSQL vs Neo4j Responsibility

### 3.1. Responsibility matrix

| Responsibility                           |           PostgreSQL |           Neo4j |
| ---------------------------------------- | -------------------: | --------------: |
| Medicine source data                     |                  Yes | Projection only |
| ActiveIngredient source data             |                  Yes | Projection only |
| Medicine–ActiveIngredient mapping source |                  Yes | Projection only |
| DrugInteraction Rule source              |                  Yes | Projection only |
| InteractionAlert lifecycle               |                  Yes |              No |
| HIGH alert acknowledgement/note          |                  Yes |              No |
| Checkout decision                        |                  Yes |              No |
| FEFO allocation                          |                  Yes |              No |
| Payment/Invoice                          |                  Yes |              No |
| Reports                                  |                  Yes |              No |
| Graph visualization                      | Source data provider |             Yes |
| Graph-RAG path/provenance                |      Source fallback |    Yes if fresh |
| Graph freshness metadata                 |                  Yes |        Indirect |
| Sync queue/retry                         |                  Yes |              No |
| Graph query execution                    |                   No |             Yes |

### 3.2. PostgreSQL source tables

Graph projection reads from:

1. `medicines`.
2. `active_ingredients`.
3. `medicine_ingredients`.
4. `drug_interactions`.
5. `graph_sync_outbox`.
6. `graph_sync_attempts`.
7. `graph_projection_versions`.

### 3.3. Neo4j projected graph

Neo4j stores projected:

1. `(:Medicine)`.
2. `(:ActiveIngredient)`.
3. `(:Medicine)-[:CONTAINS]->(:ActiveIngredient)`.
4. `(:ActiveIngredient)-[:INTERACTS_WITH]->(:ActiveIngredient)`.

### 3.4. Rule of conflict

If Neo4j conflicts with PostgreSQL:

```text
PostgreSQL wins.
```

Required behavior:

1. Mark graph stale or inconsistent.
2. Use PostgreSQL fallback if available.
3. Do not silently return stale/conflicting graph answer.
4. Log/audit sync issue.
5. Retry/rebuild projection if needed.

---

## 4. Core Graph MVP Model

### 4.1. Node: Medicine

`Medicine` node represents a Medicine record from PostgreSQL.

Source table:

```text
medicines
```

Purpose:

1. Show medicine in graph.
2. Connect medicine to active ingredients.
3. Help Graph-RAG explain why medicines in an order produce interactions indirectly.

### 4.2. Node: ActiveIngredient

`ActiveIngredient` node represents a curated ActiveIngredient record from PostgreSQL.

Source table:

```text
active_ingredients
```

Purpose:

1. Represent pharmacological active ingredient.
2. Serve as official level for interaction rules.
3. Connect to Medicine through `CONTAINS`.
4. Connect to other ActiveIngredients through `INTERACTS_WITH`.

### 4.3. Relationship: CONTAINS

`CONTAINS` relationship connects:

```text
(:Medicine)-[:CONTAINS]->(:ActiveIngredient)
```

Source table:

```text
medicine_ingredients
```

Purpose:

1. Show which active ingredients are contained in a medicine.
2. Allow deriving Medicine-level interaction through ingredient paths.
3. Support Graph-RAG explanation.

### 4.4. Relationship: INTERACTS_WITH

`INTERACTS_WITH` relationship connects:

```text
(:ActiveIngredient)-[:INTERACTS_WITH]->(:ActiveIngredient)
```

Source table:

```text
drug_interactions
```

Purpose:

1. Represent official interaction rule between two ActiveIngredients.
2. Store severity and recommendation properties.
3. Provide provenance through PostgreSQL `drug_interaction_id`.
4. Support explanation and graph traversal.

### 4.5. Derived medicine interaction path

Medicine-level interaction is derived, not stored as official edge.

Derived path:

```text
Medicine A
→ CONTAINS
→ ActiveIngredient A
→ INTERACTS_WITH
→ ActiveIngredient B
← CONTAINS
← Medicine B
```

Important:

1. No authoritative `(:Medicine)-[:INTERACTS_WITH]->(:Medicine)` in MVP.
2. If a visualizer shows Medicine-to-Medicine relation, it must label it as derived.
3. Checkout and alert logic use PostgreSQL ActiveIngredient-level rules.

---

## 5. Excluded Graph Concepts

### 5.1. Excluded from MVP

The following graph concepts are excluded from MVP:

1. DrugGroup.
2. Symptom.
3. Condition.
4. RedFlag.
5. Recommendation node.
6. riskScore.
7. Medicine–Medicine authoritative interaction edge.
8. Interaction node as separate graph node.
9. Dosage node.
10. Patient/customer medical profile node.
11. Disease diagnosis graph.
12. Treatment recommendation graph.

### 5.2. DrugGroup exclusion

`DrugGroup` is excluded because the project has not approved an official pharmacological taxonomy.

Do not infer DrugGroup from:

1. product category.
2. scraped category.
3. medicine category label.
4. marketing category.
5. dosage form.

Reason:

1. Category data may be commercial/catalog taxonomy, not pharmacological taxonomy.
2. Incorrect DrugGroup could mislead Graph-RAG.
3. Not required for MVP.

### 5.3. Symptom / Condition / RedFlag exclusion

These concepts are excluded because they may shift the product into diagnosis/prescribing territory.

They may appear in Future only if:

1. Scope approved.
2. Safety rules expanded.
3. Medical compliance reviewed.
4. Data source validated.
5. AI guardrail updated.
6. UI clearly restricts diagnosis/prescribing.

### 5.4. Recommendation node exclusion

Recommendation remains property text from DrugInteraction rule, not a graph node in MVP.

Reason:

1. Simpler graph.
2. Avoid prescriptive graph behavior.
3. Keeps PostgreSQL rule as source of truth.

### 5.5. riskScore exclusion

`riskScore` is excluded from MVP.

Rules:

1. Do not add `riskScore` to affect checkout.
2. Do not derive severity from `riskScore`.
3. Do not let Graph-RAG rank severity using `riskScore`.
4. Severity must come from PostgreSQL `drug_interactions.severity`.

If `riskScore` appears in future, it must be approved separately and not silently change official severity.

---

## 6. Neo4j Node Design

### 6.1. Node labels

MVP labels:

1. `Medicine`.
2. `ActiveIngredient`.

Optional technical label:

1. `PharmaAssistEntity` for all projected nodes, if useful.

Example:

```text
(:Medicine)
(:ActiveIngredient)
(:PharmaAssistEntity:Medicine)
(:PharmaAssistEntity:ActiveIngredient)
```

### 6.2. Medicine node properties

| Property            | Source                      | Required | Description                |
| ------------------- | --------------------------- | -------: | -------------------------- |
| `id`                | `medicines.id`              |      Yes | PostgreSQL ID              |
| `name`              | `medicines.name`            |      Yes | Medicine name              |
| `normalizedName`    | `medicines.normalized_name` |      Yes | Search support             |
| `code`              | `medicines.code`            |       No | Optional medicine code     |
| `unit`              | `medicines.unit`            |      Yes | Unit                       |
| `dosageForm`        | `medicines.dosage_form`     |       No | Optional                   |
| `strengthText`      | `medicines.strength_text`   |       No | Optional                   |
| `isActive`          | `medicines.is_active`       |      Yes | Active status              |
| `sourceTable`       | constant                    |      Yes | `medicines`                |
| `sourceVersion`     | source version              |      Yes | Version used for freshness |
| `sourceUpdatedAt`   | `medicines.updated_at`      |      Yes | Source update time         |
| `syncedAt`          | sync time                   |      Yes | Projection sync time       |
| `projectionVersion` | Graph sync metadata         |      Yes | Projection version         |

### 6.3. ActiveIngredient node properties

| Property            | Source                               | Required | Description          |
| ------------------- | ------------------------------------ | -------: | -------------------- |
| `id`                | `active_ingredients.id`              |      Yes | PostgreSQL ID        |
| `name`              | `active_ingredients.name`            |      Yes | Ingredient name      |
| `normalizedName`    | `active_ingredients.normalized_name` |      Yes | Search support       |
| `description`       | `active_ingredients.description`     |       No | Description          |
| `isActive`          | `active_ingredients.is_active`       |      Yes | Active status        |
| `sourceTable`       | constant                             |      Yes | `active_ingredients` |
| `sourceVersion`     | source version                       |      Yes | Source version       |
| `sourceUpdatedAt`   | `active_ingredients.updated_at`      |      Yes | Source update time   |
| `syncedAt`          | sync time                            |      Yes | Projection sync time |
| `projectionVersion` | Graph sync metadata                  |      Yes | Projection version   |

### 6.4. Node ID strategy

Neo4j node property `id` must equal PostgreSQL primary key.

Do not generate independent Neo4j-only business IDs.

Recommended unique constraints:

```text
Medicine.id unique
ActiveIngredient.id unique
```

### 6.5. Deactivation behavior

When PostgreSQL entity is deactivated:

1. Do not necessarily delete Neo4j node.
2. Set `isActive = false`.
3. Update `sourceVersion`.
4. Update `syncedAt`.
5. Keep graph history/provenance if useful.

Hard deletion from graph may be allowed during full projection rebuild, but logical deactivation is safer for incremental sync.

---

## 7. Neo4j Relationship Design

### 7.1. Relationship types

MVP relationship types:

1. `CONTAINS`.
2. `INTERACTS_WITH`.

### 7.2. CONTAINS relationship

Pattern:

```text
(:Medicine)-[:CONTAINS]->(:ActiveIngredient)
```

Source:

```text
medicine_ingredients
```

Properties:

| Property               | Source                             | Required | Description            |
| ---------------------- | ---------------------------------- | -------: | ---------------------- |
| `id`                   | `medicine_ingredients.id`          |      Yes | PostgreSQL mapping ID  |
| `medicineIngredientId` | `medicine_ingredients.id`          |      Yes | Explicit source ID     |
| `amountText`           | `medicine_ingredients.amount_text` |       No | e.g. 500mg             |
| `sortOrder`            | `medicine_ingredients.sort_order`  |       No | Display order          |
| `isActive`             | `medicine_ingredients.is_active`   |      Yes | Active mapping         |
| `sourceTable`          | constant                           |      Yes | `medicine_ingredients` |
| `sourceVersion`        | source version                     |      Yes | Source version         |
| `sourceUpdatedAt`      | source updated_at                  |      Yes | Source update time     |
| `syncedAt`             | sync time                          |      Yes | Projection sync time   |

### 7.3. INTERACTS_WITH relationship

Pattern:

```text
(:ActiveIngredient)-[:INTERACTS_WITH]->(:ActiveIngredient)
```

Source:

```text
drug_interactions
```

Properties:

| Property            | Source                                 | Required | Description                  |
| ------------------- | -------------------------------------- | -------: | ---------------------------- |
| `id`                | `drug_interactions.id`                 |      Yes | PostgreSQL rule ID           |
| `drugInteractionId` | `drug_interactions.id`                 |      Yes | Explicit source rule ID      |
| `canonicalPairKey`  | `drug_interactions.canonical_pair_key` |      Yes | Sorted pair key              |
| `severity`          | `drug_interactions.severity`           |      Yes | LOW/MEDIUM/HIGH              |
| `description`       | `drug_interactions.description`        |      Yes | Rule description             |
| `recommendation`    | `drug_interactions.recommendation`     |      Yes | Recommendation               |
| `source`            | `drug_interactions.source`             |       No | Source note                  |
| `sourceVersionText` | `drug_interactions.source_version`     |       No | Source text/version          |
| `isActive`          | `drug_interactions.is_active`          |      Yes | Active rule                  |
| `sourceTable`       | constant                               |      Yes | `drug_interactions`          |
| `sourceVersion`     | source version                         |      Yes | Source version for freshness |
| `sourceUpdatedAt`   | `drug_interactions.updated_at`         |      Yes | Source update time           |
| `syncedAt`          | sync time                              |      Yes | Projection sync time         |

### 7.4. Relationship identity

Relationship should be upserted by source ID.

Examples:

1. `CONTAINS` upsert key: `medicineIngredientId`.
2. `INTERACTS_WITH` upsert key: `drugInteractionId`.

Do not create duplicate relationships on repeated sync.

### 7.5. Deactivation behavior for relationships

When source mapping/rule is deactivated:

1. Set relationship `isActive = false`, or
2. Delete relationship during rebuild if the implementation chooses active-only projection.

Recommended MVP:

```text
Set isActive = false for incremental sync.
```

Reason:

1. Supports traceability.
2. Avoids sudden missing provenance.
3. Easier stale detection.

Graph-RAG should only use `isActive = true` relationships for current answer.

---

## 8. INTERACTS_WITH Canonical Direction

### 8.1. Problem

Drug interactions are logically symmetric.

If ActiveIngredient A interacts with ActiveIngredient B, then B also interacts with A.

However, Neo4j relationships are directed internally.

### 8.2. Official canonical direction rule

Store exactly one `INTERACTS_WITH` relationship per active interaction rule.

Direction must be deterministic.

Recommended canonical direction:

```text
lower(activeIngredientId) → higher(activeIngredientId)
```

or equivalent sorted UUID/string order.

### 8.3. Canonical pair key

PostgreSQL stores:

```text
canonical_pair_key
```

Format:

```text
min(ingredient_a_id, ingredient_b_id) + "::" + max(ingredient_a_id, ingredient_b_id)
```

Neo4j `INTERACTS_WITH.canonicalPairKey` must match PostgreSQL.

### 8.4. Benefits

Canonical direction prevents:

1. Duplicate relationships.
2. A→B and B→A duplication.
3. Confusing duplicate query results.
4. Multiple alerts for same rule.
5. Sync idempotency issues.

### 8.5. Important rule

Canonical direction is storage-only.

Query behavior must remain symmetric.

---

## 9. Symmetric Query Behavior

### 9.1. Query rule

Although `INTERACTS_WITH` is stored in canonical direction, Graph-RAG queries must treat it as symmetric.

Query should match either direction:

```text
(a)-[r:INTERACTS_WITH]-(b)
```

or equivalent allowlisted query pattern.

### 9.2. Example logical behavior

If stored:

```text
Ingredient A → INTERACTS_WITH → Ingredient B
```

Query for:

1. A to B should find it.
2. B to A should also find it.

### 9.3. UI behavior

UI should not imply direction means “A causes B”.

Display should say:

```text
A tương tác với B
```

not:

```text
A tác động một chiều lên B
```

unless a future rule supports directional interactions.

### 9.4. InteractionAlert behavior

InteractionAlert still references PostgreSQL `drug_interaction_id`.

Graph direction must not create duplicate alert.

---

## 10. Relationship Properties

### 10.1. CONTAINS properties summary

| Property               | Use in Graph-RAG      |
| ---------------------- | --------------------- |
| `medicineIngredientId` | Provenance            |
| `amountText`           | Display/detail        |
| `isActive`             | Filter active mapping |
| `sourceVersion`        | Freshness             |
| `syncedAt`             | Freshness metadata    |

### 10.2. INTERACTS_WITH properties summary

| Property            | Use in Graph-RAG    |
| ------------------- | ------------------- |
| `drugInteractionId` | Provenance          |
| `severity`          | Explain severity    |
| `description`       | Explain interaction |
| `recommendation`    | Staff guidance      |
| `canonicalPairKey`  | Deduplication       |
| `isActive`          | Filter active rules |
| `sourceVersion`     | Freshness           |
| `syncedAt`          | Freshness metadata  |

### 10.3. Properties not allowed in MVP

Do not add:

1. `riskScore`.
2. `diagnosis`.
3. `treatmentPlan`.
4. `dosageAdvice`.
5. `symptomSeverity`.
6. `patientSpecificRisk`.

unless explicitly approved as future scope.

---

## 11. Graph Projection Source Mapping

### 11.1. Source mapping table

| PostgreSQL Source      | Neo4j Projection                                             | Event Type                                                                     |
| ---------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `medicines`            | `(:Medicine)`                                                | `MEDICINE_UPSERT`, `MEDICINE_DEACTIVATE`                                       |
| `active_ingredients`   | `(:ActiveIngredient)`                                        | `ACTIVE_INGREDIENT_UPSERT`, `ACTIVE_INGREDIENT_DEACTIVATE`                     |
| `medicine_ingredients` | `(:Medicine)-[:CONTAINS]->(:ActiveIngredient)`               | `MEDICINE_INGREDIENT_MAPPING_UPSERT`, `MEDICINE_INGREDIENT_MAPPING_DEACTIVATE` |
| `drug_interactions`    | `(:ActiveIngredient)-[:INTERACTS_WITH]->(:ActiveIngredient)` | `DRUG_INTERACTION_UPSERT`, `DRUG_INTERACTION_DEACTIVATE`                       |

### 11.2. Source version

Every projected entity/relationship must have a source version.

Possible source version strategy:

1. Use integer `version` column if implemented.
2. Use updated_at timestamp as version marker.
3. Use monotonically increasing version generated in service.
4. Use event sequence number.

Recommended:

```text
Use explicit sourceVersion where possible.
```

If not possible in MVP, use `updated_at` plus outbox event created time, but document the limitation.

### 11.3. Projection metadata

Every node/relationship should include:

1. `sourceTable`.
2. `sourceVersion`.
3. `sourceUpdatedAt`.
4. `syncedAt`.
5. `isActive`.

### 11.4. Out-of-order handling

Graph Sync Worker must handle out-of-order or replayed events.

Rules:

1. If event sourceVersion is older than projected version, skip or mark obsolete.
2. If event is same version, upsert idempotently.
3. If event is newer, apply.
4. Log skipped stale event.
5. Never downgrade graph projection silently.

---

## 12. Graph Sync Architecture

### 12.1. Graph Sync components

Graph Sync includes:

1. Domain services creating outbox events.
2. `graph_sync_outbox` table.
3. Graph Sync Worker.
4. Neo4j Client.
5. Graph Projection Service.
6. Graph Freshness Service.
7. `graph_sync_attempts` table.
8. `graph_projection_versions` table.
9. Audit/observability.

### 12.2. High-level flow

```text
PostgreSQL source data changes
→ Domain service creates GraphSyncOutbox event
→ Transaction commits
→ Graph Sync Worker polls pending events
→ Worker loads authoritative data from PostgreSQL
→ Worker upserts Neo4j node/relationship
→ Worker writes GraphSyncAttempt
→ Worker updates outbox status
→ Worker updates GraphProjectionVersion
→ Graph becomes fresh for that source version
```

### 12.3. Outbox design

Outbox table:

```text
graph_sync_outbox
```

Required fields:

1. `id`.
2. `event_type`.
3. `aggregate_type`.
4. `aggregate_id`.
5. `source_version`.
6. `payload`.
7. `status`.
8. `retry_count`.
9. `next_retry_at`.
10. `last_error_code`.
11. `last_error_message`.
12. `created_at`.
13. `updated_at`.
14. `processed_at`.

### 12.4. Outbox status

Allowed statuses:

1. `PENDING`.
2. `PROCESSING`.
3. `SUCCEEDED`.
4. `RETRY_SCHEDULED`.
5. `FAILED`.
6. `SKIPPED`.

### 12.5. Worker responsibilities

Graph Sync Worker must:

1. Poll pending/retry-ready outbox events.
2. Lock/claim job safely.
3. Load authoritative source from PostgreSQL.
4. Validate source exists.
5. Build projection command.
6. Upsert Neo4j.
7. Record attempt.
8. Update projection version.
9. Update outbox status.
10. Schedule retry on transient failure.
11. Mark failed after max retries.
12. Handle deactivation.
13. Handle skipped stale event.
14. Avoid duplicate relationships.
15. Avoid raw unbounded graph writes.

### 12.6. Retry strategy

Recommended retry behavior:

| Attempt | Delay      |
| ------: | ---------- |
|       1 | immediate  |
|       2 | 10 seconds |
|       3 | 30 seconds |
|       4 | 2 minutes  |
|       5 | 5 minutes  |

MVP can simplify delay but must include retry.

Max retries configurable.

### 12.7. Attempts/logs

Every attempt should create:

```text
graph_sync_attempts
```

Fields include:

1. outbox id.
2. attempt number.
3. status.
4. started_at.
5. finished_at.
6. duration_ms.
7. error_code.
8. error_message.
9. neo4j_operation_summary.

### 12.8. Audit

Backend must audit important graph sync failures.

Examples:

1. Neo4j unavailable.
2. Projection failure after retries.
3. Graph rebuild failure.
4. Freshness failure affecting Graph-RAG.
5. Fallback used because graph stale.

Generic System Audit UI is Should-have, but backend logging/audit is required.

### 12.9. Failure handling

| Failure                       | Required behavior                                   |
| ----------------------------- | --------------------------------------------------- |
| Neo4j unavailable             | Retry, mark graph stale, fallback if possible       |
| Invalid source data           | Mark failed/skipped depending reason, log           |
| Out-of-order event            | Skip older event, log skipped                       |
| Relationship endpoint missing | Load/create missing nodes first or retry dependency |
| Duplicate relationship risk   | Upsert by source ID/canonical pair                  |
| Query timeout                 | Return safe error/fallback                          |
| Worker crash                  | Job should eventually recover/retry                 |

### 12.10. Rebuild projection

Graph rebuild may be used for demo reset or recovery.

Flow:

```text
Clear/recreate projection safely
→ Load all active MVP graph sources from PostgreSQL
→ Upsert Medicine nodes
→ Upsert ActiveIngredient nodes
→ Upsert CONTAINS relationships
→ Upsert INTERACTS_WITH relationships
→ Update GraphProjectionVersion
→ Check freshness
```

Rebuild command/API screen is Should-have/Admin technical unless used internally for demo reset.

---

## 13. Freshness Detection

### 13.1. Purpose

Freshness detection ensures Graph-RAG does not use stale Neo4j data silently.

### 13.2. Freshness inputs

Freshness check uses:

1. `graph_sync_outbox.status`.
2. `graph_projection_versions.projected_source_version`.
3. PostgreSQL source version.
4. Relevant aggregate IDs.
5. Failed/pending jobs.
6. Last successful sync time.
7. Optional graph consistency check.

### 13.3. Source version rule

Graph is fresh for an aggregate if:

```text
graph_projection_versions.projected_source_version >= current PostgreSQL source_version
```

and there is no relevant pending/failed outbox event for that aggregate.

### 13.4. Outbox state rule

Graph is stale if relevant outbox event is:

1. `PENDING`.
2. `PROCESSING` beyond expected timeout.
3. `RETRY_SCHEDULED`.
4. `FAILED`.

Graph may be fresh if event is:

1. `SUCCEEDED`.
2. `SKIPPED` because event was older than already projected version.

### 13.5. Query-specific freshness

Freshness should be checked by query context.

Example:

For interaction explanation involving order with Medicine A and Medicine B, check freshness for:

1. Medicine A.
2. Medicine B.
3. Their ActiveIngredient mappings.
4. Related ActiveIngredients.
5. Related DrugInteraction Rules.

Do not require the entire graph to be globally fresh if only local context is needed, unless simpler MVP implementation chooses global freshness.

### 13.6. MVP freshness strategy

MVP acceptable strategies:

#### Option A — Query-specific freshness

More accurate.

Check only relevant aggregate IDs.

#### Option B — Global freshness flag

Simpler.

Graph is considered fresh only if no pending/failed relevant outbox jobs exist globally.

Recommended for MVP if time is limited:

```text
Use global freshness for simplicity, but still record source/projection metadata.
```

### 13.7. Freshness statuses

Recommended statuses:

| Status          | Meaning                              |
| --------------- | ------------------------------------ |
| `FRESH`         | Graph is safe to use                 |
| `STALE`         | Graph has unprocessed/failed updates |
| `UNAVAILABLE`   | Neo4j unavailable                    |
| `UNKNOWN`       | Freshness cannot be determined       |
| `FALLBACK_USED` | PostgreSQL fallback used             |
| `NO_FALLBACK`   | Cannot answer safely                 |

---

## 14. Stale Graph Behavior

### 14.1. Golden rule

Stale graph must never be used without explicit warning.

### 14.2. For interaction explanation

If graph is stale/unavailable:

1. Do not use stale graph silently.
2. Use PostgreSQL authoritative context if available.
3. Return `graphUsed = false`.
4. Return freshness/degraded indicator.
5. Still provide safe explanation from PostgreSQL.
6. Audit fallback event if AI/Graph-RAG involved.

### 14.3. For pure graph query

If query requires Neo4j and no PostgreSQL fallback exists:

1. Return safe error.
2. Do not fabricate answer.
3. Do not ask AI to guess.
4. Show graph stale/unavailable indicator.
5. Suggest retry later or contact Admin if appropriate.

### 14.4. For Graph Explorer

If graph stale:

1. Show graph with warning only if allowed by design, or
2. Block view and show stale indicator.

Recommended MVP:

1. Graph Explorer can show stale warning.
2. Graph-RAG answer should not rely on stale graph for reasoning.

### 14.5. UI indicators

UI should display:

1. `Graph fresh`.
2. `Graph stale`.
3. `Neo4j unavailable`.
4. `Using PostgreSQL fallback`.
5. `No fallback available`.

---

## 15. Graph-RAG Architecture

### 15.1. Purpose

Graph-RAG combines graph retrieval with safe explanation generation.

Graph-RAG in MVP should answer questions such as:

1. “Vì sao hai thuốc này có cảnh báo tương tác?”
2. “Thuốc này chứa hoạt chất nào?”
3. “Hoạt chất này tương tác với hoạt chất nào?”
4. “Đơn này có interaction path như thế nào?”

### 15.2. Graph-RAG components

1. Graph-RAG Controller/API.
2. Auth/Permission Guard.
3. Graph Query Intent Classifier or template selector.
4. Graph Freshness Service.
5. Allowlisted Query Template Service.
6. Neo4j Query Executor.
7. PostgreSQL Fallback Service.
8. Provenance Builder.
9. AI Response Generator if needed.
10. Guardrail integration.
11. Response Formatter.
12. Audit/observability.

### 15.3. High-level Graph-RAG flow

```text
User asks Graph-RAG question
→ Backend validates permission
→ Classify intent / select query template
→ Check if query is allowed
→ Determine required freshness scope
→ Check graph freshness
→ If fresh: run allowlisted Neo4j query
→ Build provenance
→ Optionally pass safe context to AI
→ Return answer with graphUsed=true
→ If stale/unavailable and fallback exists: use PostgreSQL fallback
→ Return answer with graphUsed=false + fallback indicator
→ If no fallback: return safe error
```

### 15.4. Graph-RAG output fields

Recommended response metadata:

1. `answer`.
2. `graphUsed`.
3. `fallbackUsed`.
4. `fallbackSource`.
5. `freshnessStatus`.
6. `freshnessCheckedAt`.
7. `provenance`.
8. `queryTemplateId`.
9. `limitsApplied`.
10. `warnings`.

### 15.5. Graph-RAG and AI

Graph-RAG may use AI to phrase answer, but:

1. AI receives only safe retrieved context.
2. AI must not query Neo4j directly.
3. AI must not invent graph facts.
4. AI output guardrail applies.
5. AI Audit applies if AI is used.
6. Graph provenance remains visible.

---

## 16. Graph-RAG Query Templates

### 16.1. Template principle

No free-form Cypher from user.

All Graph-RAG queries must use allowlisted templates.

Each template must define:

1. Template ID.
2. Purpose.
3. Allowed roles/permissions.
4. Parameters.
5. Cypher pattern.
6. Limits.
7. Timeout.
8. Freshness scope.
9. Fallback availability.
10. Output shape.

### 16.2. Template list MVP

Recommended MVP templates:

1. `GQ-001_MEDICINE_INGREDIENTS`.
2. `GQ-002_INGREDIENT_INTERACTIONS`.
3. `GQ-003_MEDICINE_TO_MEDICINE_INTERACTION_PATH`.
4. `GQ-004_ORDER_INTERACTION_EXPLANATION_PATH`.
5. `GQ-005_ACTIVE_INGREDIENT_NEIGHBORHOOD`.
6. `GQ-006_MEDICINE_GRAPH_SUMMARY`.

---

### 16.3. GQ-001 — Medicine Ingredients

| Field          | Value                                             |
| -------------- | ------------------------------------------------- |
| Template ID    | `GQ-001_MEDICINE_INGREDIENTS`                     |
| Purpose        | Lấy ActiveIngredients của Medicine                |
| Params         | `medicineId`                                      |
| Permission     | `graph_rag.use_readonly` or `graph_explorer.read` |
| Graph required | Yes                                               |
| Fallback       | PostgreSQL available                              |
| Limit          | Max 50 ingredients                                |
| Timeout        | 2–5 seconds                                       |

Logical query:

```text
Find Medicine by id
→ traverse active CONTAINS
→ return ActiveIngredient nodes and CONTAINS relationship properties
```

Output:

1. Medicine.
2. Ingredients.
3. CONTAINS provenance.
4. Freshness status.

---

### 16.4. GQ-002 — Ingredient Interactions

| Field          | Value                                     |
| -------------- | ----------------------------------------- |
| Template ID    | `GQ-002_INGREDIENT_INTERACTIONS`          |
| Purpose        | Lấy interactions của một ActiveIngredient |
| Params         | `activeIngredientId`                      |
| Permission     | `graph_rag.use_readonly`                  |
| Graph required | Yes                                       |
| Fallback       | PostgreSQL available                      |
| Limit          | Max 50 relationships                      |
| Timeout        | 2–5 seconds                               |

Logical query:

```text
Find ActiveIngredient by id
→ traverse active INTERACTS_WITH in either direction
→ return connected ActiveIngredients and relationship properties
```

Output:

1. Source ingredient.
2. Interacting ingredients.
3. Severity.
4. Recommendation.
5. Rule provenance.

---

### 16.5. GQ-003 — Medicine-to-Medicine Interaction Path

| Field          | Value                                                 |
| -------------- | ----------------------------------------------------- |
| Template ID    | `GQ-003_MEDICINE_TO_MEDICINE_INTERACTION_PATH`        |
| Purpose        | Kiểm tra/giải thích interaction path giữa 2 Medicines |
| Params         | `medicineAId`, `medicineBId`                          |
| Permission     | `graph_rag.use_readonly`                              |
| Graph required | Yes                                                   |
| Fallback       | PostgreSQL available                                  |
| Limit          | Max 20 paths                                          |
| Timeout        | 2–5 seconds                                           |

Logical path:

```text
Medicine A
- CONTAINS -
ActiveIngredient A
- INTERACTS_WITH -
ActiveIngredient B
- CONTAINS -
Medicine B
```

Output:

1. Medicine A.
2. Medicine B.
3. Ingredient pair.
4. Rule severity.
5. Rule recommendation.
6. drugInteractionId.
7. path provenance.

Important:

1. This is derived path.
2. Do not store Medicine–Medicine edge as official rule.

---

### 16.6. GQ-004 — Order Interaction Explanation Path

| Field          | Value                                            |
| -------------- | ------------------------------------------------ |
| Template ID    | `GQ-004_ORDER_INTERACTION_EXPLANATION_PATH`      |
| Purpose        | Giải thích path cho InteractionAlert trong Order |
| Params         | `orderId`, `interactionAlertId`                  |
| Permission     | `graph_rag.use_readonly`                         |
| Graph required | Yes                                              |
| Fallback       | PostgreSQL available                             |
| Limit          | Related alert path only                          |
| Timeout        | 2–5 seconds                                      |

Logical behavior:

1. Load InteractionAlert from PostgreSQL.
2. Identify related DrugInteraction and ingredients.
3. Check graph freshness for those source entities.
4. Query graph path connecting medicines/ingredients.
5. Return path and provenance.

Output:

1. Alert.
2. Ingredient pair.
3. Medicines involved.
4. Graph path.
5. Rule provenance.
6. Freshness metadata.

Fallback:

1. Use PostgreSQL InteractionAlert + DrugInteraction + MedicineIngredient data.
2. Return graphUsed=false.

---

### 16.7. GQ-005 — ActiveIngredient Neighborhood

| Field          | Value                                    |
| -------------- | ---------------------------------------- |
| Template ID    | `GQ-005_ACTIVE_INGREDIENT_NEIGHBORHOOD`  |
| Purpose        | Show local graph around ActiveIngredient |
| Params         | `activeIngredientId`, `depth`            |
| Permission     | `graph_explorer.read`                    |
| Graph required | Yes                                      |
| Fallback       | No full fallback                         |
| Limit          | Depth max 1 or 2                         |
| Timeout        | 2–5 seconds                              |

Security rule:

1. Depth must be capped.
2. Node count must be capped.
3. Relationship count must be capped.

If graph unavailable:

1. Return safe error.
2. Do not ask AI to guess neighborhood.

---

### 16.8. GQ-006 — Medicine Graph Summary

| Field          | Value                                  |
| -------------- | -------------------------------------- |
| Template ID    | `GQ-006_MEDICINE_GRAPH_SUMMARY`        |
| Purpose        | Summary graph context for one Medicine |
| Params         | `medicineId`                           |
| Permission     | `graph_explorer.read`                  |
| Graph required | Yes                                    |
| Fallback       | Partial PostgreSQL fallback            |
| Limit          | Max 50 nodes/relationships             |
| Timeout        | 2–5 seconds                            |

Output:

1. Medicine node.
2. Ingredients.
3. Interaction count per ingredient.
4. Provenance.
5. Freshness status.

---

## 17. Provenance / Freshness Metadata

### 17.1. Provenance purpose

Provenance tells the user where graph answer came from.

It should make Graph-RAG trustworthy and auditable.

### 17.2. Provenance fields

Recommended provenance object:

```json
{
  "type": "INTERACTS_WITH",
  "sourceTable": "drug_interactions",
  "sourceId": "drug_interaction_uuid",
  "sourceVersion": 12,
  "severity": "HIGH",
  "syncedAt": "2026-06-08T10:00:00.000Z"
}
```

### 17.3. Node provenance

For nodes:

1. sourceTable.
2. sourceId.
3. sourceVersion.
4. sourceUpdatedAt.
5. syncedAt.
6. isActive.

### 17.4. Relationship provenance

For relationships:

1. sourceTable.
2. sourceId.
3. sourceVersion.
4. sourceUpdatedAt.
5. syncedAt.
6. isActive.
7. severity if `INTERACTS_WITH`.

### 17.5. Freshness metadata

Response should include:

```json
{
  "freshness": {
    "status": "FRESH",
    "checkedAt": "2026-06-08T10:00:00.000Z",
    "graphUsed": true,
    "fallbackUsed": false
  }
}
```

Possible status values:

1. `FRESH`.
2. `STALE`.
3. `UNAVAILABLE`.
4. `UNKNOWN`.
5. `FALLBACK_USED`.
6. `NO_FALLBACK`.

### 17.6. Warnings

Warnings examples:

1. “Graph projection is stale; PostgreSQL fallback was used.”
2. “Neo4j is unavailable; graph-only query cannot be answered safely.”
3. “Only active interaction rules are included.”
4. “Medicine-to-medicine interaction is derived from active ingredients.”

---

## 18. PostgreSQL Fallback for Interaction Explanation

### 18.1. Fallback purpose

Interaction explanation must remain usable if Neo4j is unavailable or stale.

PostgreSQL contains authoritative data needed to explain:

1. Order items.
2. Medicine.
3. MedicineIngredient mapping.
4. ActiveIngredient.
5. DrugInteraction Rule.
6. InteractionAlert snapshot.

### 18.2. Fallback allowed for

Fallback allowed for:

1. InteractionAlert explanation.
2. Medicine ingredients summary.
3. Ingredient interaction summary.
4. Medicine-to-medicine interaction path explanation if source data available.

### 18.3. Fallback not allowed for

Fallback not sufficient for:

1. Arbitrary graph neighborhood.
2. Pure graph exploration.
3. Graph visualization requiring full Neo4j layout.
4. Queries beyond PostgreSQL relational context.

### 18.4. Fallback response behavior

When fallback used:

1. Set `graphUsed=false`.
2. Set `fallbackUsed=true`.
3. Set `fallbackSource=POSTGRESQL`.
4. Include `freshnessStatus=FALLBACK_USED` or `STALE`.
5. Include warning.
6. Provide provenance from PostgreSQL tables.

### 18.5. Fallback should not hide graph issue

Do not say:

```text
Graph confirms the interaction.
```

if graph was not used.

Say:

```text
Hệ thống dùng dữ liệu chính thức trong PostgreSQL vì graph hiện chưa đồng bộ hoặc không khả dụng.
```

---

## 19. Safe Error for Pure Graph Queries

### 19.1. Pure graph query definition

A pure graph query is a query that needs Neo4j graph traversal and cannot be fully reconstructed from PostgreSQL fallback in current MVP.

Examples:

1. ActiveIngredient neighborhood visualization.
2. Graph Explorer layout.
3. Multi-hop graph traversal.
4. Arbitrary path query.

### 19.2. Safe error behavior

If graph unavailable/stale and no fallback exists:

1. Return safe error.
2. Do not fabricate.
3. Do not ask AI to guess.
4. Do not expose internal stack trace.
5. Log/audit if needed.
6. UI shows retry/degraded state.

### 19.3. Safe error example

```text
Không thể trả lời truy vấn graph này vì Neo4j hiện không khả dụng hoặc dữ liệu graph chưa đồng bộ. Hệ thống không sử dụng dữ liệu graph cũ để tránh sai lệch. Vui lòng thử lại sau hoặc kiểm tra trạng thái Graph Sync.
```

### 19.4. Error codes

Recommended error codes:

1. `GRAPH_UNAVAILABLE`.
2. `GRAPH_STALE`.
3. `GRAPH_FALLBACK_NOT_AVAILABLE`.
4. `GRAPH_QUERY_NOT_ALLOWED`.
5. `GRAPH_QUERY_TIMEOUT`.

---

## 20. Security Restrictions

### 20.1. No raw Cypher for Staff

Staff must not have raw Cypher API or UI.

Rejected:

```text
POST /api/v1/graph/cypher
```

for Staff/general users.

### 20.2. No raw Cypher for normal Admin UI in MVP

Even Admin Graph Explorer should use predefined graph query functions/templates.

Raw Cypher may exist only as:

1. Developer-only local tool.
2. Internal debug script.
3. Not exposed in MVP frontend.
4. Not part of official API contract.

### 20.3. Allowlisted query templates

All graph queries must map to allowlisted templates.

Template validation must check:

1. Template ID.
2. Permission.
3. Params.
4. Param types.
5. Limits.
6. Timeout.
7. Freshness requirement.

### 20.4. Query limits

Graph queries must enforce:

1. Max depth.
2. Max nodes.
3. Max relationships.
4. Max result rows.
5. Timeout.
6. Read-only transaction.
7. No writes from Graph-RAG query endpoint.

Recommended MVP limits:

| Limit             |       Value |
| ----------------- | ----------: |
| Max depth         |           2 |
| Max nodes         |         100 |
| Max relationships |         200 |
| Query timeout     | 2–5 seconds |
| Max page size     |          50 |

### 20.5. Read-only graph access

Graph-RAG and Graph Explorer endpoints must be read-only.

Only Graph Sync Worker may write to Neo4j.

### 20.6. Injection prevention

Prevent:

1. Raw Cypher injection.
2. Prompt injection causing unsafe graph query.
3. User-provided labels/relationship types.
4. User-provided arbitrary property names.
5. Unbounded traversal.

### 20.7. Sensitive data

Graph should not store:

1. Customer PII.
2. Staff private data.
3. Payment data.
4. Invoice data.
5. Consultation notes.
6. Raw AI request/response.
7. Medical record data.

### 20.8. Authorization by module

Graph permissions:

| Permission               | Meaning                         |
| ------------------------ | ------------------------------- |
| `graph_explorer.read`    | View read-only graph            |
| `graph_rag.use_readonly` | Use Graph-RAG                   |
| `graph_sync.read_status` | Should-have Admin status screen |
| `graph_sync.retry`       | Should-have Admin retry         |
| `graph.raw_cypher`       | Rejected for MVP UI/API         |

Warehouse has no graph access in MVP.

---

## 21. MVP / Should-have / Future Graph Scope

### 21.1. MVP graph scope

MVP includes:

1. Neo4j graph database.
2. PostgreSQL source of truth.
3. Graph projection for Medicine.
4. Graph projection for ActiveIngredient.
5. `CONTAINS` relationship.
6. `INTERACTS_WITH` relationship.
7. Graph Sync Outbox.
8. Graph Sync Worker.
9. Retry handling.
10. Sync attempts/logs.
11. Freshness detection.
12. Graph-RAG read-only.
13. Allowlisted query templates.
14. PostgreSQL fallback for interaction explanation.
15. Safe error for pure graph queries.
16. Provenance metadata.
17. Graph freshness/fallback UI indicator.

### 21.2. Should-have graph scope

Should-have includes:

1. Admin Graph Sync Status screen.
2. Manual retry from UI.
3. Graph projection rebuild UI.
4. More detailed Graph Explorer.
5. Graph visual layout improvements.
6. Graph health dashboard.
7. Sync metrics.
8. More graph query templates.
9. Export graph evidence for report/demo.

### 21.3. Future graph scope

Future includes:

1. DrugGroup taxonomy after official approval.
2. Symptom graph.
3. Condition graph.
4. RedFlag graph.
5. Recommendation nodes.
6. More advanced Graph-RAG.
7. Multi-hop clinical knowledge graph.
8. Drug ontology integration.
9. AI-assisted graph curation.
10. Graph analytics.
11. Risk scoring if approved.
12. Production-grade graph observability.

### 21.4. Out of Scope graph behavior

Out of Scope:

1. Medicine–Medicine authoritative interaction edges.
2. DrugGroup without taxonomy.
3. Symptom/Condition/RedFlag as MVP.
4. riskScore affecting severity/checkout.
5. Raw Cypher UI for Staff.
6. Raw Cypher API as public endpoint.
7. Neo4j as source of truth.
8. Graph modifying PostgreSQL official data.
9. Stale graph used silently.
10. Graph-based checkout approval.

---

## 22. Graph Test Requirements

### 22.1. Unit tests

Unit tests should cover:

1. Canonical pair key generation.
2. Canonical direction selection.
3. Symmetric query mapping.
4. Graph projection payload building.
5. Outbox event creation.
6. Freshness status calculation.
7. Stale event skip logic.
8. Retry schedule calculation.
9. Query template validation.
10. Query parameter validation.
11. Fallback decision logic.
12. Safe error decision logic.
13. Provenance builder.
14. Graph response formatter.

### 22.2. Integration tests

Integration tests should cover:

1. Medicine create/update creates outbox event.
2. ActiveIngredient create/update creates outbox event.
3. MedicineIngredient mapping update creates outbox event.
4. DrugInteraction rule create/update/deactivate creates outbox event.
5. Worker processes Medicine projection.
6. Worker processes ActiveIngredient projection.
7. Worker processes CONTAINS relationship.
8. Worker processes INTERACTS_WITH relationship.
9. Duplicate sync does not create duplicate relationship.
10. Deactivation sets `isActive=false`.
11. Failed Neo4j write creates retry/attempt record.
12. Max retries marks outbox as FAILED.
13. Fresh graph returns graphUsed=true.
14. Stale graph uses PostgreSQL fallback for interaction explanation.
15. Pure graph query with stale graph returns safe error.

### 22.3. E2E tests

E2E tests should cover:

1. Admin/Staff opens Graph-RAG.
2. Query medicine ingredients.
3. Query interaction explanation.
4. UI shows provenance.
5. UI shows graph freshness.
6. Simulate Neo4j unavailable.
7. Interaction explanation falls back to PostgreSQL.
8. Pure graph query shows safe error.
9. Staff cannot input raw Cypher.
10. Warehouse cannot access Graph-RAG in MVP.

### 22.4. Demo tests

Before demo, verify:

1. Neo4j connection works.
2. Graph projection rebuilt from PostgreSQL.
3. Graph freshness status is FRESH.
4. Graph-RAG query returns path/provenance.
5. PostgreSQL fallback can be demonstrated if desired.
6. Graph Sync failure does not break checkout.
7. Graph Sync status/freshness logs are available.
8. No raw Cypher UI visible.
9. No stale graph used silently.

### 22.5. Negative tests

Negative tests should cover:

1. Raw Cypher submitted as question.
2. Query depth too large.
3. Unknown query template.
4. Invalid medicine ID.
5. Inactive interaction rule.
6. Neo4j timeout.
7. Failed sync job.
8. Out-of-order event.
9. Duplicate interaction pair.
10. Graph stale with no fallback.

---

## 23. Traceability to SRS / API / AI / Data / Testing

### 23.1. Traceability to SRS

| Graph Area                  | SRS Requirement Group |
| --------------------------- | --------------------- |
| Graph Sync                  | FR-GSY                |
| Graph-RAG                   | FR-GRG                |
| Medicine projection         | FR-MED, FR-GSY        |
| ActiveIngredient projection | FR-ACT, FR-GSY        |
| Interaction rule projection | FR-DRG, FR-GSY        |
| Graph freshness             | FR-GSY, NFR-REL       |
| Fallback behavior           | FR-GRG, NFR-REL       |
| Graph safety                | NFR-SEC, NFR-SAFE     |
| Audit/logging               | NFR-AUD               |

### 23.2. Traceability to API

| Graph Feature               | API Group                                                |
| --------------------------- | -------------------------------------------------------- |
| Graph-RAG query             | `POST /graph-rag/query`                                  |
| Medicine graph view         | `GET /graph/explorer/medicines/{id}`                     |
| ActiveIngredient graph view | `GET /graph/explorer/active-ingredients/{id}`            |
| Graph Sync status           | `GET /graph-sync/status` — Should-have                   |
| Graph Sync jobs             | `GET /graph-sync/jobs` — Should-have                     |
| Graph Sync retry            | `POST /graph-sync/jobs/{id}/retry` — Should-have         |
| Graph rebuild               | `POST /graph-sync/rebuild` — Should-have/Admin technical |

### 23.3. Traceability to database

| Graph Concept                    | PostgreSQL Tables                                                                                                |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Medicine node                    | `medicines`                                                                                                      |
| ActiveIngredient node            | `active_ingredients`                                                                                             |
| CONTAINS relationship            | `medicine_ingredients`                                                                                           |
| INTERACTS_WITH relationship      | `drug_interactions`                                                                                              |
| Outbox                           | `graph_sync_outbox`                                                                                              |
| Attempts                         | `graph_sync_attempts`                                                                                            |
| Freshness                        | `graph_projection_versions`, `graph_sync_outbox`                                                                 |
| Fallback interaction explanation | `interaction_alerts`, `drug_interactions`, `medicine_ingredients`, `active_ingredients`, `orders`, `order_items` |

### 23.4. Traceability to AI

| Graph Feature          | AI Integration                                           |
| ---------------------- | -------------------------------------------------------- |
| Graph-RAG answer       | AI may phrase safe answer from retrieved graph context   |
| Provenance             | AI receives safe provenance summary only                 |
| Graph stale            | AI receives PostgreSQL fallback context, not stale graph |
| Pure graph no fallback | AI should not hallucinate answer                         |
| AI Audit               | Records graphUsed/fallback if AI generation used         |
| Guardrail              | Blocks unsafe medical inference from graph               |

### 23.5. Traceability to UI

| Graph Feature  | UI Screen                              |
| -------------- | -------------------------------------- |
| Graph Explorer | Graph Explorer screen                  |
| Graph-RAG      | Graph-RAG query screen                 |
| Provenance     | Graph-RAG answer card                  |
| Freshness      | Graph freshness indicator              |
| Fallback       | PostgreSQL fallback banner             |
| Safe error     | Graph unavailable/stale error state    |
| Sync Status    | Graph Sync Status screen — Should-have |

### 23.6. Traceability to testing

| Graph Requirement        | Test Area         |
| ------------------------ | ----------------- |
| Outbox event creation    | Unit/Integration  |
| Worker retry             | Integration       |
| Neo4j projection         | Integration       |
| Canonical INTERACTS_WITH | Unit/Integration  |
| Symmetric query          | Unit/Integration  |
| Freshness detection      | Unit/Integration  |
| PostgreSQL fallback      | Integration/E2E   |
| Pure graph safe error    | Integration/E2E   |
| No raw Cypher            | Security/E2E      |
| Warehouse no access      | Authorization/E2E |

---

## 24. Graph Quality Checklist

Before graph feature is accepted, verify:

| Checklist item                                         | Expected |
| ------------------------------------------------------ | -------- |
| PostgreSQL remains source of truth                     | Yes      |
| Neo4j is projection only                               | Yes      |
| Graph contains Medicine nodes                          | Yes      |
| Graph contains ActiveIngredient nodes                  | Yes      |
| Graph contains CONTAINS relationships                  | Yes      |
| Graph contains INTERACTS_WITH relationships            | Yes      |
| No Medicine–Medicine authoritative edge                | Yes      |
| No DrugGroup without taxonomy                          | Yes      |
| No Symptom/Condition/RedFlag in MVP                    | Yes      |
| No riskScore affecting checkout/severity               | Yes      |
| INTERACTS_WITH has canonical direction                 | Yes      |
| Queries treat INTERACTS_WITH symmetrically             | Yes      |
| Graph Sync Outbox exists                               | Yes      |
| Graph Sync Worker exists                               | Yes      |
| Retry logic exists                                     | Yes      |
| Attempts/logs exist                                    | Yes      |
| Freshness detection exists                             | Yes      |
| Stale graph not used silently                          | Yes      |
| PostgreSQL fallback exists for interaction explanation | Yes      |
| Pure graph query has safe error                        | Yes      |
| Raw Cypher not exposed to Staff                        | Yes      |
| Query templates are allowlisted                        | Yes      |
| Query limits/timeouts exist                            | Yes      |
| Provenance returned                                    | Yes      |
| Graph-RAG integrates safely with AI                    | Yes      |
| Graph does not store PII                               | Yes      |

---

## 25. Kết luận

Document 17 — Knowledge Graph, Neo4j Sync & Graph-RAG Design đã đặc tả graph architecture chính thức cho **PharmaAssist AI Intelligence**.

Tài liệu này đã xác định:

1. Graph scope.
2. Trách nhiệm PostgreSQL vs Neo4j.
3. Core graph MVP model:

   * Medicine.
   * ActiveIngredient.
   * CONTAINS.
   * INTERACTS_WITH.
4. Các graph concepts bị loại khỏi MVP:

   * DrugGroup nếu chưa có taxonomy.
   * Symptom.
   * Condition.
   * RedFlag.
   * Recommendation node.
   * riskScore.
5. Neo4j node design.
6. Neo4j relationship design.
7. Canonical direction cho `INTERACTS_WITH`.
8. Symmetric query behavior.
9. Relationship properties.
10. Graph projection source mapping.
11. Graph Sync architecture:

* Outbox.
* Worker.
* Retry.
* Attempts/logs.
* Audit.
* Failure handling.

12. Freshness detection:

* Source version.
* Outbox state.
* Pending/failed jobs.

13. Stale graph behavior.
14. Graph-RAG architecture.
15. Graph-RAG query templates.
16. Provenance/freshness metadata.
17. PostgreSQL fallback cho interaction explanation.
18. Safe error cho pure graph queries.
19. Security restrictions:

* No raw Cypher for Staff.
* Allowlisted query templates.
* Limits/timeouts.

20. MVP/Should-have/Future graph scope.
21. Graph test requirements.
22. Traceability to SRS/API/AI/Data/Testing.
23. Graph quality checklist.

Các baseline quan trọng được giữ đúng:

1. PostgreSQL là source of truth.
2. Neo4j là graph projection.
3. Graph Sync là MVP.
4. Graph Sync phải có outbox/worker/retry/attempts/freshness.
5. Graph-RAG là module riêng.
6. Official interaction rule ở cấp ActiveIngredient–ActiveIngredient.
7. Medicine-level interaction chỉ là derived path, không phải authoritative edge.
8. Không dùng DrugGroup nếu chưa có taxonomy.
9. Không đưa Symptom/Condition/RedFlag vào MVP.
10. Không dùng riskScore ảnh hưởng checkout/severity.
11. Stale graph không được dùng âm thầm.
12. Nếu Neo4j unavailable/stale, interaction explanation fallback sang PostgreSQL khi có thể.
13. Pure graph query không có fallback phải trả safe error.
14. Không expose raw Cypher cho Staff.
15. Graph không lưu PII.
16. Graph không quyết định checkout.
17. AI không được hallucinate graph facts.

Document 17 là input trực tiếp cho:

1. Graph Sync Worker implementation.
2. Neo4j projection implementation.
3. Graph-RAG backend.
4. Graph Explorer UI.
5. AI integration with graph context.
6. Demo graph rebuild.
7. Graph tests.
8. Document 18 — Data Seeding & Demo Data Guide.
9. Document 20 — Testing, Demo & Setup Guide.

Bước tiếp theo hợp lý là viết **Document 18 — Data Seeding & Demo Data Guide**, vì graph projection, AI, database và UI đã đủ rõ để thiết kế curated operational seed, demo reset workflow, FEFO scenario, HIGH interaction scenario và graph rebuild/smoke checks.
