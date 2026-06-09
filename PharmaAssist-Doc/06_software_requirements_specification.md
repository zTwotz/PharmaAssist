# Document 06 — Software Requirements Specification

# Tài liệu 06 — Đặc tả yêu cầu phần mềm

---

## Metadata

| Mục               | Nội dung                                                                                                                                                                           |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID       | DOC-06                                                                                                                                                                             |
| File name         | `06_software_requirements_specification.md`                                                                                                                                        |
| Document Name     | Software Requirements Specification                                                                                                                                                |
| Tên tiếng Việt    | Đặc tả yêu cầu phần mềm                                                                                                                                                            |
| Project           | PharmaAssist AI Intelligence                                                                                                                                                       |
| Version           | 1.0 Draft                                                                                                                                                                          |
| Status            | Draft                                                                                                                                                                              |
| Created Date      | 08/06/2026                                                                                                                                                                         |
| Last Updated      | 08/06/2026                                                                                                                                                                         |
| Owner             | System Analyst / Project Leader                                                                                                                                                    |
| Reviewer          | Backend Developer, Frontend Developer, Database Designer, Tester, Giảng viên hướng dẫn                                                                                             |
| Baseline Source   | Document 01 — Project Overview & Current Baseline, Document 03 — Vision & Scope Document, Document 04 — Decision Log & Scope Control, Document 05 — Business Requirements Document |
| Related Documents | Document 05, Document 07, Document 08, Document 12, Document 13, Document 14, Document 15, Document 20                                                                             |
| Language Rule     | Nội dung chính viết bằng tiếng Việt; tên file/tên tài liệu có thể giữ tiếng Anh                                                                                                    |
| Terminology Rule  | Giữ nguyên tên công nghệ, module, entity, API, table, enum và thuật ngữ kỹ thuật cần thiết bằng tiếng Anh                                                                          |

---

## 1. Mục đích tài liệu

Tài liệu **Software Requirements Specification** đặc tả yêu cầu phần mềm chính thức cho hệ thống **PharmaAssist AI Intelligence**.

Tài liệu này chuyển các business requirements trong Document 05 thành các yêu cầu phần mềm có thể dùng để thiết kế, triển khai, kiểm thử và nghiệm thu.

Mục đích chính của tài liệu gồm:

1. Xác định phạm vi yêu cầu phần mềm chính thức.
2. Định nghĩa thuật ngữ và chữ viết tắt.
3. Mô tả tổng quan sản phẩm, người dùng, môi trường vận hành, ràng buộc, giả định và phụ thuộc.
4. Đặc tả functional requirements có mã FR.
5. Đặc tả non-functional requirements có mã NFR.
6. Đặc tả business rules có mã BR.
7. Đặc tả data requirements.
8. Đặc tả external integration requirements.
9. Tóm tắt authorization requirements.
10. Đặc tả error handling requirements.
11. Đặc tả audit/logging requirements.
12. Phân loại requirement theo MVP, Should-have, Future / Commercial Expansion và Out of Scope.
13. Đưa ra acceptance criteria ở cấp requirement.
14. Tạo traceability base cho Use Case, API, ERD, Prisma, UI và Testing.

Tài liệu này **không** viết full API request/response, không viết full ERD, không viết Prisma model syntax, không viết UI layout chi tiết, không viết Jira story/task chi tiết, không viết actual test cases đầy đủ và không viết code.

---

## 2. Scope của SRS

### 2.1. Phạm vi bao gồm

SRS này bao gồm yêu cầu phần mềm cho các nhóm chức năng MVP sau:

1. Auth & User Profile.
2. Roles & Permissions.
3. Medicine.
4. ActiveIngredient.
5. Supplier.
6. MedicineBatch.
7. Stock Import.
8. Inventory Adjustment.
9. POS Draft Order.
10. Checkout.
11. Payment.
12. Invoice.
13. DrugInteraction.
14. InteractionAlert.
15. AI Copilot.
16. AI Guardrail.
17. AI Audit.
18. Graph Sync.
19. Graph-RAG.
20. Reports.
21. System Settings.
22. Demo Reset.

SRS này cũng ghi nhận yêu cầu ở mức Should-have, Future / Commercial Expansion và Out of Scope để tránh nhầm lẫn trong thiết kế và kiểm thử.

### 2.2. Phạm vi không bao gồm

SRS này không bao gồm:

1. API request/response chi tiết.
2. ERD chi tiết.
3. Prisma model syntax.
4. UI layout chi tiết.
5. Component-level frontend design.
6. Test case chi tiết.
7. Jira sprint/task chi tiết.
8. Source code.
9. Migration script.
10. Deployment script production.
11. Full production medical compliance specification.

### 2.3. Relationship với các tài liệu khác

| Nội dung                               | Tài liệu phụ trách chi tiết |
| -------------------------------------- | --------------------------- |
| Business needs                         | Document 05                 |
| Functional/non-functional requirements | Document 06                 |
| Role/permission matrix                 | Document 07                 |
| Use Case flows                         | Document 08                 |
| UML diagrams                           | Document 09                 |
| Architecture                           | Document 10                 |
| Module design                          | Document 11                 |
| API contract                           | Document 12                 |
| Database & ERD                         | Document 13                 |
| Prisma schema & migration              | Document 14                 |
| UI/UX screens                          | Document 15                 |
| AI architecture                        | Document 16                 |
| Graph design                           | Document 17                 |
| Data seed strategy                     | Document 18                 |
| Jira/release plan                      | Document 19                 |
| Testing/demo/setup                     | Document 20                 |

---

## 3. Definitions and Abbreviations

| Thuật ngữ                     | Định nghĩa                                                                                    |
| ----------------------------- | --------------------------------------------------------------------------------------------- |
| Admin                         | Người quản trị hệ thống, có quyền rộng nhất trong MVP                                         |
| Staff                         | Nhân viên bán thuốc tại quầy                                                                  |
| Warehouse                     | Nhân viên kho                                                                                 |
| Customer / Khách lẻ           | Người mua thuốc tại quầy, không đăng nhập trong MVP                                           |
| Medicine                      | Thuốc/sản phẩm thuốc dùng làm entity nghiệp vụ lõi trong MVP                                  |
| ActiveIngredient              | Hoạt chất của thuốc, dùng để kiểm tra tương tác                                               |
| MedicineBatch                 | Lô thuốc, source of truth cho tồn kho                                                         |
| FEFO                          | First Expired, First Out — batch gần hết hạn được xuất trước                                  |
| Stock Import                  | Phiếu nhập kho                                                                                |
| Inventory Adjustment          | Phiếu điều chỉnh tồn kho                                                                      |
| POS                           | Point of Sale — nghiệp vụ bán thuốc tại quầy                                                  |
| Draft Order                   | Đơn bán đang ở trạng thái nháp                                                                |
| Checkout                      | Nghiệp vụ hoàn tất đơn hàng, gồm kiểm tra order, interaction, stock, FEFO, payment và invoice |
| Payment Simulation            | Thanh toán mô phỏng, không tích hợp ngân hàng thật                                            |
| Invoice                       | Hóa đơn được tạo sau successful payment                                                       |
| DrugInteraction Rule          | Quy tắc tương tác thuốc ở cấp ActiveIngredient–ActiveIngredient                               |
| InteractionAlert              | Cảnh báo tương tác đã hiển thị và được lưu lại                                                |
| HIGH alert                    | Cảnh báo mức HIGH, bắt buộc acknowledgement và consultation note trước checkout               |
| AI Copilot                    | Tính năng AI hỗ trợ Staff giải thích alert và tạo draft note                                  |
| AI Guardrail                  | Cơ chế kiểm soát input/output để AI không vượt phạm vi an toàn                                |
| AI Audit                      | Log metadata và summary của tác vụ AI                                                         |
| Graph Sync                    | Đồng bộ dữ liệu từ PostgreSQL sang Neo4j                                                      |
| Graph-RAG                     | Module dùng graph context để hỗ trợ giải thích/truy vấn                                       |
| PostgreSQL                    | Database nghiệp vụ chính và source of truth                                                   |
| Neo4j                         | Graph database dùng làm graph projection                                                      |
| Supabase Auth                 | Dịch vụ authentication chính thức                                                             |
| Prisma                        | ORM chính thức                                                                                |
| MVP                           | Phạm vi bắt buộc để demo và hoàn thành sản phẩm lõi                                           |
| Should-have                   | Nên có nếu còn thời gian, không chặn MVP                                                      |
| Future / Commercial Expansion | Mở rộng sau MVP hoặc khi thương mại hóa                                                       |
| Out of Scope                  | Không làm trong phạm vi hiện tại                                                              |
| FR                            | Functional Requirement                                                                        |
| NFR                           | Non-functional Requirement                                                                    |
| BR                            | Business Rule                                                                                 |
| AC                            | Acceptance Criteria                                                                           |

---

## 4. Overall Description

### 4.1. Product perspective

PharmaAssist AI Intelligence là hệ thống web quản lý nhà thuốc nội bộ, hỗ trợ nghiệp vụ bán thuốc tại quầy, quản lý thuốc, hoạt chất, supplier, batch inventory, stock import, inventory adjustment, interaction checking, checkout, payment simulation, invoice, reports, AI Copilot, AI Guardrail, AI Audit, Neo4j graph projection, Graph Sync và Graph-RAG.

Hệ thống được xây dựng theo baseline:

1. Frontend: Next.js.
2. Backend: NestJS / Node.js.
3. ORM: Prisma.
4. Authentication: Supabase Auth.
5. Database nghiệp vụ: PostgreSQL.
6. Graph database: Neo4j.
7. AI provider ưu tiên: Google AI Provider.
8. AI fallback: MockAI.
9. PostgreSQL là source of truth.
10. Neo4j là graph projection.

### 4.2. Product functions cấp cao

Hệ thống cung cấp các nhóm chức năng chính:

1. Đăng nhập và quản lý user profile.
2. Quản lý role, permission và ownership.
3. Quản lý Medicine.
4. Quản lý ActiveIngredient.
5. Mapping Medicine với ActiveIngredient.
6. Quản lý Supplier.
7. Quản lý MedicineBatch và Inventory Summary.
8. Quản lý Stock Import.
9. Quản lý Inventory Adjustment.
10. Tạo và xử lý Draft Order trong POS.
11. Kiểm tra DrugInteraction.
12. Lưu và xử lý InteractionAlert.
13. Checkout transaction.
14. Payment simulation.
15. Invoice generation.
16. AI Copilot.
17. AI Guardrail.
18. AI Audit.
19. Graph Sync.
20. Graph-RAG.
21. Reports.
22. System Settings.
23. Demo Reset.

### 4.3. Product safety statement

Hệ thống có các chức năng hỗ trợ cảnh báo tương tác thuốc và AI explanation, nhưng không thay thế dược sĩ, bác sĩ hoặc chuyên gia y tế.

Hệ thống và AI không được:

1. Chẩn đoán bệnh.
2. Kê đơn thuốc.
3. Đưa liều dùng cụ thể.
4. Thay thế tư vấn chuyên môn.
5. Lưu raw PII trong AI Audit.
6. Dùng graph stale mà không có warning hoặc fallback.

### 4.4. Product documentation relationship

Document 06 là trung tâm requirement. Các requirement trong tài liệu này phải trace được sang:

1. Use Case.
2. API.
3. ERD.
4. Prisma Schema.
5. UI/UX.
6. Testing.
7. Jira.

---

## 5. User Classes

### 5.1. Admin

Admin là user class có quyền cao nhất.

Admin cần:

1. Quản lý user, role và permission.
2. Quản lý Medicine và ActiveIngredient.
3. Quản lý Supplier.
4. Quản lý DrugInteraction Rule.
5. Xem InteractionAlert History.
6. Xem tất cả Order, Payment và Invoice.
7. Thực hiện nghiệp vụ bán hàng như Staff nếu cần.
8. Xem reports.
9. Cấu hình System Settings.
10. Xem AI Audit Log.
11. Dùng Graph Explorer và Graph-RAG nếu được triển khai.
12. Theo dõi Graph Sync Status nếu UI Should-have được triển khai.

### 5.2. Staff

Staff là user class vận hành POS.

Staff cần:

1. Tìm Medicine.
2. Xem sellable stock trong POS.
3. Tạo Draft Order.
4. Thêm/sửa/xóa order items.
5. Xem InteractionAlert trong order.
6. Acknowledge HIGH alert.
7. Nhập consultation note cho HIGH alert.
8. Dùng AI Copilot để hỗ trợ giải thích alert.
9. Checkout order hợp lệ.
10. Xem Order/Payment/Invoice thuộc ownership scope.
11. Cancel Draft Order trong ownership scope.

Staff không được:

1. Quản lý user.
2. Quản lý Supplier.
3. Deactivate Supplier.
4. Quản lý DrugInteraction Rule.
5. Xem InteractionAlert History toàn hệ thống.
6. Xem AI Audit Log.
7. Gửi raw Cypher.
8. Quản lý Graph Sync.

### 5.3. Warehouse

Warehouse là user class phụ trách kho.

Warehouse cần:

1. Xem Medicine.
2. Xem Supplier.
3. Tạo Supplier.
4. Cập nhật Supplier.
5. Tạo và confirm Stock Import.
6. Xem Inventory Summary.
7. Xem MedicineBatch.
8. Xem low-stock và near-expiry.
9. Tạo và confirm Inventory Adjustment.
10. Xem Inventory Report trong phạm vi được cấp.

Warehouse không được:

1. Tạo order bán hàng.
2. Checkout.
3. Xem Payment/Invoice.
4. Xem InteractionAlert.
5. Quản lý Interaction Rule.
6. Xem Graph Explorer trong MVP.
7. Dùng Graph-RAG trong MVP.

### 5.4. Customer / Khách lẻ

Customer không phải authenticated user trong MVP.

Customer được hỗ trợ gián tiếp qua:

1. POS walk-in flow.
2. `customer_id = null`.
3. Hiển thị “Khách lẻ”.
4. Invoice sau successful payment.

### 5.5. External services

External services gồm:

1. Supabase Auth.
2. Supabase PostgreSQL/PostgreSQL.
3. Google AI Provider.
4. MockAI.
5. Neo4j.
6. GitHub.
7. Jira.

---

## 6. Operating Environment

### 6.1. Frontend environment

Frontend chạy trên:

1. Next.js.
2. Desktop/laptop web browser.
3. Official MVP browser target: Chrome desktop/laptop.
4. Basic responsive checks required.
5. Full cross-browser coverage ngoài MVP.

