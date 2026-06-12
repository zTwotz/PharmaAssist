# Test Case ID Registry v1

**Dự án:** PharmaAssist AI Intelligence
**Loại tài liệu:** Test Case ID Registry
**Trạng thái:** Draft v1
**Ngôn ngữ chính:** Tiếng Việt
**Thuật ngữ kỹ thuật:** Giữ tiếng Anh khi cần

---

## 1. Mục đích

Tài liệu này định nghĩa danh sách **Test Case ID** chính thức cho dự án PharmaAssist AI Intelligence.

Test Case ID Registry dùng để:

1. Chuẩn hóa mã test case cho toàn bộ dự án.
2. Trace test case về Requirement ID và Use Case ID.
3. Chuẩn bị cho Traceability Matrix tổng.
4. Chuẩn bị revise Jira Stories / Tasks.
5. Chuẩn bị Gap Analysis giữa code hiện tại và documentation.
6. Chuẩn bị smoke test, demo test và release exit.

Tài liệu này **không thay thế** Document 20 — Testing, Demo & Setup Guide.
Tài liệu này chỉ là registry/bảng mã hóa test case.

---

## 2. Quy ước đặt mã Test Case

### 2.1. Format

```text
TC-[MODULE]-[NUMBER]
```

Ví dụ:

```text
TC-AUTH-01
TC-RBAC-01
TC-STI-01
TC-FEFO-01
TC-ALT-01
TC-AIG-01
TC-GSY-01
TC-GRG-01
```

---

## 3. Module Prefix

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
| FEFO   | FEFO Batch Allocation              |
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
| SMK    | Smoke Test / E2E Demo Flow         |
| NEG    | Negative Scope Control             |

---

## 4. Test Type Classification

| Test Type      | Ý nghĩa                                            |
| -------------- | -------------------------------------------------- |
| Unit           | Kiểm thử logic nhỏ trong service/function          |
| Integration    | Kiểm thử nhiều module/backend service phối hợp     |
| API            | Kiểm thử API contract và response/error            |
| UI             | Kiểm thử giao diện, validation, UI states          |
| E2E            | Kiểm thử luồng người dùng end-to-end               |
| Smoke          | Kiểm thử nhanh critical path trước demo/release    |
| Manual         | Kiểm thử thủ công bằng UI/Postman                  |
| Security/Auth  | Kiểm thử quyền, session, ownership, access control |
| Data/Migration | Kiểm thử schema, migration, seed, data integrity   |
| Negative       | Kiểm thử hành vi bị chặn hoặc out-of-scope         |

---

## 5. Priority Classification

| Priority | Ý nghĩa                                       |
| -------- | --------------------------------------------- |
| P0       | Critical path, bắt buộc cho MVP/demo          |
| P1       | Core test, cần có để bảo đảm hệ thống ổn định |
| P2       | Supporting test, hỗ trợ vận hành/demo         |
| P3       | Enhancement hoặc Should-have/Future           |

---

## 6. Scope Classification

| Scope                         | Ý nghĩa                                              |
| ----------------------------- | ---------------------------------------------------- |
| MVP                           | Test bắt buộc cho MVP                                |
| Should-have                   | Nên có nếu chức năng tương ứng được triển khai       |
| Future / Commercial Expansion | Chưa test trong MVP                                  |
| Out of Scope                  | Dùng để xác nhận hệ thống không quay lại thiết kế cũ |

---

# 7. Test Case ID Registry

---

## 7.1. Authentication Test Cases

| Test Case ID | Test Case Name                      | Mục tiêu kiểm thử                                                                      | Test Type      | Scope | Priority | Linked Use Case IDs | Linked Requirement IDs |
| ------------ | ----------------------------------- | -------------------------------------------------------------------------------------- | -------------- | ----- | -------- | ------------------- | ---------------------- |
| TC-AUTH-01   | Login thành công bằng Supabase Auth | Kiểm tra user nội bộ đăng nhập thành công qua Supabase Auth.                           | API/E2E        | MVP   | P0       | UC-AUTH-01          | FR-AUTH-01, FR-AUTH-03 |
| TC-AUTH-02   | Login thất bại với credential sai   | Kiểm tra hệ thống trả lỗi rõ ràng khi login thất bại.                                  | API/UI         | MVP   | P1       | UC-AUTH-01          | FR-AUTH-06             |
| TC-AUTH-03   | Logout thành công                   | Kiểm tra user có thể đăng xuất và kết thúc session.                                    | E2E/UI         | MVP   | P1       | UC-AUTH-02          | FR-AUTH-02             |
| TC-AUTH-04   | Session hết hạn bị từ chối          | Kiểm tra API từ chối request khi session/token không hợp lệ.                           | Security/Auth  | MVP   | P0       | UC-AUTH-04          | FR-AUTH-03, FR-AUTH-06 |
| TC-AUTH-05   | First-login bắt buộc đổi mật khẩu   | Kiểm tra staff có `must_change_password=true` bị chuyển tới flow đổi mật khẩu lần đầu. | E2E/UI         | MVP   | P0       | UC-AUTH-03          | FR-AUTH-04             |
| TC-AUTH-06   | Không lưu password trong PostgreSQL | Kiểm tra database không có password/password_hash cho user nội bộ.                     | Data/Migration | MVP   | P0       | UC-AUTH-04          | FR-AUTH-05             |

---

## 7.2. User / Staff Management Test Cases

| Test Case ID | Test Case Name                    | Mục tiêu kiểm thử                                                                         | Test Type        | Scope | Priority | Linked Use Case IDs    | Linked Requirement IDs |
| ------------ | --------------------------------- | ----------------------------------------------------------------------------------------- | ---------------- | ----- | -------- | ---------------------- | ---------------------- |
| TC-USER-01   | Admin tạo staff account           | Kiểm tra Admin tạo staff bằng email và temporary password qua Supabase Admin integration. | API/E2E          | MVP   | P0       | UC-USER-01             | FR-USER-01, FR-USER-02 |
| TC-USER-02   | Staff mới có must_change_password | Kiểm tra account mới được gắn `must_change_password=true` khi cần demo first-login flow.  | Integration      | MVP   | P0       | UC-USER-01, UC-AUTH-03 | FR-AUTH-04, FR-USER-02 |
| TC-USER-03   | Admin cập nhật user profile       | Kiểm tra Admin cập nhật thông tin user profile hợp lệ.                                    | API/UI           | MVP   | P1       | UC-USER-02             | FR-USER-01             |
| TC-USER-04   | Admin deactivate user             | Kiểm tra Admin có thể vô hiệu hóa user nội bộ.                                            | API/UI           | MVP   | P1       | UC-USER-03             | FR-USER-04             |
| TC-USER-05   | Audit user/role change            | Kiểm tra thay đổi user/role quan trọng được ghi audit.                                    | Integration/Data | MVP   | P1       | UC-USER-05             | FR-USER-05, FR-AUD-02  |

---

## 7.3. RBAC & Authorization Test Cases

| Test Case ID | Test Case Name                          | Mục tiêu kiểm thử                                                  | Test Type         | Scope | Priority | Linked Use Case IDs   | Linked Requirement IDs |
| ------------ | --------------------------------------- | ------------------------------------------------------------------ | ----------------- | ----- | -------- | --------------------- | ---------------------- |
| TC-RBAC-01   | User có nhiều role                      | Kiểm tra một user có thể có nhiều role thông qua `user_roles`.     | Integration/Data  | MVP   | P0       | UC-RBAC-01            | FR-RBAC-01             |
| TC-RBAC-02   | API enforce permission                  | Kiểm tra backend từ chối API khi user thiếu permission.            | Security/Auth/API | MVP   | P0       | UC-RBAC-03            | FR-RBAC-02, FR-RBAC-07 |
| TC-RBAC-03   | UI ẩn chức năng không có quyền          | Kiểm tra UI không hiển thị/disable chức năng user không có quyền.  | UI                | MVP   | P1       | UC-RBAC-04            | FR-RBAC-06             |
| TC-RBAC-04   | Staff chỉ thấy own orders               | Kiểm tra Staff không xem được order ngoài ownership scope.         | Security/Auth/API | MVP   | P0       | UC-RBAC-05            | FR-RBAC-04, FR-RBAC-08 |
| TC-RBAC-05   | Admin xem toàn bộ orders                | Kiểm tra Admin xem được toàn bộ orders theo quyền.                 | API/UI            | MVP   | P0       | UC-RBAC-03            | FR-RBAC-03             |
| TC-RBAC-06   | Warehouse bị chặn khỏi InteractionAlert | Kiểm tra Warehouse không truy cập được InteractionAlert trong MVP. | Security/Auth/API | MVP   | P0       | UC-RBAC-06, UC-ALT-09 | FR-RBAC-05, FR-ALT-11  |

---

## 7.4. Medicine Test Cases

| Test Case ID | Test Case Name                       | Mục tiêu kiểm thử                                               | Test Type        | Scope | Priority | Linked Use Case IDs  | Linked Requirement IDs |
| ------------ | ------------------------------------ | --------------------------------------------------------------- | ---------------- | ----- | -------- | -------------------- | ---------------------- |
| TC-MED-01    | Admin tạo Medicine hợp lệ            | Kiểm tra Admin tạo Medicine với dữ liệu hợp lệ.                 | API/UI           | MVP   | P0       | UC-MED-01            | FR-MED-01              |
| TC-MED-02    | Reject selling_price <= 0            | Kiểm tra hệ thống từ chối Medicine có `selling_price <= 0`.     | API/UI           | MVP   | P0       | UC-MED-01            | FR-MED-05              |
| TC-MED-03    | Cập nhật Medicine                    | Kiểm tra Admin cập nhật Medicine hợp lệ.                        | API/UI           | MVP   | P1       | UC-MED-02            | FR-MED-02              |
| TC-MED-04    | Xem danh sách Medicine theo quyền    | Kiểm tra Admin/Staff/Warehouse xem Medicine list theo quyền.    | API/UI           | MVP   | P0       | UC-MED-03            | FR-MED-03              |
| TC-MED-05    | Tìm kiếm Medicine                    | Kiểm tra search Medicine theo tên/mã/thông tin chính.           | API/UI           | MVP   | P0       | UC-MED-04            | FR-MED-04              |
| TC-MED-06    | Deactivate Medicine                  | Kiểm tra Admin deactivate Medicine thay vì xóa cứng.            | API/Data         | MVP   | P1       | UC-MED-05            | FR-MED-06              |
| TC-MED-07    | Medicine change tạo Graph Sync event | Kiểm tra thay đổi Medicine tạo outbox event phục vụ Graph Sync. | Integration/Data | MVP   | P1       | UC-MED-06, UC-GSY-01 | FR-MED-07, FR-GSY-03   |

