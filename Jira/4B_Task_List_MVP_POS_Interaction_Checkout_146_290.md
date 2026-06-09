# 4B_Task_List_MVP_POS_Interaction_Checkout_146_290.md

# Danh sách Task phần 2/4 cho PharmaAssist AI Intelligence

Tài liệu này là phần thứ hai trong bộ **4 nhóm Task List** của dự án **PharmaAssist AI Intelligence**.

Phạm vi tài liệu này:

```text
PAC-TASK-146 → PAC-TASK-290
```

Nội dung chính:

1. Stock Import completion.
2. Inventory Adjustment.
3. POS Draft Order.
4. DrugInteraction Rule.
5. InteractionAlert Lifecycle.
6. Checkout transaction.
7. FEFO allocation.
8. Payment.
9. Invoice.

Các Task trong tài liệu này thuộc **MVP / Core** và là nhóm nghiệp vụ quan trọng nhất cho luồng bán thuốc tại quầy.

---

## Quy ước chung khi tạo Task trên Jira

| **Field trên Jira**       | **Giá trị chung**                                                                                               |
| ------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Work type                 | Task                                                                                                            |
| Status                    | To Do                                                                                                           |
| Parent / Linked work item | Gắn với Story tương ứng, ví dụ `US-49`                                                                          |
| Parent Epic               | Gắn với Epic tương ứng, ví dụ `PAC-EPIC-07`                                                                     |
| Assignee                  | Automatic hoặc chọn thành viên nhóm                                                                             |
| Fix versions              | Để trống                                                                                                        |
| Team                      | Để trống hoặc chọn team nếu nhóm đã tạo                                                                         |
| Sprint                    | Gắn theo Sprint trong bảng                                                                                      |
| Summary                   | Có mã Task ở đầu, ví dụ `PAC-TASK-146 - Implement batch merge when medicine/batch/expiry match`                 |
| Component                 | Dùng Component chính thức trong `1_Components.md`                                                               |
| Labels                    | Theo module, ví dụ `inventory-adjustment`, `pos`, `interaction-alert`, `checkout`, `fefo`, `payment`, `invoice` |
| Scope                     | MVP / Core                                                                                                      |

---

# Danh sách 145 Task phần 2/4

