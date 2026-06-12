# Use Case ID Registry v1

**Dự án:** PharmaAssist AI Intelligence
**Loại tài liệu:** Use Case ID Registry
**Trạng thái:** Draft v1
**Ngôn ngữ chính:** Tiếng Việt
**Thuật ngữ kỹ thuật:** Giữ tiếng Anh khi cần

---

## 1. Mục đích

Tài liệu này định nghĩa danh sách **Use Case ID** chính thức cho dự án PharmaAssist AI Intelligence.

Use Case ID Registry dùng để:

1. Chuẩn hóa mã Use Case cho toàn bộ tài liệu.
2. Kết nối Requirement ID với Use Case ID.
3. Chuẩn bị cho Test Case ID Registry.
4. Chuẩn bị cho Traceability Matrix tổng.
5. Chuẩn bị revise Jira Epics / Stories / Tasks.
6. Chuẩn bị Gap Analysis giữa code hiện tại và documentation.

Tài liệu này **không thay thế** Document 08 — Use Case Specification.
Tài liệu này chỉ là registry/bảng mã hóa use case.

---

## 2. Quy ước đặt mã Use Case

### 2.1. Format

```text
UC-[MODULE]-[NUMBER]
```

Ví dụ:

```text
UC-AUTH-01
UC-MED-01
UC-STI-01
UC-CHK-01
UC-AIC-01
UC-GRG-01
```

### 2.2. Module Prefix

| Prefix | Module / Area                      |
| ------ | ---------------------------------- |
| AUTH   | Authentication                     |
| USER   | User / Staff Account Management    |
| RBAC   | Roles, Permissions & Authorization |
| MED    | Medicine Management                |
| ACT    | ActiveIngredient Management        |
| SUP    | Supplier Management                |
| BAT    | MedicineBatch & Inventory Summary  |
| STI    | Stock Import                       |
| ADJ    | Inventory Adjustment               |
| POS    | POS Draft Order                    |
| DRG    | DrugInteraction Rule               |
| ALT    | InteractionAlert                   |
| CHK    | Checkout                           |
| PAY    | Payment                            |
| INV    | Invoice                            |
| AIC    | AI Copilot                         |
| AIG    | AI Guardrail                       |
| AIA    | AI Audit                           |
| GSY    | Graph Sync                         |
| GRG    | Graph-RAG                          |
| RPT    | Reports                            |
| SET    | System Settings                    |
| DMO    | Demo Data & Demo Reset             |
| AUD    | System Audit                       |
| DEV    | DevOps / CI / Setup                |
| TST    | Testing                            |

---

## 3. Actor Registry

| Actor ID      | Actor Name                | Mô tả                                                                                            | Scope                |
| ------------- | ------------------------- | ------------------------------------------------------------------------------------------------ | -------------------- |
| ACT-ADMIN     | Admin                     | Người quản trị hệ thống, có quyền quản lý users, roles, medicines, rules, reports và settings.   | MVP                  |
| ACT-STAFF     | Staff                     | Nhân viên bán hàng/POS, tạo Draft Order, xử lý InteractionAlert theo scope, checkout order.      | MVP                  |
| ACT-WAREHOUSE | Warehouse                 | Nhân sự kho, quản lý supplier theo quyền, stock import, inventory adjustment, inventory reports. | MVP                  |
| ACT-WALKIN    | Walk-in Customer          | Khách mua hàng tại quầy, không phải authenticated user trong MVP.                                | MVP supporting actor |
| ACT-SUPABASE  | Supabase Auth             | Dịch vụ xác thực bên ngoài.                                                                      | MVP external system  |
| ACT-GOOGLEAI  | Google AI Provider        | AI provider chính cho AI Copilot.                                                                | MVP external system  |
| ACT-MOCKAI    | MockAI                    | Fallback provider khi Google AI không khả dụng hoặc cấu hình fallback được bật.                  | MVP fallback         |
| ACT-NEO4J     | Neo4j                     | Graph database dùng làm graph projection.                                                        | MVP external system  |
| ACT-SCHEDULER | System Scheduler / Worker | Worker nền cho Graph Sync, demo reset checks, smoke checks nếu có.                               | MVP system actor     |
| ACT-TESTER    | Tester                    | Người kiểm thử hệ thống, chạy test/smoke test và báo cáo kết quả.                                | MVP project actor    |
| ACT-LEADER    | Project Leader            | Người approve test exit/release và scope decisions.                                              | MVP project actor    |
| ACT-DEMOOWNER | Release/Demo Owner        | Người phụ trách release/demo flow nếu được phân công.                                            | MVP project actor    |

---

## 4. Scope Classification

| Scope                         | Ý nghĩa                                                          |
| ----------------------------- | ---------------------------------------------------------------- |
| MVP                           | Use case bắt buộc cho phiên bản demo/chính thức của đồ án        |
| Should-have                   | Nên có nếu đủ thời gian, không chặn MVP                          |
| Future / Commercial Expansion | Dành cho mở rộng thương mại hoặc phiên bản sau                   |
| Out of Scope                  | Không làm trong MVP và không nên đưa vào implementation hiện tại |

---

## 5. Priority Classification

| Priority | Ý nghĩa                                     |
| -------- | ------------------------------------------- |
| P0       | Critical path, ảnh hưởng trực tiếp MVP/demo |
| P1       | Core use case, cần có để hệ thống đầy đủ    |
| P2       | Supporting use case, hỗ trợ vận hành/demo   |
| P3       | Enhancement hoặc future-facing use case     |

---

# 6. Use Case ID Registry

---

## 6.1. Authentication Use Cases

| Use Case ID | Use Case Name             | Actor chính             | Mô tả ngắn                                                                          | Scope | Priority | Linked Requirement IDs             |
| ----------- | ------------------------- | ----------------------- | ----------------------------------------------------------------------------------- | ----- | -------- | ---------------------------------- |
| UC-AUTH-01  | Đăng nhập hệ thống        | Admin, Staff, Warehouse | Người dùng nội bộ đăng nhập bằng Supabase Auth.                                     | MVP   | P0       | FR-AUTH-01, FR-AUTH-03, FR-AUTH-06 |
| UC-AUTH-02  | Đăng xuất hệ thống        | Admin, Staff, Warehouse | Người dùng kết thúc phiên làm việc hiện tại.                                        | MVP   | P1       | FR-AUTH-02                         |
| UC-AUTH-03  | Đổi mật khẩu lần đầu      | Staff                   | Staff mới có `must_change_password=true` đổi mật khẩu trong lần đăng nhập đầu tiên. | MVP   | P0       | FR-AUTH-04                         |
| UC-AUTH-04  | Xác thực session hiện tại | System, Supabase Auth   | Backend xác thực Supabase session/token để lấy user hiện tại.                       | MVP   | P0       | FR-AUTH-03, FR-AUTH-05             |

---

## 6.2. User / Staff Management Use Cases

| Use Case ID | Use Case Name                   | Actor chính | Mô tả ngắn                                                                                 | Scope | Priority | Linked Requirement IDs             |
| ----------- | ------------------------------- | ----------- | ------------------------------------------------------------------------------------------ | ----- | -------- | ---------------------------------- |
| UC-USER-01  | Tạo tài khoản staff             | Admin       | Admin tạo tài khoản staff bằng email và temporary password qua Supabase Admin integration. | MVP   | P0       | FR-USER-01, FR-USER-02, FR-AUTH-04 |
| UC-USER-02  | Cập nhật thông tin user profile | Admin       | Admin cập nhật thông tin hồ sơ user nội bộ.                                                | MVP   | P1       | FR-USER-01, FR-USER-04             |
| UC-USER-03  | Vô hiệu hóa user                | Admin       | Admin deactivate user nội bộ khi cần.                                                      | MVP   | P1       | FR-USER-04, FR-USER-05             |
| UC-USER-04  | Xem danh sách user nội bộ       | Admin       | Admin xem danh sách user/staff trong hệ thống.                                             | MVP   | P1       | FR-USER-01                         |
| UC-USER-05  | Ghi audit khi thay đổi user     | System      | Hệ thống ghi audit log khi có thay đổi user/role quan trọng.                               | MVP   | P1       | FR-USER-05, FR-AUD-02              |

