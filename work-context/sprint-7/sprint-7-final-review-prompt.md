# Sprint 7 Final Review Prompt — PharmaAssist AI Intelligence

> **Independent final quality gate từ Sprint 7 sang Sprint 8**
>
> Repository path đề xuất:
>
> `work-context/sprint-7/sprint-7-final-review-prompt.md`
>
> Chỉ chạy prompt này sau khi Sprint 7 implementation được báo cáo hoàn tất.

---

# 1. Vai trò và quyết định cuối

Bạn là AI Reviewer độc lập cho Sprint 7.

Phạm vi phải review:

```text
Sprint: Sprint 7
Tasks: PAC-TASK-291 → PAC-TASK-355
Task count: 65
Stories: US-99 → US-116; US-142 → US-143
Story count: 20
Core Epics:
- PAC-EPIC-12 — AI Copilot
- PAC-EPIC-13 — AI Guardrail & AI Audit
- PAC-EPIC-17 — System Settings
Supporting Epics:
- PAC-EPIC-19 — Testing
- PAC-EPIC-21 — Documentation
Primary provider: Google AI
Fallback provider: MockAI
CI: N/A — GitHub Actions chưa được cấu hình
Quality gate: Local Quality Gate
```

Quyết định cuối chỉ được là một trong ba trạng thái:

```text
Sprint 7 Final Review = PASS
Ready for Sprint 8 = Yes
```

```text
Sprint 7 Final Review = FAIL
Ready for Sprint 8 = No
```

```text
Sprint 7 Final Review = BLOCKED
Ready for Sprint 8 = No
```

Không dùng:

```text
Ready for release = Yes
```

Sprint 7 chỉ cho phép chuyển sang Sprint 8. Release chỉ diễn ra sau toàn bộ MVP Sprint 10 hoàn tất.

Không tin hoàn toàn vào báo cáo của Coding Agent hoặc `sprint-7-progress.md`. Phải kiểm chứng độc lập bằng code, Git, GitHub, Prisma, Supabase và test evidence.

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
9. `Jira/4C_Task_List_MVP_AI_Graph_Report_Demo_291_435.md`
10. `Jira/4C_Task_Description_MVP_AI_Graph_Report_Demo_291_435.md`
11. `Jira/5_Sprint.md`
12. Sprint 5 Final Review evidence.
13. Sprint 6 Final Review evidence.
14. `work-context/sprint-7/sprint-7.md`
15. `work-context/sprint-7/sprint-7-progress.md`
16. `work-context/sprint-7/sprint-7-audit.md`
17. `work-context/sprint-7/sprint-7-agent-prompt.md`
18. Prisma schema và migrations.
19. Backend AI/config/guardrail/audit/InteractionAlert code.
20. Frontend AI Copilot và Admin AI Audit UI.
21. Tests, fixtures và smoke checklists.
22. Sprint 8 plan/audit documents nếu đã được chuẩn bị.

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

# 3. Safety và review rules

- Không triển khai feature mới trong Final Review.
- Không mở rộng sang Sprint 8 Graph Sync/Neo4j.
- Không đổi exact branch name.
- Không tạo Story/Epic integration branch mới.
- Không push trực tiếp vào `develop` hoặc `main`.
- Không merge `develop → main`.
- Không sửa Jira thủ công bằng AI.
- Không tự tạo Jira Bug Key.
- Không chạy destructive test trên production/demo database.
- Không gọi live Google AI bằng secret không an toàn.
- Không ghi API key, raw PII hoặc raw medical-style context vào evidence.
- Không báo PASS nếu có Blocking/High defect chưa xử lý.
- Không báo CI PASS.
- Ghi đúng:

```text
CI = N/A — GitHub Actions chưa được cấu hình
Local Quality Gate evidence = PASS/FAIL
```

Nếu cần sửa defect:

```text
Project Owner cung cấp Jira Bug Key
→ tạo exact Bug branch
→ sửa
→ local checks
→ PR vào develop
→ merge
→ chạy lại Final Review
```

---

# 4. Review gates

Final Review gồm 16 Mandatory Gates:

1. Scope and dependency gate.
2. Branch and Jira mapping gate.
3. GitHub PR and merge evidence gate.
4. Repository baseline gate.
5. Provider abstraction and configuration gate.
6. Google AI primary provider gate.
7. MockAI fallback gate.
8. Input guardrail gate.
9. PII minimization gate.
10. Structured output and output guardrail gate.
11. Prompt versioning gate.
12. AI Audit and provenance gate.
13. AI Copilot business flow gate.
14. Human confirmation and checkout independence gate.
15. Database, tests and Local Quality Gate.
16. Story/Epic/Sprint completion and defect gate.

