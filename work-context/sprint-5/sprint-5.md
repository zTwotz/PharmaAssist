# Sprint 5 — DrugInteraction Rule & InteractionAlert

> **Tài liệu kế hoạch thực thi chính thức cho Sprint 5 của PharmaAssist AI Intelligence**
>
> `work-context/sprint-5/sprint-5.md`
>
> **Trạng thái:** `Prepared — MCP workflow defined — Not authorized to implement`
>
> Sprint 4 đang được triển khai. AI chỉ được code Sprint 5 sau khi Sprint 4 đạt `Ready for Sprint 5 = Yes`.

---

# 1. Mục đích tài liệu

Tài liệu xác định phạm vi, dependency, baseline nghiệp vụ, 2 Epic, 14 Story, 32 Task, 48 exact issue branches, chiến lược skill, kiểm thử dữ liệu bằng Supabase MCP, điều phối trạng thái bằng Jira MCP, kiểm soát branch/commit/PR bằng GitHub MCP và Definition of Done của Sprint 5.

---

# 2. Tài liệu nguồn và thứ tự ưu tiên

1. `Jira/1_Components.md`
2. `Jira/2_Epic.md`
3. `Jira/3_Stories.md`
4. `Jira/4B_Task_List_MVP_POS_Interaction_Checkout_146_290.md`
5. `Jira/4B_Task_Description_MVP_POS_Interaction_Checkout_146_290.md`
6. `Jira/5_Sprint.md`
7. `Jira/jira-mapping.md`
8. `Jira/branch-on-jira.md`
9. `work-context/sprint-4/`
10. SRS, Roles & Permissions, API, Database, Prisma, UI/UX và Testing documents.

Ưu tiên:

1. `branch-on-jira.md`: exact branch name.
2. `jira-mapping.md`: Jira Key thật.
3. Task List 4B: Task → Story → Parent Epic → Component.
4. Task Description 4B: nội dung Task.
5. `3_Stories.md`: Story và Acceptance Criteria.
6. `2_Epic.md`: Epic metadata.
7. `5_Sprint.md`: Sprint scope.

Không dùng tên branch suy luận hoặc “Branch đề xuất” cũ.

---

# 3. Sprint Information

| Mục | Nội dung |
|---|---|
| Sprint | Sprint 5 |
| Tên | DrugInteraction Rule & InteractionAlert |
| Scope | MVP / Core |
| Trạng thái | Prepared — Not authorized to implement |
| Epic nghiệp vụ | PAC-EPIC-09, PAC-EPIC-10 |
| Epic hỗ trợ | PAC-EPIC-19, PAC-EPIC-21 |
| Story | US-69 → US-82 |
| Số Story | 14 |
| Task | PAC-TASK-227 → PAC-TASK-258 |
| Số Task | 32 |
| Exact issue branches | 48 = 2 Epic + 14 Story + 32 Task |
| Branch mới được phép tạo | 0 |
| Component chính | InteractionAlert |
| Dependency | Sprint 2 và Sprint 4 |
| Sprint kế tiếp | Sprint 6 — Checkout, FEFO, Payment & Invoice |
| MCP bắt buộc | Jira MCP, GitHub MCP, Supabase MCP |
| Jira baseline ban đầu | Tất cả Epic, Story, Task Sprint 5 ở TO DO |
| Supabase MCP purpose | Kiểm thử dữ liệu, schema, constraint, transaction, role data và xác minh persistence |
| Bug policy | Mọi lỗi phát hiện trong kiểm thử phải tạo Jira issue loại BUG |

## Exact Epic branches

```text
epic/PAC-9-epic-09-druginteraction-rule
epic/PAC-10-epic-10-interactionalert-lifecycle
```

## Phân bổ Task

| Nhóm | Range | Số Task |
|---|---:|---:|
| DrugInteraction Rule | 227 → 236 | 10 |
| Order interaction check | 237 → 238 | 2 |
| Alert persistence/lifecycle | 239 → 244 | 6 |
| HIGH handling/blocker | 245 → 251 | 7 |
| History/access/tests/traceability | 252 → 258 | 7 |
| **Tổng** | **227 → 258** | **32** |

---


# 4. MCP Integration và quy trình vận hành bắt buộc

Sprint 5 phải được thực hiện với ba kết nối MCP:

```text
Jira MCP
GitHub MCP
Supabase MCP
```

Mỗi MCP có vai trò riêng. AI Agent không được thay thế một MCP bằng suy đoán hoặc bằng ghi chú thủ công nếu kết nối tương ứng đang khả dụng.

## 4.1. Phân công trách nhiệm giữa các MCP

| MCP | Mục đích bắt buộc |
|---|---|
| Jira MCP | Đọc issue, xác minh Jira Key, điều phối trạng thái, tạo BUG, liên kết issue, cập nhật comment và evidence |
| GitHub MCP | Xác minh exact branch, commit, push, Pull Request, checks, merge hierarchy và merge evidence |
| Supabase MCP | Kiểm thử dữ liệu, xác minh schema/index/constraint, seed dữ liệu test, kiểm tra persistence, transaction rollback, role/profile data và cleanup |

## 4.2. Quy tắc Jira Workflow

Workflow duy nhất:

```text
TO DO
→ IN PROGRESS
→ IN REVIEW
→ DONE
```

Vòng sửa lỗi hợp lệ:

```text
IN REVIEW
→ IN PROGRESS
→ IN REVIEW
```

Quy tắc:

1. Mỗi lần chỉ thực hiện đúng một transition.
2. Không chuyển `TO DO → IN REVIEW`.
3. Không chuyển `TO DO → DONE`.
4. Không chuyển `IN PROGRESS → DONE`.
5. Không chuyển `IN PROGRESS → TO DO`.
6. Không chuyển `DONE → IN REVIEW`.
7. Không chuyển `DONE → IN PROGRESS`.
8. `DONE` là trạng thái kết thúc và không được mở lại.
9. Trước mỗi transition, AI phải đọc trạng thái hiện tại và danh sách transition hợp lệ bằng Jira MCP.
10. Sau mỗi transition, AI phải đọc lại issue để xác minh trạng thái mới.
11. Không cập nhật Jira dựa trên cache hoặc giả định.
12. Không đánh dấu `DONE` nếu thiếu GitHub merge evidence, test evidence hoặc còn Bug chặn.

## 4.3. Lifecycle của Task

### Bắt đầu Task

Trước khi sửa code:

1. Đọc Task bằng Jira MCP.
2. Xác minh Jira Key, Linked Story, Parent Epic, Sprint và Component.
3. Xác minh Task đang ở `TO DO`.
4. Xác minh exact Task branch bằng GitHub MCP.
5. Checkout đúng branch đã tồn tại.
6. Lập implementation plan.
7. Chuyển:

```text
TO DO → IN PROGRESS
```

8. Thêm Jira comment:

```text
Started implementation

Branch: <exact Task branch>
Target Story: <exact Story branch>
Implementation plan: <tóm tắt>
Selected skills: <skills>
```

### Đưa Task vào review

Chỉ sau khi:

- code hoàn thành;
- test phù hợp đã chạy;
- Supabase data verification đã thực hiện nếu Task liên quan dữ liệu;
- commit dùng đúng Jira Key Task;
- push thành công;
- Pull Request Task → Story đã mở;
- GitHub checks ban đầu không có lỗi cấu hình.

Chuyển:

```text
IN PROGRESS → IN REVIEW
```

Thêm Jira comment:

```text
Ready for review

Commit: <SHA>
Pull Request: <URL>
Tests: <kết quả>
Supabase evidence: <query/test-run/result hoặc N/A có lý do>
Known issues: <none hoặc danh sách>
```

### Task review chưa đạt

Nếu review, CI, integration test hoặc data test không đạt:

```text
IN REVIEW → IN PROGRESS
```

AI sửa trên đúng Task branch, commit mới vẫn dùng Jira Key Task, push, chạy lại test và sau đó:

```text
IN PROGRESS → IN REVIEW
```

### Hoàn thành Task

Chỉ chuyển:

```text
IN REVIEW → DONE
```

khi:

- PR Task → Story đã merge;
- checks pass;
- Acceptance Criteria đạt;
- Supabase data verification đạt nếu áp dụng;
- regression test đạt;
- không còn Bug Blocker/High đang mở cho Task;
- Story branch chứa thay đổi của Task;
- Jira đã có commit, PR và merge evidence.

## 4.4. Lifecycle của User Story

Khi bắt đầu Task đầu tiên của Story:

1. Đọc Story bằng Jira MCP.
2. Nếu Story đang `TO DO`, chuyển:

```text
TO DO → IN PROGRESS
```

3. Không chuyển Story sang `IN REVIEW` cho đến khi toàn bộ Task của Story đã `DONE`.

Sau khi tất cả Task đã merge vào Story branch:

1. Checkout exact Story branch.
2. Dùng skills phù hợp review toàn Story.
3. Chạy Story integration tests.
4. Dùng Supabase MCP kiểm tra dữ liệu tích hợp nếu Story tác động database.
5. Xác minh mọi Bug chặn đã `DONE`.
6. Nếu có lỗi tích hợp, sửa trực tiếp trên Story branch.
7. Commit sửa lỗi phải dùng Jira Key Story.
8. Push Story branch.
9. Tạo PR Story → Business Epic.
10. Chuyển:

```text
IN PROGRESS → IN REVIEW
```

Nếu Story review chưa đạt:

```text
IN REVIEW → IN PROGRESS
```

Sau khi sửa và test lại:

```text
IN PROGRESS → IN REVIEW
```

Chỉ chuyển Story:

```text
IN REVIEW → DONE
```

khi Story PR đã merge vào Epic branch, tất cả Task đã `DONE`, Acceptance Criteria đạt và không còn Bug chặn.

## 4.5. Lifecycle của Epic

Khi bắt đầu Story đầu tiên của Epic:

```text
TO DO → IN PROGRESS
```

Sau khi mọi Story của Epic đã `DONE` và merge vào Epic branch:

1. Checkout exact Epic branch.
2. Dùng skills phù hợp chạy Epic review.
3. Chạy full regression trong phạm vi Epic.
4. Dùng Supabase MCP xác minh schema, migration, dữ liệu và transaction liên quan.
5. Sửa lỗi cấp Epic trực tiếp trên Epic branch nếu cần.
6. Commit sửa lỗi phải dùng Jira Key Epic.
7. Tạo PR Epic → `develop`.
8. Chuyển:

```text
IN PROGRESS → IN REVIEW
```

Nếu Epic review chưa đạt:

```text
IN REVIEW → IN PROGRESS
```

Chỉ chuyển:

```text
IN REVIEW → DONE
```

khi Epic PR đã merge vào `develop`, checks pass, test pass, không còn Bug chặn và `develop` chứa đầy đủ thay đổi.

## 4.6. GitHub MCP policy

GitHub MCP phải được dùng để:

- kiểm tra exact branch đã tồn tại;
- xác minh current branch trước commit;
- kiểm tra commit message có đúng Jira Key;
- push đúng remote branch;
- tạo PR đúng `head` và `base`;
- theo dõi CI checks;
- đọc review status;
- xác minh `mergedAt`, merge commit và target branch;
- đồng bộ PR URL, commit SHA và merge SHA về Jira;
- giữ branch sau merge làm evidence.

Cấm:

- tạo branch mới cho Epic/Story/Task đã có trong `branch-on-jira.md`;
- tự đổi slug branch;
- push trực tiếp lên `develop` hoặc `main`;
- Task merge thẳng Epic/develop/main;
- Story merge thẳng develop/main;
- Epic merge thẳng main;
- merge khi checks fail;
- force-push `develop` hoặc `main`;
- xóa branch evidence;
- tự merge `develop → main`.

## 4.7. Supabase MCP — mục đích kiểm thử dữ liệu

Supabase MCP trong Sprint 5 được dùng chủ yếu để **testing và verification dữ liệu**, không thay thế Prisma migration hoặc business API.

AI phải dùng Supabase MCP khi Task liên quan:

- Prisma model hoặc migration;
- DrugInteractionRule persistence;
- ActiveIngredient mapping;
- InteractionAlert persistence;
- snapshot fields;
- unique/canonical interaction pair;
- one-active-alert constraint;
- `display_count`;
- `last_displayed_at`;
- acknowledgement;
- consultation note;
- role/profile/permission data;
- transaction và rollback;
- test fixture hoặc bug reproduction.

### Các việc Supabase MCP được phép thực hiện

1. Xác minh đúng Supabase project/environment.
2. Đọc schema, table, column, index, enum và constraint.
3. Kiểm tra migration đã áp dụng hay chưa.
4. Seed bộ dữ liệu test tối thiểu.
5. Gắn `test_run_id`, prefix hoặc metadata để cô lập dữ liệu test.
6. Đọc dữ liệu trước và sau khi gọi API/service.
7. Xác minh row persistence và relation.
8. Xác minh duplicate prevention.
9. Xác minh transaction rollback.
10. Xác minh dữ liệu acknowledgement/note không bị reset khi redisplay.
11. Kiểm tra role/profile test data cho Admin, Staff và Warehouse.
12. Thu thập evidence đã che dữ liệu nhạy cảm.
13. Cleanup dữ liệu test do chính test run tạo ra.

### Các việc Supabase MCP không được phép thực hiện

- Không reset Supabase project.
- Không chạy destructive test trên production hoặc demo database.
- Không xóa dữ liệu thật hoặc dữ liệu seed dùng chung.
- Không sửa schema trực tiếp bằng ad-hoc DDL thay cho migration trong Git.
- Không chỉnh production data để làm test pass.
- Không vô hiệu hóa RLS/constraint/permission chỉ để test.
- Không ghi service-role key, token hoặc secret vào Jira/GitHub/log.
- Không đưa PII hoặc dữ liệu nhạy cảm vào Bug evidence.
- Không bypass backend authorization để kết luận permission API đã đúng.

### Quy trình Data Test chuẩn

```text
1. Xác minh environment
2. Ghi test_run_id
3. Chụp trạng thái dữ liệu trước test
4. Seed dữ liệu test tối thiểu
5. Gọi API/service của ứng dụng
6. Đọc và xác minh dữ liệu sau test bằng Supabase MCP
7. Kiểm tra constraint/index/transaction
8. Ghi evidence đã che thông tin nhạy cảm
9. Cleanup dữ liệu của test_run_id
10. Xác minh cleanup
```

Nếu không thể xác định environment an toàn:

```text
Supabase Data Test = Blocked
```

Không được tự chạy query ghi dữ liệu.

## 4.8. Data Test Matrix cho Sprint 5

| Nhóm kiểm thử | Dữ liệu cần chuẩn bị | Xác minh bằng Supabase MCP |
|---|---|---|
| Rule creation | Hai ActiveIngredient active | Rule lưu đúng hai FK, severity, description, recommendation |
| Canonical pair | Cặp A–B và thử B–A | Không tồn tại duplicate đảo chiều |
| Severity | LOW, MEDIUM, HIGH và giá trị sai | Chỉ ba giá trị hợp lệ được lưu |
| Deactivate rule | Rule đang active | `isActive=false`, lịch sử không bị xóa |
| Derived interaction | Hai Medicine có mapping tới ingredient tương tác | Service trả đúng rule active |
| Order check | Order có từ hai medicine | Alert candidates gắn đúng Order |
| Alert persistence | Rule và Order hợp lệ | InteractionAlert lưu snapshot đầy đủ |
| One active alert | Gọi check nhiều lần | Không tạo duplicate active row |
| Display tracking | Redisplay alert | `display_count` tăng, `last_displayed_at` đổi |
| HIGH acknowledgement | Staff hợp lệ | actor và timestamp được lưu |
| Consultation note | Note hợp lệ/rỗng/whitespace | Chỉ note hợp lệ được persist |
| Redisplay after resolution | Alert đã acknowledge và có note | Dữ liệu resolution không bị reset |
| Warehouse restriction | Warehouse profile/role | API phải 403; Supabase chỉ xác minh role fixture |
| Transaction failure | Một bước persistence cố ý fail | Không có partial data còn lại |
| History | Nhiều severity/order/actor | Admin query trả dữ liệu đúng filter |

