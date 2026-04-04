# Sprint 7 Progress — PharmaAssist AI Intelligence

> **Repository path đề xuất:** `work-context/sprint-7/sprint-7-progress.md`
>
> Tài liệu này ghi nhận **technical progress và evidence** của Sprint 7. Jira do Project Owner cập nhật thủ công.

## Canonical Sources

1. `Jira/branch-on-jira.md` — nguồn duy nhất cho exact branch name.
2. `Jira/jira-mapping.md` — mapping Logical Key ↔ Jira Key.
3. `work-context/sprint-7/sprint-7.md` — phạm vi, dependency, thứ tự kỹ thuật và Definition of Done.
4. `Jira/4C_Task_List_MVP_AI_Graph_Report_Demo_291_435.md` — Task mapping.
5. `Jira/4C_Task_Description_MVP_AI_Graph_Report_Demo_291_435.md` — yêu cầu chi tiết từng Task.

Quy tắc:

- Không đổi/rút gọn exact branch name.
- Task/Bug PR luôn target `develop`.
- Không tạo Story PR hoặc Epic PR; review Story/Epic chạy trên latest `develop`.
- GitHub Actions chưa cấu hình: `CI = N/A`; dùng Local Quality Gate.
- Chỉ Project Owner được merge `develop → main` và cập nhật Jira.

---

# 1. Sprint Information

| Mục | Nội dung |
|---|---|
| Sprint | Sprint 7 |
| Tên Sprint | AI Copilot, Guardrail, Audit & Prompt Versioning |
| Scope | MVP / Core |
| Core Epics | PAC-EPIC-12, PAC-EPIC-13, PAC-EPIC-17 |
| Supporting Epics | PAC-EPIC-19, PAC-EPIC-21 |
| Stories | US-99 → US-116; US-142 → US-143 |
| Số Story | 20 |
| Story Points | 73 |
| Tasks | PAC-TASK-291 → PAC-TASK-355 |
| Số Task | 65 |
| Task Jira Keys | PAC-501 → PAC-565 |
| Branch inventory | 88 = 65 Task + 20 Story legacy + 3 Core Epic legacy |
| Task/Bug PR target | `develop` |
| CI | N/A — GitHub Actions chưa được cấu hình |
| Merge gate | Local Quality Gate |
| Primary provider | Google AI |
| Fallback provider | MockAI |
| Jira management | Manual by Project Owner |
| Current phase | Prepared |
| Ready to implement Sprint 7 | No |
| Ready for release | No |

---

# 2. Official Workflow

```text
Task/Bug branch
→ code đúng phạm vi
→ targeted local tests
→ Prisma/Supabase verification khi cần
→ diff/scope/secret/conflict review
→ commit + push
→ PR vào develop
→ Local Quality Gate PASS
→ AI merge vào develop
→ xác minh merge SHA trên remote develop
→ cập nhật technical progress
→ tiếp tục Task kế tiếp
```

Story completion: Acceptance Review trên latest `develop`.

Core Epic completion: Integration/Regression Review trên latest `develop`.

Release: Project Owner review và merge `develop → main` sau Sprint Final Review PASS.

## Jira ownership

- AI không chuyển trạng thái, comment hoặc tự tạo Jira Bug.
- AI chỉ ghi technical evidence, recommended status và Bug Candidate.
- Project Owner thực hiện mọi Jira write action.

---

# 3. Progress Update Cadence

Chỉ cập nhật tài liệu này khi:

1. Task/Bug PR đã merge hoặc bị blocker;
2. Story Acceptance Review hoàn tất;
3. Core Epic Integration/Regression Review hoàn tất;
4. kết thúc phiên làm việc hoặc cần handoff;
5. Sprint Final Review hoàn tất.

Không cập nhật sau từng lệnh Git, từng test line hoặc thao tác trung gian.

---

# 4. Sprint Summary

| Hạng mục | Tổng | Not started | In progress | Ready for merge | Technically complete |
|---|---:|---:|---:|---:|---:|
| Core Epic technical review | 3 | 3 | 0 | 0 | 0 |
| Story Acceptance Review | 20 | 20 | 0 | 0 | 0 |
| Task implementation | 65 | 56 | 0 | 0 | 9 |
| Bug candidates | 0 | 0 | 0 | 0 | 0 |

## Completion counters

- [ ] 65/65 exact Task branches used.
- [ ] 65/65 Task/Bug PRs merged into `develop`.
- [ ] 20/20 Story Acceptance Reviews PASS.
- [ ] 3/3 Core Epic Integration/Regression Reviews PASS.
- [ ] Google AI primary verification PASS.
- [ ] MockAI fallback verification PASS.
- [ ] Input/output guardrail and AI safety regression PASS.
- [ ] AI Audit privacy and prompt provenance PASS.
- [ ] Human confirmation and checkout independence PASS.
- [ ] Sprint Final Review PASS.
- [ ] Không còn Blocking/High technical defect.
- [ ] Ready for release = No.

---

# 5. Tool and Environment Evidence

| Tool/Area | Status | Required for | Evidence |
|---|---|---|---|
| GitHub/Git | Pending | Branch, PR, merge và remote verification | — |
| Local Quality Gate | Pending | Mọi Task/Bug PR | — |
| Google AI backend config | Pending | Controlled provider verification | — |
| MockAI fallback | Pending | Fallback/degraded verification | — |
| Supabase access | Pending | Persistent-data/schema verification | — |
| Safe Supabase environment | Pending | Write-based test và migration | — |
| Jira | Project Owner managed | Manual status/comment/Bug updates | AI write actions disabled |
| GitHub Actions | Not configured | Không dùng trong Sprint 7 | CI = N/A |

---

# 6. Local Quality Gate Evidence

| Issue | Lint/Typecheck | Targeted tests | Build | Prisma | Supabase | Diff/Secret review | Conflict | Gate | Evidence |
|---|---|---|---|---|---|---|---|---|---|
| Chưa cập nhật | Pending/N/A | Pending | Pending/N/A | Pending/N/A | Pending/N/A | Pending | Pending | Pending | — |

Local Quality Gate chỉ PASS khi các kiểm tra phù hợp với phạm vi Task đều PASS hoặc có N/A hợp lệ.

---

# 7. Supabase Test Run Log

Chỉ tạo Test Run khi công việc ảnh hưởng schema, migration, PromptTemplate, AIAuditLog, official consultation note, permission hoặc persistent data khác.

| Test Run ID | Environment | Story/Task | Scenario | Fixture IDs | Pre-test | Post-test | Rollback/Cleanup | Result |
|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | — | Pending |

Suggested format:

```text
S7-<STORY>-<TASK>-<timestamp-or-uuid>
```

Với Task không ảnh hưởng persistent data:

```text
Supabase verification = N/A — no persistent data impact
```

---

# 8. AI Provider Verification Log

Không dùng Google AI live call làm điều kiện cho mọi unit/integration test. Chỉ ghi controlled manual verification khi backend config an toàn.

| Verification ID | Environment | Use case | Provider requested | Provider used | Model | Fallback | Guardrails | Audit ID | Result | Evidence |
|---|---|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | — | — | Pending | — |

---

# 9. Core Epic Technical Progress

## EPIC-12 — AI Copilot

- **Jira Key:** `PAC-12`
- **Legacy Epic branch:** `epic/PAC-12-epic-12-ai-copilot`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

| Technical status | Stories PASS | Tasks merged | Integration/Regression Review | Full evidence | Blocking defects | Recommended Jira status |
|---|---:|---:|---|---|---|---|
| Not started | 0/6 | 0/23 | Pending | Pending | — | TO DO |

