# branch-on-jira.md

# Danh sách Nhánh Git tương ứng với Jira Issues

Tài liệu này ghi lại quy tắc đặt tên và danh sách nhánh Git tương ứng với từng **Epic**, **User Story** và **Task** trên Jira của dự án **PharmaAssist AI Intelligence**.

Tài liệu này được tạo lại theo baseline mới của dự án:

* Jira project key chính thức: `PAC`
* Không dùng prefix cũ `PAI`
* Tổng số issue branches: `789`
* Tổng số Epic: `39`
* Tổng số User Story: `170`
* Tổng số Task: `580`
* Frontend: `Next.js`
* Backend: `NestJS / Node.js`
* ORM: `Prisma`
* Auth: `Supabase Auth`
* Database source of truth: `PostgreSQL`
* Graph projection: `Neo4j`
* AI primary provider: `Google AI`
* AI fallback provider: `MockAI`

---

## 1. Quy tắc làm việc với Git và Jira

> [!IMPORTANT]
> **Quy tắc bắt buộc khi làm việc với Git:**
>
> * Mỗi Epic, Story và Task đều có một nhánh riêng để Jira có thể liên kết branch với issue.
> * Tên nhánh bắt buộc chứa Jira issue key thật, ví dụ `PAC-1`, `PAC-40`, `PAC-210`.
> * Không dùng prefix `PAI` trong bất kỳ branch, commit hoặc PR nào.
> * Tên nhánh dùng tiếng Anh không dấu, dạng `kebab-case`.
> * Tên issue trên Jira có thể dùng tiếng Việt.
> * Khi commit, bắt buộc chèn Jira key ở đầu commit message.
> * Khi tạo Pull Request, tiêu đề PR phải chứa Jira key và logical key.
> * Không merge trực tiếp vào `main`.
> * Tất cả feature/test/docs/bugfix branch phải merge vào `develop` thông qua Pull Request.
> * `main` chỉ nhận code từ release PR sau khi CI và smoke test đạt yêu cầu.

---

## 2. Branch cố định của dự án

Các branch dưới đây là branch hệ thống, không tính vào 789 issue branches.

| Branch                           | Mục đích                      | Quy tắc                   |
| -------------------------------- | ----------------------------- | ------------------------- |
| `main`                           | Chứa code release/demo-ready  | Chỉ merge từ release PR   |
| `develop`                        | Chứa code tích hợp hằng ngày  | Nhận PR từ issue branches |
| `release/demo-freeze-2026-06-16` | Branch đóng băng demo/release | Chỉ tạo khi chuẩn bị demo |

---

## 3. Quy tắc đánh số Jira issue key

Vì dự án cần đủ branch cho toàn bộ Epic, Story và Task, Jira issue key được chia theo thứ tự cố định như sau:

| Nhóm issue | Số lượng | Logical key |
| ---------- | -------: | ------------------------------- |
| Epic       |       39 | `PAC-EPIC-01` → `PAC-EPIC-39`   |
| User Story |      170 | `US-01` → `US-170`              |
| Task       |      580 | `PAC-TASK-001` → `PAC-TASK-580` |
| **Tổng**   |  **789** | Epic + Story + Task             |

> [!NOTE]
> **THÔNG BÁO QUAN TRỌNG VỀ JIRA KEY:**
> Vì hệ thống Jira thực tế có thể có sự sai lệch dải số (do các issue bị xóa hoặc tạo thừa trong quá trình thao tác), **TUYỆT ĐỐI KHÔNG TỰ TÍNH NHẨM MÃ JIRA** theo công thức cộng số thông thường.
> 
> Thay vào đó, **Bắt buộc phải tra cứu mã Jira Key chính xác** tương ứng với từng Logical Key tại file tham chiếu: **`jira-mapping.md`**.
> *(Mọi nhánh Git phải sử dụng đúng Jira Key ghi trong bảng mapping này).*

---

## 4. Quy tắc đặt tên branch

### 4.1. Epic branch

Format:

```text
epic/<jira-key>-EPIC-<epic-number>-<short-description>
```

Ví dụ:

```text
epic/PAC-1-EPIC-01-auth-rbac
epic/PAC-11-EPIC-11-checkout-fefo-payment-invoice
epic/PAC-14-EPIC-14-graph-sync-neo4j-projection
```

---

### 4.2. Story branch

Format:

```text
story/<jira-key>-US-<story-number>-<short-description>
```

Ví dụ:

```text
story/PAC-40-US-01-supabase-auth-login
story/PAC-122-US-83-checkout-transaction
story/PAC-209-US-170-review-cms-future-scope
```

---

### 4.3. Task branch

Format:

```text
<type>/<jira-key>-T-<task-number>-<short-description>
```

Trong đó `<type>` có thể là:

| Type      | Khi dùng                                                 |
| --------- | -------------------------------------------------------- |
| `feature` | Code tính năng frontend/backend/database                 |
| `test`    | Unit test, integration test, smoke test, regression test |
| `docs`    | README, tài liệu, demo script, future scope              |
| `bugfix`  | Sửa bug phát sinh sau khi test/review                    |
| `hotfix`  | Sửa lỗi khẩn cấp từ `main`                               |

Ví dụ (Các số Jira Key ở đây chỉ là minh họa, vui lòng tra cứu `jira-mapping.md` cho số chính xác):

```text
feature/PAC-211-T-001-supabase-login-ui
feature/PAC-470-T-260-checkout-controller
test/PAC-646-T-436-backend-unit-test-setup
docs/PAC-716-T-506-project-readme-setup-section
docs/PAC-790-T-580-final-ai-agent-out-of-scope-guardrails
```

---

## 5. Quy tắc commit message

Format:

```text
<PAC-issue-key> <logical-key>: <commit message>
```

Ví dụ (Tham khảo mã chính xác trong `jira-mapping.md`):

```text
PAC-211 T-001: implement Supabase login UI
PAC-470 T-260: implement CheckoutController POST /checkout
PAC-566 T-356: create graph sync outbox model
PAC-716 T-506: write project README setup section
```

Không dùng:

```text
fix login
update code
PAI-211: implement checkout
```

---

## 6. Quy tắc Pull Request

PR title format:

```text
<PAC-issue-key> <logical-key>: <short summary>
```

Ví dụ:

```text
PAC-469 T-260: Implement CheckoutController POST /checkout
PAC-565 T-356: Create graph_sync_outbox Prisma model
PAC-715 T-506: Write project README setup section
```

PR description nên có:

```text
Related Epic:
Related Story:
Related Task:
Scope:
Component:
What changed:
How tested:
Risk:
Rollback notes:
Screenshots:
```

---

## 7. Epic Branches — 39 nhánh

| Jira Key   | Logical Key | Tên Epic trên Jira                       | Nhánh Git tương ứng                                    |
| ---------- | ----------- | ---------------------------------------- | ------------------------------------------------------ |
| **PAC-1**  | EPIC-01     | Authentication & RBAC                    | `epic/PAC-1-EPIC-01-auth-rbac`                         |
| **PAC-2**  | EPIC-02     | Admin User Management                    | `epic/PAC-2-EPIC-02-admin-user-management`             |
| **PAC-3**  | EPIC-03     | Medicine & ActiveIngredient              | `epic/PAC-3-EPIC-03-medicine-activeingredient`         |
| **PAC-4**  | EPIC-04     | Supplier Management                      | `epic/PAC-4-EPIC-04-supplier-management`               |
| **PAC-5**  | EPIC-05     | Inventory & MedicineBatch                | `epic/PAC-5-EPIC-05-inventory-medicinebatch`           |
| **PAC-6**  | EPIC-06     | Stock Import                             | `epic/PAC-6-EPIC-06-stock-import`                      |
| **PAC-7**  | EPIC-07     | Inventory Adjustment                     | `epic/PAC-7-EPIC-07-inventory-adjustment`              |
| **PAC-8**  | EPIC-08     | POS Draft Order                          | `epic/PAC-8-EPIC-08-pos-draft-order`                   |
| **PAC-9**  | EPIC-09     | DrugInteraction Rule                     | `epic/PAC-9-EPIC-09-drug-interaction-rule`             |
| **PAC-10** | EPIC-10     | InteractionAlert                         | `epic/PAC-10-EPIC-10-interaction-alert`                |
| **PAC-11** | EPIC-11     | Checkout FEFO Payment Invoice            | `epic/PAC-11-EPIC-11-checkout-fefo-payment-invoice`    |
| **PAC-12** | EPIC-12     | AI Copilot                               | `epic/PAC-12-EPIC-12-ai-copilot`                       |
| **PAC-13** | EPIC-13     | AI Guardrail & Audit                     | `epic/PAC-13-EPIC-13-ai-guardrail-audit`               |
| **PAC-14** | EPIC-14     | Graph Sync & Neo4j Projection            | `epic/PAC-14-EPIC-14-graph-sync-neo4j-projection`      |
| **PAC-15** | EPIC-15     | Graph-RAG                                | `epic/PAC-15-EPIC-15-graph-rag`                        |
| **PAC-16** | EPIC-16     | Reports                                  | `epic/PAC-16-EPIC-16-reports`                          |
| **PAC-17** | EPIC-17     | System Settings                          | `epic/PAC-17-EPIC-17-system-settings`                  |
| **PAC-18** | EPIC-18     | Data & Demo                              | `epic/PAC-18-EPIC-18-data-demo`                        |
| **PAC-19** | EPIC-19     | Testing & Setup                          | `epic/PAC-19-EPIC-19-testing-setup`                    |
| **PAC-20** | EPIC-20     | DevOps & CI                              | `epic/PAC-20-EPIC-20-devops-ci`                        |
| **PAC-21** | EPIC-21     | Documentation                            | `epic/PAC-21-EPIC-21-documentation`                    |
| **PAC-22** | EPIC-22     | Admin Graph Sync Status                  | `epic/PAC-22-EPIC-22-admin-graph-sync-status`          |
| **PAC-23** | EPIC-23     | Graph Explorer                           | `epic/PAC-23-EPIC-23-graph-explorer`                   |
| **PAC-24** | EPIC-24     | AI Provider Settings & Prompt Management | `epic/PAC-24-EPIC-24-ai-provider-prompt-management`    |
| **PAC-25** | EPIC-25     | System Audit Log UI                      | `epic/PAC-25-EPIC-25-system-audit-log-ui`              |
| **PAC-26** | EPIC-26     | Supabase Storage                         | `epic/PAC-26-EPIC-26-supabase-storage`                 |
| **PAC-27** | EPIC-27     | Supabase Realtime                        | `epic/PAC-27-EPIC-27-supabase-realtime`                |
| **PAC-28** | EPIC-28     | Notification & Scheduled Job             | `epic/PAC-28-EPIC-28-notification-scheduled-job`       |
| **PAC-29** | EPIC-29     | AI Business Narrative                    | `epic/PAC-29-EPIC-29-ai-business-narrative`            |
| **PAC-30** | EPIC-30     | Advanced Backlog Governance              | `epic/PAC-30-EPIC-30-advanced-backlog-governance`      |
| **PAC-31** | EPIC-31     | Customer Management Future               | `epic/PAC-31-EPIC-31-customer-management-future`       |
| **PAC-32** | EPIC-32     | Online Commerce Future                   | `epic/PAC-32-EPIC-32-online-commerce-future`           |
| **PAC-33** | EPIC-33     | Product Variant Catalog Future           | `epic/PAC-33-EPIC-33-product-variant-catalog-future`   |
| **PAC-34** | EPIC-34     | Multi-store Multi-warehouse Future       | `epic/PAC-34-EPIC-34-multistore-multiwarehouse-future` |
| **PAC-35** | EPIC-35     | Stock Transfer Future                    | `epic/PAC-35-EPIC-35-stock-transfer-future`            |
| **PAC-36** | EPIC-36     | Forecasting Future                       | `epic/PAC-36-EPIC-36-forecasting-future`               |
| **PAC-37** | EPIC-37     | Promotion Coupon Future                  | `epic/PAC-37-EPIC-37-promotion-coupon-future`          |
| **PAC-38** | EPIC-38     | Shipping Future                          | `epic/PAC-38-EPIC-38-shipping-future`                  |
| **PAC-39** | EPIC-39     | Review CMS Future                        | `epic/PAC-39-EPIC-39-review-cms-future`                |

---

## 8. User Story Branches — 170 nhánh

