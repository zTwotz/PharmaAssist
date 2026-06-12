# Document 20 — Testing, Demo & Setup Guide

# Tài liệu 20 — Hướng dẫn Setup, Testing & Demo

---

## Metadata

| Mục                     | Nội dung                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID             | DOC-20                                                                                                                                                                                                                                                                                                                                                                      |
| File name               | `20_testing_demo_setup_guide.md`                                                                                                                                                                                                                                                                                                                                            |
| Document Name           | Testing, Demo & Setup Guide                                                                                                                                                                                                                                                                                                                                                 |
| Tên tiếng Việt          | Hướng dẫn Setup, Testing và Demo                                                                                                                                                                                                                                                                                                                                            |
| Project                 | PharmaAssist AI Intelligence                                                                                                                                                                                                                                                                                                                                                |
| Version                 | 1.0 Draft                                                                                                                                                                                                                                                                                                                                                                   |
| Status                  | Draft                                                                                                                                                                                                                                                                                                                                                                       |
| Created Date            | 08/06/2026                                                                                                                                                                                                                                                                                                                                                                  |
| Last Updated            | 08/06/2026                                                                                                                                                                                                                                                                                                                                                                  |
| Owner                   | Tester / Release-Demo Owner                                                                                                                                                                                                                                                                                                                                                 |
| Reviewer                | Developer, Project Leader, Giảng viên hướng dẫn nếu cần                                                                                                                                                                                                                                                                                                                     |
| Baseline Source         | Document 06 — SRS, Document 07 — Roles/Permissions, Document 12 — API Specification, Document 13 — Database Design & ERD, Document 14 — Prisma Schema & Migration Design, Document 15 — UI/UX Screen Specification, Document 16 — AI Architecture, Document 17 — Graph-RAG Design, Document 18 — Data Strategy & Seed Plan, Document 19 — Project Management & Release Plan |
| Frontend                | Next.js                                                                                                                                                                                                                                                                                                                                                                     |
| Backend                 | NestJS / Node.js                                                                                                                                                                                                                                                                                                                                                            |
| ORM                     | Prisma                                                                                                                                                                                                                                                                                                                                                                      |
| Auth                    | Supabase Auth                                                                                                                                                                                                                                                                                                                                                               |
| Database                | PostgreSQL / Supabase PostgreSQL                                                                                                                                                                                                                                                                                                                                            |
| Graph Database          | Neo4j AuraDB                                                                                                                                                                                                                                                                                                                                                                |
| AI Provider             | Google AI Provider                                                                                                                                                                                                                                                                                                                                                          |
| AI Fallback             | MockAI                                                                                                                                                                                                                                                                                                                                                                      |
| Official Browser Target | Chrome desktop/laptop                                                                                                                                                                                                                                                                                                                                                       |
| Official Setup Path     | Local Node.js + cloud Supabase + Neo4j AuraDB                                                                                                                                                                                                                                                                                                                               |
| Docker                  | Optional local alternative only, not official setup path                                                                                                                                                                                                                                                                                                                    |
| Language Rule           | Nội dung chính viết bằng tiếng Việt; tên công nghệ, command, enum, API, module và thuật ngữ kỹ thuật giữ tiếng Anh khi cần                                                                                                                                                                                                                                                  |

---

## 1. Mục đích tài liệu

Tài liệu **Testing, Demo & Setup Guide** mô tả hướng dẫn setup chính thức, testing strategy, test scope, test types, high-risk module tests, demo reset, smoke test, release checklist và contingency evidence cho dự án **PharmaAssist AI Intelligence**.

Tài liệu này nhằm:

1. Hướng dẫn người mới setup dự án.
2. Xác định primary setup path chính thức.
3. Xác định environment requirements.
4. Ghi rõ cách cấu hình Supabase, PostgreSQL/Prisma, Neo4j, Google AI Provider và MockAI fallback.
5. Định nghĩa seed/demo setup.
6. Định nghĩa `demo:reset` workflow.
7. Định nghĩa safety guard cho `demo:reset`.
8. Xác định testing strategy.
9. Xác định recommended testing stack.
10. Ghi rõ testing stack hiện vẫn unresolved.
11. Xác định test types.
12. Xác định test scope theo module.
13. Xác định high-risk tests cho Checkout, FEFO, Interaction và AI Guardrail.
14. Xác định non-demo local testing rules.
15. Cấm destructive tests against demo database.
16. Xác định browser target.
17. Xác định smoke test checklist.
18. Xác định demo checklist.
19. Xác định release exit criteria.
20. Xác định contingency evidence.
21. Thiết lập traceability Testing → SRS/API/UI/Data.

Tài liệu này **không** viết lại SRS, không viết full API spec, không viết full ERD, không dùng Docker làm official setup path, không yêu cầu separate PostgreSQL database nếu baseline đã chốt không dùng, không chạy destructive tests against demo database, không xem screenshots/video thay thế running product và không bỏ high-risk tests cho Checkout/FEFO/Interaction/AI Guardrail.

---

## 2. Setup Overview

### 2.1. Official setup direction

Primary setup path của dự án là:

```text
Local Node.js development
+ Next.js frontend
+ NestJS backend
+ Prisma ORM
+ Cloud Supabase Auth/PostgreSQL
+ Neo4j AuraDB
+ Google AI Provider
+ MockAI fallback
```

Docker không phải setup path chính thức.

Docker có thể là optional local-development alternative nếu team muốn, nhưng không được viết như yêu cầu bắt buộc.

### 2.2. Setup goals

Setup phải giúp team chạy được:

1. Frontend Next.js.
2. Backend NestJS.
3. Supabase Auth integration.
4. Prisma migration/validation.
5. PostgreSQL connection.
6. Neo4j connection.
7. Google AI provider call.
8. MockAI fallback.
9. Seed data.
10. Demo reset local.
11. Smoke test.
12. Critical demo flows.

### 2.3. Environments

Recommended environments:

| Environment  | Purpose                                      | Notes                                            |
| ------------ | -------------------------------------------- | ------------------------------------------------ |
| `local`      | Local development and destructive demo reset | Only environment allowed for `demo:reset`        |
| `test`       | Optional non-demo testing config/schema      | No separate PostgreSQL DB is officially required |
| `demo`       | Demo/staging if created                      | Must not run destructive tests/reset             |
| `production` | Future/commercial only                       | Not primary MVP target                           |

### 2.4. Important baseline rules

1. Supabase Auth is official.
2. No custom password/JWT implementation.
3. No password/password_hash in PostgreSQL.
4. PostgreSQL is source of truth.
5. Neo4j is projection only.
6. MedicineBatch is inventory source of truth.
7. Checkout is official transaction boundary.
8. Interaction rule is ActiveIngredient–ActiveIngredient.
9. InteractionAlert must be persisted.
10. HIGH alert requires acknowledgement and consultation note.
11. Google AI Provider is preferred real AI provider.
12. MockAI is fallback only.
13. Graph Sync/Freshness is MVP.
14. Demo reset is local-only.

---

## 3. Environment Requirements

### 3.1. Required local tools

Recommended local tools:

