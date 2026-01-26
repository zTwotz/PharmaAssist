Bạn là AI Coding Agent chính của dự án **PharmaAssist AI Intelligence**.

Nhiệm vụ của bạn là audit, lập kế hoạch, triển khai, kiểm thử, review, commit, push, tạo Pull Request và tích hợp toàn bộ **Sprint 3 — MedicineBatch, Inventory Summary & Stock Import** theo đúng tài liệu, skills, GitHub workflow và baseline nghiệp vụ của dự án.

---

# I. PHẠM VI SPRINT 3

Sprint 3 bao gồm:

* 2 Epic nghiệp vụ chính
* 2 Epic hỗ trợ
* 22 User Story
* 59 Task
* User Story: `US-27 → US-48`
* Task: `PAC-TASK-102 → PAC-TASK-160`

## Epic nghiệp vụ

### PAC-EPIC-05 — Inventory & MedicineBatch

* US-27 → US-38
* PAC-TASK-102 → PAC-TASK-130

### PAC-EPIC-06 — Stock Import

* US-39 → US-48
* PAC-TASK-131 → PAC-TASK-160

## Epic hỗ trợ

### PAC-EPIC-19 — Testing & Setup

Chứa các Task kiểm thử, integration test và smoke test được mapping trong Jira.

### PAC-EPIC-21 — Documentation & Traceability

Chứa các Task tài liệu và traceability được mapping trong Jira.

Các Task thuộc Epic hỗ trợ vẫn được triển khai trong User Story nghiệp vụ tương ứng. Không tạo luồng merge riêng gây trùng code nếu Epic hỗ trợ không có User Story độc lập.

---

# II. ĐIỀU KIỆN BẮT BUỘC TRƯỚC KHI BẮT ĐẦU

Trước khi audit hoặc code Sprint 3, phải xác minh Sprint 2 đã hoàn thành.

Kiểm tra:

```text
Sprint 2 = Completed
PAC-EPIC-03 = Done
PAC-EPIC-04 = Done
PAC-TASK-053 → PAC-TASK-101 = Done
Ready for Sprint 3 = Yes
Hai Epic Sprint 2 đã merge vào develop
```

Nếu một trong các điều kiện trên chưa đạt:

1. Không tạo branch triển khai Sprint 3.
2. Không sửa business code Sprint 3.
3. Báo cáo chính xác dependency còn thiếu.
4. Dừng tại bước kiểm tra dependency.

Sprint 3 phụ thuộc trực tiếp vào:

* Medicine
* ActiveIngredient
* Medicine–ActiveIngredient Mapping
* Supplier
* AuthGuard
* PermissionsGuard
* Permission seed
* Supplier active selector

---

# III. TÀI LIỆU BẮT BUỘC PHẢI ĐỌC

Đọc trước khi sửa code:

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
17. `Jira/jira-mapping.md`
18. Các tài liệu trong `DOC` liên quan:

    * SRS
    * Role & Permission
    * Module Design
    * API Specification
    * Database Design
    * Prisma Schema
    * UI/UX
    * Testing
    * Inventory
    * MedicineBatch
    * Stock Import

Nguồn điều phối chính:

```text
work-context/sprint-3/sprint-3.md
```

Nguồn ghi nhận hiện trạng:

```text
work-context/sprint-3/sprint-3-audit.md
```

Nguồn theo dõi tiến độ và evidence:

```text
work-context/sprint-3/sprint-3-progress.md
```

Không tự thay đổi baseline nếu chưa có bằng chứng trong tài liệu.

---

# IV. BẮT ĐẦU PHIÊN LÀM VIỆC

Sử dụng:

* `agent-skills-lifecycle`
* `git-github`
* `ecc-code-quality`
* `ecc-business-ops`
* `karpathy-principles`

Chạy:

```bash
git status

git checkout main
git pull origin main

git checkout develop
git pull origin develop

git status
git branch --show-current
git log --oneline -15
```

Không merge `develop` vào `main` tại bước bắt đầu.

Sau đó:

1. Đọc `WORKING-CONTEXT.md`.
2. Xác minh Sprint 2 gate.
3. Đọc Jira mapping.
4. Kiểm tra branch Sprint 3 đã tồn tại hay chưa.
5. Kiểm tra PR đang mở.
6. Kiểm tra workspace có thay đổi chưa commit hay không.
7. Báo cáo trạng thái repository.
8. Lập audit plan.
9. Chưa sửa business code.

Nếu workspace không sạch, không được tự xóa hoặc ghi đè thay đổi chưa rõ nguồn gốc.

---

# V. NGUYÊN TẮC CHỌN VÀ SỬ DỤNG SKILL

Không gọi tất cả skill cho mọi Task.

Mỗi Task phải chọn bộ skill tối thiểu nhưng đủ để hoàn thành công việc.

Trước khi code mỗi Task, ghi trong implementation plan:

```text
Selected Skills:
- <skill>: <lý do sử dụng>
```

## 5.1. Skill nền bắt buộc khi sửa code

### `karpathy-principles`

Luôn áp dụng:

* Think Before Coding
* Simplicity First
* Surgical Changes
* Goal-Driven Execution

## 5.2. Khi bắt đầu Sprint hoặc Epic

Sử dụng:

* `agent-skills-lifecycle`
* `ecc-code-quality`
* `git-github`
* `ecc-business-ops`

Chỉ sử dụng `superpowers-workflow` khi điều phối nhiều User Story hoặc dependency phức tạp ở cấp Epic.

## 5.3. Khi audit repository

Sử dụng:

* `ecc-code-quality`
* `ecc-database`
* `ecc-backend`
* `ecc-frontend`
* `ecc-security`
* `git-github`

Dùng `ecc-healthcare` khi đánh giá cấu trúc dữ liệu Medicine, MedicineBatch, expiry và stock có ảnh hưởng an toàn nghiệp vụ.

## 5.4. Khi có yêu cầu hoặc tài liệu mâu thuẫn

Thứ tự:

1. Đọc tài liệu liên quan.
2. Kiểm tra code hiện tại.
3. Dùng `brainstorming` nếu cần lựa chọn thiết kế.
4. Dùng `grill-with-docs` nếu domain model hoặc tài liệu mâu thuẫn.
5. Chỉ dùng `grill-me` khi còn quyết định quan trọng chưa thể suy ra.

Không hỏi lại nội dung đã được chốt trong baseline.

## 5.5. Khi Task có nhiều bước

Sử dụng:

* `writing-plans`
* `agent-skills-lifecycle`
* `karpathy-principles`

Plan phải chỉ rõ:

* Acceptance Criteria
* Files to inspect
* Files expected to change
* Implementation steps
* Test plan
* Migration risk
* Permission risk
* Out of scope

## 5.6. Khi làm Prisma, schema hoặc migration

Sử dụng:

* `ecc-database`
* `ecc-backend`
* `ecc-code-quality`
* `tdd`
* `ecc-testing`

Thêm `ecc-security` nếu có constraint, mass assignment, authorization hoặc data integrity risk.

Không sửa migration đã áp dụng nếu có thể tạo migration mới an toàn.

Không reset database thật.

## 5.7. Khi làm Backend hoặc API

Sử dụng:

* `ecc-backend`
* `tdd`
* `ecc-testing`

Thêm:

* `ecc-database` nếu có Prisma, query hoặc transaction.
* `ecc-security` nếu có AuthGuard, PermissionsGuard, validation hoặc quyền truy cập.
* `ecc-healthcare` nếu liên quan expiry, sellable stock hoặc dữ liệu thuốc.

## 5.8. Khi làm Frontend

Bắt buộc sử dụng:

* `modern-web-guidance`
* `ecc-frontend`
* `design-system-guide`
* `ecc-testing`

Thêm:

* `tdd` nếu component behavior có thể test tự động.
* `ecc-security` nếu có permission-aware action.

Frontend phải tuân thủ `DESIGN.md`, bao gồm màu chính `#024ad8`.

Frontend permission không thay thế backend authorization.

## 5.9. Khi làm test

Sử dụng:

* `tdd`
* `ecc-testing`
* `ecc-code-quality`

Thêm:

* `mattpocock-engineering` khi lỗi khó hoặc có vấn đề tích hợp.
* `ecc-security` khi test 401, 403 hoặc validation.
* `ecc-database` khi test transaction, rollback hoặc constraint.

## 5.10. Khi test hoặc build fail

Sử dụng:

* `mattpocock-engineering`
* `ecc-testing`
* Skill kỹ thuật tương ứng:

  * `ecc-backend`
  * `ecc-frontend`
  * `ecc-database`
  * `ecc-security`

Quy trình:

1. Tái hiện lỗi.
2. Lưu error output.
3. Xác định root cause.
4. Viết hoặc cập nhật test tái hiện lỗi.
5. Sửa tối thiểu.
6. Chạy test liên quan.
7. Chạy regression test.
8. Commit bản sửa hợp lý.

Không thêm mock chỉ để che giấu lỗi thật.

## 5.11. Khi review code

Sử dụng:

* `ecc-code-quality`
* `ecc-security`
* `mattpocock-engineering`
* Skill kỹ thuật tương ứng

Review trước:

* Commit
* Push
* Tạo PR
* Merge PR

## 5.12. Khi làm GitHub

Sử dụng:

* `git-github`
* `ecc-devops`
* `ecc-business-ops`
* `mattpocock-productivity`

Dùng `git-worktrees` khi thực hiện song song nhiều branch độc lập.

Mặc định Sprint 3 nên thực hiện tuần tự theo dependency.

## 5.13. Khi cập nhật tài liệu

Sử dụng:

* `mattpocock-productivity`
* `ecc-business-ops`

Chỉ dùng `anthropic-skills` hoặc `markitdown-convert` khi phải xử lý PDF, DOCX, PPTX hoặc XLSX.

## 5.14. Skill không cần dùng trong Sprint 3

Không dùng nếu không có yêu cầu trực tiếp:

* `ecc-ai-ml`
* `ecc-agents`
* `google-antigravity-sdk`
* `ecc-mobile`
* `ecc-networking`
* `chrome-extensions`
* `ecc-content`

Sprint 3 không xây AI agent, Graph-RAG hoặc Neo4j worker.

---

# VI. AUDIT TRƯỚC KHI CODE

Phải hoàn thành audit toàn bộ Sprint 3 trước khi sửa business code.

Sử dụng:

* `ecc-code-quality`
* `ecc-database`
* `ecc-backend`
* `ecc-frontend`
* `ecc-security`
* `ecc-healthcare`
* `git-github`

Audit:

* `PAC-TASK-102 → PAC-TASK-160`

Mỗi Task chỉ được dùng một trong các trạng thái:

* `Done`
* `Partial`
* `Missing`
* `Conflict`
* `N/A`

## 6.1. Audit Prisma và Database

Kiểm tra:

* MedicineBatch model
* MedicineBatch relations
* Batch number
* Expiry date
* Quantity
* Batch identity
* Composite unique constraint
* Indexes
* Inventory source of truth
* Stock Import model
* Stock Import Line model
* Status enum
* Supplier relation
* Audit log relation
* Existing migrations
* Seed data
* Existing inventory aggregate fields

## 6.2. Audit Backend

Kiểm tra:

* Inventory module
* MedicineBatch service
* Inventory Summary API
* Batch Detail API
* Sellable quantity logic
* Expired batch exclusion
* Low-stock logic
* Near-expiry logic
* Stock Import module
* Draft create
* Add/update/delete line
* Confirm transaction
* Rollback
* Batch merge
* Expiry mismatch rejection
* Duplicate confirm prevention
* Confirmed immutability
* Audit logging
* DTO validation
* Exception handling
* AuthGuard và PermissionsGuard

## 6.3. Audit Frontend

Kiểm tra:

* Inventory Summary screen
* Search/filter
* Batch Detail
* Expired/near-expiry/sellable states
* Low-stock dashboard
* POS sellable stock display
* Direct quantity edit
* Create Stock Import screen
* Line editor
* Draft update/delete
* Confirm action
* Batch merge result
* Line-level errors
* Confirmed read-only UI
* Audit metadata
* Permission-aware actions
* Loading, empty, error, success states

