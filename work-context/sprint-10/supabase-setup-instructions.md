# Hướng dẫn Thiết lập Supabase

Dự án PharmaAssist sử dụng **Supabase** (PostgreSQL) làm cơ sở dữ liệu chính và dịch vụ xác thực (Authentication). Tài liệu này hướng dẫn cách lấy thông tin cấu hình từ Supabase.

## 1. Lấy thông tin URL và API Keys

1. Đăng nhập vào [Supabase Dashboard](https://supabase.com/dashboard).
2. Chọn dự án PharmaAssist (Project Ref hiện tại: `opzhotrjpxlldflcnzzq`).
3. Truy cập **Project Settings** > **API**.
4. Lấy các thông tin sau:
   - **Project URL**: Thường có dạng `https://[PROJECT_REF].supabase.co`.
   - **anon / public key**: Dùng cho Frontend (`NEXT_PUBLIC_SUPABASE_ANON_KEY`).
   - **service_role / secret key**: Dùng cho Backend (`SUPABASE_KEY`). Tuyệt đối không để lộ key này ở frontend.
   - **JWT Secret**: Lấy ở phần JWT Settings, dùng cho `JWT_SECRET` ở backend.

## 2. Chuỗi kết nối Database (Database Connection String)

1. Truy cập **Project Settings** > **Database**.
2. Cuộn xuống phần **Connection string** > **URI**.
3. **Đối với Backend (Prisma Data Proxy / Connection Pooling):**
   - Đảm bảo bạn đang ở tab `Transaction` (port `6543`).
   - Nếu bạn có sử dụng PgBouncer, chuỗi kết nối sẽ có đuôi `?pgbouncer=true`.
   - Lưu chuỗi này vào biến `DATABASE_URL` trong file `backend/.env`.
4. **Đối với Prisma Migrate (Direct Connection):**
   - Chuyển sang tab `Session` (port `5432`).
   - Chuỗi này không đi qua connection pooler.
   - Lưu chuỗi này vào biến `DIRECT_URL` trong file `backend/.env`.

## 3. Xác thực (Authentication)

Supabase Auth đã được kích hoạt mặc định. Đảm bảo bạn đã:
- Tắt tính năng "Confirm email" trong **Authentication** > **Providers** > **Email** nếu bạn muốn test local mà không cần gửi email xác nhận thực tế.
- Thêm `http://localhost:3000` vào **Redirect URLs** (trong phần URL Configuration).

## 4. Reset mật khẩu Database

Nếu bạn quên mật khẩu database:
1. Vào **Project Settings** > **Database**.
2. Chọn **Reset database password** và lưu lại mật khẩu mới.
3. Cập nhật mật khẩu mới vào các chuỗi `DATABASE_URL` và `DIRECT_URL` ở local.
