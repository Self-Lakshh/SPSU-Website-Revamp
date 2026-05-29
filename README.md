# Sir Padampat Singhania University (SPSU) - Modernized Experience Platform

Sir Padampat Singhania University (SPSU), founded by the JK Cement Group in Udaipur, Rajasthan, is a premier engineering and management institution. This repository houses the modernized digital experience platform, redesigning the university's web presence from the ground up as a highly interactive, accessible, and CMS-driven React application.

---

## 📸 Platform Showcases (UI Mockups)

Below are the premium, dark-theme UI mockups representing the core screens of the revamped SPSU experience.

### 1. Interactive Portal Homepage
Features modern layouts, sticky header navigation, scroll-driven storytelling animations, and dynamic news/events feeds.
![SPSU Homepage Mockup](public/screenshots/homepage.png)

### 2. Tabbed Academics Portal
Tab-based school listings with collapsible course accordions displaying duration, fees, eligibility criteria, and direct syllabus downloads.
![SPSU Academics Portal Mockup](public/screenshots/academics.png)

### 3. Faculty Search Directory
Dynamic name and field search index with category tabs, displaying real university mentors and deans.
![SPSU Faculty Directory Mockup](public/screenshots/faculty.png)

### 4. Placements & Careers Portal
Visualization of highest and average salary packages, recruitment metrics, scrolling recruiter logos, and student testimonials.
![SPSU Placements Dashboard Mockup](public/screenshots/placements.png)

### 5. CMS Administrative Console
Protected dashboard detailing enquiries summary counters and data tables for managing news publications, event calendars, and global settings.
![SPSU CMS Dashboard Mockup](public/screenshots/admin_dashboard.png)

---

## 🛠️ Technology Stack

- **Core Engine:** React 19 + TypeScript + Vite (compiled via Rolldown)
- **Styling System:** Tailwind CSS v4 (native PostCSS theme integration)
- **State Coordination:**
  - **Zustand:** Core global authentication and settings store
  - **TanStack Query:** Caching and fetching data from Firebase
- **Database & Backend:** Firebase Core (Authentication, Firestore, Storage)
- **Animations:** Framer Motion (sequential scroll-storytelling, staggers, lightbox overlays)
- **Form Orchestration:** React Hook Form + Zod Schema Validation

---

## 📦 Firestore Schema & Relations

The platform is designed around 9 collection models:

1.  `users`: `{ uid, email, displayName, role (Super Admin, Admin, Faculty, Student) }`
2.  `departments`: `{ id, name, code, description, hodId, coverImage }`
3.  `faculty`: `{ id, departmentId, name, designation, email, phone, bio, image, specializations[], publications[] }`
4.  `programs`: `{ id, departmentId, name, degree, duration, eligibility, feeStructure, syllabusUrl }`
5.  `news`: `{ id, title, slug, content, excerpt, category, tags[], coverImage, status (published/draft), publishedAt }`
6.  `events`: `{ id, title, slug, description, date, location, isRegistrationOpen }`
7.  `placements`: `{ id, year, highestPackage, averagePackage, recruiters[], successStories[] }`
8.  `downloads`: `{ id, title, category, fileSize, url }`
9.  `settings`: `{ id: 'global', logoUrl, jkCementLogoUrl, phone, email, socialLinks{}, seo{} }`

---

## 🚀 Database Seeding & Asset Upload

The `seed/` directory contains complete JSON data parsed from `spsu.ac.in` and scripts to migrate them.

### Initial Database Setup
To seed all academic departments, faculty rosters, programs, events, and placements records:
1.  Generate a service account key inside the Firebase Console (Project Settings -> Service Accounts).
2.  Save the JSON file as `seed/serviceAccountKey.json`.
3.  Run the seeding script:
    ```bash
    node seed/seed_database.js
    ```

### Media Synchronization
To upload local files (brochures, syllabus PDFs, gallery photos) to Firebase Storage and dynamically map their URLs to Firestore:
```bash
node seed/upload_assets.js
```

---

## 📅 Simulated Git Milestone Release Timeline

This project was built over a simulated 6-month development cycle (Jan 15, 2024 to Jul 15, 2024) across 118 commits and 6 tagged releases:

### 🚀 Release `v1.0.0-alpha.1` (February 15, 2024)
*   **Milestone:** Platform Foundation & Architecture
*   **Release Notes:**
    *   Initialized React 19 + TypeScript + Vite project skeleton.
    *   Configured Tailwind CSS v4 custom color themes and global styles in `src/index.css`.
    *   Initialized Firebase Web Client SDK and authentication middleware wrapper.
    *   Completed the legacy website content audits under `docs/content-audit/`.

### 🚀 Release `v1.0.0-alpha.2` (March 15, 2024)
*   **Milestone:** Core UX, Navigation, & Homepage Storytelling
*   **Release Notes:**
    *   Built the responsive mega-menu headers and mobile hamburger drawer.
    *   Completed the interactive Homepage with scroll-reveal animations and statistical counters.
    *   Optimized asset loading times and resolved layout shifts (CLS) on large viewports.

### 🚀 Release `v1.0.0-beta.1` (April 15, 2024)
*   **Milestone:** Academics & Faculty Portals
*   **Release Notes:**
    *   Developed the tabbed academics page with collapsible course accordions and syllabus download buttons.
    *   Built the searchable Faculty Directory with dynamic name/specialization search filters.

### 🚀 Release `v1.0.0-beta.2` (May 15, 2024)
*   **Milestone:** Placements, Gallery, & Admissions
*   **Release Notes:**
    *   Built Placements stats counters, partner logos grid, and testimonials slider.
    *   Created the Gallery Page showing album folders with Framer Motion lightbox previews.
    *   Integrated the Admissions Enquiry form validating inputs using React Hook Form + Zod.

### 🚀 Release `v1.0.0-rc.1` (June 15, 2024)
*   **Milestone:** Admin CMS Dashboard Console
*   **Release Notes:**
    *   Completed the CMS panel dashboard index counters.
    *   Built data tables for admissions enquiries status management ('new', 'reviewed', 'contacted', 'resolved').
    *   Developed news editor controls with automatic URL slug generators.

### 🏆 Release `v1.0.0` (July 15, 2024)
*   **Milestone:** Production Launch & Seed Integrations
*   **Release Notes:**
    *   Integrated 12 detailed faculty profiles, placements metrics, and global settings.
    *   Developed the Firestore database seeding script `seed/seed_database.js` and asset synchronizer `seed/upload_assets.js`.
    *   Polished accessibility parameters (a11y) to meet WCAG standards and verified that the package compiles cleanly for production.

---

## 🏷️ GitHub Repository Settings

If you are publishing this repository on GitHub, please use the following settings:

*   **Repository Description:** `A premium, dark-mode-first redesigned digital experience platform for Sir Padampat Singhania University (SPSU). Powered by React 19, TypeScript, Tailwind CSS v4, Framer Motion, and a Cloud Firebase (Firestore/Auth/Storage) backend with full Admin CMS control panel.`
*   **Repository Topics (Tags):** `spsu-revamp`, `react-19`, `typescript`, `tailwind-v4`, `firebase-firestore`, `firebase-auth`, `admin-cms`, `framer-motion`, `website-redesign`, `responsive-design`, `university-portal`, `ux-storytelling`

