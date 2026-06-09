# Document 11 — Module Design Document

# Tài liệu 11 — Thiết kế module hệ thống

---

## Metadata

| Mục               | Nội dung                                                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Document ID       | DOC-11                                                                                                                                                             |
| File name         | `11_module_design_document.md`                                                                                                                                     |
| Document Name     | Module Design Document                                                                                                                                             |
| Tên tiếng Việt    | Tài liệu thiết kế module                                                                                                                                           |
| Project           | PharmaAssist AI Intelligence                                                                                                                                       |
| Version           | 1.0 Draft                                                                                                                                                          |
| Status            | Draft                                                                                                                                                              |
| Created Date      | 08/06/2026                                                                                                                                                         |
| Last Updated      | 08/06/2026                                                                                                                                                         |
| Owner             | Tech Lead / Software Architect                                                                                                                                     |
| Reviewer          | Backend Developer, Frontend Developer, System Analyst, Tester, Project Leader                                                                                      |
| Baseline Source   | Document 06 — Software Requirements Specification, Document 07 — User Roles, Permissions & Authorization Specification, Document 10 — System Architecture Document |
| Related Documents | Document 10, Document 12, Document 13, Document 14, Document 15, Document 19, Document 20                                                                          |
| Language Rule     | Nội dung chính viết bằng tiếng Việt; tên file/tên tài liệu có thể giữ tiếng Anh                                                                                    |
| Terminology Rule  | Giữ nguyên tên công nghệ, module, entity, API, table, enum, permission key, class/service/component và thuật ngữ kỹ thuật cần thiết bằng tiếng Anh                 |

---

## 1. Mục đích tài liệu

Tài liệu **Module Design Document** mô tả thiết kế module backend/frontend cho hệ thống **PharmaAssist AI Intelligence**.

Tài liệu này tập trung vào:

1. Nguyên tắc thiết kế module.
2. Danh sách module backend.
3. Danh sách nhóm module/screen frontend.
4. Trách nhiệm từng module.
5. Dependencies giữa các module.
6. Service boundaries.
7. Data ownership theo module.
8. Transaction boundaries.
9. Error handling responsibilities.
10. Audit responsibilities.
11. Permission requirements theo module.
12. Phân loại module theo MVP, Should-have, Future và Out of Scope.
13. Traceability từ module sang API, database và testing.

Tài liệu này là cầu nối giữa:

1. **System Architecture Document** — mô tả kiến trúc tổng thể.
2. **API Specification** — mô tả API contract.
3. **Database Design & ERD** — mô tả database/entity relationship.
4. **Prisma Schema & Migration Design** — mô tả schema/migration chi tiết.
5. **UI/UX Screen Specification** — mô tả màn hình và UX.
6. **Testing, Demo & Setup Guide** — mô tả test/demo/setup.

Tài liệu này **không** viết API endpoint chi tiết, không viết Prisma schema đầy đủ, không viết UI layout chi tiết, không viết class diagram đầy đủ, không viết test case chi tiết và không viết lại business requirements.

---

## 2. Module Design Principles

### 2.1. Modular Monolith là hướng chính

Backend được thiết kế theo hướng **modular monolith**.

Điều này có nghĩa là:

1. Hệ thống triển khai như một backend application chính.
2. Các domain được tách thành module rõ ràng.
3. Mỗi module có controller/service/DTO/guard/helper riêng nếu cần.
4. Module có boundary rõ để tránh logic bị trộn lẫn.
5. Chưa tách thành microservices trong MVP.
6. Các module có thể được refactor/tách riêng trong tương lai nếu sản phẩm thương mại mở rộng.

Lý do chọn modular monolith:

1. Phù hợp team nhỏ.
2. Phù hợp timeline ngắn.
3. Dễ kiểm thử.
4. Dễ demo.
5. Dễ quản lý transaction.
6. Dễ đảm bảo business rules nhất quán.
7. Tránh complexity không cần thiết của distributed system.

### 2.2. Backend owns business rules

Backend là nơi chính thức enforce business rules.

Frontend chỉ hỗ trợ UX, không quyết định nghiệp vụ cuối cùng.

Backend phải kiểm tra:

1. Authentication.
2. User profile active.
3. Role/permission.
4. Ownership.
5. Entity status.
6. Data validation.
7. Stock availability.
8. FEFO allocation.
9. HIGH alert acknowledgement.
10. HIGH alert consultation note.
11. Payment rule.
12. Invoice rule.
13. AI Guardrail.
14. Graph freshness.
15. Demo reset environment guard.

### 2.3. Module owns its data behavior

Mỗi module phải có ownership rõ đối với dữ liệu và hành vi nghiệp vụ.

Ví dụ:

1. Inventory Module sở hữu logic MedicineBatch, sellable stock và FEFO.
2. Checkout Module sở hữu transaction checkout.
3. InteractionAlert Module sở hữu alert lifecycle và HIGH validation.
4. AI Module sở hữu AI orchestration nhưng không tự ý lưu official consultation note.
5. Graph Module sở hữu Graph Sync và Graph-RAG nhưng không thay thế PostgreSQL source of truth.

### 2.4. PostgreSQL là source of truth

Mọi module nghiệp vụ phải xem PostgreSQL là nguồn dữ liệu chính thức.

Neo4j chỉ là projection.

AI output chỉ là hỗ trợ, không phải dữ liệu chính thức cho business decision nếu chưa có user confirmation.

Frontend state chỉ là UI state, không phải source of truth.

### 2.5. Explicit service boundaries

Module không nên truy cập dữ liệu module khác một cách tùy tiện.

Ưu tiên:

1. Gọi service của module sở hữu dữ liệu.
2. Dùng query service read-only khi cần.
3. Không duplicate business logic.
4. Không tự implement lại FEFO ở module khác.
5. Không tự implement lại permission logic ở từng controller.
6. Không tự query graph thay cho GraphRagService.
7. Không tự gọi AI provider thay cho AIOrchestrator.

### 2.6. Transaction boundary phải rõ

Các transaction quan trọng phải được đặt ở application service phù hợp:

1. Stock Import confirm.
2. Inventory Adjustment confirm.
3. Checkout.
4. Demo reset local.
5. Role assignment nếu cần consistency.
6. Interaction alert update nếu cần atomic behavior.

Checkout là transaction boundary quan trọng nhất.

### 2.7. Cross-cutting modules tách riêng

Các module cross-cutting phải tách khỏi domain module chính:

1. Authorization.
2. Audit.
3. Idempotency.
4. AI Guardrail.
5. AI Audit.
6. Graph Sync.
7. Error handling.
8. Demo reset tooling.

### 2.8. MVP boundary rõ ràng

Module design phải phân biệt rõ:

1. MVP module.
2. Should-have module.
3. Future / Commercial Expansion module.
4. Out of Scope module.

Không được đưa Future module vào implementation như điều kiện hoàn thành MVP.

---

## 3. Backend Module List

Backend module chính thức gồm:

1. Auth/Profile Module.
2. User/Role/Permission Module.
3. Medicine Module.
4. ActiveIngredient Module.
5. Supplier Module.
6. Inventory Module.
7. Stock Import Module.
8. Inventory Adjustment Module.
9. Order/POS Module.
10. Checkout Module.
11. Payment Module.
12. Invoice Module.
13. Interaction Module.
14. InteractionAlert Module.
15. AI Module.
16. Graph Module.
17. Report Module.
18. System Settings Module.
19. Audit Module.
20. Idempotency Module.
21. Demo Seed/Reset Module.

---

# 4. Backend Module Design

---

## 4.1. Auth/Profile Module

### 4.1.1. Purpose

Auth/Profile Module xử lý integration với **Supabase Auth**, xác thực token và resolve user profile nội bộ.

### 4.1.2. Responsibilities

Module này chịu trách nhiệm:

1. Verify Supabase access token.
2. Extract Supabase user ID.
3. Load UserProfile nội bộ.
4. Check user active/inactive.
5. Check `must_change_password`.
6. Return current user context.
7. Support first-login password-change completion.
8. Provide user identity to guards/services.
9. Ensure PostgreSQL không lưu password/password_hash.

### 4.1.3. Non-responsibilities

Module này không chịu trách nhiệm:

1. Lưu password.
2. Tự xây custom JWT/password auth.
3. Quản lý toàn bộ roles/permissions.
4. Tạo business permission decisions một mình.
5. Quản lý Supabase setup chi tiết.

### 4.1.4. Key services

| Service            | Responsibility                                 |
| ------------------ | ---------------------------------------------- |
| AuthService        | Verify token, integrate Supabase Auth          |
| CurrentUserService | Build current user context                     |
| ProfileService     | Load/update basic profile and first-login flag |

### 4.1.5. Key guards

1. SupabaseAuthGuard.
2. UserProfileGuard.
3. MustChangePasswordGuard.

### 4.1.6. Owned data

1. UserProfile.
2. Supabase user ID reference.
3. `is_active`.
4. `must_change_password`.

Password data is owned by Supabase Auth, not PostgreSQL.

### 4.1.7. Dependencies

| Dependency                  | Purpose                                       |
| --------------------------- | --------------------------------------------- |
| Supabase Auth               | Token verification, password update           |
| User/Role/Permission Module | Load effective permission                     |
| Audit Module                | Audit sensitive profile/user events if needed |

### 4.1.8. Permissions

1. `auth.login`.
2. `auth.logout`.
3. `profile.read_self`.
4. `user.complete_first_login`.

---

## 4.2. User/Role/Permission Module

### 4.2.1. Purpose

User/Role/Permission Module quản lý RBAC nội bộ: users, roles, permissions, user-role mapping và role-permission mapping.

### 4.2.2. Responsibilities

1. Manage user profile records.
2. Create internal user profile after Supabase user creation.
3. Assign roles to users.
4. Remove roles from users.
5. Manage active/inactive user status.
6. Seed official roles: Admin, Staff, Warehouse.
7. Seed official permissions.
8. Seed role-permission mappings.
9. Resolve effective permissions.
10. Support multi-role RBAC.
11. Provide authorization data to PermissionGuard.
12. Audit role/user changes.

### 4.2.3. Non-responsibilities