| Jira Key    | Logical Key | Tên Story trên Jira                                 | Nhánh Git tương ứng                                               |
| ----------- | ----------- | --------------------------------------------------- | ----------------------------------------------------------------- |
| **PAC-40**  | US-01       | Đăng nhập bằng Supabase Auth                        | `story/PAC-40-US-01-supabase-auth-login`                          |
| **PAC-41**  | US-02       | Đăng xuất và quản lý session                        | `story/PAC-41-US-02-logout-session-management`                    |
| **PAC-42**  | US-03       | Bảo vệ frontend route                               | `story/PAC-42-US-03-protected-frontend-route`                     |
| **PAC-43**  | US-04       | Validate Supabase token ở backend                   | `story/PAC-43-US-04-backend-supabase-token-validation`            |
| **PAC-44**  | US-05       | Đồng bộ user profile với Supabase user              | `story/PAC-44-US-05-sync-user-profile-supabase`                   |
| **PAC-45**  | US-06       | Quản lý role và permission                          | `story/PAC-45-US-06-role-permission-management`                   |
| **PAC-46**  | US-07       | Permission guard cho API                            | `story/PAC-46-US-07-api-permission-guard`                         |
| **PAC-47**  | US-08       | Permission-aware sidebar và UI action               | `story/PAC-47-US-08-permission-aware-ui`                          |
| **PAC-48**  | US-09       | First-login password change flow                    | `story/PAC-48-US-09-first-login-password-change`                  |
| **PAC-49**  | US-10       | Admin tạo tài khoản nhân viên                       | `story/PAC-49-US-10-admin-create-staff-account`                   |
| **PAC-50**  | US-11       | Admin cập nhật role và trạng thái tài khoản         | `story/PAC-50-US-11-admin-update-user-role-status`                |
| **PAC-51**  | US-12       | Data ownership scope cho Staff                      | `story/PAC-51-US-12-staff-data-ownership-scope`                   |
| **PAC-52**  | US-13       | Tạo thuốc mới                                       | `story/PAC-52-US-13-create-medicine`                              |
| **PAC-53**  | US-14       | Cập nhật thông tin thuốc                            | `story/PAC-53-US-14-update-medicine`                              |
| **PAC-54**  | US-15       | Deactivate thuốc                                    | `story/PAC-54-US-15-deactivate-medicine`                          |
| **PAC-55**  | US-16       | Tìm kiếm và lọc thuốc                               | `story/PAC-55-US-16-search-filter-medicine`                       |
| **PAC-56**  | US-17       | Validate selling price lớn hơn 0                    | `story/PAC-56-US-17-selling-price-validation`                     |
| **PAC-57**  | US-18       | Quản lý ActiveIngredient                            | `story/PAC-57-US-18-activeingredient-management`                  |
| **PAC-58**  | US-19       | Mapping Medicine với ActiveIngredient               | `story/PAC-58-US-19-medicine-activeingredient-mapping`            |
| **PAC-59**  | US-20       | Normalize ActiveIngredient name                     | `story/PAC-59-US-20-normalize-activeingredient-name`              |
| **PAC-60**  | US-21       | Trigger Graph Sync khi Medicine thay đổi            | `story/PAC-60-US-21-medicine-graph-sync-event`                    |
| **PAC-61**  | US-22       | Trigger Graph Sync khi mapping thay đổi             | `story/PAC-61-US-22-mapping-graph-sync-event`                     |
| **PAC-62**  | US-23       | Tạo Supplier                                        | `story/PAC-62-US-23-create-supplier`                              |
| **PAC-63**  | US-24       | Cập nhật Supplier                                   | `story/PAC-63-US-24-update-supplier`                              |
| **PAC-64**  | US-25       | Deactivate Supplier                                 | `story/PAC-64-US-25-deactivate-supplier`                          |
| **PAC-65**  | US-26       | Chặn dùng inactive supplier khi nhập kho            | `story/PAC-65-US-26-block-inactive-supplier-stock-import`         |
| **PAC-66**  | US-27       | Tạo MedicineBatch                                   | `story/PAC-66-US-27-create-medicinebatch`                         |
| **PAC-67**  | US-28       | MedicineBatch là inventory source of truth          | `story/PAC-67-US-28-medicinebatch-source-of-truth`                |
| **PAC-68**  | US-29       | Batch identity theo medicine batch expiry           | `story/PAC-68-US-29-batch-identity-medicine-batch-expiry`         |
| **PAC-69**  | US-30       | Inventory Summary từ MedicineBatch                  | `story/PAC-69-US-30-inventory-summary-from-medicinebatch`         |
| **PAC-70**  | US-31       | Batch Detail screen                                 | `story/PAC-70-US-31-batch-detail-screen`                          |
| **PAC-71**  | US-32       | Sellable quantity loại expired batch                | `story/PAC-71-US-32-sellable-quantity-exclude-expired`            |
| **PAC-72**  | US-33       | Low-stock từ batch quantity                         | `story/PAC-72-US-33-low-stock-from-batch`                         |
| **PAC-73**  | US-34       | Near-expiry từ threshold setting                    | `story/PAC-73-US-34-near-expiry-threshold`                        |
| **PAC-74**  | US-35       | Default near-expiry 90 ngày                         | `story/PAC-74-US-35-default-near-expiry-90-days`                  |
| **PAC-75**  | US-36       | Warehouse xem inventory                             | `story/PAC-75-US-36-warehouse-view-inventory`                     |
| **PAC-76**  | US-37       | Staff chỉ xem sellable stock ở POS                  | `story/PAC-76-US-37-staff-pos-sellable-stock-only`                |
| **PAC-77**  | US-38       | Chặn sửa trực tiếp batch quantity                   | `story/PAC-77-US-38-block-direct-batch-quantity-edit`             |
| **PAC-78**  | US-39       | Tạo Stock Import draft                              | `story/PAC-78-US-39-create-stock-import-draft`                    |
| **PAC-79**  | US-40       | Thêm dòng Stock Import                              | `story/PAC-79-US-40-add-stock-import-lines`                       |
| **PAC-80**  | US-41       | Validate batch number và expiry khi nhập kho        | `story/PAC-80-US-41-validate-stock-import-batch-expiry`           |
| **PAC-81**  | US-42       | Validate supplier trong Stock Import                | `story/PAC-81-US-42-validate-stock-import-supplier`               |
| **PAC-82**  | US-43       | Confirm Stock Import transaction                    | `story/PAC-82-US-43-confirm-stock-import-transaction`             |
| **PAC-83**  | US-44       | Stock Import rollback khi lỗi                       | `story/PAC-83-US-44-stock-import-rollback`                        |
| **PAC-84**  | US-45       | Merge batch khi identity trùng                      | `story/PAC-84-US-45-stock-import-batch-merge`                     |
| **PAC-85**  | US-46       | Reject expiry mismatch                              | `story/PAC-85-US-46-stock-import-expiry-mismatch`                 |
| **PAC-86**  | US-47       | Confirmed Stock Import read-only                    | `story/PAC-86-US-47-confirmed-stock-import-readonly`              |
| **PAC-87**  | US-48       | Audit Stock Import confirm                          | `story/PAC-87-US-48-stock-import-confirm-audit`                   |
| **PAC-88**  | US-49       | Tạo Inventory Adjustment                            | `story/PAC-88-US-49-create-inventory-adjustment`                  |
| **PAC-89**  | US-50       | Adjustment bắt buộc reason                          | `story/PAC-89-US-50-adjustment-required-reason`                   |
| **PAC-90**  | US-51       | Chọn MedicineBatch khi adjustment                   | `story/PAC-90-US-51-adjustment-medicinebatch-selector`            |
| **PAC-91**  | US-52       | Confirm Inventory Adjustment transaction            | `story/PAC-91-US-52-confirm-inventory-adjustment`                 |
| **PAC-92**  | US-53       | Chặn adjustment làm quantity âm                     | `story/PAC-92-US-53-block-negative-adjustment`                    |
| **PAC-93**  | US-54       | Warehouse tạo và confirm adjustment                 | `story/PAC-93-US-54-warehouse-adjustment-permission`              |
| **PAC-94**  | US-55       | Audit Inventory Adjustment                          | `story/PAC-94-US-55-inventory-adjustment-audit`                   |
| **PAC-95**  | US-56       | Inventory Adjustment history                        | `story/PAC-95-US-56-inventory-adjustment-history`                 |
| **PAC-96**  | US-57       | Tạo POS Draft Order                                 | `story/PAC-96-US-57-create-pos-draft-order`                       |
| **PAC-97**  | US-58       | POS medicine search                                 | `story/PAC-97-US-58-pos-medicine-search`                          |
| **PAC-98**  | US-59       | Add medicine to Draft Order                         | `story/PAC-98-US-59-add-medicine-to-draft-order`                  |
| **PAC-99**  | US-60       | Update Draft Order quantity                         | `story/PAC-99-US-60-update-draft-order-quantity`                  |
| **PAC-100** | US-61       | Remove item from Draft Order                        | `story/PAC-100-US-61-remove-draft-order-item`                     |
| **PAC-101** | US-62       | Draft Order total calculation                       | `story/PAC-101-US-62-draft-order-total-calculation`               |
| **PAC-102** | US-63       | Validate sellable stock ở POS                       | `story/PAC-102-US-63-pos-sellable-stock-validation`               |
| **PAC-103** | US-64       | Walk-in customer support                            | `story/PAC-103-US-64-walk-in-customer-support`                    |
| **PAC-104** | US-65       | Staff scoped order list                             | `story/PAC-104-US-65-staff-scoped-order-list`                     |
| **PAC-105** | US-66       | Admin all-orders list                               | `story/PAC-105-US-66-admin-all-orders-list`                       |
| **PAC-106** | US-67       | Cancel Draft Order                                  | `story/PAC-106-US-67-cancel-draft-order`                          |
| **PAC-107** | US-68       | Preserve Draft Order after checkout failure         | `story/PAC-107-US-68-preserve-draft-order-after-checkout-failure` |
| **PAC-108** | US-69       | Create ActiveIngredient-level interaction rule      | `story/PAC-108-US-69-create-activeingredient-interaction-rule`    |
| **PAC-109** | US-70       | Update and deactivate DrugInteraction Rule          | `story/PAC-109-US-70-update-deactivate-interaction-rule`          |
| **PAC-110** | US-71       | Validate interaction severity enum                  | `story/PAC-110-US-71-validate-interaction-severity`               |
| **PAC-111** | US-72       | Derive medicine interaction from active ingredients | `story/PAC-111-US-72-derive-interaction-from-activeingredients`   |
| **PAC-112** | US-73       | Order-based interaction check                       | `story/PAC-112-US-73-order-interaction-check`                     |
| **PAC-113** | US-74       | Persist InteractionAlert                            | `story/PAC-113-US-74-persist-interaction-alert`                   |
| **PAC-114** | US-75       | One active alert per order and rule                 | `story/PAC-114-US-75-one-active-alert-per-order-rule`             |
| **PAC-115** | US-76       | InteractionAlert display count                      | `story/PAC-115-US-76-interaction-alert-display-count`             |
| **PAC-116** | US-77       | POS InteractionAlert panel                          | `story/PAC-116-US-77-pos-interaction-alert-panel`                 |
| **PAC-117** | US-78       | HIGH alert acknowledgement                          | `story/PAC-117-US-78-high-alert-acknowledgement`                  |
| **PAC-118** | US-79       | HIGH alert consultation note                        | `story/PAC-118-US-79-high-alert-consultation-note`                |
| **PAC-119** | US-80       | Checkout blocker for unresolved HIGH alert          | `story/PAC-119-US-80-checkout-blocker-high-alert`                 |
| **PAC-120** | US-81       | Admin InteractionAlert History                      | `story/PAC-120-US-81-admin-interaction-alert-history`             |
| **PAC-121** | US-82       | Warehouse no-access to InteractionAlert             | `story/PAC-121-US-82-warehouse-no-access-interaction-alert`       |
| **PAC-122** | US-83       | Checkout transaction                                | `story/PAC-122-US-83-checkout-transaction`                        |
| **PAC-123** | US-84       | Checkout actor permission and ownership             | `story/PAC-123-US-84-checkout-actor-permission-ownership`         |
| **PAC-124** | US-85       | Checkout only Draft Order                           | `story/PAC-124-US-85-checkout-draft-order-only`                   |
| **PAC-125** | US-86       | Validate HIGH alerts before payment                 | `story/PAC-125-US-86-checkout-validate-high-alerts`               |
| **PAC-126** | US-87       | Validate stock inside checkout transaction          | `story/PAC-126-US-87-checkout-validate-stock-transaction`         |
| **PAC-127** | US-88       | FEFO allocation                                     | `story/PAC-127-US-88-fefo-allocation`                             |
| **PAC-128** | US-89       | Persist order batch allocations                     | `story/PAC-128-US-89-persist-order-batch-allocations`             |
| **PAC-129** | US-90       | Deduct MedicineBatch in checkout                    | `story/PAC-129-US-90-deduct-medicinebatch-checkout`               |
| **PAC-130** | US-91       | Checkout idempotency                                | `story/PAC-130-US-91-checkout-idempotency`                        |
| **PAC-131** | US-92       | Checkout rollback                                   | `story/PAC-131-US-92-checkout-rollback`                           |
| **PAC-132** | US-93       | Payment handling                                    | `story/PAC-132-US-93-payment-handling`                            |
| **PAC-133** | US-94       | Cash change amount                                  | `story/PAC-133-US-94-cash-change-amount`                          |
| **PAC-134** | US-95       | Bank transfer transaction reference                 | `story/PAC-134-US-95-bank-transfer-transaction-reference`         |
| **PAC-135** | US-96       | One SUCCESS payment per order                       | `story/PAC-135-US-96-one-success-payment-per-order`               |
| **PAC-136** | US-97       | Invoice generation                                  | `story/PAC-136-US-97-invoice-generation`                          |
| **PAC-137** | US-98       | Invoice view and print                              | `story/PAC-137-US-98-invoice-view-print`                          |
| **PAC-138** | US-99       | AI explanation for InteractionAlert                 | `story/PAC-138-US-99-ai-interaction-explanation`                  |
| **PAC-139** | US-100      | AI consultation note draft                          | `story/PAC-139-US-100-ai-consultation-note-draft`                 |
| **PAC-140** | US-101      | Staff confirm AI draft as official note             | `story/PAC-140-US-101-staff-confirm-ai-draft-note`                |
| **PAC-141** | US-102      | Safe follow-up questions                            | `story/PAC-141-US-102-safe-follow-up-questions`                   |
| **PAC-142** | US-103      | Google AI provider integration                      | `story/PAC-142-US-103-google-ai-provider-integration`             |
| **PAC-143** | US-104      | MockAI fallback                                     | `story/PAC-143-US-104-mockai-fallback`                            |
| **PAC-144** | US-105      | AI input guardrail                                  | `story/PAC-144-US-105-ai-input-guardrail`                         |
| **PAC-145** | US-106      | Block diagnosis request                             | `story/PAC-145-US-106-block-diagnosis-request`                    |
| **PAC-146** | US-107      | Block prescribing request                           | `story/PAC-146-US-107-block-prescribing-request`                  |
| **PAC-147** | US-108      | Block dosage advice request                         | `story/PAC-147-US-108-block-dosage-advice`                        |
| **PAC-148** | US-109      | AI output guardrail                                 | `story/PAC-148-US-109-ai-output-guardrail`                        |
| **PAC-149** | US-110      | Structured AI output validation                     | `story/PAC-149-US-110-structured-ai-output-validation`            |
| **PAC-150** | US-111      | PII minimization for AI                             | `story/PAC-150-US-111-ai-pii-minimization`                        |
| **PAC-151** | US-112      | AI safe error response                              | `story/PAC-151-US-112-ai-safe-error-response`                     |
| **PAC-152** | US-113      | AI disclaimer                                       | `story/PAC-152-US-113-ai-disclaimer`                              |
| **PAC-153** | US-114      | AI Audit Log                                        | `story/PAC-153-US-114-ai-audit-log`                               |
| **PAC-154** | US-115      | Prompt template versioning                          | `story/PAC-154-US-115-prompt-template-versioning`                 |
| **PAC-155** | US-116      | Admin AI Audit Log UI                               | `story/PAC-155-US-116-admin-ai-audit-log-ui`                      |
| **PAC-156** | US-117      | Graph Sync Outbox events                            | `story/PAC-156-US-117-graph-sync-outbox-events`                   |
| **PAC-157** | US-118      | Graph Sync worker                                   | `story/PAC-157-US-118-graph-sync-worker`                          |
| **PAC-158** | US-119      | Medicine node projection                            | `story/PAC-158-US-119-medicine-node-projection`                   |
| **PAC-159** | US-120      | ActiveIngredient node projection                    | `story/PAC-159-US-120-activeingredient-node-projection`           |
| **PAC-160** | US-121      | CONTAINS relationship projection                    | `story/PAC-160-US-121-contains-relationship-projection`           |
| **PAC-161** | US-122      | INTERACTS_WITH relationship projection              | `story/PAC-161-US-122-interacts-with-projection`                  |
| **PAC-162** | US-123      | Canonical directed interaction edge                 | `story/PAC-162-US-123-canonical-directed-interaction-edge`        |
| **PAC-163** | US-124      | Graph source version metadata                       | `story/PAC-163-US-124-graph-source-version-metadata`              |
| **PAC-164** | US-125      | Graph Sync retry                                    | `story/PAC-164-US-125-graph-sync-retry`                           |
| **PAC-165** | US-126      | Graph Sync failure logging                          | `story/PAC-165-US-126-graph-sync-failure-logging`                 |
| **PAC-166** | US-127      | Graph freshness detection                           | `story/PAC-166-US-127-graph-freshness-detection`                  |
| **PAC-167** | US-128      | Deactivated graph data isActive false               | `story/PAC-167-US-128-deactivated-graph-data-isactive-false`      |
| **PAC-168** | US-129      | Graph-RAG interaction explanation                   | `story/PAC-168-US-129-graph-rag-interaction-explanation`          |
| **PAC-169** | US-130      | Graph-RAG provenance metadata                       | `story/PAC-169-US-130-graph-rag-provenance`                       |
| **PAC-170** | US-131      | Graph-RAG freshness metadata                        | `story/PAC-170-US-131-graph-rag-freshness`                        |
| **PAC-171** | US-132      | PostgreSQL fallback when Neo4j unavailable          | `story/PAC-171-US-132-postgresql-fallback-neo4j-unavailable`      |
| **PAC-172** | US-133      | PostgreSQL fallback when graph stale                | `story/PAC-172-US-133-postgresql-fallback-graph-stale`            |
| **PAC-173** | US-134      | Safe error for graph-only query                     | `story/PAC-173-US-134-safe-error-graph-only-query`                |
| **PAC-174** | US-135      | Staff cannot submit raw Cypher                      | `story/PAC-174-US-135-no-raw-cypher-for-staff`                    |
| **PAC-175** | US-136      | Graph-RAG does not decide checkout                  | `story/PAC-175-US-136-graph-rag-not-checkout-decision`            |
| **PAC-176** | US-137      | Revenue Report                                      | `story/PAC-176-US-137-revenue-report`                             |
| **PAC-177** | US-138      | Top Medicines Report                                | `story/PAC-177-US-138-top-medicines-report`                       |
| **PAC-178** | US-139      | Inventory Report                                    | `story/PAC-178-US-139-inventory-report`                           |
| **PAC-179** | US-140      | Report filters and states                           | `story/PAC-179-US-140-report-filters-states`                      |
| **PAC-180** | US-141      | Near-expiry System Setting                          | `story/PAC-180-US-141-near-expiry-system-setting`                 |
| **PAC-181** | US-142      | AI provider backend config                          | `story/PAC-181-US-142-ai-provider-backend-config`                 |
| **PAC-182** | US-143      | Seed AI prompt templates                            | `story/PAC-182-US-143-seed-ai-prompt-templates`                   |
| **PAC-183** | US-144      | Minimal System Settings UI                          | `story/PAC-183-US-144-minimal-system-settings-ui`                 |
| **PAC-184** | US-145      | Curated MVP seed data                               | `story/PAC-184-US-145-curated-mvp-seed-data`                      |
| **PAC-185** | US-146      | Demo users by role                                  | `story/PAC-185-US-146-demo-users-by-role`                         |
| **PAC-186** | US-147      | Dynamic expiry demo batches                         | `story/PAC-186-US-147-dynamic-expiry-demo-batches`                |
| **PAC-187** | US-148      | FEFO demo scenario                                  | `story/PAC-187-US-148-fefo-demo-scenario`                         |
| **PAC-188** | US-149      | PAID order with handled HIGH alert                  | `story/PAC-188-US-149-paid-order-handled-high-alert`              |
| **PAC-189** | US-150      | Demo reset and release readiness                    | `story/PAC-189-US-150-demo-reset-release-readiness`               |
| **PAC-190** | US-151      | Admin Graph Sync Status UI                          | `story/PAC-190-US-151-admin-graph-sync-status-ui`                 |
| **PAC-191** | US-152      | Manual graph retry and rebuild                      | `story/PAC-191-US-152-manual-graph-retry-rebuild`                 |
| **PAC-192** | US-153      | Read-only Graph Explorer                            | `story/PAC-192-US-153-readonly-graph-explorer`                    |
| **PAC-193** | US-154      | AI Provider Settings UI                             | `story/PAC-193-US-154-ai-provider-settings-ui`                    |
| **PAC-194** | US-155      | Prompt Management UI                                | `story/PAC-194-US-155-prompt-management-ui`                       |
| **PAC-195** | US-156      | System Audit Log UI                                 | `story/PAC-195-US-156-system-audit-log-ui`                        |
| **PAC-196** | US-157      | Supabase Storage medicine images                    | `story/PAC-196-US-157-supabase-storage-medicine-images`           |
| **PAC-197** | US-158      | Supabase Realtime inventory update                  | `story/PAC-197-US-158-supabase-realtime-inventory-update`         |
| **PAC-198** | US-159      | Notification and scheduled near-expiry scan         | `story/PAC-198-US-159-notification-scheduled-scan`                |
| **PAC-199** | US-160      | AI Business Report Narrative                        | `story/PAC-199-US-160-ai-business-report-narrative`               |
| **PAC-200** | US-161      | Full Customer Management future scope               | `story/PAC-200-US-161-customer-management-future`                 |
| **PAC-201** | US-162      | Online Commerce future scope                        | `story/PAC-201-US-162-online-commerce-future`                     |
| **PAC-202** | US-163      | Product Variant Catalog future scope                | `story/PAC-202-US-163-product-variant-catalog-future`             |
| **PAC-203** | US-164      | Multi-store future scope                            | `story/PAC-203-US-164-multistore-future`                          |
| **PAC-204** | US-165      | Multi-warehouse future scope                        | `story/PAC-204-US-165-multiwarehouse-future`                      |
| **PAC-205** | US-166      | Stock Transfer future scope                         | `story/PAC-205-US-166-stock-transfer-future`                      |
| **PAC-206** | US-167      | Forecasting future scope                            | `story/PAC-206-US-167-forecasting-future`                         |
| **PAC-207** | US-168      | Promotion Coupon future scope                       | `story/PAC-207-US-168-promotion-coupon-future`                    |
| **PAC-208** | US-169      | Shipping Delivery future scope                      | `story/PAC-208-US-169-shipping-delivery-future`                   |
| **PAC-209** | US-170      | Review CMS future scope                             | `story/PAC-209-US-170-review-cms-future`                          |

