# Document 14 — Prisma Schema & Migration Design

# Tài liệu 14 — Thiết kế Prisma Schema & Migration

---

## Metadata

| Mục                     | Nội dung                                                                                                                                           |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID             | DOC-14                                                                                                                                             |
| File name               | `14_prisma_schema_migration_design.md`                                                                                                             |
| Document Name           | Prisma Schema & Migration Design                                                                                                                   |
| Tên tiếng Việt          | Thiết kế Prisma Schema & Migration                                                                                                                 |
| Project                 | PharmaAssist AI Intelligence                                                                                                                       |
| Version                 | 1.0 Draft                                                                                                                                          |
| Status                  | Draft                                                                                                                                              |
| Created Date            | 08/06/2026                                                                                                                                         |
| Last Updated            | 08/06/2026                                                                                                                                         |
| Owner                   | Backend Lead / Prisma Implementer                                                                                                                  |
| Reviewer                | Database Designer, Backend Developer, Tester, Release/Demo Owner, Project Leader                                                                   |
| Baseline Source         | Document 13 — Database Design & ERD, Document 06 — SRS, Document 12 — API Specification, Document 18 — Demo Data, Document 20 — Testing/Demo/Setup |
| Database                | PostgreSQL                                                                                                                                         |
| ORM                     | Prisma                                                                                                                                             |
| Authentication Provider | Supabase Auth                                                                                                                                      |
| Source of Truth         | PostgreSQL                                                                                                                                         |
| Graph Projection        | Neo4j                                                                                                                                              |
| Language Rule           | Nội dung chính viết bằng tiếng Việt; tên model, enum, field, relation, migration, command và thuật ngữ kỹ thuật giữ tiếng Anh khi cần              |

---

## 1. Mục đích tài liệu

Tài liệu **Prisma Schema & Migration Design** chuyển thiết kế database trong **Document 13 — Database Design & ERD** thành kế hoạch triển khai bằng **Prisma Schema** và **migration strategy**.

Tài liệu này mô tả:

1. Nguyên tắc thiết kế Prisma schema.
2. Datasource/provider chính thức.
3. Ghi chú tích hợp Supabase Auth.
4. Nhóm model cần có cho MVP.
5. Enum definitions.
6. Relation definitions.
7. Unique constraints.
8. Index strategy.
9. Timestamp strategy.
10. Decimal/money fields strategy.
11. UUID strategy.
12. Soft delete/deactivation strategy.
13. Migration ordering.
14. Migration safety rules.
15. Seed dependency order.
16. Prisma validation.
17. Local migration vs shared/demo migration rules.
18. MVP/Should-have/Future model classification.
19. Rejected patterns.
20. Traceability từ Prisma sang ERD/API/Testing.

Tài liệu này là input trực tiếp cho:

1. Backend implementation.
2. Prisma schema authoring.
3. Migration planning.
4. Seed/demo data.
5. API integration.
6. Automated tests.
7. Demo reset workflow.

Tài liệu này **không** viết lại toàn bộ ERD, không viết API contract, không viết UI spec, không viết test case chi tiết và không tạo schema cho full 100-table commercial design như MVP.

---

## 2. Prisma Design Principles

### 2.1. Prisma schema phải bám Document 13

Prisma schema phải được triển khai dựa trên **Document 13 — Database Design & ERD**.

Không được tự ý thêm hoặc thay đổi:

1. Source of truth.
2. Inventory model.
3. Checkout transaction model.
4. Interaction rule level.
5. AI audit model.
6. Graph sync outbox model.
7. Idempotency model.
8. MVP/Future boundary.

Nếu cần thay đổi database model, phải cập nhật Decision Log và Document 13 trước hoặc cùng lúc.

---

### 2.2. PostgreSQL là source of truth

Prisma chỉ kết nối với PostgreSQL.

Neo4j không được model như Prisma datasource chính.

Neo4j projection được đồng bộ qua:

1. `graph_sync_outbox`.
2. `graph_sync_attempts`.
3. `graph_projection_versions`.
4. Graph Sync Worker.

---

### 2.3. Không lưu password/password_hash

Prisma schema không được có các field sau trong user model:

```text
password
passwordHash
password_hash
hashedPassword
jwtSecret
refreshToken
```

Supabase Auth là nơi quản lý credential.

Prisma chỉ lưu:

1. `supabaseUserId`.
2. user profile.
3. roles.
4. permissions.
5. user-role mapping.
6. role-permission mapping.
7. `mustChangePassword` application-level flag.

---

### 2.4. MedicineBatch là inventory source of truth

Prisma schema không được tạo model `Inventory` làm source of truth aggregate.

Đúng:

```text
MedicineBatch.quantityRemaining
```

Sai:

```text
Inventory.quantity as official stock source
```

Inventory Summary phải được tính từ `MedicineBatch`.

Nếu cần view/materialized view cho report performance, phải ghi rõ là derived data, không phải source of truth.

---

### 2.5. Checkout là transaction boundary

Prisma implementation phải hỗ trợ checkout transaction.

Checkout transaction liên quan đến:

1. `Order`.
2. `OrderItem`.
3. `MedicineBatch`.
4. `OrderItemBatchAllocation`.
5. `Payment`.
6. `Invoice`.
7. `InvoiceItem`.
8. `InteractionAlert`.
9. `IdempotencyRecord`.
10. `AuditLog`.

Implementation phải dùng Prisma transaction hoặc transaction mechanism tương đương.

---

### 2.6. Prisma không thay thế database constraints

Prisma schema giúp định nghĩa model/relation/index, nhưng một số constraint PostgreSQL cần raw SQL migration.

Ví dụ cần raw SQL hoặc manual migration:

1. Partial unique index.
2. Complex check constraint.
3. Conditional constraints theo enum.
4. Trigger nếu dùng.
5. Generated column nếu dùng.
6. Full-text index nếu dùng.
7. Case-insensitive unique index nếu cần.

Document 14 phải ghi rõ constraint nào Prisma hỗ trợ trực tiếp và constraint nào cần raw SQL migration.

---

### 2.7. MVP core subset trước

Prisma schema MVP chỉ cần core subset.

Không đưa toàn bộ extended/commercial 100-table design vào schema MVP.

MVP ưu tiên:

1. Auth/Profile.
2. RBAC.
3. Medicine.
4. ActiveIngredient.
5. Supplier.
6. MedicineBatch.
7. Stock Import.
8. Inventory Adjustment.
9. Order/POS.
10. Checkout.
11. Payment/Invoice.
12. DrugInteraction.
13. InteractionAlert.
14. AI Prompt/Audit.
15. Graph Sync.
16. Settings.
17. Audit.
18. Idempotency.
19. Demo seed support.

---

### 2.8. Field naming convention

Prisma model field nên dùng `camelCase`.

Database column có thể map sang `snake_case` bằng `@map`.

Ví dụ:

```prisma
model UserProfile {
  id             String   @id @default(uuid()) @db.Uuid
  supabaseUserId String   @unique @map("supabase_user_id") @db.Uuid
  fullName       String   @map("full_name")
  createdAt      DateTime @default(now()) @map("created_at") @db.Timestamptz(6)

  @@map("user_profiles")
}
```

### 2.9. Table naming convention

Database tables dùng `snake_case` plural.

Prisma models dùng `PascalCase`.

| Prisma Model        | DB Table               |
| ------------------- | ---------------------- |
| `UserProfile`       | `user_profiles`        |
| `MedicineBatch`     | `medicine_batches`     |
| `StockImportDetail` | `stock_import_details` |
| `InteractionAlert`  | `interaction_alerts`   |
| `GraphSyncOutbox`   | `graph_sync_outbox`    |

---

## 3. Prisma Datasource / Provider

### 3.1. Datasource

Prisma datasource chính thức:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 3.2. Generator

Recommended generator:

```prisma
generator client {
  provider = "prisma-client-js"
}
```

### 3.3. Database URL

`DATABASE_URL` phải trỏ đến PostgreSQL/Supabase PostgreSQL environment phù hợp.

Ví dụ environment groups:

1. `local`.
2. `test`.
3. `demo`.
4. `staging`.
5. `production`.

Demo reset chỉ được phép chạy ở `local`.

### 3.4. Shadow database

Nếu dùng Prisma migrate với shadow database, cần cấu hình:

```prisma
shadowDatabaseUrl = env("SHADOW_DATABASE_URL")
```

Tuy nhiên, project đã chốt **không provision separate PostgreSQL database riêng cho automated tests**. Vì vậy, team cần thận trọng khi dùng shadow DB trong shared/cloud environment.

Recommended:

1. Local development có thể dùng shadow DB nếu an toàn.
2. Không dùng demo DB làm shadow DB.
3. Không chạy destructive migration command trên demo/staging/production.
4. Migration check trong CI phải không phá dữ liệu demo.

---

## 4. Supabase Auth Integration Notes

### 4.1. Supabase owns credentials

Supabase Auth quản lý:

1. Password.
2. Password hash.
3. Auth identity.
4. Session.
5. Access token.

Prisma/PostgreSQL chỉ lưu profile nội bộ.

---

### 4.2. UserProfile model

`UserProfile` phải có field liên kết với Supabase:

```text
supabaseUserId
```

Yêu cầu:

1. Unique.
2. Required.
3. Không chứa password.
4. Dùng để map request token sang user profile.

---

### 4.3. Admin-created staff account

Flow MVP:

1. Admin tạo user qua Supabase Admin integration.
2. Supabase tạo credential.
3. Backend tạo `UserProfile`.
4. Backend gán role.
5. `mustChangePassword = true` nếu là new-staff demo flow.
6. User đổi password qua Supabase Auth.
7. Backend cập nhật `mustChangePassword = false`.

Prisma chỉ lưu application state.

---

### 4.4. Supabase user deletion

Không nên hard delete `UserProfile` khi Supabase user bị disable/deleted.

Recommended:

1. Set `UserProfile.isActive = false`.
2. Keep audit history.
3. Preserve actor references.

---

## 5. Model Groups

---

# 5.1. Identity & Access Models

## 5.1.1. Models

MVP models:

1. `UserProfile`
2. `Role`
3. `Permission`
4. `UserRole`
5. `RolePermission`

---

## 5.1.2. `UserProfile` design

### Purpose

Map Supabase Auth user sang internal application user.

### Key fields

