# PharmaAssist AI Intelligence

# Master Documentation Index & File Naming Standard

## 1. Mục đích

Tài liệu này chuẩn hóa lại bộ tài liệu chính thức của dự án **PharmaAssist AI Intelligence** sau khi toàn bộ tài liệu đầu vào đã được phân tích xong.

Mục tiêu của bước này là:

* Xác định lại danh sách **20 tài liệu chính thức** cần xây dựng.
* Chuẩn hóa tên file, số thứ tự, vai trò và phạm vi từng tài liệu.
* Đảm bảo toàn bộ tài liệu mới bám theo baseline chính thức hiện tại.
* Tránh quay lại các quyết định cũ đã bị thay thế.
* Làm nền để xây tiếp SRS, ERD, Prisma Schema, UML, API, UI, Jira, Testing và Demo Seed Plan.

---

## 2. Baseline chính thức được sử dụng

Toàn bộ bộ tài liệu mới phải bám theo baseline sau:

* Frontend: **Next.js**
* Backend: **NestJS / Node.js**
* ORM: **Prisma**
* Authentication: **Supabase Auth**
* Database nghiệp vụ: **PostgreSQL**
* PostgreSQL là **source of truth**
* Knowledge Graph: **Neo4j graph projection**
* Graph Sync: **outbox / worker / retry / audit / freshness detection**
* Graph-RAG: module riêng
* AI Provider: **Google AI provider**
* MockAI: chỉ là fallback để demo ổn định
* Inventory source of truth: **MedicineBatch**
* Xuất kho: **FEFO**
* Checkout: **transactional checkout command**
* Interaction rule: **ActiveIngredient–ActiveIngredient**
* Interaction alert: persisted **InteractionAlert lifecycle**
* HIGH alert: bắt buộc acknowledgement và consultation note
* AI Guardrail và AI Audit là MVP
* Database 100 bảng: extended/commercial-scale design, không phải full MVP schema
* Data thật/catalog data: reference/catalog data, không phải operational MVP seed hoàn chỉnh
* Jira hiện có cần major revision theo baseline mới

---

## 3. Nguyên tắc xây tài liệu

### 3.1. Không sử dụng lại quyết định cũ nếu mâu thuẫn baseline mới

Các thiết kế sau không được dùng làm thiết kế chính thức:

* Custom username/password/JWT auth.
* Lưu password hoặc password_hash trong PostgreSQL.
* Aggregate inventory làm source of truth.
* Interaction rule ở cấp Medicine–Medicine.
* MockAI-only hoặc MockGraph-only làm MVP.
* Tách payment/invoice khỏi checkout transaction.
* API public kiểu `POST /orders/{id}/pay` làm command chính.
* Customer Management full scope là điều kiện bắt buộc MVP.
* Full 100-table schema là schema bắt buộc MVP.
* Dùng toàn bộ scraped ingredients làm active ingredients chính thức.
* Seed `price = 0` thành `selling_price`.
* Bỏ qua HIGH alert acknowledgement và consultation note.

### 3.2. Tài liệu phải tách rõ MVP, Should-have và Future Scope

Mỗi tài liệu nếu có phạm vi chức năng phải phân loại rõ:

* **MVP**: bắt buộc để demo và hoàn thành sản phẩm lõi.
* **Should-have**: nên có nếu còn thời gian, nhưng không chặn MVP.
* **Future / Commercial Expansion**: mở rộng sau MVP.
* **Out of Scope**: không làm trong phạm vi hiện tại.

### 3.3. Tài liệu phải có traceability

Các tài liệu sau phải liên kết với nhau:

* BRD → SRS
* SRS → Use Case
* Use Case → UML
* SRS/API → ERD/Prisma
* SRS/API/UI → Jira Stories
* SRS/API → Testing
* Database/API → Demo Seed Plan

---

## 4. Quy ước đặt tên file

### 4.1. Format đặt tên

Tất cả tài liệu nên dùng format:

```text
{number}_{short_name}.md
```

Ví dụ:

```text
01_project_overview_current_baseline.md
06_software_requirements_specification.md
13_database_design_erd.md
```

### 4.2. Quy tắc đặt tên

* Dùng số thứ tự 2 chữ số: `01`, `02`, `03`, ...
* Dùng tiếng Anh cho tên file để dễ quản lý trên GitHub/Jira.
* Dùng chữ thường.
* Dùng dấu gạch dưới `_`.
* Không dùng dấu tiếng Việt trong tên file.
* Nội dung bên trong có thể viết bằng tiếng Việt.
* Bản chính nên lưu dạng `.md`.
* Khi cần nộp hoặc trình bày có thể export sang `.docx` hoặc `.pdf`.

### 4.3. Quy ước version

Mỗi tài liệu nên có metadata đầu file:

```text
Document ID:
Document Name:
Project:
Version:
Status:
Created Date:
Last Updated:
Owner:
Reviewer:
Baseline Source:
```

