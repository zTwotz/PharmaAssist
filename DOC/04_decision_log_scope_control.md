# Document 04 — Decision Log & Scope Control

# Tài liệu 04 — Nhật ký quyết định và kiểm soát phạm vi

---

## Metadata

| Mục               | Nội dung                                                                                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Document ID       | DOC-04                                                                                                                                                                                                                         |
| File name         | `04_decision_log_scope_control.md`                                                                                                                                                                                             |
| Document Name     | Decision Log & Scope Control                                                                                                                                                                                                   |
| Tên tiếng Việt    | Nhật ký quyết định và kiểm soát phạm vi                                                                                                                                                                                        |
| Project           | PharmaAssist AI Intelligence                                                                                                                                                                                                   |
| Version           | 1.0 Draft                                                                                                                                                                                                                      |
| Status            | Draft                                                                                                                                                                                                                          |
| Created Date      | 08/06/2026                                                                                                                                                                                                                     |
| Last Updated      | 08/06/2026                                                                                                                                                                                                                     |
| Owner             | Project Leader                                                                                                                                                                                                                 |
| Reviewer          | Nhóm phát triển / Giảng viên hướng dẫn                                                                                                                                                                                         |
| Baseline Source   | Bản bàn giao chính thức, Document 01 — Project Overview & Current Baseline, Document 03 — Vision & Scope Document, Documentation Blueprint for 20 Consolidated Documents, các quyết định đã chốt sau khi phân tích tài liệu cũ |
| Related Documents | Document 01, Document 02, Document 03, Document 05–20                                                                                                                                                                          |
| Language Rule     | Nội dung chính viết bằng tiếng Việt; tên file/tên tài liệu có thể giữ tiếng Anh                                                                                                                                                |
| Terminology Rule  | Giữ nguyên tên công nghệ, module, entity, API, table, enum và thuật ngữ kỹ thuật cần thiết bằng tiếng Anh                                                                                                                      |

---

## 1. Mục đích tài liệu

Tài liệu **Decision Log & Scope Control** ghi lại các quyết định chính thức của dự án **PharmaAssist AI Intelligence** sau giai đoạn phân tích toàn bộ tài liệu đầu vào.

Mục đích chính của tài liệu gồm:

1. Ghi lại các quyết định đã được chốt.
2. Ghi lại các quyết định cũ đã bị thay thế.
3. Ghi lại các điểm còn chưa chốt hoàn toàn.
4. Định nghĩa quy tắc kiểm soát scope cho giai đoạn xây consolidated documentation và triển khai sản phẩm.
5. Làm căn cứ để tránh quay lại các thiết kế cũ không còn phù hợp.
6. Đảm bảo toàn bộ Document 01–20 bám theo cùng một baseline.
7. Hỗ trợ traceability giữa quyết định, yêu cầu, thiết kế, API, database, UI, Jira, testing và demo.
8. Làm rõ chức năng nào thuộc MVP, chức năng nào thuộc Should-have, Future / Commercial Expansion hoặc Out of Scope.
9. Đảm bảo mọi thay đổi scope sau này phải được kiểm soát, phê duyệt và cập nhật vào các tài liệu liên quan.
10. Giúp Project Leader và nhóm phát triển có một nguồn chính thức để tra cứu khi có mâu thuẫn giữa các tài liệu.

Tài liệu này không phải SRS, không phải API Specification, không phải Database Design, không phải UI/UX Specification và không phải Testing Guide.

Tài liệu này chỉ ghi nhận quyết định và quy tắc kiểm soát phạm vi. Các chi tiết triển khai sẽ được viết trong các tài liệu chuyên biệt tương ứng.

---

## 2. Người đọc chính

Tài liệu này dành cho các nhóm người đọc sau:

1. **Project Leader**
   Dùng tài liệu này để kiểm soát scope, phê duyệt thay đổi và đảm bảo các tài liệu sau không lệch baseline.

2. **Toàn bộ nhóm phát triển**
   Dùng tài liệu này để biết quyết định nào đã chốt, quyết định nào bị thay thế và phần nào chưa được tự ý triển khai.

3. **Người viết tài liệu**
   Dùng tài liệu này để viết Document 02–20 mà không quay lại thiết kế cũ.

4. **Người quản lý Jira**
   Dùng tài liệu này để sửa Epics, Stories, Tasks, Sprint và backlog theo baseline mới.

5. **Tester**
   Dùng tài liệu này để biết rule nào là bắt buộc test, rule nào thuộc Should-have/Future và rule nào không được xem là MVP.

6. **Giảng viên hướng dẫn / Người đánh giá**
   Dùng tài liệu này để hiểu vì sao một số thiết kế cũ bị thay thế và phạm vi chính thức của dự án là gì.

---

## 3. Phạm vi tài liệu

### 3.1. Nội dung tài liệu bao gồm

Tài liệu này bao gồm:

1. Nguyên tắc ra quyết định.
2. Hệ thống mã quyết định.
3. Decision Log chính thức.
4. Danh sách quyết định cũ đã bị thay thế.
5. Danh sách unresolved decisions.
6. Scope baseline.
7. Quy tắc kiểm soát scope.
8. Quy trình scope change.
9. Mẫu change request.
10. Ma trận ảnh hưởng tài liệu.
11. Quy tắc traceability.
12. Quality checklist cho quyết định.
13. Kết luận và hướng dùng tài liệu.

### 3.2. Nội dung tài liệu không bao gồm

Tài liệu này không bao gồm:

1. Full SRS.
2. Full database schema.
3. Prisma Schema chi tiết.
4. API request/response chi tiết.
5. UI screen detail.
6. Use case đầy đủ.
7. Test case chi tiết.
8. Jira backlog chi tiết.
9. Source code.
10. Migration script.
11. Diagram code chi tiết.

Các nội dung trên sẽ được viết ở các tài liệu sau:

| Nội dung chi tiết                      | Tài liệu phụ trách |
| -------------------------------------- | ------------------ |
| Business requirements                  | Document 05        |
| Software requirements                  | Document 06        |
| Roles, permissions, authorization      | Document 07        |
| Use case specification                 | Document 08        |
| UML diagrams                           | Document 09        |
| System architecture                    | Document 10        |
| Module design                          | Document 11        |
| API contract                           | Document 12        |
| Database design & ERD                  | Document 13        |
| Prisma Schema & Migration              | Document 14        |
| UI/UX screen specification             | Document 15        |
| AI architecture, guardrail, audit      | Document 16        |
| Knowledge Graph, Neo4j Sync, Graph-RAG | Document 17        |
| Data strategy, catalog, seed plan      | Document 18        |
| Jira, release, project management      | Document 19        |
| Testing, demo, setup guide             | Document 20        |

---

## 4. Nguyên tắc ra quyết định

### 4.1. Baseline mới là nguồn ưu tiên cao nhất

Mọi tài liệu chính thức sau này phải ưu tiên baseline mới nhất đã được bàn giao.

Nếu có mâu thuẫn giữa tài liệu cũ và baseline mới, phải ưu tiên baseline mới.

Thứ tự ưu tiên khi xử lý mâu thuẫn:

1. Bản bàn giao chính thức mới nhất.
2. Document 01 — Project Overview & Current Baseline.
3. Document 04 — Decision Log & Scope Control.
4. Các quyết định mới đã được Project Leader xác nhận sau Document 04.
5. Các tài liệu consolidated documentation đã được approved.
6. Tài liệu cũ chỉ dùng làm reference, không dùng làm source of truth nếu mâu thuẫn baseline mới.

### 4.2. Không quay lại thiết kế cũ đã bị thay thế

Không được tự ý quay lại các thiết kế sau:

1. Custom username/password/JWT authentication.
2. Lưu password/password_hash trong PostgreSQL.
3. Aggregate inventory làm source of truth.
4. Medicine-level interaction rule làm official rule.
5. MockAI-only làm MVP.
6. MockGraph-only làm MVP.
7. Tách payment/invoice khỏi Checkout transaction.
8. Dùng public command kiểu `POST /orders/{id}/pay` làm command chính để hoàn tất đơn.
9. Full Customer Management là điều kiện bắt buộc MVP.
10. Full 100-table database là schema bắt buộc MVP.
11. Dùng toàn bộ scraped ingredients làm active ingredients chính thức.
12. Seed price = 0 thành selling_price.
13. Bỏ qua HIGH alert acknowledgement.
14. Bỏ qua HIGH alert consultation note.
15. Bỏ Graph Sync Outbox.
16. Bỏ graph freshness detection.

### 4.3. Không tự ý thêm scope mới

Các tài liệu consolidated documentation chỉ được xây trên baseline đã chốt.

Không tự ý thêm module, workflow, table, API, UI, integration hoặc rule mới nếu chưa được xác nhận.

Nếu phát hiện một chức năng có vẻ hữu ích nhưng chưa được chốt, phải phân loại vào một trong các nhóm sau:

1. Should-have.
2. Future / Commercial Expansion.
3. Unresolved decision.
4. Out of Scope.

Không được tự động đưa vào MVP.

### 4.4. MVP phải được bảo vệ

MVP là phạm vi bắt buộc để demo và hoàn thành sản phẩm lõi.

Các chức năng thuộc MVP không được hạ xuống Should-have hoặc Future nếu chưa có quyết định chính thức mới.

Đặc biệt, các phần sau là MVP technical/business scope và không được xem là optional:

1. Supabase Auth.
2. Multi-role RBAC.
3. Supplier Management.
4. Medicine.
5. ActiveIngredient.
6. Medicine–ActiveIngredient mapping.
7. MedicineBatch.
8. FEFO.
9. Stock Import.
10. Inventory Adjustment.
11. POS Draft Order.
12. Checkout transaction.
13. Payment simulation.
14. Invoice generation.
15. ActiveIngredient-level DrugInteraction rules.
16. Persisted InteractionAlert lifecycle.
17. HIGH alert acknowledgement.
18. HIGH alert consultation note.
19. AI Copilot.
20. AI Guardrail.
21. AI Audit.
22. Neo4j graph projection.
23. Graph Sync.
24. Graph-RAG.
25. Basic reports.
26. Curated operational seed.
27. Local demo reset workflow.

### 4.5. Phân biệt rõ MVP, Should-have, Future và Out of Scope

Mỗi tài liệu có liên quan đến phạm vi chức năng phải phân biệt rõ:

| Nhóm scope                    | Ý nghĩa                                        |
| ----------------------------- | ---------------------------------------------- |
| MVP                           | Bắt buộc để demo và hoàn thành sản phẩm lõi    |
| Should-have                   | Nên có nếu còn thời gian, nhưng không chặn MVP |
| Future / Commercial Expansion | Mở rộng sau MVP hoặc khi thương mại hóa        |
| Out of Scope                  | Không làm trong phạm vi hiện tại               |

### 4.6. Mọi thay đổi quan trọng phải có traceability

Một quyết định thay đổi scope phải xác định ảnh hưởng đến:

1. BRD.
2. SRS.
3. Use Case.
4. UML.
5. API.
6. ERD.
7. Prisma Schema.
8. UI/UX.
9. AI Architecture.
10. Graph Design.
11. Data Seed Plan.
12. Jira.
13. Testing.
14. Demo setup.
15. Project Management Plan.

