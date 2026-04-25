# Sprint 4 AI Agent Prompt — PharmaAssist AI Intelligence

> **Phiên bản đã sửa theo workflow branch được tạo sẵn**
>
> **Đường dẫn:** `work-context/sprint-4/sprint-4-agent-prompt.md`
>
> Tất cả issue branches đã được tạo sẵn trên GitHub theo `Jira/branch-on-jira.md`.
> AI **không được tạo thêm branch mới**. AI phải xác định đúng exact branch, checkout branch đã tồn tại,
> thực hiện công việc, commit đúng Jira Key, push, tạo PR và merge đúng hierarchy.

---

# I. Vai trò và nhiệm vụ

Bạn là AI Coding Agent chính của dự án **PharmaAssist AI Intelligence**.

Thực hiện toàn bộ Sprint 4 theo luồng:

```text
Kiểm tra Sprint 3 Gate
→ đọc rules và tài liệu
→ xác minh các remote branch đã tồn tại
→ audit 66 Task
→ cập nhật sprint-4-audit.md
→ cập nhật sprint-4-progress.md
→ lập implementation plan
→ checkout exact Task branch có sẵn
→ develop + test + commit đúng Jira Key của Task
→ push Task branch
→ PR + merge Task → Story
→ review Story bằng skills
→ nếu cần, sửa và commit đúng Jira Key của Story
→ PR + merge Story → Epic
→ review Epic bằng skills
→ nếu cần, sửa và commit đúng Jira Key của Epic
→ PR + merge Epic → develop
→ lặp lại đến khi hoàn tất toàn bộ Sprint 4
→ tạo PR develop → main nhưng không tự merge
```

## Quy tắc tuyệt đối

- Không chạy `git checkout -b`, `git switch -c` hoặc tạo remote branch mới.
- Không tự dựng tên branch từ Summary.
- Không tự sửa slug branch.
- Không thay branch bị cắt ngắn bằng tên “đẹp hơn”.
- Exact branch phải được copy nguyên văn từ `Jira/branch-on-jira.md`.
- Jira Key phải đúng với issue đang làm.
- Mọi commit mới do AI tạo trực tiếp trên một issue branch phải chứa Jira Key của chính issue branch đó.
- Không dùng Jira Key của Task khi commit sửa lỗi ở Story branch.
- Không dùng Jira Key của Story khi commit sửa lỗi ở Epic branch.
- Không commit trực tiếp lên `develop` hoặc `main`.
- Task phải PR + merge vào Story.
- Story phải PR + merge vào Epic.
- Epic phải PR + merge vào `develop`.
- Không tự merge `develop → main`.
- Không bịa test, commit, PR hoặc merge evidence.
- Không xóa branch sau merge; giữ branch làm evidence.
- Không triển khai lấn Sprint 5 hoặc Sprint 6.

> Việc tạo **local tracking branch** để checkout một remote branch đã tồn tại được phép.
> Đây không được xem là tạo issue branch mới trên GitHub. Chỉ được track đúng `origin/<exact-branch>`.

---

# II. Phạm vi chính thức

| Mục | Giá trị |
|---|---|
| Sprint | Sprint 4 |
| Tên | Inventory Adjustment & POS Draft Order |
| Scope | MVP / Core |
| Primary Stories | US-49 → US-68 |
| Primary Story count | 20 |
| Task range | PAC-TASK-161 → PAC-TASK-226 |
| Task count | 66 |
| Business Epics | PAC-EPIC-07, PAC-EPIC-08 |
| Cross-sprint Task | PAC-TASK-185 thuộc US-38 / PAC-EPIC-05 |
| Sprint issue branches | 88 = 66 Task + 20 Story + 2 Epic |
| Cross-sprint parent branches cần dùng | US-38 và EPIC-05 |
| Tổng branch references cần xác minh | 90 |
| Sprint tiếp theo | Sprint 5 |

## Exact Epic branches

```text
epic/PAC-7-epic-07-inventory-adjustment
epic/PAC-8-epic-08-pos-draft-order
```

Cross-sprint Epic branch:

```text
epic/PAC-5-epic-05-inventory-medicinebatch
```

---

# III. Nguồn dữ liệu và thứ tự ưu tiên

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
17. `Jira/jira-mapping.md`
18. `Jira/branch-on-jira.md`
19. Tài liệu SRS, Role & Permission, Module Design, API, Database, Prisma, UI/UX và Testing liên quan.

Thứ tự ưu tiên:

1. `branch-on-jira.md` quyết định **exact branch name** đã tồn tại.
2. `jira-mapping.md` quyết định Jira Key thật.
3. Task List 4B quyết định Task → Story → Epic → Component.
4. Task Description 4B quyết định nội dung Task.
5. `3_Stories.md` quyết định User Story và Acceptance Criteria.
6. `2_Epic.md` quyết định Epic.
7. `5_Sprint.md` quyết định scope Sprint.

Nếu tên branch trong tài liệu Sprint cũ khác `branch-on-jira.md`, luôn dùng `branch-on-jira.md`.

---

# IV. Dependency Gate trước khi triển khai

Xác minh:

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

Dependency kỹ thuật:

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

Nếu gate không đạt:

1. Không checkout để sửa business code Sprint 4.
2. Không tạo branch mới.
3. Ghi blocker vào `sprint-4-audit.md`.
4. Đặt `Ready to implement Sprint 4 = No`.
5. Dừng triển khai.

---

# V. Skills

Mỗi Task, Story review và Epic review phải ghi skills thực tế đã dùng:

```text
Selected Skills:
- <skill>: <lý do>
```

## Skills nền

- `agent-skills-lifecycle`
- `karpathy-principles`
- `writing-plans`
- `ecc-code-quality`

## Database, Prisma, migration

- `ecc-database`
- `ecc-backend`
- `tdd`
- `ecc-testing`

## Backend, API, authorization, ownership

- `ecc-backend`
- `ecc-security`
- `tdd`
- `ecc-testing`

## Transaction, rollback, business rule

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

## GitHub, PR, CI, evidence

- `git-github`
- `ecc-devops`
- `ecc-business-ops`

## Documentation

- `mattpocock-productivity`
- `ecc-business-ops`

Không dùng AI/Graph-specific skills nếu Task không yêu cầu.

---

# VI. Bắt đầu phiên làm việc và xác minh branch

Chạy:

```bash
git status
git remote -v
git fetch --all --prune=false

git switch main
git pull origin main

git switch develop
git pull origin develop

git status
git branch --show-current
git log --oneline --decorate -30
git ls-remote --heads origin
```

Không dùng `git fetch --prune` và không xóa remote-tracking evidence.

## Xác minh branch inventory

Trước khi code, xác minh:

- 66 exact Task branches tồn tại.
- 20 exact primary Story branches tồn tại.
- 2 exact business Epic branches tồn tại.
- Exact Story branch US-38 tồn tại.
- Exact Epic branch EPIC-05 tồn tại.
- Không có branch name mismatch.
- Không tự tạo branch thay thế cho branch thiếu.

Kiểm tra một branch:

```bash
git ls-remote --exit-code --heads origin "refs/heads/<EXACT_BRANCH>"
```

Nếu exact remote branch không tồn tại:

```text
Branch Status = Missing Branch
Implementation Status = Blocked
```

Ghi vào audit/progress. Không tạo branch mới và không làm việc trên branch gần giống.

## Checkout branch đã tồn tại

Nếu local branch đã tồn tại:

```bash
git switch <EXACT_BRANCH>
git pull origin <EXACT_BRANCH>
```

Nếu chỉ remote branch tồn tại:

```bash
git switch --track origin/<EXACT_BRANCH>
```

Lệnh trên chỉ tạo local tracking reference cho remote branch có sẵn; không được push một branch name mới.

---

# VII. Audit trước khi code

Audit toàn bộ `PAC-TASK-161 → PAC-TASK-226`.

Trạng thái:

- `Done`
- `Partial`
- `Missing`
- `Conflict`
- `Failed Verification`
- `N/A`

Audit phải bao gồm:

- Database/Prisma/migration.
- Backend/API/transaction.
- Frontend/UI states.
- Auth/permission/ownership.
- Unit/integration/E2E/smoke tests.
- Exact branch.
- Commit evidence.
- PR head/base.
- Merge evidence.
- PAC-TASK-185 parent.
- Existing code có thể tái sử dụng.
- Conflicts với baseline.

Cập nhật:

```text
work-context/sprint-4/sprint-4-audit.md
work-context/sprint-4/sprint-4-progress.md
```

Nếu audit đã được hoàn tất trước đó, phải kiểm tra tính còn hiệu lực của evidence; không xóa hoặc reset kết quả đúng.

---

