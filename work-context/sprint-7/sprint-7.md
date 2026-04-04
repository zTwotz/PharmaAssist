# Sprint 7 — AI Copilot, Guardrail, Audit & Prompt Versioning

> **PharmaAssist AI Intelligence**
>
> Repository path đề xuất:
>
> `work-context/sprint-7/sprint-7.md`

## Canonical Sources

Các nguồn chính thức cho Sprint 7:

1. `Jira/branch-on-jira.md` — Jira Key và exact branch name.
2. `Jira/3_Stories.md` — Story, Epic, priority và scope.
3. `Jira/4C_Task_List_MVP_AI_Graph_Report_Demo_291_435.md` — Task mapping.
4. `Jira/4C_Task_Description_MVP_AI_Graph_Report_Demo_291_435.md` — Task requirements.
5. `Jira/5_Sprint.md` — Sprint range và MVP gate.

Quy tắc:

- Không đổi hoặc rút gọn exact branch name.
- Task/Bug PR luôn target `develop`.
- Story/Epic branch chỉ giữ cho legacy/traceability; không tạo Story PR hoặc Epic PR.
- Jira do Project Owner cập nhật thủ công.
- GitHub Actions chưa được cấu hình; Sprint 7 dùng Local Quality Gate.
- Chỉ Project Owner được merge `develop → main`.

> Trạng thái chuẩn bị:
>
> ```text
> Sprint 7 = Prepared
> Sprint 6 Final Review = Pending
> Ready for Sprint 7 = No
> Ready to implement Sprint 7 = No
> ```
>
> Chưa triển khai Sprint 7 cho đến khi Sprint 6 Final Review PASS và Sprint 7 Audit hoàn tất.

---

# 1. Sprint Overview

| Mục | Nội dung |
|---|---|
| Sprint | Sprint 7 |
| Tên | AI Copilot, Guardrail, Audit & Prompt Versioning |
| Scope | MVP / Core |
| Core Epics | PAC-EPIC-12, PAC-EPIC-13, PAC-EPIC-17 |
| Supporting Epics | PAC-EPIC-19, PAC-EPIC-21 |
| Stories | US-99 → US-116; US-142 → US-143 |
| Số Story | 20 |
| Story Points | 73 |
| Tasks | PAC-TASK-291 → PAC-TASK-355 |
| Số Task | 65 |
| Branch inventory bắt buộc | 88 = 65 Task + 20 Story legacy + 3 Core Epic legacy |
| Task Jira Keys | PAC-501 → PAC-565 |
| Primary AI provider | Google AI |
| Fallback provider | MockAI |
| System of record | PostgreSQL |
| CI | N/A — GitHub Actions chưa được cấu hình |
| Merge gate | Local Quality Gate |
| Jira management | Manual by Project Owner |

Phân bố Task:

| Parent Epic | Số Task |
|---|---:|
| PAC-EPIC-12 | 20 |
| PAC-EPIC-13 | 28 |
| PAC-EPIC-17 | 4 |
| PAC-EPIC-19 | 12 |
| PAC-EPIC-21 | 1 |
| **Tổng** | **65** |

# 2. Sprint Goal

Xây dựng AI Copilot an toàn, có provenance và không thay thế quyết định của Staff:

```text
Minimize input data
→ Input Guardrail
→ Load approved versioned prompt
→ Call Google AI
→ MockAI fallback khi provider lỗi theo policy
→ Structured output validation
→ Output Guardrail
→ Mandatory AI Audit metadata
→ Render explanation/draft với disclaimer
→ Staff xác nhận trước khi lưu official consultation note
```

AI không được chẩn đoán, kê đơn, đưa liều dùng cụ thể hoặc tự quyết định checkout.

# 3. Implementation Authorization Gate

Sprint 7 chỉ được bắt đầu khi:

```text
Sprint 5 Final Review = PASS
Sprint 6 Final Review = PASS
Latest develop = Stable
Sprint 7 Audit status = Completed
Ready to implement Sprint 7 = Yes
GitHub access = Connected
Supabase test environment = Safe
65/65 exact Task branches = Verified
20/20 exact Story branches = Verified
3/3 Core Epic branches = Verified
Open Blocking Technical Defects = 0
```

Nếu một gate chưa đạt:

- Không sửa Sprint 7 production code.
- Không tạo/apply migration Sprint 7.
- Không gọi Google AI bằng secret chưa xác minh.
- Không tạo dữ liệu audit/prompt trên môi trường không an toàn.
- Ghi blocker vào `sprint-7-audit.md`.
- Không tự tạo branch thay thế.

# 4. Mandatory Dependencies

## 4.1 Auth and permission dependencies

- Supabase Auth và backend session validation hoạt động.
- Permission Guard hoạt động.
- Staff/Admin/Warehouse access rules ổn định.
- Warehouse không được dùng AI Copilot liên quan InteractionAlert.

## 4.2 Sprint 5 dependencies

- InteractionAlert được persist.
- HIGH acknowledgement và consultation note contract ổn định.
- Alert gắn đúng Order và interaction rule.
- Staff/Admin ownership và permission hoạt động.

## 4.3 Sprint 6 dependencies

- Checkout blocker đọc official acknowledgement/note.
- Checkout không phụ thuộc AI provider.
- Draft Order/Order context ổn định.
- AI draft chưa confirm không mở khóa checkout.
- Latest `develop` đã vượt Sprint 6 Final Review.

## 4.4 Configuration dependencies

- Backend có cơ chế đọc environment an toàn.
- API key không tồn tại ở frontend hoặc Git.
- Database setting chỉ lưu operational provider/model config, không lưu secret.
- Test environment cho Prisma/Supabase đã được xác minh an toàn.

# 5. Business Rules and Invariants

## 5.1 Provider abstraction

- Controller/business service không hard-code Google AI hoặc MockAI.
- Mọi provider dùng chung input/output contract.
- Metadata phải phân biệt `provider_requested` và `provider_used`.
- Google AI là primary; MockAI chỉ là fallback.

## 5.2 Configuration precedence

```text
Database active provider/model setting
→ nếu thiếu thì dùng environment default
→ nếu cả hai thiếu/mâu thuẫn thì trả safe configuration error
```

Secret API key chỉ đọc từ backend environment. Không lưu secret trong database, frontend, log, audit hoặc response.

## 5.3 Safety boundary

AI không được:

- chẩn đoán bệnh;
- kê đơn hoặc thay đổi thuốc như quyết định y tế;
- đưa dosage amount/frequency/duration cụ thể;
- tạo medical record;
- tự lưu official consultation note;
- quyết định checkout hoặc inventory mutation.

## 5.4 Input guardrail

- Chạy trước provider call.
- Unsafe input phải bị chặn trước khi gửi provider.
- Provider không được gọi khi input đã `BLOCKED`.
- Safe response phải có reason/code ổn định.

## 5.5 PII minimization

- Chỉ gửi context tối thiểu cần thiết.
- Redact customer/order personal data không cần thiết.
- Không persist raw symptom/context như medical record.
- Không lưu raw prompt có PII vào AI Audit.

## 5.6 Output guardrail and structured output

- Mọi provider output phải validate schema trước khi dùng.
- Mọi output phải qua output guardrail trước khi render.
- Invalid/unsafe output chỉ retry có giới hạn hoặc chuyển safe fallback.
- Không render raw provider output trực tiếp.

## 5.7 Human confirmation

```text
AI draft
→ Staff review/edit
→ explicit confirm
→ save official consultation note
```

- Draft chưa confirm không được persist như official note.
- Note phải gắn đúng HIGH InteractionAlert.
- Actor và thời điểm confirm phải trace được.

## 5.8 AI Audit is mandatory

Mọi AI attempt phải có audit metadata cho các trạng thái:

- success;
- input blocked;
- output blocked;
- provider error;
- fallback;
- configuration error.

Nếu không thể tạo audit evidence bắt buộc, không trả AI output như một success; trả safe degraded error.

AI Audit không lưu raw PII, raw unsafe content hoặc secret.

## 5.9 Prompt governance

- Prompt có `code + version` unique.
- Chỉ load prompt active/approved theo use case.
- Prompt seed phải idempotent.
- Mỗi AI audit ghi prompt code/version.
- Prompt Management UI không thuộc Sprint 7.

## 5.10 AI independence from checkout

```text
AI unavailable
→ Staff vẫn xử lý InteractionAlert thủ công
→ official note vẫn có thể được nhập thủ công
→ checkout chỉ kiểm tra official business data
```

AI provider, AI Audit UI hoặc MockAI không được trở thành checkout decision source.

# 6. Scope

## In scope

- Provider abstraction.
- Google AI backend adapter.
- MockAI fallback.
- Timeout, retry-safe handling, circuit breaker/rate-limit guard.
- AI explanation cho InteractionAlert.
- AI consultation note draft và Staff confirmation.
- Safe follow-up questions.
- Input/output guardrails.
- Diagnosis/prescribing/dosage blocking.
- PII minimization.
- Structured output validation.
- Safe error response.
- Disclaimer.
- AIAuditLog model/service/Admin view.
- PromptTemplate model, seed, load và version audit.
- Backend provider/model settings.
- Local tests, smoke checklist và traceability.

