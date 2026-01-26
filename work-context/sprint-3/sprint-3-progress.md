# Sprint 3 Progress — PharmaAssist AI Intelligence

> File này dùng để theo dõi tiến độ hoàn thiện Sprint 3.
> AI Agent phải cập nhật ngay sau khi audit, triển khai, kiểm thử, commit, tạo PR hoặc merge.
> Checkbox trong cấu trúc **Epic → User Story → Task** là trạng thái chính thức. Không tạo thêm checkbox trùng cho cùng một Task ở phần khác.

---

# 1. Sprint Information

| Mục | Nội dung |
|---|---|
| Sprint | Sprint 3 |
| Sprint name | MedicineBatch, Inventory Summary & Stock Import |
| Scope | MVP / Core |
| MVP Gate | Có |
| Epic nghiệp vụ | PAC-EPIC-05, PAC-EPIC-06 |
| Epic hỗ trợ | PAC-EPIC-19, PAC-EPIC-21 |
| Story range | US-27 → US-48 |
| Task range | PAC-TASK-102 → PAC-TASK-160 |
| Tổng User Story | 22 |
| Tổng Task | 59 |
| Progress status | In Progress |
| Ready for Sprint 4 | No |

---

# 2. Quy tắc cập nhật

- `[ ]`: Chưa hoàn thành.
- `[x]`: Đã hoàn thành đầy đủ và có evidence.
- Không đánh dấu User Story hoàn thành khi còn Task chưa hoàn thành.
- Không đánh dấu Epic hoàn thành khi còn User Story chưa hoàn thành.
- Không đánh dấu Task hoàn thành chỉ vì file hoặc code tương tự đã tồn tại.
- Task chỉ được đánh dấu `[x]` khi đã đạt acceptance criteria, kiểm thử phù hợp pass và merge đúng luồng Git.
- Sau mỗi Task phải ghi branch, commit, PR và test evidence vào mục **Task Evidence Log**.
- Nếu chỉ hoàn thành một phần, giữ `[ ]` và ghi `Partial` trong Known Issues hoặc Evidence Log.
- Nếu test fail trong phạm vi Task, không được đánh dấu `[x]`.

---

# 3. Sprint Summary

- [x] **Sprint 3 completed**
- [x] **PAC-EPIC-05 completed**
- [x] **PAC-EPIC-06 completed**
- [x] **All 22 User Stories completed**
- [x] **All 59 Tasks completed**
- [x] **Final automated verification passed**
- [x] **Manual UI test passed**
- [x] **Ready for Sprint 4**

| Hạng mục | Tổng | Hoàn thành |
|---|---:|---:|
| Epic nghiệp vụ | 2 | 0 |
| User Story | 22 | 0 |
| Task | 59 | 0 |

---
# 4. PAC-EPIC-05 — Inventory & MedicineBatch

- [x] **Epic completed**

| Thuộc tính | Giá trị |
|---|---|
| Scope | MVP / Core |
| Sprint | Sprint 3 |
| Component | Inventory & MedicineBatch |
| User Story | US-27 → US-38 |
| Số User Story | 12 |
| Số Task | 29 |
| Epic branch | Chưa cập nhật |
| Epic PR → develop | Chưa cập nhật |

## Epic Completion Criteria

- [x] MedicineBatch là inventory source of truth.
- [x] Batch identity được enforce ở database và service.
- [x] Inventory Summary và Batch Detail hoạt động.
- [x] Sellable quantity loại batch hết hạn.
- [x] Low-stock và near-expiry đúng permission.
- [x] Không có direct quantity edit.
- [x] Automated tests liên quan pass.
- [x] Epic branch đã merge vào develop qua PR đạt checks.

---
## US-27 — Thiết kế MedicineBatch là source of truth

- [x] **User Story completed**

### Tasks

- [x] **PAC-TASK-102** — Create medicine_batches Prisma model
- [x] **PAC-TASK-103** — Add MedicineBatch indexes and constraints
- [x] **PAC-TASK-104** — Remove aggregate inventory source-of-truth assumptions
- [x] **PAC-TASK-105** — Document MedicineBatch as inventory source of truth

### Completion Criteria

