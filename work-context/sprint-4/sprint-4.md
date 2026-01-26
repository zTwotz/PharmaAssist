# Sprint 4 — Inventory Adjustment & POS Draft Order

> **Tài liệu kế hoạch thực thi chính thức cho Sprint 4 của PharmaAssist AI Intelligence**
>
> File đề xuất trong repository:
>
> `work-context/sprint-4/sprint-4.md`
>
> Tài liệu này là kế hoạch cố định của Sprint 4. Trạng thái thực tế, checkbox, branch, commit, Pull Request và test evidence sẽ được theo dõi trong `sprint-4-progress.md`, không ghi trực tiếp vào file này.

---

# 1. Mục đích tài liệu

Tài liệu này xác định đầy đủ:

1. Phạm vi chính thức của Sprint 4.
2. Epic, User Story và Task thuộc Sprint.
3. Mục tiêu và kết quả cần đạt của từng Epic, User Story và Task.
4. Dependency bắt buộc từ Sprint 1–3.
5. Baseline nghiệp vụ cho Inventory Adjustment và POS Draft Order.
6. Thứ tự triển khai theo dependency.
7. Skill phù hợp theo từng nhóm công việc.
8. Quy trình GitHub/Jira.
9. Chiến lược kiểm thử.
10. Definition of Done.
11. Out-of-scope guard để tránh triển khai lấn Sprint 5 và Sprint 6.

---

# 2. Tài liệu nguồn và thứ tự ưu tiên

Tài liệu Sprint 4 được tổng hợp từ:

1. `1_Components.md`
2. `2_Epic.md`
3. `3_Stories.md`
4. `4_Task.md`
5. `4B_Task_List_MVP_POS_Interaction_Checkout_146_290.md`
6. `4B_Task_Description_MVP_POS_Interaction_Checkout_146_290.md`
7. `5_Sprint.md`
8. `branch-on-jira.md`
9. `jira-mapping.md`
10. `Final Review tổng thể bộ 580 Task trước khi tạo 5_Sprint.md`

Thứ tự ưu tiên khi có khác biệt:

1. **`jira-mapping.md`** là Single Source of Truth cho Jira Key thật.
2. **Task List 4B** quyết định Task → Story → Epic → Component → Priority → Sprint.
3. **Task Description 4B** quyết định nội dung công việc và kết quả mong đợi của Task.
4. **`3_Stories.md`** quyết định mục tiêu và Acceptance Criteria của User Story.
5. **`2_Epic.md`** quyết định tên, mục tiêu và metadata chính thức của Epic.
6. **`5_Sprint.md`** quyết định phạm vi Sprint, dependency và MVP gate.
7. **`branch-on-jira.md`** quyết định format branch/commit/PR, nhưng Jira Key phải tra lại từ `jira-mapping.md`.

## 2.1. Các điểm nhất quán đã được chốt

- Tên Epic chính thức là **PAC-EPIC-08 — POS Draft Order**.
- Component của Epic này là **POS & Checkout**.
- `jira-mapping.md` được ưu tiên nếu Jira Key trong `branch-on-jira.md` bị lệch.
- Sprint 4 có 20 User Story chính từ `US-49` đến `US-68`.
- Sprint 4 có 66 Task từ `PAC-TASK-161` đến `PAC-TASK-226`.
- `PAC-TASK-185` là Task hardening thuộc Sprint 4 nhưng vẫn liên kết với `US-38 / PAC-EPIC-05`.
- Task Testing và Documentation vẫn liên kết với User Story nghiệp vụ tương ứng; không tạo lại Task trùng.

---

# 3. Sprint Information

| Mục | Nội dung |
|---|---|
| Sprint | Sprint 4 |
| Tên Sprint | Inventory Adjustment & POS Draft Order |
| Scope | MVP / Core |
| MVP Gate | Có |
| Task range | PAC-TASK-161 → PAC-TASK-226 |
| Tổng Task | 66 |
| Primary Story range | US-49 → US-68 |
| Tổng Primary User Story | 20 |
| Cross-sprint Story reference | US-38 qua PAC-TASK-185 |
| Epic nghiệp vụ | PAC-EPIC-07, PAC-EPIC-08 |
| Epic hỗ trợ | PAC-EPIC-19, PAC-EPIC-21 |
| Cross-sprint Epic reference | PAC-EPIC-05 qua PAC-TASK-185 |
| Component chính | Inventory Adjustment, POS & Checkout |
| Phụ thuộc trực tiếp | Sprint 3 |
| Sprint kế tiếp | Sprint 5 — DrugInteraction Rule & InteractionAlert |

## 3.1. Phân bổ Task

| Nhóm | Task range | Số Task |
|---|---:|---:|
| Inventory Adjustment | PAC-TASK-161 → PAC-TASK-190 | 30 |
| POS Draft Order | PAC-TASK-191 → PAC-TASK-226 | 36 |
| **Tổng** | **PAC-TASK-161 → PAC-TASK-226** | **66** |

## 3.2. Phân bổ theo Jira Parent Epic

| Parent Epic | Vai trò | Số Task |
|---|---|---:|
| PAC-EPIC-07 | Epic nghiệp vụ chính — Inventory Adjustment | 24 |
| PAC-EPIC-08 | Epic nghiệp vụ chính — POS Draft Order | 34 |
| PAC-EPIC-19 | Testing/Smoke Test hỗ trợ | 6 |
| PAC-EPIC-21 | Documentation/Traceability hỗ trợ | 1 |
| PAC-EPIC-05 | Cross-sprint hardening cho MedicineBatch | 1 |

---

# 4. Dependency Gate trước khi triển khai

Sprint 4 chỉ được tạo implementation branch khi Sprint 3 đã đạt đầy đủ:

```text
Sprint 3 = Completed
PAC-EPIC-05 = Done
PAC-EPIC-06 = Done
PAC-TASK-102 → PAC-TASK-160 = Done
Ready for Sprint 4 = Yes
Sprint 3 đã merge vào develop
Workspace sạch
```

Các dependency kỹ thuật bắt buộc:

- `Medicine`
- `MedicineBatch`
- `Supplier`
- Inventory Summary
- Sellable quantity
- Expired batch exclusion
- Stock Import transaction
- AuthGuard
- PermissionsGuard
- Admin, Staff và Warehouse role mappings
- Frontend permission helper

Nếu dependency chưa đạt:

- Không sửa business code Sprint 4.
- Không tạo implementation branch Sprint 4.
- Ghi dependency còn thiếu vào audit.
- Không tạo workaround làm sai source of truth.

---

# 5. Baseline nghiệp vụ bắt buộc

## 5.1. Inventory Adjustment

1. `MedicineBatch` tiếp tục là inventory source of truth.
2. Không điều chỉnh aggregate inventory.
3. Không có public API sửa trực tiếp `MedicineBatch.quantity`.
4. Adjustment phải tác động đến một MedicineBatch cụ thể.
5. Adjustment bắt đầu ở trạng thái Draft.
6. Draft chưa được phép làm thay đổi MedicineBatch.
7. Reason là bắt buộc và phải được trim.
8. Quantity adjustment phải lớn hơn 0.
9. Adjustment phải xác định rõ tăng hoặc giảm.
10. Quantity sau adjustment không được âm.
11. Confirm phải chạy trong database transaction.
12. Một line lỗi phải rollback toàn bộ.
13. Confirmed adjustment phải read-only.
14. Draft adjustment có thể cancel.
15. Cancel Draft không làm thay đổi MedicineBatch.
16. Confirm phải ghi actor, reason, batch, before/after quantity và timestamp.
17. Warehouse có thể create/confirm theo permission.
18. Admin có thể xem lịch sử và review.
19. Staff không được vận hành Inventory Adjustment nếu không có permission.
20. Inventory Summary phải refresh sau confirm.

## 5.2. POS Draft Order

1. POS dùng Draft Order trước checkout.
2. Order status MVP chỉ gồm `DRAFT`, `PAID`, `CANCELLED`.
3. Draft Order chưa trừ MedicineBatch quantity.
4. Draft Order dùng `medicine_id`, không dùng `product_variant_id`.
5. Chỉ medicine active mới được thêm vào đơn.
6. POS chỉ hiển thị sellable stock cần thiết cho bán hàng.
7. Quantity item phải lớn hơn 0.
8. Quantity không được vượt sellable stock tại thời điểm validate.
9. Một order item đại diện cho một medicine trong cùng Draft Order.
10. Tổng tiền Draft Order là phép tính deterministic từ quantity × selling price.
11. Không có coupon, discount hoặc promotion trong MVP Draft Order.
12. Hỗ trợ walk-in/anonymous customer.
13. Không yêu cầu Full Customer Management.
14. Staff chỉ thấy và thao tác order thuộc ownership scope.
15. Admin xem được tất cả order.
16. Warehouse không được truy cập POS.
17. Chỉ Draft Order mới được cancel.
18. PAID hoặc CANCELLED order không được cancel lại.
19. Checkout fail phải giữ lại Draft Order và items.
20. Sprint 4 chỉ chuẩn bị trạng thái/error recovery cho checkout; FEFO, Payment và Invoice thuộc Sprint 6.

## 5.3. Authorization

- Backend là nơi enforce quyền chính thức.
- Frontend chỉ ẩn route/action hỗ trợ UX.
- Admin:
  - quản lý Inventory Adjustment;
  - xem toàn bộ orders;
  - có thể bán hàng như Staff nếu có permission.
- Warehouse:
  - create/confirm Inventory Adjustment;
  - xem Inventory;
  - không truy cập POS.
- Staff:
  - sử dụng POS;
  - chỉ thấy order của mình;
  - không điều chỉnh kho nếu thiếu permission.

---

# 6. Mục tiêu tổng thể và Definition of Done cấp Sprint

Sprint 4 hoàn thành khi:

- Inventory Adjustment schema/API/UI hoạt động.
- Reason được enforce ở backend và frontend.
- Batch before/after preview hoạt động.
- Confirm Adjustment dùng transaction.
- Không cho quantity âm.
- Confirmed Adjustment immutable.
- Draft Adjustment cancel được.
- Audit và history hoạt động.
- Không có đường cập nhật trực tiếp MedicineBatch quantity.
- POS tạo Draft Order được.
- Search active medicine và sellable stock hoạt động.
- Add/update/remove item hoạt động.
- Draft total đúng và không có discount/coupon.
- Walk-in customer hoạt động.
- Staff ownership và Admin all-orders hoạt động.
- Cancel Draft Order đúng lifecycle.
- Checkout failure không làm mất Draft Order.
- Backend tests, integration tests và frontend build pass.
- Tất cả Task/US/Epic được tích hợp đúng Git workflow.
- `Ready for Sprint 5 = Yes` chỉ được đặt sau final verification.

---

# 7. PAC-EPIC-07 — Inventory Adjustment

| Thuộc tính | Giá trị |
|---|---|
| Logical Epic | PAC-EPIC-07 |
| Jira Key thật | PAC-7 |
| Summary | PAC-EPIC-07 - Inventory Adjustment |
| Component | Inventory Adjustment |
| Priority | High |
| Requirement IDs | REQ-ADJ, REQ-INV |
| Use Case IDs | UC-ADJ |
| Test Case IDs | TC-ADJ |
| Trace IDs | TR-ADJ |
| Primary Story range | US-49 → US-56 |
| Main task range | PAC-TASK-161 → PAC-TASK-190 |

## 7.1. Mục tiêu Epic

Xây dựng workflow điều chỉnh tồn kho chính thức. Epic này bao gồm tạo Inventory Adjustment, chọn MedicineBatch, tăng/giảm số lượng, bắt buộc reason, confirm adjustment, ghi audit log và chặn mọi hành vi sửa trực tiếp quantity trên batch.

## 7.2. Kết quả cần đạt của Epic

- Có schema `InventoryAdjustment` và `InventoryAdjustmentLine`.
- Draft/Confirmed/Cancelled được kiểm soát đúng.
- Mọi adjustment có reason.
- Adjustment tác động MedicineBatch cụ thể.
- Confirm dùng transaction và rollback toàn bộ khi lỗi.
- Quantity không thể âm.
- Confirmed adjustment read-only.
- Có list, detail, history, cancel Draft và audit metadata.
- Warehouse/Admin permission đúng.
- Inventory Summary refresh sau confirm.
- Không có public direct MedicineBatch quantity update.
- Có automated tests, smoke test và traceability.

---
# 9. US-49 — Tạo Inventory Adjustment

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | PAC-88 |
| Parent Epic | PAC-EPIC-07 - Inventory Adjustment |
| Component | Inventory Adjustment |
| Priority | High |
| Story Point | 5 |
| Labels | inventory-adjustment, mvp |
| Số Task liên kết trong Sprint 4 | 5 |

## Mục tiêu User Story

Nhóm cần xây dựng chức năng tạo phiếu điều chỉnh tồn kho.

## Acceptance Criteria

- Admin/Warehouse tạo adjustment.
- Chọn batch cần điều chỉnh.
- Nhập số lượng tăng/giảm.
- Chưa confirm thì chưa đổi batch.

## Skill trọng tâm

- `karpathy-principles`
- `writing-plans`
- `ecc-backend`
- `ecc-database`
- `tdd`
- `ecc-testing`
- `ecc-frontend`
- `modern-web-guidance`
- `design-system-guide`

## Danh sách Task

| Task | Jira Key | Parent Epic | Component | Priority | Nội dung |
|---|---|---|---|---|---|
| PAC-TASK-161 | PAC-371 | PAC-EPIC-07 | Inventory Adjustment | High | Create inventory_adjustments Prisma model |
| PAC-TASK-162 | PAC-372 | PAC-EPIC-07 | Inventory Adjustment | High | Create inventory_adjustment_lines Prisma model |
| PAC-TASK-163 | PAC-373 | PAC-EPIC-07 | Inventory Adjustment | High | Implement create Inventory Adjustment API |
| PAC-TASK-164 | PAC-374 | PAC-EPIC-07 | Inventory Adjustment | Medium | Build create Inventory Adjustment screen |
| PAC-TASK-166 | PAC-376 | PAC-EPIC-07 | Inventory Adjustment | High | Validate adjustment type and quantity |

### PAC-TASK-161 — Create inventory_adjustments Prisma model

