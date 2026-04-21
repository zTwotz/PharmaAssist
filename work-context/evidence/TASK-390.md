# PAC-TASK-390 / TASK-390: Add Graph Sync traceability notes

## 1. Graph Sync Traceability Architecture

The PharmaAssist Graph Sync mechanism establishes traceability from the source of truth (PostgreSQL) to the read projection (Neo4j) through the `GraphSyncOutbox` and `GraphSyncAttempt` structures.

### 1.1 Outbox Events
Mọi thay đổi từ các bảng cốt lõi (`Medicine`, `ActiveIngredient`, `MedicineIngredientMapping`, `DrugInteractionRule`) đều được phát sinh thành một Outbox event trong cùng một PostgreSQL transaction.
- **Entity Type (`aggregateType`)**: Lưu trữ phân loại entity (VD: `MEDICINE`, `ACTIVE_INGREDIENT`).
- **Entity ID (`aggregateId`)**: Lưu ID của bản ghi để truy xuất và deduplication.
- **Event Type (`eventType`)**: Lưu trữ loại hành động (Upsert, Deactivate, Delete).
- **Source Version (`sourceVersion`)**: Lưu trữ version của bản ghi PostgreSQL tại thời điểm thay đổi.
- **Payload (`payload`)**: Snapshot dữ liệu cần thiết của bản ghi tại thời điểm thay đổi.
- **Created At (`createdAt`)**: Thời gian tạo thay đổi để xử lý thứ tự đồng bộ và freshness.

### 1.2 Trạng thái đồng bộ (Sync Status)
Mỗi event sẽ trải qua các trạng thái:
- `PENDING`: Event mới được tạo.
- `PROCESSING`: Event đang được GraphSyncWorker xử lý.
- `SUCCEEDED`: Đã đồng bộ thành công sang Neo4j.
- `FAILED`: Đồng bộ thất bại sau số lần thử (retry) tối đa.
- `RETRY_SCHEDULED`: Lỗi tạm thời, chờ để retry.

### 1.3 Retry & Lịch sử Attempt
- Lịch sử đồng bộ chi tiết của từng event được ghi nhận thông qua mô hình `GraphSyncAttempt` (nếu cấu hình) hoặc thông qua việc track `retryCount` cùng `lastError` trong `GraphSyncOutbox`.
- Max retries (VD: 5 lần) được thiết lập với cơ chế exponential backoff (mô phỏng).
- Mọi lỗi đều được ghi log chi tiết vào hệ thống logger của NestJS.

## 2. Graph Freshness Validation
- Thông qua `GraphFreshnessService`, hệ thống cung cấp API để kiểm tra độ trễ (staleness) của Neo4j.
- Bằng cách so sánh `sourceVersion` trên PostgreSQL Outbox và `sourceVersion` đã projection trên Neo4j, hệ thống đảm bảo UI hoặc GraphRAG biết được liệu dữ liệu graph đã hội tụ (converged) hay chưa.

## 3. Evidence
- Tất cả unit tests và integration tests cho Worker, Outbox event generation và Freshness Service đã vượt qua (PASS).
- Traceability hoàn chỉnh, cho phép truy vết mọi cập nhật từ Postgres sang Neo4j mà không đánh mất context hay version data.
