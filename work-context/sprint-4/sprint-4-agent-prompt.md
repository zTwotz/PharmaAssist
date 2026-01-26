# Sprint 4 AI Agent Prompt — PharmaAssist AI Intelligence

> **Mục đích:** Điều phối AI Coding Agent kiểm tra dependency, audit repository, lập kế hoạch, triển khai, kiểm thử và tích hợp toàn bộ Sprint 4.
>
> **Đường dẫn đề xuất:** `work-context/sprint-4/sprint-4-agent-prompt.md`
>
> Đây là prompt thực thi. Không dùng file này thay cho `sprint-4.md`, `sprint-4-audit.md` hoặc `sprint-4-progress.md`.

---

# I. Vai trò và nhiệm vụ

Bạn là AI Coding Agent chính của dự án **PharmaAssist AI Intelligence**.

Nhiệm vụ của bạn là thực hiện toàn bộ:

```text
Kiểm tra Sprint 3 Gate
→ đọc rules và tài liệu
→ audit 66 Task
→ cập nhật sprint-4-audit.md
→ cập nhật sprint-4-progress.md
→ lập implementation plan
→ Task branch
→ Story branch
→ Epic branch
→ develop
→ tạo PR develop → main
```

Bạn phải làm việc dựa trên bằng chứng thực tế trong repository, Jira mapping, Git history, Pull Request và kết quả test.

Không được:

- Đánh dấu Task hoàn thành chỉ vì file hoặc code cùng tên đã tồn tại.
- Bịa kết quả test.
- Tự thay đổi Jira parent.
- Tự merge `develop → main`.
- Sửa business code trước khi hoàn tất audit.
- Triển khai lấn Sprint 5 hoặc Sprint 6.

---

# II. Phạm vi chính thức

| Mục | Giá trị |
|---|---|
| Sprint | Sprint 4 |
| Tên | Inventory Adjustment & POS Draft Order |
| Scope | MVP / Core |
| Primary User Stories | US-49 → US-68 |
| Số Primary User Story | 20 |
| Task range | PAC-TASK-161 → PAC-TASK-226 |
| Tổng Task | 66 |
| Epic chính | PAC-EPIC-07, PAC-EPIC-08 |
| Epic hỗ trợ | PAC-EPIC-19, PAC-EPIC-21 |
| Cross-sprint task | PAC-TASK-185 thuộc US-38 / PAC-EPIC-05 |
| Sprint tiếp theo | Sprint 5 |

## Epic chính

- `PAC-EPIC-07 / PAC-7 — Inventory Adjustment`
- `PAC-EPIC-08 / PAC-8 — POS Draft Order`

## Task phân bổ

- Inventory Adjustment: `PAC-TASK-161 → PAC-TASK-190`
- POS Draft Order: `PAC-TASK-191 → PAC-TASK-226`
- Trong đó `PAC-TASK-185` là cross-sprint hardening, parent vẫn là `US-38 / PAC-EPIC-05`.

---

# III. Điều kiện bắt buộc trước khi bắt đầu

Trước khi audit hoặc code Sprint 4, xác minh:

```text
Sprint 3 = Completed
PAC-EPIC-05 = Done
PAC-EPIC-06 = Done
US-27 → US-48 = Done
PAC-TASK-102 → PAC-TASK-160 = Done
Ready for Sprint 4 = Yes
Sprint 3 đã merge vào develop
Workspace sạch
```

Dependency kỹ thuật phải tồn tại và hoạt động:

- Medicine
- MedicineBatch
- MedicineBatch là inventory source of truth
- Sellable quantity
- Expired batch exclusion
- Inventory Summary
- Stock Import transaction
- AuthGuard
- PermissionsGuard
- Admin/Staff/Warehouse role mappings
- Staff ownership foundation
- Frontend permission helper

Nếu một điều kiện không đạt:

1. Không tạo implementation branch Sprint 4.
2. Không sửa business code Sprint 4.
3. Ghi dependency còn thiếu vào `sprint-4-audit.md`.
4. Đặt `Ready to implement Sprint 4 = No`.
5. Dừng sau báo cáo dependency gate.

---

# IV. Tài liệu bắt buộc phải đọc

Đọc theo thứ tự:

1. `AGENTS.md`
2. `.agents/rules/rules-w-pharmaassist.md`
3. `WORKING-CONTEXT.md`
4. `DESIGN.md`
5. `work-context/sprint-3/sprint-3.md`
6. `work-context/sprint-3/sprint-3-audit.md`
7. `work-context/sprint-3/sprint-3-progress.md`
8. `work-context/sprint-4/sprint-4.md`
9. `work-context/sprint-4/sprint-4-audit.md`
10. `work-context/sprint-4/sprint-4-progress.md`
11. `Jira/1_Components.md`
12. `Jira/2_Epic.md`
13. `Jira/3_Stories.md`
14. `Jira/4B_Task_List_MVP_POS_Interaction_Checkout_146_290.md`
15. `Jira/4B_Task_Description_MVP_POS_Interaction_Checkout_146_290.md`
16. `Jira/5_Sprint.md`
17. `Jira/branch-on-jira.md`
18. `Jira/jira-mapping.md`
19. Tài liệu SRS, Role & Permission, Module Design, API, Database, Prisma, UI/UX và Testing liên quan.

Thứ tự ưu tiên khi tài liệu khác nhau:

1. `jira-mapping.md` quyết định Jira Key thật.
2. Task List 4B quyết định Task → Story → Epic → Component.
3. Task Description 4B quyết định nội dung Task.
4. `3_Stories.md` quyết định User Story và Acceptance Criteria.
5. `2_Epic.md` quyết định Epic.
6. `5_Sprint.md` quyết định scope Sprint.
7. `branch-on-jira.md` quyết định format branch/commit/PR.

---

# V. Skills

Không gọi tất cả skill cho mọi Task.

Mỗi Task phải ghi:

```text
Selected Skills:
- <skill>: <lý do>
```

## Skills nền

- `agent-skills-lifecycle`
- `karpathy-principles`
- `writing-plans`
- `ecc-code-quality`

## Database, Prisma và migration

- `ecc-database`
- `ecc-backend`
- `tdd`
- `ecc-testing`