Status khuyến nghị:

* `Draft`
* `In Review`
* `Approved`
* `Superseded`

---

## 5. Danh sách 20 tài liệu chính thức mới

| No. | File name                                    | Tên tài liệu                                          | Vai trò                                                                        |
| --- | -------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------ |
| 01  | `01_project_overview_current_baseline.md`    | Project Overview & Current Baseline                   | Tổng quan dự án, trạng thái hiện tại, baseline chính thức                      |
| 02  | `02_project_charter.md`                      | Project Charter                                       | Mục tiêu, stakeholder, ràng buộc, tiêu chí thành công                          |
| 03  | `03_vision_scope_document.md`                | Vision & Scope Document                               | Tầm nhìn sản phẩm, MVP, Should-have, Future Scope                              |
| 04  | `04_decision_log_scope_control.md`           | Decision Log & Scope Control                          | Quyết định đã chốt, quyết định bị thay thế, unresolved decisions               |
| 05  | `05_business_requirements_document.md`       | Business Requirements Document                        | Nhu cầu nghiệp vụ nhà thuốc và yêu cầu cấp business                            |
| 06  | `06_software_requirements_specification.md`  | Software Requirements Specification                   | Yêu cầu chức năng, phi chức năng, business rules, constraints                  |
| 07  | `07_roles_permissions_authorization.md`      | User Roles, Permissions & Authorization Specification | Multi-role RBAC, permission matrix, ownership rules                            |
| 08  | `08_use_case_specification.md`               | Use Case Specification                                | Danh sách use case và đặc tả use case chính thức                               |
| 09  | `09_uml_diagram_package.md`                  | UML Diagram Package                                   | Use Case, Activity, Sequence, Class, State Machine, Component, Deployment      |
| 10  | `10_system_architecture_document.md`         | System Architecture Document                          | Kiến trúc Next.js, NestJS, Supabase, PostgreSQL, Neo4j, Google AI              |
| 11  | `11_module_design_document.md`               | Module Design Document                                | Thiết kế module backend/frontend và trách nhiệm từng module                    |
| 12  | `12_api_specification.md`                    | API Specification                                     | REST API chính thức cho Auth, Medicine, Inventory, POS, Checkout, AI, Graph    |
| 13  | `13_database_design_erd.md`                  | Database Design & ERD                                 | ERD MVP core, bảng, quan hệ, constraints, future/commercial schema             |
| 14  | `14_prisma_schema_migration_design.md`       | Prisma Schema & Migration Design                      | Prisma models, enums, indexes, migration notes                                 |
| 15  | `15_ui_ux_screen_specification.md`           | UI/UX Screen Specification                            | Danh sách màn hình, flow, layout, role-based UI                                |
| 16  | `16_ai_architecture_guardrail_audit.md`      | AI Architecture, Guardrail & Audit Design             | Google AI, MockAI fallback, prompt versioning, guardrail, AI audit             |
| 17  | `17_knowledge_graph_neo4j_graphrag.md`       | Knowledge Graph, Neo4j Sync & Graph-RAG Design        | Graph projection, Graph Sync, freshness, Graph-RAG, fallback                   |
| 18  | `18_data_strategy_catalog_seed_plan.md`      | Data Strategy, Catalog Reference & MVP Seed Plan      | Data thật, curated seed, demo users, medicines, batches, orders, AI/Graph seed |
| 19  | `19_project_management_jira_release_plan.md` | Project Management, Jira & Release Plan               | Jira Epics/Stories/Tasks, sprint, branch model, CI gate, release plan          |
| 20  | `20_testing_demo_setup_guide.md`             | Testing, Demo & Setup Guide                           | Test plan, setup guide, demo reset, smoke test, demo checklist                 |

---

## 6. Nhóm tài liệu theo mục đích

### 6.1. Nhóm quản trị dự án và phạm vi

Bao gồm:

* Document 01 — Project Overview & Current Baseline
* Document 02 — Project Charter
* Document 03 — Vision & Scope Document
* Document 04 — Decision Log & Scope Control
* Document 19 — Project Management, Jira & Release Plan

Nhóm này trả lời câu hỏi:

* Dự án là gì?
* Mục tiêu là gì?
* Ai là stakeholder?
* MVP gồm những gì?
* Quyết định nào đã chốt?
* Quyết định nào bị thay thế?
* Nhóm triển khai và quản lý công việc như thế nào?

---

### 6.2. Nhóm yêu cầu hệ thống

Bao gồm:

* Document 05 — Business Requirements Document
* Document 06 — Software Requirements Specification
* Document 07 — User Roles, Permissions & Authorization Specification
* Document 08 — Use Case Specification

Nhóm này trả lời câu hỏi:

* Nhà thuốc cần hệ thống làm gì?
* Actor nào dùng hệ thống?
* Mỗi role được làm gì?
* Business rule nào bắt buộc?
* Use case chính là gì?

---

### 6.3. Nhóm thiết kế kỹ thuật

Bao gồm:

* Document 09 — UML Diagram Package
* Document 10 — System Architecture Document
* Document 11 — Module Design Document
* Document 12 — API Specification
* Document 13 — Database Design & ERD
* Document 14 — Prisma Schema & Migration Design

Nhóm này trả lời câu hỏi:

* Hệ thống được thiết kế như thế nào?
* Module nào chịu trách nhiệm gì?
* API contract ra sao?
* Database có bảng nào?
* Prisma schema triển khai thế nào?
* Luồng nghiệp vụ được biểu diễn bằng UML ra sao?

---

### 6.4. Nhóm UI, AI, Graph và Data

Bao gồm:

* Document 15 — UI/UX Screen Specification
* Document 16 — AI Architecture, Guardrail & Audit Design
* Document 17 — Knowledge Graph, Neo4j Sync & Graph-RAG Design
* Document 18 — Data Strategy, Catalog Reference & MVP Seed Plan

Nhóm này trả lời câu hỏi:

* Màn hình nào cần có?
* Staff/Admin/Warehouse nhìn thấy gì?
* AI Copilot hoạt động ra sao?
* AI Guardrail chặn gì?
* AI Audit ghi gì?
* Neo4j được đồng bộ như thế nào?
* Data thật dùng ở đâu?
* Demo seed cần tạo thêm gì?

---

### 6.5. Nhóm kiểm thử và bàn giao

Bao gồm:

* Document 20 — Testing, Demo & Setup Guide

Nhóm này trả lời câu hỏi:

* Setup hệ thống thế nào?
* Test những gì?
* Demo reset chạy ra sao?
* Smoke test gồm gì?
* Điều kiện release/demo là gì?

---

## 7. Thứ tự xây dựng đề xuất

Nên xây theo thứ tự sau để tránh lệch logic:

### Phase 1 — Chốt nền tảng

1. Document 01 — Project Overview & Current Baseline
2. Document 04 — Decision Log & Scope Control
3. Document 03 — Vision & Scope Document
4. Document 02 — Project Charter

### Phase 2 — Chốt yêu cầu

5. Document 05 — Business Requirements Document
6. Document 06 — Software Requirements Specification
7. Document 07 — User Roles, Permissions & Authorization Specification
8. Document 08 — Use Case Specification

### Phase 3 — Chốt thiết kế kỹ thuật

9. Document 13 — Database Design & ERD
10. Document 14 — Prisma Schema & Migration Design
11. Document 12 — API Specification
12. Document 10 — System Architecture Document
13. Document 11 — Module Design Document
14. Document 09 — UML Diagram Package

### Phase 4 — Chốt UI, AI, Graph, Data

15. Document 15 — UI/UX Screen Specification
16. Document 16 — AI Architecture, Guardrail & Audit Design
17. Document 17 — Knowledge Graph, Neo4j Sync & Graph-RAG Design
18. Document 18 — Data Strategy, Catalog Reference & MVP Seed Plan

### Phase 5 — Chốt quản lý, test và demo

19. Document 19 — Project Management, Jira & Release Plan
20. Document 20 — Testing, Demo & Setup Guide

---

## 8. Quy tắc kiểm tra chất lượng tài liệu

Mỗi tài liệu trước khi được xem là hoàn chỉnh cần kiểm tra:

* Có bám baseline chính thức không?
* Có còn dùng quyết định cũ đã bị thay thế không?
* Có phân biệt MVP, Should-have, Future không?
* Có mâu thuẫn với Supabase Auth không?
* Có mâu thuẫn với MedicineBatch/FEFO không?
* Có mâu thuẫn với Checkout transaction không?
* Có mâu thuẫn với ActiveIngredient-level interaction rule không?
* Có bỏ sót InteractionAlert lifecycle không?
* Có bỏ sót AI Guardrail/Audit không?
* Có bỏ sót Graph Sync/Graph-RAG không?
* Có tách rõ catalog data và operational seed data không?
* Có thể trace sang SRS/API/ERD/UI/Jira/Testing không?

---

## 9. Kết luận

Bộ tài liệu chính thức mới của **PharmaAssist AI Intelligence** sẽ gồm 20 tài liệu, được xây lại từ đầu dựa trên baseline đã chốt.

Bộ tài liệu này không chỉ chỉnh sửa tài liệu cũ, mà là bản consolidated documentation mới, có nhiệm vụ:

* Thống nhất toàn bộ quyết định sau phân tích.
* Loại bỏ thiết kế cũ không còn phù hợp.
* Làm nguồn chính thức cho development, database, API, UI, testing, Jira và demo.
* Chuẩn bị dự án cho giai đoạn triển khai và bàn giao cuối cùng.