## Out of scope

- Graph Sync, Neo4j và graph freshness — Sprint 8.
- Graph-RAG và PostgreSQL fallback cho graph query — Sprint 9.
- Reports và AI Business Narrative.
- AI Provider Settings UI.
- Prompt Management UI.
- Medical record, diagnosis, prescription hoặc dosage system.
- AI tự động lưu official consultation note.
- AI quyết định checkout.
- GitHub Actions/CI setup.

# 7. Ownership and Tool Responsibilities

## 7.1 Project Owner

- Cập nhật Jira status/comment thủ công.
- Tạo Jira Bug và cung cấp Bug Jira Key.
- Quyết định blocker nghiệp vụ/migration nguy hiểm.
- Review và merge `develop → main` sau Sprint Final Review.

## 7.2 AI Agent

- Code trên exact Task/Bug branch.
- Chạy Local Quality Gate.
- Tạo Task/Bug PR vào `develop`.
- Tự merge vào `develop` khi gate PASS.
- Cập nhật technical progress/evidence.
- Chỉ đề xuất Jira status.

## 7.3 Supabase

- Chỉ dùng test/local environment đã xác minh an toàn.
- Persistent-data Task phải có schema/data verification.
- Không chạy destructive tests trên production/demo database.

# 8. Local Quality Gate

GitHub Actions chưa được cấu hình. AI chỉ merge khi các kiểm tra phù hợp đều PASS:

1. Exact branch và Jira Key đúng.
2. PR target là `develop`.
3. Acceptance criteria hoàn thành.
4. Branch không conflict với latest `origin/develop`.
5. Diff đúng Task scope.
6. Targeted tests PASS.
7. Lint/typecheck/build phù hợp PASS hoặc N/A có lý do.
8. Prisma validate/generate PASS khi liên quan schema.
9. Supabase verification PASS hoặc N/A hợp lệ.
10. Không có `.env`, secret, API key, token hoặc credential.
11. Không có Blocking technical defect.
12. GitHub xác nhận PR mergeable.

Evidence bắt buộc:

```text
CI status = N/A — GitHub Actions chưa được cấu hình
Local Quality Gate = PASS
```

Nếu một kiểm tra cần thiết FAIL hoặc không chạy được, không merge.

# 9. Git Execution and Manual Jira Coordination

## Task/Bug lifecycle

```text
Read Task and acceptance criteria
→ pull latest develop
→ checkout exact Task/Bug branch
→ implement
→ targeted local checks
→ Prisma/Supabase verification when applicable
→ review diff and secrets
→ commit with Jira Key
→ push
→ PR Task/Bug → develop
→ Local Quality Gate
→ AI merge into develop
→ verify merge SHA
→ update progress/evidence
→ recommend Jira status
```

## Story lifecycle

Khi toàn bộ Task của Story đã merge vào `develop`:

```text
pull latest develop
→ Story Acceptance Review
→ module/integration tests phù hợp
→ Supabase Story verification khi cần
→ record PASS/FAIL and evidence
```

Không tạo Story PR và không dùng Story branch để tích hợp.

## Epic lifecycle

Khi toàn bộ Story của Core Epic đã PASS:

```text
pull latest develop
→ Epic Integration/Regression Review
→ full relevant tests/builds/Prisma checks
→ Supabase verification
→ record PASS/FAIL and evidence
```

Không tạo Epic PR và không dùng Epic branch để tích hợp.

## Commit format

```text
<type>(<scope>): <JIRA-KEY> <short English message>
```

# 10. Bug Candidate Workflow

AI không tự tạo Jira Bug.

Khi phát hiện defect ngoài phạm vi Task, ghi:

```text
Summary:
Affected Task/Story:
Steps to Reproduce:
Actual:
Expected:
Severity:
Evidence:
Recommended Jira action:
```

Chỉ tạo branch `bugfix/<BUG-JIRA-KEY>-bug-<slug>` sau khi Project Owner cung cấp Jira Bug Key thật.

# 11. Recommended Technical Execution Order

Thứ tự này ưu tiên safety foundation trước business UI/API. Không thay đổi Jira mapping hoặc exact branch.

## 1. Phase A — Provider abstraction and operational configuration

Thiết lập provider contract, Google AI primary, MockAI fallback, config validation và safe operational guards.

| Task | Jira Key | Required result |
|---|---|---|
| PAC-TASK-291 | `PAC-501` | Define AI provider abstraction |
| PAC-TASK-292 | `PAC-502` | Configure backend AI provider/model settings loader |
| PAC-TASK-293 | `PAC-503` | Implement Google AI provider adapter |
| PAC-TASK-294 | `PAC-504` | Add Google AI timeout and retry-safe error handling |
| PAC-TASK-295 | `PAC-505` | Implement MockAI fallback adapter |
| PAC-TASK-296 | `PAC-506` | Implement fallback provider selection logic |
| PAC-TASK-297 | `PAC-507` | Add provider_requested and provider_used tracking |
| PAC-TASK-342 | `PAC-552` | Add backend AI provider/model config validation |
| PAC-TASK-343 | `PAC-553` | Add environment/database config fallback order for AI settings |
| PAC-TASK-344 | `PAC-554` | Add timeout, circuit breaker and rate-limit guard for AI calls |
| PAC-TASK-345 | `PAC-555` | Add AI safe error response helper |

## 2. Phase B — Input/output guardrail and privacy foundation

Khóa safety boundary trước khi mở các AI business APIs.

| Task | Jira Key | Required result |
|---|---|---|
| PAC-TASK-316 | `PAC-526` | Define unsafe AI request categories |
| PAC-TASK-317 | `PAC-527` | Implement AI input guardrail service |
| PAC-TASK-318 | `PAC-528` | Block diagnosis requests |
| PAC-TASK-319 | `PAC-529` | Block prescribing requests |
| PAC-TASK-320 | `PAC-530` | Block dosage advice requests |
| PAC-TASK-321 | `PAC-531` | Add safe response templates for blocked AI input |
| PAC-TASK-322 | `PAC-532` | Add PII minimization before AI provider call |
| PAC-TASK-323 | `PAC-533` | Redact customer/order unnecessary personal data before AI call |
| PAC-TASK-324 | `PAC-534` | Implement AI output guardrail service |
| PAC-TASK-325 | `PAC-535` | Block unsafe AI output before rendering |
| PAC-TASK-326 | `PAC-536` | Implement structured output schema validation |
| PAC-TASK-327 | `PAC-537` | Add output schema retry or safe fallback handling |
| PAC-TASK-328 | `PAC-538` | Add guardrail status object to AI response |

## 3. Phase C — Audit and prompt governance foundation

Tạo AIAuditLog, PromptTemplate, prompt seed/load và provenance bắt buộc.

| Task | Jira Key | Required result |
|---|---|---|
| PAC-TASK-329 | `PAC-539` | Create ai_audit_logs Prisma model |
| PAC-TASK-330 | `PAC-540` | Implement AI audit log write service |
| PAC-TASK-331 | `PAC-541` | Persist AI provider, model and prompt metadata |
| PAC-TASK-332 | `PAC-542` | Persist input and output guardrail statuses |
| PAC-TASK-333 | `PAC-543` | Persist AI latency, request id and fallback metadata |
| PAC-TASK-334 | `PAC-544` | Ensure AI Audit does not store raw PII |
| PAC-TASK-338 | `PAC-548` | Create prompt_templates Prisma model |
| PAC-TASK-339 | `PAC-549` | Seed official AI prompt templates with versions |
| PAC-TASK-340 | `PAC-550` | Load approved prompt template by use case |
| PAC-TASK-341 | `PAC-551` | Record prompt version in AI audit |

## 4. Phase D — AI Copilot business flows

Tích hợp explanation, consultation draft, human confirmation, safe follow-up và permission UI/API.

| Task | Jira Key | Required result |
|---|---|---|
| PAC-TASK-298 | `PAC-508` | Implement AI interaction explanation API |
| PAC-TASK-299 | `PAC-509` | Build AI explanation panel in InteractionAlert UI |
| PAC-TASK-300 | `PAC-510` | Add AI disclaimer to explanation panel |
| PAC-TASK-301 | `PAC-511` | Build AI explanation loading, error and fallback states |
| PAC-TASK-302 | `PAC-512` | Implement AI consultation note draft API |
| PAC-TASK-303 | `PAC-513` | Build AI consultation note draft panel |
| PAC-TASK-304 | `PAC-514` | Build Staff edit AI draft before confirm UI |
| PAC-TASK-305 | `PAC-515` | Implement Staff confirm AI draft as official consultation note |
| PAC-TASK-306 | `PAC-516` | Prevent unconfirmed AI draft from saving official note |
| PAC-TASK-307 | `PAC-517` | Link confirmed AI note to correct HIGH InteractionAlert |
| PAC-TASK-308 | `PAC-518` | Implement safe follow-up question API |
| PAC-TASK-309 | `PAC-519` | Build safe follow-up question UI field |
| PAC-TASK-310 | `PAC-520` | Block medical-record style storage for symptom/context input |
| PAC-TASK-311 | `PAC-521` | Add AI Copilot permission checks |
| PAC-TASK-312 | `PAC-522` | Add AI Copilot frontend route and action guards |

