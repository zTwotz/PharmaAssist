# Document 08 — Use Case Specification

# Tài liệu 08 — Đặc tả Use Case

---

## Metadata

| Mục               | Nội dung                                                                                                                                                             |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID       | DOC-08                                                                                                                                                               |
| File name         | `08_use_case_specification.md`                                                                                                                                       |
| Document Name     | Use Case Specification                                                                                                                                               |
| Tên tiếng Việt    | Đặc tả Use Case                                                                                                                                                      |
| Project           | PharmaAssist AI Intelligence                                                                                                                                         |
| Version           | 1.0 Draft                                                                                                                                                            |
| Status            | Draft                                                                                                                                                                |
| Created Date      | 08/06/2026                                                                                                                                                           |
| Last Updated      | 08/06/2026                                                                                                                                                           |
| Owner             | System Analyst / Project Leader                                                                                                                                      |
| Reviewer          | Backend Developer, Frontend Developer, Tester, UI/UX Designer, Giảng viên hướng dẫn                                                                                  |
| Baseline Source   | Document 05 — Business Requirements Document, Document 06 — Software Requirements Specification, Document 07 — User Roles, Permissions & Authorization Specification |
| Related Documents | Document 06, Document 07, Document 09, Document 12, Document 15, Document 20                                                                                         |
| Language Rule     | Nội dung chính viết bằng tiếng Việt; tên file/tên tài liệu có thể giữ tiếng Anh                                                                                      |
| Terminology Rule  | Giữ nguyên tên công nghệ, module, entity, API, table, enum, permission key và thuật ngữ kỹ thuật cần thiết bằng tiếng Anh                                            |

---

## 1. Mục đích tài liệu

Tài liệu **Use Case Specification** mô tả danh sách use case chính thức và đặc tả các use case quan trọng của hệ thống **PharmaAssist AI Intelligence**.

Mục đích chính của tài liệu:

1. Xác định các actor tham gia hệ thống.
2. Mô tả vai trò của từng actor trong hệ thống.
3. Xác định naming convention cho use case.
4. Nhóm use case theo module/package.
5. Liệt kê toàn bộ use case theo MVP, Should-have, Future / Commercial Expansion và Out of Scope.
6. Đặc tả chi tiết các use case quan trọng theo:

   * Actor.
   * Preconditions.
   * Trigger.
   * Main flow.
   * Alternative flows.
   * Exception flows.
   * Postconditions.
   * Business rules liên quan.
   * SRS traceability.
7. Làm đầu vào cho UML Diagram Package.
8. Làm đầu vào cho UI/UX Screen Specification.
9. Làm đầu vào cho API Specification.
10. Làm đầu vào cho Testing, Demo & Setup Guide.

Tài liệu này tập trung vào **actor–system interaction**. Tài liệu này không viết class diagram chi tiết, không viết sequence diagram code đầy đủ, không viết API request/response, không viết database schema, không viết UI layout chi tiết và không viết test steps đầy đủ.

---

## 2. Actor List

### 2.1. Primary Human Actors

| Actor               | Loại actor             | Scope                                |
| ------------------- | ---------------------- | ------------------------------------ |
| Admin               | Primary actor          | MVP                                  |
| Staff               | Primary actor          | MVP                                  |
| Warehouse           | Primary actor          | MVP                                  |
| Customer / Khách lẻ | Supporting stakeholder | MVP                                  |
| Project Leader      | Project actor          | MVP documentation/project management |
| Tester              | Project actor          | MVP testing/demo                     |
| Release/Demo Owner  | Project actor          | MVP release/demo                     |

### 2.2. Supporting System Actors

| Actor                | Loại actor                                | Scope                  |
| -------------------- | ----------------------------------------- | ---------------------- |
| Supabase Auth        | External supporting system                | MVP                    |
| PostgreSQL           | Internal/source-of-truth system           | MVP                    |
| Neo4j                | External/internal graph projection system | MVP                    |
| Google AI Provider   | External AI provider                      | MVP                    |
| MockAI               | Internal fallback provider                | MVP                    |
| Graph Sync Worker    | Internal system actor                     | MVP                    |
| AI Guardrail Service | Internal system actor                     | MVP                    |
| Audit Log Service    | Internal system actor                     | MVP                    |
| Jira                 | External project management system        | MVP project management |
| GitHub               | External code/CI system                   | MVP project management |

### 2.3. Actors không thuộc MVP

| Actor                 | Trạng thái        | Ghi chú                                               |
| --------------------- | ----------------- | ----------------------------------------------------- |
| Customer Portal User  | Future            | Customer không đăng nhập trong MVP                    |
| Pharmacist riêng biệt | Future/Unresolved | MVP dùng Staff/Admin, chưa tách role Pharmacist       |
| Accountant            | Future            | Không có refund/real payment reconciliation trong MVP |
| Store Manager         | Future            | Multi-store ngoài MVP                                 |
| Supplier Portal User  | Future            | Supplier portal ngoài MVP                             |
| Delivery Staff        | Future            | Shipping/delivery ngoài MVP                           |

---

## 3. Actor Descriptions

### 3.1. Admin

Admin là actor có quyền quản trị rộng nhất trong hệ thống.

Admin có thể:

1. Quản lý user, role và permission.
2. Quản lý Medicine.
3. Quản lý ActiveIngredient.
4. Mapping Medicine với ActiveIngredient.
5. Quản lý Supplier, bao gồm deactivate.
6. Xem Inventory Summary và Batch Detail.
7. Xem Stock Import.
8. Tạo/confirm Inventory Adjustment.
9. Quản lý DrugInteraction Rule.
10. Xem InteractionAlert History.
11. Tạo và xử lý Draft Order như Staff.
12. Checkout order hợp lệ.
13. Xem toàn bộ Orders, Payments và Invoices.
14. Xem Revenue Report, Top Medicines Report và Inventory Report.
15. Cấu hình near-expiry threshold.
16. Dùng AI Copilot.
17. Xem AI Audit Log.
18. Dùng Graph Explorer/Graph-RAG trong phạm vi read-only.
19. Xem Graph Sync evidence/status nếu Should-have UI được triển khai.

Admin vẫn bị ràng buộc bởi business rules, ví dụ:

1. Không được checkout PAID/CANCELLED Order.
2. Không được bỏ qua HIGH alert chưa xử lý.
3. Không được bỏ qua FEFO.
4. Không được bán batch hết hạn.
5. Không được dùng AI để chẩn đoán/kê đơn/liều dùng.
6. Không được chạy demo reset ở môi trường không local.

---

### 3.2. Staff

Staff là actor vận hành bán thuốc tại quầy.

Staff có thể:

1. Tìm Medicine trong POS.
2. Xem sellable stock trong POS.
3. Tạo Draft Order.
4. Thêm/sửa/xóa Medicine trong Draft Order.
5. Hỗ trợ khách lẻ.
6. Xem InteractionAlert trong Order thuộc ownership scope.
7. Acknowledge HIGH alert trong Order thuộc scope.
8. Nhập consultation note cho HIGH alert trong Order thuộc scope.
9. Dùng AI Copilot để giải thích alert hoặc tạo draft note.
10. Checkout Draft Order thuộc ownership scope nếu hợp lệ.
11. Xem Order, Payment và Invoice thuộc ownership scope.
12. Cancel Draft Order thuộc ownership scope.

Staff không được:

1. Quản lý user/role/permission.
2. Quản lý Supplier.
3. Quản lý Stock Import.
4. Quản lý Inventory Adjustment.
5. Quản lý DrugInteraction Rule.
6. Xem InteractionAlert History toàn hệ thống.
7. Xem AI Audit Log.
8. Xem Graph Sync Status.
9. Submit raw Cypher.
10. Truy cập Payment/Invoice ngoài ownership scope.
11. Bỏ qua HIGH alert handling.

---

### 3.3. Warehouse

Warehouse là actor phụ trách nghiệp vụ kho.

Warehouse có thể:

1. Xem Medicine trong ngữ cảnh kho.
2. Xem Supplier.
3. Tạo Supplier.
4. Cập nhật Supplier.
5. Tạo Stock Import.
6. Cập nhật Draft Stock Import.
7. Confirm Stock Import.
8. Cancel Draft Stock Import.
9. Xem Inventory Summary.
10. Xem MedicineBatch/Batch Detail.
11. Theo dõi low-stock và near-expiry.
12. Tạo Inventory Adjustment.
13. Confirm Inventory Adjustment.
14. Xem Inventory Report.

Warehouse không được:

1. Deactivate Supplier.
2. Tạo Order.
3. Checkout.
4. Xem Payment.
5. Xem Invoice.
6. Xem InteractionAlert.
7. Quản lý DrugInteraction Rule.
8. Dùng AI Copilot trong POS.
9. Xem AI Audit.
10. Dùng Graph Explorer/Graph-RAG trong MVP.
11. Thay đổi System Settings.

---

### 3.4. Customer / Khách lẻ

Customer là stakeholder ngoài hệ thống trong MVP.

Customer không đăng nhập và không trực tiếp vận hành hệ thống.

Customer tham gia gián tiếp trong:

1. Mua thuốc tại quầy.
2. Được xử lý như khách lẻ nếu `customer_id = null`.
3. Nhận invoice.
4. Được hưởng lợi từ việc hệ thống kiểm tra tồn kho, interaction và alert safety.

Full Customer Management là Should-have.

---

### 3.5. Supabase Auth

Supabase Auth là supporting system actor phụ trách authentication.

Supabase Auth hỗ trợ:

1. Login.
2. Logout.
3. Session.
4. Access token.
5. Password update.
6. Supabase user ID.
7. Admin user creation nếu dùng Supabase Admin integration.

Supabase Auth không quản lý business permission chi tiết.

---

### 3.6. Google AI Provider

Google AI Provider là external AI provider ưu tiên.

Google AI Provider được dùng để:

1. Tạo explanation cho InteractionAlert.
2. Tạo consultation note draft.
3. Hỗ trợ safe follow-up questions nếu có context phù hợp.

Mọi request/response AI phải qua AI Guardrail và AI Audit.

---

### 3.7. MockAI

MockAI là fallback provider.

MockAI được dùng khi:

1. Google AI Provider lỗi.
2. Google AI Provider timeout.
3. Google AI Provider hết quota.
4. Demo cần ổn định.
5. Môi trường local không có provider thật.

MockAI không được xem là provider duy nhất đủ chứng minh MVP AI.

---

### 3.8. Neo4j

Neo4j là graph projection system.

Neo4j lưu projection của:

1. Medicine.
2. ActiveIngredient.
3. CONTAINS relationship.
4. INTERACTS_WITH relationship.

Neo4j không phải source of truth.

---

### 3.9. Graph Sync Worker

Graph Sync Worker là internal system actor phụ trách đồng bộ dữ liệu từ PostgreSQL sang Neo4j.

Graph Sync Worker xử lý:

1. Outbox events.
2. Retry.
3. Sync attempt logging.
4. Freshness metadata.
5. Deactivation projection.
6. Projection rebuild nếu cần.

---

### 3.10. AI Guardrail Service

AI Guardrail Service là internal system actor phụ trách:

1. Input guardrail.
2. Output guardrail.
3. Safe refusal.
4. PII minimization/redaction.
5. Structured output/schema validation.
6. Guardrail status logging.

---

### 3.11. Audit Log Service

Audit Log Service là internal system actor phụ trách ghi nhận:

1. Stock Import confirm/cancel.
2. Inventory Adjustment confirm.
3. Checkout.
4. HIGH alert acknowledgement.
5. Consultation note.
6. AI Audit.
7. Graph Sync attempt/failure.
8. System Settings update.
9. Supplier deactivate.
10. DrugInteraction Rule changes.

---

## 4. Use Case Naming Convention

### 4.1. Use Case ID format

Use case ID sử dụng format:

```text
UC-[MODULE]-[NUMBER]
```

Ví dụ:

```text
UC-AUTH-001
UC-MED-001
UC-POS-003
UC-CHK-001
UC-AI-002
```

### 4.2. Module codes

| Module Code | Module                                 |
| ----------- | -------------------------------------- |
| AUTH        | Login/Profile                          |
| IAM         | User/Role/Permission                   |
| MED         | Medicine                               |
| ACT         | ActiveIngredient                       |
| SUP         | Supplier                               |
| INV         | MedicineBatch/Inventory                |
| STI         | Stock Import                           |
| ADJ         | Inventory Adjustment                   |
| POS         | POS Draft Order                        |
| INT         | Interaction Checking                   |
| ALT         | HIGH Alert Handling / InteractionAlert |
| AI          | AI Copilot Assistance                  |
| CHK         | Checkout                               |
| PAY         | Payment                                |
| INVOC       | Invoice                                |
| RPT         | Reports                                |
| GRAPH       | Graph-RAG                              |
| SET         | System Settings                        |
| DMO         | Demo Reset                             |

### 4.3. Use Case name format

Use case name nên dùng động từ + object:

```text
Đăng nhập hệ thống
Tạo Medicine
Mapping Medicine với ActiveIngredient
Confirm Stock Import
Tạo Draft Order
Xử lý HIGH Alert
Thực hiện Checkout
```

### 4.4. Scope tag

Mỗi use case có một scope tag:

1. MVP.
2. Should-have.
3. Future.
4. Out of Scope.

### 4.5. Priority tag

Priority:

1. P0 — Critical MVP blocker.
2. P1 — Important MVP feature.
3. P2 — Supporting MVP feature.
4. P3 — Should-have.
5. P4 — Future / Commercial Expansion.
6. X — Out of Scope / Not implemented.

---

## 5. Use Case Package / Module Grouping

| Package                 | Nội dung                                                | Scope       |
| ----------------------- | ------------------------------------------------------- | ----------- |
| Login/Profile           | Login, logout, profile, first-login password change     | MVP         |
| User/Role/Permission    | User management, role assignment, permission view       | MVP         |
| Medicine                | Medicine CRUD, status, search                           | MVP         |
| ActiveIngredient        | ActiveIngredient CRUD, mapping                          | MVP         |
| Supplier                | Supplier CRUD, deactivate                               | MVP         |
| MedicineBatch/Inventory | Inventory Summary, Batch Detail, low-stock, near-expiry | MVP         |
| Stock Import            | Create/update/cancel/confirm import                     | MVP         |
| Inventory Adjustment    | Create/confirm adjustment                               | MVP         |
| POS Draft Order         | Create/update/cancel Draft Order                        | MVP         |
| Interaction Checking    | Check interactions in order                             | MVP         |
| HIGH Alert Handling     | Acknowledge/note HIGH alert, view alert history         | MVP         |
| AI Copilot Assistance   | Explain alert, generate draft, guardrail refusal        | MVP         |
| Checkout                | Validate and complete order                             | MVP         |
| Payment/Invoice         | Payment simulation, invoice view                        | MVP         |
| Reports                 | Revenue, Top Medicines, Inventory                       | MVP         |
| Graph-RAG               | Graph query/explanation/fallback                        | MVP         |
| System Settings         | Near-expiry threshold                                   | MVP         |
| Demo Reset              | Local demo reset and smoke checks                       | MVP         |
| Customer Management     | Full customer profile/history                           | Should-have |
| Graph Sync Status UI    | Admin view/retry sync                                   | Should-have |
| Online Commerce         | Cart, wishlist, shipping, coupon                        | Future      |

---

## 6. Overall Use Case List

### 6.1. Login/Profile

| UC ID       | Use Case             | Primary Actor           | Scope | Priority |
| ----------- | -------------------- | ----------------------- | ----- | -------- |
| UC-AUTH-001 | Đăng nhập hệ thống   | Admin, Staff, Warehouse | MVP   | P0       |
| UC-AUTH-002 | Đăng xuất hệ thống   | Admin, Staff, Warehouse | MVP   | P1       |
| UC-AUTH-003 | Xem hồ sơ cá nhân    | Admin, Staff, Warehouse | MVP   | P1       |
| UC-AUTH-004 | Đổi mật khẩu lần đầu | Admin, Staff, Warehouse | MVP   | P1       |
| UC-AUTH-005 | Xử lý user inactive  | System                  | MVP   | P0       |

### 6.2. User/Role/Permission

