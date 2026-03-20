# Speeki Brand Guide - QA Reference

**Company**: Speeki Pte Ltd
**Tagline**: Rebuilding assurance with AI
**Purpose**: The Sustainability Firm - providing board-level ESG assurance

---

## Logo

### The Speeki Mark
- **Wordmark**: "speeki" in lowercase with rounded letterforms
- **Icon**: Three diagonal lines radiating outward (representing speech/communication)
- **Icon Detail**: The lines are angled upward to the right, NOT a hamburger menu (≡)
- **Brand**: The mark communicates openness and contemporary thinking

### Logo Variations
1. **Full Color** (default):
   - Dark blue wordmark (#0a1f44)
   - Bright green icon (#00FF7F)
   - Use on white/light backgrounds

2. **Reversed - Dark Blue Background**:
   - White wordmark
   - Green icon

3. **Reversed - Green Background**:
   - Dark blue wordmark
   - White icon

4. **Monotone**:
   - Single color versions (all dark blue, all white, or all green)

---

## Color Palette

### Primary Colors (Core Brand)
| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Dark Blue | #0a1f44 | 10, 31, 68 | Primary text, headings, wordmark, buttons, UI elements |
| Bright Green | #00FF7F | 0, 255, 127 | Icon, accents, highlights, CTAs, progress indicators |

### Neutral Colors (Supporting)
| Color | Name | Hex | Usage |
|-------|------|-----|-------|
| Gray | Speeki Gray | #4a5568 | Secondary text, descriptions, metadata |
| Light Gray | Speeki Light Gray | #f8f9fa | Background sections, card backgrounds, info areas |
| Border | Speeki Border | #e5e7eb | Dividers, card borders, form inputs |
| White | — | #ffffff | Main background, card backgrounds, text on dark |

### Status Colors (Semantic)
| State | Hex | Usage |
|-------|-----|-------|
| Success | #f0fdf4 | Success states, completed items, question backgrounds |
| Warning | #dc2626 | Red flags, error states, warnings |
| Warning Background | #fef2f2 | Warning/error card backgrounds |

### Secondary Colors (Marketing Variety)
For more colorful marketing materials while maintaining brand identity:
- Bright royal blue, teal, coral/salmon, light pink, light cyan, light peach, pink/rose, orange, purple/violet, yellow/gold, soft pink, cream/beige, lavender, pale yellow

**Note**: Always return to dark blue + bright green for core brand identity.

### CSS Variables
```css
:root {
  /* Primary */
  --speeki-dark-blue: #0a1f44;
  --speeki-bright-green: #00FF7F;

  /* Neutrals */
  --speeki-gray: #4a5568;
  --speeki-light-gray: #f8f9fa;
  --speeki-border: #e5e7eb;
  --speeki-white: #ffffff;

  /* Status */
  --speeki-success: #f0fdf4;
  --speeki-warning: #dc2626;
  --speeki-warning-bg: #fef2f2;
}
```

---

## Typography

### Typefaces

**Primary: GT Walsheim Pro**
- Style: Contemporary, friendly, rounded geometric sans-serif
- Use: Headlines, titles, featured text
- Weight: Bold (700) for impact
- Characteristics: Modern, approachable, geometric precision

**Secondary: DM Sans**
- Style: Clean, highly readable
- Use: Body text, paragraphs, UI elements
- Source: Freely available on Google Fonts
- Weight: Regular (400) for body, Medium (500) for emphasis

### Font Stacks (Web)
```css
/* Headlines */
font-family: "GT Walsheim Pro", "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;

/* Body */
font-family: "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
```

### Sizing & Weight

| Level | Size | Weight | Letter-Spacing | Usage |
|-------|------|--------|-----------------|-------|
| H1 | 48-56px | 700 | -1.5px | Page titles, main headings |
| H2 | 36px | 700 | -1px | Section titles |
| H3 | 24px | 700 | -0.5px | Card titles, subsections |
| Body | 16-18px | 400 | 0px | Paragraphs, descriptions |
| Small | 14px | 400-500 | 0px | UI labels, metadata |
| Buttons | 14px | 600 | 1px (uppercase) | Call-to-action text |

### Line Height
- Body text: 1.6-1.7 (readability)
- Headings: 1.2-1.3 (compact)

### Readability Guidelines
- Max-width for readable text: 800px
- Use tight letter-spacing (-1px to -1.8px) on large headings for sophistication
- Generous whitespace around blocks of text

---

## Tone of Voice

### DO
- Be authoritative and clear
- Use consequence-focused language
- Position sustainability as board-level responsibility
- Reference concrete data and metrics
- Use British English spelling: organisation, materialise, standardised, etc.
- Be direct and professional

### DO NOT
- Use emojis in any content
- Use corporate jargon or marketing fluff
- Use vague terms without specific criteria or data
- Be overly casual or trendy in language
- Make unsubstantiated claims

---

## Content Rules — Auditor Independence (ISO 17021-1)

Speeki is an accredited certification body under ISO 17021-1. This imposes strict boundaries on all content produced, including the growth engine, educational materials, whitepapers, checklists, and marketing copy.

### ALLOWED Content
- **Educate based on published standards** — CSRD, ISSB, ISO 37001, etc. Standard-based information that applies to all organisations in a category
- **Present factual observations from public data** — e.g. "Your published sustainability report does not reference external assurance"
- **Explain Speeki services** — scope, methodology, standards applied
- **Share industry trends** — regulatory developments, market analysis, standard updates

### NOT ALLOWED Content
- **Advise or recommend specific actions** — e.g. "You should get ISO 37001" is NOT permitted
- **Score or rate** a company's ESG performance, readiness, or maturity
- **Customise or tailor** educational information for a specific audit client — this implies designing a programme
- **Use consultative language** that suggests Speeki is designing something for a specific client

### Key Principle
> Education and training using published standards is fine. Customising or tailoring information for a specific audit client is not — it creates the appearance of designing a programme.

### Language Guidelines
| Instead of... | Use... |
|--------------|--------|
| "You should implement..." | "Organisations typically implement..." |
| "We recommend..." | "The standard requires..." / "Best practice includes..." |
| "Get certified" | "Learn about certification requirements" |
| "Your organisation needs" | "Organisations seeking compliance need" |
| "Based on your situation" | "Based on the standard requirements" |

---

## Visual Design Language

### Decorative Elements
- **Curved, flowing lines**: Derived from the logo's radiating diagonal lines
- **Organic swooping shapes**: Used as dividers, backgrounds, and accent graphics
- **Style**: Contemporary, smooth, and approachable
- **Purpose**: Reinforces the brand's modern and open communication values

### Photography Style

**Professional**:
- Business professionals in modern office settings
- Meeting rooms and collaboration scenes
- Clean, well-lit environments
- Diverse representation (gender, ethnicity, age)
- Professional attire appropriate to context

**Lifestyle**:
- Casual professional settings (cafes, co-working spaces)
- People actively using devices (tablets, laptops, phones)
- Natural, candid expressions
- Warm, approachable feeling
- Diverse representation
- Real-world scenarios

### Imagery Guidelines
- Mix of professional and lifestyle photography
- Authentic rather than staged
- Well-composed and high-quality
- Consistent lighting and color grading
- Always include diverse representation

---

## Interactive Components

### Cards
- **Background**: White (#ffffff)
- **Border**: 1px solid #e5e7eb
- **Border-radius**: 8px
- **Padding**: 28-40px
- **Hover State**:
  - Border color transitions to bright green (#00FF7F)
  - Subtle shadow appears
  - Slight lift (translateY -4px)
  - Left accent bar (4px green) animates in
- **Layout**: Use CSS Grid for responsive card grids

### Buttons
- **Primary Style**:
  - Background: Dark blue (#0a1f44)
  - Text: White
  - Padding: 16px 32px
  - Font: 14px, weight 600, uppercase
  - Letter-spacing: 1px
  - Border-radius: 6px

- **Secondary Style**:
  - Background: White
  - Border: 1px solid dark blue
  - Text: Dark blue

- **Hover State**:
  - Slight darkening of background
  - Lift effect (translateY -2px)

### Progress Bars
- **Height**: 6px
- **Track background**: #e5e5e5
- **Fill color**: Bright green (#00FF7F)
- **Border-radius**: 3px
- **Animation**: Smooth transition as progress updates

### Checkboxes
- **Size**: 20px × 20px
- **Accent color**: Bright green (#00FF7F)
- **Border**: 2px solid #cccccc
- **Checked state**: Green background with white checkmark
- **Hover**: Border transitions to bright green

### Accent Line
- **Width**: 80px
- **Height**: 4px
- **Color**: Bright green (#00FF7F)
- **Border-radius**: 2px
- **Usage**: Placed below main headings for visual emphasis

---

## Layout & Spacing

### Container
- **Max-width**: 1400px
- **Horizontal padding**:
  - Desktop: 0 4vw
  - Mobile (< 768px): 0 6vw
- **Breakpoint**: 768px

### Spacing Scale
- **Section padding**: 60-80px vertical
- **Element gaps**: 24-48px
- **Card padding**: 28-40px
- **Generous whitespace**: Key principle throughout design

### Grid System
- **Type**: CSS Grid with `auto-fill`
- **Min column width**: 300-380px
- **Column gap**: 24-32px
- **Row gap**: 24-32px
- **Responsive**: Automatically adjusts columns based on viewport

### Mobile Responsive
- **H1 on mobile**: 36-40px (down from 48-56px)
- **Single column layouts**: Below 768px breakpoint
- **Full-width elements**: Buttons, cards stretch to edges with padding
- **Side padding**: Increased to 6vw for comfort on smaller screens
- **Touch targets**: Minimum 44px for interactive elements

---

## Iconography

### Icon Style
- **Color scheme**: Two-tone (dark blue + bright green)
- **Corners**: Rounded corners and edges (matching logo style)
- **Forms**: Simple, geometric
- **Stroke weight**: Consistent throughout icon set
- **Size**: Flexible (16px to 48px depending on context)

### Common Icons in Speeki Suite
- AI/robot (technology/intelligence)
- Settings/controls (configuration)
- Money/finance (value, investment)
- Target (goals, alignment)
- Document (contracts, agreements)
- Charts (data, analytics)
- Calculator (measurement)
- Shield/lock (security, verification)
- Analytics (reporting, insights)
- User profiles (people, stakeholders)
- Integrations (connections, workflows)

### Text-Based Symbols (No Emojis)
| Symbol | Usage |
|--------|-------|
| ✓ | Checkmark for confirmations |
| → | Arrow for navigation/next |
| ≡ | Logo accent (three lines) |

---

## QA Verification Checklist

When testing implementations against the brand guide:

### Colors
- [ ] Dark blue (#0a1f44) used for primary text and headings
- [ ] Bright green (#00FF7F) used for accents and CTAs
- [ ] No emojis appear in content
- [ ] Status colors correctly applied (green for success, red for warnings)

### Typography
- [ ] GT Walsheim Pro or DM Sans used (with system font fallbacks)
- [ ] Heading sizes match specifications (H1: 48-56px, H2: 36px, H3: 24px)
- [ ] Body text is 16-18px with 1.6-1.7 line height
- [ ] Letter-spacing tight on large headings (-1 to -1.8px)
- [ ] British English spelling used throughout

### Logo & Visual Elements
- [ ] Logo uses correct icon (three diagonal lines, not hamburger menu)
- [ ] Logo colors match (dark blue + bright green)
- [ ] Curved/flowing decorative lines present and consistent
- [ ] Photography style matches (professional + lifestyle, diverse)

### Components
- [ ] Cards have white background with gray borders
- [ ] Cards turn green on hover with lift effect
- [ ] Buttons are dark background with white text
- [ ] Checkboxes are green accent on interaction
- [ ] Progress bars use green fill on gray track

### Layout
- [ ] Container max-width is 1400px
- [ ] Generous whitespace between sections (60-80px)
- [ ] Grid uses auto-fill with 300-380px min columns
- [ ] Mobile breakpoint at 768px respected
- [ ] Touch targets minimum 44px

### Tone
- [ ] Content is professional and authoritative
- [ ] Data and metrics are referenced
- [ ] No marketing jargon or vague terms
- [ ] No overly casual or trendy language

---

## External References

- **Official Website**: https://www.speeki.com
- **Checklist Home**: https://www.speeki.com/en-GB/checklists-and-guides
- **Brand Grid System PDF**: Speeki_Brand_Grid_System.pdf (in project)

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2026-03-19 | 1.0 | Initial comprehensive guide based on official PDF and existing implementations |

---

*This guide is the authoritative reference for QA verification and brand consistency. Always consult this document when reviewing interactive checklist implementations.*
