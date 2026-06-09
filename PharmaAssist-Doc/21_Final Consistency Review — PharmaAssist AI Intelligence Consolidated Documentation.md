# Final Consistency Review — PharmaAssist AI Intelligence Consolidated Documentation

## 1. Kết luận tổng quan

Bộ tài liệu **Document 01–20** hiện đã đủ cấu trúc để trở thành bộ **consolidated documentation chính thức** cho dự án **PharmaAssist AI Intelligence**.

Các baseline quan trọng đã được giữ đúng xuyên suốt:

1. Frontend dùng **Next.js**.
2. Backend dùng **NestJS / Node.js**.
3. ORM dùng **Prisma**.
4. Authentication dùng **Supabase Auth**.
5. Không lưu `password` / `password_hash` trong PostgreSQL.
6. PostgreSQL là **source of truth**.
7. Neo4j là **graph projection**.
8. Graph Sync là MVP, có outbox/worker/retry/audit/freshness.
9. Graph-RAG là module riêng.
10. Google AI Provider là provider ưu tiên.
11. MockAI chỉ là fallback.
12. MedicineBatch là source of truth cho inventory.
13. Checkout là transaction chính thức.
14. Checkout áp dụng FEFO.
15. Payment/Invoice được tạo trong checkout transaction.
16. DrugInteraction Rule ở cấp ActiveIngredient–ActiveIngredient.
17. InteractionAlert phải persist.
18. HIGH alert cần acknowledgement và consultation note trước checkout.
19. AI Guardrail và AI Audit là MVP.
20. Database 100 bảng là extended/commercial design, không phải full MVP.
21. Catalog data chỉ là reference, MVP cần curated operational seed.
22. Jira cũ cần major revision theo baseline mới.
23. `demo:reset` chỉ được chạy local.
24. Testing tập trung high-risk modules: Checkout, FEFO, Interaction, AI Guardrail.

Không phát hiện lỗi baseline nghiêm trọng cần viết lại toàn bộ tài liệu.

Tuy nhiên, trước khi chốt final, nên xử lý **7 nhóm vấn đề**:

1. Kiểm soát trùng lặp giữa Document 01/02/03/04/05/06.
2. Chuẩn hóa thuật ngữ/naming.
3. Làm rõ một số điểm scope đang hơi mơ hồ.
4. Tăng độ chặt của traceability.
5. Chuẩn hóa AI Audit UI/API/backend scope.
6. Chuẩn hóa Graph source version/freshness strategy.
7. Chuẩn hóa demo/test/release ownership còn unresolved.

---

# 2. Review theo baseline

## 2.1. Baseline công nghệ

| Baseline                              | Trạng thái trong bộ tài liệu | Nhận xét |
| ------------------------------------- | ---------------------------- | -------- |
| Next.js frontend                      | Consistent                   | OK       |
| NestJS / Node.js backend              | Consistent                   | OK       |
| Prisma ORM                            | Consistent                   | OK       |
| Supabase Auth                         | Consistent                   | OK       |
| PostgreSQL source of truth            | Consistent                   | OK       |
| Neo4j projection                      | Consistent                   | OK       |
| Google AI Provider preferred          | Consistent                   | OK       |
| MockAI fallback only                  | Consistent                   | OK       |
| Docker không phải official setup path | Consistent trong Doc20       | OK       |

Kết luận: **Không có vấn đề lớn về technology baseline.**

---

## 2.2. Baseline nghiệp vụ

| Baseline nghiệp vụ                         | Trạng thái        | Nhận xét                                                   |
| ------------------------------------------ | ----------------- | ---------------------------------------------------------- |
| Supplier Management là MVP                 | Consistent        | OK                                                         |
| MedicineBatch là source of truth           | Consistent        | OK                                                         |
| FEFO checkout                              | Consistent        | OK                                                         |
| Stock Import tạo/cập nhật batch            | Consistent        | OK                                                         |
| Inventory Adjustment có reason/audit       | Consistent        | OK                                                         |
| Checkout là transaction chính              | Consistent        | OK                                                         |
| Payment SUCCESS/FAILED                     | Consistent        | OK                                                         |
| One successful payment per order           | Consistent        | OK                                                         |
| Invoice chỉ sau successful checkout        | Consistent        | OK                                                         |
| DrugInteraction ở ActiveIngredient level   | Consistent        | OK                                                         |
| InteractionAlert persist                   | Consistent        | OK                                                         |
| HIGH alert cần ack + note                  | Consistent        | OK                                                         |
| Customer Management không phải MVP blocker | Mostly consistent | Cần nhắc lại trong Doc05/06/15 nếu có chỗ mention Customer |
| Refund/return out of MVP                   | Consistent        | OK                                                         |

Kết luận: **Nghiệp vụ chính bám baseline tốt.**

---

## 2.3. Baseline AI / Graph

