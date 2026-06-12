# Traceability Matrix Tổng v1

**Dự án:** PharmaAssist AI Intelligence
**Loại tài liệu:** Master Traceability Matrix
**Trạng thái:** Draft v1
**Ngôn ngữ chính:** Tiếng Việt
**Thuật ngữ kỹ thuật:** Giữ tiếng Anh khi cần

---

## 1. Mục đích

Tài liệu này tạo **Traceability Matrix tổng** để nối toàn bộ artifact quan trọng của dự án:

```text
Requirement → Use Case → API → UI → Database → Test Case → Jira
```

Matrix này dùng để:

1. Kiểm tra requirement nào đã có use case.
2. Kiểm tra use case nào đã có API/UI/database/test tương ứng.
3. Làm nền để revise Jira Components, Epics, Stories và Tasks.
4. Làm nền cho Gap Analysis giữa code hiện tại và documentation.
5. Ưu tiên implementation theo MVP critical path.
6. Theo dõi trạng thái coverage của từng module.

---

## 2. Quy ước trong Matrix

### 2.1. Trace ID

Format:

```text
TR-[MODULE]-[NUMBER]
```

Ví dụ:

```text
TR-AUTH-01
TR-CHK-01
TR-FEFO-01
TR-AIG-01
TR-GSY-01
```

### 2.2. Status

| Status             | Ý nghĩa                                                     |
| ------------------ | ----------------------------------------------------------- |
| Draft              | Đã đưa vào matrix nhưng chưa revise Jira/code               |
| Ready for Jira     | Đã đủ rõ để tạo/revise Jira Story/Task                      |
| Implemented        | Đã có code tương ứng                                        |
| Tested             | Đã có test pass                                             |
| Gap                | Documentation có nhưng code/test chưa có hoặc lệch baseline |
| Out of Scope Guard | Dùng để kiểm soát không quay lại thiết kế cũ                |

### 2.3. Jira Story/Task

Ở phiên bản v1, cột **Jira Story/Task** để `TBD` vì bước revise Jira sẽ được thực hiện sau matrix này.

---

# 3. Jira Component & Epic Reference

| Jira Component              | Jira Epic                               |
| --------------------------- | --------------------------------------- |
| Auth & RBAC                 | PAI-EPIC-01 Auth & RBAC                 |
| Medicine & ActiveIngredient | PAI-EPIC-02 Medicine & ActiveIngredient |
| Supplier                    | PAI-EPIC-03 Supplier                    |
| Inventory & MedicineBatch   | PAI-EPIC-04 Inventory & MedicineBatch   |
| Stock Import                | PAI-EPIC-05 Stock Import                |
| Inventory Adjustment        | PAI-EPIC-06 Inventory Adjustment        |
| POS & Checkout              | PAI-EPIC-07 POS & Checkout              |
| InteractionAlert            | PAI-EPIC-08 InteractionAlert            |
| AI Guardrail & Audit        | PAI-EPIC-09 AI Guardrail & Audit        |
| Graph Sync & Graph-RAG      | PAI-EPIC-10 Graph Sync & Graph-RAG      |
| Reports                     | PAI-EPIC-11 Reports                     |
| Data & Demo                 | PAI-EPIC-12 Data & Demo                 |
| Testing & Setup             | PAI-EPIC-13 Testing & Setup             |
| Documentation               | TBD Documentation Epic                  |
| DevOps & CI                 | TBD DevOps/CI Epic                      |

---

# 4. Master Traceability Matrix

---

## 4.1. Auth, User & RBAC

| Trace ID   | Scope | Priority | Requirement ID                     | Use Case ID            | API                                                                        | UI Screen / Route                              | Database                                          | Test Case ID           | Jira Component                | Jira Epic                | Jira Story/Task | Status |
| ---------- | ----- | -------- | ---------------------------------- | ---------------------- | -------------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------- | ---------------------- | ----------------------------- | ------------------------ | --------------- | ------ |
| TR-AUTH-01 | MVP   | P0       | FR-AUTH-01, FR-AUTH-03, FR-AUTH-06 | UC-AUTH-01             | Supabase Auth client/server session validation                             | Login Screen                                   | Supabase Auth, user_profiles                      | TC-AUTH-01, TC-AUTH-02 | Auth & RBAC                   | PAI-EPIC-01              | TBD             | Draft  |
| TR-AUTH-02 | MVP   | P1       | FR-AUTH-02                         | UC-AUTH-02             | Supabase signOut                                                           | App Header / Account Menu                      | Supabase Auth session                             | TC-AUTH-03             | Auth & RBAC                   | PAI-EPIC-01              | TBD             | Draft  |
| TR-AUTH-03 | MVP   | P0       | FR-AUTH-04                         | UC-AUTH-03             | POST /auth/first-login/change-password or Supabase password update wrapper | First Login Password Change Screen             | user_profiles.must_change_password, Supabase Auth | TC-AUTH-05, TC-USER-02 | Auth & RBAC                   | PAI-EPIC-01              | TBD             | Draft  |
| TR-AUTH-04 | MVP   | P0       | FR-AUTH-05                         | UC-AUTH-04             | Auth middleware / session guard                                            | N/A                                            | user_profiles, no password_hash                   | TC-AUTH-06, TC-NEG-02  | Auth & RBAC                   | PAI-EPIC-01              | TBD             | Draft  |
| TR-USER-01 | MVP   | P0       | FR-USER-01, FR-USER-02             | UC-USER-01             | POST /users/staff                                                          | User Management Screen                         | user_profiles, user_roles, Supabase Auth          | TC-USER-01             | Auth & RBAC                   | PAI-EPIC-01              | TBD             | Draft  |
| TR-USER-02 | MVP   | P1       | FR-USER-04, FR-USER-05             | UC-USER-03, UC-USER-05 | PATCH /users/{id}/deactivate                                               | User Management Screen                         | user_profiles, audit_logs                         | TC-USER-04, TC-USER-05 | Auth & RBAC                   | PAI-EPIC-01              | TBD             | Draft  |
| TR-RBAC-01 | MVP   | P0       | FR-RBAC-01, FR-USER-03             | UC-RBAC-01             | POST /users/{id}/roles                                                     | User Role Assignment UI                        | users, roles, user_roles                          | TC-RBAC-01             | Auth & RBAC                   | PAI-EPIC-01              | TBD             | Draft  |
| TR-RBAC-02 | MVP   | P0       | FR-RBAC-02, FR-RBAC-07, FR-RBAC-08 | UC-RBAC-03, UC-RBAC-05 | Backend permission middleware / guards                                     | All protected screens                          | roles, permissions, role_permissions, user_roles  | TC-RBAC-02, TC-RBAC-04 | Auth & RBAC                   | PAI-EPIC-01              | TBD             | Draft  |
| TR-RBAC-03 | MVP   | P1       | FR-RBAC-06                         | UC-RBAC-04             | GET /me/permissions                                                        | Sidebar / Navigation / Action Buttons          | permissions, role_permissions                     | TC-RBAC-03             | Auth & RBAC                   | PAI-EPIC-01              | TBD             | Draft  |
| TR-RBAC-04 | MVP   | P0       | FR-RBAC-05, FR-ALT-11              | UC-RBAC-06, UC-ALT-09  | InteractionAlert authorization guards                                      | InteractionAlert screens blocked for Warehouse | roles, permissions                                | TC-RBAC-06, TC-ALT-11  | Auth & RBAC, InteractionAlert | PAI-EPIC-01, PAI-EPIC-08 | TBD             | Draft  |

---

## 4.2. Medicine, ActiveIngredient & Supplier

