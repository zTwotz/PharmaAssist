# Sprint 6 — Checkout, FEFO, Payment & Invoice

> **PharmaAssist AI Intelligence**
>
> Repository path đề xuất:
>
> `work-context/sprint-6/sprint-6.md`

## Canonical Branch Source

`Jira/branch-on-jira.md` là file cuối cùng và chính thức cho toàn bộ Jira Key, Logical Key và exact branch name của Sprint 6.

Quy tắc sử dụng:

1. Sao chép nguyên văn branch từ cột **“Nhánh Git tương ứng”**.
2. Không tự rút gọn, đổi chữ hoa/thường hoặc thay branch slug.
3. Task/Bug PR luôn target `develop`.
4. Story/Epic branch chỉ giữ cho legacy/traceability; không tạo Story PR hoặc Epic PR.
5. Chỉ Project Owner được merge `develop → main`.
6. Sprint 6 Audit phải xác minh branch thực tế trên GitHub; mismatch là blocker và không được tự tạo branch thay thế.

>
> Trạng thái hiện tại:
>
> ```text
> Sprint 6 = Prepared
> Sprint 5 = Running
> Ready for Sprint 6 = No
> Ready to implement Sprint 6 = No
> ```
>
> Không được triển khai Sprint 6 cho đến khi Sprint 5 vượt qua Final Review và Sprint 6 Audit hoàn tất.

---

# 1. Sprint Overview

| Mục | Nội dung |
|---|---|
| Sprint | Sprint 6 |
| Tên | Checkout, FEFO, Payment & Invoice |
| Business Epic | PAC-EPIC-11 |
| Supporting Epic | PAC-EPIC-19 — Testing & Setup |
| Stories | US-83 → US-98 |
| Số Story | 16 |
| Tasks | PAC-TASK-259 → PAC-TASK-290 |
| Số Task | 32 |
| Branch inventory | 49 = 32 Task implementation branches + 16 Story legacy branches + 1 Epic legacy branch |
| Branch mới được phép tạo | 0 đối với Task/Story/Epic đã có; Bug branch chỉ sau khi Project Owner cung cấp Jira Bug Key |
| Primary API | `POST /checkout` |
| Database source of truth | PostgreSQL |
| Data-testing MCP | Supabase MCP |
| Jira management | Manual by Project Owner; AI chỉ đề xuất trạng thái |

---

# 2. Sprint Goal

Xây dựng checkout flow chính thức và duy nhất cho MVP:

```text
Validate actor and ownership
→ Validate Order DRAFT
→ Validate resolved HIGH alerts
→ Validate stock inside transaction
→ FEFO allocation
→ Persist batch allocations
→ Deduct MedicineBatch quantities
→ Create Payment
→ Create Invoice
→ Mark Order PAID
→ Commit transaction
```

Nếu bất kỳ bước nào thất bại:

```text
Rollback all changes
→ Order remains DRAFT
→ No partial stock deduction
→ No partial Payment
→ No partial Invoice
```

---

# 3. Implementation Authorization Gate

Sprint 6 chỉ được bắt đầu khi:

```text
Sprint 5 Final Review = PASS
Ready for Sprint 6 = Yes
Sprint 6 Audit status = Completed
Ready to implement Sprint 6 = Yes
GitHub access = Connected
Supabase MCP = Connected
Supabase test environment = Safe
32/32 exact Task branches = Verified
Open Blocking Technical Defects = 0
```

Jira không phải implementation gate của AI. Project Owner quản lý Jira thủ công.

Nếu một điều kiện kỹ thuật chưa đạt:

- Không sửa Sprint 6 business code.
- Không áp dụng Sprint 6 migration.
- Không tạo dữ liệu Payment, Invoice hoặc allocation trên môi trường không an toàn.
- Ghi blocker vào `sprint-6-audit.md`.
- Ghi trạng thái kỹ thuật vào `sprint-6-progress.md`.
- Không thay đổi Jira; chỉ ghi `Recommended Jira status` hoặc Bug candidate cho Project Owner.

# 4. Mandatory Dependencies

## Sprint 3 dependencies

- MedicineBatch là inventory source of truth.
- Sellable quantity loại expired batch.
- Batch expiry và quantity đã ổn định.
- Không có direct quantity edit path.

## Sprint 4 dependencies

- Order và OrderItem tồn tại.
- Order status gồm `DRAFT`, `PAID`, `CANCELLED`.
- Staff ownership được backend enforce.
- Admin all-orders access hoạt động.
- Draft Order giữ nguyên khi checkout fail.
- Draft Order chưa trừ tồn kho.

## Sprint 5 dependencies

- InteractionAlert được persist.
- HIGH acknowledgement được lưu.
- Consultation note được lưu theo alert.
- Backend có unresolved HIGH blocker contract.
- Warehouse không truy cập InteractionAlert.
- PostgreSQL quyết định checkout; Neo4j/AI không quyết định.

---

# 5. Business Rules and Invariants

## 5.1 Checkout command boundary

`CheckoutService` là command path chính thức duy nhất được phép đồng thời:

- Validate checkout.
- Allocate FEFO.
- Deduct MedicineBatch.
- Create Payment.
- Create Invoice.
- Mark Order `PAID`.

Không được tạo các flow riêng như:

```text
/orders/<built-in function id>/pay
/payments/create-after-checkout
/invoices/create-after-payment
/manual-batch-deduction
```

## 5.2 Atomic transaction

Các bước sau phải cùng transaction:

```text
Idempotency check/claim
Order lock/read
Permission and ownership validation
Order status validation
HIGH alert validation
Stock validation
FEFO allocation
OrderBatchAllocation persistence
MedicineBatch deduction
Payment persistence
Invoice persistence
Order PAID update
Idempotency result persistence
```

Không cho phép partial success.

## 5.3 Order rules

- Chỉ `DRAFT` được checkout.
- `PAID` không checkout lần nữa.
- `CANCELLED` không checkout.
- Checkout failure giữ Order ở `DRAFT`.
- Một OrderItem đại diện một Medicine.
- Tổng tiền dùng snapshot/logic chính thức của Order, không tự tính theo dữ liệu ngoài transaction.

## 5.4 Permission and ownership

- Staff chỉ checkout Order thuộc scope của mình.
- Admin được thao tác theo permission đã chốt.
- Warehouse không checkout.
- Frontend hiding không thay thế backend guard.
- Direct API access trái quyền phải trả `403`.

## 5.5 HIGH alert gate

Checkout phải fail khi còn HIGH alert chưa hoàn tất:

- Chưa acknowledgement; hoặc
- Consultation note rỗng/không hợp lệ.

Khi fail:

- Không Payment.
- Không Invoice.
- Không allocation persistence.
- Không batch deduction.
- Order vẫn `DRAFT`.

## 5.6 FEFO

- Chỉ dùng sellable batch.
- Exclude expired batch.
- Sort theo expiry gần nhất trước.
- Hỗ trợ một OrderItem phân bổ qua nhiều batch.
- Không allocation vượt quantity.
- Insufficient sellable stock phải fail.
- Kết quả allocation phải deterministic và audit được.

## 5.7 Inventory deduction

- Chỉ giảm `MedicineBatch.quantity` trong checkout transaction.
- Không giảm quantity trước khi Payment/Invoice thành công.
- Không làm quantity âm.
- Failure rollback toàn bộ batch deductions.
- `order_batch_allocations` là bằng chứng batch nào đã được dùng.

## 5.8 Idempotency

