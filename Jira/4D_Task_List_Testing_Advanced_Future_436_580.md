# 4D_Task_List_Testing_Advanced_Future_436_580.md

# Danh sách Task phần 4/4 cho PharmaAssist AI Intelligence

Tài liệu này là phần thứ tư trong bộ **4 nhóm Task List** của dự án **PharmaAssist AI Intelligence**.

Phạm vi tài liệu này:

```text
PAC-TASK-436 → PAC-TASK-580
```

Nội dung chính:

1. Automated testing.
2. High-risk module testing.
3. Manual smoke testing.
4. DevOps / CI quality gates.
5. Local setup.
6. Environment configuration.
7. Documentation.
8. Demo readiness.
9. Release freeze checklist.
10. Should-have / Advanced backlog.
11. Future / Commercial Expansion backlog.
12. Out-of-scope guardrails.

Các Task trong tài liệu này bao gồm:

* Task bắt buộc để hoàn thiện MVP testing, setup, demo và release readiness.
* Task Should-have / Advanced không chặn MVP.
* Task Future / Commercial Expansion chỉ dùng để ghi backlog, không implement trong MVP.

---

## Quy ước chung khi tạo Task trên Jira

| **Field trên Jira**       | **Giá trị chung**                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| Work type                 | Task                                                                                          |
| Status                    | To Do                                                                                         |
| Parent / Linked work item | Gắn với Story tương ứng, ví dụ `US-150`, `US-151`, `US-161`                                   |
| Parent Epic               | Gắn với Epic tương ứng, ví dụ `PAC-EPIC-19`, `PAC-EPIC-22`, `PAC-EPIC-31`                     |
| Assignee                  | Automatic hoặc chọn thành viên nhóm                                                           |
| Fix versions              | Để trống                                                                                      |
| Team                      | Để trống hoặc chọn team nếu nhóm đã tạo                                                       |
| Sprint                    | Gắn theo Sprint trong bảng                                                                    |
| Summary                   | Có mã Task ở đầu, ví dụ `PAC-TASK-436 - Add backend unit test setup`                          |
| Component                 | Dùng Component chính thức trong `1_Components.md`                                             |
| Labels                    | Theo module, ví dụ `testing`, `ci`, `setup`, `release`, `documentation`, `advanced`, `future` |
| Scope                     | MVP / Should-have / Future                                                                    |

---

# Danh sách 145 Task phần 4/4

