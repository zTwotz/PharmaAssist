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
  - _Frontend:_ Next.js (TypeScript), Tailwind CSS. Tuân thủ `DESIGN.md` (màu `#024ad8`).
  - _Backend:_ NestJS (TypeScript), Prisma ORM. RESTful API chuẩn, phân quyền RBAC.
  - _DB:_ Supabase PostgreSQL (Project Ref: `opzhotrjpxlldflcnzzq`).
- **Code Rules:** Dùng `const`, hạn chế `any`. Không nuốt lỗi (silent catch), phải log lỗi rõ ràng và validate dữ liệu ở ranh giới (API endpoints).

## 3. Nghiệp Vụ & An Toàn

- **Nghiệp vụ:** Không bán vượt tồn kho (`BR-06`); Đơn phải có ít nhất 1 thuốc (`BR-09`); Trừ tồn kho khi thanh toán xong (`BR-10`); Tự động kiểm tra tương tác thuốc (`BR-13`).
- **An toàn:** Cảnh báo tương tác mang tính tham khảo, AI Copilot không chẩn đoán y tế. Tuyệt đối KHÔNG commit `.env` hay credentials lên Git.

## 4. Quản Lý Phiên Bản (Git & Jira)

- **Quy tắc sử dụng nhánh:** Không tạo thêm nhánh mới cho các task, user story, hay epic đã được lên kế hoạch. Thay vào đó, AI bắt buộc checkout và sử dụng đúng nhánh tương ứng dựa theo cột "Nhánh Git tương ứng" trong file `Jira/branch-on-jira.md`. Tuy nhiên, vẫn ĐƯỢC PHÉP tạo nhánh mới nếu cần fix lỗi gấp (hotfix) hoặc thêm tính năng khác ngoài scope của file trên. Không viết đè code lên task khác.
- **Quy trình Commit, Test, PR và Merge chính thức:**
  - **Cấp độ Task/Bug:** AI checkout đúng nhánh Task/Bug, lập kế hoạch ngắn, triển khai, chạy targeted tests, chạy Supabase verification khi có ảnh hưởng dữ liệu persistent, commit, push, tạo Pull Request vào `develop`, kiểm tra CI/diff/scope/conflict và tự merge vào `develop` khi toàn bộ merge gate đạt. Sau đó AI cập nhật technical progress/evidence và tiếp tục Task kế tiếp.
  - **Cấp độ User Story (US):** Không tạo Story PR và không merge qua Story branch. Sau khi toàn bộ Task của Story đã merge vào `develop`, AI checkout/pull `develop` mới nhất, chạy Story Acceptance Review và các test cấp Story. Nếu phát hiện lỗi, xử lý bằng Task/Bug branch phù hợp rồi merge lại vào `develop`.
  - **Cấp độ Epic:** Không tạo Epic PR và không merge qua Epic branch. Sau khi toàn bộ Story đạt Acceptance Review, AI chạy Epic Integration/Regression Review trực tiếp trên `develop`, bao gồm test/build/Prisma/Supabase phù hợp. Lỗi phải được xử lý qua Task/Bug branch rồi merge vào `develop`.
  - **Cấp độ Release:** AI không merge `develop` vào `main`. Sau khi Sprint Final Review đạt PASS, Project Owner kiểm tra và thực hiện PR/merge từ `develop` vào `main`.
- **Quản lý Jira thủ công:** Project Owner tự cập nhật trạng thái, comment, liên kết và Bug trên Jira. AI không thực hiện Jira write action; AI chỉ giữ Jira key trong branch/commit/PR/evidence, đề xuất trạng thái Jira và ghi Bug candidate để Project Owner xử lý.
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
Chỉ khi các bài kiểm tra phù hợp đã vượt qua và mã nguồn hoạt động chính xác:

1. **Xác minh code trước khi Push:** Chạy targeted lint/typecheck/test/build phù hợp với phần đã sửa; chạy Supabase verification khi Task có ảnh hưởng dữ liệu persistent.
2. **Đồng bộ nhánh Task/Bug:** Fetch `develop` mới nhất và đồng bộ nhánh hiện tại bằng phương án an toàn trước khi mở PR. Không push trực tiếp vào `develop`.
3. **Đẩy code (Push):** Push lên đúng nhánh Task/Bug hiện tại. Giữ nguyên các nhánh đã dùng để làm bằng chứng; không xóa branch sau merge nếu dự án cần traceability.
4. **Tạo PR:** Tạo Pull Request từ Task/Bug branch vào `develop`. Không tạo Story PR hoặc Epic PR.
5. **Merge Gate:** AI phải kiểm tra đúng head/base, diff đúng scope, không có secret, không có conflict, required CI checks PASS, targeted tests PASS, Supabase verification PASS hoặc N/A hợp lệ và `develop` vẫn buildable/testable.
6. **AI tự merge vào develop:** Chỉ merge Task/Bug PR khi toàn bộ Merge Gate đạt. Nếu gate fail, sửa trên cùng branch, push lại và kiểm tra lại; không được bỏ qua lỗi.
7. **Story/Epic Review:** Khi đủ Task, chạy Story Acceptance Review trên `develop`; khi đủ Story, chạy Epic Integration/Regression Review trên `develop`. Không dùng Story/Epic branch để tích hợp.
8. **Báo cáo trước khi lên main:** AI tuyệt đối không merge `develop` vào `main`. Khi Sprint Final Review PASS, Project Owner kiểm tra và tự thực hiện PR/merge `develop → main`.
9. **Mô tả PR & Che dấu AI:** PR phải có description đầy đủ. Commit, PR và description tuyệt đối không nhắc đến AI, agents hoặc automation.
10. **Tiếp tục:** Sau khi merge, checkout `develop`, pull bản mới nhất, xác minh merge và bắt đầu Task tiếp theo.
11. **Cập nhật:** Cập nhật technical progress/evidence sau mỗi Task hoàn thành hoặc cuối phiên; cập nhật `WORKING-CONTEXT.md` ở checkpoint cần thiết.

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
8. Không code hoặc commit trực tiếp trên `develop` hoặc `main`; mọi thay đổi production phải đi qua Task/Bug branch và Pull Request.
9. Sau khi hoàn thành phải cập nhật progress/evidence tương ứng.
10. AI không thực hiện Jira write action. Trạng thái, comment, liên kết và Bug trên Jira do Project Owner quản lý thủ công.
11. AI chỉ đề xuất Jira status, ghi Bug candidate và cung cấp technical evidence để Project Owner cập nhật Jira.

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
2. Chạy targeted lint/typecheck/test/build phù hợp với phần đã sửa.
3. Chạy Supabase verification khi Task có ảnh hưởng dữ liệu persistent; nếu không có ảnh hưởng, ghi N/A kèm lý do.
4. Nếu có lỗi, dùng skill để debug và sửa lỗi trong phạm vi Task.
5. Review diff, kiểm tra secret, scope và conflict.
6. Commit các thay đổi hợp lý và push lên đúng Task branch.
7. Tạo Pull Request từ Task branch vào `develop`.
8. Kiểm tra required CI checks và Merge Gate.
9. Tự merge Pull Request vào `develop` chỉ khi mọi gate PASS.
10. Checkout/pull `develop` mới nhất và xác minh merge.
11. Cập nhật technical progress/evidence và đề xuất trạng thái Jira cho Project Owner.

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

Sau khi toàn bộ Task thuộc một User Story đã merge vào `develop`, AI Agent phải:

1. Checkout `develop` và pull phiên bản mới nhất.
2. Xác minh toàn bộ Task PR của Story đã merge thành công vào `develop`.
3. Chạy Story Acceptance Review theo acceptance criteria.
4. Chạy lint/typecheck/test/build cấp Story phù hợp.
5. Chạy Supabase Story verification khi Story có ảnh hưởng dữ liệu persistent.
6. Nếu phát hiện lỗi, ghi Bug candidate hoặc dùng Task/Bug branch phù hợp để sửa; không commit integration fix trực tiếp lên `develop`.
7. Chỉ đánh dấu trạng thái kỹ thuật của Story là PASS khi acceptance criteria và test evidence đạt.
8. Cập nhật progress/evidence và ghi `Recommended Jira status` để Project Owner tự cập nhật Jira.