- **Jira Key thật:** `PAC-371`
- **Jira Parent:** `US-49` / `PAC-EPIC-07`
- **Component:** Inventory Adjustment
- **Priority:** High
- **Branch đề xuất:** `feature/PAC-371-T-161-create-inventory-adjustments-prisma-model`
- **Mục đích:** Nhóm cần tạo model phiếu điều chỉnh tồn kho.

#### Nội dung công việc

- Tạo model `InventoryAdjustment`.
- Thêm actor, status, reason, created_at, confirmed_at.
- Liên kết với adjustment lines.
- Chuẩn bị status Draft/Confirmed/Cancelled nếu cần.
- Tạo migration.

#### Kết quả cần đạt

- Database lưu được phiếu điều chỉnh.
- Mỗi adjustment có reason.
- Có thể trace ai tạo/confirm.
- Không sửa trực tiếp MedicineBatch.

### PAC-TASK-162 — Create inventory_adjustment_lines Prisma model

- **Jira Key thật:** `PAC-372`
- **Jira Parent:** `US-49` / `PAC-EPIC-07`
- **Component:** Inventory Adjustment
- **Priority:** High
- **Branch đề xuất:** `feature/PAC-372-T-162-create-inventory-adjustment-lines-prisma-model`
- **Mục đích:** Nhóm cần tạo model dòng điều chỉnh tồn kho.

#### Nội dung công việc

- Tạo model `InventoryAdjustmentLine`.
- Liên kết với `InventoryAdjustment`.
- Liên kết với `MedicineBatch`.
- Lưu adjustment type hoặc quantity delta.
- Chuẩn bị lưu quantity trước/sau nếu cần audit.

#### Kết quả cần đạt

- Một phiếu adjustment có thể có dòng batch cụ thể.
- Adjustment tác động đúng MedicineBatch.
- Dữ liệu đủ để audit.
- Không điều chỉnh aggregate inventory.

### PAC-TASK-163 — Implement create Inventory Adjustment API

- **Jira Key thật:** `PAC-373`
- **Jira Parent:** `US-49` / `PAC-EPIC-07`
- **Component:** Inventory Adjustment
- **Priority:** High
- **Branch đề xuất:** `feature/PAC-373-T-163-implement-create-inventory-adjustment-api`
- **Mục đích:** Nhóm cần tạo API tạo phiếu điều chỉnh tồn kho.

#### Nội dung công việc

- Tạo endpoint create adjustment.
- Kiểm tra permission Admin/Warehouse.
- Nhận reason và danh sách batch cần điều chỉnh.
- Validate input cơ bản.
- Lưu adjustment ở trạng thái Draft.

#### Kết quả cần đạt

- User có quyền tạo được adjustment.
- Chưa confirm thì chưa đổi MedicineBatch.
- Reason được lưu.
- Dữ liệu sẵn sàng cho confirm.

### PAC-TASK-164 — Build create Inventory Adjustment screen

- **Jira Key thật:** `PAC-374`
- **Jira Parent:** `US-49` / `PAC-EPIC-07`
- **Component:** Inventory Adjustment
- **Priority:** Medium
- **Branch đề xuất:** `feature/PAC-374-T-164-build-create-inventory-adjustment-screen`
- **Mục đích:** Nhóm cần tạo màn hình tạo Inventory Adjustment.

#### Nội dung công việc

- Tạo form nhập reason.
- Cho phép chọn batch.
- Cho phép nhập số lượng điều chỉnh.
- Hiển thị preview nếu có.
- Gọi API tạo adjustment.

#### Kết quả cần đạt

- Warehouse/Admin tạo được adjustment từ UI.
- Form rõ ràng.
- Reason là bắt buộc.
- Không có chức năng sửa trực tiếp batch quantity.

### PAC-TASK-166 — Validate adjustment type and quantity

- **Jira Key thật:** `PAC-376`
- **Jira Parent:** `US-49` / `PAC-EPIC-07`
- **Component:** Inventory Adjustment
- **Priority:** High
- **Branch đề xuất:** `feature/PAC-376-T-166-validate-adjustment-type-and-quantity`
- **Mục đích:** Nhóm cần validate loại điều chỉnh và số lượng điều chỉnh.

#### Nội dung công việc

- Xác định adjustment tăng hoặc giảm.
- Validate quantity lớn hơn 0.
- Validate delta hợp lệ.
- Không cho dữ liệu rỗng hoặc sai format.
- Trả lỗi rõ ràng.

#### Kết quả cần đạt

- Adjustment line hợp lệ.
- Không lưu quantity sai.
- UI/API thống nhất validation.
- Chuẩn bị cho rule không âm.

---

# 10. US-50 — Adjustment bắt buộc reason

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | PAC-89 |
| Parent Epic | PAC-EPIC-07 - Inventory Adjustment |
| Component | Inventory Adjustment |
| Priority | Highest |
| Story Point | 3 |
| Labels | reason, validation, mvp |
| Số Task liên kết trong Sprint 4 | 3 |

## Mục tiêu User Story

Nhóm cần bắt buộc lý do khi điều chỉnh tồn kho.

## Acceptance Criteria

- Reason là trường bắt buộc.
- Không cho confirm nếu thiếu reason.
- Reason hiển thị trong detail.
- Reason được audit.

## Skill trọng tâm

- `karpathy-principles`
- `writing-plans`
- `ecc-backend`
- `ecc-database`
- `tdd`
- `ecc-testing`
- `ecc-frontend`
- `modern-web-guidance`
- `design-system-guide`

## Danh sách Task

| Task | Jira Key | Parent Epic | Component | Priority | Nội dung |
|---|---|---|---|---|---|
| PAC-TASK-167 | PAC-377 | PAC-EPIC-07 | Inventory Adjustment | Highest | Enforce required adjustment reason in backend |
| PAC-TASK-168 | PAC-378 | PAC-EPIC-07 | Inventory Adjustment | High | Add required reason validation in UI |
| PAC-TASK-183 | PAC-393 | PAC-EPIC-19 | Testing & Setup | High | Add tests for required adjustment reason |

### PAC-TASK-167 — Enforce required adjustment reason in backend

- **Jira Key thật:** `PAC-377`
- **Jira Parent:** `US-50` / `PAC-EPIC-07`
- **Component:** Inventory Adjustment
- **Priority:** Highest
- **Branch đề xuất:** `feature/PAC-377-T-167-enforce-required-adjustment-reason-in-backend`
- **Mục đích:** Nhóm cần enforce reason bắt buộc ở backend.

#### Nội dung công việc

- Validate `reason` không null/rỗng.
- Trim reason.
- Reject confirm hoặc create nếu thiếu reason.
- Trả lỗi 400 rõ ràng.
- Viết test cho reason rỗng.

#### Kết quả cần đạt

- Mọi adjustment có lý do.
- Audit tồn kho rõ ràng.
- Không thể điều chỉnh kho không giải thích.
- Rule được enforce ở backend.

### PAC-TASK-168 — Add required reason validation in UI

- **Jira Key thật:** `PAC-378`
- **Jira Parent:** `US-50` / `PAC-EPIC-07`
- **Component:** Inventory Adjustment
- **Priority:** High
- **Branch đề xuất:** `feature/PAC-378-T-168-add-required-reason-validation-in-ui`
- **Mục đích:** Nhóm cần thêm validation reason trên UI.

#### Nội dung công việc

- Đánh dấu reason là bắt buộc.
- Không cho submit nếu reason rỗng.
- Hiển thị lỗi ngay trên form.
- Trim input trước khi gửi.
- Đồng bộ với backend validation.

#### Kết quả cần đạt

- User biết cần nhập lý do.
- Giảm request lỗi.
- UI rõ nghiệp vụ.
- Adjustment data có reason đầy đủ.

### PAC-TASK-183 — Add tests for required adjustment reason

- **Jira Key thật:** `PAC-393`
- **Jira Parent:** `US-50` / `PAC-EPIC-19`
- **Component:** Testing & Setup
- **Priority:** High
- **Branch đề xuất:** `test/PAC-393-T-183-add-tests-for-required-adjustment-reason`
- **Mục đích:** Nhóm cần viết test cho reason bắt buộc.

#### Nội dung công việc

- Test create adjustment thiếu reason.
- Test confirm adjustment thiếu reason.
- Test reason chỉ khoảng trắng.
- Test reason hợp lệ.
- Kiểm tra response lỗi.

#### Kết quả cần đạt

- Adjustment không thể thiếu reason.
- Backend validation có test.
- UI/backend đồng bộ.
- Audit workflow đúng baseline.

---

# 11. US-51 — Chọn MedicineBatch cần điều chỉnh

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | PAC-90 |
| Parent Epic | PAC-EPIC-07 - Inventory Adjustment |
| Component | Inventory Adjustment |
| Priority | High |
| Story Point | 3 |
| Labels | medicinebatch, adjustment, mvp |
| Số Task liên kết trong Sprint 4 | 2 |

## Mục tiêu User Story

Nhóm cần đảm bảo adjustment tác động đến batch cụ thể.

## Acceptance Criteria

- User chọn MedicineBatch.
- Hiển thị thông tin batch trước khi điều chỉnh.
- Không điều chỉnh aggregate inventory.
- Batch inactive/không hợp lệ bị chặn nếu cần.

## Skill trọng tâm

- `karpathy-principles`
- `writing-plans`
- `ecc-backend`
- `ecc-database`
- `tdd`
- `ecc-testing`
- `ecc-frontend`
- `modern-web-guidance`
- `design-system-guide`

## Danh sách Task

| Task | Jira Key | Parent Epic | Component | Priority | Nội dung |
|---|---|---|---|---|---|
| PAC-TASK-165 | PAC-375 | PAC-EPIC-07 | Inventory Adjustment | Medium | Build MedicineBatch selector for adjustment |
| PAC-TASK-169 | PAC-379 | PAC-EPIC-07 | Inventory Adjustment | Medium | Show batch before/after quantity preview |

### PAC-TASK-165 — Build MedicineBatch selector for adjustment

- **Jira Key thật:** `PAC-375`
- **Jira Parent:** `US-51` / `PAC-EPIC-07`
- **Component:** Inventory Adjustment
- **Priority:** Medium
- **Branch đề xuất:** `feature/PAC-375-T-165-build-medicinebatch-selector-for-adjustment`
- **Mục đích:** Nhóm cần xây dựng component chọn batch để điều chỉnh.

#### Nội dung công việc

- Tìm kiếm MedicineBatch theo thuốc/batch number.
- Hiển thị medicine, batch number, expiry date, quantity hiện tại.
- Chỉ chọn batch hợp lệ.
- Gắn batch vào adjustment line.
- Xử lý empty/loading/error.

#### Kết quả cần đạt

- User chọn đúng batch cần điều chỉnh.
- Không điều chỉnh nhầm thuốc.
- UI rõ thông tin batch.
- Dữ liệu gửi API chính xác.

### PAC-TASK-169 — Show batch before/after quantity preview

- **Jira Key thật:** `PAC-379`
- **Jira Parent:** `US-51` / `PAC-EPIC-07`
- **Component:** Inventory Adjustment
- **Priority:** Medium
- **Branch đề xuất:** `feature/PAC-379-T-169-show-batch-before-after-quantity-preview`
- **Mục đích:** Nhóm cần hiển thị preview số lượng batch trước và sau điều chỉnh.

#### Nội dung công việc

- Lấy quantity hiện tại của batch.
- Tính quantity sau adjustment.
- Hiển thị before/after trong UI.
- Cảnh báo nếu quantity sau điều chỉnh âm.
- Cập nhật preview khi user đổi quantity.

#### Kết quả cần đạt

- User thấy ảnh hưởng trước khi confirm.
- Giảm lỗi điều chỉnh nhầm.
- UI minh bạch hơn.
- Quantity âm được cảnh báo sớm.

---

# 12. US-52 — Confirm Inventory Adjustment transaction

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | PAC-91 |
| Parent Epic | PAC-EPIC-07 - Inventory Adjustment |
| Component | Inventory Adjustment |
| Priority | High |
| Story Point | 5 |
| Labels | confirm, transaction, mvp |
| Số Task liên kết trong Sprint 4 | 4 |

## Mục tiêu User Story

Nhóm cần xử lý confirm adjustment bằng transaction.

## Acceptance Criteria

- Confirm adjustment cập nhật MedicineBatch.
- Không partial update nếu có lỗi.
- Adjustment confirmed bị khóa.
- Ghi audit confirm.

## Skill trọng tâm

- `karpathy-principles`
- `writing-plans`
- `ecc-backend`
- `ecc-database`
- `tdd`
- `ecc-testing`
- `ecc-security`

## Danh sách Task

| Task | Jira Key | Parent Epic | Component | Priority | Nội dung |
|---|---|---|---|---|---|
| PAC-TASK-170 | PAC-380 | PAC-EPIC-07 | Inventory Adjustment | High | Implement confirm Inventory Adjustment transaction |
| PAC-TASK-171 | PAC-381 | PAC-EPIC-07 | Inventory Adjustment | Highest | Update MedicineBatch through adjustment transaction only |
| PAC-TASK-173 | PAC-383 | PAC-EPIC-07 | Inventory Adjustment | Medium | Lock confirmed Inventory Adjustment |
| PAC-TASK-188 | PAC-398 | PAC-EPIC-07 | Inventory Adjustment | Medium | Refresh Inventory Summary after adjustment confirm |

### PAC-TASK-170 — Implement confirm Inventory Adjustment transaction

- **Jira Key thật:** `PAC-380`
- **Jira Parent:** `US-52` / `PAC-EPIC-07`
- **Component:** Inventory Adjustment
- **Priority:** High
- **Branch đề xuất:** `feature/PAC-380-T-170-implement-confirm-inventory-adjustment-transaction`
- **Mục đích:** Nhóm cần triển khai transaction xác nhận adjustment.

#### Nội dung công việc

- Kiểm tra adjustment còn Draft.
- Validate reason và lines.
- Trong transaction, cập nhật MedicineBatch.
- Ghi status Confirmed.
- Rollback nếu một line lỗi.

#### Kết quả cần đạt

- Adjustment confirm cập nhật batch đúng.
- Không có partial update.
- Adjustment confirmed bị khóa.
- Dữ liệu tồn kho nhất quán.