| **Task Key** | **Summary**                                                                    | **Linked Story** | **Parent Epic** | **Component**                 | **Priority** | **Sprint** | **Assignee** |
| ------------ | ------------------------------------------------------------------------------ | ---------------- | --------------- | ----------------------------- | ------------ | ---------- | ------------ |
| PAC-TASK-436 | PAC-TASK-436 - Add backend unit test setup                                     | US-150           | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-437 | PAC-TASK-437 - Add backend integration test setup with isolated cleanup        | US-150           | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-438 | PAC-TASK-438 - Add frontend component test setup                               | US-150           | PAC-EPIC-19     | Testing & Setup               | High         | Sprint 10  | Automatic    |
| PAC-TASK-439 | PAC-TASK-439 - Add Playwright E2E test setup for Chrome desktop                | US-150           | PAC-EPIC-19     | Testing & Setup               | High         | Sprint 10  | Automatic    |
| PAC-TASK-440 | PAC-TASK-440 - Add Postman manual API collection structure                     | US-150           | PAC-EPIC-19     | Testing & Setup               | Medium       | Sprint 10  | Automatic    |
| PAC-TASK-441 | PAC-TASK-441 - Add Auth and RBAC test suite                                    | US-01            | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-442 | PAC-TASK-442 - Add User Management permission tests                            | US-10            | PAC-EPIC-19     | Testing & Setup               | High         | Sprint 10  | Automatic    |
| PAC-TASK-443 | PAC-TASK-443 - Add Medicine Management API tests                               | US-13            | PAC-EPIC-19     | Testing & Setup               | High         | Sprint 10  | Automatic    |
| PAC-TASK-444 | PAC-TASK-444 - Add ActiveIngredient mapping tests                              | US-19            | PAC-EPIC-19     | Testing & Setup               | High         | Sprint 10  | Automatic    |
| PAC-TASK-445 | PAC-TASK-445 - Add Supplier Management API tests                               | US-23            | PAC-EPIC-19     | Testing & Setup               | Medium       | Sprint 10  | Automatic    |
| PAC-TASK-446 | PAC-TASK-446 - Add MedicineBatch source-of-truth tests                         | US-27            | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-447 | PAC-TASK-447 - Add sellable quantity and expired batch tests                   | US-32            | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-448 | PAC-TASK-448 - Add near-expiry threshold tests                                 | US-35            | PAC-EPIC-19     | Testing & Setup               | High         | Sprint 10  | Automatic    |
| PAC-TASK-449 | PAC-TASK-449 - Add Stock Import transaction tests                              | US-44            | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-450 | PAC-TASK-450 - Add Stock Import batch merge and expiry mismatch tests          | US-45            | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-451 | PAC-TASK-451 - Add Inventory Adjustment transaction tests                      | US-52            | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-452 | PAC-TASK-452 - Add Inventory Adjustment audit and reason tests                 | US-55            | PAC-EPIC-19     | Testing & Setup               | High         | Sprint 10  | Automatic    |
| PAC-TASK-453 | PAC-TASK-453 - Add POS Draft Order API tests                                   | US-57            | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-454 | PAC-TASK-454 - Add POS Draft Order UI smoke tests                              | US-57            | PAC-EPIC-19     | Testing & Setup               | High         | Sprint 10  | Automatic    |
| PAC-TASK-455 | PAC-TASK-455 - Add Staff order ownership tests                                 | US-65            | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-456 | PAC-TASK-456 - Add Draft Order cancel status tests                             | US-67            | PAC-EPIC-19     | Testing & Setup               | High         | Sprint 10  | Automatic    |
| PAC-TASK-457 | PAC-TASK-457 - Add DrugInteraction Rule API tests                              | US-69            | PAC-EPIC-19     | Testing & Setup               | High         | Sprint 10  | Automatic    |
| PAC-TASK-458 | PAC-TASK-458 - Add ActiveIngredient-derived interaction tests                  | US-72            | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-459 | PAC-TASK-459 - Add InteractionAlert persistence tests                          | US-74            | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-460 | PAC-TASK-460 - Add InteractionAlert display_count tests                        | US-76            | PAC-EPIC-19     | Testing & Setup               | High         | Sprint 10  | Automatic    |
| PAC-TASK-461 | PAC-TASK-461 - Add HIGH alert acknowledgement tests                            | US-78            | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-462 | PAC-TASK-462 - Add HIGH alert consultation note tests                          | US-79            | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-463 | PAC-TASK-463 - Add checkout blocker tests for unresolved HIGH alerts           | US-80            | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-464 | PAC-TASK-464 - Add Checkout transaction success tests                          | US-83            | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-465 | PAC-TASK-465 - Add Checkout rollback failure tests                             | US-92            | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-466 | PAC-TASK-466 - Add FEFO allocation unit tests                                  | US-88            | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-467 | PAC-TASK-467 - Add FEFO multi-batch allocation tests                           | US-88            | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-468 | PAC-TASK-468 - Add Checkout idempotency tests                                  | US-91            | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-469 | PAC-TASK-469 - Add Payment cash handling tests                                 | US-93            | PAC-EPIC-19     | Testing & Setup               | High         | Sprint 10  | Automatic    |
| PAC-TASK-470 | PAC-TASK-470 - Add Payment one SUCCESS rule tests                              | US-96            | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-471 | PAC-TASK-471 - Add Invoice generation tests                                    | US-97            | PAC-EPIC-19     | Testing & Setup               | High         | Sprint 10  | Automatic    |
| PAC-TASK-472 | PAC-TASK-472 - Add AI Guardrail high-risk test suite                           | US-105           | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-473 | PAC-TASK-473 - Add AI Audit privacy tests                                      | US-114           | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-474 | PAC-TASK-474 - Add AI provider fallback tests                                  | US-104           | PAC-EPIC-19     | Testing & Setup               | High         | Sprint 10  | Automatic    |
| PAC-TASK-475 | PAC-TASK-475 - Add Graph Sync outbox and retry tests                           | US-117           | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-476 | PAC-TASK-476 - Add Neo4j projection tests                                      | US-119           | PAC-EPIC-19     | Testing & Setup               | High         | Sprint 10  | Automatic    |
| PAC-TASK-477 | PAC-TASK-477 - Add Graph freshness tests                                       | US-127           | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-478 | PAC-TASK-478 - Add Graph-RAG fallback tests                                    | US-132           | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-479 | PAC-TASK-479 - Add Reports deterministic calculation tests                     | US-137           | PAC-EPIC-19     | Testing & Setup               | High         | Sprint 10  | Automatic    |
| PAC-TASK-480 | PAC-TASK-480 - Add full MVP smoke test checklist                               | US-150           | PAC-EPIC-19     | Testing & Setup               | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-481 | PAC-TASK-481 - Configure local Node.js project setup guide                     | US-150           | PAC-EPIC-20     | DevOps & CI                   | High         | Sprint 10  | Automatic    |
| PAC-TASK-482 | PAC-TASK-482 - Configure frontend environment variables guide                  | US-150           | PAC-EPIC-20     | DevOps & CI                   | High         | Sprint 10  | Automatic    |
| PAC-TASK-483 | PAC-TASK-483 - Configure backend environment variables guide                   | US-150           | PAC-EPIC-20     | DevOps & CI                   | High         | Sprint 10  | Automatic    |
| PAC-TASK-484 | PAC-TASK-484 - Configure Supabase project setup instructions                   | US-150           | PAC-EPIC-20     | DevOps & CI                   | High         | Sprint 10  | Automatic    |
| PAC-TASK-485 | PAC-TASK-485 - Configure Neo4j AuraDB setup instructions                       | US-150           | PAC-EPIC-20     | DevOps & CI                   | High         | Sprint 10  | Automatic    |
| PAC-TASK-486 | PAC-TASK-486 - Configure Google AI API key setup instructions                  | US-142           | PAC-EPIC-20     | DevOps & CI                   | High         | Sprint 10  | Automatic    |
| PAC-TASK-487 | PAC-TASK-487 - Configure MockAI fallback setup instructions                    | US-104           | PAC-EPIC-20     | DevOps & CI                   | Medium       | Sprint 10  | Automatic    |
| PAC-TASK-488 | PAC-TASK-488 - Add Prisma generate and migrate setup command                   | US-150           | PAC-EPIC-20     | DevOps & CI                   | High         | Sprint 10  | Automatic    |
| PAC-TASK-489 | PAC-TASK-489 - Add seed command for curated MVP data                           | US-145           | PAC-EPIC-20     | DevOps & CI                   | High         | Sprint 10  | Automatic    |
| PAC-TASK-490 | PAC-TASK-490 - Add graph projection rebuild command                            | US-150           | PAC-EPIC-20     | DevOps & CI                   | High         | Sprint 10  | Automatic    |
| PAC-TASK-491 | PAC-TASK-491 - Add demo reset command entrypoint                               | US-150           | PAC-EPIC-20     | DevOps & CI                   | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-492 | PAC-TASK-492 - Add demo reset environment safety checks                        | US-150           | PAC-EPIC-20     | DevOps & CI                   | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-493 | PAC-TASK-493 - Configure GitHub Actions lint check                             | US-150           | PAC-EPIC-20     | DevOps & CI                   | High         | Sprint 10  | Automatic    |
| PAC-TASK-494 | PAC-TASK-494 - Configure GitHub Actions type check                             | US-150           | PAC-EPIC-20     | DevOps & CI                   | High         | Sprint 10  | Automatic    |
| PAC-TASK-495 | PAC-TASK-495 - Configure GitHub Actions frontend build                         | US-150           | PAC-EPIC-20     | DevOps & CI                   | High         | Sprint 10  | Automatic    |
| PAC-TASK-496 | PAC-TASK-496 - Configure GitHub Actions backend build                          | US-150           | PAC-EPIC-20     | DevOps & CI                   | High         | Sprint 10  | Automatic    |
| PAC-TASK-497 | PAC-TASK-497 - Configure GitHub Actions unit test check                        | US-150           | PAC-EPIC-20     | DevOps & CI                   | High         | Sprint 10  | Automatic    |
| PAC-TASK-498 | PAC-TASK-498 - Configure GitHub Actions integration test check                 | US-150           | PAC-EPIC-20     | DevOps & CI                   | High         | Sprint 10  | Automatic    |
| PAC-TASK-499 | PAC-TASK-499 - Configure Prisma schema validation check                        | US-150           | PAC-EPIC-20     | DevOps & CI                   | High         | Sprint 10  | Automatic    |
| PAC-TASK-500 | PAC-TASK-500 - Configure Prisma migration check                                | US-150           | PAC-EPIC-20     | DevOps & CI                   | High         | Sprint 10  | Automatic    |
| PAC-TASK-501 | PAC-TASK-501 - Add CI guard to prevent destructive tests against demo database | US-150           | PAC-EPIC-20     | DevOps & CI                   | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-502 | PAC-TASK-502 - Add CI branch protection expectation notes                      | US-150           | PAC-EPIC-20     | DevOps & CI                   | Medium       | Sprint 10  | Automatic    |
| PAC-TASK-503 | PAC-TASK-503 - Add local-only guard for demo:reset script                      | US-150           | PAC-EPIC-20     | DevOps & CI                   | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-504 | PAC-TASK-504 - Add Chrome desktop target verification checklist                | US-150           | PAC-EPIC-20     | DevOps & CI                   | Medium       | Sprint 10  | Automatic    |
| PAC-TASK-505 | PAC-TASK-505 - Add basic responsive verification checklist                     | US-150           | PAC-EPIC-20     | DevOps & CI                   | Low          | Sprint 10  | Automatic    |
| PAC-TASK-506 | PAC-TASK-506 - Write project README setup section                              | US-150           | PAC-EPIC-21     | Documentation                 | High         | Sprint 10  | Automatic    |
| PAC-TASK-507 | PAC-TASK-507 - Write backend setup and run instructions                        | US-150           | PAC-EPIC-21     | Documentation                 | High         | Sprint 10  | Automatic    |
| PAC-TASK-508 | PAC-TASK-508 - Write frontend setup and run instructions                       | US-150           | PAC-EPIC-21     | Documentation                 | High         | Sprint 10  | Automatic    |
| PAC-TASK-509 | PAC-TASK-509 - Write database migration and seed instructions                  | US-150           | PAC-EPIC-21     | Documentation                 | High         | Sprint 10  | Automatic    |
| PAC-TASK-510 | PAC-TASK-510 - Write Supabase Auth setup notes                                 | US-150           | PAC-EPIC-21     | Documentation                 | High         | Sprint 10  | Automatic    |
| PAC-TASK-511 | PAC-TASK-511 - Write Neo4j setup and graph rebuild notes                       | US-150           | PAC-EPIC-21     | Documentation                 | High         | Sprint 10  | Automatic    |
| PAC-TASK-512 | PAC-TASK-512 - Write AI provider and MockAI fallback setup notes               | US-142           | PAC-EPIC-21     | Documentation                 | High         | Sprint 10  | Automatic    |
| PAC-TASK-513 | PAC-TASK-513 - Write demo account guide                                        | US-146           | PAC-EPIC-21     | Documentation                 | Medium       | Sprint 10  | Automatic    |
| PAC-TASK-514 | PAC-TASK-514 - Write demo scenario script for login and role switching         | US-150           | PAC-EPIC-21     | Documentation                 | Medium       | Sprint 10  | Automatic    |
| PAC-TASK-515 | PAC-TASK-515 - Write demo scenario script for Stock Import and MedicineBatch   | US-150           | PAC-EPIC-21     | Documentation                 | High         | Sprint 10  | Automatic    |
| PAC-TASK-516 | PAC-TASK-516 - Write demo scenario script for POS and Checkout                 | US-150           | PAC-EPIC-21     | Documentation                 | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-517 | PAC-TASK-517 - Write demo scenario script for InteractionAlert and HIGH note   | US-150           | PAC-EPIC-21     | Documentation                 | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-518 | PAC-TASK-518 - Write demo scenario script for AI Copilot and AI Audit          | US-150           | PAC-EPIC-21     | Documentation                 | High         | Sprint 10  | Automatic    |
| PAC-TASK-519 | PAC-TASK-519 - Write demo scenario script for Graph Sync and Graph-RAG         | US-150           | PAC-EPIC-21     | Documentation                 | High         | Sprint 10  | Automatic    |
| PAC-TASK-520 | PAC-TASK-520 - Write demo scenario script for Reports and Settings             | US-150           | PAC-EPIC-21     | Documentation                 | Medium       | Sprint 10  | Automatic    |
| PAC-TASK-521 | PAC-TASK-521 - Write MVP traceability matrix summary                           | US-150           | PAC-EPIC-21     | Documentation                 | High         | Sprint 10  | Automatic    |
| PAC-TASK-522 | PAC-TASK-522 - Write release/demo readiness checklist                          | US-150           | PAC-EPIC-21     | Documentation                 | Highest      | Sprint 10  | Automatic    |
| PAC-TASK-523 | PAC-TASK-523 - Write known limitations and out-of-scope guard section          | US-150           | PAC-EPIC-21     | Documentation                 | High         | Sprint 10  | Automatic    |
| PAC-TASK-524 | PAC-TASK-524 - Prepare contingency evidence screenshots list                   | US-150           | PAC-EPIC-21     | Documentation                 | Medium       | Sprint 10  | Automatic    |
| PAC-TASK-525 | PAC-TASK-525 - Prepare final smoke test report template                        | US-150           | PAC-EPIC-21     | Documentation                 | High         | Sprint 10  | Automatic    |
| PAC-TASK-526 | PAC-TASK-526 - Build Admin Graph Sync Status list UI                           | US-151           | PAC-EPIC-22     | Admin Graph Sync Status       | Medium       | Sprint 11  | Automatic    |
| PAC-TASK-527 | PAC-TASK-527 - Build Graph Sync job detail UI                                  | US-151           | PAC-EPIC-22     | Admin Graph Sync Status       | Low          | Sprint 11  | Automatic    |
| PAC-TASK-528 | PAC-TASK-528 - Build manual graph retry action for Admin                       | US-152           | PAC-EPIC-22     | Admin Graph Sync Status       | Medium       | Sprint 11  | Automatic    |
| PAC-TASK-529 | PAC-TASK-529 - Build manual graph rebuild action for Admin                     | US-152           | PAC-EPIC-22     | Admin Graph Sync Status       | Medium       | Sprint 11  | Automatic    |
| PAC-TASK-530 | PAC-TASK-530 - Add Graph Sync Status permission checks                         | US-151           | PAC-EPIC-22     | Admin Graph Sync Status       | Medium       | Sprint 11  | Automatic    |
| PAC-TASK-531 | PAC-TASK-531 - Build read-only Graph Explorer UI                               | US-153           | PAC-EPIC-23     | Graph Explorer                | Medium       | Sprint 11  | Automatic    |
| PAC-TASK-532 | PAC-TASK-532 - Build Graph Explorer node detail panel                          | US-153           | PAC-EPIC-23     | Graph Explorer                | Low          | Sprint 11  | Automatic    |
| PAC-TASK-533 | PAC-TASK-533 - Build Graph Explorer relationship detail panel                  | US-153           | PAC-EPIC-23     | Graph Explorer                | Low          | Sprint 11  | Automatic    |
| PAC-TASK-534 | PAC-TASK-534 - Add Graph Explorer permission checks                            | US-153           | PAC-EPIC-23     | Graph Explorer                | Medium       | Sprint 11  | Automatic    |
| PAC-TASK-535 | PAC-TASK-535 - Ensure Graph Explorer uses allowlisted templates only           | US-153           | PAC-EPIC-23     | Graph Explorer                | High         | Sprint 11  | Automatic    |
| PAC-TASK-536 | PAC-TASK-536 - Build AI Provider Settings UI                                   | US-154           | PAC-EPIC-24     | AI Provider Settings UI       | Medium       | Sprint 11  | Automatic    |
| PAC-TASK-537 | PAC-TASK-537 - Build AI model configuration UI                                 | US-154           | PAC-EPIC-24     | AI Provider Settings UI       | Low          | Sprint 11  | Automatic    |
| PAC-TASK-538 | PAC-TASK-538 - Build Prompt Management list UI                                 | US-155           | PAC-EPIC-24     | Prompt Management UI          | Medium       | Sprint 11  | Automatic    |
| PAC-TASK-539 | PAC-TASK-539 - Build Prompt Management version detail UI                       | US-155           | PAC-EPIC-24     | Prompt Management UI          | Low          | Sprint 11  | Automatic    |
| PAC-TASK-540 | PAC-TASK-540 - Add prompt approval status display                              | US-155           | PAC-EPIC-24     | Prompt Management UI          | Low          | Sprint 11  | Automatic    |
| PAC-TASK-541 | PAC-TASK-541 - Build System Audit Log UI                                       | US-156           | PAC-EPIC-25     | System Audit Log UI           | Medium       | Sprint 11  | Automatic    |
| PAC-TASK-542 | PAC-TASK-542 - Add System Audit Log filters                                    | US-156           | PAC-EPIC-25     | System Audit Log UI           | Low          | Sprint 11  | Automatic    |
| PAC-TASK-543 | PAC-TASK-543 - Implement Supabase Storage upload flow for medicine images      | US-157           | PAC-EPIC-26     | Supabase Storage              | Low          | Sprint 11  | Automatic    |
| PAC-TASK-544 | PAC-TASK-544 - Build medicine image upload UI                                  | US-157           | PAC-EPIC-26     | Supabase Storage              | Low          | Sprint 11  | Automatic    |
| PAC-TASK-545 | PAC-TASK-545 - Add Supabase Storage file validation                            | US-157           | PAC-EPIC-26     | Supabase Storage              | Low          | Sprint 11  | Automatic    |
| PAC-TASK-546 | PAC-TASK-546 - Implement Supabase Realtime inventory update listener           | US-158           | PAC-EPIC-27     | Supabase Realtime             | Low          | Sprint 11  | Automatic    |
| PAC-TASK-547 | PAC-TASK-547 - Build realtime POS stock refresh behavior                       | US-158           | PAC-EPIC-27     | Supabase Realtime             | Low          | Sprint 11  | Automatic    |
| PAC-TASK-548 | PAC-TASK-548 - Add realtime fallback polling behavior                          | US-158           | PAC-EPIC-27     | Supabase Realtime             | Low          | Sprint 11  | Automatic    |
| PAC-TASK-549 | PAC-TASK-549 - Build Notification Center UI                                    | US-159           | PAC-EPIC-28     | Notification                  | Low          | Sprint 11  | Automatic    |
| PAC-TASK-550 | PAC-TASK-550 - Implement low-stock notification generation                     | US-159           | PAC-EPIC-28     | Notification                  | Low          | Sprint 11  | Automatic    |
| PAC-TASK-551 | PAC-TASK-551 - Implement near-expiry notification generation                   | US-159           | PAC-EPIC-28     | Notification                  | Low          | Sprint 11  | Automatic    |
| PAC-TASK-552 | PAC-TASK-552 - Build read/unread notification state                            | US-159           | PAC-EPIC-28     | Notification                  | Low          | Sprint 11  | Automatic    |
| PAC-TASK-553 | PAC-TASK-553 - Implement scheduled near-expiry scan job                        | US-159           | PAC-EPIC-28     | Scheduled Job                 | Low          | Sprint 11  | Automatic    |
| PAC-TASK-554 | PAC-TASK-554 - Implement AI Business Report Narrative API                      | US-160           | PAC-EPIC-29     | AI Business Narrative         | Low          | Sprint 11  | Automatic    |
| PAC-TASK-555 | PAC-TASK-555 - Build AI Business Report Narrative UI                           | US-160           | PAC-EPIC-29     | AI Business Narrative         | Low          | Sprint 11  | Automatic    |
| PAC-TASK-556 | PAC-TASK-556 - Document Full Customer Management future scope                  | US-161           | PAC-EPIC-31     | Customer Management           | Low          | Sprint 12  | Automatic    |
| PAC-TASK-557 | PAC-TASK-557 - Document customer profile CRUD future scope                     | US-161           | PAC-EPIC-31     | Customer Management           | Low          | Sprint 12  | Automatic    |
| PAC-TASK-558 | PAC-TASK-558 - Document customer purchase history expansion                    | US-161           | PAC-EPIC-31     | Customer Management           | Low          | Sprint 12  | Automatic    |
| PAC-TASK-559 | PAC-TASK-559 - Document Online Commerce storefront future scope                | US-162           | PAC-EPIC-32     | Online Commerce               | Low          | Sprint 12  | Automatic    |
| PAC-TASK-560 | PAC-TASK-560 - Document online cart and wishlist future scope                  | US-162           | PAC-EPIC-32     | Online Commerce               | Low          | Sprint 12  | Automatic    |
| PAC-TASK-561 | PAC-TASK-561 - Document online checkout separation from POS checkout           | US-162           | PAC-EPIC-32     | Online Commerce               | Low          | Sprint 12  | Automatic    |
| PAC-TASK-562 | PAC-TASK-562 - Document Product Variant Catalog future scope                   | US-163           | PAC-EPIC-33     | Product Variant Catalog       | Low          | Sprint 12  | Automatic    |
| PAC-TASK-563 | PAC-TASK-563 - Document product images and documents commercial scope          | US-163           | PAC-EPIC-33     | Product Variant Catalog       | Low          | Sprint 12  | Automatic    |
| PAC-TASK-564 | PAC-TASK-564 - Document real catalog data import future workflow               | US-163           | PAC-EPIC-33     | Product Variant Catalog       | Low          | Sprint 12  | Automatic    |
| PAC-TASK-565 | PAC-TASK-565 - Document Multi-store future scope                               | US-164           | PAC-EPIC-34     | Multi-store / Multi-warehouse | Low          | Sprint 12  | Automatic    |
| PAC-TASK-566 | PAC-TASK-566 - Document default store assumption for MVP                       | US-164           | PAC-EPIC-34     | Multi-store / Multi-warehouse | Low          | Sprint 12  | Automatic    |
| PAC-TASK-567 | PAC-TASK-567 - Document Multi-warehouse future scope                           | US-165           | PAC-EPIC-34     | Multi-store / Multi-warehouse | Low          | Sprint 12  | Automatic    |
| PAC-TASK-568 | PAC-TASK-568 - Document default warehouse assumption for MVP                   | US-165           | PAC-EPIC-34     | Multi-store / Multi-warehouse | Low          | Sprint 12  | Automatic    |
| PAC-TASK-569 | PAC-TASK-569 - Document Stock Transfer future workflow                         | US-166           | PAC-EPIC-35     | Stock Transfer                | Low          | Sprint 12  | Automatic    |
| PAC-TASK-570 | PAC-TASK-570 - Document stock transfer audit future requirement                | US-166           | PAC-EPIC-35     | Stock Transfer                | Low          | Sprint 12  | Automatic    |
| PAC-TASK-571 | PAC-TASK-571 - Document Forecasting and reorder suggestion future scope        | US-167           | PAC-EPIC-36     | Forecasting                   | Low          | Sprint 12  | Automatic    |
| PAC-TASK-572 | PAC-TASK-572 - Document forecast data requirements and limitations             | US-167           | PAC-EPIC-36     | Forecasting                   | Low          | Sprint 12  | Automatic    |
| PAC-TASK-573 | PAC-TASK-573 - Document Promotion and Coupon future scope                      | US-168           | PAC-EPIC-37     | Promotion / Coupon            | Low          | Sprint 12  | Automatic    |
| PAC-TASK-574 | PAC-TASK-574 - Document discount not included in MVP checkout                  | US-168           | PAC-EPIC-37     | Promotion / Coupon            | Low          | Sprint 12  | Automatic    |
| PAC-TASK-575 | PAC-TASK-575 - Document Shipping and Delivery future scope                     | US-169           | PAC-EPIC-38     | Shipping                      | Low          | Sprint 12  | Automatic    |
| PAC-TASK-576 | PAC-TASK-576 - Document delivery status future workflow                        | US-169           | PAC-EPIC-38     | Shipping                      | Low          | Sprint 12  | Automatic    |
| PAC-TASK-577 | PAC-TASK-577 - Document Review and CMS future scope                            | US-170           | PAC-EPIC-39     | Review / CMS                  | Low          | Sprint 12  | Automatic    |
| PAC-TASK-578 | PAC-TASK-578 - Document product review moderation future consideration         | US-170           | PAC-EPIC-39     | Review / CMS                  | Low          | Sprint 12  | Automatic    |
| PAC-TASK-579 | PAC-TASK-579 - Document commercial expansion dependency map                    | US-170           | PAC-EPIC-39     | Documentation                 | Low          | Sprint 12  | Automatic    |
| PAC-TASK-580 | PAC-TASK-580 - Document final out-of-scope guardrails for AI agents            | US-170           | PAC-EPIC-39     | Documentation                 | Low          | Sprint 12  | Automatic    |

