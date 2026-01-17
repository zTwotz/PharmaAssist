Để test giao diện Sprint 1, bạn nên test theo **luồng người dùng thật**, không chỉ nhìn build pass. Sprint 1 chủ yếu là **Auth + RBAC + User Account**, nên test UI phải xoay quanh 3 role:

```text
Admin
Staff
Warehouse
```

## 1. Chạy app local trước

Backend:

```bash
cd backend
npm run start:dev
```

Frontend:

```bash
cd frontend
npm run dev
```

Mở:

```text
http://localhost:3000
```

Nếu backend chạy port khác, kiểm tra lại `frontend/.env.local`.

---

## 2. Chuẩn bị tài khoản test

Bạn cần tối thiểu 3 tài khoản:

```text
admin@pharmaassist.local      → ADMIN
staff@pharmaassist.local      → STAFF
warehouse@pharmaassist.local  → WAREHOUSE
```

Nếu chưa có tài khoản Supabase thật, cần tạo trong Supabase Auth hoặc bằng chức năng Admin tạo staff mà Sprint 1 đã làm.

---

# Checklist test giao diện Sprint 1

## A. Test Login UI

Vào:

```text
/login
```

Test:

```text
[x] Login form hiển thị đúng.
[x] Nhập sai email/password → hiện lỗi.
[x] Nhập đúng email/password → login thành công.
[x] Khi đang login có loading state.
[x] Sau login redirect về /dashboard hoặc route phù hợp.
[x] Không bị trắng màn hình.
[x] Không có lỗi console nghiêm trọng.
```

---

## B. Test Logout UI

Sau khi login:

```text
[x] Có nút logout hoặc menu logout.
[x] Bấm logout → session bị xóa.
[x] User được chuyển về /login.
[x] Sau logout, truy cập /dashboard bằng URL trực tiếp → bị chặn.
[x] Refresh browser sau logout vẫn không vào được trang protected.
```

---

## C. Test Dashboard sau login

Login bằng từng role.

### Admin

```text
[x] Admin vào được /dashboard.
[x] Hiển thị thông tin user hiện tại.
[x] Sidebar hiện các menu Admin/User Management.
[x] Admin thấy Medicine, Inventory, POS nếu được cấp quyền.
```

### Staff

```text
[x] Staff vào được /dashboard.
[x] Staff không thấy menu quản lý user/staff.
[x] Staff thấy POS/Sales nếu có quyền bán hàng.
[x] Staff không thấy các action chỉ dành cho Admin.
```

### Warehouse

```text
[x] Warehouse vào được /dashboard.
[x] Warehouse thấy Inventory hoặc khu vực kho.
[x] Warehouse không thấy POS.
[x] Warehouse không thấy Checkout.
[x] Warehouse không thấy User Management.
```

---

## D. Test Permission-aware Sidebar

Đây là phần quan trọng của Wave C.

Test bằng cách login từng role và quan sát sidebar:

```text
[ ] Admin thấy menu quản lý nhân viên.
[ ] Staff không thấy menu quản lý nhân viên.
[ ] Warehouse không thấy POS.
[ ] Menu không bị hiện sai theo role cũ.
[ ] Sidebar dùng permission, không chỉ dùng role hard-code.
```

Nếu muốn test kỹ hơn, mở DevTools → Network → kiểm tra `/auth/me` có trả:

```json
{
  "roles": ["..."],
  "permissions": ["..."]
}
```

---

## E. Test Forbidden Page

Thử truy cập trực tiếp các route không đủ quyền.

Ví dụ login Warehouse rồi vào:

```text
/pos
```

Kết quả mong muốn:

```text
[ ] Không vào được POS.
[ ] Bị redirect sang /forbidden hoặc trang báo không có quyền.
[ ] UI hiển thị thông báo dễ hiểu.
[ ] Không bị crash.
```

Login Staff rồi thử vào:

```text
/dashboard/staff
/dashboard/staff/new
```

Kết quả mong muốn:

```text
[ ] Staff không được vào trang quản lý staff nếu thiếu quyền.
[ ] Bị redirect hoặc hiện forbidden.
```

---

## F. Test Admin Staff Management UI

Login Admin.

Vào:

```text
/dashboard/staff
```

Test:

```text
[ ] Danh sách nhân viên hiển thị.
[ ] Có badge trạng thái ACTIVE / INACTIVE / SUSPENDED / BANNED.
[ ] Admin thấy nút cập nhật nhân viên.
[ ] Staff/Warehouse không thấy nút cập nhật nếu thiếu permission.
[ ] Form tạo staff hoạt động.
[ ] Email trùng hiển thị lỗi.
[ ] Tạo staff xong danh sách cập nhật đúng.
```