### 4.7. Không biến unresolved decision thành approved

Một unresolved decision chỉ được chuyển sang Approved khi:

1. Project Leader hoặc scope owner xác nhận rõ ràng.
2. Lý do quyết định được ghi lại.
3. Ảnh hưởng đến tài liệu khác được xác định.
4. Decision Log được cập nhật.
5. Các tài liệu liên quan được chỉnh theo quyết định mới.

---

## 5. Hệ thống mã quyết định

### 5.1. Format mã quyết định

Các quyết định trong tài liệu này sử dụng format:

```text
DEC-[GROUP]-[NUMBER]
```

Trong đó:

* `DEC` là viết tắt của Decision.
* `GROUP` là nhóm quyết định.
* `NUMBER` là số thứ tự quyết định trong nhóm, dùng 3 chữ số.

Ví dụ:

```text
DEC-TECH-001
DEC-AUTH-001
DEC-SALES-003
DEC-GRAPH-011
```

### 5.2. Nhóm quyết định

| Group | Ý nghĩa                                                     |
| ----- | ----------------------------------------------------------- |
| SCOPE | Quyết định phạm vi tổng thể và documentation                |
| TECH  | Quyết định công nghệ                                        |
| AUTH  | Quyết định authentication/authorization                     |
| INV   | Quyết định medicine, supplier, inventory                    |
| SALES | Quyết định POS, order, checkout, payment, invoice           |
| INT   | Quyết định interaction rule và InteractionAlert             |
| AI    | Quyết định AI Copilot, AI Guardrail, AI Audit               |
| GRAPH | Quyết định Knowledge Graph, Graph Sync, Graph-RAG           |
| DATA  | Quyết định data, seed, catalog, demo reset                  |
| UI    | Quyết định UI/UX                                            |
| PM    | Quyết định project management, Jira, branch, release        |
| TEST  | Quyết định testing, setup, demo                             |
| DOC   | Quyết định documentation convention nếu cần tách khỏi SCOPE |

### 5.3. Trạng thái quyết định

| Trạng thái | Ý nghĩa                                            |
| ---------- | -------------------------------------------------- |
| Approved   | Đã chốt, được dùng làm baseline chính thức         |
| Replaced   | Đã bị thay thế bởi quyết định mới                  |
| Superseded | Không còn hiệu lực vì có baseline mới hơn          |
| Unresolved | Chưa chốt, không được tự ý triển khai như Approved |
| Proposed   | Đề xuất, cần Project Leader xác nhận               |
| Rejected   | Đã xem xét và không chọn                           |
| Future     | Chỉ dùng cho phạm vi mở rộng sau MVP               |

### 5.4. Quy tắc viết decision

Mỗi decision nên có tối thiểu:

1. Decision ID.
2. Quyết định.
3. Phạm vi.
4. Trạng thái.
5. Ảnh hưởng đến tài liệu.
6. Ghi chú nếu cần.

---

## 6. Decision Log chính thức

## 6.1. Quyết định tổng thể về tài liệu và scope

| Decision ID   | Quyết định                                                                                                          | Phạm vi       | Trạng thái | Ảnh hưởng                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------- | ------------- | ---------- | ----------------------------------------------- |
| DEC-SCOPE-001 | Xây lại bộ 20 tài liệu chính thức/consolidated documentation thay vì chỉ chỉnh sửa tài liệu cũ                      | Documentation | Approved   | Ảnh hưởng toàn bộ Document 01–20                |
| DEC-SCOPE-002 | Baseline mới nhất là nguồn ưu tiên cao nhất                                                                         | Governance    | Approved   | Tất cả tài liệu phải bám baseline mới           |
| DEC-SCOPE-003 | Tên file và tên tài liệu có thể giữ tiếng Anh                                                                       | Documentation | Approved   | Áp dụng toàn bộ 20 tài liệu                     |
| DEC-SCOPE-004 | Nội dung chính bên trong tài liệu phải viết bằng tiếng Việt                                                         | Documentation | Approved   | Áp dụng toàn bộ 20 tài liệu                     |
| DEC-SCOPE-005 | Thuật ngữ tiếng Anh được giữ khi là tên công nghệ, module, entity, API, table, enum hoặc thuật ngữ kỹ thuật cố định | Documentation | Approved   | Tránh dịch sai thuật ngữ kỹ thuật               |
| DEC-SCOPE-006 | Mỗi tài liệu phải phân biệt MVP, Should-have, Future / Commercial Expansion và Out of Scope nếu có nội dung phạm vi | Scope Control | Approved   | Ảnh hưởng SRS, BRD, UI, API, ERD, Jira, Testing |
| DEC-SCOPE-007 | Không tự ý thêm scope mới nếu chưa được xác nhận                                                                    | Scope Control | Approved   | Giảm scope creep                                |
| DEC-SCOPE-008 | Tài liệu cũ chỉ dùng làm reference nếu mâu thuẫn baseline mới                                                       | Governance    | Approved   | Áp dụng khi viết Document 02–20                 |
| DEC-SCOPE-009 | Documentation Blueprint là khung bắt buộc trước khi viết từng tài liệu                                              | Documentation | Approved   | Đảm bảo mỗi document đúng vai trò               |

---

## 6.2. Quyết định công nghệ

| Decision ID  | Quyết định                                                                                            | Phạm vi             | Trạng thái | Ảnh hưởng                       |
| ------------ | ----------------------------------------------------------------------------------------------------- | ------------------- | ---------- | ------------------------------- |
| DEC-TECH-001 | Frontend chính thức dùng Next.js                                                                      | Frontend            | Approved   | Document 10, 11, 15, 19, 20     |
| DEC-TECH-002 | Backend chính thức dùng NestJS / Node.js                                                              | Backend             | Approved   | Document 10, 11, 12, 19, 20     |
| DEC-TECH-003 | ORM chính thức dùng Prisma                                                                            | Database / Backend  | Approved   | Document 13, 14, 20             |
| DEC-TECH-004 | Database nghiệp vụ chính dùng PostgreSQL                                                              | Database            | Approved   | Document 10, 12, 13, 14         |
| DEC-TECH-005 | PostgreSQL là source of truth cho dữ liệu nghiệp vụ                                                   | Architecture / Data | Approved   | Document 10, 13, 14, 16, 17, 18 |
| DEC-TECH-006 | Neo4j là graph projection, không phải source of truth                                                 | Graph               | Approved   | Document 10, 17                 |
| DEC-TECH-007 | Google AI Provider là provider ưu tiên                                                                | AI                  | Approved   | Document 10, 16                 |
| DEC-TECH-008 | MockAI chỉ là fallback để demo ổn định                                                                | AI                  | Approved   | Document 16, 20                 |
| DEC-TECH-009 | Provider/model phải configurable qua environment hoặc database configuration                          | AI / Config         | Approved   | Document 10, 16                 |
| DEC-TECH-010 | Docker không phải setup chính thức                                                                    | Setup               | Approved   | Document 20                     |
| DEC-TECH-011 | Primary setup dùng local Node.js, Next.js, NestJS, Prisma, cloud Supabase và Neo4j AuraDB nếu khả thi | Setup               | Approved   | Document 20                     |
| DEC-TECH-012 | Backend định hướng Modular Monolith với module boundaries rõ ràng                                     | Architecture        | Approved   | Document 10, 11                 |

---

## 6.3. Quyết định authentication và authorization

| Decision ID  | Quyết định                                                                                   | Phạm vi                     | Trạng thái | Ảnh hưởng                           |
| ------------ | -------------------------------------------------------------------------------------------- | --------------------------- | ---------- | ----------------------------------- |
| DEC-AUTH-001 | Authentication chính thức dùng Supabase Auth                                                 | Auth                        | Approved   | Document 07, 10, 12, 13, 14, 15, 20 |
| DEC-AUTH-002 | Không tự xây custom username/password/JWT làm authentication chính                           | Auth                        | Approved   | Loại bỏ thiết kế auth cũ            |
| DEC-AUTH-003 | PostgreSQL không lưu password/password_hash                                                  | Security / Database         | Approved   | Document 13, 14                     |
| DEC-AUTH-004 | PostgreSQL lưu user_profiles và dữ liệu phân quyền nội bộ                                    | Auth / Database             | Approved   | Document 07, 13, 14                 |
| DEC-AUTH-005 | Hệ thống hỗ trợ multi-role RBAC                                                              | Authorization               | Approved   | Document 07                         |
| DEC-AUTH-006 | Một user có thể có nhiều role thông qua user_roles                                           | Authorization / Database    | Approved   | Document 07, 13, 14                 |
| DEC-AUTH-007 | Authorization phải dựa trên permission, không chỉ hard-code role                             | Authorization               | Approved   | Document 07, 10, 12                 |
| DEC-AUTH-008 | Staff chỉ xem order do mình tạo hoặc xử lý, Admin xem tất cả order                           | Authorization / Sales       | Approved   | Document 07, 08, 12, 15             |
| DEC-AUTH-009 | Admin có thể thực hiện các thao tác sales của Staff và xem toàn bộ order                     | Authorization / Sales       | Approved   | Document 07, 08, 15                 |
| DEC-AUTH-010 | Warehouse không được truy cập InteractionAlert History trong MVP                             | Authorization / Interaction | Approved   | Document 07, 15                     |
| DEC-AUTH-011 | Warehouse không được truy cập Graph Explorer trong MVP                                       | Authorization / Graph       | Approved   | Document 07, 15, 17                 |
| DEC-AUTH-012 | Admin tạo staff account thông qua Supabase Admin integration với email và temporary password | Auth / User Management      | Approved   | Document 07, 12, 15                 |
| DEC-AUTH-013 | First-login/password-change flow dùng cờ must_change_password ở application level            | Auth / UX                   | Approved   | Document 07, 12, 15                 |
| DEC-AUTH-014 | Frontend ẩn menu không được xem là biện pháp bảo mật chính                                   | Authorization               | Approved   | Document 07, 10, 12                 |

---

## 6.4. Quyết định medicine, supplier và inventory

