# Promotion and Coupon Future Scope

> **Status:** FUTURE / PROPOSED / NOT IMPLEMENTED
> **Logical Task:** PAC-TASK-573
> **Jira Key:** PAC-783
> **Story:** US-168
> **Epic:** PAC-EPIC-37
> **Component:** Promotion & Coupon
> **Implementation authorization:** No

## 1. Mục đích và Phạm vi (Objective & Scope)
Tài liệu này định nghĩa hệ thống Khuyến mãi (Promotion) và Mã giảm giá (Coupon) cho giai đoạn Thương mại hóa. Việc áp dụng các chiến dịch giảm giá, tặng quà, tích điểm là thiết yếu để thu hút và giữ chân khách hàng (Customer Retention) khi hệ thống kết nối với e-Commerce.

## 2. Giới hạn MVP (MVP Boundary)
- **Trong phiên bản MVP hiện tại**, logic tính tổng tiền (`total_amount`) trong `SalesOrder` và quy trình Checkout POS là **tuyến tính và cố định**:
  - `total_amount = sum(quantity * unit_price)`
- Hệ thống KHÔNG CÓ trường `discount`, `coupon_code` hay `promotion_id` trong bất kỳ bảng nào liên quan đến đơn hàng.
- KHÔNG cho phép nhân viên bán hàng tự ý sửa đổi giá bán lúc thanh toán (trừ khi có tính năng Price Override được thiết kế riêng).

## 3. Các yêu cầu trong tương lai (Future Requirements)
Khi triển khai Promotion/Coupon Engine, hệ thống phải xử lý được các kịch bản sau:
- **Coupon Codes:** Mã giảm giá dùng một hoặc nhiều lần (Ví dụ: `WELCOME10`, `TET2026`).
- **Cart-level Promotions:** Khuyến mãi dựa trên tổng giá trị giỏ hàng (Ví dụ: Mua trên 500k giảm 50k, miễn phí vận chuyển).
- **Item-level Promotions:** Khuyến mãi theo sản phẩm (Ví dụ: Mua 2 hộp thuốc A tặng 1 vỉ thuốc B, giảm 10% cho nhóm thực phẩm chức năng).
- **Rule Engine:** Cần một Rule Validation Engine độc lập để kiểm tra tính hợp lệ: Thời gian áp dụng, chi nhánh áp dụng, đối tượng khách hàng (VIP/Normal), và có được cộng dồn (Stackable) khuyến mãi hay không.
- **Reporting Impact:** Khuyến mãi phải được hạch toán riêng vào chi phí Marketing thay vì chỉ giảm doanh thu thuần (Net Revenue).

## 4. Dependencies (Các hệ thống phụ thuộc)
- **Online Commerce (PAC-EPIC-32):** Coupon chủ yếu phục vụ luồng khách hàng tự mua online.
- **Customer Management (PAC-EPIC-31):** Tích điểm, hạng thành viên (Loyalty Tiers) liên kết trực tiếp đến quyền lợi Promotion.

## 5. Quyết định chưa chốt (Open Decisions)
- Quyết định: Promotion Engine sẽ được tự build trong NestJS hay tích hợp một dịch vụ SaaS bên thứ 3 chuyên về Loyalty/Promotion (như Talon.one) để giảm thiểu độ phức tạp bảo trì?
  - *Decision Owner:* Chief Technology Officer (CTO) / Business Analyst.

## 6. Traceability
- **Logical Task:** PAC-TASK-573
- **Story:** US-168
- **Epic:** PAC-EPIC-37
- **Component:** Promotion & Coupon
- **Branch:** `docs/PAC-783-task-573-document-promotion-and-coupon-future-scope`

## 7. Guardrail (Cấm Implementation)
> **NGHIÊM CẤM TRIỂN KHAI:** Tài liệu này hoàn toàn thuộc về phạm vi Mở rộng Thương mại Tương lai. Tuyệt đối không được nhúng bất kỳ dòng code tính toán Discount nào vào API POS Checkout trong Sprint hiện tại. Điều này sẽ phá vỡ logic tính tiền đơn giản và làm sai lệch báo cáo tài chính MVP.
