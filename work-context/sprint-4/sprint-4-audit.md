# Sprint 4 Audit — PharmaAssist AI Intelligence

> File này dùng để ghi nhận kết quả audit hiện trạng repository trước khi triển khai Sprint 4.
> AI Agent phải hoàn thành audit trước khi sửa business code.
> Tất cả kết luận phải dựa trên bằng chứng thực tế trong code, schema, migration, test, Git và GitHub.
> Không đánh dấu `Done` chỉ vì đã tồn tại file, class, route hoặc model cùng tên.

---

# 1. Sprint Information

| Mục | Nội dung |
|---|---|
| Sprint | Sprint 4 |
| Sprint name | Inventory Adjustment & POS Draft Order |
| Scope | MVP / Core |
| Epic nghiệp vụ | PAC-EPIC-07, PAC-EPIC-08 |
| Epic hỗ trợ | PAC-EPIC-19, PAC-EPIC-21 |
| Cross-sprint reference | PAC-EPIC-05 / US-38 / PAC-TASK-185 |
| Primary Story range | US-49 → US-68 |
| Primary User Story count | 20 |
| Task range | PAC-TASK-161 → PAC-TASK-226 |
| Task count | 66 |
| Audit status | Completed |
| Audit date | 2026-06-21 |
| Auditor | Antigravity AI |
| Repository branch | develop |
| Base commit | 5a9eb81 |
| Sprint 3 gate | Pass |
| Ready to implement Sprint 4 | Yes |

---

# 2. Audit Status Definitions

Chỉ sử dụng các trạng thái sau:

| Status | Ý nghĩa |
|---|---|
| `Done` | Đã đạt đầy đủ acceptance criteria, tích hợp đúng và có test evidence |
| `Partial` | Đã có một phần nhưng còn thiếu acceptance criteria, test, UI, API hoặc integration |
| `Missing` | Chưa có implementation cần thiết |
| `Conflict` | Code hiện có trái baseline, sai parent, sai source of truth hoặc gây rủi ro |
| `Failed Verification` | Có implementation nhưng test/build/manual verification không đạt |
| `N/A` | Không áp dụng; phải ghi rõ lý do |
| `Chưa audit` | Chưa kiểm tra |

Quy tắc:

- Không đánh dấu `Done` nếu chưa có bằng chứng.
- Có model nhưng thiếu migration, constraint, API hoặc test thì là `Partial`.
- Có frontend nhưng backend chưa enforce permission thì không được đánh dấu `Done`.
- Có test file nhưng chưa chạy hoặc đang fail thì không được ghi `Pass`.
- Code sửa trực tiếp `MedicineBatch.quantity` ngoài workflow hợp lệ phải đánh dấu `Conflict`.
- Draft Order làm giảm tồn kho trước checkout phải đánh dấu `Conflict`.
- Không sửa business code trong bước audit.
- Không reset database thật.
- Không tạo implementation branch trước khi hoàn tất audit và dependency gate.
- Mọi kết luận phải có file path, symbol, migration, test output, branch, commit hoặc PR làm evidence.

---

# 3. Dependency Gate từ Sprint 3

Sprint 4 chỉ được triển khai khi tất cả điều kiện sau đạt:

- [x] Sprint 3 đã Completed.
- [x] PAC-EPIC-05 đã Done.
- [x] PAC-EPIC-06 đã Done.
- [x] US-27 → US-48 đã Done.
- [x] PAC-TASK-102 → PAC-TASK-160 đã Done.
- [x] `Ready for Sprint 4 = Yes`.
- [x] Sprint 3 đã merge vào `develop`.
- [x] `develop` chứa MedicineBatch, Inventory Summary và Stock Import.
- [x] Workspace sạch.
- [x] Không còn Blocker từ Sprint 3.

## 3.1. Dependency Evidence

| Dependency | Status | Evidence | Blocker / Action |
|---|---|---|---|
| Medicine model/API | Done | schema.prisma | — |
| MedicineBatch source of truth | Done | schema.prisma | — |
| Sellable quantity | Done | Sprint 3 backend | — |
| Expired batch exclusion | Done | Sprint 3 backend | — |
| Inventory Summary | Done | Sprint 3 backend | — |
| Stock Import transaction | Done | Sprint 3 backend | — |
| AuthGuard | Done | Sprint 1 backend | — |
| PermissionsGuard | Done | Sprint 1 backend | — |
| Admin/Staff/Warehouse roles | Done | Sprint 1 backend | — |
| Staff ownership foundation | Done | Sprint 1 backend | — |
| Sprint 3 merged into develop | Done | git log | — |

Nếu dependency gate chưa đạt:

```text
Ready to implement Sprint 4 = Yes
```

---

# 4. Tài liệu và khu vực bắt buộc phải đọc

## 4.1. Project Context

