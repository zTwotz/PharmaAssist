# Document 03 — Vision & Scope Document

# Tài liệu 03 — Tầm nhìn sản phẩm và phạm vi dự án

---

## Metadata

| Mục               | Nội dung                                                                                                                                                                     |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID       | DOC-03                                                                                                                                                                       |
| File name         | `03_vision_scope_document.md`                                                                                                                                                |
| Document Name     | Vision & Scope Document                                                                                                                                                      |
| Tên tiếng Việt    | Tầm nhìn sản phẩm và phạm vi dự án                                                                                                                                           |
| Project           | PharmaAssist AI Intelligence                                                                                                                                                 |
| Version           | 1.0 Draft                                                                                                                                                                    |
| Status            | Draft                                                                                                                                                                        |
| Created Date      | 08/06/2026                                                                                                                                                                   |
| Last Updated      | 08/06/2026                                                                                                                                                                   |
| Owner             | Project Leader                                                                                                                                                               |
| Reviewer          | Nhóm phát triển / Giảng viên hướng dẫn                                                                                                                                       |
| Baseline Source   | Document 01 — Project Overview & Current Baseline, Document 04 — Decision Log & Scope Control, Master Documentation Index, Documentation Blueprint, baseline scope decisions |
| Related Documents | Document 01, Document 02, Document 04, Document 05, Document 06, Document 08, Document 15, Document 19, Document 20                                                          |
| Language Rule     | Nội dung chính viết bằng tiếng Việt; tên file/tên tài liệu có thể giữ tiếng Anh                                                                                              |
| Terminology Rule  | Giữ nguyên tên công nghệ, module, entity, API, table, enum và thuật ngữ kỹ thuật cần thiết bằng tiếng Anh                                                                    |

---

## 1. Mục đích tài liệu

Tài liệu **Vision & Scope Document** mô tả tầm nhìn sản phẩm, bài toán cần giải quyết, nhóm người dùng mục tiêu, giá trị sản phẩm, ranh giới MVP, phạm vi Should-have, Future / Commercial Expansion và các nội dung Out of Scope của dự án **PharmaAssist AI Intelligence**.

Tài liệu này giúp nhóm phát triển trả lời các câu hỏi chính:

1. Sản phẩm hướng tới điều gì?
2. Sản phẩm giải quyết bài toán nào của nhà thuốc?
3. Người dùng chính của hệ thống là ai?
4. Sản phẩm mang lại giá trị nghiệp vụ, kỹ thuật và học thuật nào?
5. MVP bắt buộc gồm những phần nào?
6. Những phần nào nên có nếu còn thời gian?
7. Những phần nào để dành cho giai đoạn mở rộng sau MVP?
8. Những phần nào không làm trong phạm vi hiện tại?
9. Những ràng buộc nào cần được giữ để tránh scope creep?
10. Các tài liệu sau cần dựa vào phạm vi nào để viết tiếp?

Document 03 không phải là SRS, không phải API Specification, không phải ERD, không phải Prisma Schema, không phải UI/UX chi tiết và không phải Test Plan.

Tài liệu này chỉ xác định **tầm nhìn và ranh giới phạm vi cấp sản phẩm**. Các yêu cầu chi tiết, API, database, UI, test case và Jira task sẽ được viết trong các tài liệu chuyên biệt sau.

---

## 2. Người đọc chính

Tài liệu này dành cho các nhóm người đọc sau:

1. **Project Leader**
   Dùng tài liệu để kiểm soát phạm vi sản phẩm, tránh mở rộng MVP ngoài baseline đã chốt.

2. **Business Analyst**
   Dùng tài liệu để hiểu bài toán nhà thuốc, mục tiêu nghiệp vụ và ranh giới business scope.

3. **System Analyst**
   Dùng tài liệu để chuyển phạm vi sản phẩm thành BRD, SRS, Use Case và UML.

4. **UI/UX Designer**
   Dùng tài liệu để hiểu người dùng mục tiêu, luồng demo chính và phạm vi màn hình cần thiết.

5. **Developer**
   Dùng tài liệu để biết module nào thuộc MVP, module nào là Should-have hoặc Future.

6. **Tester**
   Dùng tài liệu để xác định luồng MVP cần test và nội dung nào không cần test như MVP blocker.

7. **Giảng viên hướng dẫn / Người đánh giá**
   Dùng tài liệu để hiểu tầm nhìn, phạm vi và mức độ phù hợp của dự án trong đồ án Công Nghệ Phần Mềm.

---

## 3. Vị trí của tài liệu trong bộ consolidated documentation

Document 03 nằm trong nhóm tài liệu nền tảng về quản trị dự án và phạm vi.

Nhóm tài liệu nền tảng gồm:

1. Document 01 — Project Overview & Current Baseline.
2. Document 02 — Project Charter.
3. Document 03 — Vision & Scope Document.
4. Document 04 — Decision Log & Scope Control.
5. Document 19 — Project Management, Jira & Release Plan.

Vai trò cụ thể của Document 03:

1. Mở rộng phần scope đã được tóm tắt trong Document 01.
2. Dùng các quyết định đã khóa trong Document 04 để xác định ranh giới MVP.
3. Làm input cho Document 05 — Business Requirements Document.
4. Làm input cho Document 06 — Software Requirements Specification.
5. Làm input cho Document 08 — Use Case Specification.
6. Làm input cho Document 15 — UI/UX Screen Specification.
7. Làm input cho Document 19 — Project Management, Jira & Release Plan.
8. Làm input cho Document 20 — Testing, Demo & Setup Guide.

Document 03 không thay thế các tài liệu chuyên sâu sau:

1. Không thay thế BRD.
2. Không thay thế SRS.
3. Không thay thế Use Case Specification.
4. Không thay thế API Specification.
5. Không thay thế Database Design & ERD.
6. Không thay thế Prisma Schema & Migration Design.
7. Không thay thế UI/UX Screen Specification.
8. Không thay thế AI Architecture, Guardrail & Audit Design.
9. Không thay thế Knowledge Graph, Neo4j Sync & Graph-RAG Design.
10. Không thay thế Data Strategy, Catalog Reference & MVP Seed Plan.
11. Không thay thế Testing, Demo & Setup Guide.

---

## 4. Product Vision

**PharmaAssist AI Intelligence** được định hướng là một hệ thống quản lý nhà thuốc hiện đại, hỗ trợ các nghiệp vụ cốt lõi tại quầy bán thuốc, đồng thời thể hiện năng lực kỹ thuật nâng cao thông qua batch-based inventory, FEFO, transactional checkout, interaction alert lifecycle, AI Guardrail/Audit, Neo4j Knowledge Graph, Graph Sync và Graph-RAG.

Tầm nhìn sản phẩm:

> Xây dựng một hệ thống quản lý nhà thuốc có khả năng vận hành nghiệp vụ bán thuốc, quản lý tồn kho theo lô, kiểm tra tương tác thuốc và hỗ trợ giải thích cảnh báo bằng AI trong phạm vi an toàn; đồng thời đảm bảo dữ liệu có thể truy vết, quy trình checkout nhất quán và kiến trúc đủ rõ để phục vụ phát triển, kiểm thử và demo đồ án.

Sản phẩm không chỉ là một website CRUD quản lý thuốc. Sản phẩm cần chứng minh được nhóm có thể thiết kế một hệ thống có:

1. Phân quyền người dùng rõ ràng.
2. Quản lý thuốc và hoạt chất.
3. Quản lý nhà cung cấp.
4. Quản lý lô thuốc theo hạn dùng.
5. Nhập kho và điều chỉnh tồn kho có audit.
6. POS bán thuốc tại quầy.
7. Checkout transaction.
8. Trừ kho theo FEFO.
9. Cảnh báo tương tác thuốc dựa trên hoạt chất.
10. Lưu lịch sử InteractionAlert.
11. Chặn checkout khi HIGH alert chưa được xử lý đủ.
12. AI Copilot hỗ trợ giải thích cảnh báo trong phạm vi an toàn.
13. AI Guardrail và AI Audit.
14. Neo4j graph projection.
15. Graph Sync có kiểm soát.
16. Graph-RAG tách riêng khỏi AI Copilot.
17. Báo cáo vận hành cơ bản.
18. Dữ liệu demo có thể tái tạo.

---

## 5. Product Statement

**PharmaAssist AI Intelligence** là hệ thống web quản lý nhà thuốc dành cho Admin, Staff và Warehouse. Hệ thống hỗ trợ quản lý thuốc, hoạt chất, nhà cung cấp, lô thuốc, nhập kho, điều chỉnh tồn kho, bán thuốc tại quầy, kiểm tra tương tác thuốc, checkout, payment simulation, invoice, báo cáo cơ bản, AI Copilot, AI Guardrail, AI Audit, Neo4j Knowledge Graph, Graph Sync và Graph-RAG.

Hệ thống sử dụng:

1. **Next.js** cho frontend.
2. **NestJS / Node.js** cho backend.
3. **Prisma** cho ORM.
4. **Supabase Auth** cho authentication.
5. **PostgreSQL** làm database nghiệp vụ và source of truth.
6. **Neo4j** làm graph projection.
7. **Google AI Provider** làm AI provider ưu tiên.
8. **MockAI** làm fallback để demo ổn định.

PostgreSQL là nguồn dữ liệu chính thức. Neo4j chỉ là graph projection được đồng bộ từ PostgreSQL thông qua Graph Sync.

AI trong hệ thống chỉ đóng vai trò hỗ trợ tham khảo. AI không được chẩn đoán bệnh, kê đơn thuốc, đưa liều dùng cụ thể hoặc thay thế dược sĩ, bác sĩ hay chuyên gia y tế.

---

## 6. Problem Statement

Các nhà thuốc nhỏ hoặc hệ thống nhà thuốc nội bộ thường gặp nhiều vấn đề trong vận hành:

1. Dữ liệu thuốc, hoạt chất, đơn vị tính, giá bán và trạng thái thuốc có thể bị quản lý rời rạc.
2. Nhà cung cấp và lịch sử nhập thuốc có thể không được chuẩn hóa.
3. Tồn kho theo lô và hạn dùng có thể không được theo dõi chính xác.
4. Nhân viên có thể bán nhầm batch gần hết hạn hoặc batch đã hết hạn nếu hệ thống không kiểm soát.
5. Việc điều chỉnh tồn kho thủ công nếu không có reason và audit sẽ khó truy vết.
6. POS bán thuốc có thể bán vượt tồn kho nếu không kiểm tra sellable stock.
7. Nếu không có FEFO, hệ thống khó đảm bảo batch gần hết hạn được ưu tiên xuất trước.
8. Việc kiểm tra tương tác thuốc có thể bị bỏ sót nếu chỉ dựa vào kinh nghiệm cá nhân.
9. Cảnh báo tương tác nếu chỉ hiển thị mà không lưu lại sẽ khó kiểm tra lịch sử.
10. Cảnh báo HIGH nếu không bắt buộc acknowledgement và consultation note thì chưa đủ kiểm soát an toàn nghiệp vụ.
11. AI nếu không có guardrail có thể sinh nội dung vượt phạm vi như chẩn đoán, kê đơn hoặc hướng dẫn liều dùng.
12. Graph nếu chỉ là mock hoặc không đồng bộ từ source of truth sẽ không chứng minh được kiến trúc dữ liệu đáng tin cậy.
13. Dữ liệu demo nếu không có curated seed và demo reset sẽ khó tái hiện khi trình bày.
14. Tài liệu cũ có nhiều mâu thuẫn, nếu không consolidated lại sẽ dẫn đến sai lệch giữa SRS, API, ERD, UI, Jira và Testing.

PharmaAssist AI Intelligence giải quyết các vấn đề trên bằng cách thiết kế một hệ thống có baseline rõ ràng, source of truth nhất quán, scope được kiểm soát và các điểm kỹ thuật nổi bật đủ để demo trong phạm vi đồ án.

---

## 7. Target Users

### 7.1. Admin

Admin là người quản trị hệ thống hoặc chủ nhà thuốc.

Admin cần hệ thống để:

1. Quản lý người dùng, vai trò và quyền.
2. Quản lý thuốc và hoạt chất.
3. Quản lý nhà cung cấp.
4. Quản lý quy tắc tương tác thuốc.
5. Xem toàn bộ đơn hàng.
6. Xem InteractionAlert History.
7. Xem báo cáo vận hành.
8. Xem AI Audit Log.
9. Cấu hình System Settings.
10. Theo dõi các vấn đề vận hành quan trọng.

Admin là nhóm người dùng có phạm vi truy cập rộng nhất.

### 7.2. Staff

Staff là nhân viên bán thuốc tại quầy.

Staff cần hệ thống để:

1. Tạo Draft Order.
2. Thêm thuốc vào đơn.
3. Xem sellable stock trong POS.
4. Nhận cảnh báo nếu đơn có tương tác thuốc.
5. Xử lý HIGH alert bằng acknowledgement và consultation note.
6. Sử dụng AI Copilot để hỗ trợ giải thích cảnh báo.
7. Checkout đơn hàng nếu mọi điều kiện hợp lệ.
8. Xem order do mình tạo hoặc xử lý.
9. Cancel Draft Order trong ownership scope.

Staff không phải người quản trị hệ thống, không quản lý toàn bộ interaction rules và không xem dữ liệu ngoài phạm vi được cấp quyền.

### 7.3. Warehouse

Warehouse là nhân viên kho.

Warehouse cần hệ thống để:

1. Xem thuốc.
2. Xem, tạo và cập nhật supplier.
3. Tạo và confirm Stock Import.
4. Xem tồn kho theo MedicineBatch.
5. Theo dõi low-stock và near-expiry.
6. Tạo và confirm Inventory Adjustment.
7. Xem inventory report trong phạm vi được cấp.

Warehouse không được trực tiếp sửa số lượng tồn kho ngoài workflow Inventory Adjustment.

Warehouse không truy cập InteractionAlert, không checkout, không xem payment/invoice và không dùng Graph Explorer trong MVP.

### 7.4. Customer / Khách lẻ

Customer không phải authenticated user trong MVP.

Trong MVP, Customer chủ yếu là:

1. Khách mua thuốc tại quầy.
2. Người nhận invoice.
3. Stakeholder ngoài hệ thống.

MVP POS phải hỗ trợ khách lẻ/walk-in/anonymous customer thông qua `customer_id = null`.

Full Customer Management là Should-have, không phải điều kiện hoàn thành MVP.

### 7.5. Project Team

Project Team sử dụng tài liệu và hệ thống để:

1. Phát triển frontend.
2. Phát triển backend.
3. Thiết kế database.
4. Thiết kế API.
5. Thiết kế UI/UX.
6. Tạo data seed.
7. Viết test.
8. Chuẩn bị demo.
9. Quản lý Jira và GitHub.
10. Đảm bảo sản phẩm bám scope.