| Decision ID | Quyết định                                                                                                                    | Phạm vi                   | Trạng thái | Ảnh hưởng                       |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ---------- | ------------------------------- |
| DEC-INV-001 | Medicine là entity nghiệp vụ lõi cho sales, batch, inventory, checkout, interaction checking và reports                       | Medicine / Inventory      | Approved   | Document 05, 06, 12, 13, 14     |
| DEC-INV-002 | ActiveIngredient là entity lõi trong MVP                                                                                      | Medicine / Interaction    | Approved   | Document 05, 06, 12, 13, 14, 17 |
| DEC-INV-003 | Medicine phải mapping với ActiveIngredient                                                                                    | Medicine / Interaction    | Approved   | Document 06, 12, 13, 14, 17     |
| DEC-INV-004 | Supplier Management là MVP                                                                                                    | Supplier                  | Approved   | Document 05, 06, 08, 12, 13, 15 |
| DEC-INV-005 | Warehouse được xem, tạo và cập nhật Supplier                                                                                  | Supplier / Authorization  | Approved   | Document 07, 12, 15             |
| DEC-INV-006 | Chỉ Admin được deactivate Supplier                                                                                            | Supplier / Authorization  | Approved   | Document 07, 12, 15             |
| DEC-INV-007 | MedicineBatch là source of truth cho inventory                                                                                | Inventory                 | Approved   | Document 06, 12, 13, 14, 15, 20 |
| DEC-INV-008 | Không dùng aggregate inventory làm source of truth                                                                            | Inventory                 | Approved   | Loại bỏ thiết kế inventory cũ   |
| DEC-INV-009 | Low-stock được tính từ sellable_quantity, loại trừ batch hết hạn                                                              | Inventory / Report / UI   | Approved   | Document 06, 13, 15, 20         |
| DEC-INV-010 | MedicineBatch không có top-level sidebar menu, truy cập qua Inventory Summary và Batch Detail                                 | UI / Inventory            | Approved   | Document 15                     |
| DEC-INV-011 | Near-expiry threshold mặc định là 90 ngày và có thể cấu hình trong System Settings                                            | Inventory / Settings      | Approved   | Document 06, 12, 13, 15         |
| DEC-INV-012 | Staff không thấy dashboard low-stock/near-expiry tổng quát; Staff chỉ thấy sellable stock và sale-relevant warnings trong POS | UI / Authorization        | Approved   | Document 07, 15                 |
| DEC-INV-013 | Admin và Warehouse thấy operational low-stock/near-expiry dashboard                                                           | UI / Inventory            | Approved   | Document 15                     |
| DEC-INV-014 | Stock Import là MVP                                                                                                           | Inventory                 | Approved   | Document 06, 08, 12, 13, 14, 15 |
| DEC-INV-015 | Stock Import status gồm DRAFT, CONFIRMED, CANCELLED                                                                           | Inventory / State         | Approved   | Document 06, 09, 12, 13, 14     |
| DEC-INV-016 | Confirm Stock Import mới cập nhật MedicineBatch                                                                               | Inventory / Transaction   | Approved   | Document 06, 12, 13, 14         |
| DEC-INV-017 | Inventory Adjustment là MVP                                                                                                   | Inventory                 | Approved   | Document 06, 08, 12, 13, 14, 15 |
| DEC-INV-018 | Warehouse có thể tạo và confirm Inventory Adjustment không cần Admin approval trước                                           | Inventory / Authorization | Approved   | Document 07, 12, 15             |
| DEC-INV-019 | Inventory Adjustment bắt buộc có reason và audit log                                                                          | Inventory / Audit         | Approved   | Document 06, 12, 13, 14         |
| DEC-INV-020 | Inventory Adjustment phải điều chỉnh theo MedicineBatch                                                                       | Inventory                 | Approved   | Document 06, 12, 13, 14         |
| DEC-INV-021 | Inventory Adjustment không được làm quantity_remaining âm                                                                     | Inventory / Business Rule | Approved   | Document 06, 12, 13, 14, 20     |
| DEC-INV-022 | Warehouse không được direct edit inventory quantity ngoài workflow Inventory Adjustment                                       | Inventory / Authorization | Approved   | Document 07, 15                 |
| DEC-INV-023 | batch_number là bắt buộc                                                                                                      | Inventory / Batch         | Approved   | Document 06, 13, 14             |
| DEC-INV-024 | MedicineBatch uniqueness dựa trên medicine_id + normalized_batch_number                                                       | Inventory / Batch         | Approved   | Document 13, 14                 |
| DEC-INV-025 | Stock import có thể cộng vào batch hiện hữu chỉ khi medicine_id, normalized batch number và expiry_date match                 | Inventory / Batch         | Approved   | Document 06, 12, 13, 14         |
| DEC-INV-026 | Nếu cùng medicine_id + batch_number nhưng expiry_date khác thì reject với batch expiry mismatch                               | Inventory / Batch         | Approved   | Document 06, 12, 13, 14, 20     |
| DEC-INV-027 | selling_price phải lớn hơn 0 trong MVP                                                                                        | Medicine / Sales          | Approved   | Document 06, 12, 13, 14, 15     |

---

## 6.5. Quyết định sales, POS, checkout, payment và invoice

| Decision ID   | Quyết định                                                                                                      | Phạm vi                   | Trạng thái | Ảnh hưởng                       |
| ------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------- | ---------- | ------------------------------- |
| DEC-SALES-001 | POS phải hỗ trợ khách lẻ/walk-in/anonymous customer                                                             | POS / Customer            | Approved   | Document 06, 08, 12, 15         |
| DEC-SALES-002 | Full Customer Management là Should-have, không phải MVP blocker                                                 | Customer / Scope          | Approved   | Document 03, 05, 06, 15         |
| DEC-SALES-003 | Order status MVP gồm DRAFT, PAID, CANCELLED                                                                     | Sales / State             | Approved   | Document 06, 09, 12, 13, 14     |
| DEC-SALES-004 | Không dùng READY_FOR_CHECKOUT, PENDING, SHIPPING, COMPLETED trong MVP                                           | Sales / State             | Approved   | Loại bỏ trạng thái cũ           |
| DEC-SALES-005 | Staff được cancel DRAFT order trong ownership scope                                                             | Sales / Authorization     | Approved   | Document 07, 08, 12, 15         |
| DEC-SALES-006 | Admin được cancel mọi DRAFT order                                                                               | Sales / Authorization     | Approved   | Document 07, 08, 12, 15         |
| DEC-SALES-007 | PAID order không được trực tiếp sửa hoặc cancel                                                                 | Sales / Business Rule     | Approved   | Document 06, 12, 15             |
| DEC-SALES-008 | Checkout là command nghiệp vụ chính thức để hoàn tất đơn hàng                                                   | Sales / Checkout          | Approved   | Document 06, 08, 12, 13, 14, 20 |
| DEC-SALES-009 | Endpoint định hướng cho checkout là `POST /orders/{id}/checkout`                                                | API / Checkout            | Approved   | Document 12                     |
| DEC-SALES-010 | Checkout phải chạy trong transaction                                                                            | Checkout / Data Integrity | Approved   | Document 06, 12, 13, 14, 20     |
| DEC-SALES-011 | Checkout phải lock order và verify order status = DRAFT                                                         | Checkout                  | Approved   | Document 06, 12, 20             |
| DEC-SALES-012 | Checkout phải verify stock availability                                                                         | Checkout / Inventory      | Approved   | Document 06, 12, 20             |
| DEC-SALES-013 | Checkout phải verify HIGH InteractionAlert đã có acknowledgement và consultation note                           | Checkout / Safety         | Approved   | Document 06, 12, 16, 20         |
| DEC-SALES-014 | Checkout phải apply FEFO                                                                                        | Checkout / Inventory      | Approved   | Document 06, 12, 13, 14, 20     |
| DEC-SALES-015 | Checkout phải tạo order_item_batch_allocations                                                                  | Checkout / Database       | Approved   | Document 12, 13, 14             |
| DEC-SALES-016 | Checkout phải deduct MedicineBatch quantity                                                                     | Checkout / Inventory      | Approved   | Document 06, 12, 13, 14         |
| DEC-SALES-017 | Checkout phải tạo payment attempt                                                                               | Payment                   | Approved   | Document 06, 12, 13, 14         |
| DEC-SALES-018 | Checkout tạo invoice sau successful payment trong cùng transaction                                              | Invoice / Checkout        | Approved   | Document 06, 12, 13, 14         |
| DEC-SALES-019 | Checkout phải support idempotency                                                                               | Checkout / Reliability    | Approved   | Document 06, 12, 13, 14, 20     |
| DEC-SALES-020 | Không dùng `POST /orders/{id}/pay`, `POST /payments`, `POST /invoices` làm public command chính để hoàn tất đơn | API / Checkout            | Approved   | Loại bỏ thiết kế API cũ         |
| DEC-SALES-021 | Mỗi order chỉ có tối đa một successful payment                                                                  | Payment / Business Rule   | Approved   | Document 06, 12, 13, 14         |
| DEC-SALES-022 | Failed payment attempts có thể lưu lại                                                                          | Payment / Audit           | Approved   | Document 06, 12, 13, 14         |
| DEC-SALES-023 | Payment status MVP gồm SUCCESS và FAILED                                                                        | Payment / Enum            | Approved   | Document 06, 12, 13, 14         |
| DEC-SALES-024 | Cash payment cần amount_tendered và change_amount                                                               | Payment                   | Approved   | Document 06, 12, 13, 14, 15     |
| DEC-SALES-025 | Simulated bank transfer cần transaction_reference                                                               | Payment                   | Approved   | Document 06, 12, 13, 14, 15     |
| DEC-SALES-026 | Không có real bank integration trong MVP                                                                        | Payment / Scope           | Approved   | Document 03, 06, 12             |
| DEC-SALES-027 | Refund nằm ngoài MVP                                                                                            | Payment / Scope           | Approved   | Document 03, 06, 12             |
| DEC-SALES-028 | Product return nằm ngoài MVP                                                                                    | Sales / Scope             | Approved   | Document 03, 06, 12             |
| DEC-SALES-029 | Mỗi PAID order có một invoice                                                                                   | Invoice                   | Approved   | Document 06, 12, 13, 14         |
| DEC-SALES-030 | Invoice không được tạo độc lập để thay thế Checkout transaction                                                 | Invoice / API             | Approved   | Document 12                     |

---

## 6.6. Quyết định DrugInteraction và InteractionAlert

| Decision ID | Quyết định                                                                                                                          | Phạm vi                       | Trạng thái | Ảnh hưởng                       |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ---------- | ------------------------------- |
| DEC-INT-001 | DrugInteraction rule chính thức ở cấp ActiveIngredient–ActiveIngredient                                                             | Interaction                   | Approved   | Document 06, 12, 13, 14, 16, 17 |
| DEC-INT-002 | Không dùng Medicine–Medicine interaction rule làm official rule                                                                     | Interaction                   | Approved   | Loại bỏ thiết kế interaction cũ |
| DEC-INT-003 | Severity MVP gồm LOW, MEDIUM, HIGH                                                                                                  | Interaction / Enum            | Approved   | Document 06, 12, 13, 14         |
| DEC-INT-004 | Không dùng CRITICAL trong MVP                                                                                                       | Interaction / Enum            | Approved   | Document 06, 12, 13, 14         |
| DEC-INT-005 | InteractionAlert phải persist mọi alert đã hiển thị                                                                                 | InteractionAlert              | Approved   | Document 06, 12, 13, 14, 15, 20 |
| DEC-INT-006 | Một cặp order_id + interaction_id chỉ có một active InteractionAlert                                                                | InteractionAlert / Constraint | Approved   | Document 13, 14                 |
| DEC-INT-007 | Nếu alert hiển thị lại thì update last_displayed_at và tăng display_count                                                           | InteractionAlert              | Approved   | Document 06, 12, 13, 14         |
| DEC-INT-008 | Nếu thuốc bị xóa khỏi Draft Order và interaction không còn, alert chuyển inactive, không xóa lịch sử                                | InteractionAlert / Audit      | Approved   | Document 06, 12, 13, 14         |
| DEC-INT-009 | HIGH alert bắt buộc acknowledgement trước checkout                                                                                  | InteractionAlert / Safety     | Approved   | Document 06, 12, 15, 20         |
| DEC-INT-010 | HIGH alert bắt buộc consultation note trước checkout                                                                                | InteractionAlert / Safety     | Approved   | Document 06, 12, 15, 16, 20     |
| DEC-INT-011 | Admin có dedicated InteractionAlert History screen                                                                                  | UI / Interaction              | Approved   | Document 15                     |
| DEC-INT-012 | Warehouse không có quyền truy cập interaction alerts trong MVP                                                                      | Authorization / Interaction   | Approved   | Document 07, 15                 |
| DEC-INT-013 | Standalone `POST /interactions/check` có thể giữ làm Admin/demo utility, nhưng không gắn với order và không tạo order alert history | API / Interaction             | Approved   | Document 12                     |
| DEC-INT-014 | POS interaction check chính thức phải theo Order và persist InteractionAlert                                                        | POS / Interaction             | Approved   | Document 06, 08, 12, 15         |
| DEC-INT-015 | Mỗi HIGH alert cần consultation note riêng                                                                                          | InteractionAlert / Safety     | Approved   | Document 06, 12, 15, 20         |