## Backend/API, authorization và ownership

- `ecc-backend`
- `ecc-security`
- `tdd`
- `ecc-testing`

## Transaction, rollback và business rule phức tạp

- `ecc-database`
- `ecc-backend`
- `mattpocock-engineering`
- `tdd`
- `ecc-testing`

## Frontend

- `modern-web-guidance`
- `ecc-frontend`
- `design-system-guide`
- `ecc-testing`

## Inventory safety

- `ecc-healthcare`
- `ecc-database`
- `ecc-backend`

## GitHub, CI và evidence

- `git-github`
- `ecc-devops`
- `ecc-business-ops`

## Documentation

- `mattpocock-productivity`
- `ecc-business-ops`

Skill không cần dùng trong Sprint 4 nếu không có yêu cầu trực tiếp:

- `ecc-ai-ml`
- `ecc-agents`
- `ecc-mobile`
- Graph-RAG/Neo4j-specific skills
- AI provider skills

---

# VI. Bắt đầu phiên làm việc

Chạy:

```bash
git status

git checkout main
git pull origin main

git checkout develop
git pull origin develop

git status
git branch --show-current
git log --oneline --decorate -30
```

Kiểm tra:

- Workspace sạch.
- `main` và `develop` mới nhất.
- Sprint 3 đã merge vào `develop`.
- Không có branch/PR Sprint 3 bị bỏ lại.
- Không có secret hoặc `.env`.
- Không có thay đổi chưa commit không rõ nguồn gốc.

Nếu workspace không sạch, không tự xóa hoặc ghi đè thay đổi.

---

# VII. Audit bắt buộc trước khi code

Audit toàn bộ `PAC-TASK-161 → PAC-TASK-226`.

Trạng thái hợp lệ:

- `Done`
- `Partial`
- `Missing`
- `Conflict`
- `Failed Verification`
- `N/A`

Không sửa business code trong audit.

## Audit phải bao gồm

### Database

- InventoryAdjustment
- InventoryAdjustmentLine
- Order
- OrderItem
- Status enums
- Relations
- Constraints
- Indexes
- Anonymous customer support
- Ownership fields
- Money/decimal precision
- Migration risk

### Backend

- Adjustment Draft
- Required reason
- Batch selector
- Confirm transaction
- Rollback
- Negative quantity rejection
- Confirmed immutability
- Cancel Draft
- History/detail
- Audit log
- Inventory refresh
- POS Draft Order
- Search medicine
- Sellable stock
- Add/update/remove item
- Total calculation
- Walk-in support
- Ownership
- Admin all-orders
- Cancel Draft
- Checkout failure recovery

### Frontend

- Adjustment create/list/detail
- Reason validation
- Batch selector
- Before/after preview
- Confirm/read-only/cancel
- POS screen
- Search
- Sellable stock
- Add/update/remove
- Totals
- Walk-in
- Ownership-aware lists
- Order Detail
- Cancel
- Failure recovery
- Loading/empty/error/success states

### Security

- AuthGuard
- PermissionsGuard
- Warehouse adjustment permission
- Staff POS permission
- Staff ownership
- Admin all-orders
- Warehouse POS denial
- DTO whitelist
- No mass assignment

### Testing

- Unit tests
- Transaction tests
- Integration tests
- Permission tests
- Ownership tests
- Frontend smoke checklist
- Build/lint/Prisma validation

### Git/GitHub

- Branches
- Commits
- PRs
- Merge flow
- Jira Key mapping
- PAC-TASK-185 parent

Cập nhật đầy đủ:

```text
work-context/sprint-4/sprint-4-audit.md
work-context/sprint-4/sprint-4-progress.md
```

Chỉ sau khi audit hoàn tất mới lập implementation plan.

---

# VIII. Baseline Inventory Adjustment

1. MedicineBatch là inventory source of truth.
2. Không dùng aggregate inventory làm nguồn chính.
3. Không có public API sửa trực tiếp MedicineBatch.quantity.
4. Adjustment tác động MedicineBatch cụ thể.
5. Adjustment bắt đầu ở Draft.
6. Draft chưa làm thay đổi stock.
7. Reason bắt buộc, trim và reject whitespace-only.
8. Quantity adjustment phải lớn hơn 0.
9. Phải có loại tăng/giảm hoặc delta contract rõ ràng.
10. Quantity sau adjustment không được âm.
11. Confirm chạy trong database transaction.
12. Một line lỗi rollback toàn bộ.
13. Confirmed adjustment immutable.
14. Draft adjustment có thể cancel.
15. Cancel Draft không thay đổi MedicineBatch.
16. Audit phải có actor, reason, batch, before/after và timestamp.
17. Warehouse create/confirm theo permission.
18. Admin xem history/review.
19. Staff bị chặn nếu không có permission.
20. Inventory Summary refresh sau confirm.

---

# IX. Baseline POS Draft Order

1. POS dùng Draft Order trước checkout.
2. Order status chỉ gồm DRAFT, PAID, CANCELLED.
3. Draft Order chưa trừ MedicineBatch quantity.
4. Sales key là medicine_id.
5. Không dùng product_variant_id trong MVP POS.
6. Chỉ medicine active được thêm.
7. POS chỉ hiển thị sellable stock cần thiết.
8. Item quantity > 0.
9. Quantity không vượt sellable stock.
10. Một medicine chỉ có một item trong cùng order.
11. Total deterministic từ quantity × selling price.
12. Không coupon, discount hoặc promotion.
13. Hỗ trợ walk-in/anonymous customer.
14. Không triển khai Full Customer Management.
15. Staff chỉ thao tác order trong ownership scope.
16. Admin xem tất cả orders.
17. Warehouse không truy cập POS.
18. Chỉ DRAFT được cancel.
19. PAID/CANCELLED không cancel lại.
20. Checkout fail giữ Draft Order và items.
21. Sprint 4 không FEFO, Payment hoặc Invoice.
22. Sprint 4 không InteractionAlert hoặc HIGH handling.

---

# X. Phân rã 20 User Story và 66 Task

## US-49 — Tạo Inventory Adjustment

**Jira Key thật:** `PAC-88`

