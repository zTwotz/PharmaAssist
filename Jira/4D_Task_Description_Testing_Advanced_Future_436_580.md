# 4D_Task_Description_Testing_Advanced_Future_436_580.md

# Mẫu Description cho 145 Task phần 4D

Tài liệu này mô tả chi tiết từng Task trong file:

```text
4D_Task_List_Testing_Advanced_Future_436_580.md
```

Phạm vi Task:

```text
PAC-TASK-436 → PAC-TASK-580
```

Nhóm chức năng:

1. Automated Testing.
2. High-risk Module Testing.
3. Manual Smoke Testing.
4. DevOps / CI Quality Gates.
5. Local Setup.
6. Environment Configuration.
7. Documentation.
8. Demo Readiness.
9. Release Freeze Checklist.
10. Should-have / Advanced Backlog.
11. Future / Commercial Expansion Backlog.
12. Out-of-scope Guardrails.

Baseline bắt buộc:

* Không chạy destructive tests trên demo/staging/production database.
* Automated integration tests phải có isolation/cleanup.
* Chrome desktop/laptop là browser target chính của MVP.
* Docker không phải official setup path.
* CI tối thiểu gồm lint, type check, unit tests, integration tests, Prisma validation, migration check, frontend build và backend build.
* Demo reset chỉ được chạy local.
* Reports MVP là deterministic, không phụ thuộc AI.
* Should-have / Advanced không được xem là blocker của MVP.
* Future / Commercial Expansion chỉ dùng để ghi backlog, không implement trong MVP.

---

# Sprint 10 — Testing, DevOps, CI, Setup, Documentation, Release Readiness

## PAC-TASK-436 - Add backend unit test setup

Nhóm cần cấu hình môi trường unit test cho backend NestJS.

### Nội dung công việc

* Cấu hình test runner cho backend.
* Tạo cấu trúc thư mục test thống nhất.
* Thêm script chạy unit test.
* Tạo test mẫu cho service đơn giản.
* Đảm bảo test chạy được local và trong CI.

### Kết quả mong đợi

* Backend có nền tảng unit test.
* Developer có thể viết test cho service/guard/validator.
* CI có thể chạy unit test.
* Không phụ thuộc demo database cho unit test.

---

## PAC-TASK-437 - Add backend integration test setup with isolated cleanup

Nhóm cần cấu hình integration test backend với cơ chế isolation và cleanup.

### Nội dung công việc

* Cấu hình test database/schema hoặc cleanup strategy an toàn.
* Không chạy destructive tests trên demo/staging/production.
* Chuẩn bị helper seed/cleanup cho từng test.
* Tạo integration test mẫu cho API.
* Ghi rõ cách chạy test local.

### Kết quả mong đợi

* Integration tests có thể chạy mà không phá dữ liệu demo.
* Test có dữ liệu sạch, dễ tái lập.
* CI có thể chạy integration test.
* Rủi ro xóa nhầm database được giảm.

### AI Agent Notes

* Không dùng demo database cho destructive integration tests.
* Không viết test phụ thuộc dữ liệu demo thật.

---

## PAC-TASK-438 - Add frontend component test setup

Nhóm cần cấu hình test component cho frontend Next.js.

### Nội dung công việc

* Cấu hình React Testing Library hoặc công cụ tương đương.
* Tạo script chạy frontend component tests.
* Tạo test mẫu cho component đơn giản.
* Mock API call khi cần.
* Đảm bảo test chạy được trong CI.

### Kết quả mong đợi

* Frontend có nền tảng test component.
* Các form/table quan trọng có thể viết test.
* CI phát hiện lỗi UI cơ bản.
* Developer dễ thêm test mới.

---

## PAC-TASK-439 - Add Playwright E2E test setup for Chrome desktop

Nhóm cần cấu hình Playwright E2E test cho Chrome desktop, đúng target MVP.

### Nội dung công việc

* Cấu hình Playwright.
* Chọn Chrome/Chromium desktop làm target chính.
* Tạo test mẫu mở app và login nếu có thể.
* Chuẩn bị base URL từ environment.
* Không mở rộng full cross-browser trong MVP.

### Kết quả mong đợi

* Có nền tảng E2E test.
* Luồng critical path có thể test tự động.
* Browser target đúng baseline.
* Không tăng scope sang full cross-browser testing.

---

## PAC-TASK-440 - Add Postman manual API collection structure

Nhóm cần tạo cấu trúc Postman collection cho manual API testing.

### Nội dung công việc

* Tạo collection theo module.
* Tạo folder Auth, Medicine, Inventory, POS, Checkout, AI, Graph, Reports.
* Thêm biến environment cho base URL và token.
* Ghi hướng dẫn lấy token nếu cần.
* Không thay thế automated tests bằng Postman.

### Kết quả mong đợi

* Tester có công cụ test API thủ công.
* API demo dễ kiểm tra.
* Collection có cấu trúc rõ ràng.
* Manual API test hỗ trợ smoke test.

---

## PAC-TASK-441 - Add Auth and RBAC test suite

Nhóm cần viết test cho Auth và RBAC.

### Nội dung công việc

* Test API protected thiếu token.
* Test token invalid.
* Test user có permission.
* Test user thiếu permission bị 403.
* Test frontend route guard ở mức smoke nếu cần.

### Kết quả mong đợi

* Auth/RBAC có test đầy đủ.
* Không lộ API cho user chưa đăng nhập.
* Permission guard hoạt động.
* Supabase Auth flow được bảo vệ.

---

## PAC-TASK-442 - Add User Management permission tests

Nhóm cần viết test cho phân quyền quản lý user.

### Nội dung công việc

* Test Admin tạo staff account.
* Test Staff không tạo được user.
* Test Warehouse không quản lý user.
* Test update active/inactive account.
* Test first-login flag nếu có.

### Kết quả mong đợi

* User Management đúng permission.
* Không role nào vượt quyền.
* Tài khoản mới dùng Supabase Auth đúng.
* Không quay lại custom password flow.

---

## PAC-TASK-443 - Add Medicine Management API tests

Nhóm cần viết test cho API quản lý thuốc.

### Nội dung công việc

* Test tạo medicine hợp lệ.
* Test giá bán <= 0 bị reject.
* Test update medicine.
* Test deactivate medicine.
* Test search/list pagination.

### Kết quả mong đợi

* Medicine APIs ổn định.
* `selling_price > 0` được bảo vệ.
* Inactive medicine không dùng sai trong POS.
* Dữ liệu medicine đáng tin.

---

## PAC-TASK-444 - Add ActiveIngredient mapping tests

Nhóm cần viết test cho ActiveIngredient và Medicine–ActiveIngredient mapping.

### Nội dung công việc

* Test tạo active ingredient.
* Test normalize tên hoạt chất.
* Test mapping medicine với ingredient.
* Test duplicate mapping bị reject.
* Test raw scraped string không dùng làm mapping official.

### Kết quả mong đợi

* Dữ liệu hoạt chất sạch.
* Interaction rule có nền dữ liệu đúng.
* Mapping không trùng.
* Graph Sync có source data đáng tin.

---

## PAC-TASK-445 - Add Supplier Management API tests

Nhóm cần viết test cho Supplier Management.

### Nội dung công việc

* Test tạo supplier.
* Test update supplier.
* Test Admin-only deactivate supplier.
* Test Warehouse không deactivate được.
* Test inactive supplier không dùng cho Stock Import mới.

### Kết quả mong đợi

* Supplier flow đúng quyền.
* Lịch sử supplier không bị xóa cứng.
* Stock Import chỉ dùng supplier hợp lệ.
* API ổn định.

---

## PAC-TASK-446 - Add MedicineBatch source-of-truth tests

Nhóm cần viết test chứng minh MedicineBatch là nguồn tồn kho chính.

### Nội dung công việc

* Test tồn kho được tạo từ Stock Import.
* Test Inventory Summary tính từ MedicineBatch.
* Test không có API sửa quantity trực tiếp.
* Test batch identity.
* Test quantity thay đổi qua workflow hợp lệ.

### Kết quả mong đợi

* MedicineBatch source-of-truth được bảo vệ.
* Không quay lại aggregate inventory.
* Inventory/POS/Checkout dùng dữ liệu batch.
* Tồn kho trace được.

---

## PAC-TASK-447 - Add sellable quantity and expired batch tests

Nhóm cần viết test cho sellable quantity và expired batch.

### Nội dung công việc

* Test batch còn hạn được tính sellable.
* Test batch hết hạn không được tính sellable.
* Test batch quantity 0 không được tính.
* Test nhiều batch cùng thuốc.
* Test POS hiển thị sellable stock đúng.

### Kết quả mong đợi

* Không bán thuốc hết hạn.
* Sellable quantity chính xác.
* FEFO có dữ liệu đúng.
* Inventory safety được bảo vệ.

---

## PAC-TASK-448 - Add near-expiry threshold tests

Nhóm cần viết test cho near-expiry threshold.

### Nội dung công việc

* Test default threshold 90 ngày.
* Test batch trong threshold được đánh dấu near-expiry.
* Test batch ngoài threshold không bị đánh dấu.
* Test threshold thay đổi qua settings.
* Test expired batch không bị nhầm với near-expiry.

### Kết quả mong đợi

* Near-expiry đúng baseline.
* System Settings ảnh hưởng đúng.
* Không dùng default 60 ngày.
* Inventory warning đáng tin.

---

## PAC-TASK-449 - Add Stock Import transaction tests

Nhóm cần viết test cho transaction Stock Import.

### Nội dung công việc

* Test confirm import thành công.
* Test confirm import nhiều dòng.
* Test rollback nếu có dòng lỗi.
* Test status chuyển Draft → Confirmed.
* Test MedicineBatch cập nhật đúng.

### Kết quả mong đợi

* Stock Import không có partial confirm.
* MedicineBatch update đúng.
* Confirmed import immutable.
* Dữ liệu kho đáng tin.

---

## PAC-TASK-450 - Add Stock Import batch merge and expiry mismatch tests

Nhóm cần test rule merge batch và expiry mismatch.

### Nội dung công việc

* Test merge khi medicine/batch/expiry trùng.
* Test không tạo duplicate batch.
* Test cùng medicine/batch nhưng expiry khác bị reject.
* Test rollback khi mismatch.
* Test error message theo dòng nhập.

