#!/usr/bin/env python3
"""
Batch update remaining checklists with assurance-based language and red flags
"""

import re

# CSS to be added before @media queries
CSS_ADDITIONS = '''
        .auditor-insight {
            background: #f8f9fa;
            border-left: 4px solid var(--speeki-green);
            padding: 24px;
            margin: 24px 0 32px 0;
            border-radius: 4px;
        }

        .auditor-insight h4 {
            color: var(--speeki-dark-blue);
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .auditor-insight h4::before {
            content: "🔍";
            font-size: 20px;
        }

        .auditor-insight p {
            color: var(--speeki-gray);
            font-size: 15px;
            margin-bottom: 12px;
            line-height: 1.6;
        }

        .auditor-insight ul {
            margin: 0;
            padding-left: 20px;
        }

        .auditor-insight li {
            color: var(--speeki-gray);
            font-size: 15px;
            margin-bottom: 8px;
            line-height: 1.6;
        }

        .auditor-insight strong {
            color: var(--speeki-dark);
            font-weight: 600;
        }

        details.red-flags-section {
            margin: 32px 0;
            background: #fff5f5;
            border: 1px solid #feb2b2;
            border-radius: 6px;
            padding: 0;
        }

        details.red-flags-section summary {
            padding: 20px 24px;
            cursor: pointer;
            font-weight: 600;
            font-size: 18px;
            color: var(--speeki-dark-blue);
            list-style: none;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        details.red-flags-section summary::before {
            content: "🚩";
            font-size: 20px;
        }

        details.red-flags-section summary::after {
            content: "▼";
            margin-left: auto;
            font-size: 12px;
            transition: transform 0.2s;
        }

        details.red-flags-section[open] summary::after {
            transform: rotate(-180deg);
        }

        .red-flags-content {
            padding: 0 24px 24px 24px;
        }

        .red-flag-category {
            margin-bottom: 20px;
        }

        .red-flag-category h5 {
            color: #c53030;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 8px;
        }

        .red-flag-category ul {
            margin: 0;
            padding-left: 20px;
        }

        .red-flag-category li {
            color: var(--speeki-gray);
            font-size: 14px;
            margin-bottom: 6px;
            line-height: 1.5;
        }

'''

