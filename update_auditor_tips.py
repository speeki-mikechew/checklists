#!/usr/bin/env python3
"""
Script to update auditor-tip sections in all checklist HTML files:
1. Convert <details class="auditor-tip"> to <div class="auditor-tip">
2. Convert <summary>What Auditors Look For</summary> to <div class="auditor-tip-header">What Auditors Look For</div>
3. Update </details> closing tags to </div>
4. Remove emoji references from CSS
5. Add reveal-on-scroll JavaScript
"""

import re
import glob
import os

def update_auditor_tips(html_content):
    """Update auditor-tip elements from details to div."""

    # Replace <details class="auditor-tip"> with <div class="auditor-tip">
    html_content = re.sub(
        r'<details class="auditor-tip">',
        '<div class="auditor-tip">',
        html_content
    )

    # Replace <summary>What Auditors Look For</summary> with header div
    html_content = re.sub(
        r'<summary>What Auditors Look For</summary>',
        '<div class="auditor-tip-header">What Auditors Look For</div>',
        html_content
    )

    # Replace </details> that follows auditor-tip-content with </div>
    # This is tricky - we need to find the right closing tags
    # Let's use a pattern that matches the structure
    html_content = re.sub(
        r'(</div>\s*</div>\s*)</details>(\s*</div>)',
        r'\1</div>\2',
        html_content
    )

    return html_content

def update_css_emojis(html_content):
    """Replace emoji content with SVG icons in CSS."""

    # Replace auditor-insight h4::before emoji
    html_content = re.sub(
        r"(\.auditor-insight h4::before \{\s*content: )\"🔍\"(;\s*font-size: 20px;)",
        r'\1"";\n            display: inline-block;\n            width: 20px;\n            height: 20px;\n            background: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%230a1f44\' stroke-width=\'2\'%3E%3Ccircle cx=\'11\' cy=\'11\' r=\'8\'/%3E%3Cpath d=\'m21 21-4.35-4.35\'/%3E%3C/svg%3E") no-repeat center;\n            background-size: contain',
        html_content
    )

    # Replace red-flags-section summary::before emoji
    html_content = re.sub(
        r"(details\.red-flags-section summary::before \{\s*content: )\"🚩\"(;\s*font-size: 20px;)",
        r'\1"";\n            display: inline-block;\n            width: 20px;\n            height: 20px;\n            background: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23c53030\' stroke=\'%23c53030\' stroke-width=\'2\'%3E%3Cpath d=\'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z\'/%3E%3Cline x1=\'4\' y1=\'22\' x2=\'4\' y2=\'15\'/%3E%3C/svg%3E") no-repeat center;\n            background-size: contain',
        html_content
    )

    # Replace red-flag::before emoji
    html_content = re.sub(
        r"(\.auditor-tip-content \.red-flag::before \{\s*content: )\"⚠️\"(;\s*font-size: 14px;\s*flex-shrink: 0;)",
        r'\1"";\n            display: inline-block;\n            width: 14px;\n            height: 14px;\n            flex-shrink: 0;\n            background: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23991b1b\' stroke=\'%23991b1b\' stroke-width=\'2\'%3E%3Cpath d=\'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z\'/%3E%3Cline x1=\'12\' y1=\'9\' x2=\'12\' y2=\'13\'/%3E%3Cline x1=\'12\' y1=\'17\' x2=\'12.01\' y2=\'17\'/%3E%3C/svg%3E") no-repeat center;\n            background-size: contain',
        html_content
    )

    # Replace why-matters::before emoji
    html_content = re.sub(
        r"(\.auditor-tip-content \.why-matters::before \{\s*content: )\"💡\"(;\s*font-size: 14px;\s*flex-shrink: 0;)",
        r'\1"";\n            display: inline-block;\n            width: 14px;\n            height: 14px;\n            flex-shrink: 0;\n            background: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%231e40af\' stroke-width=\'2\'%3E%3Cpath d=\'M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1H9a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z\'/%3E%3Cpath d=\'M9 21h6\'/%3E%3Cpath d=\'M9 17v4\'/%3E%3Cpath d=\'M15 17v4\'/%3E%3C/svg%3E") no-repeat center;\n            background-size: contain',
        html_content
    )

    return html_content

def update_auditor_tip_css(html_content):
    """Replace the entire auditor-tip CSS section with new professional styling."""

    # Pattern to find and replace the auditor-tip CSS block
    old_css_pattern = r'/\* Inline Auditor Tips - contextual insights per section \*/\s*details\.auditor-tip \{[^}]+\}\s*details\.auditor-tip summary \{[^}]+\}\s*details\.auditor-tip summary:hover \{[^}]+\}\s*details\.auditor-tip summary::before \{[^}]+\}\s*details\.auditor-tip summary::after \{[^}]+\}\s*details\.auditor-tip\[open\] summary::after \{[^}]+\}\s*details\.auditor-tip summary::-webkit-details-marker \{[^}]+\}\s*\.auditor-tip-content \{[^}]+\}'

    new_css = '''/* Inline Auditor Tips - contextual insights per section */
        .auditor-tip {
            margin: 16px 0 32px 72px;
            background: #ffffff;
            border: 1px solid var(--speeki-border);
            border-left: 3px solid var(--speeki-green);
            border-radius: 4px;
            overflow: hidden;
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.4s ease, transform 0.4s ease;
        }

        .auditor-tip.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .auditor-tip-header {
            padding: 16px 20px;
            font-weight: 600;
            font-size: 14px;
            color: var(--speeki-dark-blue);
            display: flex;
            align-items: center;
            gap: 10px;
            background: #f8f9fa;
            border-bottom: 1px solid var(--speeki-border);
        }

        .auditor-tip-header::before {
            content: "";
            display: inline-block;
            width: 16px;
            height: 16px;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230a1f44' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3C/svg%3E") no-repeat center;
            background-size: contain;
        }

        .auditor-tip-content {
            padding: 20px;
        }'''

    html_content = re.sub(old_css_pattern, new_css, html_content, flags=re.DOTALL)

    return html_content

def add_reveal_script(html_content):
    """Add JavaScript for reveal-on-scroll functionality."""

    reveal_script = '''
    <script>
        // Reveal auditor tips when they come into view
        (function() {
            const auditorTips = document.querySelectorAll('.auditor-tip');

            const revealOnScroll = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            auditorTips.forEach(tip => revealOnScroll.observe(tip));
        })();
    </script>
'''

    # Insert before closing </body> tag
    html_content = html_content.replace('</body>', reveal_script + '</body>')

    return html_content

def process_file(filepath):
    """Process a single HTML file."""
    print(f"Processing: {filepath}")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Apply all transformations
    content = update_auditor_tips(content)
    content = update_css_emojis(content)
    content = update_auditor_tip_css(content)
    content = add_reveal_script(content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  Updated: {filepath}")

def main():
    # Get all checklist HTML files
    html_files = glob.glob('/private/tmp/checklists/*-checklist.html')

    for filepath in html_files:
        process_file(filepath)

    print(f"\nProcessed {len(html_files)} files")

if __name__ == '__main__':
    main()