- Mỗi checkout request phải có idempotency handling phù hợp.
- Cùng key và cùng request không tạo duplicate Payment/Invoice/deduction.
- Request lặp trả kết quả nhất quán.
- Cùng key nhưng payload xung đột phải bị xử lý an toàn.
- Idempotency không được dùng để bỏ qua permission, status hoặc data validation.

## 5.9 Payment

### Cash

- `amount_tendered >= order total`.
- `change_amount = amount_tendered - order total`.
- Không có partial payment.
- Không có change âm.

### Simulated bank transfer

- `transaction_reference` bắt buộc.
- Reference không được trùng successful payment.
- Không tích hợp ngân hàng thật trong MVP.

### SUCCESS rule

- Mỗi Order chỉ có một Payment `SUCCESS`.
- Failed attempts có thể lưu nếu đúng thiết kế.
- Duplicate request không tạo SUCCESS thứ hai.

## 5.10 Invoice

- Invoice được tạo trong checkout transaction.
- Chỉ có Invoice khi checkout thành công.
- Không tạo Invoice bằng endpoint rời sau checkout.
- Invoice failure phải rollback Payment, stock deduction và Order update.
- Invoice view/print chỉ là hiển thị và print mức demo.

---

# 6. Scope

## In scope

- Checkout DTO and validation.
- `POST /checkout`.
- Checkout transaction service.
- Actor permission and ownership.
- DRAFT-only validation.
- HIGH alert validation.
- Stock validation inside transaction.
- FEFO allocation.
- Multi-batch allocation.
- Allocation persistence.
- MedicineBatch deduction.
- Idempotency.
- Rollback.
- Cash payment.
- Simulated bank transfer.
- One SUCCESS payment.
- Invoice generation.
- Invoice view/print.
- Integration and regression tests.

## Out of scope

- Refund/return.
- Partial payment.
- Real bank or payment gateway integration.
- Payment webhook.
- Online commerce checkout.
- Coupon/promotion/discount.
- Shipping/delivery.
- Customer loyalty.
- Multi-store/multi-warehouse allocation.
- Manual batch override unless already explicitly approved.
- AI or Graph checkout decision.
- Neo4j as source of truth.
- Automatic prescription or dosage advice.

---

# 7. Tool and Ownership Responsibilities

## Jira — Project Owner managed

Project Owner chịu trách nhiệm:

- cập nhật trạng thái Jira;
- thêm Jira comment;
- tạo và liên kết Jira Bug;
- đóng Story/Epic trên Jira;
- xác nhận các cập nhật thủ công.

AI không thực hiện Jira write action và không cần Jira MCP để triển khai. AI chỉ:

- giữ Jira Key đúng trong branch, commit, PR và evidence;
- ghi `Recommended Jira status`;
- duy trì `Manual Jira Update Queue`;
- ghi Bug candidate với Steps to Reproduce, Actual Result, Expected Result, Severity và affected scope.

## GitHub

AI sử dụng GitHub/Git để:

- xác minh exact Task/Bug branch;
- làm việc trên Task/Bug branch, không code trực tiếp trên `develop` hoặc `main`;
- commit và push đúng Jira Key;
- tạo PR Task/Bug → `develop`;
- kiểm tra CI, diff, scope, secret và conflict;
- tự merge PR vào `develop` khi toàn bộ Merge Gate đạt;
- giữ lại branch để làm bằng chứng khi cần.

Workflow chính thức:

```text
Task/Bug branch
→ targeted tests
→ Supabase verification khi có data impact
→ commit + push
→ PR vào develop
→ CI/diff/scope/conflict gate
→ AI merge vào develop
```

Story/Epic branch chỉ giữ cho legacy/traceability:

```text
Story branch: PR required = No
Epic branch: PR required = No
```

Chỉ Project Owner được review và merge `develop → main` sau Sprint Final Review PASS.

## Supabase MCP

Supabase MCP được dùng cho schema/data testing và evidence khi Task/Story/Epic có ảnh hưởng dữ liệu persistent:

- inspect schema, enum, FK, index và constraint;
- xác minh migration state và schema drift;
- tạo isolated fixtures trong môi trường an toàn;
- capture pre-test/post-test rows;
- xác minh transaction, rollback, idempotency và concurrency;
- cleanup đúng Test Run data.

Supabase verification không bắt buộc cho Task không có persistent data impact. Khi đó ghi:

```text
Supabase verification = N/A — no persistent data impact
```

Supabase MCP không thay thế Prisma migration, backend authorization hoặc automated tests.

# 8. Supabase Data-Test Strategy

Every write-based test run must record:

```text
Test Run ID
Environment
Affected Story/Task
Fixture IDs
Pre-test evidence
Action/API
Expected result
Actual result
Post-test evidence
Rollback evidence
Cleanup evidence
```

Suggested Test Run ID:

```text
S6-<STORY>-<TASK>-<timestamp-or-uuid>
```

Minimum scenarios:

| Scenario | Expected result |
|---|---|
| Cash happy path | Allocation, deduction, SUCCESS Payment, Invoice, Order PAID |
| Bank transfer happy path | Valid reference, one SUCCESS, Invoice, Order PAID |
| Order not DRAFT | No persistent changes |
| Staff wrong ownership | 403, no persistent changes |
| Warehouse checkout | 403, no persistent changes |
| Unresolved HIGH | Checkout rejected, no Payment/Invoice/deduction |
| Expired batch only | Insufficient sellable stock |
| FEFO two batches | Nearest expiry allocated first |
| Multi-batch quantity | Allocation split correctly |
| Insufficient stock | Full rollback |
| Duplicate idempotency key | No duplicate deduction/Payment/Invoice |
| Payment validation failure | Full rollback |
| Invoice failure | Full rollback |
| Duplicate SUCCESS attempt | Rejected/no second SUCCESS |
| Failed payment attempt | Does not block later valid SUCCESS if design permits |
| Cleanup | Only test-run rows removed |

Safety:

- Không test destructive trên production/demo.
- Không truncate/drop/reset database.
- Không xóa shared seed data.
- Không ghi secrets vào Jira/PR/evidence.

---

# 9. Git Execution and Manual Jira Coordination Rules

## Task/Bug lifecycle

```text
Read Task and acceptance criteria
→ pull latest develop
→ checkout exact Task/Bug branch
→ create short implementation plan
→ implement
→ run targeted tests
→ run Supabase verification when persistent data is affected
→ review diff, scope, secrets and conflicts
→ commit with Jira Key
→ push branch
→ create PR Task/Bug → develop
→ wait for required CI checks
→ fix on the same branch if a gate fails
→ AI merge into develop when every gate passes
→ verify merge SHA on develop
→ update technical progress/evidence
→ recommend Jira status to Project Owner
→ continue next Task
```

AI không thực hiện Jira transition hoặc Jira comment.

## Story lifecycle

Khi toàn bộ Task của Story đã merge vào `develop`:

```text
pull latest develop
→ verify child Task PRs and commits
→ run Story Acceptance Review
→ run Story-level integration tests
→ run Supabase Story verification only when data is affected
→ record PASS/FAIL and evidence
→ record Recommended Jira status
```

Không checkout Story branch để tích hợp. Không tạo Story PR. Nếu phát hiện lỗi, sửa qua Task/Bug branch rồi merge lại vào `develop`.

## Epic lifecycle

Khi toàn bộ Story đã đạt Acceptance Review:

```text
pull latest develop
→ run Epic Integration/Regression Review
→ run full tests/builds/Prisma checks
→ run Supabase Epic verification when applicable
→ resolve Blocking/High technical defects through Task/Bug branches
→ record PASS/FAIL and evidence
→ record Recommended Jira status
```

Không checkout Epic branch để tích hợp. Không tạo Epic PR.

## Release lifecycle

```text
Sprint Final Review on develop
→ PASS
→ Ready for release = Yes
→ Project Owner reviews and merges develop → main
```

AI không được merge `develop → main`.

## Commit formats

```text
<TASK-JIRA-KEY> T-xxx: <message>
<BUG-JIRA-KEY> BUG: <message>
```

Story/Epic review không yêu cầu integration commit riêng. Mọi code fix phải đi qua Task/Bug branch.

# 10. Bug Candidate and Bug Branch Workflow

AI không tạo Jira Bug.

Khi phát hiện defect có thể tái hiện, AI phải ghi Bug candidate gồm:

```text
Candidate ID
Summary
Affected Epic/Story/Task
Environment
Preconditions
Steps to Reproduce
Actual Result
Expected Result
Reproduction Rate
Severity
Evidence
Suggested Fix Acceptance Criteria
Regression Test Required
Recommended Jira action
```

Project Owner tạo Jira Bug và cung cấp Bug Jira Key.

Sau khi có key thật, AI mới được dùng branch:

```text
bugfix/<BUG-JIRA-KEY>-bug-<short-english-slug>
```

Technical lifecycle:

```text
receive real Bug Jira Key
→ checkout/create approved bugfix branch
→ reproduce
→ add failing regression test
→ fix
→ targeted tests
→ Supabase verification when data is affected
→ commit/push
→ PR Bug → develop
→ verify CI/diff/conflict
→ AI merge when every gate passes
→ regression pass on develop
→ update evidence
→ recommend Jira status to Project Owner
```

Không mở lại Task/Story/Epic branch để chứa bug fix. Không bịa Jira Bug Key.

# 11. Recommended Execution Order

## Phase A — Checkout contract and transaction boundary

1. US-83 — Checkout API transaction.
2. US-84 — Permission and ownership.
3. US-85 — DRAFT-only.
4. US-86 — HIGH alert validation.
5. US-87 — Stock validation.

## Phase B — FEFO and inventory mutation

6. US-88 — FEFO allocation.
7. US-89 — Allocation persistence.
8. US-90 — MedicineBatch deduction.

## Phase C — Idempotency and rollback

9. US-91 — Idempotency.
10. US-92 — Rollback.

## Phase D — Payment

11. US-93 — Payment handling.
12. US-94 — Cash change.
13. US-95 — Bank transfer reference.
14. US-96 — One SUCCESS payment.

## Phase E — Invoice and final UI

15. US-97 — Invoice generation.
16. US-98 — Invoice view/print.

Không bắt đầu Story tiếp theo cho đến khi Story hiện tại đã hoàn tất Acceptance Review trên `develop`, trừ khi execution policy chính thức cho phép song song.

---

# 12. Story and Task Plan

## 1. US-83 — Checkout API transaction

- **Jira Key:** `PAC-122`
- **Exact Story branch:** `story/PAC-122-us-83-checkout-api-transaction`
- **Task PR target:** `develop`
- **Story branch usage:** Legacy/Traceability only — no PR required
- **Initial Jira status:** `TO DO`

### Acceptance criteria

- Dùng `POST /checkout` làm flow chính thức.
- Tất cả bước checkout nằm trong một transaction.
- Chỉ khi toàn bộ bước thành công mới chuyển Order sang `PAID`.
- Bất kỳ lỗi nào cũng rollback toàn bộ.

### Tasks

| Task | Jira Key | Exact branch | Type | Required result |
|---|---|---|---|---|
| PAC-TASK-259 | PAC-469 | `feature/PAC-469-task-259-define-checkout-dto-and-validation-schema` | feature | `develop` |
| PAC-TASK-260 | PAC-470 | `feature/PAC-470-task-260-implement-checkoutcontroller-post-checkout` | feature | `develop` |
| PAC-TASK-261 | PAC-471 | `feature/PAC-471-task-261-implement-checkoutservice-transaction-skeleton` | feature | `develop` |
| PAC-TASK-266 | PAC-476 | `feature/PAC-476-task-266-build-checkout-full-page-or-full-height-panel-ui` | feature | `develop` |
| PAC-TASK-288 | PAC-498 | `feature/PAC-498-task-288-update-order-status-to-paid-only-after-successful-c` | feature | `develop` |
| PAC-TASK-289 | PAC-499 | `test/PAC-499-task-289-add-checkout-integration-tests` | test | `develop` |

### Story completion gate

- [ ] Tất cả Task implementation của Story đã hoàn thành.
- [ ] Mỗi Task dùng đúng exact Task branch.
- [ ] Mỗi Task commit chứa đúng Jira Key.
- [ ] Mỗi Task PR đã merge vào `develop` sau khi Merge Gate PASS.
- [ ] Targeted test evidence đã cập nhật cho từng Task.
- [ ] Supabase evidence đã cập nhật cho Task có persistent data impact; Task khác có N/A hợp lệ.
- [ ] Story Acceptance Review được chạy trên latest `develop`.
- [ ] Story-level integration tests PASS.
- [ ] Không còn Blocking technical defect.
- [ ] `Recommended Jira status` đã được ghi cho Project Owner.
- [ ] Không tạo Story PR và không merge qua Story branch.
## 2. US-84 — Checkout actor permission and ownership

- **Jira Key:** `PAC-123`
- **Exact Story branch:** `story/PAC-123-us-84-checkout-validation-pipeline`
- **Task PR target:** `develop`
- **Story branch usage:** Legacy/Traceability only — no PR required
- **Initial Jira status:** `TO DO`

### Acceptance criteria

- Actor phải có permission checkout.
- Staff chỉ checkout Order thuộc ownership scope.
- Admin được checkout Order hợp lệ theo quyền.
- Warehouse bị từ chối ở backend.

### Tasks

| Task | Jira Key | Exact branch | Type | Required result |
|---|---|---|---|---|
| PAC-TASK-262 | PAC-472 | `feature/PAC-472-task-262-validate-checkout-actor-permission-and-order-owners` | feature | `develop` |

### Story completion gate

- [ ] Tất cả Task implementation của Story đã hoàn thành.
- [ ] Mỗi Task dùng đúng exact Task branch.
- [ ] Mỗi Task commit chứa đúng Jira Key.
- [ ] Mỗi Task PR đã merge vào `develop` sau khi Merge Gate PASS.
- [ ] Targeted test evidence đã cập nhật cho từng Task.
- [ ] Supabase evidence đã cập nhật cho Task có persistent data impact; Task khác có N/A hợp lệ.
- [ ] Story Acceptance Review được chạy trên latest `develop`.
- [ ] Story-level integration tests PASS.
- [ ] Không còn Blocking technical defect.
- [ ] `Recommended Jira status` đã được ghi cho Project Owner.
- [ ] Không tạo Story PR và không merge qua Story branch.
## 3. US-85 — Checkout only Draft Order

- **Jira Key:** `PAC-124`
- **Exact Story branch:** `story/PAC-124-us-85-validate-order-status-draft`
- **Task PR target:** `develop`
- **Story branch usage:** Legacy/Traceability only — no PR required
- **Initial Jira status:** `TO DO`

### Acceptance criteria

- Chỉ Order ở trạng thái `DRAFT` được checkout.
- `PAID` và `CANCELLED` bị chặn.
- Backend trả lỗi rõ ràng.

