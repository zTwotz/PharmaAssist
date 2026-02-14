# Jira Branch Mapping Table

> [!IMPORTANT]
> Tài liệu này là Single Source of Truth cho toàn bộ Jira Key trên dự án. Khi tạo branch, tạo commit hay ghi log, bắt buộc phải sử dụng mã thực tế ở cột **Jira Key** trong bảng này thay vì tự tính nhẩm.

## 1. Epics (39)

| `Logical Key` | Jira Key | Summary |
| `---` |---| --- |
| `EPIC-01` | **`PAC-1`** | EPIC-01 - Auth & RBAC |
| `EPIC-02` | **`PAC-2`** | EPIC-02 - User / Staff Account Management |
| `EPIC-03` | **`PAC-3`** | EPIC-03 - Medicine & ActiveIngredient |
| `EPIC-04` | **`PAC-4`** | EPIC-04 - Supplier Management |
| `EPIC-05` | **`PAC-5`** | EPIC-05 - Inventory & MedicineBatch |
| `EPIC-06` | **`PAC-6`** | EPIC-06 - Stock Import |
| `EPIC-07` | **`PAC-7`** | EPIC-07 - Inventory Adjustment |
| `EPIC-08` | **`PAC-8`** | EPIC-08 - POS Draft Order |
| `EPIC-09` | **`PAC-9`** | EPIC-09 - DrugInteraction Rule |
| `EPIC-10` | **`PAC-10`** | EPIC-10 - InteractionAlert Lifecycle |
| `EPIC-11` | **`PAC-11`** | EPIC-11 - Checkout, FEFO, Payment & Invoice |
| `EPIC-12` | **`PAC-12`** | EPIC-12 - AI Copilot |
| `EPIC-13` | **`PAC-13`** | EPIC-13 - AI Guardrail & AI Audit |
| `EPIC-14` | **`PAC-14`** | EPIC-14 - Graph Sync & Neo4j Projection |
| `EPIC-15` | **`PAC-15`** | EPIC-15 - Graph-RAG |
| `EPIC-16` | **`PAC-16`** | EPIC-16 - Reports |
| `EPIC-17` | **`PAC-17`** | EPIC-17 - System Settings |
| `EPIC-18` | **`PAC-18`** | EPIC-18 - Data Seed & Demo Reset |
| `EPIC-19` | **`PAC-19`** | EPIC-19 - Testing, Smoke Test & Release Readiness |
| `EPIC-20` | **`PAC-20`** | EPIC-20 - DevOps, CI & Setup |
| `EPIC-21` | **`PAC-21`** | EPIC-21 - Documentation & Traceability |
| `EPIC-22` | **`PAC-22`** | EPIC-22 - Admin Graph Sync Status UI |
| `EPIC-23` | **`PAC-23`** | EPIC-23 - Read-only Graph Explorer |
| `EPIC-24` | **`PAC-24`** | EPIC-24 - AI Provider & Prompt Management UI |
| `EPIC-25` | **`PAC-25`** | EPIC-25 - System Audit Log UI |
| `EPIC-26` | **`PAC-26`** | EPIC-26 - Supabase Storage for Medicine Images |
| `EPIC-27` | **`PAC-27`** | EPIC-27 - Supabase Realtime Inventory Updates |
| `EPIC-28` | **`PAC-28`** | EPIC-28 - Notification Center |
| `EPIC-29` | **`PAC-29`** | EPIC-29 - AI Business Report Narrative |
| `EPIC-30` | **`PAC-30`** | EPIC-30 - Advanced Testing & Demo Evidence |
| `EPIC-31` | **`PAC-31`** | EPIC-31 - Full Customer Management |
| `EPIC-32` | **`PAC-32`** | EPIC-32 - Online Commerce |
| `EPIC-33` | **`PAC-33`** | EPIC-33 - Product Variant Catalog |
| `EPIC-34` | **`PAC-34`** | EPIC-34 - Multi-store / Multi-warehouse |
| `EPIC-35` | **`PAC-35`** | EPIC-35 - Stock Transfer |
| `EPIC-36` | **`PAC-36`** | EPIC-36 - Forecasting & Reorder Suggestions |
| `EPIC-37` | **`PAC-37`** | EPIC-37 - Promotion / Coupon |
| `EPIC-38` | **`PAC-38`** | EPIC-38 - Shipping / Delivery |
| `EPIC-39` | **`PAC-39`** | EPIC-39 - Review / CMS |

## 2. User Stories (170)

| `Logical Key` | Jira Key | Summary |
| `---` |---| --- |
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

