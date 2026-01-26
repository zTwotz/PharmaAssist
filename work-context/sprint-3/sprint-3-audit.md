# Sprint 3 Audit — PharmaAssist AI Intelligence

> File này dùng để ghi nhận kết quả audit hiện trạng repository trước khi triển khai Sprint 3.
> AI Agent phải hoàn thành audit trước khi sửa business code.
> File này chỉ ghi bằng chứng thực tế; không suy đoán và không đánh dấu `Done` chỉ vì tồn tại file hoặc module cùng tên.

---

# 1. Sprint Information

| Mục | Nội dung |
|---|---|
| Sprint | Sprint 3 |
| Sprint name | MedicineBatch, Inventory Summary & Stock Import |
| Epic nghiệp vụ | PAC-EPIC-05, PAC-EPIC-06 |
| Story range | US-27 → US-48 |
| Task range | PAC-TASK-102 → PAC-TASK-160 |
| Tổng User Story | 22 |
| Tổng Task | 59 |
| Audit status | Completed |
| Audit date | 2026-06-21 |
| Auditor | AI Agent |
| Repository branch | develop |
| Base commit | Chưa cập nhật |

---

# 2. Audit Status Definitions

Chỉ sử dụng các trạng thái sau:

| Status | Ý nghĩa |
|---|---|
| `Done` | Đã đạt đầy đủ acceptance criteria, tích hợp đúng và có test evidence |
| `Partial` | Đã có một phần nhưng còn thiếu acceptance criteria, test hoặc integration |
| `Missing` | Chưa có implementation cần thiết |
| `Conflict` | Code hiện có trái baseline hoặc gây xung đột kiến trúc/nghiệp vụ |
| `N/A` | Không áp dụng, phải ghi rõ lý do |

Quy tắc:

- Không đánh dấu `Done` nếu chưa có bằng chứng cụ thể.
- Có model/file nhưng thiếu constraint, API, UI hoặc test thì là `Partial`.
- Code dùng aggregate inventory làm source of truth thì phải đánh dấu `Conflict`.
- Không sửa business code trong quá trình audit.
- Không tạo migration, branch implementation hoặc PR implementation trong bước audit.
- Mọi kết luận phải có đường dẫn file, symbol, migration, test hoặc command output làm evidence.

---

# 3. Tài liệu và khu vực phải đọc

## 3.1. Project Context

- [x] `AGENTS.md`
- [x] `.agents/rules/rules-w-pharmaassist.md`
- [x] `WORKING-CONTEXT.md`
- [x] `work-context/sprint-2/sprint-2-progress.md`
- [x] `work-context/sprint-3/sprint-3.md`
- [x] `work-context/sprint-3/sprint-3-progress.md`

## 3.2. Jira

- [x] `Jira/1_Components.md`
- [x] `Jira/2_Epic.md`
- [x] `Jira/3_Stories.md`
- [x] `Jira/4A_Task_MVP_Foundation_001_145.md`
- [x] `Jira/4A_Task_Description_MVP_Foundation_001_145.md`
- [x] `Jira/4B_Task_List_MVP_POS_Interaction_Checkout_146_290.md`
- [x] `Jira/4B_Task_Description_MVP_POS_Interaction_Checkout_146_290.md`
- [x] `Jira/5_Sprint.md`
- [x] `Jira/jira-mapping.md`

## 3.3. Codebase

- [x] `backend/prisma/schema.prisma`
- [x] `backend/prisma/migrations`
- [ ] Prisma seed files
- [ ] Inventory-related backend modules
- [ ] MedicineBatch-related backend modules
- [ ] Stock Import-related backend modules
- [ ] Supplier integration
- [ ] Audit log foundation
- [ ] Frontend inventory pages/components
- [ ] Frontend Stock Import pages/components
- [ ] Backend unit/integration/E2E tests
- [ ] Frontend tests và manual-test documentation
- [ ] Permission seed và role mappings