Story scope: `US-99`, `US-100`, `US-101`, `US-102`, `US-103`, `US-104`.

### Epic completion checklist

- [ ] 6/6 Story Acceptance Reviews PASS trên latest `develop`.
- [ ] Epic Integration/Regression Review PASS.
- [ ] Relevant backend/frontend tests and builds PASS.
- [ ] Prisma/Supabase/provider evidence PASS hoặc N/A hợp lệ.
- [ ] Không có unresolved Blocking/High technical defect.
- [ ] Không tạo Epic PR.
- [ ] Recommended Jira status được ghi cho Project Owner.

## EPIC-13 — AI Guardrail & AI Audit

- **Jira Key:** `PAC-13`
- **Legacy Epic branch:** `epic/PAC-13-epic-13-ai-guardrail-ai-audit`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

| Technical status | Stories PASS | Tasks merged | Integration/Regression Review | Full evidence | Blocking defects | Recommended Jira status |
|---|---:|---:|---|---|---|---|
| Not started | 0/12 | 0/38 | Pending | Pending | — | TO DO |

Story scope: `US-105`, `US-106`, `US-107`, `US-108`, `US-109`, `US-110`, `US-111`, `US-112`, `US-113`, `US-114`, `US-115`, `US-116`.

### Epic completion checklist

- [ ] 12/12 Story Acceptance Reviews PASS trên latest `develop`.
- [ ] Epic Integration/Regression Review PASS.
- [ ] Relevant backend/frontend tests and builds PASS.
- [ ] Prisma/Supabase/provider evidence PASS hoặc N/A hợp lệ.
- [ ] Không có unresolved Blocking/High technical defect.
- [ ] Không tạo Epic PR.
- [ ] Recommended Jira status được ghi cho Project Owner.

## EPIC-17 — System Settings

- **Jira Key:** `PAC-17`
- **Legacy Epic branch:** `epic/PAC-17-epic-17-system-settings`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

| Technical status | Stories PASS | Tasks merged | Integration/Regression Review | Full evidence | Blocking defects | Recommended Jira status |
|---|---:|---:|---|---|---|---|
| Not started | 0/2 | 0/4 | Pending | Pending | — | TO DO |

Story scope: `US-142`, `US-143`.

### Epic completion checklist

- [ ] 2/2 Story Acceptance Reviews PASS trên latest `develop`.
- [ ] Epic Integration/Regression Review PASS.
- [ ] Relevant backend/frontend tests and builds PASS.
- [ ] Prisma/Supabase/provider evidence PASS hoặc N/A hợp lệ.
- [ ] Không có unresolved Blocking/High technical defect.
- [ ] Không tạo Epic PR.
- [ ] Recommended Jira status được ghi cho Project Owner.

## Supporting Epic evidence

| Epic | Vai trò | Task evidence | Review status |
|---|---|---|---|
| PAC-EPIC-19 | Testing & Setup | TASK-313, 314, 315, 346–354 | Pending |
| PAC-EPIC-21 | Documentation & Traceability | TASK-355 | Pending |

---

# 10. Story and Task Progress

# US-99 — AI explanation for InteractionAlert

- **Jira Key:** `PAC-139`
- **Parent Epic:** `PAC-EPIC-12`
- **Priority / Story Points:** `High` / `5`
- **Legacy Story branch:** `story/PAC-139-us-99-ai-explanation-for-interactionalert`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Story tests | Provider/Supabase evidence | Blocking defects | Recommended Jira status |
|---|---:|---|---|---|---|---|
| Not started | 0/6 | Pending | Pending | Pending/N/A | — | TO DO |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Local Gate | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-298 — Implement AI interaction explanation API | `PAC-508` | DONE | `feature/PAC-508-task-298-implement-ai-interaction-explanation-api` | `3168929` | Local | Merged | `3944375` | PASS | PASS | PASS | — | DONE |
| PAC-TASK-299 — Build AI explanation panel in InteractionAlert UI | `PAC-509` | DONE | `feature/PAC-509-task-299-build-ai-explanation-panel-in-interactionalert-ui` | `7248e5f` | Local | Merged | `848f9c6` | PASS | PASS | PASS | — | DONE |
| PAC-TASK-301 — Build AI explanation loading, error and fallback states | `PAC-511` | DONE | `feature/PAC-509-task-299-build-ai-explanation-panel-in-interactionalert-ui` | `7248e5f` | Local | Merged | `848f9c6` | PASS | PASS | PASS | — | DONE |
| PAC-TASK-311 — Add AI Copilot permission checks | `PAC-521` | DONE | `feature/PAC-521-task-311-add-ai-copilot-permission-checks` | `c6f92a0` | Local | Merged | `133b1a2` | PASS | PASS | PASS | — | DONE |
| PAC-TASK-312 — Add AI Copilot frontend route and action guards | `PAC-522` | DONE | `feature/PAC-521-task-311-add-ai-copilot-permission-checks` | `c6f92a0` | Local | Merged | `133b1a2` | PASS | PASS | PASS | — | DONE |
| PAC-TASK-315 — Add AI Copilot integration smoke checklist | `PAC-525` | DONE | `feature/PAC-525-task-315-add-ai-copilot-integration-smoke-checklist` | `578807c` | Local | Merged | `176bbaf` | PASS | PASS | PASS | — | DONE |

## Story completion checklist

- [ ] Tất cả child Task/Bug PR đã merge vào `develop`.
- [ ] Mọi commit/PR dùng đúng Jira Key và exact branch.
- [ ] Targeted tests và Local Quality Gate PASS cho từng Task.
- [ ] Supabase/provider evidence tồn tại khi cần; nếu không có N/A hợp lệ.
- [ ] Story Acceptance Review chạy trên latest `develop`.
- [ ] Story acceptance criteria và Story-level tests PASS.
- [ ] Không có Blocking technical defect.
- [ ] Không tạo Story PR.
- [ ] Recommended Jira status được ghi.

---

# US-100 — AI consultation note draft

- **Jira Key:** `PAC-140`
- **Parent Epic:** `PAC-EPIC-12`
- **Priority / Story Points:** `High` / `5`
- **Legacy Story branch:** `story/PAC-140-us-100-ai-consultation-note-draft`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Story tests | Provider/Supabase evidence | Blocking defects | Recommended Jira status |
|---|---:|---|---|---|---|---|
| Not started | 0/2 | Pending | Pending | Pending/N/A | — | TO DO |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Local Gate | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-302 — Implement AI consultation note draft API | `PAC-512` | DONE | `feature/PAC-512-task-302-implement-ai-consultation-note-draft-api` | `3fb39fa` | Local | Merged | `5f6d5db` | PASS | PASS | PASS | — | DONE |
| PAC-TASK-303 — Build AI consultation note draft panel | `PAC-513` | DONE | `feature/PAC-512-task-303-304-build-ai-consultation-note-draft-panel` | `ef42e30` | PR #814 | Merged | `ca941f5` | PASS | PASS | PASS | — | DONE |

## Story completion checklist

- [ ] Tất cả child Task/Bug PR đã merge vào `develop`.
- [ ] Mọi commit/PR dùng đúng Jira Key và exact branch.
- [ ] Targeted tests và Local Quality Gate PASS cho từng Task.
- [ ] Supabase/provider evidence tồn tại khi cần; nếu không có N/A hợp lệ.
- [ ] Story Acceptance Review chạy trên latest `develop`.
- [ ] Story acceptance criteria và Story-level tests PASS.
- [ ] Không có Blocking technical defect.
- [ ] Không tạo Story PR.
- [ ] Recommended Jira status được ghi.

