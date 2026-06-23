---
trigger: always_on
description: Quy tắc phát triển PharmaAssist (NestJS, Next.js, Prisma, Supabase, Jira)
---

# Quy Tắc Làm Việc PharmaAssist

## 1. Giao tiếp và bắt đầu phiên

- Khi user gõ **“Bắt đầu”**: đọc file này, fetch/pull `develop` mới nhất, bảo đảm `main` và `develop` được đồng bộ đúng quy trình, checkout `develop`, đọc `WORKING-CONTEXT.md` và các file liên quan trong `work-context`, sau đó báo cáo trạng thái dự án.
- Mọi thiết kế, quyết định đã chốt, tiến độ, bằng chứng kỹ thuật và vấn đề còn lại phải được cập nhật vào `WORKING-CONTEXT.md` hoặc file progress/evidence tương ứng.
- Giao tiếp và tài liệu chính thức bằng tiếng Việt. Code, tên biến và comment bằng tiếng Anh. Comment giải thích **WHY**, không mô tả lại **WHAT**.
- Không sửa code trước khi hiểu task, phạm vi, context và có implementation plan ngắn.

## 2. Nguyên tắc kỹ thuật

- Áp dụng nguyên tắc Karpathy: suy nghĩ trước khi code, ưu tiên giải pháp đơn giản, thay đổi tối thiểu và bám đúng mục tiêu.
- Frontend: Next.js, TypeScript, Tailwind CSS; tuân thủ `DESIGN.md`, màu chính `#024ad8`.
- Backend: NestJS, TypeScript, Prisma ORM, RESTful API và RBAC.
- Database: Supabase PostgreSQL, project ref `opzhotrjpxlldflcnzzq`.
- Dùng `const` khi có thể, hạn chế `any`, không silent catch, phải log lỗi rõ ràng và validate dữ liệu tại ranh giới hệ thống như API endpoint.
- Không tự ý thay đổi kiến trúc, dependency, database schema hoặc module ngoài phạm vi task.

## 3. Quy tắc nghiệp vụ và an toàn

Các quy tắc bắt buộc:

- `BR-06`: không bán vượt tồn kho.
- `BR-09`: đơn hàng phải có ít nhất một thuốc.
- `BR-10`: chỉ trừ tồn kho sau khi thanh toán thành công.
- `BR-13`: tự động kiểm tra tương tác thuốc.
- Cảnh báo tương tác chỉ mang tính tham khảo; AI Copilot không chẩn đoán y tế.
- Không commit `.env`, API key, token, mật khẩu, credential, log nhạy cảm hoặc dữ liệu thật lên Git.

AI Agent tuyệt đối không được:

1. Thay Supabase Auth bằng custom JWT.
2. Lưu `password_hash` trong PostgreSQL.
3. Tạo custom session table thay Supabase.
4. Bỏ qua `AuthGuard` hoặc `PermissionGuard`.
5. Cho Warehouse truy cập POS/Checkout.
6. Cho Staff xem dữ liệu toàn hệ thống khi không có quyền.
7. Reset database thật khi chưa được phép.
8. Sửa seed lớn hoặc triển khai module Future/Commercial Expansion ngoài scope.

## 4. Phạm vi và nhánh Git

- Chỉ làm đúng Task/Bug hiện tại. Khi review Story chỉ xử lý phạm vi Story; khi review Epic chỉ xử lý phạm vi Epic. Không tự mở rộng sang Sprint khác.
- Không code, commit hoặc push trực tiếp lên `develop` hay `main`.
- Task đã được lên kế hoạch phải dùng đúng nhánh trong `Jira/branch-on-jira.md`; không tạo nhánh mới tùy tiện.
- Chỉ tạo nhánh mới cho Bug, hotfix hoặc tính năng ngoài danh sách khi thực sự cần và có Jira key phù hợp.
- Không viết đè hoặc gộp thay đổi của task khác vào nhánh hiện tại.
- Thường xuyên fetch/pull `develop` để giảm conflict; trước PR phải đồng bộ nhánh Task/Bug với `develop` bằng phương án an toàn.
- Không dùng `git push --force` lên `main` hoặc `develop`.
- Giữ lại branch sau merge khi dự án cần lịch sử và traceability.

Ví dụ nhánh:

```text
feature/PAC-TASK-025-implement-permission-guard
bugfix/PAC-BUG-101-fix-checkout-stock-validation
```

## 5. Quy trình thực hiện Task/Bug

### 5.1. Trước khi sửa code

1. Đọc Jira Task/Bug hiện tại.
2. Xác định Task thuộc User Story và Epic nào.
3. Đọc context liên quan trong `work-context`.
4. Kiểm tra branch chính xác trong `Jira/branch-on-jira.md`.
5. Xác định file dự kiến sửa, database/API/UI/test bị ảnh hưởng.
6. Xác định acceptance criteria, rủi ro và test cần chạy.
7. Lập implementation plan ngắn rồi mới code.