# VIII. Baseline Inventory Adjustment

1. MedicineBatch là inventory source of truth.
2. Không dùng aggregate inventory làm nguồn chính.
3. Không có public API sửa trực tiếp MedicineBatch.quantity.
4. Adjustment tác động MedicineBatch cụ thể.
5. Adjustment bắt đầu ở Draft.
6. Draft chưa thay đổi stock.
7. Reason bắt buộc, trim và reject whitespace-only.
8. Quantity adjustment > 0.
9. Có tăng/giảm hoặc delta contract rõ ràng.
10. Quantity sau adjustment không âm.
11. Confirm chạy trong database transaction.
12. Một line lỗi rollback toàn bộ.
13. Confirmed adjustment immutable.
14. Draft adjustment cancel được.
15. Cancel Draft không thay đổi MedicineBatch.
16. Audit có actor, reason, batch, before/after và timestamp.
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
7. POS chỉ hiển thị sellable stock cần bán.
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

# X. Exact Branch Registry — Sprint 4

> Không sử dụng bất kỳ “Branch đề xuất” cũ nào trong `sprint-4.md` hoặc phiên bản prompt cũ.
> Chỉ sử dụng các exact branch dưới đây, được lấy từ `branch-on-jira.md`.

## US-49 — Tạo Inventory Adjustment

- **Jira Key Story:** `PAC-88`
- **Story branch bắt buộc đã tồn tại:** `story/PAC-88-us-49-tao-inventory-adjustment`
- **Story PR target:** `epic/PAC-7-epic-07-inventory-adjustment`
- **Mục tiêu:** Tạo Inventory Adjustment Draft với schema, lines, API và UI mà chưa làm thay đổi MedicineBatch.

| Task | Jira Key | Exact Task Branch đã tồn tại | PR target bắt buộc |
|---|---|---|---|
| PAC-TASK-161 | `PAC-371` | `feature/PAC-371-task-161-create-inventory-adjustments-prisma-model` | `story/PAC-88-us-49-tao-inventory-adjustment` |
| PAC-TASK-162 | `PAC-372` | `feature/PAC-372-task-162-create-inventory-adjustment-lines-prisma-model` | `story/PAC-88-us-49-tao-inventory-adjustment` |
| PAC-TASK-163 | `PAC-373` | `feature/PAC-373-task-163-implement-create-inventory-adjustment-api` | `story/PAC-88-us-49-tao-inventory-adjustment` |
| PAC-TASK-164 | `PAC-374` | `feature/PAC-374-task-164-build-create-inventory-adjustment-screen` | `story/PAC-88-us-49-tao-inventory-adjustment` |
| PAC-TASK-166 | `PAC-376` | `feature/PAC-376-task-166-validate-adjustment-type-and-quantity` | `story/PAC-88-us-49-tao-inventory-adjustment` |

### Story completion gate

- Mọi Task branch trong bảng đã được checkout từ remote branch có sẵn; không tạo branch mới.
- Mỗi Task có commit mới mang đúng Jira Key của Task branch.
- Mỗi Task có PR và đã merge vào đúng Story branch.
- Chạy Story-level review bằng skills phù hợp sau khi tất cả Task đã merge.
- Nếu review phát hiện lỗi, sửa trực tiếp trên Story branch và commit bằng Jira Key `PAC-88`, ví dụ: `PAC-88 US-49: fix story integration issues`.
- Story tests, integration verification và manual verification phù hợp đều đạt.
- Story PR đã merge vào exact Epic branch `epic/PAC-7-epic-07-inventory-adjustment`.
- Evidence đã cập nhật trong `sprint-4-progress.md` và `sprint-4-audit.md`.

## US-50 — Adjustment bắt buộc reason

- **Jira Key Story:** `PAC-89`
- **Story branch bắt buộc đã tồn tại:** `story/PAC-89-us-50-adjustment-bat-buoc-reason`
- **Story PR target:** `epic/PAC-7-epic-07-inventory-adjustment`
- **Mục tiêu:** Bắt buộc reason ở backend và frontend; reject giá trị rỗng hoặc chỉ khoảng trắng.

| Task | Jira Key | Exact Task Branch đã tồn tại | PR target bắt buộc |
|---|---|---|---|
| PAC-TASK-167 | `PAC-377` | `feature/PAC-377-task-167-enforce-required-adjustment-reason-in-backend` | `story/PAC-89-us-50-adjustment-bat-buoc-reason` |
| PAC-TASK-168 | `PAC-378` | `feature/PAC-378-task-168-add-required-reason-validation-in-ui` | `story/PAC-89-us-50-adjustment-bat-buoc-reason` |
| PAC-TASK-183 | `PAC-393` | `test/PAC-393-task-183-add-tests-for-required-adjustment-reason` | `story/PAC-89-us-50-adjustment-bat-buoc-reason` |

### Story completion gate

- Mọi Task branch trong bảng đã được checkout từ remote branch có sẵn; không tạo branch mới.
- Mỗi Task có commit mới mang đúng Jira Key của Task branch.
- Mỗi Task có PR và đã merge vào đúng Story branch.
- Chạy Story-level review bằng skills phù hợp sau khi tất cả Task đã merge.
- Nếu review phát hiện lỗi, sửa trực tiếp trên Story branch và commit bằng Jira Key `PAC-89`, ví dụ: `PAC-89 US-50: fix story integration issues`.
- Story tests, integration verification và manual verification phù hợp đều đạt.
- Story PR đã merge vào exact Epic branch `epic/PAC-7-epic-07-inventory-adjustment`.
- Evidence đã cập nhật trong `sprint-4-progress.md` và `sprint-4-audit.md`.

## US-51 — Chọn MedicineBatch cần điều chỉnh

- **Jira Key Story:** `PAC-90`
- **Story branch bắt buộc đã tồn tại:** `story/PAC-90-us-51-chon-medicinebatch-can-dieu-chinh`
- **Story PR target:** `epic/PAC-7-epic-07-inventory-adjustment`
- **Mục tiêu:** Chọn MedicineBatch cụ thể và hiển thị preview quantity trước/sau.

| Task | Jira Key | Exact Task Branch đã tồn tại | PR target bắt buộc |
|---|---|---|---|
| PAC-TASK-165 | `PAC-375` | `feature/PAC-375-task-165-build-medicinebatch-selector-for-adjustment` | `story/PAC-90-us-51-chon-medicinebatch-can-dieu-chinh` |
| PAC-TASK-169 | `PAC-379` | `feature/PAC-379-task-169-show-batch-before-after-quantity-preview` | `story/PAC-90-us-51-chon-medicinebatch-can-dieu-chinh` |

### Story completion gate

- Mọi Task branch trong bảng đã được checkout từ remote branch có sẵn; không tạo branch mới.
- Mỗi Task có commit mới mang đúng Jira Key của Task branch.
- Mỗi Task có PR và đã merge vào đúng Story branch.
- Chạy Story-level review bằng skills phù hợp sau khi tất cả Task đã merge.
- Nếu review phát hiện lỗi, sửa trực tiếp trên Story branch và commit bằng Jira Key `PAC-90`, ví dụ: `PAC-90 US-51: fix story integration issues`.
- Story tests, integration verification và manual verification phù hợp đều đạt.
- Story PR đã merge vào exact Epic branch `epic/PAC-7-epic-07-inventory-adjustment`.
- Evidence đã cập nhật trong `sprint-4-progress.md` và `sprint-4-audit.md`.

## US-52 — Confirm Inventory Adjustment transaction

- **Jira Key Story:** `PAC-91`
- **Story branch bắt buộc đã tồn tại:** `story/PAC-91-us-52-confirm-inventory-adjustment-transaction`
- **Story PR target:** `epic/PAC-7-epic-07-inventory-adjustment`
- **Mục tiêu:** Confirm Inventory Adjustment trong transaction, cập nhật MedicineBatch đúng và khóa adjustment đã confirmed.

| Task | Jira Key | Exact Task Branch đã tồn tại | PR target bắt buộc |
|---|---|---|---|
| PAC-TASK-170 | `PAC-380` | `feature/PAC-380-task-170-implement-confirm-inventory-adjustment-transaction` | `story/PAC-91-us-52-confirm-inventory-adjustment-transaction` |
| PAC-TASK-171 | `PAC-381` | `feature/PAC-381-task-171-update-medicinebatch-through-adjustment-transaction` | `story/PAC-91-us-52-confirm-inventory-adjustment-transaction` |
| PAC-TASK-173 | `PAC-383` | `feature/PAC-383-task-173-lock-confirmed-inventory-adjustment` | `story/PAC-91-us-52-confirm-inventory-adjustment-transaction` |
| PAC-TASK-188 | `PAC-398` | `feature/PAC-398-task-188-refresh-inventory-summary-after-adjustment-confirm` | `story/PAC-91-us-52-confirm-inventory-adjustment-transaction` |

