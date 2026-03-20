# Resources Page Expansion - Specification

## Overview
Transform the current "Checklists" page into a comprehensive "Resources" hub that includes both interactive checklists and informative whitepaper pages. The goal is to create a professional, visually appealing, and interactive experience for visitors.

## Scope

### New Whitepaper Pages to Create (5 pages)
Based on the provided DOCX attachments:

1. **Internal Controls Over Sustainability Reporting (ICSR)**
   - Topic: Why non-financial data demands the same rigour as financial data
   - Key sections: Five components of ICSR, ICFR vs ICSR comparison, Three Lines Model, Implementation Roadmap
   - Target audience: CFOs, Sustainability Directors, Audit Committees

2. **Employee Hiring in ISO 37001**
   - Topic: HR Due Diligence, Incentives, and Compliance Declarations under ISO 37001:2025 Clause 7.2.2.2
   - Key sections: Pre-employment due diligence, Performance incentives review, Anti-bribery declarations
   - Target audience: HR Directors, Compliance Officers

3. **ABMS Risk Assessment Whitepaper**
   - Topic: Anti-Bribery Risk Assessment under ISO 37001 Clause 4.5
   - Key sections: Gross risk vs net risk, Control testing methodology, Specificity requirements
   - Target audience: Risk Managers, Compliance Teams

4. **Non-Conformity Management System**
   - Topic: Building a systematic approach to managing non-conformities
   - Applicable to: ISO 37001, ISO 37301, ISO 42001, ISO 27001, ISO 45001, ISO 9001, ISO 14001
   - Target audience: Quality Managers, ISO Implementation Teams

5. **Beyond the Checkbox: ABMS Objectives**
   - Topic: Rethinking how to set meaningful objectives for Anti-Bribery Management Systems
   - Key themes: Activity vs effectiveness, ISO 37001:2025 Clause 6.2 requirements
   - Target audience: Compliance Directors, ABMS Program Owners

### Index Page Updates
- Rename page title from "Checklists" to "Resources"
- Add new "Whitepapers" category/section alongside existing "Checklists"
- Implement filtering/categorization (e.g., by topic, by standard, by content type)
- Update meta tags and SEO for "resources" terminology

## Design Requirements

### Reference Template Analysis
Based on `speeki-abms-whitepaper_1.html`, the design should include:

#### Color Palette (Speeki Brand)
```css
--navy: #0f1c3f
--navy-mid: #1a2d5a
--navy-light: #243672
--teal: #00c4b4
--teal-dark: #00a89a
--gold: #f0a500
--white: #ffffff
--off-white: #f7f8fc
```

#### Typography
- Primary: DM Sans (body text)
- Display: DM Serif Display (headings)

#### Key UI Components to Implement

1. **Hero Section**
   - Navy gradient background with teal accent radials
   - Document type tag (e.g., "WHITEPAPER", "CHECKLIST", "GUIDE")
   - Large serif title with teal emphasis on key words
   - Meta information (read time, pages, last updated)
   - Download PDF button + Jump to content button
   - Sidebar card showing document outline/topics

2. **Stats Strip**
   - 4-column stats bar showing key document metrics
   - Example: "25 Objectives | 5 Core Themes | ISO 37001 Compliant"

3. **Content Layout**
   - Two-column layout: Main article (wider) + Sticky sidebar
   - Article sections with proper heading hierarchy (h2, h3)
   - Lead paragraphs with teal left border
   - Pull quotes in navy boxes with large quotation marks

4. **Interactive Elements**
   - Trap/Pitfall cards in 2-column grids
   - Architecture/concept cards in 3-column grids
   - Framework tables with navy headers
   - Expandable/collapsible sections
   - Modal overlays for detailed content

5. **Sidebar Components**
   - Table of contents (sticky)
   - Download CTA card
   - Related resources links
   - Contact/consultation CTA

6. **Responsive Design**
   - Mobile-first approach
   - Collapsible navigation
   - Stacked layouts on mobile

### Speeki Branding
- Use Speeki logo (provided in reference documents)
- Consistent use of teal (#00c4b4) as accent color
- Navy (#0f1c3f) as primary dark color
- Professional, authoritative tone

## Technical Requirements

### File Structure
```
/tmp/checklists/
├── index.html                          (updated - Resources hub)
├── whitepapers/
│   ├── icsr-internal-controls.html
│   ├── iso-37001-employee-hiring.html
│   ├── abms-risk-assessment.html
│   ├── non-conformity-management.html
│   └── abms-objectives.html
├── assets/
│   ├── speeki-logo.svg
│   └── whitepaper-styles.css           (shared styles)
└── [existing checklist files...]
```

### SEO & Meta Requirements
- Unique meta descriptions for each whitepaper
- Open Graph tags for social sharing
- Schema.org structured data (Article type)
- Canonical URLs

### Performance
- Inline critical CSS
- Lazy load images
- Minified production builds

## Acceptance Criteria

1. [ ] All 5 whitepaper pages created with full content from DOCX files
2. [ ] Each page follows the reference template design patterns
3. [ ] Index page updated to "Resources" with category filtering
4. [ ] Speeki branding consistently applied (colors, logo, typography)
5. [ ] Responsive design works on mobile/tablet/desktop
6. [ ] All interactive elements functional (expandables, modals, filters)
7. [ ] PDF download buttons link to appropriate resources
8. [ ] SEO meta tags in place
9. [ ] Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
10. [ ] Auth protection maintained (existing auth.js integration)

## Priority Order
1. ICSR whitepaper (most comprehensive, sets the template)
2. Index page updates (enables discovery)
3. Remaining 4 whitepaper pages
4. Polish and responsive refinements

## Dependencies
- DOCX content (provided)
- Reference HTML template (provided)
- Speeki logo (provided in project context)