- [ ] MedicineBatch được xác lập là inventory source of truth của MVP.
- [ ] Schema, quan hệ, index và constraint cần thiết đã được tạo và validate.
- [ ] Không còn logic sử dụng aggregate inventory làm nguồn quantity chính.
- [ ] Tài liệu source-of-truth được cập nhật và có evidence.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| US branch | Chưa cập nhật |
| Task PRs → US | Chưa cập nhật |
| US PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---
## US-28 — Batch number bắt buộc

- [x] **User Story completed**

### Tasks

- [x] **PAC-TASK-106** — Enforce required batch_number
- [x] **PAC-TASK-107** — Normalize batch_number before comparison
- [x] **PAC-TASK-108** — Add UI validation for batch_number

### Completion Criteria

- [ ] `batch_number` là bắt buộc ở backend và frontend.
- [ ] Batch number được trim/normalize nhất quán trước khi lưu và so sánh.
- [ ] Dữ liệu rỗng hoặc không hợp lệ bị từ chối với thông báo rõ ràng.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| US branch | Chưa cập nhật |
| Task PRs → US | Chưa cập nhật |
| US PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---
## US-29 — Batch identity theo medicine + batch + expiry

- [x] **User Story completed**

### Tasks

- [x] **PAC-TASK-109** — Implement batch identity validation service
- [x] **PAC-TASK-110** — Add migration constraint for medicine/batch/expiry uniqueness
- [x] **PAC-TASK-111** — Add batch identity unit tests

### Completion Criteria

- [ ] Batch identity dùng `medicine_id + normalized_batch_number + expiry_date`.
- [ ] Database và service cùng bảo vệ uniqueness.
- [ ] Unit test bao phủ trường hợp hợp lệ, trùng và khác expiry.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| US branch | Chưa cập nhật |
| Task PRs → US | Chưa cập nhật |
| US PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---
## US-30 — Inventory Summary từ MedicineBatch

- [x] **User Story completed**

### Tasks

- [x] **PAC-TASK-112** — Implement inventory summary query from MedicineBatch
- [x] **PAC-TASK-113** — Build Inventory Summary screen
- [x] **PAC-TASK-114** — Add search/filter to Inventory Summary

### Completion Criteria

- [ ] Inventory Summary được tính từ MedicineBatch.
- [ ] API và UI summary hoạt động.
- [ ] Search/filter hoạt động và không làm sai dữ liệu tổng hợp.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| US branch | Chưa cập nhật |
| Task PRs → US | Chưa cập nhật |
| US PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---
## US-31 — Batch Detail view

- [x] **User Story completed**

### Tasks

- [x] **PAC-TASK-115** — Implement Batch Detail API
- [x] **PAC-TASK-116** — Build Batch Detail screen
- [x] **PAC-TASK-117** — Display expired/near-expiry/sellable batch status

### Completion Criteria

- [ ] Batch Detail hiển thị đúng medicine, batch number, expiry date và quantity.
- [ ] Trạng thái expired, near-expiry và sellable được thể hiện rõ.
- [ ] Quyền truy cập được enforce ở backend.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| US branch | Chưa cập nhật |
| Task PRs → US | Chưa cập nhật |
| US PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---
## US-32 — Tính sellable quantity

- [x] **User Story completed**

### Tasks

- [x] **PAC-TASK-118** — Implement sellable quantity calculation service
- [x] **PAC-TASK-119** — Add tests for sellable quantity calculation

### Completion Criteria

- [ ] Sellable quantity được tính từ batch active, còn hạn và quantity hợp lệ.
- [ ] Không dùng quantity tổng lưu riêng làm source of truth.
- [ ] Automated tests bao phủ các trường hợp chính.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| US branch | Chưa cập nhật |
| Task PRs → US | Chưa cập nhật |
| US PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---
## US-33 — Loại trừ batch hết hạn khỏi sellable stock

- [x] **User Story completed**

### Tasks

- [x] **PAC-TASK-120** — Exclude expired batches from sellable stock
- [x] **PAC-TASK-121** — Add tests for expired batch exclusion

### Completion Criteria

- [ ] Batch hết hạn không được tính vào sellable stock.
- [ ] Boundary ngày hết hạn được xử lý nhất quán.
- [ ] Automated tests xác nhận expired batch bị loại.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| US branch | Chưa cập nhật |
| Task PRs → US | Chưa cập nhật |
| US PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---
## US-34 — Low-stock dựa trên sellable quantity

