# 4C_Task_List_MVP_AI_Graph_Report_Demo_291_435.md

# Danh sách Task phần 3/4 cho PharmaAssist AI Intelligence

Tài liệu này là phần thứ ba trong bộ **4 nhóm Task List** của dự án **PharmaAssist AI Intelligence**.

Phạm vi tài liệu này:

```text
PAC-TASK-291 → PAC-TASK-435
```

Nội dung chính:

1. AI Copilot.
2. Google AI Provider.
3. MockAI fallback.
4. AI Guardrail.
5. AI Audit Log.
6. Prompt template versioning.
7. Graph Sync Outbox.
8. Neo4j Projection.
9. Graph freshness detection.
10. Graph-RAG.
11. PostgreSQL fallback.
12. Reports.
13. System Settings.
14. Demo Data.
15. Demo Reset.

Các Task trong tài liệu này thuộc **MVP / Core** và tập trung vào phần kỹ thuật nổi bật của dự án: **AI safety, Graph Sync, Neo4j, Graph-RAG, deterministic reports và demo reset**.

---

## Quy ước chung khi tạo Task trên Jira

| **Field trên Jira**       | **Giá trị chung**                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Work type                 | Task                                                                                                                     |
| Status                    | To Do                                                                                                                    |
| Parent / Linked work item | Gắn với Story tương ứng, ví dụ `US-99`                                                                                   |
| Parent Epic               | Gắn với Epic tương ứng, ví dụ `PAC-EPIC-12`                                                                              |
| Assignee                  | Automatic hoặc chọn thành viên nhóm                                                                                      |
| Fix versions              | Để trống                                                                                                                 |
| Team                      | Để trống hoặc chọn team nếu nhóm đã tạo                                                                                  |
| Sprint                    | Gắn theo Sprint trong bảng                                                                                               |
| Summary                   | Có mã Task ở đầu, ví dụ `PAC-TASK-291 - Define AI provider abstraction`                                                  |
| Component                 | Dùng Component chính thức trong `1_Components.md`                                                                        |
| Labels                    | Theo module, ví dụ `ai-copilot`, `ai-guardrail`, `ai-audit`, `graph-sync`, `neo4j`, `graph-rag`, `reports`, `demo-reset` |
| Scope                     | MVP / Core                                                                                                               |

---

# Danh sách 145 Task phần 3/4