| **Task Key** | **Summary**                                                                             | **Linked Story** | **Parent Epic** | **Component**             | **Priority** | **Sprint** | **Assignee** |
| ------------ | --------------------------------------------------------------------------------------- | ---------------- | --------------- | ------------------------- | ------------ | ---------- | ------------ |
| PAC-TASK-146 | PAC-TASK-146 - Implement batch merge when medicine/batch/expiry match                   | US-45            | PAC-EPIC-06     | Stock Import              | Highest      | Sprint 3   | Automatic    |
| PAC-TASK-147 | PAC-TASK-147 - Add unit tests for valid batch merge rule                                | US-45            | PAC-EPIC-06     | Stock Import              | High         | Sprint 3   | Automatic    |
| PAC-TASK-148 | PAC-TASK-148 - Show batch merge result after Stock Import confirm                       | US-45            | PAC-EPIC-06     | Stock Import              | Medium       | Sprint 3   | Automatic    |
| PAC-TASK-149 | PAC-TASK-149 - Implement expiry mismatch rejection                                      | US-46            | PAC-EPIC-06     | Stock Import              | Highest      | Sprint 3   | Automatic    |
| PAC-TASK-150 | PAC-TASK-150 - Return line-level expiry mismatch errors                                 | US-46            | PAC-EPIC-06     | Stock Import              | High         | Sprint 3   | Automatic    |
| PAC-TASK-151 | PAC-TASK-151 - Add tests for expiry mismatch rejection                                  | US-46            | PAC-EPIC-06     | Stock Import              | High         | Sprint 3   | Automatic    |
| PAC-TASK-152 | PAC-TASK-152 - Lock confirmed Stock Import status                                       | US-47            | PAC-EPIC-06     | Stock Import              | High         | Sprint 3   | Automatic    |
| PAC-TASK-153 | PAC-TASK-153 - Build confirmed Stock Import read-only UI                                | US-47            | PAC-EPIC-06     | Stock Import              | Medium       | Sprint 3   | Automatic    |
| PAC-TASK-154 | PAC-TASK-154 - Prevent duplicate Stock Import confirm                                   | US-47            | PAC-EPIC-06     | Stock Import              | High         | Sprint 3   | Automatic    |
| PAC-TASK-155 | PAC-TASK-155 - Add tests for confirmed Stock Import immutability                        | US-47            | PAC-EPIC-06     | Stock Import              | Medium       | Sprint 3   | Automatic    |
| PAC-TASK-156 | PAC-TASK-156 - Write audit log for Stock Import confirm                                 | US-48            | PAC-EPIC-06     | Stock Import              | Medium       | Sprint 3   | Automatic    |
| PAC-TASK-157 | PAC-TASK-157 - Show Stock Import audit metadata in detail UI                            | US-48            | PAC-EPIC-06     | Stock Import              | Low          | Sprint 3   | Automatic    |
| PAC-TASK-158 | PAC-TASK-158 - Add Stock Import traceability notes                                      | US-48            | PAC-EPIC-21     | Documentation             | Low          | Sprint 3   | Automatic    |
| PAC-TASK-159 | PAC-TASK-159 - Add Stock Import confirm integration tests                               | US-48            | PAC-EPIC-19     | Testing & Setup           | High         | Sprint 3   | Automatic    |
| PAC-TASK-160 | PAC-TASK-160 - Add Stock Import smoke test checklist                                    | US-48            | PAC-EPIC-19     | Testing & Setup           | Medium       | Sprint 3   | Automatic    |
| PAC-TASK-161 | PAC-TASK-161 - Create inventory_adjustments Prisma model                                | US-49            | PAC-EPIC-07     | Inventory Adjustment      | High         | Sprint 4   | Automatic    |
| PAC-TASK-162 | PAC-TASK-162 - Create inventory_adjustment_lines Prisma model                           | US-49            | PAC-EPIC-07     | Inventory Adjustment      | High         | Sprint 4   | Automatic    |
| PAC-TASK-163 | PAC-TASK-163 - Implement create Inventory Adjustment API                                | US-49            | PAC-EPIC-07     | Inventory Adjustment      | High         | Sprint 4   | Automatic    |
| PAC-TASK-164 | PAC-TASK-164 - Build create Inventory Adjustment screen                                 | US-49            | PAC-EPIC-07     | Inventory Adjustment      | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-165 | PAC-TASK-165 - Build MedicineBatch selector for adjustment                              | US-51            | PAC-EPIC-07     | Inventory Adjustment      | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-166 | PAC-TASK-166 - Validate adjustment type and quantity                                    | US-49            | PAC-EPIC-07     | Inventory Adjustment      | High         | Sprint 4   | Automatic    |
| PAC-TASK-167 | PAC-TASK-167 - Enforce required adjustment reason in backend                            | US-50            | PAC-EPIC-07     | Inventory Adjustment      | Highest      | Sprint 4   | Automatic    |
| PAC-TASK-168 | PAC-TASK-168 - Add required reason validation in UI                                     | US-50            | PAC-EPIC-07     | Inventory Adjustment      | High         | Sprint 4   | Automatic    |
| PAC-TASK-169 | PAC-TASK-169 - Show batch before/after quantity preview                                 | US-51            | PAC-EPIC-07     | Inventory Adjustment      | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-170 | PAC-TASK-170 - Implement confirm Inventory Adjustment transaction                       | US-52            | PAC-EPIC-07     | Inventory Adjustment      | High         | Sprint 4   | Automatic    |
| PAC-TASK-171 | PAC-TASK-171 - Update MedicineBatch through adjustment transaction only                 | US-52            | PAC-EPIC-07     | Inventory Adjustment      | Highest      | Sprint 4   | Automatic    |
| PAC-TASK-172 | PAC-TASK-172 - Prevent adjustment from making quantity negative                         | US-53            | PAC-EPIC-07     | Inventory Adjustment      | High         | Sprint 4   | Automatic    |
| PAC-TASK-173 | PAC-TASK-173 - Lock confirmed Inventory Adjustment                                      | US-52            | PAC-EPIC-07     | Inventory Adjustment      | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-174 | PAC-TASK-174 - Create Inventory Adjustment list API                                     | US-56            | PAC-EPIC-07     | Inventory Adjustment      | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-175 | PAC-TASK-175 - Build Inventory Adjustment history list UI                               | US-56            | PAC-EPIC-07     | Inventory Adjustment      | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-176 | PAC-TASK-176 - Implement Inventory Adjustment detail API                                | US-56            | PAC-EPIC-07     | Inventory Adjustment      | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-177 | PAC-TASK-177 - Build Inventory Adjustment detail screen                                 | US-56            | PAC-EPIC-07     | Inventory Adjustment      | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-178 | PAC-TASK-178 - Add Warehouse permission for create/confirm adjustment                   | US-54            | PAC-EPIC-07     | Inventory Adjustment      | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-179 | PAC-TASK-179 - Add Admin permission for adjustment history and review                   | US-56            | PAC-EPIC-07     | Inventory Adjustment      | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-180 | PAC-TASK-180 - Write audit log for Inventory Adjustment                                 | US-55            | PAC-EPIC-07     | Inventory Adjustment      | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-181 | PAC-TASK-181 - Display adjustment audit information in UI                               | US-55            | PAC-EPIC-07     | Inventory Adjustment      | Low          | Sprint 4   | Automatic    |
| PAC-TASK-182 | PAC-TASK-182 - Add tests for negative quantity adjustment                               | US-53            | PAC-EPIC-19     | Testing & Setup           | High         | Sprint 4   | Automatic    |
| PAC-TASK-183 | PAC-TASK-183 - Add tests for required adjustment reason                                 | US-50            | PAC-EPIC-19     | Testing & Setup           | High         | Sprint 4   | Automatic    |
| PAC-TASK-184 | PAC-TASK-184 - Add tests for Warehouse adjustment permission                            | US-54            | PAC-EPIC-19     | Testing & Setup           | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-185 | PAC-TASK-185 - Block direct MedicineBatch quantity update service path                  | US-38            | PAC-EPIC-05     | Inventory & MedicineBatch | Highest      | Sprint 4   | Automatic    |
| PAC-TASK-186 | PAC-TASK-186 - Implement cancel Draft Inventory Adjustment API                          | US-56            | PAC-EPIC-07     | Inventory Adjustment      | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-187 | PAC-TASK-187 - Build cancel Draft Inventory Adjustment UI                               | US-56            | PAC-EPIC-07     | Inventory Adjustment      | Low          | Sprint 4   | Automatic    |
| PAC-TASK-188 | PAC-TASK-188 - Refresh Inventory Summary after adjustment confirm                       | US-52            | PAC-EPIC-07     | Inventory Adjustment      | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-189 | PAC-TASK-189 - Add Inventory Adjustment smoke test checklist                            | US-56            | PAC-EPIC-19     | Testing & Setup           | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-190 | PAC-TASK-190 - Add Inventory Adjustment traceability notes                              | US-56            | PAC-EPIC-21     | Documentation             | Low          | Sprint 4   | Automatic    |
| PAC-TASK-191 | PAC-TASK-191 - Create orders Prisma model                                               | US-57            | PAC-EPIC-08     | POS & Checkout            | Highest      | Sprint 4   | Automatic    |
| PAC-TASK-192 | PAC-TASK-192 - Create order_items Prisma model                                          | US-57            | PAC-EPIC-08     | POS & Checkout            | Highest      | Sprint 4   | Automatic    |
| PAC-TASK-193 | PAC-TASK-193 - Add order status enum DRAFT/PAID/CANCELLED                               | US-57            | PAC-EPIC-08     | POS & Checkout            | Highest      | Sprint 4   | Automatic    |
| PAC-TASK-194 | PAC-TASK-194 - Implement create Draft Order API                                         | US-57            | PAC-EPIC-08     | POS & Checkout            | Highest      | Sprint 4   | Automatic    |
| PAC-TASK-195 | PAC-TASK-195 - Build POS Draft Order screen                                             | US-57            | PAC-EPIC-08     | POS & Checkout            | Highest      | Sprint 4   | Automatic    |
| PAC-TASK-196 | PAC-TASK-196 - Implement POS medicine search API                                        | US-58            | PAC-EPIC-08     | POS & Checkout            | High         | Sprint 4   | Automatic    |
| PAC-TASK-197 | PAC-TASK-197 - Build POS medicine search component                                      | US-58            | PAC-EPIC-08     | POS & Checkout            | High         | Sprint 4   | Automatic    |
| PAC-TASK-198 | PAC-TASK-198 - Display sellable stock in POS search results                             | US-58            | PAC-EPIC-08     | POS & Checkout            | High         | Sprint 4   | Automatic    |
| PAC-TASK-199 | PAC-TASK-199 - Implement add item to Draft Order API                                    | US-59            | PAC-EPIC-08     | POS & Checkout            | Highest      | Sprint 4   | Automatic    |
| PAC-TASK-200 | PAC-TASK-200 - Build add-to-order action in POS                                         | US-59            | PAC-EPIC-08     | POS & Checkout            | Highest      | Sprint 4   | Automatic    |
| PAC-TASK-201 | PAC-TASK-201 - Validate active medicine when adding POS item                            | US-59            | PAC-EPIC-08     | POS & Checkout            | High         | Sprint 4   | Automatic    |
| PAC-TASK-202 | PAC-TASK-202 - Implement update Draft Order item quantity API                           | US-60            | PAC-EPIC-08     | POS & Checkout            | High         | Sprint 4   | Automatic    |
| PAC-TASK-203 | PAC-TASK-203 - Build quantity controls in Draft Order UI                                | US-60            | PAC-EPIC-08     | POS & Checkout            | High         | Sprint 4   | Automatic    |
| PAC-TASK-204 | PAC-TASK-204 - Validate Draft Order quantity greater than zero                          | US-60            | PAC-EPIC-08     | POS & Checkout            | High         | Sprint 4   | Automatic    |
| PAC-TASK-205 | PAC-TASK-205 - Validate sellable stock when updating Draft Order quantity               | US-63            | PAC-EPIC-08     | POS & Checkout            | Highest      | Sprint 4   | Automatic    |
| PAC-TASK-206 | PAC-TASK-206 - Implement remove item from Draft Order API                               | US-61            | PAC-EPIC-08     | POS & Checkout            | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-207 | PAC-TASK-207 - Build remove item action in POS                                          | US-61            | PAC-EPIC-08     | POS & Checkout            | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-208 | PAC-TASK-208 - Implement Draft Order total calculation service                          | US-62            | PAC-EPIC-08     | POS & Checkout            | High         | Sprint 4   | Automatic    |
| PAC-TASK-209 | PAC-TASK-209 - Display Draft Order totals in POS UI                                     | US-62            | PAC-EPIC-08     | POS & Checkout            | High         | Sprint 4   | Automatic    |
| PAC-TASK-210 | PAC-TASK-210 - Ensure no coupon or discount logic in MVP Draft Order total              | US-62            | PAC-EPIC-08     | POS & Checkout            | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-211 | PAC-TASK-211 - Show POS stock validation errors                                         | US-63            | PAC-EPIC-08     | POS & Checkout            | High         | Sprint 4   | Automatic    |
| PAC-TASK-212 | PAC-TASK-212 - Implement walk-in customer support in order model                        | US-64            | PAC-EPIC-08     | POS & Checkout            | High         | Sprint 4   | Automatic    |
| PAC-TASK-213 | PAC-TASK-213 - Display walk-in customer option in POS                                   | US-64            | PAC-EPIC-08     | POS & Checkout            | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-214 | PAC-TASK-214 - Keep full Customer Management out of MVP POS flow                        | US-64            | PAC-EPIC-08     | POS & Checkout            | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-215 | PAC-TASK-215 - Apply Staff ownership scope to order list API                            | US-65            | PAC-EPIC-08     | POS & Checkout            | High         | Sprint 4   | Automatic    |
| PAC-TASK-216 | PAC-TASK-216 - Build Staff scoped order list UI                                         | US-65            | PAC-EPIC-08     | POS & Checkout            | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-217 | PAC-TASK-217 - Implement Admin all-orders list API                                      | US-66            | PAC-EPIC-08     | POS & Checkout            | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-218 | PAC-TASK-218 - Build Admin all-orders UI                                                | US-66            | PAC-EPIC-08     | POS & Checkout            | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-219 | PAC-TASK-219 - Implement cancel Draft Order API                                         | US-67            | PAC-EPIC-08     | POS & Checkout            | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-220 | PAC-TASK-220 - Build cancel Draft Order UI                                              | US-67            | PAC-EPIC-08     | POS & Checkout            | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-221 | PAC-TASK-221 - Prevent cancel PAID or already CANCELLED order                           | US-67            | PAC-EPIC-08     | POS & Checkout            | High         | Sprint 4   | Automatic    |
| PAC-TASK-222 | PAC-TASK-222 - Preserve Draft Order after checkout failure in UI                        | US-68            | PAC-EPIC-08     | POS & Checkout            | Highest      | Sprint 4   | Automatic    |
| PAC-TASK-223 | PAC-TASK-223 - Restore checkout error state back to Draft Order                         | US-68            | PAC-EPIC-08     | POS & Checkout            | High         | Sprint 4   | Automatic    |
| PAC-TASK-224 | PAC-TASK-224 - Build Order Detail screen for DRAFT/PAID/CANCELLED                       | US-65            | PAC-EPIC-08     | POS & Checkout            | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-225 | PAC-TASK-225 - Add POS API integration tests                                            | US-57            | PAC-EPIC-19     | Testing & Setup           | High         | Sprint 4   | Automatic    |
| PAC-TASK-226 | PAC-TASK-226 - Add POS frontend smoke test checklist                                    | US-68            | PAC-EPIC-19     | Testing & Setup           | Medium       | Sprint 4   | Automatic    |
| PAC-TASK-227 | PAC-TASK-227 - Create drug_interaction_rules Prisma model                               | US-69            | PAC-EPIC-09     | InteractionAlert          | Highest      | Sprint 5   | Automatic    |
| PAC-TASK-228 | PAC-TASK-228 - Implement create ActiveIngredient-level interaction rule API             | US-69            | PAC-EPIC-09     | InteractionAlert          | Highest      | Sprint 5   | Automatic    |
| PAC-TASK-229 | PAC-TASK-229 - Build DrugInteraction Rule management screen                             | US-69            | PAC-EPIC-09     | InteractionAlert          | High         | Sprint 5   | Automatic    |
| PAC-TASK-230 | PAC-TASK-230 - Validate two active ingredients in interaction rule                      | US-69            | PAC-EPIC-09     | InteractionAlert          | High         | Sprint 5   | Automatic    |
| PAC-TASK-231 | PAC-TASK-231 - Implement update DrugInteraction Rule API                                | US-70            | PAC-EPIC-09     | InteractionAlert          | High         | Sprint 5   | Automatic    |
| PAC-TASK-232 | PAC-TASK-232 - Implement deactivate DrugInteraction Rule API                            | US-70            | PAC-EPIC-09     | InteractionAlert          | High         | Sprint 5   | Automatic    |
| PAC-TASK-233 | PAC-TASK-233 - Trigger Graph Sync event on interaction rule change                      | US-70            | PAC-EPIC-09     | InteractionAlert          | High         | Sprint 5   | Automatic    |
| PAC-TASK-234 | PAC-TASK-234 - Validate severity enum LOW/MEDIUM/HIGH only                              | US-71            | PAC-EPIC-09     | InteractionAlert          | High         | Sprint 5   | Automatic    |
| PAC-TASK-235 | PAC-TASK-235 - Implement derive interaction from medicine active ingredients            | US-72            | PAC-EPIC-09     | InteractionAlert          | Highest      | Sprint 5   | Automatic    |
| PAC-TASK-236 | PAC-TASK-236 - Add tests for derived medicine interactions                              | US-72            | PAC-EPIC-19     | Testing & Setup           | High         | Sprint 5   | Automatic    |
| PAC-TASK-237 | PAC-TASK-237 - Implement order interaction check service                                | US-73            | PAC-EPIC-10     | InteractionAlert          | Highest      | Sprint 5   | Automatic    |
| PAC-TASK-238 | PAC-TASK-238 - Implement POST /orders/{id}/interactions/check API                       | US-73            | PAC-EPIC-10     | InteractionAlert          | Highest      | Sprint 5   | Automatic    |
| PAC-TASK-239 | PAC-TASK-239 - Create interaction_alerts Prisma model                                   | US-74            | PAC-EPIC-10     | InteractionAlert          | Highest      | Sprint 5   | Automatic    |
| PAC-TASK-240 | PAC-TASK-240 - Persist displayed InteractionAlert snapshot fields                       | US-74            | PAC-EPIC-10     | InteractionAlert          | Highest      | Sprint 5   | Automatic    |
| PAC-TASK-241 | PAC-TASK-241 - Enforce one active alert per order and interaction rule                  | US-75            | PAC-EPIC-10     | InteractionAlert          | Highest      | Sprint 5   | Automatic    |
| PAC-TASK-242 | PAC-TASK-242 - Update display_count and last_displayed_at                               | US-76            | PAC-EPIC-10     | InteractionAlert          | High         | Sprint 5   | Automatic    |
| PAC-TASK-243 | PAC-TASK-243 - Build POS InteractionAlert panel                                         | US-77            | PAC-EPIC-10     | InteractionAlert          | High         | Sprint 5   | Automatic    |
| PAC-TASK-244 | PAC-TASK-244 - Implement LOW/MEDIUM/HIGH alert display logic                            | US-77            | PAC-EPIC-10     | InteractionAlert          | High         | Sprint 5   | Automatic    |
| PAC-TASK-245 | PAC-TASK-245 - Build HIGH alert acknowledgement UI                                      | US-78            | PAC-EPIC-10     | InteractionAlert          | Highest      | Sprint 5   | Automatic    |
| PAC-TASK-246 | PAC-TASK-246 - Implement acknowledge InteractionAlert API                               | US-78            | PAC-EPIC-10     | InteractionAlert          | Highest      | Sprint 5   | Automatic    |
| PAC-TASK-247 | PAC-TASK-247 - Build HIGH alert consultation note UI                                    | US-79            | PAC-EPIC-10     | InteractionAlert          | Highest      | Sprint 5   | Automatic    |
| PAC-TASK-248 | PAC-TASK-248 - Implement consultation note API per HIGH alert                           | US-79            | PAC-EPIC-10     | InteractionAlert          | Highest      | Sprint 5   | Automatic    |
| PAC-TASK-249 | PAC-TASK-249 - Validate HIGH alert consultation note is not empty                       | US-79            | PAC-EPIC-10     | InteractionAlert          | Highest      | Sprint 5   | Automatic    |
| PAC-TASK-250 | PAC-TASK-250 - Implement checkout blocker for unresolved HIGH alerts                    | US-80            | PAC-EPIC-10     | InteractionAlert          | Highest      | Sprint 5   | Automatic    |
| PAC-TASK-251 | PAC-TASK-251 - Build UI prompt when checkout is blocked by HIGH alert                   | US-80            | PAC-EPIC-10     | InteractionAlert          | High         | Sprint 5   | Automatic    |
| PAC-TASK-252 | PAC-TASK-252 - Build Admin InteractionAlert History API and UI                          | US-81            | PAC-EPIC-10     | InteractionAlert          | High         | Sprint 5   | Automatic    |
| PAC-TASK-253 | PAC-TASK-253 - Enforce Warehouse no-access to InteractionAlert APIs                     | US-82            | PAC-EPIC-10     | InteractionAlert          | High         | Sprint 5   | Automatic    |
| PAC-TASK-254 | PAC-TASK-254 - Add tests for Warehouse no-access to InteractionAlert                    | US-82            | PAC-EPIC-19     | Testing & Setup           | High         | Sprint 5   | Automatic    |
| PAC-TASK-255 | PAC-TASK-255 - Add InteractionAlert lifecycle integration tests                         | US-74            | PAC-EPIC-19     | Testing & Setup           | Highest      | Sprint 5   | Automatic    |
| PAC-TASK-256 | PAC-TASK-256 - Add HIGH acknowledgement and consultation note tests                     | US-78            | PAC-EPIC-19     | Testing & Setup           | Highest      | Sprint 5   | Automatic    |
| PAC-TASK-257 | PAC-TASK-257 - Add filters to InteractionAlert History                                  | US-81            | PAC-EPIC-10     | InteractionAlert          | Medium       | Sprint 5   | Automatic    |
| PAC-TASK-258 | PAC-TASK-258 - Add InteractionAlert snapshot and traceability notes                     | US-74            | PAC-EPIC-21     | Documentation             | Low          | Sprint 5   | Automatic    |
| PAC-TASK-259 | PAC-TASK-259 - Define Checkout DTO and validation schema                                | US-83            | PAC-EPIC-11     | POS & Checkout            | Highest      | Sprint 6   | Automatic    |
| PAC-TASK-260 | PAC-TASK-260 - Implement CheckoutController POST /checkout                              | US-83            | PAC-EPIC-11     | POS & Checkout            | Highest      | Sprint 6   | Automatic    |
| PAC-TASK-261 | PAC-TASK-261 - Implement CheckoutService transaction skeleton                           | US-83            | PAC-EPIC-11     | POS & Checkout            | Highest      | Sprint 6   | Automatic    |
| PAC-TASK-262 | PAC-TASK-262 - Validate checkout actor permission and order ownership                   | US-84            | PAC-EPIC-11     | POS & Checkout            | Highest      | Sprint 6   | Automatic    |
| PAC-TASK-263 | PAC-TASK-263 - Validate order exists and status is DRAFT                                | US-85            | PAC-EPIC-11     | POS & Checkout            | Highest      | Sprint 6   | Automatic    |
| PAC-TASK-264 | PAC-TASK-264 - Validate unresolved HIGH alerts before payment                           | US-86            | PAC-EPIC-11     | POS & Checkout            | Highest      | Sprint 6   | Automatic    |
| PAC-TASK-265 | PAC-TASK-265 - Validate sellable stock inside checkout transaction                      | US-87            | PAC-EPIC-11     | POS & Checkout            | Highest      | Sprint 6   | Automatic    |
| PAC-TASK-266 | PAC-TASK-266 - Build Checkout full page or full-height panel UI                         | US-83            | PAC-EPIC-11     | POS & Checkout            | High         | Sprint 6   | Automatic    |
| PAC-TASK-267 | PAC-TASK-267 - Build payment method selector in Checkout UI                             | US-93            | PAC-EPIC-11     | POS & Checkout            | High         | Sprint 6   | Automatic    |
| PAC-TASK-268 | PAC-TASK-268 - Define FEFO allocation input/output model                                | US-88            | PAC-EPIC-11     | POS & Checkout            | Highest      | Sprint 6   | Automatic    |
| PAC-TASK-269 | PAC-TASK-269 - Query sellable MedicineBatch for FEFO                                    | US-88            | PAC-EPIC-11     | Inventory & MedicineBatch | Highest      | Sprint 6   | Automatic    |
| PAC-TASK-270 | PAC-TASK-270 - Sort FEFO batches by nearest expiry date                                 | US-88            | PAC-EPIC-11     | POS & Checkout            | Highest      | Sprint 6   | Automatic    |
| PAC-TASK-271 | PAC-TASK-271 - Allocate requested quantity across multiple batches                      | US-88            | PAC-EPIC-11     | POS & Checkout            | Highest      | Sprint 6   | Automatic    |
| PAC-TASK-272 | PAC-TASK-272 - Reject FEFO allocation when sellable stock is insufficient               | US-88            | PAC-EPIC-11     | POS & Checkout            | Highest      | Sprint 6   | Automatic    |
| PAC-TASK-273 | PAC-TASK-273 - Create order_batch_allocations Prisma model                              | US-89            | PAC-EPIC-11     | POS & Checkout            | Highest      | Sprint 6   | Automatic    |
| PAC-TASK-274 | PAC-TASK-274 - Persist order_batch_allocations during checkout                          | US-89            | PAC-EPIC-11     | POS & Checkout            | Highest      | Sprint 6   | Automatic    |
| PAC-TASK-275 | PAC-TASK-275 - Deduct MedicineBatch quantities inside checkout transaction              | US-90            | PAC-EPIC-11     | POS & Checkout            | Highest      | Sprint 6   | Automatic    |
| PAC-TASK-276 | PAC-TASK-276 - Create idempotency_records Prisma model                                  | US-91            | PAC-EPIC-11     | POS & Checkout            | Highest      | Sprint 6   | Automatic    |
| PAC-TASK-277 | PAC-TASK-277 - Implement idempotency key handling for checkout                          | US-91            | PAC-EPIC-11     | POS & Checkout            | Highest      | Sprint 6   | Automatic    |
| PAC-TASK-278 | PAC-TASK-278 - Rollback checkout transaction on failure                                 | US-92            | PAC-EPIC-11     | POS & Checkout            | Highest      | Sprint 6   | Automatic    |
| PAC-TASK-279 | PAC-TASK-279 - Create payments Prisma model                                             | US-93            | PAC-EPIC-11     | POS & Checkout            | High         | Sprint 6   | Automatic    |
| PAC-TASK-280 | PAC-TASK-280 - Implement cash payment handling inside checkout                          | US-93            | PAC-EPIC-11     | POS & Checkout            | High         | Sprint 6   | Automatic    |
| PAC-TASK-281 | PAC-TASK-281 - Calculate and persist change_amount                                      | US-94            | PAC-EPIC-11     | POS & Checkout            | High         | Sprint 6   | Automatic    |
| PAC-TASK-282 | PAC-TASK-282 - Implement bank transfer transaction_reference validation                 | US-95            | PAC-EPIC-11     | POS & Checkout            | Medium       | Sprint 6   | Automatic    |
| PAC-TASK-283 | PAC-TASK-283 - Enforce one SUCCESS payment per order                                    | US-96            | PAC-EPIC-11     | POS & Checkout            | Highest      | Sprint 6   | Automatic    |
| PAC-TASK-284 | PAC-TASK-284 - Allow failed payment attempts without creating duplicate SUCCESS payment | US-96            | PAC-EPIC-11     | POS & Checkout            | High         | Sprint 6   | Automatic    |
| PAC-TASK-285 | PAC-TASK-285 - Create invoices Prisma model                                             | US-97            | PAC-EPIC-11     | POS & Checkout            | High         | Sprint 6   | Automatic    |
| PAC-TASK-286 | PAC-TASK-286 - Generate invoice inside checkout transaction                             | US-97            | PAC-EPIC-11     | POS & Checkout            | Highest      | Sprint 6   | Automatic    |
| PAC-TASK-287 | PAC-TASK-287 - Build invoice view and print UI                                          | US-98            | PAC-EPIC-11     | POS & Checkout            | Medium       | Sprint 6   | Automatic    |
| PAC-TASK-288 | PAC-TASK-288 - Update order status to PAID only after successful checkout               | US-83            | PAC-EPIC-11     | POS & Checkout            | Highest      | Sprint 6   | Automatic    |
| PAC-TASK-289 | PAC-TASK-289 - Add checkout integration tests                                           | US-83            | PAC-EPIC-19     | Testing & Setup           | Highest      | Sprint 6   | Automatic    |
| PAC-TASK-290 | PAC-TASK-290 - Add FEFO, idempotency and rollback tests                                 | US-88            | PAC-EPIC-19     | Testing & Setup           | Highest      | Sprint 6   | Automatic    |

