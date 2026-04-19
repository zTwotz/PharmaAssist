# Sprint 8 AI Agent Prompt — PharmaAssist AI Intelligence

> **Prompt thực thi dành cho AI Coding Agent**
>
> Repository path:
>
> `work-context/sprint-8/sprint-8-agent-prompt.md`
>
> Chỉ chạy sau khi Sprint 7 Final Review và Sprint 8 Audit đều PASS.

---

# 1. Vai trò và phạm vi

Bạn là AI Coding Agent chính của Sprint 8.

```text
Sprint:
Sprint 8 — Graph Sync, Neo4j Projection & Freshness Detection

Tasks:
PAC-TASK-356 → PAC-TASK-390

Task count:
35

Stories:
US-117 → US-128

Story count:
12

Core Epic:
PAC-EPIC-14 — Graph Sync & Neo4j Projection

Canonical Task Jira range:
PAC-566 → PAC-600

PostgreSQL:
Source of truth

Neo4j:
Read projection

Runtime:
Backend Neo4j driver/service

MCP:
Optional development/admin tooling only

CI:
N/A — GitHub Actions chưa được cấu hình

Merge gate:
Local Quality Gate
```

Mục tiêu:

```text
PostgreSQL source transaction
→ GraphSyncOutbox
→ worker claim
→ Neo4j projection
→ retry/failure evidence
→ freshness detection
```

Tập trung vào:

```text
code
→ test
→ commit
→ push
→ PR vào develop
→ merge khi Local Quality Gate PASS
→ verify remote develop
→ tiếp tục Task kế tiếp
```

---

# 2. Authorization Gate

Chỉ bắt đầu code khi:

```text
Sprint 7 Final Review = PASS
Ready for Sprint 8 = Yes

Sprint 8 Audit status = Completed
Mandatory Gates PASS = 18/18
Ready to implement Sprint 8 = Yes
Blocking findings = None

Latest develop = Stable
35/35 exact Task branches = Verified
12/12 exact Story branches = Verified
1/1 Core Epic branch = Verified

GitHub access = Connected
Supabase/PostgreSQL environment = Safe
Neo4j AuraDB environment = Safe
Open Blocking Technical Defects = 0
```

Nếu chưa đủ:

```text
Không sửa production code
Không tạo/apply Sprint 8 migration
Không ghi dữ liệu thử nghiệm không kiểm soát lên AuraDB
Không tự tạo branch mới
Không tạo branch gần giống để thay thế
Không chỉnh sửa exact branch
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
Jira/5_Sprint.md
work-context/sprint-8/sprint-8.md
work-context/sprint-8/sprint-8-progress.md
work-context/sprint-8/sprint-8-audit.md
```

`Jira/branch-on-jira.md` là nguồn duy nhất cho Jira Key và exact branch.

---

# 4. Task bắt đầu

```text
Logical Task:
PAC-TASK-356 / T-356

Jira Key:
PAC-566

Exact branch:
feature/PAC-566-task-356-create-graph-sync-outbox-prisma-model
```

Kiểm tra branch đã tồn tại:

```bash
git fetch --all --prune
git branch -r --list "origin/feature/PAC-566-task-356-create-graph-sync-outbox-prisma-model"
```

Nếu không tồn tại:

```text
Dừng
Không chạy git switch -c
Không chạy git checkout -b
Không tạo branch từ develop
Không tự sửa slug
Báo blocker cho Project Owner
```

---

# 5. Thứ tự triển khai

## Phase 1 — Transactional Outbox

```text
PAC-TASK-356 → PAC-TASK-361
```

## Phase 2 — Neo4j Connection, Worker and Claiming

```text
PAC-TASK-362 → PAC-TASK-365
```

## Phase 3 — Projection and Active-data Semantics

```text
PAC-TASK-366 → PAC-TASK-375
PAC-TASK-380
```

## Phase 4 — Retry and Failure Evidence

```text
PAC-TASK-376 → PAC-TASK-379
```

## Phase 5 — Freshness Detection

```text
PAC-TASK-381 → PAC-TASK-384
```

## Phase 6 — Tests and Traceability

```text
PAC-TASK-385 → PAC-TASK-390
```

Giữ nguyên Logical Task, Jira Key và exact branch.

---

# 6. Kiến trúc bắt buộc

## PostgreSQL source of truth

- Medicine, ActiveIngredient, mapping và DrugInteractionRule authoritative nằm ở PostgreSQL.
- Neo4j chỉ là projection.
- Neo4j không ghi ngược nghiệp vụ vào PostgreSQL.
- POS, Interaction Check và Checkout không phụ thuộc Neo4j.

## Transactional outbox

Không làm:

```text
save PostgreSQL
→ gọi Neo4j trực tiếp
```

Phải làm:

```text
source change + outbox event
→ cùng PostgreSQL transaction
→ worker xử lý sau commit
```

## Runtime và MCP

- Runtime dùng backend Neo4j driver/service.
- MCP chỉ hỗ trợ inspect/admin/development.
- Ứng dụng không phụ thuộc MCP để chạy.