1. Does not store password.
2. Does not authenticate user credentials.
3. Does not execute business actions of other modules.
4. Does not own order/inventory/AI business rules.

### 4.2.4. Key services

| Service               | Responsibility                                      |
| --------------------- | --------------------------------------------------- |
| UserService           | Manage user profile                                 |
| RoleService           | Manage role metadata                                |
| PermissionService     | Manage permission metadata                          |
| UserRoleService       | Assign/remove roles                                 |
| RolePermissionService | Seed/resolve permission matrix                      |
| AuthorizationService  | Resolve effective permissions and permission checks |

### 4.2.5. Owned data

1. UserProfile.
2. Role.
3. Permission.
4. UserRole.
5. RolePermission.

### 4.2.6. Dependencies

| Dependency             | Purpose                          |
| ---------------------- | -------------------------------- |
| Auth/Profile Module    | Supabase user identity           |
| Audit Module           | Audit user/role changes          |
| System Settings Module | Optional app-level configuration |

### 4.2.7. Permissions

1. `user.read_all`.
2. `user.create`.
3. `user.update`.
4. `user.deactivate`.
5. `user.assign_role`.
6. `user.remove_role`.
7. `role.read`.
8. `permission.read`.
9. `role_permission.manage` — Should-have/Future UI.

---

## 4.3. Medicine Module

### 4.3.1. Purpose

Medicine Module quản lý Medicine như entity nghiệp vụ lõi cho inventory, POS, checkout, reports và graph projection.

### 4.3.2. Responsibilities

1. Create Medicine.
2. Update Medicine.
3. Deactivate Medicine.
4. Search/filter Medicine.
5. Validate selling price.
6. Validate active/inactive state.
7. Provide Medicine data for POS.
8. Provide Medicine data for inventory.
9. Trigger Graph Sync event when Medicine changes.
10. Support mapping to ActiveIngredient through ActiveIngredient Module.

### 4.3.3. Non-responsibilities

1. Does not own inventory quantity.
2. Does not perform stock import.
3. Does not perform checkout.
4. Does not define interaction rule by itself.
5. Does not use ProductVariant as MVP sales key.

### 4.3.4. Key services

| Service                   | Responsibility                                     |
| ------------------------- | -------------------------------------------------- |
| MedicineService           | CRUD and status management                         |
| MedicineSearchService     | Search/filter for POS/admin/inventory              |
| MedicineValidationService | Validate active state, price and sales eligibility |

### 4.3.5. Owned data

1. Medicine core data.
2. Medicine active/inactive status.
3. Selling price.
4. Minimum stock threshold.
5. Unit/display metadata.

### 4.3.6. Dependencies

| Dependency              | Purpose                            |
| ----------------------- | ---------------------------------- |
| ActiveIngredient Module | Medicine–ActiveIngredient mapping  |
| Inventory Module        | Inventory summary by Medicine      |
| Graph Module            | Emit graph sync event              |
| Audit Module            | Audit deactivate/important changes |

### 4.3.7. Permissions

1. `medicine.read`.
2. `medicine.search`.
3. `medicine.create`.
4. `medicine.update`.
5. `medicine.deactivate`.
6. `medicine.read_sales`.
7. `medicine.read_inventory`.
8. `medicine.manage_price`.
9. `medicine.manage_status`.

---

## 4.4. ActiveIngredient Module

### 4.4.1. Purpose

ActiveIngredient Module quản lý hoạt chất và mapping Medicine–ActiveIngredient.

### 4.4.2. Responsibilities

1. Create ActiveIngredient.
2. Update ActiveIngredient.
3. Deactivate ActiveIngredient if needed.
4. Search ActiveIngredient.
5. Manage Medicine–ActiveIngredient mapping.
6. Provide active ingredient data to Interaction Module.
7. Trigger Graph Sync for ingredient/mapping changes.
8. Ensure scraped ingredient data is not blindly promoted into official ActiveIngredient.

### 4.4.3. Non-responsibilities

1. Does not manage Medicine core fields.
2. Does not manage DrugInteraction Rule directly.
3. Does not own graph schema.
4. Does not perform checkout.

### 4.4.4. Key services

| Service                          | Responsibility                           |
| -------------------------------- | ---------------------------------------- |
| ActiveIngredientService          | CRUD for ingredients                     |
| MedicineIngredientMappingService | Manage Medicine–ActiveIngredient mapping |
| IngredientSearchService          | Search/list ingredients                  |
| IngredientValidationService      | Validate curated ingredient data         |

### 4.4.5. Owned data

1. ActiveIngredient.
2. MedicineIngredient mapping.
3. Optional amount_text/dosage text in mapping.

### 4.4.6. Dependencies

| Dependency         | Purpose                           |
| ------------------ | --------------------------------- |
| Medicine Module    | Mapping Medicine                  |
| Interaction Module | Provide ingredient pairs          |
| Graph Module       | Sync nodes/CONTAINS relationships |
| Audit Module       | Audit important mapping changes   |

### 4.4.7. Permissions

1. `active_ingredient.read`.
2. `active_ingredient.search`.
3. `active_ingredient.create`.
4. `active_ingredient.update`.
5. `active_ingredient.deactivate`.
6. `medicine_ingredient_mapping.read`.
7. `medicine_ingredient_mapping.manage`.

---

## 4.5. Supplier Module

### 4.5.1. Purpose

Supplier Module quản lý nhà cung cấp phục vụ Stock Import.

### 4.5.2. Responsibilities

1. Create Supplier.
2. Update Supplier.
3. View Supplier.
4. Deactivate Supplier by Admin.
5. Validate Supplier active status when used in Stock Import.
6. Prevent hard delete of Supplier with history.
7. Audit important Supplier changes.

### 4.5.3. Non-responsibilities

1. Does not manage purchase order workflow đầy đủ.
2. Does not manage supplier contract.
3. Does not own inventory quantity.
4. Does not own Stock Import confirm logic.

### 4.5.4. Key services

| Service                   | Responsibility              |
| ------------------------- | --------------------------- |
| SupplierService           | CRUD/deactivate Supplier    |
| SupplierValidationService | Validate supplier usability |
| SupplierQueryService      | List/search supplier        |

### 4.5.5. Owned data

1. Supplier.
2. Supplier status.
3. Supplier contact/business metadata.

### 4.5.6. Dependencies

| Dependency           | Purpose                                |
| -------------------- | -------------------------------------- |
| Stock Import Module  | Supplier used by imports               |
| Audit Module         | Audit deactivate/update                |
| Authorization Module | Warehouse/Admin permission differences |

### 4.5.7. Permissions

1. `supplier.read`.
2. `supplier.create`.
3. `supplier.update`.
4. `supplier.deactivate`.
5. `supplier.read_for_import`.

Warehouse can create/update/read, but cannot deactivate.

---

## 4.6. Inventory Module

### 4.6.1. Purpose

Inventory Module quản lý MedicineBatch, Inventory Summary, sellable stock, near-expiry, low-stock và FEFO allocation logic.

### 4.6.2. Responsibilities

1. Own MedicineBatch behavior.
2. Calculate sellable quantity.
3. Exclude expired batches from sellable stock.
4. Calculate low-stock from sellable quantity.
5. Calculate near-expiry using System Settings threshold.
6. Provide Batch Detail.
7. Provide Inventory Summary.
8. Provide sellable stock to POS.
9. Provide stock validation to Checkout.
10. Provide FEFO allocation to Checkout.
11. Prevent direct quantity edit outside official workflows.
12. Validate quantity_remaining non-negative.

### 4.6.3. Non-responsibilities

1. Does not create Stock Import business flow.
2. Does not create Inventory Adjustment business flow.
3. Does not complete Checkout transaction by itself.
4. Does not own Order/Payment/Invoice.
5. Does not use aggregate inventory as source of truth.

### 4.6.4. Key services

| Service                    | Responsibility                          |
| -------------------------- | --------------------------------------- |
| InventoryService           | Core inventory logic                    |
| MedicineBatchService       | Batch query/update logic                |
| InventorySummaryService    | Summary and calculated inventory view   |
| SellableStockService       | Sellable quantity calculation           |
| FefoAllocationService      | Select batches by FEFO                  |
| InventoryValidationService | Validate stock and quantity constraints |

### 4.6.5. Owned data

1. MedicineBatch.
2. Batch quantity_remaining.
3. Batch expiry.
4. Batch status if any.
5. Computed inventory summary.

Inventory Module does not own StockImport and InventoryAdjustment records, but it updates MedicineBatch when called inside their transaction.

### 4.6.6. Dependencies

| Dependency                  | Purpose                                        |
| --------------------------- | ---------------------------------------------- |
| Medicine Module             | Medicine metadata                              |
| System Settings Module      | Near-expiry threshold                          |
| Stock Import Module         | Called during confirm import                   |
| Inventory Adjustment Module | Called during confirm adjustment               |
| Checkout Module             | Called during checkout                         |
| Audit Module                | Inventory changes audit through caller modules |

### 4.6.7. Permissions

1. `inventory.read_summary`.
2. `inventory.read_sales_availability`.
3. `inventory.read_batch`.
4. `inventory.read_low_stock`.
5. `inventory.read_near_expiry`.
6. `inventory.read_expired`.

Out of Scope:

1. `inventory.direct_update_quantity`.

---

## 4.7. Stock Import Module

### 4.7.1. Purpose

Stock Import Module quản lý lifecycle của phiếu nhập kho.

### 4.7.2. Responsibilities

1. Create Stock Import Draft.
2. Add/update import details.
3. Cancel Draft Stock Import.
4. Confirm Stock Import.
5. Validate Supplier.
6. Validate Medicine.
7. Validate batch number.
8. Validate expiry date.
9. Validate quantity > 0.
10. Apply batch merge rule during confirm.
11. Reject expiry mismatch.
12. Call Inventory Module to create/update MedicineBatch.
13. Audit confirm/cancel.
14. Prevent double confirm.

### 4.7.3. Non-responsibilities

1. Does not own MedicineBatch logic internally.
2. Does not allow direct stock edit.
3. Does not implement purchase order workflow đầy đủ.
4. Does not own Supplier CRUD.

### 4.7.4. Key services