## 5. Phase E — Admin audit view

Cung cấp Admin audit list, UI và filter mà không lộ raw PII.

| Task | Jira Key | Required result |
|---|---|---|
| PAC-TASK-335 | `PAC-545` | Build Admin AI Audit Log list API |
| PAC-TASK-336 | `PAC-546` | Build Admin AI Audit Log UI |
| PAC-TASK-337 | `PAC-547` | Add AI Audit filters by provider, status and date |

## 6. Phase F — Tests, smoke evidence and traceability

Hoàn thiện tests, smoke checklist và AI safety traceability.

| Task | Jira Key | Required result |
|---|---|---|
| PAC-TASK-313 | `PAC-523` | Add AI provider unit tests |
| PAC-TASK-314 | `PAC-524` | Add MockAI fallback tests |
| PAC-TASK-315 | `PAC-525` | Add AI Copilot integration smoke checklist |
| PAC-TASK-346 | `PAC-556` | Add AI input guardrail unit tests |
| PAC-TASK-347 | `PAC-557` | Add diagnosis block tests |
| PAC-TASK-348 | `PAC-558` | Add prescribing block tests |
| PAC-TASK-349 | `PAC-559` | Add dosage advice block tests |
| PAC-TASK-350 | `PAC-560` | Add AI output guardrail tests |
| PAC-TASK-351 | `PAC-561` | Add structured output validation tests |
| PAC-TASK-352 | `PAC-562` | Add PII minimization tests |
| PAC-TASK-353 | `PAC-563` | Add AI audit integration tests |
| PAC-TASK-354 | `PAC-564` | Add prompt versioning tests |
| PAC-TASK-355 | `PAC-565` | Add AI safety traceability notes |

# 12. Story and Task Plan

Story branch chỉ dùng cho legacy/traceability. Tất cả Task PR merge trực tiếp vào `develop`.

## 1. US-99 — AI explanation for InteractionAlert

- **Jira Key:** `PAC-139`
- **Parent Epic:** `PAC-EPIC-12`
- **Priority:** `High`
- **Story Points:** `5`
- **Exact Story branch (legacy/traceability):** `story/PAC-139-us-99-ai-explanation-for-interactionalert`
- **Implementation target:** `develop`

### Acceptance criteria

- Staff/Admin có quyền có thể yêu cầu AI giải thích một InteractionAlert đã persist.
- Context chỉ lấy dữ liệu cần thiết từ Order, Medicine, ActiveIngredient và rule liên quan.
- Input phải đi qua PII minimization và input guardrail trước khi gọi provider.
- Output phải đi qua structured-output validation và output guardrail trước khi hiển thị.
- UI có loading, safe error, fallback indicator và disclaimer.
- AI explanation không tự lưu thành consultation note và không quyết định checkout.

### Tasks

| Task | Jira Key | Exact branch | Required result |
|---|---|---|---|
| PAC-TASK-298 | `PAC-508` | `feature/PAC-508-task-298-implement-ai-interaction-explanation-api` | Implement AI interaction explanation API |
| PAC-TASK-299 | `PAC-509` | `feature/PAC-509-task-299-build-ai-explanation-panel-in-interactionalert-ui` | Build AI explanation panel in InteractionAlert UI |
| PAC-TASK-301 | `PAC-511` | `feature/PAC-511-task-301-build-ai-explanation-loading-error-and-fallback-sta` | Build AI explanation loading, error and fallback states |
| PAC-TASK-311 | `PAC-521` | `feature/PAC-521-task-311-add-ai-copilot-permission-checks` | Add AI Copilot permission checks |
| PAC-TASK-312 | `PAC-522` | `feature/PAC-522-task-312-add-ai-copilot-frontend-route-and-action-guards` | Add AI Copilot frontend route and action guards |
| PAC-TASK-315 | `PAC-525` | `feature/PAC-525-task-315-add-ai-copilot-integration-smoke-checklist` | Add AI Copilot integration smoke checklist |

### Story completion gate

- [ ] Tất cả child Task PR đã merge vào `develop`.
- [ ] Acceptance criteria PASS trên latest `develop`.
- [ ] Story-level tests phù hợp PASS.
- [ ] Supabase verification PASS hoặc N/A hợp lệ.
- [ ] Không còn Blocking technical defect.
- [ ] Story Acceptance Review và evidence đã được ghi.
- [ ] `Recommended Jira status = DONE` đã được đề xuất.
- [ ] Không tạo Story PR.

## 2. US-100 — AI consultation note draft

- **Jira Key:** `PAC-140`
- **Parent Epic:** `PAC-EPIC-12`
- **Priority:** `High`
- **Story Points:** `5`
- **Exact Story branch (legacy/traceability):** `story/PAC-140-us-100-ai-consultation-note-draft`
- **Implementation target:** `develop`

### Acceptance criteria

- Backend sinh consultation note ở trạng thái draft cho HIGH InteractionAlert hợp lệ.
- Draft được tạo từ prompt template có version và đi qua guardrail/audit.
- UI hiển thị draft dạng editable với disclaimer.
- Draft không tự động ghi vào official consultation note.

### Tasks

| Task | Jira Key | Exact branch | Required result |
|---|---|---|---|
| PAC-TASK-302 | `PAC-512` | `feature/PAC-512-task-302-implement-ai-consultation-note-draft-api` | Implement AI consultation note draft API |
| PAC-TASK-303 | `PAC-513` | `feature/PAC-513-task-303-build-ai-consultation-note-draft-panel` | Build AI consultation note draft panel |

### Story completion gate

- [ ] Tất cả child Task PR đã merge vào `develop`.
- [ ] Acceptance criteria PASS trên latest `develop`.
- [ ] Story-level tests phù hợp PASS.
- [ ] Supabase verification PASS hoặc N/A hợp lệ.
- [ ] Không còn Blocking technical defect.
- [ ] Story Acceptance Review và evidence đã được ghi.
- [ ] `Recommended Jira status = DONE` đã được đề xuất.
- [ ] Không tạo Story PR.

## 3. US-101 — Staff confirm AI draft before official save

- **Jira Key:** `PAC-141`
- **Parent Epic:** `PAC-EPIC-12`
- **Priority:** `Highest`
- **Story Points:** `5`
- **Exact Story branch (legacy/traceability):** `story/PAC-141-us-101-staff-confirm-ai-draft-before-official-save`
- **Implementation target:** `develop`

### Acceptance criteria

- Staff phải chủ động chỉnh sửa hoặc xác nhận draft trước khi lưu.
- Official note chỉ được lưu qua action confirm được backend kiểm tra quyền.
- Note phải gắn đúng HIGH InteractionAlert và đúng Order.
- Draft chưa confirm không được làm alert resolved hoặc mở khóa checkout.
- Actor và thời điểm xác nhận được trace.

### Tasks

| Task | Jira Key | Exact branch | Required result |
|---|---|---|---|
| PAC-TASK-304 | `PAC-514` | `feature/PAC-514-task-304-build-staff-edit-ai-draft-before-confirm-ui` | Build Staff edit AI draft before confirm UI |
| PAC-TASK-305 | `PAC-515` | `feature/PAC-515-task-305-implement-staff-confirm-ai-draft-as-official-consul` | Implement Staff confirm AI draft as official consultation note |
| PAC-TASK-306 | `PAC-516` | `feature/PAC-516-task-306-prevent-unconfirmed-ai-draft-from-saving-official-n` | Prevent unconfirmed AI draft from saving official note |
| PAC-TASK-307 | `PAC-517` | `feature/PAC-517-task-307-link-confirmed-ai-note-to-correct-high-interactiona` | Link confirmed AI note to correct HIGH InteractionAlert |

### Story completion gate

- [ ] Tất cả child Task PR đã merge vào `develop`.
- [ ] Acceptance criteria PASS trên latest `develop`.
- [ ] Story-level tests phù hợp PASS.
- [ ] Supabase verification PASS hoặc N/A hợp lệ.
- [ ] Không còn Blocking technical defect.
- [ ] Story Acceptance Review và evidence đã được ghi.
- [ ] `Recommended Jira status = DONE` đã được đề xuất.
- [ ] Không tạo Story PR.

## 4. US-102 — Safe follow-up questions

- **Jira Key:** `PAC-142`
- **Parent Epic:** `PAC-EPIC-12`
- **Priority:** `Medium`
- **Story Points:** `3`
- **Exact Story branch (legacy/traceability):** `story/PAC-142-us-102-safe-follow-up-questions`
- **Implementation target:** `develop`

### Acceptance criteria

- AI chỉ gợi ý safe follow-up questions trong phạm vi pharmacy-support demo.
- Diagnosis, prescribing và dosage advice phải bị chặn.
- Raw symptom/context không được persist như medical record.
- UI hiển thị safe error khi input bị chặn và không làm hỏng luồng POS.