### Tasks

| Task | Jira Key | Exact branch | Type | Required result |
|---|---|---|---|---|
| PAC-TASK-263 | PAC-473 | `feature/PAC-473-task-263-validate-order-exists-and-status-is-draft` | feature | `develop` |

### Story completion gate

- [ ] Tất cả Task implementation của Story đã hoàn thành.
- [ ] Mỗi Task dùng đúng exact Task branch.
- [ ] Mỗi Task commit chứa đúng Jira Key.
- [ ] Mỗi Task PR đã merge vào `develop` sau khi Merge Gate PASS.
- [ ] Targeted test evidence đã cập nhật cho từng Task.
- [ ] Supabase evidence đã cập nhật cho Task có persistent data impact; Task khác có N/A hợp lệ.
- [ ] Story Acceptance Review được chạy trên latest `develop`.
- [ ] Story-level integration tests PASS.
- [ ] Không còn Blocking technical defect.
- [ ] `Recommended Jira status` đã được ghi cho Project Owner.
- [ ] Không tạo Story PR và không merge qua Story branch.
## 4. US-86 — Validate unresolved HIGH alerts

- **Jira Key:** `PAC-125`
- **Exact Story branch:** `story/PAC-125-us-86-validate-unresolved-high-alerts`
- **Task PR target:** `develop`
- **Story branch usage:** Legacy/Traceability only — no PR required
- **Initial Jira status:** `TO DO`

### Acceptance criteria

- Checkout kiểm tra unresolved HIGH alerts.
- Thiếu acknowledgement hoặc consultation note thì fail.
- Không tạo Payment/Invoice và không trừ tồn khi fail.

### Tasks

| Task | Jira Key | Exact branch | Type | Required result |
|---|---|---|---|---|
| PAC-TASK-264 | PAC-474 | `feature/PAC-474-task-264-validate-unresolved-high-alerts-before-payment` | feature | `develop` |

### Story completion gate

- [ ] Tất cả Task implementation của Story đã hoàn thành.
- [ ] Mỗi Task dùng đúng exact Task branch.
- [ ] Mỗi Task commit chứa đúng Jira Key.
- [ ] Mỗi Task PR đã merge vào `develop` sau khi Merge Gate PASS.
- [ ] Targeted test evidence đã cập nhật cho từng Task.
- [ ] Supabase evidence đã cập nhật cho Task có persistent data impact; Task khác có N/A hợp lệ.
- [ ] Story Acceptance Review được chạy trên latest `develop`.
- [ ] Story-level integration tests PASS.
- [ ] Không còn Blocking technical defect.
- [ ] `Recommended Jira status` đã được ghi cho Project Owner.
- [ ] Không tạo Story PR và không merge qua Story branch.
## 5. US-87 — Validate sellable stock inside transaction

- **Jira Key:** `PAC-126`
- **Exact Story branch:** `story/PAC-126-us-87-validate-sellable-stock-truoc-checkout`
- **Task PR target:** `develop`
- **Story branch usage:** Legacy/Traceability only — no PR required
- **Initial Jira status:** `TO DO`

### Acceptance criteria

- Stock được kiểm tra lại trong transaction.
- Expired batch không được bán.
- Không bán vượt sellable quantity.
- Fail thì Order vẫn `DRAFT`.

### Tasks

| Task | Jira Key | Exact branch | Type | Required result |
|---|---|---|---|---|
| PAC-TASK-265 | PAC-475 | `feature/PAC-475-task-265-validate-sellable-stock-inside-checkout-transaction` | feature | `develop` |

### Story completion gate

- [ ] Tất cả Task implementation của Story đã hoàn thành.
- [ ] Mỗi Task dùng đúng exact Task branch.
- [ ] Mỗi Task commit chứa đúng Jira Key.
- [ ] Mỗi Task PR đã merge vào `develop` sau khi Merge Gate PASS.
- [ ] Targeted test evidence đã cập nhật cho từng Task.
- [ ] Supabase evidence đã cập nhật cho Task có persistent data impact; Task khác có N/A hợp lệ.
- [ ] Story Acceptance Review được chạy trên latest `develop`.
- [ ] Story-level integration tests PASS.
- [ ] Không còn Blocking technical defect.
- [ ] `Recommended Jira status` đã được ghi cho Project Owner.
- [ ] Không tạo Story PR và không merge qua Story branch.
## 6. US-88 — FEFO allocation service

- **Jira Key:** `PAC-128`
- **Exact Story branch:** `story/PAC-128-us-88-fefo-allocation-service`
- **Task PR target:** `develop`
- **Story branch usage:** Legacy/Traceability only — no PR required
- **Initial Jira status:** `TO DO`

### Acceptance criteria

- Chọn batch có expiry gần nhất trước.
- Bỏ qua expired batch.
- Hỗ trợ phân bổ nhiều batch.
- Insufficient stock bị từ chối.

### Tasks

| Task | Jira Key | Exact branch | Type | Required result |
|---|---|---|---|---|
| PAC-TASK-268 | PAC-478 | `feature/PAC-478-task-268-define-fefo-allocation-input-output-model` | feature | `develop` |
| PAC-TASK-269 | PAC-479 | `feature/PAC-479-task-269-query-sellable-medicinebatch-for-fefo` | feature | `develop` |
| PAC-TASK-270 | PAC-480 | `feature/PAC-480-task-270-sort-fefo-batches-by-nearest-expiry-date` | feature | `develop` |
| PAC-TASK-271 | PAC-481 | `feature/PAC-481-task-271-allocate-requested-quantity-across-multiple-batches` | feature | `develop` |
| PAC-TASK-272 | PAC-482 | `feature/PAC-482-task-272-reject-fefo-allocation-when-sellable-stock-is-insuf` | feature | `develop` |
| PAC-TASK-290 | PAC-500 | `test/PAC-500-task-290-add-fefo-idempotency-and-rollback-tests` | test | `develop` |

### Story completion gate

- [ ] Tất cả Task implementation của Story đã hoàn thành.
- [ ] Mỗi Task dùng đúng exact Task branch.
- [ ] Mỗi Task commit chứa đúng Jira Key.
- [ ] Mỗi Task PR đã merge vào `develop` sau khi Merge Gate PASS.
- [ ] Targeted test evidence đã cập nhật cho từng Task.
- [ ] Supabase evidence đã cập nhật cho Task có persistent data impact; Task khác có N/A hợp lệ.
- [ ] Story Acceptance Review được chạy trên latest `develop`.
- [ ] Story-level integration tests PASS.
- [ ] Không còn Blocking technical defect.
- [ ] `Recommended Jira status` đã được ghi cho Project Owner.
- [ ] Không tạo Story PR và không merge qua Story branch.
## 7. US-89 — Persist multi-batch allocations

- **Jira Key:** `PAC-129`
- **Exact Story branch:** `story/PAC-129-us-89-multi-batch-allocation-persistence`
- **Task PR target:** `develop`
- **Story branch usage:** Legacy/Traceability only — no PR required
- **Initial Jira status:** `TO DO`

### Acceptance criteria

- Lưu `order_batch_allocations`.
- Ghi medicine, batch và allocated quantity.
- Một OrderItem có thể dùng nhiều batch.

### Tasks

| Task | Jira Key | Exact branch | Type | Required result |
|---|---|---|---|---|
| PAC-TASK-273 | PAC-483 | `feature/PAC-483-task-273-create-order-batch-allocations-prisma-model` | feature | `develop` |
| PAC-TASK-274 | PAC-484 | `feature/PAC-484-task-274-persist-order-batch-allocations-during-checkout` | feature | `develop` |