### 6.2. Backend environment

Backend chạy trên:

1. NestJS / Node.js.
2. Modular Monolith architecture.
3. Prisma ORM.
4. Background workers cho Graph Sync nếu cần.
5. Backend là nơi xử lý business rules, authorization, transaction, AI orchestration và audit.

### 6.3. Database environment

Database nghiệp vụ:

1. PostgreSQL.
2. Supabase PostgreSQL hoặc PostgreSQL tương đương.
3. PostgreSQL là source of truth.

Graph database:

1. Neo4j.
2. Neo4j là projection.
3. Neo4j không được làm source of truth nghiệp vụ.

### 6.4. Authentication environment

Authentication dùng:

1. Supabase Auth.
2. Supabase quản lý email, password, session và token.
3. Backend xác minh Supabase access token.
4. Backend không tin role/permission từ frontend gửi lên.

### 6.5. AI environment

AI environment gồm:

1. Google AI Provider là provider ưu tiên.
2. MockAI fallback.
3. Provider/model configurable ở backend.
4. AI request phải qua guardrail và audit.

### 6.6. Development and demo environment

Primary setup:

1. Local Node.js.
2. Next.js frontend.
3. NestJS backend.
4. Prisma.
5. Cloud Supabase.
6. Neo4j AuraDB hoặc Neo4j environment phù hợp.
7. Google AI Provider nếu có key.
8. MockAI fallback.

Demo reset:

1. Chỉ chạy local.
2. Không chạy destructive reset ở demo/staging/production/unknown environment.

---

## 7. Product Constraints

### 7.1. Technology constraints

1. Frontend phải dùng Next.js.
2. Backend phải dùng NestJS / Node.js.
3. ORM phải dùng Prisma.
4. Authentication phải dùng Supabase Auth.
5. PostgreSQL là source of truth.
6. Neo4j là graph projection.
7. Google AI Provider là provider ưu tiên.
8. MockAI chỉ là fallback.
9. Docker không phải official setup path.

### 7.2. Business constraints

1. MedicineBatch là source of truth cho inventory.
2. Checkout phải áp dụng FEFO.
3. Checkout phải là transaction chính thức.
4. Payment và Invoice không được tách khỏi checkout flow để hoàn tất order.
5. DrugInteraction Rule ở cấp ActiveIngredient–ActiveIngredient.
6. HIGH alert phải acknowledgement và có consultation note trước checkout.
7. PAID order không được sửa hoặc cancel trực tiếp.
8. Refund và return ngoài MVP.
9. Customer Management đầy đủ là Should-have, không phải MVP blocker.

### 7.3. Data constraints

1. Real catalog data chỉ là reference.
2. MVP cần curated operational seed.
3. Không dùng toàn bộ scraped ingredients làm official ActiveIngredient.
4. Không seed selling_price = 0.
5. Demo data không dùng dữ liệu cá nhân thật.
6. Demo inventory phải tái tạo từ transactions.
7. Demo graph data phải projected từ PostgreSQL.

### 7.4. Safety constraints

1. AI không chẩn đoán bệnh.
2. AI không kê đơn.
3. AI không đưa liều dùng cụ thể.
4. AI không thay thế chuyên gia y tế.
5. AI Audit không lưu raw PII.
6. Graph stale/unavailable phải fallback hoặc trả safe error.
7. HIGH alert unresolved phải block checkout.

### 7.5. Testing constraints

1. Không có global mandatory coverage percentage cho toàn codebase.
2. High-risk modules nên ưu tiên test: Checkout, FEFO, Interaction, AI Guardrail.
3. Destructive tests không được chạy trên demo database.
4. Integration tests phải có isolation/cleanup phù hợp.

---

## 8. Assumptions and Dependencies

### 8.1. Assumptions

1. Dự án là đồ án học thuật, không phải production medical system.
2. Người dùng chính là Admin, Staff và Warehouse.
3. Customer không đăng nhập trong MVP.
4. Payment chỉ là simulation.
5. Refund và return ngoài MVP.
6. Supabase Auth có thể được dùng cho authentication.
7. PostgreSQL có thể được dùng làm source of truth.
8. Neo4j có thể được dùng làm graph projection.
9. Google AI Provider có thể được cấu hình nếu có key phù hợp.
10. MockAI luôn có để fallback.
11. Demo reset chỉ chạy ở local environment.
12. Real catalog data chỉ hỗ trợ tạo curated seed.
13. Jira và GitHub sẽ được dùng để quản lý công việc và code.

### 8.2. Functional dependencies

1. POS phụ thuộc Medicine, MedicineBatch và Interaction.
2. Checkout phụ thuộc Draft Order, stock, FEFO, InteractionAlert, Payment và Invoice.
3. Interaction checking phụ thuộc Medicine–ActiveIngredient mapping và DrugInteraction Rule.
4. Reports phụ thuộc Order, Payment, Invoice, MedicineBatch và allocations.
5. AI Copilot phụ thuộc AI Guardrail và AI Audit.
6. Graph-RAG phụ thuộc Graph Sync hoặc PostgreSQL fallback.
7. Demo reset phụ thuộc seed scripts, Supabase demo users, PostgreSQL data và graph projection.

### 8.3. Technical dependencies

1. Backend phụ thuộc Supabase Auth token verification.
2. Prisma phụ thuộc PostgreSQL schema.
3. Neo4j projection phụ thuộc Graph Sync.
4. AI integration phụ thuộc provider configuration.
5. CI phụ thuộc GitHub workflow hoặc công cụ tương đương.
6. Demo phụ thuộc curated seed và smoke tests.

### 8.4. Documentation dependencies

1. Document 06 phụ thuộc Document 01, 03, 04 và 05.
2. Document 07 phụ thuộc Document 06 cho permission detail.
3. Document 08 phụ thuộc Document 06 cho use case scope.
4. Document 12 phụ thuộc Document 06 cho API requirements.
5. Document 13/14 phụ thuộc Document 06 cho data requirements.
6. Document 15 phụ thuộc Document 06 cho screen requirements.
7. Document 20 phụ thuộc Document 06 cho test scope.

---

# 9. Functional Requirements

Functional requirements dùng mã:

```text
FR-[GROUP]-[NUMBER]
```

Trạng thái scope gồm:

1. MVP.
2. Should-have.
3. Future.
4. Out of Scope.

Priority gồm:

1. Must.
2. Should.
3. Could.
4. Won't.

---

## 9.1. Auth & User Profile

| FR ID       | Requirement                                                                                                       | Scope | Priority |
| ----------- | ----------------------------------------------------------------------------------------------------------------- | ----- | -------- |
| FR-AUTH-001 | Hệ thống phải cho phép user nội bộ đăng nhập thông qua Supabase Auth.                                             | MVP   | Must     |
| FR-AUTH-002 | Hệ thống phải xác minh Supabase access token ở backend trước khi xử lý API bảo vệ.                                | MVP   | Must     |
| FR-AUTH-003 | Hệ thống không được tự xác thực bằng custom username/password/JWT làm cơ chế chính.                               | MVP   | Must     |
| FR-AUTH-004 | Hệ thống phải duy trì user profile nội bộ liên kết với Supabase user.                                             | MVP   | Must     |
| FR-AUTH-005 | User profile phải hỗ trợ trạng thái active/inactive hoặc tương đương để kiểm soát truy cập nội bộ.                | MVP   | Must     |
| FR-AUTH-006 | Hệ thống phải hỗ trợ cờ `must_change_password` hoặc cơ chế tương đương cho first-login flow.                      | MVP   | Should   |
| FR-AUTH-007 | Khi user có `must_change_password = true`, hệ thống phải yêu cầu user đổi mật khẩu trước khi vào chức năng chính. | MVP   | Should   |
| FR-AUTH-008 | Admin phải có thể tạo staff account thông qua Supabase Admin integration hoặc workflow tương đương.               | MVP   | Must     |
| FR-AUTH-009 | Hệ thống không được lưu password hoặc password_hash trong PostgreSQL nghiệp vụ.                                   | MVP   | Must     |
| FR-AUTH-010 | Hệ thống phải hỗ trợ logout.                                                                                      | MVP   | Must     |
| FR-AUTH-011 | Hệ thống phải xử lý token hết hạn bằng cách yêu cầu đăng nhập lại hoặc refresh theo cơ chế Supabase.              | MVP   | Must     |
| FR-AUTH-012 | Hệ thống phải chặn user inactive truy cập các nghiệp vụ chính.                                                    | MVP   | Must     |

---

## 9.2. Roles & Permissions

| FR ID       | Requirement                                                                                    | Scope | Priority |
| ----------- | ---------------------------------------------------------------------------------------------- | ----- | -------- |
| FR-RBAC-001 | Hệ thống phải hỗ trợ Role.                                                                     | MVP   | Must     |
| FR-RBAC-002 | Hệ thống phải hỗ trợ Permission.                                                               | MVP   | Must     |
| FR-RBAC-003 | Hệ thống phải hỗ trợ một user có nhiều role.                                                   | MVP   | Must     |
| FR-RBAC-004 | Hệ thống phải hỗ trợ mapping role–permission.                                                  | MVP   | Must     |
| FR-RBAC-005 | Quyền hiệu lực của user phải là hợp các permissions từ các role active.                        | MVP   | Must     |
| FR-RBAC-006 | Backend phải kiểm tra permission trước khi cho phép nghiệp vụ bảo vệ.                          | MVP   | Must     |
| FR-RBAC-007 | Backend phải kiểm tra ownership/data scope đối với các nghiệp vụ Staff.                        | MVP   | Must     |
| FR-RBAC-008 | Admin phải có quyền quản lý user/role/permission ở phạm vi MVP.                                | MVP   | Must     |
| FR-RBAC-009 | Staff chỉ được xem và thao tác Order do mình tạo hoặc xử lý.                                   | MVP   | Must     |
| FR-RBAC-010 | Warehouse không được tạo Order, Checkout, xem Payment/Invoice hoặc InteractionAlert trong MVP. | MVP   | Must     |
| FR-RBAC-011 | Frontend phải ẩn hoặc disable chức năng không thuộc quyền user để cải thiện UX.                | MVP   | Should   |
| FR-RBAC-012 | Frontend visibility không được thay thế backend authorization.                                 | MVP   | Must     |
| FR-RBAC-013 | Hệ thống phải trả lỗi phù hợp khi user authenticated nhưng không đủ permission.                | MVP   | Must     |
| FR-RBAC-014 | Hệ thống phải trả lỗi phù hợp khi user đủ permission chung nhưng không thuộc ownership scope.  | MVP   | Must     |

---

## 9.3. Medicine

| FR ID      | Requirement                                                                                  | Scope  | Priority |
| ---------- | -------------------------------------------------------------------------------------------- | ------ | -------- |
| FR-MED-001 | Admin phải có thể tạo Medicine.                                                              | MVP    | Must     |
| FR-MED-002 | Admin phải có thể cập nhật Medicine.                                                         | MVP    | Must     |
| FR-MED-003 | Admin phải có thể deactivate Medicine thay vì xóa cứng khi Medicine đã có lịch sử nghiệp vụ. | MVP    | Must     |
| FR-MED-004 | User có quyền phù hợp phải có thể xem danh sách Medicine.                                    | MVP    | Must     |
| FR-MED-005 | User có quyền phù hợp phải có thể tìm kiếm/lọc Medicine.                                     | MVP    | Must     |
| FR-MED-006 | Medicine dùng để bán phải có selling_price lớn hơn 0.                                        | MVP    | Must     |
| FR-MED-007 | Medicine phải có trạng thái active/inactive.                                                 | MVP    | Must     |
| FR-MED-008 | Inactive Medicine không được thêm mới vào Draft Order.                                       | MVP    | Must     |
| FR-MED-009 | Medicine phải có thông tin đơn vị bán phù hợp để hiển thị trong POS và reports.              | MVP    | Must     |
| FR-MED-010 | Medicine phải có min_stock hoặc thông tin tương đương để tính low-stock.                     | MVP    | Must     |
| FR-MED-011 | Medicine phải có khả năng mapping với ActiveIngredient.                                      | MVP    | Must     |
| FR-MED-012 | Hệ thống không được dùng product_variant làm key chính cho sales/inventory trong MVP.        | MVP    | Must     |
| FR-MED-013 | Full product catalog/e-commerce workflow được phân loại Future.                              | Future | Won't    |

---

## 9.4. ActiveIngredient

| FR ID      | Requirement                                                                                         | Scope  | Priority |
| ---------- | --------------------------------------------------------------------------------------------------- | ------ | -------- |
| FR-ACT-001 | Admin phải có thể tạo ActiveIngredient.                                                             | MVP    | Must     |
| FR-ACT-002 | Admin phải có thể cập nhật ActiveIngredient.                                                        | MVP    | Must     |
| FR-ACT-003 | Admin phải có thể deactivate ActiveIngredient nếu không còn dùng.                                   | MVP    | Should   |
| FR-ACT-004 | User có quyền phù hợp phải có thể xem danh sách ActiveIngredient.                                   | MVP    | Must     |
| FR-ACT-005 | Hệ thống phải cho phép mapping Medicine với một hoặc nhiều ActiveIngredient.                        | MVP    | Must     |
| FR-ACT-006 | Mapping Medicine–ActiveIngredient phải hỗ trợ thông tin mô tả hàm lượng dạng text nếu cần.          | MVP    | Should   |
| FR-ACT-007 | Interaction checking phải dựa trên ActiveIngredient mapping.                                        | MVP    | Must     |
| FR-ACT-008 | Hệ thống không được tự động đưa toàn bộ scraped ingredient strings vào ActiveIngredient chính thức. | MVP    | Must     |
| FR-ACT-009 | ActiveIngredient phải được đồng bộ sang graph projection nếu active và thuộc scope graph.           | MVP    | Must     |
| FR-ACT-010 | DrugGroup taxonomy không thuộc core MVP nếu chưa có nguồn authoritative.                            | Future | Won't    |

---

## 9.5. Supplier