### PAC-TASK-171 — Update MedicineBatch through adjustment transaction only

- **Jira Key thật:** `PAC-381`
- **Jira Parent:** `US-52` / `PAC-EPIC-07`
- **Component:** Inventory Adjustment
- **Priority:** Highest
- **Branch đề xuất:** `feature/PAC-381-T-171-update-medicinebatch-through-adjustment-transaction-only`
- **Mục đích:** Nhóm cần đảm bảo MedicineBatch chỉ được cập nhật qua transaction hợp lệ.

#### Nội dung công việc

- Cập nhật quantity trong confirm adjustment.
- Không expose direct update quantity.
- Ghi actor và reason.
- Kiểm tra service khác không gọi update tùy tiện.
- Rà soát code liên quan.

#### Kết quả cần đạt

- MedicineBatch quantity có trace.
- Không sửa kho ngoài workflow.
- Baseline audit được bảo vệ.
- Dữ liệu tồn kho đáng tin.

#### Guardrail / Agent Notes

- Không tạo API `PATCH /batches/{id}/quantity`.
- Quantity chỉ thay đổi qua import, adjustment, checkout.

### PAC-TASK-173 — Lock confirmed Inventory Adjustment

- **Jira Key thật:** `PAC-383`
- **Jira Parent:** `US-52` / `PAC-EPIC-07`
- **Component:** Inventory Adjustment
- **Priority:** Medium
- **Branch đề xuất:** `feature/PAC-383-T-173-lock-confirmed-inventory-adjustment`
- **Mục đích:** Nhóm cần khóa adjustment sau khi confirmed.

#### Nội dung công việc

- Không cho update/delete adjustment confirmed.
- UI hiển thị read-only.
- Backend reject thao tác sửa.
- Không cho confirm lại.
- Test confirmed immutability.

#### Kết quả cần đạt

- Adjustment confirmed không bị sửa.
- Audit tồn kho đáng tin.
- Không cập nhật batch lần hai.
- Dữ liệu ổn định.

### PAC-TASK-188 — Refresh Inventory Summary after adjustment confirm

- **Jira Key thật:** `PAC-398`
- **Jira Parent:** `US-52` / `PAC-EPIC-07`
- **Component:** Inventory Adjustment
- **Priority:** Medium
- **Branch đề xuất:** `feature/PAC-398-T-188-refresh-inventory-summary-after-adjustment-confirm`
- **Mục đích:** Nhóm cần cập nhật Inventory Summary sau khi adjustment confirm.

#### Nội dung công việc

- Sau confirm adjustment, refetch inventory summary.
- Cập nhật quantity hiển thị.
- Cập nhật low-stock/near-expiry nếu bị ảnh hưởng.
- Xử lý loading/error.
- Không cần realtime trong MVP.

#### Kết quả cần đạt

- UI tồn kho phản ánh adjustment mới.
- User không phải reload thủ công nếu có thể.
- Dữ liệu hiển thị nhất quán.
- Demo mượt hơn.

---

# 13. US-53 — Chặn adjustment làm quantity âm

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | PAC-92 |
| Parent Epic | PAC-EPIC-07 - Inventory Adjustment |
| Component | Inventory Adjustment |
| Priority | High |
| Story Point | 3 |
| Labels | validation, negative-stock, mvp |
| Số Task liên kết trong Sprint 4 | 2 |

## Mục tiêu User Story

Nhóm cần ngăn điều chỉnh khiến batch quantity âm.

## Acceptance Criteria

- Backend kiểm tra quantity sau adjustment >= 0.
- UI hiển thị lỗi nếu vượt quá số lượng.
- Không lưu adjustment không hợp lệ.
- Test case có negative quantity.

## Skill trọng tâm

- `karpathy-principles`
- `writing-plans`
- `ecc-backend`
- `ecc-database`
- `tdd`
- `ecc-testing`
- `ecc-security`

## Danh sách Task

| Task | Jira Key | Parent Epic | Component | Priority | Nội dung |
|---|---|---|---|---|---|
| PAC-TASK-172 | PAC-382 | PAC-EPIC-07 | Inventory Adjustment | High | Prevent adjustment from making quantity negative |
| PAC-TASK-182 | PAC-392 | PAC-EPIC-19 | Testing & Setup | High | Add tests for negative quantity adjustment |

### PAC-TASK-172 — Prevent adjustment from making quantity negative

- **Jira Key thật:** `PAC-382`
- **Jira Parent:** `US-53` / `PAC-EPIC-07`
- **Component:** Inventory Adjustment
- **Priority:** High
- **Branch đề xuất:** `feature/PAC-382-T-172-prevent-adjustment-from-making-quantity-negative`
- **Mục đích:** Nhóm cần chặn adjustment khiến batch quantity âm.

#### Nội dung công việc

- Tính quantity sau adjustment.
- Nếu nhỏ hơn 0, reject transaction.
- Trả lỗi rõ cho user.
- UI hiển thị warning.
- Viết test case giảm quá số lượng.

#### Kết quả cần đạt

- Không có MedicineBatch quantity âm.
- Adjustment fail đúng khi dữ liệu không hợp lệ.
- Transaction rollback.
- Tồn kho ổn định.

### PAC-TASK-182 — Add tests for negative quantity adjustment

- **Jira Key thật:** `PAC-392`
- **Jira Parent:** `US-53` / `PAC-EPIC-19`
- **Component:** Testing & Setup
- **Priority:** High
- **Branch đề xuất:** `test/PAC-392-T-182-add-tests-for-negative-quantity-adjustment`
- **Mục đích:** Nhóm cần viết test chặn adjustment làm quantity âm.

#### Nội dung công việc

- Seed batch có quantity cụ thể.
- Tạo adjustment giảm vượt quantity.
- Confirm và kiểm tra bị reject.
- Kiểm tra batch không thay đổi.
- Kiểm tra lỗi trả về rõ ràng.

#### Kết quả cần đạt

- Không có batch âm.
- Rule quan trọng có test.
- Transaction rollback đúng.
- CI bảo vệ tồn kho.

---

# 14. US-54 — Warehouse tạo và confirm adjustment

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | PAC-93 |
| Parent Epic | PAC-EPIC-07 - Inventory Adjustment |
| Component | Inventory Adjustment |
| Priority | Medium |
| Story Point | 3 |
| Labels | warehouse, permission, mvp |
| Số Task liên kết trong Sprint 4 | 2 |

## Mục tiêu User Story

Nhóm cần cho Warehouse thực hiện adjustment theo quyền đã chốt.

## Acceptance Criteria

- Warehouse có quyền create/confirm adjustment.
- Warehouse không sửa trực tiếp batch quantity.
- Admin vẫn xem được lịch sử.
- Permission được enforce ở backend.

## Skill trọng tâm

- `karpathy-principles`
- `writing-plans`
- `ecc-backend`
- `ecc-database`
- `tdd`
- `ecc-testing`
- `ecc-security`

## Danh sách Task

| Task | Jira Key | Parent Epic | Component | Priority | Nội dung |
|---|---|---|---|---|---|
| PAC-TASK-178 | PAC-388 | PAC-EPIC-07 | Inventory Adjustment | Medium | Add Warehouse permission for create/confirm adjustment |
| PAC-TASK-184 | PAC-394 | PAC-EPIC-19 | Testing & Setup | Medium | Add tests for Warehouse adjustment permission |

### PAC-TASK-178 — Add Warehouse permission for create/confirm adjustment

- **Jira Key thật:** `PAC-388`
- **Jira Parent:** `US-54` / `PAC-EPIC-07`
- **Component:** Inventory Adjustment
- **Priority:** Medium
- **Branch đề xuất:** `feature/PAC-388-T-178-add-warehouse-permission-for-create-confirm-adjustment`
- **Mục đích:** Nhóm cần cấu hình permission cho Warehouse tạo và confirm adjustment.

#### Nội dung công việc

- Gán permission adjustment create/confirm cho Warehouse.
- Kiểm tra backend guard.
- Đảm bảo Warehouse không sửa trực tiếp quantity.
- Test Warehouse confirm adjustment.
- Không mở quyền không liên quan.

#### Kết quả cần đạt

- Warehouse thực hiện workflow adjustment đúng.
- Backend enforce quyền.
- Không vượt scope.
- Admin vẫn xem và quản lý được.

### PAC-TASK-184 — Add tests for Warehouse adjustment permission

- **Jira Key thật:** `PAC-394`
- **Jira Parent:** `US-54` / `PAC-EPIC-19`
- **Component:** Testing & Setup
- **Priority:** Medium
- **Branch đề xuất:** `test/PAC-394-T-184-add-tests-for-warehouse-adjustment-permission`
- **Mục đích:** Nhóm cần viết test permission cho Warehouse adjustment.

#### Nội dung công việc

- Test Warehouse tạo adjustment.
- Test Warehouse confirm adjustment.
- Test Warehouse không sửa batch trực tiếp.
- Test Staff bị chặn nếu không có quyền.
- Test Admin xem lịch sử.

#### Kết quả cần đạt

- Phân quyền adjustment đúng.
- Warehouse có đúng quyền đã chốt.
- Không mở rộng quyền sai.
- Security test rõ ràng.

---

# 15. US-55 — Audit Inventory Adjustment

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | PAC-94 |
| Parent Epic | PAC-EPIC-07 - Inventory Adjustment |
| Component | Inventory Adjustment |
| Priority | Medium |
| Story Point | 3 |
| Labels | audit, adjustment, mvp |
| Số Task liên kết trong Sprint 4 | 2 |

## Mục tiêu User Story

Nhóm cần ghi nhật ký điều chỉnh tồn kho.

## Acceptance Criteria

- Ghi actor, reason, batch, quantity trước/sau.
- Audit không chỉnh sửa được qua UI.
- Có thể truy vết khi kiểm tra tồn kho.
- Không bỏ audit khi confirm.

## Skill trọng tâm

- `karpathy-principles`
- `writing-plans`
- `ecc-backend`
- `ecc-database`
- `tdd`
- `ecc-testing`
- `ecc-frontend`
- `modern-web-guidance`
- `design-system-guide`
- `ecc-security`

## Danh sách Task

| Task | Jira Key | Parent Epic | Component | Priority | Nội dung |
|---|---|---|---|---|---|
| PAC-TASK-180 | PAC-390 | PAC-EPIC-07 | Inventory Adjustment | Medium | Write audit log for Inventory Adjustment |
| PAC-TASK-181 | PAC-391 | PAC-EPIC-07 | Inventory Adjustment | Low | Display adjustment audit information in UI |

### PAC-TASK-180 — Write audit log for Inventory Adjustment

- **Jira Key thật:** `PAC-390`
- **Jira Parent:** `US-55` / `PAC-EPIC-07`
- **Component:** Inventory Adjustment
- **Priority:** Medium
- **Branch đề xuất:** `feature/PAC-390-T-180-write-audit-log-for-inventory-adjustment`
- **Mục đích:** Nhóm cần ghi audit log khi adjustment được confirm.

#### Nội dung công việc

- Ghi actor.
- Ghi reason.
- Ghi batch affected.
- Ghi quantity before/after hoặc delta.
- Ghi thời gian confirm.

#### Kết quả cần đạt

- Adjustment có audit đầy đủ.
- Có thể truy vết thay đổi tồn kho.
- Dữ liệu phục vụ kiểm tra.
- Không cần sửa trực tiếp batch để biết lý do.

### PAC-TASK-181 — Display adjustment audit information in UI

- **Jira Key thật:** `PAC-391`
- **Jira Parent:** `US-55` / `PAC-EPIC-07`
- **Component:** Inventory Adjustment
- **Priority:** Low
- **Branch đề xuất:** `feature/PAC-391-T-181-display-adjustment-audit-information-in-ui`
- **Mục đích:** Nhóm cần hiển thị thông tin audit cơ bản trong UI adjustment.

#### Nội dung công việc

- Hiển thị người tạo/confirm.
- Hiển thị thời gian tạo/confirm.
- Hiển thị reason.
- Hiển thị quantity delta.
- Không hiển thị dữ liệu nhạy cảm.

#### Kết quả cần đạt

- User hiểu adjustment được thực hiện khi nào và bởi ai.
- Admin review dễ hơn.
- UI minh bạch.
- Phù hợp mục tiêu audit.

---

# 16. US-56 — Admin xem lịch sử adjustment

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | PAC-95 |
| Parent Epic | PAC-EPIC-07 - Inventory Adjustment |
| Component | Inventory Adjustment |
| Priority | Medium |
| Story Point | 2 |
| Labels | admin, history, mvp |
| Số Task liên kết trong Sprint 4 | 9 |

## Mục tiêu User Story

Nhóm cần cho Admin xem lịch sử điều chỉnh tồn kho.

## Acceptance Criteria

- Admin xem danh sách adjustment.
- Có filter cơ bản nếu cần.
- Hiển thị reason và người thực hiện.
- Warehouse chỉ xem theo quyền nếu được cho phép.

## Skill trọng tâm

- `karpathy-principles`
- `writing-plans`
- `ecc-backend`
- `ecc-database`
- `tdd`
- `ecc-testing`
- `ecc-frontend`
- `modern-web-guidance`
- `design-system-guide`
- `ecc-security`

## Danh sách Task

| Task | Jira Key | Parent Epic | Component | Priority | Nội dung |
|---|---|---|---|---|---|
| PAC-TASK-174 | PAC-384 | PAC-EPIC-07 | Inventory Adjustment | Medium | Create Inventory Adjustment list API |
| PAC-TASK-175 | PAC-385 | PAC-EPIC-07 | Inventory Adjustment | Medium | Build Inventory Adjustment history list UI |
| PAC-TASK-176 | PAC-386 | PAC-EPIC-07 | Inventory Adjustment | Medium | Implement Inventory Adjustment detail API |
| PAC-TASK-177 | PAC-387 | PAC-EPIC-07 | Inventory Adjustment | Medium | Build Inventory Adjustment detail screen |
| PAC-TASK-179 | PAC-389 | PAC-EPIC-07 | Inventory Adjustment | Medium | Add Admin permission for adjustment history and review |
| PAC-TASK-186 | PAC-396 | PAC-EPIC-07 | Inventory Adjustment | Medium | Implement cancel Draft Inventory Adjustment API |
| PAC-TASK-187 | PAC-397 | PAC-EPIC-07 | Inventory Adjustment | Low | Build cancel Draft Inventory Adjustment UI |
| PAC-TASK-189 | PAC-399 | PAC-EPIC-19 | Testing & Setup | Medium | Add Inventory Adjustment smoke test checklist |
| PAC-TASK-190 | PAC-400 | PAC-EPIC-21 | Documentation | Low | Add Inventory Adjustment traceability notes |

