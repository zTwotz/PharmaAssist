# SPRINT 2 — MEDICINE, ACTIVEINGREDIENT & SUPPLIER

## 1. Mục đích tài liệu

Tài liệu `sprint-2.md` mô tả đầy đủ phạm vi công việc của **Sprint 2 — Medicine, ActiveIngredient & Supplier** trong dự án **PharmaAssist AI Intelligence**.

Tài liệu được dùng để:

1. Xác định chính xác số lượng Epic, User Story và Task thuộc Sprint 2.
2. Thể hiện quan hệ phân rã `Epic → User Story → Task`.
3. Mô tả mục tiêu và kết quả phải đạt của từng Epic.
4. Mô tả nội dung nghiệp vụ và điều kiện hoàn thành của từng User Story.
5. Mô tả công việc và đầu ra bắt buộc của từng Task.
6. Làm nguồn cho AI Coding Agent, Jira, Pull Request, kiểm thử và theo dõi tiến độ.
7. Ngăn việc triển khai lệch baseline như dùng `product_variant_id` thay `medicine_id`, dùng chuỗi hoạt chất thô làm dữ liệu chính thức hoặc xóa cứng Medicine/Supplier.

---

## 2. Tổng quan phạm vi Sprint 2

### 2.1. Thông tin tổng hợp

| Nội dung | Phạm vi | Số lượng |
|---|---:|---:|
| Sprint | Sprint 2 | 1 |
| Epic nghiệp vụ chính | PAC-EPIC-03 → PAC-EPIC-04 | 2 |
| Epic hỗ trợ có Task tham gia | PAC-EPIC-19, PAC-EPIC-21 | 2 |
| User Story | US-13 → US-26 | 14 |
| Task | PAC-TASK-053 → PAC-TASK-101 | 49 |
| Scope | MVP / Core | Bắt buộc |
| Component chính | Medicine & ActiveIngredient; Supplier | 2 |

### 2.2. Các Epic tham gia

#### Epic nghiệp vụ chính

1. **PAC-EPIC-03 — Medicine & ActiveIngredient**
2. **PAC-EPIC-04 — Supplier Management**

#### Epic hỗ trợ

3. **PAC-EPIC-19 — Testing, Smoke Test & Release Readiness**
   - Đóng góp `PAC-TASK-071` cho kiểm thử rule giá bán thuốc.
4. **PAC-EPIC-21 — Documentation & Traceability**
   - Đóng góp `PAC-TASK-086` cho checklist chất lượng dữ liệu hoạt chất.

> Ghi chú: `US-17` vẫn thuộc PAC-EPIC-03 nhưng Task kiểm thử `PAC-TASK-071` được quản lý dưới PAC-EPIC-19. Tương tự, `US-21` thuộc PAC-EPIC-03 nhưng Task tài liệu `PAC-TASK-086` thuộc PAC-EPIC-21.

### 2.3. Mục tiêu tổng thể Sprint 2

Sprint 2 phải xây dựng được lớp dữ liệu nghiệp vụ nền cho:

- Thuốc (`Medicine`).
- Hoạt chất (`ActiveIngredient`).
- Quan hệ thuốc – hoạt chất (`Medicine–ActiveIngredient Mapping`).
- Nhà cung cấp (`Supplier`).
- Điểm tích hợp Graph Sync cho Medicine, ActiveIngredient và Mapping.

Sau Sprint 2, hệ thống phải có dữ liệu chuẩn để tiếp tục:

- Sprint 3: MedicineBatch, tồn kho và Stock Import.
- Sprint 4: POS Draft Order.
- Sprint 5: DrugInteraction Rule và InteractionAlert.
- Sprint 8: Graph Sync và Neo4j Projection.

---

## 3. Baseline và nguyên tắc bắt buộc

### 3.1. Medicine

1. `Medicine` là thực thể nghiệp vụ thuốc chính của MVP.
2. MVP sử dụng `medicine_id` làm khóa nghiệp vụ cho tồn kho và bán hàng.
3. Không thay thế `medicine_id` bằng `product_variant_id` trong luồng MVP.
4. Mã thuốc phải duy nhất.
5. `selling_price` phải lớn hơn `0`.
6. Không xóa cứng Medicine đã có dữ liệu liên quan.
7. Medicine ngừng sử dụng phải được chuyển sang trạng thái inactive.
8. Medicine inactive không được dùng cho giao dịch bán mới.

### 3.2. ActiveIngredient và Mapping

1. Drug Interaction chính thức được xây dựng ở cấp `ActiveIngredient–ActiveIngredient`.
2. Một Medicine có thể có nhiều ActiveIngredient.
3. Một ActiveIngredient có thể thuộc nhiều Medicine.
4. Không được tạo mapping trùng giữa cùng một Medicine và ActiveIngredient.
5. Tên hoạt chất phải được chuẩn hóa để tránh trùng dữ liệu.
6. Không dùng chuỗi hoạt chất thô từ dữ liệu crawl làm official mapping.
7. Dữ liệu thô phải qua review và normalize trước khi trở thành ActiveIngredient chính thức.

### 3.3. Supplier

1. Supplier được dùng để xác định nguồn cung trong Stock Import.
2. Warehouse có thể xem, tạo và cập nhật Supplier nếu có permission.
3. Chỉ Admin được deactivate Supplier.
4. Supplier không bị xóa cứng nếu đã liên kết dữ liệu nhập kho.
5. Supplier inactive không được chọn cho Stock Import mới.
6. Lịch sử Stock Import cũ vẫn phải giữ được Supplier đã dùng.

### 3.4. Graph Sync

1. PostgreSQL là source of truth.
2. Khi Medicine, ActiveIngredient hoặc Mapping thay đổi, hệ thống chuẩn bị Graph Sync event/outbox.
3. Controller không ghi trực tiếp vào Neo4j.
4. Sprint 2 chỉ chuẩn bị event/integration point.
5. Worker, retry, Neo4j projection và freshness detection đầy đủ thuộc Sprint 8.

### 3.5. Authorization

Sprint 2 phải tái sử dụng nền tảng Sprint 1:

- Supabase Auth.
- `JwtAuthGuard`.
- `PermissionsGuard`.
- `@RequirePermissions()`.
- Permission-aware frontend UI.
- 401 cho session không hợp lệ.
- 403 cho user không đủ quyền.

---

## 4. Bảng phân nhóm Epic → User Story → Task

| Epic | User Story | Task |
|---|---|---|
| PAC-EPIC-03 | US-13 — Thêm thuốc mới | PAC-TASK-053 → PAC-TASK-057 |
| PAC-EPIC-03 | US-14 — Cập nhật thông tin thuốc | PAC-TASK-058 → PAC-TASK-060 |
| PAC-EPIC-03 | US-15 — Tìm kiếm và lọc thuốc | PAC-TASK-061 → PAC-TASK-065 |
| PAC-EPIC-03 | US-16 — Deactivate thuốc | PAC-TASK-066 → PAC-TASK-068 |
| PAC-EPIC-03 | US-17 — Validate giá bán thuốc lớn hơn 0 | PAC-TASK-069 → PAC-TASK-071 |
| PAC-EPIC-03 | US-18 — Quản lý ActiveIngredient | PAC-TASK-072 → PAC-TASK-077 |
| PAC-EPIC-03 | US-19 — Mapping Medicine với ActiveIngredient | PAC-TASK-078 → PAC-TASK-081 |
| PAC-EPIC-03 | US-20 — Validate mapping hoạt chất không trùng | PAC-TASK-082 → PAC-TASK-083 |
| PAC-EPIC-03 | US-21 — Chuẩn hóa dữ liệu hoạt chất | PAC-TASK-084 → PAC-TASK-086 |
| PAC-EPIC-03 | US-22 — Trigger Graph Sync khi Medicine/Ingredient thay đổi | PAC-TASK-087 → PAC-TASK-089 |
| PAC-EPIC-04 | US-23 — Tạo nhà cung cấp | PAC-TASK-090 → PAC-TASK-093 |
| PAC-EPIC-04 | US-24 — Cập nhật và tìm kiếm nhà cung cấp | PAC-TASK-094 → PAC-TASK-096 |
| PAC-EPIC-04 | US-25 — Admin deactivate nhà cung cấp | PAC-TASK-097 → PAC-TASK-099 |
| PAC-EPIC-04 | US-26 — Liên kết Supplier với Stock Import | PAC-TASK-100 → PAC-TASK-101 |

---

# 5. PAC-EPIC-03 — MEDICINE & ACTIVEINGREDIENT

## 5.1. Mục tiêu Epic

Xây dựng toàn bộ dữ liệu và chức năng nền liên quan đến thuốc, hoạt chất và mapping thuốc–hoạt chất để phục vụ Inventory, POS, InteractionAlert, AI và Knowledge Graph.

## 5.2. Kết quả cần đạt của Epic

Epic được xem là hoàn thành khi:

1. Có model Medicine ổn định trong Prisma và database.
2. Medicine CRUD hoạt động qua API và UI.
3. Danh sách Medicine hỗ trợ pagination, search và filter.
4. Mã Medicine không trùng.
5. Giá bán được enforce lớn hơn 0 ở backend và frontend.
6. Medicine được soft deactivate thay vì xóa cứng.
7. Medicine inactive không dùng cho giao dịch bán mới.
8. Có model và màn hình quản lý ActiveIngredient.
9. Tên ActiveIngredient được normalize và chống trùng.
10. Mapping Medicine–ActiveIngredient hoạt động và không trùng.
11. Không dùng raw scraped string làm official mapping.
12. Có integration point cho Graph Sync khi dữ liệu thay đổi.
13. API được bảo vệ bằng AuthGuard và PermissionsGuard.
14. Các validation quan trọng có test.

---

## 5.3. US-13 — Thêm thuốc mới

### Mục tiêu User Story

Cho phép người dùng có quyền tạo một Medicine mới với dữ liệu hợp lệ, mã thuốc duy nhất và giá bán lớn hơn 0.

### Kết quả cần đạt