### 7.6. Giảng viên hướng dẫn / Người đánh giá

Giảng viên hoặc người đánh giá cần hệ thống và tài liệu để:

1. Hiểu mục tiêu dự án.
2. Đánh giá phạm vi MVP.
3. Đánh giá độ thống nhất giữa tài liệu và implementation.
4. Đánh giá năng lực phân tích, thiết kế, triển khai và kiểm thử.
5. Đánh giá các điểm nổi bật như AI, Graph, FEFO, Checkout transaction và InteractionAlert lifecycle.

---

## 8. Product Value

### 8.1. Giá trị nghiệp vụ

Sản phẩm mang lại các giá trị nghiệp vụ sau:

1. Hỗ trợ nhà thuốc quản lý thuốc, hoạt chất, supplier và tồn kho tập trung.
2. Giảm rủi ro bán thuốc vượt tồn kho.
3. Giảm rủi ro bán thuốc từ batch hết hạn.
4. Tự động ưu tiên batch gần hết hạn trước theo FEFO.
5. Hỗ trợ kiểm tra tương tác thuốc trong luồng bán hàng.
6. Bắt buộc xử lý cảnh báo HIGH trước khi checkout.
7. Lưu lịch sử cảnh báo và hành động xử lý.
8. Tạo invoice sau khi payment thành công.
9. Cung cấp báo cáo cơ bản cho vận hành.
10. Hỗ trợ demo dữ liệu rõ ràng, có thể tái tạo.

### 8.2. Giá trị kỹ thuật

Sản phẩm thể hiện các năng lực kỹ thuật sau:

1. Thiết kế hệ thống full-stack với Next.js và NestJS.
2. Xác thực bằng Supabase Auth.
3. Phân quyền bằng multi-role RBAC.
4. Thiết kế dữ liệu bằng Prisma và PostgreSQL.
5. Quản lý inventory bằng MedicineBatch.
6. Transactional checkout có FEFO, payment, invoice và idempotency.
7. Interaction checking dựa trên ActiveIngredient.
8. AI Copilot có guardrail và audit.
9. Neo4j graph projection.
10. Graph Sync bằng outbox/worker/retry/audit/freshness detection.
11. Graph-RAG có fallback khi graph stale hoặc unavailable.
12. Demo reset workflow có kiểm soát.

### 8.3. Giá trị học thuật

Trong phạm vi đồ án, sản phẩm giúp nhóm thể hiện:

1. Khả năng phân tích yêu cầu.
2. Khả năng kiểm soát scope.
3. Khả năng xây dựng consolidated documentation.
4. Khả năng thiết kế hệ thống có nghiệp vụ phức tạp.
5. Khả năng xây dựng database có traceability.
6. Khả năng tích hợp AI an toàn.
7. Khả năng sử dụng graph database đúng vai trò.
8. Khả năng viết test và chuẩn bị demo.

---

## 9. Product Objectives

### 9.1. Mục tiêu tổng quát

Mục tiêu tổng quát của PharmaAssist AI Intelligence là xây dựng một hệ thống quản lý nhà thuốc có thể demo được các nghiệp vụ cốt lõi, đồng thời thể hiện được các điểm khác biệt kỹ thuật như MedicineBatch, FEFO, Checkout transaction, AI Guardrail, AI Audit, Knowledge Graph, Graph Sync và Graph-RAG.

### 9.2. Mục tiêu nghiệp vụ

Các mục tiêu nghiệp vụ gồm:

1. Cho phép Admin, Staff và Warehouse sử dụng hệ thống theo đúng quyền.
2. Quản lý thuốc và hoạt chất phục vụ bán hàng và kiểm tra tương tác.
3. Quản lý supplier phục vụ nhập kho.
4. Quản lý tồn kho theo MedicineBatch.
5. Hỗ trợ nhập kho có trạng thái và audit.
6. Hỗ trợ điều chỉnh tồn kho có reason và audit.
7. Hỗ trợ bán thuốc tại quầy với Draft Order.
8. Kiểm tra tồn kho bán được trước checkout.
9. Kiểm tra tương tác thuốc trong quá trình bán.
10. Bắt buộc xử lý HIGH alert trước checkout.
11. Hoàn tất đơn hàng bằng Checkout transaction.
12. Tạo payment attempt và invoice đúng quy tắc.
13. Cung cấp báo cáo cơ bản.

### 9.3. Mục tiêu kỹ thuật

Các mục tiêu kỹ thuật gồm:

1. Xây dựng frontend bằng Next.js.
2. Xây dựng backend bằng NestJS / Node.js.
3. Dùng Prisma để quản lý schema và migration.
4. Dùng Supabase Auth thay vì custom password/JWT.
5. Dùng PostgreSQL làm source of truth.
6. Dùng Neo4j làm graph projection.
7. Đồng bộ graph bằng Graph Sync.
8. Tách Graph-RAG thành module riêng.
9. Dùng Google AI Provider làm AI provider ưu tiên.
10. Dùng MockAI làm fallback.
11. Lưu AI Audit Log.
12. Áp dụng AI Guardrail cho input/output.
13. Đảm bảo checkout có transaction và idempotency.
14. Đảm bảo demo reset chỉ chạy ở local environment.

### 9.4. Mục tiêu tài liệu

Các mục tiêu tài liệu gồm:

1. Xây lại bộ 20 tài liệu chính thức.
2. Loại bỏ các quyết định cũ đã bị thay thế.
3. Viết nội dung chính bằng tiếng Việt.
4. Giữ tên file và tên tài liệu bằng tiếng Anh.
5. Đảm bảo traceability giữa BRD, SRS, Use Case, UML, API, ERD, Prisma, UI, Jira và Testing.
6. Đảm bảo mọi tài liệu phân biệt MVP, Should-have, Future / Commercial Expansion và Out of Scope.

---

## 10. Product Positioning

### 10.1. Định vị sản phẩm

PharmaAssist AI Intelligence là một hệ thống quản lý nhà thuốc nội bộ, tập trung vào vận hành tại quầy và kiểm soát an toàn nghiệp vụ.

Sản phẩm được định vị là:

1. Hệ thống web nội bộ cho nhà thuốc nhỏ/vừa hoặc môi trường demo học thuật.
2. Hệ thống quản lý thuốc, lô thuốc, nhập kho, tồn kho và bán hàng tại quầy.
3. Hệ thống có cảnh báo tương tác thuốc dựa trên ActiveIngredient.
4. Hệ thống có AI hỗ trợ giải thích trong phạm vi an toàn.
5. Hệ thống có graph projection để thể hiện quan hệ Medicine–ActiveIngredient–Interaction.
6. Hệ thống có tài liệu consolidated đủ để hỗ trợ phân tích, thiết kế, triển khai, kiểm thử và demo.

### 10.2. Sản phẩm không phải là gì

Sản phẩm không phải:

1. Website thương mại điện tử bán thuốc online.
2. Hệ thống quản lý bệnh án.
3. Ứng dụng tư vấn y tế cho bệnh nhân.
4. Công cụ chẩn đoán bệnh.
5. Công cụ kê đơn thuốc.
6. Cổng thanh toán thật.
7. Hệ thống multi-store/multi-warehouse thương mại đầy đủ.
8. Hệ thống y tế production.
9. Nguồn dữ liệu y khoa chính thức để dùng ngoài phạm vi đồ án.

