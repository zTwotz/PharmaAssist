# 4B_Task_Description_MVP_POS_Interaction_Checkout_146_290.md

# Mẫu Description cho 145 Task phần 4B

Tài liệu này mô tả chi tiết từng Task trong file:

```text
4B_Task_List_MVP_POS_Interaction_Checkout_146_290.md
```

Phạm vi Task:

```text
PAC-TASK-146 → PAC-TASK-290
```

Nhóm chức năng:

1. Stock Import completion.
2. Inventory Adjustment.
3. POS Draft Order.
4. DrugInteraction Rule.
5. InteractionAlert Lifecycle.
6. Checkout transaction.
7. FEFO allocation.
8. Payment.
9. Invoice.

Baseline bắt buộc:

* Inventory source of truth là `MedicineBatch`.
* Không sửa trực tiếp quantity của `MedicineBatch`.
* Inventory Adjustment bắt buộc có `reason`.
* POS dùng `Draft Order` trước checkout.
* Order status MVP chỉ gồm `DRAFT`, `PAID`, `CANCELLED`.
* Checkout chính thức dùng transactional `POST /checkout`.
* FEFO allocation là bắt buộc.
* Payment và Invoice phải được tạo trong checkout transaction.
* Mỗi order chỉ có một `SUCCESS` payment.
* Drug interaction rule ở cấp `ActiveIngredient–ActiveIngredient`.
* `InteractionAlert` phải được persist.
* HIGH alert bắt buộc acknowledgement và consultation note trước checkout.
* Warehouse không được truy cập InteractionAlert.
* Neo4j không quyết định checkout.

---

# Sprint 3 — Stock Import Completion

## PAC-TASK-146 - Implement batch merge when medicine/batch/expiry match

Nhóm cần triển khai logic cộng thêm số lượng vào batch hiện có khi Stock Import nhập cùng thuốc, cùng batch number và cùng expiry date.

### Nội dung công việc

* Tìm `MedicineBatch` theo `medicine_id`, normalized `batch_number` và `expiry_date`.
* Nếu batch tồn tại và cả 3 thông tin trùng, cộng thêm quantity từ dòng nhập.
* Thực hiện trong transaction confirm Stock Import.
* Không tạo batch mới nếu batch identity đã tồn tại.
* Đảm bảo quantity sau merge chính xác.

### Kết quả mong đợi

* Batch hợp lệ được merge đúng.
* Không tạo duplicate MedicineBatch.
* Stock Import tăng tồn kho đúng.
* FEFO sau này đọc được batch quantity chính xác.

### AI Agent Notes

* Chỉ merge khi `medicine_id + batch_number + expiry_date` trùng.
* Không merge nếu expiry date khác.

---

## PAC-TASK-147 - Add unit tests for valid batch merge rule

Nhóm cần viết unit test cho rule merge batch hợp lệ.

### Nội dung công việc

* Test import vào batch chưa tồn tại.
* Test import vào batch đã tồn tại với cùng medicine, batch và expiry.
* Kiểm tra quantity sau merge.
* Kiểm tra không tạo duplicate batch.
* Test batch number có normalize.

### Kết quả mong đợi

* Rule merge batch có test bảo vệ.
* CI phát hiện nếu logic merge bị sửa sai.
* Dữ liệu Stock Import đáng tin hơn.
* Batch identity được kiểm tra ổn định.

---

## PAC-TASK-148 - Show batch merge result after Stock Import confirm

Nhóm cần hiển thị kết quả merge batch sau khi confirm phiếu nhập kho.

### Nội dung công việc

* Sau khi confirm import thành công, hiển thị batch được tạo mới hoặc được cộng thêm.
* Hiển thị quantity trước/sau nếu có dữ liệu.
* Hiển thị thông báo thành công rõ ràng.
* Cho phép user mở Batch Detail nếu cần.
* Không hiển thị thông tin sai khi transaction fail.

### Kết quả mong đợi

* Warehouse hiểu import đã tạo batch mới hay merge batch cũ.
* UI hỗ trợ kiểm tra sau nhập kho.
* Dữ liệu batch minh bạch hơn.
* Demo luồng nhập kho dễ hiểu hơn.

---

## PAC-TASK-149 - Implement expiry mismatch rejection

Nhóm cần triển khai rule reject khi cùng medicine và batch number nhưng expiry date khác.

### Nội dung công việc

* Khi confirm Stock Import, tìm batch theo `medicine_id` và normalized `batch_number`.
* Nếu đã có batch cùng medicine/batch nhưng expiry khác, reject dòng nhập.
* Không tạo batch mới trong trường hợp này.
* Không merge quantity.
* Trả lỗi rõ cho Warehouse.

### Kết quả mong đợi

* Không có hai batch cùng medicine/batch number nhưng khác expiry.
* Dữ liệu batch không bị mâu thuẫn.
* Stock Import fail đúng khi expiry mismatch.
* Rule batch identity đúng baseline.

### AI Agent Notes

* Không silently merge expiry mismatch.
* Không tạo duplicate batch để né lỗi.

---

## PAC-TASK-150 - Return line-level expiry mismatch errors

Nhóm cần trả lỗi cụ thể theo dòng nhập khi có expiry mismatch.

### Nội dung công việc

* Xác định dòng nhập nào bị mismatch expiry.
* Trả message có medicine, batch number và expiry liên quan.
* Không trả lỗi mơ hồ cho toàn bộ phiếu nếu có thể chỉ rõ dòng sai.
* UI nhận lỗi và hiển thị gần dòng nhập.
* Không cập nhật MedicineBatch khi lỗi xảy ra.

### Kết quả mong đợi

* Warehouse biết dòng nào cần sửa.
* Trải nghiệm sửa lỗi nhập kho rõ ràng.
* Transaction vẫn rollback toàn bộ.
* Không có partial confirm.

---

## PAC-TASK-151 - Add tests for expiry mismatch rejection

Nhóm cần viết test cho rule reject expiry mismatch.

### Nội dung công việc

* Seed batch có medicine và batch number cố định.
* Confirm import với cùng medicine/batch nhưng expiry khác.
* Kiểm tra API trả lỗi.
* Kiểm tra MedicineBatch không thay đổi.
* Kiểm tra Stock Import vẫn chưa confirmed.

### Kết quả mong đợi

* Expiry mismatch được bảo vệ bằng test.
* Không có dữ liệu batch sai hạn sử dụng.
* CI bắt được lỗi nếu rule bị phá.
* Stock Import an toàn hơn.

---

## PAC-TASK-152 - Lock confirmed Stock Import status

Nhóm cần khóa phiếu nhập kho sau khi confirmed.

### Nội dung công việc

* Khi confirm thành công, set status thành `CONFIRMED`.
* Không cho sửa thông tin phiếu đã confirmed.
* Không cho thêm/sửa/xóa dòng nhập sau confirmed.
* Backend enforce trạng thái.
* UI hiển thị read-only.

### Kết quả mong đợi

* Phiếu nhập confirmed không bị thay đổi.
* Dữ liệu nhập kho có tính bất biến.
* Tồn kho không bị lệch do sửa phiếu cũ.
* Audit nhập kho đáng tin cậy.

---

## PAC-TASK-153 - Build confirmed Stock Import read-only UI

Nhóm cần xây dựng giao diện read-only cho phiếu nhập đã confirmed.

### Nội dung công việc

* Hiển thị thông tin phiếu nhập.
* Hiển thị danh sách dòng nhập.
* Disable nút edit/delete/confirm.
* Hiển thị trạng thái `CONFIRMED`.
* Hiển thị thời gian và người confirm nếu có.

### Kết quả mong đợi

* User xem được phiếu nhập cũ.
* Không thao tác chỉnh sửa phiếu confirmed.
* UI rõ trạng thái nghiệp vụ.
* Demo nhập kho dễ trình bày hơn.

---

## PAC-TASK-154 - Prevent duplicate Stock Import confirm

Nhóm cần chặn confirm lặp một phiếu nhập đã confirmed.

### Nội dung công việc

* Backend kiểm tra status trước khi confirm.
* Nếu status không phải Draft, trả lỗi.
* Disable nút confirm ở UI khi đã confirmed.
* Xử lý double-click confirm.
* Thêm test confirm hai lần.

### Kết quả mong đợi

* Không cộng tồn kho hai lần.
* Không tạo dữ liệu batch sai.
* Confirm import idempotent ở mức nghiệp vụ.
* UI tránh double-submit.

---

## PAC-TASK-155 - Add tests for confirmed Stock Import immutability

Nhóm cần viết test cho tính bất biến của phiếu nhập confirmed.

### Nội dung công việc

* Test update line sau confirmed bị reject.
* Test delete line sau confirmed bị reject.
* Test confirm lại bị reject.
* Test UI/API state phù hợp nếu có.
* Kiểm tra MedicineBatch không bị thay đổi sai.

### Kết quả mong đợi

* Confirmed Stock Import không bị sửa.
* Rule immutability được bảo vệ.
* Không phát sinh double stock.
* CI kiểm tra được lỗi nghiêm trọng.

---

## PAC-TASK-156 - Write audit log for Stock Import confirm

Nhóm cần ghi audit log khi confirm Stock Import.

### Nội dung công việc

* Ghi actor thực hiện confirm.
* Ghi stock import id.
* Ghi thời gian confirm.
* Ghi tổng số dòng hoặc thông tin tóm tắt.
* Không lưu dữ liệu nhạy cảm không cần thiết.

### Kết quả mong đợi

* Có thể truy vết ai đã xác nhận nhập kho.
* Audit hỗ trợ kiểm tra tồn kho.
* Demo thể hiện tính minh bạch.
* Backend audit logging đúng baseline.

---

## PAC-TASK-157 - Show Stock Import audit metadata in detail UI

Nhóm cần hiển thị metadata audit cơ bản trong chi tiết phiếu nhập.

### Nội dung công việc

* Hiển thị created_by, confirmed_by nếu có.
* Hiển thị created_at, confirmed_at.
* Hiển thị trạng thái phiếu.
* Không hiển thị dữ liệu nhạy cảm.
* UI đọc dữ liệu từ API detail.

### Kết quả mong đợi

* User thấy thông tin truy vết phiếu nhập.
* Admin/Warehouse kiểm tra được lịch sử cơ bản.
* UI rõ ràng hơn.
* Không cần System Audit Log UI nâng cao trong MVP.

---

## PAC-TASK-158 - Add Stock Import traceability notes

Nhóm cần bổ sung ghi chú traceability cho nghiệp vụ Stock Import.

### Nội dung công việc

* Ghi rõ Stock Import liên quan MedicineBatch.
* Ghi rõ rule merge/reject batch.
* Ghi liên kết Story, Epic và Test.
* Ghi guardrail không sửa confirmed import.
* Cập nhật tài liệu Jira hoặc traceability notes.

### Kết quả mong đợi

* Developer hiểu đúng luồng nhập kho.
* Tester biết case cần kiểm tra.
* AI agent không quay lại baseline sai.
* Tài liệu dễ đối chiếu khi review.

---

## PAC-TASK-159 - Add Stock Import confirm integration tests

Nhóm cần viết integration test cho confirm Stock Import.