**Mục tiêu:** Tạo Inventory Adjustment Draft với schema, lines, API và UI mà chưa làm thay đổi MedicineBatch.

### Tasks

- `PAC-TASK-161` / `PAC-371` — Create inventory_adjustments Prisma model
  - Branch đề xuất: `feature/PAC-371-T-161-create-inventory-adjustments-prisma-model`
- `PAC-TASK-162` / `PAC-372` — Create inventory_adjustment_lines Prisma model
  - Branch đề xuất: `feature/PAC-372-T-162-create-inventory-adjustment-lines-prisma-model`
- `PAC-TASK-163` / `PAC-373` — Implement create Inventory Adjustment API
  - Branch đề xuất: `feature/PAC-373-T-163-implement-create-inventory-adjustment-api`
- `PAC-TASK-164` / `PAC-374` — Build create Inventory Adjustment screen
  - Branch đề xuất: `feature/PAC-374-T-164-build-create-inventory-adjustment-screen`
- `PAC-TASK-166` / `PAC-376` — Validate adjustment type and quantity
  - Branch đề xuất: `feature/PAC-376-T-166-validate-adjustment-type-and-quantity`

### Story completion gate

- Tất cả Task của Story đạt Definition of Done.
- Acceptance Criteria trong `sprint-4.md` đạt.
- Automated tests phù hợp pass.
- Manual UI verification phù hợp pass.
- Story PR đã merge vào Epic branch với checks pass.
- `sprint-4-progress.md` đã cập nhật branch, commit, PR và test evidence.

## US-50 — Adjustment bắt buộc reason

**Jira Key thật:** `PAC-89`

**Mục tiêu:** Bắt buộc reason ở backend và frontend; reject giá trị rỗng hoặc chỉ khoảng trắng.

### Tasks

- `PAC-TASK-167` / `PAC-377` — Enforce required adjustment reason in backend
  - Branch đề xuất: `feature/PAC-377-T-167-enforce-required-adjustment-reason-in-backend`
- `PAC-TASK-168` / `PAC-378` — Add required reason validation in UI
  - Branch đề xuất: `feature/PAC-378-T-168-add-required-reason-validation-in-ui`
- `PAC-TASK-183` / `PAC-393` — Add tests for required adjustment reason
  - Branch đề xuất: `test/PAC-393-T-183-add-tests-for-required-adjustment-reason`

### Story completion gate

- Tất cả Task của Story đạt Definition of Done.
- Acceptance Criteria trong `sprint-4.md` đạt.
- Automated tests phù hợp pass.
- Manual UI verification phù hợp pass.
- Story PR đã merge vào Epic branch với checks pass.
- `sprint-4-progress.md` đã cập nhật branch, commit, PR và test evidence.

## US-51 — Chọn MedicineBatch cần điều chỉnh

**Jira Key thật:** `PAC-90`

**Mục tiêu:** Chọn MedicineBatch cụ thể và hiển thị preview quantity trước/sau.

### Tasks

- `PAC-TASK-165` / `PAC-375` — Build MedicineBatch selector for adjustment
  - Branch đề xuất: `feature/PAC-375-T-165-build-medicinebatch-selector-for-adjustment`
- `PAC-TASK-169` / `PAC-379` — Show batch before/after quantity preview
  - Branch đề xuất: `feature/PAC-379-T-169-show-batch-before-after-quantity-preview`

### Story completion gate

- Tất cả Task của Story đạt Definition of Done.
- Acceptance Criteria trong `sprint-4.md` đạt.
- Automated tests phù hợp pass.
- Manual UI verification phù hợp pass.
- Story PR đã merge vào Epic branch với checks pass.
- `sprint-4-progress.md` đã cập nhật branch, commit, PR và test evidence.

## US-52 — Confirm Inventory Adjustment transaction

**Jira Key thật:** `PAC-91`

**Mục tiêu:** Confirm Inventory Adjustment trong transaction, cập nhật MedicineBatch đúng và khóa adjustment đã confirmed.

### Tasks

- `PAC-TASK-170` / `PAC-380` — Implement confirm Inventory Adjustment transaction
  - Branch đề xuất: `feature/PAC-380-T-170-implement-confirm-inventory-adjustment-transaction`
- `PAC-TASK-171` / `PAC-381` — Update MedicineBatch through adjustment transaction only
  - Branch đề xuất: `feature/PAC-381-T-171-update-medicinebatch-through-adjustment-transaction-only`
- `PAC-TASK-173` / `PAC-383` — Lock confirmed Inventory Adjustment
  - Branch đề xuất: `feature/PAC-383-T-173-lock-confirmed-inventory-adjustment`
- `PAC-TASK-188` / `PAC-398` — Refresh Inventory Summary after adjustment confirm
  - Branch đề xuất: `feature/PAC-398-T-188-refresh-inventory-summary-after-adjustment-confirm`

### Story completion gate

- Tất cả Task của Story đạt Definition of Done.
- Acceptance Criteria trong `sprint-4.md` đạt.
- Automated tests phù hợp pass.
- Manual UI verification phù hợp pass.
- Story PR đã merge vào Epic branch với checks pass.
- `sprint-4-progress.md` đã cập nhật branch, commit, PR và test evidence.

## US-53 — Chặn adjustment làm quantity âm

**Jira Key thật:** `PAC-92`

**Mục tiêu:** Ngăn mọi adjustment làm quantity âm và bảo vệ bằng test.

### Tasks

- `PAC-TASK-172` / `PAC-382` — Prevent adjustment from making quantity negative
  - Branch đề xuất: `feature/PAC-382-T-172-prevent-adjustment-from-making-quantity-negative`
- `PAC-TASK-182` / `PAC-392` — Add tests for negative quantity adjustment
  - Branch đề xuất: `test/PAC-392-T-182-add-tests-for-negative-quantity-adjustment`

### Story completion gate

- Tất cả Task của Story đạt Definition of Done.
- Acceptance Criteria trong `sprint-4.md` đạt.
- Automated tests phù hợp pass.
- Manual UI verification phù hợp pass.
- Story PR đã merge vào Epic branch với checks pass.
- `sprint-4-progress.md` đã cập nhật branch, commit, PR và test evidence.

## US-54 — Warehouse tạo và confirm adjustment