| `Logical Key` | Jira Key | Summary |
| `---` |---| --- |
| `TASK-001` | **`PAC-211`** | TASK-001 - Configure Supabase Auth client in Next.js |
| `TASK-002` | **`PAC-212`** | TASK-002 - Build login page UI |
| `TASK-003` | **`PAC-213`** | TASK-003 - Connect login form to Supabase Auth |
| `TASK-004` | **`PAC-214`** | TASK-004 - Handle login loading, success and error states |
| `TASK-005` | **`PAC-215`** | TASK-005 - Redirect user after login based on permissions |
| `TASK-006` | **`PAC-216`** | TASK-006 - Implement logout action and Supabase session cleanup |
| `TASK-007` | **`PAC-217`** | TASK-007 - Protect frontend routes after logout |
| `TASK-008` | **`PAC-218`** | TASK-008 - Add login/logout smoke test checklist |
| `TASK-009` | **`PAC-219`** | TASK-009 - Configure Supabase token validation in NestJS |
| `TASK-010` | **`PAC-220`** | TASK-010 - Implement AuthGuard for protected APIs |
| `TASK-011` | **`PAC-221`** | TASK-011 - Return 401 for missing or invalid session |
| `TASK-012` | **`PAC-222`** | TASK-012 - Add backend auth unit tests |
| `TASK-013` | **`PAC-223`** | TASK-013 - Create user_profiles Prisma model |
| `TASK-014` | **`PAC-224`** | TASK-014 - Create GET /auth/me API |
| `TASK-015` | **`PAC-225`** | TASK-015 - Return current user roles and permissions |
| `TASK-016` | **`PAC-226`** | TASK-016 - Display current user profile in layout |
| `TASK-017` | **`PAC-227`** | TASK-017 - Create roles Prisma model |
| `TASK-018` | **`PAC-228`** | TASK-018 - Create permissions Prisma model |
| `TASK-019` | **`PAC-229`** | TASK-019 - Create user_roles Prisma model |
| `TASK-020` | **`PAC-230`** | TASK-020 - Create role_permissions Prisma model |
| `TASK-021` | **`PAC-231`** | TASK-021 - Seed Admin, Staff and Warehouse roles |
| `TASK-022` | **`PAC-232`** | TASK-022 - Seed MVP permissions |
| `TASK-023` | **`PAC-233`** | TASK-023 - Map permissions to roles |
| `TASK-024` | **`PAC-234`** | TASK-024 - Implement permission decorator |
| `TASK-025` | **`PAC-235`** | TASK-025 - Implement permission-based API guard |
| `TASK-026` | **`PAC-236`** | TASK-026 - Add permission checks to Auth and User APIs |
| `TASK-027` | **`PAC-237`** | TASK-027 - Add permission checks to Medicine APIs |
| `TASK-028` | **`PAC-238`** | TASK-028 - Add permission checks to Inventory APIs |
| `TASK-029` | **`PAC-239`** | TASK-029 - Add permission checks to POS and Checkout APIs |
| `TASK-030` | **`PAC-240`** | TASK-030 - Add 403 response format for forbidden access |
| `TASK-031` | **`PAC-241`** | TASK-031 - Build permission-aware sidebar |
| `TASK-032` | **`PAC-242`** | TASK-032 - Hide unauthorized action buttons |
| `TASK-033` | **`PAC-243`** | TASK-033 - Build forbidden access page |
| `TASK-034` | **`PAC-244`** | TASK-034 - Add frontend permission helper |
| `TASK-035` | **`PAC-245`** | TASK-035 - Implement Staff ownership query filter for orders |
| `TASK-036` | **`PAC-246`** | TASK-036 - Implement Staff ownership query filter for customer order history |
| `TASK-037` | **`PAC-247`** | TASK-037 - Add tests for Staff ownership scope |
| `TASK-038` | **`PAC-248`** | TASK-038 - Block Warehouse access to POS routes |
| `TASK-039` | **`PAC-249`** | TASK-039 - Block Warehouse access to InteractionAlert APIs |
| `TASK-040` | **`PAC-250`** | TASK-040 - Block Warehouse access to checkout APIs |
| `TASK-041` | **`PAC-251`** | TASK-041 - Build Admin create staff account form |
| `TASK-042` | **`PAC-252`** | TASK-042 - Implement POST /admin/users using Supabase Admin |
| `TASK-043` | **`PAC-253`** | TASK-043 - Create user profile after Supabase user creation |
| `TASK-044` | **`PAC-254`** | TASK-044 - Assign roles to new staff account |
| `TASK-045` | **`PAC-255`** | TASK-045 - Validate staff email uniqueness through Supabase |
| `TASK-046` | **`PAC-256`** | TASK-046 - Implement first-login password change screen |
| `TASK-047` | **`PAC-257`** | TASK-047 - Implement must_change_password check |
| `TASK-048` | **`PAC-258`** | TASK-048 - Implement password update through Supabase Auth |
| `TASK-049` | **`PAC-259`** | TASK-049 - Clear must_change_password after successful change |
| `TASK-050` | **`PAC-260`** | TASK-050 - Implement account active/inactive update API |
| `TASK-051` | **`PAC-261`** | TASK-051 - Build staff account status UI |
| `TASK-052` | **`PAC-262`** | TASK-052 - Add audit log for staff status change |
| `TASK-053` | **`PAC-263`** | TASK-053 - Create medicines Prisma model |
| `TASK-054` | **`PAC-264`** | TASK-054 - Add medicine code uniqueness constraint |
| `TASK-055` | **`PAC-265`** | TASK-055 - Implement POST /medicines API |
| `TASK-056` | **`PAC-266`** | TASK-056 - Build medicine create form |
| `TASK-057` | **`PAC-267`** | TASK-057 - Add medicine create success/error UI state |
| `TASK-058` | **`PAC-268`** | TASK-058 - Implement PATCH /medicines/{id} API |
| `TASK-059` | **`PAC-269`** | TASK-059 - Build medicine edit form |
| `TASK-060` | **`PAC-270`** | TASK-060 - Add medicine update validation and errors |
| `TASK-061` | **`PAC-271`** | TASK-061 - Implement medicine list API with pagination |
| `TASK-062` | **`PAC-272`** | TASK-062 - Implement medicine search by code/name |
| `TASK-063` | **`PAC-273`** | TASK-063 - Implement medicine filters |
| `TASK-064` | **`PAC-274`** | TASK-064 - Build medicine list table |
| `TASK-065` | **`PAC-275`** | TASK-065 - Add medicine list empty/loading/error states |
| `TASK-066` | **`PAC-276`** | TASK-066 - Implement medicine deactivate API |
| `TASK-067` | **`PAC-277`** | TASK-067 - Add deactivate action in medicine UI |
| `TASK-068` | **`PAC-278`** | TASK-068 - Prevent inactive medicines from POS selection |
| `TASK-069` | **`PAC-279`** | TASK-069 - Enforce selling_price greater than 0 in backend |
| `TASK-070` | **`PAC-280`** | TASK-070 - Add selling price validation in UI |
| `TASK-071` | **`PAC-281`** | TASK-071 - Add tests for medicine price validation |
| `TASK-072` | **`PAC-282`** | TASK-072 - Create active_ingredients Prisma model |
| `TASK-073` | **`PAC-283`** | TASK-073 - Implement ActiveIngredient create API |
| `TASK-074` | **`PAC-284`** | TASK-074 - Implement ActiveIngredient update API |
| `TASK-075` | **`PAC-285`** | TASK-075 - Implement ActiveIngredient list/search API |
| `TASK-076` | **`PAC-286`** | TASK-076 - Build ActiveIngredient management screen |
| `TASK-077` | **`PAC-287`** | TASK-077 - Add ActiveIngredient create/edit form validation |
| `TASK-078` | **`PAC-288`** | TASK-078 - Create medicine_active_ingredients mapping schema |
| `TASK-079` | **`PAC-289`** | TASK-079 - Implement Medicine-Ingredient mapping API |
| `TASK-080` | **`PAC-290`** | TASK-080 - Build ingredient mapping component in Medicine form |
| `TASK-081` | **`PAC-291`** | TASK-081 - Show mapped ingredients in medicine detail |
| `TASK-082` | **`PAC-292`** | TASK-082 - Add unique validation for ingredient mapping |
| `TASK-083` | **`PAC-293`** | TASK-083 - Prevent mapping inactive ingredient if not allowed |
| `TASK-084` | **`PAC-294`** | TASK-084 - Normalize ActiveIngredient names |
| `TASK-085` | **`PAC-295`** | TASK-085 - Reject raw scraped ingredient strings in official mapping |
| `TASK-086` | **`PAC-296`** | TASK-086 - Add ActiveIngredient data quality review checklist |
| `TASK-087` | **`PAC-297`** | TASK-087 - Create graph sync event when Medicine changes |
| `TASK-088` | **`PAC-298`** | TASK-088 - Create graph sync event when ActiveIngredient changes |
| `TASK-089` | **`PAC-299`** | TASK-089 - Create graph sync event when Ingredient mapping changes |
| `TASK-090` | **`PAC-300`** | TASK-090 - Create suppliers Prisma model |
| `TASK-091` | **`PAC-301`** | TASK-091 - Implement supplier create API |
| `TASK-092` | **`PAC-302`** | TASK-092 - Build supplier create form |
| `TASK-093` | **`PAC-303`** | TASK-093 - Validate supplier required fields |
| `TASK-094` | **`PAC-304`** | TASK-094 - Implement supplier list/search API |
| `TASK-095` | **`PAC-305`** | TASK-095 - Implement supplier update API |
| `TASK-096` | **`PAC-306`** | TASK-096 - Build supplier list and edit screen |
| `TASK-097` | **`PAC-307`** | TASK-097 - Implement Admin-only supplier deactivate API |
| `TASK-098` | **`PAC-308`** | TASK-098 - Add supplier deactivate confirmation UI |
| `TASK-099` | **`PAC-309`** | TASK-099 - Prevent inactive supplier in new Stock Import |
| `TASK-100` | **`PAC-310`** | TASK-100 - Link active supplier selection to Stock Import |
| `TASK-101` | **`PAC-311`** | TASK-101 - Build supplier selector for Stock Import UI |
| `TASK-102` | **`PAC-312`** | TASK-102 - Create medicine_batches Prisma model |
| `TASK-103` | **`PAC-313`** | TASK-103 - Add MedicineBatch indexes and constraints |
| `TASK-104` | **`PAC-314`** | TASK-104 - Remove aggregate inventory source-of-truth assumptions |
| `TASK-105` | **`PAC-315`** | TASK-105 - Document MedicineBatch as inventory source of truth |
| `TASK-106` | **`PAC-316`** | TASK-106 - Enforce required batch_number |
| `TASK-107` | **`PAC-317`** | TASK-107 - Normalize batch_number before comparison |
| `TASK-108` | **`PAC-318`** | TASK-108 - Add UI validation for batch_number |
| `TASK-109` | **`PAC-319`** | TASK-109 - Implement batch identity validation service |
| `TASK-110` | **`PAC-320`** | TASK-110 - Add migration constraint for medicine/batch/expiry uniqueness |
| `TASK-111` | **`PAC-321`** | TASK-111 - Add batch identity unit tests |
| `TASK-112` | **`PAC-322`** | TASK-112 - Implement inventory summary query from MedicineBatch |
| `TASK-113` | **`PAC-323`** | TASK-113 - Build Inventory Summary screen |
| `TASK-114` | **`PAC-324`** | TASK-114 - Add search/filter to Inventory Summary |
| `TASK-115` | **`PAC-325`** | TASK-115 - Implement Batch Detail API |
| `TASK-116` | **`PAC-326`** | TASK-116 - Build Batch Detail screen |
| `TASK-117` | **`PAC-327`** | TASK-117 - Display expired/near-expiry/sellable batch status |
| `TASK-118` | **`PAC-328`** | TASK-118 - Implement sellable quantity calculation service |
| `TASK-119` | **`PAC-329`** | TASK-119 - Add tests for sellable quantity calculation |
| `TASK-120` | **`PAC-330`** | TASK-120 - Exclude expired batches from sellable stock |
| `TASK-121` | **`PAC-331`** | TASK-121 - Add tests for expired batch exclusion |
| `TASK-122` | **`PAC-332`** | TASK-122 - Implement low-stock calculation from sellable quantity |
| `TASK-123` | **`PAC-333`** | TASK-123 - Display low-stock state for Admin/Warehouse |
| `TASK-124` | **`PAC-334`** | TASK-124 - Hide general low-stock dashboard from Staff |
| `TASK-125` | **`PAC-335`** | TASK-125 - Implement near-expiry calculation with threshold |
| `TASK-126` | **`PAC-336`** | TASK-126 - Display near-expiry batch state |
| `TASK-127` | **`PAC-337`** | TASK-127 - Build Admin/Warehouse inventory dashboard cards |
| `TASK-128` | **`PAC-338`** | TASK-128 - Build POS sellable stock display |
| `TASK-129` | **`PAC-339`** | TASK-129 - Remove direct quantity edit from Batch Detail UI |
| `TASK-130` | **`PAC-340`** | TASK-130 - Ensure no public API directly edits batch quantity |
| `TASK-131` | **`PAC-341`** | TASK-131 - Create stock_imports Prisma model |
| `TASK-132` | **`PAC-342`** | TASK-132 - Implement create Stock Import draft API |
| `TASK-133` | **`PAC-343`** | TASK-133 - Build create Stock Import screen |
| `TASK-134` | **`PAC-344`** | TASK-134 - Create stock_import_lines Prisma model |
| `TASK-135` | **`PAC-345`** | TASK-135 - Implement add stock import line API |
| `TASK-136` | **`PAC-346`** | TASK-136 - Build stock import line editor UI |
| `TASK-137` | **`PAC-347`** | TASK-137 - Implement update draft import line API |
| `TASK-138` | **`PAC-348`** | TASK-138 - Implement delete draft import line API |
| `TASK-139` | **`PAC-349`** | TASK-139 - Disable edit/delete for confirmed import lines |
| `TASK-140` | **`PAC-350`** | TASK-140 - Validate active supplier before confirm import |
| `TASK-141` | **`PAC-351`** | TASK-141 - Validate batch number in import line |
| `TASK-142` | **`PAC-352`** | TASK-142 - Validate expiry date in import line |
| `TASK-143` | **`PAC-353`** | TASK-143 - Implement confirm Stock Import transaction skeleton |
| `TASK-144` | **`PAC-354`** | TASK-144 - Apply stock import lines to MedicineBatch |
| `TASK-145` | **`PAC-355`** | TASK-145 - Rollback Stock Import confirm on any invalid line |
| `TASK-146` | **`PAC-356`** | TASK-146 - Implement batch merge when medicine/batch/expiry match |
| `TASK-147` | **`PAC-357`** | TASK-147 - Add unit tests for valid batch merge rule |
| `TASK-148` | **`PAC-358`** | TASK-148 - Show batch merge result after Stock Import confirm |
| `TASK-149` | **`PAC-359`** | TASK-149 - Implement expiry mismatch rejection |
| `TASK-150` | **`PAC-360`** | TASK-150 - Return line-level expiry mismatch errors |
| `TASK-151` | **`PAC-361`** | TASK-151 - Add tests for expiry mismatch rejection |
| `TASK-152` | **`PAC-362`** | TASK-152 - Lock confirmed Stock Import status |
| `TASK-153` | **`PAC-363`** | TASK-153 - Build confirmed Stock Import read-only UI |
| `TASK-154` | **`PAC-364`** | TASK-154 - Prevent duplicate Stock Import confirm |
| `TASK-155` | **`PAC-365`** | TASK-155 - Add tests for confirmed Stock Import immutability |
| `TASK-156` | **`PAC-366`** | TASK-156 - Write audit log for Stock Import confirm |
| `TASK-157` | **`PAC-367`** | TASK-157 - Show Stock Import audit metadata in detail UI |
| `TASK-158` | **`PAC-368`** | TASK-158 - Add Stock Import traceability notes |
| `TASK-159` | **`PAC-369`** | TASK-159 - Add Stock Import confirm integration tests |
| `TASK-160` | **`PAC-370`** | TASK-160 - Add Stock Import smoke test checklist |
| `TASK-161` | **`PAC-371`** | TASK-161 - Create inventory_adjustments Prisma model |
| `TASK-162` | **`PAC-372`** | TASK-162 - Create inventory_adjustment_lines Prisma model |
| `TASK-163` | **`PAC-373`** | TASK-163 - Implement create Inventory Adjustment API |
| `TASK-164` | **`PAC-374`** | TASK-164 - Build create Inventory Adjustment screen |
| `TASK-165` | **`PAC-375`** | TASK-165 - Build MedicineBatch selector for adjustment |
| `TASK-166` | **`PAC-376`** | TASK-166 - Validate adjustment type and quantity |
| `TASK-167` | **`PAC-377`** | TASK-167 - Enforce required adjustment reason in backend |
| `TASK-168` | **`PAC-378`** | TASK-168 - Add required reason validation in UI |
| `TASK-169` | **`PAC-379`** | TASK-169 - Show batch before/after quantity preview |
| `TASK-170` | **`PAC-380`** | TASK-170 - Implement confirm Inventory Adjustment transaction |
| `TASK-171` | **`PAC-381`** | TASK-171 - Update MedicineBatch through adjustment transaction only |
| `TASK-172` | **`PAC-382`** | TASK-172 - Prevent adjustment from making quantity negative |
| `TASK-173` | **`PAC-383`** | TASK-173 - Lock confirmed Inventory Adjustment |
| `TASK-174` | **`PAC-384`** | TASK-174 - Create Inventory Adjustment list API |
| `TASK-175` | **`PAC-385`** | TASK-175 - Build Inventory Adjustment history list UI |
| `TASK-176` | **`PAC-386`** | TASK-176 - Implement Inventory Adjustment detail API |
| `TASK-177` | **`PAC-387`** | TASK-177 - Build Inventory Adjustment detail screen |
| `TASK-178` | **`PAC-388`** | TASK-178 - Add Warehouse permission for create/confirm adjustment |
| `TASK-179` | **`PAC-389`** | TASK-179 - Add Admin permission for adjustment history and review |
| `TASK-180` | **`PAC-390`** | TASK-180 - Write audit log for Inventory Adjustment |
| `TASK-181` | **`PAC-391`** | TASK-181 - Display adjustment audit information in UI |
| `TASK-182` | **`PAC-392`** | TASK-182 - Add tests for negative quantity adjustment |
| `TASK-183` | **`PAC-393`** | TASK-183 - Add tests for required adjustment reason |
| `TASK-184` | **`PAC-394`** | TASK-184 - Add tests for Warehouse adjustment permission |
| `TASK-185` | **`PAC-395`** | TASK-185 - Block direct MedicineBatch quantity update service path |
| `TASK-186` | **`PAC-396`** | TASK-186 - Implement cancel Draft Inventory Adjustment API |
| `TASK-187` | **`PAC-397`** | TASK-187 - Build cancel Draft Inventory Adjustment UI |
| `TASK-188` | **`PAC-398`** | TASK-188 - Refresh Inventory Summary after adjustment confirm |
| `TASK-189` | **`PAC-399`** | TASK-189 - Add Inventory Adjustment smoke test checklist |
| `TASK-190` | **`PAC-400`** | TASK-190 - Add Inventory Adjustment traceability notes |
| `TASK-191` | **`PAC-401`** | TASK-191 - Create orders Prisma model |
| `TASK-192` | **`PAC-402`** | TASK-192 - Create order_items Prisma model |
| `TASK-193` | **`PAC-403`** | TASK-193 - Add order status enum DRAFT/PAID/CANCELLED |
| `TASK-194` | **`PAC-404`** | TASK-194 - Implement create Draft Order API |
| `TASK-195` | **`PAC-405`** | TASK-195 - Build POS Draft Order screen |
| `TASK-196` | **`PAC-406`** | TASK-196 - Implement POS medicine search API |
| `TASK-197` | **`PAC-407`** | TASK-197 - Build POS medicine search component |
| `TASK-198` | **`PAC-408`** | TASK-198 - Display sellable stock in POS search results |
| `TASK-199` | **`PAC-409`** | TASK-199 - Implement add item to Draft Order API |
| `TASK-200` | **`PAC-410`** | TASK-200 - Build add-to-order action in POS |
| `TASK-201` | **`PAC-411`** | TASK-201 - Validate active medicine when adding POS item |
| `TASK-202` | **`PAC-412`** | TASK-202 - Implement update Draft Order item quantity API |
| `TASK-203` | **`PAC-413`** | TASK-203 - Build quantity controls in Draft Order UI |
| `TASK-204` | **`PAC-414`** | TASK-204 - Validate Draft Order quantity greater than zero |
| `TASK-205` | **`PAC-415`** | TASK-205 - Validate sellable stock when updating Draft Order quantity |
| `TASK-206` | **`PAC-416`** | TASK-206 - Implement remove item from Draft Order API |
| `TASK-207` | **`PAC-417`** | TASK-207 - Build remove item action in POS |
| `TASK-208` | **`PAC-418`** | TASK-208 - Implement Draft Order total calculation service |
| `TASK-209` | **`PAC-419`** | TASK-209 - Display Draft Order totals in POS UI |
| `TASK-210` | **`PAC-420`** | TASK-210 - Ensure no coupon or discount logic in MVP Draft Order total |
| `TASK-211` | **`PAC-421`** | TASK-211 - Show POS stock validation errors |
| `TASK-212` | **`PAC-422`** | TASK-212 - Implement walk-in customer support in order model |
| `TASK-213` | **`PAC-423`** | TASK-213 - Display walk-in customer option in POS |
| `TASK-214` | **`PAC-424`** | TASK-214 - Keep full Customer Management out of MVP POS flow |
| `TASK-215` | **`PAC-425`** | TASK-215 - Apply Staff ownership scope to order list API |
| `TASK-216` | **`PAC-426`** | TASK-216 - Build Staff scoped order list UI |
| `TASK-217` | **`PAC-427`** | TASK-217 - Implement Admin all-orders list API |
| `TASK-218` | **`PAC-428`** | TASK-218 - Build Admin all-orders UI |
| `TASK-219` | **`PAC-429`** | TASK-219 - Implement cancel Draft Order API |
| `TASK-220` | **`PAC-430`** | TASK-220 - Build cancel Draft Order UI |
| `TASK-221` | **`PAC-431`** | TASK-221 - Prevent cancel PAID or already CANCELLED order |
| `TASK-222` | **`PAC-432`** | TASK-222 - Preserve Draft Order after checkout failure in UI |
| `TASK-223` | **`PAC-433`** | TASK-223 - Restore checkout error state back to Draft Order |
| `TASK-224` | **`PAC-434`** | TASK-224 - Build Order Detail screen for DRAFT/PAID/CANCELLED |
| `TASK-225` | **`PAC-435`** | TASK-225 - Add POS API integration tests |
| `TASK-226` | **`PAC-436`** | TASK-226 - Add POS frontend smoke test checklist |
| `TASK-227` | **`PAC-437`** | TASK-227 - Create drug_interaction_rules Prisma model |
| `TASK-228` | **`PAC-438`** | TASK-228 - Implement create ActiveIngredient-level interaction rule API |
| `TASK-229` | **`PAC-439`** | TASK-229 - Build DrugInteraction Rule management screen |
| `TASK-230` | **`PAC-440`** | TASK-230 - Validate two active ingredients in interaction rule |
| `TASK-231` | **`PAC-441`** | TASK-231 - Implement update DrugInteraction Rule API |
| `TASK-232` | **`PAC-442`** | TASK-232 - Implement deactivate DrugInteraction Rule API |
| `TASK-233` | **`PAC-443`** | TASK-233 - Trigger Graph Sync event on interaction rule change |
| `TASK-234` | **`PAC-444`** | TASK-234 - Validate severity enum LOW/MEDIUM/HIGH only |
| `TASK-235` | **`PAC-445`** | TASK-235 - Implement derive interaction from medicine active ingredients |
| `TASK-236` | **`PAC-446`** | TASK-236 - Add tests for derived medicine interactions |
| `TASK-237` | **`PAC-447`** | TASK-237 - Implement order interaction check service |
| `TASK-238` | **`PAC-448`** | TASK-238 - Implement POST /orders/{id}/interactions/check API |
| `TASK-239` | **`PAC-449`** | TASK-239 - Create interaction_alerts Prisma model |
| `TASK-240` | **`PAC-450`** | TASK-240 - Persist displayed InteractionAlert snapshot fields |
| `TASK-241` | **`PAC-451`** | TASK-241 - Enforce one active alert per order and interaction rule |
| `TASK-242` | **`PAC-452`** | TASK-242 - Update display_count and last_displayed_at |
| `TASK-243` | **`PAC-453`** | TASK-243 - Build POS InteractionAlert panel |
| `TASK-244` | **`PAC-454`** | TASK-244 - Implement LOW/MEDIUM/HIGH alert display logic |
| `TASK-245` | **`PAC-455`** | TASK-245 - Build HIGH alert acknowledgement UI |
| `TASK-246` | **`PAC-456`** | TASK-246 - Implement acknowledge InteractionAlert API |
| `TASK-247` | **`PAC-457`** | TASK-247 - Build HIGH alert consultation note UI |
| `TASK-248` | **`PAC-458`** | TASK-248 - Implement consultation note API per HIGH alert |
| `TASK-249` | **`PAC-459`** | TASK-249 - Validate HIGH alert consultation note is not empty |
| `TASK-250` | **`PAC-460`** | TASK-250 - Implement checkout blocker for unresolved HIGH alerts |
| `TASK-251` | **`PAC-461`** | TASK-251 - Build UI prompt when checkout is blocked by HIGH alert |
| `TASK-252` | **`PAC-462`** | TASK-252 - Build Admin InteractionAlert History API and UI |
| `TASK-253` | **`PAC-463`** | TASK-253 - Enforce Warehouse no-access to InteractionAlert APIs |
| `TASK-254` | **`PAC-464`** | TASK-254 - Add tests for Warehouse no-access to InteractionAlert |
| `TASK-255` | **`PAC-465`** | TASK-255 - Add InteractionAlert lifecycle integration tests |
| `TASK-256` | **`PAC-466`** | TASK-256 - Add HIGH acknowledgement and consultation note tests |
| `TASK-257` | **`PAC-467`** | TASK-257 - Add filters to InteractionAlert History |
| `TASK-258` | **`PAC-468`** | TASK-258 - Add InteractionAlert snapshot and traceability notes |
| `TASK-259` | **`PAC-469`** | TASK-259 - Define Checkout DTO and validation schema |
| `TASK-260` | **`PAC-470`** | TASK-260 - Implement CheckoutController POST /checkout |
| `TASK-261` | **`PAC-471`** | TASK-261 - Implement CheckoutService transaction skeleton |
| `TASK-262` | **`PAC-472`** | TASK-262 - Validate checkout actor permission and order ownership |
| `TASK-263` | **`PAC-473`** | TASK-263 - Validate order exists and status is DRAFT |
| `TASK-264` | **`PAC-474`** | TASK-264 - Validate unresolved HIGH alerts before payment |
| `TASK-265` | **`PAC-475`** | TASK-265 - Validate sellable stock inside checkout transaction |
| `TASK-266` | **`PAC-476`** | TASK-266 - Build Checkout full page or full-height panel UI |
| `TASK-267` | **`PAC-477`** | TASK-267 - Build payment method selector in Checkout UI |
| `TASK-268` | **`PAC-478`** | TASK-268 - Define FEFO allocation input/output model |
| `TASK-269` | **`PAC-479`** | TASK-269 - Query sellable MedicineBatch for FEFO |
| `TASK-270` | **`PAC-480`** | TASK-270 - Sort FEFO batches by nearest expiry date |
| `TASK-271` | **`PAC-481`** | TASK-271 - Allocate requested quantity across multiple batches |
| `TASK-272` | **`PAC-482`** | TASK-272 - Reject FEFO allocation when sellable stock is insufficient |
| `TASK-273` | **`PAC-483`** | TASK-273 - Create order_batch_allocations Prisma model |
| `TASK-274` | **`PAC-484`** | TASK-274 - Persist order_batch_allocations during checkout |
| `TASK-275` | **`PAC-485`** | TASK-275 - Deduct MedicineBatch quantities inside checkout transaction |
| `TASK-276` | **`PAC-486`** | TASK-276 - Create idempotency_records Prisma model |
| `TASK-277` | **`PAC-487`** | TASK-277 - Implement idempotency key handling for checkout |
| `TASK-278` | **`PAC-488`** | TASK-278 - Rollback checkout transaction on failure |
| `TASK-279` | **`PAC-489`** | TASK-279 - Create payments Prisma model |
| `TASK-280` | **`PAC-490`** | TASK-280 - Implement cash payment handling inside checkout |
| `TASK-281` | **`PAC-491`** | TASK-281 - Calculate and persist change_amount |
| `TASK-282` | **`PAC-492`** | TASK-282 - Implement bank transfer transaction_reference validation |
| `TASK-283` | **`PAC-493`** | TASK-283 - Enforce one SUCCESS payment per order |
| `TASK-284` | **`PAC-494`** | TASK-284 - Allow failed payment attempts without creating duplicate SUCCESS payment |
| `TASK-285` | **`PAC-495`** | TASK-285 - Create invoices Prisma model |
| `TASK-286` | **`PAC-496`** | TASK-286 - Generate invoice inside checkout transaction |
| `TASK-287` | **`PAC-497`** | TASK-287 - Build invoice view and print UI |
| `TASK-288` | **`PAC-498`** | TASK-288 - Update order status to PAID only after successful checkout |
| `TASK-289` | **`PAC-499`** | TASK-289 - Add checkout integration tests |
| `TASK-290` | **`PAC-500`** | TASK-290 - Add FEFO, idempotency and rollback tests |
| `TASK-291` | **`PAC-501`** | TASK-291 - Define AI provider abstraction |
| `TASK-292` | **`PAC-502`** | TASK-292 - Configure backend AI provider/model settings loader |
| `TASK-293` | **`PAC-503`** | TASK-293 - Implement Google AI provider adapter |
| `TASK-294` | **`PAC-504`** | TASK-294 - Add Google AI timeout and retry-safe error handling |
| `TASK-295` | **`PAC-505`** | TASK-295 - Implement MockAI fallback adapter |
| `TASK-296` | **`PAC-506`** | TASK-296 - Implement fallback provider selection logic |
| `TASK-297` | **`PAC-507`** | TASK-297 - Add provider_requested and provider_used tracking |
| `TASK-298` | **`PAC-508`** | TASK-298 - Implement AI interaction explanation API |
| `TASK-299` | **`PAC-509`** | TASK-299 - Build AI explanation panel in InteractionAlert UI |
| `TASK-300` | **`PAC-510`** | TASK-300 - Add AI disclaimer to explanation panel |
| `TASK-301` | **`PAC-511`** | TASK-301 - Build AI explanation loading, error and fallback states |
| `TASK-302` | **`PAC-512`** | TASK-302 - Implement AI consultation note draft API |
| `TASK-303` | **`PAC-513`** | TASK-303 - Build AI consultation note draft panel |
| `TASK-304` | **`PAC-514`** | TASK-304 - Build Staff edit AI draft before confirm UI |
| `TASK-305` | **`PAC-515`** | TASK-305 - Implement Staff confirm AI draft as official consultation note |
| `TASK-306` | **`PAC-516`** | TASK-306 - Prevent unconfirmed AI draft from saving official note |
| `TASK-307` | **`PAC-517`** | TASK-307 - Link confirmed AI note to correct HIGH InteractionAlert |
| `TASK-308` | **`PAC-518`** | TASK-308 - Implement safe follow-up question API |
| `TASK-309` | **`PAC-519`** | TASK-309 - Build safe follow-up question UI field |
| `TASK-310` | **`PAC-520`** | TASK-310 - Block medical-record style storage for symptom/context input |
| `TASK-311` | **`PAC-521`** | TASK-311 - Add AI Copilot permission checks |
| `TASK-312` | **`PAC-522`** | TASK-312 - Add AI Copilot frontend route and action guards |
| `TASK-313` | **`PAC-523`** | TASK-313 - Add AI provider unit tests |
| `TASK-314` | **`PAC-524`** | TASK-314 - Add MockAI fallback tests |
| `TASK-315` | **`PAC-525`** | TASK-315 - Add AI Copilot integration smoke checklist |
| `TASK-316` | **`PAC-526`** | TASK-316 - Define unsafe AI request categories |
| `TASK-317` | **`PAC-527`** | TASK-317 - Implement AI input guardrail service |
| `TASK-318` | **`PAC-528`** | TASK-318 - Block diagnosis requests |
| `TASK-319` | **`PAC-529`** | TASK-319 - Block prescribing requests |
| `TASK-320` | **`PAC-530`** | TASK-320 - Block dosage advice requests |
| `TASK-321` | **`PAC-531`** | TASK-321 - Add safe response templates for blocked AI input |
| `TASK-322` | **`PAC-532`** | TASK-322 - Add PII minimization before AI provider call |
| `TASK-323` | **`PAC-533`** | TASK-323 - Redact customer/order unnecessary personal data before AI call |
| `TASK-324` | **`PAC-534`** | TASK-324 - Implement AI output guardrail service |
| `TASK-325` | **`PAC-535`** | TASK-325 - Block unsafe AI output before rendering |
| `TASK-326` | **`PAC-536`** | TASK-326 - Implement structured output schema validation |
| `TASK-327` | **`PAC-537`** | TASK-327 - Add output schema retry or safe fallback handling |
| `TASK-328` | **`PAC-538`** | TASK-328 - Add guardrail status object to AI response |
| `TASK-329` | **`PAC-539`** | TASK-329 - Create ai_audit_logs Prisma model |
| `TASK-330` | **`PAC-540`** | TASK-330 - Implement AI audit log write service |
| `TASK-331` | **`PAC-541`** | TASK-331 - Persist AI provider, model and prompt metadata |
| `TASK-332` | **`PAC-542`** | TASK-332 - Persist input and output guardrail statuses |
| `TASK-333` | **`PAC-543`** | TASK-333 - Persist AI latency, request id and fallback metadata |
| `TASK-334` | **`PAC-544`** | TASK-334 - Ensure AI Audit does not store raw PII |
| `TASK-335` | **`PAC-545`** | TASK-335 - Build Admin AI Audit Log list API |
| `TASK-336` | **`PAC-546`** | TASK-336 - Build Admin AI Audit Log UI |
| `TASK-337` | **`PAC-547`** | TASK-337 - Add AI Audit filters by provider, status and date |
| `TASK-338` | **`PAC-548`** | TASK-338 - Create prompt_templates Prisma model |
| `TASK-339` | **`PAC-549`** | TASK-339 - Seed official AI prompt templates with versions |
| `TASK-340` | **`PAC-550`** | TASK-340 - Load approved prompt template by use case |
| `TASK-341` | **`PAC-551`** | TASK-341 - Record prompt version in AI audit |
| `TASK-342` | **`PAC-552`** | TASK-342 - Add backend AI provider/model config validation |
| `TASK-343` | **`PAC-553`** | TASK-343 - Add environment/database config fallback order for AI settings |
| `TASK-344` | **`PAC-554`** | TASK-344 - Add timeout, circuit breaker and rate-limit guard for AI calls |
| `TASK-345` | **`PAC-555`** | TASK-345 - Add AI safe error response helper |
| `TASK-346` | **`PAC-556`** | TASK-346 - Add AI input guardrail unit tests |
| `TASK-347` | **`PAC-557`** | TASK-347 - Add diagnosis block tests |
| `TASK-348` | **`PAC-558`** | TASK-348 - Add prescribing block tests |
| `TASK-349` | **`PAC-559`** | TASK-349 - Add dosage advice block tests |
| `TASK-350` | **`PAC-560`** | TASK-350 - Add AI output guardrail tests |
| `TASK-351` | **`PAC-561`** | TASK-351 - Add structured output validation tests |
| `TASK-352` | **`PAC-562`** | TASK-352 - Add PII minimization tests |
| `TASK-353` | **`PAC-563`** | TASK-353 - Add AI audit integration tests |
| `TASK-354` | **`PAC-564`** | TASK-354 - Add prompt versioning tests |
| `TASK-355` | **`PAC-565`** | TASK-355 - Add AI safety traceability notes |
| `TASK-356` | **`PAC-566`** | TASK-356 - Create graph_sync_outbox Prisma model |
| `TASK-357` | **`PAC-567`** | TASK-357 - Add graph sync job status enum |
| `TASK-358` | **`PAC-568`** | TASK-358 - Emit outbox event from Medicine changes |
| `TASK-359` | **`PAC-569`** | TASK-359 - Emit outbox event from ActiveIngredient changes |
| `TASK-360` | **`PAC-570`** | TASK-360 - Emit outbox event from Medicine-Ingredient mapping changes |
| `TASK-361` | **`PAC-571`** | TASK-361 - Emit outbox event from DrugInteractionRule changes |
| `TASK-362` | **`PAC-572`** | TASK-362 - Implement Graph Sync worker loop |
| `TASK-363` | **`PAC-573`** | TASK-363 - Configure Neo4j connection service |
| `TASK-364` | **`PAC-574`** | TASK-364 - Add Neo4j health check |
| `TASK-365` | **`PAC-575`** | TASK-365 - Implement idempotent graph job claiming |
| `TASK-366` | **`PAC-576`** | TASK-366 - Upsert Medicine node to Neo4j |
| `TASK-367` | **`PAC-577`** | TASK-367 - Upsert ActiveIngredient node to Neo4j |
| `TASK-368` | **`PAC-578`** | TASK-368 - Upsert CONTAINS relationship |
| `TASK-369` | **`PAC-579`** | TASK-369 - Upsert INTERACTS_WITH relationship |
| `TASK-370` | **`PAC-580`** | TASK-370 - Implement canonical directed interaction edge logic |
| `TASK-371` | **`PAC-581`** | TASK-371 - Store rule properties on INTERACTS_WITH relationship |
| `TASK-372` | **`PAC-582`** | TASK-372 - Store sourceVersion, sourceUpdatedAt and syncedAt metadata |
| `TASK-373` | **`PAC-583`** | TASK-373 - Mark deactivated Medicine and ActiveIngredient as isActive=false |
| `TASK-374` | **`PAC-584`** | TASK-374 - Mark deactivated interaction rule edge as isActive=false |
| `TASK-375` | **`PAC-585`** | TASK-375 - Filter normal Neo4j queries to active data only |
| `TASK-376` | **`PAC-586`** | TASK-376 - Implement retry logic for failed graph sync jobs |
| `TASK-377` | **`PAC-587`** | TASK-377 - Add max retry and failed status handling |
| `TASK-378` | **`PAC-588`** | TASK-378 - Log graph sync failure details |
| `TASK-379` | **`PAC-589`** | TASK-379 - Write audit log for graph sync failures |
| `TASK-380` | **`PAC-590`** | TASK-380 - Implement graph projection source version tracking |
| `TASK-381` | **`PAC-591`** | TASK-381 - Implement graph freshness detection service |
| `TASK-382` | **`PAC-592`** | TASK-382 - Detect stale graph from pending outbox job |
| `TASK-383` | **`PAC-593`** | TASK-383 - Detect stale graph from failed relevant outbox job |
| `TASK-384` | **`PAC-594`** | TASK-384 - Detect stale graph from missing sourceVersion projection |
| `TASK-385` | **`PAC-595`** | TASK-385 - Add Graph Sync worker unit tests |
| `TASK-386` | **`PAC-596`** | TASK-386 - Add Neo4j projection integration tests |
| `TASK-387` | **`PAC-597`** | TASK-387 - Add INTERACTS_WITH projection tests |
| `TASK-388` | **`PAC-598`** | TASK-388 - Add graph freshness detection tests |
| `TASK-389` | **`PAC-599`** | TASK-389 - Add graph sync retry and failure tests |
| `TASK-390` | **`PAC-600`** | TASK-390 - Add Graph Sync traceability notes |
| `TASK-391` | **`PAC-601`** | TASK-391 - Implement Graph-RAG interaction explanation service |
| `TASK-392` | **`PAC-602`** | TASK-392 - Build allowlisted graph query templates |
| `TASK-393` | **`PAC-603`** | TASK-393 - Query Medicine-CONTAINS-ActiveIngredient context |
| `TASK-394` | **`PAC-604`** | TASK-394 - Query ActiveIngredient INTERACTS_WITH context |
| `TASK-395` | **`PAC-605`** | TASK-395 - Add Graph-RAG context builder for AI Copilot |
| `TASK-396` | **`PAC-606`** | TASK-396 - Return Graph-RAG provenance metadata |
| `TASK-397` | **`PAC-607`** | TASK-397 - Return graphUsed flag in Graph-RAG response |
| `TASK-398` | **`PAC-608`** | TASK-398 - Return Graph-RAG freshness metadata |
| `TASK-399` | **`PAC-609`** | TASK-399 - Add freshness warning to Graph-RAG response |
| `TASK-400` | **`PAC-610`** | TASK-400 - Implement PostgreSQL fallback when Neo4j unavailable |
| `TASK-401` | **`PAC-611`** | TASK-401 - Implement PostgreSQL fallback when graph stale |
| `TASK-402` | **`PAC-612`** | TASK-402 - Implement safe error for graph-only query without fallback |
| `TASK-403` | **`PAC-613`** | TASK-403 - Ensure Staff cannot submit raw Cypher |
| `TASK-404` | **`PAC-614`** | TASK-404 - Add backend guard against raw Cypher APIs for Staff |
| `TASK-405` | **`PAC-615`** | TASK-405 - Ensure Graph-RAG does not decide checkout |
| `TASK-406` | **`PAC-616`** | TASK-406 - Build Graph-RAG explanation UI metadata display |
| `TASK-407` | **`PAC-617`** | TASK-407 - Add Graph-RAG PostgreSQL fallback tests |
| `TASK-408` | **`PAC-618`** | TASK-408 - Add stale graph fallback tests |
| `TASK-409` | **`PAC-619`** | TASK-409 - Add raw Cypher no-access tests |
| `TASK-410` | **`PAC-620`** | TASK-410 - Add graph-not-checkout guard tests |
| `TASK-411` | **`PAC-621`** | TASK-411 - Implement Revenue Report API |
| `TASK-412` | **`PAC-622`** | TASK-412 - Build Revenue Report UI |
| `TASK-413` | **`PAC-623`** | TASK-413 - Add revenue report filters by date and status |
| `TASK-414` | **`PAC-624`** | TASK-414 - Implement Top Medicines Report API |
| `TASK-415` | **`PAC-625`** | TASK-415 - Build Top Medicines Report UI |
| `TASK-416` | **`PAC-626`** | TASK-416 - Implement Inventory Report API from MedicineBatch |
| `TASK-417` | **`PAC-627`** | TASK-417 - Build Inventory Report UI |
| `TASK-418` | **`PAC-628`** | TASK-418 - Add report empty, loading and error states |
| `TASK-419` | **`PAC-629`** | TASK-419 - Add report permission checks |
| `TASK-420` | **`PAC-630`** | TASK-420 - Create system_settings Prisma model |
| `TASK-421` | **`PAC-631`** | TASK-421 - Seed default near-expiry threshold as 90 days |
| `TASK-422` | **`PAC-632`** | TASK-422 - Implement near-expiry threshold settings API |
| `TASK-423` | **`PAC-633`** | TASK-423 - Build minimal System Settings UI for near-expiry threshold |
| `TASK-424` | **`PAC-634`** | TASK-424 - Add system settings validation and tests |
| `TASK-425` | **`PAC-635`** | TASK-425 - Create curated MVP seed dataset |
| `TASK-426` | **`PAC-636`** | TASK-426 - Seed demo users by role |
| `TASK-427` | **`PAC-637`** | TASK-427 - Seed first-login demo account |
| `TASK-428` | **`PAC-638`** | TASK-428 - Generate dynamic expiry dates for demo batches |
| `TASK-429` | **`PAC-639`** | TASK-429 - Seed FEFO multi-batch demo scenario |
| `TASK-430` | **`PAC-640`** | TASK-430 - Seed expired batch excluded from sellable stock |
| `TASK-431` | **`PAC-641`** | TASK-431 - Seed PAID order with handled HIGH alert |
| `TASK-432` | **`PAC-642`** | TASK-432 - Seed report data with PAID, DRAFT, CANCELLED and failed-payment cases |
| `TASK-433` | **`PAC-643`** | TASK-433 - Implement demo:reset local-only environment guard |
| `TASK-434` | **`PAC-644`** | TASK-434 - Rebuild Neo4j projection during demo reset |
| `TASK-435` | **`PAC-645`** | TASK-435 - Run smoke tests after demo reset |
| `TASK-436` | **`PAC-646`** | TASK-436 - Add backend unit test setup |
| `TASK-437` | **`PAC-647`** | TASK-437 - Add backend integration test setup with isolated cleanup |
| `TASK-438` | **`PAC-648`** | TASK-438 - Add frontend component test setup |
| `TASK-439` | **`PAC-649`** | TASK-439 - Add Playwright E2E test setup for Chrome desktop |
| `TASK-440` | **`PAC-650`** | TASK-440 - Add Postman manual API collection structure |
| `TASK-441` | **`PAC-651`** | TASK-441 - Add Auth and RBAC test suite |
| `TASK-442` | **`PAC-652`** | TASK-442 - Add User Management permission tests |
| `TASK-443` | **`PAC-653`** | TASK-443 - Add Medicine Management API tests |
| `TASK-444` | **`PAC-654`** | TASK-444 - Add ActiveIngredient mapping tests |
| `TASK-445` | **`PAC-655`** | TASK-445 - Add Supplier Management API tests |
| `TASK-446` | **`PAC-656`** | TASK-446 - Add MedicineBatch source-of-truth tests |
| `TASK-447` | **`PAC-657`** | TASK-447 - Add sellable quantity and expired batch tests |
| `TASK-448` | **`PAC-658`** | TASK-448 - Add near-expiry threshold tests |
| `TASK-449` | **`PAC-659`** | TASK-449 - Add Stock Import transaction tests |
| `TASK-450` | **`PAC-660`** | TASK-450 - Add Stock Import batch merge and expiry mismatch tests |
| `TASK-451` | **`PAC-661`** | TASK-451 - Add Inventory Adjustment transaction tests |
| `TASK-452` | **`PAC-662`** | TASK-452 - Add Inventory Adjustment audit and reason tests |
| `TASK-453` | **`PAC-663`** | TASK-453 - Add POS Draft Order API tests |
| `TASK-454` | **`PAC-664`** | TASK-454 - Add POS Draft Order UI smoke tests |
| `TASK-455` | **`PAC-665`** | TASK-455 - Add Staff order ownership tests |
| `TASK-456` | **`PAC-666`** | TASK-456 - Add Draft Order cancel status tests |
| `TASK-457` | **`PAC-667`** | TASK-457 - Add DrugInteraction Rule API tests |
| `TASK-458` | **`PAC-668`** | TASK-458 - Add ActiveIngredient-derived interaction tests |
| `TASK-459` | **`PAC-669`** | TASK-459 - Add InteractionAlert persistence tests |
| `TASK-460` | **`PAC-670`** | TASK-460 - Add InteractionAlert display_count tests |
| `TASK-461` | **`PAC-671`** | TASK-461 - Add HIGH alert acknowledgement tests |
| `TASK-462` | **`PAC-672`** | TASK-462 - Add HIGH alert consultation note tests |
| `TASK-463` | **`PAC-673`** | TASK-463 - Add checkout blocker tests for unresolved HIGH alerts |
| `TASK-464` | **`PAC-674`** | TASK-464 - Add Checkout transaction success tests |
| `TASK-465` | **`PAC-675`** | TASK-465 - Add Checkout rollback failure tests |
| `TASK-466` | **`PAC-676`** | TASK-466 - Add FEFO allocation unit tests |
| `TASK-467` | **`PAC-677`** | TASK-467 - Add FEFO multi-batch allocation tests |
| `TASK-468` | **`PAC-678`** | TASK-468 - Add Checkout idempotency tests |
| `TASK-469` | **`PAC-679`** | TASK-469 - Add Payment cash handling tests |
| `TASK-470` | **`PAC-680`** | TASK-470 - Add Payment one SUCCESS rule tests |
| `TASK-471` | **`PAC-681`** | TASK-471 - Add Invoice generation tests |
| `TASK-472` | **`PAC-682`** | TASK-472 - Add AI Guardrail high-risk test suite |
| `TASK-473` | **`PAC-683`** | TASK-473 - Add AI Audit privacy tests |
| `TASK-474` | **`PAC-684`** | TASK-474 - Add AI provider fallback tests |
| `TASK-475` | **`PAC-685`** | TASK-475 - Add Graph Sync outbox and retry tests |
| `TASK-476` | **`PAC-686`** | TASK-476 - Add Neo4j projection tests |
| `TASK-477` | **`PAC-687`** | TASK-477 - Add Graph freshness tests |
| `TASK-478` | **`PAC-688`** | TASK-478 - Add Graph-RAG fallback tests |
| `TASK-479` | **`PAC-689`** | TASK-479 - Add Reports deterministic calculation tests |
| `TASK-480` | **`PAC-690`** | TASK-480 - Add full MVP smoke test checklist |
| `TASK-481` | **`PAC-691`** | TASK-481 - Configure local Node.js project setup guide |
| `TASK-482` | **`PAC-692`** | TASK-482 - Configure frontend environment variables guide |
| `TASK-483` | **`PAC-693`** | TASK-483 - Configure backend environment variables guide |
| `TASK-484` | **`PAC-694`** | TASK-484 - Configure Supabase project setup instructions |
| `TASK-485` | **`PAC-695`** | TASK-485 - Configure Neo4j AuraDB setup instructions |
| `TASK-486` | **`PAC-696`** | TASK-486 - Configure Google AI API key setup instructions |
| `TASK-487` | **`PAC-697`** | TASK-487 - Configure MockAI fallback setup instructions |
| `TASK-488` | **`PAC-698`** | TASK-488 - Add Prisma generate and migrate setup command |
| `TASK-489` | **`PAC-699`** | TASK-489 - Add seed command for curated MVP data |
| `TASK-490` | **`PAC-700`** | TASK-490 - Add graph projection rebuild command |
| `TASK-491` | **`PAC-701`** | TASK-491 - Add demo reset command entrypoint |
| `TASK-492` | **`PAC-702`** | TASK-492 - Add demo reset environment safety checks |
| `TASK-493` | **`PAC-703`** | TASK-493 - Configure GitHub Actions lint check |
| `TASK-494` | **`PAC-704`** | TASK-494 - Configure GitHub Actions type check |
| `TASK-495` | **`PAC-705`** | TASK-495 - Configure GitHub Actions frontend build |
| `TASK-496` | **`PAC-706`** | TASK-496 - Configure GitHub Actions backend build |
| `TASK-497` | **`PAC-707`** | TASK-497 - Configure GitHub Actions unit test check |
| `TASK-498` | **`PAC-708`** | TASK-498 - Configure GitHub Actions integration test check |
| `TASK-499` | **`PAC-709`** | TASK-499 - Configure Prisma schema validation check |
| `TASK-500` | **`PAC-710`** | TASK-500 - Configure Prisma migration check |
| `TASK-501` | **`PAC-711`** | TASK-501 - Add CI guard to prevent destructive tests against demo database |
| `TASK-502` | **`PAC-712`** | TASK-502 - Add CI branch protection expectation notes |
| `TASK-503` | **`PAC-713`** | TASK-503 - Add local-only guard for demo:reset script |
| `TASK-504` | **`PAC-714`** | TASK-504 - Add Chrome desktop target verification checklist |
| `TASK-505` | **`PAC-715`** | TASK-505 - Add basic responsive verification checklist |
| `TASK-506` | **`PAC-716`** | TASK-506 - Write project README setup section |
| `TASK-507` | **`PAC-717`** | TASK-507 - Write backend setup and run instructions |
| `TASK-508` | **`PAC-718`** | TASK-508 - Write frontend setup and run instructions |
| `TASK-509` | **`PAC-719`** | TASK-509 - Write database migration and seed instructions |
| `TASK-510` | **`PAC-720`** | TASK-510 - Write Supabase Auth setup notes |
| `TASK-511` | **`PAC-721`** | TASK-511 - Write Neo4j setup and graph rebuild notes |
| `TASK-512` | **`PAC-722`** | TASK-512 - Write AI provider and MockAI fallback setup notes |
| `TASK-513` | **`PAC-723`** | TASK-513 - Write demo account guide |
| `TASK-514` | **`PAC-724`** | TASK-514 - Write demo scenario script for login and role switching |
| `TASK-515` | **`PAC-725`** | TASK-515 - Write demo scenario script for Stock Import and MedicineBatch |
| `TASK-516` | **`PAC-726`** | TASK-516 - Write demo scenario script for POS and Checkout |
| `TASK-517` | **`PAC-727`** | TASK-517 - Write demo scenario script for InteractionAlert and HIGH note |
| `TASK-518` | **`PAC-728`** | TASK-518 - Write demo scenario script for AI Copilot and AI Audit |
| `TASK-519` | **`PAC-729`** | TASK-519 - Write demo scenario script for Graph Sync and Graph-RAG |
| `TASK-520` | **`PAC-730`** | TASK-520 - Write demo scenario script for Reports and Settings |
| `TASK-521` | **`PAC-731`** | TASK-521 - Write MVP traceability matrix summary |
| `TASK-522` | **`PAC-732`** | TASK-522 - Write release/demo readiness checklist |
| `TASK-523` | **`PAC-733`** | TASK-523 - Write known limitations and out-of-scope guard section |
| `TASK-524` | **`PAC-734`** | TASK-524 - Prepare contingency evidence screenshots list |
| `TASK-525` | **`PAC-735`** | TASK-525 - Prepare final smoke test report template |
| `TASK-526` | **`PAC-736`** | TASK-526 - Build Admin Graph Sync Status list UI |
| `TASK-527` | **`PAC-737`** | TASK-527 - Build Graph Sync job detail UI |
| `TASK-528` | **`PAC-738`** | TASK-528 - Build manual graph retry action for Admin |
| `TASK-529` | **`PAC-739`** | TASK-529 - Build manual graph rebuild action for Admin |
| `TASK-530` | **`PAC-740`** | TASK-530 - Add Graph Sync Status permission checks |
| `TASK-531` | **`PAC-741`** | TASK-531 - Build read-only Graph Explorer UI |
| `TASK-532` | **`PAC-742`** | TASK-532 - Build Graph Explorer node detail panel |
| `TASK-533` | **`PAC-743`** | TASK-533 - Build Graph Explorer relationship detail panel |
| `TASK-534` | **`PAC-744`** | TASK-534 - Add Graph Explorer permission checks |
| `TASK-535` | **`PAC-745`** | TASK-535 - Ensure Graph Explorer uses allowlisted templates only |
| `TASK-536` | **`PAC-746`** | TASK-536 - Build AI Provider Settings UI |
| `TASK-537` | **`PAC-747`** | TASK-537 - Build AI model configuration UI |
| `TASK-538` | **`PAC-748`** | TASK-538 - Build Prompt Management list UI |
| `TASK-539` | **`PAC-749`** | TASK-539 - Build Prompt Management version detail UI |
| `TASK-540` | **`PAC-750`** | TASK-540 - Add prompt approval status display |
| `TASK-541` | **`PAC-751`** | TASK-541 - Build System Audit Log UI |
| `TASK-542` | **`PAC-752`** | TASK-542 - Add System Audit Log filters |
| `TASK-543` | **`PAC-753`** | TASK-543 - Implement Supabase Storage upload flow for medicine images |
| `TASK-544` | **`PAC-754`** | TASK-544 - Build medicine image upload UI |
| `TASK-545` | **`PAC-755`** | TASK-545 - Add Supabase Storage file validation |
| `TASK-546` | **`PAC-756`** | TASK-546 - Implement Supabase Realtime inventory update listener |
| `TASK-547` | **`PAC-757`** | TASK-547 - Build realtime POS stock refresh behavior |
| `TASK-548` | **`PAC-758`** | TASK-548 - Add realtime fallback polling behavior |
| `TASK-549` | **`PAC-759`** | TASK-549 - Build Notification Center UI |
| `TASK-550` | **`PAC-760`** | TASK-550 - Implement low-stock notification generation |
| `TASK-551` | **`PAC-761`** | TASK-551 - Implement near-expiry notification generation |
| `TASK-552` | **`PAC-762`** | TASK-552 - Build read/unread notification state |
| `TASK-553` | **`PAC-763`** | TASK-553 - Implement scheduled near-expiry scan job |
| `TASK-554` | **`PAC-764`** | TASK-554 - Implement AI Business Report Narrative API |
| `TASK-555` | **`PAC-765`** | TASK-555 - Build AI Business Report Narrative UI |
| `TASK-556` | **`PAC-766`** | TASK-556 - Document Full Customer Management future scope |
| `TASK-557` | **`PAC-767`** | TASK-557 - Document customer profile CRUD future scope |
| `TASK-558` | **`PAC-768`** | TASK-558 - Document customer purchase history expansion |
| `TASK-559` | **`PAC-769`** | TASK-559 - Document Online Commerce storefront future scope |
| `TASK-560` | **`PAC-770`** | TASK-560 - Document online cart and wishlist future scope |
| `TASK-561` | **`PAC-771`** | TASK-561 - Document online checkout separation from POS checkout |
| `TASK-562` | **`PAC-772`** | TASK-562 - Document Product Variant Catalog future scope |
| `TASK-563` | **`PAC-773`** | TASK-563 - Document product images and documents commercial scope |
| `TASK-564` | **`PAC-774`** | TASK-564 - Document real catalog data import future workflow |
| `TASK-565` | **`PAC-775`** | TASK-565 - Document Multi-store future scope |
| `TASK-566` | **`PAC-776`** | TASK-566 - Document default store assumption for MVP |
| `TASK-567` | **`PAC-777`** | TASK-567 - Document Multi-warehouse future scope |
| `TASK-568` | **`PAC-778`** | TASK-568 - Document default warehouse assumption for MVP |
| `TASK-569` | **`PAC-779`** | TASK-569 - Document Stock Transfer future workflow |
| `TASK-570` | **`PAC-780`** | TASK-570 - Document stock transfer audit future requirement |
| `TASK-571` | **`PAC-781`** | TASK-571 - Document Forecasting and reorder suggestion future scope |
| `TASK-572` | **`PAC-782`** | TASK-572 - Document forecast data requirements and limitations |
| `TASK-573` | **`PAC-783`** | TASK-573 - Document Promotion and Coupon future scope |
| `TASK-574` | **`PAC-784`** | TASK-574 - Document discount not included in MVP checkout |
| `TASK-575` | **`PAC-785`** | TASK-575 - Document Shipping and Delivery future scope |
| `TASK-576` | **`PAC-786`** | TASK-576 - Document delivery status future workflow |
| `TASK-577` | **`PAC-787`** | TASK-577 - Document Review and CMS future scope |
| `TASK-578` | **`PAC-788`** | TASK-578 - Document product review moderation future consideration |
| `TASK-579` | **`PAC-789`** | TASK-579 - Document commercial expansion dependency map |
| `TASK-580` | **`PAC-790`** | TASK-580 - Document final out-of-scope guardrails for AI agents |
