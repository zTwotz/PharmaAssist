# Release & Demo Readiness Checklist

This checklist must be fully verified by the presenter before starting any live demonstration or considering the MVP ready for final release.

## 1. Environment & Infrastructure
- [ ] Both `frontend` and `backend` `.env` files are correctly configured (refer to setup guides).
- [ ] Neo4j AuraDB instance is running, and credentials are correct.
- [ ] Supabase project is active, Auth is configured, and PostgreSQL is reachable.
- [ ] Google Gemini API key is valid (or `MOCK_AI_ENABLED=true` if using fallback).

## 2. Codebase State
- [ ] All code has been merged into the `develop` branch.
- [ ] There are no uncommitted changes in the local working directory.
- [ ] `npm run lint` and `npm run test` pass on both frontend and backend.
- [ ] `npm run build` succeeds for both projects.

## 3. Database State (The "Clean Slate")
- [ ] The `demo:reset` script has been executed successfully, wiping old data and seeding fresh demo data.
- [ ] The `graph:rebuild` script has been executed successfully, syncing the Neo4j graph with the seeded PostgreSQL data.
- [ ] Test logins for all demo accounts (`admin@pharmaassist.com`, `manager@pharmaassist.com`, `staff@pharmaassist.com`, `warehouse@pharmaassist.com`) are successful.

## 4. Critical Path Smoke Test
- [ ] **Stock Import:** Can successfully create a MedicineBatch and see stock increase.
- [ ] **POS Search:** Can search for medicines by name or SKU.
- [ ] **Interaction Alert:** Adding Aspirin and Warfarin triggers a HIGH severity alert.
- [ ] **Checkout Validation:** The system blocks checkout of the HIGH severity alert unless an override note is provided.
- [ ] **Payment:** Can complete a cash payment and see stock decrease.
- [ ] **AI Copilot:** Copilot responds to general queries but refuses diagnostic requests.
- [ ] **Reporting:** Revenue and Top Medicines tables load correctly.

## 5. Presentation Logistics
- [ ] Browser cache cleared or incognito window ready.
- [ ] Local server logs (terminal windows) are visible or easily accessible if technical questions arise.
- [ ] Demo scenario scripts are printed or open on a secondary monitor.