| Trace ID  | Scope | Priority | Requirement ID                  | Use Case ID                     | API                                                      | UI Screen / Route                          | Database                                                                    | Test Case ID                    | Jira Component                                      | Jira Epic                | Jira Story/Task | Status |
| --------- | ----- | -------- | ------------------------------- | ------------------------------- | -------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------- | ------------------------------- | --------------------------------------------------- | ------------------------ | --------------- | ------ |
| TR-MED-01 | MVP   | P0       | FR-MED-01, FR-MED-05            | UC-MED-01                       | POST /medicines                                          | Medicine Create/Edit Screen                | medicines                                                                   | TC-MED-01, TC-MED-02            | Medicine & ActiveIngredient                         | PAI-EPIC-02              | TBD             | Draft  |
| TR-MED-02 | MVP   | P1       | FR-MED-02, FR-MED-06            | UC-MED-02, UC-MED-05            | PATCH /medicines/{id}, PATCH /medicines/{id}/deactivate  | Medicine Detail/Edit Screen                | medicines, audit_logs                                                       | TC-MED-03, TC-MED-06            | Medicine & ActiveIngredient                         | PAI-EPIC-02              | TBD             | Draft  |
| TR-MED-03 | MVP   | P0       | FR-MED-03, FR-MED-04            | UC-MED-03, UC-MED-04            | GET /medicines                                           | Medicine List / POS Search                 | medicines, medicine_batches derived summary                                 | TC-MED-04, TC-MED-05            | Medicine & ActiveIngredient                         | PAI-EPIC-02              | TBD             | Draft  |
| TR-MED-04 | MVP   | P1       | FR-MED-07                       | UC-MED-06                       | Graph Sync outbox trigger on medicine change             | N/A                                        | medicines.version, graph_sync_outbox                                        | TC-MED-07                       | Medicine & ActiveIngredient, Graph Sync & Graph-RAG | PAI-EPIC-02, PAI-EPIC-10 | TBD             | Draft  |
| TR-ACT-01 | MVP   | P0       | FR-ACT-01, FR-ACT-02, FR-ACT-03 | UC-ACT-01, UC-ACT-02, UC-ACT-03 | POST /active-ingredients, PATCH /active-ingredients/{id} | ActiveIngredient Management Screen         | active_ingredients                                                          | TC-ACT-01, TC-ACT-02, TC-ACT-03 | Medicine & ActiveIngredient                         | PAI-EPIC-02              | TBD             | Draft  |
| TR-ACT-02 | MVP   | P0       | FR-ACT-04, FR-ACT-05            | UC-ACT-04, UC-ACT-05            | POST /medicines/{id}/ingredients                         | Medicine Form Ingredient Mapping Component | medicine_ingredients, active_ingredients                                    | TC-ACT-04, TC-ACT-05            | Medicine & ActiveIngredient                         | PAI-EPIC-02              | TBD             | Draft  |
| TR-ACT-03 | MVP   | P1       | FR-ACT-06                       | UC-ACT-06                       | Graph Sync outbox trigger on ingredient/mapping change   | N/A                                        | active_ingredients.version, medicine_ingredients.version, graph_sync_outbox | TC-ACT-06                       | Medicine & ActiveIngredient, Graph Sync & Graph-RAG | PAI-EPIC-02, PAI-EPIC-10 | TBD             | Draft  |
| TR-ACT-04 | MVP   | P0       | FR-ACT-07                       | UC-ACT-07                       | Data import/seed validation                              | Data Admin / Seed Process                  | active_ingredients, catalog reference tables                                | TC-ACT-07                       | Data & Demo                                         | PAI-EPIC-12              | TBD             | Draft  |
| TR-SUP-01 | MVP   | P0       | FR-SUP-01, FR-SUP-02, FR-SUP-03 | UC-SUP-01, UC-SUP-02, UC-SUP-03 | GET /suppliers, POST /suppliers, PATCH /suppliers/{id}   | Supplier Management Screen                 | suppliers                                                                   | TC-SUP-01, TC-SUP-02, TC-SUP-03 | Supplier                                            | PAI-EPIC-03              | TBD             | Draft  |
| TR-SUP-02 | MVP   | P0       | FR-SUP-04, FR-SUP-05            | UC-SUP-04, UC-SUP-05            | PATCH /suppliers/{id}/deactivate                         | Supplier Detail Screen                     | suppliers, audit_logs                                                       | TC-SUP-04, TC-SUP-05            | Supplier                                            | PAI-EPIC-03              | TBD             | Draft  |

---

## 4.3. MedicineBatch, Inventory Summary, Stock Import & Inventory Adjustment

| Trace ID  | Scope       | Priority | Requirement ID                  | Use Case ID                     | API                                                                   | UI Screen / Route                    | Database                                            | Test Case ID                               | Jira Component                     | Jira Epic                | Jira Story/Task | Status |
| --------- | ----------- | -------- | ------------------------------- | ------------------------------- | --------------------------------------------------------------------- | ------------------------------------ | --------------------------------------------------- | ------------------------------------------ | ---------------------------------- | ------------------------ | --------------- | ------ |
| TR-BAT-01 | MVP         | P0       | FR-BAT-01, FR-BAT-08            | UC-BAT-01, UC-BAT-07            | GET /inventory/summary                                                | Inventory Summary Screen             | medicine_batches derived summary                    | TC-BAT-01, TC-BAT-08, TC-NEG-03            | Inventory & MedicineBatch          | PAI-EPIC-04              | TBD             | Draft  |
| TR-BAT-02 | MVP         | P0       | FR-BAT-02, FR-BAT-03, FR-BAT-04 | UC-BAT-06                       | Batch validation in Stock Import/Adjustment APIs                      | Stock Import Form, Batch Detail      | medicine_batches                                    | TC-BAT-02, TC-BAT-03, TC-BAT-04            | Inventory & MedicineBatch          | PAI-EPIC-04              | TBD             | Draft  |
| TR-BAT-03 | MVP         | P0       | FR-BAT-05, FR-BAT-06            | UC-BAT-03, UC-BAT-04            | GET /inventory/summary, POS stock validation                          | Inventory Summary, POS Screen        | medicine_batches                                    | TC-BAT-05, TC-BAT-06                       | Inventory & MedicineBatch          | PAI-EPIC-04              | TBD             | Draft  |
| TR-BAT-04 | MVP         | P1       | FR-BAT-07, FR-SET-01            | UC-BAT-05, UC-SET-01            | GET /inventory/near-expiry, GET/PATCH /settings/near-expiry-threshold | Inventory Dashboard, System Settings | medicine_batches, system_settings                   | TC-BAT-07, TC-SET-01, TC-SET-02            | Inventory & MedicineBatch, Reports | PAI-EPIC-04, PAI-EPIC-11 | TBD             | Draft  |
| TR-BAT-05 | MVP         | P1       | FR-BAT-09                       | UC-BAT-02                       | GET /inventory/batches/{id}                                           | Batch Detail Screen                  | medicine_batches                                    | TC-BAT-09                                  | Inventory & MedicineBatch          | PAI-EPIC-04              | TBD             | Draft  |
| TR-STI-01 | MVP         | P0       | FR-STI-01, FR-BAT-02, FR-BAT-03 | UC-STI-01, UC-STI-02            | POST /stock-imports                                                   | Stock Import Create Screen           | stock_imports, stock_import_items                   | TC-STI-01, TC-STI-02                       | Stock Import                       | PAI-EPIC-05              | TBD             | Draft  |
| TR-STI-02 | MVP         | P0       | FR-STI-02, FR-STI-03            | UC-STI-03                       | POST /stock-imports/{id}/confirm                                      | Stock Import Detail/Confirm Screen   | stock_imports, stock_import_items, medicine_batches | TC-STI-03                                  | Stock Import                       | PAI-EPIC-05              | TBD             | Draft  |
| TR-STI-03 | MVP         | P0       | FR-STI-04, FR-STI-05            | UC-STI-04, UC-STI-05            | POST /stock-imports/{id}/confirm                                      | Stock Import Confirm Validation      | medicine_batches                                    | TC-STI-04, TC-STI-05                       | Stock Import                       | PAI-EPIC-05              | TBD             | Draft  |
| TR-STI-04 | MVP         | P1       | FR-STI-06, FR-STI-07            | UC-STI-06, UC-STI-07            | PATCH /stock-imports/{id}, audit after confirm                        | Stock Import Detail                  | stock_imports, audit_logs                           | TC-STI-06, TC-STI-07                       | Stock Import                       | PAI-EPIC-05              | TBD             | Draft  |
| TR-ADJ-01 | MVP         | P0       | FR-ADJ-01, FR-ADJ-02, FR-ADJ-03 | UC-ADJ-01, UC-ADJ-02, UC-ADJ-03 | POST /inventory-adjustments, POST /inventory-adjustments/{id}/confirm | Inventory Adjustment Screen          | inventory_adjustments, inventory_adjustment_items   | TC-ADJ-01, TC-ADJ-02, TC-ADJ-03            | Inventory Adjustment               | PAI-EPIC-06              | TBD             | Draft  |
| TR-ADJ-02 | MVP         | P0       | FR-ADJ-04, FR-ADJ-05, FR-ADJ-06 | UC-ADJ-04, UC-ADJ-05, UC-ADJ-06 | Adjustment confirm service only; no direct quantity API               | Inventory Adjustment Detail          | medicine_batches, audit_logs                        | TC-ADJ-04, TC-ADJ-05, TC-ADJ-06, TC-NEG-04 | Inventory Adjustment               | PAI-EPIC-06              | TBD             | Draft  |
| TR-ADJ-03 | Should-have | P2       | FR-ADJ-07                       | UC-ADJ-07                       | POST /inventory-adjustments/{id}/correction or cancellation API       | Adjustment Correction Screen         | inventory_adjustments, audit_logs                   | TC-ADJ-07                                  | Inventory Adjustment               | PAI-EPIC-06              | TBD             | Draft  |