### Nội dung công việc

* Test confirm import thành công.
* Test tạo mới MedicineBatch.
* Test merge batch hợp lệ.
* Test expiry mismatch rollback.
* Test confirmed import không confirm lại.

### Kết quả mong đợi

* Luồng nhập kho quan trọng có test.
* MedicineBatch update đúng.
* Transaction rollback đúng.
* Dữ liệu inventory đáng tin.

---

## PAC-TASK-160 - Add Stock Import smoke test checklist

Nhóm cần viết checklist smoke test cho Stock Import.

### Nội dung công việc

* Test tạo phiếu nhập Draft.
* Test thêm dòng nhập.
* Test confirm thành công.
* Test batch merge.
* Test expiry mismatch.
* Test confirmed read-only.

### Kết quả mong đợi

* Tester có checklist kiểm tra nhanh.
* Demo nhập kho ổn định.
* Các lỗi chính được phát hiện trước demo.
* Checklist trace được với Story US-39 → US-48.

---

# Sprint 4 — Inventory Adjustment

## PAC-TASK-161 - Create inventory_adjustments Prisma model

Nhóm cần tạo model phiếu điều chỉnh tồn kho.

### Nội dung công việc

* Tạo model `InventoryAdjustment`.
* Thêm actor, status, reason, created_at, confirmed_at.
* Liên kết với adjustment lines.
* Chuẩn bị status Draft/Confirmed/Cancelled nếu cần.
* Tạo migration.

### Kết quả mong đợi

* Database lưu được phiếu điều chỉnh.
* Mỗi adjustment có reason.
* Có thể trace ai tạo/confirm.
* Không sửa trực tiếp MedicineBatch.

---

## PAC-TASK-162 - Create inventory_adjustment_lines Prisma model

Nhóm cần tạo model dòng điều chỉnh tồn kho.

### Nội dung công việc

* Tạo model `InventoryAdjustmentLine`.
* Liên kết với `InventoryAdjustment`.
* Liên kết với `MedicineBatch`.
* Lưu adjustment type hoặc quantity delta.
* Chuẩn bị lưu quantity trước/sau nếu cần audit.

### Kết quả mong đợi

* Một phiếu adjustment có thể có dòng batch cụ thể.
* Adjustment tác động đúng MedicineBatch.
* Dữ liệu đủ để audit.
* Không điều chỉnh aggregate inventory.

---

## PAC-TASK-163 - Implement create Inventory Adjustment API

Nhóm cần tạo API tạo phiếu điều chỉnh tồn kho.

### Nội dung công việc

* Tạo endpoint create adjustment.
* Kiểm tra permission Admin/Warehouse.
* Nhận reason và danh sách batch cần điều chỉnh.
* Validate input cơ bản.
* Lưu adjustment ở trạng thái Draft.

### Kết quả mong đợi

* User có quyền tạo được adjustment.
* Chưa confirm thì chưa đổi MedicineBatch.
* Reason được lưu.
* Dữ liệu sẵn sàng cho confirm.

---

## PAC-TASK-164 - Build create Inventory Adjustment screen

Nhóm cần tạo màn hình tạo Inventory Adjustment.

### Nội dung công việc

* Tạo form nhập reason.
* Cho phép chọn batch.
* Cho phép nhập số lượng điều chỉnh.
* Hiển thị preview nếu có.
* Gọi API tạo adjustment.

### Kết quả mong đợi

* Warehouse/Admin tạo được adjustment từ UI.
* Form rõ ràng.
* Reason là bắt buộc.
* Không có chức năng sửa trực tiếp batch quantity.

---

## PAC-TASK-165 - Build MedicineBatch selector for adjustment

Nhóm cần xây dựng component chọn batch để điều chỉnh.

### Nội dung công việc

* Tìm kiếm MedicineBatch theo thuốc/batch number.
* Hiển thị medicine, batch number, expiry date, quantity hiện tại.
* Chỉ chọn batch hợp lệ.
* Gắn batch vào adjustment line.
* Xử lý empty/loading/error.

### Kết quả mong đợi

* User chọn đúng batch cần điều chỉnh.
* Không điều chỉnh nhầm thuốc.
* UI rõ thông tin batch.
* Dữ liệu gửi API chính xác.

---

## PAC-TASK-166 - Validate adjustment type and quantity

Nhóm cần validate loại điều chỉnh và số lượng điều chỉnh.

### Nội dung công việc

* Xác định adjustment tăng hoặc giảm.
* Validate quantity lớn hơn 0.
* Validate delta hợp lệ.
* Không cho dữ liệu rỗng hoặc sai format.
* Trả lỗi rõ ràng.

### Kết quả mong đợi

* Adjustment line hợp lệ.
* Không lưu quantity sai.
* UI/API thống nhất validation.
* Chuẩn bị cho rule không âm.

---

## PAC-TASK-167 - Enforce required adjustment reason in backend

Nhóm cần enforce reason bắt buộc ở backend.

### Nội dung công việc

* Validate `reason` không null/rỗng.
* Trim reason.
* Reject confirm hoặc create nếu thiếu reason.
* Trả lỗi 400 rõ ràng.
* Viết test cho reason rỗng.

### Kết quả mong đợi

* Mọi adjustment có lý do.
* Audit tồn kho rõ ràng.
* Không thể điều chỉnh kho không giải thích.
* Rule được enforce ở backend.

---

## PAC-TASK-168 - Add required reason validation in UI

Nhóm cần thêm validation reason trên UI.

### Nội dung công việc

* Đánh dấu reason là bắt buộc.
* Không cho submit nếu reason rỗng.
* Hiển thị lỗi ngay trên form.
* Trim input trước khi gửi.
* Đồng bộ với backend validation.

### Kết quả mong đợi

* User biết cần nhập lý do.
* Giảm request lỗi.
* UI rõ nghiệp vụ.
* Adjustment data có reason đầy đủ.

---

## PAC-TASK-169 - Show batch before/after quantity preview

Nhóm cần hiển thị preview số lượng batch trước và sau điều chỉnh.

### Nội dung công việc

* Lấy quantity hiện tại của batch.
* Tính quantity sau adjustment.
* Hiển thị before/after trong UI.
* Cảnh báo nếu quantity sau điều chỉnh âm.
* Cập nhật preview khi user đổi quantity.

### Kết quả mong đợi

* User thấy ảnh hưởng trước khi confirm.
* Giảm lỗi điều chỉnh nhầm.
* UI minh bạch hơn.
* Quantity âm được cảnh báo sớm.

---

## PAC-TASK-170 - Implement confirm Inventory Adjustment transaction

Nhóm cần triển khai transaction xác nhận adjustment.

### Nội dung công việc

* Kiểm tra adjustment còn Draft.
* Validate reason và lines.
* Trong transaction, cập nhật MedicineBatch.
* Ghi status Confirmed.
* Rollback nếu một line lỗi.

### Kết quả mong đợi

* Adjustment confirm cập nhật batch đúng.
* Không có partial update.
* Adjustment confirmed bị khóa.
* Dữ liệu tồn kho nhất quán.

---

## PAC-TASK-171 - Update MedicineBatch through adjustment transaction only

Nhóm cần đảm bảo MedicineBatch chỉ được cập nhật qua transaction hợp lệ.

### Nội dung công việc

* Cập nhật quantity trong confirm adjustment.
* Không expose direct update quantity.
* Ghi actor và reason.
* Kiểm tra service khác không gọi update tùy tiện.
* Rà soát code liên quan.

### Kết quả mong đợi

* MedicineBatch quantity có trace.
* Không sửa kho ngoài workflow.
* Baseline audit được bảo vệ.
* Dữ liệu tồn kho đáng tin.

### AI Agent Notes

* Không tạo API `PATCH /batches/{id}/quantity`.
* Quantity chỉ thay đổi qua import, adjustment, checkout.

---

## PAC-TASK-172 - Prevent adjustment from making quantity negative

Nhóm cần chặn adjustment khiến batch quantity âm.

### Nội dung công việc

* Tính quantity sau adjustment.
* Nếu nhỏ hơn 0, reject transaction.
* Trả lỗi rõ cho user.
* UI hiển thị warning.
* Viết test case giảm quá số lượng.

### Kết quả mong đợi

* Không có MedicineBatch quantity âm.
* Adjustment fail đúng khi dữ liệu không hợp lệ.
* Transaction rollback.
* Tồn kho ổn định.

---

## PAC-TASK-173 - Lock confirmed Inventory Adjustment

Nhóm cần khóa adjustment sau khi confirmed.

### Nội dung công việc

* Không cho update/delete adjustment confirmed.
* UI hiển thị read-only.
* Backend reject thao tác sửa.
* Không cho confirm lại.
* Test confirmed immutability.

### Kết quả mong đợi

* Adjustment confirmed không bị sửa.
* Audit tồn kho đáng tin.
* Không cập nhật batch lần hai.
* Dữ liệu ổn định.

---

## PAC-TASK-174 - Create Inventory Adjustment list API

Nhóm cần tạo API danh sách adjustment.

### Nội dung công việc

* Tạo endpoint list adjustment.
* Hỗ trợ pagination.
* Hỗ trợ filter theo status/date nếu đơn giản.
* Kiểm tra permission.
* Trả dữ liệu tóm tắt.

### Kết quả mong đợi

* Admin/Warehouse xem được danh sách adjustment theo quyền.
* UI history có dữ liệu.
* API không trả quá nhiều dữ liệu.
* Dễ trace adjustment.

---

## PAC-TASK-175 - Build Inventory Adjustment history list UI

Nhóm cần tạo UI lịch sử adjustment.

### Nội dung công việc

* Hiển thị danh sách adjustment.
* Hiển thị reason, status, actor, created_at.
* Thêm filter cơ bản nếu có.
* Link tới detail.
* Xử lý loading/empty/error.

### Kết quả mong đợi

* Admin xem được lịch sử điều chỉnh.
* Warehouse xem theo quyền nếu được phép.
* UI hỗ trợ kiểm tra kho.
* Lịch sử adjustment minh bạch.

---

## PAC-TASK-176 - Implement Inventory Adjustment detail API

Nhóm cần tạo API chi tiết adjustment.

### Nội dung công việc

* Tạo endpoint detail adjustment.
* Trả header adjustment và lines.
* Trả batch liên quan.
* Trả reason và audit metadata.
* Kiểm tra permission.

### Kết quả mong đợi

* UI detail hiển thị đủ dữ liệu.
* Có thể kiểm tra batch nào bị điều chỉnh.
* Không lộ dữ liệu sai quyền.
* Dữ liệu phục vụ audit.

---

## PAC-TASK-177 - Build Inventory Adjustment detail screen

Nhóm cần tạo màn hình chi tiết adjustment.

### Nội dung công việc

* Hiển thị reason, status, actor.
* Hiển thị từng batch và quantity điều chỉnh.
* Hiển thị before/after nếu có.
* Read-only nếu confirmed.
* Hiển thị action confirm/cancel nếu còn Draft.

### Kết quả mong đợi

* User xem được chi tiết adjustment.
* Luồng confirm/cancel rõ ràng.
* Dữ liệu batch minh bạch.
* UI phù hợp workflow.

