# Sprint 7 Audit — PharmaAssist AI Intelligence

> **Pre-implementation audit cho Sprint 7**
>
> Repository path đề xuất:
>
> `work-context/sprint-7/sprint-7-audit.md`
>
> Audit này chỉ kiểm tra mức độ sẵn sàng. Không triển khai production code, không tạo migration và không ghi dữ liệu AI trên môi trường không an toàn trong lúc audit.

---

# 1. Initial Status

| Field | Initial value |
|---|---|
| Audit status | **Completed** |
| Ready to implement Sprint 7 | **Yes** |
| Sprint 5 Final Review | PASS |
| Sprint 6 Final Review | PASS |
| Latest `develop` stable | Yes |
| GitHub access | Verified |
| Supabase access | Verified |
| Safe Supabase environment | Verified |
| Google AI backend configuration | Verified |
| MockAI fallback | Verified |
| Exact Sprint 7 branch inventory | Verified |
| Open Blocking/High defects | 0 |
| Final decision | PASS |

Kết luận hợp lệ:

```text
Audit status = Completed
Ready to implement Sprint 7 = Yes
Mandatory Gates PASS = 17/17
Blocking findings = None
```

Không được ghi `Ready to implement Sprint 7 = Yes` nếu còn bất kỳ Mandatory Gate nào chưa PASS.

---

# 2. Audit Scope

Sprint 7 có phạm vi chuẩn bị:

```text
Tasks: PAC-TASK-291 → PAC-TASK-355
Task count: 65
Stories: US-99 → US-116; US-142 → US-143
Story count: 20
Core Epics: PAC-EPIC-12, PAC-EPIC-13, PAC-EPIC-17
Supporting Epics: PAC-EPIC-19, PAC-EPIC-21
Primary provider: Google AI
Fallback provider: MockAI
CI: N/A — GitHub Actions chưa được cấu hình
Merge gate: Local Quality Gate
```

Audit phải kiểm tra 17 Mandatory Gates:

1. Sprint 5 và Sprint 6 Dependency Gate.
2. Repository Baseline Gate.
3. Exact Branch Inventory Gate.
4. GitHub PR/Merge Capability Gate.
5. Supabase Access and Safe Environment Gate.
6. Auth, Permission, Order and InteractionAlert Dependency Gate.
7. AI Provider Configuration and Secret Safety Gate.
8. Provider Abstraction and Fallback Design Gate.
9. Input Guardrail Gate.
10. PII Minimization and Privacy Gate.
11. Output Guardrail and Structured Output Gate.
12. Prompt Versioning Gate.
13. AI Audit and Provenance Gate.
14. Human Confirmation and Checkout Independence Gate.
15. Existing Code and Scope Conflict Gate.
16. Local Testing and Quality Gate Readiness.
17. Open Defect, Migration Risk and Final Authorization Gate.

---

# 3. Audit Rules

- Audit trước, code sau.
- Không sửa production code trong lúc audit.
- Không tạo hoặc apply migration Sprint 7 trong lúc audit.
- Không tạo Task branch thay thế.
- Không đổi/rút gọn exact branch name.
- `Jira/branch-on-jira.md` là nguồn duy nhất cho exact branch.
- Nếu Sprint 7 documents khác canonical branch registry, ghi **Blocker** và đồng bộ tài liệu trước khi code.
- Không gọi Google AI từ frontend.
- Không in API key, token hoặc secret vào terminal output, log, audit evidence hay tài liệu.
- Không chạy destructive test trên production/demo database.
- Không ghi raw PII, symptom/context hoặc raw prompt nhạy cảm làm audit evidence.
- Jira do Project Owner quản lý; audit không chuyển trạng thái hoặc comment Jira.
- GitHub Actions không phải gate của Sprint 7.
- Audit không được báo CI PASS.
- Evidence hợp lệ phải ghi:

```text
CI = N/A — GitHub Actions chưa được cấu hình
Local Quality Gate = Pending/PASS/FAIL
```

---

# 4. Required Documents and Evidence Priority

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
12. Sprint 5 plan/progress/audit/final review.
13. Sprint 6 plan/progress/audit/final review.
14. `work-context/sprint-7/sprint-7.md`
15. `work-context/sprint-7/sprint-7-progress.md`
16. Prisma schema và migrations.
17. Backend Auth, InteractionAlert, Checkout, AI/config/audit code.
18. Frontend InteractionAlert/POS code.
19. Test scripts và test setup hiện có.

Evidence priority:

1. Canonical branch registry.
2. Repository code và Git history.
3. GitHub PR/merge evidence.
4. Prisma schema và migrations.
5. Supabase schema/data evidence trên môi trường an toàn.
6. Local test/build evidence.
7. Sprint progress/audit documents.
8. Jira manual status do Project Owner xác nhận.

