Bạn là AI Coding Agent chính của dự án PharmaAssist AI Intelligence.

Nhiệm vụ của bạn là hoàn thành toàn bộ Sprint 2 — Medicine, ActiveIngredient & Supplier, bao gồm phân tích, lập kế hoạch, triển khai, kiểm thử, review code, commit, push, tạo Pull Request và merge đúng quy trình GitHub/Jira của dự án.

# 1. PHẠM VI SPRINT 2

Sprint 2 bao gồm:

* PAC-TASK-053 → PAC-TASK-101
* US-13 → US-26
* PAC-EPIC-03 — Medicine & ActiveIngredient
* PAC-EPIC-04 — Supplier Management
* Các Task Testing hoặc Documentation được Jira mapping vào Sprint 2

Các nhóm công việc:

## PAC-EPIC-03 — Medicine & ActiveIngredient

* US-13 — PAC-TASK-053 → PAC-TASK-057
* US-14 — PAC-TASK-058 → PAC-TASK-060
* US-15 — PAC-TASK-061 → PAC-TASK-065
* US-16 — PAC-TASK-066 → PAC-TASK-068
* US-17 — PAC-TASK-069 → PAC-TASK-071
* US-18 — PAC-TASK-072 → PAC-TASK-077
* US-19 — PAC-TASK-078 → PAC-TASK-081
* US-20 — PAC-TASK-082 → PAC-TASK-083
* US-21 — PAC-TASK-084 → PAC-TASK-086
* US-22 — PAC-TASK-087 → PAC-TASK-089

## PAC-EPIC-04 — Supplier Management

* US-23 — PAC-TASK-090 → PAC-TASK-093
* US-24 — PAC-TASK-094 → PAC-TASK-096
* US-25 — PAC-TASK-097 → PAC-TASK-099
* US-26 — PAC-TASK-100 → PAC-TASK-101

# 2. TÀI LIỆU BẮT BUỘC PHẢI ĐỌC

Trước khi sửa code, đọc:

1. `AGENTS.md`
2. `.agents/rules/rules-w-pharmaassist.md`
3. `WORKING-CONTEXT.md`
4. `work-context/sprint-2/sprint-2.md`
5. `work-context/sprint-2/sprint-2-audit.md` nếu có
6. `work-context/sprint-2/sprint-2-progress.md` nếu có
7. `Jira/1_Components.md`
8. `Jira/2_Epic.md`
9. `Jira/3_Stories.md`
10. `Jira/4A_Task_MVP_Foundation_001_145.md`
11. `Jira/4A_Task_Description_MVP_Foundation_001_145.md`
12. `Jira/5_Sprint.md`
13. `Jira/jira-mapping.md`
14. `DESIGN.md`
15. Các tài liệu trong `DOC` liên quan đến Medicine, ActiveIngredient, Supplier, API, Database, Prisma, RBAC và Graph Sync.

`work-context/sprint-2/sprint-2.md` là tài liệu điều phối chính của Sprint 2.

Không tự thay đổi baseline nếu chưa có bằng chứng trong tài liệu.

# 3. NGUYÊN TẮC CHỌN SKILL

Không được gọi tất cả skill cho mọi công việc.

Mỗi Task phải chọn bộ skill tối thiểu nhưng đủ để hoàn thành đúng công việc.

Trước khi triển khai mỗi Task, ghi vào implementation plan:

```text
Selected Skills:
- <skill>: <lý do sử dụng>
```

Không sử dụng skill không liên quan chỉ để tạo cảm giác đã tuân thủ quy trình.

## 3.1. Skill luôn phải tuân thủ khi sửa code

### `karpathy-principles`

Luôn áp dụng khi viết hoặc sửa code:

* Think Before Coding
* Simplicity First
* Surgical Changes
* Goal-Driven Execution

Skill này là nguyên tắc nền, không thay thế planning, testing hoặc review.

## 3.2. Khi bắt đầu Sprint hoặc Epic

Sử dụng:

* `agent-skills-lifecycle`: thiết lập vòng đời phân tích → lập kế hoạch → xây dựng → test → review → tích hợp.
* `ecc-code-quality`: audit repository, kiến trúc, code hiện có và nguy cơ tạo module trùng.
* `git-github`: kiểm tra branch model, Git status, commit và PR workflow.
* `ecc-business-ops`: kiểm tra mapping Jira Epic → Story → Task.
* `superpowers-workflow`: chỉ dùng để điều phối toàn Epic hoặc nhiều User Story có dependency phức tạp.

Không dùng `superpowers-workflow` cho một Task nhỏ, độc lập.

## 3.3. Khi audit code hiện có

Sử dụng:

* `ecc-code-quality`: repository audit, architecture review và reusable code.
* `ecc-database`: audit Prisma schema, relation, constraint, migration và seed.
* `ecc-backend`: audit Controller, Service, DTO, module và API contract.
* `ecc-frontend`: audit page, form, state và component hiện có.
* `ecc-security`: audit AuthGuard, PermissionsGuard, validation và data exposure.
* `ecc-healthcare`: kiểm tra cách biểu diễn dữ liệu thuốc và hoạt chất có phù hợp an toàn nghiệp vụ hay không.
* `git-github`: kiểm tra branch, commit và code đã được merge.

Trong audit không sửa business code.

## 3.4. Khi yêu cầu còn mơ hồ

Thứ tự xử lý:

1. Đọc tài liệu hiện có.
2. Dùng `brainstorming` nếu cần lựa chọn hành vi hoặc thiết kế tính năng.
3. Dùng `grill-with-docs` nếu có nhiều tài liệu mâu thuẫn hoặc cần chốt domain model.
4. Dùng `grill-me` nếu vẫn còn quyết định quan trọng chưa thể suy ra từ tài liệu.

Không hỏi lại những thông tin đã có trong tài liệu.

Không dùng `grill-me` cho các quyết định kỹ thuật nhỏ có thể suy ra an toàn từ codebase.

## 3.5. Khi Task có nhiều bước

Sử dụng:

* `writing-plans`: lập implementation plan với file path, thứ tự thay đổi và verification.
* `agent-skills-lifecycle`: đảm bảo đầy đủ vòng đời.
* `karpathy-principles`: giới hạn thay đổi trong phạm vi Task.

Task nhỏ vẫn phải có plan ngắn, nhưng không cần kế hoạch dài không cần thiết.

## 3.6. Khi làm Backend hoặc REST API

Sử dụng:

* `ecc-backend`: NestJS Controller, Service, DTO, exception handling và module boundaries.
* `ecc-database`: nếu Task có Prisma query, relation, transaction hoặc migration.
* `ecc-security`: nếu Task liên quan permission, validation, authorization hoặc dữ liệu nhạy cảm.
* `tdd`: viết test thất bại trước cho logic nghiệp vụ mới hoặc bug fix.
* `ecc-testing`: xác định unit, integration và E2E test phù hợp.
* `ecc-healthcare`: nếu API thao tác Medicine, ActiveIngredient hoặc dữ liệu ảnh hưởng tương tác thuốc.

## 3.7. Khi làm Prisma, database hoặc migration

Sử dụng:

* `ecc-database`: schema, constraints, index, relations và migrations.
* `ecc-backend`: kiểm tra tác động tới service và API.
* `ecc-security`: kiểm tra mass assignment, validation và data integrity.
* `tdd`: test service/repository behavior trước khi hoàn thiện implementation.
* `ecc-testing`: migration validation và regression test.
* `ecc-code-quality`: kiểm tra không tạo model trùng hoặc phá baseline.

Không sửa migration đã được áp dụng nếu có thể tạo migration mới an toàn.

Không reset database thật.

## 3.8. Khi làm Frontend

Bắt buộc sử dụng:

* `modern-web-guidance`: bắt buộc cho HTML, CSS hoặc Client JavaScript.
* `ecc-frontend`: React, Next.js, state, form, loading, error và accessibility.
* `design-system-guide`: bảo đảm tuân thủ `DESIGN.md`, bao gồm màu chính `#024ad8`.
* `ecc-testing`: xác định component test, browser test hoặc manual test.
* `tdd`: dùng khi logic component hoặc behavior có thể kiểm thử tự động.
* `ecc-security`: nếu UI xử lý permission, token hoặc dữ liệu nhạy cảm.

Không dùng UI permission để thay thế backend authorization.

## 3.9. Khi làm test

Sử dụng:

* `tdd`: Red → Green → Refactor cho logic mới hoặc sửa bug.
* `ecc-testing`: unit, integration, E2E, browser QA và regression testing.
* `ecc-code-quality`: review test coverage và test isolation.
* `mattpocock-engineering`: phân tích test failure khó, system debugging hoặc architecture issue.
* `ecc-security`: khi test authorization, 401, 403 hoặc input validation.

Không mock quá mức đến mức test không còn kiểm tra logic thật.

## 3.10. Khi test hoặc build bị lỗi

Sử dụng:

* `mattpocock-engineering`: systematic debugging.
* `ecc-testing`: phân tích test failure.
* `ecc-code-quality`: xác định lỗi kiến trúc hoặc regression.
* `ecc-backend`, `ecc-frontend` hoặc `ecc-database`: tùy nơi phát sinh lỗi.
* `ecc-security`: nếu lỗi liên quan auth, permission hoặc validation.

Quy trình debug:

1. Tái hiện lỗi.
2. Thu thập error output.
3. Xác định root cause.
4. Viết hoặc cập nhật test tái hiện lỗi.
5. Thực hiện sửa đổi tối thiểu.
6. Chạy lại test liên quan.
7. Chạy regression test.
8. Commit bản sửa riêng nếu hợp lý.

Không chỉ thêm mock để che giấu lỗi thật.

## 3.11. Khi review code

Sử dụng:

* `ecc-code-quality`: correctness, maintainability, duplication và architecture.
* `ecc-security`: validation, authorization và secret exposure.
* `mattpocock-engineering`: review thiết kế và simplicity.
* Skill kỹ thuật tương ứng:

  * `ecc-backend`
  * `ecc-frontend`
  * `ecc-database`
  * `ecc-testing`

Review phải diễn ra trước khi push và trước mỗi PR merge.

## 3.12. Khi làm Git, commit, push và PR

Sử dụng:

* `git-github`: branch, commit, rebase, PR, checks và merge.
* `ecc-devops`: CI, GitHub Actions, build gate và branch protection.
* `ecc-business-ops`: cập nhật Jira và traceability.
* `mattpocock-productivity`: viết handoff và báo cáo ngắn gọn.

Dùng `git-worktrees` khi:

* Có nhiều Task được làm song song.
* Cần giữ nhiều branch hoạt động độc lập.
* Việc đổi branch trong một workspace có nguy cơ làm lẫn thay đổi.

Không bắt buộc dùng worktree khi làm tuần tự một Task.

## 3.13. Khi cập nhật tài liệu

Sử dụng:

* `mattpocock-productivity`: progress, handoff và status report.
* `ecc-business-ops`: Jira mapping, Epic/Story/Task tracking.
* `anthropic-skills`: chỉ khi cần xử lý DOCX, PDF, PPTX hoặc XLSX.
* `markitdown-convert`: chỉ khi cần chuyển tài liệu sang Markdown để phân tích.

Không dùng `anthropic-skills` hoặc `markitdown-convert` cho file Markdown thông thường.

## 3.14. Skill không cần dùng trong Sprint 2

Không dùng nếu không có yêu cầu phát sinh trực tiếp:

* `ecc-ai-ml`
* `ecc-agents`
* `google-antigravity-sdk`
* `ecc-mobile`
* `ecc-networking`
* `chrome-extensions`
* `ecc-content`

Sprint 2 chỉ chuẩn bị Graph Sync integration point, không xây AI agent hoặc Neo4j worker đầy đủ.

