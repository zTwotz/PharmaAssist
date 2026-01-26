# Sprint 3 Final Review Prompt — PharmaAssist AI Intelligence

> **Mục đích:** Kiểm duyệt độc lập toàn bộ Sprint 3 trước khi cho phép triển khai Sprint 4.
>
> **Đường dẫn đề xuất:** `work-context/sprint-3/sprint-3-final-review-prompt.md`
>
> Đây là vòng **Final Sprint Review / Quality Gate**. Không được tin trạng thái `Done` cũ nếu chưa có bằng chứng thực tế.

---

# I. Vai trò

Bạn là **AI Technical Reviewer, QA Reviewer và Release Gatekeeper** của dự án **PharmaAssist AI Intelligence**.

Nhiệm vụ của bạn là kiểm duyệt toàn bộ:

- `PAC-EPIC-05 — Inventory & MedicineBatch`
- `PAC-EPIC-06 — Stock Import`
- `US-27 → US-48`
- `PAC-TASK-102 → PAC-TASK-160`
- Database schema và Prisma migrations
- Backend API và transaction
- Frontend UI
- Authorization và permission
- Unit, integration, E2E và smoke tests
- Git branches
- Commits
- Pull Requests
- Merge hierarchy
- Jira mapping
- Audit/progress evidence

Mục tiêu cuối cùng là đưa ra đúng một quyết định:

```text
Ready for Sprint 4 = Yes
```

hoặc:

```text
Ready for Sprint 4 = No
```

Không được cho phép triển khai Sprint 4 nếu còn Blocker hoặc dependency chưa được xác minh.

---

# II. Chế độ làm việc

Vòng đầu tiên là **review-first / audit-only**.

Bạn phải:

1. Đọc tài liệu và repository.
2. Kiểm tra Git/GitHub.
3. Chạy test và build.
4. Manual verification nếu môi trường cho phép.
5. Đối chiếu từng Task.
6. Cập nhật audit/progress.
7. Lập remediation plan nếu có lỗi.
8. Đưa ra Final Gate Decision.

Trong vòng kiểm duyệt đầu tiên:

- Không sửa business code.
- Không tạo tính năng Sprint 4.
- Không tự đổi checkbox thành Done khi thiếu evidence.
- Không tạo workaround để che lỗi.
- Không tự merge `develop → main`.
- Không reset database thật.
- Không xóa branch làm mất evidence.

Nếu phát hiện lỗi, hoàn tất báo cáo kiểm duyệt và remediation plan trước. Chỉ sửa lỗi khi có chỉ thị triển khai remediation hoặc workflow hiện tại cho phép rõ ràng.

---

# III. Phạm vi kiểm duyệt

| Mục | Giá trị |
|---|---|
| Sprint | Sprint 3 |
| Tên Sprint | MedicineBatch, Inventory Summary & Stock Import |
| Epic nghiệp vụ | PAC-EPIC-05, PAC-EPIC-06 |
| Epic hỗ trợ | PAC-EPIC-19, PAC-EPIC-21 |
| Story range | US-27 → US-48 |
| Số User Story | 22 |
| Task range | PAC-TASK-102 → PAC-TASK-160 |
| Số Task | 59 |
| Sprint tiếp theo | Sprint 4 |
| Gate bắt buộc | Ready for Sprint 4 |

## Epic Jira Keys

- `PAC-EPIC-05` → `PAC-5`
- `PAC-EPIC-06` → `PAC-6`

---

# IV. Tài liệu bắt buộc phải đọc

Đọc trước khi kết luận:

1. `AGENTS.md`
2. `.agents/rules/rules-w-pharmaassist.md`
3. `WORKING-CONTEXT.md`
4. `DESIGN.md`
5. `work-context/sprint-2/sprint-2-progress.md`
6. `work-context/sprint-3/sprint-3.md`
7. `work-context/sprint-3/sprint-3-audit.md`
8. `work-context/sprint-3/sprint-3-progress.md`
9. `Jira/1_Components.md`
10. `Jira/2_Epic.md`
11. `Jira/3_Stories.md`
12. `Jira/4A_Task_MVP_Foundation_001_145.md`
13. `Jira/4A_Task_Description_MVP_Foundation_001_145.md`
14. `Jira/4B_Task_List_MVP_POS_Interaction_Checkout_146_290.md`
15. `Jira/4B_Task_Description_MVP_POS_Interaction_Checkout_146_290.md`
16. `Jira/5_Sprint.md`
17. `Jira/branch-on-jira.md`
18. `Jira/jira-mapping.md`
19. Tài liệu SRS, Roles & Permissions, Module Design, API, Database, Prisma, UI/UX và Testing liên quan.

Thứ tự ưu tiên:

1. `jira-mapping.md` quyết định Jira Key thật.
2. Task List quyết định Task → Story → Epic → Component.
3. Task Description quyết định nội dung Task.
4. `3_Stories.md` quyết định User Story.
5. `sprint-3.md` quyết định execution baseline Sprint 3.
6. `branch-on-jira.md` quyết định format Git nhưng không được tự tính Jira Key.

---

# V. Skills phải sử dụng

Không gọi skill máy móc. Chọn theo phần kiểm duyệt.

## Tổng thể Sprint

- `agent-skills-lifecycle`
- `karpathy-principles`
- `ecc-code-quality`
- `ecc-business-ops`

## Database/Prisma

- `ecc-database`
- `ecc-backend`
- `ecc-testing`

## Backend/API/Transaction

- `ecc-backend`
- `ecc-security`
- `ecc-testing`
- `mattpocock-engineering` khi debug lỗi phức tạp

## Frontend

- `modern-web-guidance`
- `ecc-frontend`
- `design-system-guide`
- `ecc-testing`

## Inventory safety

- `ecc-healthcare`
- `ecc-database`
- `ecc-backend`

## GitHub/CI

- `git-github`
- `ecc-devops`
- `ecc-business-ops`

## Tài liệu và traceability

- `mattpocock-productivity`
- `ecc-business-ops`

Trước khi audit, ghi:

```text
Selected Skills:
- <skill>: <lý do>
```

---

# VI. Kiểm tra Git ban đầu

Chạy:

```bash
git status

git checkout main
git pull origin main

git checkout develop
git pull origin develop

git status
git branch --show-current
git log --oneline --decorate -40
```