| UC ID      | Use Case                               | Primary Actor | Scope       | Priority |
| ---------- | -------------------------------------- | ------------- | ----------- | -------- |
| UC-IAM-001 | Tạo user nội bộ                        | Admin         | MVP         | P1       |
| UC-IAM-002 | Gán role cho user                      | Admin         | MVP         | P1       |
| UC-IAM-003 | Gỡ role khỏi user                      | Admin         | MVP         | P1       |
| UC-IAM-004 | Deactivate user                        | Admin         | MVP         | P1       |
| UC-IAM-005 | Xem roles và permissions               | Admin         | MVP         | P2       |
| UC-IAM-006 | Quản lý role-permission matrix bằng UI | Admin         | Should-have | P3       |

### 6.3. Medicine

| UC ID      | Use Case               | Primary Actor           | Scope | Priority |
| ---------- | ---------------------- | ----------------------- | ----- | -------- |
| UC-MED-001 | Tạo Medicine           | Admin                   | MVP   | P0       |
| UC-MED-002 | Cập nhật Medicine      | Admin                   | MVP   | P0       |
| UC-MED-003 | Deactivate Medicine    | Admin                   | MVP   | P1       |
| UC-MED-004 | Xem/tìm kiếm Medicine  | Admin, Staff, Warehouse | MVP   | P0       |
| UC-MED-005 | Cập nhật selling price | Admin                   | MVP   | P1       |

### 6.4. ActiveIngredient

| UC ID      | Use Case                              | Primary Actor           | Scope | Priority |
| ---------- | ------------------------------------- | ----------------------- | ----- | -------- |
| UC-ACT-001 | Tạo ActiveIngredient                  | Admin                   | MVP   | P0       |
| UC-ACT-002 | Cập nhật ActiveIngredient             | Admin                   | MVP   | P1       |
| UC-ACT-003 | Mapping Medicine với ActiveIngredient | Admin                   | MVP   | P0       |
| UC-ACT-004 | Xem ActiveIngredient                  | Admin, Staff, Warehouse | MVP   | P1       |

### 6.5. Supplier

| UC ID      | Use Case            | Primary Actor    | Scope | Priority |
| ---------- | ------------------- | ---------------- | ----- | -------- |
| UC-SUP-001 | Tạo Supplier        | Admin, Warehouse | MVP   | P0       |
| UC-SUP-002 | Cập nhật Supplier   | Admin, Warehouse | MVP   | P1       |
| UC-SUP-003 | Deactivate Supplier | Admin            | MVP   | P1       |
| UC-SUP-004 | Xem Supplier        | Admin, Warehouse | MVP   | P1       |

### 6.6. MedicineBatch/Inventory

| UC ID      | Use Case                     | Primary Actor    | Scope | Priority |
| ---------- | ---------------------------- | ---------------- | ----- | -------- |
| UC-INV-001 | Xem Inventory Summary        | Admin, Warehouse | MVP   | P0       |
| UC-INV-002 | Xem Batch Detail             | Admin, Warehouse | MVP   | P0       |
| UC-INV-003 | Xem low-stock                | Admin, Warehouse | MVP   | P1       |
| UC-INV-004 | Xem near-expiry              | Admin, Warehouse | MVP   | P1       |
| UC-INV-005 | Xem sellable stock trong POS | Staff, Admin     | MVP   | P0       |

### 6.7. Stock Import

| UC ID      | Use Case                    | Primary Actor    | Scope | Priority |
| ---------- | --------------------------- | ---------------- | ----- | -------- |
| UC-STI-001 | Tạo Stock Import Draft      | Admin, Warehouse | MVP   | P0       |
| UC-STI-002 | Cập nhật Stock Import Draft | Admin, Warehouse | MVP   | P1       |
| UC-STI-003 | Cancel Stock Import Draft   | Admin, Warehouse | MVP   | P1       |
| UC-STI-004 | Confirm Stock Import        | Admin, Warehouse | MVP   | P0       |
| UC-STI-005 | Xem Stock Import Detail     | Admin, Warehouse | MVP   | P1       |

### 6.8. Inventory Adjustment

| UC ID      | Use Case                     | Primary Actor    | Scope | Priority |
| ---------- | ---------------------------- | ---------------- | ----- | -------- |
| UC-ADJ-001 | Tạo Inventory Adjustment     | Admin, Warehouse | MVP   | P0       |
| UC-ADJ-002 | Confirm Inventory Adjustment | Admin, Warehouse | MVP   | P0       |
| UC-ADJ-003 | Xem Inventory Adjustment     | Admin, Warehouse | MVP   | P1       |
| UC-ADJ-004 | Correction Adjustment        | Admin, Warehouse | MVP   | P2       |

### 6.9. POS Draft Order

| UC ID      | Use Case                      | Primary Actor | Scope | Priority |
| ---------- | ----------------------------- | ------------- | ----- | -------- |
| UC-POS-001 | Tạo Draft Order               | Staff, Admin  | MVP   | P0       |
| UC-POS-002 | Thêm Medicine vào Draft Order | Staff, Admin  | MVP   | P0       |
| UC-POS-003 | Cập nhật số lượng item        | Staff, Admin  | MVP   | P0       |
| UC-POS-004 | Xóa item khỏi Draft Order     | Staff, Admin  | MVP   | P1       |
| UC-POS-005 | Cancel Draft Order            | Staff, Admin  | MVP   | P1       |
| UC-POS-006 | Xem Order History             | Staff, Admin  | MVP   | P1       |
| UC-POS-007 | Xem Order Detail              | Staff, Admin  | MVP   | P1       |

### 6.10. Interaction Checking

| UC ID      | Use Case                                    | Primary Actor | Scope | Priority |
| ---------- | ------------------------------------------- | ------------- | ----- | -------- |
| UC-INT-001 | Kiểm tra interaction trong Draft Order      | System        | MVP   | P0       |
| UC-INT-002 | Admin quản lý DrugInteraction Rule          | Admin         | MVP   | P0       |
| UC-INT-003 | Standalone Interaction Check cho demo/Admin | Admin         | MVP   | P2       |

### 6.11. HIGH Alert Handling / InteractionAlert

| UC ID      | Use Case                               | Primary Actor | Scope | Priority |
| ---------- | -------------------------------------- | ------------- | ----- | -------- |
| UC-ALT-001 | Xem InteractionAlert trong Order       | Staff, Admin  | MVP   | P0       |
| UC-ALT-002 | Acknowledge HIGH Alert                 | Staff, Admin  | MVP   | P0       |
| UC-ALT-003 | Nhập consultation note cho HIGH Alert  | Staff, Admin  | MVP   | P0       |
| UC-ALT-004 | Xem InteractionAlert History           | Admin         | MVP   | P1       |
| UC-ALT-005 | Inactivate alert khi không còn áp dụng | System        | MVP   | P0       |

### 6.12. AI Copilot Assistance

| UC ID     | Use Case                        | Primary Actor | Scope       | Priority |
| --------- | ------------------------------- | ------------- | ----------- | -------- |
| UC-AI-001 | AI giải thích InteractionAlert  | Staff, Admin  | MVP         | P1       |
| UC-AI-002 | AI tạo consultation note draft  | Staff, Admin  | MVP         | P1       |
| UC-AI-003 | AI từ chối yêu cầu vượt phạm vi | System        | MVP         | P0       |
| UC-AI-004 | Xem AI Audit Log                | Admin         | MVP         | P1       |
| UC-AI-005 | AI-generated report narrative   | Admin         | Should-have | P3       |

### 6.13. Checkout

| UC ID      | Use Case                                  | Primary Actor        | Scope | Priority |
| ---------- | ----------------------------------------- | -------------------- | ----- | -------- |
| UC-CHK-001 | Thực hiện Checkout                        | Staff, Admin         | MVP   | P0       |
| UC-CHK-002 | Checkout thất bại do stock không đủ       | Staff, Admin, System | MVP   | P0       |
| UC-CHK-003 | Checkout bị chặn do HIGH alert chưa xử lý | Staff, Admin, System | MVP   | P0       |
| UC-CHK-004 | Retry checkout idempotent                 | Staff, Admin, System | MVP   | P1       |

### 6.14. Payment/Invoice

| UC ID        | Use Case                           | Primary Actor        | Scope | Priority |
| ------------ | ---------------------------------- | -------------------- | ----- | -------- |
| UC-PAY-001   | Process cash payment simulation    | Staff, Admin, System | MVP   | P0       |
| UC-PAY-002   | Process bank transfer simulation   | Staff, Admin, System | MVP   | P1       |
| UC-INVOC-001 | Tạo Invoice sau successful payment | System               | MVP   | P0       |
| UC-INVOC-002 | Xem Invoice                        | Staff, Admin         | MVP   | P1       |

### 6.15. Reports

| UC ID      | Use Case                          | Primary Actor    | Scope       | Priority |
| ---------- | --------------------------------- | ---------------- | ----------- | -------- |
| UC-RPT-001 | Xem Revenue Report                | Admin            | MVP         | P1       |
| UC-RPT-002 | Xem Top Medicines Report          | Admin            | MVP         | P1       |
| UC-RPT-003 | Xem Inventory Report              | Admin, Warehouse | MVP         | P1       |
| UC-RPT-004 | Xem AI-generated report narrative | Admin            | Should-have | P3       |

### 6.16. Graph-RAG

| UC ID        | Use Case                                           | Primary Actor | Scope       | Priority |
| ------------ | -------------------------------------------------- | ------------- | ----------- | -------- |
| UC-GRAPH-001 | Xem Graph Explorer read-only                       | Admin, Staff  | MVP         | P1       |
| UC-GRAPH-002 | Hỏi Graph-RAG về quan hệ thuốc/hoạt chất/tương tác | Admin, Staff  | MVP         | P1       |
| UC-GRAPH-003 | Fallback khi graph stale/unavailable               | System        | MVP         | P0       |
| UC-GRAPH-004 | Xem Graph Sync Status/retry                        | Admin         | Should-have | P3       |

### 6.17. System Settings

| UC ID      | Use Case                          | Primary Actor | Scope       | Priority |
| ---------- | --------------------------------- | ------------- | ----------- | -------- |
| UC-SET-001 | Cấu hình near-expiry threshold    | Admin         | MVP         | P1       |
| UC-SET-002 | Quản lý AI provider/model bằng UI | Admin         | Should-have | P3       |
| UC-SET-003 | Quản lý prompt templates bằng UI  | Admin         | Should-have | P3       |

### 6.18. Demo Reset

| UC ID      | Use Case                                      | Primary Actor                 | Scope | Priority |
| ---------- | --------------------------------------------- | ----------------------------- | ----- | -------- |
| UC-DMO-001 | Chạy demo reset local                         | Release/Demo Owner, Developer | MVP   | P0       |
| UC-DMO-002 | Verify smoke test sau demo reset              | Tester, Release/Demo Owner    | MVP   | P0       |
| UC-DMO-003 | Demo reset bị từ chối ở non-local environment | System                        | MVP   | P0       |

---

## 7. MVP Use Cases

MVP use cases là các use case bắt buộc để sản phẩm đạt baseline.

Nhóm MVP chính:

1. UC-AUTH-001 đến UC-AUTH-005.
2. UC-IAM-001 đến UC-IAM-005.
3. UC-MED-001 đến UC-MED-005.
4. UC-ACT-001 đến UC-ACT-004.
5. UC-SUP-001 đến UC-SUP-004.
6. UC-INV-001 đến UC-INV-005.
7. UC-STI-001 đến UC-STI-005.
8. UC-ADJ-001 đến UC-ADJ-004.
9. UC-POS-001 đến UC-POS-007.
10. UC-INT-001 đến UC-INT-003.
11. UC-ALT-001 đến UC-ALT-005.
12. UC-AI-001 đến UC-AI-004.
13. UC-CHK-001 đến UC-CHK-004.
14. UC-PAY-001 đến UC-PAY-002.
15. UC-INVOC-001 đến UC-INVOC-002.
16. UC-RPT-001 đến UC-RPT-003.
17. UC-GRAPH-001 đến UC-GRAPH-003.
18. UC-SET-001.
19. UC-DMO-001 đến UC-DMO-003.

Các MVP use cases có priority P0/P1 phải được ưu tiên trong SRS, API, UI và Testing.

---

## 8. Should-have Use Cases

Should-have use cases không chặn MVP.

| UC ID        | Use Case                               | Actor       | Ghi chú                                    |
| ------------ | -------------------------------------- | ----------- | ------------------------------------------ |
| UC-IAM-006   | Quản lý role-permission matrix bằng UI | Admin       | Có thể seed cố định trong MVP              |
| UC-AI-005    | AI-generated report narrative          | Admin       | Reports MVP vẫn deterministic              |
| UC-RPT-004   | Xem AI-generated report narrative      | Admin       | Không chặn reports MVP                     |
| UC-GRAPH-004 | Xem Graph Sync Status/retry            | Admin       | Backend Graph Sync vẫn là MVP              |
| UC-SET-002   | Quản lý AI provider/model bằng UI      | Admin       | Backend config mandatory                   |
| UC-SET-003   | Quản lý prompt templates bằng UI       | Admin       | Prompt versioning MVP, UI edit Should-have |
| UC-CUS-001   | Quản lý Customer profile               | Admin/Staff | Should-have                                |
| UC-CUS-002   | Xem customer purchase history nâng cao | Admin/Staff | Should-have                                |
| UC-AUD-001   | Xem Generic System Audit Log UI        | Admin       | Backend audit logging vẫn MVP              |

---

## 9. Future Use Cases

Future use cases thuộc giai đoạn thương mại/mở rộng sau MVP.

| UC ID         | Use Case                                   | Actor            | Ghi chú                                    |
| ------------- | ------------------------------------------ | ---------------- | ------------------------------------------ |
| UC-COM-001    | Customer đăng ký tài khoản                 | Customer         | Future                                     |
| UC-COM-002    | Customer mua thuốc online                  | Customer         | Future                                     |
| UC-COM-003    | Thêm sản phẩm vào cart                     | Customer         | Future                                     |
| UC-COM-004    | Quản lý wishlist                           | Customer         | Future                                     |
| UC-COM-005    | Áp dụng coupon                             | Customer         | Future                                     |
| UC-COM-006    | Quản lý shipping                           | Admin/Staff      | Future                                     |
| UC-RET-001    | Xử lý refund                               | Admin/Accounting | Future                                     |
| UC-RET-002    | Xử lý return                               | Admin/Staff      | Future                                     |
| UC-MW-001     | Quản lý multi-store                        | Admin            | Future                                     |
| UC-MW-002     | Quản lý multi-warehouse                    | Admin/Warehouse  | Future                                     |
| UC-MW-003     | Stock transfer giữa kho                    | Warehouse        | Future                                     |
| UC-FIN-001    | Real bank reconciliation                   | Admin/Accounting | Future                                     |
| UC-GRAPH-F001 | Quản lý DrugGroup taxonomy                 | Admin            | Future nếu có dữ liệu authoritative        |
| UC-GRAPH-F002 | Graph enrichment Symptom/Condition/RedFlag | Admin            | Future/demo-only, không ảnh hưởng checkout |

---

## 10. Out of Scope Use Cases

Các use case sau không triển khai trong phạm vi hiện tại.

| UC ID      | Use Case                                           | Lý do                            |
| ---------- | -------------------------------------------------- | -------------------------------- |
| UC-OOS-001 | AI chẩn đoán bệnh                                  | Không an toàn, Out of Scope      |
| UC-OOS-002 | AI kê đơn thuốc                                    | Không an toàn, Out of Scope      |
| UC-OOS-003 | AI đưa liều dùng cụ thể                            | Không an toàn, Out of Scope      |
| UC-OOS-004 | AI thay thế bác sĩ/dược sĩ                         | Không đúng phạm vi               |
| UC-OOS-005 | Staff submit raw Cypher                            | Rủi ro bảo mật                   |
| UC-OOS-006 | Warehouse xem InteractionAlert                     | Không thuộc MVP                  |
| UC-OOS-007 | Warehouse dùng Graph Explorer                      | Không thuộc MVP                  |
| UC-OOS-008 | Direct edit inventory quantity                     | Bị thay bởi Inventory Adjustment |
| UC-OOS-009 | Checkout bỏ qua FEFO                               | Sai business rule                |
| UC-OOS-010 | Checkout bỏ qua HIGH alert                         | Sai safety rule                  |
| UC-OOS-011 | Payment trực tiếp ngoài checkout để hoàn tất order | Sai baseline                     |
| UC-OOS-012 | Invoice trực tiếp ngoài checkout để hoàn tất order | Sai baseline                     |
| UC-OOS-013 | Demo reset ở production/staging                    | Rủi ro destructive               |
| UC-OOS-014 | Full 100-table implementation bắt buộc MVP         | Không đúng scope                 |
| UC-OOS-015 | Medicine-level interaction rule official           | Đã bị thay thế                   |