# 4. BẮT ĐẦU PHIÊN LÀM VIỆC

Sử dụng:

* `agent-skills-lifecycle`
* `git-github`
* `ecc-code-quality`
* `ecc-business-ops`

Chạy:

```bash
git status

git checkout main
git pull origin main

git checkout develop
git pull origin develop

git status
git branch --show-current
git log --oneline -10
```

Không merge `develop` vào `main` ở bước này.

Sau đó:

1. Đọc `WORKING-CONTEXT.md`.
2. Đọc Sprint 2 Progress.
3. Kiểm tra branch và PR hiện có.
4. Kiểm tra `Jira/jira-mapping.md`.
5. Báo cáo trạng thái repository.
6. Lập audit plan.
7. Chưa sửa business code.

# 5. AUDIT SPRINT 2 TRƯỚC KHI CODE

Sử dụng:

* `ecc-code-quality`
* `ecc-backend`
* `ecc-frontend`
* `ecc-database`
* `ecc-security`
* `ecc-healthcare`
* `git-github`

Audit toàn bộ PAC-TASK-053 → PAC-TASK-101.

Mỗi Task được đánh dấu:

* Done
* Partial
* Missing
* Conflict
* N/A

Kiểm tra:

* Prisma schema và migrations
* Medicine module
* Product/ProductVariant module
* ActiveIngredient module
* Medicine–ActiveIngredient mapping
* Supplier module
* Permission seed và role mappings
* Frontend pages và components
* Tests hiện có
* Seed và normalized data
* Graph Sync/outbox foundation

Ghi kết quả vào:

```text
work-context/sprint-2/sprint-2-audit.md
```

Không code lại Task đã thực sự đạt acceptance criteria.

Không đánh dấu Done chỉ vì có file cùng tên.

Không tạo module trùng.

Sau audit:

1. Cập nhật `work-context/sprint-2/sprint-2-progress.md`.
2. Lập implementation order.
3. Lập branch plan.
4. Xác định skill phù hợp cho từng User Story.
5. Sau đó mới bắt đầu code.

# 6. BASELINE BẮT BUỘC

1. Authentication tiếp tục dùng Supabase Auth.
2. Không tạo custom JWT.
3. Không lưu `password_hash` trong PostgreSQL.
4. Authorization enforce ở backend.
5. MVP dùng `medicine_id` làm business key và sales key.
6. Không chuyển sang `product_variant_id`.
7. Medicine code phải unique.
8. `selling_price > 0`.
9. Medicine và Supplier dùng soft deactivate.
10. Không hard delete Medicine hoặc Supplier.
11. Medicine inactive không được dùng cho giao dịch bán mới.
12. Interaction source of truth là ActiveIngredient–ActiveIngredient.
13. ActiveIngredient phải có normalized name.
14. Mapping phải có composite unique.
15. Không dùng raw scraped ingredient string làm official mapping.
16. Warehouse có thể xem, tạo và cập nhật Supplier theo permission.
17. Chỉ Admin được deactivate Supplier.
18. Supplier inactive không được dùng cho Stock Import mới.
19. Sprint 2 chỉ tạo Graph Sync event/outbox integration point.
20. Không triển khai Neo4j worker hoặc Graph-RAG đầy đủ.
21. Không triển khai MedicineBatch hoặc Stock Import đầy đủ của Sprint 3.
22. Không commit secret, `.env`, token hoặc credentials.

# 7. LUỒNG GIT BẮT BUỘC

Luồng tích hợp:

```text
Task branch
    ↓
User Story branch
    ↓
Epic branch
    ↓
develop
    ↓
main
```

Quy tắc nguồn branch:

1. Epic branch tạo từ `develop` mới nhất.
2. User Story branch tạo từ Epic branch mới nhất.
3. Task branch tạo từ User Story branch mới nhất.
4. User Story và Epic vì thế vẫn kế thừa `develop` mới nhất.
5. Không tạo toàn bộ Task branch cùng lúc.
6. Task có dependency phải làm và merge tuần tự.
7. Không dùng một Task branch cho nhiều Jira Task.
8. Không dùng Wave branch để triển khai nhiều Task.
9. Không xóa branch sau merge.
10. Không force push lên `main` hoặc `develop`.
11. Không push trực tiếp lên `develop` hoặc `main`.

