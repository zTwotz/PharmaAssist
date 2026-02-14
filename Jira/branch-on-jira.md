# branch-on-jira.md

# Danh sách Nhánh Git chuẩn (Đã đồng bộ từ jira-mapping.md)

Tài liệu này ghi lại danh sách nhánh Git chuẩn mực được cập nhật theo `jira-mapping.md`.

* Tổng số issue branches: 789
* Tổng số Epic: 39
* Tổng số User Story: 170
* Tổng số Task: 580

---

## 1. Epic Branches

| Jira Key | Logical Key | Tên Epic | Nhánh Git tương ứng |
|---|---|---|---|
| **PAC-1** | `EPIC-01` | EPIC-01 - Auth & RBAC | `epic/PAC-1-epic-01-auth-rbac` |
| **PAC-2** | `EPIC-02` | EPIC-02 - User / Staff Account Management | `epic/PAC-2-epic-02-user-staff-account-management` |
| **PAC-3** | `EPIC-03` | EPIC-03 - Medicine & ActiveIngredient | `epic/PAC-3-epic-03-medicine-activeingredient` |
| **PAC-4** | `EPIC-04` | EPIC-04 - Supplier Management | `epic/PAC-4-epic-04-supplier-management` |
| **PAC-5** | `EPIC-05` | EPIC-05 - Inventory & MedicineBatch | `epic/PAC-5-epic-05-inventory-medicinebatch` |
| **PAC-6** | `EPIC-06` | EPIC-06 - Stock Import | `epic/PAC-6-epic-06-stock-import` |
| **PAC-7** | `EPIC-07` | EPIC-07 - Inventory Adjustment | `epic/PAC-7-epic-07-inventory-adjustment` |
| **PAC-8** | `EPIC-08` | EPIC-08 - POS Draft Order | `epic/PAC-8-epic-08-pos-draft-order` |
| **PAC-9** | `EPIC-09` | EPIC-09 - DrugInteraction Rule | `epic/PAC-9-epic-09-druginteraction-rule` |
| **PAC-10** | `EPIC-10` | EPIC-10 - InteractionAlert Lifecycle | `epic/PAC-10-epic-10-interactionalert-lifecycle` |
| **PAC-11** | `EPIC-11` | EPIC-11 - Checkout, FEFO, Payment & Invoice | `epic/PAC-11-epic-11-checkout-fefo-payment-invoice` |
| **PAC-12** | `EPIC-12` | EPIC-12 - AI Copilot | `epic/PAC-12-epic-12-ai-copilot` |
| **PAC-13** | `EPIC-13` | EPIC-13 - AI Guardrail & AI Audit | `epic/PAC-13-epic-13-ai-guardrail-ai-audit` |
| **PAC-14** | `EPIC-14` | EPIC-14 - Graph Sync & Neo4j Projection | `epic/PAC-14-epic-14-graph-sync-neo4j-projection` |
| **PAC-15** | `EPIC-15` | EPIC-15 - Graph-RAG | `epic/PAC-15-epic-15-graph-rag` |
| **PAC-16** | `EPIC-16` | EPIC-16 - Reports | `epic/PAC-16-epic-16-reports` |
| **PAC-17** | `EPIC-17` | EPIC-17 - System Settings | `epic/PAC-17-epic-17-system-settings` |
| **PAC-18** | `EPIC-18` | EPIC-18 - Data Seed & Demo Reset | `epic/PAC-18-epic-18-data-seed-demo-reset` |
| **PAC-19** | `EPIC-19` | EPIC-19 - Testing, Smoke Test & Release Readiness | `epic/PAC-19-epic-19-testing-smoke-test-release-readiness` |
| **PAC-20** | `EPIC-20` | EPIC-20 - DevOps, CI & Setup | `epic/PAC-20-epic-20-devops-ci-setup` |
| **PAC-21** | `EPIC-21` | EPIC-21 - Documentation & Traceability | `epic/PAC-21-epic-21-documentation-traceability` |
| **PAC-22** | `EPIC-22` | EPIC-22 - Admin Graph Sync Status UI | `epic/PAC-22-epic-22-admin-graph-sync-status-ui` |
| **PAC-23** | `EPIC-23` | EPIC-23 - Read-only Graph Explorer | `epic/PAC-23-epic-23-read-only-graph-explorer` |
| **PAC-24** | `EPIC-24` | EPIC-24 - AI Provider & Prompt Management UI | `epic/PAC-24-epic-24-ai-provider-prompt-management-ui` |
| **PAC-25** | `EPIC-25` | EPIC-25 - System Audit Log UI | `epic/PAC-25-epic-25-system-audit-log-ui` |
| **PAC-26** | `EPIC-26` | EPIC-26 - Supabase Storage for Medicine Images | `epic/PAC-26-epic-26-supabase-storage-for-medicine-images` |
| **PAC-27** | `EPIC-27` | EPIC-27 - Supabase Realtime Inventory Updates | `epic/PAC-27-epic-27-supabase-realtime-inventory-updates` |
| **PAC-28** | `EPIC-28` | EPIC-28 - Notification Center | `epic/PAC-28-epic-28-notification-center` |
| **PAC-29** | `EPIC-29` | EPIC-29 - AI Business Report Narrative | `epic/PAC-29-epic-29-ai-business-report-narrative` |
| **PAC-30** | `EPIC-30` | EPIC-30 - Advanced Testing & Demo Evidence | `epic/PAC-30-epic-30-advanced-testing-demo-evidence` |
| **PAC-31** | `EPIC-31` | EPIC-31 - Full Customer Management | `epic/PAC-31-epic-31-full-customer-management` |
| **PAC-32** | `EPIC-32` | EPIC-32 - Online Commerce | `epic/PAC-32-epic-32-online-commerce` |
| **PAC-33** | `EPIC-33` | EPIC-33 - Product Variant Catalog | `epic/PAC-33-epic-33-product-variant-catalog` |
| **PAC-34** | `EPIC-34` | EPIC-34 - Multi-store / Multi-warehouse | `epic/PAC-34-epic-34-multi-store-multi-warehouse` |
| **PAC-35** | `EPIC-35` | EPIC-35 - Stock Transfer | `epic/PAC-35-epic-35-stock-transfer` |
| **PAC-36** | `EPIC-36` | EPIC-36 - Forecasting & Reorder Suggestions | `epic/PAC-36-epic-36-forecasting-reorder-suggestions` |
| **PAC-37** | `EPIC-37` | EPIC-37 - Promotion / Coupon | `epic/PAC-37-epic-37-promotion-coupon` |
| **PAC-38** | `EPIC-38` | EPIC-38 - Shipping / Delivery | `epic/PAC-38-epic-38-shipping-delivery` |
| **PAC-39** | `EPIC-39` | EPIC-39 - Review / CMS | `epic/PAC-39-epic-39-review-cms` |

---

## 2. User Story Branches

