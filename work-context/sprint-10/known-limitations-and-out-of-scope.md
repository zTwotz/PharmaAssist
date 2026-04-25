# Known Limitations & Out of Scope (Guard Section)

During the MVP demonstration, questions may arise regarding features that are planned for future phases or edge cases not handled in this release. This document provides standardized, professional responses.

## 1. Multi-Branch Operations
- **Limitation:** The current system tracks inventory and sales for a single pharmacy location.
- **Guard Response:** "For the MVP, we focused on solidifying the core workflow for a single storefront. Multi-branch support, including inter-branch stock transfers and branch-specific reporting, is slated for our Future Expansion phase."

## 2. Advanced Returns and Refunds
- **Limitation:** The MVP allows order cancellation *before* payment, but complex post-payment refunds or partial returns are manual.
- **Guard Response:** "Currently, if a paid order needs to be refunded, a manager must manually adjust the inventory. Automated, integrated refund workflows and partial return processing are on the roadmap for the next major release."

## 3. Prescriptions and Electronic Health Records (EHR) Integration
- **Limitation:** PharmaAssist does not currently process or store digital prescriptions or patient medical histories.
- **Guard Response:** "To ensure HIPAA compliance and a lean initial release, we scope the MVP strictly to retail and inventory management. Deep EHR integration and prescription tracking require a separate security audit phase planned for the future."

## 4. Payment Gateway Integration (Stripe/VNPay)
- **Limitation:** The POS only supports recording "Cash" transactions. Credit card processing is not live.
- **Guard Response:** "The architecture is designed to support external payment gateways (like Stripe or local providers). For the MVP, we record the transaction amount and type. Physical integration with POS terminals and online payment gateways will be implemented based on specific client requirements."

## 5. Automated Reordering (Procurement)
- **Limitation:** While the system calculates stock, it does not automatically send purchase orders to suppliers when stock is low.
- **Guard Response:** "We currently provide the 'Low Stock' report to inform managers. The automated procurement module, which integrates with supplier APIs to generate purchase orders automatically, is a complex feature scheduled for post-MVP development."

## 6. AI Diagnosis
- **Limitation:** The AI Copilot refuses to diagnose patients.
- **Guard Response:** "This is an intentional safety constraint, not a limitation. Our AI Copilot is designed strictly for pharmaceutical knowledge retrieval to assist staff, not to replace a physician's diagnostic authority. We enforce this boundary rigorously to minimize liability."
