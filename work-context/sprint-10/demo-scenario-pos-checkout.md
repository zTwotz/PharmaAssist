# Demo Scenario: POS and Checkout

This script guides the presenter through demonstrating the Point of Sale (POS) and checkout flow in the PharmaAssist MVP.

## Preparation
- Ensure the backend and frontend are running locally.
- Ensure the database has been seeded.
- Login as **Staff** (`staff@pharmaassist.com` / `staff123`) or **Admin**.

## 1. Searching and Adding Medicines

**Goal:** Demonstrate adding items to the cart.

**Steps:**
1. Navigate to the **Point of Sale (POS)** via the sidebar.
2. In the search bar, type "Para". The system should display "Paracetamol 500mg".
3. Click "Add to Cart" or the corresponding action button.
4. Clear the search, and type "Amo". The system should display "Amoxicillin 250mg".
5. Click "Add to Cart".
6. **Expectation:** Both items should now appear in the right-hand cart panel, and the subtotal should calculate automatically.

## 2. Adjusting Quantities

**Goal:** Demonstrate updating cart quantities and boundary checks.

**Steps:**
1. In the cart panel, increase the quantity of "Paracetamol 500mg" to `3`. Observe the total price updating.
2. Attempt to increase the quantity of "Amoxicillin 250mg" to an unreasonably high number (e.g., `999`).
3. **Expectation:** The system should prevent the quantity from exceeding the currently available stock for that item, displaying a warning or capping the input.

## 3. Checkout and Payment

**Goal:** Complete the transaction and verify stock deduction.

**Steps:**
1. Click the "Checkout" button at the bottom of the cart panel.
2. In the Checkout Modal, observe the Order Summary.
3. Select "Cash" as the Payment Method.
4. Enter an amount tendered that is equal to or slightly higher than the total amount due.
5. Click "Confirm Sale" or "Complete Payment".
6. **Expectation:** A success notification appears ("Sale completed successfully"). The cart should clear, ready for the next customer.

## 4. Verification

**Goal:** Show that the transaction impacted backend records correctly.

**Steps:**
1. (If accessible via role) Navigate to **Reports** or **Inventory Management**.
2. Locate the items sold. 
3. **Expectation:** The total stock quantity for those items should be reduced by the exact amounts sold in the previous step.
