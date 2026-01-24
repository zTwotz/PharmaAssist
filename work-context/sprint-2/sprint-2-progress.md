# Sprint 2 Progress Report — Medicine, ActiveIngredient & Supplier

## 1. Overall Progress

```text
Sprint State: In Progress
Current Epic: PAC-3 (Medicine & ActiveIngredient)
Current User Story: US-21 (Chuẩn hóa dữ liệu hoạt chất - PAC-60) — Completed
Current Task: None (US-21 Completed)
Current Branch: feature/PAC-3-EPIC-03-medicine-activeingredient
Overall Progress: 32/49 Tasks Completed — 65.3%
Ready for Sprint 3: No
```

---

## 2. Detailed Task Tracking

### PAC-EPIC-03 — Medicine & ActiveIngredient (Logical: PAC-EPIC-03 | Jira: PAC-3)

#### US-13 — Thêm thuốc mới (Logical: US-13 | Jira: PAC-52)
- [x] **`PAC-263`** (PAC-TASK-053): Create medicines Prisma model — **Done** (In `schema.prisma`)
- [x] **`PAC-264`** (PAC-TASK-054): Add medicine code uniqueness constraint — **Done** (In `schema.prisma`)
- [x] **`PAC-265`** (PAC-TASK-055): Implement POST /medicines API — **Done** (In `medicines.controller.ts` & `medicines.service.ts`)
- [x] **`PAC-266`** (PAC-TASK-056): Build medicine create form — **Done** (In `app/dashboard/medicines/new/page.tsx`)
- [x] **`PAC-267`** (PAC-TASK-057): Add medicine create success/error UI state — **Done** (Integrated API success/error and redirection in new/page.tsx)

#### US-14 — Cập nhật thông tin thuốc (Logical: US-14 | Jira: PAC-53)
- [x] **`PAC-268`** (PAC-TASK-058): Implement PATCH /medicines/{id} API — **Done** (PATCH route with price validation)
- [x] **`PAC-269`** (PAC-TASK-059): Build medicine edit form — **Done** (Edit form integrated with action API)
- [x] **`PAC-270`** (PAC-TASK-060): Add medicine update validation and errors — **Done** (Frontend and backend validations verified)

#### US-15 — Tìm kiếm và lọc thuốc (Logical: US-15 | Jira: PAC-54)
- [x] **`PAC-271`** (PAC-TASK-061): Implement medicine list API with pagination — **Done** (Backend paginated fetching with page/limit)
- [x] **`PAC-272`** (PAC-TASK-062): Implement medicine search by code/name — **Done** (Search term matching implemented in service)
- [x] **`PAC-273`** (PAC-TASK-063): Implement medicine filters — **Done** (Filters for status, category, and prescription requirements)
- [x] **`PAC-274`** (PAC-TASK-064): Build medicine list table — **Done** (Table component exists)
- [x] **`PAC-275`** (PAC-TASK-065): Add medicine list empty/loading/error states — **Done** (Ternary loading states, error boundary alerts, and pagination controls implemented)

#### US-16 — Deactivate thuốc (Logical: US-16 | Jira: PAC-55)
- [x] **`PAC-276`** (PAC-TASK-066): Implement medicine deactivate API — **Done** (Implemented toggleStatus API and associated product updates)
- [x] **`PAC-277`** (PAC-TASK-067): Add deactivate action in medicine UI — **Done** (Added status toggle action and confirm dialog in MedicineList UI)
- [x] **`PAC-278`** (PAC-TASK-068): Prevent inactive medicines from POS selection — **Done** (Filtered variant search and blocked checkout of inactive variants)

#### US-17 — Validate giá bán thuốc lớn hơn 0 (Logical: US-17 | Jira: PAC-56)
- [x] **`PAC-279`** (PAC-TASK-069): Enforce selling_price greater than 0 in backend — **Done** (Enforced greater than 0 check in service logic and DTO Min decorators)
- [x] **`PAC-280`** (PAC-TASK-070): Add selling price validation in UI — **Done** (Added UI validation of price > 0 in medicine create and edit forms)
- [x] **`PAC-281`** (PAC-TASK-071): Add tests for medicine price validation — **Done** (Covered negative and zero price validation in unit tests)