Sau đó kiểm tra:

- Workspace sạch hay không.
- `main` và `develop` mới nhất.
- Có commit chưa push hay không.
- Có branch Sprint 3 chưa merge hay không.
- Có PR Sprint 3 đang mở hay failed checks hay không.
- Hai Epic đã merge vào `develop` hay chưa.
- Có code Sprint 3 chỉ tồn tại trên branch nhưng chưa vào `develop` hay không.
- Có commit trực tiếp trái workflow lên `develop`/`main` hay không.
- Có `.env`, token, secret hoặc credentials trong Git history hay không.
- Branch evidence còn tồn tại hay không.

Không tự xóa hoặc ghi đè thay đổi chưa rõ nguồn gốc.

---

# VII. Trạng thái kiểm duyệt

Mỗi Task phải nhận một trạng thái:

- `Verified Done`
- `Partial`
- `Missing`
- `Conflict`
- `Failed Verification`
- `N/A`

Không dùng `Done` chung chung trong báo cáo kiểm duyệt.

## Quy tắc phân loại

### Verified Done

Chỉ dùng khi:

- Acceptance Criteria đạt.
- Code đúng baseline.
- Migration/constraint đúng nếu liên quan.
- Automated test phù hợp pass.
- Build phù hợp pass.
- Branch, commit và PR evidence đầy đủ.
- Task đã merge đúng hierarchy.
- Không còn lỗi trong phạm vi Task.

### Partial

Dùng khi đã có implementation nhưng thiếu:

- Test.
- Migration.
- Constraint.
- UI/API integration.
- Permission.
- PR/merge evidence.
- Acceptance Criteria.

### Missing

Chưa có implementation cần thiết.

### Conflict

Implementation trái baseline, ví dụ:

- Aggregate inventory làm source of truth.
- Direct quantity update.
- Merge batch khác expiry.
- Partial Stock Import confirm.
- Staff thấy dashboard kho tổng.
- Confirmed import vẫn sửa được.

### Failed Verification

Code tồn tại nhưng test/build/manual verification fail.

### N/A

Phải ghi lý do cụ thể.

---

# VIII. Baseline bắt buộc phải xác minh

## MedicineBatch và Inventory

1. MedicineBatch là inventory source of truth.
2. Không dùng aggregate inventory làm nguồn chính.
3. Batch number bắt buộc.
4. Batch number được normalize trước so sánh.
5. Expiry date bắt buộc.
6. Batch identity là:

```text
medicine_id + normalized_batch_number + expiry_date
```

7. Không public direct update `MedicineBatch.quantity`.
8. Sellable stock loại trừ:
   - expired batch;
   - inactive/invalid batch;
   - quantity <= 0.
9. Low-stock dùng sellable quantity.
10. Near-expiry tách biệt với expired.
11. Admin/Warehouse xem inventory dashboard.
12. Staff không xem dashboard kho tổng.
13. POS chỉ nhận sellable availability cần thiết.

## Stock Import

1. Stock Import bắt đầu ở Draft.
2. Draft cho phép thêm/sửa/xóa line.
3. Supplier phải active.
4. Batch number và expiry bắt buộc.
5. Confirm dùng database transaction.
6. Một line lỗi rollback toàn bộ.
7. Không có partial MedicineBatch update.
8. Merge chỉ khi medicine + normalized batch + expiry trùng.
9. Cùng medicine/batch nhưng expiry khác phải reject.
10. Lỗi expiry mismatch trả theo line.
11. Confirmed import immutable.
12. Duplicate confirm bị chặn.
13. Confirm ghi audit actor/time/import/batch effects.
14. UI confirmed là read-only.

## Authorization

1. Supabase Auth tiếp tục được dùng.
2. Backend AuthGuard.
3. Backend PermissionsGuard.
4. Admin/Warehouse được vận hành kho theo permission.
5. Staff không có quyền Stock Import.
6. Frontend guard không thay backend authorization.

---

# IX. PAC-EPIC-05 — Inventory & MedicineBatch

## Epic Gate

- [ ] Tất cả US-27 → US-38 được Verified Done.
- [ ] Tất cả Task PAC-TASK-102 → PAC-TASK-130 được Verified Done.
- [ ] Epic PR đã merge vào develop.
- [ ] Prisma schema/migration hợp lệ.
- [ ] Inventory APIs/UI hoạt động.
- [ ] Permission đúng.
- [ ] Không còn direct quantity update.
- [ ] Test/build pass.

## US-27 — Thiết kế MedicineBatch là source of truth

**Jira Key thật:** `PAC-66`

### Task phải kiểm duyệt

- `PAC-TASK-102` / `PAC-312` — Create medicine_batches Prisma model
- `PAC-TASK-103` / `PAC-313` — Add MedicineBatch indexes and constraints
- `PAC-TASK-104` / `PAC-314` — Remove aggregate inventory source-of-truth assumptions
- `PAC-TASK-105` / `PAC-315` — Document MedicineBatch as inventory source of truth

### Điều kiện xác minh

- [ ] Tồn kho được tính từ MedicineBatch.
- [ ] Không dùng aggregate inventory làm source of truth.
- [ ] Batch có medicine, batch number, expiry date và quantity.
- [ ] Các luồng import, adjustment, checkout đều cập nhật batch.
- [ ] Không có thay đổi ngoài phạm vi User Story.
- [ ] Task được xác minh từ code, migration, test và GitHub evidence.
- [ ] User Story PR đã merge đúng Epic branch.

### Kết luận User Story phải ghi

- Trạng thái: `Verified Done`, `Partial`, `Missing`, `Conflict`, `Failed Verification` hoặc `N/A`.
- Existing evidence.
- Missing evidence/work.
- Blocker/Major/Minor findings.
- Recommended remediation.

## US-28 — Batch number bắt buộc

**Jira Key thật:** `PAC-67`

### Task phải kiểm duyệt

- `PAC-TASK-106` / `PAC-316` — Enforce required batch_number
- `PAC-TASK-107` / `PAC-317` — Normalize batch_number before comparison
- `PAC-TASK-108` / `PAC-318` — Add UI validation for batch_number

### Điều kiện xác minh