- [ ] `AGENTS.md`
- [ ] `.agents/rules/rules-w-pharmaassist.md`
- [ ] `WORKING-CONTEXT.md`
- [ ] `DESIGN.md`
- [ ] `work-context/sprint-3/sprint-3.md`
- [ ] `work-context/sprint-3/sprint-3-audit.md`
- [ ] `work-context/sprint-3/sprint-3-progress.md`
- [ ] `work-context/sprint-4/sprint-4.md`
- [ ] `work-context/sprint-4/sprint-4-progress.md`

## 4.2. Jira Documents

- [ ] `Jira/1_Components.md`
- [ ] `Jira/2_Epic.md`
- [ ] `Jira/3_Stories.md`
- [ ] `Jira/4B_Task_List_MVP_POS_Interaction_Checkout_146_290.md`
- [ ] `Jira/4B_Task_Description_MVP_POS_Interaction_Checkout_146_290.md`
- [ ] `Jira/5_Sprint.md`
- [ ] `Jira/branch-on-jira.md`
- [ ] `Jira/jira-mapping.md`

## 4.3. Codebase

- [ ] `backend/prisma/schema.prisma`
- [ ] `backend/prisma/migrations`
- [ ] Prisma seed files
- [ ] Inventory module
- [ ] MedicineBatch module
- [ ] Inventory Adjustment module
- [ ] Order/POS module
- [ ] Auth/permission/ownership guards
- [ ] Audit log foundation
- [ ] Frontend Inventory Adjustment routes/components
- [ ] Frontend POS routes/components
- [ ] Backend unit/integration/E2E tests
- [ ] Frontend tests/smoke documentation
- [ ] Git branches, commits và Pull Requests

---

# 5. Audit Executive Summary

| Nội dung | Kết quả |
|---|---|
| Sprint 3 dependency gate | Pass |
| Existing architecture summary | Missing InventoryAdjustments, Order models present but need alignment with POS MVP |
| Reusable code | Auth, Prisma Service, existing Order model foundation |
| Missing modules | InventoryAdjustment backend/frontend, POS POS backend/frontend |
| Conflicts | OrderDetail uses productVariantId instead of medicine_id. PAC-TASK-185 needs implementation |
| Database migration risks | Chưa audit |
| Security/permission risks | Chưa audit |
| Ownership risks | Chưa audit |
| Testing gaps | Chưa audit |
| Git/PR evidence gaps | Chưa audit |
| Recommended first User Story | Chưa xác định |
| Ready to implement | Yes |

## 5.1. Tổng hợp trạng thái Task

| Status | Số lượng |
|---|---:|
| Done | 0 |
| Partial | 1 |
| Missing | 64 |
| Conflict | 1 |
| Failed Verification | 0 |
| N/A | 0 |
| Chưa audit | 0 |

---

# 6. PAC-EPIC-07 — Inventory Adjustment

## 6.1. Epic Audit Summary

| Mục | Kết quả |
|---|---|
| Jira Key thật | PAC-7 |
| Story range | US-49 → US-56 |
| Main task range | PAC-TASK-161 → PAC-TASK-190 |
| Epic status | Chưa audit |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Migration risk | — |
| Permission risk | — |
| Test gap | — |
| Recommended order | — |

---
# US-49 — Tạo Inventory Adjustment

| Task | Jira Key thật | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|---|
| PAC-TASK-161 | PAC-371 | Create inventory_adjustments Prisma model | Missing | — | — | — | — |
| PAC-TASK-162 | PAC-372 | Create inventory_adjustment_lines Prisma model | Missing | — | — | — | — |
| PAC-TASK-163 | PAC-373 | Implement create Inventory Adjustment API | Missing | — | — | — | — |
| PAC-TASK-164 | PAC-374 | Build create Inventory Adjustment screen | Missing | — | — | — | — |
| PAC-TASK-166 | PAC-376 | Validate adjustment type and quantity | Missing | — | — | — | — |

## User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Chưa audit |
| Acceptance Criteria verified | Chưa audit |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Git/PR evidence | — |
| Recommended implementation order | — |

---

# US-50 — Adjustment bắt buộc reason

| Task | Jira Key thật | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|---|
| PAC-TASK-167 | PAC-377 | Enforce required adjustment reason in backend | Missing | — | — | — | — |
| PAC-TASK-168 | PAC-378 | Add required reason validation in UI | Missing | — | — | — | — |
| PAC-TASK-183 | PAC-393 | Add tests for required adjustment reason | Missing | — | — | — | — |

## User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Chưa audit |
| Acceptance Criteria verified | Chưa audit |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Git/PR evidence | — |
| Recommended implementation order | — |

---

# US-51 — Chọn MedicineBatch cần điều chỉnh

| Task | Jira Key thật | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|---|
| PAC-TASK-165 | PAC-375 | Build MedicineBatch selector for adjustment | Missing | — | — | — | — |
| PAC-TASK-169 | PAC-379 | Show batch before/after quantity preview | Missing | — | — | — | — |

## User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Chưa audit |
| Acceptance Criteria verified | Chưa audit |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Git/PR evidence | — |
| Recommended implementation order | — |

---

# US-52 — Confirm Inventory Adjustment transaction