- Medicine được lưu trong PostgreSQL.
- Có Prisma model và migration hợp lệ.
- Có API tạo Medicine.
- Có form tạo Medicine trên frontend.
- UI có loading, success và error state.
- Medicine mới xuất hiện trong danh sách sau khi tạo.

### Task thuộc US-13

#### PAC-TASK-053 — Create medicines Prisma model

**Nội dung công việc**

- Tạo hoặc hoàn thiện Prisma model `Medicine`.
- Xác định các field cốt lõi như `id`, `code`, `name`, `unit`, `dosage_form`, `selling_price`, `is_active`, `created_at`, `updated_at`.
- Chuẩn bị quan hệ với MedicineBatch và Medicine–ActiveIngredient mapping.
- Tạo migration tương ứng.
- Đảm bảo MVP tiếp tục dùng `medicine_id` làm business key.

**Kết quả cần đạt**

- Database có cấu trúc Medicine rõ ràng.
- Prisma validate và generate thành công.
- Model sẵn sàng cho Inventory, POS, Interaction và Graph Sync.
- Không đưa `product_variant_id` vào làm sales key của MVP.

#### PAC-TASK-054 — Add medicine code uniqueness constraint

**Nội dung công việc**

- Thêm unique constraint/index cho mã Medicine.
- Chuẩn hóa code trước khi lưu nếu cần.
- Xử lý lỗi duplicate ở service/API.
- Map lỗi database thành thông báo nghiệp vụ dễ hiểu.

**Kết quả cần đạt**

- Không tồn tại hai Medicine có cùng code.
- API trả lỗi rõ khi code trùng.
- UI có thể hiển thị đúng lỗi duplicate.

#### PAC-TASK-055 — Implement POST /medicines API

**Nội dung công việc**

- Tạo endpoint `POST /medicines`.
- Áp dụng AuthGuard và permission tạo Medicine.
- Validate field bắt buộc.
- Validate code và selling price.
- Lưu Medicine và trả dữ liệu vừa tạo.

**Kết quả cần đạt**

- Người có quyền tạo Medicine thành công.
- Người không có quyền nhận 403.
- Dữ liệu không hợp lệ nhận 400.
- API không tạo Medicine trùng code.

#### PAC-TASK-056 — Build medicine create form

**Nội dung công việc**

- Tạo form nhập code, name, unit, dosage form và selling price.
- Thêm validation frontend.
- Gọi `POST /medicines`.
- Hiển thị lỗi tại field phù hợp.
- Chỉ hiển thị action tạo nếu user có permission.

**Kết quả cần đạt**

- Người dùng có quyền tạo Medicine từ UI.
- Dữ liệu gửi đúng API contract.
- Form chặn các trường bắt buộc bị rỗng.
- Medicine mới xuất hiện trong danh sách sau khi tạo.

#### PAC-TASK-057 — Add medicine create success/error UI state

**Nội dung công việc**

- Hiển thị loading khi submit.
- Disable submit để tránh double-submit.
- Hiển thị success message.
- Hiển thị lỗi validation, duplicate hoặc lỗi hệ thống.
- Reset form hoặc chuyển về danh sách theo UX đã chọn.

**Kết quả cần đạt**

- User biết rõ request đang xử lý, thành công hay thất bại.
- Không tạo Medicine trùng do nhấn nút nhiều lần.
- UI không crash khi API lỗi.

### Điều kiện hoàn thành US-13

- Model, migration, API và UI tạo Medicine đều hoạt động.
- Code unique được enforce.
- Permission được enforce ở backend.
- Các trạng thái UI cơ bản hoàn chỉnh.

---

## 5.4. US-14 — Cập nhật thông tin thuốc

### Mục tiêu User Story

Cho phép người dùng có quyền cập nhật thông tin Medicine hiện có mà không làm mất dữ liệu hoặc phá vỡ các ràng buộc nghiệp vụ.

### Kết quả cần đạt

- Có API cập nhật Medicine.
- Có form edit load đúng dữ liệu hiện tại.
- Validation update nhất quán với create.
- Không cập nhật Medicine không tồn tại.
- Không cho code trùng hoặc giá không hợp lệ.

### Task thuộc US-14

#### PAC-TASK-058 — Implement PATCH /medicines/{id} API

**Nội dung công việc**

- Tạo endpoint `PATCH /medicines/{id}`.
- Kiểm tra Medicine tồn tại.
- Áp dụng permission update Medicine.
- Validate các field được phép sửa.
- Lưu và trả Medicine sau cập nhật.

**Kết quả cần đạt**

- Update Medicine thành công với dữ liệu hợp lệ.
- Medicine không tồn tại trả 404.
- User thiếu quyền nhận 403.
- API sẵn sàng phát sinh Graph Sync event ở US-22.

#### PAC-TASK-059 — Build medicine edit form

**Nội dung công việc**

- Load Medicine hiện tại theo id.
- Điền dữ liệu vào form edit.
- Cho phép sửa các field hợp lệ.
- Gọi API update.
- Hiển thị loading, success và error state.

**Kết quả cần đạt**

- User xem được dữ liệu hiện tại trước khi sửa.
- Update thành công phản ánh ngay trên UI.
- Form không mất dữ liệu khi API trả lỗi.

#### PAC-TASK-060 — Add medicine update validation and errors

**Nội dung công việc**

- Validate `selling_price > 0`.
- Validate code không trùng nếu code thay đổi.
- Validate field bắt buộc.
- Chuẩn hóa response 400/404/409 nếu phù hợp.
- Map lỗi backend ra frontend.

**Kết quả cần đạt**

- Không lưu Medicine sai dữ liệu.
- Người dùng nhận được lỗi rõ ràng.
- Create và update dùng cùng chuẩn validation.

### Điều kiện hoàn thành US-14

- API và UI update hoạt động.
- Validation không cho dữ liệu sai.
- Không làm mất quan hệ Medicine hiện có.

---

## 5.5. US-15 — Tìm kiếm và lọc thuốc

### Mục tiêu User Story

Cung cấp danh sách Medicine có pagination, tìm theo code/name và lọc theo các tiêu chí cần thiết.

### Kết quả cần đạt

- API list có pagination.
- Search code/name hoạt động.
- Filter kết hợp được với search và pagination.
- Frontend có bảng danh sách hoàn chỉnh.
- Có loading, empty và error states.

### Task thuộc US-15

#### PAC-TASK-061 — Implement medicine list API with pagination

**Nội dung công việc**

- Tạo hoặc hoàn thiện `GET /medicines`.
- Hỗ trợ `page` và `limit`.
- Trả danh sách, total và metadata phân trang.
- Có sort mặc định ổn định.
- Áp dụng permission xem Medicine.

**Kết quả cần đạt**

- API không trả toàn bộ dữ liệu không kiểm soát.
- Pagination tính đúng total/page.
- Dùng được cho màn hình quản lý và POS search sau này.

#### PAC-TASK-062 — Implement medicine search by code/name

**Nội dung công việc**

- Thêm query `search`.
- Tìm theo code hoặc name.
- Hỗ trợ case-insensitive nếu database cho phép.
- Kết hợp với pagination.
- Trả list rỗng khi không có kết quả.

**Kết quả cần đạt**

- User tìm Medicine nhanh theo code/name.
- Search không phá pagination.
- Keyword không hợp lệ không làm API crash.

#### PAC-TASK-063 — Implement medicine filters

**Nội dung công việc**

- Lọc theo active/inactive.
- Lọc theo dosage form hoặc category nếu schema có hỗ trợ.
- Validate query params.
- Kết hợp filter với search và pagination.

**Kết quả cần đạt**

- Dữ liệu lọc đúng điều kiện.
- Filter không làm sai total.
- API trả response nhất quán.

#### PAC-TASK-064 — Build medicine list table

**Nội dung công việc**

- Hiển thị code, name, unit, dosage form, selling price và status.
- Tích hợp list API.
- Thêm search, filter và pagination control.
- Hiển thị action view/edit/deactivate theo permission.

**Kết quả cần đạt**

- Màn hình danh sách Medicine dễ sử dụng.
- Action đúng quyền.
- Dữ liệu hiển thị đồng bộ với backend.

#### PAC-TASK-065 — Add medicine list empty/loading/error states

**Nội dung công việc**

- Hiển thị skeleton/loading.
- Hiển thị empty state khi chưa có dữ liệu hoặc không có kết quả tìm kiếm.
- Hiển thị lỗi và retry action nếu phù hợp.
- Đảm bảo layout không vỡ.

**Kết quả cần đạt**

- Không có màn hình trắng khi tải hoặc lỗi.
- User hiểu trạng thái danh sách.
- Demo ổn định hơn.

### Điều kiện hoàn thành US-15

- Search, filter và pagination hoạt động đồng thời.
- Danh sách Medicine hiển thị đúng dữ liệu và quyền.
- Các trạng thái UI hoàn chỉnh.

---

## 5.6. US-16 — Deactivate thuốc

### Mục tiêu User Story

Cho phép ngừng sử dụng Medicine bằng soft deactivate, giữ nguyên dữ liệu lịch sử và chặn Medicine inactive khỏi giao dịch mới.

### Kết quả cần đạt

- Có API deactivate.
- Có action deactivate trên UI.
- Không xóa cứng Medicine.
- Medicine inactive không được chọn trong POS hoặc thêm vào order mới.

### Task thuộc US-16

#### PAC-TASK-066 — Implement medicine deactivate API

**Nội dung công việc**

- Tạo endpoint deactivate Medicine.
- Áp dụng permission phù hợp.
- Set `is_active=false`.
- Không xóa record.
- Chuẩn bị Graph Sync event cho trạng thái deactivate.

**Kết quả cần đạt**

- Medicine được chuyển inactive.
- Lịch sử dữ liệu vẫn giữ.
- API không hard delete.
- Người thiếu quyền nhận 403.

#### PAC-TASK-067 — Add deactivate action in medicine UI

**Nội dung công việc**

- Thêm action deactivate trong list/detail.
- Chỉ hiển thị theo permission.
- Hiển thị confirm dialog.
- Gọi API và refresh dữ liệu.