| FR ID      | Requirement                                                                      | Scope  | Priority |
| ---------- | -------------------------------------------------------------------------------- | ------ | -------- |
| FR-SUP-001 | Warehouse phải có thể xem danh sách Supplier.                                    | MVP    | Must     |
| FR-SUP-002 | Warehouse phải có thể tạo Supplier.                                              | MVP    | Must     |
| FR-SUP-003 | Warehouse phải có thể cập nhật Supplier.                                         | MVP    | Must     |
| FR-SUP-004 | Admin phải có thể deactivate Supplier.                                           | MVP    | Must     |
| FR-SUP-005 | Warehouse không được deactivate Supplier.                                        | MVP    | Must     |
| FR-SUP-006 | Supplier có lịch sử Stock Import không được xóa cứng.                            | MVP    | Must     |
| FR-SUP-007 | Stock Import phải chọn Supplier active hoặc supplier hợp lệ theo rule nghiệp vụ. | MVP    | Must     |
| FR-SUP-008 | Hệ thống phải audit thay đổi quan trọng của Supplier.                            | MVP    | Should   |
| FR-SUP-009 | Supplier portal không thuộc MVP.                                                 | Future | Won't    |
| FR-SUP-010 | Supplier contract management phức tạp không thuộc MVP.                           | Future | Won't    |

---

## 9.6. MedicineBatch

| FR ID      | Requirement                                                                                           | Scope  | Priority |
| ---------- | ----------------------------------------------------------------------------------------------------- | ------ | -------- |
| FR-BAT-001 | Hệ thống phải quản lý tồn kho thông qua MedicineBatch.                                                | MVP    | Must     |
| FR-BAT-002 | MedicineBatch phải là source of truth cho quantity_remaining.                                         | MVP    | Must     |
| FR-BAT-003 | MedicineBatch phải gắn với một Medicine.                                                              | MVP    | Must     |
| FR-BAT-004 | MedicineBatch phải có batch_number bắt buộc.                                                          | MVP    | Must     |
| FR-BAT-005 | Hệ thống phải chuẩn hóa batch_number thành normalized_batch_number để so khớp batch.                  | MVP    | Must     |
| FR-BAT-006 | MedicineBatch phải có expiry_date bắt buộc.                                                           | MVP    | Must     |
| FR-BAT-007 | MedicineBatch phải có quantity_received hoặc thông tin nguồn nhập tương đương.                        | MVP    | Must     |
| FR-BAT-008 | MedicineBatch phải có quantity_remaining không âm.                                                    | MVP    | Must     |
| FR-BAT-009 | MedicineBatch phải có import_price hoặc unit cost phục vụ traceability nếu nằm trong dữ liệu nhập.    | MVP    | Should   |
| FR-BAT-010 | Hệ thống phải đảm bảo uniqueness theo medicine và normalized_batch_number trong phạm vi rule đã chốt. | MVP    | Must     |
| FR-BAT-011 | Nếu nhập thêm cùng Medicine và normalized batch number nhưng expiry_date khác, hệ thống phải reject.  | MVP    | Must     |
| FR-BAT-012 | Batch hết hạn không được tính vào sellable stock.                                                     | MVP    | Must     |
| FR-BAT-013 | Inventory Summary phải được tính từ MedicineBatch.                                                    | MVP    | Must     |
| FR-BAT-014 | Direct edit quantity_remaining không được phép ngoài workflow chính thức.                             | MVP    | Must     |
| FR-BAT-015 | Multi-warehouse distribution không thuộc MVP.                                                         | Future | Won't    |

---

## 9.7. Stock Import

| FR ID      | Requirement                                                                             | Scope  | Priority |
| ---------- | --------------------------------------------------------------------------------------- | ------ | -------- |
| FR-STI-001 | Warehouse phải có thể tạo Stock Import ở trạng thái DRAFT.                              | MVP    | Must     |
| FR-STI-002 | Warehouse phải có thể thêm Stock Import details vào DRAFT import.                       | MVP    | Must     |
| FR-STI-003 | Stock Import detail phải có Medicine.                                                   | MVP    | Must     |
| FR-STI-004 | Stock Import detail phải có batch_number.                                               | MVP    | Must     |
| FR-STI-005 | Stock Import detail phải có expiry_date.                                                | MVP    | Must     |
| FR-STI-006 | Stock Import detail phải có quantity lớn hơn 0.                                         | MVP    | Must     |
| FR-STI-007 | Stock Import detail phải có import_price/unit_cost nếu dùng trong dữ liệu nhập.         | MVP    | Should   |
| FR-STI-008 | DRAFT Stock Import có thể chỉnh sửa.                                                    | MVP    | Must     |
| FR-STI-009 | Warehouse phải có thể cancel DRAFT Stock Import.                                        | MVP    | Must     |
| FR-STI-010 | Warehouse phải có thể confirm Stock Import.                                             | MVP    | Must     |
| FR-STI-011 | Confirm Stock Import phải tạo mới hoặc cập nhật MedicineBatch theo batch matching rule. | MVP    | Must     |
| FR-STI-012 | Confirm Stock Import không được cộng kho hai lần.                                       | MVP    | Must     |
| FR-STI-013 | CONFIRMED Stock Import không được sửa tự do.                                            | MVP    | Must     |
| FR-STI-014 | CANCELLED Stock Import không được confirm.                                              | MVP    | Must     |
| FR-STI-015 | Confirm/cancel Stock Import phải ghi audit.                                             | MVP    | Must     |
| FR-STI-016 | Hệ thống phải reject batch expiry mismatch.                                             | MVP    | Must     |
| FR-STI-017 | Purchase order workflow đầy đủ không thuộc MVP.                                         | Future | Won't    |

---

## 9.8. Inventory Adjustment

| FR ID      | Requirement                                                                      | Scope  | Priority |
| ---------- | -------------------------------------------------------------------------------- | ------ | -------- |
| FR-ADJ-001 | Warehouse phải có thể tạo Inventory Adjustment.                                  | MVP    | Must     |
| FR-ADJ-002 | Inventory Adjustment phải có reason bắt buộc.                                    | MVP    | Must     |
| FR-ADJ-003 | Inventory Adjustment phải có details theo MedicineBatch.                         | MVP    | Must     |
| FR-ADJ-004 | Adjustment quantity phải được validate để không làm quantity_remaining âm.       | MVP    | Must     |
| FR-ADJ-005 | Warehouse phải có thể confirm Inventory Adjustment.                              | MVP    | Must     |
| FR-ADJ-006 | Inventory Adjustment sau khi CONFIRMED không được sửa trực tiếp.                 | MVP    | Must     |
| FR-ADJ-007 | Hệ thống phải cập nhật MedicineBatch khi adjustment được confirm.                | MVP    | Must     |
| FR-ADJ-008 | Hệ thống phải ghi audit khi adjustment được confirm.                             | MVP    | Must     |
| FR-ADJ-009 | Correction nên thực hiện bằng reverse/correction adjustment thay vì xóa lịch sử. | MVP    | Should   |
| FR-ADJ-010 | Direct edit inventory quantity không được expose như nghiệp vụ MVP.              | MVP    | Must     |
| FR-ADJ-011 | Multi-step approval workflow cho adjustment không thuộc MVP.                     | Future | Won't    |

---

## 9.9. POS Draft Order

| FR ID      | Requirement                                                                                                                          | Scope       | Priority |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------- | -------- |
| FR-POS-001 | Staff phải có thể tạo Draft Order.                                                                                                   | MVP         | Must     |
| FR-POS-002 | Admin cũng có thể tạo Draft Order như Staff.                                                                                         | MVP         | Must     |
| FR-POS-003 | Draft Order phải hỗ trợ khách lẻ với customer nullable.                                                                              | MVP         | Must     |
| FR-POS-004 | Staff phải có thể thêm active Medicine vào Draft Order.                                                                              | MVP         | Must     |
| FR-POS-005 | Staff phải có thể cập nhật quantity của order item trong Draft Order.                                                                | MVP         | Must     |
| FR-POS-006 | Staff phải có thể xóa order item khỏi Draft Order.                                                                                   | MVP         | Must     |
| FR-POS-007 | Một Draft Order không nên có nhiều dòng trùng cùng Medicine; thêm lại cùng Medicine phải cập nhật quantity hoặc theo rule nhất quán. | MVP         | Must     |
| FR-POS-008 | POS phải hiển thị sellable stock của Medicine.                                                                                       | MVP         | Must     |
| FR-POS-009 | POS phải hiển thị sale-relevant availability warnings.                                                                               | MVP         | Should   |
| FR-POS-010 | Khi order item thay đổi, hệ thống phải kiểm tra lại interactions liên quan.                                                          | MVP         | Must     |
| FR-POS-011 | Staff phải có thể cancel Draft Order trong ownership scope.                                                                          | MVP         | Must     |
| FR-POS-012 | Admin phải có thể cancel mọi Draft Order.                                                                                            | MVP         | Must     |
| FR-POS-013 | PAID Order không được sửa item.                                                                                                      | MVP         | Must     |
| FR-POS-014 | CANCELLED Order không được checkout.                                                                                                 | MVP         | Must     |
| FR-POS-015 | Staff chỉ được xem Order do mình tạo hoặc xử lý.                                                                                     | MVP         | Must     |
| FR-POS-016 | Admin được xem tất cả Orders.                                                                                                        | MVP         | Must     |
| FR-POS-017 | Full Customer Management không phải MVP blocker.                                                                                     | Should-have | Should   |

---

## 9.10. Checkout

| FR ID      | Requirement                                                                                  | Scope | Priority |
| ---------- | -------------------------------------------------------------------------------------------- | ----- | -------- |
| FR-CHK-001 | Hệ thống phải cung cấp checkout command để hoàn tất Draft Order.                             | MVP   | Must     |
| FR-CHK-002 | Checkout phải yêu cầu user đã authenticated.                                                 | MVP   | Must     |
| FR-CHK-003 | Checkout phải kiểm tra permission và ownership.                                              | MVP   | Must     |
| FR-CHK-004 | Checkout phải hỗ trợ idempotency.                                                            | MVP   | Must     |
| FR-CHK-005 | Checkout phải lock hoặc kiểm soát concurrency với Order đang checkout.                       | MVP   | Must     |
| FR-CHK-006 | Checkout phải verify Order status là DRAFT.                                                  | MVP   | Must     |
| FR-CHK-007 | Checkout phải reject Order không có item.                                                    | MVP   | Must     |
| FR-CHK-008 | Checkout phải tính lại total ở backend.                                                      | MVP   | Must     |
| FR-CHK-009 | Checkout phải verify Medicine trong Order vẫn active hoặc xử lý theo rule nhất quán.         | MVP   | Must     |
| FR-CHK-010 | Checkout phải verify stock availability dựa trên sellable MedicineBatch.                     | MVP   | Must     |
| FR-CHK-011 | Checkout phải verify tất cả active HIGH InteractionAlerts đã acknowledgement.                | MVP   | Must     |
| FR-CHK-012 | Checkout phải verify tất cả active HIGH InteractionAlerts đã có consultation note.           | MVP   | Must     |
| FR-CHK-013 | Checkout phải apply FEFO khi trừ stock.                                                      | MVP   | Must     |
| FR-CHK-014 | Checkout phải tạo order item batch allocations.                                              | MVP   | Must     |
| FR-CHK-015 | Checkout phải deduct MedicineBatch quantity_remaining.                                       | MVP   | Must     |
| FR-CHK-016 | Checkout phải tạo payment attempt.                                                           | MVP   | Must     |
| FR-CHK-017 | Checkout chỉ mark Order thành PAID khi payment success.                                      | MVP   | Must     |
| FR-CHK-018 | Checkout phải tạo Invoice sau successful payment.                                            | MVP   | Must     |
| FR-CHK-019 | Checkout phải ghi audit cho nghiệp vụ hoàn tất đơn.                                          | MVP   | Must     |
| FR-CHK-020 | Nếu validation thất bại, Order phải vẫn là DRAFT và dữ liệu draft được giữ.                  | MVP   | Must     |
| FR-CHK-021 | Nếu checkout lỗi trong transaction, hệ thống phải rollback các thay đổi liên quan.           | MVP   | Must     |
| FR-CHK-022 | Checkout không được tạo duplicate successful payment khi retry cùng idempotency key/payload. | MVP   | Must     |
| FR-CHK-023 | Checkout không được trừ kho hai lần cho cùng một successful checkout.                        | MVP   | Must     |
| FR-CHK-024 | Public commands tách rời cho payment/invoice không được thay thế checkout.                   | MVP   | Must     |

---

## 9.11. Payment

| FR ID      | Requirement                                                                                 | Scope  | Priority |
| ---------- | ------------------------------------------------------------------------------------------- | ------ | -------- |
| FR-PAY-001 | Hệ thống phải hỗ trợ payment simulation trong checkout.                                     | MVP    | Must     |
| FR-PAY-002 | Payment status MVP chỉ gồm SUCCESS và FAILED.                                               | MVP    | Must     |
| FR-PAY-003 | Hệ thống phải cho phép lưu failed payment attempts.                                         | MVP    | Should   |
| FR-PAY-004 | Mỗi Order chỉ được có tối đa một successful payment.                                        | MVP    | Must     |
| FR-PAY-005 | Cash payment phải validate amount_tendered >= amount_due.                                   | MVP    | Must     |
| FR-PAY-006 | Cash payment phải tính change_amount ở backend.                                             | MVP    | Must     |
| FR-PAY-007 | Simulated bank transfer phải yêu cầu transaction_reference.                                 | MVP    | Must     |
| FR-PAY-008 | transaction_reference cho simulated bank transfer phải unique hoặc được kiểm soát để audit. | MVP    | Must     |
| FR-PAY-009 | Payment success không được sửa trực tiếp.                                                   | MVP    | Must     |
| FR-PAY-010 | Real bank integration không thuộc MVP.                                                      | Future | Won't    |
| FR-PAY-011 | Payment PENDING cho bank transfer không bắt buộc trong MVP.                                 | MVP    | Won't    |
| FR-PAY-012 | Refund không thuộc MVP.                                                                     | Future | Won't    |

---

## 9.12. Invoice

