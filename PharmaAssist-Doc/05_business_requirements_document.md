# Document 05 — Business Requirements Document

# Tài liệu 05 — Tài liệu yêu cầu nghiệp vụ

---

## Metadata

| Mục               | Nội dung                                                                                                                                                          |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID       | DOC-05                                                                                                                                                            |
| File name         | `05_business_requirements_document.md`                                                                                                                            |
| Document Name     | Business Requirements Document                                                                                                                                    |
| Tên tiếng Việt    | Tài liệu yêu cầu nghiệp vụ                                                                                                                                        |
| Project           | PharmaAssist AI Intelligence                                                                                                                                      |
| Version           | 1.0 Draft                                                                                                                                                         |
| Status            | Draft                                                                                                                                                             |
| Created Date      | 08/06/2026                                                                                                                                                        |
| Last Updated      | 08/06/2026                                                                                                                                                        |
| Owner             | Business Analyst / Project Leader                                                                                                                                 |
| Reviewer          | Nhóm phát triển / Giảng viên hướng dẫn                                                                                                                            |
| Baseline Source   | Document 01 — Project Overview & Current Baseline, Document 03 — Vision & Scope Document, Document 04 — Decision Log & Scope Control, baseline business decisions |
| Related Documents | Document 03, Document 06, Document 08, Document 15, Document 19, Document 20                                                                                      |
| Language Rule     | Nội dung chính viết bằng tiếng Việt; tên file/tên tài liệu có thể giữ tiếng Anh                                                                                   |
| Terminology Rule  | Giữ nguyên tên công nghệ, module, entity, API, table, enum và thuật ngữ kỹ thuật cần thiết bằng tiếng Anh                                                         |

---

## 1. Mục đích tài liệu

Tài liệu **Business Requirements Document** mô tả nhu cầu nghiệp vụ của nhà thuốc và chuyển các nhu cầu đó thành **business requirements cấp nghiệp vụ** cho dự án **PharmaAssist AI Intelligence**.

Mục tiêu chính của tài liệu này:

1. Mô tả bối cảnh nghiệp vụ của hệ thống nhà thuốc.
2. Xác định các vấn đề nghiệp vụ cần giải quyết.
3. Xác định mục tiêu nghiệp vụ của sản phẩm.
4. Ghi nhận nhu cầu của stakeholder.
5. Xác định business actors chính.
6. Mô tả tổng quan các business processes.
7. Xây dựng business capability map.
8. Liệt kê business requirements theo từng nhóm nghiệp vụ.
9. Ghi lại các business rules cấp cao.
10. Xác định business constraints.
11. Phân loại yêu cầu theo MVP, Should-have, Future / Commercial Expansion và Out of Scope.
12. Đưa ra business acceptance criteria cấp cao.
13. Làm đầu vào cho SRS, Use Case, UI/UX, Jira và Testing.

Tài liệu này không phải SRS. Document 05 mô tả **nhà thuốc cần gì ở góc nghiệp vụ**, còn Document 06 sẽ chuyển các business requirements này thành functional requirements, non-functional requirements, business rules có mã chi tiết và acceptance criteria chi tiết hơn.

Tài liệu này không viết API endpoint, database table detail, Prisma Schema, UI layout, test case cụ thể hoặc kiến trúc kỹ thuật sâu.

---

## 2. Người đọc chính

Tài liệu này dành cho các nhóm người đọc sau:

1. **Business Analyst**
   Dùng tài liệu này để xác định nhu cầu nghiệp vụ, business process và business rules cấp cao.

2. **Project Leader**
   Dùng tài liệu này để kiểm soát phạm vi nghiệp vụ và đảm bảo MVP không lệch baseline.

3. **Developer**
   Dùng tài liệu này để hiểu lý do nghiệp vụ phía sau các chức năng trước khi đọc SRS/API/ERD chi tiết.

4. **Tester**
   Dùng tài liệu này để hiểu business acceptance criteria và các nghiệp vụ cần ưu tiên kiểm thử.

5. **UI/UX Designer**
   Dùng tài liệu này để hiểu actor, process và nhu cầu người dùng trước khi thiết kế màn hình.

6. **Giảng viên hướng dẫn / Người đánh giá**
   Dùng tài liệu này để đánh giá tính hợp lý của yêu cầu nghiệp vụ và phạm vi đồ án.

---

## 3. Business Context

PharmaAssist AI Intelligence được xây dựng cho bối cảnh nhà thuốc nhỏ hoặc vừa, nơi các nghiệp vụ chính gồm quản lý thuốc, quản lý nhà cung cấp, nhập kho, theo dõi tồn kho, bán thuốc tại quầy, thanh toán, xuất hóa đơn, báo cáo và kiểm soát rủi ro tương tác thuốc.

Trong bối cảnh này, nhà thuốc cần một hệ thống hỗ trợ:

1. Quản lý danh mục thuốc.
2. Quản lý hoạt chất của thuốc.
3. Quản lý nhà cung cấp.
4. Quản lý nhập kho theo lô.
5. Quản lý tồn kho theo hạn dùng.
6. Theo dõi thuốc hết hạn, gần hết hạn và sắp hết hàng.
7. Điều chỉnh tồn kho có lý do và truy vết.
8. Bán thuốc tại quầy cho khách lẻ.
9. Kiểm tra tồn kho bán được trong quá trình bán.
10. Kiểm tra tương tác thuốc dựa trên hoạt chất.
11. Lưu lịch sử cảnh báo tương tác đã hiển thị.
12. Bắt buộc xử lý cảnh báo HIGH trước khi hoàn tất thanh toán.
13. Mô phỏng thanh toán và tạo hóa đơn.
14. Xem báo cáo doanh thu, thuốc bán chạy và tồn kho.
15. Sử dụng AI để hỗ trợ giải thích cảnh báo trong phạm vi an toàn.
16. Sử dụng Knowledge Graph để thể hiện quan hệ thuốc, hoạt chất và tương tác.
17. Có dữ liệu demo đủ rõ để trình bày đồ án.

Hệ thống không nhằm thay thế chuyên gia y tế, không chẩn đoán bệnh, không kê đơn và không đưa ra hướng dẫn liều dùng cụ thể.

Hệ thống cũng không nhằm trở thành nền tảng thương mại điện tử đầy đủ trong MVP. Các chức năng như online commerce, cart, wishlist, shipping, refund, return, real bank integration và multi-store/multi-warehouse được phân loại là Future / Commercial Expansion hoặc Out of Scope trong phạm vi hiện tại.

---

## 4. Business Problem

### 4.1. Vấn đề quản lý thuốc và hoạt chất

Nhà thuốc cần quản lý thuốc một cách nhất quán, nhưng nếu dữ liệu thuốc và hoạt chất không được chuẩn hóa thì sẽ phát sinh các vấn đề:

1. Khó xác định thuốc nào chứa hoạt chất nào.
2. Khó kiểm tra tương tác thuốc dựa trên thành phần hoạt chất.
3. Dễ nhầm lẫn giữa tên thương mại và hoạt chất.
4. Khó quản lý thuốc active/inactive.
5. Khó đảm bảo thuốc được bán có giá hợp lệ.
6. Khó tạo dữ liệu demo đáng tin cậy nếu active ingredients không được curated.

### 4.2. Vấn đề nhà cung cấp và nhập kho

Nhà thuốc cần biết thuốc được nhập từ nhà cung cấp nào, nhập khi nào và nhập theo lô nào.

Nếu không quản lý Supplier và Stock Import rõ ràng:

1. Không truy được nguồn nhập.
2. Không biết batch nào đến từ đợt nhập nào.
3. Không kiểm soát được batch number và expiry date.
4. Không phân biệt được phiếu nhập nháp và phiếu nhập đã xác nhận.
5. Có rủi ro cộng kho nhiều lần nếu phiếu nhập bị confirm lặp.
6. Khó audit các thay đổi quan trọng.

### 4.3. Vấn đề tồn kho theo lô và hạn dùng

Tồn kho nhà thuốc không thể chỉ được quản lý bằng tổng số lượng theo thuốc. Thuốc có hạn dùng, batch number và nguồn nhập khác nhau.

Nếu không quản lý theo MedicineBatch:

1. Không biết còn bao nhiêu thuốc ở từng batch.
2. Không biết batch nào sắp hết hạn.
3. Không loại trừ batch đã hết hạn khỏi sellable stock.
4. Không áp dụng được FEFO.
5. Không truy vết được thuốc bán ra lấy từ batch nào.
6. Không tính chính xác low-stock và near-expiry.
7. Không kiểm soát được điều chỉnh tồn kho theo batch.

### 4.4. Vấn đề bán hàng tại quầy

Trong quá trình bán thuốc, Staff cần thao tác nhanh nhưng vẫn phải đảm bảo chính xác:

1. Tạo đơn nháp.
2. Thêm thuốc vào đơn.
3. Xem tồn kho bán được.
4. Xem cảnh báo liên quan đến thuốc trong đơn.
5. Xử lý cảnh báo HIGH nếu có.
6. Thanh toán.
7. Nhận hóa đơn.
8. Giữ lịch sử order.

Nếu POS không kiểm tra tồn kho, interaction và trạng thái order, nhà thuốc có thể bán sai số lượng, bỏ qua cảnh báo hoặc tạo dữ liệu bán hàng không nhất quán.