### Story completion gate

- [ ] Tất cả Task implementation của Story đã hoàn thành.
- [ ] Mỗi Task dùng đúng exact Task branch.
- [ ] Mỗi Task commit chứa đúng Jira Key.
- [ ] Mỗi Task PR đã merge vào `develop` sau khi Merge Gate PASS.
- [ ] Targeted test evidence đã cập nhật cho từng Task.
- [ ] Supabase evidence đã cập nhật cho Task có persistent data impact; Task khác có N/A hợp lệ.
- [ ] Story Acceptance Review được chạy trên latest `develop`.
- [ ] Story-level integration tests PASS.
- [ ] Không còn Blocking technical defect.
- [ ] `Recommended Jira status` đã được ghi cho Project Owner.
- [ ] Không tạo Story PR và không merge qua Story branch.
## 8. US-90 — Deduct MedicineBatch quantity in checkout

- **Jira Key:** `PAC-130`
- **Exact Story branch:** `story/PAC-130-us-90-tru-batch-quantity-trong-transaction`
- **Task PR target:** `develop`
- **Story branch usage:** Legacy/Traceability only — no PR required
- **Initial Jira status:** `TO DO`

### Acceptance criteria

- Batch quantity chỉ giảm trong transaction thành công.
- Không làm quantity âm.
- Payment/Invoice fail thì batch deduction rollback.

### Tasks

| Task | Jira Key | Exact branch | Type | Required result |
|---|---|---|---|---|
| PAC-TASK-275 | PAC-485 | `feature/PAC-485-task-275-deduct-medicinebatch-quantities-inside-checkout-tra` | feature | `develop` |

### Story completion gate

- [ ] Tất cả Task implementation của Story đã hoàn thành.
- [ ] Mỗi Task dùng đúng exact Task branch.
- [ ] Mỗi Task commit chứa đúng Jira Key.
- [ ] Mỗi Task PR đã merge vào `develop` sau khi Merge Gate PASS.
- [ ] Targeted test evidence đã cập nhật cho từng Task.
- [ ] Supabase evidence đã cập nhật cho Task có persistent data impact; Task khác có N/A hợp lệ.
- [ ] Story Acceptance Review được chạy trên latest `develop`.
- [ ] Story-level integration tests PASS.
- [ ] Không còn Blocking technical defect.
- [ ] `Recommended Jira status` đã được ghi cho Project Owner.
- [ ] Không tạo Story PR và không merge qua Story branch.
## 9. US-91 — Idempotent checkout

- **Jira Key:** `PAC-131`
- **Exact Story branch:** `story/PAC-131-us-91-idempotent-checkout`
- **Task PR target:** `develop`
- **Story branch usage:** Legacy/Traceability only — no PR required
- **Initial Jira status:** `TO DO`

### Acceptance criteria

- Checkout hỗ trợ idempotency key/record.
- Request lặp không tạo payment hoặc invoice trùng.
- Kết quả lặp phải nhất quán.

### Tasks

| Task | Jira Key | Exact branch | Type | Required result |
|---|---|---|---|---|
| PAC-TASK-276 | PAC-486 | `feature/PAC-486-task-276-create-idempotency-records-prisma-model` | feature | `develop` |
| PAC-TASK-277 | PAC-487 | `feature/PAC-487-task-277-implement-idempotency-key-handling-for-checkout` | feature | `develop` |

### Story completion gate

- [ ] Tất cả Task implementation của Story đã hoàn thành.
- [ ] Mỗi Task dùng đúng exact Task branch.
- [ ] Mỗi Task commit chứa đúng Jira Key.
- [ ] Mỗi Task PR đã merge vào `develop` sau khi Merge Gate PASS.
- [ ] Targeted test evidence đã cập nhật cho từng Task.
- [ ] Supabase evidence đã cập nhật cho Task có persistent data impact; Task khác có N/A hợp lệ.
- [ ] Story Acceptance Review được chạy trên latest `develop`.
- [ ] Story-level integration tests PASS.
- [ ] Không còn Blocking technical defect.
- [ ] `Recommended Jira status` đã được ghi cho Project Owner.
- [ ] Không tạo Story PR và không merge qua Story branch.
## 10. US-92 — Rollback checkout failure

- **Jira Key:** `PAC-132`
- **Exact Story branch:** `story/PAC-132-us-92-rollback-khi-checkout-failure`
- **Task PR target:** `develop`
- **Story branch usage:** Legacy/Traceability only — no PR required
- **Initial Jira status:** `TO DO`

### Acceptance criteria

- Không có partial batch deduction.
- Không có partial Payment.
- Không có partial Invoice.
- Order giữ `DRAFT` nếu checkout fail.

### Tasks

| Task | Jira Key | Exact branch | Type | Required result |
|---|---|---|---|---|
| PAC-TASK-278 | PAC-488 | `feature/PAC-488-task-278-rollback-checkout-transaction-on-failure` | feature | `develop` |

### Story completion gate

- [ ] Tất cả Task implementation của Story đã hoàn thành.
- [ ] Mỗi Task dùng đúng exact Task branch.
- [ ] Mỗi Task commit chứa đúng Jira Key.
- [ ] Mỗi Task PR đã merge vào `develop` sau khi Merge Gate PASS.
- [ ] Targeted test evidence đã cập nhật cho từng Task.
- [ ] Supabase evidence đã cập nhật cho Task có persistent data impact; Task khác có N/A hợp lệ.
- [ ] Story Acceptance Review được chạy trên latest `develop`.
- [ ] Story-level integration tests PASS.
- [ ] Không còn Blocking technical defect.
- [ ] `Recommended Jira status` đã được ghi cho Project Owner.
- [ ] Không tạo Story PR và không merge qua Story branch.
## 11. US-93 — Payment handling

- **Jira Key:** `PAC-133`
- **Exact Story branch:** `story/PAC-133-us-93-cash-payment-handling`
- **Task PR target:** `develop`
- **Story branch usage:** Legacy/Traceability only — no PR required
- **Initial Jira status:** `TO DO`

### Acceptance criteria

- Cash payment được xử lý trong checkout.
- `amount_tendered >= order total`.
- Payment được tạo trong transaction.

### Tasks

| Task | Jira Key | Exact branch | Type | Required result |
|---|---|---|---|---|
| PAC-TASK-267 | PAC-477 | `feature/PAC-477-task-267-build-payment-method-selector-in-checkout-ui` | feature | `develop` |
| PAC-TASK-279 | PAC-489 | `feature/PAC-489-task-279-create-payments-prisma-model` | feature | `develop` |
| PAC-TASK-280 | PAC-490 | `feature/PAC-490-task-280-implement-cash-payment-handling-inside-checkout` | feature | `develop` |

### Story completion gate

- [ ] Tất cả Task implementation của Story đã hoàn thành.
- [ ] Mỗi Task dùng đúng exact Task branch.
- [ ] Mỗi Task commit chứa đúng Jira Key.
- [ ] Mỗi Task PR đã merge vào `develop` sau khi Merge Gate PASS.
- [ ] Targeted test evidence đã cập nhật cho từng Task.
- [ ] Supabase evidence đã cập nhật cho Task có persistent data impact; Task khác có N/A hợp lệ.
- [ ] Story Acceptance Review được chạy trên latest `develop`.
- [ ] Story-level integration tests PASS.
- [ ] Không còn Blocking technical defect.
- [ ] `Recommended Jira status` đã được ghi cho Project Owner.
- [ ] Không tạo Story PR và không merge qua Story branch.
## 12. US-94 — Cash change amount