---

## 6.7. Quyết định AI Copilot, AI Guardrail và AI Audit

| Decision ID | Quyết định                                                                                                                                                          | Phạm vi              | Trạng thái | Ảnh hưởng               |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ---------- | ----------------------- |
| DEC-AI-001  | AI Copilot là MVP technical differentiator                                                                                                                          | AI                   | Approved   | Document 06, 10, 16     |
| DEC-AI-002  | AI Copilot hỗ trợ giải thích cảnh báo interaction                                                                                                                   | AI / Interaction     | Approved   | Document 06, 12, 16     |
| DEC-AI-003  | AI Copilot có thể tạo consultation note draft                                                                                                                       | AI / POS             | Approved   | Document 06, 12, 16     |
| DEC-AI-004  | AI không được chẩn đoán bệnh                                                                                                                                        | AI Safety            | Approved   | Document 06, 16, 20     |
| DEC-AI-005  | AI không được kê đơn                                                                                                                                                | AI Safety            | Approved   | Document 06, 16, 20     |
| DEC-AI-006  | AI không được đưa liều dùng cụ thể                                                                                                                                  | AI Safety            | Approved   | Document 06, 16, 20     |
| DEC-AI-007  | AI không được thay thế chuyên gia y tế                                                                                                                              | AI Safety            | Approved   | Document 06, 16         |
| DEC-AI-008  | AI không tự động lưu official consultation note nếu Staff chưa xác nhận                                                                                             | AI / Audit           | Approved   | Document 06, 16         |
| DEC-AI-009  | AI Guardrail là MVP                                                                                                                                                 | AI Safety            | Approved   | Document 06, 16, 20     |
| DEC-AI-010  | AI Guardrail gồm input guardrail, output guardrail, structured output/schema validation, safe refusal, PII minimization/redaction, timeout/fallback/circuit-breaker | AI Safety            | Approved   | Document 16             |
| DEC-AI-011  | AI Audit Log là MVP                                                                                                                                                 | AI Audit             | Approved   | Document 13, 14, 16     |
| DEC-AI-012  | AI Audit Log không lưu raw PII                                                                                                                                      | Privacy / AI Audit   | Approved   | Document 13, 14, 16, 20 |
| DEC-AI-013  | Prompt templates được lưu trong database và có version                                                                                                              | AI / Prompt          | Approved   | Document 13, 14, 16     |
| DEC-AI-014  | MVP seed approved official prompts                                                                                                                                  | AI / Data            | Approved   | Document 16, 18         |
| DEC-AI-015  | Every AI audit event phải record exact prompt version                                                                                                               | AI Audit             | Approved   | Document 16             |
| DEC-AI-016  | Admin prompt-editing UI là Should-have, không bắt buộc MVP                                                                                                          | AI / UI / Scope      | Approved   | Document 03, 15, 16     |
| DEC-AI-017  | Backend AI provider/model configuration là mandatory, nhưng Admin provider/model configuration UI là Should-have                                                    | AI / Config / UI     | Approved   | Document 10, 16         |
| DEC-AI-018  | AI-generated business report narrative là Should-have                                                                                                               | AI / Reports / Scope | Approved   | Document 03, 16         |
| DEC-AI-019  | Deterministic reports vẫn là MVP và không phụ thuộc AI                                                                                                              | Reports / AI Scope   | Approved   | Document 06, 16         |
| DEC-AI-020  | Staff có thể nhập short free-text symptom/context chỉ để tạo safe follow-up questions                                                                               | AI / POS             | Approved   | Document 06, 15, 16     |
| DEC-AI-021  | Symptom/context input phải block diagnosis, prescribing, dosage requests và minimize/redact PII                                                                     | AI Safety            | Approved   | Document 16, 20         |
| DEC-AI-022  | AI Cache bị loại khỏi MVP và đưa vào Future Scope                                                                                                                   | AI / Scope           | Approved   | Document 03, 16         |

---

## 6.8. Quyết định Knowledge Graph, Graph Sync và Graph-RAG

| Decision ID   | Quyết định                                                                                                                      | Phạm vi                   | Trạng thái | Ảnh hưởng               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ---------- | ----------------------- |
| DEC-GRAPH-001 | Core graph MVP chỉ gồm Medicine, ActiveIngredient, CONTAINS và ActiveIngredient-level INTERACTS_WITH                            | Graph                     | Approved   | Document 17             |
| DEC-GRAPH-002 | DrugGroup bị loại khỏi core MVP nếu chưa có taxonomy authoritative                                                              | Graph / Scope             | Approved   | Document 03, 17         |
| DEC-GRAPH-003 | Symptom, Condition, RedFlag, Recommendation và related enrichment là Future Scope/demo-only                                     | Graph / Scope             | Approved   | Document 03, 17         |
| DEC-GRAPH-004 | Enrichment nodes không được ảnh hưởng checkout hoặc medicine recommendations trong MVP                                          | Graph / Safety            | Approved   | Document 17             |
| DEC-GRAPH-005 | Neo4j INTERACTS_WITH là canonical directed relationship giữa ActiveIngredient nodes, nhưng truy vấn theo nghĩa symmetric        | Graph / Modeling          | Approved   | Document 17             |
| DEC-GRAPH-006 | INTERACTS_WITH properties gồm ruleId, severity, description, recommendation, isActive, sourceVersion, sourceUpdatedAt, syncedAt | Graph / Modeling          | Approved   | Document 17             |
| DEC-GRAPH-007 | Không dùng authoritative Medicine–Medicine interaction edges trong MVP                                                          | Graph / Modeling          | Approved   | Document 17             |
| DEC-GRAPH-008 | Không dùng Interaction node trong MVP                                                                                           | Graph / Modeling          | Approved   | Document 17             |
| DEC-GRAPH-009 | MedicineCategory không tự động map sang DrugGroup                                                                               | Graph / Scope             | Approved   | Document 17             |
| DEC-GRAPH-010 | riskScore bị loại khỏi MVP và không ảnh hưởng business rule, severity, checkout hoặc POS display                                | Graph / Scope             | Approved   | Document 17             |
| DEC-GRAPH-011 | Graph Sync là MVP bắt buộc                                                                                                      | Graph Sync                | Approved   | Document 10, 17, 20     |
| DEC-GRAPH-012 | Graph Sync cover Medicine, ActiveIngredient, Medicine–ActiveIngredient mapping và DrugInteraction rules                         | Graph Sync                | Approved   | Document 17             |
| DEC-GRAPH-013 | Graph Sync dùng PostgreSQL outbox/worker flow                                                                                   | Graph Sync / Architecture | Approved   | Document 10, 13, 14, 17 |
| DEC-GRAPH-014 | Deactivated projected entities và rules được giữ trong Neo4j với isActive=false                                                 | Graph Sync / Modeling     | Approved   | Document 17             |
| DEC-GRAPH-015 | Normal graph queries chỉ trả active data                                                                                        | Graph Query               | Approved   | Document 17             |
| DEC-GRAPH-016 | Graph freshness không chỉ dựa vào thời gian mà dựa vào source versions và outbox state                                          | Graph Freshness           | Approved   | Document 17             |
| DEC-GRAPH-017 | Nếu graph stale hoặc Neo4j unavailable, interaction explanation fallback sang PostgreSQL authoritative context                  | Graph-RAG / Fallback      | Approved   | Document 16, 17         |
| DEC-GRAPH-018 | Fallback response phải có graphUsed=false và degraded/freshness indicator                                                       | Graph-RAG / API           | Approved   | Document 12, 16, 17     |
| DEC-GRAPH-019 | Pure graph queries không có relational fallback thì trả safe error                                                              | Graph-RAG / Safety        | Approved   | Document 17             |
| DEC-GRAPH-020 | Graph-RAG là module riêng, không gộp mơ hồ vào AI Copilot                                                                       | Graph-RAG                 | Approved   | Document 10, 16, 17     |
| DEC-GRAPH-021 | Staff không được submit raw Cypher                                                                                              | Graph Security            | Approved   | Document 07, 17         |
| DEC-GRAPH-022 | Graph Sync Status/retry screen là Should-have, không bắt buộc MVP                                                               | Graph UI / Scope          | Approved   | Document 03, 15, 17     |

---

## 6.9. Quyết định data, catalog, seed và demo reset

| Decision ID  | Quyết định                                                                                                                                                                   | Phạm vi                 | Trạng thái | Ảnh hưởng           |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ---------- | ------------------- |
| DEC-DATA-001 | Database 100 bảng là extended/commercial-scale design, không phải full MVP schema                                                                                            | Database / Scope        | Approved   | Document 13, 18     |
| DEC-DATA-002 | MVP chỉ implement core subset                                                                                                                                                | Database / Scope        | Approved   | Document 13, 14, 18 |
| DEC-DATA-003 | MVP sales, batch, inventory, interaction và checkout dùng medicine_id làm core business key                                                                                  | Database / Business     | Approved   | Document 13, 14     |
| DEC-DATA-004 | products/product_variants giữ cho future e-commerce/catalog expansion                                                                                                        | Database / Future       | Approved   | Document 13         |
| DEC-DATA-005 | Multi-store/multi-warehouse là Future Scope; MVP dùng một logical default store/warehouse                                                                                    | Database / Scope        | Approved   | Document 13, 18     |
| DEC-DATA-006 | Online commerce tables như cart, wishlist, shipping, coupon, review, CMS là Future / Commercial Expansion                                                                    | Database / Scope        | Approved   | Document 13, 18     |
| DEC-DATA-007 | Real catalog data chỉ là reference/catalog data, không phải operational MVP seed hoàn chỉnh                                                                                  | Data                    | Approved   | Document 18         |
| DEC-DATA-008 | MVP cần curated operational seed riêng                                                                                                                                       | Data / Demo             | Approved   | Document 18, 20     |
| DEC-DATA-009 | Không import price = 0 thành selling_price                                                                                                                                   | Data / Medicine         | Approved   | Document 18         |
| DEC-DATA-010 | Không dùng toàn bộ scraped ingredients làm ActiveIngredient chính thức                                                                                                       | Data / ActiveIngredient | Approved   | Document 18         |
| DEC-DATA-011 | Demo inventory state phải tái tạo từ confirmed stock imports, sale batch allocations và inventory adjustments                                                                | Demo Data               | Approved   | Document 18, 20     |
| DEC-DATA-012 | Demo batch expiry dates nên generated relative to demo reset date                                                                                                            | Demo Data               | Approved   | Document 18         |
| DEC-DATA-013 | Demo cần ít nhất một multi-batch FEFO scenario                                                                                                                               | Demo Data               | Approved   | Document 18, 20     |
| DEC-DATA-014 | Pre-seeded PAID order with HIGH interaction được giữ nếu có valid active InteractionAlert, acknowledgement, consultation note, SUCCESS payment, invoice và batch allocations | Demo Data               | Approved   | Document 18         |
| DEC-DATA-015 | Official demo graph data phải projected từ PostgreSQL thông qua Graph Sync hoặc projection rebuild                                                                           | Demo Graph              | Approved   | Document 17, 18     |
| DEC-DATA-016 | Standalone Cypher seeds chỉ giới hạn cho development hoặc isolated graph tests                                                                                               | Graph Data              | Approved   | Document 17, 18     |
| DEC-DATA-017 | Demo reports cần đủ PAID, DRAFT, CANCELLED và FAILED-payment cases để demo exclusion rules                                                                                   | Demo Reports            | Approved   | Document 18, 20     |
| DEC-DATA-018 | Cần một reproducible demo-reset workflow                                                                                                                                     | Demo Reset              | Approved   | Document 18, 20     |
| DEC-DATA-019 | demo:reset chỉ được chạy local và phải từ chối demo/staging/production/unknown environment                                                                                   | Demo Safety             | Approved   | Document 20         |