---

## 6.3. RBAC & Authorization Use Cases

| Use Case ID | Use Case Name                        | Actor chính | Mô tả ngắn                                                               | Scope | Priority | Linked Requirement IDs             |
| ----------- | ------------------------------------ | ----------- | ------------------------------------------------------------------------ | ----- | -------- | ---------------------------------- |
| UC-RBAC-01  | Gán role cho user                    | Admin       | Admin gán một hoặc nhiều role cho user.                                  | MVP   | P0       | FR-USER-03, FR-RBAC-01             |
| UC-RBAC-02  | Quản lý permission mapping           | Admin       | Admin/seed cấu hình role-permission mapping theo baseline.               | MVP   | P0       | FR-RBAC-02, FR-RBAC-03             |
| UC-RBAC-03  | Enforce API authorization            | System      | Backend enforce permission và ownership scope cho API.                   | MVP   | P0       | FR-RBAC-02, FR-RBAC-07, FR-RBAC-08 |
| UC-RBAC-04  | Enforce UI authorization             | System      | Frontend ẩn/disable chức năng user không có quyền.                       | MVP   | P1       | FR-RBAC-06                         |
| UC-RBAC-05  | Kiểm tra ownership scope của Staff   | System      | Hệ thống bảo đảm Staff chỉ xem/thao tác order trong phạm vi được phép.   | MVP   | P0       | FR-RBAC-04, FR-RBAC-08             |
| UC-RBAC-06  | Chặn Warehouse khỏi InteractionAlert | System      | Hệ thống không cho Warehouse truy cập drug interaction alerts trong MVP. | MVP   | P0       | FR-RBAC-05, FR-ALT-11              |

---

## 6.4. Medicine Management Use Cases

| Use Case ID | Use Case Name                      | Actor chính             | Mô tả ngắn                                                      | Scope | Priority | Linked Requirement IDs          |
| ----------- | ---------------------------------- | ----------------------- | --------------------------------------------------------------- | ----- | -------- | ------------------------------- |
| UC-MED-01   | Tạo Medicine                       | Admin                   | Admin tạo Medicine với dữ liệu hợp lệ.                          | MVP   | P0       | FR-MED-01, FR-MED-05            |
| UC-MED-02   | Cập nhật Medicine                  | Admin                   | Admin cập nhật thông tin Medicine.                              | MVP   | P1       | FR-MED-02                       |
| UC-MED-03   | Xem danh sách Medicine             | Admin, Staff, Warehouse | User xem danh sách Medicine theo quyền.                         | MVP   | P0       | FR-MED-03                       |
| UC-MED-04   | Tìm kiếm Medicine                  | Admin, Staff, Warehouse | User tìm kiếm Medicine theo tên/mã/thông tin chính.             | MVP   | P0       | FR-MED-04                       |
| UC-MED-05   | Deactivate Medicine                | Admin                   | Admin deactivate Medicine thay vì xóa cứng.                     | MVP   | P1       | FR-MED-06                       |
| UC-MED-06   | Đồng bộ Medicine sang Graph Outbox | System                  | Khi Medicine thay đổi, hệ thống tạo sự kiện phục vụ Graph Sync. | MVP   | P1       | FR-MED-07, FR-GSY-03, FR-GSY-09 |

---

## 6.5. ActiveIngredient Use Cases

| Use Case ID | Use Case Name                                      | Actor chính   | Mô tả ngắn                                                                              | Scope | Priority | Linked Requirement IDs          |
| ----------- | -------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------- | ----- | -------- | ------------------------------- |
| UC-ACT-01   | Tạo ActiveIngredient                               | Admin         | Admin tạo ActiveIngredient chính thức.                                                  | MVP   | P0       | FR-ACT-01                       |
| UC-ACT-02   | Cập nhật ActiveIngredient                          | Admin         | Admin cập nhật ActiveIngredient.                                                        | MVP   | P1       | FR-ACT-02                       |
| UC-ACT-03   | Deactivate ActiveIngredient                        | Admin         | Admin deactivate ActiveIngredient thay vì xóa cứng.                                     | MVP   | P1       | FR-ACT-03                       |
| UC-ACT-04   | Mapping Medicine với ActiveIngredient              | Admin         | Admin mapping Medicine với một hoặc nhiều ActiveIngredient.                             | MVP   | P0       | FR-ACT-04, FR-ACT-05            |
| UC-ACT-05   | Validate ingredient mapping                        | System        | Hệ thống validate mapping Medicine–ActiveIngredient khi lưu form.                       | MVP   | P0       | FR-ACT-05                       |
| UC-ACT-06   | Đồng bộ ActiveIngredient/mapping sang Graph Outbox | System        | Khi ActiveIngredient hoặc mapping thay đổi, hệ thống tạo Graph Sync event.              | MVP   | P1       | FR-ACT-06, FR-GSY-03, FR-GSY-10 |
| UC-ACT-07   | Loại bỏ scraped ingredient không chính thức        | Admin, System | Không tự động đưa toàn bộ scraped ingredient strings thành ActiveIngredient chính thức. | MVP   | P0       | FR-ACT-07                       |

---

## 6.6. Supplier Management Use Cases

| Use Case ID | Use Case Name          | Actor chính      | Mô tả ngắn                                               | Scope | Priority | Linked Requirement IDs |
| ----------- | ---------------------- | ---------------- | -------------------------------------------------------- | ----- | -------- | ---------------------- |
| UC-SUP-01   | Tạo Supplier           | Admin, Warehouse | Admin/Warehouse tạo Supplier theo quyền.                 | MVP   | P0       | FR-SUP-01              |
| UC-SUP-02   | Cập nhật Supplier      | Admin, Warehouse | Admin/Warehouse cập nhật Supplier theo quyền.            | MVP   | P1       | FR-SUP-02              |
| UC-SUP-03   | Xem danh sách Supplier | Admin, Warehouse | Admin/Warehouse xem Supplier.                            | MVP   | P0       | FR-SUP-03              |
| UC-SUP-04   | Deactivate Supplier    | Admin            | Chỉ Admin được deactivate Supplier.                      | MVP   | P0       | FR-SUP-04              |
| UC-SUP-05   | Ghi audit Supplier     | System           | Hệ thống ghi audit cho các thay đổi Supplier quan trọng. | MVP   | P1       | FR-SUP-05, FR-AUD-03   |

---

## 6.7. MedicineBatch & Inventory Summary Use Cases

| Use Case ID | Use Case Name                            | Actor chính             | Mô tả ngắn                                                                 | Scope | Priority | Linked Requirement IDs          |
| ----------- | ---------------------------------------- | ----------------------- | -------------------------------------------------------------------------- | ----- | -------- | ------------------------------- |
| UC-BAT-01   | Xem Inventory Summary                    | Admin, Warehouse, Staff | User xem tồn kho tổng hợp được derived từ MedicineBatch theo quyền.        | MVP   | P0       | FR-BAT-01, FR-BAT-08            |
| UC-BAT-02   | Xem Batch Detail                         | Admin, Warehouse        | User xem chi tiết batch dưới Inventory.                                    | MVP   | P1       | FR-BAT-02, FR-BAT-03, FR-BAT-09 |
| UC-BAT-03   | Tính sellable quantity                   | System                  | Hệ thống tính sellable quantity, loại trừ expired batches.                 | MVP   | P0       | FR-BAT-05                       |
| UC-BAT-04   | Tính low-stock                           | System                  | Hệ thống tính low-stock từ sellable quantity.                              | MVP   | P0       | FR-BAT-06                       |
| UC-BAT-05   | Tính near-expiry                         | System                  | Hệ thống tính near-expiry theo threshold cấu hình, mặc định 90 ngày.       | MVP   | P1       | FR-BAT-07, FR-SET-01            |
| UC-BAT-06   | Validate batch uniqueness                | System                  | Hệ thống kiểm tra uniqueness theo `medicine_id + normalized_batch_number`. | MVP   | P0       | FR-BAT-04                       |
| UC-BAT-07   | Chặn aggregate inventory source of truth | System                  | Hệ thống không dùng aggregate inventory làm nguồn thật của tồn kho.        | MVP   | P0       | FR-BAT-01, FR-BAT-08            |

