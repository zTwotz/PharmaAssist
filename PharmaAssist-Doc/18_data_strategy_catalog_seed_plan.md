# Document 18 — Data Strategy, Catalog Reference & MVP Seed Plan

# Tài liệu 18 — Chiến lược dữ liệu, dữ liệu catalog tham khảo & kế hoạch seed MVP

---

## Metadata

| Mục               | Nội dung                                                                                                                                                                                        |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID       | DOC-18                                                                                                                                                                                          |
| File name         | `18_data_strategy_catalog_seed_plan.md`                                                                                                                                                         |
| Document Name     | Data Strategy, Catalog Reference & MVP Seed Plan                                                                                                                                                |
| Tên tiếng Việt    | Chiến lược dữ liệu, dữ liệu catalog tham khảo và kế hoạch seed MVP                                                                                                                              |
| Project           | PharmaAssist AI Intelligence                                                                                                                                                                    |
| Version           | 1.0 Draft                                                                                                                                                                                       |
| Status            | Draft                                                                                                                                                                                           |
| Created Date      | 08/06/2026                                                                                                                                                                                      |
| Last Updated      | 08/06/2026                                                                                                                                                                                      |
| Owner             | Data Preparer / Backend Lead / Demo Owner                                                                                                                                                       |
| Reviewer          | Backend Developer, Tester, AI/Graph Developer, Project Leader                                                                                                                                   |
| Baseline Source   | Document 13 — Database Design & ERD, Document 14 — Prisma Schema & Migration Design, Document 16 — AI Architecture, Document 17 — Knowledge Graph & Graph-RAG, Document 20 — Testing/Demo/Setup |
| Related Documents | Document 13, Document 14, Document 16, Document 17, Document 20                                                                                                                                 |
| Database          | PostgreSQL                                                                                                                                                                                      |
| ORM               | Prisma                                                                                                                                                                                          |
| Auth Provider     | Supabase Auth                                                                                                                                                                                   |
| Graph Database    | Neo4j                                                                                                                                                                                           |
| Source of Truth   | PostgreSQL                                                                                                                                                                                      |
| Seed Type         | Curated operational seed for MVP                                                                                                                                                                |
| Catalog Data Role | Reference only                                                                                                                                                                                  |
| Language Rule     | Nội dung chính viết bằng tiếng Việt; tên bảng, entity, enum, API, công nghệ và thuật ngữ kỹ thuật giữ tiếng Anh khi cần                                                                         |

---

## 1. Mục đích tài liệu

Tài liệu **Data Strategy, Catalog Reference & MVP Seed Plan** xác định chiến lược dữ liệu chính thức cho dự án **PharmaAssist AI Intelligence**.

Tài liệu này mô tả:

1. Chiến lược dữ liệu tổng quan.
2. Vai trò của dữ liệu thật/catalog.
3. Vì sao catalog data không thể dùng trực tiếp làm operational seed.
4. Nguyên tắc tạo curated seed cho MVP.
5. Các nhóm seed data cần có.
6. Demo users và account strategy.
7. Roles/permissions seed.
8. Suppliers seed.
9. Medicines seed.
10. ActiveIngredients seed.
11. Medicine–ActiveIngredient mapping seed.
12. DrugInteraction rules seed.
13. MedicineBatch seed thông qua Stock Import.
14. Inventory Adjustment seed.
15. Orders/OrderItems seed.
16. Batch allocations seed.
17. Payments/Invoices seed.
18. InteractionAlerts seed.
19. Consultation note / Consultation evidence strategy.
20. PromptTemplates seed.
21. AI Audit Logs seed.
22. Graph Sync / Graph projection seed strategy.
23. Reports data seed.
24. Dynamic expiry date strategy.
25. FEFO demo scenario.
26. HIGH interaction demo scenario.
27. Failed payment scenario.
28. Draft/Cancelled/Paid order scenarios.
29. Demo reset workflow.
30. Local-only safeguard.
31. Smoke test data checks.
32. MVP/Should-have/Future data scope.
33. Data quality checklist.
34. Traceability sang ERD/Prisma/API/Testing.

Tài liệu này **không** viết full SRS, không viết full API spec, không viết full Prisma schema, không đưa toàn bộ scraped data làm official active ingredients, không seed `selling_price = 0`, không dùng real personal data và không dùng standalone Cypher seed làm official demo graph nếu baseline yêu cầu projection từ PostgreSQL.

---

## 2. Data Strategy Overview

### 2.1. Chiến lược dữ liệu chính thức

Dữ liệu của PharmaAssist AI Intelligence được chia thành 4 nhóm chính:

| Nhóm dữ liệu              | Vai trò                                                                |
| ------------------------- | ---------------------------------------------------------------------- |
| Catalog/reference data    | Dữ liệu thật/scraped/catalog dùng để tham khảo                         |
| Curated operational seed  | Dữ liệu chọn lọc, làm sạch, phục vụ MVP demo                           |
| Demo transaction data     | Dữ liệu nghiệp vụ có trạng thái: nhập kho, điều chỉnh, order, checkout |
| Projection/generated data | Graph projection, AI Audit, report data, smoke check data              |

### 2.2. Nguyên tắc quan trọng

1. PostgreSQL là source of truth.
2. Neo4j chỉ là graph projection.
3. Catalog data không tự động trở thành operational data.
4. MVP seed phải curated, nhỏ gọn, có chủ đích.
5. Seed phải phục vụ demo flows chính.
6. Seed phải phục vụ automated/manual tests.
7. Không dùng real personal data.
8. Không seed giá bán bằng 0 cho thuốc bán được.
9. Không dùng toàn bộ scraped ingredient strings làm ActiveIngredient chính thức.
10. Inventory demo state phải được dựng từ transaction chính thức, không insert aggregate inventory độc lập.
11. Graph demo data phải được projection từ PostgreSQL qua Graph Sync hoặc projection rebuild.
12. Demo reset chỉ được phép chạy local.

### 2.3. Mục tiêu của seed MVP

Curated seed phải chứng minh được:

1. Supabase Auth + internal UserProfile.
2. Multi-role RBAC.
3. Supplier Management.
4. Medicine Management.
5. ActiveIngredient Management.
6. Medicine–ActiveIngredient mapping.
7. MedicineBatch inventory.
8. Stock Import confirm.
9. Inventory Adjustment.
10. FEFO checkout.
11. Expired batch exclusion.
12. Low-stock/near-expiry calculation.
13. POS Draft Order.
14. ActiveIngredient-level DrugInteraction.
15. Persisted InteractionAlert.
16. HIGH alert acknowledgement.
17. HIGH alert consultation note.
18. Checkout transaction.
19. Payment success.
20. Failed payment attempt.
21. Invoice generation.
22. AI Copilot.
23. AI Guardrail/Audit.
24. Neo4j Graph Sync.
25. Graph-RAG with provenance/freshness.
26. Revenue/Top Medicines/Inventory reports.

---

## 3. Catalog / Reference Data Assessment

### 3.1. Catalog data files

Nhóm dữ liệu thật/catalog đã có các file tham khảo như:

1. `dosage_forms.csv`
2. `manufacturers.csv`
3. `medicine_ingredients.csv`
4. `medicine_units.csv`
5. `medicines.csv`
6. `product_categories.csv`
7. `product_documents.csv`
8. `product_images.csv`
9. `product_prices.csv`
10. `product_variants.csv`
11. `products.csv`
12. `active_ingredients.csv`
13. `brands.csv`
14. `category_closures.csv`
15. `countries.csv`
16. `product_links.raw.json`
17. `categories.raw.json`
18. `categories.md`
19. `completed_urls.json`

### 3.2. Giá trị của catalog data

Catalog/reference data có giá trị ở các điểm sau:

1. Cung cấp tên thuốc thật để UI/demo trông thực tế hơn.
2. Cung cấp đơn vị thuốc tham khảo.
3. Cung cấp dosage form tham khảo.
4. Cung cấp manufacturer/brand/category tham khảo.
5. Cung cấp product/category hierarchy để hiểu domain thương mại.
6. Cung cấp ảnh/tài liệu sản phẩm nếu cần demo UI future.
7. Cung cấp raw ingredient strings để hỗ trợ quá trình curate ActiveIngredient.
8. Cung cấp product/variant structure cho future e-commerce expansion.

### 3.3. Hạn chế của catalog data

Catalog data chưa đủ để làm operational seed vì:

1. Có thể là scraped/raw data, chưa được kiểm định.
2. Có thể có duplicate.
3. Có thể thiếu normalized fields.
4. Có thể thiếu batch number.
5. Có thể thiếu expiry date.
6. Có thể thiếu stock quantity.
7. Có thể thiếu supplier operational relationship.
8. Có thể thiếu transaction history.
9. Có thể thiếu order/payment/invoice data.
10. Có thể có price bằng 0 hoặc thiếu giá.
11. Có thể có ingredient strings chưa chuẩn.
12. Có thể có category không phải pharmacological taxonomy.
13. Không có InteractionAlert lifecycle.
14. Không có HIGH alert acknowledgement/note.
15. Không có graph sync state.
16. Không có AI audit metadata.
17. Không có demo reset reproducibility.

### 3.4. Catalog data assessment summary