### Story completion gate

- Mọi Task branch trong bảng đã được checkout từ remote branch có sẵn; không tạo branch mới.
- Mỗi Task có commit mới mang đúng Jira Key của Task branch.
- Mỗi Task có PR và đã merge vào đúng Story branch.
- Chạy Story-level review bằng skills phù hợp sau khi tất cả Task đã merge.
- Nếu review phát hiện lỗi, sửa trực tiếp trên Story branch và commit bằng Jira Key `PAC-91`, ví dụ: `PAC-91 US-52: fix story integration issues`.
- Story tests, integration verification và manual verification phù hợp đều đạt.
- Story PR đã merge vào exact Epic branch `epic/PAC-7-epic-07-inventory-adjustment`.
- Evidence đã cập nhật trong `sprint-4-progress.md` và `sprint-4-audit.md`.

## US-53 — Chặn adjustment làm quantity âm

- **Jira Key Story:** `PAC-92`
- **Story branch bắt buộc đã tồn tại:** `story/PAC-92-us-53-chan-adjustment-lam-quantity-am`
- **Story PR target:** `epic/PAC-7-epic-07-inventory-adjustment`
- **Mục tiêu:** Ngăn mọi adjustment làm quantity âm và bảo vệ bằng test.

| Task | Jira Key | Exact Task Branch đã tồn tại | PR target bắt buộc |
|---|---|---|---|
| PAC-TASK-172 | `PAC-382` | `feature/PAC-382-task-172-prevent-adjustment-from-making-quantity-negative` | `story/PAC-92-us-53-chan-adjustment-lam-quantity-am` |
| PAC-TASK-182 | `PAC-392` | `test/PAC-392-task-182-add-tests-for-negative-quantity-adjustment` | `story/PAC-92-us-53-chan-adjustment-lam-quantity-am` |

### Story completion gate

- Mọi Task branch trong bảng đã được checkout từ remote branch có sẵn; không tạo branch mới.
- Mỗi Task có commit mới mang đúng Jira Key của Task branch.
- Mỗi Task có PR và đã merge vào đúng Story branch.
- Chạy Story-level review bằng skills phù hợp sau khi tất cả Task đã merge.
- Nếu review phát hiện lỗi, sửa trực tiếp trên Story branch và commit bằng Jira Key `PAC-92`, ví dụ: `PAC-92 US-53: fix story integration issues`.
- Story tests, integration verification và manual verification phù hợp đều đạt.
- Story PR đã merge vào exact Epic branch `epic/PAC-7-epic-07-inventory-adjustment`.
- Evidence đã cập nhật trong `sprint-4-progress.md` và `sprint-4-audit.md`.

## US-54 — Warehouse tạo và confirm adjustment

- **Jira Key Story:** `PAC-93`
- **Story branch bắt buộc đã tồn tại:** `story/PAC-93-us-54-warehouse-tao-va-confirm-adjustment`
- **Story PR target:** `epic/PAC-7-epic-07-inventory-adjustment`
- **Mục tiêu:** Cho Warehouse tạo/confirm adjustment theo permission, đồng thời chặn role không phù hợp.

| Task | Jira Key | Exact Task Branch đã tồn tại | PR target bắt buộc |
|---|---|---|---|
| PAC-TASK-178 | `PAC-388` | `feature/PAC-388-task-178-add-warehouse-permission-for-create-confirm-adjustm` | `story/PAC-93-us-54-warehouse-tao-va-confirm-adjustment` |
| PAC-TASK-184 | `PAC-394` | `test/PAC-394-task-184-add-tests-for-warehouse-adjustment-permission` | `story/PAC-93-us-54-warehouse-tao-va-confirm-adjustment` |

### Story completion gate

- Mọi Task branch trong bảng đã được checkout từ remote branch có sẵn; không tạo branch mới.
- Mỗi Task có commit mới mang đúng Jira Key của Task branch.
- Mỗi Task có PR và đã merge vào đúng Story branch.
- Chạy Story-level review bằng skills phù hợp sau khi tất cả Task đã merge.
- Nếu review phát hiện lỗi, sửa trực tiếp trên Story branch và commit bằng Jira Key `PAC-93`, ví dụ: `PAC-93 US-54: fix story integration issues`.
- Story tests, integration verification và manual verification phù hợp đều đạt.
- Story PR đã merge vào exact Epic branch `epic/PAC-7-epic-07-inventory-adjustment`.
- Evidence đã cập nhật trong `sprint-4-progress.md` và `sprint-4-audit.md`.

## US-55 — Audit Inventory Adjustment

- **Jira Key Story:** `PAC-94`
- **Story branch bắt buộc đã tồn tại:** `story/PAC-94-us-55-audit-inventory-adjustment`
- **Story PR target:** `epic/PAC-7-epic-07-inventory-adjustment`
- **Mục tiêu:** Ghi audit đầy đủ cho adjustment và hiển thị metadata truy vết.

| Task | Jira Key | Exact Task Branch đã tồn tại | PR target bắt buộc |
|---|---|---|---|
| PAC-TASK-180 | `PAC-390` | `feature/PAC-390-task-180-write-audit-log-for-inventory-adjustment` | `story/PAC-94-us-55-audit-inventory-adjustment` |
| PAC-TASK-181 | `PAC-391` | `feature/PAC-391-task-181-display-adjustment-audit-information-in-ui` | `story/PAC-94-us-55-audit-inventory-adjustment` |

### Story completion gate

- Mọi Task branch trong bảng đã được checkout từ remote branch có sẵn; không tạo branch mới.
- Mỗi Task có commit mới mang đúng Jira Key của Task branch.
- Mỗi Task có PR và đã merge vào đúng Story branch.
- Chạy Story-level review bằng skills phù hợp sau khi tất cả Task đã merge.
- Nếu review phát hiện lỗi, sửa trực tiếp trên Story branch và commit bằng Jira Key `PAC-94`, ví dụ: `PAC-94 US-55: fix story integration issues`.
- Story tests, integration verification và manual verification phù hợp đều đạt.
- Story PR đã merge vào exact Epic branch `epic/PAC-7-epic-07-inventory-adjustment`.
- Evidence đã cập nhật trong `sprint-4-progress.md` và `sprint-4-audit.md`.

## US-56 — Admin xem lịch sử adjustment

- **Jira Key Story:** `PAC-95`
- **Story branch bắt buộc đã tồn tại:** `story/PAC-95-us-56-admin-xem-lich-su-adjustment`
- **Story PR target:** `epic/PAC-7-epic-07-inventory-adjustment`
- **Mục tiêu:** Cho Admin xem lịch sử/detail, cancel Draft, refresh inventory và hoàn thiện smoke/traceability.

| Task | Jira Key | Exact Task Branch đã tồn tại | PR target bắt buộc |
|---|---|---|---|
| PAC-TASK-174 | `PAC-384` | `feature/PAC-384-task-174-create-inventory-adjustment-list-api` | `story/PAC-95-us-56-admin-xem-lich-su-adjustment` |
| PAC-TASK-175 | `PAC-385` | `feature/PAC-385-task-175-build-inventory-adjustment-history-list-ui` | `story/PAC-95-us-56-admin-xem-lich-su-adjustment` |
| PAC-TASK-176 | `PAC-386` | `feature/PAC-386-task-176-implement-inventory-adjustment-detail-api` | `story/PAC-95-us-56-admin-xem-lich-su-adjustment` |
| PAC-TASK-177 | `PAC-387` | `feature/PAC-387-task-177-build-inventory-adjustment-detail-screen` | `story/PAC-95-us-56-admin-xem-lich-su-adjustment` |
| PAC-TASK-179 | `PAC-389` | `feature/PAC-389-task-179-add-admin-permission-for-adjustment-history-and-rev` | `story/PAC-95-us-56-admin-xem-lich-su-adjustment` |
| PAC-TASK-186 | `PAC-396` | `feature/PAC-396-task-186-implement-cancel-draft-inventory-adjustment-api` | `story/PAC-95-us-56-admin-xem-lich-su-adjustment` |
| PAC-TASK-187 | `PAC-397` | `feature/PAC-397-task-187-build-cancel-draft-inventory-adjustment-ui` | `story/PAC-95-us-56-admin-xem-lich-su-adjustment` |
| PAC-TASK-189 | `PAC-399` | `test/PAC-399-task-189-add-inventory-adjustment-smoke-test-checklist` | `story/PAC-95-us-56-admin-xem-lich-su-adjustment` |
| PAC-TASK-190 | `PAC-400` | `feature/PAC-400-task-190-add-inventory-adjustment-traceability-notes` | `story/PAC-95-us-56-admin-xem-lich-su-adjustment` |