---

## 6.8. Stock Import Use Cases

| Use Case ID | Use Case Name                           | Actor chính      | Mô tả ngắn                                                                | Scope | Priority | Linked Requirement IDs          |
| ----------- | --------------------------------------- | ---------------- | ------------------------------------------------------------------------- | ----- | -------- | ------------------------------- |
| UC-STI-01   | Tạo Stock Import Draft                  | Admin, Warehouse | User tạo phiếu nhập kho ở trạng thái draft/pending confirmation.          | MVP   | P0       | FR-STI-01                       |
| UC-STI-02   | Thêm dòng nhập kho                      | Admin, Warehouse | User thêm Medicine, batch number, expiry date và quantity vào phiếu nhập. | MVP   | P0       | FR-STI-01, FR-BAT-02, FR-BAT-03 |
| UC-STI-03   | Confirm Stock Import                    | Admin, Warehouse | User confirm Stock Import theo quyền.                                     | MVP   | P0       | FR-STI-02, FR-STI-03            |
| UC-STI-04   | Merge batch cùng expiry                 | System           | Hệ thống merge quantity nếu cùng Medicine, batch number và expiry date.   | MVP   | P0       | FR-STI-04                       |
| UC-STI-05   | Reject batch trùng số nhưng khác expiry | System           | Hệ thống reject nếu cùng Medicine và batch number nhưng expiry date khác. | MVP   | P0       | FR-STI-05                       |
| UC-STI-06   | Khóa Stock Import đã confirm            | System           | Stock Import đã confirm không được sửa tùy tiện.                          | MVP   | P1       | FR-STI-06                       |
| UC-STI-07   | Ghi audit Stock Import                  | System           | Hệ thống ghi audit khi confirm Stock Import.                              | MVP   | P1       | FR-STI-07, FR-AUD-04            |

---

## 6.9. Inventory Adjustment Use Cases

| Use Case ID | Use Case Name                            | Actor chính      | Mô tả ngắn                                                                     | Scope       | Priority | Linked Requirement IDs |
| ----------- | ---------------------------------------- | ---------------- | ------------------------------------------------------------------------------ | ----------- | -------- | ---------------------- |
| UC-ADJ-01   | Tạo Inventory Adjustment                 | Admin, Warehouse | User tạo phiếu điều chỉnh tồn kho.                                             | MVP         | P0       | FR-ADJ-01              |
| UC-ADJ-02   | Nhập reason điều chỉnh                   | Admin, Warehouse | User phải nhập reason khi tạo adjustment.                                      | MVP         | P0       | FR-ADJ-02              |
| UC-ADJ-03   | Confirm Inventory Adjustment             | Admin, Warehouse | User confirm adjustment theo quyền.                                            | MVP         | P0       | FR-ADJ-03              |
| UC-ADJ-04   | Cập nhật MedicineBatch qua adjustment    | System           | Hệ thống cập nhật MedicineBatch thông qua workflow adjustment.                 | MVP         | P0       | FR-ADJ-05              |
| UC-ADJ-05   | Chặn direct quantity edit                | System           | Hệ thống không cho Warehouse sửa trực tiếp quantity ngoài adjustment workflow. | MVP         | P0       | FR-ADJ-04              |
| UC-ADJ-06   | Ghi audit Inventory Adjustment           | System           | Hệ thống ghi audit khi confirm adjustment.                                     | MVP         | P0       | FR-ADJ-06, FR-AUD-05   |
| UC-ADJ-07   | Xử lý correction/cancellation adjustment | Admin            | Admin xử lý correction/cancellation workflow nếu triển khai.                   | Should-have | P2       | FR-ADJ-07              |

---

## 6.10. POS Draft Order Use Cases

| Use Case ID | Use Case Name                         | Actor chính                    | Mô tả ngắn                                                              | Scope | Priority | Linked Requirement IDs |
| ----------- | ------------------------------------- | ------------------------------ | ----------------------------------------------------------------------- | ----- | -------- | ---------------------- |
| UC-POS-01   | Tạo Draft Order                       | Staff, Admin                   | Staff/Admin tạo đơn bán hàng ở trạng thái DRAFT.                        | MVP   | P0       | FR-POS-01              |
| UC-POS-02   | Thêm Medicine vào Draft Order         | Staff, Admin                   | Staff/Admin thêm Medicine vào đơn nháp.                                 | MVP   | P0       | FR-POS-02              |
| UC-POS-03   | Cập nhật số lượng item                | Staff, Admin                   | Staff/Admin cập nhật quantity của item trong Draft Order.               | MVP   | P0       | FR-POS-03              |
| UC-POS-04   | Xóa item khỏi Draft Order             | Staff, Admin                   | Staff/Admin xóa item khỏi Draft Order.                                  | MVP   | P1       | FR-POS-04              |
| UC-POS-05   | Kiểm tra sellable stock trong POS     | System                         | Hệ thống cảnh báo nếu số lượng yêu cầu vượt sellable stock.             | MVP   | P0       | FR-POS-05, FR-BAT-05   |
| UC-POS-06   | Bán hàng cho walk-in customer         | Staff, Admin, Walk-in Customer | POS hỗ trợ khách vãng lai không cần full Customer Management.           | MVP   | P0       | FR-POS-06              |
| UC-POS-07   | Cancel Draft Order                    | Staff, Admin                   | Staff cancel order trong ownership scope; Admin cancel mọi Draft Order. | MVP   | P1       | FR-POS-07              |
| UC-POS-08   | Giữ Draft Order khi checkout thất bại | System                         | Khi checkout validation thất bại, Draft Order vẫn được giữ lại.         | MVP   | P0       | FR-POS-08              |

---

## 6.11. DrugInteraction Rule Use Cases

| Use Case ID | Use Case Name                                  | Actor chính | Mô tả ngắn                                                                    | Scope | Priority | Linked Requirement IDs |
| ----------- | ---------------------------------------------- | ----------- | ----------------------------------------------------------------------------- | ----- | -------- | ---------------------- |
| UC-DRG-01   | Tạo DrugInteraction Rule                       | Admin       | Admin tạo rule tương tác thuốc ở cấp ActiveIngredient–ActiveIngredient.       | MVP   | P0       | FR-DRG-01, FR-DRG-02   |
| UC-DRG-02   | Cập nhật DrugInteraction Rule                  | Admin       | Admin cập nhật rule tương tác thuốc.                                          | MVP   | P1       | FR-DRG-03              |
| UC-DRG-03   | Deactivate DrugInteraction Rule                | Admin       | Admin deactivate rule thay vì xóa cứng.                                       | MVP   | P1       | FR-DRG-04              |
| UC-DRG-04   | Validate severity enum                         | System      | Hệ thống chỉ cho phép LOW, MEDIUM, HIGH trong MVP.                            | MVP   | P0       | FR-DRG-05, FR-DRG-06   |
| UC-DRG-05   | Suy ra Medicine-level interaction              | System      | Hệ thống suy ra interaction giữa Medicine thông qua ActiveIngredient mapping. | MVP   | P0       | FR-DRG-07              |
| UC-DRG-06   | Đồng bộ DrugInteraction Rule sang Graph Outbox | System      | Khi rule thay đổi, hệ thống tạo Graph Sync event.                             | MVP   | P1       | FR-DRG-08, FR-GSY-11   |

---

## 6.12. InteractionAlert Use Cases