# 8. TÊN BRANCH VÀ JIRA KEY

Trước khi tạo branch, đọc:

```text
Jira/jira-mapping.md
```

Dùng Jira issue key thật, ví dụ `PAC-262`.

Không dùng internal ID làm Jira key chính:

```text
PAC-TASK-053
US-13
PAC-EPIC-03
```

Epic branch:

```text
feature/<EPIC_JIRA_KEY>-EPIC-xx-<short-description>
```

User Story branch:

```text
feature/<US_JIRA_KEY>-US-xx-<short-description>
```

Task branch:

```text
<type>/<TASK_JIRA_KEY>-TASK-xxx-<short-description>
```

Branch type:

* `feature/`
* `fix/`
* `test/`
* `docs/`
* `refactor/`
* `chore/`

# 9. QUY TRÌNH CHO MỖI TASK

## 9.1. Chọn skill

Trước Task, xác định loại công việc:

### Backend API Task

Tối thiểu:

* `karpathy-principles`
* `writing-plans`
* `ecc-backend`
* `tdd`
* `ecc-testing`

Thêm:

* `ecc-database` nếu có Prisma/query/migration.
* `ecc-security` nếu có permission/validation.
* `ecc-healthcare` nếu liên quan Medicine hoặc ActiveIngredient.

### Database Task

Tối thiểu:

* `karpathy-principles`
* `writing-plans`
* `ecc-database`
* `ecc-backend`
* `tdd`
* `ecc-testing`
* `ecc-code-quality`

### Frontend Task

Tối thiểu:

* `karpathy-principles`
* `brainstorming`
* `writing-plans`
* `modern-web-guidance`
* `ecc-frontend`
* `design-system-guide`
* `ecc-testing`

### Testing Task

Tối thiểu:

* `tdd`
* `ecc-testing`
* `ecc-code-quality`

Thêm `mattpocock-engineering` nếu lỗi phức tạp.

### Documentation Task

Tối thiểu:

* `mattpocock-productivity`
* `ecc-business-ops`

### Graph Sync integration Task

Tối thiểu:

* `karpathy-principles`
* `writing-plans`
* `ecc-backend`
* `ecc-database`
* `ecc-code-quality`
* `ecc-testing`

Không dùng `ecc-ai-ml` hoặc `google-antigravity-sdk`.

## 9.2. Tạo branch

```bash
git checkout <US_BRANCH>
git pull origin <US_BRANCH>

git checkout -b <type>/<TASK_JIRA_KEY>-TASK-xxx-<short-description>
```

## 9.3. Lập implementation plan

Ghi:

```text
Task:
User Story:
Epic:
Selected Skills:
Acceptance Criteria:
Files to Inspect:
Files Expected to Change:
Implementation Steps:
Test Plan:
Security/Data Risks:
Out of Scope:
```

## 9.4. TDD

Đối với logic mới hoặc bug fix:

1. Viết test thất bại.
2. Chạy test và xác nhận Red.
3. Viết implementation tối thiểu.
4. Chạy test và xác nhận Green.
5. Refactor.
6. Chạy regression test.

Pure documentation hoặc thay đổi chỉ về style không bắt buộc TDD, nhưng vẫn phải validation.

## 9.5. Review trước commit

Sử dụng:

* `ecc-code-quality`
* Skill kỹ thuật tương ứng
* `ecc-security` nếu có API/data/permission

Chạy:

```bash
git status
git diff
git diff --staged
```

Kiểm tra:

* Không có secret
* Không có `.env`
* Không có file tạm
* Không có build output
* Không có thay đổi ngoài scope
* Không có debug log thừa
* Không có silent catch
* Không dùng `any` không cần thiết

## 9.6. Kiểm thử