| Baseline AI/Graph                      | Trạng thái | Nhận xét                                |
| -------------------------------------- | ---------- | --------------------------------------- |
| AI Guardrail MVP                       | Consistent | OK                                      |
| AI Audit MVP                           | Consistent | Cần làm rõ UI/API/backend scope         |
| Prompt versioning                      | Consistent | OK                                      |
| No AI diagnosis/prescribing/dosage     | Consistent | OK                                      |
| AI draft không auto-save official note | Consistent | OK                                      |
| Graph-RAG riêng với AI Copilot         | Consistent | OK                                      |
| Graph Sync mandatory                   | Consistent | OK                                      |
| Graph freshness detection              | Consistent | Cần chọn source version strategy rõ hơn |
| PostgreSQL fallback khi graph stale    | Consistent | OK                                      |
| Pure graph query safe error            | Consistent | OK                                      |
| No raw Cypher for Staff                | Consistent | OK                                      |
| No DrugGroup nếu chưa taxonomy         | Consistent | OK                                      |
| No riskScore impact                    | Consistent | OK                                      |

Kết luận: **AI/Graph đã đúng hướng, nhưng cần khóa rõ AI Audit UI và sourceVersion strategy.**

---

# 3. Vấn đề trùng lặp nội dung

## 3.1. Document 01 / 02 / 03 / 04 bị trùng tự nhiên

Các tài liệu này đều nói về baseline, scope, decision và project overview nên có trùng lặp.

### Đánh giá

Trùng lặp hiện tại **chấp nhận được**, nhưng cần giữ đúng vai trò:

| Document    | Nên giữ vai trò                                                 |
| ----------- | --------------------------------------------------------------- |
| Document 01 | Baseline tổng quan, snapshot hiện tại                           |
| Document 02 | Project Charter, mục tiêu/quản trị/stakeholder/success criteria |
| Document 03 | Product vision & scope                                          |
| Document 04 | Decision Log & Scope Control                                    |

### Cần tránh

Không để Document 01 biến thành SRS.

Không để Document 02 lặp quá nhiều baseline kỹ thuật chi tiết.

Không để Document 03 ghi API/database/test quá sâu.

Không để Document 04 trở thành một bản requirement dài.

### Đề xuất chỉnh

Trong final formatting, thêm câu phân vai ở đầu mỗi tài liệu:

* Document 01: “Tài liệu này chỉ cung cấp baseline tổng quan, chi tiết yêu cầu nằm ở Document 06.”
* Document 02: “Tài liệu này dùng để xác nhận khởi động dự án, không thay thế SRS.”
* Document 03: “Tài liệu này định nghĩa product scope, không đặc tả implementation.”
* Document 04: “Tài liệu này là nguồn kiểm soát quyết định và scope change.”

---

## 3.2. Document 05 và Document 06 có nguy cơ lặp business rules

### Hiện trạng

Document 05 mô tả business requirements.

Document 06 đặc tả software requirements.

Nội dung có thể lặp ở các rule như:

1. FEFO.
2. HIGH alert.
3. Checkout transaction.
4. Payment.
5. Graph Sync.
6. AI Guardrail.

### Đánh giá

Lặp ở mức này **được phép**, nhưng cách viết cần khác nhau.

### Cách phân biệt

| Document    | Cách viết                               |
| ----------- | --------------------------------------- |
| Document 05 | “Nhà thuốc cần…” / business need        |
| Document 06 | “Hệ thống phải…” / testable requirement |

Ví dụ:

Document 05:

```text
Nhà thuốc cần đảm bảo thuốc gần hết hạn được ưu tiên bán trước theo nguyên tắc FEFO.
```

Document 06:

```text
FR-CHK-xx: Khi checkout, hệ thống phải tự động phân bổ tồn kho từ MedicineBatch có expiry_date gần nhất trước, loại trừ batch đã hết hạn.
```

---

## 3.3. Document 13 và Document 14 có thể lặp database design

### Hiện trạng

Document 13 thiết kế database/ERD.

Document 14 chuyển sang Prisma/migration.

### Đánh giá

Trùng lặp model list là cần thiết, nhưng không nên giải thích business rule quá dài ở Document 14 nếu đã có ở Document 13.

### Đề xuất

Document 13 nên giữ:

1. Entity purpose.
2. Relationship.
3. Constraint conceptual.
4. ERD.
5. Data dictionary.

Document 14 nên giữ:

1. Prisma model strategy.
2. Enum mapping.
3. Relation syntax-level design.
4. Migration ordering.
5. Raw SQL constraints.
6. Seed order.
7. Prisma validation.

---

## 3.4. Document 18 và Document 20 có trùng demo reset

### Hiện trạng

Document 18 nói seed/demo data.

Document 20 nói setup/testing/demo reset.

### Đánh giá

Trùng nhẹ, nhưng hợp lý.

### Cách phân vai

| Document    | Nội dung chính                     |
| ----------- | ---------------------------------- |
| Document 18 | Seed gì, dữ liệu nào, scenario nào |
| Document 20 | Chạy setup/reset/test như thế nào  |

### Đề xuất

Ở Document 18, demo reset chỉ nên mô tả **data requirement**.

Ở Document 20, demo reset nên mô tả **runbook/setup/test execution**.

---

## 3.5. Document 19 và Document 20 có trùng release checklist

### Hiện trạng

Document 19 có release/demo plan.

Document 20 có release exit criteria.

### Đánh giá

Trùng hợp lý.

### Cách phân vai

| Document    | Nội dung chính                           |
| ----------- | ---------------------------------------- |
| Document 19 | Quản lý release, owner, Jira, CI, branch |
| Document 20 | Test exit, smoke, demo runbook           |

---

# 4. Review thuật ngữ và naming

