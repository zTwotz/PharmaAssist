---
trigger: always_on
glob: "*"
description: Quy tắc phát triển PharmaAssist (NestJS, Next.js, Prisma, Supabase, Jira)
---

# Quy Tắc Làm Việc PharmaAssist

## 1. Giao Tiếp & Phiên Làm Việc
- **Bắt đầu:** Đọc lại file này. Khi user gõ "Bắt đầu": Pull `develop` mới nhất về `main` & `develop` -> Checkout `develop` -> Đọc `WORKING-CONTEXT.md` -> Báo cáo trạng thái dự án.
- **Ghi chép:** Cập nhật ngay các thiết kế, ý tưởng chốt và tiến độ công việc vào file `WORKING-CONTEXT.md`.
- **Ngôn ngữ:** Giao tiếp & tài liệu chính thức bằng Tiếng Việt. Code, biến, comment hoàn toàn bằng Tiếng Anh (Comment giải thích TẠI SAO - WHY, không phải CÁI GÌ - WHAT).

## 2. Tiêu Chuẩn Code & Kiến Trúc
- **Nguyên tắc Karpathy:** Suy nghĩ trước khi code, Đơn giản là nhất, Thay đổi tối thiểu, Hướng mục tiêu.
- **Tech Stack:** 
  - *Frontend:* Next.js (TypeScript), Tailwind CSS. Tuân thủ `DESIGN.md` (màu `#024ad8`).
  - *Backend:* NestJS (TypeScript), Prisma ORM. RESTful API chuẩn, phân quyền RBAC.
  - *DB:* Supabase PostgreSQL (Project Ref: `opzhotrjpxlldflcnzzq`).
- **Code Rules:** Dùng `const`, hạn chế `any`. Không nuốt lỗi (silent catch), phải log lỗi rõ ràng và validate dữ liệu ở ranh giới (API endpoints).

## 3. Nghiệp Vụ & An Toàn
- **Nghiệp vụ:** Không bán vượt tồn kho (`BR-06`); Đơn phải có ít nhất 1 thuốc (`BR-09`); Trừ tồn kho khi thanh toán xong (`BR-10`); Tự động kiểm tra tương tác thuốc (`BR-13`).
- **An toàn:** Cảnh báo tương tác mang tính tham khảo, AI Copilot không chẩn đoán y tế. Tuyệt đối KHÔNG commit `.env` hay credentials lên Git.

## 4. Quản Lý Phiên Bản (Git & Jira)
- **Quy tắc tạo nhánh:** Bắt buộc tạo nhánh riêng từ `develop` mới nhất cho mỗi task. Tên nhánh phải chứa mã Jira (vd: `feature/PAC-xxx-slug`). Không viết đè code lên task khác.
- **Commit & Push:**
  - Định dạng: `<type>(PAC-xxx): <mô tả tiếng Anh>`.
  - Không dùng `git push --force` lên `main/develop`. 
  - Chỉ push lên đúng nhánh `feature/PAC-xxx` hoặc `fix/PAC-xxx`.

## 5. Quy Trình Làm Việc Tự Động (AI Agent Workflow)
**5.1. Bắt Đầu Task:** Tuân thủ `/karpathy-principles`. Dùng `/brainstorming`, `/writing-plans` để lên kế hoạch. Hỏi `/grill-me` nếu mơ hồ trước khi code.
**5.2. Triển Khai:** Tích hợp `/build`, `/api`, `/design-ui`...
**5.3. Kiểm Tra:** Chạy `/tdd`, `/debug` để đảm bảo không có lỗi.
**5.4. Hoàn Thành & Tích Hợp (Finalization):**
Chỉ khi các bài kiểm tra đã vượt qua, mã nguồn hoạt động chính xác:
1. **Xác minh code trước khi Push:** Chạy kiểm tra nội bộ (vd: `npm run build`) để tránh hỏng PR.
2. **Cập nhật develop:** Kéo code bằng `git pull origin develop --rebase`.
3. **Đẩy code (Push):** Lên nhánh hiện tại (`git push origin feature/PAC-xxx-slug`). Lưu ý: Giữ nguyên các nhánh con chức năng (không xóa) để minh chứng chấm điểm; giữ các commit lẻ để dễ kiểm soát.
4. **PR vào develop:** Tạo PR gộp nhánh tính năng vào `develop` trên GitHub. Hệ thống Jira sẽ tự động link nhờ mã PAC-xxx. Merge nhánh vào `develop`.
5. **Báo cáo & Kiểm duyệt trước khi lên main:** KHÔNG merge vào `main` sau mỗi task lẻ. Khi xong một cụm chức năng/Sprint, **dừng lại báo cáo** cho người dùng test. Sau khi test OK, người dùng mới tạo PR & merge từ `develop` vào `main`.
6. **Mô tả PR & Che dấu AI:** Quá trình tạo PR cần "Add a description" đầy đủ. Các commit, PR, description **tuyệt đối không nhắc đến** AI, agents, automation.
7. **Tiếp tục:** Về nhánh `develop` -> Kéo code mới -> Làm tiếp.
8. **Cập nhật:** Ghi chú thành quả cuối cùng vào `WORKING-CONTEXT.md`.