**Kết quả cần đạt**

- User có quyền deactivate an toàn.
- Tránh thao tác nhầm.
- Status được cập nhật đúng trên UI.

#### PAC-TASK-068 — Prevent inactive medicines from POS selection

**Nội dung công việc**

- POS search chỉ trả Medicine active.
- Backend chặn add Medicine inactive vào Draft Order.
- UI không hiển thị Medicine inactive để bán.
- Thêm test hoặc validation evidence.

**Kết quả cần đạt**

- Medicine inactive không được bán mới.
- Gọi API trực tiếp vẫn bị chặn.
- Dữ liệu lịch sử cũ vẫn xem được.

### Điều kiện hoàn thành US-16

- Soft deactivate hoạt động end-to-end.
- Backend là nơi enforce không cho dùng Medicine inactive.

---

## 5.7. US-17 — Validate giá bán thuốc lớn hơn 0

### Mục tiêu User Story

Bảo đảm mọi Medicine dùng trong hệ thống có `selling_price > 0`.

### Kết quả cần đạt

- Backend reject giá bằng 0 hoặc âm.
- Frontend chặn submit giá không hợp lệ.
- Có unit test cho create và update.

### Task thuộc US-17

#### PAC-TASK-069 — Enforce selling_price greater than 0 in backend

**Nội dung công việc**

- Validate `selling_price > 0` trong create service/DTO.
- Validate trong update service/DTO.
- Trả 400 với message rõ ràng.
- Không chỉ dựa vào frontend.

**Kết quả cần đạt**

- Không thể lưu Medicine có giá 0 hoặc âm.
- Rule được enforce ở backend.

#### PAC-TASK-070 — Add selling price validation in UI

**Nội dung công việc**

- Chặn submit nếu giá rỗng, bằng 0 hoặc âm.
- Hiển thị lỗi tại field.
- Format input tiền hợp lý.
- Đồng bộ rule với backend.

**Kết quả cần đạt**

- User nhận phản hồi ngay trên form.
- Giảm request lỗi lên backend.

#### PAC-TASK-071 — Add tests for medicine price validation

**Nội dung công việc**

- Test create với giá hợp lệ.
- Test create với giá 0.
- Test create với giá âm.
- Test update giá về 0 hoặc âm.
- Kiểm tra lỗi trả về.

**Kết quả cần đạt**

- CI bắt được regression của rule giá.
- Test trace được về US-17.

### Điều kiện hoàn thành US-17

- Backend, frontend và test cùng enforce một rule.
- Không có đường API nào cho phép giá không hợp lệ.

---

## 5.8. US-18 — Quản lý ActiveIngredient

### Mục tiêu User Story

Cung cấp model, API và UI để quản lý danh mục hoạt chất chuẩn hóa dùng cho mapping và Drug Interaction.

### Kết quả cần đạt

- Có Prisma model ActiveIngredient.
- Có create/update/list/search API.
- Có màn hình quản lý.
- Tên hoạt chất được validate và chống trùng.

### Task thuộc US-18

#### PAC-TASK-072 — Create active_ingredients Prisma model

**Nội dung công việc**

- Tạo model `ActiveIngredient`.
- Thêm `name`, `normalized_name`, `description`, `is_active` và timestamp.
- Thêm unique constraint cho `normalized_name` nếu phù hợp.
- Tạo migration.
- Chuẩn bị quan hệ với Medicine mapping và Interaction Rule.

**Kết quả cần đạt**

- Database có nguồn dữ liệu hoạt chất chính thức.
- Model hỗ trợ mapping, Interaction và Graph Sync.

#### PAC-TASK-073 — Implement ActiveIngredient create API

**Nội dung công việc**

- Tạo `POST /active-ingredients`.
- Áp dụng AuthGuard và permission.
- Validate tên.
- Normalize trước khi lưu.
- Reject normalized name bị trùng.

**Kết quả cần đạt**

- Tạo ActiveIngredient thành công với dữ liệu hợp lệ.
- Không tạo trùng hoạt chất.

#### PAC-TASK-074 — Implement ActiveIngredient update API

**Nội dung công việc**

- Tạo endpoint update.
- Kiểm tra ActiveIngredient tồn tại.
- Normalize tên mới.
- Reject tên trùng.
- Cập nhật và chuẩn bị Graph Sync event.

**Kết quả cần đạt**

- Update hoạt chất không làm mất mapping.
- Dữ liệu sau update vẫn chuẩn hóa.

#### PAC-TASK-075 — Implement ActiveIngredient list/search API

**Nội dung công việc**

- Tạo `GET /active-ingredients`.
- Hỗ trợ search theo tên.
- Hỗ trợ pagination và filter active/inactive nếu cần.
- Áp dụng permission view.

**Kết quả cần đạt**

- UI và mapping selector lấy được dữ liệu.
- Search hoạt động ổn định.

#### PAC-TASK-076 — Build ActiveIngredient management screen

**Nội dung công việc**

- Hiển thị danh sách hoạt chất.
- Tạo form create/update.
- Thêm search.
- Hiển thị trạng thái.
- Tích hợp API.

**Kết quả cần đạt**

- Admin hoặc user có quyền quản lý ActiveIngredient từ UI.
- Hoạt chất vừa tạo có thể dùng cho mapping.

#### PAC-TASK-077 — Add ActiveIngredient create/edit form validation

**Nội dung công việc**

- Tên là bắt buộc.
- Không chấp nhận chuỗi chỉ có khoảng trắng.
- Hiển thị lỗi trùng tên.
- Disable submit khi invalid.
- Chuẩn hóa input cơ bản.

**Kết quả cần đạt**

- Không tạo dữ liệu rác hoặc trùng.
- UI và backend dùng rule tương thích.

### Điều kiện hoàn thành US-18

- ActiveIngredient CRUD cơ bản hoạt động.
- Dữ liệu đủ sạch để dùng cho mapping và Interaction Rule.

---

## 5.9. US-19 — Mapping Medicine với ActiveIngredient

### Mục tiêu User Story

Cho phép gán một hoặc nhiều ActiveIngredient chuẩn hóa cho Medicine và hiển thị mapping trong chi tiết Medicine.

### Kết quả cần đạt

- Có mapping schema many-to-many.
- Có API cập nhật mapping.
- Có UI chọn nhiều ActiveIngredient.
- Medicine detail hiển thị mapping.

### Task thuộc US-19

#### PAC-TASK-078 — Create medicine_active_ingredients mapping schema

**Nội dung công việc**

- Tạo model/bảng mapping.
- Liên kết `medicine_id` và `active_ingredient_id`.
- Thêm composite unique chống mapping trùng.
- Thêm quan hệ Prisma hai chiều.
- Chuẩn bị Graph Sync event cho mapping.

**Kết quả cần đạt**

- Quan hệ many-to-many hoạt động.
- Không có mapping trùng.
- Interaction service có thể truy vấn hoạt chất theo Medicine.

#### PAC-TASK-079 — Implement Medicine-Ingredient mapping API

**Nội dung công việc**

- Tạo endpoint cập nhật mapping của một Medicine.
- Nhận danh sách ActiveIngredient id.
- Validate Medicine và ActiveIngredient tồn tại.
- Validate ingredient active.
- Replace/update mapping trong transaction.

**Kết quả cần đạt**

- Mapping được cập nhật nguyên tử.
- Không để trạng thái mapping nửa vời.
- API trả mapping mới.

#### PAC-TASK-080 — Build ingredient mapping component in Medicine form

**Nội dung công việc**

- Tạo selector/search ActiveIngredient.
- Cho phép chọn nhiều giá trị.
- Không cho chọn trùng.
- Cho phép remove trước khi lưu.
- Gửi đúng API contract.

**Kết quả cần đạt**

- User gán hoạt chất cho Medicine dễ dàng.
- UI chỉ dùng ActiveIngredient official.

#### PAC-TASK-081 — Show mapped ingredients in medicine detail

**Nội dung công việc**

- Load Medicine detail kèm ActiveIngredient.
- Hiển thị danh sách mapping.
- Có empty state.
- Có action edit theo permission.

**Kết quả cần đạt**

- Người dùng kiểm tra được Medicine chứa hoạt chất nào.
- Dữ liệu sẵn sàng cho demo Interaction và Graph.

### Điều kiện hoàn thành US-19

- Mapping hoạt động end-to-end từ database đến UI.
- Mapping được lưu trong transaction.

---

## 5.10. US-20 — Validate mapping hoạt chất không trùng

### Mục tiêu User Story

Bảo vệ tính toàn vẹn và độ tin cậy của Medicine–ActiveIngredient Mapping.

### Kết quả cần đạt

- Mapping trùng bị chặn ở database, backend và UI.
- Inactive ingredient không được mapping mới nếu baseline không cho phép.

### Task thuộc US-20

#### PAC-TASK-082 — Add unique validation for ingredient mapping

**Nội dung công việc**

- Thêm composite unique constraint.
- Validate duplicate trong service.
- UI không cho chọn trùng.
- Trả lỗi rõ nếu duplicate.
- Thêm test mapping trùng.

**Kết quả cần đạt**

- Không có duplicate mapping.
- Interaction check không sinh cảnh báo lặp vì dữ liệu lỗi.

#### PAC-TASK-083 — Prevent mapping inactive ingredient if not allowed

**Nội dung công việc**

- Kiểm tra `is_active` khi mapping.
- Không hiển thị inactive ingredient trong selector.
- Backend reject request chứa inactive ingredient.
- Thêm test case.

**Kết quả cần đạt**

- Mapping chỉ sử dụng dữ liệu hợp lệ.
- API trực tiếp cũng không bypass được rule.

### Điều kiện hoàn thành US-20

- Database, backend và frontend cùng bảo vệ mapping.

---

## 5.11. US-21 — Chuẩn hóa dữ liệu hoạt chất

### Mục tiêu User Story

Xây dựng cơ chế chuẩn hóa tên và quy trình kiểm soát chất lượng dữ liệu ActiveIngredient.

