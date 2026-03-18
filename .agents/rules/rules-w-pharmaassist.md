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
- **Quy tắc sử dụng nhánh:** Không tạo thêm nhánh mới cho các task, user story, hay epic đã được lên kế hoạch. Thay vào đó, AI bắt buộc checkout và sử dụng đúng nhánh tương ứng dựa theo cột "Nhánh Git tương ứng" trong file `Jira/branch-on-jira.md`. Tuy nhiên, vẫn ĐƯỢC PHÉP tạo nhánh mới nếu cần fix lỗi gấp (hotfix) hoặc thêm tính năng khác ngoài scope của file trên. Không viết đè code lên task khác.
- **Quy trình Commit, Test và Push theo cấp độ (Task -> US -> Epic):**
  - **Cấp độ Task:** Khi thực hiện 1 task cần sử dụng các skill để lên kế hoạch, triển khai và kiểm thử. Mỗi task khi hoàn thành cần commit từ 5-10 commit tùy vào số lượng công việc của task (không cố định 1 số lượng commit nhất định) và push lên nhánh của task đó. Sau khi triển khai xong, tiến hành sử dụng các skill để kiểm thử và test xem đã hoàn thành chưa, nếu có lỗi thì sử dụng skill để debug, commit và push lên nhánh của task đó.
  - **Cấp độ User Story (US):** Sau khi hoàn thành các task bên trong 1 US, tiến hành kiểm thử bằng các skill để kiểm thử và test xem đã hoàn thành chưa. Nếu có lỗi thì sử dụng skill để debug, commit và push lên nhánh của US đó.
  - **Cấp độ Epic:** Sau khi hoàn thành các task và US của 1 epic, tiến hành kiểm thử bằng các skill để kiểm thử và test xem đã hoàn thành chưa. Nếu có lỗi thì sử dụng skill để debug, commit và push lên nhánh của epic đó.
- **Commit Format:**
  - Định dạng: `<type>(<scope>): <Jira key> <mô tả ngắn bằng tiếng Anh>`.
  - Không dùng `git push --force` lên `main/develop`. 
  - **Các kiểu commit thường dùng:**

| Type       | Dùng khi nào                            | Ví dụ                                            |
| ---------- | --------------------------------------- | ------------------------------------------------ |
| `feat`     | Thêm chức năng mới                      | `feat(pos): thêm màn hình tạo đơn bán hàng`      |
| `fix`      | Sửa lỗi                                 | `fix(auth): sửa lỗi không lưu session`           |
| `docs`     | Cập nhật tài liệu                       | `docs(uml): bổ sung sequence diagram checkout`   |
| `style`    | Sửa format code, không đổi logic        | `style(ui): căn chỉnh giao diện login`           |
| `refactor` | Tái cấu trúc code, không thêm tính năng | `refactor(order): tách logic tính tổng đơn hàng` |
| `test`     | Thêm/sửa test                           | `test(inventory): thêm test cho FEFO deduction`  |
| `chore`    | Việc phụ trợ: config, package, setup    | `chore(prisma): cập nhật schema và migration`    |
| `build`    | Thay đổi build/dependency               | `build(next): cập nhật cấu hình build frontend`  |
| `ci`       | Thay đổi GitHub Actions/CI              | `ci(github): thêm workflow kiểm tra lint`        |
| `perf`     | Tối ưu hiệu năng                        | `perf(graph): tối ưu truy vấn interaction rule`  |
| `revert`   | Hoàn tác commit                         | `revert: hoàn tác thay đổi checkout validation`  |