| Prisma field         | Type        | DB mapping             | Notes         |
| -------------------- | ----------- | ---------------------- | ------------- |
| `id`                 | `String`    | uuid                   | Primary key   |
| `supabaseUserId`     | `String`    | `supabase_user_id`     | Unique        |
| `email`              | `String`    | `email`                | Unique        |
| `fullName`           | `String`    | `full_name`            | Required      |
| `phone`              | `String?`   | `phone`                | Optional      |
| `avatarUrl`          | `String?`   | `avatar_url`           | Optional      |
| `isActive`           | `Boolean`   | `is_active`            | Default true  |
| `mustChangePassword` | `Boolean`   | `must_change_password` | Default false |
| `createdAt`          | `DateTime`  | `created_at`           | timestamptz   |
| `updatedAt`          | `DateTime`  | `updated_at`           | timestamptz   |
| `createdById`        | `String?`   | `created_by`           | Self FK       |
| `updatedById`        | `String?`   | `updated_by`           | Self FK       |
| `deactivatedAt`      | `DateTime?` | `deactivated_at`       | Optional      |
| `deactivatedById`    | `String?`   | `deactivated_by`       | Self FK       |

### Relations

1. `userRoles` → `UserRole[]`.
2. `createdUsers` self relation optional.
3. `updatedUsers` self relation optional.
4. Actor relations from audit/workflow models.

### Constraints

1. `@id @default(uuid())`.
2. `@unique` on `supabaseUserId`.
3. `@unique` on `email`.
4. Index on `isActive`.

### Rejected fields

Do not add:

1. `password`.
2. `passwordHash`.
3. `username` as login key.
4. `jwtToken`.
5. `refreshToken`.

---

## 5.1.3. `Role` design

### Key fields

| Field         | Type        | Notes                         |
| ------------- | ----------- | ----------------------------- |
| `id`          | String uuid | Primary key                   |
| `key`         | String      | unique: admin/staff/warehouse |
| `name`        | String      | Display                       |
| `description` | String?     | Optional                      |
| `isActive`    | Boolean     | Default true                  |
| `isSystem`    | Boolean     | Built-in role                 |
| `createdAt`   | DateTime    | Created                       |
| `updatedAt`   | DateTime    | Updated                       |

### Relations

1. `userRoles`.
2. `rolePermissions`.

### Constraints

1. Unique `key`.
2. Index `isActive`.

---

## 5.1.4. `Permission` design

### Key fields

| Field         | Type        | Notes                 |
| ------------- | ----------- | --------------------- |
| `id`          | String uuid | Primary key           |
| `key`         | String      | unique permission key |
| `module`      | String      | module name           |
| `action`      | String      | action                |
| `scope`       | String?     | own/all/manage/read   |
| `description` | String?     | Optional              |
| `isActive`    | Boolean     | Default true          |
| `createdAt`   | DateTime    | Created               |
| `updatedAt`   | DateTime    | Updated               |

### Constraints

1. Unique `key`.
2. Index on `module`.
3. Index on `isActive`.

---

## 5.1.5. `UserRole` design

### Key fields

| Field          | Type        | Notes          |
| -------------- | ----------- | -------------- |
| `id`           | String uuid | Primary key    |
| `userId`       | String uuid | FK UserProfile |
| `roleId`       | String uuid | FK Role        |
| `isActive`     | Boolean     | Active mapping |
| `assignedAt`   | DateTime    | Assigned time  |
| `assignedById` | String?     | FK UserProfile |
| `removedAt`    | DateTime?   | Optional       |
| `removedById`  | String?     | Optional       |

### Relations

1. `user` → `UserProfile`.
2. `role` → `Role`.
3. `assignedBy` → `UserProfile?`.
4. `removedBy` → `UserProfile?`.

### Unique/index strategy

Prisma can define:

```prisma
@@index([userId])
@@index([roleId])
```

But active unique mapping requires partial unique index:

```sql
CREATE UNIQUE INDEX user_roles_active_unique
ON user_roles(user_id, role_id)
WHERE is_active = true;
```

This must be added in raw SQL migration.

---

## 5.1.6. `RolePermission` design

Similar to `UserRole`.

Active unique mapping requires partial unique index:

```sql
CREATE UNIQUE INDEX role_permissions_active_unique
ON role_permissions(role_id, permission_id)
WHERE is_active = true;
```

---

# 5.2. Medicine & ActiveIngredient Models

## 5.2.1. Models

1. `Medicine`
2. `ActiveIngredient`
3. `MedicineIngredient`

---

## 5.2.2. `Medicine` design

### Key fields

| Field             | Type        | Notes             |
| ----------------- | ----------- | ----------------- |
| `id`              | String uuid | Primary key       |
| `code`            | String?     | Optional SKU/code |
| `name`            | String      | Required          |
| `normalizedName`  | String      | Search/dedup      |
| `description`     | String?     | Optional          |
| `unit`            | String      | Required          |
| `dosageForm`      | String?     | Optional          |
| `strengthText`    | String?     | Optional          |
| `sellingPrice`    | Decimal     | Required, > 0     |
| `minStock`        | Int         | Required, >= 0    |
| `isActive`        | Boolean     | Default true      |
| `createdAt`       | DateTime    | Created           |
| `updatedAt`       | DateTime    | Updated           |
| `createdById`     | String?     | Actor             |
| `updatedById`     | String?     | Actor             |
| `deactivatedAt`   | DateTime?   | Optional          |
| `deactivatedById` | String?     | Actor             |

### Relations

1. `ingredients` → `MedicineIngredient[]`.
2. `batches` → `MedicineBatch[]`.
3. `orderItems` → `OrderItem[]`.
4. `stockImportDetails` → `StockImportDetail[]`.

### Constraints

Prisma:

1. `@@unique([code])` if code used and not null logic accepted.
2. `@@index([normalizedName])`.
3. `@@index([isActive])`.

Raw SQL check constraints:

```sql
ALTER TABLE medicines
ADD CONSTRAINT medicines_selling_price_positive
CHECK (selling_price > 0);

ALTER TABLE medicines
ADD CONSTRAINT medicines_min_stock_non_negative
CHECK (min_stock >= 0);
```

---

## 5.2.3. `ActiveIngredient` design

### Key fields

| Field            | Type             | Notes        |
| ---------------- | ---------------- | ------------ |
| `id`             | String uuid      | Primary key  |
| `name`           | String           | Required     |
| `normalizedName` | String           | Unique       |
| `description`    | String?          | Optional     |
| `sourceNote`     | String?          | Curated note |
| `isActive`       | Boolean          | Default true |
| audit fields     | DateTime/String? | Standard     |

### Relations

1. `medicineMappings` → `MedicineIngredient[]`.
2. `interactionsAsA` → `DrugInteraction[]`.
3. `interactionsAsB` → `DrugInteraction[]`.
4. alert ingredient refs if modeled.

### Constraints

1. Unique `normalizedName`.
2. Index `isActive`.

---

## 5.2.4. `MedicineIngredient` design

### Key fields

| Field                | Type             | Notes               |
| -------------------- | ---------------- | ------------------- |
| `id`                 | String uuid      | Primary key         |
| `medicineId`         | String uuid      | FK Medicine         |
| `activeIngredientId` | String uuid      | FK ActiveIngredient |
| `amountText`         | String?          | Optional            |
| `sortOrder`          | Int?             | Optional            |
| `isActive`           | Boolean          | Default true        |
| audit fields         | DateTime/String? | Standard            |

### Relations

1. `medicine` → `Medicine`.
2. `activeIngredient` → `ActiveIngredient`.

### Unique/index strategy

Prisma indexes:

```prisma
@@index([medicineId])
@@index([activeIngredientId])
```

Partial unique active mapping via raw SQL:

```sql
CREATE UNIQUE INDEX medicine_ingredients_active_unique
ON medicine_ingredients(medicine_id, active_ingredient_id)
WHERE is_active = true;
```

---

# 5.3. Supplier Model

## 5.3.1. `Supplier` design

### Key fields

| Field            | Type             | Notes        |
| ---------------- | ---------------- | ------------ |
| `id`             | String uuid      | Primary key  |
| `name`           | String           | Required     |
| `normalizedName` | String           | Search/dedup |
| `phone`          | String?          | Optional     |
| `email`          | String?          | Optional     |
| `address`        | String?          | Optional     |
| `taxCode`        | String?          | Optional     |
| `contactPerson`  | String?          | Optional     |
| `isActive`       | Boolean          | Default true |
| audit fields     | DateTime/String? | Standard     |

### Relations

1. `stockImports` → `StockImport[]`.

### Constraints

1. Index on `normalizedName`.
2. Index on `isActive`.
3. Optional unique on `normalizedName` if business wants strict no duplicate.

### Business implementation note

Warehouse can create/update but cannot deactivate. This is authorization logic, not DB constraint.

---

# 5.4. MedicineBatch & Inventory Models

## 5.4.1. `MedicineBatch` design

### Key fields

| Field                       | Type             | Notes              |
| --------------------------- | ---------------- | ------------------ |
| `id`                        | String uuid      | Primary key        |
| `medicineId`                | String uuid      | FK Medicine        |
| `batchNumber`               | String           | Required           |
| `normalizedBatchNumber`     | String           | Required           |
| `expiryDate`                | DateTime         | Use date semantics |
| `quantityReceived`          | Int              | >= 0               |
| `quantityRemaining`         | Int              | >= 0               |
| `unitCost`                  | Decimal?         | Optional           |
| `sourceStockImportDetailId` | String?          | Optional FK        |
| `isActive`                  | Boolean          | Default true       |
| audit fields                | DateTime/String? | Standard           |

### Relations

1. `medicine` → `Medicine`.
2. `sourceStockImportDetail` → `StockImportDetail?`.
3. `inventoryAdjustmentDetails` → `InventoryAdjustmentDetail[]`.
4. `orderItemBatchAllocations` → `OrderItemBatchAllocation[]`.

### Constraints

Prisma:

```prisma
@@unique([medicineId, normalizedBatchNumber, expiryDate])
@@index([medicineId])
@@index([expiryDate])
@@index([medicineId, expiryDate])
@@index([quantityRemaining])
@@index([isActive])
```

Raw SQL check:

```sql
ALTER TABLE medicine_batches
ADD CONSTRAINT medicine_batches_quantity_received_non_negative
CHECK (quantity_received >= 0);

ALTER TABLE medicine_batches
ADD CONSTRAINT medicine_batches_quantity_remaining_non_negative
CHECK (quantity_remaining >= 0);
```