---

# 4. Audit Executive Summary

| Nội dung | Kết quả |
|---|---|
| Existing architecture summary | Schema 100 bảng đã có Inventory, StockBatch, StockImport (dùng productVariantId thay vì medicineId). Inventory.quantity đang được dùng làm source-of-truth. |
| Reusable code | Có thể tái sử dụng schema migrations, models (sửa lại thành MedicineBatch), và giao diện /inventory. |
| Missing modules | MedicineBatch logic, Draft Stock Import API/UI, Batch Identity validations, Rollback Transaction. |
| Conflicts | - StockBatch dùng productVariantId thay vì medicineId
- StockImport dùng productVariantId
- Inventory.quantity cho phép sửa trực tiếp (inventories.service.ts) |
| Database migration risks | Đổi StockBatch thành MedicineBatch có thể ảnh hưởng data mẫu. Cần migrate an toàn. |
| Security/permission risks | Cần áp dụng AuthGuard và PermissionsGuard chặt chẽ cho Stock Import. |
| Testing gaps | Thiếu unit tests cho expiry, batch identity, sellable quantity và integration tests cho Stock Import. |
| Recommended first User Story | US-27 (MedicineBatch source of truth) và PAC-TASK-102. |
| Ready to implement | Yes (Sau khi plan được duyệt) |

## 4.1. Tổng hợp trạng thái Task

| Status | Số lượng |
|---|---:|
| Done | 0 |
| Partial | 0 |
| Missing | 0 |
| Conflict | 0 |
| N/A | 0 |
| Chưa audit | 59 |

---

# 5. PAC-EPIC-05 — Inventory & MedicineBatch

## US-27 — Thiết kế MedicineBatch là source of truth

| Task | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|
| PAC-TASK-102 | Create medicine_batches Prisma model | Conflict | Có StockBatch liên kết productVariant | Tạo MedicineBatch liên kết Medicine | Xung đột thiết kế | Tạo model MedicineBatch thay thế hoặc đổi tên |
| PAC-TASK-103 | Add MedicineBatch indexes and constraints | Missing | Chưa có | Thêm indexes | N/A | Tạo trong schema |
| PAC-TASK-104 | Remove aggregate inventory source-of-truth assumptions | Conflict | inventories.service.ts dùng Inventory.quantity | Sửa logic update | Dữ liệu sai lệch | Sửa service dùng MedicineBatch |
| PAC-TASK-105 | Document MedicineBatch as inventory source of truth | Missing | Chưa có | Viết doc | N/A | Update doc |

### User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Missing/Conflict |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Recommended implementation order | — |

---

## US-28 — Batch number bắt buộc

| Task | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|
| PAC-TASK-106 | Enforce required batch_number | Missing | — | Enforce required batch_number | — | Implement |
| PAC-TASK-107 | Normalize batch_number before comparison | Missing | — | Normalize batch_number before comparison | — | Implement |
| PAC-TASK-108 | Add UI validation for batch_number | Missing | — | Add UI validation for batch_number | — | Implement |

### User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Missing/Conflict |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Recommended implementation order | — |

---

## US-29 — Batch identity theo medicine + batch + expiry

| Task | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|
| PAC-TASK-109 | Implement batch identity validation service | Missing | — | Implement batch identity validation service | — | Implement |
| PAC-TASK-110 | Add migration constraint for medicine/batch/expiry uniqueness | Missing | — | Add migration constraint for medicine/batch/expiry uniqueness | — | Implement |
| PAC-TASK-111 | Add batch identity unit tests | Missing | — | Add batch identity unit tests | — | Implement |

### User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Missing/Conflict |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Recommended implementation order | — |

---

## US-30 — Inventory Summary từ MedicineBatch

