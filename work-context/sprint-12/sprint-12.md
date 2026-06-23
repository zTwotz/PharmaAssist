# Sprint 12 — Future / Commercial Expansion Documentation Backlog

> **Status:** Prepared only  
> **Scope:** Future / Commercial Expansion  
> **MVP Gate:** No  
> **Product implementation authorization:** Prohibited  
> **Permitted work:** Documentation, architecture planning, dependency mapping and backlog refinement only

---

## Canonical Sources

1. `Jira/branch-on-jira.md` — exact Jira Key và exact branch.
2. `Jira/jira-mapping.md` — logical key ↔ Jira Key.
3. `Jira/1_Components.md`.
4. `Jira/2_Epic.md`.
5. `Jira/3_Stories.md`.
6. `Jira/4D_Task_List_Testing_Advanced_Future_436_580.md`.
7. `Jira/4D_Task_Description_Testing_Advanced_Future_436_580.md`.
8. `Jira/5_Sprint.md`.
9. Sprint 11 Final Review Report và release baseline trên `main`.
10. Current repository, Prisma schema, Supabase, Neo4j và GitHub state.

`Jira/branch-on-jira.md` là nguồn duy nhất cho exact branch. Không tự tính Jira Key, không rút gọn slug và không tạo branch thay thế.

---

# 1. Sprint Overview

| Mục | Nội dung |
|---|---|
| Sprint | Sprint 12 |
| Tên | Future / Commercial Expansion Documentation Backlog |
| Scope | Future / Commercial Expansion |
| MVP Gate | Không |
| Product code | Không được triển khai |
| Tasks | PAC-TASK-556 → PAC-TASK-580 |
| Task count | 25 |
| Task Jira Keys | PAC-766 → PAC-790 |
| Stories | US-161 → US-170 |
| Story Jira Keys | PAC-201 → PAC-210 |
| Story count | 10 |
| Story Points | 20 |
| Core Epics | PAC-EPIC-31 → PAC-EPIC-39 |
| Core Epic count | 9 |
| Canonical branches | 44 = 25 Task + 10 Story + 9 Epic |
| Branch type cho Tasks | `docs/` |
| Initial status | Prepared |
| Ready to document Sprint 12 | No — pending Sprint 12 Audit and Project Leader approval |
| Ready to implement commercial features | No |

Sprint 12 là wave tài liệu hóa và chuẩn hóa backlog tương lai. Đây không phải sprint triển khai e-commerce hoặc commercial product.

# 2. Sprint Goal

Mục tiêu Sprint 12 là chuyển 25 Future Tasks thành một bộ tài liệu commercial-expansion có kiểm soát, giúp nhóm hiểu rõ phạm vi, dependency, dữ liệu, quyền, rủi ro và trình tự mở rộng sau MVP mà không làm thay đổi hệ thống đã phát hành.

Sprint phải tạo được:

- Ranh giới rõ giữa MVP, Advanced và Future.
- Future scope cho Customer Management, Online Commerce và Product Variant Catalog.
- Giả định một store/một warehouse của MVP và hướng mở rộng.
- Future workflow cho Stock Transfer, Promotion, Shipping và Review/CMS.
- Data requirements và limitation cho Forecasting.
- Commercial expansion dependency map.
- Guardrails cuối cùng để AI agent không tự code Future scope.

# 3. Entry and Authorization Gate

Chỉ bắt đầu Sprint 12 documentation khi:

```text
Sprint 11 Final Review = PASS
Sprint 11 Release PR = MERGED vào main
Full main/release CI = PASS
Sprint 11 final documentation = Recorded
Working tree = Clean
Blocking/High MVP regressions = 0
Project Leader approval for Sprint 12 documentation = Yes
Sprint 12 Audit = PASS
Ready to document Sprint 12 = Yes
```

Các điều kiện trên không cấp quyền triển khai schema, API, UI hoặc workflow thương mại.

```text
Ready to document Sprint 12 ≠ Ready to implement commercial features
```

# 4. Core Invariants

## 4.1 Documentation-only invariant

- Mọi PAC-TASK-556 → PAC-TASK-580 chỉ tạo hoặc cập nhật tài liệu.
- Không tạo Prisma model, migration, endpoint, service, UI, scheduler hoặc external integration.
- Không thêm package dependency để phục vụ Future scope.
- Không đổi API contract hiện tại.
- Không thêm feature flag giả để che code Future.
- Không seed commercial data vào operational/demo data.

## 4.2 MVP protection

- MVP vẫn bán hàng theo `medicine_id`.
- `MedicineBatch` vẫn là inventory source of truth.
- MVP dùng một logical default store và một logical default warehouse.
- Order MVP vẫn chỉ gồm `DRAFT`, `PAID`, `CANCELLED`.
- POS checkout và future online checkout phải được phân tách.
- MVP checkout không có promotion/coupon/discount.
- POS MVP không có shipping/delivery.
- Inventory Adjustment không được dùng để giả lập Stock Transfer.

## 4.3 Data and security

- Customer future scope phải có privacy, access control, retention và ownership notes.
- Multi-store/multi-warehouse phải có tenant/location data isolation.
- Stock Transfer phải bảo toàn batch traceability và audit.
- Forecast không được tự động tạo Stock Import hoặc quyết định bắt buộc.
- Review/CMS phải có moderation, abuse và permission considerations.

## 4.4 AI-agent safety

- Không code Future scope từ các tài liệu Sprint 12.
- Không coi proposed entity/table/endpoint là approved implementation.
- Khi gặp yêu cầu mâu thuẫn, dừng và yêu cầu Project Owner quyết định.
- Không quay lại custom JWT, aggregate inventory, Medicine-level interaction rule hoặc Neo4j source-of-truth.

# 5. Scope

## In scope

- Future capability descriptions.
- Proposed actors, use cases, business rules và permission boundaries.
- Proposed data concepts ở mức conceptual/logical, không migration.
- Dependency mapping.
- Risks, assumptions, limitations và non-goals.
- Migration/readiness considerations từ MVP sang commercial scale.
- Traceability Story → Epic → Task → future requirement.
- Final AI-agent out-of-scope guardrails.

## Out of scope

- Customer CRUD implementation.
- Customer portal, loyalty hoặc customer authentication.
- Storefront, cart, wishlist hoặc online order implementation.
- Online payment, online checkout hoặc shipping integration.
- Product/ProductVariant schema implementation.
- Multi-store/multi-warehouse data migration.
- Stock Transfer service/API/UI.
- Forecasting model hoặc automated reorder.
- Promotion/coupon engine.
- Shipment tracking.
- Review/rating/CMS implementation.
- Bất kỳ thay đổi production code, database, CI workflow hoặc runtime configuration nào.

# 6. Documentation Execution Order

Thứ tự ưu tiên bắt đầu từ domain nền, sau đó mới đến workflow phụ thuộc và guardrails tổng thể.

## Phase 1 — Full Customer Management Scope