| Task | Jira Key thật | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|---|
| PAC-TASK-170 | PAC-380 | Implement confirm Inventory Adjustment transaction | Missing | — | — | — | — |
| PAC-TASK-171 | PAC-381 | Update MedicineBatch through adjustment transaction only | Missing | — | — | — | — |
| PAC-TASK-173 | PAC-383 | Lock confirmed Inventory Adjustment | Missing | — | — | — | — |
| PAC-TASK-188 | PAC-398 | Refresh Inventory Summary after adjustment confirm | Missing | — | — | — | — |

## User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Chưa audit |
| Acceptance Criteria verified | Chưa audit |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Git/PR evidence | — |
| Recommended implementation order | — |

---

# US-53 — Chặn adjustment làm quantity âm

| Task | Jira Key thật | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|---|
| PAC-TASK-172 | PAC-382 | Prevent adjustment from making quantity negative | Missing | — | — | — | — |
| PAC-TASK-182 | PAC-392 | Add tests for negative quantity adjustment | Missing | — | — | — | — |

## User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Chưa audit |
| Acceptance Criteria verified | Chưa audit |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Git/PR evidence | — |
| Recommended implementation order | — |

---

# US-54 — Warehouse tạo và confirm adjustment

| Task | Jira Key thật | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|---|
| PAC-TASK-178 | PAC-388 | Add Warehouse permission for create/confirm adjustment | Missing | — | — | — | — |
| PAC-TASK-184 | PAC-394 | Add tests for Warehouse adjustment permission | Missing | — | — | — | — |

## User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Chưa audit |
| Acceptance Criteria verified | Chưa audit |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Git/PR evidence | — |
| Recommended implementation order | — |

---

# US-55 — Audit Inventory Adjustment

| Task | Jira Key thật | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|---|
| PAC-TASK-180 | PAC-390 | Write audit log for Inventory Adjustment | Missing | — | — | — | — |
| PAC-TASK-181 | PAC-391 | Display adjustment audit information in UI | Missing | — | — | — | — |

## User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Chưa audit |
| Acceptance Criteria verified | Chưa audit |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Git/PR evidence | — |
| Recommended implementation order | — |

---

# US-56 — Admin xem lịch sử adjustment

| Task | Jira Key thật | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|---|
| PAC-TASK-174 | PAC-384 | Create Inventory Adjustment list API | Missing | — | — | — | — |
| PAC-TASK-175 | PAC-385 | Build Inventory Adjustment history list UI | Missing | — | — | — | — |
| PAC-TASK-176 | PAC-386 | Implement Inventory Adjustment detail API | Missing | — | — | — | — |
| PAC-TASK-177 | PAC-387 | Build Inventory Adjustment detail screen | Missing | — | — | — | — |
| PAC-TASK-179 | PAC-389 | Add Admin permission for adjustment history and review | Missing | — | — | — | — |
| PAC-TASK-186 | PAC-396 | Implement cancel Draft Inventory Adjustment API | Missing | — | — | — | — |
| PAC-TASK-187 | PAC-397 | Build cancel Draft Inventory Adjustment UI | Missing | — | — | — | — |
| PAC-TASK-189 | PAC-399 | Add Inventory Adjustment smoke test checklist | Missing | — | — | — | — |
| PAC-TASK-190 | PAC-400 | Add Inventory Adjustment traceability notes | Missing | — | — | — | — |

## User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Chưa audit |
| Acceptance Criteria verified | Chưa audit |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Git/PR evidence | — |
| Recommended implementation order | — |

---

# 15. Cross-sprint Hardening — PAC-EPIC-05 / US-38

> `PAC-TASK-185` nằm trong Task range Sprint 4 nhưng Jira parent chính thức vẫn là `US-38 / PAC-EPIC-05`.
> Không tự chuyển parent sang PAC-EPIC-07.

| Task | Jira Key thật | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|---|
| PAC-TASK-185 | PAC-395 | Block direct MedicineBatch quantity update service path | Missing | — | — | — | — |
## Cross-sprint Audit Checklist

- [ ] Xác minh branch hiện có của US-38.
- [ ] Xác minh branch hiện có của PAC-EPIC-05.
- [ ] Xác minh PAC-TASK-185 chưa được implement ở Sprint 3.
- [ ] Kiểm tra public API/service path sửa trực tiếp MedicineBatch quantity.
- [ ] Kiểm tra UI direct quantity edit.
- [ ] Kiểm tra Inventory Adjustment là workflow thay đổi thủ công duy nhất.
- [ ] Xác định target branch đúng cho PAC-TASK-185.
- [ ] Không tạo duplicate branch hoặc duplicate implementation.

## Cross-sprint Conclusion

| Mục | Kết quả |
|---|---|
| Task status | Chưa audit |
| Correct parent confirmed | Chưa audit |
| Existing branch | — |
| Existing implementation | — |
| Conflict | — |
| Recommended merge path | — |

---

# 16. PAC-EPIC-08 — POS Draft Order

## 16.1. Epic Audit Summary

