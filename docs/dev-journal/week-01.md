# Dev Journal - Week 01

## Date: 2024-01-15 (Simulated Start)

### Goals
- Initialize project structure.
- Define architecture and Firestore schema.
- Setup tracking documents and Dev Journal.
- Configure Firebase.

### Work Completed
- Successfully planned the architecture using React 19, Vite, Tailwind CSS, shadcn/ui, TanStack query/table, and Zustand.
- Designed Firestore schema focusing on `users`, `departments`, `faculty`, `news`, `events`, and `gallery`.
- Initialized `PROJECT_STATUS.md`, `ROADMAP.md`.
- Set up weekly Dev Journal tracking.

### Design Decisions
- Opted for a completely serverless backend utilizing Firebase. This minimizes ops overhead and provides real-time updates seamlessly.
- Used `framer-motion` for complex animations as standard CSS transitions lack the orchestration capability needed for a premium, sequential storytelling experience.

### Problems Faced
- Ensure compatibility with Tailwind v4 for all shadcn/ui components.

### Next Steps
- Validate project setup and install any missing components.
- Initialize `firebase.ts` and React Router configuration.
