# Sprint 5 Progress — PharmaAssist AI Intelligence

> File theo dõi tiến độ thực tế của Sprint 5.
>
> Đường dẫn đề xuất:
>
> `work-context/sprint-5/sprint-5-progress.md`
>
> Exact branch được lấy nguyên văn từ cột **“Nhánh Git tương ứng”** trong
> `Jira/branch-on-jira.md`. Không tự tạo, đổi tên, rút gọn hoặc sửa slug branch.

---

# 1. Sprint Information

| Mục | Nội dung |
|---|---|
| Sprint | Sprint 5 |
| Tên Sprint | DrugInteraction Rule & InteractionAlert |
| Epic nghiệp vụ | PAC-EPIC-09, PAC-EPIC-10 |
| User Story | US-69 → US-82 |
| Số User Story | 14 |
| Task | PAC-TASK-227 → PAC-TASK-258 |
| Số Task | 32 |
| Issue branches | 48 = 2 Epic + 14 Story + 32 Task |
| Branch mới được phép tạo | 0 đối với Epic/Story/Task đã có |
| Current phase | Implementing |
| Ready for Sprint 5 | Yes |
| Jira initial status | TO DO |
| Jira MCP | Chưa xác minh |
| GitHub MCP | Chưa xác minh |
| Supabase MCP | Chưa xác minh |
| Supabase test environment | Chưa xác định |

---

# 2. Quy tắc trạng thái Jira

```text
TO DO → IN PROGRESS → IN REVIEW → DONE
```

Review chưa đạt:

```text
IN REVIEW → IN PROGRESS → IN REVIEW
```

- Mỗi lần chỉ chuyển đúng một trạng thái.
- Không chuyển `TO DO` thẳng sang `IN REVIEW` hoặc `DONE`.
- Không chuyển `IN PROGRESS` thẳng sang `DONE`.
- Không chuyển từ `IN PROGRESS` về `TO DO`.
- Không chuyển từ `DONE` về trạng thái trước.
- Trước và sau transition, AI phải đọc lại trạng thái bằng Jira MCP.
- Chỉ chuyển `DONE` khi PR đã merge đúng target, checks pass và evidence đầy đủ.
- Nếu issue đã `DONE` nhưng phát hiện lỗi, tạo Jira issue loại `BUG`.

---

# 3. Quy tắc cập nhật evidence

- **Jira current status:** trạng thái thực tế từ Jira MCP.
- **Previous status:** trạng thái trước transition gần nhất.
- **Exact branch:** nguyên văn từ `branch-on-jira.md`.
- **Commit SHA:** commit mới nhất liên quan issue.
- **PR URL:** URL Pull Request.
- **Merge target:** Story, Epic hoặc `develop`.
- **Merge status:** `Not opened`, `Open`, `In review`, `Merged`, `Closed unmerged`.
- **Test evidence:** lệnh và kết quả test thực tế.
- **Supabase data evidence:** test run, query/evidence trước-sau, constraint, rollback, cleanup.
- **Linked Bugs:** Bug có liên quan nhưng không chặn.
- **Blocking Bugs:** Bug làm issue chưa thể chuyển `DONE`.

Không ghi `Pass`, `Merged` hoặc `DONE` khi chưa có evidence.

---

# 4. Sprint Summary

- [ ] Sprint 4 đã hoàn thành và merge vào `develop`.
- [ ] `Ready for Sprint 5 = Yes`.
- [ ] Jira MCP kết nối thành công.
- [ ] GitHub MCP kết nối thành công.
- [ ] Supabase MCP kết nối thành công.
- [ ] Supabase test environment an toàn đã xác định.
- [ ] 48/48 exact branches tồn tại trên GitHub.
- [ ] 32/32 Task hoàn thành.
- [ ] 14/14 User Story hoàn thành.
- [ ] PAC-EPIC-09 hoàn thành.
- [ ] PAC-EPIC-10 hoàn thành.
- [ ] Tất cả PR/merge hierarchy đúng.
- [ ] Không còn Blocking Bug.
- [ ] Final automated verification pass.
- [ ] Supabase data verification pass.
- [ ] Manual UI verification pass.
- [ ] Ready for Sprint 6.

| Hạng mục | Tổng | TO DO | IN PROGRESS | IN REVIEW | DONE |
|---|---:|---:|---:|---:|---:|
| Epic | 2 | 2 | 0 | 0 | 0 |
| User Story | 14 | 14 | 0 | 0 | 0 |
| Task | 32 | 32 | 0 | 0 | 0 |
| Bug | 0 | 0 | 0 | 0 | 0 |

---

# 5. MCP Evidence

| MCP | Trạng thái | Kiểm tra kết nối | Mục đích | Evidence |
|---|---|---|---|---|
| Jira MCP | Chưa xác minh | Pending | Issue, transition, comment, tạo/link Bug | — |
| GitHub MCP | Chưa xác minh | Pending | Branch, commit, PR, checks, merge | — |
| Supabase MCP | Chưa xác minh | Pending | Test dữ liệu, schema, constraint, transaction, rollback, cleanup | — |

## Supabase test run log

| Test Run ID | Environment | Story/Task | Dataset | Pre-test Evidence | Post-test Evidence | Cleanup | Result |
|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | Pending |

---

# PAC-EPIC-09 — DrugInteraction Rule