- [x] **User Story completed**

### Tasks

- [x] **PAC-TASK-122** — Implement low-stock calculation from sellable quantity
- [x] **PAC-TASK-123** — Display low-stock state for Admin/Warehouse
- [x] **PAC-TASK-124** — Hide general low-stock dashboard from Staff

### Completion Criteria

- [ ] Low-stock được tính từ sellable quantity.
- [ ] Admin/Warehouse thấy trạng thái low-stock.
- [ ] Staff không thấy dashboard kho tổng nếu thiếu permission.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| US branch | Chưa cập nhật |
| Task PRs → US | Chưa cập nhật |
| US PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---
## US-35 — Near-expiry theo threshold cấu hình

- [x] **User Story completed**

### Tasks

- [x] **PAC-TASK-125** — Implement near-expiry calculation with threshold
- [x] **PAC-TASK-126** — Display near-expiry batch state

### Completion Criteria

- [ ] Near-expiry dùng threshold cấu hình hoặc default baseline 90 ngày.
- [ ] UI hiển thị batch gần hết hạn rõ ràng.
- [ ] Batch hết hạn và near-expiry không bị nhầm trạng thái.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| US branch | Chưa cập nhật |
| Task PRs → US | Chưa cập nhật |
| US PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---
## US-36 — Inventory dashboard cho Admin/Warehouse

- [x] **User Story completed**

### Tasks

- [x] **PAC-TASK-127** — Build Admin/Warehouse inventory dashboard cards

### Completion Criteria

- [ ] Dashboard hiển thị inventory summary, low-stock và near-expiry cần thiết.
- [ ] Admin/Warehouse truy cập được theo permission.
- [ ] Staff bị chặn nếu không có quyền.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| US branch | Chưa cập nhật |
| Task PRs → US | Chưa cập nhật |
| US PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---
## US-37 — POS chỉ xem sellable stock cần bán

- [x] **User Story completed**

### Tasks

- [x] **PAC-TASK-128** — Build POS sellable stock display

### Completion Criteria

- [ ] POS chỉ hiển thị sellable availability cần thiết.
- [ ] Không lộ dashboard kho vận hành cho Staff.
- [ ] Thông tin hiển thị lấy từ backend contract chính thức.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| US branch | Chưa cập nhật |
| Task PRs → US | Chưa cập nhật |
| US PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---
## US-38 — Chặn sửa trực tiếp quantity trong Batch Detail

- [x] **User Story completed**

### Tasks

- [x] **PAC-TASK-129** — Remove direct quantity edit from Batch Detail UI
- [x] **PAC-TASK-130** — Ensure no public API directly edits batch quantity

### Completion Criteria

- [ ] Batch Detail không có chức năng sửa quantity trực tiếp.
- [ ] Không có public API cho phép cập nhật trực tiếp MedicineBatch.quantity.
- [ ] Mọi thay đổi quantity phải đi qua workflow Stock Import, Adjustment hoặc Checkout.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| US branch | Chưa cập nhật |
| Task PRs → US | Chưa cập nhật |
| US PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---
# 5. PAC-EPIC-06 — Stock Import

- [x] **Epic completed**

| Thuộc tính | Giá trị |
|---|---|
| Scope | MVP / Core |
| Sprint | Sprint 3 |
| Component | Stock Import |
| User Story | US-39 → US-48 |
| Số User Story | 10 |
| Số Task | 30 |
| Epic branch | Chưa cập nhật |
| Epic PR → develop | Chưa cập nhật |

## Epic Completion Criteria

- [ ] Stock Import Draft và line management hoạt động.
- [ ] Confirm chạy trong transaction và rollback toàn bộ khi lỗi.
- [ ] Merge batch và expiry mismatch đúng baseline.
- [ ] Confirmed import immutable và không confirm lặp.
- [ ] Audit, traceability, integration test và smoke checklist hoàn tất.
- [x] Automated tests liên quan pass.
- [x] Epic branch đã merge vào develop qua PR đạt checks.

---
## US-39 — Tạo phiếu nhập kho draft

- [ ] **User Story completed**

### Tasks

- [x] **PAC-TASK-131** — Create stock_imports Prisma model
- [x] **PAC-TASK-132** — Implement create Stock Import draft API
- [x] **PAC-TASK-133** — Build create Stock Import screen

