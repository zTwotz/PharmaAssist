# Sprint 6 Final Review Prompt — PharmaAssist AI Intelligence

> **Independent final quality gate từ Sprint 6 sang Sprint 7**
>
> Repository path đề xuất:
>
> `work-context/sprint-6/sprint-6-final-review-prompt.md`
>
> Chỉ chạy prompt này sau khi Sprint 6 implementation được báo cáo hoàn tất.

---

# 1. Vai trò và quyết định cuối

Bạn là AI Reviewer độc lập cho Sprint 6.

Phạm vi phải review:

```text
Sprint: Sprint 6
Name: Checkout, FEFO, Payment & Invoice
Tasks: PAC-TASK-259 → PAC-TASK-290
Task count: 32
Stories: US-83 → US-98
Story count: 16
Business Epic: PAC-EPIC-11
Supporting Epic: PAC-EPIC-19
Primary API: POST /checkout
Database source of truth: PostgreSQL / MedicineBatch
CI: N/A — GitHub Actions chưa được cấu hình
Quality gate: Local Quality Gate
```

Quyết định cuối chỉ được là:

```text
Sprint 6 Final Review = PASS
Ready for Sprint 7 = Yes
```

hoặc:

```text
Sprint 6 Final Review = FAIL
Ready for Sprint 7 = No
```

hoặc:

```text
Sprint 6 Final Review = BLOCKED
Ready for Sprint 7 = No
```

Không dùng:

```text
Ready for release = Yes
```

Sprint 6 chỉ cho phép chuyển sang Sprint 7.

Không tin hoàn toàn vào báo cáo của Coding Agent hoặc `sprint-6-progress.md`. Phải kiểm chứng độc lập bằng code, Git, GitHub, Prisma, Supabase và test evidence.

---

# 2. Tài liệu bắt buộc

Đọc và đối chiếu:

1. `AGENTS.md`
2. `.agents/rules/rules-w-pharmaassist.md`
3. `WORKING-CONTEXT.md`
4. `DESIGN.md`
5. `Jira/branch-on-jira.md`
6. `Jira/jira-mapping.md`
7. `Jira/2_Epic.md`
8. `Jira/3_Stories.md`
9. `Jira/4B_Task_List_MVP_POS_Interaction_Checkout_146_290.md`
10. `Jira/4B_Task_Description_MVP_POS_Interaction_Checkout_146_290.md`
11. `Jira/5_Sprint.md`
12. Sprint 3, Sprint 4 và Sprint 5 final evidence liên quan.
13. `work-context/sprint-6/sprint-6.md`
14. `work-context/sprint-6/sprint-6-progress.md`
15. `work-context/sprint-6/sprint-6-audit.md`
16. `work-context/sprint-6/sprint-6-agent-prompt.md`
17. Prisma schema và migrations.
18. Backend Order, InteractionAlert, Checkout, FEFO, Payment và Invoice code.
19. Frontend POS, checkout và invoice UI.
20. Tests và fixtures liên quan.
21. Sprint 7 plan/audit documents nếu đã chuẩn bị.

Evidence priority:

1. `Jira/branch-on-jira.md`
2. Repository code và Git history
3. GitHub PR/merge evidence
4. Prisma schema và migrations
5. Supabase schema/data evidence
6. Local test/build evidence
7. Sprint documents
8. Jira status do Project Owner quản lý

---

# 3. Review rules

- Không triển khai feature mới trong Final Review.
- Không mở rộng sang Sprint 7 AI Copilot.
- Không đổi exact branch name.
- Không dùng Story/Epic branch để tích hợp code.
- Không tạo Story PR hoặc Epic PR.
- Không push trực tiếp vào `develop` hoặc `main`.
- Không merge `develop → main`.
- Không sửa Jira bằng AI.
- Không tự tạo Jira Bug Key.
- Không chạy destructive tests trên production hoặc demo database.
- Không báo PASS nếu có Blocking/High defect chưa xử lý.
- Không báo CI PASS.

Ghi đúng:

```text
CI = N/A — GitHub Actions chưa được cấu hình
Local Quality Gate evidence = PASS/FAIL
```

Nếu cần sửa defect:

```text
Project Owner cung cấp Jira Bug Key
→ exact Bug branch
→ sửa
→ local checks
→ PR vào develop
→ merge
→ chạy lại Final Review
```

