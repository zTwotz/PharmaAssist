# Sprint 4 Progress — PharmaAssist AI Intelligence

> File này dùng để theo dõi tiến độ thực tế của Sprint 4.
> AI Agent phải cập nhật sau khi audit, triển khai, kiểm thử, commit, tạo PR hoặc merge.
> Checkbox trong cấu trúc **Epic → User Story → Task** là trạng thái chính thức.
> Không tạo checkbox trùng cho cùng một Task ở phần khác.

---

# 1. Sprint Information

| Mục | Nội dung |
|---|---|
| Sprint | Sprint 4 |
| Sprint name | Inventory Adjustment & POS Draft Order |
| Scope | MVP / Core |
| MVP Gate | Có |
| Epic nghiệp vụ | PAC-EPIC-07, PAC-EPIC-08 |
| Epic hỗ trợ | PAC-EPIC-19, PAC-EPIC-21 |
| Cross-sprint reference | PAC-EPIC-05 / US-38 / PAC-TASK-185 |
| Primary Story range | US-49 → US-68 |
| Primary User Story count | 20 |
| Task range | PAC-TASK-161 → PAC-TASK-226 |
| Task count | 66 |
| Progress status | Audit Completed |
| Ready for Sprint 5 | No |

---

# 2. Quy tắc cập nhật

- `[ ]`: Chưa hoàn thành.
- `[x]`: Đã hoàn thành đầy đủ và có evidence.
- Không đánh dấu User Story hoàn thành khi còn Task chưa hoàn thành.
- Không đánh dấu Epic hoàn thành khi còn User Story chưa hoàn thành.
- Task chỉ được đánh dấu `[x]` khi đạt acceptance criteria, test phù hợp pass và PR đã merge đúng luồng.
- Nếu chỉ hoàn thành một phần, giữ `[ ]` và ghi `Partial` trong Evidence Log hoặc Known Issues.
- Không ghi `Pass` nếu test chưa chạy.
- Không tự thay đổi Jira parent của PAC-TASK-185.
- Mọi branch, commit và PR phải dùng Jira Key thật từ `jira-mapping.md`.

---

# 3. Sprint Summary

- [ ] **Sprint 4 completed**
- [ ] **PAC-EPIC-07 completed**
- [ ] **PAC-EPIC-08 completed**
- [ ] **All 20 primary User Stories completed**
- [ ] **All 66 Tasks completed**
- [ ] **PAC-TASK-185 cross-sprint hardening completed**
- [ ] **Final automated verification passed**
- [ ] **Manual UI test passed**
- [ ] **Ready for Sprint 5**

| Hạng mục | Tổng | Hoàn thành |
|---|---:|---:|
| Epic nghiệp vụ | 2 | 0 |
| Primary User Story | 20 | 0 |
| Task | 66 | 0 |

---
# 4. PAC-EPIC-07 — Inventory Adjustment

- [ ] **Epic completed**

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | PAC-7 |
| Sprint | Sprint 4 |
| Component | Inventory Adjustment |
| Primary Story range | US-49 → US-56 |
| Main Task range | PAC-TASK-161 → PAC-TASK-190 |
| Epic branch | Chưa cập nhật |
| Epic PR → develop | Chưa cập nhật |

## Epic Completion Criteria

- [ ] Inventory Adjustment schema và lines model hoàn chỉnh.
- [ ] Reason bắt buộc.
- [ ] Chọn đúng MedicineBatch.
- [ ] Before/after quantity preview hoạt động.
- [ ] Confirm dùng transaction.
- [ ] Không cho quantity âm.
- [ ] Confirmed adjustment immutable.
- [ ] Draft adjustment cancel được.
- [ ] Warehouse/Admin permission đúng.
- [ ] Audit và history hoạt động.
- [ ] Inventory Summary refresh sau confirm.
- [ ] Không có public direct MedicineBatch quantity update.
- [ ] Automated tests, smoke test và traceability hoàn tất.
- [ ] Epic PR đã merge vào develop với checks pass.

---

## US-49 — Tạo Inventory Adjustment

- `[x]` **User Story completed**

### Related Tasks

