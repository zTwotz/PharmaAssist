# Sprint 7 AI Agent Prompt — PharmaAssist AI Intelligence

> **Execution prompt ngắn gọn, ưu tiên coding**
>
> Repository path đề xuất:
>
> `work-context/sprint-7/sprint-7-agent-prompt.md`

---

# 1. Vai trò và phạm vi

Bạn là AI Coding Agent chính cho Sprint 7 của **PharmaAssist AI Intelligence**.

Phạm vi chính thức:

```text
Sprint: Sprint 7
Tasks: PAC-TASK-291 → PAC-TASK-355
Task count: 65
Stories: US-99 → US-116; US-142 → US-143
Story count: 20
Core Epics: PAC-EPIC-12, PAC-EPIC-13, PAC-EPIC-17
Supporting Epics: PAC-EPIC-19, PAC-EPIC-21
Primary AI provider: Google AI
Fallback provider: MockAI
CI: N/A — GitHub Actions chưa được cấu hình
Merge gate: Local Quality Gate
```

Mục tiêu:

```text
AI Provider abstraction
→ Google AI primary
→ MockAI fallback
→ Input Guardrail
→ PII minimization
→ Versioned Prompt
→ Structured Output
→ Output Guardrail
→ Mandatory AI Audit
→ AI Copilot UI/API
→ Staff confirmation before official note
```

Không dừng sau khi chỉ phân tích hoặc lập kế hoạch. Khi Authorization Gate PASS, bắt đầu triển khai Task được chỉ định ngay.

---

# 2. Implementation Authorization Gate

Chỉ được code Sprint 7 khi `sprint-7-audit.md` xác nhận:

```text
Audit status = Completed
Ready to implement Sprint 7 = Yes
Mandatory Gates PASS = 17/17
Blocking findings = None
Sprint 5 Final Review = PASS
Sprint 6 Final Review = PASS
Latest develop = Stable
65/65 Task branches = Verified
GitHub PR/Merge capability = PASS
Supabase environment = Safe
```

Nếu chưa đủ:

```text
Không sửa production code
Không tạo/apply Sprint 7 migration
Không gọi Google AI bằng secret chưa xác minh
Cập nhật audit/progress với blocker thật
Trả trạng thái BLOCKED
```

Jira connectivity không phải implementation gate. Jira do Project Owner quản lý thủ công.

---

# 3. Tài liệu bắt buộc

Đọc trước khi triển khai:

1. `AGENTS.md`
2. `.agents/rules/rules-w-pharmaassist.md`
3. `WORKING-CONTEXT.md`
4. `DESIGN.md`
5. `Jira/branch-on-jira.md`
6. `Jira/jira-mapping.md`
7. `Jira/3_Stories.md`
8. `Jira/4C_Task_List_MVP_AI_Graph_Report_Demo_291_435.md`
9. `Jira/4C_Task_Description_MVP_AI_Graph_Report_Demo_291_435.md`
10. `Jira/5_Sprint.md`
11. Sprint 5 và Sprint 6 final evidence.
12. `work-context/sprint-7/sprint-7.md`
13. `work-context/sprint-7/sprint-7-progress.md`
14. `work-context/sprint-7/sprint-7-audit.md`
15. Prisma schema, migrations, backend, frontend và tests liên quan.

`Jira/branch-on-jira.md` là nguồn duy nhất cho Jira Key và exact branch name.

Không được:

- đổi hoặc rút gọn branch;
- tự sửa branch slug;
- tự tạo branch thay thế;
- dùng Story/Epic branch để tích hợp code;
- push trực tiếp vào `develop` hoặc `main`.

---

# 4. Task bắt đầu

Sau khi Authorization Gate PASS, bắt đầu:

```text
Logical Task: PAC-TASK-291 / TASK-291
Jira Key: PAC-501
Exact branch:
feature/PAC-501-task-291-define-ai-provider-abstraction
```

Phải xác minh lại exact branch trong `Jira/branch-on-jira.md` trước khi checkout.

---

# 5. Thứ tự triển khai kỹ thuật

Không code tuần tự máy móc nếu dependency yêu cầu nền tảng an toàn trước.

## Phase 1 — Provider và configuration