---

# 4. Mandatory Final Review Gates

Final Review gồm 14 Gate:

1. Scope and dependency.
2. Exact branch and Jira mapping.
3. GitHub PR and merge evidence.
4. Repository baseline and scope integrity.
5. Checkout boundary and atomic transaction.
6. Order, permission and HIGH-alert validation.
7. FEFO allocation and inventory deduction.
8. Payment and Invoice consistency.
9. Idempotency and concurrency safety.
10. Rollback and failure preservation.
11. Prisma, migrations and Supabase evidence.
12. Backend/frontend behavior and security.
13. Tests and Local Quality Gate.
14. Story/Epic/Sprint completion and Sprint 7 handoff.

PASS yêu cầu:

```text
Mandatory Gates PASS = 14/14
Blocking findings = 0
High findings = 0
```

---

# 5. Gate 01 — Scope và dependency

Xác minh:

- [ ] Sprint 5 Final Review = PASS.
- [ ] Sprint 6 Audit đã PASS trước implementation.
- [ ] Latest remote `develop` chứa toàn bộ Sprint 6 changes.
- [ ] Phạm vi đúng `PAC-TASK-259 → PAC-TASK-290`.
- [ ] Có đúng 32 Task, 16 Story và 1 Business Epic.
- [ ] Không có Sprint 7 implementation bị kéo vào.
- [ ] Không có refund, return, partial payment hoặc online commerce ngoài scope.
- [ ] PostgreSQL quyết định checkout.
- [ ] AI/Neo4j không quyết định checkout.
- [ ] MedicineBatch vẫn là inventory source of truth.

Expected scope:

```text
PAC-TASK-259 → PAC-TASK-290
US-83 → US-98
PAC-EPIC-11
```

```text
Gate 01 = PASS / FAIL / BLOCKED
```

---

# 6. Gate 02 — Exact branch và Jira mapping

Canonical source:

```text
Jira/branch-on-jira.md
```

Expected:

```text
Task branches: 32
Story traceability branches: 16
Core Epic traceability branch: 1
Total canonical Sprint 6 branches: 49
```

First Task:

```text
Logical Task: PAC-TASK-259 / TASK-259
Jira Key: PAC-469
Exact branch:
feature/PAC-469-task-259-define-checkout-dto-and-validation-schema
```

Last Task:

```text
Logical Task: PAC-TASK-290 / TASK-290
Jira Key: PAC-500
Exact branch:
test/PAC-500-task-290-add-fefo-idempotency-and-rollback-tests
```

Checklist:

- [ ] 32/32 Task branches khớp canonical registry.
- [ ] 16/16 Story branches được đối chiếu cho traceability.
- [ ] Epic branch được đối chiếu cho traceability.
- [ ] Không có shortened/alternate branch.
- [ ] Không có duplicate branch.
- [ ] Commit message chứa Jira Key thật.
- [ ] PR head branch khớp exact Task/Bug branch.
- [ ] PR base là `develop`.
- [ ] Story/Epic branch không được dùng làm merge layer.

| Category | Expected | Verified | Result |
|---|---:|---:|---|
| Task | 32 | — | Pending |
| Story traceability | 16 | — | Pending |
| Epic traceability | 1 | — | Pending |
| **Total** | **49** | — | Pending |

```text
Gate 02 = PASS / FAIL / BLOCKED
```

---

# 7. Gate 03 — GitHub PR và merge evidence

Workflow chính thức:

```text
Task/Bug branch
→ PR vào develop
→ Local Quality Gate
→ merge vào develop
```

Checklist:

- [ ] Mỗi Task có PR hoặc evidence hợp lệ nếu Task không thay đổi repository.
- [ ] Source branch đúng.
- [ ] Base branch là `develop`.
- [ ] PR state là `MERGED`.
- [ ] Merge/squash SHA tồn tại.
- [ ] Thay đổi xuất hiện trên remote `develop`.
- [ ] Không có Story PR.
- [ ] Không có Epic PR.
- [ ] Không merge trực tiếp vào `main`.
- [ ] Không có duplicate PR tạo duplicate changes.
- [ ] Không còn open Sprint 6 Task/Bug PR.
- [ ] Không có unmerged blocking fix.

Summary:

| Metric | Expected | Actual |
|---|---:|---:|
| Completed Tasks | 32 | — |
| Applicable Task PRs merged | All | — |
| Open Sprint 6 PRs | 0 | — |
| Merge SHA verified | All applicable | — |

```text
Gate 03 = PASS / FAIL / BLOCKED
```

---

# 8. Gate 04 — Repository baseline và scope integrity

- [ ] Local `develop` đồng bộ `origin/develop`.
- [ ] Working tree sạch hoặc review evidence được giải thích.
- [ ] Không còn debug code.
- [ ] Không còn TODO/FIXME mang tính blocker.
- [ ] Không có `.env`, private key, token hoặc credential được track.
- [ ] Không có direct MedicineBatch quantity update path ngoài workflow hợp lệ.
- [ ] Không có endpoint payment/invoice tách rời làm phá transaction.
- [ ] Không có second checkout command path.
- [ ] Không có AI/Graph dependency trong checkout decision.
- [ ] Error response không lộ stack trace hoặc dữ liệu nhạy cảm.
- [ ] Backend authorization không chỉ dựa vào frontend hiding.
- [ ] API/DTO naming và contract nhất quán.

Commands:

```bash
git fetch --all --prune
git switch develop
git pull origin develop
git status --short
git log origin/develop --oneline -n 100
git diff <SPRINT_5_FINAL_DEVELOP_SHA>..origin/develop --stat
```

Sensitive review:

```bash
git ls-files | grep -E '(^|/)\.env($|\.)|\.pem$|\.p12$|(^|/)id_rsa$' || true
```

```text
Gate 04 = PASS / FAIL / BLOCKED
```

---

# 9. Gate 05 — Checkout boundary và atomic transaction

Checkout chính thức:

```text
POST /checkout
```

Required flow:

```text
Actor/ownership validation
→ Order DRAFT validation
→ unresolved HIGH validation
→ stock validation
→ FEFO allocation
→ allocation persistence
→ MedicineBatch deduction
→ Payment
→ Invoice
→ Order PAID
→ commit
```

Checklist:

- [ ] Có một CheckoutService command boundary chính thức.
- [ ] Controller gọi service, không chứa transaction logic.
- [ ] Các bước critical nằm trong một database transaction.
- [ ] Payment không được tạo trước stock/alert validation hợp lệ.
- [ ] Invoice không được tạo ngoài checkout transaction.
- [ ] Order chỉ chuyển PAID ở cuối success path.
- [ ] Không có partial commit.
- [ ] Transaction error được map an toàn.
- [ ] Checkout response có contract rõ.
- [ ] Request DTO validation hoạt động.
- [ ] Double submit không tạo duplicate side effects.

Required evidence:

```text
Successful checkout:
Order = PAID
Payment = SUCCESS
Invoice = created
Allocations = persisted
MedicineBatch = deducted exactly once
```

```text
Gate 05 = PASS / FAIL / BLOCKED
```

---

# 10. Gate 06 — Order, permission và HIGH-alert validation

## Order lifecycle

- [ ] Chỉ `DRAFT` được checkout.
- [ ] `PAID` không checkout lại.
- [ ] `CANCELLED` không checkout.
- [ ] OrderItem quantity hợp lệ.
- [ ] Order total được xác minh trong transaction.

## Authorization

- [ ] Staff chỉ checkout Order trong ownership scope.
- [ ] Admin theo permission đã chốt.
- [ ] Warehouse bị 403.
- [ ] Direct API call sai quyền bị chặn.
- [ ] Frontend hiding không thay backend guard.

## HIGH alert

- [ ] HIGH alert chưa acknowledgement thì checkout bị block.
- [ ] HIGH alert thiếu official consultation note thì checkout bị block.
- [ ] Note rỗng/whitespace không hợp lệ.
- [ ] LOW/MEDIUM không bị áp rule HIGH sai.
- [ ] Khi block không tạo Payment/Invoice/allocation.
- [ ] Order vẫn DRAFT.
- [ ] PostgreSQL InteractionAlert là source of truth.

Required scenarios:

| Scenario | Expected |
|---|---|
| Staff checkout order người khác | 403 |
| Warehouse checkout | 403 |
| Order PAID/CANCELLED | Reject |
| HIGH chưa acknowledge | Reject |
| HIGH thiếu note | Reject |
| HIGH resolved hợp lệ | Tiếp tục các gate khác |

