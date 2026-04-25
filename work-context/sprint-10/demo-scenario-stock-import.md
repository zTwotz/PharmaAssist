# Demo Scenario: Stock Import and Medicine Batches

This script guides the presenter through demonstrating the Inventory Management flow, specifically importing stock and managing medicine batches (FEFO - First Expired, First Out readiness).

## Preparation
- Ensure the backend and frontend are running locally.
- Ensure the database has been seeded.
- Login as **Warehouse** (`warehouse@pharmaassist.com` / `warehouse123`) or **Admin**.

## 1. Viewing Current Stock

**Goal:** Understand the current inventory state before making adjustments.

**Steps:**
1. Navigate to the **Inventory Management** section via the sidebar.
2. In the `InventoryReportTable` or the main Medicine list, locate a specific medicine (e.g., "Paracetamol 500mg").
3. Note its current total stock quantity.

## 2. Importing New Stock (Creating a Batch)

**Goal:** Simulate receiving a new shipment of a medicine with a specific expiration date.

**Steps:**
1. Navigate to the **Stock Adjustments** (or similar "Receive Stock") page.
2. Select the medicine (e.g., "Paracetamol 500mg").
3. Set the adjustment type to **Import** (or Add).
4. Enter a quantity (e.g., `100`).
5. Crucially, enter a **Batch Number** (e.g., `BATCH-2026-01`) and an **Expiration Date** (e.g., set it to 2 years in the future).
6. Submit the form.
7. **Expectation:** A success message should appear.

## 3. Verifying the Update

**Goal:** Confirm the system correctly processed the import.

**Steps:**
1. Return to the main **Inventory Management** list.
2. Locate "Paracetamol 500mg" again.
3. **Expectation:** The total stock quantity should have increased by exactly `100`.
4. (If implemented in MVP UI): Click into the details of "Paracetamol 500mg" to view the specific `MedicineBatch` records. You should see the newly created batch with its specific expiration date listed alongside any pre-existing batches.
