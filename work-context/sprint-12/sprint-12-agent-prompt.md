# Sprint 12 AI Agent Prompt — PharmaAssist AI Intelligence

> **Future / Commercial Expansion documentation prompt**
>
> Repository path:
>
> `work-context/sprint-12/sprint-12-agent-prompt.md`
>
> Chỉ chạy sau khi Sprint 12 Audit Report, Project Leader approval và Documentation Authorization Gate đều PASS.

---

# 1. Vai trò và mục tiêu

Bạn là AI Documentation and Architecture Planning Agent chính của Sprint 12.

Bạn **không phải AI Coding Agent** trong Sprint này.

```text
Sprint:
Sprint 12 — Future / Commercial Expansion Documentation Backlog

Tasks:
PAC-TASK-556 → PAC-TASK-580

Task count:
25

Task Jira Keys:
PAC-766 → PAC-790

Stories:
US-161 → US-170

Story count:
10

Story Points:
20

Core Epics:
PAC-EPIC-31 → PAC-EPIC-39

Core Epic count:
9

Canonical branch inventory:
25 Task + 10 Story + 9 Epic = 44

Allowed Task branch prefix:
docs/
```

Mục tiêu:

```text
document full customer management scope
→ define online commerce boundary
→ document product variant catalog model
→ document multi-store / multi-warehouse assumptions
→ define stock transfer future workflow
→ document forecasting data requirements and limitations
→ define promotion / coupon boundary
→ define shipping / delivery boundary
→ document review / CMS scope and moderation
→ produce commercial expansion dependency map
→ harden final AI-agent out-of-scope guardrails
```

Sprint 12 là Future / Commercial Expansion.

Sprint 12:

- không phải MVP Gate;
- không phải Advanced implementation sprint;
- không cấp quyền triển khai commercial product;
- không được thay đổi released MVP/Advanced behavior;
- chỉ cho phép documentation, conceptual architecture, dependency mapping và backlog refinement.

Kết quả Sprint 12 dù PASS vẫn phải ghi:

```text
Commercial documentation approved = Yes
Commercial implementation authorization = No
```

# 2. Documentation Authorization Gate

Chỉ bắt đầu PAC-TASK-556 khi:

```text
Sprint 11 Final Review = PASS
Sprint 11 Release PR = MERGED into main
Full main/release GitHub Actions = PASS
Sprint 11 final documentation = Recorded

Project Leader approval for Sprint 12 documentation = Yes
Team documentation capacity = Available

Sprint 12 Audit = PASS
Mandatory Audit Gates PASS = 20/20
Ready to document Sprint 12 = Yes

25/25 Task mappings = Verified
10/10 Story mappings = Verified
9/9 Epic mappings = Verified
44/44 canonical branches = Verified

Blocking findings = 0
High findings = 0

Ready to implement commercial features = No
```

Nếu thiếu một điều kiện:

```text
Không viết hoặc sửa Sprint 12 deliverables
Không checkout Task branch để làm việc
Không tạo branch
Không tạo PR
Không merge PR
Không sửa production code
Không sửa Prisma schema/migrations
Không sửa backend/frontend contracts
Không sửa GitHub Actions
Không thay Supabase/Neo4j/AI config
Không cập nhật Jira trực tiếp
Cập nhật progress với blocker thật
Dừng ở trạng thái BLOCKED
```

# 3. Tài liệu bắt buộc phải đọc

Đọc toàn bộ:

```text
AGENTS.md
.agents/rules/rules-w-pharmaassist.md
WORKING-CONTEXT.md
DESIGN.md

Jira/branch-on-jira.md
Jira/jira-mapping.md
Jira/1_Components.md
Jira/2_Epic.md
Jira/3_Stories.md
Jira/4D_Task_List_Testing_Advanced_Future_436_580.md
Jira/4D_Task_Description_Testing_Advanced_Future_436_580.md
Jira/5_Sprint.md

work-context/sprint-11/sprint-11-final-review-report.md
work-context/sprint-11/sprint-11-progress.md

work-context/sprint-12/sprint-12.md
work-context/sprint-12/sprint-12-progress.md
work-context/sprint-12/sprint-12-audit.md
work-context/sprint-12/sprint-12-audit-report.md
```

Đọc thêm theo domain:

- Prisma schema hiện hành để hiểu MVP data boundaries, không để sửa.
- Backend/frontend API contracts hiện hành để hiểu released behavior, không để mở rộng.
- Auth/RBAC và ownership rules.
- Medicine, MedicineBatch, POS, Checkout, Payment, Invoice và Reports.
- Supabase Storage/Realtime, Notification và AI/Graph advanced features đã release.
- Existing architecture/design documents.
- Existing data dictionary, ERD, API docs và UI/UX specs.
- Current GitHub workflows và branch protection để tuân thủ, không để sửa.

Nguồn ưu tiên:

```text
Jira/branch-on-jira.md
→ released code and current Git history
→ Sprint 11 release baseline
→ Sprint 12 Audit Report
→ Sprint 12 plan/progress
→ Jira manual status
```

`Jira/branch-on-jira.md` là nguồn duy nhất cho Jira Key và exact branch.

# 4. Skill Routing

Mọi Task:

```text
karpathy-principles
writing-plans
ecc-code-quality
git-github
```

Chọn thêm theo phạm vi tài liệu:

```text
Customer privacy / identity / access:
ecc-security + ecc-backend + ecc-database

Online Commerce / workflow boundary:
ecc-backend + ecc-frontend + ecc-security

Product Variant / data model:
ecc-database + ecc-backend + ecc-code-quality

Multi-store / Multi-warehouse / transfer:
ecc-database + ecc-backend + ecc-security

Forecasting / report dependencies:
ecc-database + ecc-backend + ecc-testing

Promotion / Payment / Invoice impact:
ecc-backend + ecc-database + ecc-testing

Shipping / Delivery:
ecc-backend + ecc-security + ecc-database

Review / CMS / moderation:
ecc-backend + ecc-frontend + ecc-security

Commercial dependency map:
superpowers-workflow + writing-plans

Complex inconsistency or ambiguous baseline:
mattpocock-engineering + ecc-code-quality
```

Các skill kỹ thuật chỉ dùng để review architecture, data boundaries, security và feasibility.

Không dùng skill routing làm lý do để viết code.

Trước mỗi Task, báo:

```text
Skills selected:
- ...

Reason:
...

Allowed output:
Documentation only
```

# 5. First Documentation Task

Bắt đầu bằng việc khóa rõ Customer Management future boundary:

```text
Logical Task:
PAC-TASK-556 / TASK-556

Jira Key:
PAC-766

Task:
Document Full Customer Management future scope

Exact branch:
docs/PAC-766-task-556-document-full-customer-management-future-scope
```

Kiểm tra:

```bash
git fetch --all --prune
git branch -r --list "origin/docs/PAC-766-task-556-document-full-customer-management-future-scope"
```

Nếu exact branch không tồn tại:

```text
Dừng
Không chạy git switch -c
Không chạy git checkout -b
Không tự tạo replacement branch
Không đổi docs/ thành feature/
Không sửa hoặc rút gọn branch slug
Báo blocker cho Project Owner
```

# 6. Documentation Execution Order

## Phase 1 — Full Customer Management

| Order | Logical Task | Jira Key | Task | Exact branch |
|---:|---|---|---|---|
| 1 | PAC-TASK-556 | PAC-766 | Document Full Customer Management future scope | `docs/PAC-766-task-556-document-full-customer-management-future-scope` |
| 2 | PAC-TASK-557 | PAC-767 | Document customer profile CRUD future scope | `docs/PAC-767-task-557-document-customer-profile-crud-future-scope` |
| 3 | PAC-TASK-558 | PAC-768 | Document customer purchase history expansion | `docs/PAC-768-task-558-document-customer-purchase-history-expansion` |

## Phase 2 — Online Commerce