1. Node.js LTS.
2. npm, pnpm, or yarn — team should standardize one.
3. Git.
4. VS Code or equivalent IDE.
5. Browser: Chrome desktop/laptop.
6. Postman or equivalent API client.
7. Supabase project access.
8. Neo4j AuraDB access.
9. Google AI Provider credentials.
10. Terminal/shell.

### 3.2. Recommended versions

Exact versions should be pinned in the project repository.

Recommended approach:

1. Use `.nvmrc` or `volta` config for Node version.
2. Commit lockfile.
3. Use consistent package manager.
4. Document Prisma version.
5. Document NestJS version.
6. Document Next.js version.
7. Document Playwright/browser install if used.

Example version policy:

| Tool            | Policy                               |
| --------------- | ------------------------------------ |
| Node.js         | Use project-pinned LTS               |
| Package manager | Use lockfile and team-agreed tool    |
| Prisma          | Use version from `package.json`      |
| Next.js         | Use version from `package.json`      |
| NestJS          | Use version from `package.json`      |
| Playwright      | Use version from lockfile if adopted |

### 3.3. Required accounts/services

The team needs access to:

1. Supabase project.
2. Supabase Auth Admin capability if provisioning demo users.
3. Supabase PostgreSQL connection string.
4. Neo4j AuraDB instance.
5. Google AI Provider key.
6. GitHub repository.
7. Jira project.

### 3.4. Security rules for setup

1. Do not commit `.env`.
2. Do not commit API keys.
3. Do not log secrets.
4. Do not store Supabase service role key in frontend.
5. Do not expose Google AI API key to frontend.
6. Do not expose Neo4j credentials to frontend.
7. Do not use demo/prod DB for destructive local tests.
8. Do not run `demo:reset` outside local.

---

## 4. Primary Setup Path

### 4.1. Step 1 — Clone repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 4.2. Step 2 — Install dependencies

If using npm:

```bash
npm install
```

If using pnpm:

```bash
pnpm install
```

The team should use only one official package manager.

### 4.3. Step 3 — Configure environment variables

Create local environment files from examples:

```text
.env.example → .env.local
```

Possible locations:

1. Root `.env`.
2. Backend `.env`.
3. Frontend `.env.local`.

The final repository should clearly document which file belongs to which app.

### 4.4. Step 4 — Validate Prisma

```bash
npx prisma validate
```

Then generate Prisma Client:

```bash
npx prisma generate
```

### 4.5. Step 5 — Apply migrations

For local development:

```bash
npx prisma migrate dev
```

For shared/demo-like environment, use a deploy-safe command and review migration first.

### 4.6. Step 6 — Seed data

Run seed command:

```bash
npm run seed
```

or project-specific equivalent.

For full local demo reset:

```bash
npm run demo:reset
```

with explicit local-only confirmation.

### 4.7. Step 7 — Run backend

```bash
npm run start:dev
```

or backend workspace command.

### 4.8. Step 8 — Run frontend

```bash
npm run dev
```

or frontend workspace command.

### 4.9. Step 9 — Run smoke test

```bash
npm run smoke
```

or manual smoke checklist if automated smoke command is not implemented.

### 4.10. Step 10 — Open app

Open frontend in Chrome desktop/laptop.

Recommended local URL:

```text
http://localhost:3000
```

Backend local URL may be:

```text
http://localhost:3001
```

Actual ports should be defined in `.env.example`.

---

## 5. Environment Variables

### 5.1. General environment variables

Recommended variables:

```env
APP_ENV=local
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001
```

### 5.2. PostgreSQL / Prisma

```env
DATABASE_URL=postgresql://...
SHADOW_DATABASE_URL=postgresql://...
```

Notes:

1. `DATABASE_URL` must point to intended local/non-demo environment.
2. `SHADOW_DATABASE_URL` must not point to demo/staging/prod.
3. Shadow DB is optional depending migration setup.
4. Automated tests must not destroy demo data.

### 5.3. Supabase

Frontend public variables:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Backend private variables:

```env
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_JWT_ISSUER=...
SUPABASE_JWKS_URL=...
```

Security note:

1. `SUPABASE_SERVICE_ROLE_KEY` must never be exposed in frontend.
2. Only backend should use service role key.
3. Frontend can use anon key.

### 5.4. Neo4j

```env
NEO4J_URI=neo4j+s://...
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=...
NEO4J_DATABASE=neo4j
GRAPH_SYNC_ENABLED=true
GRAPH_QUERY_TIMEOUT_MS=5000
```

### 5.5. AI Provider

```env
AI_PROVIDER_PRIMARY=GOOGLE_AI
AI_PROVIDER_FALLBACK=MOCK_AI
AI_FALLBACK_ENABLED=true
AI_GUARDRAIL_ENABLED=true
AI_AUDIT_ENABLED=true
AI_TIMEOUT_MS=15000
GOOGLE_AI_API_KEY=...
GOOGLE_AI_MODEL=...
```

### 5.6. Demo reset safety

```env
DEMO_RESET_CONFIRM=LOCAL_RESET_ALLOWED
DEMO_RESET_ALLOWED_ENV=local
```

Additional recommended guard:

```env
ALLOW_DESTRUCTIVE_LOCAL_RESET=false
```

Require explicit command flag to set it true.

### 5.7. Logging

```env
LOG_LEVEL=debug
REQUEST_ID_ENABLED=true
```

### 5.8. Environment variable checklist

| Variable group                                      |          Required for MVP |
| --------------------------------------------------- | ------------------------: |
| App URLs                                            |                       Yes |
| PostgreSQL `DATABASE_URL`                           |                       Yes |
| Supabase URL/anon key                               |                       Yes |
| Supabase service role key for backend admin actions |                       Yes |
| Neo4j credentials                                   |                       Yes |
| Google AI API key                                   | Yes if real provider used |
| MockAI fallback config                              |                       Yes |
| Demo reset guard                                    |                       Yes |
| Logging/request ID                                  |               Recommended |

---

## 6. Supabase Setup Notes

### 6.1. Supabase role

Supabase provides:

1. Authentication.
2. User credential management.
3. Password management.
4. Access token/session.
5. PostgreSQL hosting if used.

### 6.2. Supabase Auth setup

Required:

1. Enable email/password auth.
2. Configure allowed redirect URLs if needed.
3. Create demo users or allow backend seed to create them.
4. Ensure JWT verification works in backend.
5. Ensure frontend Supabase client can log in.

### 6.3. UserProfile mapping

After Supabase user exists, backend must create corresponding:

```text
user_profiles
```

with:

1. `supabase_user_id`.
2. `email`.
3. `full_name`.
4. `is_active`.
5. `must_change_password`.
6. assigned roles through `user_roles`.

### 6.4. Demo users

Required demo users:

1. Admin Demo.
2. Staff Demo.
3. Warehouse Demo.
4. New Staff Demo.

Primary demo accounts:

```text
must_change_password = false
```

New Staff Demo:

```text
must_change_password = true
```

### 6.5. Password storage rule

Do not store:

1. password.
2. password_hash.
3. hashed_password.
4. custom JWT tokens.

in PostgreSQL.

### 6.6. Supabase setup smoke checks

Verify:

1. Admin can log in.
2. Staff can log in.
3. Warehouse can log in.
4. New Staff is redirected to first-login password change.
5. Inactive user is denied.
6. Backend can resolve Supabase token to UserProfile.
7. Role/permission mapping loads correctly.