---

## 9. Task Branches — 580 nhánh

> [!NOTE]
> Các branch Task dưới đây dùng Jira key thật `PAC-210 → PAC-789`.
> Logical task key vẫn giữ dạng `T-001 → T-580` để đối chiếu với bộ Task `PAC-TASK-001 → PAC-TASK-580`.

---

### 9.1. 4A — MVP Foundation Task Branches `T-001 → T-145`

| Jira Key    | Logical Key | Nhánh Git tương ứng                                          |
| ----------- | ----------- | ------------------------------------------------------------ |
| **PAC-210** | T-001       | `feature/PAC-210-T-001-supabase-login-ui`                    |
| **PAC-211** | T-002       | `feature/PAC-211-T-002-supabase-login-action`                |
| **PAC-212** | T-003       | `feature/PAC-212-T-003-login-error-state`                    |
| **PAC-213** | T-004       | `feature/PAC-213-T-004-logout-session-clear`                 |
| **PAC-214** | T-005       | `feature/PAC-214-T-005-protected-route-guard`                |
| **PAC-215** | T-006       | `feature/PAC-215-T-006-supabase-session-provider`            |
| **PAC-216** | T-007       | `feature/PAC-216-T-007-auth-layout`                          |
| **PAC-217** | T-008       | `feature/PAC-217-T-008-first-login-password-change-ui`       |
| **PAC-218** | T-009       | `feature/PAC-218-T-009-validate-supabase-token-backend`      |
| **PAC-219** | T-010       | `feature/PAC-219-T-010-sync-user-profile`                    |
| **PAC-220** | T-011       | `feature/PAC-220-T-011-auth-user-context`                    |
| **PAC-221** | T-012       | `feature/PAC-221-T-012-backend-auth-guard`                   |
| **PAC-222** | T-013       | `feature/PAC-222-T-013-user-profiles-model`                  |
| **PAC-223** | T-014       | `feature/PAC-223-T-014-roles-model`                          |
| **PAC-224** | T-015       | `feature/PAC-224-T-015-permissions-model`                    |
| **PAC-225** | T-016       | `feature/PAC-225-T-016-user-roles-model`                     |
| **PAC-226** | T-017       | `feature/PAC-226-T-017-role-permissions-model`               |
| **PAC-227** | T-018       | `feature/PAC-227-T-018-seed-admin-role-permissions`          |
| **PAC-228** | T-019       | `feature/PAC-228-T-019-seed-staff-role-permissions`          |
| **PAC-229** | T-020       | `feature/PAC-229-T-020-seed-warehouse-role-permissions`      |
| **PAC-230** | T-021       | `feature/PAC-230-T-021-permission-check-service`             |
| **PAC-231** | T-022       | `feature/PAC-231-T-022-permission-decorator`                 |
| **PAC-232** | T-023       | `feature/PAC-232-T-023-permission-guard`                     |
| **PAC-233** | T-024       | `feature/PAC-233-T-024-rbac-error-response`                  |
| **PAC-234** | T-025       | `feature/PAC-234-T-025-sidebar-permission-menu`              |
| **PAC-235** | T-026       | `feature/PAC-235-T-026-action-button-permission-guard`       |
| **PAC-236** | T-027       | `feature/PAC-236-T-027-forbidden-page`                       |
| **PAC-237** | T-028       | `feature/PAC-237-T-028-staff-ownership-scope-service`        |
| **PAC-238** | T-029       | `feature/PAC-238-T-029-warehouse-route-restriction`          |
| **PAC-239** | T-030       | `test/PAC-239-T-030-auth-rbac-tests`                         |
| **PAC-240** | T-031       | `feature/PAC-240-T-031-admin-user-list-api`                  |
| **PAC-241** | T-032       | `feature/PAC-241-T-032-admin-user-list-ui`                   |
| **PAC-242** | T-033       | `feature/PAC-242-T-033-create-staff-account-api`             |
| **PAC-243** | T-034       | `feature/PAC-243-T-034-create-staff-account-ui`              |
| **PAC-244** | T-035       | `feature/PAC-244-T-035-update-user-role-api`                 |
| **PAC-245** | T-036       | `feature/PAC-245-T-036-update-user-status-api`               |
| **PAC-246** | T-037       | `feature/PAC-246-T-037-user-role-status-ui`                  |
| **PAC-247** | T-038       | `feature/PAC-247-T-038-must-change-password-flag`            |
| **PAC-248** | T-039       | `test/PAC-248-T-039-user-management-tests`                   |
| **PAC-249** | T-040       | `docs/PAC-249-T-040-auth-rbac-traceability-notes`            |
| **PAC-250** | T-041       | `feature/PAC-250-T-041-medicine-model`                       |
| **PAC-251** | T-042       | `feature/PAC-251-T-042-medicine-create-api`                  |
| **PAC-252** | T-043       | `feature/PAC-252-T-043-medicine-create-ui`                   |
| **PAC-253** | T-044       | `feature/PAC-253-T-044-medicine-update-api`                  |
| **PAC-254** | T-045       | `feature/PAC-254-T-045-medicine-update-ui`                   |
| **PAC-255** | T-046       | `feature/PAC-255-T-046-medicine-deactivate-api`              |
| **PAC-256** | T-047       | `feature/PAC-256-T-047-medicine-list-search-api`             |
| **PAC-257** | T-048       | `feature/PAC-257-T-048-medicine-list-ui`                     |
| **PAC-258** | T-049       | `feature/PAC-258-T-049-selling-price-validation`             |
| **PAC-259** | T-050       | `feature/PAC-259-T-050-medicine-permission-guards`           |
| **PAC-260** | T-051       | `test/PAC-260-T-051-medicine-api-tests`                      |
| **PAC-261** | T-052       | `docs/PAC-261-T-052-medicine-traceability-notes`             |
| **PAC-262** | T-053       | `feature/PAC-262-T-053-activeingredient-model`               |
| **PAC-263** | T-054       | `feature/PAC-263-T-054-activeingredient-create-api`          |
| **PAC-264** | T-055       | `feature/PAC-264-T-055-activeingredient-list-ui`             |
| **PAC-265** | T-056       | `feature/PAC-265-T-056-activeingredient-normalization`       |
| **PAC-266** | T-057       | `feature/PAC-266-T-057-medicine-ingredient-mapping-model`    |
| **PAC-267** | T-058       | `feature/PAC-267-T-058-medicine-ingredient-mapping-api`      |
| **PAC-268** | T-059       | `feature/PAC-268-T-059-medicine-ingredient-mapping-ui`       |
| **PAC-269** | T-060       | `feature/PAC-269-T-060-mapping-duplicate-validation`         |
| **PAC-270** | T-061       | `feature/PAC-270-T-061-mapping-graph-sync-event`             |
| **PAC-271** | T-062       | `test/PAC-271-T-062-activeingredient-mapping-tests`          |
| **PAC-272** | T-063       | `docs/PAC-272-T-063-activeingredient-traceability-notes`     |
| **PAC-273** | T-064       | `feature/PAC-273-T-064-supplier-model`                       |
| **PAC-274** | T-065       | `feature/PAC-274-T-065-supplier-create-api`                  |
| **PAC-275** | T-066       | `feature/PAC-275-T-066-supplier-create-ui`                   |
| **PAC-276** | T-067       | `feature/PAC-276-T-067-supplier-update-api`                  |
| **PAC-277** | T-068       | `feature/PAC-277-T-068-supplier-update-ui`                   |
| **PAC-278** | T-069       | `feature/PAC-278-T-069-supplier-deactivate-api`              |
| **PAC-279** | T-070       | `feature/PAC-279-T-070-supplier-list-api`                    |
| **PAC-280** | T-071       | `feature/PAC-280-T-071-supplier-list-ui`                     |
| **PAC-281** | T-072       | `feature/PAC-281-T-072-inactive-supplier-stock-import-block` |
| **PAC-282** | T-073       | `test/PAC-282-T-073-supplier-api-tests`                      |
| **PAC-283** | T-074       | `docs/PAC-283-T-074-supplier-traceability-notes`             |
| **PAC-284** | T-075       | `feature/PAC-284-T-075-medicinebatch-model`                  |
| **PAC-285** | T-076       | `feature/PAC-285-T-076-batch-number-normalization`           |
| **PAC-286** | T-077       | `feature/PAC-286-T-077-batch-identity-constraint`            |
| **PAC-287** | T-078       | `feature/PAC-287-T-078-medicinebatch-create-service`         |
| **PAC-288** | T-079       | `feature/PAC-288-T-079-medicinebatch-list-api`               |
| **PAC-289** | T-080       | `feature/PAC-289-T-080-medicinebatch-detail-api`             |
| **PAC-290** | T-081       | `feature/PAC-290-T-081-medicinebatch-list-ui`                |
| **PAC-291** | T-082       | `feature/PAC-291-T-082-medicinebatch-detail-ui`              |
| **PAC-292** | T-083       | `feature/PAC-292-T-083-sellable-quantity-service`            |
| **PAC-293** | T-084       | `feature/PAC-293-T-084-expired-batch-exclusion`              |
| **PAC-294** | T-085       | `feature/PAC-294-T-085-low-stock-calculation`                |
| **PAC-295** | T-086       | `feature/PAC-295-T-086-near-expiry-calculation`              |
| **PAC-296** | T-087       | `feature/PAC-296-T-087-inventory-summary-api`                |
| **PAC-297** | T-088       | `feature/PAC-297-T-088-inventory-summary-ui`                 |
| **PAC-298** | T-089       | `feature/PAC-298-T-089-inventory-filter-search`              |
| **PAC-299** | T-090       | `test/PAC-299-T-090-medicinebatch-source-tests`              |
| **PAC-300** | T-091       | `test/PAC-300-T-091-sellable-expired-batch-tests`            |
| **PAC-301** | T-092       | `docs/PAC-301-T-092-inventory-traceability-notes`            |
| **PAC-302** | T-093       | `feature/PAC-302-T-093-stock-import-model`                   |
| **PAC-303** | T-094       | `feature/PAC-303-T-094-stock-import-line-model`              |
| **PAC-304** | T-095       | `feature/PAC-304-T-095-create-stock-import-api`              |
| **PAC-305** | T-096       | `feature/PAC-305-T-096-create-stock-import-ui`               |
| **PAC-306** | T-097       | `feature/PAC-306-T-097-add-stock-import-line-api`            |
| **PAC-307** | T-098       | `feature/PAC-307-T-098-add-stock-import-line-ui`             |
| **PAC-308** | T-099       | `feature/PAC-308-T-099-stock-import-line-validation`         |
| **PAC-309** | T-100       | `feature/PAC-309-T-100-stock-import-supplier-validation`     |
| **PAC-310** | T-101       | `feature/PAC-310-T-101-stock-import-confirm-base`            |
| **PAC-311** | T-102       | `feature/PAC-311-T-102-stock-import-transaction-wrapper`     |
| **PAC-312** | T-103       | `feature/PAC-312-T-103-stock-import-status-transition`       |
| **PAC-313** | T-104       | `feature/PAC-313-T-104-stock-import-list-api`                |
| **PAC-314** | T-105       | `feature/PAC-314-T-105-stock-import-list-ui`                 |
| **PAC-315** | T-106       | `feature/PAC-315-T-106-stock-import-detail-api`              |
| **PAC-316** | T-107       | `feature/PAC-316-T-107-stock-import-detail-ui`               |
| **PAC-317** | T-108       | `feature/PAC-317-T-108-stock-import-permission-guard`        |
| **PAC-318** | T-109       | `test/PAC-318-T-109-stock-import-draft-tests`                |
| **PAC-319** | T-110       | `docs/PAC-319-T-110-stock-import-traceability-notes`         |
| **PAC-320** | T-111       | `feature/PAC-320-T-111-dashboard-layout`                     |
| **PAC-321** | T-112       | `feature/PAC-321-T-112-admin-dashboard-cards`                |
| **PAC-322** | T-113       | `feature/PAC-322-T-113-warehouse-dashboard-cards`            |
| **PAC-323** | T-114       | `feature/PAC-323-T-114-staff-pos-dashboard-shortcut`         |
| **PAC-324** | T-115       | `feature/PAC-324-T-115-global-api-error-handler`             |
| **PAC-325** | T-116       | `feature/PAC-325-T-116-global-form-validation-pattern`       |
| **PAC-326** | T-117       | `feature/PAC-326-T-117-pagination-component`                 |
| **PAC-327** | T-118       | `feature/PAC-327-T-118-search-filter-component`              |
| **PAC-328** | T-119       | `feature/PAC-328-T-119-shared-loading-empty-error-states`    |
| **PAC-329** | T-120       | `feature/PAC-329-T-120-shared-toast-notification`            |
| **PAC-330** | T-121       | `feature/PAC-330-T-121-api-client-wrapper`                   |
| **PAC-331** | T-122       | `feature/PAC-331-T-122-backend-response-format`              |
| **PAC-332** | T-123       | `feature/PAC-332-T-123-audit-log-base-model`                 |
| **PAC-333** | T-124       | `feature/PAC-333-T-124-audit-log-write-service`              |
| **PAC-334** | T-125       | `feature/PAC-334-T-125-module-permission-seed`               |
| **PAC-335** | T-126       | `test/PAC-335-T-126-foundation-smoke-tests`                  |
| **PAC-336** | T-127       | `docs/PAC-336-T-127-foundation-setup-notes`                  |
| **PAC-337** | T-128       | `feature/PAC-337-T-128-prisma-schema-validation`             |
| **PAC-338** | T-129       | `feature/PAC-338-T-129-prisma-migration-baseline`            |
| **PAC-339** | T-130       | `feature/PAC-339-T-130-seed-core-roles-permissions`          |
| **PAC-340** | T-131       | `feature/PAC-340-T-131-seed-core-medicines`                  |
| **PAC-341** | T-132       | `feature/PAC-341-T-132-seed-activeingredients`               |
| **PAC-342** | T-133       | `feature/PAC-342-T-133-seed-suppliers`                       |
| **PAC-343** | T-134       | `feature/PAC-343-T-134-seed-initial-batches`                 |
| **PAC-344** | T-135       | `test/PAC-344-T-135-seed-data-smoke-tests`                   |
| **PAC-345** | T-136       | `feature/PAC-345-T-136-api-swagger-docs-base`                |
| **PAC-346** | T-137       | `feature/PAC-346-T-137-backend-module-structure`             |
| **PAC-347** | T-138       | `feature/PAC-347-T-138-frontend-route-structure`             |
| **PAC-348** | T-139       | `feature/PAC-348-T-139-layout-shell`                         |
| **PAC-349** | T-140       | `feature/PAC-349-T-140-role-based-navigation`                |
| **PAC-350** | T-141       | `test/PAC-350-T-141-foundation-integration-tests`            |
| **PAC-351** | T-142       | `docs/PAC-351-T-142-foundation-module-readme`                |
| **PAC-352** | T-143       | `feature/PAC-352-T-143-stock-import-confirm-precheck`        |
| **PAC-353** | T-144       | `feature/PAC-353-T-144-stock-import-confirm-ui-action`       |
| **PAC-354** | T-145       | `test/PAC-354-T-145-stock-import-confirm-integration-tests`  |