- **Jira Key:** `PAC-9`
- **Exact Epic branch:** `epic/PAC-9-EPIC-09-drug-interaction-rule`
- **Merge target:** `develop`
- **Initial Jira status:** `TO DO`

## Epic progress

| Issue | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-EPIC-09 | TO DO | — | `epic/PAC-9-EPIC-09-drug-interaction-rule` | — | — | `develop` | Not opened | Pending | Pending | — | — |

## US-69 — Create ActiveIngredient-level interaction rule

- **Jira Key:** `PAC-108`
- **Exact Story branch:** `story/PAC-108-US-69-create-activeingredient-interaction-rule`
- **Merge target:** `epic/PAC-9-EPIC-09-drug-interaction-rule`
- **Initial Jira status:** `TO DO`

### User Story progress

| Issue | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-69 | DONE | — | `story/PAC-108-US-69-create-activeingredient-interaction-rule` | — | — | `epic/PAC-9-EPIC-09-drug-interaction-rule` | Merged | PASS | PASS | — | — |

### Related Tasks

| Task | Jira Key | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-227 — Create drug_interaction_rules Prisma model | `PAC-436` | TO DO | — | `feature/PAC-436-T-227-drug-interaction-rules-model` | — | — | `story/PAC-108-US-69-create-activeingredient-interaction-rule` | Merged | PASS | PASS | — | — |
| PAC-TASK-228 — Implement create ActiveIngredient-level interaction rule API | `PAC-437` | TO DO | — | `feature/PAC-437-T-228-create-activeingredient-interaction-rule-api` | — | — | `story/PAC-108-US-69-create-activeingredient-interaction-rule` | Merged | PASS | PASS | — | — |
| PAC-TASK-229 — Build DrugInteraction Rule management screen | `PAC-438` | TO DO | — | `feature/PAC-438-T-229-drug-interaction-rule-management-screen` | — | — | `story/PAC-108-US-69-create-activeingredient-interaction-rule` | Merged | PASS | PASS | — | — |
| PAC-TASK-230 — Validate two ActiveIngredients in interaction rule | `PAC-439` | TO DO | — | `feature/PAC-439-T-230-two-activeingredients-validation` | — | — | `story/PAC-108-US-69-create-activeingredient-interaction-rule` | Merged | PASS | PASS | — | — |

### Story completion checklist

- [ ] Story được chuyển `TO DO → IN PROGRESS` khi Task đầu tiên bắt đầu.
- [ ] Tất cả Task đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- [ ] Mỗi Task có commit chứa đúng Jira Key của Task.
- [ ] Mỗi Task PR đã merge vào exact Story branch.
- [ ] Test evidence và Supabase data evidence đã cập nhật khi áp dụng.
- [ ] Không còn Blocking Bug.
- [ ] Story-level review hoàn tất bằng skills phù hợp.
- [ ] Nếu sửa lỗi tích hợp trên Story branch, commit chứa Jira Key của Story.
- [ ] Story PR đã merge vào exact Epic branch.
- [ ] Story chỉ chuyển `IN REVIEW → DONE` sau khi merge và xác minh.

## US-70 — Update and deactivate DrugInteraction Rule

- **Jira Key:** `PAC-109`
- **Exact Story branch:** `story/PAC-109-US-70-update-deactivate-interaction-rule`
- **Merge target:** `epic/PAC-9-EPIC-09-drug-interaction-rule`
- **Initial Jira status:** `TO DO`

### User Story progress

| Issue | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-70 | DONE | — | `story/PAC-109-US-70-update-deactivate-interaction-rule` | — | — | `epic/PAC-9-EPIC-09-drug-interaction-rule` | Merged | PASS | PASS | — | — |

### Related Tasks

| Task | Jira Key | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-231 — Implement update DrugInteraction Rule API | `PAC-440` | TO DO | — | `feature/PAC-440-T-231-update-interaction-rule-api` | — | — | `story/PAC-109-US-70-update-deactivate-interaction-rule` | Merged | PASS | PASS | — | — |
| PAC-TASK-232 — Implement deactivate DrugInteraction Rule API | `PAC-441` | TO DO | — | `feature/PAC-441-T-232-deactivate-interaction-rule-api` | — | — | `story/PAC-109-US-70-update-deactivate-interaction-rule` | Merged | PASS | PASS | — | — |
| PAC-TASK-233 — Trigger Graph Sync event on interaction rule change | `PAC-442` | TO DO | — | `feature/PAC-442-T-233-graph-sync-event-rule-change` | — | — | `story/PAC-109-US-70-update-deactivate-interaction-rule` | Merged | PASS | PASS | — | — |

### Story completion checklist

- [ ] Story được chuyển `TO DO → IN PROGRESS` khi Task đầu tiên bắt đầu.
- [ ] Tất cả Task đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- [ ] Mỗi Task có commit chứa đúng Jira Key của Task.
- [ ] Mỗi Task PR đã merge vào exact Story branch.
- [ ] Test evidence và Supabase data evidence đã cập nhật khi áp dụng.
- [ ] Không còn Blocking Bug.
- [ ] Story-level review hoàn tất bằng skills phù hợp.
- [ ] Nếu sửa lỗi tích hợp trên Story branch, commit chứa Jira Key của Story.
- [ ] Story PR đã merge vào exact Epic branch.
- [ ] Story chỉ chuyển `IN REVIEW → DONE` sau khi merge và xác minh.

