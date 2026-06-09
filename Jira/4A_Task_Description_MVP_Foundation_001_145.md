# 4A_Task_Description_MVP_Foundation_001_145.md

# Mẫu Description cho 145 Task phần 4A

Tài liệu này mô tả chi tiết từng Task trong file:

```text
4A_Task_List_MVP_Foundation_001_145.md
```

Phạm vi Task:

```text
PAC-TASK-001 → PAC-TASK-145
```

Nhóm chức năng:

1. Auth & RBAC.
2. User / Staff Account Management.
3. Medicine Management.
4. ActiveIngredient Management.
5. Medicine–ActiveIngredient Mapping.
6. Supplier Management.
7. Inventory & MedicineBatch.
8. Stock Import.

Baseline bắt buộc:

* Authentication dùng `Supabase Auth`.
* Không lưu `password_hash` trong PostgreSQL.
* Authorization phải enforce ở backend.
* Inventory source of truth là `MedicineBatch`.
* Batch number là bắt buộc.
* Batch identity dựa trên `medicine_id + normalized batch_number + expiry_date`.
* Stock Import confirmed phải chạy transaction.
* Không merge batch nếu expiry mismatch.
* Không cho sửa trực tiếp quantity của MedicineBatch.
* Medicine phải có ActiveIngredient mapping để phục vụ InteractionAlert và Graph Sync.

---

# Sprint 1 — Auth, RBAC & User Account

## PAC-TASK-001 - Configure Supabase Auth client in Next.js

Nhóm cần cấu hình Supabase Auth client ở frontend để hệ thống có thể đăng nhập bằng Supabase Auth, đúng với baseline mới của dự án.

### Nội dung công việc

* Cài đặt và cấu hình Supabase client trong Next.js.
* Tạo helper dùng cho login, logout và lấy session hiện tại.
* Đọc cấu hình Supabase từ biến môi trường.
* Không hard-code Supabase URL hoặc key trong code.
* Kiểm tra client hoạt động ở local environment.

### Kết quả mong đợi

* Next.js gọi được Supabase Auth.
* Login form có thể dùng Supabase client.
* Session có thể được lấy sau khi đăng nhập.
* Không tự xử lý password trong PostgreSQL.

### Validation / Error Handling

* Nếu thiếu biến môi trường Supabase, frontend phải báo lỗi cấu hình rõ ràng.
* Nếu Supabase trả lỗi, UI không được crash.
* Không hiển thị thông tin nhạy cảm trong error message.

### AI Agent Notes

* Không tạo custom JWT login.
* Không tạo bảng `users.password_hash`.
* Không lưu password ở frontend hoặc backend.

---

## PAC-TASK-002 - Build login page UI

Nhóm cần xây dựng giao diện đăng nhập cho người dùng nội bộ của hệ thống PharmaAssist.

### Nội dung công việc

* Tạo trang login trong Next.js.
* Thêm ô nhập email và password.
* Thêm nút đăng nhập.
* Thiết kế layout đơn giản, rõ ràng, phù hợp hệ thống quản lý nhà thuốc.
* Chuẩn bị vị trí hiển thị lỗi đăng nhập.

### Kết quả mong đợi

* Có màn hình đăng nhập hoàn chỉnh.
* Người dùng có thể nhập email và password.
* UI có trạng thái loading, error và ready.
* Giao diện sẵn sàng kết nối Supabase Auth.

### Validation / Error Handling

* Email và password là bắt buộc.
* Nếu thiếu input, form không gửi request.
* Lỗi hiển thị thân thiện với người dùng.

### AI Agent Notes

* Không thêm field username nếu baseline dùng email Supabase Auth.
* Không xử lý password bằng database app.

---

## PAC-TASK-003 - Connect login form to Supabase Auth

Nhóm cần kết nối form đăng nhập với Supabase Auth để user có thể đăng nhập thật.

### Nội dung công việc

* Bắt sự kiện submit form login.
* Gọi Supabase `signInWithPassword` hoặc flow tương đương.
* Lưu hoặc nhận session theo cơ chế Supabase.
* Sau khi đăng nhập thành công, chuyển user vào hệ thống.
* Xử lý lỗi đăng nhập sai email/password.

### Kết quả mong đợi

* User đăng nhập được bằng Supabase Auth.
* Session được tạo đúng sau khi login.
* Nếu login fail, UI hiển thị lỗi.
* Không có custom login API tự kiểm tra password trong PostgreSQL.

### Validation / Error Handling

* Không gửi request khi email/password rỗng.
* Hiển thị lỗi khi Supabase trả invalid credentials.
* Không log password ra console.

### AI Agent Notes

* Không tự tạo access token.
* Không dùng custom JWT thay Supabase session.

---

## PAC-TASK-004 - Handle login loading, success and error states

Nhóm cần xử lý trạng thái giao diện khi người dùng đăng nhập.

### Nội dung công việc

* Thêm loading state khi đang gọi Supabase Auth.
* Disable nút đăng nhập trong lúc loading.
* Hiển thị lỗi nếu đăng nhập thất bại.
* Hiển thị trạng thái thành công hoặc chuyển route sau khi login.
* Đảm bảo UX không bị nhấp nhiều lần gây request lặp.

### Kết quả mong đợi

* User biết hệ thống đang xử lý đăng nhập.
* Không gửi nhiều request login cùng lúc.
* Lỗi đăng nhập hiển thị rõ.
* Login thành công chuyển sang trang chính.

### Validation / Error Handling

* Catch lỗi từ Supabase.
* Không hiển thị stack trace.
* Có fallback message nếu lỗi không xác định.

---

## PAC-TASK-005 - Redirect user after login based on permissions

Nhóm cần chuyển hướng người dùng sau khi đăng nhập dựa trên quyền hoặc vai trò.

### Nội dung công việc

* Sau login, gọi API lấy thông tin user hiện tại.
* Đọc roles và permissions.
* Xác định route mặc định phù hợp.
* Admin có thể vào dashboard quản trị.
* Staff có thể vào POS nếu có quyền.
* Warehouse có thể vào Inventory/Stock Import nếu có quyền.

### Kết quả mong đợi

* User được chuyển đến màn hình phù hợp.
* Người không có quyền không bị đưa vào route sai.
* Warehouse không bị chuyển vào POS.
* Staff không bị chuyển vào màn hình quản trị kho nếu không có quyền.

### Authorization Notes

* Frontend chỉ hỗ trợ điều hướng.
* Backend vẫn phải enforce permission khi gọi API.

---

## PAC-TASK-006 - Implement logout action and Supabase session cleanup

Nhóm cần xây dựng chức năng đăng xuất để xóa Supabase session hiện tại.

### Nội dung công việc

* Thêm action logout trong layout/sidebar.
* Gọi Supabase sign out.
* Xóa session ở client.
* Chuyển người dùng về trang login.
* Reset các state liên quan đến user hiện tại.

### Kết quả mong đợi

* User đăng xuất thành công.
* Session bị xóa.
* Không còn truy cập được trang protected sau logout.
* Có thể đăng nhập lại bình thường.

### Validation / Error Handling

* Nếu logout lỗi, hiển thị thông báo phù hợp.
* Không giữ thông tin user cũ sau logout.

---

## PAC-TASK-007 - Protect frontend routes after logout

Nhóm cần bảo vệ các route nội bộ để user đã logout không truy cập được.

### Nội dung công việc

* Tạo route guard hoặc middleware frontend.
* Kiểm tra session trước khi render trang protected.
* Nếu không có session, redirect về login.
* Kiểm tra lại khi reload trang.
* Áp dụng cho các màn hình nội bộ.

### Kết quả mong đợi

* User chưa đăng nhập không vào được trang nội bộ.
* User logout rồi không quay lại trang cũ bằng back button để xem dữ liệu.
* Route guard hoạt động ổn định sau refresh.
* UI không flash dữ liệu nhạy cảm trước khi redirect.

### AI Agent Notes

* Route guard frontend không thay thế backend AuthGuard.
* API protected vẫn phải kiểm tra session ở server.

---

## PAC-TASK-008 - Add login/logout smoke test checklist

Nhóm cần viết checklist smoke test cho login/logout để kiểm tra nhanh trước demo.

### Nội dung công việc

* Viết test case đăng nhập thành công bằng tài khoản demo.
* Viết test case đăng nhập sai password.
* Viết test case logout.
* Viết test case truy cập route protected sau logout.
* Ghi expected result rõ ràng.

### Kết quả mong đợi

* Có checklist kiểm tra Auth nhanh.
* Tester dùng được trước demo.
* Lỗi đăng nhập/đăng xuất được phát hiện sớm.
* Checklist liên kết với Story Auth.

### Testing Notes

* Test bằng tài khoản Admin, Staff và Warehouse.
* Test cả trường hợp session hết hạn nếu có thời gian.

---

## PAC-TASK-009 - Configure Supabase token validation in NestJS

Nhóm cần cấu hình backend NestJS để kiểm tra Supabase session/token trước khi cho phép gọi API nội bộ.

### Nội dung công việc

* Tạo Supabase Auth adapter/service ở backend.
* Đọc token từ `Authorization: Bearer <token>`.
* Validate token với Supabase.
* Map Supabase user id sang `user_profiles`.
* Trả lỗi nếu token thiếu, hết hạn hoặc không hợp lệ.

### Kết quả mong đợi

* Backend nhận diện được user hiện tại.
* API protected không cho người chưa đăng nhập truy cập.
* Lỗi 401/403 rõ ràng.
* Auth flow đúng baseline mới.

### AI Agent Notes

* Backend không tự cấp JWT riêng thay Supabase.
* Password không nằm trong database ứng dụng.

---

## PAC-TASK-010 - Implement AuthGuard for protected APIs

Nhóm cần xây dựng AuthGuard ở NestJS để bảo vệ API nội bộ.

### Nội dung công việc

* Tạo AuthGuard dùng Supabase token validation.
* Gắn user hiện tại vào request context.
* Áp dụng guard cho controller cần bảo vệ.
* Trả 401 nếu request không có session hợp lệ.
* Viết cấu trúc lỗi thống nhất.

### Kết quả mong đợi

* API nội bộ được bảo vệ.
* Service có thể lấy thông tin user hiện tại.
* Request không đăng nhập bị chặn.
* Guard có thể tái sử dụng cho toàn bộ module.

### Testing Notes

* Test request không có token.
* Test token invalid.
* Test token valid.

---

## PAC-TASK-011 - Return 401 for missing or invalid session

Nhóm cần chuẩn hóa lỗi 401 khi session thiếu hoặc không hợp lệ.

### Nội dung công việc

* Xử lý trường hợp thiếu Authorization header.
* Xử lý token sai format.
* Xử lý token hết hạn hoặc Supabase reject.
* Trả response 401 nhất quán.
* Không tiết lộ chi tiết bảo mật không cần thiết.

### Kết quả mong đợi

* API trả 401 rõ ràng khi chưa đăng nhập.
* Frontend có thể detect 401 để redirect login.
* Error response thống nhất.
* Không bị lộ token hoặc thông tin nhạy cảm.

---

## PAC-TASK-012 - Add backend auth unit tests

Nhóm cần viết unit test cho backend AuthGuard và Supabase validation flow.

### Nội dung công việc

* Test AuthGuard khi token hợp lệ.
* Test AuthGuard khi thiếu token.
* Test AuthGuard khi token invalid.
* Mock Supabase validation.
* Kiểm tra request context có user hiện tại.

### Kết quả mong đợi

* AuthGuard có test cơ bản.
* Case lỗi session được kiểm tra.
* CI có thể chạy test.
* Giảm rủi ro API bị mở không đúng.

---

## PAC-TASK-013 - Create user_profiles Prisma model

Nhóm cần tạo model `user_profiles` để lưu thông tin hồ sơ ứng dụng của user Supabase.

### Nội dung công việc

* Tạo Prisma model `UserProfile`.
* Dùng Supabase user UUID làm khóa liên kết.
* Lưu tên hiển thị, trạng thái, `must_change_password` nếu cần.
* Không lưu password hoặc password hash.
* Chuẩn bị quan hệ với `user_roles`.

### Kết quả mong đợi

* Có bảng profile cho user nội bộ.
* User Supabase được map sang dữ liệu ứng dụng.
* Hỗ trợ phân quyền và hiển thị thông tin user.
* Không vi phạm baseline Auth.

### AI Agent Notes