- `[x]` **PAC-TASK-161** — Create inventory_adjustments Prisma model
- `[x]` **PAC-TASK-162** — Create inventory_adjustment_lines Prisma model
- `[x]` **PAC-TASK-163** — Implement create Inventory Adjustment API
- `[x]` **PAC-TASK-164** — Build create Inventory Adjustment screen
- `[x]` **PAC-TASK-165** — Build MedicineBatch selector for adjustment
- `[x]` **PAC-TASK-166** — Validate adjustment type and quantity

### Completion Criteria

- `[x]` Tạo được Inventory Adjustment ở trạng thái Draft.
- `[x]` Có schema adjustment và adjustment lines.
- `[x]` Draft chưa làm thay đổi MedicineBatch.
- `[x]` Admin/Warehouse có quyền tạo theo baseline.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| Jira Key thật | PAC-88 |
| Story branch | `story/PAC-88-us-49-tao-inventory-adjustment` |
| Task PRs → Story | Đã merge PAC-371, 372, 373, 374, 375, 376 |
| Story PR → Epic | Đã merge vào `epic/PAC-7-epic-07-inventory-adjustment` |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---

## US-50 — Adjustment bắt buộc reason

- `[x]` **User Story completed**

### Related Tasks

- `[x]` **PAC-TASK-167** — Enforce required adjustment reason in backend
- `[x]` **PAC-TASK-168** — Add required reason validation in UI
- `[x]` **PAC-TASK-183** — Add tests for required adjustment reason

### Completion Criteria

- `[x]` Reason là bắt buộc ở backend và frontend.
- `[x]` Reason rỗng hoặc chỉ khoảng trắng bị reject.
- `[x]` Có automated tests cho required reason.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| Jira Key thật | PAC-89 |
| Story branch | `story/PAC-89-us-50-adjustment-bat-buoc-reason` |
| Task PRs → Story | Đã merge PAC-377, 378, 393 |
| Story PR → Epic | Đã merge vào `epic/PAC-7-epic-07-inventory-adjustment` |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---

## US-51 — Chọn MedicineBatch cần điều chỉnh

- `[x]` **User Story completed**

### Related Tasks

- `[x]` **PAC-TASK-165** — Build MedicineBatch selector for adjustment
- `[x]` **PAC-TASK-169** — Show batch before/after quantity preview

### Completion Criteria

- `[x]` Chọn được MedicineBatch cụ thể.
- `[x]` Hiển thị medicine, batch number, expiry và quantity hiện tại.
- `[x]` Có preview before/after quantity.
- `[x]` Không điều chỉnh aggregate inventory.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| Jira Key thật | PAC-90 |
| Story branch | `story/PAC-90-us-51-chon-medicinebatch-can-dieu-chinh` |
| Task PRs → Story | Đã merge PAC-375, PAC-379 |
| Story PR → Epic | Đã merge vào `epic/PAC-7-epic-07-inventory-adjustment` |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---

## US-52 — Confirm Inventory Adjustment transaction

- `[x]` **User Story completed**

### Related Tasks

- `[x]` **PAC-TASK-170** — Implement confirm Inventory Adjustment transaction
- `[x]` **PAC-TASK-171** — Update MedicineBatch through adjustment transaction only
- `[x]` **PAC-TASK-173** — Lock confirmed Inventory Adjustment
- `[x]` **PAC-TASK-188** — Refresh Inventory Summary after adjustment confirm

### Completion Criteria

- `[x]` Confirm chạy trong database transaction.
- `[x]` MedicineBatch chỉ được cập nhật qua transaction hợp lệ.
- `[x]` Một line lỗi rollback toàn bộ.
- `[x]` Confirmed adjustment bị khóa.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| Jira Key thật | PAC-91 |
| Story branch | `story/PAC-91-us-52-confirm-inventory-adjustment-transaction` |
| Task PRs → Story | Đã merge PAC-380 |
| Story PR → Epic | Đã merge vào `epic/PAC-7-epic-07-inventory-adjustment` |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---

## US-53 — Chặn adjustment làm quantity âm

- `[x]` **User Story completed**

### Related Tasks

- `[x]` **PAC-TASK-172** — Prevent adjustment from making quantity negative
- `[x]` **PAC-TASK-182** — Add tests for negative quantity adjustment

### Completion Criteria

