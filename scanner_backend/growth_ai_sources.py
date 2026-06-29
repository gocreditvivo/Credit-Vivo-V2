from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, List


@dataclass(frozen=True)
class GrowthDataSource:
    name: str
    category: str
    source_url: str
    what_growth_ai_gets: str
    first_action: str
    compliance_note: str


@dataclass(frozen=True)
class PublicPartnerLead:
    name: str
    partner_type: str
    geography: str
    public_contact: str
    source_url: str
    fit_reason: str
    recommended_campaign: str


GROWTH_DATA_SOURCES: List[GrowthDataSource] = [
    GrowthDataSource(
        name="Credit Vivo website events",
        category="owned_website",
        source_url="https://www.creditvivo.com",
        what_growth_ai_gets="Visitors, Join Free clicks, pricing views, campaign page visits, scan starts, scan completions.",
        first_action="Track every campaign page and Join Free submission with campaign/source tags.",
        compliance_note="Owned first-party data. Use consent and privacy-policy disclosures.",
    ),
    GrowthDataSource(
        name="Google Search Console",
        category="owned_analytics",
        source_url="https://search.google.com/search-console",
        what_growth_ai_gets="Search queries, pages getting impressions, click-through rate, ranking opportunities.",
        first_action="Connect creditvivo.com and export top credit-error questions weekly.",
        compliance_note="Use only aggregate search data, not private consumer identities.",
    ),
    GrowthDataSource(
        name="Google Analytics 4",
        category="owned_analytics",
        source_url="https://analytics.google.com",
        what_growth_ai_gets="Traffic source, campaign conversion, lead form conversion, page drop-off.",
        first_action="Connect GA4 events for join_clicked, lead_created, scan_started, scan_completed, paid_upgrade.",
        compliance_note="Avoid storing raw sensitive credit details in analytics tools.",
    ),
    GrowthDataSource(
        name="Vercel deployment and web performance",
        category="site_health",
        source_url="https://vercel.com",
        what_growth_ai_gets="Deploy status, site availability, frontend errors, performance signals.",
        first_action="Connect deploy alerts into Operator AI and Growth AI.",
        compliance_note="Operational data only; do not log customer report contents.",
    ),
    GrowthDataSource(
        name="Render scanner API health",
        category="scanner_health",
        source_url="https://render.com",
        what_growth_ai_gets="Scanner backend uptime, health checks, failed deploys, API availability.",
        first_action="Add the Render service URL to the founder dashboard once confirmed.",
        compliance_note="Operational data only; do not expose raw reports in logs.",
    ),
    GrowthDataSource(
        name="HUD approved housing counseling agencies",
        category="public_partner_directory",
        source_url="https://apps.hud.gov/offices/hsg/sfh/hcc/hcs_print.cfm?searchstate=va&weblistaction=search",
        what_growth_ai_gets="Public organizations serving renters, homebuyers, budgeting, credit, and housing counseling.",
        first_action="Build referral-partner outreach for housing counselors and homebuyer education providers.",
        compliance_note="Public business/agency contacts only. Do not scrape private consumer clients.",
    ),
    GrowthDataSource(
        name="211 Virginia housing and finance programs",
        category="public_partner_directory",
        source_url="https://search.211virginia.org/search?query=BH-3700.3200&query_label=HUD+Approved+Counseling+Agencies&query_type=taxonomy",
        what_growth_ai_gets="Community agencies that already help people with rental, housing, credit, and budgeting needs.",
        first_action="Find agency partnership opportunities and education/referral paths.",
        compliance_note="Use organization-level outreach only.",
    ),
    GrowthDataSource(
        name="Virginia Automobile Dealers Association",
        category="public_partner_source",
        source_url="https://vada.com/about/contact-us/",
        what_growth_ai_gets="Dealer association channel for consumers delayed or denied for auto financing.",
        first_action="Pitch Credit Vivo as a no-hard-pull credit check-in resource for dealer customers.",
        compliance_note="Contact association/business contacts, not dealership customers directly.",
    ),
    GrowthDataSource(
        name="Virginia Mortgage Bankers Association",
        category="public_partner_source",
        source_url="https://www.vabankers.org/post/virginia-mortgage-bankers-association",
        what_growth_ai_gets="Mortgage partner channel for applicants who need credit readiness before approval.",
        first_action="Pitch Credit Vivo as a pre-application credit report review resource.",
        compliance_note="Partner outreach only; no direct targeting of declined applicants without opt-in.",
    ),
    GrowthDataSource(
        name="U.S. Trustee approved credit counseling agencies",
        category="public_partner_directory",
        source_url="https://www.justice.gov/ust/list-credit-counseling-agencies-approved-pursuant-11-usc-111",
        what_growth_ai_gets="Approved nonprofit credit counseling organizations by state/district.",
        first_action="Identify compliant education/referral relationships.",
        compliance_note="Use public organization listings; avoid implying government endorsement.",
    ),
    GrowthDataSource(
        name="NFCC nonprofit credit counseling network",
        category="public_partner_directory",
        source_url="https://www.nfcc.org/",
        what_growth_ai_gets="National nonprofit counseling network and consumer education patterns.",
        first_action="Study partner-fit and content topics around debt, counseling, and credit education.",
        compliance_note="Do not copy content; use as market context and partner research.",
    ),
    GrowthDataSource(
        name="FCAA financial counseling association",
        category="public_partner_directory",
        source_url="https://fcaa.org/",
        what_growth_ai_gets="Financial counseling association and member ecosystem.",
        first_action="Research partner categories and possible education alliances.",
        compliance_note="Public organization research only.",
    ),
]


