# Demo Scenario: Reports and Settings

This script guides the presenter through demonstrating the analytical and administrative capabilities of PharmaAssist.

## Preparation
- Ensure the backend and frontend are running locally.
- Ensure the database has been seeded with historical transaction data (if applicable, or perform a few POS transactions beforehand).
- Login as **Admin**.

## 1. Viewing Revenue and Metrics

**Goal:** Show how the system provides business intelligence to pharmacy owners.

**Steps:**
1. Navigate to the **Reports** or **Dashboard** section via the sidebar.
2. Select the "Revenue Metrics" or "Sales Report" tab.
3. Select a date range (e.g., "This Month" or "Last 7 Days").
4. **Expectation:** The system should display high-level metrics (Total Revenue, Total Orders, Average Order Value).
5. Point out any charts or graphs visualizing sales trends over time.

## 2. Analyzing Top Performing Medicines

**Goal:** Demonstrate inventory insights.

**Steps:**
1. Within the Reports section, switch to the "Top Medicines" or "Best Sellers" view.
2. **Expectation:** The UI displays a table or chart listing the medicines with the highest sales volume or highest revenue generation for the selected period.
3. Explain how this data helps the pharmacy owner make restocking decisions.

## 3. Managing Users and Roles (Settings)

**Goal:** Show administrative control over system access.

**Steps:**
1. Navigate to the **Settings** > **User Management** section.
2. **Expectation:** A list of all registered staff members and their assigned roles is displayed.
3. Select a user (e.g., a "Staff" user).
4. Click "Edit" and change their role from "Staff" to "Manager" (or vice versa).
5. Click "Save".
6. **Expectation:** The user's role is updated in the table. Briefly explain that this change dictates their UI visibility and API permissions (RBAC) upon their next login.

## 4. Viewing Audit Logs (Optional)

**Goal:** Demonstrate system traceability and accountability.

**Steps:**
1. Navigate to the **Settings** > **Audit Logs** or **System Activity** section.
2. **Expectation:** A chronological list of critical actions is displayed (e.g., login events, interaction rule overrides, role changes).
3. Point out that these logs are immutable and crucial for healthcare compliance.