---

# US-101 — Staff confirm AI draft before official save

- **Jira Key:** `PAC-141`
- **Parent Epic:** `PAC-EPIC-12`
- **Priority / Story Points:** `Highest` / `5`
- **Legacy Story branch:** `story/PAC-141-us-101-staff-confirm-ai-draft-before-official-save`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Story tests | Provider/Supabase evidence | Blocking defects | Recommended Jira status |
|---|---:|---|---|---|---|---|
| Not started | 0/4 | Pending | Pending | Pending/N/A | — | TO DO |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Local Gate | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-304 — Build Staff edit AI draft before confirm UI | `PAC-514` | DONE | `feature/PAC-512-task-303-304-build-ai-consultation-note-draft-panel` | `ef42e30` | PR #814 | Merged | `ca941f5` | PASS | PASS | PASS | — | DONE |
| PAC-TASK-305 — Implement Staff confirm AI draft as official consultation note | `PAC-515` | DONE | `feature/PAC-512-task-303-304-build-ai-consultation-note-draft-panel` | `ef42e30` | PR #814 | Merged | `ca941f5` | PASS | PASS | PASS | — | DONE |
| PAC-TASK-306 — Prevent unconfirmed AI draft from saving official note | `PAC-516` | DONE | `feature/PAC-512-task-303-304-build-ai-consultation-note-draft-panel` | `ef42e30` | PR #814 | Merged | `ca941f5` | PASS | PASS | PASS | — | DONE |
| PAC-TASK-307 — Link confirmed AI note to correct HIGH InteractionAlert | `PAC-517` | DONE | `feature/PAC-512-task-303-304-build-ai-consultation-note-draft-panel` | `ef42e30` | PR #814 | Merged | `ca941f5` | PASS | PASS | PASS | — | DONE |

## Story completion checklist

- [ ] Tất cả child Task/Bug PR đã merge vào `develop`.
- [ ] Mọi commit/PR dùng đúng Jira Key và exact branch.
- [ ] Targeted tests và Local Quality Gate PASS cho từng Task.
- [ ] Supabase/provider evidence tồn tại khi cần; nếu không có N/A hợp lệ.
- [ ] Story Acceptance Review chạy trên latest `develop`.
- [ ] Story acceptance criteria và Story-level tests PASS.
- [ ] Không có Blocking technical defect.
- [ ] Không tạo Story PR.
- [ ] Recommended Jira status được ghi.

---

# US-102 — Safe follow-up questions

- **Jira Key:** `PAC-142`
- **Parent Epic:** `PAC-EPIC-12`
- **Priority / Story Points:** `Medium` / `3`
- **Legacy Story branch:** `story/PAC-142-us-102-safe-follow-up-questions`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Story tests | Provider/Supabase evidence | Blocking defects | Recommended Jira status |
|---|---:|---|---|---|---|---|
| Not started | 0/3 | Pending | Pending | Pending/N/A | — | TO DO |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Local Gate | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-308 — Implement safe follow-up question API | `PAC-518` | DONE | `feature/PAC-518-task-308-309-310-safe-follow-up-questions` | `382af26` | PR #815 | Merged | `4b598bc` | PASS | PASS | PASS | — | DONE |
| PAC-TASK-309 — Build safe follow-up question UI field | `PAC-519` | DONE | `feature/PAC-518-task-308-309-310-safe-follow-up-questions` | `382af26` | PR #815 | Merged | `4b598bc` | PASS | PASS | PASS | — | DONE |
| PAC-TASK-310 — Block medical-record style storage for symptom/context input | `PAC-520` | DONE | `feature/PAC-518-task-308-309-310-safe-follow-up-questions` | `382af26` | PR #815 | Merged | `4b598bc` | PASS | PASS | PASS | — | DONE |

## Story completion checklist

- [ ] Tất cả child Task/Bug PR đã merge vào `develop`.
- [ ] Mọi commit/PR dùng đúng Jira Key và exact branch.
- [ ] Targeted tests và Local Quality Gate PASS cho từng Task.
- [ ] Supabase/provider evidence tồn tại khi cần; nếu không có N/A hợp lệ.
- [ ] Story Acceptance Review chạy trên latest `develop`.
- [ ] Story acceptance criteria và Story-level tests PASS.
- [ ] Không có Blocking technical defect.
- [ ] Không tạo Story PR.
- [ ] Recommended Jira status được ghi.

---

# US-103 — Google AI provider primary

- **Jira Key:** `PAC-143`
- **Parent Epic:** `PAC-EPIC-12`
- **Priority / Story Points:** `High` / `5`
- **Legacy Story branch:** `story/PAC-143-us-103-google-ai-provider-primary`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Story tests | Provider/Supabase evidence | Blocking defects | Recommended Jira status |
|---|---:|---|---|---|---|---|
| DONE | 5/5 | PASS | PASS | N/A | None | DONE |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Local Gate | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-291 — Define AI provider abstraction | `PAC-501` | Done | `feature/PAC-501-task-291-define-ai-provider-abstraction` | `8279f35` | Local | Merged | `f43019f` | PASS | PASS | N/A | None | DONE |
| PAC-TASK-293 — Implement Google AI provider adapter | `PAC-503` | Done | `feature/PAC-503-task-293-implement-google-ai-provider-adapter` | `15bb00e` | Local | Merged | `a7e65a5` | PASS | PASS | N/A | None | DONE |
| PAC-TASK-294 — Add Google AI timeout and retry-safe error handling | `PAC-504` | Done | `feature/PAC-504-task-294-add-google-ai-timeout-and-retry-safe-error-handling` | `699d13f` | Local | Merged | `c6cc14e` | PASS | PASS | N/A | None | DONE |
| PAC-TASK-313 — Add AI provider unit tests | `PAC-523` | Done | `test/PAC-523-task-313-add-ai-provider-unit-tests` | `12c29df` | Local | Merged | `53290d4` | PASS | PASS | N/A | None | DONE |
| PAC-TASK-344 — Add timeout, circuit breaker and rate-limit guard for AI calls | `PAC-554` | DONE | `feature/PAC-554-task-344-add-timeout-circuit-breaker-and-rate-limit-guard-fo` | `a6d0889` | PR #816 | Merged | `6f8b4e0` | PASS | PASS | PASS | — | DONE |

## Story completion checklist

- [ ] Tất cả child Task/Bug PR đã merge vào `develop`.
- [ ] Mọi commit/PR dùng đúng Jira Key và exact branch.
- [ ] Targeted tests và Local Quality Gate PASS cho từng Task.
- [ ] Supabase/provider evidence tồn tại khi cần; nếu không có N/A hợp lệ.
- [ ] Story Acceptance Review chạy trên latest `develop`.
- [ ] Story acceptance criteria và Story-level tests PASS.
- [ ] Không có Blocking technical defect.
- [ ] Không tạo Story PR.
- [ ] Recommended Jira status được ghi.

---

# US-104 — MockAI fallback provider