| Data area              | Assessment                      | MVP decision                                            |
| ---------------------- | ------------------------------- | ------------------------------------------------------- |
| Medicines              | Hữu ích làm reference tên thuốc | Chọn lọc một số Medicine                                |
| Product variants       | Hữu ích cho future commerce     | Không dùng làm sales key MVP                            |
| Ingredients            | Cần curate                      | Không auto-import toàn bộ làm ActiveIngredient official |
| Prices                 | Cần kiểm tra                    | Không dùng price = 0                                    |
| Categories             | Hữu ích UI/future               | Không biến thành DrugGroup                              |
| Images/documents       | Hữu ích future UI               | Không bắt buộc MVP                                      |
| Manufacturers/brands   | Hữu ích reference               | Có thể bỏ qua MVP nếu không cần                         |
| Units/dosage forms     | Hữu ích normalize               | Có thể dùng seed đơn giản                               |
| Product links/raw JSON | Reference/source trace          | Không dùng runtime MVP                                  |

---

## 4. Real Data Usage Rules

### 4.1. Được phép dùng catalog data để

1. Chọn tên thuốc demo.
2. Chọn đơn vị thuốc demo.
3. Chọn dosage form demo.
4. Gợi ý ActiveIngredient để curate.
5. Tham khảo category/product hierarchy cho future.
6. Tham khảo manufacturer/brand.
7. Tạo seed có cảm giác thực tế hơn.

### 4.2. Không được dùng catalog data để

1. Tự động tạo toàn bộ Medicine MVP.
2. Tự động tạo toàn bộ ActiveIngredient official.
3. Tạo DrugInteraction Rule không được curate.
4. Tạo DrugGroup taxonomy từ product category.
5. Seed `selling_price = 0` cho thuốc bán được.
6. Seed stock trực tiếp như aggregate inventory.
7. Tạo batch không có batch number.
8. Tạo batch không có expiry date.
9. Tạo customer real personal data.
10. Tạo medical record thật.
11. Tạo graph bằng standalone Cypher làm official demo graph.
12. Bypass Stock Import/Inventory Adjustment/Checkout transactions.

### 4.3. Data sanitization rules

Trước khi đưa vào seed:

1. Normalize name.
2. Remove duplicates.
3. Validate price > 0.
4. Validate unit.
5. Validate active ingredient mapping.
6. Validate no real personal data.
7. Validate no unsafe medical claims.
8. Validate role/scope consistency.
9. Validate graph projection readiness.

---

## 5. Why Catalog Data Is Not Operational Seed

### 5.1. Catalog data là dữ liệu mô tả, không phải dữ liệu vận hành

Catalog data thường mô tả:

1. Product.
2. Variant.
3. Brand.
4. Category.
5. Image.
6. Document.
7. Price reference.
8. Ingredient text.

Operational data cần thêm:

1. Supplier.
2. Stock Import.
3. Batch number.
4. Expiry date.
5. Quantity.
6. Inventory Adjustment.
7. Order.
8. Payment.
9. Invoice.
10. Batch allocation.
11. InteractionAlert.
12. AI Audit.
13. Graph Sync state.

### 5.2. MVP cần dữ liệu có trạng thái

MVP demo cần thể hiện state transitions:

1. Stock Import DRAFT → CONFIRMED.
2. Inventory Adjustment DRAFT → CONFIRMED.
3. Order DRAFT → PAID.
4. Order DRAFT → CANCELLED.
5. Payment FAILED/SUCCESS.
6. InteractionAlert unresolved → acknowledged/noted.
7. Graph Sync PENDING → SUCCEEDED.
8. AI request → audited.

Catalog data không tự cung cấp các state này.

### 5.3. MVP cần dữ liệu có rule

Seed phải thể hiện rule:

1. FEFO.
2. Expired batch exclusion.
3. Low-stock from sellable quantity.
4. Near-expiry default 90 days.
5. ActiveIngredient-level interaction.
6. HIGH alert blocking checkout.
7. One successful payment.
8. Invoice after payment.
9. Graph projection freshness.
10. AI Audit and fallback.

Catalog data không tự đảm bảo các rule này.

---

## 6. Curated Seed Principles

### 6.1. Nguyên tắc curated seed

Curated seed phải:

1. Nhỏ gọn.
2. Dễ hiểu.
3. Có mục đích demo rõ.
4. Reproducible.
5. Có thể reset.
6. Không chứa dữ liệu cá nhân thật.
7. Không chứa dữ liệu y tế thật của khách.
8. Không gây hiểu nhầm medical advice.
9. Có dữ liệu cho happy path.
10. Có dữ liệu cho failure path.
11. Có dữ liệu cho reports.
12. Có dữ liệu cho AI/Graph.
13. Có dữ liệu cho authorization tests.

### 6.2. Quy mô seed đề xuất

Seed không nên quá lớn.

Recommended MVP seed size:

| Data type                  |          Recommended size |
| -------------------------- | ------------------------: |
| Demo users                 |                       4–5 |
| Roles                      |                         3 |
| Permissions                |               Theo matrix |
| Suppliers                  |                       3–5 |
| Medicines                  |                     10–20 |
| ActiveIngredients          |                     10–25 |
| Medicine mappings          |                     15–40 |
| DrugInteraction rules      |                      5–10 |
| Stock Imports              |                       3–5 |
| MedicineBatches            |                     15–30 |
| Inventory Adjustments      |                       2–4 |
| Orders                     |                      8–15 |
| Paid Orders                |                      5–10 |
| Draft Orders               |                       1–3 |
| Cancelled Orders           |                       1–2 |
| Failed payment cases       |                       1–3 |
| InteractionAlerts          |                       3–8 |
| AI Audit Logs              |             3–8 demo logs |
| Graph Sync outbox/attempts | Enough for smoke evidence |

### 6.3. Seed repeatability

Seed scripts should be deterministic.

Recommended:

1. Use stable seed keys.
2. Use predictable demo emails.
3. Generate dynamic expiry dates relative to reset date.
4. Use fixed order numbers pattern.
5. Use fixed invoice numbers pattern.
6. Use controlled random only with seed value if needed.
7. Ensure seed can be run multiple times in local after reset.

---

# 7. Seed Data Groups

---

## 7.1. Demo Users

### 7.1.1. Required demo accounts

MVP requires at least:

| Account        | Role      | Purpose                          | must_change_password |
| -------------- | --------- | -------------------------------- | -------------------: |
| Admin Demo     | Admin     | Full management/demo             |                false |
| Staff Demo     | Staff     | POS/checkout demo                |                false |
| Warehouse Demo | Warehouse | Inventory/stock demo             |                false |
| New Staff Demo | Staff     | First-login password-change demo |                 true |

Optional:

| Account            | Role              | Purpose                               |
| ------------------ | ----------------- | ------------------------------------- |
| Multi-role Demo    | Staff + Warehouse | Demonstrate multi-role RBAC if needed |
| Inactive User Demo | Staff             | Test inactive user denial             |

### 7.1.2. Demo email pattern

Recommended:

1. `admin@pharmaassist.demo`
2. `staff@pharmaassist.demo`
3. `warehouse@pharmaassist.demo`
4. `newstaff@pharmaassist.demo`
5. `inactive@pharmaassist.demo`

### 7.1.3. Supabase user provisioning

Demo users must be provisioned in Supabase Auth.

Seed process must:

1. Check if Supabase user exists.
2. Create if missing.
3. Set temporary password for demo if needed.
4. Create/update `user_profiles`.
5. Assign roles.
6. Set `must_change_password`.
7. Never store password/password_hash in PostgreSQL.

### 7.1.4. Demo password handling

For class demo, passwords may be documented in local `.env.example` or demo guide if allowed, but:

1. Do not store password in PostgreSQL.
2. Do not log passwords.
3. Do not commit real secrets.
4. Demo passwords are not production credentials.

---

## 7.2. Roles / Permissions

### 7.2.1. Roles

Seed official roles:

1. `admin`
2. `staff`
3. `warehouse`

### 7.2.2. Permissions

Seed permissions from Document 07.

Minimum permission modules:

1. Auth/Profile.
2. User/Role/Permission.
3. Medicine.
4. ActiveIngredient.
5. Supplier.
6. Inventory.
7. Stock Import.
8. Inventory Adjustment.
9. POS/Order.
10. Checkout.
11. Payment/Invoice read.
12. Interaction.
13. InteractionAlert.
14. AI.
15. Graph.
16. Reports.
17. Settings.
18. Audit.

### 7.2.3. Role-permission mapping summary

Admin:

1. All MVP permissions.
2. All reports.
3. User management.
4. Settings.
5. AI Audit.
6. Interaction Rule Management.
7. Graph-RAG/Graph Explorer.

Staff:

1. POS own.
2. Checkout own.
3. Orders own.
4. Interaction alerts own.
5. AI Copilot for own order/alert.
6. Invoice own.
7. Optional Graph-RAG read-only if permission granted.

Warehouse:

1. Supplier read/create/update.
2. Inventory summary.
3. Batch detail.
4. Stock Import.
5. Inventory Adjustment.
6. Inventory Report.
7. No POS/checkout/payment/invoice/interaction/AI sales/Graph-RAG in MVP.

---

## 7.3. Suppliers

### 7.3.1. Supplier seed purpose

Suppliers support:

