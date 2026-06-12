# Document 15 — UI/UX Screen Specification

# Tài liệu 15 — Đặc tả màn hình UI/UX

---

## Metadata

| Mục                    | Nội dung                                                                                                                                                                                                 |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID            | DOC-15                                                                                                                                                                                                   |
| File name              | `15_ui_ux_screen_specification.md`                                                                                                                                                                       |
| Document Name          | UI/UX Screen Specification                                                                                                                                                                               |
| Tên tiếng Việt         | Đặc tả màn hình UI/UX                                                                                                                                                                                    |
| Project                | PharmaAssist AI Intelligence                                                                                                                                                                             |
| Version                | 1.0 Draft                                                                                                                                                                                                |
| Status                 | Draft                                                                                                                                                                                                    |
| Created Date           | 08/06/2026                                                                                                                                                                                               |
| Last Updated           | 08/06/2026                                                                                                                                                                                               |
| Owner                  | UI/UX Designer / Frontend Lead                                                                                                                                                                           |
| Reviewer               | Frontend Developer, Backend Developer, Tester, Project Leader, Demo Owner                                                                                                                                |
| Baseline Source        | Document 03 — Vision & Scope, Document 06 — SRS, Document 07 — Roles/Permissions, Document 08 — Use Case, Document 12 — API Specification, Document 16 — AI Architecture, Document 17 — Graph-RAG Design |
| Related Documents      | Document 07, Document 08, Document 12, Document 19, Document 20                                                                                                                                          |
| Frontend               | Next.js                                                                                                                                                                                                  |
| Primary Browser Target | Chrome desktop/laptop                                                                                                                                                                                    |
| Main UI Language       | Tiếng Việt                                                                                                                                                                                               |
| Technical Terms        | Giữ nguyên tên module/entity/API/table/enum/permission bằng tiếng Anh khi cần                                                                                                                            |
| MVP UI Scope           | Internal pharmacy web app, POS, Inventory, Checkout, Interaction Alert, AI, Graph-RAG, Reports, Settings                                                                                                 |

---

## 1. Mục đích tài liệu

Tài liệu **UI/UX Screen Specification** đặc tả màn hình, navigation, user flow, role-based UI, UI states, validation, error states và demo flows cho frontend của hệ thống **PharmaAssist AI Intelligence**.

Tài liệu này nhằm:

1. Xác định danh sách màn hình chính thức.
2. Xác định màn hình theo role: Admin, Staff, Warehouse.
3. Xác định màn hình theo module.
4. Chuẩn hóa layout, navigation và role-based visibility.
5. Mô tả behavior của từng màn hình.
6. Mô tả validation tại UI level.
7. Mô tả loading/empty/error states.
8. Mô tả critical flows cần demo.
9. Đảm bảo UI bám đúng baseline nghiệp vụ và kỹ thuật.
10. Làm input cho frontend tasks, Jira stories, E2E tests và demo script.

Tài liệu này **không** viết backend logic chi tiết, không viết API request/response đầy đủ, không viết database schema, không viết AI prompt chi tiết, không viết Neo4j schema và không viết test case đầy đủ.

---

## 2. UI/UX Principles

### 2.1. Enterprise internal web app

PharmaAssist AI Intelligence là hệ thống web nội bộ cho nhà thuốc, nên UI cần:

1. Rõ ràng.
2. Dễ thao tác.
3. Ít gây nhầm lẫn.
4. Ưu tiên tính an toàn.
5. Ưu tiên traceability.
6. Phù hợp demo học thuật.
7. Không quá màu mè.
8. Không che mất thông tin nghiệp vụ quan trọng.

### 2.2. Safety-first UX

Các nghiệp vụ có rủi ro cao phải có UI rõ ràng:

1. HIGH interaction alert không được hiển thị như thông báo bình thường.
2. HIGH alert phải yêu cầu acknowledgement.
3. HIGH alert phải yêu cầu consultation note.
4. Checkout phải bị block nếu HIGH alert chưa xử lý.
5. Checkout phải hiển thị lỗi rõ nếu stock không đủ.
6. AI output phải có disclaimer.
7. AI draft không tự động lưu thành official consultation note.
8. Graph-RAG stale/fallback phải có indicator.

### 2.3. Role-aware UX

UI phải thay đổi theo quyền của user.

Frontend có thể ẩn menu/action theo permission, nhưng backend vẫn là authority cuối cùng.

Quy tắc quan trọng:

1. Admin thấy các module quản trị.
2. Staff tập trung vào POS, Order, Checkout, AI support.
3. Warehouse tập trung vào Supplier, Inventory, Stock Import, Inventory Adjustment.
4. Staff không thấy general low-stock/near-expiry dashboard widgets.
5. Staff chỉ thấy sale-relevant stock trong POS.
6. MedicineBatch không là top-level sidebar menu.
7. Warehouse không thấy POS, Checkout, Payment, Invoice, InteractionAlert, Graph-RAG trong MVP.
8. Customer không phải authenticated user trong MVP.

### 2.4. Backend validation always expected

UI validation chỉ để cải thiện trải nghiệm.

Mọi rule quan trọng phải được backend kiểm tra:

1. Permission.
2. Ownership.
3. Order status.
4. Medicine active.
5. Stock availability.
6. FEFO.
7. HIGH alert ack/note.
8. Payment.
9. Invoice.
10. AI guardrail.
11. Graph freshness.

### 2.5. Preserve user work

Các flow quan trọng không được làm mất dữ liệu người dùng khi validation fail.

Đặc biệt:

1. Checkout validation fail phải giữ Draft Order.
2. Payment fail không làm mất order.
3. HIGH alert chưa xử lý phải đưa user về đúng alert cần xử lý.
4. Stock insufficient phải chỉ rõ item thiếu stock.
5. Stock Import confirm fail phải giữ Draft Import.
6. Inventory Adjustment confirm fail phải giữ form và lỗi.

### 2.6. Explicit state visibility

UI phải hiển thị trạng thái rõ:

1. Order: DRAFT / PAID / CANCELLED.
2. Stock Import: DRAFT / CONFIRMED / CANCELLED.
3. Inventory Adjustment: DRAFT / CONFIRMED / CANCELLED.
4. InteractionAlert: resolved/unresolved/inactive.
5. Payment: SUCCESS / FAILED.
6. Graph freshness: fresh/stale/fallback.
7. AI provider: Google AI / MockAI fallback nếu cần.

---

## 3. Design Language

### 3.1. Visual style

Phong cách đề xuất:

1. Enterprise web app.
2. Clean dashboard.
3. Card-based layout.
4. High readability.
5. Neutral background.
6. Clear primary action.
7. Consistent table/form design.
8. Warning/error states nổi bật.

### 3.2. Color semantics

| Semantic | Usage                                              |
| -------- | -------------------------------------------------- |
| Primary  | Main CTA, selected menu, main action               |
| Neutral  | Background, card, border                           |
| Success  | Checkout success, confirmed status                 |
| Warning  | Medium alert, near-expiry, validation warning      |
| Danger   | HIGH alert, stock insufficient, destructive action |
| Info     | AI disclaimer, graph freshness info                |
| Disabled | Unauthorized or inactive action                    |

### 3.3. Status badge rules

Status nên dùng badge rõ ràng.

Examples:

| Status                 | Badge text         |
| ---------------------- | ------------------ |
| Order DRAFT            | Nháp               |
| Order PAID             | Đã thanh toán      |
| Order CANCELLED        | Đã hủy             |
| Stock Import DRAFT     | Phiếu nhập nháp    |
| Stock Import CONFIRMED | Đã xác nhận        |
| Adjustment CONFIRMED   | Đã điều chỉnh      |
| LOW alert              | Thấp               |
| MEDIUM alert           | Trung bình         |
| HIGH alert             | Cao                |
| Graph fresh            | Graph mới          |
| Graph fallback         | Đang dùng fallback |
| AI fallback            | MockAI fallback    |

### 3.4. Typography

Recommended:

1. Font: Inter hoặc Manrope.
2. Page title rõ.
3. Section title rõ.
4. Table text dễ đọc.
5. Warning text không quá nhỏ.
6. Form error đặt gần input.

### 3.5. Components

Common components:

1. App Shell.
2. Sidebar.
3. Topbar.
4. Breadcrumb.
5. Page Header.
6. Data Table.
7. Filter Bar.
8. Search Input.
9. Detail Card.
10. Form Section.
11. Status Badge.
12. Alert Banner.
13. Confirmation Dialog.
14. Drawer/Panel.
15. Full-height Checkout Panel.
16. AI Copilot Panel.
17. Graph-RAG Result Card.
18. Empty State.
19. Loading Skeleton.
20. Error State.

---

## 4. Role-based Navigation

### 4.1. Official roles

MVP roles:

1. Admin.
2. Staff.
3. Warehouse.

No authenticated Customer role in MVP.

### 4.2. Admin navigation

Admin sidebar should include:

1. Dashboard.
2. POS / Sales.
3. Orders.
4. Medicines.
5. Active Ingredients.
6. Suppliers.
7. Inventory.
8. Interaction Rules.
9. Interaction Alert History.
10. Reports.
11. AI Audit Log.
12. Graph-RAG / Graph Explorer.
13. System Settings.
14. User Management.

Optional/Should-have:

1. System Audit Log.
2. Graph Sync Status.
3. Prompt Settings.
4. AI Provider Settings.