| Service                      | Responsibility                     |
| ---------------------------- | ---------------------------------- |
| StockImportService           | Lifecycle coordination             |
| StockImportDetailService     | Manage details                     |
| StockImportConfirmService    | Confirm transaction                |
| StockImportValidationService | Validate details/status/batch rule |

### 4.7.5. Owned data

1. StockImport.
2. StockImportDetail.
3. Import status.
4. Confirm/cancel actor/time metadata.

### 4.7.6. Dependencies

| Dependency           | Purpose                     |
| -------------------- | --------------------------- |
| Supplier Module      | Validate supplier           |
| Medicine Module      | Validate medicine           |
| Inventory Module     | Create/update MedicineBatch |
| Audit Module         | Audit confirm/cancel        |
| Authorization Module | Warehouse/Admin permission  |

### 4.7.7. Transaction boundary

Stock Import Confirm is a transaction boundary.

Transaction includes:

1. Validate DRAFT status.
2. Validate details.
3. Create/update MedicineBatch.
4. Update StockImport status CONFIRMED.
5. Write audit.
6. Commit/rollback.

### 4.7.8. Permissions

1. `stock_import.read`.
2. `stock_import.create`.
3. `stock_import.update_draft`.
4. `stock_import.cancel_draft`.
5. `stock_import.confirm`.
6. `stock_import.read_detail`.

---

## 4.8. Inventory Adjustment Module

### 4.8.1. Purpose

Inventory Adjustment Module quản lý phiếu điều chỉnh tồn kho có reason và audit.

### 4.8.2. Responsibilities

1. Create Inventory Adjustment.
2. Add adjustment details.
3. Require reason.
4. Validate MedicineBatch.
5. Validate quantity does not make stock negative.
6. Confirm Inventory Adjustment.
7. Call Inventory Module to update MedicineBatch.
8. Prevent editing confirmed adjustment.
9. Support correction adjustment pattern.
10. Audit confirmation.

### 4.8.3. Non-responsibilities

1. Does not allow direct quantity editing.
2. Does not own Stock Import.
3. Does not own checkout stock deduction.
4. Does not implement multi-step approval in MVP.

### 4.8.4. Key services

| Service                              | Responsibility               |
| ------------------------------------ | ---------------------------- |
| InventoryAdjustmentService           | Lifecycle coordination       |
| InventoryAdjustmentDetailService     | Manage adjustment lines      |
| InventoryAdjustmentConfirmService    | Confirm transaction          |
| InventoryAdjustmentValidationService | Validate reason and quantity |

### 4.8.5. Owned data

1. InventoryAdjustment.
2. InventoryAdjustmentDetail.
3. Reason.
4. Status.
5. Actor/time metadata.

### 4.8.6. Dependencies

| Dependency           | Purpose                       |
| -------------------- | ----------------------------- |
| Inventory Module     | Validate/update MedicineBatch |
| Audit Module         | Audit confirm                 |
| Authorization Module | Admin/Warehouse access        |

### 4.8.7. Transaction boundary

Inventory Adjustment Confirm is a transaction boundary.

Transaction includes:

1. Validate adjustment.
2. Validate no negative quantity.
3. Update MedicineBatch.
4. Mark adjustment confirmed.
5. Write audit.
6. Commit/rollback.

### 4.8.8. Permissions

1. `inventory_adjustment.read`.
2. `inventory_adjustment.create`.
3. `inventory_adjustment.update_draft`.
4. `inventory_adjustment.confirm`.
5. `inventory_adjustment.read_detail`.

---

## 4.9. Order/POS Module

### 4.9.1. Purpose

Order/POS Module quản lý Draft Order, order items và POS sales flow trước checkout.

### 4.9.2. Responsibilities

1. Create Draft Order.
2. Support walk-in customer.
3. Add Medicine to Draft Order.
4. Update item quantity.
5. Remove item.
6. Cancel Draft Order.
7. View Order History.
8. View Order Detail.
9. Enforce Staff ownership.
10. Trigger interaction checking when items change.
11. Provide order state to Checkout Module.
12. Prevent editing PAID/CANCELLED orders.

### 4.9.3. Non-responsibilities

1. Does not complete payment.
2. Does not create invoice.
3. Does not deduct inventory.
4. Does not decide FEFO.
5. Does not manage InteractionAlert lifecycle beyond triggering check.
6. Does not manage full Customer Management in MVP.

### 4.9.4. Key services

| Service                | Responsibility                   |
| ---------------------- | -------------------------------- |
| OrderService           | Create/update/cancel order       |
| OrderItemService       | Manage order items               |
| OrderOwnershipService  | Validate owner/scope             |
| PosAvailabilityService | Provide sale-relevant stock info |
| OrderQueryService      | History/detail by scope          |

### 4.9.5. Owned data

1. Order.
2. OrderItem.
3. Order status DRAFT/PAID/CANCELLED.
4. created_by.
5. processed_by if applicable.

### 4.9.6. Dependencies

| Dependency              | Purpose                  |
| ----------------------- | ------------------------ |
| Medicine Module         | Validate active Medicine |
| Inventory Module        | Show sellable stock      |
| Interaction Module      | Check interactions       |
| InteractionAlert Module | Persist alerts           |
| Authorization Module    | Staff ownership          |
| Checkout Module         | Complete order later     |

### 4.9.7. Permissions

1. `order.create`.
2. `order.read_own`.
3. `order.read_all`.
4. `order.update_own_draft`.
5. `order.update_any_draft`.
6. `order.cancel_own_draft`.
7. `order.cancel_any_draft`.
8. `order.add_item_own`.
9. `order.update_item_own`.
10. `order.remove_item_own`.
11. `customer.walk_in_sale`.

---

## 4.10. Checkout Module

### 4.10.1. Purpose

Checkout Module là application module quan trọng nhất để hoàn tất order.

### 4.10.2. Responsibilities

1. Execute checkout command.
2. Enforce transaction boundary.
3. Enforce idempotency.
4. Validate order status.
5. Validate order items.
6. Recalculate total server-side.
7. Validate Staff ownership.
8. Validate stock.
9. Validate active HIGH alerts.
10. Apply FEFO through Inventory Module.
11. Create batch allocations.
12. Deduct stock.
13. Create payment attempt.
14. Mark order PAID if payment success.
15. Create invoice.
16. Write audit.
17. Return checkout result.
18. Preserve Draft Order on validation failure.

### 4.10.3. Non-responsibilities

1. Does not manage Draft Order item editing.
2. Does not manage Medicine CRUD.
3. Does not manage Supplier/Stock Import.
4. Does not perform AI explanation.
5. Does not allow payment/invoice completion outside checkout.

### 4.10.4. Key services

| Service                    | Responsibility                                   |
| -------------------------- | ------------------------------------------------ |
| CheckoutService            | Orchestrate checkout transaction                 |
| CheckoutValidationService  | Validate order/status/items/alerts/stock/payment |
| CheckoutTransactionService | Run transaction if separated                     |
| CheckoutResultService      | Build success/failure result                     |

### 4.10.5. Owned data

Checkout Module coordinates but does not solely own all data.

It writes/updates:

1. Order status.
2. OrderItemBatchAllocation.
3. MedicineBatch quantity through Inventory Module.
4. Payment through Payment Module.
5. Invoice through Invoice Module.
6. Audit through Audit Module.
7. Idempotency record through Idempotency Module.

### 4.10.6. Dependencies

| Dependency              | Purpose                      |
| ----------------------- | ---------------------------- |
| Order/POS Module        | Load/validate order          |
| Inventory Module        | Validate stock, FEFO, deduct |
| InteractionAlert Module | Validate HIGH alerts         |
| Payment Module          | Create payment attempt       |
| Invoice Module          | Create invoice               |
| Idempotency Module      | Prevent double checkout      |
| Audit Module            | Audit checkout               |
| Authorization Module    | Permission/ownership         |

### 4.10.7. Transaction boundary

Checkout is a required transaction boundary.

Transaction includes:

1. Idempotency processing.
2. Order validation.
3. HIGH alert validation.
4. FEFO allocation.
5. Stock deduction.
6. Payment attempt.
7. Order status update.
8. Invoice creation.
9. Audit.
10. Commit/rollback.

### 4.10.8. Permissions

1. `checkout.execute_own`.
2. `checkout.execute_all`.
3. `checkout.retry_own`.
4. `checkout.retry_all`.

Out of Scope:

1. `checkout.bypass_high_alert`.
2. `checkout.bypass_stock`.
3. `checkout.bypass_fefo`.

---

## 4.11. Payment Module

### 4.11.1. Purpose

Payment Module quản lý payment simulation trong checkout.

### 4.11.2. Responsibilities

1. Validate payment method.
2. Validate cash amount_tendered.
3. Calculate change_amount.
4. Validate bank transfer transaction_reference.
5. Create payment attempt.
6. Enforce one successful payment per order.
7. Allow failed attempts to be retained if applicable.
8. Provide payment view/query by permission scope.

### 4.11.3. Non-responsibilities

1. Does not integrate real bank.
2. Does not process refund.
3. Does not mark order PAID alone outside Checkout.
4. Does not create invoice.

### 4.11.4. Key services

| Service                       | Responsibility                     |
| ----------------------------- | ---------------------------------- |
| PaymentService                | Payment attempt creation/query     |
| CashPaymentService            | Cash validation/change calculation |
| BankTransferSimulationService | transaction_reference validation   |
| PaymentValidationService      | One-successful-payment rule        |

### 4.11.5. Owned data

1. Payment.
2. Payment status.
3. Payment method.
4. amount_tendered.
5. change_amount.
6. transaction_reference.
7. processed_by.

### 4.11.6. Dependencies

| Dependency           | Purpose                          |
| -------------------- | -------------------------------- |
| Checkout Module      | Payment created through checkout |
| Order/POS Module     | Payment belongs to order         |
| Audit Module         | Trace payment attempts           |
| Authorization Module | Read own/all payment             |

### 4.11.7. Permissions

1. `payment.read_own`.
2. `payment.read_all`.
3. `payment.create_attempt_via_checkout`.

Out of Scope/Future:

1. `payment.create_direct`.
2. `payment.refund`.

---

## 4.12. Invoice Module

### 4.12.1. Purpose

Invoice Module tạo và hiển thị invoice sau successful payment.