### 4.5. Vấn đề checkout, payment và invoice

Checkout là nghiệp vụ quan trọng vì liên quan cùng lúc đến:

1. Order.
2. Stock.
3. FEFO.
4. Payment.
5. Invoice.
6. Interaction safety.
7. Audit.

Nếu payment và invoice bị tách rời khỏi checkout transaction:

1. Có thể trừ kho nhưng chưa tạo invoice.
2. Có thể tạo payment nhiều lần.
3. Có thể tạo invoice không gắn payment thành công.
4. Có thể bán vượt tồn kho.
5. Có thể bỏ qua HIGH alert chưa xử lý.
6. Khó rollback khi lỗi.

### 4.6. Vấn đề tương tác thuốc

Tương tác thuốc nên được kiểm tra dựa trên hoạt chất, không chỉ dựa trên tên thuốc thương mại.

Nếu interaction rule ở cấp Medicine–Medicine:

1. Dễ bỏ sót thuốc khác có cùng hoạt chất.
2. Dữ liệu rule khó tái sử dụng.
3. Dễ tạo duplicate rule.
4. Không thể hiện đúng bản chất tương tác dược lý ở mức hoạt chất.

Nếu alert chỉ hiển thị mà không persist:

1. Không biết cảnh báo nào đã được hiển thị.
2. Không biết Staff đã xử lý cảnh báo nào.
3. Không có evidence khi review order.
4. Không thể tạo InteractionAlert History.

### 4.7. Vấn đề AI trong bối cảnh nhà thuốc

AI có thể hỗ trợ Staff giải thích cảnh báo tương tác và tạo draft consultation note, nhưng AI cũng có rủi ro nếu không được kiểm soát:

1. AI có thể trả lời như đang chẩn đoán bệnh.
2. AI có thể đưa ra hướng kê đơn.
3. AI có thể đưa liều dùng cụ thể.
4. AI có thể tạo nội dung vượt quá phạm vi an toàn.
5. AI có thể lưu hoặc lộ thông tin nhạy cảm nếu không có PII minimization.
6. AI output không nên tự động trở thành official consultation note.

Do đó, AI cần có Guardrail và Audit.

### 4.8. Vấn đề Knowledge Graph và Graph-RAG

Knowledge Graph giúp thể hiện quan hệ giữa Medicine, ActiveIngredient và DrugInteraction. Tuy nhiên, nếu graph không được đồng bộ từ source of truth hoặc graph stale mà vẫn dùng như dữ liệu chính thức, hệ thống sẽ không đáng tin cậy.

Graph cần được xem là projection từ PostgreSQL, không phải source of truth. Graph-RAG phải có fallback hoặc safe error khi graph không sẵn sàng.

### 4.9. Vấn đề dữ liệu demo

Dự án cần demo được nhiều nghiệp vụ phức tạp. Nếu dữ liệu demo không được curated:

1. Không có batch hết hạn/gần hết hạn để demo inventory.
2. Không có multi-batch scenario để demo FEFO.
3. Không có interaction LOW/MEDIUM/HIGH.
4. Không có HIGH alert đã acknowledge và có consultation note.
5. Không có PAID order đủ payment, invoice và allocation.
6. Không có dữ liệu báo cáo.
7. Không có graph projection nhất quán.
8. Demo reset khó tái tạo.

---

## 5. Business Goals

Business goals của PharmaAssist AI Intelligence gồm:

1. Hỗ trợ nhà thuốc quản lý thuốc và hoạt chất tập trung.
2. Hỗ trợ quản lý nhà cung cấp phục vụ nhập kho.
3. Hỗ trợ quản lý tồn kho theo MedicineBatch thay vì chỉ tổng số lượng.
4. Giảm rủi ro bán thuốc hết hạn.
5. Tự động ưu tiên xuất batch gần hết hạn trước theo FEFO.
6. Hỗ trợ nhập kho có trạng thái và audit.
7. Hỗ trợ điều chỉnh tồn kho có reason và audit.
8. Hỗ trợ bán thuốc tại quầy cho khách lẻ.
9. Hỗ trợ kiểm tra tồn kho bán được trong POS.
10. Hỗ trợ kiểm tra tương tác thuốc dựa trên ActiveIngredient.
11. Lưu lại lịch sử InteractionAlert để truy vết.
12. Bắt buộc Staff/Admin xử lý HIGH alert trước checkout.
13. Hỗ trợ checkout an toàn, nhất quán và có rollback khi lỗi.
14. Hỗ trợ mô phỏng payment và tạo invoice.
15. Cung cấp báo cáo cơ bản cho vận hành.
16. Dùng AI để hỗ trợ giải thích cảnh báo nhưng không thay thế chuyên gia y tế.
17. Dùng Knowledge Graph để thể hiện quan hệ thuốc–hoạt chất–tương tác.
18. Đảm bảo dữ liệu demo có thể reset và tái tạo.
19. Đảm bảo phân quyền theo vai trò và ownership.
20. Đảm bảo scope MVP rõ ràng, không bị trộn với tính năng thương mại mở rộng.

---

## 6. Stakeholder Needs

### 6.1. Project Leader

Project Leader cần:

1. Baseline nghiệp vụ rõ.
2. Scope MVP rõ.
3. Danh sách Should-have/Future/Out of Scope rõ.
4. Business requirements đủ để chuyển sang SRS.
5. Quy tắc không quay lại thiết kế cũ.
6. Traceability từ BRD sang SRS, Use Case, UI, Jira và Testing.
7. Cơ sở để kiểm soát scope change.

### 6.2. Admin / Chủ nhà thuốc

Admin cần:

1. Quản lý user, role và permission.
2. Quản lý Medicine và ActiveIngredient.
3. Quản lý Supplier.
4. Quản lý DrugInteraction Rule.
5. Xem toàn bộ Order.
6. Xem InteractionAlert History.
7. Xem báo cáo.
8. Cấu hình near-expiry threshold.
9. Xem AI Audit nếu cần review sử dụng AI.
10. Có quyền rộng để giám sát hệ thống.

### 6.3. Staff / Nhân viên bán thuốc

Staff cần:

1. Tìm thuốc nhanh trong POS.
2. Xem sellable stock khi bán.
3. Tạo Draft Order.
4. Thêm/sửa/xóa thuốc trong Draft Order.
5. Nhận cảnh báo interaction khi có thuốc tương tác.
6. Xử lý HIGH alert bằng acknowledgement và consultation note.
7. Dùng AI Copilot để hỗ trợ giải thích cảnh báo.
8. Checkout khi order hợp lệ.
9. Xem order mình tạo hoặc xử lý.
10. Không bị rối bởi các chức năng kho/quản trị không thuộc nhiệm vụ.

### 6.4. Warehouse / Nhân viên kho

Warehouse cần:

1. Xem danh sách thuốc và tồn kho.
2. Xem batch detail.
3. Theo dõi thuốc gần hết hạn, hết hạn và low-stock.
4. Tạo/cập nhật Supplier.
5. Tạo và confirm Stock Import.
6. Tạo và confirm Inventory Adjustment.
7. Có reason và audit cho điều chỉnh tồn kho.
8. Không phải xử lý nghiệp vụ bán hàng, payment hoặc interaction alert.

### 6.5. Customer / Khách lẻ

Customer trong MVP không đăng nhập hệ thống, nhưng cần:

1. Mua thuốc tại quầy.
2. Có thể mua dưới dạng khách lẻ.
3. Nhận invoice.
4. Được hưởng lợi gián tiếp từ việc hệ thống kiểm tra interaction và stock.

### 6.6. Developer

Developer cần:

1. Business requirements rõ theo từng module.
2. Business rules rõ.
3. Scope MVP rõ.
4. Không phải đoán lại quyết định cũ.
5. Biết phần nào để SRS/API/ERD/UI chi tiết hóa.
6. Biết phần nào không được đưa vào MVP.

### 6.7. Tester

Tester cần:

1. Business acceptance criteria cấp cao.
2. Danh sách business rules cần test.
3. Biết high-risk business flows.
4. Biết MVP/Should-have/Future để ưu tiên test.
5. Biết luồng nào không thuộc MVP để không xem là blocker sai.

### 6.8. UI/UX Designer

UI/UX Designer cần:

1. Actor và nhu cầu nghiệp vụ rõ.
2. Business process overview.
3. Biết screen nào hỗ trợ nghiệp vụ MVP.
4. Biết Staff/Admin/Warehouse cần thấy gì.
5. Biết phần nào không cần thiết kế trong MVP.

---

## 7. Business Actors

### 7.1. Admin

Admin là actor có quyền quản trị cao nhất.

Admin thực hiện các nghiệp vụ:

1. Quản lý người dùng và phân quyền.
2. Quản lý Medicine.
3. Quản lý ActiveIngredient.
4. Quản lý Supplier ở mức cao.
5. Deactivate Supplier.
6. Quản lý DrugInteraction Rule.
7. Xem InteractionAlert History.
8. Xem toàn bộ Order.
9. Thực hiện nghiệp vụ bán hàng nếu cần.
10. Xem reports.
11. Cấu hình System Settings.
12. Xem AI Audit.
13. Dùng Graph Explorer và Graph-RAG nếu được triển khai trong scope.

### 7.2. Staff

Staff là actor bán thuốc tại quầy.

Staff thực hiện các nghiệp vụ:

1. Tạo Draft Order.
2. Tìm thuốc.
3. Thêm thuốc vào order.
4. Cập nhật số lượng thuốc.
5. Xóa thuốc khỏi Draft Order.
6. Xem sellable stock.
7. Xem InteractionAlert trong order.
8. Acknowledge HIGH alert.
9. Nhập consultation note cho HIGH alert.
10. Dùng AI Copilot trong POS flow.
11. Checkout order nếu hợp lệ.
12. Xem order thuộc ownership scope.
13. Cancel Draft Order thuộc ownership scope.

### 7.3. Warehouse

Warehouse là actor phụ trách nghiệp vụ kho.

Warehouse thực hiện các nghiệp vụ:

1. Xem Medicine.
2. Xem Supplier.
3. Tạo Supplier.
4. Cập nhật Supplier.
5. Tạo Stock Import.
6. Confirm Stock Import.
7. Xem Inventory Summary.
8. Xem Batch Detail.
9. Theo dõi low-stock và near-expiry.
10. Tạo Inventory Adjustment.
11. Confirm Inventory Adjustment.
12. Xem Inventory Report trong phạm vi được cấp.

Warehouse không thực hiện:

1. Tạo Order bán hàng.
2. Checkout.
3. Xem Payment/Invoice.
4. Xem InteractionAlert.
5. Quản lý Interaction Rule.
6. Dùng Graph Explorer trong MVP.

### 7.4. Customer / Khách lẻ

Customer là stakeholder ngoài hệ thống trong MVP.

Customer không đăng nhập và không trực tiếp vận hành hệ thống.

Customer tham gia gián tiếp vào nghiệp vụ:

1. Mua thuốc tại quầy.
2. Được ghi nhận trong Order nếu có Customer Management.
3. Hoặc được xử lý như khách lẻ nếu `customer_id = null`.
4. Nhận invoice.

### 7.5. External Supporting Actors

External supporting actors gồm:

1. Supabase Auth.
2. Google AI Provider.
3. MockAI.
4. Neo4j.
5. GitHub.
6. Jira.

Các actor này không phải người dùng nghiệp vụ nhưng hỗ trợ vận hành hệ thống hoặc quản lý dự án.

---

## 8. Business Process Overview

### 8.1. Process 1 — Quản lý người dùng và phân quyền

Mục tiêu nghiệp vụ:

1. Cho phép Admin quản lý người dùng nội bộ.
2. Đảm bảo mỗi người dùng có role/permission phù hợp.
3. Đảm bảo Staff chỉ thao tác dữ liệu thuộc phạm vi của mình.
4. Đảm bảo Warehouse không truy cập nghiệp vụ bán hàng và interaction alert.

Tổng quan quy trình:

1. Admin tạo hoặc quản lý user profile.
2. Admin gán role.
3. Hệ thống xác định permissions hiệu lực.
4. Người dùng đăng nhập bằng Supabase Auth.
5. Backend kiểm tra permission và ownership trước khi cho thao tác.

### 8.2. Process 2 — Quản lý thuốc và hoạt chất

Mục tiêu nghiệp vụ:

1. Quản lý Medicine phục vụ bán hàng và inventory.
2. Quản lý ActiveIngredient phục vụ interaction checking.
3. Mapping Medicine với ActiveIngredient.

Tổng quan quy trình:

1. Admin tạo/cập nhật Medicine.
2. Admin tạo/cập nhật ActiveIngredient.
3. Admin mapping Medicine với ActiveIngredient.
4. Medicine được dùng trong POS, inventory, reports và interaction checking.

### 8.3. Process 3 — Quản lý Supplier

Mục tiêu nghiệp vụ:

1. Quản lý nhà cung cấp phục vụ nhập kho.
2. Cho phép Warehouse tạo/cập nhật supplier.
3. Chỉ Admin được deactivate supplier.

Tổng quan quy trình:

1. Warehouse tạo hoặc cập nhật Supplier.
2. Supplier được dùng khi tạo Stock Import.
3. Admin có thể deactivate Supplier nếu không còn dùng.
4. Supplier có lịch sử nhập kho không bị xóa cứng.

### 8.4. Process 4 — Nhập kho theo lô

Mục tiêu nghiệp vụ:

1. Ghi nhận thuốc nhập theo batch.
2. Ghi nhận batch number và expiry date.
3. Cập nhật MedicineBatch khi phiếu nhập được confirm.

Tổng quan quy trình:

1. Warehouse tạo Stock Import.
2. Warehouse thêm các dòng thuốc nhập.
3. Mỗi dòng có medicine, batch number, expiry date và quantity.
4. Phiếu nhập ở trạng thái DRAFT trước khi xác nhận.
5. Khi confirm, hệ thống cập nhật MedicineBatch.
6. Phiếu confirmed không được confirm lại.
7. Hệ thống ghi audit cho confirm/cancel.

### 8.5. Process 5 — Theo dõi tồn kho

Mục tiêu nghiệp vụ:

1. Theo dõi tồn kho theo MedicineBatch.
2. Tính sellable stock từ batch còn hạn.
3. Theo dõi batch hết hạn, gần hết hạn và low-stock.

Tổng quan quy trình:

1. Hệ thống tính Inventory Summary từ MedicineBatch.
2. Batch hết hạn không được tính vào sellable stock.
3. Near-expiry dùng threshold cấu hình.
4. Low-stock tính từ sellable quantity.
5. Admin/Warehouse xem operational inventory dashboard.
6. Staff chỉ xem stock liên quan đến bán hàng trong POS.

### 8.6. Process 6 — Điều chỉnh tồn kho

Mục tiêu nghiệp vụ:

1. Cho phép điều chỉnh tồn kho có kiểm soát.
2. Không cho sửa trực tiếp số lượng tồn.
3. Ghi lý do và audit.

Tổng quan quy trình:

1. Warehouse tạo Inventory Adjustment.
2. Warehouse chọn MedicineBatch liên quan.
3. Warehouse nhập số lượng điều chỉnh và reason.
4. Hệ thống kiểm tra không làm quantity âm.
5. Warehouse confirm adjustment.
6. Hệ thống cập nhật MedicineBatch và ghi audit.

### 8.7. Process 7 — Bán thuốc tại quầy

Mục tiêu nghiệp vụ:

1. Cho phép Staff tạo Draft Order.
2. Cho phép thêm thuốc vào order.
3. Kiểm tra sellable stock.
4. Kiểm tra interaction trong order.

Tổng quan quy trình:

1. Staff tạo Draft Order.
2. Staff thêm Medicine.
3. Hệ thống hiển thị sellable stock.
4. Hệ thống kiểm tra interaction dựa trên ActiveIngredient.
5. Nếu có interaction, hệ thống hiển thị và persist InteractionAlert.
6. Staff xử lý HIGH alert nếu có.
7. Staff chuyển sang checkout khi order hợp lệ.

### 8.8. Process 8 — Xử lý cảnh báo tương tác thuốc

Mục tiêu nghiệp vụ:

1. Phát hiện interaction dựa trên ActiveIngredient.
2. Lưu InteractionAlert đã hiển thị.
3. Bắt buộc xử lý HIGH alert trước checkout.

Tổng quan quy trình:

1. Khi order có nhiều thuốc, hệ thống xác định ActiveIngredient pairs.
2. Hệ thống kiểm tra DrugInteraction Rule.
3. Hệ thống hiển thị alert nếu có.
4. Hệ thống persist InteractionAlert.
5. LOW/MEDIUM không bắt buộc acknowledgement hoặc note.
6. HIGH bắt buộc acknowledgement và consultation note.
7. Nếu HIGH chưa xử lý đủ, checkout bị chặn.

### 8.9. Process 9 — AI Copilot hỗ trợ Staff

Mục tiêu nghiệp vụ:

1. Hỗ trợ Staff hiểu cảnh báo interaction.
2. Hỗ trợ tạo draft consultation note.
3. Không thay thế quyết định chuyên môn.

Tổng quan quy trình:

1. Staff yêu cầu AI giải thích alert.
2. Hệ thống áp dụng input guardrail.
3. AI tạo nội dung giải thích hoặc draft.
4. Hệ thống áp dụng output guardrail.
5. Hệ thống ghi AI Audit.
6. Staff xem draft.
7. Chỉ Staff xác nhận thì nội dung mới có thể thành official consultation note.

### 8.10. Process 10 — Checkout, payment và invoice

Mục tiêu nghiệp vụ:

1. Hoàn tất bán hàng nhất quán.
2. Trừ kho theo FEFO.
3. Tạo payment và invoice đúng thứ tự.
4. Chặn checkout khi order không hợp lệ.

Tổng quan quy trình:

1. Staff/Admin thực hiện checkout.
2. Hệ thống kiểm tra quyền và ownership.
3. Hệ thống kiểm tra order còn DRAFT.
4. Hệ thống kiểm tra stock.
5. Hệ thống kiểm tra HIGH alert.
6. Hệ thống áp dụng FEFO.
7. Hệ thống tạo payment attempt.
8. Nếu payment success, hệ thống chuyển order sang PAID.
9. Hệ thống tạo invoice.
10. Hệ thống ghi audit.
11. Nếu validation lỗi, order vẫn là DRAFT.

### 8.11. Process 11 — Reports

Mục tiêu nghiệp vụ:

1. Cung cấp số liệu vận hành cơ bản.
2. Không phụ thuộc AI.
3. Dựa trên dữ liệu đã thanh toán hợp lệ và tồn kho theo batch.

Tổng quan quy trình:

1. Admin xem Revenue Report.
2. Admin xem Top Medicines Report.
3. Admin/Warehouse xem Inventory Report.
4. Reports loại trừ dữ liệu không hợp lệ như DRAFT/CANCELLED/FAILED payment khi tính doanh thu.

### 8.12. Process 12 — Graph Sync và Graph-RAG

Mục tiêu nghiệp vụ:

1. Thể hiện quan hệ Medicine–ActiveIngredient–Interaction.
2. Hỗ trợ giải thích hoặc truy vấn quan hệ thuốc bằng graph.
3. Không biến graph thành source of truth.

Tổng quan quy trình:

1. Dữ liệu gốc được quản lý ở PostgreSQL.
2. Graph Sync đồng bộ dữ liệu phù hợp sang Neo4j.
3. Graph-RAG dùng graph projection nếu graph fresh.
4. Nếu graph stale/unavailable, interaction explanation fallback sang PostgreSQL hoặc trả safe error cho graph-only query.

### 8.13. Process 13 — Demo data và demo reset

Mục tiêu nghiệp vụ:

1. Có dữ liệu demo đủ để trình bày các luồng chính.
2. Có thể reset dữ liệu local để tái tạo demo.
3. Không phá dữ liệu demo/staging/production.

Tổng quan quy trình:

1. Chuẩn bị curated seed.
2. Reset dữ liệu local.
3. Provision demo users.
4. Tạo Medicine, ActiveIngredient, Supplier, Batch, Orders, Interactions.
5. Rebuild graph projection.
6. Chạy smoke test.
7. Sẵn sàng demo.

---

## 9. Business Capability Map

| Capability Group         | Business Capabilities                                         | Scope                           |
| ------------------------ | ------------------------------------------------------------- | ------------------------------- |
| Identity & Access        | Đăng nhập, user profile, role, permission, ownership          | MVP                             |
| Medicine Core            | Quản lý Medicine, trạng thái active/inactive, giá bán hợp lệ  | MVP                             |
| ActiveIngredient         | Quản lý hoạt chất, mapping thuốc–hoạt chất                    | MVP                             |
| Supplier                 | Quản lý supplier, deactivate bởi Admin                        | MVP                             |
| Batch Inventory          | MedicineBatch, expiry, sellable stock, low-stock, near-expiry | MVP                             |
| Stock Import             | Tạo phiếu nhập, confirm nhập kho, cập nhật batch              | MVP                             |
| Inventory Adjustment     | Điều chỉnh tồn kho theo batch, reason, audit                  | MVP                             |
| POS Sales                | Draft Order, thêm thuốc, khách lẻ, ownership                  | MVP                             |
| Interaction Safety       | Rule theo ActiveIngredient, alert LOW/MEDIUM/HIGH             | MVP                             |
| HIGH Alert Handling      | Acknowledgement, consultation note, block checkout nếu thiếu  | MVP                             |
| Checkout                 | Transactional checkout, FEFO, payment, invoice, audit         | MVP                             |
| Payment & Invoice        | Payment simulation, invoice sau success payment               | MVP                             |
| Reports                  | Revenue, Top Medicines, Inventory Report                      | MVP                             |
| AI Assistance            | AI explanation, consultation note draft                       | MVP                             |
| AI Safety                | Guardrail, safe refusal, AI Audit                             | MVP                             |
| Knowledge Graph          | Neo4j projection, Medicine–ActiveIngredient–Interaction graph | MVP                             |
| Graph Sync               | Outbox, worker, retry, audit, freshness detection             | MVP                             |
| Graph-RAG                | Graph-based explanation/query with fallback/safe error        | MVP                             |
| Data/Demo                | Curated seed, local demo reset, smoke test                    | MVP                             |
| Customer Management      | Full customer profile/history                                 | Should-have                     |
| Audit UI                 | Generic System Audit Log UI                                   | Should-have                     |
| Prompt/Provider UI       | Admin UI cho prompt/provider config                           | Should-have                     |
| Advanced Reports         | Charts, AI narrative, forecasting                             | Should-have/Future              |
| Commerce Expansion       | Cart, wishlist, shipping, coupon, review, CMS                 | Future                          |
| Multi-location           | Multi-store, multi-warehouse, stock transfer                  | Future                          |
| Financial Expansion      | Refund, return, credit note, real bank integration            | Future                          |
| Medical Expansion        | DrugGroup taxonomy, symptom/condition graph enrichment        | Future/Out of Scope tùy dữ liệu |
| Unsafe AI Medical Advice | Diagnosis, prescribing, dosage advice                         | Out of Scope                    |

---

## 10. Business Requirements theo nhóm

Business requirements trong Document 05 được viết ở cấp nghiệp vụ. Mã requirement dưới đây chỉ dùng để trace sang SRS, không đi chi tiết như functional requirement trong Document 06.

---

### 10.1. Identity & Access

| BRD ID    | Business Requirement                                                                             | Scope |
| --------- | ------------------------------------------------------------------------------------------------ | ----- |
| BRD-IA-01 | Hệ thống phải cho phép người dùng nội bộ đăng nhập an toàn bằng Supabase Auth.                   | MVP   |
| BRD-IA-02 | Hệ thống phải duy trì user profile nội bộ để phục vụ phân quyền và audit.                        | MVP   |
| BRD-IA-03 | Hệ thống phải hỗ trợ nhiều role cho một user.                                                    | MVP   |
| BRD-IA-04 | Hệ thống phải phân quyền dựa trên permission, không chỉ hard-code role.                          | MVP   |
| BRD-IA-05 | Hệ thống phải giới hạn Staff chỉ xem và thao tác order thuộc ownership scope.                    | MVP   |
| BRD-IA-06 | Hệ thống phải ngăn Warehouse truy cập nghiệp vụ bán hàng, payment, invoice và interaction alert. | MVP   |
| BRD-IA-07 | Hệ thống phải hỗ trợ first-login password-change flow cho selected demo user nếu cần demo.       | MVP   |
| BRD-IA-08 | Hệ thống phải đảm bảo frontend visibility không thay thế backend authorization.                  | MVP   |

---

### 10.2. Medicine & ActiveIngredient

| BRD ID     | Business Requirement                                                                                   | Scope  |
| ---------- | ------------------------------------------------------------------------------------------------------ | ------ |
| BRD-MED-01 | Hệ thống phải cho phép quản lý Medicine như entity nghiệp vụ lõi.                                      | MVP    |
| BRD-MED-02 | Hệ thống phải cho phép Medicine có trạng thái active/inactive.                                         | MVP    |
| BRD-MED-03 | Hệ thống phải đảm bảo Medicine dùng cho bán hàng có selling price hợp lệ lớn hơn 0.                    | MVP    |
| BRD-MED-04 | Hệ thống phải cho phép quản lý ActiveIngredient như dữ liệu lõi.                                       | MVP    |
| BRD-MED-05 | Hệ thống phải cho phép mapping Medicine với một hoặc nhiều ActiveIngredient.                           | MVP    |
| BRD-MED-06 | Hệ thống phải dùng ActiveIngredient làm nền cho DrugInteraction Rule.                                  | MVP    |
| BRD-MED-07 | Hệ thống không được tự động dùng toàn bộ scraped ingredient strings làm active ingredients chính thức. | MVP    |
| BRD-MED-08 | Product/product_variant commerce workflow không được thay thế Medicine làm core MVP.                   | Future |

---

### 10.3. Supplier

| BRD ID     | Business Requirement                                                      | Scope  |
| ---------- | ------------------------------------------------------------------------- | ------ |
| BRD-SUP-01 | Hệ thống phải cho phép quản lý Supplier phục vụ nhập kho.                 | MVP    |
| BRD-SUP-02 | Warehouse phải có thể xem Supplier.                                       | MVP    |
| BRD-SUP-03 | Warehouse phải có thể tạo Supplier.                                       | MVP    |
| BRD-SUP-04 | Warehouse phải có thể cập nhật Supplier.                                  | MVP    |
| BRD-SUP-05 | Chỉ Admin được deactivate Supplier.                                       | MVP    |
| BRD-SUP-06 | Supplier có lịch sử nhập kho không nên bị xóa cứng.                       | MVP    |
| BRD-SUP-07 | Supplier dùng trong Stock Import phải là supplier hợp lệ.                 | MVP    |
| BRD-SUP-08 | Supplier portal và supplier contract management phức tạp không thuộc MVP. | Future |

---

### 10.4. MedicineBatch & Inventory

| BRD ID     | Business Requirement                                                 | Scope  |
| ---------- | -------------------------------------------------------------------- | ------ |
| BRD-INV-01 | Hệ thống phải quản lý tồn kho theo MedicineBatch.                    | MVP    |
| BRD-INV-02 | MedicineBatch phải là source of truth cho inventory.                 | MVP    |
| BRD-INV-03 | Hệ thống phải phân biệt batch còn hạn, gần hết hạn và hết hạn.       | MVP    |
| BRD-INV-04 | Batch hết hạn không được tính vào sellable stock.                    | MVP    |
| BRD-INV-05 | Low-stock phải tính từ sellable quantity.                            | MVP    |
| BRD-INV-06 | Near-expiry phải dựa trên threshold cấu hình, mặc định 90 ngày.      | MVP    |
| BRD-INV-07 | Hệ thống phải cho phép xem Inventory Summary dựa trên MedicineBatch. | MVP    |
| BRD-INV-08 | Hệ thống phải cho phép xem Batch Detail.                             | MVP    |
| BRD-INV-09 | Hệ thống không được dùng aggregate inventory làm source of truth.    | MVP    |
| BRD-INV-10 | Multi-warehouse và stock transfer không thuộc MVP.                   | Future |

