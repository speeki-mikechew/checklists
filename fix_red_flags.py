#!/usr/bin/env python3
"""
Fix the red-flags-section to restore proper details/summary structure.
"""

import glob
import re

def fix_file(filepath):
    print(f"Fixing: {filepath}")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix the broken red-flags-section structure
    # Pattern: <details class="red-flags-section">\n            <summary>\n            <div class="auditor-tip-header">What Auditors Look For: ...
    # Should be: <details class="red-flags-section">\n            <summary>What Auditors Look For: ...

    # First, fix the summary tag placement
    content = re.sub(
        r'<details class="red-flags-section">\s*<summary>\s*<div class="auditor-tip-header">(What Auditors Look For: [^<]+)</div>',
        r'<details class="red-flags-section">\n            <summary>\1</summary>',
        content
    )

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