## 6.4. Audit Testing

Kiểm tra:

* Batch identity tests
* Sellable quantity tests
* Expired batch tests
* Low-stock tests
* Near-expiry tests
* Stock Import Draft tests
* Transaction tests
* Rollback tests
* Merge tests
* Expiry mismatch tests
* Immutability tests
* Permission tests
* Integration tests
* E2E tests
* Smoke checklist

## 6.5. Ghi kết quả Audit

Cập nhật:

```text
work-context/sprint-3/sprint-3-audit.md
```

Mỗi Task phải có:

* Status
* Existing Evidence
* Missing Work
* Conflict / Risk
* Recommended Action

Sau audit:

1. Cập nhật `sprint-3-progress.md`.
2. Ghi Task đã Done từ trước nếu có đầy đủ evidence.
3. Không code lại Task đã thực sự hoàn thành.
4. Lập implementation order.
5. Lập branch plan.
6. Xác định first User Story.
7. Chỉ sau đó mới code.

---

# VII. BASELINE NGHIỆP VỤ BẮT BUỘC

## 7.1. MedicineBatch

1. `MedicineBatch` là inventory source of truth của MVP.
2. Không dùng aggregate inventory quantity làm source of truth.
3. Batch number là bắt buộc.
4. Expiry date là bắt buộc.
5. Batch number phải được trim/normalize trước khi so sánh.
6. Batch identity:

```text
medicine_id + normalized_batch_number + expiry_date
```

7. Cùng Medicine và batch number nhưng khác expiry date không được merge.
8. Không cho sửa trực tiếp `MedicineBatch.quantity`.
9. Quantity chỉ thay đổi qua:

   * Stock Import
   * Inventory Adjustment
   * Checkout
10. Sprint 3 chưa triển khai Inventory Adjustment đầy đủ.
11. Không hard delete batch làm mất traceability nếu baseline không cho phép.

## 7.2. Sellable Quantity

Sellable quantity phải được tính từ các batch:

* Active
* Quantity lớn hơn 0
* Chưa hết hạn
* Có thể bán theo rule hệ thống

Không tính:

* Batch hết hạn
* Batch inactive
* Quantity bằng 0
* Batch không hợp lệ

## 7.3. Expiry

1. Expired batch không được tính vào sellable stock.
2. Near-expiry dùng threshold cấu hình hoặc default baseline.
3. Phải xử lý date boundary và timezone nhất quán.
4. Không trộn expired với near-expiry.

## 7.4. Low Stock

1. Low-stock dựa trên sellable quantity.
2. Không dựa trên tổng quantity gồm batch hết hạn.
3. Admin và Warehouse được xem dashboard kho.
4. Staff không được xem dashboard kho tổng nếu thiếu permission.
5. POS chỉ hiển thị availability cần cho bán hàng.

## 7.5. Stock Import

1. Stock Import bắt đầu ở trạng thái Draft.
2. Draft cho phép thêm, sửa và xóa line.
3. Confirmed import là read-only.
4. Không cho confirm lặp.
5. Supplier phải active tại thời điểm confirm.
6. Batch number và expiry date bắt buộc.
7. Confirm chạy trong một database transaction.
8. Một line lỗi phải rollback toàn bộ.
9. Không để partial batch updates.
10. Payment hoặc POS không nằm trong Sprint 3.
11. Confirm thành công phải ghi audit log.
12. Audit phải có:

    * Actor
    * Timestamp
    * Stock Import
    * Batch impact
13. Merge batch chỉ khi:

    * Cùng medicine
    * Cùng normalized batch number
    * Cùng expiry date
14. Nếu expiry mismatch:

    * Reject line
    * Trả lỗi theo line
    * Rollback toàn transaction

## 7.6. Auth và Permission

1. Tiếp tục dùng Supabase Auth.
2. Không tạo custom JWT.
3. Backend phải dùng AuthGuard.
4. Backend phải dùng PermissionsGuard hoặc cơ chế permission chính thức.
5. Admin và Warehouse được vận hành Stock Import theo permission.
6. Staff không được vận hành Stock Import.
7. Frontend phải ẩn action không được phép.
8. Backend vẫn phải chặn ngay cả khi frontend đã ẩn button.

## 7.7. An toàn

1. Không commit `.env`.
2. Không commit secret, token hoặc credentials.
3. Không reset database thật.
4. Không sửa dữ liệu production ngoài migration/seed được phép.
5. Không làm lấn sang Sprint 4, Sprint 5 hoặc Sprint 6.

---

# VIII. PHÂN RÃ 22 USER STORY VÀ 59 TASK

# PAC-EPIC-05 — Inventory & MedicineBatch

## US-27 — MedicineBatch là source of truth

### Task

* PAC-TASK-102 — Create medicine_batches Prisma model
* PAC-TASK-103 — Add MedicineBatch indexes and constraints
* PAC-TASK-104 — Remove aggregate inventory source-of-truth assumptions
* PAC-TASK-105 — Document MedicineBatch as inventory source of truth

### Kết quả cần đạt

* Có MedicineBatch model đúng baseline.
* Quan hệ với Medicine đúng.
* Có indexes và constraints.
* Không còn aggregate inventory source-of-truth.
* Tài liệu được cập nhật.

### Skill chính

* `ecc-database`
* `ecc-backend`
* `ecc-code-quality`
* `tdd`
* `ecc-testing`
* `mattpocock-productivity`

---

## US-28 — Batch number bắt buộc

### Task

* PAC-TASK-106 — Enforce required batch_number
* PAC-TASK-107 — Normalize batch_number before comparison
* PAC-TASK-108 — Add UI validation for batch_number

### Kết quả cần đạt

* Backend và frontend bắt buộc batch number.
* Batch number được trim/normalize.
* Lỗi validation rõ ràng.

### Skill chính

* `ecc-database`
* `ecc-backend`
* `ecc-frontend`
* `modern-web-guidance`
* `design-system-guide`
* `tdd`
* `ecc-testing`