| Task | Jira Key | Summary | Story | Epic | Component | Exact branch |
|---|---|---|---|---|---|---|
| PAC-TASK-556 | PAC-766 | Document Full Customer Management future scope | US-161 | PAC-EPIC-31 | Customer Management | `docs/PAC-766-task-556-document-full-customer-management-future-scope` |
| PAC-TASK-557 | PAC-767 | Document customer profile CRUD future scope | US-161 | PAC-EPIC-31 | Customer Management | `docs/PAC-767-task-557-document-customer-profile-crud-future-scope` |
| PAC-TASK-558 | PAC-768 | Document customer purchase history expansion | US-161 | PAC-EPIC-31 | Customer Management | `docs/PAC-768-task-558-document-customer-purchase-history-expansion` |

## Phase 2 — Online Commerce Boundary

| Task | Jira Key | Summary | Story | Epic | Component | Exact branch |
|---|---|---|---|---|---|---|
| PAC-TASK-559 | PAC-769 | Document Online Commerce storefront future scope | US-162 | PAC-EPIC-32 | Online Commerce | `docs/PAC-769-task-559-document-online-commerce-storefront-future-scope` |
| PAC-TASK-560 | PAC-770 | Document online cart and wishlist future scope | US-162 | PAC-EPIC-32 | Online Commerce | `docs/PAC-770-task-560-document-online-cart-and-wishlist-future-scope` |
| PAC-TASK-561 | PAC-771 | Document online checkout separation from POS checkout | US-162 | PAC-EPIC-32 | Online Commerce | `docs/PAC-771-task-561-document-online-checkout-separation-from-pos-checko` |

## Phase 3 — Product Variant Catalog and Catalog Data

| Task | Jira Key | Summary | Story | Epic | Component | Exact branch |
|---|---|---|---|---|---|---|
| PAC-TASK-562 | PAC-772 | Document Product Variant Catalog future scope | US-163 | PAC-EPIC-33 | Product Variant Catalog | `docs/PAC-772-task-562-document-product-variant-catalog-future-scope` |
| PAC-TASK-563 | PAC-773 | Document product images and documents commercial scope | US-163 | PAC-EPIC-33 | Product Variant Catalog | `docs/PAC-773-task-563-document-product-images-and-documents-commercial-sc` |
| PAC-TASK-564 | PAC-774 | Document real catalog data import future workflow | US-163 | PAC-EPIC-33 | Product Variant Catalog | `docs/PAC-774-task-564-document-real-catalog-data-import-future-workflow` |

## Phase 4 — Multi-store and Multi-warehouse Assumptions

| Task | Jira Key | Summary | Story | Epic | Component | Exact branch |
|---|---|---|---|---|---|---|
| PAC-TASK-565 | PAC-775 | Document Multi-store future scope | US-164 | PAC-EPIC-34 | Multi-store / Multi-warehouse | `docs/PAC-775-task-565-document-multi-store-future-scope` |
| PAC-TASK-566 | PAC-776 | Document default store assumption for MVP | US-164 | PAC-EPIC-34 | Multi-store / Multi-warehouse | `docs/PAC-776-task-566-document-default-store-assumption-for-mvp` |
| PAC-TASK-567 | PAC-777 | Document Multi-warehouse future scope | US-165 | PAC-EPIC-34 | Multi-store / Multi-warehouse | `docs/PAC-777-task-567-document-multi-warehouse-future-scope` |
| PAC-TASK-568 | PAC-778 | Document default warehouse assumption for MVP | US-165 | PAC-EPIC-34 | Multi-store / Multi-warehouse | `docs/PAC-778-task-568-document-default-warehouse-assumption-for-mvp` |

## Phase 5 — Stock Transfer Governance

| Task | Jira Key | Summary | Story | Epic | Component | Exact branch |
|---|---|---|---|---|---|---|
| PAC-TASK-569 | PAC-779 | Document Stock Transfer future workflow | US-166 | PAC-EPIC-35 | Stock Transfer | `docs/PAC-779-task-569-document-stock-transfer-future-workflow` |
| PAC-TASK-570 | PAC-780 | Document stock transfer audit future requirement | US-166 | PAC-EPIC-35 | Stock Transfer | `docs/PAC-780-task-570-document-stock-transfer-audit-future-requirement` |

## Phase 6 — Forecasting and Reorder Planning

| Task | Jira Key | Summary | Story | Epic | Component | Exact branch |
|---|---|---|---|---|---|---|
| PAC-TASK-571 | PAC-781 | Document Forecasting and reorder suggestion future scope | US-167 | PAC-EPIC-36 | Forecasting | `docs/PAC-781-task-571-document-forecasting-and-reorder-suggestion-future-` |
| PAC-TASK-572 | PAC-782 | Document forecast data requirements and limitations | US-167 | PAC-EPIC-36 | Forecasting | `docs/PAC-782-task-572-document-forecast-data-requirements-and-limitations` |

## Phase 7 — Promotion and Coupon Boundary

| Task | Jira Key | Summary | Story | Epic | Component | Exact branch |
|---|---|---|---|---|---|---|
| PAC-TASK-573 | PAC-783 | Document Promotion and Coupon future scope | US-168 | PAC-EPIC-37 | Promotion / Coupon | `docs/PAC-783-task-573-document-promotion-and-coupon-future-scope` |
| PAC-TASK-574 | PAC-784 | Document discount not included in MVP checkout | US-168 | PAC-EPIC-37 | Promotion / Coupon | `docs/PAC-784-task-574-document-discount-not-included-in-mvp-checkout` |

## Phase 8 — Shipping and Delivery Boundary

| Task | Jira Key | Summary | Story | Epic | Component | Exact branch |
|---|---|---|---|---|---|---|
| PAC-TASK-575 | PAC-785 | Document Shipping and Delivery future scope | US-169 | PAC-EPIC-38 | Shipping | `docs/PAC-785-task-575-document-shipping-and-delivery-future-scope` |
| PAC-TASK-576 | PAC-786 | Document delivery status future workflow | US-169 | PAC-EPIC-38 | Shipping | `docs/PAC-786-task-576-document-delivery-status-future-workflow` |

## Phase 9 — Review/CMS, Dependency Map and Final Guardrails

| Task | Jira Key | Summary | Story | Epic | Component | Exact branch |
|---|---|---|---|---|---|---|
| PAC-TASK-577 | PAC-787 | Document Review and CMS future scope | US-170 | PAC-EPIC-39 | Review / CMS | `docs/PAC-787-task-577-document-review-and-cms-future-scope` |
| PAC-TASK-578 | PAC-788 | Document product review moderation future consideration | US-170 | PAC-EPIC-39 | Review / CMS | `docs/PAC-788-task-578-document-product-review-moderation-future-considera` |
| PAC-TASK-579 | PAC-789 | Document commercial expansion dependency map | US-170 | PAC-EPIC-39 | Documentation | `docs/PAC-789-task-579-document-commercial-expansion-dependency-map` |
| PAC-TASK-580 | PAC-790 | Document final out-of-scope guardrails for AI agents | US-170 | PAC-EPIC-39 | Documentation | `docs/PAC-790-task-580-document-final-out-of-scope-guardrails-for-ai-agent` |

First logical Task:

```text
PAC-TASK-556
PAC-766
docs/PAC-766-task-556-document-full-customer-management-future-scope
```

Recommended execution order phải giữ nguyên Task logical key, Jira Key và exact branch.