---

# 5. Gate 01 — Sprint 5 and Sprint 6 Dependency

| Dependency | Required | Actual | Result | Severity |
|---|---|---|---|---|
| Sprint 5 Final Review | PASS | Not verified | Pending | Blocker |
| Sprint 6 Final Review | PASS | Not verified | Pending | Blocker |
| Latest `develop` | Stable and synchronized | Not verified | Pending | Blocker |
| InteractionAlert lifecycle | Working | Not verified | Pending | Blocker |
| HIGH acknowledgement | Working | Not verified | Pending | Blocker |
| Official consultation note | Working | Not verified | Pending | Blocker |
| Checkout unresolved-HIGH blocker | Working | Not verified | Pending | Blocker |
| Order ownership/permission | Working | Not verified | Pending | Blocker |
| Open checkout/alert blockers | 0 | Unknown | Pending | Blocker |

Checklist:

- [ ] Sprint 5 Final Review evidence tồn tại.
- [ ] Sprint 6 Final Review evidence tồn tại.
- [ ] Sprint 5 và Sprint 6 changes có trên remote `develop`.
- [ ] HIGH alert có acknowledgement và official note contract ổn định.
- [ ] Checkout chỉ đọc official note, không đọc AI draft.
- [ ] AI provider không phải dependency bắt buộc của checkout.
- [ ] Không có Blocking/High defect ảnh hưởng Order, Alert hoặc Checkout.

```text
Gate 01 = Not evaluated
```

---

# 6. Gate 02 — Repository Baseline

- [ ] `AGENTS.md` tồn tại và được đọc.
- [ ] `.agents/rules/rules-w-pharmaassist.md` tồn tại và được đọc.
- [ ] `WORKING-CONTEXT.md` phản ánh trạng thái sau Sprint 6.
- [ ] `DESIGN.md` thống nhất với Sprint 7.
- [ ] Không có thay đổi chưa commit từ Sprint trước gây nhiễu.
- [ ] Local `develop` đồng bộ với `origin/develop`.
- [ ] Repository structure cho backend/frontend/Prisma được xác định.
- [ ] Package manager và scripts thực tế được xác định.
- [ ] Không có tài liệu cũ yêu cầu MockAI làm primary.
- [ ] Không có tài liệu cũ cho phép AI quyết định checkout.

| Check | Evidence | Result | Finding |
|---|---|---|---|
| Working tree clean/controlled | — | Pending | — |
| Local/remote `develop` aligned | — | Pending | — |
| Rules and design aligned | — | Pending | — |
| Package scripts identified | — | Pending | — |
| Legacy AI baseline conflicts | — | Pending | — |

```text
Gate 02 = Not evaluated
```

---

# 7. Gate 03 — Exact Branch Inventory

Expected prepared scope:

```text
65 Task branches
20 Story branches — legacy/traceability only
3 Core Epic branches — legacy/traceability only
Total = 88
```

Expected prepared Task mapping:

```text
PAC-TASK-291 → PAC-TASK-355
Prepared Jira range: PAC-501 → PAC-565
```

Audit rule:

> Mapping trên chỉ là expected state từ tài liệu Sprint 7 đã chuẩn bị. Audit phải đối chiếu từng dòng với canonical `Jira/branch-on-jira.md`. Nếu có lệch Jira Key, prefix, case hoặc slug thì canonical registry thắng và toàn bộ Sprint 7 documents phải được đồng bộ trước implementation.

Checklist:

- [ ] 65/65 Task logical keys có exact branch.
- [ ] 20/20 Story logical keys có exact branch.
- [ ] 3/3 Core Epic logical keys có exact branch.
- [ ] Không có duplicate branch.
- [ ] Không có branch ngoài canonical registry.
- [ ] Không có alternate branch variant.
- [ ] First Task branch đã xác minh.
- [ ] Last Task branch đã xác minh.
- [ ] `sprint-7.md` đồng bộ canonical registry.
- [ ] `sprint-7-progress.md` đồng bộ canonical registry.

First Task expected by prepared plan:

```text
Logical Task: PAC-TASK-291 / TASK-291
Expected Jira Key: PAC-501
Expected branch:
feature/PAC-501-task-291-define-ai-provider-abstraction
```

Last Task expected by prepared plan:

```text
Logical Task: PAC-TASK-355 / TASK-355
Expected Jira Key: PAC-565
Expected branch:
feature/PAC-565-task-355-add-ai-safety-traceability-notes
```

| Branch category | Expected | Verified | Result |
|---|---:|---:|---|
| Task | 65 | 0 | Pending |
| Story | 20 | 0 | Pending |
| Core Epic | 3 | 0 | Pending |
| **Total** | **88** | **0** | **Pending** |