---

## US-29 — Batch identity

### Task

* PAC-TASK-109 — Implement batch identity validation service
* PAC-TASK-110 — Add migration constraint for medicine/batch/expiry uniqueness
* PAC-TASK-111 — Add batch identity unit tests

### Kết quả cần đạt

* Identity gồm medicine, normalized batch number và expiry.
* Database và service cùng bảo vệ uniqueness.
* Unit tests pass.

### Skill chính

* `ecc-database`
* `ecc-backend`
* `tdd`
* `ecc-testing`
* `ecc-code-quality`

---

## US-30 — Inventory Summary

### Task

* PAC-TASK-112 — Implement inventory summary query from MedicineBatch
* PAC-TASK-113 — Build Inventory Summary screen
* PAC-TASK-114 — Add search/filter to Inventory Summary

### Kết quả cần đạt

* Summary tính từ MedicineBatch.
* API có search/filter.
* UI hiển thị đúng loading, empty và error state.

### Skill chính

* `ecc-database`
* `ecc-backend`
* `ecc-frontend`
* `modern-web-guidance`
* `design-system-guide`
* `ecc-testing`

---

## US-31 — Batch Detail

### Task

* PAC-TASK-115 — Implement Batch Detail API
* PAC-TASK-116 — Build Batch Detail screen
* PAC-TASK-117 — Display expired/near-expiry/sellable batch status

### Kết quả cần đạt

* Detail trả đúng medicine, batch number, expiry và quantity.
* Hiển thị đúng trạng thái expired, near-expiry và sellable.
* Có authorization.

### Skill chính

* `ecc-backend`
* `ecc-database`
* `ecc-frontend`
* `modern-web-guidance`
* `design-system-guide`
* `ecc-security`
* `ecc-testing`

---

## US-32 — Sellable quantity

### Task

* PAC-TASK-118 — Implement sellable quantity calculation service
* PAC-TASK-119 — Add tests for sellable quantity calculation

### Kết quả cần đạt

* Sellable quantity được tính từ batch hợp lệ.
* Không dùng aggregate stored total.
* Unit tests pass.

### Skill chính

* `ecc-backend`
* `ecc-database`
* `ecc-healthcare`
* `tdd`
* `ecc-testing`

---

## US-33 — Exclude expired batches

### Task

* PAC-TASK-120 — Exclude expired batches from sellable stock
* PAC-TASK-121 — Add tests for expired batch exclusion

### Kết quả cần đạt

* Batch hết hạn không nằm trong sellable stock.
* Date boundary đúng.
* Tests pass.

### Skill chính

* `ecc-backend`
* `ecc-database`
* `ecc-healthcare`
* `tdd`
* `ecc-testing`

---

## US-34 — Low-stock từ sellable quantity

### Task

* PAC-TASK-122 — Implement low-stock calculation from sellable quantity
* PAC-TASK-123 — Display low-stock state for Admin/Warehouse
* PAC-TASK-124 — Hide general low-stock dashboard from Staff

### Kết quả cần đạt

* Low-stock tính từ sellable quantity.
* Admin/Warehouse thấy.
* Staff không thấy dashboard tổng.

### Skill chính

* `ecc-backend`
* `ecc-database`
* `ecc-frontend`
* `modern-web-guidance`
* `ecc-security`
* `tdd`
* `ecc-testing`

---

## US-35 — Near-expiry

### Task

* PAC-TASK-125 — Implement near-expiry calculation with threshold
* PAC-TASK-126 — Display near-expiry batch state

### Kết quả cần đạt

* Threshold hoạt động.
* Expired và near-expiry phân biệt rõ.
* UI đúng design system.

### Skill chính

* `ecc-backend`
* `ecc-database`
* `ecc-frontend`
* `modern-web-guidance`
* `ecc-healthcare`
* `ecc-testing`

---

## US-36 — Inventory dashboard

### Task

* PAC-TASK-127 — Build Admin/Warehouse inventory dashboard cards

### Kết quả cần đạt

* Có inventory summary cards.
* Có low-stock và near-expiry.
* Permission đúng.

### Skill chính

* `ecc-frontend`
* `modern-web-guidance`
* `design-system-guide`
* `ecc-security`
* `ecc-testing`

---

## US-37 — POS sellable stock display

### Task

* PAC-TASK-128 — Build POS sellable stock display

### Kết quả cần đạt

* POS chỉ thấy sellable availability.
* Không lộ chi tiết kho không cần thiết.
* Không triển khai Draft Order đầy đủ trong Sprint 3.

### Skill chính

* `ecc-backend`
* `ecc-frontend`
* `modern-web-guidance`
* `ecc-security`
* `ecc-testing`

---

## US-38 — Chặn direct quantity edit

### Task

* PAC-TASK-129 — Remove direct quantity edit from Batch Detail UI
* PAC-TASK-130 — Ensure no public API directly edits batch quantity

### Kết quả cần đạt

* Không có UI sửa quantity trực tiếp.
* Không có public API sửa quantity.
* Tests xác nhận access bị chặn.

### Skill chính

* `ecc-backend`
* `ecc-frontend`
* `ecc-security`
* `ecc-code-quality`
* `tdd`
* `ecc-testing`

---

# PAC-EPIC-06 — Stock Import

## US-39 — Tạo Stock Import Draft

### Task

* PAC-TASK-131 — Create stock_imports Prisma model
* PAC-TASK-132 — Implement create Stock Import draft API
* PAC-TASK-133 — Build create Stock Import screen

### Kết quả cần đạt

* Có Stock Import Draft.
* Có relation Supplier.
* Admin/Warehouse tạo được.
* Staff bị chặn.

### Skill chính

* `ecc-database`
* `ecc-backend`
* `ecc-frontend`
* `modern-web-guidance`
* `design-system-guide`
* `ecc-security`
* `tdd`
* `ecc-testing`

---

## US-40 — Thêm Stock Import Line

### Task

* PAC-TASK-134 — Create stock_import_lines Prisma model
* PAC-TASK-135 — Implement add stock import line API
* PAC-TASK-136 — Build stock import line editor UI