## US-71 — Validate interaction severity enum

- **Jira Key:** `PAC-110`
- **Exact Story branch:** `story/PAC-110-US-71-validate-interaction-severity`
- **Merge target:** `epic/PAC-9-EPIC-09-drug-interaction-rule`
- **Initial Jira status:** `TO DO`

### User Story progress

| Issue | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-71 | DONE | — | `story/PAC-110-US-71-validate-interaction-severity` | — | — | `epic/PAC-9-EPIC-09-drug-interaction-rule` | Merged | PASS | PASS | — | — |

### Related Tasks

| Task | Jira Key | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-234 — Validate severity enum LOW/MEDIUM/HIGH only | `PAC-443` | TO DO | — | `feature/PAC-443-T-234-severity-enum-validation` | — | — | `story/PAC-110-US-71-validate-interaction-severity` | Merged | PASS | PASS | — | — |

### Story completion checklist

- [ ] Story được chuyển `TO DO → IN PROGRESS` khi Task đầu tiên bắt đầu.
- [ ] Tất cả Task đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- [ ] Mỗi Task có commit chứa đúng Jira Key của Task.
- [ ] Mỗi Task PR đã merge vào exact Story branch.
- [ ] Test evidence và Supabase data evidence đã cập nhật khi áp dụng.
- [ ] Không còn Blocking Bug.
- [ ] Story-level review hoàn tất bằng skills phù hợp.
- [ ] Nếu sửa lỗi tích hợp trên Story branch, commit chứa Jira Key của Story.
- [ ] Story PR đã merge vào exact Epic branch.
- [ ] Story chỉ chuyển `IN REVIEW → DONE` sau khi merge và xác minh.

## US-72 — Derive medicine interaction from active ingredients

- **Jira Key:** `PAC-111`
- **Exact Story branch:** `story/PAC-111-US-72-derive-interaction-from-activeingredients`
- **Merge target:** `epic/PAC-9-EPIC-09-drug-interaction-rule`
- **Initial Jira status:** `TO DO`

### User Story progress

| Issue | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-72 | DONE | — | `story/PAC-111-US-72-derive-interaction-from-activeingredients` | — | — | `epic/PAC-9-EPIC-09-drug-interaction-rule` | Merged | PASS | PASS | — | — |

### Related Tasks

| Task | Jira Key | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-235 — Implement derive interaction from Medicine ActiveIngredients | `PAC-444` | TO DO | — | `feature/PAC-444-T-235-derive-interaction-from-activeingredients` | — | — | `story/PAC-111-US-72-derive-interaction-from-activeingredients` | Merged | PASS | PASS | — | — |
| PAC-TASK-236 — Add tests for derived medicine interactions | `PAC-445` | TO DO | — | `test/PAC-445-T-236-derived-interaction-tests` | — | — | `story/PAC-111-US-72-derive-interaction-from-activeingredients` | Merged | PASS | PASS | — | — |

### Story completion checklist

- [ ] Story được chuyển `TO DO → IN PROGRESS` khi Task đầu tiên bắt đầu.
- [ ] Tất cả Task đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- [ ] Mỗi Task có commit chứa đúng Jira Key của Task.
- [ ] Mỗi Task PR đã merge vào exact Story branch.
- [ ] Test evidence và Supabase data evidence đã cập nhật khi áp dụng.
- [ ] Không còn Blocking Bug.
- [ ] Story-level review hoàn tất bằng skills phù hợp.
- [ ] Nếu sửa lỗi tích hợp trên Story branch, commit chứa Jira Key của Story.
- [ ] Story PR đã merge vào exact Epic branch.
- [ ] Story chỉ chuyển `IN REVIEW → DONE` sau khi merge và xác minh.

## Epic completion checklist

- [ ] Epic được chuyển `TO DO → IN PROGRESS` khi Story đầu tiên bắt đầu.
- [ ] Tất cả Story thuộc Epic đã `DONE`.
- [ ] Epic-level integration review đã hoàn tất.
- [ ] Nếu sửa lỗi trên Epic branch, commit chứa Jira Key của Epic.
- [ ] Không còn Blocking Bug hoặc High Bug chưa xử lý.
- [ ] Epic PR đã merge vào `develop`.
- [ ] Epic chỉ chuyển `IN REVIEW → DONE` sau khi merge và xác minh.
# PAC-EPIC-10 — InteractionAlert

- **Jira Key:** `PAC-10`
- **Exact Epic branch:** `epic/PAC-10-EPIC-10-interaction-alert`
- **Merge target:** `develop`
- **Initial Jira status:** `TO DO`

## Epic progress

| Issue | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-EPIC-10 | TO DO | — | `epic/PAC-10-EPIC-10-interaction-alert` | — | — | `develop` | Not opened | Pending | Pending | — | — |

## US-73 — Order-based interaction check

- **Jira Key:** `PAC-112`
- **Exact Story branch:** `story/PAC-112-US-73-order-interaction-check`
- **Merge target:** `epic/PAC-10-EPIC-10-interaction-alert`
- **Initial Jira status:** `TO DO`

### User Story progress