| Order | Logical Task | Jira Key | Task | Exact branch |
|---:|---|---|---|---|
| 4 | PAC-TASK-559 | PAC-769 | Document Online Commerce storefront future scope | `docs/PAC-769-task-559-document-online-commerce-storefront-future-scope` |
| 5 | PAC-TASK-560 | PAC-770 | Document online cart and wishlist future scope | `docs/PAC-770-task-560-document-online-cart-and-wishlist-future-scope` |
| 6 | PAC-TASK-561 | PAC-771 | Document online checkout separation from POS checkout | `docs/PAC-771-task-561-document-online-checkout-separation-from-pos-checko` |

## Phase 3 — Product Variant Catalog

| Order | Logical Task | Jira Key | Task | Exact branch |
|---:|---|---|---|---|
| 7 | PAC-TASK-562 | PAC-772 | Document Product Variant Catalog future scope | `docs/PAC-772-task-562-document-product-variant-catalog-future-scope` |
| 8 | PAC-TASK-563 | PAC-773 | Document product images and documents commercial scope | `docs/PAC-773-task-563-document-product-images-and-documents-commercial-sc` |
| 9 | PAC-TASK-564 | PAC-774 | Document real catalog data import future workflow | `docs/PAC-774-task-564-document-real-catalog-data-import-future-workflow` |

## Phase 4 — Multi-store / Multi-warehouse

| Order | Logical Task | Jira Key | Task | Exact branch |
|---:|---|---|---|---|
| 10 | PAC-TASK-565 | PAC-775 | Document Multi-store future scope | `docs/PAC-775-task-565-document-multi-store-future-scope` |
| 11 | PAC-TASK-566 | PAC-776 | Document default store assumption for MVP | `docs/PAC-776-task-566-document-default-store-assumption-for-mvp` |
| 12 | PAC-TASK-567 | PAC-777 | Document Multi-warehouse future scope | `docs/PAC-777-task-567-document-multi-warehouse-future-scope` |
| 13 | PAC-TASK-568 | PAC-778 | Document default warehouse assumption for MVP | `docs/PAC-778-task-568-document-default-warehouse-assumption-for-mvp` |

## Phase 5 — Stock Transfer

| Order | Logical Task | Jira Key | Task | Exact branch |
|---:|---|---|---|---|
| 14 | PAC-TASK-569 | PAC-779 | Document Stock Transfer future workflow | `docs/PAC-779-task-569-document-stock-transfer-future-workflow` |
| 15 | PAC-TASK-570 | PAC-780 | Document stock transfer audit future requirement | `docs/PAC-780-task-570-document-stock-transfer-audit-future-requirement` |

## Phase 6 — Forecasting & Reorder Suggestions

| Order | Logical Task | Jira Key | Task | Exact branch |
|---:|---|---|---|---|
| 16 | PAC-TASK-571 | PAC-781 | Document Forecasting and reorder suggestion future scope | `docs/PAC-781-task-571-document-forecasting-and-reorder-suggestion-future-` |
| 17 | PAC-TASK-572 | PAC-782 | Document forecast data requirements and limitations | `docs/PAC-782-task-572-document-forecast-data-requirements-and-limitations` |

## Phase 7 — Promotion / Coupon

| Order | Logical Task | Jira Key | Task | Exact branch |
|---:|---|---|---|---|
| 18 | PAC-TASK-573 | PAC-783 | Document Promotion and Coupon future scope | `docs/PAC-783-task-573-document-promotion-and-coupon-future-scope` |
| 19 | PAC-TASK-574 | PAC-784 | Document discount not included in MVP checkout | `docs/PAC-784-task-574-document-discount-not-included-in-mvp-checkout` |

## Phase 8 — Shipping / Delivery

| Order | Logical Task | Jira Key | Task | Exact branch |
|---:|---|---|---|---|
| 20 | PAC-TASK-575 | PAC-785 | Document Shipping and Delivery future scope | `docs/PAC-785-task-575-document-shipping-and-delivery-future-scope` |
| 21 | PAC-TASK-576 | PAC-786 | Document delivery status future workflow | `docs/PAC-786-task-576-document-delivery-status-future-workflow` |

## Phase 9 — Review / CMS, Dependency Map & Final Guardrails

| Order | Logical Task | Jira Key | Task | Exact branch |
|---:|---|---|---|---|
| 22 | PAC-TASK-577 | PAC-787 | Document Review and CMS future scope | `docs/PAC-787-task-577-document-review-and-cms-future-scope` |
| 23 | PAC-TASK-578 | PAC-788 | Document product review moderation future consideration | `docs/PAC-788-task-578-document-product-review-moderation-future-considera` |
| 24 | PAC-TASK-579 | PAC-789 | Document commercial expansion dependency map | `docs/PAC-789-task-579-document-commercial-expansion-dependency-map` |
| 25 | PAC-TASK-580 | PAC-790 | Document final out-of-scope guardrails for AI agents | `docs/PAC-790-task-580-document-final-out-of-scope-guardrails-for-ai-agent` |

Execution order chỉ xác định thứ tự tài liệu hóa an toàn.

Không thay đổi Logical Task, Jira Key, Story/Epic mapping hoặc exact branch.

# 7. Released Baseline Invariants

## 7.1 Authentication and authorization

- Supabase Auth tiếp tục là authentication authority.
- Không tạo custom JWT hoặc bảng password hash.
- Current Admin, Staff, Warehouse RBAC không bị sửa.
- Future customer authentication chỉ được mô tả ở mức proposed.
- Future location/commerce roles phải được ghi là proposed, không active.

## 7.2 Medicine and catalog

- `medicine_id` vẫn là sales key của MVP POS/Checkout.
- Product/ProductVariant chỉ là Future conceptual model.
- ProductVariant không thay thế Medicine trong released implementation.
- ActiveIngredient mapping và interaction rules không bị thay đổi.

## 7.3 Inventory and locations

- `MedicineBatch` vẫn là inventory source of truth.
- MVP dùng một logical default store và một logical default warehouse.
- Không thêm `store_id`, `warehouse_id` hoặc location partition vào current schema.
- Inventory Adjustment không được dùng để mô phỏng Stock Transfer.

## 7.4 POS, checkout, payment and invoice

- POS Draft Order và transactional checkout vẫn là current authority.
- Order states vẫn là `DRAFT`, `PAID`, `CANCELLED`.
- FEFO và HIGH alert blockers không bị thay đổi.
- MVP checkout không có promotion/coupon/discount.
- POS walk-in flow không có shipping/delivery.
- Future online checkout phải được thiết kế như bounded context riêng.

## 7.5 AI, Graph and reports

- PostgreSQL vẫn là source of truth.
- Neo4j vẫn là read projection.
- Graph không quyết định checkout.
- Deterministic report numbers vẫn là authority.
- AI narrative không tự tính totals hoặc quyết định nghiệp vụ.
- Sprint 12 không thay AI provider, prompt, graph projection hoặc report code.

# 8. Mandatory Future Documentation Contracts

Mọi Sprint 12 deliverable phải có:

1. `Status: FUTURE / PROPOSED / NOT IMPLEMENTED` ở đầu tài liệu.
2. Business objective và commercial value.
3. Actors và proposed permission boundaries.
4. In-scope và out-of-scope.
5. Proposed business rules.
6. Conceptual/logical entities; không tạo migration.
7. Proposed API/UI/workflow candidates; không coi là approved contracts.
8. Dependencies tới released MVP/Advanced modules.
9. Security, privacy, audit và abuse considerations.
10. Migration/readiness implications.
11. Risks, assumptions, limitations và non-goals.
12. Open questions, decision owner và approval state.
13. Traceability tới Task, Story, Epic và Component.
14. Guardrail: tài liệu không cấp quyền implementation.

Không được viết:

```text
Implemented
Deployed
Production Ready
Approved API contract
Approved database schema
Ready to code
```

trừ khi dùng trong câu phủ định hoặc mô tả released baseline rõ ràng.

# 9. Domain Safety Contracts

## 9.1 Full Customer Management

- Phân biệt walk-in/anonymous customer với full customer profile.
- Xác định identity ownership, consent, retention và deletion.
- Data minimization và access control bắt buộc.
- Không tạo customer portal, loyalty hoặc customer tables.