**Jira Key thật:** `PAC-93`

**Mục tiêu:** Cho Warehouse tạo/confirm adjustment theo permission, đồng thời chặn role không phù hợp.

### Tasks

- `PAC-TASK-178` / `PAC-388` — Add Warehouse permission for create/confirm adjustment
  - Branch đề xuất: `feature/PAC-388-T-178-add-warehouse-permission-for-create-confirm-adjustment`
- `PAC-TASK-184` / `PAC-394` — Add tests for Warehouse adjustment permission
  - Branch đề xuất: `test/PAC-394-T-184-add-tests-for-warehouse-adjustment-permission`

### Story completion gate

- Tất cả Task của Story đạt Definition of Done.
- Acceptance Criteria trong `sprint-4.md` đạt.
- Automated tests phù hợp pass.
- Manual UI verification phù hợp pass.
- Story PR đã merge vào Epic branch với checks pass.
- `sprint-4-progress.md` đã cập nhật branch, commit, PR và test evidence.

## US-55 — Audit Inventory Adjustment

**Jira Key thật:** `PAC-94`

**Mục tiêu:** Ghi audit đầy đủ cho adjustment và hiển thị metadata truy vết.

### Tasks

- `PAC-TASK-180` / `PAC-390` — Write audit log for Inventory Adjustment
  - Branch đề xuất: `feature/PAC-390-T-180-write-audit-log-for-inventory-adjustment`
- `PAC-TASK-181` / `PAC-391` — Display adjustment audit information in UI
  - Branch đề xuất: `feature/PAC-391-T-181-display-adjustment-audit-information-in-ui`

### Story completion gate

- Tất cả Task của Story đạt Definition of Done.
- Acceptance Criteria trong `sprint-4.md` đạt.
- Automated tests phù hợp pass.
- Manual UI verification phù hợp pass.
- Story PR đã merge vào Epic branch với checks pass.
- `sprint-4-progress.md` đã cập nhật branch, commit, PR và test evidence.

## US-56 — Admin xem lịch sử adjustment

**Jira Key thật:** `PAC-95`

**Mục tiêu:** Cho Admin xem lịch sử/detail, cancel Draft, refresh inventory và hoàn thiện smoke/traceability.

### Tasks

- `PAC-TASK-174` / `PAC-384` — Create Inventory Adjustment list API
  - Branch đề xuất: `feature/PAC-384-T-174-create-inventory-adjustment-list-api`
- `PAC-TASK-175` / `PAC-385` — Build Inventory Adjustment history list UI
  - Branch đề xuất: `feature/PAC-385-T-175-build-inventory-adjustment-history-list-ui`
- `PAC-TASK-176` / `PAC-386` — Implement Inventory Adjustment detail API
  - Branch đề xuất: `feature/PAC-386-T-176-implement-inventory-adjustment-detail-api`
- `PAC-TASK-177` / `PAC-387` — Build Inventory Adjustment detail screen
  - Branch đề xuất: `feature/PAC-387-T-177-build-inventory-adjustment-detail-screen`
- `PAC-TASK-179` / `PAC-389` — Add Admin permission for adjustment history and review
  - Branch đề xuất: `feature/PAC-389-T-179-add-admin-permission-for-adjustment-history-and-review`
- `PAC-TASK-186` / `PAC-396` — Implement cancel Draft Inventory Adjustment API
  - Branch đề xuất: `feature/PAC-396-T-186-implement-cancel-draft-inventory-adjustment-api`
- `PAC-TASK-187` / `PAC-397` — Build cancel Draft Inventory Adjustment UI
  - Branch đề xuất: `feature/PAC-397-T-187-build-cancel-draft-inventory-adjustment-ui`
- `PAC-TASK-189` / `PAC-399` — Add Inventory Adjustment smoke test checklist
  - Branch đề xuất: `test/PAC-399-T-189-add-inventory-adjustment-smoke-test-checklist`
- `PAC-TASK-190` / `PAC-400` — Add Inventory Adjustment traceability notes
  - Branch đề xuất: `docs/PAC-400-T-190-add-inventory-adjustment-traceability-notes`

### Story completion gate

- Tất cả Task của Story đạt Definition of Done.
- Acceptance Criteria trong `sprint-4.md` đạt.
- Automated tests phù hợp pass.
- Manual UI verification phù hợp pass.
- Story PR đã merge vào Epic branch với checks pass.
- `sprint-4-progress.md` đã cập nhật branch, commit, PR và test evidence.

## Cross-sprint Task — PAC-TASK-185 / PAC-395

**Title:** Block direct MedicineBatch quantity update service path

**Parent bắt buộc:**

- Story: `US-38 / PAC-77`
- Epic: `PAC-EPIC-05 / PAC-5`

Quy tắc:

- Không chuyển Task này sang PAC-EPIC-07.
- Audit branch và PR cũ trước khi tạo branch mới.
- Không duplicate implementation.
- Merge theo parent branch đã được audit.
- Task chỉ Done khi direct MedicineBatch quantity update path bị chặn và có test/evidence.

## US-57 — Tạo Draft Order tại POS

**Jira Key thật:** `PAC-96`

**Mục tiêu:** Tạo Order/OrderItem và Draft Order tại POS với status DRAFT/PAID/CANCELLED.

### Tasks

- `PAC-TASK-191` / `PAC-401` — Create orders Prisma model
  - Branch đề xuất: `feature/PAC-401-T-191-create-orders-prisma-model`
- `PAC-TASK-192` / `PAC-402` — Create order_items Prisma model
  - Branch đề xuất: `feature/PAC-402-T-192-create-order-items-prisma-model`
- `PAC-TASK-193` / `PAC-403` — Add order status enum DRAFT/PAID/CANCELLED
  - Branch đề xuất: `feature/PAC-403-T-193-add-order-status-enum-draft-paid-cancelled`
- `PAC-TASK-194` / `PAC-404` — Implement create Draft Order API
  - Branch đề xuất: `feature/PAC-404-T-194-implement-create-draft-order-api`
- `PAC-TASK-195` / `PAC-405` — Build POS Draft Order screen
  - Branch đề xuất: `feature/PAC-405-T-195-build-pos-draft-order-screen`