# 7. Phase Acceptance Gates

## Phase 1 — Customer Management

- Phân biệt rõ full customer profile với walk-in/anonymous customer.
- Có privacy, ownership, retention và authorization considerations.
- Không tạo customer portal hoặc customer tables.

## Phase 2 — Online Commerce

- Storefront/cart/wishlist được ghi là Future.
- Online checkout tách khỏi POS checkout.
- Không thay endpoint hoặc order lifecycle MVP.

## Phase 3 — Product Catalog

- MVP vẫn dùng medicine_id.
- ProductVariant không trở thành sales key MVP.
- Real catalog import phải qua review/curation và data-quality gates.

## Phase 4 — Store/Warehouse

- Default store/default warehouse assumption được ghi rõ.
- Ảnh hưởng future tới inventory/order/report được mô tả.
- Không thêm store/warehouse selector hoặc data partition hiện tại.

## Phase 5 — Stock Transfer

- Không dùng Inventory Adjustment để giả lập transfer.
- Có source/destination, batch, quantity, status và audit proposal.
- Phụ thuộc Multi-warehouse được ghi rõ.

## Phase 6 — Forecasting

- Forecast chỉ là suggestion.
- Có data sufficiency, seasonality và accuracy limitations.
- Không tự động tạo Stock Import hoặc chặn checkout.

## Phase 7 — Promotion/Coupon

- MVP checkout không có discount.
- Tác động future tới pricing/payment/invoice/report được mô tả.
- Không sửa deterministic revenue hiện tại.

## Phase 8 — Shipping/Delivery

- Chỉ áp dụng cho Online Commerce future.
- Không làm thay đổi POS order status MVP.
- Có proposed tracking/audit nhưng không implementation.

## Phase 9 — Review/CMS and Guardrails

- Có moderation, spam/abuse và role considerations.
- Dependency map phủ đủ commercial modules.
- Final AI-agent guardrails chặn mọi code Future ngoài phê duyệt.

# 8. Story Plan

## US-161 — Full Customer Management backlog

- **Jira Key:** `PAC-201`
- **Story Points:** 2
- **Parent:** PAC-EPIC-31 - Full Customer Management
- **Component:** Customer Management
- **Exact Story branch:** `story/PAC-201-us-161-full-customer-management-backlog`
- **Direct Tasks:** PAC-TASK-556, PAC-TASK-557, PAC-TASK-558

### Acceptance Criteria

- Chỉ ghi nhận Future scope.
- Không làm MVP blocker.
- MVP chỉ cần walk-in/anonymous customer.
- Không tạo customer portal trong MVP.

### Sprint 12 Review Notes

- Chỉ PASS khi mọi direct Task đã merge vào `develop` và tài liệu nhất quán.
- Không tạo Story PR.
- Không coi Story PASS là authorization để triển khai product code.

## US-162 — Online Commerce backlog

- **Jira Key:** `PAC-202`
- **Story Points:** 2
- **Parent:** PAC-EPIC-32 - Online Commerce
- **Component:** Online Commerce
- **Exact Story branch:** `story/PAC-202-us-162-online-commerce-backlog`
- **Direct Tasks:** PAC-TASK-559, PAC-TASK-560, PAC-TASK-561

### Acceptance Criteria

- Chỉ ghi nhận Future scope.
- Không có cart/wishlist trong MVP.
- Không ảnh hưởng POS checkout.
- Không build storefront trong MVP.

### Sprint 12 Review Notes

- Chỉ PASS khi mọi direct Task đã merge vào `develop` và tài liệu nhất quán.
- Không tạo Story PR.
- Không coi Story PASS là authorization để triển khai product code.

## US-163 — Product Variant Catalog backlog

- **Jira Key:** `PAC-203`
- **Story Points:** 2
- **Parent:** PAC-EPIC-33 - Product Variant Catalog
- **Component:** Product Variant Catalog
- **Exact Story branch:** `story/PAC-203-us-163-product-variant-catalog-backlog`
- **Direct Tasks:** PAC-TASK-562, PAC-TASK-563, PAC-TASK-564

### Acceptance Criteria

- Chỉ ghi nhận Future scope.
- MVP sales dùng medicine_id.
- Không dùng product_variant_id cho checkout MVP.
- Không ép full catalog vào MVP.

### Sprint 12 Review Notes

- Chỉ PASS khi mọi direct Task đã merge vào `develop` và tài liệu nhất quán.
- Không tạo Story PR.
- Không coi Story PASS là authorization để triển khai product code.

## US-164 — Multi-store support backlog

- **Jira Key:** `PAC-204`
- **Story Points:** 2
- **Parent:** PAC-EPIC-34 - Multi-store / Multi-warehouse
- **Component:** Multi-store / Multi-warehouse
- **Exact Story branch:** `story/PAC-204-us-164-multi-store-support-backlog`
- **Direct Tasks:** PAC-TASK-565, PAC-TASK-566

### Acceptance Criteria

- Chỉ ghi nhận Future scope.
- MVP dùng một logical default store.
- Không thêm workflow store phức tạp vào MVP.
- Không ảnh hưởng MedicineBatch MVP.

### Sprint 12 Review Notes

- Chỉ PASS khi mọi direct Task đã merge vào `develop` và tài liệu nhất quán.
- Không tạo Story PR.
- Không coi Story PASS là authorization để triển khai product code.

## US-165 — Multi-warehouse support backlog

- **Jira Key:** `PAC-205`
- **Story Points:** 2
- **Parent:** PAC-EPIC-34 - Multi-store / Multi-warehouse
- **Component:** Multi-store / Multi-warehouse
- **Exact Story branch:** `story/PAC-205-us-165-multi-warehouse-support-backlog`
- **Direct Tasks:** PAC-TASK-567, PAC-TASK-568

### Acceptance Criteria

- Chỉ ghi nhận Future scope.
- MVP dùng một logical default warehouse.
- Không có stock by warehouse trong MVP.
- Không có multi-warehouse allocation.

### Sprint 12 Review Notes

- Chỉ PASS khi mọi direct Task đã merge vào `develop` và tài liệu nhất quán.
- Không tạo Story PR.
- Không coi Story PASS là authorization để triển khai product code.

## US-166 — Stock Transfer backlog

- **Jira Key:** `PAC-206`
- **Story Points:** 2
- **Parent:** PAC-EPIC-35 - Stock Transfer
- **Component:** Stock Transfer
- **Exact Story branch:** `story/PAC-206-us-166-stock-transfer-backlog`
- **Direct Tasks:** PAC-TASK-569, PAC-TASK-570

### Acceptance Criteria

- Chỉ ghi nhận Future scope.
- Không có transfer request trong MVP.
- Không dùng adjustment để giả lập transfer.
- Không ảnh hưởng stock import/checkout MVP.

### Sprint 12 Review Notes

- Chỉ PASS khi mọi direct Task đã merge vào `develop` và tài liệu nhất quán.
- Không tạo Story PR.
- Không coi Story PASS là authorization để triển khai product code.

## US-167 — Forecasting & Reorder backlog