## 4.9. Bug Management bằng Jira MCP

Mọi lỗi phát hiện trong:

- unit test;
- integration test;
- E2E test;
- manual UI test;
- security test;
- Supabase data verification;
- Story review;
- Epic review;
- Sprint regression;

đều phải tạo Jira issue loại:

```text
BUG
```

Không chỉ ghi lỗi trong chat hoặc progress file.

### Trường bắt buộc của Bug

- Summary: `[BUG][Sprint 5][Module] mô tả ngắn`.
- Issue Type: Bug.
- Sprint: Sprint 5.
- Component.
- Affected Epic.
- Affected Story.
- Affected Task.
- Environment.
- Preconditions.
- Steps to Reproduce.
- Actual Result.
- Expected Result.
- Reproduction Rate.
- Severity.
- Priority.
- Evidence.
- Suspected Area.
- Fix Acceptance Criteria.
- Regression Test Required: Yes.
- Linked PR/commit nếu đã có.
- Supabase evidence đã che dữ liệu nhạy cảm nếu lỗi liên quan data.

### Bug lifecycle

Bug được tạo ở:

```text
TO DO
```

Khi bắt đầu sửa:

```text
TO DO → IN PROGRESS
```

Sau khi code, commit, push, test và mở PR:

```text
IN PROGRESS → IN REVIEW
```

Nếu review fail:

```text
IN REVIEW → IN PROGRESS
```

Sau khi PR merge và regression pass:

```text
IN REVIEW → DONE
```

Không chuyển tắt trạng thái.

### Bug branch

Epic/Story/Task đã có branch sẵn nên không được tạo branch mới. Bug phát sinh động là ngoại lệ hợp lệ.

Chỉ sau khi Jira MCP tạo Bug và trả Jira Key thật, AI mới được tạo:

```text
bugfix/<BUG-JIRA-KEY>-bug-<short-slug>
```

Commit:

```text
<BUG-JIRA-KEY> BUG: <short English fix message>
```

PR target:

| Thời điểm phát hiện | Target |
|---|---|
| Trong Task | Task branch bị ảnh hưởng |
| Story review | Story branch bị ảnh hưởng |
| Epic review | Epic branch bị ảnh hưởng |
| Sprint regression trên develop | `develop` |
| Issue cũ đã DONE | Branch tích hợp hiện tại phù hợp, thường là `develop` |

Nếu Bug chặn issue đang `IN REVIEW`, issue đó phải chuyển:

```text
IN REVIEW → IN PROGRESS
```

Sau khi Bug `DONE`, chạy review lại rồi mới chuyển issue cha trở lại `IN REVIEW`.

Nếu issue cha đã `DONE`, không mở lại; tạo và link Bug độc lập.

## 4.10. MCP Evidence bắt buộc

Mỗi Task/Story/Epic phải ghi:

| Evidence | Nội dung |
|---|---|
| Jira status before | Trạng thái trước |
| Jira transition | Transition đã thực hiện |
| Jira status after | Trạng thái sau |
| Exact branch | Branch từ `branch-on-jira.md` |
| Commit | SHA + message |
| Pull Request | URL/number |
| GitHub checks | Pass/Fail |
| Merge evidence | mergedAt + merge SHA |
| Supabase environment | Project/environment đã xác minh |
| Supabase test run | test_run_id hoặc N/A có lý do |
| Data before/after | Evidence đã che dữ liệu nhạy cảm |
| Cleanup | Completed/Not applicable/Blocked |
| Linked Bugs | Jira Bug keys |
| Blocking Bugs | Open/None |
| Test result | Pass/Fail/N/A |

---


# 5. Dependency Gate

```text
Sprint 4 = Completed
PAC-EPIC-07 = Verified Done
PAC-EPIC-08 = Verified Done
US-49 → US-68 = Verified Done
PAC-TASK-161 → PAC-TASK-226 = Verified Done
Ready for Sprint 5 = Yes
Sprint 4 đã merge vào develop
Không còn Blocker ảnh hưởng Sprint 5
Workspace sạch
```

Dependency MCP bắt buộc:

- Jira MCP kết nối và đọc được issue/transition.
- GitHub MCP kết nối và đọc được branch/PR/checks.
- Supabase MCP kết nối đúng environment test an toàn.
- Tất cả Epic, Story và Task Sprint 5 đang ở `TO DO` trước khi triển khai.
- Không có issue Sprint 5 đã bị chuyển trạng thái sai.
- Có khả năng tạo Jira BUG và link với issue bị ảnh hưởng.
- Có chiến lược cô lập và cleanup dữ liệu test Supabase.

Dependency kỹ thuật:

- Medicine, ActiveIngredient và mapping Medicine–ActiveIngredient.
- Order, OrderItem và POS Draft Order.
- Staff ownership, Admin all-orders, Warehouse restriction.
- AuthGuard và PermissionsGuard.
- Audit foundation.
- Graph Sync event/outbox contract nếu tái sử dụng.
- 48 exact Sprint 5 branches tồn tại trên remote.

Nếu gate chưa đạt:

```text
Ready to implement Sprint 5 = No
```

Không tạo branch mới và không sửa business code Sprint 5.

---

# 6. Baseline nghiệp vụ

## DrugInteraction Rule

1. PostgreSQL là source of truth.
2. Rule ở cấp ActiveIngredient–ActiveIngredient.
3. Không dùng Medicine–Medicine rule official.
4. Canonicalize cặp hoạt chất để tránh duplicate đảo chiều.
5. Hai ingredient phải tồn tại, active và khác nhau trừ khi có quyết định đặc biệt.
6. Severity chỉ LOW, MEDIUM, HIGH; không có CRITICAL.
7. Lưu description, recommendation, isActive, timestamps.
8. Admin create/update/deactivate.
9. Deactivate mềm; không xóa lịch sử.
10. Rule inactive không dùng cho check mới.

## Order interaction check

1. Main flow nhận `order_id`.
2. Actor phải có quyền và ownership scope.
3. Dưới 2 medicine thì không tạo pair check.
4. Từ 2 medicine trở lên lấy ActiveIngredient mapping và derive rule.
5. Hỗ trợ medicine nhiều hoạt chất.
6. Rule semantically symmetric.
7. Không dùng Neo4j để quyết định alert/checkout.

## InteractionAlert

1. Alert đã hiển thị phải persist.
2. Gắn Order và DrugInteractionRule.
3. Snapshot severity, description, recommendation, rule reference và thời điểm hiển thị.
4. Một active alert cho order_id + interaction_rule_id.
5. Redisplay không tạo duplicate.
6. Redisplay tăng display_count và cập nhật last_displayed_at.
7. Không reset acknowledgement/note cũ.
8. Enforcement phải concurrency-safe.

## HIGH handling

- HIGH bắt buộc acknowledgement.
- Lưu acknowledged_by và acknowledged_at.
- HIGH bắt buộc consultation note riêng cho từng alert.
- Note trim và không rỗng.
- Backend chặn checkout nếu thiếu acknowledgement hoặc note.
- LOW/MEDIUM không bị ép theo HIGH rule.

## Checkout boundary

Sprint 5 chỉ triển khai blocker contract/service và UI response. Full checkout transaction, FEFO, trừ batch, Payment, Invoice, idempotency và rollback thuộc Sprint 6.

## Permission

- Admin quản lý rule và xem toàn bộ history.
- Staff check/xử lý alert trong Order scope.
- Warehouse không truy cập rule/alert/history; backend trả 403.

## Graph boundary

Task 233 chỉ tạo event/outbox. Không ghi Neo4j trực tiếp, không worker, projection, freshness hoặc Graph-RAG.

## Safety

- Cảnh báo dựa trên rule quản lý, không bịa dữ liệu y khoa.
- UI có disclaimer hỗ trợ tham khảo nghiệp vụ.
- Không chẩn đoán, kê đơn hoặc tư vấn liều dùng.
- AI/Graph không quyết định checkout.

---

# 7. Sprint Definition of Done

- DrugInteractionRule ActiveIngredient-level hoạt động.
- Create/update/deactivate rule hoạt động.
- Severity LOW/MEDIUM/HIGH được enforce.
- Derived interaction và Order check hoạt động.
- Alert persist snapshot.
- One-active-alert và display tracking hoạt động.
- POS hiển thị severity.
- HIGH acknowledgement/note hoạt động.
- Backend blocker từ chối HIGH unresolved.
- Admin History hoạt động.
- Warehouse bị chặn.
- Graph event được tạo đúng boundary.
- 32 Task PR merge vào Story.
- 14 Story PR merge vào Epic.
- 2 Epic PR merge vào develop.
- Branch mới tạo = 0.
- `Ready for Sprint 6 = Yes` sau final verification.
- Jira workflow của toàn bộ Epic/Story/Task đúng từng bước.
- Mọi Task, Story, Epic đều có Jira transition evidence.
- Mọi commit/PR/merge được GitHub MCP xác minh.
- Supabase data tests đã chạy cho các Task liên quan dữ liệu.
- Dữ liệu test được cô lập và cleanup an toàn.
- Không có Bug Blocker/High chưa `DONE`.
- Mỗi Bug có mô tả, regression test, branch, commit, PR và lifecycle đúng.


---

# PAC-EPIC-09 — DrugInteraction Rule

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-9` |
| Story range | `US-69 → US-72` |
| Số Story | 4 |
| Exact Epic branch đã tồn tại | `epic/PAC-9-epic-09-druginteraction-rule` |
| Epic PR target | `develop` |

## Mục tiêu Epic

Xây dựng rule tương tác thuốc ở cấp ActiveIngredient–ActiveIngredient. PostgreSQL là nguồn dữ liệu chính thức; thay đổi rule chỉ phát sinh Graph Sync event, không triển khai Neo4j worker trong Sprint 5.

## Kết quả cần đạt

- Admin tạo, cập nhật và deactivate DrugInteraction Rule.
- Rule pair được canonicalize để tránh duplicate đảo chiều.
- Severity chỉ LOW/MEDIUM/HIGH.
- Rule inactive không dùng cho check mới.
- Graph Sync event được tạo; không triển khai Neo4j worker.
- Không dùng Medicine–Medicine làm source of truth.

## Epic Git và MCP gate

- Jira MCP: Epic chuyển `TO DO → IN PROGRESS` khi bắt đầu Story đầu tiên.
- Jira MCP: chỉ chuyển Epic `IN PROGRESS → IN REVIEW` khi mọi Story đã `DONE` và Epic PR đã mở.
- Nếu review fail hoặc có Bug chặn: Epic `IN REVIEW → IN PROGRESS`.
- Chỉ chuyển Epic `IN REVIEW → DONE` sau khi PR merge vào `develop`.
- GitHub MCP: xác minh Story PRs, Epic PR, checks và merge SHA.
- Supabase MCP: chạy Epic-level schema/data/transaction regression verification.

- Không tạo Epic branch mới.
- Sau khi mọi Story merge xong, chạy Epic-level review.
- Nếu có lỗi, commit trực tiếp trên Epic branch bằng Jira Key `PAC-9`.
- Commit format: `PAC-9 EPIC-09: <short English fix message>`.
- PR và merge Epic vào `develop`.
- Không merge trực tiếp vào `main`.

---

# US-69 — Tạo DrugInteraction Rule cấp ActiveIngredient

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-108` |
| Parent Business Epic | `PAC-EPIC-09 — DrugInteraction Rule` |
| Component | InteractionAlert |
| Priority | Highest |
| Story Point | 5 |
| Labels | interaction-rule, active-ingredient, mvp |
| Số Task | 4 |
| Exact Story branch đã tồn tại | `story/PAC-108-us-69-tao-druginteraction-rule-cap-activeingredient` |
| Story PR target | `epic/PAC-9-epic-09-druginteraction-rule` |

## Mục tiêu User Story

Nhóm cần xây dựng rule tương tác thuốc dựa trên cặp hoạt chất.

## Acceptance Criteria

- [ ] Rule dùng ActiveIngredient–ActiveIngredient.
- [ ] Không dùng Medicine–Medicine làm source of truth.
- [ ] Có severity, description, recommendation.
- [ ] Admin tạo rule.

## Skill trọng tâm

- `karpathy-principles`
- `writing-plans`
- `ecc-database`
- `ecc-backend`
- `ecc-security`
- `ecc-frontend`
- `tdd`
- `ecc-testing`

## Danh sách Task và branch

| Task | Jira Key | Nội dung | Exact Task branch | PR target |
|---|---|---|---|---|
| `PAC-TASK-227` | `PAC-437` | Create drug_interaction_rules Prisma model | `feature/PAC-437-task-227-create-drug-interaction-rules-prisma-model` | `story/PAC-108-us-69-tao-druginteraction-rule-cap-activeingredient` |
| `PAC-TASK-228` | `PAC-438` | Implement create ActiveIngredient-level interaction rule API | `feature/PAC-438-task-228-implement-create-activeingredient-level-interaction` | `story/PAC-108-us-69-tao-druginteraction-rule-cap-activeingredient` |
| `PAC-TASK-229` | `PAC-439` | Build DrugInteraction Rule management screen | `feature/PAC-439-task-229-build-druginteraction-rule-management-screen` | `story/PAC-108-us-69-tao-druginteraction-rule-cap-activeingredient` |
| `PAC-TASK-230` | `PAC-440` | Validate two active ingredients in interaction rule | `feature/PAC-440-task-230-validate-two-active-ingredients-in-interaction-rule` | `story/PAC-108-us-69-tao-druginteraction-rule-cap-activeingredient` |

### PAC-TASK-227 — Create drug_interaction_rules Prisma model

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-437` |
| Linked Story | `US-69` |
| Jira Parent Epic | `PAC-EPIC-09` |
| Component | InteractionAlert |
| Priority | Highest |
| Exact Task branch đã tồn tại | `feature/PAC-437-task-227-create-drug-interaction-rules-prisma-model` |
| PR target bắt buộc | `story/PAC-108-us-69-tao-druginteraction-rule-cap-activeingredient` |

**Mục đích:** Nhóm cần tạo model rule tương tác thuốc ở cấp ActiveIngredient.

#### Nội dung công việc

- Tạo model `DrugInteractionRule`.
- Liên kết hai ActiveIngredient.
- Lưu severity, description, recommendation.
- Lưu isActive và timestamps.
- Chuẩn bị sourceVersion nếu cần Graph Sync.

#### Kết quả cần đạt

- Rule tương tác dùng ActiveIngredient–ActiveIngredient.
- Không dùng Medicine–Medicine làm rule chính thức.
- Rule có thể quản lý bởi Admin.
- Dữ liệu đủ để tạo InteractionAlert.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-437`.
- Commit format: `PAC-437 TASK-227: <short English message>`.
- Push đúng `feature/PAC-437-task-227-create-drug-interaction-rules-prisma-model`.
- PR và merge vào `story/PAC-108-us-69-tao-druginteraction-rule-cap-activeingredient`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---

