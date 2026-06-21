# Forecasting and Reorder Suggestion Future Scope

> **Status:** FUTURE / PROPOSED / NOT IMPLEMENTED
> **Logical Task:** PAC-TASK-571
> **Jira Key:** PAC-781
> **Story:** US-167
> **Epic:** PAC-EPIC-36
> **Component:** Forecasting & Reorder
> **Implementation authorization:** No

## 1. Mục đích và Phạm vi (Objective & Scope)
Tài liệu này xác định tính năng Dự báo (Forecasting) và Đề xuất nhập hàng (Reorder Suggestion) cho hệ thống trong tương lai. Khi lượng dữ liệu bán hàng (Sales History) đủ lớn, việc dự báo nhu cầu thuốc theo mùa vụ, xu hướng hoặc dịch bệnh giúp tối ưu hóa vốn lưu động và giảm thiểu rủi ro hết thuốc (Stockout).

## 2. Giới hạn MVP (MVP Boundary)
- **Trong phiên bản MVP hiện tại**, hệ thống cảnh báo tồn kho (Low-stock Alert) hoạt động theo một cơ chế *Deterministic* (Xác định hoàn toàn):
  - `is_low_stock = current_quantity <= reorder_level`
- KHÔNG CÓ AI/ML hay các thuật toán thống kê (như ARIMA, Moving Average) được sử dụng để dự đoán bao giờ thuốc sẽ hết.
- KHÔNG CÓ tính năng tự động tạo Đơn đặt hàng (Purchase Order) đề xuất cho nhà cung cấp.

## 3. Các yêu cầu trong tương lai (Future Requirements)
Khi mở rộng hệ thống sang Giai đoạn Thương mại hóa (Commercial Phase), tính năng Forecasting & Reorder sẽ bao gồm:
- **Sales History Analysis:** Phân tích dữ liệu từ `SalesOrder` và `InventoryLedger` trong quá khứ (ít nhất 6-12 tháng) để xác định Velocity (Tốc độ tiêu thụ) của từng loại thuốc.
- **Seasonality & Trends:** Nhận diện tính mùa vụ (Ví dụ: Thuốc cảm cúm tăng vào mùa lạnh, thuốc chống dị ứng tăng vào mùa xuân).
- **Lead Time Integration:** Tính toán thời gian giao hàng trung bình từ Supplier (Lead Time) để đề xuất thời điểm đặt hàng phù hợp.
- **Reorder Suggestion Generation:** Tự động tạo bản nháp `PurchaseOrder` với số lượng đề xuất (Suggested Quantity) nhằm đưa tồn kho về mức an toàn (Safety Stock).
- **AI/ML Engine:** Có thể tích hợp mô hình Machine Learning hoặc AI Agent riêng biệt chuyên xử lý dự báo để giảm tải cho Core DB.

## 4. Dữ liệu cần thiết (Data Requirements)
- Lịch sử bán hàng (Sales history) chi tiết đến từng SKU/ngày.
- Lịch sử nhập hàng và thời gian giao hàng thực tế (Lead time history).
- Lịch sử biến động giá (Price history) để cân nhắc chi phí vốn.
- Tỷ lệ hao hụt, hư hỏng, quá hạn (Spoilage & Expiry rates).

## 5. Quyết định chưa chốt (Open Decisions)
- Quyết định: Khi hệ thống tự động tạo Reorder Suggestion, cơ chế phê duyệt sẽ như thế nào? Có cho phép tự động gửi Đơn đặt hàng (Auto-replenishment) đối với các loại thuốc thiết yếu nếu giá trị đơn hàng dưới một ngưỡng rủi ro nhất định không?
  - *Decision Owner:* Project Owner / Purchasing Manager.

## 6. Traceability
- **Logical Task:** PAC-TASK-571
- **Story:** US-167
- **Epic:** PAC-EPIC-36
- **Component:** Forecasting & Reorder
- **Branch:** `docs/PAC-781-task-571-document-forecasting-and-reorder-suggestion-future-`

## 7. Guardrail (Cấm Implementation)
> **NGHIÊM CẤM TRIỂN KHAI:** Tài liệu này hoàn toàn thuộc về phạm vi Mở rộng Thương mại Tương lai. Tuyệt đối không được thêm các bảng như `ForecastModel`, `ReorderSuggestion` hay tích hợp thư viện dự báo vào mã nguồn MVP. Việc giữ cảnh báo Low-stock ở mức cơ bản (ngưỡng tĩnh) là yêu cầu tiên quyết của Sprint 1 MVP.