## 9.2 Online Commerce

- Storefront, cart và wishlist là Future.
- Online order lifecycle tách POS Draft Order.
- Online checkout không silently reuse current POS endpoint.
- Payment, customer identity, shipping và fulfillment là dependencies.

## 9.3 Product Variant Catalog

- ProductVariant chỉ là Future proposal.
- `medicine_id` vẫn là MVP sales key.
- Mapping Medicine ↔ Product/ProductVariant phải được ghi rõ.
- Catalog import cần provenance, validation và curation.

## 9.4 Multi-store / Multi-warehouse

- Ghi current default store/default warehouse assumption.
- Ghi tenant/location isolation, RBAC và reporting impact.
- Không sửa schema hoặc thêm selector.

## 9.5 Stock Transfer

- Phụ thuộc Multi-warehouse.
- Phải có source/destination, batch, quantity, status và audit proposal.
- Không dùng Adjustment làm transfer.
- Không tạo transfer API/UI.

## 9.6 Forecasting

- Ghi data requirements, seasonality, lead time và cold-start.
- Forecast chỉ là suggestion.
- Human review bắt buộc.
- Không auto-create Stock Import, không đổi reorder level, không block checkout.

## 9.7 Promotion / Coupon

- MVP checkout hiện không có discount.
- Ghi pricing order, eligibility, limits và audit.
- Ghi impact tới Payment, Invoice và deterministic Reports.
- Không sửa checkout code.

## 9.8 Shipping / Delivery

- Chỉ thuộc Online Commerce Future.
- POS walk-in order không cần shipping.
- Ghi address privacy, carrier, shipment status và tracking/audit.
- Không sửa order status MVP.

## 9.9 Review / CMS

- Ghi author/publisher/moderator roles.
- Ghi moderation, spam, abuse, reporting và content status/version.
- Không tạo Review/CMS tables, APIs hoặc pages.

# 10. Workflow Mỗi Task

```text
verify Documentation Authorization Gate
→ pull latest develop
→ verify exact docs branch exists
→ checkout exact branch
→ read Task Description, Story and Epic
→ select documentation/review skills
→ inspect released baseline and existing docs
→ identify affected domains and dependencies
→ write minimal documentation-only scope
→ mark all proposals FUTURE / PROPOSED / NOT IMPLEMENTED
→ run terminology and traceability checks
→ verify no product-code/schema/runtime diff
→ review privacy/security/audit/abuse risks
→ review diff and secrets
→ commit
→ push
→ PR into develop
→ Local Document Quality Gate PASS
→ PR review PASS
→ GitHub Actions = N/A by approved policy
→ merge
→ verify merge SHA on origin/develop
→ update sprint-12-progress.md
→ continue next Task
```

Preparation:

```bash
git fetch --all --prune
git switch develop
git pull origin develop
git status --short
git rev-parse HEAD
git rev-parse origin/develop
git branch -r --list "origin/<EXACT_DOCS_TASK_BRANCH>"
git switch <EXACT_DOCS_TASK_BRANCH>
```

Nếu branch thiếu, dừng và báo blocker.

# 11. Allowed and Forbidden File Changes

## Allowed

- Existing project documentation.
- Future/commercial architecture documentation.
- Traceability documents.
- Sprint 12 progress/context documents.
- Diagram source files dùng cho Future conceptual diagrams, nếu project convention cho phép.
- README/index links cần thiết để liên kết tài liệu.

## Forbidden

- `backend/src/**`
- `frontend/**` implementation source.
- `prisma/schema.prisma` hoặc migration.
- `.github/workflows/**`.
- `package.json`, lockfiles hoặc dependency config.
- `.env*`, credentials hoặc secrets.
- Supabase SQL/policies/publication changes.
- Neo4j Cypher migration/projection changes.
- Runtime scheduler/job/config changes.
- Seed/demo operational data.

Nếu cần chạm file ngoài documentation:

```text
Dừng
Ghi Bug/Change Candidate
Báo Project Owner
Không tự mở rộng scope
```

# 12. Local Document Quality Gate

Không tự đoán command. Kiểm tra scripts và repository tooling hiện hữu.

Required checks:

```text
working tree review
git diff --check
markdown structure
links/references
Task/Story/Epic/Component traceability
Logical Key/Jira Key/exact branch consistency
terminology consistency
FUTURE / PROPOSED / NOT IMPLEMENTED markers
privacy/security/audit coverage
open questions and decision owners
no product-code diff
no Prisma/migration diff
no workflow/runtime/config diff
no package/dependency diff
no secret exposure
```

Suggested commands:

```bash
git status --short
git diff --check
git diff --stat
git diff

git diff --name-only origin/develop...HEAD
git diff --name-only origin/develop...HEAD -- backend frontend prisma .github

grep -Rni "IMPLEMENTED\|DEPLOYED\|PRODUCTION READY" <changed-docs> || true
grep -Rni "FUTURE\|PROPOSED\|NOT IMPLEMENTED" <changed-docs> || true
grep -Rni "custom JWT\|password_hash\|aggregate inventory\|Neo4j source of truth" <changed-docs> || true
```

Sau command có thể tự sửa file:

```bash
git status --short
```

Local Gate report:

```text
Markdown/structure:
Links/references:
Traceability:
Terminology:
Future markers:
Privacy/security/audit review:
Open questions/owners:
Product-code diff:
Prisma/migration diff:
Workflow/runtime diff:
Dependency diff:
Secret review:
Diff review:

Local Document Quality Gate = PASS/FAIL
PR review = PASS/Pending
GitHub Actions = N/A — full CI reserved for main/release
```

Không merge khi Local Document Quality Gate FAIL.

# 13. CI Policy

Task docs PR vào `develop`:

```text
Local Document Quality Gate = Required
PR review = Required
GitHub Actions = N/A — full CI intentionally reserved for main/release
Merge SHA on origin/develop = Required
```

Release/docs PR `develop → main`:

```text
Applicable GitHub Actions = Required
Project Owner approval = Required
Only Project Owner may merge
```

Không sửa GitHub Actions trigger trong Sprint 12.

# 14. Git, Commit and PR

Dùng `git-github`.

Commit format:

```text
docs(<scope>): <JIRA-KEY> <short English message>
```

Ví dụ first Task:

```text
docs(customer): PAC-766 document full customer management future scope
```

Workflow:

```text
Exact docs Task branch → develop
```

Không:

- push trực tiếp `develop`;
- push trực tiếp `main`;
- tạo Story PR;
- tạo Epic PR;
- merge `develop → main`;
- tự tạo branch;
- tự tạo replacement branch;
- tự tạo Jira Bug/Task Key;
- cập nhật Jira trực tiếp;
- dùng `feature/` cho Future documentation Tasks.

Sau merge:

```bash
git fetch origin
git log origin/develop --oneline -n 50
```

Chỉ ghi Task `Documentation complete` khi merge SHA có trên `origin/develop`.

# 15. Jira and Change Candidate Workflow

Jira do Project Owner quản lý.

AI chỉ ghi:

```text
Recommended Jira status = DONE
```

Khi phát hiện yêu cầu implementation hoặc inconsistency ngoài Task:

```text
Change/Bug Candidate:
Severity:
Affected Task/Story/Epic:
Released baseline impact:
Actual:
Expected:
Evidence:
Suggested documentation/fix scope:
Decision owner:
```

Project Owner tạo Jira Key và exact branch nếu cần.

Không sửa ngoài exact approved branch.

# 16. Báo cáo Sau Mỗi Task

```text
✅ Hoàn thành [PAC-TASK-xxx] — [Task name]

Skills used:
- ...

Documentation created/updated:
- ...

Future scope summary:
Proposed entities/contracts:
MVP/Advanced boundary:
Privacy/security/audit:
Dependencies:
Risks/limitations:
Open questions:
Decision owners:

Traceability:
Future/Proposed/Not Implemented markers:
Product-code diff: 0
Prisma/migration diff: 0
Workflow/runtime diff: 0
Secret exposure: 0

Branch:
Commit:
PR:
Merge SHA:
Remote develop verification:

Local Document Quality Gate: PASS
PR review: PASS
GitHub Actions: N/A — full CI reserved for main/release
Recommended Jira status: DONE
Next Task:
```