1. Stock Import flow.
2. Warehouse demo.
3. Supplier Management screen.
4. Deactivate permission demo.

### 7.3.2. Recommended suppliers

Example curated suppliers:

| Supplier key   | Name                          | Purpose                    |
| -------------- | ----------------------------- | -------------------------- |
| `SUP_LOCAL_A`  | Công ty Dược phẩm An Tâm      | Main stock import          |
| `SUP_LOCAL_B`  | Nhà cung cấp Minh Long Pharma | Secondary supplier         |
| `SUP_LOCAL_C`  | Dược phẩm Sức Khỏe Việt       | Near-expiry batch scenario |
| `SUP_INACTIVE` | Nhà cung cấp Ngừng Hợp Tác    | Deactivation demo          |

### 7.3.3. Supplier constraints

1. Name required.
2. Active supplier used in new Stock Import.
3. Inactive supplier kept for history.
4. Warehouse cannot deactivate.
5. Admin can deactivate.

---

## 7.4. Medicines

### 7.4.1. Medicine seed purpose

Medicines must support:

1. POS search.
2. Inventory summary.
3. FEFO.
4. Low-stock.
5. Near-expiry.
6. Expired batch.
7. Interaction checking.
8. Reports.

### 7.4.2. Recommended medicine seed list

Example seed medicines:

| Medicine key          | Name              | Unit    | Selling price | Purpose                  |
| --------------------- | ----------------- | ------- | ------------: | ------------------------ |
| `MED_PARACETAMOL_500` | Paracetamol 500mg | tablet  |          1500 | Normal sale              |
| `MED_IBUPROFEN_200`   | Ibuprofen 200mg   | tablet  |          2500 | Interaction scenario     |
| `MED_WARFARIN_5`      | Warfarin 5mg      | tablet  |          5000 | HIGH interaction         |
| `MED_ASPIRIN_81`      | Aspirin 81mg      | tablet  |          2000 | HIGH interaction         |
| `MED_AMOXICILLIN_500` | Amoxicillin 500mg | capsule |          3500 | Normal antibiotic demo   |
| `MED_CETIRIZINE_10`   | Cetirizine 10mg   | tablet  |          1800 | Common medicine          |
| `MED_OMEPRAZOLE_20`   | Omeprazole 20mg   | capsule |          3000 | Normal sale/report       |
| `MED_METFORMIN_500`   | Metformin 500mg   | tablet  |          2200 | Report data              |
| `MED_LORATADINE_10`   | Loratadine 10mg   | tablet  |          2000 | Low-stock demo           |
| `MED_VITAMIN_C_500`   | Vitamin C 500mg   | tablet  |          1200 | High-volume sales report |

### 7.4.3. Medicine price rule

Every sellable Medicine must have:

```text
selling_price > 0
```

Do not seed:

```text
selling_price = 0
```

### 7.4.4. Medicine active rule

Seed should include:

1. Active medicines for sale.
2. Optional inactive medicine for UI/deactivation demo.

Inactive Medicine should not be addable to new Draft Order.

---

## 7.5. ActiveIngredients

### 7.5.1. ActiveIngredient seed purpose

ActiveIngredients support:

1. Official interaction rule level.
2. Medicine mapping.
3. Graph projection.
4. Graph-RAG.
5. AI explanation.

### 7.5.2. Recommended ActiveIngredients

| Key                 | Name          | Purpose             |
| ------------------- | ------------- | ------------------- |
| `ING_PARACETAMOL`   | Paracetamol   | Normal mapping      |
| `ING_IBUPROFEN`     | Ibuprofen     | Interaction mapping |
| `ING_WARFARIN`      | Warfarin      | HIGH interaction    |
| `ING_ASPIRIN`       | Aspirin       | HIGH interaction    |
| `ING_AMOXICILLIN`   | Amoxicillin   | Normal mapping      |
| `ING_CETIRIZINE`    | Cetirizine    | Normal mapping      |
| `ING_OMEPRAZOLE`    | Omeprazole    | Normal mapping      |
| `ING_METFORMIN`     | Metformin     | Report mapping      |
| `ING_LORATADINE`    | Loratadine    | Normal mapping      |
| `ING_ASCORBIC_ACID` | Ascorbic Acid | Vitamin C mapping   |

### 7.5.3. Curated rule

ActiveIngredients must be curated.

Do not import all raw `medicine_ingredients.csv` strings as official ActiveIngredients without review.

### 7.5.4. Normalization

Each ActiveIngredient should have:

1. `name`.
2. `normalized_name`.
3. optional description/source note.
4. active status.

---

## 7.6. Medicine–ActiveIngredient Mapping

### 7.6.1. Mapping seed purpose

Mapping connects Medicine to ActiveIngredient and supports:

1. Interaction checking.
2. Graph `CONTAINS`.
3. Graph-RAG explanation.
4. AI context.

### 7.6.2. Recommended mapping

| Medicine          | ActiveIngredient |
| ----------------- | ---------------- |
| Paracetamol 500mg | Paracetamol      |
| Ibuprofen 200mg   | Ibuprofen        |
| Warfarin 5mg      | Warfarin         |
| Aspirin 81mg      | Aspirin          |
| Amoxicillin 500mg | Amoxicillin      |
| Cetirizine 10mg   | Cetirizine       |
| Omeprazole 20mg   | Omeprazole       |
| Metformin 500mg   | Metformin        |
| Loratadine 10mg   | Loratadine       |
| Vitamin C 500mg   | Ascorbic Acid    |

### 7.6.3. Mapping requirements

1. No duplicate active mapping.
2. Mapping updates create Graph Sync outbox event.
3. Mapping must be active for interaction check.
4. Mapping must be available before DrugInteraction demo.

---

## 7.7. DrugInteraction Rules

### 7.7.1. Purpose

DrugInteraction rules support:

1. Interaction checking.
2. HIGH alert demo.
3. InteractionAlert persistence.
4. AI explanation.
5. Graph `INTERACTS_WITH`.

### 7.7.2. Recommended rules

Example curated interaction rules:

| Rule key                      | Ingredient A | Ingredient B | Severity | Purpose              |
| ----------------------------- | ------------ | ------------ | -------- | -------------------- |
| `INT_WARFARIN_ASPIRIN_HIGH`   | Warfarin     | Aspirin      | HIGH     | Main HIGH demo       |
| `INT_WARFARIN_IBUPROFEN_HIGH` | Warfarin     | Ibuprofen    | HIGH     | Alternate HIGH demo  |
| `INT_ASPIRIN_IBUPROFEN_MED`   | Aspirin      | Ibuprofen    | MEDIUM   | Non-blocking alert   |
| `INT_IBUPROFEN_METFORMIN_LOW` | Ibuprofen    | Metformin    | LOW      | Low severity example |
| `INT_OMEPRAZOLE_WARFARIN_MED` | Omeprazole   | Warfarin     | MEDIUM   | Graph/report variety |

### 7.7.3. Rule requirements

1. Rules are ActiveIngredient–ActiveIngredient.
2. No Medicine–Medicine official rule.
3. Severity values only LOW/MEDIUM/HIGH.
4. CRITICAL is outside MVP.
5. A–B and B–A duplicate prevented by canonical pair.
6. Rule changes create Graph Sync outbox event.

### 7.7.4. HIGH rule text style

HIGH rule description should be safe and non-prescriptive.

Example description:

```text
Có cảnh báo tương tác mức HIGH giữa hai hoạt chất này. Nhân viên cần xác nhận đã đọc cảnh báo và ghi chú tư vấn trước khi tiếp tục checkout.
```

Example recommendation:

```text
Thông báo cho khách về cảnh báo, khuyến nghị khách tham khảo dược sĩ/bác sĩ nếu cần, và ghi nhận consultation note trước khi thanh toán.
```

---

## 7.8. MedicineBatch

### 7.8.1. Batch seed purpose

MedicineBatch supports:

1. Inventory source of truth.
2. FEFO.
3. Expired exclusion.
4. Near-expiry.
5. Low-stock.
6. Batch detail.
7. Checkout allocation.
8. Inventory reports.

### 7.8.2. Important seed rule

MedicineBatch should be created through confirmed Stock Import seed logic.

Do not create aggregate inventory as source of truth.

### 7.8.3. Required batch fields

Every batch needs:

1. Medicine.
2. Batch number.
3. Normalized batch number.
4. Expiry date.
5. Quantity received.
6. Quantity remaining.
7. Source Stock Import Detail if possible.

### 7.8.4. Batch demo categories

Seed should include:

| Category                  | Purpose                         |
| ------------------------- | ------------------------------- |
| Normal batch              | Regular selling                 |
| Near-expiry batch         | Near-expiry dashboard/report    |
| Expired batch             | Excluded from sellable quantity |
| Multi-batch same medicine | FEFO demo                       |
| Low-stock medicine batch  | Low-stock report                |
| Batch after adjustment    | Inventory Adjustment demo       |

---

## 7.9. Stock Import

### 7.9.1. Purpose

Stock Import seed demonstrates:

1. Supplier usage.
2. Batch creation.
3. Batch merge rule.
4. Confirmed import.
5. Inventory generated from transactions.

### 7.9.2. Recommended Stock Imports