### PAC-TASK-228 — Implement create ActiveIngredient-level interaction rule API

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-438` |
| Linked Story | `US-69` |
| Jira Parent Epic | `PAC-EPIC-09` |
| Component | InteractionAlert |
| Priority | Highest |
| Exact Task branch đã tồn tại | `feature/PAC-438-task-228-implement-create-activeingredient-level-interaction` |
| PR target bắt buộc | `story/PAC-108-us-69-tao-druginteraction-rule-cap-activeingredient` |

**Mục đích:** Nhóm cần tạo API để Admin tạo rule tương tác.

#### Nội dung công việc

- Tạo endpoint create interaction rule.
- Validate hai active ingredients.
- Validate severity.
- Validate description/recommendation.
- Ghi rule vào PostgreSQL.

#### Kết quả cần đạt

- Admin tạo được rule interaction.
- Rule dựa trên hoạt chất.
- API reject dữ liệu không hợp lệ.
- POS có rule để check alert.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-438`.
- Commit format: `PAC-438 TASK-228: <short English message>`.
- Push đúng `feature/PAC-438-task-228-implement-create-activeingredient-level-interaction`.
- PR và merge vào `story/PAC-108-us-69-tao-druginteraction-rule-cap-activeingredient`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---

### PAC-TASK-229 — Build DrugInteraction Rule management screen

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-439` |
| Linked Story | `US-69` |
| Jira Parent Epic | `PAC-EPIC-09` |
| Component | InteractionAlert |
| Priority | High |
| Exact Task branch đã tồn tại | `feature/PAC-439-task-229-build-druginteraction-rule-management-screen` |
| PR target bắt buộc | `story/PAC-108-us-69-tao-druginteraction-rule-cap-activeingredient` |

**Mục đích:** Nhóm cần xây dựng màn hình Admin quản lý rule tương tác.

#### Nội dung công việc

- Hiển thị danh sách rule.
- Form tạo/cập nhật rule.
- Chọn ActiveIngredient A và B.
- Chọn severity LOW/MEDIUM/HIGH.
- Nhập description và recommendation.

#### Kết quả cần đạt

- Admin quản lý rule từ UI.
- Rule rõ ràng theo hoạt chất.
- UI hỗ trợ demo phần an toàn thuốc.
- Không cho Warehouse truy cập.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-439`.
- Commit format: `PAC-439 TASK-229: <short English message>`.
- Push đúng `feature/PAC-439-task-229-build-druginteraction-rule-management-screen`.
- PR và merge vào `story/PAC-108-us-69-tao-druginteraction-rule-cap-activeingredient`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---

### PAC-TASK-230 — Validate two active ingredients in interaction rule

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-440` |
| Linked Story | `US-69` |
| Jira Parent Epic | `PAC-EPIC-09` |
| Component | InteractionAlert |
| Priority | High |
| Exact Task branch đã tồn tại | `feature/PAC-440-task-230-validate-two-active-ingredients-in-interaction-rule` |
| PR target bắt buộc | `story/PAC-108-us-69-tao-druginteraction-rule-cap-activeingredient` |

**Mục đích:** Nhóm cần validate hai hoạt chất trong rule tương tác.

#### Nội dung công việc

- Ingredient A và B bắt buộc.
- Hai ingredient phải tồn tại.
- Không cho cùng một ingredient tương tác với chính nó nếu không có rule đặc biệt.
- Kiểm tra active status.
- Trả lỗi rõ ràng.

#### Kết quả cần đạt

- Rule không có dữ liệu rác.
- Interaction check chính xác.
- UI/API đồng bộ validation.
- Graph Sync rule đáng tin.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-440`.
- Commit format: `PAC-440 TASK-230: <short English message>`.
- Push đúng `feature/PAC-440-task-230-validate-two-active-ingredients-in-interaction-rule`.
- PR và merge vào `story/PAC-108-us-69-tao-druginteraction-rule-cap-activeingredient`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---


## User Story Completion Gate

- Jira MCP: Story chuyển `TO DO → IN PROGRESS` khi bắt đầu Task đầu tiên.
- Jira MCP: chỉ chuyển Story `IN PROGRESS → IN REVIEW` sau khi toàn bộ Task đã `DONE` và Story PR đã mở.
- Nếu review fail hoặc có Bug chặn: Story `IN REVIEW → IN PROGRESS`.
- Chỉ chuyển Story `IN REVIEW → DONE` sau khi Story PR merge vào Epic và không còn Bug chặn.
- Supabase MCP: chạy Story-level data integration verification nếu Story tác động dữ liệu.
- GitHub MCP: xác minh mọi Task PR đã merge vào Story và Story PR đúng Epic.

- [ ] Tất cả Task đạt Definition of Done.
- [ ] Tất cả Task PR merge vào exact Story branch.
- [ ] Dùng skills phù hợp review integration cấp Story.
- [ ] Acceptance Criteria được xác minh bằng test thực tế.
- [ ] Nếu có lỗi, sửa trực tiếp trên Story branch, không tạo fix branch.
- [ ] Commit fix cấp Story dùng Jira Key `PAC-108`.
- [ ] Commit format: `PAC-108 US-69: <short English fix message>`.
- [ ] Story PR merge vào `epic/PAC-9-epic-09-druginteraction-rule`.
- [ ] Audit/progress evidence được cập nhật.

---

# US-70 — Cập nhật/deactivate DrugInteraction Rule

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-109` |
| Parent Business Epic | `PAC-EPIC-09 — DrugInteraction Rule` |
| Component | InteractionAlert |
| Priority | High |
| Story Point | 3 |
| Labels | interaction-rule, admin, mvp |
| Số Task | 3 |
| Exact Story branch đã tồn tại | `story/PAC-109-us-70-cap-nhat-deactivate-druginteraction-rule` |
| Story PR target | `epic/PAC-9-epic-09-druginteraction-rule` |

## Mục tiêu User Story

Nhóm cần cho Admin cập nhật hoặc deactivate rule.

## Acceptance Criteria

- [ ] Admin sửa rule active.
- [ ] Deactivate rule không xóa lịch sử.
- [ ] Graph sync event được tạo khi rule đổi.
- [ ] Rule inactive không dùng trong check mới.

## Skill trọng tâm

- `karpathy-principles`
- `writing-plans`
- `ecc-backend`
- `ecc-database`
- `ecc-security`
- `tdd`
- `ecc-testing`

## Danh sách Task và branch

| Task | Jira Key | Nội dung | Exact Task branch | PR target |
|---|---|---|---|---|
| `PAC-TASK-231` | `PAC-441` | Implement update DrugInteraction Rule API | `feature/PAC-441-task-231-implement-update-druginteraction-rule-api` | `story/PAC-109-us-70-cap-nhat-deactivate-druginteraction-rule` |
| `PAC-TASK-232` | `PAC-442` | Implement deactivate DrugInteraction Rule API | `feature/PAC-442-task-232-implement-deactivate-druginteraction-rule-api` | `story/PAC-109-us-70-cap-nhat-deactivate-druginteraction-rule` |
| `PAC-TASK-233` | `PAC-443` | Trigger Graph Sync event on interaction rule change | `feature/PAC-443-task-233-trigger-graph-sync-event-on-interaction-rule-change` | `story/PAC-109-us-70-cap-nhat-deactivate-druginteraction-rule` |

### PAC-TASK-231 — Implement update DrugInteraction Rule API

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-441` |
| Linked Story | `US-70` |
| Jira Parent Epic | `PAC-EPIC-09` |
| Component | InteractionAlert |
| Priority | High |
| Exact Task branch đã tồn tại | `feature/PAC-441-task-231-implement-update-druginteraction-rule-api` |
| PR target bắt buộc | `story/PAC-109-us-70-cap-nhat-deactivate-druginteraction-rule` |

**Mục đích:** Nhóm cần tạo API cập nhật rule tương tác.

#### Nội dung công việc

- Tạo endpoint update rule.
- Kiểm tra rule tồn tại.
- Validate severity/description/recommendation.
- Cập nhật sourceUpdatedAt/sourceVersion nếu có.
- Tạo graph sync event.

#### Kết quả cần đạt

- Admin cập nhật rule được.
- POS dùng rule mới sau cập nhật.
- Graph projection được sync.
- Không mất lịch sử alert snapshot cũ.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-441`.
- Commit format: `PAC-441 TASK-231: <short English message>`.
- Push đúng `feature/PAC-441-task-231-implement-update-druginteraction-rule-api`.
- PR và merge vào `story/PAC-109-us-70-cap-nhat-deactivate-druginteraction-rule`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---

### PAC-TASK-232 — Implement deactivate DrugInteraction Rule API

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-442` |
| Linked Story | `US-70` |
| Jira Parent Epic | `PAC-EPIC-09` |
| Component | InteractionAlert |
| Priority | High |
| Exact Task branch đã tồn tại | `feature/PAC-442-task-232-implement-deactivate-druginteraction-rule-api` |
| PR target bắt buộc | `story/PAC-109-us-70-cap-nhat-deactivate-druginteraction-rule` |

**Mục đích:** Nhóm cần tạo API deactivate rule tương tác.

#### Nội dung công việc

- Tạo endpoint deactivate.
- Set isActive=false.
- Không xóa cứng rule.
- Tạo graph sync event.
- Rule inactive không dùng cho check mới.

#### Kết quả cần đạt

- Admin deactivate rule.
- Lịch sử alert cũ vẫn trace được.
- Graph giữ rule inactive nếu projection cần.
- Interaction check chỉ dùng active rule.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-442`.
- Commit format: `PAC-442 TASK-232: <short English message>`.
- Push đúng `feature/PAC-442-task-232-implement-deactivate-druginteraction-rule-api`.
- PR và merge vào `story/PAC-109-us-70-cap-nhat-deactivate-druginteraction-rule`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---

### PAC-TASK-233 — Trigger Graph Sync event on interaction rule change

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-443` |
| Linked Story | `US-70` |
| Jira Parent Epic | `PAC-EPIC-09` |
| Component | InteractionAlert |
| Priority | High |
| Exact Task branch đã tồn tại | `feature/PAC-443-task-233-trigger-graph-sync-event-on-interaction-rule-change` |
| PR target bắt buộc | `story/PAC-109-us-70-cap-nhat-deactivate-druginteraction-rule` |

**Mục đích:** Nhóm cần tạo outbox event khi rule interaction thay đổi.

#### Nội dung công việc

- Khi create/update/deactivate rule, tạo graph sync event.
- Ghi entity type InteractionRule.
- Ghi rule id, action, source version.
- Không ghi trực tiếp Neo4j từ controller.
- Đảm bảo event tạo cùng transaction nếu cần.

#### Kết quả cần đạt

- Neo4j projection cập nhật rule sau.
- Graph Sync không bỏ sót thay đổi.
- PostgreSQL vẫn là source of truth.
- Graph-RAG có context đúng.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-443`.
- Commit format: `PAC-443 TASK-233: <short English message>`.
- Push đúng `feature/PAC-443-task-233-trigger-graph-sync-event-on-interaction-rule-change`.
- PR và merge vào `story/PAC-109-us-70-cap-nhat-deactivate-druginteraction-rule`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---


## User Story Completion Gate

- Jira MCP: Story chuyển `TO DO → IN PROGRESS` khi bắt đầu Task đầu tiên.
- Jira MCP: chỉ chuyển Story `IN PROGRESS → IN REVIEW` sau khi toàn bộ Task đã `DONE` và Story PR đã mở.
- Nếu review fail hoặc có Bug chặn: Story `IN REVIEW → IN PROGRESS`.
- Chỉ chuyển Story `IN REVIEW → DONE` sau khi Story PR merge vào Epic và không còn Bug chặn.
- Supabase MCP: chạy Story-level data integration verification nếu Story tác động dữ liệu.
- GitHub MCP: xác minh mọi Task PR đã merge vào Story và Story PR đúng Epic.

- [ ] Tất cả Task đạt Definition of Done.
- [ ] Tất cả Task PR merge vào exact Story branch.
- [ ] Dùng skills phù hợp review integration cấp Story.
- [ ] Acceptance Criteria được xác minh bằng test thực tế.
- [ ] Nếu có lỗi, sửa trực tiếp trên Story branch, không tạo fix branch.
- [ ] Commit fix cấp Story dùng Jira Key `PAC-109`.
- [ ] Commit format: `PAC-109 US-70: <short English fix message>`.
- [ ] Story PR merge vào `epic/PAC-9-epic-09-druginteraction-rule`.
- [ ] Audit/progress evidence được cập nhật.

---

# US-71 — Severity chỉ gồm LOW/MEDIUM/HIGH

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-110` |
| Parent Business Epic | `PAC-EPIC-09 — DrugInteraction Rule` |
| Component | InteractionAlert |
| Priority | High |
| Story Point | 2 |
| Labels | severity, validation, mvp |
| Số Task | 1 |
| Exact Story branch đã tồn tại | `story/PAC-110-us-71-severity-chi-gom-low-medium-high` |
| Story PR target | `epic/PAC-9-epic-09-druginteraction-rule` |

## Mục tiêu User Story

Nhóm cần giới hạn severity trong MVP.

## Acceptance Criteria

- [ ] Chỉ cho LOW, MEDIUM, HIGH.
- [ ] Không dùng CRITICAL trong MVP.
- [ ] Validation backend enforce.
- [ ] UI hiển thị đúng mức độ.

## Skill trọng tâm

- `karpathy-principles`
- `ecc-backend`
- `ecc-frontend`
- `tdd`
- `ecc-testing`

## Danh sách Task và branch

| Task | Jira Key | Nội dung | Exact Task branch | PR target |
|---|---|---|---|---|
| `PAC-TASK-234` | `PAC-444` | Validate severity enum LOW/MEDIUM/HIGH only | `feature/PAC-444-task-234-validate-severity-enum-low-medium-high-only` | `story/PAC-110-us-71-severity-chi-gom-low-medium-high` |

### PAC-TASK-234 — Validate severity enum LOW/MEDIUM/HIGH only

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-444` |
| Linked Story | `US-71` |
| Jira Parent Epic | `PAC-EPIC-09` |
| Component | InteractionAlert |
| Priority | High |
| Exact Task branch đã tồn tại | `feature/PAC-444-task-234-validate-severity-enum-low-medium-high-only` |
| PR target bắt buộc | `story/PAC-110-us-71-severity-chi-gom-low-medium-high` |

**Mục đích:** Nhóm cần giới hạn severity trong MVP.

#### Nội dung công việc

- Tạo enum severity LOW, MEDIUM, HIGH.
- Backend reject severity khác.
- UI chỉ hiển thị ba lựa chọn.
- Không dùng CRITICAL trong MVP.
- Test invalid severity.

#### Kết quả cần đạt

- Severity đúng baseline.
- Không phát sinh CRITICAL scope.
- UI/API nhất quán.
- HIGH alert logic rõ ràng.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-444`.
- Commit format: `PAC-444 TASK-234: <short English message>`.
- Push đúng `feature/PAC-444-task-234-validate-severity-enum-low-medium-high-only`.
- PR và merge vào `story/PAC-110-us-71-severity-chi-gom-low-medium-high`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---


## User Story Completion Gate

- Jira MCP: Story chuyển `TO DO → IN PROGRESS` khi bắt đầu Task đầu tiên.
- Jira MCP: chỉ chuyển Story `IN PROGRESS → IN REVIEW` sau khi toàn bộ Task đã `DONE` và Story PR đã mở.
- Nếu review fail hoặc có Bug chặn: Story `IN REVIEW → IN PROGRESS`.
- Chỉ chuyển Story `IN REVIEW → DONE` sau khi Story PR merge vào Epic và không còn Bug chặn.
- Supabase MCP: chạy Story-level data integration verification nếu Story tác động dữ liệu.
- GitHub MCP: xác minh mọi Task PR đã merge vào Story và Story PR đúng Epic.