### PAC-TASK-174 — Create Inventory Adjustment list API

- **Jira Key thật:** `PAC-384`
- **Jira Parent:** `US-56` / `PAC-EPIC-07`
- **Component:** Inventory Adjustment
- **Priority:** Medium
- **Branch đề xuất:** `feature/PAC-384-T-174-create-inventory-adjustment-list-api`
- **Mục đích:** Nhóm cần tạo API danh sách adjustment.

#### Nội dung công việc

- Tạo endpoint list adjustment.
- Hỗ trợ pagination.
- Hỗ trợ filter theo status/date nếu đơn giản.
- Kiểm tra permission.
- Trả dữ liệu tóm tắt.

#### Kết quả cần đạt

- Admin/Warehouse xem được danh sách adjustment theo quyền.
- UI history có dữ liệu.
- API không trả quá nhiều dữ liệu.
- Dễ trace adjustment.

### PAC-TASK-175 — Build Inventory Adjustment history list UI

- **Jira Key thật:** `PAC-385`
- **Jira Parent:** `US-56` / `PAC-EPIC-07`
- **Component:** Inventory Adjustment
- **Priority:** Medium
- **Branch đề xuất:** `feature/PAC-385-T-175-build-inventory-adjustment-history-list-ui`
- **Mục đích:** Nhóm cần tạo UI lịch sử adjustment.

#### Nội dung công việc

- Hiển thị danh sách adjustment.
- Hiển thị reason, status, actor, created_at.
- Thêm filter cơ bản nếu có.
- Link tới detail.
- Xử lý loading/empty/error.

#### Kết quả cần đạt

- Admin xem được lịch sử điều chỉnh.
- Warehouse xem theo quyền nếu được phép.
- UI hỗ trợ kiểm tra kho.
- Lịch sử adjustment minh bạch.

### PAC-TASK-176 — Implement Inventory Adjustment detail API

- **Jira Key thật:** `PAC-386`
- **Jira Parent:** `US-56` / `PAC-EPIC-07`
- **Component:** Inventory Adjustment
- **Priority:** Medium
- **Branch đề xuất:** `feature/PAC-386-T-176-implement-inventory-adjustment-detail-api`
- **Mục đích:** Nhóm cần tạo API chi tiết adjustment.

#### Nội dung công việc

- Tạo endpoint detail adjustment.
- Trả header adjustment và lines.
- Trả batch liên quan.
- Trả reason và audit metadata.
- Kiểm tra permission.

#### Kết quả cần đạt

- UI detail hiển thị đủ dữ liệu.
- Có thể kiểm tra batch nào bị điều chỉnh.
- Không lộ dữ liệu sai quyền.
- Dữ liệu phục vụ audit.

### PAC-TASK-177 — Build Inventory Adjustment detail screen

- **Jira Key thật:** `PAC-387`
- **Jira Parent:** `US-56` / `PAC-EPIC-07`
- **Component:** Inventory Adjustment
- **Priority:** Medium
- **Branch đề xuất:** `feature/PAC-387-T-177-build-inventory-adjustment-detail-screen`
- **Mục đích:** Nhóm cần tạo màn hình chi tiết adjustment.

#### Nội dung công việc

- Hiển thị reason, status, actor.
- Hiển thị từng batch và quantity điều chỉnh.
- Hiển thị before/after nếu có.
- Read-only nếu confirmed.
- Hiển thị action confirm/cancel nếu còn Draft.

#### Kết quả cần đạt

- User xem được chi tiết adjustment.
- Luồng confirm/cancel rõ ràng.
- Dữ liệu batch minh bạch.
- UI phù hợp workflow.

### PAC-TASK-179 — Add Admin permission for adjustment history and review

- **Jira Key thật:** `PAC-389`
- **Jira Parent:** `US-56` / `PAC-EPIC-07`
- **Component:** Inventory Adjustment
- **Priority:** Medium
- **Branch đề xuất:** `feature/PAC-389-T-179-add-admin-permission-for-adjustment-history-and-review`
- **Mục đích:** Nhóm cần đảm bảo Admin xem được lịch sử adjustment.

#### Nội dung công việc

- Gán permission view/review adjustment cho Admin.
- Kiểm tra list/detail API.
- UI hiển thị menu phù hợp.
- Admin xem tất cả adjustment.
- Test permission.

#### Kết quả cần đạt

- Admin có quyền giám sát điều chỉnh kho.
- Staff không thấy adjustment nếu không có quyền.
- Phân quyền rõ ràng.
- Audit workflow dễ review.

### PAC-TASK-186 — Implement cancel Draft Inventory Adjustment API

- **Jira Key thật:** `PAC-396`
- **Jira Parent:** `US-56` / `PAC-EPIC-07`
- **Component:** Inventory Adjustment
- **Priority:** Medium
- **Branch đề xuất:** `feature/PAC-396-T-186-implement-cancel-draft-inventory-adjustment-api`
- **Mục đích:** Nhóm cần tạo API hủy adjustment khi còn Draft.

#### Nội dung công việc

- Tạo endpoint cancel adjustment.
- Chỉ cho cancel khi status Draft.
- Không cập nhật MedicineBatch.
- Ghi status Cancelled.
- Kiểm tra permission.

#### Kết quả cần đạt

- User hủy được adjustment chưa confirm.
- Confirmed adjustment không bị hủy.
- Batch quantity không thay đổi khi cancel.
- Workflow có đủ trạng thái cơ bản.

### PAC-TASK-187 — Build cancel Draft Inventory Adjustment UI

- **Jira Key thật:** `PAC-397`
- **Jira Parent:** `US-56` / `PAC-EPIC-07`
- **Component:** Inventory Adjustment
- **Priority:** Low
- **Branch đề xuất:** `feature/PAC-397-T-187-build-cancel-draft-inventory-adjustment-ui`
- **Mục đích:** Nhóm cần thêm UI hủy adjustment Draft.

#### Nội dung công việc

- Thêm nút cancel khi adjustment còn Draft.
- Hiển thị confirm dialog.
- Gọi API cancel.
- Refresh detail/list sau khi cancel.
- Disable action nếu adjustment confirmed.

#### Kết quả cần đạt

- User hủy adjustment Draft dễ dàng.
- Không hủy nhầm adjustment đã confirm.
- UI rõ trạng thái.
- Workflow đầy đủ hơn.

### PAC-TASK-189 — Add Inventory Adjustment smoke test checklist

- **Jira Key thật:** `PAC-399`
- **Jira Parent:** `US-56` / `PAC-EPIC-19`
- **Component:** Testing & Setup
- **Priority:** Medium
- **Branch đề xuất:** `test/PAC-399-T-189-add-inventory-adjustment-smoke-test-checklist`
- **Mục đích:** Nhóm cần viết checklist smoke test cho Inventory Adjustment.

#### Nội dung công việc

- Test tạo adjustment.
- Test thiếu reason.
- Test confirm thành công.
- Test quantity âm bị reject.
- Test history/detail.

#### Kết quả cần đạt

- Tester có checklist kiểm tra nhanh.
- Luồng adjustment ổn định trước demo.
- Case lỗi quan trọng được kiểm tra.
- Trace được với Story US-49 → US-56.

### PAC-TASK-190 — Add Inventory Adjustment traceability notes

- **Jira Key thật:** `PAC-400`
- **Jira Parent:** `US-56` / `PAC-EPIC-21`
- **Component:** Documentation
- **Priority:** Low
- **Branch đề xuất:** `docs/PAC-400-T-190-add-inventory-adjustment-traceability-notes`
- **Mục đích:** Nhóm cần ghi chú traceability cho Inventory Adjustment.

#### Nội dung công việc

- Liên kết Task với Story/Requirement/Test.
- Ghi rule reason bắt buộc.
- Ghi rule không sửa quantity trực tiếp.
- Ghi quyền Warehouse/Admin.
- Ghi rule audit.

#### Kết quả cần đạt

- Tài liệu rõ ràng.
- AI agent hiểu đúng workflow.
- Tester biết case cần kiểm tra.
- Không lệch baseline tồn kho.

---

# 17. Cross-sprint Hardening — US-38 / PAC-EPIC-05

`PAC-TASK-185` nằm trong Task range Sprint 4 nhưng Jira parent chính thức vẫn là `US-38 — Chặn sửa trực tiếp quantity trong Batch Detail` thuộc `PAC-EPIC-05 — Inventory & MedicineBatch`.

Task này không được chuyển parent sang PAC-EPIC-07 chỉ để làm đẹp hierarchy.

## Quy tắc tích hợp

- Giữ nguyên Jira relationship từ Task List.
- Audit branch/PR cũ của US-38 và PAC-EPIC-05 trước khi tạo branch.
- Không tạo duplicate branch nếu branch cũ vẫn tồn tại.
- Không merge Task này vào Epic 07.
- Branch plan phải ghi rõ đây là cross-sprint inventory hardening.
- `jira-mapping.md` quyết định Jira Key thật.

### PAC-TASK-185 — Block direct MedicineBatch quantity update service path

- **Jira Key thật:** `PAC-395`
- **Linked Story:** `US-38` — Jira `PAC-77`
- **Parent Epic:** `PAC-EPIC-05` — Jira `PAC-5`
- **Component:** Inventory & MedicineBatch
- **Priority:** Highest
- **Branch đề xuất:** `feature/PAC-395-T-185-block-direct-medicinebatch-quantity-update-service-path`
- **Mục đích:** Nhóm cần chặn service path sửa trực tiếp quantity của MedicineBatch.

#### Nội dung công việc

- Rà soát service update batch.
- Đảm bảo không có public method sửa quantity tùy ý.
- Nếu có method internal, chỉ dùng trong import/adjustment/checkout transaction.
- Thêm comment guardrail.
- Thêm test hoặc checklist.

#### Kết quả cần đạt

- Quantity chỉ thay đổi qua workflow hợp lệ.
- Không có đường tắt phá audit.
- AI agent không dùng sai service.
- Inventory source of truth được bảo vệ.

---

# 18. PAC-EPIC-08 — POS Draft Order

| Thuộc tính | Giá trị |
|---|---|
| Logical Epic | PAC-EPIC-08 |
| Jira Key thật | PAC-8 |
| Summary | PAC-EPIC-08 - POS Draft Order |
| Component | POS & Checkout |
| Priority | Highest |
| Requirement IDs | REQ-POS, REQ-ORD |
| Use Case IDs | UC-POS, UC-ORD |
| Test Case IDs | TC-POS, TC-ORD |
| Trace IDs | TR-POS, TR-ORD |
| Primary Story range | US-57 → US-68 |
| Main task range | PAC-TASK-191 → PAC-TASK-226 |

## 18.1. Mục tiêu Epic

Xây dựng nhóm chức năng bán thuốc tại quầy trước checkout. Epic này bao gồm tạo Draft Order, tìm kiếm thuốc, thêm thuốc vào đơn, cập nhật số lượng, xóa thuốc khỏi đơn, hỗ trợ walk-in/anonymous customer, validate sellable stock, hủy Draft Order và giữ nguyên Draft Order nếu checkout thất bại.

## 18.2. Kết quả cần đạt của Epic

- Có `Order` và `OrderItem` schema.
- Order status chỉ gồm DRAFT, PAID, CANCELLED.
- Staff/Admin tạo Draft Order được.
- POS search medicine active và hiển thị sellable stock.
- Add/update/remove item hoạt động.
- Quantity validation đúng.
- Draft total deterministic và không có discount/coupon.
- Walk-in customer hoạt động.
- Staff ownership và Admin all-orders hoạt động.
- Draft cancellation đúng lifecycle.
- Draft được bảo toàn khi checkout fail.
- Có Order Detail cho DRAFT/PAID/CANCELLED.
- Không trừ batch trong Sprint 4 Draft flow.
- Có integration tests và frontend smoke checklist.

---
# 19. US-57 — Tạo Draft Order tại POS

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | PAC-96 |
| Parent Epic | PAC-EPIC-08 - POS Draft Order |
| Component | POS & Checkout |
| Priority | Highest |
| Story Point | 5 |
| Labels | pos, draft-order, mvp |
| Số Task liên kết trong Sprint 4 | 6 |

## Mục tiêu User Story

Nhóm cần xây dựng chức năng tạo đơn bán thuốc ở trạng thái Draft.

## Acceptance Criteria

- Staff/Admin tạo Draft Order.
- Draft Order chưa trừ tồn kho.
- Order status ban đầu là DRAFT.
- Có thể tiếp tục thêm thuốc vào đơn.

## Skill trọng tâm

- `karpathy-principles`
- `writing-plans`
- `ecc-backend`
- `ecc-frontend`
- `modern-web-guidance`
- `design-system-guide`
- `tdd`
- `ecc-testing`
- `ecc-database`
- `ecc-security`

## Danh sách Task

| Task | Jira Key | Parent Epic | Component | Priority | Nội dung |
|---|---|---|---|---|---|
| PAC-TASK-191 | PAC-401 | PAC-EPIC-08 | POS & Checkout | Highest | Create orders Prisma model |
| PAC-TASK-192 | PAC-402 | PAC-EPIC-08 | POS & Checkout | Highest | Create order_items Prisma model |
| PAC-TASK-193 | PAC-403 | PAC-EPIC-08 | POS & Checkout | Highest | Add order status enum DRAFT/PAID/CANCELLED |
| PAC-TASK-194 | PAC-404 | PAC-EPIC-08 | POS & Checkout | Highest | Implement create Draft Order API |
| PAC-TASK-195 | PAC-405 | PAC-EPIC-08 | POS & Checkout | Highest | Build POS Draft Order screen |
| PAC-TASK-225 | PAC-435 | PAC-EPIC-19 | Testing & Setup | High | Add POS API integration tests |

### PAC-TASK-191 — Create orders Prisma model