---

## PAC-TASK-178 - Add Warehouse permission for create/confirm adjustment

Nhóm cần cấu hình permission cho Warehouse tạo và confirm adjustment.

### Nội dung công việc

* Gán permission adjustment create/confirm cho Warehouse.
* Kiểm tra backend guard.
* Đảm bảo Warehouse không sửa trực tiếp quantity.
* Test Warehouse confirm adjustment.
* Không mở quyền không liên quan.

### Kết quả mong đợi

* Warehouse thực hiện workflow adjustment đúng.
* Backend enforce quyền.
* Không vượt scope.
* Admin vẫn xem và quản lý được.

---

## PAC-TASK-179 - Add Admin permission for adjustment history and review

Nhóm cần đảm bảo Admin xem được lịch sử adjustment.

### Nội dung công việc

* Gán permission view/review adjustment cho Admin.
* Kiểm tra list/detail API.
* UI hiển thị menu phù hợp.
* Admin xem tất cả adjustment.
* Test permission.

### Kết quả mong đợi

* Admin có quyền giám sát điều chỉnh kho.
* Staff không thấy adjustment nếu không có quyền.
* Phân quyền rõ ràng.
* Audit workflow dễ review.

---

## PAC-TASK-180 - Write audit log for Inventory Adjustment

Nhóm cần ghi audit log khi adjustment được confirm.

### Nội dung công việc

* Ghi actor.
* Ghi reason.
* Ghi batch affected.
* Ghi quantity before/after hoặc delta.
* Ghi thời gian confirm.

### Kết quả mong đợi

* Adjustment có audit đầy đủ.
* Có thể truy vết thay đổi tồn kho.
* Dữ liệu phục vụ kiểm tra.
* Không cần sửa trực tiếp batch để biết lý do.

---

## PAC-TASK-181 - Display adjustment audit information in UI

Nhóm cần hiển thị thông tin audit cơ bản trong UI adjustment.

### Nội dung công việc

* Hiển thị người tạo/confirm.
* Hiển thị thời gian tạo/confirm.
* Hiển thị reason.
* Hiển thị quantity delta.
* Không hiển thị dữ liệu nhạy cảm.

### Kết quả mong đợi

* User hiểu adjustment được thực hiện khi nào và bởi ai.
* Admin review dễ hơn.
* UI minh bạch.
* Phù hợp mục tiêu audit.

---

## PAC-TASK-182 - Add tests for negative quantity adjustment

Nhóm cần viết test chặn adjustment làm quantity âm.

### Nội dung công việc

* Seed batch có quantity cụ thể.
* Tạo adjustment giảm vượt quantity.
* Confirm và kiểm tra bị reject.
* Kiểm tra batch không thay đổi.
* Kiểm tra lỗi trả về rõ ràng.

### Kết quả mong đợi

* Không có batch âm.
* Rule quan trọng có test.
* Transaction rollback đúng.
* CI bảo vệ tồn kho.

---

## PAC-TASK-183 - Add tests for required adjustment reason

Nhóm cần viết test cho reason bắt buộc.

### Nội dung công việc

* Test create adjustment thiếu reason.
* Test confirm adjustment thiếu reason.
* Test reason chỉ khoảng trắng.
* Test reason hợp lệ.
* Kiểm tra response lỗi.

### Kết quả mong đợi

* Adjustment không thể thiếu reason.
* Backend validation có test.
* UI/backend đồng bộ.
* Audit workflow đúng baseline.

---

## PAC-TASK-184 - Add tests for Warehouse adjustment permission

Nhóm cần viết test permission cho Warehouse adjustment.

### Nội dung công việc

* Test Warehouse tạo adjustment.
* Test Warehouse confirm adjustment.
* Test Warehouse không sửa batch trực tiếp.
* Test Staff bị chặn nếu không có quyền.
* Test Admin xem lịch sử.

### Kết quả mong đợi

* Phân quyền adjustment đúng.
* Warehouse có đúng quyền đã chốt.
* Không mở rộng quyền sai.
* Security test rõ ràng.

---

## PAC-TASK-185 - Block direct MedicineBatch quantity update service path

Nhóm cần chặn service path sửa trực tiếp quantity của MedicineBatch.

### Nội dung công việc

* Rà soát service update batch.
* Đảm bảo không có public method sửa quantity tùy ý.
* Nếu có method internal, chỉ dùng trong import/adjustment/checkout transaction.
* Thêm comment guardrail.
* Thêm test hoặc checklist.

### Kết quả mong đợi

* Quantity chỉ thay đổi qua workflow hợp lệ.
* Không có đường tắt phá audit.
* AI agent không dùng sai service.
* Inventory source of truth được bảo vệ.

---

## PAC-TASK-186 - Implement cancel Draft Inventory Adjustment API

Nhóm cần tạo API hủy adjustment khi còn Draft.

### Nội dung công việc

* Tạo endpoint cancel adjustment.
* Chỉ cho cancel khi status Draft.
* Không cập nhật MedicineBatch.
* Ghi status Cancelled.
* Kiểm tra permission.

### Kết quả mong đợi

* User hủy được adjustment chưa confirm.
* Confirmed adjustment không bị hủy.
* Batch quantity không thay đổi khi cancel.
* Workflow có đủ trạng thái cơ bản.

---

## PAC-TASK-187 - Build cancel Draft Inventory Adjustment UI

Nhóm cần thêm UI hủy adjustment Draft.

### Nội dung công việc

* Thêm nút cancel khi adjustment còn Draft.
* Hiển thị confirm dialog.
* Gọi API cancel.
* Refresh detail/list sau khi cancel.
* Disable action nếu adjustment confirmed.

### Kết quả mong đợi

* User hủy adjustment Draft dễ dàng.
* Không hủy nhầm adjustment đã confirm.
* UI rõ trạng thái.
* Workflow đầy đủ hơn.

---

## PAC-TASK-188 - Refresh Inventory Summary after adjustment confirm

Nhóm cần cập nhật Inventory Summary sau khi adjustment confirm.

### Nội dung công việc

* Sau confirm adjustment, refetch inventory summary.
* Cập nhật quantity hiển thị.
* Cập nhật low-stock/near-expiry nếu bị ảnh hưởng.
* Xử lý loading/error.
* Không cần realtime trong MVP.

### Kết quả mong đợi

* UI tồn kho phản ánh adjustment mới.
* User không phải reload thủ công nếu có thể.
* Dữ liệu hiển thị nhất quán.
* Demo mượt hơn.

---

## PAC-TASK-189 - Add Inventory Adjustment smoke test checklist

Nhóm cần viết checklist smoke test cho Inventory Adjustment.

### Nội dung công việc

* Test tạo adjustment.
* Test thiếu reason.
* Test confirm thành công.
* Test quantity âm bị reject.
* Test history/detail.

### Kết quả mong đợi

* Tester có checklist kiểm tra nhanh.
* Luồng adjustment ổn định trước demo.
* Case lỗi quan trọng được kiểm tra.
* Trace được với Story US-49 → US-56.

---

## PAC-TASK-190 - Add Inventory Adjustment traceability notes

Nhóm cần ghi chú traceability cho Inventory Adjustment.

### Nội dung công việc

* Liên kết Task với Story/Requirement/Test.
* Ghi rule reason bắt buộc.
* Ghi rule không sửa quantity trực tiếp.
* Ghi quyền Warehouse/Admin.
* Ghi rule audit.

### Kết quả mong đợi

* Tài liệu rõ ràng.
* AI agent hiểu đúng workflow.
* Tester biết case cần kiểm tra.
* Không lệch baseline tồn kho.

---

# Sprint 4 — POS Draft Order

## PAC-TASK-191 - Create orders Prisma model

Nhóm cần tạo model Order cho luồng POS.

### Nội dung công việc

* Tạo model `Order`.
* Thêm status, created_by, processed_by, customer optional nếu có.
* Hỗ trợ walk-in customer.
* Thêm timestamps.
* Chuẩn bị quan hệ với order_items, payments, invoices, alerts.

### Kết quả mong đợi

* Hệ thống lưu được Draft Order.
* Order status hỗ trợ DRAFT/PAID/CANCELLED.
* Staff ownership scope có dữ liệu.
* Checkout có order để xử lý.

---

## PAC-TASK-192 - Create order_items Prisma model

Nhóm cần tạo model dòng thuốc trong order.

### Nội dung công việc

* Tạo model `OrderItem`.
* Liên kết với Order và Medicine.
* Lưu quantity, unit price, line total snapshot.
* Không lưu batch allocation ở đây nếu đã có bảng riêng.
* Tạo migration.

### Kết quả mong đợi

* Draft Order có nhiều dòng thuốc.
* Line total có dữ liệu tính tiền.
* Checkout dùng order_items để allocate FEFO.
* Lịch sử order rõ ràng.

---

## PAC-TASK-193 - Add order status enum DRAFT/PAID/CANCELLED

Nhóm cần định nghĩa enum status chính thức cho order MVP.

### Nội dung công việc

* Tạo enum order status.
* Chỉ dùng DRAFT, PAID, CANCELLED.
* Không thêm READY_FOR_CHECKOUT.
* Áp dụng validation ở API.
* Cập nhật UI hiển thị status.

### Kết quả mong đợi

* Order lifecycle đúng baseline.
* Checkout chỉ chạy với DRAFT.
* PAID không bị cancel/edit trực tiếp.
* UI nhất quán status.

---

## PAC-TASK-194 - Implement create Draft Order API

Nhóm cần tạo API tạo Draft Order tại POS.

### Nội dung công việc

* Tạo endpoint create Draft Order.
* Gán created_by là user hiện tại.
* Cho phép customer optional/walk-in.
* Set status DRAFT.
* Không trừ inventory.

### Kết quả mong đợi

* Staff/Admin tạo được Draft Order.
* Order chưa ảnh hưởng MedicineBatch.
* Dữ liệu sẵn sàng thêm item.
* Ownership scope được ghi nhận.

---

## PAC-TASK-195 - Build POS Draft Order screen

Nhóm cần xây dựng màn hình POS Draft Order.

### Nội dung công việc

* Tạo layout POS.
* Hiển thị search thuốc.
* Hiển thị danh sách order items.
* Hiển thị tổng tiền.
* Thêm action checkout/cancel.

### Kết quả mong đợi

* Staff thao tác bán hàng tại POS.
* UI rõ ràng cho demo.
* Draft Order có thể chỉnh sửa trước checkout.
* Không trừ tồn kho trước checkout.

---

## PAC-TASK-196 - Implement POS medicine search API

Nhóm cần tạo API tìm thuốc trong POS.

### Nội dung công việc

* Tìm theo tên hoặc mã thuốc.
* Chỉ trả thuốc active.
* Trả sellable stock.
* Hỗ trợ pagination hoặc limit.
* Kiểm tra permission POS.

### Kết quả mong đợi

* POS tìm thuốc nhanh.
* Không hiển thị thuốc inactive.
* Staff biết stock bán được.
* API phục vụ thêm item vào order.

---

## PAC-TASK-197 - Build POS medicine search component

Nhóm cần tạo component tìm thuốc trong POS UI.

### Nội dung công việc