---

## 7.5. ActiveIngredient Test Cases

| Test Case ID | Test Case Name                                       | Mục tiêu kiểm thử                                                                  | Test Type        | Scope | Priority | Linked Use Case IDs  | Linked Requirement IDs |
| ------------ | ---------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------- | ----- | -------- | -------------------- | ---------------------- |
| TC-ACT-01    | Admin tạo ActiveIngredient                           | Kiểm tra Admin tạo ActiveIngredient chính thức.                                    | API/UI           | MVP   | P0       | UC-ACT-01            | FR-ACT-01              |
| TC-ACT-02    | Cập nhật ActiveIngredient                            | Kiểm tra Admin cập nhật ActiveIngredient.                                          | API/UI           | MVP   | P1       | UC-ACT-02            | FR-ACT-02              |
| TC-ACT-03    | Deactivate ActiveIngredient                          | Kiểm tra Admin deactivate ActiveIngredient.                                        | API/Data         | MVP   | P1       | UC-ACT-03            | FR-ACT-03              |
| TC-ACT-04    | Mapping Medicine với ActiveIngredient                | Kiểm tra Admin mapping Medicine với một hoặc nhiều ActiveIngredient.               | API/UI           | MVP   | P0       | UC-ACT-04            | FR-ACT-04              |
| TC-ACT-05    | Validate ingredient mapping                          | Kiểm tra form/API từ chối mapping không hợp lệ.                                    | API/UI           | MVP   | P0       | UC-ACT-05            | FR-ACT-05              |
| TC-ACT-06    | ActiveIngredient/mapping change tạo Graph Sync event | Kiểm tra thay đổi ActiveIngredient/mapping tạo outbox event.                       | Integration/Data | MVP   | P1       | UC-ACT-06, UC-GSY-01 | FR-ACT-06, FR-GSY-03   |
| TC-ACT-07    | Không auto-import scraped ingredient strings         | Kiểm tra scraped ingredient strings không tự động thành official ActiveIngredient. | Data/Negative    | MVP   | P0       | UC-ACT-07            | FR-ACT-07              |

---

## 7.6. Supplier Test Cases

| Test Case ID | Test Case Name                     | Mục tiêu kiểm thử                                                   | Test Type         | Scope | Priority | Linked Use Case IDs | Linked Requirement IDs |
| ------------ | ---------------------------------- | ------------------------------------------------------------------- | ----------------- | ----- | -------- | ------------------- | ---------------------- |
| TC-SUP-01    | Tạo Supplier                       | Kiểm tra Admin/Warehouse tạo Supplier theo quyền.                   | API/UI            | MVP   | P0       | UC-SUP-01           | FR-SUP-01              |
| TC-SUP-02    | Cập nhật Supplier                  | Kiểm tra Admin/Warehouse cập nhật Supplier theo quyền.              | API/UI            | MVP   | P1       | UC-SUP-02           | FR-SUP-02              |
| TC-SUP-03    | Xem danh sách Supplier             | Kiểm tra Admin/Warehouse xem danh sách Supplier.                    | API/UI            | MVP   | P0       | UC-SUP-03           | FR-SUP-03              |
| TC-SUP-04    | Chỉ Admin được deactivate Supplier | Kiểm tra Warehouse không được deactivate Supplier, Admin được phép. | Security/Auth/API | MVP   | P0       | UC-SUP-04           | FR-SUP-04              |
| TC-SUP-05    | Audit Supplier deactivation        | Kiểm tra deactivate Supplier được ghi audit log.                    | Integration/Data  | MVP   | P1       | UC-SUP-05           | FR-SUP-05, FR-AUD-03   |

---

## 7.7. MedicineBatch & Inventory Summary Test Cases

| Test Case ID | Test Case Name                                           | Mục tiêu kiểm thử                                                                    | Test Type        | Scope | Priority | Linked Use Case IDs  | Linked Requirement IDs |
| ------------ | -------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------- | ----- | -------- | -------------------- | ---------------------- |
| TC-BAT-01    | MedicineBatch là source of truth                         | Kiểm tra inventory được tính từ MedicineBatch, không từ aggregate inventory độc lập. | Integration/Data | MVP   | P0       | UC-BAT-07            | FR-BAT-01, FR-BAT-08   |
| TC-BAT-02    | Batch number bắt buộc                                    | Kiểm tra hệ thống từ chối batch thiếu `batch_number`.                                | API/Data         | MVP   | P0       | UC-STI-02, UC-BAT-06 | FR-BAT-02              |
| TC-BAT-03    | Expiry date bắt buộc                                     | Kiểm tra hệ thống từ chối batch thiếu `expiry_date`.                                 | API/Data         | MVP   | P0       | UC-STI-02, UC-BAT-06 | FR-BAT-03              |
| TC-BAT-04    | Batch uniqueness theo medicine + normalized batch number | Kiểm tra uniqueness đúng theo `medicine_id + normalized_batch_number`.               | Integration/Data | MVP   | P0       | UC-BAT-06            | FR-BAT-04              |
| TC-BAT-05    | Expired batch không tính sellable quantity               | Kiểm tra expired batches bị loại khỏi sellable quantity.                             | Unit/Integration | MVP   | P0       | UC-BAT-03            | FR-BAT-05              |
| TC-BAT-06    | Low-stock tính từ sellable quantity                      | Kiểm tra low-stock không tính expired batches.                                       | Unit/Integration | MVP   | P0       | UC-BAT-04            | FR-BAT-06              |
| TC-BAT-07    | Near-expiry dùng threshold 90 ngày mặc định              | Kiểm tra near-expiry mặc định 90 ngày khi chưa đổi setting.                          | Unit/Integration | MVP   | P1       | UC-BAT-05, UC-SET-01 | FR-BAT-07, FR-SET-01   |
| TC-BAT-08    | Inventory Summary derived đúng                           | Kiểm tra Inventory Summary phản ánh đúng tổng batch sellable/expired/near-expiry.    | API/UI/Data      | MVP   | P0       | UC-BAT-01            | FR-BAT-08              |
| TC-BAT-09    | Batch Detail hiển thị đúng                               | Kiểm tra UI Batch Detail hiển thị batch number, expiry, quantity, status.            | UI               | MVP   | P1       | UC-BAT-02            | FR-BAT-09              |

---

## 7.8. Stock Import Test Cases

| Test Case ID | Test Case Name                                    | Mục tiêu kiểm thử                                                             | Test Type            | Scope | Priority | Linked Use Case IDs | Linked Requirement IDs          |
| ------------ | ------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------- | ----- | -------- | ------------------- | ------------------------------- |
| TC-STI-01    | Tạo Stock Import Draft                            | Kiểm tra Admin/Warehouse tạo phiếu nhập kho draft.                            | API/UI               | MVP   | P0       | UC-STI-01           | FR-STI-01                       |
| TC-STI-02    | Thêm dòng nhập có batch và expiry                 | Kiểm tra dòng nhập bắt buộc có Medicine, batch number, expiry date, quantity. | API/UI               | MVP   | P0       | UC-STI-02           | FR-STI-01, FR-BAT-02, FR-BAT-03 |
| TC-STI-03    | Confirm Stock Import tạo MedicineBatch mới        | Kiểm tra confirm import tạo batch mới khi chưa tồn tại.                       | Integration/API/Data | MVP   | P0       | UC-STI-03           | FR-STI-02, FR-STI-03            |
| TC-STI-04    | Confirm Stock Import merge cùng batch cùng expiry | Kiểm tra import cùng medicine + batch + expiry thì merge quantity.            | Integration/Data     | MVP   | P0       | UC-STI-04           | FR-STI-04                       |
| TC-STI-05    | Reject cùng batch khác expiry                     | Kiểm tra import cùng medicine + batch number nhưng expiry khác bị reject.     | Integration/API      | MVP   | P0       | UC-STI-05           | FR-STI-05                       |
| TC-STI-06    | Stock Import đã confirm immutable                 | Kiểm tra phiếu đã confirm không được sửa tùy tiện.                            | API/Negative         | MVP   | P1       | UC-STI-06           | FR-STI-06                       |
| TC-STI-07    | Audit Stock Import confirmation                   | Kiểm tra confirm Stock Import được ghi audit.                                 | Integration/Data     | MVP   | P1       | UC-STI-07           | FR-STI-07, FR-AUD-04            |

---

## 7.9. Inventory Adjustment Test Cases

| Test Case ID | Test Case Name                          | Mục tiêu kiểm thử                                                              | Test Type              | Scope       | Priority | Linked Use Case IDs | Linked Requirement IDs |
| ------------ | --------------------------------------- | ------------------------------------------------------------------------------ | ---------------------- | ----------- | -------- | ------------------- | ---------------------- |
| TC-ADJ-01    | Tạo Inventory Adjustment                | Kiểm tra Admin/Warehouse tạo adjustment.                                       | API/UI                 | MVP         | P0       | UC-ADJ-01           | FR-ADJ-01              |
| TC-ADJ-02    | Adjustment bắt buộc reason              | Kiểm tra hệ thống reject adjustment thiếu reason.                              | API/UI                 | MVP         | P0       | UC-ADJ-02           | FR-ADJ-02              |
| TC-ADJ-03    | Confirm Inventory Adjustment            | Kiểm tra Admin/Warehouse confirm adjustment theo quyền.                        | API/UI                 | MVP         | P0       | UC-ADJ-03           | FR-ADJ-03              |
| TC-ADJ-04    | Adjustment cập nhật MedicineBatch       | Kiểm tra confirm adjustment cập nhật batch quantity qua workflow.              | Integration/Data       | MVP         | P0       | UC-ADJ-04           | FR-ADJ-05              |
| TC-ADJ-05    | Chặn direct quantity edit               | Kiểm tra Warehouse không thể sửa quantity trực tiếp ngoài adjustment workflow. | Security/Auth/Negative | MVP         | P0       | UC-ADJ-05           | FR-ADJ-04              |
| TC-ADJ-06    | Audit Inventory Adjustment confirmation | Kiểm tra confirm adjustment được ghi backend audit log.                        | Integration/Data       | MVP         | P0       | UC-ADJ-06           | FR-ADJ-06, FR-AUD-05   |
| TC-ADJ-07    | Correction/cancellation adjustment      | Kiểm tra workflow correction/cancellation nếu được triển khai.                 | API/UI                 | Should-have | P2       | UC-ADJ-07           | FR-ADJ-07              |