### Kết quả mong đợi

* Batch identity đúng.
* Không merge sai expiry.
* Không tạo duplicate batch sai hạn.
* Stock Import an toàn.

---

## PAC-TASK-451 - Add Inventory Adjustment transaction tests

Nhóm cần viết test cho transaction Inventory Adjustment.

### Nội dung công việc

* Test tạo Draft Adjustment.
* Test confirm adjustment thành công.
* Test cập nhật MedicineBatch trong transaction.
* Test rollback khi có lỗi.
* Test confirmed adjustment immutable.

### Kết quả mong đợi

* Adjustment workflow đáng tin.
* Quantity không bị cập nhật nửa chừng.
* Không sửa trực tiếp MedicineBatch.
* Audit tồn kho rõ ràng.

---

## PAC-TASK-452 - Add Inventory Adjustment audit and reason tests

Nhóm cần viết test cho reason và audit của Inventory Adjustment.

### Nội dung công việc

* Test thiếu reason bị reject.
* Test reason chỉ khoảng trắng bị reject.
* Test confirm ghi audit log.
* Test actor và batch affected được lưu.
* Test Admin xem history.

### Kết quả mong đợi

* Mọi adjustment có lý do.
* Audit tồn kho có bằng chứng.
* Warehouse/Admin đúng quyền.
* Không có adjustment vô danh.

---

## PAC-TASK-453 - Add POS Draft Order API tests

Nhóm cần viết test cho POS Draft Order APIs.

### Nội dung công việc

* Test tạo Draft Order.
* Test add item.
* Test update quantity.
* Test remove item.
* Test total calculation.

### Kết quả mong đợi

* POS backend ổn định.
* Draft Order không trừ inventory.
* Total tính đúng.
* Checkout có dữ liệu chuẩn.

---

## PAC-TASK-454 - Add POS Draft Order UI smoke tests

Nhóm cần viết checklist hoặc E2E smoke test cho POS UI.

### Nội dung công việc

* Test mở POS screen.
* Test search medicine.
* Test add item.
* Test update quantity.
* Test remove item và total update.

### Kết quả mong đợi

* POS UI hoạt động trước demo.
* Staff thao tác được luồng cơ bản.
* Lỗi UI critical được phát hiện.
* Demo bán hàng ít rủi ro.

---

## PAC-TASK-455 - Add Staff order ownership tests

Nhóm cần viết test cho Staff order ownership scope.

### Nội dung công việc

* Seed nhiều Staff và orders.
* Test Staff chỉ thấy order của mình.
* Test Staff không xem order người khác.
* Test Admin thấy tất cả.
* Test direct API call sai scope bị chặn.

### Kết quả mong đợi

* Order data không lộ sai quyền.
* Admin/Staff behavior đúng.
* Backend enforce ownership.
* Security test rõ ràng.

---

## PAC-TASK-456 - Add Draft Order cancel status tests

Nhóm cần viết test cho hủy Draft Order.

### Nội dung công việc

* Test cancel order DRAFT.
* Test cancel PAID bị reject.
* Test cancel CANCELLED bị reject.
* Test Staff chỉ cancel order trong scope.
* Test Admin cancel bất kỳ Draft Order.

### Kết quả mong đợi

* Order lifecycle đúng.
* PAID order không bị hủy trực tiếp.
* Không phát sinh refund/return trong MVP.
* Status rule có test.

---

## PAC-TASK-457 - Add DrugInteraction Rule API tests

Nhóm cần viết test cho DrugInteraction Rule APIs.

### Nội dung công việc

* Test tạo rule ActiveIngredient–ActiveIngredient.
* Test severity LOW/MEDIUM/HIGH.
* Test invalid severity bị reject.
* Test update/deactivate rule.
* Test Graph Sync event khi rule thay đổi.

### Kết quả mong đợi

* Rule tương tác đúng baseline.
* Không dùng Medicine–Medicine rule official.
* CRITICAL không xuất hiện trong MVP.
* Rule lifecycle có test.

---

## PAC-TASK-458 - Add ActiveIngredient-derived interaction tests

Nhóm cần viết test cho logic suy ra interaction từ hoạt chất của thuốc.

### Nội dung công việc

* Test hai thuốc có hoạt chất tương tác.
* Test thuốc nhiều hoạt chất.
* Test inactive rule không tạo alert.
* Test rule semantically symmetric.
* Test không phụ thuộc Medicine-level rule.

### Kết quả mong đợi

* Interaction check chính xác.
* Alert dựa trên hoạt chất.
* Dữ liệu medicine mapping được dùng đúng.
* Safety rule có test.

---

## PAC-TASK-459 - Add InteractionAlert persistence tests

Nhóm cần viết test đảm bảo InteractionAlert được persist.

### Nội dung công việc

* Test check interaction tạo InteractionAlert.
* Test snapshot severity/description.
* Test alert gắn đúng order.
* Test alert history đọc được.
* Test không chỉ hiển thị tạm trên UI.

### Kết quả mong đợi

* InteractionAlert lifecycle đáng tin.
* Admin có history.
* Checkout blocker có dữ liệu.
* Alert không bị mất sau reload.

---

## PAC-TASK-460 - Add InteractionAlert display_count tests

Nhóm cần viết test cho `display_count` và `last_displayed_at`.

### Nội dung công việc

* Test alert hiển thị lần đầu.
* Test alert hiển thị lại không tạo duplicate active alert.
* Test display_count tăng.
* Test last_displayed_at cập nhật.
* Test acknowledged data không bị reset sai.

### Kết quả mong đợi

* Alert tracking đúng.
* Dữ liệu không trùng.
* History chính xác.
* Staff không xử lý alert duplicate.

---

## PAC-TASK-461 - Add HIGH alert acknowledgement tests

Nhóm cần viết test cho acknowledgement của HIGH alert.

### Nội dung công việc

* Test HIGH alert chưa acknowledge.
* Test acknowledge lưu actor/time.
* Test user sai quyền bị chặn.
* Test LOW/MEDIUM không bắt buộc giống HIGH nếu không cần.
* Test checkout vẫn block nếu thiếu note.

### Kết quả mong đợi

* HIGH acknowledgement đúng rule.
* Audit alert rõ.
* Backend enforce.
* Checkout safety được bảo vệ.

---

## PAC-TASK-462 - Add HIGH alert consultation note tests

Nhóm cần viết test cho consultation note của HIGH alert.

### Nội dung công việc

* Test note rỗng bị reject.
* Test note hợp lệ được lưu.
* Test note gắn đúng alert.
* Test Staff confirm note.
* Test alert history hiển thị note.

### Kết quả mong đợi

* HIGH alert luôn có note hợp lệ trước checkout.
* Note không bị gắn nhầm.
* Staff chịu trách nhiệm xác nhận.
* Safety flow có test.

---

## PAC-TASK-463 - Add checkout blocker tests for unresolved HIGH alerts

Nhóm cần viết test cho checkout blocker khi HIGH alert chưa xử lý.

### Nội dung công việc

* Test thiếu acknowledgement bị block.
* Test thiếu note bị block.
* Test có đủ acknowledgement và note thì pass.
* Test không tạo payment/invoice khi blocked.
* Test Draft Order được giữ.

### Kết quả mong đợi

* Checkout không bypass HIGH alert.
* Payment không tạo khi alert unresolved.
* Luồng an toàn thuốc được bảo vệ.
* Critical path có test.

---

## PAC-TASK-464 - Add Checkout transaction success tests

Nhóm cần viết test cho checkout thành công.

### Nội dung công việc

* Test Draft Order hợp lệ checkout thành công.
* Test FEFO allocation được tạo.
* Test MedicineBatch bị trừ đúng.
* Test payment SUCCESS được tạo.
* Test invoice được tạo.

### Kết quả mong đợi

* Checkout success path hoạt động.
* Order chuyển PAID đúng.
* Payment/invoice/batch allocation nhất quán.
* Demo bán hàng đáng tin.

---

## PAC-TASK-465 - Add Checkout rollback failure tests

Nhóm cần viết test rollback khi checkout lỗi.

### Nội dung công việc

* Test stock insufficient.
* Test payment validation fail.
* Test invoice creation fail giả lập nếu có.
* Kiểm tra order vẫn DRAFT.
* Kiểm tra batch không bị trừ.

### Kết quả mong đợi

* Không có partial checkout.
* Rollback hoạt động.
* Draft Order không mất.
* Dữ liệu payment/invoice không bị tạo sai.

---

## PAC-TASK-466 - Add FEFO allocation unit tests

Nhóm cần viết unit test cho FEFO allocation service.

### Nội dung công việc

* Test chọn batch expiry gần nhất.
* Test bỏ qua expired batch.
* Test quantity đủ trong một batch.
* Test output allocation format.
* Test stock insufficient.

### Kết quả mong đợi

* FEFO hoạt động đúng.
* Không dùng FIFO sai.
* Không bán batch hết hạn.
* Allocation service đáng tin.

---

## PAC-TASK-467 - Add FEFO multi-batch allocation tests

Nhóm cần viết test cho allocation qua nhiều batch.

### Nội dung công việc

* Seed nhiều batch cùng medicine.
* Batch đầu không đủ quantity.
* Allocation lấy tiếp batch sau.
* Kiểm tra tổng allocated đúng.
* Kiểm tra thứ tự theo expiry.

### Kết quả mong đợi

* Multi-batch FEFO hoạt động.
* Checkout demo case phức tạp pass.
* Batch allocation trace rõ.
* Không bán vượt tồn.

---

## PAC-TASK-468 - Add Checkout idempotency tests

Nhóm cần viết test chống double-submit checkout.

### Nội dung công việc

* Gửi checkout cùng idempotency key nhiều lần.
* Kiểm tra chỉ có một SUCCESS payment.
* Kiểm tra invoice không duplicate.
* Kiểm tra batch không bị trừ hai lần.
* Test key khác thì xử lý đúng scope.

### Kết quả mong đợi

* Checkout idempotent.
* Không có duplicate payment/invoice.
* Không double-deduct stock.
* POS an toàn khi user click nhiều lần.

---

## PAC-TASK-469 - Add Payment cash handling tests

Nhóm cần viết test thanh toán tiền mặt.

### Nội dung công việc

