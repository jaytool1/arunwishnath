# Arun Bishwanath High School, Aran — Bilingual School Portal & Management Platform

A production-ready, bilingual (English & Hindi) educational website and administrative portal for Arun Bishwanath High School, Aran, Saharsa, Bihar (BSEB, Classes 9-10), featuring public academic information, online admission applications, secure student result lookup, a role-protected Admin Dashboard, Cloud Firestore persistence, Google Maps grounding, and high-fidelity asset generation.

## User Review & Critical Decisions

> [!IMPORTANT]
> The architectural blueprint faithfully mirrors the authentic school photograph and homepage visual specification provided in the uploaded reference (`/public/assets/aistudio/Arun_Bishwanath_High_School_Homepage_5df6554f.png`).

- **Confirmed Aesthetic & Brand**: Deep Academic Navy (`#0A2540` / `#0F2D59`), Crisp White (`#FFFFFF`), Gold & Slate secondary accents, with the verified school building photo featured prominently in the hero banner.
- **Language & Localization**: English default with instant zero-reload Hindi translation switch covering all public navigation, banners, form inputs, status messages, and result sheets.
- **Data Integrity Guarantee**: Zero fabricated or fake student names or marks. Verified authentic school information (Aran, Saharsa, Bihar - PIN 852124, BSEB, Classes 9 & 10, Hindi medium, Phone 7631083566, Email arunvishwanathhighschoolaran@gmail.com) with graceful empty states for unpopulated collections.
- **Security & Authorization Model**: Cloud Firestore with strict Attribute-Based Access Control (ABAC) and default-deny security rules. Administrative roles checked via secure `adminProfiles` verification.
- **Privacy-Preserving Result Retrieval**: Student results are queried through a trusted server endpoint requiring Roll Number, Date of Birth, and Session ID, preventing bulk scraping and protecting student privacy.

---

## 1. Overview & Core Concept

Arun Bishwanath High School is a Government Aided Hindi-medium secondary school under the Bihar School Examination Board (BSEB) serving secondary students in Classes 9 and 10 in Aran, Saharsa, Bihar.

This platform bridges the school administration, prospective students, parents, and enrolled candidates through four interconnected pillars:
1. **Public Information & Transparency**: School profile, principal's vision, BSEB curriculum details, official notices, downloadable circulars, photo gallery, and contact information with Google Maps location grounding.
2. **Online Admission Management**: Streamlined Class 9 & 10 admission application system with validation, unique application tracking number (`ABHS-2026-XXXX`), document uploads, and an administrative review workflow (Pending, Under Review, Approved, Rejected).
3. **Protected Student Result Portal**: Verifiable BSEB matriculation result engine where students query subject marks, total marks, percentage, and division without public exposure of class lists or personally identifiable details.
4. **Administrative Content & School Management**: Secure authentication portal allowing verified administrators to publish notices, manage staff directories, evaluate admissions, configure exam sessions, enter student marks, update gallery assets, and customize homepage content with complete audit trails.

---

## 2. User Experience & Visual Design

### Visual Identity & Palette
- **Primary Navy**: `#0B2545` (Header & Hero), `#133E75` (Buttons & Active States)
- **Neutral Canvas**: `#F8FAFC` (Page Background), `#FFFFFF` (Surface Cards)
- **Border & Hairlines**: `#E2E8F0` (Delicate structural dividers, no thick borders)
- **Functional Accents**: `#0284C7` (Sky/Information), `#059669` (Success/Approval), `#D97706` (Notices/Alerts), `#7C3AED` (Downloads)
- **Typography**: `Plus Jakarta Sans` for clean, readable headings & body; `Tiro Devanagari Hindi` / system Devanagari fallback for Hindi typography; `tabular-nums` for roll numbers, marks, and dates.