### Story completion gate

- Mọi Task branch trong bảng đã được checkout từ remote branch có sẵn; không tạo branch mới.
- Mỗi Task có commit mới mang đúng Jira Key của Task branch.
- Mỗi Task có PR và đã merge vào đúng Story branch.
- Chạy Story-level review bằng skills phù hợp sau khi tất cả Task đã merge.
- Nếu review phát hiện lỗi, sửa trực tiếp trên Story branch và commit bằng Jira Key `PAC-95`, ví dụ: `PAC-95 US-56: fix story integration issues`.
- Story tests, integration verification và manual verification phù hợp đều đạt.
- Story PR đã merge vào exact Epic branch `epic/PAC-7-epic-07-inventory-adjustment`.
- Evidence đã cập nhật trong `sprint-4-progress.md` và `sprint-4-audit.md`.

## Cross-sprint TASK-185 — Block direct MedicineBatch quantity update service path

- **Project Task:** `PAC-TASK-185`
- **Jira Key Task:** `PAC-395`
- **Exact Task branch đã tồn tại:** `feature/PAC-395-task-185-block-direct-medicinebatch-quantity-update-service-`
- **Linked Story:** `US-38 / PAC-77`
- **Exact Story branch:** `story/PAC-77-us-38-chan-sua-truc-tiep-quantity-trong-batch-detail`
- **Parent Epic:** `PAC-EPIC-05 / PAC-5`
- **Exact Epic branch:** `epic/PAC-5-epic-05-inventory-medicinebatch`

Luồng bắt buộc:

```text
feature/PAC-395-task-185-block-direct-medicinebatch-quantity-update-service-
→ story/PAC-77-us-38-chan-sua-truc-tiep-quantity-trong-batch-detail
→ epic/PAC-5-epic-05-inventory-medicinebatch
→ develop
```

Quy tắc:

- Không tạo branch mới.
- Không chuyển TASK-185 sang US-56 hoặc EPIC-07.
- Trước khi code, xác minh cả ba remote branch trên vẫn tồn tại.
- Commit trên Task branch phải chứa Jira Key `PAC-395`.
- Sau khi Task PR merge vào US-38, chạy review hồi quy US-38.
- Nếu cần sửa ở cấp Story, commit trên Story branch phải chứa Jira Key `PAC-77`.
- Sau khi Story PR merge vào EPIC-05, chạy review hồi quy phần bị ảnh hưởng của EPIC-05.
- Nếu cần sửa ở cấp Epic, commit trên Epic branch phải chứa Jira Key `PAC-5`.
- Tạo và merge PR EPIC-05 → `develop` cho delta mới của TASK-185.
- Không tạo duplicate PR nếu một PR tương ứng đã merge và không có commit mới sau lần merge đó.

## US-57 — Tạo Draft Order tại POS

- **Jira Key Story:** `PAC-96`
- **Story branch bắt buộc đã tồn tại:** `story/PAC-96-us-57-tao-draft-order-tai-pos`
- **Story PR target:** `epic/PAC-8-epic-08-pos-draft-order`
- **Mục tiêu:** Tạo Order/OrderItem và Draft Order tại POS với status DRAFT/PAID/CANCELLED.

| Task | Jira Key | Exact Task Branch đã tồn tại | PR target bắt buộc |
|---|---|---|---|
| PAC-TASK-191 | `PAC-401` | `feature/PAC-401-task-191-create-orders-prisma-model` | `story/PAC-96-us-57-tao-draft-order-tai-pos` |
| PAC-TASK-192 | `PAC-402` | `feature/PAC-402-task-192-create-order-items-prisma-model` | `story/PAC-96-us-57-tao-draft-order-tai-pos` |
| PAC-TASK-193 | `PAC-403` | `feature/PAC-403-task-193-add-order-status-enum-draft-paid-cancelled` | `story/PAC-96-us-57-tao-draft-order-tai-pos` |
| PAC-TASK-194 | `PAC-404` | `feature/PAC-404-task-194-implement-create-draft-order-api` | `story/PAC-96-us-57-tao-draft-order-tai-pos` |
| PAC-TASK-195 | `PAC-405` | `feature/PAC-405-task-195-build-pos-draft-order-screen` | `story/PAC-96-us-57-tao-draft-order-tai-pos` |
| PAC-TASK-225 | `PAC-435` | `test/PAC-435-task-225-add-pos-api-integration-tests` | `story/PAC-96-us-57-tao-draft-order-tai-pos` |

### Story completion gate

- Mọi Task branch trong bảng đã được checkout từ remote branch có sẵn; không tạo branch mới.
- Mỗi Task có commit mới mang đúng Jira Key của Task branch.
- Mỗi Task có PR và đã merge vào đúng Story branch.
- Chạy Story-level review bằng skills phù hợp sau khi tất cả Task đã merge.
- Nếu review phát hiện lỗi, sửa trực tiếp trên Story branch và commit bằng Jira Key `PAC-96`, ví dụ: `PAC-96 US-57: fix story integration issues`.
- Story tests, integration verification và manual verification phù hợp đều đạt.
- Story PR đã merge vào exact Epic branch `epic/PAC-8-epic-08-pos-draft-order`.
- Evidence đã cập nhật trong `sprint-4-progress.md` và `sprint-4-audit.md`.

## US-58 — Tìm thuốc trong POS

- **Jira Key Story:** `PAC-97`
- **Story branch bắt buộc đã tồn tại:** `story/PAC-97-us-58-tim-thuoc-trong-pos`
- **Story PR target:** `epic/PAC-8-epic-08-pos-draft-order`
- **Mục tiêu:** Tìm medicine active trong POS và hiển thị sellable stock.

| Task | Jira Key | Exact Task Branch đã tồn tại | PR target bắt buộc |
|---|---|---|---|
| PAC-TASK-196 | `PAC-406` | `feature/PAC-406-task-196-implement-pos-medicine-search-api` | `story/PAC-97-us-58-tim-thuoc-trong-pos` |
| PAC-TASK-197 | `PAC-407` | `feature/PAC-407-task-197-build-pos-medicine-search-component` | `story/PAC-97-us-58-tim-thuoc-trong-pos` |
| PAC-TASK-198 | `PAC-408` | `feature/PAC-408-task-198-display-sellable-stock-in-pos-search-results` | `story/PAC-97-us-58-tim-thuoc-trong-pos` |

### Story completion gate

- Mọi Task branch trong bảng đã được checkout từ remote branch có sẵn; không tạo branch mới.
- Mỗi Task có commit mới mang đúng Jira Key của Task branch.
- Mỗi Task có PR và đã merge vào đúng Story branch.
- Chạy Story-level review bằng skills phù hợp sau khi tất cả Task đã merge.
- Nếu review phát hiện lỗi, sửa trực tiếp trên Story branch và commit bằng Jira Key `PAC-97`, ví dụ: `PAC-97 US-58: fix story integration issues`.
- Story tests, integration verification và manual verification phù hợp đều đạt.
- Story PR đã merge vào exact Epic branch `epic/PAC-8-epic-08-pos-draft-order`.
- Evidence đã cập nhật trong `sprint-4-progress.md` và `sprint-4-audit.md`.

## US-59 — Thêm thuốc vào Draft Order

- **Jira Key Story:** `PAC-98`
- **Story branch bắt buộc đã tồn tại:** `story/PAC-98-us-59-them-thuoc-vao-draft-order`
- **Story PR target:** `epic/PAC-8-epic-08-pos-draft-order`
- **Mục tiêu:** Thêm medicine vào Draft Order, không tạo duplicate item sai và validate dữ liệu.

| Task | Jira Key | Exact Task Branch đã tồn tại | PR target bắt buộc |
|---|---|---|---|
| PAC-TASK-199 | `PAC-409` | `feature/PAC-409-task-199-implement-add-item-to-draft-order-api` | `story/PAC-98-us-59-them-thuoc-vao-draft-order` |
| PAC-TASK-200 | `PAC-410` | `feature/PAC-410-task-200-build-add-to-order-action-in-pos` | `story/PAC-98-us-59-them-thuoc-vao-draft-order` |
| PAC-TASK-201 | `PAC-411` | `feature/PAC-411-task-201-validate-active-medicine-when-adding-pos-item` | `story/PAC-98-us-59-them-thuoc-vao-draft-order` |

### Story completion gate