- **Jira Key:** `PAC-134`
- **Exact Story branch:** `story/PAC-134-us-94-tinh-change-amount-cho-thanh-toan-tien-mat`
- **Task PR target:** `develop`
- **Story branch usage:** Legacy/Traceability only — no PR required
- **Initial Jira status:** `TO DO`

### Acceptance criteria

- `change_amount = amount_tendered - total`.
- Không cho change âm.
- Giá trị được lưu và hiển thị khi phù hợp.

### Tasks

| Task | Jira Key | Exact branch | Type | Required result |
|---|---|---|---|---|
| PAC-TASK-281 | PAC-491 | `feature/PAC-491-task-281-calculate-and-persist-change-amount` | feature | `develop` |

### Story completion gate

- [ ] Tất cả Task implementation của Story đã hoàn thành.
- [ ] Mỗi Task dùng đúng exact Task branch.
- [ ] Mỗi Task commit chứa đúng Jira Key.
- [ ] Mỗi Task PR đã merge vào `develop` sau khi Merge Gate PASS.
- [ ] Targeted test evidence đã cập nhật cho từng Task.
- [ ] Supabase evidence đã cập nhật cho Task có persistent data impact; Task khác có N/A hợp lệ.
- [ ] Story Acceptance Review được chạy trên latest `develop`.
- [ ] Story-level integration tests PASS.
- [ ] Không còn Blocking technical defect.
- [ ] `Recommended Jira status` đã được ghi cho Project Owner.
- [ ] Không tạo Story PR và không merge qua Story branch.
## 13. US-95 — Bank transfer transaction reference

- **Jira Key:** `PAC-135`
- **Exact Story branch:** `story/PAC-135-us-95-simulated-bank-transfer-transaction-reference`
- **Task PR target:** `develop`
- **Story branch usage:** Legacy/Traceability only — no PR required
- **Initial Jira status:** `TO DO`

### Acceptance criteria

- Bank transfer yêu cầu `transaction_reference`.
- Reference phải hợp lệ và không trùng successful payment.
- Không tích hợp ngân hàng thật trong MVP.

### Tasks

| Task | Jira Key | Exact branch | Type | Required result |
|---|---|---|---|---|
| PAC-TASK-282 | PAC-492 | `feature/PAC-492-task-282-implement-bank-transfer-transaction-reference-valid` | feature | `develop` |

### Story completion gate

- [ ] Tất cả Task implementation của Story đã hoàn thành.
- [ ] Mỗi Task dùng đúng exact Task branch.
- [ ] Mỗi Task commit chứa đúng Jira Key.
- [ ] Mỗi Task PR đã merge vào `develop` sau khi Merge Gate PASS.
- [ ] Targeted test evidence đã cập nhật cho từng Task.
- [ ] Supabase evidence đã cập nhật cho Task có persistent data impact; Task khác có N/A hợp lệ.
- [ ] Story Acceptance Review được chạy trên latest `develop`.
- [ ] Story-level integration tests PASS.
- [ ] Không còn Blocking technical defect.
- [ ] `Recommended Jira status` đã được ghi cho Project Owner.
- [ ] Không tạo Story PR và không merge qua Story branch.
## 14. US-96 — One SUCCESS payment per order

- **Jira Key:** `PAC-136`
- **Exact Story branch:** `story/PAC-136-us-96-one-success-payment-rule`
- **Task PR target:** `develop`
- **Story branch usage:** Legacy/Traceability only — no PR required
- **Initial Jira status:** `TO DO`

### Acceptance criteria

- Mỗi Order chỉ có một Payment `SUCCESS`.
- Failed attempts có thể được lưu.
- Double-submit không tạo SUCCESS thứ hai.

### Tasks

| Task | Jira Key | Exact branch | Type | Required result |
|---|---|---|---|---|
| PAC-TASK-283 | PAC-493 | `feature/PAC-493-task-283-enforce-one-success-payment-per-order` | feature | `develop` |
| PAC-TASK-284 | PAC-494 | `feature/PAC-494-task-284-allow-failed-payment-attempts-without-creating-dupl` | feature | `develop` |

### Story completion gate

- [ ] Tất cả Task implementation của Story đã hoàn thành.
- [ ] Mỗi Task dùng đúng exact Task branch.
- [ ] Mỗi Task commit chứa đúng Jira Key.
- [ ] Mỗi Task PR đã merge vào `develop` sau khi Merge Gate PASS.
- [ ] Targeted test evidence đã cập nhật cho từng Task.
- [ ] Supabase evidence đã cập nhật cho Task có persistent data impact; Task khác có N/A hợp lệ.
- [ ] Story Acceptance Review được chạy trên latest `develop`.
- [ ] Story-level integration tests PASS.
- [ ] Không còn Blocking technical defect.
- [ ] `Recommended Jira status` đã được ghi cho Project Owner.
- [ ] Không tạo Story PR và không merge qua Story branch.
## 15. US-97 — Invoice generation

- **Jira Key:** `PAC-137`
- **Exact Story branch:** `story/PAC-137-us-97-invoice-generated-inside-checkout`
- **Task PR target:** `develop`
- **Story branch usage:** Legacy/Traceability only — no PR required
- **Initial Jira status:** `TO DO`

### Acceptance criteria

- Invoice được tạo trong cùng checkout transaction.
- Không tạo invoice bằng flow riêng sau checkout.
- Invoice chỉ tồn tại khi checkout thành công.

### Tasks

| Task | Jira Key | Exact branch | Type | Required result |
|---|---|---|---|---|
| PAC-TASK-285 | PAC-495 | `feature/PAC-495-task-285-create-invoices-prisma-model` | feature | `develop` |
| PAC-TASK-286 | PAC-496 | `feature/PAC-496-task-286-generate-invoice-inside-checkout-transaction` | feature | `develop` |

### Story completion gate

- [ ] Tất cả Task implementation của Story đã hoàn thành.
- [ ] Mỗi Task dùng đúng exact Task branch.
- [ ] Mỗi Task commit chứa đúng Jira Key.
- [ ] Mỗi Task PR đã merge vào `develop` sau khi Merge Gate PASS.
- [ ] Targeted test evidence đã cập nhật cho từng Task.
- [ ] Supabase evidence đã cập nhật cho Task có persistent data impact; Task khác có N/A hợp lệ.
- [ ] Story Acceptance Review được chạy trên latest `develop`.
- [ ] Story-level integration tests PASS.
- [ ] Không còn Blocking technical defect.
- [ ] `Recommended Jira status` đã được ghi cho Project Owner.
- [ ] Không tạo Story PR và không merge qua Story branch.
## 16. US-98 — Invoice view and print

- **Jira Key:** `PAC-138`
- **Exact Story branch:** `story/PAC-138-us-98-xem-in-invoice-sau-checkout`
- **Task PR target:** `develop`
- **Story branch usage:** Legacy/Traceability only — no PR required
- **Initial Jira status:** `TO DO`

### Acceptance criteria

- Xem Invoice theo Order.
- Hiển thị thuốc, số lượng, đơn giá, tổng tiền và payment.
- Print mức demo được chấp nhận.

### Tasks

| Task | Jira Key | Exact branch | Type | Required result |
|---|---|---|---|---|
| PAC-TASK-287 | PAC-497 | `feature/PAC-497-task-287-build-invoice-view-and-print-ui` | feature | `develop` |

