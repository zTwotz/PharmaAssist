# Hướng dẫn Cấu hình Biến Môi Trường Backend

Tài liệu này hướng dẫn cách thiết lập các biến môi trường cho dự án Backend (NestJS) của PharmaAssist.

## 1. File `.env`

Trong thư mục `backend`, sao chép file `.env.example` thành `.env`:

```bash
cd backend
cp .env.example .env
```

## 2. Các biến môi trường bắt buộc

Mở file `.env` và điền các giá trị sau:

### Database (PostgreSQL / Supabase)
```env
# Kết nối PostgreSQL (nếu dùng Supabase thì đây là chuỗi Transaction Pooling port 6543)
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Kết nối trực tiếp (Direct Connection) cho Prisma Migration (port 5432)
DIRECT_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
```

### Neo4j Graph Database
```env
# Thông tin kết nối Neo4j (AuraDB hoặc Local)
NEO4J_URI=neo4j+s://<YOUR_NEO4J_ID>.databases.neo4j.io
NEO4J_USER=neo4j
NEO4J_PASSWORD=<YOUR_PASSWORD>
```

### Supabase Auth
```env
# URL của Supabase Project
SUPABASE_URL=https://[PROJECT_REF].supabase.co

# Role Key (Service Role Key) dùng để backend có quyền quản trị gọi API Supabase
SUPABASE_KEY=<YOUR_SERVICE_ROLE_KEY>
```

### JWT Secret
```env
# JWT Secret (phải khớp với JWT Secret cấu hình trong Supabase Settings > API)
JWT_SECRET=<YOUR_SUPABASE_JWT_SECRET>
```

### Google AI (Gemini)
```env
# API Key của Google AI Studio
GOOGLE_AI_API_KEY=<YOUR_GOOGLE_AI_API_KEY>
```

## 3. Lưu ý quan trọng
- Tuyệt đối không commit file `.env` lên Git.
- Khi triển khai lên môi trường Production, các biến này cần được thiết lập trong phần cấu hình của nền tảng host (ví dụ: Vercel, Render, Heroku).
- File `.env` của backend chỉ đọc được bởi Node.js, không lộ ra ngoài frontend.