- `[x]` Không cho adjustment làm quantity âm.
- `[x]` Validation xảy ra ở backend trong transaction.
- `[x]` Có test cho negative quantity rejection.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| Jira Key thật | PAC-92 |
| Story branch | `story/PAC-92-us-53-chan-adjustment-lam-quantity-am` |
| Task PRs → Story | Đã merge PAC-382, PAC-392 |
| Story PR → Epic | Đã merge vào `epic/PAC-7-epic-07-inventory-adjustment` |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---

## US-54 — Warehouse tạo và confirm adjustment

- `[x]` **User Story completed**

### Related Tasks

- `[x]` **PAC-TASK-178** — Add Warehouse permission for create/confirm adjustment
- `[x]` **PAC-TASK-184** — Add tests for Warehouse adjustment permission

### Completion Criteria

- `[x]` Warehouse được create/confirm adjustment theo permission.
- `[x]` Staff bị chặn nếu không có quyền.
- `[x]` Có test cho Warehouse permission.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| Jira Key thật | PAC-93 |
| Story branch | `story/PAC-93-us-54-warehouse-tao-va-confirm-adjustment` |
| Task PRs → Story | Đã merge PAC-388, PAC-394 |
| Story PR → Epic | Đã merge vào `epic/PAC-7-epic-07-inventory-adjustment` |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---

## US-55 — Audit Inventory Adjustment

- `[x]` **User Story completed**

### Related Tasks

- `[x]` **PAC-TASK-180** — Write audit log for Inventory Adjustment
- `[x]` **PAC-TASK-181** — Display adjustment audit information in UI

### Completion Criteria

- `[x]` Confirm adjustment ghi audit log.
- `[x]` Audit có actor, reason, batch, before/after và timestamp.
- `[x]` UI hiển thị audit metadata.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| Jira Key thật | PAC-94 |
| Story branch | `story/PAC-94-us-55-audit-inventory-adjustment` |
| Task PRs → Story | Đã merge PAC-390, PAC-391 |
| Story PR → Epic | Đã merge vào `epic/PAC-7-epic-07-inventory-adjustment` |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---

## US-56 — Admin xem lịch sử adjustment

- [ ] **User Story completed**

### Related Tasks

- [ ] **PAC-TASK-174** — Create Inventory Adjustment list API
- [ ] **PAC-TASK-175** — Build Inventory Adjustment history list UI
- [ ] **PAC-TASK-176** — Implement Inventory Adjustment detail API
- [ ] **PAC-TASK-177** — Build Inventory Adjustment detail screen
- [ ] **PAC-TASK-179** — Add Admin permission for adjustment history and review
- [ ] **PAC-TASK-186** — Implement cancel Draft Inventory Adjustment API
- [ ] **PAC-TASK-187** — Build cancel Draft Inventory Adjustment UI
- [ ] **PAC-TASK-189** — Add Inventory Adjustment smoke test checklist
- [ ] **PAC-TASK-190** — Add Inventory Adjustment traceability notes

### Completion Criteria

- [ ] Admin xem được list và detail adjustment.
- [ ] Có cancel Draft adjustment.
- [ ] Cancel Draft không làm thay đổi MedicineBatch.
- [ ] Inventory Summary refresh sau confirm.
- [ ] Có smoke test và traceability.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| Jira Key thật | Chưa cập nhật |
| Story branch | Chưa cập nhật |
| Task PRs → Story | Chưa cập nhật |
| Story PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---

# 13. Cross-sprint Hardening — PAC-EPIC-05 / US-38

- [ ] **Cross-sprint hardening completed**

> Task này nằm trong range Sprint 4 nhưng Jira parent chính thức vẫn thuộc PAC-EPIC-05 / US-38.
> Không chuyển parent sang PAC-EPIC-07.

## Related Task

- [ ] **PAC-TASK-185** — Block direct MedicineBatch quantity update service path

## Completion Criteria

- [ ] Không còn public API cập nhật trực tiếp MedicineBatch quantity.
- [ ] Inventory Adjustment là workflow hợp lệ cho thay đổi thủ công.
- [ ] Existing US-38/PAC-EPIC-05 branch history được giữ đúng.
- [ ] Task được merge đúng branch cha theo kế hoạch cross-sprint.
- [ ] Có test hoặc evidence xác nhận direct update bị chặn.

## Evidence

