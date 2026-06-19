# Online Checkout Separation from POS Checkout

> **Status:** FUTURE / PROPOSED / NOT IMPLEMENTED
> **Logical Task:** PAC-TASK-561
> **Jira Key:** PAC-771
> **Story:** US-162
> **Epic:** PAC-EPIC-32
> **Component:** Online Commerce
> **Implementation authorization:** No

## 1. Mục đích và Phạm vi (Objective & Scope)
Tài liệu này xác định sự khác biệt và sự phân tách về mặt kiến trúc giữa quy trình thanh toán tại quầy (POS Checkout - đang có trong MVP) và quy trình thanh toán trực tuyến (Online Checkout - Future Scope). Việc phân tách này nhằm đảm bảo luồng POS hoạt động độc lập, bảo mật, tối ưu tốc độ và không bị trộn lẫn với các logic phức tạp của thương mại điện tử.

## 2. POS Checkout (Phạm vi MVP)
Trong phiên bản MVP hiện tại, quy trình thanh toán diễn ra trực tiếp tại quầy thuốc thông qua màn hình thu ngân:
- **Người thực hiện (Actor):** Dược sĩ/Nhân viên bán hàng (Staff).
- **Khách hàng (Customer):** Ẩn danh hoặc định danh sơ bộ (số điện thoại) nhưng không yêu cầu tài khoản.
- **Phương thức thanh toán:** Tiền mặt (Cash), Quẹt thẻ tại máy POS vật lý, hoặc chuyển khoản ngân hàng (Bank Transfer) kiểm tra bằng mắt thường. Hệ thống chỉ ghi nhận trạng thái thanh toán là thành công, không tích hợp cổng thanh toán online.
- **Giao hàng (Shipping):** Giao hàng trực tiếp (Handover). Không có phí vận chuyển (Shipping fee).
- **Endpoint:** Sử dụng endpoint riêng biệt, ví dụ `/api/pos/checkout`.

## 3. Online Checkout (Future Scope)
Quy trình thanh toán trực tuyến cho khách hàng mua qua Website/App:
- **Người thực hiện (Actor):** Khách hàng (Customer) tự thực hiện.
- **Khách hàng (Customer):** Yêu cầu đăng nhập tài khoản khách hàng hoặc sử dụng Guest Checkout kết hợp với việc thu thập địa chỉ, email và số điện thoại giao hàng.
- **Phương thức thanh toán:** Tích hợp API cổng thanh toán bên thứ ba (VNPAY, MoMo, ZaloPay, Stripe) yêu cầu quy trình callback/webhook phức tạp để xác nhận thanh toán.
- **Giao hàng (Shipping):** Bắt buộc phải tính toán phí vận chuyển (Shipping fee) dựa trên địa chỉ giao hàng và trọng lượng sản phẩm, liên kết với đơn vị vận chuyển (Ahamove, GHN).
- **Endpoint:** Cần thiết kế endpoint riêng, ví dụ `/api/commerce/checkout`.

## 4. Rủi ro khi không phân tách rõ ràng
Nếu cố gắng tái sử dụng (reuse) API POS Checkout hiện tại cho Online Checkout mà không thiết kế lại:
- **Nguy cơ bảo mật:** Endpoint POS hiện đang yêu cầu quyền `Staff` hoặc `Admin`. Nếu mở ra cho khách hàng sẽ gây lỗ hổng Authorization nghiêm trọng.
- **Thiếu hụt dữ liệu:** API POS hiện không có các trường dữ liệu cần thiết như địa chỉ giao hàng, phí vận chuyển, hoặc ID giao dịch của cổng thanh toán online.
- **Khóa luồng (Deadlock):** Quy trình POS là đồng bộ (Synchronous) — Staff bấm hoàn tất là đơn hàng thành công ngay lập tức. Quy trình Online là bất đồng bộ (Asynchronous) — Cần chờ Webhook từ Cổng thanh toán trả về. Việc áp dụng sai luồng có thể làm đơn hàng bị treo (Pending) vĩnh viễn trên hệ thống.

## 5. Quyết định Kiến trúc Tương lai (Future Architecture Decision)
- **Tách biệt Endpoints:** Phải có hai hệ thống API riêng biệt cho POS Checkout và Online Checkout. Các API này có thể gọi chung các Core Services (như `InventoryService` để trừ tồn kho), nhưng Controller và Data Transfer Objects (DTO) phải độc lập.
- **Xử lý đơn thuốc (Prescription Handling):** POS Checkout có Staff kiểm tra trực tiếp đơn thuốc giấy. Online Checkout cần quy trình upload ảnh đơn thuốc và đợi Dược sĩ phê duyệt (Manual Approval) trước khi đơn hàng chuyển sang trạng thái "Sẵn sàng thanh toán".

## 6. Traceability
- **Logical Task:** PAC-TASK-561
- **Story:** US-162
- **Epic:** PAC-EPIC-32
- **Component:** Online Commerce
- **Branch:** `docs/PAC-771-task-561-document-online-checkout-separation-from-pos-checko`

## 7. Guardrail (Cấm Implementation)
> **NGHIÊM CẤM TRIỂN KHAI:** Tài liệu này hoàn toàn thuộc về phạm vi Mở rộng Thương mại Tương lai. Tuyệt đối không được thêm các trường thông tin giao hàng (Shipping address, shipping fee) hoặc trạng thái thanh toán qua cổng điện tử vào bảng `Order` trong Sprint MVP hiện tại. Không sửa đổi endpoint POS Checkout để phục vụ mục đích Online.
