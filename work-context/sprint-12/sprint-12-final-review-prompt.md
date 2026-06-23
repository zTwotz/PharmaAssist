# Sprint 12 Final Review Prompt — PharmaAssist AI Intelligence

> **Independent Final Review for Future / Commercial Expansion Documentation Backlog**  
> Repository path: `work-context/sprint-12/sprint-12-final-review-prompt.md`  
> Chỉ chạy sau khi toàn bộ Sprint 12 Tasks, Story Acceptance Reviews và Core Epic Reviews đã hoàn tất.

---

# 1. Vai trò của Final Reviewer

Bạn là **Independent Final Reviewer** của Sprint 12.

Bạn không phải Documentation Agent thực hiện Sprint 12 và không được mặc định tin:

- `sprint-12-progress.md`;
- báo cáo hoàn thành của AI Agent;
- PR description;
- Story/Epic review note;
- tuyên bố rằng diff chỉ gồm tài liệu;
- trạng thái Jira.

Bạn phải kiểm chứng trực tiếp:

```text
repository and Git history
→ jira-mapping.md
→ branch-on-jira.md
→ GitHub Task PR and merge evidence
→ origin/develop
→ Sprint 12 deliverables
→ Story Acceptance Reviews
→ Core Epic Reviews
→ documentation-only diff
→ security and secret checks
→ documentation release PR and applicable CI
```

Final Review là phiên kiểm chứng độc lập, không phải phiên sửa tài liệu hoặc triển khai commercial features.

# 2. Official Scope

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

Story Jira Keys:
PAC-201 → PAC-210

Story count:
10

Story Points:
20

Core Epics:
PAC-EPIC-31 → PAC-EPIC-39

Core Epic count:
9

Canonical branch inventory:
25 Task + 10 Story + 9 Core Epic = 44

Allowed Task branch prefix:
docs/

MVP Gate:
No

Commercial implementation authorization:
No
```

Sprint 12 PASS có nghĩa:

```text
Commercial documentation approved = Yes
Commercial implementation authorization = No
Released MVP/Advanced readiness remains = Yes
```

# 3. Canonical Source Roles

```text
Jira/jira-mapping.md
= official Logical Key ↔ Jira Key mapping

Jira/branch-on-jira.md
= official exact branch registry
```

Final Reviewer phải xác minh hai nguồn đồng bộ với nhau và với Git history.

Không có mapping conflict mặc định.

Chỉ ghi finding khi evidence thực tế cho thấy Logical Key, Jira Key hoặc exact branch không khớp.

# 4. Tài liệu bắt buộc phải đọc

- `AGENTS.md`
- `.agents/rules/rules-w-pharmaassist.md`
- `WORKING-CONTEXT.md`
- `DESIGN.md`
- `Jira/jira-mapping.md`
- `Jira/branch-on-jira.md`
- `Jira/1_Components.md`
- `Jira/2_Epic.md`
- `Jira/3_Stories.md`
- `Jira/4D_Task_List_Testing_Advanced_Future_436_580.md`
- `Jira/4D_Task_Description_Testing_Advanced_Future_436_580.md`
- `Jira/5_Sprint.md`
- `work-context/sprint-11/sprint-11-final-review-report.md`
- `work-context/sprint-12/sprint-12.md`
- `work-context/sprint-12/sprint-12-progress.md`
- `work-context/sprint-12/sprint-12-audit.md`
- `work-context/sprint-12/sprint-12-audit-report.md`
- `work-context/sprint-12/sprint-12-agent-prompt.md`
- `all Sprint 12 Task deliverables`

Đọc thêm:

- current GitHub PR/merge/check history;
- current repository tree;
- current Prisma schema và migrations để xác minh không bị sửa;
- current backend/frontend source tree;
- current GitHub Actions workflows;
- current Supabase, Neo4j và AI configuration references;
- Sprint 11 released baseline.

Canonical priority:

```text
jira-mapping.md for Jira Key
→ branch-on-jira.md for exact branch
→ repository and Git history
→ GitHub PR/merge/CI evidence
→ released main baseline
→ Sprint 12 Audit and deliverables
→ progress documents
→ Jira manual status
```

# 5. Reviewer Skills

Chọn tối thiểu:

```text
karpathy-principles
writing-plans
ecc-code-quality
ecc-security
ecc-backend
ecc-frontend
ecc-database
ecc-testing
git-github
mattpocock-engineering
```

Các skill kỹ thuật chỉ dùng để kiểm tra feasibility, boundary, consistency, security và regression.

Không dùng skill để triển khai product code.

# 6. Reviewer Restrictions

- Không triển khai commercial feature.
- Không sửa Sprint 12 Task deliverables.
- Không sửa Acceptance Criteria hoặc expected result để đạt PASS.
- Không sửa backend/frontend production code.
- Không sửa Prisma schema hoặc migration.
- Không sửa package dependency hoặc lockfile.
- Không sửa GitHub Actions.
- Không thay Supabase policies/publications.
- Không thay Neo4j projection hoặc runtime Cypher.
- Không thay AI provider/model/prompt runtime.
- Không tự tạo Jira Key.
- Không tự tạo replacement branch.
- Không push trực tiếp `develop` hoặc `main`.
- Không merge Task PR.
- Không merge `develop → main`.
- Không tạo release tag.
- Không xóa finding để đạt PASS.
- Không đổi commercial implementation authorization thành Yes.

# 7. Kết quả hợp lệ

## PASS

```text
Mandatory Gates PASS = 20/20
Tasks verified = 25/25
Story Acceptance Reviews = 10/10 PASS
Core Epic Reviews = 9/9 PASS
Branches reconciled = 44/44
Task PRs merged = 25/25
Product-code changes = 0
Prisma/migration changes = 0
Workflow/runtime/dependency changes = 0
Commercial dependency map = PASS
Final AI-agent guardrails = PASS
Applicable main/release CI = PASS
Blocking findings = 0
High findings = 0
Sprint 12 Documentation Final Review = PASS
Commercial documentation approved = Yes
Commercial implementation authorization = No
Released MVP/Advanced readiness remains = Yes
```

## FAIL

```text
Sprint 12 Documentation Final Review = FAIL
Commercial documentation approved = No
Commercial implementation authorization = No
Released MVP/Advanced readiness remains = Yes/No based on verified regression evidence
```

## BLOCKED

```text
Sprint 12 Documentation Final Review = BLOCKED
Commercial documentation approved = No
Commercial implementation authorization = No
Released MVP/Advanced readiness remains = Yes unless a verified regression exists
```

# 8. Repository Verification

Chạy:

```bash
git fetch --all --prune
git status --short
git branch --show-current
git rev-parse HEAD
git rev-parse origin/main
git rev-parse origin/develop
git log origin/main --oneline -n 50
git log origin/develop --oneline -n 150