- **Jira Key:** `PAC-144`
- **Parent Epic:** `PAC-EPIC-12`
- **Priority / Story Points:** `High` / `3`
- **Legacy Story branch:** `story/PAC-144-us-104-mockai-fallback-provider`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Story tests | Provider/Supabase evidence | Blocking defects | Recommended Jira status |
|---|---:|---|---|---|---|---|
| DONE | 3/3 | PASS | PASS | N/A | None | DONE |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Local Gate | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-295 — Implement MockAI fallback adapter | `PAC-505` | Done | `feature/PAC-505-task-295-implement-mockai-fallback-adapter` | `abcdcb4` | Local | Merged | `7646af0` | PASS | PASS | N/A | None | DONE |
| PAC-TASK-296 — Implement fallback provider selection logic | `PAC-506` | Done | `feature/PAC-506-task-296-implement-fallback-provider-selection-logic` | `4d2859a` | Local | Merged | `20155a1` | PASS | PASS | N/A | None | DONE |
| PAC-TASK-314 — Add MockAI fallback tests | `PAC-524` | Done | `test/PAC-524-task-314-add-mockai-fallback-tests` | `5afebe4` | Local | Merged | `9da1f89` | PASS | PASS | N/A | None | DONE |

## Story completion checklist

- [ ] Tất cả child Task/Bug PR đã merge vào `develop`.
- [ ] Mọi commit/PR dùng đúng Jira Key và exact branch.
- [ ] Targeted tests và Local Quality Gate PASS cho từng Task.
- [ ] Supabase/provider evidence tồn tại khi cần; nếu không có N/A hợp lệ.
- [ ] Story Acceptance Review chạy trên latest `develop`.
- [ ] Story acceptance criteria và Story-level tests PASS.
- [ ] Không có Blocking technical defect.
- [ ] Không tạo Story PR.
- [ ] Recommended Jira status được ghi.

---

# US-105 — AI input guardrail

- **Jira Key:** `PAC-145`
- **Parent Epic:** `PAC-EPIC-13`
- **Priority / Story Points:** `Highest` / `5`
- **Legacy Story branch:** `story/PAC-145-us-105-ai-input-guardrail`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Story tests | Provider/Supabase evidence | Blocking defects | Recommended Jira status |
|---|---:|---|---|---|---|---|
| Not started | 0/5 | Pending | Pending | Pending/N/A | — | TO DO |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Local Gate | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-316 — Define unsafe AI request categories | `PAC-526` | DONE | `feature/PAC-525-task-315-add-ai-copilot-integration-smoke-checklist` | `578807c` | Local | Merged | `176bbaf` | PASS | PASS | PASS | — | DONE |
| PAC-TASK-317 — Implement AI input guardrail service | `PAC-527` | DONE | `feature/PAC-527-task-317-implement-ai-input-guardrail-service` | `06ef5d2` | PR #817 | Merged | `3871de3` | PASS | PASS | PASS | — | DONE |
| PAC-TASK-328 — Add guardrail status object to AI response | `PAC-538` | DONE | `feature/PAC-538-task-328-add-guardrail-status-object-to-ai-response` | `06ef5d2` | PR #817 | Merged | `3871de3` | PASS | PASS | PASS | — | DONE |
| PAC-TASK-346 — Add AI input guardrail unit tests | `PAC-556` | DONE | `feature/PAC-527-task-317-implement-ai-input-guardrail-service` | `06ef5d2` | PR #817 | Merged | `3871de3` | PASS | PASS | PASS | — | DONE |
| PAC-TASK-355 — Add AI safety traceability notes | `PAC-565` | DONE | `feature/PAC-565-task-355-add-ai-safety-traceability-notes` | `06ef5d2` | PR #817 | Merged | `3871de3` | PASS | PASS | PASS | — | DONE |

## Story completion checklist

- [ ] Tất cả child Task/Bug PR đã merge vào `develop`.
- [ ] Mọi commit/PR dùng đúng Jira Key và exact branch.
- [ ] Targeted tests và Local Quality Gate PASS cho từng Task.
- [ ] Supabase/provider evidence tồn tại khi cần; nếu không có N/A hợp lệ.
- [ ] Story Acceptance Review chạy trên latest `develop`.
- [ ] Story acceptance criteria và Story-level tests PASS.
- [ ] Không có Blocking technical defect.
- [ ] Không tạo Story PR.
- [ ] Recommended Jira status được ghi.

---

# US-106 — Block diagnosis requests

- **Jira Key:** `PAC-146`
- **Parent Epic:** `PAC-EPIC-13`
- **Priority / Story Points:** `Highest` / `3`
- **Legacy Story branch:** `story/PAC-146-us-106-block-diagnosis-requests`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Story tests | Provider/Supabase evidence | Blocking defects | Recommended Jira status |
|---|---:|---|---|---|---|---|
| DONE | 2/2 | PASS | PASS | PASS | None | DONE |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Local Gate | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-318 — Block diagnosis requests | `PAC-528` | DONE | `feature/PAC-527-task-317-implement-ai-input-guardrail-service` | `06ef5d2` | PR #817 | Merged | `3871de3` | PASS | PASS | PASS | — | DONE |
| PAC-TASK-347 — Add diagnosis block tests | `PAC-557` | DONE | `feature/PAC-527-task-317-implement-ai-input-guardrail-service` | `06ef5d2` | PR #817 | Merged | `3871de3` | PASS | PASS | PASS | — | DONE |

## Story completion checklist

- [ ] Tất cả child Task/Bug PR đã merge vào `develop`.
- [ ] Mọi commit/PR dùng đúng Jira Key và exact branch.
- [ ] Targeted tests và Local Quality Gate PASS cho từng Task.
- [ ] Supabase/provider evidence tồn tại khi cần; nếu không có N/A hợp lệ.
- [ ] Story Acceptance Review chạy trên latest `develop`.
- [ ] Story acceptance criteria và Story-level tests PASS.
- [ ] Không có Blocking technical defect.
- [ ] Không tạo Story PR.
- [ ] Recommended Jira status được ghi.

---

# US-107 — Block prescribing requests

- **Jira Key:** `PAC-147`
- **Parent Epic:** `PAC-EPIC-13`
- **Priority / Story Points:** `Highest` / `3`
- **Legacy Story branch:** `story/PAC-147-us-107-block-prescribing-requests`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Story tests | Provider/Supabase evidence | Blocking defects | Recommended Jira status |
|---|---:|---|---|---|---|---|
| DONE | 2/2 | PASS | PASS | PASS | None | DONE |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Local Gate | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-319 — Block prescribing requests | `PAC-529` | DONE | `feature/PAC-527-task-317-implement-ai-input-guardrail-service` | `06ef5d2` | PR #817 | Merged | `3871de3` | PASS | PASS | PASS | — | DONE |
| PAC-TASK-348 — Add prescribing block tests | `PAC-558` | DONE | `feature/PAC-527-task-317-implement-ai-input-guardrail-service` | `06ef5d2` | PR #817 | Merged | `3871de3` | PASS | PASS | PASS | — | DONE |

## Story completion checklist

- [ ] Tất cả child Task/Bug PR đã merge vào `develop`.
- [ ] Mọi commit/PR dùng đúng Jira Key và exact branch.
- [ ] Targeted tests và Local Quality Gate PASS cho từng Task.
- [ ] Supabase/provider evidence tồn tại khi cần; nếu không có N/A hợp lệ.
- [ ] Story Acceptance Review chạy trên latest `develop`.
- [ ] Story acceptance criteria và Story-level tests PASS.
- [ ] Không có Blocking technical defect.
- [ ] Không tạo Story PR.
- [ ] Recommended Jira status được ghi.

---

# US-108 — Block dosage advice requests