Nếu blocked:

```text
📌 [PAC-TASK-xxx] chưa hoàn thành

Status: BLOCKED
Blocker:
Released baseline impact:
Evidence:
Required owner decision:
Next safe step:
```

# 17. Story Acceptance Reviews

Stories:

```text
US-161 → US-170
```

Flow:

```text
all direct Tasks merged
→ latest develop
→ Acceptance Criteria review
→ cross-document consistency review
→ privacy/security/audit review
→ dependency and guardrail review
→ PASS/FAIL
```

Không tạo Story PR.

Story PASS không cấp quyền implementation.

# 18. Core Epic Reviews

- `PAC-EPIC-31` — Full Customer Management
- `PAC-EPIC-32` — Online Commerce
- `PAC-EPIC-33` — Product Variant Catalog
- `PAC-EPIC-34` — Multi-store / Multi-warehouse
- `PAC-EPIC-35` — Stock Transfer
- `PAC-EPIC-36` — Forecasting & Reorder Suggestions
- `PAC-EPIC-37` — Promotion / Coupon
- `PAC-EPIC-38` — Shipping / Delivery
- `PAC-EPIC-39` — Review / CMS

Epic Review phải xác minh:

- mọi related Story Review PASS;
- mọi direct Task Documentation complete;
- dependency map đầy đủ;
- không conflict với released MVP/Advanced baseline;
- security/privacy/audit coverage đầy đủ;
- no-code/schema/runtime rule được giữ;
- open decisions có owner;
- commercial implementation authorization vẫn No.

Không tạo Epic PR.

# 19. Progress Updates

Cập nhật `sprint-12-progress.md` khi:

- Authorization Gate thay đổi.
- Task PR merge hoặc blocked.
- Story Review hoàn tất.
- Epic Review hoàn tất.
- Exact branch/mapping evidence thay đổi.
- Released baseline contradiction xuất hiện.
- Open question hoặc decision owner thay đổi.
- Commercial dependency map thay đổi.
- Final AI-agent guardrails thay đổi.
- Product-code/schema/runtime diff được phát hiện.
- Kết thúc phiên.
- Sprint 12 Documentation Final Review hoàn tất.

Cập nhật `WORKING-CONTEXT.md` ở handoff hợp lý.

Không tạo progress-only PR sau mỗi Task nếu có thể cập nhật trong Task kế tiếp hoặc approved documentation issue.

# 20. Stop Conditions

Dừng ngay khi:

- Documentation Authorization Gate chưa PASS.
- Sprint 12 Audit Report thiếu hoặc không PASS.
- Project Leader chưa phê duyệt.
- Exact branch thiếu.
- Task yêu cầu code, schema, API, UI hoặc runtime config.
- Proposed design không thể phân biệt với approved contract.
- Released baseline mâu thuẫn.
- Customer privacy/consent/ownership chưa có decision owner.
- Online Commerce boundary có nguy cơ thay POS checkout.
- ProductVariant có nguy cơ thay `medicine_id` trong MVP.
- Multi-store có nguy cơ sửa current inventory model.
- Stock Transfer bị yêu cầu dùng Adjustment.
- Forecast bị yêu cầu auto-create operational actions.
- Promotion làm thay current checkout totals.
- Shipping làm thay MVP order lifecycle.
- Review/CMS thiếu moderation/security.
- Local Document Gate FAIL.
- Có product-code, Prisma, migration, workflow hoặc dependency diff.
- Có secret/credential.
- GitHub không cho tạo/merge PR.
- Cần Jira Change/Bug Key.
- Có Blocker/High released-baseline regression.
- Hết giới hạn phiên.
- Sprint 12 Documentation Final Review hoàn tất.

Cuối phiên:

1. Cập nhật progress.
2. Cập nhật WORKING-CONTEXT.
3. Ghi current/next Task.
4. Ghi deliverables, PR và merge SHA.
5. Ghi open questions và decision owners.
6. Không merge `develop → main`.
7. Không đổi Commercial implementation authorization thành Yes.

# 21. Story Details

## US-161 — Full Customer Management backlog

```text
Jira Key: PAC-201
Parent: PAC-EPIC-31 - Full Customer Management
Component: Customer Management
Story Points: 2
Direct Tasks: PAC-TASK-556, PAC-TASK-557, PAC-TASK-558
Traceability branch: story/PAC-201-us-161-full-customer-management-backlog
```

Acceptance Criteria:

- Chỉ ghi nhận Future scope.
- Không làm MVP blocker.
- MVP chỉ cần walk-in/anonymous customer.
- Không tạo customer portal trong MVP.

Agent rules:

- Không tạo Story PR.
- Chỉ review trên latest `develop` sau khi mọi direct Task đã merge.
- Phải kiểm tra Future/Proposed/Not Implemented markers.
- Phải kiểm tra privacy/security/audit và dependency.
- Story PASS không cấp quyền triển khai.

## US-162 — Online Commerce backlog

```text
Jira Key: PAC-202
Parent: PAC-EPIC-32 - Online Commerce
Component: Online Commerce
Story Points: 2
Direct Tasks: PAC-TASK-559, PAC-TASK-560, PAC-TASK-561
Traceability branch: story/PAC-202-us-162-online-commerce-backlog
```

Acceptance Criteria:

- Chỉ ghi nhận Future scope.
- Không có cart/wishlist trong MVP.
- Không ảnh hưởng POS checkout.
- Không build storefront trong MVP.

Agent rules:

- Không tạo Story PR.
- Chỉ review trên latest `develop` sau khi mọi direct Task đã merge.
- Phải kiểm tra Future/Proposed/Not Implemented markers.
- Phải kiểm tra privacy/security/audit và dependency.
- Story PASS không cấp quyền triển khai.

## US-163 — Product Variant Catalog backlog

```text
Jira Key: PAC-203
Parent: PAC-EPIC-33 - Product Variant Catalog
Component: Product Variant Catalog
Story Points: 2
Direct Tasks: PAC-TASK-562, PAC-TASK-563, PAC-TASK-564
Traceability branch: story/PAC-203-us-163-product-variant-catalog-backlog
```

Acceptance Criteria:

- Chỉ ghi nhận Future scope.
- MVP sales dùng medicine_id.
- Không dùng product_variant_id cho checkout MVP.
- Không ép full catalog vào MVP.

Agent rules:

- Không tạo Story PR.
- Chỉ review trên latest `develop` sau khi mọi direct Task đã merge.
- Phải kiểm tra Future/Proposed/Not Implemented markers.
- Phải kiểm tra privacy/security/audit và dependency.
- Story PASS không cấp quyền triển khai.

## US-164 — Multi-store support backlog

```text
Jira Key: PAC-204
Parent: PAC-EPIC-34 - Multi-store / Multi-warehouse
Component: Multi-store / Multi-warehouse
Story Points: 2
Direct Tasks: PAC-TASK-565, PAC-TASK-566
Traceability branch: story/PAC-204-us-164-multi-store-support-backlog
```

Acceptance Criteria:

- Chỉ ghi nhận Future scope.
- MVP dùng một logical default store.
- Không thêm workflow store phức tạp vào MVP.
- Không ảnh hưởng MedicineBatch MVP.

Agent rules:

- Không tạo Story PR.
- Chỉ review trên latest `develop` sau khi mọi direct Task đã merge.
- Phải kiểm tra Future/Proposed/Not Implemented markers.
- Phải kiểm tra privacy/security/audit và dependency.
- Story PASS không cấp quyền triển khai.

## US-165 — Multi-warehouse support backlog

```text
Jira Key: PAC-205
Parent: PAC-EPIC-34 - Multi-store / Multi-warehouse
Component: Multi-store / Multi-warehouse
Story Points: 2
Direct Tasks: PAC-TASK-567, PAC-TASK-568
Traceability branch: story/PAC-205-us-165-multi-warehouse-support-backlog
```