* Không thay thế Supabase user bằng bảng users tự quản lý password.
* `user_profiles` chỉ lưu metadata ứng dụng.

---

## PAC-TASK-014 - Create GET /auth/me API

Nhóm cần tạo API trả về thông tin user hiện tại sau khi đăng nhập.

### Nội dung công việc

* Tạo endpoint `GET /auth/me`.
* Yêu cầu AuthGuard.
* Lấy `user_profile` theo Supabase user id.
* Trả về thông tin cơ bản của user.
* Không trả dữ liệu nhạy cảm.

### Kết quả mong đợi

* Frontend lấy được current user.
* Layout/sidebar có dữ liệu user.
* API hoạt động với Supabase session.
* Nếu user profile chưa tồn tại, trả lỗi rõ ràng.

---

## PAC-TASK-015 - Return current user roles and permissions

Nhóm cần mở rộng `GET /auth/me` để trả roles và permissions của user hiện tại.

### Nội dung công việc

* Query roles của user từ `user_roles`.
* Query permissions từ `role_permissions`.
* Loại trùng permissions nếu user có nhiều role.
* Trả response có `roles` và `permissions`.
* Chuẩn bị dữ liệu cho frontend permission-aware UI.

### Kết quả mong đợi

* Frontend biết user có quyền gì.
* Sidebar/action có thể hiển thị theo permission.
* Backend vẫn enforce quyền bằng guard.
* Multi-role hoạt động đúng.

---

## PAC-TASK-016 - Display current user profile in layout

Nhóm cần hiển thị thông tin user hiện tại trong layout của hệ thống.

### Nội dung công việc

* Gọi `GET /auth/me` sau khi đăng nhập.
* Hiển thị tên user hoặc email.
* Hiển thị role chính nếu cần.
* Thêm menu người dùng có logout.
* Xử lý loading/error khi lấy user.

### Kết quả mong đợi

* Người dùng thấy thông tin tài khoản hiện tại.
* Layout không bị lỗi nếu API `/auth/me` fail.
* Có thể logout từ layout.
* UI chuẩn bị cho permission-aware menu.

---

## PAC-TASK-017 - Create roles Prisma model

Nhóm cần tạo model `roles` trong database để quản lý vai trò người dùng.

### Nội dung công việc

* Tạo Prisma model `Role`.
* Thêm các trường như `id`, `code`, `name`, `description`, `is_active`.
* Tạo unique constraint cho `code`.
* Chuẩn bị seed role Admin, Staff, Warehouse.
* Liên kết với `user_roles` và `role_permissions`.

### Kết quả mong đợi

* Có bảng roles rõ ràng.
* Role có thể seed và dùng cho RBAC.
* Không hard-code toàn bộ role trong code.
* Hỗ trợ multi-role.

---

## PAC-TASK-018 - Create permissions Prisma model

Nhóm cần tạo model `permissions` để quản lý quyền chi tiết.

### Nội dung công việc

* Tạo Prisma model `Permission`.
* Thêm các trường `code`, `name`, `description`, `module`.
* Tạo unique constraint cho `code`.
* Chuẩn bị danh sách permission MVP.
* Liên kết với `role_permissions`.

### Kết quả mong đợi

* Permission được quản lý bằng dữ liệu.
* Backend guard có thể kiểm tra permission code.
* Dễ mở rộng quyền sau này.
* Không chỉ phụ thuộc role string.

---

## PAC-TASK-019 - Create user_roles Prisma model

Nhóm cần tạo bảng liên kết user với role để hỗ trợ một user có nhiều role.

### Nội dung công việc

* Tạo Prisma model `UserRole`.
* Liên kết `user_profile_id` với `role_id`.
* Thêm unique constraint tránh gán trùng role.
* Chuẩn bị query lấy roles của user.
* Tạo migration.

### Kết quả mong đợi

* Một user có thể có nhiều role.
* Role assignment không bị trùng.
* `GET /auth/me` đọc được roles.
* RBAC đúng baseline multi-role.

---

## PAC-TASK-020 - Create role_permissions Prisma model

Nhóm cần tạo bảng mapping role với permission.

### Nội dung công việc

* Tạo Prisma model `RolePermission`.
* Liên kết `role_id` với `permission_id`.
* Thêm unique constraint tránh mapping trùng.
* Chuẩn bị seed permission cho từng role.
* Tạo migration.

### Kết quả mong đợi

* Role có danh sách permission rõ ràng.
* Backend permission guard có dữ liệu để kiểm tra.
* Dễ điều chỉnh quyền theo baseline.
* Hỗ trợ Admin, Staff và Warehouse khác nhau.

---

## PAC-TASK-021 - Seed Admin, Staff and Warehouse roles

Nhóm cần seed các role chính của MVP.

### Nội dung công việc

* Seed role Admin.
* Seed role Staff.
* Seed role Warehouse.
* Đảm bảo role code ổn định.
* Không tạo role không nằm trong MVP nếu chưa cần.

### Kết quả mong đợi

* Database có 3 role demo chính.
* Demo users có thể gán role.
* Role dùng được cho permission mapping.
* Seeder chạy lại không tạo trùng.

---

## PAC-TASK-022 - Seed MVP permissions

Nhóm cần seed danh sách permission bắt buộc cho MVP.

### Nội dung công việc

* Xác định permission theo module Auth, Medicine, Supplier, Inventory, POS, Checkout, Interaction, AI, Graph, Reports.
* Seed permission code ổn định.
* Ghi description ngắn cho từng permission.
* Đảm bảo seeder idempotent.
* Không seed permission cho Future scope nếu chưa cần.

### Kết quả mong đợi

* Database có permission MVP.
* Role-permission mapping có thể cấu hình.
* Backend guard kiểm tra được permission.
* Dễ trace quyền trong tài liệu.

---

## PAC-TASK-023 - Map permissions to roles

Nhóm cần gán permission phù hợp cho Admin, Staff và Warehouse.

### Nội dung công việc

* Gán Admin toàn quyền MVP.
* Gán Staff quyền POS, order trong scope, interaction alert, checkout.
* Gán Warehouse quyền supplier, stock import, inventory adjustment, inventory view.
* Không gán Warehouse quyền POS/InteractionAlert/Checkout.
* Tạo seed idempotent.

### Kết quả mong đợi

* Role có quyền đúng baseline.
* Staff và Warehouse bị giới hạn đúng phạm vi.
* Admin có thể quản trị đầy đủ.
* Permission guard hoạt động với dữ liệu seed.

---

## PAC-TASK-024 - Implement permission decorator

Nhóm cần tạo decorator để khai báo permission cần thiết cho từng API.

### Nội dung công việc

* Tạo decorator ví dụ `@RequirePermission('medicine.create')`.
* Cho phép gắn permission vào controller hoặc route handler.
* Chuẩn bị metadata để permission guard đọc được.
* Viết ví dụ áp dụng cho một API mẫu.
* Đảm bảo decorator có thể dùng lại ở nhiều module.

### Kết quả mong đợi

* API có thể khai báo permission rõ ràng.
* Permission guard đọc được permission cần kiểm tra.
* Code phân quyền dễ bảo trì hơn.
* Không hard-code toàn bộ role trong từng service.

---

## PAC-TASK-025 - Implement permission-based API guard

Nhóm cần xây dựng guard kiểm tra permission của user hiện tại.

### Nội dung công việc

* Đọc metadata từ permission decorator.
* Lấy permissions của user từ request context hoặc database.
* Kiểm tra user có đủ permission hay không.
* Trả 403 nếu không đủ quyền.
* Cho phép Admin pass nếu có permission tương ứng.

### Kết quả mong đợi

* Backend enforce authorization chính thức.
* API không chỉ dựa vào frontend.
* Người sai quyền bị chặn.
* Guard dùng được cho toàn bộ MVP APIs.

### Testing Notes

* Test user có quyền.
* Test user không có quyền.
* Test user chưa đăng nhập.

---

## PAC-TASK-026 - Add permission checks to Auth and User APIs

Nhóm cần áp dụng permission guard cho các API quản lý user.

### Nội dung công việc

* Gắn permission cho API tạo staff account.
* Gắn permission cho API update trạng thái account.
* Gắn permission cho API gán role nếu có.
* Đảm bảo chỉ Admin thực hiện thao tác quản trị user.
* Test Staff/Warehouse bị chặn.

### Kết quả mong đợi

* User management API được bảo vệ đúng.
* Staff không tạo được tài khoản mới.
* Warehouse không quản trị user.
* Admin thao tác bình thường.

---

## PAC-TASK-027 - Add permission checks to Medicine APIs

Nhóm cần áp dụng permission guard cho API quản lý thuốc.

### Nội dung công việc

* Gắn permission cho create/update/deactivate medicine.
* Gắn permission cho view/list medicine.
* Đảm bảo Staff có thể xem thuốc phục vụ POS nếu được phép.
* Đảm bảo Warehouse/Admin có quyền phù hợp với inventory.
* Test forbidden cases.

### Kết quả mong đợi

* API medicine không bị truy cập sai quyền.
* Người có quyền xem danh sách thuốc dùng được.
* Người không có quyền tạo/sửa bị 403.
* Permission nhất quán với UI.

---

## PAC-TASK-028 - Add permission checks to Inventory APIs

Nhóm cần áp dụng permission guard cho API inventory và MedicineBatch.

### Nội dung công việc

* Gắn permission cho Inventory Summary.
* Gắn permission cho Batch Detail.
* Gắn permission cho Stock Import.
* Gắn permission cho Inventory Adjustment nếu endpoint đã có.
* Chặn Staff khỏi dashboard inventory vận hành nếu không có quyền.

### Kết quả mong đợi

* Admin/Warehouse truy cập inventory đúng quyền.
* Staff chỉ dùng stock availability trong POS.
* API inventory không bị public.
* Backend enforce quyền đầy đủ.

---

## PAC-TASK-029 - Add permission checks to POS and Checkout APIs

Nhóm cần bảo vệ POS và Checkout API bằng permission guard.

### Nội dung công việc

* Gắn permission cho tạo Draft Order.
* Gắn permission cho thêm/sửa/xóa order item.
* Gắn permission cho cancel Draft Order.
* Gắn permission cho `POST /checkout`.
* Chặn Warehouse khỏi POS/Checkout.

### Kết quả mong đợi

* Staff/Admin dùng được POS theo quyền.
* Warehouse không checkout được.
* Người chưa đăng nhập bị 401.
* Người sai quyền bị 403.

---

## PAC-TASK-030 - Add 403 response format for forbidden access

Nhóm cần chuẩn hóa response khi user không đủ quyền.

### Nội dung công việc

* Tạo error response format cho 403.
* Include message dễ hiểu.
* Không expose permission internal quá nhạy cảm nếu không cần.
* Frontend có thể hiển thị trang Forbidden.
* Áp dụng cho permission guard.

### Kết quả mong đợi

* Lỗi 403 nhất quán.
* Frontend xử lý dễ.
* User hiểu mình không có quyền.
* Không bị crash khi API trả 403.

---

## PAC-TASK-031 - Build permission-aware sidebar

Nhóm cần xây dựng sidebar hiển thị menu theo quyền user.

### Nội dung công việc

* Lấy permissions từ `GET /auth/me`.
* Định nghĩa menu cần permission nào.
* Hiển thị menu tương ứng cho Admin, Staff, Warehouse.
* Ẩn menu không có quyền.
* Kiểm tra với demo accounts.

### Kết quả mong đợi

* Sidebar phù hợp từng vai trò.
* Warehouse không thấy POS/InteractionAlert.
* Staff không thấy màn hình quản trị ngoài quyền.
* Admin thấy đầy đủ menu MVP.

### AI Agent Notes

* UI permission chỉ hỗ trợ UX.
* Backend guard vẫn bắt buộc.

---

## PAC-TASK-032 - Hide unauthorized action buttons

Nhóm cần ẩn hoặc disable các action button mà user không có quyền sử dụng.

### Nội dung công việc

* Ẩn nút create/update/delete/deactivate theo permission.
* Disable action nguy hiểm nếu thiếu quyền.
* Thêm tooltip hoặc message nếu cần.
* Kiểm tra ở Medicine, Supplier, Inventory, POS.
* Đảm bảo không chỉ ẩn UI mà quên backend guard.

### Kết quả mong đợi

* User không thấy action sai quyền.
* UI giảm lỗi thao tác.
* Backend vẫn trả 403 nếu gọi trực tiếp.
* Permission UX rõ ràng hơn.