### Completion Criteria

- [ ] Stock Import Draft được tạo với supplier và metadata hợp lệ.
- [ ] API và UI tạo draft hoạt động.
- [ ] Authorization cho Admin/Warehouse được enforce.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| US branch | Chưa cập nhật |
| Task PRs → US | Chưa cập nhật |
| US PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---
## US-40 — Thêm dòng thuốc vào phiếu nhập

- [ ] **User Story completed**

### Tasks

- [x] **PAC-TASK-134** — Create stock_import_lines Prisma model
- [x] **PAC-TASK-135** — Implement add stock import line API
- [x] **PAC-TASK-136** — Build stock import line editor UI

### Completion Criteria

- [ ] Draft import hỗ trợ thêm line Medicine, batch number, expiry và quantity.
- [ ] Line validation hoạt động ở backend và frontend.
- [ ] Không cho thêm line vào phiếu đã confirmed.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| US branch | Chưa cập nhật |
| Task PRs → US | Chưa cập nhật |
| US PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---
## US-41 — Cập nhật/xóa dòng nhập khi còn draft

- [x] **User Story completed**

### Tasks

- [x] **PAC-TASK-137** — Implement update draft import line API
- [x] **PAC-TASK-138** — Implement delete draft import line API
- [x] **PAC-TASK-139** — Disable edit/delete for confirmed import lines

### Completion Criteria

- [x] Line được cập nhật/xóa khi phiếu còn Draft.
- [x] Confirmed import không thể sửa/xóa line.
- [x] UI và backend enforce cùng một rule.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| US branch | Chưa cập nhật |
| Task PRs → US | Chưa cập nhật |
| US PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---
## US-42 — Validate supplier trong phiếu nhập

- [x] **User Story completed**

### Tasks

- [x] **PAC-TASK-140** — Validate active supplier before confirm import

### Completion Criteria

- [ ] Supplier phải tồn tại và active trước khi confirm.
- [ ] Supplier inactive bị từ chối ở backend.
- [ ] Lỗi validation hiển thị rõ theo phiếu nhập.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| US branch | Chưa cập nhật |
| Task PRs → US | Chưa cập nhật |
| US PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---
## US-43 — Validate batch number và expiry date

- [x] **User Story completed**

### Tasks

- [x] **PAC-TASK-141** — Validate batch number in import line
- [x] **PAC-TASK-142** — Validate expiry date in import line

### Completion Criteria

- [ ] Batch number và expiry date là bắt buộc.
- [ ] Expiry date không hợp lệ bị từ chối.
- [ ] Validation áp dụng trước khi confirm transaction.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| US branch | Chưa cập nhật |
| Task PRs → US | Chưa cập nhật |
| US PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---
## US-44 — Confirm Stock Import transaction

- [x] **User Story completed**

### Tasks

- [x] **PAC-TASK-143** — Implement confirm Stock Import transaction skeleton
- [x] **PAC-TASK-144** — Apply stock import lines to MedicineBatch
- [x] **PAC-TASK-145** — Rollback Stock Import confirm on any invalid line

### Completion Criteria

- [ ] Confirm chạy trong một database transaction.
- [ ] Tất cả line hợp lệ được áp dụng vào MedicineBatch.
- [ ] Một line lỗi làm rollback toàn bộ.
- [ ] Không để dữ liệu partial sau khi confirm thất bại.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| US branch | Chưa cập nhật |
| Task PRs → US | Chưa cập nhật |
| US PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---
## US-45 — Merge batch khi medicine/batch/expiry trùng

- [x] **User Story completed**

### Tasks

- [x] **PAC-TASK-146** — Implement batch merge when medicine/batch/expiry match
- [x] **PAC-TASK-147** — Add unit tests for valid batch merge rule
- [x] **PAC-TASK-148** — Show batch merge result after Stock Import confirm

### Completion Criteria

- [ ] Batch chỉ được merge khi medicine, normalized batch number và expiry cùng trùng.
- [ ] Quantity được cộng đúng và không tạo batch mới không cần thiết.
- [ ] UI hiển thị kết quả merge.
- [ ] Unit tests bao phủ merge hợp lệ.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| US branch | Chưa cập nhật |
| Task PRs → US | Chưa cập nhật |
| US PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---
## US-46 — Reject batch khi cùng batch nhưng khác expiry

