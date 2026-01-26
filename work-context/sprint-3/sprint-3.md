# SPRINT 3 — MEDICINEBATCH, INVENTORY SUMMARY & STOCK IMPORT

## 1. Mục đích tài liệu

Tài liệu `sprint-3.md` mô tả đầy đủ phạm vi công việc của **Sprint 3 — MedicineBatch, Inventory Summary & Stock Import** trong dự án **PharmaAssist AI Intelligence**.

Tài liệu được dùng để:

1. Xác định chính xác Epic, User Story và Task thuộc Sprint 3.
2. Thể hiện quan hệ phân rã `Epic → User Story → Task`.
3. Mô tả mục tiêu, nội dung và đầu ra bắt buộc ở từng cấp.
4. Làm nguồn điều phối cho Jira, AI Coding Agent, Git branch, Pull Request, kiểm thử và demo.
5. Bảo vệ baseline: `MedicineBatch` là inventory source of truth, Stock Import confirm chạy transaction và không có direct quantity edit.
6. Làm tài liệu kế hoạch cố định; tiến độ, evidence, test result và readiness được theo dõi riêng trong `sprint-3-progress.md`.

## 2. Tổng quan phạm vi Sprint 3

### 2.1. Thông tin tổng hợp

| Nội dung | Phạm vi | Số lượng |
|---|---:|---:|
| Sprint | Sprint 3 | 1 |
| Epic nghiệp vụ chính | PAC-EPIC-05 → PAC-EPIC-06 | 2 |
| Epic hỗ trợ có Task tham gia | PAC-EPIC-19, PAC-EPIC-21 | 2 |
| User Story | US-27 → US-48 | 22 |
| Task | PAC-TASK-102 → PAC-TASK-160 | 59 |
| Scope | MVP / Core | Bắt buộc |
| Component chính | Inventory & MedicineBatch; Stock Import | 2 |

### 2.2. Các Epic tham gia

#### Epic nghiệp vụ chính

1. **PAC-EPIC-05 — Inventory & MedicineBatch**
2. **PAC-EPIC-06 — Stock Import**

#### Epic hỗ trợ

3. **PAC-EPIC-19 — Testing, Smoke Test & Release Readiness**
   - Quản lý các Task kiểm thử batch identity, sellable quantity, expired exclusion, batch merge, mismatch, immutability, integration và smoke test.
4. **PAC-EPIC-21 — Documentation & Traceability**
   - Quản lý tài liệu source-of-truth và traceability Stock Import.

> Các Task hỗ trợ vẫn được tích hợp vào User Story nghiệp vụ tương ứng. Không tạo thêm một luồng Git độc lập nếu không có nhóm User Story riêng.

### 2.3. Mục tiêu tổng thể Sprint 3

Sprint 3 phải xây dựng được:

- `MedicineBatch` làm nguồn dữ liệu chính thức cho tồn kho.
- Batch identity theo `medicine_id + normalized batch_number + expiry_date`.
- Inventory Summary và Batch Detail được tính từ MedicineBatch.
- Sellable quantity loại batch hết hạn.
- Low-stock và near-expiry states cho Admin/Warehouse.
- Stock Import Draft, line management và confirm transaction.
- Merge batch đúng identity; reject expiry mismatch.
- Confirmed Stock Import immutable, có audit và test.

Sau Sprint 3, hệ thống đủ nền để tiếp tục Sprint 4 — Inventory Adjustment và POS Draft Order.

## 3. Baseline và nguyên tắc bắt buộc

### 3.1. Inventory source of truth

1. `MedicineBatch` là source of truth duy nhất cho tồn kho MVP.
2. Inventory Summary chỉ là dữ liệu suy ra, không phải bảng quantity tổng được sửa trực tiếp.
3. Stock Import, Inventory Adjustment và Checkout chỉ cập nhật quantity qua workflow nghiệp vụ có kiểm soát.
4. Không tạo public API cập nhật trực tiếp `MedicineBatch.quantity`.
5. Không dùng aggregate inventory để quyết định sellable stock hoặc checkout.

### 3.2. Batch identity

1. `batch_number` và `expiry_date` là bắt buộc.
2. Batch number phải được trim/normalize trước khi so sánh.
3. Identity chính thức là `medicine_id + normalized batch_number + expiry_date`.
4. Chỉ merge khi cả ba thành phần identity trùng.
5. Cùng medicine và batch number nhưng khác expiry phải bị reject.

### 3.3. Sellable stock

1. Sellable quantity được tính từ các batch active, còn hạn và quantity hợp lệ.
2. Batch hết hạn không được tính vào sellable stock.
3. Staff/POS chỉ cần sellable availability, không thấy dashboard kho tổng nếu thiếu quyền.
4. Admin/Warehouse được xem low-stock và near-expiry dashboard theo permission.
5. Near-expiry sử dụng threshold cấu hình nếu đã có; nếu chưa có thì dùng default baseline 90 ngày và không triển khai full Settings ngoài scope.

### 3.4. Stock Import

1. Stock Import có trạng thái Draft và Confirmed.
2. Draft cho phép thêm, sửa, xóa line.
3. Confirm phải validate supplier, medicine, batch number, expiry date và quantity.
4. Confirm chạy trong một database transaction.
5. Một line lỗi làm rollback toàn bộ.
6. Confirmed import là read-only và không được confirm lặp.
7. Supplier inactive không được confirm import mới.
8. Audit phải truy được actor, phiếu nhập và batch bị tác động.

### 3.5. Authorization

- Tái sử dụng Supabase Auth, `JwtAuthGuard`, `PermissionsGuard` và `@RequirePermissions()`.
- Admin và Warehouse có quyền Inventory/Stock Import phù hợp.
- Staff không có quyền vận hành Stock Import hoặc chỉnh tồn kho.
- Frontend permission chỉ hỗ trợ UX; backend là nơi enforce chính thức.

## 4. Bảng phân nhóm Epic → User Story → Task

| Epic | User Story | Task |
|---|---|---|
| PAC-EPIC-05 | US-27 — Thiết kế MedicineBatch là source of truth | PAC-TASK-102 → PAC-TASK-105 |
| PAC-EPIC-05 | US-28 — Batch number bắt buộc | PAC-TASK-106 → PAC-TASK-108 |
| PAC-EPIC-05 | US-29 — Batch identity theo medicine + batch + expiry | PAC-TASK-109 → PAC-TASK-111 |
| PAC-EPIC-05 | US-30 — Inventory Summary từ MedicineBatch | PAC-TASK-112 → PAC-TASK-114 |
| PAC-EPIC-05 | US-31 — Batch Detail view | PAC-TASK-115 → PAC-TASK-117 |
| PAC-EPIC-05 | US-32 — Tính sellable quantity | PAC-TASK-118 → PAC-TASK-119 |
| PAC-EPIC-05 | US-33 — Loại trừ batch hết hạn khỏi sellable stock | PAC-TASK-120 → PAC-TASK-121 |
| PAC-EPIC-05 | US-34 — Low-stock dựa trên sellable quantity | PAC-TASK-122 → PAC-TASK-124 |
| PAC-EPIC-05 | US-35 — Near-expiry theo threshold cấu hình | PAC-TASK-125 → PAC-TASK-126 |
| PAC-EPIC-05 | US-36 — Inventory dashboard cho Admin/Warehouse | PAC-TASK-127 |
| PAC-EPIC-05 | US-37 — POS chỉ xem sellable stock cần bán | PAC-TASK-128 |
| PAC-EPIC-05 | US-38 — Chặn sửa trực tiếp quantity trong Batch Detail | PAC-TASK-129 → PAC-TASK-130 |
| PAC-EPIC-06 | US-39 — Tạo phiếu nhập kho draft | PAC-TASK-131 → PAC-TASK-133 |
| PAC-EPIC-06 | US-40 — Thêm dòng thuốc vào phiếu nhập | PAC-TASK-134 → PAC-TASK-136 |
| PAC-EPIC-06 | US-41 — Cập nhật/xóa dòng nhập khi còn draft | PAC-TASK-137 → PAC-TASK-139 |
| PAC-EPIC-06 | US-42 — Validate supplier trong phiếu nhập | PAC-TASK-140 |
| PAC-EPIC-06 | US-43 — Validate batch number và expiry date | PAC-TASK-141 → PAC-TASK-142 |
| PAC-EPIC-06 | US-44 — Confirm Stock Import transaction | PAC-TASK-143 → PAC-TASK-145 |
| PAC-EPIC-06 | US-45 — Merge batch khi medicine/batch/expiry trùng | PAC-TASK-146 → PAC-TASK-148 |
| PAC-EPIC-06 | US-46 — Reject batch khi cùng batch nhưng khác expiry | PAC-TASK-149 → PAC-TASK-151 |
| PAC-EPIC-06 | US-47 — Khóa phiếu nhập đã confirmed | PAC-TASK-152 → PAC-TASK-155 |
| PAC-EPIC-06 | US-48 — Audit Stock Import | PAC-TASK-156 → PAC-TASK-160 |