### Tasks

| Task | Jira Key | Exact branch | Required result |
|---|---|---|---|
| PAC-TASK-308 | `PAC-518` | `feature/PAC-518-task-308-implement-safe-follow-up-question-api` | Implement safe follow-up question API |
| PAC-TASK-309 | `PAC-519` | `feature/PAC-519-task-309-build-safe-follow-up-question-ui-field` | Build safe follow-up question UI field |
| PAC-TASK-310 | `PAC-520` | `feature/PAC-520-task-310-block-medical-record-style-storage-for-symptom-cont` | Block medical-record style storage for symptom/context input |

### Story completion gate

- [ ] Tất cả child Task PR đã merge vào `develop`.
- [ ] Acceptance criteria PASS trên latest `develop`.
- [ ] Story-level tests phù hợp PASS.
- [ ] Supabase verification PASS hoặc N/A hợp lệ.
- [ ] Không còn Blocking technical defect.
- [ ] Story Acceptance Review và evidence đã được ghi.
- [ ] `Recommended Jira status = DONE` đã được đề xuất.
- [ ] Không tạo Story PR.

## 5. US-103 — Google AI provider primary

- **Jira Key:** `PAC-143`
- **Parent Epic:** `PAC-EPIC-12`
- **Priority:** `High`
- **Story Points:** `5`
- **Exact Story branch (legacy/traceability):** `story/PAC-143-us-103-google-ai-provider-primary`
- **Implementation target:** `develop`

### Acceptance criteria

- Backend dùng provider abstraction thay vì hard-code provider trong controller/service nghiệp vụ.
- Google AI là provider primary của MVP.
- Adapter chuẩn hóa input/output và metadata provider/model.
- Timeout, retry giới hạn, circuit breaker hoặc rate-limit guard bảo vệ backend.
- API key chỉ tồn tại ở backend environment và không lộ ra frontend/log/audit.
- Provider unit tests bao phủ success, mapping và failure.

### Tasks

| Task | Jira Key | Exact branch | Required result |
|---|---|---|---|
| PAC-TASK-291 | `PAC-501` | `feature/PAC-501-task-291-define-ai-provider-abstraction` | Define AI provider abstraction |
| PAC-TASK-293 | `PAC-503` | `feature/PAC-503-task-293-implement-google-ai-provider-adapter` | Implement Google AI provider adapter |
| PAC-TASK-294 | `PAC-504` | `feature/PAC-504-task-294-add-google-ai-timeout-and-retry-safe-error-handling` | Add Google AI timeout and retry-safe error handling |
| PAC-TASK-313 | `PAC-523` | `test/PAC-523-task-313-add-ai-provider-unit-tests` | Add AI provider unit tests |
| PAC-TASK-344 | `PAC-554` | `feature/PAC-554-task-344-add-timeout-circuit-breaker-and-rate-limit-guard-fo` | Add timeout, circuit breaker and rate-limit guard for AI calls |

### Story completion gate

- [ ] Tất cả child Task PR đã merge vào `develop`.
- [ ] Acceptance criteria PASS trên latest `develop`.
- [ ] Story-level tests phù hợp PASS.
- [ ] Supabase verification PASS hoặc N/A hợp lệ.
- [ ] Không còn Blocking technical defect.
- [ ] Story Acceptance Review và evidence đã được ghi.
- [ ] `Recommended Jira status = DONE` đã được đề xuất.
- [ ] Không tạo Story PR.

## 6. US-104 — MockAI fallback provider

- **Jira Key:** `PAC-144`
- **Parent Epic:** `PAC-EPIC-12`
- **Priority:** `High`
- **Story Points:** `3`
- **Exact Story branch (legacy/traceability):** `story/PAC-144-us-104-mockai-fallback-provider`
- **Implementation target:** `develop`

### Acceptance criteria

- MockAI implement cùng contract với provider primary.
- Fallback chỉ xảy ra khi Google AI không khả dụng theo policy, không xảy ra khi input bị guardrail chặn.
- Response ghi rõ provider_requested, provider_used và fallback reason.
- MockAI không được xem là provider primary và output vẫn phải đi qua output guardrail.
- Fallback tests bao phủ enabled/disabled và safe output.

### Tasks

| Task | Jira Key | Exact branch | Required result |
|---|---|---|---|
| PAC-TASK-295 | `PAC-505` | `feature/PAC-505-task-295-implement-mockai-fallback-adapter` | Implement MockAI fallback adapter |
| PAC-TASK-296 | `PAC-506` | `feature/PAC-506-task-296-implement-fallback-provider-selection-logic` | Implement fallback provider selection logic |
| PAC-TASK-314 | `PAC-524` | `test/PAC-524-task-314-add-mockai-fallback-tests` | Add MockAI fallback tests |

### Story completion gate

- [ ] Tất cả child Task PR đã merge vào `develop`.
- [ ] Acceptance criteria PASS trên latest `develop`.
- [ ] Story-level tests phù hợp PASS.
- [ ] Supabase verification PASS hoặc N/A hợp lệ.
- [ ] Không còn Blocking technical defect.
- [ ] Story Acceptance Review và evidence đã được ghi.
- [ ] `Recommended Jira status = DONE` đã được đề xuất.
- [ ] Không tạo Story PR.

## 7. US-105 — AI input guardrail

- **Jira Key:** `PAC-145`
- **Parent Epic:** `PAC-EPIC-13`
- **Priority:** `Highest`
- **Story Points:** `5`
- **Exact Story branch (legacy/traceability):** `story/PAC-145-us-105-ai-input-guardrail`
- **Implementation target:** `develop`

### Acceptance criteria

- Unsafe request categories được định nghĩa rõ và tái sử dụng.
- Input guardrail chạy trước provider call và trả PASS/BLOCKED có lý do.
- Provider không được gọi khi input bị chặn.
- AI response có guardrail status object phù hợp.
- Unit tests và traceability chứng minh safety rules hoạt động.

### Tasks

| Task | Jira Key | Exact branch | Required result |
|---|---|---|---|
| PAC-TASK-316 | `PAC-526` | `feature/PAC-526-task-316-define-unsafe-ai-request-categories` | Define unsafe AI request categories |
| PAC-TASK-317 | `PAC-527` | `feature/PAC-527-task-317-implement-ai-input-guardrail-service` | Implement AI input guardrail service |
| PAC-TASK-328 | `PAC-538` | `feature/PAC-538-task-328-add-guardrail-status-object-to-ai-response` | Add guardrail status object to AI response |
| PAC-TASK-346 | `PAC-556` | `test/PAC-556-task-346-add-ai-input-guardrail-unit-tests` | Add AI input guardrail unit tests |
| PAC-TASK-355 | `PAC-565` | `feature/PAC-565-task-355-add-ai-safety-traceability-notes` | Add AI safety traceability notes |

### Story completion gate

- [ ] Tất cả child Task PR đã merge vào `develop`.
- [ ] Acceptance criteria PASS trên latest `develop`.
- [ ] Story-level tests phù hợp PASS.
- [ ] Supabase verification PASS hoặc N/A hợp lệ.
- [ ] Không còn Blocking technical defect.
- [ ] Story Acceptance Review và evidence đã được ghi.
- [ ] `Recommended Jira status = DONE` đã được đề xuất.
- [ ] Không tạo Story PR.

## 8. US-106 — Block diagnosis requests

- **Jira Key:** `PAC-146`
- **Parent Epic:** `PAC-EPIC-13`
- **Priority:** `Highest`
- **Story Points:** `3`
- **Exact Story branch (legacy/traceability):** `story/PAC-146-us-106-block-diagnosis-requests`
- **Implementation target:** `develop`

### Acceptance criteria

- Yêu cầu chẩn đoán bệnh bị nhận diện và chặn trước provider call.
- Hệ thống trả safe response thay vì diagnosis.
- Guardrail status và blocked reason được audit bằng metadata không chứa raw PII.
- Diagnosis block tests PASS.

### Tasks

| Task | Jira Key | Exact branch | Required result |
|---|---|---|---|
| PAC-TASK-318 | `PAC-528` | `feature/PAC-528-task-318-block-diagnosis-requests` | Block diagnosis requests |
| PAC-TASK-347 | `PAC-557` | `test/PAC-557-task-347-add-diagnosis-block-tests` | Add diagnosis block tests |

### Story completion gate

- [ ] Tất cả child Task PR đã merge vào `develop`.
- [ ] Acceptance criteria PASS trên latest `develop`.
- [ ] Story-level tests phù hợp PASS.
- [ ] Supabase verification PASS hoặc N/A hợp lệ.
- [ ] Không còn Blocking technical defect.
- [ ] Story Acceptance Review và evidence đã được ghi.
- [ ] `Recommended Jira status = DONE` đã được đề xuất.
- [ ] Không tạo Story PR.

## 9. US-107 — Block prescribing requests

- **Jira Key:** `PAC-147`
- **Parent Epic:** `PAC-EPIC-13`
- **Priority:** `Highest`
- **Story Points:** `3`
- **Exact Story branch (legacy/traceability):** `story/PAC-147-us-107-block-prescribing-requests`
- **Implementation target:** `develop`