### 10.3. Điểm khác biệt chính

Các điểm khác biệt chính của sản phẩm:

1. Inventory source of truth là MedicineBatch.
2. Checkout áp dụng FEFO.
3. Checkout là transaction chính thức cho order, inventory, payment và invoice.
4. Interaction rule ở cấp ActiveIngredient–ActiveIngredient.
5. InteractionAlert phải được persist.
6. HIGH alert bắt buộc acknowledgement và consultation note.
7. AI Copilot có Guardrail và Audit.
8. Neo4j là graph projection, không phải source of truth.
9. Graph Sync có outbox/worker/retry/audit/freshness detection.
10. Graph-RAG là module riêng.
11. Demo seed được curated riêng, không dùng nguyên catalog data làm operational seed.

---

## 11. MVP Scope

MVP là phạm vi bắt buộc để sản phẩm được xem là hoàn thành ở mức demo và triển khai lõi.

MVP không chỉ là CRUD thuốc, bán hàng và báo cáo cơ bản. MVP của dự án bao gồm các nghiệp vụ an toàn, traceability, AI safety và graph intelligence.

### 11.1. Authentication & Authorization

MVP bao gồm:

1. Supabase Auth.
2. User profile trong PostgreSQL.
3. Roles.
4. Permissions.
5. User roles.
6. Role permissions.
7. Multi-role RBAC.
8. Permission-based authorization.
9. Ownership-based access cho Staff.
10. Admin, Staff và Warehouse roles.
11. First-login password-change flow cho selected demo user nếu cần demo.

Không thuộc MVP:

1. Custom username/password/JWT authentication.
2. Lưu password/password_hash trong PostgreSQL.
3. Authorization chỉ hard-code theo role mà không có permission model.

### 11.2. Medicine Management

MVP bao gồm:

1. Quản lý Medicine.
2. Tìm kiếm/lọc Medicine ở mức cần thiết.
3. Trạng thái active/inactive của Medicine.
4. Selling price hợp lệ, lớn hơn 0.
5. Medicine là entity nghiệp vụ lõi cho sales, batch, inventory, checkout và reports.
6. Medicine liên kết với ActiveIngredient.

Không thuộc MVP:

1. Full product/product_variant commerce workflow.
2. Online product catalog đầy đủ như thương mại điện tử.
3. Dùng product_variant làm key chính cho sales/inventory trong MVP.

### 11.3. ActiveIngredient Management

MVP bao gồm:

1. Quản lý ActiveIngredient.
2. Mapping Medicine với ActiveIngredient.
3. ActiveIngredient là cơ sở để tạo DrugInteraction rules.
4. Admin có màn hình quản lý ActiveIngredient.
5. Medicine form có component mapping ingredients.

Không thuộc MVP:

1. Dùng toàn bộ scraped ingredients làm official active ingredients.
2. Tự động biến mọi ingredient string từ catalog data thành hoạt chất chính thức.
3. DrugGroup taxonomy nếu chưa có nguồn authoritative.

### 11.4. Supplier Management

MVP bao gồm:

1. Xem supplier.
2. Tạo supplier.
3. Cập nhật supplier.
4. Deactivate supplier bởi Admin.
5. Warehouse được xem, tạo và cập nhật supplier.
6. Supplier liên quan đến Stock Import nếu phù hợp.
7. Audit các thay đổi quan trọng.

Không thuộc MVP:

1. Supplier portal.
2. Supplier contract management phức tạp.
3. Procurement automation nâng cao.

### 11.5. MedicineBatch & Inventory

MVP bao gồm:

1. MedicineBatch là source of truth cho tồn kho.
2. Batch number.
3. Normalized batch number.
4. Expiry date.
5. Quantity received.
6. Quantity remaining.
7. Import price.
8. Sellable stock được tính từ batch còn hạn.
9. Batch hết hạn không được tính vào sellable stock.
10. Inventory Summary tổng hợp từ MedicineBatch.
11. Batch Detail để xem chi tiết batch.

Không thuộc MVP:

1. Aggregate inventory làm source of truth.
2. Direct edit inventory quantity.
3. Multi-warehouse stock distribution.
4. Stock transfer giữa kho.

### 11.6. Stock Import

MVP bao gồm:

1. Tạo Stock Import.
2. Stock Import có trạng thái DRAFT, CONFIRMED và CANCELLED.
3. Draft import có thể chỉnh sửa.
4. Confirm import mới cập nhật MedicineBatch.
5. Confirmed import không được confirm lại.
6. Confirmed import không được sửa tự do.
7. Import detail cần batch number và expiry date.
8. Quantity phải hợp lệ.
9. Confirm/cancel cần audit log.

Không thuộc MVP:

1. Purchase order workflow đầy đủ.
2. Supplier invoice matching.
3. Multi-step approval phức tạp.

### 11.7. Inventory Adjustment

MVP bao gồm:

1. Tạo Inventory Adjustment.
2. Confirm Inventory Adjustment.
3. Warehouse được tạo và confirm mà không cần Admin approval trước.
4. Reason bắt buộc.
5. Audit log bắt buộc.
6. Adjustment theo MedicineBatch.
7. Không được làm quantity_remaining âm.
8. Confirmed adjustment không được sửa trực tiếp.
9. Correction nên xử lý bằng reverse/correction adjustment.

Không thuộc MVP:

1. Direct edit quantity.
2. Adjustment không có reason.
3. Adjustment không có audit.
4. Approval workflow nhiều cấp.

### 11.8. Sales POS & Draft Order

MVP bao gồm:

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

Order status MVP:

1. DRAFT.
2. PAID.
3. CANCELLED.

Không thuộc MVP:

1. READY_FOR_CHECKOUT.
2. PENDING.
3. SHIPPING.
4. COMPLETED.
5. Delivery/shipping flow.
6. Online cart checkout.

### 11.9. Interaction Checking & InteractionAlert

MVP bao gồm:

1. DrugInteraction Rule ở cấp ActiveIngredient–ActiveIngredient.
2. Severity gồm LOW, MEDIUM và HIGH.
3. Admin quản lý interaction rules.
4. POS kiểm tra interaction theo Order.
5. InteractionAlert được persist cho mọi alert đã hiển thị.
6. Alert hiển thị lại thì cập nhật display information.
7. Alert không còn áp dụng thì chuyển inactive, không xóa lịch sử.
8. HIGH alert bắt buộc acknowledgement.
9. HIGH alert bắt buộc consultation note.
10. HIGH alert phải hoàn tất trước checkout.
11. Admin có InteractionAlert History.
12. Warehouse không truy cập interaction alerts trong MVP.

Không thuộc MVP:

1. Medicine–Medicine interaction rule làm official rule.
2. CRITICAL severity.
3. Xóa alert khỏi lịch sử.
4. HIGH alert chỉ advisory.
5. Checkout bỏ qua unresolved HIGH alert.

### 11.10. Checkout, Payment & Invoice

MVP bao gồm:

1. Checkout là command nghiệp vụ chính thức để hoàn tất đơn hàng.
2. Checkout chạy trong transaction.
3. Checkout kiểm tra order, stock, HIGH alert và quyền truy cập.
4. Checkout áp dụng FEFO.
5. Checkout tạo batch allocation.
6. Checkout tạo payment attempt.
7. Checkout chuyển order sang PAID nếu payment success.
8. Checkout tạo invoice trong cùng luồng.
9. Checkout ghi audit.
10. Checkout hỗ trợ idempotency.
11. Payment simulation có SUCCESS và FAILED.
12. Cash payment có amount tendered và change amount.
13. Simulated bank transfer có transaction reference.
14. Mỗi PAID order có một invoice.

