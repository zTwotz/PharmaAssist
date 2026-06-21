# Forecast Data Requirements and Limitations

> **Status:** FUTURE / PROPOSED / NOT IMPLEMENTED
> **Logical Task:** PAC-TASK-572
> **Jira Key:** PAC-782
> **Story:** US-167
> **Epic:** PAC-EPIC-36
> **Component:** Forecasting & Reorder
> **Implementation authorization:** No

## 1. Mục đích và Phạm vi (Objective & Scope)
Tài liệu này làm rõ các yêu cầu khắt khe về chất lượng dữ liệu để chức năng Dự báo (Forecasting) có thể hoạt động hiệu quả trong tương lai, đồng thời vạch rõ các hạn chế (Limitations) nội tại của các mô hình dự báo nhằm tránh kỳ vọng sai lệch (Over-promising).

## 2. Yêu cầu về Dữ liệu (Data Requirements)
Để một mô hình dự báo sinh ra kết quả có ý nghĩa thống kê, hệ thống phải đáp ứng:
- **Độ dài lịch sử (Historical Depth):** Hệ thống cần ít nhất 6 tháng dữ liệu bán hàng thực tế liên tục để dự báo ngắn hạn, và 24 tháng để nhận diện tính mùa vụ (Seasonality) lặp lại hàng năm.
- **Tính toàn vẹn (Data Integrity):** Dữ liệu phải phản ánh đúng nhu cầu thực. Các đơn hàng bị hủy, trả lại, hoặc đơn hàng bán buôn bất thường (Outliers) phải được loại bỏ hoặc gắn cờ (Flagged) trước khi đưa vào mô hình.
- **Dữ liệu Demo / Test:** Trong giai đoạn mới triển khai, hệ thống chứa nhiều dữ liệu tạo thủ công để test/demo. Các dữ liệu này KHÔNG ĐƯỢC dùng để huấn luyện mô hình dự báo do không có quy luật thực tế.

## 3. Các hạn chế nội tại (Intrinsic Limitations)
- **Độ chính xác không tuyệt đối:** Không có mô hình nào dự báo đúng 100%. Forecast chỉ là một con số kỳ vọng (Expected value) với một khoảng tin cậy (Confidence interval).
- **Thiếu dữ liệu ngoại sinh (Exogenous factors):** Mô hình dựa trên lịch sử không thể đoán được các sự kiện đột biến như: Dịch bệnh bùng phát bất ngờ, thay đổi luật pháp, đứt gãy chuỗi cung ứng toàn cầu, hay chiến dịch Marketing không có trong lịch sử.
- **Sản phẩm mới (Cold Start Problem):** Các loại thuốc mới nhập về, chưa từng bán bao giờ sẽ không có dữ liệu để dự báo. Cần áp dụng quy tắc Heuristic hoặc mapping với sản phẩm tương tự thay vì dùng mô hình thống kê.

## 4. Ranh giới MVP (MVP Boundaries)
- **Không dùng Forecast cho luồng cốt lõi:** Trong phiên bản MVP, các quyết định nhập hàng, cảnh báo hết thuốc hoàn toàn KHÔNG phụ thuộc vào bất kỳ kết quả phân tích dữ liệu phức tạp nào.
- Mọi cảnh báo dựa trên ngưỡng an toàn do người dùng thiết lập thủ công (Manual thresholds).

## 5. Quyết định chưa chốt (Open Decisions)
- Quyết định: Khi triển khai Forecasting, chúng ta sẽ bắt đầu bằng phương pháp thống kê truyền thống (ví dụ Exponential Smoothing, ARIMA) hay sử dụng luôn Machine Learning (ví dụ XGBoost, Prophet)?
  - *Decision Owner:* Data Scientist / Technical Lead trong tương lai.

## 6. Traceability
- **Logical Task:** PAC-TASK-572
- **Story:** US-167
- **Epic:** PAC-EPIC-36
- **Component:** Forecasting & Reorder
- **Branch:** `docs/PAC-782-task-572-document-forecast-data-requirements-and-limitations`

## 7. Guardrail (Cấm Implementation)
> **NGHIÊM CẤM TRIỂN KHAI:** Tài liệu này hoàn toàn thuộc về phạm vi Mở rộng Thương mại Tương lai. Cấm tích hợp logic làm sạch dữ liệu (Data cleansing) phức tạp hoặc chuẩn bị pipeline cho Machine Learning vào DB hoặc Backend của MVP. Hệ thống MVP phải giữ nguyên cấu trúc CRUD đơn giản nhất cho SalesOrder và InventoryLedger.