### Implementation note

Prisma `DateTime` is used for `expiryDate`, but application should treat it as date-only.

Recommended:

1. Store expiry date at midnight UTC or normalized date.
2. Avoid timezone-based date shifts in UI.
3. Document this in backend date utility.

---

# 5.5. Stock Import Models

## 5.5.1. `StockImport` design

### Key fields

| Field           | Type                | Notes                     |
| --------------- | ------------------- | ------------------------- |
| `id`            | String uuid         | Primary key               |
| `supplierId`    | String uuid         | FK Supplier               |
| `status`        | `StockImportStatus` | DRAFT/CONFIRMED/CANCELLED |
| `importDate`    | DateTime            | Date semantics            |
| `note`          | String?             | Optional                  |
| `createdById`   | String              | Actor                     |
| `updatedById`   | String?             | Actor                     |
| `confirmedAt`   | DateTime?           | Optional                  |
| `confirmedById` | String?             | Actor                     |
| `cancelledAt`   | DateTime?           | Optional                  |
| `cancelledById` | String?             | Actor                     |
| `cancelReason`  | String?             | Optional                  |
| timestamps      | DateTime            | Standard                  |

### Relations

1. `supplier` → `Supplier`.
2. `details` → `StockImportDetail[]`.
3. actor relations to `UserProfile`.

### Indexes

```prisma
@@index([supplierId])
@@index([status])
@@index([importDate])
@@index([createdById])
```

---

## 5.5.2. `StockImportDetail` design

### Key fields

| Field                   | Type        | Notes                          |
| ----------------------- | ----------- | ------------------------------ |
| `id`                    | String uuid | Primary key                    |
| `stockImportId`         | String uuid | FK StockImport                 |
| `medicineId`            | String uuid | FK Medicine                    |
| `batchNumber`           | String      | Required                       |
| `normalizedBatchNumber` | String      | Required                       |
| `expiryDate`            | DateTime    | Required, date semantics       |
| `quantity`              | Int         | > 0                            |
| `unitCost`              | Decimal?    | Optional                       |
| `createdBatchId`        | String?     | FK MedicineBatch after confirm |
| timestamps              | DateTime    | Standard                       |

### Relations

1. `stockImport` → `StockImport`.
2. `medicine` → `Medicine`.
3. `createdBatch` → `MedicineBatch?`.

### Indexes

```prisma
@@index([stockImportId])
@@index([medicineId])
@@index([medicineId, normalizedBatchNumber, expiryDate])
```

### Raw SQL check

```sql
ALTER TABLE stock_import_details
ADD CONSTRAINT stock_import_details_quantity_positive
CHECK (quantity > 0);
```

---

# 5.6. Inventory Adjustment Models

## 5.6.1. `InventoryAdjustment` design

### Key fields

| Field           | Type                        | Notes                     |
| --------------- | --------------------------- | ------------------------- |
| `id`            | String uuid                 | Primary key               |
| `status`        | `InventoryAdjustmentStatus` | DRAFT/CONFIRMED/CANCELLED |
| `reason`        | String                      | Required                  |
| `note`          | String?                     | Optional                  |
| `createdById`   | String                      | Actor                     |
| `updatedById`   | String?                     | Actor                     |
| `confirmedAt`   | DateTime?                   | Optional                  |
| `confirmedById` | String?                     | Actor                     |
| `cancelledAt`   | DateTime?                   | Optional                  |
| `cancelledById` | String?                     | Actor                     |
| timestamps      | DateTime                    | Standard                  |

### Relations

1. `details` → `InventoryAdjustmentDetail[]`.
2. actor relations to `UserProfile`.

### Indexes

```prisma
@@index([status])
@@index([createdById])
@@index([createdAt])
```

---

## 5.6.2. `InventoryAdjustmentDetail` design

### Key fields

| Field                   | Type        | Notes                   |
| ----------------------- | ----------- | ----------------------- |
| `id`                    | String uuid | Primary key             |
| `inventoryAdjustmentId` | String uuid | FK InventoryAdjustment  |
| `medicineBatchId`       | String uuid | FK MedicineBatch        |
| `quantityChange`        | Int         | Cannot be 0             |
| `beforeQuantity`        | Int?        | Snapshot before confirm |
| `afterQuantity`         | Int?        | Snapshot after confirm  |
| timestamps              | DateTime    | Standard                |

### Relations

1. `inventoryAdjustment` → `InventoryAdjustment`.
2. `medicineBatch` → `MedicineBatch`.

### Indexes

```prisma
@@index([inventoryAdjustmentId])
@@index([medicineBatchId])
```

### Raw SQL check

```sql
ALTER TABLE inventory_adjustment_details
ADD CONSTRAINT inventory_adjustment_details_quantity_change_non_zero
CHECK (quantity_change <> 0);
```

---

# 5.7. Sales / Order Models

## 5.7.1. `Order` design

### Key fields

| Field                 | Type          | Notes                                  |
| --------------------- | ------------- | -------------------------------------- |
| `id`                  | String uuid   | Primary key                            |
| `orderNumber`         | String        | Unique                                 |
| `status`              | `OrderStatus` | DRAFT/PAID/CANCELLED                   |
| `customerId`          | String?       | Should-have FK if Customer implemented |
| `customerDisplayName` | String?       | Snapshot/walk-in display               |
| `subtotalAmount`      | Decimal       | >= 0                                   |
| `discountAmount`      | Decimal       | >= 0, MVP default 0                    |
| `totalAmount`         | Decimal       | >= 0                                   |
| `note`                | String?       | Optional                               |
| `createdById`         | String        | Staff/Admin                            |
| `processedById`       | String?       | Checkout actor                         |
| `paidAt`              | DateTime?     | Paid time                              |
| `cancelledAt`         | DateTime?     | Cancel time                            |
| `cancelledById`       | String?       | Actor                                  |
| `cancelReason`        | String?       | Optional                               |
| timestamps            | DateTime      | Standard                               |

### Relations

1. `items` → `OrderItem[]`.
2. `payments` → `Payment[]`.
3. `invoice` → `Invoice?`.
4. `interactionAlerts` → `InteractionAlert[]`.
5. `batchAllocations` → `OrderItemBatchAllocation[]`.
6. actor relations to `UserProfile`.

### Indexes

```prisma
@@unique([orderNumber])
@@index([status])
@@index([createdById])
@@index([processedById])
@@index([createdAt])
@@index([paidAt])
```

### Raw SQL checks

```sql
ALTER TABLE orders
ADD CONSTRAINT orders_amounts_non_negative
CHECK (
  subtotal_amount >= 0
  AND discount_amount >= 0
  AND total_amount >= 0
);
```

---

## 5.7.2. `OrderItem` design

### Key fields

| Field        | Type        | Notes       |
| ------------ | ----------- | ----------- |
| `id`         | String uuid | Primary key |
| `orderId`    | String uuid | FK Order    |
| `medicineId` | String uuid | FK Medicine |
| `quantity`   | Int         | > 0         |
| `unitPrice`  | Decimal     | > 0         |
| `lineTotal`  | Decimal     | >= 0        |
| timestamps   | DateTime    | Standard    |

### Relations

1. `order` → `Order`.
2. `medicine` → `Medicine`.
3. `batchAllocations` → `OrderItemBatchAllocation[]`.
4. `invoiceItems` → `InvoiceItem[]`.

### Indexes

```prisma
@@index([orderId])
@@index([medicineId])
```

Optional if duplicate Medicine lines are not allowed:

```prisma
@@unique([orderId, medicineId])
```

### Raw SQL checks

```sql
ALTER TABLE order_items
ADD CONSTRAINT order_items_quantity_positive
CHECK (quantity > 0);

ALTER TABLE order_items
ADD CONSTRAINT order_items_price_positive
CHECK (unit_price > 0);

ALTER TABLE order_items
ADD CONSTRAINT order_items_line_total_non_negative
CHECK (line_total >= 0);
```

---

# 5.8. Payment / Invoice Models

## 5.8.1. `OrderItemBatchAllocation` design

### Key fields

| Field                 | Type        | Notes                 |
| --------------------- | ----------- | --------------------- |
| `id`                  | String uuid | Primary key           |
| `orderId`             | String uuid | FK Order              |
| `orderItemId`         | String uuid | FK OrderItem          |
| `medicineBatchId`     | String uuid | FK MedicineBatch      |
| `quantityAllocated`   | Int         | > 0                   |
| `expiryDateSnapshot`  | DateTime    | Batch expiry snapshot |
| `batchNumberSnapshot` | String      | Batch number snapshot |
| `createdAt`           | DateTime    | Created               |
| `createdById`         | String      | Checkout actor        |

### Relations

1. `order` → `Order`.
2. `orderItem` → `OrderItem`.
3. `medicineBatch` → `MedicineBatch`.
4. `createdBy` → `UserProfile`.

### Indexes

```prisma
@@index([orderId])
@@index([orderItemId])
@@index([medicineBatchId])
@@index([createdAt])
```

### Raw SQL check

```sql
ALTER TABLE order_item_batch_allocations
ADD CONSTRAINT order_item_batch_allocations_quantity_positive
CHECK (quantity_allocated > 0);
```

---

## 5.8.2. `Payment` design

### Key fields

| Field                  | Type            | Notes                         |
| ---------------------- | --------------- | ----------------------------- |
| `id`                   | String uuid     | Primary key                   |
| `orderId`              | String uuid     | FK Order                      |
| `status`               | `PaymentStatus` | SUCCESS/FAILED                |
| `method`               | `PaymentMethod` | CASH/BANK_TRANSFER_SIMULATION |
| `amountDue`            | Decimal         | >= 0                          |
| `amountTendered`       | Decimal?        | Cash                          |
| `changeAmount`         | Decimal?        | Cash                          |
| `transactionReference` | String?         | Bank simulation               |
| `failureReason`        | String?         | Optional                      |
| `processedAt`          | DateTime        | Required                      |
| `processedById`        | String          | Actor                         |
| `createdAt`            | DateTime        | Created                       |

### Relations

1. `order` → `Order`.
2. `processedBy` → `UserProfile`.
3. `invoice` → `Invoice?`.

### Indexes

```prisma
@@index([orderId])
@@index([status])
@@index([processedAt])
```

### Required raw SQL

Partial unique index for one successful payment:

```sql
CREATE UNIQUE INDEX payments_one_success_per_order
ON payments(order_id)
WHERE status = 'SUCCESS';
```