## 4.1. Thuật ngữ đã nhất quán tốt

Các thuật ngữ sau đã được dùng đúng:

1. `MedicineBatch`
2. `ActiveIngredient`
3. `MedicineIngredient`
4. `DrugInteraction`
5. `InteractionAlert`
6. `Graph Sync`
7. `Graph-RAG`
8. `AI Copilot`
9. `AI Guardrail`
10. `AI Audit`
11. `MockAI`
12. `Google AI Provider`
13. `Supabase Auth`
14. `Prisma`
15. `Neo4j`
16. `PostgreSQL`
17. `Checkout`
18. `FEFO`
19. `Stock Import`
20. `Inventory Adjustment`

---

## 4.2. Thuật ngữ cần chuẩn hóa thêm

### 4.2.1. “Consultation note” vs “ghi chú tư vấn”

Nên chọn cách viết chính thức:

```text
consultation note / ghi chú tư vấn
```

Lần đầu trong mỗi tài liệu có thể ghi song song.

Sau đó dùng nhất quán:

```text
consultation note
```

Vì đây là field/rule quan trọng trong backend.

---

### 4.2.2. “AI Audit Log” vs “AI Audit”

Nên dùng:

```text
AI Audit
```

cho capability/module.

Dùng:

```text
AI Audit Log
```

cho screen/table/log cụ thể.

Ví dụ:

* Document 16: AI Audit design.
* Document 15: AI Audit Log screen.
* Document 13/14: `ai_audit_logs`.

---

### 4.2.3. “Graph Sync Status UI” vs “Graph Sync backend”

Cần chuẩn hóa:

| Term                 | Scope                  |
| -------------------- | ---------------------- |
| Graph Sync           | MVP backend capability |
| Graph Sync Outbox    | MVP database/backend   |
| Graph Sync Worker    | MVP backend            |
| Graph Sync Freshness | MVP backend            |
| Graph Sync Status UI | Should-have            |
| Manual retry UI      | Should-have            |

---

### 4.2.4. “Inventory” vs “MedicineBatch”

Cần đảm bảo không viết “Inventory source of truth” mà không giải thích.

Chuẩn:

```text
MedicineBatch là source of truth cho inventory.
Inventory Summary là dữ liệu derived từ MedicineBatch.
```

Không dùng:

```text
Inventory table là nơi lưu tồn kho chính.
```

---

### 4.2.5. “Payment status” vs “Order status”

Cần phân biệt rõ:

| Entity               | Enum                          |
| -------------------- | ----------------------------- |
| Order                | DRAFT / PAID / CANCELLED      |
| Payment              | SUCCESS / FAILED              |
| Stock Import         | DRAFT / CONFIRMED / CANCELLED |
| Inventory Adjustment | DRAFT / CONFIRMED / CANCELLED |

Không dùng `PAID` cho Payment status.

Không dùng `SUCCESS` cho Order status.

---

### 4.2.6. “Should-have” spelling

Nên dùng thống nhất:

```text
Should-have
```

Không xen kẽ:

1. Should have.
2. Should Have.
3. Nice-to-have.

---

### 4.2.7. “Future / Commercial Expansion”

Nên dùng thống nhất:

```text
Future / Commercial Expansion
```

Không dùng xen kẽ quá nhiều:

1. Future Scope.
2. Commercial Future.
3. Expansion.

Có thể ghi:

```text
Future / Commercial Expansion
```

là nhãn chính, còn “Future Scope” chỉ dùng giải thích.

---

# 5. Review traceability

## 5.1. Traceability tổng thể

Traceability hiện có ở hầu hết tài liệu:

1. BRD → SRS.
2. SRS → Use Case.
3. Use Case → UML.
4. SRS → API.
5. SRS/API → UI.
6. ERD → Prisma.
7. Data → Testing.
8. Jira → SRS/API/UI/Testing.
9. Testing → SRS/API/UI/Data.

Đây là điểm mạnh của bộ tài liệu.

---

## 5.2. Điểm còn yếu: requirement IDs chưa đủ granular

Hiện nhiều tài liệu dùng nhóm requirement như:

1. `FR-AUTH`
2. `FR-RBAC`
3. `FR-MED`
4. `FR-CHK`
5. `FR-AIA`
6. `FR-GRG`

Nhóm này hữu ích, nhưng nếu muốn traceability mạnh hơn, Document 06 nên có requirement ID chi tiết:

Ví dụ:

```text
FR-AUTH-01 — Login with Supabase Auth
FR-AUTH-02 — Resolve current user profile
FR-RBAC-01 — Assign role to user
FR-CHK-01 — Checkout Draft Order
FR-CHK-02 — Apply FEFO allocation
FR-CHK-03 — Enforce idempotency
FR-ALT-01 — Persist InteractionAlert
FR-ALT-02 — Require HIGH acknowledgement
FR-ALT-03 — Require HIGH consultation note
FR-AIA-01 — Record AI Audit Log
FR-GSY-01 — Create Graph Sync Outbox event
FR-GRG-01 — Execute Graph-RAG query with freshness check
```

### Recommendation

Trước final, tạo một bảng **Requirement ID Registry** trong Document 06.

Sau đó các tài liệu sau có thể trace đến exact IDs.

---

## 5.3. Use Case ID cần chuẩn hóa

Document 08 nên có ID convention rõ hơn, ví dụ:

```text
UC-AUTH-01
UC-USER-01
UC-MED-01
UC-ACT-01
UC-SUP-01
UC-BAT-01
UC-STI-01
UC-ADJ-01
UC-POS-01
UC-CHK-01
UC-ALT-01
UC-AIC-01
UC-GRG-01
UC-RPT-01
UC-SET-01
UC-DMO-01
```

Document 09 UML nên dùng lại đúng các UC ID này.

---

## 5.4. API traceability cần map rõ hơn

Document 12 đã có API groups, nhưng trước final nên thêm bảng:

```text
Endpoint → FR ID → UC ID → UI Screen → Test Case
```

Ví dụ:

| Endpoint                                      | FR              | UC        | UI               | Test      |
| --------------------------------------------- | --------------- | --------- | ---------------- | --------- |
| `POST /checkout`                              | FR-CHK-01/02/03 | UC-CHK-01 | Checkout Route   | TC-CHK-01 |
| `POST /interaction-alerts/{id}/acknowledge`   | FR-ALT-02       | UC-ALT-02 | HIGH Alert Panel | TC-ALT-02 |
| `POST /ai/interaction-alerts/{id}/note-draft` | FR-AIC-02       | UC-AIC-02 | AI Copilot Panel | TC-AI-02  |
| `POST /graph-rag/query`                       | FR-GRG-01       | UC-GRG-01 | Graph-RAG Screen | TC-GRG-01 |

---

## 5.5. Testing traceability cần test case IDs

Document 20 rất đầy đủ về test scope, nhưng nếu muốn final mạnh hơn, nên thêm test case ID convention:

```text
TC-AUTH-01
TC-RBAC-01
TC-MED-01
TC-BAT-01
TC-STI-01
TC-ADJ-01
TC-POS-01
TC-CHK-01
TC-FEFO-01
TC-ALT-01
TC-AI-01
TC-GSY-01
TC-GRG-01
TC-RPT-01
TC-DMO-01
```

Không cần viết full test case trong Document 20 nếu quá dài, nhưng nên có ID naming convention để trace.

---

# 6. Nội dung có nguy cơ lệch baseline hoặc cần làm rõ

## 6.1. AI Audit UI scope đang hơi mơ hồ

### Hiện trạng

Một số chỗ viết:

```text
AI Audit Log nếu MVP/role phù hợp
```

hoặc:

```text
AI Audit Log if UI is included for MVP evidence
```

Trong khi baseline nói:

```text
AI Audit là MVP.
```

### Vấn đề

AI Audit backend chắc chắn là MVP.

Nhưng UI cho AI Audit có lúc được viết như tùy chọn.

### Đề xuất chuẩn hóa

Chốt wording như sau:

```text
AI Audit persistence/backend/API là MVP bắt buộc.
Admin AI Audit Log screen là MVP tối thiểu nếu cần chứng minh trực tiếp trên UI; nếu thời gian thiếu, Postman/log evidence có thể là contingency evidence nhưng không thay thế yêu cầu AI Audit backend.
```

Tốt nhất để bộ tài liệu mạnh hơn:

```text
Minimal Admin AI Audit Log screen = MVP.
Advanced AI observability dashboard = Should-have.
```

Cần cập nhật:

1. Document 15.
2. Document 16.
3. Document 20.
4. Document 19 Jira Epic AI.

---

## 6.2. Graph sourceVersion strategy cần khóa rõ

### Hiện trạng

Document 17 nói freshness dựa vào `sourceVersion`.

Document 14 nói có thể dùng explicit version hoặc `updated_at`.

### Vấn đề

Baseline đã nói graph freshness dựa trên PostgreSQL source versions và outbox state, không chỉ elapsed time.

Nếu không có explicit source version, freshness sẽ yếu hơn.

### Đề xuất

Nên chốt:

```text
MVP dùng explicit integer version field cho các graph-source tables:
- medicines.version
- active_ingredients.version
- medicine_ingredients.version
- drug_interactions.version
```

Mỗi update/deactivation tăng version.

GraphProjectionVersion lưu version đã project.

Nếu team không kịp thêm `version`, fallback có thể là `updated_at`, nhưng phải ghi là implementation simplification.

### Cần cập nhật

1. Document 13 — thêm `version` cho graph-source tables.
2. Document 14 — thêm Prisma field `version Int @default(1)`.
3. Document 17 — ghi explicit source version là recommended MVP.
4. Document 20 — thêm smoke check graph source version/projection version.

---

## 6.3. ConsultationSessions không phải MVP table

### Hiện trạng

Document 18 seed groups có nhắc `ConsultationSessions`.

Sau đó đã giải thích rằng MVP không cần separate `DraftNote` hoặc separate `ConsultationSession`.

### Vấn đề

Tên `ConsultationSessions` có thể gây hiểu nhầm rằng cần table mới.

### Đề xuất sửa

Trong Document 18, đổi seed group:

Từ:

```text
ConsultationSessions
```

Thành:

```text
InteractionAlert consultation evidence
```

Hoặc:

```text
Consultation note evidence on InteractionAlert
```

Và ghi rõ:

```text
No separate ConsultationSession table is required for MVP.
```

---

## 6.4. AIProviderConfig model optional nhưng provider configuration mandatory

### Hiện trạng