### 4.3. Staff navigation

Staff sidebar should include:

1. POS.
2. My Orders.
3. AI Copilot, if separate from POS.
4. Graph-RAG / Graph Explorer, only if permission granted.
5. Profile.

Staff should **not** see:

1. User Management.
2. Supplier Management.
3. Stock Import.
4. Inventory Adjustment.
5. General Inventory Dashboard.
6. Low-stock/near-expiry dashboard widgets.
7. Interaction Rule Management.
8. InteractionAlert History all-system.
9. System Settings.
10. AI Audit Log.
11. Payment management as standalone module.
12. Invoice management all-system.
13. Warehouse operational reports.

### 4.4. Warehouse navigation

Warehouse sidebar should include:

1. Dashboard.
2. Suppliers.
3. Inventory Summary.
4. Stock Import.
5. Inventory Adjustment.
6. Inventory Report.
7. Profile.

Warehouse should **not** see:

1. POS.
2. Checkout.
3. Orders/Sales.
4. Payment.
5. Invoice.
6. Interaction Alerts.
7. Interaction Rule Management.
8. AI Copilot for POS.
9. Graph Explorer / Graph-RAG in MVP.
10. User Management.
11. System Settings.

### 4.5. MedicineBatch navigation rule

MedicineBatch must **not** be a top-level sidebar menu.

MedicineBatch is accessed through:

1. Inventory Summary.
2. Medicine Inventory Detail.
3. Batch Detail page.
4. Stock Import detail after confirmation.
5. Inventory Adjustment detail.

### 4.6. Route guard behavior

If user opens unauthorized route directly:

1. Show Access Denied page.
2. Message should be clear.
3. Offer navigation back to allowed dashboard.
4. Do not expose hidden data.
5. Backend must also return 403.

---

## 5. Layout Structure

### 5.1. App shell

Common authenticated layout:

1. Sidebar.
2. Topbar.
3. Main content area.
4. Breadcrumb.
5. Page header.
6. Global loading/error boundary.
7. Toast notification area.

### 5.2. Sidebar

Sidebar should show:

1. Logo/project name.
2. Menu groups.
3. Active route.
4. Role-aware items.
5. Collapsible if needed.

Menu grouping example:

1. Sales.
2. Inventory.
3. Medicine Data.
4. AI & Graph.
5. Reports.
6. Administration.

### 5.3. Topbar

Topbar should show:

1. Current user name.
2. Role badges or effective role summary.
3. Profile menu.
4. Logout.
5. Optional environment badge: Local/Demo.
6. Optional notification icon if Should-have.

### 5.4. Page header

Each page should include:

1. Page title.
2. Short description.
3. Primary action button if allowed.
4. Status/filter summary if needed.
5. Breadcrumb.

### 5.5. Table layout

Tables should support:

1. Search.
2. Filter.
3. Pagination.
4. Sort if backend supports.
5. Row actions.
6. Empty state.
7. Loading skeleton.
8. Error state.

### 5.6. Form layout

Forms should support:

1. Field labels.
2. Required indicators.
3. Inline validation.
4. Section grouping.
5. Submit/cancel actions.
6. Disabled state while submitting.
7. Success/error toast.
8. Confirmation step for irreversible actions.

### 5.7. POS layout

POS should use an efficient workspace layout:

1. Medicine search/list on left or center.
2. Draft Order panel on right.
3. InteractionAlert panel visible when alerts exist.
4. AI Copilot panel expandable.
5. Checkout CTA prominent but blocked when required conditions fail.

### 5.8. Checkout layout

Checkout must use:

1. Dedicated route, or
2. Full-height dedicated panel.

Checkout must **not** be a small modal.

Checkout should show:

1. Order summary.
2. Item list.
3. Stock validation status.
4. HIGH alert readiness.
5. Payment section.
6. Final total.
7. Submit button.
8. Error recovery path.

---

## 6. Screen List by Role

### 6.1. Admin screen list

| Screen                       |         MVP | Notes                                      |
| ---------------------------- | ----------: | ------------------------------------------ |
| Login                        |         Yes | Supabase Auth                              |
| First-login Password Change  |         Yes | For new staff demo, if Admin also affected |
| Admin Dashboard              |         Yes | Summary/navigation                         |
| User Management              |         Yes | Create/deactivate/assign roles             |
| Role/Permission View         |         Yes | Read matrix; edit Should-have              |
| Medicine List                |         Yes | Admin manage                               |
| Medicine Create/Edit         |         Yes | Includes ingredient mapping component      |
| ActiveIngredient List        |         Yes | Dedicated Admin screen                     |
| ActiveIngredient Create/Edit |         Yes | Curated ingredients                        |
| Supplier Management          |         Yes | Admin can deactivate                       |
| Inventory Summary            |         Yes | Read all inventory                         |
| Batch Detail                 |         Yes | Access under Inventory                     |
| Stock Import                 |         Yes | Admin can perform                          |
| Inventory Adjustment         |         Yes | Admin can perform                          |
| POS Draft Order              |         Yes | Admin can do Staff sales ops               |
| Checkout                     |         Yes | Admin can checkout all                     |
| Order History                |         Yes | View all                                   |
| Order Detail                 |         Yes | View all                                   |
| Invoice View                 |         Yes | View all                                   |
| Interaction Rule Management  |         Yes | Admin manage rules                         |
| InteractionAlert History     |         Yes | Dedicated Admin screen                     |
| Reports                      |         Yes | Revenue, Top Medicines, Inventory          |
| System Settings              |         Yes | Near-expiry threshold                      |
| AI Copilot Panel             |         Yes | In POS/alerts                              |
| AI Audit Log                 |         Yes | MVP if AI audit UI included                |
| Graph Explorer / Graph-RAG   |         Yes | Read-only/demo graph                       |
| Graph Sync Status            | Should-have | Backend sync still MVP                     |
| System Audit Log             | Should-have | Backend audit mandatory                    |

### 6.2. Staff screen list

| Screen                        |                       MVP | Notes                        |
| ----------------------------- | ------------------------: | ---------------------------- |
| Login                         |                       Yes | Supabase Auth                |
| First-login Password Change   |                       Yes | New-staff demo               |
| Staff Dashboard / POS Landing |                       Yes | No general inventory widgets |
| POS Draft Order               |                       Yes | Core Staff screen            |
| Interaction Alert Panel       |                       Yes | Own orders only              |
| AI Copilot Panel              |                       Yes | Own order/alert context      |
| Checkout Route/Panel          |                       Yes | Own Draft Orders             |
| My Order History              |                       Yes | Own orders                   |
| My Order Detail               |                       Yes | Own orders                   |
| Invoice View                  |                       Yes | Own order invoices           |
| Graph-RAG / Graph Explorer    | MVP if permission granted | Read-only, no raw Cypher     |
| Profile                       |                       Yes | Self profile                 |

Staff should not see:

1. Stock Import.
2. Inventory Adjustment.
3. Supplier Management.
4. General Inventory Dashboard.
5. Low-stock/near-expiry dashboard widgets.
6. InteractionAlert History all-system.
7. DrugInteraction Rule Management.
8. System Settings.
9. AI Audit Log.
10. User Management.

### 6.3. Warehouse screen list

| Screen                                          | MVP | Notes                         |
| ----------------------------------------------- | --: | ----------------------------- |
| Login                                           | Yes | Supabase Auth                 |
| Warehouse Dashboard                             | Yes | Inventory operational summary |
| Supplier List/Create/Edit                       | Yes | No deactivate                 |
| Inventory Summary                               | Yes | Batch-based                   |
| Batch Detail                                    | Yes | Under Inventory               |
| Stock Import List/Create/Detail/Confirm         | Yes | Core Warehouse                |
| Inventory Adjustment List/Create/Detail/Confirm | Yes | Core Warehouse                |
| Inventory Report                                | Yes | Operational report            |
| Profile                                         | Yes | Self profile                  |

Warehouse should not see:

1. POS.
2. Checkout.
3. Payment.
4. Invoice.
5. InteractionAlert.
6. AI Copilot for POS.
7. Graph-RAG/Graph Explorer in MVP.
8. User Management.
9. System Settings.

---

## 7. Screen List by Module

### 7.1. Login

1. Login screen.
2. Session expired state.
3. Invalid login state.
4. Access denied after login if no profile/permission.

### 7.2. First-login flow

1. First-login Password Change screen.
2. Password update success state.
3. Password update fail state.
4. Redirect to app after completion.

### 7.3. Dashboard

1. Admin Dashboard.
2. Staff POS Landing.
3. Warehouse Dashboard.

### 7.4. User/Role/Permission

1. User List.
2. User Create.
3. User Detail.
4. Role Assignment panel.
5. Permission Matrix read-only.

### 7.5. Medicine

1. Medicine List.
2. Medicine Create.
3. Medicine Edit.
4. Medicine Detail.
5. Medicine ingredient mapping component.

### 7.6. ActiveIngredient

1. ActiveIngredient List.
2. ActiveIngredient Create.
3. ActiveIngredient Edit.
4. ActiveIngredient Detail.

### 7.7. Supplier

1. Supplier List.
2. Supplier Create.
3. Supplier Edit.
4. Supplier Detail.
5. Deactivate Supplier confirmation for Admin only.

### 7.8. Inventory

1. Inventory Summary.
2. Medicine Inventory Detail.
3. Batch Detail.
4. Low-stock view for Admin/Warehouse.
5. Near-expiry view for Admin/Warehouse.
6. Expired batch view for Admin/Warehouse.