---

## 6.10. Quyết định UI/UX

| Decision ID | Quyết định                                                                                | Phạm vi         | Trạng thái | Ảnh hưởng               |
| ----------- | ----------------------------------------------------------------------------------------- | --------------- | ---------- | ----------------------- |
| DEC-UI-001  | Staff không thấy general low-stock hoặc near-expiry dashboard widgets                     | UI / Staff      | Approved   | Document 15             |
| DEC-UI-002  | Staff chỉ thấy sellable stock và sale-relevant availability warnings trong POS            | UI / POS        | Approved   | Document 15             |
| DEC-UI-003  | Admin và Warehouse thấy operational low-stock/near-expiry dashboards                      | UI / Inventory  | Approved   | Document 15             |
| DEC-UI-004  | Checkout dùng dedicated route hoặc full-height dedicated panel, không dùng small modal    | UI / Checkout   | Approved   | Document 15             |
| DEC-UI-005  | Checkout validation fail trả user về preserved Draft Order                                | UI / Checkout   | Approved   | Document 15, 20         |
| DEC-UI-006  | ActiveIngredient có dedicated Admin management screen                                     | UI / Medicine   | Approved   | Document 15             |
| DEC-UI-007  | Medicine form có component mapping ingredients                                            | UI / Medicine   | Approved   | Document 15             |
| DEC-UI-008  | MedicineBatch không có top-level sidebar menu                                             | UI / Inventory  | Approved   | Document 15             |
| DEC-UI-009  | MedicineBatch accessed under Inventory qua Inventory Summary và Batch Detail views        | UI / Inventory  | Approved   | Document 15             |
| DEC-UI-010  | MVP có simple Admin System Settings screen cho near-expiry threshold                      | UI / Settings   | Approved   | Document 15             |
| DEC-UI-011  | Generic System Audit Log UI là Should-have                                                | UI / Audit      | Approved   | Document 15             |
| DEC-UI-012  | Backend audit logging vẫn bắt buộc dù Generic Audit Log UI là Should-have                 | Audit / Backend | Approved   | Document 06, 13, 15, 20 |
| DEC-UI-013  | Basic reports gồm revenue, top medicines và inventory là MVP                              | UI / Reports    | Approved   | Document 15             |
| DEC-UI-014  | Advanced charts, analytics, forecasting và reorder suggestions là Should-have hoặc Future | UI / Reports    | Approved   | Document 03, 15         |

---

## 6.11. Quyết định project management, Jira, branch và release

| Decision ID | Quyết định                                                                                                                                     | Phạm vi             | Trạng thái | Ảnh hưởng       |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ---------- | --------------- |
| DEC-PM-001  | Team size chính thức là 4 thành viên                                                                                                           | Project Management  | Approved   | Document 19     |
| DEC-PM-002  | Exact weekly/hourly capacity per member chưa specified                                                                                         | Project Management  | Unresolved | Document 19     |
| DEC-PM-003  | Final deadline trước 17/06/2026                                                                                                                | Release             | Approved   | Document 19     |
| DEC-PM-004  | Target release/demo freeze nên là 16/06/2026 at latest                                                                                         | Release             | Approved   | Document 19     |
| DEC-PM-005  | Do deadline ngắn, dùng one-week hoặc shorter execution cycles thay vì two-week sprints                                                         | Sprint              | Approved   | Document 19     |
| DEC-PM-006  | Jira và GitHub đều được dùng                                                                                                                   | Project Management  | Approved   | Document 19     |
| DEC-PM-007  | Jira là source of truth cho Epic/Story/Sprint/status                                                                                           | Jira                | Approved   | Document 19     |
| DEC-PM-008  | GitHub dùng cho source code, issues/PRs, CI và link commit/PR về Jira key                                                                      | GitHub              | Approved   | Document 19     |
| DEC-PM-009  | Team giữ develop branch                                                                                                                        | Branching           | Approved   | Document 19     |
| DEC-PM-010  | Branch model gồm main, develop và short-lived feature/bugfix/docs branches                                                                     | Branching           | Approved   | Document 19     |
| DEC-PM-011  | Merge vào main chỉ qua reviewed release PR từ develop sau khi quality gates pass                                                               | Release / Branching | Approved   | Document 19     |
| DEC-PM-012  | Scope changes được Project Leader/scope owner phê duyệt                                                                                        | Scope Control       | Approved   | Document 04, 19 |
| DEC-PM-013  | Major business-scope changes cần communicate tới full team                                                                                     | Scope Control       | Approved   | Document 04, 19 |
| DEC-PM-014  | Mọi approved change phải update Decision Log và affected artifacts                                                                             | Scope Control       | Approved   | Document 04, 19 |
| DEC-PM-015  | Dedicated demo/staging environment chưa finalized                                                                                              | Environment         | Unresolved | Document 19, 20 |
| DEC-PM-016  | Minimum CI quality gate gồm lint, type check, unit tests, integration tests, Prisma validation, migration check, frontend build, backend build | CI                  | Approved   | Document 19, 20 |
| DEC-PM-017  | Merges to develop/main require CI checks pass                                                                                                  | CI                  | Approved   | Document 19     |
| DEC-PM-018  | Release/Demo Owner và backup chưa được named                                                                                                   | Release             | Unresolved | Document 19     |

---

## 6.12. Quyết định testing, setup và demo

| Decision ID  | Quyết định                                                                                                 | Phạm vi            | Trạng thái             | Ảnh hưởng       |
| ------------ | ---------------------------------------------------------------------------------------------------------- | ------------------ | ---------------------- | --------------- |
| DEC-TEST-001 | Automated testing toolchain chính thức chưa finalized                                                      | Testing            | Unresolved             | Document 20     |
| DEC-TEST-002 | Recommended stack gồm Jest, Supertest, React Testing Library, Playwright và Postman                        | Testing            | Proposed / Recommended | Document 20     |
| DEC-TEST-003 | Không provision separate PostgreSQL database bắt buộc cho automated tests                                  | Testing / Database | Approved               | Document 20     |
| DEC-TEST-004 | Integration tests phải dùng strict isolation và cleanup ở local/non-demo environment phù hợp               | Testing            | Approved               | Document 20     |
| DEC-TEST-005 | Không chạy destructive tests trên demo database                                                            | Testing / Safety   | Approved               | Document 20     |
| DEC-TEST-006 | Docker không phải official setup path                                                                      | Setup              | Approved               | Document 20     |
| DEC-TEST-007 | Primary setup dùng local Node.js/Next.js/NestJS/Prisma với cloud Supabase và Neo4j AuraDB                  | Setup              | Approved               | Document 20     |
| DEC-TEST-008 | Docker có thể là optional local-development alternative                                                    | Setup              | Approved               | Document 20     |
| DEC-TEST-009 | Chrome desktop/laptop là official MVP browser target                                                       | Testing / Browser  | Approved               | Document 20     |
| DEC-TEST-010 | Chỉ basic responsive checks required; full cross-browser coverage ngoài MVP                                | Testing / Browser  | Approved               | Document 20     |
| DEC-TEST-011 | Không có global mandatory coverage percentage cho toàn codebase                                            | Testing / Coverage | Approved               | Document 20     |
| DEC-TEST-012 | High-risk modules Checkout, FEFO, Interaction và AI Guardrail nên target khoảng 70% meaningful coverage    | Testing / Coverage | Approved / Reference   | Document 20     |
| DEC-TEST-013 | Project Leader approve test exit và release dựa trên reports từ Tester và Release/Demo Owner               | Release / Testing  | Approved               | Document 19, 20 |
| DEC-TEST-014 | Informal team confidence alone không đủ để release                                                         | Release / Testing  | Approved               | Document 19, 20 |
| DEC-TEST-015 | Backup demo video không bắt buộc                                                                           | Demo               | Approved               | Document 20     |
| DEC-TEST-016 | Screenshots, Postman collections và optional video là contingency evidence, không thay thế running product | Demo               | Approved               | Document 20     |
| DEC-TEST-017 | demo:reset chỉ permitted local environment                                                                 | Demo Reset         | Approved               | Document 20     |
| DEC-TEST-018 | demo:reset phải refuse demo/staging/production/unknown environments                                        | Demo Reset         | Approved               | Document 20     |

---

## 7. Quyết định cũ đã bị thay thế

### 7.1. Authentication cũ

| Quyết định cũ                               | Trạng thái | Quyết định thay thế                                    |
| ------------------------------------------- | ---------- | ------------------------------------------------------ |
| Dùng custom username/password/JWT auth      | Replaced   | Supabase Auth là authentication chính thức             |
| Lưu password/password_hash trong PostgreSQL | Replaced   | PostgreSQL chỉ lưu user_profiles và authorization data |
| Tự phát hành JWT làm cơ chế auth chính      | Replaced   | Backend verify Supabase access token                   |
| Tin role/permission do frontend gửi lên     | Replaced   | Backend tự load role/permission từ PostgreSQL          |

### 7.2. Inventory cũ

| Quyết định cũ                                | Trạng thái | Quyết định thay thế                                         |
| -------------------------------------------- | ---------- | ----------------------------------------------------------- |
| Aggregate inventory làm source of truth      | Replaced   | MedicineBatch là source of truth                            |
| Medicine chỉ có một quantity/expiry tổng hợp | Replaced   | Tồn kho quản lý theo MedicineBatch                          |
| Direct edit inventory quantity               | Replaced   | Dùng Inventory Adjustment workflow                          |
| Không có batch allocation                    | Replaced   | Dùng order_item_batch_allocations                           |
| Bỏ FEFO                                      | Replaced   | FEFO là MVP business rule bắt buộc                          |
| Low-stock tính cả batch hết hạn              | Replaced   | Low-stock tính từ sellable_quantity, loại trừ batch hết hạn |