# 5. PAC-EPIC-05 — INVENTORY & MEDICINEBATCH

## 5.1. Mục tiêu Epic

Xây dựng inventory core dựa trên `MedicineBatch`, cung cấp summary/detail/sellable stock chính xác và loại bỏ hoàn toàn giả định sửa tồn kho tổng trực tiếp.

## 5.2. Kết quả cần đạt của Epic

1. Có model, index và constraint MedicineBatch phù hợp.
2. Batch identity được enforce ở service và database.
3. Inventory Summary và Batch Detail hoạt động.
4. Sellable quantity loại batch hết hạn.
5. Low-stock và near-expiry states hoạt động.
6. Dashboard kho đúng permission.
7. POS có read-only sellable availability contract.
8. Không có UI/API direct quantity edit.
9. Các rule trọng yếu có automated tests.

## 5.3. US-27 — Thiết kế MedicineBatch là source of truth

### Mục tiêu User Story

Nhóm cần thiết kế MedicineBatch làm nguồn dữ liệu chính cho tồn kho.

### Kết quả cần đạt

- Tồn kho được tính từ MedicineBatch.
- Không dùng aggregate inventory làm source of truth.
- Batch có medicine, batch number, expiry date và quantity.
- Các luồng import, adjustment, checkout đều cập nhật batch.

### Task thuộc US-27

#### PAC-TASK-102 — Create medicine_batches Prisma model

**Nội dung công việc**

- Tạo model `MedicineBatch`.
- Thêm các trường `medicine_id`, `batch_number`, `expiry_date`, `quantity`, `created_at`, `updated_at`.
- Liên kết với Medicine.
- Chuẩn bị liên kết với Stock Import, Inventory Adjustment và Order Batch Allocation.
- Tạo migration.

**Kết quả cần đạt**

- Tồn kho được quản lý theo batch.
- MedicineBatch là source of truth.
- Không dùng aggregate inventory làm nguồn chính.
- Các luồng nhập kho, điều chỉnh tồn kho và checkout đều cập nhật batch.

#### PAC-TASK-103 — Add MedicineBatch indexes and constraints

**Nội dung công việc**

- Thêm index theo `medicine_id`.
- Thêm index theo `expiry_date`.
- Thêm constraint liên quan batch identity nếu phù hợp.
- Đảm bảo query inventory và FEFO hiệu quả hơn.
- Kiểm tra migration chạy ổn.

**Kết quả cần đạt**

- Query batch theo medicine nhanh hơn.
- FEFO có dữ liệu sắp xếp ổn định.
- Batch identity được hỗ trợ ở database.
- Dữ liệu tránh trùng sai baseline.

#### PAC-TASK-104 — Remove aggregate inventory source-of-truth assumptions

**Nội dung công việc**

- Không tạo bảng aggregate inventory làm nguồn chính.
- Nếu có view/summary inventory, phải tính từ MedicineBatch.
- Rà soát API inventory, POS, checkout.
- Rà soát seed data không insert tồn kho tổng tùy ý.
- Ghi chú guardrail trong code/docs.

**Kết quả cần đạt**

- MedicineBatch là nguồn dữ liệu chính duy nhất cho tồn kho.
- Inventory Summary chỉ là derived view.
- POS/Checkout không dùng aggregate stock sai.
- Baseline tồn kho được bảo vệ.

#### PAC-TASK-105 — Document MedicineBatch as inventory source of truth

**Nội dung công việc**

- Cập nhật documentation note.
- Ghi rõ Stock Import, Adjustment, Checkout đều cập nhật batch.
- Ghi rõ Inventory Summary là derived data.
- Ghi guardrail không sửa quantity trực tiếp.
- Link tới Story/Task liên quan nếu cần.

**Kết quả cần đạt**

- Developer và AI agent hiểu đúng thiết kế tồn kho.
- Không quay lại aggregate inventory.
- Tài liệu hỗ trợ review và demo.
- Traceability rõ hơn.

### Điều kiện hoàn thành US-27

- Toàn bộ Task đạt acceptance criteria.
- Backend authorization và validation đúng.
- Test liên quan pass.
- Progress, branch, commit và PR evidence được cập nhật.

## 5.4. US-28 — Batch number bắt buộc

### Mục tiêu User Story

Nhóm cần đảm bảo mỗi batch thuốc có batch number.

### Kết quả cần đạt

- Không cho tạo batch thiếu batch number.
- Batch number được normalize khi so sánh.
- Lỗi validation rõ ràng.
- Stock Import cũng bắt buộc batch number.

### Task thuộc US-28

#### PAC-TASK-106 — Enforce required batch_number

**Nội dung công việc**

- Validate batch number khi tạo batch từ Stock Import.
- Không cho batch number rỗng hoặc null.
- Trim khoảng trắng.
- Trả lỗi rõ nếu thiếu.
- Thêm constraint nếu phù hợp.

**Kết quả cần đạt**

- Mọi batch có batch number.
- Không có batch không định danh.
- Stock Import đúng baseline.
- FEFO và traceability ổn định.

#### PAC-TASK-107 — Normalize batch_number before comparison

**Nội dung công việc**

- Trim batch number.
- Chuẩn hóa hoa/thường nếu nhóm quyết định.
- Lưu normalized batch number hoặc dùng khi compare.
- Áp dụng trong Stock Import confirm.
- Viết test cho batch number có khoảng trắng.

**Kết quả cần đạt**

- Batch identity ổn định.
- Không tạo duplicate do khác khoảng trắng/chữ hoa.
- Merge/reject rule hoạt động chính xác.
- Dữ liệu batch sạch hơn.

#### PAC-TASK-108 — Add UI validation for batch_number

**Nội dung công việc**

- Batch number là field bắt buộc.
- Hiển thị lỗi nếu rỗng.
- Trim input trước khi gửi hoặc cảnh báo user.
- Không cho confirm nếu thiếu batch number.
- Đồng bộ với backend validation.

**Kết quả cần đạt**

- Warehouse nhập batch number đầy đủ.
- Giảm lỗi API validation.
- UI nhập kho rõ ràng hơn.
- Batch data phục vụ trace tốt.

### Điều kiện hoàn thành US-28

- Toàn bộ Task đạt acceptance criteria.
- Backend authorization và validation đúng.
- Test liên quan pass.
- Progress, branch, commit và PR evidence được cập nhật.

## 5.5. US-29 — Batch identity theo medicine + batch + expiry

### Mục tiêu User Story

Nhóm cần định nghĩa danh tính batch dựa trên medicine, batch number và expiry date.

### Kết quả cần đạt

- Batch được nhận diện bằng medicine_id + normalized batch_number + expiry_date.
- Không tạo duplicate batch sai quy tắc.
- Import thêm chỉ merge khi cả 3 yếu tố trùng.
- Expiry mismatch bị reject.

### Task thuộc US-29

#### PAC-TASK-109 — Implement batch identity validation service

**Nội dung công việc**

- Chuẩn hóa batch number trước khi so sánh.
- Xác định batch bằng `medicine_id + normalized batch_number + expiry_date`.
- Tìm batch hiện có khi stock import.
- Cho phép merge quantity nếu medicine, batch number và expiry date trùng.
- Chuẩn bị rule reject nếu cùng medicine + batch number nhưng expiry khác.

**Kết quả cần đạt**

- Batch identity được kiểm tra nhất quán.
- Không tạo duplicate batch sai hạn sử dụng.
- Import thêm vào batch cũ hoạt động đúng khi đủ điều kiện.
- Dữ liệu batch đáng tin cậy cho FEFO.

#### PAC-TASK-110 — Add migration constraint for medicine/batch/expiry uniqueness

**Nội dung công việc**

- Thêm unique constraint cho `medicine_id + normalized_batch_number + expiry_date`.
- Nếu không có normalized field, cân nhắc field hỗ trợ.
- Chạy migration.
- Xử lý dữ liệu seed trùng nếu có.
- Test constraint khi tạo duplicate.

**Kết quả cần đạt**

