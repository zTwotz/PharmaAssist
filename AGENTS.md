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
- Do not code directly on main.
- Do not replace Supabase Auth with custom JWT.
- Do not store password_hash in PostgreSQL.
- Do not implement all 100 tables as required Sprint 1 scope.
- Sprint 1 only focuses on Auth, Supabase Auth, RBAC and User Account.
- Every completed task must have evidence in `/work-context/evidence`.
- If existing code conflicts with baseline, report the conflict before changing code.
- Do not delete existing working modules without evidence and explanation.
## PR and Merge Rule

Default merge flow:

Task branch -> User Story branch -> develop

Do not merge task branches directly into develop unless the task is independent and approved.

Each task branch must contain the real Jira issue key.

Each User Story branch must also contain the real Jira issue key of the User Story.

Example:

Task branch:
feature/PAC-251-TASK-041-admin-create-staff-form

User Story branch:
feature/PAC-49-US-10-admin-create-staff-account

PR flow:
1. Create PR from task branch into User Story branch.
2. Merge task PR after tests pass.
3. After all task branches are merged, test the User Story branch.
4. Create PR from User Story branch into develop.
5. Merge into develop only after the User Story branch passes tests.