```text
Gate 03 = Not evaluated
```

---

# 8. Gate 04 — GitHub PR and Merge Capability

- [ ] Repository remote đúng.
- [ ] AI/agent có quyền fetch, push branch và tạo PR.
- [ ] AI/agent có quyền merge PR vào `develop`.
- [ ] `develop` không cho direct push theo workflow dự án.
- [ ] Task/Bug PR target `develop`.
- [ ] Story/Epic PR không được dùng.
- [ ] `develop → main` chỉ Project Owner được merge.
- [ ] Không có required CI check vì GitHub Actions chưa cấu hình.
- [ ] Branch protection/ruleset không chặn workflow ngoài dự kiến.
- [ ] Có thể xác minh PR state và merge SHA sau merge.

| Capability | Actual | Evidence | Result |
|---|---|---|---|
| Fetch/pull `develop` | Unknown | — | Pending |
| Push Task branch | Unknown | — | Pending |
| Create PR to `develop` | Unknown | — | Pending |
| Merge Task PR | Unknown | — | Pending |
| Verify merge SHA | Unknown | — | Pending |
| Direct push blocked | Unknown | — | Pending |
| CI required checks | Must be Off/N/A | — | Pending |

```text
Gate 04 = Not evaluated
```

---

# 9. Gate 05 — Supabase Access and Safe Environment

- [ ] Supabase project/environment được xác định.
- [ ] Environment không phải production hoặc demo database dùng để chấm bài.
- [ ] Có quyền đọc schema cần thiết.
- [ ] Có strategy cleanup/rollback cho audit verification.
- [ ] Không chạy destructive test.
- [ ] Không reset toàn bộ database.
- [ ] Không ghi dữ liệu AI chứa raw PII.
- [ ] Prompt/Audit migration chỉ được apply sau implementation authorization.
- [ ] Database URL không được ghi vào tài liệu.
- [ ] Service-role key không được in/log.

| Area | Required | Actual | Result |
|---|---|---|---|
| Connection available | Yes | Not verified | Pending |
| Environment safe | Yes | Not verified | Pending |
| Schema read access | Yes | Not verified | Pending |
| Controlled write verification | Optional after authorization | Not started | N/A/Pending |
| Cleanup strategy | Defined | Not verified | Pending |
| Secret exposure | None | Not verified | Pending |

```text
Gate 05 = Not evaluated
```

---

# 10. Gate 06 — Auth, Permission, Order and InteractionAlert Dependencies

## Auth and permission

- [ ] Backend AuthGuard hoạt động.
- [ ] PermissionGuard hoạt động.
- [ ] Staff/Admin permissions được xác định.
- [ ] Warehouse bị chặn khỏi AI Copilot liên quan InteractionAlert.
- [ ] Frontend guard không thay backend authorization.

## Order and alert context

- [ ] Order/OrderItem context đọc được.
- [ ] InteractionAlert gắn đúng Order.
- [ ] Alert severity snapshot ổn định.
- [ ] HIGH alert có official note field/relationship rõ.
- [ ] Staff ownership được enforce.
- [ ] Admin scope được xác định.
- [ ] AI explanation không mutate order/stock/payment.
- [ ] AI note draft không tự resolve alert.

| Dependency | Code evidence | Data evidence | Result |
|---|---|---|---|
| AuthGuard | — | N/A | Pending |
| PermissionGuard | — | N/A | Pending |
| AI permission codes | — | — | Pending |
| Warehouse denial | — | — | Pending |
| Order context | — | — | Pending |
| Alert context | — | — | Pending |
| Official note contract | — | — | Pending |
| Ownership | — | — | Pending |

```text
Gate 06 = Not evaluated
```

---

# 11. Gate 07 — AI Provider Configuration and Secret Safety

Required configuration principles:

```text
Database active provider/model setting
→ fallback to backend environment defaults
→ safe configuration error if missing/invalid
```

Secret policy:

```text
Google AI API key = backend environment only
No frontend exposure
No database storage
No Git commit
No audit-log storage
No response exposure
```

Checklist:

- [ ] Existing environment loader được xác định.
- [ ] Provider/model setting location được xác định.
- [ ] Google AI API key chỉ dùng backend.
- [ ] MockAI không cần secret.
- [ ] Timeout configuration có giới hạn.
- [ ] Retry không vô hạn.
- [ ] Rate-limit/circuit behavior được xác định.
- [ ] Missing config trả safe error.
- [ ] Logs không in secret/request payload nhạy cảm.
- [ ] Frontend bundle không chứa server secret.