---

## 11. Detailed Use Case Specification Template

Mỗi use case chi tiết dùng template sau:

| Field                    | Nội dung                                  |
| ------------------------ | ----------------------------------------- |
| Use Case ID              | Mã use case                               |
| Use Case Name            | Tên use case                              |
| Module                   | Module/package                            |
| Scope                    | MVP / Should-have / Future / Out of Scope |
| Priority                 | P0/P1/P2/P3/P4/X                          |
| Primary Actor            | Actor chính                               |
| Supporting Actors        | Actor phụ hoặc system actor               |
| Goal                     | Mục tiêu của actor                        |
| Trigger                  | Sự kiện kích hoạt                         |
| Preconditions            | Điều kiện trước                           |
| Postconditions — Success | Kết quả sau khi thành công                |
| Postconditions — Failure | Kết quả sau khi thất bại                  |
| Main Flow                | Luồng chính                               |
| Alternative Flows        | Luồng thay thế                            |
| Exception Flows          | Luồng lỗi                                 |
| Business Rules           | Business rules liên quan                  |
| Authorization            | Quyền cần có                              |
| SRS Traceability         | FR/BR/NFR liên quan                       |
| Notes                    | Ghi chú                                   |

---

# 12. Use Case Details theo Module

---

# 12.1. Login/Profile

## UC-AUTH-001 — Đăng nhập hệ thống

| Field                    | Nội dung                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| Use Case ID              | UC-AUTH-001                                                                                       |
| Use Case Name            | Đăng nhập hệ thống                                                                                |
| Module                   | Login/Profile                                                                                     |
| Scope                    | MVP                                                                                               |
| Priority                 | P0                                                                                                |
| Primary Actor            | Admin, Staff, Warehouse                                                                           |
| Supporting Actors        | Supabase Auth, Backend Authorization Service                                                      |
| Goal                     | User đăng nhập vào hệ thống bằng Supabase Auth và được chuyển vào giao diện phù hợp với quyền     |
| Trigger                  | User mở màn hình đăng nhập và nhập email/password                                                 |
| Preconditions            | User đã có Supabase account; user profile nội bộ tồn tại; user profile active                     |
| Postconditions — Success | User có session hợp lệ; backend resolve được profile, roles, permissions; user vào app theo quyền |
| Postconditions — Failure | User không vào được app; lỗi được hiển thị an toàn                                                |

### Main Flow

1. User mở màn hình đăng nhập.
2. User nhập email và password.
3. Frontend gửi thông tin đăng nhập tới Supabase Auth.
4. Supabase Auth xác thực thông tin.
5. Supabase Auth trả session/access token nếu thành công.
6. Frontend gọi backend để lấy profile/permission context.
7. Backend verify Supabase access token.
8. Backend tìm user profile nội bộ theo Supabase user ID.
9. Backend kiểm tra user profile active.
10. Backend kiểm tra cờ `must_change_password`.
11. Backend load roles và permissions hiệu lực.
12. Backend trả thông tin user context cho frontend.
13. Frontend render menu và dashboard phù hợp với quyền.

### Alternative Flows

**A1 — User cần đổi mật khẩu lần đầu**

1. Backend phát hiện `must_change_password = true`.
2. Backend trả trạng thái password change required.
3. Frontend chuyển user đến flow đổi mật khẩu.
4. User chưa được vào các chức năng chính cho đến khi hoàn tất.

**A2 — User có nhiều role**

1. Backend load tất cả active roles.
2. Backend tính effective permissions là hợp permissions của các roles.
3. Frontend hiển thị chức năng theo effective permissions.

### Exception Flows

**E1 — Sai email/password**

1. Supabase Auth từ chối đăng nhập.
2. Frontend hiển thị lỗi đăng nhập không thành công.
3. Không tạo session.

**E2 — Token hợp lệ nhưng không có profile nội bộ**

1. Backend không tìm thấy user profile.
2. Backend trả lỗi profile not configured.
3. User không vào app.

**E3 — User inactive**

1. Backend phát hiện profile inactive.
2. Backend từ chối truy cập.
3. Frontend hiển thị thông báo tài khoản bị vô hiệu hóa.

### Business Rules

1. Supabase Auth là authentication provider chính thức.
2. PostgreSQL không lưu password/password_hash.
3. Backend là nơi resolve roles/permissions.
4. User inactive không được truy cập chức năng chính.
5. Frontend visibility không thay thế backend authorization.

### Authorization

* Required authentication: No trước khi login.
* Sau login: backend phải verify token và user profile.

### SRS Traceability

* FR-AUTH-001 đến FR-AUTH-012.
* FR-RBAC-001 đến FR-RBAC-014.
* NFR-SEC-001 đến NFR-SEC-006.
* BR-AUTH-001 đến BR-AUTH-006.

---

## UC-AUTH-004 — Đổi mật khẩu lần đầu

| Field                    | Nội dung                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------ |
| Use Case ID              | UC-AUTH-004                                                                          |
| Use Case Name            | Đổi mật khẩu lần đầu                                                                 |
| Module                   | Login/Profile                                                                        |
| Scope                    | MVP                                                                                  |
| Priority                 | P1                                                                                   |
| Primary Actor            | Admin, Staff, Warehouse                                                              |
| Supporting Actors        | Supabase Auth, Backend Authorization Service                                         |
| Goal                     | User có `must_change_password = true` đổi mật khẩu trước khi vào hệ thống            |
| Trigger                  | User đăng nhập thành công nhưng bị yêu cầu đổi mật khẩu                              |
| Preconditions            | User authenticated; user profile có `must_change_password = true`                    |
| Postconditions — Success | Password được update qua Supabase; `must_change_password` chuyển false; user vào app |
| Postconditions — Failure | User vẫn bị chặn khỏi chức năng chính                                                |

### Main Flow

1. User đăng nhập thành công.
2. Backend trả trạng thái `password_change_required`.
3. Frontend hiển thị form đổi mật khẩu.
4. User nhập mật khẩu mới và xác nhận.
5. Frontend gửi yêu cầu update password qua Supabase Auth mechanism.
6. Supabase Auth cập nhật password thành công.
7. Frontend/backend gọi nghiệp vụ hoàn tất first-login.
8. Backend cập nhật `must_change_password = false`.
9. Backend ghi audit nếu cần.
10. User được chuyển vào app theo quyền.

### Alternative Flows

**A1 — User hủy flow đổi mật khẩu**

1. User thoát khỏi trang đổi mật khẩu.
2. Hệ thống không thay đổi `must_change_password`.
3. Lần đăng nhập tiếp theo user vẫn bị yêu cầu đổi mật khẩu.

### Exception Flows

**E1 — Password mới không hợp lệ**

1. Supabase Auth từ chối update password.
2. UI hiển thị lỗi.
3. User vẫn ở flow đổi mật khẩu.

**E2 — Update Supabase thành công nhưng backend update flag thất bại**

1. Hệ thống báo lỗi đồng bộ trạng thái.
2. User có thể cần thử lại.
3. Backend không cho vào app cho đến khi flag được cập nhật.

### Business Rules

1. Password update dùng Supabase Auth.
2. PostgreSQL không lưu password/password_hash.
3. User phải hoàn tất first-login trước khi vào nghiệp vụ chính.

### Authorization

* User phải authenticated.
* User chỉ được đổi mật khẩu cho chính mình trong flow này.

### SRS Traceability

* FR-AUTH-006.
* FR-AUTH-007.
* FR-AUTH-008.
* FR-AUTH-009.
* NFR-SEC-003.
* BR-AUTH-001.
* BR-AUTH-002.

---

# 12.2. User/Role/Permission

## UC-IAM-001 — Tạo user nội bộ

| Field                    | Nội dung                                                                                                 |
| ------------------------ | -------------------------------------------------------------------------------------------------------- |
| Use Case ID              | UC-IAM-001                                                                                               |
| Use Case Name            | Tạo user nội bộ                                                                                          |
| Module                   | User/Role/Permission                                                                                     |
| Scope                    | MVP                                                                                                      |
| Priority                 | P1                                                                                                       |
| Primary Actor            | Admin                                                                                                    |
| Supporting Actors        | Supabase Auth, Backend Authorization Service                                                             |
| Goal                     | Admin tạo tài khoản nhân viên mới để user có thể đăng nhập và được gán role                              |
| Trigger                  | Admin chọn tạo user mới                                                                                  |
| Preconditions            | Admin authenticated; Admin có permission `user.create`; email chưa tồn tại hoặc xử lý theo rule Supabase |
| Postconditions — Success | Supabase user được tạo; user profile nội bộ được tạo; role được gán nếu có                               |
| Postconditions — Failure | Không tạo user hoặc rollback/cleanup theo rule nếu lỗi giữa Supabase và backend                          |

### Main Flow

1. Admin mở User Management.
2. Admin chọn tạo user.
3. Admin nhập email, tên hiển thị và role ban đầu.
4. Admin chọn có yêu cầu đổi mật khẩu lần đầu hay không.
5. Hệ thống validate dữ liệu.
6. Backend gọi Supabase Admin integration để tạo user với temporary password hoặc flow tương đương.
7. Backend tạo user profile nội bộ liên kết Supabase user ID.
8. Backend gán role cho user.
9. Backend ghi audit.
10. Hệ thống thông báo tạo user thành công.

### Alternative Flows

**A1 — Tạo user không gán role ngay**

1. Admin tạo user profile.
2. User chưa có role hiệu lực.
3. User không có quyền nghiệp vụ cho đến khi được gán role.

**A2 — Tạo new-staff demo account**

1. Admin hoặc seed tạo Staff account.
2. `must_change_password = true`.
3. Account dùng để demo first-login flow.

### Exception Flows

**E1 — Email đã tồn tại**

1. Supabase hoặc backend phát hiện email đã tồn tại.
2. Hệ thống từ chối tạo user.
3. Admin được yêu cầu dùng email khác hoặc cập nhật user hiện có.

**E2 — Supabase user tạo thành công nhưng profile nội bộ lỗi**

1. Backend ghi nhận lỗi.
2. Hệ thống cần rollback hoặc đánh dấu cần cleanup.
3. Admin nhận thông báo lỗi.

### Business Rules

1. Authentication dùng Supabase Auth.
2. Password không lưu trong PostgreSQL.
3. User profile nội bộ bắt buộc để dùng app.
4. Role/permission nằm trong PostgreSQL.

### Authorization

* Required permission: `user.create`.
* Actor allowed: Admin.

### SRS Traceability

* FR-AUTH-008.
* FR-RBAC-008.
* DR-ID-001 đến DR-ID-006.
* BR-AUTH-001 đến BR-AUTH-006.

---

## UC-IAM-002 — Gán role cho user

| Field                    | Nội dung                                                                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| Use Case ID              | UC-IAM-002                                                                                      |
| Use Case Name            | Gán role cho user                                                                               |
| Module                   | User/Role/Permission                                                                            |
| Scope                    | MVP                                                                                             |
| Priority                 | P1                                                                                              |
| Primary Actor            | Admin                                                                                           |
| Supporting Actors        | Backend Authorization Service, Audit Log Service                                                |
| Goal                     | Admin gán một hoặc nhiều role cho user để cấp quyền nghiệp vụ                                   |
| Trigger                  | Admin chọn user và gán role                                                                     |
| Preconditions            | Admin authenticated; Admin có permission `user.assign_role`; user profile tồn tại; role tồn tại |
| Postconditions — Success | User-role mapping được tạo; permissions hiệu lực thay đổi                                       |
| Postconditions — Failure | Role không được gán; quyền user không đổi                                                       |

### Main Flow

1. Admin mở User Management.
2. Admin chọn một user.
3. Admin xem roles hiện tại của user.
4. Admin chọn role cần gán.
5. Hệ thống kiểm tra role active.
6. Hệ thống kiểm tra chưa có active mapping trùng.
7. Backend tạo user-role mapping.
8. Backend ghi audit.
9. Hệ thống thông báo gán role thành công.

### Alternative Flows

**A1 — User đã có role**

1. Admin chọn role đã tồn tại.
2. Hệ thống báo user đã có role đó.
3. Không tạo duplicate mapping.

**A2 — User có nhiều role**

1. Admin gán thêm role khác.
2. Hệ thống cộng dồn permissions từ các roles active.

### Exception Flows

**E1 — Role inactive**

1. Hệ thống phát hiện role inactive.
2. Hệ thống từ chối gán role.
3. Admin được thông báo.

**E2 — Admin mất quyền giữa quá trình**

1. Backend kiểm tra permission tại thời điểm request.
2. Nếu thiếu quyền, trả forbidden.
3. Không cập nhật mapping.

### Business Rules

1. Một user có thể có nhiều role.
2. Effective permissions là hợp permissions từ active roles.
3. User inactive vẫn không được truy cập dù có role.

### Authorization

* Required permission: `user.assign_role`.
* Actor allowed: Admin.

### SRS Traceability

* FR-RBAC-001 đến FR-RBAC-014.
* BR-AUTH-003 đến BR-AUTH-006.
* NFR-SEC-004 đến NFR-SEC-006.

---

# 12.3. Medicine

## UC-MED-001 — Tạo Medicine

| Field                    | Nội dung                                                                                     |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| Use Case ID              | UC-MED-001                                                                                   |
| Use Case Name            | Tạo Medicine                                                                                 |
| Module                   | Medicine                                                                                     |
| Scope                    | MVP                                                                                          |
| Priority                 | P0                                                                                           |
| Primary Actor            | Admin                                                                                        |
| Supporting Actors        | Audit Log Service, Graph Sync Worker nếu tạo graph projection                                |
| Goal                     | Admin tạo Medicine để dùng cho inventory, POS, checkout, reports và interaction checking     |
| Trigger                  | Admin chọn tạo Medicine                                                                      |
| Preconditions            | Admin authenticated; có permission `medicine.create`; dữ liệu Medicine chưa trùng theo rule  |
| Postconditions — Success | Medicine được tạo với trạng thái phù hợp; có thể mapping ActiveIngredient; có thể nhập batch |
| Postconditions — Failure | Medicine không được tạo; dữ liệu cũ không đổi                                                |

### Main Flow

1. Admin mở Medicine Management.
2. Admin chọn tạo Medicine.
3. Admin nhập thông tin cơ bản của Medicine.
4. Admin nhập đơn vị bán, selling price và min stock nếu có.
5. Admin chọn trạng thái active.
6. Hệ thống validate dữ liệu bắt buộc.
7. Hệ thống validate `selling_price > 0` nếu Medicine dùng để bán.
8. Backend tạo Medicine.
9. Backend ghi audit nếu cần.
10. Backend tạo Graph Sync outbox event nếu Medicine thuộc graph projection.
11. Hệ thống thông báo tạo Medicine thành công.

### Alternative Flows

**A1 — Tạo Medicine nhưng chưa mapping ActiveIngredient**

1. Admin tạo Medicine trước.
2. Medicine có thể chưa đủ để interaction checking chính xác.
3. Hệ thống nên cảnh báo cần mapping ActiveIngredient.

**A2 — Tạo Medicine inactive**

1. Admin tạo Medicine với trạng thái inactive.
2. Medicine được lưu nhưng không được thêm vào Draft Order.

### Exception Flows

**E1 — selling_price <= 0**

1. Hệ thống phát hiện giá bán không hợp lệ.
2. Hệ thống reject.
3. Medicine không được tạo.

**E2 — Thiếu thông tin bắt buộc**

1. Hệ thống báo lỗi field thiếu.
2. Admin sửa dữ liệu.
3. Không lưu Medicine cho đến khi hợp lệ.

### Business Rules

1. Medicine là entity nghiệp vụ lõi.
2. selling_price phải lớn hơn 0.
3. Inactive Medicine không được bán mới.
4. Product/product_variant không thay thế Medicine trong MVP.

### Authorization

* Required permission: `medicine.create`.
* Actor allowed: Admin.

### SRS Traceability

* FR-MED-001.
* FR-MED-006.
* FR-MED-007.
* FR-MED-011.
* BR-MED-001 đến BR-MED-003.
* DR-MED-001 đến DR-MED-004.