### Optional raw SQL

If transaction reference must be unique when not null:

```sql
CREATE UNIQUE INDEX payments_transaction_reference_unique
ON payments(transaction_reference)
WHERE transaction_reference IS NOT NULL;
```

### Business rule in service

Conditional validation is easier in service:

1. CASH requires `amountTendered`.
2. CASH requires `amountTendered >= amountDue`.
3. CASH computes `changeAmount`.
4. BANK_TRANSFER_SIMULATION requires `transactionReference`.
5. No PENDING status in MVP.

---

## 5.8.3. `Invoice` design

### Key fields

| Field                 | Type        | Notes           |
| --------------------- | ----------- | --------------- |
| `id`                  | String uuid | Primary key     |
| `invoiceNumber`       | String      | Unique          |
| `orderId`             | String uuid | Unique FK Order |
| `paymentId`           | String uuid | FK Payment      |
| `customerDisplayName` | String?     | Snapshot        |
| `subtotalAmount`      | Decimal     | >= 0            |
| `discountAmount`      | Decimal     | >= 0            |
| `totalAmount`         | Decimal     | >= 0            |
| `issuedAt`            | DateTime    | Required        |
| `issuedById`          | String      | Actor           |
| `createdAt`           | DateTime    | Created         |

### Relations

1. `order` → `Order`.
2. `payment` → `Payment`.
3. `issuedBy` → `UserProfile`.
4. `items` → `InvoiceItem[]`.

### Indexes

```prisma
@@unique([invoiceNumber])
@@unique([orderId])
@@index([issuedAt])
```

### Raw SQL check

```sql
ALTER TABLE invoices
ADD CONSTRAINT invoices_amounts_non_negative
CHECK (
  subtotal_amount >= 0
  AND discount_amount >= 0
  AND total_amount >= 0
);
```

---

## 5.8.4. `InvoiceItem` design

### Key fields

| Field                  | Type        | Notes        |
| ---------------------- | ----------- | ------------ |
| `id`                   | String uuid | Primary key  |
| `invoiceId`            | String uuid | FK Invoice   |
| `orderItemId`          | String uuid | FK OrderItem |
| `medicineId`           | String uuid | FK Medicine  |
| `medicineNameSnapshot` | String      | Snapshot     |
| `unitSnapshot`         | String      | Snapshot     |
| `quantity`             | Int         | > 0          |
| `unitPrice`            | Decimal     | > 0          |
| `lineTotal`            | Decimal     | >= 0         |
| `createdAt`            | DateTime    | Created      |

### Indexes

```prisma
@@index([invoiceId])
@@index([medicineId])
@@index([orderItemId])
```

### Raw SQL checks

```sql
ALTER TABLE invoice_items
ADD CONSTRAINT invoice_items_quantity_positive
CHECK (quantity > 0);

ALTER TABLE invoice_items
ADD CONSTRAINT invoice_items_unit_price_positive
CHECK (unit_price > 0);

ALTER TABLE invoice_items
ADD CONSTRAINT invoice_items_line_total_non_negative
CHECK (line_total >= 0);
```

---

# 5.9. Interaction Models

## 5.9.1. `DrugInteraction` design

### Key fields

| Field                     | Type                  | Notes               |
| ------------------------- | --------------------- | ------------------- |
| `id`                      | String uuid           | Primary key         |
| `ingredientAId`           | String uuid           | FK ActiveIngredient |
| `ingredientBId`           | String uuid           | FK ActiveIngredient |
| `canonicalPairKey`        | String                | Sorted pair key     |
| `severity`                | `InteractionSeverity` | LOW/MEDIUM/HIGH     |
| `description`             | String                | Required            |
| `recommendation`          | String                | Required            |
| `source`                  | String?               | Optional            |
| `sourceVersion`           | String?               | Optional            |
| `isActive`                | Boolean               | Default true        |
| audit/deactivation fields | DateTime/String?      | Standard            |

### Relations

1. `ingredientA` → `ActiveIngredient`.
2. `ingredientB` → `ActiveIngredient`.
3. `alerts` → `InteractionAlert[]`.

### Indexes

```prisma
@@index([ingredientAId])
@@index([ingredientBId])
@@index([severity])
@@index([isActive])
```

### Raw SQL requirements

1. ingredient A cannot equal ingredient B:

```sql
ALTER TABLE drug_interactions
ADD CONSTRAINT drug_interactions_distinct_ingredients
CHECK (ingredient_a_id <> ingredient_b_id);
```

2. Unique active canonical pair:

```sql
CREATE UNIQUE INDEX drug_interactions_active_pair_unique
ON drug_interactions(canonical_pair_key)
WHERE is_active = true;
```

### Service rule

Service must compute `canonicalPairKey` consistently:

```text
min(ingredientAId, ingredientBId) + "::" + max(ingredientAId, ingredientBId)
```

---

## 5.9.2. `InteractionAlert` design

### Key fields

| Field                    | Type                  | Notes                             |
| ------------------------ | --------------------- | --------------------------------- |
| `id`                     | String uuid           | Primary key                       |
| `orderId`                | String uuid           | FK Order                          |
| `drugInteractionId`      | String uuid           | FK DrugInteraction                |
| `ingredientAId`          | String uuid           | FK ActiveIngredient               |
| `ingredientBId`          | String uuid           | FK ActiveIngredient               |
| `severity`               | `InteractionSeverity` | Snapshot                          |
| `descriptionSnapshot`    | String                | Snapshot                          |
| `recommendationSnapshot` | String                | Snapshot                          |
| `isActive`               | Boolean               | Still applies                     |
| `displayCount`           | Int                   | >= 1                              |
| `firstDisplayedAt`       | DateTime              | Required                          |
| `lastDisplayedAt`        | DateTime              | Required                          |
| `acknowledgedById`       | String?               | FK UserProfile                    |
| `acknowledgedAt`         | DateTime?             | Required for HIGH before checkout |
| `consultationNote`       | String?               | Required for HIGH before checkout |
| `consultationNoteById`   | String?               | FK UserProfile                    |
| `consultationNoteAt`     | DateTime?             | Required if note exists           |
| `inactivatedAt`          | DateTime?             | Optional                          |
| `inactivationReason`     | String?               | Optional                          |
| timestamps               | DateTime              | Standard                          |

### Relations

1. `order` → `Order`.
2. `drugInteraction` → `DrugInteraction`.
3. `ingredientA` → `ActiveIngredient`.
4. `ingredientB` → `ActiveIngredient`.
5. `acknowledgedBy` → `UserProfile?`.
6. `consultationNoteBy` → `UserProfile?`.
7. `aiAuditLogs` → `AIAuditLog[]`.

### Indexes

```prisma
@@index([orderId])
@@index([drugInteractionId])
@@index([severity])
@@index([isActive])
@@index([acknowledgedById])
@@index([consultationNoteById])
```

### Raw SQL requirements

1. Display count positive:

```sql
ALTER TABLE interaction_alerts
ADD CONSTRAINT interaction_alerts_display_count_positive
CHECK (display_count >= 1);
```

2. Unique active alert per order/rule:

```sql
CREATE UNIQUE INDEX interaction_alerts_active_order_rule_unique
ON interaction_alerts(order_id, drug_interaction_id)
WHERE is_active = true;
```

### Service rule

Checkout validates HIGH alert through service:

```text
severity = HIGH
AND isActive = true
AND acknowledgedAt IS NOT NULL
AND consultationNote IS NOT NULL
```

This should be service-level rule, not only DB constraint, because LOW/MEDIUM do not require note.

---

# 5.10. AI Models

## 5.10.1. `PromptTemplate` design

### Key fields

| Field          | Type                   | Notes                  |
| -------------- | ---------------------- | ---------------------- |
| `id`           | String uuid            | Primary key            |
| `key`          | String                 | Prompt key             |
| `version`      | Int                    | Version                |
| `title`        | String                 | Display title          |
| `templateText` | String                 | Prompt body            |
| `purpose`      | String                 | Purpose                |
| `status`       | `PromptTemplateStatus` | DRAFT/APPROVED/RETIRED |
| `isOfficial`   | Boolean                | Seed official prompt   |
| audit fields   | DateTime/String?       | Standard               |
| `approvedAt`   | DateTime?              | Optional               |
| `approvedById` | String?                | Actor                  |

### Relations

1. `aiAuditLogs` → `AIAuditLog[]`.
2. `approvedBy` → `UserProfile?`.

### Constraints

```prisma
@@unique([key, version])
@@index([key])
@@index([status])
```

### Business rule

Only `APPROVED` templates should be used for official runtime.

---

## 5.10.2. `AIProviderConfig` design

### Key fields

| Field         | Type        | Notes             |
| ------------- | ----------- | ----------------- |
| `id`          | String uuid | Primary key       |
| `providerKey` | String      | GOOGLE_AI/MOCK_AI |
| `modelName`   | String?     | Optional          |
| `priority`    | Int         | Provider priority |
| `isEnabled`   | Boolean     | Enabled flag      |
| `timeoutMs`   | Int?        | Optional          |
| `configJson`  | Json?       | Non-secret config |
| timestamps    | DateTime    | Standard          |
| `updatedById` | String?     | Actor             |

### Constraints

```prisma
@@unique([providerKey])
@@index([isEnabled])
@@index([priority])
```

### Security note

Do not store raw API keys unless encrypted and approved.

Preferred:

1. Store secrets in environment.
2. Store non-secret config in DB.

---

## 5.10.3. `AIAuditLog` design

### Key fields

| Field                       | Type                | Notes              |
| --------------------------- | ------------------- | ------------------ |
| `id`                        | String uuid         | Primary key        |
| `userId`                    | String uuid         | Actor              |
| `actionType`                | `AIActionType`      | Action             |
| `relatedOrderId`            | String?             | Optional FK        |
| `relatedInteractionAlertId` | String?             | Optional FK        |
| `promptTemplateId`          | String?             | Optional FK        |
| `promptVersion`             | Int?                | Exact version      |
| `providerRequested`         | String              | Provider requested |
| `providerUsed`              | String              | Actual provider    |
| `modelUsed`                 | String?             | Model              |
| `fallbackUsed`              | Boolean             | Fallback flag      |
| `fallbackReason`            | String?             | Optional           |
| `inputGuardrailStatus`      | `GuardrailStatus`   | Required           |
| `outputGuardrailStatus`     | `GuardrailStatus`   | Required           |
| `schemaValidationStatus`    | `ValidationStatus?` | Optional           |
| `latencyMs`                 | Int?                | Optional           |
| `requestSummary`            | String?             | Minimized          |
| `responseSummary`           | String?             | Minimized          |
| `errorCode`                 | String?             | Optional           |
| `createdAt`                 | DateTime            | Required           |