| Jira Key | Logical Key | Tên Story | Nhánh Git tương ứng |
|---|---|---|---|
| **PAC-40** | `US-01` | US-01 - Đăng nhập bằng Supabase Auth | `story/PAC-40-us-01-ang-nhap-bang-supabase-auth` |
| **PAC-41** | `US-02` | US-02 - Đăng xuất và dọn session | `story/PAC-41-us-02-ang-xuat-va-don-session` |
| **PAC-42** | `US-03` | US-03 - Xác thực session ở backend | `story/PAC-42-us-03-xac-thuc-session-o-backend` |
| **PAC-43** | `US-04` | US-04 - Lấy thông tin người dùng hiện tại | `story/PAC-43-us-04-lay-thong-tin-nguoi-dung-hien-tai` |
| **PAC-44** | `US-05` | US-05 - Multi-role RBAC model | `story/PAC-44-us-05-multi-role-rbac-model` |
| **PAC-45** | `US-06` | US-06 - Permission-based API Guard | `story/PAC-45-us-06-permission-based-api-guard` |
| **PAC-46** | `US-07` | US-07 - Permission-aware frontend UI | `story/PAC-46-us-07-permission-aware-frontend-ui` |
| **PAC-47** | `US-08` | US-08 - Staff ownership scope | `story/PAC-47-us-08-staff-ownership-scope` |
| **PAC-48** | `US-09` | US-09 - Warehouse access restrictions | `story/PAC-48-us-09-warehouse-access-restrictions` |
| **PAC-49** | `US-10` | US-10 - Admin tạo tài khoản nhân viên | `story/PAC-49-us-10-admin-tao-tai-khoan-nhan-vien` |
| **PAC-50** | `US-11` | US-11 - Đổi mật khẩu lần đầu | `story/PAC-50-us-11-oi-mat-khau-lan-au` |
| **PAC-51** | `US-12` | US-12 - Cập nhật trạng thái tài khoản nhân viên | `story/PAC-51-us-12-cap-nhat-trang-thai-tai-khoan-nhan-vien` |
| **PAC-52** | `US-13` | US-13 - Thêm thuốc mới | `story/PAC-52-us-13-them-thuoc-moi` |
| **PAC-53** | `US-14` | US-14 - Cập nhật thông tin thuốc | `story/PAC-53-us-14-cap-nhat-thong-tin-thuoc` |
| **PAC-54** | `US-15` | US-15 - Tìm kiếm và lọc thuốc | `story/PAC-54-us-15-tim-kiem-va-loc-thuoc` |
| **PAC-55** | `US-16` | US-16 - Deactivate thuốc | `story/PAC-55-us-16-deactivate-thuoc` |
| **PAC-56** | `US-17` | US-17 - Validate giá bán thuốc lớn hơn 0 | `story/PAC-56-us-17-validate-gia-ban-thuoc-lon-hon-0` |
| **PAC-57** | `US-18` | US-18 - Quản lý ActiveIngredient | `story/PAC-57-us-18-quan-ly-activeingredient` |
| **PAC-58** | `US-19` | US-19 - Mapping Medicine với ActiveIngredient | `story/PAC-58-us-19-mapping-medicine-voi-activeingredient` |
| **PAC-59** | `US-20` | US-20 - Validate mapping hoạt chất không trùng | `story/PAC-59-us-20-validate-mapping-hoat-chat-khong-trung` |
| **PAC-60** | `US-21` | US-21 - Chuẩn h��a dữ liệu hoạt chất | `story/PAC-60-us-21-chuan-h-a-du-lieu-hoat-chat` |
| **PAC-61** | `US-22` | US-22 - Trigger Graph Sync khi Medicine/Ingredient thay đổi | `story/PAC-61-us-22-trigger-graph-sync-khi-medicine-ingredient-thay-oi` |
| **PAC-62** | `US-23` | US-23 - Tạo nhà cung cấp | `story/PAC-62-us-23-tao-nha-cung-cap` |
| **PAC-63** | `US-24` | US-24 - Cập nhật và tìm kiếm nhà cung cấp | `story/PAC-63-us-24-cap-nhat-va-tim-kiem-nha-cung-cap` |
| **PAC-64** | `US-25` | US-25 - Admin deactivate nhà cung cấp | `story/PAC-64-us-25-admin-deactivate-nha-cung-cap` |
| **PAC-65** | `US-26` | US-26 - Liên kết Supplier với Stock Import | `story/PAC-65-us-26-lien-ket-supplier-voi-stock-import` |
| **PAC-66** | `US-27` | US-27 - Thiết kế MedicineBatch là source of truth | `story/PAC-66-us-27-thiet-ke-medicinebatch-la-source-of-truth` |
| **PAC-67** | `US-28` | US-28 - Batch number bắt buộc | `story/PAC-67-us-28-batch-number-bat-buoc` |
| **PAC-68** | `US-29` | US-29 - Batch identity theo medicine + batch + expiry | `story/PAC-68-us-29-batch-identity-theo-medicine-batch-expiry` |
| **PAC-69** | `US-30` | US-30 - Inventory Summary từ MedicineBatch | `story/PAC-69-us-30-inventory-summary-tu-medicinebatch` |
| **PAC-70** | `US-31` | US-31 - Batch Detail view | `story/PAC-70-us-31-batch-detail-view` |
| **PAC-71** | `US-32` | US-32 - Tính sellable quantity | `story/PAC-71-us-32-tinh-sellable-quantity` |
| **PAC-72** | `US-33` | US-33 - Loại trừ batch hết hạn khỏi sellable stock | `story/PAC-72-us-33-loai-tru-batch-het-han-khoi-sellable-stock` |
| **PAC-73** | `US-34` | US-34 - Low-stock dựa trên sellable quantity | `story/PAC-73-us-34-low-stock-dua-tren-sellable-quantity` |
| **PAC-74** | `US-35` | US-35 - Near-expiry theo threshold cấu hình | `story/PAC-74-us-35-near-expiry-theo-threshold-cau-hinh` |
| **PAC-75** | `US-36` | US-36 - Inventory dashboard cho Admin/Warehouse | `story/PAC-75-us-36-inventory-dashboard-cho-admin-warehouse` |
| **PAC-76** | `US-37` | US-37 - POS chỉ xem sellable stock cần bán | `story/PAC-76-us-37-pos-chi-xem-sellable-stock-can-ban` |
| **PAC-77** | `US-38` | US-38 - Chặn sửa trực tiếp quantity trong Batch Detail | `story/PAC-77-us-38-chan-sua-truc-tiep-quantity-trong-batch-detail` |
| **PAC-78** | `US-39` | US-39 - Tạo phiếu nhập kho draft | `story/PAC-78-us-39-tao-phieu-nhap-kho-draft` |
| **PAC-79** | `US-40` | US-40 - Thêm dòng thuốc vào phiếu nhập | `story/PAC-79-us-40-them-dong-thuoc-vao-phieu-nhap` |
| **PAC-80** | `US-41` | US-41 - Cập nhật/xóa dòng nhập khi còn draft | `story/PAC-80-us-41-cap-nhat-xoa-dong-nhap-khi-con-draft` |
| **PAC-81** | `US-42` | US-42 - Validate supplier trong phiếu nhập | `story/PAC-81-us-42-validate-supplier-trong-phieu-nhap` |
| **PAC-82** | `US-43` | US-43 - Validate batch number và expiry date | `story/PAC-82-us-43-validate-batch-number-va-expiry-date` |
| **PAC-83** | `US-44` | US-44 - Confirm Stock Import transaction | `story/PAC-83-us-44-confirm-stock-import-transaction` |
| **PAC-84** | `US-45` | US-45 - Merge batch khi medicine/batch/expiry trùng | `story/PAC-84-us-45-merge-batch-khi-medicine-batch-expiry-trung` |
| **PAC-85** | `US-46` | US-46 - Reject batch khi cùng batch nhưng khác expiry | `story/PAC-85-us-46-reject-batch-khi-cung-batch-nhung-khac-expiry` |
| **PAC-86** | `US-47` | US-47 - Khóa phiếu nhập đã confirmed | `story/PAC-86-us-47-khoa-phieu-nhap-a-confirmed` |
| **PAC-87** | `US-48` | US-48 - Audit Stock Import | `story/PAC-87-us-48-audit-stock-import` |
| **PAC-88** | `US-49` | US-49 - Tạo Inventory Adjustment | `story/PAC-88-us-49-tao-inventory-adjustment` |
| **PAC-89** | `US-50` | US-50 - Adjustment bắt buộc reason | `story/PAC-89-us-50-adjustment-bat-buoc-reason` |
| **PAC-90** | `US-51` | US-51 - Chọn MedicineBatch cần điều chỉnh | `story/PAC-90-us-51-chon-medicinebatch-can-ieu-chinh` |
| **PAC-91** | `US-52` | US-52 - Confirm Inventory Adjustment transaction | `story/PAC-91-us-52-confirm-inventory-adjustment-transaction` |
| **PAC-92** | `US-53` | US-53 - Chặn adjustment làm quantity âm | `story/PAC-92-us-53-chan-adjustment-lam-quantity-am` |
| **PAC-93** | `US-54` | US-54 - Warehouse tạo và confirm adjustment | `story/PAC-93-us-54-warehouse-tao-va-confirm-adjustment` |
| **PAC-94** | `US-55` | US-55 - Audit Inventory Adjustment | `story/PAC-94-us-55-audit-inventory-adjustment` |
| **PAC-95** | `US-56` | US-56 - Admin xem lịch sử adjustment | `story/PAC-95-us-56-admin-xem-lich-su-adjustment` |
| **PAC-96** | `US-57` | US-57 - Tạo Draft Order tại POS | `story/PAC-96-us-57-tao-draft-order-tai-pos` |
| **PAC-97** | `US-58` | US-58 - Tìm thuốc trong POS | `story/PAC-97-us-58-tim-thuoc-trong-pos` |
| **PAC-98** | `US-59` | US-59 - Thêm thuốc vào Draft Order | `story/PAC-98-us-59-them-thuoc-vao-draft-order` |
| **PAC-99** | `US-60` | US-60 - Cập nhật số lượng thuốc trong Draft Order | `story/PAC-99-us-60-cap-nhat-so-luong-thuoc-trong-draft-order` |
| **PAC-100** | `US-61` | US-61 - Xóa thuốc khỏi Draft Order | `story/PAC-100-us-61-xoa-thuoc-khoi-draft-order` |
| **PAC-101** | `US-62` | US-62 - Tính tổng tiền Draft Order | `story/PAC-101-us-62-tinh-tong-tien-draft-order` |
| **PAC-102** | `US-63` | US-63 - Validate sellable stock khi lập đơn | `story/PAC-102-us-63-validate-sellable-stock-khi-lap-on` |
| **PAC-103** | `US-64` | US-64 - Hỗ trợ walk-in/anonymous customer | `story/PAC-103-us-64-ho-tro-walk-in-anonymous-customer` |
| **PAC-104** | `US-65` | US-65 - Staff chỉ xem đơn trong ownership scope | `story/PAC-104-us-65-staff-chi-xem-on-trong-ownership-scope` |
| **PAC-105** | `US-66` | US-66 - Admin xem tất cả đơn hàng | `story/PAC-105-us-66-admin-xem-tat-ca-on-hang` |
| **PAC-106** | `US-67` | US-67 - Hủy Draft Order | `story/PAC-106-us-67-huy-draft-order` |
| **PAC-107** | `US-68` | US-68 - Giữ Draft Order khi checkout fail | `story/PAC-107-us-68-giu-draft-order-khi-checkout-fail` |
| **PAC-108** | `US-69` | US-69 - Tạo DrugInteraction Rule cấp ActiveIngredient | `story/PAC-108-us-69-tao-druginteraction-rule-cap-activeingredient` |
| **PAC-109** | `US-70` | US-70 - Cập nhật/deactivate DrugInteraction Rule | `story/PAC-109-us-70-cap-nhat-deactivate-druginteraction-rule` |
| **PAC-110** | `US-71` | US-71 - Severity chỉ gồm LOW/MEDIUM/HIGH | `story/PAC-110-us-71-severity-chi-gom-low-medium-high` |
| **PAC-111** | `US-72` | US-72 - Derive medicine interaction từ active ingredients | `story/PAC-111-us-72-derive-medicine-interaction-tu-active-ingredients` |
| **PAC-112** | `US-73` | US-73 - Check interaction khi order có từ hai thuốc | `story/PAC-112-us-73-check-interaction-khi-order-co-tu-hai-thuoc` |
| **PAC-113** | `US-74` | US-74 - Persist InteractionAlert đã hiển thị | `story/PAC-113-us-74-persist-interactionalert-a-hien-thi` |
| **PAC-114** | `US-75` | US-75 - Một active alert cho order_id + interaction_id | `story/PAC-114-us-75-mot-active-alert-cho-order-id-interaction-id` |
| **PAC-115** | `US-76` | US-76 - Update last_displayed_at và display_count | `story/PAC-115-us-76-update-last-displayed-at-va-display-count` |
| **PAC-116** | `US-77` | US-77 - Hiển thị alert LOW/MEDIUM/HIGH trong POS | `story/PAC-116-us-77-hien-thi-alert-low-medium-high-trong-pos` |
| **PAC-117** | `US-78` | US-78 - HIGH alert acknowledgement | `story/PAC-117-us-78-high-alert-acknowledgement` |
| **PAC-118** | `US-79` | US-79 - HIGH alert consultation note | `story/PAC-118-us-79-high-alert-consultation-note` |
| **PAC-119** | `US-80` | US-80 - Block checkout nếu HIGH unresolved | `story/PAC-119-us-80-block-checkout-neu-high-unresolved` |
| **PAC-120** | `US-81` | US-81 - Admin xem InteractionAlert History | `story/PAC-120-us-81-admin-xem-interactionalert-history` |
| **PAC-121** | `US-82` | US-82 - Warehouse không truy cập InteractionAlert | `story/PAC-121-us-82-warehouse-khong-truy-cap-interactionalert` |
| **PAC-122** | `US-83` | US-83 - Checkout API transaction | `story/PAC-122-us-83-checkout-api-transaction` |
| **PAC-123** | `US-84` | US-84 - Checkout validation pipeline | `story/PAC-123-us-84-checkout-validation-pipeline` |
| **PAC-124** | `US-85` | US-85 - Validate order status DRAFT | `story/PAC-124-us-85-validate-order-status-draft` |
| **PAC-125** | `US-86` | US-86 - Validate unresolved HIGH alerts | `story/PAC-125-us-86-validate-unresolved-high-alerts` |
| **PAC-126** | `US-87` | US-87 - Validate sellable stock trước checkout | `story/PAC-126-us-87-validate-sellable-stock-truoc-checkout` |
| **PAC-128** | `US-88` | US-88 - FEFO allocation service | `story/PAC-128-us-88-fefo-allocation-service` |
| **PAC-129** | `US-89` | US-89 - Multi-batch allocation persistence | `story/PAC-129-us-89-multi-batch-allocation-persistence` |
| **PAC-130** | `US-90` | US-90 - Trừ batch quantity trong transaction | `story/PAC-130-us-90-tru-batch-quantity-trong-transaction` |
| **PAC-131** | `US-91` | US-91 - Idempotent checkout | `story/PAC-131-us-91-idempotent-checkout` |
| **PAC-132** | `US-92` | US-92 - Rollback khi checkout failure | `story/PAC-132-us-92-rollback-khi-checkout-failure` |
| **PAC-133** | `US-93` | US-93 - Cash payment handling | `story/PAC-133-us-93-cash-payment-handling` |
| **PAC-134** | `US-94` | US-94 - Tính change_amount cho thanh toán tiền mặt | `story/PAC-134-us-94-tinh-change-amount-cho-thanh-toan-tien-mat` |
| **PAC-135** | `US-95` | US-95 - Simulated bank transfer transaction_reference | `story/PAC-135-us-95-simulated-bank-transfer-transaction-reference` |
| **PAC-136** | `US-96` | US-96 - One SUCCESS payment rule | `story/PAC-136-us-96-one-success-payment-rule` |
| **PAC-137** | `US-97` | US-97 - Invoice generated inside checkout | `story/PAC-137-us-97-invoice-generated-inside-checkout` |
| **PAC-138** | `US-98` | US-98 - Xem/in invoice sau checkout | `story/PAC-138-us-98-xem-in-invoice-sau-checkout` |
| **PAC-139** | `US-99` | US-99 - AI explanation for InteractionAlert | `story/PAC-139-us-99-ai-explanation-for-interactionalert` |
| **PAC-140** | `US-100` | US-100 - AI consultation note draft | `story/PAC-140-us-100-ai-consultation-note-draft` |
| **PAC-141** | `US-101` | US-101 - Staff confirm AI draft before official save | `story/PAC-141-us-101-staff-confirm-ai-draft-before-official-save` |
| **PAC-142** | `US-102` | US-102 - Safe follow-up questions | `story/PAC-142-us-102-safe-follow-up-questions` |
| **PAC-143** | `US-103` | US-103 - Google AI provider primary | `story/PAC-143-us-103-google-ai-provider-primary` |
| **PAC-144** | `US-104` | US-104 - MockAI fallback provider | `story/PAC-144-us-104-mockai-fallback-provider` |
| **PAC-145** | `US-105` | US-105 - AI input guardrail | `story/PAC-145-us-105-ai-input-guardrail` |
| **PAC-146** | `US-106` | US-106 - Block diagnosis requests | `story/PAC-146-us-106-block-diagnosis-requests` |
| **PAC-147** | `US-107` | US-107 - Block prescribing requests | `story/PAC-147-us-107-block-prescribing-requests` |
| **PAC-148** | `US-108` | US-108 - Block dosage advice requests | `story/PAC-148-us-108-block-dosage-advice-requests` |
| **PAC-149** | `US-109` | US-109 - AI output guardrail | `story/PAC-149-us-109-ai-output-guardrail` |
| **PAC-150** | `US-110` | US-110 - Structured output validation | `story/PAC-150-us-110-structured-output-validation` |
| **PAC-151** | `US-111` | US-111 - PII minimization before AI call | `story/PAC-151-us-111-pii-minimization-before-ai-call` |
| **PAC-152** | `US-112` | US-112 - AI safe error response | `story/PAC-152-us-112-ai-safe-error-response` |
| **PAC-153** | `US-113` | US-113 - AI disclaimer | `story/PAC-153-us-113-ai-disclaimer` |
| **PAC-154** | `US-114` | US-114 - AI Audit metadata | `story/PAC-154-us-114-ai-audit-metadata` |
| **PAC-155** | `US-115` | US-115 - Prompt template versioning | `story/PAC-155-us-115-prompt-template-versioning` |
| **PAC-156** | `US-116` | US-116 - Admin AI Audit Log view | `story/PAC-156-us-116-admin-ai-audit-log-view` |
| **PAC-157** | `US-117` | US-117 - Graph Sync Outbox | `story/PAC-157-us-117-graph-sync-outbox` |
| **PAC-158** | `US-118` | US-118 - Graph Sync Worker | `story/PAC-158-us-118-graph-sync-worker` |
| **PAC-159** | `US-119` | US-119 - Project Medicine node to Neo4j | `story/PAC-159-us-119-project-medicine-node-to-neo4j` |
| **PAC-160** | `US-120` | US-120 - Project ActiveIngredient node to Neo4j | `story/PAC-160-us-120-project-activeingredient-node-to-neo4j` |
| **PAC-161** | `US-121` | US-121 - Project CONTAINS relationship | `story/PAC-161-us-121-project-contains-relationship` |
| **PAC-162** | `US-122` | US-122 - Project INTERACTS_WITH relationship | `story/PAC-162-us-122-project-interacts-with-relationship` |
| **PAC-163** | `US-123` | US-123 - Canonical directed interaction edge | `story/PAC-163-us-123-canonical-directed-interaction-edge` |
| **PAC-164** | `US-124` | US-124 - Store graph projection metadata | `story/PAC-164-us-124-store-graph-projection-metadata` |
| **PAC-165** | `US-125` | US-125 - Retry failed graph sync jobs | `story/PAC-165-us-125-retry-failed-graph-sync-jobs` |
| **PAC-166** | `US-126` | US-126 - Log graph sync failures | `story/PAC-166-us-126-log-graph-sync-failures` |
| **PAC-167** | `US-127` | US-127 - Graph freshness detection | `story/PAC-167-us-127-graph-freshness-detection` |
| **PAC-168** | `US-128` | US-128 - Deactivated graph entity with isActive=false | `story/PAC-168-us-128-deactivated-graph-entity-with-isactive-false` |
| **PAC-169** | `US-129` | US-129 - Graph-RAG interaction explanation | `story/PAC-169-us-129-graph-rag-interaction-explanation` |
| **PAC-170** | `US-130` | US-130 - Graph-RAG provenance metadata | `story/PAC-170-us-130-graph-rag-provenance-metadata` |
| **PAC-171** | `US-131` | US-131 - Graph-RAG freshness metadata | `story/PAC-171-us-131-graph-rag-freshness-metadata` |
| **PAC-172** | `US-132` | US-132 - PostgreSQL fallback khi Neo4j unavailable | `story/PAC-172-us-132-postgresql-fallback-khi-neo4j-unavailable` |
| **PAC-173** | `US-133` | US-133 - PostgreSQL fallback khi graph stale | `story/PAC-173-us-133-postgresql-fallback-khi-graph-stale` |
| **PAC-174** | `US-134` | US-134 - Safe error cho graph-only query | `story/PAC-174-us-134-safe-error-cho-graph-only-query` |
| **PAC-175** | `US-135` | US-135 - Không cho Staff submit raw Cypher | `story/PAC-175-us-135-khong-cho-staff-submit-raw-cypher` |
| **PAC-176** | `US-136` | US-136 - Graph không quyết định checkout | `story/PAC-176-us-136-graph-khong-quyet-inh-checkout` |
| **PAC-177** | `US-137` | US-137 - Revenue Report | `story/PAC-177-us-137-revenue-report` |
| **PAC-178** | `US-138` | US-138 - Top Medicines Report | `story/PAC-178-us-138-top-medicines-report` |
| **PAC-179** | `US-139` | US-139 - Inventory Report | `story/PAC-179-us-139-inventory-report` |
| **PAC-180** | `US-140` | US-140 - Basic report filters | `story/PAC-180-us-140-basic-report-filters` |
| **PAC-181** | `US-141` | US-141 - Near-expiry threshold setting | `story/PAC-181-us-141-near-expiry-threshold-setting` |
| **PAC-182** | `US-142` | US-142 - AI provider/model backend config | `story/PAC-182-us-142-ai-provider-model-backend-config` |
| **PAC-183** | `US-143` | US-143 - Seed official prompt templates | `story/PAC-183-us-143-seed-official-prompt-templates` |
| **PAC-184** | `US-144` | US-144 - System settings UI tối thiểu | `story/PAC-184-us-144-system-settings-ui-toi-thieu` |
| **PAC-185** | `US-145` | US-145 - Curated MVP seed data | `story/PAC-185-us-145-curated-mvp-seed-data` |
| **PAC-186** | `US-146` | US-146 - Demo users by role | `story/PAC-186-us-146-demo-users-by-role` |
| **PAC-187** | `US-147` | US-147 - Dynamic expiry dates for demo | `story/PAC-187-us-147-dynamic-expiry-dates-for-demo` |
| **PAC-188** | `US-148` | US-148 - FEFO multi-batch demo scenario | `story/PAC-188-us-148-fefo-multi-batch-demo-scenario` |
| **PAC-189** | `US-149` | US-149 - Seed PAID order with HIGH alert | `story/PAC-189-us-149-seed-paid-order-with-high-alert` |
| **PAC-190** | `US-150` | US-150 - Local-only demo reset with graph rebuild and smoke test | `story/PAC-190-us-150-local-only-demo-reset-with-graph-rebuild-and-smoke-te` |
| **PAC-191** | `US-151` | US-151 - Admin Graph Sync Status UI | `story/PAC-191-us-151-admin-graph-sync-status-ui` |
| **PAC-192** | `US-152` | US-152 - Manual graph retry/rebuild UI | `story/PAC-192-us-152-manual-graph-retry-rebuild-ui` |
| **PAC-193** | `US-153` | US-153 - Read-only Graph Explorer | `story/PAC-193-us-153-read-only-graph-explorer` |
| **PAC-194** | `US-154` | US-154 - AI Provider Settings UI | `story/PAC-194-us-154-ai-provider-settings-ui` |
| **PAC-195** | `US-155` | US-155 - Prompt Management UI | `story/PAC-195-us-155-prompt-management-ui` |
| **PAC-196** | `US-156` | US-156 - System Audit Log UI | `story/PAC-196-us-156-system-audit-log-ui` |
| **PAC-197** | `US-157` | US-157 - Supabase Storage for medicine images | `story/PAC-197-us-157-supabase-storage-for-medicine-images` |
| **PAC-198** | `US-158` | US-158 - Supabase Realtime inventory updates | `story/PAC-198-us-158-supabase-realtime-inventory-updates` |
| **PAC-199** | `US-159` | US-159 - Notification Center | `story/PAC-199-us-159-notification-center` |
| **PAC-200** | `US-160` | US-160 - AI Business Report Narrative | `story/PAC-200-us-160-ai-business-report-narrative` |
| **PAC-201** | `US-161` | US-161 - Full Customer Management backlog | `story/PAC-201-us-161-full-customer-management-backlog` |
| **PAC-202** | `US-162` | US-162 - Online Commerce backlog | `story/PAC-202-us-162-online-commerce-backlog` |
| **PAC-203** | `US-163` | US-163 - Product Variant Catalog backlog | `story/PAC-203-us-163-product-variant-catalog-backlog` |
| **PAC-204** | `US-164` | US-164 - Multi-store support backlog | `story/PAC-204-us-164-multi-store-support-backlog` |
| **PAC-205** | `US-165` | US-165 - Multi-warehouse support backlog | `story/PAC-205-us-165-multi-warehouse-support-backlog` |
| **PAC-206** | `US-166` | US-166 - Stock Transfer backlog | `story/PAC-206-us-166-stock-transfer-backlog` |
| **PAC-207** | `US-167` | US-167 - Forecasting & Reorder backlog | `story/PAC-207-us-167-forecasting-reorder-backlog` |
| **PAC-208** | `US-168` | US-168 - Promotion / Coupon backlog | `story/PAC-208-us-168-promotion-coupon-backlog` |
| **PAC-209** | `US-169` | US-169 - Shipping / Delivery backlog | `story/PAC-209-us-169-shipping-delivery-backlog` |
| **PAC-210** | `US-170` | US-170 - Review / CMS backlog | `story/PAC-210-us-170-review-cms-backlog` |

---

## 3. Task Branches