---

## UC-MED-004 — Xem/tìm kiếm Medicine

| Field                    | Nội dung                                                      |
| ------------------------ | ------------------------------------------------------------- |
| Use Case ID              | UC-MED-004                                                    |
| Use Case Name            | Xem/tìm kiếm Medicine                                         |
| Module                   | Medicine                                                      |
| Scope                    | MVP                                                           |
| Priority                 | P0                                                            |
| Primary Actor            | Admin, Staff, Warehouse                                       |
| Supporting Actors        | Backend Authorization Service                                 |
| Goal                     | User tìm và xem Medicine theo ngữ cảnh quyền của mình         |
| Trigger                  | User mở danh sách Medicine hoặc tìm thuốc trong POS/inventory |
| Preconditions            | User authenticated; có permission phù hợp                     |
| Postconditions — Success | Danh sách Medicine được hiển thị theo scope                   |
| Postconditions — Failure | User không thấy dữ liệu hoặc bị forbidden nếu không có quyền  |

### Main Flow

1. User mở màn hình hoặc component tìm Medicine.
2. Frontend gửi query tìm kiếm/lọc.
3. Backend kiểm tra permission.
4. Backend xác định context:

   * Admin: quản lý Medicine.
   * Staff: sales/POS context.
   * Warehouse: inventory context.
5. Backend trả danh sách Medicine phù hợp.
6. UI hiển thị thông tin cần thiết.

### Alternative Flows

**A1 — Staff tìm Medicine trong POS**

1. Staff tìm thuốc.
2. Hệ thống chỉ trả Medicine active và có thể bán theo rule.
3. Hệ thống có thể hiển thị sellable stock.

**A2 — Warehouse xem Medicine trong inventory**

1. Warehouse tìm thuốc.
2. Hệ thống hiển thị thông tin phục vụ kho.
3. Không hiển thị action bán hàng.

### Exception Flows

**E1 — User thiếu quyền**

1. Backend trả forbidden.
2. UI hiển thị lỗi hoặc ẩn module.

### Business Rules

1. Staff chỉ cần thông tin Medicine phục vụ bán hàng.
2. Warehouse chỉ cần thông tin phục vụ kho.
3. Admin có quyền rộng hơn.
4. UI visibility không thay thế backend authorization.

### Authorization

* Admin: `medicine.read`.
* Staff: `medicine.read_sales`.
* Warehouse: `medicine.read_inventory`.

### SRS Traceability

* FR-MED-004.
* FR-MED-005.
* FR-RBAC-006.
* BR-AUTH-005.
* BR-MED-001.

---

# 12.4. ActiveIngredient

## UC-ACT-003 — Mapping Medicine với ActiveIngredient

| Field                    | Nội dung                                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Use Case ID              | UC-ACT-003                                                                                                    |
| Use Case Name            | Mapping Medicine với ActiveIngredient                                                                         |
| Module                   | ActiveIngredient                                                                                              |
| Scope                    | MVP                                                                                                           |
| Priority                 | P0                                                                                                            |
| Primary Actor            | Admin                                                                                                         |
| Supporting Actors        | Graph Sync Worker, Audit Log Service                                                                          |
| Goal                     | Admin liên kết Medicine với ActiveIngredient để hỗ trợ interaction checking và graph projection               |
| Trigger                  | Admin mở Medicine form hoặc ActiveIngredient mapping screen                                                   |
| Preconditions            | Admin authenticated; có permission `medicine_ingredient_mapping.manage`; Medicine và ActiveIngredient tồn tại |
| Postconditions — Success | Mapping được lưu; interaction checking có thể dùng mapping; graph sync event được tạo nếu cần                 |
| Postconditions — Failure | Mapping không đổi                                                                                             |

### Main Flow

1. Admin mở Medicine detail hoặc Medicine form.
2. Admin chọn component mapping ActiveIngredient.
3. Hệ thống hiển thị ActiveIngredients hiện có.
4. Admin chọn một hoặc nhiều ActiveIngredient.
5. Admin có thể nhập amount_text hoặc mô tả hàm lượng nếu cần.
6. Hệ thống validate Medicine và ActiveIngredient active/hợp lệ.
7. Backend lưu mapping.
8. Backend ghi audit nếu cần.
9. Backend tạo Graph Sync outbox event.
10. Hệ thống thông báo mapping thành công.

### Alternative Flows

**A1 — Medicine đã có mapping**

1. Hệ thống hiển thị mapping hiện tại.
2. Admin cập nhật danh sách mapping.
3. Hệ thống lưu mapping mới theo rule.

**A2 — ActiveIngredient chưa tồn tại**

1. Admin không tìm thấy ActiveIngredient.
2. Admin cần tạo ActiveIngredient trước.
3. Sau đó quay lại mapping.

### Exception Flows

**E1 — Mapping trùng**

1. Admin chọn ActiveIngredient đã mapped.
2. Hệ thống tránh duplicate mapping.
3. UI hiển thị cảnh báo hoặc bỏ qua duplicate.

**E2 — Thiếu permission**

1. Backend trả forbidden.
2. Mapping không đổi.

### Business Rules

1. Interaction checking dựa trên ActiveIngredient.
2. Scraped ingredients không tự động thành ActiveIngredient chính thức.
3. Medicine cần mapping để interaction checking chính xác.
4. Graph Sync phải cover Medicine–ActiveIngredient mapping.

### Authorization

* Required permission: `medicine_ingredient_mapping.manage`.
* Actor allowed: Admin.

### SRS Traceability

* FR-ACT-005.
* FR-ACT-006.
* FR-ACT-007.
* FR-ACT-009.
* BR-MED-004 đến BR-MED-006.
* FR-GSY-008.

---

# 12.5. Supplier

## UC-SUP-001 — Tạo Supplier

| Field                    | Nội dung                                            |
| ------------------------ | --------------------------------------------------- |
| Use Case ID              | UC-SUP-001                                          |
| Use Case Name            | Tạo Supplier                                        |
| Module                   | Supplier                                            |
| Scope                    | MVP                                                 |
| Priority                 | P0                                                  |
| Primary Actor            | Admin, Warehouse                                    |
| Supporting Actors        | Audit Log Service                                   |
| Goal                     | Tạo Supplier để sử dụng trong Stock Import          |
| Trigger                  | Admin/Warehouse chọn tạo Supplier                   |
| Preconditions            | User authenticated; có permission `supplier.create` |
| Postconditions — Success | Supplier được tạo và có thể dùng cho Stock Import   |
| Postconditions — Failure | Supplier không được tạo                             |

### Main Flow

1. User mở Supplier Management.
2. User chọn tạo Supplier.
3. User nhập thông tin Supplier.
4. Hệ thống validate dữ liệu.
5. Backend kiểm tra permission.
6. Backend tạo Supplier với trạng thái active.
7. Backend ghi audit nếu cần.
8. Hệ thống thông báo thành công.

### Alternative Flows

**A1 — Admin tạo Supplier**

1. Admin thực hiện giống Warehouse.
2. Admin có thêm quyền deactivate nếu cần.

**A2 — Warehouse tạo Supplier từ Stock Import flow**

1. Warehouse đang tạo Stock Import.
2. Warehouse phát hiện Supplier chưa có.
3. Warehouse tạo Supplier mới.
4. Quay lại Stock Import và chọn Supplier.

### Exception Flows

**E1 — Thiếu thông tin bắt buộc**

1. Hệ thống reject.
2. User bổ sung thông tin.

**E2 — Supplier trùng**

1. Hệ thống phát hiện trùng theo rule.
2. Hệ thống cảnh báo hoặc reject.

### Business Rules

1. Supplier Management thuộc MVP.
2. Warehouse được tạo Supplier.
3. Supplier có lịch sử nhập kho không nên bị xóa cứng.

### Authorization

* Required permission: `supplier.create`.
* Allowed actors: Admin, Warehouse.

### SRS Traceability

* FR-SUP-001.
* FR-SUP-002.
* FR-SUP-003.
* BR-SUP-001 đến BR-SUP-005.

---

## UC-SUP-003 — Deactivate Supplier

| Field                    | Nội dung                                                                   |
| ------------------------ | -------------------------------------------------------------------------- |
| Use Case ID              | UC-SUP-003                                                                 |
| Use Case Name            | Deactivate Supplier                                                        |
| Module                   | Supplier                                                                   |
| Scope                    | MVP                                                                        |
| Priority                 | P1                                                                         |
| Primary Actor            | Admin                                                                      |
| Supporting Actors        | Audit Log Service                                                          |
| Goal                     | Admin vô hiệu hóa Supplier không còn sử dụng mà không xóa lịch sử          |
| Trigger                  | Admin chọn deactivate Supplier                                             |
| Preconditions            | Admin authenticated; có permission `supplier.deactivate`; Supplier tồn tại |
| Postconditions — Success | Supplier inactive; không dùng cho Stock Import mới                         |
| Postconditions — Failure | Supplier vẫn active                                                        |

### Main Flow

1. Admin mở Supplier Detail.
2. Admin chọn deactivate.
3. Hệ thống hiển thị xác nhận.
4. Admin xác nhận.
5. Backend kiểm tra permission.
6. Backend cập nhật Supplier thành inactive.
7. Backend ghi audit.
8. Hệ thống thông báo thành công.

### Alternative Flows

**A1 — Supplier chưa từng có Stock Import**

1. Admin vẫn deactivate thay vì hard delete để nhất quán baseline.
2. Hệ thống giữ lịch sử.

### Exception Flows

**E1 — Warehouse cố deactivate**

1. Warehouse gọi action deactivate.
2. Backend trả forbidden.
3. Supplier không thay đổi.

**E2 — Supplier đã inactive**

1. Hệ thống thông báo Supplier đã inactive.
2. Không thay đổi dữ liệu.

### Business Rules

1. Chỉ Admin deactivate Supplier.
2. Warehouse không deactivate Supplier.
3. Supplier có lịch sử nhập kho không xóa cứng.

### Authorization

* Required permission: `supplier.deactivate`.
* Actor allowed: Admin.

### SRS Traceability

* FR-SUP-004.
* FR-SUP-005.
* FR-SUP-006.
* BR-SUP-002.
* BR-SUP-003.

---

# 12.6. MedicineBatch/Inventory

## UC-INV-001 — Xem Inventory Summary

| Field                    | Nội dung                                                   |
| ------------------------ | ---------------------------------------------------------- |
| Use Case ID              | UC-INV-001                                                 |
| Use Case Name            | Xem Inventory Summary                                      |
| Module                   | MedicineBatch/Inventory                                    |
| Scope                    | MVP                                                        |
| Priority                 | P0                                                         |
| Primary Actor            | Admin, Warehouse                                           |
| Supporting Actors        | Backend Inventory Service                                  |
| Goal                     | User xem tổng quan tồn kho được tính từ MedicineBatch      |
| Trigger                  | User mở Inventory Summary                                  |
| Preconditions            | User authenticated; có permission `inventory.read_summary` |
| Postconditions — Success | Hệ thống hiển thị tồn kho tổng hợp theo Medicine           |
| Postconditions — Failure | User không xem được hoặc bị forbidden                      |

### Main Flow

1. User mở Inventory Summary.
2. Frontend gửi request lấy danh sách tồn kho.
3. Backend kiểm tra permission.
4. Backend tính tồn kho từ MedicineBatch.
5. Backend loại batch hết hạn khỏi sellable stock.
6. Backend tính total quantity, sellable quantity, expired quantity, near-expiry và low-stock nếu có.
7. Backend trả dữ liệu summary.
8. UI hiển thị dữ liệu.

### Alternative Flows

**A1 — User lọc near-expiry**

1. User chọn filter near-expiry.
2. Hệ thống dùng system threshold hoặc filter override tùy ngữ cảnh.
3. Hệ thống trả danh sách tương ứng.

**A2 — User lọc low-stock**

1. User chọn low-stock.
2. Hệ thống tính từ sellable quantity.
3. UI hiển thị thuốc low-stock.

### Exception Flows

**E1 — Staff mở Inventory Summary**

1. Backend phát hiện Staff không có permission.
2. Backend trả forbidden.
3. UI không nên hiển thị menu này cho Staff.

### Business Rules

1. MedicineBatch là source of truth.
2. Batch hết hạn không tính vào sellable stock.
3. Low-stock tính từ sellable quantity.
4. Staff không xem operational low-stock/near-expiry dashboard.

### Authorization

* Required permission: `inventory.read_summary`.
* Allowed actors: Admin, Warehouse.

### SRS Traceability

* FR-BAT-001 đến FR-BAT-014.
* FR-RPT-011.
* BR-INV-001 đến BR-INV-010.
* NFR-DINT-001.

---

## UC-INV-002 — Xem Batch Detail

| Field                    | Nội dung                                                                   |
| ------------------------ | -------------------------------------------------------------------------- |
| Use Case ID              | UC-INV-002                                                                 |
| Use Case Name            | Xem Batch Detail                                                           |
| Module                   | MedicineBatch/Inventory                                                    |
| Scope                    | MVP                                                                        |
| Priority                 | P0                                                                         |
| Primary Actor            | Admin, Warehouse                                                           |
| Supporting Actors        | Backend Inventory Service                                                  |
| Goal                     | User xem chi tiết các batch của một Medicine                               |
| Trigger                  | User chọn Medicine trong Inventory Summary                                 |
| Preconditions            | User authenticated; có permission `inventory.read_batch`; Medicine tồn tại |
| Postconditions — Success | Hệ thống hiển thị danh sách MedicineBatch của Medicine                     |
| Postconditions — Failure | Không hiển thị batch hoặc trả forbidden/not found                          |

### Main Flow

1. User mở Inventory Summary.
2. User chọn một Medicine.
3. Hệ thống mở Batch Detail.
4. Backend kiểm tra permission.
5. Backend lấy danh sách MedicineBatch của Medicine.
6. Backend phân loại batch normal, near-expiry, expired nếu cần.
7. UI hiển thị batch number, expiry date, quantity remaining và trạng thái.

### Alternative Flows

**A1 — Medicine không có batch**

1. Backend trả danh sách rỗng.
2. UI hiển thị empty state.

**A2 — Batch hết hạn**

1. Hệ thống hiển thị batch ở nhóm expired.
2. Batch không được tính vào sellable stock.

### Exception Flows

**E1 — Không đủ quyền**

1. Backend trả forbidden.
2. UI hiển thị access denied hoặc ẩn chức năng.

### Business Rules

1. MedicineBatch source of truth.
2. Batch hết hạn không bán.
3. MedicineBatch không có top-level sidebar menu, truy cập qua Inventory.

### Authorization

* Required permission: `inventory.read_batch`.
* Allowed actors: Admin, Warehouse.

### SRS Traceability

* FR-BAT-001 đến FR-BAT-014.
* BR-INV-001 đến BR-INV-010.

---

# 12.7. Stock Import

## UC-STI-001 — Tạo Stock Import Draft

| Field                    | Nội dung                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------- |
| Use Case ID              | UC-STI-001                                                                            |
| Use Case Name            | Tạo Stock Import Draft                                                                |
| Module                   | Stock Import                                                                          |
| Scope                    | MVP                                                                                   |
| Priority                 | P0                                                                                    |
| Primary Actor            | Admin, Warehouse                                                                      |
| Supporting Actors        | Backend Inventory Service                                                             |
| Goal                     | User tạo phiếu nhập kho ở trạng thái DRAFT                                            |
| Trigger                  | User chọn tạo Stock Import                                                            |
| Preconditions            | User authenticated; có permission `stock_import.create`; Supplier hợp lệ nếu bắt buộc |
| Postconditions — Success | Stock Import DRAFT được tạo                                                           |
| Postconditions — Failure | Stock Import không được tạo                                                           |

### Main Flow

1. User mở Stock Import.
2. User chọn tạo phiếu nhập mới.
3. User chọn Supplier.
4. User thêm các dòng thuốc nhập.
5. Với mỗi dòng, user nhập Medicine, batch number, expiry date, quantity và import price nếu dùng.
6. Hệ thống validate dữ liệu.
7. Backend tạo Stock Import ở trạng thái DRAFT.
8. Backend lưu details.
9. Hệ thống thông báo tạo Draft thành công.

### Alternative Flows

**A1 — User lưu Draft chưa đủ details**

1. Nếu business rule cho phép, hệ thống lưu Draft incomplete.
2. Draft chưa được confirm cho đến khi đủ detail hợp lệ.