---

### 10.5. Stock Import

| BRD ID     | Business Requirement                                                                                                            | Scope  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------- | ------ |
| BRD-STI-01 | Hệ thống phải hỗ trợ tạo Stock Import.                                                                                          | MVP    |
| BRD-STI-02 | Stock Import phải có trạng thái nghiệp vụ rõ ràng: DRAFT, CONFIRMED, CANCELLED.                                                 | MVP    |
| BRD-STI-03 | Chỉ Stock Import đã CONFIRMED mới cập nhật MedicineBatch.                                                                       | MVP    |
| BRD-STI-04 | Stock Import đã CONFIRMED không được confirm lại.                                                                               | MVP    |
| BRD-STI-05 | Stock Import detail phải ghi nhận batch number và expiry date.                                                                  | MVP    |
| BRD-STI-06 | Quantity nhập phải hợp lệ và lớn hơn 0.                                                                                         | MVP    |
| BRD-STI-07 | Nếu nhập thêm cùng batch, hệ thống chỉ được cộng vào batch hiện hữu khi medicine, normalized batch number và expiry date match. | MVP    |
| BRD-STI-08 | Nếu cùng medicine và batch number nhưng expiry date khác, hệ thống phải từ chối để tránh merge sai batch.                       | MVP    |
| BRD-STI-09 | Confirm/cancel Stock Import phải có audit.                                                                                      | MVP    |
| BRD-STI-10 | Purchase order workflow đầy đủ không thuộc MVP.                                                                                 | Future |

---

### 10.6. Inventory Adjustment

| BRD ID     | Business Requirement                                                                       | Scope        |
| ---------- | ------------------------------------------------------------------------------------------ | ------------ |
| BRD-ADJ-01 | Hệ thống phải hỗ trợ Inventory Adjustment để điều chỉnh tồn kho.                           | MVP          |
| BRD-ADJ-02 | Warehouse có thể tạo Inventory Adjustment.                                                 | MVP          |
| BRD-ADJ-03 | Warehouse có thể confirm Inventory Adjustment mà không cần Admin approval trước trong MVP. | MVP          |
| BRD-ADJ-04 | Inventory Adjustment phải có reason.                                                       | MVP          |
| BRD-ADJ-05 | Inventory Adjustment phải điều chỉnh theo MedicineBatch.                                   | MVP          |
| BRD-ADJ-06 | Inventory Adjustment không được làm quantity_remaining âm.                                 | MVP          |
| BRD-ADJ-07 | Confirmed adjustment không được sửa trực tiếp.                                             | MVP          |
| BRD-ADJ-08 | Nếu cần sửa lỗi, hệ thống nên dùng correction hoặc reverse adjustment thay vì xóa lịch sử. | MVP          |
| BRD-ADJ-09 | Inventory Adjustment phải có audit.                                                        | MVP          |
| BRD-ADJ-10 | Direct edit inventory quantity không được phép thay thế Inventory Adjustment.              | Out of Scope |

---

### 10.7. POS & Sales

| BRD ID     | Business Requirement                                             | Scope       |
| ---------- | ---------------------------------------------------------------- | ----------- |
| BRD-POS-01 | Hệ thống phải cho phép Staff tạo Draft Order.                    | MVP         |
| BRD-POS-02 | Staff phải có thể thêm Medicine vào Draft Order.                 | MVP         |
| BRD-POS-03 | Staff phải có thể cập nhật số lượng Medicine trong Draft Order.  | MVP         |
| BRD-POS-04 | Staff phải có thể xóa Medicine khỏi Draft Order.                 | MVP         |
| BRD-POS-05 | POS phải hiển thị sellable stock phục vụ bán hàng.               | MVP         |
| BRD-POS-06 | POS phải hỗ trợ khách lẻ/walk-in thông qua customer nullable.    | MVP         |
| BRD-POS-07 | Staff được cancel Draft Order trong ownership scope.             | MVP         |
| BRD-POS-08 | Admin được cancel mọi Draft Order.                               | MVP         |
| BRD-POS-09 | Staff chỉ xem order do mình tạo hoặc xử lý.                      | MVP         |
| BRD-POS-10 | Admin xem toàn bộ order.                                         | MVP         |
| BRD-POS-11 | PAID order không được sửa hoặc cancel trực tiếp.                 | MVP         |
| BRD-POS-12 | Full Customer Management là Should-have, không phải MVP blocker. | Should-have |

---

### 10.8. Checkout

| BRD ID     | Business Requirement                                                     | Scope        |
| ---------- | ------------------------------------------------------------------------ | ------------ |
| BRD-CHK-01 | Checkout phải là nghiệp vụ chính thức để hoàn tất đơn hàng.              | MVP          |
| BRD-CHK-02 | Checkout phải kiểm tra order còn ở trạng thái DRAFT.                     | MVP          |
| BRD-CHK-03 | Checkout phải kiểm tra order có item hợp lệ.                             | MVP          |
| BRD-CHK-04 | Checkout phải tính lại total từ server/business logic.                   | MVP          |
| BRD-CHK-05 | Checkout phải kiểm tra tồn kho bán được.                                 | MVP          |
| BRD-CHK-06 | Checkout phải kiểm tra tất cả HIGH InteractionAlert đã được xử lý đủ.    | MVP          |
| BRD-CHK-07 | Checkout phải áp dụng FEFO khi trừ kho.                                  | MVP          |
| BRD-CHK-08 | Checkout phải lưu batch allocation để truy vết batch đã bán.             | MVP          |
| BRD-CHK-09 | Checkout phải tạo payment attempt và invoice theo đúng rule.             | MVP          |
| BRD-CHK-10 | Checkout phải có idempotency để tránh double-payment hoặc double-deduct. | MVP          |
| BRD-CHK-11 | Nếu validation thất bại, Draft Order phải được giữ để người dùng sửa.    | MVP          |
| BRD-CHK-12 | Public command rời rạc cho payment/invoice không được thay thế checkout. | Out of Scope |

---

### 10.9. Payment & Invoice

| BRD ID     | Business Requirement                                             | Scope                 |
| ---------- | ---------------------------------------------------------------- | --------------------- |
| BRD-PAY-01 | Hệ thống phải hỗ trợ payment simulation.                         | MVP                   |
| BRD-PAY-02 | Payment MVP chỉ cần SUCCESS và FAILED.                           | MVP                   |
| BRD-PAY-03 | Mỗi order chỉ có tối đa một successful payment.                  | MVP                   |
| BRD-PAY-04 | Failed payment attempts có thể được lưu để audit.                | MVP                   |
| BRD-PAY-05 | Cash payment phải ghi nhận amount tendered và change amount.     | MVP                   |
| BRD-PAY-06 | Simulated bank transfer phải có transaction reference.           | MVP                   |
| BRD-PAY-07 | Invoice chỉ được tạo sau successful payment.                     | MVP                   |
| BRD-PAY-08 | Mỗi PAID order có một invoice.                                   | MVP                   |
| BRD-PAY-09 | Real bank integration không thuộc MVP.                           | Future                |
| BRD-PAY-10 | Refund, return, credit note và invoice reversal không thuộc MVP. | Future / Out of Scope |

---

### 10.10. Drug Interaction

| BRD ID     | Business Requirement                                                          | Scope        |
| ---------- | ----------------------------------------------------------------------------- | ------------ |
| BRD-DRG-01 | Hệ thống phải quản lý DrugInteraction Rule.                                   | MVP          |
| BRD-DRG-02 | DrugInteraction Rule chính thức phải ở cấp ActiveIngredient–ActiveIngredient. | MVP          |
| BRD-DRG-03 | Admin là actor quản lý interaction rules.                                     | MVP          |
| BRD-DRG-04 | Severity MVP chỉ gồm LOW, MEDIUM và HIGH.                                     | MVP          |
| BRD-DRG-05 | Cặp interaction phải được hiểu là cùng một tương tác dù thứ tự A–B hay B–A.   | MVP          |
| BRD-DRG-06 | Rule có lịch sử không nên bị xóa cứng.                                        | MVP          |
| BRD-DRG-07 | Medicine–Medicine interaction rule không được dùng làm official rule.         | Out of Scope |
| BRD-DRG-08 | CRITICAL severity không thuộc MVP.                                            | Future       |

---

### 10.11. InteractionAlert

