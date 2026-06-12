# Document 02 — Project Charter

# Tài liệu 02 — Tuyên bố khởi động dự án

---

## Metadata

| Mục               | Nội dung                                                                                                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID       | DOC-02                                                                                                                                                                                                  |
| File name         | `02_project_charter.md`                                                                                                                                                                                 |
| Document Name     | Project Charter                                                                                                                                                                                         |
| Tên tiếng Việt    | Tuyên bố khởi động dự án                                                                                                                                                                                |
| Project           | PharmaAssist AI Intelligence                                                                                                                                                                            |
| Version           | 1.0 Draft                                                                                                                                                                                               |
| Status            | Draft                                                                                                                                                                                                   |
| Created Date      | 08/06/2026                                                                                                                                                                                              |
| Last Updated      | 08/06/2026                                                                                                                                                                                              |
| Owner             | Project Leader                                                                                                                                                                                          |
| Reviewer          | Nhóm phát triển / Giảng viên hướng dẫn                                                                                                                                                                  |
| Baseline Source   | Document 01 — Project Overview & Current Baseline, Document 03 — Vision & Scope Document, Document 04 — Decision Log & Scope Control, baseline deadline/release decisions, project management decisions |
| Related Documents | Document 01, Document 03, Document 04, Document 19, Document 20                                                                                                                                         |
| Language Rule     | Nội dung chính viết bằng tiếng Việt; tên file/tên tài liệu có thể giữ tiếng Anh                                                                                                                         |
| Terminology Rule  | Giữ nguyên tên công nghệ, module, entity, API, table, enum và thuật ngữ kỹ thuật cần thiết bằng tiếng Anh                                                                                               |

---

## 1. Mục đích tài liệu

Tài liệu **Project Charter** xác nhận dự án **PharmaAssist AI Intelligence** được khởi động với mục tiêu, stakeholder, phạm vi cấp cao, ràng buộc, giả định, rủi ro, tiêu chí thành công, sản phẩm bàn giao và quyền phê duyệt rõ ràng.

Tài liệu này trả lời các câu hỏi quản trị dự án quan trọng:

1. Dự án tên là gì?
2. Vì sao dự án cần được thực hiện?
3. Dự án giải quyết vấn đề nào?
4. Mục tiêu tổng quát của dự án là gì?
5. Sản phẩm cuối cùng cần đạt được điều gì?
6. Stakeholder của dự án là ai?
7. Người dùng mục tiêu của hệ thống là ai?
8. Phạm vi cấp cao của dự án gồm những gì?
9. MVP bắt buộc gồm những phần nào?
10. Những phần nào là Should-have hoặc Future / Commercial Expansion?
11. Những phần nào nằm ngoài phạm vi hiện tại?
12. Deliverables chính của dự án là gì?
13. Tiêu chí nào dùng để đánh giá dự án thành công?
14. Dự án bị ràng buộc bởi các yếu tố nào?
15. Dự án có những giả định nào?
16. Rủi ro cấp cao của dự án là gì?
17. Timeline tổng quan ra sao?
18. Ai chịu trách nhiệm chính trong dự án?
19. Ai có quyền phê duyệt scope, test exit và release?
20. Tài liệu nào sẽ dùng Project Charter làm cơ sở cho kế hoạch triển khai?

Project Charter không thay thế Document 03 — Vision & Scope Document, Document 04 — Decision Log & Scope Control, Document 19 — Project Management, Jira & Release Plan hoặc Document 20 — Testing, Demo & Setup Guide.

Document 02 chỉ xác nhận dự án ở cấp quản trị. Các tài liệu sau sẽ đi sâu hơn vào yêu cầu, thiết kế, API, database, UI, testing, Jira và demo.

---

## 2. Người đọc chính

Tài liệu này dành cho các nhóm người đọc sau:

1. **Project Leader**
   Dùng tài liệu này để xác nhận mục tiêu dự án, phạm vi cấp cao, deliverables, success criteria và quyền phê duyệt.

2. **Giảng viên hướng dẫn**
   Dùng tài liệu này để hiểu mục tiêu đồ án, giá trị sản phẩm, phạm vi MVP và ràng buộc thực hiện.

3. **Toàn bộ nhóm phát triển**
   Dùng tài liệu này để hiểu dự án đang được khởi động theo định hướng nào, ai chịu trách nhiệm gì và tiêu chí thành công là gì.

4. **Người đánh giá đồ án**
   Dùng tài liệu này để đánh giá tính hợp lý của dự án, scope, deliverables và mức độ phù hợp với yêu cầu học thuật.

5. **Stakeholder giả định của hệ thống nhà thuốc**
   Dùng tài liệu này để hiểu hệ thống sẽ hỗ trợ những nghiệp vụ nhà thuốc nào và phần nào chưa thuộc phạm vi hiện tại.

---

## 3. Project Name

Tên dự án chính thức:

**PharmaAssist AI Intelligence**

Tên tiếng Việt mô tả:

**Hệ thống quản lý nhà thuốc thông minh tích hợp AI và Knowledge Graph**

Tên viết tắt nội bộ có thể dùng:

**PharmaAssist**

Loại dự án:

1. Đồ án Công Nghệ Phần Mềm.
2. Hệ thống web quản lý nhà thuốc.
3. Hệ thống nghiệp vụ nội bộ.
4. Hệ thống có tích hợp AI Copilot, AI Guardrail, AI Audit, Neo4j Knowledge Graph, Graph Sync và Graph-RAG.
5. Hệ thống demo học thuật, không phải production medical system.

---

## 4. Project Background

PharmaAssist AI Intelligence được xây dựng sau khi nhóm đã phân tích một lượng lớn tài liệu đầu vào gồm:

1. Tài liệu hệ thống ban đầu.
2. SRS.
3. UML.
4. API Specification.
5. UI/UX Screen Specification.
6. AI Architecture.
7. Knowledge Graph / Neo4j Design.
8. Testing, Demo and Setup Guide.
9. Database 100 bảng.
10. Jira Components, Epics, Stories, Tasks, Sprint và Branch documents.
11. Nhóm dữ liệu thật/catalog data.
12. Bản bàn giao chính thức sau khi phân tích toàn bộ tài liệu.
13. Master Documentation Index & File Naming Standard.
14. Documentation Blueprint for 20 Consolidated Documents.

Sau giai đoạn phân tích, nhóm nhận thấy các tài liệu cũ có nhiều mâu thuẫn và một số thiết kế không còn phù hợp, ví dụ:

1. Có tài liệu còn dùng custom username/password/JWT thay vì Supabase Auth.
2. Có tài liệu còn dùng aggregate inventory làm source of truth thay vì MedicineBatch.
3. Có tài liệu còn mô tả interaction rule ở cấp Medicine–Medicine thay vì ActiveIngredient–ActiveIngredient.
4. Có tài liệu xem AI/Graph là optional hoặc mock-only, trong khi baseline mới xác định AI Guardrail, AI Audit, Graph Sync và Graph-RAG là MVP.
5. Có tài liệu tách payment/invoice khỏi checkout transaction.
6. Có tài liệu xem full Customer Management hoặc full 100-table database là MVP blocker.
7. Có tài liệu chưa phản ánh HIGH alert acknowledgement và consultation note.
8. Có tài liệu chưa phản ánh Graph Sync Outbox, retry, audit và freshness detection.

Vì vậy, dự án cần một Project Charter mới để xác nhận:

1. Dự án sẽ tiếp tục theo baseline mới.
2. Bộ 20 tài liệu consolidated documentation sẽ là nguồn chính thức.
3. MVP sẽ tập trung vào nghiệp vụ nhà thuốc lõi, batch inventory, FEFO, checkout transaction, interaction alert lifecycle, AI safety và graph intelligence.
4. Các phần mở rộng thương mại sẽ được phân loại rõ là Should-have hoặc Future / Commercial Expansion.
5. Không quay lại các quyết định cũ đã bị thay thế.
6. Không tự ý mở rộng scope ngoài baseline.