| FR ID      | Requirement                                                            | Scope  | Priority |
| ---------- | ---------------------------------------------------------------------- | ------ | -------- |
| FR-INV-001 | Hệ thống phải tạo Invoice sau successful payment.                      | MVP    | Must     |
| FR-INV-002 | Invoice phải gắn với một PAID Order.                                   | MVP    | Must     |
| FR-INV-003 | Mỗi PAID Order có tối đa một Invoice.                                  | MVP    | Must     |
| FR-INV-004 | Invoice phải lưu snapshot thông tin cần thiết tại thời điểm bán.       | MVP    | Must     |
| FR-INV-005 | User có quyền phù hợp phải có thể xem Invoice.                         | MVP    | Must     |
| FR-INV-006 | Staff chỉ xem Invoice thuộc ownership scope.                           | MVP    | Must     |
| FR-INV-007 | Admin được xem tất cả Invoices.                                        | MVP    | Must     |
| FR-INV-008 | Warehouse không được xem Invoice trong MVP.                            | MVP    | Must     |
| FR-INV-009 | Hệ thống không expose workflow tạo Invoice thủ công để hoàn tất order. | MVP    | Must     |
| FR-INV-010 | Invoice reversal/credit note không thuộc MVP.                          | Future | Won't    |

---

## 9.13. DrugInteraction

| FR ID      | Requirement                                                                                             | Scope  | Priority |
| ---------- | ------------------------------------------------------------------------------------------------------- | ------ | -------- |
| FR-DRG-001 | Admin phải có thể quản lý DrugInteraction Rule.                                                         | MVP    | Must     |
| FR-DRG-002 | DrugInteraction Rule phải được định nghĩa ở cấp ActiveIngredient–ActiveIngredient.                      | MVP    | Must     |
| FR-DRG-003 | Hệ thống phải tránh duplicate rule cho cặp A–B và B–A.                                                  | MVP    | Must     |
| FR-DRG-004 | Severity MVP phải hỗ trợ LOW, MEDIUM và HIGH.                                                           | MVP    | Must     |
| FR-DRG-005 | CRITICAL severity không thuộc MVP.                                                                      | Future | Won't    |
| FR-DRG-006 | Rule phải có description và recommendation để hiển thị alert.                                           | MVP    | Must     |
| FR-DRG-007 | Rule phải có active/inactive status.                                                                    | MVP    | Must     |
| FR-DRG-008 | Rule có lịch sử alert không được xóa cứng tùy tiện.                                                     | MVP    | Must     |
| FR-DRG-009 | Khi rule thay đổi, hệ thống phải tạo yêu cầu Graph Sync tương ứng.                                      | MVP    | Must     |
| FR-DRG-010 | Standalone interaction check có thể tồn tại cho Admin/demo utility nhưng không tạo order alert history. | MVP    | Should   |
| FR-DRG-011 | POS interaction check chính thức phải gắn với Order và persist InteractionAlert.                        | MVP    | Must     |

---

## 9.14. InteractionAlert

| FR ID      | Requirement                                                                                                  | Scope | Priority |
| ---------- | ------------------------------------------------------------------------------------------------------------ | ----- | -------- |
| FR-ALT-001 | Hệ thống phải persist mọi InteractionAlert đã hiển thị trong Order.                                          | MVP   | Must     |
| FR-ALT-002 | Mỗi Order + DrugInteraction Rule chỉ có một active InteractionAlert.                                         | MVP   | Must     |
| FR-ALT-003 | Nếu alert hiển thị lại, hệ thống phải cập nhật last_displayed_at và display_count hoặc metadata tương đương. | MVP   | Must     |
| FR-ALT-004 | InteractionAlert phải lưu severity snapshot.                                                                 | MVP   | Must     |
| FR-ALT-005 | InteractionAlert phải lưu description/recommendation snapshot.                                               | MVP   | Must     |
| FR-ALT-006 | Nếu interaction không còn áp dụng do order item thay đổi, alert phải chuyển inactive thay vì bị xóa.         | MVP   | Must     |
| FR-ALT-007 | LOW alert không bắt buộc acknowledgement hoặc consultation note.                                             | MVP   | Must     |
| FR-ALT-008 | MEDIUM alert không bắt buộc acknowledgement hoặc consultation note.                                          | MVP   | Must     |
| FR-ALT-009 | HIGH alert bắt buộc acknowledgement trước checkout.                                                          | MVP   | Must     |
| FR-ALT-010 | HIGH alert bắt buộc consultation note trước checkout.                                                        | MVP   | Must     |
| FR-ALT-011 | Mỗi HIGH alert phải có consultation note riêng.                                                              | MVP   | Must     |
| FR-ALT-012 | Staff/Admin có quyền bán hàng phải có thể acknowledge HIGH alert trong order.                                | MVP   | Must     |
| FR-ALT-013 | Staff/Admin có quyền bán hàng phải có thể nhập consultation note cho HIGH alert trong order.                 | MVP   | Must     |
| FR-ALT-014 | Admin phải có thể xem InteractionAlert History toàn hệ thống.                                                | MVP   | Must     |
| FR-ALT-015 | Warehouse không được xem InteractionAlert trong MVP.                                                         | MVP   | Must     |
| FR-ALT-016 | Checkout phải reject order có active HIGH alert chưa xử lý đủ.                                               | MVP   | Must     |

---

## 9.15. AI Copilot

| FR ID      | Requirement                                                                                        | Scope       | Priority |
| ---------- | -------------------------------------------------------------------------------------------------- | ----------- | -------- |
| FR-AIC-001 | Staff/Admin trong POS flow phải có thể yêu cầu AI giải thích InteractionAlert.                     | MVP         | Must     |
| FR-AIC-002 | AI Copilot phải tạo explanation mang tính tham khảo.                                               | MVP         | Must     |
| FR-AIC-003 | AI Copilot phải có thể tạo consultation note draft cho HIGH alert.                                 | MVP         | Must     |
| FR-AIC-004 | AI-generated draft không được tự động lưu thành official consultation note.                        | MVP         | Must     |
| FR-AIC-005 | User phải xác nhận trước khi nội dung AI draft được dùng làm official note.                        | MVP         | Must     |
| FR-AIC-006 | AI Copilot phải hiển thị hoặc trả disclaimer phù hợp rằng nội dung không thay thế chuyên gia y tế. | MVP         | Must     |
| FR-AIC-007 | AI Copilot phải dùng Google AI Provider khi provider khả dụng và configured.                       | MVP         | Must     |
| FR-AIC-008 | AI Copilot phải fallback sang MockAI khi provider thật lỗi/quota/timeout theo rule cấu hình.       | MVP         | Must     |
| FR-AIC-009 | AI response phải được ghi AI Audit theo yêu cầu audit.                                             | MVP         | Must     |
| FR-AIC-010 | AI-generated business report narrative là Should-have.                                             | Should-have | Should   |

---

## 9.16. AI Guardrail

| FR ID      | Requirement                                                                                           | Scope  | Priority |
| ---------- | ----------------------------------------------------------------------------------------------------- | ------ | -------- |
| FR-AIG-001 | Hệ thống phải áp dụng input guardrail trước khi gọi AI provider.                                      | MVP    | Must     |
| FR-AIG-002 | Hệ thống phải áp dụng output guardrail trước khi hiển thị AI response.                                | MVP    | Must     |
| FR-AIG-003 | Hệ thống phải chặn hoặc từ chối yêu cầu diagnosis.                                                    | MVP    | Must     |
| FR-AIG-004 | Hệ thống phải chặn hoặc từ chối yêu cầu prescribing.                                                  | MVP    | Must     |
| FR-AIG-005 | Hệ thống phải chặn hoặc từ chối yêu cầu dosage advice cụ thể.                                         | MVP    | Must     |
| FR-AIG-006 | Hệ thống phải chặn hoặc từ chối dangerous medical advice.                                             | MVP    | Must     |
| FR-AIG-007 | Hệ thống phải thực hiện PII minimization/redaction trước khi lưu audit hoặc gửi provider khi phù hợp. | MVP    | Must     |
| FR-AIG-008 | Hệ thống phải hỗ trợ structured output/schema validation cho AI response quan trọng.                  | MVP    | Must     |
| FR-AIG-009 | Khi AI output vi phạm guardrail, hệ thống không được hiển thị raw unsafe output.                      | MVP    | Must     |
| FR-AIG-010 | Khi guardrail block, hệ thống phải trả safe refusal response.                                         | MVP    | Must     |
| FR-AIG-011 | Guardrail status phải được ghi vào AI Audit.                                                          | MVP    | Must     |
| FR-AIG-012 | AI Cache không thuộc MVP.                                                                             | Future | Won't    |

---

## 9.17. AI Audit

| FR ID      | Requirement                                                                          | Scope | Priority |
| ---------- | ------------------------------------------------------------------------------------ | ----- | -------- |
| FR-AIA-001 | Hệ thống phải ghi AI Audit Log cho tác vụ AI quan trọng.                             | MVP   | Must     |
| FR-AIA-002 | AI Audit phải ghi action_type.                                                       | MVP   | Must     |
| FR-AIA-003 | AI Audit phải ghi user liên quan.                                                    | MVP   | Must     |
| FR-AIA-004 | AI Audit nên ghi order/interaction alert liên quan nếu có.                           | MVP   | Must     |
| FR-AIA-005 | AI Audit phải ghi provider_requested và provider_used.                               | MVP   | Must     |
| FR-AIA-006 | AI Audit phải ghi fallback_used và fallback_reason nếu fallback xảy ra.              | MVP   | Must     |
| FR-AIA-007 | AI Audit phải ghi prompt template/version.                                           | MVP   | Must     |
| FR-AIA-008 | AI Audit phải ghi input_guardrail_status.                                            | MVP   | Must     |
| FR-AIA-009 | AI Audit phải ghi output_guardrail_status.                                           | MVP   | Must     |
| FR-AIA-010 | AI Audit phải ghi schema_validation_status nếu áp dụng.                              | MVP   | Must     |
| FR-AIA-011 | AI Audit phải ghi status/error_code nếu lỗi.                                         | MVP   | Must     |
| FR-AIA-012 | AI Audit phải ghi latency_ms hoặc thông tin thời gian tương đương.                   | MVP   | Should   |
| FR-AIA-013 | AI Audit chỉ được lưu input_summary/output_summary đã giảm thiểu, không lưu raw PII. | MVP   | Must     |
| FR-AIA-014 | AI Audit retention trong MVP giữ trong lifecycle demo/project, không auto delete.    | MVP   | Must     |

---

## 9.18. Graph Sync

| FR ID      | Requirement                                                                                              | Scope       | Priority |
| ---------- | -------------------------------------------------------------------------------------------------------- | ----------- | -------- |
| FR-GSY-001 | Hệ thống phải đồng bộ dữ liệu graph từ PostgreSQL sang Neo4j.                                            | MVP         | Must     |
| FR-GSY-002 | PostgreSQL phải là source of truth cho Medicine.                                                         | MVP         | Must     |
| FR-GSY-003 | PostgreSQL phải là source of truth cho ActiveIngredient.                                                 | MVP         | Must     |
| FR-GSY-004 | PostgreSQL phải là source of truth cho Medicine–ActiveIngredient mapping.                                | MVP         | Must     |
| FR-GSY-005 | PostgreSQL phải là source of truth cho DrugInteraction Rule.                                             | MVP         | Must     |
| FR-GSY-006 | Graph Sync phải cover Medicine.                                                                          | MVP         | Must     |
| FR-GSY-007 | Graph Sync phải cover ActiveIngredient.                                                                  | MVP         | Must     |
| FR-GSY-008 | Graph Sync phải cover Medicine–ActiveIngredient mapping.                                                 | MVP         | Must     |
| FR-GSY-009 | Graph Sync phải cover DrugInteraction Rule.                                                              | MVP         | Must     |
| FR-GSY-010 | Graph Sync phải dùng outbox hoặc cơ chế tương đương để tránh mất sự kiện sync.                           | MVP         | Must     |
| FR-GSY-011 | Graph Sync worker phải retry khi sync thất bại.                                                          | MVP         | Must     |
| FR-GSY-012 | Graph Sync phải ghi attempt/log/audit cho sync.                                                          | MVP         | Must     |
| FR-GSY-013 | Graph Sync phải hỗ trợ freshness detection dựa trên source version/outbox state hoặc cơ chế tương đương. | MVP         | Must     |
| FR-GSY-014 | Deactivated projected entities/rules nên được giữ trong Neo4j với inactive flag.                         | MVP         | Must     |
| FR-GSY-015 | Normal graph queries chỉ trả active data.                                                                | MVP         | Must     |
| FR-GSY-016 | Graph Sync failure không được làm POS ngừng hoạt động.                                                   | MVP         | Must     |
| FR-GSY-017 | Admin Graph Sync Status/retry UI là Should-have, không phải MVP blocker.                                 | Should-have | Should   |

---

## 9.19. Graph-RAG

| FR ID      | Requirement                                                                                                             | Scope       | Priority |
| ---------- | ----------------------------------------------------------------------------------------------------------------------- | ----------- | -------- |
| FR-GRG-001 | Graph-RAG phải là module riêng, không gộp mơ hồ vào AI Copilot.                                                         | MVP         | Must     |
| FR-GRG-002 | Graph-RAG phải dùng Neo4j projection khi graph fresh và available.                                                      | MVP         | Must     |
| FR-GRG-003 | Graph-RAG phải kiểm tra graph freshness trước khi dùng kết quả graph quan trọng.                                        | MVP         | Must     |
| FR-GRG-004 | Với interaction explanation, nếu graph stale/unavailable, hệ thống phải fallback sang PostgreSQL authoritative context. | MVP         | Must     |
| FR-GRG-005 | Response fallback phải thể hiện graph không được dùng hoặc có degraded/freshness indicator.                             | MVP         | Must     |
| FR-GRG-006 | Pure graph query không có relational fallback phải trả safe error nếu graph unavailable/stale.                          | MVP         | Must     |
| FR-GRG-007 | Staff không được submit raw Cypher.                                                                                     | MVP         | Must     |
| FR-GRG-008 | Graph-RAG query phải bị giới hạn bởi permission và data scope.                                                          | MVP         | Must     |
| FR-GRG-009 | Graph-RAG phải không đưa ra diagnosis/prescribing/dosage advice.                                                        | MVP         | Must     |
| FR-GRG-010 | Graph visualization nâng cao là Should-have/Future.                                                                     | Should-have | Should   |

---

## 9.20. Reports