### 7.3. Interaction cũ

| Quyết định cũ                                     | Trạng thái | Quyết định thay thế                              |
| ------------------------------------------------- | ---------- | ------------------------------------------------ |
| Medicine-level interaction rule làm official rule | Replaced   | ActiveIngredient–ActiveIngredient rule           |
| InteractionAlert optional                         | Replaced   | Persist mọi alert đã hiển thị                    |
| HIGH alert chỉ advisory                           | Replaced   | HIGH cần acknowledgement và consultation note    |
| Checkout không kiểm tra unresolved HIGH alerts    | Replaced   | Checkout phải block nếu HIGH alert chưa đủ xử lý |
| Dùng CRITICAL trong MVP                           | Replaced   | MVP chỉ dùng LOW, MEDIUM, HIGH                   |

### 7.4. Sales/checkout cũ

| Quyết định cũ                                     | Trạng thái | Quyết định thay thế                                         |
| ------------------------------------------------- | ---------- | ----------------------------------------------------------- |
| Tách payment và invoice khỏi checkout transaction | Replaced   | Checkout transaction xử lý order, stock, payment và invoice |
| Dùng `POST /orders/{id}/pay` làm command chính    | Replaced   | Dùng `POST /orders/{id}/checkout` làm command định hướng    |
| Public `POST /payments` để hoàn tất order         | Replaced   | Payment tạo trong checkout flow                             |
| Public `POST /invoices` để hoàn tất order         | Replaced   | Invoice tạo trong checkout flow                             |
| PAID order có thể sửa/cancel trực tiếp            | Replaced   | PAID order immutable trong MVP                              |
| Không có idempotency                              | Replaced   | Checkout phải support idempotency                           |

### 7.5. AI/Graph cũ

| Quyết định cũ                         | Trạng thái | Quyết định thay thế                                          |
| ------------------------------------- | ---------- | ------------------------------------------------------------ |
| MockAI-only đủ cho MVP                | Replaced   | Google AI Provider là ưu tiên, MockAI chỉ fallback           |
| AI/Graph là optional advanced         | Replaced   | AI Guardrail, AI Audit, Graph Sync và Graph-RAG là MVP       |
| AI không cần guardrail                | Replaced   | AI Guardrail là MVP                                          |
| AI không cần audit                    | Replaced   | AI Audit Log là MVP                                          |
| MockGraph-only đủ cho MVP             | Replaced   | Neo4j graph projection là baseline                           |
| Neo4j là source of truth              | Replaced   | PostgreSQL là source of truth, Neo4j là projection           |
| Graph-RAG gộp mơ hồ vào AI Copilot    | Replaced   | Graph-RAG là module riêng                                    |
| Graph Sync không cần outbox/freshness | Replaced   | Graph Sync cần outbox/worker/retry/audit/freshness detection |

### 7.6. Scope/data cũ

| Quyết định cũ                                                    | Trạng thái | Quyết định thay thế                                     |
| ---------------------------------------------------------------- | ---------- | ------------------------------------------------------- |
| Full Customer Management là MVP blocker                          | Replaced   | Customer Management là Should-have; POS hỗ trợ khách lẻ |
| Full 100-table schema là MVP schema bắt buộc                     | Replaced   | 100-table database là extended/commercial design        |
| Real catalog data là operational seed hoàn chỉnh                 | Replaced   | Real catalog data chỉ là reference                      |
| Dùng toàn bộ scraped ingredients làm ActiveIngredient chính thức | Replaced   | ActiveIngredient phải curated                           |
| Seed selling_price = 0                                           | Replaced   | selling_price > 0 trong MVP                             |
| Online commerce là MVP                                           | Replaced   | Online commerce là Future / Commercial Expansion        |
| Multi-store/multi-warehouse là MVP                               | Replaced   | MVP dùng một logical default store/warehouse            |

---

## 8. Unresolved Decisions

Các decision sau chưa được xem là finalized hoàn toàn. Không được tự ý triển khai như Approved nếu chưa có xác nhận chính thức.

| Decision ID      | Vấn đề chưa chốt                                       | Trạng thái                        | Hướng xử lý đề xuất                                                                      | Tài liệu cần chốt |
| ---------------- | ------------------------------------------------------ | --------------------------------- | ---------------------------------------------------------------------------------------- | ----------------- |
| UNRES-TEST-001   | Automated testing toolchain chính thức                 | Unresolved                        | Recommended: Jest, Supertest, React Testing Library, Playwright, Postman                 | Document 20       |
| UNRES-PM-001     | Exact weekly/hourly capacity per member                | Unresolved                        | Dùng task-hour estimates và named ownership cho đến khi có capacity cụ thể               | Document 19       |
| UNRES-PM-002     | Dedicated demo/staging environment                     | Unresolved                        | Recommended: có nếu đủ thời gian, tách khỏi local và production                          | Document 19, 20   |
| UNRES-PM-003     | Release/Demo Owner và backup                           | Unresolved                        | Phải assign trước release/demo freeze                                                    | Document 19       |
| UNRES-AI-001     | Admin AI provider/model configuration UI               | Should-have, chưa MVP             | Backend config mandatory; Admin UI chỉ Should-have                                       | Document 15, 16   |
| UNRES-AI-002     | Admin prompt editing UI                                | Should-have                       | MVP seed approved prompts; UI editing để Should-have                                     | Document 15, 16   |
| UNRES-GRAPH-001  | Admin Graph Sync Status/retry screen                   | Should-have                       | Backend Graph Sync bắt buộc; UI status/retry không chặn MVP                              | Document 15, 17   |
| UNRES-UI-001     | Generic System Audit Log UI                            | Should-have                       | Backend audit logging vẫn mandatory                                                      | Document 15       |
| UNRES-INV-001    | Có triển khai StockMovement trong MVP hay không        | Unresolved / Recommended optional | Nếu không có, traceability phải đủ qua import details, allocations và adjustment details | Document 13, 14   |
| UNRES-UI-002     | Exact UI layout/table columns/component details        | Unresolved                        | Chốt trong UI/UX Screen Specification                                                    | Document 15       |
| UNRES-DATA-001   | Số lượng chính xác medicine/ingredient/order demo seed | Unresolved                        | Chốt trong Data Strategy & MVP Seed Plan                                                 | Document 18       |
| UNRES-REPORT-001 | Mức độ biểu đồ nâng cao trong dashboard                | Should-have/Future                | MVP chỉ cần deterministic reports                                                        | Document 15       |
| UNRES-GRAPH-002  | Graph visualization nâng cao                           | Should-have/Future                | Không chặn Graph Sync/Graph-RAG MVP                                                      | Document 15, 17   |

---

## 9. Scope Baseline

### 9.1. MVP Scope

MVP là phạm vi bắt buộc để sản phẩm đạt baseline hiện tại.

MVP gồm:

1. Supabase Auth.
2. User profile trong PostgreSQL.
3. Multi-role RBAC.
4. Permission-based authorization.
5. Ownership-based access cho Staff.
6. First-login password change cho selected demo user nếu cần.
7. Medicine Management.
8. ActiveIngredient Management.
9. Medicine–ActiveIngredient mapping.
10. Supplier Management.
11. MedicineBatch.
12. Stock Import.
13. FEFO.
14. Inventory Summary.
15. Near-expiry và low-stock dựa trên sellable stock.
16. Inventory Adjustment.
17. Draft Order.
18. Order History và Order Detail.
19. DrugInteraction Rule.
20. Persisted InteractionAlert.
21. HIGH alert acknowledgement.
22. HIGH alert consultation note.
23. Checkout transaction.
24. Payment simulation.
25. Invoice generation.
26. Revenue Report.
27. Top Medicines Report.
28. Inventory Report.
29. System Settings cho near-expiry threshold.
30. Google AI Provider integration.
31. MockAI fallback.
32. AI Guardrail.
33. AI Audit.
34. Consultation Session hoặc tương đương nếu cần cho AI context.
35. Neo4j graph projection.
36. Graph Sync.
37. Graph Explorer trong phạm vi quyền được cấp.
38. Graph-RAG.
39. Curated operational seed.
40. Local demo reset workflow.
41. Backend Audit Log cho nghiệp vụ quan trọng.

### 9.2. Should-have Scope

Should-have gồm:

1. Full Customer Management.
2. Customer purchase history nâng cao.
3. Graph Sync Status/retry UI.
4. Generic System Audit Log UI.
5. Admin prompt editing UI.
6. Admin AI provider/model configuration UI.
7. AI-generated business report narrative.
8. Advanced dashboard charts.
9. Supabase Storage nếu cần.
10. Supabase Realtime nếu cần.
11. Notification.
12. Reorder suggestion nếu còn thời gian.
13. Forecast tồn kho nếu còn thời gian.
14. Graph visualization nâng cao.

### 9.3. Future / Commercial Expansion Scope

Future / Commercial Expansion gồm:

1. Online commerce.
2. Cart.
3. Wishlist.
4. Shipping.
5. Coupon.
6. Review.
7. CMS.
8. Customer portal.
9. Product variants làm core commerce.
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
23. DrugGroup taxonomy nếu có nguồn authoritative.
24. Symptom/Condition/RedFlag/Recommendation graph enrichment.
25. TREATS_SYMPTOM.
26. CAUTION_WITH.
27. CRITICAL interaction severity.
28. Full mobile support.
29. Full cross-browser testing.
30. Commercial-scale 100-table implementation.

### 9.4. Out of Scope

Out of Scope gồm:

1. AI chẩn đoán bệnh.
2. AI kê đơn thuốc.
3. AI đưa liều dùng cụ thể.
4. AI thay thế dược sĩ, bác sĩ hoặc chuyên gia y tế.
5. Real patient medical record.
6. Lưu raw PII trong AI Audit Log.
7. Real bank integration trong MVP.
8. Refund trong MVP.
9. Return trong MVP.
10. Online shopping checkout trong MVP.
11. Customer portal trong MVP.
12. Multi-store operation trong MVP.
13. Multi-warehouse stock transfer trong MVP.
14. Full 100-table implementation như điều kiện MVP.
15. MockAI-only làm bằng chứng hoàn thành MVP AI.
16. MockGraph-only làm bằng chứng hoàn thành MVP Graph.
17. Aggregate inventory làm source of truth.
18. Medicine-level interaction rule làm official rule.
19. Dùng toàn bộ scraped ingredients làm active ingredients chính thức.
20. Seed price = 0 thành selling_price.
21. Checkout bỏ qua FEFO.
22. Checkout bỏ qua HIGH alert acknowledgement hoặc consultation note.
23. Chạy destructive test trên demo/staging/production database.
24. Demo reset ở môi trường không phải local.
25. Raw Cypher access cho Staff.
26. Warehouse truy cập InteractionAlert hoặc Graph Explorer trong MVP.

---

## 10. Quy tắc kiểm soát scope

