#!/bin/bash

echo "Summary of CTAs that need manual review:"
echo ""
echo "=== anti-greenwashing-checklist.html ==="
grep -n "Need\|Looking\|Halfway" anti-greenwashing-checklist.html | head -5

echo ""
echo "=== esg-reporting-assurance-checklist.html ==="
grep -n "Need\|Looking\|help\|support" esg-reporting-assurance-checklist.html | head -5

echo ""
echo "=== iso-26000-social-responsibility-checklist.html ==="
grep -n "Need\|Looking\|help\|support" iso-26000-social-responsibility-checklist.html | head -5

echo ""
echo "=== iso-37000-governance-checklist.html ==="
grep -n "Need\|Looking\|help\|support" iso-37000-governance-checklist.html | head -5

echo ""
echo "=== iso-37008-investigations-checklist.html ==="
grep -n "Need\|Looking\|help\|support" iso-37008-investigations-checklist.html | head -5