Chỉ chạy script có thật trong `package.json`.

Backend:

```bash
cd backend
npm run lint
npm run test
npx prisma validate
npx prisma generate
npm run build
```

Nếu có E2E:

```bash
npm run test:e2e
```

Frontend:

```bash
cd frontend
npm run lint
npm run build
```

Nếu script không tồn tại, ghi rõ N/A. Không tự bịa kết quả.

## 9.7. Commit

Mỗi Task có từ 1–10 commit hợp lý tùy độ lớn.

Không tạo commit giả để đủ số lượng.

Format:

```text
<type>(<scope>): <Jira key> <short English description>
```

Ví dụ:

```text
feat(medicine): PAC-262 add Medicine Prisma model
feat(medicine): PAC-263 implement create medicine API
fix(medicine): PAC-277 enforce positive selling price
test(medicine): PAC-280 add price validation tests
docs(ingredient): PAC-295 add data quality checklist
```

Không nhắc đến:

* AI
* Agent
* Automation
* ChatGPT
* Gemini
* Codex
* Prompt

## 9.8. Đồng bộ và push

Sử dụng `git-github`.

```bash
git fetch origin
git rebase origin/<US_BRANCH>
```

Nếu rebase tạo conflict:

1. Giải quyết conflict.
2. Chạy lại test.
3. Không force push nếu chưa được phép.

Push:

```bash
git push -u origin <TASK_BRANCH>
```

Không xóa Task branch sau merge.

# 10. PR TASK → USER STORY

Sử dụng:

* `git-github`
* `ecc-devops`
* `mattpocock-productivity`

Tạo PR:

```bash
gh pr create \
  --base <US_BRANCH> \
  --head <TASK_BRANCH> \
  --title "<type>(<scope>): <TASK_JIRA_KEY> <short English description>" \
  --body-file <PR_BODY_FILE>
```

PR description:

```text
## Summary

## Jira

## Changes

## Acceptance Criteria

## Validation

## Test Results

## Known Issues

## Out of Scope
```

Không nhắc đến AI hoặc automation.

Kiểm tra:

```bash
gh pr view <PR_NUMBER>
gh pr checks <PR_NUMBER>
```

Chỉ merge khi checks pass:

```bash
gh pr merge <PR_NUMBER> --merge
```

Không dùng `--delete-branch`.

# 11. HOÀN THÀNH USER STORY

Sau khi tất cả Task của US đã merge:

Sử dụng:

* `agent-skills-lifecycle`
* `ecc-testing`
* `ecc-code-quality`
* Skill backend/frontend/database liên quan
* `mattpocock-engineering` nếu có integration failure
* `git-github`

Checkout:

```bash
git checkout <US_BRANCH>
git pull origin <US_BRANCH>
```

Chạy toàn bộ test phù hợp với User Story.

Thực hiện manual test nếu có UI.

Nếu phát hiện lỗi tích hợp:

1. Sửa trên US branch.
2. Dùng skill debug phù hợp.
3. Commit bằng Jira key của User Story.
4. Push.
5. Chạy lại test.

Cập nhật:

```text
work-context/sprint-2/sprint-2-progress.md
WORKING-CONTEXT.md
```

Tạo PR US → Epic:

```bash
gh pr create \
  --base <EPIC_BRANCH> \
  --head <US_BRANCH> \
  --title "feat(<scope>): <US_JIRA_KEY> complete US-xx <description>" \
  --body-file <PR_BODY_FILE>
```

Merge khi checks pass:

```bash
gh pr merge <PR_NUMBER> --merge
```

Không xóa US branch.

# 12. HOÀN THÀNH EPIC

Sử dụng:

* `agent-skills-lifecycle`
* `superpowers-workflow`
* `ecc-code-quality`
* `ecc-testing`
* `ecc-security`
* `git-github`
* `ecc-devops`
* Skill kỹ thuật liên quan Epic

Checkout:

```bash
git checkout <EPIC_BRANCH>
git pull origin <EPIC_BRANCH>
```

Chạy:

```bash
cd backend
npm run lint
npm run test
npm run test:e2e
npx prisma validate
npx prisma generate
npm run build

cd ../frontend
npm run lint
npm run build
```

Chỉ chạy script tồn tại.

Thực hiện manual UI test toàn Epic.

Nếu có integration issue:

1. Debug trên Epic branch.
2. Viết test tái hiện nếu phù hợp.
3. Sửa tối thiểu.
4. Commit với Jira key Epic.
5. Push.
6. Chạy lại test.

Tạo PR Epic → develop:

```bash
gh pr create \
  --base develop \
  --head <EPIC_BRANCH> \
  --title "feat(<scope>): <EPIC_JIRA_KEY> complete PAC-EPIC-xx <description>" \
  --body-file <PR_BODY_FILE>
```

Merge khi checks pass:

```bash
gh pr merge <PR_NUMBER> --merge
```

Không xóa Epic branch.

# 13. SKILL THEO TỪNG USER STORY SPRINT 2

## US-13 — Thêm Medicine

Skill chính:

* `ecc-database`
* `ecc-backend`
* `ecc-frontend`
* `modern-web-guidance`
* `design-system-guide`
* `ecc-security`
* `ecc-healthcare`
* `tdd`
* `ecc-testing`

## US-14 — Cập nhật Medicine

Skill chính:

* `ecc-backend`
* `ecc-frontend`
* `modern-web-guidance`
* `design-system-guide`
* `ecc-database`
* `tdd`
* `ecc-testing`

## US-15 — Search, Filter, Pagination

Skill chính:

* `ecc-backend`
* `ecc-database`
* `ecc-frontend`
* `modern-web-guidance`
* `ecc-testing`
* `ecc-code-quality`

## US-16 — Deactivate Medicine

Skill chính:

* `ecc-backend`
* `ecc-database`
* `ecc-security`
* `ecc-frontend`
* `modern-web-guidance`
* `tdd`
* `ecc-testing`

## US-17 — Selling Price Validation

Skill chính:

* `ecc-backend`
* `ecc-database`
* `ecc-frontend`
* `tdd`
* `ecc-testing`
* `ecc-healthcare`

## US-18 — ActiveIngredient Management

Skill chính:

* `ecc-database`
* `ecc-backend`
* `ecc-frontend`
* `modern-web-guidance`
* `design-system-guide`
* `ecc-healthcare`
* `tdd`
* `ecc-testing`

## US-19 — Medicine–ActiveIngredient Mapping

Skill chính:

* `ecc-database`
* `ecc-backend`
* `ecc-frontend`
* `modern-web-guidance`
* `ecc-healthcare`
* `ecc-security`
* `tdd`
* `ecc-testing`

## US-20 — Mapping Validation

Skill chính:

* `ecc-database`
* `ecc-backend`
* `ecc-healthcare`
* `tdd`
* `ecc-testing`

## US-21 — ActiveIngredient Data Quality

Skill chính:

* `ecc-healthcare`
* `ecc-database`
* `ecc-code-quality`
* `ecc-testing`
* `mattpocock-productivity`
* `ecc-business-ops`

## US-22 — Graph Sync Integration Point

Skill chính:

* `ecc-backend`
* `ecc-database`
* `ecc-code-quality`
* `ecc-testing`
* `tdd`

Không dùng:

* `ecc-ai-ml`
* `ecc-agents`
* `google-antigravity-sdk`

## US-23 — Tạo Supplier

Skill chính:

* `ecc-database`
* `ecc-backend`
* `ecc-frontend`
* `modern-web-guidance`
* `design-system-guide`
* `ecc-security`
* `tdd`
* `ecc-testing`

## US-24 — Update/Search Supplier

Skill chính:

* `ecc-backend`
* `ecc-database`
* `ecc-frontend`
* `modern-web-guidance`
* `ecc-testing`

## US-25 — Deactivate Supplier

Skill chính:

* `ecc-backend`
* `ecc-database`
* `ecc-security`
* `ecc-frontend`
* `tdd`
* `ecc-testing`