Document 14 có đoạn:

```text
AIProviderConfig optional MVP depending implementation
```

Document 16 nói:

```text
Provider/model configuration mandatory; may be env/database.
```

### Vấn đề

Không mâu thuẫn nếu hiểu đúng, nhưng wording có thể gây nhầm.

### Đề xuất chuẩn hóa

Ghi rõ:

```text
Provider/model configuration is mandatory.
The AIProviderConfig database model is optional if configuration is supplied through environment variables for MVP.
```

Cần cập nhật:

1. Document 14.
2. Document 16.
3. Document 20.

---

## 6.5. Graph Sync Status API/UI là Should-have, nhưng Graph Sync backend là MVP

### Hiện trạng

Một số nơi ghi:

```text
Graph Sync status APIs nếu Should-have
```

Điều này đúng với API/UI quản trị, nhưng không được làm mờ yêu cầu Graph Sync backend.

### Đề xuất chuẩn hóa

Ghi rõ:

```text
Graph Sync backend, outbox, worker, retry, attempts, freshness detection are MVP.
Admin Graph Sync Status/retry API/UI is Should-have.
```

Cần cập nhật:

1. Document 12.
2. Document 15.
3. Document 17.
4. Document 19.
5. Document 20.

---

## 6.6. System Audit UI và AuditLog backend cần phân biệt

### Hiện trạng

AuditLog backend xuất hiện trong database/module.

System Audit Log UI có lúc được để Should-have.

### Đề xuất chuẩn hóa

```text
AuditLog backend/audit recording for critical operations is MVP.
Full Admin System Audit Log UI is Should-have.
```

Điều này tránh hiểu nhầm rằng audit không cần trong MVP.

---

## 6.7. Demo/staging environment vẫn unresolved

### Hiện trạng

Document 19 ghi dedicated demo/staging environment unresolved.

Document 20 có setup primary local + cloud Supabase/Neo4j.

### Đánh giá

Không sai, nhưng trước final nên giữ rõ:

```text
A dedicated demo/staging environment is recommended but unresolved.
Local is official for demo reset.
demo:reset must not run against demo/staging/production.
```

---

# 7. Review theo từng tài liệu

## Document 01 — Project Overview & Current Baseline

### Trạng thái

Ổn.

### Cần kiểm tra

1. Không quá dài thành SRS.
2. Không mô tả API/ERD quá chi tiết.
3. Có đủ danh sách 20 documents.
4. Có “decisions not to return”.
5. Có unresolved decisions summary.

### Đề xuất

Giữ Document 01 như baseline snapshot.

---

## Document 02 — Project Charter

### Trạng thái

Ổn.

### Cần kiểm tra

1. Success criteria không quá kỹ thuật.
2. Stakeholder rõ.
3. Timeline summary có deadline trước 17/06/2026.
4. Release freeze target 16/06/2026.
5. Approval section có placeholder.

### Đề xuất

Nên giữ ở góc quản trị dự án, không lặp SRS.

---

## Document 03 — Vision & Scope

### Trạng thái

Ổn.

### Cần kiểm tra

1. MVP/Should-have/Future/Out of Scope phân biệt rõ.
2. Product vision không quá kỹ thuật.
3. Implementation priority rõ.
4. Demo flows ở mức định hướng.

### Đề xuất

Không thêm API/database chi tiết vào Document 03.

---

## Document 04 — Decision Log & Scope Control

### Trạng thái

Rất quan trọng.

### Cần bổ sung nếu chưa có

1. Decision IDs.
2. Replaced decisions.
3. Unresolved decisions.
4. Scope change template.
5. Impact matrix.

### Đề xuất

Nên biến Document 04 thành nguồn kiểm soát khi final.

---

## Document 05 — BRD

### Trạng thái

Ổn.

### Cần kiểm tra

1. Business requirement viết ở góc “nhà thuốc cần”.
2. Không dùng requirement ID quá kỹ như SRS.
3. Không viết API endpoint.
4. Các nhóm business requirement khớp với SRS.

### Đề xuất

Nên thêm bảng BRD → SRS groups.

---

## Document 06 — SRS

### Trạng thái

Đây là tài liệu lõi.

### Cần cải thiện trước final

1. Thêm exact requirement IDs.
2. Mỗi FR nên có priority/scope.
3. Mỗi FR nên có acceptance criteria ngắn.
4. NFR nên có ID.
5. Business rules nên có BR IDs.
6. Error handling requirements nên trace sang API.
7. Authorization summary trace sang Document 07.

### Đề xuất lớn

Tạo requirement ID registry trong Document 06.

---

## Document 07 — Roles, Permissions & Authorization

### Trạng thái

Ổn.

### Cần kiểm tra

1. Staff không thấy general inventory dashboard.
2. Warehouse không thấy POS/InteractionAlert/AI sales/Graph-RAG.
3. Admin all access.
4. Permission matrix đủ module.
5. Ownership rules rõ cho Staff orders.
6. Future permission `customer.order_history.read_all` không biến thành MVP bắt buộc.

### Đề xuất

Permission key naming nên thống nhất toàn bộ docs.

---

## Document 08 — Use Case Specification

### Trạng thái

Ổn.

### Cần cải thiện