```text
Gate 06 = PASS / FAIL / BLOCKED
```

---

# 11. Gate 07 — FEFO và inventory deduction

FEFO rules:

- exclude expired batches;
- exclude zero/non-sellable quantity;
- sort expiry gần nhất trước;
- deterministic tie-breaker;
- hỗ trợ multi-batch;
- không vượt available quantity;
- insufficient stock phải fail.

Checklist:

- [ ] FEFO service tách khỏi controller.
- [ ] Allocation output có medicine, batch và quantity.
- [ ] Expired batch không được chọn.
- [ ] Batch expiry gần nhất được chọn trước.
- [ ] Multi-batch allocation đúng.
- [ ] Manual override nếu được phép có validation/audit.
- [ ] Allocation được persist vào đúng Order/OrderItem.
- [ ] MedicineBatch deduction khớp allocation.
- [ ] Quantity không âm.
- [ ] Không deduct trước checkout.
- [ ] Không deduct hai lần.
- [ ] Insufficient stock rollback.
- [ ] Concurrent checkout không oversell.

Required scenarios:

```text
single batch allocation
multi-batch allocation
expired exclusion
zero quantity exclusion
insufficient stock
equal-expiry deterministic ordering
concurrent stock contention
```

```text
Gate 07 = PASS / FAIL / BLOCKED
```

---

# 12. Gate 08 — Payment và Invoice consistency

## Payment

- [ ] Cash payment validation đúng.
- [ ] `amount_received` hợp lệ.
- [ ] `change_amount` tính đúng.
- [ ] Simulated bank transfer có transaction reference nếu yêu cầu.
- [ ] Một Order chỉ có một SUCCESS Payment.
- [ ] Không partial payment.
- [ ] Không Payment ngoài checkout success.
- [ ] Payment failure rollback.

## Invoice

- [ ] Invoice tạo trong checkout transaction.
- [ ] Một checkout success có đúng một Invoice.
- [ ] Invoice number unique/stable.
- [ ] Total và line snapshots đúng.
- [ ] Invoice liên kết đúng Order/Payment.
- [ ] Invoice không tồn tại khi checkout fail.
- [ ] View/print invoice hoạt động sau checkout.
- [ ] Invoice UI không tạo lại transaction.

Required invariants:

```text
1 PAID Order
→ exactly 1 SUCCESS Payment
→ exactly 1 Invoice
→ matching totals
```

```text
Gate 08 = PASS / FAIL / BLOCKED
```

---

# 13. Gate 09 — Idempotency và concurrency

Checklist:

- [ ] Checkout nhận/derive idempotency key theo contract.
- [ ] Cùng key + cùng request không tạo duplicate effect.
- [ ] Cùng key + payload xung đột bị reject an toàn.
- [ ] Success result có thể replay nhất quán.
- [ ] Failed request không khóa key sai vĩnh viễn.
- [ ] Idempotency không bypass permission/status validation.
- [ ] Unique constraint hoặc atomic claim strategy tồn tại.
- [ ] Concurrent duplicate requests không tạo hai Payment.
- [ ] Concurrent stock requests không oversell.
- [ ] Retry sau network interruption trả kết quả đúng.
- [ ] Tests cho same-key và concurrent requests PASS.

Required scenarios:

```text
same key / same payload
same key / different payload
parallel same request
retry after success
retry after rollback
two orders competing for same final stock
```

```text
Gate 09 = PASS / FAIL / BLOCKED
```

---

# 14. Gate 10 — Rollback và failure preservation

Mọi failure phải đảm bảo:

```text
Order remains DRAFT
No batch deduction
No allocation persistence
No SUCCESS Payment
No Invoice
No partial state
```

Checklist:

- [ ] Invalid order rollback.
- [ ] Unresolved HIGH rollback.
- [ ] Insufficient stock rollback.
- [ ] FEFO/allocation failure rollback.
- [ ] Payment validation failure rollback.
- [ ] Simulated payment failure rollback.
- [ ] Invoice creation failure rollback.
- [ ] Database error rollback.
- [ ] Duplicate/idempotency conflict không tạo side effects.
- [ ] Draft Order vẫn có thể sửa/thử lại.
- [ ] Error response an toàn và actionable.
- [ ] Rollback tests kiểm tra database state, không chỉ status code.