- [ ] Tất cả Task đạt Definition of Done.
- [ ] Tất cả Task PR merge vào exact Story branch.
- [ ] Dùng skills phù hợp review integration cấp Story.
- [ ] Acceptance Criteria được xác minh bằng test thực tế.
- [ ] Nếu có lỗi, sửa trực tiếp trên Story branch, không tạo fix branch.
- [ ] Commit fix cấp Story dùng Jira Key `PAC-110`.
- [ ] Commit format: `PAC-110 US-71: <short English fix message>`.
- [ ] Story PR merge vào `epic/PAC-9-epic-09-druginteraction-rule`.
- [ ] Audit/progress evidence được cập nhật.

---

# US-72 — Derive medicine interaction từ active ingredients

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-111` |
| Parent Business Epic | `PAC-EPIC-09 — DrugInteraction Rule` |
| Component | InteractionAlert |
| Priority | Highest |
| Story Point | 5 |
| Labels | derived-interaction, mvp |
| Số Task | 2 |
| Exact Story branch đã tồn tại | `story/PAC-111-us-72-derive-medicine-interaction-tu-active-ingredients` |
| Story PR target | `epic/PAC-9-epic-09-druginteraction-rule` |

## Mục tiêu User Story

Nhóm cần kiểm tra tương tác thuốc thông qua active ingredients.

## Acceptance Criteria

- [ ] Lấy active ingredients từ medicines trong order.
- [ ] So khớp với interaction rules.
- [ ] Trả về cảnh báo tương ứng.
- [ ] Không check trực tiếp bằng medicine-level rule official.

## Skill trọng tâm

- `karpathy-principles`
- `mattpocock-engineering`
- `ecc-backend`
- `ecc-database`
- `tdd`
- `ecc-testing`
- `ecc-healthcare`

## Danh sách Task và branch

| Task | Jira Key | Nội dung | Exact Task branch | PR target |
|---|---|---|---|---|
| `PAC-TASK-235` | `PAC-445` | Implement derive interaction from medicine active ingredients | `feature/PAC-445-task-235-implement-derive-interaction-from-medicine-active-i` | `story/PAC-111-us-72-derive-medicine-interaction-tu-active-ingredients` |
| `PAC-TASK-236` | `PAC-446` | Add tests for derived medicine interactions | `test/PAC-446-task-236-add-tests-for-derived-medicine-interactions` | `story/PAC-111-us-72-derive-medicine-interaction-tu-active-ingredients` |

### PAC-TASK-235 — Implement derive interaction from medicine active ingredients

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-445` |
| Linked Story | `US-72` |
| Jira Parent Epic | `PAC-EPIC-09` |
| Component | InteractionAlert |
| Priority | Highest |
| Exact Task branch đã tồn tại | `feature/PAC-445-task-235-implement-derive-interaction-from-medicine-active-i` |
| PR target bắt buộc | `story/PAC-111-us-72-derive-medicine-interaction-tu-active-ingredients` |

**Mục đích:** Nhóm cần suy ra interaction giữa thuốc dựa trên hoạt chất.

#### Nội dung công việc

- Lấy active ingredients của các medicine trong order.
- Tạo các cặp hoạt chất cần check.
- So khớp với active DrugInteractionRule.
- Trả về interaction tương ứng.
- Không dùng Medicine-level rule chính thức.

#### Kết quả cần đạt

- POS phát hiện interaction theo hoạt chất.
- Một thuốc nhiều hoạt chất vẫn check được.
- Rule chính xác hơn.
- Baseline interaction được bảo vệ.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-445`.
- Commit format: `PAC-445 TASK-235: <short English message>`.
- Push đúng `feature/PAC-445-task-235-implement-derive-interaction-from-medicine-active-i`.
- PR và merge vào `story/PAC-111-us-72-derive-medicine-interaction-tu-active-ingredients`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---

### PAC-TASK-236 — Add tests for derived medicine interactions

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-446` |
| Linked Story | `US-72` |
| Jira Parent Epic | `PAC-EPIC-19` |
| Component | Testing & Setup |
| Priority | High |
| Exact Task branch đã tồn tại | `test/PAC-446-task-236-add-tests-for-derived-medicine-interactions` |
| PR target bắt buộc | `story/PAC-111-us-72-derive-medicine-interaction-tu-active-ingredients` |

**Mục đích:** Nhóm cần viết test cho derive interaction từ hoạt chất.

#### Nội dung công việc

- Test hai thuốc có hoạt chất tương tác.
- Test thuốc không có interaction.
- Test thuốc nhiều hoạt chất.
- Test inactive rule không được dùng.
- Test rule đảo chiều nếu query symmetric.

#### Kết quả cần đạt

- Interaction check có test.
- Không quay lại Medicine–Medicine rule.
- Dữ liệu alert chính xác hơn.
- CI bảo vệ logic an toàn thuốc.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-446`.
- Commit format: `PAC-446 TASK-236: <short English message>`.
- Push đúng `test/PAC-446-task-236-add-tests-for-derived-medicine-interactions`.
- PR và merge vào `story/PAC-111-us-72-derive-medicine-interaction-tu-active-ingredients`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---


## User Story Completion Gate

- Jira MCP: Story chuyển `TO DO → IN PROGRESS` khi bắt đầu Task đầu tiên.
- Jira MCP: chỉ chuyển Story `IN PROGRESS → IN REVIEW` sau khi toàn bộ Task đã `DONE` và Story PR đã mở.
- Nếu review fail hoặc có Bug chặn: Story `IN REVIEW → IN PROGRESS`.
- Chỉ chuyển Story `IN REVIEW → DONE` sau khi Story PR merge vào Epic và không còn Bug chặn.
- Supabase MCP: chạy Story-level data integration verification nếu Story tác động dữ liệu.
- GitHub MCP: xác minh mọi Task PR đã merge vào Story và Story PR đúng Epic.

- [ ] Tất cả Task đạt Definition of Done.
- [ ] Tất cả Task PR merge vào exact Story branch.
- [ ] Dùng skills phù hợp review integration cấp Story.
- [ ] Acceptance Criteria được xác minh bằng test thực tế.
- [ ] Nếu có lỗi, sửa trực tiếp trên Story branch, không tạo fix branch.
- [ ] Commit fix cấp Story dùng Jira Key `PAC-111`.
- [ ] Commit format: `PAC-111 US-72: <short English fix message>`.
- [ ] Story PR merge vào `epic/PAC-9-epic-09-druginteraction-rule`.
- [ ] Audit/progress evidence được cập nhật.

---



# PAC-EPIC-10 — InteractionAlert Lifecycle

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-10` |
| Story range | `US-73 → US-82` |
| Số Story | 10 |
| Exact Epic branch đã tồn tại | `epic/PAC-10-epic-10-interactionalert-lifecycle` |
| Epic PR target | `develop` |

## Mục tiêu Epic

Xây dựng lifecycle cảnh báo theo Order: check interaction, persist snapshot, chống duplicate active alert, theo dõi hiển thị, xử lý HIGH, chặn checkout và cung cấp lịch sử cho Admin.

## Kết quả cần đạt

- Interaction check chạy theo Order và Medicine–ActiveIngredient mapping.
- InteractionAlert persist snapshot.
- Một active alert cho order/rule.
- Redisplay cập nhật display_count và last_displayed_at.
- HIGH cần acknowledgement và note riêng.
- Backend blocker từ chối checkout khi HIGH unresolved.
- Admin xem History; Warehouse bị chặn.

## Epic Git và MCP gate

- Jira MCP: Epic chuyển `TO DO → IN PROGRESS` khi bắt đầu Story đầu tiên.
- Jira MCP: chỉ chuyển Epic `IN PROGRESS → IN REVIEW` khi mọi Story đã `DONE` và Epic PR đã mở.
- Nếu review fail hoặc có Bug chặn: Epic `IN REVIEW → IN PROGRESS`.
- Chỉ chuyển Epic `IN REVIEW → DONE` sau khi PR merge vào `develop`.
- GitHub MCP: xác minh Story PRs, Epic PR, checks và merge SHA.
- Supabase MCP: chạy Epic-level schema/data/transaction regression verification.

- Không tạo Epic branch mới.
- Sau khi mọi Story merge xong, chạy Epic-level review.
- Nếu có lỗi, commit trực tiếp trên Epic branch bằng Jira Key `PAC-10`.
- Commit format: `PAC-10 EPIC-10: <short English fix message>`.
- PR và merge Epic vào `develop`.
- Không merge trực tiếp vào `main`.

---

# US-73 — Check interaction khi order có từ hai thuốc

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-112` |
| Parent Business Epic | `PAC-EPIC-10 — InteractionAlert Lifecycle` |
| Component | InteractionAlert |
| Priority | Highest |
| Story Point | 5 |
| Labels | order-interaction, mvp |
| Số Task | 2 |
| Exact Story branch đã tồn tại | `story/PAC-112-us-73-check-interaction-khi-order-co-tu-hai-thuoc` |
| Story PR target | `epic/PAC-10-epic-10-interactionalert-lifecycle` |

## Mục tiêu User Story

Nhóm cần kiểm tra interaction khi đơn có từ hai thuốc trở lên.

## Acceptance Criteria

- [ ] Order có dưới 2 thuốc thì không cần check cặp.
- [ ] Order có từ 2 thuốc thì kiểm tra các cặp hoạt chất.
- [ ] Kết quả dùng để hiển thị alert.
- [ ] Có test cho nhiều thuốc/nhiều hoạt chất.

## Skill trọng tâm

- `karpathy-principles`
- `mattpocock-engineering`
- `ecc-backend`
- `ecc-security`
- `tdd`
- `ecc-testing`
- `ecc-healthcare`

## Danh sách Task và branch

| Task | Jira Key | Nội dung | Exact Task branch | PR target |
|---|---|---|---|---|
| `PAC-TASK-237` | `PAC-447` | Implement order interaction check service | `feature/PAC-447-task-237-implement-order-interaction-check-service` | `story/PAC-112-us-73-check-interaction-khi-order-co-tu-hai-thuoc` |
| `PAC-TASK-238` | `PAC-448` | Implement POST /orders/{id}/interactions/check API | `feature/PAC-448-task-238-implement-post-orders-id-interactions-check-api` | `story/PAC-112-us-73-check-interaction-khi-order-co-tu-hai-thuoc` |

### PAC-TASK-237 — Implement order interaction check service

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-447` |
| Linked Story | `US-73` |
| Jira Parent Epic | `PAC-EPIC-10` |
| Component | InteractionAlert |
| Priority | Highest |
| Exact Task branch đã tồn tại | `feature/PAC-447-task-237-implement-order-interaction-check-service` |
| PR target bắt buộc | `story/PAC-112-us-73-check-interaction-khi-order-co-tu-hai-thuoc` |

**Mục đích:** Nhóm cần triển khai service check interaction cho order.

#### Nội dung công việc

- Nhận order id.
- Lấy order items.
- Lấy medicines và active ingredients.
- Derive interactions.
- Trả danh sách alert candidates.

#### Kết quả cần đạt

- Order có thể check interaction.
- POS dùng service để hiển thị alert.
- Checkout biết HIGH alert unresolved.
- Logic tập trung trong backend service.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-447`.
- Commit format: `PAC-447 TASK-237: <short English message>`.
- Push đúng `feature/PAC-447-task-237-implement-order-interaction-check-service`.
- PR và merge vào `story/PAC-112-us-73-check-interaction-khi-order-co-tu-hai-thuoc`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---

### PAC-TASK-238 — Implement POST /orders/{id}/interactions/check API

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-448` |
| Linked Story | `US-73` |
| Jira Parent Epic | `PAC-EPIC-10` |
| Component | InteractionAlert |
| Priority | Highest |
| Exact Task branch đã tồn tại | `feature/PAC-448-task-238-implement-post-orders-id-interactions-check-api` |
| PR target bắt buộc | `story/PAC-112-us-73-check-interaction-khi-order-co-tu-hai-thuoc` |

**Mục đích:** Nhóm cần tạo API check interaction cho order.

#### Nội dung công việc

- Tạo endpoint order-based interaction check.
- Kiểm tra order tồn tại và scope.
- Gọi order interaction check service.
- Persist InteractionAlert khi hiển thị.
- Trả alerts cho POS UI.

#### Kết quả cần đạt

- POS gọi được API check interaction.
- Alert được persist.
- API gắn với order cụ thể.
- Không dùng standalone check để tạo order history.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-448`.
- Commit format: `PAC-448 TASK-238: <short English message>`.
- Push đúng `feature/PAC-448-task-238-implement-post-orders-id-interactions-check-api`.
- PR và merge vào `story/PAC-112-us-73-check-interaction-khi-order-co-tu-hai-thuoc`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---


## User Story Completion Gate

- Jira MCP: Story chuyển `TO DO → IN PROGRESS` khi bắt đầu Task đầu tiên.
- Jira MCP: chỉ chuyển Story `IN PROGRESS → IN REVIEW` sau khi toàn bộ Task đã `DONE` và Story PR đã mở.
- Nếu review fail hoặc có Bug chặn: Story `IN REVIEW → IN PROGRESS`.
- Chỉ chuyển Story `IN REVIEW → DONE` sau khi Story PR merge vào Epic và không còn Bug chặn.
- Supabase MCP: chạy Story-level data integration verification nếu Story tác động dữ liệu.
- GitHub MCP: xác minh mọi Task PR đã merge vào Story và Story PR đúng Epic.

- [ ] Tất cả Task đạt Definition of Done.
- [ ] Tất cả Task PR merge vào exact Story branch.
- [ ] Dùng skills phù hợp review integration cấp Story.
- [ ] Acceptance Criteria được xác minh bằng test thực tế.
- [ ] Nếu có lỗi, sửa trực tiếp trên Story branch, không tạo fix branch.
- [ ] Commit fix cấp Story dùng Jira Key `PAC-112`.
- [ ] Commit format: `PAC-112 US-73: <short English fix message>`.
- [ ] Story PR merge vào `epic/PAC-10-epic-10-interactionalert-lifecycle`.
- [ ] Audit/progress evidence được cập nhật.

---

# US-74 — Persist InteractionAlert đã hiển thị

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-113` |
| Parent Business Epic | `PAC-EPIC-10 — InteractionAlert Lifecycle` |
| Component | InteractionAlert |
| Priority | Highest |
| Story Point | 5 |
| Labels | interaction-alert, persist, mvp |
| Số Task | 4 |
| Exact Story branch đã tồn tại | `story/PAC-113-us-74-persist-interactionalert-da-hien-thi` |
| Story PR target | `epic/PAC-10-epic-10-interactionalert-lifecycle` |

## Mục tiêu User Story

Nhóm cần lưu lại mọi alert đã hiển thị cho nhân viên.

## Acceptance Criteria

- [ ] Alert hiển thị phải được lưu.
- [ ] Lưu order_id, interaction rule, severity snapshot.
- [ ] Dữ liệu dùng cho history/audit.
- [ ] Không chỉ hiển thị tạm trên UI.

## Skill trọng tâm

- `karpathy-principles`
- `ecc-database`
- `ecc-backend`
- `ecc-security`
- `tdd`
- `ecc-testing`
- `ecc-healthcare`

## Danh sách Task và branch

