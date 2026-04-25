# Demo Account Guide

This document lists the pre-configured demo accounts available in the PharmaAssist MVP. These accounts are automatically created when running the database seed script (`npm run demo:reset`).

## Pre-configured Users

All MVP demo accounts use the same default password structure: `[role]123`.

### 1. Admin Role
- **Email:** `admin@pharmaassist.com`
- **Password:** `admin123`
- **Access Level:** Full access to all modules, including user management, inventory, sales, reporting, and settings.
- **Primary Use Case:** System configuration, overriding permissions, comprehensive reporting.

### 2. Staff Role (Pharmacist/Sales)
- **Email:** `staff@pharmaassist.com`
- **Password:** `staff123`
- **Access Level:** Access to POS, Checkout, Patient records, and basic inventory viewing.
- **Restrictions:** Cannot perform stock adjustments, view sensitive financial reports, or manage other users.
- **Primary Use Case:** Daily sales operations, customer interaction, AI Copilot drug interaction checks.

### 3. Warehouse Role (Inventory Manager)
- **Email:** `warehouse@pharmaassist.com`
- **Password:** `warehouse123`
- **Access Level:** Access to Inventory Management, Stock Adjustments, Medicine Batches.
- **Restrictions:** Cannot access the POS, Checkout, or Patient records.
- **Primary Use Case:** Receiving new stock, auditing inventory levels, managing expirations.

## Supabase Auth Registration

If you are setting up a fresh Supabase project and connecting it to a newly seeded database, you must manually register these three email/password combinations in the Supabase Authentication dashboard to ensure the Auth UUIDs match the application database records correctly (or use a script to sync them). 

For standard local MVP testing, these users are typically pre-synced if using the provided `demo_reset.ts` script in a fully configured environment.