### 4.12.2. Responsibilities

1. Create invoice after payment success.
2. Ensure one invoice per PAID order.
3. Store invoice snapshot.
4. Provide invoice query by ownership/permission.
5. Prevent manual invoice creation outside checkout.
6. Support invoice display.

### 4.12.3. Non-responsibilities

1. Does not process payment.
2. Does not process refund.
3. Does not process credit note.
4. Does not reverse invoice in MVP.
5. Does not replace checkout.

### 4.12.4. Key services

| Service                  | Responsibility                  |
| ------------------------ | ------------------------------- |
| InvoiceService           | Create/query invoice            |
| InvoiceSnapshotService   | Build snapshot data             |
| InvoiceValidationService | Validate invoice creation rules |

### 4.12.5. Owned data

1. Invoice.
2. Invoice items/snapshot.
3. Invoice number if used.
4. Invoice generated_at.
5. Related order/payment reference.

### 4.12.6. Dependencies

| Dependency           | Purpose                |
| -------------------- | ---------------------- |
| Checkout Module      | Calls invoice creation |
| Order/POS Module     | Order data             |
| Payment Module       | Payment success        |
| Authorization Module | Read own/all invoice   |
| Audit Module         | Invoice creation trace |

### 4.12.7. Permissions

1. `invoice.read_own`.
2. `invoice.read_all`.
3. `invoice.create_via_checkout`.

Out of Scope/Future:

1. `invoice.create_direct`.
2. `invoice.void`.

---

## 4.13. Interaction Module

### 4.13.1. Purpose

Interaction Module quản lý DrugInteraction Rules và interaction checking ở cấp ActiveIngredient.

### 4.13.2. Responsibilities

1. Manage DrugInteraction Rules.
2. Validate ActiveIngredient pair.
3. Prevent duplicate A–B/B–A.
4. Support severity LOW/MEDIUM/HIGH.
5. Deactivate rules.
6. Provide order-based interaction checking.
7. Provide standalone check for Admin/demo utility.
8. Trigger Graph Sync when rules change.
9. Return interaction results to InteractionAlert Module.

### 4.13.3. Non-responsibilities

1. Does not persist displayed alerts directly if delegated to InteractionAlert Module.
2. Does not use Medicine–Medicine official rule.
3. Does not support CRITICAL in MVP.
4. Does not manage AI explanation.

### 4.13.4. Key services

| Service                           | Responsibility                  |
| --------------------------------- | ------------------------------- |
| DrugInteractionRuleService        | CRUD/deactivate rules           |
| InteractionCheckService           | Check ingredient pairs          |
| InteractionPairService            | Canonical pair handling A–B/B–A |
| InteractionRuleValidationService  | Validate severity/duplicates    |
| StandaloneInteractionCheckService | Admin/demo utility              |

### 4.13.5. Owned data

1. DrugInteractionRule.
2. Severity.
3. Description.
4. Recommendation.
5. Rule active/inactive status.

### 4.13.6. Dependencies

| Dependency              | Purpose                                   |
| ----------------------- | ----------------------------------------- |
| ActiveIngredient Module | Ingredient data                           |
| Medicine Module         | Medicine-to-ingredient mapping indirectly |
| InteractionAlert Module | Persist alerts                            |
| Graph Module            | Sync INTERACTS_WITH projection            |
| Audit Module            | Rule change audit                         |

### 4.13.7. Permissions

1. `drug_interaction.read`.
2. `drug_interaction.create`.
3. `drug_interaction.update`.
4. `drug_interaction.deactivate`.
5. `interaction.check_order_own`.
6. `interaction.check_order_all`.
7. `interaction.check_standalone`.

---

## 4.14. InteractionAlert Module

### 4.14.1. Purpose

InteractionAlert Module quản lý lifecycle của cảnh báo tương tác đã hiển thị trong Order.

### 4.14.2. Responsibilities

1. Persist every displayed InteractionAlert.
2. Create alert for order interaction.
3. Update display metadata.
4. Store severity/description/recommendation snapshots.
5. Maintain active/inactive state.
6. Inactivate alerts no longer applicable.
7. Store acknowledgement for HIGH.
8. Store consultation note for HIGH.
9. Validate HIGH alerts before checkout.
10. Provide InteractionAlert History for Admin.
11. Enforce Warehouse no-access.
12. Audit HIGH acknowledgement and note.

### 4.14.3. Non-responsibilities

1. Does not define DrugInteraction Rule.
2. Does not generate AI explanation.
3. Does not perform checkout.
4. Does not decide stock availability.

### 4.14.4. Key services

| Service                    | Responsibility                     |
| -------------------------- | ---------------------------------- |
| InteractionAlertService    | Create/update/inactivate alerts    |
| HighAlertService           | HIGH acknowledgement/note behavior |
| HighAlertValidationService | Validate checkout readiness        |
| AlertHistoryService        | Admin history query                |
| AlertSnapshotService       | Build alert snapshot               |

### 4.14.5. Owned data

1. InteractionAlert.
2. severity snapshot.
3. description/recommendation snapshot.
4. display metadata.
5. active/inactive status.
6. acknowledgement fields.
7. consultation note fields.

### 4.14.6. Dependencies

| Dependency           | Purpose                         |
| -------------------- | ------------------------------- |
| Interaction Module   | Source interaction rule results |
| Order/POS Module     | Order ownership/status          |
| AI Module            | Optional draft generation       |
| Audit Module         | Audit acknowledgement/note      |
| Authorization Module | Own/all alert access            |

### 4.14.7. Permissions

1. `interaction_alert.read_own_order`.
2. `interaction_alert.read_all`.
3. `interaction_alert.acknowledge_own_order`.
4. `interaction_alert.acknowledge_all`.
5. `interaction_alert.note_own_order`.
6. `interaction_alert.note_all`.

---

## 4.15. AI Module

### 4.15.1. Purpose

AI Module hỗ trợ Staff/Admin giải thích InteractionAlert, tạo consultation note draft và thực hiện AI request an toàn.

### 4.15.2. Responsibilities

1. Receive AI request.
2. Check permission/ownership.
3. Build minimized context.
4. Select prompt template and version.
5. Apply input guardrail.
6. Call Google AI Provider through adapter.
7. Fallback to MockAI when needed.
8. Apply output guardrail.
9. Validate structured output if needed.
10. Record AI Audit.
11. Return safe response.
12. Ensure AI draft is not official note until user confirms.

### 4.15.3. Non-responsibilities

1. Does not diagnose.
2. Does not prescribe.
3. Does not provide dosage advice.
4. Does not auto-save official consultation note.
5. Does not store raw PII in AI Audit.
6. Does not replace InteractionAlert Module.

### 4.15.4. Key services

| Service                     | Responsibility                         |
| --------------------------- | -------------------------------------- |
| AIOrchestrator              | Main AI flow coordination              |
| PromptBuilderService        | Prompt template/version handling       |
| AIContextBuilderService     | Build minimized context                |
| GuardrailService            | Input/output safety                    |
| GoogleAIAdapter             | Preferred provider                     |
| MockAIAdapter               | Fallback provider                      |
| AIAuditService              | AI audit logging                       |
| AIResponseValidationService | Structured/schema validation if needed |

### 4.15.5. Owned data

1. PromptTemplate.
2. AIAuditLog.
3. AI provider config if DB-based.
4. AI request metadata.

AI Module does not own official consultation note; that belongs to InteractionAlert Module after user confirmation.

### 4.15.6. Dependencies

| Dependency              | Purpose                     |
| ----------------------- | --------------------------- |
| InteractionAlert Module | Alert context               |
| Order/POS Module        | Ownership and order context |
| Authorization Module    | AI permissions              |
| Audit Module / AIAudit  | AI audit                    |
| Graph Module            | Optional graph context      |
| Google AI Provider      | Preferred AI                |
| MockAI                  | Fallback                    |

### 4.15.7. Permissions

1. `ai_copilot.use_interaction_explanation`.
2. `ai_copilot.generate_note_draft`.
3. `ai_copilot.use_symptom_context_questions`.
4. `ai_audit.read_all`.
5. `ai_prompt.read`.
6. `ai_prompt.edit` — Should-have.
7. `ai_provider_config.manage` — Should-have.

Out of Scope:

1. `ai_diagnosis.request`.
2. `ai_prescribing.request`.
3. `ai_dosage.request`.

---

## 4.16. Graph Module

### 4.16.1. Purpose

Graph Module quản lý Neo4j projection, Graph Sync và Graph-RAG.

### 4.16.2. Responsibilities

1. Create Graph Sync outbox events.
2. Process graph sync jobs.
3. Upsert Neo4j projection.
4. Handle Medicine nodes.
5. Handle ActiveIngredient nodes.
6. Handle CONTAINS relationships.
7. Handle INTERACTS_WITH relationships.
8. Handle deactivation as `isActive=false`.
9. Track sync attempts.
10. Track graph freshness.
11. Provide Graph-RAG read-only query flow.
12. Provide PostgreSQL fallback when graph stale/unavailable.
13. Return safe error for pure graph query without fallback.
14. Prevent raw Cypher access.

### 4.16.3. Non-responsibilities

1. Does not own authoritative Medicine data.
2. Does not own authoritative ActiveIngredient data.
3. Does not own authoritative DrugInteraction Rule data.
4. Does not decide checkout.
5. Does not replace PostgreSQL.
6. Does not provide Warehouse graph access in MVP.

### 4.16.4. Key services

| Service                | Responsibility                                 |
| ---------------------- | ---------------------------------------------- |
| GraphSyncOutboxService | Create outbox events                           |
| GraphSyncWorker        | Process sync jobs                              |
| GraphProjectionService | Build Neo4j projection                         |
| GraphFreshnessService  | Determine graph freshness                      |
| GraphRagService        | Read graph and return explanation/query result |
| GraphFallbackService   | Use PostgreSQL fallback                        |
| Neo4jClientService     | Neo4j access wrapper                           |

### 4.16.5. Owned data

PostgreSQL-side:

1. GraphSyncOutbox.
2. GraphSyncAttempt.
3. Graph freshness metadata.

Neo4j-side projection:

1. Medicine nodes.
2. ActiveIngredient nodes.
3. CONTAINS relationships.
4. INTERACTS_WITH relationships.