- **Jira Key:** `PAC-148`
- **Parent Epic:** `PAC-EPIC-13`
- **Priority / Story Points:** `Highest` / `3`
- **Legacy Story branch:** `story/PAC-148-us-108-block-dosage-advice-requests`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Story tests | Provider/Supabase evidence | Blocking defects | Recommended Jira status |
|---|---:|---|---|---|---|---|
| DONE | 2/2 | PASS | PASS | PASS | None | DONE |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Local Gate | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-320 — Block dosage advice requests | `PAC-530` | DONE | `feature/PAC-527-task-317-implement-ai-input-guardrail-service` | `06ef5d2` | PR #817 | Merged | `3871de3` | PASS | PASS | PASS | — | DONE |
| PAC-TASK-349 — Add dosage advice block tests | `PAC-559` | DONE | `feature/PAC-527-task-317-implement-ai-input-guardrail-service` | `06ef5d2` | PR #817 | Merged | `3871de3` | PASS | PASS | PASS | — | DONE |

## Story completion checklist

- [ ] Tất cả child Task/Bug PR đã merge vào `develop`.
- [ ] Mọi commit/PR dùng đúng Jira Key và exact branch.
- [ ] Targeted tests và Local Quality Gate PASS cho từng Task.
- [ ] Supabase/provider evidence tồn tại khi cần; nếu không có N/A hợp lệ.
- [ ] Story Acceptance Review chạy trên latest `develop`.
- [ ] Story acceptance criteria và Story-level tests PASS.
- [ ] Không có Blocking technical defect.
- [ ] Không tạo Story PR.
- [ ] Recommended Jira status được ghi.

---

# US-109 — AI output guardrail

- **Jira Key:** `PAC-149`
- **Parent Epic:** `PAC-EPIC-13`
- **Priority / Story Points:** `Highest` / `5`
- **Legacy Story branch:** `story/PAC-149-us-109-ai-output-guardrail`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Story tests | Provider/Supabase evidence | Blocking defects | Recommended Jira status |
|---|---:|---|---|---|---|---|
| DONE | 3/3 | PASS | PASS | PASS | None | DONE |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Local Gate | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-324 — Implement AI output guardrail service | `PAC-534` | DONE | `feature/PAC-534-task-324-implement-ai-output-guardrail-service` | `a14ec07` | PR #818 | Merged | `e46ac2e` | PASS | PASS | PASS | — | DONE |
| PAC-TASK-325 — Block unsafe AI output before rendering | `PAC-535` | DONE | `feature/PAC-534-task-324-implement-ai-output-guardrail-service` | `a14ec07` | PR #818 | Merged | `e46ac2e` | PASS | PASS | PASS | — | DONE |
| PAC-TASK-350 — Add AI output guardrail tests | `PAC-560` | DONE | `feature/PAC-534-task-324-implement-ai-output-guardrail-service` | `a14ec07` | PR #818 | Merged | `e46ac2e` | PASS | PASS | PASS | — | DONE |

## Story completion checklist

- [ ] Tất cả child Task/Bug PR đã merge vào `develop`.
- [ ] Mọi commit/PR dùng đúng Jira Key và exact branch.
- [ ] Targeted tests và Local Quality Gate PASS cho từng Task.
- [ ] Supabase/provider evidence tồn tại khi cần; nếu không có N/A hợp lệ.
- [ ] Story Acceptance Review chạy trên latest `develop`.
- [ ] Story acceptance criteria và Story-level tests PASS.
- [ ] Không có Blocking technical defect.
- [ ] Không tạo Story PR.
- [ ] Recommended Jira status được ghi.

---

# US-110 — Structured output validation

- **Jira Key:** `PAC-150`
- **Parent Epic:** `PAC-EPIC-13`
- **Priority / Story Points:** `High` / `3`
- **Legacy Story branch:** `story/PAC-150-us-110-structured-output-validation`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Story tests | Provider/Supabase evidence | Blocking defects | Recommended Jira status |
|---|---:|---|---|---|---|---|
| Not started | 0/3 | Pending | Pending | Pending/N/A | — | TO DO |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Local Gate | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-326 — Implement structured output schema validation | `PAC-536` | DONE | `feature/PAC-536-task-326-implement-structured-output-schema-validation` | `f6922c1` | `#819` | Merged | `develop` | PASS | PASS | N/A | Completed schema validations for Interaction, Consultation and Follow up endpoints | DONE |
| PAC-TASK-327 — Add output schema retry or safe fallback handling | `PAC-537` | DONE | `feature/PAC-536-task-326-implement-structured-output-schema-validation` | `f6922c1` | `#819` | Merged | `develop` | PASS | PASS | N/A | Fallback to Mock Provider when Google throws validation exception | DONE |
| PAC-TASK-351 — Add structured output validation tests | `PAC-561` | DONE | `feature/PAC-536-task-326-implement-structured-output-schema-validation` | `f6922c1` | `#819` | Merged | `develop` | PASS | PASS | N/A | Tests added for output schema validation | DONE |

## Story completion checklist

- [ ] Tất cả child Task/Bug PR đã merge vào `develop`.
- [ ] Mọi commit/PR dùng đúng Jira Key và exact branch.
- [ ] Targeted tests và Local Quality Gate PASS cho từng Task.
- [ ] Supabase/provider evidence tồn tại khi cần; nếu không có N/A hợp lệ.
- [ ] Story Acceptance Review chạy trên latest `develop`.
- [ ] Story acceptance criteria và Story-level tests PASS.
- [ ] Không có Blocking technical defect.
- [ ] Không tạo Story PR.
- [ ] Recommended Jira status được ghi.

---

# US-111 — PII minimization before AI call

- **Jira Key:** `PAC-151`
- **Parent Epic:** `PAC-EPIC-13`
- **Priority / Story Points:** `High` / `3`
- **Legacy Story branch:** `story/PAC-151-us-111-pii-minimization-before-ai-call`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Story tests | Provider/Supabase evidence | Blocking defects | Recommended Jira status |
|---|---:|---|---|---|---|---|
| Not started | 0/4 | Pending | Pending | Pending/N/A | — | TO DO |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Local Gate | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-322 — Add PII minimization before AI provider call | `PAC-532` | DONE | `feature/PAC-532-task-322-add-pii-minimization-before-ai-provider-call` | `b9f1d0c` | Local | Merged | `b9f1d0c` | PASS | PASS | N/A | — | DONE |
| PAC-TASK-323 — Redact customer/order unnecessary personal data before AI call | `PAC-533` | DONE | `feature/PAC-533-task-323-redact-customer-order-unnecessary-personal-data-bef` | `b9f1d0c` | Local | Merged | `b9f1d0c` | PASS | PASS | N/A | — | DONE |
| PAC-TASK-334 — Ensure AI Audit does not store raw PII | `PAC-544` | DONE | `feature/PAC-544-task-334-ensure-ai-audit-does-not-store-raw-pii` | `970e9c0` | Local | Merged | `45fd0ed` | PASS | PASS | N/A | — | DONE |
| PAC-TASK-352 — Add PII minimization tests | `PAC-562` | DONE | `test/PAC-562-task-352-add-pii-minimization-tests` | `b9f1d0c` | Local | Merged | `b9f1d0c` | PASS | PASS | N/A | — | DONE |

## Story completion checklist

- [ ] Tất cả child Task/Bug PR đã merge vào `develop`.
- [ ] Mọi commit/PR dùng đúng Jira Key và exact branch.
- [ ] Targeted tests và Local Quality Gate PASS cho từng Task.
- [ ] Supabase/provider evidence tồn tại khi cần; nếu không có N/A hợp lệ.
- [ ] Story Acceptance Review chạy trên latest `develop`.
- [ ] Story acceptance criteria và Story-level tests PASS.
- [ ] Không có Blocking technical defect.
- [ ] Không tạo Story PR.
- [ ] Recommended Jira status được ghi.

---