| Use Case ID | Use Case Name                            | Actor chính          | Mô tả ngắn                                                                              | Scope | Priority | Linked Requirement IDs          |
| ----------- | ---------------------------------------- | -------------------- | --------------------------------------------------------------------------------------- | ----- | -------- | ------------------------------- |
| UC-ALT-01   | Kiểm tra interaction trong order         | System               | Hệ thống kiểm tra interaction dựa trên Medicine trong order và ActiveIngredient rules.  | MVP   | P0       | FR-DRG-01, FR-DRG-07, FR-ALT-01 |
| UC-ALT-02   | Hiển thị InteractionAlert                | System, Staff, Admin | Hệ thống hiển thị alert trong POS/order flow.                                           | MVP   | P0       | FR-ALT-01, FR-ALT-04, FR-ALT-05 |
| UC-ALT-03   | Persist InteractionAlert                 | System               | Hệ thống lưu alert đã hiển thị vào database.                                            | MVP   | P0       | FR-ALT-01, FR-ALT-02            |
| UC-ALT-04   | Cập nhật display_count                   | System               | Khi cùng alert hiển thị lại, hệ thống tăng display_count và cập nhật last_displayed_at. | MVP   | P0       | FR-ALT-03                       |
| UC-ALT-05   | Acknowledge HIGH alert                   | Staff, Admin         | Staff/Admin acknowledgement HIGH alert trước checkout.                                  | MVP   | P0       | FR-ALT-06                       |
| UC-ALT-06   | Nhập consultation note cho HIGH alert    | Staff, Admin         | Staff/Admin nhập consultation note bắt buộc cho HIGH alert.                             | MVP   | P0       | FR-ALT-07, FR-ALT-09            |
| UC-ALT-07   | Block checkout khi HIGH alert chưa xử lý | System               | Hệ thống chặn checkout nếu HIGH alert chưa acknowledgement và consultation note.        | MVP   | P0       | FR-ALT-08                       |
| UC-ALT-08   | Xem InteractionAlert History             | Admin, Staff         | User xem lịch sử alert theo quyền và ownership scope.                                   | MVP   | P1       | FR-ALT-10, FR-RBAC-08           |
| UC-ALT-09   | Chặn Warehouse truy cập alert            | System               | Hệ thống từ chối Warehouse truy cập InteractionAlert.                                   | MVP   | P0       | FR-ALT-11, FR-RBAC-05           |
| UC-ALT-10   | Ghi audit evidence HIGH alert            | System               | Hệ thống lưu/trace acknowledgement và consultation note cho HIGH alert.                 | MVP   | P0       | FR-AUD-07, FR-ALT-09            |

---

## 6.13. Checkout Use Cases

| Use Case ID | Use Case Name                            | Actor chính  | Mô tả ngắn                                                                           | Scope | Priority | Linked Requirement IDs          |
| ----------- | ---------------------------------------- | ------------ | ------------------------------------------------------------------------------------ | ----- | -------- | ------------------------------- |
| UC-CHK-01   | Checkout Order                           | Staff, Admin | Staff/Admin hoàn tất Draft Order qua Checkout API.                                   | MVP   | P0       | FR-CHK-01, FR-CHK-03            |
| UC-CHK-02   | Validate checkout trước payment success  | System       | Hệ thống validate stock, interaction alert và order state trước khi payment SUCCESS. | MVP   | P0       | FR-CHK-06, FR-CHK-07            |
| UC-CHK-03   | Apply FEFO khi checkout                  | System       | Hệ thống trừ batch theo FEFO.                                                        | MVP   | P0       | FR-CHK-04                       |
| UC-CHK-04   | Tạo batch allocation                     | System       | Hệ thống lưu allocation để trace batch đã bán.                                       | MVP   | P0       | FR-CHK-05                       |
| UC-CHK-05   | Tạo payment và invoice trong transaction | System       | Checkout tạo payment và invoice trong cùng transaction.                              | MVP   | P0       | FR-CHK-03, FR-PAY-02, FR-INV-01 |
| UC-CHK-06   | Xử lý idempotent checkout                | System       | Hệ thống tránh double charge/double allocation bằng idempotency.                     | MVP   | P0       | FR-CHK-08                       |
| UC-CHK-07   | Chuyển order sang PAID                   | System       | Checkout thành công chuyển order từ DRAFT sang PAID.                                 | MVP   | P0       | FR-CHK-09                       |
| UC-CHK-08   | Rollback checkout khi lỗi                | System       | Nếu checkout lỗi, hệ thống rollback dữ liệu liên quan.                               | MVP   | P0       | FR-CHK-10                       |
| UC-CHK-09   | Chặn direct pay endpoint                 | System       | Không dùng `POST /orders/{id}/pay` làm command chính.                                | MVP   | P0       | FR-CHK-02                       |

---

## 6.14. Payment Use Cases

| Use Case ID | Use Case Name                         | Actor chính          | Mô tả ngắn                                                           | Scope        | Priority | Linked Requirement IDs          |
| ----------- | ------------------------------------- | -------------------- | -------------------------------------------------------------------- | ------------ | -------- | ------------------------------- |
| UC-PAY-01   | Ghi nhận Cash Payment trong checkout  | Staff, Admin, System | Checkout ghi nhận cash payment SUCCESS nếu hợp lệ.                   | MVP          | P0       | FR-PAY-01, FR-PAY-04, FR-PAY-05 |
| UC-PAY-02   | Ghi nhận Simulated Bank Transfer      | Staff, Admin, System | Checkout ghi nhận simulated bank transfer với transaction_reference. | MVP          | P0       | FR-PAY-06                       |
| UC-PAY-03   | Lưu FAILED payment attempt            | System               | Hệ thống có thể lưu FAILED payment attempt để audit/debug.           | MVP          | P1       | FR-PAY-03                       |
| UC-PAY-04   | Enforce one SUCCESS payment per order | System               | Hệ thống bảo đảm mỗi order chỉ có một SUCCESS payment.               | MVP          | P0       | FR-PAY-02                       |
| UC-PAY-05   | Chặn PENDING bank transfer            | System               | MVP không dùng PENDING bank transfer.                                | MVP          | P0       | FR-PAY-07                       |
| UC-PAY-06   | Loại refund/return khỏi MVP flow      | System               | Refund/return không triển khai trong MVP.                            | Out of Scope | P0       | FR-PAY-08                       |

---

## 6.15. Invoice Use Cases

| Use Case ID | Use Case Name                            | Actor chính  | Mô tả ngắn                                                          | Scope | Priority | Linked Requirement IDs |
| ----------- | ---------------------------------------- | ------------ | ------------------------------------------------------------------- | ----- | -------- | ---------------------- |
| UC-INV-01   | Tạo invoice sau checkout thành công      | System       | Hệ thống tạo invoice trong checkout transaction.                    | MVP   | P0       | FR-INV-01              |
| UC-INV-02   | Xem invoice theo order                   | Staff, Admin | Staff/Admin xem invoice theo quyền.                                 | MVP   | P1       | FR-INV-03              |
| UC-INV-03   | Hiển thị payment summary trên invoice    | System       | Invoice hiển thị thông tin thanh toán cơ bản.                       | MVP   | P1       | FR-INV-04              |
| UC-INV-04   | Hiển thị danh sách Medicine trên invoice | System       | Invoice hiển thị Medicine, quantity, unit price và total.           | MVP   | P1       | FR-INV-05              |
| UC-INV-05   | In hoặc xem invoice phục vụ demo         | Staff, Admin | User xem/in invoice sau checkout.                                   | MVP   | P1       | FR-INV-06              |
| UC-INV-06   | Chặn direct invoice creation normal flow | System       | Hệ thống không cho tạo invoice trực tiếp trong normal payment flow. | MVP   | P0       | FR-INV-02              |

---

## 6.16. AI Copilot Use Cases