PASS yêu cầu:

```text
Mandatory Gates PASS = 16/16
Blocking findings = 0
High findings = 0
```

---

# 5. Gate 01 — Scope và dependency

Xác minh:

- [ ] Sprint 5 Final Review PASS.
- [ ] Sprint 6 Final Review PASS.
- [ ] Sprint 7 Audit PASS 17/17 trước implementation.
- [ ] Latest remote `develop` chứa toàn bộ Sprint 7 changes.
- [ ] Không có Task ngoài `291–355` bị trộn vào Sprint 7.
- [ ] Không có Graph Sync, Neo4j hoặc Graph-RAG implementation bị kéo sớm.
- [ ] Không có Advanced Provider/Prompt Management UI ngoài MVP.
- [ ] Không có medical-record, diagnosis, prescribing hoặc dosage feature.
- [ ] AI không thay deterministic checkout logic.
- [ ] Sprint 8 chưa được code trong review này.

Expected scope:

```text
PAC-TASK-291 → PAC-TASK-355
65 Tasks
20 Stories
3 Core Epics
```

```text
Gate 01 = PASS / FAIL / BLOCKED
```

---

# 6. Gate 02 — Branch và Jira mapping

Canonical source:

```text
Jira/branch-on-jira.md
```

Expected Task range:

```text
PAC-TASK-291 → PAC-TASK-355
Expected Jira range from prepared mapping: PAC-501 → PAC-565
```

First expected branch:

```text
feature/PAC-501-task-291-define-ai-provider-abstraction
```

Last expected branch:

```text
feature/PAC-565-task-355-add-ai-safety-traceability-notes
```

Checklist:

- [ ] 65/65 Task branches khớp canonical registry.
- [ ] 20/20 Story branches tồn tại cho traceability nếu registry yêu cầu.
- [ ] 3/3 Core Epic branches tồn tại cho traceability nếu registry yêu cầu.
- [ ] Không có alternate/shortened branch.
- [ ] Không có duplicate branch.
- [ ] Không có Task dùng sai Jira Key.
- [ ] Commit message chứa Jira Key thật.
- [ ] PR head branch khớp Task branch.
- [ ] PR base là `develop`.

| Category | Expected | Verified | Result |
|---|---:|---:|---|
| Task | 65 | — | Pending |
| Story traceability | 20 | — | Pending |
| Core Epic traceability | 3 | — | Pending |
| **Total** | **88** | — | Pending |

Nếu canonical registry khác expected mapping trong tài liệu Sprint 7:

```text
Canonical registry thắng
→ Final Review FAIL
→ đồng bộ lại Sprint documents
```

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

Không yêu cầu:

```text
Task → Story PR
Story → Epic PR
Epic → develop PR
```

Checklist cho 65 Task:

- [ ] Mỗi Task có PR hoặc evidence hợp lệ nếu Task thực sự không cần code.
- [ ] Source branch đúng.
- [ ] Base branch là `develop`.
- [ ] PR không phải draft khi merge.
- [ ] PR state là MERGED.
- [ ] Merge/squash SHA tồn tại.
- [ ] Commit xuất hiện trên remote `develop`.
- [ ] Không merge trực tiếp vào `main`.
- [ ] Không có duplicate PR gây duplicate changes.
- [ ] Không có unmerged Sprint 7 Task PR.
- [ ] Không có open Bug PR ảnh hưởng Sprint 7.

Đối với documentation-only hoặc verification Task:

- vẫn phải có technical evidence;
- nếu có repository change thì phải qua PR;
- không được đánh dấu Completed chỉ dựa vào mô tả.

Summary:

| Metric | Expected | Actual |
|---|---:|---:|
| Completed Tasks | 65 | — |
| Task changes merged to `develop` | 65 hoặc N/A hợp lệ | — |
| Open Sprint 7 PRs | 0 | — |
| Merge SHA verified | All applicable | — |

```text
Gate 03 = PASS / FAIL / BLOCKED
```

---

# 8. Gate 04 — Repository baseline