- **Jira Key:** `PAC-207`
- **Story Points:** 2
- **Parent:** PAC-EPIC-36 - Forecasting & Reorder Suggestions
- **Component:** Forecasting
- **Exact Story branch:** `story/PAC-207-us-167-forecasting-reorder-backlog`
- **Direct Tasks:** PAC-TASK-571, PAC-TASK-572

### Acceptance Criteria

- Chỉ ghi nhận Future scope.
- Không dùng forecast trong MVP.
- Không tự tạo stock import.
- Không dùng forecast để chặn checkout.

### Sprint 12 Review Notes

- Chỉ PASS khi mọi direct Task đã merge vào `develop` và tài liệu nhất quán.
- Không tạo Story PR.
- Không coi Story PASS là authorization để triển khai product code.

## US-168 — Promotion / Coupon backlog

- **Jira Key:** `PAC-208`
- **Story Points:** 2
- **Parent:** PAC-EPIC-37 - Promotion / Coupon
- **Component:** Promotion / Coupon
- **Exact Story branch:** `story/PAC-208-us-168-promotion-coupon-backlog`
- **Direct Tasks:** PAC-TASK-573, PAC-TASK-574

### Acceptance Criteria

- Chỉ ghi nhận Future scope.
- MVP không có coupon engine.
- Checkout MVP không tính discount.
- Không ảnh hưởng payment/invoice MVP.

### Sprint 12 Review Notes

- Chỉ PASS khi mọi direct Task đã merge vào `develop` và tài liệu nhất quán.
- Không tạo Story PR.
- Không coi Story PASS là authorization để triển khai product code.

## US-169 — Shipping / Delivery backlog

- **Jira Key:** `PAC-209`
- **Story Points:** 2
- **Parent:** PAC-EPIC-38 - Shipping / Delivery
- **Component:** Shipping
- **Exact Story branch:** `story/PAC-209-us-169-shipping-delivery-backlog`
- **Direct Tasks:** PAC-TASK-575, PAC-TASK-576

### Acceptance Criteria

- Chỉ ghi nhận Future scope.
- Không có shipping trong POS MVP.
- Không yêu cầu address/shipment.
- Chỉ liên quan khi mở Online Commerce.

### Sprint 12 Review Notes

- Chỉ PASS khi mọi direct Task đã merge vào `develop` và tài liệu nhất quán.
- Không tạo Story PR.
- Không coi Story PASS là authorization để triển khai product code.

## US-170 — Review / CMS backlog

- **Jira Key:** `PAC-210`
- **Story Points:** 2
- **Parent:** PAC-EPIC-39 - Review / CMS
- **Component:** Review / CMS
- **Exact Story branch:** `story/PAC-210-us-170-review-cms-backlog`
- **Direct Tasks:** PAC-TASK-577, PAC-TASK-578, PAC-TASK-579, PAC-TASK-580

### Acceptance Criteria

- Chỉ ghi nhận Future scope.
- Không có review/CMS trong MVP.
- Không ảnh hưởng POS/inventory/checkout.
- Chỉ dùng cho commercial expansion.

### Sprint 12 Review Notes

- Chỉ PASS khi mọi direct Task đã merge vào `develop` và tài liệu nhất quán.
- Không tạo Story PR.
- Không coi Story PASS là authorization để triển khai product code.

# 9. Epic Review Plan

| Epic | Jira Key | Name | Story count | Task count | Exact branch |
|---|---|---|---:|---:|---|
| PAC-EPIC-31 | PAC-31 | Full Customer Management | 1 | 3 | `epic/PAC-31-epic-31-full-customer-management` |
| PAC-EPIC-32 | PAC-32 | Online Commerce | 1 | 3 | `epic/PAC-32-epic-32-online-commerce` |
| PAC-EPIC-33 | PAC-33 | Product Variant Catalog | 1 | 3 | `epic/PAC-33-epic-33-product-variant-catalog` |
| PAC-EPIC-34 | PAC-34 | Multi-store / Multi-warehouse | 2 | 4 | `epic/PAC-34-epic-34-multi-store-multi-warehouse` |
| PAC-EPIC-35 | PAC-35 | Stock Transfer | 1 | 2 | `epic/PAC-35-epic-35-stock-transfer` |
| PAC-EPIC-36 | PAC-36 | Forecasting & Reorder Suggestions | 1 | 2 | `epic/PAC-36-epic-36-forecasting-reorder-suggestions` |
| PAC-EPIC-37 | PAC-37 | Promotion / Coupon | 1 | 2 | `epic/PAC-37-epic-37-promotion-coupon` |
| PAC-EPIC-38 | PAC-38 | Shipping / Delivery | 1 | 2 | `epic/PAC-38-epic-38-shipping-delivery` |
| PAC-EPIC-39 | PAC-39 | Review / CMS | 1 | 4 | `epic/PAC-39-epic-39-review-cms` |

Không tạo Epic PR. Epic Review chỉ là review traceability, dependency, guardrail và completeness của tài liệu.

# 10. Documentation Deliverable Standard

Mỗi Task phải tạo hoặc cập nhật một deliverable có đủ:

1. Mục tiêu và business value.
2. Actors và permission boundary dự kiến.
3. In-scope / out-of-scope.
4. Business rules dự kiến.
5. Conceptual data model hoặc entity candidates, được đánh dấu `PROPOSED`.
6. API/UI/workflow candidates ở mức thiết kế, được đánh dấu `NOT IMPLEMENTED`.
7. Dependency với MVP/Advanced/Future modules.
8. Security, privacy, audit và compliance considerations.
9. Migration/readiness implications.
10. Risks, assumptions, open questions và decision owners.
11. Traceability tới Story, Epic và Task.
12. Guardrail rõ rằng tài liệu không cấp quyền code.

Không được viết proposed schema/API theo cách khiến người đọc hiểu nhầm là contract đã phê duyệt.

# 11. Task Execution Cards

## PAC-TASK-556 — Document Full Customer Management future scope

- **Jira Key:** `PAC-766`
- **Story:** `US-161`
- **Epic:** `PAC-EPIC-31`
- **Component:** Customer Management
- **Priority:** Low
- **Exact branch:** `docs/PAC-766-task-556-document-full-customer-management-future-scope`
- **Allowed change type:** Documentation only

Nhóm cần ghi nhận Full Customer Management là future scope.

### Nội dung công việc

- Mô tả customer profile đầy đủ.
- Ghi không phải MVP.
- Phân biệt với walk-in customer trong POS.
- Ghi dependency nếu mở rộng.
- Gắn Epic/Story future.

### Kết quả mong đợi

- Customer Management không bị nhầm là MVP đầy đủ.
- POS walk-in vẫn hợp lệ.
- Future backlog rõ.
- AI agent không implement quá scope.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

## PAC-TASK-557 — Document customer profile CRUD future scope

- **Jira Key:** `PAC-767`
- **Story:** `US-161`
- **Epic:** `PAC-EPIC-31`
- **Component:** Customer Management
- **Priority:** Low
- **Exact branch:** `docs/PAC-767-task-557-document-customer-profile-crud-future-scope`
- **Allowed change type:** Documentation only

Nhóm cần mô tả customer CRUD tương lai.

### Nội dung công việc

