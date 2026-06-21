# Discount Not Included in MVP Checkout

> **Status:** FUTURE / PROPOSED / NOT IMPLEMENTED
> **Logical Task:** PAC-TASK-574
> **Jira Key:** PAC-784
> **Story:** US-168
> **Epic:** PAC-EPIC-37
> **Component:** Promotion & Coupon
> **Implementation authorization:** No

## 1. Mục đích và Phạm vi (Objective & Scope)
Tài liệu này xác nhận một cách dứt khoát rằng mọi hình thức Giảm giá (Discount), Khuyến mãi (Promotion), và Mã giảm giá (Coupon) **KHÔNG TỒN TẠI** trong giai đoạn MVP. Mục tiêu là ngăn chặn triệt để tình trạng Scope Creep (Phình to phạm vi) ảnh hưởng đến luồng thanh toán và báo cáo tài chính cốt lõi.

## 2. Công thức tính toán MVP (MVP Checkout Formula)
Trong phiên bản MVP, công thức thanh toán được đơn giản hóa tối đa.
- Giả sử đơn hàng có $N$ mặt hàng (Items):
  - Giá trị mặt hàng $i$ ($V_i$): $V_i = \text{Quantity}_i \times \text{Unit Price}_i$
  - Tổng tiền cần thanh toán ($\text{Total Amount}$): $\text{Total Amount} = \sum_{i=1}^{N} V_i$
- **Không có bất kỳ biến số nào khác** xen vào công thức này (Không phí vận chuyển, không VAT phức tạp ở mức item, không chiết khấu thương mại).

## 3. Lý do loại trừ khỏi MVP (Reasons for Exclusion)
- **Độ phức tạp (Complexity):** Việc áp dụng Discount yêu cầu thiết kế lại cấu trúc bảng `SalesOrder` và `SalesOrderItem` để lưu trữ thêm `original_price`, `discount_amount`, `discount_reason`, và `final_price`.
- **Hạch toán kế toán (Accounting Impact):** Doanh thu thu về khác với giá niêm yết sẽ yêu cầu báo cáo tài chính (Revenue Report) phải phân tách rạch ròi giữa Doanh thu gộp (Gross Revenue) và Doanh thu thuần (Net Revenue). MVP hiện tại chỉ sử dụng Gross Revenue bằng Net Revenue.
- **Hoàn tiền (Refunds):** Nếu một hóa đơn có áp dụng Discount phân bổ đều trên toàn đơn hàng, khi khách hàng trả lại một sản phẩm (Refund/Return), logic tính lại tiền hoàn lại sẽ rất phức tạp.

## 4. Báo cáo (Reporting Requirements)
- Do không có Discount, tất cả các Dashboard, biểu đồ doanh thu trong MVP đều đếm trực tiếp từ tổng số tiền thu được.
- Khi triển khai Promotion trong tương lai (PAC-TASK-573), toàn bộ module Báo cáo Doanh thu bắt buộc phải được viết lại.

## 5. Ranh giới mở rộng tương lai (Future Expansion Boundary)
- Khi nâng cấp lên bản Thương mại, trường `discount_amount` sẽ được thêm trực tiếp vào `SalesOrder` hoặc quản lý qua một bảng `OrderAdjustment` trung gian (để linh hoạt hỗ trợ cả Discount và Shipping Fee).

## 6. Traceability
- **Logical Task:** PAC-TASK-574
- **Story:** US-168
- **Epic:** PAC-EPIC-37
- **Component:** Promotion & Coupon
- **Branch:** `docs/PAC-784-task-574-document-discount-not-included-in-mvp-checkout`

## 7. Guardrail (Cấm Implementation)
> **NGHIÊM CẤM TRIỂN KHAI:** Tài liệu này là một Guardrail cứng. Cấm bất kỳ AI Agent hoặc Developer nào cố gắng chèn logic `discount` hoặc tính toán chiết khấu vào Backend Controller, Prisma Schema, hoặc Giao diện POS của Sprint 1. Nếu phát hiện vi phạm, Pull Request đó sẽ lập tức bị Reject do vượt quá phạm vi MVP.
