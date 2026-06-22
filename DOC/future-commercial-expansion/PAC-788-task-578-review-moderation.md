# Product Review Moderation Future Scope

> **Status:** FUTURE / PROPOSED / NOT IMPLEMENTED
> **Logical Task:** PAC-TASK-578
> **Jira Key:** PAC-788
> **Story:** US-170
> **Epic:** PAC-EPIC-39
> **Component:** Review & CMS
> **Implementation authorization:** No

## 1. Mục đích và Phạm vi (Objective & Scope)
Tài liệu này bổ sung cho tính năng Đánh giá sản phẩm (Product Review) trong tương lai. Để duy trì chất lượng nền tảng và tuân thủ các quy định về kinh doanh Dược phẩm, hệ thống bắt buộc phải có một cơ chế Kiểm duyệt (Moderation) mạnh mẽ nhằm xử lý các rủi ro về Spam, Lạm dụng (Abuse), và Thông tin y tế sai lệch.

## 2. Giới hạn MVP (MVP Boundary)
- Do MVP hoàn toàn không có tính năng cho phép Khách hàng đăng tải nội dung (User-Generated Content - UGC), nên **hệ thống Moderation hoàn toàn không tồn tại** trong phiên bản hiện tại.
- MVP chỉ xoay quanh nội dung do Admin, Dược sĩ và Nhân viên (Staff) tạo ra, có độ tin cậy tuyệt đối.

## 3. Các yêu cầu Kiểm duyệt trong tương lai (Future Moderation Requirements)
Khi triển khai Product Review (PAC-TASK-577), hệ thống phải đồng thời xây dựng Module Moderation với các quy tắc sau:
- **Pre-moderation vs Post-moderation:**
  - *Pre-moderation (Kiểm duyệt trước):* Mọi đánh giá phải được duyệt bởi Nhân viên trước khi hiển thị (An toàn nhất nhưng tốn nguồn lực).
  - *Post-moderation (Kiểm duyệt sau):* Đánh giá hiển thị ngay, nhưng hệ thống sẽ tự động quét từ khóa nhạy cảm, đồng thời cho phép người dùng khác Report (Báo cáo vi phạm).
- **Spam & Abuse Prevention:**
  - Chặn bot review bằng reCAPTCHA / Cloudflare Turnstile.
  - Áp dụng Rate limiting: Một khách hàng chỉ được đánh giá 1 lần cho 1 sản phẩm đã mua thành công.
- **Reporting System:** Khách hàng hoặc đối thủ có thể nhấn "Báo cáo" một review chứa từ ngữ thô tục, quảng cáo, hoặc sai lệch y khoa.
- **Roles & Permissions:** Cần bổ sung Role `CONTENT_MODERATOR` vào hệ thống RBAC để phân quyền riêng cho nhân viên chuyên xử lý đánh giá và báo cáo.

## 4. Rủi ro về Thông tin Y tế (Medical Misinformation Risk)
- Khác với e-Commerce thông thường, việc khách hàng để lại đánh giá về *Tác dụng chữa bệnh* của một loại thuốc (Ví dụ: "Tôi uống cái này hết hẳn ung thư") có thể vi phạm pháp luật về quảng cáo y tế.
- Moderation Policy phải nghiêm cấm khách hàng khẳng định công dụng điều trị vượt quá chỉ định của nhà sản xuất.

## 5. Traceability
- **Logical Task:** PAC-TASK-578
- **Story:** US-170
- **Epic:** PAC-EPIC-39
- **Component:** Review & CMS
- **Branch:** `docs/PAC-788-task-578-document-product-review-moderation-future-considera`

## 6. Guardrail (Cấm Implementation)
> **NGHIÊM CẤM TRIỂN KHAI:** Tài liệu này hoàn toàn thuộc về phạm vi Mở rộng Thương mại Tương lai. Tuyệt đối không được thêm Role `CONTENT_MODERATOR` hay bảng `ReviewReport` vào hệ thống RBAC/Prisma hiện tại. Hệ thống MVP phải được giữ nguyên trạng với thiết kế dành riêng cho Nội bộ Nhà thuốc.
