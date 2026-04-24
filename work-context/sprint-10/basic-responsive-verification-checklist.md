# Basic Responsive Verification Checklist

This checklist verifies that the PharmaAssist application provides a usable experience on different screen sizes, even if full mobile support is not an MVP requirement. The goal is to ensure the UI does not break on smaller displays (e.g., tablets or resized windows).

## Target Viewports
- **Desktop (Large)**: >= 1200px
- **Desktop (Standard)**: 1024px
- **Tablet (Landscape)**: 1024x768
- **Tablet (Portrait)**: 768x1024

## Verification Steps

### 1. General Layout
- [ ] Container widths adapt to the viewport size.
- [ ] Grids and columns collapse into fewer columns or stacked layouts on smaller screens.
- [ ] Margins and padding scale appropriately to avoid cramped or overly spaced content.
- [ ] Text remains readable and does not overlap.

### 2. Navigation
- [ ] Sidebar/Navigation menu is usable on all target viewports.
- [ ] If applicable, navigation transitions to a mobile-friendly menu (e.g., hamburger icon) on smaller screens.

### 3. Forms & Inputs
- [ ] Input fields shrink or stack appropriately without breaking the layout.
- [ ] Labels remain aligned with their respective inputs.
- [ ] Buttons are easily clickable on touch devices (Tablet).

### 4. Data Tables
- [ ] Large tables scroll horizontally on smaller screens instead of breaking the layout.
- [ ] Table headers and content remain aligned.

### 5. Modals & Overlays
- [ ] Modals fit within the viewport and do not get cut off.
- [ ] Modals are scrollable if their content exceeds the screen height.
- [ ] Close buttons remain visible and clickable.

### 6. Specific Components
- [ ] **POS/Checkout**: The layout accommodates both product selection and the cart/summary.
- [ ] **Copilot**: The chat interface remains usable without obscuring critical application content.

## Notes
- Testing can be done using browser developer tools (Device Mode) or by manually resizing the browser window.
- Document any significant responsive issues in Jira.