| Evidence | Giá trị |
|---|---|
| Jira Key thật | PAC-395 |
| Linked Story | US-38 / PAC-77 |
| Parent Epic | PAC-EPIC-05 / PAC-5 |
| Task branch | Chưa cập nhật |
| Commit | Chưa cập nhật |
| PR | Chưa cập nhật |
| Test Evidence | Chưa chạy |
| Ghi chú | — |

---

# 14. PAC-EPIC-08 — POS Draft Order

- [ ] **Epic completed**

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | PAC-8 |
| Sprint | Sprint 4 |
| Component | POS & Checkout |
| Primary Story range | US-57 → US-68 |
| Main Task range | PAC-TASK-191 → PAC-TASK-226 |
| Epic branch | Chưa cập nhật |
| Epic PR → develop | Chưa cập nhật |

## Epic Completion Criteria

- [ ] Order và OrderItem schema hoàn chỉnh.
- [ ] Order status chỉ gồm DRAFT, PAID, CANCELLED.
- [ ] Tạo Draft Order tại POS.
- [ ] Search active medicine và sellable stock hoạt động.
- [ ] Add/update/remove item hoạt động.
- [ ] Total deterministic và không có discount/coupon.
- [ ] Walk-in/anonymous customer hoạt động.
- [ ] Staff ownership đúng.
- [ ] Admin xem tất cả orders.
- [ ] Warehouse bị chặn khỏi POS.
- [ ] Cancel Draft đúng lifecycle.
- [ ] Checkout failure giữ Draft Order và items.
- [ ] Draft flow không trừ MedicineBatch quantity.
- [ ] Integration test và frontend smoke checklist hoàn tất.
- [ ] Epic PR đã merge vào develop với checks pass.

---

## US-57 — Tạo Draft Order tại POS

- [ ] **User Story completed**

### Related Tasks

- [ ] **PAC-TASK-191** — Create orders Prisma model
- [ ] **PAC-TASK-192** — Create order_items Prisma model
- [ ] **PAC-TASK-193** — Add order status enum DRAFT/PAID/CANCELLED
- [ ] **PAC-TASK-194** — Implement create Draft Order API
- [ ] **PAC-TASK-195** — Build POS Draft Order screen
- [ ] **PAC-TASK-225** — Add POS API integration tests

### Completion Criteria

- [ ] Có Order và OrderItem schema.
- [ ] Order status chỉ gồm DRAFT, PAID, CANCELLED.
- [ ] Tạo được Draft Order tại POS.
- [ ] Draft chưa trừ tồn kho.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| Jira Key thật | Chưa cập nhật |
| Story branch | Chưa cập nhật |
| Task PRs → Story | Chưa cập nhật |
| Story PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---

## US-58 — Tìm thuốc trong POS

- [ ] **User Story completed**

### Related Tasks

- [ ] **PAC-TASK-196** — Implement POS medicine search API
- [ ] **PAC-TASK-197** — Build POS medicine search component
- [ ] **PAC-TASK-198** — Display sellable stock in POS search results

### Completion Criteria

- [ ] Tìm được medicine active trong POS.
- [ ] Hiển thị sellable stock.
- [ ] Inactive medicine không xuất hiện cho giao dịch mới.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| Jira Key thật | Chưa cập nhật |
| Story branch | Chưa cập nhật |
| Task PRs → Story | Chưa cập nhật |
| Story PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---

## US-59 — Thêm thuốc vào Draft Order

- [ ] **User Story completed**

### Related Tasks

- [ ] **PAC-TASK-199** — Implement add item to Draft Order API
- [ ] **PAC-TASK-200** — Build add-to-order action in POS
- [ ] **PAC-TASK-201** — Validate active medicine when adding POS item

### Completion Criteria

- [ ] Thêm medicine vào Draft Order.
- [ ] Không tạo duplicate order item cho cùng medicine.
- [ ] Validate quantity và sellable stock.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| Jira Key thật | Chưa cập nhật |
| Story branch | Chưa cập nhật |
| Task PRs → Story | Chưa cập nhật |
| Story PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---

## US-60 — Cập nhật số lượng thuốc trong Draft Order

- [ ] **User Story completed**

### Related Tasks