* Test amount_tendered đủ.
* Test amount_tendered thiếu bị reject.
* Test change_amount đúng.
* Test payment method cash.
* Test payment được tạo trong checkout transaction.

### Kết quả mong đợi

* Cash payment đúng nghiệp vụ.
* Không checkout khi khách đưa thiếu tiền.
* Change amount chính xác.
* Payment data audit được.

---

## PAC-TASK-470 - Add Payment one SUCCESS rule tests

Nhóm cần viết test rule mỗi order chỉ có một SUCCESS payment.

### Nội dung công việc

* Test tạo SUCCESS payment lần đầu.
* Test tạo SUCCESS payment lần hai bị reject.
* Test failed attempts không phá rule nếu có.
* Test checkout idempotency liên quan.
* Test constraint/service guard.

### Kết quả mong đợi

* Không thanh toán trùng.
* Order financial data nhất quán.
* Revenue report chính xác.
* Payment rule có test.

---

## PAC-TASK-471 - Add Invoice generation tests

Nhóm cần viết test tạo invoice trong checkout.

### Nội dung công việc

* Test invoice tạo khi checkout success.
* Test invoice gắn đúng order/payment.
* Test invoice không tạo khi checkout fail.
* Test invoice number nếu có.
* Test invoice view data.

### Kết quả mong đợi

* PAID order có invoice.
* Không có invoice mồ côi.
* Invoice data đúng.
* Demo in/xem hóa đơn ổn định.

---

## PAC-TASK-472 - Add AI Guardrail high-risk test suite

Nhóm cần gom test high-risk cho AI Guardrail.

### Nội dung công việc

* Test diagnosis blocked.
* Test prescribing blocked.
* Test dosage advice blocked.
* Test unsafe output blocked.
* Test safe response template.

### Kết quả mong đợi

* AI không vượt phạm vi an toàn.
* Guardrail có bằng chứng test.
* Provider không nhận request bị chặn.
* Demo AI an toàn hơn.

---

## PAC-TASK-473 - Add AI Audit privacy tests

Nhóm cần viết test đảm bảo AI Audit không lưu raw PII.

### Nội dung công việc

* Test request có PII.
* Kiểm tra audit chỉ lưu metadata/minimized summary.
* Kiểm tra provider payload đã redact nếu cần.
* Test không lưu raw prompt chứa thông tin cá nhân.
* Ghi expected result.

### Kết quả mong đợi

* AI Audit tuân thủ privacy baseline.
* Không lộ thông tin khách hàng.
* Governance đáng tin.
* CI bắt lỗi nếu audit lưu quá nhiều.

---

## PAC-TASK-474 - Add AI provider fallback tests

Nhóm cần viết test cho fallback từ Google AI sang MockAI.

### Nội dung công việc

* Mock Google AI timeout.
* Mock Google AI quota/error.
* Kiểm tra MockAI được dùng.
* Kiểm tra provider_requested/provider_used.
* Kiểm tra fallback metadata trong audit.

### Kết quả mong đợi

* Demo không gãy khi Google AI lỗi.
* MockAI fallback đúng vai trò.
* Audit minh bạch.
* AI service ổn định.

---

## PAC-TASK-475 - Add Graph Sync outbox and retry tests

Nhóm cần viết test cho Graph Sync outbox và retry.

### Nội dung công việc

* Test tạo outbox event.
* Test worker claim job.
* Test success status.
* Test retry khi fail.
* Test max retry chuyển FAILED.

### Kết quả mong đợi

* Graph Sync đáng tin.
* Job không mất.
* Failure được ghi nhận.
* Freshness detection có dữ liệu.

---

## PAC-TASK-476 - Add Neo4j projection tests

Nhóm cần viết test projection dữ liệu sang Neo4j.

### Nội dung công việc

* Test Medicine node.
* Test ActiveIngredient node.
* Test CONTAINS relationship.
* Test INTERACTS_WITH relationship.
* Test metadata sourceVersion/syncedAt.

### Kết quả mong đợi

* Neo4j projection đúng PostgreSQL.
* Graph data trace được.
* Không duplicate node/edge.
* Graph-RAG có context đúng.

---

## PAC-TASK-477 - Add Graph freshness tests

Nhóm cần viết test cho graph freshness detection.

### Nội dung công việc

* Test graph fresh.
* Test pending job stale.
* Test failed job stale.
* Test missing sourceVersion stale.
* Test freshness reason.

### Kết quả mong đợi

* Stale graph được phát hiện.
* Không dùng graph âm thầm.
* Graph-RAG fallback đúng.
* Safety graph được bảo vệ.

---

## PAC-TASK-478 - Add Graph-RAG fallback tests

Nhóm cần viết test cho Graph-RAG fallback.

### Nội dung công việc

* Test Neo4j unavailable.
* Test graph stale.
* Test fallback sang PostgreSQL.
* Test graphUsed=false.
* Test freshness warning.

### Kết quả mong đợi

* Graph-RAG không gãy khi Neo4j lỗi.
* PostgreSQL authoritative fallback hoạt động.
* Response minh bạch.
* Demo Graph-RAG ổn định.

---

## PAC-TASK-479 - Add Reports deterministic calculation tests

Nhóm cần viết test cho các báo cáo deterministic.

### Nội dung công việc

* Test Revenue Report chỉ tính PAID orders.
* Test Top Medicines Report.
* Test Inventory Report từ MedicineBatch.
* Test DRAFT/CANCELLED bị loại đúng.
* Test filter date nếu có.

### Kết quả mong đợi

* Reports không phụ thuộc AI.
* Số liệu chính xác.
* Demo report đáng tin.
* Exclusion rules có test.

---

## PAC-TASK-480 - Add full MVP smoke test checklist

Nhóm cần viết checklist smoke test toàn bộ MVP.

### Nội dung công việc

* Checklist login/role.
* Checklist medicine/inventory.
* Checklist POS/Interaction/Checkout.
* Checklist AI/Graph.
* Checklist reports/demo reset.

### Kết quả mong đợi

* Tester kiểm tra nhanh toàn hệ thống.
* Release/Demo Owner có cơ sở đánh giá.
* Lỗi critical phát hiện trước demo.
* Test exit rõ ràng.

---

## PAC-TASK-481 - Configure local Node.js project setup guide

Nhóm cần viết hướng dẫn setup local theo Node.js, không coi Docker là official path.

### Nội dung công việc

* Ghi version Node.js khuyến nghị.
* Ghi cách install dependencies.
* Ghi cách chạy frontend/backend.
* Ghi các bước migrate/seed.
* Ghi troubleshooting cơ bản.

### Kết quả mong đợi

* Người mới setup được dự án local.
* Official setup path rõ ràng.
* Docker chỉ là optional nếu có.
* Demo setup ít lỗi hơn.

---

## PAC-TASK-482 - Configure frontend environment variables guide

Nhóm cần ghi hướng dẫn biến môi trường frontend.

### Nội dung công việc

* Liệt kê biến Supabase public URL/anon key.
* Liệt kê backend API base URL.
* Ghi file env mẫu.
* Không đưa secret backend vào frontend.
* Ghi cách kiểm tra config.

### Kết quả mong đợi

* Frontend config rõ.
* Không lộ secret.
* Developer setup đúng.
* Login/API calls hoạt động.

---

## PAC-TASK-483 - Configure backend environment variables guide

Nhóm cần ghi hướng dẫn biến môi trường backend.

### Nội dung công việc

* Liệt kê database URL.
* Liệt kê Supabase service config.
* Liệt kê Neo4j config.
* Liệt kê Google AI/MockAI config.
* Ghi file env mẫu không chứa secret thật.

### Kết quả mong đợi

* Backend setup đúng.
* Secret được quản lý an toàn.
* AI/Graph/Auth hoạt động.
* Người mới dễ chạy local.

---

## PAC-TASK-484 - Configure Supabase project setup instructions

Nhóm cần viết hướng dẫn setup Supabase.

### Nội dung công việc

* Ghi cách tạo Supabase project.
* Ghi cách lấy URL/keys cần thiết.
* Ghi cách tạo demo users hoặc dùng script.
* Ghi lưu ý Supabase Auth.
* Không tạo custom password database.

### Kết quả mong đợi

* Supabase Auth được setup đúng.
* Demo users hoạt động.
* Backend map được user_profiles.
* Auth baseline được giữ.

---

## PAC-TASK-485 - Configure Neo4j AuraDB setup instructions

Nhóm cần viết hướng dẫn setup Neo4j AuraDB.

### Nội dung công việc

* Ghi cách tạo AuraDB instance.
* Ghi cách lấy URI/user/password.
* Ghi biến môi trường cần thiết.
* Ghi cách kiểm tra connection.
* Ghi cách rebuild projection.

### Kết quả mong đợi

* Neo4j dùng được cho Graph Sync/Graph-RAG.
* Developer setup graph dễ hơn.
* Không dùng standalone Cypher seed làm official flow.
* Demo graph ổn định.

---

## PAC-TASK-486 - Configure Google AI API key setup instructions

Nhóm cần viết hướng dẫn cấu hình Google AI API key.

### Nội dung công việc

* Ghi nơi đặt API key ở backend env.
* Ghi provider/model config.
* Ghi lưu ý không commit secret.
* Ghi cách kiểm tra AI call.
* Ghi fallback MockAI khi key lỗi.

### Kết quả mong đợi

* Google AI primary provider hoạt động.
* Secret không lộ.
* AI demo có config rõ.
* MockAI fallback sẵn sàng.

---

## PAC-TASK-487 - Configure MockAI fallback setup instructions

Nhóm cần ghi hướng dẫn bật/tắt MockAI fallback.

### Nội dung công việc

* Ghi biến config fallback.
* Ghi khi nào MockAI được dùng.
* Ghi cách demo fallback.
* Ghi audit metadata provider_used.
* Ghi MockAI không phải primary MVP.

### Kết quả mong đợi

* Team hiểu vai trò MockAI.
* Demo không gãy khi Google AI lỗi.
* AI Audit ghi fallback đúng.
* Scope AI rõ ràng.

---

## PAC-TASK-488 - Add Prisma generate and migrate setup command

Nhóm cần ghi command Prisma generate/migrate.

### Nội dung công việc

