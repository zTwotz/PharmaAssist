# Demo Scenario: Interaction Alert and HIGH Note

This script guides the presenter through demonstrating the system's core safety feature: detecting severe drug-drug interactions and forcing staff acknowledgment before allowing a sale to proceed.

## Preparation
- Ensure the backend (with Neo4j connection) and frontend are running locally.
- Ensure the database has been seeded (`npm run demo:reset`).
- Ensure the Neo4j graph has been rebuilt (`npm run graph:rebuild` in backend).
- Login as **Staff** (`staff@pharmaassist.com` / `staff123`) or **Admin**.

## 1. Triggering an Interaction Alert

**Goal:** Show how the system detects dangerous combinations of medicines in the cart.

**Steps:**
1. Navigate to the **Point of Sale (POS)** via the sidebar.
2. Search for and add "Aspirin 81mg" to the cart.
3. Search for and add "Warfarin 5mg" to the cart.
4. **Expectation:** As soon as the second item is added, a prominent visual alert (e.g., a modal or banner) should appear.
5. Point out the details of the alert:
   - Severity: HIGH
   - Interacting Drugs: Aspirin + Warfarin
   - Description: Increased risk of bleeding.

## 2. Testing the Hard Stop (The "HIGH Note" Requirement)

**Goal:** Demonstrate that the system physically prevents checkout until the pharmacist provides clinical justification for overriding a HIGH severity alert.

**Steps:**
1. Attempt to dismiss the alert without taking action.
2. Click the "Checkout" button in the cart panel.
3. **Expectation:** The Checkout Modal should open, but the final "Confirm Sale" or "Payment" button should be **disabled** or blocked with a validation error.
4. Point out the specific UI requirement demanding a "Pharmacist Note" or "Override Reason".

## 3. Resolving the Alert and Completing Checkout

**Goal:** Show the correct procedure for handling a flagged interaction.

**Steps:**
1. In the required note field within the Checkout Modal (or the cart interface, depending on UI implementation), enter a clinical justification (e.g., "Patient is aware. PT/INR monitored. Prescribing physician confirmed.").
2. **Expectation:** Once a sufficient note is entered, the "Confirm Sale" button should become active.
3. Select a payment method and complete the sale.
4. **Expectation:** A success notification appears.

## 4. (Optional) Verifying the Audit Log

**Goal:** Show that the override decision was recorded for compliance.

**Steps:**
1. Navigate to the **Reports** or **Interaction History** section (if available to the current role).
2. Look up the recent transaction.
3. **Expectation:** The system should display a record of the interaction, the HIGH severity flag, and the specific override note entered by the staff member.