### 7.9. Stock Import

1. Stock Import List.
2. Stock Import Create.
3. Stock Import Detail.
4. Stock Import Draft Edit.
5. Stock Import Confirm state.
6. Stock Import Cancel state.

### 7.10. Inventory Adjustment

1. Inventory Adjustment List.
2. Inventory Adjustment Create.
3. Inventory Adjustment Detail.
4. Inventory Adjustment Confirm state.
5. Inventory Adjustment Cancel state.

### 7.11. POS Draft Order

1. POS workspace.
2. Medicine search.
3. Draft order cart.
4. Item quantity editor.
5. Sale availability indicator.
6. Draft order save state.
7. Draft order cancel state.

### 7.12. Interaction Alert Modal/Panel

Preferred: panel/card inside POS or Order Detail.

Screens/components:

1. Alert list panel.
2. Alert detail expanded card.
3. HIGH acknowledgement section.
4. HIGH consultation note section.
5. AI draft note helper.
6. Resolved status indicator.

### 7.13. AI Copilot Panel

1. AI explanation panel.
2. Note draft panel.
3. Safe refusal state.
4. Provider fallback indicator.
5. User confirmation control.

### 7.14. Checkout Route/Panel

1. Checkout summary.
2. Alert readiness section.
3. Payment section.
4. FEFO allocation result after success.
5. Error recovery state.
6. Checkout success/invoice link.

### 7.15. Order History

1. Order list.
2. Status filters.
3. Date filters.
4. Own/all scope by permission.
5. Row detail link.

### 7.16. Order Detail

1. Order header.
2. Items.
3. InteractionAlerts.
4. Payment summary.
5. Invoice summary.
6. Batch allocations after paid.
7. Audit summary if needed.

### 7.17. Invoice View

1. Invoice header.
2. Customer/walk-in display.
3. Items snapshot.
4. Payment summary.
5. Print/download UI if implemented.
6. Back to order.

### 7.18. InteractionAlert History

Admin screen:

1. Alert history list.
2. Severity filter.
3. Order filter.
4. Date range filter.
5. Alert detail drawer.
6. Acknowledgement/note display.

### 7.19. Reports

1. Revenue Report.
2. Top Medicines Report.
3. Inventory Report.
4. Advanced charts — Should-have.
5. AI narrative report — Should-have.

### 7.20. System Settings

1. Near-expiry threshold setting.
2. Setting update confirmation.
3. Success/error state.
4. AI provider/model setting — Should-have.
5. Prompt setting — Should-have.

### 7.21. Graph Explorer / Graph-RAG

1. Graph Explorer read-only.
2. Medicine graph view.
3. ActiveIngredient graph view.
4. Graph-RAG query screen.
5. Graph-RAG response with provenance.
6. Graph stale/fallback indicator.

### 7.22. AI Audit Log

Admin screen:

1. AI Audit list.
2. Filters: provider, fallback, guardrail status, action type.
3. AI Audit detail.
4. No raw PII display.

---

## 8. Screen Specification Template

Mỗi screen nên được viết theo template sau:

| Field                | Nội dung                    |
| -------------------- | --------------------------- |
| Screen name          | Tên màn hình                |
| Route                | Đường dẫn frontend đề xuất  |
| Purpose              | Mục đích                    |
| Users/Roles          | Role được phép              |
| Entry point          | Người dùng vào từ đâu       |
| Layout sections      | Các vùng UI chính           |
| Data displayed       | Dữ liệu hiển thị            |
| Actions              | Hành động người dùng        |
| Validations          | Validation UI level         |
| Error states         | Trạng thái lỗi              |
| Empty states         | Trạng thái rỗng             |
| Loading states       | Trạng thái loading          |
| Permission behavior  | Ẩn/disable/deny theo quyền  |
| Related APIs         | API liên quan               |
| Related requirements | FR/UC liên quan             |
| Demo notes           | Ghi chú demo nếu quan trọng |

---

# 9. Screen Specifications by Module

---

## 9.1. Login Screen

### Screen name

Login

### Route

```text
/login
```

### Purpose

Cho phép user đăng nhập bằng Supabase Auth.

### Users/Roles

1. Admin.
2. Staff.
3. Warehouse.

### Entry point

1. App start.
2. Session expired.
3. User manually logs out.

### Layout sections

1. Logo/project name.
2. Email input.
3. Password input.
4. Login button.
5. Error area.
6. Optional demo account hint if allowed for class demo.

### Data displayed

1. System name: PharmaAssist AI Intelligence.
2. Login form.
3. Optional environment badge: Local/Demo.

### Actions

1. Enter email.
2. Enter password.
3. Submit login.
4. Forgot password — Future/Should-have if needed.

### Validations

1. Email required.
2. Email format.
3. Password required.
4. Disable submit while logging in.

### Error states

| Error                | UI behavior                                         |
| -------------------- | --------------------------------------------------- |
| Invalid credentials  | Show “Email hoặc mật khẩu không đúng.”              |
| Supabase unavailable | Show service unavailable message                    |
| Profile not found    | Show “Tài khoản chưa được cấu hình trong hệ thống.” |
| User inactive        | Show “Tài khoản đã bị vô hiệu hóa.”                 |
| No permission        | Access denied after login                           |

### Empty states

Not applicable.

### Loading states

1. Button loading spinner.
2. Disable inputs while submitting.

### Permission behavior

Login does not require app permission, but app shell after login uses permissions.

### Related APIs

1. Supabase Auth login.
2. `GET /api/v1/auth/me`.

### Related requirements

FR-AUTH, FR-RBAC.

---

## 9.2. First-login Password Change Screen

### Route

```text
/first-login-change-password
```

### Purpose

Bắt user đổi temporary password trong first-login flow.

### Users/Roles

Any authenticated user with `mustChangePassword = true`.

### Entry point

After login if backend profile returns `mustChangePassword = true`.

### Layout sections

1. Instruction card.
2. New password field.
3. Confirm password field.
4. Submit button.
5. Security note.

### Data displayed

1. User email.
2. Password requirement hint if available.

### Actions

1. Enter new password.
2. Confirm password.
3. Submit.
4. Redirect to dashboard after success.

### Validations

1. New password required.
2. Confirm password required.
3. Passwords match.
4. Minimum password rule from Supabase/Auth policy.
5. Disable submit while saving.

### Error states

1. Password update failed.
2. Session expired.
3. Supabase error.
4. Backend complete-first-login failed.

### Permission behavior

User cannot access main app until completed, except allowed endpoints.

### Related APIs

1. Supabase password update.
2. `POST /api/v1/auth/complete-first-login`.

### Related requirements

FR-AUTH.

---

## 9.3. Dashboard Screens

---

### 9.3.1. Admin Dashboard

#### Route

```text
/admin/dashboard
```

#### Purpose

Cung cấp điểm vào nhanh cho Admin.

#### Layout sections

1. Summary cards.
2. Quick actions.
3. Reports preview.
4. Alert summary.
5. System status summary.

#### Data displayed

Recommended MVP:

1. Today revenue.
2. Number of PAID orders.
3. Inventory warning summary.
4. HIGH InteractionAlert count.
5. AI Audit recent activity summary.
6. Graph freshness summary if available.

#### Actions

1. Go to POS.
2. Manage Medicine.
3. Manage Interaction Rules.
4. View Reports.
5. Open Settings.
6. View InteractionAlert History.

#### Error states

1. Report data unavailable.
2. Permission mismatch.
3. Partial dashboard failed.

#### Permission behavior

Admin-only cards should not appear for non-Admin.

---

### 9.3.2. Staff POS Landing

#### Route

```text
/sales/pos
```

or

```text
/staff/dashboard
```

#### Purpose

Staff vào nhanh POS.

#### Layout sections

1. Continue Draft Orders.
2. Start new sale button.
3. My recent orders.
4. No general inventory widgets.

#### Explicit restriction

Staff must **not** see general low-stock or near-expiry dashboard widgets.

Staff may see sale-relevant availability only inside POS.

#### Actions

1. Start new Draft Order.
2. Continue Draft Order.
3. View own recent orders.

---

### 9.3.3. Warehouse Dashboard

#### Route

```text
/warehouse/dashboard
```

#### Purpose

Warehouse xem tình hình tồn kho và thao tác nhập/điều chỉnh.

#### Layout sections

1. Low-stock summary.
2. Near-expiry summary.
3. Expired batch summary.
4. Recent Stock Imports.
5. Recent Inventory Adjustments.
6. Quick actions.

#### Data displayed

1. Low-stock count based on sellable quantity.
2. Near-expiry count based on system threshold.
3. Expired batch count.
4. Pending/Draft imports.
5. Recent confirmed imports.

#### Actions

1. Create Stock Import.
2. Create Inventory Adjustment.
3. View Inventory Summary.
4. View Inventory Report.

---

## 9.4. User/Role/Permission Screens

---

### 9.4.1. User List

#### Route

```text
/admin/users
```

#### Purpose

Admin quản lý user profiles.

#### Users/Roles

Admin.

#### Layout sections

1. Page header.
2. Search/filter.
3. User table.
4. Create user button.

#### Data displayed

1. Full name.
2. Email.
3. Roles.
4. Active status.
5. mustChangePassword status.
6. Created date.

#### Actions

