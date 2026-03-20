# Onboarding Wizard Improvements

## Overview
Enhanced the "Not sure where to start?" onboarding wizard with company-specific intelligence and focused learning paths.

## Key Features Implemented

### 1. Company Name Input (New Step 0)
- **What**: Added optional company name input as the first step
- **Why**: Enables intelligent, company-specific recommendations
- **How**: Users can enter their company name or skip to manual selection

### 2. Smart Industry Detection
- **Pattern Matching**: Analyzes company name for industry keywords
  - "Manufacturing", "Industrial" → Manufacturing
  - "Bank", "Financial" → Financial Services
  - "Tech", "Software" → Technology
  - "Retail", "Store" → Retail
  - "Energy", "Power" → Energy
  - "Health", "Medical" → Healthcare
- **Auto-Skip**: Skips industry selection when company is analyzed
- **Future Ready**: Prepared for Tavily API integration for real company data

### 3. Focused Single Path (3 Steps)
**Before**: Showed 4 recommendations with unclear priorities
**After**: Shows ONE focused 3-step learning journey

#### Path Generation Logic:
1. **Step 1 - Start Here**: Highest scoring checklist based on profile
2. **Step 2 - Next Step**: Complementary checklist from different category
3. **Step 3 - Complete Journey**: Advanced/certification-focused checklist

#### Path Tags:
- "Start Here" (green) - Primary recommendation
- "Next Step" (blue) - Complementary learning
- "Complete Your Journey" (purple) - Advanced completion

### 4. Enhanced Personalization
- Results title shows company name when provided
- Context messages include company-specific language
- All existing scoring logic preserved (industry, focus, maturity, urgency)

### 5. Improved UX
- 5 progress dots (was 4) to include company step
- Visual loading states during company analysis
- Clear option to skip company input
- Better visual hierarchy in results

## Testing Instructions

### Test Scenario 1: With Company Name
1. Open `index.html` in browser
2. Scroll to "Not sure where to start?" section
3. Enter company name: "Acme Manufacturing Ltd"
4. Click "Analyze & Continue"
5. **Expected**:
   - Loading spinner appears
   - "Company Analyzed" message shows
   - Auto-advances to Step 2 (skips industry)
   - Complete remaining questions
   - See 3-step focused path with company name in title

### Test Scenario 2: Skip Company Input
1. Click "Skip this step"
2. **Expected**:
   - Goes to Step 1 (industry selection)
   - Shows all 7 industry options
   - Complete all 4 questions
   - See 3-step focused path with generic title

### Test Scenario 3: Different Industries
Try different company names to verify industry detection:
- "First National Bank" → Should detect Financial
- "Green Energy Solutions" → Should detect Energy
- "HealthCare Plus" → Should detect Healthcare
- "Random Company Inc" → Should default to "Other"

### Test Scenario 4: Path Variation
Complete wizard with different selections:
- **Manufacturing + Reporting + Early**: Should prioritize GHG reporting
- **Financial + Compliance + Mature**: Should prioritize ISO certifications
- **Technology + Emissions + Developing**: Should balance reporting and governance

## Technical Details

### Step Numbering
- Step 0: Company name (optional)
- Step 1: Industry selection
- Step 2: Primary ESG focus
- Step 3: Maturity level
- Step 4: Timeline/urgency
- Result: Personalized 3-step path

### Scoring Algorithm (Unchanged)
- Industry match: +30 points
- Focus area match: +40 points
- Maturity fit: +25 points
- Urgency fit: +20 points
- Industry priority bonus: +10-40 points

### Path Selection (New)
1. Sort all checklists by score
2. Select highest as primary
3. Find complementary from different category
4. Find advanced/certification option
5. Return exactly 3 steps with progressive tags

## API Integration (Future)

### Tavily API Ready
When `TAVILY_API_KEY` is approved and configured:
```javascript
// Uncomment in analyzeCompany() function
const response = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        api_key: tavilyApiKey,
        query: `${companyName} industry sector compliance requirements`,
        search_depth: 'basic'
    })
});
```

This will provide:
- Real company industry verification
- Company size/structure
- Current compliance obligations
- Public/private status
- Sector-specific requirements

## Files Modified
- `/tmp/checklists/index.html` - Added company input, updated logic, enhanced results

## Backwards Compatibility
- All existing features work unchanged
- Users who skip company input get original experience
- Previous scoring logic fully preserved
- No breaking changes to data structures

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox
- Async/await JavaScript
- LocalStorage for profile persistence

## Next Steps (Optional Enhancements)
1. **Tavily API Integration**: Real company data enrichment
2. **Company Logo**: Display company logo in results (via Clearbit/similar)
3. **Industry Deep-Dive**: More granular industry sub-categories
4. **Save Progress**: Allow users to save and resume onboarding
5. **Email Results**: Send personalized path to user's email
6. **A/B Testing**: Track which approach (with/without company) converts better