### Relations

1. `user` → `UserProfile`.
2. `relatedOrder` → `Order?`.
3. `relatedInteractionAlert` → `InteractionAlert?`.
4. `promptTemplate` → `PromptTemplate?`.

### Indexes

```prisma
@@index([userId])
@@index([actionType])
@@index([providerUsed])
@@index([fallbackUsed])
@@index([createdAt])
@@index([relatedInteractionAlertId])
```

### Business rule

Do not store raw PII or full medical context.

---

# 5.11. Graph Sync Models

## 5.11.1. `GraphSyncOutbox` design

### Key fields

| Field              | Type                 | Notes                   |
| ------------------ | -------------------- | ----------------------- |
| `id`               | String uuid          | Primary key             |
| `eventType`        | `GraphSyncEventType` | Event type              |
| `aggregateType`    | String               | Source aggregate        |
| `aggregateId`      | String               | Source ID               |
| `sourceVersion`    | BigInt or Int        | Source version          |
| `payload`          | Json?                | Minimal event payload   |
| `status`           | `GraphSyncStatus`    | PENDING/PROCESSING/etc. |
| `retryCount`       | Int                  | Default 0               |
| `nextRetryAt`      | DateTime?            | Optional                |
| `lastErrorCode`    | String?              | Optional                |
| `lastErrorMessage` | String?              | Safe summary            |
| timestamps         | DateTime             | Standard                |
| `processedAt`      | DateTime?            | Optional                |

### Relations

1. `attempts` → `GraphSyncAttempt[]`.

### Indexes

```prisma
@@index([status])
@@index([aggregateType])
@@index([aggregateId])
@@index([aggregateType, aggregateId, sourceVersion])
@@index([nextRetryAt])
@@index([createdAt])
```

### Raw SQL check

```sql
ALTER TABLE graph_sync_outbox
ADD CONSTRAINT graph_sync_outbox_retry_count_non_negative
CHECK (retry_count >= 0);
```

---

## 5.11.2. `GraphSyncAttempt` design

### Key fields

| Field                   | Type                     | Notes              |
| ----------------------- | ------------------------ | ------------------ |
| `id`                    | String uuid              | Primary key        |
| `outboxId`              | String uuid              | FK GraphSyncOutbox |
| `attemptNumber`         | Int                      | > 0                |
| `status`                | `GraphSyncAttemptStatus` | SUCCESS/FAILED     |
| `startedAt`             | DateTime                 | Required           |
| `finishedAt`            | DateTime?                | Optional           |
| `durationMs`            | Int?                     | Optional           |
| `errorCode`             | String?                  | Optional           |
| `errorMessage`          | String?                  | Safe summary       |
| `neo4jOperationSummary` | Json?                    | Optional           |
| `createdAt`             | DateTime                 | Required           |

### Relations

1. `outbox` → `GraphSyncOutbox`.

### Indexes

```prisma
@@index([outboxId])
@@index([status])
@@index([startedAt])
```

### Raw SQL check

```sql
ALTER TABLE graph_sync_attempts
ADD CONSTRAINT graph_sync_attempts_attempt_number_positive
CHECK (attempt_number > 0);
```

---

## 5.11.3. `GraphProjectionVersion` design

### Key fields

| Field                    | Type          | Notes                    |
| ------------------------ | ------------- | ------------------------ |
| `id`                     | String uuid   | Primary key              |
| `aggregateType`          | String        | Source aggregate         |
| `aggregateId`            | String        | Source ID                |
| `projectedSourceVersion` | BigInt or Int | Latest projected version |
| `isActiveProjection`     | Boolean       | Active projection        |
| `syncedAt`               | DateTime      | Last synced              |
| timestamps               | DateTime      | Standard                 |

### Constraints

```prisma
@@unique([aggregateType, aggregateId])
@@index([syncedAt])
@@index([isActiveProjection])
```

### Business rule

Used for freshness detection. Graph freshness is not based only on elapsed time.

---

# 5.12. Settings / Audit / Idempotency Models

## 5.12.1. `SystemSetting` design

### Key fields

| Field         | Type        | Notes                      |
| ------------- | ----------- | -------------------------- |
| `id`          | String uuid | Primary key                |
| `key`         | String      | Unique                     |
| `valueJson`   | Json        | Setting value              |
| `valueType`   | String      | number/string/boolean/json |
| `description` | String?     | Optional                   |
| `isActive`    | Boolean     | Default true               |
| timestamps    | DateTime    | Standard                   |
| `updatedById` | String?     | FK UserProfile             |

### Constraints

```prisma
@@unique([key])
@@index([isActive])
```

### MVP seed

Required setting:

```text
near_expiry_threshold_days = 90
```

---

## 5.12.2. `AuditLog` design

### Key fields

| Field          | Type          | Notes           |
| -------------- | ------------- | --------------- |
| `id`           | String uuid   | Primary key     |
| `actorUserId`  | String?       | FK UserProfile  |
| `action`       | String        | Action key      |
| `resourceType` | String        | Entity/resource |
| `resourceId`   | String?       | Resource ID     |
| `result`       | `AuditResult` | SUCCESS/FAILED  |
| `requestId`    | String?       | Trace           |
| `ipAddress`    | String?       | Optional        |
| `userAgent`    | String?       | Optional        |
| `summary`      | String?       | Safe summary    |
| `metadata`     | Json?         | Safe metadata   |
| `errorCode`    | String?       | Optional        |
| `createdAt`    | DateTime      | Required        |

### Indexes

```prisma
@@index([actorUserId])
@@index([action])
@@index([resourceType])
@@index([resourceId])
@@index([createdAt])
@@index([result])
```

### Business rule

No raw PII or secrets in metadata.

---

## 5.12.3. `IdempotencyRecord` design

### Key fields

| Field             | Type                | Notes                       |
| ----------------- | ------------------- | --------------------------- |
| `id`              | String uuid         | Primary key                 |
| `idempotencyKey`  | String              | Client key                  |
| `userId`          | String uuid         | Actor                       |
| `operation`       | String              | CHECKOUT                    |
| `requestHash`     | String              | Normalized payload hash     |
| `status`          | `IdempotencyStatus` | PROCESSING/SUCCEEDED/FAILED |
| `resourceType`    | String?             | Related resource            |
| `resourceId`      | String?             | Related ID                  |
| `responseSummary` | Json?               | Safe previous result        |
| `errorCode`       | String?             | Optional                    |
| timestamps        | DateTime            | Standard                    |
| `completedAt`     | DateTime?           | Optional                    |

### Constraints

```prisma
@@unique([userId, operation, idempotencyKey])
@@index([status])
@@index([createdAt])
@@index([resourceType, resourceId])
```

### Business rule

Required for checkout.

---

## 6. Enum Definitions

The following enums are required in Prisma schema.

---

### 6.1. `OrderStatus`

```prisma
enum OrderStatus {
  DRAFT
  PAID
  CANCELLED
}
```

Rejected values:

1. `READY_FOR_CHECKOUT`
2. `PENDING`
3. `COMPLETED`

---

### 6.2. `StockImportStatus`

```prisma
enum StockImportStatus {
  DRAFT
  CONFIRMED
  CANCELLED
}
```

---

### 6.3. `InventoryAdjustmentStatus`

```prisma
enum InventoryAdjustmentStatus {
  DRAFT
  CONFIRMED
  CANCELLED
}
```

---

### 6.4. `PaymentStatus`

```prisma
enum PaymentStatus {
  SUCCESS
  FAILED
}
```

Rejected for MVP:

```prisma
PENDING
```

---

### 6.5. `PaymentMethod`

```prisma
enum PaymentMethod {
  CASH
  BANK_TRANSFER_SIMULATION
}
```

---

### 6.6. `InteractionSeverity`

```prisma
enum InteractionSeverity {
  LOW
  MEDIUM
  HIGH
}
```

Rejected for MVP:

```prisma
CRITICAL
```

---

### 6.7. `PromptTemplateStatus`

```prisma
enum PromptTemplateStatus {
  DRAFT
  APPROVED
  RETIRED
}
```

---

### 6.8. `GuardrailStatus`

```prisma
enum GuardrailStatus {
  PASSED
  BLOCKED
  ERROR
  SKIPPED
}
```

---

### 6.9. `ValidationStatus`

```prisma
enum ValidationStatus {
  PASSED
  FAILED
  SKIPPED
}
```

---

### 6.10. `GraphSyncStatus`

```prisma
enum GraphSyncStatus {
  PENDING
  PROCESSING
  SUCCEEDED
  RETRY_SCHEDULED
  FAILED
  SKIPPED
}
```

---

### 6.11. `GraphSyncAttemptStatus`

```prisma
enum GraphSyncAttemptStatus {
  SUCCESS
  FAILED
}
```

---

### 6.12. `GraphSyncEventType`

```prisma
enum GraphSyncEventType {
  MEDICINE_UPSERT
  MEDICINE_DEACTIVATE
  ACTIVE_INGREDIENT_UPSERT
  ACTIVE_INGREDIENT_DEACTIVATE
  MEDICINE_INGREDIENT_MAPPING_UPSERT
  MEDICINE_INGREDIENT_MAPPING_DEACTIVATE
  DRUG_INTERACTION_UPSERT
  DRUG_INTERACTION_DEACTIVATE
  GRAPH_REBUILD_REQUESTED
}
```

---

### 6.13. `IdempotencyStatus`

```prisma
enum IdempotencyStatus {
  PROCESSING
  SUCCEEDED
  FAILED
}
```

---

### 6.14. `AuditResult`

```prisma
enum AuditResult {
  SUCCESS
  FAILED
}
```

---

### 6.15. `AIActionType`

```prisma
enum AIActionType {
  INTERACTION_EXPLANATION
  CONSULTATION_NOTE_DRAFT
  SAFE_FOLLOW_UP_QUESTIONS
  GUARDRAIL_REFUSAL
  REPORT_NARRATIVE
}
```

`REPORT_NARRATIVE` is Should-have, not required MVP flow.

---

## 7. Relation Definitions

### 7.1. Identity relations