| FR ID      | Requirement                                                                                                                 | Scope       | Priority |
| ---------- | --------------------------------------------------------------------------------------------------------------------------- | ----------- | -------- |
| FR-RPT-001 | Hệ thống phải cung cấp Revenue Report.                                                                                      | MVP         | Must     |
| FR-RPT-002 | Revenue Report chỉ tính Orders PAID và Payment SUCCESS.                                                                     | MVP         | Must     |
| FR-RPT-003 | Revenue Report không tính DRAFT Orders.                                                                                     | MVP         | Must     |
| FR-RPT-004 | Revenue Report không tính CANCELLED Orders.                                                                                 | MVP         | Must     |
| FR-RPT-005 | Revenue Report không tính FAILED payments như revenue.                                                                      | MVP         | Must     |
| FR-RPT-006 | Hệ thống phải cung cấp Top Medicines Report.                                                                                | MVP         | Must     |
| FR-RPT-007 | Top Medicines Report phải mặc định xếp theo quantity sold hoặc rule rõ ràng.                                                | MVP         | Must     |
| FR-RPT-008 | Top Medicines Report có thể hiển thị thêm revenue nếu có dữ liệu.                                                           | MVP         | Should   |
| FR-RPT-009 | Hệ thống phải cung cấp Inventory Report.                                                                                    | MVP         | Must     |
| FR-RPT-010 | Inventory Report phải dựa trên MedicineBatch.                                                                               | MVP         | Must     |
| FR-RPT-011 | Inventory Report phải hiển thị total quantity, sellable quantity, expired quantity, low-stock và near-expiry ở mức phù hợp. | MVP         | Must     |
| FR-RPT-012 | Reports MVP phải deterministic và không phụ thuộc AI.                                                                       | MVP         | Must     |
| FR-RPT-013 | Staff không xem general low-stock/near-expiry dashboard.                                                                    | MVP         | Must     |
| FR-RPT-014 | Admin và Warehouse có thể xem operational low-stock/near-expiry information.                                                | MVP         | Must     |
| FR-RPT-015 | AI-generated business report narrative là Should-have.                                                                      | Should-have | Should   |
| FR-RPT-016 | Advanced analytics/forecasting là Future hoặc Should-have.                                                                  | Future      | Could    |

---

## 9.21. System Settings

| FR ID      | Requirement                                                                          | Scope       | Priority |
| ---------- | ------------------------------------------------------------------------------------ | ----------- | -------- |
| FR-SET-001 | Admin phải có thể xem System Settings MVP.                                           | MVP         | Must     |
| FR-SET-002 | Admin phải có thể cấu hình near-expiry threshold.                                    | MVP         | Must     |
| FR-SET-003 | Default near-expiry threshold phải là 90 ngày.                                       | MVP         | Must     |
| FR-SET-004 | withinDays trong report/filter chỉ là query override, không thay đổi system setting. | MVP         | Must     |
| FR-SET-005 | Thay đổi System Settings quan trọng phải có audit.                                   | MVP         | Should   |
| FR-SET-006 | Admin AI provider/model configuration UI là Should-have.                             | Should-have | Should   |
| FR-SET-007 | Admin prompt editing UI là Should-have.                                              | Should-have | Should   |
| FR-SET-008 | Full system configuration portal không thuộc MVP.                                    | Future      | Could    |

---

## 9.22. Demo Reset

| FR ID      | Requirement                                                                        | Scope | Priority |
| ---------- | ---------------------------------------------------------------------------------- | ----- | -------- |
| FR-DMO-001 | Hệ thống phải có curated operational seed phục vụ demo.                            | MVP   | Must     |
| FR-DMO-002 | Demo seed phải có Admin, Staff và Warehouse accounts.                              | MVP   | Must     |
| FR-DMO-003 | Demo seed có thể có new-staff account với first-login flow để demo.                | MVP   | Should   |
| FR-DMO-004 | Demo seed phải có Medicine, ActiveIngredient và mappings.                          | MVP   | Must     |
| FR-DMO-005 | Demo seed phải có Supplier.                                                        | MVP   | Must     |
| FR-DMO-006 | Demo seed phải có Stock Import và MedicineBatch.                                   | MVP   | Must     |
| FR-DMO-007 | Demo seed phải có near-expiry, normal và expired batch cases.                      | MVP   | Must     |
| FR-DMO-008 | Demo seed phải có multi-batch FEFO scenario.                                       | MVP   | Must     |
| FR-DMO-009 | Demo seed phải có Inventory Adjustment case.                                       | MVP   | Must     |
| FR-DMO-010 | Demo seed phải có LOW/MEDIUM/HIGH interaction scenarios.                           | MVP   | Must     |
| FR-DMO-011 | Demo seed phải có PAID order với successful payment, invoice và batch allocations. | MVP   | Must     |
| FR-DMO-012 | Demo seed phải có dữ liệu reports đủ để demo.                                      | MVP   | Must     |
| FR-DMO-013 | Demo graph data phải được projected từ PostgreSQL qua Graph Sync/rebuild.          | MVP   | Must     |
| FR-DMO-014 | Demo reset workflow phải chỉ chạy local.                                           | MVP   | Must     |
| FR-DMO-015 | Demo reset phải refuse demo/staging/production/unknown environment.                | MVP   | Must     |
| FR-DMO-016 | Demo reset phải chạy smoke tests hoặc checks tương đương sau reset.                | MVP   | Must     |

---

# 10. Non-functional Requirements

Non-functional requirements dùng mã:

```text
NFR-[GROUP]-[NUMBER]
```

---

## 10.1. Security

| NFR ID      | Requirement                                                           | Scope | Priority |
| ----------- | --------------------------------------------------------------------- | ----- | -------- |
| NFR-SEC-001 | Hệ thống phải dùng Supabase Auth cho authentication.                  | MVP   | Must     |
| NFR-SEC-002 | Backend phải verify access token cho protected operations.            | MVP   | Must     |
| NFR-SEC-003 | Hệ thống không lưu password/password_hash trong PostgreSQL nghiệp vụ. | MVP   | Must     |
| NFR-SEC-004 | Backend không được tin role/permission từ frontend gửi lên.           | MVP   | Must     |
| NFR-SEC-005 | Protected operations phải kiểm tra permission server-side.            | MVP   | Must     |
| NFR-SEC-006 | Staff-owned resources phải kiểm tra ownership server-side.            | MVP   | Must     |
| NFR-SEC-007 | AI Audit không được lưu raw PII.                                      | MVP   | Must     |
| NFR-SEC-008 | Raw Cypher không được expose cho Staff.                               | MVP   | Must     |
| NFR-SEC-009 | Demo reset phải có environment guard.                                 | MVP   | Must     |

---

## 10.2. Reliability

| NFR ID      | Requirement                                                   | Scope | Priority |
| ----------- | ------------------------------------------------------------- | ----- | -------- |
| NFR-REL-001 | Checkout phải dùng transaction để đảm bảo consistency.        | MVP   | Must     |
| NFR-REL-002 | Checkout phải support idempotency để tránh double-processing. | MVP   | Must     |
| NFR-REL-003 | Graph Sync failure không được làm POS ngừng hoạt động.        | MVP   | Must     |
| NFR-REL-004 | AI provider failure phải có fallback hoặc safe error.         | MVP   | Must     |
| NFR-REL-005 | Demo reset phải tái tạo trạng thái demo ổn định.              | MVP   | Must     |
| NFR-REL-006 | Failed payment attempts có thể được ghi nhận để truy vết.     | MVP   | Should   |
| NFR-REL-007 | Graph Sync worker phải retry failed jobs theo policy phù hợp. | MVP   | Must     |

---

## 10.3. Performance

| NFR ID       | Requirement                                                                                              | Scope | Priority |
| ------------ | -------------------------------------------------------------------------------------------------------- | ----- | -------- |
| NFR-PERF-001 | POS search/select Medicine phải đủ nhanh để phục vụ demo bán hàng.                                       | MVP   | Must     |
| NFR-PERF-002 | Checkout phải hoàn tất trong thời gian chấp nhận được cho demo, trừ khi provider/payment simulation lỗi. | MVP   | Must     |
| NFR-PERF-003 | Interaction checking trong Draft Order phải phản hồi đủ nhanh để không cản trở POS flow.                 | MVP   | Must     |
| NFR-PERF-004 | Reports MVP phải load được với demo dataset.                                                             | MVP   | Must     |
| NFR-PERF-005 | AI requests phải có timeout để không treo UI.                                                            | MVP   | Must     |
| NFR-PERF-006 | Graph queries phải có limit/time control ở mức thiết kế.                                                 | MVP   | Should   |

---

## 10.4. Usability

| NFR ID      | Requirement                                                              | Scope | Priority |
| ----------- | ------------------------------------------------------------------------ | ----- | -------- |
| NFR-USE-001 | UI phải phân biệt rõ menu/chức năng theo role.                           | MVP   | Must     |
| NFR-USE-002 | POS phải hỗ trợ thao tác nhanh cho Staff.                                | MVP   | Must     |
| NFR-USE-003 | Checkout validation fail phải giữ Draft Order để user sửa.               | MVP   | Must     |
| NFR-USE-004 | HIGH alert UI phải thể hiện rõ cần acknowledgement và consultation note. | MVP   | Must     |
| NFR-USE-005 | AI output phải có disclaimer phù hợp.                                    | MVP   | Must     |
| NFR-USE-006 | Error messages phải đủ rõ để user biết cần sửa gì.                       | MVP   | Should   |
| NFR-USE-007 | UI phải phù hợp desktop/laptop Chrome.                                   | MVP   | Must     |

---

## 10.5. Maintainability

| NFR ID      | Requirement                                                                       | Scope | Priority |
| ----------- | --------------------------------------------------------------------------------- | ----- | -------- |
| NFR-MTN-001 | Backend phải tổ chức module boundaries rõ ràng.                                   | MVP   | Must     |
| NFR-MTN-002 | Business logic quan trọng không được hard-code rải rác trong UI.                  | MVP   | Must     |
| NFR-MTN-003 | Provider AI phải được abstract/configurable, không hard-code vào business module. | MVP   | Must     |
| NFR-MTN-004 | Graph Sync logic phải tách khỏi CRUD nghiệp vụ chính.                             | MVP   | Should   |
| NFR-MTN-005 | Requirement IDs phải trace được sang Use Case/API/ERD/UI/Testing.                 | MVP   | Must     |
| NFR-MTN-006 | Prisma schema/migration phải phản ánh đúng baseline.                              | MVP   | Must     |

---

## 10.6. Auditability

| NFR ID      | Requirement                                                                    | Scope           | Priority |
| ----------- | ------------------------------------------------------------------------------ | --------------- | -------- |
| NFR-AUD-001 | Hệ thống phải audit các nghiệp vụ quan trọng.                                  | MVP             | Must     |
| NFR-AUD-002 | Stock Import confirm/cancel phải có audit.                                     | MVP             | Must     |
| NFR-AUD-003 | Inventory Adjustment confirm phải có audit.                                    | MVP             | Must     |
| NFR-AUD-004 | Checkout success/failure quan trọng phải có audit.                             | MVP             | Must     |
| NFR-AUD-005 | HIGH alert acknowledgement và consultation note phải truy vết được actor/time. | MVP             | Must     |
| NFR-AUD-006 | AI operations quan trọng phải có AI Audit.                                     | MVP             | Must     |
| NFR-AUD-007 | Graph Sync attempts/failures phải được log/audit.                              | MVP             | Must     |
| NFR-AUD-008 | Generic System Audit Log UI là Should-have, nhưng backend audit vẫn mandatory. | MVP/Should-have | Must     |

---

## 10.7. Safety

| NFR ID       | Requirement                                                                     | Scope | Priority |
| ------------ | ------------------------------------------------------------------------------- | ----- | -------- |
| NFR-SAFE-001 | AI không được chẩn đoán bệnh.                                                   | MVP   | Must     |
| NFR-SAFE-002 | AI không được kê đơn.                                                           | MVP   | Must     |
| NFR-SAFE-003 | AI không được đưa liều dùng cụ thể.                                             | MVP   | Must     |
| NFR-SAFE-004 | AI không được thay thế chuyên gia y tế.                                         | MVP   | Must     |
| NFR-SAFE-005 | HIGH InteractionAlert chưa xử lý đủ phải block checkout.                        | MVP   | Must     |
| NFR-SAFE-006 | Batch hết hạn không được bán.                                                   | MVP   | Must     |
| NFR-SAFE-007 | Graph stale không được dùng cho output quan trọng mà không có fallback/warning. | MVP   | Must     |
| NFR-SAFE-008 | Interaction explanation phải có disclaimer hoặc language phù hợp.               | MVP   | Should   |

---

## 10.8. Data Integrity

| NFR ID       | Requirement                                                       | Scope | Priority |
| ------------ | ----------------------------------------------------------------- | ----- | -------- |
| NFR-DINT-001 | MedicineBatch quantity_remaining không được âm.                   | MVP   | Must     |
| NFR-DINT-002 | Confirm Stock Import không được cộng kho hai lần.                 | MVP   | Must     |
| NFR-DINT-003 | Checkout không được trừ kho hai lần cho cùng successful checkout. | MVP   | Must     |
| NFR-DINT-004 | Mỗi Order chỉ có tối đa một successful payment.                   | MVP   | Must     |
| NFR-DINT-005 | Mỗi PAID Order có tối đa một Invoice.                             | MVP   | Must     |
| NFR-DINT-006 | Mỗi Order + Interaction có tối đa một active InteractionAlert.    | MVP   | Must     |
| NFR-DINT-007 | Interaction rule pair phải tránh duplicate A–B/B–A.               | MVP   | Must     |
| NFR-DINT-008 | Batch expiry mismatch phải bị reject.                             | MVP   | Must     |
| NFR-DINT-009 | Idempotency payload mismatch phải được phát hiện.                 | MVP   | Must     |
| NFR-DINT-010 | PostgreSQL vẫn là source of truth khi Neo4j lỗi.                  | MVP   | Must     |

---

# 11. Business Rules

Business rules dùng mã:

```text
BR-[GROUP]-[NUMBER]
```

## 11.1. Auth & Authorization Rules

| BR ID       | Business Rule                                                | Scope |
| ----------- | ------------------------------------------------------------ | ----- |
| BR-AUTH-001 | Authentication chính thức dùng Supabase Auth.                | MVP   |
| BR-AUTH-002 | PostgreSQL không lưu password/password_hash.                 | MVP   |
| BR-AUTH-003 | Một user có thể có nhiều role.                               | MVP   |
| BR-AUTH-004 | Permission hiệu lực là hợp các permissions của roles active. | MVP   |
| BR-AUTH-005 | Backend kiểm tra authentication, permission và ownership.    | MVP   |
| BR-AUTH-006 | Frontend ẩn menu không phải biện pháp bảo mật chính.         | MVP   |
| BR-AUTH-007 | Staff chỉ xem order mình tạo hoặc xử lý.                     | MVP   |
| BR-AUTH-008 | Admin xem toàn bộ order.                                     | MVP   |
| BR-AUTH-009 | Warehouse không truy cập interaction alerts trong MVP.       | MVP   |
| BR-AUTH-010 | Warehouse không truy cập Graph Explorer trong MVP.           | MVP   |