- [ ] Working tree sạch hoặc chỉ có review evidence đã giải thích.
- [ ] Local `develop` đồng bộ `origin/develop`.
- [ ] Không còn temporary debug code.
- [ ] Không còn mock hard-code trong production flow ngoài MockAI adapter hợp lệ.
- [ ] Không còn TODO/FIXME mang tính blocker.
- [ ] Không có secret hoặc `.env` thật được track.
- [ ] Không có console log chứa prompt, response hoặc PII.
- [ ] Public APIs/DTOs nhất quán.
- [ ] Error format an toàn.
- [ ] Permission checks nằm ở backend.
- [ ] Frontend không chứa provider secret.
- [ ] Code không phụ thuộc Graph Sync/Neo4j cho AI Copilot Sprint 7.

Review diff:

```bash
git fetch --all --prune
git switch develop
git pull origin develop
git status --short
git log origin/develop --oneline -n 100
```

Sensitive file review:

```bash
git ls-files | grep -E '(^|/)\.env($|\.)|\.pem$|\.p12$|(^|/)id_rsa$' || true
```

```text
Gate 04 = PASS / FAIL / BLOCKED
```

---

# 9. Gate 05 — Provider abstraction và configuration

Xác minh kiến trúc:

```text
AI Controller/Use-case Service
→ Provider abstraction
→ Google AI adapter or MockAI adapter
```

Checklist:

- [ ] Có provider interface/contract chung.
- [ ] Controller không hard-code Google AI.
- [ ] Input/output DTO provider được chuẩn hóa.
- [ ] `provider_requested` và `provider_used` khác nhau khi fallback.
- [ ] Provider/model có config loader.
- [ ] Database active setting và environment fallback có precedence rõ.
- [ ] Missing/invalid config trả safe error.
- [ ] API key chỉ trong backend environment.
- [ ] Không lưu API key trong database.
- [ ] Không trả API key ra frontend.
- [ ] Timeout có giới hạn.
- [ ] Retry có giới hạn.
- [ ] Rate limit/circuit behavior không gây loop.
- [ ] Config error không làm crash toàn app.

Required result:

```text
Provider abstraction = PASS
Configuration precedence = PASS
Secret safety = PASS
```

```text
Gate 05 = PASS / FAIL / BLOCKED
```

---

# 10. Gate 06 — Google AI primary

- [ ] Google AI là provider primary trong production configuration.
- [ ] Backend gọi Google AI, frontend không gọi trực tiếp.
- [ ] Request context đã được minimize.
- [ ] Response được map về internal structured format.
- [ ] Provider timeout/error được bắt an toàn.
- [ ] Không render raw provider response.
- [ ] `provider_used = Google AI` khi thành công.
- [ ] Model name được audit.
- [ ] Live verification chỉ chạy trên safe environment.
- [ ] Không log prompt/output chứa PII.
- [ ] Quota/network failure không làm hỏng POS.

Controlled verification:

```text
Google AI call = PASS
Structured response = PASS
Audit metadata = PASS
No secret exposure = PASS
```

Nếu không thể chạy live verification vì quota/secret:

- unit/contract tests vẫn phải PASS;
- Final Review có thể BLOCKED nếu requirement bắt buộc chứng minh primary provider hoạt động thật.

```text
Gate 06 = PASS / FAIL / BLOCKED
```

---

# 11. Gate 07 — MockAI fallback

- [ ] MockAI dùng cùng provider contract.
- [ ] MockAI không phải primary.
- [ ] Chỉ fallback với provider timeout/error/quota phù hợp.
- [ ] Không fallback khi input guardrail BLOCKED.
- [ ] Không fallback để bỏ qua audit failure.
- [ ] `provider_requested = Google AI`.
- [ ] `provider_used = MockAI` khi fallback.
- [ ] Fallback reason được audit.
- [ ] UI hiển thị degraded/fallback state nếu cần.
- [ ] MockAI output vẫn qua output guardrail.
- [ ] Fallback không tạo diagnosis/prescribing/dosage.
- [ ] Fallback tests PASS.

Required scenarios:

| Scenario | Expected |
|---|---|
| Google success | Không dùng MockAI |
| Google timeout | MockAI nếu fallback enabled |
| Google error + fallback disabled | Safe error |
| Input blocked | Không gọi Google hoặc MockAI |
| Audit persistence failed | Safe failure, không bypass |

```text
Gate 07 = PASS / FAIL / BLOCKED
```

---