---

## 7.10. POS Draft Order Test Cases

| Test Case ID | Test Case Name                             | Mục tiêu kiểm thử                                             | Test Type         | Scope | Priority | Linked Use Case IDs   | Linked Requirement IDs |
| ------------ | ------------------------------------------ | ------------------------------------------------------------- | ----------------- | ----- | -------- | --------------------- | ---------------------- |
| TC-POS-01    | Staff tạo Draft Order                      | Kiểm tra Staff tạo order trạng thái DRAFT.                    | API/UI/E2E        | MVP   | P0       | UC-POS-01             | FR-POS-01              |
| TC-POS-02    | Admin tạo Draft Order                      | Kiểm tra Admin cũng thực hiện được sales operation như Staff. | API/UI/E2E        | MVP   | P0       | UC-POS-01             | FR-POS-01              |
| TC-POS-03    | Thêm Medicine vào Draft Order              | Kiểm tra thêm Medicine vào order nháp.                        | API/UI            | MVP   | P0       | UC-POS-02             | FR-POS-02              |
| TC-POS-04    | Cập nhật quantity item                     | Kiểm tra cập nhật số lượng item trong Draft Order.            | API/UI            | MVP   | P0       | UC-POS-03             | FR-POS-03              |
| TC-POS-05    | Xóa item khỏi Draft Order                  | Kiểm tra xóa item khỏi order nháp.                            | API/UI            | MVP   | P1       | UC-POS-04             | FR-POS-04              |
| TC-POS-06    | POS cảnh báo vượt sellable stock           | Kiểm tra POS cảnh báo khi quantity vượt sellable stock.       | API/UI            | MVP   | P0       | UC-POS-05             | FR-POS-05              |
| TC-POS-07    | POS hỗ trợ walk-in customer                | Kiểm tra bán hàng không cần customer account.                 | E2E/UI            | MVP   | P0       | UC-POS-06             | FR-POS-06              |
| TC-POS-08    | Staff cancel own Draft Order               | Kiểm tra Staff cancel Draft Order trong ownership scope.      | API/UI            | MVP   | P1       | UC-POS-07             | FR-POS-07              |
| TC-POS-09    | Staff không cancel order ngoài scope       | Kiểm tra Staff bị chặn khi cancel order không thuộc scope.    | Security/Auth/API | MVP   | P0       | UC-POS-07, UC-RBAC-05 | FR-POS-07, FR-RBAC-08  |
| TC-POS-10    | Draft Order được giữ sau checkout thất bại | Kiểm tra Draft Order không mất khi checkout validation fail.  | E2E/Integration   | MVP   | P0       | UC-POS-08             | FR-POS-08              |

---

## 7.11. DrugInteraction Rule Test Cases

| Test Case ID | Test Case Name                                  | Mục tiêu kiểm thử                                                             | Test Type        | Scope | Priority | Linked Use Case IDs  | Linked Requirement IDs |
| ------------ | ----------------------------------------------- | ----------------------------------------------------------------------------- | ---------------- | ----- | -------- | -------------------- | ---------------------- |
| TC-DRG-01    | Admin tạo ActiveIngredient-level rule           | Kiểm tra Admin tạo rule ở cấp ActiveIngredient–ActiveIngredient.              | API/UI           | MVP   | P0       | UC-DRG-01            | FR-DRG-01, FR-DRG-02   |
| TC-DRG-02    | Cập nhật DrugInteraction Rule                   | Kiểm tra Admin cập nhật rule.                                                 | API/UI           | MVP   | P1       | UC-DRG-02            | FR-DRG-03              |
| TC-DRG-03    | Deactivate DrugInteraction Rule                 | Kiểm tra Admin deactivate rule.                                               | API/Data         | MVP   | P1       | UC-DRG-03            | FR-DRG-04              |
| TC-DRG-04    | Severity chỉ LOW/MEDIUM/HIGH                    | Kiểm tra enum chỉ cho phép LOW, MEDIUM, HIGH.                                 | API/Data         | MVP   | P0       | UC-DRG-04            | FR-DRG-05              |
| TC-DRG-05    | Reject CRITICAL severity                        | Kiểm tra CRITICAL không được dùng trong MVP.                                  | API/Negative     | MVP   | P0       | UC-DRG-04            | FR-DRG-06              |
| TC-DRG-06    | Medicine interaction được suy ra từ ingredients | Kiểm tra interaction giữa medicines được suy ra qua ActiveIngredient mapping. | Integration      | MVP   | P0       | UC-DRG-05, UC-ALT-01 | FR-DRG-07              |
| TC-DRG-07    | Rule change tạo Graph Sync event                | Kiểm tra thay đổi rule tạo outbox event.                                      | Integration/Data | MVP   | P1       | UC-DRG-06, UC-GSY-01 | FR-DRG-08, FR-GSY-03   |

---

## 7.12. InteractionAlert Test Cases

| Test Case ID | Test Case Name                                  | Mục tiêu kiểm thử                                                                                                  | Test Type         | Scope | Priority | Linked Use Case IDs  | Linked Requirement IDs |
| ------------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------- | ----- | -------- | -------------------- | ---------------------- |
| TC-ALT-01    | Persist alert khi interaction xuất hiện         | Kiểm tra InteractionAlert được lưu khi alert hiển thị trong order.                                                 | Integration/Data  | MVP   | P0       | UC-ALT-01, UC-ALT-03 | FR-ALT-01              |
| TC-ALT-02    | One active alert per order + interaction        | Kiểm tra mỗi `order_id + interaction_id` chỉ có một active alert.                                                  | Integration/Data  | MVP   | P0       | UC-ALT-03            | FR-ALT-02              |
| TC-ALT-03    | Hiển thị lại alert tăng display_count           | Kiểm tra alert hiển thị lại tăng display_count và cập nhật last_displayed_at.                                      | Integration/Data  | MVP   | P0       | UC-ALT-04            | FR-ALT-03              |
| TC-ALT-04    | first_displayed_at được lưu                     | Kiểm tra alert lưu `first_displayed_at`.                                                                           | Data              | MVP   | P1       | UC-ALT-02            | FR-ALT-04              |
| TC-ALT-05    | last_displayed_at được lưu                      | Kiểm tra alert lưu `last_displayed_at`.                                                                            | Data              | MVP   | P1       | UC-ALT-02            | FR-ALT-05              |
| TC-ALT-06    | HIGH alert bắt buộc acknowledgement             | Kiểm tra HIGH alert không được bỏ qua acknowledgement.                                                             | API/UI/E2E        | MVP   | P0       | UC-ALT-05            | FR-ALT-06              |
| TC-ALT-07    | HIGH alert bắt buộc consultation note           | Kiểm tra HIGH alert không được checkout nếu thiếu consultation note.                                               | API/UI/E2E        | MVP   | P0       | UC-ALT-06            | FR-ALT-07              |
| TC-ALT-08    | Checkout bị block khi HIGH alert chưa xử lý     | Kiểm tra checkout bị block nếu HIGH alert thiếu acknowledgement/note.                                              | E2E/Integration   | MVP   | P0       | UC-ALT-07, UC-CHK-02 | FR-ALT-08              |
| TC-ALT-09    | Lưu consultation evidence trên InteractionAlert | Kiểm tra acknowledged_by, acknowledged_at, consultation_note, consultation_note_by, consultation_note_at được lưu. | Integration/Data  | MVP   | P0       | UC-ALT-06, UC-ALT-10 | FR-ALT-09              |
| TC-ALT-10    | Xem InteractionAlert History theo scope         | Kiểm tra Admin/Staff xem alert history theo quyền và ownership scope.                                              | API/UI/Security   | MVP   | P1       | UC-ALT-08            | FR-ALT-10, FR-RBAC-08  |
| TC-ALT-11    | Warehouse không truy cập InteractionAlert       | Kiểm tra Warehouse bị từ chối khi truy cập alert.                                                                  | Security/Auth/API | MVP   | P0       | UC-ALT-09            | FR-ALT-11              |

---

## 7.13. Checkout Test Cases

| Test Case ID | Test Case Name                                | Mục tiêu kiểm thử                                                            | Test Type        | Scope | Priority | Linked Use Case IDs  | Linked Requirement IDs |
| ------------ | --------------------------------------------- | ---------------------------------------------------------------------------- | ---------------- | ----- | -------- | -------------------- | ---------------------- |
| TC-CHK-01    | Checkout API hoàn tất order                   | Kiểm tra Checkout API là command chính để hoàn tất order.                    | API/E2E          | MVP   | P0       | UC-CHK-01            | FR-CHK-01, FR-CHK-03   |
| TC-CHK-02    | Không dùng direct pay endpoint                | Kiểm tra không có/không dùng `POST /orders/{id}/pay` làm command chính.      | API/Negative     | MVP   | P0       | UC-CHK-09            | FR-CHK-02              |
| TC-CHK-03    | Checkout chạy transaction                     | Kiểm tra order, payment, invoice, allocation nhất quán trong transaction.    | Integration      | MVP   | P0       | UC-CHK-01, UC-CHK-05 | FR-CHK-03              |
| TC-CHK-04    | Checkout validate stock trước payment success | Kiểm tra hết stock thì không tạo SUCCESS payment/invoice sai.                | Integration/E2E  | MVP   | P0       | UC-CHK-02            | FR-CHK-06              |
| TC-CHK-05    | Checkout validate InteractionAlert            | Kiểm tra checkout kiểm tra HIGH alert trước khi hoàn tất.                    | Integration/E2E  | MVP   | P0       | UC-CHK-02, UC-ALT-07 | FR-CHK-07              |
| TC-CHK-06    | Checkout idempotent                           | Kiểm tra gọi lại cùng idempotency key không double charge/double allocation. | Integration/API  | MVP   | P0       | UC-CHK-06            | FR-CHK-08              |
| TC-CHK-07    | Checkout chuyển order DRAFT sang PAID         | Kiểm tra order chuyển sang PAID khi checkout thành công.                     | Integration/Data | MVP   | P0       | UC-CHK-07            | FR-CHK-09              |
| TC-CHK-08    | Checkout rollback khi lỗi                     | Kiểm tra lỗi giữa transaction không để lại payment/invoice/allocation sai.   | Integration      | MVP   | P0       | UC-CHK-08            | FR-CHK-10              |
| TC-CHK-09    | Paid order không được edit/cancel trực tiếp   | Kiểm tra PAID order bị chặn khi edit/cancel trực tiếp.                       | API/Negative     | MVP   | P0       | UC-CHK-07            | FR-CHK-09              |