| Import key                  | Status    | Purpose                          |
| --------------------------- | --------- | -------------------------------- |
| `STI_INITIAL_CONFIRMED`     | CONFIRMED | Create initial normal inventory  |
| `STI_FEFO_CONFIRMED`        | CONFIRMED | Create multiple batches for FEFO |
| `STI_NEAR_EXPIRY_CONFIRMED` | CONFIRMED | Near-expiry demo                 |
| `STI_EXPIRED_CONFIRMED`     | CONFIRMED | Expired batch demo               |
| `STI_DRAFT_DEMO`            | DRAFT     | UI draft flow demo               |

### 7.9.3. Import detail requirements

Each detail must have:

1. Medicine.
2. Batch number.
3. Expiry date.
4. Quantity > 0.
5. Optional unit cost.

### 7.9.4. Expiry mismatch demo

Optional negative test data:

1. Existing batch: `BATCH-FEFO-A`, expiry `resetDate + 60 days`.
2. Draft import line attempts same medicine/batch number with expiry `resetDate + 180 days`.
3. Confirm should reject.

This should be used for testing, not necessarily pre-confirmed seed.

---

## 7.10. Inventory Adjustment

### 7.10.1. Purpose

Inventory Adjustment seed demonstrates:

1. Warehouse adjustment workflow.
2. Required reason.
3. Batch quantity change.
4. Auditability.
5. No direct quantity edit.

### 7.10.2. Recommended adjustments

| Adjustment key              | Status          | Purpose                                             |
| --------------------------- | --------------- | --------------------------------------------------- |
| `ADJ_STOCK_COUNT_CONFIRMED` | CONFIRMED       | Reduce quantity after physical count                |
| `ADJ_DAMAGE_CONFIRMED`      | CONFIRMED       | Reduce damaged/unsellable items                     |
| `ADJ_DRAFT_DEMO`            | DRAFT           | UI draft demo                                       |
| `ADJ_NEGATIVE_TEST`         | DRAFT/test only | Confirm should fail because after quantity negative |

### 7.10.3. Required fields

1. Reason.
2. Batch.
3. Quantity change.
4. Before quantity.
5. After quantity after confirm.
6. Created/confirmed actor.

---

## 7.11. Orders

### 7.11.1. Purpose

Order seed supports:

1. POS history.
2. Checkout demo.
3. Reports.
4. Staff ownership.
5. Admin all-order view.
6. InteractionAlert scenarios.
7. Payment/invoice scenarios.

### 7.11.2. Required order statuses

MVP order statuses:

1. DRAFT.
2. PAID.
3. CANCELLED.

Seed should include all three.

### 7.11.3. Recommended order scenarios

| Order key                   | Status                    | Purpose                             |
| --------------------------- | ------------------------- | ----------------------------------- |
| `ORD_PAID_NORMAL_01`        | PAID                      | Revenue report                      |
| `ORD_PAID_NORMAL_02`        | PAID                      | Top medicines                       |
| `ORD_PAID_FEFO`             | PAID                      | FEFO batch allocation               |
| `ORD_PAID_HIGH_ALERT`       | PAID                      | Historical HIGH alert with ack/note |
| `ORD_DRAFT_POS_DEMO`        | DRAFT                     | POS continuation demo               |
| `ORD_DRAFT_HIGH_UNRESOLVED` | DRAFT                     | Checkout blocked demo               |
| `ORD_CANCELLED_01`          | CANCELLED                 | Exclusion from reports              |
| `ORD_PAYMENT_FAILED_RETRY`  | DRAFT or PAID after retry | Failed payment demo                 |

### 7.11.4. Staff ownership

At least one order must be owned by Staff Demo.

Optional:

1. Another order owned by Admin.
2. Another order owned by different Staff for ownership denial test.

---

## 7.12. Order Items

### 7.12.1. Purpose

Order items support:

1. Order totals.
2. Interaction checking.
3. FEFO allocation.
4. Reports.
5. Invoice items.

### 7.12.2. Requirements

Each OrderItem has:

1. Order.
2. Medicine.
3. Quantity > 0.
4. Unit price snapshot > 0.
5. Line total.

### 7.12.3. Interaction order item scenario

HIGH alert scenario order should include:

1. Warfarin 5mg.
2. Aspirin 81mg.

or:

1. Warfarin 5mg.
2. Ibuprofen 200mg.

### 7.12.4. FEFO order item scenario

FEFO order should include a medicine with at least:

1. Batch 1: near expiry, sellable.
2. Batch 2: later expiry, sellable.
3. Batch 3: expired, excluded.

Order quantity should require allocation from more than one sellable batch.

---

## 7.13. Batch Allocations

### 7.13.1. Purpose

Batch allocations demonstrate:

1. FEFO.
2. Batch sales traceability.
3. Inventory deduction.
4. Order Detail allocation display.

### 7.13.2. Required allocation scenario

For one medicine, seed:

| Batch         | Expiry               | Quantity remaining before checkout | Role             |
| ------------- | -------------------- | ---------------------------------: | ---------------- |
| Expired batch | resetDate - 10 days  |                                 20 | Must be excluded |
| FEFO batch A  | resetDate + 30 days  |                                  5 | Allocated first  |
| FEFO batch B  | resetDate + 180 days |                                 20 | Allocated second |

Order quantity:

```text
8 units
```

Expected allocation:

1. 5 units from FEFO batch A.
2. 3 units from FEFO batch B.
3. 0 from expired batch.

### 7.13.3. Allocation requirements

Each allocation has:

1. Order.
2. OrderItem.
3. MedicineBatch.
4. Quantity allocated.
5. Batch number snapshot.
6. Expiry date snapshot.
7. Created by checkout actor.

---

## 7.14. Payments

### 7.14.1. Purpose

Payment seed supports:

1. Successful cash payment.
2. Successful simulated bank transfer.
3. Failed payment attempt.
4. One-successful-payment rule.
5. Reports.

### 7.14.2. Payment scenarios

| Payment key            | Status  | Method                           | Purpose                      |
| ---------------------- | ------- | -------------------------------- | ---------------------------- |
| `PAY_CASH_SUCCESS_01`  | SUCCESS | CASH                             | Normal checkout              |
| `PAY_BANK_SUCCESS_01`  | SUCCESS | BANK_TRANSFER_SIMULATION         | Bank reference demo          |
| `PAY_FAILED_01`        | FAILED  | CASH or BANK_TRANSFER_SIMULATION | Failed payment retention     |
| `PAY_RETRY_SUCCESS_01` | SUCCESS | CASH                             | Retry after failure scenario |

### 7.14.3. Cash payment rule

Cash payment must have:

1. `amount_due`.
2. `amount_tendered >= amount_due`.
3. `change_amount = amount_tendered - amount_due`.

### 7.14.4. Bank transfer simulation rule

Bank transfer simulation must have:

1. `transaction_reference`.
2. No real bank integration.
3. No PENDING transfer status in MVP.

### 7.14.5. Failed attempt rule

Failed attempts may be retained.

Only one SUCCESS payment per order.

---

## 7.15. Invoices

### 7.15.1. Purpose

Invoices support:

1. Checkout success.
2. Order Detail.
3. Invoice View.
4. Reports.
5. Payment traceability.

### 7.15.2. Invoice requirements

Each PAID order should have:

1. One invoice.
2. Invoice number.
3. Order ID.
4. Payment ID.
5. Issued at.
6. Issued by.
7. Total snapshot.
8. Invoice items.

### 7.15.3. Invoice item requirements

Invoice items must snapshot:

1. Medicine name.
2. Unit.
3. Quantity.
4. Unit price.
5. Line total.

### 7.15.4. Invalid seed states to avoid

Do not seed:

1. Invoice without successful payment.
2. PAID order without invoice.
3. Invoice for DRAFT order.
4. Invoice for CANCELLED order.
5. Multiple invoices for one order.

---

## 7.16. InteractionAlerts

### 7.16.1. Purpose

InteractionAlerts support:

1. Alert persistence.
2. HIGH alert blocking.
3. Acknowledgement.
4. Consultation note.
5. Alert history.
6. AI Copilot.
7. Checkout validation.

### 7.16.2. Required alert scenarios

| Alert key                   | Severity    | Status                           | Purpose                    |
| --------------------------- | ----------- | -------------------------------- | -------------------------- |
| `ALT_HIGH_UNRESOLVED`       | HIGH        | active unresolved                | Checkout blocked demo      |
| `ALT_HIGH_RESOLVED_PAID`    | HIGH        | active/resolved at checkout time | Historical paid order demo |
| `ALT_MEDIUM_VIEW_ONLY`      | MEDIUM      | active                           | Non-blocking alert         |
| `ALT_LOW_VIEW_ONLY`         | LOW         | active                           | Non-blocking alert         |
| `ALT_INACTIVE_REMOVED_ITEM` | HIGH/MEDIUM | inactive                         | History/lifecycle demo     |

### 7.16.3. HIGH unresolved alert

Should have:

1. `severity = HIGH`.
2. `acknowledged_at = null`.
3. `consultation_note = null`.
4. Active order is DRAFT.
5. Checkout should be blocked.

### 7.16.4. HIGH resolved alert

Should have:

1. `severity = HIGH`.
2. `acknowledged_by`.
3. `acknowledged_at`.
4. `consultation_note`.
5. `consultation_note_by`.
6. `consultation_note_at`.
7. Associated PAID order.
8. Payment.
9. Invoice.
10. Batch allocations.