# 12. Gate 08 — Input guardrail

Unsafe categories:

```text
diagnosis
prescribing
dosage amount/frequency/duration
excessive PII
medical-record creation
out-of-scope medical advice
```

Checklist:

- [ ] Input guardrail chạy trước provider.
- [ ] Guardrail trả structured status.
- [ ] Blocked request không gọi provider.
- [ ] Diagnosis request BLOCKED.
- [ ] Prescribing request BLOCKED.
- [ ] Dosage advice BLOCKED.
- [ ] Excessive PII bị redact hoặc block.
- [ ] Medical-record request BLOCKED.
- [ ] Safe error response rõ ràng.
- [ ] Block reason được audit.
- [ ] Không lưu raw blocked input có PII.
- [ ] Tests cho các unsafe categories PASS.

Provider-spy test bắt buộc:

```text
Given unsafe input
When guardrail blocks
Then provider call count = 0
```

```text
Gate 08 = PASS / FAIL / BLOCKED
```

---

# 13. Gate 09 — PII minimization

Xác minh từng use case:

## AI explanation

Allowed context:

```text
medicine
active ingredient
interaction rule
severity
safe alert metadata
```

Không cần:

```text
customer name
email
phone
address
```

## Consultation draft

Chỉ truyền dữ liệu nghiệp vụ tối thiểu liên quan alert/order.

## Safe follow-up

- context ngắn;
- transient;
- không tạo medical record;
- không persist raw symptom history.

Checklist:

- [ ] Có redaction/minimization layer.
- [ ] Customer PII không gửi nếu không cần.
- [ ] Raw symptom/context không persist.
- [ ] Audit không lưu raw PII.
- [ ] Logs không lưu request payload nhạy cảm.
- [ ] Test fixture không dùng PII thật.
- [ ] Admin Audit UI không hiển thị raw PII.
- [ ] Evidence đã được redact.
- [ ] PII privacy tests PASS.

```text
Gate 09 = PASS / FAIL / BLOCKED
```

---

# 14. Gate 10 — Structured output và output guardrail

- [ ] Mỗi use case có output schema rõ.
- [ ] Provider response được parse.
- [ ] Schema validation chạy trước render.
- [ ] Malformed output không render trực tiếp.
- [ ] Unsafe output bị block.
- [ ] Retry có giới hạn.
- [ ] Safe fallback response tồn tại.
- [ ] Output guardrail status được audit.
- [ ] MockAI output cũng được kiểm tra.
- [ ] Disclaimer được gắn nhất quán.
- [ ] Không có HTML/script injection từ AI output.
- [ ] Malformed/unsafe output tests PASS.

Required tests:

```text
valid output → render
invalid schema → bounded retry or safe fallback
unsafe output → block
provider raw text → never render directly
```

```text
Gate 10 = PASS / FAIL / BLOCKED
```

---

# 15. Gate 11 — Prompt versioning

- [ ] Có PromptTemplate model hoặc thiết kế tương đương.
- [ ] Prompt có stable code.
- [ ] Prompt có version.
- [ ] Prompt có active/approved state.
- [ ] AI service load approved prompt.
- [ ] Không hard-code toàn bộ prompt trong controller.
- [ ] Prompt code/version được audit.
- [ ] Seeder idempotent.
- [ ] Prompt content không chứa secret.
- [ ] Prompt Management UI không bị triển khai ngoài scope.
- [ ] Prompt version tests PASS.
- [ ] Prompt provenance có thể truy vết từ audit record.

Required result:

```text
Every successful/blocked AI attempt
→ prompt_code and prompt_version known
```

```text
Gate 11 = PASS / FAIL / BLOCKED
```

---

# 16. Gate 12 — AI Audit và provenance

Mandatory audit scenarios:

- Google success;
- MockAI fallback;
- input blocked;
- output blocked;
- provider failure;
- configuration failure;
- safe failure.

Required metadata:

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

Checklist:

- [ ] `AIAuditLog` schema/migration tồn tại.
- [ ] Audit service được dùng ở mọi AI path.
- [ ] Success được audit.
- [ ] Blocked input được audit.
- [ ] Blocked output được audit.
- [ ] Fallback được audit.
- [ ] Provider failure được audit.
- [ ] Prompt provenance đầy đủ.
- [ ] Không lưu API key.
- [ ] Không lưu raw PII.
- [ ] Admin query/filter hoạt động.
- [ ] Permission bảo vệ Admin Audit API/UI.
- [ ] Audit privacy tests PASS.
- [ ] Audit write failure dùng fail-safe policy.