Project Charter này là điểm khởi đầu quản trị cho giai đoạn xây tài liệu chính thức, triển khai, kiểm thử và chuẩn bị demo.

---

## 5. Problem Statement

### 5.1. Vấn đề nghiệp vụ

Các nhà thuốc nhỏ hoặc hệ thống nhà thuốc nội bộ thường gặp các vấn đề sau:

1. Dữ liệu thuốc, hoạt chất, đơn vị tính, giá bán và trạng thái thuốc có thể bị quản lý rời rạc.
2. Nhà cung cấp và lịch sử nhập kho có thể thiếu chuẩn hóa.
3. Tồn kho theo lô và hạn dùng có thể không được theo dõi chính xác.
4. Nhân viên có thể bán nhầm batch đã hết hạn nếu hệ thống không loại trừ batch hết hạn khỏi sellable stock.
5. Nhân viên có thể không ưu tiên batch gần hết hạn nếu hệ thống không áp dụng FEFO.
6. Điều chỉnh tồn kho thủ công nếu không có reason và audit sẽ khó truy vết.
7. POS có thể bán vượt tồn kho nếu không kiểm tra stock theo batch.
8. Việc kiểm tra tương tác thuốc có thể bị bỏ sót nếu chỉ dựa vào kinh nghiệm cá nhân.
9. Cảnh báo tương tác thuốc nếu không được lưu lại sẽ khó truy vết sau bán hàng.
10. Cảnh báo HIGH nếu chỉ hiển thị nhưng không bắt buộc acknowledgement và consultation note thì chưa đủ kiểm soát an toàn nghiệp vụ.
11. Báo cáo doanh thu, thuốc bán chạy và tồn kho nếu không có dữ liệu nhất quán sẽ khó phục vụ vận hành.
12. Dữ liệu demo nếu không thể reset tái tạo sẽ gây khó khăn khi trình bày.

### 5.2. Vấn đề kỹ thuật

Dự án cũng có các vấn đề kỹ thuật cần giải quyết:

1. Cần thống nhất stack công nghệ thay vì để tài liệu cũ ghi nhiều lựa chọn mâu thuẫn.
2. Cần dùng Supabase Auth thay vì tự xây auth không cần thiết.
3. Cần xác định PostgreSQL là source of truth.
4. Cần xác định Neo4j là graph projection, không phải nguồn dữ liệu chính thức.
5. Cần đồng bộ graph bằng Graph Sync có outbox, worker, retry, audit và freshness detection.
6. Cần tách Graph-RAG thành module riêng, không gộp mơ hồ vào AI Copilot.
7. Cần tích hợp AI provider thật nhưng vẫn có MockAI fallback cho demo ổn định.
8. Cần có AI Guardrail để ngăn AI trả lời vượt phạm vi.
9. Cần có AI Audit để truy vết sử dụng AI.
10. Cần thiết kế checkout có transaction và idempotency để tránh double-payment hoặc double-deduct.
11. Cần thiết kế dữ liệu batch allocation để chứng minh thuốc bán ra lấy từ batch nào.
12. Cần sửa lại Jira, API, UI, ERD, Prisma và Testing theo baseline mới.

### 5.3. Vấn đề tài liệu

Trước khi có bộ consolidated documentation, dự án có rủi ro:

1. Tài liệu SRS, API, ERD, UI, AI, Graph, Jira và Testing không thống nhất.
2. Một số tài liệu dựa trên quyết định cũ đã bị thay thế.
3. Scope MVP bị lẫn với Should-have hoặc Future.
4. Một số chức năng bắt buộc bị mô tả là optional.
5. Một số chức năng không thuộc MVP lại bị đưa thành blocker.
6. Các tài liệu sau có thể lặp nội dung hoặc viết sai vai trò nếu không có blueprint.
7. Development có thể triển khai sai baseline nếu tài liệu chính thức không được chuẩn hóa.

Dự án cần Project Charter để xác nhận định hướng và quyền kiểm soát scope trước khi tiếp tục xây các tài liệu chi tiết.

---

## 6. Project Objectives

Mục tiêu cấp dự án là xây dựng và tài liệu hóa một hệ thống quản lý nhà thuốc thông minh có thể demo được, bám baseline mới và thể hiện rõ năng lực phân tích, thiết kế, triển khai, kiểm thử trong phạm vi đồ án.

Các mục tiêu chính của dự án:

1. Xây dựng bộ 20 consolidated documents chính thức cho PharmaAssist AI Intelligence.
2. Chuẩn hóa toàn bộ quyết định nghiệp vụ và kỹ thuật sau khi phân tích tài liệu cũ.
3. Loại bỏ các thiết kế cũ không còn phù hợp.
4. Thiết kế một hệ thống quản lý nhà thuốc có phạm vi MVP rõ ràng.
5. Đảm bảo MVP có đủ nghiệp vụ lõi: thuốc, hoạt chất, supplier, batch inventory, nhập kho, điều chỉnh tồn kho, POS, checkout, payment, invoice và reports.
6. Đảm bảo MVP có các điểm nổi bật kỹ thuật: AI Copilot, AI Guardrail, AI Audit, Neo4j projection, Graph Sync và Graph-RAG.
7. Đảm bảo PostgreSQL là source of truth và Neo4j chỉ là graph projection.
8. Đảm bảo MedicineBatch là source of truth cho inventory.
9. Đảm bảo checkout là transaction chính thức và áp dụng FEFO.
10. Đảm bảo interaction rule ở cấp ActiveIngredient–ActiveIngredient.
11. Đảm bảo InteractionAlert được persist và HIGH alert được xử lý đúng trước checkout.
12. Đảm bảo dữ liệu demo được curated và có thể reset tái tạo.
13. Đảm bảo Jira, GitHub, CI, testing và demo plan được cập nhật theo baseline mới.
14. Đảm bảo toàn bộ tài liệu có traceability.
15. Đảm bảo sản phẩm có thể trình bày như một đồ án có độ phức tạp kỹ thuật và nghiệp vụ phù hợp.

---

## 7. Product Objectives

Mục tiêu sản phẩm tập trung vào giá trị mà PharmaAssist AI Intelligence cần mang lại cho người dùng và buổi demo.

### 7.1. Mục tiêu vận hành nhà thuốc

Sản phẩm cần hỗ trợ:

1. Quản lý thuốc.
2. Quản lý hoạt chất.
3. Mapping thuốc với hoạt chất.
4. Quản lý nhà cung cấp.
5. Quản lý nhập kho theo lô.
6. Quản lý tồn kho theo MedicineBatch.
7. Theo dõi batch hết hạn, gần hết hạn và sellable stock.
8. Điều chỉnh tồn kho có reason và audit.
9. Bán thuốc tại quầy bằng POS.
10. Hỗ trợ khách lẻ/walk-in.
11. Tạo order, payment simulation và invoice.
12. Xem order history và order detail.
13. Xem báo cáo doanh thu, thuốc bán chạy và tồn kho.

### 7.2. Mục tiêu an toàn nghiệp vụ

Sản phẩm cần đảm bảo:

1. Không bán batch đã hết hạn.
2. Low-stock tính từ sellable quantity.
3. Checkout áp dụng FEFO.
4. Checkout kiểm tra tồn kho trước khi hoàn tất.
5. Checkout không bỏ qua HIGH interaction alert.
6. HIGH alert cần acknowledgement.
7. HIGH alert cần consultation note.
8. InteractionAlert được lưu để truy vết.
9. Paid order không được sửa hoặc cancel trực tiếp.
10. Payment và invoice được tạo trong checkout flow chính thức.

### 7.3. Mục tiêu AI và Graph

Sản phẩm cần thể hiện:

1. AI Copilot hỗ trợ giải thích cảnh báo interaction.
2. AI tạo consultation note draft nhưng không tự động lưu note chính thức.
3. AI Guardrail ngăn diagnosis, prescribing và dosage advice.
4. AI Audit Log ghi metadata sử dụng AI.
5. Google AI Provider là provider ưu tiên.
6. MockAI là fallback cho demo stability.
7. Neo4j biểu diễn graph projection từ PostgreSQL.
8. Graph Sync đồng bộ dữ liệu có kiểm soát.
9. Graph-RAG hỗ trợ truy vấn/ngữ cảnh graph.
10. Graph stale/unavailable có fallback hoặc safe error phù hợp.

### 7.4. Mục tiêu demo

Sản phẩm cần demo được:

1. Login và phân quyền theo role.
2. Medicine và ActiveIngredient management.
3. Supplier management.
4. Stock Import tạo MedicineBatch.
5. Inventory Summary và Batch Detail.
6. Inventory Adjustment có reason.
7. POS tạo Draft Order.
8. InteractionAlert khi thêm thuốc có tương tác.
9. HIGH alert acknowledgement và consultation note.
10. AI Copilot giải thích alert.
11. AI Guardrail chặn nội dung vượt phạm vi.
12. Checkout transaction.
13. FEFO deduction.
14. Payment simulation.
15. Invoice generation.
16. Reports.
17. Neo4j graph projection.
18. Graph Sync.
19. Graph-RAG.
20. Demo reset tái tạo được dữ liệu.

---

## 8. Business Objectives

Mục tiêu nghiệp vụ của dự án là mô phỏng một hệ thống nhà thuốc đủ thực tế để thể hiện các quy trình vận hành quan trọng.

Business objectives gồm:

1. Giúp nhà thuốc quản lý thuốc và hoạt chất tập trung.
2. Giúp nhà thuốc quản lý supplier phục vụ nhập kho.
3. Giúp nhà thuốc quản lý tồn kho theo lô và hạn dùng.
4. Giúp nhà thuốc giảm rủi ro bán thuốc hết hạn.
5. Giúp nhà thuốc ưu tiên xuất batch gần hết hạn trước theo FEFO.
6. Giúp nhân viên bán thuốc kiểm tra tồn kho bán được trong POS.
7. Giúp nhân viên phát hiện tương tác thuốc trong order.
8. Giúp hệ thống lưu lại lịch sử cảnh báo tương tác đã hiển thị.
9. Giúp bắt buộc xử lý cảnh báo HIGH trước khi hoàn tất thanh toán.
10. Giúp tạo hóa đơn sau khi thanh toán thành công.
11. Giúp Admin xem báo cáo cơ bản.
12. Giúp Warehouse theo dõi tồn kho, low-stock và near-expiry.
13. Giúp hệ thống có audit cho các thao tác quan trọng.
14. Giúp demo thể hiện nghiệp vụ nhà thuốc có tính an toàn và truy vết.

Các business objectives này sẽ được chuyển thành business requirements chi tiết trong Document 05.

---

## 9. Technical Objectives

Mục tiêu kỹ thuật của dự án là xây dựng hệ thống theo stack đã chốt và thể hiện các điểm kỹ thuật nổi bật.

Technical objectives gồm:

1. Xây dựng frontend bằng Next.js.
2. Xây dựng backend bằng NestJS / Node.js.
3. Tổ chức backend theo Modular Monolith với module boundaries rõ ràng.
4. Sử dụng Prisma cho schema, migration và database access.
5. Sử dụng Supabase Auth cho authentication.
6. Sử dụng PostgreSQL làm source of truth.
7. Thiết kế multi-role RBAC với roles, permissions, user_roles và role_permissions.
8. Thiết kế ownership-based access cho Staff.
9. Thiết kế MedicineBatch làm source of truth cho inventory.
10. Thiết kế FEFO allocation trong checkout.
11. Thiết kế checkout transaction có idempotency.
12. Thiết kế ActiveIngredient-level DrugInteraction Rule.
13. Thiết kế InteractionAlert lifecycle có audit-friendly behavior.
14. Tích hợp Google AI Provider ở backend.
15. Cung cấp MockAI fallback.
16. Thiết kế AI Guardrail cho input/output.
17. Thiết kế AI Audit Log.
18. Thiết kế Neo4j graph projection.
19. Thiết kế Graph Sync Outbox, Worker, Retry, Audit và Freshness Detection.
20. Thiết kế Graph-RAG tách riêng khỏi AI Copilot.
21. Thiết kế deterministic reports không phụ thuộc AI.
22. Thiết kế curated operational seed.
23. Thiết kế demo reset chỉ chạy local.
24. Thiết kế CI quality gate tối thiểu.
25. Đảm bảo tài liệu và implementation có traceability.

Các technical objectives này sẽ được triển khai chi tiết trong Document 10, 11, 12, 13, 14, 16, 17, 19 và 20.

---

## 10. Stakeholders

### 10.1. Stakeholder tổng quan

| Stakeholder          | Vai trò trong dự án                                    | Quan tâm chính                                    |
| -------------------- | ------------------------------------------------------ | ------------------------------------------------- |
| Project Leader       | Quản lý scope, quyết định baseline, phê duyệt thay đổi | Scope đúng, timeline đúng, tài liệu thống nhất    |
| Giảng viên hướng dẫn | Hướng dẫn và đánh giá học thuật                        | Dự án hợp lý, có phân tích/thiết kế/triển khai rõ |
| Nhóm phát triển      | Xây dựng tài liệu và sản phẩm                          | Yêu cầu rõ, thiết kế rõ, phân công rõ             |
| Business Analyst     | Phân tích nghiệp vụ                                    | Business rules và scope rõ                        |
| System Analyst       | Chuyển nghiệp vụ thành yêu cầu và mô hình              | SRS, Use Case, UML nhất quán                      |
| Backend Developer    | Xây API, logic, transaction, AI/Graph backend          | API rõ, DB rõ, business rule rõ                   |
| Frontend Developer   | Xây UI và flow                                         | Screen scope rõ, role-based UI rõ                 |
| Database Designer    | Thiết kế ERD và Prisma                                 | Source of truth rõ, schema đúng baseline          |
| Tester               | Kiểm thử MVP                                           | Acceptance criteria, test scope và demo flows rõ  |
| Release/Demo Owner   | Điều phối release/demo                                 | Demo ổn định, reset được, checklist rõ            |
| Admin giả định       | Người quản trị nhà thuốc                               | Quản lý hệ thống, reports, rules, audit           |
| Staff giả định       | Nhân viên bán thuốc                                    | POS, alert, AI assistance, checkout               |
| Warehouse giả định   | Nhân viên kho                                          | Supplier, nhập kho, batch, inventory              |
| Customer giả định    | Người mua thuốc tại quầy                               | Nhận invoice, không đăng nhập trong MVP           |

### 10.2. Stakeholder có quyền quyết định

| Quyết định                  | Người/nhóm có quyền                                          |
| --------------------------- | ------------------------------------------------------------ |
| Phê duyệt scope chính thức  | Project Leader / Scope Owner                                 |
| Phê duyệt scope change      | Project Leader / Scope Owner                                 |
| Phê duyệt test exit         | Project Leader dựa trên báo cáo Tester và Release/Demo Owner |
| Phê duyệt release/demo      | Project Leader                                               |
| Chốt baseline tài liệu      | Project Leader                                               |
| Chốt unresolved decisions   | Project Leader sau khi trao đổi nhóm                         |
| Chấp nhận deliverables cuối | Giảng viên hướng dẫn / Người đánh giá đồ án                  |

### 10.3. Stakeholder cần được thông báo khi có thay đổi lớn

Khi có major business-scope change, cần thông báo:

1. Project Leader.
2. Toàn bộ nhóm phát triển.
3. Người quản lý Jira.
4. Tester.
5. Release/Demo Owner.
6. Giảng viên hướng dẫn nếu thay đổi ảnh hưởng phạm vi đồ án hoặc deliverables.

---

## 11. User Groups

### 11.1. Admin

Admin là người quản trị hệ thống hoặc chủ nhà thuốc.

Admin cần:

1. Quản lý user, role và permission.
2. Quản lý Medicine.
3. Quản lý ActiveIngredient.
4. Quản lý Supplier.
5. Deactivate Supplier.
6. Quản lý DrugInteraction Rule.
7. Xem InteractionAlert History.
8. Xem toàn bộ Order.
9. Thực hiện nghiệp vụ bán hàng như Staff nếu cần.
10. Xem reports.
11. Xem AI Audit.
12. Dùng Graph Explorer và Graph-RAG.
13. Cấu hình near-expiry threshold.

### 11.2. Staff

Staff là nhân viên bán thuốc tại quầy.

Staff cần:

1. Tìm thuốc.
2. Xem sellable stock trong POS.
3. Tạo Draft Order.
4. Sửa Draft Order thuộc quyền.
5. Cancel Draft Order thuộc quyền.
6. Xem interaction alert trong order.
7. Acknowledge HIGH alert.
8. Nhập consultation note cho HIGH alert.
9. Dùng AI Copilot trong POS flow.
10. Checkout khi validation hợp lệ.
11. Xem Order, Payment và Invoice thuộc ownership scope.

### 11.3. Warehouse

Warehouse là nhân viên kho.

Warehouse cần:

1. Xem Medicine.
2. Xem Supplier.
3. Tạo Supplier.
4. Cập nhật Supplier.
5. Tạo và confirm Stock Import.
6. Xem Inventory Summary.
7. Xem MedicineBatch.
8. Theo dõi low-stock và near-expiry.
9. Tạo và confirm Inventory Adjustment.
10. Xem Inventory Report trong phạm vi được cấp.

### 11.4. Customer / Khách lẻ

Customer không phải authenticated user trong MVP.

Customer trong phạm vi MVP là:

1. Người mua thuốc tại quầy.
2. Người nhận invoice.
3. Stakeholder ngoài hệ thống.

POS phải hỗ trợ khách lẻ thông qua `customer_id = null`.

### 11.5. External Systems

External systems gồm:

1. Supabase Auth.
2. Supabase PostgreSQL.
3. Google AI Provider.
4. MockAI.
5. Neo4j.
6. GitHub.
7. Jira.

External systems không phải user role, nhưng là stakeholder kỹ thuật vì ảnh hưởng đến kiến trúc, setup, release và demo.

---

## 12. High-level Scope

High-level scope của dự án gồm các nhóm chức năng và tài liệu sau:

### 12.1. Scope về hệ thống

Dự án sẽ xây dựng hệ thống web nội bộ cho nhà thuốc, bao gồm:

1. Authentication và authorization.
2. User profile và role/permission.
3. Medicine Management.
4. ActiveIngredient Management.
5. Supplier Management.
6. MedicineBatch và Inventory.
7. Stock Import.
8. Inventory Adjustment.
9. POS Draft Order.
10. DrugInteraction checking.
11. InteractionAlert handling.
12. Checkout.
13. Payment simulation.
14. Invoice.
15. Reports.
16. System Settings.
17. AI Copilot.
18. AI Guardrail.
19. AI Audit.
20. Knowledge Graph.
21. Graph Sync.
22. Graph-RAG.
23. Demo data và demo reset.

### 12.2. Scope về tài liệu

Dự án sẽ xây dựng bộ 20 consolidated documents:

1. Project Overview & Current Baseline.
2. Project Charter.
3. Vision & Scope Document.
4. Decision Log & Scope Control.
5. Business Requirements Document.
6. Software Requirements Specification.
7. User Roles, Permissions & Authorization Specification.
8. Use Case Specification.
9. UML Diagram Package.
10. System Architecture Document.
11. Module Design Document.
12. API Specification.
13. Database Design & ERD.
14. Prisma Schema & Migration Design.
15. UI/UX Screen Specification.
16. AI Architecture, Guardrail & Audit Design.
17. Knowledge Graph, Neo4j Sync & Graph-RAG Design.
18. Data Strategy, Catalog Reference & MVP Seed Plan.
19. Project Management, Jira & Release Plan.
20. Testing, Demo & Setup Guide.

### 12.3. Scope về demo

Dự án cần demo được:

1. Login và role-based access.
2. Medicine và ActiveIngredient.
3. Supplier.
4. Stock Import.
5. MedicineBatch.
6. Inventory Adjustment.
7. POS Draft Order.
8. InteractionAlert.
9. HIGH alert handling.
10. AI Copilot và Guardrail.
11. Checkout transaction.
12. FEFO.
13. Payment simulation.
14. Invoice.
15. Reports.
16. Neo4j graph projection.
17. Graph Sync.
18. Graph-RAG.
19. Demo reset.

### 12.4. Scope không bao gồm chi tiết ở Project Charter

Project Charter không viết chi tiết:

1. Requirement IDs.
2. Use case flows.
3. API request/response.
4. ERD.
5. Prisma models.
6. UI screen layouts.
7. Test cases.
8. Jira sprint/task chi tiết.
9. AI/Graph implementation sâu.

Các phần này sẽ được viết trong các tài liệu chuyên biệt.

---

## 13. MVP Scope Summary

MVP là phạm vi bắt buộc để dự án được xem là hoàn thành ở mức sản phẩm lõi và demo.

MVP gồm các nhóm sau:

### 13.1. Identity & Access

1. Supabase Auth.
2. User profile trong PostgreSQL.
3. Multi-role RBAC.
4. Roles.
5. Permissions.
6. User roles.
7. Role permissions.
8. Permission-based authorization.
9. Ownership-based access cho Staff.
10. First-login password-change flow cho selected demo user nếu cần.

### 13.2. Medicine & ActiveIngredient

1. Medicine Management.
2. ActiveIngredient Management.
3. Medicine–ActiveIngredient mapping.
4. Medicine active/inactive status.
5. Selling price > 0.
6. ActiveIngredient làm cơ sở cho DrugInteraction Rule.

### 13.3. Supplier

1. Supplier Management là MVP.
2. Warehouse được xem/tạo/cập nhật supplier.
3. Admin được deactivate supplier.
4. Supplier liên quan đến Stock Import.
5. Supplier có audit khi thay đổi quan trọng nếu cần.

### 13.4. Inventory

1. MedicineBatch là source of truth.
2. Batch number.
3. Normalized batch number.
4. Expiry date.
5. Quantity received.
6. Quantity remaining.
7. Import price.
8. Sellable stock từ batch còn hạn.
9. Batch hết hạn bị loại khỏi sellable stock.
10. Inventory Summary.
11. Batch Detail.

### 13.5. Stock Import

1. Stock Import status: DRAFT, CONFIRMED, CANCELLED.
2. Confirm mới cập nhật MedicineBatch.
3. Confirmed import không được confirm lại.
4. Detail có batch number và expiry date.
5. Confirm/cancel có audit.

### 13.6. Inventory Adjustment

1. Tạo Inventory Adjustment.
2. Confirm Inventory Adjustment.
3. Warehouse có thể tạo/confirm không cần Admin approval trước.
4. Reason bắt buộc.
5. Audit log bắt buộc.
6. Adjustment theo MedicineBatch.
7. Không làm quantity_remaining âm.

### 13.7. POS & Sales

1. Staff tạo Draft Order.
2. Staff thêm/sửa/xóa thuốc trong Draft Order.
3. POS hiển thị sellable stock.
4. POS hỗ trợ khách lẻ.
5. Staff cancel Draft Order trong ownership scope.
6. Admin cancel mọi Draft Order.
7. Staff chỉ xem order mình tạo hoặc xử lý.
8. Admin xem toàn bộ order.

### 13.8. Interaction

1. DrugInteraction Rule ở cấp ActiveIngredient–ActiveIngredient.
2. Severity MVP: LOW, MEDIUM, HIGH.
3. InteractionAlert được persist.
4. Mỗi order_id + interaction_id có một active alert.
5. HIGH alert cần acknowledgement.
6. HIGH alert cần consultation note.
7. HIGH alert phải hoàn tất trước checkout.
8. Admin có InteractionAlert History.
9. Warehouse không truy cập InteractionAlert trong MVP.

