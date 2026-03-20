#!/bin/bash

# This script will help identify the sections that need to be updated in the remaining checklists
echo "=== Remaining Checklists to Update ==="
echo ""

for file in ghg-reporting-readiness-checklist.html anti-greenwashing-checklist.html esg-reporting-assurance-checklist.html iso-26000-social-responsibility-checklist.html iso-37000-governance-checklist.html iso-37008-investigations-checklist.html; do
    if [ -f "$file" ]; then
        echo "File: $file"
        echo "  - Has meta description: $(grep -c 'meta name="description"' "$file")"
        echo "  - Has CTA section: $(grep -c 'Need\|Looking to\|Halfway There' "$file" || echo "0")"
        echo "  - Has auditor-insight CSS: $(grep -c 'auditor-insight' "$file")"
        echo ""
    fi
done