### 10.1. Quy tắc thêm scope

Một chức năng mới chỉ được thêm vào MVP nếu:

1. Có lý do nghiệp vụ hoặc kỹ thuật rõ ràng.
2. Không phá vỡ timeline release/demo.
3. Có Project Leader/scope owner phê duyệt.
4. Có impact analysis.
5. Có cập nhật Decision Log.
6. Có cập nhật các tài liệu liên quan.
7. Có Jira issue tương ứng nếu chuyển sang triển khai.
8. Có test scope tương ứng nếu thuộc MVP.

Nếu không đủ điều kiện, chức năng mới phải được phân loại vào Should-have, Future / Commercial Expansion hoặc Out of Scope.

### 10.2. Quy tắc hạ scope

Một phần MVP chỉ được hạ xuống Should-have hoặc Future nếu:

1. Có lý do rõ ràng về thời gian, rủi ro hoặc kỹ thuật.
2. Không phá vỡ luồng demo chính.
3. Không làm mất các technical differentiators đã chốt.
4. Có Project Leader/scope owner phê duyệt.
5. Có ghi trong Decision Log.
6. Có cập nhật SRS, Jira và Testing Plan.

Không được tự ý hạ các phần sau khỏi MVP nếu chưa có quyết định chính thức:

1. MedicineBatch.
2. FEFO.
3. Checkout transaction.
4. InteractionAlert lifecycle.
5. HIGH alert acknowledgement.
6. HIGH alert consultation note.
7. AI Guardrail.
8. AI Audit.
9. Graph Sync.
10. Graph-RAG.

### 10.3. Quy tắc xử lý mâu thuẫn tài liệu

Khi phát hiện mâu thuẫn:

1. Đối chiếu với bản bàn giao chính thức mới nhất.
2. Đối chiếu với Document 01.
3. Đối chiếu với Document 04.
4. Kiểm tra có decision mới nào được Project Leader xác nhận sau đó không.
5. Nếu tài liệu cũ mâu thuẫn baseline, đánh dấu tài liệu cũ là outdated/reference only.
6. Nếu chưa rõ, ghi thành unresolved decision, không tự ý chốt.
7. Cập nhật các tài liệu bị ảnh hưởng sau khi có quyết định chính thức.

### 10.4. Quy tắc cập nhật Decision Log

Cập nhật Decision Log khi có một trong các thay đổi sau:

1. Thêm chức năng vào MVP.
2. Loại chức năng khỏi MVP.
3. Chuyển chức năng giữa MVP, Should-have, Future hoặc Out of Scope.
4. Thay đổi stack công nghệ.
5. Thay đổi database source of truth.
6. Thay đổi API command chính.
7. Thay đổi authorization rule.
8. Thay đổi AI/Graph safety behavior.
9. Thay đổi demo/release/test gate.
10. Chốt một unresolved decision.
11. Thay đổi deadline, release plan hoặc CI gate.
12. Thay đổi dữ liệu demo hoặc demo reset safety rule.

### 10.5. Quy tắc kiểm soát tài liệu

Mỗi tài liệu Document 02–20 phải:

1. Bám baseline mới.
2. Không dùng quyết định cũ đã bị thay thế.
3. Có phân biệt MVP/Should-have/Future/Out of Scope nếu liên quan scope.
4. Không viết vượt vai trò của tài liệu.
5. Có traceability tới tài liệu liên quan.
6. Không tự ý finalized unresolved decisions.
7. Không tự thêm module hoặc workflow ngoài baseline.

---

## 11. Quy trình scope change

### 11.1. Bước 1 — Đề xuất thay đổi

Người đề xuất cần mô tả:

1. Thay đổi là gì.
2. Lý do thay đổi.
3. Scope hiện tại bị ảnh hưởng.
4. Đề xuất phân loại mới: MVP, Should-have, Future hoặc Out of Scope.
5. Rủi ro nếu không làm.
6. Rủi ro nếu làm.
7. Tài liệu bị ảnh hưởng.
8. Jira items bị ảnh hưởng.
9. Tác động đến demo.

### 11.2. Bước 2 — Phân tích ảnh hưởng

Cần đánh giá ảnh hưởng đến:

1. Business requirements.
2. SRS.
3. Authorization.
4. Use Case.
5. UML.
6. API.
7. ERD.
8. Prisma Schema.
9. UI/UX.
10. AI.
11. Graph.
12. Data seed.
13. Jira.
14. Testing.
15. Release/demo.

### 11.3. Bước 3 — Phân loại scope

Thay đổi phải được phân loại vào một trong các nhóm:

1. MVP.
2. Should-have.
3. Future / Commercial Expansion.
4. Out of Scope.
5. Rejected.
6. Unresolved.

### 11.4. Bước 4 — Phê duyệt

Scope change chỉ có hiệu lực khi được Project Leader/scope owner phê duyệt.

Các thay đổi lớn về nghiệp vụ hoặc deadline nên được communicate tới toàn bộ nhóm 4 thành viên.

### 11.5. Bước 5 — Cập nhật Decision Log

Sau khi được phê duyệt:

1. Thêm decision mới hoặc cập nhật decision cũ.
2. Ghi rõ ngày cập nhật.
3. Ghi trạng thái mới.
4. Ghi tài liệu bị ảnh hưởng.
5. Ghi lý do quyết định.

### 11.6. Bước 6 — Cập nhật tài liệu liên quan

Tùy loại thay đổi, cập nhật:

1. Document 03 nếu thay đổi scope sản phẩm.
2. Document 05 nếu thay đổi business requirement.
3. Document 06 nếu thay đổi software requirement.
4. Document 07 nếu thay đổi role/permission.
5. Document 08 nếu thay đổi use case.
6. Document 09 nếu thay đổi UML.
7. Document 12 nếu thay đổi API.
8. Document 13/14 nếu thay đổi database/Prisma.
9. Document 15 nếu thay đổi UI.
10. Document 16 nếu thay đổi AI.
11. Document 17 nếu thay đổi Graph.
12. Document 18 nếu thay đổi data/demo seed.
13. Document 19 nếu thay đổi Jira/release.
14. Document 20 nếu thay đổi testing/demo/setup.

### 11.7. Bước 7 — Cập nhật Jira và test scope

Nếu thay đổi ảnh hưởng đến triển khai:

1. Tạo hoặc cập nhật Jira issue.
2. Cập nhật sprint/backlog.
3. Cập nhật acceptance criteria.
4. Cập nhật test cases.
5. Cập nhật demo checklist nếu cần.

---

## 12. Mẫu Change Request

```text
Change Request ID:
Title:
Requested by:
Date:
Current scope:
Proposed change:
Reason:
Scope classification:
- MVP / Should-have / Future / Out of Scope / Unresolved

Affected modules:
Affected documents:
- Document 03:
- Document 05:
- Document 06:
- Document 07:
- Document 08:
- Document 09:
- Document 10:
- Document 11:
- Document 12:
- Document 13:
- Document 14:
- Document 15:
- Document 16:
- Document 17:
- Document 18:
- Document 19:
- Document 20:

Affected Jira items:
Affected test cases:
Affected demo flows:
Risk if approved:
Risk if rejected:
Decision:
- Approved / Rejected / Deferred / Unresolved

Decision ID:
Approved by:
Approval date:
Notes:
```

### 12.1. Ví dụ Change Request

```text
Change Request ID: CR-001
Title: Thêm Graph Sync Status UI vào MVP
Requested by: Developer
Date: 08/06/2026
Current scope: Graph Sync Status UI đang là Should-have
Proposed change: Đưa Graph Sync Status UI vào MVP
Reason: Muốn demo rõ hơn trạng thái đồng bộ Neo4j
Scope classification: Proposed MVP

Affected modules:
- Graph Sync
- Admin UI

Affected documents:
- Document 03
- Document 06
- Document 12
- Document 15
- Document 17
- Document 19
- Document 20

Risk if approved:
- Tăng khối lượng UI và API
- Có thể ảnh hưởng deadline

Risk if rejected:
- Demo Graph Sync phải dùng log hoặc backend evidence thay vì UI

Decision:
- Deferred

Decision ID:
- UNRES-GRAPH-001 remains Should-have

Approved by:
- Project Leader

Approval date:
- TBD

Notes:
- Backend Graph Sync vẫn là MVP; UI status/retry chưa phải MVP blocker.
```

---

## 13. Ma trận ảnh hưởng tài liệu

| Loại quyết định thay đổi           | Tài liệu bắt buộc kiểm tra/cập nhật         |
| ---------------------------------- | ------------------------------------------- |
| Thay đổi product scope             | Document 03, 04, 05, 06, 19, 20             |
| Thay đổi MVP/Should-have/Future    | Document 03, 04, 05, 06, 15, 19, 20         |
| Thay đổi business rule             | Document 04, 05, 06, 08, 12, 13, 14, 20     |
| Thay đổi authorization             | Document 04, 06, 07, 08, 12, 15, 20         |
| Thay đổi role hoặc permission      | Document 04, 07, 12, 15, 20                 |
| Thay đổi Medicine/ActiveIngredient | Document 04, 05, 06, 12, 13, 14, 15, 17, 18 |
| Thay đổi Supplier                  | Document 04, 05, 06, 07, 12, 13, 15         |
| Thay đổi MedicineBatch/inventory   | Document 04, 06, 08, 12, 13, 14, 15, 18, 20 |
| Thay đổi Stock Import              | Document 04, 06, 08, 09, 12, 13, 14, 15, 20 |
| Thay đổi Inventory Adjustment      | Document 04, 06, 08, 09, 12, 13, 14, 15, 20 |
| Thay đổi POS/order                 | Document 04, 06, 08, 09, 12, 13, 14, 15, 20 |
| Thay đổi Checkout                  | Document 04, 06, 08, 09, 12, 13, 14, 15, 20 |
| Thay đổi Payment/Invoice           | Document 04, 06, 08, 12, 13, 14, 15, 20     |
| Thay đổi Interaction Rule          | Document 04, 06, 08, 12, 13, 14, 15, 17, 20 |
| Thay đổi InteractionAlert          | Document 04, 06, 08, 12, 13, 14, 15, 16, 20 |
| Thay đổi AI Copilot                | Document 04, 06, 10, 12, 15, 16, 20         |
| Thay đổi AI Guardrail/Audit        | Document 04, 06, 12, 13, 14, 16, 20         |
| Thay đổi Graph Sync                | Document 04, 10, 12, 13, 14, 17, 18, 20     |
| Thay đổi Graph-RAG                 | Document 04, 06, 10, 12, 16, 17, 20         |
| Thay đổi data seed                 | Document 04, 13, 14, 18, 20                 |
| Thay đổi Jira/release              | Document 04, 19, 20                         |
| Thay đổi testing/setup             | Document 04, 19, 20                         |
| Thay đổi UI                        | Document 04, 06, 07, 08, 12, 15, 20         |

---

## 14. Quy tắc traceability

### 14.1. Traceability giữa decisions và tài liệu

Mỗi quyết định quan trọng phải trace được đến tài liệu liên quan.

Ví dụ:

| Decision                                         | Trace tới                           |
| ------------------------------------------------ | ----------------------------------- |
| DEC-AUTH-001 — Supabase Auth                     | Document 07, 10, 12, 13, 14, 15, 20 |
| DEC-INV-007 — MedicineBatch source of truth      | Document 06, 12, 13, 14, 15, 20     |
| DEC-SALES-008 — Checkout command chính thức      | Document 06, 08, 12, 13, 14, 20     |
| DEC-INT-001 — ActiveIngredient-level interaction | Document 06, 12, 13, 14, 16, 17     |
| DEC-AI-009 — AI Guardrail là MVP                 | Document 06, 16, 20                 |
| DEC-GRAPH-011 — Graph Sync là MVP                | Document 10, 17, 20                 |
| DEC-DATA-008 — Curated operational seed          | Document 18, 20                     |

### 14.2. Traceability giữa tài liệu

Các liên kết traceability chính:

1. Document 01 → toàn bộ Document 02–20.
2. Document 04 → kiểm soát quyết định cho toàn bộ Document 02–20.
3. Document 03 → phạm vi cho BRD, SRS, Use Case, UI, Jira, Testing.
4. Document 05 → input cho Document 06 và Document 08.
5. Document 06 → input cho Document 07, 08, 12, 13, 14, 15, 20.
6. Document 07 → input cho API, UI và Testing.
7. Document 08 → input cho UML, API, UI và Testing.
8. Document 12 → trace với ERD, Prisma và Testing.
9. Document 13/14 → trace với API, Data Seed và Testing.
10. Document 15 → trace với SRS, Use Case, API và Testing.
11. Document 16 → trace với AI API, AI Audit và AI Guardrail tests.
12. Document 17 → trace với Graph Sync, Graph-RAG API và demo.
13. Document 18 → trace với demo reset và smoke tests.
14. Document 19 → trace với Jira implementation plan.
15. Document 20 → trace với SRS/API/UI/Data/Demo.

### 14.3. Traceability trong Jira

Jira issues nên trace tới:

1. Epic.
2. Story.
3. Task.
4. Related requirement ID nếu có.
5. Related decision ID nếu issue triển khai một quyết định quan trọng.
6. Related test case nếu issue thuộc MVP.
7. Related PR/commit trong GitHub.

Ví dụ:

```text
Jira Story: PA-SALES-CHK-001
Related Decision: DEC-SALES-008, DEC-SALES-010, DEC-SALES-014, DEC-SALES-019
Related SRS: FR-CHECKOUT-001
Related API: POST /orders/{id}/checkout
Related Test: TC-CHECKOUT-001
```

---

## 15. Quality Checklist cho quyết định

Trước khi một tài liệu hoặc một thay đổi được xem là đúng baseline, cần kiểm tra checklist sau.

### 15.1. Checklist baseline tổng thể

| Câu hỏi kiểm tra                                        | Đạt khi |
| ------------------------------------------------------- | ------- |
| Có bám baseline mới nhất không?                         | Có      |
| Có dùng tài liệu cũ mâu thuẫn baseline không?           | Không   |
| Có phân biệt MVP/Should-have/Future/Out of Scope không? | Có      |
| Có tự ý thêm scope mới không?                           | Không   |
| Có tự ý hạ MVP xuống Should-have/Future không?          | Không   |
| Có ghi unresolved decision nếu chưa chốt không?         | Có      |
| Có trace sang tài liệu liên quan không?                 | Có      |

### 15.2. Checklist authentication

| Câu hỏi kiểm tra                                            | Đạt khi |
| ----------------------------------------------------------- | ------- |
| Có dùng Supabase Auth không?                                | Có      |
| Có tránh custom username/password/JWT không?                | Có      |
| Có tránh lưu password/password_hash trong PostgreSQL không? | Có      |
| Có user_profiles liên kết Supabase Auth không?              | Có      |
| Có multi-role RBAC không?                                   | Có      |
| Có roles, permissions, user_roles, role_permissions không?  | Có      |
| Có permission-based authorization không?                    | Có      |
| Có ownership-based access cho Staff không?                  | Có      |

### 15.3. Checklist inventory

| Câu hỏi kiểm tra                                      | Đạt khi |
| ----------------------------------------------------- | ------- |
| Có MedicineBatch không?                               | Có      |
| MedicineBatch có là source of truth không?            | Có      |
| Có loại bỏ aggregate inventory source of truth không? | Có      |
| Có FEFO không?                                        | Có      |
| Batch hết hạn có bị loại khỏi sellable stock không?   | Có      |
| Low-stock có tính từ sellable_quantity không?         | Có      |
| Stock Import có cập nhật batch khi confirm không?     | Có      |
| Inventory Adjustment có reason và audit không?        | Có      |
| Có chặn quantity_remaining âm không?                  | Có      |

### 15.4. Checklist sales/checkout

| Câu hỏi kiểm tra                                           | Đạt khi |
| ---------------------------------------------------------- | ------- |
| Order status MVP có giới hạn DRAFT, PAID, CANCELLED không? | Có      |
| Checkout có là command chính thức không?                   | Có      |
| Checkout có transaction không?                             | Có      |
| Checkout có idempotency không?                             | Có      |
| Checkout có lock order không?                              | Có      |
| Checkout có verify stock không?                            | Có      |
| Checkout có apply FEFO không?                              | Có      |
| Checkout có tạo batch allocations không?                   | Có      |
| Payment và invoice có nằm trong checkout flow không?       | Có      |
| PAID order có immutable không?                             | Có      |
| Refund/return có nằm ngoài MVP không?                      | Có      |

### 15.5. Checklist interaction

| Câu hỏi kiểm tra                                                   | Đạt khi |
| ------------------------------------------------------------------ | ------- |
| Interaction rule có ở cấp ActiveIngredient–ActiveIngredient không? | Có      |
| Medicine-level rule có bị loại khỏi official baseline không?       | Có      |
| Severity MVP có chỉ gồm LOW, MEDIUM, HIGH không?                   | Có      |
| CRITICAL có nằm ngoài MVP không?                                   | Có      |
| InteractionAlert có được persist không?                            | Có      |
| Có active uniqueness cho order_id + interaction_id không?          | Có      |
| HIGH alert có bắt buộc acknowledgement không?                      | Có      |
| HIGH alert có bắt buộc consultation note không?                    | Có      |
| Checkout có block khi HIGH alert chưa đủ xử lý không?              | Có      |
| Warehouse có bị chặn interaction alerts trong MVP không?           | Có      |

### 15.6. Checklist AI

| Câu hỏi kiểm tra                                                              | Đạt khi |
| ----------------------------------------------------------------------------- | ------- |
| AI Copilot có là MVP technical differentiator không?                          | Có      |
| Google AI Provider có là provider ưu tiên không?                              | Có      |
| MockAI có chỉ là fallback không?                                              | Có      |
| AI Guardrail có là MVP không?                                                 | Có      |
| AI Audit có là MVP không?                                                     | Có      |
| AI có chặn diagnosis/prescribing/dosage không?                                | Có      |
| AI Audit có tránh raw PII không?                                              | Có      |
| Prompt template có version không?                                             | Có      |
| AI-generated draft có cần Staff xác nhận trước khi thành official note không? | Có      |

### 15.7. Checklist Graph

| Câu hỏi kiểm tra                                                                       | Đạt khi |
| -------------------------------------------------------------------------------------- | ------- |
| Neo4j có là projection không?                                                          | Có      |
| PostgreSQL có là source of truth không?                                                | Có      |
| Core graph MVP có giới hạn Medicine, ActiveIngredient, CONTAINS, INTERACTS_WITH không? | Có      |
| Graph Sync có outbox/worker/retry/audit không?                                         | Có      |
| Graph Sync có freshness detection không?                                               | Có      |
| Graph-RAG có là module riêng không?                                                    | Có      |
| Graph stale/unavailable có fallback PostgreSQL cho interaction explanation không?      | Có      |
| Pure graph query không fallback được có safe error không?                              | Có      |
| Staff có bị chặn raw Cypher không?                                                     | Có      |

### 15.8. Checklist data/demo

| Câu hỏi kiểm tra                                                   | Đạt khi |
| ------------------------------------------------------------------ | ------- |
| Database 100 bảng có được xem là extended/commercial design không? | Có      |
| MVP có dùng core subset không?                                     | Có      |
| Real catalog data có chỉ là reference không?                       | Có      |
| Curated operational seed có được tạo riêng không?                  | Có      |
| Demo inventory có tái tạo từ transactions không?                   | Có      |
| Demo reset có chỉ chạy local không?                                | Có      |
| Smoke tests có chạy sau demo reset không?                          | Có      |
| Không seed selling_price = 0 không?                                | Có      |

### 15.9. Checklist project management/testing

| Câu hỏi kiểm tra                                                                                                | Đạt khi |
| --------------------------------------------------------------------------------------------------------------- | ------- |
| Jira có cần major revision theo baseline mới không?                                                             | Có      |
| Jira có là source of truth cho Epic/Story/Sprint/status không?                                                  | Có      |
| GitHub có dùng cho source code/PR/CI không?                                                                     | Có      |
| Branch model có main/develop/feature branches không?                                                            | Có      |
| CI gate tối thiểu có lint, type check, tests, Prisma validation, migration check, frontend/backend build không? | Có      |
| Testing không chạy destructive trên demo database không?                                                        | Có      |
| Demo reset có guard môi trường không?                                                                           | Có      |
| Release cần Project Leader approval không?                                                                      | Có      |

---

## 16. Kết luận

Document 04 — Decision Log & Scope Control là tài liệu kiểm soát quyết định và phạm vi chính thức của dự án **PharmaAssist AI Intelligence**.

Tài liệu này xác định rằng:

1. Baseline mới là nguồn ưu tiên cao nhất.
2. Bộ 20 tài liệu mới phải được xây lại như consolidated documentation.
3. Nội dung tài liệu chính thức phải viết bằng tiếng Việt, trong khi tên file/tên tài liệu có thể giữ tiếng Anh.
4. MVP bao gồm nhiều thành phần nghiệp vụ và kỹ thuật quan trọng như Supabase Auth, MedicineBatch, FEFO, Checkout transaction, InteractionAlert lifecycle, AI Guardrail, AI Audit, Graph Sync và Graph-RAG.
5. Các quyết định cũ như custom JWT, aggregate inventory, Medicine-level interaction, MockAI-only, MockGraph-only, payment/invoice tách rời và full 100-table MVP đã bị thay thế.
6. Các unresolved decisions phải được giữ nguyên trạng thái cho đến khi có xác nhận chính thức.
7. Mọi scope change phải được Project Leader/scope owner phê duyệt.
8. Mọi approved change phải cập nhật Decision Log và các tài liệu bị ảnh hưởng.
9. Mọi tài liệu tiếp theo phải dùng Document 04 để kiểm tra quyết định và kiểm soát phạm vi.

Tài liệu này sẽ là cơ sở để tiếp tục chuẩn hóa:

1. Document 03 — Vision & Scope Document.
2. Document 02 — Project Charter.
3. Document 05 — Business Requirements Document.
4. Document 06 — Software Requirements Specification.
5. Các tài liệu thiết kế, API, ERD, UI, AI, Graph, Data, Jira và Testing còn lại.