**A2 — Supplier chưa tồn tại**

1. Warehouse có thể tạo Supplier trước nếu có permission.
2. Sau đó quay lại Stock Import.

### Exception Flows

**E1 — Thiếu batch number**

1. Hệ thống reject dòng nhập.
2. User phải nhập batch number.

**E2 — Quantity <= 0**

1. Hệ thống reject.
2. User phải nhập quantity hợp lệ.

### Business Rules

1. Stock Import là MVP.
2. Detail phải có batch number và expiry date.
3. Quantity nhập phải lớn hơn 0.
4. DRAFT có thể chỉnh sửa.

### Authorization

* Required permission: `stock_import.create`.
* Allowed actors: Admin, Warehouse.

### SRS Traceability

* FR-STI-001 đến FR-STI-008.
* BR-STI-001 đến BR-STI-007.
* DR-INV-008.

---

## UC-STI-004 — Confirm Stock Import

| Field                    | Nội dung                                                                                                  |
| ------------------------ | --------------------------------------------------------------------------------------------------------- |
| Use Case ID              | UC-STI-004                                                                                                |
| Use Case Name            | Confirm Stock Import                                                                                      |
| Module                   | Stock Import                                                                                              |
| Scope                    | MVP                                                                                                       |
| Priority                 | P0                                                                                                        |
| Primary Actor            | Admin, Warehouse                                                                                          |
| Supporting Actors        | Backend Inventory Service, Audit Log Service, Graph Sync Worker nếu Medicine projection cần update        |
| Goal                     | Xác nhận nhập kho và cập nhật MedicineBatch                                                               |
| Trigger                  | User chọn confirm Stock Import                                                                            |
| Preconditions            | User authenticated; có permission `stock_import.confirm`; Stock Import ở trạng thái DRAFT; details hợp lệ |
| Postconditions — Success | MedicineBatch được tạo/cập nhật; Stock Import chuyển CONFIRMED; audit được ghi                            |
| Postconditions — Failure | Stock Import vẫn DRAFT; MedicineBatch không bị cập nhật một phần                                          |

### Main Flow

1. User mở Stock Import Draft.
2. User kiểm tra details.
3. User chọn confirm.
4. Hệ thống hiển thị xác nhận.
5. User xác nhận.
6. Backend kiểm tra permission.
7. Backend kiểm tra Stock Import status = DRAFT.
8. Backend validate toàn bộ details.
9. Backend kiểm tra batch matching rule.
10. Nếu batch chưa tồn tại, backend tạo MedicineBatch.
11. Nếu batch tồn tại và expiry date match, backend cộng quantity.
12. Backend cập nhật Stock Import thành CONFIRMED.
13. Backend ghi audit.
14. Hệ thống thông báo confirm thành công.

### Alternative Flows

**A1 — Batch đã tồn tại và expiry date match**

1. Backend tìm thấy batch theo Medicine và normalized batch number.
2. Expiry date match.
3. Backend cộng quantity vào batch hiện có.

**A2 — Batch chưa tồn tại**

1. Backend tạo MedicineBatch mới.
2. Batch có quantity received/remaining tương ứng.

### Exception Flows

**E1 — Stock Import đã CONFIRMED**

1. Backend reject.
2. Không cộng kho lần hai.

**E2 — Stock Import đã CANCELLED**

1. Backend reject.
2. Không cập nhật MedicineBatch.

**E3 — Expiry mismatch**

1. Backend phát hiện cùng Medicine + batch number nhưng expiry date khác.
2. Backend reject.
3. User cần sửa dữ liệu hoặc tạo batch đúng rule.

**E4 — Transaction lỗi**

1. Backend rollback toàn bộ cập nhật.
2. Stock Import không chuyển CONFIRMED.
3. MedicineBatch không bị cập nhật một phần.

### Business Rules

1. Confirm mới cập nhật MedicineBatch.
2. CONFIRMED không confirm lại.
3. Batch merge chỉ khi Medicine, normalized batch number và expiry date match.
4. Expiry mismatch phải reject.
5. Confirm phải audit.

### Authorization

* Required permission: `stock_import.confirm`.
* Allowed actors: Admin, Warehouse.

### SRS Traceability

* FR-STI-010 đến FR-STI-016.
* FR-BAT-010 đến FR-BAT-011.
* BR-STI-001 đến BR-STI-010.
* NFR-DINT-002.
* LOG-STI-001.

---

# 12.8. Inventory Adjustment

## UC-ADJ-001 — Tạo Inventory Adjustment

| Field                    | Nội dung                                                                               |
| ------------------------ | -------------------------------------------------------------------------------------- |
| Use Case ID              | UC-ADJ-001                                                                             |
| Use Case Name            | Tạo Inventory Adjustment                                                               |
| Module                   | Inventory Adjustment                                                                   |
| Scope                    | MVP                                                                                    |
| Priority                 | P0                                                                                     |
| Primary Actor            | Admin, Warehouse                                                                       |
| Supporting Actors        | Backend Inventory Service                                                              |
| Goal                     | User tạo phiếu điều chỉnh tồn kho theo MedicineBatch                                   |
| Trigger                  | User chọn tạo Inventory Adjustment                                                     |
| Preconditions            | User authenticated; có permission `inventory_adjustment.create`; MedicineBatch tồn tại |
| Postconditions — Success | Inventory Adjustment được tạo                                                          |
| Postconditions — Failure | Không tạo adjustment                                                                   |

### Main Flow

1. User mở Inventory Adjustment.
2. User chọn tạo adjustment.
3. User chọn MedicineBatch cần điều chỉnh.
4. User nhập quantity điều chỉnh.
5. User nhập reason bắt buộc.
6. Hệ thống validate dữ liệu.
7. Hệ thống kiểm tra adjustment không làm quantity_remaining âm.
8. Backend tạo Inventory Adjustment.
9. Hệ thống thông báo tạo thành công.

### Alternative Flows

**A1 — Adjustment nhiều batch**

1. User thêm nhiều detail.
2. Hệ thống validate từng batch.
3. Không detail nào được làm batch âm sau confirm.

### Exception Flows

**E1 — Thiếu reason**

1. Hệ thống reject.
2. User phải nhập reason.

**E2 — Adjustment làm quantity âm**

1. Hệ thống reject.
2. User phải sửa quantity.

### Business Rules

1. Adjustment phải có reason.
2. Adjustment theo MedicineBatch.
3. Không làm quantity_remaining âm.
4. Không direct edit quantity.

### Authorization

* Required permission: `inventory_adjustment.create`.
* Allowed actors: Admin, Warehouse.

### SRS Traceability

* FR-ADJ-001 đến FR-ADJ-004.
* BR-ADJ-001 đến BR-ADJ-006.
* NFR-DINT-001.

---

## UC-ADJ-002 — Confirm Inventory Adjustment

| Field                    | Nội dung                                                                            |
| ------------------------ | ----------------------------------------------------------------------------------- |
| Use Case ID              | UC-ADJ-002                                                                          |
| Use Case Name            | Confirm Inventory Adjustment                                                        |
| Module                   | Inventory Adjustment                                                                |
| Scope                    | MVP                                                                                 |
| Priority                 | P0                                                                                  |
| Primary Actor            | Admin, Warehouse                                                                    |
| Supporting Actors        | Backend Inventory Service, Audit Log Service                                        |
| Goal                     | Xác nhận adjustment và cập nhật MedicineBatch                                       |
| Trigger                  | User chọn confirm adjustment                                                        |
| Preconditions            | User authenticated; có permission `inventory_adjustment.confirm`; adjustment hợp lệ |
| Postconditions — Success | MedicineBatch được cập nhật; adjustment confirmed; audit ghi lại                    |
| Postconditions — Failure | Không cập nhật batch hoặc rollback nếu lỗi                                          |

### Main Flow

1. User mở Inventory Adjustment.
2. User kiểm tra details và reason.
3. User chọn confirm.
4. Backend kiểm tra permission.
5. Backend validate trạng thái adjustment.
6. Backend kiểm tra không batch nào âm sau điều chỉnh.
7. Backend cập nhật MedicineBatch.
8. Backend chuyển adjustment thành CONFIRMED hoặc trạng thái tương đương.
9. Backend ghi audit.
10. Hệ thống thông báo thành công.

### Alternative Flows

**A1 — Correction adjustment**

1. Nếu cần sửa lỗi adjustment cũ, user tạo adjustment ngược/correction.
2. Hệ thống không sửa trực tiếp confirmed adjustment cũ.

### Exception Flows

**E1 — Adjustment đã confirmed**

1. Backend reject confirm lại.
2. Không cập nhật batch lần hai.

**E2 — Batch không đủ quantity để giảm**

1. Backend reject.
2. Adjustment chưa confirmed.

### Business Rules

1. Confirmed adjustment không sửa trực tiếp.
2. Correction dùng adjustment mới.
3. Confirm phải audit.
4. Quantity_remaining không âm.

### Authorization

* Required permission: `inventory_adjustment.confirm`.
* Allowed actors: Admin, Warehouse.

### SRS Traceability

* FR-ADJ-005 đến FR-ADJ-010.
* BR-ADJ-001 đến BR-ADJ-006.
* LOG-ADJ-001.

---

# 12.9. POS Draft Order

## UC-POS-001 — Tạo Draft Order

| Field                    | Nội dung                                            |
| ------------------------ | --------------------------------------------------- |
| Use Case ID              | UC-POS-001                                          |
| Use Case Name            | Tạo Draft Order                                     |
| Module                   | POS Draft Order                                     |
| Scope                    | MVP                                                 |
| Priority                 | P0                                                  |
| Primary Actor            | Staff, Admin                                        |
| Supporting Actors        | Backend Order Service                               |
| Goal                     | User tạo đơn bán nháp để bắt đầu bán thuốc tại quầy |
| Trigger                  | User mở POS và chọn tạo đơn                         |
| Preconditions            | User authenticated; có permission `order.create`    |
| Postconditions — Success | Draft Order được tạo; order có created_by           |
| Postconditions — Failure | Không tạo order                                     |

### Main Flow

1. User mở POS.
2. User chọn tạo Draft Order.
3. Hệ thống tạo Order với status DRAFT.
4. Hệ thống gán created_by là user hiện tại.
5. Nếu không chọn customer, hệ thống dùng khách lẻ.
6. UI hiển thị Draft Order trống.
7. User có thể thêm Medicine.

### Alternative Flows

**A1 — Admin tạo Draft Order**

1. Admin tạo order như Staff.
2. Admin có thể xử lý bất kỳ Draft Order hợp lệ.

**A2 — Khách lẻ**

1. User không chọn Customer.
2. Hệ thống lưu `customer_id = null`.
3. UI hiển thị “Khách lẻ”.

### Exception Flows

**E1 — Warehouse cố tạo Draft Order**

1. Backend reject vì thiếu permission.
2. Không tạo Order.

### Business Rules

1. POS hỗ trợ khách lẻ.
2. Order status MVP gồm DRAFT, PAID, CANCELLED.
3. Staff ownership bắt đầu từ created_by.

### Authorization

* Required permission: `order.create`.
* Allowed actors: Staff, Admin.

### SRS Traceability

* FR-POS-001 đến FR-POS-003.
* BR-SALES-001.
* BR-AUTH-007.
* FR-RBAC-009.

---

## UC-POS-002 — Thêm Medicine vào Draft Order

| Field                    | Nội dung                                                                                           |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| Use Case ID              | UC-POS-002                                                                                         |
| Use Case Name            | Thêm Medicine vào Draft Order                                                                      |
| Module                   | POS Draft Order                                                                                    |
| Scope                    | MVP                                                                                                |
| Priority                 | P0                                                                                                 |
| Primary Actor            | Staff, Admin                                                                                       |
| Supporting Actors        | Backend Order Service, Interaction Service                                                         |
| Goal                     | User thêm thuốc vào Draft Order để bán                                                             |
| Trigger                  | User tìm Medicine và chọn thêm vào order                                                           |
| Preconditions            | User authenticated; order tồn tại; order status DRAFT; user có quyền và ownership; Medicine active |
| Postconditions — Success | Medicine được thêm/cập nhật trong Draft Order; interaction check được kích hoạt                    |
| Postconditions — Failure | Order không thay đổi                                                                               |

### Main Flow

1. User tìm Medicine trong POS.
2. Hệ thống hiển thị Medicine active và sellable stock.
3. User chọn Medicine và quantity.
4. Backend kiểm tra permission.
5. Backend kiểm tra order ownership/status.
6. Backend kiểm tra Medicine active.
7. Backend thêm item vào Draft Order.
8. Nếu Medicine đã có trong order, hệ thống cập nhật quantity theo rule nhất quán.
9. Hệ thống kiểm tra lại interactions trong order.
10. Hệ thống persist InteractionAlert nếu có.
11. UI cập nhật order items và alerts.

### Alternative Flows

**A1 — Medicine đã có trong order**

1. User thêm lại cùng Medicine.
2. Hệ thống tăng quantity hoặc cập nhật quantity theo rule.
3. Không tạo duplicate dòng nếu rule không cho phép.

**A2 — Stock thấp**

1. Hệ thống vẫn có thể cho thêm vào Draft Order.
2. POS hiển thị availability warning.
3. Checkout sẽ validate stock chính thức.

### Exception Flows

**E1 — Medicine inactive**

1. Backend reject.
2. UI thông báo Medicine không thể bán.

**E2 — Order không thuộc Staff**

1. Backend trả ownership denied.
2. Order không đổi.

**E3 — Order không phải DRAFT**

1. Backend reject.
2. Không thêm item.

### Business Rules

1. Inactive Medicine không bán mới.
2. Staff chỉ sửa Draft Order của mình.
3. Interaction check chạy khi order item thay đổi.
4. POS hiển thị sellable stock.

### Authorization

* Staff: `order.add_item_own`.
* Admin: `order.update_any_draft` hoặc equivalent all-scope.
* Required ownership for Staff.

### SRS Traceability

* FR-POS-004.
* FR-POS-007.
* FR-POS-008.
* FR-POS-010.
* FR-INT-001.
* FR-ALT-001.

---

## UC-POS-005 — Cancel Draft Order

| Field                    | Nội dung                                                                   |
| ------------------------ | -------------------------------------------------------------------------- |
| Use Case ID              | UC-POS-005                                                                 |
| Use Case Name            | Cancel Draft Order                                                         |
| Module                   | POS Draft Order                                                            |
| Scope                    | MVP                                                                        |
| Priority                 | P1                                                                         |
| Primary Actor            | Staff, Admin                                                               |
| Supporting Actors        | Backend Order Service, Audit Log Service                                   |
| Goal                     | User hủy Draft Order không còn tiếp tục bán                                |
| Trigger                  | User chọn cancel order                                                     |
| Preconditions            | Order tồn tại; order status DRAFT; user có permission và ownership phù hợp |
| Postconditions — Success | Order chuyển CANCELLED; không checkout được nữa                            |
| Postconditions — Failure | Order giữ trạng thái cũ                                                    |

### Main Flow

1. User mở Draft Order.
2. User chọn cancel.
3. UI yêu cầu xác nhận.
4. User xác nhận.
5. Backend kiểm tra permission.
6. Backend kiểm tra status DRAFT.
7. Backend kiểm tra ownership nếu Staff.
8. Backend chuyển Order sang CANCELLED.
9. Backend ghi audit nếu cần.
10. UI hiển thị order cancelled.

### Alternative Flows

**A1 — Admin cancel Draft Order của người khác**

1. Admin có all-scope permission.
2. Backend cho phép nếu order DRAFT.

### Exception Flows

**E1 — Staff cancel Order người khác**

1. Backend trả ownership denied.
2. Order không đổi.

**E2 — Cancel PAID Order**

1. Backend reject.
2. PAID Order không được cancel trong MVP.

### Business Rules

1. Staff cancel DRAFT trong ownership scope.
2. Admin cancel mọi DRAFT.
3. PAID Order immutable.
4. CANCELLED Order không checkout.

### Authorization

* Staff: `order.cancel_own_draft`.
* Admin: `order.cancel_any_draft`.

### SRS Traceability

* FR-POS-011.
* FR-POS-012.
* FR-POS-013.
* FR-POS-014.
* BR-SALES-003 đến BR-SALES-005.

---

# 12.10. Interaction Checking

## UC-INT-001 — Kiểm tra interaction trong Draft Order