1. Chuẩn hóa UC ID.
2. MVP/Should-have/Future UC list rõ.
3. HIGH Alert Handling phải là use case riêng.
4. Checkout phải là use case riêng.
5. Graph-RAG phải là use case riêng.
6. Demo Reset có thể là technical/admin use case.

### Đề xuất

Use Case ID phải được dùng lại trong Document 09, 12, 15, 20.

---

## Document 09 — UML Diagram Package

### Trạng thái

Ổn.

### Cần kiểm tra

1. Customer không là authenticated MVP actor.
2. AI components không là primary human actors.
3. Không dùng custom JWT sequence.
4. Không dùng aggregate inventory class.
5. Không dùng Medicine-level interaction official model.
6. Class diagrams có MedicineBatch, ActiveIngredient, InteractionAlert, GraphSyncOutbox.

### Đề xuất

Trước final nên render hoặc chuẩn bị PlantUML/Mermaid appendices.

---

## Document 10 — System Architecture

### Trạng thái

Ổn.

### Cần kiểm tra

1. Next.js/NestJS/Prisma/Supabase đúng.
2. PostgreSQL source of truth rõ.
3. Neo4j projection rõ.
4. AI/Graph chỉ overview, không lặp Document 16/17 quá sâu.
5. Failure/fallback strategy có đủ:

   * AI fallback.
   * Graph fallback.
   * Checkout rollback.
   * PostgreSQL fallback.

---

## Document 11 — Module Design

### Trạng thái

Ổn.

### Cần kiểm tra

1. Module boundaries không overlap quá mức.
2. Checkout module là transaction owner.
3. Payment/Invoice module không có command hoàn tất order riêng ngoài checkout.
4. Inventory module không direct-edit quantity.
5. Graph module không tự sửa PostgreSQL.
6. AI module không tự lưu official note.

---

## Document 12 — API Specification

### Trạng thái

Rất quan trọng.

### Cần kiểm tra mạnh

1. Không có `POST /orders/{id}/pay` là main command.
2. Không có public direct invoice creation command.
3. Checkout API là command chính.
4. InteractionAlert ack/note APIs riêng.
5. AI draft API không save official note.
6. Payment APIs là read/history, không thay checkout.
7. Graph APIs không expose raw Cypher.
8. Graph Sync Status APIs nếu có thì Should-have.
9. Error format thống nhất.
10. Idempotency header/body convention rõ.

### Đề xuất

Thêm endpoint-to-FR/UC/UI/Test matrix.

---

## Document 13 — Database Design & ERD

### Trạng thái

Rất quan trọng.

### Cần kiểm tra mạnh

1. Không có password/password_hash.
2. Không có aggregate inventory source of truth.
3. MedicineBatch đầy đủ.
4. Stock Import details có batch/expiry mandatory.
5. Inventory Adjustment tables có reason/audit.
6. Payment supports failed attempts.
7. Partial unique SUCCESS payment.
8. InteractionAlert có display_count, first/last_displayed, ack/note.
9. DrugInteraction ActiveIngredient-level.
10. Graph Sync Outbox exists.
11. AI Audit exists.
12. SystemSetting exists.
13. IdempotencyRecord exists.
14. Add graph-source `version` strategy.

### Đề xuất quan trọng

Thêm explicit `version` field cho graph-source tables.

---

## Document 14 — Prisma Schema & Migration Design

### Trạng thái

Tốt.

### Cần chỉnh wording

1. AIProviderConfig model optional nhưng config mandatory.
2. Graph source version nên explicit.
3. Raw SQL partial indexes cần liệt kê đầy đủ.
4. Ensure no Customer MVP model unless marked Should-have.
5. Ensure no ConsultationSession MVP table.

---

## Document 15 — UI/UX Screen Specification

### Trạng thái

Rất tốt.

### Cần chỉnh

1. AI Audit Log UI scope cần thống nhất là MVP minimal hoặc clear Should-have.
2. Graph Sync Status screen Should-have, không MVP.
3. Staff không thấy inventory dashboard widgets đã đúng.
4. MedicineBatch không top-level sidebar đã đúng.
5. Checkout route/panel đã đúng.
6. Warehouse no AI/Graph in MVP đã đúng.

### Đề xuất

Chốt:

```text
Minimal Admin AI Audit Log screen = MVP.
Advanced AI observability = Should-have.
```

---

## Document 16 — AI Architecture, Guardrail & Audit

### Trạng thái

Rất tốt.

### Cần kiểm tra

1. Không có diagnosis/prescribing/dosage.
2. AI draft không official note.
3. Prompt versioning rõ.
4. PII redaction rõ.
5. Google AI preferred.
6. MockAI fallback only.
7. AI Audit fields đủ.
8. Graph-RAG integration không nuốt mất Graph-RAG module riêng.

### Đề xuất

Thêm explicit distinction:

```text
AI Copilot explains/generates draft.
Graph-RAG retrieves/provides graph context and provenance.
```

---

## Document 17 — Knowledge Graph, Neo4j Sync & Graph-RAG

### Trạng thái

Rất tốt.

### Cần chỉnh

1. Source version strategy cần chốt.
2. Graph Sync Status UI là Should-have.
3. No raw Cypher rõ.
4. No DrugGroup/riskScore rõ.
5. PostgreSQL fallback rõ.
6. Pure graph safe error rõ.

### Đề xuất

Thêm subsection:

```text
MVP Source Version Implementation Decision
```

và chọn explicit version field.

---

## Document 18 — Data Strategy, Catalog Reference & MVP Seed Plan

### Trạng thái

Rất tốt.

### Cần chỉnh

1. Đổi `ConsultationSessions` thành `InteractionAlert consultation evidence`.
2. Nhấn mạnh không seed separate ConsultationSession table.
3. Catalog data reference only đã tốt.
4. Dynamic expiry date đã tốt.
5. FEFO scenario đã tốt.
6. Graph projection from PostgreSQL đã tốt.

### Đề xuất

Thêm seed ID convention:

```text
USR_ADMIN_DEMO
MED_WARFARIN_5
ING_WARFARIN
INT_WARFARIN_ASPIRIN_HIGH
ORD_DRAFT_HIGH_UNRESOLVED
```

---

## Document 19 — Project Management, Jira & Release Plan

### Trạng thái

Tốt.

### Cần xử lý trước final

1. Release/Demo Owner unresolved.
2. Backup unresolved.
3. Capacity unresolved.
4. Dedicated demo/staging unresolved.
5. Testing stack unresolved.

### Đề xuất

Giữ unresolved nếu chưa chốt, nhưng thêm “must resolve before release freeze”.

---

## Document 20 — Testing, Demo & Setup Guide

### Trạng thái

Rất tốt.

### Cần chỉnh

1. Không yêu cầu separate PostgreSQL DB đã đúng.
2. Không Docker official đã đúng.
3. No destructive tests against demo DB đã đúng.
4. High-risk tests đầy đủ.
5. AI Audit UI/evidence wording cần đồng bộ với Doc15/16.
6. Graph source version smoke check nên thêm nếu áp dụng.

### Đề xuất

Thêm test case ID convention và smoke result template.

---

# 8. Các lỗi mức độ Critical / Major / Minor

## 8.1. Critical issues

Không phát hiện **Critical Issue**.

Không có tài liệu nào quay lại các thiết kế bị cấm như:

1. Custom username/password/JWT.
2. Password hash in PostgreSQL.
3. Aggregate inventory source of truth.
4. Medicine-level interaction official rule.
5. MockAI-only MVP.
6. MockGraph-only MVP.
7. Payment/invoice ngoài checkout.
8. Full 100-table schema là MVP.
9. Bỏ HIGH ack/note.
10. Bỏ Graph Sync/freshness.

---

## 8.2. Major issues cần sửa trước final

### Major 01 — AI Audit UI scope ambiguity

Cần chốt wording:

```text
AI Audit backend/API is MVP.
Minimal Admin AI Audit Log screen is MVP for demo evidence.
Advanced AI observability is Should-have.
```

Nếu không muốn bắt buộc UI, phải ghi rõ Postman/log là contingency evidence, nhưng như vậy demo kém thuyết phục.

Khuyến nghị: **đưa minimal AI Audit Log screen vào MVP.**

---

### Major 02 — Graph sourceVersion strategy chưa khóa đủ

Cần chọn một trong hai:

Option recommended:

```text
Add explicit version field to graph-source tables.
```

Option fallback:

```text
Use updated_at + outbox event version, but mark as simplified MVP implementation.
```

Khuyến nghị: **dùng explicit `version` field**.

---

### Major 03 — Requirement traceability cần exact IDs

Document 06 nên có detailed requirement IDs.

Nếu không, các tài liệu sau trace theo group sẽ hơi yếu.

Khuyến nghị: thêm:

```text
FR-XXX-01
NFR-XXX-01
BR-XXX-01
UC-XXX-01
TC-XXX-01
```

---

## 8.3. Minor issues cần chỉnh wording

1. Đổi `ConsultationSessions` trong Document 18 thành `InteractionAlert consultation evidence`.
2. Chuẩn hóa “consultation note”.
3. Chuẩn hóa “Should-have”.
4. Chuẩn hóa “Future / Commercial Expansion”.
5. Ghi rõ Graph Sync backend MVP vs Graph Sync Status UI Should-have.
6. Ghi rõ AuditLog backend MVP vs System Audit UI Should-have.
7. Ghi rõ AIProviderConfig DB model optional, provider/model configuration mandatory.
8. Thêm release owner unresolved item vào final unresolved list.

---

# 9. Recommended final patch list

## Patch 1 — Global terminology normalization

Áp dụng toàn bộ Document 01–20:

| Replace inconsistent wording | Use official wording                             |
| ---------------------------- | ------------------------------------------------ |
| Should have / Should Have    | Should-have                                      |
| Future Scope                 | Future / Commercial Expansion                    |
| Ghi chú tư vấn               | consultation note / ghi chú tư vấn               |
| AI log                       | AI Audit Log                                     |
| Graph status                 | Graph freshness / Graph Sync status tùy ngữ cảnh |
| Inventory stock source       | MedicineBatch source of truth                    |
| Payment PAID                 | Payment SUCCESS                                  |
| Order SUCCESS                | Order PAID                                       |

---

## Patch 2 — Add exact ID conventions

Thêm vào các tài liệu liên quan:

| ID type                 | Document chính |
| ----------------------- | -------------- |
| Decision ID             | Document 04    |
| Business Requirement ID | Document 05    |
| FR/NFR/BR ID            | Document 06    |
| Permission key          | Document 07    |
| Use Case ID             | Document 08    |
| API endpoint trace ID   | Document 12    |
| Test Case ID            | Document 20    |
| Jira story link         | Document 19    |