### Kết quả cần đạt

* Thêm được Medicine, batch number, expiry và quantity.
* Validation đầy đủ.
* Không thêm line vào confirmed import.

### Skill chính

* `ecc-database`
* `ecc-backend`
* `ecc-frontend`
* `modern-web-guidance`
* `tdd`
* `ecc-testing`

---

## US-41 — Sửa/xóa line khi Draft

### Task

* PAC-TASK-137 — Implement update draft import line API
* PAC-TASK-138 — Implement delete draft import line API
* PAC-TASK-139 — Disable edit/delete for confirmed import lines

### Kết quả cần đạt

* Draft line sửa/xóa được.
* Confirmed line bất biến.
* Backend và UI cùng enforce.

### Skill chính

* `ecc-backend`
* `ecc-database`
* `ecc-frontend`
* `ecc-security`
* `tdd`
* `ecc-testing`

---

## US-42 — Validate Supplier

### Task

* PAC-TASK-140 — Validate active supplier before confirm import

### Kết quả cần đạt

* Supplier inactive bị reject.
* Validation chạy lại tại confirm.
* Không chỉ dựa vào selector UI.

### Skill chính

* `ecc-backend`
* `ecc-database`
* `ecc-security`
* `tdd`
* `ecc-testing`

---

## US-43 — Validate batch và expiry

### Task

* PAC-TASK-141 — Validate batch number in import line
* PAC-TASK-142 — Validate expiry date in import line

### Kết quả cần đạt

* Batch number và expiry bắt buộc.
* Expiry không hợp lệ bị từ chối.
* Lỗi trả đúng line.

### Skill chính

* `ecc-backend`
* `ecc-database`
* `ecc-healthcare`
* `tdd`
* `ecc-testing`

---

## US-44 — Confirm transaction

### Task

* PAC-TASK-143 — Implement confirm Stock Import transaction skeleton
* PAC-TASK-144 — Apply stock import lines to MedicineBatch
* PAC-TASK-145 — Rollback Stock Import confirm on any invalid line

### Kết quả cần đạt

* Confirm chạy trong transaction.
* Tất cả line hợp lệ được áp dụng.
* Một line lỗi rollback toàn bộ.
* Không để dữ liệu partial.

### Skill chính

* `ecc-database`
* `ecc-backend`
* `mattpocock-engineering`
* `tdd`
* `ecc-testing`
* `ecc-code-quality`

---

## US-45 — Merge batch hợp lệ

### Task

* PAC-TASK-146 — Implement batch merge when medicine/batch/expiry match
* PAC-TASK-147 — Add unit tests for valid batch merge rule
* PAC-TASK-148 — Show batch merge result after Stock Import confirm

### Kết quả cần đạt

* Merge đúng identity.
* Quantity cộng đúng.
* Không tạo batch trùng.
* UI hiển thị kết quả.
* Tests pass.

### Skill chính

* `ecc-database`
* `ecc-backend`
* `ecc-frontend`
* `modern-web-guidance`
* `tdd`
* `ecc-testing`

---

## US-46 — Reject expiry mismatch

### Task

* PAC-TASK-149 — Implement expiry mismatch rejection
* PAC-TASK-150 — Return line-level expiry mismatch errors
* PAC-TASK-151 — Add tests for expiry mismatch rejection

### Kết quả cần đạt

* Cùng medicine và batch number nhưng khác expiry bị reject.
* Lỗi trả theo line.
* Transaction rollback.
* Tests pass.

### Skill chính

* `ecc-database`
* `ecc-backend`
* `ecc-healthcare`
* `tdd`
* `ecc-testing`

---

## US-47 — Confirmed import immutable

### Task

* PAC-TASK-152 — Lock confirmed Stock Import status
* PAC-TASK-153 — Build confirmed Stock Import read-only UI
* PAC-TASK-154 — Prevent duplicate Stock Import confirm
* PAC-TASK-155 — Add tests for confirmed Stock Import immutability

### Kết quả cần đạt

* Confirmed import read-only.
* Không confirm lặp.
* Backend và frontend cùng chặn.
* Tests pass.

### Skill chính

* `ecc-backend`
* `ecc-database`
* `ecc-frontend`
* `modern-web-guidance`
* `ecc-security`
* `tdd`
* `ecc-testing`

---

## US-48 — Audit và Testing

### Task

* PAC-TASK-156 — Write audit log for Stock Import confirm
* PAC-TASK-157 — Show Stock Import audit metadata in detail UI
* PAC-TASK-158 — Add Stock Import traceability notes
* PAC-TASK-159 — Add Stock Import confirm integration tests
* PAC-TASK-160 — Add Stock Import smoke test checklist

### Kết quả cần đạt

* Có audit log.
* UI hiển thị audit metadata.
* Có traceability.
* Integration test pass.
* Smoke checklist hoàn chỉnh.

### Skill chính

* `ecc-backend`
* `ecc-database`
* `ecc-frontend`
* `modern-web-guidance`
* `ecc-testing`
* `mattpocock-productivity`
* `ecc-business-ops`

---

# IX. THỨ TỰ TRIỂN KHAI

Thực hiện theo dependency:

## Wave 1 — MedicineBatch Foundation

* US-27
* US-28
* US-29

## Wave 2 — Inventory Rules

* US-32
* US-33
* US-34
* US-35

## Wave 3 — Inventory API và UI

* US-30
* US-31
* US-36
* US-37
* US-38

## Wave 4 — Stock Import Draft

* US-39
* US-40
* US-41
* US-42
* US-43

## Wave 5 — Confirm Transaction

* US-44
* US-45
* US-46
* US-47

## Wave 6 — Audit và Release Evidence

* US-48

Wave chỉ là nhóm lập kế hoạch.

Không tạo một Wave branch chứa nhiều Task.

---

# X. GITHUB WORKFLOW BẮT BUỘC

Luồng merge:

```text
Task branch
    ↓
User Story branch
    ↓
Epic branch
    ↓
develop
    ↓
main
```

## 10.1. Nguồn branch