Không thuộc MVP:

1. Real bank integration.
2. Refund.
3. Return.
4. Payment gateway production.
5. Reconciliation phức tạp.
6. Public command tách rời để hoàn tất order ngoài checkout.

### 11.11. AI Copilot, Guardrail & Audit

MVP bao gồm:

1. Google AI Provider là provider ưu tiên.
2. MockAI là fallback.
3. AI Copilot giải thích cảnh báo tương tác thuốc.
4. AI Copilot tạo consultation note draft.
5. AI chỉ hỗ trợ tham khảo.
6. AI Guardrail kiểm soát input/output.
7. AI Audit Log ghi nhận tác vụ AI quan trọng.
8. Prompt templates có version.
9. AI không tự động lưu official consultation note nếu Staff chưa xác nhận.
10. AI không lưu raw PII trong audit.

Không thuộc MVP:

1. AI chẩn đoán bệnh.
2. AI kê đơn thuốc.
3. AI đưa liều dùng cụ thể.
4. AI Cache.
5. AI-generated business report narrative bắt buộc.
6. Admin prompt editing UI bắt buộc.
7. Admin provider/model config UI bắt buộc.

### 11.12. Knowledge Graph, Graph Sync & Graph-RAG

MVP bao gồm:

1. Neo4j graph projection.
2. PostgreSQL là source of truth.
3. Core graph gồm Medicine, ActiveIngredient, CONTAINS và INTERACTS_WITH.
4. Graph Sync đồng bộ dữ liệu từ PostgreSQL sang Neo4j.
5. Graph Sync có outbox, worker, retry, audit/log và freshness detection.
6. Graph-RAG là module riêng.
7. Khi graph unavailable/stale, interaction explanation fallback sang PostgreSQL authoritative context.
8. Pure graph query không có fallback thì trả safe error.

Không thuộc MVP:

1. Neo4j làm source of truth.
2. Medicine–Medicine interaction edge làm authoritative rule.
3. DrugGroup taxonomy nếu chưa có nguồn authoritative.
4. Symptom/Condition/RedFlag/Recommendation graph enrichment bắt buộc.
5. Raw Cypher cho Staff.
6. Graph Sync Status/retry UI bắt buộc.

### 11.13. Reports

MVP bao gồm:

1. Revenue Report.
2. Top Medicines Report.
3. Inventory Report.

Reports phải deterministic và không phụ thuộc AI.

Không thuộc MVP:

1. Advanced analytics.
2. Forecast nâng cao.
3. AI-generated report narrative bắt buộc.
4. Reorder suggestion bắt buộc.

### 11.14. System Settings

MVP bao gồm:

1. Simple Admin System Settings screen.
2. Cấu hình near-expiry threshold.
3. Default near-expiry threshold là 90 ngày.

Không thuộc MVP:

1. Full system configuration portal.
2. Generic System Audit Log UI bắt buộc.
3. Admin AI provider/model configuration UI bắt buộc.

### 11.15. Data, Seed & Demo Reset

MVP bao gồm:

1. Curated operational seed.
2. Demo users.
3. Demo medicines.
4. Demo active ingredients.
5. Demo batches.
6. Demo interaction rules.
7. Demo orders.
8. Demo AI/Graph data đủ để trình bày.
9. Local demo reset workflow.
10. Smoke test sau demo reset.

Không thuộc MVP:

1. Dùng nguyên real catalog data làm operational seed.
2. Dùng dữ liệu cá nhân thật.
3. Demo reset ở demo/staging/production.
4. Full 100-table implementation.

---

## 12. MVP Acceptance Criteria cấp cao

MVP được xem là đạt ở cấp sản phẩm nếu thỏa các tiêu chí sau:

| Nhóm                 | Acceptance criteria cấp cao                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------- |
| Authentication       | Người dùng đăng nhập bằng Supabase Auth và có profile nội bộ tương ứng                      |
| Authorization        | Admin, Staff và Warehouse truy cập đúng chức năng và đúng phạm vi dữ liệu                   |
| Medicine             | Quản lý được Medicine và trạng thái active/inactive                                         |
| ActiveIngredient     | Quản lý được ActiveIngredient và mapping với Medicine                                       |
| Supplier             | Warehouse có thể tạo/cập nhật supplier; Admin có thể deactivate                             |
| Inventory            | Tồn kho được quản lý theo MedicineBatch, không dùng aggregate inventory làm source of truth |
| Stock Import         | Confirm Stock Import cập nhật MedicineBatch đúng rule                                       |
| Inventory Adjustment | Adjustment có reason, audit và không làm quantity âm                                        |
| POS                  | Staff tạo Draft Order và thêm thuốc vào đơn                                                 |
| Interaction          | Hệ thống phát hiện interaction dựa trên ActiveIngredient rule                               |
| InteractionAlert     | Alert đã hiển thị được persist và có lifecycle rõ ràng                                      |
| HIGH alert           | Checkout bị chặn nếu HIGH alert chưa acknowledgement hoặc chưa có consultation note         |
| Checkout             | Checkout hoàn tất order, payment, invoice và trừ kho trong transaction                      |
| FEFO                 | Stock deduction ưu tiên batch gần hết hạn trước                                             |
| Payment              | Payment simulation có SUCCESS/FAILED và không có nhiều successful payment cho cùng order    |
| Invoice              | Invoice tạo sau successful payment                                                          |
| AI                   | AI Copilot giải thích cảnh báo/tạo draft trong phạm vi guardrail                            |
| AI Safety            | AI không chẩn đoán, không kê đơn, không đưa liều dùng cụ thể                                |
| AI Audit             | Tác vụ AI quan trọng có audit metadata, không lưu raw PII                                   |
| Graph                | Neo4j là projection được đồng bộ từ PostgreSQL                                              |
| Graph Sync           | Có outbox/worker/retry/audit/freshness detection ở backend                                  |
| Graph-RAG            | Graph-RAG tách riêng và có fallback/safe error phù hợp                                      |
| Reports              | Revenue, Top Medicines và Inventory Report hoạt động deterministic                          |
| Data                 | Có curated seed đủ để demo                                                                  |
| Demo reset           | Reset chỉ chạy local và tạo lại trạng thái demo ổn định                                     |
| Documentation        | Các tài liệu sau bám đúng baseline và không quay lại quyết định cũ                          |

Các tiêu chí trên là acceptance criteria cấp cao. Test case chi tiết sẽ được viết trong Document 20.

---

## 13. Should-have Scope

Should-have là phạm vi nên có nếu còn thời gian, nhưng không chặn MVP.

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
10. Notification nếu còn thời gian.
11. Supabase Storage nếu cần lưu file.
12. Supabase Realtime nếu có nhu cầu realtime.
13. Forecast tồn kho đơn giản nếu đủ thời gian.
14. Reorder suggestion đơn giản nếu đủ thời gian.
15. Một số UX improvement không làm thay đổi business rule.

Quy tắc với Should-have:

1. Không được làm chậm MVP.
2. Không được thay thế MVP core.
3. Không được làm sai baseline.
4. Nếu không hoàn thành, sản phẩm vẫn được xem là đạt MVP nếu các phần MVP đã hoàn thành.
5. Nếu được triển khai, phải có tài liệu, test và Jira tương ứng.