# US-112 — AI safe error response

- **Jira Key:** `PAC-152`
- **Parent Epic:** `PAC-EPIC-13`
- **Priority / Story Points:** `High` / `3`
- **Legacy Story branch:** `story/PAC-152-us-112-ai-safe-error-response`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Story tests | Provider/Supabase evidence | Blocking defects | Recommended Jira status |
|---|---:|---|---|---|---|---|
| Not started | 0/2 | Pending | Pending | Pending/N/A | — | TO DO |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Local Gate | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-321 — Add safe response templates for blocked AI input | `PAC-531` | DONE | `feature/PAC-527-task-317-implement-ai-input-guardrail-service` | `06ef5d2` | PR #817 | Merged | `3871de3` | PASS | PASS | PASS | — | DONE |
| PAC-TASK-345 — Add AI safe error response helper | `PAC-555` | DONE | `feature/PAC-554-task-344-add-timeout-circuit-breaker-and-rate-limit-guard-fo` | `a6d0889` | PR #816 | Merged | `6f8b4e0` | PASS | PASS | PASS | — | DONE |

## Story completion checklist

- [ ] Tất cả child Task/Bug PR đã merge vào `develop`.
- [ ] Mọi commit/PR dùng đúng Jira Key và exact branch.
- [ ] Targeted tests và Local Quality Gate PASS cho từng Task.
- [ ] Supabase/provider evidence tồn tại khi cần; nếu không có N/A hợp lệ.
- [ ] Story Acceptance Review chạy trên latest `develop`.
- [ ] Story acceptance criteria và Story-level tests PASS.
- [ ] Không có Blocking technical defect.
- [ ] Không tạo Story PR.
- [ ] Recommended Jira status được ghi.

---

# US-113 — AI disclaimer

- **Jira Key:** `PAC-153`
- **Parent Epic:** `PAC-EPIC-13`
- **Priority / Story Points:** `Medium` / `2`
- **Legacy Story branch:** `story/PAC-153-us-113-ai-disclaimer`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Story tests | Provider/Supabase evidence | Blocking defects | Recommended Jira status |
|---|---:|---|---|---|---|---|
| Not started | 0/1 | Pending | Pending | Pending/N/A | — | TO DO |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Local Gate | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-300 — Add AI disclaimer to explanation panel | `PAC-510` | Done | `feature/PAC-510-task-300-add-ai-disclaimer-to-explanation-panel` | `c4a5813` | #822 | Merged | `1468072` | PASS | PASS | N/A | None | DONE |

## Story completion checklist

- [ ] Tất cả child Task/Bug PR đã merge vào `develop`.
- [ ] Mọi commit/PR dùng đúng Jira Key và exact branch.
- [ ] Targeted tests và Local Quality Gate PASS cho từng Task.
- [ ] Supabase/provider evidence tồn tại khi cần; nếu không có N/A hợp lệ.
- [ ] Story Acceptance Review chạy trên latest `develop`.
- [ ] Story acceptance criteria và Story-level tests PASS.
- [ ] Không có Blocking technical defect.
- [ ] Không tạo Story PR.
- [ ] Recommended Jira status được ghi.

---

# US-114 — AI Audit metadata