- Database chặn duplicate batch identity.
- Service logic được bảo vệ thêm ở DB.
- Stock Import không tạo batch trùng.
- FEFO không bị sai do dữ liệu duplicate.

#### PAC-TASK-111 — Add batch identity unit tests

**Nội dung công việc**

- Test batch mới chưa tồn tại.
- Test batch trùng medicine/batch/expiry được merge.
- Test cùng medicine/batch nhưng expiry khác bị reject.
- Test batch number có khoảng trắng/hoa thường.
- Test message lỗi.

**Kết quả cần đạt**

- Batch identity rule có test rõ.
- CI bắt lỗi nếu logic bị thay đổi sai.
- Expiry mismatch được bảo vệ.
- Stock Import đáng tin hơn.

### Điều kiện hoàn thành US-29

- Toàn bộ Task đạt acceptance criteria.
- Backend authorization và validation đúng.
- Test liên quan pass.
- Progress, branch, commit và PR evidence được cập nhật.

## 5.6. US-30 — Inventory Summary từ MedicineBatch

### Mục tiêu User Story

Nhóm cần xây dựng màn hình tổng quan tồn kho lấy dữ liệu từ batch.

### Kết quả cần đạt

- Inventory Summary tính tổng từ MedicineBatch.
- Hiển thị sellable quantity.
- Không tính batch hết hạn vào sellable quantity.
- Có tìm kiếm/lọc cơ bản.

### Task thuộc US-30

#### PAC-TASK-112 — Implement inventory summary query from MedicineBatch

**Nội dung công việc**

- Query các batch theo medicine.
- Tính tổng quantity.
- Tính sellable quantity.
- Tính expired/near-expiry nếu cần.
- Không dùng aggregate inventory làm source.

**Kết quả cần đạt**

- Inventory Summary phản ánh đúng batch.
- Sellable stock không tính batch hết hạn.
- Dữ liệu dùng được cho Admin/Warehouse.
- API chuẩn bị cho UI summary.

#### PAC-TASK-113 — Build Inventory Summary screen

**Nội dung công việc**

- Hiển thị danh sách thuốc và số lượng tồn tổng hợp.
- Hiển thị sellable quantity.
- Hiển thị trạng thái low-stock/near-expiry nếu có.
- Tích hợp API inventory summary.
- Thêm loading/empty/error state.

**Kết quả cần đạt**

- Admin/Warehouse xem được tồn kho tổng quan.
- Dữ liệu dựa trên MedicineBatch.
- UI rõ ràng và dễ demo.
- Staff không thấy dashboard vận hành nếu không có quyền.

#### PAC-TASK-114 — Add search/filter to Inventory Summary

**Nội dung công việc**

- Search theo tên hoặc mã thuốc.
- Filter theo low-stock.
- Filter theo near-expiry.
- Filter theo active medicine nếu cần.
- Đồng bộ query params với API.

**Kết quả cần đạt**

- User tìm tồn kho nhanh.
- Admin/Warehouse lọc thuốc cần chú ý.
- Empty state hiển thị khi không có kết quả.
- UI hỗ trợ quản lý kho tốt hơn.

### Điều kiện hoàn thành US-30

- Toàn bộ Task đạt acceptance criteria.
- Backend authorization và validation đúng.
- Test liên quan pass.
- Progress, branch, commit và PR evidence được cập nhật.

## 5.7. US-31 — Batch Detail view

### Mục tiêu User Story

Nhóm cần xây dựng màn hình xem chi tiết batch.

### Kết quả cần đạt

- Hiển thị medicine, batch number, expiry date, quantity.
- Hiển thị trạng thái expired/near-expiry/sellable.
- Không cho sửa trực tiếp quantity.
- Có liên kết tới import/adjustment nếu cần.

### Task thuộc US-31

#### PAC-TASK-115 — Implement Batch Detail API

**Nội dung công việc**

- Tạo endpoint `GET /inventory/batches/{id}`.
- Trả medicine, batch number, expiry date, quantity.
- Trả trạng thái expired/near-expiry/sellable.
- Kiểm tra permission inventory view.
- Trả 404 nếu batch không tồn tại.

**Kết quả cần đạt**

- UI xem được chi tiết batch.
- Dữ liệu batch rõ ràng.
- Không lộ dữ liệu cho user sai quyền.
- Chuẩn bị cho Inventory Adjustment chọn batch.

#### PAC-TASK-116 — Build Batch Detail screen

**Nội dung công việc**

- Hiển thị thông tin medicine.
- Hiển thị batch number, expiry date, quantity.
- Hiển thị trạng thái batch.
- Không có input sửa trực tiếp quantity.
- Có link đến adjustment nếu có quyền.

**Kết quả cần đạt**

- User xem được chi tiết batch.
- Không sửa quantity trực tiếp.
- UI hỗ trợ quản lý và trace batch.
- Màn hình phù hợp baseline MedicineBatch.

#### PAC-TASK-117 — Display expired/near-expiry/sellable batch status

**Nội dung công việc**

- Xác định batch expired nếu expiry date đã qua.
- Xác định near-expiry theo threshold.
- Xác định sellable nếu chưa expired và quantity > 0.
- Hiển thị badge trạng thái.
- Đồng bộ với logic backend.

**Kết quả cần đạt**

- User nhận biết batch nào bán được.
- Batch hết hạn hiển thị rõ.
- Near-expiry hiển thị đúng threshold.
- POS/FEFO không dùng expired batch.

### Điều kiện hoàn thành US-31

- Toàn bộ Task đạt acceptance criteria.
- Backend authorization và validation đúng.
- Test liên quan pass.
- Progress, branch, commit và PR evidence được cập nhật.

## 5.8. US-32 — Tính sellable quantity

### Mục tiêu User Story

Nhóm cần tính số lượng có thể bán từ các batch hợp lệ.

### Kết quả cần đạt

- Chỉ tính batch chưa hết hạn.
- Chỉ tính batch còn quantity.
- Sellable quantity dùng cho POS và report.
- Backend là nơi tính chính thức.

### Task thuộc US-32

#### PAC-TASK-118 — Implement sellable quantity calculation service

**Nội dung công việc**

- Lấy danh sách MedicineBatch theo thuốc.
- Chỉ tính batch còn hạn sử dụng.
- Chỉ tính batch có quantity > 0.
- Tổng hợp thành `sellable_quantity`.
- Dùng kết quả này cho Inventory Summary, POS và Checkout.

**Kết quả cần đạt**

- Sellable quantity tính đúng.
- Batch hết hạn không được tính để bán.
- POS không bán vượt số lượng có thể bán.
- Checkout có thể validate lại bằng backend.

#### PAC-TASK-119 — Add tests for sellable quantity calculation

**Nội dung công việc**

- Test thuốc có một batch sellable.
- Test thuốc có nhiều batch.
- Test batch expired không được tính.
- Test batch quantity bằng 0.
- Test tổng sellable quantity đúng.

**Kết quả cần đạt**

- Logic sellable quantity được bảo vệ.
- Không tính nhầm expired batch.
- POS và checkout có nền dữ liệu đúng.
- CI phát hiện lỗi tồn kho sớm.

### Điều kiện hoàn thành US-32

- Toàn bộ Task đạt acceptance criteria.
- Backend authorization và validation đúng.
- Test liên quan pass.
- Progress, branch, commit và PR evidence được cập nhật.

## 5.9. US-33 — Loại trừ batch hết hạn khỏi sellable stock

### Mục tiêu User Story

Nhóm cần đảm bảo thuốc hết hạn không được bán.

### Kết quả cần đạt

- Expired batch không được tính sellable.
- POS không được bán từ expired batch.
- FEFO không chọn expired batch.
- Inventory vẫn có thể hiển thị expired batch để quản lý.

### Task thuộc US-33

#### PAC-TASK-120 — Exclude expired batches from sellable stock

**Nội dung công việc**

- Cập nhật service sellable stock.
- Cập nhật API inventory summary.
- Cập nhật POS stock display nếu cần.
- Cập nhật FEFO query sau này.
- Test expired batch exclusion.

**Kết quả cần đạt**

- Thuốc hết hạn không được bán.
- Sellable stock chính xác.
- Inventory vẫn có thể hiển thị expired batch để quản lý.
- Checkout không dùng expired batch.

#### PAC-TASK-121 — Add tests for expired batch exclusion

**Nội dung công việc**

- Seed batch đã hết hạn.
- Seed batch chưa hết hạn.
- Kiểm tra sellable stock chỉ tính batch chưa hết hạn.
- Kiểm tra POS stock availability.
- Kiểm tra inventory report nếu có.