### Kết quả cần đạt

- Tên ActiveIngredient được normalize nhất quán.
- Raw scraped string không được dùng trực tiếp.
- Có checklist review dữ liệu.

### Task thuộc US-21

#### PAC-TASK-084 — Normalize ActiveIngredient names

**Nội dung công việc**

- Trim khoảng trắng.
- Chuẩn hóa chữ hoa/thường theo quy tắc thống nhất.
- Sinh `normalized_name`.
- So sánh duplicate bằng normalized name.
- Áp dụng cho create và update.

**Kết quả cần đạt**

- Giảm trùng hoạt chất cùng nghĩa.
- Search và mapping chính xác hơn.

#### PAC-TASK-085 — Reject raw scraped ingredient strings in official mapping

**Nội dung công việc**

- Không cho nhập raw ingredient string trực tiếp trong mapping.
- Bắt buộc chọn ActiveIngredient đã chuẩn hóa.
- Dữ liệu crawl phải qua review/normalize.
- Hướng dẫn user tạo ActiveIngredient trước nếu chưa có.
- Ghi guardrail trong code/docs.

**Kết quả cần đạt**

- Official mapping sạch và traceable.
- Interaction và Graph không phụ thuộc dữ liệu text thô.

#### PAC-TASK-086 — Add ActiveIngredient data quality review checklist

**Nội dung công việc**

- Ghi rule đặt tên hoạt chất.
- Ghi rule chống trùng.
- Ghi quy trình tạo ActiveIngredient mới.
- Ghi rule cấm raw scraped string.
- Liên kết checklist với seed/import data.

**Kết quả cần đạt**

- Thành viên và AI Agent nhập dữ liệu nhất quán.
- Seed data dễ review.
- Có evidence tài liệu cho chất lượng dữ liệu.

### Điều kiện hoàn thành US-21

- Có normalization trong code.
- Có guardrail dữ liệu.
- Có checklist review chính thức.

---

## 5.12. US-22 — Trigger Graph Sync khi Medicine/Ingredient thay đổi

### Mục tiêu User Story

Tạo các Graph Sync event/outbox khi dữ liệu nguồn thay đổi, chuẩn bị cho Neo4j projection ở Sprint 8.

### Kết quả cần đạt

- Medicine changes tạo event.
- ActiveIngredient changes tạo event.
- Mapping changes tạo event.
- Không ghi trực tiếp Neo4j từ controller.
- PostgreSQL vẫn là source of truth.

### Task thuộc US-22

#### PAC-TASK-087 — Create graph sync event when Medicine changes

**Nội dung công việc**

- Khi create/update/deactivate Medicine, tạo outbox event.
- Event có entity type, entity id, action, source version/timestamp nếu có.
- Tạo event cùng transaction với thay đổi dữ liệu khi phù hợp.
- Không gọi Neo4j trực tiếp.

**Kết quả cần đạt**

- Mọi thay đổi Medicine có hàng chờ sync.
- Dữ liệu event đủ để worker xử lý sau này.

#### PAC-TASK-088 — Create graph sync event when ActiveIngredient changes

**Nội dung công việc**

- Phát event cho create/update/deactivate ActiveIngredient.
- Ghi đúng entity type và source id.
- Tránh duplicate event ngoài kiểm soát.
- Không gọi Neo4j trực tiếp.

**Kết quả cần đạt**

- Graph projection có thể cập nhật ActiveIngredient ở Sprint 8.
- Sự thay đổi trace được về PostgreSQL.

#### PAC-TASK-089 — Create graph sync event when Ingredient mapping changes

**Nội dung công việc**

- Phát event khi thêm, xóa hoặc replace mapping.
- Event chứa Medicine id và thông tin cần thiết để rebuild `CONTAINS` relationship.
- Tạo event trong cùng transaction với mapping nếu phù hợp.
- Không tạo Medicine–Medicine edge authoritative.

**Kết quả cần đạt**

- Mapping changes có thể được đồng bộ sang Neo4j.
- Graph relation sau này phản ánh dữ liệu chính thức.

### Điều kiện hoàn thành US-22

- Ba nhóm dữ liệu đều phát event đúng.
- Không triển khai lẫn Neo4j worker ngoài phạm vi Sprint 2.

---

# 6. PAC-EPIC-04 — SUPPLIER MANAGEMENT

## 6.1. Mục tiêu Epic

Xây dựng chức năng quản lý Supplier và chuẩn bị tích hợp Supplier vào Stock Import.

## 6.2. Kết quả cần đạt của Epic

Epic được xem là hoàn thành khi:

1. Có Prisma model Supplier.
2. Supplier create/list/search/update hoạt động.
3. Có UI quản lý Supplier.
4. Warehouse được tạo và cập nhật Supplier theo permission.
5. Chỉ Admin được deactivate Supplier.
6. Supplier được soft deactivate, không hard delete.
7. Supplier inactive không được chọn cho Stock Import mới.
8. Stock Import có thể lưu `supplier_id` và hiển thị Supplier.
9. Supplier selector chỉ lấy active Supplier.
10. Lịch sử nhập kho cũ vẫn giữ được Supplier đã sử dụng.

---

## 6.3. US-23 — Tạo nhà cung cấp

### Mục tiêu User Story

Cho phép người dùng có quyền tạo Supplier mới với đầy đủ thông tin bắt buộc.

### Kết quả cần đạt

- Có model Supplier.
- Có API create.
- Có form create.
- Validation field bắt buộc hoạt động.

### Task thuộc US-23

#### PAC-TASK-090 — Create suppliers Prisma model

**Nội dung công việc**

- Tạo hoặc hoàn thiện Prisma model `Supplier`.
- Xác định field như `id`, `code` nếu có, `name`, `phone`, `email`, `address`, `contact_person`, `is_active`, timestamp.
- Chuẩn bị quan hệ với Stock Import.
- Tạo migration.

**Kết quả cần đạt**

- Database có cấu trúc Supplier ổn định.
- Prisma validate/generate thành công.
- Supplier sẵn sàng được tham chiếu bởi Stock Import.

#### PAC-TASK-091 — Implement supplier create API

**Nội dung công việc**

- Tạo `POST /suppliers`.
- Áp dụng AuthGuard và permission create Supplier.
- Validate field bắt buộc.
- Lưu và trả Supplier vừa tạo.
- Map lỗi duplicate/validation.

**Kết quả cần đạt**

- Admin/Warehouse có quyền tạo Supplier.
- Người không có quyền nhận 403.
- Dữ liệu sai nhận 400.

#### PAC-TASK-092 — Build supplier create form

**Nội dung công việc**

- Tạo form nhập thông tin Supplier.
- Gọi create API.
- Hiển thị loading, success và error.
- Chỉ hiển thị action theo permission.

**Kết quả cần đạt**

- User có quyền tạo Supplier từ UI.
- Supplier mới xuất hiện trong danh sách.

#### PAC-TASK-093 — Validate supplier required fields

**Nội dung công việc**

- Xác định field bắt buộc, tối thiểu là tên Supplier.
- Validate email/phone nếu có.
- Trim chuỗi và reject dữ liệu rỗng.
- Đồng bộ validation frontend/backend.

**Kết quả cần đạt**

- Không lưu Supplier thiếu dữ liệu quan trọng.
- Lỗi hiển thị rõ ràng.

### Điều kiện hoàn thành US-23

- Supplier create hoạt động end-to-end.
- Permission và validation đầy đủ.

---

## 6.4. US-24 — Cập nhật và tìm kiếm nhà cung cấp

### Mục tiêu User Story

Cho phép xem danh sách, tìm kiếm, lọc và cập nhật Supplier.

### Kết quả cần đạt

- List/search API hoạt động.
- Update API hoạt động.
- Có màn hình list/edit.
- Warehouse có thể update theo quyền.

### Task thuộc US-24

#### PAC-TASK-094 — Implement supplier list/search API

**Nội dung công việc**

- Tạo `GET /suppliers`.
- Search theo name, phone hoặc email nếu có.
- Filter active/inactive.
- Hỗ trợ pagination.
- Áp dụng permission view Supplier.

**Kết quả cần đạt**

- UI và Stock Import selector lấy được Supplier.
- Search/filter/pagination hoạt động ổn định.

#### PAC-TASK-095 — Implement supplier update API

**Nội dung công việc**

- Tạo endpoint update Supplier.
- Kiểm tra Supplier tồn tại.
- Validate dữ liệu.
- Cho Warehouse update nếu có permission.
- Không làm mất quan hệ Stock Import cũ.

**Kết quả cần đạt**

- Supplier được cập nhật đúng.
- Supplier không tồn tại trả 404.
- Permission được enforce.

#### PAC-TASK-096 — Build supplier list and edit screen

**Nội dung công việc**

- Hiển thị danh sách Supplier.
- Thêm search/filter.
- Thêm action edit theo permission.
- Tạo form edit.
- Tích hợp list/update API.

**Kết quả cần đạt**

- Admin/Warehouse quản lý Supplier từ UI.
- Admin nhìn thấy thêm action deactivate.
- Màn hình sẵn sàng hỗ trợ Stock Import.

### Điều kiện hoàn thành US-24

- List/search/update hoạt động từ UI đến database.
- Không phá dữ liệu lịch sử.

---

## 6.5. US-25 — Admin deactivate nhà cung cấp

### Mục tiêu User Story

Cho phép chỉ Admin ngừng sử dụng Supplier và ngăn Supplier inactive được dùng cho Stock Import mới.

### Kết quả cần đạt

- Có Admin-only deactivate API.
- Có confirm dialog.
- Warehouse không thể deactivate.
- Supplier inactive không dùng cho import mới.

### Task thuộc US-25

#### PAC-TASK-097 — Implement Admin-only supplier deactivate API

**Nội dung công việc**

- Tạo endpoint deactivate Supplier.
- Áp dụng permission chỉ dành cho Admin.
- Set `is_active=false`.
- Không hard delete.
- Warehouse gọi API phải nhận 403.

**Kết quả cần đạt**