## 11.2. Medicine & ActiveIngredient Rules

| BR ID      | Business Rule                                                        | Scope |
| ---------- | -------------------------------------------------------------------- | ----- |
| BR-MED-001 | Medicine là entity nghiệp vụ lõi trong MVP.                          | MVP   |
| BR-MED-002 | selling_price phải lớn hơn 0.                                        | MVP   |
| BR-MED-003 | Medicine có lịch sử không nên bị xóa cứng.                           | MVP   |
| BR-MED-004 | ActiveIngredient là entity lõi trong MVP.                            | MVP   |
| BR-MED-005 | Medicine phải mapping với ActiveIngredient để kiểm tra interaction.  | MVP   |
| BR-MED-006 | Scraped ingredients không tự động thành ActiveIngredient chính thức. | MVP   |

## 11.3. Supplier Rules

| BR ID      | Business Rule                                                  | Scope |
| ---------- | -------------------------------------------------------------- | ----- |
| BR-SUP-001 | Supplier Management thuộc MVP.                                 | MVP   |
| BR-SUP-002 | Warehouse được xem/tạo/cập nhật Supplier.                      | MVP   |
| BR-SUP-003 | Chỉ Admin được deactivate Supplier.                            | MVP   |
| BR-SUP-004 | Supplier có lịch sử nhập kho không nên bị xóa cứng.            | MVP   |
| BR-SUP-005 | Supplier dùng trong Stock Import phải hợp lệ/active theo rule. | MVP   |

## 11.4. Inventory Rules

| BR ID      | Business Rule                                                        | Scope |
| ---------- | -------------------------------------------------------------------- | ----- |
| BR-INV-001 | MedicineBatch là source of truth cho inventory.                      | MVP   |
| BR-INV-002 | Aggregate inventory không phải source of truth.                      | MVP   |
| BR-INV-003 | batch_number bắt buộc.                                               | MVP   |
| BR-INV-004 | expiry_date bắt buộc.                                                | MVP   |
| BR-INV-005 | quantity_remaining không được âm.                                    | MVP   |
| BR-INV-006 | Batch hết hạn không tính vào sellable stock.                         | MVP   |
| BR-INV-007 | Low-stock tính từ sellable_quantity.                                 | MVP   |
| BR-INV-008 | Near-expiry threshold mặc định 90 ngày.                              | MVP   |
| BR-INV-009 | Inventory Adjustment là cách điều chỉnh tồn kho thủ công chính thức. | MVP   |
| BR-INV-010 | Direct edit inventory quantity không được dùng trong MVP.            | MVP   |

## 11.5. Stock Import Rules

| BR ID      | Business Rule                                                               | Scope |
| ---------- | --------------------------------------------------------------------------- | ----- |
| BR-STI-001 | Stock Import status gồm DRAFT, CONFIRMED, CANCELLED.                        | MVP   |
| BR-STI-002 | DRAFT có thể sửa.                                                           | MVP   |
| BR-STI-003 | CONFIRMED không được sửa tự do.                                             | MVP   |
| BR-STI-004 | CONFIRMED không được confirm lần hai.                                       | MVP   |
| BR-STI-005 | Confirm mới cập nhật MedicineBatch.                                         | MVP   |
| BR-STI-006 | Detail phải có batch number và expiry date.                                 | MVP   |
| BR-STI-007 | Quantity nhập phải lớn hơn 0.                                               | MVP   |
| BR-STI-008 | Batch merge chỉ khi medicine, normalized batch number và expiry date match. | MVP   |
| BR-STI-009 | Expiry mismatch phải reject.                                                | MVP   |
| BR-STI-010 | Confirm/cancel phải audit.                                                  | MVP   |

## 11.6. Inventory Adjustment Rules

| BR ID      | Business Rule                                      | Scope |
| ---------- | -------------------------------------------------- | ----- |
| BR-ADJ-001 | Inventory Adjustment phải có reason.               | MVP   |
| BR-ADJ-002 | Adjustment phải theo MedicineBatch.                | MVP   |
| BR-ADJ-003 | Adjustment không được làm quantity âm.             | MVP   |
| BR-ADJ-004 | Confirmed adjustment không được sửa trực tiếp.     | MVP   |
| BR-ADJ-005 | Correction nên dùng reverse/correction adjustment. | MVP   |
| BR-ADJ-006 | Adjustment confirm phải audit.                     | MVP   |

## 11.7. Sales & Checkout Rules

| BR ID        | Business Rule                                                          | Scope |
| ------------ | ---------------------------------------------------------------------- | ----- |
| BR-SALES-001 | Order status MVP gồm DRAFT, PAID, CANCELLED.                           | MVP   |
| BR-SALES-002 | Không dùng READY_FOR_CHECKOUT, PENDING, SHIPPING, COMPLETED trong MVP. | MVP   |
| BR-SALES-003 | Staff cancel DRAFT trong ownership scope.                              | MVP   |
| BR-SALES-004 | Admin cancel mọi DRAFT.                                                | MVP   |
| BR-SALES-005 | PAID Order immutable trong MVP.                                        | MVP   |
| BR-SALES-006 | Checkout là command nghiệp vụ chính thức.                              | MVP   |
| BR-SALES-007 | Checkout phải transaction.                                             | MVP   |
| BR-SALES-008 | Checkout phải idempotent.                                              | MVP   |
| BR-SALES-009 | Checkout phải verify HIGH alerts.                                      | MVP   |
| BR-SALES-010 | Checkout phải apply FEFO.                                              | MVP   |
| BR-SALES-011 | Checkout phải tạo payment và invoice trong cùng flow.                  | MVP   |
| BR-SALES-012 | Nếu checkout validation fail, Draft Order được giữ.                    | MVP   |

## 11.8. Payment & Invoice Rules

| BR ID      | Business Rule                                       | Scope  |
| ---------- | --------------------------------------------------- | ------ |
| BR-PAY-001 | Payment MVP là simulation.                          | MVP    |
| BR-PAY-002 | Payment status MVP gồm SUCCESS và FAILED.           | MVP    |
| BR-PAY-003 | Mỗi order tối đa một successful payment.            | MVP    |
| BR-PAY-004 | Failed attempts có thể lưu.                         | MVP    |
| BR-PAY-005 | Cash amount_tendered phải >= amount_due.            | MVP    |
| BR-PAY-006 | change_amount do backend tính.                      | MVP    |
| BR-PAY-007 | Bank transfer simulation cần transaction_reference. | MVP    |
| BR-PAY-008 | Invoice chỉ tạo sau successful payment.             | MVP    |
| BR-PAY-009 | Mỗi PAID order có một invoice.                      | MVP    |
| BR-PAY-010 | Refund/return ngoài MVP.                            | Future |

## 11.9. Interaction Rules

| BR ID      | Business Rule                                                 | Scope  |
| ---------- | ------------------------------------------------------------- | ------ |
| BR-INT-001 | DrugInteraction Rule ở cấp ActiveIngredient–ActiveIngredient. | MVP    |
| BR-INT-002 | Medicine–Medicine rule không phải official rule.              | MVP    |
| BR-INT-003 | Severity MVP gồm LOW, MEDIUM, HIGH.                           | MVP    |
| BR-INT-004 | CRITICAL không thuộc MVP.                                     | Future |
| BR-INT-005 | A–B và B–A là cùng một interaction.                           | MVP    |
| BR-INT-006 | Rule có lịch sử không xóa cứng tùy tiện.                      | MVP    |
| BR-INT-007 | POS interaction check phải gắn Order và persist alert.        | MVP    |

## 11.10. InteractionAlert Rules

| BR ID      | Business Rule                                 | Scope |
| ---------- | --------------------------------------------- | ----- |
| BR-ALT-001 | Persist mọi alert đã hiển thị.                | MVP   |
| BR-ALT-002 | Order + interaction chỉ có một active alert.  | MVP   |
| BR-ALT-003 | Alert hiển thị lại cập nhật display metadata. | MVP   |
| BR-ALT-004 | Alert không còn áp dụng chuyển inactive.      | MVP   |
| BR-ALT-005 | LOW/MEDIUM không block checkout.              | MVP   |
| BR-ALT-006 | HIGH cần acknowledgement.                     | MVP   |
| BR-ALT-007 | HIGH cần consultation note.                   | MVP   |
| BR-ALT-008 | Mỗi HIGH alert cần note riêng.                | MVP   |
| BR-ALT-009 | HIGH unresolved block checkout.               | MVP   |
| BR-ALT-010 | Warehouse không truy cập alert.               | MVP   |

## 11.11. AI Rules

| BR ID     | Business Rule                               | Scope  |
| --------- | ------------------------------------------- | ------ |
| BR-AI-001 | Google AI Provider là provider ưu tiên.     | MVP    |
| BR-AI-002 | MockAI là fallback.                         | MVP    |
| BR-AI-003 | AI explanation chỉ mang tính tham khảo.     | MVP    |
| BR-AI-004 | AI không chẩn đoán bệnh.                    | MVP    |
| BR-AI-005 | AI không kê đơn.                            | MVP    |
| BR-AI-006 | AI không đưa liều dùng cụ thể.              | MVP    |
| BR-AI-007 | AI không thay thế chuyên gia y tế.          | MVP    |
| BR-AI-008 | AI draft không tự động thành official note. | MVP    |
| BR-AI-009 | AI phải có guardrail.                       | MVP    |
| BR-AI-010 | AI Audit không lưu raw PII.                 | MVP    |
| BR-AI-011 | Prompt template có version.                 | MVP    |
| BR-AI-012 | AI Cache ngoài MVP.                         | Future |

## 11.12. Graph Rules

| BR ID      | Business Rule                                                            | Scope |
| ---------- | ------------------------------------------------------------------------ | ----- |
| BR-GPH-001 | PostgreSQL là source of truth.                                           | MVP   |
| BR-GPH-002 | Neo4j là graph projection.                                               | MVP   |
| BR-GPH-003 | Core graph MVP gồm Medicine, ActiveIngredient, CONTAINS, INTERACTS_WITH. | MVP   |
| BR-GPH-004 | Graph Sync là MVP.                                                       | MVP   |
| BR-GPH-005 | Graph Sync phải có outbox/worker/retry/audit/freshness detection.        | MVP   |
| BR-GPH-006 | Graph-RAG là module riêng.                                               | MVP   |
| BR-GPH-007 | Graph stale/unavailable fallback PostgreSQL cho interaction explanation. | MVP   |
| BR-GPH-008 | Pure graph query không fallback được trả safe error.                     | MVP   |
| BR-GPH-009 | Staff không submit raw Cypher.                                           | MVP   |
| BR-GPH-010 | Graph enrichment nodes không ảnh hưởng checkout MVP.                     | MVP   |

---

# 12. Data Requirements

## 12.1. Identity data

| DR ID     | Data Requirement                                                                                        | Scope |
| --------- | ------------------------------------------------------------------------------------------------------- | ----- |
| DR-ID-001 | Hệ thống phải lưu user profile nội bộ liên kết Supabase user ID.                                        | MVP   |
| DR-ID-002 | Hệ thống phải lưu roles.                                                                                | MVP   |
| DR-ID-003 | Hệ thống phải lưu permissions.                                                                          | MVP   |
| DR-ID-004 | Hệ thống phải lưu user-role mappings.                                                                   | MVP   |
| DR-ID-005 | Hệ thống phải lưu role-permission mappings.                                                             | MVP   |
| DR-ID-006 | Actor fields như created_by, updated_by, processed_by, acknowledged_by phải dùng user identity phù hợp. | MVP   |

## 12.2. Medicine and ingredient data

| DR ID      | Data Requirement                                      | Scope |
| ---------- | ----------------------------------------------------- | ----- |
| DR-MED-001 | Hệ thống phải lưu Medicine core data.                 | MVP   |
| DR-MED-002 | Hệ thống phải lưu Medicine active/inactive status.    | MVP   |
| DR-MED-003 | Hệ thống phải lưu selling_price > 0.                  | MVP   |
| DR-MED-004 | Hệ thống phải lưu min_stock hoặc dữ liệu tương đương. | MVP   |
| DR-MED-005 | Hệ thống phải lưu ActiveIngredient.                   | MVP   |
| DR-MED-006 | Hệ thống phải lưu Medicine–ActiveIngredient mapping.  | MVP   |
| DR-MED-007 | Hệ thống có thể lưu amount_text cho mapping.          | MVP   |

## 12.3. Supplier data

| DR ID      | Data Requirement                                         | Scope |
| ---------- | -------------------------------------------------------- | ----- |
| DR-SUP-001 | Hệ thống phải lưu Supplier core data.                    | MVP   |
| DR-SUP-002 | Hệ thống phải lưu Supplier active/inactive status.       | MVP   |
| DR-SUP-003 | Supplier có liên quan Stock Import không bị hard delete. | MVP   |

## 12.4. Inventory data

| DR ID      | Data Requirement                                   | Scope |
| ---------- | -------------------------------------------------- | ----- |
| DR-INV-001 | Hệ thống phải lưu MedicineBatch.                   | MVP   |
| DR-INV-002 | MedicineBatch phải lưu medicine reference.         | MVP   |
| DR-INV-003 | MedicineBatch phải lưu batch_number.               | MVP   |
| DR-INV-004 | MedicineBatch phải lưu normalized_batch_number.    | MVP   |
| DR-INV-005 | MedicineBatch phải lưu expiry_date.                | MVP   |
| DR-INV-006 | MedicineBatch phải lưu quantity_remaining.         | MVP   |
| DR-INV-007 | MedicineBatch quantity_remaining không âm.         | MVP   |
| DR-INV-008 | Hệ thống phải lưu Stock Import và details.         | MVP   |
| DR-INV-009 | Hệ thống phải lưu Inventory Adjustment và details. | MVP   |
| DR-INV-010 | Hệ thống phải lưu order item batch allocations.    | MVP   |

## 12.5. Sales data