---

## 14. Future / Commercial Expansion Scope

Future / Commercial Expansion là phạm vi mở rộng sau MVP hoặc khi phát triển thành sản phẩm thương mại.

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

Các nội dung Future / Commercial Expansion không được đưa vào MVP nếu chưa có quyết định scope change chính thức.

---

## 15. Out of Scope

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

## 16. Product Constraints

### 16.1. Ràng buộc công nghệ

1. Frontend dùng Next.js.
2. Backend dùng NestJS / Node.js.
3. ORM dùng Prisma.
4. Authentication dùng Supabase Auth.
5. PostgreSQL là source of truth.
6. Neo4j là graph projection.
7. Google AI Provider là provider ưu tiên.
8. MockAI là fallback.
9. Docker không phải setup chính thức.

### 16.2. Ràng buộc nghiệp vụ

1. MedicineBatch là source of truth cho inventory.
2. Checkout phải áp dụng FEFO.
3. Checkout phải là transaction chính thức.
4. Payment và invoice không được tách rời khỏi checkout flow để hoàn tất order.
5. DrugInteraction Rule ở cấp ActiveIngredient–ActiveIngredient.
6. HIGH alert phải acknowledgement và có consultation note trước checkout.
7. PAID order không được sửa hoặc cancel trực tiếp.
8. Refund và return ngoài MVP.

### 16.3. Ràng buộc an toàn AI

1. AI không được chẩn đoán bệnh.
2. AI không được kê đơn.
3. AI không được đưa liều dùng cụ thể.
4. AI không thay thế chuyên gia y tế.
5. AI output phải được kiểm soát bằng guardrail.
6. AI-generated consultation note chỉ là draft cho đến khi Staff xác nhận.
7. AI Audit Log không lưu raw PII.

### 16.4. Ràng buộc dữ liệu

1. Real catalog data chỉ là reference.
2. MVP cần curated operational seed.
3. Không dùng toàn bộ scraped ingredients làm official ActiveIngredient.
4. Không seed selling_price bằng 0.
5. Demo data không dùng dữ liệu cá nhân thật.
6. Demo inventory phải tái tạo được từ transactions.

### 16.5. Ràng buộc thời gian và release

1. Deadline cuối trước ngày 17/06/2026.
2. Target release/demo freeze nên trước hoặc trong ngày 16/06/2026.
3. Do thời gian ngắn, ưu tiên execution cycles ngắn.
4. Scope change phải được Project Leader/scope owner phê duyệt.
5. Jira hiện có cần major revision theo baseline mới.

---

## 17. Recommended MVP Demo Flows

Các demo flow dưới đây là luồng đề xuất ở cấp sản phẩm. Chi tiết script demo và checklist sẽ được viết trong Document 20.

### 17.1. Demo Flow 1 — Login và phân quyền

Mục tiêu:

1. Chứng minh Supabase Auth hoạt động.
2. Chứng minh Admin, Staff và Warehouse có quyền khác nhau.
3. Chứng minh frontend visibility không thay thế backend authorization.

Luồng tổng quan:

1. Đăng nhập bằng Admin.
2. Quan sát menu/quyền Admin.
3. Đăng nhập bằng Staff.
4. Quan sát Staff chỉ thấy chức năng bán hàng phù hợp.
5. Đăng nhập bằng Warehouse.
6. Quan sát Warehouse chỉ thấy chức năng kho phù hợp.

### 17.2. Demo Flow 2 — Medicine, ActiveIngredient và Supplier

Mục tiêu:

1. Chứng minh Medicine và ActiveIngredient là dữ liệu lõi.
2. Chứng minh Medicine mapping với ActiveIngredient.
3. Chứng minh Supplier Management thuộc MVP.

Luồng tổng quan:

1. Admin xem danh sách Medicine.
2. Admin xem/mapping ActiveIngredient.
3. Warehouse tạo hoặc cập nhật Supplier.
4. Admin có quyền deactivate Supplier nếu cần demo.

### 17.3. Demo Flow 3 — Stock Import và MedicineBatch

Mục tiêu:

1. Chứng minh MedicineBatch là source of truth.
2. Chứng minh Stock Import khi confirm mới cập nhật batch.
3. Chứng minh batch number và expiry date quan trọng.

Luồng tổng quan:

1. Warehouse tạo Stock Import dạng Draft.
2. Thêm medicine, batch number, expiry date và quantity.
3. Confirm Stock Import.
4. Kiểm tra Inventory Summary và Batch Detail.

### 17.4. Demo Flow 4 — Inventory Adjustment

Mục tiêu:

1. Chứng minh không sửa trực tiếp tồn kho.
2. Chứng minh adjustment có reason và audit.
3. Chứng minh không cho quantity âm.

Luồng tổng quan:

1. Warehouse tạo Inventory Adjustment.
2. Nhập reason.
3. Confirm adjustment.
4. Kiểm tra tồn kho thay đổi theo batch.
5. Kiểm tra audit hoặc evidence tương ứng.

### 17.5. Demo Flow 5 — POS, InteractionAlert và HIGH alert handling

Mục tiêu:

1. Chứng minh Staff tạo Draft Order.
2. Chứng minh interaction checking theo order.
3. Chứng minh InteractionAlert được persist.
4. Chứng minh HIGH alert cần acknowledgement và consultation note.

Luồng tổng quan:

1. Staff tạo Draft Order.
2. Thêm hai medicine có interaction.
3. Hệ thống hiển thị alert.
4. Staff xem cảnh báo.
5. Staff acknowledge HIGH alert.
6. Staff nhập consultation note.
7. Alert được lưu trong order context.
8. Admin có thể xem InteractionAlert History.

### 17.6. Demo Flow 6 — AI Copilot, Guardrail và Audit

Mục tiêu:

1. Chứng minh AI hỗ trợ giải thích cảnh báo.
2. Chứng minh AI chỉ tạo draft.
3. Chứng minh AI có guardrail và audit.

Luồng tổng quan:

1. Staff bấm yêu cầu AI giải thích alert.
2. AI trả nội dung tham khảo có disclaimer.
3. Staff có thể dùng draft để hỗ trợ note.
4. AI từ chối hoặc chặn nội dung vượt phạm vi nếu input yêu cầu chẩn đoán/kê đơn/liều dùng.
5. Admin hoặc người demo kiểm tra evidence của AI Audit.

### 17.7. Demo Flow 7 — Checkout transaction và FEFO

Mục tiêu:

1. Chứng minh checkout là transaction chính thức.
2. Chứng minh FEFO hoạt động.
3. Chứng minh payment và invoice được tạo sau checkout.
4. Chứng minh batch allocation được lưu.

Luồng tổng quan:

1. Staff checkout Draft Order hợp lệ.
2. Hệ thống kiểm tra stock và HIGH alert.
3. Hệ thống trừ batch theo FEFO.
4. Hệ thống tạo payment simulation.
5. Hệ thống tạo invoice.
6. Kiểm tra Inventory Summary sau bán.

### 17.8. Demo Flow 8 — Reports

Mục tiêu:

1. Chứng minh reports deterministic.
2. Chứng minh reports không phụ thuộc AI.
3. Chứng minh revenue, top medicines và inventory report có dữ liệu.

Luồng tổng quan:

1. Admin mở Revenue Report.
2. Admin mở Top Medicines Report.
3. Admin/Warehouse mở Inventory Report.
4. Đối chiếu report với demo data.