- `PAC-TASK-225` / `PAC-435` — Add POS API integration tests
  - Branch đề xuất: `test/PAC-435-T-225-add-pos-api-integration-tests`

### Story completion gate

- Tất cả Task của Story đạt Definition of Done.
- Acceptance Criteria trong `sprint-4.md` đạt.
- Automated tests phù hợp pass.
- Manual UI verification phù hợp pass.
- Story PR đã merge vào Epic branch với checks pass.
- `sprint-4-progress.md` đã cập nhật branch, commit, PR và test evidence.

## US-58 — Tìm thuốc trong POS

**Jira Key thật:** `PAC-97`

**Mục tiêu:** Tìm medicine active trong POS và hiển thị sellable stock.

### Tasks

- `PAC-TASK-196` / `PAC-406` — Implement POS medicine search API
  - Branch đề xuất: `feature/PAC-406-T-196-implement-pos-medicine-search-api`
- `PAC-TASK-197` / `PAC-407` — Build POS medicine search component
  - Branch đề xuất: `feature/PAC-407-T-197-build-pos-medicine-search-component`
- `PAC-TASK-198` / `PAC-408` — Display sellable stock in POS search results
  - Branch đề xuất: `feature/PAC-408-T-198-display-sellable-stock-in-pos-search-results`

### Story completion gate

- Tất cả Task của Story đạt Definition of Done.
- Acceptance Criteria trong `sprint-4.md` đạt.
- Automated tests phù hợp pass.
- Manual UI verification phù hợp pass.
- Story PR đã merge vào Epic branch với checks pass.
- `sprint-4-progress.md` đã cập nhật branch, commit, PR và test evidence.

## US-59 — Thêm thuốc vào Draft Order

**Jira Key thật:** `PAC-98`

**Mục tiêu:** Thêm medicine vào Draft Order, không tạo duplicate item sai và validate dữ liệu.

### Tasks

- `PAC-TASK-199` / `PAC-409` — Implement add item to Draft Order API
  - Branch đề xuất: `feature/PAC-409-T-199-implement-add-item-to-draft-order-api`
- `PAC-TASK-200` / `PAC-410` — Build add-to-order action in POS
  - Branch đề xuất: `feature/PAC-410-T-200-build-add-to-order-action-in-pos`
- `PAC-TASK-201` / `PAC-411` — Validate active medicine when adding POS item
  - Branch đề xuất: `feature/PAC-411-T-201-validate-active-medicine-when-adding-pos-item`

### Story completion gate

- Tất cả Task của Story đạt Definition of Done.
- Acceptance Criteria trong `sprint-4.md` đạt.
- Automated tests phù hợp pass.
- Manual UI verification phù hợp pass.
- Story PR đã merge vào Epic branch với checks pass.
- `sprint-4-progress.md` đã cập nhật branch, commit, PR và test evidence.

## US-60 — Cập nhật số lượng thuốc trong Draft Order

**Jira Key thật:** `PAC-99`

**Mục tiêu:** Cập nhật quantity item với quantity > 0 và không vượt sellable stock.

### Tasks

- `PAC-TASK-202` / `PAC-412` — Implement update Draft Order item quantity API
  - Branch đề xuất: `feature/PAC-412-T-202-implement-update-draft-order-item-quantity-api`
- `PAC-TASK-203` / `PAC-413` — Build quantity controls in Draft Order UI
  - Branch đề xuất: `feature/PAC-413-T-203-build-quantity-controls-in-draft-order-ui`
- `PAC-TASK-204` / `PAC-414` — Validate Draft Order quantity greater than zero
  - Branch đề xuất: `feature/PAC-414-T-204-validate-draft-order-quantity-greater-than-zero`

### Story completion gate

- Tất cả Task của Story đạt Definition of Done.
- Acceptance Criteria trong `sprint-4.md` đạt.
- Automated tests phù hợp pass.
- Manual UI verification phù hợp pass.
- Story PR đã merge vào Epic branch với checks pass.
- `sprint-4-progress.md` đã cập nhật branch, commit, PR và test evidence.

## US-61 — Xóa thuốc khỏi Draft Order

**Jira Key thật:** `PAC-100`

**Mục tiêu:** Xóa item khỏi Draft Order và cập nhật total mà không đụng tồn kho.

### Tasks

- `PAC-TASK-206` / `PAC-416` — Implement remove item from Draft Order API
  - Branch đề xuất: `feature/PAC-416-T-206-implement-remove-item-from-draft-order-api`
- `PAC-TASK-207` / `PAC-417` — Build remove item action in POS
  - Branch đề xuất: `feature/PAC-417-T-207-build-remove-item-action-in-pos`

### Story completion gate

- Tất cả Task của Story đạt Definition of Done.
- Acceptance Criteria trong `sprint-4.md` đạt.
- Automated tests phù hợp pass.
- Manual UI verification phù hợp pass.
- Story PR đã merge vào Epic branch với checks pass.
- `sprint-4-progress.md` đã cập nhật branch, commit, PR và test evidence.

## US-62 — Tính tổng tiền Draft Order

**Jira Key thật:** `PAC-101`

**Mục tiêu:** Tính total deterministic, không coupon/discount.

### Tasks

- `PAC-TASK-208` / `PAC-418` — Implement Draft Order total calculation service
  - Branch đề xuất: `feature/PAC-418-T-208-implement-draft-order-total-calculation-service`
- `PAC-TASK-209` / `PAC-419` — Display Draft Order totals in POS UI
  - Branch đề xuất: `feature/PAC-419-T-209-display-draft-order-totals-in-pos-ui`
- `PAC-TASK-210` / `PAC-420` — Ensure no coupon or discount logic in MVP Draft Order total
  - Branch đề xuất: `feature/PAC-420-T-210-ensure-no-coupon-or-discount-logic-in-mvp-draft-order-total`

### Story completion gate

- Tất cả Task của Story đạt Definition of Done.
- Acceptance Criteria trong `sprint-4.md` đạt.
- Automated tests phù hợp pass.
- Manual UI verification phù hợp pass.
- Story PR đã merge vào Epic branch với checks pass.
- `sprint-4-progress.md` đã cập nhật branch, commit, PR và test evidence.