**Kết quả cần đạt**

- Expired batch exclusion có test.
- Không ai sửa code làm bán thuốc hết hạn.
- Rule an toàn kho được bảo vệ.
- Demo FEFO đáng tin hơn.

### Điều kiện hoàn thành US-33

- Toàn bộ Task đạt acceptance criteria.
- Backend authorization và validation đúng.
- Test liên quan pass.
- Progress, branch, commit và PR evidence được cập nhật.

## 5.10. US-34 — Low-stock dựa trên sellable quantity

### Mục tiêu User Story

Nhóm cần cảnh báo low-stock dựa trên số lượng bán được.

### Kết quả cần đạt

- Low-stock tính từ sellable quantity.
- Không tính batch hết hạn.
- Admin/Warehouse thấy cảnh báo.
- Staff không thấy dashboard vận hành tổng quát, chỉ thấy cảnh báo liên quan POS.

### Task thuộc US-34

#### PAC-TASK-122 — Implement low-stock calculation from sellable quantity

**Nội dung công việc**

- Lấy sellable quantity.
- So sánh với min stock threshold của medicine hoặc default.
- Đánh dấu low-stock nếu dưới ngưỡng.
- Trả trạng thái low-stock cho API.
- Không tính expired batch.

**Kết quả cần đạt**

- Low-stock đúng với số lượng bán được.
- Admin/Warehouse thấy cảnh báo chính xác.
- Staff không thấy dashboard vận hành tổng quát.
- Rule đúng baseline mới.

#### PAC-TASK-123 — Display low-stock state for Admin/Warehouse

**Nội dung công việc**

- Hiển thị badge hoặc card low-stock.
- Dùng dữ liệu từ API.
- Chỉ hiển thị trên màn hình phù hợp với Admin/Warehouse.
- Không hiển thị dashboard low-stock tổng quát cho Staff.
- Thêm empty state nếu không có thuốc low-stock.

**Kết quả cần đạt**

- Admin/Warehouse nhận biết thuốc sắp hết.
- Staff không bị overload bởi dashboard kho.
- UI đúng phân quyền.
- Dữ liệu cảnh báo dựa trên sellable quantity.

#### PAC-TASK-124 — Hide general low-stock dashboard from Staff

**Nội dung công việc**

- Kiểm tra permission sidebar.
- Ẩn dashboard inventory operational khỏi Staff.
- Nếu Staff truy cập URL trực tiếp, backend/frontend chặn.
- POS vẫn hiển thị warning liên quan bán hàng nếu cần.
- Test bằng tài khoản Staff.

**Kết quả cần đạt**

- Staff chỉ thấy thông tin stock cần cho POS.
- Dashboard operational dành cho Admin/Warehouse.
- Phân quyền UI đúng baseline.
- Không lộ dữ liệu kho không cần thiết cho Staff.

### Điều kiện hoàn thành US-34

- Toàn bộ Task đạt acceptance criteria.
- Backend authorization và validation đúng.
- Test liên quan pass.
- Progress, branch, commit và PR evidence được cập nhật.

## 5.11. US-35 — Near-expiry theo threshold cấu hình

### Mục tiêu User Story

Nhóm cần xác định thuốc gần hết hạn theo threshold hệ thống.

### Kết quả cần đạt

- Default threshold là 90 ngày.
- Admin có thể cấu hình threshold trong System Settings MVP.
- Near-expiry tính theo batch.
- Report/filter có thể dùng override nếu được scope.

### Task thuộc US-35

#### PAC-TASK-125 — Implement near-expiry calculation with threshold

**Nội dung công việc**

- Lấy threshold từ system settings, default 90 ngày.
- So sánh expiry date của từng batch với ngày hiện tại.
- Đánh dấu near-expiry nếu còn trong threshold.
- Không đánh dấu batch đã expired là near-expiry nếu đã có trạng thái expired riêng.
- Trả trạng thái cho API.

**Kết quả cần đạt**

- Near-expiry tính theo batch.
- Default threshold là 90 ngày.
- Admin/Warehouse thấy cảnh báo đúng.
- Report/filter có thể dùng dữ liệu này.

#### PAC-TASK-126 — Display near-expiry batch state

**Nội dung công việc**

- Hiển thị badge near-expiry trong Inventory Summary hoặc Batch Detail.
- Hiển thị expiry date.
- Có thể filter near-expiry nếu đã có API.
- Đồng bộ với threshold setting.
- Hiển thị empty state nếu không có batch gần hết hạn.

**Kết quả cần đạt**

- User dễ nhận biết batch gần hết hạn.
- UI hỗ trợ quản lý kho.
- Dữ liệu rõ ràng khi demo.
- Không nhầm near-expiry với expired.

### Điều kiện hoàn thành US-35

- Toàn bộ Task đạt acceptance criteria.
- Backend authorization và validation đúng.
- Test liên quan pass.
- Progress, branch, commit và PR evidence được cập nhật.

## 5.12. US-36 — Inventory dashboard cho Admin/Warehouse

### Mục tiêu User Story

Nhóm cần xây dựng dashboard tồn kho cho Admin/Warehouse.

### Kết quả cần đạt

- Admin/Warehouse thấy low-stock và near-expiry.
- Staff không thấy dashboard vận hành tổng quát.
- Dữ liệu lấy từ MedicineBatch.
- Có trạng thái loading/empty/error.

### Task thuộc US-36

#### PAC-TASK-127 — Build Admin/Warehouse inventory dashboard cards

**Nội dung công việc**

- Card tổng số thuốc.
- Card low-stock.
- Card near-expiry.
- Card expired batch nếu cần.
- Dữ liệu lấy từ MedicineBatch summary.

**Kết quả cần đạt**

- Admin/Warehouse có dashboard kho cơ bản.
- Staff không thấy dashboard này.
- Dashboard giúp demo quản lý kho trực quan.
- Card hiển thị loading/error/empty phù hợp.

### Điều kiện hoàn thành US-36

- Toàn bộ Task đạt acceptance criteria.
- Backend authorization và validation đúng.
- Test liên quan pass.
- Progress, branch, commit và PR evidence được cập nhật.

## 5.13. US-37 — POS chỉ xem sellable stock cần bán

### Mục tiêu User Story

Nhóm cần đảm bảo Staff trong POS chỉ thấy thông tin tồn kho phục vụ bán hàng.

### Kết quả cần đạt

- POS hiển thị availability bán được.
- Không hiển thị dashboard vận hành rộng cho Staff.
- Không cho bán quá sellable quantity.
- UI cập nhật khi số lượng draft thay đổi.

### Task thuộc US-37

#### PAC-TASK-128 — Build POS sellable stock display

**Nội dung công việc**

- POS medicine search hiển thị sellable quantity.
- Nếu stock thấp, hiển thị warning liên quan bán hàng.
- Không hiển thị toàn bộ dashboard kho cho Staff.
- Dữ liệu lấy từ backend.
- Cập nhật khi quantity trong Draft Order thay đổi.

**Kết quả cần đạt**

- Staff biết thuốc còn bán được bao nhiêu.
- Không bán vượt sellable stock.
- POS UX rõ hơn.
- Dữ liệu không tính expired batch.

### Điều kiện hoàn thành US-37

- Toàn bộ Task đạt acceptance criteria.
- Backend authorization và validation đúng.
- Test liên quan pass.
- Progress, branch, commit và PR evidence được cập nhật.

## 5.14. US-38 — Chặn sửa trực tiếp quantity trong Batch Detail

### Mục tiêu User Story

Nhóm cần chặn mọi chỉnh sửa quantity trực tiếp.

### Kết quả cần đạt

- Batch Detail không có input sửa quantity trực tiếp.
- Muốn điều chỉnh phải tạo Inventory Adjustment.
- Backend cũng không có endpoint public sửa trực tiếp quantity.
- Ghi chú guardrail rõ trong UI/task.

### Task thuộc US-38

#### PAC-TASK-129 — Remove direct quantity edit from Batch Detail UI

**Nội dung công việc**

- Không hiển thị field editable cho quantity.
- Nếu cần thay đổi, hướng user sang Inventory Adjustment.
- Hiển thị quantity ở dạng read-only.
- Kiểm tra các form không có direct edit quantity.
- Thêm note UX nếu cần.

**Kết quả cần đạt**

- User không sửa quantity trực tiếp từ Batch Detail.
- Tồn kho chỉ thay đổi qua import, adjustment hoặc checkout.
- UI đúng baseline audit.
- Giảm rủi ro sai lệch tồn kho.

