# 📜 HIẾN PHÁP GIT & GITHUB WORKFLOW (PHARMAASSIST)

> Quy trình làm việc nhóm và tương tác với AI Assistant thông qua Git/GitHub, đảm bảo an toàn mã nguồn và lịch sử commit sạch sẽ.

---

## 1. MÔ HÌNH NHÁNH (BRANCHING MODEL)
Dự án áp dụng mô hình **Git Flow rút gọn**:
- 🔴 **`main`**: Code ổn định nhất, dùng để deploy/nộp bài. **Không code trực tiếp.** Chỉ nhận code từ `release/*` hoặc `hotfix/*`.
- 🟡 **`develop`**: Nhánh tích hợp (Integration Branch). Mọi nhánh tính năng đều tạo ra từ đây và gộp về đây.
- 🟢 **`feature/PAC-xxx-slug`**: Phát triển tính năng mới (ví dụ: `feature/PAC-12-login-page`).
- 🟠 **`fix/PAC-xxx-slug`** hoặc **`bugfix/PAC-xxx-slug`**: Sửa lỗi trong phát triển.
- 🔵 **`docs/PAC-xxx-slug`**: Viết tài liệu/UML.
- 🟣 **`release/vX.Y`**: Chuẩn bị demo/nộp bài. Tạo từ `develop`, merge vào `main` và `develop` sau khi ổn định.
- 🔴 **`hotfix/vX.Y.Z`**: Sửa lỗi khẩn cấp trên production/main. Tạo từ `main`, merge vào cả `main` và `develop`.

---

## 2. QUY TRÌNH LÀM VIỆC HẰNG NGÀY

### 2.1. Mô Hình Shared Repository (Dành cho thành viên có quyền ghi trực tiếp)
```bash
# Bước 1: Đồng bộ local develop với remote mới nhất
git checkout develop && git pull origin develop

# Bước 2: Tạo nhánh mới từ develop mới nhất
git checkout -b feature/PAC-xxx-ten-chuc-nang

# Bước 3: Code và kiểm tra local (chạy npm run dev, test, lint...)

# Bước 4: Cập nhật code mới nhất từ develop bằng Rebase (để giữ lịch sử sạch)
git fetch origin
git rebase origin/develop

# Bước 5: Lưu thay đổi (Commit theo chuẩn Conventional Commits)
git add .
git commit -m "feat(PAC-xxx): add payment flow"

# Bước 6: Đẩy nhánh lên GitHub
git push -u origin feature/PAC-xxx-ten-chuc-nang

# Bước 7: Tạo Pull Request (PR) trên GitHub
# Chọn luồng merge: feature/PAC-xxx-ten-chuc-nang ➡️ develop (Tuyệt đối KHÔNG merge thẳng vào main)
```

### 2.2. Mô Hình Forking Workflow (Dành cho thành viên fork dự án)
* **`upstream`**: Repository gốc (`https://github.com/TwotNguyenVN/PharmaAssist.git`)
* **`origin`**: Repository cá nhân đã fork (`https://github.com/<username>/PharmaAssist.git`)

```bash
# Cấu hình remote ban đầu (chỉ thực hiện 1 lần duy nhất sau khi clone)
git remote add upstream https://github.com/TwotNguyenVN/PharmaAssist.git

# Bước 1: Đồng bộ local develop với upstream mới nhất
git checkout develop && git pull upstream develop

# Bước 2: Tạo nhánh mới từ develop
git checkout -b feature/PAC-xxx-ten-chuc-nang

# Bước 3: Code và kiểm tra local

# Bước 4: Cập nhật code mới từ upstream bằng Rebase trước khi push
git fetch upstream
git rebase upstream/develop

# Bước 5: Lưu thay đổi (Commit theo chuẩn Conventional Commits)
git add .
git commit -m "feat(PAC-xxx): add payment flow"

# Bước 6: Đẩy nhánh lên repository cá nhân đã fork (origin)
git push -u origin feature/PAC-xxx-ten-chuc-nang

# Bước 7: Tạo Pull Request từ repo fork cá nhân sang repo gốc
# Chọn luồng merge: member-username/PharmaAssist:feature/PAC-xxx ➡️ TwotNguyenVN/PharmaAssist:develop
```

### 2.3. Đối với Trưởng nhóm (Leader)
- Bảo vệ nhánh `main` và `develop` trên GitHub (Require PR, require approvals, block direct push).
- Review PR, kiểm tra conflict, chạy test tích hợp và thực hiện merge trên GitHub Web.
- Gộp `release/*` / `hotfix/*` vào `main`, tạo Git Tag tương ứng (ví dụ: `v1.0`, `v1.0.1`) và đồng bộ ngược về `develop`.
- **Đồng bộ ngược khi develop đi sau main (behind main):**
  ```bash
  git checkout develop && git fetch origin
  git merge origin/main && git push origin develop
  ```

---

