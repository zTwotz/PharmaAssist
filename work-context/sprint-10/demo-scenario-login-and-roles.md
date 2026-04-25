# Demo Scenario: Login and Role Switching

This script guides the presenter through demonstrating the Role-Based Access Control (RBAC) capabilities of the PharmaAssist MVP.

## Preparation
- Ensure the backend and frontend are running locally.
- Ensure the database has been seeded (`npm run demo:reset` in the backend).
- Open the application in an incognito window to avoid conflicting sessions.

## 1. Staff Login & Restrictions

**Goal:** Demonstrate that a Staff user can access sales features but is blocked from warehouse/admin features.

**Steps:**
1. Navigate to the login page (e.g., `http://localhost:3000`).
2. Enter the Staff credentials:
   - Email: `staff@pharmaassist.com`
   - Password: `staff123`
3. Click "Login".
4. Observe the successful redirect to the Dashboard.
5. In the sidebar, click on **Point of Sale (POS)**. Observe that the page loads successfully.
6. In the sidebar, click on **Inventory Management** or manually navigate to `/inventory/adjustments`.
7. **Expectation:** The system should block access (either via UI hiding the link, or returning a 403 Forbidden/Redirecting if accessed directly) because Staff does not have the `MANAGE_INVENTORY` permission.
8. Log out using the user menu in the top right.

## 2. Warehouse Login & Restrictions

**Goal:** Demonstrate that a Warehouse user can manage stock but is blocked from selling.

**Steps:**
1. On the login page, enter the Warehouse credentials:
   - Email: `warehouse@pharmaassist.com`
   - Password: `warehouse123`
2. Click "Login".
3. In the sidebar, click on **Inventory Management**. Observe that the page loads successfully, and "Adjust Stock" options are available.
4. In the sidebar, look for **Point of Sale (POS)**.
5. **Expectation:** The POS link should be hidden, or attempting to navigate to it directly should be blocked, as Warehouse does not have `CREATE_SALES` permissions.
6. Log out.

## 3. Admin Login & Full Access

**Goal:** Demonstrate that the Admin user has unrestricted access.

**Steps:**
1. On the login page, enter the Admin credentials:
   - Email: `admin@pharmaassist.com`
   - Password: `admin123`
2. Click "Login".
3. **Expectation:** The sidebar should display all available modules (Dashboard, POS, Inventory, Reports, Settings).
4. Click through the modules to verify access is granted across the board.