| Relation                          | Type |
| --------------------------------- | ---- |
| `UserProfile` → `UserRole[]`      | 1:N  |
| `Role` → `UserRole[]`             | 1:N  |
| `Role` → `RolePermission[]`       | 1:N  |
| `Permission` → `RolePermission[]` | 1:N  |

---

### 7.2. Medicine relations

| Relation                                    | Type |
| ------------------------------------------- | ---- |
| `Medicine` → `MedicineIngredient[]`         | 1:N  |
| `ActiveIngredient` → `MedicineIngredient[]` | 1:N  |
| `Medicine` → `MedicineBatch[]`              | 1:N  |
| `Medicine` → `OrderItem[]`                  | 1:N  |
| `Medicine` → `StockImportDetail[]`          | 1:N  |

---

### 7.3. Inventory relations

| Relation                                              | Type         |
| ----------------------------------------------------- | ------------ |
| `Supplier` → `StockImport[]`                          | 1:N          |
| `StockImport` → `StockImportDetail[]`                 | 1:N          |
| `StockImportDetail` → `MedicineBatch?`                | optional N:1 |
| `InventoryAdjustment` → `InventoryAdjustmentDetail[]` | 1:N          |
| `MedicineBatch` → `InventoryAdjustmentDetail[]`       | 1:N          |

---

### 7.4. Sales relations

| Relation                                       | Type   |
| ---------------------------------------------- | ------ |
| `Order` → `OrderItem[]`                        | 1:N    |
| `OrderItem` → `OrderItemBatchAllocation[]`     | 1:N    |
| `MedicineBatch` → `OrderItemBatchAllocation[]` | 1:N    |
| `Order` → `Payment[]`                          | 1:N    |
| `Order` → `Invoice?`                           | 1:0..1 |
| `Invoice` → `InvoiceItem[]`                    | 1:N    |

---

### 7.5. Interaction relations

| Relation                                               | Type         |
| ------------------------------------------------------ | ------------ |
| `ActiveIngredient` → `DrugInteraction[]` as A          | 1:N          |
| `ActiveIngredient` → `DrugInteraction[]` as B          | 1:N          |
| `Order` → `InteractionAlert[]`                         | 1:N          |
| `DrugInteraction` → `InteractionAlert[]`               | 1:N          |
| `UserProfile` → `InteractionAlert[]` acknowledged/note | 1:N optional |

---

### 7.6. AI / Graph relations

| Relation                                     | Type |
| -------------------------------------------- | ---- |
| `PromptTemplate` → `AIAuditLog[]`            | 1:N  |
| `UserProfile` → `AIAuditLog[]`               | 1:N  |
| `Order` → `AIAuditLog[]` optional            | 1:N  |
| `InteractionAlert` → `AIAuditLog[]` optional | 1:N  |
| `GraphSyncOutbox` → `GraphSyncAttempt[]`     | 1:N  |

---

## 8. Unique Constraints

### 8.1. Prisma-supported unique constraints

| Model                    | Constraint                                                  |
| ------------------------ | ----------------------------------------------------------- |
| `UserProfile`            | `@unique supabaseUserId`                                    |
| `UserProfile`            | `@unique email`                                             |
| `Role`                   | `@unique key`                                               |
| `Permission`             | `@unique key`                                               |
| `ActiveIngredient`       | `@unique normalizedName`                                    |
| `MedicineBatch`          | `@@unique([medicineId, normalizedBatchNumber, expiryDate])` |
| `Order`                  | `@unique orderNumber`                                       |
| `Invoice`                | `@unique invoiceNumber`                                     |
| `Invoice`                | `@unique orderId`                                           |
| `PromptTemplate`         | `@@unique([key, version])`                                  |
| `AIProviderConfig`       | `@unique providerKey`                                       |
| `SystemSetting`          | `@unique key`                                               |
| `IdempotencyRecord`      | `@@unique([userId, operation, idempotencyKey])`             |
| `GraphProjectionVersion` | `@@unique([aggregateType, aggregateId])`                    |

---

### 8.2. Partial unique constraints requiring raw SQL

| Table                  | Constraint                                                                   |
| ---------------------- | ---------------------------------------------------------------------------- |
| `user_roles`           | active unique `(user_id, role_id)` where `is_active = true`                  |
| `role_permissions`     | active unique `(role_id, permission_id)` where `is_active = true`            |
| `medicine_ingredients` | active unique `(medicine_id, active_ingredient_id)` where `is_active = true` |
| `payments`             | one SUCCESS payment per order                                                |
| `drug_interactions`    | active unique `canonical_pair_key`                                           |
| `interaction_alerts`   | active unique `(order_id, drug_interaction_id)`                              |

### 8.3. Raw SQL migration examples

```sql
CREATE UNIQUE INDEX user_roles_active_unique
ON user_roles(user_id, role_id)
WHERE is_active = true;
```

```sql
CREATE UNIQUE INDEX payments_one_success_per_order
ON payments(order_id)
WHERE status = 'SUCCESS';
```

```sql
CREATE UNIQUE INDEX drug_interactions_active_pair_unique
ON drug_interactions(canonical_pair_key)
WHERE is_active = true;
```

```sql
CREATE UNIQUE INDEX interaction_alerts_active_order_rule_unique
ON interaction_alerts(order_id, drug_interaction_id)
WHERE is_active = true;
```

---

## 9. Index Strategy

### 9.1. Index principles

Indexes should support:

1. Authentication lookup.
2. Permission resolution.
3. Search/list pages.
4. POS medicine search.
5. Inventory summary.
6. FEFO allocation.
7. Staff ownership.
8. Checkout validation.
9. Interaction checking.
10. Alert history.
11. Reports.
12. AI Audit query.
13. Graph Sync worker polling.
14. Idempotency lookup.

---

### 9.2. Critical indexes

| Model                      | Index                                                              |
| -------------------------- | ------------------------------------------------------------------ |
| `UserProfile`              | `supabaseUserId`, `email`, `isActive`                              |
| `UserRole`                 | `userId`, `roleId`                                                 |
| `RolePermission`           | `roleId`, `permissionId`                                           |
| `Medicine`                 | `normalizedName`, `isActive`                                       |
| `ActiveIngredient`         | `normalizedName`, `isActive`                                       |
| `MedicineIngredient`       | `medicineId`, `activeIngredientId`                                 |
| `MedicineBatch`            | `medicineId`, `expiryDate`, `[medicineId, expiryDate]`             |
| `StockImport`              | `status`, `supplierId`, `importDate`                               |
| `InventoryAdjustment`      | `status`, `createdById`, `createdAt`                               |
| `Order`                    | `status`, `createdById`, `processedById`, `createdAt`, `paidAt`    |
| `OrderItem`                | `orderId`, `medicineId`                                            |
| `OrderItemBatchAllocation` | `orderId`, `orderItemId`, `medicineBatchId`                        |
| `Payment`                  | `orderId`, `status`, `processedAt`                                 |
| `Invoice`                  | `orderId`, `issuedAt`                                              |
| `DrugInteraction`          | `ingredientAId`, `ingredientBId`, `severity`, `isActive`           |
| `InteractionAlert`         | `orderId`, `severity`, `isActive`                                  |
| `AIAuditLog`               | `userId`, `actionType`, `createdAt`, `fallbackUsed`                |
| `GraphSyncOutbox`          | `status`, `aggregateType`, `aggregateId`, `nextRetryAt`            |
| `AuditLog`                 | `actorUserId`, `action`, `resourceType`, `resourceId`, `createdAt` |
| `IdempotencyRecord`        | `userId`, `operation`, `idempotencyKey`                            |

---

## 10. Timestamp Strategy

### 10.1. Standard timestamp fields

Most models should use:

```prisma
createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz(6)
updatedAt DateTime @updatedAt @map("updated_at") @db.Timestamptz(6)
```

### 10.2. Event timestamp fields

Workflow event fields:

1. `confirmedAt`.
2. `cancelledAt`.
3. `paidAt`.
4. `processedAt`.
5. `issuedAt`.
6. `acknowledgedAt`.
7. `consultationNoteAt`.
8. `inactivatedAt`.
9. `approvedAt`.
10. `syncedAt`.
11. `completedAt`.

These should use:

```prisma
DateTime? @db.Timestamptz(6)
```

or required `DateTime` if always present.

### 10.3. Date-only fields

PostgreSQL `date` maps less directly through Prisma depending approach.

For MVP simplicity:

1. Use `DateTime @db.Date` if supported by Prisma/PostgreSQL mapping.
2. Or use `DateTime @db.Timestamptz(6)` and normalize to date-only in service.

Preferred for fields:

1. `expiryDate`.
2. `importDate`.

Implementation must avoid timezone bugs.

Recommended backend rule:

1. Store date-only values normalized.
2. Render date in frontend without timezone shifting.
3. FEFO compares date consistently.

---

## 11. Decimal / Money Fields Strategy

### 11.1. Use Decimal, not Float

All money fields must use Prisma `Decimal`.

Examples:

1. `sellingPrice`.
2. `unitCost`.
3. `unitPrice`.
4. `lineTotal`.
5. `subtotalAmount`.
6. `discountAmount`.
7. `totalAmount`.
8. `amountDue`.
9. `amountTendered`.
10. `changeAmount`.

### 11.2. Recommended DB type

Use:

```prisma
Decimal @db.Decimal(12, 2)
```

or equivalent.

### 11.3. Rules

1. Do not use Float for money.
2. Do not calculate final amount only on frontend.
3. Backend recalculates totals.
4. Store price snapshots on order/invoice.
5. `sellingPrice > 0` for sellable Medicine.
6. Amounts must be non-negative.

---

## 12. UUID Strategy

### 12.1. Primary key strategy

Use UUID primary keys for MVP models.

Prisma style:

```prisma
id String @id @default(uuid()) @db.Uuid
```

### 12.2. Supabase user ID

`supabaseUserId` should map to Supabase Auth user ID.

Recommended:

```prisma
supabaseUserId String @unique @map("supabase_user_id") @db.Uuid
```

If Supabase ID arrives as string, backend can validate UUID.

### 12.3. External string IDs

Graph Sync `aggregateId` can be string to support different aggregate ID formats, but MVP source aggregate IDs are mostly UUID.

Recommended:

```prisma
aggregateId String @map("aggregate_id")
```

---

## 13. Soft Delete / Deactivation Strategy

### 13.1. Use `isActive`

Use `isActive` for active/deactivated business entities:

1. UserProfile.
2. Role.
3. Permission.
4. UserRole.
5. RolePermission.
6. Medicine.
7. ActiveIngredient.
8. MedicineIngredient.
9. Supplier.
10. MedicineBatch.
11. DrugInteraction.
12. PromptTemplate/SystemSetting if needed.

### 13.2. Deactivation metadata

For important entities, include:

1. `deactivatedAt`.
2. `deactivatedById`.

Optional:

1. `deactivationReason`.

### 13.3. Draft detail deletion

Hard delete may be acceptable for:

1. Draft `StockImportDetail`.
2. Draft `InventoryAdjustmentDetail`.
3. Draft `OrderItem`.

Not acceptable for:

1. Confirmed imports.
2. Confirmed adjustments.
3. PAID order data.
4. Payments.
5. Invoices.
6. InteractionAlerts.
7. AI Audit.
8. Audit Logs.
9. Graph Sync attempts.

---

## 14. Migration Ordering

### 14.1. Recommended migration sequence

#### Migration 001 — Base enums and identity

Create:

1. Enums.
2. `user_profiles`.
3. `roles`.
4. `permissions`.
5. `user_roles`.
6. `role_permissions`.
7. Partial indexes for active mappings.

#### Migration 002 — Medicine and supplier

Create:

1. `medicines`.
2. `active_ingredients`.
3. `medicine_ingredients`.
4. `suppliers`.
5. Relevant unique/index/check constraints.

#### Migration 003 — Inventory and stock import

Create:

1. `medicine_batches`.
2. `stock_imports`.
3. `stock_import_details`.
4. Stock import constraints/indexes.

Note: circular relation between `medicine_batches.source_stock_import_detail_id` and `stock_import_details.created_batch_id` may require careful ordering or nullable relation added after both tables exist.

#### Migration 004 — Inventory adjustment

Create:

1. `inventory_adjustments`.
2. `inventory_adjustment_details`.

#### Migration 005 — Orders and sales

Create:

1. `orders`.
2. `order_items`.

#### Migration 006 — Checkout/payment/invoice

Create:

1. `order_item_batch_allocations`.
2. `payments`.
3. `invoices`.
4. `invoice_items`.
5. Partial unique successful payment index.

#### Migration 007 — Interaction

Create:

1. `drug_interactions`.
2. `interaction_alerts`.
3. Partial unique active interaction/alert indexes.

#### Migration 008 — AI

Create:

1. `prompt_templates`.
2. `ai_provider_configs`.
3. `ai_audit_logs`.

#### Migration 009 — Graph Sync

Create:

1. `graph_sync_outbox`.
2. `graph_sync_attempts`.
3. `graph_projection_versions`.

#### Migration 010 — Settings / audit / idempotency

Create:

1. `system_settings`.
2. `audit_logs`.
3. `idempotency_records`.

#### Migration 011 — Seed baseline

Seed:

1. Roles.
2. Permissions.
3. Role-permission mapping.
4. System settings.
5. Official prompt templates.
6. AI provider config if DB-based.

#### Migration 012 — Demo seed support

Used only in local/demo seed scripts, not as schema migration unless required.

---

## 15. Migration Safety Rules

### 15.1. General rules

1. Never run destructive migration on demo/staging/production without review.
2. Never reset demo/staging/production DB using local reset script.
3. Always run `prisma validate` before migration.
4. Always review generated SQL before applying shared/demo migration.
5. Migration names must be meaningful.
6. Avoid editing already-applied migration files in shared branch.
7. Use new migration for changes after merge.
8. Keep migrations committed to Git.
9. Link migration PR to Jira issue.
10. Update Document 13/14 if schema changes alter baseline.

---

### 15.2. Destructive changes

Destructive changes include:

1. Dropping table.
2. Dropping column.
3. Changing enum in breaking way.
4. Changing data type.
5. Adding non-null column without default to non-empty table.
6. Removing unique/index used by business rule.
7. Removing FK.
8. Removing partial unique index.
9. Removing audit/idempotency fields.

Destructive changes require:

1. Project Leader approval.
2. Backup/export if shared/demo data.
3. Migration plan.
4. Rollback plan.
5. Test run.

---

### 15.3. Enum migration caution

PostgreSQL enum changes can be tricky.

Rules:

1. Do not remove enum values casually.
2. Do not rename enum values casually.
3. Add enum values only if approved by Decision Log.
4. Do not add `CRITICAL` severity into MVP unless scope changes.
5. Do not add `PENDING` payment status unless scope changes.

---

### 15.4. Raw SQL migration files

Raw SQL is required for:

1. Partial unique indexes.
2. Check constraints.
3. Possibly full-text indexes.
4. Possibly case-insensitive unique indexes.

Raw SQL migrations must be documented with comment blocks.

Example:

```sql
-- Enforces one successful payment per order.
-- Failed payment attempts can still be retained.
CREATE UNIQUE INDEX payments_one_success_per_order
ON payments(order_id)
WHERE status = 'SUCCESS';
```

---

## 16. Seed Dependency Order

### 16.1. Baseline seed order

Recommended seed order:

1. Roles.
2. Permissions.
3. RolePermissions.
4. Supabase demo users.
5. UserProfiles.
6. UserRoles.
7. SystemSettings.
8. PromptTemplates.
9. AIProviderConfigs if DB-based.
10. Medicines.
11. ActiveIngredients.
12. MedicineIngredients.
13. Suppliers.
14. StockImports.
15. StockImportDetails.
16. Confirm stock imports or create batches through controlled seed logic.
17. MedicineBatches.
18. InventoryAdjustments.
19. DrugInteractions.
20. Orders.
21. OrderItems.
22. InteractionAlerts.
23. Checkout data:

* OrderItemBatchAllocations.
* Payments.
* Invoices.
* InvoiceItems.

24. AIAuditLogs optional demo.
25. GraphSyncOutbox / Graph rebuild.
26. GraphProjectionVersions.
27. Smoke check records/logs if used.

---

### 16.2. Demo seed principles

Demo seed must:

1. Use curated operational data.
2. Not blindly import full scraped catalog.
3. Not use selling price = 0 for sellable Medicine.
4. Include near-expiry, normal, expired cases.
5. Include multi-batch FEFO scenario.
6. Include HIGH interaction scenario.
7. Include acknowledged/note InteractionAlert for pre-seeded PAID order.
8. Include DRAFT, PAID, CANCELLED orders.
9. Include failed payment attempt case.
10. Include graph projection rebuild.
11. Include report-ready data.

---

### 16.3. Seed implementation rule

Seed script should be idempotent where possible.

Recommended:

1. Use stable keys/codes for seed lookup.
2. Upsert roles/permissions/settings/prompts.
3. Reset local demo data only in local environment.
4. Avoid destructive reset outside local.
5. Verify counts and smoke checks after seed.

---

## 17. Prisma Validation

### 17.1. Required commands

Before commit/merge:

```bash
npx prisma validate
```

```bash
npx prisma format
```

Recommended:

```bash
npx prisma generate
```

```bash
npx prisma migrate dev --name <meaningful_name>
```

For CI migration check:

```bash
npx prisma migrate status
```

or equivalent safe migration validation.

### 17.2. CI quality gate

Minimum CI gate already defined includes:

1. Lint.
2. Type check.
3. Unit tests.
4. Integration tests.
5. Prisma validation.
6. Migration check.
7. Frontend build.
8. Backend build.

For Prisma specifically:

1. `prisma validate` must pass.
2. Generated client must compile.
3. Migration history must be consistent.
4. No schema drift in checked environment.

---

## 18. Local Migration vs Shared/Demo Migration Rules

### 18.1. Local development

Allowed:

1. `prisma migrate dev`.
2. Local reset.
3. Demo seed reset local only.
4. Experimental migrations before merge.

Not allowed:

1. Committing broken migration.
2. Editing shared migration after merge without coordination.
3. Running local reset against demo/staging/prod.

---

### 18.2. Shared/demo environment

Rules:

1. Migration must be reviewed.
2. Migration SQL must be understood.
3. No destructive migration without approval.
4. Demo data should be backed up or reproducible.
5. Demo reset must not run in demo/staging/prod.
6. Release/Demo Owner approves migration before release freeze.

---

### 18.3. Production-like environment

Production is not main MVP target, but if used:

1. No `migrate dev`.
2. Use deploy-safe migration command.
3. Use environment secrets.
4. Backup before migration.
5. Rollback plan required.
6. Monitor migration result.

---

## 19. MVP / Should-have / Future Models

### 19.1. MVP models

Required MVP models:

1. `UserProfile`
2. `Role`
3. `Permission`
4. `UserRole`
5. `RolePermission`
6. `Medicine`
7. `ActiveIngredient`
8. `MedicineIngredient`
9. `Supplier`
10. `MedicineBatch`
11. `StockImport`
12. `StockImportDetail`
13. `InventoryAdjustment`
14. `InventoryAdjustmentDetail`
15. `Order`
16. `OrderItem`
17. `OrderItemBatchAllocation`
18. `Payment`
19. `Invoice`
20. `InvoiceItem`
21. `DrugInteraction`
22. `InteractionAlert`
23. `PromptTemplate`
24. `AIAuditLog`
25. `GraphSyncOutbox`
26. `GraphSyncAttempt`
27. `GraphProjectionVersion`
28. `SystemSetting`
29. `AuditLog`
30. `IdempotencyRecord`

Optional MVP depending implementation:

1. `AIProviderConfig`

---

### 19.2. Should-have models

Should-have models:

1. `Customer`
2. `CustomerContact`
3. `Notification`
4. `GraphSyncAdminAction`
5. `ReportSnapshot`
6. `AIReportNarrative`
7. `ReorderSuggestion`

These should not block MVP.

---

### 19.3. Future / Commercial models

Future/commercial models include:

1. `Product`
2. `ProductVariant`
3. `Cart`
4. `CartItem`
5. `Wishlist`
6. `ShippingAddress`
7. `Shipment`
8. `Coupon`
9. `Promotion`
10. `ProductReview`
11. `CmsPage`
12. `Store`
13. `Warehouse`
14. `StockTransfer`
15. `PurchaseOrder`
16. `Return`
17. `Refund`
18. `CreditNote`
19. `PaymentGatewayTransaction`
20. `BankReconciliation`
21. `AICache`
22. `DrugGroup`
23. `Symptom`
24. `Condition`
25. `RedFlag`

These are not MVP implementation requirements.

---

## 20. Rejected Patterns