## 3. NGUYÊN TẮC VÀNG KHI PUSH & COMMIT
1. **Kiểm tra biên dịch & lint local**: Chạy build/lint trước khi push. Tuyệt đối không push code lỗi biên dịch.
2. **Tuyệt đối KHÔNG dùng Force Push (`git push -f`)**: Không force push trên các nhánh dùng chung (`main`, `develop`).
3. **Kéo code trước khi đẩy**: Luôn pull trước khi push để giải quyết xung đột ở local.
4. **Bảo mật**: Không push file nhạy cảm (`.env`, credentials, node_modules, build artifacts). Cập nhật đầy đủ `.gitignore`.
5. **Conventional Commits**: Định dạng commit: `<type>(PAC-xxx): <description>` (Ví dụ: `feat(PAC-12): add Google login button`).
   - Các type: `feat` (tính năng), `fix` (sửa lỗi), `docs` (tài liệu), `style` (giao diện/format), `refactor` (tối ưu code), `chore` (cấu hình/package).

---

## 4. XỬ LÝ XUNG ĐỘT (CONFLICTS)
- Xảy ra khi nhiều người sửa cùng một vùng code. 
- Tìm các file bị xung đột (có ký tự `<<<<<<<`, `=======`, `>>>>>>>`).
- Sử dụng công cụ VS Code/IDE để chọn:
  - **Accept Current Change**: Giữ code local của bạn.
  - **Accept Incoming Change**: Giữ code kéo từ remote về.
  - **Accept Both Changes**: Giữ và kết hợp cả hai.
- **Lưu ý:** Không chọn bừa nếu chưa hiểu code. Hãy trao đổi với người viết đoạn code đó để cùng giải quyết. Sau khi sửa xong:
  ```bash
  git add .
  git commit -m "chore(PAC-xxx): resolve merge conflicts"
  git push
  ```

---

## 5. QUY TRÌNH GIT LIÊN TỤC (CI/CD WORKFLOW)
> Quy trình tích hợp liên tục (CI) được áp dụng để tăng tốc độ phát triển và tự động hóa với Jira.

1. **Quy Tắc Đặt Tên Commit Tuyệt Đối**: 
   - 100% thông điệp commit (commit message) phải được viết bằng **Tiếng Anh**.
   - **Tuyệt đối KHÔNG** sử dụng các từ khóa nhạy cảm như: `AI`, `Agent`, `Antigravity`, `ChatGPT`, `automation`, `bot`, v.v. trong commit message. Hãy viết như một lập trình viên thực thụ.
2. **Tiếp nhận yêu cầu & Đọc Jira**: Tra cứu mã Jira (VD: `PAC-123`) để phân tích yêu cầu chi tiết.
3. **Cập nhật mã nguồn**: Checkout về nhánh `develop` và chạy `git pull` để lấy code mới nhất.
4. **Phân nhánh độc lập**: Tạo nhánh mới từ `develop` chứa mã Jira: `git checkout -b feature/PAC-123-ten-tinh-nang`.
5. **Lập trình & Kiểm thử**: Viết code, chạy build/test để đảm bảo không có lỗi TypeScript hay Syntax.
6. **Đóng gói mã nguồn**: Commit code theo chuẩn Conventional Commits (có mã Jira): `git add . && git commit -m "feat(PAC-123): implement user feature"`.
7. **Đẩy code (Push)**: Đẩy nhánh tính năng lên GitHub bằng lệnh `git push -u origin feature/PAC-123-ten-tinh-nang`.
8. **Tạo & Gộp Pull Request vào develop**: 
   - Tạo PR: `gh pr create --title "feat(PAC-123): ..." --body "..." --base develop`
   - Merge PR: `gh pr merge --merge` (Lưu ý: TUYỆT ĐỐI KHÔNG xóa nhánh feature để giữ lịch sử báo cáo với giảng viên).
9. **Đồng bộ production (Gộp vào main)**: Tạo tiếp PR từ `develop` vào `main` và tự động merge để đưa tính năng lên production ngay lập tức.
10. **Cập nhật Jira**: Tự động chuyển trạng thái của ticket `PAC-123` trên Jira sang **"Done"**.
11. **Dọn dẹp local**: Checkout lại về `develop` và pull code mới nhất, sẵn sàng nhận ticket tiếp theo.

---

## 6. THAM CHIẾU NHANH CÁC LỆNH GIT

| Thao tác | Lệnh thực hiện |
| :--- | :--- |
| Kiểm tra trạng thái | `git status` |
| Cập nhật code develop | `git checkout develop && git pull origin develop` |
| Tạo nhánh feature | `git checkout -b feature/PAC-xxx-slug` |
| Lưu thay đổi (Commit) | `git add . && git commit -m "feat(PAC-xxx): description"` |
| Đẩy code (Push) | `git push -u origin feature/PAC-xxx-slug` |
| Đồng bộ develop vào feature | `git fetch origin && git merge origin/develop` |
| Cất code tạm thời | `git stash` ➡️ `git stash pop` (lấy ra lại) |
| Xem lịch sử rút gọn | `git log --oneline -n 10` |