---

## PAC-TASK-033 - Build forbidden access page

Nhóm cần tạo trang thông báo khi user truy cập route không có quyền.

### Nội dung công việc

* Tạo page Forbidden/No Permission.
* Hiển thị message thân thiện.
* Có nút quay về dashboard hoặc trang trước.
* Redirect tới page này nếu frontend phát hiện thiếu quyền.
* Không hiển thị dữ liệu protected.

### Kết quả mong đợi

* User sai quyền không thấy màn hình trắng.
* UX rõ ràng hơn.
* Không lộ dữ liệu module bị cấm.
* Hỗ trợ demo phân quyền.

---

## PAC-TASK-034 - Add frontend permission helper

Nhóm cần tạo helper dùng chung để kiểm tra permission ở frontend.

### Nội dung công việc

* Tạo hàm `hasPermission`.
* Tạo hàm kiểm tra nhiều permission nếu cần.
* Dùng helper cho sidebar và buttons.
* Tránh lặp logic permission ở nhiều component.
* Viết ví dụ dùng helper.

### Kết quả mong đợi

* Frontend kiểm tra quyền nhất quán.
* Dễ maintain khi thêm permission.
* UI ít lỗi phân quyền hơn.
* Không hard-code role rải rác.

---

## PAC-TASK-035 - Implement Staff ownership query filter for orders

Nhóm cần giới hạn Staff chỉ xem order trong phạm vi mình tạo hoặc xử lý.

### Nội dung công việc

* Xác định field ownership của order.
* Áp dụng filter vào order list/detail API.
* Admin được xem tất cả order.
* Staff chỉ xem order thuộc scope.
* Test Staff A không xem được order Staff B.

### Kết quả mong đợi

* Staff bị giới hạn dữ liệu đúng.
* Admin không bị giới hạn.
* Ownership enforce ở backend query.
* Không chỉ lọc ở frontend.

---

## PAC-TASK-036 - Implement Staff ownership query filter for customer order history

Nhóm cần áp dụng ownership scope khi Staff xem lịch sử mua hàng/order history liên quan khách hàng.

### Nội dung công việc

* Xác định dữ liệu order history Staff được xem.
* Áp dụng filter theo Staff scope.
* Admin xem toàn bộ.
* Không để Staff xem toàn bộ lịch sử khách nếu không thuộc scope.
* Chuẩn bị test case phân quyền.

### Kết quả mong đợi

* Staff không truy cập lịch sử ngoài phạm vi.
* Admin có quyền xem toàn bộ.
* API history không lộ dữ liệu.
* Đúng baseline customer/order ownership.

---

## PAC-TASK-037 - Add tests for Staff ownership scope

Nhóm cần viết test cho rule Staff ownership scope.

### Nội dung công việc

* Seed ít nhất hai Staff và nhiều order.
* Test Staff A thấy order của Staff A.
* Test Staff A không thấy order của Staff B.
* Test Admin thấy tất cả.
* Test direct API call bị chặn nếu sai scope.

### Kết quả mong đợi

* Ownership scope có test rõ ràng.
* Tránh lộ dữ liệu đơn hàng.
* CI có thể bắt lỗi phân quyền.
* Demo phân quyền đáng tin cậy.

---

## PAC-TASK-038 - Block Warehouse access to POS routes

Nhóm cần chặn Warehouse truy cập màn hình POS.

### Nội dung công việc

* Kiểm tra permission của Warehouse.
* Ẩn menu POS trong sidebar Warehouse.
* Nếu Warehouse truy cập URL POS trực tiếp, redirect Forbidden.
* Đảm bảo backend POS APIs cũng chặn Warehouse.
* Test bằng tài khoản Warehouse demo.

### Kết quả mong đợi

* Warehouse không vào được POS.
* UI không hiển thị menu bán hàng cho Warehouse.
* Backend không cho Warehouse tạo order.
* Phân quyền đúng baseline.

---

## PAC-TASK-039 - Block Warehouse access to InteractionAlert APIs

Nhóm cần chặn Warehouse truy cập API liên quan InteractionAlert.

### Nội dung công việc

* Gắn permission guard cho InteractionAlert APIs.
* Không gán permission alert cho Warehouse.
* Test Warehouse gọi API alert bị 403.
* Đảm bảo Warehouse không thấy alert history.
* Kiểm tra không lộ alert qua route phụ.

### Kết quả mong đợi

* Warehouse không xem InteractionAlert.
* Admin/Staff có quyền phù hợp.
* API trả 403 đúng.
* Rule an toàn được enforce ở backend.

---

## PAC-TASK-040 - Block Warehouse access to checkout APIs

Nhóm cần chặn Warehouse gọi checkout.

### Nội dung công việc

* Gắn permission cho `POST /checkout`.
* Không gán checkout permission cho Warehouse.
* Test Warehouse gọi checkout bị 403.
* Đảm bảo checkout service không chạy nếu guard fail.
* Cập nhật frontend route guard nếu cần.

### Kết quả mong đợi

* Warehouse không checkout được.
* Chỉ Staff/Admin có quyền bán hàng mới checkout.
* Không tạo payment/invoice từ Warehouse.
* Quyền POS/Checkout đúng baseline.

---

## PAC-TASK-041 - Build Admin create staff account form

Nhóm cần xây dựng form để Admin tạo tài khoản nhân viên mới.

### Nội dung công việc

* Tạo form nhập email, tên nhân viên, vai trò và trạng thái ban đầu.
* Cho phép chọn một hoặc nhiều role nếu cần.
* Có tùy chọn yêu cầu đổi mật khẩu lần đầu.
* Validate email và các trường bắt buộc.
* Gọi API tạo tài khoản nhân viên.

### Kết quả mong đợi

* Admin tạo được staff account từ UI.
* Form hiển thị lỗi rõ ràng.
* Tài khoản mới có profile và role đúng.
* Không yêu cầu lưu password trong PostgreSQL.

### AI Agent Notes

* Tạo tài khoản qua Supabase Admin integration.
* Không tự build password hashing trong app database.

---

## PAC-TASK-042 - Implement POST /admin/users using Supabase Admin

Nhóm cần tạo API backend để Admin tạo user thông qua Supabase Admin integration.

### Nội dung công việc

* Tạo endpoint `POST /admin/users`.
* Kiểm tra permission Admin.
* Gọi Supabase Admin API để tạo user.
* Không lưu password trong PostgreSQL.
* Trả response gồm user profile đã tạo.

### Kết quả mong đợi

* Admin tạo được user nội bộ.
* Supabase quản lý password/auth.
* Database app chỉ lưu profile và role.
* API trả lỗi rõ khi email trùng hoặc Supabase fail.

---

## PAC-TASK-043 - Create user profile after Supabase user creation

Nhóm cần tạo `user_profile` sau khi Supabase user được tạo thành công.

### Nội dung công việc

* Nhận Supabase user id sau khi tạo user.
* Tạo record `user_profiles`.
* Lưu tên, email, trạng thái, `must_change_password` nếu cần.
* Rollback hoặc cleanup hợp lý nếu tạo profile fail.
* Gắn profile với role ở task tiếp theo.

### Kết quả mong đợi

* Mỗi Supabase user có profile ứng dụng.
* Profile không chứa password.
* User có thể được phân quyền sau khi tạo.
* Dữ liệu user nhất quán.

---

## PAC-TASK-044 - Assign roles to new staff account

Nhóm cần gán role cho tài khoản nhân viên mới.

### Nội dung công việc

* Nhận role IDs hoặc role codes từ request.
* Validate role tồn tại và active.
* Tạo record `user_roles`.
* Không cho gán role không hợp lệ.
* Trả về profile kèm roles.

### Kết quả mong đợi

* Staff mới có role đúng.
* Multi-role hoạt động nếu cần.
* Role assignment không trùng.
* Permission của user mới có thể dùng ngay sau login.

---

## PAC-TASK-045 - Validate staff email uniqueness through Supabase

Nhóm cần validate email khi Admin tạo tài khoản nhân viên.

### Nội dung công việc

* Kiểm tra email hợp lệ.
* Dựa vào Supabase để phát hiện email đã tồn tại.
* Trả lỗi thân thiện nếu email trùng.
* Không tự tạo username/password riêng.
* Đảm bảo UI hiển thị lỗi rõ.

### Kết quả mong đợi

* Không tạo trùng account email.
* Lỗi từ Supabase được map thành message dễ hiểu.
* Admin biết cần dùng email khác.
* Dữ liệu user sạch hơn.

---

## PAC-TASK-046 - Implement first-login password change screen

Nhóm cần xây dựng màn hình đổi mật khẩu lần đầu cho nhân viên mới.

### Nội dung công việc

* Tạo page first-login password change.
* Hiển thị form nhập mật khẩu mới.
* Validate mật khẩu theo rule cơ bản.
* Gọi backend/Supabase flow đổi mật khẩu.
* Chặn truy cập app chính nếu chưa đổi mật khẩu.

### Kết quả mong đợi

* User mới có thể đổi mật khẩu lần đầu.
* User có `must_change_password=true` bị bắt buộc đổi.
* UI rõ ràng và dễ dùng.
* Không lưu password mới vào PostgreSQL.

---

## PAC-TASK-047 - Implement must_change_password check

Nhóm cần kiểm tra trạng thái `must_change_password` sau login.

### Nội dung công việc

* Lấy field `must_change_password` từ `user_profiles`.
* Nếu true, redirect đến màn hình đổi mật khẩu.
* Chặn user vào các route nội bộ trước khi đổi.
* Sau khi đổi thành công, cho vào hệ thống.
* Test với tài khoản demo first-login.

### Kết quả mong đợi

* First-login flow hoạt động đúng.
* User không bypass được bước đổi mật khẩu.
* Demo có thể trình bày flow này.
* Không ảnh hưởng tài khoản demo chính đã set false.

---

## PAC-TASK-048 - Implement password update through Supabase Auth

Nhóm cần xử lý đổi mật khẩu thông qua Supabase Auth.

### Nội dung công việc

* Gọi API Supabase để update password.
* Validate password mới trước khi gửi.
* Xử lý lỗi Supabase trả về.
* Không lưu password mới ở database app.
* Bảo đảm session vẫn hợp lệ hoặc yêu cầu login lại tùy flow.

### Kết quả mong đợi

* Password được cập nhật bởi Supabase.
* App database không chứa password.
* User đổi mật khẩu thành công.
* Lỗi đổi mật khẩu được xử lý rõ.

---

## PAC-TASK-049 - Clear must_change_password after successful change

Nhóm cần cập nhật trạng thái sau khi user đổi mật khẩu lần đầu thành công.

### Nội dung công việc

* Sau khi Supabase update password thành công, cập nhật `must_change_password=false`.
* Ghi thời điểm cập nhật nếu cần.
* Redirect user vào dashboard phù hợp.
* Tránh clear flag nếu đổi mật khẩu fail.
* Test flow success/failure.

### Kết quả mong đợi

* User không bị yêu cầu đổi mật khẩu lại sau khi đổi thành công.
* Flag chỉ clear khi password update thành công.
* Flow first-login hoàn chỉnh.
* Không lưu password trong database.

---

## PAC-TASK-050 - Implement account active/inactive update API

Nhóm cần tạo API để Admin cập nhật trạng thái tài khoản nhân viên.

### Nội dung công việc

* Tạo endpoint update status user profile.
* Chỉ Admin có quyền thực hiện.
* Cho phép active/inactive tài khoản.
* Không xóa cứng user có dữ liệu nghiệp vụ.
* Trả response trạng thái mới.

### Kết quả mong đợi

* Admin khóa/mở tài khoản được.
* User inactive không được dùng hệ thống.
* Dữ liệu lịch sử vẫn giữ.
* API có permission guard.

---

## PAC-TASK-051 - Build staff account status UI

Nhóm cần xây dựng UI để Admin xem và cập nhật trạng thái tài khoản nhân viên.

### Nội dung công việc

* Hiển thị danh sách tài khoản.
* Hiển thị trạng thái active/inactive.
* Thêm nút hoặc switch đổi trạng thái.
* Thêm confirm dialog khi deactivate.
* Gọi API update status.

### Kết quả mong đợi

* Admin thao tác trạng thái trên UI.
* UI cập nhật sau khi API thành công.
* Lỗi hiển thị rõ nếu thao tác fail.
* Không cho Staff/Warehouse dùng chức năng này.

---