---

## 4.4. POS, DrugInteraction, InteractionAlert, Checkout, FEFO, Payment & Invoice

| Trace ID   | Scope        | Priority | Requirement ID                                        | Use Case ID                                | API                                                                                        | UI Screen / Route                                     | Database                                            | Test Case ID                                                           | Jira Component                            | Jira Epic                | Jira Story/Task | Status             |
| ---------- | ------------ | -------- | ----------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------ | ----------------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------- | ------------------------ | --------------- | ------------------ |
| TR-POS-01  | MVP          | P0       | FR-POS-01, FR-POS-02, FR-POS-03, FR-POS-04            | UC-POS-01, UC-POS-02, UC-POS-03, UC-POS-04 | POST /orders, PATCH /orders/{id}/items                                                     | POS Draft Order Screen                                | orders, order_items                                 | TC-POS-01, TC-POS-02, TC-POS-03, TC-POS-04, TC-POS-05                  | POS & Checkout                            | PAI-EPIC-07              | TBD             | Draft              |
| TR-POS-02  | MVP          | P0       | FR-POS-05, FR-BAT-05                                  | UC-POS-05                                  | GET /medicines/search, stock validation service                                            | POS Medicine Search / Cart Panel                      | medicine_batches derived sellable quantity          | TC-POS-06                                                              | POS & Checkout, Inventory & MedicineBatch | PAI-EPIC-07, PAI-EPIC-04 | TBD             | Draft              |
| TR-POS-03  | MVP          | P0       | FR-POS-06                                             | UC-POS-06                                  | POST /orders without required customer_id                                                  | POS Customer Section                                  | orders.customer_snapshot nullable or walk-in fields | TC-POS-07                                                              | POS & Checkout                            | PAI-EPIC-07              | TBD             | Draft              |
| TR-POS-04  | MVP          | P1       | FR-POS-07, FR-RBAC-08                                 | UC-POS-07                                  | POST /orders/{id}/cancel                                                                   | Draft Order Detail                                    | orders                                              | TC-POS-08, TC-POS-09                                                   | POS & Checkout, Auth & RBAC               | PAI-EPIC-07, PAI-EPIC-01 | TBD             | Draft              |
| TR-POS-05  | MVP          | P0       | FR-POS-08                                             | UC-POS-08                                  | Checkout validation failure response                                                       | Checkout Route / Draft Order preserved                | orders, order_items                                 | TC-POS-10                                                              | POS & Checkout                            | PAI-EPIC-07              | TBD             | Draft              |
| TR-DRG-01  | MVP          | P0       | FR-DRG-01, FR-DRG-02, FR-DRG-05, FR-DRG-06            | UC-DRG-01, UC-DRG-04                       | POST /drug-interactions                                                                    | Drug Interaction Rule Management Screen               | drug_interactions, active_ingredients               | TC-DRG-01, TC-DRG-04, TC-DRG-05                                        | InteractionAlert                          | PAI-EPIC-08              | TBD             | Draft              |
| TR-DRG-02  | MVP          | P1       | FR-DRG-03, FR-DRG-04, FR-DRG-08                       | UC-DRG-02, UC-DRG-03, UC-DRG-06            | PATCH /drug-interactions/{id}, deactivate endpoint                                         | Drug Interaction Rule Detail                          | drug_interactions.version, graph_sync_outbox        | TC-DRG-02, TC-DRG-03, TC-DRG-07                                        | InteractionAlert, Graph Sync & Graph-RAG  | PAI-EPIC-08, PAI-EPIC-10 | TBD             | Draft              |
| TR-DRG-03  | MVP          | P0       | FR-DRG-07                                             | UC-DRG-05                                  | Interaction check service                                                                  | POS / Interaction Alert Panel                         | medicine_ingredients, drug_interactions             | TC-DRG-06, TC-NEG-05                                                   | InteractionAlert                          | PAI-EPIC-08              | TBD             | Draft              |
| TR-ALT-01  | MVP          | P0       | FR-ALT-01, FR-ALT-02, FR-ALT-03, FR-ALT-04, FR-ALT-05 | UC-ALT-01, UC-ALT-02, UC-ALT-03, UC-ALT-04 | POST /orders/{id}/interaction-alerts/check                                                 | POS Interaction Alert Panel                           | interaction_alerts, drug_interactions               | TC-ALT-01, TC-ALT-02, TC-ALT-03, TC-ALT-04, TC-ALT-05                  | InteractionAlert                          | PAI-EPIC-08              | TBD             | Draft              |
| TR-ALT-02  | MVP          | P0       | FR-ALT-06, FR-ALT-07, FR-ALT-08, FR-ALT-09            | UC-ALT-05, UC-ALT-06, UC-ALT-07, UC-ALT-10 | POST /interaction-alerts/{id}/acknowledge, POST /interaction-alerts/{id}/consultation-note | Interaction Alert Panel / Checkout Route              | interaction_alerts, audit_logs                      | TC-ALT-06, TC-ALT-07, TC-ALT-08, TC-ALT-09, TC-AUD-07                  | InteractionAlert                          | PAI-EPIC-08              | TBD             | Draft              |
| TR-ALT-03  | MVP          | P1       | FR-ALT-10, FR-RBAC-08                                 | UC-ALT-08                                  | GET /orders/{id}/interaction-alerts, GET /interaction-alerts/history                       | Order Detail / Alert History                          | interaction_alerts, orders                          | TC-ALT-10                                                              | InteractionAlert                          | PAI-EPIC-08              | TBD             | Draft              |
| TR-ALT-04  | MVP          | P0       | FR-ALT-11                                             | UC-ALT-09                                  | Authorization guard                                                                        | Alert screens blocked for Warehouse                   | roles, permissions                                  | TC-ALT-11, TC-RBAC-06                                                  | InteractionAlert, Auth & RBAC             | PAI-EPIC-08, PAI-EPIC-01 | TBD             | Draft              |
| TR-CHK-01  | MVP          | P0       | FR-CHK-01, FR-CHK-02, FR-CHK-03                       | UC-CHK-01, UC-CHK-09                       | POST /checkout                                                                             | Dedicated Checkout Route / Full-height Checkout Panel | orders, payments, invoices, order_batch_allocations | TC-CHK-01, TC-CHK-02, TC-CHK-03                                        | POS & Checkout                            | PAI-EPIC-07              | TBD             | Draft              |
| TR-CHK-02  | MVP          | P0       | FR-CHK-06, FR-CHK-07, FR-ALT-08                       | UC-CHK-02, UC-ALT-07                       | POST /checkout validation stage                                                            | Checkout Validation UI                                | orders, medicine_batches, interaction_alerts        | TC-CHK-04, TC-CHK-05, TC-ALT-08                                        | POS & Checkout, InteractionAlert          | PAI-EPIC-07, PAI-EPIC-08 | TBD             | Draft              |
| TR-CHK-03  | MVP          | P0       | FR-CHK-08, FR-CHK-10                                  | UC-CHK-06, UC-CHK-08                       | POST /checkout with Idempotency-Key                                                        | Checkout Route error states                           | idempotency_records, orders, payments, invoices     | TC-CHK-06, TC-CHK-08                                                   | POS & Checkout                            | PAI-EPIC-07              | TBD             | Draft              |
| TR-CHK-04  | MVP          | P0       | FR-CHK-09                                             | UC-CHK-07                                  | POST /checkout success transition                                                          | Order Detail                                          | orders.status                                       | TC-CHK-07, TC-CHK-09                                                   | POS & Checkout                            | PAI-EPIC-07              | TBD             | Draft              |
| TR-FEFO-01 | MVP          | P0       | FR-CHK-04, FR-CHK-05, FR-BAT-05                       | UC-CHK-03, UC-CHK-04                       | FEFO allocation inside POST /checkout                                                      | Checkout Route / Order Detail                         | medicine_batches, order_batch_allocations           | TC-FEFO-01, TC-FEFO-02, TC-FEFO-03, TC-FEFO-04, TC-FEFO-05, TC-FEFO-06 | POS & Checkout, Inventory & MedicineBatch | PAI-EPIC-07, PAI-EPIC-04 | TBD             | Draft              |
| TR-PAY-01  | MVP          | P0       | FR-PAY-01, FR-PAY-02, FR-PAY-03                       | UC-PAY-03, UC-PAY-04                       | POST /checkout creates payment                                                             | Checkout Payment Section                              | payments                                            | TC-PAY-05, TC-PAY-06                                                   | POS & Checkout                            | PAI-EPIC-07              | TBD             | Draft              |
| TR-PAY-02  | MVP          | P0       | FR-PAY-04, FR-PAY-05                                  | UC-PAY-01                                  | POST /checkout cash payment payload                                                        | Checkout Cash Payment Panel                           | payments.amount_tendered, payments.change_amount    | TC-PAY-01, TC-PAY-02, TC-PAY-03                                        | POS & Checkout                            | PAI-EPIC-07              | TBD             | Draft              |
| TR-PAY-03  | MVP          | P0       | FR-PAY-06, FR-PAY-07                                  | UC-PAY-02, UC-PAY-05                       | POST /checkout bank transfer payload                                                       | Checkout Bank Transfer Panel                          | payments.transaction_reference                      | TC-PAY-04, TC-PAY-07                                                   | POS & Checkout                            | PAI-EPIC-07              | TBD             | Draft              |
| TR-PAY-04  | Out of Scope | P0       | FR-PAY-08                                             | UC-PAY-06                                  | No refund/return API in MVP                                                                | No refund/return UI                                   | N/A                                                 | TC-PAY-08                                                              | POS & Checkout                            | PAI-EPIC-07              | TBD             | Out of Scope Guard |
| TR-INV-01  | MVP          | P0       | FR-INV-01, FR-INV-02                                  | UC-INV-01, UC-INV-06                       | Invoice created by POST /checkout only                                                     | Invoice View after Checkout                           | invoices, invoice_items                             | TC-INV-01, TC-INV-02                                                   | POS & Checkout                            | PAI-EPIC-07              | TBD             | Draft              |
| TR-INV-02  | MVP          | P1       | FR-INV-03, FR-INV-04, FR-INV-05, FR-INV-06            | UC-INV-02, UC-INV-03, UC-INV-04, UC-INV-05 | GET /orders/{id}/invoice                                                                   | Invoice Detail / Printable View                       | invoices, payments, order_items                     | TC-INV-03, TC-INV-04, TC-INV-05, TC-INV-06                             | POS & Checkout                            | PAI-EPIC-07              | TBD             | Draft              |