| Check | Actual | Evidence | Result |
|---|---|---|---|
| Backend-only key | Unknown | — | Pending |
| Provider/model precedence | Unknown | — | Pending |
| Missing config behavior | Unknown | — | Pending |
| Timeout/retry policy | Unknown | — | Pending |
| Secret scanning/review | Unknown | — | Pending |

```text
Gate 07 = Not evaluated
```

---

# 12. Gate 08 — Provider Abstraction and Fallback Design

- [ ] Provider interface/contract location được xác định.
- [ ] Controller không hard-code Google AI.
- [ ] Google AI là primary provider.
- [ ] MockAI chỉ là fallback.
- [ ] Input/output DTO chung được xác định.
- [ ] `provider_requested` và `provider_used` được phân biệt.
- [ ] Fallback reason được lưu.
- [ ] Không fallback khi input guardrail đã block.
- [ ] Không retry/fallback vô hạn.
- [ ] Provider error không làm crash POS.
- [ ] Unit-test mocking strategy tồn tại.
- [ ] Live Google call không bắt buộc cho mọi automated test.

| Area | Existing state | Conflict | Required action | Result |
|---|---|---|---|---|
| Provider abstraction | Unknown | Unknown | Inspect | Pending |
| Google adapter | Unknown | Unknown | Inspect | Pending |
| MockAI adapter | Unknown | Unknown | Inspect | Pending |
| Fallback selection | Unknown | Unknown | Inspect | Pending |
| Provider metadata | Unknown | Unknown | Inspect | Pending |

```text
Gate 08 = Not evaluated
```

---

# 13. Gate 09 — Input Guardrail

Unsafe categories tối thiểu:

- diagnosis;
- prescribing;
- dosage amount/frequency/duration;
- excessive PII;
- medical-record creation;
- request ngoài pharmacy-support scope.

Checklist:

- [ ] Input guardrail chạy trước provider call.
- [ ] Guardrail có structured result.
- [ ] Blocked input không gọi provider.
- [ ] Safe blocked response có code/reason.
- [ ] Diagnosis request bị chặn.
- [ ] Prescribing request bị chặn.
- [ ] Dosage advice request bị chặn.
- [ ] Follow-up question feature không biến thành diagnosis tool.
- [ ] Guardrail status được truyền sang audit.
- [ ] Test cases cho từng unsafe category được xác định.

| Unsafe category | Detection approach | Expected result | Test evidence | Result |
|---|---|---|---|---|
| Diagnosis | — | BLOCKED | — | Pending |
| Prescribing | — | BLOCKED | — | Pending |
| Dosage advice | — | BLOCKED | — | Pending |
| Excessive PII | — | REDACT/BLOCK | — | Pending |
| Medical-record request | — | BLOCKED | — | Pending |
| Out-of-scope request | — | SAFE ERROR | — | Pending |

```text
Gate 09 = Not evaluated
```

---

# 14. Gate 10 — PII Minimization and Privacy

- [ ] Minimum necessary context được xác định cho từng AI use case.
- [ ] Customer name/email/phone/address không gửi nếu không cần.
- [ ] Order identifiers được pseudonymize/minimize khi có thể.
- [ ] Raw symptom/context không persist như medical record.
- [ ] Raw prompt có PII không ghi vào AI Audit.
- [ ] Raw output nhạy cảm không ghi vào AI Audit.
- [ ] Logs không chứa full request payload.
- [ ] Test fixture không dùng dữ liệu cá nhân thật.
- [ ] Admin Audit UI không hiển thị raw PII.
- [ ] Evidence được redact trước khi lưu tài liệu.

| Data class | Allowed to provider | Allowed in audit | Required handling | Result |
|---|---|---|---|---|
| Medicine/ingredient/rule | Yes | Metadata/reference | Minimum context | Pending |
| Alert/order IDs | Minimized | Reference only | No unnecessary detail | Pending |
| Customer PII | No unless strictly required | No | Redact/remove | Pending |
| Symptom/context | Minimized/transient | No raw value | Do not persist | Pending |
| Prompt/output raw text | Controlled only | No raw PII | Redact/hash/summary | Pending |

```text
Gate 10 = Not evaluated
```

---

# 15. Gate 11 — Output Guardrail and Structured Output

- [ ] Mỗi AI use case có output schema.
- [ ] Provider output được parse/validate.
- [ ] Invalid output không render trực tiếp.
- [ ] Unsafe output bị chặn trước UI.
- [ ] Retry có giới hạn.
- [ ] Safe fallback response tồn tại.
- [ ] Disclaimer được thêm ở application layer hoặc verified output.
- [ ] Không render raw provider response.
- [ ] Output guardrail status được audit.
- [ ] Fallback output cũng phải qua guardrail.
- [ ] Tests cho malformed/unsafe output được xác định.

