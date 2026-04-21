# Hướng dẫn Thiết lập Google AI API Key

Dự án PharmaAssist sử dụng Google Gemini (thông qua `@google/genai`) làm AI Copilot để phân tích đơn thuốc, gợi ý chẩn đoán và trích xuất thông tin. Tài liệu này hướng dẫn cách lấy và cấu hình API Key.

## 1. Lấy API Key từ Google AI Studio

1. Truy cập [Google AI Studio](https://aistudio.google.com/).
2. Đăng nhập bằng tài khoản Google của bạn.
3. Nhấp vào nút **Get API key** ở thanh menu (hoặc thanh bên trái).
4. Nhấp vào **Create API key** và chọn tạo một project mới hoặc chọn một Google Cloud Project có sẵn.
5. Khi khóa được tạo thành công, hãy copy toàn bộ chuỗi ký tự API Key.

## 2. Cấu hình vào biến môi trường

Mở file `backend/.env` và cập nhật biến `GOOGLE_AI_API_KEY` bằng giá trị vừa copy:

```env
# Google AI Studio API Key (dùng cho Gemini)
GOOGLE_AI_API_KEY=AIzaSy...[YOUR_API_KEY]...
```

## 3. Quản lý Quota (Giới hạn truy cập)

Phiên bản Free của Google AI Studio thường có giới hạn Request Per Minute (RPM). Nếu bạn gặp lỗi `429 Too Many Requests` trong quá trình sử dụng hệ thống AI Copilot:
- Hệ thống sẽ tự động kích hoạt cơ chế **Mock AI Fallback** (nếu bạn bật biến môi trường `USE_MOCK_AI=true`).
- Hãy chờ khoảng 1 phút rồi thử lại, hoặc liên kết với tài khoản thanh toán Google Cloud nếu bạn cần giới hạn cao hơn.

## 4. Lưu ý bảo mật

Tuyệt đối không nhúng `GOOGLE_AI_API_KEY` trực tiếp vào mã nguồn Frontend hoặc commit file `.env` lên GitHub để tránh bị đánh cắp API Key. Mọi kết nối tới Gemini đều phải đi qua Backend trung gian.
