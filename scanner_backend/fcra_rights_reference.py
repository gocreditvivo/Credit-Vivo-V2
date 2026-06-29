from __future__ import annotations

from typing import Dict, List


FCRA_RIGHTS_SOURCE_NOTES = {
    "primary_reference": "CFPB Regulation V Appendix K - Summary of Consumer Rights",
    "primary_url": "https://www.consumerfinance.gov/rules-policy/regulations/1022/K",
    "agency_contact_update_reference": "CFPB 2023 Agency Contact Information technical corrections",
    "agency_contact_update_url": "https://www.federalregister.gov/documents/2023/03/20/2023-05216/agency-contact-information",
    "plain_english_note": (
        "States may enforce the FCRA, and many states have their own consumer reporting laws. "
        "Customers may have more rights under state law and should contact their state or local "
        "consumer protection agency or state Attorney General for state-law questions."
    ),
    "compliance_note": (
        "Use this as an internal routing/reference checklist. It is not legal advice. "
        "Before production disclosure use, confirm the current CFPB model form and agency addresses."
    ),
}


FCRA_FEDERAL_CONTACTS: List[Dict[str, object]] = [
    {
        "category": "Banks, savings associations, and credit unions with total assets over $10 billion and affiliates",
        "contacts": [
            {
                "agency": "Bureau of Consumer Financial Protection",
                "address": "1700 G Street NW, Washington, DC 20552",
            },
            {
                "agency": "Federal Trade Commission Consumer Response Center",
                "address": "600 Pennsylvania Avenue NW, Washington, DC 20580",
                "use_when": "Affiliate is not a bank, savings association, or credit union; list in addition to the Bureau.",
            },
        ],
    },
    {
        "category": "National banks, federal savings associations, and federal branches/agencies of foreign banks",
        "contacts": [
            {
                "agency": "Office of the Comptroller of the Currency - Customer Assistance Group",
                "address": "P.O. Box 53570, Houston, TX 77052",
            }
        ],
    },
    {
        "category": "State member banks, foreign bank branches/agencies, and commercial lending companies owned or controlled by foreign banks",
        "contacts": [
            {
                "agency": "Federal Reserve Consumer Help Center",
                "address": "PO Box 1200, Minneapolis, MN 55480",
            }
        ],
    },
    {
        "category": "Nonmember insured banks, insured state branches of foreign banks, and insured state savings associations",
        "contacts": [
            {
                "agency": "FDIC Division of Depositor and Consumer Protection - National Center for Consumer and Depositor Assistance",
                "address": "1100 Walnut Street, Box #11, Kansas City, MO 64106",
            }
        ],
    },
    {
        "category": "Federal credit unions",
        "contacts": [
            {
                "agency": "National Credit Union Administration - Office of Consumer Financial Protection",
                "address": "1775 Duke Street, Alexandria, VA 22314",
            }
        ],
    },
    {
        "category": "Air carriers",
        "contacts": [
            {
                "agency": "Department of Transportation - Assistant General Counsel for Office of Aviation Consumer Protection",
                "address": "1200 New Jersey Avenue SE, Washington, DC 20590",
            }
        ],
    },
    {
        "category": "Creditors subject to the Surface Transportation Board",
        "contacts": [
            {
                "agency": "Surface Transportation Board - Office of Public Assistance, Governmental Affairs, and Compliance",
                "address": "395 E Street SW, Washington, DC 20423",
            }
        ],
    },
    {
        "category": "Creditors subject to Packers and Stockyards Act",
        "contacts": [
            {
                "agency": "Nearest Packers and Stockyards Division Regional Office",
                "address": "Regional office varies by location",
            }
        ],
    },
    {
        "category": "Small Business Investment Companies",
        "contacts": [
            {
                "agency": "United States Small Business Administration - Associate Administrator, Office of Capital Access",
                "address": "409 Third Street SW, Suite 8200, Washington, DC 20416",
            }
        ],
    },
    {
        "category": "Brokers and dealers",
        "contacts": [
            {
                "agency": "Securities and Exchange Commission",
                "address": "100 F Street NE, Washington, DC 20549",
            }
        ],
    },
    {
        "category": "Federal Land Banks, Federal Land Bank Associations, Federal Intermediate Credit Banks, and Production Credit Associations",
        "contacts": [
            {
                "agency": "Farm Credit Administration",
                "address": "1501 Farm Credit Drive, McLean, VA 22102-5090",
            }
        ],
    },
    {
        "category": "Retailers, finance companies, and all other creditors not listed above",
        "contacts": [
            {
                "agency": "Federal Trade Commission Consumer Response Center - FCRA",
                "address": "600 Pennsylvania Avenue NW, Washington, DC 20580",
                "phone": "(877) 382-4357",
            }
        ],
    },
]