- [ ] Không cho tạo batch thiếu batch number.
- [ ] Batch number được normalize khi so sánh.
- [ ] Lỗi validation rõ ràng.
- [ ] Stock Import cũng bắt buộc batch number.
- [ ] Không có thay đổi ngoài phạm vi User Story.
- [ ] Task được xác minh từ code, migration, test và GitHub evidence.
- [ ] User Story PR đã merge đúng Epic branch.

### Kết luận User Story phải ghi

- Trạng thái: `Verified Done`, `Partial`, `Missing`, `Conflict`, `Failed Verification` hoặc `N/A`.
- Existing evidence.
- Missing evidence/work.
- Blocker/Major/Minor findings.
- Recommended remediation.

## US-29 — Batch identity theo medicine + batch + expiry

**Jira Key thật:** `PAC-68`

### Task phải kiểm duyệt

- `PAC-TASK-109` / `PAC-319` — Implement batch identity validation service
- `PAC-TASK-110` / `PAC-320` — Add migration constraint for medicine/batch/expiry uniqueness
- `PAC-TASK-111` / `PAC-321` — Add batch identity unit tests

### Điều kiện xác minh

- [ ] Batch được nhận diện bằng medicine_id + normalized batch_number + expiry_date.
- [ ] Không tạo duplicate batch sai quy tắc.
- [ ] Import thêm chỉ merge khi cả 3 yếu tố trùng.
- [ ] Expiry mismatch bị reject.
- [ ] Không có thay đổi ngoài phạm vi User Story.
- [ ] Task được xác minh từ code, migration, test và GitHub evidence.
- [ ] User Story PR đã merge đúng Epic branch.

### Kết luận User Story phải ghi

- Trạng thái: `Verified Done`, `Partial`, `Missing`, `Conflict`, `Failed Verification` hoặc `N/A`.
- Existing evidence.
- Missing evidence/work.
- Blocker/Major/Minor findings.
- Recommended remediation.

## US-30 — Inventory Summary từ MedicineBatch

**Jira Key thật:** `PAC-69`

### Task phải kiểm duyệt

- `PAC-TASK-112` / `PAC-322` — Implement inventory summary query from MedicineBatch
- `PAC-TASK-113` / `PAC-323` — Build Inventory Summary screen
- `PAC-TASK-114` / `PAC-324` — Add search/filter to Inventory Summary

### Điều kiện xác minh

- [ ] Inventory Summary tính tổng từ MedicineBatch.
- [ ] Hiển thị sellable quantity.
- [ ] Không tính batch hết hạn vào sellable quantity.
- [ ] Có tìm kiếm/lọc cơ bản.
- [ ] Không có thay đổi ngoài phạm vi User Story.
- [ ] Task được xác minh từ code, migration, test và GitHub evidence.
- [ ] User Story PR đã merge đúng Epic branch.

### Kết luận User Story phải ghi

- Trạng thái: `Verified Done`, `Partial`, `Missing`, `Conflict`, `Failed Verification` hoặc `N/A`.
- Existing evidence.
- Missing evidence/work.
- Blocker/Major/Minor findings.
- Recommended remediation.

## US-31 — Batch Detail view

**Jira Key thật:** `PAC-70`

### Task phải kiểm duyệt

- `PAC-TASK-115` / `PAC-325` — Implement Batch Detail API
- `PAC-TASK-116` / `PAC-326` — Build Batch Detail screen
- `PAC-TASK-117` / `PAC-327` — Display expired/near-expiry/sellable batch status

### Điều kiện xác minh

- [ ] Hiển thị medicine, batch number, expiry date, quantity.
- [ ] Hiển thị trạng thái expired/near-expiry/sellable.
- [ ] Không cho sửa trực tiếp quantity.
- [ ] Có liên kết tới import/adjustment nếu cần.
- [ ] Không có thay đổi ngoài phạm vi User Story.
- [ ] Task được xác minh từ code, migration, test và GitHub evidence.
- [ ] User Story PR đã merge đúng Epic branch.

### Kết luận User Story phải ghi

- Trạng thái: `Verified Done`, `Partial`, `Missing`, `Conflict`, `Failed Verification` hoặc `N/A`.
- Existing evidence.
- Missing evidence/work.
- Blocker/Major/Minor findings.
- Recommended remediation.

## US-32 — Tính sellable quantity

**Jira Key thật:** `PAC-71`

### Task phải kiểm duyệt

- `PAC-TASK-118` / `PAC-328` — Implement sellable quantity calculation service
- `PAC-TASK-119` / `PAC-329` — Add tests for sellable quantity calculation

### Điều kiện xác minh

- [ ] Chỉ tính batch chưa hết hạn.
- [ ] Chỉ tính batch còn quantity.
- [ ] Sellable quantity dùng cho POS và report.
- [ ] Backend là nơi tính chính thức.
- [ ] Không có thay đổi ngoài phạm vi User Story.
- [ ] Task được xác minh từ code, migration, test và GitHub evidence.
- [ ] User Story PR đã merge đúng Epic branch.

### Kết luận User Story phải ghi

- Trạng thái: `Verified Done`, `Partial`, `Missing`, `Conflict`, `Failed Verification` hoặc `N/A`.
- Existing evidence.
- Missing evidence/work.
- Blocker/Major/Minor findings.
- Recommended remediation.

## US-33 — Loại trừ batch hết hạn khỏi sellable stock

**Jira Key thật:** `PAC-72`

### Task phải kiểm duyệt

- `PAC-TASK-120` / `PAC-330` — Exclude expired batches from sellable stock
- `PAC-TASK-121` / `PAC-331` — Add tests for expired batch exclusion

### Điều kiện xác minh

- [ ] Expired batch không được tính sellable.
- [ ] POS không được bán từ expired batch.
- [ ] FEFO không chọn expired batch.
- [ ] Inventory vẫn có thể hiển thị expired batch để quản lý.
- [ ] Không có thay đổi ngoài phạm vi User Story.
- [ ] Task được xác minh từ code, migration, test và GitHub evidence.
- [ ] User Story PR đã merge đúng Epic branch.

### Kết luận User Story phải ghi

- Trạng thái: `Verified Done`, `Partial`, `Missing`, `Conflict`, `Failed Verification` hoặc `N/A`.
- Existing evidence.
- Missing evidence/work.
- Blocker/Major/Minor findings.
- Recommended remediation.

## US-34 — Low-stock dựa trên sellable quantity

**Jira Key thật:** `PAC-73`

### Task phải kiểm duyệt