| Use Case ID | Use Case Name                             | Actor chính                      | Mô tả ngắn                                                                     | Scope | Priority | Linked Requirement IDs          |
| ----------- | ----------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------ | ----- | -------- | ------------------------------- |
| UC-AIC-01   | Tạo giải thích InteractionAlert bằng AI   | Staff, Admin, Google AI Provider | AI Copilot tạo giải thích cảnh báo tương tác thuốc bằng ngôn ngữ dễ hiểu.      | MVP   | P0       | FR-AIC-01, FR-AIC-02, FR-AIC-09 |
| UC-AIC-02   | Tạo consultation note draft               | Staff, Admin, Google AI Provider | AI tạo draft ghi chú tư vấn cho HIGH alert nhưng chưa lưu official note.       | MVP   | P0       | FR-AIC-03                       |
| UC-AIC-03   | Xác nhận AI draft thành consultation note | Staff, Admin                     | Staff/Admin xác nhận draft trước khi lưu chính thức vào InteractionAlert.      | MVP   | P0       | FR-AIC-04, FR-ALT-09            |
| UC-AIC-04   | Tạo safe follow-up questions              | Staff, Admin, Google AI Provider | AI tạo câu hỏi follow-up an toàn từ short context.                             | MVP   | P1       | FR-AIC-05                       |
| UC-AIC-05   | Fallback sang MockAI                      | System, MockAI                   | Khi Google AI không khả dụng hoặc fallback bật, hệ thống dùng MockAI fallback. | MVP   | P0       | FR-AIC-09, FR-AIC-10            |
| UC-AIC-06   | Chặn AI tự lưu official note              | System                           | AI không tự động ghi official consultation note nếu chưa có user confirmation. | MVP   | P0       | FR-AIC-03, FR-AIC-04            |

---

## 6.17. AI Guardrail Use Cases

| Use Case ID | Use Case Name                         | Actor chính | Mô tả ngắn                                                          | Scope | Priority | Linked Requirement IDs |
| ----------- | ------------------------------------- | ----------- | ------------------------------------------------------------------- | ----- | -------- | ---------------------- |
| UC-AIG-01   | Kiểm tra input AI                     | System      | Backend kiểm tra input trước khi gửi sang AI provider.              | MVP   | P0       | FR-AIG-01, FR-AIG-02   |
| UC-AIG-02   | Chặn yêu cầu diagnosis                | System      | Hệ thống chặn request yêu cầu chẩn đoán bệnh.                       | MVP   | P0       | FR-AIC-06, FR-AIG-02   |
| UC-AIG-03   | Chặn yêu cầu prescribing              | System      | Hệ thống chặn request yêu cầu kê đơn.                               | MVP   | P0       | FR-AIC-07, FR-AIG-02   |
| UC-AIG-04   | Chặn yêu cầu dosage advice            | System      | Hệ thống chặn request yêu cầu hướng dẫn liều dùng.                  | MVP   | P0       | FR-AIC-08, FR-AIG-02   |
| UC-AIG-05   | Kiểm tra output AI                    | System      | Backend kiểm tra output AI trước khi trả về UI hoặc lưu draft.      | MVP   | P0       | FR-AIG-03              |
| UC-AIG-06   | Validate structured output            | System      | Hệ thống validate AI output bằng schema/structured output contract. | MVP   | P0       | FR-AIG-04              |
| UC-AIG-07   | Minimize/redact PII                   | System      | Hệ thống minimize/redact PII trong AI flow và AI Audit.             | MVP   | P0       | FR-AIG-05              |
| UC-AIG-08   | Trả safe error khi bị guardrail block | System      | Khi guardrail block request, hệ thống trả safe error message.       | MVP   | P1       | FR-AIG-06              |
| UC-AIG-09   | Hiển thị AI disclaimer                | System      | AI response có disclaimer phù hợp.                                  | MVP   | P1       | FR-AIG-07              |

---

## 6.18. AI Audit Use Cases

| Use Case ID | Use Case Name                           | Actor chính | Mô tả ngắn                                                        | Scope       | Priority | Linked Requirement IDs |
| ----------- | --------------------------------------- | ----------- | ----------------------------------------------------------------- | ----------- | -------- | ---------------------- |
| UC-AIA-01   | Ghi AI Audit Log                        | System      | Hệ thống ghi AI Audit Log cho mỗi AI event quan trọng.            | MVP         | P0       | FR-AIA-01              |
| UC-AIA-02   | Ghi provider requested/used             | System      | AI Audit ghi provider requested và provider used khi có fallback. | MVP         | P0       | FR-AIA-02              |
| UC-AIA-03   | Ghi prompt version                      | System      | AI Audit ghi exact prompt version.                                | MVP         | P0       | FR-AIA-03              |
| UC-AIA-04   | Ghi guardrail status                    | System      | AI Audit ghi input/output guardrail status.                       | MVP         | P0       | FR-AIA-04              |
| UC-AIA-05   | Ghi latency và status                   | System      | AI Audit ghi latency, status và metadata cần thiết.               | MVP         | P1       | FR-AIA-05              |
| UC-AIA-06   | Xem Admin AI Audit Log tối thiểu        | Admin       | Admin xem AI Audit Log tối thiểu để demo traceability.            | MVP         | P1       | FR-AIA-07              |
| UC-AIA-07   | Chặn raw PII trong AI Audit             | System      | Hệ thống không lưu raw PII trong AI Audit.                        | MVP         | P0       | FR-AIA-06              |
| UC-AIA-08   | Xem AI observability dashboard nâng cao | Admin       | Admin xem dashboard AI nâng cao nếu có.                           | Should-have | P3       | FR-AIA-08              |
| UC-AIA-09   | Duy trì AI Audit trong demo lifecycle   | System      | AI Audit Logs được giữ trong full demo/project lifecycle.         | MVP         | P1       | FR-AIA-09              |

---

## 6.19. Graph Sync Use Cases

| Use Case ID | Use Case Name                         | Actor chính                      | Mô tả ngắn                                                                            | Scope       | Priority | Linked Requirement IDs                     |
| ----------- | ------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------- | ----------- | -------- | ------------------------------------------ |
| UC-GSY-01   | Tạo Graph Sync Outbox Event           | System                           | Hệ thống tạo outbox event khi Medicine, ActiveIngredient, mapping hoặc rule thay đổi. | MVP         | P0       | FR-GSY-01, FR-GSY-03                       |
| UC-GSY-02   | Worker đồng bộ sang Neo4j             | System Scheduler / Worker, Neo4j | Worker xử lý outbox và project dữ liệu sang Neo4j.                                    | MVP         | P0       | FR-GSY-04, FR-GSY-09, FR-GSY-10, FR-GSY-11 |
| UC-GSY-03   | Retry Graph Sync thất bại             | System Scheduler / Worker        | Worker retry khi sync thất bại.                                                       | MVP         | P0       | FR-GSY-05                                  |
| UC-GSY-04   | Ghi attempts/failure logs             | System                           | Hệ thống ghi attempts/logs/failure logging cho Graph Sync.                            | MVP         | P1       | FR-GSY-06, FR-AUD-08                       |
| UC-GSY-05   | Theo dõi graph freshness              | System                           | Hệ thống xác định freshness bằng source version và outbox state.                      | MVP         | P0       | FR-GSY-07, FR-GSY-08                       |
| UC-GSY-06   | Project deactivation sang Neo4j       | System, Neo4j                    | Deactivated entities/rules được giữ trong Neo4j với `isActive=false`.                 | MVP         | P1       | FR-GSY-12                                  |
| UC-GSY-07   | Xem Graph Sync Status UI              | Admin                            | Admin xem trạng thái sync/retry UI nếu triển khai.                                    | Should-have | P2       | FR-GSY-13                                  |
| UC-GSY-08   | Manual retry/rebuild Graph Projection | Admin                            | Admin chạy retry/rebuild thủ công nếu có UI/API quản trị.                             | Should-have | P2       | FR-GSY-13                                  |

---

## 6.20. Graph-RAG Use Cases