* Thêm ô search thuốc.
* Hiển thị danh sách kết quả.
* Hiển thị tên, đơn vị, giá, sellable stock.
* Cho phép chọn thuốc để thêm vào order.
* Xử lý empty/loading/error.

### Kết quả mong đợi

* Staff tìm và chọn thuốc dễ dàng.
* UI hiển thị stock bán được.
* Không chọn thuốc inactive.
* Component tích hợp với Draft Order.

---

## PAC-TASK-198 - Display sellable stock in POS search results

Nhóm cần hiển thị sellable stock trong kết quả tìm thuốc.

### Nội dung công việc

* Lấy sellable quantity từ backend.
* Hiển thị số lượng có thể bán.
* Hiển thị warning nếu stock thấp.
* Không tính batch expired.
* Không hiển thị dashboard kho tổng quát cho Staff.

### Kết quả mong đợi

* Staff thấy thuốc còn bán được bao nhiêu.
* Giảm lỗi bán vượt tồn kho.
* POS đúng rule Staff chỉ thấy sale-relevant stock.
* Dữ liệu nhất quán với checkout.

---

## PAC-TASK-199 - Implement add item to Draft Order API

Nhóm cần tạo API thêm thuốc vào Draft Order.

### Nội dung công việc

* Kiểm tra order tồn tại và status DRAFT.
* Validate medicine active.
* Validate quantity > 0.
* Validate sellable stock sơ bộ.
* Tạo hoặc cập nhật order item.

### Kết quả mong đợi

* Staff thêm thuốc vào đơn nháp.
* Không thêm vào order PAID/CANCELLED.
* Không thêm thuốc inactive.
* Draft Order total có thể cập nhật.

---

## PAC-TASK-200 - Build add-to-order action in POS

Nhóm cần xây dựng action thêm thuốc vào order từ POS UI.

### Nội dung công việc

* Thêm nút add vào kết quả search.
* Cho phép nhập quantity.
* Gọi API add item.
* Cập nhật order items sau khi thành công.
* Hiển thị lỗi nếu stock không đủ.

### Kết quả mong đợi

* Staff thêm thuốc nhanh.
* UI cập nhật mượt.
* Lỗi rõ ràng.
* Dữ liệu Draft Order đúng.

---

## PAC-TASK-201 - Validate active medicine when adding POS item

Nhóm cần kiểm tra medicine active khi thêm vào POS.

### Nội dung công việc

* Backend kiểm tra `medicine.is_active`.
* Nếu inactive, reject add item.
* POS search không trả inactive medicine.
* Error message rõ nếu gọi API trực tiếp.
* Viết test nếu cần.

### Kết quả mong đợi

* Không bán thuốc inactive.
* Backend bảo vệ rule.
* UI không hiển thị medicine không hợp lệ.
* Lịch sử cũ vẫn giữ medicine inactive nếu đã bán trước đó.

---

## PAC-TASK-202 - Implement update Draft Order item quantity API

Nhóm cần tạo API cập nhật số lượng dòng thuốc trong Draft Order.

### Nội dung công việc

* Kiểm tra order status DRAFT.
* Validate item thuộc order.
* Validate quantity > 0.
* Validate sellable stock.
* Cập nhật quantity và line total.

### Kết quả mong đợi

* Staff chỉnh quantity trong đơn nháp.
* Không chỉnh order PAID/CANCELLED.
* Không vượt stock.
* Total cập nhật đúng.

---

## PAC-TASK-203 - Build quantity controls in Draft Order UI

Nhóm cần tạo UI chỉnh quantity trong Draft Order.

### Nội dung công việc

* Thêm nút tăng/giảm quantity hoặc input.
* Validate quantity ở frontend.
* Gọi API update item.
* Cập nhật line total và order total.
* Hiển thị lỗi nếu API reject.

### Kết quả mong đợi

* Staff chỉnh quantity dễ dàng.
* UI không cho quantity không hợp lệ.
* Draft Order phản ánh dữ liệu mới.
* POS UX ổn định.

---

## PAC-TASK-204 - Validate Draft Order quantity greater than zero

Nhóm cần enforce quantity > 0 cho order item.

### Nội dung công việc

* Backend reject quantity <= 0.
* Frontend chặn nhập quantity <= 0.
* Trả lỗi rõ cho user.
* Test add/update quantity invalid.
* Không lưu item quantity sai.

### Kết quả mong đợi

* Order item luôn có quantity hợp lệ.
* Total tính đúng.
* Checkout không gặp dữ liệu rác.
* UI/API validation thống nhất.

---

## PAC-TASK-205 - Validate sellable stock when updating Draft Order quantity

Nhóm cần validate stock khi Staff thay đổi quantity.

### Nội dung công việc

* Tính sellable quantity từ MedicineBatch.
* So sánh quantity yêu cầu với stock bán được.
* Reject nếu vượt sellable stock.
* Không tính batch expired.
* Hiển thị lỗi ở UI.

### Kết quả mong đợi

* Staff không set quantity vượt stock.
* Draft Order ít lỗi khi checkout.
* Backend vẫn validate lại tại checkout.
* POS an toàn hơn.

---

## PAC-TASK-206 - Implement remove item from Draft Order API

Nhóm cần tạo API xóa item khỏi Draft Order.

### Nội dung công việc

* Kiểm tra order status DRAFT.
* Kiểm tra item thuộc order.
* Xóa item hoặc mark removed.
* Cập nhật total nếu service có tính lại.
* Reject nếu order PAID/CANCELLED.

### Kết quả mong đợi

* Staff xóa được thuốc khỏi đơn nháp.
* Không xóa item order đã paid.
* Total cập nhật đúng.
* API có permission guard.

---

## PAC-TASK-207 - Build remove item action in POS

Nhóm cần thêm action xóa thuốc khỏi Draft Order trên UI.

### Nội dung công việc

* Thêm nút remove trên từng dòng.
* Hiển thị confirm nhẹ nếu cần.
* Gọi API remove item.
* Refresh order items và total.
* Xử lý lỗi.

### Kết quả mong đợi

* Staff thao tác xóa item dễ dàng.
* UI cập nhật đúng.
* Không xóa nhầm trong order không hợp lệ.
* Draft Order dễ chỉnh sửa.

---

## PAC-TASK-208 - Implement Draft Order total calculation service

Nhóm cần triển khai service tính tổng tiền Draft Order.

### Nội dung công việc

* Tính line total bằng quantity * unit price.
* Tính order total bằng tổng line totals.
* Dùng selling price snapshot nếu cần.
* Không áp dụng coupon/discount trong MVP.
* Đảm bảo backend là nguồn tính chính thức.

### Kết quả mong đợi

* Tổng tiền Draft Order chính xác.
* Frontend và backend thống nhất.
* Không có discount/coupon ngoài scope.
* Checkout nhận total đáng tin.

---

## PAC-TASK-209 - Display Draft Order totals in POS UI

Nhóm cần hiển thị tổng tiền trong POS.

### Nội dung công việc

* Hiển thị line total từng item.
* Hiển thị order subtotal/total.
* Cập nhật khi thêm/sửa/xóa item.
* Format tiền dễ đọc.
* Xử lý trạng thái loading.

### Kết quả mong đợi

* Staff thấy tổng tiền đơn nháp.
* UI rõ ràng khi bán hàng.
* Total phản ánh dữ liệu backend.
* Chuẩn bị cho checkout.

---

## PAC-TASK-210 - Ensure no coupon or discount logic in MVP Draft Order total

Nhóm cần chặn việc thêm coupon/discount vào MVP Draft Order total.

### Nội dung công việc

* Không thêm field coupon/discount vào total MVP.
* Không tạo promotion engine.
* Nếu có UI placeholder, phải đánh dấu Future.
* Rà soát code không tự trừ discount.
* Ghi guardrail trong note.

### Kết quả mong đợi

* MVP total đơn giản và đúng scope.
* Không phát sinh scope promotion/coupon.
* Invoice/payment dễ kiểm tra.
* AI agent không thêm scope mới.

---

## PAC-TASK-211 - Show POS stock validation errors

Nhóm cần hiển thị lỗi stock validation trên POS UI.

### Nội dung công việc

* Bắt lỗi API khi stock không đủ.
* Hiển thị message gần item liên quan.
* Giữ Draft Order không mất dữ liệu.
* Cho user chỉnh quantity.
* Không crash POS.

### Kết quả mong đợi

* Staff biết lỗi tồn kho.
* Có thể sửa Draft Order.
* UX checkout/pos tốt hơn.
* Không mất đơn nháp.

---

## PAC-TASK-212 - Implement walk-in customer support in order model

Nhóm cần hỗ trợ đơn hàng không cần customer chính thức.

### Nội dung công việc

* Cho phép `customer_id` nullable hoặc dùng walk-in flag.
* Không bắt buộc tạo customer profile.
* Ghi thông tin đơn là khách vãng lai nếu cần.
* Đảm bảo checkout vẫn hoạt động.
* Không đưa full Customer Management vào MVP.

### Kết quả mong đợi

* Staff bán cho khách vãng lai.
* MVP POS không phụ thuộc Customer module đầy đủ.
* Order vẫn có dữ liệu hợp lệ.
* Future Customer Management không thành blocker.

---

## PAC-TASK-213 - Display walk-in customer option in POS

Nhóm cần hiển thị lựa chọn khách vãng lai trên POS.

### Nội dung công việc

* Hiển thị default customer là Walk-in/Anonymous.
* Không bắt buộc nhập khách hàng.
* Nếu có chọn customer sau này, vẫn không làm full CRM.
* Hiển thị rõ trên order.
* Gửi dữ liệu phù hợp tới backend.

### Kết quả mong đợi

* Staff hiểu đơn đang bán cho khách vãng lai.
* UI đơn giản.
* Không chặn tạo order vì thiếu customer.
* Đúng MVP scope.

---

## PAC-TASK-214 - Keep full Customer Management out of MVP POS flow

Nhóm cần đảm bảo POS MVP không phụ thuộc full Customer Management.

### Nội dung công việc

* Rà soát POS không bắt buộc customer profile.
* Không thêm loyalty/customer portal.
* Không thêm lịch sử khách hàng đầy đủ vào POS MVP.
* Ghi rõ Future scope nếu cần.
* Test tạo order walk-in.

### Kết quả mong đợi

* POS MVP nhẹ và đúng scope.
* Không phát sinh CRM ngoài MVP.
* Staff vẫn bán được bình thường.
* Future backlog tách biệt.

---

## PAC-TASK-215 - Apply Staff ownership scope to order list API

Nhóm cần giới hạn Staff chỉ xem order thuộc phạm vi của mình.

### Nội dung công việc

* Query order theo created_by/processed_by cho Staff.
* Admin xem tất cả.
* Warehouse không truy cập POS order list nếu không có quyền.
* Backend enforce scope.
* Test Staff A không thấy order Staff B.

### Kết quả mong đợi

* Dữ liệu order không bị lộ sai quyền.
* Admin có toàn quyền xem.
* Staff chỉ thấy dữ liệu liên quan.
* Ownership scope đúng baseline.

---

## PAC-TASK-216 - Build Staff scoped order list UI

