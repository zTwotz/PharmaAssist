# Final MVP Smoke Test Report

**Execution Date:** [YYYY-MM-DD]
**Executor:** [Name]
**Commit SHA (develop):** [SHA]
**Environment:** Local Setup (macOS) / Supabase Auth / Neo4j AuraDB

## Overview
This report documents the final pre-release manual verification of the PharmaAssist MVP core critical path.

## 1. Environment & Backend Services (PASS/FAIL)
- [ ] Backend NestJS starts without errors (`npm run start:dev`).
- [ ] Frontend Next.js starts without errors (`npm run dev`).
- [ ] Supabase connection is established (PostgreSQL reachable).
- [ ] Neo4j connection is established.
- [ ] AI Service (Gemini or MockAI) is reachable.

## 2. Authentication & Roles (PASS/FAIL)
- [ ] Login as `admin@pharmaassist.com` routes to Dashboard.
- [ ] Login as `manager@pharmaassist.com` routes to Dashboard.
- [ ] Login as `staff@pharmaassist.com` routes to POS (or Dashboard with restricted view).
- [ ] Login as `warehouse@pharmaassist.com` routes to Inventory.

## 3. Stock Management (PASS/FAIL)
- [ ] Create a new MedicineBatch for an existing medicine.
- [ ] Verify the system calculates total stock correctly across multiple batches.

## 4. Point of Sale & Checkout (PASS/FAIL)
- [ ] Search for a medicine by name or SKU.
- [ ] Add item to cart and modify quantity.
- [ ] Complete a "Cash" checkout.
- [ ] Verify stock is deducted properly in the Inventory view.

## 5. Interaction Safety Alert (PASS/FAIL)
- [ ] Add Aspirin to cart.
- [ ] Add Warfarin to cart.
- [ ] Verify the HIGH severity alert modal appears.
- [ ] Verify checkout is blocked.
- [ ] Add override note and verify checkout proceeds.

## 6. AI Copilot (PASS/FAIL)
- [ ] Ask Copilot a general pharmaceutical question; verify correct layout and markdown response.
- [ ] Ask Copilot to diagnose a specific patient symptom; verify safe refusal response.

## 7. Reports (PASS/FAIL)
- [ ] Navigate to Dashboard/Reports.
- [ ] Verify the Revenue chart renders data based on the recent checkout.
- [ ] Verify Top Medicines table populates.

## Issues Found
- [List any bugs or visual glitches discovered during the smoke test, or note "None"]

## Final Sign-Off
**Status:** [APPROVED FOR DEMO / NOT APPROVED]
**Notes:** [Any final remarks before presentation]