git ls-files | grep -E '(^|/)\.env($|\.)|\.pem$|\.p12$|(^|/)id_rsa$|service-account.*\.json$' || true
```

Required:

```text
Working tree = clean
origin/main = reachable
origin/develop = reachable
Sprint 11 release baseline = present on origin/main
Sprint 12 Task merges = present on origin/develop
Unresolved conflicts = 0
Sensitive untracked files = 0
```

# 9. Mandatory Gates

1. Sprint 11 Released Baseline Integrity.
2. Repository and Remote Integrity.
3. Sprint 12 Audit Integrity.
4. Scope, Mapping and Traceability Reconciliation.
5. Exact Branch, PR and Merge Reconciliation.
6. Documentation-only Diff Enforcement.
7. Task Deliverable Completeness.
8. Story Acceptance Reviews.
9. Core Epic Reviews.
10. Customer Management Privacy and Identity.
11. Online Commerce and POS Boundary.
12. Product Variant and Medicine Sales-key Boundary.
13. Multi-store, Multi-warehouse and Stock Transfer.
14. Forecasting and Reorder Safety.
15. Promotion, Coupon and Financial Isolation.
16. Shipping, Delivery and POS Lifecycle Isolation.
17. Review, CMS, Moderation and Abuse Controls.
18. Commercial Dependency Map and Final AI-agent Guardrails.
19. Security, Documentation Quality and CI Policy.
20. Findings, Documentation Release PR and Final Authorization.

# 10. Gate 01 — Sprint 11 Released Baseline Integrity

Xác minh:

- [ ] Sprint 11 Final Review Report tồn tại.
- [ ] Sprint 11 Final Review = PASS.
- [ ] Sprint 11 Mandatory Gates = 20/20.
- [ ] Sprint 11 Release PR đã merge vào `main`.
- [ ] Full Sprint 11 main/release CI = PASS.
- [ ] Sprint 11 main SHA được ghi.
- [ ] Final Sprint 11 documentation được ghi hoặc có evidence rõ.
- [ ] Sprint 11 Blocking findings = 0.
- [ ] Sprint 11 High findings = 0.
- [ ] MVP release readiness remains = Yes.
- [ ] Advanced features approved for use/demo = Yes.

| Evidence | Expected | Actual | Result |
|---|---|---|---|
| Primary evidence | Verified | — | Pending |
| Blocking findings | 0 | — | Pending |
| High findings | 0 | — | Pending |
| Gate decision | PASS | — | Pending |

# 11. Gate 02 — Repository and Remote Integrity

Xác minh:

- [ ] Working tree sạch.
- [ ] Current branch được ghi.
- [ ] Local/remote `main` và `develop` SHA được ghi.
- [ ] `origin/main` và `origin/develop` truy cập được.
- [ ] Không unresolved conflict.
- [ ] Không sensitive untracked file.
- [ ] Không local-only Sprint 12 work.
- [ ] Không có Sprint 12 product implementation commit.

| Evidence | Expected | Actual | Result |
|---|---|---|---|
| Primary evidence | Verified | — | Pending |
| Blocking findings | 0 | — | Pending |
| High findings | 0 | — | Pending |
| Gate decision | PASS | — | Pending |

# 12. Gate 03 — Sprint 12 Audit Integrity

Xác minh:

- [ ] Sprint 12 Audit Report tồn tại.
- [ ] Sprint 12 Audit = PASS.
- [ ] Audit Mandatory Gates = 20/20.
- [ ] Project Leader approval = Yes.
- [ ] Team documentation capacity = Available.
- [ ] Ready to document Sprint 12 = Yes.
- [ ] Ready to implement commercial features = No.
- [ ] Audit Blocking findings = 0.
- [ ] Audit High findings = 0.

| Evidence | Expected | Actual | Result |
|---|---|---|---|
| Primary evidence | Verified | — | Pending |
| Blocking findings | 0 | — | Pending |
| High findings | 0 | — | Pending |
| Gate decision | PASS | — | Pending |

# 13. Gate 04 — Scope, Mapping and Traceability Reconciliation

Xác minh:

- [ ] Task range = PAC-TASK-556 → PAC-TASK-580.
- [ ] Task Jira range = PAC-766 → PAC-790.
- [ ] Task count = 25.
- [ ] Story range = US-161 → US-170.
- [ ] Story Jira range = PAC-201 → PAC-210.
- [ ] Story count = 10.
- [ ] Story Points = 20.
- [ ] Epic range = PAC-EPIC-31 → PAC-EPIC-39.
- [ ] Epic count = 9.
- [ ] Task → Story → Epic → Component mapping đầy đủ.
- [ ] `jira-mapping.md` và `branch-on-jira.md` đồng bộ.
- [ ] Mapping conflict count = 0.
- [ ] Duplicate/out-of-range issue count = 0.

| Evidence | Expected | Actual | Result |
|---|---|---|---|
| Primary evidence | Verified | — | Pending |
| Blocking findings | 0 | — | Pending |
| High findings | 0 | — | Pending |
| Gate decision | PASS | — | Pending |

# 14. Gate 05 — Exact Branch, PR and Merge Reconciliation

Xác minh:

- [ ] 25 Task exact branches được reconcile.
- [ ] 10 Story exact branches được reconcile.
- [ ] 9 Epic exact branches được reconcile.
- [ ] Total canonical branches = 44/44.
- [ ] Task branches dùng exact `docs/` names.
- [ ] 25/25 Task PRs target `develop`.
- [ ] 25/25 Task PRs merged.
- [ ] Story PRs = 0.
- [ ] Epic PRs = 0.
- [ ] Mọi merge SHA tồn tại trên `origin/develop`.
- [ ] Không closed-unmerged Task PR ngoài finding có giải thích.

| Evidence | Expected | Actual | Result |
|---|---|---|---|
| Primary evidence | Verified | — | Pending |
| Blocking findings | 0 | — | Pending |
| High findings | 0 | — | Pending |
| Gate decision | PASS | — | Pending |

# 15. Gate 06 — Documentation-only Diff Enforcement

Xác minh:

- [ ] Backend product diff = 0.
- [ ] Frontend product diff = 0.
- [ ] Prisma schema diff = 0.
- [ ] Migration diff = 0.
- [ ] GitHub workflow diff = 0.
- [ ] Package/lockfile diff = 0.
- [ ] Runtime configuration diff = 0.
- [ ] Supabase operational diff = 0.
- [ ] Neo4j operational diff = 0.
- [ ] AI runtime diff = 0.
- [ ] Operational seed/demo diff = 0.
- [ ] Changed files chỉ thuộc documentation/traceability/context.

| Evidence | Expected | Actual | Result |
|---|---|---|---|
| Primary evidence | Verified | — | Pending |
| Blocking findings | 0 | — | Pending |
| High findings | 0 | — | Pending |
| Gate decision | PASS | — | Pending |

# 16. Gate 07 — Task Deliverable Completeness

Xác minh:

- [ ] 25/25 Task deliverables tồn tại.
- [ ] Mỗi deliverable có `FUTURE / PROPOSED / NOT IMPLEMENTED` marker.
- [ ] Mỗi deliverable có objective và business value.
- [ ] Mỗi deliverable có actors/permission boundary.
- [ ] Mỗi deliverable có in-scope/out-of-scope.
- [ ] Mỗi deliverable có proposed business rules.
- [ ] Mỗi deliverable có conceptual data/API/UI/workflow notes hoặc N/A.
- [ ] Mỗi deliverable có dependencies.
- [ ] Mỗi deliverable có security/privacy/audit considerations.
- [ ] Mỗi deliverable có risks, assumptions, limitations và non-goals.
- [ ] Mỗi deliverable có open questions và decision owner.
- [ ] Mỗi deliverable có Task/Story/Epic/Component traceability.
- [ ] Mỗi deliverable ghi rõ không cấp quyền implementation.
- [ ] 25/25 Local Document Quality Gates = PASS.
- [ ] 25/25 PR reviews = PASS.

| Evidence | Expected | Actual | Result |
|---|---|---|---|
| Primary evidence | Verified | — | Pending |
| Blocking findings | 0 | — | Pending |
| High findings | 0 | — | Pending |
| Gate decision | PASS | — | Pending |

# 17. Gate 08 — Story Acceptance Reviews

Xác minh:

- [ ] 10/10 Stories được review trên latest `develop`.
- [ ] Mọi direct Task đã merge trước Story Review.
- [ ] Acceptance Criteria = PASS.
- [ ] Cross-document consistency = PASS.
- [ ] Privacy/security/audit review = PASS.
- [ ] Dependency and guardrail review = PASS.
- [ ] Unowned open decisions = 0.
- [ ] Story PRs = 0.
- [ ] Story PASS không cấp quyền implementation.

| Evidence | Expected | Actual | Result |
|---|---|---|---|
| Primary evidence | Verified | — | Pending |
| Blocking findings | 0 | — | Pending |
| High findings | 0 | — | Pending |
| Gate decision | PASS | — | Pending |

# 18. Gate 09 — Core Epic Reviews

Xác minh:

- [ ] 9/9 Core Epics được review.
- [ ] Mọi related Story Review = PASS.
- [ ] Mọi direct Task = Documentation complete.
- [ ] Dependency coverage đầy đủ.
- [ ] Guardrail review = PASS.
- [ ] Released baseline conflict = 0.
- [ ] Security/privacy/audit coverage đầy đủ.
- [ ] Epic PRs = 0.
- [ ] Implementation authorization remains = No.

| Evidence | Expected | Actual | Result |
|---|---|---|---|
| Primary evidence | Verified | — | Pending |
| Blocking findings | 0 | — | Pending |
| High findings | 0 | — | Pending |
| Gate decision | PASS | — | Pending |

# 19. Gate 10 — Customer Management Privacy and Identity

Xác minh:

- [ ] Walk-in/anonymous customer được phân biệt với full customer profile.
- [ ] Identity ownership được mô tả.
- [ ] Consent và data minimization được mô tả.
- [ ] Retention/deletion được mô tả.
- [ ] Authorization/ownership được mô tả.
- [ ] Auditability được mô tả.
- [ ] Customer portal/loyalty vẫn là Future.
- [ ] Không thay Auth/RBAC hiện tại.
- [ ] Không có Customer implementation.

| Evidence | Expected | Actual | Result |
|---|---|---|---|
| Primary evidence | Verified | — | Pending |
| Blocking findings | 0 | — | Pending |
| High findings | 0 | — | Pending |
| Gate decision | PASS | — | Pending |

# 20. Gate 11 — Online Commerce and POS Boundary

Xác minh:

- [ ] Storefront/cart/wishlist được đánh dấu Future.
- [ ] Online order lifecycle tách POS Draft Order.
- [ ] Online checkout tách current POS checkout.
- [ ] Customer/payment/shipping/fulfillment dependencies được ghi.
- [ ] MVP DRAFT/PAID/CANCELLED không bị sửa.
- [ ] POS walk-in không phụ thuộc customer portal.
- [ ] Staff ownership scope không bị áp dụng sai cho online customer.
- [ ] Không có Online Commerce implementation.

| Evidence | Expected | Actual | Result |
|---|---|---|---|
| Primary evidence | Verified | — | Pending |
| Blocking findings | 0 | — | Pending |
| High findings | 0 | — | Pending |
| Gate decision | PASS | — | Pending |

# 21. Gate 12 — Product Variant and Medicine Sales-key Boundary

Xác minh:

- [ ] `medicine_id` vẫn là MVP sales key.
- [ ] Product/ProductVariant vẫn là Future/Proposed.
- [ ] Medicine ↔ Product/ProductVariant mapping được mô tả.
- [ ] MedicineBatch vẫn là inventory source of truth.
- [ ] Interaction Check vẫn dựa Medicine/ActiveIngredient.
- [ ] Catalog import có provenance, validation và curation.
- [ ] Không sửa POS/Checkout contract.
- [ ] Không có ProductVariant schema/seed implementation.

| Evidence | Expected | Actual | Result |
|---|---|---|---|
| Primary evidence | Verified | — | Pending |
| Blocking findings | 0 | — | Pending |
| High findings | 0 | — | Pending |
| Gate decision | PASS | — | Pending |

# 22. Gate 13 — Multi-store, Multi-warehouse and Stock Transfer

Xác minh:

- [ ] Default store/default warehouse assumption được ghi.
- [ ] Location isolation, RBAC và reporting impacts được ghi.
- [ ] Migration/readiness implications được ghi.
- [ ] Không thêm location schema/UI.
- [ ] Stock Transfer phụ thuộc Multi-warehouse.
- [ ] Source/destination/batch/quantity/status/audit được đề xuất.
- [ ] Concurrency/idempotency considerations được ghi.
- [ ] Inventory Adjustment không được dùng như Stock Transfer.
- [ ] Không có location/transfer implementation.

| Evidence | Expected | Actual | Result |
|---|---|---|---|
| Primary evidence | Verified | — | Pending |
| Blocking findings | 0 | — | Pending |
| High findings | 0 | — | Pending |
| Gate decision | PASS | — | Pending |

# 23. Gate 14 — Forecasting and Reorder Safety

Xác minh:

- [ ] Historical data requirements được ghi.
- [ ] Seasonality, lead time, stockout và cold-start được ghi.
- [ ] Accuracy/uncertainty limitations được ghi.
- [ ] Forecast chỉ là suggestion.
- [ ] Human approval bắt buộc.
- [ ] Không auto-create Stock Import.
- [ ] Không tự đổi reorder level.
- [ ] Không block checkout.
- [ ] Không thay deterministic report authority.

| Evidence | Expected | Actual | Result |
|---|---|---|---|
| Primary evidence | Verified | — | Pending |
| Blocking findings | 0 | — | Pending |
| High findings | 0 | — | Pending |
| Gate decision | PASS | — | Pending |

# 24. Gate 15 — Promotion, Coupon and Financial Isolation

Xác minh:

- [ ] MVP checkout no-discount invariant được giữ.
- [ ] Future pricing order được đề xuất.
- [ ] Eligibility/limits/audit được ghi.
- [ ] Payment/Invoice impacts được ghi.
- [ ] Revenue/Report impacts được ghi.
- [ ] Refund/return implications được ghi nếu áp dụng.
- [ ] Deterministic totals vẫn là authority.
- [ ] Không có checkout/payment/invoice/report implementation change.

| Evidence | Expected | Actual | Result |
|---|---|---|---|
| Primary evidence | Verified | — | Pending |
| Blocking findings | 0 | — | Pending |
| High findings | 0 | — | Pending |
| Gate decision | PASS | — | Pending |

# 25. Gate 16 — Shipping, Delivery and POS Lifecycle Isolation

Xác minh:

- [ ] Shipping chỉ thuộc Future Online Commerce.
- [ ] POS walk-in không cần shipping address.
- [ ] Address privacy được ghi.
- [ ] Carrier/tracking/status/audit được đề xuất.
- [ ] Order/payment/fulfillment boundary rõ.
- [ ] MVP DRAFT/PAID/CANCELLED không bị sửa.
- [ ] Không có shipment implementation.

| Evidence | Expected | Actual | Result |
|---|---|---|---|
| Primary evidence | Verified | — | Pending |
| Blocking findings | 0 | — | Pending |
| High findings | 0 | — | Pending |
| Gate decision | PASS | — | Pending |

# 26. Gate 17 — Review, CMS, Moderation and Abuse Controls

Xác minh:

- [ ] Review/rating và CMS boundaries rõ.
- [ ] Author/publisher/moderator roles được đề xuất.
- [ ] Moderation workflow được đề xuất.
- [ ] Spam/abuse/reporting controls được ghi.
- [ ] Content status/versioning được ghi.
- [ ] PII/prohibited-content considerations được ghi.
- [ ] Medicine/customer/order linkage risks được ghi.
- [ ] Không có Review/CMS implementation.

| Evidence | Expected | Actual | Result |
|---|---|---|---|
| Primary evidence | Verified | — | Pending |
| Blocking findings | 0 | — | Pending |
| High findings | 0 | — | Pending |
| Gate decision | PASS | — | Pending |

# 27. Gate 18 — Commercial Dependency Map and Final AI-agent Guardrails

Xác minh:

- [ ] Dependency map phủ đủ 9 commercial domains.
- [ ] Dependencies tới released MVP/Advanced modules được ghi.
- [ ] Dependency order rõ.
- [ ] Unresolved cycles = 0 hoặc có owner/evidence.
- [ ] Decision owners được ghi.
- [ ] Migration/readiness dependencies được ghi.
- [ ] PAC-TASK-579 commercial dependency map = PASS.
- [ ] PAC-TASK-580 final AI-agent guardrails = PASS.
- [ ] Guardrails cấm code Future scope.
- [ ] Guardrails bảo vệ `medicine_id`, MedicineBatch, POS, PostgreSQL và deterministic reports.

| Evidence | Expected | Actual | Result |
|---|---|---|---|
| Primary evidence | Verified | — | Pending |
| Blocking findings | 0 | — | Pending |
| High findings | 0 | — | Pending |
| Gate decision | PASS | — | Pending |

# 28. Gate 19 — Security, Documentation Quality and CI Policy

Xác minh:

- [ ] Secret exposure = 0.
- [ ] Raw customer PII example = 0.
- [ ] Destructive operations = 0.
- [ ] Markdown/structure checks = PASS.
- [ ] Links/references = PASS.
- [ ] Traceability = PASS.
- [ ] Terminology consistency = PASS.
- [ ] 25/25 Local Document Quality Gates = PASS.
- [ ] 25/25 PR reviews = PASS.
- [ ] Task GitHub Actions = N/A theo approved policy.
- [ ] Không workflow trigger/dependency changes.
- [ ] Merge SHA verification đầy đủ.

| Evidence | Expected | Actual | Result |
|---|---|---|---|
| Primary evidence | Verified | — | Pending |
| Blocking findings | 0 | — | Pending |
| High findings | 0 | — | Pending |
| Gate decision | PASS | — | Pending |

# 29. Gate 20 — Findings, Documentation Release PR and Final Authorization

Xác minh:

- [ ] Mọi finding có severity, evidence, owner và action.
- [ ] Blocking findings = 0.
- [ ] High findings = 0.
- [ ] Medium/Low findings có action.
- [ ] Không unresolved mapping/branch conflict.
- [ ] Không unresolved implementation ambiguity.
- [ ] Final Review Report được tạo.
- [ ] Progress/WORKING-CONTEXT được cập nhật đúng workflow.
- [ ] Documentation release PR `develop → main` tồn tại hoặc được tạo theo authorization.
- [ ] Release PR head SHA trùng reviewed `origin/develop` SHA.
- [ ] Không merge conflict.
- [ ] Applicable main/release GitHub Actions = PASS.
- [ ] Final Reviewer không merge.
- [ ] Commercial documentation approved có thể = Yes.
- [ ] Commercial implementation authorization phải = No.

| Evidence | Expected | Actual | Result |
|---|---|---|---|
| Primary evidence | Verified | — | Pending |
| Blocking findings | 0 | — | Pending |
| High findings | 0 | — | Pending |
| Gate decision | PASS | — | Pending |

# 30. Task Verification Register

| Task | Jira Key | Summary | Story | Epic | Exact branch | Deliverable | Local Gate | PR Review | Merged | Merge SHA | No-code diff | Result |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PAC-TASK-556 | PAC-766 | Document Full Customer Management future scope | US-161 | PAC-EPIC-31 | `docs/PAC-766-task-556-document-full-customer-management-future-scope` | Pending | Pending | Pending | Pending | — | Pending | Pending |
| PAC-TASK-557 | PAC-767 | Document customer profile CRUD future scope | US-161 | PAC-EPIC-31 | `docs/PAC-767-task-557-document-customer-profile-crud-future-scope` | Pending | Pending | Pending | Pending | — | Pending | Pending |
| PAC-TASK-558 | PAC-768 | Document customer purchase history expansion | US-161 | PAC-EPIC-31 | `docs/PAC-768-task-558-document-customer-purchase-history-expansion` | Pending | Pending | Pending | Pending | — | Pending | Pending |
| PAC-TASK-559 | PAC-769 | Document Online Commerce storefront future scope | US-162 | PAC-EPIC-32 | `docs/PAC-769-task-559-document-online-commerce-storefront-future-scope` | Pending | Pending | Pending | Pending | — | Pending | Pending |
| PAC-TASK-560 | PAC-770 | Document online cart and wishlist future scope | US-162 | PAC-EPIC-32 | `docs/PAC-770-task-560-document-online-cart-and-wishlist-future-scope` | Pending | Pending | Pending | Pending | — | Pending | Pending |
| PAC-TASK-561 | PAC-771 | Document online checkout separation from POS checkout | US-162 | PAC-EPIC-32 | `docs/PAC-771-task-561-document-online-checkout-separation-from-pos-checko` | Pending | Pending | Pending | Pending | — | Pending | Pending |
| PAC-TASK-562 | PAC-772 | Document Product Variant Catalog future scope | US-163 | PAC-EPIC-33 | `docs/PAC-772-task-562-document-product-variant-catalog-future-scope` | Pending | Pending | Pending | Pending | — | Pending | Pending |
| PAC-TASK-563 | PAC-773 | Document product images and documents commercial scope | US-163 | PAC-EPIC-33 | `docs/PAC-773-task-563-document-product-images-and-documents-commercial-sc` | Pending | Pending | Pending | Pending | — | Pending | Pending |
| PAC-TASK-564 | PAC-774 | Document real catalog data import future workflow | US-163 | PAC-EPIC-33 | `docs/PAC-774-task-564-document-real-catalog-data-import-future-workflow` | Pending | Pending | Pending | Pending | — | Pending | Pending |
| PAC-TASK-565 | PAC-775 | Document Multi-store future scope | US-164 | PAC-EPIC-34 | `docs/PAC-775-task-565-document-multi-store-future-scope` | Pending | Pending | Pending | Pending | — | Pending | Pending |
| PAC-TASK-566 | PAC-776 | Document default store assumption for MVP | US-164 | PAC-EPIC-34 | `docs/PAC-776-task-566-document-default-store-assumption-for-mvp` | Pending | Pending | Pending | Pending | — | Pending | Pending |
| PAC-TASK-567 | PAC-777 | Document Multi-warehouse future scope | US-165 | PAC-EPIC-34 | `docs/PAC-777-task-567-document-multi-warehouse-future-scope` | Pending | Pending | Pending | Pending | — | Pending | Pending |
| PAC-TASK-568 | PAC-778 | Document default warehouse assumption for MVP | US-165 | PAC-EPIC-34 | `docs/PAC-778-task-568-document-default-warehouse-assumption-for-mvp` | Pending | Pending | Pending | Pending | — | Pending | Pending |
| PAC-TASK-569 | PAC-779 | Document Stock Transfer future workflow | US-166 | PAC-EPIC-35 | `docs/PAC-779-task-569-document-stock-transfer-future-workflow` | Pending | Pending | Pending | Pending | — | Pending | Pending |
| PAC-TASK-570 | PAC-780 | Document stock transfer audit future requirement | US-166 | PAC-EPIC-35 | `docs/PAC-780-task-570-document-stock-transfer-audit-future-requirement` | Pending | Pending | Pending | Pending | — | Pending | Pending |
| PAC-TASK-571 | PAC-781 | Document Forecasting and reorder suggestion future scope | US-167 | PAC-EPIC-36 | `docs/PAC-781-task-571-document-forecasting-and-reorder-suggestion-future-` | Pending | Pending | Pending | Pending | — | Pending | Pending |
| PAC-TASK-572 | PAC-782 | Document forecast data requirements and limitations | US-167 | PAC-EPIC-36 | `docs/PAC-782-task-572-document-forecast-data-requirements-and-limitations` | Pending | Pending | Pending | Pending | — | Pending | Pending |
| PAC-TASK-573 | PAC-783 | Document Promotion and Coupon future scope | US-168 | PAC-EPIC-37 | `docs/PAC-783-task-573-document-promotion-and-coupon-future-scope` | Pending | Pending | Pending | Pending | — | Pending | Pending |
| PAC-TASK-574 | PAC-784 | Document discount not included in MVP checkout | US-168 | PAC-EPIC-37 | `docs/PAC-784-task-574-document-discount-not-included-in-mvp-checkout` | Pending | Pending | Pending | Pending | — | Pending | Pending |
| PAC-TASK-575 | PAC-785 | Document Shipping and Delivery future scope | US-169 | PAC-EPIC-38 | `docs/PAC-785-task-575-document-shipping-and-delivery-future-scope` | Pending | Pending | Pending | Pending | — | Pending | Pending |
| PAC-TASK-576 | PAC-786 | Document delivery status future workflow | US-169 | PAC-EPIC-38 | `docs/PAC-786-task-576-document-delivery-status-future-workflow` | Pending | Pending | Pending | Pending | — | Pending | Pending |
| PAC-TASK-577 | PAC-787 | Document Review and CMS future scope | US-170 | PAC-EPIC-39 | `docs/PAC-787-task-577-document-review-and-cms-future-scope` | Pending | Pending | Pending | Pending | — | Pending | Pending |
| PAC-TASK-578 | PAC-788 | Document product review moderation future consideration | US-170 | PAC-EPIC-39 | `docs/PAC-788-task-578-document-product-review-moderation-future-considera` | Pending | Pending | Pending | Pending | — | Pending | Pending |
| PAC-TASK-579 | PAC-789 | Document commercial expansion dependency map | US-170 | PAC-EPIC-39 | `docs/PAC-789-task-579-document-commercial-expansion-dependency-map` | Pending | Pending | Pending | Pending | — | Pending | Pending |
| PAC-TASK-580 | PAC-790 | Document final out-of-scope guardrails for AI agents | US-170 | PAC-EPIC-39 | `docs/PAC-790-task-580-document-final-out-of-scope-guardrails-for-ai-agent` | Pending | Pending | Pending | Pending | — | Pending | Pending |

# 31. Task Expected-result Checklist

## PAC-TASK-556 — Document Full Customer Management future scope

- Jira Key: `PAC-766`
- Exact branch: `docs/PAC-766-task-556-document-full-customer-management-future-scope`

Expected results:

- [ ] Customer Management không bị nhầm là MVP đầy đủ.
- [ ] POS walk-in vẫn hợp lệ.
- [ ] Future backlog rõ.
- [ ] AI agent không implement quá scope.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

## PAC-TASK-557 — Document customer profile CRUD future scope

- Jira Key: `PAC-767`
- Exact branch: `docs/PAC-767-task-557-document-customer-profile-crud-future-scope`

Expected results:

- [ ] Customer CRUD có định hướng.
- [ ] Không ảnh hưởng MVP.
- [ ] Future planning rõ.
- [ ] Scope kiểm soát tốt.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

## PAC-TASK-558 — Document customer purchase history expansion

- Jira Key: `PAC-768`
- Exact branch: `docs/PAC-768-task-558-document-customer-purchase-history-expansion`

Expected results:

- [ ] Future customer history rõ.
- [ ] Không lộ dữ liệu ngoài scope.
- [ ] Ownership baseline được giữ.
- [ ] Planning dễ hơn.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

## PAC-TASK-559 — Document Online Commerce storefront future scope

- Jira Key: `PAC-769`
- Exact branch: `docs/PAC-769-task-559-document-online-commerce-storefront-future-scope`

Expected results:

- [ ] Online commerce không bị đưa vào MVP.
- [ ] POS scope giữ ổn định.
- [ ] Future roadmap rõ.
- [ ] Không làm tăng scope hiện tại.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

## PAC-TASK-560 — Document online cart and wishlist future scope

- Jira Key: `PAC-770`
- Exact branch: `docs/PAC-770-task-560-document-online-cart-and-wishlist-future-scope`

Expected results:

- [ ] Cart/wishlist rõ là commercial expansion.
- [ ] Không ảnh hưởng checkout MVP.
- [ ] AI agent không tạo cart trong hiện tại.
- [ ] Scope future có note.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

## PAC-TASK-561 — Document online checkout separation from POS checkout

- Jira Key: `PAC-771`
- Exact branch: `docs/PAC-771-task-561-document-online-checkout-separation-from-pos-checko`

Expected results:

- [ ] Checkout MVP không bị pha scope online.
- [ ] Future design rõ hơn.
- [ ] Payment/shipping online không thành blocker.
- [ ] Documentation tránh hiểu nhầm.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

## PAC-TASK-562 — Document Product Variant Catalog future scope

- Jira Key: `PAC-772`
- Exact branch: `docs/PAC-772-task-562-document-product-variant-catalog-future-scope`

Expected results:

- [ ] Catalog future không làm rối MVP.
- [ ] medicine_id business key được bảo vệ.
- [ ] Real catalog data có vị trí đúng.
- [ ] AI agent không dùng product_variant cho POS.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

## PAC-TASK-563 — Document product images and documents commercial scope

- Jira Key: `PAC-773`
- Exact branch: `docs/PAC-773-task-563-document-product-images-and-documents-commercial-sc`

Expected results:

- [ ] Product media scope rõ.
- [ ] Không ép MVP phải có ảnh/tài liệu.
- [ ] Future catalog có định hướng.
- [ ] Documentation nhất quán.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

## PAC-TASK-564 — Document real catalog data import future workflow

- Jira Key: `PAC-774`
- Exact branch: `docs/PAC-774-task-564-document-real-catalog-data-import-future-workflow`

Expected results:

- [ ] Real catalog data được dùng đúng vai trò.
- [ ] MVP seed vẫn curated.
- [ ] Data quality risk được ghi nhận.
- [ ] Future import có hướng rõ.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

## PAC-TASK-565 — Document Multi-store future scope

- Jira Key: `PAC-775`
- Exact branch: `docs/PAC-775-task-565-document-multi-store-future-scope`

Expected results:

- [ ] Multi-store không vào MVP.
- [ ] Default store assumption rõ.
- [ ] Future roadmap có note.
- [ ] Không phức tạp hóa hiện tại.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

## PAC-TASK-566 — Document default store assumption for MVP

- Jira Key: `PAC-776`
- Exact branch: `docs/PAC-776-task-566-document-default-store-assumption-for-mvp`

Expected results:

- [ ] MVP data model dễ hiểu.
- [ ] Không tạo store workflow ngoài scope.
- [ ] Reports không bị rối.
- [ ] AI agent không thêm store selector.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

## PAC-TASK-567 — Document Multi-warehouse future scope

- Jira Key: `PAC-777`
- Exact branch: `docs/PAC-777-task-567-document-multi-warehouse-future-scope`

Expected results:

- [ ] Multi-warehouse không làm rối inventory MVP.
- [ ] Future scope rõ.
- [ ] Default warehouse được bảo vệ.
- [ ] Không thêm workflow kho phức tạp.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

## PAC-TASK-568 — Document default warehouse assumption for MVP

- Jira Key: `PAC-778`
- Exact branch: `docs/PAC-778-task-568-document-default-warehouse-assumption-for-mvp`

Expected results:

- [ ] Inventory MVP rõ phạm vi.
- [ ] Không cần warehouse selector.
- [ ] FEFO đơn giản hơn.
- [ ] Future multi-warehouse có nền tảng.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

## PAC-TASK-569 — Document Stock Transfer future workflow

- Jira Key: `PAC-779`
- Exact branch: `docs/PAC-779-task-569-document-stock-transfer-future-workflow`

Expected results:

- [ ] Stock Transfer rõ là future.
- [ ] MVP không bị yêu cầu chuyển kho.
- [ ] Inventory Adjustment không bị dùng sai để transfer.
- [ ] Roadmap rõ hơn.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

## PAC-TASK-570 — Document stock transfer audit future requirement

- Jira Key: `PAC-780`
- Exact branch: `docs/PAC-780-task-570-document-stock-transfer-audit-future-requirement`

Expected results:

- [ ] Future transfer có traceability.
- [ ] Không làm mất batch audit.
- [ ] Inventory governance được giữ.
- [ ] Documentation future đầy đủ.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

## PAC-TASK-571 — Document Forecasting and reorder suggestion future scope

- Jira Key: `PAC-781`
- Exact branch: `docs/PAC-781-task-571-document-forecasting-and-reorder-suggestion-future-`

Expected results:

- [ ] Forecasting không thành MVP blocker.
- [ ] Low-stock hiện tại vẫn deterministic.
- [ ] Future analytics có định hướng.
- [ ] Scope rõ ràng.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

## PAC-TASK-572 — Document forecast data requirements and limitations

- Jira Key: `PAC-782`
- Exact branch: `docs/PAC-782-task-572-document-forecast-data-requirements-and-limitations`

Expected results:

- [ ] Forecast future thực tế hơn.
- [ ] Không hứa quá mức.
- [ ] Demo MVP không bị đánh giá thiếu forecast.
- [ ] Documentation trung thực.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

## PAC-TASK-573 — Document Promotion and Coupon future scope

- Jira Key: `PAC-783`
- Exact branch: `docs/PAC-783-task-573-document-promotion-and-coupon-future-scope`

Expected results:

- [ ] Discount không chen vào POS MVP.
- [ ] Checkout total hiện tại đơn giản.
- [ ] Future scope rõ.
- [ ] AI agent không thêm coupon logic.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

## PAC-TASK-574 — Document discount not included in MVP checkout

- Jira Key: `PAC-784`
- Exact branch: `docs/PAC-784-task-574-document-discount-not-included-in-mvp-checkout`

Expected results:

- [ ] Checkout MVP không bị scope creep.
- [ ] Payment/invoice dễ kiểm tra.
- [ ] Revenue report rõ.
- [ ] Future discount tách riêng.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

## PAC-TASK-575 — Document Shipping and Delivery future scope

- Jira Key: `PAC-785`
- Exact branch: `docs/PAC-785-task-575-document-shipping-and-delivery-future-scope`

Expected results:

- [ ] Shipping không vào MVP.
- [ ] POS checkout không bị phức tạp.
- [ ] Future online commerce rõ hơn.
- [ ] Documentation nhất quán.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

## PAC-TASK-576 — Document delivery status future workflow

- Jira Key: `PAC-786`
- Exact branch: `docs/PAC-786-task-576-document-delivery-status-future-workflow`

Expected results:

- [ ] Delivery future có hướng thiết kế.
- [ ] Không làm rối order status MVP DRAFT/PAID/CANCELLED.
- [ ] Scope tách biệt.
- [ ] Future docs đầy đủ.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

## PAC-TASK-577 — Document Review and CMS future scope

- Jira Key: `PAC-787`
- Exact branch: `docs/PAC-787-task-577-document-review-and-cms-future-scope`

Expected results:

- [ ] Review/CMS không bị đưa vào MVP.
- [ ] Online commerce future rõ.
- [ ] Core pharmacy workflow tập trung.
- [ ] Scope được kiểm soát.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

## PAC-TASK-578 — Document product review moderation future consideration

- Jira Key: `PAC-788`
- Exact branch: `docs/PAC-788-task-578-document-product-review-moderation-future-considera`

Expected results:

- [ ] Future review có kiểm soát.
- [ ] Không bỏ qua moderation risk.
- [ ] MVP không bị mở rộng.
- [ ] Documentation đầy đủ hơn.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

## PAC-TASK-579 — Document commercial expansion dependency map

- Jira Key: `PAC-789`
- Exact branch: `docs/PAC-789-task-579-document-commercial-expansion-dependency-map`

Expected results:

- [ ] Future roadmap có thứ tự.
- [ ] Team không implement lộn scope.
- [ ] Dependency rõ khi mở rộng.
- [ ] Documentation chiến lược hơn.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

## PAC-TASK-580 — Document final out-of-scope guardrails for AI agents

- Jira Key: `PAC-790`
- Exact branch: `docs/PAC-790-task-580-document-final-out-of-scope-guardrails-for-ai-agent`

Expected results:

- [ ] AI agent có guardrail rõ.
- [ ] Dự án không quay lại baseline cũ.
- [ ] MVP/Should-have/Future được phân biệt.
- [ ] Jira Task set an toàn cho coding.

- [ ] Deliverable marked `FUTURE / PROPOSED / NOT IMPLEMENTED`.
- [ ] Product-code/schema/runtime diff = 0.
- [ ] Dependencies, risks, open questions and decision owner recorded.
- [ ] Local Document Quality Gate = PASS.
- [ ] PR Review = PASS.
- [ ] Merge SHA exists on `origin/develop`.

# 32. Story Acceptance Review Register

| Story | Jira Key | Summary | Epic | Points | Direct Tasks | AC | Consistency | Security/Privacy | Dependencies | Result |
|---|---|---|---|---:|---|---|---|---|---|---|
| US-161 | PAC-201 | Full Customer Management backlog | PAC-EPIC-31 | 2 | PAC-TASK-556, PAC-TASK-557, PAC-TASK-558 | Pending | Pending | Pending | Pending | Pending |
| US-162 | PAC-202 | Online Commerce backlog | PAC-EPIC-32 | 2 | PAC-TASK-559, PAC-TASK-560, PAC-TASK-561 | Pending | Pending | Pending | Pending | Pending |
| US-163 | PAC-203 | Product Variant Catalog backlog | PAC-EPIC-33 | 2 | PAC-TASK-562, PAC-TASK-563, PAC-TASK-564 | Pending | Pending | Pending | Pending | Pending |
| US-164 | PAC-204 | Multi-store support backlog | PAC-EPIC-34 | 2 | PAC-TASK-565, PAC-TASK-566 | Pending | Pending | Pending | Pending | Pending |
| US-165 | PAC-205 | Multi-warehouse support backlog | PAC-EPIC-34 | 2 | PAC-TASK-567, PAC-TASK-568 | Pending | Pending | Pending | Pending | Pending |
| US-166 | PAC-206 | Stock Transfer backlog | PAC-EPIC-35 | 2 | PAC-TASK-569, PAC-TASK-570 | Pending | Pending | Pending | Pending | Pending |
| US-167 | PAC-207 | Forecasting & Reorder backlog | PAC-EPIC-36 | 2 | PAC-TASK-571, PAC-TASK-572 | Pending | Pending | Pending | Pending | Pending |
| US-168 | PAC-208 | Promotion / Coupon backlog | PAC-EPIC-37 | 2 | PAC-TASK-573, PAC-TASK-574 | Pending | Pending | Pending | Pending | Pending |
| US-169 | PAC-209 | Shipping / Delivery backlog | PAC-EPIC-38 | 2 | PAC-TASK-575, PAC-TASK-576 | Pending | Pending | Pending | Pending | Pending |
| US-170 | PAC-210 | Review / CMS backlog | PAC-EPIC-39 | 2 | PAC-TASK-577, PAC-TASK-578, PAC-TASK-579, PAC-TASK-580 | Pending | Pending | Pending | Pending | Pending |

# 33. Story Acceptance Criteria Checklist

## US-161 — Full Customer Management backlog

- Jira Key: `PAC-201`
- Exact Story branch: `story/PAC-201-us-161-full-customer-management-backlog`

- [ ] Chỉ ghi nhận Future scope.
- [ ] Không làm MVP blocker.
- [ ] MVP chỉ cần walk-in/anonymous customer.
- [ ] Không tạo customer portal trong MVP.
- [ ] All direct Tasks merged and verified.
- [ ] Cross-document consistency = PASS.
- [ ] No implementation authorization implied.
- [ ] No Story PR.

## US-162 — Online Commerce backlog

- Jira Key: `PAC-202`
- Exact Story branch: `story/PAC-202-us-162-online-commerce-backlog`

- [ ] Chỉ ghi nhận Future scope.
- [ ] Không có cart/wishlist trong MVP.
- [ ] Không ảnh hưởng POS checkout.
- [ ] Không build storefront trong MVP.
- [ ] All direct Tasks merged and verified.
- [ ] Cross-document consistency = PASS.
- [ ] No implementation authorization implied.
- [ ] No Story PR.

## US-163 — Product Variant Catalog backlog

- Jira Key: `PAC-203`
- Exact Story branch: `story/PAC-203-us-163-product-variant-catalog-backlog`

- [ ] Chỉ ghi nhận Future scope.
- [ ] MVP sales dùng medicine_id.
- [ ] Không dùng product_variant_id cho checkout MVP.
- [ ] Không ép full catalog vào MVP.
- [ ] All direct Tasks merged and verified.
- [ ] Cross-document consistency = PASS.
- [ ] No implementation authorization implied.
- [ ] No Story PR.

## US-164 — Multi-store support backlog

- Jira Key: `PAC-204`
- Exact Story branch: `story/PAC-204-us-164-multi-store-support-backlog`

- [ ] Chỉ ghi nhận Future scope.
- [ ] MVP dùng một logical default store.
- [ ] Không thêm workflow store phức tạp vào MVP.
- [ ] Không ảnh hưởng MedicineBatch MVP.
- [ ] All direct Tasks merged and verified.
- [ ] Cross-document consistency = PASS.
- [ ] No implementation authorization implied.
- [ ] No Story PR.

## US-165 — Multi-warehouse support backlog

- Jira Key: `PAC-205`
- Exact Story branch: `story/PAC-205-us-165-multi-warehouse-support-backlog`

- [ ] Chỉ ghi nhận Future scope.
- [ ] MVP dùng một logical default warehouse.
- [ ] Không có stock by warehouse trong MVP.
- [ ] Không có multi-warehouse allocation.
- [ ] All direct Tasks merged and verified.
- [ ] Cross-document consistency = PASS.
- [ ] No implementation authorization implied.
- [ ] No Story PR.

## US-166 — Stock Transfer backlog

- Jira Key: `PAC-206`
- Exact Story branch: `story/PAC-206-us-166-stock-transfer-backlog`

- [ ] Chỉ ghi nhận Future scope.
- [ ] Không có transfer request trong MVP.
- [ ] Không dùng adjustment để giả lập transfer.
- [ ] Không ảnh hưởng stock import/checkout MVP.
- [ ] All direct Tasks merged and verified.
- [ ] Cross-document consistency = PASS.
- [ ] No implementation authorization implied.
- [ ] No Story PR.

## US-167 — Forecasting & Reorder backlog

- Jira Key: `PAC-207`
- Exact Story branch: `story/PAC-207-us-167-forecasting-reorder-backlog`

- [ ] Chỉ ghi nhận Future scope.
- [ ] Không dùng forecast trong MVP.
- [ ] Không tự tạo stock import.
- [ ] Không dùng forecast để chặn checkout.
- [ ] All direct Tasks merged and verified.
- [ ] Cross-document consistency = PASS.
- [ ] No implementation authorization implied.
- [ ] No Story PR.

## US-168 — Promotion / Coupon backlog

- Jira Key: `PAC-208`
- Exact Story branch: `story/PAC-208-us-168-promotion-coupon-backlog`

- [ ] Chỉ ghi nhận Future scope.
- [ ] MVP không có coupon engine.
- [ ] Checkout MVP không tính discount.
- [ ] Không ảnh hưởng payment/invoice MVP.
- [ ] All direct Tasks merged and verified.
- [ ] Cross-document consistency = PASS.
- [ ] No implementation authorization implied.
- [ ] No Story PR.

## US-169 — Shipping / Delivery backlog

- Jira Key: `PAC-209`
- Exact Story branch: `story/PAC-209-us-169-shipping-delivery-backlog`

- [ ] Chỉ ghi nhận Future scope.
- [ ] Không có shipping trong POS MVP.
- [ ] Không yêu cầu address/shipment.
- [ ] Chỉ liên quan khi mở Online Commerce.
- [ ] All direct Tasks merged and verified.
- [ ] Cross-document consistency = PASS.
- [ ] No implementation authorization implied.
- [ ] No Story PR.

## US-170 — Review / CMS backlog

- Jira Key: `PAC-210`
- Exact Story branch: `story/PAC-210-us-170-review-cms-backlog`

- [ ] Chỉ ghi nhận Future scope.
- [ ] Không có review/CMS trong MVP.
- [ ] Không ảnh hưởng POS/inventory/checkout.
- [ ] Chỉ dùng cho commercial expansion.
- [ ] All direct Tasks merged and verified.
- [ ] Cross-document consistency = PASS.
- [ ] No implementation authorization implied.
- [ ] No Story PR.

# 34. Core Epic Review Register

| Epic | Jira Key | Summary | Stories | Tasks | Dependency Review | Guardrail Review | Baseline Conflicts | Result |
|---|---|---|---|---|---|---|---|---|
| PAC-EPIC-31 | PAC-31 | Full Customer Management | US-161 | PAC-TASK-556, PAC-TASK-557, PAC-TASK-558 | Pending | Pending | Pending | Pending |
| PAC-EPIC-32 | PAC-32 | Online Commerce | US-162 | PAC-TASK-559, PAC-TASK-560, PAC-TASK-561 | Pending | Pending | Pending | Pending |
| PAC-EPIC-33 | PAC-33 | Product Variant Catalog | US-163 | PAC-TASK-562, PAC-TASK-563, PAC-TASK-564 | Pending | Pending | Pending | Pending |
| PAC-EPIC-34 | PAC-34 | Multi-store / Multi-warehouse | US-164, US-165 | PAC-TASK-565, PAC-TASK-566, PAC-TASK-567, PAC-TASK-568 | Pending | Pending | Pending | Pending |
| PAC-EPIC-35 | PAC-35 | Stock Transfer | US-166 | PAC-TASK-569, PAC-TASK-570 | Pending | Pending | Pending | Pending |
| PAC-EPIC-36 | PAC-36 | Forecasting & Reorder Suggestions | US-167 | PAC-TASK-571, PAC-TASK-572 | Pending | Pending | Pending | Pending |
| PAC-EPIC-37 | PAC-37 | Promotion / Coupon | US-168 | PAC-TASK-573, PAC-TASK-574 | Pending | Pending | Pending | Pending |
| PAC-EPIC-38 | PAC-38 | Shipping / Delivery | US-169 | PAC-TASK-575, PAC-TASK-576 | Pending | Pending | Pending | Pending |
| PAC-EPIC-39 | PAC-39 | Review / CMS | US-170 | PAC-TASK-577, PAC-TASK-578, PAC-TASK-579, PAC-TASK-580 | Pending | Pending | Pending | Pending |

# 35. Canonical Branch Reconciliation

## 35.1 Task Branches

| Task | Jira Key | Exact branch |
|---|---|---|
| PAC-TASK-556 | PAC-766 | `docs/PAC-766-task-556-document-full-customer-management-future-scope` |
| PAC-TASK-557 | PAC-767 | `docs/PAC-767-task-557-document-customer-profile-crud-future-scope` |
| PAC-TASK-558 | PAC-768 | `docs/PAC-768-task-558-document-customer-purchase-history-expansion` |
| PAC-TASK-559 | PAC-769 | `docs/PAC-769-task-559-document-online-commerce-storefront-future-scope` |
| PAC-TASK-560 | PAC-770 | `docs/PAC-770-task-560-document-online-cart-and-wishlist-future-scope` |
| PAC-TASK-561 | PAC-771 | `docs/PAC-771-task-561-document-online-checkout-separation-from-pos-checko` |
| PAC-TASK-562 | PAC-772 | `docs/PAC-772-task-562-document-product-variant-catalog-future-scope` |
| PAC-TASK-563 | PAC-773 | `docs/PAC-773-task-563-document-product-images-and-documents-commercial-sc` |
| PAC-TASK-564 | PAC-774 | `docs/PAC-774-task-564-document-real-catalog-data-import-future-workflow` |
| PAC-TASK-565 | PAC-775 | `docs/PAC-775-task-565-document-multi-store-future-scope` |
| PAC-TASK-566 | PAC-776 | `docs/PAC-776-task-566-document-default-store-assumption-for-mvp` |
| PAC-TASK-567 | PAC-777 | `docs/PAC-777-task-567-document-multi-warehouse-future-scope` |
| PAC-TASK-568 | PAC-778 | `docs/PAC-778-task-568-document-default-warehouse-assumption-for-mvp` |
| PAC-TASK-569 | PAC-779 | `docs/PAC-779-task-569-document-stock-transfer-future-workflow` |
| PAC-TASK-570 | PAC-780 | `docs/PAC-780-task-570-document-stock-transfer-audit-future-requirement` |
| PAC-TASK-571 | PAC-781 | `docs/PAC-781-task-571-document-forecasting-and-reorder-suggestion-future-` |
| PAC-TASK-572 | PAC-782 | `docs/PAC-782-task-572-document-forecast-data-requirements-and-limitations` |
| PAC-TASK-573 | PAC-783 | `docs/PAC-783-task-573-document-promotion-and-coupon-future-scope` |
| PAC-TASK-574 | PAC-784 | `docs/PAC-784-task-574-document-discount-not-included-in-mvp-checkout` |
| PAC-TASK-575 | PAC-785 | `docs/PAC-785-task-575-document-shipping-and-delivery-future-scope` |
| PAC-TASK-576 | PAC-786 | `docs/PAC-786-task-576-document-delivery-status-future-workflow` |
| PAC-TASK-577 | PAC-787 | `docs/PAC-787-task-577-document-review-and-cms-future-scope` |
| PAC-TASK-578 | PAC-788 | `docs/PAC-788-task-578-document-product-review-moderation-future-considera` |
| PAC-TASK-579 | PAC-789 | `docs/PAC-789-task-579-document-commercial-expansion-dependency-map` |
| PAC-TASK-580 | PAC-790 | `docs/PAC-790-task-580-document-final-out-of-scope-guardrails-for-ai-agent` |

## 35.2 Story Branches

| Story | Jira Key | Exact branch |
|---|---|---|
| US-161 | PAC-201 | `story/PAC-201-us-161-full-customer-management-backlog` |
| US-162 | PAC-202 | `story/PAC-202-us-162-online-commerce-backlog` |
| US-163 | PAC-203 | `story/PAC-203-us-163-product-variant-catalog-backlog` |
| US-164 | PAC-204 | `story/PAC-204-us-164-multi-store-support-backlog` |
| US-165 | PAC-205 | `story/PAC-205-us-165-multi-warehouse-support-backlog` |
| US-166 | PAC-206 | `story/PAC-206-us-166-stock-transfer-backlog` |
| US-167 | PAC-207 | `story/PAC-207-us-167-forecasting-reorder-backlog` |
| US-168 | PAC-208 | `story/PAC-208-us-168-promotion-coupon-backlog` |
| US-169 | PAC-209 | `story/PAC-209-us-169-shipping-delivery-backlog` |
| US-170 | PAC-210 | `story/PAC-210-us-170-review-cms-backlog` |

## 35.3 Core Epic Branches

| Epic | Jira Key | Exact branch |
|---|---|---|
| PAC-EPIC-31 | PAC-31 | `epic/PAC-31-epic-31-full-customer-management` |
| PAC-EPIC-32 | PAC-32 | `epic/PAC-32-epic-32-online-commerce` |
| PAC-EPIC-33 | PAC-33 | `epic/PAC-33-epic-33-product-variant-catalog` |
| PAC-EPIC-34 | PAC-34 | `epic/PAC-34-epic-34-multi-store-multi-warehouse` |
| PAC-EPIC-35 | PAC-35 | `epic/PAC-35-epic-35-stock-transfer` |
| PAC-EPIC-36 | PAC-36 | `epic/PAC-36-epic-36-forecasting-reorder-suggestions` |
| PAC-EPIC-37 | PAC-37 | `epic/PAC-37-epic-37-promotion-coupon` |
| PAC-EPIC-38 | PAC-38 | `epic/PAC-38-epic-38-shipping-delivery` |
| PAC-EPIC-39 | PAC-39 | `epic/PAC-39-epic-39-review-cms` |

# 36. Documentation-only Diff Checks

Chạy command phù hợp với repository:

```bash
git diff --check
git diff --stat origin/main..origin/develop
git diff --name-only origin/main..origin/develop
git diff --name-only origin/main..origin/develop -- backend frontend prisma .github