* Thêm script generate.
* Thêm script migrate local.
* Ghi thứ tự chạy.
* Ghi cách reset local nếu cần.
* Không dùng migration destructive trên demo/staging.

### Kết quả mong đợi

* Database schema setup đúng.
* Developer chạy Prisma dễ.
* Migration check có thể đưa vào CI.
* Giảm lỗi schema mismatch.

---

## PAC-TASK-489 - Add seed command for curated MVP data

Nhóm cần tạo hoặc ghi command seed curated MVP data.

### Nội dung công việc

* Thêm command seed.
* Seed medicines, ingredients, mappings, suppliers, batches, rules, orders.
* Không seed raw catalog data chưa curated làm operational data.
* Seeder idempotent nếu có thể.
* Ghi cách chạy local.

### Kết quả mong đợi

* Demo data tái tạo được.
* MVP có dữ liệu đủ.
* Không phụ thuộc dữ liệu thô.
* Smoke test có dataset ổn định.

---

## PAC-TASK-490 - Add graph projection rebuild command

Nhóm cần tạo command rebuild graph projection.

### Nội dung công việc

* Đọc dữ liệu từ PostgreSQL.
* Rebuild Medicine, ActiveIngredient, CONTAINS, INTERACTS_WITH.
* Cập nhật sourceVersion/syncedAt.
* Kiểm tra graph freshness sau rebuild.
* Log kết quả.

### Kết quả mong đợi

* Neo4j khớp PostgreSQL.
* Demo reset có graph mới.
* Graph-RAG dùng context fresh.
* Không dùng manual Cypher seed làm official path.

---

## PAC-TASK-491 - Add demo reset command entrypoint

Nhóm cần tạo entrypoint cho demo reset.

### Nội dung công việc

* Tạo command `demo:reset` hoặc tương đương.
* Gọi reset PostgreSQL local.
* Seed MVP curated data.
* Rebuild Neo4j projection.
* Chạy smoke tests sau reset.

### Kết quả mong đợi

* Team reset demo local bằng một workflow.
* Dữ liệu demo tái lập.
* Graph và smoke test đi kèm.
* Demo chuẩn bị nhanh hơn.

---

## PAC-TASK-492 - Add demo reset environment safety checks

Nhóm cần thêm guard môi trường cho demo reset.

### Nội dung công việc

* Kiểm tra environment là local.
* Refuse nếu staging/demo/production/unknown.
* Có confirmation nếu cần.
* Log environment hiện tại.
* Không chạy destructive reset ngoài local.

### Kết quả mong đợi

* Không xóa nhầm dữ liệu demo/staging/production.
* Reset workflow an toàn.
* Baseline local-only được enforce.
* Release confidence cao hơn.

---

## PAC-TASK-493 - Configure GitHub Actions lint check

Nhóm cần cấu hình lint trong GitHub Actions.

### Nội dung công việc

* Thêm workflow lint frontend/backend.
* Chạy trên PR vào develop/main.
* Fail nếu lint lỗi.
* Ghi command lint trong README.
* Không bỏ qua lỗi lint quan trọng.

### Kết quả mong đợi

* Code style được kiểm tra tự động.
* PR chất lượng hơn.
* CI có quality gate đầu tiên.
* Dễ phát hiện lỗi sớm.

---

## PAC-TASK-494 - Configure GitHub Actions type check

Nhóm cần cấu hình type check trong CI.

### Nội dung công việc

* Chạy type check frontend.
* Chạy type check backend.
* Fail PR nếu type error.
* Ghi command local.
* Đảm bảo workflow dùng đúng Node version.

### Kết quả mong đợi

* Type error không vào develop/main.
* Code an toàn hơn.
* AI agent code dễ bị bắt lỗi hơn.
* Build ổn định hơn.

---

## PAC-TASK-495 - Configure GitHub Actions frontend build

Nhóm cần cấu hình frontend build check.

### Nội dung công việc

* Chạy Next.js build.
* Dùng environment build phù hợp.
* Fail CI nếu build lỗi.
* Cache dependencies nếu cần.
* Ghi log rõ.

### Kết quả mong đợi

* Frontend không vỡ build.
* PR được kiểm tra trước merge.
* Demo deployment ít rủi ro.
* CI gate đúng baseline.

---

## PAC-TASK-496 - Configure GitHub Actions backend build

Nhóm cần cấu hình backend build check.

### Nội dung công việc

* Chạy NestJS/Node backend build.
* Kiểm tra TypeScript compile.
* Fail nếu build lỗi.
* Dùng env test phù hợp.
* Ghi command local.

### Kết quả mong đợi

* Backend build ổn định.
* PR lỗi compile bị chặn.
* CI gate đầy đủ.
* Release/demo an toàn hơn.

---

## PAC-TASK-497 - Configure GitHub Actions unit test check

Nhóm cần chạy unit test trong CI.

### Nội dung công việc

* Thêm step unit tests.
* Chạy backend unit tests.
* Chạy frontend component tests nếu có.
* Fail nếu test fail.
* Ghi cách chạy local.

### Kết quả mong đợi

* Unit tests thành quality gate.
* Critical logic được bảo vệ.
* CI báo lỗi sớm.
* Merge an toàn hơn.

---

## PAC-TASK-498 - Configure GitHub Actions integration test check

Nhóm cần chạy integration tests trong CI với isolation.

### Nội dung công việc

* Cấu hình integration test step.
* Đảm bảo không dùng demo database.
* Set test env/schema cleanup.
* Fail nếu integration test fail.
* Ghi warning safety.

### Kết quả mong đợi

* API critical paths được kiểm tra.
* Không phá demo data.
* CI gate nghiêm túc hơn.
* Release readiness tốt hơn.

---

## PAC-TASK-499 - Configure Prisma schema validation check

Nhóm cần thêm Prisma schema validation vào CI.

### Nội dung công việc

* Chạy `prisma validate` hoặc command tương ứng.
* Fail nếu schema lỗi.
* Chạy trước build/test nếu cần.
* Ghi command local.
* Kiểm tra format nếu có.

### Kết quả mong đợi

* Schema Prisma hợp lệ trước merge.
* Migration/build ít lỗi.
* Database model ổn định hơn.
* CI đúng baseline.

---

## PAC-TASK-500 - Configure Prisma migration check

Nhóm cần cấu hình migration check trong CI.

### Nội dung công việc

* Kiểm tra migration hợp lệ.
* Kiểm tra schema drift nếu có khả năng.
* Không chạy destructive migrate lên demo/prod.
* Ghi command an toàn.
* Fail nếu migration thiếu/sai.

### Kết quả mong đợi

* Migration đáng tin.
* Không merge schema thay đổi thiếu migration.
* Database setup ổn định.
* Giảm lỗi demo.

---

## PAC-TASK-501 - Add CI guard to prevent destructive tests against demo database

Nhóm cần thêm guard để CI không chạy destructive tests trên demo database.

### Nội dung công việc

* Kiểm tra database URL/environment.
* Refuse nếu trỏ tới demo/staging/production.
* Thêm warning rõ.
* Áp dụng cho integration tests và reset scripts.
* Ghi log khi bị chặn.

### Kết quả mong đợi

* Không xóa nhầm dữ liệu demo.
* CI safety tốt hơn.
* Test isolation được enforce.
* Baseline testing được bảo vệ.

---

## PAC-TASK-502 - Add CI branch protection expectation notes

Nhóm cần ghi chú kỳ vọng branch protection và CI gate.

### Nội dung công việc

* Ghi develop/main cần CI pass.
* Ghi release PR từ develop sang main.
* Ghi lint/type/build/test/migration checks.
* Ghi không merge main trực tiếp.
* Link với branch-on-jira.md sau này.

### Kết quả mong đợi

* Nhóm hiểu quy trình merge.
* CI gate rõ trong Jira/docs.
* Main ổn định cho demo.
* Branch policy không mơ hồ.

---

## PAC-TASK-503 - Add local-only guard for demo:reset script

Nhóm cần guard local-only trực tiếp trong script demo reset.

### Nội dung công việc

* Kiểm tra `NODE_ENV` hoặc app env.
* Kiểm tra database host/name nếu cần.
* Refuse nếu không phải local.
* Yêu cầu confirm flag nếu cần.
* Viết test/checklist cho guard.

### Kết quả mong đợi

* demo:reset không chạy nhầm môi trường.
* Dữ liệu demo/staging/production được bảo vệ.
* Team yên tâm dùng script.
* Release readiness tốt hơn.

---

## PAC-TASK-504 - Add Chrome desktop target verification checklist

Nhóm cần checklist xác nhận hệ thống chạy tốt trên Chrome desktop/laptop.

### Nội dung công việc

* Test login.
* Test POS.
* Test inventory.
* Test checkout.
* Test AI/Graph UI.
* Ghi browser version nếu cần.

### Kết quả mong đợi

* Browser target MVP được xác nhận.
* Demo trên Chrome ổn định.
* Không mở rộng full cross-browser.
* Tester có checklist rõ.

---

## PAC-TASK-505 - Add basic responsive verification checklist

Nhóm cần checklist responsive cơ bản, không full mobile QA.

### Nội dung công việc

* Kiểm tra layout laptop/desktop.
* Kiểm tra màn hình nhỏ hơn cơ bản.
* Kiểm tra sidebar/table không vỡ nghiêm trọng.
* Ghi lỗi UX nếu có.
* Không biến thành full responsive testing.

### Kết quả mong đợi

* UI không vỡ rõ ràng khi demo.
* Basic responsive đạt mức chấp nhận.
* Scope kiểm thử phù hợp thời gian.
* Không mở rộng quá MVP.

---

## PAC-TASK-506 - Write project README setup section

Nhóm cần viết phần setup chính trong README.

### Nội dung công việc

* Mô tả stack dự án.
* Ghi prerequisite.
* Ghi cách install.
* Ghi cách chạy frontend/backend.
* Link tới setup chi tiết.

### Kết quả mong đợi

* Người mới đọc README setup được.
* Stack chính thức rõ ràng.
* Không mơ hồ Docker official path.
* Documentation hỗ trợ demo.

---

## PAC-TASK-507 - Write backend setup and run instructions

Nhóm cần viết hướng dẫn setup backend.

### Nội dung công việc

* Ghi command install.
* Ghi env backend.
* Ghi Prisma generate/migrate.
* Ghi command run dev.
* Ghi troubleshooting thường gặp.