| BRD ID     | Business Requirement                                                            | Scope        |
| ---------- | ------------------------------------------------------------------------------- | ------------ |
| BRD-ALT-01 | Hệ thống phải persist mọi InteractionAlert đã hiển thị trong Order.             | MVP          |
| BRD-ALT-02 | Mỗi order và interaction chỉ có một active alert tương ứng.                     | MVP          |
| BRD-ALT-03 | Alert hiển thị lại phải được cập nhật lịch sử hiển thị.                         | MVP          |
| BRD-ALT-04 | Alert không còn áp dụng phải chuyển inactive thay vì bị xóa.                    | MVP          |
| BRD-ALT-05 | LOW và MEDIUM alert không bắt buộc acknowledgement hoặc consultation note.      | MVP          |
| BRD-ALT-06 | HIGH alert bắt buộc acknowledgement trước checkout.                             | MVP          |
| BRD-ALT-07 | HIGH alert bắt buộc consultation note trước checkout.                           | MVP          |
| BRD-ALT-08 | Mỗi HIGH alert phải có note riêng.                                              | MVP          |
| BRD-ALT-09 | Admin phải có khả năng xem InteractionAlert History.                            | MVP          |
| BRD-ALT-10 | Warehouse không được truy cập interaction alerts trong MVP.                     | MVP          |
| BRD-ALT-11 | HIGH alert chỉ advisory nhưng không block checkout là thiết kế không được dùng. | Out of Scope |

---

### 10.12. AI Copilot

| BRD ID     | Business Requirement                                                           | Scope       |
| ---------- | ------------------------------------------------------------------------------ | ----------- |
| BRD-AIC-01 | Hệ thống phải cung cấp AI Copilot để hỗ trợ Staff trong luồng POS/interaction. | MVP         |
| BRD-AIC-02 | AI Copilot phải hỗ trợ giải thích cảnh báo tương tác thuốc.                    | MVP         |
| BRD-AIC-03 | AI Copilot có thể tạo consultation note draft.                                 | MVP         |
| BRD-AIC-04 | AI-generated draft không được tự động trở thành official consultation note.    | MVP         |
| BRD-AIC-05 | Staff phải xác nhận trước khi dùng draft làm note chính thức.                  | MVP         |
| BRD-AIC-06 | Google AI Provider là provider ưu tiên.                                        | MVP         |
| BRD-AIC-07 | MockAI là fallback để demo ổn định.                                            | MVP         |
| BRD-AIC-08 | AI-generated business report narrative là Should-have.                         | Should-have |

---

### 10.13. AI Guardrail/Audit

| BRD ID     | Business Requirement                                                       | Scope  |
| ---------- | -------------------------------------------------------------------------- | ------ |
| BRD-AIG-01 | AI phải có input guardrail.                                                | MVP    |
| BRD-AIG-02 | AI phải có output guardrail.                                               | MVP    |
| BRD-AIG-03 | AI phải từ chối hoặc chặn yêu cầu chẩn đoán bệnh.                          | MVP    |
| BRD-AIG-04 | AI phải từ chối hoặc chặn yêu cầu kê đơn.                                  | MVP    |
| BRD-AIG-05 | AI phải từ chối hoặc chặn yêu cầu liều dùng cụ thể.                        | MVP    |
| BRD-AIG-06 | AI không được thay thế chuyên gia y tế.                                    | MVP    |
| BRD-AIG-07 | Hệ thống phải giảm thiểu hoặc redaction PII trước khi dùng AI khi phù hợp. | MVP    |
| BRD-AIG-08 | Hệ thống phải ghi AI Audit cho các tác vụ AI quan trọng.                   | MVP    |
| BRD-AIG-09 | AI Audit không được lưu raw PII.                                           | MVP    |
| BRD-AIG-10 | Prompt templates phải có version để phục vụ audit.                         | MVP    |
| BRD-AIG-11 | AI Cache không thuộc MVP.                                                  | Future |

---

### 10.14. Graph Sync/Graph-RAG

| BRD ID     | Business Requirement                                                                                      | Scope       |
| ---------- | --------------------------------------------------------------------------------------------------------- | ----------- |
| BRD-GPH-01 | Hệ thống phải dùng Neo4j như graph projection.                                                            | MVP         |
| BRD-GPH-02 | PostgreSQL vẫn là source of truth.                                                                        | MVP         |
| BRD-GPH-03 | Core graph MVP gồm Medicine, ActiveIngredient, CONTAINS và INTERACTS_WITH.                                | MVP         |
| BRD-GPH-04 | Graph Sync phải đồng bộ dữ liệu từ PostgreSQL sang Neo4j.                                                 | MVP         |
| BRD-GPH-05 | Graph Sync phải có cơ chế retry và audit/log.                                                             | MVP         |
| BRD-GPH-06 | Graph Sync phải có freshness detection.                                                                   | MVP         |
| BRD-GPH-07 | Graph-RAG phải là module riêng, không gộp mơ hồ vào AI Copilot.                                           | MVP         |
| BRD-GPH-08 | Nếu graph stale/unavailable, interaction explanation phải fallback sang PostgreSQL authoritative context. | MVP         |
| BRD-GPH-09 | Pure graph query không fallback được phải trả safe error.                                                 | MVP         |
| BRD-GPH-10 | Staff không được submit raw Cypher.                                                                       | MVP         |
| BRD-GPH-11 | DrugGroup, Symptom, Condition, RedFlag, Recommendation enrichment không thuộc core MVP.                   | Future      |
| BRD-GPH-12 | Graph Sync Status/retry UI là Should-have.                                                                | Should-have |

---

### 10.15. Reports

| BRD ID     | Business Requirement                                                                            | Scope                |
| ---------- | ----------------------------------------------------------------------------------------------- | -------------------- |
| BRD-RPT-01 | Hệ thống phải cung cấp Revenue Report.                                                          | MVP                  |
| BRD-RPT-02 | Revenue Report chỉ tính dữ liệu bán hàng hợp lệ đã thanh toán thành công.                       | MVP                  |
| BRD-RPT-03 | Hệ thống phải cung cấp Top Medicines Report.                                                    | MVP                  |
| BRD-RPT-04 | Top Medicines Report phải hỗ trợ xem thuốc bán chạy theo số lượng hoặc doanh thu ở mức phù hợp. | MVP                  |
| BRD-RPT-05 | Hệ thống phải cung cấp Inventory Report.                                                        | MVP                  |
| BRD-RPT-06 | Inventory Report phải dựa trên MedicineBatch và sellable quantity.                              | MVP                  |
| BRD-RPT-07 | Reports MVP phải deterministic, không phụ thuộc AI.                                             | MVP                  |
| BRD-RPT-08 | Advanced charts là Should-have.                                                                 | Should-have          |
| BRD-RPT-09 | Forecast và reorder suggestion là Should-have/Future.                                           | Should-have / Future |

---

### 10.16. Data/Demo

| BRD ID     | Business Requirement                                                           | Scope |
| ---------- | ------------------------------------------------------------------------------ | ----- |
| BRD-DMO-01 | MVP phải có curated operational seed riêng.                                    | MVP   |
| BRD-DMO-02 | Real catalog data chỉ được dùng làm reference.                                 | MVP   |
| BRD-DMO-03 | Demo seed phải có Admin, Staff và Warehouse accounts.                          | MVP   |
| BRD-DMO-04 | Demo seed nên có selected new-staff account để demo first-login flow nếu cần.  | MVP   |
| BRD-DMO-05 | Demo inventory phải được tái tạo từ stock imports, allocations và adjustments. | MVP   |
| BRD-DMO-06 | Demo phải có FEFO multi-batch scenario.                                        | MVP   |
| BRD-DMO-07 | Demo phải có interaction scenarios gồm ít nhất một HIGH alert.                 | MVP   |
| BRD-DMO-08 | Demo phải có PAID order hợp lệ với payment, invoice và allocation.             | MVP   |
| BRD-DMO-09 | Demo graph data phải được projected từ PostgreSQL qua Graph Sync hoặc rebuild. | MVP   |
| BRD-DMO-10 | Demo reset chỉ được chạy ở local environment.                                  | MVP   |
| BRD-DMO-11 | Smoke test phải xác nhận demo data sẵn sàng sau reset.                         | MVP   |

---

## 11. Business Rules cấp cao

### 11.1. Identity & Access Rules

1. Người dùng nội bộ phải đăng nhập thông qua Supabase Auth.
2. PostgreSQL không được lưu password hoặc password hash.
3. Một user có thể có nhiều role.
4. Quyền hiệu lực là tổng hợp permissions từ các role active.
5. Backend phải kiểm tra permission và ownership trước nghiệp vụ quan trọng.
6. Staff chỉ xem và thao tác order thuộc ownership scope.
7. Warehouse không được truy cập bán hàng, payment, invoice và interaction alerts trong MVP.
8. Frontend ẩn menu không được xem là bảo mật chính.

### 11.2. Medicine & ActiveIngredient Rules

1. Medicine là core business entity cho MVP.
2. Medicine dùng trong bán hàng phải có selling price > 0.
3. Medicine có lịch sử nghiệp vụ không nên bị xóa cứng.
4. ActiveIngredient là core entity cho interaction.
5. Medicine phải mapping với ActiveIngredient để kiểm tra interaction.
6. Scraped ingredients không được tự động xem là ActiveIngredient chính thức.

### 11.3. Supplier Rules

1. Supplier Management là MVP.
2. Warehouse được xem/tạo/cập nhật Supplier.
3. Chỉ Admin được deactivate Supplier.
4. Supplier có lịch sử nhập kho không nên bị xóa cứng.
5. Stock Import nên liên kết với Supplier hợp lệ.

### 11.4. Inventory Rules

