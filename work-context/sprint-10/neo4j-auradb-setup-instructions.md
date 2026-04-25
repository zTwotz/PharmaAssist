# Hướng dẫn Thiết lập Neo4j AuraDB

Dự án PharmaAssist sử dụng **Neo4j** (Graph Database) để lưu trữ và truy vấn mạng lưới tương tác thuốc (Drug Interaction Graph) và hỗ trợ Graph-RAG cho AI. Tài liệu này hướng dẫn cách lấy thông tin cấu hình từ Neo4j AuraDB.

## 1. Đăng ký và Tạo Instance Neo4j AuraDB (Miễn phí)

1. Truy cập [Neo4j Aura Console](https://console.neo4j.io/).
2. Đăng nhập hoặc tạo tài khoản mới.
3. Tạo một Database mới với gói **Aura Free**.
4. Khi quá trình khởi tạo thành công, hệ thống sẽ cung cấp cho bạn một file text chứa thông tin đăng nhập bao gồm:
   - **Connection URI** (thường bắt đầu bằng `neo4j+s://`)
   - **Username** (mặc định là `neo4j`)
   - **Password** (chuỗi mật khẩu sinh ngẫu nhiên)

**CẢNH BÁO:** Bạn chỉ được xem mật khẩu này **MỘT LẦN DUY NHẤT** lúc tạo instance. Hãy copy và lưu trữ cẩn thận.

## 2. Cấu hình vào biến môi trường

Mở file `backend/.env` và cập nhật các biến sau với thông tin bạn vừa nhận được:

```env
# Thông tin kết nối Neo4j
NEO4J_URI=neo4j+s://[INSTANCE_ID].databases.neo4j.io
NEO4J_USER=neo4j
NEO4J_PASSWORD=[YOUR_GENERATED_PASSWORD]
```

## 3. Quản lý Graph bằng Neo4j Workspace / Browser

Bạn có thể mở giao diện quản lý Graph trực tiếp từ Aura Console:
1. Nhấn nút **Open** trên instance của bạn.
2. Trình duyệt sẽ mở Neo4j Workspace (có chứa thẻ Browser).
3. Đăng nhập bằng Password mà bạn đã lưu ở Bước 1.
4. Tại đây, bạn có thể chạy các câu lệnh Cypher (ví dụ: `MATCH (n) RETURN n LIMIT 10;`) để trực quan hóa dữ liệu graph.

## 4. Neo4j Desktop (Dành cho môi trường Local hoàn toàn)

Nếu bạn không muốn sử dụng AuraDB (Cloud), bạn có thể cài đặt **Neo4j Desktop**:
1. Tải và cài đặt Neo4j Desktop từ [trang chủ Neo4j](https://neo4j.com/download/).
2. Tạo một Local DBMS mới và thiết lập mật khẩu.
3. Start DBMS.
4. URI mặc định thường là `bolt://localhost:7687` hoặc `neo4j://localhost:7687`.
5. Cập nhật file `.env` tương ứng:
```env
NEO4J_URI=neo4j://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=[YOUR_LOCAL_PASSWORD]
```