#### PAC-TASK-130 — Ensure no public API directly edits batch quantity

**Nội dung công việc**

- Không tạo `PATCH /batches/{id}/quantity`.
- Rà soát service batch update.
- Chỉ cho update quantity qua Stock Import, Inventory Adjustment, Checkout.
- Nếu có internal method, bảo vệ không expose public.
- Viết guard note/test nếu cần.

**Kết quả cần đạt**

- MedicineBatch quantity không bị sửa tùy tiện.
- Audit trail tồn kho đáng tin.
- Baseline Inventory Adjustment được bảo vệ.
- AI agent không tạo API sai.

### Điều kiện hoàn thành US-38

- Toàn bộ Task đạt acceptance criteria.
- Backend authorization và validation đúng.
- Test liên quan pass.
- Progress, branch, commit và PR evidence được cập nhật.

# 6. PAC-EPIC-06 — STOCK IMPORT

## 6.1. Mục tiêu Epic

Xây dựng workflow nhập kho theo phiếu, bảo đảm Draft có thể chỉnh sửa, Confirm chạy transaction, MedicineBatch được tạo/merge đúng identity, mismatch bị reject và dữ liệu confirmed có audit/immutability.

## 6.2. Kết quả cần đạt của Epic

1. Có schema Stock Import và Stock Import Line.
2. Tạo Draft và quản lý line hoạt động.
3. Supplier, medicine, batch, expiry và quantity được validate.
4. Confirm transaction không tạo partial update.
5. Merge batch đúng rule và mismatch bị reject.
6. Confirmed import read-only, chống confirm lặp.
7. Audit và traceability đầy đủ.
8. Có unit, integration và smoke test.

## 6.3. US-39 — Tạo phiếu nhập kho draft

### Mục tiêu User Story

Nhóm cần xây dựng chức năng tạo phiếu nhập kho ở trạng thái draft.

### Kết quả cần đạt

- Warehouse/Admin có thể tạo draft.
- Draft lưu supplier, ngày nhập, ghi chú nếu có.
- Draft chưa làm thay đổi MedicineBatch.
- Có thể thêm dòng nhập sau khi tạo.

### Task thuộc US-39

#### PAC-TASK-131 — Create stock_imports Prisma model

**Nội dung công việc**

- Tạo model `StockImport`.
- Thêm supplier_id, created_by, status, confirmed_at, notes.
- Liên kết với stock import lines.
- Tạo enum status nếu cần.
- Tạo migration.

**Kết quả cần đạt**

- Database lưu được phiếu nhập.
- Phiếu nhập có trạng thái Draft/Confirmed.
- Supplier được liên kết.
- Chuẩn bị cho confirm transaction.

#### PAC-TASK-132 — Implement create Stock Import draft API

**Nội dung công việc**

- Tạo endpoint `POST /stock-imports`.
- Kiểm tra permission Warehouse/Admin.
- Validate supplier active.
- Tạo Stock Import status Draft.
- Không cập nhật MedicineBatch ở bước này.

**Kết quả cần đạt**

- Warehouse/Admin tạo được phiếu nhập.
- Phiếu mới chưa làm thay đổi tồn kho.
- API trả dữ liệu draft.
- Supplier được lưu đúng.

#### PAC-TASK-133 — Build create Stock Import screen

**Nội dung công việc**

- Tạo form chọn supplier.
- Nhập note hoặc thông tin phiếu nhập nếu cần.
- Gọi API tạo draft.
- Sau khi tạo, cho user thêm dòng nhập.
- Hiển thị loading/success/error.

**Kết quả cần đạt**

- Warehouse tạo được phiếu nhập từ UI.
- Supplier selector hoạt động.
- Draft được tạo đúng.
- UI chuẩn bị cho line editor.

### Điều kiện hoàn thành US-39

- Toàn bộ Task đạt acceptance criteria.
- Transaction/immutability/audit đúng theo phạm vi User Story.
- Test liên quan pass.
- Progress, branch, commit và PR evidence được cập nhật.

## 6.4. US-40 — Thêm dòng thuốc vào phiếu nhập

### Mục tiêu User Story

Nhóm cần cho phép thêm nhiều dòng thuốc vào phiếu nhập.

### Kết quả cần đạt

- Mỗi dòng có medicine, batch number, expiry date, quantity.
- Quantity phải lớn hơn 0.
- Medicine phải active.
- Lỗi validation hiển thị rõ.

### Task thuộc US-40

#### PAC-TASK-134 — Create stock_import_lines Prisma model

**Nội dung công việc**

- Tạo model `StockImportLine`.
- Liên kết với StockImport.
- Liên kết với Medicine.
- Thêm batch_number, expiry_date, quantity, import_cost nếu cần.
- Tạo migration.

**Kết quả cần đạt**

- Một phiếu nhập có nhiều dòng thuốc.
- Mỗi dòng có batch number và expiry date.
- Dữ liệu đủ để tạo/cộng MedicineBatch.
- Confirm import có dữ liệu chi tiết.

#### PAC-TASK-135 — Implement add stock import line API

**Nội dung công việc**

- Tạo endpoint add line.
- Kiểm tra phiếu nhập còn Draft.
- Validate medicine active.
- Validate quantity > 0.
- Lưu batch number và expiry date.

**Kết quả cần đạt**

- User thêm được dòng nhập.
- Không thêm line vào phiếu đã Confirmed.
- Dữ liệu line hợp lệ.
- UI line editor tích hợp được.

#### PAC-TASK-136 — Build stock import line editor UI

**Nội dung công việc**

- Cho phép chọn medicine.
- Nhập batch number, expiry date, quantity.
- Hiển thị danh sách dòng đã thêm.
- Cho phép update/delete khi phiếu còn Draft.
- Hiển thị lỗi validation.

**Kết quả cần đạt**

- Warehouse nhập được nhiều dòng thuốc.
- Batch number và expiry date rõ ràng.
- UI không cho sửa confirmed import.
- Dữ liệu gửi đúng API.

### Điều kiện hoàn thành US-40

- Toàn bộ Task đạt acceptance criteria.
- Transaction/immutability/audit đúng theo phạm vi User Story.
- Test liên quan pass.
- Progress, branch, commit và PR evidence được cập nhật.

## 6.5. US-41 — Cập nhật/xóa dòng nhập khi còn draft

### Mục tiêu User Story

Nhóm cần cho phép chỉnh sửa dòng nhập khi phiếu còn draft.

### Kết quả cần đạt

- Draft line có thể update/delete.
- Confirmed import không được sửa.
- UI phân biệt trạng thái draft/confirmed.
- Backend enforce trạng thái.

### Task thuộc US-41

#### PAC-TASK-137 — Implement update draft import line API

**Nội dung công việc**

- Tạo endpoint update import line.
- Kiểm tra line thuộc phiếu nhập.
- Kiểm tra phiếu còn Draft.
- Validate dữ liệu mới.
- Trả line đã cập nhật.

**Kết quả cần đạt**

- User sửa được dòng nhập trước confirm.
- Không sửa được line sau khi confirmed.
- Backend bảo vệ trạng thái.
- Dữ liệu cập nhật đúng.

#### PAC-TASK-138 — Implement delete draft import line API

**Nội dung công việc**

- Tạo endpoint delete import line.
- Kiểm tra phiếu nhập còn Draft.
- Xóa line hoặc mark deleted tùy thiết kế.
- Không ảnh hưởng MedicineBatch vì chưa confirm.
- Trả kết quả rõ ràng.

**Kết quả cần đạt**

- User xóa được line khi còn Draft.
- Confirmed import không bị sửa.
- Draft data linh hoạt.
- UI đồng bộ sau khi xóa.

#### PAC-TASK-139 — Disable edit/delete for confirmed import lines

**Nội dung công việc**

- Backend reject update/delete nếu import confirmed.
- UI disable nút edit/delete.
- Hiển thị trạng thái read-only.
- Test confirmed import không sửa được.
- Trả lỗi rõ nếu gọi API trực tiếp.

**Kết quả cần đạt**

- Phiếu nhập confirmed immutable.
- Không thể sửa dữ liệu nhập kho sau confirm.
- Tồn kho không bị lệch.
- Audit nhập kho đáng tin.

### Điều kiện hoàn thành US-41

- Toàn bộ Task đạt acceptance criteria.
- Transaction/immutability/audit đúng theo phạm vi User Story.
- Test liên quan pass.
- Progress, branch, commit và PR evidence được cập nhật.

