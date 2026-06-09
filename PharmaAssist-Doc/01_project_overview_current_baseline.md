# Document 01 — Project Overview & Current Baseline

# Tài liệu 01 — Tổng quan dự án và baseline hiện tại

---

## Metadata

| Mục              | Nội dung                                                                                                                                                                                |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID      | DOC-01                                                                                                                                                                                  |
| File name        | `01_project_overview_current_baseline.md`                                                                                                                                               |
| Document Name    | Project Overview & Current Baseline                                                                                                                                                     |
| Tên tiếng Việt   | Tổng quan dự án và baseline hiện tại                                                                                                                                                    |
| Project          | PharmaAssist AI Intelligence                                                                                                                                                            |
| Version          | 1.0 Draft                                                                                                                                                                               |
| Status           | Draft                                                                                                                                                                                   |
| Created Date     | 08/06/2026                                                                                                                                                                              |
| Last Updated     | 08/06/2026                                                                                                                                                                              |
| Owner            | Project Leader                                                                                                                                                                          |
| Reviewer         | Nhóm phát triển / Giảng viên hướng dẫn                                                                                                                                                  |
| Baseline Source  | Bản bàn giao chính thức, Master Documentation Index & File Naming Standard, Documentation Blueprint for 20 Consolidated Documents, các quyết định đã chốt sau khi phân tích tài liệu cũ |
| Language Rule    | Tên file và tên tài liệu có thể dùng tiếng Anh; nội dung chính viết bằng tiếng Việt                                                                                                     |
| Terminology Rule | Giữ nguyên tên công nghệ, module, entity, API, table, enum và thuật ngữ kỹ thuật cần thiết bằng tiếng Anh                                                                               |

---

## 1. Mục đích tài liệu

Tài liệu **Project Overview & Current Baseline** cung cấp bức tranh tổng quan chính thức của dự án **PharmaAssist AI Intelligence** tại thời điểm bắt đầu xây dựng bộ **20 consolidated documents**.

Tài liệu này có các mục đích chính:

1. Mô tả dự án PharmaAssist AI Intelligence là gì.
2. Ghi nhận trạng thái hiện tại của dự án sau khi hoàn tất phân tích tài liệu đầu vào.
3. Xác định baseline công nghệ chính thức.
4. Xác định baseline nghiệp vụ chính thức.
5. Tóm tắt phạm vi MVP, Should-have, Future / Commercial Expansion và Out of Scope.
6. Làm rõ các quyết định cũ tuyệt đối không được quay lại.
7. Làm nền cho toàn bộ các tài liệu còn lại trong bộ Document 02–20.
8. Giúp người mới tham gia dự án hiểu nhanh định hướng hiện tại trước khi đọc các tài liệu chi tiết hơn.
9. Giảm rủi ro các tài liệu sau viết lệch baseline hoặc quay lại thiết kế cũ.
10. Đảm bảo toàn bộ nhóm phát triển dùng cùng một nguồn baseline thống nhất.

Document 01 không phải là SRS, không phải API Specification, không phải ERD, không phải Prisma Schema, không phải UI/UX Specification và không phải Testing Guide.

Các tài liệu sau sẽ đi sâu hơn vào từng phần:

1. Business requirements sẽ được viết trong Document 05.
2. Software requirements sẽ được viết trong Document 06.
3. Roles và permissions sẽ được viết trong Document 07.
4. Use cases sẽ được viết trong Document 08.
5. UML diagrams sẽ được viết trong Document 09.
6. System architecture sẽ được viết trong Document 10.
7. Module design sẽ được viết trong Document 11.
8. API contract sẽ được viết trong Document 12.
9. Database design và ERD sẽ được viết trong Document 13.
10. Prisma Schema và migration sẽ được viết trong Document 14.
11. UI/UX screen specification sẽ được viết trong Document 15.
12. AI architecture, guardrail và audit sẽ được viết trong Document 16.
13. Knowledge Graph, Neo4j Sync và Graph-RAG sẽ được viết trong Document 17.
14. Data strategy, catalog reference và seed plan sẽ được viết trong Document 18.
15. Jira, release và project management sẽ được viết trong Document 19.
16. Testing, demo và setup guide sẽ được viết trong Document 20.

---

## 2. Người đọc chính

Tài liệu này dành cho các nhóm người đọc sau:

1. **Project Leader**
   Dùng tài liệu này để kiểm soát baseline, phạm vi và định hướng viết các tài liệu tiếp theo.

2. **Toàn bộ nhóm phát triển**
   Dùng tài liệu này để hiểu hệ thống cần xây dựng theo baseline nào, tránh triển khai theo thiết kế cũ.

3. **Giảng viên hướng dẫn**
   Dùng tài liệu này để nắm nhanh phạm vi dự án, mức độ phức tạp, các công nghệ chính và định hướng tài liệu.

4. **Người mới tham gia dự án**
   Dùng tài liệu này để hiểu nhanh PharmaAssist AI Intelligence trước khi đọc SRS, ERD, API, UI/UX hoặc Testing Guide.

5. **Người đọc muốn hiểu tổng quan trước khi vào tài liệu chi tiết**
   Dùng tài liệu này như bản định hướng đầu tiên của toàn bộ bộ consolidated documentation.

---

## 3. Bối cảnh dự án

**PharmaAssist AI Intelligence** là hệ thống hỗ trợ quản lý nhà thuốc, tập trung vào nghiệp vụ bán thuốc tại quầy, quản lý tồn kho theo lô, kiểm tra tương tác thuốc và hỗ trợ giải thích cảnh báo bằng AI trong phạm vi an toàn.

Dự án được xây dựng trong bối cảnh nhóm đã có nhiều tài liệu đầu vào khác nhau, gồm tài liệu hệ thống, SRS, UML, API, UI/UX, AI, Graph, Testing, database 100 bảng, Jira documents và nhóm dữ liệu thật/catalog data. Tuy nhiên, các tài liệu cũ có nhiều điểm mâu thuẫn, một số thiết kế đã lỗi thời hoặc không còn phù hợp với baseline mới.

Vì vậy, dự án cần xây lại bộ tài liệu chính thức theo hướng **consolidated documentation** để:

1. Thống nhất toàn bộ quyết định đã chốt.
2. Loại bỏ các thiết kế cũ không còn phù hợp.
3. Tạo nguồn tài liệu chính thức cho development, database, API, UI, testing, Jira và demo.
4. Đảm bảo mọi tài liệu có traceability với nhau.
5. Giữ phạm vi MVP rõ ràng, không mở rộng tùy tiện.
6. Thể hiện được độ phức tạp kỹ thuật phù hợp với đồ án.

PharmaAssist AI Intelligence không chỉ là một hệ thống CRUD quản lý thuốc đơn giản. Dự án cần thể hiện các năng lực nghiệp vụ và kỹ thuật nổi bật sau:

1. Quản lý thuốc và hoạt chất.
2. Quản lý nhà cung cấp.
3. Quản lý lô thuốc bằng **MedicineBatch**.
4. Quản lý nhập kho.
5. Quản lý điều chỉnh tồn kho có lý do và audit.
6. Quản lý tồn kho theo hạn dùng.
7. Bán thuốc tại quầy thông qua POS.
8. Xuất kho theo nguyên tắc **FEFO**.
9. Hoàn tất đơn hàng bằng **Checkout transaction**.
10. Kiểm tra tương tác thuốc ở cấp **ActiveIngredient–ActiveIngredient**.
11. Lưu lịch sử cảnh báo tương tác bằng **InteractionAlert**.
12. Bắt buộc xử lý cảnh báo HIGH trước checkout.
13. Tích hợp **AI Copilot** để hỗ trợ giải thích cảnh báo.
14. Có **AI Guardrail** để kiểm soát an toàn nội dung AI.
15. Có **AI Audit** để ghi nhận việc sử dụng AI.
16. Có **Neo4j Knowledge Graph** dưới dạng graph projection.
17. Có **Graph Sync** để đồng bộ dữ liệu từ PostgreSQL sang Neo4j.
18. Có **Graph-RAG** như một module riêng.
19. Có báo cáo cơ bản phục vụ vận hành.
20. Có dữ liệu demo/seed được thiết kế riêng cho MVP.

---

## 4. Trạng thái hiện tại của dự án

Dự án đã hoàn tất giai đoạn phân tích tài liệu đầu vào.

Các nhóm tài liệu và dữ liệu đã được phân tích gồm:

1. Bộ tài liệu hệ thống/SRS/UML/API/UI/AI/Graph/Testing ban đầu.
2. Tài liệu database 100 bảng.
3. Tài liệu Jira gồm Components, Epics, Stories, Tasks, Sprint và Branch.
4. Nhóm dữ liệu thật/catalog data.
5. Bản bàn giao chính thức sau khi phân tích toàn bộ tài liệu.
6. Master Documentation Index & File Naming Standard.
7. Documentation Blueprint for 20 Consolidated Documents.
8. Các bản nháp Document 01, Document 03 và Document 04.

Kết luận hiện tại:

1. Dự án đang chuyển từ giai đoạn phân tích tài liệu cũ sang giai đoạn xây bộ tài liệu chính thức mới.
2. Bộ tài liệu mới gồm 20 consolidated documents.
3. Các tài liệu cũ chỉ còn vai trò tham khảo.
4. Nếu tài liệu cũ mâu thuẫn baseline mới, phải ưu tiên baseline mới.
5. Không phân tích lại dự án từ đầu nếu không có tài liệu mới cần đối chiếu.
6. Không tự ý thêm scope mới ngoài baseline.
7. Không hỏi lại các quyết định đã được chốt.
8. Tên file và tên tài liệu có thể giữ tiếng Anh.
9. Nội dung chính của tài liệu phải viết bằng tiếng Việt.
10. Các thuật ngữ kỹ thuật cố định được giữ bằng tiếng Anh để tránh dịch sai nghĩa.

Trạng thái các tài liệu đầu tiên:

| Tài liệu                                          | Trạng thái hiện tại                   | Hướng xử lý                                 |
| ------------------------------------------------- | ------------------------------------- | ------------------------------------------- |
| Document 01 — Project Overview & Current Baseline | Đang chuẩn hóa lại theo blueprint     | Là tài liệu nền của toàn bộ bộ tài liệu mới |
| Document 04 — Decision Log & Scope Control        | Đã có bản nháp tiếng Việt             | Sẽ rà lại sau Document 01                   |
| Document 03 — Vision & Scope Document             | Đã có bản nháp tiếng Việt             | Sẽ rà lại sau Document 04                   |
| Document 02 — Project Charter                     | Sẽ viết sau khi 01/04/03 ổn định      | Dùng 01/03/04 làm đầu vào                   |
| Document 05–20                                    | Chưa viết bản consolidated chính thức | Viết lần lượt theo blueprint                |

---

## 5. Baseline công nghệ chính thức

### 5.1. Frontend

Frontend chính thức sử dụng:

* **Next.js**

Next.js là nền tảng frontend chính để xây dựng giao diện web cho hệ thống.

Frontend sẽ phục vụ các nhóm màn hình như:

1. Đăng nhập và first-login password change.
2. Dashboard theo quyền.
3. Quản lý thuốc.
4. Quản lý hoạt chất.
5. Quản lý nhà cung cấp.
6. Quản lý tồn kho.
7. Nhập kho.
8. Điều chỉnh tồn kho.
9. POS bán thuốc tại quầy.
10. Checkout.
11. Hóa đơn.
12. Order history và order detail.
13. Interaction alert handling.
14. AI Copilot.
15. Graph Explorer.
16. Báo cáo.
17. System Settings.

Frontend không được tự quyết định quyền truy cập chỉ bằng cách ẩn menu. Frontend có thể hỗ trợ role-based UI visibility, nhưng backend vẫn là nơi kiểm tra authentication, permission và ownership chính thức.

### 5.2. Backend

Backend chính thức sử dụng:

* **NestJS / Node.js**

Backend được định hướng theo mô hình **Modular Monolith**, nghĩa là hệ thống có thể nằm trong một backend application nhưng các module phải có ranh giới trách nhiệm rõ ràng.

Backend chịu trách nhiệm xử lý:

1. Business rules.
2. Authentication token verification từ Supabase Auth.
3. Permission-based authorization.
4. Ownership/data scope checking.
5. Medicine và ActiveIngredient logic.
6. Supplier logic.
7. MedicineBatch và inventory logic.
8. Stock Import workflow.
9. Inventory Adjustment workflow.
10. POS Draft Order logic.
11. Interaction checking.
12. InteractionAlert lifecycle.
13. Checkout transaction.
14. Payment simulation.
15. Invoice generation.
16. AI orchestration.
17. AI Guardrail.
18. AI Audit logging.
19. Graph Sync worker.
20. Graph-RAG orchestration.
21. Audit logging.
22. API phục vụ frontend.

### 5.3. ORM

ORM chính thức sử dụng:

* **Prisma**

Prisma được dùng để quản lý schema, migration và truy vấn PostgreSQL từ backend.

Prisma Schema trong các tài liệu sau phải phản ánh đúng baseline nghiệp vụ, đặc biệt là:

1. Supabase-linked user profile.
2. Multi-role RBAC.
3. Medicine và ActiveIngredient.
4. MedicineBatch.
5. Stock Import.
6. Inventory Adjustment.
7. Order và Order Item.
8. Checkout transaction support.
9. Payment attempts.
10. Invoice.
11. ActiveIngredient-level DrugInteraction rules.
12. InteractionAlert lifecycle.
13. AI Audit.
14. Prompt Template.
15. Graph Sync Outbox.
16. Idempotency Records.
17. System Settings.
18. Audit Logs.

Document 01 chỉ ghi nhận vai trò của Prisma ở mức tổng quan. Prisma model chi tiết sẽ được viết trong Document 14.

### 5.4. Authentication

Authentication chính thức sử dụng:

* **Supabase Auth**

Supabase Auth là nguồn xác thực chính cho:

1. Email.
2. Password.
3. Session.
4. Access token.
5. Password update.

Ứng dụng không tự xây custom username/password/JWT làm authentication chính.

PostgreSQL nghiệp vụ không được lưu:

1. Password.
2. Password hash.
3. JWT secret cho custom auth.
4. Token tự phát hành để thay thế Supabase Auth.

PostgreSQL chỉ lưu dữ liệu nội bộ như:

1. `user_profiles`.
2. Roles.
3. Permissions.
4. User-role mapping.
5. Role-permission mapping.
6. Trạng thái nghiệp vụ của user.
7. Cờ `must_change_password` nếu cần first-login flow.

### 5.5. Database nghiệp vụ

Database nghiệp vụ chính sử dụng:

* **PostgreSQL**

PostgreSQL là **source of truth** cho toàn bộ dữ liệu nghiệp vụ.

Các dữ liệu nghiệp vụ chính phải lấy PostgreSQL làm nguồn chính thức, gồm:

1. User profile.
2. Roles và permissions.
3. Supplier.
4. Medicine.
5. ActiveIngredient.
6. Medicine–ActiveIngredient mapping.
7. MedicineBatch.
8. Stock Import.
9. Inventory Adjustment.
10. Order.
11. Order Item.
12. Order item batch allocation.
13. Payment.
14. Invoice.
15. DrugInteraction.
16. InteractionAlert.
17. Consultation Session.
18. Prompt Template.
19. AI Audit Log.
20. Graph Sync Outbox.
21. System Settings.
22. Audit Log.
23. Idempotency Record.

### 5.6. Knowledge Graph

Knowledge Graph chính thức sử dụng:

* **Neo4j**

Neo4j là **graph projection**, không phải source of truth.

Dữ liệu chính thức vẫn nằm trong PostgreSQL. Neo4j được đồng bộ từ PostgreSQL thông qua Graph Sync.

Core graph MVP chỉ gồm:

1. `Medicine` node.
2. `ActiveIngredient` node.
3. `CONTAINS` relationship.
4. `INTERACTS_WITH` relationship ở cấp ActiveIngredient–ActiveIngredient.

Các node như Symptom, Condition, RedFlag, Recommendation hoặc DrugGroup không thuộc core graph MVP nếu chưa có quyết định riêng và nguồn dữ liệu authoritative.

### 5.7. AI Provider

AI provider chính thức:

1. **Google AI Provider** là provider ưu tiên.
2. **MockAI** là fallback để giữ demo ổn định.

MockAI không được xem là provider duy nhất đủ để hoàn thành MVP. Hệ thống phải thể hiện được định hướng tích hợp AI provider thật, đồng thời vẫn có fallback để tránh demo bị hỏng khi provider thật lỗi, hết quota hoặc timeout.

Provider/model phải có khả năng cấu hình ở backend thông qua environment hoặc database configuration.

### 5.8. Setup chính thức

Primary setup của dự án:

1. Local Node.js.
2. Next.js frontend.
3. NestJS backend.
4. Prisma.
5. Cloud Supabase.
6. Neo4j AuraDB hoặc Neo4j environment phù hợp.
7. Google AI Provider nếu có API key phù hợp.
8. MockAI fallback cho demo stability.