Audit failure rule:

```text
Nếu output lẽ ra success nhưng mandatory audit không ghi được
→ không trả output như success
→ trả safe degraded error
```

```text
Gate 12 = PASS / FAIL / BLOCKED
```

---

# 17. Gate 13 — AI Copilot business flows

## Interaction explanation

- [ ] Staff/Admin có quyền gọi.
- [ ] Warehouse bị 403.
- [ ] Context lấy từ PostgreSQL.
- [ ] Có disclaimer.
- [ ] Loading/error/fallback states hoạt động.
- [ ] AI error không làm mất InteractionAlert/POS state.
- [ ] Explanation không tự lưu thành official note.
- [ ] Explanation được audit.

## Consultation note draft

- [ ] Chỉ generate draft.
- [ ] Draft editable.
- [ ] Không auto-save.
- [ ] Có disclaimer.
- [ ] Generate failure không chặn manual note.
- [ ] Draft action được audit.

## Safe follow-up

- [ ] Chỉ tạo câu hỏi an toàn.
- [ ] Không diagnosis/prescribing/dosage.
- [ ] Context được minimize.
- [ ] Không persist như medical record.
- [ ] Permission guard hoạt động.

## Admin AI Audit UI

- [ ] List/filter hoạt động.
- [ ] Chỉ metadata cần thiết.
- [ ] Không raw PII.
- [ ] Admin-only permission.

```text
Gate 13 = PASS / FAIL / BLOCKED
```

---

# 18. Gate 14 — Human confirmation và checkout independence

Luồng bắt buộc:

```text
Generate draft
→ Staff reviews/edits
→ Staff explicitly confirms
→ Save official consultation note
```

Checklist:

- [ ] Draft và official note là hai trạng thái khác nhau.
- [ ] Generate draft không ghi official note.
- [ ] Staff có thể edit.
- [ ] Confirm là explicit action.
- [ ] Backend enforce permission/ownership.
- [ ] Note gắn đúng HIGH InteractionAlert.
- [ ] Actor/time được lưu.
- [ ] Draft chưa confirm không resolve alert.
- [ ] Draft chưa confirm không unlock checkout.
- [ ] Checkout chỉ đọc official note.
- [ ] AI provider lỗi vẫn cho manual note.
- [ ] AI explanation không ảnh hưởng checkout.
- [ ] Neo4j/AI không quyết định checkout.
- [ ] Human-confirmation tests PASS.
- [ ] Checkout independence regression PASS.

Required scenarios:

| Scenario | Expected |
|---|---|
| Draft only | Checkout vẫn block nếu HIGH unresolved |
| Staff confirms valid note | Official note được lưu đúng alert |
| AI provider unavailable | Staff nhập note thủ công |
| Wrong Staff/order | Reject |
| Warehouse | 403 |
| AI output without audit | Không trả success |

```text
Gate 14 = PASS / FAIL / BLOCKED
```

---

# 19. Gate 15 — Database, migrations và Supabase

Expected persistent scope:

```text
AIAuditLog
PromptTemplate
AI provider/model operational settings
```

Checklist:

- [ ] Prisma schema hợp lệ.
- [ ] Migration files có trong Git.
- [ ] Migration history nhất quán.
- [ ] Không có schema drift không giải thích.
- [ ] Migration additive hoặc có rollback plan.
- [ ] Không drop/rename dữ liệu ngoài phê duyệt.
- [ ] Không lưu API key trong database.
- [ ] Không tạo medical-record table.
- [ ] Index/unique constraints phù hợp.
- [ ] Prompt seed idempotent.
- [ ] Supabase environment dùng để verify là an toàn.
- [ ] Safe read/write verification PASS khi cần.
- [ ] Test fixtures được cleanup.
- [ ] Không chạy destructive test trên demo/production.

Commands dùng theo repository thực tế:

```text
Prisma validate
Prisma generate
migration status/check
targeted schema tests
```

Không tự đoán script nếu chưa kiểm tra `package.json`.

```text
Gate 15 = PASS / FAIL / BLOCKED
```

---

# 20. Gate 16 — Tests, Local Quality Gate và hoàn thành Sprint

GitHub Actions:

```text
CI = N/A — GitHub Actions chưa được cấu hình
```