---

## G. Test First-login Password Change

Dùng tài khoản staff mới có:

```text
mustChangePassword = true
```

Test:

```text
[ ] Login thành công nhưng bị chuyển sang /change-password.
[ ] Không vào được /dashboard trước khi đổi password.
[ ] Nhập password mới hợp lệ.
[ ] Supabase update password thành công.
[ ] Backend clear mustChangePassword thành false.
[ ] Sau khi đổi xong redirect về /dashboard.
[ ] Logout rồi login lại bằng password mới thành công.
[ ] Không bị yêu cầu đổi password lần nữa.
```

Test lỗi:

```text
[ ] Password quá yếu → hiện lỗi.
[ ] Supabase update password fail → không clear mustChangePassword.
[ ] Backend clear flag fail → hiện lỗi, không crash.
```

---

## H. Test Account Status UI

Login Admin.

Trong trang staff:

```text
[ ] Đổi staff ACTIVE → INACTIVE thành công.
[ ] Badge trạng thái đổi đúng.
[ ] User INACTIVE không truy cập được nghiệp vụ.
[ ] Admin không thể tự chuyển tài khoản mình sang INACTIVE/SUSPENDED/BANNED.
[ ] Khi đổi status có audit log ở backend.
```

Sau đó thử login bằng tài khoản bị INACTIVE:

```text
[ ] Login có thể qua Supabase nếu Supabase Auth vẫn cho phép.
[ ] Nhưng backend/app phải chặn nghiệp vụ vì profile không ACTIVE.
[ ] UI không cho vào dashboard hoặc hiện forbidden.
```

---

## I. Test Staff Ownership UI/API

Login Staff.

```text
[ ] Staff chỉ thấy order của chính mình.
[ ] Staff không thấy order của staff khác.
[ ] Admin thấy toàn bộ orders.
```

Nếu UI order chưa đầy đủ, test bằng API hoặc page hiện có:

```text
GET /orders
```

Kỳ vọng:

```text
Admin → trả nhiều orders.
Staff A → chỉ trả orders của Staff A.
Staff B → chỉ trả orders của Staff B.
```

---

## J. Test Console + Network

Trong Chrome DevTools:

### Console

```text
[ ] Không có lỗi đỏ nghiêm trọng.
[ ] Không có lỗi undefined permissions.
[ ] Không có lỗi hydration Next.js.
```

### Network

Kiểm tra các API:

```text
/auth/me
/users/staff
/orders
```

Kỳ vọng:

```text
[ ] Có Authorization Bearer token.
[ ] API thiếu quyền trả 403.
[ ] API thiếu token trả 401.
[ ] API user inactive trả 403.
```

---

# Checklist ngắn để chốt UI Sprint 1

Bạn có thể ghi vào `sprint-1-progress.md` như sau:

```md
## Sprint 1 UI Manual Test Checklist

### Admin
- [ ] Login thành công.
- [ ] Dashboard hiển thị đúng.
- [ ] Sidebar hiển thị Admin/User Management.
- [ ] Tạo staff thành công.
- [ ] Đổi trạng thái staff thành công.
- [ ] Không thể tự vô hiệu hóa tài khoản mình.

### Staff
- [ ] Login thành công.
- [ ] Không thấy User Management.
- [ ] Không truy cập được route Admin.
- [ ] Chỉ thấy dữ liệu order thuộc mình.
- [ ] Nếu mustChangePassword = true thì bị chuyển sang /change-password.

### Warehouse
- [ ] Login thành công.
- [ ] Không thấy POS.
- [ ] Truy cập trực tiếp /pos bị chặn.
- [ ] Không gọi được API checkout/interaction alert không có quyền.

### Auth Flow
- [ ] Login sai hiện lỗi.
- [ ] Login đúng redirect đúng.
- [ ] Logout xóa session.
- [ ] Sau logout không vào được protected route.
- [ ] Refresh browser không làm sai trạng thái auth.

### Permission UI
- [ ] Sidebar theo permission.
- [ ] Button theo permission.
- [ ] Forbidden page hoạt động.
- [ ] Không có lỗi console nghiêm trọng.
```

## Kết luận

Test giao diện Sprint 1 nên tập trung vào:

```text
Login / Logout
RouteGuard
Sidebar theo permission
Forbidden page
Admin staff management
First-login password change
Account status
Staff/Warehouse restriction
```

Sau khi manual test các mục trên pass, bạn mới nên xem Sprint 1 UI là ổn để merge `develop -> main`.