Sử dụng skill đúng mục đích: planning trước khi code; build/API/design khi triển khai; code review sau khi sửa; testing để chọn test; debug khi kiểm tra fail; Git cho branch/commit/push; documentation cho progress/evidence; commit writer cho commit message.

### 5.2. Trong khi triển khai

- Chỉ thay đổi phần cần thiết để hoàn thành acceptance criteria.
- Không nuốt lỗi hoặc che giấu test fail.
- Nếu phát hiện vấn đề ngoài scope, ghi Known Issue hoặc Bug candidate; không tự sửa lan sang module khác.
- Một Task có thể có 1–10 commit tùy độ lớn; không ép số lượng cố định. Mỗi commit phải là một nhóm thay đổi hợp lý và chạy được trong phạm vi tương ứng.

### 5.3. Sau khi sửa code

1. Tự review diff và kiểm tra scope.
2. Chạy targeted lint, typecheck, test và build phù hợp.
3. Chạy Prisma/Supabase verification nếu thay đổi ảnh hưởng dữ liệu persistent.
4. Nếu không cần Supabase verification, ghi `N/A` kèm lý do.
5. Nếu lỗi thuộc scope, phải debug và sửa trên cùng branch.
6. Kiểm tra secret, file `.env`, credential, conflict và thay đổi ngoài scope.
7. Commit và push lên đúng Task/Bug branch.
8. Tạo Pull Request vào `develop`.
9. Kiểm tra đầy đủ Merge Gate.
10. Chỉ tự merge khi toàn bộ gate PASS.
11. Sau merge: checkout `develop`, pull mới nhất, xác minh commit/merge SHA và trạng thái build/test.
12. Cập nhật technical progress/evidence, Known Issues, Next Action và đề xuất Jira status cho Project Owner.

## 6. Pull Request và Merge Gate

Task/Bug PR luôn target `develop`. Không tạo Story PR hoặc Epic PR.

Chỉ merge khi đáp ứng tất cả điều kiện:

- Head branch và base `develop` chính xác.
- Diff đúng phạm vi Task/Bug.
- Không có secret, credential hoặc `.env` thật.
- Không có conflict.
- Targeted lint/typecheck/test/build PASS.
- Required CI checks PASS.
- Prisma/Supabase verification PASS hoặc `N/A` hợp lệ.
- Không còn blocking technical defect.
- `develop` sau merge vẫn buildable và testable.
- PR description ghi rõ phạm vi, test evidence, ảnh hưởng dữ liệu và known issues.

Nếu gate fail, tiếp tục sửa trên cùng branch, push lại và kiểm tra lại. Không bỏ qua lỗi, không merge cưỡng ép.

Commit, PR title và PR description không nhắc đến AI, agent hoặc automation.

## 7. Quy trình User Story

Sau khi toàn bộ Task của Story đã merge vào `develop`:

1. Checkout/pull `develop` mới nhất.
2. Xác minh tất cả Task PR liên quan đã merge.
3. Chạy Story Acceptance Review theo acceptance criteria.
4. Chạy lint/typecheck/test/build cấp Story phù hợp.
5. Chạy Supabase Story verification nếu có dữ liệu persistent.
6. Nếu phát hiện lỗi, ghi Bug candidate hoặc sửa bằng Task/Bug branch rồi PR lại vào `develop`.
7. Chỉ ghi Story technical status là PASS khi acceptance criteria và test evidence đầy đủ.
8. Cập nhật progress/evidence và `Recommended Jira status`.

Không checkout Story branch để tích hợp; không merge Task vào Story branch; không commit integration fix lên Story branch; không tạo Story PR. Story branch cũ chỉ giữ làm lịch sử.

## 8. Quy trình Epic

Sau khi tất cả Story thuộc Epic đạt technical PASS:

1. Checkout/pull `develop` mới nhất.
2. Xác minh trạng thái kỹ thuật của từng Story.
3. Chạy Epic Integration/Regression Review trực tiếp trên `develop`.
4. Chạy full lint/typecheck/test/build trong phạm vi Epic.
5. Khi áp dụng, chạy Prisma validate/generate, migration verification và Supabase verification.
6. Lỗi phải được xử lý bằng Task/Bug branch; không commit trực tiếp lên `develop`.
7. Chỉ ghi Epic technical status là PASS khi đủ bằng chứng và không còn blocker.
8. Cập nhật progress/evidence và đề xuất Jira status.

Không tích hợp qua Epic branch, không tạo Epic PR. Epic branch cũ chỉ dùng cho traceability.

## 9. Release và quyền của Project Owner