| Task | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|
| PAC-TASK-112 | Implement inventory summary query from MedicineBatch | Missing | — | Implement inventory summary query from MedicineBatch | — | Implement |
| PAC-TASK-113 | Build Inventory Summary screen | Missing | — | Build Inventory Summary screen | — | Implement |
| PAC-TASK-114 | Add search/filter to Inventory Summary | Missing | — | Add search/filter to Inventory Summary | — | Implement |

### User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Missing/Conflict |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Recommended implementation order | — |

---

## US-31 — Batch Detail view

| Task | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|
| PAC-TASK-115 | Implement Batch Detail API | Missing | — | Implement Batch Detail API | — | Implement |
| PAC-TASK-116 | Build Batch Detail screen | Missing | — | Build Batch Detail screen | — | Implement |
| PAC-TASK-117 | Display expired/near-expiry/sellable batch status | Missing | — | Display expired/near-expiry/sellable batch status | — | Implement |

### User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Missing/Conflict |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Recommended implementation order | — |

---

## US-32 — Tính sellable quantity

| Task | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|
| PAC-TASK-118 | Implement sellable quantity calculation service | Missing | — | Implement sellable quantity calculation service | — | Implement |
| PAC-TASK-119 | Add tests for sellable quantity calculation | Missing | — | Add tests for sellable quantity calculation | — | Implement |

### User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Missing/Conflict |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Recommended implementation order | — |

---

## US-33 — Loại trừ batch hết hạn khỏi sellable stock

| Task | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|
| PAC-TASK-120 | Exclude expired batches from sellable stock | Missing | — | Exclude expired batches from sellable stock | — | Implement |
| PAC-TASK-121 | Add tests for expired batch exclusion | Missing | — | Add tests for expired batch exclusion | — | Implement |

### User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Missing/Conflict |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Recommended implementation order | — |

---

## US-34 — Low-stock dựa trên sellable quantity

| Task | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|
| PAC-TASK-122 | Implement low-stock calculation from sellable quantity | Missing | — | Implement low-stock calculation from sellable quantity | — | Implement |
| PAC-TASK-123 | Display low-stock state for Admin/Warehouse | Missing | — | Display low-stock state for Admin/Warehouse | — | Implement |
| PAC-TASK-124 | Hide general low-stock dashboard from Staff | Missing | — | Hide general low-stock dashboard from Staff | — | Implement |

### User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Missing/Conflict |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Recommended implementation order | — |

---

## US-35 — Near-expiry theo threshold cấu hình

| Task | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|
| PAC-TASK-125 | Implement near-expiry calculation with threshold | Missing | — | Implement near-expiry calculation with threshold | — | Implement |
| PAC-TASK-126 | Display near-expiry batch state | Missing | — | Display near-expiry batch state | — | Implement |

### User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Missing/Conflict |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Recommended implementation order | — |

---

## US-36 — Inventory dashboard cho Admin/Warehouse

| Task | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|
| PAC-TASK-127 | Build Admin/Warehouse inventory dashboard cards | Missing | — | Build Admin/Warehouse inventory dashboard cards | — | Implement |

### User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Missing/Conflict |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Recommended implementation order | — |

---

## US-37 — POS chỉ xem sellable stock cần bán

| Task | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|
| PAC-TASK-128 | Build POS sellable stock display | Missing | — | Build POS sellable stock display | — | Implement |

### User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Missing/Conflict |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Recommended implementation order | — |

---

## US-38 — Chặn sửa trực tiếp quantity trong Batch Detail

| Task | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|
| PAC-TASK-129 | Remove direct quantity edit from Batch Detail UI | Missing | — | Remove direct quantity edit from Batch Detail UI | — | Implement |
| PAC-TASK-130 | Ensure no public API directly edits batch quantity | Missing | — | Ensure no public API directly edits batch quantity | — | Implement |

### User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Missing/Conflict |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Recommended implementation order | — |

---

# 6. PAC-EPIC-06 — Stock Import

## US-39 — Tạo phiếu nhập kho draft