| Task | Jira Key | Nội dung | Exact Task branch | PR target |
|---|---|---|---|---|
| `PAC-TASK-239` | `PAC-449` | Create interaction_alerts Prisma model | `feature/PAC-449-task-239-create-interaction-alerts-prisma-model` | `story/PAC-113-us-74-persist-interactionalert-da-hien-thi` |
| `PAC-TASK-240` | `PAC-450` | Persist displayed InteractionAlert snapshot fields | `feature/PAC-450-task-240-persist-displayed-interactionalert-snapshot-fields` | `story/PAC-113-us-74-persist-interactionalert-da-hien-thi` |
| `PAC-TASK-255` | `PAC-465` | Add InteractionAlert lifecycle integration tests | `test/PAC-465-task-255-add-interactionalert-lifecycle-integration-tests` | `story/PAC-113-us-74-persist-interactionalert-da-hien-thi` |
| `PAC-TASK-258` | `PAC-468` | Add InteractionAlert snapshot and traceability notes | `feature/PAC-468-task-258-add-interactionalert-snapshot-and-traceability-note` | `story/PAC-113-us-74-persist-interactionalert-da-hien-thi` |

### PAC-TASK-239 — Create interaction_alerts Prisma model

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-449` |
| Linked Story | `US-74` |
| Jira Parent Epic | `PAC-EPIC-10` |
| Component | InteractionAlert |
| Priority | Highest |
| Exact Task branch đã tồn tại | `feature/PAC-449-task-239-create-interaction-alerts-prisma-model` |
| PR target bắt buộc | `story/PAC-113-us-74-persist-interactionalert-da-hien-thi` |

**Mục đích:** Nhóm cần tạo model InteractionAlert.

#### Nội dung công việc

- Tạo model `InteractionAlert`.
- Liên kết với order và interaction rule.
- Lưu severity snapshot.
- Lưu acknowledged_by/at, consultation note.
- Lưu display_count, last_displayed_at.

#### Kết quả cần đạt

- Alert đã hiển thị được lưu.
- HIGH alert có dữ liệu xử lý.
- Admin xem history được.
- Checkout có thể kiểm tra unresolved HIGH.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-449`.
- Commit format: `PAC-449 TASK-239: <short English message>`.
- Push đúng `feature/PAC-449-task-239-create-interaction-alerts-prisma-model`.
- PR và merge vào `story/PAC-113-us-74-persist-interactionalert-da-hien-thi`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---

### PAC-TASK-240 — Persist displayed InteractionAlert snapshot fields

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-450` |
| Linked Story | `US-74` |
| Jira Parent Epic | `PAC-EPIC-10` |
| Component | InteractionAlert |
| Priority | Highest |
| Exact Task branch đã tồn tại | `feature/PAC-450-task-240-persist-displayed-interactionalert-snapshot-fields` |
| PR target bắt buộc | `story/PAC-113-us-74-persist-interactionalert-da-hien-thi` |

**Mục đích:** Nhóm cần lưu snapshot khi alert được hiển thị.

#### Nội dung công việc

- Lưu severity tại thời điểm alert.
- Lưu description/recommendation snapshot nếu cần.
- Lưu order id và rule id.
- Không chỉ hiển thị tạm trên UI.
- Ghi displayed timestamp.

#### Kết quả cần đạt

- Alert history không mất thông tin khi rule đổi.
- Admin review được dữ liệu đã hiển thị.
- Checkout blocker có dữ liệu.
- Audit an toàn thuốc rõ ràng.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-450`.
- Commit format: `PAC-450 TASK-240: <short English message>`.
- Push đúng `feature/PAC-450-task-240-persist-displayed-interactionalert-snapshot-fields`.
- PR và merge vào `story/PAC-113-us-74-persist-interactionalert-da-hien-thi`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---

### PAC-TASK-255 — Add InteractionAlert lifecycle integration tests

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-465` |
| Linked Story | `US-74` |
| Jira Parent Epic | `PAC-EPIC-19` |
| Component | Testing & Setup |
| Priority | Highest |
| Exact Task branch đã tồn tại | `test/PAC-465-task-255-add-interactionalert-lifecycle-integration-tests` |
| PR target bắt buộc | `story/PAC-113-us-74-persist-interactionalert-da-hien-thi` |

**Mục đích:** Nhóm cần viết integration test cho lifecycle InteractionAlert.

#### Nội dung công việc

- Test check interaction tạo alert.
- Test alert hiển thị lại tăng display_count.
- Test không tạo duplicate active alert.
- Test snapshot fields.
- Test Admin history.

#### Kết quả cần đạt

- InteractionAlert lifecycle đáng tin.
- Dữ liệu không trùng.
- History hoạt động.
- Checkout blocker có dữ liệu đúng.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-465`.
- Commit format: `PAC-465 TASK-255: <short English message>`.
- Push đúng `test/PAC-465-task-255-add-interactionalert-lifecycle-integration-tests`.
- PR và merge vào `story/PAC-113-us-74-persist-interactionalert-da-hien-thi`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---

### PAC-TASK-258 — Add InteractionAlert snapshot and traceability notes

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-468` |
| Linked Story | `US-74` |
| Jira Parent Epic | `PAC-EPIC-21` |
| Component | Documentation |
| Priority | Low |
| Exact Task branch đã tồn tại | `feature/PAC-468-task-258-add-interactionalert-snapshot-and-traceability-note` |
| PR target bắt buộc | `story/PAC-113-us-74-persist-interactionalert-da-hien-thi` |

**Mục đích:** Nhóm cần ghi chú traceability cho InteractionAlert.

#### Nội dung công việc

- Ghi rõ alert phải persist.
- Ghi rõ HIGH cần acknowledgement và note.
- Ghi rõ snapshot fields.
- Ghi mapping Story/Test.
- Ghi guardrail Warehouse no-access.

#### Kết quả cần đạt

- Tài liệu rõ baseline.
- AI agent không code alert tạm.
- Tester biết case cần kiểm tra.
- Traceability đầy đủ hơn.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-468`.
- Commit format: `PAC-468 TASK-258: <short English message>`.
- Push đúng `feature/PAC-468-task-258-add-interactionalert-snapshot-and-traceability-note`.
- PR và merge vào `story/PAC-113-us-74-persist-interactionalert-da-hien-thi`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---


## User Story Completion Gate

- Jira MCP: Story chuyển `TO DO → IN PROGRESS` khi bắt đầu Task đầu tiên.
- Jira MCP: chỉ chuyển Story `IN PROGRESS → IN REVIEW` sau khi toàn bộ Task đã `DONE` và Story PR đã mở.
- Nếu review fail hoặc có Bug chặn: Story `IN REVIEW → IN PROGRESS`.
- Chỉ chuyển Story `IN REVIEW → DONE` sau khi Story PR merge vào Epic và không còn Bug chặn.
- Supabase MCP: chạy Story-level data integration verification nếu Story tác động dữ liệu.
- GitHub MCP: xác minh mọi Task PR đã merge vào Story và Story PR đúng Epic.

- [ ] Tất cả Task đạt Definition of Done.
- [ ] Tất cả Task PR merge vào exact Story branch.
- [ ] Dùng skills phù hợp review integration cấp Story.
- [ ] Acceptance Criteria được xác minh bằng test thực tế.
- [ ] Nếu có lỗi, sửa trực tiếp trên Story branch, không tạo fix branch.
- [ ] Commit fix cấp Story dùng Jira Key `PAC-113`.
- [ ] Commit format: `PAC-113 US-74: <short English fix message>`.
- [ ] Story PR merge vào `epic/PAC-10-epic-10-interactionalert-lifecycle`.
- [ ] Audit/progress evidence được cập nhật.

---

# US-75 — Một active alert cho order_id + interaction_id

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-114` |
| Parent Business Epic | `PAC-EPIC-10 — InteractionAlert Lifecycle` |
| Component | InteractionAlert |
| Priority | Highest |
| Story Point | 5 |
| Labels | alert-unique, mvp |
| Số Task | 1 |
| Exact Story branch đã tồn tại | `story/PAC-114-us-75-mot-active-alert-cho-order-id-interaction-id` |
| Story PR target | `epic/PAC-10-epic-10-interactionalert-lifecycle` |

## Mục tiêu User Story

Nhóm cần tránh tạo nhiều alert active trùng nhau.

## Acceptance Criteria

- [ ] Mỗi order_id + interaction_id có một active alert.
- [ ] Nếu hiển thị lại thì update display_count.
- [ ] Không tạo duplicate active alert.
- [ ] Constraint/service logic bảo vệ rule này.

## Skill trọng tâm

- `karpathy-principles`
- `ecc-database`
- `ecc-backend`
- `mattpocock-engineering`
- `tdd`
- `ecc-testing`

## Danh sách Task và branch

| Task | Jira Key | Nội dung | Exact Task branch | PR target |
|---|---|---|---|---|
| `PAC-TASK-241` | `PAC-451` | Enforce one active alert per order and interaction rule | `feature/PAC-451-task-241-enforce-one-active-alert-per-order-and-interaction-` | `story/PAC-114-us-75-mot-active-alert-cho-order-id-interaction-id` |

### PAC-TASK-241 — Enforce one active alert per order and interaction rule

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-451` |
| Linked Story | `US-75` |
| Jira Parent Epic | `PAC-EPIC-10` |
| Component | InteractionAlert |
| Priority | Highest |
| Exact Task branch đã tồn tại | `feature/PAC-451-task-241-enforce-one-active-alert-per-order-and-interaction-` |
| PR target bắt buộc | `story/PAC-114-us-75-mot-active-alert-cho-order-id-interaction-id` |

**Mục đích:** Nhóm cần tránh duplicate active alert.

#### Nội dung công việc

- Thêm unique logic cho order_id + interaction_rule_id active.
- Nếu alert đã tồn tại, update display_count.
- Không tạo nhiều alert active trùng.
- Xử lý concurrency cơ bản.
- Viết test duplicate.

#### Kết quả cần đạt

- Mỗi order/rule chỉ có một active alert.
- display_count phản ánh số lần hiển thị.
- Dữ liệu history sạch.
- Không làm Staff xử lý alert trùng.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-451`.
- Commit format: `PAC-451 TASK-241: <short English message>`.
- Push đúng `feature/PAC-451-task-241-enforce-one-active-alert-per-order-and-interaction-`.
- PR và merge vào `story/PAC-114-us-75-mot-active-alert-cho-order-id-interaction-id`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---


## User Story Completion Gate

- Jira MCP: Story chuyển `TO DO → IN PROGRESS` khi bắt đầu Task đầu tiên.
- Jira MCP: chỉ chuyển Story `IN PROGRESS → IN REVIEW` sau khi toàn bộ Task đã `DONE` và Story PR đã mở.
- Nếu review fail hoặc có Bug chặn: Story `IN REVIEW → IN PROGRESS`.
- Chỉ chuyển Story `IN REVIEW → DONE` sau khi Story PR merge vào Epic và không còn Bug chặn.
- Supabase MCP: chạy Story-level data integration verification nếu Story tác động dữ liệu.
- GitHub MCP: xác minh mọi Task PR đã merge vào Story và Story PR đúng Epic.

- [ ] Tất cả Task đạt Definition of Done.
- [ ] Tất cả Task PR merge vào exact Story branch.
- [ ] Dùng skills phù hợp review integration cấp Story.
- [ ] Acceptance Criteria được xác minh bằng test thực tế.
- [ ] Nếu có lỗi, sửa trực tiếp trên Story branch, không tạo fix branch.
- [ ] Commit fix cấp Story dùng Jira Key `PAC-114`.
- [ ] Commit format: `PAC-114 US-75: <short English fix message>`.
- [ ] Story PR merge vào `epic/PAC-10-epic-10-interactionalert-lifecycle`.
- [ ] Audit/progress evidence được cập nhật.

---

# US-76 — Update last_displayed_at và display_count

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-115` |
| Parent Business Epic | `PAC-EPIC-10 — InteractionAlert Lifecycle` |
| Component | InteractionAlert |
| Priority | High |
| Story Point | 3 |
| Labels | display-count, alert, mvp |
| Số Task | 1 |
| Exact Story branch đã tồn tại | `story/PAC-115-us-76-update-last-displayed-at-va-display-count` |
| Story PR target | `epic/PAC-10-epic-10-interactionalert-lifecycle` |

## Mục tiêu User Story

Nhóm cần theo dõi số lần alert được hiển thị.

## Acceptance Criteria

- [ ] Mỗi lần alert hiển thị lại tăng display_count.
- [ ] Cập nhật last_displayed_at.
- [ ] Không mất acknowledged data cũ.
- [ ] Hiển thị history chính xác.

## Skill trọng tâm

- `karpathy-principles`
- `ecc-backend`
- `ecc-database`
- `tdd`
- `ecc-testing`

## Danh sách Task và branch

| Task | Jira Key | Nội dung | Exact Task branch | PR target |
|---|---|---|---|---|
| `PAC-TASK-242` | `PAC-452` | Update display_count and last_displayed_at | `feature/PAC-452-task-242-update-display-count-and-last-displayed-at` | `story/PAC-115-us-76-update-last-displayed-at-va-display-count` |

### PAC-TASK-242 — Update display_count and last_displayed_at

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-452` |
| Linked Story | `US-76` |
| Jira Parent Epic | `PAC-EPIC-10` |
| Component | InteractionAlert |
| Priority | High |
| Exact Task branch đã tồn tại | `feature/PAC-452-task-242-update-display-count-and-last-displayed-at` |
| PR target bắt buộc | `story/PAC-115-us-76-update-last-displayed-at-va-display-count` |

**Mục đích:** Nhóm cần cập nhật số lần và thời điểm alert được hiển thị.

#### Nội dung công việc

- Khi alert hiển thị lại, tăng display_count.
- Cập nhật last_displayed_at.
- Không reset acknowledged data.
- Không tạo duplicate active alert.
- Trả dữ liệu mới cho UI.

#### Kết quả cần đạt

- Alert tracking đúng.
- Admin thấy lịch sử hiển thị.
- Dữ liệu không trùng.
- POS hiển thị ổn định.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-452`.
- Commit format: `PAC-452 TASK-242: <short English message>`.
- Push đúng `feature/PAC-452-task-242-update-display-count-and-last-displayed-at`.
- PR và merge vào `story/PAC-115-us-76-update-last-displayed-at-va-display-count`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---


## User Story Completion Gate

- Jira MCP: Story chuyển `TO DO → IN PROGRESS` khi bắt đầu Task đầu tiên.
- Jira MCP: chỉ chuyển Story `IN PROGRESS → IN REVIEW` sau khi toàn bộ Task đã `DONE` và Story PR đã mở.
- Nếu review fail hoặc có Bug chặn: Story `IN REVIEW → IN PROGRESS`.
- Chỉ chuyển Story `IN REVIEW → DONE` sau khi Story PR merge vào Epic và không còn Bug chặn.
- Supabase MCP: chạy Story-level data integration verification nếu Story tác động dữ liệu.
- GitHub MCP: xác minh mọi Task PR đã merge vào Story và Story PR đúng Epic.

- [ ] Tất cả Task đạt Definition of Done.
- [ ] Tất cả Task PR merge vào exact Story branch.
- [ ] Dùng skills phù hợp review integration cấp Story.
- [ ] Acceptance Criteria được xác minh bằng test thực tế.
- [ ] Nếu có lỗi, sửa trực tiếp trên Story branch, không tạo fix branch.
- [ ] Commit fix cấp Story dùng Jira Key `PAC-115`.
- [ ] Commit format: `PAC-115 US-76: <short English fix message>`.
- [ ] Story PR merge vào `epic/PAC-10-epic-10-interactionalert-lifecycle`.
- [ ] Audit/progress evidence được cập nhật.

---