| Use Case ID | Use Case Name                                        | Actor chính         | Mô tả ngắn                                                                             | Scope       | Priority | Linked Requirement IDs |
| ----------- | ---------------------------------------------------- | ------------------- | -------------------------------------------------------------------------------------- | ----------- | -------- | ---------------------- |
| UC-GRG-01   | Truy vấn Graph-RAG interaction explanation           | Staff, Admin, Neo4j | User truy vấn giải thích interaction bằng Graph-RAG trong phạm vi quyền.               | MVP         | P0       | FR-GRG-01, FR-GRG-02   |
| UC-GRG-02   | Trả provenance metadata                              | System              | Graph-RAG response trả provenance metadata.                                            | MVP         | P0       | FR-GRG-03              |
| UC-GRG-03   | Trả freshness metadata                               | System              | Graph-RAG response trả freshness metadata.                                             | MVP         | P0       | FR-GRG-04              |
| UC-GRG-04   | Fallback sang PostgreSQL khi graph stale/unavailable | System              | Với interaction explanation, nếu Neo4j stale/unavailable thì fallback sang PostgreSQL. | MVP         | P0       | FR-GRG-05, FR-GRG-07   |
| UC-GRG-05   | Trả safe error cho pure graph query                  | System              | Pure graph query không có fallback phải trả safe error.                                | MVP         | P0       | FR-GRG-06              |
| UC-GRG-06   | Chặn raw Cypher từ Staff                             | System              | Staff không được submit raw Cypher qua UI/API.                                         | MVP         | P0       | FR-GRG-08              |
| UC-GRG-07   | Bảo đảm graph không lưu PII                          | System              | Graph không lưu PII.                                                                   | MVP         | P0       | FR-GRG-09              |
| UC-GRG-08   | Bảo đảm graph không quyết định checkout              | System              | Checkout không dùng graph làm nguồn quyết định chính.                                  | MVP         | P0       | FR-GRG-10              |
| UC-GRG-09   | Xem Graph Explorer read-only                         | Staff, Admin        | User xem Graph Explorer read-only theo permission scope nếu triển khai.                | Should-have | P2       | FR-GRG-11              |

---

## 6.21. Reports Use Cases

| Use Case ID | Use Case Name                    | Actor chính               | Mô tả ngắn                                                 | Scope                         | Priority | Linked Requirement IDs |
| ----------- | -------------------------------- | ------------------------- | ---------------------------------------------------------- | ----------------------------- | -------- | ---------------------- |
| UC-RPT-01   | Xem Revenue Report               | Admin                     | Admin xem báo cáo doanh thu cơ bản.                        | MVP                           | P0       | FR-RPT-01, FR-RPT-04   |
| UC-RPT-02   | Xem Top Medicines Report         | Admin                     | Admin xem báo cáo thuốc bán chạy.                          | MVP                           | P0       | FR-RPT-02, FR-RPT-04   |
| UC-RPT-03   | Xem Inventory Report             | Admin, Warehouse          | Admin/Warehouse xem báo cáo tồn kho theo quyền.            | MVP                           | P0       | FR-RPT-03              |
| UC-RPT-04   | Lọc báo cáo cơ bản               | Admin, Warehouse          | User dùng filter cơ bản theo thời gian/trạng thái nếu cần. | MVP                           | P1       | FR-RPT-05              |
| UC-RPT-05   | Tạo AI business report narrative | Admin, Google AI Provider | AI tạo narrative cho business report nếu có.               | Should-have                   | P3       | FR-RPT-06              |
| UC-RPT-06   | Forecast tồn kho                 | Admin                     | Forecast tồn kho cho phiên bản mở rộng.                    | Future / Commercial Expansion | P3       | FR-RPT-07              |

---

## 6.22. System Settings Use Cases

| Use Case ID | Use Case Name                                | Actor chính   | Mô tả ngắn                                                       | Scope       | Priority | Linked Requirement IDs |
| ----------- | -------------------------------------------- | ------------- | ---------------------------------------------------------------- | ----------- | -------- | ---------------------- |
| UC-SET-01   | Cấu hình near-expiry threshold               | Admin         | Admin cấu hình near-expiry threshold, mặc định 90 ngày.          | MVP         | P0       | FR-SET-01, FR-BAT-07   |
| UC-SET-02   | Validate System Settings                     | System        | Hệ thống validate giá trị settings hợp lệ.                       | MVP         | P1       | FR-SET-02              |
| UC-SET-03   | Ghi audit khi đổi settings                   | System        | Hệ thống audit thay đổi settings quan trọng.                     | MVP         | P1       | FR-SET-03              |
| UC-SET-04   | Cấu hình AI provider/model bằng env/database | Admin, System | Provider/model config là bắt buộc, có thể qua env hoặc database. | MVP         | P0       | FR-SET-04              |
| UC-SET-05   | Quản lý Provider/Model Config UI             | Admin         | Admin quản lý provider/model qua UI nếu triển khai.              | Should-have | P3       | FR-SET-05              |
| UC-SET-06   | Quản lý Prompt Template UI                   | Admin         | Admin chỉnh prompt template qua UI nếu triển khai.               | Should-have | P3       | FR-SET-06              |

---

## 6.23. Demo Data & Demo Reset Use Cases

| Use Case ID | Use Case Name                           | Actor chính                      | Mô tả ngắn                                                                                             | Scope | Priority | Linked Requirement IDs |
| ----------- | --------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------ | ----- | -------- | ---------------------- |
| UC-DMO-01   | Seed curated MVP operational data       | Developer, System                | Hệ thống seed dữ liệu vận hành MVP đã curated.                                                         | MVP   | P0       | FR-DMO-01              |
| UC-DMO-02   | Seed demo users                         | Developer, System, Supabase Auth | Seed Admin, Staff, Warehouse và new-staff account.                                                     | MVP   | P0       | FR-DMO-02              |
| UC-DMO-03   | Generate dynamic expiry dates           | System                           | Demo batch expiry dates được tạo relative to reset date.                                               | MVP   | P0       | FR-DMO-03              |
| UC-DMO-04   | Seed FEFO multi-batch scenario          | Developer, System                | Seed dữ liệu có nhiều batch để demo FEFO.                                                              | MVP   | P0       | FR-DMO-04              |
| UC-DMO-05   | Seed PAID order với HIGH alert hợp lệ   | Developer, System                | Seed order đã PAID có HIGH alert, acknowledgement, consultation note, payment, invoice và allocations. | MVP   | P1       | FR-DMO-05              |
| UC-DMO-06   | Seed report data                        | Developer, System                | Seed đủ order PAID/DRAFT/CANCELLED/FAILED để demo reports.                                             | MVP   | P1       | FR-DMO-06              |
| UC-DMO-07   | Chạy demo:reset local only              | Developer, System                | `demo:reset` chỉ chạy local.                                                                           | MVP   | P0       | FR-DMO-07              |
| UC-DMO-08   | Từ chối demo:reset ở unsafe environment | System                           | Script từ chối demo/staging/production/unknown.                                                        | MVP   | P0       | FR-DMO-08              |
| UC-DMO-09   | Rebuild Neo4j projection sau demo reset | System, Neo4j                    | Demo reset rebuild graph projection và kiểm tra freshness.                                             | MVP   | P0       | FR-DMO-09              |
| UC-DMO-10   | Chạy smoke tests sau demo reset         | System, Tester                   | Demo reset chạy smoke tests cơ bản.                                                                    | MVP   | P1       | FR-DMO-10              |

---

## 6.24. System Audit Use Cases

| Use Case ID | Use Case Name                           | Actor chính | Mô tả ngắn                                               | Scope       | Priority | Linked Requirement IDs |
| ----------- | --------------------------------------- | ----------- | -------------------------------------------------------- | ----------- | -------- | ---------------------- |
| UC-AUD-01   | Ghi backend audit log                   | System      | Hệ thống ghi audit log cho nghiệp vụ quan trọng.         | MVP         | P0       | FR-AUD-01              |
| UC-AUD-02   | Audit user/role change                  | System      | Hệ thống audit khi thay đổi user/role.                   | MVP         | P1       | FR-AUD-02              |
| UC-AUD-03   | Audit supplier deactivation             | System      | Hệ thống audit khi deactivate Supplier.                  | MVP         | P1       | FR-AUD-03              |
| UC-AUD-04   | Audit Stock Import confirmation         | System      | Hệ thống audit khi confirm Stock Import.                 | MVP         | P1       | FR-AUD-04              |
| UC-AUD-05   | Audit Inventory Adjustment confirmation | System      | Hệ thống audit khi confirm Inventory Adjustment.         | MVP         | P0       | FR-AUD-05              |
| UC-AUD-06   | Audit checkout                          | System      | Hệ thống audit checkout event quan trọng.                | MVP         | P1       | FR-AUD-06              |
| UC-AUD-07   | Audit HIGH alert evidence               | System      | Hệ thống audit/trace HIGH alert acknowledgement và note. | MVP         | P0       | FR-AUD-07              |
| UC-AUD-08   | Audit Graph Sync failure                | System      | Hệ thống audit/failure log Graph Sync failure.           | MVP         | P0       | FR-AUD-08              |
| UC-AUD-09   | Xem full System Audit Log UI            | Admin       | Admin xem System Audit Log UI đầy đủ nếu triển khai.     | Should-have | P2       | FR-AUD-09              |