---

## Patch 3 — AI Audit scope fix

Update wording in:

1. Document 15.
2. Document 16.
3. Document 19.
4. Document 20.

Final wording:

```text
AI Audit persistence, API and audit fields are MVP.
A minimal Admin AI Audit Log screen is included in MVP to demonstrate traceability.
Advanced AI observability dashboard is Should-have.
```

---

## Patch 4 — Graph source version fix

Update:

1. Document 13.
2. Document 14.
3. Document 17.
4. Document 20.

Final wording:

```text
MVP graph-source tables include a version field:
- medicines.version
- active_ingredients.version
- medicine_ingredients.version
- drug_interactions.version

GraphProjectionVersion stores the projected source version.
Freshness is determined by source version plus outbox state, not by elapsed time only.
```

---

## Patch 5 — ConsultationSessions wording fix

Update Document 18.

Replace:

```text
ConsultationSessions
```

with:

```text
InteractionAlert consultation evidence
```

Then add:

```text
No separate ConsultationSession table is required for MVP. The authoritative consultation note for a HIGH alert is stored on InteractionAlert.
```

---

## Patch 6 — Graph Sync Status UI fix

Update Documents 12/15/17/19/20.

Final wording:

```text
Graph Sync backend, outbox, worker, retry, attempts/logs and freshness detection are MVP.
Admin Graph Sync Status/retry UI and related management APIs are Should-have.
```

---

## Patch 7 — System Audit UI fix

Final wording:

```text
Audit logging for critical operations is MVP.
A full Admin System Audit Log UI is Should-have unless explicitly required for demo.
```

---

# 10. Final traceability readiness checklist

Before final publication, verify:

| Check                                                       | Status                              |
| ----------------------------------------------------------- | ----------------------------------- |
| Document 01 lists all 20 documents                          | Need verify                         |
| Document 04 has all decisions and unresolved items          | Need verify                         |
| Document 06 has exact FR/NFR/BR IDs                         | Should add                          |
| Document 07 permission keys align with API/UI               | Need verify                         |
| Document 08 UC IDs align with Document 09 UML               | Should add                          |
| Document 12 endpoints link to FR/UC/UI/Test                 | Should add                          |
| Document 13 database entities align with Document 14 Prisma | Need verify                         |
| Document 15 screens link to API/SRS/Test                    | Mostly OK                           |
| Document 16 AI Audit fields align with DB/API/UI            | Mostly OK                           |
| Document 17 graph model aligns with DB/AI/API/Test          | Mostly OK, sourceVersion fix needed |
| Document 18 seed plan supports smoke tests                  | OK                                  |
| Document 19 Jira epics cover all MVP modules                | OK                                  |
| Document 20 tests cover high-risk modules                   | OK                                  |
| MVP/Should-have/Future labels consistent                    | Need final terminology pass         |
| No rejected baseline returns                                | OK                                  |

---

# 11. Final decision recommendation

## 11.1. Có thể chốt final chưa?

Có thể **chuẩn bị chốt final**, nhưng nên làm một vòng chỉnh nhỏ trước.

Không cần viết lại từ đầu.

Không cần đổi baseline.

Không cần đổi cấu trúc 20 tài liệu.

## 11.2. Cần sửa gì trước khi final?

Cần sửa 7 điểm:

1. AI Audit UI scope.
2. Graph sourceVersion strategy.
3. Requirement/use case/test ID traceability.
4. ConsultationSessions wording.
5. Graph Sync backend MVP vs UI Should-have.
6. AuditLog backend MVP vs System Audit UI Should-have.
7. Terminology normalization.

## 11.3. Mức độ sẵn sàng

| Area                        | Readiness                         |
| --------------------------- | --------------------------------- |
| Baseline consistency        | High                              |
| Scope consistency           | High                              |
| Technology consistency      | High                              |
| Business rule consistency   | High                              |
| AI/Graph consistency        | High                              |
| Traceability                | Medium → High after ID pass       |
| Terminology                 | Medium → High after normalization |
| Final publication readiness | 85–90%                            |

---

# 12. Kết luận cuối cùng

Bộ **Document 01–20** hiện đã rất gần với bản final.

Điểm mạnh lớn nhất:

1. Baseline rõ.
2. Scope MVP/Should-have/Future được phân biệt.
3. Không quay lại thiết kế cũ.
4. MedicineBatch/FEFO/Checkout/InteractionAlert/AI/Graph đều được giữ đúng.
5. Tài liệu có liên kết tốt giữa requirement, API, UI, database, testing và demo.
6. Bộ tài liệu đã đủ để hướng dẫn implementation, demo và báo cáo.

Điểm cần làm trước khi chốt:

1. Chuẩn hóa thuật ngữ.
2. Thêm exact ID traceability.
3. Chỉnh vài wording mơ hồ.
4. Chốt AI Audit UI minimal MVP.
5. Chốt graph sourceVersion implementation.
6. Rà lại unresolved PM decisions.

Sau khi các patch trên được áp dụng, bộ tài liệu có thể chuyển sang giai đoạn:

```text
Final formatting → file export → review lần cuối → publish official consolidated documentation
```