---

## 7. PostgreSQL / Prisma Setup

### 7.1. Prisma commands

Required validation:

```bash
npx prisma validate
```

Format:

```bash
npx prisma format
```

Generate client:

```bash
npx prisma generate
```

Local migration:

```bash
npx prisma migrate dev
```

Migration status:

```bash
npx prisma migrate status
```

### 7.2. Migration rules

1. Use Prisma migrations, not ad-hoc shared DB changes.
2. Do not use `db push` for shared/demo environments.
3. Review generated migration SQL.
4. Use raw SQL migration for partial unique indexes/check constraints if needed.
5. Do not edit already-applied migrations in shared branches.
6. Do not run destructive migration on demo DB without approval.

### 7.3. Required raw SQL constraints

Important constraints may include:

1. One successful payment per order.
2. Active unique role mapping.
3. Active unique medicine-ingredient mapping.
4. Active unique interaction pair.
5. Active unique interaction alert per order/rule.
6. Price > 0.
7. Quantity > 0 / non-negative constraints.

### 7.4. Prisma setup smoke checks

Verify:

1. `prisma validate` passes.
2. Prisma Client generates.
3. Migrations apply.
4. Required tables exist.
5. Required enums exist.
6. Unique constraints exist.
7. Partial unique indexes exist.
8. Seed can run.
9. No password/password_hash columns exist.
10. No aggregate inventory source table is used.

---

## 8. Neo4j Setup

### 8.1. Neo4j role

Neo4j is graph projection.

It stores:

1. `Medicine` nodes.
2. `ActiveIngredient` nodes.
3. `CONTAINS` relationships.
4. `INTERACTS_WITH` relationships.

It does not store:

1. Checkout truth.
2. Inventory truth.
3. Payment.
4. Invoice.
5. PII.
6. Consultation notes.
7. AI raw logs.

### 8.2. Neo4j AuraDB setup

Required:

1. Create Neo4j AuraDB instance.
2. Save URI.
3. Save username/password.
4. Configure backend environment variables.
5. Verify connectivity from backend.
6. Create uniqueness constraints if required.

### 8.3. Neo4j constraints

Recommended graph constraints:

1. Unique `Medicine.id`.
2. Unique `ActiveIngredient.id`.

Conceptual Cypher:

```cypher
CREATE CONSTRAINT medicine_id_unique IF NOT EXISTS
FOR (m:Medicine)
REQUIRE m.id IS UNIQUE;
```

```cypher
CREATE CONSTRAINT active_ingredient_id_unique IF NOT EXISTS
FOR (a:ActiveIngredient)
REQUIRE a.id IS UNIQUE;
```

### 8.4. Graph Sync setup

Required backend components:

1. Graph Sync Outbox.
2. Graph Sync Worker.
3. Retry handling.
4. Graph Sync Attempts.
5. Graph Projection Version.
6. Freshness detection.

### 8.5. Graph setup smoke checks

Verify:

1. Neo4j connection succeeds.
2. Graph Sync Worker can write.
3. Medicine nodes projected.
4. ActiveIngredient nodes projected.
5. CONTAINS relationships projected.
6. INTERACTS_WITH relationships projected.
7. Warfarin–Aspirin interaction path exists.
8. Graph freshness returns FRESH.
9. Graph-RAG returns provenance.
10. PostgreSQL fallback works when graph unavailable/stale.

---

## 9. AI Provider Setup

### 9.1. Google AI Provider

Google AI Provider is preferred real AI provider.

Setup requires:

1. API key.
2. Model name.
3. Backend environment variables.
4. Provider adapter implementation.
5. Timeout config.
6. Guardrail enabled.
7. AI Audit enabled.

### 9.2. MockAI fallback

MockAI fallback must be configured even if Google AI works.

Purpose:

1. Demo stability.
2. Offline/timeout fallback.
3. Predictable testing.
4. Guardrail and UI validation.

### 9.3. AI setup smoke checks

Verify:

1. Google AI provider config exists.
2. MockAI fallback config exists.
3. PromptTemplates are seeded and APPROVED.
4. AI explanation request works.
5. AI note draft request works.
6. Guardrail blocks unsafe input.
7. Provider timeout/failure can use MockAI fallback.
8. AI Audit Log is written.
9. AI Audit does not contain raw PII.
10. AI draft does not auto-save official note.

---

## 10. Seed / Demo Setup

### 10.1. Seed purpose

Seed data must support:

1. Auth/RBAC demo.
2. Supplier demo.
3. Medicine/ActiveIngredient demo.
4. Inventory/Batch demo.
5. Stock Import demo.
6. Inventory Adjustment demo.
7. POS demo.
8. Checkout with FEFO.
9. HIGH alert handling.
10. Payment/Invoice.
11. Reports.
12. AI Guardrail/Audit.
13. Graph Sync/Graph-RAG.

### 10.2. Seed data principles

1. Use curated operational seed.
2. Do not import full scraped catalog as official data.
3. Do not seed real personal data.
4. Do not seed selling price = 0.
5. Use dynamic expiry dates.
6. Create inventory through Stock Import/Adjustment/Checkout.
7. Rebuild graph from PostgreSQL.
8. Keep seed reproducible.

### 10.3. Required seed scenarios

1. Demo users.
2. Roles and permissions.
3. Suppliers.
4. Medicines.
5. ActiveIngredients.
6. Medicine–ActiveIngredient mappings.
7. DrugInteraction rules.
8. MedicineBatches.
9. Confirmed Stock Imports.
10. Inventory Adjustments.
11. PAID orders.
12. DRAFT orders.
13. CANCELLED orders.
14. Failed payment attempts.
15. HIGH unresolved alert.
16. HIGH resolved alert.
17. FEFO allocation.
18. PromptTemplates.
19. AI Audit demo logs.
20. Graph projection.

---

## 11. `demo:reset` Workflow

### 11.1. Purpose

`demo:reset` creates a reproducible local demo state.

It should:

1. Reset local PostgreSQL demo data.
2. Verify/provision Supabase demo users.
3. Seed curated operational data.
4. Rebuild Neo4j projection.
5. Check graph freshness.
6. Run smoke checks.
7. Print result summary.

### 11.2. Official restriction

`demo:reset` is local-only.

It must refuse to run in:

1. demo.
2. staging.
3. production.
4. unknown environment.

### 11.3. Suggested command

```bash
npm run demo:reset -- --confirm-local-reset
```

or equivalent.

### 11.4. Reset workflow steps

```text
1. Check APP_ENV is local.
2. Check explicit confirmation flag.
3. Check database URL is local/safe.
4. Check Supabase target is allowed.
5. Check Neo4j target is allowed.
6. Clear local MVP demo data safely.
7. Provision/check Supabase demo users.
8. Seed user_profiles.
9. Seed roles/permissions/user_roles.
10. Seed system settings.
11. Seed prompt templates.
12. Seed suppliers.
13. Seed medicines.
14. Seed active ingredients.
15. Seed medicine ingredient mappings.
16. Seed drug interaction rules.
17. Seed stock imports and details.
18. Confirm stock imports to create batches.
19. Seed inventory adjustments and confirm them.
20. Seed orders/order items.
21. Seed interaction alerts.
22. Seed payments/invoices/batch allocations.
23. Seed AI audit logs if needed.
24. Create graph sync events or run projection rebuild.
25. Rebuild Neo4j projection.
26. Run graph freshness check.
27. Run smoke checks.
28. Print PASS/FAIL summary.
```