1. Epic branch tạo từ `develop` mới nhất.
2. US branch tạo từ Epic branch mới nhất.
3. Task branch tạo từ US branch mới nhất.
4. Task có dependency phải làm tuần tự.
5. Không tạo tất cả Task branch cùng lúc.
6. Sau mỗi Task merge, cập nhật US branch trước khi tạo Task tiếp theo.

## 10.2. Jira Key

Trước mỗi branch hoặc commit, đọc:

```text
Jira/jira-mapping.md
```

Dùng Jira issue key thật ở cột `Jira Key`.

Ví dụ:

```text
PAC-TASK-102 → Jira Key thật có thể là PAC-312
```

Không dùng Logical Key làm Jira Key chính trong branch/commit nếu mapping có key thật.

## 10.3. Epic branch

Format:

```text
feature/<EPIC_JIRA_KEY>-EPIC-05-inventory-medicine-batch
feature/<EPIC_JIRA_KEY>-EPIC-06-stock-import
```

Ví dụ chỉ mang tính minh họa. Phải dùng key thật.

## 10.4. User Story branch

Format:

```text
feature/<US_JIRA_KEY>-US-27-medicine-batch-foundation
```

## 10.5. Task branch

Format:

```text
<type>/<TASK_JIRA_KEY>-TASK-102-create-medicine-batches-model
```

Type:

* `feature`
* `fix`
* `test`
* `docs`
* `refactor`
* `chore`

## 10.6. Không được làm

* Không push trực tiếp lên `main`.
* Không push trực tiếp lên `develop`.
* Không dùng một branch cho nhiều Task.
* Không dùng Wave branch để code.
* Không force push lên `main` hoặc `develop`.
* Không xóa Task, US hoặc Epic branch sau merge.
* Không squash làm mất toàn bộ bằng chứng commit nếu không được yêu cầu.
* Không nhắc AI, agent, automation hoặc prompt trong GitHub.

---

# XI. QUY TRÌNH CHO MỖI EPIC

## 11.1. Tạo Epic branch

```bash
git checkout develop
git pull origin develop

git checkout -b feature/<EPIC_JIRA_KEY>-EPIC-xx-<slug>
git push -u origin feature/<EPIC_JIRA_KEY>-EPIC-xx-<slug>
```

PAC-EPIC-06 chỉ bắt đầu từ `develop` mới nhất sau khi PAC-EPIC-05 đã được tích hợp nếu dependency yêu cầu.

---

# XII. QUY TRÌNH CHO MỖI USER STORY

Từ Epic branch:

```bash
git checkout <EPIC_BRANCH>
git pull origin <EPIC_BRANCH>

git checkout -b feature/<US_JIRA_KEY>-US-xx-<slug>
git push -u origin feature/<US_JIRA_KEY>-US-xx-<slug>
```

Trước khi làm US:

1. Đọc Acceptance Criteria.
2. Liệt kê Task.
3. Kiểm tra dependency.
4. Lập skill plan.
5. Lập branch plan.
6. Không code Task tiếp theo trước khi Task dependency đã merge.

---

# XIII. QUY TRÌNH CHO MỖI TASK

## 13.1. Tạo Task branch

```bash
git checkout <US_BRANCH>
git pull origin <US_BRANCH>

git checkout -b <type>/<TASK_JIRA_KEY>-TASK-xxx-<slug>
```

## 13.2. Implementation Plan

Trước khi sửa code, ghi:

```text
Task:
Jira Key:
User Story:
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

## 13.3. TDD

Đối với logic mới hoặc bug fix:

1. Viết test thất bại.
2. Chạy và xác nhận Red.
3. Viết implementation tối thiểu.
4. Chạy và xác nhận Green.
5. Refactor.
6. Chạy regression test.

Documentation, migration-only metadata hoặc style-only Task có thể không cần Red-Green, nhưng vẫn phải có verification phù hợp.

## 13.4. Kiểm tra diff

```bash
git status
git diff
git diff --staged
```

Kiểm tra:

* Không có `.env`
* Không có secret
* Không có token
* Không có password
* Không có build output
* Không có file tạm
* Không có debug log thừa
* Không có thay đổi ngoài scope
* Không có `any` không cần thiết
* Không có silent catch

## 13.5. Test trước commit và push

Chỉ chạy script tồn tại trong `package.json`.

Backend:

```bash
cd backend
npm run lint
npm run test
npx prisma validate
npx prisma generate
npm run build
```

Nếu liên quan E2E:

```bash
npm run test:e2e
```

Frontend:

```bash
cd frontend
npm run lint
npm run build
```

Nếu có test frontend phù hợp, chạy thêm test đó.

Nếu script không tồn tại:

* Không tự bịa kết quả.
* Ghi `N/A — script chưa được cấu hình`.

## 13.6. Review

Sử dụng:

* `ecc-code-quality`
* Skill kỹ thuật liên quan
* `ecc-security` nếu có API, data hoặc permission

Review correctness, security, maintainability và scope.

## 13.7. Commit

Mỗi Task có thể có từ 1–10 commit tùy độ lớn.

Không tạo commit giả để đạt số lượng.

Format:

```text
<type>(<scope>): <Jira key> <short English description>
```

Ví dụ:

```text
feat(inventory): PAC-312 add MedicineBatch Prisma model
test(inventory): PAC-321 cover batch identity validation
fix(stock-import): PAC-359 reject expiry mismatch
docs(inventory): PAC-315 document batch source of truth
```

Không mention:

* AI
* Agent
* Automation
* ChatGPT
* Gemini
* Codex
* Prompt

## 13.8. Đồng bộ branch cha

```bash
git fetch origin
git rebase origin/<US_BRANCH>
```

Nếu conflict:

1. Giải quyết cẩn thận.
2. Chạy lại test.
3. Không force push nếu chưa được phép.

## 13.9. Push

```bash
git push -u origin <TASK_BRANCH>
```

Không xóa branch sau merge.

---

# XIV. PR TASK → USER STORY

Sử dụng:

* `git-github`
* `ecc-devops`
* `mattpocock-productivity`

Tạo PR:

```bash
gh pr create \
  --base <US_BRANCH> \
  --head <TASK_BRANCH> \
  --title "<type>(<scope>): <TASK_JIRA_KEY> <short English description>" \
  --body-file <PR_BODY_FILE>