### Acceptance criteria

- Yêu cầu kê đơn thuốc bị nhận diện và chặn trước provider call.
- Hệ thống không tạo prescription hoặc đề xuất thay đổi thuốc như quyết định y tế.
- Safe response hướng người dùng đến chuyên gia phù hợp.
- Prescribing block tests PASS.

### Tasks

| Task | Jira Key | Exact branch | Required result |
|---|---|---|---|
| PAC-TASK-319 | `PAC-529` | `feature/PAC-529-task-319-block-prescribing-requests` | Block prescribing requests |
| PAC-TASK-348 | `PAC-558` | `test/PAC-558-task-348-add-prescribing-block-tests` | Add prescribing block tests |

### Story completion gate

- [ ] Tất cả child Task PR đã merge vào `develop`.
- [ ] Acceptance criteria PASS trên latest `develop`.
- [ ] Story-level tests phù hợp PASS.
- [ ] Supabase verification PASS hoặc N/A hợp lệ.
- [ ] Không còn Blocking technical defect.
- [ ] Story Acceptance Review và evidence đã được ghi.
- [ ] `Recommended Jira status = DONE` đã được đề xuất.
- [ ] Không tạo Story PR.

## 10. US-108 — Block dosage advice requests

- **Jira Key:** `PAC-148`
- **Parent Epic:** `PAC-EPIC-13`
- **Priority:** `Highest`
- **Story Points:** `3`
- **Exact Story branch (legacy/traceability):** `story/PAC-148-us-108-block-dosage-advice-requests`
- **Implementation target:** `develop`

### Acceptance criteria

- Yêu cầu liều dùng cụ thể bị nhận diện và chặn.
- Hệ thống không đưa dosage amount, frequency hoặc duration cụ thể.
- Provider không được gọi khi rule đã block.
- Dosage block tests PASS.

### Tasks

| Task | Jira Key | Exact branch | Required result |
|---|---|---|---|
| PAC-TASK-320 | `PAC-530` | `feature/PAC-530-task-320-block-dosage-advice-requests` | Block dosage advice requests |
| PAC-TASK-349 | `PAC-559` | `test/PAC-559-task-349-add-dosage-advice-block-tests` | Add dosage advice block tests |

### Story completion gate

- [ ] Tất cả child Task PR đã merge vào `develop`.
- [ ] Acceptance criteria PASS trên latest `develop`.
- [ ] Story-level tests phù hợp PASS.
- [ ] Supabase verification PASS hoặc N/A hợp lệ.
- [ ] Không còn Blocking technical defect.
- [ ] Story Acceptance Review và evidence đã được ghi.
- [ ] `Recommended Jira status = DONE` đã được đề xuất.
- [ ] Không tạo Story PR.

## 11. US-109 — AI output guardrail

- **Jira Key:** `PAC-149`
- **Parent Epic:** `PAC-EPIC-13`
- **Priority:** `Highest`
- **Story Points:** `5`
- **Exact Story branch (legacy/traceability):** `story/PAC-149-us-109-ai-output-guardrail`
- **Implementation target:** `develop`

### Acceptance criteria

- Mọi provider output phải qua output guardrail trước khi render hoặc dùng tiếp.
- Unsafe output bị chặn và thay bằng safe fallback/error.
- Không render diagnosis, prescribing hoặc dosage advice.
- Output guardrail tests PASS.

### Tasks

| Task | Jira Key | Exact branch | Required result |
|---|---|---|---|
| PAC-TASK-324 | `PAC-534` | `feature/PAC-534-task-324-implement-ai-output-guardrail-service` | Implement AI output guardrail service |
| PAC-TASK-325 | `PAC-535` | `feature/PAC-535-task-325-block-unsafe-ai-output-before-rendering` | Block unsafe AI output before rendering |
| PAC-TASK-350 | `PAC-560` | `test/PAC-560-task-350-add-ai-output-guardrail-tests` | Add AI output guardrail tests |

### Story completion gate

- [ ] Tất cả child Task PR đã merge vào `develop`.
- [ ] Acceptance criteria PASS trên latest `develop`.
- [ ] Story-level tests phù hợp PASS.
- [ ] Supabase verification PASS hoặc N/A hợp lệ.
- [ ] Không còn Blocking technical defect.
- [ ] Story Acceptance Review và evidence đã được ghi.
- [ ] `Recommended Jira status = DONE` đã được đề xuất.
- [ ] Không tạo Story PR.

## 12. US-110 — Structured output validation

- **Jira Key:** `PAC-150`
- **Parent Epic:** `PAC-EPIC-13`
- **Priority:** `High`
- **Story Points:** `3`
- **Exact Story branch (legacy/traceability):** `story/PAC-150-us-110-structured-output-validation`
- **Implementation target:** `develop`

### Acceptance criteria

- Mỗi AI use case có structured output schema rõ ràng.
- Provider response sai schema không được dùng trực tiếp.
- Hệ thống chỉ retry có giới hạn hoặc chuyển safe fallback.
- Validation failure được audit và không làm API trả output không kiểm soát.
- Structured-output tests PASS.

### Tasks

| Task | Jira Key | Exact branch | Required result |
|---|---|---|---|
| PAC-TASK-326 | `PAC-536` | `feature/PAC-536-task-326-implement-structured-output-schema-validation` | Implement structured output schema validation |
| PAC-TASK-327 | `PAC-537` | `feature/PAC-537-task-327-add-output-schema-retry-or-safe-fallback-handling` | Add output schema retry or safe fallback handling |
| PAC-TASK-351 | `PAC-561` | `test/PAC-561-task-351-add-structured-output-validation-tests` | Add structured output validation tests |

### Story completion gate

- [ ] Tất cả child Task PR đã merge vào `develop`.
- [ ] Acceptance criteria PASS trên latest `develop`.
- [ ] Story-level tests phù hợp PASS.
- [ ] Supabase verification PASS hoặc N/A hợp lệ.
- [ ] Không còn Blocking technical defect.
- [ ] Story Acceptance Review và evidence đã được ghi.
- [ ] `Recommended Jira status = DONE` đã được đề xuất.
- [ ] Không tạo Story PR.

## 13. US-111 — PII minimization before AI call

- **Jira Key:** `PAC-151`
- **Parent Epic:** `PAC-EPIC-13`
- **Priority:** `High`
- **Story Points:** `3`
- **Exact Story branch (legacy/traceability):** `story/PAC-151-us-111-pii-minimization-before-ai-call`
- **Implementation target:** `develop`

### Acceptance criteria

- Chỉ gửi dữ liệu tối thiểu cần thiết đến provider.
- Customer/order PII không cần thiết phải bị redact hoặc loại bỏ.
- AI Audit không lưu raw prompt, raw symptom/context hoặc raw PII.
- Privacy tests chứng minh dữ liệu nhạy cảm không bị persist.

### Tasks

| Task | Jira Key | Exact branch | Required result |
|---|---|---|---|
| PAC-TASK-322 | `PAC-532` | `feature/PAC-532-task-322-add-pii-minimization-before-ai-provider-call` | Add PII minimization before AI provider call |
| PAC-TASK-323 | `PAC-533` | `feature/PAC-533-task-323-redact-customer-order-unnecessary-personal-data-bef` | Redact customer/order unnecessary personal data before AI call |
| PAC-TASK-334 | `PAC-544` | `feature/PAC-544-task-334-ensure-ai-audit-does-not-store-raw-pii` | Ensure AI Audit does not store raw PII |
| PAC-TASK-352 | `PAC-562` | `test/PAC-562-task-352-add-pii-minimization-tests` | Add PII minimization tests |

### Story completion gate

- [ ] Tất cả child Task PR đã merge vào `develop`.
- [ ] Acceptance criteria PASS trên latest `develop`.
- [ ] Story-level tests phù hợp PASS.
- [ ] Supabase verification PASS hoặc N/A hợp lệ.
- [ ] Không còn Blocking technical defect.
- [ ] Story Acceptance Review và evidence đã được ghi.
- [ ] `Recommended Jira status = DONE` đã được đề xuất.
- [ ] Không tạo Story PR.

## 14. US-112 — AI safe error response

- **Jira Key:** `PAC-152`
- **Parent Epic:** `PAC-EPIC-13`
- **Priority:** `High`
- **Story Points:** `3`
- **Exact Story branch (legacy/traceability):** `story/PAC-152-us-112-ai-safe-error-response`
- **Implementation target:** `develop`

### Acceptance criteria

- Các AI flow dùng chung safe error response cho provider unavailable, blocked input/output và config thiếu.
- Không lộ stack trace, API key, provider payload hoặc chi tiết nội bộ.
- UI nhận được error code/message ổn định để hiển thị.
- Provider lỗi không làm POS/checkout bị phụ thuộc AI.

### Tasks