### 4.16.6. Dependencies

| Dependency              | Purpose                        |
| ----------------------- | ------------------------------ |
| Medicine Module         | Source Medicine data           |
| ActiveIngredient Module | Source Ingredient/mapping data |
| Interaction Module      | Source interaction rule data   |
| AI Module               | Optional response generation   |
| Authorization Module    | Graph permissions              |
| Audit Module            | Sync/fallback logs             |
| PostgreSQL              | Source of truth                |
| Neo4j                   | Projection                     |

### 4.16.7. Permissions

1. `graph_explorer.read`.
2. `graph_rag.use_readonly`.
3. `graph_sync.read_status` — Should-have.
4. `graph_sync.retry` — Should-have.
5. `graph_sync.manage` — Should-have.

Out of Scope:

1. `graph.raw_cypher`.
2. `graph.manage_projection_directly`.

---

## 4.17. Report Module

### 4.17.1. Purpose

Report Module cung cấp reports deterministic cho MVP.

### 4.17.2. Responsibilities

1. Revenue Report.
2. Top Medicines Report.
3. Inventory Report.
4. Exclude DRAFT/CANCELLED/FAILED payment data from revenue.
5. Calculate inventory report from MedicineBatch.
6. Support date filters if needed.
7. Provide data for Admin/Warehouse screens.

### 4.17.3. Non-responsibilities

1. Does not depend on AI for MVP reports.
2. Does not implement advanced analytics in MVP.
3. Does not implement forecasting in MVP.
4. Does not implement AI narrative in MVP unless Should-have.

### 4.17.4. Key services

| Service                   | Responsibility                               |
| ------------------------- | -------------------------------------------- |
| RevenueReportService      | Revenue calculation                          |
| TopMedicinesReportService | Top medicines by quantity/revenue            |
| InventoryReportService    | Batch/sellable/expired/low-stock/near-expiry |
| ReportQueryService        | Common filters and query logic               |

### 4.17.5. Owned data

Report Module does not own transactional data. It reads from:

1. Orders.
2. Payments.
3. Invoices.
4. OrderItemBatchAllocations.
5. Medicine.
6. MedicineBatch.
7. SystemSettings.

### 4.17.6. Dependencies

| Dependency             | Purpose                |
| ---------------------- | ---------------------- |
| Order/POS Module       | Order data             |
| Payment Module         | Payment status         |
| Invoice Module         | Invoice data           |
| Inventory Module       | Inventory calculations |
| Medicine Module        | Medicine metadata      |
| System Settings Module | Near-expiry threshold  |
| Authorization Module   | Report permissions     |

### 4.17.7. Permissions

1. `report.revenue.read`.
2. `report.top_medicines.read`.
3. `report.inventory.read`.
4. `report.ai_narrative.generate` — Should-have.
5. `report.advanced.read` — Should-have/Future.
6. `report.forecast.read` — Future.

---

## 4.18. System Settings Module

### 4.18.1. Purpose

System Settings Module quản lý cấu hình hệ thống MVP, đặc biệt near-expiry threshold.

### 4.18.2. Responsibilities

1. Store near-expiry threshold.
2. Provide default value 90 days.
3. Allow Admin update threshold.
4. Provide settings to Inventory/Reports.
5. Audit important setting changes.
6. Distinguish system setting from report filter override.

### 4.18.3. Non-responsibilities

1. Does not manage AI provider UI in MVP unless Should-have implemented.
2. Does not manage prompt editing UI in MVP.
3. Does not provide full system configuration portal in MVP.

### 4.18.4. Key services

| Service                   | Responsibility            |
| ------------------------- | ------------------------- |
| SettingsService           | Read/update settings      |
| NearExpirySettingService  | Manage threshold behavior |
| SettingsValidationService | Validate setting values   |

### 4.18.5. Owned data

1. SystemSetting.
2. near-expiry threshold.
3. Setting update metadata.

### 4.18.6. Dependencies

| Dependency           | Purpose                 |
| -------------------- | ----------------------- |
| Inventory Module     | Near-expiry calculation |
| Report Module        | Inventory report        |
| Audit Module         | Setting update audit    |
| Authorization Module | Admin-only access       |

### 4.18.7. Permissions

1. `settings.read`.
2. `settings.update_near_expiry_threshold`.
3. `settings.update_ai_provider` — Should-have.
4. `settings.update_prompt` — Should-have.

---

## 4.19. Audit Module

### 4.19.1. Purpose

Audit Module ghi nhận hành động quan trọng để phục vụ traceability, demo evidence và debugging.

### 4.19.2. Responsibilities

1. Provide generic audit logging service.
2. Record actor.
3. Record action.
4. Record resource type/id.
5. Record timestamp.
6. Record summary metadata.
7. Avoid storing raw PII.
8. Support audit for critical business actions.
9. Support UI/query if Generic System Audit Log UI is implemented.
10. Work alongside AI Audit, not replace AI Audit.

### 4.19.3. Non-responsibilities

1. Does not enforce business rules.
2. Does not replace AI Audit.
3. Does not store raw sensitive data.
4. Does not guarantee full production compliance in MVP.

### 4.19.4. Key services

| Service                | Responsibility                |
| ---------------------- | ----------------------------- |
| AuditLogService        | Write generic audit logs      |
| AuditQueryService      | Query audit logs if UI exists |
| AuditSerializerService | Prepare safe summaries        |
| AuditContextService    | Attach actor/request context  |

### 4.19.5. Owned data

1. AuditLog.
2. Resource/action metadata.
3. Actor/time metadata.

AI Audit is owned by AI Module/AIAuditService but may share design conventions.

### 4.19.6. Dependencies

Audit Module is used by:

1. User/Role/Permission Module.
2. Medicine Module.
3. Supplier Module.
4. Stock Import Module.
5. Inventory Adjustment Module.
6. Checkout Module.
7. Interaction Module.
8. InteractionAlert Module.
9. System Settings Module.
10. Graph Module.
11. Demo Reset Module.

### 4.19.7. Permissions

1. `audit.read_system` — Should-have.
2. `audit.read_ai` — Admin MVP for AI Audit if AI Audit UI exists.
3. `audit.read_inventory` — Should-have.
4. `audit.read_sales` — Should-have.
5. `audit.export` — Future.

---

## 4.20. Idempotency Module

### 4.20.1. Purpose

Idempotency Module ngăn việc xử lý lặp các command quan trọng, đặc biệt checkout.

### 4.20.2. Responsibilities

1. Accept idempotency key.
2. Store request fingerprint/hash.
3. Store processing status.
4. Store successful result summary.
5. Detect duplicate retry with same payload.
6. Reject same key with different payload.
7. Prevent double stock deduction.
8. Prevent duplicate successful payment.
9. Prevent duplicate invoice.
10. Provide safe retry behavior.

### 4.20.3. Non-responsibilities

1. Does not implement checkout itself.
2. Does not replace transaction.
3. Does not guarantee idempotency for every read operation.
4. Does not allow bypassing business validation.

### 4.20.4. Key services

| Service                   | Responsibility                       |
| ------------------------- | ------------------------------------ |
| IdempotencyService        | Main idempotency record logic        |
| RequestFingerprintService | Build payload fingerprint            |
| IdempotencyResultService  | Store/retrieve previous result       |
| IdempotencyCleanupService | Optional cleanup, Future/Should-have |

### 4.20.5. Owned data

1. IdempotencyRecord.
2. idempotency_key.
3. request_hash.
4. status.
5. response summary.
6. resource reference.
7. actor reference.

### 4.20.6. Dependencies

| Dependency           | Purpose                           |
| -------------------- | --------------------------------- |
| Checkout Module      | Main user                         |
| Audit Module         | Log suspicious mismatch if needed |
| Authorization Module | Actor context                     |

### 4.20.7. Permissions

No standalone end-user permission. Used internally by command services.

---

## 4.21. Demo Seed/Reset Module

### 4.21.1. Purpose

Demo Seed/Reset Module tạo lại dữ liệu demo local một cách nhất quán và an toàn.

### 4.21.2. Responsibilities

1. Verify environment is local.
2. Refuse demo/staging/production/unknown.
3. Reset local PostgreSQL demo data.
4. Verify/provision Supabase demo users.
5. Seed roles/permissions/user-role mappings.
6. Seed Medicine.
7. Seed ActiveIngredient.
8. Seed Medicine–ActiveIngredient mapping.
9. Seed Supplier.
10. Seed Stock Imports.
11. Generate MedicineBatch from confirmed imports.
12. Seed Inventory Adjustments.
13. Seed Orders/Payments/Invoices/Allocations.
14. Seed DrugInteraction Rules.
15. Seed InteractionAlerts including HIGH acknowledged/note case.
16. Rebuild/sync Neo4j projection.
17. Check graph freshness.
18. Run smoke checks.
19. Report result.

### 4.21.3. Non-responsibilities

1. Does not run in demo/staging/production.
2. Does not use full real catalog data as operational seed.
3. Does not create unsafe medical data.
4. Does not replace migration system.
5. Does not become production data management tool.

### 4.21.4. Key services/scripts

| Service/Script              | Responsibility                  |
| --------------------------- | ------------------------------- |
| DemoResetService            | Orchestrate reset               |
| DemoEnvironmentGuard        | Refuse non-local                |
| DemoUserProvisioningService | Verify/provision Supabase users |
| DemoSeedService             | Seed curated operational data   |
| DemoGraphRebuildService     | Rebuild Neo4j projection        |
| DemoSmokeCheckService       | Verify demo readiness           |

### 4.21.5. Owned data

Demo module does not own domain data permanently. It creates demo records across modules using official workflows or controlled seed routines.

### 4.21.6. Dependencies

| Dependency                       | Purpose                |
| -------------------------------- | ---------------------- |
| PostgreSQL                       | Seed/reset source data |
| Supabase Auth                    | Demo users             |
| Graph Module                     | Rebuild projection     |
| Stock Import Module              | Seed import state      |
| Inventory Module                 | Batch state            |
| Checkout/Payment/Invoice Modules | Demo sales data        |
| InteractionAlert Module          | Demo alert history     |
| Report Module                    | Smoke checks           |
| Audit Module                     | Reset logging          |

