# Hướng dẫn thiết lập Local với Node.js (Official Path)

Tài liệu này cung cấp các bước chính thức để thiết lập môi trường phát triển (Local Development Environment) cho dự án **PharmaAssist AI Intelligence** sử dụng trực tiếp Node.js, không thông qua Docker.

## 1. Yêu cầu hệ thống (Prerequisites)

* **Node.js**: Phiên bản khuyến nghị là **v20.x LTS** (hoặc v18.x LTS).
* **npm**: Cài đặt đi kèm với Node.js (phiên bản 9.x hoặc 10.x).
* **Database**: PostgreSQL (có thể sử dụng Supabase local hoặc cloud).
* **Neo4j**: Cần có Neo4j AuraDB hoặc Neo4j Desktop (phiên bản 5.x).

Kiểm tra phiên bản:
```bash
node -v
npm -v
```

## 2. Cài đặt Dependencies

Dự án bao gồm hai thư mục chính là `frontend` và `backend`. Bạn cần cài đặt các thư viện cho cả hai.

### Backend:
```bash
cd backend
npm install
```

### Frontend:
```bash
cd ../frontend
npm install
```

## 3. Cấu hình biến môi trường

Bạn cần copy các file `.env.example` thành `.env` ở cả hai thư mục và điền thông tin phù hợp.

* **Backend**: `backend/.env` (Cấu hình `DATABASE_URL`, `NEO4J_URI`, `JWT_SECRET`, `GOOGLE_AI_API_KEY`, v.v.)
* **Frontend**: `frontend/.env.local` (Cấu hình `NEXT_PUBLIC_API_URL` trỏ về backend local).

*(Xem thêm tài liệu cấu hình chi tiết ở các phần tiếp theo)*

## 4. Các bước Migrate và Seed dữ liệu

Trước khi chạy backend, bạn cần khởi tạo database với Prisma.

```bash
cd backend
# Tạo các bảng theo schema hiện tại
npx prisma db push
# Hoặc npx prisma migrate deploy (nếu đã có file migration)

# Khởi tạo dữ liệu mẫu (MVP seed data)
npm run seed
```

## 5. Khởi chạy dự án

Bạn sẽ cần mở hai terminal để chạy cả Frontend và Backend.

### Terminal 1 - Backend:
```bash
cd backend
npm run start:dev
# Backend sẽ chạy tại: http://localhost:3001
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
# Frontend sẽ chạy tại: http://localhost:3000
```

## 6. Troubleshooting cơ bản

* **Lỗi `Error: Cannot find module '@prisma/client'`**:
  * Chạy lệnh `npx prisma generate` trong thư mục `backend` để tạo Prisma Client.
* **Lỗi `Connection pool is full` hoặc timeout database**:
  * Kiểm tra lại chuỗi kết nối `DATABASE_URL`. Nếu dùng Supabase, đảm bảo sử dụng port 6543 cho Transaction Pooling thay vì port 5432.
* **Lỗi `Port 3000/3001 is already in use`**:
  * Tắt các process Node đang chạy ngầm bằng lệnh `killall node` (trên Mac/Linux) hoặc tìm PID và tắt thủ công.
* **Lỗi TypeScript Compile (tsc)**:
  * Xóa thư mục `dist` và file `tsconfig.tsbuildinfo` trong `backend`, sau đó chạy lại.