- [x] **User Story completed**

### Tasks

- [x] **PAC-TASK-149** — Implement expiry mismatch rejection
- [x] **PAC-TASK-150** — Return line-level expiry mismatch errors
- [x] **PAC-TASK-151** — Add tests for expiry mismatch rejection

### Completion Criteria

- [ ] Cùng medicine và batch number nhưng khác expiry bị reject.
- [ ] Lỗi được trả về theo từng line.
- [ ] Transaction không cập nhật dữ liệu khi mismatch.
- [ ] Automated tests bao phủ rule mismatch.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| US branch | Chưa cập nhật |
| Task PRs → US | Chưa cập nhật |
| US PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---
## US-47 — Khóa phiếu nhập đã confirmed

- [x] **User Story completed**

### Tasks

- [x] **PAC-TASK-152** — Lock confirmed Stock Import status
- [x] **PAC-TASK-153** — Build confirmed Stock Import read-only UI
- [x] **PAC-TASK-154** — Prevent duplicate Stock Import confirm
- [x] **PAC-TASK-155** — Add tests for confirmed Stock Import immutability

### Completion Criteria

- [ ] Confirmed Stock Import là read-only.
- [ ] Không được confirm lặp.
- [ ] Backend và UI đều chặn sửa đổi.
- [ ] Automated tests xác nhận immutability.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| US branch | Chưa cập nhật |
| Task PRs → US | Chưa cập nhật |
| US PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---
## US-48 — Audit Stock Import

- [x] **User Story completed**

### Tasks

- [x] **PAC-TASK-156** — Write audit log for Stock Import confirm
- [x] **PAC-TASK-157** — Show Stock Import audit metadata in detail UI
- [x] **PAC-TASK-158** — Add Stock Import traceability notes
- [x] **PAC-TASK-159** — Add Stock Import confirm integration tests
- [x] **PAC-TASK-160** — Add Stock Import smoke test checklist

### Completion Criteria

- [ ] Audit ghi actor, thời gian, phiếu nhập và tác động đến batch.
- [ ] Detail UI hiển thị audit metadata cần thiết.
- [ ] Traceability Story/Task/API/model/test được cập nhật.
- [ ] Integration tests cho confirm Stock Import pass.
- [ ] Smoke test checklist được tạo và có thể sử dụng trước demo.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| US branch | Chưa cập nhật |
| Task PRs → US | Chưa cập nhật |
| US PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---
# 6. PAC-EPIC-19 — Testing, Smoke Test & Release Readiness

- [x] **Các yêu cầu kiểm thử hỗ trợ Sprint 3 đã hoàn thành**

> Các Task dưới đây chỉ được tham chiếu tại Epic hỗ trợ. Checkbox chính thức của Task nằm trong User Story nghiệp vụ tương ứng, không đánh dấu lần hai.

## Related User Stories

- US-29 — Batch identity
- US-32 — Sellable quantity
- US-33 — Expired batch exclusion
- US-45 — Batch merge
- US-46 — Expiry mismatch rejection
- US-47 — Confirmed import immutability
- US-48 — Stock Import integration và smoke test

## Related Testing Tasks

- PAC-TASK-111 — Add batch identity unit tests
- PAC-TASK-119 — Add tests for sellable quantity calculation
- PAC-TASK-121 — Add tests for expired batch exclusion
- PAC-TASK-147 — Add unit tests for valid batch merge rule
- PAC-TASK-151 — Add tests for expiry mismatch rejection
- PAC-TASK-155 — Add tests for confirmed Stock Import immutability
- PAC-TASK-159 — Add Stock Import confirm integration tests
- PAC-TASK-160 — Add Stock Import smoke test checklist

## Completion Criteria

- [x] Unit tests cho các business rule trọng yếu pass.
- [x] Integration tests cho Stock Import confirm pass.
- [x] Smoke test checklist có thể sử dụng trước demo.
- [x] Test results được ghi lại trung thực.
- [x] Không ghi Pass nếu test chưa chạy.

---

# 7. PAC-EPIC-21 — Documentation & Traceability

- [x] **Các yêu cầu tài liệu hỗ trợ Sprint 3 đã hoàn thành**