- **Jira Key thật:** `PAC-401`
- **Jira Parent:** `US-57` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** Highest
- **Branch đề xuất:** `feature/PAC-401-T-191-create-orders-prisma-model`
- **Mục đích:** Nhóm cần tạo model Order cho luồng POS.

#### Nội dung công việc

- Tạo model `Order`.
- Thêm status, created_by, processed_by, customer optional nếu có.
- Hỗ trợ walk-in customer.
- Thêm timestamps.
- Chuẩn bị quan hệ với order_items, payments, invoices, alerts.

#### Kết quả cần đạt

- Hệ thống lưu được Draft Order.
- Order status hỗ trợ DRAFT/PAID/CANCELLED.
- Staff ownership scope có dữ liệu.
- Checkout có order để xử lý.

### PAC-TASK-192 — Create order_items Prisma model

- **Jira Key thật:** `PAC-402`
- **Jira Parent:** `US-57` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** Highest
- **Branch đề xuất:** `feature/PAC-402-T-192-create-order-items-prisma-model`
- **Mục đích:** Nhóm cần tạo model dòng thuốc trong order.

#### Nội dung công việc

- Tạo model `OrderItem`.
- Liên kết với Order và Medicine.
- Lưu quantity, unit price, line total snapshot.
- Không lưu batch allocation ở đây nếu đã có bảng riêng.
- Tạo migration.

#### Kết quả cần đạt

- Draft Order có nhiều dòng thuốc.
- Line total có dữ liệu tính tiền.
- Checkout dùng order_items để allocate FEFO.
- Lịch sử order rõ ràng.

### PAC-TASK-193 — Add order status enum DRAFT/PAID/CANCELLED

- **Jira Key thật:** `PAC-403`
- **Jira Parent:** `US-57` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** Highest
- **Branch đề xuất:** `feature/PAC-403-T-193-add-order-status-enum-draft-paid-cancelled`
- **Mục đích:** Nhóm cần định nghĩa enum status chính thức cho order MVP.

#### Nội dung công việc

- Tạo enum order status.
- Chỉ dùng DRAFT, PAID, CANCELLED.
- Không thêm READY_FOR_CHECKOUT.
- Áp dụng validation ở API.
- Cập nhật UI hiển thị status.

#### Kết quả cần đạt

- Order lifecycle đúng baseline.
- Checkout chỉ chạy với DRAFT.
- PAID không bị cancel/edit trực tiếp.
- UI nhất quán status.

### PAC-TASK-194 — Implement create Draft Order API

- **Jira Key thật:** `PAC-404`
- **Jira Parent:** `US-57` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** Highest
- **Branch đề xuất:** `feature/PAC-404-T-194-implement-create-draft-order-api`
- **Mục đích:** Nhóm cần tạo API tạo Draft Order tại POS.

#### Nội dung công việc

- Tạo endpoint create Draft Order.
- Gán created_by là user hiện tại.
- Cho phép customer optional/walk-in.
- Set status DRAFT.
- Không trừ inventory.

#### Kết quả cần đạt

- Staff/Admin tạo được Draft Order.
- Order chưa ảnh hưởng MedicineBatch.
- Dữ liệu sẵn sàng thêm item.
- Ownership scope được ghi nhận.

### PAC-TASK-195 — Build POS Draft Order screen

- **Jira Key thật:** `PAC-405`
- **Jira Parent:** `US-57` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** Highest
- **Branch đề xuất:** `feature/PAC-405-T-195-build-pos-draft-order-screen`
- **Mục đích:** Nhóm cần xây dựng màn hình POS Draft Order.

#### Nội dung công việc

- Tạo layout POS.
- Hiển thị search thuốc.
- Hiển thị danh sách order items.
- Hiển thị tổng tiền.
- Thêm action checkout/cancel.

#### Kết quả cần đạt

- Staff thao tác bán hàng tại POS.
- UI rõ ràng cho demo.
- Draft Order có thể chỉnh sửa trước checkout.
- Không trừ tồn kho trước checkout.

### PAC-TASK-225 — Add POS API integration tests

- **Jira Key thật:** `PAC-435`
- **Jira Parent:** `US-57` / `PAC-EPIC-19`
- **Component:** Testing & Setup
- **Priority:** High
- **Branch đề xuất:** `test/PAC-435-T-225-add-pos-api-integration-tests`
- **Mục đích:** Nhóm cần viết integration test cho POS APIs.

#### Nội dung công việc

- Test create Draft Order.
- Test add item.
- Test update quantity.
- Test remove item.
- Test cancel Draft Order.
- Test permission/scope.

#### Kết quả cần đạt

- POS backend được kiểm tra.
- Draft Order logic ổn định.
- Permission và validation có test.
- CI phát hiện lỗi trước demo.

---

# 20. US-58 — Tìm thuốc trong POS

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | PAC-97 |
| Parent Epic | PAC-EPIC-08 - POS Draft Order |
| Component | POS & Checkout |
| Priority | High |
| Story Point | 3 |
| Labels | pos, medicine-search, mvp |
| Số Task liên kết trong Sprint 4 | 3 |

## Mục tiêu User Story

Nhóm cần cho Staff tìm thuốc nhanh khi bán hàng.

## Acceptance Criteria

- Tìm theo tên/mã thuốc.
- Chỉ hiển thị thuốc active và bán được.
- Hiển thị sellable quantity.
- Có empty state nếu không tìm thấy.

## Skill trọng tâm

- `karpathy-principles`
- `writing-plans`
- `ecc-backend`
- `ecc-frontend`
- `modern-web-guidance`
- `design-system-guide`
- `tdd`
- `ecc-testing`

## Danh sách Task

| Task | Jira Key | Parent Epic | Component | Priority | Nội dung |
|---|---|---|---|---|---|
| PAC-TASK-196 | PAC-406 | PAC-EPIC-08 | POS & Checkout | High | Implement POS medicine search API |
| PAC-TASK-197 | PAC-407 | PAC-EPIC-08 | POS & Checkout | High | Build POS medicine search component |
| PAC-TASK-198 | PAC-408 | PAC-EPIC-08 | POS & Checkout | High | Display sellable stock in POS search results |

### PAC-TASK-196 — Implement POS medicine search API

- **Jira Key thật:** `PAC-406`
- **Jira Parent:** `US-58` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** High
- **Branch đề xuất:** `feature/PAC-406-T-196-implement-pos-medicine-search-api`
- **Mục đích:** Nhóm cần tạo API tìm thuốc trong POS.

#### Nội dung công việc

- Tìm theo tên hoặc mã thuốc.
- Chỉ trả thuốc active.
- Trả sellable stock.
- Hỗ trợ pagination hoặc limit.
- Kiểm tra permission POS.

#### Kết quả cần đạt

- POS tìm thuốc nhanh.
- Không hiển thị thuốc inactive.
- Staff biết stock bán được.
- API phục vụ thêm item vào order.

### PAC-TASK-197 — Build POS medicine search component

- **Jira Key thật:** `PAC-407`
- **Jira Parent:** `US-58` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** High
- **Branch đề xuất:** `feature/PAC-407-T-197-build-pos-medicine-search-component`
- **Mục đích:** Nhóm cần tạo component tìm thuốc trong POS UI.

#### Nội dung công việc

- Thêm ô search thuốc.
- Hiển thị danh sách kết quả.
- Hiển thị tên, đơn vị, giá, sellable stock.
- Cho phép chọn thuốc để thêm vào order.
- Xử lý empty/loading/error.

#### Kết quả cần đạt

- Staff tìm và chọn thuốc dễ dàng.
- UI hiển thị stock bán được.
- Không chọn thuốc inactive.
- Component tích hợp với Draft Order.

### PAC-TASK-198 — Display sellable stock in POS search results

- **Jira Key thật:** `PAC-408`
- **Jira Parent:** `US-58` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** High
- **Branch đề xuất:** `feature/PAC-408-T-198-display-sellable-stock-in-pos-search-results`
- **Mục đích:** Nhóm cần hiển thị sellable stock trong kết quả tìm thuốc.

#### Nội dung công việc

- Lấy sellable quantity từ backend.
- Hiển thị số lượng có thể bán.
- Hiển thị warning nếu stock thấp.
- Không tính batch expired.
- Không hiển thị dashboard kho tổng quát cho Staff.

#### Kết quả cần đạt

- Staff thấy thuốc còn bán được bao nhiêu.
- Giảm lỗi bán vượt tồn kho.
- POS đúng rule Staff chỉ thấy sale-relevant stock.
- Dữ liệu nhất quán với checkout.

---

# 21. US-59 — Thêm thuốc vào Draft Order

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | PAC-98 |
| Parent Epic | PAC-EPIC-08 - POS Draft Order |
| Component | POS & Checkout |
| Priority | Highest |
| Story Point | 5 |
| Labels | pos, order-item, mvp |
| Số Task liên kết trong Sprint 4 | 3 |

## Mục tiêu User Story

Nhóm cần cho Staff thêm thuốc vào đơn nháp.

## Acceptance Criteria

- Thêm medicine vào order item.
- Quantity mặc định hợp lệ.
- Tính thành tiền từng dòng.
- Không cho thêm thuốc inactive.

## Skill trọng tâm

- `karpathy-principles`
- `writing-plans`
- `ecc-backend`
- `ecc-frontend`
- `modern-web-guidance`
- `design-system-guide`
- `tdd`
- `ecc-testing`

## Danh sách Task

| Task | Jira Key | Parent Epic | Component | Priority | Nội dung |
|---|---|---|---|---|---|
| PAC-TASK-199 | PAC-409 | PAC-EPIC-08 | POS & Checkout | Highest | Implement add item to Draft Order API |
| PAC-TASK-200 | PAC-410 | PAC-EPIC-08 | POS & Checkout | Highest | Build add-to-order action in POS |
| PAC-TASK-201 | PAC-411 | PAC-EPIC-08 | POS & Checkout | High | Validate active medicine when adding POS item |

### PAC-TASK-199 — Implement add item to Draft Order API

- **Jira Key thật:** `PAC-409`
- **Jira Parent:** `US-59` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** Highest
- **Branch đề xuất:** `feature/PAC-409-T-199-implement-add-item-to-draft-order-api`
- **Mục đích:** Nhóm cần tạo API thêm thuốc vào Draft Order.

#### Nội dung công việc

- Kiểm tra order tồn tại và status DRAFT.
- Validate medicine active.
- Validate quantity > 0.
- Validate sellable stock sơ bộ.
- Tạo hoặc cập nhật order item.

#### Kết quả cần đạt

- Staff thêm thuốc vào đơn nháp.
- Không thêm vào order PAID/CANCELLED.
- Không thêm thuốc inactive.
- Draft Order total có thể cập nhật.

### PAC-TASK-200 — Build add-to-order action in POS

- **Jira Key thật:** `PAC-410`
- **Jira Parent:** `US-59` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** Highest
- **Branch đề xuất:** `feature/PAC-410-T-200-build-add-to-order-action-in-pos`
- **Mục đích:** Nhóm cần xây dựng action thêm thuốc vào order từ POS UI.

#### Nội dung công việc

- Thêm nút add vào kết quả search.
- Cho phép nhập quantity.
- Gọi API add item.
- Cập nhật order items sau khi thành công.
- Hiển thị lỗi nếu stock không đủ.

#### Kết quả cần đạt

- Staff thêm thuốc nhanh.
- UI cập nhật mượt.
- Lỗi rõ ràng.
- Dữ liệu Draft Order đúng.

### PAC-TASK-201 — Validate active medicine when adding POS item

- **Jira Key thật:** `PAC-411`
- **Jira Parent:** `US-59` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** High
- **Branch đề xuất:** `feature/PAC-411-T-201-validate-active-medicine-when-adding-pos-item`
- **Mục đích:** Nhóm cần kiểm tra medicine active khi thêm vào POS.

#### Nội dung công việc

- Backend kiểm tra `medicine.is_active`.
- Nếu inactive, reject add item.
- POS search không trả inactive medicine.
- Error message rõ nếu gọi API trực tiếp.
- Viết test nếu cần.

#### Kết quả cần đạt

- Không bán thuốc inactive.
- Backend bảo vệ rule.
- UI không hiển thị medicine không hợp lệ.
- Lịch sử cũ vẫn giữ medicine inactive nếu đã bán trước đó.

---

# 22. US-60 — Cập nhật số lượng thuốc trong Draft Order

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | PAC-99 |
| Parent Epic | PAC-EPIC-08 - POS Draft Order |
| Component | POS & Checkout |
| Priority | High |
| Story Point | 3 |
| Labels | quantity, draft-order, mvp |
| Số Task liên kết trong Sprint 4 | 3 |

## Mục tiêu User Story

Nhóm cần cho Staff cập nhật quantity trong đơn nháp.

## Acceptance Criteria

- Quantity phải lớn hơn 0.
- Cập nhật lại tổng tiền.
- Validate sellable stock.
- Không cho update order đã PAID/CANCELLED.

## Skill trọng tâm

- `karpathy-principles`
- `writing-plans`
- `ecc-backend`
- `ecc-frontend`
- `modern-web-guidance`
- `design-system-guide`
- `tdd`
- `ecc-testing`

## Danh sách Task

| Task | Jira Key | Parent Epic | Component | Priority | Nội dung |
|---|---|---|---|---|---|
| PAC-TASK-202 | PAC-412 | PAC-EPIC-08 | POS & Checkout | High | Implement update Draft Order item quantity API |
| PAC-TASK-203 | PAC-413 | PAC-EPIC-08 | POS & Checkout | High | Build quantity controls in Draft Order UI |
| PAC-TASK-204 | PAC-414 | PAC-EPIC-08 | POS & Checkout | High | Validate Draft Order quantity greater than zero |

### PAC-TASK-202 — Implement update Draft Order item quantity API

- **Jira Key thật:** `PAC-412`
- **Jira Parent:** `US-60` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** High
- **Branch đề xuất:** `feature/PAC-412-T-202-implement-update-draft-order-item-quantity-api`
- **Mục đích:** Nhóm cần tạo API cập nhật số lượng dòng thuốc trong Draft Order.

#### Nội dung công việc

- Kiểm tra order status DRAFT.
- Validate item thuộc order.
- Validate quantity > 0.
- Validate sellable stock.
- Cập nhật quantity và line total.

#### Kết quả cần đạt