### Key Pages & User Journeys

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 📍 Aran, Saharsa, Bihar - 852124   📞 7631083566   ✉️ arunvishwanath...   [English | हिन्दी] │
├─────────────────────────────────────────────────────────────────────────────┤
│  [SEAL] ARUN BISHWANATH HIGH SCHOOL, ARAN       [Home] [About] [Notices]    │
│         Government Aided School | BSEB | Class 9-10  [Admission] [Results]  │
│                                                  [Gallery] [Downloads] [Admin] │
├─────────────────────────────────────────────────────────────────────────────┤
│  WELCOME TO ARUN BISHWANATH HIGH SCHOOL       │  [ REAL SCHOOL PHOTO ]      │
│  "Education Today, A Better Tomorrow"         │  अरुण बिशननाथ उच्च विद्यालय  │
│  Arun Bishwanath High School, Aran, Saharsa   │  अरान, सहरसा                │
│  is committed to providing quality education. │                             │
│  [ Learn More → ]                             │                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ 📢 LATEST NOTICE: • Class 9 & 10 Online Admission open  • Annual Exam date  │
├─────────────────────────────────────────────────────────────────────────────┤
│  [ 📝 Admission ]   [ 📊 Results ]   [ 🔔 Notices ]   [ 📥 Downloads ]     │
├─────────────────────────────────────────────────────────────────────────────┤
│  About Our School      │  Principal's Message      │  Classroom & Campus    │
│  Affiliation, Board,   │  "Education is the most   │  [ Actual Building &   │
│  Classes 9 & 10 details│  powerful weapon..."      │    Facility Visuals ]  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Latest Notices (List) │  Photo Gallery Preview    │  Quick Links Strip     │
└─────────────────────────────────────────────────────────────────────────────┘
```

1. **Homepage (`/`)**:
   - Exact implementation of the Figma mockup: top operational bar, bilingual header with official crest, hero split with the real building photograph, scrolling announcement ticker, 4 high-contrast quick action cards, About School, editable Principal's Message with portrait, Classroom view, Latest Notices preview, Photo Gallery thumbnail carousel, and official footer.
2. **About School (`/about`)**:
   - School history, BSEB curriculum, teaching faculty directory, infrastructure overview (laboratories, library, sports ground), and governance details.
3. **Notice Board (`/notices`)**:
   - Searchable, categorized notices (Academic, Examinations, Admissions, Holidays, Events) with publication dates and PDF download attachments.
4. **Online Admission Form (`/admission`)**:
   - Step-by-step Class 9 & 10 application form. Inputs: Student Name, Date of Birth, Gender, Father/Mother Name, Complete Residential Address, Mobile Number, Previous School, and Class Applying For (9 or 10). Generates printable acknowledgment with unique application reference.
5. **Student Result Lookup (`/results`)**:
   - Input form: Examination Session, Roll Number, Date of Birth.
   - Outputs: Formal, printable BSEB Marksheet displaying student name, roll number, class, session, subject marks, theory & practical breakdown, total marks, percentage, and division (1st / 2nd / 3rd Division / Fail) with school seal.
6. **Photo Gallery (`/gallery`)**:
   - Categorized high-resolution photo grid of school events, campus facilities, and student activities with modal lightbox view.
7. **Downloads (`/downloads`)**:
   - Official BSEB syllabus, admission brochures, scholarship application forms, and model question papers with file size and format indicators.
8. **Contact & Maps Grounding (`/contact`)**:
   - School address, telephone, email, principal office timings, interactive map, and Gemini-grounded travel directions from Saharsa Junction and nearby landmarks.
9. **Admin Portal (`/admin/login` & `/admin/*`)**:
   - Protected back-office for managing Admissions, Notices, Results, Staff, Gallery, Downloads, Homepage Text, and Audit Logs.

---

## 3. Key Product Decisions & Trade-Offs

| Decision | Chosen Approach | Rationale & Trade-off |
|---|---|---|
| **Data Persistence** | Cloud Firestore + Firebase Auth | Fully satisfies the Firebase requirement, provides real-time snapshot listeners for administrative changes, and supports production-grade security rules. |
| **Server Operations** | Express Full-Stack (`server.ts`) | Keeps Gemini API calls, Maps Grounding, image generation, and sensitive result lookups strictly server-side, eliminating key exposure in the client bundle. |
| **Student Result Privacy** | Server-side verification API (`/api/results/lookup`) | Prevents public users from downloading the full Firestore results collection or iterating over other students' marks. |
| **Admission Submission** | Rate-limited server endpoint (`/api/admissions/submit`) | Validates fields server-side, generates cryptographically safe application IDs (`ABHS-2026-XXXX`), and logs incoming applications directly into Firestore. |
| **Localization Engine** | React Context with comprehensive English/Hindi dictionary | Delivers instant switching with zero hydration mismatch and supports Devanagari typography across all screens. |

---

## 4. Technical Architecture & Data Strategy

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                CLIENT BROWSER                               │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ React Router SPA + Tailwind CSS + Lucide Icons + Motion Animation     │  │
│  │  • LanguageProvider (English / हिन्दी Context)                         │  │
│  │  • FirebaseAuthProvider (AuthState, AdminClaims, Login/Logout)        │  │
│  │  • Public Views: Home, About, Notices, Admission, Results, Gallery    │  │
│  │  • Admin Views: Dashboard, Notices, Applications, Results, Settings   │  │
│  └──────────────────┬─────────────────────────────┬──────────────────────┘  │
└─────────────────────┼─────────────────────────────┼─────────────────────────┘
                      │ Firebase Web SDK            │ HTTP Proxy (/api/*)
                      ▼                             ▼
┌───────────────────────────────┐     ┌───────────────────────────────────────┐
│     FIREBASE PLATFORM         │     │         EXPRESS BACKEND (server.ts)   │
│  ┌─────────────────────────┐  │     │  • /api/results/lookup (Protected)    │
│  │ Cloud Firestore DB      │  │     │  • /api/admissions/submit (Validated) │
│  │  - schoolSettings       │  │◄────┤  • /api/maps/grounding (Gemini 3.8)   │
│  │  - notices              │  │     │  • /api/images/generate (Nano Banana) │
│  │  - admissionApplications│  │     │  • /api/admin/* (Privileged Ops)      │
│  │  - staff                │  │     └───────────────────┬───────────────────┘
│  │  - examSessions         │  │                         │
│  │  - results              │  │                         ▼
│  │  - galleryImages        │  │              ┌──────────────────────┐
│  │  - downloads            │  │              │ @google/genai SDK    │
│  │  - auditLogs            │  │              │  • gemini-3.8-flash  │
│  ├─────────────────────────┤  │              │  • gemini-pro-image  │
│  │ Firebase Authentication │  │              └──────────────────────┘
│  │  - Email/Password       │  │
│  │  - Google Sign-In       │  │
│  └─────────────────────────┘  │
└───────────────────────────────┘
```

### Cloud Firestore Collections

1. `schoolSettings/general`:
   - `schoolName`, `address`, `pinCode`, `phone`, `email`, `board`, `medium`, `classes`, `principalMessage`, `heroContent`, `updatedAt`
2. `notices`:
   - `id`, `title`, `titleHi`, `description`, `category`, `publicationDate`, `attachmentUrl`, `isPublished`, `createdAt`, `updatedAt`
3. `admissionApplications`:
   - `applicationNumber`, `studentName`, `dateOfBirth`, `gender`, `fatherName`, `motherName`, `address`, `mobileNumber`, `previousSchool`, `classApplyingFor` (9|10), `status` (PENDING|UNDER_REVIEW|APPROVED|REJECTED), `adminNotes`, `submittedAt`, `reviewedAt`
4. `staff`:
   - `id`, `name`, `designation`, `designationHi`, `department`, `qualification`, `biography`, `photoUrl`, `isPublished`, `order`
5. `examSessions`:
   - `id`, `sessionName`, `class` (9|10), `examinationName`, `year`, `status` (ACTIVE|CONCLUDED)
6. `results`:
   - `id`, `sessionId`, `rollNumber`, `studentName`, `dateOfBirth`, `class`, `subjects` (array of {name, code, marksObtained, maxMarks, passMarks}), `totalMarks`, `maxMarks`, `percentage`, `division` (1st|2nd|3rd|Fail), `publicationStatus` (PUBLISHED|DRAFT)
7. `galleryImages`:
   - `id`, `title`, `titleHi`, `category`, `imageUrl`, `aspectRatio`, `isPublished`, `createdAt`
8. `downloads`:
   - `id`, `title`, `titleHi`, `category`, `fileUrl`, `fileSize`, `fileType`, `isPublished`, `createdAt`
9. `auditLogs`:
   - `id`, `actorEmail`, `action`, `entityType`, `entityId`, `details`, `timestamp`

---

## 5. Step-by-Step Implementation Strategy

### Step 1: Dependencies, Server, and Configuration Setup
- Install required packages: `firebase`, `react-router-dom`, `@types/react-router-dom`, and ensure `@google/genai` is available.
- Create Express server (`server.ts`) supporting Vite middleware in development and serving built static assets in production (`"start": "node server.ts"`).
- Update `package.json`, `metadata.json`, and `index.html` with school details and branding.

### Step 2: Firebase Configuration & Blueprint
- Provision Firebase with Firestore and Auth via `show_aistudio_ui` / `ProvisionFirebase` RPC.
- Write `firebase-blueprint.json` defining strict JSON schemas for all collections.
- Write robust, ABAC-based `firestore.rules` implementing default-deny, role enforcement, and input sanitization.
- Implement `src/lib/firebase.ts` with error handling conforming to `FirestoreErrorInfo`.

### Step 3: Localization Dictionary & Design Foundations
- Create `src/i18n/translations.ts` with comprehensive English and Hindi translations.
- Implement `LanguageContext` allowing dynamic toggling with persistent user preference.
- Build reusable UI primitives: Top operational ribbon, bilingual navigation header, footer with quick links and verified contacts, badge-free metadata typography, and print-ready styles.

### Step 4: Public Pages & Hero Section
- Build `Home.tsx` mirroring the uploaded screenshot layout using `/public/assets/aistudio/Arun_Bishwanath_High_School_Homepage_5df6554f.png`.
- Implement `About.tsx`, `Notices.tsx` with filtering, `Gallery.tsx` with modal lightbox, `Downloads.tsx`, and `Contact.tsx`.
- Connect Contact and Home with server-side Maps Grounding (`/api/maps/grounding`) using `gemini-3.8-flash` with the `googleMaps` tool to provide verified directions from Saharsa Junction to Aran.

### Step 5: Online Admission Engine & Student Result Portal
- Build `/admission` with client and server validation for Class 9 and 10 applicants.
- Build `/results` with Roll Number + DOB + Session verification calling `/api/results/lookup`.
- Design an authentic, print-optimized BSEB student marksheet with seal, QR-style verification placeholder, and grade indicators.

### Step 6: Admin Dashboard & Content Management
- Build `/admin/login` supporting email/password and Google Sign-in for authorized school staff.
- Build full admin workspace (`/admin/*`) with tabs:
  - Overview metrics (Total Applications, Pending Reviews, Active Notices, Published Results)
  - Admission Reviewer with status transitions and CSV export
  - Notice Board manager (Create, Edit, Publish/Unpublish, Delete)
  - Staff Directory manager
  - Result Manager (Session builder, mark entry sheet, automatic division calculation)
  - Gallery & AI Image Studio (generate assets using `gemini-3-pro-image-preview` / `gemini-nano-banana-2.1` with 1K, 2K, 4K controls)
  - Homepage & Principal Message live content editor
  - Audit Log viewer

### Step 7: Compilation, Verification & Quality Checks
- Validate build with `compile_applet`.
- Ensure zero broken links, responsive layout on mobile (375px) through desktop (1440px), and complete functional handlers on every button.