---

### 9.2. 4B — MVP POS Interaction Checkout Task Branches `T-146 → T-290`

| Jira Key    | Logical Key | Nhánh Git tương ứng                                                  |
| ----------- | ----------- | -------------------------------------------------------------------- |
| **PAC-355** | T-146       | `feature/PAC-355-T-146-stock-import-batch-merge`                     |
| **PAC-356** | T-147       | `test/PAC-356-T-147-valid-batch-merge-tests`                         |
| **PAC-357** | T-148       | `feature/PAC-357-T-148-stock-import-merge-result-ui`                 |
| **PAC-358** | T-149       | `feature/PAC-358-T-149-expiry-mismatch-rejection`                    |
| **PAC-359** | T-150       | `feature/PAC-359-T-150-line-level-expiry-mismatch-errors`            |
| **PAC-360** | T-151       | `test/PAC-360-T-151-expiry-mismatch-tests`                           |
| **PAC-361** | T-152       | `feature/PAC-361-T-152-lock-confirmed-stock-import`                  |
| **PAC-362** | T-153       | `feature/PAC-362-T-153-confirmed-stock-import-readonly-ui`           |
| **PAC-363** | T-154       | `feature/PAC-363-T-154-prevent-duplicate-stock-import-confirm`       |
| **PAC-364** | T-155       | `test/PAC-364-T-155-stock-import-immutability-tests`                 |
| **PAC-365** | T-156       | `feature/PAC-365-T-156-stock-import-confirm-audit-log`               |
| **PAC-366** | T-157       | `feature/PAC-366-T-157-stock-import-audit-metadata-ui`               |
| **PAC-367** | T-158       | `docs/PAC-367-T-158-stock-import-traceability-notes`                 |
| **PAC-368** | T-159       | `test/PAC-368-T-159-stock-import-confirm-integration-tests`          |
| **PAC-369** | T-160       | `test/PAC-369-T-160-stock-import-smoke-checklist`                    |
| **PAC-370** | T-161       | `feature/PAC-370-T-161-inventory-adjustments-model`                  |
| **PAC-371** | T-162       | `feature/PAC-371-T-162-inventory-adjustment-lines-model`             |
| **PAC-372** | T-163       | `feature/PAC-372-T-163-create-inventory-adjustment-api`              |
| **PAC-373** | T-164       | `feature/PAC-373-T-164-create-inventory-adjustment-screen`           |
| **PAC-374** | T-165       | `feature/PAC-374-T-165-medicinebatch-selector-adjustment`            |
| **PAC-375** | T-166       | `feature/PAC-375-T-166-adjustment-type-quantity-validation`          |
| **PAC-376** | T-167       | `feature/PAC-376-T-167-required-adjustment-reason-backend`           |
| **PAC-377** | T-168       | `feature/PAC-377-T-168-required-adjustment-reason-ui`                |
| **PAC-378** | T-169       | `feature/PAC-378-T-169-batch-before-after-preview`                   |
| **PAC-379** | T-170       | `feature/PAC-379-T-170-confirm-inventory-adjustment-transaction`     |
| **PAC-380** | T-171       | `feature/PAC-380-T-171-update-batch-through-adjustment-only`         |
| **PAC-381** | T-172       | `feature/PAC-381-T-172-prevent-negative-adjustment`                  |
| **PAC-382** | T-173       | `feature/PAC-382-T-173-lock-confirmed-adjustment`                    |
| **PAC-383** | T-174       | `feature/PAC-383-T-174-inventory-adjustment-list-api`                |
| **PAC-384** | T-175       | `feature/PAC-384-T-175-inventory-adjustment-history-ui`              |
| **PAC-385** | T-176       | `feature/PAC-385-T-176-inventory-adjustment-detail-api`              |
| **PAC-386** | T-177       | `feature/PAC-386-T-177-inventory-adjustment-detail-screen`           |
| **PAC-387** | T-178       | `feature/PAC-387-T-178-warehouse-adjustment-permission`              |
| **PAC-388** | T-179       | `feature/PAC-388-T-179-admin-adjustment-review-permission`           |
| **PAC-389** | T-180       | `feature/PAC-389-T-180-inventory-adjustment-audit-log`               |
| **PAC-390** | T-181       | `feature/PAC-390-T-181-adjustment-audit-ui`                          |
| **PAC-391** | T-182       | `test/PAC-391-T-182-negative-adjustment-tests`                       |
| **PAC-392** | T-183       | `test/PAC-392-T-183-required-reason-tests`                           |
| **PAC-393** | T-184       | `test/PAC-393-T-184-warehouse-adjustment-permission-tests`           |
| **PAC-394** | T-185       | `feature/PAC-394-T-185-block-direct-batch-quantity-update`           |
| **PAC-395** | T-186       | `feature/PAC-395-T-186-cancel-draft-adjustment-api`                  |
| **PAC-396** | T-187       | `feature/PAC-396-T-187-cancel-draft-adjustment-ui`                   |
| **PAC-397** | T-188       | `feature/PAC-397-T-188-refresh-inventory-after-adjustment`           |
| **PAC-398** | T-189       | `test/PAC-398-T-189-inventory-adjustment-smoke-checklist`            |
| **PAC-399** | T-190       | `docs/PAC-399-T-190-inventory-adjustment-traceability-notes`         |
| **PAC-400** | T-191       | `feature/PAC-400-T-191-orders-model`                                 |
| **PAC-401** | T-192       | `feature/PAC-401-T-192-order-items-model`                            |
| **PAC-402** | T-193       | `feature/PAC-402-T-193-order-status-enum`                            |
| **PAC-403** | T-194       | `feature/PAC-403-T-194-create-draft-order-api`                       |
| **PAC-404** | T-195       | `feature/PAC-404-T-195-pos-draft-order-screen`                       |
| **PAC-405** | T-196       | `feature/PAC-405-T-196-pos-medicine-search-api`                      |
| **PAC-406** | T-197       | `feature/PAC-406-T-197-pos-medicine-search-component`                |
| **PAC-407** | T-198       | `feature/PAC-407-T-198-pos-sellable-stock-display`                   |
| **PAC-408** | T-199       | `feature/PAC-408-T-199-add-item-draft-order-api`                     |
| **PAC-409** | T-200       | `feature/PAC-409-T-200-add-to-order-action`                          |
| **PAC-410** | T-201       | `feature/PAC-410-T-201-active-medicine-validation-pos`               |
| **PAC-411** | T-202       | `feature/PAC-411-T-202-update-draft-order-quantity-api`              |
| **PAC-412** | T-203       | `feature/PAC-412-T-203-draft-order-quantity-controls-ui`             |
| **PAC-413** | T-204       | `feature/PAC-413-T-204-draft-order-quantity-positive-validation`     |
| **PAC-414** | T-205       | `feature/PAC-414-T-205-sellable-stock-quantity-validation`           |
| **PAC-415** | T-206       | `feature/PAC-415-T-206-remove-item-draft-order-api`                  |
| **PAC-416** | T-207       | `feature/PAC-416-T-207-remove-item-action-pos`                       |
| **PAC-417** | T-208       | `feature/PAC-417-T-208-draft-order-total-service`                    |
| **PAC-418** | T-209       | `feature/PAC-418-T-209-draft-order-total-ui`                         |
| **PAC-419** | T-210       | `feature/PAC-419-T-210-no-coupon-discount-mvp-total`                 |
| **PAC-420** | T-211       | `feature/PAC-420-T-211-pos-stock-validation-errors`                  |
| **PAC-421** | T-212       | `feature/PAC-421-T-212-walk-in-customer-order-model`                 |
| **PAC-422** | T-213       | `feature/PAC-422-T-213-walk-in-customer-pos-option`                  |
| **PAC-423** | T-214       | `feature/PAC-423-T-214-keep-full-customer-management-out-mvp`        |
| **PAC-424** | T-215       | `feature/PAC-424-T-215-staff-order-ownership-api`                    |
| **PAC-425** | T-216       | `feature/PAC-425-T-216-staff-scoped-order-list-ui`                   |
| **PAC-426** | T-217       | `feature/PAC-426-T-217-admin-all-orders-api`                         |
| **PAC-427** | T-218       | `feature/PAC-427-T-218-admin-all-orders-ui`                          |
| **PAC-428** | T-219       | `feature/PAC-428-T-219-cancel-draft-order-api`                       |
| **PAC-429** | T-220       | `feature/PAC-429-T-220-cancel-draft-order-ui`                        |
| **PAC-430** | T-221       | `feature/PAC-430-T-221-prevent-cancel-paid-cancelled-order`          |
| **PAC-431** | T-222       | `feature/PAC-431-T-222-preserve-draft-order-checkout-failure-ui`     |
| **PAC-432** | T-223       | `feature/PAC-432-T-223-restore-checkout-error-to-draft-order`        |
| **PAC-433** | T-224       | `feature/PAC-433-T-224-order-detail-screen`                          |
| **PAC-434** | T-225       | `test/PAC-434-T-225-pos-api-integration-tests`                       |
| **PAC-435** | T-226       | `test/PAC-435-T-226-pos-frontend-smoke-checklist`                    |
| **PAC-436** | T-227       | `feature/PAC-436-T-227-drug-interaction-rules-model`                 |
| **PAC-437** | T-228       | `feature/PAC-437-T-228-create-activeingredient-interaction-rule-api` |
| **PAC-438** | T-229       | `feature/PAC-438-T-229-drug-interaction-rule-management-screen`      |
| **PAC-439** | T-230       | `feature/PAC-439-T-230-two-activeingredients-validation`             |
| **PAC-440** | T-231       | `feature/PAC-440-T-231-update-interaction-rule-api`                  |
| **PAC-441** | T-232       | `feature/PAC-441-T-232-deactivate-interaction-rule-api`              |
| **PAC-442** | T-233       | `feature/PAC-442-T-233-graph-sync-event-rule-change`                 |
| **PAC-443** | T-234       | `feature/PAC-443-T-234-severity-enum-validation`                     |
| **PAC-444** | T-235       | `feature/PAC-444-T-235-derive-interaction-from-activeingredients`    |
| **PAC-445** | T-236       | `test/PAC-445-T-236-derived-interaction-tests`                       |
| **PAC-446** | T-237       | `feature/PAC-446-T-237-order-interaction-check-service`              |
| **PAC-447** | T-238       | `feature/PAC-447-T-238-order-interactions-check-api`                 |
| **PAC-448** | T-239       | `feature/PAC-448-T-239-interaction-alerts-model`                     |
| **PAC-449** | T-240       | `feature/PAC-449-T-240-persist-alert-snapshot-fields`                |
| **PAC-450** | T-241       | `feature/PAC-450-T-241-one-active-alert-per-order-rule`              |
| **PAC-451** | T-242       | `feature/PAC-451-T-242-update-display-count-last-displayed`          |
| **PAC-452** | T-243       | `feature/PAC-452-T-243-pos-interaction-alert-panel`                  |
| **PAC-453** | T-244       | `feature/PAC-453-T-244-alert-severity-display-logic`                 |
| **PAC-454** | T-245       | `feature/PAC-454-T-245-high-alert-acknowledgement-ui`                |
| **PAC-455** | T-246       | `feature/PAC-455-T-246-acknowledge-interaction-alert-api`            |
| **PAC-456** | T-247       | `feature/PAC-456-T-247-high-alert-consultation-note-ui`              |
| **PAC-457** | T-248       | `feature/PAC-457-T-248-consultation-note-api-per-high-alert`         |
| **PAC-458** | T-249       | `feature/PAC-458-T-249-high-alert-note-not-empty-validation`         |
| **PAC-459** | T-250       | `feature/PAC-459-T-250-checkout-blocker-unresolved-high-alerts`      |
| **PAC-460** | T-251       | `feature/PAC-460-T-251-ui-prompt-checkout-blocked-high-alert`        |
| **PAC-461** | T-252       | `feature/PAC-461-T-252-admin-interaction-alert-history-api-ui`       |
| **PAC-462** | T-253       | `feature/PAC-462-T-253-warehouse-no-access-interaction-alert`        |
| **PAC-463** | T-254       | `test/PAC-463-T-254-warehouse-no-access-alert-tests`                 |
| **PAC-464** | T-255       | `test/PAC-464-T-255-interaction-alert-lifecycle-tests`               |
| **PAC-465** | T-256       | `test/PAC-465-T-256-high-acknowledgement-note-tests`                 |
| **PAC-466** | T-257       | `feature/PAC-466-T-257-interaction-alert-history-filters`            |
| **PAC-467** | T-258       | `docs/PAC-467-T-258-interaction-alert-traceability-notes`            |
| **PAC-468** | T-259       | `feature/PAC-468-T-259-checkout-dto-validation`                      |
| **PAC-469** | T-260       | `feature/PAC-469-T-260-checkout-controller`                          |
| **PAC-470** | T-261       | `feature/PAC-470-T-261-checkout-service-transaction-skeleton`        |
| **PAC-471** | T-262       | `feature/PAC-471-T-262-checkout-permission-ownership-validation`     |
| **PAC-472** | T-263       | `feature/PAC-472-T-263-checkout-order-draft-validation`              |
| **PAC-473** | T-264       | `feature/PAC-473-T-264-checkout-high-alert-validation`               |
| **PAC-474** | T-265       | `feature/PAC-474-T-265-checkout-sellable-stock-validation`           |
| **PAC-475** | T-266       | `feature/PAC-475-T-266-checkout-full-page-ui`                        |
| **PAC-476** | T-267       | `feature/PAC-476-T-267-payment-method-selector-ui`                   |
| **PAC-477** | T-268       | `feature/PAC-477-T-268-fefo-allocation-model`                        |
| **PAC-478** | T-269       | `feature/PAC-478-T-269-query-sellable-batches-fefo`                  |
| **PAC-479** | T-270       | `feature/PAC-479-T-270-sort-fefo-nearest-expiry`                     |
| **PAC-480** | T-271       | `feature/PAC-480-T-271-multi-batch-fefo-allocation`                  |
| **PAC-481** | T-272       | `feature/PAC-481-T-272-reject-fefo-insufficient-stock`               |
| **PAC-482** | T-273       | `feature/PAC-482-T-273-order-batch-allocations-model`                |
| **PAC-483** | T-274       | `feature/PAC-483-T-274-persist-order-batch-allocations`              |
| **PAC-484** | T-275       | `feature/PAC-484-T-275-deduct-batch-quantities-checkout`             |
| **PAC-485** | T-276       | `feature/PAC-485-T-276-idempotency-records-model`                    |
| **PAC-486** | T-277       | `feature/PAC-486-T-277-checkout-idempotency-key-handling`            |
| **PAC-487** | T-278       | `feature/PAC-487-T-278-checkout-rollback-on-failure`                 |
| **PAC-488** | T-279       | `feature/PAC-488-T-279-payments-model`                               |
| **PAC-489** | T-280       | `feature/PAC-489-T-280-cash-payment-handling-checkout`               |
| **PAC-490** | T-281       | `feature/PAC-490-T-281-calculate-change-amount`                      |
| **PAC-491** | T-282       | `feature/PAC-491-T-282-bank-transfer-reference-validation`           |
| **PAC-492** | T-283       | `feature/PAC-492-T-283-one-success-payment-per-order`                |
| **PAC-493** | T-284       | `feature/PAC-493-T-284-allow-failed-payment-attempts`                |
| **PAC-494** | T-285       | `feature/PAC-494-T-285-invoices-model`                               |
| **PAC-495** | T-286       | `feature/PAC-495-T-286-generate-invoice-checkout-transaction`        |
| **PAC-496** | T-287       | `feature/PAC-496-T-287-invoice-view-print-ui`                        |
| **PAC-497** | T-288       | `feature/PAC-497-T-288-update-order-paid-after-checkout`             |
| **PAC-498** | T-289       | `test/PAC-498-T-289-checkout-integration-tests`                      |
| **PAC-499** | T-290       | `test/PAC-499-T-290-fefo-idempotency-rollback-tests`                 |