#### US-18 — Quản lý ActiveIngredient (Logical: US-18 | Jira: PAC-57)
- [x] **`PAC-282`** (PAC-TASK-072): Create active_ingredients Prisma model — **Done** (In `schema.prisma`)
- [x] **`PAC-283`** (PAC-TASK-073): Implement ActiveIngredient create API — **Done** (Implemented create active ingredient endpoint with code generation)
- [x] **`PAC-284`** (PAC-TASK-074): Implement ActiveIngredient update API — **Done** (Implemented update endpoint for name, description, and status)
- [x] **`PAC-285`** (PAC-TASK-075): Implement ActiveIngredient list/search API — **Done** (Implemented paginated search endpoint with search/status filters)
- [x] **`PAC-286`** (PAC-TASK-076): Build ActiveIngredient management screen — **Done** (Created active ingredient list and form component inside medicines tabs)
- [x] **`PAC-287`** (PAC-TASK-077): Add ActiveIngredient create/edit form validation — **Done** (Enforced form validations on client and server sides)

#### US-19 — Mapping Medicine với ActiveIngredient (Logical: US-19 | Jira: PAC-58)
- [x] **`PAC-288`** (PAC-TASK-078): Create medicine_active_ingredients mapping schema — **Done** (In `schema.prisma`)
- [x] **`PAC-289`** (PAC-TASK-079): Implement Medicine-Ingredient mapping API — **Done** (Implemented controller and service with GraphSyncOutbox events)
- [x] **`PAC-290`** (PAC-TASK-080): Build ingredient mapping component in Medicine form — **Done** (Added selector card in new and edit forms)
- [x] **`PAC-291`** (PAC-TASK-081): Show mapped ingredients in medicine detail — **Done** (Rendered in medicine detail modal list)

#### US-20 — Validate mapping hoạt chất không trùng (Logical: US-20 | Jira: PAC-59)
- [x] **`PAC-292`** (PAC-TASK-082): Add unique validation for ingredient mapping — **Done** (Unique check in service, composite key constraint, and frontend select filtering)
- [x] **`PAC-293`** (PAC-TASK-083): Prevent mapping inactive ingredient if not allowed — **Done** (Blocked linking inactive ingredients in service and filtered out of available UI list)

#### US-21 — Chuẩn hóa dữ liệu hoạt chất (Logical: US-21 | Jira: PAC-60)
- [x] **`PAC-294`** (PAC-TASK-084): Normalize ActiveIngredient names — **Done** (Implemented Title Case and lowercase index checks)
- [x] **`PAC-295`** (PAC-TASK-085): Reject raw scraped ingredient strings in official mapping — **Done** (Enforced through ID constraints on API and dropdown selector notes on UI)
- [x] **`PAC-296`** (PAC-TASK-086): Add ActiveIngredient data quality review checklist — **Done** (Created active-ingredient-data-quality.md guidelines)

#### US-22 — Trigger Graph Sync khi Medicine/Ingredient thay đổi (Logical: US-22 | Jira: PAC-61)
- [ ] **`PAC-297`** (PAC-TASK-087): Create graph sync event when Medicine changes — **Not Started** (Need outbox event emitter)
- [ ] **`PAC-298`** (PAC-TASK-088): Create graph sync event when ActiveIngredient changes — **Not Started** (Need outbox event emitter)
- [ ] **`PAC-299`** (PAC-TASK-089): Create graph sync event when Ingredient mapping changes — **Not Started** (Need outbox event emitter)

---

## 3. Branch & PR Plan

Epic Branches:
- **PAC-EPIC-03 — Medicine & ActiveIngredient**: `feature/PAC-3-EPIC-03-medicine-activeingredient`
- **PAC-EPIC-04 — Supplier Management**: `feature/PAC-4-EPIC-04-supplier-management`

We will implement User Story by User Story, creating a story branch from the Epic branch, and task branches from the story branch.
- **US Branch**: `feature/<JIRA-STORY-KEY>-US-xx-<description>`
- **Task Branch**: `<type>/<JIRA-TASK-KEY>-TASK-xxx-<description>`
