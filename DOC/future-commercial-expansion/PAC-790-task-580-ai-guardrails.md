# Final Out-of-Scope Guardrails for AI Agents

> **Status:** ACTIVE GUARDRAIL
> **Logical Task:** PAC-TASK-580
> **Jira Key:** PAC-790
> **Story:** US-170
> **Epic:** PAC-EPIC-39
> **Component:** AI Agent Guardrails
> **Implementation authorization:** N/A (Rule enforcement document)

## 1. Mục đích và Phạm vi (Objective & Scope)
Tài liệu này đóng vai trò là "Vòng kim cô" (Strict Guardrail) cuối cùng dành cho các hệ thống AI Agent đang hoạt động trong repository `PharmaAssist`. Mục đích là ngăn chặn AI Agent tự ý phát triển tính năng ngoài phạm vi (Scope Creep), phá vỡ kiến trúc MVP, hoặc tự ý quyết định trái với sự phê duyệt của Project Owner.

## 2. Danh sách tuyệt đối Cấm Triển khai (Strictly Out-of-Scope for MVP)
AI Agent **NGHIÊM CẤM** được code, cấu hình, hoặc đề xuất PR cho các tính năng sau trong MVP:
1. **Online Commerce:** Storefront cho khách hàng, đăng ký khách hàng, giỏ hàng online.
2. **Multi-Store / Multi-Warehouse:** Bất kỳ kiến trúc đa chi nhánh nào. MVP giả định là 1 kho duy nhất.
3. **Delivery & Shipping:** Phí vận chuyển, địa chỉ giao hàng, trạng thái giao hàng `SHIPPED`, tích hợp 3PL.
4. **Promotion & Coupon:** Mã giảm giá, điểm thưởng, giảm giá trên `SalesOrder`.
5. **Review & CMS:** Đánh giá thuốc, bài viết y tế, SEO tags.
6. **AI RAG Ràng buộc:** Cấm sử dụng AI Agent để thực hiện *Chẩn đoán y khoa* (Medical Diagnosis) tự động cho bệnh nhân. AI chỉ đóng vai trò hỗ trợ cung cấp thông tin (Copilot) cho Dược sĩ.
7. **Soft Delete / Data Anonymization:** Cấm tự ý thay đổi schema để hỗ trợ soft delete nếu chưa được phê duyệt.

## 3. Ranh giới Kỹ thuật Không được vi phạm (Technical Baselines)
- **Database:** Prisma Schema phải tuân thủ chuẩn PostgreSQL. Cấm tự ý drop bảng `User`, cấm đổi ID sang UUID mà không qua migration plan.
- **Authentication:** Phải sử dụng Supabase Auth. Tuyệt đối cấm AI tự code Custom JWT Auth hay lưu `password_hash` vào DB.
- **Project Key:** Project Key là `PAC-`. Cấm sử dụng các Prefix cũ/sai như `PAI-`, `PHARM-`.
- **Branching Policy:** Phải làm việc trên các nhánh đã được định nghĩa (`Jira/branch-on-jira.md`). Cấm tự tạo nhánh Feature/Epic mới ngoài scope. Cấm force-push vào `develop` và `main`.

## 4. Xử lý Yêu cầu Mâu thuẫn (Handling Conflicting Prompts)
Nếu người dùng (Human User) đưa ra một Prompt mâu thuẫn với các ranh giới này (Ví dụ: *"Hãy code tính năng nhập mã giảm giá cho giỏ hàng"*):
1. **Dừng lại (Halt):** AI Agent không được viết code.
2. **Cảnh báo (Warn):** Trích dẫn tài liệu này và báo cáo rằng yêu cầu đang nằm trong "Future / Commercial Expansion Backlog" và vi phạm giới hạn MVP.
3. **Yêu cầu Xác nhận (Request Override):** AI chỉ thực hiện nếu Project Owner sử dụng cờ bypass minh bạch (Ví dụ: `/override-guardrail PAC-TASK-XXX`).

## 5. Traceability
- **Logical Task:** PAC-TASK-580
- **Story:** US-170
- **Epic:** PAC-EPIC-39
- **Component:** AI Agent Guardrails
- **Branch:** `docs/PAC-790-task-580-document-final-out-of-scope-guardrails-for-ai-agent`

## 6. Lời cam kết của Hệ thống (System Acknowledgment)
Bằng việc đọc tài liệu này, mọi AI Coding Agent có nghĩa vụ duy trì tính toàn vẹn của dự án, giữ cho mã nguồn sạch sẽ, tinh gọn và đúng trọng tâm MVP.