Acceptance Criteria:

- Chỉ ghi nhận Future scope.
- MVP dùng một logical default warehouse.
- Không có stock by warehouse trong MVP.
- Không có multi-warehouse allocation.

Agent rules:

- Không tạo Story PR.
- Chỉ review trên latest `develop` sau khi mọi direct Task đã merge.
- Phải kiểm tra Future/Proposed/Not Implemented markers.
- Phải kiểm tra privacy/security/audit và dependency.
- Story PASS không cấp quyền triển khai.

## US-166 — Stock Transfer backlog

```text
Jira Key: PAC-206
Parent: PAC-EPIC-35 - Stock Transfer
Component: Stock Transfer
Story Points: 2
Direct Tasks: PAC-TASK-569, PAC-TASK-570
Traceability branch: story/PAC-206-us-166-stock-transfer-backlog
```

Acceptance Criteria:

- Chỉ ghi nhận Future scope.
- Không có transfer request trong MVP.
- Không dùng adjustment để giả lập transfer.
- Không ảnh hưởng stock import/checkout MVP.

Agent rules:

- Không tạo Story PR.
- Chỉ review trên latest `develop` sau khi mọi direct Task đã merge.
- Phải kiểm tra Future/Proposed/Not Implemented markers.
- Phải kiểm tra privacy/security/audit và dependency.
- Story PASS không cấp quyền triển khai.

## US-167 — Forecasting & Reorder backlog

```text
Jira Key: PAC-207
Parent: PAC-EPIC-36 - Forecasting & Reorder Suggestions
Component: Forecasting
Story Points: 2
Direct Tasks: PAC-TASK-571, PAC-TASK-572
Traceability branch: story/PAC-207-us-167-forecasting-reorder-backlog
```

Acceptance Criteria:

- Chỉ ghi nhận Future scope.
- Không dùng forecast trong MVP.
- Không tự tạo stock import.
- Không dùng forecast để chặn checkout.

Agent rules:

- Không tạo Story PR.
- Chỉ review trên latest `develop` sau khi mọi direct Task đã merge.
- Phải kiểm tra Future/Proposed/Not Implemented markers.
- Phải kiểm tra privacy/security/audit và dependency.
- Story PASS không cấp quyền triển khai.

## US-168 — Promotion / Coupon backlog

```text
Jira Key: PAC-208
Parent: PAC-EPIC-37 - Promotion / Coupon
Component: Promotion / Coupon
Story Points: 2
Direct Tasks: PAC-TASK-573, PAC-TASK-574
Traceability branch: story/PAC-208-us-168-promotion-coupon-backlog
```

Acceptance Criteria:

- Chỉ ghi nhận Future scope.
- MVP không có coupon engine.
- Checkout MVP không tính discount.
- Không ảnh hưởng payment/invoice MVP.

Agent rules:

- Không tạo Story PR.
- Chỉ review trên latest `develop` sau khi mọi direct Task đã merge.
- Phải kiểm tra Future/Proposed/Not Implemented markers.
- Phải kiểm tra privacy/security/audit và dependency.
- Story PASS không cấp quyền triển khai.

## US-169 — Shipping / Delivery backlog

```text
Jira Key: PAC-209
Parent: PAC-EPIC-38 - Shipping / Delivery
Component: Shipping
Story Points: 2
Direct Tasks: PAC-TASK-575, PAC-TASK-576
Traceability branch: story/PAC-209-us-169-shipping-delivery-backlog
```

Acceptance Criteria:

- Chỉ ghi nhận Future scope.
- Không có shipping trong POS MVP.
- Không yêu cầu address/shipment.
- Chỉ liên quan khi mở Online Commerce.

Agent rules:

- Không tạo Story PR.
- Chỉ review trên latest `develop` sau khi mọi direct Task đã merge.
- Phải kiểm tra Future/Proposed/Not Implemented markers.
- Phải kiểm tra privacy/security/audit và dependency.
- Story PASS không cấp quyền triển khai.

## US-170 — Review / CMS backlog

```text
Jira Key: PAC-210
Parent: PAC-EPIC-39 - Review / CMS
Component: Review / CMS
Story Points: 2
Direct Tasks: PAC-TASK-577, PAC-TASK-578, PAC-TASK-579, PAC-TASK-580
Traceability branch: story/PAC-210-us-170-review-cms-backlog
```

Acceptance Criteria:

- Chỉ ghi nhận Future scope.
- Không có review/CMS trong MVP.
- Không ảnh hưởng POS/inventory/checkout.
- Chỉ dùng cho commercial expansion.

Agent rules:

- Không tạo Story PR.
- Chỉ review trên latest `develop` sau khi mọi direct Task đã merge.
- Phải kiểm tra Future/Proposed/Not Implemented markers.
- Phải kiểm tra privacy/security/audit và dependency.
- Story PASS không cấp quyền triển khai.

# 22. Core Epic Branch Registry

| Core Epic | Jira Key | Name | Stories | Direct Tasks | Exact branch |
|---|---|---|---|---|---|
| PAC-EPIC-31 | PAC-31 | Full Customer Management | US-161 | PAC-TASK-556, PAC-TASK-557, PAC-TASK-558 | `epic/PAC-31-epic-31-full-customer-management` |
| PAC-EPIC-32 | PAC-32 | Online Commerce | US-162 | PAC-TASK-559, PAC-TASK-560, PAC-TASK-561 | `epic/PAC-32-epic-32-online-commerce` |
| PAC-EPIC-33 | PAC-33 | Product Variant Catalog | US-163 | PAC-TASK-562, PAC-TASK-563, PAC-TASK-564 | `epic/PAC-33-epic-33-product-variant-catalog` |
| PAC-EPIC-34 | PAC-34 | Multi-store / Multi-warehouse | US-164, US-165 | PAC-TASK-565, PAC-TASK-566, PAC-TASK-567, PAC-TASK-568 | `epic/PAC-34-epic-34-multi-store-multi-warehouse` |
| PAC-EPIC-35 | PAC-35 | Stock Transfer | US-166 | PAC-TASK-569, PAC-TASK-570 | `epic/PAC-35-epic-35-stock-transfer` |
| PAC-EPIC-36 | PAC-36 | Forecasting & Reorder Suggestions | US-167 | PAC-TASK-571, PAC-TASK-572 | `epic/PAC-36-epic-36-forecasting-reorder-suggestions` |
| PAC-EPIC-37 | PAC-37 | Promotion / Coupon | US-168 | PAC-TASK-573, PAC-TASK-574 | `epic/PAC-37-epic-37-promotion-coupon` |
| PAC-EPIC-38 | PAC-38 | Shipping / Delivery | US-169 | PAC-TASK-575, PAC-TASK-576 | `epic/PAC-38-epic-38-shipping-delivery` |
| PAC-EPIC-39 | PAC-39 | Review / CMS | US-170 | PAC-TASK-577, PAC-TASK-578, PAC-TASK-579, PAC-TASK-580 | `epic/PAC-39-epic-39-review-cms` |

# 23. Story Branch Registry

| Story | Jira Key | Story Points | Direct Tasks | Exact branch |
|---|---|---:|---|---|
| US-161 | PAC-201 | 2 | PAC-TASK-556, PAC-TASK-557, PAC-TASK-558 | `story/PAC-201-us-161-full-customer-management-backlog` |
| US-162 | PAC-202 | 2 | PAC-TASK-559, PAC-TASK-560, PAC-TASK-561 | `story/PAC-202-us-162-online-commerce-backlog` |
| US-163 | PAC-203 | 2 | PAC-TASK-562, PAC-TASK-563, PAC-TASK-564 | `story/PAC-203-us-163-product-variant-catalog-backlog` |
| US-164 | PAC-204 | 2 | PAC-TASK-565, PAC-TASK-566 | `story/PAC-204-us-164-multi-store-support-backlog` |
| US-165 | PAC-205 | 2 | PAC-TASK-567, PAC-TASK-568 | `story/PAC-205-us-165-multi-warehouse-support-backlog` |
| US-166 | PAC-206 | 2 | PAC-TASK-569, PAC-TASK-570 | `story/PAC-206-us-166-stock-transfer-backlog` |
| US-167 | PAC-207 | 2 | PAC-TASK-571, PAC-TASK-572 | `story/PAC-207-us-167-forecasting-reorder-backlog` |
| US-168 | PAC-208 | 2 | PAC-TASK-573, PAC-TASK-574 | `story/PAC-208-us-168-promotion-coupon-backlog` |
| US-169 | PAC-209 | 2 | PAC-TASK-575, PAC-TASK-576 | `story/PAC-209-us-169-shipping-delivery-backlog` |
| US-170 | PAC-210 | 2 | PAC-TASK-577, PAC-TASK-578, PAC-TASK-579, PAC-TASK-580 | `story/PAC-210-us-170-review-cms-backlog` |