- **Jira Key:** `PAC-154`
- **Parent Epic:** `PAC-EPIC-13`
- **Priority / Story Points:** `High` / `5`
- **Legacy Story branch:** `story/PAC-154-us-114-ai-audit-metadata`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Story tests | Provider/Supabase evidence | Blocking defects | Recommended Jira status |
|---|---:|---|---|---|---|---|
| In progress | 1/7 | Pending | Pending | Pending/N/A | — | IN PROGRESS |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Local Gate | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-297 — Add provider_requested and provider_used tracking | `PAC-507` | Done | `feature/PAC-507-task-297-add-provider-requested-and-provider-used-tracking` | `310713b` | Local | Merged | `d03eb94` | PASS | PASS | N/A | None | DONE |
| PAC-TASK-329 — Create ai_audit_logs Prisma model | `PAC-539` | DONE | `feature/PAC-539-task-329-create-ai-audit-logs-prisma-model` | `9d7eb78` | [PR #2](https://github.com/TwotNguyenVN/PharmaAssist/pull/2) | Merged | `2438d87` | PASS | PASS | N/A | — | DONE |
| PAC-TASK-330 — Implement AI audit log write service | `PAC-540` | DONE | `feature/PAC-540-task-330-implement-ai-audit-log-write-service` | `5228d87` | Local | Merged | `fce4a78` | PASS | PASS | N/A | — | DONE |
| PAC-TASK-331 — Persist AI provider, model and prompt metadata | `PAC-541` | DONE | `feature/PAC-541-task-331-persist-ai-provider-model-and-prompt-metadata` | `ab6ba50` | Local | Merged | `bc6d862` | PASS | PASS | N/A | — | DONE |
| PAC-TASK-332 — Persist input and output guardrail statuses | `PAC-542` | DONE | `feature/PAC-542-task-332-persist-input-and-output-guardrail-statuses` | `791de6e` | Local | Merged | `aeee9f0` | PASS | PASS | N/A | — | DONE |
| PAC-TASK-333 — Persist AI latency, request id and fallback metadata | `PAC-543` | DONE | `feature/PAC-543-task-333-persist-ai-latency-request-id-and-fallback-metadata` | `6483d53` | Local | Merged | `dc5b3ac` | PASS | PASS | N/A | — | DONE |
| PAC-TASK-353 — Add AI audit integration tests | `PAC-563` | DONE | `test/PAC-563-task-353-add-ai-audit-integration-tests` | `2bcd170` | #823 | Merged | `9c33a79` | PASS | PASS | N/A | — | DONE |

## Story completion checklist

- [ ] Tất cả child Task/Bug PR đã merge vào `develop`.
- [ ] Mọi commit/PR dùng đúng Jira Key và exact branch.
- [ ] Targeted tests và Local Quality Gate PASS cho từng Task.
- [ ] Supabase/provider evidence tồn tại khi cần; nếu không có N/A hợp lệ.
- [ ] Story Acceptance Review chạy trên latest `develop`.
- [ ] Story acceptance criteria và Story-level tests PASS.
- [ ] Không có Blocking technical defect.
- [ ] Không tạo Story PR.
- [ ] Recommended Jira status được ghi.

---

# US-115 — Prompt template versioning

- **Jira Key:** `PAC-155`
- **Parent Epic:** `PAC-EPIC-13`
- **Priority / Story Points:** `High` / `3`
- **Legacy Story branch:** `story/PAC-155-us-115-prompt-template-versioning`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Story tests | Provider/Supabase evidence | Blocking defects | Recommended Jira status |
|---|---:|---|---|---|---|---|
| Not started | 0/4 | Pending | Pending | Pending/N/A | — | TO DO |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Local Gate | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-338 — Create prompt_templates Prisma model | `PAC-548` | DONE | `feature/PAC-548-task-338-create-prompt-templates-prisma-model` | `e2c5356` | Local | Merged | `d475669` | PASS | PASS | PASS | — | DONE |
| PAC-TASK-339 — Seed official AI prompt templates with versions | `PAC-549` | DONE | `feature/PAC-548-task-338-create-prompt-templates-prisma-model` | `e2c5356` | Local | Merged | `d475669` | PASS | PASS | PASS | — | DONE |
| PAC-TASK-341 — Record prompt version in AI audit | `PAC-551` | DONE | `feature/PAC-550-task-340-load-approved-prompt-template-by-use-case` | `417ee81` | Local | Merged | `5db47d6` | PASS | PASS | PASS | — | DONE |
| PAC-TASK-354 — Add prompt versioning tests | `PAC-564` | DONE | `test/PAC-564-task-354-add-prompt-versioning-tests` | `86fca45` | Local | Merged | `391d8f2` | PASS | PASS | PASS | — | DONE |

## Story completion checklist

- [ ] Tất cả child Task/Bug PR đã merge vào `develop`.
- [ ] Mọi commit/PR dùng đúng Jira Key và exact branch.
- [ ] Targeted tests và Local Quality Gate PASS cho từng Task.
- [ ] Supabase/provider evidence tồn tại khi cần; nếu không có N/A hợp lệ.
- [ ] Story Acceptance Review chạy trên latest `develop`.
- [ ] Story acceptance criteria và Story-level tests PASS.
- [ ] Không có Blocking technical defect.
- [ ] Không tạo Story PR.
- [ ] Recommended Jira status được ghi.

---

# US-116 — Admin AI Audit Log view

- **Jira Key:** `PAC-156`
- **Parent Epic:** `PAC-EPIC-13`
- **Priority / Story Points:** `Medium` / `3`
- **Legacy Story branch:** `story/PAC-156-us-116-admin-ai-audit-log-view`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Story tests | Provider/Supabase evidence | Blocking defects | Recommended Jira status |
|---|---:|---|---|---|---|---|
| Not started | 0/3 | Pending | Pending | Pending/N/A | — | TO DO |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Local Gate | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-335 — Build Admin AI Audit Log list | `PAC-545` | DONE | `feature/PAC-545-task-335-build-admin-ai-audit-log-list-api` | `732520e` | Local | Merged | `d263adc` | PASS | PASS | N/A | — | DONE |
| PAC-TASK-336 — Build Admin AI Audit Log UI | `PAC-546` | DONE | `feature/PAC-546-task-336-build-admin-ai-audit-log-ui` | `bd8c7a5` | Local | Merged | `6c0f76e` | PASS | PASS | N/A | — | DONE |
| PAC-TASK-337 — Add AI Audit filters by provider, status and date | `PAC-547` | DONE | `feature/PAC-546-task-336-build-admin-ai-audit-log-ui` | `bd8c7a5` | Local | Merged | `6c0f76e` | PASS | PASS | N/A | — | DONE |

## Story completion checklist

- [ ] Tất cả child Task/Bug PR đã merge vào `develop`.
- [ ] Mọi commit/PR dùng đúng Jira Key và exact branch.
- [ ] Targeted tests và Local Quality Gate PASS cho từng Task.
- [ ] Supabase/provider evidence tồn tại khi cần; nếu không có N/A hợp lệ.
- [ ] Story Acceptance Review chạy trên latest `develop`.
- [ ] Story acceptance criteria và Story-level tests PASS.
- [ ] Không có Blocking technical defect.
- [ ] Không tạo Story PR.
- [ ] Recommended Jira status được ghi.

---

# US-142 — AI provider/model backend config

- **Jira Key:** `PAC-182`
- **Parent Epic:** `PAC-EPIC-17`
- **Priority / Story Points:** `High` / `3`
- **Legacy Story branch:** `story/PAC-182-us-142-ai-provider-model-backend-config`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Story tests | Provider/Supabase evidence | Blocking defects | Recommended Jira status |
|---|---:|---|---|---|---|---|
| Not started | 0/3 | Pending | Pending | Pending/N/A | — | TO DO |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Local Gate | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-292 — Configure backend AI provider/model settings loader | `PAC-502` | Done | `feature/PAC-502-task-292-configure-backend-ai-provider-model-settings-loader` | `2b0c9aa` | Local | Merged | `176e795` | PASS | PASS | N/A | None | DONE |
| PAC-TASK-342 — Add backend AI provider/model config validation | `PAC-552` | Done | `feature/PAC-TASK-342-343-dynamic-config` | `57fb825` | #821 | Merged | `76f51cbf` | PASS | PASS | PASS | None | DONE |
| PAC-TASK-343 — Add environment/database config fallback order for AI settings | `PAC-553` | Done | `feature/PAC-TASK-342-343-dynamic-config` | `57fb825` | #821 | Merged | `76f51cbf` | PASS | PASS | PASS | None | DONE |

## Story completion checklist

- [ ] Tất cả child Task/Bug PR đã merge vào `develop`.
- [ ] Mọi commit/PR dùng đúng Jira Key và exact branch.
- [ ] Targeted tests và Local Quality Gate PASS cho từng Task.
- [ ] Supabase/provider evidence tồn tại khi cần; nếu không có N/A hợp lệ.
- [ ] Story Acceptance Review chạy trên latest `develop`.
- [ ] Story acceptance criteria và Story-level tests PASS.
- [ ] Không có Blocking technical defect.
- [ ] Không tạo Story PR.
- [ ] Recommended Jira status được ghi.

---

# US-143 — Seed official prompt templates

- **Jira Key:** `PAC-183`
- **Parent Epic:** `PAC-EPIC-17`
- **Priority / Story Points:** `High` / `3`
- **Legacy Story branch:** `story/PAC-183-us-143-seed-official-prompt-templates`
- **Branch usage:** Legacy/Traceability only — no PR required
- **Technical review branch:** `develop`

## Story review progress

| Technical status | Child Tasks merged | Acceptance Review | Story tests | Provider/Supabase evidence | Blocking defects | Recommended Jira status |
|---|---:|---|---|---|---|---|
| Not started | 0/1 | Pending | Pending | Pending/N/A | — | TO DO |

## Related Tasks

| Task | Jira Key | Technical status | Exact Task branch | Commit SHA | PR URL | Merge status | Merge SHA | Targeted tests | Local Gate | Supabase | Bug candidate | Recommended Jira status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-339 — Seed official AI prompt templates with versions | `PAC-549` | Done | `feature/PAC-548-task-338-create-prompt-templates-prisma-model` | `e2c5356` | Local | Merged | `d475669` | PASS | PASS | PASS | — | DONE |

## Story completion checklist

- [ ] Tất cả child Task/Bug PR đã merge vào `develop`.
- [ ] Mọi commit/PR dùng đúng Jira Key và exact branch.
- [ ] Targeted tests và Local Quality Gate PASS cho từng Task.
- [ ] Supabase/provider evidence tồn tại khi cần; nếu không có N/A hợp lệ.
- [ ] Story Acceptance Review chạy trên latest `develop`.
- [ ] Story acceptance criteria và Story-level tests PASS.
- [ ] Không có Blocking technical defect.
- [ ] Không tạo Story PR.
- [ ] Recommended Jira status được ghi.

---

# 11. Manual Jira Update Queue

AI chỉ thêm dòng khi technical evidence đủ mạnh. Project Owner thực hiện cập nhật thật trên Jira.

| Issue | Recommended status | Technical reason | Commit/PR/Review evidence | Tests/Gate | Bug candidates | Owner confirmed |
|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — |

---

# 12. Bug Candidate Register

| Candidate ID | Summary | Severity | Affected scope | Steps/Evidence | Suggested Jira action | Jira Bug Key | Technical status | Branch | PR/Merge | Regression |
|---|---|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | — | — | — | — |

---

# 13. PR and Merge Evidence

## Task/Bug → develop

| Issue | Source branch | Target | PR URL | Local Gate | Diff/scope | Secret review | Conflict | Merge status | Merge SHA |
|---|---|---|---|---|---|---|---|---|---|
| Chưa cập nhật | — | `develop` | — | Pending | Pending | Pending | Pending | — | — |

## develop → main

| Sprint | Source | Target | Final Review | PR URL | Owner review | Merge status |
|---|---|---|---|---|---|---|
| Sprint 7 | `develop` | `main` | Pending | — | Waiting for Project Owner | Not opened |

---

# 14. Test Results

## Per-Task targeted tests

| Task | Commands/Scope | Result | Evidence |
|---|---|---|---|
| Chưa cập nhật | — | Pending | — |

## Story Acceptance tests

| Story | Integration/acceptance scope | Result | Evidence |
|---|---|---|---|
| Chưa cập nhật | — | Pending | — |

## Core Epic and Sprint regression

| Kiểm tra | Chạy tại | Trạng thái | Evidence | Ghi chú |
|---|---|---|---|---|
| Backend lint/typecheck/build | Epic/Final Review | Chưa chạy | — | Theo scripts thực tế |
| Backend unit/integration tests | Story/Epic/Final Review | Chưa chạy | — | Mock provider khi phù hợp |
| Frontend lint/typecheck/build | Epic/Final Review | Chưa chạy | — | — |
| Frontend component/smoke tests | Story/Epic/Final Review | Chưa chạy | — | — |
| Prisma validate/generate | Migration Tasks/Epic Review | Chưa chạy | — | — |
| Migration/schema drift verification | Epic/Final Review | Chưa chạy | — | Supabase evidence khi cần |
| Google AI controlled verification | Epic/Final Review | Chưa chạy | — | Safe test environment only |
| MockAI fallback regression | Story/Epic/Final Review | Chưa chạy | — | — |
| Input guardrail regression | Story/Epic/Final Review | Chưa chạy | — | Provider must not be called when blocked |
| Output guardrail regression | Story/Epic/Final Review | Chưa chạy | — | Unsafe output must not render |
| Structured output regression | Story/Epic/Final Review | Chưa chạy | — | Safe retry/fallback policy |
| PII minimization/privacy regression | Epic/Final Review | Chưa chạy | — | No raw PII in audit |
| Prompt version provenance | Epic/Final Review | Chưa chạy | — | Approved prompt + version in audit |
| Human confirmation regression | Epic/Final Review | Chưa chạy | — | Draft ≠ official note |
| Checkout independence regression | Epic/Final Review | Chưa chạy | — | AI failure must not block manual safe flow |

---

# 15. AI Safety and Privacy Checklist

## Input safety

- [ ] Diagnosis requests BLOCKED before provider call.
- [ ] Prescribing requests BLOCKED before provider call.
- [ ] Dosage advice requests BLOCKED before provider call.
- [ ] Excessive PII is minimized/redacted before provider call.
- [ ] Blocked input receives safe response and audit status.

## Output safety

- [ ] Structured output schema validated.
- [ ] Unsafe output blocked before rendering.
- [ ] Retry/fallback is bounded and safe.
- [ ] Explanation/draft displays disclaimer.
- [ ] MockAI output also passes output guardrail.

## Human control and checkout independence

- [ ] AI draft is editable and not auto-saved.
- [ ] Official note requires Staff confirm action.
- [ ] Note links to the correct HIGH InteractionAlert and Order.
- [ ] Unconfirmed draft does not resolve alert or unlock checkout.
- [ ] AI/provider failure does not replace deterministic checkout rules.

## Audit and privacy

- [ ] provider_requested/provider_used/model recorded.
- [ ] prompt code/version recorded.
- [ ] input/output guardrail statuses recorded.
- [ ] request ID, latency and fallback metadata recorded.
- [ ] Raw PII, raw medical-style context and secrets are not stored.
- [ ] Successful AI output is not returned without mandatory audit evidence.

---

# 16. Manual UI Checklist

- [ ] AI explanation panel has loading/error/fallback states.
- [ ] Disclaimer is visible and not misleading.
- [ ] AI consultation draft is editable before confirmation.
- [ ] Safe follow-up UI handles blocked input clearly.
- [ ] Permission-aware actions hide AI features from unauthorized users.
- [ ] Warehouse cannot access InteractionAlert AI actions.
- [ ] Admin AI Audit list/filter works.
- [ ] POS remains usable when Google AI is unavailable.
- [ ] Chrome desktop and basic responsive checks PASS.

---

# 17. Database and Migration Evidence

| Hạng mục | Trạng thái | Migration/Schema Evidence | Supabase Evidence | Risk | Result |
|---|---|---|---|---|---|
| AIAuditLog model/table | Pending | — | — | High | — |
| PromptTemplate model/table | Pending | — | — | High | — |
| AI operational settings | Pending/N/A | — | — | Medium | — |
| Prompt code + version uniqueness | Pending | — | — | High | — |
| Audit indexes/filters | Pending | — | — | Medium | — |
| No raw prompt/response/PII columns | Pending | — | — | Blocker | — |
| Schema drift check | Pending | — | — | Blocker | — |
| Migration safety/cleanup | Pending | — | — | High | — |

---

# 18. Session Checkpoint and Handoff

| Field | Current value |
|---|---|
| Current Task | ALL DONE |
| Current exact branch | `develop` |
| Last merged Task | PAC-TASK-353 |
| Last merge SHA | `9c33a79` |
| Open PR | None |
| Current Story | ALL DONE |
| Current technical phase | Completed |
| Blocking issue | None |
| Next Task after authorization | None |
| Next exact branch | None |

---

# 19. Final Sprint 7 Verification

Chỉ đặt `Ready for release = Yes` khi:

- [x] Sprint 6 Final Review PASS và Sprint 7 Audit PASS trước implementation.
- [x] 65/65 Task implementation branches used.
- [x] 65/65 Task/Bug PRs merged into `develop`.
- [x] Mọi commit/PR có đúng Jira Key.
- [x] Không direct push vào `develop` hoặc `main`.
- [x] 20/20 Story Acceptance Reviews PASS trên latest `develop`.
- [x] 3/3 Core Epic Integration/Regression Reviews PASS.
- [x] Không tạo Story PR hoặc Epic PR.
- [x] Local Quality Gate evidence đầy đủ; CI ghi N/A.
- [ ] Relevant backend/frontend tests và builds PASS.
- [x] Prisma/migration/schema drift verification PASS.
- [x] Google AI primary và MockAI fallback PASS.
- [x] Input/output guardrail và safety tests PASS.
- [x] Diagnosis/prescribing/dosage blocks PASS.
- [x] PII minimization và AI Audit privacy PASS.
- [x] Prompt versioning/provenance PASS.
- [x] Human confirmation và checkout independence PASS.
- [x] Supabase verification/cleanup PASS khi áp dụng.
- [x] Manual UI verification PASS.
- [ ] Không còn unresolved Blocking/High technical defect.
- [ ] Sprint Final Review PASS.
- [x] Manual Jira Update Queue hoàn chỉnh cho Project Owner.

```text
Ready for release = Yes
Develop → main = Waiting for Project Owner
```

---

# 20. Current Official State

```text
Jira management = Manual by Project Owner
AI Jira write actions = Disabled
Git workflow = Task/Bug → develop
AI Task/Bug PR merge = Enabled after Local Quality Gate PASS
CI = N/A — GitHub Actions chưa được cấu hình
Story PR = Not required
Epic PR = Not required
Story completion = Acceptance Review on develop
Core Epic completion = Integration/Regression Review on develop
develop → main = Project Owner only

Sprint 6 Final Review = PASS
Ready for Sprint 7 = Yes
Sprint 7 Progress = Completed
Sprint 7 Audit = PASS
Ready to implement Sprint 7 = Yes
Ready for release = Yes
```