Nhóm cần xây dựng UI danh sách order cho Staff theo scope.

### Nội dung công việc

* Gọi API order list.
* Hiển thị order Staff được phép xem.
* Hiển thị status DRAFT/PAID/CANCELLED.
* Link tới Order Detail.
* Xử lý empty/loading/error.

### Kết quả mong đợi

* Staff xem được order của mình.
* Không thấy order ngoài scope.
* UI phục vụ tiếp tục Draft Order.
* Phân quyền dễ demo.

---

## PAC-TASK-217 - Implement Admin all-orders list API

Nhóm cần tạo API cho Admin xem toàn bộ order.

### Nội dung công việc

* Tạo hoặc mở rộng order list API.
* Nếu user là Admin, không áp dụng Staff ownership filter.
* Hỗ trợ filter status/date nếu cần.
* Trả dữ liệu tóm tắt.
* Kiểm tra permission Admin.

### Kết quả mong đợi

* Admin xem được tất cả order.
* Staff vẫn bị scope.
* API phân quyền rõ.
* Dữ liệu hỗ trợ quản trị và report.

---

## PAC-TASK-218 - Build Admin all-orders UI

Nhóm cần xây dựng UI Admin xem toàn bộ đơn hàng.

### Nội dung công việc

* Hiển thị danh sách order toàn hệ thống.
* Thêm filter status/date nếu đơn giản.
* Link tới order detail.
* Hiển thị created_by/processed_by nếu cần.
* Xử lý loading/empty/error.

### Kết quả mong đợi

* Admin kiểm tra order toàn hệ thống.
* UI hỗ trợ demo quyền Admin.
* Staff không dùng màn hình này nếu không có quyền.
* Dữ liệu rõ ràng.

---

## PAC-TASK-219 - Implement cancel Draft Order API

Nhóm cần tạo API hủy Draft Order.

### Nội dung công việc

* Chỉ cho cancel order status DRAFT.
* Staff chỉ cancel order trong ownership scope.
* Admin cancel bất kỳ Draft Order.
* Set status CANCELLED.
* Không trừ tồn kho.

### Kết quả mong đợi

* Draft Order có thể hủy.
* PAID order không bị hủy.
* CANCELLED order không checkout được.
* Permission và scope đúng.

---

## PAC-TASK-220 - Build cancel Draft Order UI

Nhóm cần thêm UI hủy đơn nháp.

### Nội dung công việc

* Thêm nút cancel ở Draft Order.
* Hiển thị confirm dialog.
* Gọi API cancel.
* Sau khi cancel, cập nhật trạng thái.
* Disable action nếu order không phải DRAFT.

### Kết quả mong đợi

* Staff/Admin hủy Draft Order đúng quyền.
* UI tránh thao tác nhầm.
* Order status hiển thị đúng.
* Không mất dữ liệu lịch sử.

---

## PAC-TASK-221 - Prevent cancel PAID or already CANCELLED order

Nhóm cần chặn hủy order đã PAID hoặc đã CANCELLED.

### Nội dung công việc

* Backend kiểm tra status trước khi cancel.
* Nếu PAID/CANCELLED, trả lỗi.
* UI disable nút cancel.
* Test PAID order cancel bị reject.
* Không tạo refund/return trong MVP.

### Kết quả mong đợi

* PAID order không bị hủy trực tiếp.
* CANCELLED order không bị hủy lại.
* MVP không có refund/return workflow.
* Order lifecycle đúng baseline.

---

## PAC-TASK-222 - Preserve Draft Order after checkout failure in UI

Nhóm cần giữ Draft Order nếu checkout thất bại.

### Nội dung công việc

* Nếu checkout API trả lỗi, không clear cart/order UI.
* Giữ items và quantity hiện tại.
* Hiển thị lỗi cụ thể.
* Cho user quay lại chỉnh sửa.
* Không redirect mất dữ liệu.

### Kết quả mong đợi

* Staff không mất đơn khi checkout fail.
* Có thể xử lý lỗi và thử lại.
* UX POS an toàn.
* Baseline checkout dedicated route/panel được hỗ trợ.

---

## PAC-TASK-223 - Restore checkout error state back to Draft Order

Nhóm cần đưa user từ checkout lỗi quay lại Draft Order với trạng thái cũ.

### Nội dung công việc

* Lưu order id khi vào checkout.
* Khi checkout fail, reload order detail.
* Hiển thị lỗi ở POS/Draft Order.
* Không tạo payment/invoice nếu fail.
* Không trừ batch quantity.

### Kết quả mong đợi

* Draft Order vẫn tồn tại sau lỗi.
* User biết lý do checkout fail.
* Không có partial checkout.
* Dữ liệu an toàn.

---

## PAC-TASK-224 - Build Order Detail screen for DRAFT/PAID/CANCELLED

Nhóm cần xây dựng màn hình chi tiết order.

### Nội dung công việc

* Hiển thị order status.
* Hiển thị items.
* Hiển thị payment/invoice nếu PAID.
* Hiển thị actions theo status.
* Kiểm tra ownership/permission.

### Kết quả mong đợi

* User xem được chi tiết order.
* DRAFT có thể tiếp tục thao tác nếu có quyền.
* PAID chỉ xem/in invoice.
* CANCELLED read-only.

---

## PAC-TASK-225 - Add POS API integration tests

Nhóm cần viết integration test cho POS APIs.

### Nội dung công việc

* Test create Draft Order.
* Test add item.
* Test update quantity.
* Test remove item.
* Test cancel Draft Order.
* Test permission/scope.

### Kết quả mong đợi

* POS backend được kiểm tra.
* Draft Order logic ổn định.
* Permission và validation có test.
* CI phát hiện lỗi trước demo.

---

## PAC-TASK-226 - Add POS frontend smoke test checklist

Nhóm cần viết checklist smoke test cho POS UI.

### Nội dung công việc

* Test tạo Draft Order.
* Test tìm thuốc.
* Test thêm thuốc.
* Test đổi quantity.
* Test lỗi stock.
* Test cancel Draft Order.

### Kết quả mong đợi

* Tester kiểm tra POS nhanh.
* Luồng bán hàng trước checkout ổn.
* Demo POS ít rủi ro.
* Checklist rõ expected result.

---

# Sprint 5 — DrugInteraction Rule & InteractionAlert

## PAC-TASK-227 - Create drug_interaction_rules Prisma model

Nhóm cần tạo model rule tương tác thuốc ở cấp ActiveIngredient.

### Nội dung công việc

* Tạo model `DrugInteractionRule`.
* Liên kết hai ActiveIngredient.
* Lưu severity, description, recommendation.
* Lưu isActive và timestamps.
* Chuẩn bị sourceVersion nếu cần Graph Sync.

### Kết quả mong đợi

* Rule tương tác dùng ActiveIngredient–ActiveIngredient.
* Không dùng Medicine–Medicine làm rule chính thức.
* Rule có thể quản lý bởi Admin.
* Dữ liệu đủ để tạo InteractionAlert.

---

## PAC-TASK-228 - Implement create ActiveIngredient-level interaction rule API

Nhóm cần tạo API để Admin tạo rule tương tác.

### Nội dung công việc

* Tạo endpoint create interaction rule.
* Validate hai active ingredients.
* Validate severity.
* Validate description/recommendation.
* Ghi rule vào PostgreSQL.

### Kết quả mong đợi

* Admin tạo được rule interaction.
* Rule dựa trên hoạt chất.
* API reject dữ liệu không hợp lệ.
* POS có rule để check alert.

---

## PAC-TASK-229 - Build DrugInteraction Rule management screen

Nhóm cần xây dựng màn hình Admin quản lý rule tương tác.

### Nội dung công việc

* Hiển thị danh sách rule.
* Form tạo/cập nhật rule.
* Chọn ActiveIngredient A và B.
* Chọn severity LOW/MEDIUM/HIGH.
* Nhập description và recommendation.

### Kết quả mong đợi

* Admin quản lý rule từ UI.
* Rule rõ ràng theo hoạt chất.
* UI hỗ trợ demo phần an toàn thuốc.
* Không cho Warehouse truy cập.

---

## PAC-TASK-230 - Validate two active ingredients in interaction rule

Nhóm cần validate hai hoạt chất trong rule tương tác.

### Nội dung công việc

* Ingredient A và B bắt buộc.
* Hai ingredient phải tồn tại.
* Không cho cùng một ingredient tương tác với chính nó nếu không có rule đặc biệt.
* Kiểm tra active status.
* Trả lỗi rõ ràng.

### Kết quả mong đợi

* Rule không có dữ liệu rác.
* Interaction check chính xác.
* UI/API đồng bộ validation.
* Graph Sync rule đáng tin.

---

## PAC-TASK-231 - Implement update DrugInteraction Rule API

Nhóm cần tạo API cập nhật rule tương tác.

### Nội dung công việc

* Tạo endpoint update rule.
* Kiểm tra rule tồn tại.
* Validate severity/description/recommendation.
* Cập nhật sourceUpdatedAt/sourceVersion nếu có.
* Tạo graph sync event.

### Kết quả mong đợi

* Admin cập nhật rule được.
* POS dùng rule mới sau cập nhật.
* Graph projection được sync.
* Không mất lịch sử alert snapshot cũ.

---

## PAC-TASK-232 - Implement deactivate DrugInteraction Rule API

Nhóm cần tạo API deactivate rule tương tác.

### Nội dung công việc

* Tạo endpoint deactivate.
* Set isActive=false.
* Không xóa cứng rule.
* Tạo graph sync event.
* Rule inactive không dùng cho check mới.

### Kết quả mong đợi

* Admin deactivate rule.
* Lịch sử alert cũ vẫn trace được.
* Graph giữ rule inactive nếu projection cần.
* Interaction check chỉ dùng active rule.

---

## PAC-TASK-233 - Trigger Graph Sync event on interaction rule change

Nhóm cần tạo outbox event khi rule interaction thay đổi.

### Nội dung công việc

* Khi create/update/deactivate rule, tạo graph sync event.
* Ghi entity type InteractionRule.
* Ghi rule id, action, source version.
* Không ghi trực tiếp Neo4j từ controller.
* Đảm bảo event tạo cùng transaction nếu cần.

### Kết quả mong đợi

* Neo4j projection cập nhật rule sau.
* Graph Sync không bỏ sót thay đổi.
* PostgreSQL vẫn là source of truth.
* Graph-RAG có context đúng.

---

## PAC-TASK-234 - Validate severity enum LOW/MEDIUM/HIGH only

Nhóm cần giới hạn severity trong MVP.

### Nội dung công việc

* Tạo enum severity LOW, MEDIUM, HIGH.
* Backend reject severity khác.
* UI chỉ hiển thị ba lựa chọn.
* Không dùng CRITICAL trong MVP.
* Test invalid severity.

### Kết quả mong đợi

* Severity đúng baseline.
* Không phát sinh CRITICAL scope.
* UI/API nhất quán.
* HIGH alert logic rõ ràng.

---

## PAC-TASK-235 - Implement derive interaction from medicine active ingredients

Nhóm cần suy ra interaction giữa thuốc dựa trên hoạt chất.

### Nội dung công việc