```text
Gate 10 = PASS / FAIL / BLOCKED
```

---

# 15. Gate 11 — Prisma, migration và Supabase

Expected persistent scope có thể gồm:

```text
Checkout/idempotency records
OrderBatchAllocation
Payment
Invoice
InvoiceItem or snapshot fields
related enums/constraints/indexes
```

Checklist:

- [ ] Prisma schema hợp lệ.
- [ ] Migration files có trong Git.
- [ ] Migration history nhất quán.
- [ ] Không có schema drift không giải thích.
- [ ] Migration additive hoặc có rollback plan.
- [ ] Không drop/rename dữ liệu ngoài phê duyệt.
- [ ] Unique constraints hỗ trợ one SUCCESS Payment/idempotency.
- [ ] Foreign keys và indexes phù hợp.
- [ ] Decimal/money precision đúng.
- [ ] Supabase environment dùng để verify là an toàn.
- [ ] Controlled success transaction được xác minh.
- [ ] Controlled rollback được xác minh.
- [ ] Không chạy destructive test trên demo/production.
- [ ] Test fixtures được cleanup.

Commands theo repository thực tế:

```text
Prisma validate
Prisma generate
migration status/check
targeted database tests
```

Không tự đoán script nếu chưa kiểm tra `package.json`.

```text
Gate 11 = PASS / FAIL / BLOCKED
```

---

# 16. Gate 12 — Backend, frontend và security behavior

## Backend

- [ ] DTO validation.
- [ ] AuthGuard/PermissionGuard.
- [ ] Ownership enforcement.
- [ ] Transaction service.
- [ ] Domain errors chuẩn hóa.
- [ ] No secret/PII logging.
- [ ] Audit metadata phù hợp.
- [ ] API response không expose internal fields không cần thiết.

## Frontend

- [ ] Checkout page/panel dùng API chính thức.
- [ ] Loading và double-submit protection.
- [ ] Validation errors hiển thị rõ.
- [ ] HIGH blocker hiển thị đúng.
- [ ] Checkout fail giữ Draft Order.
- [ ] Success hiển thị receipt/invoice.
- [ ] Cash change hiển thị đúng.
- [ ] Warehouse không thấy checkout action.
- [ ] UI không tự deduct inventory hoặc tạo payment riêng.
- [ ] Refresh sau success không tạo checkout lần hai.

## Security

- [ ] Không có direct payment/invoice creation từ client.
- [ ] Không tin total/price/batch allocation do client tự gửi.
- [ ] Backend tính và validate dữ liệu critical.
- [ ] Không lộ stack trace, database detail hoặc secret.
- [ ] Không có authorization bypass.

```text
Gate 12 = PASS / FAIL / BLOCKED
```

---

# 17. Gate 13 — Tests và Local Quality Gate

GitHub Actions:

```text
CI = N/A — GitHub Actions chưa được cấu hình
```

## Required Sprint regression

- [ ] Backend lint PASS.
- [ ] Backend typecheck PASS.
- [ ] Backend build PASS.
- [ ] Frontend lint PASS.
- [ ] Frontend typecheck PASS.
- [ ] Frontend build PASS.
- [ ] Checkout integration tests PASS.
- [ ] Order status tests PASS.
- [ ] Permission/ownership tests PASS.
- [ ] HIGH-alert blocker tests PASS.
- [ ] FEFO unit tests PASS.
- [ ] FEFO multi-batch tests PASS.
- [ ] Expired-batch exclusion tests PASS.
- [ ] Stock-insufficient tests PASS.
- [ ] Payment tests PASS.
- [ ] One-SUCCESS-Payment tests PASS.
- [ ] Invoice tests PASS.
- [ ] Idempotency tests PASS.
- [ ] Concurrency tests PASS hoặc documented safe verification.
- [ ] Rollback tests PASS.
- [ ] Prisma validate/generate PASS.
- [ ] Supabase controlled verification PASS.
- [ ] POS/Checkout manual smoke PASS.

## Local Quality Gate evidence

- [ ] 32/32 Task Local Quality Gates PASS.
- [ ] N/A values có lý do hợp lệ.
- [ ] Không có check bắt buộc bị bỏ qua.
- [ ] Không có secret trong diff.
- [ ] Không có unreviewed out-of-scope file.
- [ ] Full test result được ghi với command và exit status.