- Ghi create/update/view customer profile.
- Ghi fields dự kiến.
- Ghi privacy/security consideration.
- Ghi authorization future.
- Không implement MVP.

### Kết quả mong đợi

- Customer CRUD có định hướng.
- Không ảnh hưởng MVP.
- Future planning rõ.
- Scope kiểm soát tốt.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

## PAC-TASK-558 — Document customer purchase history expansion

- **Jira Key:** `PAC-768`
- **Story:** `US-161`
- **Epic:** `PAC-EPIC-31`
- **Component:** Customer Management
- **Priority:** Low
- **Exact branch:** `docs/PAC-768-task-558-document-customer-purchase-history-expansion`
- **Allowed change type:** Documentation only

Nhóm cần ghi nhận mở rộng lịch sử mua hàng khách hàng.

### Nội dung công việc

- Mô tả customer purchase history.
- Ghi Staff ownership/permission cần giữ.
- Ghi Admin read-all future permission nếu cần.
- Ghi privacy consideration.
- Không implement full scope trong MVP.

### Kết quả mong đợi

- Future customer history rõ.
- Không lộ dữ liệu ngoài scope.
- Ownership baseline được giữ.
- Planning dễ hơn.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

## PAC-TASK-559 — Document Online Commerce storefront future scope

- **Jira Key:** `PAC-769`
- **Story:** `US-162`
- **Epic:** `PAC-EPIC-32`
- **Component:** Online Commerce
- **Priority:** Low
- **Exact branch:** `docs/PAC-769-task-559-document-online-commerce-storefront-future-scope`
- **Allowed change type:** Documentation only

Nhóm cần ghi nhận storefront online là future scope.

### Nội dung công việc

- Mô tả website bán hàng online.
- Ghi khác với POS nội bộ.
- Ghi module sản phẩm/catalog cần mở rộng.
- Ghi không thuộc MVP.
- Ghi dependency shipping/payment online nếu có.

### Kết quả mong đợi

- Online commerce không bị đưa vào MVP.
- POS scope giữ ổn định.
- Future roadmap rõ.
- Không làm tăng scope hiện tại.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

## PAC-TASK-560 — Document online cart and wishlist future scope

- **Jira Key:** `PAC-770`
- **Story:** `US-162`
- **Epic:** `PAC-EPIC-32`
- **Component:** Online Commerce
- **Priority:** Low
- **Exact branch:** `docs/PAC-770-task-560-document-online-cart-and-wishlist-future-scope`
- **Allowed change type:** Documentation only

Nhóm cần mô tả cart/wishlist tương lai.

### Nội dung công việc

- Ghi cart cho customer portal.
- Ghi wishlist.
- Ghi auth/customer dependency.
- Ghi không dùng trong POS MVP.
- Ghi data tables future nếu cần.

### Kết quả mong đợi

- Cart/wishlist rõ là commercial expansion.
- Không ảnh hưởng checkout MVP.
- AI agent không tạo cart trong hiện tại.
- Scope future có note.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

## PAC-TASK-561 — Document online checkout separation from POS checkout

- **Jira Key:** `PAC-771`
- **Story:** `US-162`
- **Epic:** `PAC-EPIC-32`
- **Component:** Online Commerce
- **Priority:** Low
- **Exact branch:** `docs/PAC-771-task-561-document-online-checkout-separation-from-pos-checko`
- **Allowed change type:** Documentation only

Nhóm cần ghi rõ online checkout future tách với POS checkout MVP.

### Nội dung công việc

- Mô tả POS checkout hiện tại.
- Mô tả online checkout future.
- Ghi khác nhau về customer, shipping, online payment.
- Ghi không reuse sai endpoint nếu không thiết kế.
- Không implement online checkout.

### Kết quả mong đợi

- Checkout MVP không bị pha scope online.
- Future design rõ hơn.
- Payment/shipping online không thành blocker.
- Documentation tránh hiểu nhầm.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

## PAC-TASK-562 — Document Product Variant Catalog future scope

- **Jira Key:** `PAC-772`
- **Story:** `US-163`
- **Epic:** `PAC-EPIC-33`
- **Component:** Product Variant Catalog
- **Priority:** Low
- **Exact branch:** `docs/PAC-772-task-562-document-product-variant-catalog-future-scope`
- **Allowed change type:** Documentation only

Nhóm cần ghi nhận Product Variant Catalog là future scope.

### Nội dung công việc

- Mô tả products/product_variants dùng cho commercial catalog.
- Ghi MVP sales dùng medicine_id.
- Ghi product variant không là sales key MVP.
- Ghi dependency online commerce.
- Không implement trong MVP.

### Kết quả mong đợi

- Catalog future không làm rối MVP.
- medicine_id business key được bảo vệ.
- Real catalog data có vị trí đúng.
- AI agent không dùng product_variant cho POS.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

## PAC-TASK-563 — Document product images and documents commercial scope

- **Jira Key:** `PAC-773`
- **Story:** `US-163`
- **Epic:** `PAC-EPIC-33`
- **Component:** Product Variant Catalog
- **Priority:** Low
- **Exact branch:** `docs/PAC-773-task-563-document-product-images-and-documents-commercial-sc`
- **Allowed change type:** Documentation only

Nhóm cần ghi nhận ảnh/tài liệu sản phẩm là commercial expansion.

### Nội dung công việc

- Mô tả product_images/product_documents.
- Ghi liên quan catalog online.
- Ghi Supabase Storage có thể là Should-have riêng.
- Ghi không bắt buộc MVP.
- Ghi future data handling.

### Kết quả mong đợi

- Product media scope rõ.
- Không ép MVP phải có ảnh/tài liệu.
- Future catalog có định hướng.
- Documentation nhất quán.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

## PAC-TASK-564 — Document real catalog data import future workflow

- **Jira Key:** `PAC-774`
- **Story:** `US-163`
- **Epic:** `PAC-EPIC-33`
- **Component:** Product Variant Catalog
- **Priority:** Low
- **Exact branch:** `docs/PAC-774-task-564-document-real-catalog-data-import-future-workflow`
- **Allowed change type:** Documentation only

Nhóm cần mô tả workflow import dữ liệu catalog thật trong tương lai.

### Nội dung công việc

- Ghi raw catalog data cần review/curate.
- Ghi mapping sang Medicine/ActiveIngredient nếu dùng operational seed.
- Ghi data quality checks.
- Ghi không import thẳng raw data vào MVP operational data.
- Ghi future ETL workflow.

### Kết quả mong đợi

- Real catalog data được dùng đúng vai trò.
- MVP seed vẫn curated.
- Data quality risk được ghi nhận.
- Future import có hướng rõ.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

## PAC-TASK-565 — Document Multi-store future scope

- **Jira Key:** `PAC-775`
- **Story:** `US-164`
- **Epic:** `PAC-EPIC-34`
- **Component:** Multi-store / Multi-warehouse
- **Priority:** Low
- **Exact branch:** `docs/PAC-775-task-565-document-multi-store-future-scope`
- **Allowed change type:** Documentation only

Nhóm cần ghi nhận multi-store là future scope.

### Nội dung công việc