## Task evidence

- [ ] 65/65 Task có Local Quality Gate PASS.
- [ ] Targeted tests PASS.
- [ ] Lint/typecheck/build PASS hoặc N/A hợp lệ.
- [ ] Prisma/Supabase PASS hoặc N/A hợp lệ.
- [ ] Không có secret.
- [ ] Diff đúng Task scope.

## Required Sprint regression

- [ ] Backend lint PASS.
- [ ] Backend typecheck PASS.
- [ ] Backend build PASS.
- [ ] Frontend lint PASS.
- [ ] Frontend typecheck PASS.
- [ ] Frontend build PASS.
- [ ] Relevant unit tests PASS.
- [ ] Relevant integration tests PASS.
- [ ] Provider abstraction tests PASS.
- [ ] Google adapter contract/live-safe verification PASS.
- [ ] MockAI fallback tests PASS.
- [ ] Input guardrail tests PASS.
- [ ] Output guardrail tests PASS.
- [ ] Structured output tests PASS.
- [ ] PII minimization tests PASS.
- [ ] AI Audit privacy tests PASS.
- [ ] Prompt version tests PASS.
- [ ] Human confirmation tests PASS.
- [ ] Checkout independence regression PASS.
- [ ] AI Copilot smoke test PASS.

## Story reviews

- [ ] 20/20 Story Acceptance Reviews PASS.
- [ ] Không tạo Story PR.
- [ ] Story review chạy trên latest `develop`.

## Epic reviews

- [ ] EPIC-12 Integration/Regression Review PASS.
- [ ] EPIC-13 Integration/Regression Review PASS.
- [ ] EPIC-17 Sprint 7 scope review PASS.
- [ ] Không tạo Epic PR.
- [ ] Epic review chạy trên latest `develop`.

## Defects

- [ ] Blocking defect = 0.
- [ ] High defect = 0.
- [ ] Không có unresolved AI safety/privacy defect.
- [ ] Không có unresolved checkout-independence defect.
- [ ] Không có open Sprint 7 Bug PR.
- [ ] Không có unmerged Sprint 7 Task PR.

## Documentation

- [ ] `sprint-7-progress.md` được cập nhật.
- [ ] `WORKING-CONTEXT.md` được cập nhật.
- [ ] AI safety traceability notes hoàn thành.
- [ ] Commit/PR/merge evidence đầy đủ.
- [ ] Jira manual update queue được chuẩn bị.
- [ ] Sprint 8 dependency handoff được ghi.

```text
Gate 16 = PASS / FAIL / BLOCKED
```

---

# 21. Findings register

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
| S7-FR-001 | — | — | Chưa có | — | — | Open |

Rules:

- Blocker/High làm Final Review FAIL hoặc BLOCKED.
- Medium/Low phải được ghi rõ tác động và remediation.
- Observation không phải defect.
- Không xóa finding; chỉ cập nhật status/evidence.

---

# 22. Bug candidate register

AI không tự tạo Jira Bug Key.

| Candidate ID | Severity | Affected Task/Story | Summary | Evidence | Needs Jira Bug Key | Status |
|---|---|---|---|---|---|---|
| S7-FR-BUG-001 | — | — | Chưa có | — | No | Open |

Mẫu báo cáo:

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

# 23. Final decision rules

## PASS

Chỉ PASS khi:

```text
16/16 Mandatory Gates PASS
65/65 Tasks completed and verified
20/20 Story Reviews PASS
3/3 Core Epic Reviews PASS
All applicable PRs merged into develop
Google AI primary PASS
MockAI fallback PASS
Input/output guardrail PASS
PII minimization PASS
Prompt provenance PASS
AI Audit privacy PASS
Human confirmation PASS
Checkout independence PASS
Prisma/Supabase PASS
Blocking defects = 0
High defects = 0
```

Kết quả:

```text
Sprint 7 Final Review = PASS
Ready for Sprint 8 = Yes
```

## FAIL

Dùng khi evidence xác nhận implementation/test không đạt nhưng có thể sửa:

```text
Sprint 7 Final Review = FAIL
Ready for Sprint 8 = No
Failed Gates:
Required fixes:
```

## BLOCKED

Dùng khi không thể kiểm chứng vì thiếu quyền, môi trường hoặc evidence:

```text
Sprint 7 Final Review = BLOCKED
Ready for Sprint 8 = No
Blocking reason:
Required owner action:
```