# 24. Task Registry and Task-specific Instructions

## PAC-TASK-556 — Document Full Customer Management future scope

```text
Jira Key: PAC-766
Story: US-161
Epic: PAC-EPIC-31
Component: Customer Management
Priority: Low
Exact branch: docs/PAC-766-task-556-document-full-customer-management-future-scope
Allowed output: Documentation only
```

Nhóm cần ghi nhận Full Customer Management là future scope.

Required work:

- Mô tả customer profile đầy đủ.
- Ghi không phải MVP.
- Phân biệt với walk-in customer trong POS.
- Ghi dependency nếu mở rộng.
- Gắn Epic/Story future.

Expected result:

- Customer Management không bị nhầm là MVP đầy đủ.
- POS walk-in vẫn hợp lệ.
- Future backlog rõ.
- AI agent không implement quá scope.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

## PAC-TASK-557 — Document customer profile CRUD future scope

```text
Jira Key: PAC-767
Story: US-161
Epic: PAC-EPIC-31
Component: Customer Management
Priority: Low
Exact branch: docs/PAC-767-task-557-document-customer-profile-crud-future-scope
Allowed output: Documentation only
```

Nhóm cần mô tả customer CRUD tương lai.

Required work:

- Ghi create/update/view customer profile.
- Ghi fields dự kiến.
- Ghi privacy/security consideration.
- Ghi authorization future.
- Không implement MVP.

Expected result:

- Customer CRUD có định hướng.
- Không ảnh hưởng MVP.
- Future planning rõ.
- Scope kiểm soát tốt.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

## PAC-TASK-558 — Document customer purchase history expansion

```text
Jira Key: PAC-768
Story: US-161
Epic: PAC-EPIC-31
Component: Customer Management
Priority: Low
Exact branch: docs/PAC-768-task-558-document-customer-purchase-history-expansion
Allowed output: Documentation only
```

Nhóm cần ghi nhận mở rộng lịch sử mua hàng khách hàng.

Required work:

- Mô tả customer purchase history.
- Ghi Staff ownership/permission cần giữ.
- Ghi Admin read-all future permission nếu cần.
- Ghi privacy consideration.
- Không implement full scope trong MVP.

Expected result:

- Future customer history rõ.
- Không lộ dữ liệu ngoài scope.
- Ownership baseline được giữ.
- Planning dễ hơn.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

## PAC-TASK-559 — Document Online Commerce storefront future scope

```text
Jira Key: PAC-769
Story: US-162
Epic: PAC-EPIC-32
Component: Online Commerce
Priority: Low
Exact branch: docs/PAC-769-task-559-document-online-commerce-storefront-future-scope
Allowed output: Documentation only
```

Nhóm cần ghi nhận storefront online là future scope.

Required work:

- Mô tả website bán hàng online.
- Ghi khác với POS nội bộ.
- Ghi module sản phẩm/catalog cần mở rộng.
- Ghi không thuộc MVP.
- Ghi dependency shipping/payment online nếu có.

Expected result:

- Online commerce không bị đưa vào MVP.
- POS scope giữ ổn định.
- Future roadmap rõ.
- Không làm tăng scope hiện tại.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

## PAC-TASK-560 — Document online cart and wishlist future scope

```text
Jira Key: PAC-770
Story: US-162
Epic: PAC-EPIC-32
Component: Online Commerce
Priority: Low
Exact branch: docs/PAC-770-task-560-document-online-cart-and-wishlist-future-scope
Allowed output: Documentation only
```

Nhóm cần mô tả cart/wishlist tương lai.

Required work:

- Ghi cart cho customer portal.
- Ghi wishlist.
- Ghi auth/customer dependency.
- Ghi không dùng trong POS MVP.
- Ghi data tables future nếu cần.

Expected result:

- Cart/wishlist rõ là commercial expansion.
- Không ảnh hưởng checkout MVP.
- AI agent không tạo cart trong hiện tại.
- Scope future có note.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

## PAC-TASK-561 — Document online checkout separation from POS checkout

```text
Jira Key: PAC-771
Story: US-162
Epic: PAC-EPIC-32
Component: Online Commerce
Priority: Low
Exact branch: docs/PAC-771-task-561-document-online-checkout-separation-from-pos-checko
Allowed output: Documentation only
```

Nhóm cần ghi rõ online checkout future tách với POS checkout MVP.

Required work:

- Mô tả POS checkout hiện tại.
- Mô tả online checkout future.
- Ghi khác nhau về customer, shipping, online payment.
- Ghi không reuse sai endpoint nếu không thiết kế.
- Không implement online checkout.

Expected result:

- Checkout MVP không bị pha scope online.
- Future design rõ hơn.
- Payment/shipping online không thành blocker.
- Documentation tránh hiểu nhầm.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

## PAC-TASK-562 — Document Product Variant Catalog future scope

```text
Jira Key: PAC-772
Story: US-163
Epic: PAC-EPIC-33
Component: Product Variant Catalog
Priority: Low
Exact branch: docs/PAC-772-task-562-document-product-variant-catalog-future-scope
Allowed output: Documentation only
```

Nhóm cần ghi nhận Product Variant Catalog là future scope.

Required work:

- Mô tả products/product_variants dùng cho commercial catalog.
- Ghi MVP sales dùng medicine_id.
- Ghi product variant không là sales key MVP.
- Ghi dependency online commerce.
- Không implement trong MVP.

Expected result:

- Catalog future không làm rối MVP.
- medicine_id business key được bảo vệ.
- Real catalog data có vị trí đúng.
- AI agent không dùng product_variant cho POS.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

## PAC-TASK-563 — Document product images and documents commercial scope

```text
Jira Key: PAC-773
Story: US-163
Epic: PAC-EPIC-33
Component: Product Variant Catalog
Priority: Low
Exact branch: docs/PAC-773-task-563-document-product-images-and-documents-commercial-sc
Allowed output: Documentation only
```

Nhóm cần ghi nhận ảnh/tài liệu sản phẩm là commercial expansion.

Required work:

- Mô tả product_images/product_documents.
- Ghi liên quan catalog online.
- Ghi Supabase Storage có thể là Should-have riêng.
- Ghi không bắt buộc MVP.
- Ghi future data handling.

Expected result:

- Product media scope rõ.
- Không ép MVP phải có ảnh/tài liệu.
- Future catalog có định hướng.
- Documentation nhất quán.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

## PAC-TASK-564 — Document real catalog data import future workflow

```text
Jira Key: PAC-774
Story: US-163
Epic: PAC-EPIC-33
Component: Product Variant Catalog
Priority: Low
Exact branch: docs/PAC-774-task-564-document-real-catalog-data-import-future-workflow
Allowed output: Documentation only
```

Nhóm cần mô tả workflow import dữ liệu catalog thật trong tương lai.

Required work:

- Ghi raw catalog data cần review/curate.
- Ghi mapping sang Medicine/ActiveIngredient nếu dùng operational seed.
- Ghi data quality checks.
- Ghi không import thẳng raw data vào MVP operational data.
- Ghi future ETL workflow.

Expected result:

- Real catalog data được dùng đúng vai trò.
- MVP seed vẫn curated.
- Data quality risk được ghi nhận.
- Future import có hướng rõ.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