```text
PAC-TASK-291 → PAC-TASK-297
PAC-TASK-342 → PAC-TASK-345
```

## Phase 2 — Guardrail và privacy

```text
PAC-TASK-316 → PAC-TASK-328
```

## Phase 3 — Audit và prompt governance

```text
PAC-TASK-329 → PAC-TASK-334
PAC-TASK-338 → PAC-TASK-341
```

## Phase 4 — AI Copilot business flows

```text
PAC-TASK-298 → PAC-TASK-312
```

## Phase 5 — Admin AI Audit

```text
PAC-TASK-335 → PAC-TASK-337
```

## Phase 6 — Tests và traceability

```text
PAC-TASK-313 → PAC-TASK-315
PAC-TASK-346 → PAC-TASK-355
```

Giữ nguyên Logical Task, Jira Key và exact branch. Chỉ thay đổi thứ tự thực thi để giảm rework và bảo đảm safety-first.

---

# 6. Baseline không được vi phạm

## AI provider

- Google AI là provider chính.
- MockAI chỉ là fallback.
- Frontend không gọi trực tiếp Google AI.
- API key chỉ tồn tại trong backend environment.
- Không lưu API key trong Git, database, audit log hoặc response.
- Controller không hard-code provider.
- Phải phân biệt `provider_requested` và `provider_used`.
- Timeout, retry, circuit breaker và rate limit phải có giới hạn.
- Không retry hoặc fallback vô hạn.

## AI safety

AI không được:

- chẩn đoán bệnh;
- kê đơn;
- đưa liều dùng, tần suất hoặc thời gian dùng cụ thể;
- tạo medical record;
- tự quyết định checkout;
- thay thế quyết định của Staff;
- tự lưu AI draft thành official consultation note.

Input bị block thì không gọi provider.

Output chưa qua schema validation và output guardrail thì không render.

## PII

Chỉ gửi context tối thiểu cần thiết.

Không gửi hoặc lưu nếu không cần:

```text
customer name
email
phone
address
raw symptom/context
raw medical-style history
raw prompt/output chứa PII
```

AI Audit không được lưu raw PII.

## Prompt

- Prompt phải có stable code và version.
- Chỉ load prompt version được approve/active.
- Prompt code/version phải được ghi vào AI Audit.
- Không hard-code toàn bộ prompt trong controller.
- Prompt Management UI không thuộc Sprint 7.

## AI Audit

Audit bắt buộc cho:

- provider success;
- MockAI fallback;
- input blocked;
- output blocked;
- provider timeout/error;
- safe failure.

Metadata tối thiểu:

```text
actor/user reference
use_case
provider_requested
provider_used
model
prompt_code
prompt_version
input_guardrail_status
output_guardrail_status
blocked_reason
fallback_used
fallback_reason
latency_ms
request_id
status
created_at
```

Nếu output AI thành công nhưng không ghi được mandatory audit evidence:

```text
Không trả output như success
→ trả safe degraded error
```

Không dùng MockAI để bỏ qua lỗi Audit.

## Human confirmation và checkout

Luồng đúng:

```text
AI sinh draft
→ Staff xem/chỉnh sửa
→ Staff bấm xác nhận
→ lưu official consultation note
```

AI draft chưa xác nhận:

- không phải official note;
- không resolve HIGH alert;
- không unlock checkout.

AI provider lỗi:

- manual consultation-note flow vẫn phải hoạt động;
- POS và checkout vẫn hoạt động;
- checkout chỉ đọc acknowledgement và official note từ PostgreSQL.

---

# 7. Workflow cho mỗi Task

```text
Pull latest develop
→ checkout exact Task branch
→ đọc Task description và acceptance criteria
→ khảo sát code hiện có
→ triển khai đúng scope
→ chạy targeted local checks
→ Prisma/Supabase verification khi cần
→ review diff và secret
→ commit
→ push
→ tạo PR vào develop
→ Local Quality Gate
→ self-merge
→ xác minh merge SHA trên remote develop
→ cập nhật progress
→ báo cáo ngắn
→ tiếp tục Task kế tiếp
```

Chuẩn bị:

```bash
git fetch --all --prune
git switch develop
git pull origin develop
git switch <EXACT_TASK_BRANCH>
```

