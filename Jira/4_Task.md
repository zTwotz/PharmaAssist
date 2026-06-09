# Cấu trúc mới cho bộ tài liệu 4_Task

Thay vì chỉ có 4 tài liệu Task lớn, bộ `4_Task` sẽ được chia thành **8 tài liệu con**.

Mỗi phần gồm 2 file:

1. **Task List File**
   Dùng để liệt kê danh sách Task dạng bảng, dễ nhập vào Jira.

2. **Task Description File**
   Dùng để viết **Mẫu Description chi tiết cho từng Task**, mỗi Task có nội dung công việc, kết quả mong đợi, guardrails và ghi chú cho AI agent.

---

# Tổng quan 8 tài liệu Task

| Nhóm | File                                                          |                      Task range | Số Task | Nội dung                                                                                                           |
| ---- | ------------------------------------------------------------- | ------------------------------: | ------: | ------------------------------------------------------------------------------------------------------------------ |
| 4A-1 | `4A_Task_List_MVP_Foundation_001_145.md`                      | `PAC-TASK-001` → `PAC-TASK-145` |     145 | Danh sách Task cho Auth, RBAC, User, Medicine, ActiveIngredient, Supplier, MedicineBatch, Stock Import             |
| 4A-2 | `4A_Task_Description_MVP_Foundation_001_145.md`               | `PAC-TASK-001` → `PAC-TASK-145` |     145 | Description chi tiết cho từng Task trong 4A                                                                        |
| 4B-1 | `4B_Task_List_MVP_POS_Interaction_Checkout_146_290.md`        | `PAC-TASK-146` → `PAC-TASK-290` |     145 | Danh sách Task cho Inventory Adjustment, POS, InteractionAlert, Checkout, FEFO, Payment, Invoice                   |
| 4B-2 | `4B_Task_Description_MVP_POS_Interaction_Checkout_146_290.md` | `PAC-TASK-146` → `PAC-TASK-290` |     145 | Description chi tiết cho từng Task trong 4B                                                                        |
| 4C-1 | `4C_Task_List_MVP_AI_Graph_Report_Demo_291_435.md`            | `PAC-TASK-291` → `PAC-TASK-435` |     145 | Danh sách Task cho AI Copilot, AI Guardrail, AI Audit, Graph Sync, Neo4j, Graph-RAG, Reports, Settings, Demo Reset |
| 4C-2 | `4C_Task_Description_MVP_AI_Graph_Report_Demo_291_435.md`     | `PAC-TASK-291` → `PAC-TASK-435` |     145 | Description chi tiết cho từng Task trong 4C                                                                        |
| 4D-1 | `4D_Task_List_Testing_Advanced_Future_436_580.md`             | `PAC-TASK-436` → `PAC-TASK-580` |     145 | Danh sách Task cho Testing, DevOps, Documentation, Should-have, Future                                             |
| 4D-2 | `4D_Task_Description_Testing_Advanced_Future_436_580.md`      | `PAC-TASK-436` → `PAC-TASK-580` |     145 | Description chi tiết cho từng Task trong 4D                                                                        |

---

# Tổng số Task

| Nhóm          |                      Task range |     Số lượng |
| ------------- | ------------------------------: | -----------: |
| 4A            | `PAC-TASK-001` → `PAC-TASK-145` |          145 |
| 4B            | `PAC-TASK-146` → `PAC-TASK-290` |          145 |
| 4C            | `PAC-TASK-291` → `PAC-TASK-435` |          145 |
| 4D            | `PAC-TASK-436` → `PAC-TASK-580` |          145 |
| **Tổng cộng** | `PAC-TASK-001` → `PAC-TASK-580` | **580 Task** |

---

# Format của file Task List

Mỗi file Task List sẽ có bảng như sau:

| Field        | Nội dung                              |
| ------------ | ------------------------------------- |
| Task Key     | Mã Task, ví dụ `PAC-TASK-001`         |
| Summary      | Tên Task                              |
| Linked Story | Story liên quan, ví dụ `US-01`        |
| Parent Epic  | Epic cha, ví dụ `PAC-EPIC-01`         |
| Component    | Component chính thức                  |
| Priority     | Highest / High / Medium / Low         |
| Sprint       | Sprint đề xuất                        |
| Assignee     | Automatic hoặc tên thành viên nếu cần |

Ví dụ:

| Task Key     | Summary                                                  | Linked Story | Parent Epic | Component   | Priority | Sprint   | Assignee  |
| ------------ | -------------------------------------------------------- | ------------ | ----------- | ----------- | -------- | -------- | --------- |
| PAC-TASK-001 | PAC-TASK-001 - Configure Supabase Auth client in Next.js | US-01        | PAC-EPIC-01 | Auth & RBAC | Highest  | Sprint 1 | Automatic |

---

# Format của file Task Description

Mỗi Task trong file Description sẽ có format như sau:

```md
## PAC-TASK-001 - Configure Supabase Auth client in Next.js

Nhóm cần cấu hình Supabase Auth client ở frontend để hệ thống có thể đăng nhập bằng Supabase Auth, đúng với baseline mới của dự án.

### Nội dung công việc

- Cài đặt và cấu hình Supabase client trong Next.js.
- Tạo helper dùng cho login, logout và lấy session hiện tại.
- Đọc cấu hình Supabase từ biến môi trường.
- Không hard-code Supabase URL hoặc key trong code.
- Kiểm tra client hoạt động ở local environment.

### Kết quả mong đợi

- Next.js gọi được Supabase Auth.
- Login form có thể dùng Supabase client.
- Session có thể được lấy sau khi đăng nhập.
- Không tự xử lý password trong PostgreSQL.

### Validation / Error Handling

- Nếu Supabase config thiếu, hệ thống phải báo lỗi rõ.
- Nếu login thất bại, UI phải hiển thị lỗi thân thiện.
- Không crash toàn bộ layout khi session invalid.

### Testing Notes

- Test login thành công.
- Test login sai tài khoản/mật khẩu.
- Test session hết hạn.
- Test logout rồi truy cập lại trang protected.

### AI Agent Notes

- Không tạo custom JWT login.
- Không tạo bảng `users.password_hash`.
- Không lưu password ở frontend hoặc backend.
```

---

# Quy tắc viết Description cho từng Task

Mỗi Task Description phải có đủ:

1. Tên Task.
2. Mục đích Task.
3. Nội dung công việc.
4. Kết quả mong đợi.
5. Validation / Error Handling nếu có.
6. Authorization nếu Task liên quan quyền.
7. Testing Notes nếu Task cần test.
8. AI Agent Notes nếu Task dễ bị code sai baseline.

---

# Ghi chú quan trọng

Các file Description phải viết đủ **145 Description cho 145 Task** trong file tương ứng.

Ví dụ:

* `4A_Task_Description_MVP_Foundation_001_145.md` phải có đủ:

  * `PAC-TASK-001`
  * `PAC-TASK-002`
  * ...
  * `PAC-TASK-145`

* `4B_Task_Description_MVP_POS_Interaction_Checkout_146_290.md` phải có đủ:

  * `PAC-TASK-146`
  * `PAC-TASK-147`
  * ...
  * `PAC-TASK-290`

* `4C_Task_Description_MVP_AI_Graph_Report_Demo_291_435.md` phải có đủ:

  * `PAC-TASK-291`
  * `PAC-TASK-292`
  * ...
  * `PAC-TASK-435`

* `4D_Task_Description_Testing_Advanced_Future_436_580.md` phải có đủ:

  * `PAC-TASK-436`
  * `PAC-TASK-437`
  * ...
  * `PAC-TASK-580`

---

# Thứ tự thực hiện đề xuất

Nên làm theo thứ tự sau:

1. `4A_Task_List_MVP_Foundation_001_145.md`
2. `4A_Task_Description_MVP_Foundation_001_145.md`
3. `4B_Task_List_MVP_POS_Interaction_Checkout_146_290.md`
4. `4B_Task_Description_MVP_POS_Interaction_Checkout_146_290.md`
5. `4C_Task_List_MVP_AI_Graph_Report_Demo_291_435.md`
6. `4C_Task_Description_MVP_AI_Graph_Report_Demo_291_435.md`
7. `4D_Task_List_Testing_Advanced_Future_436_580.md`
8. `4D_Task_Description_Testing_Advanced_Future_436_580.md`

---

# Kết luận

Từ bây giờ, phần `4_Task` sẽ không còn là 4 file lớn nữa, mà sẽ là **8 file theo cặp**:

```text
4A List + 4A Description
4B List + 4B Description
4C List + 4C Description
4D List + 4D Description
```

Tổng cộng vẫn là:

```text
580 Task
PAC-TASK-001 → PAC-TASK-580
```

Cách chia này giúp:

* Bảng Task dễ nhập vào Jira.
* Description không bị chen vào bảng quá dài.
* AI agent đọc từng Task rõ hơn.
* Nhóm dễ phân công code.
* Tester dễ trace từ Task sang Story, Epic và Test Case.