---

## 4.5. AI Copilot, AI Guardrail & AI Audit

| Trace ID  | Scope       | Priority | Requirement ID                                        | Use Case ID                                | API                                                                                          | UI Screen / Route                                        | Database                                    | Test Case ID                                          | Jira Component                         | Jira Epic                | Jira Story/Task | Status |
| --------- | ----------- | -------- | ----------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------- | ----------------------------------------------------- | -------------------------------------- | ------------------------ | --------------- | ------ |
| TR-AIC-01 | MVP         | P0       | FR-AIC-01, FR-AIC-02, FR-AIC-09                       | UC-AIC-01                                  | POST /ai/interaction-alerts/{id}/explain                                                     | AI Copilot Panel inside Interaction Alert / Order Detail | ai_audit_logs, prompt_templates             | TC-AIC-01, TC-AIC-05                                  | AI Guardrail & Audit                   | PAI-EPIC-09              | TBD             | Draft  |
| TR-AIC-02 | MVP         | P0       | FR-AIC-03, FR-AIC-04, FR-ALT-09                       | UC-AIC-02, UC-AIC-03, UC-AIC-06            | POST /ai/interaction-alerts/{id}/note-draft, POST /interaction-alerts/{id}/consultation-note | AI Draft Panel / InteractionAlert Panel                  | interaction_alerts, ai_audit_logs           | TC-AIC-02, TC-AIC-03, TC-AIC-07                       | AI Guardrail & Audit, InteractionAlert | PAI-EPIC-09, PAI-EPIC-08 | TBD             | Draft  |
| TR-AIC-03 | MVP         | P1       | FR-AIC-05                                             | UC-AIC-04                                  | POST /ai/follow-up-questions                                                                 | AI Copilot Follow-up Questions Panel                     | ai_audit_logs                               | TC-AIC-04                                             | AI Guardrail & Audit                   | PAI-EPIC-09              | TBD             | Draft  |
| TR-AIC-04 | MVP         | P0       | FR-AIC-10                                             | UC-AIC-05                                  | AI Provider Adapter fallback                                                                 | AI Copilot Panel degraded state                          | ai_audit_logs, provider config env/database | TC-AIC-06, TC-NEG-06                                  | AI Guardrail & Audit                   | PAI-EPIC-09              | TBD             | Draft  |
| TR-AIG-01 | MVP         | P0       | FR-AIG-01, FR-AIG-02, FR-AIC-06, FR-AIC-07, FR-AIC-08 | UC-AIG-01, UC-AIG-02, UC-AIG-03, UC-AIG-04 | AI Guardrail middleware/service                                                              | AI Copilot safe error UI                                 | ai_audit_logs                               | TC-AIG-01, TC-AIG-02, TC-AIG-03, TC-AIG-04, TC-NEG-16 | AI Guardrail & Audit                   | PAI-EPIC-09              | TBD             | Draft  |
| TR-AIG-02 | MVP         | P0       | FR-AIG-03, FR-AIG-04                                  | UC-AIG-05, UC-AIG-06                       | AI output validation service                                                                 | AI Copilot output state                                  | ai_audit_logs                               | TC-AIG-05, TC-AIG-06                                  | AI Guardrail & Audit                   | PAI-EPIC-09              | TBD             | Draft  |
| TR-AIG-03 | MVP         | P0       | FR-AIG-05, FR-AIG-06, FR-AIG-07                       | UC-AIG-07, UC-AIG-08, UC-AIG-09            | AI privacy/redaction and safe error service                                                  | AI Copilot Panel / Error States                          | ai_audit_logs                               | TC-AIG-07, TC-AIG-08, TC-AIG-09                       | AI Guardrail & Audit                   | PAI-EPIC-09              | TBD             | Draft  |
| TR-AIA-01 | MVP         | P0       | FR-AIA-01, FR-AIA-02, FR-AIA-03, FR-AIA-04            | UC-AIA-01, UC-AIA-02, UC-AIA-03, UC-AIA-04 | AI audit write service                                                                       | N/A                                                      | ai_audit_logs, prompt_templates             | TC-AIA-01, TC-AIA-02, TC-AIA-03, TC-AIA-04            | AI Guardrail & Audit                   | PAI-EPIC-09              | TBD             | Draft  |
| TR-AIA-02 | MVP         | P1       | FR-AIA-05, FR-AIA-06, FR-AIA-09                       | UC-AIA-05, UC-AIA-07, UC-AIA-09            | AI audit metadata/retention handling                                                         | N/A                                                      | ai_audit_logs                               | TC-AIA-05, TC-AIA-06, TC-AIA-09                       | AI Guardrail & Audit                   | PAI-EPIC-09              | TBD             | Draft  |
| TR-AIA-03 | MVP         | P1       | FR-AIA-07                                             | UC-AIA-06                                  | GET /ai-audit-logs                                                                           | Admin AI Audit Log Screen                                | ai_audit_logs                               | TC-AIA-07                                             | AI Guardrail & Audit                   | PAI-EPIC-09              | TBD             | Draft  |
| TR-AIA-04 | Should-have | P3       | FR-AIA-08                                             | UC-AIA-08                                  | GET /ai-observability/dashboard                                                              | AI Observability Dashboard                               | ai_audit_logs aggregated                    | TC-AIA-08                                             | AI Guardrail & Audit                   | PAI-EPIC-09              | TBD             | Draft  |