Không thực hiện các việc sau:

- Không checkout Story branch để tích hợp.
- Không merge Task branch vào Story branch.
- Không commit hoặc push integration fix lên Story branch.
- Không tạo Story Pull Request.
- Không dùng Story branch làm điều kiện hoàn thành Story.

Các Story branch đã tồn tại được giữ lại cho mục đích lịch sử và traceability.

---

### 4. Quy trình khi hoàn thành toàn bộ User Story trong một Epic

Sau khi toàn bộ User Story thuộc một Epic đã đạt Story Acceptance Review trên `develop`, AI Agent phải:

1. Checkout `develop` và pull phiên bản mới nhất.
2. Xác minh tất cả Story thuộc Epic đã đạt trạng thái kỹ thuật PASS.
3. Chạy Epic Integration/Regression Review trên `develop`.
4. Chạy full lint/typecheck/test/build phù hợp với phạm vi Epic.
5. Chạy Prisma validate/generate, migration verification và Supabase verification khi áp dụng.
6. Nếu phát hiện lỗi, ghi Bug candidate hoặc dùng Task/Bug branch phù hợp để sửa; không commit trực tiếp lên `develop`.
7. Chỉ đánh dấu trạng thái kỹ thuật của Epic là PASS khi integration/regression evidence đầy đủ và không còn blocker kỹ thuật.
8. Cập nhật progress/evidence và ghi `Recommended Jira status` để Project Owner tự cập nhật Jira.

Không thực hiện các việc sau:

- Không checkout Epic branch để tích hợp.
- Không merge Story branch vào Epic branch.
- Không commit hoặc push integration fix lên Epic branch.
- Không tạo Epic Pull Request.
- Không dùng Epic branch làm điều kiện hoàn thành Epic.

Các Epic branch đã tồn tại được giữ lại cho mục đích lịch sử và traceability.

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

### 8. Quy tắc push, PR và merge

AI Agent phải push sau khi hoàn thành một nhóm thay đổi hợp lý.

Với Task branch:

```text
git push origin <exact-task-branch>
```

Với Bug branch:

```text
git push origin bugfix/<BUG-JIRA-KEY>-bug-<short-english-slug>
```

Quy tắc tích hợp:

1. Task/Bug Pull Request phải target `develop`.
2. Không tạo Story Pull Request hoặc Epic Pull Request.
3. Không push trực tiếp lên `develop` hoặc `main`.
4. Không force push lên `develop` hoặc `main`.
5. AI được tự merge Task/Bug PR vào `develop` khi:
   - PR head/base chính xác;
   - diff đúng phạm vi;
   - không có secret hoặc file `.env` thật;
   - không có conflict;
   - targeted tests PASS;
   - required CI checks PASS;
   - Supabase verification PASS hoặc N/A hợp lệ;
   - không có Blocking technical defect;
   - `develop` vẫn buildable và testable.
6. Nếu Merge Gate fail, AI phải sửa trên cùng Task/Bug branch và chạy lại checks.
7. AI không được merge `develop` vào `main`.
8. Project Owner là người duy nhất review và merge release PR `develop → main` sau Sprint Final Review PASS.
9. Giữ lại các branch đã dùng khi dự án cần bằng chứng và traceability.

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

Sau khi hoàn thành Task, Story Acceptance Review hoặc Epic Integration/Regression Review, AI Agent phải cập nhật technical progress/evidence tương ứng, ví dụ:

```text
work-context/sprint-1/sprint-1-progress.md
```

Nội dung cần cập nhật:

1. Task technical status, exact branch, commit, PR, merge SHA và target `develop`.
2. User Story technical status sau Acceptance Review trên `develop`.
3. Epic technical status sau Integration/Regression Review trên `develop`.
4. Test Results.
5. Supabase evidence hoặc N/A hợp lệ.
6. Manual Demo Evidence nếu có.
7. Known Issues và Bug candidates.
8. Recommended Jira status để Project Owner tự cập nhật.
9. Next Action.

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