- Mọi Task branch trong bảng đã được checkout từ remote branch có sẵn; không tạo branch mới.
- Mỗi Task có commit mới mang đúng Jira Key của Task branch.
- Mỗi Task có PR và đã merge vào đúng Story branch.
- Chạy Story-level review bằng skills phù hợp sau khi tất cả Task đã merge.
- Nếu review phát hiện lỗi, sửa trực tiếp trên Story branch và commit bằng Jira Key `PAC-98`, ví dụ: `PAC-98 US-59: fix story integration issues`.
- Story tests, integration verification và manual verification phù hợp đều đạt.
- Story PR đã merge vào exact Epic branch `epic/PAC-8-epic-08-pos-draft-order`.
- Evidence đã cập nhật trong `sprint-4-progress.md` và `sprint-4-audit.md`.

## US-60 — Cập nhật số lượng thuốc trong Draft Order

- **Jira Key Story:** `PAC-99`
- **Story branch bắt buộc đã tồn tại:** `story/PAC-99-us-60-cap-nhat-so-luong-thuoc-trong-draft-order`
- **Story PR target:** `epic/PAC-8-epic-08-pos-draft-order`
- **Mục tiêu:** Cập nhật quantity item với quantity > 0 và không vượt sellable stock.

| Task | Jira Key | Exact Task Branch đã tồn tại | PR target bắt buộc |
|---|---|---|---|
| PAC-TASK-202 | `PAC-412` | `feature/PAC-412-task-202-implement-update-draft-order-item-quantity-api` | `story/PAC-99-us-60-cap-nhat-so-luong-thuoc-trong-draft-order` |
| PAC-TASK-203 | `PAC-413` | `feature/PAC-413-task-203-build-quantity-controls-in-draft-order-ui` | `story/PAC-99-us-60-cap-nhat-so-luong-thuoc-trong-draft-order` |
| PAC-TASK-204 | `PAC-414` | `feature/PAC-414-task-204-validate-draft-order-quantity-greater-than-zero` | `story/PAC-99-us-60-cap-nhat-so-luong-thuoc-trong-draft-order` |

### Story completion gate

- Mọi Task branch trong bảng đã được checkout từ remote branch có sẵn; không tạo branch mới.
- Mỗi Task có commit mới mang đúng Jira Key của Task branch.
- Mỗi Task có PR và đã merge vào đúng Story branch.
- Chạy Story-level review bằng skills phù hợp sau khi tất cả Task đã merge.
- Nếu review phát hiện lỗi, sửa trực tiếp trên Story branch và commit bằng Jira Key `PAC-99`, ví dụ: `PAC-99 US-60: fix story integration issues`.
- Story tests, integration verification và manual verification phù hợp đều đạt.
- Story PR đã merge vào exact Epic branch `epic/PAC-8-epic-08-pos-draft-order`.
- Evidence đã cập nhật trong `sprint-4-progress.md` và `sprint-4-audit.md`.

## US-61 — Xóa thuốc khỏi Draft Order

- **Jira Key Story:** `PAC-100`
- **Story branch bắt buộc đã tồn tại:** `story/PAC-100-us-61-xoa-thuoc-khoi-draft-order`
- **Story PR target:** `epic/PAC-8-epic-08-pos-draft-order`
- **Mục tiêu:** Xóa item khỏi Draft Order và cập nhật total mà không đụng tồn kho.

| Task | Jira Key | Exact Task Branch đã tồn tại | PR target bắt buộc |
|---|---|---|---|
| PAC-TASK-206 | `PAC-416` | `feature/PAC-416-task-206-implement-remove-item-from-draft-order-api` | `story/PAC-100-us-61-xoa-thuoc-khoi-draft-order` |
| PAC-TASK-207 | `PAC-417` | `feature/PAC-417-task-207-build-remove-item-action-in-pos` | `story/PAC-100-us-61-xoa-thuoc-khoi-draft-order` |

### Story completion gate

- Mọi Task branch trong bảng đã được checkout từ remote branch có sẵn; không tạo branch mới.
- Mỗi Task có commit mới mang đúng Jira Key của Task branch.
- Mỗi Task có PR và đã merge vào đúng Story branch.
- Chạy Story-level review bằng skills phù hợp sau khi tất cả Task đã merge.
- Nếu review phát hiện lỗi, sửa trực tiếp trên Story branch và commit bằng Jira Key `PAC-100`, ví dụ: `PAC-100 US-61: fix story integration issues`.
- Story tests, integration verification và manual verification phù hợp đều đạt.
- Story PR đã merge vào exact Epic branch `epic/PAC-8-epic-08-pos-draft-order`.
- Evidence đã cập nhật trong `sprint-4-progress.md` và `sprint-4-audit.md`.

## US-62 — Tính tổng tiền Draft Order

- **Jira Key Story:** `PAC-101`
- **Story branch bắt buộc đã tồn tại:** `story/PAC-101-us-62-tinh-tong-tien-draft-order`
- **Story PR target:** `epic/PAC-8-epic-08-pos-draft-order`
- **Mục tiêu:** Tính total deterministic, không coupon/discount.

| Task | Jira Key | Exact Task Branch đã tồn tại | PR target bắt buộc |
|---|---|---|---|
| PAC-TASK-208 | `PAC-418` | `feature/PAC-418-task-208-implement-draft-order-total-calculation-service` | `story/PAC-101-us-62-tinh-tong-tien-draft-order` |
| PAC-TASK-209 | `PAC-419` | `feature/PAC-419-task-209-display-draft-order-totals-in-pos-ui` | `story/PAC-101-us-62-tinh-tong-tien-draft-order` |
| PAC-TASK-210 | `PAC-420` | `feature/PAC-420-task-210-ensure-no-coupon-or-discount-logic-in-mvp-draft-ord` | `story/PAC-101-us-62-tinh-tong-tien-draft-order` |

### Story completion gate

- Mọi Task branch trong bảng đã được checkout từ remote branch có sẵn; không tạo branch mới.
- Mỗi Task có commit mới mang đúng Jira Key của Task branch.
- Mỗi Task có PR và đã merge vào đúng Story branch.
- Chạy Story-level review bằng skills phù hợp sau khi tất cả Task đã merge.
- Nếu review phát hiện lỗi, sửa trực tiếp trên Story branch và commit bằng Jira Key `PAC-101`, ví dụ: `PAC-101 US-62: fix story integration issues`.
- Story tests, integration verification và manual verification phù hợp đều đạt.
- Story PR đã merge vào exact Epic branch `epic/PAC-8-epic-08-pos-draft-order`.
- Evidence đã cập nhật trong `sprint-4-progress.md` và `sprint-4-audit.md`.

## US-63 — Validate sellable stock khi lập đơn

- **Jira Key Story:** `PAC-102`
- **Story branch bắt buộc đã tồn tại:** `story/PAC-102-us-63-validate-sellable-stock-khi-lap-don`
- **Story PR target:** `epic/PAC-8-epic-08-pos-draft-order`
- **Mục tiêu:** Validate sellable stock khi lập đơn nhưng chưa FEFO/trừ batch.

| Task | Jira Key | Exact Task Branch đã tồn tại | PR target bắt buộc |
|---|---|---|---|
| PAC-TASK-205 | `PAC-415` | `feature/PAC-415-task-205-validate-sellable-stock-when-updating-draft-order-q` | `story/PAC-102-us-63-validate-sellable-stock-khi-lap-don` |
| PAC-TASK-211 | `PAC-421` | `feature/PAC-421-task-211-show-pos-stock-validation-errors` | `story/PAC-102-us-63-validate-sellable-stock-khi-lap-don` |

### Story completion gate

- Mọi Task branch trong bảng đã được checkout từ remote branch có sẵn; không tạo branch mới.
- Mỗi Task có commit mới mang đúng Jira Key của Task branch.
- Mỗi Task có PR và đã merge vào đúng Story branch.
- Chạy Story-level review bằng skills phù hợp sau khi tất cả Task đã merge.
- Nếu review phát hiện lỗi, sửa trực tiếp trên Story branch và commit bằng Jira Key `PAC-102`, ví dụ: `PAC-102 US-63: fix story integration issues`.
- Story tests, integration verification và manual verification phù hợp đều đạt.
- Story PR đã merge vào exact Epic branch `epic/PAC-8-epic-08-pos-draft-order`.
- Evidence đã cập nhật trong `sprint-4-progress.md` và `sprint-4-audit.md`.

## US-64 — Hỗ trợ walk-in/anonymous customer

- **Jira Key Story:** `PAC-103`
- **Story branch bắt buộc đã tồn tại:** `story/PAC-103-us-64-ho-tro-walk-in-anonymous-customer`
- **Story PR target:** `epic/PAC-8-epic-08-pos-draft-order`
- **Mục tiêu:** Hỗ trợ walk-in/anonymous customer mà không triển khai Full Customer Management.