# US-77 — Hiển thị alert LOW/MEDIUM/HIGH trong POS

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-116` |
| Parent Business Epic | `PAC-EPIC-10 — InteractionAlert Lifecycle` |
| Component | InteractionAlert |
| Priority | High |
| Story Point | 3 |
| Labels | alert-ui, pos, mvp |
| Số Task | 2 |
| Exact Story branch đã tồn tại | `story/PAC-116-us-77-hien-thi-alert-low-medium-high-trong-pos` |
| Story PR target | `epic/PAC-10-epic-10-interactionalert-lifecycle` |

## Mục tiêu User Story

Nhóm cần hiển thị cảnh báo tương tác trong POS.

## Acceptance Criteria

- [ ] Alert hiển thị severity rõ ràng.
- [ ] Có mô tả và recommendation.
- [ ] HIGH nổi bật hơn LOW/MEDIUM.
- [ ] Có disclaimer cảnh báo chỉ hỗ trợ tham khảo.

## Skill trọng tâm

- `modern-web-guidance`
- `ecc-frontend`
- `design-system-guide`
- `ecc-backend`
- `ecc-healthcare`
- `ecc-testing`

## Danh sách Task và branch

| Task | Jira Key | Nội dung | Exact Task branch | PR target |
|---|---|---|---|---|
| `PAC-TASK-243` | `PAC-453` | Build POS InteractionAlert panel | `feature/PAC-453-task-243-build-pos-interactionalert-panel` | `story/PAC-116-us-77-hien-thi-alert-low-medium-high-trong-pos` |
| `PAC-TASK-244` | `PAC-454` | Implement LOW/MEDIUM/HIGH alert display logic | `feature/PAC-454-task-244-implement-low-medium-high-alert-display-logic` | `story/PAC-116-us-77-hien-thi-alert-low-medium-high-trong-pos` |

### PAC-TASK-243 — Build POS InteractionAlert panel

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-453` |
| Linked Story | `US-77` |
| Jira Parent Epic | `PAC-EPIC-10` |
| Component | InteractionAlert |
| Priority | High |
| Exact Task branch đã tồn tại | `feature/PAC-453-task-243-build-pos-interactionalert-panel` |
| PR target bắt buộc | `story/PAC-116-us-77-hien-thi-alert-low-medium-high-trong-pos` |

**Mục đích:** Nhóm cần xây dựng panel hiển thị InteractionAlert trong POS.

#### Nội dung công việc

- Hiển thị danh sách alerts.
- Hiển thị severity.
- Hiển thị description/recommendation.
- Cho Staff xử lý HIGH alert.
- Có empty/loading/error state.

#### Kết quả cần đạt

- Staff thấy cảnh báo tương tác rõ ràng.
- LOW/MEDIUM/HIGH phân biệt được.
- HIGH alert có action xử lý.
- POS an toàn hơn.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-453`.
- Commit format: `PAC-453 TASK-243: <short English message>`.
- Push đúng `feature/PAC-453-task-243-build-pos-interactionalert-panel`.
- PR và merge vào `story/PAC-116-us-77-hien-thi-alert-low-medium-high-trong-pos`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---

### PAC-TASK-244 — Implement LOW/MEDIUM/HIGH alert display logic

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-454` |
| Linked Story | `US-77` |
| Jira Parent Epic | `PAC-EPIC-10` |
| Component | InteractionAlert |
| Priority | High |
| Exact Task branch đã tồn tại | `feature/PAC-454-task-244-implement-low-medium-high-alert-display-logic` |
| PR target bắt buộc | `story/PAC-116-us-77-hien-thi-alert-low-medium-high-trong-pos` |

**Mục đích:** Nhóm cần hiển thị alert theo severity.

#### Nội dung công việc

- LOW hiển thị mức nhẹ.
- MEDIUM hiển thị mức cảnh báo.
- HIGH hiển thị nổi bật và yêu cầu action.
- Không dùng CRITICAL.
- UI có thông tin hướng dẫn phù hợp.

#### Kết quả cần đạt

- Staff nhận biết mức độ nguy cơ.
- HIGH không bị bỏ qua.
- UI đúng enum MVP.
- Trải nghiệm cảnh báo rõ ràng.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-454`.
- Commit format: `PAC-454 TASK-244: <short English message>`.
- Push đúng `feature/PAC-454-task-244-implement-low-medium-high-alert-display-logic`.
- PR và merge vào `story/PAC-116-us-77-hien-thi-alert-low-medium-high-trong-pos`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---


## User Story Completion Gate

- Jira MCP: Story chuyển `TO DO → IN PROGRESS` khi bắt đầu Task đầu tiên.
- Jira MCP: chỉ chuyển Story `IN PROGRESS → IN REVIEW` sau khi toàn bộ Task đã `DONE` và Story PR đã mở.
- Nếu review fail hoặc có Bug chặn: Story `IN REVIEW → IN PROGRESS`.
- Chỉ chuyển Story `IN REVIEW → DONE` sau khi Story PR merge vào Epic và không còn Bug chặn.
- Supabase MCP: chạy Story-level data integration verification nếu Story tác động dữ liệu.
- GitHub MCP: xác minh mọi Task PR đã merge vào Story và Story PR đúng Epic.

- [ ] Tất cả Task đạt Definition of Done.
- [ ] Tất cả Task PR merge vào exact Story branch.
- [ ] Dùng skills phù hợp review integration cấp Story.
- [ ] Acceptance Criteria được xác minh bằng test thực tế.
- [ ] Nếu có lỗi, sửa trực tiếp trên Story branch, không tạo fix branch.
- [ ] Commit fix cấp Story dùng Jira Key `PAC-116`.
- [ ] Commit format: `PAC-116 US-77: <short English fix message>`.
- [ ] Story PR merge vào `epic/PAC-10-epic-10-interactionalert-lifecycle`.
- [ ] Audit/progress evidence được cập nhật.

---

# US-78 — HIGH alert acknowledgement

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-117` |
| Parent Business Epic | `PAC-EPIC-10 — InteractionAlert Lifecycle` |
| Component | InteractionAlert |
| Priority | Highest |
| Story Point | 5 |
| Labels | high-alert, acknowledgement, mvp |
| Số Task | 3 |
| Exact Story branch đã tồn tại | `story/PAC-117-us-78-high-alert-acknowledgement` |
| Story PR target | `epic/PAC-10-epic-10-interactionalert-lifecycle` |

## Mục tiêu User Story

Nhóm cần yêu cầu nhân viên acknowledge HIGH alert.

## Acceptance Criteria

- [ ] HIGH alert có action acknowledge.
- [ ] Lưu acknowledged_by và acknowledged_at.
- [ ] Không checkout nếu HIGH chưa acknowledge.
- [ ] LOW/MEDIUM không cần bắt buộc acknowledge theo rule này.

## Skill trọng tâm

- `karpathy-principles`
- `ecc-backend`
- `ecc-security`
- `ecc-frontend`
- `tdd`
- `ecc-testing`
- `ecc-healthcare`

## Danh sách Task và branch

| Task | Jira Key | Nội dung | Exact Task branch | PR target |
|---|---|---|---|---|
| `PAC-TASK-245` | `PAC-455` | Build HIGH alert acknowledgement UI | `feature/PAC-455-task-245-build-high-alert-acknowledgement-ui` | `story/PAC-117-us-78-high-alert-acknowledgement` |
| `PAC-TASK-246` | `PAC-456` | Implement acknowledge InteractionAlert API | `feature/PAC-456-task-246-implement-acknowledge-interactionalert-api` | `story/PAC-117-us-78-high-alert-acknowledgement` |
| `PAC-TASK-256` | `PAC-466` | Add HIGH acknowledgement and consultation note tests | `test/PAC-466-task-256-add-high-acknowledgement-and-consultation-note-test` | `story/PAC-117-us-78-high-alert-acknowledgement` |

### PAC-TASK-245 — Build HIGH alert acknowledgement UI

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-455` |
| Linked Story | `US-78` |
| Jira Parent Epic | `PAC-EPIC-10` |
| Component | InteractionAlert |
| Priority | Highest |
| Exact Task branch đã tồn tại | `feature/PAC-455-task-245-build-high-alert-acknowledgement-ui` |
| PR target bắt buộc | `story/PAC-117-us-78-high-alert-acknowledgement` |

**Mục đích:** Nhóm cần tạo UI acknowledgement cho HIGH alert.

#### Nội dung công việc

- Thêm nút/checkbox acknowledge cho từng HIGH alert.
- Hiển thị rõ Staff đang xác nhận đã đọc hiểu alert.
- Gọi API acknowledge.
- Hiển thị acknowledged state.
- Không apply cho LOW/MEDIUM nếu không bắt buộc.

#### Kết quả cần đạt

- HIGH alert được Staff acknowledge.
- acknowledged_by và acknowledged_at có thể lưu.
- UI chuẩn bị cho checkout blocker.
- Staff không bỏ qua HIGH alert.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-455`.
- Commit format: `PAC-455 TASK-245: <short English message>`.
- Push đúng `feature/PAC-455-task-245-build-high-alert-acknowledgement-ui`.
- PR và merge vào `story/PAC-117-us-78-high-alert-acknowledgement`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---

### PAC-TASK-246 — Implement acknowledge InteractionAlert API

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-456` |
| Linked Story | `US-78` |
| Jira Parent Epic | `PAC-EPIC-10` |
| Component | InteractionAlert |
| Priority | Highest |
| Exact Task branch đã tồn tại | `feature/PAC-456-task-246-implement-acknowledge-interactionalert-api` |
| PR target bắt buộc | `story/PAC-117-us-78-high-alert-acknowledgement` |

**Mục đích:** Nhóm cần tạo API ghi nhận acknowledgement cho InteractionAlert.

#### Nội dung công việc

- Tạo endpoint acknowledge alert.
- Kiểm tra alert tồn tại.
- Kiểm tra user có quyền xử lý.
- Lưu acknowledged_by và acknowledged_at.
- Chỉ áp dụng bắt buộc cho HIGH.

#### Kết quả cần đạt

- Backend lưu acknowledgement.
- Checkout đọc được trạng thái.
- Audit alert rõ ràng.
- API trả lỗi nếu alert không hợp lệ.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-456`.
- Commit format: `PAC-456 TASK-246: <short English message>`.
- Push đúng `feature/PAC-456-task-246-implement-acknowledge-interactionalert-api`.
- PR và merge vào `story/PAC-117-us-78-high-alert-acknowledgement`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---

### PAC-TASK-256 — Add HIGH acknowledgement and consultation note tests

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-466` |
| Linked Story | `US-78` |
| Jira Parent Epic | `PAC-EPIC-19` |
| Component | Testing & Setup |
| Priority | Highest |
| Exact Task branch đã tồn tại | `test/PAC-466-task-256-add-high-acknowledgement-and-consultation-note-test` |
| PR target bắt buộc | `story/PAC-117-us-78-high-alert-acknowledgement` |

**Mục đích:** Nhóm cần viết test cho HIGH alert acknowledgement và consultation note.

#### Nội dung công việc

- Test HIGH thiếu acknowledge.
- Test HIGH thiếu note.
- Test HIGH có đủ acknowledge và note.
- Test LOW/MEDIUM không bị bắt như HIGH.
- Test checkout blocker liên quan.

#### Kết quả cần đạt

- HIGH alert rule có test.
- Checkout safety được bảo vệ.
- Staff flow đúng.
- Không bỏ sót consultation note.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-466`.
- Commit format: `PAC-466 TASK-256: <short English message>`.
- Push đúng `test/PAC-466-task-256-add-high-acknowledgement-and-consultation-note-test`.
- PR và merge vào `story/PAC-117-us-78-high-alert-acknowledgement`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---


## User Story Completion Gate

- Jira MCP: Story chuyển `TO DO → IN PROGRESS` khi bắt đầu Task đầu tiên.
- Jira MCP: chỉ chuyển Story `IN PROGRESS → IN REVIEW` sau khi toàn bộ Task đã `DONE` và Story PR đã mở.
- Nếu review fail hoặc có Bug chặn: Story `IN REVIEW → IN PROGRESS`.
- Chỉ chuyển Story `IN REVIEW → DONE` sau khi Story PR merge vào Epic và không còn Bug chặn.
- Supabase MCP: chạy Story-level data integration verification nếu Story tác động dữ liệu.
- GitHub MCP: xác minh mọi Task PR đã merge vào Story và Story PR đúng Epic.

- [ ] Tất cả Task đạt Definition of Done.
- [ ] Tất cả Task PR merge vào exact Story branch.
- [ ] Dùng skills phù hợp review integration cấp Story.
- [ ] Acceptance Criteria được xác minh bằng test thực tế.
- [ ] Nếu có lỗi, sửa trực tiếp trên Story branch, không tạo fix branch.
- [ ] Commit fix cấp Story dùng Jira Key `PAC-117`.
- [ ] Commit format: `PAC-117 US-78: <short English fix message>`.
- [ ] Story PR merge vào `epic/PAC-10-epic-10-interactionalert-lifecycle`.
- [ ] Audit/progress evidence được cập nhật.

---

# US-79 — HIGH alert consultation note

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-118` |
| Parent Business Epic | `PAC-EPIC-10 — InteractionAlert Lifecycle` |
| Component | InteractionAlert |
| Priority | Highest |
| Story Point | 5 |
| Labels | consultation-note, high-alert, mvp |
| Số Task | 3 |
| Exact Story branch đã tồn tại | `story/PAC-118-us-79-high-alert-consultation-note` |
| Story PR target | `epic/PAC-10-epic-10-interactionalert-lifecycle` |

## Mục tiêu User Story

Nhóm cần bắt buộc ghi consultation note cho từng HIGH alert.

## Acceptance Criteria

- [ ] HIGH alert yêu cầu note riêng.
- [ ] Note không được rỗng.
- [ ] Note gắn với đúng InteractionAlert.
- [ ] Không dùng note chung mơ hồ cho toàn order.

## Skill trọng tâm

- `karpathy-principles`
- `ecc-backend`
- `ecc-security`
- `ecc-frontend`
- `tdd`
- `ecc-testing`
- `ecc-healthcare`

## Danh sách Task và branch

| Task | Jira Key | Nội dung | Exact Task branch | PR target |
|---|---|---|---|---|
| `PAC-TASK-247` | `PAC-457` | Build HIGH alert consultation note UI | `feature/PAC-457-task-247-build-high-alert-consultation-note-ui` | `story/PAC-118-us-79-high-alert-consultation-note` |
| `PAC-TASK-248` | `PAC-458` | Implement consultation note API per HIGH alert | `feature/PAC-458-task-248-implement-consultation-note-api-per-high-alert` | `story/PAC-118-us-79-high-alert-consultation-note` |
| `PAC-TASK-249` | `PAC-459` | Validate HIGH alert consultation note is not empty | `feature/PAC-459-task-249-validate-high-alert-consultation-note-is-not-empty` | `story/PAC-118-us-79-high-alert-consultation-note` |

### PAC-TASK-247 — Build HIGH alert consultation note UI

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-457` |
| Linked Story | `US-79` |
| Jira Parent Epic | `PAC-EPIC-10` |
| Component | InteractionAlert |
| Priority | Highest |
| Exact Task branch đã tồn tại | `feature/PAC-457-task-247-build-high-alert-consultation-note-ui` |
| PR target bắt buộc | `story/PAC-118-us-79-high-alert-consultation-note` |

**Mục đích:** Nhóm cần tạo UI nhập consultation note cho HIGH alert.

#### Nội dung công việc

- Thêm textarea note cho từng HIGH alert.
- Bắt buộc note không rỗng.
- Gửi note tới API.
- Hiển thị trạng thái đã lưu.
- Gắn note đúng alert.

#### Kết quả cần đạt