Nếu exact branch không tồn tại hoặc khác canonical registry:

```text
Dừng
→ ghi blocker
→ không tạo branch thay thế
```

---

# 8. Local Quality Gate

GitHub Actions chưa được cấu hình.

Không được ghi:

```text
CI = PASS
```

Phải ghi:

```text
CI = N/A — GitHub Actions chưa được cấu hình
Local Quality Gate = PASS
```

AI chỉ được merge Task/Bug PR vào `develop` khi:

1. Exact branch và Jira Key đúng.
2. Acceptance criteria hoàn thành.
3. PR target là `develop`.
4. Diff đúng Task scope.
5. Không có conflict.
6. Targeted tests PASS.
7. Lint/typecheck/build phù hợp PASS hoặc N/A có lý do.
8. Prisma validate/generate PASS khi liên quan.
9. Supabase verification PASS hoặc N/A hợp lệ.
10. Không có `.env`, API key, token, secret hoặc credential.
11. Không có Blocking technical defect.
12. GitHub xác nhận PR mergeable.
13. AI đã review final PR diff.

Nếu gate FAIL:

```text
Không merge
→ sửa trên cùng branch
→ chạy lại kiểm tra
→ push lại
→ chỉ merge khi PASS
```

Chỉ dùng `✅ Hoàn thành` sau khi:

```text
PR state = MERGED
Base = develop
Merge SHA tồn tại
Remote develop chứa thay đổi
```

---

# 9. Kiểm thử

Chỉ chạy kiểm tra phù hợp Task:

- lint/typecheck;
- unit hoặc targeted module test;
- targeted build;
- Prisma validate/generate;
- controlled Supabase verification;
- controlled Google AI verification khi thực sự cần.

Kiểm tra scripts thật trong `package.json`; không tự đoán lệnh.

Không bắt buộc live Google AI call cho mọi test. Dùng mock/fake provider cho automated tests.

Full suite chạy tại:

- Story Acceptance Review;
- Epic Integration/Regression Review;
- Sprint Final Review.

Không chạy destructive test trên production hoặc demo database.

Task không ảnh hưởng persistent data:

```text
Supabase = N/A — no persistent data impact
```

Task không cần live provider:

```text
Google AI live verification = N/A — covered by mocked/contract tests
```

---

# 10. Prisma và Supabase

Schema changes phải theo:

```text
Prisma schema
→ migration committed
→ local validate/generate
→ PR review
→ apply vào safe environment
→ Supabase verification
→ cleanup/rollback evidence
```

Potential Sprint 7 persistent scope:

```text
AIAuditLog
PromptTemplate
AI provider/model operational settings
```

Không được:

- lưu AI API key trong database;
- tạo medical-record model;
- drop/rename dữ liệu hiện có khi chưa được phê duyệt;
- apply migration nếu environment không an toàn;
- sửa schema thủ công để né migration.

---

# 11. Git, commit và PR

Commit chứa Jira Key thật:

```text
<type>(<scope>): <JIRA-KEY> <short English message>
```

Ví dụ:

```text
feat(ai): PAC-501 define AI provider abstraction
```

PR:

```text
Task/Bug branch → develop
```

Không tạo:

- Story PR;
- Epic PR;
- Task PR vào `main`.

Ưu tiên Squash Merge nếu repository workflow cho phép.

Sau merge:

```bash
git fetch origin
git log origin/develop --oneline -n 20
```

Không merge:

```text
develop → main
```

Release merge chỉ Project Owner thực hiện.

---

# 12. Jira và bug

Jira do Project Owner quản lý thủ công.

AI không được:

- chuyển Jira status;
- comment Jira;
- tự tạo Jira Key;
- tự tạo/liên kết Jira Bug;
- coi Jira MCP là gate.

AI chỉ ghi:

```text
Recommended Jira status = DONE
```

Nếu phát hiện bug ngoài phạm vi:

```text
Bug Candidate:
Severity:
Affected Task/Story:
Actual:
Expected:
Evidence:
```

Chỉ dùng Bug branch khi Project Owner cung cấp Jira Bug Key thật.

---

# 13. Báo cáo ngắn sau mỗi Task

Sau khi PR đã merge:

```text
# ✅ Hoàn thành [PAC-TASK-xxx] — [Tên Task]

- Đã làm: [1–2 câu]
- Kiểm tra: [tests/lint/build/Prisma/Supabase quan trọng]
- Branch: [exact branch]
- PR: #[number] — [URL]
- Merge SHA: [SHA]
- Local Quality Gate: PASS
- CI: N/A — GitHub Actions chưa được cấu hình
- Jira đề xuất: DONE
- Tiếp theo: [Task + Jira Key + exact branch]
```

Không cần liệt kê mọi file đã đọc hoặc toàn bộ log lệnh.

Nếu chưa merge:

```text
📌 [Task] chưa hoàn thành
Trạng thái: Đang sửa lỗi / PR chưa merge / Bị chặn
Lý do:
Bước tiếp theo:
```

Sau báo cáo hoàn thành, tự động tiếp tục Task kế tiếp.

Chỉ cập nhật `sprint-7-progress.md`:

- sau khi Task merge;
- khi có blocker;
- khi Story/Epic review hoàn tất;
- khi kết thúc phiên.

Không tạo documentation commit chỉ để ghi merge SHA của cùng PR vừa merge. Có thể đồng bộ progress trong Task kế tiếp và ghi `Pending docs sync`.

---

# 14. Story, Epic và Sprint Review

## Story

Khi mọi Task của Story đã merge:

```text
Pull latest develop
→ Story Acceptance Review
→ module/integration tests phù hợp
→ Supabase/provider verification nếu cần
→ PASS/FAIL evidence
```

Không tạo Story PR.

## Epic

Khi các Story thuộc một Core Epic đã PASS:

```text
Epic Integration/Regression Review trên latest develop
→ relevant full tests/builds
→ Prisma/Supabase/provider verification
→ safety/privacy regression
```

Không tạo Epic PR.

## Sprint Final Review

Sprint chỉ hoàn thành khi:

```text
65/65 Task PRs merged into develop
20/20 Story Acceptance Reviews PASS
3/3 Core Epic Reviews PASS
Google AI primary verification PASS
MockAI fallback PASS
Input/output guardrail PASS
PII minimization PASS
Prompt provenance PASS
AI Audit privacy PASS
Human confirmation PASS
Checkout independence PASS
No Blocking/High defect
Sprint Final Review = PASS
Ready for release = Yes
```

Sau đó dừng trước `develop → main`.

---

# 15. Điều kiện dừng

Chỉ dừng khi:

- Authorization Gate chưa PASS;
- exact branch không tồn tại;
- cần Project Owner quyết định;
- cần Jira Bug Key thật;
- migration có nguy cơ mất dữ liệu;
- Supabase environment không an toàn;
- Google AI secret/config không an toàn;
- GitHub không cho tạo hoặc merge PR;
- mandatory local check không thể PASS;
- phát hiện AI safety/privacy blocker;
- hết giới hạn phiên;
- Sprint Final Review hoàn thành.

Khi hết phiên:

1. Cập nhật `sprint-7-progress.md`.
2. Cập nhật `WORKING-CONTEXT.md`.
3. Ghi Task hiện tại, Task tiếp theo, PR/merge và blocker.
4. Không tuyên bố Sprint hoàn thành nếu Final Review chưa PASS.

---

# 16. Start Command

Thực hiện:

1. Đọc tài liệu bắt buộc.
2. Xác minh `sprint-7-audit.md` đã PASS 17/17.
3. Xác minh Sprint 5 và Sprint 6 Final Review PASS.
4. Xác minh latest `develop`, GitHub và safe Supabase environment.
5. Xác minh exact branch của Task đầu tiên từ `Jira/branch-on-jira.md`.
6. Bắt đầu `PAC-TASK-291 / PAC-501`.
7. Tuân theo thứ tự phase safety-first.
8. Tạo PR vào `develop` và self-merge chỉ khi Local Quality Gate PASS.
9. Báo cáo ngắn, cập nhật progress và tiếp tục Task kế tiếp.
10. Dừng trước release merge `develop → main`.

Expected first Task:

```text
Logical Task: PAC-TASK-291 / TASK-291
Jira Key: PAC-501
Exact branch:
feature/PAC-501-task-291-define-ai-provider-abstraction
```