| Task | Jira Key | Exact branch | Required result |
|---|---|---|---|
| PAC-TASK-321 | `PAC-531` | `feature/PAC-531-task-321-add-safe-response-templates-for-blocked-ai-input` | Add safe response templates for blocked AI input |
| PAC-TASK-345 | `PAC-555` | `feature/PAC-555-task-345-add-ai-safe-error-response-helper` | Add AI safe error response helper |

### Story completion gate

- [ ] Tất cả child Task PR đã merge vào `develop`.
- [ ] Acceptance criteria PASS trên latest `develop`.
- [ ] Story-level tests phù hợp PASS.
- [ ] Supabase verification PASS hoặc N/A hợp lệ.
- [ ] Không còn Blocking technical defect.
- [ ] Story Acceptance Review và evidence đã được ghi.
- [ ] `Recommended Jira status = DONE` đã được đề xuất.
- [ ] Không tạo Story PR.

## 15. US-113 — AI disclaimer

- **Jira Key:** `PAC-153`
- **Parent Epic:** `PAC-EPIC-13`
- **Priority:** `Medium`
- **Story Points:** `2`
- **Exact Story branch (legacy/traceability):** `story/PAC-153-us-113-ai-disclaimer`
- **Implementation target:** `develop`

### Acceptance criteria

- Mọi AI explanation và draft panel hiển thị disclaimer rõ ràng.
- Disclaimer nêu AI chỉ hỗ trợ tham khảo và không thay thế dược sĩ/bác sĩ.
- Disclaimer xuất hiện cả primary và fallback mode.

### Tasks

| Task | Jira Key | Exact branch | Required result |
|---|---|---|---|
| PAC-TASK-300 | `PAC-510` | `feature/PAC-510-task-300-add-ai-disclaimer-to-explanation-panel` | Add AI disclaimer to explanation panel |

### Story completion gate

- [ ] Tất cả child Task PR đã merge vào `develop`.
- [ ] Acceptance criteria PASS trên latest `develop`.
- [ ] Story-level tests phù hợp PASS.
- [ ] Supabase verification PASS hoặc N/A hợp lệ.
- [ ] Không còn Blocking technical defect.
- [ ] Story Acceptance Review và evidence đã được ghi.
- [ ] `Recommended Jira status = DONE` đã được đề xuất.
- [ ] Không tạo Story PR.

## 16. US-114 — AI Audit metadata

- **Jira Key:** `PAC-154`
- **Parent Epic:** `PAC-EPIC-13`
- **Priority:** `High`
- **Story Points:** `5`
- **Exact Story branch (legacy/traceability):** `story/PAC-154-us-114-ai-audit-metadata`
- **Implementation target:** `develop`

### Acceptance criteria

- AIAuditLog lưu use case, actor, provider requested/used, model, prompt version, guardrail statuses, latency, request id và fallback metadata.
- Ghi audit cho success, blocked, provider error và fallback.
- Không lưu raw PII hoặc raw unsafe content.
- Một AI output không được coi là success nếu không thể tạo audit evidence bắt buộc.
- AI audit integration tests PASS.

### Tasks

| Task | Jira Key | Exact branch | Required result |
|---|---|---|---|
| PAC-TASK-297 | `PAC-507` | `feature/PAC-507-task-297-add-provider-requested-and-provider-used-tracking` | Add provider_requested and provider_used tracking |
| PAC-TASK-329 | `PAC-539` | `feature/PAC-539-task-329-create-ai-audit-logs-prisma-model` | Create ai_audit_logs Prisma model |
| PAC-TASK-330 | `PAC-540` | `feature/PAC-540-task-330-implement-ai-audit-log-write-service` | Implement AI audit log write service |
| PAC-TASK-331 | `PAC-541` | `feature/PAC-541-task-331-persist-ai-provider-model-and-prompt-metadata` | Persist AI provider, model and prompt metadata |
| PAC-TASK-332 | `PAC-542` | `feature/PAC-542-task-332-persist-input-and-output-guardrail-statuses` | Persist input and output guardrail statuses |
| PAC-TASK-333 | `PAC-543` | `feature/PAC-543-task-333-persist-ai-latency-request-id-and-fallback-metadata` | Persist AI latency, request id and fallback metadata |
| PAC-TASK-353 | `PAC-563` | `test/PAC-563-task-353-add-ai-audit-integration-tests` | Add AI audit integration tests |

### Story completion gate

- [ ] Tất cả child Task PR đã merge vào `develop`.
- [ ] Acceptance criteria PASS trên latest `develop`.
- [ ] Story-level tests phù hợp PASS.
- [ ] Supabase verification PASS hoặc N/A hợp lệ.
- [ ] Không còn Blocking technical defect.
- [ ] Story Acceptance Review và evidence đã được ghi.
- [ ] `Recommended Jira status = DONE` đã được đề xuất.
- [ ] Không tạo Story PR.

## 17. US-115 — Prompt template versioning

- **Jira Key:** `PAC-155`
- **Parent Epic:** `PAC-EPIC-13`
- **Priority:** `High`
- **Story Points:** `3`
- **Exact Story branch (legacy/traceability):** `story/PAC-155-us-115-prompt-template-versioning`
- **Implementation target:** `develop`

### Acceptance criteria

- PromptTemplate có code, version, content, status và unique code+version.
- AI service chỉ load approved/active prompt theo use case.
- Thiếu prompt phải trả safe configuration error.
- Prompt code/version được ghi vào AI Audit.
- Prompt versioning tests PASS.

### Tasks

| Task | Jira Key | Exact branch | Required result |
|---|---|---|---|
| PAC-TASK-338 | `PAC-548` | `feature/PAC-548-task-338-create-prompt-templates-prisma-model` | Create prompt_templates Prisma model |
| PAC-TASK-340 | `PAC-550` | `feature/PAC-550-task-340-load-approved-prompt-template-by-use-case` | Load approved prompt template by use case |
| PAC-TASK-341 | `PAC-551` | `feature/PAC-551-task-341-record-prompt-version-in-ai-audit` | Record prompt version in AI audit |
| PAC-TASK-354 | `PAC-564` | `test/PAC-564-task-354-add-prompt-versioning-tests` | Add prompt versioning tests |

### Story completion gate

- [ ] Tất cả child Task PR đã merge vào `develop`.
- [ ] Acceptance criteria PASS trên latest `develop`.
- [ ] Story-level tests phù hợp PASS.
- [ ] Supabase verification PASS hoặc N/A hợp lệ.
- [ ] Không còn Blocking technical defect.
- [ ] Story Acceptance Review và evidence đã được ghi.
- [ ] `Recommended Jira status = DONE` đã được đề xuất.
- [ ] Không tạo Story PR.

## 18. US-116 — Admin AI Audit Log view

- **Jira Key:** `PAC-156`
- **Parent Epic:** `PAC-EPIC-13`
- **Priority:** `Medium`
- **Story Points:** `3`
- **Exact Story branch (legacy/traceability):** `story/PAC-156-us-116-admin-ai-audit-log-view`
- **Implementation target:** `develop`

### Acceptance criteria

- Chỉ Admin có quyền xem AI Audit Log.
- API hỗ trợ pagination và filter provider/status/date.
- UI chỉ hiển thị metadata cần thiết, không raw PII.
- Staff/Warehouse không thể truy cập toàn bộ audit log.

### Tasks

| Task | Jira Key | Exact branch | Required result |
|---|---|---|---|
| PAC-TASK-335 | `PAC-545` | `feature/PAC-545-task-335-build-admin-ai-audit-log-list-api` | Build Admin AI Audit Log list API |
| PAC-TASK-336 | `PAC-546` | `feature/PAC-546-task-336-build-admin-ai-audit-log-ui` | Build Admin AI Audit Log UI |
| PAC-TASK-337 | `PAC-547` | `feature/PAC-547-task-337-add-ai-audit-filters-by-provider-status-and-date` | Add AI Audit filters by provider, status and date |

### Story completion gate

- [ ] Tất cả child Task PR đã merge vào `develop`.
- [ ] Acceptance criteria PASS trên latest `develop`.
- [ ] Story-level tests phù hợp PASS.
- [ ] Supabase verification PASS hoặc N/A hợp lệ.
- [ ] Không còn Blocking technical defect.
- [ ] Story Acceptance Review và evidence đã được ghi.
- [ ] `Recommended Jira status = DONE` đã được đề xuất.
- [ ] Không tạo Story PR.

## 19. US-142 — AI provider/model backend config

- **Jira Key:** `PAC-182`
- **Parent Epic:** `PAC-EPIC-17`
- **Priority:** `High`
- **Story Points:** `3`
- **Exact Story branch (legacy/traceability):** `story/PAC-182-us-142-ai-provider-model-backend-config`
- **Implementation target:** `develop`

### Acceptance criteria

- Backend load và validate provider/model/fallback configuration.
- Operational setting ưu tiên database active setting; nếu thiếu thì dùng environment default.
- Secret API key chỉ đọc từ environment, không lưu database và không trả frontend.
- Thiếu hoặc mâu thuẫn config phải trả safe configuration error.
- AI call có timeout/rate-limit/circuit-breaker phù hợp.

### Tasks