- `PAC-TASK-122` / `PAC-332` — Implement low-stock calculation from sellable quantity
- `PAC-TASK-123` / `PAC-333` — Display low-stock state for Admin/Warehouse
- `PAC-TASK-124` / `PAC-334` — Hide general low-stock dashboard from Staff

### Điều kiện xác minh

- [ ] Low-stock tính từ sellable quantity.
- [ ] Không tính batch hết hạn.
- [ ] Admin/Warehouse thấy cảnh báo.
- [ ] Staff không thấy dashboard vận hành tổng quát, chỉ thấy cảnh báo liên quan POS.
- [ ] Không có thay đổi ngoài phạm vi User Story.
- [ ] Task được xác minh từ code, migration, test và GitHub evidence.
- [ ] User Story PR đã merge đúng Epic branch.

### Kết luận User Story phải ghi

- Trạng thái: `Verified Done`, `Partial`, `Missing`, `Conflict`, `Failed Verification` hoặc `N/A`.
- Existing evidence.
- Missing evidence/work.
- Blocker/Major/Minor findings.
- Recommended remediation.

## US-35 — Near-expiry theo threshold cấu hình

**Jira Key thật:** `PAC-74`

### Task phải kiểm duyệt

- `PAC-TASK-125` / `PAC-335` — Implement near-expiry calculation with threshold
- `PAC-TASK-126` / `PAC-336` — Display near-expiry batch state

### Điều kiện xác minh

- [ ] Default threshold là 90 ngày.
- [ ] Admin có thể cấu hình threshold trong System Settings MVP.
- [ ] Near-expiry tính theo batch.
- [ ] Report/filter có thể dùng override nếu được scope.
- [ ] Không có thay đổi ngoài phạm vi User Story.
- [ ] Task được xác minh từ code, migration, test và GitHub evidence.
- [ ] User Story PR đã merge đúng Epic branch.

### Kết luận User Story phải ghi

- Trạng thái: `Verified Done`, `Partial`, `Missing`, `Conflict`, `Failed Verification` hoặc `N/A`.
- Existing evidence.
- Missing evidence/work.
- Blocker/Major/Minor findings.
- Recommended remediation.

## US-36 — Inventory dashboard cho Admin/Warehouse

**Jira Key thật:** `PAC-75`

### Task phải kiểm duyệt

- `PAC-TASK-127` / `PAC-337` — Build Admin/Warehouse inventory dashboard cards

### Điều kiện xác minh

- [ ] Admin/Warehouse thấy low-stock và near-expiry.
- [ ] Staff không thấy dashboard vận hành tổng quát.
- [ ] Dữ liệu lấy từ MedicineBatch.
- [ ] Có trạng thái loading/empty/error.
- [ ] Không có thay đổi ngoài phạm vi User Story.
- [ ] Task được xác minh từ code, migration, test và GitHub evidence.
- [ ] User Story PR đã merge đúng Epic branch.

### Kết luận User Story phải ghi

- Trạng thái: `Verified Done`, `Partial`, `Missing`, `Conflict`, `Failed Verification` hoặc `N/A`.
- Existing evidence.
- Missing evidence/work.
- Blocker/Major/Minor findings.
- Recommended remediation.

## US-37 — POS chỉ xem sellable stock cần bán

**Jira Key thật:** `PAC-76`

### Task phải kiểm duyệt

- `PAC-TASK-128` / `PAC-338` — Build POS sellable stock display

### Điều kiện xác minh

- [ ] POS hiển thị availability bán được.
- [ ] Không hiển thị dashboard vận hành rộng cho Staff.
- [ ] Không cho bán quá sellable quantity.
- [ ] UI cập nhật khi số lượng draft thay đổi.
- [ ] Không có thay đổi ngoài phạm vi User Story.
- [ ] Task được xác minh từ code, migration, test và GitHub evidence.
- [ ] User Story PR đã merge đúng Epic branch.

### Kết luận User Story phải ghi

- Trạng thái: `Verified Done`, `Partial`, `Missing`, `Conflict`, `Failed Verification` hoặc `N/A`.
- Existing evidence.
- Missing evidence/work.
- Blocker/Major/Minor findings.
- Recommended remediation.

## US-38 — Chặn sửa trực tiếp quantity trong Batch Detail

**Jira Key thật:** `PAC-77`

### Task phải kiểm duyệt

- `PAC-TASK-129` / `PAC-339` — Remove direct quantity edit from Batch Detail UI
- `PAC-TASK-130` / `PAC-340` — Ensure no public API directly edits batch quantity

### Điều kiện xác minh

- [ ] Batch Detail không có input sửa quantity trực tiếp.
- [ ] Muốn điều chỉnh phải tạo Inventory Adjustment.
- [ ] Backend cũng không có endpoint public sửa trực tiếp quantity.
- [ ] Ghi chú guardrail rõ trong UI/task.
- [ ] Không có thay đổi ngoài phạm vi User Story.
- [ ] Task được xác minh từ code, migration, test và GitHub evidence.
- [ ] User Story PR đã merge đúng Epic branch.

### Kết luận User Story phải ghi

- Trạng thái: `Verified Done`, `Partial`, `Missing`, `Conflict`, `Failed Verification` hoặc `N/A`.
- Existing evidence.
- Missing evidence/work.
- Blocker/Major/Minor findings.
- Recommended remediation.

# X. PAC-EPIC-06 — Stock Import

## Epic Gate

- [ ] Tất cả US-39 → US-48 được Verified Done.
- [ ] Tất cả Task PAC-TASK-131 → PAC-TASK-160 được Verified Done.
- [ ] Epic PR đã merge vào develop.
- [ ] Confirm transaction/rollback đúng.
- [ ] Merge/reject batch đúng.
- [ ] Confirmed immutability đúng.
- [ ] Audit log đúng.
- [ ] Test/build pass.

## US-39 — Tạo phiếu nhập kho draft

**Jira Key thật:** `PAC-78`

### Task phải kiểm duyệt

- `PAC-TASK-131` / `PAC-341` — Create stock_imports Prisma model
- `PAC-TASK-132` / `PAC-342` — Implement create Stock Import draft API
- `PAC-TASK-133` / `PAC-343` — Build create Stock Import screen

### Điều kiện xác minh

