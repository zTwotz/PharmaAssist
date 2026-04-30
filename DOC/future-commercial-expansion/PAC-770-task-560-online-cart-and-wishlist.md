# Online Cart and Wishlist Future Scope

> **Status:** FUTURE / PROPOSED / NOT IMPLEMENTED
> **Logical Task:** PAC-TASK-560
> **Jira Key:** PAC-770
> **Story:** US-162
> **Epic:** PAC-EPIC-32
> **Component:** Online Commerce
> **Implementation authorization:** No

## 1. Mục đích và Phạm vi (Objective & Scope)
Tài liệu này xác định phạm vi mở rộng trong tương lai cho tính năng Giỏ hàng trực tuyến (Online Cart) và Danh sách yêu thích (Wishlist) dành riêng cho Online Commerce Storefront (B2C). Tính năng này cho phép khách hàng chọn lưu trữ sản phẩm để mua ngay lập tức hoặc mua trong tương lai, duy trì trạng thái phiên mua sắm qua các thiết bị khác nhau.

## 2. Giới hạn MVP (MVP Boundary)
- **Trong phiên bản MVP hiện tại**, luồng bán hàng diễn ra tại quầy (POS). Nhân viên Staff sẽ trực tiếp chọn sản phẩm và đưa vào "Cart" tạm thời trên màn hình thu ngân, sau đó thanh toán ngay lập tức để tạo hóa đơn.
- Không có khái niệm Giỏ hàng lưu trữ lâu dài (Persistent Cart) qua nhiều phiên làm việc, không có tính năng Wishlist, và không có tính năng đồng bộ hóa Giỏ hàng cho khách hàng.

## 3. Các yêu cầu trong tương lai (Future Requirements)
- **Online Shopping Cart (Giỏ hàng trực tuyến):**
  - Giỏ hàng phải được đồng bộ theo tài khoản khách hàng (Customer Account) trên mọi thiết bị.
  - Hỗ trợ "Guest Cart" (giỏ hàng cho khách vãng lai) bằng cookies hoặc localStorage, sau đó hợp nhất (merge) vào "User Cart" khi khách hàng đăng nhập.
  - Phải tự động kiểm tra lượng tồn kho (Inventory) khi truy cập lại giỏ hàng và cảnh báo nếu sản phẩm đã hết hàng.
- **Wishlist (Danh sách yêu thích):**
  - Khách hàng có thể lưu các sản phẩm yêu thích nhưng chưa muốn mua ngay.
  - Thông báo (Notification) khi sản phẩm trong Wishlist có chương trình khuyến mãi hoặc được bổ sung lại hàng (Back in stock).

## 4. Dependencies (Các hệ thống phụ thuộc)
- **Customer Authentication (PAC-EPIC-31):** Yêu cầu khách hàng phải có tài khoản để lưu trữ Wishlist và Persistent Cart.
- **Online Commerce Storefront (PAC-EPIC-32):** Cart và Wishlist phải được tích hợp vào giao diện mua sắm của Storefront.
- **Product Variant Catalog (PAC-EPIC-33):** Giỏ hàng phải hỗ trợ lưu các thuộc tính biến thể (VD: Hộp 30 viên vs Lọ 100 viên).

## 5. Đề xuất Kiến trúc Dữ liệu (Future Data Tables)
Mặc dù không được implement trong MVP, dưới đây là đề xuất các bảng dữ liệu có thể cần thiết trong tương lai:
- `OnlineCart`: Lưu trữ session giỏ hàng liên kết với `CustomerID` hoặc `SessionID`.
- `OnlineCartItem`: Lưu chi tiết các sản phẩm trong giỏ hàng (ProductID, Quantity, AddedAt).
- `Wishlist`: Lưu trữ danh sách yêu thích của khách hàng.
- `WishlistItem`: Lưu chi tiết các sản phẩm yêu thích.

## 6. Quyền riêng tư và Khuyến mãi (Privacy & Promotions)
- Dữ liệu Giỏ hàng và Wishlist là cơ sở để thực hiện các chiến dịch Remarketing (ví dụ: Gửi email nhắc nhở "Bạn đã bỏ quên sản phẩm trong giỏ hàng"). Việc này cần sự đồng ý (Consent) của khách hàng theo quy định về quyền riêng tư.
- *Open Decision:* Chiến lược xử lý các mặt hàng thuốc kê đơn (Rx) trong giỏ hàng có yêu cầu quy trình xác minh đơn thuốc phức tạp hơn so với hàng hóa thông thường.

## 7. Traceability
- **Logical Task:** PAC-TASK-560
- **Story:** US-162
- **Epic:** PAC-EPIC-32
- **Component:** Online Commerce
- **Branch:** `docs/PAC-770-task-560-document-online-cart-and-wishlist-future-scope`

## 8. Guardrail (Cấm Implementation)
> **NGHIÊM CẤM TRIỂN KHAI:** Tài liệu này hoàn toàn thuộc về phạm vi Mở rộng Thương mại Tương lai. Tuyệt đối không được tạo bảng `OnlineCart` hoặc `Wishlist` trong Prisma Schema, và không làm ảnh hưởng đến tính năng Checkout/Cart tại POS nội bộ của phiên bản MVP hiện tại.