Docker không phải setup chính thức. Docker chỉ có thể là tùy chọn local-development nếu nhóm muốn bổ sung sau.

---

## 6. Baseline nghiệp vụ chính thức

### 6.1. Medicine

**Medicine** là entity nghiệp vụ lõi trong MVP.

Medicine được dùng làm key nghiệp vụ cho:

1. Sales.
2. Batch.
3. Inventory.
4. Checkout.
5. Interaction checking thông qua ActiveIngredient.
6. Reports.

Medicine không được thay thế bằng product/product_variant trong MVP. Các bảng product/product_variant từ database 100 bảng có thể giữ trong thiết kế mở rộng hoặc commercial expansion, nhưng không phải trung tâm triển khai MVP.

Quy tắc baseline:

1. Medicine phải có trạng thái active/inactive.
2. Medicine có lịch sử nghiệp vụ không được xóa cứng tùy tiện.
3. `selling_price` phải lớn hơn 0 trong MVP.
4. Medicine có thể mapping với một hoặc nhiều ActiveIngredient.
5. Medicine dùng trong POS phải có dữ liệu đủ để bán và kiểm tra tồn kho.

### 6.2. ActiveIngredient

**ActiveIngredient** là entity lõi trong MVP.

ActiveIngredient được dùng để:

1. Mô tả hoạt chất của Medicine.
2. Làm cơ sở cho DrugInteraction Rule.
3. Đồng bộ sang Neo4j graph projection.
4. Hỗ trợ Graph-RAG và giải thích tương tác thuốc.

Không dùng toàn bộ scraped ingredient strings làm active ingredients chính thức nếu dữ liệu lẫn tá dược, hương liệu, thành phần mỹ phẩm hoặc chất liệu không phải hoạt chất.

### 6.3. Supplier

Supplier Management là MVP.

Warehouse có quyền:

1. Xem supplier.
2. Tạo supplier.
3. Cập nhật supplier.

Chỉ Admin được deactivate supplier.

Supplier cần liên kết với nghiệp vụ Stock Import khi phù hợp. Supplier có lịch sử nhập kho không nên bị xóa cứng.

### 6.4. Customer

Full Customer Management là **Should-have**, không phải điều kiện bắt buộc để hoàn thành MVP.

Tuy nhiên, POS trong MVP phải hỗ trợ khách lẻ/walk-in/anonymous customer.

Quy tắc MVP:

1. Cho phép `customer_id = null`.
2. UI hiển thị “Khách lẻ” hoặc tương đương.
3. Checkout không bị chặn chỉ vì không có customer account.
4. Customer không phải authenticated user trong MVP.
5. Customer có thể xuất hiện như stakeholder nhận invoice, không phải actor đăng nhập vận hành hệ thống.

### 6.5. MedicineBatch và inventory

**MedicineBatch** là source of truth cho tồn kho.

Không dùng aggregate inventory làm source of truth.

MedicineBatch cần lưu tối thiểu:

1. `id`.
2. `medicine_id`.
3. `batch_number`.
4. `normalized_batch_number`.
5. `expiry_date`.
6. `quantity_received`.
7. `quantity_remaining`.
8. `import_price`.
9. `created_at`.
10. `updated_at`.

Inventory Summary có thể được tính từ MedicineBatch, nhưng dữ liệu tồn kho gốc vẫn là MedicineBatch.

Các nguyên tắc chính:

1. Batch hết hạn không được tính vào sellable stock.
2. Low-stock tính từ sellable quantity.
3. Inventory Adjustment phải điều chỉnh theo MedicineBatch.
4. Không được sửa trực tiếp quantity ngoài workflow chính thức.
5. Cần truy vết batch đã được dùng trong order thông qua order item batch allocation.

### 6.6. FEFO

Checkout phải áp dụng **FEFO**.

FEFO nghĩa là:

1. First Expired, First Out.
2. Batch có hạn dùng gần nhất được xuất trước.
3. Batch đã hết hạn không được bán.
4. Nếu một order item cần số lượng lớn hơn một batch còn lại, hệ thống có thể phân bổ qua nhiều batch theo thứ tự FEFO.
5. Mọi phân bổ batch phải được lưu lại để truy vết thuốc bán ra lấy từ batch nào.

FEFO là business rule bắt buộc trong MVP.

### 6.7. Stock Import

Stock Import là MVP.

Trạng thái chính thức của Stock Import gồm:

1. DRAFT.
2. CONFIRMED.
3. CANCELLED.

Nguyên tắc baseline:

1. DRAFT có thể chỉnh sửa.
2. CONFIRMED không được chỉnh sửa tự do.
3. CONFIRMED không được confirm lần hai.
4. Confirm Stock Import mới cập nhật hoặc tạo MedicineBatch.
5. Detail phải có batch number và expiry date.
6. Import quantity phải lớn hơn 0.
7. Cần audit khi confirm hoặc cancel.

### 6.8. Inventory Adjustment

Inventory Adjustment là MVP.

Warehouse có thể tạo và confirm Inventory Adjustment mà không cần Admin approval trước.

Tuy nhiên, bắt buộc phải có:

1. Reason.
2. Audit log.
3. Adjustment theo MedicineBatch.
4. Kiểm tra không làm `quantity_remaining` âm.
5. Truy vết người tạo và người confirm.

Không được sửa trực tiếp số lượng tồn kho để thay thế Inventory Adjustment.

### 6.9. Order và POS

Order status MVP gồm:

1. DRAFT.
2. PAID.
3. CANCELLED.

Không dùng các trạng thái sau trong MVP nếu chưa có quyết định mới:

1. READY_FOR_CHECKOUT.
2. PENDING.
3. SHIPPING.
4. COMPLETED.

Staff được cancel DRAFT order trong ownership scope của mình.

Admin được cancel mọi DRAFT order.

PAID order không được trực tiếp sửa hoặc cancel.

Refund và return nằm ngoài MVP.

### 6.10. Checkout

Checkout là command nghiệp vụ chính thức để hoàn tất đơn hàng.

Checkout phải chạy trong transaction và xử lý tối thiểu:

1. Lock order.
2. Kiểm tra order status là DRAFT.
3. Kiểm tra order có item hợp lệ.
4. Tính lại total từ server.
5. Kiểm tra tồn kho bán được.
6. Kiểm tra HIGH InteractionAlert đã có acknowledgement và consultation note.
7. Áp dụng FEFO.
8. Tạo order item batch allocations.
9. Trừ `MedicineBatch.quantity_remaining`.
10. Tạo payment attempt.
11. Mark order thành PAID nếu payment success.
12. Tạo invoice.
13. Ghi audit log.
14. Hỗ trợ idempotency.
15. Rollback nếu validation quan trọng thất bại.

Không dùng các command public rời rạc để hoàn tất đơn thay cho Checkout transaction.

### 6.11. Payment và Invoice

Payment MVP là mô phỏng, không tích hợp cổng thanh toán thật.

Payment status MVP:

1. SUCCESS.
2. FAILED.

Quy tắc payment:

1. Mỗi order chỉ có tối đa một successful payment.
2. Failed payment attempts có thể lưu lại để audit.
3. Cash payment cần `amount_tendered` và `change_amount`.
4. Simulated bank transfer cần `transaction_reference`.
5. Không có real bank integration trong MVP.
6. Refund nằm ngoài MVP.

Invoice được tạo sau successful payment và nằm trong cùng Checkout transaction.

Mỗi PAID order có một invoice.

### 6.12. DrugInteraction Rule

DrugInteraction Rule chính thức được định nghĩa ở cấp:

* ActiveIngredient–ActiveIngredient

Không dùng Medicine–Medicine interaction rule làm rule chính thức.

Severity MVP gồm:

1. LOW.
2. MEDIUM.
3. HIGH.

Không dùng CRITICAL trong MVP.

Rule phải có trạng thái active/inactive để không xóa cứng dữ liệu đã có lịch sử.

### 6.13. InteractionAlert

InteractionAlert phải được persist cho mọi cảnh báo đã hiển thị.

Quy tắc chính thức:

1. Một cặp `order_id + interaction_id` chỉ có một active InteractionAlert.
2. Nếu alert hiển thị lại, cập nhật `last_displayed_at` và tăng `display_count`.
3. Nếu thuốc bị xóa khỏi Draft Order và interaction không còn, alert chuyển inactive.
4. Không xóa lịch sử alert.
5. HIGH alert bắt buộc acknowledgement trước checkout.
6. HIGH alert bắt buộc consultation note trước checkout.
7. Admin có màn hình xem InteractionAlert History.
8. Warehouse không có quyền truy cập interaction alerts trong MVP.