- Chỉ Admin deactivate được Supplier.
- Lịch sử dữ liệu vẫn giữ.

#### PAC-TASK-098 — Add supplier deactivate confirmation UI

**Nội dung công việc**

- Thêm action deactivate.
- Chỉ hiển thị cho Admin.
- Hiển thị confirm dialog.
- Gọi API và refresh danh sách.
- Hiển thị badge/status inactive.

**Kết quả cần đạt**

- Admin thực hiện thao tác an toàn.
- Warehouse không thấy action.

#### PAC-TASK-099 — Prevent inactive supplier in new Stock Import

**Nội dung công việc**

- Backend validate Supplier active khi tạo Stock Import mới.
- Supplier inactive không xuất hiện trong selector.
- Direct API request dùng inactive Supplier bị reject.
- Không ảnh hưởng lịch sử import cũ.

**Kết quả cần đạt**

- Stock Import mới không dùng Supplier inactive.
- Lịch sử vẫn trace được.

### Điều kiện hoàn thành US-25

- Deactivate được enforce cả UI và backend.
- Không có đường bypass dùng inactive Supplier.

---

## 6.6. US-26 — Liên kết Supplier với Stock Import

### Mục tiêu User Story

Chuẩn bị dữ liệu và UI để mỗi Stock Import có một Supplier hợp lệ.

### Kết quả cần đạt

- Stock Import draft có `supplier_id`.
- Backend validate Supplier tồn tại và active.
- UI có supplier selector.
- Supplier được hiển thị trong Stock Import detail.

### Task thuộc US-26

#### PAC-TASK-100 — Link active supplier selection to Stock Import

**Nội dung công việc**

- Thêm hoặc chuẩn bị `supplier_id` trong Stock Import draft.
- Validate Supplier tồn tại và active.
- Lưu quan hệ Supplier–Stock Import.
- Hiển thị Supplier trong detail.
- Bảo toàn Supplier của confirmed import.

**Kết quả cần đạt**

- Phiếu nhập trace được nguồn cung.
- Supplier inactive không dùng cho import mới.
- API Stock Import thống nhất với Supplier module.

#### PAC-TASK-101 — Build supplier selector for Stock Import UI

**Nội dung công việc**

- Gọi API active Supplier list.
- Hiển thị dropdown/search selector.
- Bắt buộc chọn Supplier nếu business rule yêu cầu.
- Hiển thị lỗi khi chưa chọn.
- Không hiển thị inactive Supplier.

**Kết quả cần đạt**

- Warehouse chọn Supplier thuận tiện.
- UI gửi đúng `supplier_id`.
- Selector chỉ chứa dữ liệu hợp lệ.

### Điều kiện hoàn thành US-26

- Supplier đã được tích hợp ở mức contract/schema/UI cần thiết cho Sprint 3.
- Không cần triển khai toàn bộ Stock Import transaction trong Sprint 2.

---

# 7. EPIC HỖ TRỢ TRONG SPRINT 2

## 7.1. PAC-EPIC-19 — Testing, Smoke Test & Release Readiness

### Task tham gia

- `PAC-TASK-071 — Add tests for medicine price validation`.

### Nội dung cần đạt

- Có test bảo vệ rule `selling_price > 0`.
- Test chạy được trong backend test suite.
- Test không phụ thuộc database demo có dữ liệu thật.
- CI hoặc lệnh test local phát hiện regression.

## 7.2. PAC-EPIC-21 — Documentation & Traceability

### Task tham gia

- `PAC-TASK-086 — Add ActiveIngredient data quality review checklist`.

### Nội dung cần đạt

- Có checklist chất lượng dữ liệu hoạt chất.
- Có quy tắc normalize, chống trùng và review dữ liệu crawl.
- Có trace từ tài liệu tới US-21 và PAC-TASK-086.
- AI Agent không tự tạo official mapping từ raw string.

---

# 8. PHÂN NHÓM TRIỂN KHAI THEO DEPENDENCY

## Nhóm A — Medicine Core

```text
US-13 → US-17
PAC-TASK-053 → PAC-TASK-071
```

Thứ tự khuyến nghị:

1. Schema và constraint.
2. Create/update API.
3. List/search/filter API.
4. Frontend create/edit/list.
5. Deactivate.
6. Price validation test.

## Nhóm B — ActiveIngredient Core

```text
US-18
PAC-TASK-072 → PAC-TASK-077
```

Thứ tự khuyến nghị:

1. Prisma model và migration.
2. Normalize service/helper.
3. API create/update/list.
4. Management UI.
5. Validation.

## Nhóm C — Medicine–ActiveIngredient Mapping & Data Quality

```text
US-19 → US-21
PAC-TASK-078 → PAC-TASK-086
```

Thứ tự khuyến nghị:

1. Mapping schema.
2. Transactional mapping API.
3. Mapping UI/detail.
4. Duplicate/inactive validation.
5. Raw-string guardrail.
6. Data-quality checklist.

## Nhóm D — Supplier

```text
US-23 → US-26
PAC-TASK-090 → PAC-TASK-101
```

Thứ tự khuyến nghị:

1. Supplier model.
2. Create/list/update API.
3. Create/list/edit UI.
4. Admin-only deactivate.
5. Stock Import contract/selector.

## Nhóm E — Graph Sync Integration Point

```text
US-22
PAC-TASK-087 → PAC-TASK-089
```

Chỉ thực hiện sau khi Medicine, ActiveIngredient và Mapping ổn định.

---

# 9. QUY TRÌNH BRANCH, PR VÀ MERGE

## 9.1. Luồng bắt buộc

```text
Task branch → User Story branch → develop
```

## 9.2. Quy tắc

1. Mỗi Jira Task có một branch riêng.
2. Tên branch phải chứa Jira issue key thật từ `Jira/jira-mapping.md`.
3. Không dùng `PAC-TASK-xxx` làm Jira key chính.
4. Task branch được PR vào User Story branch.
5. Sau khi toàn bộ Task của User Story đã merge, chạy integration test trên User Story branch.
6. User Story branch chỉ được PR vào `develop` khi test pass.
7. Wave/nhóm triển khai chỉ dùng cho kế hoạch, không thay thế task branch.

## 9.3. Ví dụ US-13

```text
feature/<JIRA-KEY>-TASK-053-create-medicines-prisma-model
feature/<JIRA-KEY>-TASK-054-add-medicine-code-unique-constraint
feature/<JIRA-KEY>-TASK-055-implement-create-medicine-api
feature/<JIRA-KEY>-TASK-056-build-medicine-create-form
feature/<JIRA-KEY>-TASK-057-add-medicine-create-ui-states
```

Các branch trên merge vào:

```text
feature/<JIRA-STORY-KEY>-US-13-create-medicine
```

Sau đó:

```text
US-13 branch → develop
```

---

# 10. KIỂM THỬ BẮT BUỘC

## 10.1. Backend

- Unit test service validation.
- Controller test nếu cần.
- Permission test cho user có/không có quyền.
- Duplicate code/name/mapping tests.
- Selling price tests.
- Inactive Medicine/Supplier tests.
- Prisma validation và generate.

## 10.2. Frontend

- Build Next.js thành công.
- Form validation hoạt động.
- Loading/success/error/empty states.
- Permission-aware buttons.
- Direct route access bị chặn nếu thiếu quyền.
- Search/filter/pagination hoạt động.

## 10.3. Lệnh kiểm tra tối thiểu

```bash
cd backend
npm run test
npm run test:e2e
npx prisma validate
npx prisma generate

cd ../frontend
npm run build
```

## 10.4. Manual UI Test tối thiểu

### Medicine

- Tạo Medicine hợp lệ.
- Tạo code trùng.
- Tạo/cập nhật giá 0 hoặc âm.
- Search theo code/name.
- Filter active/inactive.
- Deactivate Medicine.
- Kiểm tra Medicine inactive không dùng cho bán mới.

### ActiveIngredient và Mapping

- Tạo hoạt chất mới.
- Tạo tên trùng sau normalize.
- Update hoạt chất.
- Gán nhiều hoạt chất cho Medicine.
- Chọn trùng hoạt chất.
- Mapping inactive ingredient.
- Kiểm tra Medicine detail hiển thị mapping.

### Supplier

- Admin/Warehouse tạo Supplier.
- Search/update Supplier.
- Warehouse thử deactivate và nhận 403.
- Admin deactivate Supplier.
- Supplier inactive không xuất hiện trong Stock Import selector.

---

# 11. DEFINITION OF DONE CHO SPRINT 2

Sprint 2 chỉ được đánh dấu hoàn thành khi tất cả điều kiện sau đạt:

## Medicine

- [ ] Medicine Prisma model và migration hợp lệ.
- [ ] Medicine code unique.
- [ ] Create/update/list/search/filter API hoạt động.
- [ ] Create/edit/list UI hoạt động.
- [ ] `selling_price > 0` được enforce ở backend và UI.
- [ ] Có test price validation.
- [ ] Medicine deactivate là soft deactivate.
- [ ] Medicine inactive không được bán mới.

## ActiveIngredient

- [ ] ActiveIngredient model và migration hợp lệ.
- [ ] Create/update/list/search API hoạt động.
- [ ] Management screen hoạt động.
- [ ] Tên được normalize.
- [ ] Normalized name không trùng.

## Mapping

- [ ] Mapping schema many-to-many hoạt động.
- [ ] Composite unique chống mapping trùng.
- [ ] Mapping API chạy transaction.
- [ ] Mapping component hoạt động.
- [ ] Medicine detail hiển thị hoạt chất.
- [ ] Inactive ingredient không mapping mới.
- [ ] Raw scraped string không dùng làm official mapping.
- [ ] Có data-quality checklist.

## Supplier

- [ ] Supplier model và migration hợp lệ.
- [ ] Create/list/search/update API hoạt động.
- [ ] Create/list/edit UI hoạt động.
- [ ] Warehouse có thể create/update theo permission.
- [ ] Chỉ Admin deactivate Supplier.
- [ ] Supplier inactive không dùng cho Stock Import mới.
- [ ] Stock Import contract có Supplier.
- [ ] Supplier selector chỉ hiển thị active Supplier.