### 17.9. Demo Flow 9 — Graph Sync và Graph-RAG

Mục tiêu:

1. Chứng minh Neo4j là graph projection.
2. Chứng minh Graph Sync có vai trò đồng bộ.
3. Chứng minh Graph-RAG tách riêng khỏi AI Copilot.
4. Chứng minh fallback khi graph stale/unavailable nếu có kịch bản demo phù hợp.

Luồng tổng quan:

1. Xem graph relation Medicine–ActiveIngredient–Interaction.
2. Chạy Graph-RAG query được phép.
3. Hiển thị provenance hoặc context ở mức demo.
4. Mô tả fallback nếu graph không available.

---

## 18. Implementation Priority

### 18.1. Priority P0 — Baseline blockers

Các phần này phải được ưu tiên cao nhất vì nếu thiếu sẽ làm sai baseline:

1. Supabase Auth.
2. User profile và RBAC.
3. Medicine.
4. ActiveIngredient.
5. Supplier.
6. MedicineBatch.
7. Stock Import.
8. Inventory Adjustment.
9. POS Draft Order.
10. Checkout transaction.
11. FEFO.
12. InteractionAlert lifecycle.
13. HIGH alert acknowledgement và consultation note.

### 18.2. Priority P1 — MVP technical differentiators

Các phần này là điểm khác biệt kỹ thuật của MVP:

1. AI Copilot.
2. AI Guardrail.
3. AI Audit.
4. Google AI Provider configuration.
5. MockAI fallback.
6. Neo4j projection.
7. Graph Sync.
8. Graph-RAG.
9. Graph freshness/fallback behavior.
10. Curated demo seed.

### 18.3. Priority P2 — MVP supporting features

Các phần này hỗ trợ vận hành và demo:

1. Reports.
2. System Settings.
3. Order History.
4. Order Detail.
5. Invoice view/print.
6. Inventory Summary.
7. Batch Detail.
8. InteractionAlert History.
9. Demo reset.
10. Smoke tests.

### 18.4. Priority P3 — Should-have

Các phần này nên làm nếu còn thời gian:

1. Full Customer Management.
2. Graph Sync Status UI.
3. Prompt editing UI.
4. AI provider/model configuration UI.
5. Generic System Audit Log UI.
6. Advanced charts.
7. AI-generated report narrative.

### 18.5. Priority P4 — Future / Commercial Expansion

Các phần này không phục vụ MVP hiện tại:

1. Online commerce.
2. Multi-store.
3. Multi-warehouse.
4. Refund/return.
5. Real bank integration.
6. Product variant commerce.
7. AI Cache.
8. Advanced medical graph enrichment.
9. CRITICAL severity.
10. Full 100-table implementation.

---

## 19. Assumptions

Các giả định của sản phẩm gồm:

1. Hệ thống phục vụ đồ án và demo, không phải hệ thống y tế production.
2. Người dùng chính là nhân sự nội bộ: Admin, Staff và Warehouse.
3. Customer không đăng nhập trong MVP.
4. Dữ liệu thuốc, hoạt chất, interaction và AI output trong demo là dữ liệu mẫu/curated seed.
5. Supabase Auth được dùng cho authentication.
6. PostgreSQL là source of truth.
7. Neo4j chỉ là graph projection.
8. Google AI Provider có thể được dùng nếu có cấu hình phù hợp.
9. MockAI luôn có để fallback khi provider thật lỗi hoặc không sẵn sàng.
10. Demo reset chỉ chạy ở local environment.
11. Nhóm có thể dùng cloud Supabase và Neo4j AuraDB nếu điều kiện cho phép.
12. Reports MVP dùng dữ liệu deterministic, không phụ thuộc AI.
13. Payment trong MVP là simulation, không tích hợp ngân hàng thật.
14. Scope changes phải được Project Leader/scope owner phê duyệt.
15. Tài liệu cũ chỉ còn vai trò tham khảo nếu mâu thuẫn baseline mới.

---

## 20. Dependencies

### 20.1. Dependency giữa module nghiệp vụ

1. POS phụ thuộc Medicine, MedicineBatch và Interaction.
2. Checkout phụ thuộc Order, Inventory, InteractionAlert, Payment và Invoice.
3. FEFO phụ thuộc MedicineBatch.
4. Interaction checking phụ thuộc Medicine–ActiveIngredient mapping và DrugInteraction Rule.
5. Reports phụ thuộc Order, Payment, Invoice và Inventory.
6. Inventory Summary phụ thuộc MedicineBatch.
7. Demo flow phụ thuộc curated seed.

### 20.2. Dependency kỹ thuật

1. Frontend phụ thuộc backend API.
2. Backend phụ thuộc Supabase Auth token verification.
3. Backend phụ thuộc PostgreSQL.
4. Prisma phụ thuộc schema và migration đúng baseline.
5. Graph Sync phụ thuộc PostgreSQL source data.
6. Graph-RAG phụ thuộc graph projection hoặc PostgreSQL fallback.
7. AI Copilot phụ thuộc AI provider configuration và guardrail.
8. AI Audit phụ thuộc backend logging flow.

### 20.3. Dependency tài liệu

1. Document 03 phụ thuộc Document 01 và Document 04.
2. Document 05 phụ thuộc Document 03.
3. Document 06 phụ thuộc Document 03, 04 và 05.
4. Document 07 phụ thuộc Document 06.
5. Document 08 phụ thuộc Document 05, 06 và 07.
6. Document 12 phụ thuộc Document 06, 07 và 08.
7. Document 13/14 phụ thuộc Document 06 và 12.
8. Document 15 phụ thuộc Document 03, 06, 07 và 08.
9. Document 16 phụ thuộc Document 03, 04 và 06.
10. Document 17 phụ thuộc Document 03, 04, 06 và 10.
11. Document 18 phụ thuộc Document 03, 06, 13, 14, 16 và 17.
12. Document 19 phụ thuộc Document 03, 04 và toàn bộ delivery scope.
13. Document 20 phụ thuộc Document 06, 12, 13, 15, 16, 17 và 18.

---

## 21. Risks

| Rủi ro                          | Ảnh hưởng                                     | Cách xử lý định hướng                                               |
| ------------------------------- | --------------------------------------------- | ------------------------------------------------------------------- |
| Scope quá rộng                  | Không kịp hoàn thành MVP                      | Bám Document 03 và Document 04; không thêm scope mới nếu chưa duyệt |
| Quay lại thiết kế cũ            | Tài liệu và implementation mâu thuẫn baseline | Dùng Document 01/04 làm nguồn kiểm tra                              |
| Custom auth quay lại            | Sai baseline bảo mật                          | Giữ Supabase Auth là authentication chính thức                      |
| Inventory không theo batch      | FEFO và traceability không đạt                | MedicineBatch là source of truth                                    |
| Checkout không transaction      | Dễ sai order/payment/invoice/inventory        | Checkout phải là luồng nghiệp vụ chính thức                         |
| HIGH alert không bắt buộc note  | Sai baseline safety                           | Block checkout nếu HIGH alert chưa đủ xử lý                         |
| AI sinh nội dung y tế nguy hiểm | Rủi ro an toàn và sai phạm vi                 | Input/output guardrail, safe refusal và audit                       |
| Provider AI lỗi                 | Demo AI thất bại                              | MockAI fallback                                                     |
| Neo4j stale/unavailable         | Graph-RAG hoặc explanation lỗi                | PostgreSQL fallback cho interaction explanation                     |
| Dữ liệu demo thiếu              | Không demo được điểm nổi bật                  | Curated seed và smoke test                                          |
| Jira cũ sai baseline            | Task triển khai lệch                          | Major revision Jira theo Document 04                                |
| Deadline ngắn                   | Không đủ thời gian làm Should-have            | Ưu tiên P0/P1, đẩy phần còn lại sang Should-have/Future             |
| Không có owner release          | Demo thiếu điều phối                          | Document 19 phải assign Release/Demo Owner và backup                |
| Test phá demo database          | Mất dữ liệu demo                              | Destructive tests chỉ chạy local/non-demo với cleanup               |