git diff --name-only origin/main..origin/develop -- package.json package-lock.json pnpm-lock.yaml yarn.lock

grep -Rni "IMPLEMENTED\|DEPLOYED\|PRODUCTION READY\|READY TO CODE" work-context/sprint-12 docs || true
grep -Rni "FUTURE\|PROPOSED\|NOT IMPLEMENTED" work-context/sprint-12 docs || true
grep -Rni "custom JWT\|password_hash\|aggregate inventory\|Neo4j source of truth" work-context/sprint-12 docs || true
```

Expected:

```text
Backend product changes = 0
Frontend product changes = 0
Prisma schema changes = 0
Migration changes = 0
Workflow changes = 0
Package/dependency changes = 0
Runtime/config changes = 0
Operational seed changes = 0
Secret exposure = 0
```

# 37. Documentation Release PR

Sau khi Gate 01–19 PASS và reviewed `origin/develop` SHA đã được ghi:

Tìm PR hiện có:

```text
Source = develop
Target = main
Purpose = integrate Sprint 12 documentation and run applicable main/release CI
```

Nếu PR đã tồn tại:

- Không tạo PR trùng.
- Xác minh head SHA trùng reviewed `origin/develop` SHA.
- Xác minh không conflict.
- Xác minh applicable GitHub Actions chạy trên đúng SHA.

Nếu chưa có PR và reviewer được Project Owner cho phép tạo:

```text
Title:
docs: integrate Sprint 12 commercial expansion documentation
```

Description tối thiểu:

```text
Sprint 12 Tasks = 25/25
Story Reviews = 10/10 PASS
Core Epic Reviews = 9/9 PASS
Branches reconciled = 44/44
Documentation-only verification = PASS
Product-code/schema/runtime changes = 0
Commercial dependency map = PASS
Final AI-agent guardrails = PASS
Reviewed develop SHA = <FULL_SHA>
Purpose = run applicable main/release CI and prepare Project Owner review
Merge authority = Project Owner only
Commercial implementation authorization = No
```

Applicable CI verification:

```text
Release PR head SHA = latest reviewed develop SHA
Required jobs pending = 0
Required jobs cancelled = 0
Required jobs failed = 0
All applicable jobs = PASS
```

Final Reviewer không merge PR.

# 38. Security and Secret Review

- [ ] Không Supabase service-role key.
- [ ] Không Neo4j credential.
- [ ] Không Google AI key.
- [ ] Không GitHub token.
- [ ] Không private key.
- [ ] Không production connection string.
- [ ] Không raw customer PII.
- [ ] Không secrets trong screenshot, diagram hoặc example.
- [ ] Không destructive SQL/Cypher/storage command.
- [ ] Không fake production credentials.
- [ ] Không external vendor secret.

# 39. Findings Register

| Finding ID | Severity | Gate | Affected Task/Story/Epic | Actual | Expected | Evidence | Impact | Required Action | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| — | — | — | — | Chưa có finding | — | — | — | — | — | — |

Severity:

```text
Blocker
High
Medium
Low
Observation
```

Không xóa finding để đạt PASS.

# 40. Decision Rules

## 40.1 PASS

Chỉ PASS khi:

```text
20/20 Gates PASS
25/25 Tasks verified
10/10 Story Reviews PASS
9/9 Epic Reviews PASS
44/44 branches reconciled
25/25 Task PRs merged
Applicable release/docs CI PASS
Blocker = 0
High = 0
Implementation authorization = No
```

## 40.2 FAIL

Dùng FAIL khi có evidence xác nhận:

- missing/invalid deliverable;
- wrong Jira mapping hoặc exact branch;
- unmerged Task PR;
- failed Story/Epic review;
- product/schema/runtime change;
- security/privacy/guardrail gap;
- failed applicable CI.

## 40.3 BLOCKED

Dùng BLOCKED khi:

- không truy cập được evidence bắt buộc;
- Sprint 11/Audit baseline chưa xác định;
- owner decision bắt buộc chưa có;
- branch/PR/merge evidence chưa đủ;
- release/docs PR hoặc CI chưa hoàn tất.

# 41. Final Review Report

Tạo:

```text
work-context/sprint-12/sprint-12-final-review-report.md
```

Cập nhật:

```text
work-context/sprint-12/sprint-12-progress.md
WORKING-CONTEXT.md
```

Không sửa Task deliverables hoặc production implementation trong report update.

# 42. Final Review Report Template

```md
# Sprint 12 Final Review Report