### 11.5. Reset summary output

The script should print:

1. Environment.
2. Reset date.
3. Number of users.
4. Number of medicines.
5. Number of active ingredients.
6. Number of suppliers.
7. Number of batches.
8. Number of orders.
9. Number of paid orders.
10. Number of invoices.
11. Number of interaction alerts.
12. Number of graph nodes.
13. Number of graph relationships.
14. Smoke test result.

---

## 12. `demo:reset` Safety Guard

### 12.1. Required guard checks

Before destructive reset, check:

1. `APP_ENV === local`.
2. `NODE_ENV !== production`.
3. Database URL is allowed.
4. Demo reset confirmation flag exists.
5. Supabase project is safe.
6. Neo4j instance is safe.
7. User typed explicit confirmation or passed required flag.

### 12.2. Refusal behavior

If environment is not safe:

```text
Demo reset refused. This command is allowed only in local environment and must not run against demo, staging, production, or unknown databases.
```

### 12.3. Must not run destructive tests against demo database

No test or script may:

1. Truncate demo database.
2. Delete demo seed.
3. Reset demo Supabase users.
4. Clear demo Neo4j.
5. Run destructive integration tests on demo environment.

### 12.4. Allowed destructive actions

Allowed only in local:

1. Truncate local seed data.
2. Recreate local demo data.
3. Rebuild local/demo-safe Neo4j projection.
4. Re-provision local demo users if configured safely.

---

## 13. Testing Strategy

### 13.1. Testing objective

Testing must prove that the MVP is:

1. Functionally correct.
2. Safe for demo.
3. Stable across critical flows.
4. Aligned with baseline.
5. Traceable to requirements.
6. Protected against high-risk failures.

### 13.2. Testing priorities

Priority order:

1. Auth/RBAC.
2. Medicine/ActiveIngredient.
3. MedicineBatch/Inventory.
4. Stock Import.
5. Inventory Adjustment.
6. POS.
7. Checkout.
8. FEFO.
9. InteractionAlert.
10. HIGH alert acknowledgement/note.
11. AI Guardrail/Audit.
12. Graph Sync/Graph-RAG.
13. Reports.
14. Demo reset/smoke.

### 13.3. Risk-based testing

High-risk areas must get deeper tests:

1. Checkout.
2. FEFO.
3. Interaction.
4. AI Guardrail.
5. Graph freshness/fallback.
6. Authorization.
7. Demo reset.

### 13.4. Testing principles

1. Test critical path early.
2. Test failure modes, not only happy path.
3. Test backend validation, not only UI validation.
4. Test permission denial.
5. Test rollback behavior.
6. Test seed/demo data.
7. Test graph fallback.
8. Test AI refusal.
9. Keep tests isolated.
10. Do not run destructive tests against demo database.

---

## 14. Recommended Testing Stack

### 14.1. Recommended tools

Recommended stack:

| Test Type               | Recommended Tool                 |
| ----------------------- | -------------------------------- |
| Backend unit            | Jest                             |
| Backend integration/API | Jest + Supertest                 |
| Frontend component      | React Testing Library            |
| End-to-end              | Playwright                       |
| Manual API collection   | Postman                          |
| Smoke scripts           | npm scripts / custom Node script |
| Prisma validation       | Prisma CLI                       |
| CI                      | GitHub Actions                   |

### 14.2. Testing stack unresolved status

The official automated-testing toolchain is **not fully finalized**.

Recommended default remains:

1. Jest.
2. Supertest.
3. React Testing Library.
4. Playwright.
5. Postman.

Until explicitly adopted, team may use equivalent tools, but must still cover:

1. Unit tests.
2. Integration/API tests.
3. UI/component sanity tests.
4. E2E critical flows.
5. Manual/Postman validation.
6. Smoke checks.
7. CI gates.

### 14.3. Coverage rule

No global mandatory coverage percentage applies to the whole codebase.

However, high-risk modules should target approximately **70% meaningful coverage** as a reference:

1. Checkout.
2. FEFO.
3. Interaction.
4. AI Guardrail.

This is not cosmetic coverage. Priority is critical-path and failure-mode tests.

---

## 15. Test Types

### 15.1. Unit tests

Purpose:

1. Test pure logic.
2. Test business rules.
3. Test validators.
4. Test service helpers.
5. Test guardrail functions.

Examples:

1. FEFO sort.
2. Canonical interaction pair key.
3. Cash change calculation.
4. Near-expiry calculation.
5. Guardrail input classification.
6. PII redaction.
7. Graph freshness calculation.

### 15.2. Integration tests

Purpose:

1. Test services with database.
2. Test transaction behavior.
3. Test module integration.
4. Test rollback.

Examples:

1. Stock Import confirm creates batches.
2. Inventory Adjustment prevents negative stock.
3. Checkout deducts batch stock.
4. Checkout creates payment/invoice.
5. InteractionAlert persists.
6. Graph Sync outbox created.

### 15.3. API tests

Purpose:

1. Validate REST contract.
2. Validate auth/permission.
3. Validate request validation.
4. Validate error response.
5. Validate idempotency.

Can be automated with Supertest or manually with Postman.

### 15.4. Frontend component tests

Purpose:

1. Validate UI component behavior.
2. Validate forms.
3. Validate role-based visible/hidden actions.
4. Validate error states.

Examples:

1. Checkout button disabled if HIGH unresolved.
2. Staff sidebar hides Inventory Dashboard.
3. Warehouse sidebar hides POS.
4. Consultation note field requires non-empty text.
5. AI refusal state renders.

### 15.5. E2E tests

Purpose:

Test real user flows through frontend and backend.

Critical E2E flows:

1. Login.
2. First-login password change.
3. Stock Import confirm.
4. Inventory Adjustment confirm.
5. POS to Checkout.
6. HIGH alert handling.
7. AI note draft confirmation.
8. FEFO checkout.
9. Invoice view.
10. Graph-RAG fallback.
11. Reports.

### 15.6. Manual/Postman tests

Purpose:

1. Validate API quickly.
2. Share demo evidence.
3. Reproduce bugs.
4. Support evaluator review.

Postman collection should include:

1. Auth/profile.
2. Medicine.
3. Supplier.
4. Inventory.
5. Stock Import.
6. POS/Order.
7. Checkout.
8. InteractionAlert.
9. AI.
10. Graph-RAG.
11. Reports.
12. Settings.

### 15.7. Smoke tests

Purpose:

Quick check that demo state is usable.

Smoke tests run:

1. After setup.
2. After demo reset.
3. Before release freeze.
4. Before presentation.

### 15.8. Regression tests

Purpose:

Ensure bugfix does not break critical flows.

Regression areas:

1. Auth.
2. Checkout.
3. InteractionAlert.
4. AI Guardrail.
5. Graph Sync.
6. Reports.
7. Demo reset.

---

## 16. Test Scope by Module

---

### 16.1. Auth/RBAC

Test:

1. Admin login.
2. Staff login.
3. Warehouse login.
4. Invalid login.
5. Inactive user denied.
6. UserProfile mapping.
7. First-login password change.
8. Role-based navigation.
9. Permission-based backend guard.
10. Staff ownership.
11. Warehouse denied POS.
12. Staff denied inventory dashboard.
13. Admin all-scope access.

Must verify:

1. No password/password_hash in PostgreSQL.
2. Supabase Auth used.
3. Custom JWT/password design not present.

---

### 16.2. Medicine / ActiveIngredient

Test:

1. Create Medicine.
2. Edit Medicine.
3. Deactivate Medicine.
4. Selling price > 0.
5. Min stock >= 0.
6. Create ActiveIngredient.
7. Duplicate ingredient blocked.
8. Medicine–ActiveIngredient mapping.
9. Duplicate active mapping blocked.
10. Graph Sync outbox created after relevant changes.

---

### 16.3. Supplier

Test:

1. Admin create/update/deactivate supplier.
2. Warehouse create/update supplier.
3. Warehouse cannot deactivate supplier.
4. Inactive supplier cannot be used for new import.
5. Supplier appears in Stock Import selector.

---

### 16.4. MedicineBatch

Test:

1. Batch created from confirmed Stock Import.
2. Batch number required.
3. Expiry date required.
4. Quantity non-negative.
5. Existing same medicine + same batch + same expiry merges quantity.
6. Same medicine + same batch + different expiry rejected.
7. Expired batch excluded from sellable stock.
8. Near-expiry uses default 90 days.
9. Low-stock uses sellable quantity.
10. No direct quantity edit.

---

### 16.5. Stock Import

Test:

1. Create Draft Import.
2. Add details.
3. Validate supplier required.
4. Validate batch number required.
5. Validate expiry date required.
6. Validate quantity > 0.
7. Confirm import.
8. Confirm creates/updates MedicineBatch.
9. Confirmed import read-only.
10. Cannot double confirm.
11. Cancel Draft.
12. Cannot confirm cancelled import.
13. Expiry mismatch rejected.
14. Audit recorded.

---

### 16.6. Inventory Adjustment

Test:

1. Create Draft Adjustment.
2. Reason required.
3. Batch required.
4. Quantity change cannot be 0.
5. Preview after quantity.
6. Negative stock blocked.
7. Confirm adjustment.
8. Confirmed adjustment read-only.
9. Correction requires new adjustment.
10. Audit recorded.

---

### 16.7. POS

Test:

1. Staff creates Draft Order.
2. Staff adds active Medicine.
3. Inactive Medicine cannot be added.
4. Quantity > 0.
5. Update quantity.
6. Remove item.
7. Interaction check triggered after item change.
8. Draft persists after validation failure.
9. Staff sees own orders only.
10. Admin can view all.

---

### 16.8. Checkout

Test:

1. Checkout requires DRAFT order.
2. Checkout requires items.
3. Checkout blocks unresolved HIGH alert.
4. Checkout validates stock.
5. Checkout applies FEFO.
6. Checkout excludes expired batch.
7. Checkout deducts batch quantity.
8. Checkout creates allocation records.
9. Checkout creates SUCCESS payment.
10. Checkout creates invoice.
11. Checkout marks order PAID.
12. Checkout is atomic.
13. Checkout rollback on failure.
14. Checkout idempotency prevents duplicate payment/invoice/stock deduction.
15. Same idempotency key + different payload rejected.

---

### 16.9. Payment / Invoice

Test:

1. Cash amount tendered >= total.
2. Change amount calculated.
3. Bank transfer simulation requires transaction reference.
4. Failed payment attempt retained.
5. Only one SUCCESS payment per order.
6. Invoice created only after successful payment.
7. One invoice per order.
8. Invoice items snapshot data.
9. No invoice for DRAFT/CANCELLED.
10. Payment/invoice cannot be created outside checkout as official completion flow.

---

### 16.10. InteractionAlert

Test:

1. Interaction rule uses ActiveIngredient pair.
2. Medicine-level official rule not used.
3. LOW/MEDIUM alert displays but does not block checkout.
4. HIGH alert displays and blocks checkout.
5. Alert persists.
6. Display count increments.
7. Last displayed time updates.
8. Alert becomes inactive when no longer applicable.
9. HIGH acknowledgement saved.
10. HIGH consultation note saved.
11. Checkout requires both ack and note.
12. Warehouse has no access.
13. Admin history screen shows alerts.

---

### 16.11. AI Guardrail

Test:

1. AI explanation works.
2. AI note draft works.
3. AI draft is not official note.
4. Staff must confirm note.
5. Unsafe diagnosis request blocked.
6. Unsafe prescribing request blocked.
7. Unsafe dosage request blocked.
8. Request to bypass HIGH alert blocked.
9. PII redaction works.
10. Output guardrail blocks unsafe provider output.
11. Structured output validation works.
12. Google AI timeout/failure falls back to MockAI.
13. AI Audit written.
14. AI Audit contains prompt version.
15. AI Audit does not contain raw PII.

---

### 16.12. Graph Sync / Graph-RAG

Test:

1. Medicine change creates outbox.
2. ActiveIngredient change creates outbox.
3. Mapping change creates outbox.
4. Interaction rule change creates outbox.
5. Worker creates Medicine nodes.
6. Worker creates ActiveIngredient nodes.
7. Worker creates CONTAINS relationships.
8. Worker creates INTERACTS_WITH relationships.
9. INTERACTS_WITH canonical direction.
10. Query treats interaction symmetrically.
11. Worker retries failure.
12. Failed job marks graph stale.
13. Freshness detection works.
14. Graph-RAG returns provenance.
15. Stale graph uses PostgreSQL fallback for interaction explanation.
16. Pure graph query returns safe error if no fallback.
17. Staff cannot submit raw Cypher.
18. Warehouse cannot access Graph-RAG in MVP.

---

### 16.13. Reports

Test:

1. Revenue report includes only PAID orders.
2. DRAFT excluded.
3. CANCELLED excluded.
4. Failed payment excluded.
5. Top Medicines ranking correct.
6. Inventory report uses MedicineBatch.
7. Expired excluded from sellable quantity.
8. Near-expiry uses system setting default 90 days.
9. Filter by date works.
10. Warehouse can access inventory report only.

---

## 17. High-risk Tests

---

### 17.1. Checkout high-risk tests

Checkout is high-risk because it touches:

1. Order.
2. Order items.
3. MedicineBatch.
4. FEFO allocation.
5. Payment.
6. Invoice.
7. InteractionAlert.
8. Idempotency.
9. Audit.

Required tests:

| Test                                     | Expected                            |
| ---------------------------------------- | ----------------------------------- |
| Checkout with normal order               | PAID + payment + invoice            |
| Checkout with insufficient stock         | Rollback, Draft preserved           |
| Checkout with unresolved HIGH            | Blocked                             |
| Checkout with resolved HIGH              | Success                             |
| Checkout duplicate request same key      | Same result, no duplicate deduction |
| Checkout duplicate key different payload | Rejected                            |
| Checkout payment failure                 | No inconsistent invoice             |
| Checkout concurrent stock race           | No negative stock                   |

---

### 17.2. FEFO high-risk tests