- [ ] Warehouse/Admin có thể tạo draft.
- [ ] Draft lưu supplier, ngày nhập, ghi chú nếu có.
- [ ] Draft chưa làm thay đổi MedicineBatch.
- [ ] Có thể thêm dòng nhập sau khi tạo.
- [ ] Không có thay đổi ngoài phạm vi User Story.
- [ ] Task được xác minh từ code, migration, test và GitHub evidence.
- [ ] User Story PR đã merge đúng Epic branch.

### Kết luận User Story phải ghi

- Trạng thái: `Verified Done`, `Partial`, `Missing`, `Conflict`, `Failed Verification` hoặc `N/A`.
- Existing evidence.
- Missing evidence/work.
- Blocker/Major/Minor findings.
- Recommended remediation.

## US-40 — Thêm dòng thuốc vào phiếu nhập

**Jira Key thật:** `PAC-79`

### Task phải kiểm duyệt

- `PAC-TASK-134` / `PAC-344` — Create stock_import_lines Prisma model
- `PAC-TASK-135` / `PAC-345` — Implement add stock import line API
- `PAC-TASK-136` / `PAC-346` — Build stock import line editor UI

### Điều kiện xác minh

- [ ] Mỗi dòng có medicine, batch number, expiry date, quantity.
- [ ] Quantity phải lớn hơn 0.
- [ ] Medicine phải active.
- [ ] Lỗi validation hiển thị rõ.
- [ ] Không có thay đổi ngoài phạm vi User Story.
- [ ] Task được xác minh từ code, migration, test và GitHub evidence.
- [ ] User Story PR đã merge đúng Epic branch.

### Kết luận User Story phải ghi

- Trạng thái: `Verified Done`, `Partial`, `Missing`, `Conflict`, `Failed Verification` hoặc `N/A`.
- Existing evidence.
- Missing evidence/work.
- Blocker/Major/Minor findings.
- Recommended remediation.

## US-41 — Cập nhật/xóa dòng nhập khi còn draft

**Jira Key thật:** `PAC-80`

### Task phải kiểm duyệt

- `PAC-TASK-137` / `PAC-347` — Implement update draft import line API
- `PAC-TASK-138` / `PAC-348` — Implement delete draft import line API
- `PAC-TASK-139` / `PAC-349` — Disable edit/delete for confirmed import lines

### Điều kiện xác minh

- [ ] Draft line có thể update/delete.
- [ ] Confirmed import không được sửa.
- [ ] UI phân biệt trạng thái draft/confirmed.
- [ ] Backend enforce trạng thái.
- [ ] Không có thay đổi ngoài phạm vi User Story.
- [ ] Task được xác minh từ code, migration, test và GitHub evidence.
- [ ] User Story PR đã merge đúng Epic branch.

### Kết luận User Story phải ghi

- Trạng thái: `Verified Done`, `Partial`, `Missing`, `Conflict`, `Failed Verification` hoặc `N/A`.
- Existing evidence.
- Missing evidence/work.
- Blocker/Major/Minor findings.
- Recommended remediation.

## US-42 — Validate supplier trong phiếu nhập

**Jira Key thật:** `PAC-81`

### Task phải kiểm duyệt

- `PAC-TASK-140` / `PAC-350` — Validate active supplier before confirm import

### Điều kiện xác minh

- [ ] Supplier phải tồn tại và active.
- [ ] Supplier hiển thị trong detail phiếu nhập.
- [ ] Nếu supplier inactive thì không cho confirm.
- [ ] Error message rõ ràng.
- [ ] Không có thay đổi ngoài phạm vi User Story.
- [ ] Task được xác minh từ code, migration, test và GitHub evidence.
- [ ] User Story PR đã merge đúng Epic branch.

### Kết luận User Story phải ghi

- Trạng thái: `Verified Done`, `Partial`, `Missing`, `Conflict`, `Failed Verification` hoặc `N/A`.
- Existing evidence.
- Missing evidence/work.
- Blocker/Major/Minor findings.
- Recommended remediation.

## US-43 — Validate batch number và expiry date

**Jira Key thật:** `PAC-82`

### Task phải kiểm duyệt

- `PAC-TASK-141` / `PAC-351` — Validate batch number in import line
- `PAC-TASK-142` / `PAC-352` — Validate expiry date in import line

### Điều kiện xác minh

- [ ] Batch number bắt buộc.
- [ ] Expiry date bắt buộc.
- [ ] Expiry date không được là ngày không hợp lệ.
- [ ] Normalize batch number trước khi so sánh.
- [ ] Không có thay đổi ngoài phạm vi User Story.
- [ ] Task được xác minh từ code, migration, test và GitHub evidence.
- [ ] User Story PR đã merge đúng Epic branch.

### Kết luận User Story phải ghi

- Trạng thái: `Verified Done`, `Partial`, `Missing`, `Conflict`, `Failed Verification` hoặc `N/A`.
- Existing evidence.
- Missing evidence/work.
- Blocker/Major/Minor findings.
- Recommended remediation.

## US-44 — Confirm Stock Import transaction

**Jira Key thật:** `PAC-83`

### Task phải kiểm duyệt

- `PAC-TASK-143` / `PAC-353` — Implement confirm Stock Import transaction skeleton
- `PAC-TASK-144` / `PAC-354` — Apply stock import lines to MedicineBatch
- `PAC-TASK-145` / `PAC-355` — Rollback Stock Import confirm on any invalid line

### Điều kiện xác minh

- [ ] Confirm import chạy transaction.
- [ ] Tạo mới hoặc cộng MedicineBatch đúng rule.
- [ ] Nếu một dòng lỗi thì rollback toàn bộ.
- [ ] Confirm xong phiếu bị khóa.
- [ ] Không có thay đổi ngoài phạm vi User Story.
- [ ] Task được xác minh từ code, migration, test và GitHub evidence.
- [ ] User Story PR đã merge đúng Epic branch.

### Kết luận User Story phải ghi

- Trạng thái: `Verified Done`, `Partial`, `Missing`, `Conflict`, `Failed Verification` hoặc `N/A`.
- Existing evidence.
- Missing evidence/work.
- Blocker/Major/Minor findings.
- Recommended remediation.

## US-45 — Merge batch khi medicine/batch/expiry trùng

**Jira Key thật:** `PAC-84`

### Task phải kiểm duyệt

