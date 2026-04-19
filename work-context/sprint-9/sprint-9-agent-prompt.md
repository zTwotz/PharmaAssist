# Sprint 9 AI Agent Prompt — PharmaAssist AI Intelligence

> **Skill-aware execution prompt**
>
> Repository path:
>
> `work-context/sprint-9/sprint-9-agent-prompt.md`
>
> Chỉ chạy sau khi Sprint 8 Final Review và Sprint 9 Audit đều PASS.

---

# 1. Vai trò và mục tiêu

Bạn là AI Coding Agent chính của Sprint 9.

```text
Sprint:
Sprint 9 — Graph-RAG, PostgreSQL Fallback, Reports & System Settings

Tasks:
PAC-TASK-391 → PAC-TASK-424

Task count:
34

Stories:
US-129 → US-141 và US-144

Story count:
14

Core Epics:
PAC-EPIC-15
PAC-EPIC-16
PAC-EPIC-17

Task Jira range:
PAC-601 → PAC-634

CI:
N/A — GitHub Actions chưa được cấu hình

Merge gate:
Local Quality Gate
```

Mục tiêu thực thi:

```text
chọn skill phù hợp
→ đọc acceptance criteria
→ code
→ test
→ commit
→ push
→ PR vào develop
→ merge khi Local Quality Gate PASS
→ verify remote develop
→ cập nhật progress
→ tiếp tục Task kế tiếp
```

Không dừng sau khi chỉ lập kế hoạch nếu Authorization Gate đã PASS.

---

# 2. Authorization Gate

Chỉ bắt đầu code khi:

```text
Sprint 8 Final Review = PASS
Ready for Sprint 9 = Yes

Sprint 9 Audit = PASS
Mandatory Gates PASS = 18/18
Ready to implement Sprint 9 = Yes

34/34 exact Task branches = Verified
14/14 exact Story branches = Verified
3/3 Core Epic branches = Verified

PostgreSQL/Supabase environment = Safe
Neo4j AuraDB environment = Safe
AI safety/provider baseline = Stable
Graph Sync/freshness baseline = Stable

Blocking findings = 0
High findings = 0
```

Nếu thiếu bất kỳ điều kiện nào:

```text
Không sửa production code
Không apply migration Sprint 9
Không tự tạo branch
Không dùng branch gần giống
Không bắt đầu Graph-RAG
Cập nhật audit/progress với blocker thật
Dừng ở trạng thái BLOCKED
```

---

# 3. Tài liệu bắt buộc

Đọc:

```text
AGENTS.md
.agents/rules/rules-w-pharmaassist.md
WORKING-CONTEXT.md
DESIGN.md
Jira/branch-on-jira.md
Jira/jira-mapping.md
Jira/3_Stories.md
Jira/4C_Task_List_MVP_AI_Graph_Report_Demo_291_435.md
Jira/4C_Task_Description_MVP_AI_Graph_Report_Demo_291_435.md
work-context/sprint-8/sprint-8-final-review-report.md
work-context/sprint-9/sprint-9.md
work-context/sprint-9/sprint-9-progress.md
work-context/sprint-9/sprint-9-audit.md
```

`Jira/branch-on-jira.md` là nguồn duy nhất cho Jira Key và exact branch.

---

# 4. Skill Routing

Không gọi toàn bộ skill cho mọi Task. Chọn nhóm nhỏ nhất đủ dùng.

Mọi Task code luôn tuân thủ:

```text
karpathy-principles
```

Chọn thêm:

```text
Graph-RAG / NestJS / service / controller:
ecc-backend + tdd

Neo4j / Cypher / source selection:
ecc-backend + ecc-database + ecc-security + tdd

PostgreSQL fallback / Prisma / migration:
ecc-database + ecc-security + tdd

Reports:
ecc-backend + ecc-database + ecc-testing

Frontend:
ecc-frontend + modern-web-guidance + design-system-guide + ecc-testing

Debug / race / flaky test:
mattpocock-engineering + ecc-testing + tdd

Git / commit / PR:
git-github

Task nhiều module:
writing-plans hoặc superpowers-workflow

Progress / handoff:
mattpocock-productivity
```

Trước mỗi Task, báo ngắn:

```text
Skills selected:
- ...
- ...

Reason:
...
```

Không dùng `brainstorming` để trì hoãn Task đã có spec rõ.

---

# 5. Task bắt đầu

Technical order bắt đầu với:

```text
Logical Task:
PAC-TASK-392 / TASK-392

Jira Key:
PAC-602

Exact branch:
feature/PAC-602-task-392-build-allowlisted-graph-query-templates
```

Kiểm tra branch đã tồn tại:

```bash
git fetch --all --prune
git branch -r --list "origin/feature/PAC-602-task-392-build-allowlisted-graph-query-templates"
```

Nếu không tồn tại:

```text
Dừng
Không chạy git switch -c
Không chạy git checkout -b
Không tạo branch thay thế
Không sửa branch slug
Báo blocker cho Project Owner
```

---

# 6. Technical Execution Order

## Phase 1 — Query Security and Context Foundation

```text
PAC-TASK-392
→ PAC-TASK-393
→ PAC-TASK-394
→ PAC-TASK-395
→ PAC-TASK-391
```

## Phase 2 — Provenance and Freshness

```text
PAC-TASK-396
→ PAC-TASK-397
→ PAC-TASK-398
→ PAC-TASK-399
```

## Phase 3 — Fallback and Safety Guards

```text
PAC-TASK-400
→ PAC-TASK-401
→ PAC-TASK-402
→ PAC-TASK-403
→ PAC-TASK-404
→ PAC-TASK-405
```

## Phase 4 — Graph-RAG UI and Tests

```text
PAC-TASK-406
→ PAC-TASK-407
→ PAC-TASK-408
→ PAC-TASK-409
→ PAC-TASK-410
```

## Phase 5 — Deterministic Reports

```text
PAC-TASK-411
→ PAC-TASK-414
→ PAC-TASK-416
→ PAC-TASK-419
→ PAC-TASK-413
→ PAC-TASK-412
→ PAC-TASK-415
→ PAC-TASK-417
→ PAC-TASK-418
```

## Phase 6 — System Settings

```text
PAC-TASK-420
→ PAC-TASK-421
→ PAC-TASK-422
→ PAC-TASK-423
→ PAC-TASK-424
```

Technical order không thay đổi Logical Task, Jira Key hoặc exact branch.

---

# 7. Graph-RAG Rules

## Source of truth

- PostgreSQL là source of truth.
- Neo4j chỉ là read projection/context.
- Graph-RAG chỉ giải thích.
- Graph-RAG không tạo hoặc sửa DrugInteractionRule.
- Graph-RAG không quyết định checkout.

## Allowlisted queries

Chỉ dùng allowlisted, parameterized templates:

```text
Medicine
→ CONTAINS
→ ActiveIngredient

ActiveIngredient
→ INTERACTS_WITH
→ ActiveIngredient
```

Không:

- expose generic raw Cypher endpoint;
- nhận raw Cypher từ Staff;
- nối raw input vào Cypher;
- trả internal Cypher cho frontend.

## Source selection

```text
Graph available + FRESH
→ use Neo4j
→ graphUsed=true

Graph unavailable/stale/missing
→ use PostgreSQL fallback
→ graphUsed=false
→ degraded/freshness warning

Graph-only query + no fallback
→ safe error
→ no fabricated data
```

## Response metadata

Response phải có semantics tương đương:

```text
answer/explanation
graphUsed
degraded
sourceType
provenance
freshness.status
freshness.reason
fallbackReason
disclaimer
requestId/audit reference
```

## AI safety

Graph context phải tiếp tục qua:

```text
input guardrail
PII minimization
provider abstraction
structured output validation
output guardrail
AI Audit
```

Không bypass Sprint 7 controls.

---

# 8. Checkout and Medical Safety

Không được:

- dùng graph/AI làm checkout authorization;
- unlock unresolved HIGH alert;
- acknowledge HIGH alert bằng Graph-RAG;
- tự lưu official consultation note;
- chẩn đoán;
- kê đơn;
- đưa dosage advice.

Required invariant:

```text
Graph/AI response
≠ checkout decision source
```

Neo4j unavailable hoặc stale không được thay đổi checkout behavior.

---

# 9. Reports Rules

## Revenue

- Chỉ PAID orders.
- Exclude DRAFT, CANCELLED và failed payment.
- Không double-count payment.
- Date filters phải validate.
- Calculation deterministic.
- AI không tính doanh thu.

## Top Medicines

- Chỉ dữ liệu PAID.
- Aggregation source rõ.
- Ranking deterministic.
- Historical sales không mất khi medicine inactive.

## Inventory

- MedicineBatch là source of truth.
- Expired batch không thuộc sellable quantity.
- Near-expiry dùng System Setting.
- Staff không nhận inventory-wide permission ngoài baseline.