Không được PASS với:

- test chưa chạy;
- PR chưa merge;
- branch sai;
- live provider requirement chưa verify;
- audit privacy chưa verify;
- checkout independence chưa verify;
- Blocking/High defect còn mở.

---

# 24. Final report format

```markdown
# Sprint 7 Final Review Report

## Decision

Sprint 7 Final Review = PASS/FAIL/BLOCKED
Ready for Sprint 8 = Yes/No

## Scope

- Tasks verified: x/65
- Stories reviewed: x/20
- Core Epics reviewed: x/3
- Branches reconciled: x/88
- Applicable PRs merged: x/x
- Open Sprint 7 PRs: x

## Gate Results

1. Scope/dependency: PASS/FAIL/BLOCKED
2. Branch/Jira mapping: PASS/FAIL/BLOCKED
3. GitHub PR/merge evidence: PASS/FAIL/BLOCKED
4. Repository baseline: PASS/FAIL/BLOCKED
5. Provider/configuration: PASS/FAIL/BLOCKED
6. Google AI primary: PASS/FAIL/BLOCKED
7. MockAI fallback: PASS/FAIL/BLOCKED
8. Input guardrail: PASS/FAIL/BLOCKED
9. PII minimization: PASS/FAIL/BLOCKED
10. Output guardrail/schema: PASS/FAIL/BLOCKED
11. Prompt versioning: PASS/FAIL/BLOCKED
12. AI Audit/provenance: PASS/FAIL/BLOCKED
13. AI Copilot flows: PASS/FAIL/BLOCKED
14. Human confirmation/checkout independence: PASS/FAIL/BLOCKED
15. Prisma/Supabase: PASS/FAIL/BLOCKED
16. Tests/completion/defects: PASS/FAIL/BLOCKED

## Key Evidence

- develop SHA:
- Representative PRs:
- Prisma/migration:
- Supabase verification:
- Google AI verification:
- MockAI fallback:
- Guardrail:
- Audit privacy:
- Prompt provenance:
- Human confirmation:
- Checkout independence:
- Local test/build:

## Findings

- Blocking:
- High:
- Medium:
- Low:
- Observations:

## Required Actions

- None / list actions

## Sprint 8 Handoff

- Next Sprint: Sprint 8
- Scope: Graph Sync, Neo4j Projection, Freshness Detection
- Task range: PAC-TASK-356 → PAC-TASK-390
- First Logical Task: PAC-TASK-356 / TASK-356
- Jira Key: PAC-566
- Exact branch:
  feature/PAC-566-task-356-create-graph-sync-outbox-prisma-model
- Sprint 8 implementation may start: Yes/No
```

---

# 25. Sprint 8 handoff

Chỉ khi Final Review PASS:

```text
Sprint 7 Final Review = PASS
Ready for Sprint 8 = Yes
```

Handoff dự kiến:

```text
Sprint 8 scope:
Graph Sync Outbox
Worker and retry
Neo4j projection
Graph freshness detection

Task range:
PAC-TASK-356 → PAC-TASK-390

First Task:
PAC-TASK-356 / TASK-356

Jira Key:
PAC-566

Exact branch:
feature/PAC-566-task-356-create-graph-sync-outbox-prisma-model
```

Phải xác minh lại mapping từ `Jira/branch-on-jira.md` trước khi bắt đầu Sprint 8.

Final Reviewer không được triển khai Sprint 8 trong cùng phiên review, trừ khi Project Owner chạy riêng Sprint 8 Audit/Agent Prompt sau khi PASS.

---

# 26. Start instruction

Bắt đầu Final Review theo thứ tự:

1. Đọc toàn bộ tài liệu bắt buộc.
2. Xác minh remote `develop`.
3. Đối chiếu 65 Task, 20 Story, 3 Core Epic và 88 branch.
4. Kiểm tra PR/merge evidence.
5. Review code và phạm vi.
6. Chạy local tests/builds phù hợp.
7. Verify Prisma/Supabase.
8. Verify Google AI primary và MockAI fallback.
9. Verify guardrails, PII, prompt version và AI Audit.
10. Verify Staff confirmation và checkout independence.
11. Kiểm tra open defects.
12. Cập nhật Findings Register.
13. Xuất Final Review Report.
14. Chỉ ghi `Ready for Sprint 8 = Yes` khi 16/16 Gates PASS.
15. Không merge `develop → main`.