## US-63 — Validate sellable stock khi lập đơn

**Jira Key thật:** `PAC-102`

**Mục tiêu:** Validate sellable stock khi lập đơn nhưng chưa FEFO/trừ batch.

### Tasks

- `PAC-TASK-205` / `PAC-415` — Validate sellable stock when updating Draft Order quantity
  - Branch đề xuất: `feature/PAC-415-T-205-validate-sellable-stock-when-updating-draft-order-quantity`
- `PAC-TASK-211` / `PAC-421` — Show POS stock validation errors
  - Branch đề xuất: `feature/PAC-421-T-211-show-pos-stock-validation-errors`

### Story completion gate

- Tất cả Task của Story đạt Definition of Done.
- Acceptance Criteria trong `sprint-4.md` đạt.
- Automated tests phù hợp pass.
- Manual UI verification phù hợp pass.
- Story PR đã merge vào Epic branch với checks pass.
- `sprint-4-progress.md` đã cập nhật branch, commit, PR và test evidence.

## US-64 — Hỗ trợ walk-in/anonymous customer

**Jira Key thật:** `PAC-103`

**Mục tiêu:** Hỗ trợ walk-in/anonymous customer mà không triển khai Full Customer Management.

### Tasks

- `PAC-TASK-212` / `PAC-422` — Implement walk-in customer support in order model
  - Branch đề xuất: `feature/PAC-422-T-212-implement-walk-in-customer-support-in-order-model`
- `PAC-TASK-213` / `PAC-423` — Display walk-in customer option in POS
  - Branch đề xuất: `feature/PAC-423-T-213-display-walk-in-customer-option-in-pos`
- `PAC-TASK-214` / `PAC-424` — Keep full Customer Management out of MVP POS flow
  - Branch đề xuất: `feature/PAC-424-T-214-keep-full-customer-management-out-of-mvp-pos-flow`

### Story completion gate

- Tất cả Task của Story đạt Definition of Done.
- Acceptance Criteria trong `sprint-4.md` đạt.
- Automated tests phù hợp pass.
- Manual UI verification phù hợp pass.
- Story PR đã merge vào Epic branch với checks pass.
- `sprint-4-progress.md` đã cập nhật branch, commit, PR và test evidence.

## US-65 — Staff chỉ xem đơn trong ownership scope

**Jira Key thật:** `PAC-104`

**Mục tiêu:** Enforce Staff ownership cho list/detail/order actions.

### Tasks

- `PAC-TASK-215` / `PAC-425` — Apply Staff ownership scope to order list API
  - Branch đề xuất: `feature/PAC-425-T-215-apply-staff-ownership-scope-to-order-list-api`
- `PAC-TASK-216` / `PAC-426` — Build Staff scoped order list UI
  - Branch đề xuất: `feature/PAC-426-T-216-build-staff-scoped-order-list-ui`
- `PAC-TASK-224` / `PAC-434` — Build Order Detail screen for DRAFT/PAID/CANCELLED
  - Branch đề xuất: `feature/PAC-434-T-224-build-order-detail-screen-for-draft-paid-cancelled`

### Story completion gate

- Tất cả Task của Story đạt Definition of Done.
- Acceptance Criteria trong `sprint-4.md` đạt.
- Automated tests phù hợp pass.
- Manual UI verification phù hợp pass.
- Story PR đã merge vào Epic branch với checks pass.
- `sprint-4-progress.md` đã cập nhật branch, commit, PR và test evidence.

## US-66 — Admin xem tất cả đơn hàng

**Jira Key thật:** `PAC-105`

**Mục tiêu:** Cho Admin xem toàn bộ orders theo permission.

### Tasks

- `PAC-TASK-217` / `PAC-427` — Implement Admin all-orders list API
  - Branch đề xuất: `feature/PAC-427-T-217-implement-admin-all-orders-list-api`
- `PAC-TASK-218` / `PAC-428` — Build Admin all-orders UI
  - Branch đề xuất: `feature/PAC-428-T-218-build-admin-all-orders-ui`

### Story completion gate

- Tất cả Task của Story đạt Definition of Done.
- Acceptance Criteria trong `sprint-4.md` đạt.
- Automated tests phù hợp pass.
- Manual UI verification phù hợp pass.
- Story PR đã merge vào Epic branch với checks pass.
- `sprint-4-progress.md` đã cập nhật branch, commit, PR và test evidence.

## US-67 — Hủy Draft Order

**Jira Key thật:** `PAC-106`

**Mục tiêu:** Chỉ cho cancel Draft Order đúng scope; reject PAID/CANCELLED.

### Tasks

- `PAC-TASK-219` / `PAC-429` — Implement cancel Draft Order API
  - Branch đề xuất: `feature/PAC-429-T-219-implement-cancel-draft-order-api`
- `PAC-TASK-220` / `PAC-430` — Build cancel Draft Order UI
  - Branch đề xuất: `feature/PAC-430-T-220-build-cancel-draft-order-ui`
- `PAC-TASK-221` / `PAC-431` — Prevent cancel PAID or already CANCELLED order
  - Branch đề xuất: `feature/PAC-431-T-221-prevent-cancel-paid-or-already-cancelled-order`

### Story completion gate

- Tất cả Task của Story đạt Definition of Done.
- Acceptance Criteria trong `sprint-4.md` đạt.
- Automated tests phù hợp pass.
- Manual UI verification phù hợp pass.
- Story PR đã merge vào Epic branch với checks pass.
- `sprint-4-progress.md` đã cập nhật branch, commit, PR và test evidence.

## US-68 — Giữ Draft Order khi checkout fail

**Jira Key thật:** `PAC-107`

**Mục tiêu:** Giữ nguyên Draft Order, items và total khi checkout fail; không trừ stock hay tạo payment/invoice.

### Tasks

- `PAC-TASK-222` / `PAC-432` — Preserve Draft Order after checkout failure in UI
  - Branch đề xuất: `feature/PAC-432-T-222-preserve-draft-order-after-checkout-failure-in-ui`
- `PAC-TASK-223` / `PAC-433` — Restore checkout error state back to Draft Order
  - Branch đề xuất: `feature/PAC-433-T-223-restore-checkout-error-state-back-to-draft-order`
