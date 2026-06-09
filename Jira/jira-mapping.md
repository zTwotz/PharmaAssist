# Jira Branch Mapping Table

> [!IMPORTANT]
> Tài liệu này là Single Source of Truth cho toàn bộ Jira Key trên dự án. Khi tạo branch, tạo commit hay ghi log, bắt buộc phải sử dụng mã thực tế ở cột **Jira Key** trong bảng này thay vì tự tính nhẩm.

## 1. Epics (39)

| Logical Key | Jira Key | Summary |
|---|---|---|
| `PAC-EPIC-01` | **`PAC-1`** | PAC-EPIC-01 - Auth & RBAC |
| `PAC-EPIC-02` | **`PAC-2`** | PAC-EPIC-02 - User / Staff Account Management |
| `PAC-EPIC-03` | **`PAC-3`** | PAC-EPIC-03 - Medicine & ActiveIngredient |
| `PAC-EPIC-04` | **`PAC-4`** | PAC-EPIC-04 - Supplier Management |
| `PAC-EPIC-05` | **`PAC-5`** | PAC-EPIC-05 - Inventory & MedicineBatch |
| `PAC-EPIC-06` | **`PAC-6`** | PAC-EPIC-06 - Stock Import |
| `PAC-EPIC-07` | **`PAC-7`** | PAC-EPIC-07 - Inventory Adjustment |
| `PAC-EPIC-08` | **`PAC-8`** | PAC-EPIC-08 - POS Draft Order |
| `PAC-EPIC-09` | **`PAC-9`** | PAC-EPIC-09 - DrugInteraction Rule |
| `PAC-EPIC-10` | **`PAC-10`** | PAC-EPIC-10 - InteractionAlert Lifecycle |
| `PAC-EPIC-11` | **`PAC-11`** | PAC-EPIC-11 - Checkout, FEFO, Payment & Invoice |
| `PAC-EPIC-12` | **`PAC-12`** | PAC-EPIC-12 - AI Copilot |
| `PAC-EPIC-13` | **`PAC-13`** | PAC-EPIC-13 - AI Guardrail & AI Audit |
| `PAC-EPIC-14` | **`PAC-14`** | PAC-EPIC-14 - Graph Sync & Neo4j Projection |
| `PAC-EPIC-15` | **`PAC-15`** | PAC-EPIC-15 - Graph-RAG |
| `PAC-EPIC-16` | **`PAC-16`** | PAC-EPIC-16 - Reports |
| `PAC-EPIC-17` | **`PAC-17`** | PAC-EPIC-17 - System Settings |
| `PAC-EPIC-18` | **`PAC-18`** | PAC-EPIC-18 - Data Seed & Demo Reset |
| `PAC-EPIC-19` | **`PAC-19`** | PAC-EPIC-19 - Testing, Smoke Test & Release Readiness |
| `PAC-EPIC-20` | **`PAC-20`** | PAC-EPIC-20 - DevOps, CI & Setup |
| `PAC-EPIC-21` | **`PAC-21`** | PAC-EPIC-21 - Documentation & Traceability |
| `PAC-EPIC-22` | **`PAC-22`** | PAC-EPIC-22 - Admin Graph Sync Status UI |
| `PAC-EPIC-23` | **`PAC-23`** | PAC-EPIC-23 - Read-only Graph Explorer |
| `PAC-EPIC-24` | **`PAC-24`** | PAC-EPIC-24 - AI Provider & Prompt Management UI |
| `PAC-EPIC-25` | **`PAC-25`** | PAC-EPIC-25 - System Audit Log UI |
| `PAC-EPIC-26` | **`PAC-26`** | PAC-EPIC-26 - Supabase Storage for Medicine Images |
| `PAC-EPIC-27` | **`PAC-27`** | PAC-EPIC-27 - Supabase Realtime Inventory Updates |
| `PAC-EPIC-28` | **`PAC-28`** | PAC-EPIC-28 - Notification Center |
| `PAC-EPIC-29` | **`PAC-29`** | PAC-EPIC-29 - AI Business Report Narrative |
| `PAC-EPIC-30` | **`PAC-30`** | PAC-EPIC-30 - Advanced Testing & Demo Evidence |
| `PAC-EPIC-31` | **`PAC-31`** | PAC-EPIC-31 - Full Customer Management |
| `PAC-EPIC-32` | **`PAC-32`** | PAC-EPIC-32 - Online Commerce |
| `PAC-EPIC-33` | **`PAC-33`** | PAC-EPIC-33 - Product Variant Catalog |
| `PAC-EPIC-34` | **`PAC-34`** | PAC-EPIC-34 - Multi-store / Multi-warehouse |
| `PAC-EPIC-35` | **`PAC-35`** | PAC-EPIC-35 - Stock Transfer |
| `PAC-EPIC-36` | **`PAC-36`** | PAC-EPIC-36 - Forecasting & Reorder Suggestions |
| `PAC-EPIC-37` | **`PAC-37`** | PAC-EPIC-37 - Promotion / Coupon |
| `PAC-EPIC-38` | **`PAC-38`** | PAC-EPIC-38 - Shipping / Delivery |
| `PAC-EPIC-39` | **`PAC-39`** | PAC-EPIC-39 - Review / CMS |

## 2. User Stories (170)