| Task | Jira Key | Exact Task Branch đã tồn tại | PR target bắt buộc |
|---|---|---|---|
| PAC-TASK-212 | `PAC-422` | `feature/PAC-422-task-212-implement-walk-in-customer-support-in-order-model` | `story/PAC-103-us-64-ho-tro-walk-in-anonymous-customer` |
| PAC-TASK-213 | `PAC-423` | `feature/PAC-423-task-213-display-walk-in-customer-option-in-pos` | `story/PAC-103-us-64-ho-tro-walk-in-anonymous-customer` |
| PAC-TASK-214 | `PAC-424` | `feature/PAC-424-task-214-keep-full-customer-management-out-of-mvp-pos-flow` | `story/PAC-103-us-64-ho-tro-walk-in-anonymous-customer` |

### Story completion gate

- Mọi Task branch trong bảng đã được checkout từ remote branch có sẵn; không tạo branch mới.
- Mỗi Task có commit mới mang đúng Jira Key của Task branch.
- Mỗi Task có PR và đã merge vào đúng Story branch.
- Chạy Story-level review bằng skills phù hợp sau khi tất cả Task đã merge.
- Nếu review phát hiện lỗi, sửa trực tiếp trên Story branch và commit bằng Jira Key `PAC-103`, ví dụ: `PAC-103 US-64: fix story integration issues`.
- Story tests, integration verification và manual verification phù hợp đều đạt.
- Story PR đã merge vào exact Epic branch `epic/PAC-8-epic-08-pos-draft-order`.
- Evidence đã cập nhật trong `sprint-4-progress.md` và `sprint-4-audit.md`.

## US-65 — Staff chỉ xem đơn trong ownership scope

- **Jira Key Story:** `PAC-104`
- **Story branch bắt buộc đã tồn tại:** `story/PAC-104-us-65-staff-chi-xem-don-trong-ownership-scope`
- **Story PR target:** `epic/PAC-8-epic-08-pos-draft-order`
- **Mục tiêu:** Enforce Staff ownership cho list/detail/order actions.

| Task | Jira Key | Exact Task Branch đã tồn tại | PR target bắt buộc |
|---|---|---|---|
| PAC-TASK-215 | `PAC-425` | `feature/PAC-425-task-215-apply-staff-ownership-scope-to-order-list-api` | `story/PAC-104-us-65-staff-chi-xem-don-trong-ownership-scope` |
| PAC-TASK-216 | `PAC-426` | `feature/PAC-426-task-216-build-staff-scoped-order-list-ui` | `story/PAC-104-us-65-staff-chi-xem-don-trong-ownership-scope` |
| PAC-TASK-224 | `PAC-434` | `feature/PAC-434-task-224-build-order-detail-screen-for-draft-paid-cancelled` | `story/PAC-104-us-65-staff-chi-xem-don-trong-ownership-scope` |

### Story completion gate

- Mọi Task branch trong bảng đã được checkout từ remote branch có sẵn; không tạo branch mới.
- Mỗi Task có commit mới mang đúng Jira Key của Task branch.
- Mỗi Task có PR và đã merge vào đúng Story branch.
- Chạy Story-level review bằng skills phù hợp sau khi tất cả Task đã merge.
- Nếu review phát hiện lỗi, sửa trực tiếp trên Story branch và commit bằng Jira Key `PAC-104`, ví dụ: `PAC-104 US-65: fix story integration issues`.
- Story tests, integration verification và manual verification phù hợp đều đạt.
- Story PR đã merge vào exact Epic branch `epic/PAC-8-epic-08-pos-draft-order`.
- Evidence đã cập nhật trong `sprint-4-progress.md` và `sprint-4-audit.md`.

## US-66 — Admin xem tất cả đơn hàng

- **Jira Key Story:** `PAC-105`
- **Story branch bắt buộc đã tồn tại:** `story/PAC-105-us-66-admin-xem-tat-ca-don-hang`
- **Story PR target:** `epic/PAC-8-epic-08-pos-draft-order`
- **Mục tiêu:** Cho Admin xem toàn bộ orders theo permission.

| Task | Jira Key | Exact Task Branch đã tồn tại | PR target bắt buộc |
|---|---|---|---|
| PAC-TASK-217 | `PAC-427` | `feature/PAC-427-task-217-implement-admin-all-orders-list-api` | `story/PAC-105-us-66-admin-xem-tat-ca-don-hang` |
| PAC-TASK-218 | `PAC-428` | `feature/PAC-428-task-218-build-admin-all-orders-ui` | `story/PAC-105-us-66-admin-xem-tat-ca-don-hang` |

### Story completion gate

- Mọi Task branch trong bảng đã được checkout từ remote branch có sẵn; không tạo branch mới.
- Mỗi Task có commit mới mang đúng Jira Key của Task branch.
- Mỗi Task có PR và đã merge vào đúng Story branch.
- Chạy Story-level review bằng skills phù hợp sau khi tất cả Task đã merge.
- Nếu review phát hiện lỗi, sửa trực tiếp trên Story branch và commit bằng Jira Key `PAC-105`, ví dụ: `PAC-105 US-66: fix story integration issues`.
- Story tests, integration verification và manual verification phù hợp đều đạt.
- Story PR đã merge vào exact Epic branch `epic/PAC-8-epic-08-pos-draft-order`.
- Evidence đã cập nhật trong `sprint-4-progress.md` và `sprint-4-audit.md`.

## US-67 — Hủy Draft Order

- **Jira Key Story:** `PAC-106`
- **Story branch bắt buộc đã tồn tại:** `story/PAC-106-us-67-huy-draft-order`
- **Story PR target:** `epic/PAC-8-epic-08-pos-draft-order`
- **Mục tiêu:** Chỉ cho cancel Draft Order đúng scope; reject PAID/CANCELLED.

| Task | Jira Key | Exact Task Branch đã tồn tại | PR target bắt buộc |
|---|---|---|---|
| PAC-TASK-219 | `PAC-429` | `feature/PAC-429-task-219-implement-cancel-draft-order-api` | `story/PAC-106-us-67-huy-draft-order` |
| PAC-TASK-220 | `PAC-430` | `feature/PAC-430-task-220-build-cancel-draft-order-ui` | `story/PAC-106-us-67-huy-draft-order` |
| PAC-TASK-221 | `PAC-431` | `feature/PAC-431-task-221-prevent-cancel-paid-or-already-cancelled-order` | `story/PAC-106-us-67-huy-draft-order` |

### Story completion gate

- Mọi Task branch trong bảng đã được checkout từ remote branch có sẵn; không tạo branch mới.
- Mỗi Task có commit mới mang đúng Jira Key của Task branch.
- Mỗi Task có PR và đã merge vào đúng Story branch.
- Chạy Story-level review bằng skills phù hợp sau khi tất cả Task đã merge.
- Nếu review phát hiện lỗi, sửa trực tiếp trên Story branch và commit bằng Jira Key `PAC-106`, ví dụ: `PAC-106 US-67: fix story integration issues`.
- Story tests, integration verification và manual verification phù hợp đều đạt.
- Story PR đã merge vào exact Epic branch `epic/PAC-8-epic-08-pos-draft-order`.
- Evidence đã cập nhật trong `sprint-4-progress.md` và `sprint-4-audit.md`.

## US-68 — Giữ Draft Order khi checkout fail

- **Jira Key Story:** `PAC-107`
- **Story branch bắt buộc đã tồn tại:** `story/PAC-107-us-68-giu-draft-order-khi-checkout-fail`
- **Story PR target:** `epic/PAC-8-epic-08-pos-draft-order`
- **Mục tiêu:** Giữ nguyên Draft Order, items và total khi checkout fail; không trừ stock hay tạo payment/invoice.

| Task | Jira Key | Exact Task Branch đã tồn tại | PR target bắt buộc |
|---|---|---|---|
| PAC-TASK-222 | `PAC-432` | `feature/PAC-432-task-222-preserve-draft-order-after-checkout-failure-in-ui` | `story/PAC-107-us-68-giu-draft-order-khi-checkout-fail` |
| PAC-TASK-223 | `PAC-433` | `feature/PAC-433-task-223-restore-checkout-error-state-back-to-draft-order` | `story/PAC-107-us-68-giu-draft-order-khi-checkout-fail` |
| PAC-TASK-226 | `PAC-436` | `test/PAC-436-task-226-add-pos-frontend-smoke-test-checklist` | `story/PAC-107-us-68-giu-draft-order-khi-checkout-fail` |

### Story completion gate