- Mô tả nhiều cửa hàng.
- Ghi MVP dùng một logical default store.
- Ghi tác động tới inventory/order/report.
- Ghi không implement multi-store workflow.
- Ghi future permission/data scope.

### Kết quả mong đợi

- Multi-store không vào MVP.
- Default store assumption rõ.
- Future roadmap có note.
- Không phức tạp hóa hiện tại.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

## PAC-TASK-566 — Document default store assumption for MVP

- **Jira Key:** `PAC-776`
- **Story:** `US-164`
- **Epic:** `PAC-EPIC-34`
- **Component:** Multi-store / Multi-warehouse
- **Priority:** Low
- **Exact branch:** `docs/PAC-776-task-566-document-default-store-assumption-for-mvp`
- **Allowed change type:** Documentation only

Nhóm cần ghi rõ giả định default store cho MVP.

### Nội dung công việc

- Ghi một logical store mặc định.
- Ghi order/inventory/report dùng default store.
- Ghi multi-store future.
- Ghi không cần UI chọn store trong MVP.
- Ghi ảnh hưởng testing.

### Kết quả mong đợi

- MVP data model dễ hiểu.
- Không tạo store workflow ngoài scope.
- Reports không bị rối.
- AI agent không thêm store selector.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

## PAC-TASK-567 — Document Multi-warehouse future scope

- **Jira Key:** `PAC-777`
- **Story:** `US-165`
- **Epic:** `PAC-EPIC-34`
- **Component:** Multi-store / Multi-warehouse
- **Priority:** Low
- **Exact branch:** `docs/PAC-777-task-567-document-multi-warehouse-future-scope`
- **Allowed change type:** Documentation only

Nhóm cần ghi nhận multi-warehouse là future scope.

### Nội dung công việc

- Mô tả nhiều warehouse.
- Ghi MVP dùng một logical default warehouse.
- Ghi tác động tới MedicineBatch/Stock Import.
- Ghi stock transfer dependency.
- Không implement trong MVP.

### Kết quả mong đợi

- Multi-warehouse không làm rối inventory MVP.
- Future scope rõ.
- Default warehouse được bảo vệ.
- Không thêm workflow kho phức tạp.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

## PAC-TASK-568 — Document default warehouse assumption for MVP

- **Jira Key:** `PAC-778`
- **Story:** `US-165`
- **Epic:** `PAC-EPIC-34`
- **Component:** Multi-store / Multi-warehouse
- **Priority:** Low
- **Exact branch:** `docs/PAC-778-task-568-document-default-warehouse-assumption-for-mvp`
- **Allowed change type:** Documentation only

Nhóm cần ghi rõ giả định default warehouse cho MVP.

### Nội dung công việc

- Ghi một warehouse mặc định.
- Ghi MedicineBatch thuộc default warehouse logic.
- Ghi không có stock transfer.
- Ghi testing/demo dựa trên một kho.
- Ghi future expansion.

### Kết quả mong đợi

- Inventory MVP rõ phạm vi.
- Không cần warehouse selector.
- FEFO đơn giản hơn.
- Future multi-warehouse có nền tảng.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

## PAC-TASK-569 — Document Stock Transfer future workflow

- **Jira Key:** `PAC-779`
- **Story:** `US-166`
- **Epic:** `PAC-EPIC-35`
- **Component:** Stock Transfer
- **Priority:** Low
- **Exact branch:** `docs/PAC-779-task-569-document-stock-transfer-future-workflow`
- **Allowed change type:** Documentation only

Nhóm cần mô tả stock transfer tương lai.

### Nội dung công việc

- Mô tả chuyển kho giữa warehouse/store.
- Ghi cần multi-warehouse trước.
- Ghi trạng thái transfer dự kiến.
- Ghi audit requirement.
- Không implement trong MVP.

### Kết quả mong đợi

- Stock Transfer rõ là future.
- MVP không bị yêu cầu chuyển kho.
- Inventory Adjustment không bị dùng sai để transfer.
- Roadmap rõ hơn.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

## PAC-TASK-570 — Document stock transfer audit future requirement

- **Jira Key:** `PAC-780`
- **Story:** `US-166`
- **Epic:** `PAC-EPIC-35`
- **Component:** Stock Transfer
- **Priority:** Low
- **Exact branch:** `docs/PAC-780-task-570-document-stock-transfer-audit-future-requirement`
- **Allowed change type:** Documentation only

Nhóm cần ghi yêu cầu audit cho stock transfer tương lai.

### Nội dung công việc

- Ghi actor tạo/confirm transfer.
- Ghi source/destination warehouse.
- Ghi batch và quantity.
- Ghi status transitions.
- Ghi audit log bắt buộc khi mở rộng.

### Kết quả mong đợi

- Future transfer có traceability.
- Không làm mất batch audit.
- Inventory governance được giữ.
- Documentation future đầy đủ.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

## PAC-TASK-571 — Document Forecasting and reorder suggestion future scope

- **Jira Key:** `PAC-781`
- **Story:** `US-167`
- **Epic:** `PAC-EPIC-36`
- **Component:** Forecasting
- **Priority:** Low
- **Exact branch:** `docs/PAC-781-task-571-document-forecasting-and-reorder-suggestion-future-`
- **Allowed change type:** Documentation only

Nhóm cần ghi nhận forecasting/reorder suggestion là future scope.

### Nội dung công việc

- Mô tả forecast dựa trên sales history.
- Mô tả reorder suggestion.
- Ghi không phải MVP.
- Ghi dữ liệu cần có.
- Ghi không ảnh hưởng low-stock MVP.

### Kết quả mong đợi

- Forecasting không thành MVP blocker.
- Low-stock hiện tại vẫn deterministic.
- Future analytics có định hướng.
- Scope rõ ràng.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

## PAC-TASK-572 — Document forecast data requirements and limitations

- **Jira Key:** `PAC-782`
- **Story:** `US-167`
- **Epic:** `PAC-EPIC-36`
- **Component:** Forecasting
- **Priority:** Low
- **Exact branch:** `docs/PAC-782-task-572-document-forecast-data-requirements-and-limitations`
- **Allowed change type:** Documentation only

Nhóm cần ghi dữ liệu và giới hạn cho forecasting future.

### Nội dung công việc

- Ghi cần đủ lịch sử bán.
- Ghi cần loại trừ dữ liệu demo ít.
- Ghi cần seasonality nếu nâng cao.
- Ghi hạn chế độ chính xác.
- Ghi không dùng cho quyết định bắt buộc MVP.

### Kết quả mong đợi

- Forecast future thực tế hơn.
- Không hứa quá mức.
- Demo MVP không bị đánh giá thiếu forecast.
- Documentation trung thực.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

## PAC-TASK-573 — Document Promotion and Coupon future scope

- **Jira Key:** `PAC-783`
- **Story:** `US-168`
- **Epic:** `PAC-EPIC-37`
- **Component:** Promotion / Coupon
- **Priority:** Low
- **Exact branch:** `docs/PAC-783-task-573-document-promotion-and-coupon-future-scope`
- **Allowed change type:** Documentation only

Nhóm cần ghi nhận promotion/coupon là future scope.

### Nội dung công việc