Required tests:

| Test                           | Expected                           |
| ------------------------------ | ---------------------------------- |
| Multiple sellable batches      | Nearest expiry allocated first     |
| Quantity spans batches         | Allocation split correctly         |
| Expired batch exists           | Expired batch ignored              |
| Near-expiry batch exists       | Still sellable if not expired      |
| Insufficient sellable quantity | Checkout blocked                   |
| Allocation record              | Shows batch number/expiry snapshot |

---

### 17.3. Interaction high-risk tests

Required tests:

| Test                   | Expected                 |
| ---------------------- | ------------------------ |
| Warfarin + Aspirin     | HIGH alert               |
| LOW/MEDIUM alert       | Non-blocking             |
| HIGH unresolved        | Checkout blocked         |
| HIGH acknowledged only | Still blocked            |
| HIGH note only         | Still blocked            |
| HIGH ack + note        | Checkout allowed         |
| Alert displayed again  | display_count increments |
| Item removed           | alert inactive           |
| Rule inactive          | no active alert          |

---

### 17.4. AI Guardrail high-risk tests

Required tests:

| Test                     | Expected                                    |
| ------------------------ | ------------------------------------------- |
| Ask for diagnosis        | Blocked                                     |
| Ask for prescription     | Blocked                                     |
| Ask for dosage           | Blocked                                     |
| Ask to bypass HIGH alert | Blocked                                     |
| PII-heavy input          | Redacted/minimized                          |
| Google AI timeout        | MockAI fallback                             |
| Provider unsafe output   | Hidden/refused                              |
| AI note draft            | Not saved automatically                     |
| Staff confirms draft     | Official note saved                         |
| AI Audit                 | Records provider, prompt version, guardrail |

---

## 18. Non-demo Local Testing Rules

### 18.1. No separate PostgreSQL database requirement

The project has decided:

```text
No separate PostgreSQL database is officially required for automated tests.
```

Therefore tests must use safe isolation.

### 18.2. Acceptable isolation strategies

Possible strategies:

1. Dedicated local test schema if technically possible.
2. Transaction rollback per test.
3. Test data prefix/suffix and cleanup.
4. In-memory mocks for pure unit tests.
5. Local-only disposable seed.
6. Non-demo local environment.

### 18.3. Rules

1. Do not run destructive tests against demo database.
2. Do not truncate shared/demo data.
3. Do not reset Supabase demo users during automated tests.
4. Do not clear Neo4j demo projection unless local-only.
5. Use test-specific data.
6. Cleanup after tests.
7. Avoid test order dependency.

---

## 19. No Destructive Tests Against Demo Database

### 19.1. Forbidden actions

Forbidden against demo/staging/prod:

1. `TRUNCATE`.
2. `DROP TABLE`.
3. `DELETE FROM` broad tables.
4. `prisma migrate reset`.
5. `demo:reset`.
6. Graph wipe.
7. Supabase user mass delete.
8. Destructive E2E cleanup.
9. Seeding over demo data without approval.

### 19.2. If demo data needs refresh

Use controlled release/demo process:

1. Backup or confirm reproducibility.
2. Project Leader approval.
3. Release/Demo Owner runs approved script.
4. Smoke test afterward.
5. Record result.

### 19.3. CI rule

CI must not point to demo database for destructive integration tests.

---

## 20. Browser Target

### 20.1. Official browser target

MVP browser target:

```text
Chrome desktop/laptop
```

### 20.2. Required browser checks

1. Login works on Chrome.
2. POS works on Chrome.
3. Checkout works on Chrome.
4. Tables/forms usable.
5. Graph-RAG screen usable.
6. Reports view usable.
7. AI Copilot panel usable.

### 20.3. Not required for MVP

1. Full Safari testing.
2. Full Firefox testing.
3. Full Edge testing.
4. Full mobile-browser support.
5. Full tablet optimization.

---

## 21. Basic Responsive Checks

### 21.1. Required responsive checks

Basic checks only:

1. 1366x768 desktop.
2. 1440x900 desktop.
3. Laptop viewport.
4. Basic smaller width with sidebar collapse if implemented.
5. Tables horizontally scroll if needed.
6. POS remains usable on laptop.
7. Checkout panel readable.
8. Forms do not overflow badly.

### 21.2. Mobile rule

Full mobile UI is Future/Commercial.

If opened on small screen, MVP can show:

1. Usable fallback layout, or
2. Message recommending desktop/laptop for POS workflow.

---

## 22. Smoke Test Checklist

### 22.1. Smoke test purpose

Smoke test verifies the system is ready for demo.

Smoke test is not full regression, but must catch demo blockers.

### 22.2. Smoke test — setup

Verify:

| Check                                      | Expected |
| ------------------------------------------ | -------- |
| Frontend starts                            | PASS     |
| Backend starts                             | PASS     |
| Prisma connects                            | PASS     |
| Supabase connects                          | PASS     |
| Neo4j connects                             | PASS     |
| Google AI config present or fallback ready | PASS     |
| MockAI fallback works                      | PASS     |
| Seed data exists                           | PASS     |

### 22.3. Smoke test — auth

Verify:

1. Admin login.
2. Staff login.
3. Warehouse login.
4. New Staff redirects to first-login flow.
5. Inactive user denied if seeded.
6. Staff/Warehouse menus differ correctly.

### 22.4. Smoke test — inventory

Verify:

1. Inventory Summary loads.
2. Batch Detail loads.
3. Expired batch appears as expired.
4. Near-expiry batch appears.
5. Low-stock indicator works.
6. Staff cannot access general Inventory Summary.

### 22.5. Smoke test — stock import

Verify:

1. Warehouse can create Draft Stock Import.
2. Add detail line.
3. Confirm import.
4. Batch created/updated.
5. Confirmed import read-only.

### 22.6. Smoke test — inventory adjustment

Verify:

1. Warehouse can create adjustment.
2. Reason required.
3. Negative stock blocked.
4. Confirm adjustment.
5. Batch quantity updated.

### 22.7. Smoke test — POS/checkout

Verify:

1. Staff opens POS.
2. Create Draft Order.
3. Add normal medicine.
4. Add HIGH interaction pair.
5. HIGH alert appears.
6. Checkout blocked.
7. Acknowledge HIGH alert.
8. Add consultation note.
9. Checkout allowed.
10. Cash payment succeeds.
11. Order becomes PAID.
12. Invoice generated.
13. Batch allocation visible.

### 22.8. Smoke test — AI

Verify:

1. AI explanation works.
2. AI note draft works.
3. Draft does not auto-save.
4. Guardrail refusal works for unsafe request.
5. AI Audit Log records event.
6. Fallback indicator works if MockAI used.

### 22.9. Smoke test — Graph

Verify:

1. Graph projection fresh.
2. Graph-RAG query returns path.
3. Provenance visible.
4. No raw Cypher UI.
5. PostgreSQL fallback works if graph unavailable/stale scenario is tested.

### 22.10. Smoke test — Reports

Verify:

1. Revenue Report loads.
2. Top Medicines Report loads.
3. Inventory Report loads.
4. DRAFT/CANCELLED excluded from revenue.
5. Expired stock excluded from sellable quantity.

### 22.11. Smoke test result

Smoke test result should be recorded as:

| Result                      | Meaning                                     |
| --------------------------- | ------------------------------------------- |
| PASS                        | Demo can proceed                            |
| PASS with known limitations | Demo can proceed with notes                 |
| FAIL                        | Demo should not proceed until blocker fixed |

---

## 23. Demo Checklist

### 23.1. Before demo

Verify:

1. Correct branch/build.
2. Environment variables loaded.
3. Demo reset completed.
4. Smoke test PASS.
5. Demo accounts ready.
6. Supabase users ready.
7. Neo4j projection fresh.
8. AI provider/fallback ready.
9. Browser cache/session cleaned if needed.
10. Demo script open.
11. Backup screenshots/Postman collection ready.
12. Network stable.

### 23.2. Recommended demo flow

Recommended demo order:

1. Login as Admin.
2. Show Dashboard.
3. Show User/Role/Permission briefly.
4. Show Medicine and ActiveIngredient.
5. Show Supplier.
6. Login as Warehouse or switch role.
7. Show Stock Import confirm.
8. Show Inventory Summary and Batch Detail.
9. Show Inventory Adjustment.
10. Login as Staff.
11. Create POS Draft Order.
12. Add medicines causing HIGH alert.
13. Show checkout blocked.
14. Show AI explanation.
15. Generate AI note draft.
16. Confirm acknowledgement and consultation note.
17. Checkout with FEFO.
18. Show invoice.
19. Show Order Detail and batch allocations.
20. Login as Admin.
21. Show InteractionAlert History.
22. Show AI Audit Log.
23. Show Graph-RAG and provenance.
24. Show Reports.
25. Show System Settings near-expiry threshold.

### 23.3. Demo must show baseline strengths

Demo should clearly show:

1. Supabase Auth.
2. RBAC.
3. MedicineBatch inventory.
4. FEFO.
5. Transactional checkout.
6. ActiveIngredient-level interaction.
7. Persisted InteractionAlert.
8. HIGH alert acknowledgement/note.
9. AI Guardrail/Audit.
10. Google AI / MockAI fallback.
11. Neo4j Graph Sync.
12. Graph-RAG with provenance/freshness.
13. Reports.
14. Demo seed/reset stability.

### 23.4. Demo fallback behavior

If Google AI fails:

1. Show MockAI fallback indicator.
2. Explain fallback is designed for demo stability.
3. AI Audit should show fallback used.

If Neo4j fails:

1. Show PostgreSQL fallback for interaction explanation if applicable.
2. Show safe error for pure graph query.
3. Do not claim graph is fresh.

If UI issue occurs:

1. Use Postman collection for API evidence.
2. Use screenshots only as contingency evidence.
3. Running product remains primary.

---

## 24. Release Exit Criteria

### 24.1. Required exit criteria

Release/demo exit requires:

1. CI passes.
2. No open P0 bug.
3. P1 bugs fixed or documented with accepted workaround.
4. Smoke test PASS.
5. Demo reset local works.
6. Supabase demo users ready.
7. Prisma migration validated.
8. Seed data valid.
9. Neo4j projection fresh or fallback documented.
10. AI provider/fallback ready.
11. High-risk tests passed.
12. Critical demo flows passed.
13. Release/Demo Owner sign-off.
14. Tester sign-off.
15. Project Leader approval.

### 24.2. P0 blockers

P0 blockers include:

1. Cannot login.
2. Role navigation broken.
3. POS cannot create order.
4. Checkout broken.
5. FEFO broken.
6. HIGH alert not blocking checkout.
7. HIGH ack/note not saved.
8. Payment/invoice inconsistent.
9. Demo reset broken.
10. Seed data missing.
11. App cannot start.
12. Database migration broken.

### 24.3. P1 blockers

P1 issues include:

1. AI fallback broken but main provider works.
2. Graph-RAG degraded but fallback works.
3. Report filter minor bug.
4. Non-critical UI state bug.
5. Slow response but demo still possible.

### 24.4. Test exit report

Tester should prepare a short test exit report:

1. Test date.
2. Build/branch.
3. Environment.
4. Smoke result.
5. High-risk tests result.
6. Open bugs.
7. Known limitations.
8. Recommendation: PASS / PASS with limitations / FAIL.

---

## 25. Contingency Evidence

### 25.1. Purpose

Contingency evidence supports presentation if a live issue happens.

It does not replace running product.

### 25.2. Allowed evidence

1. Screenshots.
2. Postman collection.
3. Optional video.
4. Smoke test output.
5. Seed reset output.
6. CI output.
7. Graph projection screenshot.
8. AI Audit screenshot.
9. Invoice screenshot.
10. Reports screenshot.

### 25.3. Screenshots

Recommended screenshots:

1. Login.
2. Role-based dashboard.
3. Medicine/ActiveIngredient.
4. Inventory Summary.
5. Stock Import confirm.
6. POS Draft Order.
7. HIGH alert.
8. AI note draft.
9. Checkout success.
10. Invoice.
11. InteractionAlert History.
12. AI Audit Log.
13. Graph-RAG result.
14. Reports.
15. System Settings.

### 25.4. Postman collection

Postman collection should include:

1. Auth/profile.
2. Medicine.
3. Supplier.
4. Inventory.
5. Stock Import.
6. POS/Order.
7. Interaction check.
8. InteractionAlert ack/note.
9. Checkout.
10. Invoice.
11. AI explanation.
12. Graph-RAG.
13. Reports.
14. Settings.

### 25.5. Optional video

Backup video is optional, not mandatory.

If created, it should show:

1. POS to checkout.
2. HIGH alert.
3. AI Copilot.
4. FEFO allocation.
5. Graph-RAG.
6. Reports.

### 25.6. Important rule

Screenshots, Postman collection and optional video are backup evidence only.

They do **not** replace the running MVP product.

---

## 26. Traceability Testing → SRS / API / UI / Data

### 26.1. Testing to SRS

| Test Area            | SRS Requirement  |
| -------------------- | ---------------- |
| Auth/RBAC            | FR-AUTH, FR-RBAC |
| Medicine             | FR-MED           |
| ActiveIngredient     | FR-ACT           |
| Supplier             | FR-SUP           |
| MedicineBatch        | FR-BAT           |
| Stock Import         | FR-STI           |
| Inventory Adjustment | FR-ADJ           |
| POS                  | FR-POS           |
| Checkout             | FR-CHK           |
| Payment              | FR-PAY           |
| Invoice              | FR-INV           |
| DrugInteraction      | FR-DRG           |
| InteractionAlert     | FR-ALT           |
| AI Copilot           | FR-AIC           |
| AI Guardrail         | FR-AIG           |
| AI Audit             | FR-AIA           |
| Graph Sync           | FR-GSY           |
| Graph-RAG            | FR-GRG           |
| Reports              | FR-RPT           |
| Settings             | FR-SET           |
| Demo Reset           | FR-DMO           |

### 26.2. Testing to API