| **Task Key** | **Summary**                                                                          | **Linked Story** | **Parent Epic** | **Component**             | **Priority** | **Sprint** | **Assignee** |
| ------------ | ------------------------------------------------------------------------------------ | ---------------- | --------------- | ------------------------- | ------------ | ---------- | ------------ |
| PAC-TASK-291 | PAC-TASK-291 - Define AI provider abstraction                                        | US-103           | PAC-EPIC-12     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-292 | PAC-TASK-292 - Configure backend AI provider/model settings loader                   | US-142           | PAC-EPIC-17     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-293 | PAC-TASK-293 - Implement Google AI provider adapter                                  | US-103           | PAC-EPIC-12     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-294 | PAC-TASK-294 - Add Google AI timeout and retry-safe error handling                   | US-103           | PAC-EPIC-12     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-295 | PAC-TASK-295 - Implement MockAI fallback adapter                                     | US-104           | PAC-EPIC-12     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-296 | PAC-TASK-296 - Implement fallback provider selection logic                           | US-104           | PAC-EPIC-12     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-297 | PAC-TASK-297 - Add provider_requested and provider_used tracking                     | US-114           | PAC-EPIC-13     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-298 | PAC-TASK-298 - Implement AI interaction explanation API                              | US-99            | PAC-EPIC-12     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-299 | PAC-TASK-299 - Build AI explanation panel in InteractionAlert UI                     | US-99            | PAC-EPIC-12     | AI Guardrail & Audit      | Medium       | Sprint 7   | Automatic    |
| PAC-TASK-300 | PAC-TASK-300 - Add AI disclaimer to explanation panel                                | US-113           | PAC-EPIC-13     | AI Guardrail & Audit      | Medium       | Sprint 7   | Automatic    |
| PAC-TASK-301 | PAC-TASK-301 - Build AI explanation loading, error and fallback states               | US-99            | PAC-EPIC-12     | AI Guardrail & Audit      | Medium       | Sprint 7   | Automatic    |
| PAC-TASK-302 | PAC-TASK-302 - Implement AI consultation note draft API                              | US-100           | PAC-EPIC-12     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-303 | PAC-TASK-303 - Build AI consultation note draft panel                                | US-100           | PAC-EPIC-12     | AI Guardrail & Audit      | Medium       | Sprint 7   | Automatic    |
| PAC-TASK-304 | PAC-TASK-304 - Build Staff edit AI draft before confirm UI                           | US-101           | PAC-EPIC-12     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-305 | PAC-TASK-305 - Implement Staff confirm AI draft as official consultation note        | US-101           | PAC-EPIC-12     | AI Guardrail & Audit      | Highest      | Sprint 7   | Automatic    |
| PAC-TASK-306 | PAC-TASK-306 - Prevent unconfirmed AI draft from saving official note                | US-101           | PAC-EPIC-12     | AI Guardrail & Audit      | Highest      | Sprint 7   | Automatic    |
| PAC-TASK-307 | PAC-TASK-307 - Link confirmed AI note to correct HIGH InteractionAlert               | US-101           | PAC-EPIC-12     | AI Guardrail & Audit      | Highest      | Sprint 7   | Automatic    |
| PAC-TASK-308 | PAC-TASK-308 - Implement safe follow-up question API                                 | US-102           | PAC-EPIC-12     | AI Guardrail & Audit      | Medium       | Sprint 7   | Automatic    |
| PAC-TASK-309 | PAC-TASK-309 - Build safe follow-up question UI field                                | US-102           | PAC-EPIC-12     | AI Guardrail & Audit      | Medium       | Sprint 7   | Automatic    |
| PAC-TASK-310 | PAC-TASK-310 - Block medical-record style storage for symptom/context input          | US-102           | PAC-EPIC-12     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-311 | PAC-TASK-311 - Add AI Copilot permission checks                                      | US-99            | PAC-EPIC-12     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-312 | PAC-TASK-312 - Add AI Copilot frontend route and action guards                       | US-99            | PAC-EPIC-12     | AI Guardrail & Audit      | Medium       | Sprint 7   | Automatic    |
| PAC-TASK-313 | PAC-TASK-313 - Add AI provider unit tests                                            | US-103           | PAC-EPIC-19     | Testing & Setup           | High         | Sprint 7   | Automatic    |
| PAC-TASK-314 | PAC-TASK-314 - Add MockAI fallback tests                                             | US-104           | PAC-EPIC-19     | Testing & Setup           | High         | Sprint 7   | Automatic    |
| PAC-TASK-315 | PAC-TASK-315 - Add AI Copilot integration smoke checklist                            | US-99            | PAC-EPIC-19     | Testing & Setup           | Medium       | Sprint 7   | Automatic    |
| PAC-TASK-316 | PAC-TASK-316 - Define unsafe AI request categories                                   | US-105           | PAC-EPIC-13     | AI Guardrail & Audit      | Highest      | Sprint 7   | Automatic    |
| PAC-TASK-317 | PAC-TASK-317 - Implement AI input guardrail service                                  | US-105           | PAC-EPIC-13     | AI Guardrail & Audit      | Highest      | Sprint 7   | Automatic    |
| PAC-TASK-318 | PAC-TASK-318 - Block diagnosis requests                                              | US-106           | PAC-EPIC-13     | AI Guardrail & Audit      | Highest      | Sprint 7   | Automatic    |
| PAC-TASK-319 | PAC-TASK-319 - Block prescribing requests                                            | US-107           | PAC-EPIC-13     | AI Guardrail & Audit      | Highest      | Sprint 7   | Automatic    |
| PAC-TASK-320 | PAC-TASK-320 - Block dosage advice requests                                          | US-108           | PAC-EPIC-13     | AI Guardrail & Audit      | Highest      | Sprint 7   | Automatic    |
| PAC-TASK-321 | PAC-TASK-321 - Add safe response templates for blocked AI input                      | US-112           | PAC-EPIC-13     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-322 | PAC-TASK-322 - Add PII minimization before AI provider call                          | US-111           | PAC-EPIC-13     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-323 | PAC-TASK-323 - Redact customer/order unnecessary personal data before AI call        | US-111           | PAC-EPIC-13     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-324 | PAC-TASK-324 - Implement AI output guardrail service                                 | US-109           | PAC-EPIC-13     | AI Guardrail & Audit      | Highest      | Sprint 7   | Automatic    |
| PAC-TASK-325 | PAC-TASK-325 - Block unsafe AI output before rendering                               | US-109           | PAC-EPIC-13     | AI Guardrail & Audit      | Highest      | Sprint 7   | Automatic    |
| PAC-TASK-326 | PAC-TASK-326 - Implement structured output schema validation                         | US-110           | PAC-EPIC-13     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-327 | PAC-TASK-327 - Add output schema retry or safe fallback handling                     | US-110           | PAC-EPIC-13     | AI Guardrail & Audit      | Medium       | Sprint 7   | Automatic    |
| PAC-TASK-328 | PAC-TASK-328 - Add guardrail status object to AI response                            | US-105           | PAC-EPIC-13     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-329 | PAC-TASK-329 - Create ai_audit_logs Prisma model                                     | US-114           | PAC-EPIC-13     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-330 | PAC-TASK-330 - Implement AI audit log write service                                  | US-114           | PAC-EPIC-13     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-331 | PAC-TASK-331 - Persist AI provider, model and prompt metadata                        | US-114           | PAC-EPIC-13     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-332 | PAC-TASK-332 - Persist input and output guardrail statuses                           | US-114           | PAC-EPIC-13     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-333 | PAC-TASK-333 - Persist AI latency, request id and fallback metadata                  | US-114           | PAC-EPIC-13     | AI Guardrail & Audit      | Medium       | Sprint 7   | Automatic    |
| PAC-TASK-334 | PAC-TASK-334 - Ensure AI Audit does not store raw PII                                | US-111           | PAC-EPIC-13     | AI Guardrail & Audit      | Highest      | Sprint 7   | Automatic    |
| PAC-TASK-335 | PAC-TASK-335 - Build Admin AI Audit Log list API                                     | US-116           | PAC-EPIC-13     | AI Guardrail & Audit      | Medium       | Sprint 7   | Automatic    |
| PAC-TASK-336 | PAC-TASK-336 - Build Admin AI Audit Log UI                                           | US-116           | PAC-EPIC-13     | AI Guardrail & Audit      | Medium       | Sprint 7   | Automatic    |
| PAC-TASK-337 | PAC-TASK-337 - Add AI Audit filters by provider, status and date                     | US-116           | PAC-EPIC-13     | AI Guardrail & Audit      | Low          | Sprint 7   | Automatic    |
| PAC-TASK-338 | PAC-TASK-338 - Create prompt_templates Prisma model                                  | US-115           | PAC-EPIC-13     | AI Guardrail & Audit      | Medium       | Sprint 7   | Automatic    |
| PAC-TASK-339 | PAC-TASK-339 - Seed official AI prompt templates with versions                       | US-143           | PAC-EPIC-17     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-340 | PAC-TASK-340 - Load approved prompt template by use case                             | US-115           | PAC-EPIC-13     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-341 | PAC-TASK-341 - Record prompt version in AI audit                                     | US-115           | PAC-EPIC-13     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-342 | PAC-TASK-342 - Add backend AI provider/model config validation                       | US-142           | PAC-EPIC-17     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-343 | PAC-TASK-343 - Add environment/database config fallback order for AI settings        | US-142           | PAC-EPIC-17     | AI Guardrail & Audit      | Medium       | Sprint 7   | Automatic    |
| PAC-TASK-344 | PAC-TASK-344 - Add timeout, circuit breaker and rate-limit guard for AI calls        | US-103           | PAC-EPIC-12     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-345 | PAC-TASK-345 - Add AI safe error response helper                                     | US-112           | PAC-EPIC-13     | AI Guardrail & Audit      | High         | Sprint 7   | Automatic    |
| PAC-TASK-346 | PAC-TASK-346 - Add AI input guardrail unit tests                                     | US-105           | PAC-EPIC-19     | Testing & Setup           | Highest      | Sprint 7   | Automatic    |
| PAC-TASK-347 | PAC-TASK-347 - Add diagnosis block tests                                             | US-106           | PAC-EPIC-19     | Testing & Setup           | Highest      | Sprint 7   | Automatic    |
| PAC-TASK-348 | PAC-TASK-348 - Add prescribing block tests                                           | US-107           | PAC-EPIC-19     | Testing & Setup           | Highest      | Sprint 7   | Automatic    |
| PAC-TASK-349 | PAC-TASK-349 - Add dosage advice block tests                                         | US-108           | PAC-EPIC-19     | Testing & Setup           | Highest      | Sprint 7   | Automatic    |
| PAC-TASK-350 | PAC-TASK-350 - Add AI output guardrail tests                                         | US-109           | PAC-EPIC-19     | Testing & Setup           | Highest      | Sprint 7   | Automatic    |
| PAC-TASK-351 | PAC-TASK-351 - Add structured output validation tests                                | US-110           | PAC-EPIC-19     | Testing & Setup           | High         | Sprint 7   | Automatic    |
| PAC-TASK-352 | PAC-TASK-352 - Add PII minimization tests                                            | US-111           | PAC-EPIC-19     | Testing & Setup           | High         | Sprint 7   | Automatic    |
| PAC-TASK-353 | PAC-TASK-353 - Add AI audit integration tests                                        | US-114           | PAC-EPIC-19     | Testing & Setup           | High         | Sprint 7   | Automatic    |
| PAC-TASK-354 | PAC-TASK-354 - Add prompt versioning tests                                           | US-115           | PAC-EPIC-19     | Testing & Setup           | Medium       | Sprint 7   | Automatic    |
| PAC-TASK-355 | PAC-TASK-355 - Add AI safety traceability notes                                      | US-105           | PAC-EPIC-21     | Documentation             | Medium       | Sprint 7   | Automatic    |
| PAC-TASK-356 | PAC-TASK-356 - Create graph_sync_outbox Prisma model                                 | US-117           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | Highest      | Sprint 8   | Automatic    |
| PAC-TASK-357 | PAC-TASK-357 - Add graph sync job status enum                                        | US-117           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | High         | Sprint 8   | Automatic    |
| PAC-TASK-358 | PAC-TASK-358 - Emit outbox event from Medicine changes                               | US-117           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | High         | Sprint 8   | Automatic    |
| PAC-TASK-359 | PAC-TASK-359 - Emit outbox event from ActiveIngredient changes                       | US-117           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | High         | Sprint 8   | Automatic    |
| PAC-TASK-360 | PAC-TASK-360 - Emit outbox event from Medicine-Ingredient mapping changes            | US-117           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | High         | Sprint 8   | Automatic    |
| PAC-TASK-361 | PAC-TASK-361 - Emit outbox event from DrugInteractionRule changes                    | US-117           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | High         | Sprint 8   | Automatic    |
| PAC-TASK-362 | PAC-TASK-362 - Implement Graph Sync worker loop                                      | US-118           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | Highest      | Sprint 8   | Automatic    |
| PAC-TASK-363 | PAC-TASK-363 - Configure Neo4j connection service                                    | US-118           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | High         | Sprint 8   | Automatic    |
| PAC-TASK-364 | PAC-TASK-364 - Add Neo4j health check                                                | US-118           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | Medium       | Sprint 8   | Automatic    |
| PAC-TASK-365 | PAC-TASK-365 - Implement idempotent graph job claiming                               | US-118           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | High         | Sprint 8   | Automatic    |
| PAC-TASK-366 | PAC-TASK-366 - Upsert Medicine node to Neo4j                                         | US-119           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | High         | Sprint 8   | Automatic    |
| PAC-TASK-367 | PAC-TASK-367 - Upsert ActiveIngredient node to Neo4j                                 | US-120           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | High         | Sprint 8   | Automatic    |
| PAC-TASK-368 | PAC-TASK-368 - Upsert CONTAINS relationship                                          | US-121           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | High         | Sprint 8   | Automatic    |
| PAC-TASK-369 | PAC-TASK-369 - Upsert INTERACTS_WITH relationship                                    | US-122           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | Highest      | Sprint 8   | Automatic    |
| PAC-TASK-370 | PAC-TASK-370 - Implement canonical directed interaction edge logic                   | US-123           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | High         | Sprint 8   | Automatic    |
| PAC-TASK-371 | PAC-TASK-371 - Store rule properties on INTERACTS_WITH relationship                  | US-122           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | High         | Sprint 8   | Automatic    |
| PAC-TASK-372 | PAC-TASK-372 - Store sourceVersion, sourceUpdatedAt and syncedAt metadata            | US-124           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | High         | Sprint 8   | Automatic    |
| PAC-TASK-373 | PAC-TASK-373 - Mark deactivated Medicine and ActiveIngredient as isActive=false      | US-128           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | Medium       | Sprint 8   | Automatic    |
| PAC-TASK-374 | PAC-TASK-374 - Mark deactivated interaction rule edge as isActive=false              | US-128           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | Medium       | Sprint 8   | Automatic    |
| PAC-TASK-375 | PAC-TASK-375 - Filter normal Neo4j queries to active data only                       | US-128           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | Medium       | Sprint 8   | Automatic    |
| PAC-TASK-376 | PAC-TASK-376 - Implement retry logic for failed graph sync jobs                      | US-125           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | High         | Sprint 8   | Automatic    |
| PAC-TASK-377 | PAC-TASK-377 - Add max retry and failed status handling                              | US-125           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | High         | Sprint 8   | Automatic    |
| PAC-TASK-378 | PAC-TASK-378 - Log graph sync failure details                                        | US-126           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | High         | Sprint 8   | Automatic    |
| PAC-TASK-379 | PAC-TASK-379 - Write audit log for graph sync failures                               | US-126           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | Medium       | Sprint 8   | Automatic    |
| PAC-TASK-380 | PAC-TASK-380 - Implement graph projection source version tracking                    | US-124           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | High         | Sprint 8   | Automatic    |
| PAC-TASK-381 | PAC-TASK-381 - Implement graph freshness detection service                           | US-127           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | Highest      | Sprint 8   | Automatic    |
| PAC-TASK-382 | PAC-TASK-382 - Detect stale graph from pending outbox job                            | US-127           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | Highest      | Sprint 8   | Automatic    |
| PAC-TASK-383 | PAC-TASK-383 - Detect stale graph from failed relevant outbox job                    | US-127           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | Highest      | Sprint 8   | Automatic    |
| PAC-TASK-384 | PAC-TASK-384 - Detect stale graph from missing sourceVersion projection              | US-127           | PAC-EPIC-14     | Graph Sync & Graph-RAG    | Highest      | Sprint 8   | Automatic    |
| PAC-TASK-385 | PAC-TASK-385 - Add Graph Sync worker unit tests                                      | US-118           | PAC-EPIC-19     | Testing & Setup           | High         | Sprint 8   | Automatic    |
| PAC-TASK-386 | PAC-TASK-386 - Add Neo4j projection integration tests                                | US-119           | PAC-EPIC-19     | Testing & Setup           | High         | Sprint 8   | Automatic    |
| PAC-TASK-387 | PAC-TASK-387 - Add INTERACTS_WITH projection tests                                   | US-122           | PAC-EPIC-19     | Testing & Setup           | High         | Sprint 8   | Automatic    |
| PAC-TASK-388 | PAC-TASK-388 - Add graph freshness detection tests                                   | US-127           | PAC-EPIC-19     | Testing & Setup           | Highest      | Sprint 8   | Automatic    |
| PAC-TASK-389 | PAC-TASK-389 - Add graph sync retry and failure tests                                | US-125           | PAC-EPIC-19     | Testing & Setup           | High         | Sprint 8   | Automatic    |
| PAC-TASK-390 | PAC-TASK-390 - Add Graph Sync traceability notes                                     | US-117           | PAC-EPIC-21     | Documentation             | Medium       | Sprint 8   | Automatic    |
| PAC-TASK-391 | PAC-TASK-391 - Implement Graph-RAG interaction explanation service                   | US-129           | PAC-EPIC-15     | Graph Sync & Graph-RAG    | High         | Sprint 9   | Automatic    |
| PAC-TASK-392 | PAC-TASK-392 - Build allowlisted graph query templates                               | US-129           | PAC-EPIC-15     | Graph Sync & Graph-RAG    | Highest      | Sprint 9   | Automatic    |
| PAC-TASK-393 | PAC-TASK-393 - Query Medicine-CONTAINS-ActiveIngredient context                      | US-129           | PAC-EPIC-15     | Graph Sync & Graph-RAG    | High         | Sprint 9   | Automatic    |
| PAC-TASK-394 | PAC-TASK-394 - Query ActiveIngredient INTERACTS_WITH context                         | US-129           | PAC-EPIC-15     | Graph Sync & Graph-RAG    | High         | Sprint 9   | Automatic    |
| PAC-TASK-395 | PAC-TASK-395 - Add Graph-RAG context builder for AI Copilot                          | US-129           | PAC-EPIC-15     | Graph Sync & Graph-RAG    | High         | Sprint 9   | Automatic    |
| PAC-TASK-396 | PAC-TASK-396 - Return Graph-RAG provenance metadata                                  | US-130           | PAC-EPIC-15     | Graph Sync & Graph-RAG    | High         | Sprint 9   | Automatic    |
| PAC-TASK-397 | PAC-TASK-397 - Return graphUsed flag in Graph-RAG response                           | US-130           | PAC-EPIC-15     | Graph Sync & Graph-RAG    | High         | Sprint 9   | Automatic    |
| PAC-TASK-398 | PAC-TASK-398 - Return Graph-RAG freshness metadata                                   | US-131           | PAC-EPIC-15     | Graph Sync & Graph-RAG    | Highest      | Sprint 9   | Automatic    |
| PAC-TASK-399 | PAC-TASK-399 - Add freshness warning to Graph-RAG response                           | US-131           | PAC-EPIC-15     | Graph Sync & Graph-RAG    | Highest      | Sprint 9   | Automatic    |
| PAC-TASK-400 | PAC-TASK-400 - Implement PostgreSQL fallback when Neo4j unavailable                  | US-132           | PAC-EPIC-15     | Graph Sync & Graph-RAG    | Highest      | Sprint 9   | Automatic    |
| PAC-TASK-401 | PAC-TASK-401 - Implement PostgreSQL fallback when graph stale                        | US-133           | PAC-EPIC-15     | Graph Sync & Graph-RAG    | Highest      | Sprint 9   | Automatic    |
| PAC-TASK-402 | PAC-TASK-402 - Implement safe error for graph-only query without fallback            | US-134           | PAC-EPIC-15     | Graph Sync & Graph-RAG    | High         | Sprint 9   | Automatic    |
| PAC-TASK-403 | PAC-TASK-403 - Ensure Staff cannot submit raw Cypher                                 | US-135           | PAC-EPIC-15     | Graph Sync & Graph-RAG    | Highest      | Sprint 9   | Automatic    |
| PAC-TASK-404 | PAC-TASK-404 - Add backend guard against raw Cypher APIs for Staff                   | US-135           | PAC-EPIC-15     | Graph Sync & Graph-RAG    | Highest      | Sprint 9   | Automatic    |
| PAC-TASK-405 | PAC-TASK-405 - Ensure Graph-RAG does not decide checkout                             | US-136           | PAC-EPIC-15     | Graph Sync & Graph-RAG    | Highest      | Sprint 9   | Automatic    |
| PAC-TASK-406 | PAC-TASK-406 - Build Graph-RAG explanation UI metadata display                       | US-129           | PAC-EPIC-15     | Graph Sync & Graph-RAG    | Medium       | Sprint 9   | Automatic    |
| PAC-TASK-407 | PAC-TASK-407 - Add Graph-RAG PostgreSQL fallback tests                               | US-132           | PAC-EPIC-19     | Testing & Setup           | Highest      | Sprint 9   | Automatic    |
| PAC-TASK-408 | PAC-TASK-408 - Add stale graph fallback tests                                        | US-133           | PAC-EPIC-19     | Testing & Setup           | Highest      | Sprint 9   | Automatic    |
| PAC-TASK-409 | PAC-TASK-409 - Add raw Cypher no-access tests                                        | US-135           | PAC-EPIC-19     | Testing & Setup           | Highest      | Sprint 9   | Automatic    |
| PAC-TASK-410 | PAC-TASK-410 - Add graph-not-checkout guard tests                                    | US-136           | PAC-EPIC-19     | Testing & Setup           | Highest      | Sprint 9   | Automatic    |
| PAC-TASK-411 | PAC-TASK-411 - Implement Revenue Report API                                          | US-137           | PAC-EPIC-16     | Reports                   | Medium       | Sprint 9   | Automatic    |
| PAC-TASK-412 | PAC-TASK-412 - Build Revenue Report UI                                               | US-137           | PAC-EPIC-16     | Reports                   | Medium       | Sprint 9   | Automatic    |
| PAC-TASK-413 | PAC-TASK-413 - Add revenue report filters by date and status                         | US-140           | PAC-EPIC-16     | Reports                   | Low          | Sprint 9   | Automatic    |
| PAC-TASK-414 | PAC-TASK-414 - Implement Top Medicines Report API                                    | US-138           | PAC-EPIC-16     | Reports                   | Medium       | Sprint 9   | Automatic    |
| PAC-TASK-415 | PAC-TASK-415 - Build Top Medicines Report UI                                         | US-138           | PAC-EPIC-16     | Reports                   | Medium       | Sprint 9   | Automatic    |
| PAC-TASK-416 | PAC-TASK-416 - Implement Inventory Report API from MedicineBatch                     | US-139           | PAC-EPIC-16     | Reports                   | Medium       | Sprint 9   | Automatic    |
| PAC-TASK-417 | PAC-TASK-417 - Build Inventory Report UI                                             | US-139           | PAC-EPIC-16     | Reports                   | Medium       | Sprint 9   | Automatic    |
| PAC-TASK-418 | PAC-TASK-418 - Add report empty, loading and error states                            | US-140           | PAC-EPIC-16     | Reports                   | Low          | Sprint 9   | Automatic    |
| PAC-TASK-419 | PAC-TASK-419 - Add report permission checks                                          | US-137           | PAC-EPIC-16     | Reports                   | Medium       | Sprint 9   | Automatic    |
| PAC-TASK-420 | PAC-TASK-420 - Create system_settings Prisma model                                   | US-141           | PAC-EPIC-17     | Inventory & MedicineBatch | High         | Sprint 9   | Automatic    |
| PAC-TASK-421 | PAC-TASK-421 - Seed default near-expiry threshold as 90 days                         | US-141           | PAC-EPIC-17     | Inventory & MedicineBatch | High         | Sprint 9   | Automatic    |
| PAC-TASK-422 | PAC-TASK-422 - Implement near-expiry threshold settings API                          | US-141           | PAC-EPIC-17     | Inventory & MedicineBatch | High         | Sprint 9   | Automatic    |
| PAC-TASK-423 | PAC-TASK-423 - Build minimal System Settings UI for near-expiry threshold            | US-144           | PAC-EPIC-17     | Inventory & MedicineBatch | Medium       | Sprint 9   | Automatic    |
| PAC-TASK-424 | PAC-TASK-424 - Add system settings validation and tests                              | US-141           | PAC-EPIC-19     | Testing & Setup           | Medium       | Sprint 9   | Automatic    |
| PAC-TASK-425 | PAC-TASK-425 - Create curated MVP seed dataset                                       | US-145           | PAC-EPIC-18     | Data & Demo               | High         | Sprint 10  | Automatic    |
| PAC-TASK-426 | PAC-TASK-426 - Seed demo users by role                                               | US-146           | PAC-EPIC-18     | Data & Demo               | High         | Sprint 10  | Automatic    |
| PAC-TASK-427 | PAC-TASK-427 - Seed first-login demo account                                         | US-146           | PAC-EPIC-18     | Data & Demo               | Medium       | Sprint 10  | Automatic    |
| PAC-TASK-428 | PAC-TASK-428 - Generate dynamic expiry dates for demo batches                        | US-147           | PAC-EPIC-18     | Data & Demo               | High         | Sprint 10  | Automatic    |
| PAC-TASK-429 | PAC-TASK-429 - Seed FEFO multi-batch demo scenario                                   | US-148           | PAC-EPIC-18     | Data & Demo               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-430 | PAC-TASK-430 - Seed expired batch excluded from sellable stock                       | US-148           | PAC-EPIC-18     | Data & Demo               | High         | Sprint 10  | Automatic    |
| PAC-TASK-431 | PAC-TASK-431 - Seed PAID order with handled HIGH alert                               | US-149           | PAC-EPIC-18     | Data & Demo               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-432 | PAC-TASK-432 - Seed report data with PAID, DRAFT, CANCELLED and failed-payment cases | US-145           | PAC-EPIC-18     | Data & Demo               | High         | Sprint 10  | Automatic    |
| PAC-TASK-433 | PAC-TASK-433 - Implement demo:reset local-only environment guard                     | US-150           | PAC-EPIC-18     | Data & Demo               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-434 | PAC-TASK-434 - Rebuild Neo4j projection during demo reset                            | US-150           | PAC-EPIC-18     | Data & Demo               | High         | Sprint 10  | Automatic    |
| PAC-TASK-435 | PAC-TASK-435 - Run smoke tests after demo reset                                      | US-150           | PAC-EPIC-18     | Data & Demo               | Highest      | Sprint 10  | Automatic    |