### 6.14. AI Copilot

AI Copilot là MVP technical differentiator.

AI Copilot hỗ trợ:

1. Giải thích cảnh báo tương tác thuốc.
2. Tạo consultation note draft.
3. Hỗ trợ Staff trong POS flow.
4. Tạo nội dung tham khảo trong phạm vi an toàn.

AI Copilot không được:

1. Chẩn đoán bệnh.
2. Kê đơn thuốc.
3. Đưa liều dùng cụ thể.
4. Thay thế dược sĩ, bác sĩ hoặc chuyên gia y tế.
5. Tự động lưu note chính thức nếu Staff chưa xác nhận.

### 6.15. AI Guardrail và AI Audit

AI Guardrail là MVP.

AI Guardrail gồm:

1. Input guardrail.
2. Output guardrail.
3. Structured output/schema validation.
4. Safe refusal response.
5. PII minimization/redaction.
6. Timeout/fallback/circuit-breaker handling.
7. Audit log cho guardrail status.

AI Audit Log là MVP.

AI Audit Log không được lưu raw PII. Log chỉ lưu metadata, summary đã tối thiểu hóa và thông tin phục vụ truy vết kỹ thuật.

### 6.16. Graph Sync và Graph-RAG

Graph Sync là MVP bắt buộc.

Graph Sync phải có:

1. Outbox.
2. Worker.
3. Retry.
4. Audit/log.
5. Freshness detection.

Graph Sync cover tối thiểu:

1. Medicine.
2. ActiveIngredient.
3. Medicine–ActiveIngredient mapping.
4. DrugInteraction rules.

Graph-RAG là module riêng, không gộp mơ hồ vào AI Copilot.

Nếu Neo4j unavailable hoặc graph stale:

1. Interaction explanation fallback sang PostgreSQL authoritative context.
2. Response cần thể hiện graph không được dùng.
3. Response có degraded/freshness indicator phù hợp.

Pure graph queries không có relational fallback thì trả safe error.

### 6.17. Reports

MVP có ba nhóm báo cáo cơ bản:

1. Revenue Report.
2. Top Medicines Report.
3. Inventory Report.

Reports phải deterministic và không phụ thuộc AI.

AI-generated business report narrative là Should-have, không phải điều kiện bắt buộc cho MVP.

### 6.18. System Settings

System Settings MVP gồm màn hình Admin đơn giản để cấu hình:

1. Near-expiry threshold.
2. Giá trị mặc định: 90 ngày.

Generic System Audit Log UI là Should-have, nhưng backend audit logging vẫn là bắt buộc ở các nghiệp vụ quan trọng.

---

## 7. MVP Summary

MVP là phạm vi bắt buộc để sản phẩm được xem là đạt baseline hiện tại.

MVP không chỉ gồm CRUD thuốc, bán hàng và báo cáo cơ bản. MVP của PharmaAssist AI Intelligence bao gồm các nghiệp vụ an toàn, traceability, AI safety và graph intelligence.

### 7.1. Identity & Access

MVP gồm:

1. Supabase Auth.
2. User profile trong PostgreSQL.
3. Multi-role RBAC.
4. Roles.
5. Permissions.
6. User roles.
7. Role permissions.
8. Permission-based authorization.
9. Ownership-based access cho Staff.
10. First-login password-change flow cho selected demo user nếu cần demo.

### 7.2. Medicine & ActiveIngredient

MVP gồm:

1. Medicine Management.
2. ActiveIngredient Management.
3. Medicine–ActiveIngredient mapping.
4. Medicine active/inactive status.
5. Selling price hợp lệ.
6. ActiveIngredient làm nền cho DrugInteraction Rule.

### 7.3. Supplier

MVP gồm:

1. Xem supplier.
2. Tạo supplier.
3. Cập nhật supplier.
4. Deactivate supplier bởi Admin.
5. Supplier liên quan đến Stock Import.
6. Audit các thay đổi quan trọng nếu cần.

### 7.4. MedicineBatch & Inventory

MVP gồm:

1. MedicineBatch là source of truth cho tồn kho.
2. Batch number.
3. Normalized batch number.
4. Expiry date.
5. Quantity received.
6. Quantity remaining.
7. Import price.
8. Sellable stock được tính từ batch còn hạn.
9. Inventory Summary tổng hợp từ MedicineBatch.
10. Batch Detail để xem chi tiết batch.

### 7.5. Stock Import

MVP gồm:

1. Tạo Stock Import.
2. Stock Import status: DRAFT, CONFIRMED, CANCELLED.
3. Draft import có thể chỉnh sửa.
4. Confirm import mới cập nhật MedicineBatch.
5. Confirmed import không được confirm lại.
6. Detail cần batch number và expiry date.
7. Confirm/cancel cần audit log.

### 7.6. Inventory Adjustment

MVP gồm:

1. Tạo Inventory Adjustment.
2. Confirm Inventory Adjustment.
3. Warehouse được tạo và confirm mà không cần Admin approval trước.
4. Reason bắt buộc.
5. Audit log bắt buộc.
6. Adjustment theo MedicineBatch.
7. Không được làm quantity_remaining âm.
8. Confirmed adjustment không được sửa trực tiếp.

### 7.7. POS & Sales

MVP gồm:

1. Staff tạo Draft Order.
2. Staff thêm thuốc vào order.
3. Staff cập nhật số lượng thuốc trong Draft Order.
4. Staff xóa thuốc khỏi Draft Order.
5. POS hiển thị sellable stock.
6. POS hiển thị sale-relevant availability warnings.
7. Hỗ trợ khách lẻ với `customer_id = null`.
8. Staff cancel Draft Order trong ownership scope.
9. Admin cancel mọi Draft Order.
10. Admin xem toàn bộ order.
11. Staff chỉ xem order mình tạo hoặc xử lý.

### 7.8. Checkout

MVP gồm:

1. Transactional checkout command.
2. Lock order.
3. Verify order status là DRAFT.
4. Verify stock availability.
5. Verify HIGH InteractionAlert đã có acknowledgement và consultation note.
6. Apply FEFO.
7. Create order item batch allocations.
8. Deduct MedicineBatch quantity.
9. Create payment attempt.
10. Mark order as PAID nếu payment success.
11. Create invoice.
12. Record audit.
13. Support idempotency.
14. Giữ Draft Order khi checkout validation thất bại.

### 7.9. Payment & Invoice

MVP gồm:

1. Payment simulation.
2. Payment status: SUCCESS, FAILED.
3. Mỗi order có tối đa một successful payment.
4. Failed payment attempts có thể lưu.
5. Cash payment có `amount_tendered`.
6. Cash payment có `change_amount`.
7. Simulated bank transfer có `transaction_reference`.
8. Invoice tạo sau successful payment.
9. Invoice tạo trong cùng Checkout transaction.
10. Mỗi PAID order có một invoice.

### 7.10. DrugInteraction & InteractionAlert

MVP gồm:

1. DrugInteraction Rule ở cấp ActiveIngredient–ActiveIngredient.
2. Severity: LOW, MEDIUM, HIGH.
3. Admin quản lý interaction rules.
4. Persist mọi InteractionAlert đã hiển thị.
5. Một `order_id + interaction_id` chỉ có một active alert.
6. Alert hiển thị lại thì tăng display count.
7. Alert không còn áp dụng thì chuyển inactive, không xóa lịch sử.
8. HIGH alert bắt buộc acknowledgement.
9. HIGH alert bắt buộc consultation note.
10. HIGH alert phải hoàn tất trước checkout.
11. Admin có InteractionAlert History.
12. Warehouse không truy cập interaction alerts trong MVP.

### 7.11. AI

MVP gồm:

1. Google AI Provider.
2. MockAI fallback.
3. AI Copilot giải thích cảnh báo tương tác thuốc.
4. AI Copilot tạo consultation note draft.
5. AI Guardrail.
6. AI Audit Log.
7. Prompt template versioning.
8. Provider/model configurable ở backend.
9. PII minimization/redaction.
10. Safe refusal khi input/output vượt phạm vi.

### 7.12. Graph

MVP gồm:

1. Neo4j graph projection.
2. Core graph gồm Medicine, ActiveIngredient, CONTAINS và INTERACTS_WITH.
3. Graph Sync.
4. Graph Sync Outbox.
5. Worker.
6. Retry.
7. Audit/log.
8. Freshness detection.
9. Graph-RAG module riêng.
10. PostgreSQL fallback cho interaction explanation khi graph unavailable/stale.