## 5. Quy Trình Làm Việc Tự Động (AI Agent Workflow)
**5.1. Bắt Đầu Task:** Tuân thủ `/karpathy-principles`. Dùng `/brainstorming`, `/writing-plans` để lên kế hoạch. Hỏi `/grill-me` nếu mơ hồ trước khi code.
**5.2. Triển Khai:** Tích hợp `/build`, `/api`, `/design-ui`...
**5.3. Kiểm Tra:** Chạy `/tdd`, `/debug` để đảm bảo không có lỗi.
**5.4. Hoàn Thành & Tích Hợp (Finalization):**
Chỉ khi các bài kiểm tra đã vượt qua, mã nguồn hoạt động chính xác:
1. **Xác minh code trước khi Push:** Chạy kiểm tra nội bộ (vd: `npm run build`) để tránh hỏng PR.
2. **Cập nhật develop:** Kéo code bằng `git pull origin develop --rebase`.
3. **Đẩy code (Push):** Lên nhánh hiện tại (`git push origin feature/PAC-xxx-slug`). Lưu ý: Giữ nguyên các nhánh con chức năng (không xóa) để minh chứng chấm điểm; giữ các commit lẻ để dễ kiểm soát.
4. **Tạo PR & Merge Flow:** Luồng Merge chuẩn: Task branch -> User Story branch -> Epic -> develop -> main. Tạo PR từ nhánh tính năng vào nhánh đích (thường là develop hoặc nhánh của User Story và Epic).
5. **Báo cáo & Kiểm duyệt trước khi lên main:** KHÔNG merge vào `main` sau mỗi task lẻ. Khi xong một cụm chức năng/Sprint, **dừng lại báo cáo** cho người dùng test. Sau khi test OK, người dùng mới tạo PR & merge từ `develop` vào `main`.
6. **Mô tả PR & Che dấu AI:** Quá trình tạo PR cần "Add a description" đầy đủ. Các commit, PR, description **tuyệt đối không nhắc đến** AI, agents, automation.
7. **Tiếp tục:** Về nhánh `develop` -> Kéo code mới -> Làm tiếp.
8. **Cập nhật:** Ghi chú thành quả cuối cùng vào `WORKING-CONTEXT.md`.

## Git, Branch, Skill, Test & Commit Rules for AI Agent

### 1. Nguyên tắc chung

Khi thực hiện bất kỳ Jira Task, User Story hoặc Epic nào, AI Agent phải làm việc theo quy trình có kiểm soát:

1. Đọc tài liệu context liên quan trước khi sửa code.
2. Sử dụng các skill phù hợp để lập kế hoạch, kiểm tra, kiểm thử, debug và viết commit.
3. Không sửa code khi chưa có implementation plan ngắn.
4. Không làm ngoài phạm vi task/story/epic hiện tại.
5. Không commit code lỗi nếu lỗi nằm trong phạm vi task đang làm.
6. Không push code khi chưa chạy kiểm thử phù hợp hoặc chưa ghi rõ lý do không thể chạy.
7. Mỗi thay đổi phải có Jira key trong branch hoặc commit message.
8. Sau khi hoàn thành phải cập nhật progress/evidence tương ứng.

---

### 2. Quy trình khi thực hiện một Jira Task

Khi bắt đầu một task, AI Agent phải:

1. Đọc task hiện tại.
2. Xác định task thuộc User Story nào.
3. Xác định task thuộc Epic nào.
4. Đọc file context liên quan trong `work-context`.
5. Xác định file dự kiến sửa.
6. Xác định database/API/UI/test liên quan.
7. Lập implementation plan ngắn.
8. Chỉ sau đó mới sửa code.

Sau khi sửa code, AI Agent phải:

1. Sử dụng skill phù hợp để kiểm tra code.
2. Chạy lint/typecheck/test/build phù hợp với phần đã sửa.
3. Nếu có lỗi, dùng skill để debug.
4. Sửa lỗi trong phạm vi task.
5. Commit các thay đổi hợp lý.
6. Push lên branch của task.
7. Cập nhật progress/evidence.

Mỗi task có thể có nhiều commit nhỏ, thường từ **1–10 commit tùy độ lớn và độ phức tạp của task**. Không ép số lượng commit cố định. Task nhỏ có thể chỉ cần 1–2 commit; task lớn có thể cần nhiều commit hơn.

Ví dụ branch task:

```text
feature/PAC-TASK-025-implement-permission-guard
```

Ví dụ commit task:

```text
feat(auth): PAC-TASK-024 add permission decorator
feat(auth): PAC-TASK-025 implement permission guard
test(auth): PAC-TASK-025 add permission guard tests
fix(auth): PAC-TASK-030 handle forbidden response
```

---

### 3. Quy trình khi hoàn thành toàn bộ task trong một User Story

Sau khi toàn bộ task thuộc một User Story đã hoàn thành, AI Agent phải:

1. Tạo hoặc checkout branch của User Story nếu quy trình nhóm yêu cầu.
2. Merge hoặc tổng hợp các task branch liên quan vào branch User Story.
3. Kiểm thử toàn bộ luồng của User Story.
4. Chạy lint/typecheck/test/build phù hợp.
5. Nếu phát hiện lỗi, dùng skill để debug.
6. Sửa lỗi và commit vào branch User Story.
7. Push branch User Story.
8. Cập nhật trạng thái User Story trong progress/evidence.

Ví dụ branch User Story:

```text
feature/US-06-permission-based-api-guard
```

Ví dụ commit User Story:

```text
test(auth): US-06 verify permission guard flow
fix(auth): US-06 align forbidden response with acceptance criteria
docs(sprint-1): US-06 update completion evidence
```

---

### 4. Quy trình khi hoàn thành toàn bộ User Story trong một Epic

Sau khi toàn bộ User Story thuộc một Epic đã hoàn thành, AI Agent phải:

1. Tạo hoặc checkout branch của Epic nếu quy trình nhóm yêu cầu.
2. Merge hoặc tổng hợp các User Story branch liên quan vào branch Epic.
3. Kiểm thử toàn bộ phạm vi Epic.
4. Chạy lint/typecheck/test/build phù hợp.
5. Nếu có lỗi, dùng skill để debug.
6. Sửa lỗi và commit vào branch Epic.
7. Push branch Epic.
8. Cập nhật trạng thái Epic trong progress/evidence.

Ví dụ branch Epic:

```text
feature/PAC-EPIC-01-authentication-rbac
```

Ví dụ commit Epic:

```text
test(auth): PAC-EPIC-01 verify auth and RBAC flow
fix(rbac): PAC-EPIC-01 resolve permission mismatch
docs(sprint-1): PAC-EPIC-01 mark completion checklist
```

---

### 5. Quy tắc sử dụng skill

AI Agent phải sử dụng skill đúng mục đích:

1. Planning skill: dùng trước khi code để lập kế hoạch.
2. Code review skill: dùng sau khi sửa code để tự kiểm tra.
3. Testing skill: dùng để xác định và chạy test phù hợp.
4. Debug skill: dùng khi lint/test/build fail.
5. Git skill: dùng để tạo branch, commit, push, kiểm tra diff.
6. Documentation skill: dùng để cập nhật progress/evidence.
7. Commit writer skill: dùng để viết commit message đúng chuẩn.

AI Agent không được bỏ qua bước kiểm tra chỉ vì task nhỏ.

---

### 6. Quy tắc commit

Commit phải rõ ràng, ngắn gọn, có phạm vi và bám vào thay đổi thật.

Format khuyến nghị:

```text
<type>(<scope>): <Jira key> <mô tả ngắn bằng tiếng Anh>
```

Ví dụ:

```text
feat(auth): PAC-TASK-025 add permission guard
fix(auth): PAC-TASK-030 return forbidden response
test(auth): PAC-TASK-025 add guard test cases
docs(sprint-1): PAC-TASK-025 update progress
```

Không commit các nội dung sau:

1. Log chat với AI.
2. Prompt dài không liên quan.
3. File tạm.
4. Secret, API key, token.
5. File `.env` chứa thông tin thật.
6. Code chưa chạy được nếu lỗi nằm trong phạm vi task.
7. Thay đổi ngoài scope task mà không giải thích.

---

### 7. Các kiểu commit thường dùng

| Type       | Dùng khi nào                            | Ví dụ                                            |
| ---------- | --------------------------------------- | ------------------------------------------------ |
| `feat`     | Thêm chức năng mới                      | `feat(pos): thêm màn hình tạo đơn bán hàng`      |
| `fix`      | Sửa lỗi                                 | `fix(auth): sửa lỗi không lưu session`           |
| `docs`     | Cập nhật tài liệu                       | `docs(uml): bổ sung sequence diagram checkout`   |
| `style`    | Sửa format code, không đổi logic        | `style(ui): căn chỉnh giao diện login`           |
| `refactor` | Tái cấu trúc code, không thêm tính năng | `refactor(order): tách logic tính tổng đơn hàng` |
| `test`     | Thêm/sửa test                           | `test(inventory): thêm test cho FEFO deduction`  |
| `chore`    | Việc phụ trợ: config, package, setup    | `chore(prisma): cập nhật schema và migration`    |
| `build`    | Thay đổi build/dependency               | `build(next): cập nhật cấu hình build frontend`  |
| `ci`       | Thay đổi GitHub Actions/CI              | `ci(github): thêm workflow kiểm tra lint`        |
| `perf`     | Tối ưu hiệu năng                        | `perf(graph): tối ưu truy vấn interaction rule`  |
| `revert`   | Hoàn tác commit                         | `revert: hoàn tác thay đổi checkout validation`  |