---

# Out-of-scope guard cho tài liệu 4C

Không tạo hoặc implement Task trong phần này cho các nội dung sau:

```text
MockAI-only MVP
Google AI bị xem là optional
AI không có guardrail
AI không có audit log
AI tự động lưu draft thành official consultation note khi Staff chưa confirm
AI chẩn đoán bệnh
AI kê đơn thuốc
AI đưa liều dùng cụ thể
Lưu raw PII trong AI Audit
Prompt không có version
Provider/model config hard-code toàn bộ trong frontend
Neo4j làm source of truth
Graph Sync thủ công bằng Cypher seed là flow chính thức
Graph không có outbox/retry/failure logging
Medicine–Medicine interaction edge làm authoritative rule trong Neo4j
DrugGroup tự suy từ MedicineCategory
riskScore ảnh hưởng checkout hoặc severity
Stale graph được dùng âm thầm
Graph-RAG không có provenance
Graph-RAG không có freshness metadata
Graph-RAG không fallback PostgreSQL khi Neo4j unavailable/stale
Staff submit raw Cypher
Graph quyết định checkout
AI tự tính doanh thu thay deterministic report
Demo reset chạy ở staging/production
Demo data dùng raw catalog data chưa curated làm operational seed
```

---

# Bảng tóm tắt Task theo Sprint trong tài liệu 4C

| **Sprint** |              **Task range** | **Số Task** | **Nội dung chính**                                                               |
| ---------- | --------------------------: | ----------: | -------------------------------------------------------------------------------- |
| Sprint 7   | PAC-TASK-291 → PAC-TASK-355 |          65 | AI Copilot, Google AI, MockAI, AI Guardrail, AI Audit, Prompt Versioning         |
| Sprint 8   | PAC-TASK-356 → PAC-TASK-390 |          35 | Graph Sync Outbox, Neo4j Projection, Retry, Failure Logging, Freshness Detection |
| Sprint 9   | PAC-TASK-391 → PAC-TASK-424 |          34 | Graph-RAG, PostgreSQL Fallback, Reports, System Settings                         |
| Sprint 10  | PAC-TASK-425 → PAC-TASK-435 |          11 | Demo Data, Demo Reset, Graph Rebuild, Smoke Tests                                |
| **Tổng**   | PAC-TASK-291 → PAC-TASK-435 |     **145** | MVP AI, Graph, Reports và Demo                                                   |

Thông tin cảnh báo tương tác thuốc và nội dung AI trong hệ thống chỉ mang tính hỗ trợ tham khảo cho đồ án, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.