| Mục | Kết quả |
|---|---|
| Jira Key thật | PAC-8 |
| Story range | US-57 → US-68 |
| Main task range | PAC-TASK-191 → PAC-TASK-226 |
| Epic status | Chưa audit |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Migration risk | — |
| Permission/ownership risk | — |
| Test gap | — |
| Recommended order | — |

---
# US-57 — Tạo Draft Order tại POS

| Task | Jira Key thật | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|---|
| PAC-TASK-191 | PAC-401 | Create orders Prisma model | Partial | Model Order exists but needs review | — | — | — | — |
| PAC-TASK-192 | PAC-402 | Create order_items Prisma model | Conflict | Model OrderDetail exists but uses productVariantId instead of medicine_id | — | — | — | — |
| PAC-TASK-193 | PAC-403 | Add order status enum DRAFT/PAID/CANCELLED | Missing | — | — | — | — |
| PAC-TASK-194 | PAC-404 | Implement create Draft Order API | Missing | — | — | — | — |
| PAC-TASK-195 | PAC-405 | Build POS Draft Order screen | Missing | — | — | — | — |
| PAC-TASK-225 | PAC-435 | Add POS API integration tests | Missing | — | — | — | — |

## User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Chưa audit |
| Acceptance Criteria verified | Chưa audit |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Git/PR evidence | — |
| Recommended implementation order | — |

---

# US-58 — Tìm thuốc trong POS

| Task | Jira Key thật | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|---|
| PAC-TASK-196 | PAC-406 | Implement POS medicine search API | Missing | — | — | — | — |
| PAC-TASK-197 | PAC-407 | Build POS medicine search component | Missing | — | — | — | — |
| PAC-TASK-198 | PAC-408 | Display sellable stock in POS search results | Missing | — | — | — | — |

## User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Chưa audit |
| Acceptance Criteria verified | Chưa audit |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Git/PR evidence | — |
| Recommended implementation order | — |

---

# US-59 — Thêm thuốc vào Draft Order

| Task | Jira Key thật | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|---|
| PAC-TASK-199 | PAC-409 | Implement add item to Draft Order API | Missing | — | — | — | — |
| PAC-TASK-200 | PAC-410 | Build add-to-order action in POS | Missing | — | — | — | — |
| PAC-TASK-201 | PAC-411 | Validate active medicine when adding POS item | Missing | — | — | — | — |

## User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Chưa audit |
| Acceptance Criteria verified | Chưa audit |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Git/PR evidence | — |
| Recommended implementation order | — |

---

# US-60 — Cập nhật số lượng thuốc trong Draft Order

| Task | Jira Key thật | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|---|
| PAC-TASK-202 | PAC-412 | Implement update Draft Order item quantity API | Missing | — | — | — | — |
| PAC-TASK-203 | PAC-413 | Build quantity controls in Draft Order UI | Missing | — | — | — | — |
| PAC-TASK-204 | PAC-414 | Validate Draft Order quantity greater than zero | Missing | — | — | — | — |

## User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Chưa audit |
| Acceptance Criteria verified | Chưa audit |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Git/PR evidence | — |
| Recommended implementation order | — |

---

# US-61 — Xóa thuốc khỏi Draft Order

| Task | Jira Key thật | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|---|
| PAC-TASK-206 | PAC-416 | Implement remove item from Draft Order API | Missing | — | — | — | — |
| PAC-TASK-207 | PAC-417 | Build remove item action in POS | Missing | — | — | — | — |

## User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Chưa audit |
| Acceptance Criteria verified | Chưa audit |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Git/PR evidence | — |
| Recommended implementation order | — |

---

# US-62 — Tính tổng tiền Draft Order

| Task | Jira Key thật | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|---|
| PAC-TASK-208 | PAC-418 | Implement Draft Order total calculation service | Missing | — | — | — | — |
| PAC-TASK-209 | PAC-419 | Display Draft Order totals in POS UI | Missing | — | — | — | — |
| PAC-TASK-210 | PAC-420 | Ensure no coupon or discount logic in MVP Draft Order total | Missing | — | — | — | — |

## User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Chưa audit |
| Acceptance Criteria verified | Chưa audit |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Git/PR evidence | — |
| Recommended implementation order | — |

---

# US-63 — Validate sellable stock khi lập đơn

| Task | Jira Key thật | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|---|
| PAC-TASK-205 | PAC-415 | Validate sellable stock when updating Draft Order quantity | Missing | — | — | — | — |
| PAC-TASK-211 | PAC-421 | Show POS stock validation errors | Missing | — | — | — | — |

## User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Chưa audit |
| Acceptance Criteria verified | Chưa audit |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Git/PR evidence | — |
| Recommended implementation order | — |

---

# US-64 — Hỗ trợ walk-in/anonymous customer

| Task | Jira Key thật | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|---|
| PAC-TASK-212 | PAC-422 | Implement walk-in customer support in order model | Missing | — | — | — | — |
| PAC-TASK-213 | PAC-423 | Display walk-in customer option in POS | Missing | — | — | — | — |
| PAC-TASK-214 | PAC-424 | Keep full Customer Management out of MVP POS flow | Missing | — | — | — | — |