## Secret

Neo4j URI, username và password chỉ ở backend environment.

Không:

- commit Git;
- lưu database;
- trả frontend;
- in log;
- ghi progress/audit evidence.

---

# 7. Graph Model

```text
(Medicine)-[:CONTAINS]->(ActiveIngredient)

(ActiveIngredient)-[:INTERACTS_WITH]->(ActiveIngredient)
```

Identity:

```text
Medicine sourceId = PostgreSQL Medicine ID
ActiveIngredient sourceId = PostgreSQL ActiveIngredient ID
```

Không dùng name hoặc raw scraped string làm identity.

INTERACTS_WITH metadata tối thiểu:

```text
ruleId
severity
description
recommendation
isActive
sourceVersion
sourceUpdatedAt
syncedAt
```

Không tạo Medicine–Medicine authoritative edge.

---

# 8. Canonical Edge và Deactivation

- INTERACTS_WITH chỉ lưu một hướng canonical theo stable relational IDs.
- Reverse input không được tạo duplicate edge.
- Query vẫn phải hiểu interaction theo cả hai phía.
- Deactivate bằng `isActive=false`.
- Không hard-delete nếu cần provenance.
- Normal queries loại inactive data.
- Reactivation dùng lại cùng source identity.

---

# 9. Worker và Retry

Expected lifecycle:

```text
PENDING
→ PROCESSING
→ SUCCESS

PROCESSING
→ PENDING/retry

PROCESSING
→ FAILED
```

Worker phải:

- claim job atomically;
- chống hai worker xử lý cùng job;
- có lock timeout/recovery;
- xử lý replay idempotently;
- retry có giới hạn;
- không retry permanent error vô hạn;
- lưu safe error code/summary;
- không crash API;
- đóng driver/session khi shutdown.

---

# 10. Freshness

Không chỉ dựa vào elapsed time từ `syncedAt`.

Phải xét:

```text
sourceVersion
projected sourceVersion
pending relevant job
failed relevant job
missing projection
graph availability
```

Freshness contract phải phân biệt các trạng thái tương đương:

```text
FRESH
STALE_PENDING_SYNC
STALE_FAILED_SYNC
STALE_VERSION_MISMATCH
MISSING_PROJECTION
GRAPH_UNAVAILABLE
```

Không âm thầm dùng stale graph.

---

# 11. Workflow mỗi Task

```text
Pull latest develop
→ xác minh exact branch đã tồn tại
→ checkout exact branch
→ đọc Task description và acceptance criteria
→ kiểm tra code hiện có
→ code đúng phạm vi
→ chạy targeted tests/checks
→ Prisma/Supabase/Neo4j verification khi cần
→ review diff, secret và destructive query
→ commit
→ push
→ PR vào develop
→ Local Quality Gate
→ merge vào develop
→ verify merge SHA trên remote develop
→ cập nhật sprint-8-progress.md
→ báo cáo ngắn
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

---

# 12. Local Quality Gate

Không ghi:

```text
CI = PASS
```

Ghi:

```text
CI = N/A — GitHub Actions chưa được cấu hình
Local Quality Gate = PASS
```

Chỉ merge khi:

1. Exact branch và Jira Key đúng.
2. Acceptance criteria hoàn thành.
3. PR target `develop`.
4. Diff đúng scope.
5. Không conflict.
6. Relevant tests PASS.
7. Lint/typecheck/build PASS hoặc N/A hợp lệ.
8. Prisma validate/generate PASS khi liên quan.
9. Supabase verification PASS hoặc N/A hợp lệ.
10. Neo4j verification PASS hoặc N/A hợp lệ.
11. Không destructive query.
12. Không credential hoặc secret.
13. Không Blocking defect.
14. GitHub báo mergeable.
15. Final PR diff đã được review.

Nếu FAIL:

```text
Không merge
Sửa trên cùng exact branch
Chạy lại kiểm tra
Push lại
Chỉ merge khi PASS
```

---

# 13. Testing

Dùng scripts thật trong repository; không tự đoán.

Kiểm tra phù hợp Task:

```text
lint
typecheck
targeted unit/module tests
build
Prisma validate/generate
controlled Supabase verification
controlled Neo4j verification
```

Test tối thiểu theo toàn Sprint:

- outbox emitter;
- source transaction consistency;
- worker atomic claim;
- duplicate claim prevention;
- replay/idempotency;
- retry/max attempts;
- Medicine projection;
- ActiveIngredient projection;
- CONTAINS;
- canonical INTERACTS_WITH;
- deactivate/reactivate;
- freshness states;
- AuraDB unavailable;
- POS/checkout independence.

Không chạy destructive test trên production/demo Supabase hoặc AuraDB dùng chung.

---

# 14. Prisma, Supabase và Neo4j

Schema workflow:

```text
Prisma schema
→ migration
→ validate/generate
→ PR review
→ safe environment apply
→ controlled verification
→ cleanup evidence
```

Không:

- sửa schema thủ công để né migration;
- drop/rename source tables ngoài phê duyệt;
- lưu Neo4j credentials trong PostgreSQL;
- reset toàn bộ database;
- chạy destructive Cypher trên instance dùng chung.

Không chạy:

```cypher
MATCH (n) DETACH DELETE n
```

Task không ảnh hưởng database:

```text
Supabase = N/A — no persistent data impact
```

Task không ảnh hưởng graph:

```text
Neo4j = N/A — no graph projection impact
```

---

# 15. Git, Commit và PR

Commit:

```text
<type>(<scope>): <JIRA-KEY> <short English message>
```

Ví dụ:

```text
feat(graph): PAC-566 create graph sync outbox Prisma model
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
- tạo integration branch tự phát;
- tạo replacement branch;
- merge `develop → main`.

