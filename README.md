# Speeki Checklists & Guides

Interactive ESG and sustainability checklists designed for sustainability professionals, CSOs, and compliance teams.

## Overview

This directory contains professional, interactive web-based checklists that help organizations:
- Strengthen ESG reporting and transparency
- Avoid greenwashing in sustainability communications
- Track progress on compliance and best practices
- Export progress reports for stakeholders

## Features

### Interactive Progress Tracking
- Check off items as you complete them
- Progress is automatically saved to browser localStorage
- Visual progress indicators show completion percentage
- Section-level completion tracking with visual feedback

### Export Functionality
- Download complete progress reports as text files
- Share results with stakeholders
- Keep records of compliance efforts

### Advanced Growth Engine 🚀 NEW
**Transforms checklists into a comprehensive growth machine:**
- **Viral Loop & Referrals:** Automatic referral tracking with unique codes
- **Lead Scoring:** 0-100 point system classifying leads as Hot/Warm/Cold
- **A/B Testing:** Optimize CTAs, messaging, and timing data-driven
- **Personalization:** Dynamic content based on user behavior (5 profiles)
- **Conversion Funnels:** Track 4-stage journey from landing to conversion
- **Retargeting Pixels:** Facebook, LinkedIn, Google Analytics integration
- **ROI Calculator:** Interactive compliance cost savings tool
- **Analytics Dashboard:** Real-time KPI monitoring (see `growth-dashboard.html`)

👉 **See [GROWTH_FEATURES.md](GROWTH_FEATURES.md) for complete documentation**

Expected Impact:
- 3x conversion rate improvement
- 2.25x return visitor rate
- 0.4+ viral coefficient
- 35% leads qualified as hot/warm

### SEO Optimized
- Comprehensive meta tags for search engines
- Semantic HTML structure
- Mobile-responsive design
- Fast loading performance

### Speeki Brand Aligned
- Consistent with Speeki's visual identity
- Professional, modern design
- Accessible color scheme
- Clean typography using system fonts

## Available Checklists

### CSO's Anti-Greenwashing Checklist
**File:** `anti-greenwashing-checklist.html`

Ten essential actions every chief sustainability officer should take to reduce the risk of greenwashing in ESG reporting and communications.

**Key Features:**
- 10 major action areas
- 50 detailed checkpoint items
- Red flags to avoid
- Quick self-assessment questions
- CTA to Speeki Platform

**Topics Covered:**
1. Establish comprehensive data boundaries
2. Implement rigorous data verification
3. Use absolute metrics alongside relative improvements
4. Adopt standardised frameworks and definitions
5. Present balanced performance narratives
6. Ensure claims match resource allocation
7. Validate third-party certifications and awards
8. Ground future commitments in present action
9. Engage stakeholders for accountability
10. Maintain documentation and audit trails

## Usage

### For Development
Simply open the HTML files in a web browser. No build process required.

### For Production
1. Upload files to your web server
2. Ensure proper HTTPS configuration
3. Update canonical URLs in meta tags to match your domain
4. Configure proper caching headers for optimal performance

### Local Testing
```bash
# Navigate to the checklists directory
cd checklists

# Open in default browser (macOS)
open index.html

# Or use a local server
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## Technical Details

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (iOS Safari, Chrome Mobile)
- Requires JavaScript for progress tracking
- Uses localStorage for data persistence

### Data Storage
- Progress is stored in browser localStorage
- No server-side storage required
- Data persists across browser sessions
- Unique localStorage keys per checklist

### Accessibility
- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigation support
- Color contrast WCAG AA compliant
- Screen reader friendly labels

## Customization

### Adding New Checklists
1. Create new HTML file in `/checklists/` directory
2. Follow the structure of existing checklists
3. Add entry to `index.html` in the checklists grid
4. Update README with new checklist details
5. Ensure consistent Speeki branding

### Styling
All styles are embedded in HTML files for easy portability. Key CSS variables:
```css
--speeki-green: #00FF7F;  /* Speeki brand green */
--speeki-dark-blue: #0a1f44;   /* Primary text color */
--speeki-dark: #0a1f44;   /* Primary text color */
--speeki-gray: #4a5568;   /* Secondary text color */
--speeki-light-gray: #f8f9fa;  /* Background color */
--speeki-border: #e5e7eb;  /* Border color */
```

## SEO Best Practices

Each checklist includes:
- Descriptive page titles
- Meta descriptions (155-160 characters)
- Relevant keywords
- Open Graph tags for social sharing
- Canonical URLs
- Semantic HTML5 structure
- Descriptive alt text for images (when applicable)

## User Pain Points Addressed

1. **Complexity of ESG Compliance**: Breaks down complex requirements into actionable steps
2. **Progress Tracking**: Provides visual feedback and saves progress automatically
3. **Documentation**: Export feature helps create audit trails
4. **Transparency**: Encourages balanced, honest reporting
5. **Greenwashing Risk**: Identifies red flags and provides self-assessment
6. **Resource Planning**: Links claims to actual resource allocation
7. **Stakeholder Communication**: Facilitates sharing of progress with stakeholders

## Future Enhancements

- [ ] Add more checklists (CSRD Compliance, Carbon Footprint Assessment, etc.)
- [ ] Multi-language support
- [ ] PDF export functionality
- [ ] Team collaboration features
- [ ] Integration with Speeki Platform API
- [ ] Analytics dashboard
- [ ] Email progress reports

## Credits

**Author:** Scott Lane, CEO & Founder of Speeki
**Company:** Speeki Pte Ltd
**Website:** https://www.speeki.com
**Contact:** info@speeki.com

## License

© 2024 Speeki Pte Ltd. All rights reserved.

## Support

For questions or support:
- Email: info@speeki.com
- Website: https://www.speeki.com