```

PR description:

```text
## Summary

## Jira

## User Story

## Changes

## Acceptance Criteria

## Validation

## Test Results

## Migration Impact

## Security / Permission Impact

## Known Issues

## Out of Scope
```

Kiểm tra:

```bash
gh pr view <PR_NUMBER>
gh pr checks <PR_NUMBER>
```

Chỉ merge khi checks pass:

```bash
gh pr merge <PR_NUMBER> --merge
```

Không dùng `--delete-branch`.

Nếu checks fail:

1. Checkout Task branch.
2. Debug.
3. Commit fix.
4. Push.
5. Chạy lại checks.
6. Chỉ merge khi pass.

---

# XV. HOÀN THÀNH USER STORY

Sau khi tất cả Task của US đã merge:

```bash
git checkout <US_BRANCH>
git pull origin <US_BRANCH>
```

Sử dụng:

* `agent-skills-lifecycle`
* `ecc-testing`
* `ecc-code-quality`
* Skill kỹ thuật liên quan
* `git-github`

Chạy verification toàn US.

Backend nếu liên quan:

```bash
cd backend
npm run lint
npm run test
npx prisma validate
npx prisma generate
npm run build
```

E2E nếu liên quan:

```bash
npm run test:e2e
```

Frontend nếu liên quan:

```bash
cd frontend
npm run lint
npm run build
```

Thực hiện manual UI test nếu có giao diện.

Nếu có lỗi integration:

1. Sửa trên US branch.
2. Viết test tái hiện nếu phù hợp.
3. Commit bằng Jira Key thật của US.
4. Push.
5. Chạy lại verification.

Cập nhật:

```text
work-context/sprint-3/sprint-3-progress.md
WORKING-CONTEXT.md
```

Tạo PR US → Epic:

```bash
gh pr create \
  --base <EPIC_BRANCH> \
  --head <US_BRANCH> \
  --title "feat(<scope>): <US_JIRA_KEY> complete US-xx <description>" \
  --body-file <PR_BODY_FILE>
```

Merge khi checks pass:

```bash
gh pr merge <PR_NUMBER> --merge
```

Không xóa US branch.

---

# XVI. HOÀN THÀNH EPIC

Sau khi toàn bộ US của Epic đã merge:

```bash
git checkout <EPIC_BRANCH>
git pull origin <EPIC_BRANCH>
```

Sử dụng:

* `agent-skills-lifecycle`
* `superpowers-workflow`
* `ecc-code-quality`
* `ecc-testing`
* `ecc-security`
* `ecc-devops`
* `git-github`

Chạy:

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
npm run build
```

Chỉ chạy script tồn tại.

Thực hiện manual test toàn Epic.

Nếu có integration issue:

1. Sửa trên Epic branch.
2. Viết test tái hiện.
3. Sửa tối thiểu.
4. Commit với Jira Key Epic.
5. Push.
6. Chạy lại test.

Tạo PR Epic → develop:

```bash
gh pr create \
  --base develop \
  --head <EPIC_BRANCH> \
  --title "feat(<scope>): <EPIC_JIRA_KEY> complete PAC-EPIC-xx <description>" \
  --body-file <PR_BODY_FILE>
```

Kiểm tra:

```bash
gh pr checks <PR_NUMBER>
```

Merge khi pass:

```bash
gh pr merge <PR_NUMBER> --merge
```

Không xóa Epic branch.

Sau merge:

```bash
git checkout develop
git pull origin develop
```

---

# XVII. CẬP NHẬT PROGRESS VÀ EVIDENCE

Sau mỗi Task cập nhật:

```text
work-context/sprint-3/sprint-3-progress.md
```

Phải ghi:

* Checkbox Task
* Jira Key thật
* Selected Skills
* Branch
* Commit
* PR
* Test Evidence
* Manual Test
* Known Issue
* Next Action

Task chỉ được đánh dấu `[x]` khi:

1. Acceptance Criteria đạt.
2. Test phù hợp pass.
3. PR Task → US đã merge.
4. Evidence đầy đủ.

Sau mỗi US:

* Đánh dấu User Story nếu tất cả Task Done.
* Ghi Task PRs.
* Ghi US PR → Epic.
* Ghi integration tests.
* Ghi manual UI evidence.

Sau mỗi Epic:

* Đánh dấu Epic nếu tất cả US Done.
* Ghi Epic PR → develop.
* Ghi full verification.
* Ghi Known Issues và Deferred Work.

Không đánh dấu Done nếu test fail.

Không ghi Pass nếu chưa chạy.

---

# XVIII. MANUAL UI TEST

## 18.1. Inventory & MedicineBatch

* Admin xem Inventory Summary.
* Warehouse xem Inventory Summary.
* Staff không truy cập dashboard kho tổng.
* Search Inventory hoạt động.
* Filter Inventory hoạt động.
* Batch Detail hiển thị đúng.
* Batch hết hạn hiển thị expired.
* Batch gần hết hạn hiển thị near-expiry.
* Sellable quantity đúng.
* Low-stock dựa trên sellable quantity.
* Không có direct quantity edit.
* Gọi API sửa quantity trực tiếp bị chặn.
* POS chỉ hiển thị sellable availability.

## 18.2. Stock Import

* Admin tạo Draft.
* Warehouse tạo Draft.
* Staff bị chặn.
* Supplier inactive bị từ chối.
* Thêm line hợp lệ.
* Batch number rỗng bị từ chối.
* Expiry date không hợp lệ bị từ chối.
* Update Draft line.
* Delete Draft line.
* Confirm nhiều line hợp lệ.
* Một line lỗi rollback toàn bộ.
* Batch identity trùng được merge.
* Quantity sau merge đúng.
* Expiry mismatch bị reject.
* Lỗi hiển thị theo line.
* Confirmed import read-only.
* Confirm lặp bị chặn.
* Audit metadata hiển thị đúng.
* Refresh trang không làm mất trạng thái confirmed.

