# Navigation Map Audit & Revamp Plan

This document details the navigation hierarchy of the original `spsu.ac.in` portal and maps it to the newly restructured, modern React single-page routing environment.

## Legacy Navigation Hierarchy (spsu.ac.in)

```text
├── Home
├── About Us
│   ├── Overview & History
│   ├── Leadership & Deans
│   ├── Vision, Mission, & Core Values
│   └── JK Cement Group Heritage
├── Academics
│   ├── School of Engineering & Sciences (SES)
│   │   ├── Department of Computing & Informatics (CSE, BCA, MCA)
│   │   ├── Department of Integrated & Advanced Technology (Mechanical, Civil, Electrical, Mining, Biotech)
│   │   └── Department of Sciences (Applied Physics, Chemistry, Maths)
│   ├── School of Management & Liberal Studies (SMLS)
│   │   ├── Department of Management Studies (BBA, MBA)
│   │   └── Department of Design & Liberal Studies (B.Des, Humanities)
│   └── Faculty of Law
├── Admissions
│   ├── Eligibility & Courses
│   ├── Fee Structure
│   ├── Scholarships & Financial Aid
│   └── Online Enquiry / Application Form
├── Placements
│   ├── Placement Highlights & Stats
│   ├── Top Recruiters
│   └── Success Stories & Testimonials
├── Campus Life
│   ├── Hostels & Residential Facilities
│   ├── Labs, Infrastructure, & Library
│   └── Student Clubs & Fests
├── Media & Resources
│   ├── News & Press Releases
│   ├── Events Calendar
│   ├── Photo & Video Gallery
│   └── Downloads (Syllabus, Brochures, Policies)
└── Contact Us
    ├── General Contact Coordinates
    └── Location Map & Directions
```

## Revamped Navigation Hierarchy (Single-Page React Application)

The revamped navigation translates the legacy multi-page links into a clean, unified, interactive React mega-menu for public users, with a secure, role-based dashboard for administration.

```text
├── / (Home) - Scroll-Driven Storytelling Narrative
├── /academics - Responsive school-tabs and dynamic programs accordions
├── /faculty - Directory search, filtering, and deep profile dynamic pages
├── /admissions - Detailed courses, fee calculator widgets, scholarship eligibility, and Firestore-backed Enquiry Form
├── /placements - Top recruiters carousel, salary tier counts, and success stories testimonial slider
├── /gallery - Interactive album categorization with Framer Motion lightbox overlay
├── /news - Dynamic grid layout and chronological search
├── /events - Calendar-based listing and live seat booking registrations
├── /contact - Interactive maps, coordinate grid, and validated quick enquiry
├── /login - Secure portal for CMS administration (Super Admin / Admin / Faculty Roles)
└── /admin - CMS Dashboard (Restricted Route)
    ├── /admin/enquiries - Enquiry manager grid table (review, update, delete status)
    ├── /admin/news - News article publisher (automatic slug builder, draft/publish status)
    ├── /admin/events - Event schedule planner (datetime picker, seat limits toggle)
    ├── /admin/faculty - Faculty roster editor (add/modify profile designations)
    └── /admin/settings - Global configuration coordinator (social links, contact metadata)
```

## Mapping Log & Enhancements

| Legacy Link | Revamped Route | Key UX Improvement |
| :--- | :--- | :--- |
| Multiple academic pages | `/academics` | Unified under a high-fidelity tabular view with interactive course dropdowns and downloadable syllabus sheets. |
| Scattered faculty details | `/faculty` | Centralized database search directory with live name/specialization filters and research timelines. |
| Multi-step application forms | `/admissions` | Single-page validation form with live Firestore database integration and automatic email-readiness checker. |
| Nested photo galleries | `/gallery` | Responsive glassmorphism album folders with smooth lightbox transition animations. |
| Static announcements | `/news` & `/events` | Real-time CMS listing with status indicator badges, calendar templates, and event registration forms. |