| Logical Key | Jira Key | Summary |
|---|---|---|
| `US-01` | **`PAC-40`** | US-01 - Đăng nhập bằng Supabase Auth |
| `US-02` | **`PAC-41`** | US-02 - Đăng xuất và dọn session |
| `US-03` | **`PAC-42`** | US-03 - Xác thực session ở backend |
| `US-04` | **`PAC-43`** | US-04 - Lấy thông tin người dùng hiện tại |
| `US-05` | **`PAC-44`** | US-05 - Multi-role RBAC model |
| `US-06` | **`PAC-45`** | US-06 - Permission-based API Guard |
| `US-07` | **`PAC-46`** | US-07 - Permission-aware frontend UI |
| `US-08` | **`PAC-47`** | US-08 - Staff ownership scope |
| `US-09` | **`PAC-48`** | US-09 - Warehouse access restrictions |
| `US-10` | **`PAC-49`** | US-10 - Admin tạo tài khoản nhân viên |
| `US-11` | **`PAC-50`** | US-11 - Đổi mật khẩu lần đầu |
| `US-12` | **`PAC-51`** | US-12 - Cập nhật trạng thái tài khoản nhân viên |
| `US-13` | **`PAC-52`** | US-13 - Thêm thuốc mới |
| `US-14` | **`PAC-53`** | US-14 - Cập nhật thông tin thuốc |
| `US-15` | **`PAC-54`** | US-15 - Tìm kiếm và lọc thuốc |
| `US-16` | **`PAC-55`** | US-16 - Deactivate thuốc |
| `US-17` | **`PAC-56`** | US-17 - Validate giá bán thuốc lớn hơn 0 |
| `US-18` | **`PAC-57`** | US-18 - Quản lý ActiveIngredient |
| `US-19` | **`PAC-58`** | US-19 - Mapping Medicine với ActiveIngredient |
| `US-20` | **`PAC-59`** | US-20 - Validate mapping hoạt chất không trùng |
| `US-21` | **`PAC-60`** | US-21 - Chuẩn h��a dữ liệu hoạt chất |
| `US-22` | **`PAC-61`** | US-22 - Trigger Graph Sync khi Medicine/Ingredient thay đổi |
| `US-23` | **`PAC-62`** | US-23 - Tạo nhà cung cấp |
| `US-24` | **`PAC-63`** | US-24 - Cập nhật và tìm kiếm nhà cung cấp |
| `US-25` | **`PAC-64`** | US-25 - Admin deactivate nhà cung cấp |
| `US-26` | **`PAC-65`** | US-26 - Liên kết Supplier với Stock Import |
| `US-27` | **`PAC-66`** | US-27 - Thiết kế MedicineBatch là source of truth |
| `US-28` | **`PAC-67`** | US-28 - Batch number bắt buộc |
| `US-29` | **`PAC-68`** | US-29 - Batch identity theo medicine + batch + expiry |
| `US-30` | **`PAC-69`** | US-30 - Inventory Summary từ MedicineBatch |
| `US-31` | **`PAC-70`** | US-31 - Batch Detail view |
| `US-32` | **`PAC-71`** | US-32 - Tính sellable quantity |
| `US-33` | **`PAC-72`** | US-33 - Loại trừ batch hết hạn khỏi sellable stock |
| `US-34` | **`PAC-73`** | US-34 - Low-stock dựa trên sellable quantity |
| `US-35` | **`PAC-74`** | US-35 - Near-expiry theo threshold cấu hình |
| `US-36` | **`PAC-75`** | US-36 - Inventory dashboard cho Admin/Warehouse |
| `US-37` | **`PAC-76`** | US-37 - POS chỉ xem sellable stock cần bán |
| `US-38` | **`PAC-77`** | US-38 - Chặn sửa trực tiếp quantity trong Batch Detail |
| `US-39` | **`PAC-78`** | US-39 - Tạo phiếu nhập kho draft |
| `US-40` | **`PAC-79`** | US-40 - Thêm dòng thuốc vào phiếu nhập |
| `US-41` | **`PAC-80`** | US-41 - Cập nhật/xóa dòng nhập khi còn draft |
| `US-42` | **`PAC-81`** | US-42 - Validate supplier trong phiếu nhập |
| `US-43` | **`PAC-82`** | US-43 - Validate batch number và expiry date |
| `US-44` | **`PAC-83`** | US-44 - Confirm Stock Import transaction |
| `US-45` | **`PAC-84`** | US-45 - Merge batch khi medicine/batch/expiry trùng |
| `US-46` | **`PAC-85`** | US-46 - Reject batch khi cùng batch nhưng khác expiry |
| `US-47` | **`PAC-86`** | US-47 - Khóa phiếu nhập đã confirmed |
| `US-48` | **`PAC-87`** | US-48 - Audit Stock Import |
| `US-49` | **`PAC-88`** | US-49 - Tạo Inventory Adjustment |
| `US-50` | **`PAC-89`** | US-50 - Adjustment bắt buộc reason |
| `US-51` | **`PAC-90`** | US-51 - Chọn MedicineBatch cần điều chỉnh |
| `US-52` | **`PAC-91`** | US-52 - Confirm Inventory Adjustment transaction |
| `US-53` | **`PAC-92`** | US-53 - Chặn adjustment làm quantity âm |
| `US-54` | **`PAC-93`** | US-54 - Warehouse tạo và confirm adjustment |
| `US-55` | **`PAC-94`** | US-55 - Audit Inventory Adjustment |
| `US-56` | **`PAC-95`** | US-56 - Admin xem lịch sử adjustment |
| `US-57` | **`PAC-96`** | US-57 - Tạo Draft Order tại POS |
| `US-58` | **`PAC-97`** | US-58 - Tìm thuốc trong POS |
| `US-59` | **`PAC-98`** | US-59 - Thêm thuốc vào Draft Order |
| `US-60` | **`PAC-99`** | US-60 - Cập nhật số lượng thuốc trong Draft Order |
| `US-61` | **`PAC-100`** | US-61 - Xóa thuốc khỏi Draft Order |
| `US-62` | **`PAC-101`** | US-62 - Tính tổng tiền Draft Order |
| `US-63` | **`PAC-102`** | US-63 - Validate sellable stock khi lập đơn |
| `US-64` | **`PAC-103`** | US-64 - Hỗ trợ walk-in/anonymous customer |
| `US-65` | **`PAC-104`** | US-65 - Staff chỉ xem đơn trong ownership scope |
| `US-66` | **`PAC-105`** | US-66 - Admin xem tất cả đơn hàng |
| `US-67` | **`PAC-106`** | US-67 - Hủy Draft Order |
| `US-68` | **`PAC-107`** | US-68 - Giữ Draft Order khi checkout fail |
| `US-69` | **`PAC-108`** | US-69 - Tạo DrugInteraction Rule cấp ActiveIngredient |
| `US-70` | **`PAC-109`** | US-70 - Cập nhật/deactivate DrugInteraction Rule |
| `US-71` | **`PAC-110`** | US-71 - Severity chỉ gồm LOW/MEDIUM/HIGH |
| `US-72` | **`PAC-111`** | US-72 - Derive medicine interaction từ active ingredients |
| `US-73` | **`PAC-112`** | US-73 - Check interaction khi order có từ hai thuốc |
| `US-74` | **`PAC-113`** | US-74 - Persist InteractionAlert đã hiển thị |
| `US-75` | **`PAC-114`** | US-75 - Một active alert cho order_id + interaction_id |
| `US-76` | **`PAC-115`** | US-76 - Update last_displayed_at và display_count |
| `US-77` | **`PAC-116`** | US-77 - Hiển thị alert LOW/MEDIUM/HIGH trong POS |
| `US-78` | **`PAC-117`** | US-78 - HIGH alert acknowledgement |
| `US-79` | **`PAC-118`** | US-79 - HIGH alert consultation note |
| `US-80` | **`PAC-119`** | US-80 - Block checkout nếu HIGH unresolved |
| `US-81` | **`PAC-120`** | US-81 - Admin xem InteractionAlert History |
| `US-82` | **`PAC-121`** | US-82 - Warehouse không truy cập InteractionAlert |
| `US-83` | **`PAC-122`** | US-83 - Checkout API transaction |
| `US-84` | **`PAC-123`** | US-84 - Checkout validation pipeline |
| `US-85` | **`PAC-124`** | US-85 - Validate order status DRAFT |
| `US-86` | **`PAC-125`** | US-86 - Validate unresolved HIGH alerts |
| `US-87` | **`PAC-126`** | US-87 - Validate sellable stock trước checkout |
| `US-88` | **`PAC-128`** | US-88 - FEFO allocation service |
| `US-89` | **`PAC-129`** | US-89 - Multi-batch allocation persistence |
| `US-90` | **`PAC-130`** | US-90 - Trừ batch quantity trong transaction |
| `US-91` | **`PAC-131`** | US-91 - Idempotent checkout |
| `US-92` | **`PAC-132`** | US-92 - Rollback khi checkout failure |
| `US-93` | **`PAC-133`** | US-93 - Cash payment handling |
| `US-94` | **`PAC-134`** | US-94 - Tính change_amount cho thanh toán tiền mặt |
| `US-95` | **`PAC-135`** | US-95 - Simulated bank transfer transaction_reference |
| `US-96` | **`PAC-136`** | US-96 - One SUCCESS payment rule |
| `US-97` | **`PAC-137`** | US-97 - Invoice generated inside checkout |
| `US-98` | **`PAC-138`** | US-98 - Xem/in invoice sau checkout |
| `US-99` | **`PAC-139`** | US-99 - AI explanation for InteractionAlert |
| `US-100` | **`PAC-140`** | US-100 - AI consultation note draft |
| `US-101` | **`PAC-141`** | US-101 - Staff confirm AI draft before official save |
| `US-102` | **`PAC-142`** | US-102 - Safe follow-up questions |
| `US-103` | **`PAC-143`** | US-103 - Google AI provider primary |
| `US-104` | **`PAC-144`** | US-104 - MockAI fallback provider |
| `US-105` | **`PAC-145`** | US-105 - AI input guardrail |
| `US-106` | **`PAC-146`** | US-106 - Block diagnosis requests |
| `US-107` | **`PAC-147`** | US-107 - Block prescribing requests |
| `US-108` | **`PAC-148`** | US-108 - Block dosage advice requests |
| `US-109` | **`PAC-149`** | US-109 - AI output guardrail |
| `US-110` | **`PAC-150`** | US-110 - Structured output validation |
| `US-111` | **`PAC-151`** | US-111 - PII minimization before AI call |
| `US-112` | **`PAC-152`** | US-112 - AI safe error response |
| `US-113` | **`PAC-153`** | US-113 - AI disclaimer |
| `US-114` | **`PAC-154`** | US-114 - AI Audit metadata |
| `US-115` | **`PAC-155`** | US-115 - Prompt template versioning |
| `US-116` | **`PAC-156`** | US-116 - Admin AI Audit Log view |
| `US-117` | **`PAC-157`** | US-117 - Graph Sync Outbox |
| `US-118` | **`PAC-158`** | US-118 - Graph Sync Worker |
| `US-119` | **`PAC-159`** | US-119 - Project Medicine node to Neo4j |
| `US-120` | **`PAC-160`** | US-120 - Project ActiveIngredient node to Neo4j |
| `US-121` | **`PAC-161`** | US-121 - Project CONTAINS relationship |
| `US-122` | **`PAC-162`** | US-122 - Project INTERACTS_WITH relationship |
| `US-123` | **`PAC-163`** | US-123 - Canonical directed interaction edge |
| `US-124` | **`PAC-164`** | US-124 - Store graph projection metadata |
| `US-125` | **`PAC-165`** | US-125 - Retry failed graph sync jobs |
| `US-126` | **`PAC-166`** | US-126 - Log graph sync failures |
| `US-127` | **`PAC-167`** | US-127 - Graph freshness detection |
| `US-128` | **`PAC-168`** | US-128 - Deactivated graph entity with isActive=false |
| `US-129` | **`PAC-169`** | US-129 - Graph-RAG interaction explanation |
| `US-130` | **`PAC-170`** | US-130 - Graph-RAG provenance metadata |
| `US-131` | **`PAC-171`** | US-131 - Graph-RAG freshness metadata |
| `US-132` | **`PAC-172`** | US-132 - PostgreSQL fallback khi Neo4j unavailable |
| `US-133` | **`PAC-173`** | US-133 - PostgreSQL fallback khi graph stale |
| `US-134` | **`PAC-174`** | US-134 - Safe error cho graph-only query |
| `US-135` | **`PAC-175`** | US-135 - Không cho Staff submit raw Cypher |
| `US-136` | **`PAC-176`** | US-136 - Graph không quyết định checkout |
| `US-137` | **`PAC-177`** | US-137 - Revenue Report |
| `US-138` | **`PAC-178`** | US-138 - Top Medicines Report |
| `US-139` | **`PAC-179`** | US-139 - Inventory Report |
| `US-140` | **`PAC-180`** | US-140 - Basic report filters |
| `US-141` | **`PAC-181`** | US-141 - Near-expiry threshold setting |
| `US-142` | **`PAC-182`** | US-142 - AI provider/model backend config |
| `US-143` | **`PAC-183`** | US-143 - Seed official prompt templates |
| `US-144` | **`PAC-184`** | US-144 - System settings UI tối thiểu |
| `US-145` | **`PAC-185`** | US-145 - Curated MVP seed data |
| `US-146` | **`PAC-186`** | US-146 - Demo users by role |
| `US-147` | **`PAC-187`** | US-147 - Dynamic expiry dates for demo |
| `US-148` | **`PAC-188`** | US-148 - FEFO multi-batch demo scenario |
| `US-149` | **`PAC-189`** | US-149 - Seed PAID order with HIGH alert |
| `US-150` | **`PAC-190`** | US-150 - Local-only demo reset with graph rebuild and smoke test |
| `US-151` | **`PAC-191`** | US-151 - Admin Graph Sync Status UI |
| `US-152` | **`PAC-192`** | US-152 - Manual graph retry/rebuild UI |
| `US-153` | **`PAC-193`** | US-153 - Read-only Graph Explorer |
| `US-154` | **`PAC-194`** | US-154 - AI Provider Settings UI |
| `US-155` | **`PAC-195`** | US-155 - Prompt Management UI |
| `US-156` | **`PAC-196`** | US-156 - System Audit Log UI |
| `US-157` | **`PAC-197`** | US-157 - Supabase Storage for medicine images |
| `US-158` | **`PAC-198`** | US-158 - Supabase Realtime inventory updates |
| `US-159` | **`PAC-199`** | US-159 - Notification Center |
| `US-160` | **`PAC-200`** | US-160 - AI Business Report Narrative |
| `US-161` | **`PAC-201`** | US-161 - Full Customer Management backlog |
| `US-162` | **`PAC-202`** | US-162 - Online Commerce backlog |
| `US-163` | **`PAC-203`** | US-163 - Product Variant Catalog backlog |
| `US-164` | **`PAC-204`** | US-164 - Multi-store support backlog |
| `US-165` | **`PAC-205`** | US-165 - Multi-warehouse support backlog |
| `US-166` | **`PAC-206`** | US-166 - Stock Transfer backlog |
| `US-167` | **`PAC-207`** | US-167 - Forecasting & Reorder backlog |
| `US-168` | **`PAC-208`** | US-168 - Promotion / Coupon backlog |
| `US-169` | **`PAC-209`** | US-169 - Shipping / Delivery backlog |
| `US-170` | **`PAC-210`** | US-170 - Review / CMS backlog |

## 3. Tasks (580)