### Story completion gate

- [ ] Tất cả Task implementation của Story đã hoàn thành.
- [ ] Mỗi Task dùng đúng exact Task branch.
- [ ] Mỗi Task commit chứa đúng Jira Key.
- [ ] Mỗi Task PR đã merge vào `develop` sau khi Merge Gate PASS.
- [ ] Targeted test evidence đã cập nhật cho từng Task.
- [ ] Supabase evidence đã cập nhật cho Task có persistent data impact; Task khác có N/A hợp lệ.
- [ ] Story Acceptance Review được chạy trên latest `develop`.
- [ ] Story-level integration tests PASS.
- [ ] Không còn Blocking technical defect.
- [ ] `Recommended Jira status` đã được ghi cho Project Owner.
- [ ] Không tạo Story PR và không merge qua Story branch.
---

# 13. Exact Branch Registry

> Copy exact values. Do not regenerate or normalize slugs. Jira Key and branch-name normalization will be handled in a separate mapping-consistency step.

## Legacy/Traceability branches

These branches are retained as evidence only. AI does not use them for integration and does not create PRs from them.

| Logical issue | Jira Key | Exact branch | Usage | PR required |
|---|---|---|---|---|
| PAC-EPIC-11 | `PAC-11` | `epic/PAC-11-epic-11-checkout-fefo-payment-invoice` | Legacy/Traceability only | No |
| US-83 — Checkout API transaction | `PAC-122` | `story/PAC-122-us-83-checkout-api-transaction` | Legacy/Traceability only | No |
| US-84 — Checkout actor permission and ownership | `PAC-123` | `story/PAC-123-us-84-checkout-validation-pipeline` | Legacy/Traceability only | No |
| US-85 — Checkout only Draft Order | `PAC-124` | `story/PAC-124-us-85-validate-order-status-draft` | Legacy/Traceability only | No |
| US-86 — Validate unresolved HIGH alerts | `PAC-125` | `story/PAC-125-us-86-validate-unresolved-high-alerts` | Legacy/Traceability only | No |
| US-87 — Validate sellable stock inside transaction | `PAC-126` | `story/PAC-126-us-87-validate-sellable-stock-truoc-checkout` | Legacy/Traceability only | No |
| US-88 — FEFO allocation service | `PAC-127` | `story/PAC-128-us-88-fefo-allocation-service` | Legacy/Traceability only | No |
| US-89 — Persist multi-batch allocations | `PAC-128` | `story/PAC-129-us-89-multi-batch-allocation-persistence` | Legacy/Traceability only | No |
| US-90 — Deduct MedicineBatch quantity in checkout | `PAC-129` | `story/PAC-130-us-90-tru-batch-quantity-trong-transaction` | Legacy/Traceability only | No |
| US-91 — Idempotent checkout | `PAC-130` | `story/PAC-131-us-91-idempotent-checkout` | Legacy/Traceability only | No |
| US-92 — Rollback checkout failure | `PAC-131` | `story/PAC-132-us-92-rollback-khi-checkout-failure` | Legacy/Traceability only | No |
| US-93 — Payment handling | `PAC-132` | `story/PAC-133-us-93-cash-payment-handling` | Legacy/Traceability only | No |
| US-94 — Cash change amount | `PAC-133` | `story/PAC-134-us-94-tinh-change-amount-cho-thanh-toan-tien-mat` | Legacy/Traceability only | No |
| US-95 — Bank transfer transaction reference | `PAC-134` | `story/PAC-135-us-95-simulated-bank-transfer-transaction-reference` | Legacy/Traceability only | No |
| US-96 — One SUCCESS payment per order | `PAC-135` | `story/PAC-136-us-96-one-success-payment-rule` | Legacy/Traceability only | No |
| US-97 — Invoice generation | `PAC-136` | `story/PAC-137-us-97-invoice-generated-inside-checkout` | Legacy/Traceability only | No |
| US-98 — Invoice view and print | `PAC-137` | `story/PAC-138-us-98-xem-in-invoice-sau-checkout` | Legacy/Traceability only | No |

## Task implementation branches

All Task branches target `develop`.

| Task | Jira Key | Exact branch | PR target |
|---|---|---|---|
| PAC-TASK-259 — Define Checkout DTO and validation schema | `PAC-468` | `feature/PAC-469-task-259-define-checkout-dto-and-validation-schema` | `develop` |
| PAC-TASK-260 — Implement CheckoutController POST /checkout | `PAC-469` | `feature/PAC-470-task-260-implement-checkoutcontroller-post-checkout` | `develop` |
| PAC-TASK-261 — Implement CheckoutService transaction skeleton | `PAC-470` | `feature/PAC-471-task-261-implement-checkoutservice-transaction-skeleton` | `develop` |
| PAC-TASK-266 — Build Checkout full page or full-height panel UI | `PAC-475` | `feature/PAC-476-task-266-build-checkout-full-page-or-full-height-panel-ui` | `develop` |
| PAC-TASK-288 — Update order status to PAID only after successful checkout | `PAC-497` | `feature/PAC-498-task-288-update-order-status-to-paid-only-after-successful-c` | `develop` |
| PAC-TASK-289 — Add checkout integration tests | `PAC-498` | `test/PAC-499-task-289-add-checkout-integration-tests` | `develop` |
| PAC-TASK-262 — Validate checkout actor permission and order ownership | `PAC-471` | `feature/PAC-472-task-262-validate-checkout-actor-permission-and-order-owners` | `develop` |
| PAC-TASK-263 — Validate order exists and status is DRAFT | `PAC-472` | `feature/PAC-473-task-263-validate-order-exists-and-status-is-draft` | `develop` |
| PAC-TASK-264 — Validate unresolved HIGH alerts before payment | `PAC-473` | `feature/PAC-474-task-264-validate-unresolved-high-alerts-before-payment` | `develop` |
| PAC-TASK-265 — Validate sellable stock inside checkout transaction | `PAC-474` | `feature/PAC-475-task-265-validate-sellable-stock-inside-checkout-transaction` | `develop` |
| PAC-TASK-268 — Define FEFO allocation input/output model | `PAC-477` | `feature/PAC-478-task-268-define-fefo-allocation-input-output-model` | `develop` |
| PAC-TASK-269 — Query sellable MedicineBatch for FEFO | `PAC-478` | `feature/PAC-479-task-269-query-sellable-medicinebatch-for-fefo` | `develop` |
| PAC-TASK-270 — Sort FEFO batches by nearest expiry date | `PAC-479` | `feature/PAC-480-task-270-sort-fefo-batches-by-nearest-expiry-date` | `develop` |
| PAC-TASK-271 — Allocate requested quantity across multiple batches | `PAC-480` | `feature/PAC-481-task-271-allocate-requested-quantity-across-multiple-batches` | `develop` |
| PAC-TASK-272 — Reject FEFO allocation when sellable stock is insufficient | `PAC-481` | `feature/PAC-482-task-272-reject-fefo-allocation-when-sellable-stock-is-insuf` | `develop` |
| PAC-TASK-290 — Add FEFO, idempotency and rollback tests | `PAC-499` | `test/PAC-500-task-290-add-fefo-idempotency-and-rollback-tests` | `develop` |
| PAC-TASK-273 — Create order_batch_allocations Prisma model | `PAC-482` | `feature/PAC-483-task-273-create-order-batch-allocations-prisma-model` | `develop` |
| PAC-TASK-274 — Persist order_batch_allocations during checkout | `PAC-483` | `feature/PAC-484-task-274-persist-order-batch-allocations-during-checkout` | `develop` |
| PAC-TASK-275 — Deduct MedicineBatch quantities inside checkout transaction | `PAC-484` | `feature/PAC-485-task-275-deduct-medicinebatch-quantities-inside-checkout-tra` | `develop` |
| PAC-TASK-276 — Create idempotency_records Prisma model | `PAC-485` | `feature/PAC-486-task-276-create-idempotency-records-prisma-model` | `develop` |
| PAC-TASK-277 — Implement idempotency key handling for checkout | `PAC-486` | `feature/PAC-487-task-277-implement-idempotency-key-handling-for-checkout` | `develop` |
| PAC-TASK-278 — Rollback checkout transaction on failure | `PAC-487` | `feature/PAC-488-task-278-rollback-checkout-transaction-on-failure` | `develop` |
| PAC-TASK-267 — Build payment method selector in Checkout UI | `PAC-476` | `feature/PAC-477-task-267-build-payment-method-selector-in-checkout-ui` | `develop` |
| PAC-TASK-279 — Create payments Prisma model | `PAC-488` | `feature/PAC-489-task-279-create-payments-prisma-model` | `develop` |
| PAC-TASK-280 — Implement cash payment handling inside checkout | `PAC-489` | `feature/PAC-490-task-280-implement-cash-payment-handling-inside-checkout` | `develop` |
| PAC-TASK-281 — Calculate and persist change_amount | `PAC-490` | `feature/PAC-491-task-281-calculate-and-persist-change-amount` | `develop` |
| PAC-TASK-282 — Implement bank transfer transaction_reference validation | `PAC-491` | `feature/PAC-492-task-282-implement-bank-transfer-transaction-reference-valid` | `develop` |
| PAC-TASK-283 — Enforce one SUCCESS payment per order | `PAC-492` | `feature/PAC-493-task-283-enforce-one-success-payment-per-order` | `develop` |
| PAC-TASK-284 — Allow failed payment attempts without duplicate SUCCESS payment | `PAC-493` | `feature/PAC-494-task-284-allow-failed-payment-attempts-without-creating-dupl` | `develop` |
| PAC-TASK-285 — Create invoices Prisma model | `PAC-494` | `feature/PAC-495-task-285-create-invoices-prisma-model` | `develop` |
| PAC-TASK-286 — Generate invoice inside checkout transaction | `PAC-495` | `feature/PAC-496-task-286-generate-invoice-inside-checkout-transaction` | `develop` |
| PAC-TASK-287 — Build invoice view and print UI | `PAC-496` | `feature/PAC-497-task-287-build-invoice-view-and-print-ui` | `develop` |