Ghi kết quả vào `sprint-3-progress.md`.

---

# XIX. KIỂM THỬ BẮT BUỘC

Các business rule trọng yếu phải có automated tests:

1. Batch identity.
2. Batch number normalization.
3. Required expiry date.
4. Sellable quantity.
5. Expired batch exclusion.
6. Low-stock từ sellable quantity.
7. Near-expiry threshold.
8. Direct quantity update rejection.
9. Draft line create/update/delete.
10. Active Supplier validation.
11. Confirm transaction.
12. Rollback toàn bộ.
13. Valid batch merge.
14. Expiry mismatch rejection.
15. Duplicate confirm prevention.
16. Confirmed immutability.
17. Permission Admin/Warehouse/Staff.
18. Audit log sau confirm.

Không mock Prisma transaction đến mức test không còn xác minh transaction behavior.

---

# XX. DEFINITION OF DONE CHO TASK

Một Task chỉ Done khi:

* Đúng scope.
* Đạt Acceptance Criteria.
* Không vi phạm baseline.
* Code review nội bộ hoàn tất.
* Test phù hợp pass.
* Build phù hợp pass.
* Không có secret.
* Có commit chuẩn.
* Có Task branch.
* Có PR Task → US.
* PR đã merge.
* Progress và evidence cập nhật.

---

# XXI. DEFINITION OF DONE CHO USER STORY

Một User Story chỉ Done khi:

* Tất cả Task Done.
* Luồng nghiệp vụ hoàn chỉnh.
* Integration test phù hợp pass.
* Manual test phù hợp pass.
* Không còn lỗi trong phạm vi Story.
* US branch đã push.
* PR US → Epic đã merge.
* Progress cập nhật.

---

# XXII. DEFINITION OF DONE CHO EPIC

Một Epic chỉ Done khi:

* Tất cả US Done.
* Full Epic test pass.
* Backend lint/test/build pass.
* Prisma validate/generate pass.
* Frontend lint/build pass nếu liên quan.
* Manual test toàn Epic pass.
* Không có Conflict chưa xử lý.
* Epic PR → develop đã merge.
* Branch vẫn được giữ làm evidence.
* `WORKING-CONTEXT.md` cập nhật.

---

# XXIII. FINAL SPRINT 3 VERIFICATION

Sau khi PAC-EPIC-05 và PAC-EPIC-06 đã merge vào `develop`:

```bash
git checkout develop
git pull origin develop
```

Sử dụng:

* `agent-skills-lifecycle`
* `ecc-testing`
* `ecc-code-quality`
* `ecc-security`
* `ecc-devops`
* `git-github`

Chạy:

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
npm run build
```

Chỉ chạy script tồn tại.

Kiểm tra:

1. `PAC-TASK-102 → PAC-TASK-160` đã được audit và xử lý.
2. `US-27 → US-48` đạt Acceptance Criteria.
3. `PAC-EPIC-05` Done.
4. `PAC-EPIC-06` Done.
5. Không còn Conflict chưa xử lý.
6. Không còn lỗi trong scope Sprint 3.
7. Không có secret trong repository.
8. MedicineBatch là source of truth.
9. Không có aggregate inventory source-of-truth.
10. Không có public direct quantity edit.
11. Sellable quantity loại expired batch.
12. Low-stock dùng sellable quantity.
13. Stock Import confirm dùng transaction.
14. Một line lỗi rollback toàn bộ.
15. Expiry mismatch bị reject.
16. Confirmed import immutable.
17. Audit log hoạt động.
18. Permission Admin/Warehouse/Staff đúng.
19. Tất cả Task branch đã push.
20. Tất cả PR Task → US đã merge.
21. Tất cả PR US → Epic đã merge.
22. Hai PR Epic → develop đã merge.
23. Branch vẫn được giữ lại.
24. `sprint-3-audit.md` hoàn chỉnh.
25. `sprint-3-progress.md` hoàn chỉnh.
26. `WORKING-CONTEXT.md` cập nhật.

Chỉ đặt:

```text
Ready for Sprint 4 = Yes
```

khi toàn bộ điều kiện đạt.

---

# XXIV. DEVELOP → MAIN

Sau khi Sprint 3 hoàn thành:

1. Tạo PR `develop → main`.
2. Điền description đầy đủ.
3. Không mention AI hoặc automation.
4. Không tự merge.
5. Dừng lại để người dùng kiểm thử và phê duyệt.

```bash
gh pr create \
  --base main \
  --head develop \
  --title "release: complete Sprint 3 inventory medicine batch and stock import" \
  --body-file <PR_BODY_FILE>
```

Không chạy:

```bash
gh pr merge
```

cho PR `develop → main`.

Chỉ người dùng được quyết định merge vào `main`.

---

# XXV. BÁO CÁO CUỐI

Khi hoàn thành, báo cáo:

1. Sprint 2 dependency gate.
2. Kết quả audit.
3. PAC-EPIC-05 status.
4. PAC-EPIC-06 status.
5. US-27 → US-48 status.
6. PAC-TASK-102 → PAC-TASK-160 status.
7. Skills đã dùng theo từng nhóm.
8. Branch đã tạo.
9. Commit đã tạo.
10. PR Task → US.
11. PR US → Epic.
12. PR Epic → develop.
13. Test results.
14. Manual UI results.
15. Prisma migrations.
16. Database constraints.
17. Known Issues.
18. Deferred work.
19. Ready for Sprint 4.
20. Link PR `develop → main` đang chờ phê duyệt.

---

# XXVI. LỆNH BẮT ĐẦU

Bắt đầu theo thứ tự:

1. Đọc rules và tài liệu.
2. Kiểm tra Sprint 2 gate.
3. Kiểm tra Git.
4. Audit repository.
5. Điền `sprint-3-audit.md`.
6. Cập nhật `sprint-3-progress.md`.
7. Lập implementation plan.
8. Lập branch plan.
9. Chọn skills phù hợp.
10. Chỉ bắt đầu code khi audit hoàn tất và repository đủ điều kiện.

Không sửa business code trước khi hoàn thành audit và kế hoạch Sprint 3.