def add_css_if_needed(filepath):
    """Add CSS for red flags sections if not already present"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if CSS already added
    if 'auditor-insight' in content:
        print(f"  ✓ CSS already present in {filepath}")
        return content

    # Find @media query and add CSS before it
    content = re.sub(
        r'(\s+)@media\s*\(',
        f'{CSS_ADDITIONS}\n\\1@media (',
        content,
        count=1
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  ✓ Added CSS to {filepath}")
    return content

# Checklist configurations
CHECKLISTS = {
    'anti-greenwashing-checklist.html': {
        'red_flags': {
            'title': 'ESG Data Verification Red Flags',
            'intro': 'When providing assurance over ESG disclosures, auditors commonly flag the following data management, governance, and disclosure concerns.',
            'categories': [
                {
                    'name': 'Data Management Red Flags',
                    'items': [
                        'Manual data aggregation from multiple disconnected sources',
                        'No defined data ownership or accountability structure',
                        'KPIs calculated differently across business units',
                        'Historical data restated without documented rationale'
                    ]
                },
                {
                    'name': 'Governance Red Flags',
                    'items': [
                        'ESG metrics not subject to same controls as financial reporting',
                        'Materiality assessment conducted without stakeholder input documentation',
                        'Targets set without documented baseline methodology',
                        'No internal audit or second-line review of ESG disclosures'
                    ]
                },
                {
                    'name': 'Disclosure Red Flags',
                    'items': [
                        'Forward-looking statements without stated assumptions',
                        'Peer comparisons using non-standardised metrics',
                        'Environmental claims not tied to verified programmes',
                        'Social metrics lacking demographic or geographic disaggregation'
                    ]
                }
            ]
        }
    },
    'esg-reporting-assurance-checklist.html': {
        'red_flags': {
            'title': 'ESG Reporting Assurance Red Flags',
            'intro': 'When conducting ESG reporting assurance engagements, auditors commonly flag the following data management, governance, and disclosure concerns.',
            'categories': [
                {
                    'name': 'Data Management Red Flags',
                    'items': [
                        'Manual data aggregation from multiple disconnected sources',
                        'No defined data ownership or accountability structure',
                        'KPIs calculated differently across business units',
                        'Historical data restated without documented rationale'
                    ]
                },
                {
                    'name': 'Governance Red Flags',
                    'items': [
                        'ESG metrics not subject to same controls as financial reporting',
                        'Materiality assessment conducted without stakeholder input documentation',
                        'Targets set without documented baseline methodology',
                        'No internal audit or second-line review of ESG disclosures'
                    ]
                },
                {
                    'name': 'Disclosure Red Flags',
                    'items': [
                        'Forward-looking statements without stated assumptions',
                        'Peer comparisons using non-standardised metrics',
                        'Environmental claims not tied to verified programmes',
                        'Social metrics lacking demographic or geographic disaggregation'
                    ]
                }
            ]
        }
    },
    'iso-26000-social-responsibility-checklist.html': {
        'red_flags': {
            'title': 'ISO 26000 Social Responsibility Red Flags',
            'intro': 'When assessing social responsibility management systems, auditors commonly flag the following governance, human rights, and labour practice concerns.',
            'categories': [
                {
                    'name': 'Governance Red Flags',
                    'items': [
                        'Board composition does not include ESG expertise',
                        'Stakeholder engagement conducted ad hoc, not systematically',
                        'No documented due diligence process for social impacts'
                    ]
                },
                {
                    'name': 'Human Rights Red Flags',
                    'items': [
                        'Supply chain due diligence limited to tier 1 suppliers',
                        'Grievance mechanisms not accessible to affected communities',
                        'No evidence of remedy where impacts identified'
                    ]
                },
                {
                    'name': 'Labour Practice Red Flags',
                    'items': [
                        'Contractor workforce excluded from health and safety metrics',
                        'No gender pay gap analysis or disclosure',
                        'Training records incomplete for safety-critical roles'
                    ]
                }
            ]
        }
    },
    'iso-37000-governance-checklist.html': {
        'red_flags': {
            'title': 'ISO 37000 Governance Red Flags',
            'intro': 'When assessing governance systems under ISO 37000, auditors commonly flag the following board effectiveness and oversight concerns.',
            'categories': [
                {
                    'name': 'Board Effectiveness Red Flags',
                    'items': [
                        'No documented skills matrix or gap analysis',
                        'Board evaluation not conducted independently',
                        'Tenure of directors exceeds 9 years without documented justification'
                    ]
                },
                {
                    'name': 'Oversight Red Flags',
                    'items': [
                        'Risk committee meeting frequency less than quarterly',
                        'No evidence of board challenge to management proposals',
                        'Delegation of authority not formally documented'
                    ]
                }
            ]
        }
    },
    'iso-37008-investigations-checklist.html': {
        'red_flags': {
            'title': 'ISO 37008 Investigations Red Flags',
            'intro': 'When assessing investigation processes under ISO 37008, auditors commonly flag the following process and documentation concerns.',
            'categories': [
                {
                    'name': 'Process Red Flags',
                    'items': [
                        'Investigation scope not documented at commencement',
                        'No protocols for evidence preservation and chain of custody',
                        'Investigator reports to subject of investigation'
                    ]
                },
                {
                    'name': 'Documentation Red Flags',
                    'items': [
                        'Interview notes not contemporaneously recorded',
                        'No documented criteria for case escalation or closure',
                        'Root cause analysis not documented'
                    ]
                }
            ]
        }
    }
}

def generate_red_flags_html(config):
    """Generate red flags HTML section"""
    html = f'''    <!-- Red Flags Section -->
    <details class="red-flags-section">
        <summary>What Auditors Look For: {config['title']}</summary>
        <div class="red-flags-content">
            <p style="color: var(--speeki-gray); font-size: 15px; margin-bottom: 20px;">{config['intro']}</p>

'''

    for category in config['categories']:
        html += f'''            <div class="red-flag-category">
                <h5>{category['name']}</h5>
                <ul>
'''
        for item in category['items']:
            html += f'                    <li>{item}</li>\n'
        html += '''                </ul>
            </div>

'''

    html += '''        </div>
    </details>

'''
    return html

print("Starting batch update of remaining checklists...")
print()

for filename, config in CHECKLISTS.items():
    filepath = f'/tmp/checklists/{filename}'
    print(f"Processing {filename}...")

    try:
        # Add CSS
        content = add_css_if_needed(filepath)

        # Generate and add red flags section
        red_flags_html = generate_red_flags_html(config['red_flags'])

        # Find appropriate insertion point (before footer, cta, or closing main tag)
        # We'll add it before the first occurrence of </main>, <footer>, or class="cta"

        patterns_to_try = [
            (r'(<footer[^>]*>)', red_flags_html + r'\1'),
            (r'(</main>)', red_flags_html + r'\1'),
            (r'(<section[^>]*class="cta")', red_flags_html + r'\1'),
            (r'(<div[^>]*class="cta-section")', red_flags_html + r'\1'),
        ]

        updated = False
        for pattern, replacement in patterns_to_try:
            if re.search(pattern, content):
                # Check if red flags already exist
                if 'What Auditors Look For:' not in content:
                    content = re.sub(pattern, replacement, content, count=1)
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"  ✓ Added red flags section")
                    updated = True
                else:
                    print(f"  ✓ Red flags already present")
                    updated = True
                break

        if not updated:
            print(f"  ⚠ Could not find insertion point for red flags")

        print()

    except Exception as e:
        print(f"  ✗ Error: {e}")
        print()

print("Batch update complete!")