* Lấy active ingredients của các medicine trong order.
* Tạo các cặp hoạt chất cần check.
* So khớp với active DrugInteractionRule.
* Trả về interaction tương ứng.
* Không dùng Medicine-level rule chính thức.

### Kết quả mong đợi

* POS phát hiện interaction theo hoạt chất.
* Một thuốc nhiều hoạt chất vẫn check được.
* Rule chính xác hơn.
* Baseline interaction được bảo vệ.

---

## PAC-TASK-236 - Add tests for derived medicine interactions

Nhóm cần viết test cho derive interaction từ hoạt chất.

### Nội dung công việc

* Test hai thuốc có hoạt chất tương tác.
* Test thuốc không có interaction.
* Test thuốc nhiều hoạt chất.
* Test inactive rule không được dùng.
* Test rule đảo chiều nếu query symmetric.

### Kết quả mong đợi

* Interaction check có test.
* Không quay lại Medicine–Medicine rule.
* Dữ liệu alert chính xác hơn.
* CI bảo vệ logic an toàn thuốc.

---

## PAC-TASK-237 - Implement order interaction check service

Nhóm cần triển khai service check interaction cho order.

### Nội dung công việc

* Nhận order id.
* Lấy order items.
* Lấy medicines và active ingredients.
* Derive interactions.
* Trả danh sách alert candidates.

### Kết quả mong đợi

* Order có thể check interaction.
* POS dùng service để hiển thị alert.
* Checkout biết HIGH alert unresolved.
* Logic tập trung trong backend service.

---

## PAC-TASK-238 - Implement POST /orders/{id}/interactions/check API

Nhóm cần tạo API check interaction cho order.

### Nội dung công việc

* Tạo endpoint order-based interaction check.
* Kiểm tra order tồn tại và scope.
* Gọi order interaction check service.
* Persist InteractionAlert khi hiển thị.
* Trả alerts cho POS UI.

### Kết quả mong đợi

* POS gọi được API check interaction.
* Alert được persist.
* API gắn với order cụ thể.
* Không dùng standalone check để tạo order history.

---

## PAC-TASK-239 - Create interaction_alerts Prisma model

Nhóm cần tạo model InteractionAlert.

### Nội dung công việc

* Tạo model `InteractionAlert`.
* Liên kết với order và interaction rule.
* Lưu severity snapshot.
* Lưu acknowledged_by/at, consultation note.
* Lưu display_count, last_displayed_at.

### Kết quả mong đợi

* Alert đã hiển thị được lưu.
* HIGH alert có dữ liệu xử lý.
* Admin xem history được.
* Checkout có thể kiểm tra unresolved HIGH.

---

## PAC-TASK-240 - Persist displayed InteractionAlert snapshot fields

Nhóm cần lưu snapshot khi alert được hiển thị.

### Nội dung công việc

* Lưu severity tại thời điểm alert.
* Lưu description/recommendation snapshot nếu cần.
* Lưu order id và rule id.
* Không chỉ hiển thị tạm trên UI.
* Ghi displayed timestamp.

### Kết quả mong đợi

* Alert history không mất thông tin khi rule đổi.
* Admin review được dữ liệu đã hiển thị.
* Checkout blocker có dữ liệu.
* Audit an toàn thuốc rõ ràng.

---

## PAC-TASK-241 - Enforce one active alert per order and interaction rule

Nhóm cần tránh duplicate active alert.

### Nội dung công việc

* Thêm unique logic cho order_id + interaction_rule_id active.
* Nếu alert đã tồn tại, update display_count.
* Không tạo nhiều alert active trùng.
* Xử lý concurrency cơ bản.
* Viết test duplicate.

### Kết quả mong đợi

* Mỗi order/rule chỉ có một active alert.
* display_count phản ánh số lần hiển thị.
* Dữ liệu history sạch.
* Không làm Staff xử lý alert trùng.

---

## PAC-TASK-242 - Update display_count and last_displayed_at

Nhóm cần cập nhật số lần và thời điểm alert được hiển thị.

### Nội dung công việc

* Khi alert hiển thị lại, tăng display_count.
* Cập nhật last_displayed_at.
* Không reset acknowledged data.
* Không tạo duplicate active alert.
* Trả dữ liệu mới cho UI.

### Kết quả mong đợi

* Alert tracking đúng.
* Admin thấy lịch sử hiển thị.
* Dữ liệu không trùng.
* POS hiển thị ổn định.

---

## PAC-TASK-243 - Build POS InteractionAlert panel

Nhóm cần xây dựng panel hiển thị InteractionAlert trong POS.

### Nội dung công việc

* Hiển thị danh sách alerts.
* Hiển thị severity.
* Hiển thị description/recommendation.
* Cho Staff xử lý HIGH alert.
* Có empty/loading/error state.

### Kết quả mong đợi

* Staff thấy cảnh báo tương tác rõ ràng.
* LOW/MEDIUM/HIGH phân biệt được.
* HIGH alert có action xử lý.
* POS an toàn hơn.

---

## PAC-TASK-244 - Implement LOW/MEDIUM/HIGH alert display logic

Nhóm cần hiển thị alert theo severity.

### Nội dung công việc

* LOW hiển thị mức nhẹ.
* MEDIUM hiển thị mức cảnh báo.
* HIGH hiển thị nổi bật và yêu cầu action.
* Không dùng CRITICAL.
* UI có thông tin hướng dẫn phù hợp.

### Kết quả mong đợi

* Staff nhận biết mức độ nguy cơ.
* HIGH không bị bỏ qua.
* UI đúng enum MVP.
* Trải nghiệm cảnh báo rõ ràng.

---

## PAC-TASK-245 - Build HIGH alert acknowledgement UI

Nhóm cần tạo UI acknowledgement cho HIGH alert.

### Nội dung công việc

* Thêm nút/checkbox acknowledge cho từng HIGH alert.
* Hiển thị rõ Staff đang xác nhận đã đọc hiểu alert.
* Gọi API acknowledge.
* Hiển thị acknowledged state.
* Không apply cho LOW/MEDIUM nếu không bắt buộc.

### Kết quả mong đợi

* HIGH alert được Staff acknowledge.
* acknowledged_by và acknowledged_at có thể lưu.
* UI chuẩn bị cho checkout blocker.
* Staff không bỏ qua HIGH alert.

---

## PAC-TASK-246 - Implement acknowledge InteractionAlert API

Nhóm cần tạo API ghi nhận acknowledgement cho InteractionAlert.

### Nội dung công việc

* Tạo endpoint acknowledge alert.
* Kiểm tra alert tồn tại.
* Kiểm tra user có quyền xử lý.
* Lưu acknowledged_by và acknowledged_at.
* Chỉ áp dụng bắt buộc cho HIGH.

### Kết quả mong đợi

* Backend lưu acknowledgement.
* Checkout đọc được trạng thái.
* Audit alert rõ ràng.
* API trả lỗi nếu alert không hợp lệ.

---

## PAC-TASK-247 - Build HIGH alert consultation note UI

Nhóm cần tạo UI nhập consultation note cho HIGH alert.

### Nội dung công việc

* Thêm textarea note cho từng HIGH alert.
* Bắt buộc note không rỗng.
* Gửi note tới API.
* Hiển thị trạng thái đã lưu.
* Gắn note đúng alert.

### Kết quả mong đợi

* Staff ghi note tư vấn cho từng HIGH alert.
* Note không bị gộp chung mơ hồ.
* Checkout có thể validate.
* Demo thể hiện rule an toàn.

---

## PAC-TASK-248 - Implement consultation note API per HIGH alert

Nhóm cần tạo API lưu consultation note cho từng HIGH alert.

### Nội dung công việc

* Tạo endpoint update note.
* Kiểm tra alert severity HIGH.
* Validate note không rỗng.
* Lưu note vào đúng InteractionAlert.
* Ghi actor/time nếu cần.

### Kết quả mong đợi

* HIGH alert có consultation note riêng.
* Note chính thức chỉ lưu khi Staff gửi.
* Checkout kiểm tra được note.
* Dữ liệu history đầy đủ.

---

## PAC-TASK-249 - Validate HIGH alert consultation note is not empty

Nhóm cần enforce consultation note không rỗng.

### Nội dung công việc

* Trim note.
* Reject note rỗng hoặc chỉ khoảng trắng.
* UI hiển thị lỗi.
* Backend trả 400.
* Test note invalid.

### Kết quả mong đợi

* HIGH alert không có note rỗng.
* Checkout không pass khi note chưa hợp lệ.
* Staff phải nhập nội dung tư vấn.
* Rule safety đúng baseline.

---

## PAC-TASK-250 - Implement checkout blocker for unresolved HIGH alerts

Nhóm cần chặn checkout nếu còn HIGH alert chưa xử lý.

### Nội dung công việc

* Query HIGH alerts của order.
* Kiểm tra acknowledgement và consultation note.
* Nếu thiếu, checkout validation fail.
* Không tạo payment/invoice.
* Trả lỗi rõ cho frontend.

### Kết quả mong đợi

* Không checkout khi HIGH alert unresolved.
* Backend enforce rule.
* Staff phải xử lý alert trước.
* Luồng an toàn thuốc đúng baseline.

---

## PAC-TASK-251 - Build UI prompt when checkout is blocked by HIGH alert

Nhóm cần hiển thị hướng dẫn khi checkout bị chặn do HIGH alert.

### Nội dung công việc

* Nhận lỗi checkout blocker từ API.
* Hiển thị message cụ thể.
* Highlight alert cần xử lý.
* Điều hướng user về alert panel.
* Giữ Draft Order.

### Kết quả mong đợi

* Staff biết cần acknowledge/note alert nào.
* Draft Order không mất.
* UX checkout failure rõ ràng.
* HIGH alert không bị bỏ qua.

---

## PAC-TASK-252 - Build Admin InteractionAlert History API and UI

Nhóm cần xây dựng API và UI xem lịch sử InteractionAlert cho Admin.

### Nội dung công việc

* Tạo API list alert history.
* Hiển thị order, severity, rule, display_count.
* Hiển thị acknowledgement và note.
* UI có bảng danh sách.
* Kiểm tra Admin permission.

### Kết quả mong đợi

* Admin xem được lịch sử alert.
* Dữ liệu phục vụ audit/demo.
* Warehouse không truy cập.
* Alert history đúng với dữ liệu persisted.

---

## PAC-TASK-253 - Enforce Warehouse no-access to InteractionAlert APIs

Nhóm cần chặn Warehouse truy cập InteractionAlert APIs.

### Nội dung công việc

* Gắn permission guard cho alert APIs.
* Không gán permission alert cho Warehouse.
* Test Warehouse gọi API bị 403.
* Chặn cả history API.
* Kiểm tra sidebar không hiển thị menu.

### Kết quả mong đợi

* Warehouse không xem alert.
* Dữ liệu an toàn thuốc không lộ sai role.
* Backend enforce.
* Phân quyền đúng baseline.

---

## PAC-TASK-254 - Add tests for Warehouse no-access to InteractionAlert

Nhóm cần viết test phân quyền Warehouse với InteractionAlert.

### Nội dung công việc