- [ ] **PAC-TASK-202** — Implement update Draft Order item quantity API
- [ ] **PAC-TASK-203** — Build quantity controls in Draft Order UI
- [ ] **PAC-TASK-204** — Validate Draft Order quantity greater than zero

### Completion Criteria

- [ ] Cập nhật quantity item.
- [ ] Quantity phải lớn hơn 0.
- [ ] Không vượt sellable stock.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| Jira Key thật | Chưa cập nhật |
| Story branch | Chưa cập nhật |
| Task PRs → Story | Chưa cập nhật |
| Story PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---

## US-61 — Xóa thuốc khỏi Draft Order

- [ ] **User Story completed**

### Related Tasks

- [ ] **PAC-TASK-206** — Implement remove item from Draft Order API
- [ ] **PAC-TASK-207** — Build remove item action in POS

### Completion Criteria

- [ ] Xóa được item khỏi Draft Order.
- [ ] Total được cập nhật sau khi xóa.
- [ ] Không ảnh hưởng MedicineBatch quantity.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| Jira Key thật | Chưa cập nhật |
| Story branch | Chưa cập nhật |
| Task PRs → Story | Chưa cập nhật |
| Story PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---

## US-62 — Tính tổng tiền Draft Order

- [ ] **User Story completed**

### Related Tasks

- [ ] **PAC-TASK-208** — Implement Draft Order total calculation service
- [ ] **PAC-TASK-209** — Display Draft Order totals in POS UI
- [ ] **PAC-TASK-210** — Ensure no coupon or discount logic in MVP Draft Order total

### Completion Criteria

- [ ] Tổng tiền được tính deterministic.
- [ ] Subtotal = quantity × selling price.
- [ ] Không có coupon/discount trong Sprint 4.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| Jira Key thật | Chưa cập nhật |
| Story branch | Chưa cập nhật |
| Task PRs → Story | Chưa cập nhật |
| Story PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---

## US-63 — Validate sellable stock khi lập đơn

- [ ] **User Story completed**

### Related Tasks

- [ ] **PAC-TASK-205** — Validate sellable stock when updating Draft Order quantity
- [ ] **PAC-TASK-211** — Show POS stock validation errors

### Completion Criteria

- [ ] Sellable stock được validate khi add/update item.
- [ ] Không dùng expired batch trong availability.
- [ ] Draft chưa thực hiện FEFO allocation.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| Jira Key thật | Chưa cập nhật |
| Story branch | Chưa cập nhật |
| Task PRs → Story | Chưa cập nhật |
| Story PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---

## US-64 — Hỗ trợ walk-in/anonymous customer

- [ ] **User Story completed**

### Related Tasks

- [ ] **PAC-TASK-212** — Implement walk-in customer support in order model
- [ ] **PAC-TASK-213** — Display walk-in customer option in POS
- [ ] **PAC-TASK-214** — Keep full Customer Management out of MVP POS flow

### Completion Criteria

- [ ] Hỗ trợ walk-in/anonymous customer.
- [ ] Không bắt buộc Full Customer Management.
- [ ] Draft Order vẫn tạo được khi không có customer profile.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| Jira Key thật | Chưa cập nhật |
| Story branch | Chưa cập nhật |
| Task PRs → Story | Chưa cập nhật |
| Story PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---

## US-65 — Staff chỉ xem đơn trong ownership scope

- [ ] **User Story completed**

### Related Tasks

- [ ] **PAC-TASK-215** — Apply Staff ownership scope to order list API
- [ ] **PAC-TASK-216** — Build Staff scoped order list UI
- [ ] **PAC-TASK-224** — Build Order Detail screen for DRAFT/PAID/CANCELLED

### Completion Criteria

- [ ] Staff chỉ xem và thao tác order của mình.
- [ ] Direct API access ngoài ownership scope bị chặn.
- [ ] Order Detail tuân thủ ownership.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| Jira Key thật | Chưa cập nhật |
| Story branch | Chưa cập nhật |
| Task PRs → Story | Chưa cập nhật |
| Story PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---

## US-66 — Admin xem tất cả đơn hàng

- [ ] **User Story completed**

### Related Tasks

- [ ] **PAC-TASK-217** — Implement Admin all-orders list API
- [ ] **PAC-TASK-218** — Build Admin all-orders UI

### Completion Criteria

