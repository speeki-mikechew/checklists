#!/usr/bin/env python3
"""
Script to improve professional alignment of auditor tip boxes
- Remove excessive left margin from .auditor-tip
- Ensure consistent spacing and better visual integration
- Maintain auto-expand on scroll functionality
"""

import re
import glob

def improve_auditor_tip_styling(content):
    """Update the .auditor-tip CSS for better professional alignment"""

    # Find and replace the .auditor-tip styling
    # Current: margin: 16px 0 32px 72px;
    # New: margin: 20px 0 32px 0; (remove left margin for better alignment)

    old_auditor_tip_style = r'(\.auditor-tip\s*\{[^}]*margin:\s*)16px 0 32px 72px;'
    new_auditor_tip_style = r'\g<1>20px 0 32px 0;'

    content = re.sub(old_auditor_tip_style, new_auditor_tip_style, content, flags=re.DOTALL)

    # Update padding for more professional spacing
    # Old padding: 16px 20px
    # New padding: 18px 24px
    old_header_padding = r'(\.auditor-tip-header\s*\{[^}]*padding:\s*)16px 20px;'
    new_header_padding = r'\g<1>18px 24px;'

    content = re.sub(old_header_padding, new_header_padding, content, flags=re.DOTALL)

    # Update content padding for consistency
    # Old: padding: 20px;
    # New: padding: 24px;
    old_content_padding = r'(\.auditor-tip-content\s*\{[^}]*padding:\s*)20px;'
    new_content_padding = r'\g<1>24px;'

    content = re.sub(old_content_padding, new_content_padding, content, flags=re.DOTALL)

    # Improve transition timing for smoother animation
    # Old: transition: opacity 0.4s ease, transform 0.4s ease;
    # New: transition: opacity 0.5s ease-out, transform 0.5s ease-out;
    old_transition = r'(\.auditor-tip\s*\{[^}]*transition:\s*)opacity 0\.4s ease, transform 0\.4s ease;'
    new_transition = r'\g<1>opacity 0.5s ease-out, transform 0.5s ease-out;'

    content = re.sub(old_transition, new_transition, content, flags=re.DOTALL)

    # Update red-flags-section transition for consistency
    old_rf_transition = r'(\.red-flags-section\s*\{[^}]*transition:\s*)opacity 0\.4s ease, transform 0\.4s ease;'
    new_rf_transition = r'\g<1>opacity 0.5s ease-out, transform 0.5s ease-out;'

    content = re.sub(old_rf_transition, new_rf_transition, content, flags=re.DOTALL)

    return content

def main():
    # Get all checklist HTML files
    checklist_files = [
        'iso-37001-checklist.html',
        'iso-37000-governance-checklist.html',
        'iso-37002-whistleblowing-checklist.html',
        'iso-37008-investigations-checklist.html',
        'iso-26000-social-responsibility-checklist.html',
        'esg-reporting-assurance-checklist.html',
        'esg-software-checklist.html',
        'ghg-reporting-readiness-checklist.html',
        'anti-greenwashing-checklist.html'
    ]

    files_updated = []

    for filename in checklist_files:
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()

            # Apply styling improvements
            updated_content = improve_auditor_tip_styling(content)

            # Only write if changes were made
            if updated_content != content:
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(updated_content)
                files_updated.append(filename)
                print(f"✓ Updated {filename}")
            else:
                print(f"- No changes needed for {filename}")

        except FileNotFoundError:
            print(f"✗ File not found: {filename}")
        except Exception as e:
            print(f"✗ Error processing {filename}: {e}")

    print(f"\n{len(files_updated)} files updated successfully")
    if files_updated:
        print("Updated files:")
        for f in files_updated:
            print(f"  - {f}")

if __name__ == '__main__':
    main()