### 13.9. Checkout, Payment & Invoice

1. Checkout là command nghiệp vụ chính thức.
2. Checkout chạy trong transaction.
3. Checkout kiểm tra order, stock, HIGH alert, quyền truy cập.
4. Checkout áp dụng FEFO.
5. Checkout tạo batch allocations.
6. Checkout tạo payment attempt.
7. Checkout tạo invoice sau payment success.
8. Checkout ghi audit.
9. Checkout hỗ trợ idempotency.
10. Payment simulation có SUCCESS và FAILED.
11. Mỗi order chỉ có tối đa một successful payment.
12. Mỗi PAID order có một invoice.

### 13.10. AI

1. Google AI Provider là provider ưu tiên.
2. MockAI là fallback.
3. AI Copilot hỗ trợ giải thích alert.
4. AI Copilot tạo consultation note draft.
5. AI Guardrail.
6. AI Audit Log.
7. Prompt versioning.
8. PII minimization/redaction.
9. AI không chẩn đoán, kê đơn hoặc đưa liều dùng cụ thể.

### 13.11. Graph

1. Neo4j graph projection.
2. PostgreSQL là source of truth.
3. Graph Sync.
4. Graph Sync Outbox.
5. Worker.
6. Retry.
7. Audit/log.
8. Freshness detection.
9. Graph-RAG là module riêng.
10. PostgreSQL fallback cho interaction explanation khi graph unavailable/stale.

### 13.12. Reports, Data và Demo

1. Revenue Report.
2. Top Medicines Report.
3. Inventory Report.
4. System Settings cho near-expiry threshold.
5. Curated operational seed.
6. Demo users.
7. Demo medicines.
8. Demo batches.
9. Demo interaction rules.
10. Local demo reset workflow.
11. Smoke test sau reset.

---

## 14. Should-have Summary

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
9. Graph visualization nâng cao.
10. Notification.
11. Supabase Storage nếu cần.
12. Supabase Realtime nếu cần.
13. Forecast tồn kho đơn giản.
14. Reorder suggestion đơn giản.
15. Một số UI/UX polish không làm thay đổi business rules.

Quy tắc:

1. Should-have không được làm chậm MVP.
2. Should-have không được thay thế MVP core.
3. Should-have không được làm sai baseline.
4. Nếu không kịp làm, sản phẩm vẫn đạt MVP nếu MVP scope hoàn thành.

---

## 15. Future / Commercial Expansion Summary

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
23. Forecast nâng cao.
24. Reorder suggestion nâng cao.
25. AI Cache.
26. DrugGroup taxonomy nếu có nguồn authoritative.
27. Symptom/Condition/RedFlag/Recommendation graph enrichment.
28. TREATS_SYMPTOM.
29. CAUTION_WITH.
30. CRITICAL interaction severity.
31. Full mobile support.
32. Full cross-browser testing.
33. Commercial-scale 100-table implementation.

---

## 16. Out of Scope Summary

Out of Scope là các nội dung không làm trong phạm vi hiện tại.

Out of Scope gồm:

1. AI chẩn đoán bệnh.
2. AI kê đơn thuốc.
3. AI đưa liều dùng cụ thể.
4. AI thay thế dược sĩ, bác sĩ hoặc chuyên gia y tế.
5. Real patient medical record.
6. Lưu raw PII trong AI Audit Log.
7. Real bank integration trong MVP.
8. Refund workflow trong MVP.
9. Product return trong MVP.
10. Online shopping checkout trong MVP.
11. Customer portal trong MVP.
12. Multi-store operation trong MVP.
13. Multi-warehouse stock transfer trong MVP.
14. Full 100-table database như điều kiện bắt buộc MVP.
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
27. Sử dụng dữ liệu y khoa thật để tư vấn.
28. Production medical decision support system.

---

## 17. Key Deliverables

### 17.1. Documentation deliverables

Dự án cần bàn giao bộ 20 consolidated documents:

| STT | File name                                    | Tên tài liệu                                          |
| --- | -------------------------------------------- | ----------------------------------------------------- |
| 01  | `01_project_overview_current_baseline.md`    | Project Overview & Current Baseline                   |
| 02  | `02_project_charter.md`                      | Project Charter                                       |
| 03  | `03_vision_scope_document.md`                | Vision & Scope Document                               |
| 04  | `04_decision_log_scope_control.md`           | Decision Log & Scope Control                          |
| 05  | `05_business_requirements_document.md`       | Business Requirements Document                        |
| 06  | `06_software_requirements_specification.md`  | Software Requirements Specification                   |
| 07  | `07_roles_permissions_authorization.md`      | User Roles, Permissions & Authorization Specification |
| 08  | `08_use_case_specification.md`               | Use Case Specification                                |
| 09  | `09_uml_diagram_package.md`                  | UML Diagram Package                                   |
| 10  | `10_system_architecture_document.md`         | System Architecture Document                          |
| 11  | `11_module_design_document.md`               | Module Design Document                                |
| 12  | `12_api_specification.md`                    | API Specification                                     |
| 13  | `13_database_design_erd.md`                  | Database Design & ERD                                 |
| 14  | `14_prisma_schema_migration_design.md`       | Prisma Schema & Migration Design                      |
| 15  | `15_ui_ux_screen_specification.md`           | UI/UX Screen Specification                            |
| 16  | `16_ai_architecture_guardrail_audit.md`      | AI Architecture, Guardrail & Audit Design             |
| 17  | `17_knowledge_graph_neo4j_graphrag.md`       | Knowledge Graph, Neo4j Sync & Graph-RAG Design        |
| 18  | `18_data_strategy_catalog_seed_plan.md`      | Data Strategy, Catalog Reference & MVP Seed Plan      |
| 19  | `19_project_management_jira_release_plan.md` | Project Management, Jira & Release Plan               |
| 20  | `20_testing_demo_setup_guide.md`             | Testing, Demo & Setup Guide                           |

### 17.2. Product deliverables

Product deliverables gồm:

1. Next.js frontend.
2. NestJS backend.
3. Prisma schema và migrations.
4. PostgreSQL database structure.
5. Supabase Auth integration.
6. RBAC authorization implementation.
7. Medicine/ActiveIngredient/Supplier modules.
8. Inventory/MedicineBatch/Stock Import/Inventory Adjustment modules.
9. POS Draft Order module.
10. Interaction Rule và InteractionAlert module.
11. Checkout/Payment/Invoice flow.
12. AI Copilot integration.
13. AI Guardrail.
14. AI Audit Log.
15. Neo4j projection.
16. Graph Sync worker.
17. Graph-RAG module.
18. Reports.
19. System Settings.
20. Demo seed và demo reset.

### 17.3. Project management deliverables

Project management deliverables gồm:

1. Revised Jira Components.
2. Revised Jira Epics.
3. Revised Jira Stories.
4. Revised Jira Tasks.
5. Revised Sprint/Execution Plan.
6. Branch naming convention.
7. GitHub branch model.
8. CI quality gates.
9. Release/demo freeze plan.
10. Assignment of Release/Demo Owner và backup.
11. Test exit and release approval workflow.

### 17.4. Testing and demo deliverables

Testing/demo deliverables gồm:

1. Test strategy.
2. High-risk module test scope.
3. API/manual test collection nếu dùng Postman.
4. Smoke test checklist.
5. Demo reset workflow.
6. Demo data plan.
7. Demo script.
8. Demo checklist.
9. Contingency evidence như screenshots/Postman collection nếu cần.
10. Final release/demo readiness checklist.

---

## 18. Success Criteria

Dự án được xem là thành công khi đạt các tiêu chí sau.

### 18.1. Documentation success criteria

