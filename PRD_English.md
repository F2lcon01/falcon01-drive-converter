# PRODUCT REQUIREMENTS DOCUMENT (PRD) — ENGLISH
**Project:** Direct Drive | Ultra Downloader (Beta v0.2)  
**Date:** 2026-01-21  
**Status:** DRAFT / FROZEN STATE  

---

## 1. Product Overview
**Direct Drive** is a client-side web application designed to convert standard Google Drive sharing links (preview/view mode) into direct download links. It features a modern "Cyber-Glass" aesthetic, a "Smart Guard" visual warning system for permissions, and full bilingual support (English/Arabic). The tool operates entirely in the browser without backend dependencies.

---

## 2. Goals & Non-Goals

### Goals
- **Instant Conversion:** Provide immediate transformation of Google Drive URLs to direct download format.
- **User Safety Awareness:** Visually remind users to check file permissions ("Anyone with the link") via the "Smart Guard" system.
- **Visual Excellence:** Deliver a premium, responsive "Cyber-Glass" UI with animations.
- **Accessibility:** Full bilingual support with proper RTL/LTR layout switching.

### Non-Goals
- **File Hosting:** The tool does not host or store any files.
- **API Integration:** Does not validate file existence or permissions via Google Drive API (purely heuristic/regex-based).
- **Bulk Processing:** Generating multiple links at once is not currently supported.

---

## 3. Target Users
- **General Internet Users:** Individuals sharing files who want recipients to download immediately without the Google Drive preview screen.
- **Content Creators:** Users needing cleaner download links for social media or websites.
- **Arabic & English Speakers:** Users requiring a localized interface.

---

## 4. Functional Requirements

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| **FR-001** | **URL Parsing & ID Extraction**<br>System must extract the unique File ID from standard Google Drive URLs using regex (e.g., `/d/FILE_ID/`). | Critical |
| **FR-002** | **Direct Link Generation**<br>System must construct a direct download link using the format: `https://drive.google.com/uc?export=download&id={FILE_ID}`. | Critical |
| **FR-003** | **Bilingual Toggle**<br>User must be able to switch between English and Arabic. Switching must toggle text language, font family (`Inter/Lexend` vs `Readex Pro/Cairo`), and layout direction (`LTR` vs `RTL`). | High |
| **FR-004** | **Smart Guard Warning**<br>System must display a visual warning ("Did you permit 'Anyone with the link'?") immediately when a valid File ID is detected in the input. | Medium |
| **FR-005** | **Clipboard Copy**<br>System must provide a "Copy" button that saves the generated link to the system clipboard and provides visual feedback ("Copied!"). | High |
| **FR-006** | **Error Handling**<br>System must display an error message ("Invalid Google Drive Link") if the input does not contain a valid Drive URL pattern. | Medium |
| **FR-007** | **Input Clearance**<br>Resetting the input or entering invalid data must hide the previous result and warning indicators. | Low |

---

## 5. Non-Functional Requirements

| ID | Requirement | Type |
| :--- | :--- | :--- |
| **NFR-001** | **Client-Side Execution**<br>All logic must execute in the user's browser; no server-side processing allowed. | Architecture |
| **NFR-002** | **Visual Style**<br>UI must adhere to "Cyber-Glass" theme: Dark mode (`#050510`), Neon accents (`Cyan`, `Magenta`, `Green`), and Glassmorphism (blur effects). | Design/UX |
| **NFR-003** | **Responsiveness**<br>Layout must adapt to mobile devices (max-width 480px adjustments defined in CSS). | Usability |
| **NFR-004** | **Performance**<br>Link generation must perceive as "instant" (simulated scan delay < 1000ms is acceptable for UX). | Performance |

---

## 6. Technical Constraints
- **Unofficial Endpoint:** Relies on `drive.google.com/uc?export=download`, which is not an official public API and may be subject to rate limits or changes.
- **Browser Compatibility:** Requires modern browser support for ES6+ (JavaScript) and CSS Variables/Flexbox.
- **Local file restrictions:** Some clipboard features may require HTTPS or specific browser permissions (though strictly client-side).

---

## 7. Environment & Dependencies
- **Target OS:** Agnostic (Web-based).
- **Host:** Static Web Host (e.g., GitHub Pages) or Local File System.
- **Runtime:** Modern Web Browser (Chrome, Edge, Firefox, Safari).
- **External Assets:** Google Fonts (Inter, Lexend, Readex Pro, Cairo).
- **Libraries:** None (Vanilla JS).

---

## 8. Out of Scope
- Folder link conversion.
- Google Drive OAuth authentication.
- URL shortening service integration.
- Analytics/Tracking.

---

## 9. Risks & Assumptions

| Risk ID | Risk | Impact | Mitigation |
| :--- | :--- | :--- | :--- |
| **RISK-001** | **Google URL Format Change**<br>Trigger: Google changes the URL structure for Drive files.<br>Signal: "Invalid Link" error for valid files. | High (Feature Break) | Mitigation: Update Regex logic.<br>Fallback: Allow manual ID entry (Future). |
| **RISK-002** | **CORS/download Endpoint Deprecation**<br>Trigger: Google blocks the `uc?export=download` parameter.<br>Signal: Generated links redirect to preview or 404. | Critical (App Failure) | Mitigation: None (Core dependency).<br>Fallback: Halt project or switch to API (requires backend). |
| **RISK-003** | **User Permission Error**<br>Trigger: User generates link for a private file.<br>Signal: Download link fails/demands login. | Medium (UX Friction) | Mitigation: **Smart Guard (FR-004)** warning to educate user. |

**Assumptions:**
- Users have basic knowledge of Google Drive sharing settings.
- The `uc?export=download` pattern remains stable for the foreseeable future.

---

## 10. Change Impact Analysis
*N/A - This document captures the initial frozen state (v0.2).*

---

## 11. Open Questions & Clarifications Log
- **Q1:** Are there specific browser versions we must support? *Status: Assumed "Modern Evergreen Browsers".*
- **Q2:** Is there a plan to verify links via API in v1.0? *Status: Future Consideration.*

---

## 12. Acceptance Criteria

**FR-001 / FR-002 (Core Flow):**
- **Given** a standard Drive link `https://drive.google.com/file/d/123XYZ/view`
- **When** pasted into input and "Generate" clicked
- **Then** output should be `https://drive.google.com/uc?export=download&id=123XYZ`

**FR-003 (Bilingual):**
- **Given** the app is in English
- **When** "AR" toggle is clicked
- **Then** `dir` attribute becomes `rtl`, title changes to Arabic, warnings translate.

**FR-004 (Smart Guard):**
- **Given** an input field
- **When** a valid ID is detected
- **Then** the yellow "Permission Warning" box appears immediately.
