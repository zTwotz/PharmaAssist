Dưới đây là **danh sách Component đầy đủ của dự án PharmaAssist AI Intelligence** sau khi đã cập nhật theo baseline mới: **không dùng `Advanced Documentation`**, mọi tài liệu MVP và nâng cao dùng chung Component **Documentation**.

Tổng cộng: **34 Component**.

---

## 1. Components MVP / Core

| Component                       | Description                                                                                                                                                     |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Auth & RBAC**                 | Quản lý các issue liên quan đến Supabase Auth, đăng nhập, đăng xuất, session, hồ sơ người dùng, multi-role RBAC, permission và phân quyền theo phạm vi dữ liệu. |
| **Medicine & ActiveIngredient** | Quản lý các issue liên quan đến thuốc, hoạt chất, mapping thuốc-hoạt chất, tìm kiếm thuốc, danh mục thuốc cơ bản và dữ liệu nền cho interaction/graph.          |
| **Supplier**                    | Quản lý các issue liên quan đến nhà cung cấp, thêm/sửa/xem supplier, Admin deactivate supplier và liên kết supplier với nhập kho.                               |
| **Inventory & MedicineBatch**   | Quản lý các issue liên quan đến tồn kho theo MedicineBatch, batch number, expiry date, sellable quantity, low-stock, near-expiry và loại trừ batch hết hạn.     |
| **Stock Import**                | Quản lý các issue liên quan đến phiếu nhập kho, dòng nhập, batch identity, confirm nhập kho, merge batch đúng điều kiện và reject khi sai expiry date.          |
| **Inventory Adjustment**        | Quản lý các issue liên quan đến điều chỉnh tồn kho bằng workflow riêng, bắt buộc reason/audit và không cho sửa trực tiếp số lượng batch.                        |
| **POS & Checkout**              | Quản lý các issue liên quan đến POS, Draft Order, thêm thuốc vào đơn, checkout transaction, FEFO allocation, payment, invoice và rollback/idempotency.          |
| **InteractionAlert**            | Quản lý các issue liên quan đến rule tương tác ActiveIngredient-level, hiển thị cảnh báo, lưu InteractionAlert, HIGH acknowledgement và consultation note.      |
| **AI Guardrail & Audit**        | Quản lý các issue liên quan đến AI Copilot, Google AI provider, MockAI fallback, prompt version, input/output guardrail và AI Audit Log.                        |
| **Graph Sync & Graph-RAG**      | Quản lý các issue liên quan đến Graph Sync outbox/worker, Neo4j projection, graph freshness, Graph-RAG, provenance và PostgreSQL fallback.                      |
| **Reports**                     | Quản lý các issue liên quan đến báo cáo MVP: doanh thu, thuốc bán chạy, tồn kho, dashboard cơ bản và các filter cần thiết.                                      |
| **Data & Demo**                 | Quản lý các issue liên quan đến seed data, demo users, demo scenario, demo reset local-only, rebuild graph và smoke test sau reset.                             |
| **Testing & Setup**             | Quản lý các issue liên quan đến setup local, test API, test UI, smoke test, release checklist, demo readiness và test isolation.                                |

---

## 2. Supporting Components

| Component         | Description                                                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Documentation** | Quản lý các issue liên quan đến tài liệu dự án, README, setup guide, báo cáo, slide, traceability, demo script và toàn bộ tài liệu MVP/nâng cao. |
| **DevOps & CI**   | Quản lý các issue liên quan đến Git workflow, branch naming, Pull Request, GitHub Actions, CI quality gates, build và release/demo freeze.       |

---

## 3. Components Should-have / Advanced

| Component                   | Description                                                                                                                                     |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Admin Graph Sync Status** | Quản lý các issue liên quan đến màn hình Admin xem trạng thái Graph Sync, failed jobs, retry/rebuild graph và freshness status.                 |
| **Graph Explorer**          | Quản lý các issue liên quan đến giao diện xem graph read-only cho Medicine, ActiveIngredient, CONTAINS và INTERACTS_WITH.                       |
| **AI Provider Settings UI** | Quản lý các issue liên quan đến màn hình cấu hình AI provider/model; backend config là bắt buộc nhưng UI cấu hình là Should-have.               |
| **Prompt Management UI**    | Quản lý các issue liên quan đến màn hình quản lý prompt template, prompt version, approve prompt và audit thay đổi prompt.                      |
| **System Audit Log UI**     | Quản lý các issue liên quan đến giao diện Admin xem audit log hệ thống; backend audit logging vẫn là yêu cầu bắt buộc.                          |
| **Supabase Storage**        | Quản lý các issue liên quan đến upload, lưu trữ và hiển thị ảnh thuốc hoặc tài liệu liên quan bằng Supabase Storage.                            |
| **Supabase Realtime**       | Quản lý các issue liên quan đến realtime update cho tồn kho/POS khi nhiều người thao tác, nhưng backend validation vẫn là nguồn kiểm tra chính. |
| **Notification**            | Quản lý các issue liên quan đến notification center, thông báo low-stock, near-expiry, system status và trạng thái đã đọc/chưa đọc.             |
| **Advanced Reports**        | Quản lý các issue liên quan đến biểu đồ nâng cao, export báo cáo, filter nâng cao và analytics mở rộng ngoài MVP.                               |
| **AI Business Narrative**   | Quản lý các issue liên quan đến AI tạo nhận xét/narrative cho báo cáo kinh doanh, không thay thế số liệu deterministic của báo cáo MVP.         |

