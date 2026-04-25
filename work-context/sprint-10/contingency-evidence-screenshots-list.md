# Contingency Evidence Screenshots List

In the event of an unexpected environment failure during the live MVP demonstration (e.g., local database crash, network issue connecting to Neo4j, or unhandled UI bug), the presenter must rely on pre-captured evidence screenshots to prove the system's functionality.

## Required Screenshots

Before the final release presentation, ensure high-quality screenshots (or short screen recordings) are captured for the following critical workflows and stored in an accessible folder:

### 1. Stock Import Workflow
- `01_stock_import_form_empty.png` - The blank MedicineBatch creation form.
- `02_stock_import_form_filled.png` - The form filled with valid data.
- `03_stock_import_success_toast.png` - The success notification after submission.
- `04_inventory_list_updated.png` - The inventory table showing the newly added stock.

### 2. Point of Sale (POS) & Checkout
- `05_pos_search_results.png` - Searching for a medicine in the POS interface.
- `06_pos_cart_populated.png` - Items successfully added to the cart, showing total calculations.
- `07_checkout_modal_payment.png` - The checkout modal with Cash payment selected.
- `08_checkout_success.png` - The "Sale Completed" success state.

### 3. Interaction Alert (Safety Feature)
- `09_interaction_alert_triggered.png` - The UI showing the HIGH severity alert modal when Aspirin and Warfarin are added together.
- `10_checkout_blocked_no_note.png` - The checkout button disabled or showing validation error because the override note is missing.
- `11_checkout_unblocked_with_note.png` - The checkout allowed after entering the required pharmacist note.

### 4. AI Copilot
- `12_ai_safe_query_response.png` - The Copilot correctly answering a general pharmaceutical question (e.g., side effects of Paracetamol).
- `13_ai_unsafe_query_refusal.png` - The Copilot safely refusing to answer a diagnostic request.

### 5. RBAC & Reports
- `14_dashboard_admin_view.png` - The dashboard showing all charts and menus (Admin role).
- `15_dashboard_staff_view.png` - The dashboard showing restricted menus (Staff role).
- `16_reports_revenue_chart.png` - The Revenue Metrics chart populated with data.

## Usage Instructions during a Failure
If a live step fails, seamlessly transition:
> "It appears we are experiencing a temporary local environment issue [state the issue briefly, e.g., connecting to the Neo4j cloud instance]. However, to demonstrate how this feature behaves under normal conditions, let me show you the verification captures we took during our final testing phase earlier today..."