---

## 7.14. FEFO Test Cases

| Test Case ID | Test Case Name                       | Mục tiêu kiểm thử                                                               | Test Type        | Scope | Priority | Linked Use Case IDs  | Linked Requirement IDs |
| ------------ | ------------------------------------ | ------------------------------------------------------------------------------- | ---------------- | ----- | -------- | -------------------- | ---------------------- |
| TC-FEFO-01   | FEFO chọn batch gần hết hạn trước    | Kiểm tra checkout trừ batch có expiry sớm nhất nhưng chưa expired trước.        | Integration/E2E  | MVP   | P0       | UC-CHK-03            | FR-CHK-04              |
| TC-FEFO-02   | FEFO bỏ qua expired batch            | Kiểm tra expired batch không được dùng để allocate.                             | Integration      | MVP   | P0       | UC-CHK-03, UC-BAT-03 | FR-BAT-05, FR-CHK-04   |
| TC-FEFO-03   | FEFO allocate qua nhiều batch        | Kiểm tra một order item có thể allocate qua nhiều batch khi batch đầu không đủ. | Integration/E2E  | MVP   | P0       | UC-CHK-03, UC-CHK-04 | FR-CHK-04, FR-CHK-05   |
| TC-FEFO-04   | Lưu batch allocations sau checkout   | Kiểm tra allocations lưu đúng medicine, batch, quantity.                        | Integration/Data | MVP   | P0       | UC-CHK-04            | FR-CHK-05              |
| TC-FEFO-05   | Không allocate quá sellable quantity | Kiểm tra checkout bị reject nếu tổng sellable quantity không đủ.                | Integration/API  | MVP   | P0       | UC-CHK-02, UC-CHK-03 | FR-CHK-06              |
| TC-FEFO-06   | Order Detail trace batch đã bán      | Kiểm tra Order Detail hiển thị hoặc trace được batch allocations.               | UI/Data          | MVP   | P1       | UC-CHK-04, UC-INV-02 | FR-CHK-05              |

---

## 7.15. Payment Test Cases

| Test Case ID | Test Case Name                          | Mục tiêu kiểm thử                                                       | Test Type         | Scope        | Priority | Linked Use Case IDs | Linked Requirement IDs |
| ------------ | --------------------------------------- | ----------------------------------------------------------------------- | ----------------- | ------------ | -------- | ------------------- | ---------------------- |
| TC-PAY-01    | Cash payment SUCCESS                    | Kiểm tra cash payment thành công khi amount_tendered đủ.                | API/E2E           | MVP          | P0       | UC-PAY-01           | FR-PAY-01, FR-PAY-04   |
| TC-PAY-02    | Cash amount_tendered thiếu bị reject    | Kiểm tra cash payment bị reject nếu amount_tendered < order total.      | API/UI            | MVP          | P0       | UC-PAY-01           | FR-PAY-04              |
| TC-PAY-03    | Cash change_amount tính đúng            | Kiểm tra hệ thống tính và lưu change_amount đúng.                       | Unit/Integration  | MVP          | P0       | UC-PAY-01           | FR-PAY-05              |
| TC-PAY-04    | Bank transfer cần transaction_reference | Kiểm tra simulated bank transfer thiếu transaction_reference bị reject. | API/UI            | MVP          | P0       | UC-PAY-02           | FR-PAY-06              |
| TC-PAY-05    | Một order chỉ có một SUCCESS payment    | Kiểm tra hệ thống chặn tạo SUCCESS payment thứ hai cho cùng order.      | Integration/Data  | MVP          | P0       | UC-PAY-04           | FR-PAY-02              |
| TC-PAY-06    | Lưu FAILED payment attempt              | Kiểm tra failed payment attempt có thể được lưu.                        | Integration/Data  | MVP          | P1       | UC-PAY-03           | FR-PAY-03              |
| TC-PAY-07    | Không có PENDING bank transfer          | Kiểm tra MVP không dùng PENDING status.                                 | API/Data/Negative | MVP          | P0       | UC-PAY-05           | FR-PAY-07              |
| TC-PAY-08    | Refund/return không nằm trong MVP flow  | Kiểm tra UI/API MVP không expose refund/return flow.                    | Negative          | Out of Scope | P0       | UC-PAY-06           | FR-PAY-08              |

---

## 7.16. Invoice Test Cases

| Test Case ID | Test Case Name                           | Mục tiêu kiểm thử                                                           | Test Type        | Scope | Priority | Linked Use Case IDs  | Linked Requirement IDs |
| ------------ | ---------------------------------------- | --------------------------------------------------------------------------- | ---------------- | ----- | -------- | -------------------- | ---------------------- |
| TC-INV-01    | Invoice tạo bởi checkout transaction     | Kiểm tra invoice chỉ được tạo sau checkout/payment SUCCESS.                 | Integration/Data | MVP   | P0       | UC-INV-01, UC-CHK-05 | FR-INV-01              |
| TC-INV-02    | Chặn direct invoice creation normal flow | Kiểm tra normal payment flow không tạo invoice trực tiếp.                   | API/Negative     | MVP   | P0       | UC-INV-06            | FR-INV-02              |
| TC-INV-03    | Xem invoice theo order                   | Kiểm tra Staff/Admin xem invoice theo quyền.                                | API/UI           | MVP   | P1       | UC-INV-02            | FR-INV-03              |
| TC-INV-04    | Invoice hiển thị payment summary         | Kiểm tra invoice có payment method, total, amount tendered/change nếu cash. | UI/Data          | MVP   | P1       | UC-INV-03            | FR-INV-04              |
| TC-INV-05    | Invoice hiển thị medicines               | Kiểm tra invoice hiển thị danh sách Medicine, quantity, unit price, total.  | UI/Data          | MVP   | P1       | UC-INV-04            | FR-INV-05              |
| TC-INV-06    | Xem/in invoice phục vụ demo              | Kiểm tra UI hỗ trợ xem/in invoice ở mức MVP.                                | UI/Manual        | MVP   | P1       | UC-INV-05            | FR-INV-06              |

---

## 7.17. AI Copilot Test Cases

| Test Case ID | Test Case Name                             | Mục tiêu kiểm thử                                                                     | Test Type            | Scope | Priority | Linked Use Case IDs | Linked Requirement IDs |
| ------------ | ------------------------------------------ | ------------------------------------------------------------------------------------- | -------------------- | ----- | -------- | ------------------- | ---------------------- |
| TC-AIC-01    | AI giải thích InteractionAlert             | Kiểm tra AI Copilot tạo explanation dễ hiểu cho InteractionAlert.                     | API/UI/E2E           | MVP   | P0       | UC-AIC-01           | FR-AIC-01, FR-AIC-02   |
| TC-AIC-02    | AI tạo consultation note draft             | Kiểm tra AI chỉ tạo draft note, chưa lưu official note.                               | API/UI               | MVP   | P0       | UC-AIC-02           | FR-AIC-03              |
| TC-AIC-03    | Staff xác nhận draft thành official note   | Kiểm tra note chỉ được lưu vào InteractionAlert sau khi Staff/Admin xác nhận.         | E2E/Integration      | MVP   | P0       | UC-AIC-03           | FR-AIC-04, FR-ALT-09   |
| TC-AIC-04    | AI tạo safe follow-up questions            | Kiểm tra AI tạo câu hỏi follow-up an toàn từ short context.                           | API/UI               | MVP   | P1       | UC-AIC-04           | FR-AIC-05              |
| TC-AIC-05    | Google AI là primary provider              | Kiểm tra request AI dùng Google AI Provider khi khả dụng.                             | Integration/API      | MVP   | P0       | UC-AIC-01           | FR-AIC-09              |
| TC-AIC-06    | MockAI fallback khi primary unavailable    | Kiểm tra hệ thống fallback sang MockAI khi Google AI không khả dụng/fallback enabled. | Integration/API      | MVP   | P0       | UC-AIC-05           | FR-AIC-10              |
| TC-AIC-07    | AI không tự lưu official consultation note | Kiểm tra AI response không tự ghi official note nếu chưa có confirmation.             | Integration/Negative | MVP   | P0       | UC-AIC-06           | FR-AIC-03, FR-AIC-04   |

---

## 7.18. AI Guardrail Test Cases

