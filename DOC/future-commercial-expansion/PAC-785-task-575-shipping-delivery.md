# Shipping and Delivery Future Scope

> **Status:** FUTURE / PROPOSED / NOT IMPLEMENTED
> **Logical Task:** PAC-TASK-575
> **Jira Key:** PAC-785
> **Story:** US-169
> **Epic:** PAC-EPIC-38
> **Component:** Shipping & Delivery
> **Implementation authorization:** No

## 1. Mục đích và Phạm vi (Objective & Scope)
Tài liệu này định nghĩa hệ thống Vận chuyển (Shipping) và Giao hàng (Delivery) cho giai đoạn Thương mại hóa. Tính năng này được thiết kế chủ yếu để hỗ trợ luồng bán hàng Online (e-Commerce) và Bán buôn (B2B/Wholesale), nơi hàng hóa không được trao tay trực tiếp tại quầy.

## 2. Giới hạn MVP (MVP Boundary)
- **Trong phiên bản MVP hiện tại**, luồng bán hàng là 100% **Over-the-counter (OTC - Bán tại quầy)** qua màn hình Point of Sale (POS).
- Giả định cốt lõi: Khách hàng bước vào nhà thuốc, thanh toán, nhận thuốc và rời đi ngay lập tức.
- KHÔNG CÓ trường dữ liệu `shipping_address`, `shipping_fee`, hay `delivery_status` trong bảng `SalesOrder`.
- KHÔNG CÓ tính năng theo dõi lộ trình giao hàng hay tích hợp đơn vị vận chuyển (3PL).

## 3. Các yêu cầu trong tương lai (Future Requirements)
Khi hệ thống mở rộng hỗ trợ Online Commerce (PAC-EPIC-32), tính năng Delivery phải xử lý các nghiệp vụ sau:
- **Shipping Address Management:** Lưu trữ nhiều địa chỉ nhận hàng cho một Customer (Sổ địa chỉ).
- **Shipping Fee Calculation:** Tính phí vận chuyển dựa trên khoảng cách (API Google Maps) hoặc theo biểu phí của đơn vị vận chuyển (AhaMove, Grab, Viettel Post). Phí này cộng thẳng vào `total_amount`.
- **Delivery Partner Integration (3PL):** Gửi yêu cầu lấy hàng (Booking request) đến các bên thứ 3 và nhận lại Tracking Code.
- **Cash on Delivery (COD):** Hỗ trợ phương thức thanh toán nhận hàng trả tiền, đòi hỏi phải có trạng thái kiểm soát công nợ đối với Shipper/3PL.

## 4. Dependencies (Các hệ thống phụ thuộc)
- **Online Commerce (PAC-EPIC-32):** Điều kiện tiên quyết.
- **Customer Management (PAC-EPIC-31):** Yêu cầu bảng Customer có thông tin liên lạc và địa chỉ đầy đủ (Không áp dụng cho Walk-in Guest).
- **Stock Allocation:** Khi có đơn giao hàng, hệ thống phải trừ tồn ảo (Reserved/Allocated) ngay khi khách đặt hàng thành công để tránh bán trùng tại quầy POS.

## 5. Quyết định chưa chốt (Open Decisions)
- Quyết định: Nhà thuốc tự xây dựng đội ngũ Shipper nội bộ (In-house delivery) hay thuê ngoài 100% qua API của các hãng 3PL?
  - *Decision Owner:* Operations Manager / Project Owner.

## 6. Traceability
- **Logical Task:** PAC-TASK-575
- **Story:** US-169
- **Epic:** PAC-EPIC-38
- **Component:** Shipping & Delivery
- **Branch:** `docs/PAC-785-task-575-document-shipping-and-delivery-future-scope`

## 7. Guardrail (Cấm Implementation)
> **NGHIÊM CẤM TRIỂN KHAI:** Tài liệu này hoàn toàn thuộc về phạm vi Mở rộng Thương mại Tương lai. Cấm tích hợp Google Maps API, cấm thêm trường Address vào SalesOrder, và cấm thay đổi luồng thanh toán POS hiện tại thành luồng phải chọn phương thức giao hàng. MVP Checkout phải được hoàn thành chỉ trong 1-2 click.
