# Unsafe AI Request Categories

Nhằm đảm bảo an toàn cho bệnh nhân và tuân thủ các quy định về y tế, AI Copilot trong hệ thống PharmaAssist (hoặc bất kỳ AI nào hỗ trợ Dược sĩ) phải được lập trình (qua prompt hoặc guardrails) để từ chối hoặc đưa ra cảnh báo đối với các nhóm request không an toàn.

Dưới đây là danh sách các nhóm Unsafe AI Request Categories:

## 1. Diagnosis Request (Yêu cầu chẩn đoán bệnh)
- **Mô tả:** Người dùng (Dược sĩ hoặc Bệnh nhân) mô tả triệu chứng và yêu cầu AI đưa ra chẩn đoán chính xác về căn bệnh.
- **Ví dụ:** "Bệnh nhân bị ho khan, sốt nhẹ về chiều và đau tức ngực. Đây là bệnh gì?"
- **Hành động của AI:** Từ chối đưa ra kết luận chẩn đoán. Khuyên người bệnh nên đến gặp Bác sĩ để được thăm khám lâm sàng. 
- **Giải thích:** Dược sĩ và AI không có chức năng và thẩm quyền chẩn đoán y khoa.

## 2. Prescribing Request (Yêu cầu kê đơn thuốc)
- **Mô tả:** Người dùng yêu cầu AI tạo một đơn thuốc mới hoặc chỉ định các loại thuốc kê đơn (Rx) cho một tình trạng bệnh cụ thể.
- **Ví dụ:** "Bệnh nhân bị viêm phổi mãn tính, tôi nên kê loại kháng sinh nào mạnh nhất?"
- **Hành động của AI:** Từ chối kê đơn. Có thể cung cấp thông tin về các phác đồ điều trị *chung* theo hướng dẫn y tế hiện hành, nhưng luôn nhấn mạnh rằng quyết định kê đơn thuộc về Bác sĩ điều trị.

## 3. Dosage Advice Request (Yêu cầu tư vấn liều lượng vượt mức)
- **Mô tả:** Người dùng hỏi về liều dùng không theo tiêu chuẩn hoặc liều lượng đặc biệt cho các đối tượng nguy cơ cao (trẻ sơ sinh, phụ nữ có thai, người suy gan/thận) mà không có chỉ định bác sĩ.
- **Ví dụ:** "Bệnh nhân suy thận độ 3 có thể dùng liều Paracetamol 1000mg/lần không?"
- **Hành động của AI:** Đưa ra cảnh báo nguy hiểm. Chỉ cung cấp thông tin về liều lượng chuẩn từ nhãn thuốc hoặc Dược thư quốc gia, và đề nghị tham khảo ý kiến Bác sĩ chuyên khoa.

## 4. Excessive PII Request (Yêu cầu chứa quá mức thông tin cá nhân - PII/PHI)
- **Mô tả:** Request gửi lên hệ thống AI chứa quá nhiều thông tin định danh cá nhân nhạy cảm của bệnh nhân (Tên đầy đủ, số CMND/CCCD, địa chỉ nhà, lịch sử bệnh án chi tiết không cần thiết).
- **Ví dụ:** "Bệnh nhân Nguyễn Văn A, số CMND 0123456789, ở tại 123 Lê Lợi, bị HIV, đang dùng ARV. Thuốc này có tương tác không?"
- **Hành động của AI / Hệ thống:** Backend cần có cơ chế *Data Masking/Sanitization* trước khi gửi prompt cho AI provider (Google Gemini). Nếu lọt vào AI, AI không nên lặp lại hoặc lưu trữ các thông tin này trong câu trả lời.

## 5. Out-of-scope Pharmacy Support (Yêu cầu ngoài phạm vi hỗ trợ Dược khoa)
- **Mô tả:** Người dùng hỏi AI các vấn đề không liên quan đến thuốc, tương tác thuốc, hoặc hỗ trợ bán hàng tại nhà thuốc (ví dụ: tư vấn pháp lý, tài chính, dự đoán tương lai, tạo mã độc).
- **Ví dụ:** "Cách lách luật để bán thuốc kê đơn không cần toa?" hoặc "Viết cho tôi một kịch bản hack website y tế."
- **Hành động của AI:** Từ chối trả lời hoàn toàn. Thông báo rằng tính năng này nằm ngoài phạm vi hoạt động của AI Copilot nhà thuốc.

---
**Disclaimer chung của AI:** "Đây chỉ là thông tin hỗ trợ dựa trên dữ liệu dược lý hiện có. Vui lòng luôn tham khảo ý kiến Bác sĩ và thông tin kê toa chính thức trước khi ra quyết định lâm sàng."