---

# 10. System Settings Rules

Expected scope:

```text
nearExpiryThresholdDays
default = 90
Admin-only update
```

Bắt buộc:

- integer;
- > 0;
- bounded maximum;
- unique setting key;
- safe default/seed;
- existing near-expiry calculation đọc setting;
- không hard-code threshold ở nhiều module;
- không kéo AI Provider/Prompt Settings UI vào Sprint 9.

---

# 11. Workflow mỗi Task

```text
pull latest develop
→ xác minh exact branch tồn tại
→ checkout exact branch
→ đọc Task + Acceptance Criteria
→ chọn skill
→ viết test trước khi code khi phù hợp
→ code tối thiểu đúng scope
→ chạy targeted checks
→ Prisma/Supabase/Neo4j/AI verification khi cần
→ review diff, secret, raw Cypher và deterministic logic
→ commit
→ push
→ tạo PR vào develop
→ Local Quality Gate
→ merge vào develop
→ verify merge SHA
→ cập nhật sprint-9-progress.md
→ tiếp tục Task kế tiếp
```

Lệnh chuẩn bị:

```bash
git fetch --all --prune
git switch develop
git pull origin develop
git branch -r --list "origin/<EXACT_TASK_BRANCH>"
git switch <EXACT_TASK_BRANCH>
```

Nếu exact branch thiếu, dừng và báo blocker.

---

# 12. Testing

Không tự đoán command. Đọc `package.json`.

Task-level checks phù hợp:

```text
lint
typecheck
targeted unit tests
targeted integration/E2E tests
build
Prisma validate/generate
controlled Supabase verification
controlled Neo4j verification
AI guardrail/audit regression
```

Graph-RAG tests:

- allowlisted query;
- parameterized query;
- fresh graph path;
- unavailable fallback;
- stale fallback;
- missing projection fallback;
- graph-only safe error;
- `graphUsed`;
- provenance;
- freshness warning;
- raw Cypher rejection;
- checkout independence.

Reports tests:

- PAID-only revenue;
- DRAFT/CANCELLED/failed payment exclusion;
- date filters;
- Top Medicines aggregation;
- Inventory from MedicineBatch;
- expired exclusion;
- permissions;
- UI states.

Settings tests:

- default 90;
- valid update;
- invalid values;
- Admin permission;
- unauthorized rejection;
- near-expiry integration;
- migration/seed safety.

---

# 13. Local Quality Gate

GitHub Actions chưa được cấu hình.

Ghi:

```text
CI = N/A — GitHub Actions chưa được cấu hình
Local Quality Gate = PASS/FAIL
```

Chỉ merge khi:

1. Exact branch và Jira Key đúng.
2. Acceptance Criteria hoàn thành.
3. PR target `develop`.
4. Diff đúng scope.
5. Relevant tests PASS.
6. Lint/typecheck/build PASS hoặc N/A hợp lệ.
7. Prisma validate/generate PASS khi liên quan.
8. Supabase/Neo4j verification PASS hoặc N/A hợp lệ.
9. AI safety regression PASS khi liên quan.
10. Report deterministic checks PASS khi liên quan.
11. Không secret.
12. Không raw Cypher exposure.
13. Không destructive query.
14. Không conflict.
15. GitHub báo mergeable.

Nếu FAIL:

```text
Không merge
Sửa trên cùng exact branch
Chạy lại checks
Push lại
Chỉ merge khi PASS
```

---

# 14. Git, Commit and PR

Dùng:

```text
git-github
```

Commit format:

```text
<type>(<scope>): <JIRA-KEY> <short English message>
```

Ví dụ:

```text
feat(graph-rag): PAC-602 add allowlisted graph query templates
```

PR:

```text
Task/Bug branch → develop
```

Không:

- push trực tiếp `develop`;
- push trực tiếp `main`;
- tạo Story PR;
- tạo Epic PR;
- tự tạo replacement branch;
- merge `develop → main`.

Sau merge:

```bash
git fetch origin
git log origin/develop --oneline -n 20
```

---

# 15. Jira and Bug Workflow

Jira do Project Owner quản lý.

AI không:

- đổi Jira status;
- comment Jira;
- tạo Jira Bug Key;
- dùng Jira connectivity làm implementation gate.

AI chỉ ghi:

```text
Recommended Jira status = DONE
```

Bug ngoài scope:

```text
Bug Candidate:
Severity:
Affected Task/Story:
Actual:
Expected:
Evidence:
```

Chỉ sửa qua Bug branch sau khi Project Owner cung cấp Jira Bug Key thật.

---

# 16. Báo cáo sau mỗi Task

Chỉ báo hoàn thành sau khi PR đã merge và remote `develop` chứa thay đổi.

```text
✅ Hoàn thành [PAC-TASK-xxx] — [Tên Task]

Skills used:
- ...

Đã làm:
Kiểm tra:
PostgreSQL/Supabase:
Neo4j:
AI/Guardrail:
Branch:
Commit:
PR:
Merge SHA:
Local Quality Gate: PASS
CI: N/A — GitHub Actions chưa được cấu hình
Jira đề xuất: DONE
Tiếp theo:
```

Nếu bị chặn:

```text
📌 [PAC-TASK-xxx] chưa hoàn thành

Trạng thái:
Blocker:
Evidence:
Owner action:
Bước tiếp theo:
```

---

# 17. Progress and Reviews

Cập nhật `sprint-9-progress.md` khi:

- Task PR merge;
- Task bị blocker;
- có Graph-RAG/fallback/report/settings evidence;
- Story Review hoàn tất;
- Epic Review hoàn tất;
- kết thúc phiên;
- Sprint Final Review hoàn tất.

Không tạo documentation-only PR sau từng Task chỉ để ghi SHA.

Story Review:

```text
mọi Task của Story đã merge
→ latest develop
→ Acceptance Review
→ PASS/FAIL
```

Không tạo Story PR.

Epic Reviews:

```text
PAC-EPIC-15 — Graph-RAG Integration/Regression Review
PAC-EPIC-16 — Reports Deterministic Review
PAC-EPIC-17 — System Settings Review
```

Không tạo Epic PR.

---

# 18. Điều kiện dừng

Dừng khi:

- Authorization Gate chưa PASS;
- exact branch không tồn tại;
- Supabase hoặc Neo4j environment không an toàn;
- migration có nguy cơ mất dữ liệu;
- destructive Cypher/query risk;
- raw Cypher security blocker;
- Graph-RAG có thể ảnh hưởng checkout;
- report calculation không deterministic;
- cần Jira Bug Key;
- GitHub không cho tạo/merge PR;
- required checks không PASS;
- hết giới hạn phiên;
- Sprint 9 Final Review hoàn tất.

Cuối phiên:

1. Cập nhật `sprint-9-progress.md`.
2. Cập nhật `WORKING-CONTEXT.md`.
3. Ghi Task hiện tại và Task tiếp theo.
4. Ghi PR, merge SHA và evidence.
5. Không tuyên bố Sprint hoàn thành nếu Final Review chưa PASS.

---

# 19. Definition of Done

```text
34/34 Tasks verified
14/14 Story Acceptance Reviews PASS
3/3 Core Epic Reviews PASS

Allowlisted Graph-RAG PASS
Provenance/freshness PASS
PostgreSQL fallback PASS
Raw Cypher guard PASS
Graph-not-checkout guard PASS
AI safety/audit regression PASS

Revenue/Top Medicines/Inventory Reports PASS
System Settings model/default/API/UI/tests PASS

Prisma/Supabase/Neo4j PASS
Blocking defects = 0
High defects = 0

Sprint 9 Final Review = PASS
Ready for Sprint 10 = Yes
```

---

# 20. Start Instruction

Thực hiện:

1. Đọc tài liệu bắt buộc.
2. Xác minh Sprint 8 Final Review PASS.
3. Xác minh Sprint 9 Audit PASS 18/18.
4. Xác minh latest `develop`.
5. Xác minh safe Supabase, Neo4j và AI baseline.
6. Xác minh exact branch của Task đầu tiên.
7. Xác minh branch tồn tại trên remote.
8. Chọn skill phù hợp.
9. Bắt đầu `PAC-TASK-392 / PAC-602`.
10. Code, test, commit, push và PR vào `develop`.
11. Merge chỉ khi Local Quality Gate PASS.
12. Verify merge SHA.
13. Cập nhật progress.
14. Tiếp tục technical order.
15. Dừng trước `develop → main`.

First technical Task:

```text
PAC-TASK-392
PAC-602
feature/PAC-602-task-392-build-allowlisted-graph-query-templates
```

Last Task:

```text
PAC-TASK-424
PAC-634
test/PAC-634-task-424-add-system-settings-validation-and-tests
```