---

### 9.3. 4C — MVP AI Graph Report Demo Task Branches `T-291 → T-435`

| Jira Key    | Logical Key | Nhánh Git tương ứng                                                    |
| ----------- | ----------- | ---------------------------------------------------------------------- |
| **PAC-500** | T-291       | `feature/PAC-500-T-291-define-ai-provider-abstraction`                 |
| **PAC-501** | T-292       | `feature/PAC-501-T-292-ai-provider-model-settings-loader`              |
| **PAC-502** | T-293       | `feature/PAC-502-T-293-google-ai-provider-adapter`                     |
| **PAC-503** | T-294       | `feature/PAC-503-T-294-google-ai-timeout-error-handling`               |
| **PAC-504** | T-295       | `feature/PAC-504-T-295-mockai-fallback-adapter`                        |
| **PAC-505** | T-296       | `feature/PAC-505-T-296-fallback-provider-selection`                    |
| **PAC-506** | T-297       | `feature/PAC-506-T-297-provider-tracking-metadata`                     |
| **PAC-507** | T-298       | `feature/PAC-507-T-298-ai-interaction-explanation-api`                 |
| **PAC-508** | T-299       | `feature/PAC-508-T-299-ai-explanation-panel-ui`                        |
| **PAC-509** | T-300       | `feature/PAC-509-T-300-ai-disclaimer-explanation-panel`                |
| **PAC-510** | T-301       | `feature/PAC-510-T-301-ai-explanation-loading-error-fallback`          |
| **PAC-511** | T-302       | `feature/PAC-511-T-302-ai-consultation-note-draft-api`                 |
| **PAC-512** | T-303       | `feature/PAC-512-T-303-ai-consultation-note-draft-panel`               |
| **PAC-513** | T-304       | `feature/PAC-513-T-304-staff-edit-ai-draft-ui`                         |
| **PAC-514** | T-305       | `feature/PAC-514-T-305-confirm-ai-draft-official-note`                 |
| **PAC-515** | T-306       | `feature/PAC-515-T-306-prevent-unconfirmed-ai-draft-save`              |
| **PAC-516** | T-307       | `feature/PAC-516-T-307-link-ai-note-to-high-alert`                     |
| **PAC-517** | T-308       | `feature/PAC-517-T-308-safe-follow-up-question-api`                    |
| **PAC-518** | T-309       | `feature/PAC-518-T-309-safe-follow-up-question-ui`                     |
| **PAC-519** | T-310       | `feature/PAC-519-T-310-block-medical-record-storage`                   |
| **PAC-520** | T-311       | `feature/PAC-520-T-311-ai-copilot-permission-checks`                   |
| **PAC-521** | T-312       | `feature/PAC-521-T-312-ai-copilot-frontend-guards`                     |
| **PAC-522** | T-313       | `test/PAC-522-T-313-ai-provider-unit-tests`                            |
| **PAC-523** | T-314       | `test/PAC-523-T-314-mockai-fallback-tests`                             |
| **PAC-524** | T-315       | `test/PAC-524-T-315-ai-copilot-smoke-checklist`                        |
| **PAC-525** | T-316       | `feature/PAC-525-T-316-unsafe-ai-request-categories`                   |
| **PAC-526** | T-317       | `feature/PAC-526-T-317-ai-input-guardrail-service`                     |
| **PAC-527** | T-318       | `feature/PAC-527-T-318-block-diagnosis-requests`                       |
| **PAC-528** | T-319       | `feature/PAC-528-T-319-block-prescribing-requests`                     |
| **PAC-529** | T-320       | `feature/PAC-529-T-320-block-dosage-advice-requests`                   |
| **PAC-530** | T-321       | `feature/PAC-530-T-321-safe-response-templates`                        |
| **PAC-531** | T-322       | `feature/PAC-531-T-322-ai-pii-minimization`                            |
| **PAC-532** | T-323       | `feature/PAC-532-T-323-redact-customer-order-data-ai`                  |
| **PAC-533** | T-324       | `feature/PAC-533-T-324-ai-output-guardrail-service`                    |
| **PAC-534** | T-325       | `feature/PAC-534-T-325-block-unsafe-ai-output`                         |
| **PAC-535** | T-326       | `feature/PAC-535-T-326-structured-output-schema-validation`            |
| **PAC-536** | T-327       | `feature/PAC-536-T-327-schema-retry-safe-fallback`                     |
| **PAC-537** | T-328       | `feature/PAC-537-T-328-guardrail-status-object`                        |
| **PAC-538** | T-329       | `feature/PAC-538-T-329-ai-audit-logs-model`                            |
| **PAC-539** | T-330       | `feature/PAC-539-T-330-ai-audit-log-write-service`                     |
| **PAC-540** | T-331       | `feature/PAC-540-T-331-ai-provider-model-prompt-metadata`              |
| **PAC-541** | T-332       | `feature/PAC-541-T-332-ai-guardrail-status-audit`                      |
| **PAC-542** | T-333       | `feature/PAC-542-T-333-ai-latency-request-fallback-metadata`           |
| **PAC-543** | T-334       | `feature/PAC-543-T-334-ai-audit-no-raw-pii`                            |
| **PAC-544** | T-335       | `feature/PAC-544-T-335-admin-ai-audit-list-api`                        |
| **PAC-545** | T-336       | `feature/PAC-545-T-336-admin-ai-audit-log-ui`                          |
| **PAC-546** | T-337       | `feature/PAC-546-T-337-ai-audit-filters`                               |
| **PAC-547** | T-338       | `feature/PAC-547-T-338-prompt-templates-model`                         |
| **PAC-548** | T-339       | `feature/PAC-548-T-339-seed-official-ai-prompts`                       |
| **PAC-549** | T-340       | `feature/PAC-549-T-340-load-approved-prompt-template`                  |
| **PAC-550** | T-341       | `feature/PAC-550-T-341-record-prompt-version-audit`                    |
| **PAC-551** | T-342       | `feature/PAC-551-T-342-ai-config-validation`                           |
| **PAC-552** | T-343       | `feature/PAC-552-T-343-ai-settings-fallback-order`                     |
| **PAC-553** | T-344       | `feature/PAC-553-T-344-ai-timeout-circuit-rate-limit`                  |
| **PAC-554** | T-345       | `feature/PAC-554-T-345-ai-safe-error-helper`                           |
| **PAC-555** | T-346       | `test/PAC-555-T-346-ai-input-guardrail-tests`                          |
| **PAC-556** | T-347       | `test/PAC-556-T-347-diagnosis-block-tests`                             |
| **PAC-557** | T-348       | `test/PAC-557-T-348-prescribing-block-tests`                           |
| **PAC-558** | T-349       | `test/PAC-558-T-349-dosage-advice-block-tests`                         |
| **PAC-559** | T-350       | `test/PAC-559-T-350-ai-output-guardrail-tests`                         |
| **PAC-560** | T-351       | `test/PAC-560-T-351-structured-output-validation-tests`                |
| **PAC-561** | T-352       | `test/PAC-561-T-352-pii-minimization-tests`                            |
| **PAC-562** | T-353       | `test/PAC-562-T-353-ai-audit-integration-tests`                        |
| **PAC-563** | T-354       | `test/PAC-563-T-354-prompt-versioning-tests`                           |
| **PAC-564** | T-355       | `docs/PAC-564-T-355-ai-safety-traceability-notes`                      |
| **PAC-565** | T-356       | `feature/PAC-565-T-356-graph-sync-outbox-model`                        |
| **PAC-566** | T-357       | `feature/PAC-566-T-357-graph-sync-job-status-enum`                     |
| **PAC-567** | T-358       | `feature/PAC-567-T-358-outbox-event-medicine-changes`                  |
| **PAC-568** | T-359       | `feature/PAC-568-T-359-outbox-event-activeingredient-changes`          |
| **PAC-569** | T-360       | `feature/PAC-569-T-360-outbox-event-medicine-ingredient-mapping`       |
| **PAC-570** | T-361       | `feature/PAC-570-T-361-outbox-event-interaction-rule-changes`          |
| **PAC-571** | T-362       | `feature/PAC-571-T-362-graph-sync-worker-loop`                         |
| **PAC-572** | T-363       | `feature/PAC-572-T-363-neo4j-connection-service`                       |
| **PAC-573** | T-364       | `feature/PAC-573-T-364-neo4j-health-check`                             |
| **PAC-574** | T-365       | `feature/PAC-574-T-365-idempotent-graph-job-claiming`                  |
| **PAC-575** | T-366       | `feature/PAC-575-T-366-upsert-medicine-node-neo4j`                     |
| **PAC-576** | T-367       | `feature/PAC-576-T-367-upsert-activeingredient-node-neo4j`             |
| **PAC-577** | T-368       | `feature/PAC-577-T-368-upsert-contains-relationship`                   |
| **PAC-578** | T-369       | `feature/PAC-578-T-369-upsert-interacts-with-relationship`             |
| **PAC-579** | T-370       | `feature/PAC-579-T-370-canonical-directed-interaction-edge`            |
| **PAC-580** | T-371       | `feature/PAC-580-T-371-interacts-with-rule-properties`                 |
| **PAC-581** | T-372       | `feature/PAC-581-T-372-graph-source-version-metadata`                  |
| **PAC-582** | T-373       | `feature/PAC-582-T-373-deactivated-medicine-ingredient-isactive-false` |
| **PAC-583** | T-374       | `feature/PAC-583-T-374-deactivated-rule-edge-isactive-false`           |
| **PAC-584** | T-375       | `feature/PAC-584-T-375-filter-active-graph-data-only`                  |
| **PAC-585** | T-376       | `feature/PAC-585-T-376-graph-sync-retry-logic`                         |
| **PAC-586** | T-377       | `feature/PAC-586-T-377-max-retry-failed-status`                        |
| **PAC-587** | T-378       | `feature/PAC-587-T-378-graph-sync-failure-logging`                     |
| **PAC-588** | T-379       | `feature/PAC-588-T-379-graph-sync-failure-audit-log`                   |
| **PAC-589** | T-380       | `feature/PAC-589-T-380-graph-projection-source-version-tracking`       |
| **PAC-590** | T-381       | `feature/PAC-590-T-381-graph-freshness-detection-service`              |
| **PAC-591** | T-382       | `feature/PAC-591-T-382-detect-pending-outbox-stale-graph`              |
| **PAC-592** | T-383       | `feature/PAC-592-T-383-detect-failed-outbox-stale-graph`               |
| **PAC-593** | T-384       | `feature/PAC-593-T-384-detect-missing-sourceversion-stale-graph`       |
| **PAC-594** | T-385       | `test/PAC-594-T-385-graph-sync-worker-tests`                           |
| **PAC-595** | T-386       | `test/PAC-595-T-386-neo4j-projection-tests`                            |
| **PAC-596** | T-387       | `test/PAC-596-T-387-interacts-with-projection-tests`                   |
| **PAC-597** | T-388       | `test/PAC-597-T-388-graph-freshness-tests`                             |
| **PAC-598** | T-389       | `test/PAC-598-T-389-graph-sync-retry-failure-tests`                    |
| **PAC-599** | T-390       | `docs/PAC-599-T-390-graph-sync-traceability-notes`                     |
| **PAC-600** | T-391       | `feature/PAC-600-T-391-graph-rag-interaction-explanation-service`      |
| **PAC-601** | T-392       | `feature/PAC-601-T-392-allowlisted-graph-query-templates`              |
| **PAC-602** | T-393       | `feature/PAC-602-T-393-query-medicine-contains-activeingredient`       |
| **PAC-603** | T-394       | `feature/PAC-603-T-394-query-activeingredient-interacts-with`          |
| **PAC-604** | T-395       | `feature/PAC-604-T-395-graph-rag-context-builder-ai-copilot`           |
| **PAC-605** | T-396       | `feature/PAC-605-T-396-graph-rag-provenance-metadata`                  |
| **PAC-606** | T-397       | `feature/PAC-606-T-397-graphused-flag-response`                        |
| **PAC-607** | T-398       | `feature/PAC-607-T-398-graph-rag-freshness-metadata`                   |
| **PAC-608** | T-399       | `feature/PAC-608-T-399-freshness-warning-response`                     |
| **PAC-609** | T-400       | `feature/PAC-609-T-400-postgresql-fallback-neo4j-unavailable`          |
| **PAC-610** | T-401       | `feature/PAC-610-T-401-postgresql-fallback-graph-stale`                |
| **PAC-611** | T-402       | `feature/PAC-611-T-402-safe-error-graph-only-query`                    |
| **PAC-612** | T-403       | `feature/PAC-612-T-403-no-raw-cypher-for-staff`                        |
| **PAC-613** | T-404       | `feature/PAC-613-T-404-backend-guard-raw-cypher-staff`                 |
| **PAC-614** | T-405       | `feature/PAC-614-T-405-graph-rag-not-checkout-decision`                |
| **PAC-615** | T-406       | `feature/PAC-615-T-406-graph-rag-metadata-ui`                          |
| **PAC-616** | T-407       | `test/PAC-616-T-407-graph-rag-postgresql-fallback-tests`               |
| **PAC-617** | T-408       | `test/PAC-617-T-408-stale-graph-fallback-tests`                        |
| **PAC-618** | T-409       | `test/PAC-618-T-409-raw-cypher-no-access-tests`                        |
| **PAC-619** | T-410       | `test/PAC-619-T-410-graph-not-checkout-tests`                          |
| **PAC-620** | T-411       | `feature/PAC-620-T-411-revenue-report-api`                             |
| **PAC-621** | T-412       | `feature/PAC-621-T-412-revenue-report-ui`                              |
| **PAC-622** | T-413       | `feature/PAC-622-T-413-revenue-report-filters`                         |
| **PAC-623** | T-414       | `feature/PAC-623-T-414-top-medicines-report-api`                       |
| **PAC-624** | T-415       | `feature/PAC-624-T-415-top-medicines-report-ui`                        |
| **PAC-625** | T-416       | `feature/PAC-625-T-416-inventory-report-api-medicinebatch`             |
| **PAC-626** | T-417       | `feature/PAC-626-T-417-inventory-report-ui`                            |
| **PAC-627** | T-418       | `feature/PAC-627-T-418-report-loading-empty-error-states`              |
| **PAC-628** | T-419       | `feature/PAC-628-T-419-report-permission-checks`                       |
| **PAC-629** | T-420       | `feature/PAC-629-T-420-system-settings-model`                          |
| **PAC-630** | T-421       | `feature/PAC-630-T-421-seed-near-expiry-threshold-90`                  |
| **PAC-631** | T-422       | `feature/PAC-631-T-422-near-expiry-settings-api`                       |
| **PAC-632** | T-423       | `feature/PAC-632-T-423-minimal-system-settings-ui`                     |
| **PAC-633** | T-424       | `test/PAC-633-T-424-system-settings-tests`                             |
| **PAC-634** | T-425       | `feature/PAC-634-T-425-curated-mvp-seed-dataset`                       |
| **PAC-635** | T-426       | `feature/PAC-635-T-426-seed-demo-users-by-role`                        |
| **PAC-636** | T-427       | `feature/PAC-636-T-427-seed-first-login-demo-account`                  |
| **PAC-637** | T-428       | `feature/PAC-637-T-428-dynamic-expiry-demo-batches`                    |
| **PAC-638** | T-429       | `feature/PAC-638-T-429-seed-fefo-multi-batch-demo`                     |
| **PAC-639** | T-430       | `feature/PAC-639-T-430-seed-expired-batch-excluded`                    |
| **PAC-640** | T-431       | `feature/PAC-640-T-431-seed-paid-order-handled-high-alert`             |
| **PAC-641** | T-432       | `feature/PAC-641-T-432-seed-report-data-order-statuses`                |
| **PAC-642** | T-433       | `feature/PAC-642-T-433-demo-reset-local-only-guard`                    |
| **PAC-643** | T-434       | `feature/PAC-643-T-434-rebuild-neo4j-projection-demo-reset`            |
| **PAC-644** | T-435       | `test/PAC-644-T-435-run-smoke-tests-after-demo-reset`                  |