## PAC-TASK-565 — Document Multi-store future scope

```text
Jira Key: PAC-775
Story: US-164
Epic: PAC-EPIC-34
Component: Multi-store / Multi-warehouse
Priority: Low
Exact branch: docs/PAC-775-task-565-document-multi-store-future-scope
Allowed output: Documentation only
```

Nhóm cần ghi nhận multi-store là future scope.

Required work:

- Mô tả nhiều cửa hàng.
- Ghi MVP dùng một logical default store.
- Ghi tác động tới inventory/order/report.
- Ghi không implement multi-store workflow.
- Ghi future permission/data scope.

Expected result:

- Multi-store không vào MVP.
- Default store assumption rõ.
- Future roadmap có note.
- Không phức tạp hóa hiện tại.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

## PAC-TASK-566 — Document default store assumption for MVP

```text
Jira Key: PAC-776
Story: US-164
Epic: PAC-EPIC-34
Component: Multi-store / Multi-warehouse
Priority: Low
Exact branch: docs/PAC-776-task-566-document-default-store-assumption-for-mvp
Allowed output: Documentation only
```

Nhóm cần ghi rõ giả định default store cho MVP.

Required work:

- Ghi một logical store mặc định.
- Ghi order/inventory/report dùng default store.
- Ghi multi-store future.
- Ghi không cần UI chọn store trong MVP.
- Ghi ảnh hưởng testing.

Expected result:

- MVP data model dễ hiểu.
- Không tạo store workflow ngoài scope.
- Reports không bị rối.
- AI agent không thêm store selector.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

## PAC-TASK-567 — Document Multi-warehouse future scope

```text
Jira Key: PAC-777
Story: US-165
Epic: PAC-EPIC-34
Component: Multi-store / Multi-warehouse
Priority: Low
Exact branch: docs/PAC-777-task-567-document-multi-warehouse-future-scope
Allowed output: Documentation only
```

Nhóm cần ghi nhận multi-warehouse là future scope.

Required work:

- Mô tả nhiều warehouse.
- Ghi MVP dùng một logical default warehouse.
- Ghi tác động tới MedicineBatch/Stock Import.
- Ghi stock transfer dependency.
- Không implement trong MVP.

Expected result:

- Multi-warehouse không làm rối inventory MVP.
- Future scope rõ.
- Default warehouse được bảo vệ.
- Không thêm workflow kho phức tạp.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

## PAC-TASK-568 — Document default warehouse assumption for MVP

```text
Jira Key: PAC-778
Story: US-165
Epic: PAC-EPIC-34
Component: Multi-store / Multi-warehouse
Priority: Low
Exact branch: docs/PAC-778-task-568-document-default-warehouse-assumption-for-mvp
Allowed output: Documentation only
```

Nhóm cần ghi rõ giả định default warehouse cho MVP.

Required work:

- Ghi một warehouse mặc định.
- Ghi MedicineBatch thuộc default warehouse logic.
- Ghi không có stock transfer.
- Ghi testing/demo dựa trên một kho.
- Ghi future expansion.

Expected result:

- Inventory MVP rõ phạm vi.
- Không cần warehouse selector.
- FEFO đơn giản hơn.
- Future multi-warehouse có nền tảng.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

## PAC-TASK-569 — Document Stock Transfer future workflow

```text
Jira Key: PAC-779
Story: US-166
Epic: PAC-EPIC-35
Component: Stock Transfer
Priority: Low
Exact branch: docs/PAC-779-task-569-document-stock-transfer-future-workflow
Allowed output: Documentation only
```

Nhóm cần mô tả stock transfer tương lai.

Required work:

- Mô tả chuyển kho giữa warehouse/store.
- Ghi cần multi-warehouse trước.
- Ghi trạng thái transfer dự kiến.
- Ghi audit requirement.
- Không implement trong MVP.

Expected result:

- Stock Transfer rõ là future.
- MVP không bị yêu cầu chuyển kho.
- Inventory Adjustment không bị dùng sai để transfer.
- Roadmap rõ hơn.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

## PAC-TASK-570 — Document stock transfer audit future requirement

```text
Jira Key: PAC-780
Story: US-166
Epic: PAC-EPIC-35
Component: Stock Transfer
Priority: Low
Exact branch: docs/PAC-780-task-570-document-stock-transfer-audit-future-requirement
Allowed output: Documentation only
```

Nhóm cần ghi yêu cầu audit cho stock transfer tương lai.

Required work:

- Ghi actor tạo/confirm transfer.
- Ghi source/destination warehouse.
- Ghi batch và quantity.
- Ghi status transitions.
- Ghi audit log bắt buộc khi mở rộng.

Expected result:

- Future transfer có traceability.
- Không làm mất batch audit.
- Inventory governance được giữ.
- Documentation future đầy đủ.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

## PAC-TASK-571 — Document Forecasting and reorder suggestion future scope

```text
Jira Key: PAC-781
Story: US-167
Epic: PAC-EPIC-36
Component: Forecasting
Priority: Low
Exact branch: docs/PAC-781-task-571-document-forecasting-and-reorder-suggestion-future-
Allowed output: Documentation only
```

Nhóm cần ghi nhận forecasting/reorder suggestion là future scope.

Required work:

- Mô tả forecast dựa trên sales history.
- Mô tả reorder suggestion.
- Ghi không phải MVP.
- Ghi dữ liệu cần có.
- Ghi không ảnh hưởng low-stock MVP.

Expected result:

- Forecasting không thành MVP blocker.
- Low-stock hiện tại vẫn deterministic.
- Future analytics có định hướng.
- Scope rõ ràng.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

## PAC-TASK-572 — Document forecast data requirements and limitations

```text
Jira Key: PAC-782
Story: US-167
Epic: PAC-EPIC-36
Component: Forecasting
Priority: Low
Exact branch: docs/PAC-782-task-572-document-forecast-data-requirements-and-limitations
Allowed output: Documentation only
```

Nhóm cần ghi dữ liệu và giới hạn cho forecasting future.

Required work:

- Ghi cần đủ lịch sử bán.
- Ghi cần loại trừ dữ liệu demo ít.
- Ghi cần seasonality nếu nâng cao.
- Ghi hạn chế độ chính xác.
- Ghi không dùng cho quyết định bắt buộc MVP.

Expected result:

- Forecast future thực tế hơn.
- Không hứa quá mức.
- Demo MVP không bị đánh giá thiếu forecast.
- Documentation trung thực.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

## PAC-TASK-573 — Document Promotion and Coupon future scope

```text
Jira Key: PAC-783
Story: US-168
Epic: PAC-EPIC-37
Component: Promotion / Coupon
Priority: Low
Exact branch: docs/PAC-783-task-573-document-promotion-and-coupon-future-scope
Allowed output: Documentation only
```

Nhóm cần ghi nhận promotion/coupon là future scope.

Required work:

- Mô tả promotion/coupon engine.
- Ghi không áp dụng vào MVP checkout.
- Ghi impact tới pricing/payment/report.
- Ghi cần rule validation riêng.
- Không implement trong MVP.

Expected result:

- Discount không chen vào POS MVP.
- Checkout total hiện tại đơn giản.
- Future scope rõ.
- AI agent không thêm coupon logic.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

## PAC-TASK-574 — Document discount not included in MVP checkout

```text
Jira Key: PAC-784
Story: US-168
Epic: PAC-EPIC-37
Component: Promotion / Coupon
Priority: Low
Exact branch: docs/PAC-784-task-574-document-discount-not-included-in-mvp-checkout
Allowed output: Documentation only
```

Nhóm cần ghi rõ MVP checkout không có discount.

Required work:

- Ghi total = sum order items.
- Ghi không có coupon/promotion.
- Ghi report revenue không xử lý discount.
- Ghi future expansion nếu có.
- Ghi guardrail cho AI agent.

Expected result:

- Checkout MVP không bị scope creep.
- Payment/invoice dễ kiểm tra.
- Revenue report rõ.
- Future discount tách riêng.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