---

## 6.25. DevOps / CI / Setup Use Cases

| Use Case ID | Use Case Name                             | Actor chính                   | Mô tả ngắn                                                               | Scope       | Priority | Linked Requirement IDs |
| ----------- | ----------------------------------------- | ----------------------------- | ------------------------------------------------------------------------ | ----------- | -------- | ---------------------- |
| UC-DEV-01   | Setup local development environment       | Developer                     | Developer setup Next.js, NestJS, Prisma, Supabase cloud và Neo4j AuraDB. | MVP         | P0       | FR-DEV-01, FR-DEV-02   |
| UC-DEV-02   | Validate Prisma schema/migration          | Developer, CI                 | CI/setup validate Prisma schema và migration.                            | MVP         | P0       | FR-DEV-04              |
| UC-DEV-03   | Run frontend build gate                   | CI                            | CI chạy frontend build.                                                  | MVP         | P0       | FR-DEV-05              |
| UC-DEV-04   | Run backend build gate                    | CI                            | CI chạy backend build.                                                   | MVP         | P0       | FR-DEV-06              |
| UC-DEV-05   | Run lint and type check                   | CI                            | CI chạy lint và type check.                                              | MVP         | P0       | FR-DEV-07              |
| UC-DEV-06   | Merge release PR vào main                 | Project Leader, Developer     | Merge vào main chỉ thông qua reviewed release PR từ develop.             | MVP         | P1       | FR-DEV-08              |
| UC-DEV-07   | Chuẩn bị demo/staging environment         | Developer, Release/Demo Owner | Dedicated demo/staging environment được khuyến nghị nhưng chưa chốt.     | Should-have | P2       | FR-DEV-09              |
| UC-DEV-08   | Không dùng Docker làm official setup path | Developer                     | Docker chỉ là optional local alternative, không phải official setup.     | MVP         | P0       | FR-DEV-03              |

---

## 6.26. Testing Use Cases

| Use Case ID | Use Case Name                          | Actor chính                | Mô tả ngắn                                                                                             | Scope | Priority | Linked Requirement IDs |
| ----------- | -------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------ | ----- | -------- | ---------------------- |
| UC-TST-01   | Chọn/áp dụng recommended testing stack | Tester, Developer          | Team dùng hoặc adopt recommended testing stack nếu được chốt.                                          | MVP   | P1       | FR-TST-01, FR-TST-02   |
| UC-TST-02   | Thiết lập test isolation/cleanup       | Tester, Developer          | Automated tests dùng isolation/cleanup trên non-demo local environment hoặc test schema/config nếu có. | MVP   | P0       | FR-TST-03, FR-TST-04   |
| UC-TST-03   | Chặn destructive tests trên demo DB    | Tester, Developer, System  | Không chạy destructive tests against demo database.                                                    | MVP   | P0       | FR-TST-05              |
| UC-TST-04   | Kiểm thử Chrome desktop/laptop         | Tester                     | Kiểm thử browser target MVP là Chrome desktop/laptop.                                                  | MVP   | P1       | FR-TST-06              |
| UC-TST-05   | Kiểm tra responsive cơ bản             | Tester                     | Kiểm tra responsive cơ bản, không full cross-browser.                                                  | MVP   | P2       | FR-TST-07              |
| UC-TST-06   | Test high-risk modules                 | Tester, Developer          | Ưu tiên Checkout, FEFO, Interaction, AI Guardrail.                                                     | MVP   | P1       | FR-TST-08              |
| UC-TST-07   | Chạy smoke test trước demo             | Tester, Release/Demo Owner | Chạy smoke test critical path trước demo.                                                              | MVP   | P0       | FR-TST-09              |
| UC-TST-08   | Approve test exit/release              | Project Leader             | Project Leader approve test exit/release dựa trên reports.                                             | MVP   | P1       | FR-TST-10              |

---

# 7. MVP Use Case Summary

## 7.1. MVP Critical Use Cases P0

Các use case P0 quan trọng nhất cho demo/MVP:

| Area                 | Critical Use Case IDs                                                                  |
| -------------------- | -------------------------------------------------------------------------------------- |
| Auth/RBAC            | UC-AUTH-01, UC-AUTH-03, UC-RBAC-01, UC-RBAC-03, UC-RBAC-05                             |
| Medicine/Ingredient  | UC-MED-01, UC-MED-03, UC-MED-04, UC-ACT-01, UC-ACT-04                                  |
| Supplier             | UC-SUP-01, UC-SUP-03, UC-SUP-04                                                        |
| Inventory            | UC-BAT-01, UC-BAT-03, UC-BAT-04, UC-BAT-06                                             |
| Stock Import         | UC-STI-01, UC-STI-03, UC-STI-04, UC-STI-05                                             |
| Inventory Adjustment | UC-ADJ-01, UC-ADJ-03, UC-ADJ-04, UC-ADJ-05, UC-ADJ-06                                  |
| POS                  | UC-POS-01, UC-POS-02, UC-POS-03, UC-POS-05, UC-POS-06, UC-POS-08                       |
| Interaction          | UC-DRG-01, UC-DRG-04, UC-DRG-05, UC-ALT-01, UC-ALT-03, UC-ALT-05, UC-ALT-06, UC-ALT-07 |
| Checkout             | UC-CHK-01, UC-CHK-02, UC-CHK-03, UC-CHK-04, UC-CHK-05, UC-CHK-06, UC-CHK-07, UC-CHK-08 |
| Payment/Invoice      | UC-PAY-01, UC-PAY-02, UC-PAY-04, UC-INV-01, UC-INV-06                                  |
| AI                   | UC-AIC-01, UC-AIC-02, UC-AIC-03, UC-AIG-01 → UC-AIG-07, UC-AIA-01 → UC-AIA-04          |
| Graph                | UC-GSY-01 → UC-GSY-05, UC-GRG-01 → UC-GRG-08                                           |
| Reports              | UC-RPT-01, UC-RPT-02, UC-RPT-03                                                        |
| Demo                 | UC-DMO-01 → UC-DMO-04, UC-DMO-07 → UC-DMO-09                                           |
| Testing              | UC-TST-02, UC-TST-03, UC-TST-07                                                        |

---

# 8. Should-have Use Cases

| Use Case ID | Use Case Name                            | Lý do không chặn MVP                                      |
| ----------- | ---------------------------------------- | --------------------------------------------------------- |
| UC-ADJ-07   | Xử lý correction/cancellation adjustment | Có ích cho vận hành nhưng không bắt buộc demo MVP         |
| UC-AIA-08   | Xem AI observability dashboard nâng cao  | AI Audit tối thiểu đã đủ cho MVP                          |
| UC-GSY-07   | Xem Graph Sync Status UI                 | Backend Graph Sync là MVP, UI retry/status là Should-have |
| UC-GSY-08   | Manual retry/rebuild Graph Projection    | Nên có nhưng không thay thế backend retry/freshness       |
| UC-GRG-09   | Xem Graph Explorer read-only             | Có ích cho demo nâng cao, không chặn core flow            |
| UC-RPT-05   | Tạo AI business report narrative         | Basic deterministic reports mới là MVP                    |
| UC-SET-05   | Quản lý Provider/Model Config UI         | Provider/model config bắt buộc, UI config là Should-have  |
| UC-SET-06   | Quản lý Prompt Template UI               | Prompt version bắt buộc, UI edit prompt là Should-have    |
| UC-AUD-09   | Xem full System Audit Log UI             | Backend audit là MVP, full UI là Should-have              |
| UC-DEV-07   | Chuẩn bị demo/staging environment        | Recommended nhưng unresolved                              |