---

# Out-of-scope guard cho tài liệu 4B

Không tạo hoặc implement Task trong phần này cho các nội dung sau:

```text
Sửa trực tiếp MedicineBatch quantity ngoài Inventory Adjustment
Inventory Adjustment không có reason
Inventory Adjustment làm quantity âm
POS bán thuốc inactive
POS bán vượt sellable quantity
Full Customer Management trong MVP
Coupon/discount trong MVP Draft Order total
Medicine-level interaction rule làm source of truth
CRITICAL severity trong MVP
InteractionAlert chỉ hiển thị tạm mà không persist
Duplicate active InteractionAlert cho cùng order_id + interaction_id
HIGH alert không cần acknowledgement
HIGH alert không cần consultation note
Warehouse truy cập InteractionAlert
Checkout bằng /orders/{id}/pay làm main flow
Payment success ngoài checkout transaction
Invoice tạo ngoài checkout transaction
Checkout không rollback khi lỗi
Checkout không idempotent
FEFO chọn batch hết hạn
Neo4j quyết định checkout
Refund/return workflow trong MVP
```

---

# Bảng tóm tắt Task theo Sprint trong tài liệu 4B

| **Sprint** |              **Task range** | **Số Task** | **Nội dung chính**                       |
| ---------- | --------------------------: | ----------: | ---------------------------------------- |
| Sprint 3   | PAC-TASK-146 → PAC-TASK-160 |          15 | Stock Import completion                  |
| Sprint 4   | PAC-TASK-161 → PAC-TASK-226 |          66 | Inventory Adjustment và POS Draft Order  |
| Sprint 5   | PAC-TASK-227 → PAC-TASK-258 |          32 | DrugInteraction Rule và InteractionAlert |
| Sprint 6   | PAC-TASK-259 → PAC-TASK-290 |          32 | Checkout, FEFO, Payment, Invoice         |
| **Tổng**   | PAC-TASK-146 → PAC-TASK-290 |     **145** | MVP POS, Interaction và Checkout         |

Thông tin cảnh báo tương tác thuốc và nội dung AI trong hệ thống chỉ mang tính hỗ trợ tham khảo cho đồ án, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.