## Graph Sync

- [ ] Medicine changes tạo outbox event.
- [ ] ActiveIngredient changes tạo outbox event.
- [ ] Mapping changes tạo outbox event.
- [ ] Không gọi Neo4j trực tiếp từ controller.

## Quality Gate

- [ ] Backend unit tests pass.
- [ ] Backend E2E tests pass.
- [ ] Prisma validate pass.
- [ ] Prisma generate pass.
- [ ] Frontend build pass.
- [ ] Manual UI checklist pass.
- [ ] Không còn lỗi Critical/High chưa xử lý.
- [ ] `sprint-2-progress.md` được cập nhật.
- [ ] Ready for Sprint 3 = Yes.

---

# 12. OUT-OF-SCOPE GUARD

Không triển khai trong Sprint 2:

1. MedicineBatch và tồn kho batch đầy đủ.
2. Stock Import transaction/confirm đầy đủ.
3. Inventory Adjustment.
4. POS Draft Order đầy đủ.
5. DrugInteraction Rule và InteractionAlert đầy đủ.
6. Neo4j worker/projection đầy đủ.
7. Graph-RAG.
8. AI Copilot.
9. ProductVariant làm sales key.
10. Hard delete Medicine hoặc Supplier.
11. Raw scraped ingredient string làm official mapping.
12. Medicine–Medicine interaction làm source of truth.

---

# 13. ĐẦU RA CUỐI SPRINT

Sprint 2 phải bàn giao tối thiểu:

1. Prisma schema và migrations cho Medicine, ActiveIngredient, Mapping, Supplier và Graph Sync integration point nếu chưa có.
2. Backend modules/API/DTO/services/tests tương ứng.
3. Frontend screens/forms/components tương ứng.
4. Permission enforcement ở backend và UI.
5. ActiveIngredient data-quality checklist.
6. Sprint 2 audit và progress report.
7. Pull Request history theo Task → User Story → develop.
8. Test evidence và manual UI evidence.
9. Code trên `develop` sẵn sàng cho Sprint 3.

---

# 14. SPRINT 2 PROGRESS

## 14.1. Mục đích theo dõi tiến độ

Phần này được sử dụng để theo dõi trạng thái triển khai thực tế của Sprint 2 từ lúc audit code hiện có cho đến khi hoàn thành kiểm thử và sẵn sàng chuyển sang Sprint 3.

Quy tắc cập nhật:

1. Không đánh dấu Task là `Done` chỉ vì đã tồn tại file hoặc code tương tự.
2. Task chỉ được đánh dấu `Done` khi đáp ứng đúng acceptance criteria, đã test và đã merge theo đúng luồng branch.
3. Nếu code đã có nhưng chưa đủ điều kiện, dùng trạng thái `Partial`.
4. Nếu code trái baseline hoặc gây xung đột kiến trúc, dùng trạng thái `Conflict`.
5. Nếu chưa kiểm tra hiện trạng, dùng trạng thái `Pending Audit`.
6. Nếu chưa bắt đầu sau audit, dùng trạng thái `Not Started`.
7. Nếu đang thực hiện, dùng trạng thái `In Progress`.
8. Nếu bị phụ thuộc hoặc lỗi chưa giải quyết, dùng trạng thái `Blocked`.
9. Nếu đã hoàn thành code nhưng chưa merge/test tổng, dùng trạng thái `Ready for Review`.
10. Chỉ đặt `Ready for Sprint 3 = Yes` khi toàn bộ Definition of Done và Quality Gate đã đạt.

## 14.2. Quy ước trạng thái

| Trạng thái | Ý nghĩa |
|---|---|
| Pending Audit | Chưa audit code hiện có |
| Not Started | Đã audit nhưng chưa triển khai |
| In Progress | Đang code hoặc đang test |
| Partial | Đã có một phần nhưng chưa đủ acceptance criteria |
| Conflict | Code hiện có trái baseline hoặc cần thiết kế lại |
| Blocked | Không thể tiếp tục do dependency hoặc lỗi |
| Ready for Review | Đã hoàn thành task branch, chờ review/PR |
| Done | Đã test, review và merge đúng quy trình |
| N/A | Không áp dụng với codebase hiện tại và đã có lý do |

## 14.3. Tổng quan tiến độ Sprint 2

| Chỉ số | Giá trị hiện tại |
|---|---:|
| Tổng Epic nghiệp vụ | 2 |
| Epic hỗ trợ tham gia | 2 |
| Tổng User Story | 14 |
| Tổng Task | 49 |
| Task Done | 0 |
| Task In Progress | 0 |
| Task Partial | 0 |
| Task Blocked | 0 |
| Task Pending Audit | 49 |
| User Story Done | 0/14 |
| Epic nghiệp vụ Done | 0/2 |
| Tiến độ tổng | 0% |
| Ready for Sprint 3 | No |

Công thức tiến độ gợi ý:

```text
Sprint Progress (%) = Số Task Done / 49 × 100
```

## 14.4. Tiến độ theo Epic

| Epic | Phạm vi | Tổng US | Tổng Task | Trạng thái | Kết quả cần đạt trước khi Done |
|---|---|---:|---:|---|---|
| PAC-EPIC-03 — Medicine & ActiveIngredient | US-13 → US-22 | 10 | 37 | Pending Audit | Medicine, ActiveIngredient, Mapping, validation, data quality và Graph Sync integration point hoàn chỉnh |
| PAC-EPIC-04 — Supplier Management | US-23 → US-26 | 4 | 12 | Pending Audit | Supplier CRUD, permission, deactivate và Stock Import linkage hoàn chỉnh |
| PAC-EPIC-19 — Testing, Smoke Test & Release Readiness | PAC-TASK-071 | 1 task hỗ trợ | 1 | Pending Audit | Test price validation pass và có evidence |
| PAC-EPIC-21 — Documentation & Traceability | PAC-TASK-086 | 1 task hỗ trợ | 1 | Pending Audit | Có checklist review chất lượng ActiveIngredient |

## 14.5. Tiến độ chi tiết PAC-EPIC-03 — Medicine & ActiveIngredient

### US-13 — Thêm thuốc mới

| Task | Nội dung | Trạng thái | Branch/PR | Test/Evidence | Ghi chú |
|---|---|---|---|---|---|
| PAC-TASK-053 | Create medicines Prisma model | Pending Audit | Chưa có | Chưa có | Kiểm tra model/migration hiện tại trước khi sửa |
| PAC-TASK-054 | Add medicine code uniqueness constraint | Pending Audit | Chưa có | Chưa có | Kiểm tra unique constraint và duplicate handling |
| PAC-TASK-055 | Implement POST /medicines API | Pending Audit | Chưa có | Chưa có | Kiểm tra controller/service/permission |
| PAC-TASK-056 | Build medicine create form | Pending Audit | Chưa có | Chưa có | Kiểm tra form hiện có và API contract |
| PAC-TASK-057 | Add medicine create success/error UI state | Pending Audit | Chưa có | Chưa có | Loading, success, error, double-submit |

**Trạng thái US-13:** Pending Audit  
**Điều kiện Done:** 5/5 Task Done, integration test pass, PR US-13 merge vào `develop`.

### US-14 — Cập nhật thông tin thuốc

| Task | Nội dung | Trạng thái | Branch/PR | Test/Evidence | Ghi chú |
|---|---|---|---|---|---|
| PAC-TASK-058 | Implement PATCH /medicines/{id} API | Pending Audit | Chưa có | Chưa có | Kiểm tra update API hiện có |
| PAC-TASK-059 | Build medicine edit form | Pending Audit | Chưa có | Chưa có | Kiểm tra edit page/dialog |
| PAC-TASK-060 | Add medicine update validation and errors | Pending Audit | Chưa có | Chưa có | Price, duplicate code, 404, required fields |

**Trạng thái US-14:** Pending Audit  
**Điều kiện Done:** 3/3 Task Done, update flow và error handling pass.

### US-15 — Tìm kiếm và lọc thuốc

| Task | Nội dung | Trạng thái | Branch/PR | Test/Evidence | Ghi chú |
|---|---|---|---|---|---|
| PAC-TASK-061 | Implement medicine list API with pagination | Pending Audit | Chưa có | Chưa có | Kiểm tra page/limit/total/sort |
| PAC-TASK-062 | Implement medicine search by code/name | Pending Audit | Chưa có | Chưa có | Search case-insensitive nếu phù hợp |
| PAC-TASK-063 | Implement medicine filters | Pending Audit | Chưa có | Chưa có | Active/inactive, dosage form/category nếu có |
| PAC-TASK-064 | Build medicine list table | Pending Audit | Chưa có | Chưa có | Table, actions, pagination, search/filter |
| PAC-TASK-065 | Add medicine list empty/loading/error states | Pending Audit | Chưa có | Chưa có | Empty, loading, retry, API error |

**Trạng thái US-15:** Pending Audit  
**Điều kiện Done:** 5/5 Task Done, search/filter/pagination hoạt động đồng bộ frontend-backend.

### US-16 — Deactivate thuốc

| Task | Nội dung | Trạng thái | Branch/PR | Test/Evidence | Ghi chú |
|---|---|---|---|---|---|
| PAC-TASK-066 | Implement medicine deactivate API | Pending Audit | Chưa có | Chưa có | Soft deactivate, permission, audit/event nếu có |
| PAC-TASK-067 | Add deactivate action in medicine UI | Pending Audit | Chưa có | Chưa có | Permission-aware action và confirm dialog |
| PAC-TASK-068 | Prevent inactive medicines from POS selection | Pending Audit | Chưa có | Chưa có | Backend vẫn phải chặn dù POS chưa hoàn chỉnh |

**Trạng thái US-16:** Pending Audit  
**Điều kiện Done:** 3/3 Task Done, Medicine inactive không được dùng cho giao dịch bán mới.

### US-17 — Validate giá bán thuốc lớn hơn 0