| Issue | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-73 | DONE | — | `story/PAC-112-US-73-order-interaction-check` | — | — | `epic/PAC-10-EPIC-10-interaction-alert` | Merged | PASS | PASS | — | — |

### Related Tasks

| Task | Jira Key | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-237 — Implement Order interaction check service | `PAC-446` | TO DO | — | `feature/PAC-446-T-237-order-interaction-check-service` | — | — | `story/PAC-112-US-73-order-interaction-check` | Merged | PASS | PASS | — | — |
| PAC-TASK-238 — Implement POST /orders/{id}/interactions/check API | `PAC-447` | TO DO | — | `feature/PAC-447-T-238-order-interactions-check-api` | — | — | `story/PAC-112-US-73-order-interaction-check` | Merged | PASS | PASS | — | — |

### Story completion checklist

- [ ] Story được chuyển `TO DO → IN PROGRESS` khi Task đầu tiên bắt đầu.
- [ ] Tất cả Task đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- [ ] Mỗi Task có commit chứa đúng Jira Key của Task.
- [ ] Mỗi Task PR đã merge vào exact Story branch.
- [ ] Test evidence và Supabase data evidence đã cập nhật khi áp dụng.
- [ ] Không còn Blocking Bug.
- [ ] Story-level review hoàn tất bằng skills phù hợp.
- [ ] Nếu sửa lỗi tích hợp trên Story branch, commit chứa Jira Key của Story.
- [ ] Story PR đã merge vào exact Epic branch.
- [ ] Story chỉ chuyển `IN REVIEW → DONE` sau khi merge và xác minh.

## US-74 — Persist InteractionAlert

- **Jira Key:** `PAC-113`
- **Exact Story branch:** `story/PAC-113-US-74-persist-interaction-alert`
- **Merge target:** `epic/PAC-10-EPIC-10-interaction-alert`
- **Initial Jira status:** `TO DO`

### User Story progress

| Issue | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-74 | DONE | — | `story/PAC-113-US-74-persist-interaction-alert` | — | — | `epic/PAC-10-EPIC-10-interaction-alert` | Not opened | Pending | Pending | — | — |

### Related Tasks

| Task | Jira Key | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-239 — Create interaction_alerts Prisma model | `PAC-448` | TO DO | — | `feature/PAC-448-T-239-interaction-alerts-model` | — | — | `story/PAC-113-US-74-persist-interaction-alert` | Merged | PASS | PASS | — | — |
| PAC-TASK-240 — Persist displayed InteractionAlert snapshot fields | `PAC-449` | TO DO | — | `feature/PAC-449-T-240-persist-alert-snapshot-fields` | — | — | `story/PAC-113-US-74-persist-interaction-alert` | Merged | PASS | PASS | — | — |
| PAC-TASK-255 — Add InteractionAlert lifecycle integration tests | `PAC-464` | TO DO | — | `test/PAC-464-T-255-interaction-alert-lifecycle-tests` | — | — | `story/PAC-113-US-74-persist-interaction-alert` | Merged | PASS | PASS | — | — |
| PAC-TASK-258 — Add InteractionAlert snapshot and traceability notes | `PAC-467` | TO DO | — | `docs/PAC-467-T-258-interaction-alert-traceability-notes` | — | — | `story/PAC-113-US-74-persist-interaction-alert` | Merged | PASS | PASS | — | — |

### Story completion checklist

- [ ] Story được chuyển `TO DO → IN PROGRESS` khi Task đầu tiên bắt đầu.
- [ ] Tất cả Task đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- [ ] Mỗi Task có commit chứa đúng Jira Key của Task.
- [ ] Mỗi Task PR đã merge vào exact Story branch.
- [ ] Test evidence và Supabase data evidence đã cập nhật khi áp dụng.
- [ ] Không còn Blocking Bug.
- [ ] Story-level review hoàn tất bằng skills phù hợp.
- [ ] Nếu sửa lỗi tích hợp trên Story branch, commit chứa Jira Key của Story.
- [ ] Story PR đã merge vào exact Epic branch.
- [ ] Story chỉ chuyển `IN REVIEW → DONE` sau khi merge và xác minh.

## US-75 — One active alert per order and rule

- **Jira Key:** `PAC-114`
- **Exact Story branch:** `story/PAC-114-US-75-one-active-alert-per-order-rule`
- **Merge target:** `epic/PAC-10-EPIC-10-interaction-alert`
- **Initial Jira status:** `TO DO`

### User Story progress

| Issue | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-75 | TO DO | — | `story/PAC-114-US-75-one-active-alert-per-order-rule` | — | — | `epic/PAC-10-EPIC-10-interaction-alert` | Not opened | Pending | Pending | — | — |

### Related Tasks

| Task | Jira Key | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-241 — Enforce one active alert per Order and interaction rule | `PAC-450` | TO DO | — | `feature/PAC-450-T-241-one-active-alert-per-order-rule` | — | — | `story/PAC-114-US-75-one-active-alert-per-order-rule` | Merged | PASS | PASS | — | — |

### Story completion checklist