| Task | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|
| PAC-TASK-131 | Create stock_imports Prisma model | Conflict | Có StockImport (productVariant) | Đổi sang Medicine | Xung đột thiết kế | Sửa schema StockImport |
| PAC-TASK-132 | Implement create Stock Import draft API | Missing | — | Implement create Stock Import draft API | — | Implement |
| PAC-TASK-133 | Build create Stock Import screen | Missing | — | Build create Stock Import screen | — | Implement |

### User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Missing/Conflict |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Recommended implementation order | — |

---

## US-40 — Thêm dòng thuốc vào phiếu nhập

| Task | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|
| PAC-TASK-134 | Create stock_import_lines Prisma model | Missing | — | Create stock_import_lines Prisma model | — | Implement |
| PAC-TASK-135 | Implement add stock import line API | Missing | — | Implement add stock import line API | — | Implement |
| PAC-TASK-136 | Build stock import line editor UI | Missing | — | Build stock import line editor UI | — | Implement |

### User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Missing/Conflict |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Recommended implementation order | — |

---

## US-41 — Cập nhật/xóa dòng nhập khi còn draft

| Task | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|
| PAC-TASK-137 | Implement update draft import line API | Missing | — | Implement update draft import line API | — | Implement |
| PAC-TASK-138 | Implement delete draft import line API | Missing | — | Implement delete draft import line API | — | Implement |
| PAC-TASK-139 | Disable edit/delete for confirmed import lines | Missing | — | Disable edit/delete for confirmed import lines | — | Implement |

### User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Missing/Conflict |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Recommended implementation order | — |

---

## US-42 — Validate supplier trong phiếu nhập

| Task | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|
| PAC-TASK-140 | Validate active supplier before confirm import | Missing | — | Validate active supplier before confirm import | — | Implement |

### User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Missing/Conflict |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Recommended implementation order | — |

---

## US-43 — Validate batch number và expiry date

| Task | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|
| PAC-TASK-141 | Validate batch number in import line | Missing | — | Validate batch number in import line | — | Implement |
| PAC-TASK-142 | Validate expiry date in import line | Missing | — | Validate expiry date in import line | — | Implement |

### User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Missing/Conflict |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Recommended implementation order | — |

---

## US-44 — Confirm Stock Import transaction

| Task | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|
| PAC-TASK-143 | Implement confirm Stock Import transaction skeleton | Missing | — | Implement confirm Stock Import transaction skeleton | — | Implement |
| PAC-TASK-144 | Apply stock import lines to MedicineBatch | Missing | — | Apply stock import lines to MedicineBatch | — | Implement |
| PAC-TASK-145 | Rollback Stock Import confirm on any invalid line | Missing | — | Rollback Stock Import confirm on any invalid line | — | Implement |

### User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Missing/Conflict |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Recommended implementation order | — |

---

## US-45 — Merge batch khi medicine/batch/expiry trùng

| Task | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|
| PAC-TASK-146 | Implement batch merge when medicine/batch/expiry match | Missing | — | Implement batch merge when medicine/batch/expiry match | — | Implement |
| PAC-TASK-147 | Add unit tests for valid batch merge rule | Missing | — | Add unit tests for valid batch merge rule | — | Implement |
| PAC-TASK-148 | Show batch merge result after Stock Import confirm | Missing | — | Show batch merge result after Stock Import confirm | — | Implement |

### User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Missing/Conflict |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Recommended implementation order | — |

---

## US-46 — Reject batch khi cùng batch nhưng khác expiry

| Task | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|
| PAC-TASK-149 | Implement expiry mismatch rejection | Missing | — | Implement expiry mismatch rejection | — | Implement |
| PAC-TASK-150 | Return line-level expiry mismatch errors | Missing | — | Return line-level expiry mismatch errors | — | Implement |
| PAC-TASK-151 | Add tests for expiry mismatch rejection | Missing | — | Add tests for expiry mismatch rejection | — | Implement |

### User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Missing/Conflict |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Recommended implementation order | — |

---

