# Hướng dẫn Thiết lập MockAI Fallback

Trong dự án PharmaAssist, khi API Google Gemini bị lỗi (do quá tải - 429, hoặc lỗi mạng), hệ thống có thể sử dụng cơ chế **MockAI Fallback** để đảm bảo quá trình thao tác không bị gián đoạn.

## 1. Mục đích của MockAI
- **Development & Testing**: Cho phép lập trình viên test các luồng tính năng (như Checkout, Cảnh báo Tương tác thuốc) mà không cần gọi API thật, giúp tiết kiệm quota và tăng tốc độ test.
- **Resilience**: Hệ thống tự động chuyển sang fallback mode nếu API chính thất bại.

## 2. Cách kích hoạt MockAI (Cục bộ)

Để ép backend luôn sử dụng MockAI thay vì gọi Google AI thật, hãy thêm biến môi trường sau vào file `backend/.env`:

```env
# Ép hệ thống dùng Mock AI cho mọi request (Bỏ qua Google AI API)
USE_MOCK_AI=true
```

Khởi động lại backend để nhận cấu hình mới:
```bash
npm run start:dev
```

## 3. Cách hoạt động
Khi tính năng MockAI được bật:
- Hệ thống sẽ trả về các kết quả được định nghĩa sẵn (hardcoded) tùy theo action.
- Ví dụ: Phân tích đơn thuốc sẽ trả về "Không phát hiện tương tác nghiêm trọng" dưới dạng JSON chuẩn.
- Bảng `AiAuditLog` vẫn sẽ được ghi lại log, nhưng cột `providerUsed` sẽ có giá trị là `MOCK`, và cột `fallbackReason` sẽ ghi nhận "FORCED_BY_ENV" hoặc "API_ERROR".

## 4. Tắt MockAI
Khi bạn đã sẵn sàng sử dụng AI thật, hãy đổi giá trị thành `false` hoặc xóa dòng đó trong `.env`:

```env
USE_MOCK_AI=false
```
Và đảm bảo biến `GOOGLE_AI_API_KEY` đã được cấu hình đúng.
