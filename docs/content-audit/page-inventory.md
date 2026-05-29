# Page Inventory

This document inventory details all pages implemented in the SPSU portal redesign, mapping out layout definitions, path routes, data dependencies, and accessibility standards.

## Public Web Pages

| Page Name | Route Path | Layout Template | Dynamic Data Hook | Priority/Status |
| :--- | :--- | :--- | :--- | :--- |
| **Homepage** | `/` | `RootLayout` | `news` (limit 3), `events` (limit 3) | High / Active |
| **Academics / Schools** | `/academics` | `RootLayout` | `departments`, `programs` | High / Active |
| **Faculty Directory** | `/faculty` | `RootLayout` | `faculty`, `departments` | High / Active |
| **Faculty Detail Profile** | `/faculty/:id` | `RootLayout` | `faculty` (by ID) | High / Active |
| **Admissions** | `/admissions` | `RootLayout` | `programs` (in enquiry dropdown) | High / Active |
| **Placements** | `/placements` | `RootLayout` | `placements` | High / Active |
| **Gallery Albums** | `/gallery` | `RootLayout` | `gallery_albums`, `gallery_images` | Medium / Active |
| **News Center** | `/news` | `RootLayout` | `news` (all published) | Medium / Active |
| **Events Hub** | `/events` | `RootLayout` | `events` (all active) | Medium / Active |
| **Contact Coordinates** | `/contact` | `RootLayout` | `settings` (global contact specs) | High / Active |
| **Sign-In Portal** | `/login` | `AuthLayout` | Firebase Auth State | High / Active |

## CMS Administration Pages (Protected Routes)

| CMS View Name | Route Path | Layout Template | CRUD Action Operations | Priority/Status |
| :--- | :--- | :--- | :--- | :--- |
| **Dashboard Home** | `/admin` | `AdminLayout` | Read dashboard summary counts | High / Active |
| **Admission Enquiries** | `/admin/enquiries` | `AdminLayout` | Read submissions, Update status, Delete | High / Active |
| **News Management** | `/admin/news` | `AdminLayout` | Create news, Read articles list, Delete | High / Active |
| **Events Management** | `/admin/events` | `AdminLayout` | Create events, Read list, Delete | High / Active |
| **Faculty Management** | `/admin/faculty` | `AdminLayout` | Add faculty profile, Read roster | High / Active |
| **Global Settings** | `/admin/settings` | `AdminLayout` | Update config coordinates, Set fallback | High / Active |

## Routing Layout Wrappers

1.  **RootLayout (`src/components/layouts/RootLayout.tsx`):**
    *   Responsive glassmorphism navigation menu.
    *   Static/Sticky footer detailing contact info and quick links.
    *   Custom geometric transition page loader.
2.  **AdminLayout (`src/components/layouts/AdminLayout.tsx`):**
    *   Private route guarding wrapper checks role authorization (Admin roles).
    *   Collapsible sidebar for CMS navigation.
    *   Top banner detailing logged-in user profile, roles, and sign-out buttons.
3.  **AuthLayout (`src/components/layouts/AuthLayout.tsx`):**
    *   Clean layout backdrop utilizing dark HSL color spectrum.
    *   Centered card wrapper for sign-in queries.