| Test Case ID | Test Case Name                           | Mục tiêu kiểm thử                                            | Test Type        | Scope | Priority | Linked Use Case IDs | Linked Requirement IDs |
| ------------ | ---------------------------------------- | ------------------------------------------------------------ | ---------------- | ----- | -------- | ------------------- | ---------------------- |
| TC-AIG-01    | Input guardrail chạy trước provider call | Kiểm tra input được kiểm tra trước khi gọi AI provider.      | Integration/API  | MVP   | P0       | UC-AIG-01           | FR-AIG-01, FR-AIG-02   |
| TC-AIG-02    | Chặn diagnosis request                   | Kiểm tra yêu cầu chẩn đoán bệnh bị block.                    | API/Negative     | MVP   | P0       | UC-AIG-02           | FR-AIC-06, FR-AIG-02   |
| TC-AIG-03    | Chặn prescribing request                 | Kiểm tra yêu cầu kê đơn bị block.                            | API/Negative     | MVP   | P0       | UC-AIG-03           | FR-AIC-07, FR-AIG-02   |
| TC-AIG-04    | Chặn dosage advice request               | Kiểm tra yêu cầu hướng dẫn liều dùng bị block.               | API/Negative     | MVP   | P0       | UC-AIG-04           | FR-AIC-08, FR-AIG-02   |
| TC-AIG-05    | Output guardrail chạy sau AI response    | Kiểm tra output AI được kiểm tra trước khi trả UI/lưu draft. | Integration/API  | MVP   | P0       | UC-AIG-05           | FR-AIG-03              |
| TC-AIG-06    | Structured output validation             | Kiểm tra output không đúng schema bị reject/safe error.      | Integration/API  | MVP   | P0       | UC-AIG-06           | FR-AIG-04              |
| TC-AIG-07    | PII minimization/redaction               | Kiểm tra raw PII không được lưu trong AI Audit.              | Integration/Data | MVP   | P0       | UC-AIG-07           | FR-AIG-05              |
| TC-AIG-08    | Safe error khi guardrail block           | Kiểm tra response lỗi an toàn, không leak nội dung nhạy cảm. | API/UI           | MVP   | P1       | UC-AIG-08           | FR-AIG-06              |
| TC-AIG-09    | AI disclaimer hiển thị                   | Kiểm tra AI response có disclaimer phù hợp.                  | UI               | MVP   | P1       | UC-AIG-09           | FR-AIG-07              |

---

## 7.19. AI Audit Test Cases

| Test Case ID | Test Case Name                      | Mục tiêu kiểm thử                                                    | Test Type        | Scope       | Priority | Linked Use Case IDs | Linked Requirement IDs |
| ------------ | ----------------------------------- | -------------------------------------------------------------------- | ---------------- | ----------- | -------- | ------------------- | ---------------------- |
| TC-AIA-01    | Ghi AI Audit Log cho AI event       | Kiểm tra mỗi AI event quan trọng tạo AI Audit Log.                   | Integration/Data | MVP         | P0       | UC-AIA-01           | FR-AIA-01              |
| TC-AIA-02    | Ghi provider requested/used         | Kiểm tra audit log ghi provider requested và used.                   | Integration/Data | MVP         | P0       | UC-AIA-02           | FR-AIA-02              |
| TC-AIA-03    | Ghi prompt version                  | Kiểm tra AI Audit ghi exact prompt version.                          | Integration/Data | MVP         | P0       | UC-AIA-03           | FR-AIA-03              |
| TC-AIA-04    | Ghi guardrail status                | Kiểm tra audit log ghi input/output guardrail status.                | Integration/Data | MVP         | P0       | UC-AIA-04           | FR-AIA-04              |
| TC-AIA-05    | Ghi latency và status               | Kiểm tra AI Audit ghi latency, status, request metadata cần thiết.   | Integration/Data | MVP         | P1       | UC-AIA-05           | FR-AIA-05              |
| TC-AIA-06    | Không lưu raw PII trong AI Audit    | Kiểm tra audit summary không chứa raw PII.                           | Data/Negative    | MVP         | P0       | UC-AIA-07           | FR-AIA-06              |
| TC-AIA-07    | Admin xem AI Audit Log tối thiểu    | Kiểm tra Admin xem được AI Audit Log phục vụ demo traceability.      | UI/API           | MVP         | P1       | UC-AIA-06           | FR-AIA-07              |
| TC-AIA-08    | AI observability dashboard nâng cao | Kiểm tra dashboard nâng cao nếu được triển khai.                     | UI               | Should-have | P3       | UC-AIA-08           | FR-AIA-08              |
| TC-AIA-09    | Retention trong demo lifecycle      | Kiểm tra AI Audit Log không bị auto-delete trong MVP/demo lifecycle. | Data             | MVP         | P1       | UC-AIA-09           | FR-AIA-09              |

---

## 7.20. Graph Sync Test Cases

| Test Case ID | Test Case Name                                   | Mục tiêu kiểm thử                                                          | Test Type        | Scope       | Priority | Linked Use Case IDs | Linked Requirement IDs |
| ------------ | ------------------------------------------------ | -------------------------------------------------------------------------- | ---------------- | ----------- | -------- | ------------------- | ---------------------- |
| TC-GSY-01    | Tạo Graph Sync Outbox Event                      | Kiểm tra thay đổi source table tạo outbox event.                           | Integration/Data | MVP         | P0       | UC-GSY-01           | FR-GSY-01, FR-GSY-03   |
| TC-GSY-02    | Worker project Medicine sang Neo4j               | Kiểm tra worker project Medicine node sang Neo4j.                          | Integration      | MVP         | P0       | UC-GSY-02           | FR-GSY-04, FR-GSY-09   |
| TC-GSY-03    | Worker project ActiveIngredient sang Neo4j       | Kiểm tra worker project ActiveIngredient node.                             | Integration      | MVP         | P0       | UC-GSY-02           | FR-GSY-04, FR-GSY-09   |
| TC-GSY-04    | Worker project CONTAINS relationship             | Kiểm tra Medicine–CONTAINS–ActiveIngredient relationship được project.     | Integration      | MVP         | P0       | UC-GSY-02           | FR-GSY-10              |
| TC-GSY-05    | Worker project INTERACTS_WITH rule               | Kiểm tra ActiveIngredient-level INTERACTS_WITH được project.               | Integration      | MVP         | P0       | UC-GSY-02           | FR-GSY-11              |
| TC-GSY-06    | Retry khi Graph Sync fail                        | Kiểm tra failed job được retry theo cơ chế backend.                        | Integration      | MVP         | P0       | UC-GSY-03           | FR-GSY-05              |
| TC-GSY-07    | Ghi attempts/failure logs                        | Kiểm tra attempts/logs/failure logging được ghi khi sync lỗi.              | Integration/Data | MVP         | P1       | UC-GSY-04           | FR-GSY-06, FR-AUD-08   |
| TC-GSY-08    | Freshness dựa trên source version + outbox state | Kiểm tra graph freshness không chỉ dựa trên elapsed time/syncedAt.         | Integration/Data | MVP         | P0       | UC-GSY-05           | FR-GSY-07              |
| TC-GSY-09    | graph_projection_versions cập nhật đúng          | Kiểm tra version mới nhất đã project được lưu đúng.                        | Integration/Data | MVP         | P0       | UC-GSY-05           | FR-GSY-08              |
| TC-GSY-10    | Deactivated entity project isActive=false        | Kiểm tra entity/rule deactivate được giữ trong Neo4j với `isActive=false`. | Integration      | MVP         | P1       | UC-GSY-06           | FR-GSY-12              |
| TC-GSY-11    | Graph Sync Status UI                             | Kiểm tra Admin UI status/retry nếu triển khai.                             | UI               | Should-have | P2       | UC-GSY-07           | FR-GSY-13              |
| TC-GSY-12    | Manual retry/rebuild Graph Projection            | Kiểm tra manual retry/rebuild nếu triển khai.                              | API/UI           | Should-have | P2       | UC-GSY-08           | FR-GSY-13              |

---

## 7.21. Graph-RAG Test Cases

| Test Case ID | Test Case Name                                        | Mục tiêu kiểm thử                                                                | Test Type            | Scope       | Priority | Linked Use Case IDs | Linked Requirement IDs |
| ------------ | ----------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------- | ----------- | -------- | ------------------- | ---------------------- |
| TC-GRG-01    | Graph-RAG interaction explanation                     | Kiểm tra Graph-RAG trả explanation cho interaction alert.                        | API/UI               | MVP         | P0       | UC-GRG-01           | FR-GRG-01, FR-GRG-02   |
| TC-GRG-02    | Response có provenance metadata                       | Kiểm tra Graph-RAG response có provenance metadata.                              | API                  | MVP         | P0       | UC-GRG-02           | FR-GRG-03              |
| TC-GRG-03    | Response có freshness metadata                        | Kiểm tra Graph-RAG response có freshness metadata.                               | API                  | MVP         | P0       | UC-GRG-03           | FR-GRG-04              |
| TC-GRG-04    | Fallback PostgreSQL khi Neo4j unavailable             | Kiểm tra interaction explanation fallback sang PostgreSQL khi Neo4j unavailable. | Integration/API      | MVP         | P0       | UC-GRG-04           | FR-GRG-05              |
| TC-GRG-05    | Fallback PostgreSQL khi graph stale                   | Kiểm tra interaction explanation fallback khi graph stale.                       | Integration/API      | MVP         | P0       | UC-GRG-04           | FR-GRG-05, FR-GRG-07   |
| TC-GRG-06    | Pure graph query trả safe error khi không có fallback | Kiểm tra pure graph query không fallback thì trả safe error.                     | API/Negative         | MVP         | P0       | UC-GRG-05           | FR-GRG-06              |
| TC-GRG-07    | Không dùng stale graph âm thầm                        | Kiểm tra stale graph luôn có warning/fallback, không dùng im lặng.               | Integration/API      | MVP         | P0       | UC-GRG-04           | FR-GRG-07              |
| TC-GRG-08    | Chặn raw Cypher từ Staff                              | Kiểm tra Staff không thể submit raw Cypher.                                      | Security/Auth/API    | MVP         | P0       | UC-GRG-06           | FR-GRG-08              |
| TC-GRG-09    | Graph không lưu PII                                   | Kiểm tra graph model/projection không chứa PII.                                  | Data/Negative        | MVP         | P0       | UC-GRG-07           | FR-GRG-09              |
| TC-GRG-10    | Graph không quyết định checkout                       | Kiểm tra checkout không phụ thuộc Neo4j để quyết định business rule.             | Integration/Negative | MVP         | P0       | UC-GRG-08           | FR-GRG-10              |
| TC-GRG-11    | Graph Explorer read-only                              | Kiểm tra Graph Explorer read-only nếu triển khai.                                | UI/Security          | Should-have | P2       | UC-GRG-09           | FR-GRG-11              |

---

## 7.22. Reports Test Cases