PUBLIC_PARTNER_LEADS: List[PublicPartnerLead] = [
    PublicPartnerLead(
        name="Virginia Automobile Dealers Association",
        partner_type="Auto dealer association",
        geography="Virginia",
        public_contact="TeamVADA@vada.com",
        source_url="https://vada.com/about/contact-us/",
        fit_reason="Dealer customers may be denied, delayed, or quoted high APRs because of credit report issues.",
        recommended_campaign="/auto-loan-denial",
    ),
    PublicPartnerLead(
        name="Virginia Independent Automobile Dealers Association",
        partner_type="Independent auto dealer association",
        geography="Virginia",
        public_contact="dmv@viada.org",
        source_url="https://viada.org/",
        fit_reason="Independent dealers often serve buyers who may need credit readiness before financing.",
        recommended_campaign="/auto-loan-denial",
    ),
    PublicPartnerLead(
        name="Virginia Mortgage Bankers Association",
        partner_type="Mortgage association",
        geography="Virginia",
        public_contact="info@virginiamba.org",
        source_url="https://www.vabankers.org/post/virginia-mortgage-bankers-association",
        fit_reason="Mortgage applicants may need report review before qualification or underwriting.",
        recommended_campaign="/mortgage-readiness",
    ),
    PublicPartnerLead(
        name="Prince William County Housing Counseling",
        partner_type="Housing counseling agency",
        geography="Virginia",
        public_contact="housingcounseling@pwcgov.org",
        source_url="https://www.pwcva.gov/department/virginia-cooperative-extension/housing-support",
        fit_reason="Housing counseling clients may need credit report education before renting or buying.",
        recommended_campaign="/apartment-denial",
    ),
    PublicPartnerLead(
        name="People Incorporated of Virginia",
        partner_type="HUD approved housing counseling agency",
        geography="Virginia",
        public_contact="info@peopleinc.net",
        source_url="https://apps.hud.gov/offices/hsg/sfh/hcc/hcs_print.cfm?searchstate=va&weblistaction=search",
        fit_reason="Offers financial management and housing counseling, making it a natural education/referral partner.",
        recommended_campaign="/mortgage-readiness",
    ),
    PublicPartnerLead(
        name="Telamon Corporation - Danville Branch",
        partner_type="HUD approved housing counseling agency",
        geography="Virginia",
        public_contact="housing@telamon.org",
        source_url="https://apps.hud.gov/offices/hsg/sfh/hcc/hcs_print.cfm?searchstate=va&weblistaction=search",
        fit_reason="Provides financial, budgeting, credit, and homebuyer education services.",
        recommended_campaign="/mortgage-readiness",
    ),
    PublicPartnerLead(
        name="Appalachian Community Action & Development Agency",
        partner_type="HUD approved housing counseling agency",
        geography="Virginia",
        public_contact="rrobinette@appcaa.org",
        source_url="https://apps.hud.gov/offices/hsg/sfh/hcc/hcs_print.cfm?searchstate=va&weblistaction=search",
        fit_reason="Works with mortgage default, prepurchase counseling, and housing readiness.",
        recommended_campaign="/mortgage-readiness",
    ),
    PublicPartnerLead(
        name="Mortgage Bankers Association",
        partner_type="National mortgage association",
        geography="United States",
        public_contact="contact form / main office",
        source_url="https://www.mba.org/contact-us",
        fit_reason="National mortgage ecosystem can surface credit readiness partnership opportunities.",
        recommended_campaign="/mortgage-readiness",
    ),
    PublicPartnerLead(
        name="National Foundation for Credit Counseling",
        partner_type="Credit counseling network",
        geography="United States",
        public_contact="public contact channels",
        source_url="https://www.nfcc.org/",
        fit_reason="National counseling network shows high-fit education and referral ecosystem.",
        recommended_campaign="/collection-not-mine",
    ),
    PublicPartnerLead(
        name="Financial Counseling Association of America",
        partner_type="Financial counseling association",
        geography="United States",
        public_contact="public contact channels",
        source_url="https://fcaa.org/",
        fit_reason="Association ecosystem overlaps with budgeting, debt, credit education, and consumer support.",
        recommended_campaign="/collection-not-mine",
    ),
]


def data_source_to_dict(source: GrowthDataSource) -> Dict[str, str]:
    return source.__dict__


def partner_lead_to_dict(lead: PublicPartnerLead) -> Dict[str, str]:
    return lead.__dict__


def build_growth_source_brief() -> Dict[str, object]:
    campaign_counts: Dict[str, int] = {}
    for lead in PUBLIC_PARTNER_LEADS:
        campaign_counts[lead.recommended_campaign] = campaign_counts.get(lead.recommended_campaign, 0) + 1

    return {
        "ok": True,
        "service": "credit-vivo-growth-ai-sources",
        "guardrail": "Use public business/referral sources and opt-in customer channels. Do not scrape or email private consumers about credit hardship without consent.",
        "data_sources": [data_source_to_dict(source) for source in GROWTH_DATA_SOURCES],
        "public_partner_leads": [partner_lead_to_dict(lead) for lead in PUBLIC_PARTNER_LEADS],
        "counts": {
            "data_sources": len(GROWTH_DATA_SOURCES),
            "public_partner_leads": len(PUBLIC_PARTNER_LEADS),
            "recommended_campaigns": campaign_counts,
        },
        "next_growth_ai_actions": [
            "Connect GA4/Search Console and first-party website events.",
            "Create referral links for /auto-loan-denial, /mortgage-readiness, /apartment-denial, and /collection-not-mine.",
            "Draft partner outreach for the Virginia list and wait for owner approval before sending.",
            "Track every partner reply, referral click, join, scan start, scan completion, and paid upgrade.",
            "Review weekly which channel brings the highest-quality completed scans.",
        ],
    }