* Test Warehouse gọi check/history bị 403 nếu không có quyền.
* Test Staff/Admin có quyền phù hợp.
* Test menu UI nếu có checklist.
* Không để endpoint phụ lộ dữ liệu.
* Ghi kết quả test.

### Kết quả mong đợi

* Warehouse restriction có test.
* Security rule được bảo vệ.
* Không lộ InteractionAlert.
* CI phát hiện regression.

---

## PAC-TASK-255 - Add InteractionAlert lifecycle integration tests

Nhóm cần viết integration test cho lifecycle InteractionAlert.

### Nội dung công việc

* Test check interaction tạo alert.
* Test alert hiển thị lại tăng display_count.
* Test không tạo duplicate active alert.
* Test snapshot fields.
* Test Admin history.

### Kết quả mong đợi

* InteractionAlert lifecycle đáng tin.
* Dữ liệu không trùng.
* History hoạt động.
* Checkout blocker có dữ liệu đúng.

---

## PAC-TASK-256 - Add HIGH acknowledgement and consultation note tests

Nhóm cần viết test cho HIGH alert acknowledgement và consultation note.

### Nội dung công việc

* Test HIGH thiếu acknowledge.
* Test HIGH thiếu note.
* Test HIGH có đủ acknowledge và note.
* Test LOW/MEDIUM không bị bắt như HIGH.
* Test checkout blocker liên quan.

### Kết quả mong đợi

* HIGH alert rule có test.
* Checkout safety được bảo vệ.
* Staff flow đúng.
* Không bỏ sót consultation note.

---

## PAC-TASK-257 - Add filters to InteractionAlert History

Nhóm cần thêm filter cơ bản cho InteractionAlert History.

### Nội dung công việc

* Filter theo severity.
* Filter theo date range nếu đơn giản.
* Filter theo order id hoặc medicine nếu có.
* Validate query params.
* UI cập nhật bảng theo filter.

### Kết quả mong đợi

* Admin tìm alert dễ hơn.
* History hữu ích khi demo.
* Filter không làm sai dữ liệu.
* Không thêm scope analytics nâng cao.

---

## PAC-TASK-258 - Add InteractionAlert snapshot and traceability notes

Nhóm cần ghi chú traceability cho InteractionAlert.

### Nội dung công việc

* Ghi rõ alert phải persist.
* Ghi rõ HIGH cần acknowledgement và note.
* Ghi rõ snapshot fields.
* Ghi mapping Story/Test.
* Ghi guardrail Warehouse no-access.

### Kết quả mong đợi

* Tài liệu rõ baseline.
* AI agent không code alert tạm.
* Tester biết case cần kiểm tra.
* Traceability đầy đủ hơn.

---

# Sprint 6 — Checkout, FEFO, Payment & Invoice

## PAC-TASK-259 - Define Checkout DTO and validation schema

Nhóm cần định nghĩa request/response DTO cho `POST /checkout`.

### Nội dung công việc

* Xác định `order_id`.
* Xác định payment method.
* Thêm `amount_tendered` cho cash.
* Thêm `transaction_reference` cho bank transfer.
* Định nghĩa response gồm order, payment, invoice, allocations.

### Kết quả mong đợi

* Checkout API contract rõ ràng.
* Frontend biết dữ liệu cần gửi.
* Backend validate input trước transaction.
* Test dễ viết.

---

## PAC-TASK-260 - Implement CheckoutController POST /checkout

Nhóm cần tạo controller chính thức cho checkout.

### Nội dung công việc

* Tạo endpoint `POST /checkout`.
* Gắn AuthGuard và PermissionGuard.
* Nhận Checkout DTO.
* Gọi CheckoutService.
* Trả response thành công hoặc lỗi.

### Kết quả mong đợi

* Checkout có endpoint chính thức.
* Không dùng `/orders/{id}/pay` làm main flow.
* API có permission.
* Frontend Checkout UI tích hợp được.

---

## PAC-TASK-261 - Implement CheckoutService transaction skeleton

Nhóm cần triển khai skeleton transaction cho CheckoutService.

### Nội dung công việc

* Bọc toàn bộ checkout trong Prisma transaction.
* Validate order.
* Validate alert.
* Validate stock.
* FEFO allocation.
* Tạo payment, invoice và update order PAID.

### Kết quả mong đợi

* Checkout là một transaction thống nhất.
* Lỗi ở bước nào cũng rollback.
* Payment/invoice không tạo ngoài transaction.
* Service sẵn sàng thêm logic chi tiết.

### AI Agent Notes

* Không tách payment success ra endpoint riêng.
* Không tạo invoice sau transaction bằng flow rời.

---

## PAC-TASK-262 - Validate checkout actor permission and order ownership

Nhóm cần validate quyền và ownership khi checkout.

### Nội dung công việc

* Kiểm tra user có permission checkout.
* Staff chỉ checkout order trong scope.
* Admin có thể checkout theo quyền nếu được phép.
* Warehouse bị chặn.
* Trả 403 nếu sai quyền.

### Kết quả mong đợi

* Checkout không bị gọi sai role.
* Staff không checkout order người khác.
* Warehouse không checkout.
* Backend enforce security.

---

## PAC-TASK-263 - Validate order exists and status is DRAFT

Nhóm cần kiểm tra order tồn tại và đang ở DRAFT.

### Nội dung công việc

* Query order theo id.
* Nếu không tồn tại, trả 404.
* Nếu status không phải DRAFT, trả lỗi.
* Không checkout PAID/CANCELLED.
* Test status validation.

### Kết quả mong đợi

* Chỉ Draft Order được checkout.
* PAID không bị thanh toán lại.
* CANCELLED không được checkout.
* Order lifecycle đúng baseline.

---

## PAC-TASK-264 - Validate unresolved HIGH alerts before payment

Nhóm cần kiểm tra HIGH alert trước khi tạo payment.

### Nội dung công việc

* Query InteractionAlert của order.
* Tìm HIGH alert chưa acknowledge hoặc thiếu note.
* Nếu còn unresolved, reject checkout.
* Không tạo payment/invoice.
* Trả danh sách alert cần xử lý nếu có.

### Kết quả mong đợi

* HIGH alert chưa xử lý chặn checkout.
* Rule enforce ở backend.
* Staff phải hoàn tất acknowledgement/note.
* Payment không được tạo sớm.

---

## PAC-TASK-265 - Validate sellable stock inside checkout transaction

Nhóm cần validate sellable stock trong checkout transaction.

### Nội dung công việc

* Query MedicineBatch trong transaction.
* Không tính batch expired.
* Kiểm tra tổng sellable đủ cho từng order item.
* Lock hoặc xử lý concurrency nếu cần.
* Reject nếu stock không đủ.

### Kết quả mong đợi

* Không bán vượt tồn kho.
* Checkout dùng dữ liệu mới nhất.
* Draft Order giữ nguyên nếu fail.
* FEFO nhận dữ liệu hợp lệ.

---

## PAC-TASK-266 - Build Checkout full page or full-height panel UI

Nhóm cần xây dựng UI checkout riêng, không dùng modal nhỏ.

### Nội dung công việc

* Tạo route hoặc full-height panel checkout.
* Hiển thị order summary.
* Hiển thị payment form.
* Hiển thị unresolved alert warning nếu có.
* Xử lý success/error.

### Kết quả mong đợi

* Checkout UX rõ ràng.
* Không chen trong modal nhỏ khó thao tác.
* Nếu validation fail, user quay lại Draft Order.
* UI phù hợp baseline.

---

## PAC-TASK-267 - Build payment method selector in Checkout UI

Nhóm cần tạo UI chọn payment method.

### Nội dung công việc

* Cho chọn cash hoặc simulated bank transfer.
* Cash hiển thị amount_tendered.
* Bank transfer hiển thị transaction_reference.
* Validate field theo method.
* Gửi DTO đúng.

### Kết quả mong đợi

* Staff nhập thanh toán đúng.
* UI không gửi thiếu dữ liệu.
* Checkout API nhận đúng payment input.
* Demo payment rõ ràng.

---

## PAC-TASK-268 - Define FEFO allocation input/output model

Nhóm cần định nghĩa contract cho FEFO allocation service.

### Nội dung công việc

* Input gồm medicine_id và quantity cần bán.
* Output gồm batch_id và quantity allocated.
* Hỗ trợ multi-batch allocation.
* Trả lỗi nếu stock không đủ.
* Không bao gồm expired batch.

### Kết quả mong đợi

* FEFO service có contract rõ.
* Checkout gọi được FEFO.
* Unit test dễ viết.
* Allocation data persist được.

---

## PAC-TASK-269 - Query sellable MedicineBatch for FEFO

Nhóm cần query batch bán được cho FEFO.

### Nội dung công việc

* Query MedicineBatch theo medicine_id.
* Chỉ lấy batch quantity > 0.
* Loại batch expired.
* Sắp xếp chuẩn bị theo expiry date.
* Chạy trong transaction checkout.

### Kết quả mong đợi

* FEFO chỉ dùng batch hợp lệ.
* Không bán batch hết hạn.
* Dữ liệu allocation đúng.
* Checkout an toàn.

---

## PAC-TASK-270 - Sort FEFO batches by nearest expiry date

Nhóm cần sắp xếp batch theo hạn dùng gần nhất trước.

### Nội dung công việc

* Sort batch theo expiry_date tăng dần.
* Nếu cùng expiry, sort phụ theo id hoặc created_at để ổn định.
* Không đưa expired batch vào list.
* Test thứ tự batch.
* Dùng kết quả cho allocation.

### Kết quả mong đợi

* FEFO chọn batch gần hết hạn trước.
* Kết quả allocation ổn định.
* Demo FEFO rõ ràng.
* Không nhầm FIFO/FEFO.

---

## PAC-TASK-271 - Allocate requested quantity across multiple batches

Nhóm cần phân bổ quantity qua nhiều batch nếu batch đầu không đủ.

### Nội dung công việc

* Lấy quantity cần bán.
* Trừ dần từ batch expiry gần nhất.
* Nếu batch đầu không đủ, tiếp tục batch kế.
* Tạo danh sách allocations.
* Dừng khi đủ quantity.

### Kết quả mong đợi

* Multi-batch allocation hoạt động.
* FEFO xử lý stock phân tán.
* Checkout persist đúng allocations.
* Demo có thể thể hiện case nhiều batch.

---

## PAC-TASK-272 - Reject FEFO allocation when sellable stock is insufficient

Nhóm cần reject allocation khi tổng stock bán được không đủ.

### Nội dung công việc

* Tính tổng sellable quantity.
* So sánh với quantity cần bán.
* Nếu thiếu, trả lỗi.
* Không tạo partial allocation chính thức.
* Không trừ batch.

### Kết quả mong đợi

* Không bán vượt tồn kho.
* Checkout rollback.
* Draft Order vẫn còn.
* User nhận lỗi rõ.

---

## PAC-TASK-273 - Create order_batch_allocations Prisma model

Nhóm cần tạo model lưu batch allocation của order.

### Nội dung công việc

* Tạo `OrderBatchAllocation`.
* Liên kết order/order item/medicine batch.
* Lưu quantity allocated.
* Lưu created_at.
* Tạo migration.