### 7.13. Reports

MVP gồm:

1. Revenue Report.
2. Top Medicines Report.
3. Inventory Report.

### 7.14. Data, Demo và Setup

MVP gồm:

1. Curated operational seed.
2. Demo users.
3. Demo medicines.
4. Demo active ingredients.
5. Demo batches.
6. Demo orders.
7. Demo interaction rules.
8. Demo AI/Graph data đủ để trình bày.
9. Local demo reset workflow.
10. Smoke test sau demo reset.

---

## 8. Should-have Summary

Should-have là nhóm chức năng nên có nếu còn thời gian, nhưng không chặn MVP.

Should-have gồm:

1. Full Customer Management.
2. Customer purchase history nâng cao.
3. Admin Graph Sync Status/retry screen.
4. Generic System Audit Log UI.
5. Admin prompt editing UI.
6. Admin AI provider/model configuration UI.
7. AI-generated business report narrative.
8. Advanced dashboard charts.
9. Một số UI/UX nâng cao.
10. Notification.
11. Supabase Storage nếu cần lưu file.
12. Supabase Realtime nếu có nhu cầu hiển thị realtime.
13. Reorder suggestion nếu còn thời gian.
14. Forecast tồn kho nếu còn thời gian.
15. Các báo cáo nâng cao ngoài revenue, top medicines và inventory.
16. Graph visualization nâng cao nếu không ảnh hưởng MVP.

Should-have không được dùng làm điều kiện chặn MVP completion.

---

## 9. Future / Commercial Expansion Summary

Future / Commercial Expansion là nhóm mở rộng sau MVP hoặc khi phát triển thành sản phẩm thương mại.

Future / Commercial Expansion gồm:

1. Online commerce.
2. Product catalog thương mại đầy đủ.
3. Product variants làm core commerce.
4. Cart.
5. Wishlist.
6. Shipping.
7. Coupon.
8. Review.
9. CMS.
10. Customer portal.
11. Multi-store.
12. Multi-warehouse.
13. Stock transfer.
14. Purchase order workflow đầy đủ.
15. Supplier contract management.
16. Refund.
17. Return.
18. Credit note.
19. Invoice reversal.
20. Real bank integration.
21. Payment gateway production.
22. Advanced analytics.
23. Reorder suggestions nâng cao.
24. Forecast tồn kho nâng cao.
25. AI Cache.
26. DrugGroup taxonomy nếu có nguồn authoritative.
27. Symptom/Condition/RedFlag/Recommendation graph enrichment.
28. TREATS_SYMPTOM.
29. CAUTION_WITH.
30. CRITICAL interaction severity.
31. Full mobile support.
32. Full cross-browser testing.
33. Commercial-scale 100-table database implementation.

---

## 10. Out of Scope Summary

Out of Scope là các nội dung không làm trong phạm vi hiện tại.

Out of Scope gồm:

1. AI chẩn đoán bệnh.
2. AI kê đơn thuốc.
3. AI đưa liều dùng cụ thể.
4. AI thay thế dược sĩ, bác sĩ hoặc chuyên gia y tế.
5. Real patient medical record.
6. Lưu raw PII trong AI Audit Log.
7. Real bank integration.
8. Refund workflow trong MVP.
9. Product return trong MVP.
10. Online shopping checkout trong MVP.
11. Customer portal trong MVP.
12. Multi-store operation trong MVP.
13. Multi-warehouse stock transfer trong MVP.
14. Full 100-table schema như yêu cầu bắt buộc MVP.
15. MockAI-only làm bằng chứng hoàn thành MVP AI.
16. MockGraph-only làm bằng chứng hoàn thành MVP Graph.
17. Aggregate inventory làm source of truth.
18. Medicine-level interaction rule làm official rule.
19. Dùng toàn bộ scraped ingredients làm active ingredients chính thức.
20. Seed price = 0 thành selling_price.
21. Bán thuốc từ batch hết hạn.
22. Checkout bỏ qua FEFO.
23. Checkout bỏ qua HIGH alert acknowledgement hoặc consultation note.
24. Chạy destructive test trên demo/staging/production database.
25. Demo reset ở môi trường không phải local.
26. Raw Cypher access cho Staff.
27. Warehouse truy cập InteractionAlert hoặc Graph Explorer trong MVP.

---

## 11. Vai trò người dùng chính

### 11.1. Admin

Admin là người quản trị hệ thống.

Admin có phạm vi quyền rộng nhất, bao gồm:

1. Quản lý user, role và permission.
2. Quản lý Medicine.
3. Quản lý ActiveIngredient.
4. Quản lý Supplier, bao gồm deactivate.
5. Xem và quản lý inventory.
6. Tạo và xác nhận Inventory Adjustment.
7. Quản lý DrugInteraction Rule.
8. Xem InteractionAlert History.
9. Xem tất cả Order.
10. Thực hiện các nghiệp vụ sales như Staff.
11. Checkout.
12. Xem Payment và Invoice.
13. Xem reports.
14. Xem AI Audit Log.
15. Xem Graph Explorer.
16. Dùng Graph-RAG.
17. Thay đổi near-expiry threshold.
18. Xem Graph Sync Status nếu UI được triển khai.

### 11.2. Staff

Staff là nhân viên bán thuốc tại quầy.

Staff có thể:

1. Tìm và xem Medicine.
2. Xem sellable stock trong POS.
3. Tạo Draft Order.
4. Sửa Draft Order thuộc ownership scope.
5. Cancel Draft Order thuộc ownership scope.
6. Thêm thuốc vào order.
7. Xem interaction alerts trong order.
8. Acknowledge HIGH alert.
9. Nhập consultation note cho HIGH alert.
10. Dùng AI Copilot trong POS flow.
11. Checkout nếu validation passed.
12. Xem order do mình tạo hoặc xử lý.
13. Xem payment/invoice thuộc ownership scope.
14. Dùng Graph-RAG trong phạm vi được cấp quyền nếu có.

Staff không được:

1. Quản lý user.
2. Quản lý Supplier.
3. Deactivate Supplier.
4. Quản lý Interaction Rule.
5. Xem InteractionAlert History toàn hệ thống.
6. Xem AI Audit Log.
7. Xem báo cáo doanh thu toàn hệ thống nếu chưa được cấp quyền.
8. Gửi raw Cypher.
9. Quản lý Graph Sync.

### 11.3. Warehouse

Warehouse là nhân viên kho.

Warehouse có thể:

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

1. Deactivate Supplier.
2. Tạo Order.
3. Checkout.
4. Xem Payment.
5. Xem Invoice.
6. Xem InteractionAlert.
7. Quản lý Interaction Rule.
8. Xem Graph Explorer trong MVP.
9. Dùng Graph-RAG trong MVP.
10. Xem báo cáo doanh thu nếu chưa được cấp quyền.

### 11.4. Customer / Khách lẻ

Customer không phải authenticated user trong MVP.

Trong MVP, Customer chủ yếu là:

1. Khách mua thuốc tại quầy.
2. Người nhận invoice.
3. Stakeholder ngoài hệ thống.

POS phải hỗ trợ khách lẻ thông qua `customer_id = null`.

### 11.5. External Services

External services gồm:

1. Supabase Auth.
2. Supabase PostgreSQL.
3. Google AI Provider.
4. MockAI.
5. Neo4j.
6. Có thể có email service nếu cần cho flow tài khoản.

External services không phải user role trong hệ thống.

---

## 12. Database Baseline Tổng Quan

Database chính thức của hệ thống là PostgreSQL.

PostgreSQL là source of truth cho toàn bộ dữ liệu nghiệp vụ.

### 12.1. Nhóm Identity & Access

Gồm các dữ liệu:

1. User profile.
2. Roles.
3. Permissions.
4. User roles.
5. Role permissions.
6. User status.
7. First-login password-change status.

Supabase Auth quản lý email/password/session/token. PostgreSQL không lưu password/password_hash.

### 12.2. Nhóm Medicine & Catalog Core

Gồm các dữ liệu:

1. Medicine.
2. Medicine Category nếu dùng trong MVP.
3. ActiveIngredient.
4. Medicine–ActiveIngredient mapping.
5. Supplier.

Medicine và ActiveIngredient là core nghiệp vụ MVP.

### 12.3. Nhóm Inventory

Gồm các dữ liệu:

1. MedicineBatch.
2. Stock Import.
3. Stock Import Detail.
4. Inventory Adjustment.
5. Inventory Adjustment Detail.
6. Order Item Batch Allocation.
7. Có thể có StockMovement nếu nhóm chọn bổ sung, nhưng không bắt buộc MVP.

MedicineBatch là source of truth cho inventory.

### 12.4. Nhóm Sales

Gồm các dữ liệu:

1. Order.
2. Order Item.
3. Payment.
4. Invoice.
5. Invoice Item nếu cần snapshot chi tiết.
6. Idempotency Record.

Checkout transaction là command nghiệp vụ chính để hoàn tất bán hàng.

### 12.5. Nhóm Interaction

Gồm các dữ liệu:

1. DrugInteraction Rule.
2. InteractionAlert.
3. Consultation Session nếu dùng để gom ngữ cảnh AI/consultation.
4. Consultation note nằm trên InteractionAlert đối với HIGH alert.

DrugInteraction Rule là ActiveIngredient-level.

### 12.6. Nhóm AI

Gồm các dữ liệu:

1. Prompt Template.
2. Prompt version.
3. AI Audit Log.
4. Provider/model configuration nếu dùng database configuration.
5. Guardrail status metadata.

AI Audit Log không lưu raw PII.

### 12.7. Nhóm Graph

Gồm các dữ liệu:

1. Graph Sync Outbox.
2. Graph Sync Attempt hoặc Graph Sync Log.
3. Source version tracking.
4. Sync status.
5. Freshness metadata.

Neo4j không phải source of truth.

### 12.8. Nhóm Settings và Audit

Gồm các dữ liệu:

1. System Settings.
2. Near-expiry threshold.
3. Audit Logs.
4. Operational logs nếu cần.

Backend audit logging là bắt buộc ở các nghiệp vụ quan trọng, kể cả khi Generic System Audit Log UI chỉ là Should-have.

---

## 13. Data Baseline Tổng Quan

### 13.1. Vai trò của real catalog data

Nhóm dữ liệu thật/catalog data đã được phân tích và có giá trị tham khảo.

Tuy nhiên, real catalog data không phải operational seed hoàn chỉnh cho MVP.

Real catalog data có thể dùng để:

1. Tham khảo tên thuốc.
2. Tham khảo danh mục.
3. Tham khảo manufacturer/brand.
4. Tham khảo dosage form/unit.
5. Tham khảo product information.
6. Hỗ trợ tạo curated seed.

Không được dùng real catalog data một cách máy móc để tạo toàn bộ dữ liệu vận hành MVP.

### 13.2. Curated operational seed

MVP cần curated operational seed riêng.

Seed này phải đủ để demo:

1. Đăng nhập bằng các role chính.
2. Medicine Management.
3. ActiveIngredient mapping.
4. Supplier.
5. MedicineBatch.
6. Stock Import.
7. FEFO.
8. Inventory Adjustment.
9. POS Draft Order.
10. Interaction checking.
11. HIGH alert acknowledgement.
12. HIGH alert consultation note.
13. Checkout transaction.
14. Payment simulation.
15. Invoice.
16. Revenue Report.
17. Top Medicines Report.
18. Inventory Report.
19. AI Copilot.
20. AI Guardrail.
21. AI Audit.
22. Neo4j projection.
23. Graph Sync.
24. Graph-RAG.

### 13.3. Demo users

Demo users cần tối thiểu:

1. Admin account.
2. Staff account.
3. Warehouse account.
4. Có thể có new-staff account với `must_change_password = true` để demo first-login flow.

Demo accounts chính có thể có `must_change_password = false` để demo nhanh.

### 13.4. Demo inventory

Demo inventory phải được tái tạo từ authoritative transactions, không chèn aggregate inventory như nguồn gốc chính.

Demo state nên được tạo từ:

1. Confirmed Stock Imports.
2. Sale batch allocations.
3. Inventory Adjustments.

Demo phải có ít nhất một FEFO scenario nhiều batch, bao gồm:

1. Batch hết hạn bị loại khỏi sellable stock.
2. Batch gần hết hạn được ưu tiên trước.
3. Order item có thể được phân bổ qua nhiều batch.

### 13.5. Demo interaction

Demo interaction cần có:

1. ActiveIngredient data đã curated.
2. Medicine–ActiveIngredient mapping.
3. DrugInteraction Rule ở cấp ActiveIngredient.
4. Ít nhất một LOW/MEDIUM interaction.
5. Ít nhất một HIGH interaction.
6. InteractionAlert được persist.
7. HIGH alert có acknowledgement.
8. HIGH alert có consultation note.
9. Một PAID order có HIGH alert đã xử lý hợp lệ để demo history.

### 13.6. Demo graph

Demo graph phải được tạo từ PostgreSQL thông qua Graph Sync hoặc projection rebuild.

Không dùng standalone Cypher seed làm nguồn chính thức cho MVP demo, trừ khi phục vụ development hoặc isolated graph test.

### 13.7. Demo reset

Demo reset phải là workflow có thể tái tạo.

Nguyên tắc:

1. Chỉ chạy ở local environment.
2. Không chạy destructive reset ở demo/staging/production.
3. Reset PostgreSQL data.
4. Provision hoặc verify Supabase demo users.
5. Rebuild Neo4j projection.
6. Check graph freshness.
7. Run smoke tests.
8. Tạo trạng thái demo nhất quán.

---

## 14. Jira / Testing / Demo Baseline Tổng Quan

### 14.1. Jira baseline

Jira là source of truth cho:

1. Epics.
2. Stories.
3. Tasks.
4. Sprint.
5. Issue status.

GitHub dùng cho:

1. Source code.
2. Pull requests.
3. CI.
4. Commit history.
5. Link commit/PR về Jira issue key.

Bộ Jira hiện có cần major revision theo baseline mới.

Các nội dung Jira cần sửa gồm:

1. Auth phải chuyển sang Supabase Auth.
2. Inventory phải dùng MedicineBatch.
3. AI/Graph không được xem là optional/mock-only.
4. Payment/Invoice phải nằm trong Checkout transaction.
5. Interaction rule phải ở cấp ActiveIngredient.
6. InteractionAlert phải có HIGH acknowledgement và consultation note.
7. Customer Management phải là Should-have, không phải MVP blocker.
8. Reports phải có Revenue, Top Medicines và Inventory.
9. Near-expiry threshold phải mặc định 90 ngày và configurable.
10. Jira cần phản ánh đúng MVP/Should-have/Future/Out of Scope.

### 14.2. Branch baseline

Branch model chính thức:

1. `main`: release/demo-ready code.
2. `develop`: integrated upcoming-release work.
3. Short-lived feature/bugfix/docs branches.
4. Merge vào `main` chỉ thông qua reviewed release PR từ `develop` sau khi quality gates pass.

Branch naming nên gắn với Jira issue key để trace commit/PR về Jira.

### 14.3. CI baseline

Minimum CI quality gate gồm:

1. Lint.
2. Type check.
3. Unit tests.
4. Integration tests.
5. Prisma validation.
6. Migration check.
7. Frontend build.
8. Backend build.

Merges vào `develop` và `main` phải yêu cầu các checks này pass.

### 14.4. Testing baseline

Automated testing toolchain chưa finalized, nhưng recommended stack gồm:

1. Jest cho backend unit/integration tests.
2. Jest + Supertest cho API integration.
3. React Testing Library cho frontend components.
4. Playwright cho end-to-end tests.
5. Postman cho manual API collections.

Không có database riêng bắt buộc cho automated test. Vì vậy integration tests phải có strict isolation và cleanup ở môi trường local/non-demo phù hợp.

Không chạy destructive tests trên demo database.

High-risk modules nên được ưu tiên test:

1. Checkout.
2. FEFO.
3. Interaction.
4. AI Guardrail.

### 14.5. Demo baseline

Demo phải chứng minh được:

1. Supabase Auth.
2. Role-based access.
3. Medicine và ActiveIngredient.
4. Supplier.
5. MedicineBatch.
6. FEFO.
7. Stock Import.
8. Inventory Adjustment.
9. POS Draft Order.
10. Interaction checking.
11. HIGH alert acknowledgement.
12. HIGH alert consultation note.
13. AI Copilot.
14. AI Guardrail.
15. AI Audit.
16. Checkout transaction.
17. Payment simulation.
18. Invoice.
19. Reports.
20. Neo4j graph projection.
21. Graph Sync.
22. Graph-RAG.
23. Demo reset reproducible.

Backup screenshots, Postman collections hoặc optional video có thể giữ làm contingency evidence, nhưng không thay thế running product.

---

## 15. Các quyết định tuyệt đối không quay lại