### Kết quả mong đợi

* Backend chạy được local.
* Developer mới dễ setup.
* Giảm lỗi config.
* Tài liệu rõ ràng.

---

## PAC-TASK-508 - Write frontend setup and run instructions

Nhóm cần viết hướng dẫn setup frontend.

### Nội dung công việc

* Ghi command install.
* Ghi env frontend.
* Ghi command run dev.
* Ghi cách cấu hình backend base URL.
* Ghi lỗi thường gặp.

### Kết quả mong đợi

* Frontend chạy được local.
* Login/API integration dễ kiểm tra.
* Người mới setup nhanh.
* Demo frontend ổn định.

---

## PAC-TASK-509 - Write database migration and seed instructions

Nhóm cần viết hướng dẫn migration và seed database.

### Nội dung công việc

* Ghi command migrate.
* Ghi command generate.
* Ghi command seed.
* Ghi seed curated MVP data.
* Ghi cảnh báo không chạy destructive reset ngoài local.

### Kết quả mong đợi

* Database setup đúng.
* Demo data tái lập.
* Không nhầm raw catalog với operational seed.
* Migration/seed dễ review.

---

## PAC-TASK-510 - Write Supabase Auth setup notes

Nhóm cần viết ghi chú setup Supabase Auth.

### Nội dung công việc

* Ghi cách tạo Supabase project.
* Ghi config frontend/backend.
* Ghi demo user provisioning.
* Ghi user_profiles mapping.
* Ghi không dùng custom password hash.

### Kết quả mong đợi

* Auth setup đúng baseline.
* Supabase Auth rõ vai trò.
* Team không quay lại JWT custom.
* Documentation hỗ trợ review.

---

## PAC-TASK-511 - Write Neo4j setup and graph rebuild notes

Nhóm cần viết hướng dẫn Neo4j và rebuild graph.

### Nội dung công việc

* Ghi cách cấu hình Neo4j AuraDB.
* Ghi env variables.
* Ghi graph rebuild command.
* Ghi Graph Sync outbox flow.
* Ghi fallback khi Neo4j unavailable.

### Kết quả mong đợi

* Graph setup dễ làm.
* Neo4j projection đúng baseline.
* Demo Graph-RAG có hướng dẫn.
* Không dùng Cypher seed làm flow chính thức.

---

## PAC-TASK-512 - Write AI provider and MockAI fallback setup notes

Nhóm cần viết hướng dẫn AI provider và fallback.

### Nội dung công việc

* Ghi Google AI primary.
* Ghi MockAI fallback.
* Ghi env/config.
* Ghi guardrail/audit bắt buộc.
* Ghi không expose API key frontend.

### Kết quả mong đợi

* AI setup rõ.
* Demo fallback dễ trình bày.
* AI safety được nhấn mạnh.
* Không nhầm MockAI-only MVP.

---

## PAC-TASK-513 - Write demo account guide

Nhóm cần viết hướng dẫn tài khoản demo.

### Nội dung công việc

* Ghi các role demo: Admin, Staff, Warehouse.
* Ghi account first-login riêng.
* Ghi quyền chính mỗi role.
* Ghi scenario dùng từng account.
* Không ghi password thật trong public doc nếu không phù hợp.

### Kết quả mong đợi

* Demo chuyển role dễ.
* Người chấm hiểu phân quyền.
* First-login flow có account riêng.
* Account guide rõ ràng.

---

## PAC-TASK-514 - Write demo scenario script for login and role switching

Nhóm cần viết kịch bản demo login và phân quyền.

### Nội dung công việc

* Demo Admin login.
* Demo Staff login.
* Demo Warehouse login.
* Show sidebar/actions khác nhau.
* Show forbidden case nếu cần.

### Kết quả mong đợi

* Phân quyền được trình bày rõ.
* Supabase Auth thể hiện đúng.
* Multi-role/permission baseline dễ hiểu.
* Demo mở đầu mạch lạc.

---

## PAC-TASK-515 - Write demo scenario script for Stock Import and MedicineBatch

Nhóm cần viết kịch bản demo nhập kho và MedicineBatch.

### Nội dung công việc

* Tạo stock import draft.
* Thêm dòng nhập có batch/expiry.
* Confirm import.
* Xem MedicineBatch/Inventory Summary.
* Demo batch merge hoặc expiry mismatch nếu có.

### Kết quả mong đợi

* Người xem hiểu MedicineBatch là source of truth.
* Stock Import transaction được thể hiện.
* Batch/expiry rõ ràng.
* Inventory demo thuyết phục.

---

## PAC-TASK-516 - Write demo scenario script for POS and Checkout

Nhóm cần viết kịch bản demo bán hàng từ POS đến checkout.

### Nội dung công việc

* Tạo Draft Order.
* Search/add medicine.
* Hiển thị sellable stock.
* Checkout bằng cash/bank transfer.
* Xem invoice sau checkout.

### Kết quả mong đợi

* POS MVP được trình bày đầy đủ.
* Checkout transaction rõ.
* Payment/invoice trong transaction.
* Draft Order xử lý lỗi nếu có.

---

## PAC-TASK-517 - Write demo scenario script for InteractionAlert and HIGH note

Nhóm cần viết kịch bản demo cảnh báo tương tác thuốc HIGH.

### Nội dung công việc

* Thêm thuốc gây interaction.
* Gọi interaction check.
* Hiển thị HIGH alert.
* Acknowledge alert.
* Nhập consultation note.
* Checkout sau khi xử lý xong.

### Kết quả mong đợi

* Safety flow nổi bật.
* HIGH alert không bị bỏ qua.
* InteractionAlert persisted.
* Consultation note bắt buộc được trình bày.

---

## PAC-TASK-518 - Write demo scenario script for AI Copilot and AI Audit

Nhóm cần viết kịch bản demo AI Copilot và AI Audit.

### Nội dung công việc

* Generate AI explanation.
* Generate AI draft note.
* Staff edit/confirm draft.
* Demo guardrail blocked request nếu cần.
* Show AI Audit metadata.

### Kết quả mong đợi

* AI feature được trình bày an toàn.
* Staff confirmation rõ.
* Guardrail/Audit thể hiện đúng.
* MockAI fallback có thể demo nếu Google AI lỗi.

---

## PAC-TASK-519 - Write demo scenario script for Graph Sync and Graph-RAG

Nhóm cần viết kịch bản demo Graph Sync và Graph-RAG.

### Nội dung công việc

* Show data source từ PostgreSQL.
* Trigger/verify graph sync.
* Show Graph-RAG explanation metadata.
* Show graphUsed/freshness/provenance.
* Demo fallback khi graph unavailable/stale nếu có.

### Kết quả mong đợi

* Neo4j projection được giải thích rõ.
* Graph-RAG không bị hiểu là source of truth.
* Freshness/fallback nổi bật.
* Demo kỹ thuật thuyết phục.

---

## PAC-TASK-520 - Write demo scenario script for Reports and Settings

Nhóm cần viết kịch bản demo Reports và System Settings.

### Nội dung công việc

* Demo Revenue Report.
* Demo Top Medicines Report.
* Demo Inventory Report.
* Demo near-expiry threshold setting.
* Show report deterministic, không phụ thuộc AI.

### Kết quả mong đợi

* Reports MVP rõ ràng.
* Settings tối thiểu được trình bày.
* Người xem hiểu dữ liệu được tính từ source chính.
* Không nhầm AI narrative là MVP report bắt buộc.

---

## PAC-TASK-521 - Write MVP traceability matrix summary

Nhóm cần viết summary traceability cho MVP.

### Nội dung công việc

* Map Epic → Story → Task.
* Map Story → Requirement/Use Case/Test nếu có.
* Highlight critical modules.
* Ghi thiếu sót nếu chưa test.
* Dùng cho final review.

### Kết quả mong đợi

* Tài liệu có trace rõ.
* Dễ kiểm tra coverage requirement.
* Tester/Project Leader review được.
* Giảm rủi ro bỏ sót scope.

---

## PAC-TASK-522 - Write release/demo readiness checklist

Nhóm cần viết checklist trước release/demo freeze.

### Nội dung công việc

* Kiểm tra CI pass.
* Kiểm tra smoke test pass.
* Kiểm tra demo data reset.
* Kiểm tra env config.
* Kiểm tra known issues.

### Kết quả mong đợi

* Project Leader có cơ sở approve demo.
* Release/Demo Owner biết việc cần chốt.
* Demo freeze rõ ràng.
* Không dựa vào cảm giác informal.

---

## PAC-TASK-523 - Write known limitations and out-of-scope guard section

Nhóm cần viết phần limitations và out-of-scope guard.

### Nội dung công việc

* Ghi các phần không thuộc MVP.
* Ghi Should-have không phải blocker.
* Ghi Future scope.
* Ghi AI/medical disclaimer.
* Ghi technical limitations nếu có.

### Kết quả mong đợi

* Người chấm hiểu phạm vi.
* Không bị đánh giá thiếu vì scope future.
* AI agent không thêm scope mới.
* Project boundary rõ ràng.

---

## PAC-TASK-524 - Prepare contingency evidence screenshots list

Nhóm cần chuẩn bị danh sách screenshot evidence dự phòng.

### Nội dung công việc

* Liệt kê screenshot cần chụp.
* Auth/RBAC.
* POS/Checkout/Invoice.
* InteractionAlert/AI/Graph.
* Reports/Settings.
* Không thay thế running product.

### Kết quả mong đợi

* Có evidence hỗ trợ nếu demo gặp lỗi nhỏ.
* Team biết cần chụp gì.
* Không xem screenshot/video là thay thế sản phẩm chạy thật.
* Demo readiness tốt hơn.

---

## PAC-TASK-525 - Prepare final smoke test report template

Nhóm cần chuẩn bị template báo cáo final smoke test.

### Nội dung công việc

* Tạo bảng test case.
* Có expected result/actual result/pass-fail.
* Có tester/date/env.
* Có conclusion pass/fail.
* Có blockers/known issues.

### Kết quả mong đợi

* Tester điền report nhanh.
* Project Leader approve release có căn cứ.
* Smoke test minh bạch.
* Demo freeze rõ ràng.

---

# Sprint 11 — Should-have / Advanced