---

### 8. Quy tắc push

AI Agent phải push sau khi hoàn thành một nhóm thay đổi hợp lý.

Với task branch:

```text
git push origin feature/PAC-TASK-xxx-short-description
```

Với User Story branch:

```text
git push origin feature/US-xx-short-description
```

Với Epic branch:

```text
git push origin feature/PAC-EPIC-xx-short-description
```

Không push trực tiếp lên `main`.

Không force push nếu chưa được phép.

Không merge vào `main` nếu chưa có review hoặc chưa qua test.

---

### 9. Quy tắc kiểm thử trước khi hoàn thành

Tùy phần đã sửa, AI Agent phải chạy lệnh phù hợp.

Frontend:

```bash
cd frontend
npm run lint
npm run build
```

Backend:

```bash
cd backend
npm run lint
npm run test
npx prisma validate
npx prisma generate
```

Nếu có lỗi:

1. Ghi lỗi rõ ràng.
2. Xác định lỗi thuộc scope task hay ngoài scope.
3. Nếu thuộc scope task, phải sửa.
4. Nếu ngoài scope task, ghi vào Known Issues.
5. Không tự ý sửa module ngoài scope nếu chưa cần.

---

### 10. Quy tắc cập nhật progress/evidence

Sau khi hoàn thành task, User Story hoặc Epic, AI Agent phải cập nhật:

```text
work-context/sprint-1/sprint-1-progress.md
```

Nội dung cần cập nhật:

1. Task đã hoàn thành.
2. User Story đã hoàn thành nếu đủ task.
3. Epic đã hoàn thành nếu đủ User Story.
4. Test Results.
5. Manual Demo Evidence nếu có.
6. Known Issues.
7. Next Action.

Nếu task chưa hoàn thành, không được tick checkbox.

Nếu test fail, không được ghi pass.

Nếu chỉ hoàn thành một phần, phải ghi rõ là Partial hoặc Known Issue.

---

### 11. Quy tắc xử lý lỗi

Khi có lỗi trong quá trình kiểm thử:

1. Không bỏ qua lỗi.
2. Không đánh dấu task Done nếu lỗi thuộc task đó.
3. Dùng debug skill để phân tích lỗi.
4. Sửa lỗi trong phạm vi task.
5. Commit bản sửa lỗi.
6. Push lại branch.
7. Cập nhật Known Issues nếu lỗi ngoài scope.

Ví dụ commit sửa lỗi:

```text
fix(auth): resolve permission guard metadata lookup for PAC-TASK-025
```

---

### 12. Quy tắc phạm vi

AI Agent phải luôn tuân thủ scope hiện tại.

Khi đang làm task:

```text
Chỉ làm task đó.
```

Khi đang làm User Story:

```text
Chỉ làm các task thuộc User Story đó.
```

Khi đang làm Epic:

```text
Chỉ làm các User Story thuộc Epic đó.
```

Không tự ý mở rộng sang Sprint khác.

Không tự ý implement module Future/Commercial Expansion.

Không implement toàn bộ 100 bảng nếu task hiện tại không yêu cầu.

---

### 13. Quy tắc an toàn riêng của PharmaAssist

AI Agent tuyệt đối không được:

1. Thay Supabase Auth bằng custom JWT.
2. Lưu `password_hash` trong PostgreSQL.
3. Tạo custom session table thay Supabase.
4. Bỏ qua AuthGuard.
5. Bỏ qua PermissionGuard.
6. Cho Warehouse truy cập POS/Checkout.
7. Cho Staff xem dữ liệu toàn hệ thống nếu không có quyền.
8. Reset database thật nếu chưa được phép.
9. Commit secret hoặc `.env` thật.
10. Sửa dữ liệu seed lớn ngoài phạm vi task.