---

## 4. Components Future / Commercial Expansion

| Component                         | Description                                                                                                                                               |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Customer Management**           | Quản lý các issue mở rộng liên quan đến hồ sơ khách hàng đầy đủ, lịch sử mua hàng, loyalty và customer portal; MVP chỉ hỗ trợ walk-in/anonymous customer. |
| **Online Commerce**               | Quản lý các issue tương lai liên quan đến storefront, cart, wishlist, online order và online checkout.                                                    |
| **Product Variant Catalog**       | Quản lý các issue tương lai liên quan đến product/product_variant catalog; MVP bán hàng theo `medicine_id`, không dùng product variant làm sales key.     |
| **Multi-store / Multi-warehouse** | Quản lý các issue tương lai liên quan đến nhiều cửa hàng/kho, tồn kho theo location và phân quyền theo chi nhánh.                                         |
| **Stock Transfer**                | Quản lý các issue tương lai liên quan đến chuyển kho/chuyển chi nhánh, transfer request, ship/receive và kiểm soát tồn kho theo điểm lưu trữ.             |
| **Forecasting**                   | Quản lý các issue tương lai liên quan đến dự báo hết hàng, demand forecast và reorder suggestion.                                                         |
| **Promotion / Coupon**            | Quản lý các issue tương lai liên quan đến khuyến mãi, coupon, discount rule, campaign và usage tracking.                                                  |
| **Shipping**                      | Quản lý các issue tương lai liên quan đến giao hàng, địa chỉ nhận hàng, phí vận chuyển và trạng thái shipment.                                            |
| **Review / CMS**                  | Quản lý các issue tương lai liên quan đến review, rating, bài viết, content page và CMS cho e-commerce.                                                   |

---

## 5. Components không dùng / Deprecated

| Component cũ               | Lý do không dùng                                                           | Component thay thế                                |
| -------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------- |
| **Frontend**               | Quá chung theo tầng kỹ thuật, nên dùng label `frontend` thay vì Component. | Component theo domain                             |
| **Backend**                | Quá chung theo tầng kỹ thuật, nên dùng label `backend` thay vì Component.  | Component theo domain                             |
| **Database**               | Quá chung theo tầng kỹ thuật, nên dùng label `database` hoặc `prisma`.     | Component theo domain                             |
| **Authentication**         | Tên cũ chưa bao phủ RBAC, permission và data scope.                        | Auth & RBAC                                       |
| **Admin Management**       | Quá rộng, dễ gộp sai user, settings, audit và permission.                  | Auth & RBAC / Documentation / System Audit Log UI |
| **Medicine Management**    | Chưa thể hiện ActiveIngredient là phần bắt buộc.                           | Medicine & ActiveIngredient                       |
| **Inventory Management**   | Dễ quay lại aggregate inventory thay vì MedicineBatch.                     | Inventory & MedicineBatch                         |
| **Sales POS**              | Chưa bao phủ checkout transaction, FEFO, payment và invoice.               | POS & Checkout                                    |
| **Drug Interaction Alert** | Tên cũ chưa thể hiện đầy đủ lifecycle persisted InteractionAlert.          | InteractionAlert                                  |
| **Payment & Invoice**      | Không tách khỏi checkout transaction trong baseline mới.                   | POS & Checkout                                    |
| **MockAI**                 | MockAI chỉ là fallback provider, không phải Component riêng.               | AI Guardrail & Audit                              |
| **Gemini Integration**     | Baseline dùng Google AI provider, không khóa tên Component theo Gemini.    | AI Guardrail & Audit                              |
| **Knowledge Graph**        | Tên cũ dễ hiểu là mock graph; baseline mới dùng Neo4j projection thật.     | Graph Sync & Graph-RAG                            |
| **Forecast**               | Không phải MVP, chuyển thành Future scope rõ ràng hơn.                     | Forecasting                                       |
| **Advanced Documentation** | Không dùng theo quyết định mới.                                            | Documentation                                     |