| Test Case ID | Test Case Name                             | Mục tiêu kiểm thử                                               | Test Type          | Scope                         | Priority | Linked Use Case IDs | Linked Requirement IDs |
| ------------ | ------------------------------------------ | --------------------------------------------------------------- | ------------------ | ----------------------------- | -------- | ------------------- | ---------------------- |
| TC-RPT-01    | Revenue Report tính PAID orders            | Kiểm tra doanh thu chỉ tính PAID orders hợp lệ.                 | Integration/API/UI | MVP                           | P0       | UC-RPT-01           | FR-RPT-01, FR-RPT-04   |
| TC-RPT-02    | Revenue Report loại DRAFT/CANCELLED/FAILED | Kiểm tra DRAFT/CANCELLED/FAILED không tính vào revenue.         | Integration/Data   | MVP                           | P0       | UC-RPT-01           | FR-RPT-04              |
| TC-RPT-03    | Top Medicines Report                       | Kiểm tra top medicines dựa trên PAID order items hợp lệ.        | Integration/API/UI | MVP                           | P0       | UC-RPT-02           | FR-RPT-02, FR-RPT-04   |
| TC-RPT-04    | Inventory Report                           | Kiểm tra Admin/Warehouse xem inventory report theo quyền.       | API/UI             | MVP                           | P0       | UC-RPT-03           | FR-RPT-03              |
| TC-RPT-05    | Basic report filters                       | Kiểm tra filter cơ bản theo ngày/trạng thái nếu triển khai.     | API/UI             | MVP                           | P1       | UC-RPT-04           | FR-RPT-05              |
| TC-RPT-06    | AI business report narrative               | Kiểm tra AI narrative nếu triển khai Should-have.               | API/UI             | Should-have                   | P3       | UC-RPT-05           | FR-RPT-06              |
| TC-RPT-07    | Forecast tồn kho                           | Không test trong MVP, chỉ dành cho Future/Commercial Expansion. | Manual             | Future / Commercial Expansion | P3       | UC-RPT-06           | FR-RPT-07              |

---

## 7.23. System Settings Test Cases

| Test Case ID | Test Case Name                          | Mục tiêu kiểm thử                                                          | Test Type          | Scope       | Priority | Linked Use Case IDs  | Linked Requirement IDs |
| ------------ | --------------------------------------- | -------------------------------------------------------------------------- | ------------------ | ----------- | -------- | -------------------- | ---------------------- |
| TC-SET-01    | Default near-expiry threshold = 90 ngày | Kiểm tra setting mặc định là 90 ngày.                                      | API/Data/UI        | MVP         | P0       | UC-SET-01            | FR-SET-01              |
| TC-SET-02    | Admin cập nhật near-expiry threshold    | Kiểm tra Admin đổi threshold và near-expiry calculation dùng giá trị mới.  | Integration/UI     | MVP         | P0       | UC-SET-01, UC-BAT-05 | FR-SET-01, FR-BAT-07   |
| TC-SET-03    | Validate settings value                 | Kiểm tra reject giá trị setting không hợp lệ.                              | API/UI             | MVP         | P1       | UC-SET-02            | FR-SET-02              |
| TC-SET-04    | Audit settings change                   | Kiểm tra thay đổi setting quan trọng được audit.                           | Integration/Data   | MVP         | P1       | UC-SET-03            | FR-SET-03              |
| TC-SET-05    | AI provider/model config có sẵn         | Kiểm tra hệ thống có provider/model config bắt buộc qua env hoặc database. | Integration/Config | MVP         | P0       | UC-SET-04            | FR-SET-04              |
| TC-SET-06    | Admin Provider Config UI                | Kiểm tra UI cấu hình provider/model nếu triển khai.                        | UI                 | Should-have | P3       | UC-SET-05            | FR-SET-05              |
| TC-SET-07    | Admin Prompt Template UI                | Kiểm tra UI quản lý prompt template nếu triển khai.                        | UI                 | Should-have | P3       | UC-SET-06            | FR-SET-06              |

---

## 7.24. Demo Data & Demo Reset Test Cases

| Test Case ID | Test Case Name                        | Mục tiêu kiểm thử                                                                                      | Test Type         | Scope | Priority | Linked Use Case IDs | Linked Requirement IDs |
| ------------ | ------------------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------- | ----- | -------- | ------------------- | ---------------------- |
| TC-DMO-01    | Curated MVP operational seed          | Kiểm tra seed dùng curated MVP data, không dùng toàn bộ scraped data.                                  | Data/Migration    | MVP   | P0       | UC-DMO-01           | FR-DMO-01              |
| TC-DMO-02    | Seed demo users                       | Kiểm tra seed có Admin, Staff, Warehouse và new-staff account.                                         | Data/Integration  | MVP   | P0       | UC-DMO-02           | FR-DMO-02              |
| TC-DMO-03    | Dynamic expiry dates                  | Kiểm tra expiry dates được tạo relative to reset date.                                                 | Data/Unit         | MVP   | P0       | UC-DMO-03           | FR-DMO-03              |
| TC-DMO-04    | Seed FEFO multi-batch scenario        | Kiểm tra demo data có nhiều batch, expired batch và allocation qua nhiều batch.                        | Data/E2E          | MVP   | P0       | UC-DMO-04           | FR-DMO-04              |
| TC-DMO-05    | Seed PAID order với HIGH alert hợp lệ | Kiểm tra seeded PAID order có alert, acknowledgement, consultation note, payment, invoice, allocation. | Data/Integration  | MVP   | P1       | UC-DMO-05           | FR-DMO-05              |
| TC-DMO-06    | Seed report data                      | Kiểm tra demo data đủ PAID/DRAFT/CANCELLED/FAILED cases.                                               | Data              | MVP   | P1       | UC-DMO-06           | FR-DMO-06              |
| TC-DMO-07    | demo:reset chỉ chạy local             | Kiểm tra script chỉ cho phép local environment.                                                        | Negative/Config   | MVP   | P0       | UC-DMO-07           | FR-DMO-07              |
| TC-DMO-08    | demo:reset từ chối unsafe environment | Kiểm tra script refuse demo/staging/production/unknown.                                                | Negative/Config   | MVP   | P0       | UC-DMO-08           | FR-DMO-08              |
| TC-DMO-09    | demo:reset rebuild Neo4j projection   | Kiểm tra reset rebuild graph projection và freshness.                                                  | Integration       | MVP   | P0       | UC-DMO-09           | FR-DMO-09              |
| TC-DMO-10    | demo:reset chạy smoke tests           | Kiểm tra reset chạy smoke tests cơ bản sau khi hoàn tất.                                               | Smoke/Integration | MVP   | P1       | UC-DMO-10           | FR-DMO-10              |

---

## 7.25. System Audit Test Cases

| Test Case ID | Test Case Name                          | Mục tiêu kiểm thử                                           | Test Type        | Scope       | Priority | Linked Use Case IDs | Linked Requirement IDs |
| ------------ | --------------------------------------- | ----------------------------------------------------------- | ---------------- | ----------- | -------- | ------------------- | ---------------------- |
| TC-AUD-01    | Backend audit logging hoạt động         | Kiểm tra nghiệp vụ quan trọng tạo audit log.                | Integration/Data | MVP         | P0       | UC-AUD-01           | FR-AUD-01              |
| TC-AUD-02    | Audit user/role change                  | Kiểm tra thay đổi user/role được audit.                     | Integration/Data | MVP         | P1       | UC-AUD-02           | FR-AUD-02              |
| TC-AUD-03    | Audit supplier deactivation             | Kiểm tra deactivate Supplier được audit.                    | Integration/Data | MVP         | P1       | UC-AUD-03           | FR-AUD-03              |
| TC-AUD-04    | Audit Stock Import confirmation         | Kiểm tra confirm Stock Import được audit.                   | Integration/Data | MVP         | P1       | UC-AUD-04           | FR-AUD-04              |
| TC-AUD-05    | Audit Inventory Adjustment confirmation | Kiểm tra confirm adjustment được audit.                     | Integration/Data | MVP         | P0       | UC-AUD-05           | FR-AUD-05              |
| TC-AUD-06    | Audit checkout                          | Kiểm tra checkout event quan trọng được audit.              | Integration/Data | MVP         | P1       | UC-AUD-06           | FR-AUD-06              |
| TC-AUD-07    | Audit HIGH alert evidence               | Kiểm tra HIGH alert acknowledgement/note traceable/audited. | Integration/Data | MVP         | P0       | UC-AUD-07           | FR-AUD-07              |
| TC-AUD-08    | Audit Graph Sync failure                | Kiểm tra Graph Sync failure được audit/failure log.         | Integration/Data | MVP         | P0       | UC-AUD-08           | FR-AUD-08              |
| TC-AUD-09    | Full System Audit Log UI                | Kiểm tra Admin System Audit Log UI nếu triển khai.          | UI               | Should-have | P2       | UC-AUD-09           | FR-AUD-09              |

---

## 7.26. DevOps / CI / Setup Test Cases

| Test Case ID | Test Case Name                        | Mục tiêu kiểm thử                                                                           | Test Type       | Scope       | Priority | Linked Use Case IDs | Linked Requirement IDs |
| ------------ | ------------------------------------- | ------------------------------------------------------------------------------------------- | --------------- | ----------- | -------- | ------------------- | ---------------------- |
| TC-DEV-01    | Setup local environment               | Kiểm tra setup chính dùng local Node.js + cloud Supabase + Neo4j AuraDB.                    | Manual/Config   | MVP         | P0       | UC-DEV-01           | FR-DEV-01, FR-DEV-02   |
| TC-DEV-02    | Docker không phải official setup path | Kiểm tra tài liệu/setup không bắt buộc Docker.                                              | Manual/Negative | MVP         | P0       | UC-DEV-08           | FR-DEV-03              |
| TC-DEV-03    | Prisma validation pass                | Kiểm tra Prisma schema validation pass trong CI/local gate.                                 | Data/Migration  | MVP         | P0       | UC-DEV-02           | FR-DEV-04              |
| TC-DEV-04    | Migration check pass                  | Kiểm tra migration check pass, không dùng unsafe schema push trong shared/demo environment. | Data/Migration  | MVP         | P0       | UC-DEV-02           | FR-DEV-04              |
| TC-DEV-05    | Frontend build pass                   | Kiểm tra frontend build thành công.                                                         | CI              | MVP         | P0       | UC-DEV-03           | FR-DEV-05              |
| TC-DEV-06    | Backend build pass                    | Kiểm tra backend build thành công.                                                          | CI              | MVP         | P0       | UC-DEV-04           | FR-DEV-06              |
| TC-DEV-07    | Lint và type check pass               | Kiểm tra lint và type check pass.                                                           | CI              | MVP         | P0       | UC-DEV-05           | FR-DEV-07              |
| TC-DEV-08    | Release PR từ develop vào main        | Kiểm tra merge main chỉ qua reviewed release PR từ develop.                                 | Manual/Process  | MVP         | P1       | UC-DEV-06           | FR-DEV-08              |
| TC-DEV-09    | Demo/staging environment nếu có       | Kiểm tra demo/staging environment nếu team chốt triển khai.                                 | Manual/Config   | Should-have | P2       | UC-DEV-07           | FR-DEV-09              |