## PAC-TASK-052 - Add audit log for staff status change

Nhóm cần ghi audit log khi Admin thay đổi trạng thái tài khoản.

### Nội dung công việc

* Ghi actor Admin.
* Ghi user bị thay đổi.
* Ghi trạng thái cũ và mới.
* Ghi thời gian thực hiện.
* Không ghi dữ liệu nhạy cảm không cần thiết.

### Kết quả mong đợi

* Có thể truy vết thay đổi tài khoản.
* Audit hỗ trợ minh bạch quản trị.
* Không lưu password hoặc token.
* Backend audit logging đúng baseline.

---

# Sprint 2 — Medicine, ActiveIngredient & Supplier

## PAC-TASK-053 - Create medicines Prisma model

Nhóm cần tạo model `Medicine` trong Prisma để lưu thông tin thuốc chính thức của MVP.

### Nội dung công việc

* Tạo model `Medicine`.
* Xác định các trường như `id`, `code`, `name`, `unit`, `dosage_form`, `selling_price`, `is_active`, `created_at`, `updated_at`.
* Thêm constraint cho medicine code nếu cần.
* Chuẩn bị quan hệ với MedicineBatch và Medicine–ActiveIngredient mapping.
* Tạo migration và kiểm tra migration chạy được.

### Kết quả mong đợi

* Database có model thuốc rõ ràng.
* Thuốc có thể dùng cho POS, Inventory, Interaction và Graph Sync.
* `selling_price` phải lớn hơn 0.
* MVP dùng `medicine_id` làm business key khi bán hàng.

### AI Agent Notes

* Không dùng `product_variant_id` làm sales key cho MVP.
* Không để `selling_price = 0`.

---

## PAC-TASK-054 - Add medicine code uniqueness constraint

Nhóm cần thêm ràng buộc mã thuốc không được trùng.

### Nội dung công việc

* Xác định field code của Medicine.
* Thêm unique constraint hoặc index.
* Chuẩn hóa code nếu cần trước khi lưu.
* Xử lý lỗi duplicate code.
* Viết migration phù hợp.

### Kết quả mong đợi

* Không có hai thuốc cùng code.
* API trả lỗi rõ nếu code trùng.
* UI hiển thị lỗi dễ hiểu.
* Dữ liệu thuốc dễ tra cứu và ổn định.

---

## PAC-TASK-055 - Implement POST /medicines API

Nhóm cần tạo API thêm thuốc mới.

### Nội dung công việc

* Tạo endpoint `POST /medicines`.
* Kiểm tra permission create medicine.
* Validate các trường bắt buộc.
* Lưu Medicine vào database.
* Trả dữ liệu thuốc đã tạo.

### Kết quả mong đợi

* Người có quyền tạo thuốc mới.
* Dữ liệu thuốc được lưu đúng.
* Lỗi validation được trả rõ ràng.
* API sẵn sàng tích hợp UI.

---

## PAC-TASK-056 - Build medicine create form

Nhóm cần tạo form frontend để thêm thuốc mới.

### Nội dung công việc

* Tạo form nhập code, name, unit, dosage form, selling price.
* Thêm field trạng thái nếu cần.
* Validate field bắt buộc ở UI.
* Gọi API `POST /medicines`.
* Hiển thị kết quả thành công hoặc lỗi.

### Kết quả mong đợi

* Admin hoặc user có quyền thêm thuốc từ UI.
* Form gửi đúng dữ liệu.
* Lỗi validation hiển thị rõ.
* Thuốc mới xuất hiện trong danh sách sau khi tạo.

---

## PAC-TASK-057 - Add medicine create success/error UI state

Nhóm cần hoàn thiện trạng thái UI sau khi tạo thuốc.

### Nội dung công việc

* Hiển thị loading khi submit.
* Hiển thị success message khi tạo thành công.
* Hiển thị lỗi khi API fail.
* Reset form hoặc điều hướng về danh sách tùy UX.
* Không để user submit nhiều lần liên tục.

### Kết quả mong đợi

* UX tạo thuốc rõ ràng.
* Người dùng biết thao tác thành công hay thất bại.
* Không tạo thuốc duplicate do double-submit.
* UI ổn định khi API lỗi.

---

## PAC-TASK-058 - Implement PATCH /medicines/{id} API

Nhóm cần tạo API cập nhật thông tin thuốc.

### Nội dung công việc

* Tạo endpoint `PATCH /medicines/{id}`.
* Kiểm tra medicine tồn tại.
* Kiểm tra permission update medicine.
* Validate dữ liệu cập nhật.
* Lưu thay đổi và trả dữ liệu mới.

### Kết quả mong đợi

* Người có quyền cập nhật được thuốc.
* Không cập nhật medicine không tồn tại.
* Validation chạy ở backend.
* Có thể tạo graph sync event ở task liên quan.

---

## PAC-TASK-059 - Build medicine edit form

Nhóm cần tạo form chỉnh sửa thuốc.

### Nội dung công việc

* Load dữ liệu thuốc hiện tại.
* Hiển thị form edit.
* Cho phép cập nhật các trường hợp lệ.
* Gọi API update.
* Hiển thị loading/success/error.

### Kết quả mong đợi

* User sửa thông tin thuốc từ UI.
* Dữ liệu cũ hiển thị đúng.
* Dữ liệu mới lưu thành công.
* Form xử lý lỗi rõ ràng.

---

## PAC-TASK-060 - Add medicine update validation and errors

Nhóm cần bổ sung validation và error handling cho update medicine.

### Nội dung công việc

* Validate selling price > 0.
* Validate code không trùng nếu code thay đổi.
* Validate field bắt buộc.
* Trả lỗi 400/404 phù hợp.
* Frontend hiển thị lỗi tương ứng.

### Kết quả mong đợi

* Không lưu dữ liệu thuốc sai.
* Lỗi update dễ hiểu.
* API và UI thống nhất validation.
* Tránh làm hỏng dữ liệu POS/Inventory.

---

## PAC-TASK-061 - Implement medicine list API with pagination

Nhóm cần tạo API danh sách thuốc có phân trang.

### Nội dung công việc

* Tạo endpoint `GET /medicines`.
* Hỗ trợ `page`, `limit`.
* Trả total count nếu cần.
* Sắp xếp mặc định theo tên hoặc ngày tạo.
* Kiểm tra permission view medicine.

### Kết quả mong đợi

* Frontend lấy được danh sách thuốc.
* Dữ liệu phân trang đúng.
* API không trả quá nhiều dữ liệu một lần.
* Dùng được cho màn hình quản lý và POS search.

---

## PAC-TASK-062 - Implement medicine search by code/name

Nhóm cần hỗ trợ tìm thuốc theo mã hoặc tên.

### Nội dung công việc

* Thêm query `search`.
* Search theo medicine code và name.
* Xử lý search case-insensitive nếu phù hợp.
* Kết hợp với pagination.
* Tối ưu query cơ bản.

### Kết quả mong đợi

* User tìm thuốc nhanh.
* POS có thể dùng search.
* Không có kết quả thì trả list rỗng.
* API ổn định với keyword ngắn.

---

## PAC-TASK-063 - Implement medicine filters

Nhóm cần bổ sung bộ lọc thuốc.

### Nội dung công việc

* Lọc theo trạng thái active/inactive.
* Lọc theo category hoặc dosage form nếu có.
* Kết hợp filter với search và pagination.
* Validate query params.
* Trả dữ liệu nhất quán.

### Kết quả mong đợi

* Danh sách thuốc dễ quản lý.
* User lọc được thuốc theo nhu cầu.
* Filter không làm sai pagination.
* UI có thể dùng để tạo bộ lọc.

---

## PAC-TASK-064 - Build medicine list table

Nhóm cần xây dựng bảng danh sách thuốc ở frontend.

### Nội dung công việc

* Hiển thị code, name, unit, dosage form, selling price, status.
* Thêm nút view/edit/deactivate theo quyền.
* Tích hợp API list medicine.
* Hiển thị pagination.
* Thêm search/filter UI.

### Kết quả mong đợi

* User xem được danh sách thuốc.
* Bảng dễ dùng và rõ ràng.
* Action hiển thị theo permission.
* Dữ liệu đồng bộ với backend.

---

## PAC-TASK-065 - Add medicine list empty/loading/error states

Nhóm cần hoàn thiện trạng thái loading, empty và error cho danh sách thuốc.

### Nội dung công việc

* Hiển thị loading khi gọi API.
* Hiển thị empty state khi không có thuốc.
* Hiển thị message khi API lỗi.
* Cho phép retry nếu phù hợp.
* Đảm bảo layout không bị vỡ.

### Kết quả mong đợi

* UX danh sách thuốc hoàn chỉnh.
* Người dùng hiểu trạng thái dữ liệu.
* Demo không bị màn hình trắng.
* Lỗi API được xử lý thân thiện.

---

## PAC-TASK-066 - Implement medicine deactivate API

Nhóm cần tạo API deactivate thuốc thay vì xóa cứng.

### Nội dung công việc

* Tạo endpoint deactivate medicine.
* Kiểm tra quyền Admin hoặc permission tương ứng.
* Set `is_active=false`.
* Không xóa dữ liệu lịch sử.
* Tạo graph sync event nếu cần.

### Kết quả mong đợi

* Thuốc inactive không dùng cho bán mới.
* Lịch sử order/inventory vẫn giữ.
* API không xóa cứng thuốc.
* Deactivate có thể trace/audit.

---

## PAC-TASK-067 - Add deactivate action in medicine UI

Nhóm cần thêm action deactivate thuốc trên UI.

### Nội dung công việc

* Thêm nút deactivate trong bảng hoặc detail.
* Chỉ hiển thị nếu user có quyền.
* Hiển thị confirm dialog.
* Gọi API deactivate.
* Cập nhật trạng thái sau khi thành công.

### Kết quả mong đợi

* User có quyền deactivate thuốc từ UI.
* Người không có quyền không thấy action.
* Thao tác có confirm để tránh nhầm.
* Danh sách cập nhật đúng sau khi deactivate.

---

## PAC-TASK-068 - Prevent inactive medicines from POS selection

Nhóm cần chặn thuốc inactive xuất hiện trong POS bán hàng.

### Nội dung công việc

* Cập nhật POS medicine search chỉ trả active medicines.
* Backend validate không cho add inactive medicine vào Draft Order.
* UI không hiển thị thuốc inactive để bán.
* Test case add inactive medicine bị chặn.
* Error message rõ ràng nếu gọi API trực tiếp.

### Kết quả mong đợi

* Thuốc inactive không được bán.
* POS chỉ dùng thuốc hợp lệ.
* Backend bảo vệ rule.
* Lịch sử cũ vẫn giữ thuốc inactive nếu đã bán trước đó.

---

## PAC-TASK-069 - Enforce selling_price greater than 0 in backend

Nhóm cần enforce rule giá bán thuốc phải lớn hơn 0 ở backend.

### Nội dung công việc

* Validate `selling_price > 0` khi tạo thuốc.
* Validate `selling_price > 0` khi cập nhật thuốc.
* Trả lỗi 400 nếu giá không hợp lệ.
* Không chỉ rely vào frontend validation.
* Thêm test backend.

### Kết quả mong đợi

* Không thể lưu thuốc giá 0 hoặc âm.
* Rule được enforce ở backend.
* POS không gặp thuốc có giá sai.
* Báo cáo doanh thu đáng tin hơn.

---

## PAC-TASK-070 - Add selling price validation in UI

Nhóm cần thêm validation giá bán ở form frontend.

### Nội dung công việc

* Chặn submit nếu selling price rỗng, bằng 0 hoặc âm.
* Hiển thị lỗi dưới field.
* Format input số tiền phù hợp.
* Đồng bộ với backend validation.
* Test UI bằng dữ liệu sai.

### Kết quả mong đợi

* User nhận lỗi ngay trên form.
* Giảm request lỗi lên backend.
* Form dễ dùng hơn.
* Giá bán hợp lệ trước khi submit.

---

## PAC-TASK-071 - Add tests for medicine price validation

Nhóm cần viết test cho rule giá bán thuốc lớn hơn 0.

### Nội dung công việc

* Test tạo thuốc với giá hợp lệ.
* Test tạo thuốc với giá 0.
* Test tạo thuốc với giá âm.
* Test update giá về 0 bị reject.
* Test message lỗi nếu có.

### Kết quả mong đợi