| Jira Key | Logical Key | Tên Task | Nhánh Git tương ứng |
|---|---|---|---|
| **PAC-211** | `TASK-001` | TASK-001 - Configure Supabase Auth client in Next.js | `feature/PAC-211-task-001-configure-supabase-auth-client-in-next-js` |
| **PAC-212** | `TASK-002` | TASK-002 - Build login page UI | `feature/PAC-212-task-002-build-login-page-ui` |
| **PAC-213** | `TASK-003` | TASK-003 - Connect login form to Supabase Auth | `feature/PAC-213-task-003-connect-login-form-to-supabase-auth` |
| **PAC-214** | `TASK-004` | TASK-004 - Handle login loading, success and error states | `feature/PAC-214-task-004-handle-login-loading-success-and-error-states` |
| **PAC-215** | `TASK-005` | TASK-005 - Redirect user after login based on permissions | `feature/PAC-215-task-005-redirect-user-after-login-based-on-permissions` |
| **PAC-216** | `TASK-006` | TASK-006 - Implement logout action and Supabase session cleanup | `feature/PAC-216-task-006-implement-logout-action-and-supabase-session-cleanu` |
| **PAC-217** | `TASK-007` | TASK-007 - Protect frontend routes after logout | `feature/PAC-217-task-007-protect-frontend-routes-after-logout` |
| **PAC-218** | `TASK-008` | TASK-008 - Add login/logout smoke test checklist | `test/PAC-218-task-008-add-login-logout-smoke-test-checklist` |
| **PAC-219** | `TASK-009` | TASK-009 - Configure Supabase token validation in NestJS | `feature/PAC-219-task-009-configure-supabase-token-validation-in-nestjs` |
| **PAC-220** | `TASK-010` | TASK-010 - Implement AuthGuard for protected APIs | `feature/PAC-220-task-010-implement-authguard-for-protected-apis` |
| **PAC-221** | `TASK-011` | TASK-011 - Return 401 for missing or invalid session | `feature/PAC-221-task-011-return-401-for-missing-or-invalid-session` |
| **PAC-222** | `TASK-012` | TASK-012 - Add backend auth unit tests | `test/PAC-222-task-012-add-backend-auth-unit-tests` |
| **PAC-223** | `TASK-013` | TASK-013 - Create user_profiles Prisma model | `feature/PAC-223-task-013-create-user-profiles-prisma-model` |
| **PAC-224** | `TASK-014` | TASK-014 - Create GET /auth/me API | `feature/PAC-224-task-014-create-get-auth-me-api` |
| **PAC-225** | `TASK-015` | TASK-015 - Return current user roles and permissions | `feature/PAC-225-task-015-return-current-user-roles-and-permissions` |
| **PAC-226** | `TASK-016` | TASK-016 - Display current user profile in layout | `feature/PAC-226-task-016-display-current-user-profile-in-layout` |
| **PAC-227** | `TASK-017` | TASK-017 - Create roles Prisma model | `feature/PAC-227-task-017-create-roles-prisma-model` |
| **PAC-228** | `TASK-018` | TASK-018 - Create permissions Prisma model | `feature/PAC-228-task-018-create-permissions-prisma-model` |
| **PAC-229** | `TASK-019` | TASK-019 - Create user_roles Prisma model | `feature/PAC-229-task-019-create-user-roles-prisma-model` |
| **PAC-230** | `TASK-020` | TASK-020 - Create role_permissions Prisma model | `feature/PAC-230-task-020-create-role-permissions-prisma-model` |
| **PAC-231** | `TASK-021` | TASK-021 - Seed Admin, Staff and Warehouse roles | `feature/PAC-231-task-021-seed-admin-staff-and-warehouse-roles` |
| **PAC-232** | `TASK-022` | TASK-022 - Seed MVP permissions | `feature/PAC-232-task-022-seed-mvp-permissions` |
| **PAC-233** | `TASK-023` | TASK-023 - Map permissions to roles | `feature/PAC-233-task-023-map-permissions-to-roles` |
| **PAC-234** | `TASK-024` | TASK-024 - Implement permission decorator | `feature/PAC-234-task-024-implement-permission-decorator` |
| **PAC-235** | `TASK-025` | TASK-025 - Implement permission-based API guard | `feature/PAC-235-task-025-implement-permission-based-api-guard` |
| **PAC-236** | `TASK-026` | TASK-026 - Add permission checks to Auth and User APIs | `feature/PAC-236-task-026-add-permission-checks-to-auth-and-user-apis` |
| **PAC-237** | `TASK-027` | TASK-027 - Add permission checks to Medicine APIs | `feature/PAC-237-task-027-add-permission-checks-to-medicine-apis` |
| **PAC-238** | `TASK-028` | TASK-028 - Add permission checks to Inventory APIs | `feature/PAC-238-task-028-add-permission-checks-to-inventory-apis` |
| **PAC-239** | `TASK-029` | TASK-029 - Add permission checks to POS and Checkout APIs | `feature/PAC-239-task-029-add-permission-checks-to-pos-and-checkout-apis` |
| **PAC-240** | `TASK-030` | TASK-030 - Add 403 response format for forbidden access | `feature/PAC-240-task-030-add-403-response-format-for-forbidden-access` |
| **PAC-241** | `TASK-031` | TASK-031 - Build permission-aware sidebar | `feature/PAC-241-task-031-build-permission-aware-sidebar` |
| **PAC-242** | `TASK-032` | TASK-032 - Hide unauthorized action buttons | `feature/PAC-242-task-032-hide-unauthorized-action-buttons` |
| **PAC-243** | `TASK-033` | TASK-033 - Build forbidden access page | `feature/PAC-243-task-033-build-forbidden-access-page` |
| **PAC-244** | `TASK-034` | TASK-034 - Add frontend permission helper | `feature/PAC-244-task-034-add-frontend-permission-helper` |
| **PAC-245** | `TASK-035` | TASK-035 - Implement Staff ownership query filter for orders | `feature/PAC-245-task-035-implement-staff-ownership-query-filter-for-orders` |
| **PAC-246** | `TASK-036` | TASK-036 - Implement Staff ownership query filter for customer order history | `feature/PAC-246-task-036-implement-staff-ownership-query-filter-for-customer` |
| **PAC-247** | `TASK-037` | TASK-037 - Add tests for Staff ownership scope | `test/PAC-247-task-037-add-tests-for-staff-ownership-scope` |
| **PAC-248** | `TASK-038` | TASK-038 - Block Warehouse access to POS routes | `feature/PAC-248-task-038-block-warehouse-access-to-pos-routes` |
| **PAC-249** | `TASK-039` | TASK-039 - Block Warehouse access to InteractionAlert APIs | `feature/PAC-249-task-039-block-warehouse-access-to-interactionalert-apis` |
| **PAC-250** | `TASK-040` | TASK-040 - Block Warehouse access to checkout APIs | `feature/PAC-250-task-040-block-warehouse-access-to-checkout-apis` |
| **PAC-251** | `TASK-041` | TASK-041 - Build Admin create staff account form | `feature/PAC-251-task-041-build-admin-create-staff-account-form` |
| **PAC-252** | `TASK-042` | TASK-042 - Implement POST /admin/users using Supabase Admin | `feature/PAC-252-task-042-implement-post-admin-users-using-supabase-admin` |
| **PAC-253** | `TASK-043` | TASK-043 - Create user profile after Supabase user creation | `feature/PAC-253-task-043-create-user-profile-after-supabase-user-creation` |
| **PAC-254** | `TASK-044` | TASK-044 - Assign roles to new staff account | `feature/PAC-254-task-044-assign-roles-to-new-staff-account` |
| **PAC-255** | `TASK-045` | TASK-045 - Validate staff email uniqueness through Supabase | `feature/PAC-255-task-045-validate-staff-email-uniqueness-through-supabase` |
| **PAC-256** | `TASK-046` | TASK-046 - Implement first-login password change screen | `feature/PAC-256-task-046-implement-first-login-password-change-screen` |
| **PAC-257** | `TASK-047` | TASK-047 - Implement must_change_password check | `feature/PAC-257-task-047-implement-must-change-password-check` |
| **PAC-258** | `TASK-048` | TASK-048 - Implement password update through Supabase Auth | `feature/PAC-258-task-048-implement-password-update-through-supabase-auth` |
| **PAC-259** | `TASK-049` | TASK-049 - Clear must_change_password after successful change | `feature/PAC-259-task-049-clear-must-change-password-after-successful-change` |
| **PAC-260** | `TASK-050` | TASK-050 - Implement account active/inactive update API | `feature/PAC-260-task-050-implement-account-active-inactive-update-api` |
| **PAC-261** | `TASK-051` | TASK-051 - Build staff account status UI | `feature/PAC-261-task-051-build-staff-account-status-ui` |
| **PAC-262** | `TASK-052` | TASK-052 - Add audit log for staff status change | `feature/PAC-262-task-052-add-audit-log-for-staff-status-change` |
| **PAC-263** | `TASK-053` | TASK-053 - Create medicines Prisma model | `feature/PAC-263-task-053-create-medicines-prisma-model` |
| **PAC-264** | `TASK-054` | TASK-054 - Add medicine code uniqueness constraint | `feature/PAC-264-task-054-add-medicine-code-uniqueness-constraint` |
| **PAC-265** | `TASK-055` | TASK-055 - Implement POST /medicines API | `feature/PAC-265-task-055-implement-post-medicines-api` |
| **PAC-266** | `TASK-056` | TASK-056 - Build medicine create form | `feature/PAC-266-task-056-build-medicine-create-form` |
| **PAC-267** | `TASK-057` | TASK-057 - Add medicine create success/error UI state | `feature/PAC-267-task-057-add-medicine-create-success-error-ui-state` |
| **PAC-268** | `TASK-058` | TASK-058 - Implement PATCH /medicines/{id} API | `feature/PAC-268-task-058-implement-patch-medicines-id-api` |
| **PAC-269** | `TASK-059` | TASK-059 - Build medicine edit form | `feature/PAC-269-task-059-build-medicine-edit-form` |
| **PAC-270** | `TASK-060` | TASK-060 - Add medicine update validation and errors | `feature/PAC-270-task-060-add-medicine-update-validation-and-errors` |
| **PAC-271** | `TASK-061` | TASK-061 - Implement medicine list API with pagination | `feature/PAC-271-task-061-implement-medicine-list-api-with-pagination` |
| **PAC-272** | `TASK-062` | TASK-062 - Implement medicine search by code/name | `feature/PAC-272-task-062-implement-medicine-search-by-code-name` |
| **PAC-273** | `TASK-063` | TASK-063 - Implement medicine filters | `feature/PAC-273-task-063-implement-medicine-filters` |
| **PAC-274** | `TASK-064` | TASK-064 - Build medicine list table | `feature/PAC-274-task-064-build-medicine-list-table` |
| **PAC-275** | `TASK-065` | TASK-065 - Add medicine list empty/loading/error states | `feature/PAC-275-task-065-add-medicine-list-empty-loading-error-states` |
| **PAC-276** | `TASK-066` | TASK-066 - Implement medicine deactivate API | `feature/PAC-276-task-066-implement-medicine-deactivate-api` |
| **PAC-277** | `TASK-067` | TASK-067 - Add deactivate action in medicine UI | `feature/PAC-277-task-067-add-deactivate-action-in-medicine-ui` |
| **PAC-278** | `TASK-068` | TASK-068 - Prevent inactive medicines from POS selection | `feature/PAC-278-task-068-prevent-inactive-medicines-from-pos-selection` |
| **PAC-279** | `TASK-069` | TASK-069 - Enforce selling_price greater than 0 in backend | `feature/PAC-279-task-069-enforce-selling-price-greater-than-0-in-backend` |
| **PAC-280** | `TASK-070` | TASK-070 - Add selling price validation in UI | `feature/PAC-280-task-070-add-selling-price-validation-in-ui` |
| **PAC-281** | `TASK-071` | TASK-071 - Add tests for medicine price validation | `test/PAC-281-task-071-add-tests-for-medicine-price-validation` |
| **PAC-282** | `TASK-072` | TASK-072 - Create active_ingredients Prisma model | `feature/PAC-282-task-072-create-active-ingredients-prisma-model` |
| **PAC-283** | `TASK-073` | TASK-073 - Implement ActiveIngredient create API | `feature/PAC-283-task-073-implement-activeingredient-create-api` |
| **PAC-284** | `TASK-074` | TASK-074 - Implement ActiveIngredient update API | `feature/PAC-284-task-074-implement-activeingredient-update-api` |
| **PAC-285** | `TASK-075` | TASK-075 - Implement ActiveIngredient list/search API | `feature/PAC-285-task-075-implement-activeingredient-list-search-api` |
| **PAC-286** | `TASK-076` | TASK-076 - Build ActiveIngredient management screen | `feature/PAC-286-task-076-build-activeingredient-management-screen` |
| **PAC-287** | `TASK-077` | TASK-077 - Add ActiveIngredient create/edit form validation | `feature/PAC-287-task-077-add-activeingredient-create-edit-form-validation` |
| **PAC-288** | `TASK-078` | TASK-078 - Create medicine_active_ingredients mapping schema | `feature/PAC-288-task-078-create-medicine-active-ingredients-mapping-schema` |
| **PAC-289** | `TASK-079` | TASK-079 - Implement Medicine-Ingredient mapping API | `feature/PAC-289-task-079-implement-medicine-ingredient-mapping-api` |
| **PAC-290** | `TASK-080` | TASK-080 - Build ingredient mapping component in Medicine form | `feature/PAC-290-task-080-build-ingredient-mapping-component-in-medicine-form` |
| **PAC-291** | `TASK-081` | TASK-081 - Show mapped ingredients in medicine detail | `feature/PAC-291-task-081-show-mapped-ingredients-in-medicine-detail` |
| **PAC-292** | `TASK-082` | TASK-082 - Add unique validation for ingredient mapping | `feature/PAC-292-task-082-add-unique-validation-for-ingredient-mapping` |
| **PAC-293** | `TASK-083` | TASK-083 - Prevent mapping inactive ingredient if not allowed | `feature/PAC-293-task-083-prevent-mapping-inactive-ingredient-if-not-allowed` |
| **PAC-294** | `TASK-084` | TASK-084 - Normalize ActiveIngredient names | `feature/PAC-294-task-084-normalize-activeingredient-names` |
| **PAC-295** | `TASK-085` | TASK-085 - Reject raw scraped ingredient strings in official mapping | `feature/PAC-295-task-085-reject-raw-scraped-ingredient-strings-in-official-m` |
| **PAC-296** | `TASK-086` | TASK-086 - Add ActiveIngredient data quality review checklist | `feature/PAC-296-task-086-add-activeingredient-data-quality-review-checklist` |
| **PAC-297** | `TASK-087` | TASK-087 - Create graph sync event when Medicine changes | `feature/PAC-297-task-087-create-graph-sync-event-when-medicine-changes` |
| **PAC-298** | `TASK-088` | TASK-088 - Create graph sync event when ActiveIngredient changes | `feature/PAC-298-task-088-create-graph-sync-event-when-activeingredient-chang` |
| **PAC-299** | `TASK-089` | TASK-089 - Create graph sync event when Ingredient mapping changes | `feature/PAC-299-task-089-create-graph-sync-event-when-ingredient-mapping-cha` |
| **PAC-300** | `TASK-090` | TASK-090 - Create suppliers Prisma model | `feature/PAC-300-task-090-create-suppliers-prisma-model` |
| **PAC-301** | `TASK-091` | TASK-091 - Implement supplier create API | `feature/PAC-301-task-091-implement-supplier-create-api` |
| **PAC-302** | `TASK-092` | TASK-092 - Build supplier create form | `feature/PAC-302-task-092-build-supplier-create-form` |
| **PAC-303** | `TASK-093` | TASK-093 - Validate supplier required fields | `feature/PAC-303-task-093-validate-supplier-required-fields` |
| **PAC-304** | `TASK-094` | TASK-094 - Implement supplier list/search API | `feature/PAC-304-task-094-implement-supplier-list-search-api` |
| **PAC-305** | `TASK-095` | TASK-095 - Implement supplier update API | `feature/PAC-305-task-095-implement-supplier-update-api` |
| **PAC-306** | `TASK-096` | TASK-096 - Build supplier list and edit screen | `feature/PAC-306-task-096-build-supplier-list-and-edit-screen` |
| **PAC-307** | `TASK-097` | TASK-097 - Implement Admin-only supplier deactivate API | `feature/PAC-307-task-097-implement-admin-only-supplier-deactivate-api` |
| **PAC-308** | `TASK-098` | TASK-098 - Add supplier deactivate confirmation UI | `feature/PAC-308-task-098-add-supplier-deactivate-confirmation-ui` |
| **PAC-309** | `TASK-099` | TASK-099 - Prevent inactive supplier in new Stock Import | `feature/PAC-309-task-099-prevent-inactive-supplier-in-new-stock-import` |
| **PAC-310** | `TASK-100` | TASK-100 - Link active supplier selection to Stock Import | `feature/PAC-310-task-100-link-active-supplier-selection-to-stock-import` |
| **PAC-311** | `TASK-101` | TASK-101 - Build supplier selector for Stock Import UI | `feature/PAC-311-task-101-build-supplier-selector-for-stock-import-ui` |
| **PAC-312** | `TASK-102` | TASK-102 - Create medicine_batches Prisma model | `feature/PAC-312-task-102-create-medicine-batches-prisma-model` |
| **PAC-313** | `TASK-103` | TASK-103 - Add MedicineBatch indexes and constraints | `feature/PAC-313-task-103-add-medicinebatch-indexes-and-constraints` |
| **PAC-314** | `TASK-104` | TASK-104 - Remove aggregate inventory source-of-truth assumptions | `feature/PAC-314-task-104-remove-aggregate-inventory-source-of-truth-assumpti` |
| **PAC-315** | `TASK-105` | TASK-105 - Document MedicineBatch as inventory source of truth | `docs/PAC-315-task-105-document-medicinebatch-as-inventory-source-of-truth` |
| **PAC-316** | `TASK-106` | TASK-106 - Enforce required batch_number | `feature/PAC-316-task-106-enforce-required-batch-number` |
| **PAC-317** | `TASK-107` | TASK-107 - Normalize batch_number before comparison | `feature/PAC-317-task-107-normalize-batch-number-before-comparison` |
| **PAC-318** | `TASK-108` | TASK-108 - Add UI validation for batch_number | `feature/PAC-318-task-108-add-ui-validation-for-batch-number` |
| **PAC-319** | `TASK-109` | TASK-109 - Implement batch identity validation service | `feature/PAC-319-task-109-implement-batch-identity-validation-service` |
| **PAC-320** | `TASK-110` | TASK-110 - Add migration constraint for medicine/batch/expiry uniqueness | `feature/PAC-320-task-110-add-migration-constraint-for-medicine-batch-expiry-` |
| **PAC-321** | `TASK-111` | TASK-111 - Add batch identity unit tests | `test/PAC-321-task-111-add-batch-identity-unit-tests` |
| **PAC-322** | `TASK-112` | TASK-112 - Implement inventory summary query from MedicineBatch | `feature/PAC-322-task-112-implement-inventory-summary-query-from-medicinebatc` |
| **PAC-323** | `TASK-113` | TASK-113 - Build Inventory Summary screen | `feature/PAC-323-task-113-build-inventory-summary-screen` |
| **PAC-324** | `TASK-114` | TASK-114 - Add search/filter to Inventory Summary | `feature/PAC-324-task-114-add-search-filter-to-inventory-summary` |
| **PAC-325** | `TASK-115` | TASK-115 - Implement Batch Detail API | `feature/PAC-325-task-115-implement-batch-detail-api` |
| **PAC-326** | `TASK-116` | TASK-116 - Build Batch Detail screen | `feature/PAC-326-task-116-build-batch-detail-screen` |
| **PAC-327** | `TASK-117` | TASK-117 - Display expired/near-expiry/sellable batch status | `feature/PAC-327-task-117-display-expired-near-expiry-sellable-batch-status` |
| **PAC-328** | `TASK-118` | TASK-118 - Implement sellable quantity calculation service | `feature/PAC-328-task-118-implement-sellable-quantity-calculation-service` |
| **PAC-329** | `TASK-119` | TASK-119 - Add tests for sellable quantity calculation | `test/PAC-329-task-119-add-tests-for-sellable-quantity-calculation` |
| **PAC-330** | `TASK-120` | TASK-120 - Exclude expired batches from sellable stock | `feature/PAC-330-task-120-exclude-expired-batches-from-sellable-stock` |
| **PAC-331** | `TASK-121` | TASK-121 - Add tests for expired batch exclusion | `test/PAC-331-task-121-add-tests-for-expired-batch-exclusion` |
| **PAC-332** | `TASK-122` | TASK-122 - Implement low-stock calculation from sellable quantity | `feature/PAC-332-task-122-implement-low-stock-calculation-from-sellable-quant` |
| **PAC-333** | `TASK-123` | TASK-123 - Display low-stock state for Admin/Warehouse | `feature/PAC-333-task-123-display-low-stock-state-for-admin-warehouse` |
| **PAC-334** | `TASK-124` | TASK-124 - Hide general low-stock dashboard from Staff | `feature/PAC-334-task-124-hide-general-low-stock-dashboard-from-staff` |
| **PAC-335** | `TASK-125` | TASK-125 - Implement near-expiry calculation with threshold | `feature/PAC-335-task-125-implement-near-expiry-calculation-with-threshold` |
| **PAC-336** | `TASK-126` | TASK-126 - Display near-expiry batch state | `feature/PAC-336-task-126-display-near-expiry-batch-state` |
| **PAC-337** | `TASK-127` | TASK-127 - Build Admin/Warehouse inventory dashboard cards | `feature/PAC-337-task-127-build-admin-warehouse-inventory-dashboard-cards` |
| **PAC-338** | `TASK-128` | TASK-128 - Build POS sellable stock display | `feature/PAC-338-task-128-build-pos-sellable-stock-display` |
| **PAC-339** | `TASK-129` | TASK-129 - Remove direct quantity edit from Batch Detail UI | `feature/PAC-339-task-129-remove-direct-quantity-edit-from-batch-detail-ui` |
| **PAC-340** | `TASK-130` | TASK-130 - Ensure no public API directly edits batch quantity | `feature/PAC-340-task-130-ensure-no-public-api-directly-edits-batch-quantity` |
| **PAC-341** | `TASK-131` | TASK-131 - Create stock_imports Prisma model | `feature/PAC-341-task-131-create-stock-imports-prisma-model` |
| **PAC-342** | `TASK-132` | TASK-132 - Implement create Stock Import draft API | `feature/PAC-342-task-132-implement-create-stock-import-draft-api` |
| **PAC-343** | `TASK-133` | TASK-133 - Build create Stock Import screen | `feature/PAC-343-task-133-build-create-stock-import-screen` |
| **PAC-344** | `TASK-134` | TASK-134 - Create stock_import_lines Prisma model | `feature/PAC-344-task-134-create-stock-import-lines-prisma-model` |
| **PAC-345** | `TASK-135` | TASK-135 - Implement add stock import line API | `feature/PAC-345-task-135-implement-add-stock-import-line-api` |
| **PAC-346** | `TASK-136` | TASK-136 - Build stock import line editor UI | `feature/PAC-346-task-136-build-stock-import-line-editor-ui` |
| **PAC-347** | `TASK-137` | TASK-137 - Implement update draft import line API | `feature/PAC-347-task-137-implement-update-draft-import-line-api` |
| **PAC-348** | `TASK-138` | TASK-138 - Implement delete draft import line API | `feature/PAC-348-task-138-implement-delete-draft-import-line-api` |
| **PAC-349** | `TASK-139` | TASK-139 - Disable edit/delete for confirmed import lines | `feature/PAC-349-task-139-disable-edit-delete-for-confirmed-import-lines` |
| **PAC-350** | `TASK-140` | TASK-140 - Validate active supplier before confirm import | `feature/PAC-350-task-140-validate-active-supplier-before-confirm-import` |
| **PAC-351** | `TASK-141` | TASK-141 - Validate batch number in import line | `feature/PAC-351-task-141-validate-batch-number-in-import-line` |
| **PAC-352** | `TASK-142` | TASK-142 - Validate expiry date in import line | `feature/PAC-352-task-142-validate-expiry-date-in-import-line` |
| **PAC-353** | `TASK-143` | TASK-143 - Implement confirm Stock Import transaction skeleton | `feature/PAC-353-task-143-implement-confirm-stock-import-transaction-skeleton` |
| **PAC-354** | `TASK-144` | TASK-144 - Apply stock import lines to MedicineBatch | `feature/PAC-354-task-144-apply-stock-import-lines-to-medicinebatch` |
| **PAC-355** | `TASK-145` | TASK-145 - Rollback Stock Import confirm on any invalid line | `feature/PAC-355-task-145-rollback-stock-import-confirm-on-any-invalid-line` |
| **PAC-356** | `TASK-146` | TASK-146 - Implement batch merge when medicine/batch/expiry match | `feature/PAC-356-task-146-implement-batch-merge-when-medicine-batch-expiry-ma` |
| **PAC-357** | `TASK-147` | TASK-147 - Add unit tests for valid batch merge rule | `test/PAC-357-task-147-add-unit-tests-for-valid-batch-merge-rule` |
| **PAC-358** | `TASK-148` | TASK-148 - Show batch merge result after Stock Import confirm | `feature/PAC-358-task-148-show-batch-merge-result-after-stock-import-confirm` |
| **PAC-359** | `TASK-149` | TASK-149 - Implement expiry mismatch rejection | `feature/PAC-359-task-149-implement-expiry-mismatch-rejection` |
| **PAC-360** | `TASK-150` | TASK-150 - Return line-level expiry mismatch errors | `feature/PAC-360-task-150-return-line-level-expiry-mismatch-errors` |
| **PAC-361** | `TASK-151` | TASK-151 - Add tests for expiry mismatch rejection | `test/PAC-361-task-151-add-tests-for-expiry-mismatch-rejection` |
| **PAC-362** | `TASK-152` | TASK-152 - Lock confirmed Stock Import status | `feature/PAC-362-task-152-lock-confirmed-stock-import-status` |
| **PAC-363** | `TASK-153` | TASK-153 - Build confirmed Stock Import read-only UI | `feature/PAC-363-task-153-build-confirmed-stock-import-read-only-ui` |
| **PAC-364** | `TASK-154` | TASK-154 - Prevent duplicate Stock Import confirm | `feature/PAC-364-task-154-prevent-duplicate-stock-import-confirm` |
| **PAC-365** | `TASK-155` | TASK-155 - Add tests for confirmed Stock Import immutability | `test/PAC-365-task-155-add-tests-for-confirmed-stock-import-immutability` |
| **PAC-366** | `TASK-156` | TASK-156 - Write audit log for Stock Import confirm | `feature/PAC-366-task-156-write-audit-log-for-stock-import-confirm` |
| **PAC-367** | `TASK-157` | TASK-157 - Show Stock Import audit metadata in detail UI | `feature/PAC-367-task-157-show-stock-import-audit-metadata-in-detail-ui` |
| **PAC-368** | `TASK-158` | TASK-158 - Add Stock Import traceability notes | `feature/PAC-368-task-158-add-stock-import-traceability-notes` |
| **PAC-369** | `TASK-159` | TASK-159 - Add Stock Import confirm integration tests | `test/PAC-369-task-159-add-stock-import-confirm-integration-tests` |
| **PAC-370** | `TASK-160` | TASK-160 - Add Stock Import smoke test checklist | `test/PAC-370-task-160-add-stock-import-smoke-test-checklist` |
| **PAC-371** | `TASK-161` | TASK-161 - Create inventory_adjustments Prisma model | `feature/PAC-371-task-161-create-inventory-adjustments-prisma-model` |
| **PAC-372** | `TASK-162` | TASK-162 - Create inventory_adjustment_lines Prisma model | `feature/PAC-372-task-162-create-inventory-adjustment-lines-prisma-model` |
| **PAC-373** | `TASK-163` | TASK-163 - Implement create Inventory Adjustment API | `feature/PAC-373-task-163-implement-create-inventory-adjustment-api` |
| **PAC-374** | `TASK-164` | TASK-164 - Build create Inventory Adjustment screen | `feature/PAC-374-task-164-build-create-inventory-adjustment-screen` |
| **PAC-375** | `TASK-165` | TASK-165 - Build MedicineBatch selector for adjustment | `feature/PAC-375-task-165-build-medicinebatch-selector-for-adjustment` |
| **PAC-376** | `TASK-166` | TASK-166 - Validate adjustment type and quantity | `feature/PAC-376-task-166-validate-adjustment-type-and-quantity` |
| **PAC-377** | `TASK-167` | TASK-167 - Enforce required adjustment reason in backend | `feature/PAC-377-task-167-enforce-required-adjustment-reason-in-backend` |
| **PAC-378** | `TASK-168` | TASK-168 - Add required reason validation in UI | `feature/PAC-378-task-168-add-required-reason-validation-in-ui` |
| **PAC-379** | `TASK-169` | TASK-169 - Show batch before/after quantity preview | `feature/PAC-379-task-169-show-batch-before-after-quantity-preview` |
| **PAC-380** | `TASK-170` | TASK-170 - Implement confirm Inventory Adjustment transaction | `feature/PAC-380-task-170-implement-confirm-inventory-adjustment-transaction` |
| **PAC-381** | `TASK-171` | TASK-171 - Update MedicineBatch through adjustment transaction only | `feature/PAC-381-task-171-update-medicinebatch-through-adjustment-transaction` |
| **PAC-382** | `TASK-172` | TASK-172 - Prevent adjustment from making quantity negative | `feature/PAC-382-task-172-prevent-adjustment-from-making-quantity-negative` |
| **PAC-383** | `TASK-173` | TASK-173 - Lock confirmed Inventory Adjustment | `feature/PAC-383-task-173-lock-confirmed-inventory-adjustment` |
| **PAC-384** | `TASK-174` | TASK-174 - Create Inventory Adjustment list API | `feature/PAC-384-task-174-create-inventory-adjustment-list-api` |
| **PAC-385** | `TASK-175` | TASK-175 - Build Inventory Adjustment history list UI | `feature/PAC-385-task-175-build-inventory-adjustment-history-list-ui` |
| **PAC-386** | `TASK-176` | TASK-176 - Implement Inventory Adjustment detail API | `feature/PAC-386-task-176-implement-inventory-adjustment-detail-api` |
| **PAC-387** | `TASK-177` | TASK-177 - Build Inventory Adjustment detail screen | `feature/PAC-387-task-177-build-inventory-adjustment-detail-screen` |
| **PAC-388** | `TASK-178` | TASK-178 - Add Warehouse permission for create/confirm adjustment | `feature/PAC-388-task-178-add-warehouse-permission-for-create-confirm-adjustm` |
| **PAC-389** | `TASK-179` | TASK-179 - Add Admin permission for adjustment history and review | `feature/PAC-389-task-179-add-admin-permission-for-adjustment-history-and-rev` |
| **PAC-390** | `TASK-180` | TASK-180 - Write audit log for Inventory Adjustment | `feature/PAC-390-task-180-write-audit-log-for-inventory-adjustment` |
| **PAC-391** | `TASK-181` | TASK-181 - Display adjustment audit information in UI | `feature/PAC-391-task-181-display-adjustment-audit-information-in-ui` |
| **PAC-392** | `TASK-182` | TASK-182 - Add tests for negative quantity adjustment | `test/PAC-392-task-182-add-tests-for-negative-quantity-adjustment` |
| **PAC-393** | `TASK-183` | TASK-183 - Add tests for required adjustment reason | `test/PAC-393-task-183-add-tests-for-required-adjustment-reason` |
| **PAC-394** | `TASK-184` | TASK-184 - Add tests for Warehouse adjustment permission | `test/PAC-394-task-184-add-tests-for-warehouse-adjustment-permission` |
| **PAC-395** | `TASK-185` | TASK-185 - Block direct MedicineBatch quantity update service path | `feature/PAC-395-task-185-block-direct-medicinebatch-quantity-update-service-` |
| **PAC-396** | `TASK-186` | TASK-186 - Implement cancel Draft Inventory Adjustment API | `feature/PAC-396-task-186-implement-cancel-draft-inventory-adjustment-api` |
| **PAC-397** | `TASK-187` | TASK-187 - Build cancel Draft Inventory Adjustment UI | `feature/PAC-397-task-187-build-cancel-draft-inventory-adjustment-ui` |
| **PAC-398** | `TASK-188` | TASK-188 - Refresh Inventory Summary after adjustment confirm | `feature/PAC-398-task-188-refresh-inventory-summary-after-adjustment-confirm` |
| **PAC-399** | `TASK-189` | TASK-189 - Add Inventory Adjustment smoke test checklist | `test/PAC-399-task-189-add-inventory-adjustment-smoke-test-checklist` |
| **PAC-400** | `TASK-190` | TASK-190 - Add Inventory Adjustment traceability notes | `feature/PAC-400-task-190-add-inventory-adjustment-traceability-notes` |
| **PAC-401** | `TASK-191` | TASK-191 - Create orders Prisma model | `feature/PAC-401-task-191-create-orders-prisma-model` |
| **PAC-402** | `TASK-192` | TASK-192 - Create order_items Prisma model | `feature/PAC-402-task-192-create-order-items-prisma-model` |
| **PAC-403** | `TASK-193` | TASK-193 - Add order status enum DRAFT/PAID/CANCELLED | `feature/PAC-403-task-193-add-order-status-enum-draft-paid-cancelled` |
| **PAC-404** | `TASK-194` | TASK-194 - Implement create Draft Order API | `feature/PAC-404-task-194-implement-create-draft-order-api` |
| **PAC-405** | `TASK-195` | TASK-195 - Build POS Draft Order screen | `feature/PAC-405-task-195-build-pos-draft-order-screen` |
| **PAC-406** | `TASK-196` | TASK-196 - Implement POS medicine search API | `feature/PAC-406-task-196-implement-pos-medicine-search-api` |
| **PAC-407** | `TASK-197` | TASK-197 - Build POS medicine search component | `feature/PAC-407-task-197-build-pos-medicine-search-component` |
| **PAC-408** | `TASK-198` | TASK-198 - Display sellable stock in POS search results | `feature/PAC-408-task-198-display-sellable-stock-in-pos-search-results` |
| **PAC-409** | `TASK-199` | TASK-199 - Implement add item to Draft Order API | `feature/PAC-409-task-199-implement-add-item-to-draft-order-api` |
| **PAC-410** | `TASK-200` | TASK-200 - Build add-to-order action in POS | `feature/PAC-410-task-200-build-add-to-order-action-in-pos` |
| **PAC-411** | `TASK-201` | TASK-201 - Validate active medicine when adding POS item | `feature/PAC-411-task-201-validate-active-medicine-when-adding-pos-item` |
| **PAC-412** | `TASK-202` | TASK-202 - Implement update Draft Order item quantity API | `feature/PAC-412-task-202-implement-update-draft-order-item-quantity-api` |
| **PAC-413** | `TASK-203` | TASK-203 - Build quantity controls in Draft Order UI | `feature/PAC-413-task-203-build-quantity-controls-in-draft-order-ui` |
| **PAC-414** | `TASK-204` | TASK-204 - Validate Draft Order quantity greater than zero | `feature/PAC-414-task-204-validate-draft-order-quantity-greater-than-zero` |
| **PAC-415** | `TASK-205` | TASK-205 - Validate sellable stock when updating Draft Order quantity | `feature/PAC-415-task-205-validate-sellable-stock-when-updating-draft-order-q` |
| **PAC-416** | `TASK-206` | TASK-206 - Implement remove item from Draft Order API | `feature/PAC-416-task-206-implement-remove-item-from-draft-order-api` |
| **PAC-417** | `TASK-207` | TASK-207 - Build remove item action in POS | `feature/PAC-417-task-207-build-remove-item-action-in-pos` |
| **PAC-418** | `TASK-208` | TASK-208 - Implement Draft Order total calculation service | `feature/PAC-418-task-208-implement-draft-order-total-calculation-service` |
| **PAC-419** | `TASK-209` | TASK-209 - Display Draft Order totals in POS UI | `feature/PAC-419-task-209-display-draft-order-totals-in-pos-ui` |
| **PAC-420** | `TASK-210` | TASK-210 - Ensure no coupon or discount logic in MVP Draft Order total | `feature/PAC-420-task-210-ensure-no-coupon-or-discount-logic-in-mvp-draft-ord` |
| **PAC-421** | `TASK-211` | TASK-211 - Show POS stock validation errors | `feature/PAC-421-task-211-show-pos-stock-validation-errors` |
| **PAC-422** | `TASK-212` | TASK-212 - Implement walk-in customer support in order model | `feature/PAC-422-task-212-implement-walk-in-customer-support-in-order-model` |
| **PAC-423** | `TASK-213` | TASK-213 - Display walk-in customer option in POS | `feature/PAC-423-task-213-display-walk-in-customer-option-in-pos` |
| **PAC-424** | `TASK-214` | TASK-214 - Keep full Customer Management out of MVP POS flow | `feature/PAC-424-task-214-keep-full-customer-management-out-of-mvp-pos-flow` |
| **PAC-425** | `TASK-215` | TASK-215 - Apply Staff ownership scope to order list API | `feature/PAC-425-task-215-apply-staff-ownership-scope-to-order-list-api` |
| **PAC-426** | `TASK-216` | TASK-216 - Build Staff scoped order list UI | `feature/PAC-426-task-216-build-staff-scoped-order-list-ui` |
| **PAC-427** | `TASK-217` | TASK-217 - Implement Admin all-orders list API | `feature/PAC-427-task-217-implement-admin-all-orders-list-api` |
| **PAC-428** | `TASK-218` | TASK-218 - Build Admin all-orders UI | `feature/PAC-428-task-218-build-admin-all-orders-ui` |
| **PAC-429** | `TASK-219` | TASK-219 - Implement cancel Draft Order API | `feature/PAC-429-task-219-implement-cancel-draft-order-api` |
| **PAC-430** | `TASK-220` | TASK-220 - Build cancel Draft Order UI | `feature/PAC-430-task-220-build-cancel-draft-order-ui` |
| **PAC-431** | `TASK-221` | TASK-221 - Prevent cancel PAID or already CANCELLED order | `feature/PAC-431-task-221-prevent-cancel-paid-or-already-cancelled-order` |
| **PAC-432** | `TASK-222` | TASK-222 - Preserve Draft Order after checkout failure in UI | `feature/PAC-432-task-222-preserve-draft-order-after-checkout-failure-in-ui` |
| **PAC-433** | `TASK-223` | TASK-223 - Restore checkout error state back to Draft Order | `feature/PAC-433-task-223-restore-checkout-error-state-back-to-draft-order` |
| **PAC-434** | `TASK-224` | TASK-224 - Build Order Detail screen for DRAFT/PAID/CANCELLED | `feature/PAC-434-task-224-build-order-detail-screen-for-draft-paid-cancelled` |
| **PAC-435** | `TASK-225` | TASK-225 - Add POS API integration tests | `test/PAC-435-task-225-add-pos-api-integration-tests` |
| **PAC-436** | `TASK-226` | TASK-226 - Add POS frontend smoke test checklist | `test/PAC-436-task-226-add-pos-frontend-smoke-test-checklist` |
| **PAC-437** | `TASK-227` | TASK-227 - Create drug_interaction_rules Prisma model | `feature/PAC-437-task-227-create-drug-interaction-rules-prisma-model` |
| **PAC-438** | `TASK-228` | TASK-228 - Implement create ActiveIngredient-level interaction rule API | `feature/PAC-438-task-228-implement-create-activeingredient-level-interaction` |
| **PAC-439** | `TASK-229` | TASK-229 - Build DrugInteraction Rule management screen | `feature/PAC-439-task-229-build-druginteraction-rule-management-screen` |
| **PAC-440** | `TASK-230` | TASK-230 - Validate two active ingredients in interaction rule | `feature/PAC-440-task-230-validate-two-active-ingredients-in-interaction-rule` |
| **PAC-441** | `TASK-231` | TASK-231 - Implement update DrugInteraction Rule API | `feature/PAC-441-task-231-implement-update-druginteraction-rule-api` |
| **PAC-442** | `TASK-232` | TASK-232 - Implement deactivate DrugInteraction Rule API | `feature/PAC-442-task-232-implement-deactivate-druginteraction-rule-api` |
| **PAC-443** | `TASK-233` | TASK-233 - Trigger Graph Sync event on interaction rule change | `feature/PAC-443-task-233-trigger-graph-sync-event-on-interaction-rule-change` |
| **PAC-444** | `TASK-234` | TASK-234 - Validate severity enum LOW/MEDIUM/HIGH only | `feature/PAC-444-task-234-validate-severity-enum-low-medium-high-only` |
| **PAC-445** | `TASK-235` | TASK-235 - Implement derive interaction from medicine active ingredients | `feature/PAC-445-task-235-implement-derive-interaction-from-medicine-active-i` |
| **PAC-446** | `TASK-236` | TASK-236 - Add tests for derived medicine interactions | `test/PAC-446-task-236-add-tests-for-derived-medicine-interactions` |
| **PAC-447** | `TASK-237` | TASK-237 - Implement order interaction check service | `feature/PAC-447-task-237-implement-order-interaction-check-service` |
| **PAC-448** | `TASK-238` | TASK-238 - Implement POST /orders/{id}/interactions/check API | `feature/PAC-448-task-238-implement-post-orders-id-interactions-check-api` |
| **PAC-449** | `TASK-239` | TASK-239 - Create interaction_alerts Prisma model | `feature/PAC-449-task-239-create-interaction-alerts-prisma-model` |
| **PAC-450** | `TASK-240` | TASK-240 - Persist displayed InteractionAlert snapshot fields | `feature/PAC-450-task-240-persist-displayed-interactionalert-snapshot-fields` |
| **PAC-451** | `TASK-241` | TASK-241 - Enforce one active alert per order and interaction rule | `feature/PAC-451-task-241-enforce-one-active-alert-per-order-and-interaction-` |
| **PAC-452** | `TASK-242` | TASK-242 - Update display_count and last_displayed_at | `feature/PAC-452-task-242-update-display-count-and-last-displayed-at` |
| **PAC-453** | `TASK-243` | TASK-243 - Build POS InteractionAlert panel | `feature/PAC-453-task-243-build-pos-interactionalert-panel` |
| **PAC-454** | `TASK-244` | TASK-244 - Implement LOW/MEDIUM/HIGH alert display logic | `feature/PAC-454-task-244-implement-low-medium-high-alert-display-logic` |
| **PAC-455** | `TASK-245` | TASK-245 - Build HIGH alert acknowledgement UI | `feature/PAC-455-task-245-build-high-alert-acknowledgement-ui` |
| **PAC-456** | `TASK-246` | TASK-246 - Implement acknowledge InteractionAlert API | `feature/PAC-456-task-246-implement-acknowledge-interactionalert-api` |
| **PAC-457** | `TASK-247` | TASK-247 - Build HIGH alert consultation note UI | `feature/PAC-457-task-247-build-high-alert-consultation-note-ui` |
| **PAC-458** | `TASK-248` | TASK-248 - Implement consultation note API per HIGH alert | `feature/PAC-458-task-248-implement-consultation-note-api-per-high-alert` |
| **PAC-459** | `TASK-249` | TASK-249 - Validate HIGH alert consultation note is not empty | `feature/PAC-459-task-249-validate-high-alert-consultation-note-is-not-empty` |
| **PAC-460** | `TASK-250` | TASK-250 - Implement checkout blocker for unresolved HIGH alerts | `feature/PAC-460-task-250-implement-checkout-blocker-for-unresolved-high-aler` |
| **PAC-461** | `TASK-251` | TASK-251 - Build UI prompt when checkout is blocked by HIGH alert | `feature/PAC-461-task-251-build-ui-prompt-when-checkout-is-blocked-by-high-al` |
| **PAC-462** | `TASK-252` | TASK-252 - Build Admin InteractionAlert History API and UI | `feature/PAC-462-task-252-build-admin-interactionalert-history-api-and-ui` |
| **PAC-463** | `TASK-253` | TASK-253 - Enforce Warehouse no-access to InteractionAlert APIs | `feature/PAC-463-task-253-enforce-warehouse-no-access-to-interactionalert-api` |
| **PAC-464** | `TASK-254` | TASK-254 - Add tests for Warehouse no-access to InteractionAlert | `test/PAC-464-task-254-add-tests-for-warehouse-no-access-to-interactionale` |
| **PAC-465** | `TASK-255` | TASK-255 - Add InteractionAlert lifecycle integration tests | `test/PAC-465-task-255-add-interactionalert-lifecycle-integration-tests` |
| **PAC-466** | `TASK-256` | TASK-256 - Add HIGH acknowledgement and consultation note tests | `test/PAC-466-task-256-add-high-acknowledgement-and-consultation-note-test` |
| **PAC-467** | `TASK-257` | TASK-257 - Add filters to InteractionAlert History | `feature/PAC-467-task-257-add-filters-to-interactionalert-history` |
| **PAC-468** | `TASK-258` | TASK-258 - Add InteractionAlert snapshot and traceability notes | `feature/PAC-468-task-258-add-interactionalert-snapshot-and-traceability-note` |
| **PAC-469** | `TASK-259` | TASK-259 - Define Checkout DTO and validation schema | `feature/PAC-469-task-259-define-checkout-dto-and-validation-schema` |
| **PAC-470** | `TASK-260` | TASK-260 - Implement CheckoutController POST /checkout | `feature/PAC-470-task-260-implement-checkoutcontroller-post-checkout` |
| **PAC-471** | `TASK-261` | TASK-261 - Implement CheckoutService transaction skeleton | `feature/PAC-471-task-261-implement-checkoutservice-transaction-skeleton` |
| **PAC-472** | `TASK-262` | TASK-262 - Validate checkout actor permission and order ownership | `feature/PAC-472-task-262-validate-checkout-actor-permission-and-order-owners` |
| **PAC-473** | `TASK-263` | TASK-263 - Validate order exists and status is DRAFT | `feature/PAC-473-task-263-validate-order-exists-and-status-is-draft` |
| **PAC-474** | `TASK-264` | TASK-264 - Validate unresolved HIGH alerts before payment | `feature/PAC-474-task-264-validate-unresolved-high-alerts-before-payment` |
| **PAC-475** | `TASK-265` | TASK-265 - Validate sellable stock inside checkout transaction | `feature/PAC-475-task-265-validate-sellable-stock-inside-checkout-transaction` |
| **PAC-476** | `TASK-266` | TASK-266 - Build Checkout full page or full-height panel UI | `feature/PAC-476-task-266-build-checkout-full-page-or-full-height-panel-ui` |
| **PAC-477** | `TASK-267` | TASK-267 - Build payment method selector in Checkout UI | `feature/PAC-477-task-267-build-payment-method-selector-in-checkout-ui` |
| **PAC-478** | `TASK-268` | TASK-268 - Define FEFO allocation input/output model | `feature/PAC-478-task-268-define-fefo-allocation-input-output-model` |
| **PAC-479** | `TASK-269` | TASK-269 - Query sellable MedicineBatch for FEFO | `feature/PAC-479-task-269-query-sellable-medicinebatch-for-fefo` |
| **PAC-480** | `TASK-270` | TASK-270 - Sort FEFO batches by nearest expiry date | `feature/PAC-480-task-270-sort-fefo-batches-by-nearest-expiry-date` |
| **PAC-481** | `TASK-271` | TASK-271 - Allocate requested quantity across multiple batches | `feature/PAC-481-task-271-allocate-requested-quantity-across-multiple-batches` |
| **PAC-482** | `TASK-272` | TASK-272 - Reject FEFO allocation when sellable stock is insufficient | `feature/PAC-482-task-272-reject-fefo-allocation-when-sellable-stock-is-insuf` |
| **PAC-483** | `TASK-273` | TASK-273 - Create order_batch_allocations Prisma model | `feature/PAC-483-task-273-create-order-batch-allocations-prisma-model` |
| **PAC-484** | `TASK-274` | TASK-274 - Persist order_batch_allocations during checkout | `feature/PAC-484-task-274-persist-order-batch-allocations-during-checkout` |
| **PAC-485** | `TASK-275` | TASK-275 - Deduct MedicineBatch quantities inside checkout transaction | `feature/PAC-485-task-275-deduct-medicinebatch-quantities-inside-checkout-tra` |
| **PAC-486** | `TASK-276` | TASK-276 - Create idempotency_records Prisma model | `feature/PAC-486-task-276-create-idempotency-records-prisma-model` |
| **PAC-487** | `TASK-277` | TASK-277 - Implement idempotency key handling for checkout | `feature/PAC-487-task-277-implement-idempotency-key-handling-for-checkout` |
| **PAC-488** | `TASK-278` | TASK-278 - Rollback checkout transaction on failure | `feature/PAC-488-task-278-rollback-checkout-transaction-on-failure` |
| **PAC-489** | `TASK-279` | TASK-279 - Create payments Prisma model | `feature/PAC-489-task-279-create-payments-prisma-model` |
| **PAC-490** | `TASK-280` | TASK-280 - Implement cash payment handling inside checkout | `feature/PAC-490-task-280-implement-cash-payment-handling-inside-checkout` |
| **PAC-491** | `TASK-281` | TASK-281 - Calculate and persist change_amount | `feature/PAC-491-task-281-calculate-and-persist-change-amount` |
| **PAC-492** | `TASK-282` | TASK-282 - Implement bank transfer transaction_reference validation | `feature/PAC-492-task-282-implement-bank-transfer-transaction-reference-valid` |
| **PAC-493** | `TASK-283` | TASK-283 - Enforce one SUCCESS payment per order | `feature/PAC-493-task-283-enforce-one-success-payment-per-order` |
| **PAC-494** | `TASK-284` | TASK-284 - Allow failed payment attempts without creating duplicate SUCCESS payment | `feature/PAC-494-task-284-allow-failed-payment-attempts-without-creating-dupl` |
| **PAC-495** | `TASK-285` | TASK-285 - Create invoices Prisma model | `feature/PAC-495-task-285-create-invoices-prisma-model` |
| **PAC-496** | `TASK-286` | TASK-286 - Generate invoice inside checkout transaction | `feature/PAC-496-task-286-generate-invoice-inside-checkout-transaction` |
| **PAC-497** | `TASK-287` | TASK-287 - Build invoice view and print UI | `feature/PAC-497-task-287-build-invoice-view-and-print-ui` |
| **PAC-498** | `TASK-288` | TASK-288 - Update order status to PAID only after successful checkout | `feature/PAC-498-task-288-update-order-status-to-paid-only-after-successful-c` |
| **PAC-499** | `TASK-289` | TASK-289 - Add checkout integration tests | `test/PAC-499-task-289-add-checkout-integration-tests` |
| **PAC-500** | `TASK-290` | TASK-290 - Add FEFO, idempotency and rollback tests | `test/PAC-500-task-290-add-fefo-idempotency-and-rollback-tests` |
| **PAC-501** | `TASK-291` | TASK-291 - Define AI provider abstraction | `feature/PAC-501-task-291-define-ai-provider-abstraction` |
| **PAC-502** | `TASK-292` | TASK-292 - Configure backend AI provider/model settings loader | `feature/PAC-502-task-292-configure-backend-ai-provider-model-settings-loader` |
| **PAC-503** | `TASK-293` | TASK-293 - Implement Google AI provider adapter | `feature/PAC-503-task-293-implement-google-ai-provider-adapter` |
| **PAC-504** | `TASK-294` | TASK-294 - Add Google AI timeout and retry-safe error handling | `feature/PAC-504-task-294-add-google-ai-timeout-and-retry-safe-error-handling` |
| **PAC-505** | `TASK-295` | TASK-295 - Implement MockAI fallback adapter | `feature/PAC-505-task-295-implement-mockai-fallback-adapter` |
| **PAC-506** | `TASK-296` | TASK-296 - Implement fallback provider selection logic | `feature/PAC-506-task-296-implement-fallback-provider-selection-logic` |
| **PAC-507** | `TASK-297` | TASK-297 - Add provider_requested and provider_used tracking | `feature/PAC-507-task-297-add-provider-requested-and-provider-used-tracking` |
| **PAC-508** | `TASK-298` | TASK-298 - Implement AI interaction explanation API | `feature/PAC-508-task-298-implement-ai-interaction-explanation-api` |
| **PAC-509** | `TASK-299` | TASK-299 - Build AI explanation panel in InteractionAlert UI | `feature/PAC-509-task-299-build-ai-explanation-panel-in-interactionalert-ui` |
| **PAC-510** | `TASK-300` | TASK-300 - Add AI disclaimer to explanation panel | `feature/PAC-510-task-300-add-ai-disclaimer-to-explanation-panel` |
| **PAC-511** | `TASK-301` | TASK-301 - Build AI explanation loading, error and fallback states | `feature/PAC-511-task-301-build-ai-explanation-loading-error-and-fallback-sta` |
| **PAC-512** | `TASK-302` | TASK-302 - Implement AI consultation note draft API | `feature/PAC-512-task-302-implement-ai-consultation-note-draft-api` |
| **PAC-513** | `TASK-303` | TASK-303 - Build AI consultation note draft panel | `feature/PAC-513-task-303-build-ai-consultation-note-draft-panel` |
| **PAC-514** | `TASK-304` | TASK-304 - Build Staff edit AI draft before confirm UI | `feature/PAC-514-task-304-build-staff-edit-ai-draft-before-confirm-ui` |
| **PAC-515** | `TASK-305` | TASK-305 - Implement Staff confirm AI draft as official consultation note | `feature/PAC-515-task-305-implement-staff-confirm-ai-draft-as-official-consul` |
| **PAC-516** | `TASK-306` | TASK-306 - Prevent unconfirmed AI draft from saving official note | `feature/PAC-516-task-306-prevent-unconfirmed-ai-draft-from-saving-official-n` |
| **PAC-517** | `TASK-307` | TASK-307 - Link confirmed AI note to correct HIGH InteractionAlert | `feature/PAC-517-task-307-link-confirmed-ai-note-to-correct-high-interactiona` |
| **PAC-518** | `TASK-308` | TASK-308 - Implement safe follow-up question API | `feature/PAC-518-task-308-implement-safe-follow-up-question-api` |
| **PAC-519** | `TASK-309` | TASK-309 - Build safe follow-up question UI field | `feature/PAC-519-task-309-build-safe-follow-up-question-ui-field` |
| **PAC-520** | `TASK-310` | TASK-310 - Block medical-record style storage for symptom/context input | `feature/PAC-520-task-310-block-medical-record-style-storage-for-symptom-cont` |
| **PAC-521** | `TASK-311` | TASK-311 - Add AI Copilot permission checks | `feature/PAC-521-task-311-add-ai-copilot-permission-checks` |
| **PAC-522** | `TASK-312` | TASK-312 - Add AI Copilot frontend route and action guards | `feature/PAC-522-task-312-add-ai-copilot-frontend-route-and-action-guards` |
| **PAC-523** | `TASK-313` | TASK-313 - Add AI provider unit tests | `test/PAC-523-task-313-add-ai-provider-unit-tests` |
| **PAC-524** | `TASK-314` | TASK-314 - Add MockAI fallback tests | `test/PAC-524-task-314-add-mockai-fallback-tests` |
| **PAC-525** | `TASK-315` | TASK-315 - Add AI Copilot integration smoke checklist | `feature/PAC-525-task-315-add-ai-copilot-integration-smoke-checklist` |
| **PAC-526** | `TASK-316` | TASK-316 - Define unsafe AI request categories | `feature/PAC-526-task-316-define-unsafe-ai-request-categories` |
| **PAC-527** | `TASK-317` | TASK-317 - Implement AI input guardrail service | `feature/PAC-527-task-317-implement-ai-input-guardrail-service` |
| **PAC-528** | `TASK-318` | TASK-318 - Block diagnosis requests | `feature/PAC-528-task-318-block-diagnosis-requests` |
| **PAC-529** | `TASK-319` | TASK-319 - Block prescribing requests | `feature/PAC-529-task-319-block-prescribing-requests` |
| **PAC-530** | `TASK-320` | TASK-320 - Block dosage advice requests | `feature/PAC-530-task-320-block-dosage-advice-requests` |
| **PAC-531** | `TASK-321` | TASK-321 - Add safe response templates for blocked AI input | `feature/PAC-531-task-321-add-safe-response-templates-for-blocked-ai-input` |
| **PAC-532** | `TASK-322` | TASK-322 - Add PII minimization before AI provider call | `feature/PAC-532-task-322-add-pii-minimization-before-ai-provider-call` |
| **PAC-533** | `TASK-323` | TASK-323 - Redact customer/order unnecessary personal data before AI call | `feature/PAC-533-task-323-redact-customer-order-unnecessary-personal-data-bef` |
| **PAC-534** | `TASK-324` | TASK-324 - Implement AI output guardrail service | `feature/PAC-534-task-324-implement-ai-output-guardrail-service` |
| **PAC-535** | `TASK-325` | TASK-325 - Block unsafe AI output before rendering | `feature/PAC-535-task-325-block-unsafe-ai-output-before-rendering` |
| **PAC-536** | `TASK-326` | TASK-326 - Implement structured output schema validation | `feature/PAC-536-task-326-implement-structured-output-schema-validation` |
| **PAC-537** | `TASK-327` | TASK-327 - Add output schema retry or safe fallback handling | `feature/PAC-537-task-327-add-output-schema-retry-or-safe-fallback-handling` |
| **PAC-538** | `TASK-328` | TASK-328 - Add guardrail status object to AI response | `feature/PAC-538-task-328-add-guardrail-status-object-to-ai-response` |
| **PAC-539** | `TASK-329` | TASK-329 - Create ai_audit_logs Prisma model | `feature/PAC-539-task-329-create-ai-audit-logs-prisma-model` |
| **PAC-540** | `TASK-330` | TASK-330 - Implement AI audit log write service | `feature/PAC-540-task-330-implement-ai-audit-log-write-service` |
| **PAC-541** | `TASK-331` | TASK-331 - Persist AI provider, model and prompt metadata | `feature/PAC-541-task-331-persist-ai-provider-model-and-prompt-metadata` |
| **PAC-542** | `TASK-332` | TASK-332 - Persist input and output guardrail statuses | `feature/PAC-542-task-332-persist-input-and-output-guardrail-statuses` |
| **PAC-543** | `TASK-333` | TASK-333 - Persist AI latency, request id and fallback metadata | `feature/PAC-543-task-333-persist-ai-latency-request-id-and-fallback-metadata` |
| **PAC-544** | `TASK-334` | TASK-334 - Ensure AI Audit does not store raw PII | `feature/PAC-544-task-334-ensure-ai-audit-does-not-store-raw-pii` |
| **PAC-545** | `TASK-335` | TASK-335 - Build Admin AI Audit Log list API | `feature/PAC-545-task-335-build-admin-ai-audit-log-list-api` |
| **PAC-546** | `TASK-336` | TASK-336 - Build Admin AI Audit Log UI | `feature/PAC-546-task-336-build-admin-ai-audit-log-ui` |
| **PAC-547** | `TASK-337` | TASK-337 - Add AI Audit filters by provider, status and date | `feature/PAC-547-task-337-add-ai-audit-filters-by-provider-status-and-date` |
| **PAC-548** | `TASK-338` | TASK-338 - Create prompt_templates Prisma model | `feature/PAC-548-task-338-create-prompt-templates-prisma-model` |
| **PAC-549** | `TASK-339` | TASK-339 - Seed official AI prompt templates with versions | `feature/PAC-549-task-339-seed-official-ai-prompt-templates-with-versions` |
| **PAC-550** | `TASK-340` | TASK-340 - Load approved prompt template by use case | `feature/PAC-550-task-340-load-approved-prompt-template-by-use-case` |
| **PAC-551** | `TASK-341` | TASK-341 - Record prompt version in AI audit | `feature/PAC-551-task-341-record-prompt-version-in-ai-audit` |
| **PAC-552** | `TASK-342` | TASK-342 - Add backend AI provider/model config validation | `feature/PAC-552-task-342-add-backend-ai-provider-model-config-validation` |
| **PAC-553** | `TASK-343` | TASK-343 - Add environment/database config fallback order for AI settings | `feature/PAC-553-task-343-add-environment-database-config-fallback-order-for-` |
| **PAC-554** | `TASK-344` | TASK-344 - Add timeout, circuit breaker and rate-limit guard for AI calls | `feature/PAC-554-task-344-add-timeout-circuit-breaker-and-rate-limit-guard-fo` |
| **PAC-555** | `TASK-345` | TASK-345 - Add AI safe error response helper | `feature/PAC-555-task-345-add-ai-safe-error-response-helper` |
| **PAC-556** | `TASK-346` | TASK-346 - Add AI input guardrail unit tests | `test/PAC-556-task-346-add-ai-input-guardrail-unit-tests` |
| **PAC-557** | `TASK-347` | TASK-347 - Add diagnosis block tests | `test/PAC-557-task-347-add-diagnosis-block-tests` |
| **PAC-558** | `TASK-348` | TASK-348 - Add prescribing block tests | `test/PAC-558-task-348-add-prescribing-block-tests` |
| **PAC-559** | `TASK-349` | TASK-349 - Add dosage advice block tests | `test/PAC-559-task-349-add-dosage-advice-block-tests` |
| **PAC-560** | `TASK-350` | TASK-350 - Add AI output guardrail tests | `test/PAC-560-task-350-add-ai-output-guardrail-tests` |
| **PAC-561** | `TASK-351` | TASK-351 - Add structured output validation tests | `test/PAC-561-task-351-add-structured-output-validation-tests` |
| **PAC-562** | `TASK-352` | TASK-352 - Add PII minimization tests | `test/PAC-562-task-352-add-pii-minimization-tests` |
| **PAC-563** | `TASK-353` | TASK-353 - Add AI audit integration tests | `test/PAC-563-task-353-add-ai-audit-integration-tests` |
| **PAC-564** | `TASK-354` | TASK-354 - Add prompt versioning tests | `test/PAC-564-task-354-add-prompt-versioning-tests` |
| **PAC-565** | `TASK-355` | TASK-355 - Add AI safety traceability notes | `feature/PAC-565-task-355-add-ai-safety-traceability-notes` |
| **PAC-566** | `TASK-356` | TASK-356 - Create graph_sync_outbox Prisma model | `feature/PAC-566-task-356-create-graph-sync-outbox-prisma-model` |
| **PAC-567** | `TASK-357` | TASK-357 - Add graph sync job status enum | `feature/PAC-567-task-357-add-graph-sync-job-status-enum` |
| **PAC-568** | `TASK-358` | TASK-358 - Emit outbox event from Medicine changes | `feature/PAC-568-task-358-emit-outbox-event-from-medicine-changes` |
| **PAC-569** | `TASK-359` | TASK-359 - Emit outbox event from ActiveIngredient changes | `feature/PAC-569-task-359-emit-outbox-event-from-activeingredient-changes` |
| **PAC-570** | `TASK-360` | TASK-360 - Emit outbox event from Medicine-Ingredient mapping changes | `feature/PAC-570-task-360-emit-outbox-event-from-medicine-ingredient-mapping-` |
| **PAC-571** | `TASK-361` | TASK-361 - Emit outbox event from DrugInteractionRule changes | `feature/PAC-571-task-361-emit-outbox-event-from-druginteractionrule-changes` |
| **PAC-572** | `TASK-362` | TASK-362 - Implement Graph Sync worker loop | `feature/PAC-572-task-362-implement-graph-sync-worker-loop` |
| **PAC-573** | `TASK-363` | TASK-363 - Configure Neo4j connection service | `feature/PAC-573-task-363-configure-neo4j-connection-service` |
| **PAC-574** | `TASK-364` | TASK-364 - Add Neo4j health check | `feature/PAC-574-task-364-add-neo4j-health-check` |
| **PAC-575** | `TASK-365` | TASK-365 - Implement idempotent graph job claiming | `feature/PAC-575-task-365-implement-idempotent-graph-job-claiming` |
| **PAC-576** | `TASK-366` | TASK-366 - Upsert Medicine node to Neo4j | `feature/PAC-576-task-366-upsert-medicine-node-to-neo4j` |
| **PAC-577** | `TASK-367` | TASK-367 - Upsert ActiveIngredient node to Neo4j | `feature/PAC-577-task-367-upsert-activeingredient-node-to-neo4j` |
| **PAC-578** | `TASK-368` | TASK-368 - Upsert CONTAINS relationship | `feature/PAC-578-task-368-upsert-contains-relationship` |
| **PAC-579** | `TASK-369` | TASK-369 - Upsert INTERACTS_WITH relationship | `feature/PAC-579-task-369-upsert-interacts-with-relationship` |
| **PAC-580** | `TASK-370` | TASK-370 - Implement canonical directed interaction edge logic | `feature/PAC-580-task-370-implement-canonical-directed-interaction-edge-logic` |
| **PAC-581** | `TASK-371` | TASK-371 - Store rule properties on INTERACTS_WITH relationship | `feature/PAC-581-task-371-store-rule-properties-on-interacts-with-relationshi` |
| **PAC-582** | `TASK-372` | TASK-372 - Store sourceVersion, sourceUpdatedAt and syncedAt metadata | `feature/PAC-582-task-372-store-sourceversion-sourceupdatedat-and-syncedat-me` |
| **PAC-583** | `TASK-373` | TASK-373 - Mark deactivated Medicine and ActiveIngredient as isActive=false | `feature/PAC-583-task-373-mark-deactivated-medicine-and-activeingredient-as-i` |
| **PAC-584** | `TASK-374` | TASK-374 - Mark deactivated interaction rule edge as isActive=false | `feature/PAC-584-task-374-mark-deactivated-interaction-rule-edge-as-isactive-` |
| **PAC-585** | `TASK-375` | TASK-375 - Filter normal Neo4j queries to active data only | `feature/PAC-585-task-375-filter-normal-neo4j-queries-to-active-data-only` |
| **PAC-586** | `TASK-376` | TASK-376 - Implement retry logic for failed graph sync jobs | `feature/PAC-586-task-376-implement-retry-logic-for-failed-graph-sync-jobs` |
| **PAC-587** | `TASK-377` | TASK-377 - Add max retry and failed status handling | `feature/PAC-587-task-377-add-max-retry-and-failed-status-handling` |
| **PAC-588** | `TASK-378` | TASK-378 - Log graph sync failure details | `feature/PAC-588-task-378-log-graph-sync-failure-details` |
| **PAC-589** | `TASK-379` | TASK-379 - Write audit log for graph sync failures | `feature/PAC-589-task-379-write-audit-log-for-graph-sync-failures` |
| **PAC-590** | `TASK-380` | TASK-380 - Implement graph projection source version tracking | `feature/PAC-590-task-380-implement-graph-projection-source-version-tracking` |
| **PAC-591** | `TASK-381` | TASK-381 - Implement graph freshness detection service | `feature/PAC-591-task-381-implement-graph-freshness-detection-service` |
| **PAC-592** | `TASK-382` | TASK-382 - Detect stale graph from pending outbox job | `feature/PAC-592-task-382-detect-stale-graph-from-pending-outbox-job` |
| **PAC-593** | `TASK-383` | TASK-383 - Detect stale graph from failed relevant outbox job | `feature/PAC-593-task-383-detect-stale-graph-from-failed-relevant-outbox-job` |
| **PAC-594** | `TASK-384` | TASK-384 - Detect stale graph from missing sourceVersion projection | `feature/PAC-594-task-384-detect-stale-graph-from-missing-sourceversion-proje` |
| **PAC-595** | `TASK-385` | TASK-385 - Add Graph Sync worker unit tests | `test/PAC-595-task-385-add-graph-sync-worker-unit-tests` |
| **PAC-596** | `TASK-386` | TASK-386 - Add Neo4j projection integration tests | `test/PAC-596-task-386-add-neo4j-projection-integration-tests` |
| **PAC-597** | `TASK-387` | TASK-387 - Add INTERACTS_WITH projection tests | `test/PAC-597-task-387-add-interacts-with-projection-tests` |
| **PAC-598** | `TASK-388` | TASK-388 - Add graph freshness detection tests | `test/PAC-598-task-388-add-graph-freshness-detection-tests` |
| **PAC-599** | `TASK-389` | TASK-389 - Add graph sync retry and failure tests | `test/PAC-599-task-389-add-graph-sync-retry-and-failure-tests` |
| **PAC-600** | `TASK-390` | TASK-390 - Add Graph Sync traceability notes | `feature/PAC-600-task-390-add-graph-sync-traceability-notes` |
| **PAC-601** | `TASK-391` | TASK-391 - Implement Graph-RAG interaction explanation service | `feature/PAC-601-task-391-implement-graph-rag-interaction-explanation-service` |
| **PAC-602** | `TASK-392` | TASK-392 - Build allowlisted graph query templates | `feature/PAC-602-task-392-build-allowlisted-graph-query-templates` |
| **PAC-603** | `TASK-393` | TASK-393 - Query Medicine-CONTAINS-ActiveIngredient context | `feature/PAC-603-task-393-query-medicine-contains-activeingredient-context` |
| **PAC-604** | `TASK-394` | TASK-394 - Query ActiveIngredient INTERACTS_WITH context | `feature/PAC-604-task-394-query-activeingredient-interacts-with-context` |
| **PAC-605** | `TASK-395` | TASK-395 - Add Graph-RAG context builder for AI Copilot | `feature/PAC-605-task-395-add-graph-rag-context-builder-for-ai-copilot` |
| **PAC-606** | `TASK-396` | TASK-396 - Return Graph-RAG provenance metadata | `feature/PAC-606-task-396-return-graph-rag-provenance-metadata` |
| **PAC-607** | `TASK-397` | TASK-397 - Return graphUsed flag in Graph-RAG response | `feature/PAC-607-task-397-return-graphused-flag-in-graph-rag-response` |
| **PAC-608** | `TASK-398` | TASK-398 - Return Graph-RAG freshness metadata | `feature/PAC-608-task-398-return-graph-rag-freshness-metadata` |
| **PAC-609** | `TASK-399` | TASK-399 - Add freshness warning to Graph-RAG response | `feature/PAC-609-task-399-add-freshness-warning-to-graph-rag-response` |
| **PAC-610** | `TASK-400` | TASK-400 - Implement PostgreSQL fallback when Neo4j unavailable | `feature/PAC-610-task-400-implement-postgresql-fallback-when-neo4j-unavailabl` |
| **PAC-611** | `TASK-401` | TASK-401 - Implement PostgreSQL fallback when graph stale | `feature/PAC-611-task-401-implement-postgresql-fallback-when-graph-stale` |
| **PAC-612** | `TASK-402` | TASK-402 - Implement safe error for graph-only query without fallback | `feature/PAC-612-task-402-implement-safe-error-for-graph-only-query-without-f` |
| **PAC-613** | `TASK-403` | TASK-403 - Ensure Staff cannot submit raw Cypher | `feature/PAC-613-task-403-ensure-staff-cannot-submit-raw-cypher` |
| **PAC-614** | `TASK-404` | TASK-404 - Add backend guard against raw Cypher APIs for Staff | `feature/PAC-614-task-404-add-backend-guard-against-raw-cypher-apis-for-staff` |
| **PAC-615** | `TASK-405` | TASK-405 - Ensure Graph-RAG does not decide checkout | `feature/PAC-615-task-405-ensure-graph-rag-does-not-decide-checkout` |
| **PAC-616** | `TASK-406` | TASK-406 - Build Graph-RAG explanation UI metadata display | `feature/PAC-616-task-406-build-graph-rag-explanation-ui-metadata-display` |
| **PAC-617** | `TASK-407` | TASK-407 - Add Graph-RAG PostgreSQL fallback tests | `test/PAC-617-task-407-add-graph-rag-postgresql-fallback-tests` |
| **PAC-618** | `TASK-408` | TASK-408 - Add stale graph fallback tests | `test/PAC-618-task-408-add-stale-graph-fallback-tests` |
| **PAC-619** | `TASK-409` | TASK-409 - Add raw Cypher no-access tests | `test/PAC-619-task-409-add-raw-cypher-no-access-tests` |
| **PAC-620** | `TASK-410` | TASK-410 - Add graph-not-checkout guard tests | `test/PAC-620-task-410-add-graph-not-checkout-guard-tests` |
| **PAC-621** | `TASK-411` | TASK-411 - Implement Revenue Report API | `feature/PAC-621-task-411-implement-revenue-report-api` |
| **PAC-622** | `TASK-412` | TASK-412 - Build Revenue Report UI | `feature/PAC-622-task-412-build-revenue-report-ui` |
| **PAC-623** | `TASK-413` | TASK-413 - Add revenue report filters by date and status | `feature/PAC-623-task-413-add-revenue-report-filters-by-date-and-status` |
| **PAC-624** | `TASK-414` | TASK-414 - Implement Top Medicines Report API | `feature/PAC-624-task-414-implement-top-medicines-report-api` |
| **PAC-625** | `TASK-415` | TASK-415 - Build Top Medicines Report UI | `feature/PAC-625-task-415-build-top-medicines-report-ui` |
| **PAC-626** | `TASK-416` | TASK-416 - Implement Inventory Report API from MedicineBatch | `feature/PAC-626-task-416-implement-inventory-report-api-from-medicinebatch` |
| **PAC-627** | `TASK-417` | TASK-417 - Build Inventory Report UI | `feature/PAC-627-task-417-build-inventory-report-ui` |
| **PAC-628** | `TASK-418` | TASK-418 - Add report empty, loading and error states | `feature/PAC-628-task-418-add-report-empty-loading-and-error-states` |
| **PAC-629** | `TASK-419` | TASK-419 - Add report permission checks | `feature/PAC-629-task-419-add-report-permission-checks` |
| **PAC-630** | `TASK-420` | TASK-420 - Create system_settings Prisma model | `feature/PAC-630-task-420-create-system-settings-prisma-model` |
| **PAC-631** | `TASK-421` | TASK-421 - Seed default near-expiry threshold as 90 days | `feature/PAC-631-task-421-seed-default-near-expiry-threshold-as-90-days` |
| **PAC-632** | `TASK-422` | TASK-422 - Implement near-expiry threshold settings API | `feature/PAC-632-task-422-implement-near-expiry-threshold-settings-api` |
| **PAC-633** | `TASK-423` | TASK-423 - Build minimal System Settings UI for near-expiry threshold | `feature/PAC-633-task-423-build-minimal-system-settings-ui-for-near-expiry-th` |
| **PAC-634** | `TASK-424` | TASK-424 - Add system settings validation and tests | `test/PAC-634-task-424-add-system-settings-validation-and-tests` |
| **PAC-635** | `TASK-425` | TASK-425 - Create curated MVP seed dataset | `feature/PAC-635-task-425-create-curated-mvp-seed-dataset` |
| **PAC-636** | `TASK-426` | TASK-426 - Seed demo users by role | `feature/PAC-636-task-426-seed-demo-users-by-role` |
| **PAC-637** | `TASK-427` | TASK-427 - Seed first-login demo account | `feature/PAC-637-task-427-seed-first-login-demo-account` |
| **PAC-638** | `TASK-428` | TASK-428 - Generate dynamic expiry dates for demo batches | `feature/PAC-638-task-428-generate-dynamic-expiry-dates-for-demo-batches` |
| **PAC-639** | `TASK-429` | TASK-429 - Seed FEFO multi-batch demo scenario | `feature/PAC-639-task-429-seed-fefo-multi-batch-demo-scenario` |
| **PAC-640** | `TASK-430` | TASK-430 - Seed expired batch excluded from sellable stock | `feature/PAC-640-task-430-seed-expired-batch-excluded-from-sellable-stock` |
| **PAC-641** | `TASK-431` | TASK-431 - Seed PAID order with handled HIGH alert | `feature/PAC-641-task-431-seed-paid-order-with-handled-high-alert` |
| **PAC-642** | `TASK-432` | TASK-432 - Seed report data with PAID, DRAFT, CANCELLED and failed-payment cases | `feature/PAC-642-task-432-seed-report-data-with-paid-draft-cancelled-and-fail` |
| **PAC-643** | `TASK-433` | TASK-433 - Implement demo:reset local-only environment guard | `feature/PAC-643-task-433-implement-demo-reset-local-only-environment-guard` |
| **PAC-644** | `TASK-434` | TASK-434 - Rebuild Neo4j projection during demo reset | `feature/PAC-644-task-434-rebuild-neo4j-projection-during-demo-reset` |
| **PAC-645** | `TASK-435` | TASK-435 - Run smoke tests after demo reset | `test/PAC-645-task-435-run-smoke-tests-after-demo-reset` |
| **PAC-646** | `TASK-436` | TASK-436 - Add backend unit test setup | `test/PAC-646-task-436-add-backend-unit-test-setup` |
| **PAC-647** | `TASK-437` | TASK-437 - Add backend integration test setup with isolated cleanup | `test/PAC-647-task-437-add-backend-integration-test-setup-with-isolated-cl` |
| **PAC-648** | `TASK-438` | TASK-438 - Add frontend component test setup | `test/PAC-648-task-438-add-frontend-component-test-setup` |
| **PAC-649** | `TASK-439` | TASK-439 - Add Playwright E2E test setup for Chrome desktop | `test/PAC-649-task-439-add-playwright-e2e-test-setup-for-chrome-desktop` |
| **PAC-650** | `TASK-440` | TASK-440 - Add Postman manual API collection structure | `feature/PAC-650-task-440-add-postman-manual-api-collection-structure` |
| **PAC-651** | `TASK-441` | TASK-441 - Add Auth and RBAC test suite | `test/PAC-651-task-441-add-auth-and-rbac-test-suite` |
| **PAC-652** | `TASK-442` | TASK-442 - Add User Management permission tests | `test/PAC-652-task-442-add-user-management-permission-tests` |
| **PAC-653** | `TASK-443` | TASK-443 - Add Medicine Management API tests | `test/PAC-653-task-443-add-medicine-management-api-tests` |
| **PAC-654** | `TASK-444` | TASK-444 - Add ActiveIngredient mapping tests | `test/PAC-654-task-444-add-activeingredient-mapping-tests` |
| **PAC-655** | `TASK-445` | TASK-445 - Add Supplier Management API tests | `test/PAC-655-task-445-add-supplier-management-api-tests` |
| **PAC-656** | `TASK-446` | TASK-446 - Add MedicineBatch source-of-truth tests | `test/PAC-656-task-446-add-medicinebatch-source-of-truth-tests` |
| **PAC-657** | `TASK-447` | TASK-447 - Add sellable quantity and expired batch tests | `test/PAC-657-task-447-add-sellable-quantity-and-expired-batch-tests` |
| **PAC-658** | `TASK-448` | TASK-448 - Add near-expiry threshold tests | `test/PAC-658-task-448-add-near-expiry-threshold-tests` |
| **PAC-659** | `TASK-449` | TASK-449 - Add Stock Import transaction tests | `test/PAC-659-task-449-add-stock-import-transaction-tests` |
| **PAC-660** | `TASK-450` | TASK-450 - Add Stock Import batch merge and expiry mismatch tests | `test/PAC-660-task-450-add-stock-import-batch-merge-and-expiry-mismatch-te` |
| **PAC-661** | `TASK-451` | TASK-451 - Add Inventory Adjustment transaction tests | `test/PAC-661-task-451-add-inventory-adjustment-transaction-tests` |
| **PAC-662** | `TASK-452` | TASK-452 - Add Inventory Adjustment audit and reason tests | `test/PAC-662-task-452-add-inventory-adjustment-audit-and-reason-tests` |
| **PAC-663** | `TASK-453` | TASK-453 - Add POS Draft Order API tests | `test/PAC-663-task-453-add-pos-draft-order-api-tests` |
| **PAC-664** | `TASK-454` | TASK-454 - Add POS Draft Order UI smoke tests | `test/PAC-664-task-454-add-pos-draft-order-ui-smoke-tests` |
| **PAC-665** | `TASK-455` | TASK-455 - Add Staff order ownership tests | `test/PAC-665-task-455-add-staff-order-ownership-tests` |
| **PAC-666** | `TASK-456` | TASK-456 - Add Draft Order cancel status tests | `test/PAC-666-task-456-add-draft-order-cancel-status-tests` |
| **PAC-667** | `TASK-457` | TASK-457 - Add DrugInteraction Rule API tests | `test/PAC-667-task-457-add-druginteraction-rule-api-tests` |
| **PAC-668** | `TASK-458` | TASK-458 - Add ActiveIngredient-derived interaction tests | `test/PAC-668-task-458-add-activeingredient-derived-interaction-tests` |
| **PAC-669** | `TASK-459` | TASK-459 - Add InteractionAlert persistence tests | `test/PAC-669-task-459-add-interactionalert-persistence-tests` |
| **PAC-670** | `TASK-460` | TASK-460 - Add InteractionAlert display_count tests | `test/PAC-670-task-460-add-interactionalert-display-count-tests` |
| **PAC-671** | `TASK-461` | TASK-461 - Add HIGH alert acknowledgement tests | `test/PAC-671-task-461-add-high-alert-acknowledgement-tests` |
| **PAC-672** | `TASK-462` | TASK-462 - Add HIGH alert consultation note tests | `test/PAC-672-task-462-add-high-alert-consultation-note-tests` |
| **PAC-673** | `TASK-463` | TASK-463 - Add checkout blocker tests for unresolved HIGH alerts | `test/PAC-673-task-463-add-checkout-blocker-tests-for-unresolved-high-aler` |
| **PAC-674** | `TASK-464` | TASK-464 - Add Checkout transaction success tests | `test/PAC-674-task-464-add-checkout-transaction-success-tests` |
| **PAC-675** | `TASK-465` | TASK-465 - Add Checkout rollback failure tests | `test/PAC-675-task-465-add-checkout-rollback-failure-tests` |
| **PAC-676** | `TASK-466` | TASK-466 - Add FEFO allocation unit tests | `test/PAC-676-task-466-add-fefo-allocation-unit-tests` |
| **PAC-677** | `TASK-467` | TASK-467 - Add FEFO multi-batch allocation tests | `test/PAC-677-task-467-add-fefo-multi-batch-allocation-tests` |
| **PAC-678** | `TASK-468` | TASK-468 - Add Checkout idempotency tests | `test/PAC-678-task-468-add-checkout-idempotency-tests` |
| **PAC-679** | `TASK-469` | TASK-469 - Add Payment cash handling tests | `test/PAC-679-task-469-add-payment-cash-handling-tests` |
| **PAC-680** | `TASK-470` | TASK-470 - Add Payment one SUCCESS rule tests | `test/PAC-680-task-470-add-payment-one-success-rule-tests` |
| **PAC-681** | `TASK-471` | TASK-471 - Add Invoice generation tests | `test/PAC-681-task-471-add-invoice-generation-tests` |
| **PAC-682** | `TASK-472` | TASK-472 - Add AI Guardrail high-risk test suite | `test/PAC-682-task-472-add-ai-guardrail-high-risk-test-suite` |
| **PAC-683** | `TASK-473` | TASK-473 - Add AI Audit privacy tests | `test/PAC-683-task-473-add-ai-audit-privacy-tests` |
| **PAC-684** | `TASK-474` | TASK-474 - Add AI provider fallback tests | `test/PAC-684-task-474-add-ai-provider-fallback-tests` |
| **PAC-685** | `TASK-475` | TASK-475 - Add Graph Sync outbox and retry tests | `test/PAC-685-task-475-add-graph-sync-outbox-and-retry-tests` |
| **PAC-686** | `TASK-476` | TASK-476 - Add Neo4j projection tests | `test/PAC-686-task-476-add-neo4j-projection-tests` |
| **PAC-687** | `TASK-477` | TASK-477 - Add Graph freshness tests | `test/PAC-687-task-477-add-graph-freshness-tests` |
| **PAC-688** | `TASK-478` | TASK-478 - Add Graph-RAG fallback tests | `test/PAC-688-task-478-add-graph-rag-fallback-tests` |
| **PAC-689** | `TASK-479` | TASK-479 - Add Reports deterministic calculation tests | `test/PAC-689-task-479-add-reports-deterministic-calculation-tests` |
| **PAC-690** | `TASK-480` | TASK-480 - Add full MVP smoke test checklist | `test/PAC-690-task-480-add-full-mvp-smoke-test-checklist` |
| **PAC-691** | `TASK-481` | TASK-481 - Configure local Node.js project setup guide | `feature/PAC-691-task-481-configure-local-node-js-project-setup-guide` |
| **PAC-692** | `TASK-482` | TASK-482 - Configure frontend environment variables guide | `feature/PAC-692-task-482-configure-frontend-environment-variables-guide` |
| **PAC-693** | `TASK-483` | TASK-483 - Configure backend environment variables guide | `feature/PAC-693-task-483-configure-backend-environment-variables-guide` |
| **PAC-694** | `TASK-484` | TASK-484 - Configure Supabase project setup instructions | `feature/PAC-694-task-484-configure-supabase-project-setup-instructions` |
| **PAC-695** | `TASK-485` | TASK-485 - Configure Neo4j AuraDB setup instructions | `feature/PAC-695-task-485-configure-neo4j-auradb-setup-instructions` |
| **PAC-696** | `TASK-486` | TASK-486 - Configure Google AI API key setup instructions | `feature/PAC-696-task-486-configure-google-ai-api-key-setup-instructions` |
| **PAC-697** | `TASK-487` | TASK-487 - Configure MockAI fallback setup instructions | `feature/PAC-697-task-487-configure-mockai-fallback-setup-instructions` |
| **PAC-698** | `TASK-488` | TASK-488 - Add Prisma generate and migrate setup command | `feature/PAC-698-task-488-add-prisma-generate-and-migrate-setup-command` |
| **PAC-699** | `TASK-489` | TASK-489 - Add seed command for curated MVP data | `feature/PAC-699-task-489-add-seed-command-for-curated-mvp-data` |
| **PAC-700** | `TASK-490` | TASK-490 - Add graph projection rebuild command | `feature/PAC-700-task-490-add-graph-projection-rebuild-command` |
| **PAC-701** | `TASK-491` | TASK-491 - Add demo reset command entrypoint | `feature/PAC-701-task-491-add-demo-reset-command-entrypoint` |
| **PAC-702** | `TASK-492` | TASK-492 - Add demo reset environment safety checks | `feature/PAC-702-task-492-add-demo-reset-environment-safety-checks` |
| **PAC-703** | `TASK-493` | TASK-493 - Configure GitHub Actions lint check | `feature/PAC-703-task-493-configure-github-actions-lint-check` |
| **PAC-704** | `TASK-494` | TASK-494 - Configure GitHub Actions type check | `feature/PAC-704-task-494-configure-github-actions-type-check` |
| **PAC-705** | `TASK-495` | TASK-495 - Configure GitHub Actions frontend build | `feature/PAC-705-task-495-configure-github-actions-frontend-build` |
| **PAC-706** | `TASK-496` | TASK-496 - Configure GitHub Actions backend build | `feature/PAC-706-task-496-configure-github-actions-backend-build` |
| **PAC-707** | `TASK-497` | TASK-497 - Configure GitHub Actions unit test check | `test/PAC-707-task-497-configure-github-actions-unit-test-check` |
| **PAC-708** | `TASK-498` | TASK-498 - Configure GitHub Actions integration test check | `test/PAC-708-task-498-configure-github-actions-integration-test-check` |
| **PAC-709** | `TASK-499` | TASK-499 - Configure Prisma schema validation check | `feature/PAC-709-task-499-configure-prisma-schema-validation-check` |
| **PAC-710** | `TASK-500` | TASK-500 - Configure Prisma migration check | `feature/PAC-710-task-500-configure-prisma-migration-check` |
| **PAC-711** | `TASK-501` | TASK-501 - Add CI guard to prevent destructive tests against demo database | `test/PAC-711-task-501-add-ci-guard-to-prevent-destructive-tests-against-d` |
| **PAC-712** | `TASK-502` | TASK-502 - Add CI branch protection expectation notes | `feature/PAC-712-task-502-add-ci-branch-protection-expectation-notes` |
| **PAC-713** | `TASK-503` | TASK-503 - Add local-only guard for demo:reset script | `feature/PAC-713-task-503-add-local-only-guard-for-demo-reset-script` |
| **PAC-714** | `TASK-504` | TASK-504 - Add Chrome desktop target verification checklist | `feature/PAC-714-task-504-add-chrome-desktop-target-verification-checklist` |
| **PAC-715** | `TASK-505` | TASK-505 - Add basic responsive verification checklist | `feature/PAC-715-task-505-add-basic-responsive-verification-checklist` |
| **PAC-716** | `TASK-506` | TASK-506 - Write project README setup section | `docs/PAC-716-task-506-write-project-readme-setup-section` |
| **PAC-717** | `TASK-507` | TASK-507 - Write backend setup and run instructions | `feature/PAC-717-task-507-write-backend-setup-and-run-instructions` |
| **PAC-718** | `TASK-508` | TASK-508 - Write frontend setup and run instructions | `feature/PAC-718-task-508-write-frontend-setup-and-run-instructions` |
| **PAC-719** | `TASK-509` | TASK-509 - Write database migration and seed instructions | `feature/PAC-719-task-509-write-database-migration-and-seed-instructions` |
| **PAC-720** | `TASK-510` | TASK-510 - Write Supabase Auth setup notes | `feature/PAC-720-task-510-write-supabase-auth-setup-notes` |
| **PAC-721** | `TASK-511` | TASK-511 - Write Neo4j setup and graph rebuild notes | `feature/PAC-721-task-511-write-neo4j-setup-and-graph-rebuild-notes` |
| **PAC-722** | `TASK-512` | TASK-512 - Write AI provider and MockAI fallback setup notes | `feature/PAC-722-task-512-write-ai-provider-and-mockai-fallback-setup-notes` |
| **PAC-723** | `TASK-513` | TASK-513 - Write demo account guide | `feature/PAC-723-task-513-write-demo-account-guide` |
| **PAC-724** | `TASK-514` | TASK-514 - Write demo scenario script for login and role switching | `feature/PAC-724-task-514-write-demo-scenario-script-for-login-and-role-switc` |
| **PAC-725** | `TASK-515` | TASK-515 - Write demo scenario script for Stock Import and MedicineBatch | `feature/PAC-725-task-515-write-demo-scenario-script-for-stock-import-and-med` |
| **PAC-726** | `TASK-516` | TASK-516 - Write demo scenario script for POS and Checkout | `feature/PAC-726-task-516-write-demo-scenario-script-for-pos-and-checkout` |
| **PAC-727** | `TASK-517` | TASK-517 - Write demo scenario script for InteractionAlert and HIGH note | `feature/PAC-727-task-517-write-demo-scenario-script-for-interactionalert-and` |
| **PAC-728** | `TASK-518` | TASK-518 - Write demo scenario script for AI Copilot and AI Audit | `feature/PAC-728-task-518-write-demo-scenario-script-for-ai-copilot-and-ai-au` |
| **PAC-729** | `TASK-519` | TASK-519 - Write demo scenario script for Graph Sync and Graph-RAG | `feature/PAC-729-task-519-write-demo-scenario-script-for-graph-sync-and-graph` |
| **PAC-730** | `TASK-520` | TASK-520 - Write demo scenario script for Reports and Settings | `feature/PAC-730-task-520-write-demo-scenario-script-for-reports-and-settings` |
| **PAC-731** | `TASK-521` | TASK-521 - Write MVP traceability matrix summary | `feature/PAC-731-task-521-write-mvp-traceability-matrix-summary` |
| **PAC-732** | `TASK-522` | TASK-522 - Write release/demo readiness checklist | `feature/PAC-732-task-522-write-release-demo-readiness-checklist` |
| **PAC-733** | `TASK-523` | TASK-523 - Write known limitations and out-of-scope guard section | `feature/PAC-733-task-523-write-known-limitations-and-out-of-scope-guard-sect` |
| **PAC-734** | `TASK-524` | TASK-524 - Prepare contingency evidence screenshots list | `feature/PAC-734-task-524-prepare-contingency-evidence-screenshots-list` |
| **PAC-735** | `TASK-525` | TASK-525 - Prepare final smoke test report template | `test/PAC-735-task-525-prepare-final-smoke-test-report-template` |
| **PAC-736** | `TASK-526` | TASK-526 - Build Admin Graph Sync Status list UI | `feature/PAC-736-task-526-build-admin-graph-sync-status-list-ui` |
| **PAC-737** | `TASK-527` | TASK-527 - Build Graph Sync job detail UI | `feature/PAC-737-task-527-build-graph-sync-job-detail-ui` |
| **PAC-738** | `TASK-528` | TASK-528 - Build manual graph retry action for Admin | `feature/PAC-738-task-528-build-manual-graph-retry-action-for-admin` |
| **PAC-739** | `TASK-529` | TASK-529 - Build manual graph rebuild action for Admin | `feature/PAC-739-task-529-build-manual-graph-rebuild-action-for-admin` |
| **PAC-740** | `TASK-530` | TASK-530 - Add Graph Sync Status permission checks | `feature/PAC-740-task-530-add-graph-sync-status-permission-checks` |
| **PAC-741** | `TASK-531` | TASK-531 - Build read-only Graph Explorer UI | `feature/PAC-741-task-531-build-read-only-graph-explorer-ui` |
| **PAC-742** | `TASK-532` | TASK-532 - Build Graph Explorer node detail panel | `feature/PAC-742-task-532-build-graph-explorer-node-detail-panel` |
| **PAC-743** | `TASK-533` | TASK-533 - Build Graph Explorer relationship detail panel | `feature/PAC-743-task-533-build-graph-explorer-relationship-detail-panel` |
| **PAC-744** | `TASK-534` | TASK-534 - Add Graph Explorer permission checks | `feature/PAC-744-task-534-add-graph-explorer-permission-checks` |
| **PAC-745** | `TASK-535` | TASK-535 - Ensure Graph Explorer uses allowlisted templates only | `feature/PAC-745-task-535-ensure-graph-explorer-uses-allowlisted-templates-on` |
| **PAC-746** | `TASK-536` | TASK-536 - Build AI Provider Settings UI | `feature/PAC-746-task-536-build-ai-provider-settings-ui` |
| **PAC-747** | `TASK-537` | TASK-537 - Build AI model configuration UI | `feature/PAC-747-task-537-build-ai-model-configuration-ui` |
| **PAC-748** | `TASK-538` | TASK-538 - Build Prompt Management list UI | `feature/PAC-748-task-538-build-prompt-management-list-ui` |
| **PAC-749** | `TASK-539` | TASK-539 - Build Prompt Management version detail UI | `feature/PAC-749-task-539-build-prompt-management-version-detail-ui` |
| **PAC-750** | `TASK-540` | TASK-540 - Add prompt approval status display | `feature/PAC-750-task-540-add-prompt-approval-status-display` |
| **PAC-751** | `TASK-541` | TASK-541 - Build System Audit Log UI | `feature/PAC-751-task-541-build-system-audit-log-ui` |
| **PAC-752** | `TASK-542` | TASK-542 - Add System Audit Log filters | `feature/PAC-752-task-542-add-system-audit-log-filters` |
| **PAC-753** | `TASK-543` | TASK-543 - Implement Supabase Storage upload flow for medicine images | `feature/PAC-753-task-543-implement-supabase-storage-upload-flow-for-medicine` |
| **PAC-754** | `TASK-544` | TASK-544 - Build medicine image upload UI | `feature/PAC-754-task-544-build-medicine-image-upload-ui` |
| **PAC-755** | `TASK-545` | TASK-545 - Add Supabase Storage file validation | `feature/PAC-755-task-545-add-supabase-storage-file-validation` |
| **PAC-756** | `TASK-546` | TASK-546 - Implement Supabase Realtime inventory update listener | `feature/PAC-756-task-546-implement-supabase-realtime-inventory-update-listen` |
| **PAC-757** | `TASK-547` | TASK-547 - Build realtime POS stock refresh behavior | `feature/PAC-757-task-547-build-realtime-pos-stock-refresh-behavior` |
| **PAC-758** | `TASK-548` | TASK-548 - Add realtime fallback polling behavior | `feature/PAC-758-task-548-add-realtime-fallback-polling-behavior` |
| **PAC-759** | `TASK-549` | TASK-549 - Build Notification Center UI | `feature/PAC-759-task-549-build-notification-center-ui` |
| **PAC-760** | `TASK-550` | TASK-550 - Implement low-stock notification generation | `feature/PAC-760-task-550-implement-low-stock-notification-generation` |
| **PAC-761** | `TASK-551` | TASK-551 - Implement near-expiry notification generation | `feature/PAC-761-task-551-implement-near-expiry-notification-generation` |
| **PAC-762** | `TASK-552` | TASK-552 - Build read/unread notification state | `feature/PAC-762-task-552-build-read-unread-notification-state` |
| **PAC-763** | `TASK-553` | TASK-553 - Implement scheduled near-expiry scan job | `feature/PAC-763-task-553-implement-scheduled-near-expiry-scan-job` |
| **PAC-764** | `TASK-554` | TASK-554 - Implement AI Business Report Narrative API | `feature/PAC-764-task-554-implement-ai-business-report-narrative-api` |
| **PAC-765** | `TASK-555` | TASK-555 - Build AI Business Report Narrative UI | `feature/PAC-765-task-555-build-ai-business-report-narrative-ui` |
| **PAC-766** | `TASK-556` | TASK-556 - Document Full Customer Management future scope | `docs/PAC-766-task-556-document-full-customer-management-future-scope` |
| **PAC-767** | `TASK-557` | TASK-557 - Document customer profile CRUD future scope | `docs/PAC-767-task-557-document-customer-profile-crud-future-scope` |
| **PAC-768** | `TASK-558` | TASK-558 - Document customer purchase history expansion | `docs/PAC-768-task-558-document-customer-purchase-history-expansion` |
| **PAC-769** | `TASK-559` | TASK-559 - Document Online Commerce storefront future scope | `docs/PAC-769-task-559-document-online-commerce-storefront-future-scope` |
| **PAC-770** | `TASK-560` | TASK-560 - Document online cart and wishlist future scope | `docs/PAC-770-task-560-document-online-cart-and-wishlist-future-scope` |
| **PAC-771** | `TASK-561` | TASK-561 - Document online checkout separation from POS checkout | `docs/PAC-771-task-561-document-online-checkout-separation-from-pos-checko` |
| **PAC-772** | `TASK-562` | TASK-562 - Document Product Variant Catalog future scope | `docs/PAC-772-task-562-document-product-variant-catalog-future-scope` |
| **PAC-773** | `TASK-563` | TASK-563 - Document product images and documents commercial scope | `docs/PAC-773-task-563-document-product-images-and-documents-commercial-sc` |
| **PAC-774** | `TASK-564` | TASK-564 - Document real catalog data import future workflow | `docs/PAC-774-task-564-document-real-catalog-data-import-future-workflow` |
| **PAC-775** | `TASK-565` | TASK-565 - Document Multi-store future scope | `docs/PAC-775-task-565-document-multi-store-future-scope` |
| **PAC-776** | `TASK-566` | TASK-566 - Document default store assumption for MVP | `docs/PAC-776-task-566-document-default-store-assumption-for-mvp` |
| **PAC-777** | `TASK-567` | TASK-567 - Document Multi-warehouse future scope | `docs/PAC-777-task-567-document-multi-warehouse-future-scope` |
| **PAC-778** | `TASK-568` | TASK-568 - Document default warehouse assumption for MVP | `docs/PAC-778-task-568-document-default-warehouse-assumption-for-mvp` |
| **PAC-779** | `TASK-569` | TASK-569 - Document Stock Transfer future workflow | `docs/PAC-779-task-569-document-stock-transfer-future-workflow` |
| **PAC-780** | `TASK-570` | TASK-570 - Document stock transfer audit future requirement | `docs/PAC-780-task-570-document-stock-transfer-audit-future-requirement` |
| **PAC-781** | `TASK-571` | TASK-571 - Document Forecasting and reorder suggestion future scope | `docs/PAC-781-task-571-document-forecasting-and-reorder-suggestion-future-` |
| **PAC-782** | `TASK-572` | TASK-572 - Document forecast data requirements and limitations | `docs/PAC-782-task-572-document-forecast-data-requirements-and-limitations` |
| **PAC-783** | `TASK-573` | TASK-573 - Document Promotion and Coupon future scope | `docs/PAC-783-task-573-document-promotion-and-coupon-future-scope` |
| **PAC-784** | `TASK-574` | TASK-574 - Document discount not included in MVP checkout | `docs/PAC-784-task-574-document-discount-not-included-in-mvp-checkout` |
| **PAC-785** | `TASK-575` | TASK-575 - Document Shipping and Delivery future scope | `docs/PAC-785-task-575-document-shipping-and-delivery-future-scope` |
| **PAC-786** | `TASK-576` | TASK-576 - Document delivery status future workflow | `docs/PAC-786-task-576-document-delivery-status-future-workflow` |
| **PAC-787** | `TASK-577` | TASK-577 - Document Review and CMS future scope | `docs/PAC-787-task-577-document-review-and-cms-future-scope` |
| **PAC-788** | `TASK-578` | TASK-578 - Document product review moderation future consideration | `docs/PAC-788-task-578-document-product-review-moderation-future-considera` |
| **PAC-789** | `TASK-579` | TASK-579 - Document commercial expansion dependency map | `docs/PAC-789-task-579-document-commercial-expansion-dependency-map` |
| **PAC-790** | `TASK-580` | TASK-580 - Document final out-of-scope guardrails for AI agents | `docs/PAC-790-task-580-document-final-out-of-scope-guardrails-for-ai-agent` |