---

## 4.6. Graph Sync & Graph-RAG

| Trace ID  | Scope       | Priority | Requirement ID                             | Use Case ID                     | API                                                                      | UI Screen / Route                   | Database                                                                                  | Test Case ID                                          | Jira Component                         | Jira Epic                | Jira Story/Task | Status |
| --------- | ----------- | -------- | ------------------------------------------ | ------------------------------- | ------------------------------------------------------------------------ | ----------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------- | ------------------------ | --------------- | ------ |
| TR-GSY-01 | MVP         | P0       | FR-GSY-01, FR-GSY-02, FR-GSY-03            | UC-GSY-01                       | Graph Sync outbox creation service                                       | N/A                                 | graph_sync_outbox, medicines, active_ingredients, medicine_ingredients, drug_interactions | TC-GSY-01                                             | Graph Sync & Graph-RAG                 | PAI-EPIC-10              | TBD             | Draft  |
| TR-GSY-02 | MVP         | P0       | FR-GSY-04, FR-GSY-09, FR-GSY-10, FR-GSY-11 | UC-GSY-02                       | Graph Sync worker                                                        | N/A                                 | graph_sync_outbox, graph_projection_versions, Neo4j projection                            | TC-GSY-02, TC-GSY-03, TC-GSY-04, TC-GSY-05, TC-NEG-07 | Graph Sync & Graph-RAG                 | PAI-EPIC-10              | TBD             | Draft  |
| TR-GSY-03 | MVP         | P0       | FR-GSY-05, FR-GSY-06                       | UC-GSY-03, UC-GSY-04            | Graph Sync retry worker / failure logging                                | N/A                                 | graph_sync_outbox, audit_logs                                                             | TC-GSY-06, TC-GSY-07, TC-AUD-08                       | Graph Sync & Graph-RAG                 | PAI-EPIC-10              | TBD             | Draft  |
| TR-GSY-04 | MVP         | P0       | FR-GSY-07, FR-GSY-08                       | UC-GSY-05                       | Graph freshness service                                                  | Graph-RAG freshness indicator       | graph_projection_versions, graph_sync_outbox                                              | TC-GSY-08, TC-GSY-09                                  | Graph Sync & Graph-RAG                 | PAI-EPIC-10              | TBD             | Draft  |
| TR-GSY-05 | MVP         | P1       | FR-GSY-12                                  | UC-GSY-06                       | Graph Sync deactivation projection                                       | N/A                                 | Neo4j projection, source tables isActive                                                  | TC-GSY-10                                             | Graph Sync & Graph-RAG                 | PAI-EPIC-10              | TBD             | Draft  |
| TR-GSY-06 | Should-have | P2       | FR-GSY-13                                  | UC-GSY-07, UC-GSY-08            | GET /graph-sync/status, POST /graph-sync/retry, POST /graph-sync/rebuild | Admin Graph Sync Status Screen      | graph_sync_outbox, graph_projection_versions                                              | TC-GSY-11, TC-GSY-12                                  | Graph Sync & Graph-RAG                 | PAI-EPIC-10              | TBD             | Draft  |
| TR-GRG-01 | MVP         | P0       | FR-GRG-01, FR-GRG-02, FR-GRG-03, FR-GRG-04 | UC-GRG-01, UC-GRG-02, UC-GRG-03 | POST /graph-rag/query or POST /graph-rag/interaction-explanation         | Graph-RAG Screen / AI Copilot Panel | Neo4j projection, graph_projection_versions                                               | TC-GRG-01, TC-GRG-02, TC-GRG-03                       | Graph Sync & Graph-RAG                 | PAI-EPIC-10              | TBD             | Draft  |
| TR-GRG-02 | MVP         | P0       | FR-GRG-05, FR-GRG-06, FR-GRG-07            | UC-GRG-04, UC-GRG-05            | Graph-RAG fallback service                                               | Graph-RAG degraded/fallback state   | PostgreSQL interaction tables, Neo4j projection                                           | TC-GRG-04, TC-GRG-05, TC-GRG-06, TC-GRG-07, TC-NEG-08 | Graph Sync & Graph-RAG                 | PAI-EPIC-10              | TBD             | Draft  |
| TR-GRG-03 | MVP         | P0       | FR-GRG-08, FR-GRG-09                       | UC-GRG-06, UC-GRG-07            | Graph-RAG authorization and query template service                       | Graph-RAG Screen                    | permissions, Neo4j projection                                                             | TC-GRG-08, TC-GRG-09, TC-NEG-13                       | Graph Sync & Graph-RAG                 | PAI-EPIC-10              | TBD             | Draft  |
| TR-GRG-04 | MVP         | P0       | FR-GRG-10                                  | UC-GRG-08                       | Checkout service must use PostgreSQL rules                               | Checkout Route                      | orders, interaction_alerts, drug_interactions                                             | TC-GRG-10                                             | Graph Sync & Graph-RAG, POS & Checkout | PAI-EPIC-10, PAI-EPIC-07 | TBD             | Draft  |
| TR-GRG-05 | Should-have | P2       | FR-GRG-11                                  | UC-GRG-09                       | GET /graph/explorer/read-only                                            | Graph Explorer Read-only Screen     | Neo4j projection                                                                          | TC-GRG-11                                             | Graph Sync & Graph-RAG                 | PAI-EPIC-10              | TBD             | Draft  |

