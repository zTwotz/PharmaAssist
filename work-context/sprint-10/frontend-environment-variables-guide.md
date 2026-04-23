# Hướng dẫn Cấu hình Biến Môi Trường Frontend

Tài liệu này hướng dẫn cách thiết lập các biến môi trường cho dự án Frontend (Next.js) của PharmaAssist.

## 1. File `.env.local`

Trong thư mục `frontend`, tạo file `.env.local` dựa trên file `.env.example` có sẵn:

```bash
cd frontend
cp .env.example .env.local
```

## 2. Các biến môi trường bắt buộc

Mở file `.env.local` và điền các giá trị sau:

### API URL
Đường dẫn tới backend API. Nếu bạn chạy backend ở local, giá trị mặc định là:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Supabase
Thông tin kết nối tới Supabase (dùng cho xác thực). Bạn có thể lấy các thông tin này từ Dashboard của Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=https://opzhotrjpxlldflcnzzq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 3. Các biến môi trường tùy chọn

Nếu có sử dụng Google Analytics hoặc các dịch vụ frontend khác:
```env
# NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 4. Lưu ý quan trọng
- Không bao giờ commit file `.env.local` lên Git.
- Các biến môi trường cho Next.js bắt buộc phải có tiền tố `NEXT_PUBLIC_` thì client-side (trình duyệt) mới có thể đọc được. Nếu không có tiền tố này, biến đó chỉ có thể truy cập ở server-side (như trong `getServerSideProps` hoặc API Routes).