- `PAC-TASK-146` / `PAC-356` — Implement batch merge when medicine/batch/expiry match
- `PAC-TASK-147` / `PAC-357` — Add unit tests for valid batch merge rule
- `PAC-TASK-148` / `PAC-358` — Show batch merge result after Stock Import confirm

### Điều kiện xác minh

- [ ] Nếu medicine_id + batch_number + expiry_date trùng thì cộng quantity.
- [ ] Không tạo duplicate batch.
- [ ] Audit/history vẫn ghi nhận import.
- [ ] Quantity sau merge đúng.
- [ ] Không có thay đổi ngoài phạm vi User Story.
- [ ] Task được xác minh từ code, migration, test và GitHub evidence.
- [ ] User Story PR đã merge đúng Epic branch.

### Kết luận User Story phải ghi

- Trạng thái: `Verified Done`, `Partial`, `Missing`, `Conflict`, `Failed Verification` hoặc `N/A`.
- Existing evidence.
- Missing evidence/work.
- Blocker/Major/Minor findings.
- Recommended remediation.

## US-46 — Reject batch khi cùng batch nhưng khác expiry

**Jira Key thật:** `PAC-85`

### Task phải kiểm duyệt

- `PAC-TASK-149` / `PAC-359` — Implement expiry mismatch rejection
- `PAC-TASK-150` / `PAC-360` — Return line-level expiry mismatch errors
- `PAC-TASK-151` / `PAC-361` — Add tests for expiry mismatch rejection

### Điều kiện xác minh

- [ ] Detect expiry mismatch.
- [ ] Không tạo batch mới để né lỗi.
- [ ] Không silently merge.
- [ ] Trả lỗi rõ ràng cho Warehouse.
- [ ] Không có thay đổi ngoài phạm vi User Story.
- [ ] Task được xác minh từ code, migration, test và GitHub evidence.
- [ ] User Story PR đã merge đúng Epic branch.

### Kết luận User Story phải ghi

- Trạng thái: `Verified Done`, `Partial`, `Missing`, `Conflict`, `Failed Verification` hoặc `N/A`.
- Existing evidence.
- Missing evidence/work.
- Blocker/Major/Minor findings.
- Recommended remediation.

## US-47 — Khóa phiếu nhập đã confirmed

**Jira Key thật:** `PAC-86`

### Task phải kiểm duyệt

- `PAC-TASK-152` / `PAC-362` — Lock confirmed Stock Import status
- `PAC-TASK-153` / `PAC-363` — Build confirmed Stock Import read-only UI
- `PAC-TASK-154` / `PAC-364` — Prevent duplicate Stock Import confirm
- `PAC-TASK-155` / `PAC-365` — Add tests for confirmed Stock Import immutability

### Điều kiện xác minh

- [ ] Confirmed import không update/delete line.
- [ ] Không confirm lại cùng phiếu.
- [ ] UI disable action không hợp lệ.
- [ ] Backend enforce immutable state.
- [ ] Không có thay đổi ngoài phạm vi User Story.
- [ ] Task được xác minh từ code, migration, test và GitHub evidence.
- [ ] User Story PR đã merge đúng Epic branch.

### Kết luận User Story phải ghi

- Trạng thái: `Verified Done`, `Partial`, `Missing`, `Conflict`, `Failed Verification` hoặc `N/A`.
- Existing evidence.
- Missing evidence/work.
- Blocker/Major/Minor findings.
- Recommended remediation.

## US-48 — Audit Stock Import

**Jira Key thật:** `PAC-87`

### Task phải kiểm duyệt

- `PAC-TASK-156` / `PAC-366` — Write audit log for Stock Import confirm
- `PAC-TASK-157` / `PAC-367` — Show Stock Import audit metadata in detail UI
- `PAC-TASK-158` / `PAC-368` — Add Stock Import traceability notes
- `PAC-TASK-159` / `PAC-369` — Add Stock Import confirm integration tests
- `PAC-TASK-160` / `PAC-370` — Add Stock Import smoke test checklist

### Điều kiện xác minh

- [ ] Ghi actor, thời gian, hành động.
- [ ] Ghi thông tin confirm import.
- [ ] Có thể trace batch được tạo/cộng từ import.
- [ ] Không lưu dữ liệu thừa nhạy cảm.
- [ ] Không có thay đổi ngoài phạm vi User Story.
- [ ] Task được xác minh từ code, migration, test và GitHub evidence.
- [ ] User Story PR đã merge đúng Epic branch.

### Kết luận User Story phải ghi

- Trạng thái: `Verified Done`, `Partial`, `Missing`, `Conflict`, `Failed Verification` hoặc `N/A`.
- Existing evidence.
- Missing evidence/work.
- Blocker/Major/Minor findings.
- Recommended remediation.

# XI. Database và Migration Review

Kiểm tra thực tế:

## MedicineBatch

- Model và relations.
- Required `batch_number`.
- Required `expiry_date`.
- Normalization strategy.
- Composite uniqueness.
- Indexes.
- Quantity data type.
- Active/status fields.
- Không có aggregate source-of-truth conflict.
- Không có public direct update path.

## Stock Import

- `stock_imports`.
- `stock_import_lines`.
- Draft/Confirmed status.
- Supplier relation.
- Actor/timestamp fields.
- Medicine/MedicineBatch relations.
- Constraints/indexes.
- Confirmed immutability support.
- Audit relation/metadata.

## Migration

- Migration files tồn tại.
- Không sửa migration cũ nguy hiểm.
- Migration chạy được trên môi trường test/clean database phù hợp.
- Existing data compatibility.
- Unique constraint không fail do dữ liệu trùng.
- Rollback/mitigation được ghi rõ.
- Không reset database thật.

Chạy:

```bash
cd backend
npx prisma format
npx prisma validate
npx prisma generate
```

Nếu có migration verification script chính thức, chạy thêm.

---

# XII. Backend Review

Kiểm tra:

- Controllers.
- Services.
- DTOs.
- Validation pipes.
- AuthGuard.
- PermissionsGuard.
- Exception mapping.
- Transactions.
- Query/filter/pagination.
- Date/expiry handling.
- Audit logging.
- Duplicate confirm protection.
- Immutability.
- Không trả raw Prisma error.
- Không silent catch.
- Không `any` không cần thiết.
- Không log secret.

Các luồng trọng yếu:

- Inventory Summary từ MedicineBatch.
- Batch Detail.
- Sellable quantity.
- Expired exclusion.
- Low-stock.
- Near-expiry.
- Create Draft Stock Import.
- Add/update/delete line.
- Active Supplier validation.
- Confirm transaction.
- Rollback.
- Batch merge.
- Expiry mismatch.
- Confirmed read-only.
- Duplicate confirm.
- Audit metadata.

---

# XIII. Frontend Review

Kiểm tra:

- Tuân thủ `DESIGN.md`.
- Inventory Summary.
- Search/filter.
- Batch Detail.
- Expired/near-expiry/sellable states.
- Low-stock dashboard.
- Staff visibility restriction.
- POS sellable stock display.
- Không direct quantity edit.
- Create Stock Import.
- Line editor.
- Draft update/delete.
- Supplier selector.
- Batch/expiry validation.
- Confirm action.
- Merge result.
- Line-level errors.
- Confirmed read-only.
- Audit metadata.
- Loading/empty/error/success states.
- Permission-aware routes/actions.
- Không có hydration/console error nghiêm trọng.

---

# XIV. Testing và Build Review

Chỉ chạy scripts tồn tại trong `package.json`.

## Backend

```bash
cd backend
npm run lint
npm run test
npm run test:e2e
npx prisma validate
npx prisma generate
npm run build
```

## Frontend

```bash
cd frontend
npm run lint
npm run test
npm run build
```

Nếu script không tồn tại, ghi:

```text
N/A — script chưa được cấu hình
```

Không bịa Pass.

## Test bắt buộc phải xác minh

- MedicineBatch schema/source-of-truth.
- Required batch number.
- Batch normalization.
- Batch identity.
- Sellable quantity.
- Expired exclusion.
- Low-stock.
- Near-expiry.
- Permission Admin/Warehouse/Staff.
- Direct quantity update rejection.
- Draft Stock Import.
- Add/update/delete lines.
- Active Supplier validation.
- Batch/expiry validation.
- Confirm transaction success.
- Full rollback.
- Valid batch merge.
- Expiry mismatch rejection.
- Line-level errors.
- Duplicate confirm.
- Confirmed immutability.
- Audit log.
- Integration test.
- Frontend smoke checklist.

---

# XV. Manual UI Verification

## Inventory

- [ ] Admin xem Inventory Summary.
- [ ] Warehouse xem Inventory Summary.
- [ ] Staff không xem dashboard kho tổng.
- [ ] Search/filter hoạt động.
- [ ] Batch Detail đúng.
- [ ] Expired state đúng.
- [ ] Near-expiry state đúng.
- [ ] Sellable quantity đúng.
- [ ] Low-stock dựa trên sellable quantity.
- [ ] Không có direct quantity edit.
- [ ] Direct API update quantity bị chặn.
- [ ] POS chỉ thấy sellable availability.

## Stock Import

- [ ] Admin tạo Draft.
- [ ] Warehouse tạo Draft.
- [ ] Staff bị chặn.
- [ ] Inactive Supplier bị reject.
- [ ] Add line hợp lệ.
- [ ] Batch number rỗng bị reject.
- [ ] Expiry invalid bị reject.
- [ ] Update Draft line.
- [ ] Delete Draft line.
- [ ] Confirm nhiều line hợp lệ.
- [ ] Một line lỗi rollback toàn bộ.
- [ ] Batch identity trùng được merge.
- [ ] Quantity sau merge đúng.
- [ ] Expiry mismatch bị reject.
- [ ] Lỗi hiển thị đúng line.
- [ ] Confirmed import read-only.
- [ ] Confirm lặp bị chặn.
- [ ] Audit metadata đúng.
- [ ] Refresh không làm mất trạng thái.

Nếu không thể chạy manual test, ghi `Not Run` và lý do. Không ghi Pass.

---

# XVI. GitHub, Branch, Commit và PR Review

Luồng chính thức:

```text
Task branch
    ↓
User Story branch
    ↓
Epic branch
    ↓
develop
```

## Branch

Kiểm tra:

- Mỗi Task có branch riêng nếu workflow yêu cầu.
- Mỗi Story có branch.
- Mỗi Epic có branch.
- Branch chứa Jira Key thật.
- Không dùng logical key thay Jira Key.
- Không dùng prefix `PAI`.
- Không dùng một branch cho nhiều Task không liên quan.
- Không dùng Wave branch thay issue branch.
- Branch evidence vẫn tồn tại.

## Commit

Format chính thức:

```text
<PAC-issue-key> <logical-key>: <short English message>
```

Kiểm tra:

- Jira Key thật.
- Commit phản ánh đúng scope.
- Không commit giả.
- Không mention AI/agent/prompt/automation.
- Không secret hoặc `.env`.
- Không commit build output.

## Pull Request

Kiểm tra:

- Task → Story.
- Story → Epic.
- Epic → develop.
- PR title có Jira Key/logical key.
- Description có scope, test, risk và rollback.
- Checks pass trước merge.
- Không bỏ lại code Sprint 3 trên branch chưa merge.
- Không Task/Story merge thẳng sai hierarchy.

## develop → main

- Không bắt buộc merge vào main để bắt đầu Sprint 4 nếu baseline dùng develop làm integration branch.
- Nếu có release PR `develop → main`, chỉ kiểm tra trạng thái.
- Không tự merge PR này.

---

# XVII. Đối chiếu Audit và Progress

Đối chiếu từng Task với:

```text
work-context/sprint-3/sprint-3-audit.md
work-context/sprint-3/sprint-3-progress.md
```

Mỗi Task được ghi Done/checked phải có:

- Jira Key thật.
- Branch.
- Commit.
- PR.
- Merge status.
- Acceptance Criteria.
- Test evidence.
- Không có lỗi trong scope.

Nếu thiếu evidence:

- Chuyển về chưa hoàn thành hoặc ghi `Partial`.
- Không giữ `Verified Done`.
- Ghi missing evidence rõ ràng.

Cập nhật:

```text
work-context/sprint-3/sprint-3-audit.md
work-context/sprint-3/sprint-3-progress.md
WORKING-CONTEXT.md
```

---

# XVIII. Phân loại Finding

## Blocker

Ngăn chuyển Sprint 4:

- Epic chưa merge vào develop.
- Task critical Missing/Conflict.
- Migration fail.
- Prisma validate/build fail.
- Test critical fail.
- MedicineBatch không là source of truth.
- Direct quantity update tồn tại.
- Expired batch được tính sellable.
- Stock Import có partial update.
- Merge sai expiry.
- Confirmed import sửa được.
- Duplicate confirm làm cộng stock hai lần.
- Permission Staff/Warehouse sai.
- Secret bị commit.

## Major

Cần sửa trước Sprint 4 nếu ảnh hưởng dependency:

- API contract không ổn định.
- Inventory Summary sai.
- Low-stock/near-expiry sai.
- Missing test business rule quan trọng.
- UI không phản ánh backend state.
- Audit metadata thiếu.
- PR/merge evidence thiếu cho Task dependency.

## Minor

Có thể ghi Known Issues nếu không ảnh hưởng Sprint 4:

- UI spacing nhỏ.
- Copy wording.
- Minor accessibility issue.
- Documentation formatting.

Không hạ Blocker xuống Minor để cho phép qua Sprint 4.

---

# XIX. Remediation Plan

Nếu có finding, tạo bảng:

| ID | Severity | Epic | Story | Task | Root Cause | Evidence | Required Fix | Test Required | Branch/Jira | Status |
|---|---|---|---|---|---|---|---|---|---|---|

Quy tắc:

- Không sửa trực tiếp `develop` hoặc `main`.
- Fix phải đi qua issue branch và đúng hierarchy.
- Dùng Jira Key thật.
- Chạy lại verification sau remediation.
- Không triển khai Sprint 4 trong remediation Sprint 3.

---

# XX. Final Quality Gate

Chỉ đặt:

```text
Ready for Sprint 4 = Yes
```

khi tất cả điều kiện đạt.

## Scope

- [ ] PAC-EPIC-05 Verified Done.
- [ ] PAC-EPIC-06 Verified Done.
- [ ] US-27 → US-48 Verified Done.
- [ ] PAC-TASK-102 → PAC-TASK-160 Verified Done.

## Database

- [ ] Prisma format/validate/generate pass.
- [ ] Migrations hợp lệ.
- [ ] MedicineBatch source of truth.
- [ ] Batch identity đúng.
- [ ] Không direct quantity update.
- [ ] Stock Import schema/relations đúng.

## Backend

- [ ] Backend lint pass.
- [ ] Unit tests pass.
- [ ] Integration/E2E tests pass hoặc N/A hợp lệ.
- [ ] Backend build pass.
- [ ] Transactions/rollback đúng.
- [ ] Permissions đúng.
- [ ] Không Blocker.

## Frontend

- [ ] Frontend lint pass.
- [ ] Frontend tests pass hoặc N/A hợp lệ.
- [ ] Frontend build pass.
- [ ] Inventory UI hoạt động.
- [ ] Stock Import UI hoạt động.
- [ ] Permission-aware UI đúng.
- [ ] Không lỗi chặn nghiệp vụ.

## GitHub

- [ ] Task branches/evidence đúng.
- [ ] Story branches/evidence đúng.
- [ ] Epic branches/evidence đúng.
- [ ] Task PRs merge đúng Story.
- [ ] Story PRs merge đúng Epic.
- [ ] Epic PRs merge vào develop.
- [ ] Develop chứa toàn bộ Sprint 3.
- [ ] Không có Sprint 3 code bị bỏ lại.
- [ ] Jira Keys đúng.
- [ ] Không secret.

## Sprint 4 Dependencies

- [ ] MedicineBatch ổn định.
- [ ] Inventory Summary ổn định.
- [ ] Sellable quantity ổn định.
- [ ] Direct quantity update bị chặn.
- [ ] Stock Import transaction ổn định.
- [ ] Active Supplier validation ổn định.
- [ ] Admin/Warehouse permissions đúng.
- [ ] Staff restrictions đúng.

Nếu bất kỳ Blocker nào chưa đạt:

```text
Ready for Sprint 4 = No
```

---

# XXI. Báo cáo cuối phải trả về

## 1. Executive Summary

- Sprint 3 status.
- Final Gate Decision.
- Số Task Verified Done.
- Số Partial.
- Số Missing.
- Số Conflict.
- Số Failed Verification.
- Số test fail.
- Số branch/PR thiếu evidence.

## 2. Epic Verification

- PAC-EPIC-05.
- PAC-EPIC-06.

## 3. User Story Verification

- US-27 → US-48.

## 4. Task Verification

- PAC-TASK-102 → PAC-TASK-160.

## 5. Database/Migration Review

- Schema.
- Constraints.
- Migrations.
- Data risks.

## 6. Backend Review

- API.
- Validation.
- Transaction.
- Permission.
- Audit.

## 7. Frontend Review

- Inventory UI.
- Stock Import UI.
- States.
- Permission.

## 8. GitHub Review

- Branches.
- Commits.
- PRs.
- Merge flow.
- Missing evidence.

## 9. Test Results

Ghi command và output thật.

## 10. Manual Test Results

Ghi từng case `Pass`, `Fail` hoặc `Not Run`.

## 11. Findings

Chia Blocker, Major và Minor.

## 12. Remediation Plan

Liệt kê việc phải sửa trước Sprint 4.

## 13. Final Gate Decision

Chỉ một trong hai:

```text
Ready for Sprint 4 = Yes
```

hoặc:

```text
Ready for Sprint 4 = No
```

Kèm lý do cụ thể.

---

# XXII. Quy tắc cuối

- Không tin trạng thái cũ nếu chưa có evidence.
- Không bỏ qua test fail.
- Không bịa test result.
- Không che lỗi bằng mock.
- Không sửa ngoài Sprint 3.
- Không implement Sprint 4.
- Không tự merge `develop → main`.
- Không commit secret.
- Không reset database thật.
- Không sửa trực tiếp `develop` hoặc `main`.
- Không cho phép Sprint 4 nếu còn Blocker.

Bắt đầu theo thứ tự:

1. Đọc rules và tài liệu.
2. Kiểm tra Git/GitHub.
3. Kiểm tra Jira mapping.
4. Audit database/code/UI.
5. Chạy test/build.
6. Manual verification.
7. Đối chiếu audit/progress.
8. Lập remediation plan.
9. Cập nhật tài liệu.
10. Đưa ra Final Gate Decision.