## US-47 — Khóa phiếu nhập đã confirmed

| Task | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|
| PAC-TASK-152 | Lock confirmed Stock Import status | Missing | — | Lock confirmed Stock Import status | — | Implement |
| PAC-TASK-153 | Build confirmed Stock Import read-only UI | Missing | — | Build confirmed Stock Import read-only UI | — | Implement |
| PAC-TASK-154 | Prevent duplicate Stock Import confirm | Missing | — | Prevent duplicate Stock Import confirm | — | Implement |
| PAC-TASK-155 | Add tests for confirmed Stock Import immutability | Missing | — | Add tests for confirmed Stock Import immutability | — | Implement |

### User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Missing/Conflict |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Recommended implementation order | — |

---

## US-48 — Audit Stock Import

| Task | Nội dung | Status | Existing Evidence | Missing Work | Conflict / Risk | Recommended Action |
|---|---|---|---|---|---|---|
| PAC-TASK-156 | Write audit log for Stock Import confirm | Missing | — | Write audit log for Stock Import confirm | — | Implement |
| PAC-TASK-157 | Show Stock Import audit metadata in detail UI | Missing | — | Show Stock Import audit metadata in detail UI | — | Implement |
| PAC-TASK-158 | Add Stock Import traceability notes | Missing | — | Add Stock Import traceability notes | — | Implement |
| PAC-TASK-159 | Add Stock Import confirm integration tests | Missing | — | Add Stock Import confirm integration tests | — | Implement |
| PAC-TASK-160 | Add Stock Import smoke test checklist | Missing | — | Add Stock Import smoke test checklist | — | Implement |

### User Story Audit Conclusion

| Mục | Kết quả |
|---|---|
| Story status | Missing/Conflict |
| Reusable implementation | — |
| Missing implementation | — |
| Blocking conflict | — |
| Test gap | — |
| Recommended implementation order | — |

---

# 7. Cross-Cutting Database Audit

## 7.1. MedicineBatch

| Kiểm tra | Kết quả | Evidence | Risk / Action |
|---|---|---|---|
| MedicineBatch model tồn tại | Chưa audit | — | — |
| Quan hệ với Medicine đúng | Chưa audit | — | — |
| `batch_number` bắt buộc | Chưa audit | — | — |
| `expiry_date` bắt buộc | Chưa audit | — | — |
| Quantity constraint hợp lệ | Chưa audit | — | — |
| Batch identity uniqueness | Chưa audit | — | — |
| Index phục vụ lookup/FEFO | Chưa audit | — | — |
| Không có aggregate inventory source of truth | Chưa audit | — | — |
| Không có public direct quantity update | Chưa audit | — | — |

## 7.2. Stock Import

| Kiểm tra | Kết quả | Evidence | Risk / Action |
|---|---|---|---|
| `stock_imports` model | Chưa audit | — | — |
| `stock_import_lines` model | Chưa audit | — | — |
| Draft/Confirmed status | Chưa audit | — | — |
| Supplier relation | Chưa audit | — | — |
| Medicine relation | Chưa audit | — | — |
| Confirm transaction | Chưa audit | — | — |
| Rollback behavior | Chưa audit | — | — |
| Duplicate confirm protection | Chưa audit | — | — |
| Confirmed immutability | Chưa audit | — | — |
| Audit log relation | Chưa audit | — | — |

## 7.3. Migration Risk

| Migration / Risk | Severity | Evidence | Recommended Action |
|---|---|---|---|
| Chưa audit | — | — | — |

---

# 8. Backend Audit