---

### 9.4. 4D — Testing Advanced Future Task Branches `T-436 → T-580`

| Jira Key    | Logical Key | Nhánh Git tương ứng                                              |
| ----------- | ----------- | ---------------------------------------------------------------- |
| **PAC-645** | T-436       | `test/PAC-645-T-436-backend-unit-test-setup`                     |
| **PAC-646** | T-437       | `test/PAC-646-T-437-backend-integration-test-setup`              |
| **PAC-647** | T-438       | `test/PAC-647-T-438-frontend-component-test-setup`               |
| **PAC-648** | T-439       | `test/PAC-648-T-439-playwright-e2e-chrome-setup`                 |
| **PAC-649** | T-440       | `test/PAC-649-T-440-postman-api-collection-structure`            |
| **PAC-650** | T-441       | `test/PAC-650-T-441-auth-rbac-test-suite`                        |
| **PAC-651** | T-442       | `test/PAC-651-T-442-user-management-permission-tests`            |
| **PAC-652** | T-443       | `test/PAC-652-T-443-medicine-management-api-tests`               |
| **PAC-653** | T-444       | `test/PAC-653-T-444-activeingredient-mapping-tests`              |
| **PAC-654** | T-445       | `test/PAC-654-T-445-supplier-management-api-tests`               |
| **PAC-655** | T-446       | `test/PAC-655-T-446-medicinebatch-source-tests`                  |
| **PAC-656** | T-447       | `test/PAC-656-T-447-sellable-expired-batch-tests`                |
| **PAC-657** | T-448       | `test/PAC-657-T-448-near-expiry-threshold-tests`                 |
| **PAC-658** | T-449       | `test/PAC-658-T-449-stock-import-transaction-tests`              |
| **PAC-659** | T-450       | `test/PAC-659-T-450-stock-import-merge-expiry-tests`             |
| **PAC-660** | T-451       | `test/PAC-660-T-451-inventory-adjustment-transaction-tests`      |
| **PAC-661** | T-452       | `test/PAC-661-T-452-adjustment-audit-reason-tests`               |
| **PAC-662** | T-453       | `test/PAC-662-T-453-pos-draft-order-api-tests`                   |
| **PAC-663** | T-454       | `test/PAC-663-T-454-pos-draft-order-ui-smoke-tests`              |
| **PAC-664** | T-455       | `test/PAC-664-T-455-staff-order-ownership-tests`                 |
| **PAC-665** | T-456       | `test/PAC-665-T-456-draft-order-cancel-status-tests`             |
| **PAC-666** | T-457       | `test/PAC-666-T-457-drug-interaction-rule-api-tests`             |
| **PAC-667** | T-458       | `test/PAC-667-T-458-activeingredient-derived-interaction-tests`  |
| **PAC-668** | T-459       | `test/PAC-668-T-459-interaction-alert-persistence-tests`         |
| **PAC-669** | T-460       | `test/PAC-669-T-460-interaction-alert-display-count-tests`       |
| **PAC-670** | T-461       | `test/PAC-670-T-461-high-alert-acknowledgement-tests`            |
| **PAC-671** | T-462       | `test/PAC-671-T-462-high-alert-consultation-note-tests`          |
| **PAC-672** | T-463       | `test/PAC-672-T-463-checkout-blocker-high-alert-tests`           |
| **PAC-673** | T-464       | `test/PAC-673-T-464-checkout-transaction-success-tests`          |
| **PAC-674** | T-465       | `test/PAC-674-T-465-checkout-rollback-failure-tests`             |
| **PAC-675** | T-466       | `test/PAC-675-T-466-fefo-allocation-unit-tests`                  |
| **PAC-676** | T-467       | `test/PAC-676-T-467-fefo-multi-batch-tests`                      |
| **PAC-677** | T-468       | `test/PAC-677-T-468-checkout-idempotency-tests`                  |
| **PAC-678** | T-469       | `test/PAC-678-T-469-payment-cash-handling-tests`                 |
| **PAC-679** | T-470       | `test/PAC-679-T-470-payment-one-success-tests`                   |
| **PAC-680** | T-471       | `test/PAC-680-T-471-invoice-generation-tests`                    |
| **PAC-681** | T-472       | `test/PAC-681-T-472-ai-guardrail-high-risk-tests`                |
| **PAC-682** | T-473       | `test/PAC-682-T-473-ai-audit-privacy-tests`                      |
| **PAC-683** | T-474       | `test/PAC-683-T-474-ai-provider-fallback-tests`                  |
| **PAC-684** | T-475       | `test/PAC-684-T-475-graph-sync-outbox-retry-tests`               |
| **PAC-685** | T-476       | `test/PAC-685-T-476-neo4j-projection-tests`                      |
| **PAC-686** | T-477       | `test/PAC-686-T-477-graph-freshness-tests`                       |
| **PAC-687** | T-478       | `test/PAC-687-T-478-graph-rag-fallback-tests`                    |
| **PAC-688** | T-479       | `test/PAC-688-T-479-reports-deterministic-tests`                 |
| **PAC-689** | T-480       | `test/PAC-689-T-480-full-mvp-smoke-test-checklist`               |
| **PAC-690** | T-481       | `feature/PAC-690-T-481-local-nodejs-setup-guide`                 |
| **PAC-691** | T-482       | `feature/PAC-691-T-482-frontend-env-guide`                       |
| **PAC-692** | T-483       | `feature/PAC-692-T-483-backend-env-guide`                        |
| **PAC-693** | T-484       | `feature/PAC-693-T-484-supabase-setup-instructions`              |
| **PAC-694** | T-485       | `feature/PAC-694-T-485-neo4j-auradb-setup-instructions`          |
| **PAC-695** | T-486       | `feature/PAC-695-T-486-google-ai-api-key-setup`                  |
| **PAC-696** | T-487       | `feature/PAC-696-T-487-mockai-fallback-setup`                    |
| **PAC-697** | T-488       | `feature/PAC-697-T-488-prisma-generate-migrate-command`          |
| **PAC-698** | T-489       | `feature/PAC-698-T-489-curated-mvp-seed-command`                 |
| **PAC-699** | T-490       | `feature/PAC-699-T-490-graph-projection-rebuild-command`         |
| **PAC-700** | T-491       | `feature/PAC-700-T-491-demo-reset-command-entrypoint`            |
| **PAC-701** | T-492       | `feature/PAC-701-T-492-demo-reset-safety-checks`                 |
| **PAC-702** | T-493       | `feature/PAC-702-T-493-github-actions-lint-check`                |
| **PAC-703** | T-494       | `feature/PAC-703-T-494-github-actions-type-check`                |
| **PAC-704** | T-495       | `feature/PAC-704-T-495-github-actions-frontend-build`            |
| **PAC-705** | T-496       | `feature/PAC-705-T-496-github-actions-backend-build`             |
| **PAC-706** | T-497       | `feature/PAC-706-T-497-github-actions-unit-test-check`           |
| **PAC-707** | T-498       | `feature/PAC-707-T-498-github-actions-integration-test-check`    |
| **PAC-708** | T-499       | `feature/PAC-708-T-499-prisma-schema-validation-check`           |
| **PAC-709** | T-500       | `feature/PAC-709-T-500-prisma-migration-check`                   |
| **PAC-710** | T-501       | `feature/PAC-710-T-501-ci-guard-no-destructive-demo-tests`       |
| **PAC-711** | T-502       | `docs/PAC-711-T-502-ci-branch-protection-notes`                  |
| **PAC-712** | T-503       | `feature/PAC-712-T-503-local-only-demo-reset-guard`              |
| **PAC-713** | T-504       | `test/PAC-713-T-504-chrome-desktop-verification-checklist`       |
| **PAC-714** | T-505       | `test/PAC-714-T-505-basic-responsive-checklist`                  |
| **PAC-715** | T-506       | `docs/PAC-715-T-506-project-readme-setup-section`                |
| **PAC-716** | T-507       | `docs/PAC-716-T-507-backend-setup-run-instructions`              |
| **PAC-717** | T-508       | `docs/PAC-717-T-508-frontend-setup-run-instructions`             |
| **PAC-718** | T-509       | `docs/PAC-718-T-509-database-migration-seed-instructions`        |
| **PAC-719** | T-510       | `docs/PAC-719-T-510-supabase-auth-setup-notes`                   |
| **PAC-720** | T-511       | `docs/PAC-720-T-511-neo4j-setup-graph-rebuild-notes`             |
| **PAC-721** | T-512       | `docs/PAC-721-T-512-ai-provider-mockai-setup-notes`              |
| **PAC-722** | T-513       | `docs/PAC-722-T-513-demo-account-guide`                          |
| **PAC-723** | T-514       | `docs/PAC-723-T-514-demo-script-login-role-switching`            |
| **PAC-724** | T-515       | `docs/PAC-724-T-515-demo-script-stock-import-medicinebatch`      |
| **PAC-725** | T-516       | `docs/PAC-725-T-516-demo-script-pos-checkout`                    |
| **PAC-726** | T-517       | `docs/PAC-726-T-517-demo-script-interaction-alert-high-note`     |
| **PAC-727** | T-518       | `docs/PAC-727-T-518-demo-script-ai-copilot-audit`                |
| **PAC-728** | T-519       | `docs/PAC-728-T-519-demo-script-graph-sync-rag`                  |
| **PAC-729** | T-520       | `docs/PAC-729-T-520-demo-script-reports-settings`                |
| **PAC-730** | T-521       | `docs/PAC-730-T-521-mvp-traceability-matrix-summary`             |
| **PAC-731** | T-522       | `docs/PAC-731-T-522-release-demo-readiness-checklist`            |
| **PAC-732** | T-523       | `docs/PAC-732-T-523-known-limitations-out-of-scope`              |
| **PAC-733** | T-524       | `docs/PAC-733-T-524-contingency-screenshots-list`                |
| **PAC-734** | T-525       | `docs/PAC-734-T-525-final-smoke-test-report-template`            |
| **PAC-735** | T-526       | `feature/PAC-735-T-526-admin-graph-sync-status-list-ui`          |
| **PAC-736** | T-527       | `feature/PAC-736-T-527-graph-sync-job-detail-ui`                 |
| **PAC-737** | T-528       | `feature/PAC-737-T-528-admin-manual-graph-retry`                 |
| **PAC-738** | T-529       | `feature/PAC-738-T-529-admin-manual-graph-rebuild`               |
| **PAC-739** | T-530       | `feature/PAC-739-T-530-graph-sync-status-permission-checks`      |
| **PAC-740** | T-531       | `feature/PAC-740-T-531-readonly-graph-explorer-ui`               |
| **PAC-741** | T-532       | `feature/PAC-741-T-532-graph-explorer-node-detail-panel`         |
| **PAC-742** | T-533       | `feature/PAC-742-T-533-graph-explorer-relationship-detail-panel` |
| **PAC-743** | T-534       | `feature/PAC-743-T-534-graph-explorer-permission-checks`         |
| **PAC-744** | T-535       | `feature/PAC-744-T-535-graph-explorer-allowlisted-templates`     |
| **PAC-745** | T-536       | `feature/PAC-745-T-536-ai-provider-settings-ui`                  |
| **PAC-746** | T-537       | `feature/PAC-746-T-537-ai-model-configuration-ui`                |
| **PAC-747** | T-538       | `feature/PAC-747-T-538-prompt-management-list-ui`                |
| **PAC-748** | T-539       | `feature/PAC-748-T-539-prompt-management-version-detail-ui`      |
| **PAC-749** | T-540       | `feature/PAC-749-T-540-prompt-approval-status-display`           |
| **PAC-750** | T-541       | `feature/PAC-750-T-541-system-audit-log-ui`                      |
| **PAC-751** | T-542       | `feature/PAC-751-T-542-system-audit-log-filters`                 |
| **PAC-752** | T-543       | `feature/PAC-752-T-543-supabase-storage-medicine-image-upload`   |
| **PAC-753** | T-544       | `feature/PAC-753-T-544-medicine-image-upload-ui`                 |
| **PAC-754** | T-545       | `feature/PAC-754-T-545-supabase-storage-file-validation`         |
| **PAC-755** | T-546       | `feature/PAC-755-T-546-supabase-realtime-inventory-listener`     |
| **PAC-756** | T-547       | `feature/PAC-756-T-547-realtime-pos-stock-refresh`               |
| **PAC-757** | T-548       | `feature/PAC-757-T-548-realtime-fallback-polling`                |
| **PAC-758** | T-549       | `feature/PAC-758-T-549-notification-center-ui`                   |
| **PAC-759** | T-550       | `feature/PAC-759-T-550-low-stock-notification-generation`        |
| **PAC-760** | T-551       | `feature/PAC-760-T-551-near-expiry-notification-generation`      |
| **PAC-761** | T-552       | `feature/PAC-761-T-552-read-unread-notification-state`           |
| **PAC-762** | T-553       | `feature/PAC-762-T-553-scheduled-near-expiry-scan-job`           |
| **PAC-763** | T-554       | `feature/PAC-763-T-554-ai-business-report-narrative-api`         |
| **PAC-764** | T-555       | `feature/PAC-764-T-555-ai-business-report-narrative-ui`          |
| **PAC-765** | T-556       | `docs/PAC-765-T-556-full-customer-management-future-scope`       |
| **PAC-766** | T-557       | `docs/PAC-766-T-557-customer-profile-crud-future-scope`          |
| **PAC-767** | T-558       | `docs/PAC-767-T-558-customer-purchase-history-expansion`         |
| **PAC-768** | T-559       | `docs/PAC-768-T-559-online-commerce-storefront-future`           |
| **PAC-769** | T-560       | `docs/PAC-769-T-560-online-cart-wishlist-future`                 |
| **PAC-770** | T-561       | `docs/PAC-770-T-561-online-checkout-separation-pos`              |
| **PAC-771** | T-562       | `docs/PAC-771-T-562-product-variant-catalog-future`              |
| **PAC-772** | T-563       | `docs/PAC-772-T-563-product-images-documents-commercial`         |
| **PAC-773** | T-564       | `docs/PAC-773-T-564-real-catalog-data-import-future`             |
| **PAC-774** | T-565       | `docs/PAC-774-T-565-multistore-future-scope`                     |
| **PAC-775** | T-566       | `docs/PAC-775-T-566-default-store-assumption-mvp`                |
| **PAC-776** | T-567       | `docs/PAC-776-T-567-multiwarehouse-future-scope`                 |
| **PAC-777** | T-568       | `docs/PAC-777-T-568-default-warehouse-assumption-mvp`            |
| **PAC-778** | T-569       | `docs/PAC-778-T-569-stock-transfer-future-workflow`              |
| **PAC-779** | T-570       | `docs/PAC-779-T-570-stock-transfer-audit-future`                 |
| **PAC-780** | T-571       | `docs/PAC-780-T-571-forecasting-reorder-future-scope`            |
| **PAC-781** | T-572       | `docs/PAC-781-T-572-forecast-data-requirements-limitations`      |
| **PAC-782** | T-573       | `docs/PAC-782-T-573-promotion-coupon-future-scope`               |
| **PAC-783** | T-574       | `docs/PAC-783-T-574-discount-not-in-mvp-checkout`                |
| **PAC-784** | T-575       | `docs/PAC-784-T-575-shipping-delivery-future-scope`              |
| **PAC-785** | T-576       | `docs/PAC-785-T-576-delivery-status-future-workflow`             |
| **PAC-786** | T-577       | `docs/PAC-786-T-577-review-cms-future-scope`                     |
| **PAC-787** | T-578       | `docs/PAC-787-T-578-product-review-moderation-future`            |
| **PAC-788** | T-579       | `docs/PAC-788-T-579-commercial-expansion-dependency-map`         |
| **PAC-789** | T-580       | `docs/PAC-789-T-580-final-ai-agent-out-of-scope-guardrails`      |