- `PAC-TASK-226` / `PAC-436` — Add POS frontend smoke test checklist
  - Branch đề xuất: `test/PAC-436-T-226-add-pos-frontend-smoke-test-checklist`

### Story completion gate

- Tất cả Task của Story đạt Definition of Done.
- Acceptance Criteria trong `sprint-4.md` đạt.
- Automated tests phù hợp pass.
- Manual UI verification phù hợp pass.
- Story PR đã merge vào Epic branch với checks pass.
- `sprint-4-progress.md` đã cập nhật branch, commit, PR và test evidence.

# XI. Thứ tự triển khai

## Wave 0 — Dependency Gate và Audit

- Xác minh Sprint 3.
- Audit 66 Task.
- Xử lý PAC-TASK-185 parent.
- Cập nhật audit/progress.
- Lập implementation plan.

## Wave 1 — Inventory Adjustment Foundation

- US-49
- US-50
- US-51
- PAC-TASK-185

## Wave 2 — Adjustment Transaction & Safety

- US-52
- US-53
- US-54
- US-55

## Wave 3 — Adjustment Operations

- US-56

## Wave 4 — POS Foundation

- US-57
- US-58

## Wave 5 — POS Item Lifecycle

- US-59
- US-60
- US-61
- US-62
- US-63

## Wave 6 — Scope, Ownership và Recovery

- US-64
- US-65
- US-66
- US-67
- US-68

Không tạo Wave branch để thay issue branch.

---

# XII. GitHub Workflow

Luồng bắt buộc:

```text
Task branch
    ↓
Story branch
    ↓
Epic branch
    ↓
develop
    ↓
PR develop → main
```

## Branch source

- Epic branch từ `develop`.
- Story branch từ Epic branch.
- Task branch từ Story branch.
- Task dependency phải tuần tự.
- Sau khi Task merge, cập nhật Story branch trước Task tiếp theo.

## Branch naming

Epic:

```text
epic/<jira-key>-EPIC-<number>-<slug>
```

Story:

```text
story/<jira-key>-US-<number>-<slug>
```

Task:

```text
<type>/<jira-key>-T-<number>-<slug>
```

Types:

- `feature`
- `test`
- `docs`
- `bugfix`
- `hotfix`

## Jira Key

- Bắt buộc tra `jira-mapping.md`.
- Không tự tính.
- Không dùng Logical Key thay Jira Key thật.
- Không dùng prefix PAI.
- Nếu `branch-on-jira.md` khác mapping, dùng mapping.

## Commit

Format:

```text
<PAC-issue-key> <logical-key>: <short English message>
```

Ví dụ:

```text
PAC-371 T-161: create inventory adjustment Prisma model
PAC-401 T-191: create POS order Prisma model
```

## PR title

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

## Không được làm

- Không push trực tiếp lên `develop`.
- Không push trực tiếp lên `main`.
- Không dùng một branch cho nhiều Task.
- Không dùng Wave branch.
- Không force push `develop` hoặc `main`.
- Không xóa branch nếu cần evidence.
- Không mention AI, agent, prompt hoặc automation trong commit/PR.
- Không commit `.env`, secret, token hoặc credentials.

---

# XIII. Quy trình mỗi Task

## 1. Tạo branch

```bash
git checkout <STORY_BRANCH>
git pull origin <STORY_BRANCH>
git checkout -b <TASK_BRANCH>
```

## 2. Implementation Plan

Ghi trước khi code:

```text
Task:
Jira Key:
Story:
Epic:
Selected Skills:
Acceptance Criteria:
Files to Inspect:
Files Expected to Change:
Implementation Steps:
Test Plan:
Migration Risk:
Security/Permission Risk:
Out of Scope:
```

## 3. TDD

Với logic mới hoặc bug fix:

1. Viết test fail.
2. Chạy xác nhận Red.
3. Implement tối thiểu.
4. Chạy xác nhận Green.
5. Refactor.
6. Chạy regression test.

## 4. Diff review

```bash
git status
git diff
git diff --staged
```

Kiểm tra:

- Không secret.
- Không `.env`.
- Không build output.
- Không debug log.
- Không thay đổi ngoài scope.
- Không silent catch.
- Không `any` không cần thiết.
- Không direct MedicineBatch quantity update.
- Không Draft Order inventory deduction.

## 5. Test