| Task | Jira Key | Exact branch | Required result |
|---|---|---|---|
| PAC-TASK-292 | `PAC-502` | `feature/PAC-502-task-292-configure-backend-ai-provider-model-settings-loader` | Configure backend AI provider/model settings loader |
| PAC-TASK-342 | `PAC-552` | `feature/PAC-552-task-342-add-backend-ai-provider-model-config-validation` | Add backend AI provider/model config validation |
| PAC-TASK-343 | `PAC-553` | `feature/PAC-553-task-343-add-environment-database-config-fallback-order-for-` | Add environment/database config fallback order for AI settings |

### Story completion gate

- [ ] Tất cả child Task PR đã merge vào `develop`.
- [ ] Acceptance criteria PASS trên latest `develop`.
- [ ] Story-level tests phù hợp PASS.
- [ ] Supabase verification PASS hoặc N/A hợp lệ.
- [ ] Không còn Blocking technical defect.
- [ ] Story Acceptance Review và evidence đã được ghi.
- [ ] `Recommended Jira status = DONE` đã được đề xuất.
- [ ] Không tạo Story PR.

## 20. US-143 — Seed official prompt templates

- **Jira Key:** `PAC-183`
- **Parent Epic:** `PAC-EPIC-17`
- **Priority:** `High`
- **Story Points:** `3`
- **Exact Story branch (legacy/traceability):** `story/PAC-183-us-143-seed-official-prompt-templates`
- **Implementation target:** `develop`

### Acceptance criteria

- Seed official prompt cho explanation, consultation draft và safe follow-up.
- Mỗi prompt có code/version/status rõ ràng.
- Seeder idempotent và không tạo duplicate.
- AI service có thể load prompt sau setup mà không hard-code prompt dài trong business service.

### Tasks

| Task | Jira Key | Exact branch | Required result |
|---|---|---|---|
| PAC-TASK-339 | `PAC-549` | `feature/PAC-549-task-339-seed-official-ai-prompt-templates-with-versions` | Seed official AI prompt templates with versions |

### Story completion gate

- [ ] Tất cả child Task PR đã merge vào `develop`.
- [ ] Acceptance criteria PASS trên latest `develop`.
- [ ] Story-level tests phù hợp PASS.
- [ ] Supabase verification PASS hoặc N/A hợp lệ.
- [ ] Không còn Blocking technical defect.
- [ ] Story Acceptance Review và evidence đã được ghi.
- [ ] `Recommended Jira status = DONE` đã được đề xuất.
- [ ] Không tạo Story PR.

# 13. Exact Branch Registry

## 13.1 Core Epic legacy/traceability branches

| Epic | Jira Key | Exact branch |
|---|---|---|
| EPIC-12 | `PAC-12` | `epic/PAC-12-epic-12-ai-copilot` |
| EPIC-13 | `PAC-13` | `epic/PAC-13-epic-13-ai-guardrail-ai-audit` |
| EPIC-17 | `PAC-17` | `epic/PAC-17-epic-17-system-settings` |

Cross-sprint support Epics `EPIC-19` và `EPIC-21` không tính vào inventory 88, nhưng các Task thuộc hai Epic này vẫn dùng exact Task branch chính thức.

## 13.2 Story legacy/traceability branches

| Story | Jira Key | Exact branch |
|---|---|---|
| US-99 | `PAC-139` | `story/PAC-139-us-99-ai-explanation-for-interactionalert` |
| US-100 | `PAC-140` | `story/PAC-140-us-100-ai-consultation-note-draft` |
| US-101 | `PAC-141` | `story/PAC-141-us-101-staff-confirm-ai-draft-before-official-save` |
| US-102 | `PAC-142` | `story/PAC-142-us-102-safe-follow-up-questions` |
| US-103 | `PAC-143` | `story/PAC-143-us-103-google-ai-provider-primary` |
| US-104 | `PAC-144` | `story/PAC-144-us-104-mockai-fallback-provider` |
| US-105 | `PAC-145` | `story/PAC-145-us-105-ai-input-guardrail` |
| US-106 | `PAC-146` | `story/PAC-146-us-106-block-diagnosis-requests` |
| US-107 | `PAC-147` | `story/PAC-147-us-107-block-prescribing-requests` |
| US-108 | `PAC-148` | `story/PAC-148-us-108-block-dosage-advice-requests` |
| US-109 | `PAC-149` | `story/PAC-149-us-109-ai-output-guardrail` |
| US-110 | `PAC-150` | `story/PAC-150-us-110-structured-output-validation` |
| US-111 | `PAC-151` | `story/PAC-151-us-111-pii-minimization-before-ai-call` |
| US-112 | `PAC-152` | `story/PAC-152-us-112-ai-safe-error-response` |
| US-113 | `PAC-153` | `story/PAC-153-us-113-ai-disclaimer` |
| US-114 | `PAC-154` | `story/PAC-154-us-114-ai-audit-metadata` |
| US-115 | `PAC-155` | `story/PAC-155-us-115-prompt-template-versioning` |
| US-116 | `PAC-156` | `story/PAC-156-us-116-admin-ai-audit-log-view` |
| US-142 | `PAC-182` | `story/PAC-182-us-142-ai-provider-model-backend-config` |
| US-143 | `PAC-183` | `story/PAC-183-us-143-seed-official-prompt-templates` |

## 13.3 Task implementation branches