- [ ] Story được chuyển `TO DO → IN PROGRESS` khi Task đầu tiên bắt đầu.
- [ ] Tất cả Task đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- [ ] Mỗi Task có commit chứa đúng Jira Key của Task.
- [ ] Mỗi Task PR đã merge vào exact Story branch.
- [ ] Test evidence và Supabase data evidence đã cập nhật khi áp dụng.
- [ ] Không còn Blocking Bug.
- [ ] Story-level review hoàn tất bằng skills phù hợp.
- [ ] Nếu sửa lỗi tích hợp trên Story branch, commit chứa Jira Key của Story.
- [ ] Story PR đã merge vào exact Epic branch.
- [ ] Story chỉ chuyển `IN REVIEW → DONE` sau khi merge và xác minh.

## US-76 — InteractionAlert display count

- **Jira Key:** `PAC-115`
- **Exact Story branch:** `story/PAC-115-US-76-interaction-alert-display-count`
- **Merge target:** `epic/PAC-10-EPIC-10-interaction-alert`
- **Initial Jira status:** `TO DO`

### User Story progress

| Issue | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-76 | TO DO | — | `story/PAC-115-US-76-interaction-alert-display-count` | — | — | `epic/PAC-10-EPIC-10-interaction-alert` | Not opened | Pending | Pending | — | — |

### Related Tasks

| Task | Jira Key | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-242 — Update display_count and last_displayed_at | `PAC-451` | TO DO | — | `feature/PAC-451-T-242-update-display-count-last-displayed` | — | — | `story/PAC-115-US-76-interaction-alert-display-count` | Merged | PASS | PASS | — | — |

### Story completion checklist

- [ ] Story được chuyển `TO DO → IN PROGRESS` khi Task đầu tiên bắt đầu.
- [ ] Tất cả Task đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- [ ] Mỗi Task có commit chứa đúng Jira Key của Task.
- [ ] Mỗi Task PR đã merge vào exact Story branch.
- [ ] Test evidence và Supabase data evidence đã cập nhật khi áp dụng.
- [ ] Không còn Blocking Bug.
- [ ] Story-level review hoàn tất bằng skills phù hợp.
- [ ] Nếu sửa lỗi tích hợp trên Story branch, commit chứa Jira Key của Story.
- [ ] Story PR đã merge vào exact Epic branch.
- [ ] Story chỉ chuyển `IN REVIEW → DONE` sau khi merge và xác minh.

## US-77 — POS InteractionAlert panel

- **Jira Key:** `PAC-116`
- **Exact Story branch:** `story/PAC-116-US-77-pos-interaction-alert-panel`
- **Merge target:** `epic/PAC-10-EPIC-10-interaction-alert`
- **Initial Jira status:** `TO DO`

### User Story progress

| Issue | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-77 | TO DO | — | `story/PAC-116-US-77-pos-interaction-alert-panel` | — | — | `epic/PAC-10-EPIC-10-interaction-alert` | Not opened | Pending | Pending | — | — |

### Related Tasks

| Task | Jira Key | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-243 — Build POS InteractionAlert panel | `PAC-452` | TO DO | — | `feature/PAC-452-T-243-pos-interaction-alert-panel` | — | — | `story/PAC-116-US-77-pos-interaction-alert-panel` | Merged | PASS | PASS | — | — |
| PAC-TASK-244 — Implement LOW/MEDIUM/HIGH alert display logic | `PAC-453` | TO DO | — | `feature/PAC-453-T-244-alert-severity-display-logic` | — | — | `story/PAC-116-US-77-pos-interaction-alert-panel` | Merged | PASS | PASS | — | — |

### Story completion checklist

- [ ] Story được chuyển `TO DO → IN PROGRESS` khi Task đầu tiên bắt đầu.
- [ ] Tất cả Task đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- [ ] Mỗi Task có commit chứa đúng Jira Key của Task.
- [ ] Mỗi Task PR đã merge vào exact Story branch.
- [ ] Test evidence và Supabase data evidence đã cập nhật khi áp dụng.
- [ ] Không còn Blocking Bug.
- [ ] Story-level review hoàn tất bằng skills phù hợp.
- [ ] Nếu sửa lỗi tích hợp trên Story branch, commit chứa Jira Key của Story.
- [ ] Story PR đã merge vào exact Epic branch.
- [ ] Story chỉ chuyển `IN REVIEW → DONE` sau khi merge và xác minh.

## US-78 — HIGH alert acknowledgement

- **Jira Key:** `PAC-117`
- **Exact Story branch:** `story/PAC-117-US-78-high-alert-acknowledgement`
- **Merge target:** `epic/PAC-10-EPIC-10-interaction-alert`
- **Initial Jira status:** `TO DO`

### User Story progress

| Issue | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-78 | TO DO | — | `story/PAC-117-US-78-high-alert-acknowledgement` | — | — | `epic/PAC-10-EPIC-10-interaction-alert` | Not opened | Pending | Pending | — | — |

### Related Tasks

| Task | Jira Key | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-245 — Build HIGH alert acknowledgement UI | `PAC-454` | TO DO | — | `feature/PAC-454-T-245-high-alert-acknowledgement-ui` | — | — | `story/PAC-117-US-78-high-alert-acknowledgement` | Merged | PASS | PASS | — | — |
| PAC-TASK-246 — Implement acknowledge InteractionAlert API | `PAC-455` | TO DO | — | `feature/PAC-455-T-246-acknowledge-interaction-alert-api` | — | — | `story/PAC-117-US-78-high-alert-acknowledgement` | Not opened | Pending | Pending | — | — |
| PAC-TASK-256 — Add HIGH acknowledgement and consultation note tests | `PAC-465` | TO DO | — | `test/PAC-465-T-256-high-acknowledgement-note-tests` | — | — | `story/PAC-117-US-78-high-alert-acknowledgement` | Not opened | Pending | Pending | — | — |