* Rule price validation được bảo vệ bằng test.
* CI bắt lỗi nếu rule bị phá.
* Backend validation đáng tin cậy.
* Test trace được về Story US-17.

---

## PAC-TASK-072 - Create active_ingredients Prisma model

Nhóm cần tạo model ActiveIngredient để quản lý hoạt chất.

### Nội dung công việc

* Tạo Prisma model `ActiveIngredient`.
* Thêm field `name`, `normalized_name`, `description`, `is_active`.
* Thêm unique constraint cho normalized name nếu phù hợp.
* Tạo migration.
* Chuẩn bị quan hệ với Medicine mapping và Interaction Rule.

### Kết quả mong đợi

* Database có bảng hoạt chất.
* Hoạt chất dùng được cho Medicine mapping.
* Interaction rule dựa trên ActiveIngredient.
* Graph Sync có source data chính xác.

---

## PAC-TASK-073 - Implement ActiveIngredient create API

Nhóm cần tạo API thêm hoạt chất mới.

### Nội dung công việc

* Tạo endpoint `POST /active-ingredients`.
* Kiểm tra permission.
* Validate tên hoạt chất.
* Normalize tên trước khi lưu.
* Trả lỗi nếu trùng hoạt chất.

### Kết quả mong đợi

* Admin tạo được hoạt chất.
* Không tạo trùng dữ liệu.
* Hoạt chất mới dùng được cho mapping.
* API trả lỗi rõ ràng.

---

## PAC-TASK-074 - Implement ActiveIngredient update API

Nhóm cần tạo API cập nhật hoạt chất.

### Nội dung công việc

* Tạo endpoint update active ingredient.
* Kiểm tra ingredient tồn tại.
* Validate tên mới không trùng.
* Cập nhật dữ liệu.
* Tạo graph sync event nếu cần.

### Kết quả mong đợi

* User có quyền cập nhật hoạt chất.
* Dữ liệu hoạt chất sạch và nhất quán.
* Graph có thể sync thay đổi.
* Không làm mất mapping hiện có.

---

## PAC-TASK-075 - Implement ActiveIngredient list/search API

Nhóm cần tạo API danh sách và tìm kiếm hoạt chất.

### Nội dung công việc

* Tạo endpoint `GET /active-ingredients`.
* Hỗ trợ search theo tên.
* Hỗ trợ phân trang nếu cần.
* Lọc active/inactive nếu có.
* Trả dữ liệu cho màn hình management và mapping component.

### Kết quả mong đợi

* UI lấy được danh sách hoạt chất.
* Mapping component có dữ liệu chọn.
* Search hoạt động đúng.
* API có permission view phù hợp.

---

## PAC-TASK-076 - Build ActiveIngredient management screen

Nhóm cần xây dựng màn hình quản lý hoạt chất.

### Nội dung công việc

* Hiển thị danh sách hoạt chất.
* Thêm form tạo/cập nhật hoạt chất.
* Thêm search box.
* Hiển thị trạng thái active/inactive nếu có.
* Tích hợp API create/update/list.

### Kết quả mong đợi

* Admin quản lý được hoạt chất.
* UI rõ ràng và dễ dùng.
* Hoạt chất tạo xong dùng được trong Medicine form.
* Màn hình phục vụ interaction rule và graph baseline.

---

## PAC-TASK-077 - Add ActiveIngredient create/edit form validation

Nhóm cần thêm validation cho form hoạt chất.

### Nội dung công việc

* Tên hoạt chất là bắt buộc.
* Không cho tên chỉ có khoảng trắng.
* Hiển thị lỗi trùng tên nếu backend trả về.
* Disable submit khi form invalid.
* Chuẩn hóa input cơ bản.

### Kết quả mong đợi

* Không tạo hoạt chất rác.
* UI phản hồi lỗi rõ ràng.
* Dữ liệu hoạt chất nhất quán.
* Giảm lỗi mapping và interaction.

---

## PAC-TASK-078 - Create medicine_active_ingredients mapping schema

Nhóm cần tạo bảng mapping giữa thuốc và hoạt chất để phục vụ tương tác thuốc và Graph Sync.

### Nội dung công việc

* Tạo model `medicine_active_ingredients`.
* Liên kết `medicine_id` với `active_ingredient_id`.
* Thêm unique constraint để tránh mapping trùng.
* Chuẩn bị query lấy hoạt chất theo thuốc.
* Đảm bảo mapping thay đổi có thể tạo Graph Sync event.

### Kết quả mong đợi

* Một thuốc có thể có nhiều hoạt chất.
* Một hoạt chất có thể thuộc nhiều thuốc.
* Dữ liệu mapping không bị trùng.
* InteractionAlert có thể suy ra tương tác thuốc từ hoạt chất.

### AI Agent Notes

* Rule tương tác chính thức là ActiveIngredient–ActiveIngredient.
* Không dùng Medicine–Medicine interaction rule làm source of truth.

---

## PAC-TASK-079 - Implement Medicine-Ingredient mapping API

Nhóm cần tạo API để cập nhật mapping giữa Medicine và ActiveIngredient.

### Nội dung công việc

* Tạo endpoint update mapping cho một medicine.
* Nhận danh sách active ingredient ids.
* Validate medicine tồn tại.
* Validate ingredients tồn tại và active nếu cần.
* Replace hoặc update mapping trong transaction.

### Kết quả mong đợi

* Medicine được gán danh sách hoạt chất.
* Mapping không trùng.
* API trả mapping mới sau khi cập nhật.
* Graph sync event được tạo ở task liên quan.

---

## PAC-TASK-080 - Build ingredient mapping component in Medicine form

Nhóm cần tạo component chọn hoạt chất trong form thuốc.

### Nội dung công việc

* Thêm selector/search ActiveIngredient.
* Cho phép chọn nhiều hoạt chất.
* Hiển thị danh sách hoạt chất đã chọn.
* Cho phép remove mapping trước khi lưu.
* Gửi danh sách mapping lên API.

### Kết quả mong đợi

* User gán hoạt chất cho thuốc từ UI.
* Component dễ dùng.
* Không chọn trùng hoạt chất.
* Dữ liệu gửi đúng format.

---

## PAC-TASK-081 - Show mapped ingredients in medicine detail

Nhóm cần hiển thị hoạt chất đã mapping trong màn hình chi tiết thuốc.

### Nội dung công việc

* Gọi API lấy medicine detail kèm ingredients.
* Hiển thị danh sách active ingredients.
* Hiển thị empty state nếu chưa có mapping.
* Thêm link hoặc action edit nếu có quyền.
* Đảm bảo dữ liệu dễ kiểm tra khi demo.

### Kết quả mong đợi

* Người dùng thấy thuốc có hoạt chất nào.
* Dễ kiểm tra dữ liệu interaction.
* Medicine detail đầy đủ hơn.
* Phục vụ demo Graph/Interaction.

---

## PAC-TASK-082 - Add unique validation for ingredient mapping

Nhóm cần validate để không mapping trùng hoạt chất vào cùng một thuốc.

### Nội dung công việc

* Thêm unique constraint ở database.
* Validate ở service trước khi lưu.
* Validate ở UI để không chọn trùng.
* Trả lỗi rõ nếu duplicate.
* Viết test duplicate mapping.

### Kết quả mong đợi

* Mapping không bị trùng.
* Dữ liệu sạch.
* Interaction check không bị duplicate alert do mapping lỗi.
* UI/API thống nhất validation.

---

## PAC-TASK-083 - Prevent mapping inactive ingredient if not allowed

Nhóm cần chặn mapping tới hoạt chất inactive nếu rule dự án không cho phép.

### Nội dung công việc

* Kiểm tra trạng thái ActiveIngredient khi mapping.
* Không hiển thị inactive ingredient trong selector nếu cần.
* Backend reject mapping invalid.
* Trả lỗi rõ cho user.
* Test case mapping inactive.

### Kết quả mong đợi

* Mapping chỉ dùng dữ liệu hợp lệ.
* Không tạo mapping tới hoạt chất không còn dùng.
* Dữ liệu graph và interaction đáng tin hơn.
* UI dễ hiểu khi ingredient không khả dụng.

---

## PAC-TASK-084 - Normalize ActiveIngredient names

Nhóm cần chuẩn hóa tên hoạt chất để tránh tạo trùng dữ liệu.

### Nội dung công việc

* Trim khoảng trắng.
* Chuẩn hóa chữ hoa/thường nếu phù hợp.
* Lưu `normalized_name`.
* So sánh trùng dựa trên normalized name.
* Áp dụng khi create/update.

### Kết quả mong đợi

* Tránh tạo nhiều hoạt chất cùng nghĩa.
* Dữ liệu dễ tìm kiếm.
* Mapping chính xác hơn.
* Interaction rule ít lỗi do tên không nhất quán.

---

## PAC-TASK-085 - Reject raw scraped ingredient strings in official mapping

Nhóm cần ngăn việc dùng chuỗi hoạt chất thô chưa chuẩn hóa làm dữ liệu official.

### Nội dung công việc

* Không cho nhập raw ingredient string trực tiếp trong Medicine mapping.
* Bắt buộc chọn từ ActiveIngredient đã chuẩn hóa.
* Nếu import dữ liệu thô, phải qua bước review/normalize.
* Thêm message hướng dẫn user tạo ActiveIngredient trước.
* Ghi rõ guardrail trong code hoặc docs.

### Kết quả mong đợi

* Dữ liệu mapping chính thức sạch.
* Interaction rule dùng active ingredient chuẩn.
* Không phụ thuộc text thô từ catalog.
* Giảm lỗi Graph Sync và InteractionAlert.

---

## PAC-TASK-086 - Add ActiveIngredient data quality review checklist

Nhóm cần viết checklist kiểm tra chất lượng dữ liệu hoạt chất.

### Nội dung công việc

* Liệt kê rule đặt tên hoạt chất.
* Liệt kê rule tránh trùng.
* Ghi quy trình tạo ActiveIngredient mới.
* Ghi rule không dùng raw scraped string.
* Đưa checklist vào tài liệu hoặc Jira notes.

### Kết quả mong đợi

* Nhóm có hướng dẫn nhập dữ liệu nhất quán.
* AI agent không tự tạo dữ liệu thô.
* Data seed dễ review.
* Dữ liệu phục vụ demo đáng tin hơn.

---

## PAC-TASK-087 - Create graph sync event when Medicine changes

Nhóm cần tạo outbox event khi Medicine thay đổi để Graph Sync xử lý.

### Nội dung công việc

* Khi create/update/deactivate Medicine, tạo graph sync outbox event.
* Event chứa entity type, id, action và source version nếu có.
* Không ghi trực tiếp vào Neo4j từ controller.
* Đảm bảo event tạo trong transaction nếu cần.
* Chuẩn bị cho Graph Sync Worker ở phần sau.

### Kết quả mong đợi

* Medicine thay đổi được đưa vào hàng chờ sync.
* Neo4j projection có thể cập nhật sau.
* PostgreSQL vẫn là source of truth.
* Graph Sync flow đúng baseline.

---

## PAC-TASK-088 - Create graph sync event when ActiveIngredient changes

Nhóm cần tạo outbox event khi ActiveIngredient thay đổi.

### Nội dung công việc

* Khi create/update/deactivate ActiveIngredient, tạo graph sync event.
* Ghi entity type là ActiveIngredient.
* Ghi source id và action.
* Không gọi Neo4j trực tiếp từ API quản lý hoạt chất.
* Đảm bảo event không duplicate không kiểm soát.

### Kết quả mong đợi

* ActiveIngredient thay đổi được sync sau.
* Graph projection không bị stale lâu mà không biết.
* Worker có dữ liệu xử lý.
* Dữ liệu graph trace được về PostgreSQL.

---

## PAC-TASK-089 - Create graph sync event when Ingredient mapping changes

Nhóm cần tạo outbox event khi mapping Medicine–ActiveIngredient thay đổi.

### Nội dung công việc

* Khi update mapping, tạo graph sync event.
* Event liên quan Medicine và mapping.
* Đảm bảo transaction cập nhật mapping và tạo event nhất quán.
* Không sync Neo4j trực tiếp từ UI.
* Chuẩn bị cho CONTAINS relationship projection.

### Kết quả mong đợi

* Graph có thể cập nhật quan hệ CONTAINS.
* Mapping thay đổi không bị bỏ sót.
* Graph-RAG sau này có context đúng.
* PostgreSQL vẫn là nguồn chính.

---

