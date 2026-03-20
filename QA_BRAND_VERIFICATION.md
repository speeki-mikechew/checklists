# QA Brand Verification Quick Reference

## Visual Inspection Checklist

### Colors (Visual Check)
```
Dark Blue Elements:
- Page text should be dark navy (#0a1f44)
- Headings should use dark blue
- Button backgrounds should be dark blue

Bright Green Elements:
- Logo icon should be vibrant mint green (#00FF7F)
- CTA buttons and accents should use this green
- Progress bar fills should be bright green
- Hover states on cards should turn green
- Checkboxes when selected should be green
```

### Logo Verification
```
CORRECT:
- Lowercase "speeki" wordmark
- Three diagonal lines radiating outward from right
- Lines angled upward (not horizontal like a hamburger menu)
- Dark blue wordmark + bright green icon

INCORRECT:
- Three horizontal lines (≡ hamburger menu)
- Emojis near the logo
- Uppercase letters
- Mixed colors that aren't dark blue + bright green
```

### Typography Check
```
Headlines (H1, H2, H3):
- Should look modern and geometric (GT Walsheim Pro)
- Rounded letterforms
- Tight spacing between letters
- Bold weight

Body Text:
- Should be clean and readable (DM Sans or system font)
- Regular weight
- Good line height (not cramped)
```

### No Emojis Rule
```
NEVER appears in:
- Page headings or titles
- Button text
- Description text
- Navigation labels
- Alert messages
- Form labels

USE INSTEAD:
- ✓ Checkmark
- → Arrow
- Custom icons (two-tone dark blue + green)
```

### Card & Component States
```
Card Default:
- White background
- Gray border
- Rounded corners

Card Hover:
- Border turns bright green
- Lifts slightly (appears to float)
- Small shadow appears
- Optional: green left accent bar slides in

Button Default:
- Dark blue background
- White text
- Uppercase letters with letter-spacing

Button Hover:
- Slightly darker
- Lifts slightly

Checkbox Selected:
- Green background
- White checkmark
```

### Layout & Spacing
```
Margins:
- Generous space around sections (not cramped)
- At least 60px above/below major sections
- 24-32px between items in grids

Readability:
- No text blocks wider than 800px
- Text clearly readable on white background
- High contrast between text and background
```

### Photography Quality
```
Professional Shots:
- Clean office environments
- Diverse people (different genders, ethnicities, ages)
- Modern, well-lit spaces
- Professional but friendly

Lifestyle Shots:
- Casual settings (cafes, co-working)
- People using laptops/tablets
- Natural expressions
- Warm, approachable feeling
```

### Mobile Responsiveness
```
Below 768px Viewport:
- H1 headings reduced to 36-40px
- Single column layout
- Full-width buttons
- Increased side padding (6vw)
- All interactive elements at least 44px tall/wide
```

---

## Automated Testing Hints

### CSS to Check (Browser DevTools)
```css
/* Check these colors */
color: #0a1f44;          /* Dark blue text */
background: #00FF7F;     /* Bright green background */
border-color: #00FF7F;   /* Green border on hover */
background: #f8f9fa;     /* Light gray sections */

/* Check typography */
font-family: 'GT Walsheim Pro', 'DM Sans', sans-serif;
letter-spacing: -1px;    /* On headings */
line-height: 1.6;        /* On body text */

/* Check spacing */
padding: 60px;           /* Section padding */
gap: 24px;               /* Grid gaps */
max-width: 1400px;       /* Container max-width */
```

### HTML to Check
```html
<!-- Logo should use proper image, not emoji -->
<!-- ✓ Correct: <img src="speeki-logo.svg" /> -->
<!-- ✗ Wrong: speeki≡ or <span>speeki 📢</span> -->

<!-- No emoji anywhere in content -->
<!-- ✓ Correct: <span>✓</span> for checkmarks -->
<!-- ✗ Wrong: <span>✅</span> or <span>👍</span> -->

<!-- Buttons should be semantic -->
<!-- ✓ Correct: <button class="btn btn-primary">Submit</button> -->
<!-- ✗ Wrong: <div onclick="...">Submit</div> -->
```

---

## Common Issues to Watch For

### Color Issues
- Text too light (not enough contrast with background)
- Wrong green shade (should be #00FF7F, not other greens)
- Wrong blue shade (should be #0a1f44, not light blue)

### Typography Issues
- Fallback fonts look wrong (missing DM Sans)
- Line-height too tight (text looks cramped)
- Letter-spacing not applied to headings (looks less sophisticated)

### Layout Issues
- Content too wide (hard to read paragraphs)
- Not enough whitespace (feels cramped)
- Cards too close together (grid gap missing)

### Emoji Issues
- Emojis in headings or buttons
- Emoji in form labels
- Emoji in alert messages or status text

### Logo Issues
- Hamburger menu icon (≡) instead of diagonal lines
- Wrong colors (not dark blue + bright green)
- Logo too small or too large relative to text

---

## Quick Test Steps

1. **Open the page in a fresh browser tab**
   - Check for any visual oddities

2. **Inspect a heading**
   - Should be dark blue (#0a1f44)
   - Should use serif font or GT Walsheim Pro
   - Should have tight letter-spacing

3. **Hover over a card or button**
   - Should animate smoothly
   - Should change to bright green (#00FF7F)
   - Should have subtle shadow or lift effect

4. **Check for emojis**
   - Use browser Find (Ctrl+F or Cmd+F)
   - Search for emoji keywords
   - Verify ✓ checkmarks are used instead

5. **Test on mobile**
   - Resize browser to 375px wide
   - Check that layout is single column
   - Verify text is still readable

6. **Check contrast**
   - Text should be clearly readable on background
   - Use WebAIM or Chrome DevTools to verify WCAG AA contrast

---

## Approval Criteria

Approve a feature if ALL of the following are true:

- [ ] All colors match the brand guide (dark blue & bright green)
- [ ] No emojis appear anywhere in content
- [ ] Typography looks professional and consistent
- [ ] Components have proper hover/interaction states
- [ ] Layout is responsive and readable
- [ ] Spacing is generous (not cramped)
- [ ] Logo is correct (three diagonal lines, not hamburger)
- [ ] Tone of voice is professional and data-focused
- [ ] Photography (if present) is diverse and authentic

If any criteria fail, request changes before approving.

---

## Evidence to Capture

When approving or rejecting, always include:

1. **Main page screenshot** - showing color scheme and layout
2. **Logo/header screenshot** - showing correct logo
3. **Card hover state** - showing green border transition
4. **Mobile view screenshot** - showing responsive design
5. **Console output** - showing no errors (if applicable)

Example comment:
```
Verified against brand guide. All colors correct, no emojis found,
responsive layout working. Logo displays correctly with proper icon.
Screenshot: [attached]
```