| Test Area        | API Group                                      |
| ---------------- | ---------------------------------------------- |
| Auth             | Auth/Profile APIs                              |
| User/RBAC        | User/Role/Permission APIs                      |
| Medicine         | Medicine APIs                                  |
| ActiveIngredient | ActiveIngredient APIs                          |
| Supplier         | Supplier APIs                                  |
| Inventory        | Inventory APIs                                 |
| Stock Import     | Stock Import APIs                              |
| Adjustment       | Inventory Adjustment APIs                      |
| POS              | Order/POS APIs                                 |
| Checkout         | Checkout API                                   |
| Payment/Invoice  | Payment read APIs, Invoice APIs                |
| InteractionAlert | Interaction APIs, InteractionAlert APIs        |
| AI               | AI Copilot APIs, AI Audit APIs                 |
| Graph            | Graph-RAG APIs, Graph Sync APIs if implemented |
| Reports          | Reports APIs                                   |
| Settings         | System Settings APIs                           |
| Demo             | Demo reset internal/local command              |

### 26.3. Testing to UI

| Test Area        | UI Screens                                |
| ---------------- | ----------------------------------------- |
| Auth             | Login, First-login                        |
| RBAC             | Role-based navigation                     |
| Medicine         | Medicine screens                          |
| ActiveIngredient | ActiveIngredient screens                  |
| Supplier         | Supplier screens                          |
| Inventory        | Inventory Summary, Batch Detail           |
| Stock Import     | Stock Import screens                      |
| Adjustment       | Inventory Adjustment screens              |
| POS              | POS Draft Order                           |
| InteractionAlert | Alert Panel, Alert History                |
| AI               | AI Copilot, AI Audit Log                  |
| Checkout         | Checkout Route/Panel                      |
| Invoice          | Invoice View                              |
| Graph            | Graph Explorer, Graph-RAG                 |
| Reports          | Revenue, Top Medicines, Inventory Reports |
| Settings         | System Settings                           |
| Demo             | Demo flow screens                         |

### 26.4. Testing to Data

| Test Area   | Seed Data Required                             |
| ----------- | ---------------------------------------------- |
| Auth        | Demo users                                     |
| RBAC        | Roles/permissions                              |
| Medicine    | Curated medicines                              |
| Ingredient  | Curated active ingredients                     |
| FEFO        | Multi-batch medicine                           |
| Expiry      | Expired and near-expiry batches                |
| Interaction | Warfarin–Aspirin HIGH                          |
| Checkout    | Checkout-ready draft order                     |
| Payment     | SUCCESS and FAILED payment scenarios           |
| Invoice     | Paid orders with invoices                      |
| Reports     | 5–10 paid orders                               |
| AI          | PromptTemplates and InteractionAlert           |
| Graph       | Projected Medicine/Ingredient/Interaction data |
| Smoke       | Full demo seed                                 |

---

## 27. Testing Quality Checklist

Before final submission, verify:

| Checklist item                                         | Expected |
| ------------------------------------------------------ | -------- |
| Primary setup path documented                          | Yes      |
| Docker not official setup path                         | Yes      |
| Supabase Auth setup documented                         | Yes      |
| Prisma setup documented                                | Yes      |
| Neo4j setup documented                                 | Yes      |
| Google AI setup documented                             | Yes      |
| MockAI fallback documented                             | Yes      |
| demo:reset local-only                                  | Yes      |
| No destructive tests against demo DB                   | Yes      |
| Testing stack unresolved status stated                 | Yes      |
| Recommended testing stack stated                       | Yes      |
| Unit/integration/API/UI/E2E/manual/smoke tests defined | Yes      |
| Auth/RBAC tests defined                                | Yes      |
| Checkout tests defined                                 | Yes      |
| FEFO tests defined                                     | Yes      |
| InteractionAlert tests defined                         | Yes      |
| AI Guardrail tests defined                             | Yes      |
| Graph Sync/Graph-RAG tests defined                     | Yes      |
| Reports tests defined                                  | Yes      |
| Chrome desktop/laptop target stated                    | Yes      |
| Basic responsive checks stated                         | Yes      |
| Smoke checklist included                               | Yes      |
| Demo checklist included                                | Yes      |
| Release exit criteria included                         | Yes      |
| Contingency evidence included                          | Yes      |
| Screenshots/video not treated as replacement           | Yes      |
| Traceability included                                  | Yes      |

---

## 28. Kết luận

Document 20 — Testing, Demo & Setup Guide đã xác định hướng dẫn setup, testing strategy, demo reset, smoke test, release checklist và contingency evidence cho **PharmaAssist AI Intelligence**.

Tài liệu này đã làm rõ:

1. Primary setup path là Local Node.js + Next.js + NestJS + Prisma + cloud Supabase + Neo4j AuraDB + Google AI Provider + MockAI fallback.
2. Docker không phải setup path chính thức.
3. Environment requirements đã được xác định.
4. Environment variables đã được phân nhóm.
5. Supabase setup notes đã được ghi rõ.
6. PostgreSQL/Prisma setup đã được xác định.
7. Neo4j setup đã được xác định.
8. AI provider setup đã được xác định.
9. Seed/demo setup đã được xác định.
10. `demo:reset` workflow đã được mô tả.
11. `demo:reset` chỉ được phép chạy local.
12. Destructive tests against demo database bị cấm.
13. Testing strategy dùng risk-based testing.
14. Recommended testing stack là Jest, Supertest, React Testing Library, Playwright và Postman.
15. Testing stack vẫn unresolved cho đến khi team chính thức adopt.
16. Test types gồm Unit, Integration, API, Frontend Component, E2E, Manual/Postman và Smoke.
17. Test scope by module đã được xác định.
18. High-risk tests cho Checkout, FEFO, Interaction và AI Guardrail đã được đặc tả.
19. Non-demo local testing rules đã được ghi rõ.
20. Browser target là Chrome desktop/laptop.
21. Basic responsive checks đã được xác định.
22. Smoke test checklist đã được cung cấp.
23. Demo checklist đã được cung cấp.
24. Release exit criteria đã được xác định.
25. Contingency evidence gồm screenshots, Postman collection và optional video, nhưng không thay thế running product.
26. Traceability Testing → SRS/API/UI/Data đã được thiết lập.

Các baseline quan trọng được giữ đúng:

1. Supabase Auth là auth chính thức.
2. Không dùng custom username/password/JWT.
3. Không lưu password/password_hash trong PostgreSQL.
4. PostgreSQL là source of truth.
5. Neo4j là graph projection.
6. MedicineBatch là inventory source of truth.
7. Checkout là transaction chính thức.
8. FEFO là bắt buộc.
9. Interaction rule ở cấp ActiveIngredient–ActiveIngredient.
10. InteractionAlert phải persist.
11. HIGH alert cần acknowledgement và consultation note.
12. AI Guardrail và AI Audit là MVP.
13. Google AI Provider là provider ưu tiên.
14. MockAI chỉ là fallback.
15. Graph Sync/Freshness là MVP.
16. Catalog data chỉ là reference; demo seed phải curated.
17. demo:reset chỉ local.
18. Screenshots/Postman/video chỉ là contingency evidence.

Document 20 hoàn tất bộ consolidated documentation từ Document 01 đến Document 20 ở mức blueprint hiện tại. Bước tiếp theo hợp lý là rà soát toàn bộ 20 tài liệu theo thứ tự, kiểm tra lặp nội dung, traceability, naming consistency, MVP/Should-have/Future classification và chuẩn hóa final formatting trước khi xuất bản chính thức.
