# PharmaAssist Full MVP Smoke Test Checklist

## 1. Authentication & Role-Based Access Control (RBAC)
- [ ] **Login**: Users can log in using valid credentials.
- [ ] **Session**: Active sessions persist after page reload.
- [ ] **Logout**: Users can securely log out.
- [ ] **Admin Role**: Admin can access all dashboards and settings.
- [ ] **Staff Role**: Staff can access POS, Inventory, but not System Settings.
- [ ] **Warehouse Role**: Warehouse personnel can access Inventory but not POS.
- [ ] **Forbidden Access**: Attempting to access unauthorized pages returns 403 Forbidden.

## 2. Medicine & Inventory Management
- [ ] **Create Medicine**: Admin/Staff can add a new medicine with active ingredients.
- [ ] **View Inventory**: Medicine stock levels are correctly displayed.
- [ ] **Add Batch**: Importing a new batch updates stock levels.
- [ ] **Stock Adjustments**: Staff can adjust inventory for damages or expirations.
- [ ] **Low Stock Warning**: System flags items below minimum stock thresholds.

## 3. POS, Interaction & Checkout
- [ ] **Add to Cart**: Staff can search and add medicines to the cart.
- [ ] **Interaction Warning**: System triggers an alert if conflicting medicines (e.g., Aspirin + Warfarin) are added.
- [ ] **Stock Validation**: Cannot add more items to cart than available in inventory.
- [ ] **Checkout Process**: Completing checkout reduces stock via FEFO (First Expire, First Out).
- [ ] **Receipt Generation**: Successful checkout generates an order record with `PAID` status.

## 4. AI Copilot & Graph RAG
- [ ] **AI Query**: Staff can ask the AI Copilot about medicine dosages or side effects.
- [ ] **Graph RAG Context**: AI uses Neo4j knowledge graph data (Graph-RAG) to answer interaction queries.
- [ ] **Fallback Mechanism**: If Neo4j is offline, AI falls back to PostgreSQL relational data.
- [ ] **Audit Logging**: All AI queries are logged in `AiAuditLog` with PII minimized.
- [ ] **Disclaimer**: AI responses display medical disclaimers.

## 5. Reports & Demo Reset
- [ ] **Revenue Report**: Correctly calculates total revenue and COGS for `PAID` orders.
- [ ] **Top Medicines Report**: Accurately lists top-selling products by quantity.
- [ ] **Inventory Report**: Accurately shows available vs reserved stock.
- [ ] **Demo Reset Command**: Executing the demo reset completely clears test data while keeping the curated base dataset intact.

---
**Status:** [Pending / Pass / Fail]
**Executed By:** [Name]
**Date:** [Date]
