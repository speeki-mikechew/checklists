#!/usr/bin/env python3
"""
Fix the CSS to replace details.auditor-tip styling with div-based styling.
"""

import glob
import re

# The complete new CSS block for auditor-tip
NEW_CSS_BLOCK = '''/* Inline Auditor Tips - contextual insights per section */
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
        }

        .auditor-tip-content p {
            color: var(--speeki-gray);
            font-size: 14px;
            line-height: 1.6;
            margin-bottom: 12px;
        }

        .auditor-tip-content p:last-child {
            margin-bottom: 0;
        }

        .auditor-tip-content .red-flag {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            padding: 10px 12px;
            background: #fef2f2;
            border-radius: 6px;
            margin-top: 12px;
        }

        .auditor-tip-content .red-flag::before {
            content: "";
            display: inline-block;
            width: 14px;
            height: 14px;
            flex-shrink: 0;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23991b1b' stroke='%23991b1b' stroke-width='2'%3E%3Cpath d='M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z'/%3E%3Cline x1='12' y1='9' x2='12' y2='13'/%3E%3Cline x1='12' y1='17' x2='12.01' y2='17'/%3E%3C/svg%3E") no-repeat center;
            background-size: contain;
        }

        .auditor-tip-content .red-flag-text {
            color: #991b1b;
            font-size: 13px;
            line-height: 1.5;
            font-weight: 500;
        }

        .auditor-tip-content .why-matters {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            padding: 10px 12px;
            background: #eff6ff;
            border-radius: 6px;
            margin-top: 12px;
        }

        .auditor-tip-content .why-matters::before {
            content: "";
            display: inline-block;
            width: 14px;
            height: 14px;
            flex-shrink: 0;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231e40af' stroke-width='2'%3E%3Cpath d='M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1H9a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z'/%3E%3Cpath d='M9 21h6'/%3E%3Cpath d='M9 17v4'/%3E%3Cpath d='M15 17v4'/%3E%3C/svg%3E") no-repeat center;
            background-size: contain;
        }

        .auditor-tip-content .why-matters-text {
            color: #1e40af;
            font-size: 13px;
            line-height: 1.5;
        }'''

def fix_file(filepath):
    print(f"Fixing: {filepath}")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find and replace the entire auditor-tip CSS block
    # Pattern to match from "/* Inline Auditor Tips" to just before "@media" or "details.red-flags-section"
    pattern = r'/\* Inline Auditor Tips - contextual insights per section \*/[\s\S]*?\.auditor-tip-content \.why-matters-text \{[^}]+\}'

    if re.search(pattern, content):
        content = re.sub(pattern, NEW_CSS_BLOCK, content)
        print(f"  Replaced CSS block")
    else:
        # Try alternative pattern for files with different structure
        alt_pattern = r'/\* Inline Auditor Tips - contextual insights per section \*/[\s\S]*?(?=\s*@media|\s*details\.red-flags-section)'
        if re.search(alt_pattern, content):
            # Find where we need to insert (before @media or red-flags-section)
            match = re.search(alt_pattern, content)
            if match:
                # Replace everything from the auditor-tip comment to the end of why-matters-text
                content = re.sub(alt_pattern, NEW_CSS_BLOCK + '\n\n        ', content)
                print(f"  Replaced CSS block (alt pattern)")

    # Also fix media query reference
    content = content.replace('details.auditor-tip {', '.auditor-tip {')

    # Remove any remaining details.auditor-tip summary/hover rules
    content = re.sub(r'\s*details\.auditor-tip summary \{[^}]+\}', '', content)
    content = re.sub(r'\s*details\.auditor-tip summary:hover \{[^}]+\}', '', content)
    content = re.sub(r'\s*details\.auditor-tip summary::before \{[^}]+\}', '', content)
    content = re.sub(r'\s*details\.auditor-tip summary::after \{[^}]+\}', '', content)
    content = re.sub(r'\s*details\.auditor-tip\[open\] summary::after \{[^}]+\}', '', content)
    content = re.sub(r'\s*details\.auditor-tip summary::-webkit-details-marker \{[^}]+\}', '', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  Done")

def main():
    files = glob.glob('/private/tmp/checklists/*-checklist.html')
    for filepath in files:
        fix_file(filepath)
    print(f"\nFixed {len(files)} files")

if __name__ == '__main__':
    main()