| Field                    | Nội dung                                                                                |
| ------------------------ | --------------------------------------------------------------------------------------- |
| Use Case ID              | UC-INT-001                                                                              |
| Use Case Name            | Kiểm tra interaction trong Draft Order                                                  |
| Module                   | Interaction Checking                                                                    |
| Scope                    | MVP                                                                                     |
| Priority                 | P0                                                                                      |
| Primary Actor            | System                                                                                  |
| Initiating Actor         | Staff, Admin                                                                            |
| Supporting Actors        | Backend Interaction Service                                                             |
| Goal                     | Hệ thống phát hiện tương tác thuốc dựa trên ActiveIngredient trong Draft Order          |
| Trigger                  | Order item được thêm, cập nhật hoặc xóa                                                 |
| Preconditions            | Order status DRAFT; Medicine có ActiveIngredient mapping; DrugInteraction Rules tồn tại |
| Postconditions — Success | InteractionAlert được hiển thị và persist nếu có interaction                            |
| Postconditions — Failure | Không tạo alert sai; lỗi được báo nếu check không thể thực hiện                         |

### Main Flow

1. User thay đổi items trong Draft Order.
2. Backend lấy danh sách Medicine trong Order.
3. Backend lấy ActiveIngredient mapping của các Medicine.
4. Backend tạo các cặp ActiveIngredient cần kiểm tra.
5. Backend tìm active DrugInteraction Rules tương ứng.
6. Backend xác định severity, description và recommendation.
7. Backend tạo hoặc cập nhật InteractionAlert cho Order.
8. Backend cập nhật display_count/last_displayed_at nếu alert đã có.
9. Backend chuyển inactive alert không còn áp dụng.
10. UI hiển thị alert cho user.

### Alternative Flows

**A1 — Không có interaction**

1. Backend không tìm thấy rule.
2. Hệ thống không hiển thị alert.
3. Alert cũ không còn áp dụng được inactive nếu cần.

**A2 — Có nhiều interactions**

1. Hệ thống hiển thị danh sách alerts.
2. Alerts được phân nhóm hoặc sắp theo severity nếu UI hỗ trợ.

**A3 — Standalone check**

1. Admin dùng standalone check.
2. Hệ thống trả kết quả interaction.
3. Không tạo Order InteractionAlert History.

### Exception Flows

**E1 — Medicine thiếu ActiveIngredient mapping**

1. Hệ thống có thể cảnh báo dữ liệu chưa đủ.
2. Interaction checking có thể không đầy đủ.
3. Không tự tạo rule sai.

**E2 — Interaction service lỗi**

1. Hệ thống thông báo lỗi.
2. Không checkout nếu HIGH alert state không đảm bảo theo rule checkout.

### Business Rules

1. DrugInteraction Rule ở cấp ActiveIngredient–ActiveIngredient.
2. Medicine–Medicine rule không official.
3. A–B và B–A là cùng một interaction.
4. InteractionAlert phải persist.
5. POS interaction check chính thức phải theo Order.

### Authorization

* Triggered by Staff/Admin order modification.
* Staff must own order.
* Warehouse no access.

### SRS Traceability

* FR-DRG-001 đến FR-DRG-011.
* FR-ALT-001 đến FR-ALT-006.
* BR-INT-001 đến BR-INT-007.

---

## UC-INT-002 — Admin quản lý DrugInteraction Rule

| Field                    | Nội dung                                                              |
| ------------------------ | --------------------------------------------------------------------- |
| Use Case ID              | UC-INT-002                                                            |
| Use Case Name            | Admin quản lý DrugInteraction Rule                                    |
| Module                   | Interaction Checking                                                  |
| Scope                    | MVP                                                                   |
| Priority                 | P0                                                                    |
| Primary Actor            | Admin                                                                 |
| Supporting Actors        | Graph Sync Worker, Audit Log Service                                  |
| Goal                     | Admin tạo/cập nhật/deactivate interaction rule ở cấp ActiveIngredient |
| Trigger                  | Admin mở DrugInteraction Rule Management                              |
| Preconditions            | Admin authenticated; có permission quản lý DrugInteraction Rule       |
| Postconditions — Success | Rule được lưu/cập nhật; graph sync event được tạo                     |
| Postconditions — Failure | Rule không đổi                                                        |

### Main Flow

1. Admin mở Interaction Rule Management.
2. Admin chọn tạo hoặc cập nhật rule.
3. Admin chọn ActiveIngredient A và ActiveIngredient B.
4. Admin chọn severity LOW/MEDIUM/HIGH.
5. Admin nhập description và recommendation.
6. Hệ thống validate dữ liệu.
7. Backend kiểm tra duplicate A–B/B–A.
8. Backend lưu rule.
9. Backend ghi audit.
10. Backend tạo Graph Sync event.
11. UI thông báo thành công.

### Alternative Flows

**A1 — Deactivate rule**

1. Admin chọn deactivate.
2. Backend chuyển rule inactive.
3. Rule không còn dùng cho check mới.
4. Lịch sử alert cũ vẫn giữ.

### Exception Flows

**E1 — Duplicate pair**

1. Backend phát hiện pair đã có rule active.
2. Backend reject hoặc yêu cầu cập nhật rule hiện có.

**E2 — Severity CRITICAL**

1. Admin chọn severity không thuộc MVP.
2. Backend reject vì CRITICAL ngoài MVP.

### Business Rules

1. Rule ở cấp ActiveIngredient.
2. Severity MVP: LOW, MEDIUM, HIGH.
3. CRITICAL ngoài MVP.
4. Rule có lịch sử không xóa cứng.
5. Rule change cần Graph Sync.

### Authorization

* Required permissions:

  * `drug_interaction.create`.
  * `drug_interaction.update`.
  * `drug_interaction.deactivate`.
* Actor allowed: Admin.

### SRS Traceability

* FR-DRG-001 đến FR-DRG-009.
* BR-INT-001 đến BR-INT-006.
* FR-GSY-009.

---

# 12.11. HIGH Alert Handling

## UC-ALT-002 — Acknowledge HIGH Alert

| Field                    | Nội dung                                                                      |
| ------------------------ | ----------------------------------------------------------------------------- |
| Use Case ID              | UC-ALT-002                                                                    |
| Use Case Name            | Acknowledge HIGH Alert                                                        |
| Module                   | HIGH Alert Handling                                                           |
| Scope                    | MVP                                                                           |
| Priority                 | P0                                                                            |
| Primary Actor            | Staff, Admin                                                                  |
| Supporting Actors        | Backend InteractionAlert Service, Audit Log Service                           |
| Goal                     | User xác nhận đã xem và hiểu HIGH alert trước checkout                        |
| Trigger                  | User chọn acknowledge trên HIGH alert                                         |
| Preconditions            | User authenticated; alert active; alert severity HIGH; Order thuộc quyền user |
| Postconditions — Success | Alert có acknowledged_by và acknowledged_at                                   |
| Postconditions — Failure | Alert chưa acknowledged; checkout vẫn bị chặn                                 |

### Main Flow

1. User mở Draft Order có HIGH alert.
2. UI hiển thị HIGH alert rõ ràng.
3. User đọc cảnh báo.
4. User chọn acknowledge.
5. Backend kiểm tra permission.
6. Backend kiểm tra ownership nếu Staff.
7. Backend kiểm tra alert active và severity HIGH.
8. Backend lưu acknowledged_by và acknowledged_at.
9. Backend ghi audit.
10. UI cập nhật trạng thái alert.

### Alternative Flows

**A1 — Admin acknowledge alert của Order bất kỳ**

1. Admin có all-scope permission.
2. Backend cho phép nếu alert active.

### Exception Flows

**E1 — Staff acknowledge alert của Order người khác**

1. Backend trả ownership denied.
2. Alert không đổi.

**E2 — Alert inactive**

1. Backend reject hoặc báo alert không còn áp dụng.
2. Không cập nhật acknowledgement.

### Business Rules

1. HIGH alert cần acknowledgement trước checkout.
2. LOW/MEDIUM không bắt buộc acknowledgement.
3. Warehouse không truy cập alert.

### Authorization

* Staff: `interaction_alert.acknowledge_own_order`.
* Admin: `interaction_alert.acknowledge_all`.

### SRS Traceability

* FR-ALT-009.
* FR-ALT-012.
* FR-ALT-016.
* BR-ALT-006.
* BR-ALT-009.
* LOG-ALT-001.

---

## UC-ALT-003 — Nhập consultation note cho HIGH Alert

| Field                    | Nội dung                                                                       |
| ------------------------ | ------------------------------------------------------------------------------ |
| Use Case ID              | UC-ALT-003                                                                     |
| Use Case Name            | Nhập consultation note cho HIGH Alert                                          |
| Module                   | HIGH Alert Handling                                                            |
| Scope                    | MVP                                                                            |
| Priority                 | P0                                                                             |
| Primary Actor            | Staff, Admin                                                                   |
| Supporting Actors        | Backend InteractionAlert Service, AI Copilot nếu dùng draft, Audit Log Service |
| Goal                     | User ghi consultation note cho từng HIGH alert trước checkout                  |
| Trigger                  | User nhập note trong HIGH alert panel                                          |
| Preconditions            | User authenticated; alert active; severity HIGH; Order thuộc quyền user        |
| Postconditions — Success | Alert có consultation note hợp lệ                                              |
| Postconditions — Failure | Alert thiếu note; checkout vẫn bị chặn                                         |

### Main Flow

1. User mở Draft Order có HIGH alert.
2. User mở phần consultation note.
3. User nhập note thủ công.
4. Backend kiểm tra permission.
5. Backend kiểm tra ownership nếu Staff.
6. Backend validate note không rỗng.
7. Backend lưu consultation note, note_by và note_at.
8. Backend ghi audit.
9. UI cập nhật trạng thái alert.

### Alternative Flows

**A1 — User dùng AI draft**

1. User gọi AI tạo draft.
2. AI trả draft sau guardrail.
3. User chỉnh sửa nếu cần.
4. User xác nhận lưu note.
5. Backend lưu note chính thức.

**A2 — Nhiều HIGH alerts**

1. User phải nhập note cho từng HIGH alert.
2. Checkout chỉ được phép khi tất cả HIGH alerts active đã có note.

### Exception Flows

**E1 — Note rỗng**

1. Backend reject.
2. UI yêu cầu nhập note.

**E2 — AI draft bị guardrail block**

1. AI không trả unsafe output.
2. User có thể nhập note thủ công.

### Business Rules

1. HIGH alert bắt buộc consultation note.
2. Mỗi HIGH alert cần note riêng.
3. AI draft không tự động thành official note.
4. Staff xác nhận mới lưu official note.

### Authorization

* Staff: `interaction_alert.note_own_order`.
* Admin: `interaction_alert.note_all`.

### SRS Traceability

* FR-ALT-010.
* FR-ALT-011.
* FR-ALT-013.
* FR-AIC-003 đến FR-AIC-005.
* BR-ALT-007 đến BR-ALT-009.
* LOG-ALT-002.

---

# 12.12. AI Copilot Assistance

## UC-AI-001 — AI giải thích InteractionAlert

| Field                    | Nội dung                                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| Use Case ID              | UC-AI-001                                                                                                           |
| Use Case Name            | AI giải thích InteractionAlert                                                                                      |
| Module                   | AI Copilot Assistance                                                                                               |
| Scope                    | MVP                                                                                                                 |
| Priority                 | P1                                                                                                                  |
| Primary Actor            | Staff, Admin                                                                                                        |
| Supporting Actors        | AI Guardrail Service, Google AI Provider, MockAI, AI Audit Service                                                  |
| Goal                     | User nhận giải thích tham khảo về InteractionAlert                                                                  |
| Trigger                  | User chọn “AI giải thích” trên alert                                                                                |
| Preconditions            | User authenticated; có permission dùng AI; alert thuộc quyền user; AI config sẵn sàng hoặc MockAI fallback sẵn sàng |
| Postconditions — Success | AI explanation được hiển thị an toàn; AI Audit được ghi                                                             |
| Postconditions — Failure | User nhận safe error/refusal; audit ghi lỗi nếu cần                                                                 |

### Main Flow

1. User mở InteractionAlert trong Order.
2. User chọn yêu cầu AI giải thích.
3. Backend kiểm tra permission và ownership.
4. Backend xây context tối thiểu cho alert.
5. AI Guardrail kiểm tra input.
6. Backend gọi Google AI Provider nếu configured.
7. Provider trả response.
8. AI Guardrail kiểm tra output.
9. Backend ghi AI Audit.
10. UI hiển thị explanation có disclaimer phù hợp.

### Alternative Flows

**A1 — Google AI Provider lỗi**

1. Backend ghi nhận provider error.
2. Backend fallback sang MockAI.
3. AI Audit ghi fallback_used và fallback_reason.
4. UI hiển thị response fallback phù hợp.

**A2 — Graph context unavailable**

1. Nếu explanation cần graph và graph stale/unavailable, hệ thống dùng PostgreSQL fallback.
2. Response có degraded/freshness indicator nếu phù hợp.

### Exception Flows

**E1 — Input yêu cầu chẩn đoán/kê đơn/liều dùng**

1. Input guardrail block.
2. Hệ thống trả safe refusal.
3. Không gọi provider thật nếu không cần.

**E2 — Output unsafe**

1. Output guardrail block.
2. Hệ thống không hiển thị raw unsafe output.
3. UI hiển thị safe refusal.

### Business Rules

1. AI chỉ hỗ trợ tham khảo.
2. AI không chẩn đoán/kê đơn/liều dùng.
3. Google AI Provider ưu tiên.
4. MockAI fallback.
5. AI Audit bắt buộc.

### Authorization

* Required permission: `ai_copilot.use_interaction_explanation`.
* Staff only own order alert.
* Admin all-scope.

### SRS Traceability

* FR-AIC-001 đến FR-AIC-009.
* FR-AIG-001 đến FR-AIG-011.
* FR-AIA-001 đến FR-AIA-014.
* BR-AI-001 đến BR-AI-011.

---

## UC-AI-002 — AI tạo consultation note draft

| Field                    | Nội dung                                                            |
| ------------------------ | ------------------------------------------------------------------- |
| Use Case ID              | UC-AI-002                                                           |
| Use Case Name            | AI tạo consultation note draft                                      |
| Module                   | AI Copilot Assistance                                               |
| Scope                    | MVP                                                                 |
| Priority                 | P1                                                                  |
| Primary Actor            | Staff, Admin                                                        |
| Supporting Actors        | AI Guardrail Service, Google AI Provider, MockAI, AI Audit Service  |
| Goal                     | User tạo draft note để hỗ trợ ghi consultation note cho HIGH alert  |
| Trigger                  | User chọn tạo note draft bằng AI                                    |
| Preconditions            | User có quyền; alert active; alert severity HIGH; Order thuộc scope |
| Postconditions — Success | Draft được hiển thị; chưa lưu làm official note                     |
| Postconditions — Failure | Không có draft hoặc safe refusal                                    |

### Main Flow

1. User mở HIGH alert.
2. User chọn tạo consultation note draft.
3. Backend kiểm tra permission và ownership.
4. Backend tạo context tối thiểu.
5. Input guardrail kiểm tra request.
6. Backend gọi Google AI Provider hoặc MockAI fallback.
7. Output guardrail kiểm tra response.
8. Backend ghi AI Audit.
9. UI hiển thị draft.
10. User có thể chỉnh sửa draft.
11. User xác nhận lưu note nếu muốn.

### Alternative Flows

**A1 — User chỉnh sửa AI draft trước khi lưu**

1. User sửa nội dung draft.
2. User nhấn lưu consultation note.
3. Hệ thống lưu nội dung do user xác nhận, không phải auto-save raw AI output.

### Exception Flows

**E1 — User không xác nhận**

1. Draft không được lưu làm official note.
2. Checkout vẫn bị chặn nếu alert chưa có note.

### Business Rules

1. AI draft không tự động thành official consultation note.
2. Staff/Admin phải xác nhận.
3. AI Audit lưu summary/metadata, không raw PII.

### Authorization

* Required permission: `ai_copilot.generate_note_draft`.
* Staff own order only.
* Admin all-scope.

### SRS Traceability

* FR-AIC-003 đến FR-AIC-005.
* FR-AIG-001 đến FR-AIG-011.
* FR-AIA-001 đến FR-AIA-014.
* BR-AI-008 đến BR-AI-011.

