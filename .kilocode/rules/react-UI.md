# react-UI.md

This rule defines the UI and design standards for building and refactoring the React application's interface using a modern Web3 / cryptocurrency-inspired dashboard style while maintaining enterprise-level usability and existing business logic.

The goal is to create a visually modern, responsive, and highly maintainable UI system while preserving all current functionality.

---

## Guidelines

- Only redesign the UI layer. Do not modify API calls, backend logic, or business rules.
- Use **:contentReference[oaicite:0]{index=0}** with **:contentReference[oaicite:1]{index=1} (TSX)** for all components.
- Use **:contentReference[oaicite:2]{index=2}** as the primary styling system.
- Build UI components using **:contentReference[oaicite:3]{index=3}** whenever possible.
- Use **:contentReference[oaicite:4]{index=4}** for all icons to maintain visual consistency.
- Implement charts using **:contentReference[oaicite:5]{index=5}** for dashboards and analytics.
- Implement advanced tables using **:contentReference[oaicite:6]{index=6}** with sorting, filtering, and pagination.
- Use **:contentReference[oaicite:7]{index=7}** for toast notifications such as success, error, warning, and info alerts.
- Use **:contentReference[oaicite:8]{index=8}** to create subtle animations such as modal transitions, hover states, and page transitions.
- Optionally use **:contentReference[oaicite:9]{index=9}** for Web3-style animated backgrounds.
- Follow a modern **Web3 dashboard design language**: dark mode interface, gradient highlights, glassmorphism cards, and soft glow effects.
- Maintain a professional UI suitable for enterprise or government systems.
- Ensure all layouts are fully responsive across mobile, tablet, and desktop devices.
- Structure the UI using a consistent layout pattern: Sidebar Navigation → Top Navigation → Main Content Area.
- Sidebar navigation should support icons, active route highlighting, and collapsible behavior.
- Top navigation should include search, notifications, and a user profile dropdown.
- Cards should use rounded corners, subtle borders, soft shadows, and dark backgrounds.
- Buttons should support gradient or accent styles with smooth hover animations.
- Wrap charts, tables, and major content sections inside card containers.
- All tables must support responsive layouts and loading states.
- Forms must include clear labels, validation feedback, logical grouping, and proper spacing.
- Modals and dialogs must use shadcn dialog components with centered layout and smooth animations.
- Animations should be subtle and professional; avoid excessive motion.
- Build reusable components such as StatisticCard, DashboardChart, DataTable, FormInput, ModalDialog, and PageHeader.
- Follow component-based architecture and avoid duplicating UI logic.
- Use strict TypeScript typing for all components and props.
- Keep components modular, readable, and maintainable.
- Use the following folder structure for UI organization:
src/
components/
layouts/
pages/
ui/
hooks/
lib/

- Place reusable UI elements inside `/ui`.
- Place layout structures inside `/layouts`.
- Place page-level components inside `/pages`.
- Optimize performance by preventing unnecessary re-renders and using lazy loading where appropriate.
- Maintain a clean and consistent design system across the entire application.
- The final interface should resemble a modern crypto-style dashboard while remaining professional and maintainable.