## PAC-TASK-090 - Create suppliers Prisma model

Nhóm cần tạo model Supplier để quản lý nhà cung cấp trong MVP.

### Nội dung công việc

* Tạo model `Supplier`.
* Thêm các trường như tên supplier, số điện thoại, email, địa chỉ, trạng thái active/inactive.
* Chuẩn bị quan hệ với Stock Import.
* Tạo migration.
* Seed supplier mẫu nếu cần.

### Kết quả mong đợi

* Có bảng Supplier rõ ràng.
* Supplier có thể dùng khi tạo phiếu nhập kho.
* Supplier inactive không dùng cho stock import mới.
* Admin có thể deactivate supplier.

---

## PAC-TASK-091 - Implement supplier create API

Nhóm cần tạo API để thêm nhà cung cấp mới.

### Nội dung công việc

* Tạo endpoint `POST /suppliers`.
* Kiểm tra permission của Admin/Warehouse.
* Validate tên supplier và thông tin liên hệ nếu có.
* Lưu supplier với trạng thái active.
* Trả dữ liệu supplier đã tạo.

### Kết quả mong đợi

* Admin/Warehouse có quyền tạo supplier.
* Dữ liệu supplier được lưu đúng.
* API trả lỗi validation rõ.
* Supplier mới dùng được trong Stock Import.

---

## PAC-TASK-092 - Build supplier create form

Nhóm cần tạo form thêm supplier trên frontend.

### Nội dung công việc

* Tạo form nhập tên, phone, email, address.
* Validate các field bắt buộc.
* Gọi API create supplier.
* Hiển thị success/error state.
* Sau khi tạo thành công, quay về danh sách hoặc reset form.

### Kết quả mong đợi

* User có quyền tạo supplier từ UI.
* Form dễ dùng.
* Lỗi hiển thị rõ.
* Supplier mới xuất hiện trong selector nhập kho.

---

## PAC-TASK-093 - Validate supplier required fields

Nhóm cần đảm bảo dữ liệu supplier không thiếu thông tin quan trọng.

### Nội dung công việc

* Xác định field bắt buộc, tối thiểu là tên supplier.
* Validate ở backend.
* Validate ở UI.
* Trả lỗi nếu thiếu thông tin.
* Không lưu supplier rỗng hoặc không có tên.

### Kết quả mong đợi

* Supplier có dữ liệu tối thiểu hợp lệ.
* UI/API thống nhất validation.
* Dữ liệu nhập kho dễ trace.
* Không có supplier rác trong demo.

---

## PAC-TASK-094 - Implement supplier list/search API

Nhóm cần tạo API danh sách và tìm kiếm supplier.

### Nội dung công việc

* Tạo endpoint `GET /suppliers`.
* Hỗ trợ search theo tên hoặc phone/email nếu có.
* Hỗ trợ lọc active/inactive.
* Hỗ trợ pagination.
* Kiểm tra permission view supplier.

### Kết quả mong đợi

* UI lấy được danh sách supplier.
* User tìm supplier nhanh.
* Stock Import có thể chọn supplier active.
* API phân quyền đúng.

---

## PAC-TASK-095 - Implement supplier update API

Nhóm cần tạo API cập nhật thông tin supplier.

### Nội dung công việc

* Tạo endpoint update supplier.
* Kiểm tra supplier tồn tại.
* Validate dữ liệu cập nhật.
* Cho phép Warehouse update theo quyền.
* Trả supplier sau khi cập nhật.

### Kết quả mong đợi

* User có quyền cập nhật supplier.
* Dữ liệu supplier thay đổi đúng.
* Không làm mất lịch sử stock import cũ.
* API xử lý lỗi rõ.

---

## PAC-TASK-096 - Build supplier list and edit screen

Nhóm cần xây dựng màn hình danh sách và chỉnh sửa supplier.

### Nội dung công việc

* Hiển thị danh sách supplier.
* Thêm search/filter.
* Thêm action edit theo quyền.
* Hiển thị form edit.
* Tích hợp API list/update.

### Kết quả mong đợi

* User quản lý supplier từ UI.
* Warehouse có thể create/update nếu có quyền.
* Admin có thêm action deactivate.
* Màn hình dùng được cho Stock Import.

---

## PAC-TASK-097 - Implement Admin-only supplier deactivate API

Nhóm cần tạo API deactivate supplier chỉ dành cho Admin.

### Nội dung công việc

* Tạo endpoint deactivate supplier.
* Gắn permission Admin.
* Set supplier inactive.
* Không xóa cứng supplier.
* Trả lỗi 403 nếu Warehouse gọi.

### Kết quả mong đợi

* Chỉ Admin deactivate supplier.
* Warehouse không deactivate được.
* Supplier inactive không dùng cho import mới.
* Lịch sử import vẫn giữ supplier.

---

## PAC-TASK-098 - Add supplier deactivate confirmation UI

Nhóm cần thêm confirm dialog khi Admin deactivate supplier.

### Nội dung công việc

* Thêm nút deactivate trên supplier UI.
* Chỉ hiển thị cho Admin.
* Hiển thị dialog xác nhận.
* Gọi API deactivate nếu xác nhận.
* Update list sau khi thành công.

### Kết quả mong đợi

* Admin deactivate supplier an toàn.
* Tránh thao tác nhầm.
* UI hiển thị trạng thái inactive.
* Warehouse không thấy action này.

---

## PAC-TASK-099 - Prevent inactive supplier in new Stock Import

Nhóm cần chặn supplier inactive khi tạo phiếu nhập mới.

### Nội dung công việc

* Supplier selector chỉ hiển thị supplier active.
* Backend validate supplier active khi tạo/confirm import.
* Nếu supplier inactive, trả lỗi rõ.
* Không ảnh hưởng phiếu nhập cũ đã dùng supplier đó.
* Test case supplier inactive.

### Kết quả mong đợi

* Stock Import mới không dùng supplier inactive.
* Lịch sử nhập kho cũ vẫn trace được.
* Backend bảo vệ rule.
* Dữ liệu nhập kho nhất quán.

---

## PAC-TASK-100 - Link active supplier selection to Stock Import

Nhóm cần liên kết supplier active với Stock Import.

### Nội dung công việc

* Thêm `supplier_id` vào Stock Import draft.
* Validate supplier tồn tại và active.
* Hiển thị supplier trong detail phiếu nhập.
* Cho phép chọn supplier khi tạo phiếu nhập.
* Không để confirmed import mất supplier.

### Kết quả mong đợi

* Phiếu nhập có supplier rõ ràng.
* Dữ liệu nhập kho trace được nguồn cung.
* Supplier inactive không dùng cho import mới.
* UI/API nhập kho thống nhất.

---

## PAC-TASK-101 - Build supplier selector for Stock Import UI

Nhóm cần tạo component chọn supplier trong màn hình Stock Import.

### Nội dung công việc

* Gọi API supplier active list.
* Hiển thị dropdown/search supplier.
* Cho phép chọn supplier khi tạo phiếu nhập.
* Hiển thị lỗi nếu chưa chọn supplier.
* Không hiển thị supplier inactive.

### Kết quả mong đợi

* Warehouse chọn supplier dễ dàng.
* UI không cho supplier invalid.
* Dữ liệu gửi đúng API.
* Stock Import form hoàn chỉnh hơn.

---

# Sprint 3 — Inventory, MedicineBatch & Stock Import

## PAC-TASK-102 - Create medicine_batches Prisma model

Nhóm cần tạo model `MedicineBatch` để làm nguồn dữ liệu chính thức cho tồn kho.

### Nội dung công việc

* Tạo model `MedicineBatch`.
* Thêm các trường `medicine_id`, `batch_number`, `expiry_date`, `quantity`, `created_at`, `updated_at`.
* Liên kết với Medicine.
* Chuẩn bị liên kết với Stock Import, Inventory Adjustment và Order Batch Allocation.
* Tạo migration.

### Kết quả mong đợi

* Tồn kho được quản lý theo batch.
* MedicineBatch là source of truth.
* Không dùng aggregate inventory làm nguồn chính.
* Các luồng nhập kho, điều chỉnh tồn kho và checkout đều cập nhật batch.

### AI Agent Notes

* Không tạo endpoint sửa quantity trực tiếp.
* Không dùng bảng inventory aggregate làm nguồn quyết định tồn kho.

---

## PAC-TASK-103 - Add MedicineBatch indexes and constraints

Nhóm cần thêm index và constraint cho MedicineBatch để đảm bảo dữ liệu batch chính xác.

### Nội dung công việc

* Thêm index theo `medicine_id`.
* Thêm index theo `expiry_date`.
* Thêm constraint liên quan batch identity nếu phù hợp.
* Đảm bảo query inventory và FEFO hiệu quả hơn.
* Kiểm tra migration chạy ổn.

### Kết quả mong đợi

* Query batch theo medicine nhanh hơn.
* FEFO có dữ liệu sắp xếp ổn định.
* Batch identity được hỗ trợ ở database.
* Dữ liệu tránh trùng sai baseline.

---

## PAC-TASK-104 - Remove aggregate inventory source-of-truth assumptions

Nhóm cần rà soát và loại bỏ giả định tồn kho tổng là source of truth.

### Nội dung công việc

* Không tạo bảng aggregate inventory làm nguồn chính.
* Nếu có view/summary inventory, phải tính từ MedicineBatch.
* Rà soát API inventory, POS, checkout.
* Rà soát seed data không insert tồn kho tổng tùy ý.
* Ghi chú guardrail trong code/docs.

### Kết quả mong đợi

* MedicineBatch là nguồn dữ liệu chính duy nhất cho tồn kho.
* Inventory Summary chỉ là derived view.
* POS/Checkout không dùng aggregate stock sai.
* Baseline tồn kho được bảo vệ.

---

## PAC-TASK-105 - Document MedicineBatch as inventory source of truth

Nhóm cần ghi rõ trong tài liệu rằng MedicineBatch là source of truth.

### Nội dung công việc

* Cập nhật documentation note.
* Ghi rõ Stock Import, Adjustment, Checkout đều cập nhật batch.
* Ghi rõ Inventory Summary là derived data.
* Ghi guardrail không sửa quantity trực tiếp.
* Link tới Story/Task liên quan nếu cần.

### Kết quả mong đợi

* Developer và AI agent hiểu đúng thiết kế tồn kho.
* Không quay lại aggregate inventory.
* Tài liệu hỗ trợ review và demo.
* Traceability rõ hơn.

---

## PAC-TASK-106 - Enforce required batch_number

Nhóm cần bắt buộc batch number cho mọi MedicineBatch.

### Nội dung công việc

* Validate batch number khi tạo batch từ Stock Import.
* Không cho batch number rỗng hoặc null.
* Trim khoảng trắng.
* Trả lỗi rõ nếu thiếu.
* Thêm constraint nếu phù hợp.

### Kết quả mong đợi

* Mọi batch có batch number.
* Không có batch không định danh.
* Stock Import đúng baseline.
* FEFO và traceability ổn định.

---

## PAC-TASK-107 - Normalize batch_number before comparison

Nhóm cần chuẩn hóa batch number trước khi so sánh để tránh duplicate sai.

### Nội dung công việc

* Trim batch number.
* Chuẩn hóa hoa/thường nếu nhóm quyết định.
* Lưu normalized batch number hoặc dùng khi compare.
* Áp dụng trong Stock Import confirm.
* Viết test cho batch number có khoảng trắng.

### Kết quả mong đợi

* Batch identity ổn định.
* Không tạo duplicate do khác khoảng trắng/chữ hoa.
* Merge/reject rule hoạt động chính xác.
* Dữ liệu batch sạch hơn.

---

## PAC-TASK-108 - Add UI validation for batch_number

Nhóm cần thêm validation batch number trên giao diện nhập kho.

### Nội dung công việc

* Batch number là field bắt buộc.
* Hiển thị lỗi nếu rỗng.
* Trim input trước khi gửi hoặc cảnh báo user.
* Không cho confirm nếu thiếu batch number.
* Đồng bộ với backend validation.

### Kết quả mong đợi

* Warehouse nhập batch number đầy đủ.
* Giảm lỗi API validation.
* UI nhập kho rõ ràng hơn.
* Batch data phục vụ trace tốt.

---

## PAC-TASK-109 - Implement batch identity validation service

Nhóm cần xây dựng service kiểm tra danh tính batch thuốc.

### Nội dung công việc