### 7.16.5. Alert snapshot

InteractionAlert should store:

1. Description snapshot.
2. Recommendation snapshot.
3. Severity snapshot.
4. Ingredient IDs.
5. Display count.
6. First/last displayed time.

---

## 7.17. ConsultationSessions / Consultation Evidence

### 7.17.1. Baseline rule

MVP does **not** require a separate `DraftNote` entity.

Authoritative consultation note for HIGH alert is stored on:

```text
interaction_alerts.consultation_note
```

### 7.17.2. ConsultationSessions interpretation

If the term `ConsultationSessions` appears in seed planning, interpret it as:

1. Consultation evidence attached to InteractionAlert, or
2. Future/Should-have richer consultation session model.

For MVP, seed consultation evidence through:

1. `interaction_alerts.acknowledged_by`.
2. `interaction_alerts.acknowledged_at`.
3. `interaction_alerts.consultation_note`.
4. `interaction_alerts.consultation_note_by`.
5. `interaction_alerts.consultation_note_at`.
6. Optional `ai_audit_logs` for AI-generated draft.

### 7.17.3. Future ConsultationSession

A separate `consultation_sessions` table is Future/Should-have unless explicitly approved.

If added later, it must not replace the per-HIGH-alert authoritative note rule.

---

## 7.18. PromptTemplates

### 7.18.1. Purpose

PromptTemplates seed supports:

1. AI Copilot.
2. Prompt versioning.
3. AI Audit.
4. Guardrail behavior.
5. Demo stability.

### 7.18.2. Required prompt templates

Seed approved prompt templates:

| Key                        | Version | Status   | Purpose                  |
| -------------------------- | ------: | -------- | ------------------------ |
| `interaction_explanation`  |       1 | APPROVED | Explain InteractionAlert |
| `consultation_note_draft`  |       1 | APPROVED | Generate note draft      |
| `safe_follow_up_questions` |       1 | APPROVED | Generate safe questions  |
| `graph_rag_answer`         |       1 | APPROVED | Explain graph context    |
| `safe_refusal`             |       1 | APPROVED | Optional refusal helper  |

### 7.18.3. Prompt rules

1. Prompt version must be recorded in AI Audit.
2. Prompt text must include no diagnosis/prescribing/dosage rule.
3. Prompt text must require safe disclaimer.
4. Prompt text must require structured output if implemented.
5. Prompt editing UI is Should-have.

---

## 7.19. AI Audit Logs

### 7.19.1. Purpose

Seed AI Audit Logs support:

1. Admin AI Audit Log UI.
2. Safety demonstration.
3. Provider/fallback demonstration.
4. Guardrail demonstration.

### 7.19.2. Recommended AI Audit seed

| Audit key                   | Action                   | Provider       | Purpose                |
| --------------------------- | ------------------------ | -------------- | ---------------------- |
| `AI_AUD_EXPLAIN_SUCCESS`    | INTERACTION_EXPLANATION  | GOOGLE_AI      | Normal success         |
| `AI_AUD_NOTE_DRAFT_SUCCESS` | CONSULTATION_NOTE_DRAFT  | GOOGLE_AI      | Draft note             |
| `AI_AUD_FALLBACK_MOCK`      | INTERACTION_EXPLANATION  | MOCK_AI        | Fallback demo          |
| `AI_AUD_GUARDRAIL_BLOCK`    | GUARDRAIL_REFUSAL        | NONE           | Safe refusal demo      |
| `AI_AUD_GRAPH_FALLBACK`     | GRAPH_RAG_ANSWER if used | GOOGLE_AI/MOCK | Graph fallback context |

### 7.19.3. AI Audit data constraints

Do not seed:

1. Raw PII.
2. Full sensitive prompt.
3. Full real customer context.
4. API keys.
5. Unsafe raw output.

Seed only:

1. Minimized request summary.
2. Minimized response summary.
3. Provider metadata.
4. Guardrail statuses.
5. Prompt version.
6. Related order/alert IDs.

---

## 7.20. Graph Sync Outbox / Logs

### 7.20.1. Purpose

Graph Sync seed supports:

1. Graph projection.
2. Graph freshness.
3. Graph-RAG.
4. Graph Sync failure/retry demo if needed.
5. Smoke tests.

### 7.20.2. Official graph seed rule

Official demo graph must be created by:

1. PostgreSQL source seed.
2. Graph Sync Worker processing outbox, or
3. Projection rebuild from PostgreSQL.

Do not use standalone Cypher seed as official graph source.

Standalone Cypher may be used only for:

1. local development experiments.
2. isolated graph tests.
3. not official demo baseline.

### 7.20.3. Graph Sync data

Seed or generate:

1. Outbox events for Medicine.
2. Outbox events for ActiveIngredient.
3. Outbox events for MedicineIngredient mapping.
4. Outbox events for DrugInteraction rules.
5. GraphSyncAttempt success logs.
6. GraphProjectionVersion records.

### 7.20.4. Graph freshness

After demo reset:

1. Graph must be rebuilt or sync worker must process outbox.
2. Freshness check must return FRESH.
3. Graph-RAG query must return provenance.
4. If graph unavailable, PostgreSQL fallback should still work for interaction explanation.

---

## 7.21. Reports Data

### 7.21.1. Purpose

Reports seed supports:

1. Revenue Report.
2. Top Medicines Report.
3. Inventory Report.

### 7.21.2. Report-ready orders

Seed should include at least:

```text
5–10 PAID orders across multiple dates
```

Also include:

1. DRAFT orders.
2. CANCELLED orders.
3. FAILED payment attempts.

Reports must exclude:

1. DRAFT orders.
2. CANCELLED orders.
3. FAILED payment-only orders.

### 7.21.3. Revenue report data

Seed paid orders across multiple dates:

| Date relative to reset | Purpose        |
| ---------------------- | -------------- |
| resetDate - 7 days     | Old revenue    |
| resetDate - 3 days     | Mid revenue    |
| resetDate - 1 day      | Recent revenue |
| resetDate              | Today revenue  |

### 7.21.4. Top medicines data

Create repeated sales for:

1. Vitamin C 500mg.
2. Paracetamol 500mg.
3. Cetirizine 10mg.
4. Omeprazole 20mg.

Top Medicines report should have clear ranking.

### 7.21.5. Inventory report data

Inventory report should show:

1. Low-stock medicine.
2. Near-expiry medicine.
3. Expired quantity.
4. Normal stock.
5. Sellable quantity.

---

# 8. Demo Account Strategy

## 8.1. Account goals

Demo accounts must support:

1. Admin full demo.
2. Staff POS/checkout demo.
3. Warehouse inventory demo.
4. First-login password change demo.
5. Authorization denial demo if needed.

## 8.2. Primary accounts

| Demo account   | Role      | Main demo use                                             |
| -------------- | --------- | --------------------------------------------------------- |
| Admin Demo     | Admin     | User, Medicine, Rules, Reports, Settings, AI Audit, Graph |
| Staff Demo     | Staff     | POS, HIGH alert, AI note draft, checkout                  |
| Warehouse Demo | Warehouse | Supplier, Inventory, Stock Import, Adjustment             |
| New Staff Demo | Staff     | First-login password-change flow                          |

## 8.3. must_change_password rule

Seed rule:

1. Primary demo accounts: `must_change_password = false`.
2. New Staff demo account: `must_change_password = true`.

Reason:

1. Main demo should be fast.
2. First-login flow remains demonstrable.

## 8.4. Ownership data

Staff Demo should own:

1. At least one Draft Order.
2. At least one PAID Order.
3. At least one HIGH unresolved alert order.
4. At least one invoice.

Admin should be able to view all.

Warehouse should not see Staff sales data.

---

# 9. Dynamic Expiry Date Strategy

## 9.1. Purpose

Expiry dates must remain meaningful regardless of when demo reset is run.

Use dynamic dates relative to:

```text
DEMO_RESET_DATE
```

or current local date during reset.

## 9.2. Expiry categories

| Category    | Formula              | Purpose                      |
| ----------- | -------------------- | ---------------------------- |
| Expired     | resetDate - 10 days  | Excluded from sellable stock |
| Near-expiry | resetDate + 30 days  | Within default 90 days       |
| Normal      | resetDate + 180 days | Sellable normal              |
| Long expiry | resetDate + 365 days | Stable stock                 |

## 9.3. Near-expiry threshold

Default system setting:

```text
near_expiry_threshold_days = 90
```

Near-expiry batch should have expiry within:

```text
resetDate + 1 to 90 days
```

## 9.4. Dynamic date examples

Assuming reset date = `2026-06-08`:

| Batch type  | Expiry date |
| ----------- | ----------- |
| Expired     | 2026-05-29  |
| Near-expiry | 2026-07-08  |
| Normal      | 2026-12-05  |
| Long expiry | 2027-06-08  |

If reset runs later, dates shift automatically.

---

# 10. FEFO Demo Scenario

## 10.1. Purpose

FEFO scenario demonstrates:

1. MedicineBatch is inventory source of truth.
2. Expired batch excluded.
3. Checkout allocates nearest expiry first.
4. Allocation can span multiple batches.
5. Order Detail shows allocation evidence.