1. Create user.
2. View detail.
3. Update profile.
4. Deactivate user.
5. Assign/remove roles.

#### Validations

1. Search/filter valid.
2. Role selection valid on create/update.

#### Error states

1. User creation Supabase failure.
2. Duplicate email.
3. Permission denied.
4. Cannot deactivate self if rule applies.

#### Empty state

“No users found.”

#### Related APIs

1. `GET /users`
2. `POST /users`
3. `PATCH /users/{id}`
4. `POST /users/{id}/deactivate`
5. `POST /users/{id}/roles`
6. `DELETE /users/{id}/roles/{roleId}`

---

### 9.4.2. Permission Matrix View

#### Route

```text
/admin/roles-permissions
```

#### Purpose

Hiển thị role-permission mapping.

#### Scope

MVP read-only; edit is Should-have.

#### Layout sections

1. Role tabs.
2. Permission matrix.
3. Module grouping.
4. Legend.

#### Actions

1. View permissions.
2. Edit mapping — Should-have only.

#### Permission behavior

Only Admin.

---

## 9.5. Medicine Screens

---

### 9.5.1. Medicine List

#### Route

```text
/admin/medicines
```

#### Purpose

Admin xem và quản lý Medicine.

#### Layout sections

1. Search/filter.
2. Medicine table.
3. Create button.
4. Status filter.

#### Data displayed

1. Medicine name.
2. Unit.
3. Strength.
4. Selling price.
5. Min stock.
6. Active status.
7. ActiveIngredient summary.

#### Actions

1. Create Medicine.
2. Edit Medicine.
3. Deactivate Medicine.
4. View inventory batches through inventory link.
5. Manage ingredient mapping.

#### Validations

1. Search text sanitized.
2. Selling price display must not be empty for active sellable medicine.

#### Error states

1. Cannot load medicines.
2. Permission denied.
3. Deactivate failure.

#### Empty state

“No medicines found.”

#### Related APIs

1. `GET /medicines`
2. `POST /medicines`
3. `PATCH /medicines/{id}`
4. `POST /medicines/{id}/deactivate`

---

### 9.5.2. Medicine Create/Edit

#### Route

```text
/admin/medicines/new
/admin/medicines/{id}/edit
```

#### Purpose

Tạo/cập nhật Medicine.

#### Layout sections

1. Basic information.
2. Pricing.
3. Inventory threshold.
4. ActiveIngredient mapping component.
5. Status section.
6. Save/cancel buttons.

#### Data displayed

1. Name.
2. Unit.
3. Dosage form.
4. Strength text.
5. Selling price.
6. Min stock.
7. ActiveIngredient mappings.

#### Actions

1. Save Medicine.
2. Add/remove ActiveIngredient mapping.
3. Deactivate Medicine.
4. Cancel.

#### Validations

1. Name required.
2. Unit required.
3. Selling price > 0.
4. Min stock >= 0.
5. No duplicate ActiveIngredient mapping.
6. At least one ActiveIngredient recommended for interaction-ready Medicine.

#### Error states

1. Duplicate Medicine code/name if enforced.
2. Invalid price.
3. Mapping save failed.
4. Graph Sync event failure should not block Medicine save if source data committed, but should surface warning/log if relevant.

#### Permission behavior

Admin manage only.

---

## 9.6. ActiveIngredient Screens

---

### 9.6.1. ActiveIngredient List

#### Route

```text
/admin/active-ingredients
```

#### Purpose

Dedicated Admin screen để quản lý curated ActiveIngredients.

#### Layout sections

1. Search/filter.
2. ActiveIngredient table.
3. Create button.

#### Data displayed

1. Name.
2. Description.
3. Active status.
4. Number of mapped medicines.

#### Actions

1. Create.
2. Edit.
3. Deactivate if allowed.
4. View mapped medicines.

#### Validations

1. Name required.
2. Normalized duplicate prevented by backend.

#### Error states

1. Duplicate ingredient.
2. Permission denied.
3. Cannot deactivate if used in active interaction rule unless backend allows with warning.

---

### 9.6.2. ActiveIngredient Create/Edit

#### Route

```text
/admin/active-ingredients/new
/admin/active-ingredients/{id}/edit
```

#### Layout sections

1. Ingredient name.
2. Description.
3. Source/curation note.
4. Status.
5. Save/cancel.

#### Important UX note

UI should indicate that ActiveIngredient must be curated, not blindly imported from scraped strings.

---

## 9.7. Supplier Screens

---

### 9.7.1. Supplier List

#### Route

```text
/suppliers
```

Actual route may be role-grouped:

```text
/admin/suppliers
/warehouse/suppliers
```

#### Purpose

Admin/Warehouse quản lý Supplier.

#### Layout sections

1. Search/filter.
2. Supplier table.
3. Create button.

#### Data displayed

1. Name.
2. Phone.
3. Email.
4. Address.
5. Active status.
6. Last import date if available.

#### Actions

Admin:

1. Create.
2. Update.
3. Deactivate.
4. View detail.

Warehouse:

1. Create.
2. Update.
3. View detail.
4. No deactivate.

#### Validations

1. Name required.
2. Email format if provided.
3. Phone format if enforced.

#### Error states

1. Warehouse tries deactivate: action hidden; direct URL/API returns forbidden.
2. Duplicate supplier if enforced.

---

### 9.7.2. Supplier Detail

#### Route

```text
/suppliers/{id}
```

#### Layout sections

1. Supplier info card.
2. Stock Import history.
3. Actions.

#### Permission behavior

Deactivate button visible only to Admin.

---

## 9.8. Inventory Screens

---

### 9.8.1. Inventory Summary

#### Route

```text
/inventory
```

Role grouped:

```text
/admin/inventory
/warehouse/inventory
```

#### Purpose

Xem tồn kho tổng quan tính từ MedicineBatch.

#### Users/Roles

1. Admin.
2. Warehouse.

Staff cannot access general Inventory Summary.

#### Layout sections

1. Summary cards.
2. Filter/search.
3. Inventory table.
4. Links to Batch Detail.

#### Data displayed

1. Medicine name.
2. Total quantity.
3. Sellable quantity.
4. Expired quantity.
5. Near-expiry quantity.
6. Min stock.
7. Low-stock status.
8. Number of batches.

#### Actions

1. View Medicine inventory detail.
2. View batch list.
3. Create Stock Import.
4. Create Inventory Adjustment.

#### Validations

1. Search/filter validation.
2. `withinDays` positive if used as filter.

#### Error states

1. Cannot load inventory.
2. Permission denied.
3. Settings missing: use default 90 days and show notice if needed.

#### Empty state

“No inventory data.”

#### Related APIs

1. `GET /inventory/summary`
2. `GET /inventory/low-stock`
3. `GET /inventory/near-expiry`
4. `GET /inventory/expired`

---

### 9.8.2. Batch Detail

#### Route

```text
/inventory/batches/{batchId}
```

or

```text
/inventory/medicines/{medicineId}/batches/{batchId}
```

#### Purpose

Xem chi tiết batch/lô thuốc.

#### Important navigation rule

Batch Detail is under Inventory. MedicineBatch is not top-level sidebar menu.

#### Layout sections

1. Batch header.
2. Medicine info.
3. Batch info.
4. Quantity card.
5. Expiry status.
6. Source Stock Import link.
7. Adjustment history.
8. Sales allocation history if allowed.

#### Data displayed

1. Batch number.
2. Expiry date.
3. Quantity received.
4. Quantity remaining.
5. Sellable/expired status.
6. Source import.
7. Related adjustments.
8. Related allocations.

#### Actions

1. Create Inventory Adjustment for this batch.
2. View source Stock Import.
3. View related sales allocation if Admin.

#### Not allowed

1. Direct edit quantity.
2. Direct delete batch.
3. Staff access to operational batch detail.

#### Error states

1. Batch not found.
2. Permission denied.
3. Batch inactive.

---

## 9.9. Stock Import Screens

---

### 9.9.1. Stock Import List

#### Route

```text
/stock-imports
```

Role grouped:

```text
/admin/stock-imports
/warehouse/stock-imports
```

#### Purpose

Xem danh sách phiếu nhập kho.

#### Users/Roles

1. Admin.
2. Warehouse.

#### Layout sections

1. Search/filter.
2. Status tabs.
3. Stock Import table.
4. Create button.

#### Data displayed

1. Import number/id.
2. Supplier.
3. Status.
4. Import date.
5. Created by.
6. Confirmed by/date.
7. Number of lines.

#### Actions

1. Create new Draft.
2. View detail.
3. Continue Draft.
4. Confirm Draft.
5. Cancel Draft.

#### Error states

1. Cannot load imports.
2. Permission denied.

---

### 9.9.2. Stock Import Create/Edit

#### Route

```text
/stock-imports/new
/stock-imports/{id}/edit
```

#### Purpose

Tạo hoặc chỉnh Draft Stock Import.

#### Layout sections

1. Header info.
2. Supplier selector.
3. Import date.
4. Detail lines table.
5. Add line section.
6. Draft actions.
7. Confirm action.

#### Data displayed

For each detail line:

1. Medicine.
2. Batch number.
3. Expiry date.
4. Quantity.
5. Unit cost if used.
6. Validation status.

#### Actions

1. Select Supplier.
2. Add Medicine line.
3. Enter batch number.
4. Enter expiry date.
5. Enter quantity.
6. Save Draft.
7. Confirm.
8. Cancel Draft.