| Tiêu chí                   | Điều kiện đạt                                                              |
| -------------------------- | -------------------------------------------------------------------------- |
| Bộ tài liệu có cấu trúc rõ | Có đủ 20 consolidated documents theo Master Index                          |
| Nội dung đúng ngôn ngữ     | Nội dung chính viết bằng tiếng Việt                                        |
| Thuật ngữ kỹ thuật đúng    | Tên công nghệ/entity/API/table/enum giữ tiếng Anh khi cần                  |
| Baseline nhất quán         | Không quay lại quyết định cũ đã bị thay thế                                |
| Scope rõ                   | Mỗi tài liệu liên quan scope phân biệt MVP/Should-have/Future/Out of Scope |
| Traceability rõ            | BRD → SRS → Use Case → API/ERD/UI/Testing có liên kết                      |
| Không viết sai vai trò     | Document nào viết đúng phạm vi của document đó                             |

### 18.2. Product success criteria

| Tiêu chí           | Điều kiện đạt                                             |
| ------------------ | --------------------------------------------------------- |
| Auth đúng baseline | Supabase Auth hoạt động                                   |
| Authorization đúng | Admin/Staff/Warehouse có quyền khác nhau                  |
| Inventory đúng     | MedicineBatch là source of truth                          |
| FEFO đúng          | Checkout trừ batch gần hết hạn trước                      |
| Checkout đúng      | Order/payment/invoice/inventory xử lý trong transaction   |
| Interaction đúng   | Rule dựa trên ActiveIngredient                            |
| Alert đúng         | InteractionAlert được persist                             |
| HIGH alert đúng    | Bắt buộc acknowledgement và consultation note             |
| AI đúng            | Google AI Provider ưu tiên, MockAI fallback               |
| AI safety đúng     | AI Guardrail chặn diagnosis/prescribing/dosage            |
| AI audit đúng      | AI Audit Log ghi metadata, không raw PII                  |
| Graph đúng         | Neo4j là projection, không phải source of truth           |
| Graph Sync đúng    | Có outbox/worker/retry/audit/freshness detection          |
| Graph-RAG đúng     | Là module riêng, có fallback/safe error                   |
| Reports đúng       | Revenue, Top Medicines, Inventory hoạt động deterministic |
| Demo data đúng     | Có curated seed đủ để demo                                |
| Demo reset đúng    | Chỉ chạy local và tái tạo được dữ liệu                    |

### 18.3. Project management success criteria

| Tiêu chí                    | Điều kiện đạt                                                                       |
| --------------------------- | ----------------------------------------------------------------------------------- |
| Jira được sửa theo baseline | Epics/Stories/Tasks không còn bám thiết kế cũ                                       |
| Branch model rõ             | main/develop/feature branches được dùng đúng                                        |
| CI gate rõ                  | Lint, type check, tests, Prisma validation, migration check, frontend/backend build |
| Scope control rõ            | Mọi scope change có approval và update Decision Log                                 |
| Release approval rõ         | Project Leader approve test exit/release dựa trên báo cáo                           |
| Demo owner rõ               | Có Release/Demo Owner và backup trước release freeze                                |

### 18.4. Demo success criteria

| Tiêu chí                | Điều kiện đạt                                              |
| ----------------------- | ---------------------------------------------------------- |
| Demo login được         | Admin/Staff/Warehouse đăng nhập được                       |
| Demo inventory được     | Có batch, near-expiry, expired, sellable stock             |
| Demo FEFO được          | Có scenario bán qua nhiều batch                            |
| Demo interaction được   | Có LOW/MEDIUM/HIGH alert                                   |
| Demo HIGH handling được | Acknowledgement và consultation note chặn/mở checkout đúng |
| Demo AI được            | AI explanation/draft hoạt động hoặc fallback               |
| Demo Guardrail được     | AI từ chối nội dung vượt phạm vi                           |
| Demo checkout được      | Checkout tạo payment, invoice, batch allocation            |
| Demo reports được       | Reports có dữ liệu hợp lệ                                  |
| Demo graph được         | Neo4j projection/Graph-RAG thể hiện được                   |
| Demo reset được         | Reset local tạo lại trạng thái demo                        |

---

## 19. Project Constraints

### 19.1. Technology constraints

1. Frontend phải dùng Next.js.
2. Backend phải dùng NestJS / Node.js.
3. ORM phải dùng Prisma.
4. Authentication phải dùng Supabase Auth.
5. PostgreSQL là source of truth.
6. Neo4j là graph projection.
7. Google AI Provider là provider ưu tiên.
8. MockAI chỉ là fallback.
9. Docker không phải official setup path.
10. Primary setup dùng local Node.js/Next.js/NestJS/Prisma với cloud Supabase và Neo4j AuraDB nếu khả thi.

### 19.2. Scope constraints

1. MVP phải giữ MedicineBatch.
2. MVP phải giữ FEFO.
3. MVP phải giữ Checkout transaction.
4. MVP phải giữ InteractionAlert lifecycle.
5. MVP phải giữ HIGH acknowledgement và consultation note.
6. MVP phải giữ AI Guardrail và AI Audit.
7. MVP phải giữ Graph Sync và Graph-RAG.
8. Không thêm scope mới nếu chưa có approval.
9. Không hạ MVP scope nếu chưa có approval.
10. Should-have không được làm chậm MVP.

### 19.3. Business constraints

1. Customer Management đầy đủ không phải MVP blocker.
2. Refund và return ngoài MVP.
3. Real bank integration ngoài MVP.
4. Online commerce ngoài MVP.
5. Multi-store/multi-warehouse ngoài MVP.
6. Paid order không được sửa hoặc cancel trực tiếp.
7. Checkout phải kiểm tra HIGH alert trước khi hoàn tất.
8. Inventory không được sửa trực tiếp ngoài workflow.

### 19.4. Data constraints

1. Real catalog data chỉ là reference.
2. MVP cần curated operational seed.
3. Không dùng toàn bộ scraped ingredients làm ActiveIngredient chính thức.
4. Không seed selling_price = 0.
5. Demo data không dùng dữ liệu cá nhân thật.
6. Demo inventory phải tái tạo từ transactions.
7. Demo reset chỉ chạy local.

### 19.5. AI safety constraints

1. AI không chẩn đoán bệnh.
2. AI không kê đơn.
3. AI không đưa liều dùng cụ thể.
4. AI không thay thế chuyên gia y tế.
5. AI output phải qua guardrail.
6. AI Audit không lưu raw PII.
7. AI-generated draft không tự động trở thành official note.

### 19.6. Timeline constraints

1. Final deadline trước ngày 17/06/2026.
2. Target release/demo freeze nên là ngày 16/06/2026 hoặc sớm hơn.
3. Do thời gian ngắn, dùng execution cycles ngắn thay vì sprint dài.
4. Team size chính thức là 4 thành viên.
5. Exact capacity từng thành viên chưa chốt, nên cần task-hour estimates và named ownership.

### 19.7. Quality constraints

1. CI tối thiểu phải có lint.
2. CI tối thiểu phải có type check.
3. CI tối thiểu phải có unit tests.
4. CI tối thiểu phải có integration tests.
5. CI tối thiểu phải có Prisma validation.
6. CI tối thiểu phải có migration check.
7. CI tối thiểu phải có frontend build.
8. CI tối thiểu phải có backend build.
9. Destructive tests không được chạy trên demo database.
10. Test exit/release cần Project Leader approval.

---

## 20. Assumptions

Các giả định cấp dự án gồm:

1. Đây là dự án đồ án, không phải hệ thống y tế production.
2. Người dùng chính là nhân sự nội bộ nhà thuốc: Admin, Staff, Warehouse.
3. Customer không đăng nhập trong MVP.
4. POS hỗ trợ khách lẻ thông qua `customer_id = null`.
5. Supabase Auth có thể được dùng làm authentication service.
6. Supabase PostgreSQL hoặc PostgreSQL tương đương có thể được dùng làm database nghiệp vụ.
7. Neo4j AuraDB hoặc Neo4j environment phù hợp có thể được dùng cho graph projection.
8. Google AI Provider có thể được cấu hình nếu có API key phù hợp.
9. MockAI luôn sẵn sàng để fallback khi provider thật lỗi, timeout hoặc không có quota.
10. Nhóm có thể tạo curated seed đủ để demo.
11. Demo reset có thể chạy ở local environment.
12. Jira và GitHub sẽ được dùng cùng nhau.
13. Jira là source of truth cho Epic/Story/Sprint/status.
14. GitHub là source of truth cho code, PR và CI.
15. Team size là 4 người.
16. Release/demo freeze cần trước deadline cuối.
17. Project Leader có quyền phê duyệt scope change.
18. Giảng viên hướng dẫn hoặc người đánh giá sẽ xem xét kết quả cuối.
19. Các tài liệu cũ chỉ dùng tham khảo nếu mâu thuẫn baseline mới.
20. Mọi quyết định chưa chốt phải giữ là unresolved, không tự ý xem là approved.

---

## 21. High-level Risks

| Risk ID | Rủi ro                                     | Khả năng        | Ảnh hưởng      | Hướng giảm thiểu                                         |
| ------- | ------------------------------------------ | --------------- | -------------- | -------------------------------------------------------- |
| R-01    | Scope quá rộng so với deadline             | Cao             | Cao            | Bảo vệ MVP, đẩy Should-have/Future ra khỏi release chính |
| R-02    | Quay lại thiết kế cũ                       | Trung bình      | Cao            | Dùng Document 01/04 làm baseline bắt buộc                |
| R-03    | Auth bị triển khai custom thay vì Supabase | Thấp/Trung bình | Cao            | Kiểm tra SRS/API/DB/Jira theo DEC-AUTH                   |
| R-04    | Inventory không theo MedicineBatch         | Trung bình      | Cao            | Đưa MedicineBatch vào SRS, ERD, Prisma, API, UI, test    |
| R-05    | Checkout không transaction                 | Trung bình      | Cao            | Ưu tiên CheckoutService và test high-risk                |
| R-06    | FEFO không hoàn thành                      | Trung bình      | Cao            | Tạo scenario FEFO sớm trong seed/test                    |
| R-07    | HIGH alert không block checkout            | Trung bình      | Cao            | Test interaction/checkout trước demo                     |
| R-08    | AI provider thật lỗi/quota hết             | Trung bình      | Trung bình/Cao | MockAI fallback                                          |
| R-09    | AI trả lời vượt phạm vi                    | Trung bình      | Cao            | Guardrail input/output và safe refusal                   |
| R-10    | AI Audit thiếu dữ liệu                     | Trung bình      | Trung bình     | Định nghĩa audit fields trong Document 16/13/14          |
| R-11    | Neo4j sync lỗi                             | Trung bình      | Trung bình/Cao | Graph Sync retry, audit, fallback PostgreSQL             |
| R-12    | Graph stale nhưng vẫn dùng                 | Trung bình      | Cao            | Freshness detection và degraded indicator                |
| R-13    | Demo data không đủ                         | Trung bình      | Cao            | Curated seed và smoke test                               |
| R-14    | Demo reset phá môi trường không đúng       | Thấp/Trung bình | Cao            | Chỉ cho demo:reset chạy local                            |
| R-15    | Jira cũ dẫn team làm sai                   | Trung bình      | Cao            | Major revision Jira theo baseline                        |
| R-16    | Không có Release/Demo Owner                | Trung bình      | Cao            | Assign owner và backup trong Document 19                 |
| R-17    | Test không đủ cho high-risk modules        | Trung bình      | Cao            | Ưu tiên Checkout, FEFO, Interaction, AI Guardrail        |
| R-18    | Không đủ thời gian cho Should-have         | Cao             | Trung bình     | Không xem Should-have là MVP blocker                     |
| R-19    | Tài liệu sau bị lặp hoặc sai vai trò       | Trung bình      | Trung bình     | Bám Documentation Blueprint                              |
| R-20    | Dữ liệu thật/catalog bị dùng sai           | Trung bình      | Trung bình/Cao | Chỉ dùng làm reference, tạo curated seed riêng           |

---

## 22. Timeline Summary

### 22.1. Deadline tổng quan

Deadline cuối của dự án:

* Trước ngày **17/06/2026**.

Target release/demo freeze:

* Nên là ngày **16/06/2026** hoặc sớm hơn.

Do timeline ngắn, dự án nên dùng execution cycles ngắn thay vì sprint dài hai tuần.

### 22.2. Giai đoạn 1 — Consolidated documentation foundation

Mục tiêu:

1. Chuẩn hóa Document 01.
2. Chuẩn hóa Document 04.
3. Chuẩn hóa Document 03.
4. Viết Document 02.
5. Khóa baseline tài liệu nền.

Kết quả:

1. Project overview rõ.
2. Decision log rõ.
3. Vision/scope rõ.
4. Project charter rõ.

### 22.3. Giai đoạn 2 — Requirements and authorization

Mục tiêu:

1. Viết Document 05 — BRD.
2. Viết Document 06 — SRS.
3. Viết Document 07 — Roles/Permissions.
4. Viết Document 08 — Use Case.

Kết quả:

1. Business requirements rõ.
2. Functional/non-functional requirements rõ.
3. Authorization matrix rõ.
4. Use case catalog rõ.

### 22.4. Giai đoạn 3 — Technical design

Mục tiêu:

1. Viết Document 13 — Database Design & ERD.
2. Viết Document 14 — Prisma Schema & Migration.
3. Viết Document 12 — API Specification.
4. Viết Document 10 — System Architecture.
5. Viết Document 11 — Module Design.
6. Viết Document 09 — UML Diagram Package.

Kết quả:

1. Database design đúng baseline.
2. Prisma design đúng.
3. API contract đúng.
4. Architecture/module/UML đủ để triển khai.

### 22.5. Giai đoạn 4 — UI, AI, Graph, Data

Mục tiêu:

1. Viết Document 15 — UI/UX.
2. Viết Document 16 — AI Architecture.
3. Viết Document 17 — Knowledge Graph/Neo4j/Graph-RAG.
4. Viết Document 18 — Data Strategy & Seed Plan.

Kết quả:

1. UI flows rõ.
2. AI Guardrail/Audit rõ.
3. Graph Sync/Graph-RAG rõ.
4. Demo seed rõ.

### 22.6. Giai đoạn 5 — Jira, testing, demo, release

Mục tiêu:

1. Viết Document 19 — Jira & Release Plan.
2. Viết Document 20 — Testing, Demo & Setup Guide.
3. Major revision Jira.
4. Chuẩn bị demo reset.
5. Chuẩn bị smoke test và demo checklist.

Kết quả:

1. Jira bám baseline.
2. Testing scope rõ.
3. Demo setup rõ.
4. Release/demo readiness có checklist.

---

## 23. Roles and Responsibilities Summary

### 23.1. Project Leader / Scope Owner

Trách nhiệm:

1. Phê duyệt baseline.
2. Phê duyệt scope change.
3. Kiểm soát MVP/Should-have/Future.
4. Duyệt Decision Log.
5. Duyệt tài liệu chính thức.
6. Phê duyệt test exit và release.
7. Đảm bảo major changes được communicate tới nhóm.
8. Làm việc với giảng viên hướng dẫn nếu cần.

### 23.2. Business Analyst

Trách nhiệm:

1. Phân tích nghiệp vụ nhà thuốc.
2. Viết/chuẩn hóa BRD.
3. Xác định business rules.
4. Đảm bảo scope nghiệp vụ bám Document 03/04.
5. Hỗ trợ Use Case và acceptance criteria.

### 23.3. System Analyst

Trách nhiệm:

1. Viết/chuẩn hóa SRS.
2. Viết Use Case Specification.
3. Xây UML Diagram Package.
4. Đảm bảo yêu cầu trace được tới API, ERD, UI và test.
5. Đảm bảo không dùng quyết định cũ.

### 23.4. Backend Developer