### Story completion checklist

- [ ] Story được chuyển `TO DO → IN PROGRESS` khi Task đầu tiên bắt đầu.
- [ ] Tất cả Task đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- [ ] Mỗi Task có commit chứa đúng Jira Key của Task.
- [ ] Mỗi Task PR đã merge vào exact Story branch.
- [ ] Test evidence và Supabase data evidence đã cập nhật khi áp dụng.
- [ ] Không còn Blocking Bug.
- [ ] Story-level review hoàn tất bằng skills phù hợp.
- [ ] Nếu sửa lỗi tích hợp trên Story branch, commit chứa Jira Key của Story.
- [ ] Story PR đã merge vào exact Epic branch.
- [ ] Story chỉ chuyển `IN REVIEW → DONE` sau khi merge và xác minh.

## US-79 — HIGH alert consultation note

- **Jira Key:** `PAC-118`
- **Exact Story branch:** `story/PAC-118-US-79-high-alert-consultation-note`
- **Merge target:** `epic/PAC-10-EPIC-10-interaction-alert`
- **Initial Jira status:** `TO DO`

### User Story progress

| Issue | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-79 | TO DO | — | `story/PAC-118-US-79-high-alert-consultation-note` | — | — | `epic/PAC-10-EPIC-10-interaction-alert` | Not opened | Pending | Pending | — | — |

### Related Tasks

| Task | Jira Key | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-247 — Build HIGH alert consultation note UI | `PAC-456` | TO DO | — | `feature/PAC-456-T-247-high-alert-consultation-note-ui` | — | — | `story/PAC-118-US-79-high-alert-consultation-note` | Merged | PASS | PASS | — | — |
| PAC-TASK-248 — Implement consultation note API per HIGH alert | `PAC-457` | TO DO | — | `feature/PAC-457-T-248-consultation-note-api-per-high-alert` | — | — | `story/PAC-118-US-79-high-alert-consultation-note` | Not opened | Pending | Pending | — | — |
| PAC-TASK-249 — Validate HIGH alert consultation note is not empty | `PAC-458` | TO DO | — | `feature/PAC-458-T-249-high-alert-note-not-empty-validation` | — | — | `story/PAC-118-US-79-high-alert-consultation-note` | Not opened | Pending | Pending | — | — |

### Story completion checklist

- [ ] Story được chuyển `TO DO → IN PROGRESS` khi Task đầu tiên bắt đầu.
- [ ] Tất cả Task đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- [ ] Mỗi Task có commit chứa đúng Jira Key của Task.
- [ ] Mỗi Task PR đã merge vào exact Story branch.
- [ ] Test evidence và Supabase data evidence đã cập nhật khi áp dụng.
- [ ] Không còn Blocking Bug.
- [ ] Story-level review hoàn tất bằng skills phù hợp.
- [ ] Nếu sửa lỗi tích hợp trên Story branch, commit chứa Jira Key của Story.
- [ ] Story PR đã merge vào exact Epic branch.
- [ ] Story chỉ chuyển `IN REVIEW → DONE` sau khi merge và xác minh.

## US-80 — Checkout blocker for unresolved HIGH alert

- **Jira Key:** `PAC-119`
- **Exact Story branch:** `story/PAC-119-US-80-checkout-blocker-high-alert`
- **Merge target:** `epic/PAC-10-EPIC-10-interaction-alert`
- **Initial Jira status:** `TO DO`

### User Story progress

| Issue | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-80 | TO DO | — | `story/PAC-119-US-80-checkout-blocker-high-alert` | — | — | `epic/PAC-10-EPIC-10-interaction-alert` | Not opened | Pending | Pending | — | — |

### Related Tasks

| Task | Jira Key | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-250 — Implement checkout blocker for unresolved HIGH alerts | `PAC-459` | TO DO | — | `feature/PAC-459-T-250-checkout-blocker-unresolved-high-alerts` | — | — | `story/PAC-119-US-80-checkout-blocker-high-alert` | Not opened | Pending | Pending | — | — |
| PAC-TASK-251 — Build UI prompt when checkout is blocked by HIGH alert | `PAC-460` | TO DO | — | `feature/PAC-460-T-251-ui-prompt-checkout-blocked-high-alert` | — | — | `story/PAC-119-US-80-checkout-blocker-high-alert` | Not opened | Pending | Pending | — | — |

### Story completion checklist

- [ ] Story được chuyển `TO DO → IN PROGRESS` khi Task đầu tiên bắt đầu.
- [ ] Tất cả Task đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- [ ] Mỗi Task có commit chứa đúng Jira Key của Task.
- [ ] Mỗi Task PR đã merge vào exact Story branch.
- [ ] Test evidence và Supabase data evidence đã cập nhật khi áp dụng.
- [ ] Không còn Blocking Bug.
- [ ] Story-level review hoàn tất bằng skills phù hợp.
- [ ] Nếu sửa lỗi tích hợp trên Story branch, commit chứa Jira Key của Story.
- [ ] Story PR đã merge vào exact Epic branch.
- [ ] Story chỉ chuyển `IN REVIEW → DONE` sau khi merge và xác minh.