1. MedicineBatch là source of truth cho inventory.
2. Aggregate inventory không được làm source of truth.
3. Batch number là bắt buộc.
4. Expiry date là bắt buộc.
5. Batch hết hạn không được tính vào sellable stock.
6. Low-stock tính từ sellable quantity.
7. Near-expiry dùng threshold cấu hình, default 90 ngày.
8. Không được sửa trực tiếp quantity ngoài workflow chính thức.
9. Không được làm quantity_remaining âm.

### 11.5. Stock Import Rules

1. Stock Import ở DRAFT có thể sửa.
2. Chỉ CONFIRMED Stock Import mới cập nhật MedicineBatch.
3. CONFIRMED Stock Import không được sửa tự do.
4. CONFIRMED Stock Import không được confirm lần hai.
5. Detail phải có batch number, expiry date và quantity hợp lệ.
6. Nếu cùng medicine và normalized batch number nhưng expiry date khác, phải reject.
7. Confirm/cancel phải có audit.

### 11.6. Inventory Adjustment Rules

1. Inventory Adjustment phải có reason.
2. Adjustment phải theo MedicineBatch.
3. Adjustment không được làm quantity âm.
4. Confirmed adjustment không được sửa trực tiếp.
5. Correction nên thực hiện bằng reverse/correction adjustment.
6. Adjustment phải có audit.

### 11.7. POS & Order Rules

1. Order status MVP chỉ gồm DRAFT, PAID và CANCELLED.
2. Staff được cancel DRAFT order trong ownership scope.
3. Admin được cancel mọi DRAFT order.
4. PAID order không được sửa hoặc cancel trực tiếp.
5. POS phải hỗ trợ khách lẻ.
6. Staff chỉ xem order mình tạo hoặc xử lý.
7. Admin xem toàn bộ order.

### 11.8. Checkout Rules

1. Checkout là command nghiệp vụ chính thức để hoàn tất đơn hàng.
2. Checkout phải chạy trong transaction.
3. Checkout phải kiểm tra order còn DRAFT.
4. Checkout phải kiểm tra stock availability.
5. Checkout phải kiểm tra HIGH alert đã xử lý đủ.
6. Checkout phải áp dụng FEFO.
7. Checkout phải tạo batch allocation.
8. Checkout phải tạo payment attempt.
9. Checkout phải tạo invoice sau payment success.
10. Checkout phải ghi audit.
11. Checkout phải hỗ trợ idempotency.
12. Nếu validation thất bại, Draft Order phải được giữ.

### 11.9. Payment & Invoice Rules

1. Payment trong MVP là simulation.
2. Payment status MVP gồm SUCCESS và FAILED.
3. Mỗi order chỉ có tối đa một successful payment.
4. Failed payment attempts có thể lưu.
5. Cash payment cần amount tendered và change amount.
6. Simulated bank transfer cần transaction reference.
7. Invoice chỉ tạo sau successful payment.
8. Mỗi PAID order có một invoice.
9. Refund và return ngoài MVP.

### 11.10. Interaction Rules

1. DrugInteraction Rule ở cấp ActiveIngredient–ActiveIngredient.
2. Medicine–Medicine interaction rule không phải official rule.
3. Severity MVP gồm LOW, MEDIUM, HIGH.
4. CRITICAL không thuộc MVP.
5. Cặp A–B và B–A được xem là cùng một tương tác.
6. Rule có lịch sử không nên bị xóa cứng.

### 11.11. InteractionAlert Rules

1. Mọi alert đã hiển thị phải được persist.
2. Mỗi order + interaction chỉ có một active alert.
3. Alert hiển thị lại phải cập nhật lịch sử hiển thị.
4. Alert không còn áp dụng phải chuyển inactive.
5. LOW/MEDIUM không bắt buộc acknowledgement/note.
6. HIGH bắt buộc acknowledgement.
7. HIGH bắt buộc consultation note.
8. Mỗi HIGH alert cần note riêng.
9. Checkout phải block nếu HIGH alert chưa đủ xử lý.
10. Warehouse không truy cập InteractionAlert trong MVP.

### 11.12. AI Rules

1. AI chỉ hỗ trợ tham khảo.
2. AI không chẩn đoán bệnh.
3. AI không kê đơn.
4. AI không đưa liều dùng cụ thể.
5. AI không thay thế chuyên gia y tế.
6. AI-generated note chỉ là draft.
7. Staff phải xác nhận trước khi lưu official note.
8. AI phải có guardrail.
9. AI Audit không lưu raw PII.
10. MockAI chỉ là fallback.

### 11.13. Graph Rules

1. PostgreSQL là source of truth.
2. Neo4j là graph projection.
3. Graph Sync là MVP.
4. Graph Sync phải có retry/audit/freshness detection.
5. Graph-RAG là module riêng.
6. Graph stale/unavailable phải fallback hoặc safe error.
7. Staff không được submit raw Cypher.
8. Enrichment graph nodes không ảnh hưởng checkout trong MVP.

### 11.14. Data/Demo Rules

1. Real catalog data chỉ là reference.
2. MVP cần curated operational seed.
3. Demo reset chỉ chạy local.
4. Demo inventory phải tái tạo từ transactions.
5. Demo graph phải projected từ PostgreSQL.
6. Smoke test cần xác nhận demo data sẵn sàng.

---

## 12. Business Constraints

### 12.1. Scope Constraints

1. MVP không được hạ scope nếu chưa có approval.
2. Should-have không được chặn MVP.
3. Future / Commercial Expansion không được tự ý đưa vào MVP.
4. Out of Scope không được triển khai như MVP.
5. Mọi scope change phải theo Document 04.

### 12.2. Operational Constraints

1. Hệ thống hướng tới nhà thuốc nội bộ, không phải e-commerce MVP.
2. Customer không đăng nhập trong MVP.
3. Payment chỉ là simulation trong MVP.
4. Refund và return không thuộc MVP.
5. Multi-store/multi-warehouse không thuộc MVP.
6. Demo phải chạy được với curated seed.

### 12.3. Safety Constraints

1. AI không được đưa nội dung y tế nguy hiểm.
2. Interaction alert chỉ hỗ trợ tham khảo, không thay thế chuyên gia y tế.
3. HIGH alert phải được xử lý trước checkout.
4. AI Audit không được lưu raw PII.
5. Demo không dùng dữ liệu cá nhân thật.

### 12.4. Data Constraints

1. MedicineBatch là source of truth.
2. PostgreSQL là source of truth.
3. Neo4j không phải source of truth.
4. Real catalog data không phải operational seed hoàn chỉnh.
5. selling_price không được bằng 0 trong MVP.
6. ActiveIngredient phải curated.

### 12.5. Documentation Constraints

1. Document 05 không viết SRS chi tiết.
2. Document 05 không viết API endpoint.
3. Document 05 không viết table schema.
4. Document 05 không viết Prisma model.
5. Document 05 không viết UI layout.
6. Document 05 không viết test case cụ thể.
7. Document 05 phải làm input cho Document 06 và Document 08.

---

## 13. MVP / Should-have / Future / Out of Scope Classification

### 13.1. MVP

MVP gồm:

1. Supabase Auth.
2. User profile.
3. Multi-role RBAC.
4. Permission-based authorization.
5. Ownership-based access.
6. Medicine Management.
7. ActiveIngredient Management.
8. Medicine–ActiveIngredient mapping.
9. Supplier Management.
10. MedicineBatch.
11. Inventory Summary.
12. Stock Import.
13. Inventory Adjustment.
14. POS Draft Order.
15. Checkout transaction.
16. FEFO.
17. Payment simulation.
18. Invoice.
19. DrugInteraction Rule.
20. InteractionAlert lifecycle.
21. HIGH acknowledgement.
22. HIGH consultation note.
23. AI Copilot.
24. AI Guardrail.
25. AI Audit.
26. Graph Sync.
27. Graph-RAG.
28. Revenue Report.
29. Top Medicines Report.
30. Inventory Report.
31. System Settings for near-expiry threshold.
32. Curated operational seed.
33. Local demo reset.

### 13.2. Should-have

Should-have gồm:

1. Full Customer Management.
2. Customer purchase history nâng cao.
3. Generic System Audit Log UI.
4. Graph Sync Status/retry UI.
5. Prompt editing UI.
6. AI provider/model configuration UI.
7. AI-generated business report narrative.
8. Advanced charts.
9. Graph visualization nâng cao.
10. Notification.
11. Supabase Storage.
12. Supabase Realtime.
13. Forecast tồn kho đơn giản.
14. Reorder suggestion đơn giản.

### 13.3. Future / Commercial Expansion

Future / Commercial Expansion gồm:

1. Online commerce.
2. Product variants commerce.
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
22. Advanced forecasting.
23. Reorder automation.
24. AI Cache.
25. DrugGroup taxonomy.
26. Symptom/Condition/RedFlag/Recommendation enrichment.
27. CRITICAL severity.
28. Full mobile support.
29. Full cross-browser testing.
30. Commercial-scale 100-table implementation.

### 13.4. Out of Scope

Out of Scope gồm:

1. AI chẩn đoán bệnh.
2. AI kê đơn thuốc.
3. AI đưa liều dùng cụ thể.
4. AI thay thế chuyên gia y tế.
5. Real patient medical record.
6. Lưu raw PII trong AI Audit.
7. Real bank integration trong MVP.
8. Refund trong MVP.
9. Return trong MVP.
10. Customer portal trong MVP.
11. Online shopping checkout trong MVP.
12. Full 100-table schema như MVP.
13. MockAI-only làm bằng chứng hoàn thành MVP.
14. MockGraph-only làm bằng chứng hoàn thành MVP.
15. Aggregate inventory làm source of truth.
16. Medicine-level interaction rule làm official rule.
17. Dùng toàn bộ scraped ingredients làm ActiveIngredient chính thức.
18. Seed price = 0 thành selling_price.
19. Checkout bỏ qua FEFO.
20. Checkout bỏ qua HIGH alert acknowledgement/note.
21. Demo reset ngoài local.
22. Raw Cypher cho Staff.
23. Warehouse truy cập InteractionAlert hoặc Graph Explorer trong MVP.

---

## 14. Business Acceptance Criteria cấp cao

| Business Area        | Acceptance Criteria cấp cao                                                                |
| -------------------- | ------------------------------------------------------------------------------------------ |
| Identity & Access    | Admin, Staff và Warehouse đăng nhập được và bị giới hạn đúng quyền                         |
| Authorization        | Staff chỉ thao tác order thuộc ownership scope; Warehouse không truy cập sales/interaction |
| Medicine             | Medicine được quản lý như dữ liệu lõi và có giá bán hợp lệ                                 |
| ActiveIngredient     | Medicine được mapping với ActiveIngredient để phục vụ interaction                          |
| Supplier             | Warehouse quản lý supplier cơ bản; Admin deactivate supplier                               |
| MedicineBatch        | Tồn kho được quản lý theo batch và expiry                                                  |
| Inventory            | Sellable stock loại trừ batch hết hạn; low-stock tính từ sellable quantity                 |
| Stock Import         | Confirm Stock Import cập nhật MedicineBatch và không confirm lặp                           |
| Inventory Adjustment | Adjustment có reason, theo batch, không làm quantity âm                                    |
| POS                  | Staff tạo và cập nhật Draft Order, hỗ trợ khách lẻ                                         |
| Interaction          | Hệ thống phát hiện interaction dựa trên ActiveIngredient                                   |
| InteractionAlert     | Alert được persist và không bị xóa lịch sử tùy tiện                                        |
| HIGH Alert           | Checkout bị chặn nếu HIGH alert chưa acknowledgement hoặc chưa có note                     |
| Checkout             | Checkout hoàn tất order/payment/invoice/inventory trong một nghiệp vụ nhất quán            |
| FEFO                 | Bán thuốc trừ batch gần hết hạn trước                                                      |
| Payment              | Payment simulation có SUCCESS/FAILED và không tạo nhiều successful payment                 |
| Invoice              | Invoice chỉ tạo sau successful payment                                                     |
| AI Copilot           | AI hỗ trợ giải thích alert và tạo draft trong phạm vi an toàn                              |
| AI Guardrail         | AI chặn diagnosis, prescribing và dosage requests                                          |
| AI Audit             | Tác vụ AI quan trọng có audit và không lưu raw PII                                         |
| Graph Sync           | Graph projection được đồng bộ từ PostgreSQL và có freshness control                        |
| Graph-RAG            | Graph-RAG tách riêng, có fallback/safe error phù hợp                                       |
| Reports              | Revenue, Top Medicines và Inventory Report hoạt động bằng dữ liệu deterministic            |
| Data/Demo            | Curated seed đủ để demo các luồng MVP                                                      |
| Demo Reset           | Demo reset chỉ chạy local và tái tạo trạng thái demo ổn định                               |

---

## 15. Traceability BRD → SRS

Bảng dưới đây định hướng cách chuyển business requirements trong Document 05 sang SRS trong Document 06.

| BRD Group                   | SRS Section dự kiến                         | Use Case liên quan                       | UI liên quan                    | Testing liên quan            |
| --------------------------- | ------------------------------------------- | ---------------------------------------- | ------------------------------- | ---------------------------- |
| Identity & Access           | Auth, User Profile, RBAC, Authorization     | Login, Manage User, Assign Role          | Login, User Management          | Auth/permission tests        |
| Medicine & ActiveIngredient | Medicine, ActiveIngredient, Mapping         | Manage Medicine, Manage ActiveIngredient | Medicine screens                | Medicine validation tests    |
| Supplier                    | Supplier Management                         | Manage Supplier                          | Supplier screens                | Supplier authorization tests |
| MedicineBatch & Inventory   | Inventory, MedicineBatch, Inventory Summary | View Inventory, View Batch               | Inventory Summary, Batch Detail | Inventory calculation tests  |
| Stock Import                | Stock Import requirements                   | Create/Confirm Import                    | Stock Import screens            | Import confirmation tests    |
| Inventory Adjustment        | Adjustment requirements                     | Create/Confirm Adjustment                | Adjustment screens              | Adjustment validation tests  |
| POS & Sales                 | Draft Order, Order Ownership                | Create Draft Order                       | POS screen                      | POS flow tests               |
| Checkout                    | Checkout requirements                       | Checkout Order                           | Checkout route/panel            | Checkout transaction tests   |
| Payment & Invoice           | Payment, Invoice requirements               | Process Payment, View Invoice            | Payment/Invoice views           | Payment/invoice tests        |
| Drug Interaction            | Interaction Rule                            | Manage Rule, Check Interaction           | Interaction Rule screens        | Interaction rule tests       |
| InteractionAlert            | Alert lifecycle                             | Handle Alert, View History               | Alert UI, History screen        | HIGH alert blocking tests    |
| AI Copilot                  | AI assistance                               | Generate Explanation/Draft               | AI panel                        | AI behavior tests            |
| AI Guardrail/Audit          | Guardrail, Audit                            | Safe AI Request                          | AI warning/refusal UI           | Guardrail tests              |
| Graph Sync/Graph-RAG        | Graph Sync, Graph-RAG                       | Explore Graph, Ask Graph-RAG             | Graph views                     | Graph fallback tests         |
| Reports                     | Revenue, Top Medicines, Inventory           | View Reports                             | Report screens                  | Report calculation tests     |
| Data/Demo                   | Seed, Demo Reset                            | Demo Setup                               | N/A or Admin demo tools         | Smoke tests                  |

### 15.1. Traceability rules

1. Mỗi business requirement MVP trong Document 05 phải có functional hoặc non-functional requirement tương ứng trong Document 06.
2. Mỗi business process quan trọng phải được phản ánh trong Use Case Specification.
3. Mỗi business actor phải được phản ánh trong Roles/Permissions và Use Case.
4. Mỗi business rule có ảnh hưởng dữ liệu phải được phản ánh trong ERD/Prisma.
5. Mỗi business rule có ảnh hưởng UI phải được phản ánh trong UI/UX Screen Specification.
6. Mỗi high-risk business rule phải có test coverage trong Document 20.
7. Should-have và Future không được lẫn vào MVP test exit.
8. Out of Scope không được xuất hiện như required functionality trong SRS.

---

## 16. Kết luận

Document 05 — Business Requirements Document đã chuyển baseline của PharmaAssist AI Intelligence thành các yêu cầu nghiệp vụ cấp cao đến trung bình cho hệ thống nhà thuốc.

Tài liệu này xác định rõ:

1. Bối cảnh nghiệp vụ của nhà thuốc.
2. Vấn đề nghiệp vụ cần giải quyết.
3. Mục tiêu nghiệp vụ.
4. Nhu cầu stakeholder.
5. Business actors.
6. Business process overview.
7. Business capability map.
8. Business requirements theo từng nhóm.
9. Business rules cấp cao.
10. Business constraints.
11. Phân loại MVP, Should-have, Future / Commercial Expansion và Out of Scope.
12. Business acceptance criteria cấp cao.
13. Traceability từ BRD sang SRS.

Các quyết định nghiệp vụ quan trọng đã được giữ đúng baseline:

1. Supabase Auth và multi-role RBAC.
2. Medicine và ActiveIngredient là lõi nghiệp vụ.
3. Supplier Management là MVP.
4. MedicineBatch là source of truth cho inventory.
5. FEFO là bắt buộc.
6. Stock Import và Inventory Adjustment thuộc MVP.
7. POS hỗ trợ khách lẻ.
8. Checkout là nghiệp vụ chính thức để hoàn tất bán hàng.
9. Payment và Invoice nằm trong checkout flow.
10. DrugInteraction Rule ở cấp ActiveIngredient–ActiveIngredient.
11. InteractionAlert phải được persist.
12. HIGH alert cần acknowledgement và consultation note.
13. AI Copilot, AI Guardrail và AI Audit là MVP.
14. Graph Sync và Graph-RAG là MVP.
15. Reports cơ bản là MVP.
16. Real catalog data chỉ là reference.
17. MVP cần curated operational seed riêng.

Document 05 là đầu vào trực tiếp cho:

1. Document 06 — Software Requirements Specification.
2. Document 08 — Use Case Specification.
3. Document 15 — UI/UX Screen Specification.
4. Document 19 — Project Management, Jira & Release Plan.
5. Document 20 — Testing, Demo & Setup Guide.

Bước tiếp theo hợp lý là viết **Document 06 — Software Requirements Specification**, nơi các business requirements trong Document 05 sẽ được chuyển thành functional requirements, non-functional requirements, business rules có mã chi tiết, data requirements, integration requirements và acceptance criteria ở cấp phần mềm.
