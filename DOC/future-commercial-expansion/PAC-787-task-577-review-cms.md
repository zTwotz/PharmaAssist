# Review and CMS Future Scope

> **Status:** FUTURE / PROPOSED / NOT IMPLEMENTED
> **Logical Task:** PAC-TASK-577
> **Jira Key:** PAC-787
> **Story:** US-170
> **Epic:** PAC-EPIC-39
> **Component:** Review & CMS
> **Implementation authorization:** No

## 1. Mục đích và Phạm vi (Objective & Scope)
Tài liệu này xác định tính năng Đánh giá sản phẩm (Product Review) và Hệ thống quản trị nội dung (CMS) là các tính năng hướng khách hàng (Customer-facing), được thiết kế độc quyền cho giai đoạn mở rộng Thương mại điện tử (Online Commerce).

## 2. Giới hạn MVP (MVP Boundary)
- **Trong phiên bản MVP hiện tại**, PharmaAssist là một hệ thống **Quản lý Nội bộ Nhà thuốc (Internal Pharmacy Management)**.
- Người dùng cuối (End-user) của MVP là Dược sĩ, Nhân viên bán hàng, và Quản lý kho.
- Khách hàng (Customer) không có tài khoản đăng nhập và không tương tác trực tiếp với giao diện phần mềm.
- KHÔNG CÓ chức năng để lại bình luận, đánh giá sao (Star rating), hay đọc bài viết tin tức y tế.

## 3. Các yêu cầu trong tương lai (Future Requirements)
Khi xây dựng Online Storefront (PAC-EPIC-32), hệ thống cần triển khai các phân hệ sau:
- **Product Reviews & Ratings:**
  - Khách hàng có thể đánh giá sản phẩm từ 1 đến 5 sao và viết bình luận.
  - Cần hệ thống kiểm duyệt (Moderation) để lọc từ ngữ phản cảm hoặc đánh giá spam.
- **Content Management System (CMS):**
  - Quản lý các trang tĩnh (About Us, Terms of Service, Privacy Policy).
  - Quản lý Blog tin tức y tế, cẩm nang sức khỏe.
  - Quản lý Banner quảng cáo trên trang chủ, Popup khuyến mãi.
- **SEO & Metadata:**
  - Hỗ trợ tùy chỉnh Meta Title, Meta Description, URL Slug cho từng sản phẩm và bài viết để tối ưu hóa công cụ tìm kiếm.

## 4. Dependencies (Các hệ thống phụ thuộc)
- **Online Commerce (PAC-EPIC-32):** Điều kiện tiên quyết.
- **Customer Identity (PAC-EPIC-31):** Chỉ những khách hàng đã mua sản phẩm (Verified Buyer) mới được phép đánh giá để tránh Review ảo.

## 5. Quyết định chưa chốt (Open Decisions)
- Quyết định: Hệ thống CMS sẽ được xây dựng tích hợp trực tiếp vào NestJS Backend (Headless CMS tự build) hay sử dụng giải pháp bên thứ 3 (như Strapi, Contentful, Sanity) để tiết kiệm thời gian phát triển?
  - *Decision Owner:* Chief Technology Officer (CTO).

## 6. Traceability
- **Logical Task:** PAC-TASK-577
- **Story:** US-170
- **Epic:** PAC-EPIC-39
- **Component:** Review & CMS
- **Branch:** `docs/PAC-787-task-577-document-review-and-cms-future-scope`

## 7. Guardrail (Cấm Implementation)
> **NGHIÊM CẤM TRIỂN KHAI:** Tài liệu này hoàn toàn thuộc về phạm vi Mở rộng Thương mại Tương lai. Cấm thêm bất kỳ bảng nào như `ProductReview`, `Article`, hay `Banner` vào Prisma Schema hiện tại. Việc thêm các bảng này sẽ làm tăng thời gian Prisma Generate, làm phình to Data Seed và phân tán sự tập trung của đội ngũ khỏi core POS.