#### Validations

1. Supplier required.
2. Supplier active.
3. Medicine required.
4. Batch number required.
5. Expiry date required.
6. Quantity > 0.
7. No empty detail list on confirm.
8. Duplicate batch line warning if same medicine/batch/expiry.
9. Expiry mismatch warning if backend detects existing batch same number different expiry.

#### Error states

| Error             | UI behavior                            |
| ----------------- | -------------------------------------- |
| Expiry mismatch   | Show blocking error near affected line |
| Missing batch     | Inline error                           |
| Quantity invalid  | Inline error                           |
| Already confirmed | Disable edit; show confirmed state     |
| Confirm failed    | Preserve Draft and show error          |

#### Confirmation UX

Before confirm:

1. Show summary.
2. Warn that confirmed import cannot be edited.
3. Confirm button requires explicit click.

#### Related APIs

1. `POST /stock-imports`
2. `PATCH /stock-imports/{id}`
3. `POST /stock-imports/{id}/details`
4. `PATCH /stock-imports/{id}/details/{detailId}`
5. `DELETE /stock-imports/{id}/details/{detailId}`
6. `POST /stock-imports/{id}/confirm`
7. `POST /stock-imports/{id}/cancel`

---

### 9.9.3. Stock Import Detail

#### Route

```text
/stock-imports/{id}
```

#### Layout sections

1. Status header.
2. Supplier card.
3. Detail lines.
4. Affected batches after confirm.
5. Audit metadata.
6. Actions.

#### State behavior

| Status    | UI behavior                        |
| --------- | ---------------------------------- |
| DRAFT     | Editable, confirm/cancel available |
| CONFIRMED | Read-only, show affected batches   |
| CANCELLED | Read-only, show cancel reason      |

---

## 9.10. Inventory Adjustment Screens

---

### 9.10.1. Inventory Adjustment List

#### Route

```text
/inventory-adjustments
```

#### Purpose

Xem danh sách phiếu điều chỉnh tồn kho.

#### Users/Roles

1. Admin.
2. Warehouse.

#### Layout sections

1. Filter/search.
2. Status tabs.
3. Adjustment table.
4. Create button.

#### Data displayed

1. Adjustment ID.
2. Status.
3. Reason.
4. Created by.
5. Confirmed by.
6. Created/confirmed date.

---

### 9.10.2. Inventory Adjustment Create/Edit

#### Route

```text
/inventory-adjustments/new
/inventory-adjustments/{id}/edit
```

#### Purpose

Tạo phiếu điều chỉnh tồn kho có reason.

#### Layout sections

1. Reason section.
2. Batch selector.
3. Adjustment details.
4. Before/after preview.
5. Confirm action.

#### Data displayed

For each detail:

1. Medicine.
2. Batch number.
3. Expiry date.
4. Current quantity.
5. Quantity change.
6. After quantity preview.

#### Actions

1. Select batch.
2. Enter quantity change.
3. Enter reason.
4. Save Draft.
5. Confirm.
6. Cancel.

#### Validations

1. Reason required.
2. At least one detail required.
3. Batch required.
4. Quantity change cannot be 0.
5. After quantity cannot be negative.
6. Confirm disabled until valid.

#### Error states

1. Missing reason.
2. Negative stock result.
3. Batch not found.
4. Already confirmed.
5. Permission denied.

#### Confirmation UX

Show warning:

“Sau khi xác nhận, số lượng batch sẽ được cập nhật và phiếu điều chỉnh không thể chỉnh sửa trực tiếp.”

---

## 9.11. POS Draft Order Screen

### Route

```text
/sales/pos
```

### Purpose

Màn hình chính để Staff/Admin tạo Draft Order, thêm thuốc, kiểm tra interaction và chuyển sang checkout.

### Users/Roles

1. Staff.
2. Admin.

### Layout sections

1. Medicine search/list.
2. Sale availability display.
3. Draft Order panel.
4. Order items table.
5. Interaction Alert panel.
6. AI Copilot panel.
7. Checkout CTA.
8. Draft actions.

### Data displayed

Medicine search:

1. Medicine name.
2. Strength/unit.
3. Selling price.
4. Sellable stock.
5. Sale availability warning.

Draft Order:

1. Order ID/number.
2. Status DRAFT.
3. Items.
4. Quantity.
5. Unit price.
6. Line total.
7. Total.
8. Alert summary.

### Actions

1. Create Draft Order.
2. Search Medicine.
3. Add Medicine.
4. Update quantity.
5. Remove item.
6. View InteractionAlerts.
7. Acknowledge HIGH alert.
8. Add consultation note.
9. Request AI explanation.
10. Generate AI note draft.
11. Cancel Draft.
12. Go to Checkout.

### Validations

1. Quantity > 0.
2. Medicine active.
3. Order must be DRAFT for edits.
4. Checkout disabled/blocked if no items.
5. Checkout blocked if active HIGH alert unresolved.
6. UI warns if sellable stock appears insufficient, but backend validates again.

### Error states

| Error                     | UI behavior                                  |
| ------------------------- | -------------------------------------------- |
| Medicine inactive         | Show item-level error                        |
| Stock unavailable         | Show warning/error                           |
| Order not DRAFT           | Disable edits                                |
| Ownership denied          | Access denied                                |
| Interaction check failed  | Show retryable error; order remains editable |
| HIGH unresolved           | Checkout button shows requirement            |
| Backend validation failed | Preserve Draft Order                         |

### Empty states

1. No Draft Order: show “Tạo đơn bán mới”.
2. No search result: show “Không tìm thấy thuốc”.
3. No items: show empty cart state.
4. No alerts: show “Chưa có cảnh báo tương tác”.

### Loading states

1. Medicine search loading.
2. Add item loading.
3. Interaction check loading.
4. Draft save loading.

### Permission behavior

Staff:

1. Own Draft Orders only.
2. Own Order interaction alerts only.

Admin:

1. Can operate all sales functions.

### Related APIs

1. `POST /orders`
2. `GET /medicines`
3. `GET /inventory/sales-availability`
4. `POST /orders/{id}/items`
5. `PATCH /orders/{id}/items/{itemId}`
6. `DELETE /orders/{id}/items/{itemId}`
7. `GET /orders/{id}/interaction-alerts`
8. `POST /orders/{id}/interactions/check`

### Related requirements

FR-POS, FR-DRG, FR-ALT, FR-AIC.

---

## 9.12. Interaction Alert Panel

### Component location

1. POS screen.
2. Order Detail.
3. Checkout readiness section.

### Purpose

Hiển thị và xử lý InteractionAlerts của order.

### Users/Roles

1. Staff for own order.
2. Admin for all order.
3. Warehouse no access.

### Layout sections

1. Alert summary.
2. Alert list.
3. Severity badge.
4. Alert details.
5. Required action area.
6. AI help area.
7. Resolved indicator.

### Data displayed

1. Severity.
2. Medicines/ingredients involved if available.
3. Description snapshot.
4. Recommendation snapshot.
5. First/last displayed time.
6. Acknowledgement status.
7. Consultation note status.
8. Active/inactive status.

### Actions

For HIGH alerts:

1. Acknowledge.
2. Add consultation note.
3. Generate AI note draft.
4. Confirm AI draft as note.
5. Edit note if allowed before checkout.

For LOW/MEDIUM:

1. View detail.
2. Continue.

### Validations

1. HIGH acknowledgement required.
2. HIGH consultation note required.
3. Consultation note cannot be empty.
4. User must confirm AI draft before save.

### Error states

1. Alert not found.
2. Alert inactive.
3. Ownership denied.
4. Note save failed.
5. AI draft blocked by guardrail.

### Empty state

“No interaction alerts.”

### Critical UX rules

1. HIGH alert must be visually prominent.
2. HIGH alert cannot be hidden behind a small dismissible toast.
3. “Acknowledge” must not automatically create consultation note.
4. AI draft must not auto-save.
5. Checkout readiness must clearly show unresolved HIGH alerts.

---

## 9.13. AI Copilot Panel

### Component location

1. POS.
2. Interaction Alert panel.
3. Graph-RAG if integrated.

### Purpose

Hỗ trợ giải thích interaction alert và tạo consultation note draft an toàn.

### Users/Roles

1. Staff.
2. Admin.

Warehouse no AI Copilot in MVP.

### Layout sections

1. AI disclaimer.
2. Context summary.
3. Action buttons.
4. Response area.
5. Guardrail/fallback indicator.
6. Confirm/use draft button if note draft.

### Data displayed

1. Alert context.
2. AI response.
3. Provider used.
4. Fallback status if applicable.
5. Guardrail refusal if blocked.
6. Disclaimer.

### Actions

1. Generate explanation.
2. Generate note draft.
3. Copy draft.
4. Confirm draft as consultation note.
5. Regenerate if allowed.

### Validations

1. Alert context required.
2. Prompt input must be within safe scope.
3. No diagnosis/prescribing/dosage request.
4. User confirmation required before official note save.

### Error states

| Error                    | UI behavior                            |
| ------------------------ | -------------------------------------- |
| Input guardrail blocked  | Show safe refusal                      |
| Output guardrail blocked | Show safe refusal                      |
| Google AI unavailable    | Show fallback indicator if MockAI used |
| No fallback available    | Show AI unavailable                    |
| Ownership denied         | Hide/deny AI action                    |

### Related APIs