- Staff ghi note tư vấn cho từng HIGH alert.
- Note không bị gộp chung mơ hồ.
- Checkout có thể validate.
- Demo thể hiện rule an toàn.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-457`.
- Commit format: `PAC-457 TASK-247: <short English message>`.
- Push đúng `feature/PAC-457-task-247-build-high-alert-consultation-note-ui`.
- PR và merge vào `story/PAC-118-us-79-high-alert-consultation-note`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---

### PAC-TASK-248 — Implement consultation note API per HIGH alert

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-458` |
| Linked Story | `US-79` |
| Jira Parent Epic | `PAC-EPIC-10` |
| Component | InteractionAlert |
| Priority | Highest |
| Exact Task branch đã tồn tại | `feature/PAC-458-task-248-implement-consultation-note-api-per-high-alert` |
| PR target bắt buộc | `story/PAC-118-us-79-high-alert-consultation-note` |

**Mục đích:** Nhóm cần tạo API lưu consultation note cho từng HIGH alert.

#### Nội dung công việc

- Tạo endpoint update note.
- Kiểm tra alert severity HIGH.
- Validate note không rỗng.
- Lưu note vào đúng InteractionAlert.
- Ghi actor/time nếu cần.

#### Kết quả cần đạt

- HIGH alert có consultation note riêng.
- Note chính thức chỉ lưu khi Staff gửi.
- Checkout kiểm tra được note.
- Dữ liệu history đầy đủ.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-458`.
- Commit format: `PAC-458 TASK-248: <short English message>`.
- Push đúng `feature/PAC-458-task-248-implement-consultation-note-api-per-high-alert`.
- PR và merge vào `story/PAC-118-us-79-high-alert-consultation-note`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---

### PAC-TASK-249 — Validate HIGH alert consultation note is not empty

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-459` |
| Linked Story | `US-79` |
| Jira Parent Epic | `PAC-EPIC-10` |
| Component | InteractionAlert |
| Priority | Highest |
| Exact Task branch đã tồn tại | `feature/PAC-459-task-249-validate-high-alert-consultation-note-is-not-empty` |
| PR target bắt buộc | `story/PAC-118-us-79-high-alert-consultation-note` |

**Mục đích:** Nhóm cần enforce consultation note không rỗng.

#### Nội dung công việc

- Trim note.
- Reject note rỗng hoặc chỉ khoảng trắng.
- UI hiển thị lỗi.
- Backend trả 400.
- Test note invalid.

#### Kết quả cần đạt

- HIGH alert không có note rỗng.
- Checkout không pass khi note chưa hợp lệ.
- Staff phải nhập nội dung tư vấn.
- Rule safety đúng baseline.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-459`.
- Commit format: `PAC-459 TASK-249: <short English message>`.
- Push đúng `feature/PAC-459-task-249-validate-high-alert-consultation-note-is-not-empty`.
- PR và merge vào `story/PAC-118-us-79-high-alert-consultation-note`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---


## User Story Completion Gate

- Jira MCP: Story chuyển `TO DO → IN PROGRESS` khi bắt đầu Task đầu tiên.
- Jira MCP: chỉ chuyển Story `IN PROGRESS → IN REVIEW` sau khi toàn bộ Task đã `DONE` và Story PR đã mở.
- Nếu review fail hoặc có Bug chặn: Story `IN REVIEW → IN PROGRESS`.
- Chỉ chuyển Story `IN REVIEW → DONE` sau khi Story PR merge vào Epic và không còn Bug chặn.
- Supabase MCP: chạy Story-level data integration verification nếu Story tác động dữ liệu.
- GitHub MCP: xác minh mọi Task PR đã merge vào Story và Story PR đúng Epic.

- [ ] Tất cả Task đạt Definition of Done.
- [ ] Tất cả Task PR merge vào exact Story branch.
- [ ] Dùng skills phù hợp review integration cấp Story.
- [ ] Acceptance Criteria được xác minh bằng test thực tế.
- [ ] Nếu có lỗi, sửa trực tiếp trên Story branch, không tạo fix branch.
- [ ] Commit fix cấp Story dùng Jira Key `PAC-118`.
- [ ] Commit format: `PAC-118 US-79: <short English fix message>`.
- [ ] Story PR merge vào `epic/PAC-10-epic-10-interactionalert-lifecycle`.
- [ ] Audit/progress evidence được cập nhật.

---

# US-80 — Block checkout nếu HIGH unresolved

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-119` |
| Parent Business Epic | `PAC-EPIC-10 — InteractionAlert Lifecycle` |
| Component | InteractionAlert |
| Priority | Highest |
| Story Point | 5 |
| Labels | checkout-block, high-alert, mvp |
| Số Task | 2 |
| Exact Story branch đã tồn tại | `story/PAC-119-us-80-block-checkout-neu-high-unresolved` |
| Story PR target | `epic/PAC-10-epic-10-interactionalert-lifecycle` |

## Mục tiêu User Story

Nhóm cần chặn checkout khi còn HIGH alert chưa xử lý.

## Acceptance Criteria

- [ ] Backend checkout kiểm tra unresolved HIGH alerts.
- [ ] Nếu còn alert thiếu acknowledge/note thì trả lỗi.
- [ ] UI đưa user quay lại xử lý alert.
- [ ] Không chỉ enforce bằng frontend.

## Skill trọng tâm

- `karpathy-principles`
- `mattpocock-engineering`
- `ecc-backend`
- `ecc-security`
- `tdd`
- `ecc-testing`
- `ecc-healthcare`

## Danh sách Task và branch

| Task | Jira Key | Nội dung | Exact Task branch | PR target |
|---|---|---|---|---|
| `PAC-TASK-250` | `PAC-460` | Implement checkout blocker for unresolved HIGH alerts | `feature/PAC-460-task-250-implement-checkout-blocker-for-unresolved-high-aler` | `story/PAC-119-us-80-block-checkout-neu-high-unresolved` |
| `PAC-TASK-251` | `PAC-461` | Build UI prompt when checkout is blocked by HIGH alert | `feature/PAC-461-task-251-build-ui-prompt-when-checkout-is-blocked-by-high-al` | `story/PAC-119-us-80-block-checkout-neu-high-unresolved` |

### PAC-TASK-250 — Implement checkout blocker for unresolved HIGH alerts

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-460` |
| Linked Story | `US-80` |
| Jira Parent Epic | `PAC-EPIC-10` |
| Component | InteractionAlert |
| Priority | Highest |
| Exact Task branch đã tồn tại | `feature/PAC-460-task-250-implement-checkout-blocker-for-unresolved-high-aler` |
| PR target bắt buộc | `story/PAC-119-us-80-block-checkout-neu-high-unresolved` |

**Mục đích:** Nhóm cần chặn checkout nếu còn HIGH alert chưa xử lý.

#### Nội dung công việc

- Query HIGH alerts của order.
- Kiểm tra acknowledgement và consultation note.
- Nếu thiếu, checkout validation fail.
- Không tạo payment/invoice.
- Trả lỗi rõ cho frontend.

#### Kết quả cần đạt

- Không checkout khi HIGH alert unresolved.
- Backend enforce rule.
- Staff phải xử lý alert trước.
- Luồng an toàn thuốc đúng baseline.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-460`.
- Commit format: `PAC-460 TASK-250: <short English message>`.
- Push đúng `feature/PAC-460-task-250-implement-checkout-blocker-for-unresolved-high-aler`.
- PR và merge vào `story/PAC-119-us-80-block-checkout-neu-high-unresolved`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---

### PAC-TASK-251 — Build UI prompt when checkout is blocked by HIGH alert

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-461` |
| Linked Story | `US-80` |
| Jira Parent Epic | `PAC-EPIC-10` |
| Component | InteractionAlert |
| Priority | High |
| Exact Task branch đã tồn tại | `feature/PAC-461-task-251-build-ui-prompt-when-checkout-is-blocked-by-high-al` |
| PR target bắt buộc | `story/PAC-119-us-80-block-checkout-neu-high-unresolved` |

**Mục đích:** Nhóm cần hiển thị hướng dẫn khi checkout bị chặn do HIGH alert.

#### Nội dung công việc

- Nhận lỗi checkout blocker từ API.
- Hiển thị message cụ thể.
- Highlight alert cần xử lý.
- Điều hướng user về alert panel.
- Giữ Draft Order.

#### Kết quả cần đạt

- Staff biết cần acknowledge/note alert nào.
- Draft Order không mất.
- UX checkout failure rõ ràng.
- HIGH alert không bị bỏ qua.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-461`.
- Commit format: `PAC-461 TASK-251: <short English message>`.
- Push đúng `feature/PAC-461-task-251-build-ui-prompt-when-checkout-is-blocked-by-high-al`.
- PR và merge vào `story/PAC-119-us-80-block-checkout-neu-high-unresolved`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---


## User Story Completion Gate

- Jira MCP: Story chuyển `TO DO → IN PROGRESS` khi bắt đầu Task đầu tiên.
- Jira MCP: chỉ chuyển Story `IN PROGRESS → IN REVIEW` sau khi toàn bộ Task đã `DONE` và Story PR đã mở.
- Nếu review fail hoặc có Bug chặn: Story `IN REVIEW → IN PROGRESS`.
- Chỉ chuyển Story `IN REVIEW → DONE` sau khi Story PR merge vào Epic và không còn Bug chặn.
- Supabase MCP: chạy Story-level data integration verification nếu Story tác động dữ liệu.
- GitHub MCP: xác minh mọi Task PR đã merge vào Story và Story PR đúng Epic.

- [ ] Tất cả Task đạt Definition of Done.
- [ ] Tất cả Task PR merge vào exact Story branch.
- [ ] Dùng skills phù hợp review integration cấp Story.
- [ ] Acceptance Criteria được xác minh bằng test thực tế.
- [ ] Nếu có lỗi, sửa trực tiếp trên Story branch, không tạo fix branch.
- [ ] Commit fix cấp Story dùng Jira Key `PAC-119`.
- [ ] Commit format: `PAC-119 US-80: <short English fix message>`.
- [ ] Story PR merge vào `epic/PAC-10-epic-10-interactionalert-lifecycle`.
- [ ] Audit/progress evidence được cập nhật.

---

# US-81 — Admin xem InteractionAlert History

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-120` |
| Parent Business Epic | `PAC-EPIC-10 — InteractionAlert Lifecycle` |
| Component | InteractionAlert |
| Priority | High |
| Story Point | 3 |
| Labels | alert-history, admin, mvp |
| Số Task | 2 |
| Exact Story branch đã tồn tại | `story/PAC-120-us-81-admin-xem-interactionalert-history` |
| Story PR target | `epic/PAC-10-epic-10-interactionalert-lifecycle` |

## Mục tiêu User Story

Nhóm cần xây dựng màn hình Admin xem lịch sử alert.

## Acceptance Criteria

- [ ] Admin xem danh sách alert.
- [ ] Có thông tin order, severity, display_count, acknowledge/note.
- [ ] Có filter cơ bản nếu cần.
- [ ] Warehouse không truy cập.

## Skill trọng tâm

- `modern-web-guidance`
- `ecc-frontend`
- `design-system-guide`
- `ecc-backend`
- `ecc-security`
- `ecc-testing`

## Danh sách Task và branch

| Task | Jira Key | Nội dung | Exact Task branch | PR target |
|---|---|---|---|---|
| `PAC-TASK-252` | `PAC-462` | Build Admin InteractionAlert History API and UI | `feature/PAC-462-task-252-build-admin-interactionalert-history-api-and-ui` | `story/PAC-120-us-81-admin-xem-interactionalert-history` |
| `PAC-TASK-257` | `PAC-467` | Add filters to InteractionAlert History | `feature/PAC-467-task-257-add-filters-to-interactionalert-history` | `story/PAC-120-us-81-admin-xem-interactionalert-history` |

### PAC-TASK-252 — Build Admin InteractionAlert History API and UI

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-462` |
| Linked Story | `US-81` |
| Jira Parent Epic | `PAC-EPIC-10` |
| Component | InteractionAlert |
| Priority | High |
| Exact Task branch đã tồn tại | `feature/PAC-462-task-252-build-admin-interactionalert-history-api-and-ui` |
| PR target bắt buộc | `story/PAC-120-us-81-admin-xem-interactionalert-history` |

**Mục đích:** Nhóm cần xây dựng API và UI xem lịch sử InteractionAlert cho Admin.

#### Nội dung công việc

- Tạo API list alert history.
- Hiển thị order, severity, rule, display_count.
- Hiển thị acknowledgement và note.
- UI có bảng danh sách.
- Kiểm tra Admin permission.

#### Kết quả cần đạt

- Admin xem được lịch sử alert.
- Dữ liệu phục vụ audit/demo.
- Warehouse không truy cập.
- Alert history đúng với dữ liệu persisted.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-462`.
- Commit format: `PAC-462 TASK-252: <short English message>`.
- Push đúng `feature/PAC-462-task-252-build-admin-interactionalert-history-api-and-ui`.
- PR và merge vào `story/PAC-120-us-81-admin-xem-interactionalert-history`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---

### PAC-TASK-257 — Add filters to InteractionAlert History

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-467` |
| Linked Story | `US-81` |
| Jira Parent Epic | `PAC-EPIC-10` |
| Component | InteractionAlert |
| Priority | Medium |
| Exact Task branch đã tồn tại | `feature/PAC-467-task-257-add-filters-to-interactionalert-history` |
| PR target bắt buộc | `story/PAC-120-us-81-admin-xem-interactionalert-history` |

**Mục đích:** Nhóm cần thêm filter cơ bản cho InteractionAlert History.

#### Nội dung công việc

- Filter theo severity.
- Filter theo date range nếu đơn giản.
- Filter theo order id hoặc medicine nếu có.
- Validate query params.
- UI cập nhật bảng theo filter.

#### Kết quả cần đạt

- Admin tìm alert dễ hơn.
- History hữu ích khi demo.
- Filter không làm sai dữ liệu.
- Không thêm scope analytics nâng cao.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-467`.
- Commit format: `PAC-467 TASK-257: <short English message>`.
- Push đúng `feature/PAC-467-task-257-add-filters-to-interactionalert-history`.
- PR và merge vào `story/PAC-120-us-81-admin-xem-interactionalert-history`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---


## User Story Completion Gate

- Jira MCP: Story chuyển `TO DO → IN PROGRESS` khi bắt đầu Task đầu tiên.
- Jira MCP: chỉ chuyển Story `IN PROGRESS → IN REVIEW` sau khi toàn bộ Task đã `DONE` và Story PR đã mở.
- Nếu review fail hoặc có Bug chặn: Story `IN REVIEW → IN PROGRESS`.
- Chỉ chuyển Story `IN REVIEW → DONE` sau khi Story PR merge vào Epic và không còn Bug chặn.
- Supabase MCP: chạy Story-level data integration verification nếu Story tác động dữ liệu.
- GitHub MCP: xác minh mọi Task PR đã merge vào Story và Story PR đúng Epic.

- [ ] Tất cả Task đạt Definition of Done.
- [ ] Tất cả Task PR merge vào exact Story branch.
- [ ] Dùng skills phù hợp review integration cấp Story.
- [ ] Acceptance Criteria được xác minh bằng test thực tế.
- [ ] Nếu có lỗi, sửa trực tiếp trên Story branch, không tạo fix branch.
- [ ] Commit fix cấp Story dùng Jira Key `PAC-120`.
- [ ] Commit format: `PAC-120 US-81: <short English fix message>`.
- [ ] Story PR merge vào `epic/PAC-10-epic-10-interactionalert-lifecycle`.
- [ ] Audit/progress evidence được cập nhật.

---

# US-82 — Warehouse không truy cập InteractionAlert

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-121` |
| Parent Business Epic | `PAC-EPIC-10 — InteractionAlert Lifecycle` |
| Component | InteractionAlert |
| Priority | High |
| Story Point | 2 |
| Labels | warehouse, permission, mvp |
| Số Task | 2 |
| Exact Story branch đã tồn tại | `story/PAC-121-us-82-warehouse-khong-truy-cap-interactionalert` |
| Story PR target | `epic/PAC-10-epic-10-interactionalert-lifecycle` |