- Staff chỉnh quantity trong đơn nháp.
- Không chỉnh order PAID/CANCELLED.
- Không vượt stock.
- Total cập nhật đúng.

### PAC-TASK-203 — Build quantity controls in Draft Order UI

- **Jira Key thật:** `PAC-413`
- **Jira Parent:** `US-60` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** High
- **Branch đề xuất:** `feature/PAC-413-T-203-build-quantity-controls-in-draft-order-ui`
- **Mục đích:** Nhóm cần tạo UI chỉnh quantity trong Draft Order.

#### Nội dung công việc

- Thêm nút tăng/giảm quantity hoặc input.
- Validate quantity ở frontend.
- Gọi API update item.
- Cập nhật line total và order total.
- Hiển thị lỗi nếu API reject.

#### Kết quả cần đạt

- Staff chỉnh quantity dễ dàng.
- UI không cho quantity không hợp lệ.
- Draft Order phản ánh dữ liệu mới.
- POS UX ổn định.

### PAC-TASK-204 — Validate Draft Order quantity greater than zero

- **Jira Key thật:** `PAC-414`
- **Jira Parent:** `US-60` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** High
- **Branch đề xuất:** `feature/PAC-414-T-204-validate-draft-order-quantity-greater-than-zero`
- **Mục đích:** Nhóm cần enforce quantity > 0 cho order item.

#### Nội dung công việc

- Backend reject quantity <= 0.
- Frontend chặn nhập quantity <= 0.
- Trả lỗi rõ cho user.
- Test add/update quantity invalid.
- Không lưu item quantity sai.

#### Kết quả cần đạt

- Order item luôn có quantity hợp lệ.
- Total tính đúng.
- Checkout không gặp dữ liệu rác.
- UI/API validation thống nhất.

---

# 23. US-61 — Xóa thuốc khỏi Draft Order

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | PAC-100 |
| Parent Epic | PAC-EPIC-08 - POS Draft Order |
| Component | POS & Checkout |
| Priority | Medium |
| Story Point | 2 |
| Labels | remove-item, pos, mvp |
| Số Task liên kết trong Sprint 4 | 2 |

## Mục tiêu User Story

Nhóm cần cho Staff xóa item khỏi đơn nháp.

## Acceptance Criteria

- Có thể xóa item khi order còn DRAFT.
- Tổng tiền cập nhật lại.
- Không xóa item trong order PAID.
- Hiển thị thông báo thành công/lỗi.

## Skill trọng tâm

- `karpathy-principles`
- `writing-plans`
- `ecc-backend`
- `ecc-frontend`
- `modern-web-guidance`
- `design-system-guide`
- `tdd`
- `ecc-testing`

## Danh sách Task

| Task | Jira Key | Parent Epic | Component | Priority | Nội dung |
|---|---|---|---|---|---|
| PAC-TASK-206 | PAC-416 | PAC-EPIC-08 | POS & Checkout | Medium | Implement remove item from Draft Order API |
| PAC-TASK-207 | PAC-417 | PAC-EPIC-08 | POS & Checkout | Medium | Build remove item action in POS |

### PAC-TASK-206 — Implement remove item from Draft Order API

- **Jira Key thật:** `PAC-416`
- **Jira Parent:** `US-61` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** Medium
- **Branch đề xuất:** `feature/PAC-416-T-206-implement-remove-item-from-draft-order-api`
- **Mục đích:** Nhóm cần tạo API xóa item khỏi Draft Order.

#### Nội dung công việc

- Kiểm tra order status DRAFT.
- Kiểm tra item thuộc order.
- Xóa item hoặc mark removed.
- Cập nhật total nếu service có tính lại.
- Reject nếu order PAID/CANCELLED.

#### Kết quả cần đạt

- Staff xóa được thuốc khỏi đơn nháp.
- Không xóa item order đã paid.
- Total cập nhật đúng.
- API có permission guard.

### PAC-TASK-207 — Build remove item action in POS

- **Jira Key thật:** `PAC-417`
- **Jira Parent:** `US-61` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** Medium
- **Branch đề xuất:** `feature/PAC-417-T-207-build-remove-item-action-in-pos`
- **Mục đích:** Nhóm cần thêm action xóa thuốc khỏi Draft Order trên UI.

#### Nội dung công việc

- Thêm nút remove trên từng dòng.
- Hiển thị confirm nhẹ nếu cần.
- Gọi API remove item.
- Refresh order items và total.
- Xử lý lỗi.

#### Kết quả cần đạt

- Staff thao tác xóa item dễ dàng.
- UI cập nhật đúng.
- Không xóa nhầm trong order không hợp lệ.
- Draft Order dễ chỉnh sửa.

---

# 24. US-62 — Tính tổng tiền Draft Order

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | PAC-101 |
| Parent Epic | PAC-EPIC-08 - POS Draft Order |
| Component | POS & Checkout |
| Priority | High |
| Story Point | 3 |
| Labels | total, order, mvp |
| Số Task liên kết trong Sprint 4 | 3 |

## Mục tiêu User Story

Nhóm cần tính tổng tiền của đơn dựa trên các dòng thuốc.

## Acceptance Criteria

- Tổng tiền bằng sum quantity * selling_price.
- Cập nhật khi thêm/sửa/xóa item.
- Không dùng discount/coupon trong MVP.
- Backend và frontend thống nhất số tiền.

## Skill trọng tâm

- `karpathy-principles`
- `writing-plans`
- `ecc-backend`
- `ecc-frontend`
- `modern-web-guidance`
- `design-system-guide`
- `tdd`
- `ecc-testing`

## Danh sách Task

| Task | Jira Key | Parent Epic | Component | Priority | Nội dung |
|---|---|---|---|---|---|
| PAC-TASK-208 | PAC-418 | PAC-EPIC-08 | POS & Checkout | High | Implement Draft Order total calculation service |
| PAC-TASK-209 | PAC-419 | PAC-EPIC-08 | POS & Checkout | High | Display Draft Order totals in POS UI |
| PAC-TASK-210 | PAC-420 | PAC-EPIC-08 | POS & Checkout | Medium | Ensure no coupon or discount logic in MVP Draft Order total |

### PAC-TASK-208 — Implement Draft Order total calculation service

- **Jira Key thật:** `PAC-418`
- **Jira Parent:** `US-62` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** High
- **Branch đề xuất:** `feature/PAC-418-T-208-implement-draft-order-total-calculation-service`
- **Mục đích:** Nhóm cần triển khai service tính tổng tiền Draft Order.

#### Nội dung công việc

- Tính line total bằng quantity * unit price.
- Tính order total bằng tổng line totals.
- Dùng selling price snapshot nếu cần.
- Không áp dụng coupon/discount trong MVP.
- Đảm bảo backend là nguồn tính chính thức.

#### Kết quả cần đạt

- Tổng tiền Draft Order chính xác.
- Frontend và backend thống nhất.
- Không có discount/coupon ngoài scope.
- Checkout nhận total đáng tin.

### PAC-TASK-209 — Display Draft Order totals in POS UI

- **Jira Key thật:** `PAC-419`
- **Jira Parent:** `US-62` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** High
- **Branch đề xuất:** `feature/PAC-419-T-209-display-draft-order-totals-in-pos-ui`
- **Mục đích:** Nhóm cần hiển thị tổng tiền trong POS.

#### Nội dung công việc

- Hiển thị line total từng item.
- Hiển thị order subtotal/total.
- Cập nhật khi thêm/sửa/xóa item.
- Format tiền dễ đọc.
- Xử lý trạng thái loading.

#### Kết quả cần đạt

- Staff thấy tổng tiền đơn nháp.
- UI rõ ràng khi bán hàng.
- Total phản ánh dữ liệu backend.
- Chuẩn bị cho checkout.

### PAC-TASK-210 — Ensure no coupon or discount logic in MVP Draft Order total

- **Jira Key thật:** `PAC-420`
- **Jira Parent:** `US-62` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** Medium
- **Branch đề xuất:** `feature/PAC-420-T-210-ensure-no-coupon-or-discount-logic-in-mvp-draft-order-total`
- **Mục đích:** Nhóm cần chặn việc thêm coupon/discount vào MVP Draft Order total.

#### Nội dung công việc

- Không thêm field coupon/discount vào total MVP.
- Không tạo promotion engine.
- Nếu có UI placeholder, phải đánh dấu Future.
- Rà soát code không tự trừ discount.
- Ghi guardrail trong note.

#### Kết quả cần đạt

- MVP total đơn giản và đúng scope.
- Không phát sinh scope promotion/coupon.
- Invoice/payment dễ kiểm tra.
- AI agent không thêm scope mới.

---

# 25. US-63 — Validate sellable stock khi lập đơn

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | PAC-102 |
| Parent Epic | PAC-EPIC-08 - POS Draft Order |
| Component | POS & Checkout |
| Priority | Highest |
| Story Point | 5 |
| Labels | stock-validation, pos, mvp |
| Số Task liên kết trong Sprint 4 | 2 |

## Mục tiêu User Story

Nhóm cần kiểm tra số lượng bán được trong POS.

## Acceptance Criteria

- Không cho quantity vượt sellable stock.
- Sellable stock không tính batch hết hạn.
- Hiển thị cảnh báo rõ ràng.
- Checkout vẫn validate lại ở backend.

## Skill trọng tâm

- `karpathy-principles`
- `writing-plans`
- `ecc-backend`
- `ecc-frontend`
- `modern-web-guidance`
- `design-system-guide`
- `tdd`
- `ecc-testing`
- `ecc-database`
- `ecc-security`

## Danh sách Task

| Task | Jira Key | Parent Epic | Component | Priority | Nội dung |
|---|---|---|---|---|---|
| PAC-TASK-205 | PAC-415 | PAC-EPIC-08 | POS & Checkout | Highest | Validate sellable stock when updating Draft Order quantity |
| PAC-TASK-211 | PAC-421 | PAC-EPIC-08 | POS & Checkout | High | Show POS stock validation errors |

### PAC-TASK-205 — Validate sellable stock when updating Draft Order quantity

- **Jira Key thật:** `PAC-415`
- **Jira Parent:** `US-63` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** Highest
- **Branch đề xuất:** `feature/PAC-415-T-205-validate-sellable-stock-when-updating-draft-order-quantity`
- **Mục đích:** Nhóm cần validate stock khi Staff thay đổi quantity.

#### Nội dung công việc

- Tính sellable quantity từ MedicineBatch.
- So sánh quantity yêu cầu với stock bán được.
- Reject nếu vượt sellable stock.
- Không tính batch expired.
- Hiển thị lỗi ở UI.

#### Kết quả cần đạt

- Staff không set quantity vượt stock.
- Draft Order ít lỗi khi checkout.
- Backend vẫn validate lại tại checkout.
- POS an toàn hơn.

### PAC-TASK-211 — Show POS stock validation errors

- **Jira Key thật:** `PAC-421`
- **Jira Parent:** `US-63` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** High
- **Branch đề xuất:** `feature/PAC-421-T-211-show-pos-stock-validation-errors`
- **Mục đích:** Nhóm cần hiển thị lỗi stock validation trên POS UI.

#### Nội dung công việc

- Bắt lỗi API khi stock không đủ.
- Hiển thị message gần item liên quan.
- Giữ Draft Order không mất dữ liệu.
- Cho user chỉnh quantity.
- Không crash POS.

#### Kết quả cần đạt

- Staff biết lỗi tồn kho.
- Có thể sửa Draft Order.
- UX checkout/pos tốt hơn.
- Không mất đơn nháp.

---

# 26. US-64 — Hỗ trợ walk-in/anonymous customer

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | PAC-103 |
| Parent Epic | PAC-EPIC-08 - POS Draft Order |
| Component | POS & Checkout |
| Priority | High |
| Story Point | 3 |
| Labels | walk-in, customer, mvp |
| Số Task liên kết trong Sprint 4 | 3 |

## Mục tiêu User Story

Nhóm cần cho phép bán hàng không cần tạo khách hàng đầy đủ.

## Acceptance Criteria

- Draft Order có thể không gắn customer.
- UI hiển thị khách vãng lai/walk-in.
- Không cần customer portal trong MVP.
- Không biến full Customer Management thành MVP blocker.

## Skill trọng tâm

- `karpathy-principles`
- `writing-plans`
- `ecc-backend`
- `ecc-frontend`
- `modern-web-guidance`
- `design-system-guide`
- `tdd`
- `ecc-testing`

## Danh sách Task

| Task | Jira Key | Parent Epic | Component | Priority | Nội dung |
|---|---|---|---|---|---|
| PAC-TASK-212 | PAC-422 | PAC-EPIC-08 | POS & Checkout | High | Implement walk-in customer support in order model |
| PAC-TASK-213 | PAC-423 | PAC-EPIC-08 | POS & Checkout | Medium | Display walk-in customer option in POS |
| PAC-TASK-214 | PAC-424 | PAC-EPIC-08 | POS & Checkout | Medium | Keep full Customer Management out of MVP POS flow |

### PAC-TASK-212 — Implement walk-in customer support in order model

- **Jira Key thật:** `PAC-422`
- **Jira Parent:** `US-64` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** High
- **Branch đề xuất:** `feature/PAC-422-T-212-implement-walk-in-customer-support-in-order-model`
- **Mục đích:** Nhóm cần hỗ trợ đơn hàng không cần customer chính thức.

#### Nội dung công việc

- Cho phép `customer_id` nullable hoặc dùng walk-in flag.
- Không bắt buộc tạo customer profile.
- Ghi thông tin đơn là khách vãng lai nếu cần.
- Đảm bảo checkout vẫn hoạt động.
- Không đưa full Customer Management vào MVP.

#### Kết quả cần đạt

- Staff bán cho khách vãng lai.
- MVP POS không phụ thuộc Customer module đầy đủ.
- Order vẫn có dữ liệu hợp lệ.
- Future Customer Management không thành blocker.

### PAC-TASK-213 — Display walk-in customer option in POS

- **Jira Key thật:** `PAC-423`
- **Jira Parent:** `US-64` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** Medium
- **Branch đề xuất:** `feature/PAC-423-T-213-display-walk-in-customer-option-in-pos`
- **Mục đích:** Nhóm cần hiển thị lựa chọn khách vãng lai trên POS.

#### Nội dung công việc