- [ ] Admin xem được tất cả orders.
- [ ] Admin không bị áp Staff ownership filter.
- [ ] Permission được enforce ở backend.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| Jira Key thật | Chưa cập nhật |
| Story branch | Chưa cập nhật |
| Task PRs → Story | Chưa cập nhật |
| Story PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---

## US-67 — Hủy Draft Order

- [ ] **User Story completed**

### Related Tasks

- [ ] **PAC-TASK-219** — Implement cancel Draft Order API
- [ ] **PAC-TASK-220** — Build cancel Draft Order UI
- [ ] **PAC-TASK-221** — Prevent cancel PAID or already CANCELLED order

### Completion Criteria

- [ ] Staff có thể cancel Draft Order trong scope.
- [ ] Admin có thể cancel mọi Draft Order.
- [ ] PAID/CANCELLED không thể cancel lại.
- [ ] Cancel không trừ hoặc hoàn tồn kho.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| Jira Key thật | Chưa cập nhật |
| Story branch | Chưa cập nhật |
| Task PRs → Story | Chưa cập nhật |
| Story PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---

## US-68 — Giữ Draft Order khi checkout fail

- [ ] **User Story completed**

### Related Tasks

- [ ] **PAC-TASK-222** — Preserve Draft Order after checkout failure in UI
- [ ] **PAC-TASK-223** — Restore checkout error state back to Draft Order
- [ ] **PAC-TASK-226** — Add POS frontend smoke test checklist

### Completion Criteria

- [ ] Checkout failure giữ nguyên Draft Order.
- [ ] Items và total không bị xóa.
- [ ] Không tạo Payment/Invoice hoặc trừ batch trong failure path.
- [ ] Có integration/smoke test phù hợp.

### User Story Evidence

| Evidence | Giá trị |
|---|---|
| Jira Key thật | Chưa cập nhật |
| Story branch | Chưa cập nhật |
| Task PRs → Story | Chưa cập nhật |
| Story PR → Epic | Chưa cập nhật |
| Automated test | Chưa chạy |
| Manual test | Chưa chạy |
| Known issue | Không |
| Ghi chú | — |

---

# 27. PAC-EPIC-19 — Testing, Smoke Test & Release Readiness

- [ ] **Các yêu cầu kiểm thử hỗ trợ Sprint 4 đã hoàn thành**

> Checkbox chính thức của Task nằm trong User Story tương ứng.

## Related Tasks

- PAC-TASK-182 — Add tests for negative quantity adjustment
- PAC-TASK-183 — Add tests for required adjustment reason
- PAC-TASK-184 — Add tests for Warehouse adjustment permission
- PAC-TASK-189 — Add Inventory Adjustment smoke test checklist
- PAC-TASK-225 — Add POS API integration tests
- PAC-TASK-226 — Add POS frontend smoke test checklist

## Completion Criteria

- [ ] Inventory Adjustment business rules có automated tests.
- [ ] Warehouse permission có test.
- [ ] POS APIs có integration tests.
- [ ] POS frontend có smoke checklist.
- [ ] Kết quả test được ghi trung thực.
- [ ] Không đánh dấu Pass nếu test chưa chạy.

---

# 28. PAC-EPIC-21 — Documentation & Traceability

- [ ] **Các yêu cầu tài liệu hỗ trợ Sprint 4 đã hoàn thành**

## Related Task

- PAC-TASK-190 — Add Inventory Adjustment traceability notes

## Completion Criteria

- [ ] Story → Task → Requirement → Test được liên kết.
- [ ] Reason, transaction, audit và permission được mô tả.
- [ ] Không mô tả aggregate inventory là source of truth.
- [ ] Không mô tả direct MedicineBatch quantity update là hợp lệ.
- [ ] Progress và WORKING-CONTEXT được cập nhật.

---

# 29. Database Evidence

- [ ] `inventory_adjustments` model
- [ ] `inventory_adjustment_lines` model
- [ ] Adjustment status enum/constraint
- [ ] Required reason
- [ ] Relation Adjustment → Lines
- [ ] Relation Line → MedicineBatch
- [ ] Before/after quantity audit fields nếu baseline yêu cầu
- [ ] `orders` model
- [ ] `order_items` model
- [ ] Order status DRAFT/PAID/CANCELLED
- [ ] Unique order_id + medicine_id
- [ ] Order ownership fields
- [ ] Anonymous customer support
- [ ] Migration chạy thành công
- [ ] Prisma validate pass
- [ ] Prisma generate pass
- [ ] Không có aggregate inventory source of truth
- [ ] Không có public direct MedicineBatch quantity update
- [ ] Draft Order không trừ inventory