| Area | Required behavior | Actual | Result |
|---|---|---|---|
| Schema validation | Mandatory | Not verified | Pending |
| Unsafe output block | Mandatory | Not verified | Pending |
| Retry limit | Bounded | Not verified | Pending |
| Safe fallback | Available | Not verified | Pending |
| Disclaimer | Consistent | Not verified | Pending |
| Raw output rendering | Forbidden | Not verified | Pending |

```text
Gate 11 = Not evaluated
```

---

# 16. Gate 12 — Prompt Versioning

- [ ] PromptTemplate schema/design được xác định.
- [ ] Prompt có stable code.
- [ ] Prompt có version.
- [ ] Approved/active state được xác định.
- [ ] AI request load approved version.
- [ ] Prompt code/version truyền sang Audit.
- [ ] Seed official prompts idempotent.
- [ ] Không hard-code toàn bộ prompt trong controller.
- [ ] Prompt content không chứa secret.
- [ ] Không cần Prompt Management UI trong Sprint 7.
- [ ] Migration risk được đánh giá trước khi apply.

| Check | Existing state | Evidence | Result |
|---|---|---|---|
| Prompt model | Unknown | — | Pending |
| Stable prompt code | Unknown | — | Pending |
| Version selection | Unknown | — | Pending |
| Approval/active rule | Unknown | — | Pending |
| Audit linkage | Unknown | — | Pending |
| Seed idempotency | Unknown | — | Pending |

```text
Gate 12 = Not evaluated
```

---

# 17. Gate 13 — AI Audit and Provenance

Required metadata tối thiểu:

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

Rules:

- AI Audit là bắt buộc cho success, blocked, fallback và provider failure.
- Không lưu raw PII.
- Không lưu API key.
- Không xem MockAI fallback là audit bypass.
- Nếu successful AI output không thể ghi mandatory audit evidence, không trả output đó như successful result.
- Admin Audit API/UI chỉ hiển thị metadata cần thiết.

Checklist:

- [ ] `AIAuditLog` design được xác định.
- [ ] Index/retention/query needs được đánh giá.
- [ ] Audit write service boundary được xác định.
- [ ] Audit failure policy được chốt fail-safe.
- [ ] Success attempt được audit.
- [ ] Blocked input được audit.
- [ ] Unsafe output được audit.
- [ ] Provider error/fallback được audit.
- [ ] Prompt provenance được audit.
- [ ] No raw PII policy có test.

| Scenario | Mandatory audit | Expected status | Result |
|---|---|---|---|
| Google success | Yes | SUCCESS | Pending |
| MockAI fallback | Yes | FALLBACK/SUCCESS | Pending |
| Input blocked | Yes | BLOCKED | Pending |
| Output blocked | Yes | BLOCKED/FAILED | Pending |
| Provider timeout/error | Yes | FAILED/FALLBACK | Pending |
| Audit persistence failure | Fail-safe response | FAILED | Pending |

```text
Gate 13 = Not evaluated
```

---

# 18. Gate 14 — Human Confirmation and Checkout Independence

Correct flow:

```text
Generate AI draft
→ Staff reviews/edits
→ Staff explicitly confirms
→ Save official consultation note
```

Checklist:

- [ ] AI draft response và official note được tách rõ.
- [ ] Generate draft không auto-save official note.
- [ ] Staff edit được trước confirm.
- [ ] Explicit confirm action tồn tại.
- [ ] Confirm action enforce permission/ownership.
- [ ] Official note gắn đúng HIGH InteractionAlert.
- [ ] Actor/time được lưu.
- [ ] Checkout chỉ đọc official note.
- [ ] AI provider unavailable không chặn manual note flow.
- [ ] AI explanation không thay đổi alert status.
- [ ] Draft chưa confirm không unlock checkout.
- [ ] Warehouse không truy cập flow này.

| Scenario | Expected result | Evidence | Result |
|---|---|---|---|
| Draft generated, not confirmed | No official note | — | Pending |
| Staff edits and confirms | Official note saved | — | Pending |
| Wrong alert/order | Reject | — | Pending |
| Wrong permission | 403 | — | Pending |
| AI unavailable | Manual flow works | — | Pending |
| Checkout unresolved HIGH | Block | — | Pending |
| Checkout with official note | Continue if other gates pass | — | Pending |

```text
Gate 14 = Not evaluated
```

---

# 19. Gate 15 — Existing Code and Scope Conflict

Inspect and classify each area:

```text
Done
Partial
Missing
Conflict
Failed verification
N/A
```