- AI Agent không merge `develop` vào `main`.
- Sau khi Sprint Final Review PASS, Project Owner review và tự thực hiện PR/merge `develop → main`.
- Project Owner quản lý thủ công trạng thái, comment, liên kết và Bug trên Jira.
- AI Agent không tự ý thực hiện Jira write action; chỉ giữ Jira key trong branch/commit/PR/evidence, cung cấp technical evidence, ghi Bug candidate và đề xuất trạng thái.
- AI chỉ tạo Jira Bug khi Project Owner yêu cầu rõ ràng.

## 10. Commit rules

Format:

```text
<type>(<scope>): <Jira key> <short English description>
```

Ví dụ:

```text
feat(auth): PAC-TASK-025 add permission guard
fix(checkout): PAC-BUG-101 prevent overselling stock
test(auth): PAC-TASK-025 add guard test cases
docs(sprint-1): PAC-TASK-025 update technical evidence
```

Type thường dùng:

- `feat`: chức năng mới.
- `fix`: sửa lỗi.
- `docs`: tài liệu.
- `style`: format, không đổi logic.
- `refactor`: tái cấu trúc, không thêm tính năng.
- `test`: thêm/sửa test.
- `chore`: config hoặc việc phụ trợ.
- `build`: dependency/build.
- `ci`: GitHub Actions/CI.
- `perf`: tối ưu hiệu năng.
- `revert`: hoàn tác thay đổi.

Không commit:

- Chat log, prompt dài hoặc nội dung nhắc đến AI.
- File tạm, output không cần thiết.
- Secret, token, API key, `.env` thật.
- Code không chạy nếu lỗi thuộc scope Task.
- Thay đổi ngoài scope không có giải thích.

## 11. Kiểm thử tối thiểu

Chọn lệnh phù hợp với phần thay đổi, không chạy máy móc nhưng không được bỏ qua kiểm tra vì Task nhỏ.

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

Ngoài ra chạy targeted test, typecheck, integration test, migration verification hoặc Supabase verification khi cần.

Khi kiểm tra fail:

1. Ghi rõ command và lỗi.
2. Xác định lỗi thuộc scope hay ngoài scope.
3. Lỗi thuộc scope phải sửa, commit và chạy lại.
4. Lỗi ngoài scope ghi Known Issue/Bug candidate.
5. Không đánh dấu PASS hoặc Done khi test bắt buộc còn fail.

## 12. Progress và evidence

Sau mỗi Task, Story Review, Epic Review hoặc cuối phiên, cập nhật `WORKING-CONTEXT.md` và file phù hợp, ví dụ:

```text
work-context/sprint-1/sprint-1-progress.md
```

Evidence tối thiểu:

1. Jira key và technical status.
2. Exact branch.
3. Commit SHA, PR, base `develop` và merge SHA.
4. File/phạm vi đã thay đổi.
5. Test command và kết quả.
6. CI result.
7. Prisma/Supabase evidence hoặc `N/A` hợp lệ.
8. Manual demo evidence nếu có.
9. Known Issues và Bug candidates.
10. `Recommended Jira status`.
11. Next Action.

Không tick hoàn thành khi mới làm một phần. Không ghi PASS nếu test fail. Trạng thái chưa đủ phải ghi rõ `Partial`, `Blocked` hoặc `Known Issue`.

## 13. Xử lý Bug và hotfix

- Khi phát hiện lỗi, xác định mức độ ảnh hưởng, bước tái hiện, kết quả mong đợi và kết quả thực tế.
- Bug thuộc scope Task hiện tại phải được sửa trước khi Task PASS.
- Bug ngoài scope phải được ghi thành Bug candidate với module, mức độ, evidence và đề xuất Jira key; chỉ triển khai sau khi có Task/Bug branch phù hợp.
- Hotfix vẫn phải có branch riêng, Jira key, targeted test, PR vào `develop` và Merge Gate; không được dùng lý do khẩn cấp để push trực tiếp.
- Sau khi sửa, thêm regression test khi hợp lý để ngăn lỗi tái diễn.

## 14. Checklist kết thúc Task

Trước khi báo hoàn thành, xác nhận:

- Đúng Task/Bug và đúng branch.
- Context đã đọc, plan đã thực hiện.
- Diff tối thiểu và đúng scope.
- Code review đã hoàn tất.
- Test/build phù hợp PASS.
- Supabase verification PASS hoặc N/A hợp lệ.
- Không có secret, conflict hoặc file ngoài scope.
- Commit đúng format và có Jira key.
- PR target `develop`, CI PASS, Merge Gate PASS.
- Merge đã được xác minh trên `develop`.
- Progress/evidence đã cập nhật.
- Jira status chỉ được đề xuất cho Project Owner.
- Không merge `develop` vào `main`.