### 4.21.7. Permissions

No normal app user permission.

Technical access only:

1. Release/Demo Owner.
2. Developer.
3. Local environment only.

---

# 5. Frontend Module / Screen Grouping

Frontend modules are grouped by user-facing screens and route boundaries.

---

## 5.1. Auth Frontend Group

### Screens

1. Login screen.
2. First-login password change screen.
3. Access denied page.
4. Session expired page if needed.

### Responsibilities

1. Login via Supabase Auth.
2. Store/refresh session as appropriate.
3. Fetch current user context.
4. Redirect based on role/permissions.
5. Handle `must_change_password`.
6. Handle inactive/profile errors.

### Backend dependencies

1. Auth/Profile Module.
2. User/Role/Permission Module.

---

## 5.2. Dashboard Frontend Group

### Screens

1. Admin dashboard.
2. Staff POS-focused dashboard.
3. Warehouse inventory dashboard.

### Responsibilities

1. Show role-appropriate entry points.
2. Hide unauthorized modules.
3. Show operational indicators by role.
4. Avoid showing Staff general low-stock/near-expiry widgets.
5. Show Admin/Warehouse inventory widgets where appropriate.

### Backend dependencies

1. Report Module.
2. Inventory Module.
3. Auth/Profile Module.

---

## 5.3. Medicine Frontend Group

### Screens

1. Medicine list.
2. Medicine create/edit form.
3. Medicine detail.
4. ActiveIngredient list.
5. ActiveIngredient create/edit.
6. Medicine–ActiveIngredient mapping component.

### Responsibilities

1. Manage Medicine for Admin.
2. Manage ActiveIngredient for Admin.
3. Support mapping.
4. Show read-only medicine data for Staff/Warehouse context.
5. Validate selling_price > 0 at UI level but backend remains authority.

### Backend dependencies

1. Medicine Module.
2. ActiveIngredient Module.
3. Graph Module indirectly.

---

## 5.4. Inventory Frontend Group

### Screens

1. Inventory Summary.
2. Batch Detail.
3. Low-stock view.
4. Near-expiry view.
5. Expired batch view if implemented.
6. Stock Import list/detail/form.
7. Inventory Adjustment list/detail/form.

### Responsibilities

1. Show MedicineBatch-based inventory.
2. Show sellable quantity.
3. Show near-expiry based on threshold.
4. Support Stock Import Draft/Confirm.
5. Support Inventory Adjustment.
6. Hide inventory operational screens from Staff.

### Backend dependencies

1. Inventory Module.
2. Stock Import Module.
3. Inventory Adjustment Module.
4. Supplier Module.
5. System Settings Module.

---

## 5.5. POS Frontend Group

### Screens

1. POS screen.
2. Draft Order panel.
3. Order item editor.
4. InteractionAlert panel.
5. AI Copilot panel inside POS.
6. Order History.
7. Order Detail.

### Responsibilities

1. Create Draft Order.
2. Search Medicine.
3. Show sellable stock.
4. Add/update/remove order items.
5. Show InteractionAlerts.
6. Support HIGH alert acknowledgement/note.
7. Call AI for explanation/draft.
8. Preserve Draft Order when checkout validation fails.
9. Enforce UI-level ownership visibility.

### Backend dependencies

1. Order/POS Module.
2. Inventory Module.
3. Interaction Module.
4. InteractionAlert Module.
5. AI Module.
6. Checkout Module.

---

## 5.6. Checkout Frontend Group

### Screens

1. Dedicated checkout route or full-height panel.
2. Payment method section.
3. HIGH alert readiness section.
4. Stock validation error display.
5. Checkout success page/section.
6. Invoice link/display.

### Responsibilities

1. Show checkout summary.
2. Collect payment data.
3. Generate/send idempotency key.
4. Display validation failures.
5. Keep Draft Order if checkout fails.
6. Display invoice after success.

### Backend dependencies

1. Checkout Module.
2. Payment Module.
3. Invoice Module.
4. InteractionAlert Module.
5. Inventory Module.

---

## 5.7. AI Frontend Group

### Screens/Components

1. AI Copilot panel.
2. AI explanation result.
3. AI draft consultation note.
4. Safe refusal display.
5. Fallback/degraded indicator.

### Responsibilities

1. Request AI explanation.
2. Request note draft.
3. Show disclaimer.
4. Prevent auto-save of draft.
5. Require user confirmation for official note.
6. Display guardrail refusal.
7. Display fallback status if needed.

### Backend dependencies

1. AI Module.
2. InteractionAlert Module.
3. Graph Module if graph context is used.

---

## 5.8. Graph Frontend Group

### Screens

1. Graph Explorer read-only.
2. Graph-RAG query screen.
3. Graph-RAG result/provenance display.
4. Graph Sync Status UI — Should-have.

### Responsibilities

1. Allow Admin/Staff read-only graph use.
2. Hide Graph from Warehouse in MVP.
3. Prevent raw Cypher.
4. Show graph freshness/degraded indicator.
5. Show fallback response when graph stale/unavailable.

### Backend dependencies

1. Graph Module.
2. AI Module if response generation uses AI.
3. Authorization Module.

---

## 5.9. Reports Frontend Group

### Screens

1. Revenue Report.
2. Top Medicines Report.
3. Inventory Report.
4. Advanced charts — Should-have.
5. AI report narrative — Should-have.

### Responsibilities

1. Display deterministic reports.
2. Enforce role-based navigation.
3. Show Revenue/Top Medicines to Admin.
4. Show Inventory Report to Admin/Warehouse.
5. Avoid using AI narrative as mandatory MVP report.

### Backend dependencies

1. Report Module.
2. Inventory Module.
3. Payment Module.
4. Order/POS Module.
5. System Settings Module.

---

## 5.10. Settings Frontend Group

### Screens

1. System Settings screen.
2. Near-expiry threshold setting.
3. AI provider/model UI — Should-have.
4. Prompt editing UI — Should-have.

### Responsibilities

1. Let Admin view/update near-expiry threshold.
2. Show default 90 days if not configured.
3. Audit setting changes through backend.
4. Hide from Staff/Warehouse.

### Backend dependencies

1. System Settings Module.
2. Audit Module.
3. Authorization Module.

---

# 6. Module Responsibility Table

| Module               | Primary Responsibility                               | MVP |
| -------------------- | ---------------------------------------------------- | --: |
| Auth/Profile         | Supabase token verification and user profile context | Yes |
| User/Role/Permission | Multi-role RBAC, permissions, user-role mapping      | Yes |
| Medicine             | Medicine management                                  | Yes |
| ActiveIngredient     | ActiveIngredient and mapping                         | Yes |
| Supplier             | Supplier management                                  | Yes |
| Inventory            | MedicineBatch, stock calculations, FEFO              | Yes |
| Stock Import         | Import lifecycle and confirm                         | Yes |
| Inventory Adjustment | Adjustment lifecycle and confirm                     | Yes |
| Order/POS            | Draft Order and order items                          | Yes |
| Checkout             | Transactional checkout                               | Yes |
| Payment              | Payment simulation                                   | Yes |
| Invoice              | Invoice creation/view                                | Yes |
| Interaction          | ActiveIngredient-level rules and checking            | Yes |
| InteractionAlert     | Persisted alert lifecycle and HIGH handling          | Yes |
| AI                   | AI explanation/draft, guardrail, audit               | Yes |
| Graph                | Neo4j projection, Graph Sync, Graph-RAG              | Yes |
| Report               | Revenue, top medicines, inventory reports            | Yes |
| System Settings      | Near-expiry threshold                                | Yes |
| Audit                | Critical business audit                              | Yes |
| Idempotency          | Checkout idempotency                                 | Yes |
| Demo Seed/Reset      | Local demo reset and smoke readiness                 | Yes |

---

# 7. Module Dependencies

## 7.1. High-level dependency map

```text
Frontend
  → Backend API Modules

Checkout Module
  → Order/POS
  → Inventory
  → InteractionAlert
  → Payment
  → Invoice
  → Idempotency
  → Audit

Order/POS Module
  → Medicine
  → Inventory
  → Interaction
  → InteractionAlert

Stock Import Module
  → Supplier
  → Medicine
  → Inventory
  → Audit

Inventory Adjustment Module
  → Inventory
  → Audit

Interaction Module
  → ActiveIngredient
  → Medicine mapping
  → Graph Sync
  → Audit

AI Module
  → InteractionAlert
  → Guardrail
  → AIAudit
  → Google AI Provider
  → MockAI
  → Graph optional

Graph Module
  → Medicine
  → ActiveIngredient
  → Interaction
  → PostgreSQL
  → Neo4j
```

## 7.2. Dependency rules

1. Checkout may depend on many modules because it is orchestration boundary.
2. Lower-level modules should not depend on Checkout.
3. Inventory Module should not depend on POS.
4. Payment Module should not mark Order PAID outside Checkout.
5. Invoice Module should not create invoice outside Checkout.
6. AI Module should not write official consultation note directly.
7. Graph Module should not update PostgreSQL source data based on Neo4j.
8. Frontend should not bypass backend modules.

## 7.3. Cyclic dependency prevention

Potential cycles and prevention:

| Potential cycle                | Prevention                                                                           |
| ------------------------------ | ------------------------------------------------------------------------------------ |
| Order ↔ Checkout               | Order exposes query/update methods; Checkout orchestrates completion                 |
| Inventory ↔ Stock Import       | Stock Import calls Inventory; Inventory does not call Stock Import                   |
| Interaction ↔ InteractionAlert | Interaction returns results; InteractionAlert persists alerts                        |
| AI ↔ InteractionAlert          | AI returns draft; InteractionAlert stores note only after user confirmation          |
| Graph ↔ Domain modules         | Domain emits outbox; Graph reads source data; Graph does not call domain write logic |
| Report ↔ Domain modules        | Report reads data; does not update domain                                            |

---

# 8. Service Boundaries

## 8.1. Auth/Profile boundary

Auth/Profile boundary ends at:

1. Verified token.
2. User profile loaded.
3. User status checked.
4. Current user context created.

It does not decide sales/inventory permissions by itself.

## 8.2. Authorization boundary

AuthorizationService owns:

1. Effective permission resolution.
2. Permission checking.
3. Ownership helper logic.
4. Role/permission mapping logic.

Domain services still validate business-specific state.

## 8.3. Inventory boundary

InventoryService owns:

1. Batch quantity calculations.
2. Sellable stock.
3. Expired batch exclusion.
4. FEFO allocation.
5. Non-negative quantity protection.

Other modules must call InventoryService rather than duplicate stock logic.

## 8.4. Checkout boundary

CheckoutService owns orchestration of completing an order.

Only CheckoutService can:

1. Combine stock deduction.
2. Create payment attempt.
3. Mark order PAID.
4. Create invoice.
5. Finalize checkout transaction.

## 8.5. Interaction boundary

InteractionService owns:

1. DrugInteraction Rule management.
2. ActiveIngredient-level checking.
3. Canonical pair matching.

InteractionAlertService owns:

1. Persisted alert lifecycle.
2. HIGH acknowledgement/note.
3. Checkout readiness validation.

## 8.6. AI boundary

AIOrchestrator owns:

1. AI provider calls.
2. Guardrail integration.
3. AI audit.
4. Fallback.

It does not own official business note persistence.

## 8.7. Graph boundary

Graph Module owns:

1. Outbox processing.
2. Neo4j projection.
3. Graph freshness.
4. Graph-RAG query/fallback.

It does not own authoritative business data.

---

# 9. Data Ownership per Module

| Data / Entity             | Owning Module              | Notes                          |
| ------------------------- | -------------------------- | ------------------------------ |
| UserProfile               | Auth/Profile + User Module | Credentials remain in Supabase |
| Role                      | User/Role/Permission       | Seeded official roles          |
| Permission                | User/Role/Permission       | Permission matrix              |
| UserRole                  | User/Role/Permission       | Multi-role RBAC                |
| RolePermission            | User/Role/Permission       | Role permission mapping        |
| Medicine                  | Medicine                   | Core MVP medicine              |
| ActiveIngredient          | ActiveIngredient           | Curated ingredients            |
| MedicineIngredient        | ActiveIngredient           | Mapping                        |
| Supplier                  | Supplier                   | Used by Stock Import           |
| MedicineBatch             | Inventory                  | Inventory source of truth      |
| StockImport               | Stock Import               | Import lifecycle               |
| StockImportDetail         | Stock Import               | Import lines                   |
| InventoryAdjustment       | Inventory Adjustment       | Adjustment lifecycle           |
| InventoryAdjustmentDetail | Inventory Adjustment       | Adjustment lines               |
| Order                     | Order/POS                  | Draft/order state              |
| OrderItem                 | Order/POS                  | Draft items                    |
| OrderItemBatchAllocation  | Checkout + Inventory       | Created by checkout FEFO       |
| Payment                   | Payment                    | Created through checkout       |
| Invoice                   | Invoice                    | Created after payment success  |
| DrugInteractionRule       | Interaction                | ActiveIngredient-level rules   |
| InteractionAlert          | InteractionAlert           | Persisted displayed alerts     |
| PromptTemplate            | AI                         | Prompt versioning              |
| AIAuditLog                | AI                         | AI-specific audit              |
| GraphSyncOutbox           | Graph                      | Projection event               |
| GraphSyncAttempt          | Graph                      | Sync attempts/retries          |
| SystemSetting             | System Settings            | Near-expiry threshold          |
| AuditLog                  | Audit                      | Generic audit                  |
| IdempotencyRecord         | Idempotency                | Checkout idempotency           |
| Demo Seed Records         | Demo Reset coordinates     | Domain modules own actual data |

---

# 10. Transaction Boundaries

| Transaction                  | Owning Module        | Includes                                                                                 | Must Rollback On                                          |
| ---------------------------- | -------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Stock Import Confirm         | Stock Import         | Batch create/update, import status, audit                                                | Validation failure, expiry mismatch, DB error             |
| Inventory Adjustment Confirm | Inventory Adjustment | Batch update, adjustment status, audit                                                   | Negative quantity, DB error                               |
| Checkout                     | Checkout             | Order validation, FEFO allocation, batch deduction, payment, invoice, audit, idempotency | Stock failure, HIGH unresolved, payment failure, DB error |
| User Role Assignment         | User/Role/Permission | Mapping create/remove, audit                                                             | Duplicate/inactive role, DB error                         |
| HIGH Alert Update            | InteractionAlert     | Ack/note update, audit                                                                   | Ownership denied, inactive alert, validation error        |
| DrugInteraction Rule Update  | Interaction          | Rule change, audit, graph outbox                                                         | Duplicate pair, invalid severity                          |
| System Setting Update        | System Settings      | Setting update, audit                                                                    | Invalid value                                             |
| Demo Reset                   | Demo Reset           | Seed/reset batches, users, graph rebuild, smoke checks                                   | Non-local env, seed failure                               |

---

# 11. Error Handling Responsibilities

## 11.1. Global error handling

Global error layer should handle:

1. Unauthenticated.
2. Forbidden.
3. Ownership denied.
4. Validation errors.
5. Not found.
6. Conflict.
7. Business rule violation.
8. External provider failure.
9. Internal server error.

## 11.2. Module-specific error responsibilities

| Module               | Error responsibilities                                                          |
| -------------------- | ------------------------------------------------------------------------------- |
| Auth/Profile         | Invalid token, profile missing, inactive user, password change required         |
| User/Role/Permission | Duplicate mapping, inactive role, missing permission                            |
| Medicine             | Invalid price, inactive medicine sale attempt                                   |
| ActiveIngredient     | Duplicate ingredient/mapping, invalid mapping                                   |
| Supplier             | Warehouse deactivate denied, inactive supplier usage                            |
| Inventory            | Insufficient stock, expired batch exclusion, negative quantity                  |
| Stock Import         | Missing batch/expiry, quantity invalid, expiry mismatch, double confirm         |
| Inventory Adjustment | Missing reason, negative result, double confirm                                 |
| Order/POS            | Not owner, non-DRAFT update, inactive medicine                                  |
| Checkout             | HIGH unresolved, stock insufficient, idempotency mismatch, transaction rollback |
| Payment              | amount_tendered insufficient, duplicate success payment, missing reference      |
| Invoice              | Create invoice before payment success, duplicate invoice                        |
| Interaction          | Duplicate pair, invalid severity, CRITICAL rejected                             |
| InteractionAlert     | Alert inactive, note missing, unauthorized alert access                         |
| AI                   | Guardrail block, provider timeout, unsafe output, fallback                      |
| Graph                | Graph stale, Neo4j unavailable, raw Cypher denied                               |
| Report               | Forbidden report, empty dataset                                                 |
| Settings             | Invalid threshold, unauthorized update                                          |
| Demo Reset           | Non-local environment, seed failure, graph rebuild failure                      |

---

# 12. Audit Responsibilities

| Event                            | Owning/Calling Module |        Audit Required |
| -------------------------------- | --------------------- | --------------------: |
| User created                     | User/Role/Permission  |                   Yes |
| Role assigned/removed            | User/Role/Permission  |                   Yes |
| User deactivated                 | User/Role/Permission  |                   Yes |
| Medicine deactivated             | Medicine              |                   Yes |
| Supplier deactivated             | Supplier              |                   Yes |
| Stock Import confirmed/cancelled | Stock Import          |                   Yes |
| Inventory Adjustment confirmed   | Inventory Adjustment  |                   Yes |
| Checkout success                 | Checkout              |                   Yes |
| Checkout major failure           | Checkout              |           Recommended |
| Payment attempt                  | Payment               | Traceability required |
| Invoice created                  | Invoice               | Traceability required |
| DrugInteraction Rule changed     | Interaction           |                   Yes |
| HIGH alert acknowledged          | InteractionAlert      |                   Yes |
| HIGH consultation note saved     | InteractionAlert      |                   Yes |
| AI request                       | AI                    |     AI Audit required |
| AI fallback                      | AI                    |     AI Audit required |
| AI guardrail block               | AI                    |     AI Audit required |
| Graph sync failure               | Graph                 |                   Yes |
| Graph fallback                   | Graph                 |           Recommended |
| System setting update            | System Settings       |                   Yes |
| Demo reset run                   | Demo Reset            |                   Yes |

Generic System Audit UI is Should-have, but backend audit logging is MVP for critical actions.

---

# 13. Permission Requirements by Module

| Module               | Admin                           | Staff                        | Warehouse                            |
| -------------------- | ------------------------------- | ---------------------------- | ------------------------------------ |
| Auth/Profile         | Login/self profile              | Login/self profile           | Login/self profile                   |
| User/Role/Permission | Manage users/roles              | No                           | No                                   |
| Medicine             | Manage                          | Read sales                   | Read inventory                       |
| ActiveIngredient     | Manage                          | Read                         | Read                                 |
| Supplier             | Manage/deactivate               | No                           | Read/create/update                   |
| Inventory            | Full read                       | POS availability only        | Inventory read                       |
| Stock Import         | Read/create/confirm             | No                           | Read/create/confirm                  |
| Inventory Adjustment | Read/create/confirm             | No                           | Read/create/confirm                  |
| Order/POS            | All orders + POS                | Own orders + POS             | No                                   |
| Checkout             | Execute all                     | Execute own                  | No                                   |
| Payment              | Read all                        | Read own                     | No                                   |
| Invoice              | Read all                        | Read own                     | No                                   |
| Interaction          | Manage rules                    | Check own order/read limited | No                                   |
| InteractionAlert     | Read all/history, ack/note all  | Own order only               | No                                   |
| AI                   | Use + audit read                | Use in POS                   | No                                   |
| Graph                | Read Graph/RAG                  | Read Graph/RAG if granted    | No                                   |
| Reports              | Revenue/top/inventory           | No MVP general reports       | Inventory report                     |
| Settings             | Manage near-expiry              | No                           | No                                   |
| Audit                | AI audit, optional system audit | No                           | Optional inventory audit Should-have |
| Demo Reset           | Technical/local only            | No                           | No                                   |

---

# 14. MVP / Should-have / Future Module Classification

## 14.1. MVP modules