| Area | Existing state | Conflict with Sprint 7 | Required action | Result |
|---|---|---|---|---|
| AI provider service | Unknown | Unknown | Inspect | Pending |
| Google AI adapter | Unknown | Unknown | Inspect | Pending |
| MockAI implementation | Unknown | Unknown | Inspect | Pending |
| AI controller/endpoints | Unknown | Unknown | Inspect | Pending |
| Input guardrail | Unknown | Unknown | Inspect | Pending |
| Output guardrail | Unknown | Unknown | Inspect | Pending |
| Prompt templates | Unknown | Unknown | Inspect | Pending |
| AI audit model/service | Unknown | Unknown | Inspect | Pending |
| Admin AI Audit UI | Unknown | Unknown | Inspect | Pending |
| AI note draft UI | Unknown | Unknown | Inspect | Pending |
| Legacy provider config | Unknown | Unknown | Inspect | Pending |
| Legacy unsafe prompt/output | Unknown | Unknown | Inspect | Pending |

Out-of-scope kiểm tra:

- [ ] Không kéo Graph Sync/Neo4j vào Sprint 7.
- [ ] Không triển khai Graph-RAG.
- [ ] Không triển khai AI Business Report Narrative.
- [ ] Không triển khai Prompt Management UI.
- [ ] Không triển khai AI Provider Settings UI nâng cao.
- [ ] Không tạo medical record.
- [ ] Không thay deterministic checkout logic bằng AI.
- [ ] Không tạo diagnosis/prescription/dosage feature.

```text
Gate 15 = Not evaluated
```

---

# 20. Gate 16 — Local Testing and Quality Gate Readiness

GitHub Actions không được dùng trong Sprint 7.

```text
CI = N/A — GitHub Actions chưa được cấu hình
```

Audit phải xác định scripts thật trong repository:

| Area | Script/command | Exists | Baseline result |
|---|---|---|---|
| Backend lint | — | Unknown | Pending |
| Backend typecheck | — | Unknown | Pending |
| Backend targeted tests | — | Unknown | Pending |
| Backend build | — | Unknown | Pending |
| Frontend lint | — | Unknown | Pending |
| Frontend typecheck | — | Unknown | Pending |
| Frontend targeted tests | — | Unknown | Pending |
| Frontend build | — | Unknown | Pending |
| Prisma validate | — | Unknown | Pending |
| Prisma generate | — | Unknown | Pending |

Local Quality Gate cho Task PR:

1. exact branch và Jira Key đúng;
2. acceptance criteria hoàn thành;
3. targeted local checks PASS;
4. Prisma/Supabase PASS hoặc N/A hợp lệ;
5. diff đúng scope;
6. không có secret;
7. không conflict;
8. không Blocking defect;
9. PR target `develop`;
10. GitHub báo mergeable.

Checklist:

- [ ] Các lệnh test thực tế chạy được.
- [ ] Không phụ thuộc GitHub Actions.
- [ ] Unit tests có thể mock Google AI.
- [ ] Fallback tests không cần live provider.
- [ ] Có strategy test blocked input/output.
- [ ] Có strategy test PII redaction.
- [ ] Có strategy test audit persistence.
- [ ] Full suite chỉ chạy Story/Epic/Sprint review.
- [ ] Không destructive test demo/production DB.

```text
Gate 16 = Not evaluated
```

---

# 21. Gate 17 — Open Defect, Migration Risk and Final Authorization

## Open defects

- [ ] Không có Blocking defect.
- [ ] Không có High defect ảnh hưởng AI safety.
- [ ] Không có High defect ảnh hưởng official note/checkout.
- [ ] Bug ngoài Task scope được ghi Bug Candidate.
- [ ] AI không tự tạo Jira Bug Key.
- [ ] Nếu cần Bug branch, Project Owner đã cung cấp Jira Bug Key thật.

## Migration risk

Potential Sprint 7 persistent models/settings:

```text
PromptTemplate
AIAuditLog
AI provider/model operational settings
official note metadata changes — only if truly required
```

- [ ] Migration là additive hoặc có rollback plan.
- [ ] Không drop/rename dữ liệu hiện có nếu chưa được phê duyệt.
- [ ] Không lưu secret trong database.
- [ ] Không tạo raw medical-record storage.
- [ ] Supabase environment an toàn.
- [ ] Prisma validate/generate baseline PASS.
- [ ] Schema conflicts được liệt kê.

## Final authorization

| Mandatory Gate | Result |
|---|---|
| Gate 01 — Sprint dependencies | Pending |
| Gate 02 — Repository baseline | Pending |
| Gate 03 — Exact branches | Pending |
| Gate 04 — GitHub capability | Pending |
| Gate 05 — Supabase safety | Pending |
| Gate 06 — Auth/Order/Alert dependencies | Pending |
| Gate 07 — AI config/secret safety | Pending |
| Gate 08 — Provider/fallback design | Pending |
| Gate 09 — Input guardrail | Pending |
| Gate 10 — PII/privacy | Pending |
| Gate 11 — Output guardrail/schema | Pending |
| Gate 12 — Prompt versioning | Pending |
| Gate 13 — AI audit/provenance | Pending |
| Gate 14 — Human confirmation/checkout | Pending |
| Gate 15 — Existing code/scope conflict | Pending |
| Gate 16 — Local Quality Gate readiness | Pending |
| Gate 17 — Defect/migration/final authorization | Pending |