Các quyết định sau đã bị thay thế và không được dùng làm baseline chính thức:

### 15.1. Authentication cũ

Không quay lại:

1. Custom username/password/JWT auth.
2. Lưu password trong PostgreSQL.
3. Lưu password_hash trong PostgreSQL.
4. Dùng JWT_SECRET custom làm cơ chế auth chính.
5. Tin role/permission từ frontend gửi lên.

Baseline hiện tại:

1. Supabase Auth quản lý authentication.
2. PostgreSQL lưu user_profiles và authorization data.
3. Backend xác minh Supabase access token.
4. Backend tự load roles/permissions từ PostgreSQL.

### 15.2. Inventory cũ

Không quay lại:

1. Aggregate inventory làm source of truth.
2. Sửa trực tiếp quantity trong inventory.
3. Tồn kho chỉ có một expiry date trên Medicine.
4. Bỏ MedicineBatch.
5. Bỏ batch allocation.
6. Bán từ batch hết hạn.
7. Low-stock tính cả batch hết hạn.

Baseline hiện tại:

1. MedicineBatch là source of truth.
2. Inventory Summary tính từ MedicineBatch.
3. FEFO bắt buộc trong checkout.
4. Batch hết hạn không tính vào sellable stock.
5. Order item batch allocation bắt buộc để traceability.

### 15.3. Interaction cũ

Không quay lại:

1. Medicine-level interaction rule làm official rule.
2. InteractionAlert optional.
3. HIGH alert chỉ advisory.
4. Checkout bỏ qua HIGH alert.
5. Không lưu alert đã hiển thị.
6. Không có acknowledgement.
7. Không có consultation note.
8. Dùng CRITICAL severity trong MVP nếu chưa chốt.

Baseline hiện tại:

1. DrugInteraction Rule ở cấp ActiveIngredient–ActiveIngredient.
2. InteractionAlert phải persist.
3. HIGH alert bắt buộc acknowledgement và consultation note.
4. Checkout phải kiểm tra HIGH alert trước khi hoàn tất.
5. Severity MVP chỉ gồm LOW, MEDIUM, HIGH.

### 15.4. Sales/Checkout cũ

Không quay lại:

1. Tách payment/invoice khỏi checkout transaction.
2. Dùng public command rời rạc để hoàn tất order thay Checkout.
3. Checkout không transaction.
4. Checkout không idempotency.
5. Checkout không lock order.
6. Checkout không apply FEFO.
7. Checkout không rollback khi validation quan trọng thất bại.
8. PAID order được sửa hoặc cancel trực tiếp.

Baseline hiện tại:

1. Checkout là command nghiệp vụ chính thức.
2. Checkout chạy trong transaction.
3. Checkout xử lý order, stock, FEFO, payment, invoice và audit.
4. Checkout hỗ trợ idempotency.
5. PAID order immutable trong MVP.

### 15.5. AI/Graph cũ

Không quay lại:

1. MockAI-only làm MVP.
2. MockGraph-only làm MVP.
3. AI không có guardrail.
4. AI không có audit.
5. AI được chẩn đoán, kê đơn hoặc đưa liều dùng.
6. Gộp Graph-RAG mơ hồ vào AI Copilot.
7. Neo4j làm source of truth.
8. Graph Sync không có outbox/retry/audit/freshness detection.
9. Stale graph data được dùng mà không cảnh báo.

Baseline hiện tại:

1. Google AI Provider là provider ưu tiên.
2. MockAI là fallback.
3. AI Guardrail là MVP.
4. AI Audit là MVP.
5. Neo4j là graph projection.
6. Graph Sync là MVP.
7. Graph-RAG là module riêng.
8. PostgreSQL fallback khi graph stale/unavailable cho interaction explanation.

### 15.6. Scope/Data cũ

Không quay lại:

1. Full Customer Management là MVP blocker.
2. Full 100-table schema là schema bắt buộc MVP.
3. Dùng toàn bộ scraped ingredients làm active ingredients chính thức.
4. Seed price = 0 thành selling_price.
5. Real catalog data là operational seed hoàn chỉnh.
6. Online commerce là MVP.
7. Multi-store/multi-warehouse là MVP.
8. Refund/return là MVP.

Baseline hiện tại:

1. Customer Management là Should-have.
2. 100-table database là extended/commercial design.
3. MVP dùng core subset.
4. Real catalog data là reference.
5. MVP cần curated operational seed riêng.
6. Online commerce và multi-warehouse là Future / Commercial Expansion.
7. Refund/return nằm ngoài MVP.

---

## 16. Unresolved Decisions Summary

Các điểm dưới đây chưa nên tự động finalized trong Document 01. Chúng cần được giữ là unresolved hoặc implementation decision cho các tài liệu sau.

### 16.1. Testing toolchain chính thức

Recommended stack hiện tại:

1. Jest cho backend.
2. Jest + Supertest cho API integration.
3. React Testing Library cho frontend.
4. Playwright cho E2E.
5. Postman cho manual API collections.

Tuy nhiên, đây vẫn là recommended stack, chưa phải quyết định finalized tuyệt đối nếu nhóm chưa xác nhận triển khai.

### 16.2. Dedicated demo/staging environment

Chưa finalized việc có dedicated demo/staging environment riêng hay không.

Recommended default:

1. Có môi trường demo/staging riêng nếu đủ thời gian.
2. Tách khỏi local development.
3. Có Supabase, Neo4j, AI config và demo data riêng.
4. Không chạy demo reset destructive ở môi trường này.

### 16.3. Release/Demo Owner và backup

Chưa có tên cụ thể cho:

1. Release/Demo Owner.
2. Backup owner.

Document 19 phải assign rõ trước release freeze.

### 16.4. Exact team capacity

Team size chính thức là 4 thành viên.

Tuy nhiên, exact weekly/hourly capacity per member chưa được chỉ định. Sprint commitment phải dùng explicit task-hour estimates và named ownership thay vì giả định mọi người có capacity bằng nhau.

### 16.5. Admin UI cho AI provider/model configuration

Backend provider/model configuration là bắt buộc.

Admin UI cho provider/model configuration là Should-have, không bắt buộc MVP.

### 16.6. Prompt editing UI

Prompt templates có version và seed official prompts là MVP.

Admin prompt editing UI là Should-have.

### 16.7. Graph Sync Status/retry UI

Graph Sync backend, outbox, worker, retry, audit và freshness detection là MVP.

Admin Graph Sync Status/retry screen là Should-have.

### 16.8. Generic System Audit Log UI

Backend audit logging là bắt buộc.

Generic System Audit Log UI là Should-have.

### 16.9. StockMovement

StockMovement được khuyến nghị cho traceability, nhưng không bắt buộc MVP.

Nếu không có StockMovement, truy vết kho phải đủ qua:

1. Stock Import Details.
2. Order Item Batch Allocations.
3. Inventory Adjustment Details.

### 16.10. Exact UI layout choices

Một số lựa chọn UI chi tiết như layout cuối cùng, table columns, interaction modal/panel detail, chart style và component behavior sẽ được quyết định trong Document 15.

Document 01 chỉ giữ baseline tổng quan.

---

## 17. Danh sách 20 tài liệu chính thức

Bộ consolidated documentation chính thức gồm 20 tài liệu:

| STT | File name                                    | Tên tài liệu                                          | Vai trò                                                                        |
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

## 18. Thứ tự xây dựng đề xuất

Không cần viết theo số thứ tự tuyệt đối từ 01 đến 20. Nên xây theo logic để tránh lệch baseline.

### Phase 1 — Chốt nền tảng

1. Document 01 — Project Overview & Current Baseline.
2. Document 04 — Decision Log & Scope Control.
3. Document 03 — Vision & Scope Document.
4. Document 02 — Project Charter.

### Phase 2 — Chốt yêu cầu

5. Document 05 — Business Requirements Document.
6. Document 06 — Software Requirements Specification.
7. Document 07 — User Roles, Permissions & Authorization Specification.
8. Document 08 — Use Case Specification.

### Phase 3 — Chốt thiết kế kỹ thuật

9. Document 13 — Database Design & ERD.
10. Document 14 — Prisma Schema & Migration Design.
11. Document 12 — API Specification.
12. Document 10 — System Architecture Document.
13. Document 11 — Module Design Document.
14. Document 09 — UML Diagram Package.

### Phase 4 — Chốt UI, AI, Graph, Data

15. Document 15 — UI/UX Screen Specification.
16. Document 16 — AI Architecture, Guardrail & Audit Design.
17. Document 17 — Knowledge Graph, Neo4j Sync & Graph-RAG Design.
18. Document 18 — Data Strategy, Catalog Reference & MVP Seed Plan.