| Task | Nội dung | Trạng thái | Branch/PR | Test/Evidence | Ghi chú |
|---|---|---|---|---|---|
| PAC-TASK-069 | Enforce selling_price greater than 0 in backend | Pending Audit | Chưa có | Chưa có | Create và update đều phải enforce |
| PAC-TASK-070 | Add selling price validation in UI | Pending Audit | Chưa có | Chưa có | Chặn rỗng, 0, âm và format input |
| PAC-TASK-071 | Add tests for medicine price validation | Pending Audit | Chưa có | Chưa có | Test create/update với giá hợp lệ, 0 và âm |

**Trạng thái US-17:** Pending Audit  
**Điều kiện Done:** 3/3 Task Done và test price validation pass.

### US-18 — Quản lý ActiveIngredient

| Task | Nội dung | Trạng thái | Branch/PR | Test/Evidence | Ghi chú |
|---|---|---|---|---|---|
| PAC-TASK-072 | Create active_ingredients Prisma model | Pending Audit | Chưa có | Chưa có | Kiểm tra model/normalized_name/unique |
| PAC-TASK-073 | Implement ActiveIngredient create API | Pending Audit | Chưa có | Chưa có | Normalize trước khi lưu, chống trùng |
| PAC-TASK-074 | Implement ActiveIngredient update API | Pending Audit | Chưa có | Chưa có | Không làm mất mapping hiện có |
| PAC-TASK-075 | Implement ActiveIngredient list/search API | Pending Audit | Chưa có | Chưa có | Search, pagination/filter nếu có |
| PAC-TASK-076 | Build ActiveIngredient management screen | Pending Audit | Chưa có | Chưa có | List/create/update/search UI |
| PAC-TASK-077 | Add ActiveIngredient create/edit form validation | Pending Audit | Chưa có | Chưa có | Required, trim, duplicate handling |

**Trạng thái US-18:** Pending Audit  
**Điều kiện Done:** 6/6 Task Done, CRUD và normalized-name validation hoạt động.

### US-19 — Mapping Medicine với ActiveIngredient

| Task | Nội dung | Trạng thái | Branch/PR | Test/Evidence | Ghi chú |
|---|---|---|---|---|---|
| PAC-TASK-078 | Create medicine_active_ingredients mapping schema | Pending Audit | Chưa có | Chưa có | Many-to-many và composite unique |
| PAC-TASK-079 | Implement Medicine-Ingredient mapping API | Pending Audit | Chưa có | Chưa có | Replace/update mapping trong transaction |
| PAC-TASK-080 | Build ingredient mapping component in Medicine form | Pending Audit | Chưa có | Chưa có | Multi-select/search/remove, không trùng |
| PAC-TASK-081 | Show mapped ingredients in medicine detail | Pending Audit | Chưa có | Chưa có | Detail kèm ingredients và empty state |

**Trạng thái US-19:** Pending Audit  
**Điều kiện Done:** 4/4 Task Done, mapping transaction hoạt động và hiển thị đúng.

### US-20 — Validate mapping hoạt chất không trùng

| Task | Nội dung | Trạng thái | Branch/PR | Test/Evidence | Ghi chú |
|---|---|---|---|---|---|
| PAC-TASK-082 | Add unique validation for ingredient mapping | Pending Audit | Chưa có | Chưa có | Database, service và UI cùng chống trùng |
| PAC-TASK-083 | Prevent mapping inactive ingredient if not allowed | Pending Audit | Chưa có | Chưa có | Backend phải reject mapping mới tới ingredient inactive |

**Trạng thái US-20:** Pending Audit  
**Điều kiện Done:** 2/2 Task Done và duplicate/inactive mapping tests pass.

### US-21 — Chuẩn hóa dữ liệu hoạt chất

| Task | Nội dung | Trạng thái | Branch/PR | Test/Evidence | Ghi chú |
|---|---|---|---|---|---|
| PAC-TASK-084 | Normalize ActiveIngredient names | Pending Audit | Chưa có | Chưa có | Trim/case/whitespace và quy tắc chuẩn hóa thống nhất |
| PAC-TASK-085 | Reject raw scraped ingredient strings in official mapping | Pending Audit | Chưa có | Chưa có | Raw data chỉ là nguồn review, không phải official entity |
| PAC-TASK-086 | Add ActiveIngredient data quality review checklist | Pending Audit | Chưa có | Chưa có | Checklist review, duplicate, nguồn và trạng thái approval |

**Trạng thái US-21:** Pending Audit  
**Điều kiện Done:** 3/3 Task Done và có data-quality evidence.

### US-22 — Trigger Graph Sync khi Medicine/Ingredient thay đổi

| Task | Nội dung | Trạng thái | Branch/PR | Test/Evidence | Ghi chú |
|---|---|---|---|---|---|
| PAC-TASK-087 | Create graph sync event when Medicine changes | Pending Audit | Chưa có | Chưa có | Chỉ integration point/outbox, không gọi Neo4j trực tiếp |
| PAC-TASK-088 | Create graph sync event when ActiveIngredient changes | Pending Audit | Chưa có | Chưa có | Event phải có entity/source version phù hợp |
| PAC-TASK-089 | Create graph sync event when Ingredient mapping changes | Pending Audit | Chưa có | Chưa có | Mapping create/update/remove đều phát event phù hợp |

**Trạng thái US-22:** Pending Audit  
**Điều kiện Done:** 3/3 Task Done, outbox/event tests pass, không triển khai lấn Sprint 8.

## 14.6. Tiến độ chi tiết PAC-EPIC-04 — Supplier Management

### US-23 — Tạo nhà cung cấp

| Task | Nội dung | Trạng thái | Branch/PR | Test/Evidence | Ghi chú |
|---|---|---|---|---|---|
| PAC-TASK-090 | Create suppliers Prisma model | Pending Audit | Chưa có | Chưa có | Model, constraints, soft status |
| PAC-TASK-091 | Implement supplier create API | Pending Audit | Chưa có | Chưa có | Admin/Warehouse theo permission |
| PAC-TASK-092 | Build supplier create form | Pending Audit | Chưa có | Chưa có | Permission-aware form và API integration |
| PAC-TASK-093 | Validate supplier required fields | Pending Audit | Chưa có | Chưa có | Required fields backend + frontend |

**Trạng thái US-23:** Pending Audit  
**Điều kiện Done:** 4/4 Task Done và create flow pass.

### US-24 — Cập nhật và tìm kiếm nhà cung cấp

| Task | Nội dung | Trạng thái | Branch/PR | Test/Evidence | Ghi chú |
|---|---|---|---|---|---|
| PAC-TASK-094 | Implement supplier list/search API | Pending Audit | Chưa có | Chưa có | Search, filter trạng thái nếu có |
| PAC-TASK-095 | Implement supplier update API | Pending Audit | Chưa có | Chưa có | Validate tồn tại, permission và required fields |
| PAC-TASK-096 | Build supplier list and edit screen | Pending Audit | Chưa có | Chưa có | List/search/edit/loading/empty/error |

**Trạng thái US-24:** Pending Audit  
**Điều kiện Done:** 3/3 Task Done, list/search/update flow pass.

### US-25 — Admin deactivate nhà cung cấp

| Task | Nội dung | Trạng thái | Branch/PR | Test/Evidence | Ghi chú |
|---|---|---|---|---|---|
| PAC-TASK-097 | Implement Admin-only supplier deactivate API | Pending Audit | Chưa có | Chưa có | Warehouse gọi API phải nhận 403 |
| PAC-TASK-098 | Add supplier deactivate confirmation UI | Pending Audit | Chưa có | Chưa có | Chỉ Admin thấy action và có confirm |
| PAC-TASK-099 | Prevent inactive supplier in new Stock Import | Pending Audit | Chưa có | Chưa có | Backend contract phải reject supplier inactive |

**Trạng thái US-25:** Pending Audit  
**Điều kiện Done:** 3/3 Task Done, Admin-only và inactive-supplier rules pass.

### US-26 — Liên kết Supplier với Stock Import

| Task | Nội dung | Trạng thái | Branch/PR | Test/Evidence | Ghi chú |
|---|---|---|---|---|---|
| PAC-TASK-100 | Link active supplier selection to Stock Import | Pending Audit | Chưa có | Chưa có | Chỉ xây contract/integration cần cho Sprint 3 |
| PAC-TASK-101 | Build supplier selector for Stock Import UI | Pending Audit | Chưa có | Chưa có | Chỉ hiển thị active Supplier, không làm full Stock Import |

**Trạng thái US-26:** Pending Audit  
**Điều kiện Done:** 2/2 Task Done và integration contract sẵn sàng cho Sprint 3.

## 14.7. Tiến độ theo User Story

| User Story | Task range | Tổng Task | Done | Trạng thái | US Branch | PR vào develop |
|---|---|---:|---:|---|---|---|
| US-13 | PAC-TASK-053 → 057 | 5 | 0/5 | Pending Audit | Chưa tạo | Chưa tạo |
| US-14 | PAC-TASK-058 → 060 | 3 | 0/3 | Pending Audit | Chưa tạo | Chưa tạo |
| US-15 | PAC-TASK-061 → 065 | 5 | 0/5 | Pending Audit | Chưa tạo | Chưa tạo |
| US-16 | PAC-TASK-066 → 068 | 3 | 0/3 | Pending Audit | Chưa tạo | Chưa tạo |
| US-17 | PAC-TASK-069 → 071 | 3 | 0/3 | Pending Audit | Chưa tạo | Chưa tạo |
| US-18 | PAC-TASK-072 → 077 | 6 | 0/6 | Pending Audit | Chưa tạo | Chưa tạo |
| US-19 | PAC-TASK-078 → 081 | 4 | 0/4 | Pending Audit | Chưa tạo | Chưa tạo |
| US-20 | PAC-TASK-082 → 083 | 2 | 0/2 | Pending Audit | Chưa tạo | Chưa tạo |
| US-21 | PAC-TASK-084 → 086 | 3 | 0/3 | Pending Audit | Chưa tạo | Chưa tạo |
| US-22 | PAC-TASK-087 → 089 | 3 | 0/3 | Pending Audit | Chưa tạo | Chưa tạo |
| US-23 | PAC-TASK-090 → 093 | 4 | 0/4 | Pending Audit | Chưa tạo | Chưa tạo |
| US-24 | PAC-TASK-094 → 096 | 3 | 0/3 | Pending Audit | Chưa tạo | Chưa tạo |
| US-25 | PAC-TASK-097 → 099 | 3 | 0/3 | Pending Audit | Chưa tạo | Chưa tạo |
| US-26 | PAC-TASK-100 → 101 | 2 | 0/2 | Pending Audit | Chưa tạo | Chưa tạo |