## PAC-TASK-526 - Build Admin Graph Sync Status list UI

Nhóm cần xây dựng UI danh sách trạng thái Graph Sync cho Admin.

### Nội dung công việc

* Hiển thị danh sách graph sync jobs.
* Hiển thị status pending/success/failed.
* Hiển thị entity type và timestamps.
* Filter theo status nếu đơn giản.
* Gắn permission Admin.

### Kết quả mong đợi

* Admin giám sát Graph Sync dễ hơn.
* Đây là Should-have, không chặn MVP.
* Failure dễ quan sát.
* Không thay thế backend Graph Sync bắt buộc.

---

## PAC-TASK-527 - Build Graph Sync job detail UI

Nhóm cần xây dựng màn hình chi tiết job Graph Sync.

### Nội dung công việc

* Hiển thị entity id/type.
* Hiển thị retry count.
* Hiển thị error summary.
* Hiển thị sourceVersion nếu có.
* Không lộ secret Neo4j.

### Kết quả mong đợi

* Admin/debug dễ kiểm tra job lỗi.
* UI hỗ trợ vận hành nâng cao.
* Không expose thông tin nhạy cảm.
* Should-have rõ scope.

---

## PAC-TASK-528 - Build manual graph retry action for Admin

Nhóm cần tạo action retry thủ công cho Graph Sync job failed.

### Nội dung công việc

* Thêm nút retry cho job failed.
* Gắn permission Admin.
* Reset status/retry logic phù hợp.
* Hiển thị confirm dialog.
* Ghi audit nếu cần.

### Kết quả mong đợi

* Admin retry job lỗi.
* Không cần thao tác database trực tiếp.
* Đây là Should-have, không blocker.
* Graph Sync vận hành tốt hơn.

---

## PAC-TASK-529 - Build manual graph rebuild action for Admin

Nhóm cần tạo action rebuild graph thủ công cho Admin.

### Nội dung công việc

* Thêm action rebuild projection.
* Chỉ Admin được dùng.
* Cảnh báo thao tác có thể mất thời gian.
* Không chạy nếu env không phù hợp.
* Ghi kết quả rebuild.

### Kết quả mong đợi

* Admin có công cụ phục hồi graph.
* Không phải MVP blocker.
* Graph projection dễ bảo trì.
* Safety env vẫn cần được giữ.

---

## PAC-TASK-530 - Add Graph Sync Status permission checks

Nhóm cần thêm permission guard cho Graph Sync Status UI/API.

### Nội dung công việc

* Chỉ Admin xem status.
* Staff/Warehouse không truy cập.
* Backend trả 403 nếu sai quyền.
* Sidebar hiển thị theo permission.
* Test quyền cơ bản.

### Kết quả mong đợi

* Graph Sync Status không lộ sai role.
* Admin vận hành an toàn.
* UI/API thống nhất permission.
* Should-have bảo mật đúng.

---

## PAC-TASK-531 - Build read-only Graph Explorer UI

Nhóm cần xây dựng Graph Explorer read-only.

### Nội dung công việc

* Hiển thị graph node-edge cơ bản.
* Dữ liệu từ allowlisted queries.
* Không cho raw Cypher.
* Staff chỉ read-only nếu có quyền.
* Warehouse không có access MVP.

### Kết quả mong đợi

* Graph dễ demo trực quan.
* Không mở quyền nguy hiểm.
* Đây là Should-have, không blocker.
* Graph Explorer không thay Graph-RAG core.

---

## PAC-TASK-532 - Build Graph Explorer node detail panel

Nhóm cần tạo panel chi tiết node trong Graph Explorer.

### Nội dung công việc

* Hiển thị node type.
* Hiển thị name/code.
* Hiển thị relational id.
* Hiển thị isActive/source metadata nếu phù hợp.
* Không hiển thị dữ liệu nhạy cảm.

### Kết quả mong đợi

* Người xem hiểu node graph.
* Debug projection dễ hơn.
* UI trực quan.
* Không lộ dữ liệu ngoài scope.

---

## PAC-TASK-533 - Build Graph Explorer relationship detail panel

Nhóm cần tạo panel chi tiết relationship trong Graph Explorer.

### Nội dung công việc

* Hiển thị relationship type.
* Với CONTAINS, hiển thị Medicine–Ingredient.
* Với INTERACTS_WITH, hiển thị ruleId/severity.
* Hiển thị provenance nếu có.
* Không cho edit relationship.

### Kết quả mong đợi

* Graph relationship dễ hiểu.
* Interaction edge trace được.
* UI chỉ đọc.
* Không thay đổi dữ liệu graph từ Explorer.

---

## PAC-TASK-534 - Add Graph Explorer permission checks

Nhóm cần thêm permission cho Graph Explorer.

### Nội dung công việc

* Gắn permission view graph explorer.
* Staff read-only nếu được phép.
* Warehouse không access.
* Admin access nếu có quyền.
* Backend guard cho API graph explorer.

### Kết quả mong đợi

* Graph Explorer đúng phân quyền.
* Không lộ raw graph data.
* UI không thay thế backend security.
* Should-have an toàn.

---

## PAC-TASK-535 - Ensure Graph Explorer uses allowlisted templates only

Nhóm cần đảm bảo Graph Explorer chỉ dùng query templates allowlisted.

### Nội dung công việc

* Không có raw Cypher input.
* API nhận query type/params thay vì Cypher string.
* Parameterize query.
* Giới hạn depth/result.
* Test không submit raw Cypher.

### Kết quả mong đợi

* Graph Explorer an toàn.
* Không bị injection/query tùy ý.
* Staff không chạy raw Cypher.
* Dữ liệu graph được kiểm soát.

---

## PAC-TASK-536 - Build AI Provider Settings UI

Nhóm cần xây dựng UI cấu hình AI Provider dạng Should-have.

### Nội dung công việc

* Hiển thị provider hiện tại.
* Cho Admin thay đổi provider nếu backend hỗ trợ.
* Không expose API key.
* Validate input.
* Ghi rõ đây là Should-have.

### Kết quả mong đợi

* Admin có UI cấu hình AI nâng cao.
* MVP vẫn có backend config bắt buộc.
* Secret không lộ frontend.
* Không làm blocker cho MVP.

---

## PAC-TASK-537 - Build AI model configuration UI

Nhóm cần tạo UI cấu hình model AI nếu mở rộng.

### Nội dung công việc

* Hiển thị model đang dùng.
* Cho chọn model từ danh sách allowlisted.
* Không cho nhập tùy tiện nếu không kiểm soát.
* Lưu config qua backend.
* Ghi audit nếu thay đổi.

### Kết quả mong đợi

* Model config dễ quản trị.
* Không phá provider governance.
* UI là Should-have.
* MVP vẫn chạy bằng config backend/env.

---

## PAC-TASK-538 - Build Prompt Management list UI

Nhóm cần xây dựng UI danh sách prompt templates.

### Nội dung công việc

* Hiển thị prompt code.
* Hiển thị version.
* Hiển thị status active/approved.
* Filter/search nếu đơn giản.
* Gắn permission Admin.

### Kết quả mong đợi

* Admin xem được prompt versions.
* Prompt governance trực quan hơn.
* Không bắt buộc cho MVP.
* Prompt vẫn có version trong backend.

---

## PAC-TASK-539 - Build Prompt Management version detail UI

Nhóm cần tạo màn hình chi tiết prompt version.

### Nội dung công việc

* Hiển thị prompt content.
* Hiển thị version metadata.
* Hiển thị created/updated info.
* Không cho edit nếu scope chỉ read-only.
* Bảo vệ permission.

### Kết quả mong đợi

* Prompt version dễ review.
* AI Audit trace prompt được.
* UI hỗ trợ governance nâng cao.
* Không làm thay đổi prompt ngoài kiểm soát.

---

## PAC-TASK-540 - Add prompt approval status display

Nhóm cần hiển thị trạng thái approval của prompt.

### Nội dung công việc

* Hiển thị approved/active/deprecated nếu có.
* Giải thích prompt nào đang được dùng.
* Không cho dùng prompt chưa approved.
* UI chỉ hiển thị metadata cần thiết.
* Gắn với prompt versioning.

### Kết quả mong đợi

* Prompt governance rõ hơn.
* Admin biết prompt active.
* AI service không dùng prompt chưa duyệt.
* Should-have UI hoàn chỉnh hơn.

---

## PAC-TASK-541 - Build System Audit Log UI

Nhóm cần xây dựng UI xem System Audit Log dạng Should-have.

### Nội dung công việc

* Hiển thị audit events.
* Hiển thị actor, action, entity, timestamp.
* Pagination.
* Permission Admin.
* Không hiển thị dữ liệu nhạy cảm.

### Kết quả mong đợi

* Admin xem audit dễ hơn.
* Backend audit logging vẫn mandatory.
* UI không chặn MVP.
* Transparency tốt hơn.

---

## PAC-TASK-542 - Add System Audit Log filters

Nhóm cần thêm filter cho System Audit Log UI.

### Nội dung công việc

* Filter theo action.
* Filter theo actor.
* Filter theo entity type.
* Filter theo date range.
* Validate query params.

### Kết quả mong đợi

* Audit log dễ tra cứu.
* Admin review nhanh hơn.
* Không biến thành analytics phức tạp.
* Should-have UI hữu ích hơn.

---

## PAC-TASK-543 - Implement Supabase Storage upload flow for medicine images

Nhóm cần triển khai flow upload ảnh thuốc bằng Supabase Storage dạng Should-have.

### Nội dung công việc

* Tạo backend/frontend flow upload.
* Validate user permission.
* Lưu URL/path vào medicine record hoặc table liên quan.
* Không expose service key frontend.
* Giới hạn file size/type.

### Kết quả mong đợi

* Có thể upload ảnh thuốc nếu kịp.
* Đây là Should-have, không blocker.
* File storage an toàn.
* Medicine UI trực quan hơn.

---

## PAC-TASK-544 - Build medicine image upload UI

Nhóm cần tạo UI upload ảnh thuốc.

### Nội dung công việc

* Thêm input chọn ảnh.
* Preview ảnh.
* Gọi upload flow.
* Hiển thị loading/success/error.
* Cho xóa/thay ảnh nếu scope cho phép.

### Kết quả mong đợi