- Mọi Task branch trong bảng đã được checkout từ remote branch có sẵn; không tạo branch mới.
- Mỗi Task có commit mới mang đúng Jira Key của Task branch.
- Mỗi Task có PR và đã merge vào đúng Story branch.
- Chạy Story-level review bằng skills phù hợp sau khi tất cả Task đã merge.
- Nếu review phát hiện lỗi, sửa trực tiếp trên Story branch và commit bằng Jira Key `PAC-107`, ví dụ: `PAC-107 US-68: fix story integration issues`.
- Story tests, integration verification và manual verification phù hợp đều đạt.
- Story PR đã merge vào exact Epic branch `epic/PAC-8-epic-08-pos-draft-order`.
- Evidence đã cập nhật trong `sprint-4-progress.md` và `sprint-4-audit.md`.


# XI. Thứ tự triển khai

## Inventory Adjustment

1. US-49
2. US-50
3. US-51
4. US-52
5. US-53
6. US-54
7. US-55
8. US-56
9. Cross-sprint TASK-185 theo US-38/EPIC-05

## POS Draft Order

1. US-57
2. US-58
3. US-59
4. US-60
5. US-61
6. US-62
7. US-63
8. US-64
9. US-65
10. US-66
11. US-67
12. US-68

Chỉ chuyển sang User Story tiếp theo sau khi User Story hiện tại đã:

- Hoàn thành toàn bộ Task.
- Tất cả Task PR đã merge vào Story.
- Story review bằng skills đã hoàn tất.
- Story fixes, nếu có, đã commit đúng Jira Key Story.
- Story PR đã merge vào Epic.

Chỉ chuyển sang Epic khác sau khi Epic hiện tại đã:

- Hoàn thành toàn bộ Story.
- Epic review bằng skills đã hoàn tất.
- Epic fixes, nếu có, đã commit đúng Jira Key Epic.
- Epic PR đã merge vào `develop`.

---

# XII. GitHub Workflow bắt buộc

```text
Existing Task branch
→ commit + push
→ PR + merge vào exact Story branch
→ Story review
→ Story-level fix commit nếu cần
→ PR + merge vào exact Epic branch
→ Epic review
→ Epic-level fix commit nếu cần
→ PR + merge vào develop
```

## Không tạo branch

Cấm:

```bash
git checkout -b ...
git switch -c ...
git push origin <new-branch-name>
```

Không tạo Wave branch, fix branch, review branch hoặc temporary branch.

Nếu cần sửa sau Story review, sửa trực tiếp trên Story branch có sẵn.

Nếu cần sửa sau Epic review, sửa trực tiếp trên Epic branch có sẵn.

## Đồng bộ parent trước khi code

Vì branch đã được tạo trước, branch có thể cũ hơn parent hiện tại.

Trước khi code Task:

```bash
git fetch origin
git switch <EXACT_TASK_BRANCH>
git pull origin <EXACT_TASK_BRANCH>

git merge --ff-only origin/<EXACT_STORY_BRANCH>
```

Nếu `--ff-only` không thể thực hiện do branch đã diverge, không rebase/force-push tự ý. Dùng merge commit có Jira Key của Task:

```bash
git merge --no-ff origin/<EXACT_STORY_BRANCH>   -m "<TASK_JIRA_KEY> TASK-xxx: sync parent story branch"
```

Mọi merge commit mới do AI tạo trên Task branch phải chứa Jira Key Task.

Trước Story review:

```bash
git switch <EXACT_STORY_BRANCH>
git pull origin <EXACT_STORY_BRANCH>
```

Trước Epic review:

```bash
git switch <EXACT_EPIC_BRANCH>
git pull origin <EXACT_EPIC_BRANCH>
```

## Commit message

### Commit trên Task branch

```text
<TASK_JIRA_KEY> TASK-xxx: <short English message>
```

Ví dụ:

```text
PAC-371 TASK-161: add inventory adjustment Prisma model
PAC-401 TASK-191: align order model with MVP draft flow
```

### Commit sửa lỗi sau Story review

```text
<STORY_JIRA_KEY> US-xx: <short English fix message>
```

Ví dụ:

```text
PAC-88 US-49: fix inventory adjustment draft integration
PAC-96 US-57: fix POS draft order integration
```

### Commit sửa lỗi sau Epic review

```text
<EPIC_JIRA_KEY> EPIC-xx: <short English fix message>
```

Ví dụ:

```text
PAC-7 EPIC-07: fix inventory adjustment regression
PAC-8 EPIC-08: fix POS draft order regression
```

### Quy tắc commit

- Jira Key trong message phải đúng với current issue branch.
- Không dùng Task Jira Key trên Story branch.
- Không dùng Story Jira Key trên Epic branch.
- Không dùng Epic Jira Key trên `develop`.
- Commit phải mô tả thay đổi thật.
- Không tạo empty/fake commit chỉ để đủ evidence.
- Không mention AI, agent, prompt hoặc automation.
- Không commit `.env`, secret, token, credentials hoặc build output.
- Existing inherited commits từ parent branch có thể mang Jira Key khác; quy tắc áp dụng cho commit mới do AI tạo trực tiếp.

## PR title

### Task PR

```text
<TASK_JIRA_KEY> TASK-xxx: <summary>
```

### Story PR

```text
<STORY_JIRA_KEY> US-xx: <summary>
```

### Epic PR

```text
<EPIC_JIRA_KEY> EPIC-xx: <summary>
```

PR description phải có:

- Issue/Jira Key.
- Source exact branch.
- Target exact branch.
- Related Task/Story/Epic.
- Scope.
- What changed.
- Acceptance Criteria.
- How tested.
- Test results.
- Migration risk.
- Security/permission risk.
- Rollback notes.
- Screenshots nếu có UI.
- Known issues.

## Merge rules

AI được merge:

- Task → Story.
- Story → Epic.
- Epic → `develop`.

Chỉ merge khi:

- PR head/base đúng.
- Checks pass.
- Review hoàn tất.
- Không còn Blocker.
- Evidence đã ghi nhận.

Không dùng `--delete-branch`; giữ branch làm evidence.

AI không được merge:

- Task → Epic/develop/main.
- Story → develop/main.
- Epic → main.
- develop → main.

---

# XIII. Quy trình chi tiết cho từng Task

## 1. Xác định issue và branch

Tra `branch-on-jira.md`:

```text
Logical Task:
Jira Key:
Exact Task Branch:
Linked Story:
Exact Story Branch:
Parent Epic:
Exact Epic Branch:
```

Xác minh remote branch tồn tại. Không tự dựng branch name.

## 2. Checkout existing Task branch

```bash
git fetch origin
git switch <EXACT_TASK_BRANCH>
git pull origin <EXACT_TASK_BRANCH>
```

Nếu local chưa có, track remote branch đã tồn tại:

```bash
git switch --track origin/<EXACT_TASK_BRANCH>
```

## 3. Sync Story parent

Fast-forward nếu được; nếu cần merge commit, message phải có Jira Key Task.

## 4. Lập implementation plan

