---
description: Chi tiết quy trình làm việc tự động của AI Agent cho dự án PharmaAssist
---

# Quy Trình Làm Việc Tự Động (AI Agent Autonomous Workflow)

Tài liệu này mô tả chi tiết quy trình gồm 4 bước mà AI Agent sẽ thực hiện mỗi khi nhận một yêu cầu (task) mới, kèm theo các kỹ năng (skills) tương ứng được sử dụng ở từng giai đoạn.

## 1. Bắt Đầu Task Mới (Phân tích & Lên kế hoạch)
**Mục tiêu:** Đảm bảo hiểu rõ yêu cầu, chốt thiết kế trước khi bắt tay vào viết code.
- **Kỹ năng sử dụng:**
  - `/karpathy-principles`: Luôn chạy ngầm. Ép buộc tư duy "Suy nghĩ trước khi code", không đoán mò, thay đổi tối thiểu, và giữ mọi thứ đơn giản.
  - `/brainstorming`: Mở rộng tư duy, đề xuất giải pháp kiến trúc hoặc UI/UX.
  - `/writing-plans`: Lập bản thiết kế thi công chi tiết (định tuyến file cần tạo, cấu trúc API, v.v.).
  - `/grill-me` hoặc `/grill-with-docs`: Đóng vai "người phỏng vấn khó tính" để tìm ra các góc khuất (edge cases, bảo mật, sai sót logic) trước khi triển khai.

## 2. Triển Khai Thực Hiện (Coding)
**Mục tiêu:** Viết mã nguồn đúng chuẩn, an toàn, hiệu suất cao theo từng chuyên môn.
- **Kỹ năng sử dụng:**
  - `/ecc-frontend` & `/design-system-guide`: Chuyên dụng cho giao diện (Next.js, Tailwind). Đảm bảo chuẩn UI Long Châu, micro-animations mượt mà, và chuẩn SEO.
  - `/ecc-backend` & `/api`: Chuyên dụng cho máy chủ (NestJS). Cấu trúc API RESTful, thiết kế Controller/Service gọn gàng, và xử lý lỗi chặt chẽ.
  - `/ecc-database`: Chuyên thao tác cơ sở dữ liệu (Prisma, Supabase). Tối ưu hóa truy vấn để giảm độ trễ (latency).
  - `/modern-web-guidance`: Sử dụng các chuẩn CSS và Web API hiện đại nhất hiện nay.

## 3. Kiểm Tra & Khắc Phục Lỗi (Testing & Debugging)
**Mục tiêu:** Đảm bảo mã nguồn chạy ổn định, không có lỗi logic, vượt qua các bài kiểm tra nội bộ.
- **Kỹ năng sử dụng:**
  - `/tdd` (Test-Driven Development): Viết bài kiểm tra trước -> Báo lỗi đỏ -> Viết code vượt qua test -> Tối ưu lại (Refactor).
  - `/debug` & `/mattpocock-engineering`: Chẩn đoán lỗi siêu việt qua log thay vì đoán mò, khoanh vùng chính xác vấn đề để sửa triệt để.
  - `/ecc-testing`: Xây dựng bộ test tự động (E2E, Unit tests).

## 4. Hoàn Thành & Tích Hợp (Finalization)
**Mục tiêu:** Đẩy code an toàn lên Git, tự động liên kết với Jira và báo cáo tiến độ cho người dùng kiểm duyệt.
- **Các bước bắt buộc (Các bước vàng):**
  1. **Xác minh code:** Chạy kiểm tra nội bộ (`npm run build` hoặc type check).
  2. **Làm việc nhóm & Đồng bộ:** Thường xuyên pull code từ nhánh `develop` về để cập nhật các đoạn code mới nhất của các thành viên khác, tránh conflict (`git pull origin develop --rebase`).
  3. **Xử lý Bug (Lỗi):** Với các lỗi, phải tạo 1 issue BUG trên Jira, đồng thời tạo nhánh mới đúng với mã Jira key của BUG vừa tạo. Push code lên nhánh này với commit có ghi mã Jira key.
  4. **Commit & Push:** Đảm bảo commit format đúng chuẩn `<type>(<scope>): <Jira key> <mô tả ngắn bằng tiếng Anh>`. Push lên 1 nhánh của tính năng hay lỗi vừa làm (`git push origin <tên-nhánh>`). Tuyệt đối **không được push trực tiếp lên develop hay main**, không dùng `git push --force` lên `main/develop`.
  5. **Tạo PR vào develop:** Luôn tạo PR vào `develop`. Tự động liên kết Jira nhờ mã PAC. Sau đó merge nhánh vào `develop` khi đã pass hết các điều kiện.
  6. **Báo cáo & Kiểm duyệt trước khi lên main:** KHÔNG gộp vào `main` lắt nhắt. Dừng lại, báo cáo tiến độ cho người dùng test. Khi người dùng test OK, người dùng mới tiến hành gộp `develop` vào `main`.
  7. **Mô tả an toàn:** Viết description rõ ràng. Tuyệt đối không nhắc đến AI, automation trong mọi lịch sử Git.
  8. **Quay lại guồng quay:** Kéo code mới từ `develop` để tiến hành làm task tiếp theo.
  9. **Lưu ngữ cảnh:** Ghi chú toàn bộ thành quả cuối cùng vào `WORKING-CONTEXT.md`.
- **Kỹ năng sử dụng trong bước này:**
  - `/git-github`: Tuân thủ chuẩn quản lý nhánh và commit.
  - `/superpowers-workflow`: Vai trò "Tổng chỉ huy" rà soát quy trình và Code Review lần cuối cùng trước khi bàn giao.
