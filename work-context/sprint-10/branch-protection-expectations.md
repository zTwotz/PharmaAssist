# GitHub Branch Protection Expectations

This document outlines the expected branch protection settings for the PharmaAssist repository. Because these settings are configured manually in the GitHub UI by the repository owner, the AI Agent cannot automate this process. 

## Required Setup for `develop` and `main` Branches

Please configure the following Branch Protection Rules in GitHub (`Settings` -> `Branches` -> `Add branch protection rule`):

### 1. Branch Name Pattern
- `develop`
- `main`

### 2. Required Pull Request Reviews
- **Require a pull request before merging:** ✅ Enabled
- **Require approvals:** At least 1 approval (can be bypassed by Project Owner if acting alone).
- **Dismiss stale pull request approvals when new commits are pushed:** ✅ Enabled

### 3. Required Status Checks
- **Require status checks to pass before merging:** ✅ Enabled
- **Require branches to be up to date before merging:** ✅ Enabled

**Select the following status checks as required:**
- `test-backend` (Unit Test Check)
- `test-frontend` (Unit Test Check)
- `integration-test-backend` (Integration Test Check)
- `lint-backend` (Lint Check)
- `lint-frontend` (Lint Check)
- `typecheck-backend` (Type Check)
- `typecheck-frontend` (Type Check)
- `build-backend` (Backend Build Check)
- `build-frontend` (Frontend Build Check)
- `prisma-validate` (Prisma Schema Validation Check)
- `prisma-migration` (Prisma Migration Check)

### 4. Do Not Allow Bypassing Settings
- **Do not allow bypassing the above settings:** ✅ Enabled (Optional but recommended for strict CI enforcement).

### 5. Restrict Pushes
- **Restrict who can push to matching branches:** ✅ Enabled (Only allow the Project Owner and designated integration agents to push directly or merge PRs).

---

By enforcing these rules, the project ensures that broken code, schema mismatches, and linting errors are caught *before* they are merged into the `develop` or `main` branches.