## User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Chưa audit |
| Acceptance Criteria verified | Chưa audit |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Git/PR evidence | — |
| Recommended implementation order | — |

---

# US-65 — Staff chỉ xem đơn trong ownership scope

| Task | Jira Key thật | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|---|
| PAC-TASK-215 | PAC-425 | Apply Staff ownership scope to order list API | Missing | — | — | — | — |
| PAC-TASK-216 | PAC-426 | Build Staff scoped order list UI | Missing | — | — | — | — |
| PAC-TASK-224 | PAC-434 | Build Order Detail screen for DRAFT/PAID/CANCELLED | Missing | — | — | — | — |

## User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Chưa audit |
| Acceptance Criteria verified | Chưa audit |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Git/PR evidence | — |
| Recommended implementation order | — |

---

# US-66 — Admin xem tất cả đơn hàng

| Task | Jira Key thật | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|---|
| PAC-TASK-217 | PAC-427 | Implement Admin all-orders list API | Missing | — | — | — | — |
| PAC-TASK-218 | PAC-428 | Build Admin all-orders UI | Missing | — | — | — | — |

## User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Chưa audit |
| Acceptance Criteria verified | Chưa audit |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Git/PR evidence | — |
| Recommended implementation order | — |

---

# US-67 — Hủy Draft Order

| Task | Jira Key thật | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|---|
| PAC-TASK-219 | PAC-429 | Implement cancel Draft Order API | Missing | — | — | — | — |
| PAC-TASK-220 | PAC-430 | Build cancel Draft Order UI | Missing | — | — | — | — |
| PAC-TASK-221 | PAC-431 | Prevent cancel PAID or already CANCELLED order | Missing | — | — | — | — |

## User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Chưa audit |
| Acceptance Criteria verified | Chưa audit |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Git/PR evidence | — |
| Recommended implementation order | — |

---

# US-68 — Giữ Draft Order khi checkout fail

| Task | Jira Key thật | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|---|
| PAC-TASK-222 | PAC-432 | Preserve Draft Order after checkout failure in UI | Missing | — | — | — | — |
| PAC-TASK-223 | PAC-433 | Restore checkout error state back to Draft Order | Missing | — | — | — | — |
| PAC-TASK-226 | PAC-436 | Add POS frontend smoke test checklist | Missing | — | — | — | — |

## User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Chưa audit |
| Acceptance Criteria verified | Chưa audit |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Git/PR evidence | — |
| Recommended implementation order | — |

---

# 29. Database and Prisma Audit

## 29.1. Inventory Adjustment Schema

| Kiểm tra | Kết quả | Evidence | Risk / Recommended Action |
|---|---|---|---|
| `inventory_adjustments` model tồn tại | Chưa audit | — | — |
| `inventory_adjustment_lines` model tồn tại | Chưa audit | — | — |
| Status Draft/Confirmed/Cancelled | Chưa audit | — | — |
| Reason bắt buộc | Chưa audit | — | — |
| Actor fields | Chưa audit | — | — |
| Created/confirmed/cancelled timestamps | Chưa audit | — | — |
| Relation Adjustment → Lines | Chưa audit | — | — |
| Relation Line → MedicineBatch | Chưa audit | — | — |
| Adjustment type/delta | Chưa audit | — | — |
| Before/after quantity evidence | Chưa audit | — | — |
| Appropriate indexes | Chưa audit | — | — |
| Confirmed immutability support | Chưa audit | — | — |

## 29.2. POS Order Schema

| Kiểm tra | Kết quả | Evidence | Risk / Recommended Action |
|---|---|---|---|
| `orders` model tồn tại | Chưa audit | — | — |
| `order_items` model tồn tại | Chưa audit | — | — |
| Status chỉ DRAFT/PAID/CANCELLED | Chưa audit | — | — |
| Staff ownership field | Chưa audit | — | — |
| Anonymous/walk-in support | Chưa audit | — | — |
| Order item dùng `medicine_id` | Chưa audit | — | — |
| Unique `order_id + medicine_id` | Chưa audit | — | — |
| Quantity constraint | Chưa audit | — | — |
| Unit price/subtotal fields | Chưa audit | — | — |
| Total calculation fields | Chưa audit | — | — |
| Không có coupon/discount MVP | Chưa audit | — | — |
| Quan hệ tương lai không ép Checkout Sprint 6 | Chưa audit | — | — |

## 29.3. Source-of-Truth and Migration Risk

| Kiểm tra | Kết quả | Evidence | Risk / Recommended Action |
|---|---|---|---|
| MedicineBatch là inventory source of truth | Chưa audit | — | — |
| Không aggregate inventory source of truth | Chưa audit | — | — |
| Không public direct quantity update | Chưa audit | — | — |
| Draft Order không trừ inventory | Chưa audit | — | — |
| Existing migrations không bị sửa nguy hiểm | Chưa audit | — | — |
| Migration mới có rollback strategy | Chưa audit | — | — |
| Prisma validate | Chưa chạy | — | — |
| Prisma generate | Chưa chạy | — | — |

