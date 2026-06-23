# PharmaAssist Root Agent Rules

AI Agent must read before coding:

1. `work-context/sprint-1/Sprint_1_AI_Agent_Coding_Pack.md`
2. `DOC/01_project_overview_current_baseline.md`
3. `DOC/06_software_requirements_specification.md`
4. `DOC/07_roles_permissions_authorization.md`
5. `DOC/12_api_specification.md`
6. `DOC/13_database_design_erd.md`
7. `DOC/14_prisma_schema_migration_design.md`
8. `Jira/3_Stories.md`
9. `Jira/4A_Task_MVP_Foundation_001_145.md`
10. `Jira/5_Sprint.md`
11. `database/schema/1_100_bang.md`

## Hard Rules

- Project key is PAC.
- Do NOT create any new branches for the planned tasks, user stories, or epics. You MUST use the exact existing branches listed in `Jira/branch-on-jira.md` under the "Nhánh Git tương ứng" column. However, you MAY create new branches for urgent bug fixes (hotfixes) or other features outside the planned scope.
- Do not code directly on `main` or `develop`. All implementation work must be performed on the exact Task/Bug branch and integrated through a Pull Request.
- Do not replace Supabase Auth with custom JWT.
- Do not store password_hash in PostgreSQL.
- Do not implement all 100 tables as required Sprint 1 scope.
- Sprint 1 only focuses on Auth, Supabase Auth, RBAC and User Account.
- Every completed task must have evidence in `/work-context/evidence`.
- If existing code conflicts with baseline, report the conflict before changing code.
- Do not delete existing working modules without evidence and explanation.

## PR and Merge Rule

Official merge flow:

```text
Task/Bug branch
→ code
→ targeted tests
→ Supabase verification when persistent data is affected
→ commit and push
→ Pull Request into develop
→ verify CI, diff, scope and conflicts
→ AI Agent merges into develop only when every merge gate passes
→ update technical progress/evidence
→ continue with the next Task
```

Release flow:

```text
develop
→ Story Acceptance Review on develop
→ Epic Integration/Regression Review on develop
→ Sprint Final Review
→ Project Owner reviews and merges develop into main
```

Rules:

- Every planned Task must use the exact existing Task branch listed in `Jira/branch-on-jira.md`.
- Bug work must use a real Bug Jira key before creating or using a `bugfix/<BUG-JIRA-KEY>-bug-<slug>` branch.
- Every Task/Bug branch and commit must contain the real Jira issue key.
- Task/Bug Pull Requests target `develop`.
- The AI Agent may merge a Task/Bug Pull Request into `develop` only after required tests, CI checks, diff review, scope review, conflict checks and Supabase verification when applicable have passed.
- Never push directly to `develop` or `main`.
- Never force-push to `develop` or `main`.
- Keep Task, Story and Epic branches after merge when they are required as project evidence.
- Existing User Story and Epic branches are retained for traceability only. They do not require implementation commits, Pull Requests or merges.
- A User Story is completed through Acceptance Review on the latest `develop`.
- An Epic is completed through Integration/Regression Review on the latest `develop`.
- Do not create Story Pull Requests or Epic Pull Requests.
- Do not merge `develop` into `main`. Only the Project Owner performs the final release merge after Sprint Final Review passes.

## Jira Management Rule

Jira is managed manually by the Project Owner.

The AI Agent must not:

- change Jira issue status;
- add Jira workflow comments;
- create or link Jira Bugs;
- treat Jira MCP write access as an implementation requirement.

The AI Agent must:

- preserve the correct Jira key in branches, commits, Pull Requests and evidence;
- report the recommended Jira status;
- record Bug candidates with reproduction evidence;
- provide a concise manual Jira update queue for the Project Owner.

cập nhật điều này vào rules và thực hiện các yêu cầu sau
Hiện tại nhóm đang cùng nhau code nên khi bạn thực hiện bất kì sửa đổi gì đều phải commit và push lên 1 nhánh của tính năng hay lỗi vừa làm lên github đồng thời tạo PR lên develop

- **Commit Format:**
  - Định dạng: `<type>(<scope>): <Jira key> <mô tả ngắn bằng tiếng Anh>`.
  - Không dùng `git push --force` lên `main/develop`.
  - **Các kiểu commit thường dùng:**

| Type       | Dùng khi nào                            | Ví dụ                                            |
| ---------- | --------------------------------------- | ------------------------------------------------ |
| `feat`     | Thêm chức năng mới                      | `feat(pos): thêm màn hình tạo đơn bán hàng`      |
| `fix`      | Sửa lỗi                                 | `fix(auth): sửa lỗi không lưu session`           |
| `docs`     | Cập nhật tài liệu                       | `docs(uml): bổ sung sequence diagram checkout`   |
| `style`    | Sửa format code, không đổi logic        | `style(ui): căn chỉnh giao diện login`           |
| `refactor` | Tái cấu trúc code, không thêm tính năng | `refactor(order): tách logic tính tổng đơn hàng` |
| `test`     | Thêm/sửa test                           | `test(inventory): thêm test cho FEFO deduction`  |
| `chore`    | Việc phụ trợ: config, package, setup    | `chore(prisma): cập nhật schema và migration`    |
| `build`    | Thay đổi build/dependency               | `build(next): cập nhật cấu hình build frontend`  |
| `ci`       | Thay đổi GitHub Actions/CI              | `ci(github): thêm workflow kiểm tra lint`        |
| `perf`     | Tối ưu hiệu năng                        | `perf(graph): tối ưu truy vấn interaction rule`  |
| `revert`   | Hoàn tác commit                         | `revert: hoàn tác thay đổi checkout validation`  |

Không được push trực tiếp lên develop hay main

Với các lỗi thì tạo 1 issues BUG trên jira đồng thời tạo nhánh mới đúng với mã jira key của BUG vừa tạo và push code lên nhánh này với commit có ghi mã jira key và tạo PR vào develop

Thường xuyên pull code từ develop về để có các code mới của các thành viên khác