* User upload ảnh dễ.
* UI thân thiện hơn.
* Không ảnh hưởng MVP nếu chưa làm.
* File validation rõ.

---

## PAC-TASK-545 - Add Supabase Storage file validation

Nhóm cần validate file upload.

### Nội dung công việc

* Chỉ cho file image type hợp lệ.
* Giới hạn dung lượng.
* Reject file nguy hiểm.
* Trả lỗi rõ.
* Không lưu file nếu validation fail.

### Kết quả mong đợi

* Upload an toàn hơn.
* Không nhận file không hợp lệ.
* Storage không bị lạm dụng.
* UX rõ ràng.

---

## PAC-TASK-546 - Implement Supabase Realtime inventory update listener

Nhóm cần thử nghiệm realtime listener cho inventory dạng Should-have.

### Nội dung công việc

* Subscribe thay đổi inventory/batch nếu phù hợp.
* Cập nhật state UI khi có thay đổi.
* Bảo vệ permission.
* Không làm realtime thành MVP blocker.
* Có fallback nếu không hoạt động.

### Kết quả mong đợi

* UI inventory/POS có thể cập nhật nhanh hơn.
* Realtime là advanced feature.
* Core POS vẫn hoạt động không realtime.
* Không phụ thuộc vào realtime cho checkout safety.

---

## PAC-TASK-547 - Build realtime POS stock refresh behavior

Nhóm cần thêm hành vi refresh stock trong POS khi có update realtime.

### Nội dung công việc

* POS nhận event stock change.
* Refresh sellable stock display.
* Cảnh báo nếu item trong draft vượt stock mới.
* Không tự checkout lại.
* Có fallback polling/manual refresh.

### Kết quả mong đợi

* Staff thấy stock mới hơn.
* POS UX tốt hơn.
* Checkout backend vẫn validate cuối cùng.
* Realtime không thay thế transaction safety.

---

## PAC-TASK-548 - Add realtime fallback polling behavior

Nhóm cần thêm fallback polling nếu realtime không khả dụng.

### Nội dung công việc

* Thiết kế polling nhẹ hoặc manual refresh.
* Không gây tải quá mức.
* Dùng khi realtime connection fail.
* Hiển thị trạng thái nếu cần.
* Không làm blocker cho MVP.

### Kết quả mong đợi

* UI vẫn cập nhật stock khi realtime lỗi.
* Hệ thống ổn định hơn.
* Realtime không là single point of failure.
* Advanced scope an toàn.

---

## PAC-TASK-549 - Build Notification Center UI

Nhóm cần xây dựng Notification Center dạng Should-have.

### Nội dung công việc

* Hiển thị danh sách thông báo.
* Hiển thị loại low-stock/near-expiry/system.
* Hiển thị read/unread.
* Permission theo role.
* Không chặn MVP.

### Kết quả mong đợi

* User xem notification tập trung.
* Operational alerts dễ theo dõi.
* Đây là advanced feature.
* MVP vẫn có dashboard/report nếu chưa có notification.

---

## PAC-TASK-550 - Implement low-stock notification generation

Nhóm cần tạo thông báo low-stock nếu làm Notification.

### Nội dung công việc

* Dựa trên sellable quantity.
* Không tính expired batch.
* Tạo notification cho Admin/Warehouse.
* Tránh duplicate notification quá nhiều.
* Ghi source entity.

### Kết quả mong đợi

* Low-stock notification đúng.
* Staff không nhận dashboard operational nếu không cần.
* Notification trace được.
* Should-have vận hành tốt hơn.

---

## PAC-TASK-551 - Implement near-expiry notification generation

Nhóm cần tạo notification near-expiry.

### Nội dung công việc

* Dựa trên threshold system settings.
* Tạo notification theo batch near-expiry.
* Không nhầm expired và near-expiry.
* Tránh duplicate quá mức.
* Gắn permission Admin/Warehouse.

### Kết quả mong đợi

* Admin/Warehouse nhận cảnh báo gần hết hạn.
* Notification dùng đúng threshold.
* Batch trace rõ.
* Advanced workflow hữu ích.

---

## PAC-TASK-552 - Build read/unread notification state

Nhóm cần thêm trạng thái read/unread cho Notification Center.

### Nội dung công việc

* Lưu read/unread state.
* Cho user mark as read.
* Hiển thị badge unread.
* Không ảnh hưởng core workflow.
* Permission theo user.

### Kết quả mong đợi

* Notification UX hoàn chỉnh hơn.
* User quản lý thông báo dễ.
* Đây không phải MVP blocker.
* Dữ liệu notification có trạng thái.

---

## PAC-TASK-553 - Implement scheduled near-expiry scan job

Nhóm cần tạo scheduled job quét near-expiry nếu làm notification.

### Nội dung công việc

* Chạy định kỳ hoặc manual trigger.
* Tìm batch gần hết hạn.
* Tạo notification nếu chưa có.
* Dùng threshold setting.
* Không thay thế report/filter hiện có.

### Kết quả mong đợi

* Near-expiry notification tự động hơn.
* Scheduled job là advanced.
* MVP vẫn có near-expiry report/dashboard.
* Không tạo duplicate quá nhiều.

---

## PAC-TASK-554 - Implement AI Business Report Narrative API

Nhóm cần tạo API AI narrative cho report dạng Should-have.

### Nội dung công việc

* Lấy dữ liệu report deterministic.
* Gửi summary đã minimize tới AI.
* Tạo narrative giải thích xu hướng.
* Chạy guardrail/audit.
* Không để AI tự tính doanh thu.

### Kết quả mong đợi

* AI narrative hỗ trợ đọc report.
* Số liệu vẫn do deterministic report tính.
* AI Audit ghi request.
* Đây không phải MVP requirement bắt buộc.

---

## PAC-TASK-555 - Build AI Business Report Narrative UI

Nhóm cần tạo UI hiển thị AI narrative cho report.

### Nội dung công việc

* Thêm section “AI narrative” trong report.
* Gọi API narrative.
* Hiển thị disclaimer.
* Xử lý loading/error/fallback.
* Không thay thế bảng số liệu chính.

### Kết quả mong đợi

* Report có phần diễn giải nâng cao.
* User vẫn thấy số liệu deterministic.
* AI không quyết định report.
* Feature rõ Should-have.

---

# Sprint 12 — Future / Commercial Expansion

## PAC-TASK-556 - Document Full Customer Management future scope

Nhóm cần ghi nhận Full Customer Management là future scope.

### Nội dung công việc

* Mô tả customer profile đầy đủ.
* Ghi không phải MVP.
* Phân biệt với walk-in customer trong POS.
* Ghi dependency nếu mở rộng.
* Gắn Epic/Story future.

### Kết quả mong đợi

* Customer Management không bị nhầm là MVP đầy đủ.
* POS walk-in vẫn hợp lệ.
* Future backlog rõ.
* AI agent không implement quá scope.

---

## PAC-TASK-557 - Document customer profile CRUD future scope

Nhóm cần mô tả customer CRUD tương lai.

### Nội dung công việc

* Ghi create/update/view customer profile.
* Ghi fields dự kiến.
* Ghi privacy/security consideration.
* Ghi authorization future.
* Không implement MVP.

### Kết quả mong đợi

* Customer CRUD có định hướng.
* Không ảnh hưởng MVP.
* Future planning rõ.
* Scope kiểm soát tốt.

---

## PAC-TASK-558 - Document customer purchase history expansion

Nhóm cần ghi nhận mở rộng lịch sử mua hàng khách hàng.

### Nội dung công việc

* Mô tả customer purchase history.
* Ghi Staff ownership/permission cần giữ.
* Ghi Admin read-all future permission nếu cần.
* Ghi privacy consideration.
* Không implement full scope trong MVP.

### Kết quả mong đợi

* Future customer history rõ.
* Không lộ dữ liệu ngoài scope.
* Ownership baseline được giữ.
* Planning dễ hơn.

---

## PAC-TASK-559 - Document Online Commerce storefront future scope

Nhóm cần ghi nhận storefront online là future scope.

### Nội dung công việc

* Mô tả website bán hàng online.
* Ghi khác với POS nội bộ.
* Ghi module sản phẩm/catalog cần mở rộng.
* Ghi không thuộc MVP.
* Ghi dependency shipping/payment online nếu có.

### Kết quả mong đợi

* Online commerce không bị đưa vào MVP.
* POS scope giữ ổn định.
* Future roadmap rõ.
* Không làm tăng scope hiện tại.

---

## PAC-TASK-560 - Document online cart and wishlist future scope

Nhóm cần mô tả cart/wishlist tương lai.

### Nội dung công việc

* Ghi cart cho customer portal.
* Ghi wishlist.
* Ghi auth/customer dependency.
* Ghi không dùng trong POS MVP.
* Ghi data tables future nếu cần.

### Kết quả mong đợi

* Cart/wishlist rõ là commercial expansion.
* Không ảnh hưởng checkout MVP.
* AI agent không tạo cart trong hiện tại.
* Scope future có note.

---

## PAC-TASK-561 - Document online checkout separation from POS checkout

Nhóm cần ghi rõ online checkout future tách với POS checkout MVP.

### Nội dung công việc

* Mô tả POS checkout hiện tại.
* Mô tả online checkout future.
* Ghi khác nhau về customer, shipping, online payment.
* Ghi không reuse sai endpoint nếu không thiết kế.
* Không implement online checkout.

### Kết quả mong đợi

* Checkout MVP không bị pha scope online.
* Future design rõ hơn.
* Payment/shipping online không thành blocker.
* Documentation tránh hiểu nhầm.

---

## PAC-TASK-562 - Document Product Variant Catalog future scope

Nhóm cần ghi nhận Product Variant Catalog là future scope.

### Nội dung công việc

* Mô tả products/product_variants dùng cho commercial catalog.
* Ghi MVP sales dùng medicine_id.
* Ghi product variant không là sales key MVP.
* Ghi dependency online commerce.
* Không implement trong MVP.

### Kết quả mong đợi

* Catalog future không làm rối MVP.
* medicine_id business key được bảo vệ.
* Real catalog data có vị trí đúng.
* AI agent không dùng product_variant cho POS.

---

## PAC-TASK-563 - Document product images and documents commercial scope

Nhóm cần ghi nhận ảnh/tài liệu sản phẩm là commercial expansion.