### Phase 5 — Chốt quản lý, test và demo

19. Document 19 — Project Management, Jira & Release Plan.
20. Document 20 — Testing, Demo & Setup Guide.

Lý do Document 01 được viết đầu tiên:

1. Đây là tài liệu nền.
2. Các tài liệu sau đều phải bám baseline từ Document 01.
3. Document 01 giúp tránh quay lại thiết kế cũ.
4. Document 01 giúp phân biệt MVP, Should-have, Future và Out of Scope ở mức tổng quan.
5. Document 01 giúp người đọc hiểu định hướng trước khi đọc tài liệu chi tiết.

---

## 19. Quality Checklist cho Baseline

Checklist này dùng để kiểm tra mọi tài liệu sau có bám đúng baseline hay không.

### 19.1. Checklist công nghệ

| Câu hỏi kiểm tra                                 | Đạt khi |
| ------------------------------------------------ | ------- |
| Frontend có dùng Next.js không?                  | Có      |
| Backend có dùng NestJS / Node.js không?          | Có      |
| ORM có dùng Prisma không?                        | Có      |
| Authentication có dùng Supabase Auth không?      | Có      |
| PostgreSQL có là source of truth không?          | Có      |
| Neo4j có chỉ là graph projection không?          | Có      |
| Google AI Provider có là provider ưu tiên không? | Có      |
| MockAI có chỉ là fallback không?                 | Có      |

### 19.2. Checklist auth/authorization

| Câu hỏi kiểm tra                                           | Đạt khi |
| ---------------------------------------------------------- | ------- |
| Có loại bỏ custom username/password/JWT auth không?        | Có      |
| PostgreSQL có tránh lưu password/password_hash không?      | Có      |
| Có user_profiles liên kết Supabase Auth không?             | Có      |
| Có multi-role RBAC không?                                  | Có      |
| Có roles, permissions, user_roles, role_permissions không? | Có      |
| Có permission-based authorization không?                   | Có      |
| Có ownership-based access cho Staff không?                 | Có      |

### 19.3. Checklist inventory

| Câu hỏi kiểm tra                                                   | Đạt khi |
| ------------------------------------------------------------------ | ------- |
| MedicineBatch có là source of truth không?                         | Có      |
| Aggregate inventory có bị loại khỏi vai trò source of truth không? | Có      |
| Batch hết hạn có bị loại khỏi sellable stock không?                | Có      |
| Low-stock có tính từ sellable quantity không?                      | Có      |
| Stock Import có cập nhật batch khi confirm không?                  | Có      |
| Inventory Adjustment có reason và audit không?                     | Có      |
| Có chặn quantity_remaining âm không?                               | Có      |

### 19.4. Checklist sales/checkout

| Câu hỏi kiểm tra                                           | Đạt khi |
| ---------------------------------------------------------- | ------- |
| Order status MVP có giới hạn DRAFT, PAID, CANCELLED không? | Có      |
| Checkout có là command chính thức không?                   | Có      |
| Checkout có transaction không?                             | Có      |
| Checkout có idempotency không?                             | Có      |
| Checkout có lock order không?                              | Có      |
| Checkout có verify stock không?                            | Có      |
| Checkout có apply FEFO không?                              | Có      |
| Checkout có tạo batch allocation không?                    | Có      |
| Payment và invoice có nằm trong checkout flow không?       | Có      |
| PAID order có immutable không?                             | Có      |

### 19.5. Checklist interaction

| Câu hỏi kiểm tra                                                   | Đạt khi |
| ------------------------------------------------------------------ | ------- |
| Interaction rule có ở cấp ActiveIngredient–ActiveIngredient không? | Có      |
| Medicine-level rule có bị loại khỏi official baseline không?       | Có      |
| Severity MVP có chỉ gồm LOW, MEDIUM, HIGH không?                   | Có      |
| InteractionAlert có được persist không?                            | Có      |
| Có active uniqueness cho order_id + interaction_id không?          | Có      |
| HIGH alert có bắt buộc acknowledgement không?                      | Có      |
| HIGH alert có bắt buộc consultation note không?                    | Có      |
| Checkout có block khi HIGH alert chưa đủ xử lý không?              | Có      |

### 19.6. Checklist AI

| Câu hỏi kiểm tra                                                              | Đạt khi |
| ----------------------------------------------------------------------------- | ------- |
| AI Copilot có là MVP technical differentiator không?                          | Có      |
| Google AI Provider có được ưu tiên không?                                     | Có      |
| MockAI có chỉ là fallback không?                                              | Có      |
| AI Guardrail có là MVP không?                                                 | Có      |
| AI Audit có là MVP không?                                                     | Có      |
| AI có chặn diagnosis/prescribing/dosage không?                                | Có      |
| AI Audit có tránh raw PII không?                                              | Có      |
| Prompt template có version không?                                             | Có      |
| AI-generated draft có cần Staff xác nhận trước khi thành official note không? | Có      |

### 19.7. Checklist Graph

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

### 19.8. Checklist data/demo

| Câu hỏi kiểm tra                                                   | Đạt khi |
| ------------------------------------------------------------------ | ------- |
| Database 100 bảng có được xem là extended/commercial design không? | Có      |
| MVP có dùng core subset không?                                     | Có      |
| Real catalog data có chỉ là reference không?                       | Có      |
| Curated operational seed có được tạo riêng không?                  | Có      |
| Demo inventory có tái tạo từ transactions không?                   | Có      |
| Demo reset có chỉ chạy local không?                                | Có      |
| Smoke tests có chạy sau demo reset không?                          | Có      |

### 19.9. Checklist documentation

| Câu hỏi kiểm tra                                                                         | Đạt khi |
| ---------------------------------------------------------------------------------------- | ------- |
| Tên file có đúng convention không?                                                       | Có      |
| Nội dung chính có viết tiếng Việt không?                                                 | Có      |
| Thuật ngữ kỹ thuật có giữ đúng tiếng Anh cần thiết không?                                | Có      |
| Mỗi tài liệu có phân biệt MVP/Should-have/Future/Out of Scope nếu liên quan scope không? | Có      |
| Có traceability giữa các tài liệu không?                                                 | Có      |
| Có tránh lặp sai vai trò tài liệu không?                                                 | Có      |
| Có tránh quay lại quyết định cũ không?                                                   | Có      |

---

## 20. Kết luận

PharmaAssist AI Intelligence hiện đã chuyển từ giai đoạn phân tích tài liệu đầu vào sang giai đoạn xây dựng bộ consolidated documentation chính thức.

Baseline hiện tại xác định dự án là một hệ thống quản lý nhà thuốc có trọng tâm kỹ thuật và nghiệp vụ rõ ràng:

1. Frontend dùng Next.js.
2. Backend dùng NestJS / Node.js.
3. ORM dùng Prisma.
4. Authentication dùng Supabase Auth.
5. PostgreSQL là source of truth.
6. Neo4j là graph projection.
7. Graph Sync bắt buộc có outbox, worker, retry, audit và freshness detection.
8. Graph-RAG là module riêng.
9. Google AI Provider là provider ưu tiên.
10. MockAI chỉ là fallback.
11. MedicineBatch là source of truth cho inventory.
12. FEFO là nguyên tắc xuất kho trong checkout.
13. Checkout là transaction chính thức để hoàn tất order, payment và invoice.
14. Interaction rule ở cấp ActiveIngredient–ActiveIngredient.
15. InteractionAlert phải được persist.
16. HIGH alert bắt buộc acknowledgement và consultation note trước checkout.
17. AI Guardrail và AI Audit là MVP.
18. Database 100 bảng là extended/commercial design, không phải full MVP schema.
19. Real catalog data chỉ là reference data.
20. MVP cần curated operational seed riêng.
21. Jira hiện có cần major revision theo baseline mới.

Document 01 là tài liệu nền cho toàn bộ bộ tài liệu mới. Các tài liệu sau phải bám theo baseline này, đồng thời đi sâu hơn vào phần chuyên môn của từng tài liệu mà không làm thay đổi các quyết định đã được chốt.

Sau Document 01, thứ tự xử lý phù hợp là:

1. Chuẩn hóa Document 04 — Decision Log & Scope Control.
2. Chuẩn hóa Document 03 — Vision & Scope Document.
3. Viết Document 02 — Project Charter.
4. Chuyển sang Document 05 — Business Requirements Document.
5. Tiếp tục các tài liệu còn lại theo Documentation Blueprint.