| DR ID        | Data Requirement                                          | Scope |
| ------------ | --------------------------------------------------------- | ----- |
| DR-SALES-001 | Hệ thống phải lưu Orders.                                 | MVP   |
| DR-SALES-002 | Order status MVP gồm DRAFT, PAID, CANCELLED.              | MVP   |
| DR-SALES-003 | Hệ thống phải lưu Order Items.                            | MVP   |
| DR-SALES-004 | Hệ thống phải lưu created_by và processed_by khi phù hợp. | MVP   |
| DR-SALES-005 | Hệ thống phải lưu Payment attempts.                       | MVP   |
| DR-SALES-006 | Hệ thống phải lưu Invoice.                                | MVP   |
| DR-SALES-007 | Hệ thống phải lưu Invoice snapshot data.                  | MVP   |
| DR-SALES-008 | Hệ thống phải lưu Idempotency Records cho checkout.       | MVP   |

## 12.6. Interaction data

| DR ID      | Data Requirement                                             | Scope |
| ---------- | ------------------------------------------------------------ | ----- |
| DR-INT-001 | Hệ thống phải lưu DrugInteraction Rule.                      | MVP   |
| DR-INT-002 | DrugInteraction Rule phải tham chiếu ActiveIngredient pair.  | MVP   |
| DR-INT-003 | DrugInteraction Rule phải lưu severity.                      | MVP   |
| DR-INT-004 | DrugInteraction Rule phải lưu description/recommendation.    | MVP   |
| DR-INT-005 | DrugInteraction Rule phải lưu active/inactive status.        | MVP   |
| DR-ALT-001 | Hệ thống phải lưu InteractionAlert.                          | MVP   |
| DR-ALT-002 | InteractionAlert phải lưu order reference.                   | MVP   |
| DR-ALT-003 | InteractionAlert phải lưu interaction reference.             | MVP   |
| DR-ALT-004 | InteractionAlert phải lưu snapshots.                         | MVP   |
| DR-ALT-005 | InteractionAlert phải lưu acknowledgement fields cho HIGH.   | MVP   |
| DR-ALT-006 | InteractionAlert phải lưu consultation note fields cho HIGH. | MVP   |
| DR-ALT-007 | InteractionAlert phải lưu active/inactive status.            | MVP   |

## 12.7. AI data

| DR ID     | Data Requirement                                                                | Scope |
| --------- | ------------------------------------------------------------------------------- | ----- |
| DR-AI-001 | Hệ thống phải lưu Prompt Templates.                                             | MVP   |
| DR-AI-002 | Prompt Templates phải có version.                                               | MVP   |
| DR-AI-003 | Hệ thống phải lưu AI Audit Log.                                                 | MVP   |
| DR-AI-004 | AI Audit Log phải lưu provider_requested/provider_used.                         | MVP   |
| DR-AI-005 | AI Audit Log phải lưu fallback metadata.                                        | MVP   |
| DR-AI-006 | AI Audit Log phải lưu guardrail statuses.                                       | MVP   |
| DR-AI-007 | AI Audit Log không lưu raw PII.                                                 | MVP   |
| DR-AI-008 | Provider/model configuration phải có thể cấu hình qua env hoặc database config. | MVP   |

## 12.8. Graph data

| DR ID      | Data Requirement                                                             | Scope |
| ---------- | ---------------------------------------------------------------------------- | ----- |
| DR-GPH-001 | Hệ thống phải lưu Graph Sync Outbox hoặc cơ chế tương đương.                 | MVP   |
| DR-GPH-002 | Hệ thống phải lưu Graph Sync attempts/logs.                                  | MVP   |
| DR-GPH-003 | Hệ thống phải lưu source version/freshness metadata hoặc cơ chế tương đương. | MVP   |
| DR-GPH-004 | Neo4j projection phải lưu Medicine nodes.                                    | MVP   |
| DR-GPH-005 | Neo4j projection phải lưu ActiveIngredient nodes.                            | MVP   |
| DR-GPH-006 | Neo4j projection phải lưu CONTAINS relationships.                            | MVP   |
| DR-GPH-007 | Neo4j projection phải lưu INTERACTS_WITH relationships.                      | MVP   |

## 12.9. Settings and demo data

| DR ID      | Data Requirement                                                                                          | Scope |
| ---------- | --------------------------------------------------------------------------------------------------------- | ----- |
| DR-SET-001 | Hệ thống phải lưu near-expiry threshold.                                                                  | MVP   |
| DR-SET-002 | Default near-expiry threshold là 90 ngày.                                                                 | MVP   |
| DR-DMO-001 | Demo seed phải tạo dữ liệu role/user/medicine/ingredient/supplier/batch/order/interaction/report đủ demo. | MVP   |
| DR-DMO-002 | Demo reset phải tái tạo dữ liệu từ authoritative transactions.                                            | MVP   |

---

# 13. External Integration Requirements

## 13.1. Supabase Auth

| EXT ID       | Requirement                                                                         | Scope |
| ------------ | ----------------------------------------------------------------------------------- | ----- |
| EXT-AUTH-001 | Hệ thống phải tích hợp Supabase Auth cho login/session/token.                       | MVP   |
| EXT-AUTH-002 | Backend phải verify Supabase access token.                                          | MVP   |
| EXT-AUTH-003 | Admin user creation phải dùng Supabase Admin integration hoặc workflow tương đương. | MVP   |
| EXT-AUTH-004 | Password update phải dùng Supabase Auth mechanism.                                  | MVP   |

## 13.2. PostgreSQL / Supabase PostgreSQL

| EXT ID     | Requirement                                                  | Scope |
| ---------- | ------------------------------------------------------------ | ----- |
| EXT-DB-001 | Hệ thống phải dùng PostgreSQL làm source of truth.           | MVP   |
| EXT-DB-002 | Prisma phải truy cập PostgreSQL cho nghiệp vụ backend.       | MVP   |
| EXT-DB-003 | PostgreSQL data phải không phụ thuộc Neo4j để POS hoạt động. | MVP   |

## 13.3. Google AI Provider

| EXT ID     | Requirement                                                  | Scope |
| ---------- | ------------------------------------------------------------ | ----- |
| EXT-AI-001 | Hệ thống phải hỗ trợ Google AI Provider là provider ưu tiên. | MVP   |
| EXT-AI-002 | Provider/model phải configurable.                            | MVP   |
| EXT-AI-003 | AI request phải có timeout/fallback handling.                | MVP   |
| EXT-AI-004 | AI provider failure phải không làm hỏng checkout flow.       | MVP   |

## 13.4. MockAI

| EXT ID       | Requirement                                                             | Scope |
| ------------ | ----------------------------------------------------------------------- | ----- |
| EXT-MOCK-001 | Hệ thống phải có MockAI fallback.                                       | MVP   |
| EXT-MOCK-002 | MockAI chỉ là fallback, không phải provider duy nhất chứng minh MVP AI. | MVP   |
| EXT-MOCK-003 | Fallback usage phải được ghi AI Audit.                                  | MVP   |

## 13.5. Neo4j

| EXT ID      | Requirement                                                         | Scope |
| ----------- | ------------------------------------------------------------------- | ----- |
| EXT-GPH-001 | Hệ thống phải tích hợp Neo4j như graph projection.                  | MVP   |
| EXT-GPH-002 | Graph Sync phải đồng bộ dữ liệu từ PostgreSQL sang Neo4j.           | MVP   |
| EXT-GPH-003 | Neo4j unavailable không được làm POS ngừng hoạt động.               | MVP   |
| EXT-GPH-004 | Graph freshness phải được kiểm tra cho Graph-RAG output quan trọng. | MVP   |

## 13.6. Jira and GitHub

| EXT ID     | Requirement                                           | Scope |
| ---------- | ----------------------------------------------------- | ----- |
| EXT-PM-001 | Jira là source of truth cho Epic/Story/Sprint/status. | MVP   |
| EXT-PM-002 | GitHub là source of truth cho code, PR và CI.         | MVP   |
| EXT-PM-003 | Jira issues nên link với GitHub commits/PRs.          | MVP   |

---

# 14. Authorization Requirements Summary

Authorization chi tiết sẽ được viết trong Document 07. SRS ghi summary bắt buộc.

## 14.1. Admin

Admin phải có quyền:

1. Quản lý user/role/permission.
2. Quản lý Medicine.
3. Quản lý ActiveIngredient.
4. Quản lý Supplier, bao gồm deactivate.
5. Xem toàn bộ inventory.
6. Tạo/confirm Inventory Adjustment.
7. Quản lý DrugInteraction Rule.
8. Xem InteractionAlert History.
9. Xem tất cả Orders.
10. Thực hiện sales operations như Staff.
11. Checkout.
12. Xem Payment/Invoice.
13. Xem reports.
14. Xem AI Audit Log.
15. Xem Graph Explorer/Graph-RAG.
16. Cấu hình near-expiry threshold.

## 14.2. Staff

Staff phải có quyền:

1. Tìm/xem Medicine.
2. Xem sellable stock trong POS.
3. Tạo Draft Order.
4. Sửa Draft Order thuộc ownership scope.
5. Cancel Draft Order thuộc ownership scope.
6. Xem Order thuộc ownership scope.
7. Xem InteractionAlert trong Order của mình.
8. Acknowledge HIGH alert.
9. Nhập consultation note.
10. Dùng AI Copilot trong POS flow.
11. Checkout order hợp lệ thuộc ownership scope.
12. Xem Payment/Invoice thuộc ownership scope.

Staff không được:

1. Quản lý user.
2. Quản lý Supplier.
3. Quản lý DrugInteraction Rule.
4. Xem InteractionAlert History toàn hệ thống.
5. Xem AI Audit Log.
6. Gửi raw Cypher.
7. Quản lý Graph Sync.

## 14.3. Warehouse

Warehouse phải có quyền:

1. Xem Medicine.
2. Xem Supplier.
3. Tạo Supplier.
4. Cập nhật Supplier.
5. Tạo/confirm Stock Import.
6. Xem Inventory Summary.
7. Xem MedicineBatch.
8. Xem low-stock/near-expiry.
9. Tạo/confirm Inventory Adjustment.
10. Xem Inventory Report.

Warehouse không được:

1. Deactivate Supplier.
2. Tạo Order.
3. Checkout.
4. Xem Payment/Invoice.
5. Xem InteractionAlert.
6. Quản lý DrugInteraction Rule.
7. Xem Graph Explorer trong MVP.
8. Dùng Graph-RAG trong MVP.

---

# 15. Error Handling Requirements

Error handling requirements dùng mã:

```text
ERR-[GROUP]-[NUMBER]
```

| ERR ID       | Error Requirement                                                                      | Applies to           |
| ------------ | -------------------------------------------------------------------------------------- | -------------------- |
| ERR-AUTH-001 | Nếu user chưa authenticated, hệ thống phải trả lỗi authentication required.            | Auth                 |
| ERR-AUTH-002 | Nếu token hết hạn/invalid, hệ thống phải yêu cầu login lại hoặc refresh theo Supabase. | Auth                 |
| ERR-AUTH-003 | Nếu user không đủ permission, hệ thống phải trả lỗi forbidden.                         | Authorization        |
| ERR-AUTH-004 | Nếu user không thuộc ownership scope, hệ thống phải trả lỗi scope/ownership denied.    | Authorization        |
| ERR-MED-001  | Nếu selling_price <= 0 khi tạo/cập nhật Medicine bán được, hệ thống phải reject.       | Medicine             |
| ERR-BAT-001  | Nếu batch_number thiếu, hệ thống phải reject.                                          | MedicineBatch/Import |
| ERR-BAT-002  | Nếu expiry_date thiếu, hệ thống phải reject.                                           | MedicineBatch/Import |
| ERR-BAT-003  | Nếu batch expiry mismatch, hệ thống phải reject.                                       | Stock Import         |
| ERR-INV-001  | Nếu operation làm quantity_remaining âm, hệ thống phải reject.                         | Inventory            |
| ERR-STI-001  | Nếu confirm Stock Import đã CONFIRMED, hệ thống phải reject.                           | Stock Import         |
| ERR-STI-002  | Nếu confirm Stock Import CANCELLED, hệ thống phải reject.                              | Stock Import         |
| ERR-ADJ-001  | Nếu Inventory Adjustment thiếu reason, hệ thống phải reject.                           | Adjustment           |
| ERR-POS-001  | Nếu thêm inactive Medicine vào Draft Order, hệ thống phải reject.                      | POS                  |
| ERR-POS-002  | Nếu sửa PAID Order, hệ thống phải reject.                                              | POS                  |
| ERR-CHK-001  | Nếu Order không phải DRAFT, checkout phải reject.                                      | Checkout             |
| ERR-CHK-002  | Nếu Order không có item, checkout phải reject.                                         | Checkout             |
| ERR-CHK-003  | Nếu stock không đủ, checkout phải reject và giữ Draft Order.                           | Checkout             |
| ERR-CHK-004  | Nếu HIGH alert chưa acknowledgement, checkout phải reject.                             | Checkout/Interaction |
| ERR-CHK-005  | Nếu HIGH alert chưa consultation note, checkout phải reject.                           | Checkout/Interaction |
| ERR-CHK-006  | Nếu idempotency key trùng nhưng payload khác, hệ thống phải reject.                    | Checkout             |
| ERR-PAY-001  | Nếu cash amount_tendered < amount_due, payment phải fail/reject.                       | Payment              |
| ERR-PAY-002  | Nếu bank transfer thiếu transaction_reference, payment phải reject.                    | Payment              |
| ERR-PAY-003  | Nếu Order đã có successful payment, payment mới phải reject.                           | Payment              |
| ERR-INV-001  | Nếu tạo Invoice cho Order chưa PAID, hệ thống phải reject.                             | Invoice              |
| ERR-INT-001  | Nếu tạo duplicate interaction pair A–B/B–A, hệ thống phải reject.                      | DrugInteraction      |
| ERR-AI-001   | Nếu AI input vi phạm guardrail, hệ thống phải trả safe refusal.                        | AI                   |
| ERR-AI-002   | Nếu AI output vi phạm guardrail, hệ thống không được hiển thị raw output.              | AI                   |
| ERR-AI-003   | Nếu AI provider timeout, hệ thống phải fallback hoặc trả safe error.                   | AI                   |
| ERR-GPH-001  | Nếu Neo4j unavailable cho interaction explanation, hệ thống fallback PostgreSQL.       | Graph-RAG            |
| ERR-GPH-002  | Nếu graph-only query không có fallback, hệ thống trả safe error.                       | Graph-RAG            |
| ERR-DMO-001  | Nếu demo reset chạy ở môi trường không local, hệ thống phải refuse.                    | Demo Reset           |