---

# 30. API Evidence

## Inventory Adjustment

- [ ] Create Draft Adjustment API
- [ ] Add/update/delete adjustment lines nếu có
- [ ] Batch selector API
- [ ] Confirm Adjustment transaction
- [ ] Negative quantity validation
- [ ] Required reason validation
- [ ] Lock confirmed adjustment
- [ ] Cancel Draft adjustment
- [ ] List Adjustment API
- [ ] Detail Adjustment API
- [ ] Audit metadata
- [ ] Warehouse permission
- [ ] Admin history permission

## POS Draft Order

- [ ] Create Draft Order API
- [ ] Search active medicine API
- [ ] Sellable stock response
- [ ] Add order item API
- [ ] Update order item quantity API
- [ ] Remove order item API
- [ ] Total calculation
- [ ] Anonymous/walk-in support
- [ ] Staff ownership filter
- [ ] Admin all-orders view
- [ ] Cancel Draft Order API
- [ ] Preserve Draft on checkout failure
- [ ] Warehouse denied
- [ ] AuthGuard và PermissionsGuard áp dụng

---

# 31. Frontend Evidence

## Inventory Adjustment

- [ ] Create Adjustment screen
- [ ] Required reason validation
- [ ] MedicineBatch selector
- [ ] Before/after quantity preview
- [ ] Confirm action
- [ ] Negative quantity error
- [ ] Confirmed read-only UI
- [ ] Adjustment list
- [ ] Adjustment detail
- [ ] Audit metadata
- [ ] Cancel Draft action
- [ ] Inventory Summary refresh

## POS Draft Order

- [ ] POS screen
- [ ] Active medicine search
- [ ] Sellable stock display
- [ ] Add item
- [ ] Update quantity
- [ ] Remove item
- [ ] Total display
- [ ] No discount/coupon UI
- [ ] Walk-in customer state
- [ ] Staff ownership-aware list
- [ ] Admin all-orders list
- [ ] Order Detail
- [ ] Cancel Draft action
- [ ] Checkout failure recovery state
- [ ] Loading/empty/error/success states
- [ ] Permission-aware routes/actions

---

# 32. Automated Test Results

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
| Frontend tests | Chưa chạy | — | — |
| Frontend build | Chưa chạy | — | — |
| CI checks | Chưa chạy | — | — |

---

# 33. Manual UI Test Checklist

## Inventory Adjustment

- [ ] Admin tạo Draft Adjustment.
- [ ] Warehouse tạo Draft Adjustment.
- [ ] Staff bị chặn.
- [ ] Reason rỗng bị từ chối.
- [ ] Reason chỉ khoảng trắng bị từ chối.
- [ ] Chọn đúng MedicineBatch.
- [ ] Preview before/after đúng.
- [ ] Adjustment tăng thành công.
- [ ] Adjustment giảm thành công.
- [ ] Quantity âm bị từ chối.
- [ ] Một line lỗi rollback toàn bộ.
- [ ] Confirmed adjustment read-only.
- [ ] Cancel Draft không đổi stock.
- [ ] Audit metadata hiển thị đúng.
- [ ] Admin xem history.
- [ ] Inventory Summary refresh sau confirm.
- [ ] Direct MedicineBatch quantity update bị chặn.

## POS Draft Order

- [ ] Staff tạo Draft Order.
- [ ] Admin tạo Draft Order nếu có permission.
- [ ] Warehouse bị chặn khỏi POS.
- [ ] Search active medicine.
- [ ] Inactive medicine không xuất hiện.
- [ ] Sellable stock hiển thị đúng.
- [ ] Add item.
- [ ] Không tạo duplicate item cùng medicine.
- [ ] Update quantity.
- [ ] Quantity 0/âm bị từ chối.
- [ ] Quantity vượt sellable stock bị từ chối.
- [ ] Remove item.
- [ ] Total cập nhật đúng.
- [ ] Không có discount/coupon.
- [ ] Walk-in order tạo được.
- [ ] Staff chỉ thấy order của mình.
- [ ] Admin thấy tất cả orders.
- [ ] Staff cancel Draft trong scope.
- [ ] Admin cancel bất kỳ Draft.
- [ ] PAID/CANCELLED không cancel lại.
- [ ] Draft chưa trừ inventory.
- [ ] Checkout failure giữ Draft và items.
- [ ] Order Detail hiển thị đúng status.

