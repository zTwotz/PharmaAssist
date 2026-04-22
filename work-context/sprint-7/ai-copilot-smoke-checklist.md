# AI Copilot Integration Smoke Checklist

Tài liệu này cung cấp checklist để tester và team có thể kiểm tra nhanh (smoke test) các tính năng tích hợp AI Copilot trên hệ thống PharmaAssist.
Checklist này bao phủ các tính năng UI, Backend, Fallback, Guardrail và Audit.

## 1. UI & Permissions (PAC-TASK-312)
- [ ] Đăng nhập với tài khoản Admin/Staff (có quyền `USE_AI_COPILOT`). Nút "Hỏi AI" hiển thị trên cửa sổ InteractionAlert.
- [ ] Đăng nhập với tài khoản Warehouse (không có quyền `USE_AI_COPILOT`). Nút "Hỏi AI" và các AI actions không hiển thị.
- [ ] Khi click "Hỏi AI", UI chuyển sang trạng thái Loading (hiển thị spinner "Đang phân tích...").
- [ ] Kết quả AI hiển thị đúng với các định dạng markdown đơn giản, kèm theo disclaimer phía dưới cùng.
- [ ] Nếu API trả về lỗi (hoặc timeout), UI hiển thị khối báo lỗi màu đỏ kèm theo nút "Thử lại".

## 2. AI Explanation API (PAC-TASK-298, PAC-TASK-340)
- [ ] Chọn một cảnh báo tương tác thuốc (ví dụ: Paracetamol + Ibuprofen). Gọi API AI explanation.
- [ ] API trả về HTTP 201/200, nội dung `explanation` và `disclaimer` hợp lệ.
- [ ] Xác minh `promptVersion` đang active được sử dụng trong hệ thống.
- [ ] Gọi trực tiếp API `/ai/interaction-explanation` bằng token của Warehouse -> API trả về lỗi 403 Forbidden.

## 3. Fallback Mechanism (PAC-TASK-314, PAC-TASK-317)
- [ ] Tạm thời tắt mạng hoặc config Google Gemini API key sai.
- [ ] Mở InteractionAlert và chọn "Hỏi AI".
- [ ] Hệ thống tự động fallback sang MockAI sau khi vượt quá thời gian timeout (hoặc fail trực tiếp).
- [ ] MockAI trả về kết quả giả lập nhưng theo format chuẩn (ví dụ: "Phân tích giả lập...").
- [ ] Ứng dụng không bị crash.

## 4. AI Audit Log (PAC-TASK-318, PAC-TASK-341)
- [ ] Truy cập trang AI Audit Log trên màn hình Dashboard (`/dashboard/ai-audit-logs`).
- [ ] Kiểm tra lịch sử request AI vừa thực hiện có được ghi nhận không.
- [ ] Dòng audit chứa đủ thông tin: User thực hiện, Request Content, Response Content, Execution Time.
- [ ] Cột Provider hiển thị đúng (Gemini hoặc MockAI).
- [ ] Cột Status hiển thị `SUCCESS` (hoặc `FAILED` nếu API lỗi).
- [ ] Trường `promptVersion` được ghi lại cho biết template nào đã được gọi.

## 5. Guardrail & Safety (PAC-TASK-316)
- [ ] (Mock test) Gửi một request vượt quá phạm vi Dược sĩ (ví dụ: Chẩn đoán bệnh) vào hệ thống (nếu có API tự do).
- [ ] Hệ thống AI (hoặc prompt template) phản hồi từ chối trả lời hoặc đưa ra cảnh báo khuyên người bệnh gặp Bác sĩ.
- [ ] Disclaimer "Đây chỉ là thông tin hỗ trợ dược sĩ, không thay thế chẩn đoán y tế" luôn được đính kèm.

## 6. AI Draft Note & Confirm (Future Scope / In Progress)
- [ ] AI tạo bản nháp cho Consultation Note (nếu feature bật).
- [ ] Staff phải click "Xác nhận" mới có thể lưu nội dung Note do AI sinh ra.
- [ ] Bản Note lưu lại có tag `[AI_GENERATED]`.

---
*Ghi chú: Checklist này được chạy sau mỗi lần deploy hoặc cập nhật prompt template để đảm bảo không gãy đổ các tính năng AI cốt lõi.*
