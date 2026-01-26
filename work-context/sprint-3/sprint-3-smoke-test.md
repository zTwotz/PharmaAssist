# Sprint 3 Smoke Test Checklist — PharmaAssist AI Intelligence

> This checklist ensures all core flows of Sprint 3 (MedicineBatch, Inventory Summary & Stock Import) are working correctly before release.

## 1. Inventory & MedicineBatch (PAC-EPIC-05)

### 1.1. MedicineBatch Integrity
- [ ] Create a new batch, verify `batch_number` and `expiry_date` are mandatory.
- [ ] Verify identical `batch_number` + `expiry_date` does not create duplicate entries but instead merges stock quantity (if via Stock Import).
- [ ] Verify identical `batch_number` but *different* `expiry_date` is strictly rejected by the backend.

### 1.2. Inventory Summary
- [ ] Navigate to "Inventory Summary" page.
- [ ] Verify the table shows total aggregate stock quantities correctly derived from `MedicineBatch`.
- [ ] Search/Filter the summary view and ensure results match expectations.
- [ ] Check Sellable quantity logic (ensure expired batches are excluded from the total sellable count).

## 2. Stock Import (PAC-EPIC-06)

### 2.1. Create and Manage Draft Imports
- [ ] Create a new Stock Import (status: DRAFT).
- [ ] Select an Active Supplier and Warehouse.
- [ ] Try creating an import with an *Inactive Supplier*, ensure it's rejected.
- [ ] Add line items to the draft import with varying batch numbers, quantities, and valid expiry dates.
- [ ] Try adding a line item with an expiry date in the *past*, verify it's rejected.
- [ ] Update quantity and price for a draft line item, check that the total amount recalculates.
- [ ] Delete a draft line item successfully.

### 2.2. Confirm Stock Import
- [ ] Open the draft stock import and click "Xác Nhận Phiếu Nhập".
- [ ] Confirm the prompt.
- [ ] Verify the status immediately changes to **CONFIRMED**.
- [ ] Verify the UI updates to show the Read-only banner and the "Ngày Xác Nhận (Audit)" timestamp.
- [ ] Try to update or delete a line item from this confirmed import (UI should hide the buttons, API should return 400 Bad Request).
- [ ] Try confirming the same import again, ensure the duplicate action is prevented.

### 2.3. Audit & Batch Merge Verification
- [ ] Navigate to the Inventory/Batches page or query `MedicineBatch` directly.
- [ ] Verify that the quantities from the newly confirmed stock import have been added correctly to the respective batches.
- [ ] Verify `AuditLog` table contains an entry for `STOCK_IMPORT_CONFIRM` with the corresponding import ID and user ID.
