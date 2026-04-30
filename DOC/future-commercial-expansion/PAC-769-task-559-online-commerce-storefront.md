# Online Commerce Storefront Future Scope

> **Status:** FUTURE / PROPOSED / NOT IMPLEMENTED
> **Logical Task:** PAC-TASK-559
> **Jira Key:** PAC-769
> **Story:** US-162
> **Epic:** PAC-EPIC-32
> **Component:** Online Commerce
> **Implementation authorization:** No

## 1. Mục đích và Phạm vi (Objective & Scope)
Tài liệu này xác định phạm vi mở rộng trong tương lai cho nền tảng Bán hàng Trực tuyến (Online Commerce Storefront). Online Storefront cho phép khách hàng cá nhân hoặc doanh nghiệp có thể truy cập, tra cứu thông tin sản phẩm và đặt hàng trực tiếp từ nhà thuốc thông qua website hoặc ứng dụng di động mà không cần đến cửa hàng vật lý (POS).

## 2. Giới hạn MVP (MVP Boundary)
- **Trong phiên bản MVP hiện tại**, hệ thống PharmaAssist chỉ đóng vai trò là một ứng dụng nội bộ (Internal Tool/POS) phục vụ cho nhân viên (Staff) và người quản lý (Manager). Không có giao diện hay cổng thông tin (portal) nào dành cho khách hàng.
- Tất cả các luồng bán hàng đều phải diễn ra trực tiếp tại quầy thông qua sự hỗ trợ của Staff.

## 3. Các yêu cầu trong tương lai (Future Requirements)
- **Giao diện mua sắm riêng biệt:** Storefront phải là một hệ thống (hoặc ứng dụng) độc lập với POS nội bộ, với UI/UX thân thiện và tối ưu hóa cho người tiêu dùng (B2C).
- **Trưng bày sản phẩm (Product Catalog):** Storefront cần hiển thị danh mục thuốc, thực phẩm chức năng, thiết bị y tế với hình ảnh, thông tin chi tiết, liều dùng, thành phần và đánh giá.
- **Tình trạng tồn kho:** Liên kết trực tiếp với Core Inventory để hiển thị tình trạng "Còn hàng", "Hết hàng" hoặc "Giao hàng từ kho trung tâm".
- **Chính sách hiển thị giá:** Storefront cần hỗ trợ các quy tắc hiển thị giá khác nhau (ví dụ: giá gốc, giá khuyến mãi cho thành viên loyalty).

## 4. Dependencies (Các hệ thống phụ thuộc)
Storefront online có sự phụ thuộc chặt chẽ vào các module mở rộng khác sẽ được triển khai cùng thời điểm:
- **Product Variant Catalog (PAC-EPIC-33):** Module sản phẩm hiện tại của MVP chưa hỗ trợ hình ảnh, mô tả chi tiết, hoặc các biến thể (variants), điều này là bắt buộc cho Storefront.
- **Online Checkout & Payment:** Hệ thống thanh toán trực tuyến qua thẻ tín dụng, ví điện tử (VNPAY, MoMo).
- **Shipping & Fulfillment:** Tích hợp với các đối tác vận chuyển (Ahamove, GHN) để tính toán phí ship và theo dõi trạng thái giao hàng.
- **Customer Authentication:** Hệ thống xác thực khách hàng (khác với xác thực Staff/Admin hiện có bằng Supabase Auth).

## 5. Quyền riêng tư và Bảo mật (Privacy & Security Considerations)
- **Phân tách dữ liệu:** Hệ thống Storefront phải được thiết kế sao cho rủi ro tấn công vào frontend của khách hàng (ví dụ: XSS, SQL Injection) không thể làm ảnh hưởng đến dữ liệu POS nội bộ (cần tuân thủ kiến trúc Microservices hoặc API Gateway bảo mật).
- **Quy định bán thuốc:** Một số loại thuốc kê đơn (Rx) không được phép bán trực tuyến nếu không có cơ sở xác minh đơn thuốc hợp lệ từ bác sĩ (Telemedicine integration).

## 6. Quyết định chưa chốt (Open Decisions)
- Quyết định: Sẽ xây dựng hệ thống Storefront từ đầu bằng Next.js (Custom E-commerce) hay tích hợp với các nền tảng có sẵn như Shopify/WooCommerce (Headless E-commerce)?
  - *Decision Owner:* Project Owner / Architect.
- Quyết định: Phương án kiểm duyệt đơn thuốc (Prescription Verification) khi khách hàng đặt mua thuốc kê đơn trực tuyến?
  - *Decision Owner:* Project Owner / Legal Advisor.

## 7. Traceability
- **Logical Task:** PAC-TASK-559
- **Story:** US-162
- **Epic:** PAC-EPIC-32
- **Component:** Online Commerce
- **Branch:** `docs/PAC-769-task-559-document-online-commerce-storefront-future-scope`

## 8. Guardrail (Cấm Implementation)
> **NGHIÊM CẤM TRIỂN KHAI:** Tài liệu này hoàn toàn thuộc về phạm vi Mở rộng Thương mại Tương lai. Tuyệt đối không được xây dựng giao diện khách hàng (Customer UI), không thêm API routes cho Storefront, và không cập nhật Schema cho mục đích hiển thị trực tuyến trong Sprint hiện tại. Giữ POS scope ổn định.