## US-81 — Admin InteractionAlert History

- **Jira Key:** `PAC-120`
- **Exact Story branch:** `story/PAC-120-US-81-admin-interaction-alert-history`
- **Merge target:** `epic/PAC-10-EPIC-10-interaction-alert`
- **Initial Jira status:** `TO DO`

### User Story progress

| Issue | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-81 | TO DO | — | `story/PAC-120-US-81-admin-interaction-alert-history` | — | — | `epic/PAC-10-EPIC-10-interaction-alert` | Not opened | Pending | Pending | — | — |

### Related Tasks

| Task | Jira Key | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-252 — Build Admin InteractionAlert History API and UI | `PAC-461` | TO DO | — | `feature/PAC-461-T-252-admin-interaction-alert-history-api-ui` | — | — | `story/PAC-120-US-81-admin-interaction-alert-history` | Not opened | Pending | Pending | — | — |
| PAC-TASK-257 — Add filters to InteractionAlert History | `PAC-466` | TO DO | — | `feature/PAC-466-T-257-interaction-alert-history-filters` | — | — | `story/PAC-120-US-81-admin-interaction-alert-history` | Not opened | Pending | Pending | — | — |

### Story completion checklist

- [ ] Story được chuyển `TO DO → IN PROGRESS` khi Task đầu tiên bắt đầu.
- [ ] Tất cả Task đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- [ ] Mỗi Task có commit chứa đúng Jira Key của Task.
- [ ] Mỗi Task PR đã merge vào exact Story branch.
- [ ] Test evidence và Supabase data evidence đã cập nhật khi áp dụng.
- [ ] Không còn Blocking Bug.
- [ ] Story-level review hoàn tất bằng skills phù hợp.
- [ ] Nếu sửa lỗi tích hợp trên Story branch, commit chứa Jira Key của Story.
- [ ] Story PR đã merge vào exact Epic branch.
- [ ] Story chỉ chuyển `IN REVIEW → DONE` sau khi merge và xác minh.

## US-82 — Warehouse no-access to InteractionAlert

- **Jira Key:** `PAC-121`
- **Exact Story branch:** `story/PAC-121-US-82-warehouse-no-access-interaction-alert`
- **Merge target:** `epic/PAC-10-EPIC-10-interaction-alert`
- **Initial Jira status:** `TO DO`

### User Story progress

| Issue | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-82 | TO DO | — | `story/PAC-121-US-82-warehouse-no-access-interaction-alert` | — | — | `epic/PAC-10-EPIC-10-interaction-alert` | Not opened | Pending | Pending | — | — |

### Related Tasks

| Task | Jira Key | Jira current status | Previous status | Exact branch | Commit SHA | PR URL | Merge target | Merge status | Test evidence | Supabase data evidence | Linked Bugs | Blocking Bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-253 — Enforce Warehouse no-access to InteractionAlert APIs | `PAC-462` | TO DO | — | `feature/PAC-462-T-253-warehouse-no-access-interaction-alert` | — | — | `story/PAC-121-US-82-warehouse-no-access-interaction-alert` | Not opened | Pending | Pending | — | — |
| PAC-TASK-254 — Add tests for Warehouse no-access to InteractionAlert | `PAC-463` | TO DO | — | `test/PAC-463-T-254-warehouse-no-access-alert-tests` | — | — | `story/PAC-121-US-82-warehouse-no-access-interaction-alert` | Not opened | Pending | Pending | — | — |

### Story completion checklist

- [ ] Story được chuyển `TO DO → IN PROGRESS` khi Task đầu tiên bắt đầu.
- [ ] Tất cả Task đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- [ ] Mỗi Task có commit chứa đúng Jira Key của Task.
- [ ] Mỗi Task PR đã merge vào exact Story branch.
- [ ] Test evidence và Supabase data evidence đã cập nhật khi áp dụng.
- [ ] Không còn Blocking Bug.
- [ ] Story-level review hoàn tất bằng skills phù hợp.
- [ ] Nếu sửa lỗi tích hợp trên Story branch, commit chứa Jira Key của Story.
- [ ] Story PR đã merge vào exact Epic branch.
- [ ] Story chỉ chuyển `IN REVIEW → DONE` sau khi merge và xác minh.

## Epic completion checklist

- [ ] Epic được chuyển `TO DO → IN PROGRESS` khi Story đầu tiên bắt đầu.
- [ ] Tất cả Story thuộc Epic đã `DONE`.
- [ ] Epic-level integration review đã hoàn tất.
- [ ] Nếu sửa lỗi trên Epic branch, commit chứa Jira Key của Epic.
- [ ] Không còn Blocking Bug hoặc High Bug chưa xử lý.
- [ ] Epic PR đã merge vào `develop`.
- [ ] Epic chỉ chuyển `IN REVIEW → DONE` sau khi merge và xác minh.


# 6. Bug Register

> Mọi lỗi phát hiện trong unit test, integration test, Supabase data test, UI test,
> security test hoặc review phải được tạo thành Jira issue loại `BUG`.

| Bug Jira Key | Summary | Severity | Priority | Affected Epic | Affected Story | Affected Task | Jira current status | Previous status | Bugfix branch | Commit SHA | PR URL | Merge target | Merge status | Regression test | Supabase evidence | Result |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Chưa có | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |

## Bug lifecycle checklist

- [ ] Bug được tạo trên Jira ở `TO DO`.
- [ ] Bug có Steps to Reproduce, Actual Result và Expected Result.
- [ ] Bug được link với Epic/Story/Task bị ảnh hưởng.
- [ ] Bug được chuyển `TO DO → IN PROGRESS`.
- [ ] Chỉ tạo bugfix branch sau khi Jira trả Jira Key thật.
- [ ] Commit fix chứa Jira Key của Bug.
- [ ] Regression test được bổ sung.
- [ ] Bug được chuyển `IN PROGRESS → IN REVIEW` sau khi PR mở.
- [ ] Review chưa đạt thì chuyển `IN REVIEW → IN PROGRESS`.
- [ ] Bug chỉ chuyển `IN REVIEW → DONE` sau khi PR merge và regression pass.

---

# 7. Pull Request & Merge Evidence

## Task → Story

| Task | Exact source branch | Exact target Story branch | PR URL | Checks | Merge status | Merge SHA |
|---|---|---|---|---|---|---|
| Chưa cập nhật | — | — | — | — | — | — |

## Story → Epic

| Story | Exact source branch | Exact target Epic branch | PR URL | Checks | Merge status | Merge SHA |
|---|---|---|---|---|---|---|
| Chưa cập nhật | — | — | — | — | — | — |

## Epic → develop

| Epic | Exact source branch | Target | PR URL | Checks | Merge status | Merge SHA |
|---|---|---|---|---|---|---|
| PAC-EPIC-09 | `epic/PAC-9-EPIC-09-drug-interaction-rule` | `develop` | — | Pending | Not opened | — |
| PAC-EPIC-10 | `epic/PAC-10-EPIC-10-interaction-alert` | `develop` | — | Pending | Not opened | — |

---

# 8. Automated Test Results

| Kiểm tra | Trạng thái | Lệnh / Evidence | Jira issue | Supabase evidence | Ghi chú |
|---|---|---|---|---|---|
| Backend lint | Chưa chạy | — | — | N/A | — |
| Backend unit tests | Chưa chạy | — | — | Khi áp dụng | — |
| Backend integration tests | Chưa chạy | — | — | Bắt buộc cho data lifecycle | — |
| Backend E2E tests | Chưa chạy | — | — | Khi áp dụng | — |
| Prisma validate | Chưa chạy | — | — | Schema cross-check | — |
| Prisma generate | Chưa chạy | — | — | N/A | — |
| Migration verification | Chưa chạy | — | — | Bắt buộc | — |
| Frontend lint | Chưa chạy | — | — | N/A | — |
| Frontend tests | Chưa chạy | — | — | Khi áp dụng | — |
| Frontend build | Chưa chạy | — | — | N/A | — |
| CI checks | Chưa chạy | — | — | N/A | — |

---

# 9. Supabase Data Verification Checklist

- [ ] Xác định đúng non-production/test environment.
- [ ] Không chạy destructive test trên demo hoặc production.
- [ ] Kiểm tra migration state trước test.
- [ ] Kiểm tra DrugInteractionRule schema, enum, indexes và constraints.
- [ ] Kiểm tra canonical ActiveIngredient pair.
- [ ] Kiểm tra duplicate reverse pair bị chặn.
- [ ] Kiểm tra LOW/MEDIUM/HIGH được lưu đúng.
- [ ] Kiểm tra inactive rule không tạo alert mới.
- [ ] Kiểm tra InteractionAlert snapshot fields.
- [ ] Kiểm tra one active alert per order/rule.
- [ ] Kiểm tra redisplay tăng `display_count`.
- [ ] Kiểm tra `last_displayed_at`.
- [ ] Kiểm tra acknowledgement actor/time.
- [ ] Kiểm tra consultation note không rỗng.
- [ ] Kiểm tra unresolved HIGH bị blocker từ chối.
- [ ] Kiểm tra Warehouse không đọc/ghi alert trái quyền.
- [ ] Kiểm tra transaction rollback.
- [ ] Mọi test dataset có Test Run ID.
- [ ] Cleanup chỉ xóa dữ liệu thuộc Test Run ID.
- [ ] Không ghi secret, token hoặc dữ liệu nhạy cảm vào evidence.

---

# 10. Final Sprint 5 Verification

- [ ] 32/32 Task ở `DONE`.
- [ ] 14/14 Story ở `DONE`.
- [ ] 2/2 Epic ở `DONE`.
- [ ] 48/48 exact issue branches đã dùng đúng.
- [ ] Không tạo branch Epic/Story/Task mới.
- [ ] Mọi commit có Jira Key đúng issue branch.
- [ ] Task PR merge đúng Story.
- [ ] Story PR merge đúng Epic.
- [ ] Epic PR merge vào `develop`.
- [ ] Jira transitions đúng workflow.
- [ ] Không còn Blocking Bug.
- [ ] Backend/frontend tests và build pass.
- [ ] Supabase data verification pass.
- [ ] Migration và constraint verification pass.
- [ ] Manual UI verification pass.
- [ ] Audit/progress/WORKING-CONTEXT đã cập nhật.

```text
Ready for Sprint 6 = No
```