## 6.6. US-42 — Validate supplier trong phiếu nhập

### Mục tiêu User Story

Nhóm cần validate supplier khi nhập kho.

### Kết quả cần đạt

- Supplier phải tồn tại và active.
- Supplier hiển thị trong detail phiếu nhập.
- Nếu supplier inactive thì không cho confirm.
- Error message rõ ràng.

### Task thuộc US-42

#### PAC-TASK-140 — Validate active supplier before confirm import

**Nội dung công việc**

- Lấy supplier của Stock Import.
- Kiểm tra supplier tồn tại và active.
- Nếu inactive, reject confirm.
- Trả lỗi rõ cho Warehouse.
- Không update MedicineBatch khi supplier invalid.

**Kết quả cần đạt**

- Không confirm import với supplier inactive.
- Dữ liệu nhập kho đúng source.
- Transaction không chạy khi validation fail.
- UI hiển thị lỗi phù hợp.

### Điều kiện hoàn thành US-42

- Toàn bộ Task đạt acceptance criteria.
- Transaction/immutability/audit đúng theo phạm vi User Story.
- Test liên quan pass.
- Progress, branch, commit và PR evidence được cập nhật.

## 6.7. US-43 — Validate batch number và expiry date

### Mục tiêu User Story

Nhóm cần validate batch identity trong stock import.

### Kết quả cần đạt

- Batch number bắt buộc.
- Expiry date bắt buộc.
- Expiry date không được là ngày không hợp lệ.
- Normalize batch number trước khi so sánh.

### Task thuộc US-43

#### PAC-TASK-141 — Validate batch number in import line

**Nội dung công việc**

- Batch number là bắt buộc.
- Trim và normalize batch number.
- Reject batch number rỗng.
- Trả lỗi theo dòng nhập.
- Đồng bộ với UI validation.

**Kết quả cần đạt**

- Mọi dòng nhập có batch number.
- Không tạo MedicineBatch thiếu batch.
- Traceability batch rõ ràng.
- Confirm import an toàn hơn.

#### PAC-TASK-142 — Validate expiry date in import line

**Nội dung công việc**

- Expiry date là bắt buộc.
- Kiểm tra date format hợp lệ.
- Reject date invalid.
- Cho phép nhập expired batch hay không tùy rule demo, nhưng expired batch không được sellable.
- Trả lỗi rõ nếu thiếu ngày.

**Kết quả cần đạt**

- Mọi batch có expiry date.
- FEFO có dữ liệu expiry để sắp xếp.
- Near-expiry/expired calculation hoạt động.
- Không có batch thiếu hạn sử dụng.

### Điều kiện hoàn thành US-43

- Toàn bộ Task đạt acceptance criteria.
- Transaction/immutability/audit đúng theo phạm vi User Story.
- Test liên quan pass.
- Progress, branch, commit và PR evidence được cập nhật.

## 6.8. US-44 — Confirm Stock Import transaction

### Mục tiêu User Story

Nhóm cần xử lý confirm phiếu nhập bằng transaction.

### Kết quả cần đạt

- Confirm import chạy transaction.
- Tạo mới hoặc cộng MedicineBatch đúng rule.
- Nếu một dòng lỗi thì rollback toàn bộ.
- Confirm xong phiếu bị khóa.

### Task thuộc US-44

#### PAC-TASK-143 — Implement confirm Stock Import transaction skeleton

**Nội dung công việc**

- Kiểm tra phiếu nhập đang ở trạng thái Draft.
- Đọc toàn bộ dòng nhập.
- Validate supplier, medicine, batch number, expiry date và quantity.
- Trong transaction, tạo mới hoặc cộng quantity vào MedicineBatch.
- Nếu bất kỳ dòng nào lỗi, rollback toàn bộ.
- Đổi trạng thái phiếu nhập thành Confirmed.

**Kết quả cần đạt**

- Confirm phiếu nhập cập nhật MedicineBatch đúng.
- Không có partial confirm.
- Không cộng tồn kho lặp.
- Confirmed import bị khóa không cho sửa.

#### PAC-TASK-144 — Apply stock import lines to MedicineBatch

**Nội dung công việc**

- Với mỗi line, xác định medicine, batch number, expiry date.
- Tìm batch hiện có theo batch identity.
- Nếu trùng đầy đủ, cộng quantity.
- Nếu chưa có, tạo batch mới.
- Nếu expiry mismatch, để task reject xử lý hoặc trả lỗi.

**Kết quả cần đạt**

- Stock Import confirmed làm tăng MedicineBatch đúng.
- Không cập nhật aggregate inventory.
- Quantity batch sau confirm chính xác.
- Hỗ trợ merge batch hợp lệ.

#### PAC-TASK-145 — Rollback Stock Import confirm on any invalid line

**Nội dung công việc**

- Bọc confirm import trong transaction.
- Nếu một line lỗi validation, throw error.
- Không cập nhật bất kỳ MedicineBatch nào nếu fail.
- Không đổi trạng thái phiếu nhập sang Confirmed.
- Trả danh sách lỗi hoặc lỗi rõ ràng cho user.

**Kết quả cần đạt**

- Không có partial confirm.
- Dữ liệu batch không bị cập nhật nửa chừng.
- Warehouse biết lỗi để sửa.
- Confirm import an toàn và nhất quán.

### Điều kiện hoàn thành US-44

- Toàn bộ Task đạt acceptance criteria.
- Transaction/immutability/audit đúng theo phạm vi User Story.
- Test liên quan pass.
- Progress, branch, commit và PR evidence được cập nhật.

## 6.9. US-45 — Merge batch khi medicine/batch/expiry trùng

### Mục tiêu User Story

Nhóm cần cộng quantity vào batch đã có nếu identity trùng.

### Kết quả cần đạt

- Nếu medicine_id + batch_number + expiry_date trùng thì cộng quantity.
- Không tạo duplicate batch.
- Audit/history vẫn ghi nhận import.
- Quantity sau merge đúng.

### Task thuộc US-45

#### PAC-TASK-146 — Implement batch merge when medicine/batch/expiry match

**Nội dung công việc**

- Chuẩn hóa batch number trước khi so sánh.
- Tìm MedicineBatch theo `medicine_id + normalized_batch_number + expiry_date`.
- Nếu identity trùng đầy đủ, cộng quantity trong cùng transaction confirm.
- Không tạo batch duplicate để né rule merge.
- Bảo đảm kết quả merge được liên kết về Stock Import line.

**Kết quả cần đạt**

- Import cùng identity làm tăng đúng quantity của batch hiện có.
- Không tạo MedicineBatch trùng.
- Merge vẫn giữ traceability của phiếu nhập.
- Logic chạy an toàn trong transaction.

#### PAC-TASK-147 — Add unit tests for valid batch merge rule

**Nội dung công việc**

- Tạo dữ liệu batch hiện có và dòng nhập có identity trùng.
- Kiểm tra quantity được cộng đúng.
- Kiểm tra không tạo thêm batch.
- Kiểm tra normalization batch number.
- Kiểm tra nhiều dòng hợp lệ nếu service hỗ trợ.

**Kết quả cần đạt**

- Rule merge hợp lệ có unit test bảo vệ.
- Test phát hiện regression về duplicate batch hoặc cộng sai quantity.

#### PAC-TASK-148 — Show batch merge result after Stock Import confirm

**Nội dung công việc**

- Mở rộng response/detail để phân biệt batch mới và batch được merge.
- Hiển thị quantity nhập và quantity sau merge.
- Hiển thị kết quả theo từng line.
- Không hiển thị thông tin nội bộ không cần thiết.

**Kết quả cần đạt**

- Warehouse nhìn thấy kết quả confirm rõ ràng.
- Dễ đối chiếu line nào tạo batch mới và line nào cộng batch cũ.

### Điều kiện hoàn thành US-45

- Toàn bộ Task đạt acceptance criteria.
- Transaction/immutability/audit đúng theo phạm vi User Story.
- Test liên quan pass.
- Progress, branch, commit và PR evidence được cập nhật.

## 6.10. US-46 — Reject batch khi cùng batch nhưng khác expiry

### Mục tiêu User Story

Nhóm cần reject import nếu cùng medicine + batch number nhưng expiry khác.

### Kết quả cần đạt

- Detect expiry mismatch.
- Không tạo batch mới để né lỗi.
- Không silently merge.
- Trả lỗi rõ ràng cho Warehouse.

### Task thuộc US-46

#### PAC-TASK-149 — Implement expiry mismatch rejection

**Nội dung công việc**