```text
Gate 13 = PASS / FAIL / BLOCKED
```

---

# 18. Gate 14 — Completion, defects và Sprint 7 handoff

## Task completion

- [ ] 32/32 Task hoàn thành.
- [ ] Mọi applicable Task PR merged vào `develop`.
- [ ] Không còn open Sprint 6 Task/Bug PR.
- [ ] Exact branch/commit/PR/merge evidence đầy đủ.

## Story review

- [ ] 16/16 Story Acceptance Reviews PASS.
- [ ] Story reviews chạy trên latest `develop`.
- [ ] Không tạo Story PR.
- [ ] Không merge qua Story branch.

## Epic review

- [ ] PAC-EPIC-11 Integration/Regression Review PASS.
- [ ] Epic review chạy trên latest `develop`.
- [ ] Không tạo Epic PR.
- [ ] Không merge qua Epic branch.

## Defects

- [ ] Blocking defect = 0.
- [ ] High defect = 0.
- [ ] Không có unresolved data-integrity defect.
- [ ] Không có unresolved oversell/idempotency defect.
- [ ] Không có unresolved checkout safety defect.

## Documentation

- [ ] `sprint-6-progress.md` được cập nhật theo workflow chính thức.
- [ ] `WORKING-CONTEXT.md` được cập nhật.
- [ ] Không còn nội dung cũ yêu cầu Task → Story → Epic PR.
- [ ] Jira manual update queue được chuẩn bị.
- [ ] Sprint 7 dependency handoff được ghi.

## Sprint 7 readiness

Sprint 7 cần tối thiểu:

```text
InteractionAlert context stable
HIGH acknowledgement stable
Official consultation note stable
Checkout unresolved-HIGH blocker stable
Order ownership stable
Manual consultation-note flow works without AI
```

```text
Gate 14 = PASS / FAIL / BLOCKED
```

---

# 19. Findings Register

Severity:

```text
Blocker
High
Medium
Low
Observation
```

| Finding ID | Gate | Severity | Finding | Evidence | Required action | Status |
|---|---|---|---|---|---|---|
| S6-FR-001 | — | — | Chưa có | — | — | Open |

Rules:

- Blocker/High làm Final Review FAIL hoặc BLOCKED.
- Medium/Low phải ghi tác động và remediation.
- Observation không phải defect.
- Không xóa finding; chỉ cập nhật status/evidence.

---

# 20. Bug Candidate Register

AI không tự tạo Jira Bug Key.

| Candidate ID | Severity | Affected Task/Story | Summary | Evidence | Needs Jira Bug Key | Status |
|---|---|---|---|---|---|---|
| S6-FR-BUG-001 | — | — | Chưa có | — | No | Open |

Mẫu:

```text
Bug Candidate:
Severity:
Affected Task/Story:
Steps to Reproduce:
Actual:
Expected:
Evidence:
Project Owner decision required: Yes/No
```

---

# 21. Final decision rules

## PASS

Chỉ PASS khi:

```text
14/14 Mandatory Gates PASS
32/32 Tasks verified
16/16 Story Reviews PASS
PAC-EPIC-11 Review PASS
All applicable PRs merged into develop
Checkout transaction PASS
HIGH blocker PASS
FEFO PASS
Payment PASS
Invoice PASS
Idempotency PASS
Concurrency safety PASS
Rollback PASS
Prisma/Supabase PASS
Blocking defects = 0
High defects = 0
```

Kết quả:

```text
Sprint 6 Final Review = PASS
Ready for Sprint 7 = Yes
```

## FAIL

Dùng khi implementation/test không đạt nhưng có thể sửa:

```text
Sprint 6 Final Review = FAIL
Ready for Sprint 7 = No
Failed Gates:
Required fixes:
```

## BLOCKED

Dùng khi không thể kiểm chứng vì thiếu quyền, môi trường hoặc evidence:

```text
Sprint 6 Final Review = BLOCKED
Ready for Sprint 7 = No
Blocking reason:
Required owner action:
```

Không được PASS với:

- test chưa chạy;
- applicable PR chưa merge;
- branch sai;
- transaction chưa verify;
- Supabase rollback chưa verify;
- idempotency/concurrency chưa verify;
- Blocking/High defect còn mở.

---

# 22. Final report format

```markdown
# Sprint 6 Final Review Report

## Decision

Sprint 6 Final Review = PASS/FAIL/BLOCKED
Ready for Sprint 7 = Yes/No

## Scope

- Tasks verified: x/32
- Stories reviewed: x/16
- Epic reviewed: x/1
- Branches reconciled: x/49
- Applicable PRs merged: x/x
- Open Sprint 6 PRs: x

## Gate Results

1. Scope/dependency: PASS/FAIL/BLOCKED
2. Branch/Jira mapping: PASS/FAIL/BLOCKED
3. GitHub PR/merge evidence: PASS/FAIL/BLOCKED
4. Repository baseline: PASS/FAIL/BLOCKED
5. Checkout transaction: PASS/FAIL/BLOCKED
6. Order/permission/HIGH alerts: PASS/FAIL/BLOCKED
7. FEFO/inventory: PASS/FAIL/BLOCKED
8. Payment/Invoice: PASS/FAIL/BLOCKED
9. Idempotency/concurrency: PASS/FAIL/BLOCKED
10. Rollback: PASS/FAIL/BLOCKED
11. Prisma/Supabase: PASS/FAIL/BLOCKED
12. Backend/frontend/security: PASS/FAIL/BLOCKED
13. Tests/Local Quality Gate: PASS/FAIL/BLOCKED
14. Completion/defects/handoff: PASS/FAIL/BLOCKED

## Key Evidence

- develop SHA:
- Representative PRs:
- Checkout transaction:
- HIGH-alert blocker:
- FEFO:
- Payment:
- Invoice:
- Idempotency:
- Concurrency:
- Rollback:
- Prisma/migration:
- Supabase:
- Local tests/build:

## Findings

- Blocking:
- High:
- Medium:
- Low:
- Observations:

## Required Actions

- None / list actions

## Sprint 7 Handoff

- Next Sprint: Sprint 7
- Scope: AI Copilot, Google AI, MockAI, Guardrail, Audit, Prompt Versioning
- Task range: PAC-TASK-291 → PAC-TASK-355
- First Logical Task: PAC-TASK-291 / TASK-291
- Jira Key: PAC-501
- Exact branch:
  feature/PAC-501-task-291-define-ai-provider-abstraction
- Sprint 7 Audit may start: Yes/No
- Sprint 7 implementation may start: No — requires Sprint 7 Audit PASS 17/17
```

---

# 23. Sprint 7 handoff

Chỉ khi:

```text
Sprint 6 Final Review = PASS
Ready for Sprint 7 = Yes
```

Handoff:

```text
Sprint 7 scope:
AI Copilot
Google AI primary
MockAI fallback
Input/Output Guardrail
PII minimization
AI Audit
Prompt Versioning

Task range:
PAC-TASK-291 → PAC-TASK-355

First Task:
PAC-TASK-291 / TASK-291

Jira Key:
PAC-501

Exact branch:
feature/PAC-501-task-291-define-ai-provider-abstraction
```

Thứ tự đúng:

```text
Sprint 6 Final Review PASS
→ Sprint 7 Audit
→ Sprint 7 Audit PASS 17/17
→ Sprint 7 implementation
```

Final Reviewer không được bắt đầu Sprint 7 implementation trong cùng phiên review.

---

# 24. Start instruction

Bắt đầu Final Review theo thứ tự:

1. Đọc toàn bộ tài liệu bắt buộc.
2. Xác minh remote `develop`.
3. Đối chiếu 32 Task, 16 Story, 1 Epic và 49 exact branch.
4. Kiểm tra PR/merge evidence.
5. Review checkout transaction boundary.
6. Verify Order/permission/HIGH alert gates.
7. Verify FEFO và inventory deduction.
8. Verify Payment và Invoice.
9. Verify idempotency và concurrency.
10. Verify rollback.
11. Verify Prisma/Supabase.
12. Chạy local tests/builds.
13. Kiểm tra open defects.
14. Cập nhật Findings Register.
15. Xuất Final Review Report.
16. Chỉ ghi `Ready for Sprint 7 = Yes` khi 14/14 Gates PASS.
17. Không merge `develop → main`.