* Chuẩn hóa batch number trước khi so sánh.
* Xác định batch bằng `medicine_id + normalized batch_number + expiry_date`.
* Tìm batch hiện có khi stock import.
* Cho phép merge quantity nếu medicine, batch number và expiry date trùng.
* Chuẩn bị rule reject nếu cùng medicine + batch number nhưng expiry khác.

### Kết quả mong đợi

* Batch identity được kiểm tra nhất quán.
* Không tạo duplicate batch sai hạn sử dụng.
* Import thêm vào batch cũ hoạt động đúng khi đủ điều kiện.
* Dữ liệu batch đáng tin cậy cho FEFO.

---

## PAC-TASK-110 - Add migration constraint for medicine/batch/expiry uniqueness

Nhóm cần thêm ràng buộc database để bảo vệ uniqueness của batch identity.

### Nội dung công việc

* Thêm unique constraint cho `medicine_id + normalized_batch_number + expiry_date`.
* Nếu không có normalized field, cân nhắc field hỗ trợ.
* Chạy migration.
* Xử lý dữ liệu seed trùng nếu có.
* Test constraint khi tạo duplicate.

### Kết quả mong đợi

* Database chặn duplicate batch identity.
* Service logic được bảo vệ thêm ở DB.
* Stock Import không tạo batch trùng.
* FEFO không bị sai do dữ liệu duplicate.

---

## PAC-TASK-111 - Add batch identity unit tests

Nhóm cần viết unit test cho batch identity validation.

### Nội dung công việc

* Test batch mới chưa tồn tại.
* Test batch trùng medicine/batch/expiry được merge.
* Test cùng medicine/batch nhưng expiry khác bị reject.
* Test batch number có khoảng trắng/hoa thường.
* Test message lỗi.

### Kết quả mong đợi

* Batch identity rule có test rõ.
* CI bắt lỗi nếu logic bị thay đổi sai.
* Expiry mismatch được bảo vệ.
* Stock Import đáng tin hơn.

---

## PAC-TASK-112 - Implement inventory summary query from MedicineBatch

Nhóm cần tạo query tổng hợp tồn kho từ MedicineBatch.

### Nội dung công việc

* Query các batch theo medicine.
* Tính tổng quantity.
* Tính sellable quantity.
* Tính expired/near-expiry nếu cần.
* Không dùng aggregate inventory làm source.

### Kết quả mong đợi

* Inventory Summary phản ánh đúng batch.
* Sellable stock không tính batch hết hạn.
* Dữ liệu dùng được cho Admin/Warehouse.
* API chuẩn bị cho UI summary.

---

## PAC-TASK-113 - Build Inventory Summary screen

Nhóm cần xây dựng màn hình Inventory Summary.

### Nội dung công việc

* Hiển thị danh sách thuốc và số lượng tồn tổng hợp.
* Hiển thị sellable quantity.
* Hiển thị trạng thái low-stock/near-expiry nếu có.
* Tích hợp API inventory summary.
* Thêm loading/empty/error state.

### Kết quả mong đợi

* Admin/Warehouse xem được tồn kho tổng quan.
* Dữ liệu dựa trên MedicineBatch.
* UI rõ ràng và dễ demo.
* Staff không thấy dashboard vận hành nếu không có quyền.

---

## PAC-TASK-114 - Add search/filter to Inventory Summary

Nhóm cần thêm tìm kiếm và lọc cho Inventory Summary.

### Nội dung công việc

* Search theo tên hoặc mã thuốc.
* Filter theo low-stock.
* Filter theo near-expiry.
* Filter theo active medicine nếu cần.
* Đồng bộ query params với API.

### Kết quả mong đợi

* User tìm tồn kho nhanh.
* Admin/Warehouse lọc thuốc cần chú ý.
* Empty state hiển thị khi không có kết quả.
* UI hỗ trợ quản lý kho tốt hơn.

---

## PAC-TASK-115 - Implement Batch Detail API

Nhóm cần tạo API xem chi tiết một MedicineBatch.

### Nội dung công việc

* Tạo endpoint `GET /inventory/batches/{id}`.
* Trả medicine, batch number, expiry date, quantity.
* Trả trạng thái expired/near-expiry/sellable.
* Kiểm tra permission inventory view.
* Trả 404 nếu batch không tồn tại.

### Kết quả mong đợi

* UI xem được chi tiết batch.
* Dữ liệu batch rõ ràng.
* Không lộ dữ liệu cho user sai quyền.
* Chuẩn bị cho Inventory Adjustment chọn batch.

---

## PAC-TASK-116 - Build Batch Detail screen

Nhóm cần tạo màn hình Batch Detail.

### Nội dung công việc

* Hiển thị thông tin medicine.
* Hiển thị batch number, expiry date, quantity.
* Hiển thị trạng thái batch.
* Không có input sửa trực tiếp quantity.
* Có link đến adjustment nếu có quyền.

### Kết quả mong đợi

* User xem được chi tiết batch.
* Không sửa quantity trực tiếp.
* UI hỗ trợ quản lý và trace batch.
* Màn hình phù hợp baseline MedicineBatch.

---

## PAC-TASK-117 - Display expired/near-expiry/sellable batch status

Nhóm cần hiển thị trạng thái của batch dựa trên expiry và quantity.

### Nội dung công việc

* Xác định batch expired nếu expiry date đã qua.
* Xác định near-expiry theo threshold.
* Xác định sellable nếu chưa expired và quantity > 0.
* Hiển thị badge trạng thái.
* Đồng bộ với logic backend.

### Kết quả mong đợi

* User nhận biết batch nào bán được.
* Batch hết hạn hiển thị rõ.
* Near-expiry hiển thị đúng threshold.
* POS/FEFO không dùng expired batch.

---

## PAC-TASK-118 - Implement sellable quantity calculation service

Nhóm cần xây dựng service tính số lượng thuốc có thể bán.

### Nội dung công việc

* Lấy danh sách MedicineBatch theo thuốc.
* Chỉ tính batch còn hạn sử dụng.
* Chỉ tính batch có quantity > 0.
* Tổng hợp thành `sellable_quantity`.
* Dùng kết quả này cho Inventory Summary, POS và Checkout.

### Kết quả mong đợi

* Sellable quantity tính đúng.
* Batch hết hạn không được tính để bán.
* POS không bán vượt số lượng có thể bán.
* Checkout có thể validate lại bằng backend.

---

## PAC-TASK-119 - Add tests for sellable quantity calculation

Nhóm cần viết test cho service tính sellable quantity.

### Nội dung công việc

* Test thuốc có một batch sellable.
* Test thuốc có nhiều batch.
* Test batch expired không được tính.
* Test batch quantity bằng 0.
* Test tổng sellable quantity đúng.

### Kết quả mong đợi

* Logic sellable quantity được bảo vệ.
* Không tính nhầm expired batch.
* POS và checkout có nền dữ liệu đúng.
* CI phát hiện lỗi tồn kho sớm.

---

## PAC-TASK-120 - Exclude expired batches from sellable stock

Nhóm cần đảm bảo expired batch không được tính vào tồn kho bán được.

### Nội dung công việc

* Cập nhật service sellable stock.
* Cập nhật API inventory summary.
* Cập nhật POS stock display nếu cần.
* Cập nhật FEFO query sau này.
* Test expired batch exclusion.

### Kết quả mong đợi

* Thuốc hết hạn không được bán.
* Sellable stock chính xác.
* Inventory vẫn có thể hiển thị expired batch để quản lý.
* Checkout không dùng expired batch.

---

## PAC-TASK-121 - Add tests for expired batch exclusion

Nhóm cần viết test riêng cho rule loại trừ batch hết hạn.

### Nội dung công việc

* Seed batch đã hết hạn.
* Seed batch chưa hết hạn.
* Kiểm tra sellable stock chỉ tính batch chưa hết hạn.
* Kiểm tra POS stock availability.
* Kiểm tra inventory report nếu có.

### Kết quả mong đợi

* Expired batch exclusion có test.
* Không ai sửa code làm bán thuốc hết hạn.
* Rule an toàn kho được bảo vệ.
* Demo FEFO đáng tin hơn.

---

## PAC-TASK-122 - Implement low-stock calculation from sellable quantity

Nhóm cần tính low-stock dựa trên sellable quantity, không dựa trên tổng tồn gồm batch hết hạn.

### Nội dung công việc

* Lấy sellable quantity.
* So sánh với min stock threshold của medicine hoặc default.
* Đánh dấu low-stock nếu dưới ngưỡng.
* Trả trạng thái low-stock cho API.
* Không tính expired batch.

### Kết quả mong đợi

* Low-stock đúng với số lượng bán được.
* Admin/Warehouse thấy cảnh báo chính xác.
* Staff không thấy dashboard vận hành tổng quát.
* Rule đúng baseline mới.

---

## PAC-TASK-123 - Display low-stock state for Admin/Warehouse

Nhóm cần hiển thị cảnh báo low-stock cho Admin/Warehouse.

### Nội dung công việc

* Hiển thị badge hoặc card low-stock.
* Dùng dữ liệu từ API.
* Chỉ hiển thị trên màn hình phù hợp với Admin/Warehouse.
* Không hiển thị dashboard low-stock tổng quát cho Staff.
* Thêm empty state nếu không có thuốc low-stock.

### Kết quả mong đợi

* Admin/Warehouse nhận biết thuốc sắp hết.
* Staff không bị overload bởi dashboard kho.
* UI đúng phân quyền.
* Dữ liệu cảnh báo dựa trên sellable quantity.

---

## PAC-TASK-124 - Hide general low-stock dashboard from Staff

Nhóm cần đảm bảo Staff không thấy dashboard vận hành low-stock tổng quát.

### Nội dung công việc

* Kiểm tra permission sidebar.
* Ẩn dashboard inventory operational khỏi Staff.
* Nếu Staff truy cập URL trực tiếp, backend/frontend chặn.
* POS vẫn hiển thị warning liên quan bán hàng nếu cần.
* Test bằng tài khoản Staff.

### Kết quả mong đợi

* Staff chỉ thấy thông tin stock cần cho POS.
* Dashboard operational dành cho Admin/Warehouse.
* Phân quyền UI đúng baseline.
* Không lộ dữ liệu kho không cần thiết cho Staff.

---

## PAC-TASK-125 - Implement near-expiry calculation with threshold

Nhóm cần tính thuốc gần hết hạn theo threshold cấu hình.

### Nội dung công việc

* Lấy threshold từ system settings, default 90 ngày.
* So sánh expiry date của từng batch với ngày hiện tại.
* Đánh dấu near-expiry nếu còn trong threshold.
* Không đánh dấu batch đã expired là near-expiry nếu đã có trạng thái expired riêng.
* Trả trạng thái cho API.

### Kết quả mong đợi

* Near-expiry tính theo batch.
* Default threshold là 90 ngày.
* Admin/Warehouse thấy cảnh báo đúng.
* Report/filter có thể dùng dữ liệu này.

---

## PAC-TASK-126 - Display near-expiry batch state

Nhóm cần hiển thị trạng thái near-expiry trên UI.

### Nội dung công việc

* Hiển thị badge near-expiry trong Inventory Summary hoặc Batch Detail.
* Hiển thị expiry date.
* Có thể filter near-expiry nếu đã có API.
* Đồng bộ với threshold setting.
* Hiển thị empty state nếu không có batch gần hết hạn.

### Kết quả mong đợi

* User dễ nhận biết batch gần hết hạn.
* UI hỗ trợ quản lý kho.
* Dữ liệu rõ ràng khi demo.
* Không nhầm near-expiry với expired.

---

## PAC-TASK-127 - Build Admin/Warehouse inventory dashboard cards

Nhóm cần xây dựng các card dashboard tồn kho cho Admin/Warehouse.

### Nội dung công việc

* Card tổng số thuốc.
* Card low-stock.
* Card near-expiry.
* Card expired batch nếu cần.
* Dữ liệu lấy từ MedicineBatch summary.

### Kết quả mong đợi

* Admin/Warehouse có dashboard kho cơ bản.
* Staff không thấy dashboard này.
* Dashboard giúp demo quản lý kho trực quan.
* Card hiển thị loading/error/empty phù hợp.

---

## PAC-TASK-128 - Build POS sellable stock display

Nhóm cần hiển thị số lượng bán được trong POS.

### Nội dung công việc