### Nội dung công việc

* Mô tả product_images/product_documents.
* Ghi liên quan catalog online.
* Ghi Supabase Storage có thể là Should-have riêng.
* Ghi không bắt buộc MVP.
* Ghi future data handling.

### Kết quả mong đợi

* Product media scope rõ.
* Không ép MVP phải có ảnh/tài liệu.
* Future catalog có định hướng.
* Documentation nhất quán.

---

## PAC-TASK-564 - Document real catalog data import future workflow

Nhóm cần mô tả workflow import dữ liệu catalog thật trong tương lai.

### Nội dung công việc

* Ghi raw catalog data cần review/curate.
* Ghi mapping sang Medicine/ActiveIngredient nếu dùng operational seed.
* Ghi data quality checks.
* Ghi không import thẳng raw data vào MVP operational data.
* Ghi future ETL workflow.

### Kết quả mong đợi

* Real catalog data được dùng đúng vai trò.
* MVP seed vẫn curated.
* Data quality risk được ghi nhận.
* Future import có hướng rõ.

---

## PAC-TASK-565 - Document Multi-store future scope

Nhóm cần ghi nhận multi-store là future scope.

### Nội dung công việc

* Mô tả nhiều cửa hàng.
* Ghi MVP dùng một logical default store.
* Ghi tác động tới inventory/order/report.
* Ghi không implement multi-store workflow.
* Ghi future permission/data scope.

### Kết quả mong đợi

* Multi-store không vào MVP.
* Default store assumption rõ.
* Future roadmap có note.
* Không phức tạp hóa hiện tại.

---

## PAC-TASK-566 - Document default store assumption for MVP

Nhóm cần ghi rõ giả định default store cho MVP.

### Nội dung công việc

* Ghi một logical store mặc định.
* Ghi order/inventory/report dùng default store.
* Ghi multi-store future.
* Ghi không cần UI chọn store trong MVP.
* Ghi ảnh hưởng testing.

### Kết quả mong đợi

* MVP data model dễ hiểu.
* Không tạo store workflow ngoài scope.
* Reports không bị rối.
* AI agent không thêm store selector.

---

## PAC-TASK-567 - Document Multi-warehouse future scope

Nhóm cần ghi nhận multi-warehouse là future scope.

### Nội dung công việc

* Mô tả nhiều warehouse.
* Ghi MVP dùng một logical default warehouse.
* Ghi tác động tới MedicineBatch/Stock Import.
* Ghi stock transfer dependency.
* Không implement trong MVP.

### Kết quả mong đợi

* Multi-warehouse không làm rối inventory MVP.
* Future scope rõ.
* Default warehouse được bảo vệ.
* Không thêm workflow kho phức tạp.

---

## PAC-TASK-568 - Document default warehouse assumption for MVP

Nhóm cần ghi rõ giả định default warehouse cho MVP.

### Nội dung công việc

* Ghi một warehouse mặc định.
* Ghi MedicineBatch thuộc default warehouse logic.
* Ghi không có stock transfer.
* Ghi testing/demo dựa trên một kho.
* Ghi future expansion.

### Kết quả mong đợi

* Inventory MVP rõ phạm vi.
* Không cần warehouse selector.
* FEFO đơn giản hơn.
* Future multi-warehouse có nền tảng.

---

## PAC-TASK-569 - Document Stock Transfer future workflow

Nhóm cần mô tả stock transfer tương lai.

### Nội dung công việc

* Mô tả chuyển kho giữa warehouse/store.
* Ghi cần multi-warehouse trước.
* Ghi trạng thái transfer dự kiến.
* Ghi audit requirement.
* Không implement trong MVP.

### Kết quả mong đợi

* Stock Transfer rõ là future.
* MVP không bị yêu cầu chuyển kho.
* Inventory Adjustment không bị dùng sai để transfer.
* Roadmap rõ hơn.

---

## PAC-TASK-570 - Document stock transfer audit future requirement

Nhóm cần ghi yêu cầu audit cho stock transfer tương lai.

### Nội dung công việc

* Ghi actor tạo/confirm transfer.
* Ghi source/destination warehouse.
* Ghi batch và quantity.
* Ghi status transitions.
* Ghi audit log bắt buộc khi mở rộng.

### Kết quả mong đợi

* Future transfer có traceability.
* Không làm mất batch audit.
* Inventory governance được giữ.
* Documentation future đầy đủ.

---

## PAC-TASK-571 - Document Forecasting and reorder suggestion future scope

Nhóm cần ghi nhận forecasting/reorder suggestion là future scope.

### Nội dung công việc

* Mô tả forecast dựa trên sales history.
* Mô tả reorder suggestion.
* Ghi không phải MVP.
* Ghi dữ liệu cần có.
* Ghi không ảnh hưởng low-stock MVP.

### Kết quả mong đợi

* Forecasting không thành MVP blocker.
* Low-stock hiện tại vẫn deterministic.
* Future analytics có định hướng.
* Scope rõ ràng.

---

## PAC-TASK-572 - Document forecast data requirements and limitations

Nhóm cần ghi dữ liệu và giới hạn cho forecasting future.

### Nội dung công việc

* Ghi cần đủ lịch sử bán.
* Ghi cần loại trừ dữ liệu demo ít.
* Ghi cần seasonality nếu nâng cao.
* Ghi hạn chế độ chính xác.
* Ghi không dùng cho quyết định bắt buộc MVP.

### Kết quả mong đợi

* Forecast future thực tế hơn.
* Không hứa quá mức.
* Demo MVP không bị đánh giá thiếu forecast.
* Documentation trung thực.

---

## PAC-TASK-573 - Document Promotion and Coupon future scope

Nhóm cần ghi nhận promotion/coupon là future scope.

### Nội dung công việc

* Mô tả promotion/coupon engine.
* Ghi không áp dụng vào MVP checkout.
* Ghi impact tới pricing/payment/report.
* Ghi cần rule validation riêng.
* Không implement trong MVP.

### Kết quả mong đợi

* Discount không chen vào POS MVP.
* Checkout total hiện tại đơn giản.
* Future scope rõ.
* AI agent không thêm coupon logic.

---

## PAC-TASK-574 - Document discount not included in MVP checkout

Nhóm cần ghi rõ MVP checkout không có discount.

### Nội dung công việc

* Ghi total = sum order items.
* Ghi không có coupon/promotion.
* Ghi report revenue không xử lý discount.
* Ghi future expansion nếu có.
* Ghi guardrail cho AI agent.

### Kết quả mong đợi

* Checkout MVP không bị scope creep.
* Payment/invoice dễ kiểm tra.
* Revenue report rõ.
* Future discount tách riêng.

---

## PAC-TASK-575 - Document Shipping and Delivery future scope

Nhóm cần ghi nhận shipping/delivery là future scope.

### Nội dung công việc

* Mô tả delivery workflow tương lai.
* Ghi liên quan online commerce.
* Ghi POS MVP không có shipping.
* Ghi delivery status future.
* Không implement trong MVP.

### Kết quả mong đợi

* Shipping không vào MVP.
* POS checkout không bị phức tạp.
* Future online commerce rõ hơn.
* Documentation nhất quán.

---

## PAC-TASK-576 - Document delivery status future workflow

Nhóm cần mô tả status workflow cho delivery tương lai.

### Nội dung công việc

* Ghi các status dự kiến như pending, preparing, shipped, delivered, cancelled nếu cần.
* Ghi liên quan order online.
* Ghi audit/tracking requirement.
* Ghi không áp dụng POS MVP.
* Không implement hiện tại.

### Kết quả mong đợi

* Delivery future có hướng thiết kế.
* Không làm rối order status MVP DRAFT/PAID/CANCELLED.
* Scope tách biệt.
* Future docs đầy đủ.

---

## PAC-TASK-577 - Document Review and CMS future scope

Nhóm cần ghi nhận review/CMS là future scope.

### Nội dung công việc

* Mô tả product review.
* Mô tả CMS content.
* Ghi liên quan storefront online.
* Ghi không thuộc MVP nhà thuốc nội bộ.
* Không implement hiện tại.

### Kết quả mong đợi

* Review/CMS không bị đưa vào MVP.
* Online commerce future rõ.
* Core pharmacy workflow tập trung.
* Scope được kiểm soát.

---

## PAC-TASK-578 - Document product review moderation future consideration

Nhóm cần ghi chú review moderation trong future scope.

### Nội dung công việc

* Ghi cần moderation/reporting nếu có review.
* Ghi role/permission future.
* Ghi spam/abuse consideration.
* Ghi không ảnh hưởng MVP.
* Không implement moderation hiện tại.

### Kết quả mong đợi

* Future review có kiểm soát.
* Không bỏ qua moderation risk.
* MVP không bị mở rộng.
* Documentation đầy đủ hơn.

---

## PAC-TASK-579 - Document commercial expansion dependency map

Nhóm cần tạo dependency map cho các phần commercial expansion.

### Nội dung công việc

* Map Online Commerce phụ thuộc Product Catalog, Customer, Shipping, Payment Online.
* Map Multi-warehouse phụ thuộc stock transfer.
* Map Promotion ảnh hưởng checkout/report.
* Map Forecast phụ thuộc sales history.
* Ghi rõ không thuộc MVP.

### Kết quả mong đợi

* Future roadmap có thứ tự.
* Team không implement lộn scope.
* Dependency rõ khi mở rộng.
* Documentation chiến lược hơn.

---

## PAC-TASK-580 - Document final out-of-scope guardrails for AI agents

Nhóm cần viết guardrails cuối cùng để AI agent không code sai scope.

### Nội dung công việc

* Liệt kê nội dung không thuộc MVP.
* Liệt kê baseline kỹ thuật không được vi phạm.
* Ghi cảnh báo không dùng prefix PAI.
* Ghi không thêm scope mới.
* Ghi cách xử lý nếu gặp yêu cầu mâu thuẫn.

### Kết quả mong đợi

* AI agent có guardrail rõ.
* Dự án không quay lại baseline cũ.
* MVP/Should-have/Future được phân biệt.
* Jira Task set an toàn cho coding.

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

Thông tin cảnh báo tương tác thuốc và nội dung AI trong hệ thống chỉ mang tính hỗ trợ tham khảo cho đồ án, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.