---

## 10. Branch merge flow

### 10.1. Flow chuẩn cho MVP task

```text
feature/PAC-xxx-T-xxx-short-description
→ Pull Request
→ develop
→ release/demo-freeze-2026-06-16
→ main
```

### 10.2. Flow cho test task

```text
test/PAC-xxx-T-xxx-short-description
→ Pull Request
→ develop
```

### 10.3. Flow cho docs task

```text
docs/PAC-xxx-T-xxx-short-description
→ Pull Request
→ develop
```

### 10.4. Flow cho bugfix trước demo

```text
bugfix/PAC-xxx-T-xxx-short-description
→ Pull Request
→ develop
→ release/demo-freeze-2026-06-16
```

### 10.5. Flow cho hotfix sau khi đã release

```text
hotfix/PAC-xxx-short-description
→ Pull Request
→ main
→ back-merge vào develop
```

---

## 11. Quy tắc branch theo scope

| Scope                         |        Task range | Branch type chính            | Ghi chú                        |
| ----------------------------- | ----------------: | ---------------------------- | ------------------------------ |
| MVP Implementation            | `T-001` → `T-435` | `feature/`, `test/`, `docs/` | Bắt buộc cho MVP               |
| MVP Testing / Release         | `T-436` → `T-525` | `test/`, `feature/`, `docs/` | Bắt buộc cho release readiness |
| Should-have / Advanced        | `T-526` → `T-555` | `feature/`                   | Không chặn MVP                 |
| Future / Commercial Expansion | `T-556` → `T-580` | `docs/`                      | Không code trong MVP           |