## 14.8. Current Status

```text
Sprint State: Planning / Pending Existing Code Audit
Current Epic: Chưa bắt đầu
Current User Story: Chưa bắt đầu
Current Task: Chưa bắt đầu
Current Branch: develop
Overall Progress: 0/49 Task — 0%
Ready for Sprint 3: No
```

## 14.9. Completed Tasks

Chưa có Task nào được xác nhận hoàn thành tại thời điểm khởi tạo Sprint 2.

| Task | User Story | Branch | PR | Test Evidence | Merge Commit |
|---|---|---|---|---|---|
| Chưa có | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có |

## 14.10. Partial Tasks

Các Task đã có code một phần sau audit phải được ghi ở đây.

| Task | Phần đã có | Phần còn thiếu | Risk | Hành động tiếp theo |
|---|---|---|---|---|
| Chưa audit | Chưa xác định | Chưa xác định | Chưa xác định | Chạy Existing Code Audit |

## 14.11. Blocked Tasks

| Task | Blocker | Dependency | Owner | Hướng xử lý | Trạng thái |
|---|---|---|---|---|---|
| Chưa có | Chưa có | Chưa có | Chưa có | Chưa có | Open |

## 14.12. Branch và Pull Request Tracking

| Cấp | Issue | Branch | Base branch | PR | Trạng thái |
|---|---|---|---|---|---|
| Task | Chưa có | Chưa tạo | US branch tương ứng | Chưa có | Not Started |
| User Story | Chưa có | Chưa tạo | develop | Chưa có | Not Started |

Quy trình bắt buộc:

```text
Task branch
→ PR vào User Story branch
→ test toàn User Story
→ PR User Story branch vào develop
```

## 14.13. Test Results

### Backend

| Kiểm tra | Lệnh | Kết quả | Ngày chạy | Evidence |
|---|---|---|---|---|
| Unit Test | `npm run test` | Chưa chạy | — | — |
| E2E Test | `npm run test:e2e` | Chưa chạy | — | — |
| Prisma Validate | `npx prisma validate` | Chưa chạy | — | — |
| Prisma Generate | `npx prisma generate` | Chưa chạy | — | — |

### Frontend

| Kiểm tra | Lệnh | Kết quả | Ngày chạy | Evidence |
|---|---|---|---|---|
| Next.js Build | `npm run build` | Chưa chạy | — | — |
| Manual UI Test | Theo checklist Sprint 2 | Chưa chạy | — | — |

### Integration Tests bắt buộc

- [ ] Medicine create/update/list/search/filter.
- [ ] Duplicate Medicine code.
- [ ] `selling_price > 0` ở create và update.
- [ ] Soft deactivate Medicine.
- [ ] Inactive Medicine không dùng cho giao dịch mới.
- [ ] ActiveIngredient normalize và unique.
- [ ] Medicine–ActiveIngredient mapping transaction.
- [ ] Duplicate mapping bị reject.
- [ ] Inactive ingredient mapping bị reject.
- [ ] Supplier create/update/search.
- [ ] Warehouse không deactivate Supplier.
- [ ] Admin deactivate Supplier.
- [ ] Inactive Supplier không dùng cho Stock Import mới.
- [ ] Graph Sync integration point tạo event phù hợp.

## 14.14. Manual UI Test Progress

### Medicine UI

- [ ] Trang danh sách Medicine tải thành công.
- [ ] Loading state hiển thị đúng.
- [ ] Empty state hiển thị đúng.
- [ ] Error state và retry hoạt động.
- [ ] Tạo Medicine hợp lệ.
- [ ] Tạo Medicine code trùng hiển thị lỗi.
- [ ] Tạo Medicine có giá bằng 0 bị chặn.
- [ ] Tạo Medicine có giá âm bị chặn.
- [ ] Cập nhật Medicine thành công.
- [ ] Search theo code.
- [ ] Search theo name.
- [ ] Filter active/inactive.
- [ ] Pagination hoạt động.
- [ ] Deactivate có confirm.
- [ ] User thiếu permission không thấy action sai quyền.

### ActiveIngredient và Mapping UI

- [ ] Trang quản lý ActiveIngredient tải thành công.
- [ ] Tạo ActiveIngredient hợp lệ.
- [ ] Tên chỉ có khoảng trắng bị chặn.
- [ ] Tên trùng sau normalize bị chặn.
- [ ] Cập nhật ActiveIngredient thành công.
- [ ] Search ActiveIngredient hoạt động.
- [ ] Chọn nhiều ActiveIngredient cho Medicine.
- [ ] Không chọn trùng cùng ActiveIngredient.
- [ ] Remove mapping hoạt động.
- [ ] Medicine detail hiển thị mapped ingredients.
- [ ] Inactive ingredient không dùng cho mapping mới.

### Supplier UI

- [ ] Trang danh sách Supplier tải thành công.
- [ ] Admin tạo Supplier thành công.
- [ ] Warehouse tạo Supplier thành công nếu có permission.
- [ ] Required fields được validate.
- [ ] Search Supplier hoạt động.
- [ ] Update Supplier thành công.
- [ ] Warehouse không thấy hoặc không dùng được deactivate action.
- [ ] Warehouse gọi deactivate API trực tiếp nhận 403.
- [ ] Admin deactivate Supplier thành công.
- [ ] Supplier inactive không xuất hiện trong selector Stock Import.

## 14.15. Known Issues

| ID | Mô tả | Mức độ | Ảnh hưởng | Trạng thái | Hướng xử lý |
|---|---|---|---|---|---|
| Chưa có | Chưa phát hiện | — | — | Open | Cập nhật sau audit/test |

## 14.16. Risk Register

| Risk | Mức độ | Dấu hiệu | Biện pháp kiểm soát |
|---|---|---|---|
| Trùng chức năng giữa Medicine và Product/ProductVariant | High | API/UI dùng lẫn hai model | Giữ `medicine_id` là business/sales key MVP |
| Dữ liệu ActiveIngredient từ crawl không sạch | High | Trùng tên, chuỗi hỗn hợp | Normalize + review checklist + không dùng raw string chính thức |
| Mapping không transaction | High | Mất mapping khi replace lỗi giữa chừng | Dùng Prisma transaction |
| Graph Sync làm lấn Sprint 8 | Medium | Controller gọi Neo4j trực tiếp | Chỉ tạo outbox/event integration point |
| Supplier inactive vẫn được chọn nhập kho | High | Selector/API không filter | Filter ở cả backend contract và frontend selector |
| Permission chỉ chặn ở UI | High | Direct API call vẫn thành công | Bắt buộc AuthGuard + PermissionsGuard ở backend |
| Migration phá dữ liệu hiện có | High | Schema hiện có khác baseline | Audit schema và migration trước implementation |

## 14.17. Final Verification Checklist

### Scope

- [ ] PAC-TASK-053 → PAC-TASK-101 đã được audit đầy đủ.
- [ ] 49/49 Task có trạng thái cuối cùng rõ ràng.
- [ ] 14/14 User Story hoàn thành.
- [ ] PAC-EPIC-03 hoàn thành.
- [ ] PAC-EPIC-04 hoàn thành.

### Architecture và dữ liệu

- [ ] MVP tiếp tục dùng `medicine_id`.
- [ ] Không dùng `product_variant_id` làm sales key.
- [ ] Không hard delete Medicine/Supplier.
- [ ] Không dùng raw scraped ingredient string làm official mapping.
- [ ] PostgreSQL vẫn là source of truth.
- [ ] Không gọi Neo4j trực tiếp từ controller.

### Quality Gate

- [ ] Backend unit tests pass.
- [ ] Backend E2E tests pass.
- [ ] Prisma validate pass.
- [ ] Prisma generate pass.
- [ ] Frontend build pass.
- [ ] Manual UI tests pass.
- [ ] Không còn Critical/High issue chưa xử lý.
- [ ] Tất cả US branch đã merge vào `develop`.
- [ ] `develop` đã được pull và verify lại local.

## 14.18. Sprint 2 Completion Summary

Phần này chỉ được điền khi Sprint 2 đã hoàn thành.

```text
Completed Epic:
- PAC-EPIC-03: No
- PAC-EPIC-04: No

Completed User Stories: 0/14
Completed Tasks: 0/49
Backend Unit Tests: Not Run
Backend E2E Tests: Not Run
Prisma Validate: Not Run
Prisma Generate: Not Run
Frontend Build: Not Run
Manual UI Test: Not Run
Known Critical Issues: Unknown
Known High Issues: Unknown
Ready for Sprint 3: No
```


# 15. KẾT LUẬN

Sprint 2 là lớp dữ liệu nền quan trọng của PharmaAssist AI Intelligence. Nếu Medicine, ActiveIngredient, Mapping và Supplier không được thiết kế đúng, các Sprint sau về Inventory, POS, InteractionAlert, AI và Knowledge Graph sẽ không có nguồn dữ liệu đáng tin cậy.

Do đó, Sprint 2 phải ưu tiên:

```text
Data integrity
Backend authorization
Validation ở nhiều lớp
Soft deactivate
Official ActiveIngredient mapping
Supplier traceability
Graph Sync integration point
Testing song song với implementation
```

Luồng thực hiện chính thức:

```text
Audit code hiện có
→ triển khai từng Task branch
→ merge vào User Story branch
→ chạy integration test
→ PR User Story vào develop
→ final Sprint 2 verification
→ Ready for Sprint 3
```