---

# 12.13. Checkout

## UC-CHK-001 — Thực hiện Checkout

| Field                    | Nội dung                                                                                                                    |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| Use Case ID              | UC-CHK-001                                                                                                                  |
| Use Case Name            | Thực hiện Checkout                                                                                                          |
| Module                   | Checkout                                                                                                                    |
| Scope                    | MVP                                                                                                                         |
| Priority                 | P0                                                                                                                          |
| Primary Actor            | Staff, Admin                                                                                                                |
| Supporting Actors        | Backend Checkout Service, Inventory Service, Payment Service, Invoice Service, Audit Log Service                            |
| Goal                     | Hoàn tất Draft Order bằng transaction chính thức, trừ kho theo FEFO, tạo payment và invoice                                 |
| Trigger                  | User chọn checkout trên Draft Order                                                                                         |
| Preconditions            | User authenticated; có permission checkout; Order status DRAFT; Order có items; HIGH alerts đã xử lý đủ; stock đủ           |
| Postconditions — Success | Order PAID; batch allocations được tạo; MedicineBatch bị trừ; successful payment được tạo; invoice được tạo; audit được ghi |
| Postconditions — Failure | Order vẫn DRAFT nếu validation fail; không trừ kho/payment/invoice một phần                                                 |

### Main Flow

1. User mở Draft Order.
2. User kiểm tra items, alerts và payment method.
3. User chọn checkout.
4. Frontend gửi request checkout kèm idempotency key.
5. Backend verify authentication.
6. Backend kiểm tra permission.
7. Backend kiểm tra ownership nếu Staff.
8. Backend lock hoặc kiểm soát concurrency Order.
9. Backend kiểm tra Order status = DRAFT.
10. Backend kiểm tra Order có items.
11. Backend tính lại total ở backend.
12. Backend kiểm tra Medicine còn active hoặc xử lý theo rule nhất quán.
13. Backend kiểm tra active HIGH InteractionAlerts.
14. Backend xác nhận tất cả HIGH alerts đã acknowledged.
15. Backend xác nhận tất cả HIGH alerts có consultation note.
16. Backend kiểm tra sellable MedicineBatch đủ stock.
17. Backend apply FEFO để chọn batch.
18. Backend tạo order item batch allocations.
19. Backend trừ MedicineBatch quantity_remaining.
20. Backend tạo payment attempt.
21. Nếu payment success, backend chuyển Order sang PAID.
22. Backend tạo Invoice.
23. Backend ghi audit.
24. Backend commit transaction.
25. UI hiển thị checkout success và invoice.

### Alternative Flows

**A1 — Cash payment**

1. User chọn cash.
2. User nhập amount tendered.
3. Backend kiểm tra amount tendered >= amount due.
4. Backend tính change amount.
5. Payment success nếu hợp lệ.

**A2 — Simulated bank transfer**

1. User chọn bank transfer simulation.
2. User nhập transaction reference.
3. Backend kiểm tra transaction reference.
4. Payment success theo simulation rule.

**A3 — Order item cần nhiều batch**

1. Batch gần hết hạn không đủ quantity.
2. Backend lấy tiếp batch kế tiếp theo FEFO.
3. Backend tạo nhiều allocations cho cùng order item.

**A4 — Idempotent retry**

1. Client retry cùng idempotency key và payload.
2. Backend trả kết quả checkout đã xử lý.
3. Không trừ kho/payment/invoice lần hai.

### Exception Flows

**E1 — Order không phải DRAFT**

1. Backend reject.
2. Không thay đổi dữ liệu.

**E2 — Stock không đủ**

1. Backend reject checkout.
2. Order vẫn DRAFT.
3. UI hiển thị lỗi stock.
4. Không tạo payment/invoice.

**E3 — HIGH alert chưa acknowledgement**

1. Backend reject checkout.
2. UI yêu cầu acknowledge.
3. Order vẫn DRAFT.

**E4 — HIGH alert chưa consultation note**

1. Backend reject checkout.
2. UI yêu cầu nhập note.
3. Order vẫn DRAFT.

**E5 — Payment failed**

1. Backend tạo failed payment attempt nếu rule cho phép.
2. Order không chuyển PAID.
3. Không tạo invoice.
4. Stock không bị trừ nếu transaction rollback theo thiết kế.

**E6 — Transaction lỗi**

1. Backend rollback.
2. Không có partial state.
3. UI hiển thị lỗi.

**E7 — Idempotency key trùng nhưng payload khác**

1. Backend reject.
2. Không xử lý checkout.

### Business Rules

1. Checkout là command chính thức.
2. Checkout transaction bắt buộc.
3. Checkout idempotency bắt buộc.
4. FEFO bắt buộc.
5. HIGH unresolved block checkout.
6. Mỗi order tối đa một successful payment.
7. Invoice tạo sau payment success.
8. PAID Order immutable.

### Authorization

* Staff: `checkout.execute_own`.
* Admin: `checkout.execute_all`.
* Warehouse: No.

### SRS Traceability

* FR-CHK-001 đến FR-CHK-024.
* FR-PAY-001 đến FR-PAY-012.
* FR-INV-001 đến FR-INV-010.
* BR-SALES-001 đến BR-SALES-012.
* BR-PAY-001 đến BR-PAY-010.
* NFR-REL-001 đến NFR-REL-002.
* NFR-DINT-001 đến NFR-DINT-010.

---

# 12.14. Payment/Invoice

## UC-PAY-001 — Process cash payment simulation

| Field                    | Nội dung                                                                |
| ------------------------ | ----------------------------------------------------------------------- |
| Use Case ID              | UC-PAY-001                                                              |
| Use Case Name            | Process cash payment simulation                                         |
| Module                   | Payment                                                                 |
| Scope                    | MVP                                                                     |
| Priority                 | P0                                                                      |
| Primary Actor            | Staff, Admin                                                            |
| Supporting Actors        | Checkout Service, Payment Service                                       |
| Goal                     | Xử lý payment mô phỏng bằng cash trong checkout                         |
| Trigger                  | User chọn cash payment trong checkout                                   |
| Preconditions            | Checkout đang xử lý Order hợp lệ; amount due đã được tính               |
| Postconditions — Success | Payment SUCCESS; change amount được tính; checkout tiếp tục tạo invoice |
| Postconditions — Failure | Payment failed/rejected; Order không PAID                               |

### Main Flow

1. User chọn cash payment.
2. User nhập amount tendered.
3. Backend tính amount due.
4. Backend kiểm tra amount tendered >= amount due.
5. Backend tính change amount.
6. Backend tạo payment attempt SUCCESS.
7. Checkout tiếp tục mark Order PAID và tạo Invoice.

### Exception Flows

**E1 — amount tendered < amount due**

1. Backend reject hoặc tạo failed payment attempt theo rule.
2. Checkout không success.
3. Order không PAID.

### Business Rules

1. Payment MVP là simulation.
2. Cash amount_tendered phải >= amount_due.
3. change_amount do backend tính.
4. Mỗi order tối đa một successful payment.

### Authorization

* Tạo payment chỉ thông qua checkout.
* Staff own scope/Admin all scope.

### SRS Traceability

* FR-PAY-001 đến FR-PAY-006.
* BR-PAY-001 đến BR-PAY-006.
* FR-CHK-016 đến FR-CHK-018.

---

## UC-INVOC-002 — Xem Invoice

| Field                    | Nội dung                                          |
| ------------------------ | ------------------------------------------------- |
| Use Case ID              | UC-INVOC-002                                      |
| Use Case Name            | Xem Invoice                                       |
| Module                   | Invoice                                           |
| Scope                    | MVP                                               |
| Priority                 | P1                                                |
| Primary Actor            | Staff, Admin                                      |
| Supporting Actors        | Backend Invoice Service                           |
| Goal                     | User xem hóa đơn của order đã thanh toán          |
| Trigger                  | User mở invoice từ order detail hoặc sau checkout |
| Preconditions            | Invoice tồn tại; user có permission và data scope |
| Postconditions — Success | Invoice được hiển thị                             |
| Postconditions — Failure | User bị từ chối hoặc invoice not found            |

### Main Flow

1. User mở Order Detail hoặc checkout success page.
2. User chọn xem Invoice.
3. Backend kiểm tra authentication.
4. Backend kiểm tra permission.
5. Backend kiểm tra ownership nếu Staff.
6. Backend lấy invoice snapshot.
7. UI hiển thị invoice.

### Alternative Flows

**A1 — Admin xem invoice bất kỳ**

1. Admin có `invoice.read_all`.
2. Backend cho phép.

**A2 — Staff xem invoice của mình**

1. Backend kiểm tra invoice gắn với Order thuộc ownership.
2. Backend cho phép.

### Exception Flows

**E1 — Warehouse xem invoice**

1. Backend trả forbidden.
2. UI không nên hiển thị invoice menu.

**E2 — Invoice chưa tồn tại**

1. Backend trả not found.
2. UI hiển thị trạng thái phù hợp.

### Business Rules

1. Invoice chỉ tạo sau successful payment.
2. Mỗi PAID Order có một invoice.
3. Warehouse không xem invoice trong MVP.

### Authorization

* Staff: `invoice.read_own`.
* Admin: `invoice.read_all`.

### SRS Traceability

* FR-INV-001 đến FR-INV-010.
* BR-PAY-008 đến BR-PAY-010.

---

# 12.15. Reports

## UC-RPT-001 — Xem Revenue Report

| Field                    | Nội dung                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------- |
| Use Case ID              | UC-RPT-001                                                                         |
| Use Case Name            | Xem Revenue Report                                                                 |
| Module                   | Reports                                                                            |
| Scope                    | MVP                                                                                |
| Priority                 | P1                                                                                 |
| Primary Actor            | Admin                                                                              |
| Supporting Actors        | Backend Report Service                                                             |
| Goal                     | Admin xem doanh thu dựa trên orders đã thanh toán thành công                       |
| Trigger                  | Admin mở Revenue Report                                                            |
| Preconditions            | Admin authenticated; có permission `report.revenue.read`; có dữ liệu order/payment |
| Postconditions — Success | Revenue report hiển thị dữ liệu deterministic                                      |
| Postconditions — Failure | Không hiển thị dữ liệu hoặc báo lỗi phù hợp                                        |

### Main Flow

1. Admin mở Reports.
2. Admin chọn Revenue Report.
3. Admin chọn filter thời gian nếu có.
4. Backend kiểm tra permission.
5. Backend lấy dữ liệu PAID Orders và SUCCESS payments.
6. Backend loại trừ DRAFT, CANCELLED và FAILED payments.
7. Backend tính tổng doanh thu.
8. UI hiển thị report.

### Alternative Flows

**A1 — Không có dữ liệu**

1. Backend trả kết quả rỗng.
2. UI hiển thị empty state.

### Exception Flows

**E1 — Staff mở Revenue Report**

1. Backend trả forbidden.
2. UI không nên hiển thị menu.

### Business Rules

1. Reports MVP deterministic.
2. Revenue chỉ tính PAID/SUCCESS.
3. Không phụ thuộc AI.

### Authorization

* Required permission: `report.revenue.read`.
* Actor allowed: Admin.

### SRS Traceability

* FR-RPT-001 đến FR-RPT-005.
* FR-RPT-012.
* BR-PAY-001 đến BR-PAY-010.

---

## UC-RPT-003 — Xem Inventory Report

| Field                    | Nội dung                                                                       |
| ------------------------ | ------------------------------------------------------------------------------ |
| Use Case ID              | UC-RPT-003                                                                     |
| Use Case Name            | Xem Inventory Report                                                           |
| Module                   | Reports                                                                        |
| Scope                    | MVP                                                                            |
| Priority                 | P1                                                                             |
| Primary Actor            | Admin, Warehouse                                                               |
| Supporting Actors        | Backend Report Service                                                         |
| Goal                     | User xem báo cáo tồn kho dựa trên MedicineBatch                                |
| Trigger                  | User mở Inventory Report                                                       |
| Preconditions            | User authenticated; có permission `report.inventory.read`                      |
| Postconditions — Success | Inventory Report hiển thị dữ liệu batch/sellable/expired/low-stock/near-expiry |
| Postconditions — Failure | User bị forbidden hoặc report lỗi                                              |

### Main Flow

1. User mở Reports.
2. User chọn Inventory Report.
3. Backend kiểm tra permission.
4. Backend tính report từ MedicineBatch.
5. Backend loại batch hết hạn khỏi sellable stock.
6. Backend tính low-stock từ sellable quantity.
7. Backend tính near-expiry theo threshold.
8. UI hiển thị report.

### Exception Flows

**E1 — Staff mở Inventory Report**

1. Backend trả forbidden nếu Staff không có permission.
2. UI không hiển thị menu.

### Business Rules

1. Inventory Report dựa trên MedicineBatch.
2. Low-stock tính từ sellable quantity.
3. Near-expiry default threshold 90 ngày.
4. Staff không xem general inventory dashboard/report.

### Authorization

* Required permission: `report.inventory.read`.
* Allowed actors: Admin, Warehouse.

### SRS Traceability

* FR-RPT-009 đến FR-RPT-014.
* BR-INV-001 đến BR-INV-010.
* FR-SET-001 đến FR-SET-004.

---

# 12.16. Graph-RAG

## UC-GRAPH-002 — Hỏi Graph-RAG về quan hệ thuốc/hoạt chất/tương tác

| Field                    | Nội dung                                                                                  |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| Use Case ID              | UC-GRAPH-002                                                                              |
| Use Case Name            | Hỏi Graph-RAG về quan hệ thuốc/hoạt chất/tương tác                                        |
| Module                   | Graph-RAG                                                                                 |
| Scope                    | MVP                                                                                       |
| Priority                 | P1                                                                                        |
| Primary Actor            | Admin, Staff                                                                              |
| Supporting Actors        | Graph-RAG Service, Neo4j, PostgreSQL, AI Guardrail Service                                |
| Goal                     | User truy vấn quan hệ thuốc–hoạt chất–tương tác bằng Graph-RAG trong phạm vi an toàn      |
| Trigger                  | User nhập câu hỏi Graph-RAG                                                               |
| Preconditions            | User authenticated; có permission `graph_rag.use_readonly`; query thuộc phạm vi được phép |
| Postconditions — Success | Hệ thống trả response có graph context/provenance hoặc fallback indicator                 |
| Postconditions — Failure | Hệ thống trả safe error/refusal                                                           |

### Main Flow

1. User mở Graph-RAG UI.
2. User nhập câu hỏi về Medicine, ActiveIngredient hoặc interaction.
3. Backend kiểm tra permission.
4. Backend kiểm tra query safety/scope.
5. Backend kiểm tra graph freshness.
6. Nếu graph fresh, backend truy vấn Neo4j bằng template/allowlist.
7. Backend lấy graph context.
8. Backend kết hợp context vào response.
9. Nếu dùng AI, AI Guardrail kiểm tra input/output.
10. UI hiển thị response và provenance/freshness indicator nếu có.

### Alternative Flows

**A1 — Interaction explanation fallback**

1. Graph stale/unavailable.
2. Query là interaction explanation có relational fallback.
3. Backend dùng PostgreSQL authoritative context.
4. Response có `graphUsed=false` hoặc indicator tương đương.

### Exception Flows

**E1 — Pure graph query nhưng graph unavailable**

1. Hệ thống không có relational fallback.
2. Hệ thống trả safe error.
3. Không đưa dữ liệu stale.

**E2 — User submit raw Cypher**

1. Backend reject.
2. UI hiển thị forbidden/scope denied.

**E3 — Warehouse truy cập Graph-RAG**

1. Backend trả forbidden.
2. UI không nên hiển thị module.

### Business Rules

1. Neo4j là projection.
2. PostgreSQL là source of truth.
3. Graph-RAG là module riêng.
4. Graph stale/unavailable phải fallback hoặc safe error.
5. Staff không submit raw Cypher.
6. Warehouse không có graph access trong MVP.

### Authorization

* Required permission: `graph_rag.use_readonly`.
* Actors: Admin, Staff.
* Warehouse: No MVP access.

### SRS Traceability

* FR-GRG-001 đến FR-GRG-010.
* FR-GSY-001 đến FR-GSY-017.
* BR-GPH-001 đến BR-GPH-010.
* NFR-SAFE-007.

---

## UC-GRAPH-003 — Fallback khi graph stale/unavailable