- Hiển thị default customer là Walk-in/Anonymous.
- Không bắt buộc nhập khách hàng.
- Nếu có chọn customer sau này, vẫn không làm full CRM.
- Hiển thị rõ trên order.
- Gửi dữ liệu phù hợp tới backend.

#### Kết quả cần đạt

- Staff hiểu đơn đang bán cho khách vãng lai.
- UI đơn giản.
- Không chặn tạo order vì thiếu customer.
- Đúng MVP scope.

### PAC-TASK-214 — Keep full Customer Management out of MVP POS flow

- **Jira Key thật:** `PAC-424`
- **Jira Parent:** `US-64` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** Medium
- **Branch đề xuất:** `feature/PAC-424-T-214-keep-full-customer-management-out-of-mvp-pos-flow`
- **Mục đích:** Nhóm cần đảm bảo POS MVP không phụ thuộc full Customer Management.

#### Nội dung công việc

- Rà soát POS không bắt buộc customer profile.
- Không thêm loyalty/customer portal.
- Không thêm lịch sử khách hàng đầy đủ vào POS MVP.
- Ghi rõ Future scope nếu cần.
- Test tạo order walk-in.

#### Kết quả cần đạt

- POS MVP nhẹ và đúng scope.
- Không phát sinh CRM ngoài MVP.
- Staff vẫn bán được bình thường.
- Future backlog tách biệt.

---

# 27. US-65 — Staff chỉ xem đơn trong ownership scope

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | PAC-104 |
| Parent Epic | PAC-EPIC-08 - POS Draft Order |
| Component | POS & Checkout |
| Priority | High |
| Story Point | 3 |
| Labels | staff-scope, order, mvp |
| Số Task liên kết trong Sprint 4 | 3 |

## Mục tiêu User Story

Nhóm cần giới hạn danh sách đơn của Staff.

## Acceptance Criteria

- Staff chỉ thấy order mình tạo/xử lý.
- Admin thấy tất cả.
- Backend enforce scope.
- Test case có Staff A không thấy order Staff B.

## Skill trọng tâm

- `karpathy-principles`
- `writing-plans`
- `ecc-backend`
- `ecc-frontend`
- `modern-web-guidance`
- `design-system-guide`
- `tdd`
- `ecc-testing`
- `ecc-database`
- `ecc-security`

## Danh sách Task

| Task | Jira Key | Parent Epic | Component | Priority | Nội dung |
|---|---|---|---|---|---|
| PAC-TASK-215 | PAC-425 | PAC-EPIC-08 | POS & Checkout | High | Apply Staff ownership scope to order list API |
| PAC-TASK-216 | PAC-426 | PAC-EPIC-08 | POS & Checkout | Medium | Build Staff scoped order list UI |
| PAC-TASK-224 | PAC-434 | PAC-EPIC-08 | POS & Checkout | Medium | Build Order Detail screen for DRAFT/PAID/CANCELLED |

### PAC-TASK-215 — Apply Staff ownership scope to order list API

- **Jira Key thật:** `PAC-425`
- **Jira Parent:** `US-65` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** High
- **Branch đề xuất:** `feature/PAC-425-T-215-apply-staff-ownership-scope-to-order-list-api`
- **Mục đích:** Nhóm cần giới hạn Staff chỉ xem order thuộc phạm vi của mình.

#### Nội dung công việc

- Query order theo created_by/processed_by cho Staff.
- Admin xem tất cả.
- Warehouse không truy cập POS order list nếu không có quyền.
- Backend enforce scope.
- Test Staff A không thấy order Staff B.

#### Kết quả cần đạt

- Dữ liệu order không bị lộ sai quyền.
- Admin có toàn quyền xem.
- Staff chỉ thấy dữ liệu liên quan.
- Ownership scope đúng baseline.

### PAC-TASK-216 — Build Staff scoped order list UI

- **Jira Key thật:** `PAC-426`
- **Jira Parent:** `US-65` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** Medium
- **Branch đề xuất:** `feature/PAC-426-T-216-build-staff-scoped-order-list-ui`
- **Mục đích:** Nhóm cần xây dựng UI danh sách order cho Staff theo scope.

#### Nội dung công việc

- Gọi API order list.
- Hiển thị order Staff được phép xem.
- Hiển thị status DRAFT/PAID/CANCELLED.
- Link tới Order Detail.
- Xử lý empty/loading/error.

#### Kết quả cần đạt

- Staff xem được order của mình.
- Không thấy order ngoài scope.
- UI phục vụ tiếp tục Draft Order.
- Phân quyền dễ demo.

### PAC-TASK-224 — Build Order Detail screen for DRAFT/PAID/CANCELLED

- **Jira Key thật:** `PAC-434`
- **Jira Parent:** `US-65` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** Medium
- **Branch đề xuất:** `feature/PAC-434-T-224-build-order-detail-screen-for-draft-paid-cancelled`
- **Mục đích:** Nhóm cần xây dựng màn hình chi tiết order.

#### Nội dung công việc

- Hiển thị order status.
- Hiển thị items.
- Hiển thị payment/invoice nếu PAID.
- Hiển thị actions theo status.
- Kiểm tra ownership/permission.

#### Kết quả cần đạt

- User xem được chi tiết order.
- DRAFT có thể tiếp tục thao tác nếu có quyền.
- PAID chỉ xem/in invoice.
- CANCELLED read-only.

---

# 28. US-66 — Admin xem tất cả đơn hàng

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | PAC-105 |
| Parent Epic | PAC-EPIC-08 - POS Draft Order |
| Component | POS & Checkout |
| Priority | Medium |
| Story Point | 2 |
| Labels | admin, order-list, mvp |
| Số Task liên kết trong Sprint 4 | 2 |

## Mục tiêu User Story

Nhóm cần cho Admin xem toàn bộ order.

## Acceptance Criteria

- Admin list tất cả order.
- Có filter trạng thái nếu cần.
- Không bị giới hạn ownership scope.
- Dữ liệu hiển thị chính xác.

## Skill trọng tâm

- `karpathy-principles`
- `writing-plans`
- `ecc-backend`
- `ecc-frontend`
- `modern-web-guidance`
- `design-system-guide`
- `tdd`
- `ecc-testing`
- `ecc-database`
- `ecc-security`

## Danh sách Task

| Task | Jira Key | Parent Epic | Component | Priority | Nội dung |
|---|---|---|---|---|---|
| PAC-TASK-217 | PAC-427 | PAC-EPIC-08 | POS & Checkout | Medium | Implement Admin all-orders list API |
| PAC-TASK-218 | PAC-428 | PAC-EPIC-08 | POS & Checkout | Medium | Build Admin all-orders UI |

### PAC-TASK-217 — Implement Admin all-orders list API

- **Jira Key thật:** `PAC-427`
- **Jira Parent:** `US-66` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** Medium
- **Branch đề xuất:** `feature/PAC-427-T-217-implement-admin-all-orders-list-api`
- **Mục đích:** Nhóm cần tạo API cho Admin xem toàn bộ order.

#### Nội dung công việc

- Tạo hoặc mở rộng order list API.
- Nếu user là Admin, không áp dụng Staff ownership filter.
- Hỗ trợ filter status/date nếu cần.
- Trả dữ liệu tóm tắt.
- Kiểm tra permission Admin.

#### Kết quả cần đạt

- Admin xem được tất cả order.
- Staff vẫn bị scope.
- API phân quyền rõ.
- Dữ liệu hỗ trợ quản trị và report.

### PAC-TASK-218 — Build Admin all-orders UI

- **Jira Key thật:** `PAC-428`
- **Jira Parent:** `US-66` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** Medium
- **Branch đề xuất:** `feature/PAC-428-T-218-build-admin-all-orders-ui`
- **Mục đích:** Nhóm cần xây dựng UI Admin xem toàn bộ đơn hàng.

#### Nội dung công việc

- Hiển thị danh sách order toàn hệ thống.
- Thêm filter status/date nếu đơn giản.
- Link tới order detail.
- Hiển thị created_by/processed_by nếu cần.
- Xử lý loading/empty/error.

#### Kết quả cần đạt

- Admin kiểm tra order toàn hệ thống.
- UI hỗ trợ demo quyền Admin.
- Staff không dùng màn hình này nếu không có quyền.
- Dữ liệu rõ ràng.

---

# 29. US-67 — Hủy Draft Order

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | PAC-106 |
| Parent Epic | PAC-EPIC-08 - POS Draft Order |
| Component | POS & Checkout |
| Priority | Medium |
| Story Point | 3 |
| Labels | cancel, draft-order, mvp |
| Số Task liên kết trong Sprint 4 | 3 |

## Mục tiêu User Story

Nhóm cần cho phép hủy đơn nháp.

## Acceptance Criteria

- Staff hủy Draft Order trong ownership scope.
- Admin hủy bất kỳ Draft Order.
- Không hủy order PAID.
- Status chuyển thành CANCELLED.

## Skill trọng tâm

- `karpathy-principles`
- `writing-plans`
- `ecc-backend`
- `ecc-frontend`
- `modern-web-guidance`
- `design-system-guide`
- `tdd`
- `ecc-testing`
- `ecc-database`
- `ecc-security`

## Danh sách Task

| Task | Jira Key | Parent Epic | Component | Priority | Nội dung |
|---|---|---|---|---|---|
| PAC-TASK-219 | PAC-429 | PAC-EPIC-08 | POS & Checkout | Medium | Implement cancel Draft Order API |
| PAC-TASK-220 | PAC-430 | PAC-EPIC-08 | POS & Checkout | Medium | Build cancel Draft Order UI |
| PAC-TASK-221 | PAC-431 | PAC-EPIC-08 | POS & Checkout | High | Prevent cancel PAID or already CANCELLED order |

### PAC-TASK-219 — Implement cancel Draft Order API

- **Jira Key thật:** `PAC-429`
- **Jira Parent:** `US-67` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** Medium
- **Branch đề xuất:** `feature/PAC-429-T-219-implement-cancel-draft-order-api`
- **Mục đích:** Nhóm cần tạo API hủy Draft Order.

#### Nội dung công việc

- Chỉ cho cancel order status DRAFT.
- Staff chỉ cancel order trong ownership scope.
- Admin cancel bất kỳ Draft Order.
- Set status CANCELLED.
- Không trừ tồn kho.

#### Kết quả cần đạt

- Draft Order có thể hủy.
- PAID order không bị hủy.
- CANCELLED order không checkout được.
- Permission và scope đúng.

### PAC-TASK-220 — Build cancel Draft Order UI

- **Jira Key thật:** `PAC-430`
- **Jira Parent:** `US-67` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** Medium
- **Branch đề xuất:** `feature/PAC-430-T-220-build-cancel-draft-order-ui`
- **Mục đích:** Nhóm cần thêm UI hủy đơn nháp.

#### Nội dung công việc

- Thêm nút cancel ở Draft Order.
- Hiển thị confirm dialog.
- Gọi API cancel.
- Sau khi cancel, cập nhật trạng thái.
- Disable action nếu order không phải DRAFT.

#### Kết quả cần đạt

- Staff/Admin hủy Draft Order đúng quyền.
- UI tránh thao tác nhầm.
- Order status hiển thị đúng.
- Không mất dữ liệu lịch sử.

### PAC-TASK-221 — Prevent cancel PAID or already CANCELLED order

- **Jira Key thật:** `PAC-431`
- **Jira Parent:** `US-67` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** High
- **Branch đề xuất:** `feature/PAC-431-T-221-prevent-cancel-paid-or-already-cancelled-order`
- **Mục đích:** Nhóm cần chặn hủy order đã PAID hoặc đã CANCELLED.

#### Nội dung công việc

- Backend kiểm tra status trước khi cancel.
- Nếu PAID/CANCELLED, trả lỗi.
- UI disable nút cancel.
- Test PAID order cancel bị reject.
- Không tạo refund/return trong MVP.

#### Kết quả cần đạt

- PAID order không bị hủy trực tiếp.
- CANCELLED order không bị hủy lại.
- MVP không có refund/return workflow.
- Order lifecycle đúng baseline.

---

# 30. US-68 — Giữ Draft Order khi checkout fail

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | PAC-107 |
| Parent Epic | PAC-EPIC-08 - POS Draft Order |
| Component | POS & Checkout |
| Priority | Highest |
| Story Point | 5 |
| Labels | checkout-fail, draft-order, mvp |
| Số Task liên kết trong Sprint 4 | 3 |

## Mục tiêu User Story

Nhóm cần bảo toàn đơn nháp nếu checkout lỗi.

## Acceptance Criteria

- Checkout fail không mất Draft Order.
- Không trừ batch khi transaction fail.
- User quay lại đơn nháp với dữ liệu cũ.
- Hiển thị lỗi để xử lý tiếp.

## Skill trọng tâm

- `karpathy-principles`
- `writing-plans`
- `ecc-backend`
- `ecc-frontend`
- `modern-web-guidance`
- `design-system-guide`
- `tdd`
- `ecc-testing`
- `ecc-database`
- `ecc-security`

## Danh sách Task

| Task | Jira Key | Parent Epic | Component | Priority | Nội dung |
|---|---|---|---|---|---|
| PAC-TASK-222 | PAC-432 | PAC-EPIC-08 | POS & Checkout | Highest | Preserve Draft Order after checkout failure in UI |
| PAC-TASK-223 | PAC-433 | PAC-EPIC-08 | POS & Checkout | High | Restore checkout error state back to Draft Order |
| PAC-TASK-226 | PAC-436 | PAC-EPIC-19 | Testing & Setup | Medium | Add POS frontend smoke test checklist |

### PAC-TASK-222 — Preserve Draft Order after checkout failure in UI

- **Jira Key thật:** `PAC-432`
- **Jira Parent:** `US-68` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** Highest
- **Branch đề xuất:** `feature/PAC-432-T-222-preserve-draft-order-after-checkout-failure-in-ui`
- **Mục đích:** Nhóm cần giữ Draft Order nếu checkout thất bại.

#### Nội dung công việc

- Nếu checkout API trả lỗi, không clear cart/order UI.
- Giữ items và quantity hiện tại.
- Hiển thị lỗi cụ thể.
- Cho user quay lại chỉnh sửa.
- Không redirect mất dữ liệu.

#### Kết quả cần đạt