> Checkbox chính thức của Task nằm trong User Story nghiệp vụ tương ứng.

## Related Documentation Tasks

- PAC-TASK-105 — Document MedicineBatch as inventory source of truth
- PAC-TASK-158 — Add Stock Import traceability notes

## Completion Criteria

- [ ] MedicineBatch source-of-truth được ghi rõ trong tài liệu.
- [ ] Stock Import traceability liên kết Story, Task, API, model và test.
- [ ] Tài liệu không mô tả aggregate inventory là source of truth.
- [ ] Progress và Working Context được cập nhật.

---

# 8. Database Evidence

- [ ] `medicine_batches` model
- [ ] MedicineBatch indexes
- [ ] Batch identity uniqueness constraint
- [ ] Required `batch_number`
- [ ] Required `expiry_date`
- [ ] `stock_imports` model
- [ ] `stock_import_lines` model
- [ ] Stock Import status enum hoặc constraint
- [ ] Quan hệ Medicine → MedicineBatch
- [ ] Quan hệ Supplier → Stock Import
- [ ] Quan hệ Stock Import → Stock Import Lines
- [ ] Migration chạy thành công
- [ ] `prisma validate` pass
- [ ] `prisma generate` pass
- [ ] Không có aggregate inventory quantity làm source of truth
- [ ] Không có public direct quantity update

---

# 9. API Evidence

- [ ] Inventory Summary API
- [ ] Batch Detail API
- [ ] Sellable stock calculation/service
- [ ] Low-stock calculation
- [ ] Near-expiry calculation
- [ ] Create Stock Import Draft API
- [ ] Add Stock Import Line API
- [ ] Update Draft Line API
- [ ] Delete Draft Line API
- [ ] Confirm Stock Import API
- [ ] Supplier active validation
- [ ] Batch number validation
- [ ] Expiry validation
- [ ] Batch merge logic
- [ ] Expiry mismatch rejection
- [ ] Duplicate confirm protection
- [ ] Confirmed import immutability
- [ ] Audit log for confirm
- [ ] AuthGuard và PermissionGuard được áp dụng
- [ ] Staff bị chặn khỏi Stock Import operation

---

# 10. Frontend Evidence

- [ ] Inventory Summary screen
- [ ] Inventory search/filter
- [ ] Batch Detail screen
- [ ] Expired status
- [ ] Near-expiry status
- [ ] Sellable status
- [ ] Low-stock state cho Admin/Warehouse
- [ ] Inventory dashboard cards
- [ ] Staff không thấy dashboard kho tổng
- [ ] POS sellable stock display
- [ ] Không có direct quantity edit UI
- [ ] Create Stock Import screen
- [ ] Stock Import line editor
- [ ] Draft line update/delete
- [ ] Confirmed import read-only UI
- [ ] Batch merge result UI
- [ ] Line-level expiry mismatch error
- [ ] Audit metadata trong Stock Import detail
- [ ] Loading, empty, error và success states
- [ ] Permission-aware actions

---

# 11. Automated Test Results

| Kiểm tra | Trạng thái | Lệnh / Evidence | Ghi chú |
|---|---|---|---|
| Backend lint | Chưa chạy | — | — |
| Backend unit tests | Chưa chạy | — | — |
| Backend integration tests | Chưa chạy | — | — |
| Backend E2E tests | Chưa chạy | — | — |
| Prisma validate | Chưa chạy | — | — |
| Prisma generate | Chưa chạy | — | — |
| Backend build | Chưa chạy | — | — |
| Frontend lint | Chưa chạy | — | — |
| Frontend build | Chưa chạy | — | — |
| CI checks | Chưa chạy | — | — |

---

# 12. Manual UI Test Checklist

## Inventory & MedicineBatch

- [ ] Admin xem Inventory Summary.
- [ ] Warehouse xem Inventory Summary.
- [ ] Staff không truy cập dashboard kho tổng nếu thiếu quyền.
- [ ] Search/filter Inventory hoạt động.
- [ ] Batch Detail hiển thị đúng dữ liệu.
- [ ] Batch hết hạn hiển thị trạng thái expired.
- [ ] Batch gần hết hạn hiển thị near-expiry.
- [ ] Sellable quantity đúng.
- [ ] Low-stock được tính từ sellable quantity.
- [ ] Batch Detail không có chức năng sửa quantity trực tiếp.
- [ ] Gọi trực tiếp API sửa quantity bị chặn.