---

# 9. Future / Commercial Expansion Use Cases

| Use Case ID | Use Case Name                              | Ghi chú                                    |
| ----------- | ------------------------------------------ | ------------------------------------------ |
| UC-RPT-06   | Forecast tồn kho                           | Future / Commercial Expansion              |
| UC-CUS-F01  | Customer Portal / Customer Account         | Không phải authenticated MVP actor         |
| UC-ECM-F01  | Cart / Wishlist / Online Commerce          | Future / Commercial Expansion              |
| UC-SHP-F01  | Shipping / Delivery Management             | Future / Commercial Expansion              |
| UC-CPN-F01  | Coupon / Promotion Management              | Future / Commercial Expansion              |
| UC-REV-F01  | Product Review Management                  | Future / Commercial Expansion              |
| UC-MWH-F01  | Multi-store / Multi-warehouse Management   | Future / Commercial Expansion              |
| UC-TRF-F01  | Stock Transfer giữa warehouse/store        | Future / Commercial Expansion              |
| UC-GPH-F01  | DrugGroup taxonomy graph expansion         | Chỉ làm nếu có taxonomy chính thức         |
| UC-GPH-F02  | Symptom/Condition/RedFlag graph enrichment | Demo-only/Future, không ảnh hưởng checkout |

---

# 10. Explicitly Out-of-Scope Use Cases

Các use case sau **không được đưa vào MVP implementation**:

| Out-of-Scope UC                             | Lý do                                      |
| ------------------------------------------- | ------------------------------------------ |
| Custom username/password/JWT login          | Đã thay bằng Supabase Auth                 |
| Lưu password/password_hash trong PostgreSQL | Không được phép theo baseline              |
| Direct edit inventory quantity              | Phải dùng Inventory Adjustment workflow    |
| Aggregate inventory source of truth         | MedicineBatch là source of truth           |
| Medicine-level interaction rule official    | Official rule là ActiveIngredient-level    |
| MockAI-only MVP                             | Google AI primary, MockAI fallback         |
| MockGraph-only MVP                          | Neo4j thật là graph projection             |
| Neo4j source of truth                       | PostgreSQL là source of truth              |
| `POST /orders/{id}/pay` làm command chính   | Checkout API là command chính              |
| Direct invoice creation normal flow         | Invoice tạo trong checkout transaction     |
| Full Customer Management MVP blocker        | MVP hỗ trợ walk-in/anonymous customer      |
| Full 100-table implementation               | MVP chỉ triển khai core subset             |
| ProductVariant làm MVP sales key            | MVP dùng `medicine_id`                     |
| Raw Cypher user API cho Staff               | Không expose raw Cypher                    |
| DrugGroup từ category data                  | Chưa có taxonomy chính thức                |
| Symptom/Condition/RedFlag trong graph MVP   | Future/demo-only, không ảnh hưởng checkout |
| riskScore ảnh hưởng severity/checkout       | Không dùng trong MVP                       |
| Refund/return                               | Out of MVP                                 |
| PENDING bank transfer                       | MVP chỉ SUCCESS/FAILED                     |
| AI diagnosis/prescribing/dosage advice      | AI Guardrail phải chặn                     |

---

# 11. Preliminary Requirement-to-Use-Case Mapping

Bảng này là mapping sơ bộ để chuẩn bị cho Traceability Matrix tổng.

| Requirement Group         | Requirement IDs         | Primary Use Case IDs    |
| ------------------------- | ----------------------- | ----------------------- |
| Authentication            | FR-AUTH-01 → FR-AUTH-06 | UC-AUTH-01 → UC-AUTH-04 |
| RBAC                      | FR-RBAC-01 → FR-RBAC-08 | UC-RBAC-01 → UC-RBAC-06 |
| User Management           | FR-USER-01 → FR-USER-05 | UC-USER-01 → UC-USER-05 |
| Medicine                  | FR-MED-01 → FR-MED-07   | UC-MED-01 → UC-MED-06   |
| ActiveIngredient          | FR-ACT-01 → FR-ACT-07   | UC-ACT-01 → UC-ACT-07   |
| Supplier                  | FR-SUP-01 → FR-SUP-05   | UC-SUP-01 → UC-SUP-05   |
| MedicineBatch / Inventory | FR-BAT-01 → FR-BAT-09   | UC-BAT-01 → UC-BAT-07   |
| Stock Import              | FR-STI-01 → FR-STI-07   | UC-STI-01 → UC-STI-07   |
| Inventory Adjustment      | FR-ADJ-01 → FR-ADJ-07   | UC-ADJ-01 → UC-ADJ-07   |
| POS                       | FR-POS-01 → FR-POS-08   | UC-POS-01 → UC-POS-08   |
| DrugInteraction           | FR-DRG-01 → FR-DRG-08   | UC-DRG-01 → UC-DRG-06   |
| InteractionAlert          | FR-ALT-01 → FR-ALT-11   | UC-ALT-01 → UC-ALT-10   |
| Checkout                  | FR-CHK-01 → FR-CHK-10   | UC-CHK-01 → UC-CHK-09   |
| Payment                   | FR-PAY-01 → FR-PAY-08   | UC-PAY-01 → UC-PAY-06   |
| Invoice                   | FR-INV-01 → FR-INV-06   | UC-INV-01 → UC-INV-06   |
| AI Copilot                | FR-AIC-01 → FR-AIC-10   | UC-AIC-01 → UC-AIC-06   |
| AI Guardrail              | FR-AIG-01 → FR-AIG-07   | UC-AIG-01 → UC-AIG-09   |
| AI Audit                  | FR-AIA-01 → FR-AIA-09   | UC-AIA-01 → UC-AIA-09   |
| Graph Sync                | FR-GSY-01 → FR-GSY-13   | UC-GSY-01 → UC-GSY-08   |
| Graph-RAG                 | FR-GRG-01 → FR-GRG-11   | UC-GRG-01 → UC-GRG-09   |
| Reports                   | FR-RPT-01 → FR-RPT-07   | UC-RPT-01 → UC-RPT-06   |
| Settings                  | FR-SET-01 → FR-SET-06   | UC-SET-01 → UC-SET-06   |
| Demo Reset                | FR-DMO-01 → FR-DMO-10   | UC-DMO-01 → UC-DMO-10   |
| Audit                     | FR-AUD-01 → FR-AUD-09   | UC-AUD-01 → UC-AUD-09   |
| DevOps / CI               | FR-DEV-01 → FR-DEV-09   | UC-DEV-01 → UC-DEV-08   |
| Testing                   | FR-TST-01 → FR-TST-10   | UC-TST-01 → UC-TST-08   |

---

# 12. Ghi chú cho bước tiếp theo

Sau Use Case ID Registry, bước tiếp theo là tạo:

```text
Test Case ID Registry
```

Test Case ID Registry nên bám theo các nhóm test chính:

1. Authentication & RBAC.
2. Medicine & ActiveIngredient.
3. Supplier.
4. MedicineBatch & Inventory Summary.
5. Stock Import.
6. Inventory Adjustment.
7. POS Draft Order.
8. InteractionAlert.
9. Checkout + FEFO + Payment + Invoice.
10. AI Copilot + AI Guardrail + AI Audit.
11. Graph Sync + Graph-RAG.
12. Reports.
13. System Settings.
14. Demo Reset.
15. DevOps / CI / Setup.
16. Smoke Test / E2E Demo Flow.

Sau đó tạo **Traceability Matrix tổng** theo format:

```text
Requirement → Use Case → API → UI → Database → Test Case → Jira
```