### Kết quả mong đợi

* Hệ thống biết order đã trừ batch nào.
* Traceability batch sales rõ ràng.
* Reports/audit có dữ liệu.
* FEFO allocation được persist.

---

## PAC-TASK-274 - Persist order_batch_allocations during checkout

Nhóm cần lưu allocation trong checkout transaction.

### Nội dung công việc

* Nhận allocation result từ FEFO.
* Tạo records order_batch_allocations.
* Gắn đúng order item và batch.
* Lưu trong cùng transaction.
* Rollback nếu lỗi.

### Kết quả mong đợi

* Allocation được lưu cùng checkout.
* Không có allocation nếu checkout fail.
* Dữ liệu audit đầy đủ.
* Invoice/order detail có thể trace batch nếu cần.

---

## PAC-TASK-275 - Deduct MedicineBatch quantities inside checkout transaction

Nhóm cần trừ quantity batch trong checkout transaction.

### Nội dung công việc

* Với từng allocation, giảm batch quantity.
* Không cho quantity âm.
* Thực hiện trong transaction.
* Rollback nếu payment/invoice fail.
* Test batch deduction.

### Kết quả mong đợi

* Batch quantity giảm đúng khi checkout thành công.
* Không trừ stock khi checkout fail.
* Không có quantity âm.
* Inventory Summary cập nhật đúng.

---

## PAC-TASK-276 - Create idempotency_records Prisma model

Nhóm cần tạo model idempotency để chống checkout lặp.

### Nội dung công việc

* Tạo `IdempotencyRecord`.
* Lưu key, request hash, status, response summary nếu cần.
* Liên kết user/order nếu phù hợp.
* Tạo unique constraint cho key theo scope.
* Tạo migration.

### Kết quả mong đợi

* Backend có dữ liệu chống double-submit.
* Checkout lặp không tạo duplicate payment/invoice.
* Test idempotency được.
* Transaction an toàn hơn.

---

## PAC-TASK-277 - Implement idempotency key handling for checkout

Nhóm cần xử lý idempotency key trong checkout.

### Nội dung công việc

* Nhận idempotency key từ request.
* Kiểm tra key đã xử lý chưa.
* Nếu thành công trước đó, trả kết quả cũ.
* Nếu đang xử lý, chặn request trùng.
* Lưu record khi checkout thành công/thất bại phù hợp.

### Kết quả mong đợi

* Double-click checkout không gây duplicate.
* Không trừ batch hai lần.
* Không tạo payment/invoice trùng.
* Checkout ổn định hơn.

---

## PAC-TASK-278 - Rollback checkout transaction on failure

Nhóm cần đảm bảo checkout rollback toàn bộ khi có lỗi.

### Nội dung công việc

* Bọc validate/allocation/payment/invoice trong transaction.
* Throw error khi bất kỳ bước nào fail.
* Không commit partial data.
* Trả lỗi rõ cho frontend.
* Test rollback.

### Kết quả mong đợi

* Không có partial checkout.
* Draft Order vẫn DRAFT nếu fail.
* Batch không bị trừ.
* Payment/invoice không tạo nếu lỗi.

---

## PAC-TASK-279 - Create payments Prisma model

Nhóm cần tạo model Payment.

### Nội dung công việc

* Tạo model `Payment`.
* Liên kết với Order.
* Lưu method, status, amount, processed_by.
* Lưu amount_tendered/change_amount cho cash.
* Lưu transaction_reference cho bank transfer.

### Kết quả mong đợi

* Payment được lưu chính thức.
* Hỗ trợ cash và simulated bank transfer.
* Failed attempts có thể lưu nếu cần.
* SUCCESS payment enforce rule riêng.

---

## PAC-TASK-280 - Implement cash payment handling inside checkout

Nhóm cần xử lý thanh toán tiền mặt trong checkout.

### Nội dung công việc

* Validate payment method cash.
* Validate amount_tendered >= order total.
* Tạo payment trong transaction.
* Lưu amount_tendered.
* Chuẩn bị tính change_amount.

### Kết quả mong đợi

* Cash payment hoạt động.
* Không checkout nếu khách đưa thiếu tiền.
* Payment tạo trong transaction.
* Order PAID sau checkout thành công.

---

## PAC-TASK-281 - Calculate and persist change_amount

Nhóm cần tính và lưu tiền thối lại cho cash payment.

### Nội dung công việc

* Tính `change_amount = amount_tendered - total`.
* Reject nếu change âm.
* Lưu change_amount vào payment.
* Hiển thị trong response.
* UI có thể hiển thị cho Staff.

### Kết quả mong đợi

* Tiền thối lại chính xác.
* Cash payment đầy đủ thông tin.
* Invoice/payment detail rõ ràng.
* Không có change_amount âm.

---

## PAC-TASK-282 - Implement bank transfer transaction_reference validation

Nhóm cần validate transaction reference cho simulated bank transfer.

### Nội dung công việc

* Nếu payment method bank transfer, yêu cầu transaction_reference.
* Trim và validate reference.
* Không tích hợp bank thật.
* Có thể kiểm tra uniqueness cho SUCCESS payment.
* Trả lỗi nếu thiếu reference.

### Kết quả mong đợi

* Bank transfer demo có audit reference.
* Không có pending bank integration.
* Payment data rõ ràng.
* MVP đúng scope simulated transfer.

---

## PAC-TASK-283 - Enforce one SUCCESS payment per order

Nhóm cần đảm bảo mỗi order chỉ có một payment SUCCESS.

### Nội dung công việc

* Kiểm tra payment SUCCESS hiện có trước khi tạo.
* Thêm constraint hoặc service guard.
* Checkout lặp không tạo SUCCESS thứ hai.
* Failed attempts không vi phạm nếu được lưu.
* Test duplicate success.

### Kết quả mong đợi

* Mỗi order chỉ có một successful payment.
* Không thanh toán trùng.
* Invoice không bị tạo nhiều.
* Payment rule đúng baseline.

---

## PAC-TASK-284 - Allow failed payment attempts without creating duplicate SUCCESS payment

Nhóm cần hỗ trợ lưu failed payment attempts nếu cần mà không phá rule one SUCCESS.

### Nội dung công việc

* Phân biệt payment status SUCCESS/FAILED.
* Cho phép FAILED attempt được lưu nếu scope implement.
* Không cho nhiều SUCCESS.
* Không update order PAID khi payment failed.
* Không tạo invoice cho failed checkout.

### Kết quả mong đợi

* Failed attempts không làm order paid.
* One SUCCESS rule được giữ.
* Payment audit rõ hơn.
* Checkout transaction an toàn.

---

## PAC-TASK-285 - Create invoices Prisma model

Nhóm cần tạo model Invoice.

### Nội dung công việc

* Tạo model `Invoice`.
* Liên kết với Order và Payment.
* Lưu invoice number, total, issued_at.
* Lưu snapshot thông tin cần thiết nếu có.
* Tạo migration.

### Kết quả mong đợi

* Invoice được lưu sau checkout thành công.
* Mỗi paid order có invoice.
* Invoice dùng để xem/in.
* Không tạo invoice ngoài transaction checkout.

---

## PAC-TASK-286 - Generate invoice inside checkout transaction

Nhóm cần tạo invoice trong cùng transaction checkout.

### Nội dung công việc

* Sau khi payment SUCCESS, tạo invoice.
* Gắn invoice với order/payment.
* Nếu invoice tạo lỗi, rollback checkout.
* Không tạo invoice bằng flow rời sau checkout.
* Trả invoice trong checkout response.

### Kết quả mong đợi

* Payment và invoice nhất quán.
* Không có paid order thiếu invoice.
* Không có invoice cho checkout fail.
* Checkout transaction đúng baseline.

---

## PAC-TASK-287 - Build invoice view and print UI

Nhóm cần tạo UI xem và in invoice.

### Nội dung công việc

* Hiển thị invoice number, date, items, total.
* Hiển thị payment method.
* Hiển thị amount_tendered/change_amount nếu cash.
* Thêm nút print.
* Xử lý loading/error.

### Kết quả mong đợi

* Staff/Admin xem được invoice.
* Invoice có thể in ở mức demo.
* Dữ liệu rõ ràng.
* UI hỗ trợ sau checkout.

---

## PAC-TASK-288 - Update order status to PAID only after successful checkout

Nhóm cần đảm bảo order chỉ chuyển PAID sau khi checkout hoàn tất.

### Nội dung công việc

* Chỉ set order status PAID sau validation, allocation, payment và invoice thành công.
* Không set PAID trước payment.
* Nếu transaction fail, order vẫn DRAFT.
* Không cho PAID order edit/cancel trực tiếp.
* Test status transition.

### Kết quả mong đợi

* Order lifecycle đúng.
* Không có order PAID thiếu payment/invoice.
* Checkout fail không làm mất Draft Order.
* Báo cáo doanh thu chính xác.

---

## PAC-TASK-289 - Add checkout integration tests

Nhóm cần viết integration test cho checkout.

### Nội dung công việc

* Test checkout thành công.
* Test order không DRAFT bị reject.
* Test HIGH alert unresolved bị reject.
* Test insufficient stock.
* Test payment/invoice tạo đúng.

### Kết quả mong đợi

* Checkout critical path có test.
* Transaction hoạt động đúng.
* Safety rule được bảo vệ.
* CI bắt lỗi trước demo.

---

## PAC-TASK-290 - Add FEFO, idempotency and rollback tests

Nhóm cần viết test cho FEFO, idempotency và rollback.

### Nội dung công việc

* Test FEFO chọn batch gần hết hạn trước.
* Test multi-batch allocation.
* Test expired batch bị loại.
* Test checkout double-submit không tạo duplicate.
* Test rollback không trừ stock khi lỗi.

### Kết quả mong đợi

* FEFO hoạt động đúng.
* Checkout không duplicate payment/invoice.
* Rollback an toàn.
* Luồng bán hàng MVP đáng tin cậy.

---

# Out-of-scope guard cho tài liệu 4B

Không tạo hoặc implement Task trong phần 4B cho các nội dung sau:

```text
Sửa trực tiếp MedicineBatch quantity ngoài Inventory Adjustment
Inventory Adjustment không có reason
Inventory Adjustment làm quantity âm
POS bán thuốc inactive
POS bán vượt sellable quantity
Full Customer Management trong MVP
Coupon/discount trong MVP Draft Order total
Medicine-level interaction rule làm source of truth
CRITICAL severity trong MVP
InteractionAlert chỉ hiển thị tạm mà không persist
Duplicate active InteractionAlert cho cùng order_id + interaction_id
HIGH alert không cần acknowledgement
HIGH alert không cần consultation note
Warehouse truy cập InteractionAlert
Checkout bằng /orders/{id}/pay làm main flow
Payment success ngoài checkout transaction
Invoice tạo ngoài checkout transaction
Checkout không rollback khi lỗi
Checkout không idempotent
FEFO chọn batch hết hạn
Neo4j quyết định checkout
Refund/return workflow trong MVP
```

Thông tin cảnh báo tương tác thuốc và nội dung AI trong hệ thống chỉ mang tính hỗ trợ tham khảo cho đồ án, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.