| Khu vực | Kết quả | Evidence | Missing / Conflict |
|---|---|---|---|
| Inventory module | Chưa audit | — | — |
| MedicineBatch service | Chưa audit | — | — |
| Inventory Summary API | Chưa audit | — | — |
| Batch Detail API | Chưa audit | — | — |
| Sellable quantity logic | Chưa audit | — | — |
| Low-stock logic | Chưa audit | — | — |
| Near-expiry logic | Chưa audit | — | — |
| Stock Import module | Chưa audit | — | — |
| Draft create/update/delete | Chưa audit | — | — |
| Confirm transaction | Chưa audit | — | — |
| Batch merge | Chưa audit | — | — |
| Expiry mismatch rejection | Chưa audit | — | — |
| Audit logging | Chưa audit | — | — |
| DTO validation | Chưa audit | — | — |
| Error response consistency | Chưa audit | — | — |

---

# 9. Frontend Audit

| Khu vực | Kết quả | Evidence | Missing / Conflict |
|---|---|---|---|
| Inventory Summary screen | Chưa audit | — | — |
| Search/filter UI | Chưa audit | — | — |
| Batch Detail screen | Chưa audit | — | — |
| Expired/near-expiry states | Chưa audit | — | — |
| Low-stock dashboard | Chưa audit | — | — |
| POS sellable stock display | Chưa audit | — | — |
| Direct quantity edit removed | Chưa audit | — | — |
| Create Stock Import screen | Chưa audit | — | — |
| Stock Import line editor | Chưa audit | — | — |
| Draft update/delete | Chưa audit | — | — |
| Confirmed read-only UI | Chưa audit | — | — |
| Batch merge result | Chưa audit | — | — |
| Line-level validation errors | Chưa audit | — | — |
| Audit metadata display | Chưa audit | — | — |
| Loading/empty/error/success states | Chưa audit | — | — |

---

# 10. Permission and Security Audit

| Rule | Kết quả | Evidence | Missing / Conflict |
|---|---|---|---|
| Admin xem/quản lý inventory | Chưa audit | — | — |
| Warehouse xem/quản lý inventory | Chưa audit | — | — |
| Staff không truy cập dashboard kho tổng | Chưa audit | — | — |
| Admin/Warehouse tạo Stock Import | Chưa audit | — | — |
| Staff bị chặn khỏi Stock Import operation | Chưa audit | — | — |
| Backend dùng AuthGuard | Chưa audit | — | — |
| Backend dùng PermissionsGuard | Chưa audit | — | — |
| Frontend permission-aware actions | Chưa audit | — | — |
| Supplier inactive bị chặn | Chưa audit | — | — |
| Input validation tại API boundary | Chưa audit | — | — |
| Không có secret/.env trong Git | Chưa audit | — | — |

---

# 11. Testing Audit

| Test Area | Existing Tests | Status | Missing Tests | Recommended Action |
|---|---|---|---|---|
| Batch identity | — | Chưa audit | — | — |
| Sellable quantity | — | Chưa audit | — | — |
| Expired batch exclusion | — | Chưa audit | — | — |
| Low-stock | — | Chưa audit | — | — |
| Near-expiry | — | Chưa audit | — | — |
| Draft Stock Import | — | Chưa audit | — | — |
| Confirm transaction | — | Chưa audit | — | — |
| Rollback | — | Chưa audit | — | — |
| Batch merge | — | Chưa audit | — | — |
| Expiry mismatch | — | Chưa audit | — | — |
| Confirmed immutability | — | Chưa audit | — | — |
| Permission tests | — | Chưa audit | — | — |
| Integration tests | — | Chưa audit | — | — |
| E2E tests | — | Chưa audit | — | — |
| Smoke checklist | — | Chưa audit | — | — |

---

# 12. Existing Architecture Summary

## 12.1. Database

Chưa audit.

## 12.2. Backend

Chưa audit.

## 12.3. Frontend

Chưa audit.

## 12.4. Authorization

Chưa audit.

## 12.5. Testing

Chưa audit.

---

# 13. Reusable Code List

| Module / File | Nội dung có thể tái sử dụng | Task liên quan | Ghi chú |
|---|---|---|---|
| Chưa audit | — | — | — |

---

# 14. Conflict List