| Field                    | Nội dung                                                                         |
| ------------------------ | -------------------------------------------------------------------------------- |
| Use Case ID              | UC-GRAPH-003                                                                     |
| Use Case Name            | Fallback khi graph stale/unavailable                                             |
| Module                   | Graph-RAG                                                                        |
| Scope                    | MVP                                                                              |
| Priority                 | P0                                                                               |
| Primary Actor            | System                                                                           |
| Supporting Actors        | Graph-RAG Service, PostgreSQL, Neo4j                                             |
| Goal                     | Đảm bảo hệ thống không dùng graph stale/unavailable như nguồn dữ liệu chính thức |
| Trigger                  | Graph-RAG hoặc interaction explanation cần graph context                         |
| Preconditions            | Query cần graph hoặc có thể dùng fallback                                        |
| Postconditions — Success | Hệ thống dùng PostgreSQL fallback hoặc safe error                                |
| Postconditions — Failure | Không được trả kết quả dựa trên graph stale mà không warning                     |

### Main Flow

1. Graph-RAG Service nhận request.
2. Service kiểm tra graph freshness.
3. Service phát hiện graph stale hoặc Neo4j unavailable.
4. Service xác định query type.
5. Nếu query là interaction explanation có PostgreSQL fallback, service lấy context từ PostgreSQL.
6. Service đánh dấu graphUsed=false/degraded.
7. Response trả về có freshness/degraded indicator.
8. Service log fallback event nếu cần.

### Alternative Flows

**A1 — Graph fresh**

1. Service dùng Neo4j.
2. Response có graphUsed=true.

### Exception Flows

**E1 — Pure graph query không có fallback**

1. Service trả safe error.
2. Không dùng stale graph.
3. Không bịa dữ liệu.

### Business Rules

1. Graph freshness dựa trên source version/outbox state hoặc cơ chế tương đương.
2. Stale graph không được dùng không cảnh báo.
3. Pure graph query không fallback được trả safe error.

### Authorization

* System behavior after authorized request.
* Does not grant additional access.

### SRS Traceability

* FR-GRG-003 đến FR-GRG-006.
* FR-GSY-013.
* BR-GPH-006 đến BR-GPH-008.
* NFR-SAFE-007.

---

# 12.17. System Settings

## UC-SET-001 — Cấu hình near-expiry threshold

| Field                    | Nội dung                                                                   |
| ------------------------ | -------------------------------------------------------------------------- |
| Use Case ID              | UC-SET-001                                                                 |
| Use Case Name            | Cấu hình near-expiry threshold                                             |
| Module                   | System Settings                                                            |
| Scope                    | MVP                                                                        |
| Priority                 | P1                                                                         |
| Primary Actor            | Admin                                                                      |
| Supporting Actors        | Backend Settings Service, Audit Log Service                                |
| Goal                     | Admin cấu hình số ngày dùng để xác định thuốc gần hết hạn                  |
| Trigger                  | Admin mở System Settings                                                   |
| Preconditions            | Admin authenticated; có permission `settings.update_near_expiry_threshold` |
| Postconditions — Success | Threshold được cập nhật; inventory/report dùng setting mới                 |
| Postconditions — Failure | Setting không đổi                                                          |

### Main Flow

1. Admin mở System Settings.
2. Hệ thống hiển thị near-expiry threshold hiện tại.
3. Admin nhập giá trị mới.
4. Backend kiểm tra permission.
5. Backend validate giá trị hợp lệ.
6. Backend lưu setting.
7. Backend ghi audit nếu cần.
8. UI thông báo cập nhật thành công.

### Alternative Flows

**A1 — Chỉ xem setting**

1. Admin mở screen.
2. Hệ thống hiển thị threshold.
3. Không thay đổi dữ liệu.

**A2 — Report dùng withinDays filter**

1. User dùng filter withinDays trong report.
2. Filter không thay đổi system setting chính thức.

### Exception Flows

**E1 — Giá trị không hợp lệ**

1. Backend reject.
2. UI yêu cầu nhập giá trị hợp lệ.

**E2 — Staff/Warehouse truy cập settings**

1. Backend forbidden.
2. UI không hiển thị settings.

### Business Rules

1. Default near-expiry threshold là 90 ngày.
2. Admin mới được cấu hình.
3. withinDays query override không thay đổi system setting.

### Authorization

* Required permission: `settings.update_near_expiry_threshold`.
* Actor allowed: Admin.

### SRS Traceability

* FR-SET-001 đến FR-SET-005.
* BR-INV-008.
* LOG-AUD related.

---

# 12.18. Demo Reset

## UC-DMO-001 — Chạy demo reset local

| Field                    | Nội dung                                                               |
| ------------------------ | ---------------------------------------------------------------------- |
| Use Case ID              | UC-DMO-001                                                             |
| Use Case Name            | Chạy demo reset local                                                  |
| Module                   | Demo Reset                                                             |
| Scope                    | MVP                                                                    |
| Priority                 | P0                                                                     |
| Primary Actor            | Release/Demo Owner, Developer                                          |
| Supporting Actors        | PostgreSQL, Supabase Auth, Neo4j, Graph Sync Worker, Smoke Test Runner |
| Goal                     | Reset dữ liệu demo local về trạng thái nhất quán, có thể tái tạo       |
| Trigger                  | Release/Demo Owner hoặc Developer chạy demo reset command ở local      |
| Preconditions            | Environment là local; có quyền kỹ thuật; config Supabase/Neo4j phù hợp |
| Postconditions — Success | Demo data được tạo lại; graph projection rebuild; smoke checks pass    |
| Postconditions — Failure | Reset dừng an toàn; không phá môi trường không local                   |

### Main Flow

1. Actor chạy demo reset command ở local.
2. System kiểm tra environment.
3. Nếu environment là local, tiếp tục.
4. System reset PostgreSQL demo data.
5. System verify/provision Supabase demo users.
6. System tạo roles/permissions/user-role mappings.
7. System tạo Medicine, ActiveIngredient, Supplier.
8. System tạo Stock Imports và MedicineBatch.
9. System tạo Inventory Adjustments nếu cần.
10. System tạo Orders, Payments, Invoices và allocations demo.
11. System tạo DrugInteraction Rules và InteractionAlerts demo.
12. System rebuild Neo4j projection hoặc chạy Graph Sync.
13. System kiểm tra graph freshness.
14. System chạy smoke tests/checks.
15. System báo reset thành công.

### Alternative Flows

**A1 — Một số demo users đã tồn tại**

1. System verify existing users.
2. System update/profile mapping nếu cần.
3. Không tạo duplicate users.

**A2 — Google AI Provider không configured**

1. System vẫn seed MockAI fallback.
2. Demo AI vẫn có fallback.

### Exception Flows

**E1 — Environment không local**

1. System phát hiện demo/staging/production/unknown.
2. System từ chối chạy reset.
3. Không xóa dữ liệu.

**E2 — Graph rebuild lỗi**

1. System báo lỗi.
2. System có thể retry hoặc đánh dấu graph not fresh.
3. Smoke test báo failure nếu graph demo bắt buộc.

**E3 — Seed validation fail**

1. System dừng và báo lỗi.
2. Không claim demo ready.

### Business Rules

1. Demo reset chỉ chạy local.
2. Demo inventory tái tạo từ transactions.
3. Demo graph projected từ PostgreSQL.
4. Smoke test xác nhận demo data.
5. Không dùng real personal data.

### Authorization

* Không phải end-user UI use case.
* Chỉ Release/Demo Owner/Developer ở local environment.
* Environment guard bắt buộc.

### SRS Traceability

* FR-DMO-001 đến FR-DMO-016.
* BR-GPH-001 đến BR-GPH-005.
* NFR-SEC-009.
* LOG-DMO-001.

---

## 13. Use Case Traceability to SRS

| Use Case Group | SRS Requirement Group                 |
| -------------- | ------------------------------------- |
| UC-AUTH        | FR-AUTH, FR-RBAC, NFR-SEC             |
| UC-IAM         | FR-RBAC, DR-ID, Authorization Summary |
| UC-MED         | FR-MED, DR-MED, BR-MED                |
| UC-ACT         | FR-ACT, FR-GSY, BR-MED                |
| UC-SUP         | FR-SUP, BR-SUP                        |
| UC-INV         | FR-BAT, FR-RPT, BR-INV                |
| UC-STI         | FR-STI, FR-BAT, BR-STI                |
| UC-ADJ         | FR-ADJ, BR-ADJ                        |
| UC-POS         | FR-POS, FR-ALT, BR-SALES              |
| UC-INT         | FR-DRG, FR-ALT, BR-INT                |
| UC-ALT         | FR-ALT, FR-AIC, BR-ALT                |
| UC-AI          | FR-AIC, FR-AIG, FR-AIA, BR-AI         |
| UC-CHK         | FR-CHK, FR-PAY, FR-INV, BR-SALES      |
| UC-PAY         | FR-PAY, BR-PAY                        |
| UC-INVOC       | FR-INV, BR-PAY                        |
| UC-RPT         | FR-RPT, BR-INV, BR-PAY                |
| UC-GRAPH       | FR-GRG, FR-GSY, BR-GPH                |
| UC-SET         | FR-SET, BR-INV                        |
| UC-DMO         | FR-DMO, DR-DMO, NFR-SEC               |

---

## 14. Use Case Traceability to UML

Document 09 — UML Diagram Package phải dùng use cases trong Document 08 để tạo các diagram sau.

| UML Diagram                             | Input từ Use Case                                |
| --------------------------------------- | ------------------------------------------------ |
| Overall Use Case Diagram                | Actor list, MVP use case list                    |
| Detailed Sales Use Case Diagram         | UC-POS, UC-INT, UC-ALT, UC-CHK, UC-PAY, UC-INVOC |
| Inventory Use Case Diagram              | UC-SUP, UC-STI, UC-INV, UC-ADJ                   |
| AI/Graph Use Case Diagram               | UC-AI, UC-GRAPH                                  |
| Activity Diagram — Stock Import         | UC-STI-001, UC-STI-004                           |
| Activity Diagram — Inventory Adjustment | UC-ADJ-001, UC-ADJ-002                           |
| Activity Diagram — POS/Checkout         | UC-POS-001 to UC-CHK-001                         |
| Activity Diagram — HIGH Alert Handling  | UC-INT-001, UC-ALT-002, UC-ALT-003               |
| Sequence Diagram — Login                | UC-AUTH-001, UC-AUTH-004                         |
| Sequence Diagram — Stock Import Confirm | UC-STI-004                                       |
| Sequence Diagram — Checkout             | UC-CHK-001                                       |
| Sequence Diagram — AI Explanation       | UC-AI-001                                        |
| Sequence Diagram — Graph-RAG            | UC-GRAPH-002, UC-GRAPH-003                       |
| State Machine — Order                   | UC-POS-001, UC-POS-005, UC-CHK-001               |
| State Machine — Stock Import            | UC-STI-001, UC-STI-003, UC-STI-004               |
| State Machine — InteractionAlert        | UC-INT-001, UC-ALT-002, UC-ALT-003, UC-ALT-005   |
| Component Diagram                       | Supporting system actors                         |
| Deployment Diagram                      | Supabase, PostgreSQL, Neo4j, AI Provider         |

---

## 15. Use Case Traceability to Testing

Document 20 — Testing, Demo & Setup Guide phải dùng use case list để tạo test coverage.

| Use Case Area        | Test Focus                                                   |
| -------------------- | ------------------------------------------------------------ |
| Login/Profile        | Authentication, inactive user, first-login password          |
| User/Role/Permission | Permission, multi-role, forbidden cases                      |
| Medicine             | Validation, active/inactive, selling_price                   |
| ActiveIngredient     | Mapping, interaction dependency                              |
| Supplier             | Warehouse create/update, Admin deactivate                    |
| Inventory            | Batch summary, expired exclusion, low-stock                  |
| Stock Import         | Confirm, idempotency-like no double confirm, expiry mismatch |
| Inventory Adjustment | Reason required, no negative quantity, audit                 |
| POS                  | Draft order, ownership, item update                          |
| Interaction Checking | ActiveIngredient-level rules, alert persistence              |
| HIGH Alert Handling  | Acknowledgement, note, checkout blocking                     |
| AI Copilot           | Explanation, draft, fallback                                 |
| AI Guardrail         | Diagnosis/prescribing/dosage refusal                         |
| Checkout             | Transaction, FEFO, idempotency, rollback                     |
| Payment/Invoice      | SUCCESS/FAILED, one successful payment, invoice creation     |
| Reports              | Revenue exclusions, top medicines, inventory report          |
| Graph-RAG            | Fresh graph, stale fallback, safe error                      |
| System Settings      | Default 90 days, update threshold                            |
| Demo Reset           | Local-only guard, seed completeness, smoke tests             |

### 15.1. High-risk use cases

High-risk use cases cần ưu tiên test:

1. UC-CHK-001 — Thực hiện Checkout.
2. UC-CHK-003 — Checkout bị chặn do HIGH alert chưa xử lý.
3. UC-STI-004 — Confirm Stock Import.
4. UC-ADJ-002 — Confirm Inventory Adjustment.
5. UC-INT-001 — Kiểm tra interaction trong Draft Order.
6. UC-ALT-002 — Acknowledge HIGH Alert.
7. UC-ALT-003 — Nhập consultation note cho HIGH Alert.
8. UC-AI-003 — AI từ chối yêu cầu vượt phạm vi.
9. UC-GRAPH-003 — Fallback khi graph stale/unavailable.
10. UC-DMO-001 — Chạy demo reset local.

### 15.2. Demo-critical use cases

Demo-critical use cases:

1. UC-AUTH-001.
2. UC-MED-004.
3. UC-ACT-003.
4. UC-SUP-001.
5. UC-STI-004.
6. UC-INV-001.
7. UC-ADJ-002.
8. UC-POS-001.
9. UC-POS-002.
10. UC-INT-001.
11. UC-ALT-002.
12. UC-ALT-003.
13. UC-AI-001.
14. UC-CHK-001.
15. UC-INVOC-002.
16. UC-RPT-001.
17. UC-RPT-003.
18. UC-GRAPH-002.
19. UC-DMO-001.

---

## 16. Kết luận

Document 08 — Use Case Specification đã xác định use case catalog và đặc tả các use case quan trọng cho hệ thống **PharmaAssist AI Intelligence**.

Tài liệu này đã làm rõ:

1. Actor list.
2. Actor descriptions.
3. Use case naming convention.
4. Use case package/module grouping.
5. Overall use case list.
6. MVP use cases.
7. Should-have use cases.
8. Future use cases.
9. Out of Scope use cases.
10. Detailed use case specification template.
11. Use case details theo từng module quan trọng.
12. Traceability từ Use Case sang SRS.
13. Traceability từ Use Case sang UML.
14. Traceability từ Use Case sang Testing.

Các baseline quan trọng được giữ đúng:

1. Admin, Staff và Warehouse là role chính thức trong MVP.
2. Customer không phải authenticated user trong MVP.
3. Supabase Auth dùng cho login.
4. Medicine và ActiveIngredient là lõi nghiệp vụ.
5. Supplier Management là MVP.
6. MedicineBatch là source of truth cho inventory.
7. Stock Import confirm mới cập nhật batch.
8. Inventory Adjustment thay thế direct quantity edit.
9. POS hỗ trợ khách lẻ.
10. Interaction checking dựa trên ActiveIngredient.
11. InteractionAlert phải persist.
12. HIGH alert cần acknowledgement và consultation note.
13. AI Copilot có Guardrail và Audit.
14. Checkout là transaction chính thức.
15. FEFO là bắt buộc.
16. Payment và Invoice nằm trong checkout flow.
17. Reports MVP deterministic.
18. Neo4j là graph projection.
19. Graph Sync và Graph-RAG là MVP.
20. Demo reset chỉ chạy local.

Document 08 là đầu vào trực tiếp cho:

1. Document 09 — UML Diagram Package.
2. Document 12 — API Specification.
3. Document 15 — UI/UX Screen Specification.
4. Document 20 — Testing, Demo & Setup Guide.

Bước tiếp theo hợp lý là viết **Document 09 — UML Diagram Package**, vì use case catalog và detailed flows đã đủ để chuyển thành Use Case Diagram, Activity Diagram, Sequence Diagram, Class Diagram, State Machine Diagram, Component Diagram và Deployment Diagram.
08_use_case_specification