## Decision
PASS / FAIL / BLOCKED

## Mandatory Gates
x/20 PASS

## Repository and Released Baseline
- Current branch:
- Working tree:
- Local main SHA:
- Remote main SHA:
- Local develop SHA:
- Remote develop SHA:
- Sprint 11 Release PR:
- Sprint 11 main SHA:
- Sprint 12 Audit:

## Mapping and Reconciliation
- Task Jira mapping: x/25
- Story Jira mapping: x/10
- Epic Jira mapping: x/9
- Tasks verified: x/25
- Stories reviewed: x/10
- Epics reviewed: x/9
- Branches reconciled: x/44
- Task PRs merged: x/25
- Story PRs:
- Epic PRs:
- Mapping conflicts:

## Documentation-only Verification
- Backend product changes:
- Frontend product changes:
- Prisma schema changes:
- Migration changes:
- Workflow/dependency changes:
- Runtime/config changes:
- Operational seed changes:

## Domain Reviews
- Customer Management:
- Online Commerce:
- Product Variant Catalog:
- Multi-store/Multi-warehouse:
- Stock Transfer:
- Forecasting:
- Promotion/Coupon:
- Shipping/Delivery:
- Review/CMS:

## Cross-cutting Reviews
- Commercial dependency map:
- Final AI-agent guardrails:
- Traceability:
- Documentation quality:
- Security/secrets:

## Documentation Release PR
- PR:
- Head SHA:
- Merge conflict:
- Applicable jobs:
- GitHub Actions:

## Findings
- Blocker:
- High:
- Medium:
- Low:
- Observations:

## Final Authorization
- Sprint 12 Documentation Final Review:
- Commercial documentation approved:
- Commercial implementation authorization: No
- Released MVP/Advanced readiness remains:
- Project Owner may merge documentation release PR:
```

# 43. Final Response to Project Owner

```text
Decision: PASS / FAIL / BLOCKED
Mandatory Gates: x/20

Tasks verified: x/25
Stories reviewed: x/10
Core Epics reviewed: x/9
Branches reconciled: x/44
Task PRs merged: x/25

Task Jira mapping: x/25
Story Jira mapping: x/10
Epic Jira mapping: x/9
Mapping conflicts:

Local main SHA:
Remote main SHA:
Local develop SHA:
Remote develop SHA:

Documentation-only verification:
Product-code changes:
Prisma/migration changes:
Workflow/runtime changes:

Customer Management:
Online Commerce:
Product Variant Catalog:
Multi-store/Multi-warehouse:
Stock Transfer:
Forecasting:
Promotion/Coupon:
Shipping/Delivery:
Review/CMS:

Commercial dependency map:
Final AI-agent guardrails:
Traceability:
Documentation quality:
Security/secrets:

Release/docs PR:
Release/docs PR head SHA:
Applicable jobs:
GitHub Actions:

Blocking findings:
High findings:
Medium findings:
Low findings:
Required actions:

Sprint 12 Documentation Final Review:
Commercial documentation approved:
Commercial implementation authorization: No
Released MVP/Advanced readiness remains:
Project Owner may merge documentation release PR:
```

# 44. Start Instruction

```text
Run this Final Review independently.
Read all canonical sources.
Verify Jira mappings and exact branches from the correct source roles.
Verify repository, PR, merge and document evidence directly.
Execute all 20 Mandatory Gates.
Do not modify Sprint 12 deliverables or production code.
Do not merge develop → main.
Do not authorize commercial implementation.
Return PASS only after applicable release/docs CI passes.
```