---

## 4.7. Reports, Settings, Demo Data & Audit

| Trace ID  | Scope                         | Priority | Requirement ID                                                                         | Use Case ID                                | API                                              | UI Screen / Route                                  | Database                                                                                  | Test Case ID                               | Jira Component                                                | Jira Epic                             | Jira Story/Task | Status |
| --------- | ----------------------------- | -------- | -------------------------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------ | -------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------- | ------------------------------------- | --------------- | ------ |
| TR-RPT-01 | MVP                           | P0       | FR-RPT-01, FR-RPT-04                                                                   | UC-RPT-01                                  | GET /reports/revenue                             | Revenue Report Screen                              | orders, payments, order_items                                                             | TC-RPT-01, TC-RPT-02                       | Reports                                                       | PAI-EPIC-11                           | TBD             | Draft  |
| TR-RPT-02 | MVP                           | P0       | FR-RPT-02, FR-RPT-04                                                                   | UC-RPT-02                                  | GET /reports/top-medicines                       | Top Medicines Report Screen                        | orders, order_items, medicines                                                            | TC-RPT-03                                  | Reports                                                       | PAI-EPIC-11                           | TBD             | Draft  |
| TR-RPT-03 | MVP                           | P0       | FR-RPT-03                                                                              | UC-RPT-03                                  | GET /reports/inventory                           | Inventory Report Screen                            | medicine_batches, medicines                                                               | TC-RPT-04                                  | Reports                                                       | PAI-EPIC-11                           | TBD             | Draft  |
| TR-RPT-04 | MVP                           | P1       | FR-RPT-05                                                                              | UC-RPT-04                                  | Report query filters                             | Report filter controls                             | orders, payments, medicine_batches                                                        | TC-RPT-05                                  | Reports                                                       | PAI-EPIC-11                           | TBD             | Draft  |
| TR-RPT-05 | Should-have                   | P3       | FR-RPT-06                                                                              | UC-RPT-05                                  | POST /ai/reports/narrative                       | Report AI Narrative Panel                          | ai_audit_logs, reports source queries                                                     | TC-RPT-06                                  | Reports, AI Guardrail & Audit                                 | PAI-EPIC-11, PAI-EPIC-09              | TBD             | Draft  |
| TR-RPT-06 | Future / Commercial Expansion | P3       | FR-RPT-07                                                                              | UC-RPT-06                                  | Forecast API not in MVP                          | Forecast Screen not in MVP                         | Future analytics tables                                                                   | TC-RPT-07                                  | Reports                                                       | PAI-EPIC-11                           | TBD             | Draft  |
| TR-SET-01 | MVP                           | P0       | FR-SET-01, FR-SET-02, FR-SET-03                                                        | UC-SET-01, UC-SET-02, UC-SET-03            | GET/PATCH /settings/near-expiry-threshold        | Admin System Settings Screen                       | system_settings, audit_logs                                                               | TC-SET-01, TC-SET-02, TC-SET-03, TC-SET-04 | Reports, Testing & Setup                                      | PAI-EPIC-11, PAI-EPIC-13              | TBD             | Draft  |
| TR-SET-02 | MVP                           | P0       | FR-SET-04                                                                              | UC-SET-04                                  | AI provider config loader                        | N/A or Admin Settings read-only indicator          | env config or ai_provider_config optional table                                           | TC-SET-05                                  | AI Guardrail & Audit                                          | PAI-EPIC-09                           | TBD             | Draft  |
| TR-SET-03 | Should-have                   | P3       | FR-SET-05, FR-SET-06                                                                   | UC-SET-05, UC-SET-06                       | Provider config UI APIs, Prompt template UI APIs | Admin Provider Config UI, Admin Prompt Template UI | ai_provider_config optional, prompt_templates                                             | TC-SET-06, TC-SET-07                       | AI Guardrail & Audit                                          | PAI-EPIC-09                           | TBD             | Draft  |
| TR-DMO-01 | MVP                           | P0       | FR-DMO-01, FR-DMO-02                                                                   | UC-DMO-01, UC-DMO-02                       | Seed scripts / Supabase provisioning scripts     | N/A                                                | curated MVP seed tables, Supabase demo users                                              | TC-DMO-01, TC-DMO-02                       | Data & Demo                                                   | PAI-EPIC-12                           | TBD             | Draft  |
| TR-DMO-02 | MVP                           | P0       | FR-DMO-03, FR-DMO-04, FR-DMO-05, FR-DMO-06                                             | UC-DMO-03, UC-DMO-04, UC-DMO-05, UC-DMO-06 | Seed scripts                                     | N/A                                                | medicine_batches, orders, payments, invoices, interaction_alerts, order_batch_allocations | TC-DMO-03, TC-DMO-04, TC-DMO-05, TC-DMO-06 | Data & Demo                                                   | PAI-EPIC-12                           | TBD             | Draft  |
| TR-DMO-03 | MVP                           | P0       | FR-DMO-07, FR-DMO-08, FR-DMO-09, FR-DMO-10                                             | UC-DMO-07, UC-DMO-08, UC-DMO-09, UC-DMO-10 | npm run demo:reset or equivalent local script    | CLI / Dev workflow                                 | PostgreSQL, Supabase users, Neo4j projection, smoke test state                            | TC-DMO-07, TC-DMO-08, TC-DMO-09, TC-DMO-10 | Data & Demo                                                   | PAI-EPIC-12                           | TBD             | Draft  |
| TR-AUD-01 | MVP                           | P0       | FR-AUD-01, FR-AUD-02, FR-AUD-03, FR-AUD-04, FR-AUD-05, FR-AUD-06, FR-AUD-07, FR-AUD-08 | UC-AUD-01 → UC-AUD-08                      | Backend audit service                            | N/A                                                | audit_logs, ai_audit_logs, graph failure logs                                             | TC-AUD-01 → TC-AUD-08                      | Testing & Setup, AI Guardrail & Audit, Graph Sync & Graph-RAG | PAI-EPIC-13, PAI-EPIC-09, PAI-EPIC-10 | TBD             | Draft  |
| TR-AUD-02 | Should-have                   | P2       | FR-AUD-09                                                                              | UC-AUD-09                                  | GET /audit-logs                                  | Admin System Audit Log Screen                      | audit_logs                                                                                | TC-AUD-09                                  | Testing & Setup                                               | PAI-EPIC-13                           | TBD             | Draft  |

---

## 4.8. DevOps, CI, Testing Governance & Smoke Test