---

## 7.27. Testing Governance Test Cases

| Test Case ID | Test Case Name                          | Mục tiêu kiểm thử                                                                                      | Test Type            | Scope | Priority | Linked Use Case IDs | Linked Requirement IDs |
| ------------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------- | ----- | -------- | ------------------- | ---------------------- |
| TC-TST-01    | Recommended testing stack được ghi nhận | Kiểm tra tài liệu ghi recommended stack nhưng không biến thành quyết định đã chốt nếu team chưa adopt. | Manual/Documentation | MVP   | P1       | UC-TST-01           | FR-TST-01, FR-TST-02   |
| TC-TST-02    | Test isolation/cleanup                  | Kiểm tra automated tests có isolation/cleanup trên non-demo local environment hoặc test schema/config. | Integration/Process  | MVP   | P0       | UC-TST-02           | FR-TST-03, FR-TST-04   |
| TC-TST-03    | Không destructive test trên demo DB     | Kiểm tra cấu hình test không trỏ destructive tests vào demo DB.                                        | Negative/Config      | MVP   | P0       | UC-TST-03           | FR-TST-05              |
| TC-TST-04    | Chrome desktop/laptop target            | Kiểm tra MVP browser target trên Chrome desktop/laptop.                                                | Manual/UI            | MVP   | P1       | UC-TST-04           | FR-TST-06              |
| TC-TST-05    | Basic responsive check                  | Kiểm tra responsive cơ bản, không yêu cầu full cross-browser.                                          | Manual/UI            | MVP   | P2       | UC-TST-05           | FR-TST-07              |
| TC-TST-06    | High-risk module test coverage focus    | Kiểm tra test plan ưu tiên Checkout, FEFO, Interaction, AI Guardrail.                                  | Manual/Process       | MVP   | P1       | UC-TST-06           | FR-TST-08              |
| TC-TST-07    | Smoke test trước demo                   | Kiểm tra smoke test critical path chạy trước demo.                                                     | Smoke                | MVP   | P0       | UC-TST-07           | FR-TST-09              |
| TC-TST-08    | Test exit approval                      | Kiểm tra Project Leader approve release dựa trên report của Tester và Release/Demo Owner.              | Manual/Process       | MVP   | P1       | UC-TST-08           | FR-TST-10              |

---

## 7.28. Smoke Test / E2E Demo Flow Test Cases

| Test Case ID | Test Case Name                    | Mục tiêu kiểm thử                                                          | Test Type         | Scope | Priority | Linked Use Case IDs             | Linked Requirement IDs          |
| ------------ | --------------------------------- | -------------------------------------------------------------------------- | ----------------- | ----- | -------- | ------------------------------- | ------------------------------- |
| TC-SMK-01    | Smoke Auth → Dashboard            | Đăng nhập bằng Admin/Staff/Warehouse và vào đúng dashboard theo quyền.     | Smoke/E2E         | MVP   | P0       | UC-AUTH-01, UC-RBAC-04          | FR-AUTH-01, FR-RBAC-06          |
| TC-SMK-02    | Smoke Medicine + ActiveIngredient | Tạo Medicine, ActiveIngredient và mapping hợp lệ.                          | Smoke/E2E         | MVP   | P0       | UC-MED-01, UC-ACT-01, UC-ACT-04 | FR-MED-01, FR-ACT-01, FR-ACT-04 |
| TC-SMK-03    | Smoke Supplier + Stock Import     | Tạo Supplier, tạo Stock Import và confirm để tạo batch.                    | Smoke/E2E         | MVP   | P0       | UC-SUP-01, UC-STI-01, UC-STI-03 | FR-SUP-01, FR-STI-03            |
| TC-SMK-04    | Smoke Inventory Adjustment        | Tạo và confirm Inventory Adjustment có reason.                             | Smoke/E2E         | MVP   | P0       | UC-ADJ-01, UC-ADJ-03            | FR-ADJ-01, FR-ADJ-03            |
| TC-SMK-05    | Smoke POS Draft Order             | Staff tạo Draft Order, thêm thuốc, validate sellable stock.                | Smoke/E2E         | MVP   | P0       | UC-POS-01, UC-POS-02, UC-POS-05 | FR-POS-01, FR-POS-05            |
| TC-SMK-06    | Smoke InteractionAlert HIGH       | Order có HIGH alert, user acknowledgement và nhập consultation note.       | Smoke/E2E         | MVP   | P0       | UC-ALT-01, UC-ALT-05, UC-ALT-06 | FR-ALT-06, FR-ALT-07            |
| TC-SMK-07    | Smoke Checkout + FEFO + Invoice   | Checkout thành công, FEFO allocation đúng, tạo payment SUCCESS và invoice. | Smoke/E2E         | MVP   | P0       | UC-CHK-01, UC-CHK-03, UC-INV-01 | FR-CHK-03, FR-CHK-04, FR-INV-01 |
| TC-SMK-08    | Smoke AI Copilot + Audit          | AI tạo explanation/draft, guardrail/audit hoạt động.                       | Smoke/E2E         | MVP   | P0       | UC-AIC-01, UC-AIG-01, UC-AIA-01 | FR-AIC-02, FR-AIG-01, FR-AIA-01 |
| TC-SMK-09    | Smoke Graph Sync + Graph-RAG      | Graph Sync project dữ liệu và Graph-RAG trả provenance/freshness.          | Smoke/E2E         | MVP   | P0       | UC-GSY-02, UC-GRG-01            | FR-GSY-04, FR-GRG-03, FR-GRG-04 |
| TC-SMK-10    | Smoke Reports                     | Revenue, Top Medicines và Inventory Report hiển thị dữ liệu đúng.          | Smoke/E2E         | MVP   | P0       | UC-RPT-01, UC-RPT-02, UC-RPT-03 | FR-RPT-01, FR-RPT-02, FR-RPT-03 |
| TC-SMK-11    | Smoke demo:reset local            | Chạy demo:reset local, rebuild graph, chạy smoke checks cơ bản.            | Smoke/Integration | MVP   | P0       | UC-DMO-07, UC-DMO-09, UC-DMO-10 | FR-DMO-07, FR-DMO-09, FR-DMO-10 |

---

## 7.29. Negative Scope Control Test Cases

| Test Case ID | Test Case Name                                    | Mục tiêu kiểm thử                                                                | Test Type              | Scope        | Priority | Linked Use Case IDs             | Linked Requirement IDs          |
| ------------ | ------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------- | ------------ | -------- | ------------------------------- | ------------------------------- |
| TC-NEG-01    | Không có custom JWT login flow                    | Kiểm tra hệ thống không quay lại custom username/password/JWT auth.              | Negative/Security      | Out of Scope | P0       | UC-AUTH-01                      | FR-AUTH-01, FR-AUTH-05          |
| TC-NEG-02    | Không lưu password_hash trong PostgreSQL          | Kiểm tra schema không có password_hash cho user auth.                            | Negative/Data          | Out of Scope | P0       | UC-AUTH-04                      | FR-AUTH-05                      |
| TC-NEG-03    | Không dùng aggregate inventory source of truth    | Kiểm tra inventory không phụ thuộc aggregate table làm nguồn thật.               | Negative/Data          | Out of Scope | P0       | UC-BAT-07                       | FR-BAT-01                       |
| TC-NEG-04    | Không direct edit quantity                        | Kiểm tra không có UI/API cho Warehouse sửa quantity trực tiếp.                   | Negative/Security      | Out of Scope | P0       | UC-ADJ-05                       | FR-ADJ-04                       |
| TC-NEG-05    | Không official medicine-level interaction rule    | Kiểm tra rule chính thức không lưu theo Medicine–Medicine.                       | Negative/Data          | Out of Scope | P0       | UC-DRG-01                       | FR-DRG-01, FR-DRG-07            |
| TC-NEG-06    | Không MockAI-only MVP                             | Kiểm tra Google AI vẫn là primary provider, MockAI chỉ fallback.                 | Negative/Config        | Out of Scope | P0       | UC-AIC-05                       | FR-AIC-09, FR-AIC-10            |
| TC-NEG-07    | Không MockGraph-only MVP                          | Kiểm tra Neo4j thật là graph projection, không chỉ mock graph.                   | Negative/Integration   | Out of Scope | P0       | UC-GSY-02                       | FR-GSY-02                       |
| TC-NEG-08    | Không dùng stale graph âm thầm                    | Kiểm tra stale graph không được dùng mà không warning/fallback.                  | Negative/Integration   | Out of Scope | P0       | UC-GRG-04                       | FR-GRG-07                       |
| TC-NEG-09    | Không dùng /orders/{id}/pay làm command chính     | Kiểm tra direct pay endpoint không là flow chính.                                | Negative/API           | Out of Scope | P0       | UC-CHK-09                       | FR-CHK-02                       |
| TC-NEG-10    | Không direct invoice creation normal flow         | Kiểm tra invoice không tạo trực tiếp ngoài checkout transaction.                 | Negative/API           | Out of Scope | P0       | UC-INV-06                       | FR-INV-02                       |
| TC-NEG-11    | Không dùng full 100-table schema làm MVP blocker  | Kiểm tra MVP chỉ dùng core subset cần thiết.                                     | Negative/Documentation | Out of Scope | P0       | UC-DMO-01                       | FR-DMO-01                       |
| TC-NEG-12    | Không dùng ProductVariant làm MVP sales key       | Kiểm tra POS/Checkout dùng medicine_id làm business key.                         | Negative/Data          | Out of Scope | P0       | UC-POS-02, UC-CHK-01            | FR-POS-02                       |
| TC-NEG-13    | Không raw Cypher cho Staff                        | Kiểm tra Staff không có UI/API nhập raw Cypher.                                  | Negative/Security      | Out of Scope | P0       | UC-GRG-06                       | FR-GRG-08                       |
| TC-NEG-14    | Không DrugGroup/Symptom/Condition trong graph MVP | Kiểm tra graph MVP chỉ gồm Medicine, ActiveIngredient, CONTAINS, INTERACTS_WITH. | Negative/Data          | Out of Scope | P0       | UC-GSY-02                       | FR-GSY-09, FR-GSY-10, FR-GSY-11 |
| TC-NEG-15    | Không riskScore ảnh hưởng checkout/severity       | Kiểm tra checkout/severity không dùng riskScore.                                 | Negative/Integration   | Out of Scope | P0       | UC-CHK-02, UC-DRG-04            | FR-CHK-07, FR-DRG-05            |
| TC-NEG-16    | Không AI diagnosis/prescribing/dosage             | Kiểm tra AI Guardrail chặn cả ba nhóm yêu cầu cấm.                               | Negative/API           | Out of Scope | P0       | UC-AIG-02, UC-AIG-03, UC-AIG-04 | FR-AIC-06, FR-AIC-07, FR-AIC-08 |