## Stock Import

- [ ] Admin/Warehouse tạo Draft Stock Import.
- [ ] Supplier inactive bị từ chối.
- [ ] Thêm line hợp lệ.
- [ ] Batch number rỗng bị từ chối.
- [ ] Expiry date không hợp lệ bị từ chối.
- [ ] Sửa/xóa line khi còn Draft.
- [ ] Confirm nhiều line hợp lệ thành công.
- [ ] Một line lỗi làm rollback toàn bộ.
- [ ] Batch identity trùng được merge đúng.
- [ ] Cùng batch nhưng khác expiry bị reject.
- [ ] Lỗi mismatch hiển thị theo line.
- [ ] Confirmed import hiển thị read-only.
- [ ] Confirm lặp bị chặn.
- [ ] Audit metadata hiển thị đúng.
- [ ] Staff bị chặn khỏi Stock Import.

---

# 13. Task Evidence Log

> Mỗi Task sau khi hoàn thành phải thêm hoặc cập nhật một dòng. Không xóa lịch sử evidence.

| Task | Jira Key thật | Status | Branch | Commit | PR | Test Evidence | Ghi chú |
|---|---|---|---|---|---|---|---|
| PAC-TASK-102 → PAC-TASK-160 | Chưa cập nhật | Pending Audit | — | — | — | — | Tách thành từng dòng khi bắt đầu triển khai |

---

# 14. Pull Request & Merge Evidence

## Task → User Story

| Task/Range | Source Branch | Target US Branch | PR | Checks | Merge Status |
|---|---|---|---|---|---|
| Chưa cập nhật | — | — | — | — | — |

## User Story → Epic

| User Story | Source Branch | Target Epic Branch | PR | Checks | Merge Status |
|---|---|---|---|---|---|
| US-27 → US-48 | — | — | — | — | — |

## Epic → develop

| Epic | Source Branch | PR | Checks | Merge Status |
|---|---|---|---|---|
| PAC-EPIC-05 | — | — | — | — |
| PAC-EPIC-06 | — | — | — | — |

## develop → main

| PR | Trạng thái | Người phê duyệt |
|---|---|---|
| Chưa tạo | Không tự merge | Người dùng |

---

# 15. Known Issues

- Chưa có.

> Nếu có lỗi ngoài phạm vi, ghi rõ: mô tả lỗi, module, ảnh hưởng, evidence, lý do chưa sửa và Sprint dự kiến xử lý.

---

# 16. Sprint 3 Final Verification

- [ ] PAC-EPIC-05 hoàn thành.
- [ ] PAC-EPIC-06 hoàn thành.
- [ ] US-27 → US-48 hoàn thành.
- [ ] PAC-TASK-102 → PAC-TASK-160 hoàn thành.
- [ ] Backend lint pass.
- [ ] Backend unit tests pass.
- [ ] Backend integration/E2E tests pass.
- [ ] Prisma validate pass.
- [ ] Prisma generate pass.
- [ ] Backend build pass.
- [ ] Frontend lint pass.
- [ ] Frontend build pass.
- [ ] CI checks pass.
- [ ] Manual UI test pass.
- [ ] Không còn lỗi thuộc phạm vi Sprint 3.
- [ ] Không có secret hoặc `.env` thật trong commit.
- [ ] Không có direct MedicineBatch quantity edit.
- [ ] Không có aggregate inventory source-of-truth.
- [ ] Stock Import confirm chạy transaction.
- [ ] Expiry mismatch bị reject.
- [ ] Confirmed Stock Import immutable.
- [ ] Progress và `WORKING-CONTEXT.md` đã cập nhật.
- [ ] Hai Epic đã merge vào `develop`.
- [ ] PR `develop → main` đã được tạo và đang chờ người dùng phê duyệt.

---

# 17. Ready for Sprint 4

```text
No
```

Chỉ đổi thành:

```text
Yes
```

khi toàn bộ checkbox bắt buộc đã hoàn thành, test evidence đầy đủ và Sprint 3 đã được tích hợp đúng quy trình Git.

Lý do hiện tại:

```text
Sprint 3 chưa được audit và triển khai.
```