## 10.2. Medicine for FEFO demo

Recommended:

```text
Paracetamol 500mg
```

or another common medicine.

## 10.3. Batch setup

| Batch key          | Batch number | Expiry               | Quantity before checkout | Expected         |
| ------------------ | ------------ | -------------------- | -----------------------: | ---------------- |
| `BAT_PARA_EXPIRED` | PARA-EXP     | resetDate - 10 days  |                       20 | Excluded         |
| `BAT_PARA_NEAR`    | PARA-FEFO-01 | resetDate + 30 days  |                        5 | Allocated first  |
| `BAT_PARA_NORMAL`  | PARA-FEFO-02 | resetDate + 180 days |                       20 | Allocated second |

## 10.4. Order setup

Order:

```text
ORD_PAID_FEFO
```

Order item:

```text
Paracetamol 500mg quantity = 8
```

Expected allocation:

1. 5 units from `PARA-FEFO-01`.
2. 3 units from `PARA-FEFO-02`.
3. 0 units from `PARA-EXP`.

## 10.5. Demo validation

After checkout:

1. Order status = PAID.
2. Payment SUCCESS exists.
3. Invoice exists.
4. Allocation records exist.
5. Batch remaining updated:

   * `PARA-FEFO-01`: 0.
   * `PARA-FEFO-02`: 17.
   * `PARA-EXP`: unchanged.
6. Inventory Summary sellable excludes expired batch.

---

# 11. HIGH Interaction Demo Scenario

## 11.1. Purpose

HIGH interaction scenario demonstrates:

1. ActiveIngredient-level interaction rule.
2. InteractionAlert persistence.
3. HIGH alert blocks checkout.
4. Acknowledgement required.
5. Consultation note required.
6. AI note draft is not official until confirmed.
7. Checkout succeeds after resolution.

## 11.2. Recommended medicines

Use:

1. Warfarin 5mg.
2. Aspirin 81mg.

ActiveIngredients:

1. Warfarin.
2. Aspirin.

DrugInteraction:

```text
Warfarin ↔ Aspirin = HIGH
```

## 11.3. Draft unresolved HIGH order

Create:

```text
ORD_DRAFT_HIGH_UNRESOLVED
```

Items:

1. Warfarin 5mg quantity 1.
2. Aspirin 81mg quantity 1.

InteractionAlert:

1. Severity HIGH.
2. Active true.
3. Display count >= 1.
4. No acknowledgement.
5. No consultation note.

Expected:

1. POS shows HIGH alert.
2. Checkout blocked.
3. AI explanation available.
4. AI note draft available.
5. Staff must confirm note.

## 11.4. Paid resolved HIGH order

Create:

```text
ORD_PAID_HIGH_ALERT
```

Items:

1. Warfarin 5mg.
2. Aspirin 81mg.

InteractionAlert:

1. Severity HIGH.
2. Acknowledged by Staff Demo.
3. Consultation note saved.
4. Payment SUCCESS.
5. Invoice exists.
6. Batch allocations exist.

Purpose:

1. Admin InteractionAlert History demo.
2. Order Detail demo.
3. AI Audit demo.
4. Reports include paid order.

## 11.5. HIGH alert consultation note example

Safe note example:

```text
Đã phát hiện cảnh báo tương tác mức HIGH giữa các hoạt chất trong đơn. Nhân viên đã thông báo cảnh báo cho khách và khuyến nghị khách tham khảo dược sĩ/bác sĩ nếu cần trước khi tiếp tục mua thuốc.
```

This note is safe because it does not diagnose, prescribe or give dosage.

---

# 12. Failed Payment Scenario

## 12.1. Purpose

Failed payment scenario demonstrates:

1. Failed attempts retained.
2. One successful payment per order.
3. Checkout failure does not create inconsistent invoice.
4. Draft order preserved when needed.

## 12.2. Scenario A — Failed only

Order:

```text
ORD_PAYMENT_FAILED_ONLY
```

Status:

```text
DRAFT
```

Payment:

1. FAILED attempt.
2. No invoice.
3. Order still DRAFT.

Purpose:

1. Payment failure recovery.
2. Reports exclude failed attempt.

## 12.3. Scenario B — Failed then success

Order:

```text
ORD_PAYMENT_FAILED_RETRY
```

Flow:

1. First payment attempt FAILED.
2. Second payment attempt SUCCESS.
3. Order PAID.
4. Invoice created.
5. Reports include only successful paid result.

## 12.4. Invalid states to avoid

Do not seed:

1. Invoice for failed payment.
2. PAID order with only failed payment.
3. Two SUCCESS payments for one order.
4. Payment SUCCESS but order still DRAFT.

---

# 13. Cancelled / Draft / Paid Order Scenarios

## 13.1. DRAFT order scenario

Purpose:

1. Continue POS demo.
2. Staff ownership test.
3. Checkout path.

DRAFT order should have:

1. Items.
2. Active status DRAFT.
3. No payment success.
4. No invoice.
5. Optional unresolved HIGH alert.

## 13.2. CANCELLED order scenario

Purpose:

1. Order history status.
2. Reports exclusion.
3. PAID cannot be cancelled rule contrast.

Cancelled order should have:

1. Status CANCELLED.
2. Cancelled by.
3. Cancelled at.
4. Cancel reason.
5. No payment success.
6. No invoice.

## 13.3. PAID order scenario

Purpose:

1. Order Detail.
2. Invoice View.
3. Reports.
4. Batch allocation.
5. Payment success.

Paid order should have:

1. Status PAID.
2. Payment SUCCESS.
3. Invoice.
4. Invoice items.
5. Batch allocations.
6. Paid at.
7. Processed by.

## 13.4. Required scenario mix

Minimum recommended:

| Status                 | Count |
| ---------------------- | ----: |
| PAID                   |  5–10 |
| DRAFT                  |   1–3 |
| CANCELLED              |   1–2 |
| Failed payment attempt |   1–3 |

---

# 14. Report-ready Sales Scenarios

## 14.1. Revenue report scenario

Seed paid orders over multiple dates.

Example:

| Order                   | Date          |  Total | Included in revenue |
| ----------------------- | ------------- | -----: | ------------------: |
| ORD_PAID_NORMAL_01      | resetDate - 7 | 75,000 |                 Yes |
| ORD_PAID_NORMAL_02      | resetDate - 3 | 42,000 |                 Yes |
| ORD_PAID_FEFO           | resetDate - 1 | 12,000 |                 Yes |
| ORD_PAID_HIGH_ALERT     | resetDate     | 20,000 |                 Yes |
| ORD_CANCELLED_01        | resetDate     | 50,000 |                  No |
| ORD_PAYMENT_FAILED_ONLY | resetDate     | 40,000 |                  No |

## 14.2. Top medicines report scenario

Ensure repeated sales:

| Medicine          | Quantity sold target |
| ----------------- | -------------------: |
| Vitamin C 500mg   |                  20+ |
| Paracetamol 500mg |                  10+ |
| Cetirizine 10mg   |                   8+ |
| Omeprazole 20mg   |                   5+ |
| Aspirin 81mg      |                   2+ |

## 14.3. Inventory report scenario

Include:

1. One low-stock medicine.
2. One near-expiry medicine.
3. One expired batch.
4. One normal high-stock medicine.
5. One medicine with multiple batches.

## 14.4. Report exclusion rules

Reports must exclude:

1. DRAFT orders.
2. CANCELLED orders.
3. FAILED payment attempts.
4. Unpaid orders.
5. Expired stock from sellable quantity.

---

# 15. Graph Projection Rebuild Strategy

## 15.1. Purpose

Graph projection rebuild ensures Neo4j matches PostgreSQL seed after demo reset.

## 15.2. Official strategy

After PostgreSQL seed:

```text
PostgreSQL source seed
→ Graph Sync Outbox events
→ Graph Sync Worker processing
OR
→ Projection rebuild from PostgreSQL
→ Freshness check
→ Graph-RAG smoke test
```

## 15.3. Rebuild order

Projection rebuild should:

1. Clear or mark old projection safely.
2. Project active Medicine nodes.
3. Project active ActiveIngredient nodes.
4. Project active MedicineIngredient relationships.
5. Project active DrugInteraction relationships.
6. Update `graph_projection_versions`.
7. Mark outbox/attempts as succeeded if using rebuild record.
8. Run freshness check.
9. Run Graph-RAG smoke query.

## 15.4. Not allowed

Do not use standalone Cypher seed as official graph.

Rejected:

```text
Run static Neo4j Cypher seed unrelated to PostgreSQL
```

Reason:

1. Breaks PostgreSQL source of truth.
2. Can create graph/PostgreSQL mismatch.
3. Breaks freshness trust.
4. Undermines Graph Sync baseline.

## 15.5. Graph smoke queries

After rebuild, verify:

1. Medicine count > 0.
2. ActiveIngredient count > 0.
3. CONTAINS count > 0.
4. INTERACTS_WITH count > 0.
5. Warfarin–Aspirin HIGH path exists.
6. Paracetamol ingredients path exists.
7. Freshness status is FRESH.

---

# 16. Demo Reset Workflow

## 16.1. Purpose

Demo reset creates reproducible demo state.

Workflow must reset:

1. PostgreSQL data.
2. Supabase demo users/profile mapping.
3. Neo4j projection.
4. Graph freshness.
5. Smoke tests.

## 16.2. Official reset command

Recommended command:

```text
demo:reset
```

or equivalent local script.

## 16.3. Demo reset steps

Suggested workflow:

```text
1. Verify environment is local.
2. Verify explicit confirmation flag.
3. Connect to PostgreSQL.
4. Clear MVP demo data in safe dependency order.
5. Provision/check Supabase demo users.
6. Seed roles.
7. Seed permissions.
8. Seed role-permission mappings.
9. Seed user_profiles.
10. Seed user_roles.
11. Seed system_settings.
12. Seed prompt_templates.
13. Seed ai_provider_configs if DB-based.
14. Seed suppliers.
15. Seed medicines.
16. Seed active_ingredients.
17. Seed medicine_ingredients.
18. Seed drug_interactions.
19. Seed stock_imports and details.
20. Confirm stock imports through seed service or controlled seed logic.
21. Seed inventory adjustments and confirm them.
22. Seed orders and order items.
23. Seed interaction alerts.
24. Seed checkout results for paid orders:
    - batch allocations
    - payments
    - invoices
    - invoice items
25. Seed failed payment attempts.
26. Seed AI audit logs.
27. Create graph sync outbox or run projection rebuild.
28. Rebuild Neo4j projection from PostgreSQL.
29. Run graph freshness check.
30. Run smoke test checks.
31. Print reset summary.
```

## 16.4. Clear order

If clearing data manually, use dependency-safe order.

Suggested delete order:

1. AI audit logs.
2. Graph sync attempts.
3. Graph sync outbox.
4. Graph projection versions.
5. Invoice items.
6. Invoices.
7. Payments.
8. Order item batch allocations.
9. Interaction alerts.
10. Order items.
11. Orders.
12. Inventory adjustment details.
13. Inventory adjustments.
14. Stock import details.
15. Stock imports.
16. Medicine batches.
17. Drug interactions.
18. Medicine ingredients.
19. Active ingredients.
20. Medicines.
21. Suppliers.
22. Role permissions.
23. User roles.
24. Permissions.
25. Roles.
26. User profiles.
27. System settings.
28. Prompt templates.
29. AI provider configs.
30. Audit logs if local reset includes them.

Alternative:

1. Use transaction.
2. Use truncate cascade only in local with explicit safeguards.
3. Never on demo/staging/prod.

## 16.5. Reset output summary

Reset script should print:

1. Environment.
2. Reset date.
3. Number of users.
4. Number of medicines.
5. Number of active ingredients.
6. Number of batches.
7. Number of orders.
8. Number of paid orders.
9. Number of interaction alerts.
10. Number of graph nodes.
11. Number of graph relationships.
12. Smoke test PASS/FAIL.

---

# 17. Local-only Safeguard

## 17.1. Official rule

`demo:reset` is permitted only in local environment.

It must refuse to run in:

1. demo.
2. staging.
3. production.
4. unknown environment.

## 17.2. Required safeguards

Reset script must check:

1. `NODE_ENV`.
2. `APP_ENV`.
3. Database host/name.
4. Explicit confirmation flag.
5. Optional local-only marker file.
6. Optional allowlist of database URLs.

## 17.3. Example confirmation

Require:

```text
DEMO_RESET_CONFIRM=LOCAL_RESET_ALLOWED
```

or command flag:

```text
--confirm-local-reset
```

## 17.4. Refusal message

If not local:

```text
Demo reset refused. This command is allowed only in local environment and must not run against demo, staging, production, or unknown databases.
```

## 17.5. Safety checklist

Before destructive reset:

1. Confirm environment local.
2. Confirm database URL local/safe.
3. Confirm Supabase project is demo/local-safe.
4. Confirm Neo4j target is demo/local-safe.
5. Confirm user passed explicit flag.
6. Log refusal if unsafe.

---

# 18. Smoke Test Data Checks

## 18.1. Purpose

Smoke checks verify demo seed is usable.

Smoke checks should run after demo reset.

## 18.2. Auth/RBAC checks

Verify:

1. Admin user exists.
2. Staff user exists.
3. Warehouse user exists.
4. New Staff user exists.
5. Admin has Admin role.
6. Staff has Staff role.
7. Warehouse has Warehouse role.
8. New Staff has `must_change_password = true`.
9. Primary demo accounts have `must_change_password = false`.
10. No password/password_hash in PostgreSQL.

## 18.3. Medicine/ingredient checks

Verify:

1. At least 10 medicines.
2. Every active medicine has `selling_price > 0`.
3. At least 10 active ingredients.
4. Every interaction-demo medicine has mapping.
5. Warfarin maps to Warfarin.
6. Aspirin maps to Aspirin.

## 18.4. Interaction checks

Verify:

1. Warfarin–Aspirin HIGH rule exists.
2. Canonical pair is unique.
3. At least one LOW/MEDIUM rule exists.
4. No Medicine-level official interaction rule exists.
5. HIGH unresolved alert exists for Draft Order.
6. HIGH resolved alert exists for Paid Order.

## 18.5. Inventory checks

Verify:

1. MedicineBatch count > 0.
2. Batch number not null.
3. Expiry date not null.
4. At least one expired batch.
5. At least one near-expiry batch.
6. At least one normal batch.
7. At least one low-stock medicine.
8. Sellable quantity excludes expired batch.
9. FEFO medicine has multiple sellable batches.

## 18.6. Stock Import checks

Verify:

1. Confirmed Stock Import exists.
2. Draft Stock Import exists.
3. Confirmed import created/updated batches.
4. Batch merge scenario valid if included.
5. Expiry mismatch test data available if included.

## 18.7. Inventory Adjustment checks

Verify:

1. Confirmed adjustment exists.
2. Adjustment has reason.
3. Adjustment detail has before/after quantity.
4. No batch has negative quantity.

## 18.8. Order/checkout checks

Verify:

1. At least 5 PAID orders.
2. At least 1 DRAFT order.
3. At least 1 CANCELLED order.
4. PAID order has SUCCESS payment.
5. PAID order has invoice.
6. Invoice has invoice items.
7. FEFO paid order has allocations.
8. Failed payment attempt exists.
9. No order has two SUCCESS payments.
10. DRAFT/CANCELLED orders have no invoice.

## 18.9. AI checks

Verify:

1. Prompt templates seeded and APPROVED.
2. Prompt version 1 exists.
3. AI Audit logs exist or can be generated.
4. Fallback audit scenario exists if seeded.
5. No raw PII in AI Audit summaries.
6. Guardrail refusal scenario can be triggered.

## 18.10. Graph checks

Verify:

1. Neo4j connection works.
2. Medicine nodes projected.
3. ActiveIngredient nodes projected.
4. CONTAINS relationships projected.
5. INTERACTS_WITH relationships projected.
6. Warfarin–Aspirin path exists.
7. Graph freshness status FRESH.
8. Graph-RAG interaction query returns provenance.
9. PostgreSQL fallback works if Neo4j unavailable.

## 18.11. Report checks

Verify:

1. Revenue report returns paid orders only.
2. Top Medicines ranking not empty.
3. Inventory report shows low-stock.
4. Inventory report shows near-expiry.
5. Inventory report excludes expired from sellable quantity.
6. Cancelled/Draft/Failed are excluded from revenue.

---

# 19. MVP / Should-have / Future Data Scope

## 19.1. MVP data scope

MVP data includes:

1. Demo users.
2. Roles.
3. Permissions.
4. Role mappings.
5. Suppliers.
6. Medicines.
7. ActiveIngredients.
8. Medicine mappings.
9. DrugInteraction rules.
10. Stock Import.
11. MedicineBatch.
12. Inventory Adjustment.
13. Orders.
14. OrderItems.
15. Batch allocations.
16. Payments.
17. Invoices.
18. InvoiceItems.
19. InteractionAlerts.
20. Consultation notes on InteractionAlerts.
21. PromptTemplates.
22. AI Audit Logs.
23. Graph Sync data.
24. Graph projection.
25. System Settings.
26. Report-ready sales data.

## 19.2. Should-have data scope

Should-have data includes:

1. Full Customer Management.
2. Customer purchase history notes.
3. Generic System Audit Log UI data.
4. Graph Sync Status UI detailed data.
5. Prompt Editing UI data.
6. AI Provider Settings UI data.
7. AI Report Narrative data.
8. Notification data.
9. Reorder suggestion data.
10. Export/report snapshots.

## 19.3. Future / Commercial data scope

Future data includes:

1. Online product catalog operational expansion.
2. Product variants as commerce sales key.
3. Cart.
4. Wishlist.
5. Shipping.
6. Coupon.
7. Promotion.
8. Reviews.
9. CMS.
10. Multi-store.
11. Multi-warehouse.
12. Stock transfer.
13. Purchase order.
14. Return/refund.
15. Credit note.
16. Real payment gateway.
17. Bank reconciliation.
18. AI cache.
19. DrugGroup taxonomy.
20. Symptom/Condition/RedFlag graph enrichment.

## 19.4. Out of Scope data

Out of Scope for MVP:

1. Real customer PII.
2. Real patient medical records.
3. Full scraped dataset as operational seed.
4. Full 100-table commercial schema seed.
5. Standalone Cypher graph seed as official graph.
6. Aggregate inventory source data.
7. Medicine-level interaction official seed.
8. Price = 0 sellable medicines.
9. CRITICAL severity.
10. PENDING bank transfer.

---

# 20. Data Quality Checklist

## 20.1. General data quality

| Checklist item                                          | Expected |
| ------------------------------------------------------- | -------- |
| Seed is curated                                         | Yes      |
| Seed is reproducible                                    | Yes      |
| No real personal data                                   | Yes      |
| No password/password_hash in PostgreSQL                 | Yes      |
| No sellable medicine price = 0                          | Yes      |
| No raw scraped ingredients as official without curation | Yes      |
| Dynamic expiry dates used                               | Yes      |
| Demo reset local-only                                   | Yes      |
| PostgreSQL source of truth                              | Yes      |
| Neo4j projection from PostgreSQL                        | Yes      |

## 20.2. Inventory quality

| Checklist item                     | Expected |
| ---------------------------------- | -------- |
| MedicineBatch source of truth      | Yes      |
| Batch number required              | Yes      |
| Expiry date required               | Yes      |
| Expired batch exists               | Yes      |
| Near-expiry batch exists           | Yes      |
| Normal batch exists                | Yes      |
| Low-stock scenario exists          | Yes      |
| FEFO multi-batch scenario exists   | Yes      |
| No direct aggregate inventory seed | Yes      |

## 20.3. Sales quality

| Checklist item                          | Expected |
| --------------------------------------- | -------- |
| PAID orders exist                       | Yes      |
| DRAFT orders exist                      | Yes      |
| CANCELLED orders exist                  | Yes      |
| Failed payment attempt exists           | Yes      |
| Invoice exists for PAID orders          | Yes      |
| No invoice for DRAFT/CANCELLED          | Yes      |
| Batch allocations exist for PAID orders | Yes      |
| Reports have enough paid orders         | Yes      |

## 20.4. Interaction/AI/Graph quality

| Checklist item                               | Expected |
| -------------------------------------------- | -------- |
| ActiveIngredient-level rules                 | Yes      |
| HIGH rule exists                             | Yes      |
| HIGH unresolved alert exists                 | Yes      |
| HIGH resolved alert exists                   | Yes      |
| Consultation note stored on InteractionAlert | Yes      |
| PromptTemplates seeded                       | Yes      |
| AI Audit seed/check available                | Yes      |
| Graph Sync outbox/logs available             | Yes      |
| Neo4j projection rebuilt from PostgreSQL     | Yes      |
| Graph freshness check passes                 | Yes      |
| Graph-RAG provenance works                   | Yes      |

---

# 21. Traceability to ERD / Prisma / API / Testing

## 21.1. Traceability to ERD

| Seed group           | ERD tables                                                              |
| -------------------- | ----------------------------------------------------------------------- |
| Demo users           | `user_profiles`                                                         |
| Roles/permissions    | `roles`, `permissions`, `user_roles`, `role_permissions`                |
| Suppliers            | `suppliers`                                                             |
| Medicines            | `medicines`                                                             |
| ActiveIngredients    | `active_ingredients`                                                    |
| Mapping              | `medicine_ingredients`                                                  |
| DrugInteraction      | `drug_interactions`                                                     |
| Stock Import         | `stock_imports`, `stock_import_details`                                 |
| MedicineBatch        | `medicine_batches`                                                      |
| Inventory Adjustment | `inventory_adjustments`, `inventory_adjustment_details`                 |
| Orders               | `orders`, `order_items`                                                 |
| Batch allocations    | `order_item_batch_allocations`                                          |
| Payments             | `payments`                                                              |
| Invoices             | `invoices`, `invoice_items`                                             |
| InteractionAlerts    | `interaction_alerts`                                                    |
| PromptTemplates      | `prompt_templates`                                                      |
| AI Audit             | `ai_audit_logs`                                                         |
| Graph Sync           | `graph_sync_outbox`, `graph_sync_attempts`, `graph_projection_versions` |
| Settings             | `system_settings`                                                       |
| Audit                | `audit_logs`                                                            |
| Idempotency          | `idempotency_records`                                                   |

## 21.2. Traceability to Prisma

Seed must respect Prisma models from Document 14:

1. Use UUID IDs or stable seed keys mapped to UUIDs.
2. Use Decimal for money fields.
3. Use enum values exactly.
4. Respect required relations.
5. Respect unique constraints.
6. Respect partial unique index rules.
7. Respect check constraints.
8. Use `DateTime`/date handling consistently.
9. Do not violate relation dependencies.

## 21.3. Traceability to API

Seed data must support API demos:

| API group                 | Required seed                      |
| ------------------------- | ---------------------------------- |
| Auth/Profile APIs         | Demo users/profiles                |
| User/Role APIs            | Roles/permissions                  |
| Medicine APIs             | Medicines                          |
| ActiveIngredient APIs     | Ingredients/mappings               |
| Supplier APIs             | Suppliers                          |
| Inventory APIs            | Batches                            |
| Stock Import APIs         | Draft/confirmed imports            |
| Inventory Adjustment APIs | Draft/confirmed adjustments        |
| POS APIs                  | Draft orders                       |
| Checkout API              | Checkout-ready Draft Order         |
| InteractionAlert APIs     | HIGH alerts                        |
| AI APIs                   | Prompt templates and alert context |
| Graph-RAG APIs            | Projected graph                    |
| Reports APIs              | Paid orders/inventory data         |
| Settings APIs             | Near-expiry threshold              |

## 21.4. Traceability to Testing

| Test area           | Seed scenario                             |
| ------------------- | ----------------------------------------- |
| Auth/RBAC           | Admin/Staff/Warehouse/NewStaff            |
| First-login         | NewStaff must_change_password true        |
| Supplier auth       | Warehouse create/update, Admin deactivate |
| Medicine validation | Price > 0                                 |
| FEFO                | Multi-batch Paracetamol                   |
| Expiry              | Expired and near-expiry batches           |
| Interaction         | Warfarin–Aspirin HIGH                     |
| Checkout blocking   | Draft HIGH unresolved                     |
| Checkout success    | Resolved HIGH and normal paid orders      |
| Failed payment      | Failed attempt retained                   |
| Reports             | 5–10 PAID orders                          |
| AI Guardrail        | Unsafe input scenario                     |
| AI Audit            | Success/fallback/refusal logs             |
| Graph Sync          | Projection rebuild/freshness              |
| Graph-RAG           | Path/provenance and fallback              |

---

## 22. Kết luận

Document 18 — Data Strategy, Catalog Reference & MVP Seed Plan đã xác định chiến lược dữ liệu chính thức cho **PharmaAssist AI Intelligence**.

Tài liệu này đã làm rõ:

1. Catalog/reference data chỉ dùng làm dữ liệu tham khảo.
2. Catalog data không phải operational seed.
3. MVP cần curated operational seed riêng.
4. Seed phải phục vụ nghiệp vụ, demo, test và traceability.
5. Demo users gồm Admin, Staff, Warehouse và New Staff.
6. Primary demo accounts có `must_change_password = false`.
7. New Staff demo account có `must_change_password = true`.
8. Roles/permissions phải seed theo RBAC chính thức.
9. Supplier seed phục vụ Stock Import.
10. Medicine seed phải có `selling_price > 0`.
11. ActiveIngredients phải curated.
12. Medicine–ActiveIngredient mapping là nền cho interaction và graph.
13. DrugInteraction rules ở cấp ActiveIngredient–ActiveIngredient.
14. MedicineBatch là source of truth cho inventory.
15. Inventory demo state phải dựng từ Stock Import, Adjustment và Checkout allocation.
16. Dynamic expiry dates giúp demo ổn định theo thời gian.
17. FEFO scenario là bắt buộc.
18. HIGH interaction scenario là bắt buộc.
19. Failed payment scenario nên có.
20. Draft/Cancelled/Paid order scenarios cần đủ.
21. Report-ready sales data cần 5–10 PAID orders.
22. AI PromptTemplates và AI Audit data cần hỗ trợ demo.
23. Graph projection phải rebuild/sync từ PostgreSQL.
24. Demo reset chỉ được chạy local.
25. Smoke tests phải kiểm tra data sau reset.
26. MVP/Should-have/Future data scope đã được phân tách rõ.
27. Data quality checklist và traceability đã được thiết lập.

Các baseline quan trọng được giữ đúng:

1. PostgreSQL là source of truth.
2. Neo4j là projection.
3. Không dùng standalone Cypher seed làm official demo graph.
4. Không dùng full scraped data làm official operational seed.
5. Không dùng full 100-table schema làm MVP seed.
6. Không lưu password/password_hash.
7. Không seed price = 0 cho thuốc bán được.
8. Không dùng aggregate inventory làm source of truth.
9. Không dùng Medicine-level interaction làm official rule.
10. Không dùng real personal/medical data.
11. Không bỏ HIGH acknowledgement/consultation note.
12. Không bỏ Graph Sync/freshness.

Document 18 là input trực tiếp cho:

1. Seed script.
2. Demo reset workflow.
3. Graph projection rebuild.
4. Smoke tests.
5. E2E demo flows.
6. Document 19 — Project Management, Jira & Release Plan.
7. Document 20 — Testing, Demo & Setup Guide.