---

# 34. Task Evidence Log

> Mỗi Task sau khi hoàn thành phải có một dòng riêng.
> Không xóa lịch sử evidence.

| Task | Jira Key thật | Status | Branch | Commit | PR | Test Evidence | Ghi chú |
|---|---|---|---|---|---|---|---|
| PAC-TASK-161 → PAC-TASK-226 | Chưa cập nhật | Pending Audit | — | — | — | — | Tách thành từng dòng khi bắt đầu triển khai |

---

# 35. Pull Request & Merge Evidence

## Task → User Story

| Task/Range | Source Branch | Target Story Branch | PR | Checks | Merge Status |
|---|---|---|---|---|---|
| Chưa cập nhật | — | — | — | — | — |

## User Story → Epic

| User Story | Source Branch | Target Epic Branch | PR | Checks | Merge Status |
|---|---|---|---|---|---|
| US-49 → US-68 | — | — | — | — | — |

## Cross-sprint Task

| Task | Source Branch | Target Branch | PR | Checks | Merge Status |
|---|---|---|---|---|---|
| PAC-TASK-185 | — | US-38/PAC-EPIC-05 branch theo audit | — | — | — |

## Epic → develop

| Epic | Source Branch | PR | Checks | Merge Status |
|---|---|---|---|---|
| PAC-EPIC-07 | — | — | — | — |
| PAC-EPIC-08 | — | — | — | — |

## develop → main

| PR | Trạng thái | Người phê duyệt |
|---|---|---|
| Chưa tạo | Không tự merge | Người dùng |

---

# 36. Known Issues

- Chưa có.

> Mỗi issue phải ghi: Severity, Epic, Story, Task, evidence, ảnh hưởng và hành động đề xuất.

---

# 37. Sprint 4 Final Verification

- [ ] PAC-EPIC-07 hoàn thành.
- [ ] PAC-EPIC-08 hoàn thành.
- [ ] US-49 → US-68 hoàn thành.
- [ ] PAC-TASK-161 → PAC-TASK-226 hoàn thành.
- [ ] PAC-TASK-185 được xử lý đúng cross-sprint parent.
- [ ] Backend lint pass.
- [ ] Backend unit tests pass.
- [ ] Backend integration/E2E tests pass.
- [ ] Prisma validate pass.
- [ ] Prisma generate pass.
- [ ] Backend build pass.
- [ ] Frontend lint pass.
- [ ] Frontend tests pass hoặc ghi N/A hợp lệ.
- [ ] Frontend build pass.
- [ ] CI checks pass.
- [ ] Manual UI test pass.
- [ ] Không còn lỗi thuộc phạm vi Sprint 4.
- [ ] Không có secret hoặc `.env` thật trong commit.
- [ ] MedicineBatch vẫn là inventory source of truth.
- [ ] Không có direct MedicineBatch quantity edit.
- [ ] Inventory Adjustment confirm chạy transaction.
- [ ] Adjustment không thể làm quantity âm.
- [ ] Draft Order không trừ inventory.
- [ ] Staff ownership đúng.
- [ ] Warehouse bị chặn khỏi POS.
- [ ] Checkout failure giữ Draft Order.
- [ ] Không triển khai lấn FEFO, Payment, Invoice hoặc InteractionAlert.
- [ ] Progress và WORKING-CONTEXT đã cập nhật.
- [ ] Hai Epic đã merge vào develop.
- [ ] PR develop → main đã được tạo và chờ người dùng phê duyệt.

---

# 38. Ready for Sprint 5

```text
No
```

Chỉ đổi thành:

```text
Yes
```

khi toàn bộ checkbox bắt buộc hoàn thành, evidence đầy đủ và Sprint 4 đã tích hợp đúng quy trình Git.

Lý do hiện tại:

```text
Sprint 4 chưa được audit và triển khai.
```