1. `POST /ai/interaction-alerts/{alertId}/explain`
2. `POST /ai/interaction-alerts/{alertId}/note-draft`
3. `POST /interaction-alerts/{id}/consultation-note`

---

## 9.14. Checkout Route/Panel

### Route

```text
/sales/orders/{orderId}/checkout
```

or full-height panel route equivalent.

### Purpose

Hoàn tất Draft Order bằng checkout transaction.

### Users/Roles

1. Staff for own Draft Order.
2. Admin for any Draft Order.

### Layout sections

1. Order summary.
2. Item list.
3. Interaction readiness.
4. Stock validation readiness.
5. Payment method.
6. Total amount.
7. Submit checkout.
8. Error recovery.
9. Success result.

### Data displayed

1. Order number.
2. Status DRAFT.
3. Items and quantities.
4. Total amount.
5. HIGH alert status.
6. Payment method options.
7. Cash amount tendered.
8. Change amount preview.
9. Bank transaction reference for simulated bank transfer.

### Actions

1. Choose payment method.
2. Enter amount tendered for cash.
3. Enter transaction reference for bank transfer simulation.
4. Submit checkout.
5. Return to Draft Order on validation fail.
6. View invoice after success.

### Validations

1. Order must be DRAFT.
2. Order must have items.
3. HIGH alerts resolved.
4. Cash amount tendered >= total.
5. Bank transfer transaction reference required.
6. Idempotency key generated by frontend.
7. Submit disabled while processing.

### Error states

| Error                 | UI behavior                              |
| --------------------- | ---------------------------------------- |
| HIGH alert unresolved | Show blocking section with link to alert |
| Stock insufficient    | Show item-level stock errors             |
| Order not DRAFT       | Redirect/show invalid state              |
| Payment failed        | Keep Draft Order, show retry option      |
| Idempotency mismatch  | Show safe retry/error                    |
| Transaction rollback  | Show failure, preserve Draft             |

### Empty states

Not applicable; empty order cannot checkout.

### Loading states

1. Preparing checkout.
2. Submitting checkout.
3. Payment processing.
4. Invoice generation.

### Success state

After success:

1. Show “Thanh toán thành công”.
2. Show Order status PAID.
3. Show Payment summary.
4. Show Invoice link.
5. Show batch allocation summary if useful for demo.

### Related APIs

1. `POST /checkout`
2. `GET /orders/{id}`
3. `GET /orders/{id}/interaction-alerts`
4. `GET /orders/{id}/invoice`

---

## 9.15. Order History Screen

### Route

```text
/sales/orders
```

or

```text
/my-orders
```

### Purpose

Xem danh sách orders theo scope.

### Users/Roles

1. Staff: own orders.
2. Admin: all orders.
3. Warehouse: no access.

### Layout sections

1. Search/filter.
2. Status tabs.
3. Date filters.
4. Order table.

### Data displayed

1. Order number.
2. Status.
3. Total.
4. Created by.
5. Processed by.
6. Created date.
7. Paid date.
8. Alert indicator.
9. Invoice indicator.

### Actions

1. View detail.
2. Continue Draft.
3. Cancel Draft if allowed.
4. Checkout Draft if allowed.
5. View invoice if PAID.

### Error states

1. Ownership denied.
2. Cannot load orders.
3. Unauthorized route.

---

## 9.16. Order Detail Screen

### Route

```text
/sales/orders/{id}
```

### Purpose

Xem chi tiết Order.

### Layout sections

1. Order header.
2. Status badge.
3. Items table.
4. InteractionAlerts section.
5. Payment section.
6. Invoice section.
7. Batch allocations section.
8. Actions.

### Data displayed

1. Order number.
2. Status.
3. Customer/walk-in info.
4. Items.
5. Totals.
6. Active/inactive InteractionAlerts.
7. HIGH alert acknowledgement/note status.
8. Payment attempts.
9. Invoice.
10. Batch allocation for PAID order.

### Actions

If DRAFT:

1. Continue editing.
2. Checkout.
3. Cancel.

If PAID:

1. View invoice.
2. View allocations.
3. No edit/cancel.

If CANCELLED:

1. View only.

### Permission behavior

1. Staff own only.
2. Admin all.
3. Warehouse no access.

---

## 9.17. Invoice View

### Route

```text
/sales/invoices/{id}
```

or

```text
/sales/orders/{orderId}/invoice
```

### Purpose

Hiển thị invoice sau successful checkout.

### Users/Roles

1. Staff own invoice.
2. Admin all invoices.

### Layout sections

1. Invoice header.
2. Pharmacy/system info.
3. Customer/walk-in info.
4. Item table.
5. Payment summary.
6. Total summary.
7. Back to order.
8. Print/download button if implemented.

### Data displayed

1. Invoice number.
2. Issued date.
3. Order number.
4. Payment method.
5. Items snapshot.
6. Quantity.
7. Unit price.
8. Line total.
9. Total amount.
10. Cash tendered/change if cash.

### Actions

1. Print.
2. Download PDF — Should-have.
3. Back to Order Detail.

### Not allowed

1. Manual invoice creation.
2. Invoice edit after issued.
3. Invoice creation outside checkout.

---

## 9.18. InteractionAlert History Screen

### Route

```text
/admin/interaction-alerts
```

### Purpose

Admin xem lịch sử InteractionAlerts toàn hệ thống.

### Users/Roles

Admin only.

### Layout sections

1. Filter bar.
2. Alert history table.
3. Alert detail drawer.
4. Export button — Future/Should-have.

### Filters

1. Severity.
2. Order number.
3. Medicine.
4. Date range.
5. Resolved/unresolved.
6. Acknowledged status.

### Data displayed

1. Alert ID.
2. Order number.
3. Severity.
4. Description snapshot.
5. Active/inactive.
6. Acknowledgement.
7. Consultation note status.
8. First displayed.
9. Last displayed.

### Actions

1. View detail.
2. Navigate to Order Detail.
3. View note.

### Not allowed

1. Warehouse access.
2. Staff all-history access.

---

## 9.19. Reports Screens

---

### 9.19.1. Revenue Report

#### Route

```text
/reports/revenue
```

#### Users/Roles

Admin.

#### Data displayed

1. Revenue total.
2. Paid order count.
3. Date range.
4. Revenue by day if chart/table.
5. Exclusion note: DRAFT/CANCELLED/FAILED excluded.

#### Actions

1. Filter by date.
2. View source orders.
3. Export — Should-have.

---

### 9.19.2. Top Medicines Report

#### Route

```text
/reports/top-medicines
```

#### Users/Roles

Admin.

#### Data displayed

1. Medicine name.
2. Quantity sold.
3. Revenue.
4. Date range.
5. Rank.

---

### 9.19.3. Inventory Report

#### Route

```text
/reports/inventory
```

#### Users/Roles

1. Admin.
2. Warehouse.

#### Data displayed

1. Medicine.
2. Sellable quantity.
3. Expired quantity.
4. Near-expiry quantity.
5. Low-stock status.
6. Batch count.

#### Important rule

Low-stock is calculated from sellable quantity only, excluding expired batches.

---

## 9.20. System Settings Screen

### Route

```text
/admin/settings
```

### Purpose

Admin cấu hình system settings MVP.

### MVP setting

1. Near-expiry threshold.
2. Default: 90 days.

### Layout sections

1. Settings list.
2. Near-expiry threshold form.
3. Save button.
4. Audit note.

### Validations

1. Threshold required.
2. Must be positive integer.
3. Recommended allowed range if defined, for example 1–3650.
4. Show confirmation before save if value changes significantly.

### Error states

1. Invalid value.
2. Permission denied.
3. Save failed.

### Related APIs

1. `GET /settings`
2. `PATCH /settings/near-expiry-threshold`

### Should-have settings

1. AI Provider Config.
2. Prompt Editing.
3. Graph Sync retry settings.

These should not be forced into MVP.

---

## 9.21. Graph Explorer / Graph-RAG Screens

---

### 9.21.1. Graph Explorer

#### Route

```text
/graph/explorer
```

#### Purpose

Hiển thị graph read-only cho Medicine/ActiveIngredient/Interaction.

#### Users/Roles

1. Admin.
2. Staff if permission granted.
3. Warehouse no access in MVP.

#### Layout sections

1. Search entity.
2. Graph visualization.
3. Node detail panel.
4. Relationship detail panel.
5. Freshness indicator.

#### Data displayed

1. Medicine nodes.
2. ActiveIngredient nodes.
3. CONTAINS relationships.
4. INTERACTS_WITH relationships.
5. Rule provenance.

#### Not allowed

1. Raw Cypher input.
2. Edit graph from UI.
3. Warehouse access.

---

### 9.21.2. Graph-RAG Query

#### Route

```text
/graph/rag
```

#### Purpose

Cho phép hỏi graph-related questions qua Graph-RAG read-only.

#### Layout sections

1. Question input.
2. Context selector if needed.
3. Submit button.
4. Answer card.
5. Provenance section.
6. Freshness/fallback indicator.

#### Data displayed

1. Answer.
2. `graphUsed`.
3. Freshness status.
4. Fallback indicator.
5. Provenance.
6. Safe error if no fallback.

#### Error states

| Error                     | UI behavior                                   |
| ------------------------- | --------------------------------------------- |
| Graph stale with fallback | Show answer + “Đang dùng PostgreSQL fallback” |
| Graph stale no fallback   | Show safe error                               |
| Neo4j unavailable         | Show fallback/safe error                      |
| Raw Cypher attempt        | Block and explain                             |
| Permission denied         | Access denied                                 |