---

## 12. Out-of-scope branch guard

Không tạo branch code MVP cho các nội dung sau:

```text
custom-jwt-auth
password-hash-in-postgresql
aggregate-inventory-source-of-truth
medicine-level-interaction-rule-source-of-truth
mockai-only-mvp
neo4j-source-of-truth
graph-decides-checkout
ai-diagnosis
ai-prescribing
ai-dosage-advice
online-commerce-mvp
productvariant-sales-key-mvp
multi-store-workflow-mvp
multi-warehouse-workflow-mvp
stock-transfer-mvp
promotion-coupon-mvp
shipping-delivery-mvp
review-cms-mvp
```

Nếu cần ghi nhận các nội dung này, chỉ tạo branch dạng `docs/` ở Future scope.

---

## 13. AI Agent branch instructions

Khi AI agent bắt đầu làm một issue, phải làm theo quy tắc:

1. Đọc Jira issue key thật, ví dụ `PAC-469`.
2. Đọc logical task key, ví dụ `T-260`.
3. Tạo branch đúng format:

```text
feature/PAC-469-T-260-checkout-controller
```

4. Không tạo branch thiếu Jira key.
5. Không dùng `PAI`.
6. Không dùng tiếng Việt có dấu trong branch name.
7. Không gom nhiều task không liên quan vào một branch.
8. Mỗi PR phải link đúng Epic / Story / Task.
9. Không merge trực tiếp vào `main`.
10. Không code Future scope trong MVP.

---

## 14. Ví dụ quy trình làm việc đầy đủ

Ví dụ với Task:

```text
PAC-TASK-260 - Implement CheckoutController POST /checkout
```

Jira key thật:

```text
PAC-469
```

Branch cần tạo:

```text
feature/PAC-469-T-260-checkout-controller
```

Commit message:

```text
PAC-469 T-260: implement checkout controller
```

PR title:

```text
PAC-469 T-260: Implement CheckoutController POST /checkout
```

PR target:

```text
develop
```

PR description:

```text
Related Epic: PAC-11 EPIC-11 Checkout FEFO Payment Invoice
Related Story: PAC-122 US-83 Checkout transaction
Related Task: PAC-469 T-260 Implement CheckoutController POST /checkout
Scope: MVP
Component: POS & Checkout
What changed:
- Added CheckoutController
- Added POST /checkout endpoint
- Connected controller to CheckoutService

How tested:
- Unit test
- Integration test
- Manual API call

Risk:
- Checkout transaction must not create payment/invoice outside transaction

Rollback notes:
- Revert controller and route changes
```

---

## 15. Kết luận

Tài liệu này định nghĩa đủ:

```text
39 Epic branches
170 Story branches
580 Task branches
```

Tổng cộng:

```text
789 issue branches
```

Cộng thêm 3 branch hệ thống:

```text
main
develop
release/demo-freeze-2026-06-16
```

Nguyên tắc quan trọng nhất:

```text
Mỗi branch phải có Jira issue key PAC-xxx để Jira tự liên kết được.
Không dùng PAI.
Không dùng tiếng Việt có dấu trong branch name.
Không code Future scope trong MVP.
Không merge trực tiếp vào main.
```