- Tìm batch theo medicine và normalized batch number.
- Nếu đã có batch cùng medicine/batch nhưng expiry khác, reject confirm.
- Không tự tạo batch mới để né mismatch.
- Throw lỗi nghiệp vụ trước khi commit transaction.
- Giữ phiếu ở Draft khi thất bại.

**Kết quả cần đạt**

- Expiry mismatch bị chặn nhất quán.
- Không cập nhật quantity hoặc trạng thái phiếu khi mismatch.
- Batch identity không bị phân mảnh sai.

#### PAC-TASK-150 — Return line-level expiry mismatch errors

**Nội dung công việc**

- Gắn lỗi mismatch với line cụ thể.
- Trả medicine, batch number và thông tin expiry liên quan ở mức an toàn.
- Cho frontend map lỗi về đúng dòng nhập.
- Không trả stack trace hoặc dữ liệu nhạy cảm.

**Kết quả cần đạt**

- Warehouse biết chính xác dòng cần sửa.
- UI có thể hiển thị lỗi tại line thay vì lỗi chung mơ hồ.

#### PAC-TASK-151 — Add tests for expiry mismatch rejection

**Nội dung công việc**

- Test cùng medicine/batch nhưng expiry khác.
- Test transaction rollback.
- Test import vẫn Draft.
- Test MedicineBatch không thay đổi.
- Test error response có line context.

**Kết quả cần đạt**

- Rule mismatch có test unit/integration phù hợp.
- Regression không thể âm thầm tạo duplicate batch.

### Điều kiện hoàn thành US-46

- Toàn bộ Task đạt acceptance criteria.
- Transaction/immutability/audit đúng theo phạm vi User Story.
- Test liên quan pass.
- Progress, branch, commit và PR evidence được cập nhật.

## 6.11. US-47 — Khóa phiếu nhập đã confirmed

### Mục tiêu User Story

Nhóm cần đảm bảo phiếu nhập đã confirmed không bị sửa.

### Kết quả cần đạt

- Confirmed import không update/delete line.
- Không confirm lại cùng phiếu.
- UI disable action không hợp lệ.
- Backend enforce immutable state.

### Task thuộc US-47

#### PAC-TASK-152 — Lock confirmed Stock Import status

**Nội dung công việc**

- Chặn sửa header phiếu khi status Confirmed.
- Chặn thêm, sửa và xóa line sau confirm.
- Chặn chuyển ngược Confirmed về Draft.
- Áp dụng guard ở backend, không chỉ UI.

**Kết quả cần đạt**

- Confirmed Stock Import trở thành immutable.
- Direct API call sửa phiếu confirmed bị reject.

#### PAC-TASK-153 — Build confirmed Stock Import read-only UI

**Nội dung công việc**

- Hiển thị chi tiết phiếu confirmed ở chế độ read-only.
- Ẩn hoặc disable action edit/delete/add line.
- Hiển thị status, supplier, lines và tổng quan kết quả confirm.
- Giữ khả năng xem audit metadata.

**Kết quả cần đạt**

- Người dùng xem được dữ liệu confirmed nhưng không chỉnh sửa.
- UI nhất quán với backend immutability.

#### PAC-TASK-154 — Prevent duplicate Stock Import confirm

**Nội dung công việc**

- Reject request confirm nếu phiếu không còn ở Draft.
- Bảo vệ trường hợp double-click hoặc request lặp.
- Không cộng quantity lần hai.
- Trả lỗi nghiệp vụ/idempotent response phù hợp.

**Kết quả cần đạt**

- Một phiếu chỉ tác động tồn kho một lần.
- Double-submit không làm tăng quantity lặp.

#### PAC-TASK-155 — Add tests for confirmed Stock Import immutability

**Nội dung công việc**

- Test sửa header confirmed bị reject.
- Test thêm/sửa/xóa line confirmed bị reject.
- Test confirm lặp không cập nhật batch.
- Test UI/API contract nếu phù hợp.

**Kết quả cần đạt**

- Tính bất biến của phiếu confirmed được bảo vệ bằng test.

### Điều kiện hoàn thành US-47

- Toàn bộ Task đạt acceptance criteria.
- Transaction/immutability/audit đúng theo phạm vi User Story.
- Test liên quan pass.
- Progress, branch, commit và PR evidence được cập nhật.

## 6.12. US-48 — Audit Stock Import

### Mục tiêu User Story

Nhóm cần ghi nhận audit cho nghiệp vụ nhập kho.

### Kết quả cần đạt

- Ghi actor, thời gian, hành động.
- Ghi thông tin confirm import.
- Có thể trace batch được tạo/cộng từ import.
- Không lưu dữ liệu thừa nhạy cảm.

### Task thuộc US-48

#### PAC-TASK-156 — Write audit log for Stock Import confirm

**Nội dung công việc**

- Ghi actor, action, entity và timestamp.
- Ghi Stock Import id và trạng thái chuyển đổi.
- Ghi metadata đủ để truy batch được tạo hoặc cộng.
- Không lưu secret hoặc dữ liệu nhạy cảm không cần thiết.
- Audit được tạo cùng flow confirm nhất quán.

**Kết quả cần đạt**

- Confirm Stock Import có thể truy vết.
- Audit phản ánh đúng actor và kết quả nghiệp vụ.

#### PAC-TASK-157 — Show Stock Import audit metadata in detail UI

**Nội dung công việc**

- Hiển thị người tạo/người confirm nếu có quyền.
- Hiển thị created/confirmed timestamps.
- Hiển thị trạng thái và mã phiếu.
- Không expose dữ liệu audit nhạy cảm.

**Kết quả cần đạt**

- Trang detail hỗ trợ kiểm tra và demo traceability.

#### PAC-TASK-158 — Add Stock Import traceability notes

**Nội dung công việc**

- Ghi mapping Story/Task/API/model/test liên quan Stock Import.
- Mô tả batch source of truth và transaction boundary.
- Ghi rule merge, mismatch, immutability và audit.
- Cập nhật tài liệu Sprint/progress phù hợp.

**Kết quả cần đạt**

- Reviewer truy được yêu cầu đến implementation và test.
- Tài liệu không mâu thuẫn baseline.

#### PAC-TASK-159 — Add Stock Import confirm integration tests

**Nội dung công việc**

- Test confirm nhiều line hợp lệ.
- Test tạo batch mới và merge batch cũ.
- Test rollback khi một line lỗi.
- Test supplier inactive, expiry mismatch và duplicate confirm.
- Xác minh trạng thái phiếu, batch quantity và audit log.

**Kết quả cần đạt**

- Luồng confirm end-to-end ở tầng backend có integration test đáng tin cậy.

#### PAC-TASK-160 — Add Stock Import smoke test checklist

**Nội dung công việc**

- Viết checklist tạo Draft, thêm/sửa/xóa line và confirm.
- Bao gồm merge hợp lệ, mismatch, rollback và confirmed read-only.
- Bao gồm permission Admin/Warehouse/Staff.
- Ghi expected result rõ ràng.

**Kết quả cần đạt**

- Có checklist kiểm tra nhanh trước demo và trước merge Sprint.

### Điều kiện hoàn thành US-48

- Toàn bộ Task đạt acceptance criteria.
- Transaction/immutability/audit đúng theo phạm vi User Story.
- Test liên quan pass.
- Progress, branch, commit và PR evidence được cập nhật.

# 7. EPIC HỖ TRỢ TRONG SPRINT 3

## 7.1. PAC-EPIC-19 — Testing, Smoke Test & Release Readiness

### Task tham gia

`PAC-TASK-111`, `119`, `121`, `147`, `151`, `155`, `159`, `160`.

### Nội dung cần đạt

- Unit test cho batch identity, sellable quantity, expired exclusion, merge và mismatch.
- Test immutability và duplicate confirm.
- Integration test cho confirm Stock Import transaction.
- Smoke checklist cho luồng Stock Import và permission.
- Không đánh dấu pass nếu chưa chạy lệnh kiểm thử thực tế.

## 7.2. PAC-EPIC-21 — Documentation & Traceability

### Task tham gia

`PAC-TASK-105`, `PAC-TASK-158`.

### Nội dung cần đạt

- Ghi rõ MedicineBatch là inventory source of truth.
- Trace được requirement → Story → Task → API/model → test.
- Tài liệu không mô tả direct quantity edit hoặc aggregate inventory là nguồn chính.

# 8. PHÂN NHÓM TRIỂN KHAI THEO DEPENDENCY

## Nhóm A — MedicineBatch Foundation