## PAC-TASK-575 — Document Shipping and Delivery future scope

```text
Jira Key: PAC-785
Story: US-169
Epic: PAC-EPIC-38
Component: Shipping
Priority: Low
Exact branch: docs/PAC-785-task-575-document-shipping-and-delivery-future-scope
Allowed output: Documentation only
```

Nhóm cần ghi nhận shipping/delivery là future scope.

Required work:

- Mô tả delivery workflow tương lai.
- Ghi liên quan online commerce.
- Ghi POS MVP không có shipping.
- Ghi delivery status future.
- Không implement trong MVP.

Expected result:

- Shipping không vào MVP.
- POS checkout không bị phức tạp.
- Future online commerce rõ hơn.
- Documentation nhất quán.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

## PAC-TASK-576 — Document delivery status future workflow

```text
Jira Key: PAC-786
Story: US-169
Epic: PAC-EPIC-38
Component: Shipping
Priority: Low
Exact branch: docs/PAC-786-task-576-document-delivery-status-future-workflow
Allowed output: Documentation only
```

Nhóm cần mô tả status workflow cho delivery tương lai.

Required work:

- Ghi các status dự kiến như pending, preparing, shipped, delivered, cancelled nếu cần.
- Ghi liên quan order online.
- Ghi audit/tracking requirement.
- Ghi không áp dụng POS MVP.
- Không implement hiện tại.

Expected result:

- Delivery future có hướng thiết kế.
- Không làm rối order status MVP DRAFT/PAID/CANCELLED.
- Scope tách biệt.
- Future docs đầy đủ.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

## PAC-TASK-577 — Document Review and CMS future scope

```text
Jira Key: PAC-787
Story: US-170
Epic: PAC-EPIC-39
Component: Review / CMS
Priority: Low
Exact branch: docs/PAC-787-task-577-document-review-and-cms-future-scope
Allowed output: Documentation only
```

Nhóm cần ghi nhận review/CMS là future scope.

Required work:

- Mô tả product review.
- Mô tả CMS content.
- Ghi liên quan storefront online.
- Ghi không thuộc MVP nhà thuốc nội bộ.
- Không implement hiện tại.

Expected result:

- Review/CMS không bị đưa vào MVP.
- Online commerce future rõ.
- Core pharmacy workflow tập trung.
- Scope được kiểm soát.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

## PAC-TASK-578 — Document product review moderation future consideration

```text
Jira Key: PAC-788
Story: US-170
Epic: PAC-EPIC-39
Component: Review / CMS
Priority: Low
Exact branch: docs/PAC-788-task-578-document-product-review-moderation-future-considera
Allowed output: Documentation only
```

Nhóm cần ghi chú review moderation trong future scope.

Required work:

- Ghi cần moderation/reporting nếu có review.
- Ghi role/permission future.
- Ghi spam/abuse consideration.
- Ghi không ảnh hưởng MVP.
- Không implement moderation hiện tại.

Expected result:

- Future review có kiểm soát.
- Không bỏ qua moderation risk.
- MVP không bị mở rộng.
- Documentation đầy đủ hơn.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

## PAC-TASK-579 — Document commercial expansion dependency map

```text
Jira Key: PAC-789
Story: US-170
Epic: PAC-EPIC-39
Component: Documentation
Priority: Low
Exact branch: docs/PAC-789-task-579-document-commercial-expansion-dependency-map
Allowed output: Documentation only
```

Nhóm cần tạo dependency map cho các phần commercial expansion.

Required work:

- Map Online Commerce phụ thuộc Product Catalog, Customer, Shipping, Payment Online.
- Map Multi-warehouse phụ thuộc stock transfer.
- Map Promotion ảnh hưởng checkout/report.
- Map Forecast phụ thuộc sales history.
- Ghi rõ không thuộc MVP.

Expected result:

- Future roadmap có thứ tự.
- Team không implement lộn scope.
- Dependency rõ khi mở rộng.
- Documentation chiến lược hơn.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

## PAC-TASK-580 — Document final out-of-scope guardrails for AI agents

```text
Jira Key: PAC-790
Story: US-170
Epic: PAC-EPIC-39
Component: Documentation
Priority: Low
Exact branch: docs/PAC-790-task-580-document-final-out-of-scope-guardrails-for-ai-agent
Allowed output: Documentation only
```

Nhóm cần viết guardrails cuối cùng để AI agent không code sai scope.

Required work:

- Liệt kê nội dung không thuộc MVP.
- Liệt kê baseline kỹ thuật không được vi phạm.
- Ghi cảnh báo không dùng prefix PAI.
- Ghi không thêm scope mới.
- Ghi cách xử lý nếu gặp yêu cầu mâu thuẫn.

Expected result:

- AI agent có guardrail rõ.
- Dự án không quay lại baseline cũ.
- MVP/Should-have/Future được phân biệt.
- Jira Task set an toàn cho coding.

Mandatory agent guardrails:

- Không sửa production code.
- Không sửa Prisma schema hoặc migration.
- Không tạo API/UI/runtime implementation.
- Mọi proposal phải đánh dấu FUTURE / PROPOSED / NOT IMPLEMENTED.
- Phải ghi dependency, risk, open question và decision owner.
- Diff chỉ gồm documentation/traceability.

# 25. Definition of Done

## Task Done

```text
Exact docs branch = Correct
Task requirements = Documented
Expected results = Satisfied
Future/Proposed/Not Implemented markers = Present
Traceability = PASS
Privacy/security/audit review = PASS
Dependencies/risks/open questions = Recorded
Product-code diff = 0
Prisma/migration diff = 0
Workflow/runtime diff = 0
Secret exposure = 0
Local Document Quality Gate = PASS
PR review = PASS
GitHub Actions = N/A by approved policy
PR merged into develop
Merge SHA exists on origin/develop
Progress updated
```

## Story Done

```text
All direct Tasks = Documentation complete
Acceptance Criteria = PASS
Cross-document consistency = PASS
Privacy/security/audit = PASS
Dependencies/guardrails = PASS
Open decisions have owners
No Story PR
Implementation authorization = No
```

## Epic Done

```text
All related Story Reviews = PASS
All direct Tasks = Documentation complete
Dependency map = Complete
Released baseline conflict = 0
No-code/schema/runtime rule = PASS
No Epic PR
Implementation authorization = No
```

## Sprint 12 Done

```text
Tasks verified = 25/25
Story Acceptance Reviews = 10/10 PASS
Core Epic Reviews = 9/9 PASS
Branches reconciled = 44/44
Product-code changes = 0
Schema/migration changes = 0
Runtime/workflow changes = 0
Contradictory Future/MVP statements = 0
Commercial dependency map = PASS
Final AI-agent guardrails = PASS
Blocking findings = 0
High findings = 0
Sprint 12 Documentation Final Review = PASS
Commercial documentation approved = Yes
Commercial implementation authorization = No
```

# 26. End-of-Sprint Instruction

Sau khi 25 Tasks, 10 Story Reviews và 9 Epic Reviews hoàn tất:

```text
Không tự tuyên bố Sprint 12 PASS
Không merge develop → main
Không chuyển implementation authorization thành Yes
Chạy work-context/sprint-12/sprint-12-final-review-prompt.md
```

Final Review phải độc lập và kiểm tra ít nhất:

- 20/20 mandatory documentation gates;
- 25/25 Tasks;
- 10/10 Stories;
- 9/9 Epics;
- 44/44 branches;
- product-code/schema/runtime changes = 0;
- dependency map;
- final AI-agent guardrails;
- no secrets;
- no released MVP/Advanced regression.

# 27. Start Instruction

```text
Read Sprint 12 Audit Report.
Verify Documentation Authorization Gate.
Verify exact remote branch for PAC-TASK-556.
Select documentation and architecture review skills.
Begin PAC-TASK-556 only.
Do not ask for confirmation when all gates are PASS.
Do not implement commercial features.
```

First authorized Task:

```text
PAC-TASK-556
PAC-766
docs/PAC-766-task-556-document-full-customer-management-future-scope
```