---

## 9.22. AI Audit Log Screen

### Route

```text
/admin/ai-audit-logs
```

### Purpose

Admin xem AI Audit Log.

### Users/Roles

Admin.

### Layout sections

1. Filter bar.
2. Audit table.
3. Detail drawer.
4. Guardrail/fallback badges.

### Filters

1. Action type.
2. Provider used.
3. Fallback used.
4. Input guardrail status.
5. Output guardrail status.
6. Date range.

### Data displayed

1. Timestamp.
2. User.
3. Action type.
4. Provider requested.
5. Provider used.
6. Fallback status.
7. Guardrail statuses.
8. Prompt version.
9. Latency.
10. Error code if any.
11. Minimized summaries.

### Not displayed

1. Raw PII.
2. Full sensitive medical context.
3. API keys/secrets.
4. Full raw prompt if unsafe.

---

# 10. Critical Flows

---

## 10.1. POS to Checkout Flow

### Flow summary

```text
Staff/Admin opens POS
→ Create Draft Order
→ Search Medicine
→ Add Medicine
→ System checks interactions
→ InteractionAlerts displayed
→ Resolve HIGH alerts if any
→ Go to Checkout route/panel
→ Enter payment
→ Submit Checkout
→ Backend applies FEFO/payment/invoice transaction
→ Show success and invoice
```

### UI requirements

1. Draft Order remains visible throughout POS.
2. InteractionAlert panel appears when alerts exist.
3. Checkout CTA disabled or shows blocking reason if HIGH unresolved.
4. Checkout must not be small modal.
5. Checkout validation failure returns to preserved Draft Order.
6. Success state links to Invoice View.

### Demo expectation

Demo should show:

1. Adding normal medicine.
2. Adding medicine that triggers HIGH alert.
3. Checkout blocked.
4. Acknowledge/note HIGH alert.
5. Checkout succeeds.
6. Invoice generated.

---

## 10.2. HIGH Alert Handling Flow

### Flow summary

```text
InteractionAlert HIGH appears
→ UI shows HIGH badge and blocking status
→ User clicks alert
→ User reads description/recommendation
→ User acknowledges alert
→ User enters consultation note
→ Optional AI draft generated
→ User confirms note
→ Alert becomes resolved for checkout
```

### UI requirements

1. HIGH must be visually strong.
2. Acknowledge and note are separate.
3. Consultation note required.
4. AI draft cannot auto-save.
5. Resolved indicator appears only when both ack and note exist.
6. Checkout readiness updates immediately after save.

### Error recovery

1. If acknowledgement save fails, keep unresolved.
2. If note save fails, keep note field with unsaved text if possible.
3. If AI blocked, allow manual note.

---

## 10.3. FEFO Checkout Flow

### Flow summary

```text
Checkout submitted
→ Backend validates stock
→ Backend chooses nearest expiry batches first
→ Backend deducts batch quantities
→ Backend creates allocation records
→ UI shows checkout success
→ Order Detail shows batch allocations
```

### UI requirements

1. Before checkout: show sellable stock availability, not exact FEFO allocation unless preview implemented.
2. After checkout: show allocation summary in Order Detail for demo traceability.
3. If stock insufficient, show which item failed.
4. Expired batches must not appear as sellable.

### Demo expectation

Demo dataset should include:

1. Multiple batches for one Medicine.
2. One expired batch excluded.
3. FEFO allocation from nearest expiry first.
4. Allocation visible after checkout.

---

## 10.4. Stock Import Confirm Flow

### Flow summary

```text
Warehouse/Admin creates Draft Import
→ Select Supplier
→ Add Medicine lines with batch/expiry/quantity
→ Save Draft
→ Confirm
→ Backend creates/updates MedicineBatch
→ UI shows affected batches
```

### UI requirements

1. Confirm requires explicit action.
2. Show warning that confirmed import is immutable.
3. Validate required batch/expiry/quantity.
4. Expiry mismatch error must identify affected line.
5. After confirm, form becomes read-only.
6. Link to Batch Detail.

---

## 10.5. Inventory Adjustment Confirm Flow

### Flow summary

```text
Warehouse/Admin creates Adjustment
→ Select MedicineBatch
→ Enter quantity change
→ Enter reason
→ Preview after quantity
→ Confirm
→ Backend updates batch
→ UI shows confirmed state
```

### UI requirements

1. Reason required.
2. After quantity preview required.
3. Negative quantity blocked.
4. Confirmed adjustment read-only.
5. Correction requires new adjustment.

---

## 10.6. Graph-RAG Fallback Indicator Flow

### Flow summary

```text
User asks Graph-RAG
→ Backend checks graph freshness
→ If fresh: use Neo4j
→ If stale/unavailable and fallback exists: use PostgreSQL
→ UI shows graphUsed=false / fallback indicator
→ If no fallback: show safe error
```

### UI requirements

1. Always show freshness/fallback indicator.
2. Do not present stale graph result as certain.
3. Show provenance when graph used.
4. Show safe error for pure graph query without fallback.
5. No raw Cypher input.

---

# 11. MVP / Should-have / Future UI Classification

## 11.1. MVP UI

MVP UI includes:

1. Login.
2. First-login password change.
3. Role-based app shell.
4. Admin Dashboard.
5. Staff POS Landing.
6. Warehouse Dashboard.
7. User Management.
8. Role/Permission read view.
9. Medicine Management.
10. ActiveIngredient Management.
11. Medicine–ActiveIngredient mapping component.
12. Supplier Management.
13. Inventory Summary.
14. Batch Detail.
15. Stock Import.
16. Inventory Adjustment.
17. POS Draft Order.
18. InteractionAlert Panel.
19. AI Copilot Panel.
20. Checkout Route/Panel.
21. Order History.
22. Order Detail.
23. Invoice View.
24. InteractionAlert History.
25. Revenue Report.
26. Top Medicines Report.
27. Inventory Report.
28. System Settings for near-expiry threshold.
29. Graph Explorer / Graph-RAG read-only.
30. AI Audit Log if UI is included for MVP evidence.

## 11.2. Should-have UI

Should-have UI includes:

1. Full Customer Management.
2. Generic System Audit Log UI.
3. Graph Sync Status/retry screen.
4. Admin AI Provider/Model Config UI.
5. Prompt Editing UI.
6. AI-generated Report Narrative UI.
7. Advanced Charts.
8. Notification Center.
9. Reorder Suggestion UI.
10. Export PDF/CSV features if not MVP.

## 11.3. Future / Commercial UI

Future UI includes:

1. Online storefront.
2. Customer portal.
3. Cart.
4. Wishlist.
5. Shipping.
6. Coupon.
7. Product reviews.
8. CMS.
9. Multi-store management.
10. Multi-warehouse management.
11. Stock transfer.
12. Purchase order workflow.
13. Refund/return UI.
14. Credit note UI.
15. Real payment gateway management.
16. Advanced analytics.
17. Forecasting.
18. AI Cache management.
19. DrugGroup taxonomy management.
20. Symptom/Condition graph enrichment.

## 11.4. Out of Scope UI

Out of Scope for current MVP:

1. Custom username/password admin auth screen.
2. Password hash management UI.
3. Aggregate inventory editor.
4. Direct batch quantity edit screen.
5. Medicine-level official interaction screen.
6. `/orders/{id}/pay` payment screen as official completion.
7. Direct invoice creation screen.
8. Staff general inventory dashboard.
9. MedicineBatch top-level sidebar.
10. Checkout small modal.
11. Raw Cypher query UI for Staff.
12. AI diagnosis UI.
13. AI prescribing UI.
14. AI dosage recommendation UI.
15. Demo reset UI exposed outside local.

---

## 12. Accessibility Basics

### 12.1. Keyboard accessibility

UI should support:

1. Keyboard navigation.
2. Visible focus states.
3. Form submission by keyboard where appropriate.
4. Escape/back behavior for panels/dialogs.
5. No keyboard traps.

### 12.2. Color contrast

Important text and warning states must have sufficient contrast.

Do not rely only on color for:

1. HIGH alert.
2. Error state.
3. Required field.
4. Disabled action.

Use text labels/icons.

### 12.3. Form accessibility

Forms should include:

1. Labels.
2. Required indicators.
3. Inline error text.
4. Error summary for long forms.
5. Clear submit state.
6. Screen-reader friendly messages if possible.

### 12.4. Table accessibility

Tables should include:

1. Clear column headers.
2. Row actions with labels.
3. Pagination controls with labels.
4. Empty state text.

### 12.5. Critical action confirmation

Critical actions require clear confirmation:

1. Deactivate user.
2. Deactivate medicine.
3. Deactivate supplier.
4. Confirm Stock Import.
5. Confirm Inventory Adjustment.
6. Cancel Draft Order.
7. Checkout.

---

## 13. Responsive Basics

### 13.1. MVP target

Official MVP browser target:

```text
Chrome desktop/laptop
```

Responsive requirement:

1. Basic responsive checks.
2. Not full mobile-first support.
3. Not full cross-browser coverage.

### 13.2. Desktop layout

Target desktop:

1. 1366x768 and above.
2. Sidebar visible.
3. Tables usable.
4. POS workspace fits.

### 13.3. Tablet/basic smaller width

For basic responsiveness:

1. Sidebar can collapse.
2. Tables can horizontally scroll.
3. POS panels stack if needed.
4. Checkout remains readable.
5. Forms remain usable.

### 13.4. Mobile

Full mobile support is Future/Commercial.

MVP mobile can show:

1. Basic readable layout.
2. Warning if screen is too small for POS-heavy workflow.

---

# 14. UI-to-SRS / API / Jira / Testing Traceability

---

## 14.1. UI-to-SRS traceability

| UI Area                          | SRS Groups             |
| -------------------------------- | ---------------------- |
| Login / First-login              | FR-AUTH                |
| User Management                  | FR-RBAC                |
| Medicine Management              | FR-MED                 |
| ActiveIngredient Management      | FR-ACT                 |
| Supplier Management              | FR-SUP                 |
| Inventory Summary / Batch Detail | FR-BAT                 |
| Stock Import                     | FR-STI                 |
| Inventory Adjustment             | FR-ADJ                 |
| POS Draft Order                  | FR-POS                 |
| Interaction Alert Panel          | FR-DRG, FR-ALT         |
| AI Copilot Panel                 | FR-AIC, FR-AIG, FR-AIA |
| Checkout                         | FR-CHK, FR-PAY, FR-INV |
| Order History / Detail           | FR-POS, FR-PAY, FR-INV |
| Invoice View                     | FR-INV                 |
| Reports                          | FR-RPT                 |
| System Settings                  | FR-SET                 |
| Graph Explorer / Graph-RAG       | FR-GSY, FR-GRG         |
| AI Audit Log                     | FR-AIA                 |

---

## 14.2. UI-to-API traceability

| UI Screen                | API Groups                                                |
| ------------------------ | --------------------------------------------------------- |
| Login                    | Supabase Auth, Auth/Profile                               |
| First-login              | Supabase Auth, Auth/Profile                               |
| User Management          | User/Role/Permission APIs                                 |
| Medicine                 | Medicine APIs                                             |
| ActiveIngredient         | ActiveIngredient APIs                                     |
| Medicine Mapping         | Medicine–ActiveIngredient Mapping APIs                    |
| Supplier                 | Supplier APIs                                             |
| Inventory Summary        | Inventory Summary APIs                                    |
| Batch Detail             | MedicineBatch APIs                                        |
| Stock Import             | Stock Import APIs                                         |
| Inventory Adjustment     | Inventory Adjustment APIs                                 |
| POS                      | Order/POS, Medicine, Sales Availability, Interaction APIs |
| Interaction Alert Panel  | InteractionAlert APIs, AI APIs                            |
| AI Copilot               | AI Copilot APIs                                           |
| Checkout                 | Checkout API                                              |
| Order History/Detail     | Order/POS APIs, Payment read APIs, Invoice APIs           |
| Invoice View             | Invoice APIs                                              |
| InteractionAlert History | InteractionAlert APIs                                     |
| Reports                  | Reports APIs                                              |
| System Settings          | System Settings APIs                                      |
| Graph Explorer/RAG       | Graph-RAG APIs                                            |
| AI Audit Log             | AI Audit APIs                                             |

---

## 14.3. UI-to-Jira traceability

Jira stories should be grouped by UI/module:

1. Auth UI.
2. App Shell and Role Navigation.
3. User Management UI.
4. Medicine UI.
5. ActiveIngredient UI.
6. Supplier UI.
7. Inventory UI.
8. Stock Import UI.
9. Inventory Adjustment UI.
10. POS UI.
11. InteractionAlert UI.
12. AI Copilot UI.
13. Checkout UI.
14. Order/Invoice UI.
15. Reports UI.
16. System Settings UI.
17. Graph-RAG UI.
18. AI Audit UI.
19. Demo UI polish.
20. E2E demo flow stabilization.

Each Jira story should link to:

1. Screen name.
2. Related API.
3. Related SRS requirement.
4. Test scenario.

---

## 14.4. UI-to-Testing traceability

| UI Area              | E2E/Test Focus                             |
| -------------------- | ------------------------------------------ |
| Login                | Valid/invalid login, inactive user         |
| First-login          | mustChangePassword flow                    |
| Role Navigation      | Menu visible/hidden by role                |
| User Management      | Create user, assign role, deactivate       |
| Medicine             | Create/edit/deactivate, price validation   |
| ActiveIngredient     | Create ingredient, map to medicine         |
| Supplier             | Warehouse create/update, Admin deactivate  |
| Inventory            | Summary from batches, low/near-expiry      |
| Batch Detail         | Read-only quantity, source import link     |
| Stock Import         | Create draft, confirm, expiry mismatch     |
| Inventory Adjustment | Reason required, negative stock blocked    |
| POS                  | Create draft, add items, interaction check |
| HIGH Alert           | Ack/note required, AI draft confirmation   |
| Checkout             | FEFO, idempotency, payment, invoice        |
| Order Detail         | PAID immutable, allocation visible         |
| Invoice              | Snapshot display                           |
| Reports              | Revenue/top/inventory correctness          |
| Settings             | Update near-expiry threshold               |
| Graph-RAG            | Fresh/fallback/safe error                  |
| AI Audit             | Audit visible, no raw PII                  |

---

## 15. UI Quality Checklist

Before accepting frontend work, verify:

| Checklist item                                       | Expected |
| ---------------------------------------------------- | -------- |
| UI language mainly Vietnamese                        | Yes      |
| Role-based navigation correct                        | Yes      |
| Backend permission still required                    | Yes      |
| Staff does not see inventory dashboard widgets       | Yes      |
| Warehouse does not see POS/checkout/AI sales flow    | Yes      |
| MedicineBatch not top-level sidebar                  | Yes      |
| Checkout is route/full-height panel, not small modal | Yes      |
| Draft Order preserved after checkout failure         | Yes      |
| HIGH alert visually prominent                        | Yes      |
| HIGH ack and note both required                      | Yes      |
| AI draft requires user confirmation                  | Yes      |
| AI safe refusal state exists                         | Yes      |
| Graph fallback indicator exists                      | Yes      |
| Inventory based on MedicineBatch                     | Yes      |
| No direct quantity edit UI                           | Yes      |
| Stock Import confirm immutable state shown           | Yes      |
| Inventory Adjustment reason required                 | Yes      |
| PAID order read-only                                 | Yes      |
| Reports exclude invalid order/payment states         | Yes      |
| Settings default 90 days visible                     | Yes      |
| Empty/loading/error states defined                   | Yes      |
| MVP/Should-have/Future UI separated                  | Yes      |

---

## 16. Kết luận

Document 15 — UI/UX Screen Specification đã đặc tả chính thức màn hình, navigation, user flow, role-based UI, UI states, validation, error states và demo flows cho frontend của **PharmaAssist AI Intelligence**.

Tài liệu này đã xác định:

1. UI/UX principles.
2. Design language.
3. Role-based navigation.
4. Layout structure.
5. Screen list by role.
6. Screen list by module.
7. Screen specification template.
8. Chi tiết các màn hình MVP quan trọng.
9. Critical flows:

   * POS to Checkout.
   * HIGH Alert Handling.
   * FEFO Checkout.
   * Stock Import Confirm.
   * Inventory Adjustment Confirm.
   * Graph-RAG fallback indicator.
10. MVP/Should-have/Future UI classification.
11. Accessibility basics.
12. Responsive basics.
13. UI-to-SRS/API/Jira/Testing traceability.
14. UI quality checklist.

Các baseline quan trọng được giữ đúng:

1. Frontend dùng Next.js.
2. UI chính viết tiếng Việt.
3. Role chính: Admin, Staff, Warehouse.
4. Customer không phải authenticated MVP user.
5. Staff không thấy dashboard low-stock/near-expiry tổng quát.
6. Staff chỉ thấy sale-relevant availability trong POS.
7. Warehouse không thấy POS, Checkout, Payment, Invoice, InteractionAlert, AI sales flow hoặc Graph-RAG trong MVP.
8. MedicineBatch không là top-level sidebar menu.
9. Inventory hiển thị dựa trên MedicineBatch.
10. Không có direct quantity edit UI.
11. Stock Import và Inventory Adjustment có confirm workflow.
12. POS hỗ trợ Draft Order.
13. InteractionAlert được hiển thị rõ.
14. HIGH alert bắt buộc acknowledgement và consultation note.
15. AI draft không tự lưu thành official note.
16. Checkout là dedicated route/full-height panel, không phải small modal.
17. Checkout failure giữ Draft Order.
18. Invoice chỉ xuất hiện sau successful checkout.
19. Reports MVP gồm Revenue, Top Medicines, Inventory.
20. System Settings MVP gồm near-expiry threshold default 90 ngày.
21. Graph-RAG có freshness/fallback indicator.
22. AI Audit Log không hiển thị raw PII.

Document 15 là input trực tiếp cho:

1. Frontend Jira stories.
2. UI/UX design/prototype.
3. Frontend implementation.
4. API integration.
5. E2E testing.
6. Demo script.
7. Document 19 — Project Management, Jira & Release Plan.
8. Document 20 — Testing, Demo & Setup Guide.

Bước tiếp theo hợp lý là viết **Document 16 — AI Architecture, Guardrail & Audit Design**, vì UI đã xác định rõ AI Copilot panel, AI note draft, guardrail refusal, fallback indicator và AI Audit Log cần được đặc tả sâu ở tầng AI architecture.