1. Auth/Profile Module.
2. User/Role/Permission Module.
3. Medicine Module.
4. ActiveIngredient Module.
5. Supplier Module.
6. Inventory Module.
7. Stock Import Module.
8. Inventory Adjustment Module.
9. Order/POS Module.
10. Checkout Module.
11. Payment Module.
12. Invoice Module.
13. Interaction Module.
14. InteractionAlert Module.
15. AI Module.
16. Graph Module.
17. Report Module.
18. System Settings Module.
19. Audit Module.
20. Idempotency Module.
21. Demo Seed/Reset Module.

## 14.2. Should-have modules/features

1. Full Customer Management Module.
2. Generic System Audit Log UI.
3. Graph Sync Status/retry UI.
4. Admin Prompt Editing UI.
5. Admin AI Provider/Model Config UI.
6. AI-generated Report Narrative.
7. Advanced Charts.
8. Notification Module.
9. Simple Forecast Module.
10. Simple Reorder Suggestion Module.
11. Supabase Storage integration if needed.
12. Supabase Realtime if needed.

## 14.3. Future / Commercial modules

1. Online Commerce Module.
2. Customer Portal Module.
3. Cart Module.
4. Wishlist Module.
5. Shipping Module.
6. Coupon Module.
7. Review Module.
8. CMS Module.
9. Multi-store Module.
10. Multi-warehouse Module.
11. Stock Transfer Module.
12. Purchase Order Module.
13. Supplier Contract Module.
14. Refund Module.
15. Return Module.
16. Credit Note Module.
17. Real Payment Gateway Module.
18. Bank Reconciliation Module.
19. Advanced Analytics Module.
20. AI Cache Module.
21. DrugGroup Taxonomy Module.
22. Symptom/Condition/RedFlag Graph Enrichment Module.
23. Production Compliance Module.

## 14.4. Out of Scope modules/features

1. Custom JWT Auth Module.
2. Password Hash Storage Module.
3. Aggregate Inventory Source-of-Truth Module.
4. Medicine-level Official Interaction Module.
5. Direct Payment Completion Module.
6. Direct Invoice Completion Module.
7. Checkout Bypass Module.
8. Raw Cypher UI for Staff.
9. AI Diagnosis Module.
10. AI Prescribing Module.
11. AI Dosage Advice Module.
12. Demo Reset for non-local environments.
13. Full 100-table MVP module set.

---

# 15. Module-to-API Traceability

| Module               | API group in Document 12               |
| -------------------- | -------------------------------------- |
| Auth/Profile         | Auth/Profile APIs                      |
| User/Role/Permission | User/RBAC APIs                         |
| Medicine             | Medicine APIs                          |
| ActiveIngredient     | ActiveIngredient and Mapping APIs      |
| Supplier             | Supplier APIs                          |
| Inventory            | Inventory APIs                         |
| Stock Import         | Stock Import APIs                      |
| Inventory Adjustment | Inventory Adjustment APIs              |
| Order/POS            | Order/POS APIs                         |
| Checkout             | Checkout API                           |
| Payment              | Payment query/internal APIs            |
| Invoice              | Invoice APIs                           |
| Interaction          | DrugInteraction/Interaction Check APIs |
| InteractionAlert     | InteractionAlert APIs                  |
| AI                   | AI Copilot/Audit APIs                  |
| Graph                | Graph Sync/Graph-RAG APIs              |
| Report               | Report APIs                            |
| System Settings      | Settings APIs                          |
| Audit                | Audit APIs if UI exists                |
| Idempotency          | Internal support for Checkout API      |
| Demo Seed/Reset      | Local tooling/internal APIs/scripts    |

---

# 16. Module-to-Database Traceability

| Module               | Database entities expected in Document 13/14                            |
| -------------------- | ----------------------------------------------------------------------- |
| Auth/Profile         | user_profiles                                                           |
| User/Role/Permission | roles, permissions, user_roles, role_permissions                        |
| Medicine             | medicines                                                               |
| ActiveIngredient     | active_ingredients, medicine_ingredients                                |
| Supplier             | suppliers                                                               |
| Inventory            | medicine_batches                                                        |
| Stock Import         | stock_imports, stock_import_details                                     |
| Inventory Adjustment | inventory_adjustments, inventory_adjustment_details                     |
| Order/POS            | orders, order_items                                                     |
| Checkout             | order_item_batch_allocations, idempotency_records, order status updates |
| Payment              | payments                                                                |
| Invoice              | invoices, invoice items/snapshot if modeled                             |
| Interaction          | drug_interactions                                                       |
| InteractionAlert     | interaction_alerts                                                      |
| AI                   | prompt_templates, ai_audit_logs, provider config if DB-based            |
| Graph                | graph_sync_outbox, graph_sync_attempts/logs, freshness metadata         |
| Report               | Reads orders/payments/invoices/batches/allocations                      |
| System Settings      | system_settings                                                         |
| Audit                | audit_logs                                                              |
| Demo Seed/Reset      | Seed data across MVP entities                                           |

---

# 17. Module-to-Test Traceability

| Module               | Test focus in Document 20                                              |
| -------------------- | ---------------------------------------------------------------------- |
| Auth/Profile         | Login, invalid token, inactive profile, first-login flow               |
| User/Role/Permission | Permission matrix, multi-role, forbidden access                        |
| Medicine             | Create/update/deactivate, selling_price > 0                            |
| ActiveIngredient     | Mapping, duplicate prevention, interaction dependency                  |
| Supplier             | Warehouse create/update, Admin deactivate, Warehouse deactivate denied |
| Inventory            | Sellable stock, expired exclusion, low-stock, near-expiry              |
| Stock Import         | Confirm, expiry mismatch, no double confirm                            |
| Inventory Adjustment | Reason required, no negative quantity, confirm behavior                |
| Order/POS            | Draft creation, add/update/remove items, ownership                     |
| Checkout             | Transaction, idempotency, FEFO, HIGH block, rollback                   |
| Payment              | Cash validation, bank reference, one successful payment                |
| Invoice              | Created after payment success, read permissions                        |
| Interaction          | ActiveIngredient-level rules, duplicate A–B/B–A                        |
| InteractionAlert     | Persist, active/inactive, HIGH acknowledgement/note                    |
| AI                   | Explanation, draft, provider fallback, guardrail refusal               |
| Graph                | Sync, freshness, fallback, raw Cypher denied                           |
| Report               | Revenue exclusions, top medicines, inventory report                    |
| System Settings      | Default 90 days, update threshold                                      |
| Audit                | Critical audit records                                                 |
| Idempotency          | Same key retry, payload mismatch                                       |
| Demo Seed/Reset      | Local-only guard, seed completeness, smoke checks                      |

---

## 18. Module Design Quality Checklist

Before implementation, each module should satisfy:

| Checklist item                              | Expected |
| ------------------------------------------- | -------- |
| Module has clear responsibility             | Yes      |
| Module has clear data ownership             | Yes      |
| Module dependencies are explicit            | Yes      |
| No circular dependency without abstraction  | Yes      |
| Permission requirements are known           | Yes      |
| Error responsibilities are known            | Yes      |
| Audit responsibilities are known            | Yes      |
| Transaction boundary identified if needed   | Yes      |
| MVP/Should-have/Future status clear         | Yes      |
| Traceability to SRS/API/DB/Test exists      | Yes      |
| Module does not reintroduce replaced design | Yes      |

Replaced designs that must not reappear:

1. Custom username/password/JWT auth.
2. Password/password_hash in PostgreSQL.
3. Aggregate inventory source of truth.
4. Medicine-level official interaction rules.
5. MockAI-only MVP.
6. MockGraph-only MVP.
7. Direct payment command as official order completion.
8. Direct invoice command as official order completion.
9. Full 100-table schema as MVP requirement.
10. Full Customer Management as MVP blocker.

---

## 19. Kết luận

Document 11 — Module Design Document đã chuyển kiến trúc tổng thể của **PharmaAssist AI Intelligence** thành thiết kế module backend/frontend cụ thể.

Tài liệu này đã xác định:

1. Module design principles.
2. Backend module list.
3. Thiết kế chi tiết từng backend module.
4. Frontend module/screen grouping.
5. Module responsibility table.
6. Module dependencies.
7. Service boundaries.
8. Data ownership per module.
9. Transaction boundaries.
10. Error handling responsibilities.
11. Audit responsibilities.
12. Permission requirements by module.
13. MVP/Should-have/Future/Out of Scope module classification.
14. Module-to-API traceability.
15. Module-to-database traceability.
16. Module-to-test traceability.
17. Module design quality checklist.

Các baseline quan trọng được giữ đúng:

1. Supabase Auth là authentication chính thức.
2. PostgreSQL không lưu password/password_hash.
3. Multi-role RBAC và permission-based authorization.
4. Medicine và ActiveIngredient là lõi nghiệp vụ.
5. Supplier Management là MVP.
6. MedicineBatch là inventory source of truth.
7. Stock Import confirm mới cập nhật MedicineBatch.
8. Inventory Adjustment là workflow điều chỉnh tồn kho chính thức.
9. POS hỗ trợ khách lẻ.
10. Checkout là transaction chính thức.
11. Checkout có idempotency.
12. Checkout áp dụng FEFO.
13. Payment và Invoice nằm trong checkout flow.
14. DrugInteraction Rule ở cấp ActiveIngredient–ActiveIngredient.
15. InteractionAlert phải persist.
16. HIGH alert cần acknowledgement và consultation note.
17. AI Copilot có Guardrail và Audit.
18. Google AI Provider là provider ưu tiên.
19. MockAI là fallback.
20. Graph Sync và Graph-RAG là MVP.
21. Neo4j là graph projection.
22. Demo reset chỉ chạy local.

Document 11 là đầu vào trực tiếp cho:

1. Document 12 — API Specification.
2. Document 13 — Database Design & ERD.
3. Document 14 — Prisma Schema & Migration Design.
4. Document 15 — UI/UX Screen Specification.
5. Document 19 — Project Management, Jira & Release Plan.
6. Document 20 — Testing, Demo & Setup Guide.

Bước tiếp theo hợp lý là viết **Document 12 — API Specification**, vì module boundaries, service responsibilities, authorization rules và transaction boundaries đã đủ rõ để chuyển thành API groups, command/query endpoints, authorization requirements và error behavior.