- Mô tả promotion/coupon engine.
- Ghi không áp dụng vào MVP checkout.
- Ghi impact tới pricing/payment/report.
- Ghi cần rule validation riêng.
- Không implement trong MVP.

### Kết quả mong đợi

- Discount không chen vào POS MVP.
- Checkout total hiện tại đơn giản.
- Future scope rõ.
- AI agent không thêm coupon logic.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

## PAC-TASK-574 — Document discount not included in MVP checkout

- **Jira Key:** `PAC-784`
- **Story:** `US-168`
- **Epic:** `PAC-EPIC-37`
- **Component:** Promotion / Coupon
- **Priority:** Low
- **Exact branch:** `docs/PAC-784-task-574-document-discount-not-included-in-mvp-checkout`
- **Allowed change type:** Documentation only

Nhóm cần ghi rõ MVP checkout không có discount.

### Nội dung công việc

- Ghi total = sum order items.
- Ghi không có coupon/promotion.
- Ghi report revenue không xử lý discount.
- Ghi future expansion nếu có.
- Ghi guardrail cho AI agent.

### Kết quả mong đợi

- Checkout MVP không bị scope creep.
- Payment/invoice dễ kiểm tra.
- Revenue report rõ.
- Future discount tách riêng.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

## PAC-TASK-575 — Document Shipping and Delivery future scope

- **Jira Key:** `PAC-785`
- **Story:** `US-169`
- **Epic:** `PAC-EPIC-38`
- **Component:** Shipping
- **Priority:** Low
- **Exact branch:** `docs/PAC-785-task-575-document-shipping-and-delivery-future-scope`
- **Allowed change type:** Documentation only

Nhóm cần ghi nhận shipping/delivery là future scope.

### Nội dung công việc

- Mô tả delivery workflow tương lai.
- Ghi liên quan online commerce.
- Ghi POS MVP không có shipping.
- Ghi delivery status future.
- Không implement trong MVP.

### Kết quả mong đợi

- Shipping không vào MVP.
- POS checkout không bị phức tạp.
- Future online commerce rõ hơn.
- Documentation nhất quán.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

## PAC-TASK-576 — Document delivery status future workflow

- **Jira Key:** `PAC-786`
- **Story:** `US-169`
- **Epic:** `PAC-EPIC-38`
- **Component:** Shipping
- **Priority:** Low
- **Exact branch:** `docs/PAC-786-task-576-document-delivery-status-future-workflow`
- **Allowed change type:** Documentation only

Nhóm cần mô tả status workflow cho delivery tương lai.

### Nội dung công việc

- Ghi các status dự kiến như pending, preparing, shipped, delivered, cancelled nếu cần.
- Ghi liên quan order online.
- Ghi audit/tracking requirement.
- Ghi không áp dụng POS MVP.
- Không implement hiện tại.

### Kết quả mong đợi

- Delivery future có hướng thiết kế.
- Không làm rối order status MVP DRAFT/PAID/CANCELLED.
- Scope tách biệt.
- Future docs đầy đủ.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

## PAC-TASK-577 — Document Review and CMS future scope

- **Jira Key:** `PAC-787`
- **Story:** `US-170`
- **Epic:** `PAC-EPIC-39`
- **Component:** Review / CMS
- **Priority:** Low
- **Exact branch:** `docs/PAC-787-task-577-document-review-and-cms-future-scope`
- **Allowed change type:** Documentation only

Nhóm cần ghi nhận review/CMS là future scope.

### Nội dung công việc

- Mô tả product review.
- Mô tả CMS content.
- Ghi liên quan storefront online.
- Ghi không thuộc MVP nhà thuốc nội bộ.
- Không implement hiện tại.

### Kết quả mong đợi

- Review/CMS không bị đưa vào MVP.
- Online commerce future rõ.
- Core pharmacy workflow tập trung.
- Scope được kiểm soát.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

## PAC-TASK-578 — Document product review moderation future consideration

- **Jira Key:** `PAC-788`
- **Story:** `US-170`
- **Epic:** `PAC-EPIC-39`
- **Component:** Review / CMS
- **Priority:** Low
- **Exact branch:** `docs/PAC-788-task-578-document-product-review-moderation-future-considera`
- **Allowed change type:** Documentation only

Nhóm cần ghi chú review moderation trong future scope.

### Nội dung công việc

- Ghi cần moderation/reporting nếu có review.
- Ghi role/permission future.
- Ghi spam/abuse consideration.
- Ghi không ảnh hưởng MVP.
- Không implement moderation hiện tại.

### Kết quả mong đợi

- Future review có kiểm soát.
- Không bỏ qua moderation risk.
- MVP không bị mở rộng.
- Documentation đầy đủ hơn.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

## PAC-TASK-579 — Document commercial expansion dependency map

- **Jira Key:** `PAC-789`
- **Story:** `US-170`
- **Epic:** `PAC-EPIC-39`
- **Component:** Documentation
- **Priority:** Low
- **Exact branch:** `docs/PAC-789-task-579-document-commercial-expansion-dependency-map`
- **Allowed change type:** Documentation only

Nhóm cần tạo dependency map cho các phần commercial expansion.

### Nội dung công việc

- Map Online Commerce phụ thuộc Product Catalog, Customer, Shipping, Payment Online.
- Map Multi-warehouse phụ thuộc stock transfer.
- Map Promotion ảnh hưởng checkout/report.
- Map Forecast phụ thuộc sales history.
- Ghi rõ không thuộc MVP.

### Kết quả mong đợi

- Future roadmap có thứ tự.
- Team không implement lộn scope.
- Dependency rõ khi mở rộng.
- Documentation chiến lược hơn.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

## PAC-TASK-580 — Document final out-of-scope guardrails for AI agents

- **Jira Key:** `PAC-790`
- **Story:** `US-170`
- **Epic:** `PAC-EPIC-39`
- **Component:** Documentation
- **Priority:** Low
- **Exact branch:** `docs/PAC-790-task-580-document-final-out-of-scope-guardrails-for-ai-agent`
- **Allowed change type:** Documentation only

Nhóm cần viết guardrails cuối cùng để AI agent không code sai scope.

### Nội dung công việc

- Liệt kê nội dung không thuộc MVP.
- Liệt kê baseline kỹ thuật không được vi phạm.
- Ghi cảnh báo không dùng prefix PAI.
- Ghi không thêm scope mới.
- Ghi cách xử lý nếu gặp yêu cầu mâu thuẫn.

### Kết quả mong đợi

- AI agent có guardrail rõ.
- Dự án không quay lại baseline cũ.
- MVP/Should-have/Future được phân biệt.
- Jira Task set an toàn cho coding.

### Mandatory Guardrail

- Không thay đổi production code, Prisma schema, migration, API, UI hoặc workflow runtime.
- Mọi proposed design phải được đánh dấu Future/Proposed/Not Implemented.
- Diff phải giới hạn ở tài liệu và traceability.

# 12. Documentation Validation Strategy

## Required checks per Task

- Markdown structure và heading consistency.
- Broken-link/reference check.
- Logical Key ↔ Jira Key ↔ exact branch consistency.
- Task ↔ Story ↔ Epic ↔ Component consistency.
- Terminology consistency với MVP baseline.
- No implementation language that implies approval.
- No production-code diff.
- No migration/schema/runtime configuration diff.
- No secret hoặc credential.
- No contradiction với Sprint 1–11 release baseline.