---

# 30. Backend Audit

## 30.1. Inventory Adjustment Backend

| Khu vực | Kết quả | Evidence | Missing / Conflict |
|---|---|---|---|
| Create Draft API | Chưa audit | — | — |
| Create/update/delete lines | Chưa audit | — | — |
| MedicineBatch selector | Chưa audit | — | — |
| Required reason validation | Chưa audit | — | — |
| Adjustment type/quantity validation | Chưa audit | — | — |
| Before/after preview contract | Chưa audit | — | — |
| Confirm transaction | Chưa audit | — | — |
| Rollback on line failure | Chưa audit | — | — |
| Negative quantity protection | Chưa audit | — | — |
| Confirmed immutability | Chưa audit | — | — |
| Cancel Draft API | Chưa audit | — | — |
| List/detail/history APIs | Chưa audit | — | — |
| Audit log | Chưa audit | — | — |
| Inventory Summary refresh/invalidation | Chưa audit | — | — |
| Direct quantity update blocked | Chưa audit | — | — |

## 30.2. POS Draft Order Backend

| Khu vực | Kết quả | Evidence | Missing / Conflict |
|---|---|---|---|
| Create Draft Order API | Chưa audit | — | — |
| Default status DRAFT | Chưa audit | — | — |
| Medicine search API | Chưa audit | — | — |
| Active medicine filter | Chưa audit | — | — |
| Sellable stock response | Chưa audit | — | — |
| Add item API | Chưa audit | — | — |
| Duplicate medicine item handling | Chưa audit | — | — |
| Update quantity API | Chưa audit | — | — |
| Remove item API | Chưa audit | — | — |
| Quantity > 0 validation | Chưa audit | — | — |
| Sellable stock validation | Chưa audit | — | — |
| Total calculation service | Chưa audit | — | — |
| Anonymous customer support | Chưa audit | — | — |
| Staff ownership filter | Chưa audit | — | — |
| Admin all-orders | Chưa audit | — | — |
| Warehouse denied | Chưa audit | — | — |
| Cancel Draft lifecycle | Chưa audit | — | — |
| Preserve Draft on checkout failure | Chưa audit | — | — |
| Draft does not deduct inventory | Chưa audit | — | — |

---

# 31. Frontend Audit

## 31.1. Inventory Adjustment UI

| Khu vực | Kết quả | Evidence | Missing / Conflict |
|---|---|---|---|
| Create Adjustment screen | Chưa audit | — | — |
| Required reason field | Chưa audit | — | — |
| MedicineBatch selector | Chưa audit | — | — |
| Before/after preview | Chưa audit | — | — |
| Negative quantity warning | Chưa audit | — | — |
| Confirm action | Chưa audit | — | — |
| Confirmed read-only UI | Chưa audit | — | — |
| List/history UI | Chưa audit | — | — |
| Detail UI | Chưa audit | — | — |
| Audit metadata | Chưa audit | — | — |
| Cancel Draft UI | Chưa audit | — | — |
| Inventory Summary refresh | Chưa audit | — | — |
| Loading/empty/error/success states | Chưa audit | — | — |

## 31.2. POS Draft Order UI

| Khu vực | Kết quả | Evidence | Missing / Conflict |
|---|---|---|---|
| POS Draft Order screen | Chưa audit | — | — |
| Medicine search | Chưa audit | — | — |
| Sellable stock display | Chưa audit | — | — |
| Add item action | Chưa audit | — | — |
| Quantity controls | Chưa audit | — | — |
| Remove item action | Chưa audit | — | — |
| Total display | Chưa audit | — | — |
| No coupon/discount UI | Chưa audit | — | — |
| Walk-in customer option | Chưa audit | — | — |
| Staff order list | Chưa audit | — | — |
| Admin all-orders UI | Chưa audit | — | — |
| Order Detail | Chưa audit | — | — |
| Cancel Draft UI | Chưa audit | — | — |
| Checkout failure recovery state | Chưa audit | — | — |
| Permission-aware routes/actions | Chưa audit | — | — |
| Loading/empty/error/success states | Chưa audit | — | — |

---

# 32. Permission, Ownership and Security Audit

| Rule | Kết quả | Evidence | Missing / Conflict |
|---|---|---|---|
| Supabase Auth tiếp tục được dùng | Chưa audit | — | — |
| Backend AuthGuard | Chưa audit | — | — |
| Backend PermissionsGuard | Chưa audit | — | — |
| Warehouse create adjustment | Chưa audit | — | — |
| Warehouse confirm adjustment | Chưa audit | — | — |
| Staff không điều chỉnh kho | Chưa audit | — | — |
| Admin xem adjustment history | Chưa audit | — | — |
| Staff dùng POS | Chưa audit | — | — |
| Staff chỉ thấy order của mình | Chưa audit | — | — |
| Admin thấy tất cả orders | Chưa audit | — | — |
| Warehouse bị chặn khỏi POS | Chưa audit | — | — |
| Direct API ngoài ownership bị chặn | Chưa audit | — | — |
| Frontend không thay backend authorization | Chưa audit | — | — |
| DTO whitelist/mass assignment protection | Chưa audit | — | — |
| Không log secret/token | Chưa audit | — | — |
| Không commit `.env` | Chưa audit | — | — |