# 14. Migration Plan Requirements

Before applying any Sprint 6 migration:

- Inspect existing Order/OrderItem/MedicineBatch schema.
- Inspect Sprint 5 InteractionAlert schema.
- Check existing Payment/Invoice/allocation/idempotency models.
- Identify naming conflicts.
- Define migration order.
- Define defaults/backfill for existing data.
- Define unique constraints:
  - one SUCCESS Payment per Order;
  - transaction reference uniqueness where applicable;
  - idempotency key uniqueness/scope;
  - allocation integrity.
- Define foreign keys and deletion behavior.
- Run Prisma validate/generate.
- Apply only to safe test environment first.
- Verify with Supabase MCP.
- Record rollback/recovery plan.
- Do not silently delete incompatible data.

---

# 15. Testing Requirements

## Automated

- DTO validation tests.
- Permission/ownership tests.
- DRAFT status tests.
- HIGH alert blocker tests.
- Sellable stock tests.
- FEFO ordering tests.
- Multi-batch allocation tests.
- Insufficient stock tests.
- Allocation persistence tests.
- Batch deduction tests.
- Idempotency tests.
- Duplicate SUCCESS tests.
- Cash payment tests.
- Bank transfer reference tests.
- Invoice generation tests.
- Full rollback tests.
- Checkout integration tests.

## Manual UI

- Checkout page/panel loads.
- Payment method selector works.
- Cash amount and change display correctly.
- Bank transfer reference validation is clear.
- HIGH alert blocker is shown clearly.
- Insufficient stock error preserves Draft.
- Double-submit does not create duplicates.
- Successful checkout displays Invoice.
- Invoice print works at demo level.
- Staff/Admin/Warehouse access behaves correctly.
- Loading/error/success states are present.
- Chrome desktop verification passes.

---

# 16. Definition of Done

## Task — technical completion

- Exact Task branch used.
- Acceptance criteria met.
- Targeted tests pass.
- Supabase verification passes when persistent data is affected, otherwise valid N/A.
- Commit contains correct Jira Key.
- PR targets `develop`.
- CI, diff, scope, secret and conflict gates pass.
- AI merges PR into `develop` and records merge SHA.
- `develop` remains buildable/testable.
- Technical progress/evidence updated.
- `Recommended Jira status = DONE` recorded for Project Owner.

Actual Jira status is managed manually by Project Owner and is not an AI technical completion gate.

## Story — technical acceptance

- All child Task PRs merged into `develop`.
- Story Acceptance Review runs on latest `develop`.
- Story acceptance criteria pass.
- Story-level integration tests pass.
- Supabase Story verification passes when applicable.
- No Blocking technical defect.
- No Story PR or Story integration commit is required.
- `Recommended Jira status = DONE` recorded.

## Epic — technical integration

- All Stories pass Story Acceptance Review.
- Epic Integration/Regression Review runs on latest `develop`.
- Full lint/test/build and Prisma checks pass as configured.
- Migration, schema-drift and Supabase verification pass.
- No unresolved Blocking/High technical defect affects Sprint 6.
- No Epic PR or Epic integration commit is required.
- `Recommended Jira status = DONE` recorded.

## Sprint

```text
32/32 Task implementation branches used
32/32 Task PRs merged into develop
16/16 Story Acceptance Reviews PASS
1/1 Epic Integration/Regression Review PASS
All Task commits contain correct Jira keys
No direct push to develop/main
No Story PR required
No Epic PR required
Checkout regression PASS
FEFO regression PASS
Payment regression PASS
Invoice regression PASS
Idempotency regression PASS
Rollback regression PASS
Permission/ownership regression PASS
Supabase verification PASS where applicable
Cleanup PASS
Sprint Final Review PASS
Ready for release = Yes
Develop → main = Waiting for Project Owner
```

# 17. Preparation Deliverables

While Sprint 5 is running, prepare only:

1. `sprint-6.md`
2. `sprint-6-progress.md`
3. `sprint-6-audit.md`
4. `sprint-6-agent-prompt.md`
5. `sprint-5-final-review-prompt.md`

Do not start Sprint 6 implementation until both gates pass:

```text
Sprint 5 Final Review = PASS
Ready for Sprint 6 = Yes

Sprint 6 Audit status = Completed
Ready to implement Sprint 6 = Yes
```

---

# 18. Current Official State

```text
Jira management = Manual by Project Owner
AI Jira write actions = Disabled
Git workflow = Task/Bug → develop
AI Task/Bug PR merge = Enabled after Merge Gate PASS
Story completion = Acceptance Review on develop
Epic completion = Integration/Regression Review on develop
Story PR = Not required
Epic PR = Not required
develop → main = Project Owner only

Sprint 6 = Prepared
Sprint 6 Audit = Not started
Ready to implement Sprint 6 = No
Ready for release = No
```