FCRA_STATE_NOTICE_LINKS: List[Dict[str, str]] = [
    {"state": "California Fraud State Notice", "url": "https://www.experian.com/blogs/ask-experian/california-fraud-state-notice-of-rights/"},
    {"state": "California", "url": "https://www.experian.com/blogs/ask-experian/credit-education/report-basics/fair-credit-reporting-act-fcra/california/"},
    {"state": "Connecticut", "url": "https://www.experian.com/blogs/ask-experian/credit-education/report-basics/fair-credit-reporting-act-fcra/connecticut/"},
    {"state": "Delaware", "url": "https://www.experian.com/blogs/ask-experian/credit-education/report-basics/fair-credit-reporting-act-fcra/delaware/"},
    {"state": "District of Columbia", "url": "https://www.experian.com/blogs/ask-experian/credit-education/report-basics/fair-credit-reporting-act-fcra/district-of-columbia/"},
    {"state": "Georgia", "url": "https://www.experian.com/blogs/ask-experian/credit-education/report-basics/fair-credit-reporting-act-fcra/georgia/"},
    {"state": "Massachusetts", "url": "https://www.experian.com/blogs/ask-experian/credit-education/report-basics/fair-credit-reporting-act-fcra/massachusetts/"},
    {"state": "Missouri", "url": "https://www.experian.com/blogs/ask-experian/credit-education/report-basics/fair-credit-reporting-act-fcra/missouri/"},
    {"state": "Montana", "url": "https://www.experian.com/blogs/ask-experian/credit-education/report-basics/fair-credit-reporting-act-fcra/montana/"},
    {"state": "New Hampshire", "url": "https://www.experian.com/blogs/ask-experian/credit-education/report-basics/fair-credit-reporting-act-fcra/new-hampshire/"},
    {"state": "New Jersey", "url": "https://www.experian.com/blogs/ask-experian/credit-education/report-basics/fair-credit-reporting-act-fcra/new-jersey/"},
    {"state": "North Carolina", "url": "https://www.experian.com/blogs/ask-experian/credit-education/report-basics/fair-credit-reporting-act-fcra/north-carolina/"},
    {"state": "North Dakota", "url": "https://www.experian.com/blogs/ask-experian/credit-education/report-basics/fair-credit-reporting-act-fcra/north-dakota/"},
    {"state": "Rhode Island", "url": "https://www.experian.com/blogs/ask-experian/credit-education/report-basics/fair-credit-reporting-act-fcra/rhode-island/"},
    {"state": "Tennessee", "url": "https://www.experian.com/blogs/ask-experian/credit-education/report-basics/fair-credit-reporting-act-fcra/tennessee/"},
    {"state": "Texas", "url": "https://www.experian.com/blogs/ask-experian/credit-education/report-basics/fair-credit-reporting-act-fcra/texas/"},
    {"state": "Vermont", "url": "https://www.experian.com/blogs/ask-experian/credit-education/report-basics/fair-credit-reporting-act-fcra/vermont/"},
    {"state": "Virginia", "url": "https://www.experian.com/blogs/ask-experian/credit-education/report-basics/fair-credit-reporting-act-fcra/virginia/"},
    {"state": "Washington", "url": "https://www.experian.com/blogs/ask-experian/credit-education/report-basics/fair-credit-reporting-act-fcra/washington/"},
    {"state": "West Virginia", "url": "https://www.experian.com/blogs/ask-experian/credit-education/report-basics/fair-credit-reporting-act-fcra/west-virginia/"},
]


def build_fcra_rights_reference() -> Dict[str, object]:
    return {
        "source_notes": FCRA_RIGHTS_SOURCE_NOTES,
        "federal_contacts": FCRA_FEDERAL_CONTACTS,
        "state_notice_links": FCRA_STATE_NOTICE_LINKS,
        "ai_rules": [
            "Always tell customers state rights may exist in addition to federal FCRA rights.",
            "Route unresolved serious issues to CFPB/state/attorney-review workflows only after customer approval.",
            "Use federal regulator contacts as a routing guide, not as legal advice.",
            "State notice links are references; confirm current state-law requirements before production disclosure use.",
        ],
    }