---

## 22. Traceability định hướng

Document 03 tạo traceability định hướng cho các tài liệu sau:

| Nội dung trong Document 03      | Tài liệu triển khai chi tiết                                                 |
| ------------------------------- | ---------------------------------------------------------------------------- |
| Product vision                  | Document 02, Document 05                                                     |
| Product scope                   | Document 05, Document 06                                                     |
| MVP scope                       | Document 06, Document 08, Document 15, Document 19, Document 20              |
| Should-have/Future/Out of Scope | Document 04, Document 19                                                     |
| User groups                     | Document 07, Document 08, Document 15                                        |
| Medicine/Inventory scope        | Document 06, Document 12, Document 13, Document 14, Document 15              |
| Checkout scope                  | Document 06, Document 08, Document 12, Document 13, Document 14, Document 20 |
| Interaction scope               | Document 06, Document 08, Document 12, Document 13, Document 15              |
| AI scope                        | Document 06, Document 12, Document 16, Document 20                           |
| Graph scope                     | Document 10, Document 12, Document 17, Document 20                           |
| Data/demo scope                 | Document 18, Document 20                                                     |
| Jira/release scope              | Document 19                                                                  |
| Acceptance criteria cấp cao     | Document 06, Document 20                                                     |
| Risks                           | Document 19, Document 20                                                     |

Quy tắc traceability:

1. BRD phải bám product value và business scope trong Document 03.
2. SRS phải chuyển MVP scope thành functional/non-functional requirements.
3. Use Case phải phản ánh actor và MVP flows đã nêu.
4. UI/UX phải phản ánh target users và MVP demo flows.
5. Jira phải phân loại đúng MVP, Should-have, Future và Out of Scope.
6. Testing phải ưu tiên high-risk MVP flows.
7. Data Seed Plan phải tạo đủ dữ liệu để demo các scope đã chốt.

---

## 23. Quality Checklist

Checklist này dùng để kiểm tra Document 03 và các tài liệu scope liên quan.

### 23.1. Checklist scope

| Câu hỏi kiểm tra                                                      | Đạt khi |
| --------------------------------------------------------------------- | ------- |
| Tài liệu có nêu rõ product vision không?                              | Có      |
| Tài liệu có nêu rõ problem statement không?                           | Có      |
| Tài liệu có xác định target users không?                              | Có      |
| Tài liệu có phân biệt MVP, Should-have, Future và Out of Scope không? | Có      |
| Tài liệu có tránh viết quá chi tiết như SRS không?                    | Có      |
| Tài liệu có tránh API/schema/test case chi tiết không?                | Có      |
| Tài liệu có bám Document 01 và Document 04 không?                     | Có      |

### 23.2. Checklist MVP

| Câu hỏi kiểm tra                            | Đạt khi |
| ------------------------------------------- | ------- |
| Supabase Auth có thuộc MVP không?           | Có      |
| Multi-role RBAC có thuộc MVP không?         | Có      |
| Supplier Management có thuộc MVP không?     | Có      |
| MedicineBatch có là MVP không?              | Có      |
| FEFO có là MVP không?                       | Có      |
| Checkout transaction có là MVP không?       | Có      |
| InteractionAlert lifecycle có là MVP không? | Có      |
| HIGH acknowledgement/note có là MVP không?  | Có      |
| AI Guardrail và AI Audit có là MVP không?   | Có      |
| Graph Sync và Graph-RAG có là MVP không?    | Có      |
| Basic reports có là MVP không?              | Có      |
| Curated operational seed có là MVP không?   | Có      |

### 23.3. Checklist Should-have/Future/Out of Scope

| Câu hỏi kiểm tra                                           | Đạt khi |
| ---------------------------------------------------------- | ------- |
| Full Customer Management có được đặt Should-have không?    | Có      |
| Graph Sync Status UI có phải Should-have không?            | Có      |
| Prompt editing UI có phải Should-have không?               | Có      |
| Full 100-table schema có bị loại khỏi MVP không?           | Có      |
| Online commerce có được đưa vào Future không?              | Có      |
| Refund/return có nằm ngoài MVP không?                      | Có      |
| Real bank integration có nằm ngoài MVP không?              | Có      |
| AI diagnosis/prescribing/dosage có nằm Out of Scope không? | Có      |

### 23.4. Checklist safety

| Câu hỏi kiểm tra                                           | Đạt khi |
| ---------------------------------------------------------- | ------- |
| AI không chẩn đoán bệnh không?                             | Có      |
| AI không kê đơn không?                                     | Có      |
| AI không đưa liều dùng cụ thể không?                       | Có      |
| AI không thay thế chuyên gia y tế không?                   | Có      |
| AI Audit không lưu raw PII không?                          | Có      |
| Demo không dùng dữ liệu cá nhân thật không?                | Có      |
| Graph stale/unavailable có fallback hoặc safe error không? | Có      |

---

## 24. Kết luận

Document 03 — Vision & Scope Document xác định tầm nhìn và phạm vi sản phẩm chính thức của **PharmaAssist AI Intelligence**.

Sản phẩm được định hướng là một hệ thống quản lý nhà thuốc nội bộ có khả năng hỗ trợ bán thuốc tại quầy, quản lý thuốc, hoạt chất, supplier, batch inventory, stock import, inventory adjustment, interaction checking, checkout, payment simulation, invoice, reports, AI Copilot, AI Guardrail, AI Audit, Neo4j graph projection, Graph Sync và Graph-RAG.

Phạm vi MVP đã được xác định rõ:

1. Supabase Auth.
2. Multi-role RBAC.
3. Medicine và ActiveIngredient.
4. Supplier Management.
5. MedicineBatch.
6. FEFO.
7. Stock Import.
8. Inventory Adjustment.
9. POS Draft Order.
10. InteractionAlert lifecycle.
11. HIGH alert acknowledgement và consultation note.
12. Checkout transaction.
13. Payment simulation.
14. Invoice.
15. Basic reports.
16. AI Copilot.
17. AI Guardrail.
18. AI Audit.
19. Neo4j projection.
20. Graph Sync.
21. Graph-RAG.
22. Curated operational seed.
23. Local demo reset workflow.

Document 03 cũng xác định rõ các nội dung Should-have, Future / Commercial Expansion và Out of Scope để tránh scope creep.

Tài liệu này là cơ sở trực tiếp cho:

1. Document 02 — Project Charter.
2. Document 05 — Business Requirements Document.
3. Document 06 — Software Requirements Specification.
4. Document 08 — Use Case Specification.
5. Document 15 — UI/UX Screen Specification.
6. Document 19 — Project Management, Jira & Release Plan.
7. Document 20 — Testing, Demo & Setup Guide.

Sau Document 03, bước tiếp theo hợp lý là viết **Document 02 — Project Charter** để khóa mục tiêu, stakeholder, deliverables, constraints và success criteria cấp dự án.