---

# 8. MVP P0 Test Summary

Các test P0 bắt buộc nhất cho MVP/demo:

| Area                         | P0 Test Case IDs                                                                                                                                                                                     |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Auth/RBAC                    | TC-AUTH-01, TC-AUTH-04, TC-AUTH-05, TC-AUTH-06, TC-RBAC-01, TC-RBAC-02, TC-RBAC-04, TC-RBAC-05, TC-RBAC-06                                                                                           |
| Medicine/Ingredient/Supplier | TC-MED-01, TC-MED-02, TC-MED-04, TC-MED-05, TC-ACT-01, TC-ACT-04, TC-ACT-05, TC-ACT-07, TC-SUP-01, TC-SUP-03, TC-SUP-04                                                                              |
| Inventory/Batch              | TC-BAT-01, TC-BAT-02, TC-BAT-03, TC-BAT-04, TC-BAT-05, TC-BAT-06, TC-BAT-08                                                                                                                          |
| Stock Import                 | TC-STI-01, TC-STI-02, TC-STI-03, TC-STI-04, TC-STI-05                                                                                                                                                |
| Inventory Adjustment         | TC-ADJ-01, TC-ADJ-02, TC-ADJ-03, TC-ADJ-04, TC-ADJ-05, TC-ADJ-06                                                                                                                                     |
| POS                          | TC-POS-01, TC-POS-02, TC-POS-03, TC-POS-04, TC-POS-06, TC-POS-07, TC-POS-09, TC-POS-10                                                                                                               |
| Interaction                  | TC-DRG-01, TC-DRG-04, TC-DRG-05, TC-DRG-06, TC-ALT-01, TC-ALT-02, TC-ALT-03, TC-ALT-06, TC-ALT-07, TC-ALT-08, TC-ALT-09, TC-ALT-11                                                                   |
| Checkout/FEFO                | TC-CHK-01, TC-CHK-02, TC-CHK-03, TC-CHK-04, TC-CHK-05, TC-CHK-06, TC-CHK-07, TC-CHK-08, TC-CHK-09, TC-FEFO-01, TC-FEFO-02, TC-FEFO-03, TC-FEFO-04, TC-FEFO-05                                        |
| Payment/Invoice              | TC-PAY-01, TC-PAY-02, TC-PAY-03, TC-PAY-04, TC-PAY-05, TC-PAY-07, TC-INV-01, TC-INV-02                                                                                                               |
| AI                           | TC-AIC-01, TC-AIC-02, TC-AIC-03, TC-AIC-05, TC-AIC-06, TC-AIC-07, TC-AIG-01, TC-AIG-02, TC-AIG-03, TC-AIG-04, TC-AIG-05, TC-AIG-06, TC-AIG-07, TC-AIA-01, TC-AIA-02, TC-AIA-03, TC-AIA-04, TC-AIA-06 |
| Graph                        | TC-GSY-01, TC-GSY-02, TC-GSY-03, TC-GSY-04, TC-GSY-05, TC-GSY-06, TC-GSY-08, TC-GSY-09, TC-GRG-01, TC-GRG-02, TC-GRG-03, TC-GRG-04, TC-GRG-05, TC-GRG-06, TC-GRG-07, TC-GRG-08, TC-GRG-09, TC-GRG-10 |
| Reports/Settings/Demo        | TC-RPT-01, TC-RPT-02, TC-RPT-03, TC-RPT-04, TC-SET-01, TC-SET-02, TC-SET-05, TC-DMO-01, TC-DMO-02, TC-DMO-03, TC-DMO-04, TC-DMO-07, TC-DMO-08, TC-DMO-09                                             |
| Testing/Smoke                | TC-TST-02, TC-TST-03, TC-TST-07, TC-SMK-01 → TC-SMK-11                                                                                                                                               |
| Scope Control                | TC-NEG-01 → TC-NEG-16                                                                                                                                                                                |

---

# 9. High-risk Module Test Focus

Theo baseline, các module high-risk cần ưu tiên test meaningful coverage:

| High-risk Module                         | Test Case IDs cần ưu tiên                  |
| ---------------------------------------- | ------------------------------------------ |
| Checkout                                 | TC-CHK-01 → TC-CHK-09                      |
| FEFO                                     | TC-FEFO-01 → TC-FEFO-06                    |
| InteractionAlert                         | TC-ALT-01 → TC-ALT-11                      |
| HIGH acknowledgement + consultation note | TC-ALT-06, TC-ALT-07, TC-ALT-08, TC-ALT-09 |
| AI Guardrail                             | TC-AIG-01 → TC-AIG-09                      |
| AI Audit                                 | TC-AIA-01 → TC-AIA-07                      |
| Graph Sync                               | TC-GSY-01 → TC-GSY-10                      |
| Graph-RAG freshness/fallback             | TC-GRG-03 → TC-GRG-07                      |
| Demo Reset                               | TC-DMO-07 → TC-DMO-10                      |
| RBAC/Ownership                           | TC-RBAC-02, TC-RBAC-04, TC-RBAC-06         |

---

# 10. Preliminary Use-Case-to-Test Mapping

| Use Case Group                | Primary Test Case IDs   |
| ----------------------------- | ----------------------- |
| UC-AUTH                       | TC-AUTH-01 → TC-AUTH-06 |
| UC-USER                       | TC-USER-01 → TC-USER-05 |
| UC-RBAC                       | TC-RBAC-01 → TC-RBAC-06 |
| UC-MED                        | TC-MED-01 → TC-MED-07   |
| UC-ACT                        | TC-ACT-01 → TC-ACT-07   |
| UC-SUP                        | TC-SUP-01 → TC-SUP-05   |
| UC-BAT                        | TC-BAT-01 → TC-BAT-09   |
| UC-STI                        | TC-STI-01 → TC-STI-07   |
| UC-ADJ                        | TC-ADJ-01 → TC-ADJ-07   |
| UC-POS                        | TC-POS-01 → TC-POS-10   |
| UC-DRG                        | TC-DRG-01 → TC-DRG-07   |
| UC-ALT                        | TC-ALT-01 → TC-ALT-11   |
| UC-CHK                        | TC-CHK-01 → TC-CHK-09   |
| UC-FEFO / Checkout Allocation | TC-FEFO-01 → TC-FEFO-06 |
| UC-PAY                        | TC-PAY-01 → TC-PAY-08   |
| UC-INV                        | TC-INV-01 → TC-INV-06   |
| UC-AIC                        | TC-AIC-01 → TC-AIC-07   |
| UC-AIG                        | TC-AIG-01 → TC-AIG-09   |
| UC-AIA                        | TC-AIA-01 → TC-AIA-09   |
| UC-GSY                        | TC-GSY-01 → TC-GSY-12   |
| UC-GRG                        | TC-GRG-01 → TC-GRG-11   |
| UC-RPT                        | TC-RPT-01 → TC-RPT-07   |
| UC-SET                        | TC-SET-01 → TC-SET-07   |
| UC-DMO                        | TC-DMO-01 → TC-DMO-10   |
| UC-AUD                        | TC-AUD-01 → TC-AUD-09   |
| UC-DEV                        | TC-DEV-01 → TC-DEV-09   |
| UC-TST                        | TC-TST-01 → TC-TST-08   |
| Smoke/E2E                     | TC-SMK-01 → TC-SMK-11   |
| Scope Control                 | TC-NEG-01 → TC-NEG-16   |

---

# 11. Ghi chú cho bước tiếp theo

Sau Test Case ID Registry, bước tiếp theo là tạo:

```text
Traceability Matrix tổng
```

Matrix tổng cần nối:

```text
Requirement → Use Case → API → UI → Database → Test Case → Jira
```

Các cột đề xuất:

| Cột              | Nội dung                                   |
| ---------------- | ------------------------------------------ |
| Requirement ID   | Mã FR/NFR/business requirement             |
| Requirement Name | Tên requirement                            |
| Use Case ID      | Use Case liên quan                         |
| API              | Endpoint/API group liên quan               |
| UI Screen        | Screen/route/panel liên quan               |
| Database         | Table/entity chính                         |
| Test Case ID     | Test case kiểm chứng                       |
| Jira Component   | Component tương ứng                        |
| Jira Epic        | Epic tương ứng                             |
| Jira Story/Task  | Story/task sẽ được tạo hoặc revise         |
| Scope            | MVP / Should-have / Future / Out of Scope  |
| Priority         | P0/P1/P2/P3                                |
| Status           | Draft / Ready / Implemented / Tested / Gap |