```text
Gate 17 = Not evaluated
```

---

# 22. Task Coverage Audit

Audit từng Task ở mức phạm vi và dependency. Không triển khai Task.

## Phase A — Provider and configuration

| Task range | Coverage | Audit result | Finding |
|---|---|---|---|
| PAC-TASK-291 → PAC-TASK-297 | Provider abstraction, Google AI, MockAI, fallback metadata | Pending | — |
| PAC-TASK-342 → PAC-TASK-345 | Config validation, precedence, timeout/rate-limit, safe error | Pending | — |

## Phase B — Guardrail and privacy

| Task range | Coverage | Audit result | Finding |
|---|---|---|---|
| PAC-TASK-316 → PAC-TASK-323 | Unsafe categories, input guardrail, PII minimization | Pending | — |
| PAC-TASK-324 → PAC-TASK-328 | Output guardrail, structured output, safe fallback | Pending | — |

## Phase C — Audit and prompt governance

| Task range | Coverage | Audit result | Finding |
|---|---|---|---|
| PAC-TASK-329 → PAC-TASK-337 | AIAuditLog, write service, metadata, Admin list/UI/filter | Pending | — |
| PAC-TASK-338 → PAC-TASK-341 | Prompt model, seed, load approved version, audit linkage | Pending | — |

## Phase D — AI Copilot business flows

| Task range | Coverage | Audit result | Finding |
|---|---|---|---|
| PAC-TASK-298 → PAC-TASK-307 | Explanation, draft note, Staff confirmation | Pending | — |
| PAC-TASK-308 → PAC-TASK-312 | Safe follow-up and permission guards | Pending | — |

## Phase E — Tests and traceability

| Task range | Coverage | Audit result | Finding |
|---|---|---|---|
| PAC-TASK-313 → PAC-TASK-315 | Provider/fallback tests and Copilot smoke checklist | Pending | — |
| PAC-TASK-346 → PAC-TASK-354 | Safety, guardrail, PII, audit and prompt tests | Pending | — |
| PAC-TASK-355 | AI safety traceability notes | Pending | — |

Coverage checklist:

- [ ] 65/65 Tasks nằm trong một phase.
- [ ] Không thiếu Task.
- [ ] Không có Task Sprint 8/9 lọt vào.
- [ ] Task descriptions phù hợp Sprint scope.
- [ ] Technical execution order safety-first được chấp nhận.
- [ ] Logical Task/Jira/branch mapping được xác minh.

---

# 23. Story Readiness Audit

| Story | Readiness | Dependency/Gap | Result |
|---|---|---|---|
| US-99 — AI explanation for InteractionAlert | Unknown | Alert context, provider, guardrails, audit | Pending |
| US-100 — AI consultation note draft | Unknown | HIGH alert context, provider, guardrails | Pending |
| US-101 — Staff confirms AI draft | Unknown | Official note contract, permission | Pending |
| US-102 — Safe follow-up questions | Unknown | Guardrail, no medical-record storage | Pending |
| US-103 — Google AI primary | Unknown | Config and adapter | Pending |
| US-104 — MockAI fallback | Unknown | Fallback policy | Pending |
| US-105 — AI input guardrail | Unknown | Unsafe category contract | Pending |
| US-106 — Block diagnosis | Unknown | Input guardrail | Pending |
| US-107 — Block prescribing | Unknown | Input guardrail | Pending |
| US-108 — Block dosage advice | Unknown | Input guardrail | Pending |
| US-109 — AI output guardrail | Unknown | Output policy | Pending |
| US-110 — Structured output validation | Unknown | Schemas and parser | Pending |
| US-111 — PII minimization | Unknown | Redaction/privacy | Pending |
| US-112 — Safe AI error response | Unknown | Provider/guardrail errors | Pending |
| US-113 — AI disclaimer | Unknown | UI/application response | Pending |
| US-114 — AI Audit Log | Unknown | Schema, service, privacy | Pending |
| US-115 — Prompt template versioning | Unknown | Prompt schema and seed | Pending |
| US-116 — Admin AI Audit Log UI | Unknown | Audit query API | Pending |
| US-142 — AI provider/model configuration | Unknown | Settings precedence | Pending |
| US-143 — AI safe configuration handling | Unknown | Secret safety and errors | Pending |