| Task | Jira Key | Exact branch |
|---|---|---|
| PAC-TASK-291 | `PAC-501` | `feature/PAC-501-task-291-define-ai-provider-abstraction` |
| PAC-TASK-292 | `PAC-502` | `feature/PAC-502-task-292-configure-backend-ai-provider-model-settings-loader` |
| PAC-TASK-293 | `PAC-503` | `feature/PAC-503-task-293-implement-google-ai-provider-adapter` |
| PAC-TASK-294 | `PAC-504` | `feature/PAC-504-task-294-add-google-ai-timeout-and-retry-safe-error-handling` |
| PAC-TASK-295 | `PAC-505` | `feature/PAC-505-task-295-implement-mockai-fallback-adapter` |
| PAC-TASK-296 | `PAC-506` | `feature/PAC-506-task-296-implement-fallback-provider-selection-logic` |
| PAC-TASK-297 | `PAC-507` | `feature/PAC-507-task-297-add-provider-requested-and-provider-used-tracking` |
| PAC-TASK-298 | `PAC-508` | `feature/PAC-508-task-298-implement-ai-interaction-explanation-api` |
| PAC-TASK-299 | `PAC-509` | `feature/PAC-509-task-299-build-ai-explanation-panel-in-interactionalert-ui` |
| PAC-TASK-300 | `PAC-510` | `feature/PAC-510-task-300-add-ai-disclaimer-to-explanation-panel` |
| PAC-TASK-301 | `PAC-511` | `feature/PAC-511-task-301-build-ai-explanation-loading-error-and-fallback-sta` |
| PAC-TASK-302 | `PAC-512` | `feature/PAC-512-task-302-implement-ai-consultation-note-draft-api` |
| PAC-TASK-303 | `PAC-513` | `feature/PAC-513-task-303-build-ai-consultation-note-draft-panel` |
| PAC-TASK-304 | `PAC-514` | `feature/PAC-514-task-304-build-staff-edit-ai-draft-before-confirm-ui` |
| PAC-TASK-305 | `PAC-515` | `feature/PAC-515-task-305-implement-staff-confirm-ai-draft-as-official-consul` |
| PAC-TASK-306 | `PAC-516` | `feature/PAC-516-task-306-prevent-unconfirmed-ai-draft-from-saving-official-n` |
| PAC-TASK-307 | `PAC-517` | `feature/PAC-517-task-307-link-confirmed-ai-note-to-correct-high-interactiona` |
| PAC-TASK-308 | `PAC-518` | `feature/PAC-518-task-308-implement-safe-follow-up-question-api` |
| PAC-TASK-309 | `PAC-519` | `feature/PAC-519-task-309-build-safe-follow-up-question-ui-field` |
| PAC-TASK-310 | `PAC-520` | `feature/PAC-520-task-310-block-medical-record-style-storage-for-symptom-cont` |
| PAC-TASK-311 | `PAC-521` | `feature/PAC-521-task-311-add-ai-copilot-permission-checks` |
| PAC-TASK-312 | `PAC-522` | `feature/PAC-522-task-312-add-ai-copilot-frontend-route-and-action-guards` |
| PAC-TASK-313 | `PAC-523` | `test/PAC-523-task-313-add-ai-provider-unit-tests` |
| PAC-TASK-314 | `PAC-524` | `test/PAC-524-task-314-add-mockai-fallback-tests` |
| PAC-TASK-315 | `PAC-525` | `feature/PAC-525-task-315-add-ai-copilot-integration-smoke-checklist` |
| PAC-TASK-316 | `PAC-526` | `feature/PAC-526-task-316-define-unsafe-ai-request-categories` |
| PAC-TASK-317 | `PAC-527` | `feature/PAC-527-task-317-implement-ai-input-guardrail-service` |
| PAC-TASK-318 | `PAC-528` | `feature/PAC-528-task-318-block-diagnosis-requests` |
| PAC-TASK-319 | `PAC-529` | `feature/PAC-529-task-319-block-prescribing-requests` |
| PAC-TASK-320 | `PAC-530` | `feature/PAC-530-task-320-block-dosage-advice-requests` |
| PAC-TASK-321 | `PAC-531` | `feature/PAC-531-task-321-add-safe-response-templates-for-blocked-ai-input` |
| PAC-TASK-322 | `PAC-532` | `feature/PAC-532-task-322-add-pii-minimization-before-ai-provider-call` |
| PAC-TASK-323 | `PAC-533` | `feature/PAC-533-task-323-redact-customer-order-unnecessary-personal-data-bef` |
| PAC-TASK-324 | `PAC-534` | `feature/PAC-534-task-324-implement-ai-output-guardrail-service` |
| PAC-TASK-325 | `PAC-535` | `feature/PAC-535-task-325-block-unsafe-ai-output-before-rendering` |
| PAC-TASK-326 | `PAC-536` | `feature/PAC-536-task-326-implement-structured-output-schema-validation` |
| PAC-TASK-327 | `PAC-537` | `feature/PAC-537-task-327-add-output-schema-retry-or-safe-fallback-handling` |
| PAC-TASK-328 | `PAC-538` | `feature/PAC-538-task-328-add-guardrail-status-object-to-ai-response` |
| PAC-TASK-329 | `PAC-539` | `feature/PAC-539-task-329-create-ai-audit-logs-prisma-model` |
| PAC-TASK-330 | `PAC-540` | `feature/PAC-540-task-330-implement-ai-audit-log-write-service` |
| PAC-TASK-331 | `PAC-541` | `feature/PAC-541-task-331-persist-ai-provider-model-and-prompt-metadata` |
| PAC-TASK-332 | `PAC-542` | `feature/PAC-542-task-332-persist-input-and-output-guardrail-statuses` |
| PAC-TASK-333 | `PAC-543` | `feature/PAC-543-task-333-persist-ai-latency-request-id-and-fallback-metadata` |
| PAC-TASK-334 | `PAC-544` | `feature/PAC-544-task-334-ensure-ai-audit-does-not-store-raw-pii` |
| PAC-TASK-335 | `PAC-545` | `feature/PAC-545-task-335-build-admin-ai-audit-log-list-api` |
| PAC-TASK-336 | `PAC-546` | `feature/PAC-546-task-336-build-admin-ai-audit-log-ui` |
| PAC-TASK-337 | `PAC-547` | `feature/PAC-547-task-337-add-ai-audit-filters-by-provider-status-and-date` |
| PAC-TASK-338 | `PAC-548` | `feature/PAC-548-task-338-create-prompt-templates-prisma-model` |
| PAC-TASK-339 | `PAC-549` | `feature/PAC-549-task-339-seed-official-ai-prompt-templates-with-versions` |
| PAC-TASK-340 | `PAC-550` | `feature/PAC-550-task-340-load-approved-prompt-template-by-use-case` |
| PAC-TASK-341 | `PAC-551` | `feature/PAC-551-task-341-record-prompt-version-in-ai-audit` |
| PAC-TASK-342 | `PAC-552` | `feature/PAC-552-task-342-add-backend-ai-provider-model-config-validation` |
| PAC-TASK-343 | `PAC-553` | `feature/PAC-553-task-343-add-environment-database-config-fallback-order-for-` |
| PAC-TASK-344 | `PAC-554` | `feature/PAC-554-task-344-add-timeout-circuit-breaker-and-rate-limit-guard-fo` |
| PAC-TASK-345 | `PAC-555` | `feature/PAC-555-task-345-add-ai-safe-error-response-helper` |
| PAC-TASK-346 | `PAC-556` | `test/PAC-556-task-346-add-ai-input-guardrail-unit-tests` |
| PAC-TASK-347 | `PAC-557` | `test/PAC-557-task-347-add-diagnosis-block-tests` |
| PAC-TASK-348 | `PAC-558` | `test/PAC-558-task-348-add-prescribing-block-tests` |
| PAC-TASK-349 | `PAC-559` | `test/PAC-559-task-349-add-dosage-advice-block-tests` |
| PAC-TASK-350 | `PAC-560` | `test/PAC-560-task-350-add-ai-output-guardrail-tests` |
| PAC-TASK-351 | `PAC-561` | `test/PAC-561-task-351-add-structured-output-validation-tests` |
| PAC-TASK-352 | `PAC-562` | `test/PAC-562-task-352-add-pii-minimization-tests` |
| PAC-TASK-353 | `PAC-563` | `test/PAC-563-task-353-add-ai-audit-integration-tests` |
| PAC-TASK-354 | `PAC-564` | `test/PAC-564-task-354-add-prompt-versioning-tests` |
| PAC-TASK-355 | `PAC-565` | `feature/PAC-565-task-355-add-ai-safety-traceability-notes` |

# 14. Database and Migration Requirements

Các model/migration có khả năng phát sinh trong Sprint 7:

- `AIAuditLog`.
- `PromptTemplate`.
- AI operational setting records nếu schema hiện tại chưa có cấu trúc phù hợp.

Yêu cầu:

- Đọc schema/migration hiện tại trước khi thêm model.
- Không duplicate model hoặc enum đã tồn tại.
- Migration phải forward-only, review được và không destructive.
- Unique constraint phù hợp cho prompt `code + version`.
- Index cho audit filter theo date/provider/status nếu cần.
- Không có column raw prompt/raw response/raw PII mặc định.
- `prisma validate` và `prisma generate` phải PASS.
- Persistent changes phải verify trên Supabase test environment an toàn.

# 15. Testing Requirements

## 15.1 Task level

- Chạy targeted tests đúng phần thay đổi.
- Provider adapter: success/error/fallback metadata.
- Guardrail: safe PASS, unsafe BLOCKED, provider not called.
- Prompt/audit/schema: Prisma validation và integration tests phù hợp.
- UI: loading/error/fallback/disclaimer/permission states.

## 15.2 Story level

- Story Acceptance Review trên latest `develop`.
- Module/integration tests cho toàn Story.
- Không phụ thuộc Google AI live call cho mọi automated test; mock adapter ở unit/integration level.
- Có ít nhất một controlled manual provider verification ở môi trường test khi config an toàn.

## 15.3 Epic/Sprint level

- Full relevant backend/frontend tests và builds.
- AI safety regression: diagnosis, prescribing, dosage, unsafe output.
- Privacy regression: no raw PII in audit.
- Fallback regression: Google failure → MockAI hoặc safe error đúng policy.
- Human confirmation regression.
- Checkout independence regression.
- Prompt version provenance regression.

# 16. Definition of Done

## Task

- Exact Task branch được dùng.
- Acceptance criteria đạt.
- Local Quality Gate PASS.
- PR merge vào `develop` và có merge SHA.
- Progress/evidence cập nhật.
- `Recommended Jira status = DONE` được ghi.

## Story

- Tất cả child Task PR đã merge vào `develop`.
- Story Acceptance Review PASS.
- Story tests và Supabase verification PASS/N/A.
- Không có Story PR.

## Core Epic

- Tất cả Story thuộc Epic PASS.
- Epic Integration/Regression Review PASS.
- Không có Epic PR.
- Không còn Blocking/High defect ảnh hưởng phạm vi Sprint.

## Sprint

```text
65/65 Task branches used
65/65 Task PRs merged into develop
20/20 Story Acceptance Reviews PASS
3/3 Core Epic Integration/Regression Reviews PASS
Google AI primary verification PASS
MockAI fallback verification PASS
Input guardrail regression PASS
Output guardrail regression PASS
Diagnosis/prescribing/dosage blocking PASS
PII minimization and audit privacy PASS
Prompt versioning/provenance PASS
Human confirmation PASS
Checkout independence PASS
Local Quality Gate evidence complete
Sprint Final Review PASS
Ready for release = Yes
Develop → main = Waiting for Project Owner
```

# 17. Preparation Deliverables

Bộ tài liệu Sprint 7:

1. `sprint-7.md`
2. `sprint-7-progress.md`
3. `sprint-7-audit.md`
4. `sprint-7-agent-prompt.md`
5. `sprint-6-final-review-prompt.md`

Không chạy implementation Sprint 7 trước khi:

```text
Sprint 6 Final Review = PASS
Ready for Sprint 7 = Yes
Sprint 7 Audit status = Completed
Ready to implement Sprint 7 = Yes
```

# 18. Current Official State

```text
Sprint 7 = Prepared
Sprint 6 Final Review = Pending
Ready for Sprint 7 = No
Ready to implement Sprint 7 = No
GitHub Actions = Not configured
Quality gate = Local Quality Gate
Git workflow = Task/Bug → develop
Story PR = Not required
Epic PR = Not required
Jira updates = Manual by Project Owner
Release merge develop → main = Project Owner only
```

Khi Sprint 6 Final Review PASS, bước kế tiếp là chạy `sprint-7-audit.md`; chỉ sau Audit PASS mới chạy `sprint-7-agent-prompt.md`.