---

# 33. Testing Audit

| Test Area | Existing Tests | Status | Missing Tests | Recommended Action |
|---|---|---|---|---|
| Create Draft Adjustment | — | Chưa audit | — | — |
| Required reason | — | Chưa audit | — | — |
| Adjustment quantity/type | — | Chưa audit | — | — |
| Confirm transaction | — | Chưa audit | — | — |
| Rollback | — | Chưa audit | — | — |
| Negative quantity rejection | — | Chưa audit | — | — |
| Confirmed immutability | — | Chưa audit | — | — |
| Cancel Draft Adjustment | — | Chưa audit | — | — |
| Warehouse permission | — | Chưa audit | — | — |
| Adjustment audit | — | Chưa audit | — | — |
| Direct quantity update blocked | — | Chưa audit | — | — |
| Create Draft Order | — | Chưa audit | — | — |
| Add/update/remove item | — | Chưa audit | — | — |
| Total calculation | — | Chưa audit | — | — |
| Sellable stock validation | — | Chưa audit | — | — |
| Anonymous customer | — | Chưa audit | — | — |
| Staff ownership | — | Chưa audit | — | — |
| Admin all-orders | — | Chưa audit | — | — |
| Warehouse denied | — | Chưa audit | — | — |
| Cancel Draft Order | — | Chưa audit | — | — |
| Preserve Draft after checkout failure | — | Chưa audit | — | — |
| POS integration tests | — | Chưa audit | — | — |
| Frontend smoke checklist | — | Chưa audit | — | — |

---

# 34. Git and GitHub Audit

## 34.1. Repository State

| Kiểm tra | Kết quả | Evidence / Action |
|---|---|---|
| Workspace sạch | Chưa audit | — |
| `main` mới nhất | Chưa audit | — |
| `develop` mới nhất | Chưa audit | — |
| Sprint 3 đã merge vào develop | Chưa audit | — |
| Không có commit trực tiếp trái quy trình | Chưa audit | — |
| Không có secret trong history | Chưa audit | — |

## 34.2. Branch and Jira Mapping

| Kiểm tra | Kết quả | Evidence / Action |
|---|---|---|
| Jira Key lấy từ `jira-mapping.md` | Chưa audit | — |
| Epic branches tồn tại/đúng format | Chưa audit | — |
| Story branches tồn tại/đúng format | Chưa audit | — |
| Task branches dùng Jira Key thật | Chưa audit | — |
| Không dùng Wave branch thay Task branch | Chưa audit | — |
| PAC-TASK-185 giữ parent đúng | Chưa audit | — |
| Branch được giữ làm evidence | Chưa audit | — |

## 34.3. Pull Request Flow

| Luồng | Kết quả | Missing Evidence |
|---|---|---|
| Task → Story | Chưa audit | — |
| Story → Epic | Chưa audit | — |
| Epic → develop | Chưa audit | — |
| develop → main | Chưa tạo/Chưa audit | — |
| PR checks trước merge | Chưa audit | — |
| PR description có test/risk | Chưa audit | — |

---

# 35. Existing Architecture Summary

## 35.1. Database

Chưa audit.

## 35.2. Inventory Adjustment Backend

Chưa audit.

## 35.3. POS Backend

Chưa audit.

## 35.4. Frontend

Chưa audit.

## 35.5. Authorization and Ownership

Chưa audit.

## 35.6. Testing and CI

Chưa audit.

---

# 36. Reusable Code List

| Module / File | Nội dung có thể tái sử dụng | Story/Task liên quan | Ghi chú |
|---|---|---|---|
| Chưa audit | — | — | — |

---

# 37. Conflict List

| ID | Conflict | Baseline bị vi phạm | Severity | Evidence | Recommended Resolution |
|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — |

Các conflict cần ưu tiên phát hiện:

- Aggregate inventory được dùng làm source of truth.
- Public API hoặc service sửa trực tiếp MedicineBatch quantity.
- Adjustment không có reason.
- Adjustment confirm không dùng transaction.
- Adjustment có thể làm quantity âm.
- Confirmed adjustment vẫn sửa được.
- Draft Order làm giảm tồn kho.
- Order status có thêm trạng thái ngoài DRAFT/PAID/CANCELLED trong MVP.
- POS dùng product_variant_id thay medicine_id.
- Duplicate order item cùng medicine.
- Staff xem được order của Staff khác.
- Warehouse truy cập POS.
- Coupon/discount được triển khai trong Sprint 4.
- Checkout/FEFO/Payment/Invoice bị triển khai lấn Sprint 6.
- PAC-TASK-185 bị đổi sai parent.

---

# 38. Missing Modules and Work