- [ ] 20/20 Stories mapped.
- [ ] Acceptance Criteria không mâu thuẫn.
- [ ] Story dependencies được ghi.
- [ ] Không yêu cầu Story PR.
- [ ] Story Acceptance Review sẽ chạy trên latest `develop`.

---

# 24. Findings Register

Severity:

```text
Blocker
High
Medium
Low
Observation
```

| Finding ID | Gate | Severity | Finding | Evidence | Required remediation | Owner | Status |
|---|---|---|---|---|---|---|---|
| S7-AUD-001 | — | — | Chưa có | — | — | — | Open |

Rules:

- Blocker: không được bắt đầu Sprint 7.
- High: phải có remediation trước Task bị ảnh hưởng.
- Medium/Low: có thể lập kế hoạch nếu không ảnh hưởng safety/data.
- Observation: ghi nhận, không phải defect.
- Không xóa finding; chỉ cập nhật status và evidence.

---

# 25. Bug Candidate Register

AI không tự tạo Jira Bug hoặc Jira Key.

| Candidate ID | Severity | Affected Task/Story | Summary | Reproduction/Evidence | Needs Jira Bug Key | Status |
|---|---|---|---|---|---|---|
| S7-BUG-CAND-001 | — | — | Chưa có | — | No | Open |

Mẫu:

```text
Bug Candidate:
Severity:
Affected Task/Story:
Steps to Reproduce:
Actual Result:
Expected Result:
Evidence:
Suggested branch slug:
Project Owner decision required: Yes/No
```

---

# 26. Remediation Plan

| Remediation ID | Finding | Action | Validation | Owner | Target state | Status |
|---|---|---|---|---|---|---|
| S7-REM-001 | — | Chưa có | — | — | — | Not started |

Không sửa production code trong audit trừ khi Project Owner chuyển sang một remediation task/bug có Jira Key thật.

Documentation-only correction có thể thực hiện riêng nếu cần đồng bộ branch mapping, nhưng phải dùng branch/PR hợp lệ theo workflow dự án.

---

# 27. Final Audit Decision

Chỉ PASS khi:

- 17/17 Mandatory Gates PASS;
- Sprint 5 và Sprint 6 Final Review PASS;
- latest `develop` stable;
- exact branch inventory được xác minh;
- GitHub PR/merge workflow hoạt động;
- Supabase environment an toàn;
- provider secret/config policy an toàn;
- input/output guardrail design rõ;
- PII minimization rõ;
- prompt versioning và mandatory audit rõ;
- human confirmation và checkout independence rõ;
- local tests/build scripts sẵn sàng;
- không còn Blocking/High technical defect chưa có remediation;
- migration risk được chấp nhận.

## Final checklist

- [ ] Mandatory Gates PASS = 17/17.
- [ ] Blocking findings = 0.
- [ ] High findings affecting first implementation phase = 0.
- [ ] 65/65 Tasks audited.
- [ ] 20/20 Stories audited.
- [ ] 88/88 expected branches reconciled with canonical registry.
- [ ] First Task exact Jira/branch confirmed.
- [ ] `sprint-7.md` synchronized.
- [ ] `sprint-7-progress.md` synchronized.
- [ ] `WORKING-CONTEXT.md` ready for Sprint 7.
- [ ] Project Owner authorization recorded.

Final result:

```text
Audit status = Not started
Ready to implement Sprint 7 = No
Mandatory Gates PASS = 0/17
Blocking findings = Unknown
Recommended first Task = Pending branch reconciliation
```

Sau khi audit PASS, expected first Task theo prepared plan:

```text
Logical Task: PAC-TASK-291 / TASK-291
Jira Key: PAC-501
Exact branch:
feature/PAC-501-task-291-define-ai-provider-abstraction
```

Canonical `Jira/branch-on-jira.md` phải được xác minh lại trước khi dùng mapping này.

---

# 28. Audit Report Summary

Điền sau khi thực hiện audit:

```text
Sprint: Sprint 7
Audit status:
Ready to implement Sprint 7:
Mandatory Gates PASS:
Blocking findings:
High findings:
Branch inventory:
GitHub capability:
Supabase environment:
Google AI configuration:
MockAI fallback:
Input Guardrail:
Output Guardrail:
PII minimization:
Prompt versioning:
AI Audit:
Human confirmation:
Local Quality Gate readiness:
Open Bug Candidates:
Migration risk:
Recommended first Task:
Recommended exact branch:
Final decision:
```

## Current official state

```text
Sprint 7 plan = Prepared
Sprint 7 progress tracker = Prepared
Sprint 7 audit = Not started
Sprint 6 Final Review = Pending verification
Ready to implement Sprint 7 = No
CI = N/A — GitHub Actions chưa được cấu hình
Quality Gate = Local Quality Gate
```