* POS medicine search hiển thị sellable quantity.
* Nếu stock thấp, hiển thị warning liên quan bán hàng.
* Không hiển thị toàn bộ dashboard kho cho Staff.
* Dữ liệu lấy từ backend.
* Cập nhật khi quantity trong Draft Order thay đổi.

### Kết quả mong đợi

* Staff biết thuốc còn bán được bao nhiêu.
* Không bán vượt sellable stock.
* POS UX rõ hơn.
* Dữ liệu không tính expired batch.

---

## PAC-TASK-129 - Remove direct quantity edit from Batch Detail UI

Nhóm cần loại bỏ mọi input sửa trực tiếp quantity trong Batch Detail.

### Nội dung công việc

* Không hiển thị field editable cho quantity.
* Nếu cần thay đổi, hướng user sang Inventory Adjustment.
* Hiển thị quantity ở dạng read-only.
* Kiểm tra các form không có direct edit quantity.
* Thêm note UX nếu cần.

### Kết quả mong đợi

* User không sửa quantity trực tiếp từ Batch Detail.
* Tồn kho chỉ thay đổi qua import, adjustment hoặc checkout.
* UI đúng baseline audit.
* Giảm rủi ro sai lệch tồn kho.

---

## PAC-TASK-130 - Ensure no public API directly edits batch quantity

Nhóm cần rà soát backend để không có endpoint public sửa trực tiếp quantity batch.

### Nội dung công việc

* Không tạo `PATCH /batches/{id}/quantity`.
* Rà soát service batch update.
* Chỉ cho update quantity qua Stock Import, Inventory Adjustment, Checkout.
* Nếu có internal method, bảo vệ không expose public.
* Viết guard note/test nếu cần.

### Kết quả mong đợi

* MedicineBatch quantity không bị sửa tùy tiện.
* Audit trail tồn kho đáng tin.
* Baseline Inventory Adjustment được bảo vệ.
* AI agent không tạo API sai.

---

## PAC-TASK-131 - Create stock_imports Prisma model

Nhóm cần tạo model phiếu nhập kho.

### Nội dung công việc

* Tạo model `StockImport`.
* Thêm supplier_id, created_by, status, confirmed_at, notes.
* Liên kết với stock import lines.
* Tạo enum status nếu cần.
* Tạo migration.

### Kết quả mong đợi

* Database lưu được phiếu nhập.
* Phiếu nhập có trạng thái Draft/Confirmed.
* Supplier được liên kết.
* Chuẩn bị cho confirm transaction.

---

## PAC-TASK-132 - Implement create Stock Import draft API

Nhóm cần tạo API tạo phiếu nhập kho ở trạng thái Draft.

### Nội dung công việc

* Tạo endpoint `POST /stock-imports`.
* Kiểm tra permission Warehouse/Admin.
* Validate supplier active.
* Tạo Stock Import status Draft.
* Không cập nhật MedicineBatch ở bước này.

### Kết quả mong đợi

* Warehouse/Admin tạo được phiếu nhập.
* Phiếu mới chưa làm thay đổi tồn kho.
* API trả dữ liệu draft.
* Supplier được lưu đúng.

---

## PAC-TASK-133 - Build create Stock Import screen

Nhóm cần tạo màn hình tạo phiếu nhập kho.

### Nội dung công việc

* Tạo form chọn supplier.
* Nhập note hoặc thông tin phiếu nhập nếu cần.
* Gọi API tạo draft.
* Sau khi tạo, cho user thêm dòng nhập.
* Hiển thị loading/success/error.

### Kết quả mong đợi

* Warehouse tạo được phiếu nhập từ UI.
* Supplier selector hoạt động.
* Draft được tạo đúng.
* UI chuẩn bị cho line editor.

---

## PAC-TASK-134 - Create stock_import_lines Prisma model

Nhóm cần tạo model dòng nhập kho.

### Nội dung công việc

* Tạo model `StockImportLine`.
* Liên kết với StockImport.
* Liên kết với Medicine.
* Thêm batch_number, expiry_date, quantity, import_cost nếu cần.
* Tạo migration.

### Kết quả mong đợi

* Một phiếu nhập có nhiều dòng thuốc.
* Mỗi dòng có batch number và expiry date.
* Dữ liệu đủ để tạo/cộng MedicineBatch.
* Confirm import có dữ liệu chi tiết.

---

## PAC-TASK-135 - Implement add stock import line API

Nhóm cần tạo API thêm dòng thuốc vào phiếu nhập.

### Nội dung công việc

* Tạo endpoint add line.
* Kiểm tra phiếu nhập còn Draft.
* Validate medicine active.
* Validate quantity > 0.
* Lưu batch number và expiry date.

### Kết quả mong đợi

* User thêm được dòng nhập.
* Không thêm line vào phiếu đã Confirmed.
* Dữ liệu line hợp lệ.
* UI line editor tích hợp được.

---

## PAC-TASK-136 - Build stock import line editor UI

Nhóm cần xây dựng UI thêm/sửa/xóa dòng nhập kho.

### Nội dung công việc

* Cho phép chọn medicine.
* Nhập batch number, expiry date, quantity.
* Hiển thị danh sách dòng đã thêm.
* Cho phép update/delete khi phiếu còn Draft.
* Hiển thị lỗi validation.

### Kết quả mong đợi

* Warehouse nhập được nhiều dòng thuốc.
* Batch number và expiry date rõ ràng.
* UI không cho sửa confirmed import.
* Dữ liệu gửi đúng API.

---

## PAC-TASK-137 - Implement update draft import line API

Nhóm cần tạo API cập nhật dòng nhập khi phiếu còn Draft.

### Nội dung công việc

* Tạo endpoint update import line.
* Kiểm tra line thuộc phiếu nhập.
* Kiểm tra phiếu còn Draft.
* Validate dữ liệu mới.
* Trả line đã cập nhật.

### Kết quả mong đợi

* User sửa được dòng nhập trước confirm.
* Không sửa được line sau khi confirmed.
* Backend bảo vệ trạng thái.
* Dữ liệu cập nhật đúng.

---

## PAC-TASK-138 - Implement delete draft import line API

Nhóm cần tạo API xóa dòng nhập khi phiếu còn Draft.

### Nội dung công việc

* Tạo endpoint delete import line.
* Kiểm tra phiếu nhập còn Draft.
* Xóa line hoặc mark deleted tùy thiết kế.
* Không ảnh hưởng MedicineBatch vì chưa confirm.
* Trả kết quả rõ ràng.

### Kết quả mong đợi

* User xóa được line khi còn Draft.
* Confirmed import không bị sửa.
* Draft data linh hoạt.
* UI đồng bộ sau khi xóa.

---

## PAC-TASK-139 - Disable edit/delete for confirmed import lines

Nhóm cần chặn chỉnh sửa dòng nhập khi phiếu đã confirmed.

### Nội dung công việc

* Backend reject update/delete nếu import confirmed.
* UI disable nút edit/delete.
* Hiển thị trạng thái read-only.
* Test confirmed import không sửa được.
* Trả lỗi rõ nếu gọi API trực tiếp.

### Kết quả mong đợi

* Phiếu nhập confirmed immutable.
* Không thể sửa dữ liệu nhập kho sau confirm.
* Tồn kho không bị lệch.
* Audit nhập kho đáng tin.

---

## PAC-TASK-140 - Validate active supplier before confirm import

Nhóm cần kiểm tra supplier còn active trước khi confirm phiếu nhập.

### Nội dung công việc

* Lấy supplier của Stock Import.
* Kiểm tra supplier tồn tại và active.
* Nếu inactive, reject confirm.
* Trả lỗi rõ cho Warehouse.
* Không update MedicineBatch khi supplier invalid.

### Kết quả mong đợi

* Không confirm import với supplier inactive.
* Dữ liệu nhập kho đúng source.
* Transaction không chạy khi validation fail.
* UI hiển thị lỗi phù hợp.

---

## PAC-TASK-141 - Validate batch number in import line

Nhóm cần validate batch number trên từng dòng nhập kho.

### Nội dung công việc

* Batch number là bắt buộc.
* Trim và normalize batch number.
* Reject batch number rỗng.
* Trả lỗi theo dòng nhập.
* Đồng bộ với UI validation.

### Kết quả mong đợi

* Mọi dòng nhập có batch number.
* Không tạo MedicineBatch thiếu batch.
* Traceability batch rõ ràng.
* Confirm import an toàn hơn.

---

## PAC-TASK-142 - Validate expiry date in import line

Nhóm cần validate expiry date trên từng dòng nhập kho.

### Nội dung công việc

* Expiry date là bắt buộc.
* Kiểm tra date format hợp lệ.
* Reject date invalid.
* Cho phép nhập expired batch hay không tùy rule demo, nhưng expired batch không được sellable.
* Trả lỗi rõ nếu thiếu ngày.

### Kết quả mong đợi

* Mọi batch có expiry date.
* FEFO có dữ liệu expiry để sắp xếp.
* Near-expiry/expired calculation hoạt động.
* Không có batch thiếu hạn sử dụng.

---

## PAC-TASK-143 - Implement confirm Stock Import transaction skeleton

Nhóm cần xây dựng transaction xác nhận phiếu nhập kho.

### Nội dung công việc

* Kiểm tra phiếu nhập đang ở trạng thái Draft.
* Đọc toàn bộ dòng nhập.
* Validate supplier, medicine, batch number, expiry date và quantity.
* Trong transaction, tạo mới hoặc cộng quantity vào MedicineBatch.
* Nếu bất kỳ dòng nào lỗi, rollback toàn bộ.
* Đổi trạng thái phiếu nhập thành Confirmed.

### Kết quả mong đợi

* Confirm phiếu nhập cập nhật MedicineBatch đúng.
* Không có partial confirm.
* Không cộng tồn kho lặp.
* Confirmed import bị khóa không cho sửa.

### AI Agent Notes

* Không update aggregate inventory.
* Không silently merge nếu expiry mismatch.
* Không tạo duplicate batch để né lỗi.

---

## PAC-TASK-144 - Apply stock import lines to MedicineBatch

Nhóm cần xử lý từng dòng nhập để tạo mới hoặc cập nhật MedicineBatch.

### Nội dung công việc

* Với mỗi line, xác định medicine, batch number, expiry date.
* Tìm batch hiện có theo batch identity.
* Nếu trùng đầy đủ, cộng quantity.
* Nếu chưa có, tạo batch mới.
* Nếu expiry mismatch, để task reject xử lý hoặc trả lỗi.

### Kết quả mong đợi

* Stock Import confirmed làm tăng MedicineBatch đúng.
* Không cập nhật aggregate inventory.
* Quantity batch sau confirm chính xác.
* Hỗ trợ merge batch hợp lệ.

---

## PAC-TASK-145 - Rollback Stock Import confirm on any invalid line

Nhóm cần đảm bảo confirm Stock Import rollback toàn bộ nếu có dòng nhập không hợp lệ.

### Nội dung công việc

* Bọc confirm import trong transaction.
* Nếu một line lỗi validation, throw error.
* Không cập nhật bất kỳ MedicineBatch nào nếu fail.
* Không đổi trạng thái phiếu nhập sang Confirmed.
* Trả danh sách lỗi hoặc lỗi rõ ràng cho user.

### Kết quả mong đợi

* Không có partial confirm.
* Dữ liệu batch không bị cập nhật nửa chừng.
* Warehouse biết lỗi để sửa.
* Confirm import an toàn và nhất quán.

### Testing Notes

* Test nhiều line, một line lỗi.
* Test MedicineBatch không thay đổi sau rollback.
* Test import vẫn ở Draft sau failure.

---

# Out-of-scope guard cho tài liệu 4A

Không tạo hoặc implement Task trong phần 4A cho các nội dung sau:

```text
Custom username/password auth
Lưu password_hash trong PostgreSQL
Custom JWT thay Supabase Auth
Role-only authorization không có permission
Aggregate inventory làm source of truth
Sửa trực tiếp MedicineBatch quantity
Medicine không có ActiveIngredient mapping
Drug interaction theo Medicine–Medicine làm rule chính thức
Supplier bị xóa cứng làm mất lịch sử nhập kho
Stock Import confirmed vẫn cho sửa
Stock Import merge batch khi expiry mismatch
Batch không có batch_number
Batch hết hạn vẫn được tính sellable stock
ProductVariant làm sales key MVP
```

Thông tin cảnh báo tương tác thuốc và nội dung AI trong hệ thống chỉ mang tính hỗ trợ tham khảo cho đồ án, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.