---

# Out-of-scope guard cho tài liệu 4D

Không tạo hoặc implement Task MVP cho các nội dung sau:

```text
Docker là official setup path
Destructive tests chạy trên demo/staging/production database
Bắt buộc global coverage percentage cho toàn bộ codebase
Full cross-browser testing trong MVP
Backup demo video là điều kiện thay thế running product
Demo reset chạy ngoài local environment
AI Business Narrative là mandatory MVP report
Admin Graph Sync Status UI là MVP blocker
Graph Explorer là MVP blocker
Prompt Management UI là MVP blocker
AI Provider Settings UI là MVP blocker
System Audit Log UI là MVP blocker
Supabase Storage là MVP blocker
Supabase Realtime là MVP blocker
Notification Center là MVP blocker
Forecasting/Reorder Suggestion là MVP blocker
Customer portal trong MVP
Online storefront/cart/wishlist trong MVP
ProductVariant làm sales key MVP
Multi-store/multi-warehouse workflow trong MVP
Stock Transfer trong MVP
Promotion/Coupon trong MVP
Shipping/Delivery trong MVP
Review/CMS trong MVP
```

---

# Bảng tóm tắt Task theo Sprint trong tài liệu 4D

| **Sprint** |              **Task range** | **Số Task** | **Nội dung chính**                                           |
| ---------- | --------------------------: | ----------: | ------------------------------------------------------------ |
| Sprint 10  | PAC-TASK-436 → PAC-TASK-525 |          90 | Testing, DevOps, CI, Setup, Documentation, Release Readiness |
| Sprint 11  | PAC-TASK-526 → PAC-TASK-555 |          30 | Should-have / Advanced                                       |
| Sprint 12  | PAC-TASK-556 → PAC-TASK-580 |          25 | Future / Commercial Expansion                                |
| **Tổng**   | PAC-TASK-436 → PAC-TASK-580 |     **145** | Testing, Advanced và Future Scope                            |

Thông tin cảnh báo tương tác thuốc và nội dung AI trong hệ thống chỉ mang tính hỗ trợ tham khảo cho đồ án, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.