- US-27 → US-29
- PAC-TASK-102 → PAC-TASK-111

Phải hoàn thành schema, constraints, normalization và identity test trước các query inventory hoặc Stock Import.

## Nhóm B — Inventory Query & Visibility

- US-30 → US-38
- PAC-TASK-112 → PAC-TASK-130

Thực hiện summary/detail, sellable quantity, expired exclusion, low-stock, near-expiry, dashboard và no-direct-edit guard.

## Nhóm C — Stock Import Draft

- US-39 → US-43
- PAC-TASK-131 → PAC-TASK-142

Thực hiện schema phiếu/line, draft CRUD và validation trước confirm.

## Nhóm D — Stock Import Confirm Transaction

- US-44 → US-46
- PAC-TASK-143 → PAC-TASK-151

Thực hiện transaction, apply lines, rollback, merge và mismatch rejection.

## Nhóm E — Immutability, Audit & Release Evidence

- US-47 → US-48
- PAC-TASK-152 → PAC-TASK-160

Khóa confirmed import, chống confirm lặp, ghi audit, integration test và smoke checklist.

# 9. BẢN ĐỒ SKILL ĐỀ XUẤT

| Nhóm công việc | Skill chính |
|---|---|
| Audit Sprint/Epic | `agent-skills-lifecycle`, `ecc-code-quality`, `ecc-database`, `ecc-backend`, `git-github` |
| Prisma schema/constraint/migration | `karpathy-principles`, `writing-plans`, `ecc-database`, `ecc-backend`, `tdd`, `ecc-testing` |
| Inventory/Stock Import API | `ecc-backend`, `ecc-database`, `ecc-security`, `tdd`, `ecc-testing` |
| Transaction/merge/mismatch | `writing-plans`, `ecc-database`, `ecc-backend`, `tdd`, `ecc-testing`, `mattpocock-engineering` khi debug |
| Frontend Inventory/Stock Import | `brainstorming`, `modern-web-guidance`, `ecc-frontend`, `design-system-guide`, `ecc-testing` |
| Permission/route/action | `ecc-security`, `ecc-backend`, `ecc-frontend`, `ecc-testing` |
| Git/PR/Merge | `git-github`, `ecc-devops`, `ecc-business-ops` |
| Progress/traceability | `mattpocock-productivity`, `ecc-business-ops` |

Không gọi toàn bộ skill cho mọi Task; phải chọn bộ skill tối thiểu nhưng đủ theo loại thay đổi.

# 10. QUY TRÌNH BRANCH, PR VÀ MERGE

## 10.1. Luồng bắt buộc

```text
Task branch → User Story branch → Epic branch → develop → main
```

## 10.2. Quy tắc

1. Epic branch tạo từ `develop` mới nhất.
2. US branch tạo từ Epic branch mới nhất.
3. Task branch tạo từ US branch mới nhất.
4. Dùng Jira issue key thật trong `Jira/jira-mapping.md`.
5. Một Task branch chỉ triển khai một Jira Task.
6. Không tạo tất cả Task branch cùng lúc nếu có dependency.
7. PR Task → US; PR US → Epic; PR Epic → develop.
8. Không xóa branch sau merge để giữ evidence.
9. Không force push lên `main` hoặc `develop`.
10. PR `develop → main` chỉ tạo sau Sprint verification và không tự merge khi chưa được người dùng duyệt.

## 10.3. Commit format

```text
<type>(<scope>): <Jira key> <short English description>
```

Ví dụ:

```text
feat(inventory): PAC-312 add MedicineBatch Prisma model
test(stock-import): PAC-357 cover valid batch merge
fix(stock-import): PAC-359 reject expiry mismatch
docs(stock-import): PAC-368 add traceability notes
```

# 11. KIỂM THỬ BẮT BUỘC

## 11.1. Backend và database

- Prisma validate/generate.
- Backend lint/build.
- Unit tests cho identity, sellable, expired exclusion, merge, mismatch và immutability.
- Integration test cho Stock Import confirm.
- 401/403 và permission regression.
- Transaction rollback và duplicate confirm.

## 11.2. Frontend

- Frontend lint/build.
- Inventory Summary loading/empty/error.
- Batch Detail status và read-only quantity.
- Stock Import Draft form/line editor.
- Confirm result, line-level errors và confirmed read-only UI.
- Permission-aware menu/action.

## 11.3. Manual UI Test tối thiểu

### Inventory

- Admin/Warehouse xem Inventory Summary.
- Staff không thấy dashboard kho tổng.
- Sellable quantity không tính batch hết hạn.
- Low-stock và near-expiry hiển thị đúng.
- Batch Detail không có direct quantity edit.

### Stock Import

- Tạo Draft với Supplier active.
- Thêm/sửa/xóa line khi Draft.
- Batch number và expiry bắt buộc.
- Confirm nhiều line hợp lệ.
- Merge batch identity trùng.
- Reject expiry mismatch và hiển thị lỗi đúng line.
- Rollback toàn bộ nếu một line lỗi.
- Confirmed import read-only.
- Double confirm không cộng tồn kho lần hai.
- Audit metadata hiển thị đúng quyền.

# 12. DEFINITION OF DONE CHO SPRINT 3

Sprint 3 chỉ hoàn thành khi:

## MedicineBatch

- Model, index và constraints hợp lệ.
- Batch number và expiry bắt buộc.
- Identity được enforce và có test.
- MedicineBatch là source of truth.

## Inventory

- Summary và detail hoạt động.
- Sellable quantity loại expired batch.
- Low-stock/near-expiry đúng.
- Dashboard đúng permission.
- Không có direct quantity edit API/UI.

## Stock Import

- Draft và line CRUD hoạt động.
- Supplier/medicine/batch/expiry/quantity validation hoạt động.
- Confirm transaction atomic.
- Merge đúng identity.
- Expiry mismatch bị reject.
- Confirmed import immutable và chống confirm lặp.
- Audit/traceability đầy đủ.

## Quality Gate

- Backend test, E2E/integration test liên quan pass.
- Prisma validate/generate pass.
- Backend/frontend build pass.
- Manual UI checklist có evidence.
- Không có secret hoặc `.env` thật trong Git.
- Không có Task Sprint 3 còn Missing/Conflict chưa xử lý.

# 13. OUT-OF-SCOPE GUARD

Không triển khai trong Sprint 3:

- Inventory Adjustment của Sprint 4.
- POS Draft Order đầy đủ của Sprint 4.
- FEFO allocation khi checkout của Sprint 6.
- Payment hoặc Invoice.
- Full multi-store/multi-warehouse.
- Stock Transfer.
- Direct quantity edit cho MedicineBatch.
- Aggregate inventory làm source of truth.
- Neo4j/Graph-RAG quyết định tồn kho.
- Full System Settings UI nếu không nằm trong Task 102–160.

# 14. ĐẦU RA CUỐI SPRINT

1. Prisma migrations cho MedicineBatch và Stock Import.
2. Inventory Summary và Batch Detail API/UI.
3. Sellable/expired/low-stock/near-expiry services.
4. Stock Import Draft và line management.
5. Stock Import confirm transaction.
6. Merge/mismatch/rollback/immutability logic.
7. Audit và traceability.
8. Unit/integration/smoke tests.
9. Branch/commit/PR evidence theo Task → US → Epic → develop.
10. File `sprint-3-progress.md` để theo dõi trạng thái thực thi và quyết định Ready for Sprint 4.

# 15. TÀI LIỆU THEO DÕI TIẾN ĐỘ

Tiến độ thực tế của Sprint 3 được quản lý riêng tại:

```text
work-context/sprint-3/sprint-3-progress.md
```

File tiến độ phải được cập nhật sau mỗi Task, User Story và Epic, bao gồm Jira key thật, branch, commit, Pull Request, test evidence, manual test, known issues và quyết định `Ready for Sprint 4`.

# 16. KẾT LUẬN
Sprint 3 là nền tảng quyết định độ chính xác của tồn kho và mọi luồng bán hàng sau này. Trọng tâm không chỉ là CRUD, mà là bảo vệ source of truth, transaction, identity, immutability và audit.

Thứ tự thực hiện bắt buộc:

```text
MedicineBatch foundation
→ Inventory Summary / Sellable Stock
→ Stock Import Draft
→ Confirm Transaction
→ Merge / Mismatch / Rollback
→ Immutability / Audit / Tests
```

Chỉ khi toàn bộ quality gate đạt và `Ready for Sprint 4 = Yes` mới bắt đầu Inventory Adjustment và POS Draft Order.