## Mục tiêu User Story

Nhóm cần đảm bảo Warehouse không xem được alert tương tác thuốc.

## Acceptance Criteria

- [ ] Warehouse không thấy menu InteractionAlert.
- [ ] API trả 403 nếu Warehouse gọi.
- [ ] Test phân quyền có case Warehouse.
- [ ] Không lộ dữ liệu alert qua endpoint khác.

## Skill trọng tâm

- `ecc-security`
- `ecc-backend`
- `ecc-frontend`
- `tdd`
- `ecc-testing`

## Danh sách Task và branch

| Task | Jira Key | Nội dung | Exact Task branch | PR target |
|---|---|---|---|---|
| `PAC-TASK-253` | `PAC-463` | Enforce Warehouse no-access to InteractionAlert APIs | `feature/PAC-463-task-253-enforce-warehouse-no-access-to-interactionalert-api` | `story/PAC-121-us-82-warehouse-khong-truy-cap-interactionalert` |
| `PAC-TASK-254` | `PAC-464` | Add tests for Warehouse no-access to InteractionAlert | `test/PAC-464-task-254-add-tests-for-warehouse-no-access-to-interactionale` | `story/PAC-121-us-82-warehouse-khong-truy-cap-interactionalert` |

### PAC-TASK-253 — Enforce Warehouse no-access to InteractionAlert APIs

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-463` |
| Linked Story | `US-82` |
| Jira Parent Epic | `PAC-EPIC-10` |
| Component | InteractionAlert |
| Priority | High |
| Exact Task branch đã tồn tại | `feature/PAC-463-task-253-enforce-warehouse-no-access-to-interactionalert-api` |
| PR target bắt buộc | `story/PAC-121-us-82-warehouse-khong-truy-cap-interactionalert` |

**Mục đích:** Nhóm cần chặn Warehouse truy cập InteractionAlert APIs.

#### Nội dung công việc

- Gắn permission guard cho alert APIs.
- Không gán permission alert cho Warehouse.
- Test Warehouse gọi API bị 403.
- Chặn cả history API.
- Kiểm tra sidebar không hiển thị menu.

#### Kết quả cần đạt

- Warehouse không xem alert.
- Dữ liệu an toàn thuốc không lộ sai role.
- Backend enforce.
- Phân quyền đúng baseline.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-463`.
- Commit format: `PAC-463 TASK-253: <short English message>`.
- Push đúng `feature/PAC-463-task-253-enforce-warehouse-no-access-to-interactionalert-api`.
- PR và merge vào `story/PAC-121-us-82-warehouse-khong-truy-cap-interactionalert`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---

### PAC-TASK-254 — Add tests for Warehouse no-access to InteractionAlert

| Thuộc tính | Giá trị |
|---|---|
| Jira Key thật | `PAC-464` |
| Linked Story | `US-82` |
| Jira Parent Epic | `PAC-EPIC-19` |
| Component | Testing & Setup |
| Priority | High |
| Exact Task branch đã tồn tại | `test/PAC-464-task-254-add-tests-for-warehouse-no-access-to-interactionale` |
| PR target bắt buộc | `story/PAC-121-us-82-warehouse-khong-truy-cap-interactionalert` |

**Mục đích:** Nhóm cần viết test phân quyền Warehouse với InteractionAlert.

#### Nội dung công việc

- Test Warehouse gọi check/history bị 403 nếu không có quyền.
- Test Staff/Admin có quyền phù hợp.
- Test menu UI nếu có checklist.
- Không để endpoint phụ lộ dữ liệu.
- Ghi kết quả test.

#### Kết quả cần đạt

- Warehouse restriction có test.
- Security rule được bảo vệ.
- Không lộ InteractionAlert.
- CI phát hiện regression.

#### Git và MCP gate

- Không tạo branch mới.
- Commit mới phải chứa Jira Key `PAC-464`.
- Commit format: `PAC-464 TASK-254: <short English message>`.
- Push đúng `test/PAC-464-task-254-add-tests-for-warehouse-no-access-to-interactionale`.
- PR và merge vào `story/PAC-121-us-82-warehouse-khong-truy-cap-interactionalert`.
- Không merge trực tiếp vào Epic, `develop` hoặc `main`.
- Jira MCP: Task phải đi đúng `TO DO → IN PROGRESS → IN REVIEW → DONE`.
- Jira MCP: không chuyển Task sang `IN REVIEW` trước khi PR đã mở và test đã chạy.
- GitHub MCP: xác minh exact branch, commit SHA, PR head/base, checks và merge evidence.
- Supabase MCP: nếu Task liên quan schema hoặc dữ liệu, phải có data test evidence và cleanup; nếu không áp dụng phải ghi `N/A` kèm lý do.
- Nếu phát hiện lỗi, tạo Jira issue loại BUG và xử lý theo Bug lifecycle; không chỉ sửa âm thầm.

---


## User Story Completion Gate

- Jira MCP: Story chuyển `TO DO → IN PROGRESS` khi bắt đầu Task đầu tiên.
- Jira MCP: chỉ chuyển Story `IN PROGRESS → IN REVIEW` sau khi toàn bộ Task đã `DONE` và Story PR đã mở.
- Nếu review fail hoặc có Bug chặn: Story `IN REVIEW → IN PROGRESS`.
- Chỉ chuyển Story `IN REVIEW → DONE` sau khi Story PR merge vào Epic và không còn Bug chặn.
- Supabase MCP: chạy Story-level data integration verification nếu Story tác động dữ liệu.
- GitHub MCP: xác minh mọi Task PR đã merge vào Story và Story PR đúng Epic.

- [ ] Tất cả Task đạt Definition of Done.
- [ ] Tất cả Task PR merge vào exact Story branch.
- [ ] Dùng skills phù hợp review integration cấp Story.
- [ ] Acceptance Criteria được xác minh bằng test thực tế.
- [ ] Nếu có lỗi, sửa trực tiếp trên Story branch, không tạo fix branch.
- [ ] Commit fix cấp Story dùng Jira Key `PAC-121`.
- [ ] Commit format: `PAC-121 US-82: <short English fix message>`.
- [ ] Story PR merge vào `epic/PAC-10-epic-10-interactionalert-lifecycle`.
- [ ] Audit/progress evidence được cập nhật.

---




# 8. Epic hỗ trợ

| Task | Jira Key | Jira Parent Epic | Linked Story | Exact Task branch | PR target nghiệp vụ |
|---|---|---|---|---|---|
| `PAC-TASK-236` | `PAC-446` | `PAC-EPIC-19` | `US-72` | `test/PAC-446-task-236-add-tests-for-derived-medicine-interactions` | `story/PAC-111-us-72-derive-medicine-interaction-tu-active-ingredients` |
| `PAC-TASK-254` | `PAC-464` | `PAC-EPIC-19` | `US-82` | `test/PAC-464-task-254-add-tests-for-warehouse-no-access-to-interactionale` | `story/PAC-121-us-82-warehouse-khong-truy-cap-interactionalert` |
| `PAC-TASK-255` | `PAC-465` | `PAC-EPIC-19` | `US-74` | `test/PAC-465-task-255-add-interactionalert-lifecycle-integration-tests` | `story/PAC-113-us-74-persist-interactionalert-da-hien-thi` |
| `PAC-TASK-256` | `PAC-466` | `PAC-EPIC-19` | `US-78` | `test/PAC-466-task-256-add-high-acknowledgement-and-consultation-note-test` | `story/PAC-117-us-78-high-alert-acknowledgement` |
| `PAC-TASK-258` | `PAC-468` | `PAC-EPIC-21` | `US-74` | `feature/PAC-468-task-258-add-interactionalert-snapshot-and-traceability-note` | `story/PAC-113-us-74-persist-interactionalert-da-hien-thi` |


Task hỗ trợ vẫn merge Task → Linked Story → Business Epic → develop.

---

# 9. Thứ tự triển khai

1. Gate và audit.
2. US-69.
3. US-71.
4. US-70.
5. US-72.
6. US-73.
7. US-74.
8. US-75.
9. US-76.
10. US-77.
11. US-78.
12. US-79.
13. US-80.
14. US-81.
15. US-82.

Không dùng Wave branch.

---

# 10. GitHub Workflow

```text
Existing Task branch
→ commit + push
→ PR + merge vào exact Story branch
→ Story review và Story fix nếu cần
→ PR + merge vào exact Epic branch
→ Epic review và Epic fix nếu cần
→ PR + merge vào develop
```

Cấm tạo branch mới, fix branch, review branch hoặc temporary branch.

Commit:

```text
<TASK_JIRA_KEY> TASK-xxx: <short English message>
<STORY_JIRA_KEY> US-xx: <short English fix message>
<EPIC_JIRA_KEY> EPIC-xx: <short English fix message>
```

Jira Key phải khớp current issue branch. Không xóa branch sau merge.

---

# 11. Test Strategy

## 11.1. Supabase Data Testing bắt buộc

Mọi test liên quan persistence phải có hai lớp evidence:

```text
Application/API test result
+
Supabase data verification result
```

Supabase MCP không được dùng để gọi thẳng database rồi kết luận business API đúng. Luồng chuẩn là:

```text
Chuẩn bị fixture bằng Supabase MCP
→ gọi API/service ứng dụng
→ xác minh dữ liệu bằng Supabase MCP
→ cleanup
```

Mỗi data test phải ghi:

- environment;
- test_run_id;
- fixture IDs;
- query/verification purpose;
- expected rows;
- actual rows;
- constraint/transaction result;
- cleanup result;
- sanitized evidence.

### Bộ dữ liệu test tối thiểu

- 4 ActiveIngredient active.
- 1 ActiveIngredient inactive nếu baseline cần.
- 4 Medicine active.
- Medicine–ActiveIngredient mappings gồm medicine đơn hoạt chất và đa hoạt chất.
- Rule LOW.
- Rule MEDIUM.
- Rule HIGH.
- 1 rule inactive.
- 1 Admin profile.
- 2 Staff profiles để test ownership.
- 1 Warehouse profile.
- Draft Order có dưới hai medicine.
- Draft Order có hai medicine không tương tác.
- Draft Order có hai medicine tương tác HIGH.
- Alert chưa acknowledge.
- Alert đã acknowledge chưa note.
- Alert đã acknowledge và có note.

### Transaction và concurrency

Phải có evidence cho:

- duplicate reverse rule bị chặn;
- duplicate active alert bị chặn;
- redisplay không tạo row mới;
- failed alert persistence không để partial state;
- failed acknowledgement/note update không làm mất dữ liệu trước đó;
- concurrent check không tạo nhiều active alert;
- cleanup không xóa dữ liệu ngoài test_run_id.



## Rule

- Create/update/deactivate.
- Ingredient validation.
- Canonical/symmetric pair.
- Severity valid/invalid.
- Inactive rule excluded.
- Graph event; no direct Neo4j write.

## Derivation

- Interacting/non-interacting medicines.
- Multiple ingredients.
- Multiple medicine pairs.
- Inactive rule.
- Symmetric match.

## Alert lifecycle

- First display creates alert.
- Snapshot fields.
- Redisplay increments count/time.
- No duplicate active alert.
- Acknowledgement/note preserved.
- Admin history.

## HIGH

- Missing acknowledgement blocked.
- Missing/blank note blocked.
- Resolved HIGH passes blocker contract.
- LOW/MEDIUM not forced.
- Draft Order preserved after block.

## Permission

- Admin rule/history.
- Staff order scope.
- Warehouse 403 và không lộ qua endpoint phụ.

## Commands

Chỉ chạy scripts tồn tại:

```bash
npm run lint
npm run test
npm run test:e2e
npx prisma validate
npx prisma generate
npm run build
```

Không có script thì ghi `N/A — script chưa được cấu hình`. Không bịa Pass.

---

# 12. Definition of Done

## 12.1. MCP Definition of Done

Một issue không được xem là Done nếu thiếu một trong các điều kiện:

- Jira status đã đi đúng workflow từng bước.
- GitHub branch/commit/PR/merge evidence đầy đủ.
- Supabase data verification đã hoàn thành nếu issue tác động dữ liệu.
- Test data cleanup đã xác minh.
- Không còn Bug chặn.
- Jira comment có implementation, review và completion evidence.
- Commit message chứa đúng Jira Key của issue branch.
- PR target đúng hierarchy.



## Task

- Exact branch đã tồn tại.
- Không tạo branch mới.
- AC/test/build đạt.
- Commit đúng Jira Key Task.
- PR Task → Story merged.
- Evidence cập nhật.

## Story

- Tất cả Task merged.
- Story skill review hoàn tất.
- Nếu có fix, commit đúng Jira Key Story.
- Story PR → Epic merged.

## Epic

- Tất cả Story merged.
- Epic skill review và full verification đạt.
- Nếu có fix, commit đúng Jira Key Epic.
- Epic PR → develop merged.

## Sprint

- 32/32 Task, 14/14 Story, 2/2 Epic Done.
- 48/48 exact branches dùng đúng; branch mới = 0.
- Commit/PR/merge hierarchy đúng.
- Migration, security, permission và safety test đạt.
- `Ready for Sprint 6 = Yes`.

---

# 13. Out-of-Scope Guard

- Medicine-level rule official.
- CRITICAL severity.
- Alert tạm không persist.
- Duplicate active alert.
- HIGH bỏ qua acknowledge/note.
- Note chung cho toàn Order.
- Warehouse truy cập alerts.
- Full checkout, FEFO, trừ batch, Payment, Invoice.
- Refund/return.
- AI Copilot/AI Guardrail.
- Neo4j worker/projection/freshness.
- Graph-RAG/raw Cypher.
- Multi-store/multi-warehouse.
- Issue branch mới.

---

# 14. Rủi ro cần audit

| Risk | Severity | Action |
|---|---|---|
| Sprint 4 Order/POS chưa ổn định | Blocker | Dừng Sprint 5 |
| Medicine–Ingredient mapping sai | Blocker | Sửa dependency |
| Duplicate reverse rule | High | Canonical pair + tests |
| Duplicate alert concurrency | High | DB/service enforcement |
| Redisplay reset handled data | High | Integration tests |
| Blocker chỉ ở frontend | Blocker | Backend validator bắt buộc |
| Task 233 kéo Neo4j vào Sprint 5 | Major | Chỉ event boundary |
| Snapshot thiếu dữ liệu | High | Migration/API tests |
| Warehouse data leak | Blocker | Module-wide permission audit |
| Sprint 6 scope creep | Major | Out-of-scope review |

---

# 15. Tài liệu tiếp theo

```text
work-context/sprint-5/sprint-5-progress.md
work-context/sprint-5/sprint-5-audit.md
work-context/sprint-5/sprint-5-agent-prompt.md
```

Trước khi chạy agent prompt phải có `Ready for Sprint 5 = Yes`.


Các file tiếp theo bắt buộc kế thừa MCP policy:

- `sprint-5-progress.md`: có Jira status transitions, GitHub evidence, Supabase test evidence và Bug Register.
- `sprint-5-audit.md`: audit connectivity của ba MCP, environment safety, branch/PR state và dữ liệu test.
- `sprint-5-agent-prompt.md`: điều phối thực thi từng transition, data test, Bug lifecycle và merge hierarchy.