Chỉ chạy scripts tồn tại.

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
npm run test
npm run build
```

Nếu script không có:

```text
N/A — script chưa được cấu hình
```

Không bịa kết quả.

## 6. Commit và push

```bash
git add <files>
git commit -m "<PAC-KEY> T-xxx: <short English message>"
git push -u origin <TASK_BRANCH>
```

## 7. PR Task → Story

Tạo PR, chờ checks pass, review rồi merge.

Không xóa branch sau merge nếu cần evidence.

## 8. Cập nhật evidence

Cập nhật ngay:

- Task checkbox.
- Jira Key.
- Branch.
- Commit.
- PR.
- Test evidence.
- Known issue.
- Next action.

---

# XIV. Hoàn thành User Story

Sau khi tất cả Task merge vào Story branch:

1. Pull Story branch mới nhất.
2. Chạy Story-level integration verification.
3. Chạy manual test phù hợp.
4. Sửa integration issue trên Story branch nếu cần.
5. Cập nhật audit/progress.
6. Tạo PR Story → Epic.
7. Chỉ merge khi checks pass.
8. Không xóa Story branch.

---

# XV. Hoàn thành Epic

Sau khi tất cả Story merge vào Epic branch:

1. Pull Epic branch.
2. Chạy full Epic verification.
3. Chạy Prisma validate/generate nếu liên quan.
4. Chạy backend/frontend build.
5. Chạy manual test toàn Epic.
6. Cập nhật progress.
7. Tạo PR Epic → develop.
8. Chỉ merge khi checks pass.
9. Không xóa Epic branch.

Epic branches chính:

```text
epic/PAC-7-EPIC-07-inventory-adjustment
epic/PAC-8-EPIC-08-pos-draft-order
```

---

# XVI. Test Strategy

## Inventory Adjustment

Phải có evidence cho:

- Create Draft.
- Draft không đổi stock.
- Required reason.
- Whitespace-only reason.
- Batch selector.
- Quantity > 0.
- Increase/decrease.
- Before/after preview.
- Confirm transaction.
- Rollback.
- Negative quantity rejection.
- Confirmed immutability.
- Cancel Draft.
- Warehouse permission.
- Staff denial.
- Admin history.
- Audit log.
- Inventory refresh.
- Direct quantity update blocked.

## POS Draft Order

Phải có evidence cho:

- Create Draft.
- DRAFT default.
- Draft không trừ inventory.
- Search active medicine.
- Inactive medicine excluded.
- Sellable stock.
- Add item.
- Duplicate item rule.
- Update quantity.
- Quantity > 0.
- Sellable stock limit.
- Remove item.
- Total calculation.
- No discount/coupon.
- Walk-in.
- Staff ownership.
- Admin all-orders.
- Warehouse denial.
- Cancel Draft.
- Reject cancel PAID/CANCELLED.
- Preserve Draft after checkout failure.
- Order Detail.
- POS integration tests.
- Frontend smoke checklist.

---

# XVII. Definition of Done

## Task Done

- Đúng scope và Jira Task.
- Acceptance Criteria đạt.
- Baseline không bị vi phạm.
- Test phù hợp pass.
- Build phù hợp pass.
- Code review hoàn tất.
- Branch/commit/PR dùng Jira Key thật.
- PR Task → Story đã merge.
- Audit/progress evidence đã cập nhật.

## User Story Done

- Tất cả Task Done.
- Acceptance Criteria đạt.
- Integration verification pass.
- Manual test phù hợp pass.
- Story PR → Epic đã merge.
- Không còn lỗi trong scope.

## Epic Done

- Tất cả Story Done.
- Full Epic tests pass.
- Prisma validate/generate pass nếu liên quan.
- Backend/frontend build pass.
- Permission/ownership đúng.
- Manual test toàn Epic pass.
- Epic PR → develop đã merge.
- Không còn Blocker/Conflict.

## Sprint Done

- 66 Task đã audit và xử lý.
- 20 Primary User Story Done.
- PAC-TASK-185 đúng parent và Done.
- PAC-EPIC-07 Done.
- PAC-EPIC-08 Done.
- Testing/Documentation evidence đầy đủ.
- `develop` chứa toàn bộ Sprint 4.
- `Ready for Sprint 5 = Yes`.
- PR `develop → main` đã tạo.
- PR `develop → main` chưa được AI tự merge.

---

# XVIII. Out-of-Scope Guard

Không triển khai:

- Full Customer Management.
- Loyalty/customer portal.
- Product Variant Catalog.
- Coupon/discount/promotion.
- Inventory deduction khi tạo Draft Order.
- FEFO allocation.
- Payment.
- Invoice.
- Full checkout transaction.
- DrugInteraction Rule.
- InteractionAlert.
- HIGH acknowledgement/note.
- AI Copilot.
- Graph Sync/Neo4j.
- Refund/return.
- Multi-store/multi-warehouse.
- Direct MedicineBatch quantity update.

Integration point được phép:

- Sellable stock contract.
- Checkout failure recovery contract.
- Order relations chuẩn bị cho Sprint sau.
- Interaction trigger point dạng interface/event stub nếu đã được baseline cho phép, nhưng không implement engine.

---

# XIX. Final Sprint 4 Verification

Sau khi hai Epic merge vào `develop`:

```bash
git checkout develop
git pull origin develop
```

Chạy các script có thật:

```bash
cd backend
npm run lint
npm run test
npm run test:e2e
npx prisma validate
npx prisma generate
npm run build

cd ../frontend
npm run lint
npm run test
npm run build
```

Kiểm tra:

- 66 Task audit/complete.
- 20 User Story complete.
- PAC-TASK-185 đúng parent.
- Không direct quantity update.
- Adjustment transaction/rollback đúng.
- Không quantity âm.
- Adjustment audit đúng.
- Draft Order không trừ inventory.
- Ownership đúng.
- Warehouse bị chặn POS.
- Total deterministic.
- No discount/coupon.
- Checkout failure giữ Draft.
- Không lấn Sprint 5/6.
- Không secret.
- Branch/commit/PR evidence đủ.
- Audit/progress/WORKING-CONTEXT cập nhật.

Chỉ khi toàn bộ đạt:

```text
Ready for Sprint 5 = Yes
```

---

# XX. develop → main

Sau Sprint 4:

1. Tạo PR `develop → main`.
2. Điền description đầy đủ.
3. Chạy checks.
4. Không tự merge.
5. Dừng để người dùng kiểm thử và phê duyệt.

```bash
gh pr create   --base main   --head develop   --title "release: complete Sprint 4 inventory adjustment and POS draft order"   --body-file <PR_BODY_FILE>
```

Tuyệt đối không chạy:

```bash
gh pr merge
```

cho PR `develop → main`.

---

# XXI. Báo cáo cuối

Trả về:

1. Sprint 3 gate.
2. Audit summary.
3. PAC-EPIC-07 status.
4. PAC-EPIC-08 status.
5. US-49 → US-68 status.
6. PAC-TASK-161 → PAC-TASK-226 status.
7. PAC-TASK-185 status và parent.
8. Skills đã dùng.
9. Branches.
10. Commits.
11. Task PRs.
12. Story PRs.
13. Epic PRs.
14. Test results.
15. Manual UI results.
16. Prisma migrations.
17. Permission/ownership findings.
18. Known Issues.
19. Deferred work.
20. Ready for Sprint 5.
21. Link PR `develop → main` chờ phê duyệt.

---

# XXII. Lệnh bắt đầu

Bắt đầu theo thứ tự:

1. Đọc rules và tài liệu.
2. Kiểm tra Git.
3. Xác minh Sprint 3 Gate.
4. Audit 66 Task.
5. Điền `sprint-4-audit.md`.
6. Cập nhật `sprint-4-progress.md`.
7. Lập implementation plan.
8. Lập branch plan.
9. Chọn skills.
10. Chỉ bắt đầu code khi audit hoàn tất và Gate đạt.

Không sửa business code trước khi audit hoàn tất.
Không tự merge `develop → main`.