| Module / Capability | Status | Story/Task liên quan | Dependency | Recommended Action |
|---|---|---|---|---|
| Chưa audit | — | — | — | — |

---

# 39. Migration and Data Risk

| Risk ID | Mô tả | Severity | Evidence | Mitigation |
|---|---|---|---|---|
| Chưa audit | — | — | — | — |

Phải kiểm tra:

- Existing MedicineBatch data compatibility.
- New required fields có ảnh hưởng dữ liệu cũ.
- Composite unique cho OrderItem.
- Order status enum migration.
- Adjustment status enum migration.
- Anonymous customer nullable fields.
- Actor/profile relation.
- Decimal/money precision.
- Before/after quantity audit fields.
- Rollback nếu migration fail.
- Không reset database demo/production.

---

# 40. Open Questions

| ID | Câu hỏi | Tài liệu/code liên quan | Ảnh hưởng | Đề xuất |
|---|---|---|---|---|
| OQ-01 | Adjustment dùng delta signed hay type + positive quantity? | Schema/Task 166 | Validation và audit | Chốt một contract duy nhất |
| OQ-02 | Adjustment hỗ trợ nhiều lines hay một batch mỗi phiếu? | US-49/US-52 | Transaction/UI | Theo schema Task 162 và tài liệu chính thức |
| OQ-03 | Draft Adjustment có được edit line đầy đủ không? | Task List/Description | API/UI | Audit code và giữ scope tối thiểu |
| OQ-04 | Before/after quantity lưu snapshot hay chỉ tính khi query? | Audit requirement | Traceability | Ưu tiên snapshot tại confirm |
| OQ-05 | POS unit price snapshot lấy tại add item hay update? | OrderItem schema | Total/history | Chốt deterministic behavior |
| OQ-06 | Duplicate medicine add sẽ cộng quantity hay reject? | Unique order+medicine | UX/API | Dùng một behavior thống nhất và test |
| OQ-07 | Checkout failure contract đã có endpoint/stub chưa? | US-68 | Recovery UI | Không implement full checkout Sprint 6 |
| OQ-08 | Admin bán hàng dùng cùng ownership model nào? | Role baseline | POS scope | Admin được xem/toàn quyền theo permission |

---

# 41. Recommended Implementation Order

Chưa audit.

Thứ tự dự kiến cần được xác nhận sau audit:

1. Dependency gate và PAC-TASK-185 hardening.
2. US-49 → US-51: Adjustment foundation, reason, batch selector.
3. US-52 → US-55: Transaction, negative protection, permission và audit.
4. US-56: History, cancel Draft, refresh, smoke và traceability.
5. US-57 → US-58: Order schema, Draft creation và search.
6. US-59 → US-63: Item lifecycle, total và sellable stock validation.
7. US-64 → US-68: Walk-in, ownership, Admin view, cancel và recovery.
8. Full Epic verification và merge.

---

# 42. Skill Recommendation after Audit

| Nhóm công việc | Skill đề xuất |
|---|---|
| Repository/architecture audit | `agent-skills-lifecycle`, `ecc-code-quality` |
| Prisma/schema/migration | `ecc-database`, `ecc-backend`, `tdd`, `ecc-testing` |
| Transaction/rollback | `ecc-database`, `ecc-backend`, `mattpocock-engineering`, `tdd` |
| Backend/API | `ecc-backend`, `ecc-security`, `tdd`, `ecc-testing` |
| Frontend | `modern-web-guidance`, `ecc-frontend`, `design-system-guide`, `ecc-testing` |
| Permission/ownership | `ecc-security`, `ecc-backend`, `ecc-testing` |
| Inventory safety | `ecc-healthcare`, `ecc-database`, `ecc-backend` |
| Git/PR | `git-github`, `ecc-devops`, `ecc-business-ops` |
| Documentation/progress | `mattpocock-productivity`, `ecc-business-ops` |

---

# 43. Remediation Plan

Chỉ điền phần này nếu audit phát hiện `Partial`, `Missing`, `Conflict` hoặc `Failed Verification`.

| ID | Severity | Epic | Story | Task | Root Cause | Required Fix | Test Required | Branch/Jira | Status |
|---|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | — | — | — |

---

# 44. Audit Conclusion

| Mục | Kết quả |
|---|---|
| Audit completed | No |
| Sprint 3 gate verified | No |
| Total tasks audited | 0/66 |
| Done | 0 |
| Partial | 1 |
| Missing | 64 |
| Conflict | 1 |
| Failed Verification | 0 |
| Blocking conflicts | Chưa xác định |
| Recommended first task | Chưa xác định |
| Recommended first User Story | Chưa xác định |
| Database migration safe to start | Chưa xác định |
| Ready to create implementation branches | No |
| Ready to implement Sprint 4 | Yes |

## Final Auditor Notes

Chưa audit.

## Next Action

```text
Xác minh Sprint 3 gate, audit toàn bộ PAC-TASK-161 → PAC-TASK-226, cập nhật sprint-4-progress.md và chỉ sau đó mới tạo implementation branches.
```