Trách nhiệm:

1. Thiết kế và triển khai NestJS modules.
2. Triển khai Supabase Auth verification.
3. Triển khai RBAC/permission/ownership.
4. Triển khai business rules.
5. Triển khai CheckoutService.
6. Triển khai FEFO.
7. Triển khai InteractionAlert lifecycle.
8. Triển khai AI orchestration.
9. Triển khai Graph Sync worker.
10. Triển khai API theo specification.

### 23.5. Frontend Developer

Trách nhiệm:

1. Xây UI bằng Next.js.
2. Xây role-based navigation.
3. Xây Medicine/Supplier/Inventory/POS/Checkout screens.
4. Xây InteractionAlert UI.
5. Xây AI Copilot UI.
6. Xây Reports UI.
7. Xây Graph Explorer/Graph-RAG UI nếu thuộc MVP scope.
8. Đảm bảo UI không thay thế backend authorization.

### 23.6. Database Designer

Trách nhiệm:

1. Thiết kế ERD MVP core.
2. Thiết kế Prisma Schema.
3. Thiết kế constraints.
4. Thiết kế migration.
5. Đảm bảo MedicineBatch là inventory source of truth.
6. Đảm bảo interaction rule ở cấp ActiveIngredient.
7. Đảm bảo AI Audit, Graph Sync Outbox và Idempotency Records phù hợp.

### 23.7. AI/Graph Developer

Trách nhiệm:

1. Thiết kế AI provider abstraction.
2. Tích hợp Google AI Provider.
3. Thiết kế MockAI fallback.
4. Thiết kế input/output guardrail.
5. Thiết kế AI Audit.
6. Thiết kế Neo4j graph projection.
7. Thiết kế Graph Sync.
8. Thiết kế Graph-RAG.
9. Đảm bảo graph stale/unavailable có fallback hoặc safe error.

### 23.8. Tester

Trách nhiệm:

1. Xây test strategy.
2. Ưu tiên high-risk modules.
3. Kiểm tra Checkout.
4. Kiểm tra FEFO.
5. Kiểm tra InteractionAlert/HIGH alert.
6. Kiểm tra AI Guardrail.
7. Kiểm tra authorization.
8. Kiểm tra demo reset.
9. Báo cáo test exit cho Project Leader.

### 23.9. Jira / Project Management Owner

Trách nhiệm:

1. Sửa Jira theo baseline mới.
2. Quản lý Epics, Stories, Tasks.
3. Đảm bảo Jira issue trace tới decision/requirement.
4. Cập nhật sprint/execution plan.
5. Theo dõi status và blockers.
6. Link GitHub PR/commit với Jira issue key.

### 23.10. Release/Demo Owner

Trách nhiệm:

1. Chuẩn bị release/demo checklist.
2. Điều phối demo freeze.
3. Kiểm tra demo reset.
4. Kiểm tra smoke tests.
5. Chuẩn bị demo script.
6. Chuẩn bị contingency evidence.
7. Báo cáo readiness cho Project Leader.

Trạng thái hiện tại:

* Release/Demo Owner và backup chưa được named.
* Cần chốt trong Document 19.

---

## 24. Approval Section

### 24.1. Quyền phê duyệt

| Nội dung cần phê duyệt   | Người phê duyệt                                              |
| ------------------------ | ------------------------------------------------------------ |
| Project Charter          | Project Leader                                               |
| Baseline scope           | Project Leader / Scope Owner                                 |
| Major scope change       | Project Leader / Scope Owner                                 |
| Final documentation set  | Project Leader, sau đó gửi Giảng viên hướng dẫn nếu cần      |
| Test exit                | Project Leader dựa trên báo cáo Tester và Release/Demo Owner |
| Release/demo readiness   | Project Leader                                               |
| Final project submission | Project Leader và Giảng viên hướng dẫn / Người đánh giá      |

### 24.2. Điều kiện Project Charter được xem là approved

Project Charter được xem là approved khi:

1. Project name được xác nhận.
2. Project background đúng baseline.
3. Problem statement phản ánh đúng bối cảnh dự án.
4. Project objectives rõ ràng.
5. Product, business và technical objectives rõ.
6. Stakeholders và user groups được xác định.
7. High-level scope rõ.
8. MVP/Should-have/Future/Out of Scope rõ.
9. Deliverables rõ.
10. Success criteria rõ.
11. Constraints, assumptions và risks được ghi nhận.
12. Timeline summary phù hợp deadline.
13. Roles and responsibilities summary có đủ nhóm chính.
14. Approval authority rõ.
15. Không mâu thuẫn Document 01/03/04.

### 24.3. Bảng phê duyệt

| Vai trò                       | Tên | Trạng thái | Ngày | Ghi chú                             |
| ----------------------------- | --- | ---------- | ---- | ----------------------------------- |
| Project Leader / Scope Owner  | TBD | Pending    | TBD  | Phê duyệt Project Charter           |
| Giảng viên hướng dẫn          | TBD | Pending    | TBD  | Review nếu cần                      |
| Release/Demo Owner            | TBD | Pending    | TBD  | Cần assign trong Document 19        |
| Tester / QA Owner             | TBD | Pending    | TBD  | Cung cấp test readiness cho release |
| Technical Lead / Backend Lead | TBD | Pending    | TBD  | Review technical feasibility        |
| Frontend/UI Lead              | TBD | Pending    | TBD  | Review UI/demo feasibility          |

### 24.4. Lưu ý phê duyệt

1. Việc Project Charter được approved không có nghĩa là tất cả requirement chi tiết đã finalized.
2. Requirement chi tiết sẽ được chốt trong BRD, SRS và các tài liệu chuyên biệt.
3. Unresolved decisions vẫn giữ nguyên trạng thái cho đến khi được Project Leader xác nhận.
4. Nếu Project Charter thay đổi, Document 01, 03, 04, 19 và 20 có thể cần cập nhật.
5. Mọi thay đổi lớn sau approval phải đi qua scope change process trong Document 04.

---

## 25. Kết luận

Document 02 — Project Charter xác nhận dự án **PharmaAssist AI Intelligence** được khởi động và tiếp tục theo baseline chính thức đã được thống nhất.

Dự án hướng tới xây dựng một hệ thống quản lý nhà thuốc thông minh, có khả năng hỗ trợ:

1. Quản lý thuốc và hoạt chất.
2. Quản lý supplier.
3. Quản lý tồn kho theo MedicineBatch.
4. Nhập kho và điều chỉnh tồn kho có audit.
5. POS bán thuốc tại quầy.
6. Kiểm tra tương tác thuốc.
7. Persist InteractionAlert.
8. Xử lý HIGH alert bằng acknowledgement và consultation note.
9. Checkout transaction có FEFO.
10. Payment simulation và invoice.
11. Reports.
12. AI Copilot.
13. AI Guardrail.
14. AI Audit.
15. Neo4j graph projection.
16. Graph Sync.
17. Graph-RAG.
18. Curated demo seed và local demo reset.

Project Charter này cũng xác nhận các điểm quản trị quan trọng:

1. Project Leader/scope owner kiểm soát scope.
2. Mọi scope change phải được phê duyệt.
3. MVP phải được bảo vệ.
4. Should-have không được chặn MVP.
5. Future / Commercial Expansion không được tự ý đưa vào MVP.
6. Các quyết định cũ đã bị thay thế không được quay lại.
7. Jira hiện có cần major revision theo baseline mới.
8. Testing và demo phải ưu tiên các high-risk modules.
9. Release/demo cần có owner, checklist và approval rõ.
10. Bộ 20 consolidated documents là deliverable tài liệu chính thức của dự án.

Sau Document 02, bước tiếp theo hợp lý là chuyển sang nhóm yêu cầu hệ thống, bắt đầu với:

1. Document 05 — Business Requirements Document.
2. Document 06 — Software Requirements Specification.
3. Document 07 — User Roles, Permissions & Authorization Specification.
4. Document 08 — Use Case Specification.