- Staff không mất đơn khi checkout fail.
- Có thể xử lý lỗi và thử lại.
- UX POS an toàn.
- Baseline checkout dedicated route/panel được hỗ trợ.

### PAC-TASK-223 — Restore checkout error state back to Draft Order

- **Jira Key thật:** `PAC-433`
- **Jira Parent:** `US-68` / `PAC-EPIC-08`
- **Component:** POS & Checkout
- **Priority:** High
- **Branch đề xuất:** `feature/PAC-433-T-223-restore-checkout-error-state-back-to-draft-order`
- **Mục đích:** Nhóm cần đưa user từ checkout lỗi quay lại Draft Order với trạng thái cũ.

#### Nội dung công việc

- Lưu order id khi vào checkout.
- Khi checkout fail, reload order detail.
- Hiển thị lỗi ở POS/Draft Order.
- Không tạo payment/invoice nếu fail.
- Không trừ batch quantity.

#### Kết quả cần đạt

- Draft Order vẫn tồn tại sau lỗi.
- User biết lý do checkout fail.
- Không có partial checkout.
- Dữ liệu an toàn.

### PAC-TASK-226 — Add POS frontend smoke test checklist

- **Jira Key thật:** `PAC-436`
- **Jira Parent:** `US-68` / `PAC-EPIC-19`
- **Component:** Testing & Setup
- **Priority:** Medium
- **Branch đề xuất:** `test/PAC-436-T-226-add-pos-frontend-smoke-test-checklist`
- **Mục đích:** Nhóm cần viết checklist smoke test cho POS UI.

#### Nội dung công việc

- Test tạo Draft Order.
- Test tìm thuốc.
- Test thêm thuốc.
- Test đổi quantity.
- Test lỗi stock.
- Test cancel Draft Order.

#### Kết quả cần đạt

- Tester kiểm tra POS nhanh.
- Luồng bán hàng trước checkout ổn.
- Demo POS ít rủi ro.
- Checklist rõ expected result.

---

# 31. Epic hỗ trợ trong Sprint 4

## 31.1. PAC-EPIC-19 — Testing, Smoke Test & Release Readiness

Các Task hỗ trợ:

- PAC-TASK-182 — Negative quantity adjustment tests.
- PAC-TASK-183 — Required adjustment reason tests.
- PAC-TASK-184 — Warehouse adjustment permission tests.
- PAC-TASK-189 — Inventory Adjustment smoke test checklist.
- PAC-TASK-225 — POS API integration tests.
- PAC-TASK-226 — POS frontend smoke test checklist.

Quy tắc:

- Task test vẫn merge vào Story branch nghiệp vụ được liên kết.
- Không tạo implementation trùng với regression Task của Sprint 10.
- Sprint 4 test là feature-level/integration evidence tại thời điểm triển khai.
- Sprint 10 sẽ thực hiện final regression, release readiness và test setup tổng thể.

## 31.2. PAC-EPIC-21 — Documentation & Traceability

Task hỗ trợ:

- PAC-TASK-190 — Inventory Adjustment traceability notes.

Kết quả bắt buộc:

- Story → Task → Requirement → Test được liên kết.
- Reason, transaction, permission, audit và no-direct-update guardrail được ghi rõ.
- Tài liệu không mô tả aggregate inventory là source of truth.

---

# 32. Thứ tự triển khai theo dependency

## Wave 0 — Audit

- Kiểm tra Sprint 3 gate.
- Audit MedicineBatch, Inventory Summary, sellable stock và Stock Import.
- Audit existing Order/POS code.
- Audit direct quantity update paths.
- Phân loại 66 Task: Done / Partial / Missing / Conflict / N/A.
- Chưa sửa business code.

## Wave 1 — Inventory Adjustment Foundation

- US-49 — Create adjustment.
- US-50 — Required reason.
- US-51 — Select MedicineBatch.
- PAC-TASK-185 — Block direct batch quantity update path.

## Wave 2 — Adjustment Transaction & Safety

- US-52 — Confirm transaction.
- US-53 — Prevent negative quantity.
- US-54 — Warehouse permissions.
- US-55 — Audit.

## Wave 3 — Adjustment History & Operations

- US-56 — List/detail/history/cancel/smoke/traceability.
- Refresh Inventory Summary after confirm.

## Wave 4 — POS Foundation

- US-57 — Order/OrderItem/status/create Draft/POS screen.
- US-58 — Medicine search and sellable stock.

## Wave 5 — POS Item Lifecycle

- US-59 — Add item.
- US-60 — Update quantity.
- US-61 — Remove item.
- US-62 — Calculate totals.
- US-63 — Validate sellable stock.

## Wave 6 — POS Scope & Recovery

- US-64 — Walk-in customer.
- US-65 — Staff ownership and Order Detail.
- US-66 — Admin all-orders.
- US-67 — Cancel Draft.
- US-68 — Preserve Draft on checkout failure.
- POS integration tests and smoke checklist.

Wave chỉ là nhóm lập kế hoạch. Không tạo Wave branch để thay thế issue branch.

---

# 33. Skill Matrix

| Loại công việc | Skill bắt buộc/phù hợp |
|---|---|
| Sprint/Epic lifecycle | `agent-skills-lifecycle`, `ecc-code-quality`, `git-github`, `ecc-business-ops` |
| Planning nhiều bước | `writing-plans`, `karpathy-principles` |
| Prisma/schema/migration | `ecc-database`, `ecc-backend`, `tdd`, `ecc-testing` |
| Transaction/rollback | `ecc-database`, `ecc-backend`, `mattpocock-engineering`, `tdd` |
| Backend NestJS/API | `ecc-backend`, `ecc-security`, `tdd`, `ecc-testing` |
| Frontend Next.js | `modern-web-guidance`, `ecc-frontend`, `design-system-guide`, `ecc-testing` |
| Permission/ownership | `ecc-security`, `ecc-backend`, `ecc-testing` |
| Inventory safety | `ecc-healthcare`, `ecc-database`, `ecc-backend` |
| Debug | `mattpocock-engineering`, `ecc-testing`, skill kỹ thuật tương ứng |
| Git/PR/CI | `git-github`, `ecc-devops`, `ecc-business-ops` |
| Documentation | `mattpocock-productivity`, `ecc-business-ops` |

Không gọi toàn bộ skill cho mọi Task. Mỗi Task phải ghi Selected Skills và lý do chọn trong implementation plan.

---

# 34. GitHub và Jira Workflow

## 34.1. Merge hierarchy

```text
Task branch
    ↓
User Story branch
    ↓
Epic branch
    ↓
develop
    ↓
release PR
    ↓
main
```

## 34.2. Branch naming

Epic:

```text
epic/<jira-key>-EPIC-<number>-<short-description>
```

Epic chính:

```text
epic/PAC-7-EPIC-07-inventory-adjustment
epic/PAC-8-EPIC-08-pos-draft-order
```

User Story:

```text
story/<jira-key>-US-<number>-<short-description>
```

Task:

```text
<type>/<jira-key>-T-<number>-<short-description>
```

Type hợp lệ:

- `feature`
- `test`
- `docs`
- `bugfix`
- `hotfix`

## 34.3. Jira Key

- Không tự tính Jira Key.
- Bắt buộc tra `jira-mapping.md`.
- Nếu `branch-on-jira.md` và `jira-mapping.md` khác nhau, dùng `jira-mapping.md`.
- Không dùng `PAC-TASK-xxx` như Jira Key thật trong branch.
- Không dùng prefix cũ `PAI`.

## 34.4. Commit

Format chính thức:

```text
<PAC-issue-key> <logical-key>: <short English message>
```

Ví dụ:

```text
PAC-371 T-161: create inventory adjustment Prisma model
PAC-401 T-191: create POS order Prisma model
```

## 34.5. Pull Request

PR title:

```text
<PAC-issue-key> <logical-key>: <short summary>
```

PR description phải có:

- Related Epic
- Related Story
- Related Task
- Scope
- Component
- What changed
- How tested
- Risk
- Rollback notes
- Screenshots nếu có UI

## 34.6. Guardrails

- Không push trực tiếp lên `develop` hoặc `main`.
- Không dùng một branch cho nhiều Task.
- Không tạo Wave branch để code.
- Không xóa branch sau merge nếu cần giữ evidence.
- Không force push lên `develop` hoặc `main`.
- Không mention AI, agent, prompt hoặc automation trong commit/PR.
- Không commit `.env`, secret, token hoặc credential.

---

# 35. Test Strategy

## 35.1. Inventory Adjustment

Phải kiểm tra:

- Create Draft adjustment.
- Draft chưa làm thay đổi MedicineBatch.
- Required reason.
- Whitespace-only reason bị reject.
- Batch selector đúng.
- Adjustment quantity > 0.
- Increase/decrease đúng.
- Before/after preview.
- Confirm transaction success.
- Rollback khi một line lỗi.
- Negative resulting quantity bị reject.
- Confirmed adjustment immutable.
- Cancel Draft không đổi stock.
- Warehouse create/confirm.
- Staff bị chặn.
- Admin xem history.
- Audit actor/reason/batch/before-after.
- Inventory Summary refresh.
- Direct quantity update path bị chặn.

## 35.2. POS Draft Order

Phải kiểm tra:

- Create Draft Order.
- Status mặc định DRAFT.
- Draft chưa trừ inventory.
- Search active medicine.
- Inactive medicine bị loại.
- Sellable stock hiển thị đúng.
- Add item.
- Duplicate medicine item được xử lý theo unique order/medicine rule.
- Update quantity > 0.
- Update không vượt sellable stock.
- Remove item.
- Total calculation.
- Không có coupon/discount.
- Walk-in customer.
- Staff ownership.
- Admin all-orders.
- Warehouse denied.
- Cancel DRAFT.
- Reject cancel PAID/CANCELLED.
- Order Detail hiển thị đúng status.
- Checkout failure giữ Draft và không clear items.
- Không tạo Payment/Invoice hoặc trừ batch trong Sprint 4 failure path.

## 35.3. Quality Gates

Chỉ chạy script tồn tại trong `package.json`.

Backend dự kiến:

```bash
npm run lint
npm run test
npm run test:e2e
npx prisma validate
npx prisma generate
npm run build
```

Frontend dự kiến:

```bash
npm run lint
npm run build
```

Nếu script không tồn tại, ghi `N/A — script chưa được cấu hình`; không bịa kết quả.

---

# 36. Definition of Done

## 36.1. Task Done

Một Task chỉ Done khi:

- Đúng Jira Task và scope.
- Nội dung công việc hoàn thành.
- Kết quả mong đợi đạt.
- Baseline không bị vi phạm.
- Test phù hợp pass.
- Build phù hợp pass.
- Code review hoàn tất.
- Branch/commit/PR dùng Jira Key thật.
- PR Task → Story đã merge.
- Evidence được ghi trong `sprint-4-progress.md`.

## 36.2. User Story Done

Một User Story chỉ Done khi:

- Tất cả Task liên kết trong Sprint 4 Done.
- Acceptance Criteria đạt.
- Integration verification pass.
- Manual UI test phù hợp pass.
- Story PR → Epic đã merge.
- Không còn lỗi trong scope Story.

## 36.3. Epic Done

Một Epic chỉ Done khi:

- Tất cả User Story thuộc Epic Done.
- Full Epic test pass.
- Prisma validate/generate pass nếu liên quan.
- Backend/frontend build pass.
- Permission đúng.
- Manual test toàn Epic pass.
- Epic PR → develop đã merge.
- Không còn Conflict hoặc Blocker.

## 36.4. Sprint Done

Sprint 4 chỉ Done khi:

- 66 Task được audit và xử lý.
- 20 Primary User Story đạt Acceptance Criteria.
- PAC-TASK-185 được xử lý đúng cross-sprint parent.
- PAC-EPIC-07 Done.
- PAC-EPIC-08 Done.
- Testing/Documentation evidence đầy đủ.
- `develop` chứa toàn bộ thay đổi Sprint 4.
- PR `develop → main` được tạo nhưng không tự merge.
- `Ready for Sprint 5 = Yes`.

---

# 37. Out-of-Scope Guard

Không triển khai trong Sprint 4:

- Full Customer Management.
- Loyalty hoặc customer portal.
- Product Variant Catalog.
- Coupon, discount, promotion.
- Inventory deduction khi tạo Draft Order.
- FEFO allocation.
- Payment.
- Invoice.
- Checkout transaction đầy đủ.
- DrugInteraction Rule.
- InteractionAlert persistence.
- HIGH acknowledgement/consultation note.
- AI Copilot.
- Graph Sync worker hoặc Neo4j.
- Refund/return workflow.
- Multi-store hoặc multi-warehouse.
- Direct MedicineBatch quantity update.

Các integration point được phép:

- POS sellable stock contract.
- Checkout failure recovery contract.
- Order model relation chuẩn bị cho Payment/Invoice/Alert ở Sprint sau.
- Interaction trigger point chuẩn bị cho Sprint 5, nhưng không triển khai interaction engine.

---

# 38. Quan hệ với các file Sprint 4 tiếp theo

Sau khi chốt file này, tạo:

```text
work-context/sprint-4/sprint-4-progress.md
work-context/sprint-4/sprint-4-audit.md
work-context/sprint-4/sprint-4-agent-prompt.md
```

Vai trò:

- `sprint-4.md`: kế hoạch và baseline cố định.
- `sprint-4-progress.md`: checklist Epic → US → Task, Git/Test evidence.
- `sprint-4-audit.md`: hiện trạng repository trước code.
- `sprint-4-agent-prompt.md`: lệnh điều phối AI triển khai Sprint 4.

---

# 39. Kết luận

Sprint 4 là cầu nối giữa nền tảng tồn kho của Sprint 3 và Interaction/Checkout của Sprint 5–6.

Kết quả quan trọng nhất phải bảo đảm:

1. Mọi thay đổi tồn kho đều traceable qua Inventory Adjustment.
2. Không còn đường sửa trực tiếp MedicineBatch quantity.
3. POS Draft Order không trừ tồn kho trước checkout.
4. Staff chỉ thao tác order trong ownership scope.
5. Draft Order được bảo toàn khi checkout thất bại.
6. Không triển khai lấn FEFO, Payment, Invoice hoặc InteractionAlert.