| ID | Conflict | Baseline bị vi phạm | Mức độ | Evidence | Recommended Resolution |
|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — |

Các conflict cần ưu tiên phát hiện:

- Aggregate inventory được dùng làm source of truth.
- Direct edit `MedicineBatch.quantity`.
- Batch identity không gồm expiry date.
- Stock Import confirm không dùng transaction.
- Confirmed import vẫn sửa hoặc confirm lặp được.
- Supplier inactive vẫn được dùng.
- Staff có quyền vận hành kho không phù hợp.
- Merge batch khi expiry khác nhau.
- Thay đổi quantity ngoài workflow chính thức.

---

# 15. Missing Modules and Work

| Module / Capability | Trạng thái | Task liên quan | Dependency | Recommended Action |
|---|---|---|---|---|
| Chưa audit | — | — | — | — |

---

# 16. Open Questions

| ID | Câu hỏi | Tài liệu/code liên quan | Ảnh hưởng | Đề xuất |
|---|---|---|---|---|
| OQ-01 | Near-expiry threshold đã có System Setting chính thức chưa? | Chưa audit | Near-expiry calculation | Dùng baseline/default nếu chưa có |
| OQ-02 | Ngày hết hạn được coi là hết hạn từ đầu ngày hay cuối ngày? | Chưa audit | Sellable quantity | Chốt timezone và boundary |
| OQ-03 | Stock Import có `CONFIRMED` hay tên enum khác? | Chưa audit | Schema/API/UI | Đồng bộ theo baseline hiện có |
| OQ-04 | Audit log chung đã đủ trường cho Stock Import chưa? | Chưa audit | Traceability | Tái sử dụng nếu phù hợp |
| OQ-05 | POS sellable stock integration point đã có module đích chưa? | Chưa audit | PAC-TASK-128 | Chỉ làm contract nếu POS chưa có |

---

# 17. Recommended Implementation Order

Chưa audit.

Thứ tự dự kiến cần xác nhận sau audit:

1. US-27 → US-29: MedicineBatch schema, constraint và batch identity.
2. US-32 → US-35: sellable quantity, expiry, low-stock và near-expiry.
3. US-30 → US-31, US-36 → US-38: Inventory API/UI và access restrictions.
4. US-39 → US-43: Stock Import Draft, lines và validation.
5. US-44 → US-47: confirm transaction, merge, mismatch và immutability.
6. US-48: audit, traceability, integration test và smoke checklist.

---

# 18. Skill Recommendation After Audit

| Nhóm công việc | Skill đề xuất |
|---|---|
| Repository/architecture audit | `ecc-code-quality`, `agent-skills-lifecycle` |
| Prisma/schema/migration | `ecc-database`, `ecc-backend`, `tdd`, `ecc-testing` |
| Backend API/service | `ecc-backend`, `ecc-security`, `tdd`, `ecc-testing` |
| Frontend | `modern-web-guidance`, `ecc-frontend`, `design-system-guide`, `ecc-testing` |
| Transaction/business rules | `ecc-database`, `ecc-backend`, `mattpocock-engineering`, `tdd` |
| Git/PR | `git-github`, `ecc-devops` |
| Documentation/progress | `mattpocock-productivity`, `ecc-business-ops` |

---

# 19. Audit Conclusion

| Mục | Kết quả |
|---|---|
| Audit completed | No |
| Total tasks audited | 0/59 |
| Blocking conflicts | Chưa xác định |
| Recommended first task | Chưa xác định |
| Recommended first User Story | US-27 (MedicineBatch source of truth) và PAC-TASK-102. |
| Database migration safe to start | Chưa xác định |
| Ready to create implementation branches | No |
| Ready to implement Sprint 3 | No |

## Final Auditor Notes

Chưa audit.

## Next Action

```text
Hoàn thành audit toàn bộ PAC-TASK-102 → PAC-TASK-160, cập nhật sprint-3-progress.md và chỉ sau đó mới tạo branch implementation.
```