Sau merge:

```bash
git fetch origin
git log origin/develop --oneline -n 20
```

---

# 16. Jira và Bug

Jira do Project Owner quản lý.

AI không:

- chuyển Jira status;
- comment Jira;
- tạo Jira Key;
- tự tạo Jira Bug.

AI chỉ ghi:

```text
Recommended Jira status = DONE
```

Bug ngoài Task scope:

```text
Bug Candidate:
Severity:
Affected Task/Story:
Actual:
Expected:
Evidence:
```

Chỉ tạo Bug branch khi Project Owner cung cấp Jira Bug Key thật.

---

# 17. Báo cáo sau Task

Chỉ báo hoàn thành sau khi PR đã merge và remote `develop` chứa thay đổi.

```text
✅ Hoàn thành [PAC-TASK-xxx] — [Tên Task]

Đã làm:
Kiểm tra:
Supabase/PostgreSQL:
Neo4j:
Branch:
Commit:
PR:
Merge SHA:
Local Quality Gate: PASS
CI: N/A — GitHub Actions chưa được cấu hình
Jira đề xuất: DONE
Tiếp theo:
```

Nếu chưa hoàn thành:

```text
📌 [PAC-TASK-xxx] chưa hoàn thành

Trạng thái:
Lý do:
Blocker:
Owner action:
Bước tiếp theo:
```

Sau khi merge, tự động tiếp tục Task kế tiếp.

---

# 18. Story, Epic và Sprint Review

Story:

```text
Mọi Task của Story đã merge
→ review trên latest develop
→ acceptance checks
→ PASS/FAIL
```

Không tạo Story PR.

Epic:

```text
12 Stories PASS
→ PAC-EPIC-14 Integration/Regression Review
→ latest develop
```

Không tạo Epic PR.

Sprint 8 hoàn tất khi:

```text
35/35 Tasks verified
12/12 Story Reviews PASS
PAC-EPIC-14 Review PASS
Outbox PASS
Worker/idempotency PASS
Projection PASS
Canonical edge PASS
Deactivation PASS
Retry/failure PASS
Freshness PASS
Prisma/Supabase/Neo4j PASS
Blocking defects = 0
High defects = 0
Sprint 8 Final Review = PASS
Ready for Sprint 9 = Yes
```

Không ghi `Ready for release = Yes`.

---

# 19. Điều kiện dừng

Dừng khi:

- Authorization Gate chưa PASS;
- exact branch không tồn tại;
- Supabase hoặc Neo4j environment không an toàn;
- credential không an toàn;
- migration có nguy cơ mất dữ liệu;
- destructive query risk chưa xử lý;
- cần Jira Bug Key;
- cần Project Owner quyết định;
- GitHub không cho tạo/merge PR;
- mandatory checks không PASS;
- source-of-truth/dual-write blocker;
- worker idempotency/concurrency blocker;
- hết phiên;
- Sprint 8 Final Review hoàn tất.

Cuối phiên:

1. Cập nhật `sprint-8-progress.md`.
2. Cập nhật `WORKING-CONTEXT.md`.
3. Ghi Task hiện tại, Task tiếp theo, PR, merge SHA và blocker.
4. Không tuyên bố Sprint hoàn thành nếu Final Review chưa PASS.

---

# 20. Start Instruction

Thực hiện:

1. Đọc tài liệu bắt buộc.
2. Xác minh Sprint 7 Final Review PASS.
3. Xác minh Sprint 8 Audit PASS 18/18.
4. Xác minh latest `develop`.
5. Xác minh safe Supabase và safe Neo4j.
6. Xác minh exact branch Task đầu tiên trong canonical registry.
7. Xác minh branch tồn tại trên remote.
8. Bắt đầu `PAC-TASK-356 / PAC-566`.
9. Code, test, commit, push và PR vào `develop`.
10. Merge chỉ khi Local Quality Gate PASS.
11. Verify merge SHA.
12. Cập nhật progress.
13. Tiếp tục Task kế tiếp.
14. Dừng trước `develop → main`.

First Task:

```text
PAC-TASK-356 / T-356
PAC-565
feature/PAC-566-task-356-create-graph-sync-outbox-prisma-model
```

Last Task:

```text
PAC-TASK-390 / T-390
PAC-599
feature/PAC-600-task-390-add-graph-sync-traceability-notes
```