| Trace ID  | Scope       | Priority | Requirement ID                             | Use Case ID                                | API                     | UI Screen / Route        | Database                              | Test Case ID                                          | Jira Component               | Jira Epic   | Jira Story/Task | Status |
| --------- | ----------- | -------- | ------------------------------------------ | ------------------------------------------ | ----------------------- | ------------------------ | ------------------------------------- | ----------------------------------------------------- | ---------------------------- | ----------- | --------------- | ------ |
| TR-DEV-01 | MVP         | P0       | FR-DEV-01, FR-DEV-02, FR-DEV-03            | UC-DEV-01, UC-DEV-08                       | N/A                     | N/A                      | Environment config                    | TC-DEV-01, TC-DEV-02                                  | DevOps & CI, Testing & Setup | PAI-EPIC-13 | TBD             | Draft  |
| TR-DEV-02 | MVP         | P0       | FR-DEV-04, FR-DEV-05, FR-DEV-06, FR-DEV-07 | UC-DEV-02, UC-DEV-03, UC-DEV-04, UC-DEV-05 | CI pipeline             | N/A                      | Prisma schema/migrations              | TC-DEV-03, TC-DEV-04, TC-DEV-05, TC-DEV-06, TC-DEV-07 | DevOps & CI                  | PAI-EPIC-13 | TBD             | Draft  |
| TR-DEV-03 | MVP         | P1       | FR-DEV-08                                  | UC-DEV-06                                  | GitHub PR workflow      | GitHub                   | N/A                                   | TC-DEV-08                                             | DevOps & CI                  | PAI-EPIC-13 | TBD             | Draft  |
| TR-DEV-04 | Should-have | P2       | FR-DEV-09                                  | UC-DEV-07                                  | Deployment config       | Demo/Staging Environment | Environment-specific config           | TC-DEV-09                                             | DevOps & CI                  | PAI-EPIC-13 | TBD             | Draft  |
| TR-TST-01 | MVP         | P1       | FR-TST-01, FR-TST-02                       | UC-TST-01                                  | Test scripts / tools    | N/A                      | N/A                                   | TC-TST-01                                             | Testing & Setup              | PAI-EPIC-13 | TBD             | Draft  |
| TR-TST-02 | MVP         | P0       | FR-TST-03, FR-TST-04, FR-TST-05            | UC-TST-02, UC-TST-03                       | Test environment config | N/A                      | Non-demo local database/schema/config | TC-TST-02, TC-TST-03                                  | Testing & Setup              | PAI-EPIC-13 | TBD             | Draft  |
| TR-TST-03 | MVP         | P1       | FR-TST-06, FR-TST-07, FR-TST-08, FR-TST-10 | UC-TST-04, UC-TST-05, UC-TST-06, UC-TST-08 | Test reports            | Chrome desktop/laptop UI | N/A                                   | TC-TST-04, TC-TST-05, TC-TST-06, TC-TST-08            | Testing & Setup              | PAI-EPIC-13 | TBD             | Draft  |
| TR-SMK-01 | MVP         | P0       | FR-TST-09                                  | UC-TST-07                                  | Smoke test suite        | Demo-critical screens    | Core MVP database state               | TC-SMK-01 → TC-SMK-11                                 | Testing & Setup              | PAI-EPIC-13 | TBD             | Draft  |

---

## 4.9. Negative Scope Control Matrix

Các dòng dưới đây dùng để bảo đảm project không quay lại baseline cũ.

| Trace ID  | Scope        | Priority | Guarded Requirement / Rule                          | Related Use Case                | API / UI Guard                                                     | Database Guard                               | Test Case ID         | Jira Component                   | Jira Epic                | Status             |
| --------- | ------------ | -------- | --------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------ | -------------------------------------------- | -------------------- | -------------------------------- | ------------------------ | ------------------ |
| TR-NEG-01 | Out of Scope | P0       | Không custom username/password/JWT auth             | UC-AUTH-01                      | Không tạo custom /auth/login JWT flow                              | Không có password_hash                       | TC-NEG-01, TC-NEG-02 | Auth & RBAC                      | PAI-EPIC-01              | Out of Scope Guard |
| TR-NEG-02 | Out of Scope | P0       | Không aggregate inventory source of truth           | UC-BAT-07                       | Inventory APIs derived từ MedicineBatch                            | MedicineBatch là source of truth             | TC-NEG-03            | Inventory & MedicineBatch        | PAI-EPIC-04              | Out of Scope Guard |
| TR-NEG-03 | Out of Scope | P0       | Không direct edit quantity                          | UC-ADJ-05                       | Không expose direct quantity update API/UI                         | Quantity đổi qua adjustment/import/checkout  | TC-NEG-04            | Inventory Adjustment             | PAI-EPIC-06              | Out of Scope Guard |
| TR-NEG-04 | Out of Scope | P0       | Không Medicine-level official interaction rule      | UC-DRG-01                       | Rule API dùng ActiveIngredient IDs                                 | drug_interactions dùng active_ingredient IDs | TC-NEG-05            | InteractionAlert                 | PAI-EPIC-08              | Out of Scope Guard |
| TR-NEG-05 | Out of Scope | P0       | Không MockAI-only MVP                               | UC-AIC-05                       | Google AI primary, MockAI fallback                                 | ai_audit_logs ghi provider used              | TC-NEG-06            | AI Guardrail & Audit             | PAI-EPIC-09              | Out of Scope Guard |
| TR-NEG-06 | Out of Scope | P0       | Không MockGraph-only MVP                            | UC-GSY-02                       | Graph Sync worker dùng Neo4j thật                                  | graph_projection_versions, Neo4j projection  | TC-NEG-07            | Graph Sync & Graph-RAG           | PAI-EPIC-10              | Out of Scope Guard |
| TR-NEG-07 | Out of Scope | P0       | Không stale graph dùng âm thầm                      | UC-GRG-04                       | Graph-RAG phải warning/fallback/safe error                         | graph_projection_versions + outbox state     | TC-NEG-08            | Graph Sync & Graph-RAG           | PAI-EPIC-10              | Out of Scope Guard |
| TR-NEG-08 | Out of Scope | P0       | Không dùng /orders/{id}/pay làm command chính       | UC-CHK-09                       | Checkout API là command chính                                      | payments tạo trong checkout transaction      | TC-NEG-09            | POS & Checkout                   | PAI-EPIC-07              | Out of Scope Guard |
| TR-NEG-09 | Out of Scope | P0       | Không direct invoice creation normal flow           | UC-INV-06                       | Invoice tạo trong checkout                                         | invoices gắn checkout/payment success        | TC-NEG-10            | POS & Checkout                   | PAI-EPIC-07              | Out of Scope Guard |
| TR-NEG-10 | Out of Scope | P0       | Không full 100-table MVP blocker                    | UC-DMO-01                       | MVP API chỉ core subset                                            | MVP schema core subset                       | TC-NEG-11            | Data & Demo                      | PAI-EPIC-12              | Out of Scope Guard |
| TR-NEG-11 | Out of Scope | P0       | Không ProductVariant làm MVP sales key              | UC-POS-02, UC-CHK-01            | POS/Checkout dùng medicine_id                                      | order_items.medicine_id                      | TC-NEG-12            | POS & Checkout                   | PAI-EPIC-07              | Out of Scope Guard |
| TR-NEG-12 | Out of Scope | P0       | Không raw Cypher cho Staff                          | UC-GRG-06                       | Graph-RAG query templates only                                     | No raw Cypher audit/use from Staff           | TC-NEG-13            | Graph Sync & Graph-RAG           | PAI-EPIC-10              | Out of Scope Guard |
| TR-NEG-13 | Out of Scope | P0       | Không DrugGroup/Symptom/Condition/RedFlag graph MVP | UC-GSY-02                       | Graph MVP chỉ Medicine, ActiveIngredient, CONTAINS, INTERACTS_WITH | Neo4j projection MVP model                   | TC-NEG-14            | Graph Sync & Graph-RAG           | PAI-EPIC-10              | Out of Scope Guard |
| TR-NEG-14 | Out of Scope | P0       | Không riskScore ảnh hưởng severity/checkout         | UC-CHK-02, UC-DRG-04            | Checkout dùng PostgreSQL rule/severity chính thức                  | No riskScore business rule                   | TC-NEG-15            | POS & Checkout, InteractionAlert | PAI-EPIC-07, PAI-EPIC-08 | Out of Scope Guard |
| TR-NEG-15 | Out of Scope | P0       | AI không diagnosis/prescribing/dosage               | UC-AIG-02, UC-AIG-03, UC-AIG-04 | AI Guardrail block                                                 | AI Audit ghi BLOCKED                         | TC-NEG-16            | AI Guardrail & Audit             | PAI-EPIC-09              | Out of Scope Guard |