| Logical Key | Jira Key | Summary |
|---|---|---|
| `PAC-TASK-001` | **`PAC-211`** | PAC-TASK-001 - Configure Supabase Auth client in Next.js |
| `PAC-TASK-002` | **`PAC-212`** | PAC-TASK-002 - Build login page UI |
| `PAC-TASK-003` | **`PAC-213`** | PAC-TASK-003 - Connect login form to Supabase Auth |
| `PAC-TASK-004` | **`PAC-214`** | PAC-TASK-004 - Handle login loading, success and error states |
| `PAC-TASK-005` | **`PAC-215`** | PAC-TASK-005 - Redirect user after login based on permissions |
| `PAC-TASK-006` | **`PAC-216`** | PAC-TASK-006 - Implement logout action and Supabase session cleanup |
| `PAC-TASK-007` | **`PAC-217`** | PAC-TASK-007 - Protect frontend routes after logout |
| `PAC-TASK-008` | **`PAC-218`** | PAC-TASK-008 - Add login/logout smoke test checklist |
| `PAC-TASK-009` | **`PAC-219`** | PAC-TASK-009 - Configure Supabase token validation in NestJS |
| `PAC-TASK-010` | **`PAC-220`** | PAC-TASK-010 - Implement AuthGuard for protected APIs |
| `PAC-TASK-011` | **`PAC-221`** | PAC-TASK-011 - Return 401 for missing or invalid session |
| `PAC-TASK-012` | **`PAC-222`** | PAC-TASK-012 - Add backend auth unit tests |
| `PAC-TASK-013` | **`PAC-223`** | PAC-TASK-013 - Create user_profiles Prisma model |
| `PAC-TASK-014` | **`PAC-224`** | PAC-TASK-014 - Create GET /auth/me API |
| `PAC-TASK-015` | **`PAC-225`** | PAC-TASK-015 - Return current user roles and permissions |
| `PAC-TASK-016` | **`PAC-226`** | PAC-TASK-016 - Display current user profile in layout |
| `PAC-TASK-017` | **`PAC-227`** | PAC-TASK-017 - Create roles Prisma model |
| `PAC-TASK-018` | **`PAC-228`** | PAC-TASK-018 - Create permissions Prisma model |
| `PAC-TASK-019` | **`PAC-229`** | PAC-TASK-019 - Create user_roles Prisma model |
| `PAC-TASK-020` | **`PAC-230`** | PAC-TASK-020 - Create role_permissions Prisma model |
| `PAC-TASK-021` | **`PAC-231`** | PAC-TASK-021 - Seed Admin, Staff and Warehouse roles |
| `PAC-TASK-022` | **`PAC-232`** | PAC-TASK-022 - Seed MVP permissions |
| `PAC-TASK-023` | **`PAC-233`** | PAC-TASK-023 - Map permissions to roles |
| `PAC-TASK-024` | **`PAC-234`** | PAC-TASK-024 - Implement permission decorator |
| `PAC-TASK-025` | **`PAC-235`** | PAC-TASK-025 - Implement permission-based API guard |
| `PAC-TASK-026` | **`PAC-236`** | PAC-TASK-026 - Add permission checks to Auth and User APIs |
| `PAC-TASK-027` | **`PAC-237`** | PAC-TASK-027 - Add permission checks to Medicine APIs |
| `PAC-TASK-028` | **`PAC-238`** | PAC-TASK-028 - Add permission checks to Inventory APIs |
| `PAC-TASK-029` | **`PAC-239`** | PAC-TASK-029 - Add permission checks to POS and Checkout APIs |
| `PAC-TASK-030` | **`PAC-240`** | PAC-TASK-030 - Add 403 response format for forbidden access |
| `PAC-TASK-031` | **`PAC-241`** | PAC-TASK-031 - Build permission-aware sidebar |
| `PAC-TASK-032` | **`PAC-242`** | PAC-TASK-032 - Hide unauthorized action buttons |
| `PAC-TASK-033` | **`PAC-243`** | PAC-TASK-033 - Build forbidden access page |
| `PAC-TASK-034` | **`PAC-244`** | PAC-TASK-034 - Add frontend permission helper |
| `PAC-TASK-035` | **`PAC-245`** | PAC-TASK-035 - Implement Staff ownership query filter for orders |
| `PAC-TASK-036` | **`PAC-246`** | PAC-TASK-036 - Implement Staff ownership query filter for customer order history |
| `PAC-TASK-037` | **`PAC-247`** | PAC-TASK-037 - Add tests for Staff ownership scope |
| `PAC-TASK-038` | **`PAC-248`** | PAC-TASK-038 - Block Warehouse access to POS routes |
| `PAC-TASK-039` | **`PAC-249`** | PAC-TASK-039 - Block Warehouse access to InteractionAlert APIs |
| `PAC-TASK-040` | **`PAC-250`** | PAC-TASK-040 - Block Warehouse access to checkout APIs |
| `PAC-TASK-041` | **`PAC-251`** | PAC-TASK-041 - Build Admin create staff account form |
| `PAC-TASK-042` | **`PAC-252`** | PAC-TASK-042 - Implement POST /admin/users using Supabase Admin |
| `PAC-TASK-043` | **`PAC-253`** | PAC-TASK-043 - Create user profile after Supabase user creation |
| `PAC-TASK-044` | **`PAC-254`** | PAC-TASK-044 - Assign roles to new staff account |
| `PAC-TASK-045` | **`PAC-255`** | PAC-TASK-045 - Validate staff email uniqueness through Supabase |
| `PAC-TASK-046` | **`PAC-256`** | PAC-TASK-046 - Implement first-login password change screen |
| `PAC-TASK-047` | **`PAC-257`** | PAC-TASK-047 - Implement must_change_password check |
| `PAC-TASK-048` | **`PAC-258`** | PAC-TASK-048 - Implement password update through Supabase Auth |
| `PAC-TASK-049` | **`PAC-259`** | PAC-TASK-049 - Clear must_change_password after successful change |
| `PAC-TASK-050` | **`PAC-260`** | PAC-TASK-050 - Implement account active/inactive update API |
| `PAC-TASK-051` | **`PAC-261`** | PAC-TASK-051 - Build staff account status UI |
| `PAC-TASK-052` | **`PAC-262`** | PAC-TASK-052 - Add audit log for staff status change |
| `PAC-TASK-053` | **`PAC-263`** | PAC-TASK-053 - Create medicines Prisma model |
| `PAC-TASK-054` | **`PAC-264`** | PAC-TASK-054 - Add medicine code uniqueness constraint |
| `PAC-TASK-055` | **`PAC-265`** | PAC-TASK-055 - Implement POST /medicines API |
| `PAC-TASK-056` | **`PAC-266`** | PAC-TASK-056 - Build medicine create form |
| `PAC-TASK-057` | **`PAC-267`** | PAC-TASK-057 - Add medicine create success/error UI state |
| `PAC-TASK-058` | **`PAC-268`** | PAC-TASK-058 - Implement PATCH /medicines/{id} API |
| `PAC-TASK-059` | **`PAC-269`** | PAC-TASK-059 - Build medicine edit form |
| `PAC-TASK-060` | **`PAC-270`** | PAC-TASK-060 - Add medicine update validation and errors |
| `PAC-TASK-061` | **`PAC-271`** | PAC-TASK-061 - Implement medicine list API with pagination |
| `PAC-TASK-062` | **`PAC-272`** | PAC-TASK-062 - Implement medicine search by code/name |
| `PAC-TASK-063` | **`PAC-273`** | PAC-TASK-063 - Implement medicine filters |
| `PAC-TASK-064` | **`PAC-274`** | PAC-TASK-064 - Build medicine list table |
| `PAC-TASK-065` | **`PAC-275`** | PAC-TASK-065 - Add medicine list empty/loading/error states |
| `PAC-TASK-066` | **`PAC-276`** | PAC-TASK-066 - Implement medicine deactivate API |
| `PAC-TASK-067` | **`PAC-277`** | PAC-TASK-067 - Add deactivate action in medicine UI |
| `PAC-TASK-068` | **`PAC-278`** | PAC-TASK-068 - Prevent inactive medicines from POS selection |
| `PAC-TASK-069` | **`PAC-279`** | PAC-TASK-069 - Enforce selling_price greater than 0 in backend |
| `PAC-TASK-070` | **`PAC-280`** | PAC-TASK-070 - Add selling price validation in UI |
| `PAC-TASK-071` | **`PAC-281`** | PAC-TASK-071 - Add tests for medicine price validation |
| `PAC-TASK-072` | **`PAC-282`** | PAC-TASK-072 - Create active_ingredients Prisma model |
| `PAC-TASK-073` | **`PAC-283`** | PAC-TASK-073 - Implement ActiveIngredient create API |
| `PAC-TASK-074` | **`PAC-284`** | PAC-TASK-074 - Implement ActiveIngredient update API |
| `PAC-TASK-075` | **`PAC-285`** | PAC-TASK-075 - Implement ActiveIngredient list/search API |
| `PAC-TASK-076` | **`PAC-286`** | PAC-TASK-076 - Build ActiveIngredient management screen |
| `PAC-TASK-077` | **`PAC-287`** | PAC-TASK-077 - Add ActiveIngredient create/edit form validation |
| `PAC-TASK-078` | **`PAC-288`** | PAC-TASK-078 - Create medicine_active_ingredients mapping schema |
| `PAC-TASK-079` | **`PAC-289`** | PAC-TASK-079 - Implement Medicine-Ingredient mapping API |
| `PAC-TASK-080` | **`PAC-290`** | PAC-TASK-080 - Build ingredient mapping component in Medicine form |
| `PAC-TASK-081` | **`PAC-291`** | PAC-TASK-081 - Show mapped ingredients in medicine detail |
| `PAC-TASK-082` | **`PAC-292`** | PAC-TASK-082 - Add unique validation for ingredient mapping |
| `PAC-TASK-083` | **`PAC-293`** | PAC-TASK-083 - Prevent mapping inactive ingredient if not allowed |
| `PAC-TASK-084` | **`PAC-294`** | PAC-TASK-084 - Normalize ActiveIngredient names |
| `PAC-TASK-085` | **`PAC-295`** | PAC-TASK-085 - Reject raw scraped ingredient strings in official mapping |
| `PAC-TASK-086` | **`PAC-296`** | PAC-TASK-086 - Add ActiveIngredient data quality review checklist |
| `PAC-TASK-087` | **`PAC-297`** | PAC-TASK-087 - Create graph sync event when Medicine changes |
| `PAC-TASK-088` | **`PAC-298`** | PAC-TASK-088 - Create graph sync event when ActiveIngredient changes |
| `PAC-TASK-089` | **`PAC-299`** | PAC-TASK-089 - Create graph sync event when Ingredient mapping changes |
| `PAC-TASK-090` | **`PAC-300`** | PAC-TASK-090 - Create suppliers Prisma model |
| `PAC-TASK-091` | **`PAC-301`** | PAC-TASK-091 - Implement supplier create API |
| `PAC-TASK-092` | **`PAC-302`** | PAC-TASK-092 - Build supplier create form |
| `PAC-TASK-093` | **`PAC-303`** | PAC-TASK-093 - Validate supplier required fields |
| `PAC-TASK-094` | **`PAC-304`** | PAC-TASK-094 - Implement supplier list/search API |
| `PAC-TASK-095` | **`PAC-305`** | PAC-TASK-095 - Implement supplier update API |
| `PAC-TASK-096` | **`PAC-306`** | PAC-TASK-096 - Build supplier list and edit screen |
| `PAC-TASK-097` | **`PAC-307`** | PAC-TASK-097 - Implement Admin-only supplier deactivate API |
| `PAC-TASK-098` | **`PAC-308`** | PAC-TASK-098 - Add supplier deactivate confirmation UI |
| `PAC-TASK-099` | **`PAC-309`** | PAC-TASK-099 - Prevent inactive supplier in new Stock Import |
| `PAC-TASK-100` | **`PAC-310`** | PAC-TASK-100 - Link active supplier selection to Stock Import |
| `PAC-TASK-101` | **`PAC-311`** | PAC-TASK-101 - Build supplier selector for Stock Import UI |
| `PAC-TASK-102` | **`PAC-312`** | PAC-TASK-102 - Create medicine_batches Prisma model |
| `PAC-TASK-103` | **`PAC-313`** | PAC-TASK-103 - Add MedicineBatch indexes and constraints |
| `PAC-TASK-104` | **`PAC-314`** | PAC-TASK-104 - Remove aggregate inventory source-of-truth assumptions |
| `PAC-TASK-105` | **`PAC-315`** | PAC-TASK-105 - Document MedicineBatch as inventory source of truth |
| `PAC-TASK-106` | **`PAC-316`** | PAC-TASK-106 - Enforce required batch_number |
| `PAC-TASK-107` | **`PAC-317`** | PAC-TASK-107 - Normalize batch_number before comparison |
| `PAC-TASK-108` | **`PAC-318`** | PAC-TASK-108 - Add UI validation for batch_number |
| `PAC-TASK-109` | **`PAC-319`** | PAC-TASK-109 - Implement batch identity validation service |
| `PAC-TASK-110` | **`PAC-320`** | PAC-TASK-110 - Add migration constraint for medicine/batch/expiry uniqueness |
| `PAC-TASK-111` | **`PAC-321`** | PAC-TASK-111 - Add batch identity unit tests |
| `PAC-TASK-112` | **`PAC-322`** | PAC-TASK-112 - Implement inventory summary query from MedicineBatch |
| `PAC-TASK-113` | **`PAC-323`** | PAC-TASK-113 - Build Inventory Summary screen |
| `PAC-TASK-114` | **`PAC-324`** | PAC-TASK-114 - Add search/filter to Inventory Summary |
| `PAC-TASK-115` | **`PAC-325`** | PAC-TASK-115 - Implement Batch Detail API |
| `PAC-TASK-116` | **`PAC-326`** | PAC-TASK-116 - Build Batch Detail screen |
| `PAC-TASK-117` | **`PAC-327`** | PAC-TASK-117 - Display expired/near-expiry/sellable batch status |
| `PAC-TASK-118` | **`PAC-328`** | PAC-TASK-118 - Implement sellable quantity calculation service |
| `PAC-TASK-119` | **`PAC-329`** | PAC-TASK-119 - Add tests for sellable quantity calculation |
| `PAC-TASK-120` | **`PAC-330`** | PAC-TASK-120 - Exclude expired batches from sellable stock |
| `PAC-TASK-121` | **`PAC-331`** | PAC-TASK-121 - Add tests for expired batch exclusion |
| `PAC-TASK-122` | **`PAC-332`** | PAC-TASK-122 - Implement low-stock calculation from sellable quantity |
| `PAC-TASK-123` | **`PAC-333`** | PAC-TASK-123 - Display low-stock state for Admin/Warehouse |
| `PAC-TASK-124` | **`PAC-334`** | PAC-TASK-124 - Hide general low-stock dashboard from Staff |
| `PAC-TASK-125` | **`PAC-335`** | PAC-TASK-125 - Implement near-expiry calculation with threshold |
| `PAC-TASK-126` | **`PAC-336`** | PAC-TASK-126 - Display near-expiry batch state |
| `PAC-TASK-127` | **`PAC-337`** | PAC-TASK-127 - Build Admin/Warehouse inventory dashboard cards |
| `PAC-TASK-128` | **`PAC-338`** | PAC-TASK-128 - Build POS sellable stock display |
| `PAC-TASK-129` | **`PAC-339`** | PAC-TASK-129 - Remove direct quantity edit from Batch Detail UI |
| `PAC-TASK-130` | **`PAC-340`** | PAC-TASK-130 - Ensure no public API directly edits batch quantity |
| `PAC-TASK-131` | **`PAC-341`** | PAC-TASK-131 - Create stock_imports Prisma model |
| `PAC-TASK-132` | **`PAC-342`** | PAC-TASK-132 - Implement create Stock Import draft API |
| `PAC-TASK-133` | **`PAC-343`** | PAC-TASK-133 - Build create Stock Import screen |
| `PAC-TASK-134` | **`PAC-344`** | PAC-TASK-134 - Create stock_import_lines Prisma model |
| `PAC-TASK-135` | **`PAC-345`** | PAC-TASK-135 - Implement add stock import line API |
| `PAC-TASK-136` | **`PAC-346`** | PAC-TASK-136 - Build stock import line editor UI |
| `PAC-TASK-137` | **`PAC-347`** | PAC-TASK-137 - Implement update draft import line API |
| `PAC-TASK-138` | **`PAC-348`** | PAC-TASK-138 - Implement delete draft import line API |
| `PAC-TASK-139` | **`PAC-349`** | PAC-TASK-139 - Disable edit/delete for confirmed import lines |
| `PAC-TASK-140` | **`PAC-350`** | PAC-TASK-140 - Validate active supplier before confirm import |
| `PAC-TASK-141` | **`PAC-351`** | PAC-TASK-141 - Validate batch number in import line |
| `PAC-TASK-142` | **`PAC-352`** | PAC-TASK-142 - Validate expiry date in import line |
| `PAC-TASK-143` | **`PAC-353`** | PAC-TASK-143 - Implement confirm Stock Import transaction skeleton |
| `PAC-TASK-144` | **`PAC-354`** | PAC-TASK-144 - Apply stock import lines to MedicineBatch |
| `PAC-TASK-145` | **`PAC-355`** | PAC-TASK-145 - Rollback Stock Import confirm on any invalid line |
| `PAC-TASK-146` | **`PAC-356`** | PAC-TASK-146 - Implement batch merge when medicine/batch/expiry match |
| `PAC-TASK-147` | **`PAC-357`** | PAC-TASK-147 - Add unit tests for valid batch merge rule |
| `PAC-TASK-148` | **`PAC-358`** | PAC-TASK-148 - Show batch merge result after Stock Import confirm |
| `PAC-TASK-149` | **`PAC-359`** | PAC-TASK-149 - Implement expiry mismatch rejection |
| `PAC-TASK-150` | **`PAC-360`** | PAC-TASK-150 - Return line-level expiry mismatch errors |
| `PAC-TASK-151` | **`PAC-361`** | PAC-TASK-151 - Add tests for expiry mismatch rejection |
| `PAC-TASK-152` | **`PAC-362`** | PAC-TASK-152 - Lock confirmed Stock Import status |
| `PAC-TASK-153` | **`PAC-363`** | PAC-TASK-153 - Build confirmed Stock Import read-only UI |
| `PAC-TASK-154` | **`PAC-364`** | PAC-TASK-154 - Prevent duplicate Stock Import confirm |
| `PAC-TASK-155` | **`PAC-365`** | PAC-TASK-155 - Add tests for confirmed Stock Import immutability |
| `PAC-TASK-156` | **`PAC-366`** | PAC-TASK-156 - Write audit log for Stock Import confirm |
| `PAC-TASK-157` | **`PAC-367`** | PAC-TASK-157 - Show Stock Import audit metadata in detail UI |
| `PAC-TASK-158` | **`PAC-368`** | PAC-TASK-158 - Add Stock Import traceability notes |
| `PAC-TASK-159` | **`PAC-369`** | PAC-TASK-159 - Add Stock Import confirm integration tests |
| `PAC-TASK-160` | **`PAC-370`** | PAC-TASK-160 - Add Stock Import smoke test checklist |
| `PAC-TASK-161` | **`PAC-371`** | PAC-TASK-161 - Create inventory_adjustments Prisma model |
| `PAC-TASK-162` | **`PAC-372`** | PAC-TASK-162 - Create inventory_adjustment_lines Prisma model |
| `PAC-TASK-163` | **`PAC-373`** | PAC-TASK-163 - Implement create Inventory Adjustment API |
| `PAC-TASK-164` | **`PAC-374`** | PAC-TASK-164 - Build create Inventory Adjustment screen |
| `PAC-TASK-165` | **`PAC-375`** | PAC-TASK-165 - Build MedicineBatch selector for adjustment |
| `PAC-TASK-166` | **`PAC-376`** | PAC-TASK-166 - Validate adjustment type and quantity |
| `PAC-TASK-167` | **`PAC-377`** | PAC-TASK-167 - Enforce required adjustment reason in backend |
| `PAC-TASK-168` | **`PAC-378`** | PAC-TASK-168 - Add required reason validation in UI |
| `PAC-TASK-169` | **`PAC-379`** | PAC-TASK-169 - Show batch before/after quantity preview |
| `PAC-TASK-170` | **`PAC-380`** | PAC-TASK-170 - Implement confirm Inventory Adjustment transaction |
| `PAC-TASK-171` | **`PAC-381`** | PAC-TASK-171 - Update MedicineBatch through adjustment transaction only |
| `PAC-TASK-172` | **`PAC-382`** | PAC-TASK-172 - Prevent adjustment from making quantity negative |
| `PAC-TASK-173` | **`PAC-383`** | PAC-TASK-173 - Lock confirmed Inventory Adjustment |
| `PAC-TASK-174` | **`PAC-384`** | PAC-TASK-174 - Create Inventory Adjustment list API |
| `PAC-TASK-175` | **`PAC-385`** | PAC-TASK-175 - Build Inventory Adjustment history list UI |
| `PAC-TASK-176` | **`PAC-386`** | PAC-TASK-176 - Implement Inventory Adjustment detail API |
| `PAC-TASK-177` | **`PAC-387`** | PAC-TASK-177 - Build Inventory Adjustment detail screen |
| `PAC-TASK-178` | **`PAC-388`** | PAC-TASK-178 - Add Warehouse permission for create/confirm adjustment |
| `PAC-TASK-179` | **`PAC-389`** | PAC-TASK-179 - Add Admin permission for adjustment history and review |
| `PAC-TASK-180` | **`PAC-390`** | PAC-TASK-180 - Write audit log for Inventory Adjustment |
| `PAC-TASK-181` | **`PAC-391`** | PAC-TASK-181 - Display adjustment audit information in UI |
| `PAC-TASK-182` | **`PAC-392`** | PAC-TASK-182 - Add tests for negative quantity adjustment |
| `PAC-TASK-183` | **`PAC-393`** | PAC-TASK-183 - Add tests for required adjustment reason |
| `PAC-TASK-184` | **`PAC-394`** | PAC-TASK-184 - Add tests for Warehouse adjustment permission |
| `PAC-TASK-185` | **`PAC-395`** | PAC-TASK-185 - Block direct MedicineBatch quantity update service path |
| `PAC-TASK-186` | **`PAC-396`** | PAC-TASK-186 - Implement cancel Draft Inventory Adjustment API |
| `PAC-TASK-187` | **`PAC-397`** | PAC-TASK-187 - Build cancel Draft Inventory Adjustment UI |
| `PAC-TASK-188` | **`PAC-398`** | PAC-TASK-188 - Refresh Inventory Summary after adjustment confirm |
| `PAC-TASK-189` | **`PAC-399`** | PAC-TASK-189 - Add Inventory Adjustment smoke test checklist |
| `PAC-TASK-190` | **`PAC-400`** | PAC-TASK-190 - Add Inventory Adjustment traceability notes |
| `PAC-TASK-191` | **`PAC-401`** | PAC-TASK-191 - Create orders Prisma model |
| `PAC-TASK-192` | **`PAC-402`** | PAC-TASK-192 - Create order_items Prisma model |
| `PAC-TASK-193` | **`PAC-403`** | PAC-TASK-193 - Add order status enum DRAFT/PAID/CANCELLED |
| `PAC-TASK-194` | **`PAC-404`** | PAC-TASK-194 - Implement create Draft Order API |
| `PAC-TASK-195` | **`PAC-405`** | PAC-TASK-195 - Build POS Draft Order screen |
| `PAC-TASK-196` | **`PAC-406`** | PAC-TASK-196 - Implement POS medicine search API |
| `PAC-TASK-197` | **`PAC-407`** | PAC-TASK-197 - Build POS medicine search component |
| `PAC-TASK-198` | **`PAC-408`** | PAC-TASK-198 - Display sellable stock in POS search results |
| `PAC-TASK-199` | **`PAC-409`** | PAC-TASK-199 - Implement add item to Draft Order API |
| `PAC-TASK-200` | **`PAC-410`** | PAC-TASK-200 - Build add-to-order action in POS |
| `PAC-TASK-201` | **`PAC-411`** | PAC-TASK-201 - Validate active medicine when adding POS item |
| `PAC-TASK-202` | **`PAC-412`** | PAC-TASK-202 - Implement update Draft Order item quantity API |
| `PAC-TASK-203` | **`PAC-413`** | PAC-TASK-203 - Build quantity controls in Draft Order UI |
| `PAC-TASK-204` | **`PAC-414`** | PAC-TASK-204 - Validate Draft Order quantity greater than zero |
| `PAC-TASK-205` | **`PAC-415`** | PAC-TASK-205 - Validate sellable stock when updating Draft Order quantity |
| `PAC-TASK-206` | **`PAC-416`** | PAC-TASK-206 - Implement remove item from Draft Order API |
| `PAC-TASK-207` | **`PAC-417`** | PAC-TASK-207 - Build remove item action in POS |
| `PAC-TASK-208` | **`PAC-418`** | PAC-TASK-208 - Implement Draft Order total calculation service |
| `PAC-TASK-209` | **`PAC-419`** | PAC-TASK-209 - Display Draft Order totals in POS UI |
| `PAC-TASK-210` | **`PAC-420`** | PAC-TASK-210 - Ensure no coupon or discount logic in MVP Draft Order total |
| `PAC-TASK-211` | **`PAC-421`** | PAC-TASK-211 - Show POS stock validation errors |
| `PAC-TASK-212` | **`PAC-422`** | PAC-TASK-212 - Implement walk-in customer support in order model |
| `PAC-TASK-213` | **`PAC-423`** | PAC-TASK-213 - Display walk-in customer option in POS |
| `PAC-TASK-214` | **`PAC-424`** | PAC-TASK-214 - Keep full Customer Management out of MVP POS flow |
| `PAC-TASK-215` | **`PAC-425`** | PAC-TASK-215 - Apply Staff ownership scope to order list API |
| `PAC-TASK-216` | **`PAC-426`** | PAC-TASK-216 - Build Staff scoped order list UI |
| `PAC-TASK-217` | **`PAC-427`** | PAC-TASK-217 - Implement Admin all-orders list API |
| `PAC-TASK-218` | **`PAC-428`** | PAC-TASK-218 - Build Admin all-orders UI |
| `PAC-TASK-219` | **`PAC-429`** | PAC-TASK-219 - Implement cancel Draft Order API |
| `PAC-TASK-220` | **`PAC-430`** | PAC-TASK-220 - Build cancel Draft Order UI |
| `PAC-TASK-221` | **`PAC-431`** | PAC-TASK-221 - Prevent cancel PAID or already CANCELLED order |
| `PAC-TASK-222` | **`PAC-432`** | PAC-TASK-222 - Preserve Draft Order after checkout failure in UI |
| `PAC-TASK-223` | **`PAC-433`** | PAC-TASK-223 - Restore checkout error state back to Draft Order |
| `PAC-TASK-224` | **`PAC-434`** | PAC-TASK-224 - Build Order Detail screen for DRAFT/PAID/CANCELLED |
| `PAC-TASK-225` | **`PAC-435`** | PAC-TASK-225 - Add POS API integration tests |
| `PAC-TASK-226` | **`PAC-436`** | PAC-TASK-226 - Add POS frontend smoke test checklist |
| `PAC-TASK-227` | **`PAC-437`** | PAC-TASK-227 - Create drug_interaction_rules Prisma model |
| `PAC-TASK-228` | **`PAC-438`** | PAC-TASK-228 - Implement create ActiveIngredient-level interaction rule API |
| `PAC-TASK-229` | **`PAC-439`** | PAC-TASK-229 - Build DrugInteraction Rule management screen |
| `PAC-TASK-230` | **`PAC-440`** | PAC-TASK-230 - Validate two active ingredients in interaction rule |
| `PAC-TASK-231` | **`PAC-441`** | PAC-TASK-231 - Implement update DrugInteraction Rule API |
| `PAC-TASK-232` | **`PAC-442`** | PAC-TASK-232 - Implement deactivate DrugInteraction Rule API |
| `PAC-TASK-233` | **`PAC-443`** | PAC-TASK-233 - Trigger Graph Sync event on interaction rule change |
| `PAC-TASK-234` | **`PAC-444`** | PAC-TASK-234 - Validate severity enum LOW/MEDIUM/HIGH only |
| `PAC-TASK-235` | **`PAC-445`** | PAC-TASK-235 - Implement derive interaction from medicine active ingredients |
| `PAC-TASK-236` | **`PAC-446`** | PAC-TASK-236 - Add tests for derived medicine interactions |
| `PAC-TASK-237` | **`PAC-447`** | PAC-TASK-237 - Implement order interaction check service |
| `PAC-TASK-238` | **`PAC-448`** | PAC-TASK-238 - Implement POST /orders/{id}/interactions/check API |
| `PAC-TASK-239` | **`PAC-449`** | PAC-TASK-239 - Create interaction_alerts Prisma model |
| `PAC-TASK-240` | **`PAC-450`** | PAC-TASK-240 - Persist displayed InteractionAlert snapshot fields |
| `PAC-TASK-241` | **`PAC-451`** | PAC-TASK-241 - Enforce one active alert per order and interaction rule |
| `PAC-TASK-242` | **`PAC-452`** | PAC-TASK-242 - Update display_count and last_displayed_at |
| `PAC-TASK-243` | **`PAC-453`** | PAC-TASK-243 - Build POS InteractionAlert panel |
| `PAC-TASK-244` | **`PAC-454`** | PAC-TASK-244 - Implement LOW/MEDIUM/HIGH alert display logic |
| `PAC-TASK-245` | **`PAC-455`** | PAC-TASK-245 - Build HIGH alert acknowledgement UI |
| `PAC-TASK-246` | **`PAC-456`** | PAC-TASK-246 - Implement acknowledge InteractionAlert API |
| `PAC-TASK-247` | **`PAC-457`** | PAC-TASK-247 - Build HIGH alert consultation note UI |
| `PAC-TASK-248` | **`PAC-458`** | PAC-TASK-248 - Implement consultation note API per HIGH alert |
| `PAC-TASK-249` | **`PAC-459`** | PAC-TASK-249 - Validate HIGH alert consultation note is not empty |
| `PAC-TASK-250` | **`PAC-460`** | PAC-TASK-250 - Implement checkout blocker for unresolved HIGH alerts |
| `PAC-TASK-251` | **`PAC-461`** | PAC-TASK-251 - Build UI prompt when checkout is blocked by HIGH alert |
| `PAC-TASK-252` | **`PAC-462`** | PAC-TASK-252 - Build Admin InteractionAlert History API and UI |
| `PAC-TASK-253` | **`PAC-463`** | PAC-TASK-253 - Enforce Warehouse no-access to InteractionAlert APIs |
| `PAC-TASK-254` | **`PAC-464`** | PAC-TASK-254 - Add tests for Warehouse no-access to InteractionAlert |
| `PAC-TASK-255` | **`PAC-465`** | PAC-TASK-255 - Add InteractionAlert lifecycle integration tests |
| `PAC-TASK-256` | **`PAC-466`** | PAC-TASK-256 - Add HIGH acknowledgement and consultation note tests |
| `PAC-TASK-257` | **`PAC-467`** | PAC-TASK-257 - Add filters to InteractionAlert History |
| `PAC-TASK-258` | **`PAC-468`** | PAC-TASK-258 - Add InteractionAlert snapshot and traceability notes |
| `PAC-TASK-259` | **`PAC-469`** | PAC-TASK-259 - Define Checkout DTO and validation schema |
| `PAC-TASK-260` | **`PAC-470`** | PAC-TASK-260 - Implement CheckoutController POST /checkout |
| `PAC-TASK-261` | **`PAC-471`** | PAC-TASK-261 - Implement CheckoutService transaction skeleton |
| `PAC-TASK-262` | **`PAC-472`** | PAC-TASK-262 - Validate checkout actor permission and order ownership |
| `PAC-TASK-263` | **`PAC-473`** | PAC-TASK-263 - Validate order exists and status is DRAFT |
| `PAC-TASK-264` | **`PAC-474`** | PAC-TASK-264 - Validate unresolved HIGH alerts before payment |
| `PAC-TASK-265` | **`PAC-475`** | PAC-TASK-265 - Validate sellable stock inside checkout transaction |
| `PAC-TASK-266` | **`PAC-476`** | PAC-TASK-266 - Build Checkout full page or full-height panel UI |
| `PAC-TASK-267` | **`PAC-477`** | PAC-TASK-267 - Build payment method selector in Checkout UI |
| `PAC-TASK-268` | **`PAC-478`** | PAC-TASK-268 - Define FEFO allocation input/output model |
| `PAC-TASK-269` | **`PAC-479`** | PAC-TASK-269 - Query sellable MedicineBatch for FEFO |
| `PAC-TASK-270` | **`PAC-480`** | PAC-TASK-270 - Sort FEFO batches by nearest expiry date |
| `PAC-TASK-271` | **`PAC-481`** | PAC-TASK-271 - Allocate requested quantity across multiple batches |
| `PAC-TASK-272` | **`PAC-482`** | PAC-TASK-272 - Reject FEFO allocation when sellable stock is insufficient |
| `PAC-TASK-273` | **`PAC-483`** | PAC-TASK-273 - Create order_batch_allocations Prisma model |
| `PAC-TASK-274` | **`PAC-484`** | PAC-TASK-274 - Persist order_batch_allocations during checkout |
| `PAC-TASK-275` | **`PAC-485`** | PAC-TASK-275 - Deduct MedicineBatch quantities inside checkout transaction |
| `PAC-TASK-276` | **`PAC-486`** | PAC-TASK-276 - Create idempotency_records Prisma model |
| `PAC-TASK-277` | **`PAC-487`** | PAC-TASK-277 - Implement idempotency key handling for checkout |
| `PAC-TASK-278` | **`PAC-488`** | PAC-TASK-278 - Rollback checkout transaction on failure |
| `PAC-TASK-279` | **`PAC-489`** | PAC-TASK-279 - Create payments Prisma model |
| `PAC-TASK-280` | **`PAC-490`** | PAC-TASK-280 - Implement cash payment handling inside checkout |
| `PAC-TASK-281` | **`PAC-491`** | PAC-TASK-281 - Calculate and persist change_amount |
| `PAC-TASK-282` | **`PAC-492`** | PAC-TASK-282 - Implement bank transfer transaction_reference validation |
| `PAC-TASK-283` | **`PAC-493`** | PAC-TASK-283 - Enforce one SUCCESS payment per order |
| `PAC-TASK-284` | **`PAC-494`** | PAC-TASK-284 - Allow failed payment attempts without creating duplicate SUCCESS payment |
| `PAC-TASK-285` | **`PAC-495`** | PAC-TASK-285 - Create invoices Prisma model |
| `PAC-TASK-286` | **`PAC-496`** | PAC-TASK-286 - Generate invoice inside checkout transaction |
| `PAC-TASK-287` | **`PAC-497`** | PAC-TASK-287 - Build invoice view and print UI |
| `PAC-TASK-288` | **`PAC-498`** | PAC-TASK-288 - Update order status to PAID only after successful checkout |
| `PAC-TASK-289` | **`PAC-499`** | PAC-TASK-289 - Add checkout integration tests |
| `PAC-TASK-290` | **`PAC-500`** | PAC-TASK-290 - Add FEFO, idempotency and rollback tests |
| `PAC-TASK-291` | **`PAC-501`** | PAC-TASK-291 - Define AI provider abstraction |
| `PAC-TASK-292` | **`PAC-502`** | PAC-TASK-292 - Configure backend AI provider/model settings loader |
| `PAC-TASK-293` | **`PAC-503`** | PAC-TASK-293 - Implement Google AI provider adapter |
| `PAC-TASK-294` | **`PAC-504`** | PAC-TASK-294 - Add Google AI timeout and retry-safe error handling |
| `PAC-TASK-295` | **`PAC-505`** | PAC-TASK-295 - Implement MockAI fallback adapter |
| `PAC-TASK-296` | **`PAC-506`** | PAC-TASK-296 - Implement fallback provider selection logic |
| `PAC-TASK-297` | **`PAC-507`** | PAC-TASK-297 - Add provider_requested and provider_used tracking |
| `PAC-TASK-298` | **`PAC-508`** | PAC-TASK-298 - Implement AI interaction explanation API |
| `PAC-TASK-299` | **`PAC-509`** | PAC-TASK-299 - Build AI explanation panel in InteractionAlert UI |
| `PAC-TASK-300` | **`PAC-510`** | PAC-TASK-300 - Add AI disclaimer to explanation panel |
| `PAC-TASK-301` | **`PAC-511`** | PAC-TASK-301 - Build AI explanation loading, error and fallback states |
| `PAC-TASK-302` | **`PAC-512`** | PAC-TASK-302 - Implement AI consultation note draft API |
| `PAC-TASK-303` | **`PAC-513`** | PAC-TASK-303 - Build AI consultation note draft panel |
| `PAC-TASK-304` | **`PAC-514`** | PAC-TASK-304 - Build Staff edit AI draft before confirm UI |
| `PAC-TASK-305` | **`PAC-515`** | PAC-TASK-305 - Implement Staff confirm AI draft as official consultation note |
| `PAC-TASK-306` | **`PAC-516`** | PAC-TASK-306 - Prevent unconfirmed AI draft from saving official note |
| `PAC-TASK-307` | **`PAC-517`** | PAC-TASK-307 - Link confirmed AI note to correct HIGH InteractionAlert |
| `PAC-TASK-308` | **`PAC-518`** | PAC-TASK-308 - Implement safe follow-up question API |
| `PAC-TASK-309` | **`PAC-519`** | PAC-TASK-309 - Build safe follow-up question UI field |
| `PAC-TASK-310` | **`PAC-520`** | PAC-TASK-310 - Block medical-record style storage for symptom/context input |
| `PAC-TASK-311` | **`PAC-521`** | PAC-TASK-311 - Add AI Copilot permission checks |
| `PAC-TASK-312` | **`PAC-522`** | PAC-TASK-312 - Add AI Copilot frontend route and action guards |
| `PAC-TASK-313` | **`PAC-523`** | PAC-TASK-313 - Add AI provider unit tests |
| `PAC-TASK-314` | **`PAC-524`** | PAC-TASK-314 - Add MockAI fallback tests |
| `PAC-TASK-315` | **`PAC-525`** | PAC-TASK-315 - Add AI Copilot integration smoke checklist |
| `PAC-TASK-316` | **`PAC-526`** | PAC-TASK-316 - Define unsafe AI request categories |
| `PAC-TASK-317` | **`PAC-527`** | PAC-TASK-317 - Implement AI input guardrail service |
| `PAC-TASK-318` | **`PAC-528`** | PAC-TASK-318 - Block diagnosis requests |
| `PAC-TASK-319` | **`PAC-529`** | PAC-TASK-319 - Block prescribing requests |
| `PAC-TASK-320` | **`PAC-530`** | PAC-TASK-320 - Block dosage advice requests |
| `PAC-TASK-321` | **`PAC-531`** | PAC-TASK-321 - Add safe response templates for blocked AI input |
| `PAC-TASK-322` | **`PAC-532`** | PAC-TASK-322 - Add PII minimization before AI provider call |
| `PAC-TASK-323` | **`PAC-533`** | PAC-TASK-323 - Redact customer/order unnecessary personal data before AI call |
| `PAC-TASK-324` | **`PAC-534`** | PAC-TASK-324 - Implement AI output guardrail service |
| `PAC-TASK-325` | **`PAC-535`** | PAC-TASK-325 - Block unsafe AI output before rendering |
| `PAC-TASK-326` | **`PAC-536`** | PAC-TASK-326 - Implement structured output schema validation |
| `PAC-TASK-327` | **`PAC-537`** | PAC-TASK-327 - Add output schema retry or safe fallback handling |
| `PAC-TASK-328` | **`PAC-538`** | PAC-TASK-328 - Add guardrail status object to AI response |
| `PAC-TASK-329` | **`PAC-539`** | PAC-TASK-329 - Create ai_audit_logs Prisma model |
| `PAC-TASK-330` | **`PAC-540`** | PAC-TASK-330 - Implement AI audit log write service |
| `PAC-TASK-331` | **`PAC-541`** | PAC-TASK-331 - Persist AI provider, model and prompt metadata |
| `PAC-TASK-332` | **`PAC-542`** | PAC-TASK-332 - Persist input and output guardrail statuses |
| `PAC-TASK-333` | **`PAC-543`** | PAC-TASK-333 - Persist AI latency, request id and fallback metadata |
| `PAC-TASK-334` | **`PAC-544`** | PAC-TASK-334 - Ensure AI Audit does not store raw PII |
| `PAC-TASK-335` | **`PAC-545`** | PAC-TASK-335 - Build Admin AI Audit Log list API |
| `PAC-TASK-336` | **`PAC-546`** | PAC-TASK-336 - Build Admin AI Audit Log UI |
| `PAC-TASK-337` | **`PAC-547`** | PAC-TASK-337 - Add AI Audit filters by provider, status and date |
| `PAC-TASK-338` | **`PAC-548`** | PAC-TASK-338 - Create prompt_templates Prisma model |
| `PAC-TASK-339` | **`PAC-549`** | PAC-TASK-339 - Seed official AI prompt templates with versions |
| `PAC-TASK-340` | **`PAC-550`** | PAC-TASK-340 - Load approved prompt template by use case |
| `PAC-TASK-341` | **`PAC-551`** | PAC-TASK-341 - Record prompt version in AI audit |
| `PAC-TASK-342` | **`PAC-552`** | PAC-TASK-342 - Add backend AI provider/model config validation |
| `PAC-TASK-343` | **`PAC-553`** | PAC-TASK-343 - Add environment/database config fallback order for AI settings |
| `PAC-TASK-344` | **`PAC-554`** | PAC-TASK-344 - Add timeout, circuit breaker and rate-limit guard for AI calls |
| `PAC-TASK-345` | **`PAC-555`** | PAC-TASK-345 - Add AI safe error response helper |
| `PAC-TASK-346` | **`PAC-556`** | PAC-TASK-346 - Add AI input guardrail unit tests |
| `PAC-TASK-347` | **`PAC-557`** | PAC-TASK-347 - Add diagnosis block tests |
| `PAC-TASK-348` | **`PAC-558`** | PAC-TASK-348 - Add prescribing block tests |
| `PAC-TASK-349` | **`PAC-559`** | PAC-TASK-349 - Add dosage advice block tests |
| `PAC-TASK-350` | **`PAC-560`** | PAC-TASK-350 - Add AI output guardrail tests |
| `PAC-TASK-351` | **`PAC-561`** | PAC-TASK-351 - Add structured output validation tests |
| `PAC-TASK-352` | **`PAC-562`** | PAC-TASK-352 - Add PII minimization tests |
| `PAC-TASK-353` | **`PAC-563`** | PAC-TASK-353 - Add AI audit integration tests |
| `PAC-TASK-354` | **`PAC-564`** | PAC-TASK-354 - Add prompt versioning tests |
| `PAC-TASK-355` | **`PAC-565`** | PAC-TASK-355 - Add AI safety traceability notes |
| `PAC-TASK-356` | **`PAC-566`** | PAC-TASK-356 - Create graph_sync_outbox Prisma model |
| `PAC-TASK-357` | **`PAC-567`** | PAC-TASK-357 - Add graph sync job status enum |
| `PAC-TASK-358` | **`PAC-568`** | PAC-TASK-358 - Emit outbox event from Medicine changes |
| `PAC-TASK-359` | **`PAC-569`** | PAC-TASK-359 - Emit outbox event from ActiveIngredient changes |
| `PAC-TASK-360` | **`PAC-570`** | PAC-TASK-360 - Emit outbox event from Medicine-Ingredient mapping changes |
| `PAC-TASK-361` | **`PAC-571`** | PAC-TASK-361 - Emit outbox event from DrugInteractionRule changes |
| `PAC-TASK-362` | **`PAC-572`** | PAC-TASK-362 - Implement Graph Sync worker loop |
| `PAC-TASK-363` | **`PAC-573`** | PAC-TASK-363 - Configure Neo4j connection service |
| `PAC-TASK-364` | **`PAC-574`** | PAC-TASK-364 - Add Neo4j health check |
| `PAC-TASK-365` | **`PAC-575`** | PAC-TASK-365 - Implement idempotent graph job claiming |
| `PAC-TASK-366` | **`PAC-576`** | PAC-TASK-366 - Upsert Medicine node to Neo4j |
| `PAC-TASK-367` | **`PAC-577`** | PAC-TASK-367 - Upsert ActiveIngredient node to Neo4j |
| `PAC-TASK-368` | **`PAC-578`** | PAC-TASK-368 - Upsert CONTAINS relationship |
| `PAC-TASK-369` | **`PAC-579`** | PAC-TASK-369 - Upsert INTERACTS_WITH relationship |
| `PAC-TASK-370` | **`PAC-580`** | PAC-TASK-370 - Implement canonical directed interaction edge logic |
| `PAC-TASK-371` | **`PAC-581`** | PAC-TASK-371 - Store rule properties on INTERACTS_WITH relationship |
| `PAC-TASK-372` | **`PAC-582`** | PAC-TASK-372 - Store sourceVersion, sourceUpdatedAt and syncedAt metadata |
| `PAC-TASK-373` | **`PAC-583`** | PAC-TASK-373 - Mark deactivated Medicine and ActiveIngredient as isActive=false |
| `PAC-TASK-374` | **`PAC-584`** | PAC-TASK-374 - Mark deactivated interaction rule edge as isActive=false |
| `PAC-TASK-375` | **`PAC-585`** | PAC-TASK-375 - Filter normal Neo4j queries to active data only |
| `PAC-TASK-376` | **`PAC-586`** | PAC-TASK-376 - Implement retry logic for failed graph sync jobs |
| `PAC-TASK-377` | **`PAC-587`** | PAC-TASK-377 - Add max retry and failed status handling |
| `PAC-TASK-378` | **`PAC-588`** | PAC-TASK-378 - Log graph sync failure details |
| `PAC-TASK-379` | **`PAC-589`** | PAC-TASK-379 - Write audit log for graph sync failures |
| `PAC-TASK-380` | **`PAC-590`** | PAC-TASK-380 - Implement graph projection source version tracking |
| `PAC-TASK-381` | **`PAC-591`** | PAC-TASK-381 - Implement graph freshness detection service |
| `PAC-TASK-382` | **`PAC-592`** | PAC-TASK-382 - Detect stale graph from pending outbox job |
| `PAC-TASK-383` | **`PAC-593`** | PAC-TASK-383 - Detect stale graph from failed relevant outbox job |
| `PAC-TASK-384` | **`PAC-594`** | PAC-TASK-384 - Detect stale graph from missing sourceVersion projection |
| `PAC-TASK-385` | **`PAC-595`** | PAC-TASK-385 - Add Graph Sync worker unit tests |
| `PAC-TASK-386` | **`PAC-596`** | PAC-TASK-386 - Add Neo4j projection integration tests |
| `PAC-TASK-387` | **`PAC-597`** | PAC-TASK-387 - Add INTERACTS_WITH projection tests |
| `PAC-TASK-388` | **`PAC-598`** | PAC-TASK-388 - Add graph freshness detection tests |
| `PAC-TASK-389` | **`PAC-599`** | PAC-TASK-389 - Add graph sync retry and failure tests |
| `PAC-TASK-390` | **`PAC-600`** | PAC-TASK-390 - Add Graph Sync traceability notes |
| `PAC-TASK-391` | **`PAC-601`** | PAC-TASK-391 - Implement Graph-RAG interaction explanation service |
| `PAC-TASK-392` | **`PAC-602`** | PAC-TASK-392 - Build allowlisted graph query templates |
| `PAC-TASK-393` | **`PAC-603`** | PAC-TASK-393 - Query Medicine-CONTAINS-ActiveIngredient context |
| `PAC-TASK-394` | **`PAC-604`** | PAC-TASK-394 - Query ActiveIngredient INTERACTS_WITH context |
| `PAC-TASK-395` | **`PAC-605`** | PAC-TASK-395 - Add Graph-RAG context builder for AI Copilot |
| `PAC-TASK-396` | **`PAC-606`** | PAC-TASK-396 - Return Graph-RAG provenance metadata |
| `PAC-TASK-397` | **`PAC-607`** | PAC-TASK-397 - Return graphUsed flag in Graph-RAG response |
| `PAC-TASK-398` | **`PAC-608`** | PAC-TASK-398 - Return Graph-RAG freshness metadata |
| `PAC-TASK-399` | **`PAC-609`** | PAC-TASK-399 - Add freshness warning to Graph-RAG response |
| `PAC-TASK-400` | **`PAC-610`** | PAC-TASK-400 - Implement PostgreSQL fallback when Neo4j unavailable |
| `PAC-TASK-401` | **`PAC-611`** | PAC-TASK-401 - Implement PostgreSQL fallback when graph stale |
| `PAC-TASK-402` | **`PAC-612`** | PAC-TASK-402 - Implement safe error for graph-only query without fallback |
| `PAC-TASK-403` | **`PAC-613`** | PAC-TASK-403 - Ensure Staff cannot submit raw Cypher |
| `PAC-TASK-404` | **`PAC-614`** | PAC-TASK-404 - Add backend guard against raw Cypher APIs for Staff |
| `PAC-TASK-405` | **`PAC-615`** | PAC-TASK-405 - Ensure Graph-RAG does not decide checkout |
| `PAC-TASK-406` | **`PAC-616`** | PAC-TASK-406 - Build Graph-RAG explanation UI metadata display |
| `PAC-TASK-407` | **`PAC-617`** | PAC-TASK-407 - Add Graph-RAG PostgreSQL fallback tests |
| `PAC-TASK-408` | **`PAC-618`** | PAC-TASK-408 - Add stale graph fallback tests |
| `PAC-TASK-409` | **`PAC-619`** | PAC-TASK-409 - Add raw Cypher no-access tests |
| `PAC-TASK-410` | **`PAC-620`** | PAC-TASK-410 - Add graph-not-checkout guard tests |
| `PAC-TASK-411` | **`PAC-621`** | PAC-TASK-411 - Implement Revenue Report API |
| `PAC-TASK-412` | **`PAC-622`** | PAC-TASK-412 - Build Revenue Report UI |
| `PAC-TASK-413` | **`PAC-623`** | PAC-TASK-413 - Add revenue report filters by date and status |
| `PAC-TASK-414` | **`PAC-624`** | PAC-TASK-414 - Implement Top Medicines Report API |
| `PAC-TASK-415` | **`PAC-625`** | PAC-TASK-415 - Build Top Medicines Report UI |
| `PAC-TASK-416` | **`PAC-626`** | PAC-TASK-416 - Implement Inventory Report API from MedicineBatch |
| `PAC-TASK-417` | **`PAC-627`** | PAC-TASK-417 - Build Inventory Report UI |
| `PAC-TASK-418` | **`PAC-628`** | PAC-TASK-418 - Add report empty, loading and error states |
| `PAC-TASK-419` | **`PAC-629`** | PAC-TASK-419 - Add report permission checks |
| `PAC-TASK-420` | **`PAC-630`** | PAC-TASK-420 - Create system_settings Prisma model |
| `PAC-TASK-421` | **`PAC-631`** | PAC-TASK-421 - Seed default near-expiry threshold as 90 days |
| `PAC-TASK-422` | **`PAC-632`** | PAC-TASK-422 - Implement near-expiry threshold settings API |
| `PAC-TASK-423` | **`PAC-633`** | PAC-TASK-423 - Build minimal System Settings UI for near-expiry threshold |
| `PAC-TASK-424` | **`PAC-634`** | PAC-TASK-424 - Add system settings validation and tests |
| `PAC-TASK-425` | **`PAC-635`** | PAC-TASK-425 - Create curated MVP seed dataset |
| `PAC-TASK-426` | **`PAC-636`** | PAC-TASK-426 - Seed demo users by role |
| `PAC-TASK-427` | **`PAC-637`** | PAC-TASK-427 - Seed first-login demo account |
| `PAC-TASK-428` | **`PAC-638`** | PAC-TASK-428 - Generate dynamic expiry dates for demo batches |
| `PAC-TASK-429` | **`PAC-639`** | PAC-TASK-429 - Seed FEFO multi-batch demo scenario |
| `PAC-TASK-430` | **`PAC-640`** | PAC-TASK-430 - Seed expired batch excluded from sellable stock |
| `PAC-TASK-431` | **`PAC-641`** | PAC-TASK-431 - Seed PAID order with handled HIGH alert |
| `PAC-TASK-432` | **`PAC-642`** | PAC-TASK-432 - Seed report data with PAID, DRAFT, CANCELLED and failed-payment cases |
| `PAC-TASK-433` | **`PAC-643`** | PAC-TASK-433 - Implement demo:reset local-only environment guard |
| `PAC-TASK-434` | **`PAC-644`** | PAC-TASK-434 - Rebuild Neo4j projection during demo reset |
| `PAC-TASK-435` | **`PAC-645`** | PAC-TASK-435 - Run smoke tests after demo reset |
| `PAC-TASK-436` | **`PAC-646`** | PAC-TASK-436 - Add backend unit test setup |
| `PAC-TASK-437` | **`PAC-647`** | PAC-TASK-437 - Add backend integration test setup with isolated cleanup |
| `PAC-TASK-438` | **`PAC-648`** | PAC-TASK-438 - Add frontend component test setup |
| `PAC-TASK-439` | **`PAC-649`** | PAC-TASK-439 - Add Playwright E2E test setup for Chrome desktop |
| `PAC-TASK-440` | **`PAC-650`** | PAC-TASK-440 - Add Postman manual API collection structure |
| `PAC-TASK-441` | **`PAC-651`** | PAC-TASK-441 - Add Auth and RBAC test suite |
| `PAC-TASK-442` | **`PAC-652`** | PAC-TASK-442 - Add User Management permission tests |
| `PAC-TASK-443` | **`PAC-653`** | PAC-TASK-443 - Add Medicine Management API tests |
| `PAC-TASK-444` | **`PAC-654`** | PAC-TASK-444 - Add ActiveIngredient mapping tests |
| `PAC-TASK-445` | **`PAC-655`** | PAC-TASK-445 - Add Supplier Management API tests |
| `PAC-TASK-446` | **`PAC-656`** | PAC-TASK-446 - Add MedicineBatch source-of-truth tests |
| `PAC-TASK-447` | **`PAC-657`** | PAC-TASK-447 - Add sellable quantity and expired batch tests |
| `PAC-TASK-448` | **`PAC-658`** | PAC-TASK-448 - Add near-expiry threshold tests |
| `PAC-TASK-449` | **`PAC-659`** | PAC-TASK-449 - Add Stock Import transaction tests |
| `PAC-TASK-450` | **`PAC-660`** | PAC-TASK-450 - Add Stock Import batch merge and expiry mismatch tests |
| `PAC-TASK-451` | **`PAC-661`** | PAC-TASK-451 - Add Inventory Adjustment transaction tests |
| `PAC-TASK-452` | **`PAC-662`** | PAC-TASK-452 - Add Inventory Adjustment audit and reason tests |
| `PAC-TASK-453` | **`PAC-663`** | PAC-TASK-453 - Add POS Draft Order API tests |
| `PAC-TASK-454` | **`PAC-664`** | PAC-TASK-454 - Add POS Draft Order UI smoke tests |
| `PAC-TASK-455` | **`PAC-665`** | PAC-TASK-455 - Add Staff order ownership tests |
| `PAC-TASK-456` | **`PAC-666`** | PAC-TASK-456 - Add Draft Order cancel status tests |
| `PAC-TASK-457` | **`PAC-667`** | PAC-TASK-457 - Add DrugInteraction Rule API tests |
| `PAC-TASK-458` | **`PAC-668`** | PAC-TASK-458 - Add ActiveIngredient-derived interaction tests |
| `PAC-TASK-459` | **`PAC-669`** | PAC-TASK-459 - Add InteractionAlert persistence tests |
| `PAC-TASK-460` | **`PAC-670`** | PAC-TASK-460 - Add InteractionAlert display_count tests |
| `PAC-TASK-461` | **`PAC-671`** | PAC-TASK-461 - Add HIGH alert acknowledgement tests |
| `PAC-TASK-462` | **`PAC-672`** | PAC-TASK-462 - Add HIGH alert consultation note tests |
| `PAC-TASK-463` | **`PAC-673`** | PAC-TASK-463 - Add checkout blocker tests for unresolved HIGH alerts |
| `PAC-TASK-464` | **`PAC-674`** | PAC-TASK-464 - Add Checkout transaction success tests |
| `PAC-TASK-465` | **`PAC-675`** | PAC-TASK-465 - Add Checkout rollback failure tests |
| `PAC-TASK-466` | **`PAC-676`** | PAC-TASK-466 - Add FEFO allocation unit tests |
| `PAC-TASK-467` | **`PAC-677`** | PAC-TASK-467 - Add FEFO multi-batch allocation tests |
| `PAC-TASK-468` | **`PAC-678`** | PAC-TASK-468 - Add Checkout idempotency tests |
| `PAC-TASK-469` | **`PAC-679`** | PAC-TASK-469 - Add Payment cash handling tests |
| `PAC-TASK-470` | **`PAC-680`** | PAC-TASK-470 - Add Payment one SUCCESS rule tests |
| `PAC-TASK-471` | **`PAC-681`** | PAC-TASK-471 - Add Invoice generation tests |
| `PAC-TASK-472` | **`PAC-682`** | PAC-TASK-472 - Add AI Guardrail high-risk test suite |
| `PAC-TASK-473` | **`PAC-683`** | PAC-TASK-473 - Add AI Audit privacy tests |
| `PAC-TASK-474` | **`PAC-684`** | PAC-TASK-474 - Add AI provider fallback tests |
| `PAC-TASK-475` | **`PAC-685`** | PAC-TASK-475 - Add Graph Sync outbox and retry tests |
| `PAC-TASK-476` | **`PAC-686`** | PAC-TASK-476 - Add Neo4j projection tests |
| `PAC-TASK-477` | **`PAC-687`** | PAC-TASK-477 - Add Graph freshness tests |
| `PAC-TASK-478` | **`PAC-688`** | PAC-TASK-478 - Add Graph-RAG fallback tests |
| `PAC-TASK-479` | **`PAC-689`** | PAC-TASK-479 - Add Reports deterministic calculation tests |
| `PAC-TASK-480` | **`PAC-690`** | PAC-TASK-480 - Add full MVP smoke test checklist |
| `PAC-TASK-481` | **`PAC-691`** | PAC-TASK-481 - Configure local Node.js project setup guide |
| `PAC-TASK-482` | **`PAC-692`** | PAC-TASK-482 - Configure frontend environment variables guide |
| `PAC-TASK-483` | **`PAC-693`** | PAC-TASK-483 - Configure backend environment variables guide |
| `PAC-TASK-484` | **`PAC-694`** | PAC-TASK-484 - Configure Supabase project setup instructions |
| `PAC-TASK-485` | **`PAC-695`** | PAC-TASK-485 - Configure Neo4j AuraDB setup instructions |
| `PAC-TASK-486` | **`PAC-696`** | PAC-TASK-486 - Configure Google AI API key setup instructions |
| `PAC-TASK-487` | **`PAC-697`** | PAC-TASK-487 - Configure MockAI fallback setup instructions |
| `PAC-TASK-488` | **`PAC-698`** | PAC-TASK-488 - Add Prisma generate and migrate setup command |
| `PAC-TASK-489` | **`PAC-699`** | PAC-TASK-489 - Add seed command for curated MVP data |
| `PAC-TASK-490` | **`PAC-700`** | PAC-TASK-490 - Add graph projection rebuild command |
| `PAC-TASK-491` | **`PAC-701`** | PAC-TASK-491 - Add demo reset command entrypoint |
| `PAC-TASK-492` | **`PAC-702`** | PAC-TASK-492 - Add demo reset environment safety checks |
| `PAC-TASK-493` | **`PAC-703`** | PAC-TASK-493 - Configure GitHub Actions lint check |
| `PAC-TASK-494` | **`PAC-704`** | PAC-TASK-494 - Configure GitHub Actions type check |
| `PAC-TASK-495` | **`PAC-705`** | PAC-TASK-495 - Configure GitHub Actions frontend build |
| `PAC-TASK-496` | **`PAC-706`** | PAC-TASK-496 - Configure GitHub Actions backend build |
| `PAC-TASK-497` | **`PAC-707`** | PAC-TASK-497 - Configure GitHub Actions unit test check |
| `PAC-TASK-498` | **`PAC-708`** | PAC-TASK-498 - Configure GitHub Actions integration test check |
| `PAC-TASK-499` | **`PAC-709`** | PAC-TASK-499 - Configure Prisma schema validation check |
| `PAC-TASK-500` | **`PAC-710`** | PAC-TASK-500 - Configure Prisma migration check |
| `PAC-TASK-501` | **`PAC-711`** | PAC-TASK-501 - Add CI guard to prevent destructive tests against demo database |
| `PAC-TASK-502` | **`PAC-712`** | PAC-TASK-502 - Add CI branch protection expectation notes |
| `PAC-TASK-503` | **`PAC-713`** | PAC-TASK-503 - Add local-only guard for demo:reset script |
| `PAC-TASK-504` | **`PAC-714`** | PAC-TASK-504 - Add Chrome desktop target verification checklist |
| `PAC-TASK-505` | **`PAC-715`** | PAC-TASK-505 - Add basic responsive verification checklist |
| `PAC-TASK-506` | **`PAC-716`** | PAC-TASK-506 - Write project README setup section |
| `PAC-TASK-507` | **`PAC-717`** | PAC-TASK-507 - Write backend setup and run instructions |
| `PAC-TASK-508` | **`PAC-718`** | PAC-TASK-508 - Write frontend setup and run instructions |
| `PAC-TASK-509` | **`PAC-719`** | PAC-TASK-509 - Write database migration and seed instructions |
| `PAC-TASK-510` | **`PAC-720`** | PAC-TASK-510 - Write Supabase Auth setup notes |
| `PAC-TASK-511` | **`PAC-721`** | PAC-TASK-511 - Write Neo4j setup and graph rebuild notes |
| `PAC-TASK-512` | **`PAC-722`** | PAC-TASK-512 - Write AI provider and MockAI fallback setup notes |
| `PAC-TASK-513` | **`PAC-723`** | PAC-TASK-513 - Write demo account guide |
| `PAC-TASK-514` | **`PAC-724`** | PAC-TASK-514 - Write demo scenario script for login and role switching |
| `PAC-TASK-515` | **`PAC-725`** | PAC-TASK-515 - Write demo scenario script for Stock Import and MedicineBatch |
| `PAC-TASK-516` | **`PAC-726`** | PAC-TASK-516 - Write demo scenario script for POS and Checkout |
| `PAC-TASK-517` | **`PAC-727`** | PAC-TASK-517 - Write demo scenario script for InteractionAlert and HIGH note |
| `PAC-TASK-518` | **`PAC-728`** | PAC-TASK-518 - Write demo scenario script for AI Copilot and AI Audit |
| `PAC-TASK-519` | **`PAC-729`** | PAC-TASK-519 - Write demo scenario script for Graph Sync and Graph-RAG |
| `PAC-TASK-520` | **`PAC-730`** | PAC-TASK-520 - Write demo scenario script for Reports and Settings |
| `PAC-TASK-521` | **`PAC-731`** | PAC-TASK-521 - Write MVP traceability matrix summary |
| `PAC-TASK-522` | **`PAC-732`** | PAC-TASK-522 - Write release/demo readiness checklist |
| `PAC-TASK-523` | **`PAC-733`** | PAC-TASK-523 - Write known limitations and out-of-scope guard section |
| `PAC-TASK-524` | **`PAC-734`** | PAC-TASK-524 - Prepare contingency evidence screenshots list |
| `PAC-TASK-525` | **`PAC-735`** | PAC-TASK-525 - Prepare final smoke test report template |
| `PAC-TASK-526` | **`PAC-736`** | PAC-TASK-526 - Build Admin Graph Sync Status list UI |
| `PAC-TASK-527` | **`PAC-737`** | PAC-TASK-527 - Build Graph Sync job detail UI |
| `PAC-TASK-528` | **`PAC-738`** | PAC-TASK-528 - Build manual graph retry action for Admin |
| `PAC-TASK-529` | **`PAC-739`** | PAC-TASK-529 - Build manual graph rebuild action for Admin |
| `PAC-TASK-530` | **`PAC-740`** | PAC-TASK-530 - Add Graph Sync Status permission checks |
| `PAC-TASK-531` | **`PAC-741`** | PAC-TASK-531 - Build read-only Graph Explorer UI |
| `PAC-TASK-532` | **`PAC-742`** | PAC-TASK-532 - Build Graph Explorer node detail panel |
| `PAC-TASK-533` | **`PAC-743`** | PAC-TASK-533 - Build Graph Explorer relationship detail panel |
| `PAC-TASK-534` | **`PAC-744`** | PAC-TASK-534 - Add Graph Explorer permission checks |
| `PAC-TASK-535` | **`PAC-745`** | PAC-TASK-535 - Ensure Graph Explorer uses allowlisted templates only |
| `PAC-TASK-536` | **`PAC-746`** | PAC-TASK-536 - Build AI Provider Settings UI |
| `PAC-TASK-537` | **`PAC-747`** | PAC-TASK-537 - Build AI model configuration UI |
| `PAC-TASK-538` | **`PAC-748`** | PAC-TASK-538 - Build Prompt Management list UI |
| `PAC-TASK-539` | **`PAC-749`** | PAC-TASK-539 - Build Prompt Management version detail UI |
| `PAC-TASK-540` | **`PAC-750`** | PAC-TASK-540 - Add prompt approval status display |
| `PAC-TASK-541` | **`PAC-751`** | PAC-TASK-541 - Build System Audit Log UI |
| `PAC-TASK-542` | **`PAC-752`** | PAC-TASK-542 - Add System Audit Log filters |
| `PAC-TASK-543` | **`PAC-753`** | PAC-TASK-543 - Implement Supabase Storage upload flow for medicine images |
| `PAC-TASK-544` | **`PAC-754`** | PAC-TASK-544 - Build medicine image upload UI |
| `PAC-TASK-545` | **`PAC-755`** | PAC-TASK-545 - Add Supabase Storage file validation |
| `PAC-TASK-546` | **`PAC-756`** | PAC-TASK-546 - Implement Supabase Realtime inventory update listener |
| `PAC-TASK-547` | **`PAC-757`** | PAC-TASK-547 - Build realtime POS stock refresh behavior |
| `PAC-TASK-548` | **`PAC-758`** | PAC-TASK-548 - Add realtime fallback polling behavior |
| `PAC-TASK-549` | **`PAC-759`** | PAC-TASK-549 - Build Notification Center UI |
| `PAC-TASK-550` | **`PAC-760`** | PAC-TASK-550 - Implement low-stock notification generation |
| `PAC-TASK-551` | **`PAC-761`** | PAC-TASK-551 - Implement near-expiry notification generation |
| `PAC-TASK-552` | **`PAC-762`** | PAC-TASK-552 - Build read/unread notification state |
| `PAC-TASK-553` | **`PAC-763`** | PAC-TASK-553 - Implement scheduled near-expiry scan job |
| `PAC-TASK-554` | **`PAC-764`** | PAC-TASK-554 - Implement AI Business Report Narrative API |
| `PAC-TASK-555` | **`PAC-765`** | PAC-TASK-555 - Build AI Business Report Narrative UI |
| `PAC-TASK-556` | **`PAC-766`** | PAC-TASK-556 - Document Full Customer Management future scope |
| `PAC-TASK-557` | **`PAC-767`** | PAC-TASK-557 - Document customer profile CRUD future scope |
| `PAC-TASK-558` | **`PAC-768`** | PAC-TASK-558 - Document customer purchase history expansion |
| `PAC-TASK-559` | **`PAC-769`** | PAC-TASK-559 - Document Online Commerce storefront future scope |
| `PAC-TASK-560` | **`PAC-770`** | PAC-TASK-560 - Document online cart and wishlist future scope |
| `PAC-TASK-561` | **`PAC-771`** | PAC-TASK-561 - Document online checkout separation from POS checkout |
| `PAC-TASK-562` | **`PAC-772`** | PAC-TASK-562 - Document Product Variant Catalog future scope |
| `PAC-TASK-563` | **`PAC-773`** | PAC-TASK-563 - Document product images and documents commercial scope |
| `PAC-TASK-564` | **`PAC-774`** | PAC-TASK-564 - Document real catalog data import future workflow |
| `PAC-TASK-565` | **`PAC-775`** | PAC-TASK-565 - Document Multi-store future scope |
| `PAC-TASK-566` | **`PAC-776`** | PAC-TASK-566 - Document default store assumption for MVP |
| `PAC-TASK-567` | **`PAC-777`** | PAC-TASK-567 - Document Multi-warehouse future scope |
| `PAC-TASK-568` | **`PAC-778`** | PAC-TASK-568 - Document default warehouse assumption for MVP |
| `PAC-TASK-569` | **`PAC-779`** | PAC-TASK-569 - Document Stock Transfer future workflow |
| `PAC-TASK-570` | **`PAC-780`** | PAC-TASK-570 - Document stock transfer audit future requirement |
| `PAC-TASK-571` | **`PAC-781`** | PAC-TASK-571 - Document Forecasting and reorder suggestion future scope |
| `PAC-TASK-572` | **`PAC-782`** | PAC-TASK-572 - Document forecast data requirements and limitations |
| `PAC-TASK-573` | **`PAC-783`** | PAC-TASK-573 - Document Promotion and Coupon future scope |
| `PAC-TASK-574` | **`PAC-784`** | PAC-TASK-574 - Document discount not included in MVP checkout |
| `PAC-TASK-575` | **`PAC-785`** | PAC-TASK-575 - Document Shipping and Delivery future scope |
| `PAC-TASK-576` | **`PAC-786`** | PAC-TASK-576 - Document delivery status future workflow |
| `PAC-TASK-577` | **`PAC-787`** | PAC-TASK-577 - Document Review and CMS future scope |
| `PAC-TASK-578` | **`PAC-788`** | PAC-TASK-578 - Document product review moderation future consideration |
| `PAC-TASK-579` | **`PAC-789`** | PAC-TASK-579 - Document commercial expansion dependency map |
| `PAC-TASK-580` | **`PAC-790`** | PAC-TASK-580 - Document final out-of-scope guardrails for AI agents |