```text
Task:
Jira Key:
Exact Task Branch:
Target Story Branch:
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

## 5. Implement và TDD

1. Viết/chạy test fail khi phù hợp.
2. Implement tối thiểu.
3. Chạy test pass.
4. Refactor.
5. Chạy regression test.
6. Kiểm tra không lấn scope.

## 6. Diff review

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
- Không silent catch.
- Không `any` không cần thiết.
- Không direct MedicineBatch quantity update.
- Không Draft Order inventory deduction.
- Không thay đổi ngoài Task.

## 7. Test

Chỉ chạy scripts thực sự tồn tại.

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

Script không tồn tại phải ghi:

```text
N/A — script chưa được cấu hình
```

Không bịa Pass.

## 8. Commit đúng Jira Key Task

```bash
git add <files>
git commit -m "<TASK_JIRA_KEY> TASK-xxx: <short English message>"
git push origin <EXACT_TASK_BRANCH>
```

Trước commit, xác minh:

```bash
git branch --show-current
```

Jira Key trong commit phải khớp branch hiện tại.

## 9. PR Task → Story

```bash
gh pr create   --head "<EXACT_TASK_BRANCH>"   --base "<EXACT_STORY_BRANCH>"   --title "<TASK_JIRA_KEY> TASK-xxx: <summary>"   --body-file <TASK_PR_BODY_FILE>
```

Xác minh PR:

- Head đúng Task branch.
- Base đúng Story branch.
- Checks pass.
- Có commit thật.
- Không Closed Unmerged.

Sau review:

```bash
gh pr merge <PR_NUMBER> --merge
```

Không xóa branch.

## 10. Cập nhật Story branch và evidence

```bash
git switch <EXACT_STORY_BRANCH>
git pull origin <EXACT_STORY_BRANCH>
```

Cập nhật:

- Task checkbox.
- Exact branch.
- Commit SHA.
- PR number/URL.
- Merge timestamp/status.
- Test evidence.
- Known issue.
- Next action.

Sau đó chuyển sang exact Task branch kế tiếp của cùng Story.

---

# XIV. Hoàn thành một User Story

Sau khi tất cả Task của Story đã PR + merge vào Story branch:

1. Checkout exact Story branch.
2. Pull mới nhất.
3. Chọn Story review skills phù hợp.
4. Chạy integration review và regression tests.
5. Chạy manual verification phù hợp.
6. Kiểm tra Acceptance Criteria của Story.
7. Kiểm tra Task changes tương thích với nhau.
8. Kiểm tra permission, migration, error states và out-of-scope.

## Nếu Story review phát hiện lỗi

Không tạo fix branch.

Sửa trực tiếp trên exact Story branch.

Commit bằng Jira Key Story:

```bash
git add <files>
git commit -m "<STORY_JIRA_KEY> US-xx: fix <story issue>"
git push origin <EXACT_STORY_BRANCH>
```

Mọi commit sửa ở cấp Story phải dùng Jira Key Story.

Chạy lại tests sau fix.

## PR Story → Epic

```bash
gh pr create   --head "<EXACT_STORY_BRANCH>"   --base "<EXACT_EPIC_BRANCH>"   --title "<STORY_JIRA_KEY> US-xx: complete <story summary>"   --body-file <STORY_PR_BODY_FILE>
```

Chỉ merge khi checks pass:

```bash
gh pr merge <PR_NUMBER> --merge
```

Không xóa Story branch.

Cập nhật `sprint-4-progress.md` và `sprint-4-audit.md`.

Sau khi Story merge xong mới chuyển sang Task đầu tiên của Story tiếp theo.

---

# XV. Hoàn thành một Epic

Sau khi tất cả Story của Epic đã PR + merge vào Epic branch:

1. Checkout exact Epic branch.
2. Pull mới nhất.
3. Chọn Epic review skills.
4. Chạy full Epic integration review.
5. Chạy Prisma validate/generate nếu liên quan.
6. Chạy backend/frontend lint, tests và build.
7. Chạy manual test toàn Epic.
8. Kiểm tra security, permission, transaction và regression.
9. Kiểm tra tất cả Story PR đã merge đúng Epic branch.

## Nếu Epic review phát hiện lỗi

Không tạo fix branch.

Sửa trực tiếp trên exact Epic branch.

Commit bằng Jira Key Epic:

```bash
git add <files>
git commit -m "<EPIC_JIRA_KEY> EPIC-xx: fix <epic issue>"
git push origin <EXACT_EPIC_BRANCH>
```

Mọi commit sửa ở cấp Epic phải dùng Jira Key Epic.

Chạy lại full verification.

## PR Epic → develop

```bash
gh pr create   --head "<EXACT_EPIC_BRANCH>"   --base "develop"   --title "<EPIC_JIRA_KEY> EPIC-xx: complete <epic summary>"   --body-file <EPIC_PR_BODY_FILE>
```

Chỉ merge khi checks pass:

```bash
gh pr merge <PR_NUMBER> --merge
```

Không xóa Epic branch.

Sau merge:

```bash
git switch develop
git pull origin develop
```

Xác minh Epic changes đã tồn tại trong `develop`.

Sau đó mới chuyển sang Epic tiếp theo.

Exact primary Epic branches:

```text
epic/PAC-7-epic-07-inventory-adjustment
epic/PAC-8-epic-08-pos-draft-order
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
- Full rollback.
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
- Duplicate medicine item rule.
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

- Exact pre-created Task branch được dùng.
- Không tạo branch mới.
- Scope và Acceptance Criteria đạt.
- Test/build phù hợp pass.
- Commit mới có đúng Jira Key Task.
- Push lên exact Task branch.
- PR head Task/base Story đúng.
- Task PR đã merge vào Story.
- Evidence đã cập nhật.

## User Story Done

- Tất cả Task Done.
- Tất cả Task PR đã merge vào Story.
- Story review bằng skills hoàn tất.
- Nếu có Story fix, commit dùng đúng Jira Key Story.
- Integration/manual tests pass.
- Story PR đã merge vào exact Epic branch.
- Evidence đã cập nhật.

## Epic Done

- Tất cả Story Done.
- Tất cả Story PR đã merge vào Epic.
- Epic review bằng skills hoàn tất.
- Nếu có Epic fix, commit dùng đúng Jira Key Epic.
- Full Epic tests/build/manual verification pass.
- Epic PR đã merge vào `develop`.
- `develop` chứa Epic changes.
- Evidence đã cập nhật.

## Sprint Done

- 66/66 Task hoàn thành.
- 20/20 primary Story hoàn thành.
- PAC-TASK-185 hoàn thành đúng US-38/EPIC-05.
- PAC-EPIC-07 hoàn thành và merge vào develop.
- PAC-EPIC-08 hoàn thành và merge vào develop.
- Cross-sprint EPIC-05 delta đã merge vào develop.
- Không branch mới nào được tạo.
- Tất cả commit mới có Jira Key đúng issue branch.
- Tất cả PR/merge hierarchy đúng.
- Automated và manual verification pass.
- `Ready for Sprint 5 = Yes`.
- PR `develop → main` đã tạo nhưng chưa được AI merge.

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

---

# XIX. Final Sprint 4 Verification

Sau khi các Epic đã merge vào develop:

```bash
git switch develop
git pull origin develop
```

Chạy scripts có thật:

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

Xác minh:

- 66 Task có exact branch, commit, PR và merge evidence.
- 20 primary Story có exact branch, review, PR và merge evidence.
- EPIC-07 và EPIC-08 có review, PR và merge evidence.
- TASK-185 đúng US-38/EPIC-05.
- Không có branch mới.
- Không có commit message dùng sai Jira Key.
- Không direct quantity update.
- Adjustment transaction/rollback đúng.
- Không quantity âm.
- Draft Order không trừ inventory.
- Ownership/permission đúng.
- No discount/coupon.
- Checkout failure giữ Draft.
- Không lấn Sprint 5/6.
- Không secret.
- Audit/progress/WORKING-CONTEXT được cập nhật.

Chỉ khi toàn bộ đạt:

```text
Ready for Sprint 5 = Yes
```

---

# XX. develop → main

Sau khi Sprint 4 hoàn thành:

1. Tạo PR `develop → main`.
2. Điền description và evidence đầy đủ.
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

# XXI. Cập nhật tài liệu và báo cáo cuối

Cập nhật liên tục:

```text
work-context/sprint-4/sprint-4-audit.md
work-context/sprint-4/sprint-4-progress.md
WORKING-CONTEXT.md
```

Báo cáo cuối phải có:

1. Sprint 3 Gate.
2. Branch inventory verification.
3. Số branch mới được tạo: phải bằng 0.
4. PAC-EPIC-07 status.
5. PAC-EPIC-08 status.
6. US-49 → US-68 status.
7. PAC-TASK-161 → PAC-TASK-226 status.
8. PAC-TASK-185 parent và merge path.
9. Skills đã dùng cho Task, Story review, Epic review.
10. Exact branches.
11. Commit SHA và commit message.
12. Task PRs → Story.
13. Story PRs → Epic.
14. Epic PRs → develop.
15. Test results.
16. Manual UI results.
17. Prisma migrations.
18. Permission/ownership findings.
19. Known issues.
20. Deferred work.
21. Ready for Sprint 5.
22. Link PR `develop → main` đang chờ người dùng phê duyệt.

---

# XXII. Lệnh bắt đầu

Thực hiện đúng thứ tự:

1. Đọc rules và tài liệu.
2. Kiểm tra Git/GitHub.
3. Xác minh Sprint 3 Gate.
4. Đọc exact branch names từ `branch-on-jira.md`.
5. Xác minh toàn bộ remote branches đã tồn tại.
6. Audit 66 Task.
7. Cập nhật audit/progress.
8. Lập implementation plan theo Task.
9. Checkout exact Task branch đã tồn tại.
10. Implement, test, commit đúng Task Jira Key và push.
11. PR + merge Task → Story.
12. Lặp đến hết Task của Story.
13. Review Story bằng skills.
14. Nếu cần, commit fix đúng Story Jira Key.
15. PR + merge Story → Epic.
16. Lặp đến hết Story của Epic.
17. Review Epic bằng skills.
18. Nếu cần, commit fix đúng Epic Jira Key.
19. PR + merge Epic → develop.
20. Lặp đến hết Sprint.
21. Final verification.
22. Tạo PR develop → main nhưng không merge.

Không tạo thêm issue branch mới trong bất kỳ bước nào.