---

# 5. MVP Critical Path Trace Summary

| Critical Path Order | Module / Flow                  | Primary Trace IDs       | Must-have Tests                                       |
| ------------------- | ------------------------------ | ----------------------- | ----------------------------------------------------- |
| 1                   | Auth/RBAC                      | TR-AUTH-01 → TR-RBAC-04 | TC-AUTH-01, TC-AUTH-04, TC-RBAC-02, TC-RBAC-04        |
| 2                   | Medicine + ActiveIngredient    | TR-MED-01 → TR-ACT-04   | TC-MED-01, TC-MED-02, TC-ACT-01, TC-ACT-04            |
| 3                   | Supplier                       | TR-SUP-01 → TR-SUP-02   | TC-SUP-01, TC-SUP-04                                  |
| 4                   | MedicineBatch + Inventory      | TR-BAT-01 → TR-BAT-05   | TC-BAT-01, TC-BAT-05, TC-BAT-08                       |
| 5                   | Stock Import                   | TR-STI-01 → TR-STI-04   | TC-STI-03, TC-STI-04, TC-STI-05                       |
| 6                   | Inventory Adjustment           | TR-ADJ-01 → TR-ADJ-02   | TC-ADJ-02, TC-ADJ-04, TC-ADJ-05                       |
| 7                   | POS Draft Order                | TR-POS-01 → TR-POS-05   | TC-POS-01, TC-POS-06, TC-POS-07, TC-POS-10            |
| 8                   | InteractionAlert               | TR-DRG-01 → TR-ALT-04   | TC-ALT-01, TC-ALT-06, TC-ALT-07, TC-ALT-08, TC-ALT-09 |
| 9                   | Checkout + FEFO                | TR-CHK-01 → TR-FEFO-01  | TC-CHK-03, TC-CHK-06, TC-FEFO-01, TC-FEFO-03          |
| 10                  | Payment + Invoice              | TR-PAY-01 → TR-INV-02   | TC-PAY-01, TC-PAY-05, TC-INV-01                       |
| 11                  | AI Copilot + Guardrail + Audit | TR-AIC-01 → TR-AIA-03   | TC-AIC-01, TC-AIC-03, TC-AIG-02, TC-AIG-04, TC-AIA-01 |
| 12                  | Graph Sync + Graph-RAG         | TR-GSY-01 → TR-GRG-04   | TC-GSY-01, TC-GSY-08, TC-GRG-04, TC-GRG-07            |
| 13                  | Reports                        | TR-RPT-01 → TR-RPT-04   | TC-RPT-01, TC-RPT-03, TC-RPT-04                       |
| 14                  | Demo Reset                     | TR-DMO-01 → TR-DMO-03   | TC-DMO-01, TC-DMO-04, TC-DMO-07, TC-DMO-09            |
| 15                  | Smoke Test                     | TR-SMK-01               | TC-SMK-01 → TC-SMK-11                                 |

---

# 6. Should-have / Future Trace Summary

| Scope                         | Trace IDs             | Ghi chú                                            |
| ----------------------------- | --------------------- | -------------------------------------------------- |
| Should-have                   | TR-ADJ-03             | Correction/cancellation adjustment workflow        |
| Should-have                   | TR-AIA-04             | Advanced AI observability dashboard                |
| Should-have                   | TR-GSY-06             | Admin Graph Sync Status/retry UI                   |
| Should-have                   | TR-GRG-05             | Graph Explorer read-only                           |
| Should-have                   | TR-RPT-05             | AI business report narrative                       |
| Should-have                   | TR-SET-03             | Admin Provider/Model Config UI, Prompt Template UI |
| Should-have                   | TR-AUD-02             | Full Admin System Audit Log UI                     |
| Should-have                   | TR-DEV-04             | Dedicated demo/staging environment                 |
| Future / Commercial Expansion | TR-RPT-06             | Forecasting / advanced analytics                   |
| Out of Scope Guard            | TR-NEG-01 → TR-NEG-15 | Không quay lại baseline cũ                         |

---

# 7. Coverage Notes

## 7.1. Requirement Coverage

Requirement Registry đã được map theo nhóm module chính:

1. AUTH / USER / RBAC.
2. MED / ACT / SUP.
3. BAT / STI / ADJ.
4. POS / DRG / ALT / CHK / FEFO / PAY / INV.
5. AIC / AIG / AIA.
6. GSY / GRG.
7. RPT / SET / DMO / AUD.
8. DEV / TST / SMK / NEG.

## 7.2. Use Case Coverage

Use Case Registry đã được map vào matrix theo:

1. Primary business flows.
2. System/background flows.
3. External system flows.
4. Should-have flows.
5. Out-of-scope guard flows.

## 7.3. Test Coverage

Test Case Registry đã được map theo:

1. Unit.
2. Integration.
3. API.
4. UI.
5. E2E.
6. Smoke.
7. Security/Auth.
8. Data/Migration.
9. Negative Scope Control.

## 7.4. Jira Coverage

Ở v1, Jira đã map tới:

1. Component.
2. Epic.

Cột Story/Task vẫn để `TBD` vì bước tiếp theo là **Revise Jira Components/Epics/Stories theo matrix**.

---

# 8. Gap Analysis Preparation

Sau khi có matrix này, bước Gap Analysis giữa code hiện tại và documentation nên dùng các trạng thái sau:

| Code Review Result | Ý nghĩa                                                 |
| ------------------ | ------------------------------------------------------- |
| Match              | Code đã đúng baseline                                   |
| Partial Match      | Code có một phần nhưng thiếu rule/UI/test               |
| Conflict           | Code quay lại baseline cũ hoặc trái quyết định đã chốt  |
| Missing            | Chưa có code                                            |
| Over-scoped        | Code làm thêm scope Future/Commercial không cần cho MVP |
| Unknown            | Chưa kiểm tra được                                      |

Các module cần kiểm tra code đầu tiên:

1. Auth/RBAC.
2. Database/Prisma core.
3. Medicine + ActiveIngredient.
4. MedicineBatch + Stock Import.
5. Inventory Adjustment.
6. POS Draft Order.
7. InteractionAlert.
8. Checkout + FEFO + Payment + Invoice.
9. AI Guardrail + AI Audit.
10. Graph Sync + Graph-RAG.
11. Reports.
12. Demo Reset.
13. CI/Test setup.

---

# 9. Next Step Recommendation

Sau khi chốt Traceability Matrix v1, bước tiếp theo là:

```text
Revise Jira theo baseline mới
```

Thứ tự revise Jira nên là:

1. Chốt Jira Components.
2. Chốt Jira Epics.
3. Tạo/rewrite Stories theo từng Trace ID.
4. Tạo Tasks/subtasks theo API/UI/Database/Test.
5. Gắn Requirement ID, Use Case ID và Test Case ID vào từng Story.
6. Xóa hoặc rewrite Jira item cũ nếu chứa baseline sai.
7. Chuẩn bị Gap Analysis code theo từng Trace ID.