### 20.1. Password fields in Prisma

Rejected:

```prisma
password String
passwordHash String
```

Reason:

1. Supabase Auth is official.
2. PostgreSQL must not store credential.

---

### 20.2. Custom JWT user schema

Rejected:

```prisma
model User {
  username String
  passwordHash String
  jwtToken String
}
```

Reason:

1. Supabase Auth is official.
2. UserProfile must map Supabase user.

---

### 20.3. Aggregate Inventory source model

Rejected:

```prisma
model Inventory {
  medicineId String
  quantity Int
  expiryDate DateTime
}
```

as source of truth.

Reason:

1. MedicineBatch is source of truth.
2. Aggregate inventory breaks FEFO and batch traceability.

---

### 20.4. Medicine-level Interaction model

Rejected:

```prisma
model MedicineInteraction {
  medicineAId String
  medicineBId String
}
```

as official rule.

Reason:

1. Official rule is ActiveIngredient-level.
2. Medicine interaction is derived.

---

### 20.5. Payment 1:1 only

Rejected:

```prisma
model Payment {
  orderId String @unique
}
```

if it prevents failed attempts.

Correct:

1. Order has many payments.
2. Partial unique index enforces only one SUCCESS payment.

---

### 20.6. Direct invoice creation model flow

Rejected as official flow:

1. Invoice created without successful Payment.
2. Invoice created outside Checkout transaction.

Correct:

1. Invoice has unique `orderId`.
2. Invoice links successful payment.
3. Created inside Checkout.

---

### 20.7. Missing Graph Sync Outbox

Rejected.

Graph Sync Outbox is required for MVP.

---

### 20.8. Full 100-table commercial schema in MVP

Rejected.

Reason:

1. MVP implements core subset.
2. Commercial schema remains future expansion reference.
3. Full schema would overload API/UI/testing/demo.

---

## 21. Traceability to ERD / API / Testing

### 21.1. Prisma-to-ERD traceability

| Prisma Model                | ERD Table                      |
| --------------------------- | ------------------------------ |
| `UserProfile`               | `user_profiles`                |
| `Role`                      | `roles`                        |
| `Permission`                | `permissions`                  |
| `UserRole`                  | `user_roles`                   |
| `RolePermission`            | `role_permissions`             |
| `Medicine`                  | `medicines`                    |
| `ActiveIngredient`          | `active_ingredients`           |
| `MedicineIngredient`        | `medicine_ingredients`         |
| `Supplier`                  | `suppliers`                    |
| `MedicineBatch`             | `medicine_batches`             |
| `StockImport`               | `stock_imports`                |
| `StockImportDetail`         | `stock_import_details`         |
| `InventoryAdjustment`       | `inventory_adjustments`        |
| `InventoryAdjustmentDetail` | `inventory_adjustment_details` |
| `Order`                     | `orders`                       |
| `OrderItem`                 | `order_items`                  |
| `OrderItemBatchAllocation`  | `order_item_batch_allocations` |
| `Payment`                   | `payments`                     |
| `Invoice`                   | `invoices`                     |
| `InvoiceItem`               | `invoice_items`                |
| `DrugInteraction`           | `drug_interactions`            |
| `InteractionAlert`          | `interaction_alerts`           |
| `PromptTemplate`            | `prompt_templates`             |
| `AIProviderConfig`          | `ai_provider_configs`          |
| `AIAuditLog`                | `ai_audit_logs`                |
| `GraphSyncOutbox`           | `graph_sync_outbox`            |
| `GraphSyncAttempt`          | `graph_sync_attempts`          |
| `GraphProjectionVersion`    | `graph_projection_versions`    |
| `SystemSetting`             | `system_settings`              |
| `AuditLog`                  | `audit_logs`                   |
| `IdempotencyRecord`         | `idempotency_records`          |

---

### 21.2. Prisma-to-API traceability

| API Group                 | Prisma Models                                                                                               |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Auth/Profile APIs         | UserProfile, UserRole, Role, Permission                                                                     |
| User/Role/Permission APIs | UserProfile, Role, Permission, UserRole, RolePermission                                                     |
| Medicine APIs             | Medicine                                                                                                    |
| ActiveIngredient APIs     | ActiveIngredient                                                                                            |
| Mapping APIs              | MedicineIngredient                                                                                          |
| Supplier APIs             | Supplier                                                                                                    |
| Inventory APIs            | MedicineBatch                                                                                               |
| Stock Import APIs         | StockImport, StockImportDetail, MedicineBatch                                                               |
| Inventory Adjustment APIs | InventoryAdjustment, InventoryAdjustmentDetail, MedicineBatch                                               |
| Order/POS APIs            | Order, OrderItem                                                                                            |
| Checkout API              | Order, OrderItem, MedicineBatch, OrderItemBatchAllocation, Payment, Invoice, InvoiceItem, IdempotencyRecord |
| Payment Read APIs         | Payment                                                                                                     |
| Invoice APIs              | Invoice, InvoiceItem                                                                                        |
| Interaction APIs          | DrugInteraction, ActiveIngredient, MedicineIngredient                                                       |
| InteractionAlert APIs     | InteractionAlert                                                                                            |
| AI APIs                   | PromptTemplate, AIProviderConfig, AIAuditLog                                                                |
| Graph APIs                | GraphSyncOutbox, GraphSyncAttempt, GraphProjectionVersion                                                   |
| Reports APIs              | Order, OrderItem, Payment, Invoice, MedicineBatch, Allocation                                               |
| Settings APIs             | SystemSetting                                                                                               |
| Demo Reset                | All MVP seed-related models                                                                                 |

---

### 21.3. Prisma-to-Testing traceability

| Test Area            | Prisma/Migration Focus                             |
| -------------------- | -------------------------------------------------- |
| Auth/RBAC            | UserProfile, Role, Permission, mapping constraints |
| No password storage  | UserProfile model field inspection                 |
| Medicine validation  | sellingPrice check, active state                   |
| Ingredient mapping   | active unique mapping                              |
| Batch inventory      | MedicineBatch uniqueness and quantity checks       |
| Stock Import         | Confirm transaction, createdBatch relation         |
| Inventory Adjustment | no negative quantity service + check constraints   |
| POS Order            | Order status enum, ownership fields                |
| Checkout             | allocations, payment, invoice, idempotency         |
| Payment              | partial unique SUCCESS payment                     |
| Invoice              | unique order invoice                               |
| Interaction          | canonicalPairKey active unique                     |
| InteractionAlert     | active unique alert, ack/note fields               |
| AI Audit             | metadata fields, no raw PII                        |
| Graph Sync           | outbox status, attempts, projection version        |
| Settings             | near-expiry threshold seed                         |
| Demo Reset           | seed order and local-only guard                    |

---

## 22. Prisma Implementation Checklist

Before implementation is accepted:

| Checklist item                                       | Expected |
| ---------------------------------------------------- | -------- |
| Datasource provider is PostgreSQL                    | Yes      |
| No password/password_hash fields                     | Yes      |
| UserProfile maps Supabase user                       | Yes      |
| UUID primary keys used                               | Yes      |
| Decimal used for money                               | Yes      |
| MedicineBatch is inventory source of truth           | Yes      |
| No aggregate Inventory source model                  | Yes      |
| Batch uniqueness implemented                         | Yes      |
| Raw SQL partial unique indexes included              | Yes      |
| Payment supports failed attempts and one SUCCESS     | Yes      |
| Invoice unique per order                             | Yes      |
| ActiveIngredient-level DrugInteraction               | Yes      |
| InteractionAlert ack/note fields exist               | Yes      |
| AI Audit model exists                                | Yes      |
| Graph Sync Outbox exists                             | Yes      |
| IdempotencyRecord exists                             | Yes      |
| SystemSetting exists with near-expiry default        | Yes      |
| Migrations are ordered safely                        | Yes      |
| Seed order documented                                | Yes      |
| Full 100-table commercial schema not forced into MVP | Yes      |
| Prisma validate passes                               | Yes      |

---

## 23. Kết luận

Document 14 — Prisma Schema & Migration Design đã chuyển database design của **PharmaAssist AI Intelligence** thành kế hoạch triển khai Prisma schema và migration strategy.

Tài liệu này đã xác định:

1. Prisma design principles.
2. PostgreSQL datasource/provider.
3. Supabase Auth integration notes.
4. Model groups cho MVP.
5. Model design theo từng nhóm nghiệp vụ.
6. Enum definitions.
7. Relation definitions.
8. Unique constraints.
9. Index strategy.
10. Timestamp strategy.
11. Decimal/money fields strategy.
12. UUID strategy.
13. Soft delete/deactivation strategy.
14. Migration ordering.
15. Migration safety rules.
16. Seed dependency order.
17. Prisma validation requirements.
18. Local migration vs shared/demo migration rules.
19. MVP/Should-have/Future models.
20. Rejected patterns.
21. Traceability to ERD/API/Testing.
22. Prisma implementation checklist.

Các baseline quan trọng được giữ đúng:

1. Supabase Auth quản lý credentials.
2. Prisma/PostgreSQL không lưu password/password_hash.
3. PostgreSQL là source of truth.
4. Neo4j là projection.
5. MedicineBatch là inventory source of truth.
6. Không tạo aggregate Inventory source model.
7. Stock Import và Inventory Adjustment là workflow chính thức để thay đổi tồn kho.
8. Checkout là transaction boundary chính.
9. Checkout có idempotency.
10. FEFO allocation có traceability.
11. Payment có nhiều attempts nhưng chỉ một SUCCESS per order.
12. Invoice chỉ tạo sau successful payment.
13. DrugInteraction ở cấp ActiveIngredient–ActiveIngredient.
14. InteractionAlert persist và có ack/note cho HIGH.
15. AI Audit là MVP.
16. Graph Sync Outbox/Freshness là MVP.
17. Full 100-table commercial design không phải MVP schema.
18. Demo seed phải theo curated operational data.

Document 14 là input trực tiếp cho:

1. Backend Prisma schema implementation.
2. Migration files.
3. Seed scripts.
4. Demo reset workflow.
5. API service implementation.
6. Integration tests.
7. Document 18 — Data Seeding & Demo Data Guide.
8. Document 20 — Testing, Demo & Setup Guide.

Bước tiếp theo hợp lý là viết **Document 15 — UI/UX Screen Specification**, vì API, database và Prisma design đã đủ rõ để chuẩn hóa các màn hình, navigation, state, role-based visibility và UX flow.