## Suggested local commands

```bash
git status --short
git diff --check
git diff --stat
git diff

grep -Rni "PAC-TASK-55[6-9]\|PAC-TASK-56[0-9]\|PAC-TASK-57[0-9]\|PAC-TASK-580" <changed-docs> || true
grep -Rni "MVP blocker\|implement now\|production ready" <changed-docs> || true
grep -Rni "custom JWT\|password_hash\|aggregate inventory\|Neo4j source of truth" <changed-docs> || true
```

Dùng command thực tế của repository nếu có markdown lint hoặc link checker. Không tự thêm dependency chỉ để chạy kiểm tra.

# 13. CI Policy

Sprint 12 dùng chính sách tiết kiệm GitHub Actions minutes đã phê duyệt:

```text
Docs Task PR → develop:
Local document quality gate = PASS
PR review = PASS
GitHub Actions = N/A — full CI reserved for main/release
Merge SHA on origin/develop = Verified

Release/Docs PR → main:
Applicable GitHub Actions = PASS
Project Owner approval = PASS
```

Không sửa workflow trigger trong Sprint 12 Task.

# 14. Git and Jira Workflow

```text
Exact docs Task branch
→ documentation change only
→ local document checks
→ diff review
→ PR vào develop
→ PR review
→ merge
→ verify merge SHA trên origin/develop
→ update Sprint 12 progress
```

Không:

- Push trực tiếp `develop` hoặc `main`.
- Tạo branch ngoài exact registry.
- Tạo Story PR hoặc Epic PR.
- Gộp nhiều Future Tasks không liên quan vào một branch.
- Dùng `feature/` cho PAC-TASK-556 → PAC-TASK-580.
- Thay `docs/` bằng branch prefix khác.
- Tự tạo Jira Bug/Task Key.
- Tự chuyển Jira status nếu Project Owner quản lý thủ công.

# 15. Definition of Ready

Một Task Sprint 12 chỉ Ready khi:

- Sprint 12 Audit PASS.
- Exact branch tồn tại trên remote.
- Task/Story/Epic mapping đã xác minh.
- Deliverable target được xác định.
- Reviewer/decision owner được xác định.
- Không có yêu cầu code ẩn trong Task.
- Baseline `main` và `develop` đã đồng bộ theo policy của nhóm.

# 16. Definition of Done

## Task Done

- Đúng exact docs branch.
- Tài liệu đáp ứng nội dung công việc và expected result.
- Proposed content được đánh dấu rõ.
- Local document quality gate PASS.
- PR review PASS.
- GitHub Actions N/A theo policy.
- PR merged vào `develop`.
- Merge SHA tồn tại trên `origin/develop`.
- Không có product-code diff.

## Story Done

- Mọi direct Task Done.
- Acceptance Criteria PASS.
- Cross-document consistency PASS.
- Open questions và decision owners được ghi.
- Không Story PR.

## Epic Done

- Story coverage đầy đủ.
- Dependency và guardrail đầy đủ.
- Không conflict với Epic khác.
- Không Epic PR.

## Sprint 12 Done

```text
Tasks verified = 25/25
Story Reviews = 10/10 PASS
Epic Reviews = 9/9 PASS
Canonical branches reconciled = 44/44
Product-code changes = 0
Database/runtime changes = 0
Contradictory Future/MVP statements = 0
Commercial dependency map = PASS
Final AI-agent guardrails = PASS
Blocking/High findings = 0
Sprint 12 Documentation Final Review = PASS
Commercial implementation authorization = No
```

# 17. Mandatory Review Gates

1. Sprint 11 release baseline integrity.
2. Repository and remote integrity.
3. Task/Story/Epic/Component reconciliation.
4. Exact branch reconciliation.
5. Documentation-only diff enforcement.
6. Customer privacy and ownership coverage.
7. POS vs Online Commerce boundary.
8. Medicine vs ProductVariant boundary.
9. Default store/default warehouse assumptions.
10. Stock Transfer dependency and audit coverage.
11. Forecast data requirements and limitations.
12. Promotion/discount isolation from MVP checkout.
13. Shipping isolation from POS order lifecycle.
14. Review/CMS moderation and abuse coverage.
15. Commercial dependency map completeness.
16. AI-agent out-of-scope guardrails.
17. No secrets or credentials.
18. No production code/schema/workflow change.
19. Findings and unresolved decisions.
20. Final documentation authorization.

Sprint 12 Final Review chỉ PASS khi đủ 20/20 gates.

# 18. Risks and Controls

| Risk | Control |
|---|---|
| AI agent hiểu Future docs là lệnh code | `NOT IMPLEMENTED`, `PROPOSED`, docs-only diff gate |
| ProductVariant thay `medicine_id` trong POS | Ghi rõ medicine_id vẫn là MVP sales key |
| Online checkout tái sử dụng sai POS checkout | Tách bounded context và contract future |
| Multi-store làm sai tồn kho hiện tại | Ghi default store/warehouse và migration dependency |
| Adjustment bị dùng để transfer | Cấm rõ và mô tả Stock Transfer riêng |
| Forecast được xem là quyết định bắt buộc | Ghi suggestion-only, limitations và no auto-import |
| Coupon làm sai report/payment | Ghi MVP no-discount invariant |
| Shipping làm rối order status | Tách online fulfillment khỏi DRAFT/PAID/CANCELLED |
| Customer data tạo privacy risk | Privacy, RBAC, retention và audit notes bắt buộc |
| Future scope làm regression MVP | Product-code changes = 0 |

# 19. Progress Tracking Template

Mỗi Task ghi:

```text
Task:
Jira Key:
Exact branch:
Deliverable:
Files changed:
Local document checks:
PR review:
GitHub Actions: N/A — full CI reserved for main/release
Commit:
PR:
Merge SHA:
Remote develop verification:
Open questions:
Decision owner:
Next Task:
```

# 20. Final Sprint 12 Summary

| Category | Range | Count | Meaning |
|---|---:|---:|---|
| Future Tasks | PAC-TASK-556 → PAC-TASK-580 | 25 | Documentation only |
| Future Stories | US-161 → US-170 | 10 | Backlog acceptance review |
| Future Epics | PAC-EPIC-31 → PAC-EPIC-39 | 9 | Commercial roadmap review |
| Canonical branches | Task + Story + Epic | 44 | Reconciliation only |

Final interpretation:

```text
Sprint 12 = Future / Commercial Expansion Documentation Backlog
Sprint 12 is not an MVP gate
Sprint 12 does not authorize commercial implementation
Sprint 12 must not modify released MVP/Advanced behavior
```

# 21. Next Documents

Sau khi chấp nhận `sprint-12.md`, tạo lần lượt:

1. `sprint-12-progress.md`
2. `sprint-12-audit.md`
3. `sprint-12-agent-prompt.md`
4. `sprint-12-final-review-prompt.md`

Không bắt đầu PAC-TASK-556 trước khi Sprint 12 Audit PASS và Project Leader cấp quyền documentation.
