#!/usr/bin/env python3
"""
Update CSS in all checklist files to:
1. Replace emojis with SVG icons
2. Update auditor-tip styling from details to div
3. Add reveal-on-scroll JavaScript
"""

import re
import glob

# New CSS for auditor-tip (without details/summary)
NEW_AUDITOR_TIP_CSS = '''/* Inline Auditor Tips - contextual insights per section */
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

# JavaScript for reveal-on-scroll
REVEAL_SCRIPT = '''
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

def update_file(filepath):
    print(f"Processing: {filepath}")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace auditor-tip CSS block (handles both old details.auditor-tip and .auditor-tip patterns)
    # Find and replace the entire CSS block for auditor-tip
    old_css_pattern = r'/\* Inline Auditor Tips - contextual insights per section \*/[\s\S]*?\.auditor-tip-content \{\s*padding: 20px;\s*\}'

    if re.search(old_css_pattern, content):
        content = re.sub(old_css_pattern, NEW_AUDITOR_TIP_CSS, content)

    # 2. Replace emoji icons with SVG icons

    # auditor-insight h4::before emoji
    content = re.sub(
        r'(\.auditor-insight h4::before \{[\s\S]*?content: )"🔍";',
        r'\1"";',
        content
    )

    # Add display/background properties if not present after content change
    if '.auditor-insight h4::before' in content and 'font-size: 20px;' in content:
        content = re.sub(
            r'(\.auditor-insight h4::before \{[^}]*content: "";)\s*font-size: 20px;',
            r'''\1
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230a1f44' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3C/svg%3E") no-repeat center;
            background-size: contain;''',
            content
        )

    # red-flags-section summary::before emoji
    content = re.sub(
        r'(details\.red-flags-section summary::before \{[\s\S]*?content: )"🚩";',
        r'\1"";',
        content
    )
    if 'details.red-flags-section summary::before' in content:
        content = re.sub(
            r'(details\.red-flags-section summary::before \{[^}]*content: "";)\s*font-size: 20px;',
            r'''\1
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23c53030' stroke='%23c53030' stroke-width='2'%3E%3Cpath d='M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z'/%3E%3Cline x1='4' y1='22' x2='4' y2='15'/%3E%3C/svg%3E") no-repeat center;
            background-size: contain;''',
            content
        )

    # red-flag::before emoji (in auditor-tip-content)
    content = re.sub(
        r'(\.auditor-tip-content \.red-flag::before \{[\s\S]*?content: )"⚠️";',
        r'\1"";',
        content
    )
    if '.auditor-tip-content .red-flag::before' in content:
        content = re.sub(
            r'(\.auditor-tip-content \.red-flag::before \{[^}]*content: "";)\s*font-size: 14px;\s*flex-shrink: 0;',
            r'''\1
            display: inline-block;
            width: 14px;
            height: 14px;
            flex-shrink: 0;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23991b1b' stroke='%23991b1b' stroke-width='2'%3E%3Cpath d='M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z'/%3E%3Cline x1='12' y1='9' x2='12' y2='13'/%3E%3Cline x1='12' y1='17' x2='12.01' y2='17'/%3E%3C/svg%3E") no-repeat center;
            background-size: contain;''',
            content
        )

    # why-matters::before emoji
    content = re.sub(
        r'(\.auditor-tip-content \.why-matters::before \{[\s\S]*?content: )"💡";',
        r'\1"";',
        content
    )
    if '.auditor-tip-content .why-matters::before' in content:
        content = re.sub(
            r'(\.auditor-tip-content \.why-matters::before \{[^}]*content: "";)\s*font-size: 14px;\s*flex-shrink: 0;',
            r'''\1
            display: inline-block;
            width: 14px;
            height: 14px;
            flex-shrink: 0;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231e40af' stroke-width='2'%3E%3Cpath d='M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1H9a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z'/%3E%3Cpath d='M9 21h6'/%3E%3Cpath d='M9 17v4'/%3E%3Cpath d='M15 17v4'/%3E%3C/svg%3E") no-repeat center;
            background-size: contain;''',
            content
        )

    # 3. Fix media query reference from details.auditor-tip to .auditor-tip
    content = content.replace('details.auditor-tip {', '.auditor-tip {')

    # 4. Add reveal script if not present
    if 'Reveal auditor tips when they come into view' not in content:
        content = content.replace('</body>', REVEAL_SCRIPT + '</body>')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  Updated: {filepath}")

def main():
    files = glob.glob('/private/tmp/checklists/*-checklist.html')
    for filepath in files:
        update_file(filepath)
    print(f"\nProcessed {len(files)} files")

if __name__ == '__main__':
    main()