---

# 16. Audit/Logging Requirements

Audit/logging requirements dùng mã:

```text
LOG-[GROUP]-[NUMBER]
```

| LOG ID       | Requirement                                                               | Scope |
| ------------ | ------------------------------------------------------------------------- | ----- |
| LOG-AUTH-001 | Hệ thống nên log authentication/security events quan trọng ở mức phù hợp. | MVP   |
| LOG-RBAC-001 | Permission/authorization failure quan trọng nên log để debug/audit.       | MVP   |
| LOG-SUP-001  | Supplier deactivate phải audit.                                           | MVP   |
| LOG-MED-001  | Medicine deactivate hoặc thay đổi quan trọng phải audit.                  | MVP   |
| LOG-STI-001  | Stock Import confirm/cancel phải audit.                                   | MVP   |
| LOG-ADJ-001  | Inventory Adjustment confirm phải audit.                                  | MVP   |
| LOG-CHK-001  | Checkout success phải audit.                                              | MVP   |
| LOG-CHK-002  | Checkout failure quan trọng phải log/audit ở mức phù hợp.                 | MVP   |
| LOG-PAY-001  | Payment attempt phải có traceability.                                     | MVP   |
| LOG-INV-001  | Invoice creation phải trace được với Order và Payment.                    | MVP   |
| LOG-INT-001  | DrugInteraction Rule create/update/deactivate phải audit.                 | MVP   |
| LOG-ALT-001  | HIGH alert acknowledgement phải lưu actor/time.                           | MVP   |
| LOG-ALT-002  | HIGH alert consultation note phải lưu actor/time.                         | MVP   |
| LOG-AI-001   | AI request quan trọng phải có AI Audit.                                   | MVP   |
| LOG-AI-002   | AI Audit phải ghi provider/fallback/prompt/guardrail/status metadata.     | MVP   |
| LOG-AI-003   | AI Audit không lưu raw PII.                                               | MVP   |
| LOG-GPH-001  | Graph Sync job/attempt/failure phải log.                                  | MVP   |
| LOG-GPH-002  | Graph stale/fallback events nên log.                                      | MVP   |
| LOG-DMO-001  | Demo reset execution phải log environment và result.                      | MVP   |

Generic System Audit Log UI là Should-have, nhưng backend audit/logging cho nghiệp vụ quan trọng là MVP.

---

# 17. MVP / Should-have / Future / Out of Scope Requirement Classification

## 17.1. MVP requirements

MVP requirements gồm tất cả yêu cầu Must/Should trong các nhóm:

1. Auth & User Profile.
2. Roles & Permissions.
3. Medicine.
4. ActiveIngredient.
5. Supplier.
6. MedicineBatch.
7. Stock Import.
8. Inventory Adjustment.
9. POS Draft Order.
10. Checkout.
11. Payment.
12. Invoice.
13. DrugInteraction.
14. InteractionAlert.
15. AI Copilot.
16. AI Guardrail.
17. AI Audit.
18. Graph Sync.
19. Graph-RAG.
20. Reports.
21. System Settings.
22. Demo Reset.

## 17.2. Should-have requirements

Should-have gồm:

1. Full Customer Management.
2. Customer purchase history nâng cao.
3. Graph Sync Status/retry UI.
4. Generic System Audit Log UI.
5. Admin prompt editing UI.
6. Admin AI provider/model configuration UI.
7. AI-generated business report narrative.
8. Advanced charts.
9. Graph visualization nâng cao.
10. Notification.
11. Supabase Storage.
12. Supabase Realtime.
13. Forecast đơn giản.
14. Reorder suggestion đơn giản.

## 17.3. Future / Commercial Expansion requirements

Future gồm:

1. Online commerce.
2. Product variants commerce core.
3. Cart.
4. Wishlist.
5. Shipping.
6. Coupon.
7. Review.
8. CMS.
9. Customer portal.
10. Multi-store.
11. Multi-warehouse.
12. Stock transfer.
13. Purchase order workflow đầy đủ.
14. Supplier contract management.
15. Refund.
16. Return.
17. Credit note.
18. Invoice reversal.
19. Real bank integration.
20. Payment gateway production.
21. Advanced analytics.
22. AI Cache.
23. DrugGroup taxonomy.
24. Symptom/Condition/RedFlag/Recommendation graph enrichment.
25. CRITICAL severity.
26. Full mobile support.
27. Full cross-browser testing.
28. Full 100-table implementation.

## 17.4. Out of Scope requirements

Out of Scope gồm:

1. AI diagnosis.
2. AI prescribing.
3. AI dosage advice.
4. AI replacing healthcare professionals.
5. Real patient medical record.
6. Raw PII in AI Audit.
7. Real bank integration in MVP.
8. Refund in MVP.
9. Return in MVP.
10. Online shopping checkout in MVP.
11. Customer portal in MVP.
12. Multi-store operation in MVP.
13. Multi-warehouse stock transfer in MVP.
14. Aggregate inventory source of truth.
15. Medicine-level official interaction rule.
16. MockAI-only MVP.
17. MockGraph-only MVP.
18. Full 100-table MVP schema.
19. Demo reset outside local.
20. Raw Cypher for Staff.
21. Warehouse access to InteractionAlert/Graph Explorer in MVP.

---

# 18. Acceptance Criteria

Acceptance criteria ở cấp SRS dùng để xác định requirement đạt hay chưa. Test case chi tiết sẽ ở Document 20.

## 18.1. Functional Acceptance Criteria

| Area                 | Acceptance Criteria                                                                                  |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| Auth                 | User đăng nhập bằng Supabase Auth; backend verify token; PostgreSQL không lưu password               |
| RBAC                 | Admin/Staff/Warehouse được phân quyền khác nhau; backend enforce permission và ownership             |
| Medicine             | Admin quản lý Medicine; selling_price > 0; inactive Medicine không bán mới                           |
| ActiveIngredient     | Admin quản lý ActiveIngredient; Medicine mapping hoạt chất; interaction dùng mapping này             |
| Supplier             | Warehouse tạo/cập nhật Supplier; Admin deactivate; Warehouse không deactivate                        |
| MedicineBatch        | Inventory source of truth là MedicineBatch; batch hết hạn không sellable                             |
| Stock Import         | DRAFT có thể sửa; CONFIRMED cập nhật batch; không confirm lặp                                        |
| Inventory Adjustment | Adjustment có reason; theo batch; không làm quantity âm; có audit                                    |
| POS                  | Staff tạo Draft Order; thêm/sửa/xóa item; hỗ trợ khách lẻ                                            |
| Interaction          | Adding medicines triggers order-based interaction check; rules ActiveIngredient-level                |
| InteractionAlert     | Alert persisted; HIGH requires acknowledgement and note; inactive when no longer applies             |
| Checkout             | Checkout validates order, stock, HIGH alerts; applies FEFO; creates payment/invoice; idempotent      |
| Payment              | SUCCESS/FAILED simulation; one successful payment per order; cash and bank transfer fields valid     |
| Invoice              | Created only after successful payment; one invoice per PAID order                                    |
| AI Copilot           | Generates explanation/draft; draft not official until user confirms                                  |
| AI Guardrail         | Blocks diagnosis/prescribing/dosage; unsafe output not shown raw                                     |
| AI Audit             | Logs provider, fallback, prompt version, guardrail statuses, summary without raw PII                 |
| Graph Sync           | PostgreSQL changes create sync flow; Neo4j projection updated; failures logged/retried               |
| Graph-RAG            | Uses fresh graph; fallback PostgreSQL for interaction explanation; safe error for graph-only failure |
| Reports              | Revenue, Top Medicines, Inventory reports work on deterministic data                                 |
| Settings             | Admin configures near-expiry threshold; default 90 days                                              |
| Demo Reset           | Runs only local; recreates seed; smoke checks pass                                                   |

## 18.2. Non-functional Acceptance Criteria

| Area            | Acceptance Criteria                                                                        |
| --------------- | ------------------------------------------------------------------------------------------ |
| Security        | Protected operations require auth; backend enforces permission                             |
| Reliability     | Checkout rollback/idempotency prevents inconsistent order/payment/stock/invoice            |
| Performance     | MVP demo dataset supports POS, checkout, reports and interaction checks smoothly           |
| Usability       | Staff can complete POS and checkout without unnecessary admin/kho functions                |
| Maintainability | Requirements trace to modules/API/ERD/UI/tests; business rules centralized in backend      |
| Auditability    | Critical business actions and AI actions have traceable logs                               |
| Safety          | AI and HIGH alerts enforce safety boundaries                                               |
| Data integrity  | No negative stock, duplicate successful payment, duplicate invoice, duplicate active alert |

---

# 19. Traceability SRS → Use Case/API/ERD/UI/Testing

| SRS Requirement Group | Use Case                                 | API Spec                        | ERD/Prisma                                       | UI/UX                                  | Testing                    |
| --------------------- | ---------------------------------------- | ------------------------------- | ------------------------------------------------ | -------------------------------------- | -------------------------- |
| Auth & User Profile   | Login, First Login, Manage User          | Auth/User APIs                  | user_profiles, roles mappings                    | Login/User screens                     | Auth tests                 |
| Roles & Permissions   | Assign Role, Check Access                | RBAC APIs                       | roles, permissions, user_roles, role_permissions | Role UI/navigation                     | Permission tests           |
| Medicine              | Manage Medicine                          | Medicine APIs                   | medicines                                        | Medicine screens                       | Medicine validation tests  |
| ActiveIngredient      | Manage ActiveIngredient, Map Ingredients | ActiveIngredient APIs           | active_ingredients, mappings                     | ActiveIngredient screen, Medicine form | Mapping tests              |
| Supplier              | Manage Supplier                          | Supplier APIs                   | suppliers                                        | Supplier screen                        | Supplier auth tests        |
| MedicineBatch         | View Inventory/Batch                     | Inventory APIs                  | medicine_batches                                 | Inventory Summary/Batch Detail         | Inventory tests            |
| Stock Import          | Create/Confirm Import                    | Stock Import APIs               | stock_imports/details                            | Stock Import screen                    | Import tests               |
| Inventory Adjustment  | Create/Confirm Adjustment                | Adjustment APIs                 | inventory_adjustments/details                    | Adjustment screen                      | Adjustment tests           |
| POS Draft Order       | Create/Update Draft                      | Order APIs                      | orders, order_items                              | POS screen                             | POS flow tests             |
| Checkout              | Checkout Order                           | Checkout API                    | payments, invoices, allocations, idempotency     | Checkout panel/route                   | Checkout transaction tests |
| Payment               | Process simulated payment                | Payment query/internal APIs     | payments                                         | Payment section                        | Payment tests              |
| Invoice               | View invoice                             | Invoice APIs                    | invoices/items                                   | Invoice view                           | Invoice tests              |
| DrugInteraction       | Manage Rule, Check Interaction           | Interaction APIs                | drug_interactions                                | Rule screen                            | Rule tests                 |
| InteractionAlert      | Handle Alert, View History               | Alert APIs                      | interaction_alerts                               | Alert UI, History screen               | HIGH blocking tests        |
| AI Copilot            | Generate Explanation/Draft               | AI APIs                         | ai_audit_logs, prompt_templates                  | AI panel                               | AI tests                   |
| AI Guardrail/Audit    | Safe AI Request                          | AI Guardrail/Audit APIs         | ai_audit_logs                                    | Safe refusal UI                        | Guardrail tests            |
| Graph Sync            | Sync Projection                          | Graph Sync APIs/internal worker | graph_sync_outbox/logs                           | Optional status UI                     | Sync/freshness tests       |
| Graph-RAG             | Ask Graph-RAG                            | Graph-RAG APIs                  | Neo4j projection                                 | Graph-RAG UI                           | Fallback tests             |
| Reports               | View Reports                             | Report APIs                     | orders/payments/batches                          | Report screens                         | Report tests               |
| System Settings       | Manage Threshold                         | Settings APIs                   | system_settings                                  | Settings screen                        | Settings tests             |
| Demo Reset            | Reset Demo Data                          | Demo tooling/internal           | seed data                                        | N/A                                    | Smoke tests                |

---

## 20. Kết luận

Document 06 — Software Requirements Specification đã đặc tả yêu cầu phần mềm chính thức cho **PharmaAssist AI Intelligence** ở mức rất chi tiết về requirements nhưng không đi vào implementation syntax.

Tài liệu này xác định:

1. Scope của SRS.
2. Definitions and abbreviations.
3. Overall description.
4. User classes.
5. Operating environment.
6. Product constraints.
7. Assumptions and dependencies.
8. Functional requirements có mã FR.
9. Non-functional requirements có mã NFR.
10. Business rules có mã BR.
11. Data requirements.
12. External integration requirements.
13. Authorization requirements summary.
14. Error handling requirements.
15. Audit/logging requirements.
16. MVP/Should-have/Future/Out of Scope classification.
17. Acceptance criteria.
18. Traceability sang Use Case, API, ERD, Prisma, UI và Testing.

Các baseline quan trọng được giữ đúng:

1. Supabase Auth là authentication chính thức.
2. PostgreSQL là source of truth.
3. Neo4j là graph projection.
4. MedicineBatch là source of truth cho inventory.
5. FEFO là bắt buộc trong checkout.
6. Checkout là transaction chính thức.
7. Payment và Invoice nằm trong checkout flow.
8. DrugInteraction Rule ở cấp ActiveIngredient–ActiveIngredient.
9. InteractionAlert phải persist.
10. HIGH alert cần acknowledgement và consultation note.
11. AI Copilot, AI Guardrail và AI Audit là MVP.
12. Graph Sync và Graph-RAG là MVP.
13. Reports cơ bản là MVP.
14. Data seed phải curated riêng.
15. Demo reset chỉ chạy local.

Document 06 là đầu vào trực tiếp cho:

1. Document 07 — User Roles, Permissions & Authorization Specification.
2. Document 08 — Use Case Specification.
3. Document 12 — API Specification.
4. Document 13 — Database Design & ERD.
5. Document 14 — Prisma Schema & Migration Design.
6. Document 15 — UI/UX Screen Specification.
7. Document 20 — Testing, Demo & Setup Guide.

Bước tiếp theo hợp lý là viết **Document 07 — User Roles, Permissions & Authorization Specification**, vì authorization requirements cần được tách riêng thành permission matrix, ownership rules và role-based UI/access rules trước khi viết Use Case và API.