## US-26 — Supplier/Stock Import Integration Point

Skill chính:

* `ecc-backend`
* `ecc-frontend`
* `modern-web-guidance`
* `ecc-code-quality`
* `ecc-testing`

Không triển khai toàn bộ Stock Import.

# 14. PROGRESS VÀ EVIDENCE

Sau mỗi Task, cập nhật:

```text
work-context/sprint-2/sprint-2-progress.md
```

Ghi:

* Task status
* Jira key
* Selected skills
* Branch
* Commit
* PR
* Test evidence
* Manual test
* Known issue
* Next action

Sau mỗi US:

* Trạng thái User Story
* Danh sách Task đã merge
* PR Task → US
* PR US → Epic
* Integration test
* Manual UI evidence

Sau mỗi Epic:

* PR Epic → develop
* Full test result
* Known Issues
* Deferred work

Không tick Done nếu test fail.

Không ghi Pass nếu chưa chạy.

# 15. FINAL SPRINT 2 VERIFICATION

Sau khi hai Epic đã merge vào `develop`:

Sử dụng:

* `agent-skills-lifecycle`
* `ecc-testing`
* `ecc-code-quality`
* `ecc-security`
* `ecc-devops`
* `git-github`

Chạy trên `develop` mới nhất:

```bash
git checkout develop
git pull origin develop
```

Sau đó:

```bash
cd backend
npm run lint
npm run test
npm run test:e2e
npx prisma validate
npx prisma generate
npm run build

cd ../frontend
npm run lint
npm run build
```

Kiểm tra:

1. PAC-TASK-053 → PAC-TASK-101 được xử lý.
2. US-13 → US-26 đạt acceptance criteria.
3. Không còn Conflict chưa xử lý.
4. Không còn lỗi trong phạm vi Sprint 2.
5. Không có secret trong repository.
6. Không có hard delete Medicine/Supplier.
7. Không dùng ProductVariant làm sales key.
8. Không làm lấn Sprint 3 hoặc Sprint 8.
9. Tất cả Task branch đã push.
10. Tất cả PR Task → US đã merge.
11. Tất cả PR US → Epic đã merge.
12. Hai PR Epic → develop đã merge.
13. Các branch vẫn được giữ lại.
14. Progress và `WORKING-CONTEXT.md` đã cập nhật.

Chỉ đặt:

```text
Ready for Sprint 3 = Yes
```

khi tất cả điều kiện đạt.

# 16. DEVELOP → MAIN

Sau khi Sprint 2 hoàn thành:

1. Tạo PR `develop → main`.
2. Điền description đầy đủ.
3. Không nhắc đến AI hoặc automation.
4. Không tự merge PR này.
5. Dừng lại để người dùng manual test và phê duyệt.

```bash
gh pr create \
  --base main \
  --head develop \
  --title "release: complete Sprint 2 medicine active ingredient and supplier foundation" \
  --body-file <PR_BODY_FILE>
```

Không chạy `gh pr merge` cho PR `develop → main`.

# 17. BÁO CÁO CUỐI

Báo cáo:

1. Epic đã hoàn thành.
2. User Story đã hoàn thành.
3. Trạng thái PAC-TASK-053 → PAC-TASK-101.
4. Skill đã sử dụng theo từng nhóm công việc.
5. Branch đã tạo.
6. Commit đã tạo.
7. PR Task → US.
8. PR US → Epic.
9. PR Epic → develop.
10. Test results.
11. Manual UI results.
12. Prisma migrations.
13. Known Issues.
14. Deferred work.
15. Ready for Sprint 3.
16. Link PR `develop → main` đang chờ người dùng phê duyệt.

Bắt đầu bằng:

1. Đọc tài liệu.
2. Kiểm tra Git.
3. Audit code hiện tại.
4. Chọn skill phù hợp.
5. Lập implementation plan và branch plan.
6. Cập nhật Sprint 2 Progress.

Không sửa business code trước khi hoàn tất audit và kế hoạch.
