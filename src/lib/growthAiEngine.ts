export type LeadSignal = {
  name: string;
  scoreImpact: number;
  reason: string;
};

export type GrowthPlay = {
  title: string;
  audience: string;
  offer: string;
  channel: string;
  expectedSignal: string;
};

export type GrowthRule = {
  trigger: string;
  insight: string;
  recommendedAction: string;
};

export type LeadSourceDirective = {
  source: string;
  allowed: boolean;
  instruction: string;
};

export type GrowthThinkingDirective = {
  principle: string;
  behavior: string;
};

export type PotentialCustomerSegment = {
  segment: string;
  problem: string;
  whyCreditVivoFits: string;
  whereToFind: string;
  campaignPath: string;
  priority: 'high' | 'medium';
};

export type RevenueMathInput = {
  monthlyRevenueGoal: number;
  averageRevenuePerPaidCustomer: number;
  freeToPaidConversionRate: number;
};

export function calculateGrowthMath({
  monthlyRevenueGoal,
  averageRevenuePerPaidCustomer,
  freeToPaidConversionRate,
}: RevenueMathInput) {
  const paidCustomersNeeded = Math.ceil(monthlyRevenueGoal / averageRevenuePerPaidCustomer);
  const freeUsersNeeded = Math.ceil(paidCustomersNeeded / freeToPaidConversionRate);

  return {
    paidCustomersNeeded,
    freeUsersNeeded,
    monthlyRevenueGoal,
    averageRevenuePerPaidCustomer,
    freeToPaidConversionRate,
  };
}

export const leadScoringSignals: LeadSignal[] = [
  {
    name: 'Denied for credit, auto, mortgage, or apartment',
    scoreImpact: 30,
    reason: 'This person has a clear pain point and may need help quickly.',
  },
  {
    name: 'Uploaded or started a credit report scan',
    scoreImpact: 25,
    reason: 'They took action, so they are more serious than a casual visitor.',
  },
  {
    name: 'Viewed pricing or attorney-access content',
    scoreImpact: 20,
    reason: 'They are comparing paid help or escalation options.',
  },
  {
    name: 'Read credit error or dispute learning content',
    scoreImpact: 15,
    reason: 'They are researching a problem Credit Vivo can help explain.',
  },
  {
    name: 'Came from a trusted referral partner',
    scoreImpact: 15,
    reason: 'Partner trust can increase conversion.',
  },
];

export const growthPlays: GrowthPlay[] = [
  {
    title: 'Denied for a car loan',
    audience: 'People who were denied or quoted a bad auto-loan rate.',
    offer: 'Free Credit Check-In before they apply again.',
    channel: 'Search content, short videos, auto-dealer referrals.',
    expectedSignal: 'Free scans started from auto-loan pages.',
  },
  {
    title: 'Preparing for a mortgage',
    audience: 'People trying to qualify for a home loan in the next 3-12 months.',
    offer: 'Plain-English scan for report errors before lender review.',
    channel: 'Realtor, mortgage broker, and learning-center referrals.',
    expectedSignal: 'Mortgage-readiness visitors becoming free scan users.',
  },
  {
    title: 'Denied for an apartment',
    audience: 'People rejected by a landlord or worried about rental screening.',
    offer: 'Free AI Credit Check-In before the next rental application.',
    channel: 'Apartment denial page, renter education, local housing partners.',
    expectedSignal: 'Free scans started from apartment-denial pages.',
  },
  {
    title: 'Collection or late-payment confusion',
    audience: 'People who see accounts they do not understand.',
    offer: 'AI explanation of possible report errors and next steps.',
    channel: 'Google search articles and retargeting.',
    expectedSignal: 'High engagement on collection, late-payment, and dispute pages.',
  },
  {
    title: 'Unfinished free scan',
    audience: 'Visitors who started but did not finish the Credit Check-In.',
    offer: 'Simple reminder to complete the free review.',
    channel: 'Email, SMS, and dashboard reminders after consent.',
    expectedSignal: 'Recovery rate from abandoned scans.',
  },
];

export const growthRules: GrowthRule[] = [
  {
    trigger: 'High traffic, low free-scan starts',
    insight: 'The offer may not be clear enough or the join path may have friction.',
    recommendedAction: 'Test a clearer free Check-In call-to-action and simplify the first step.',
  },
  {
    trigger: 'Many free scans, low paid upgrades',
    insight: 'Customers may not understand why paid help matters after findings.',
    recommendedAction: 'Add plain-English next-step explanations after scan results.',
  },
  {
    trigger: 'Paid ads get clicks but few scans',
    insight: 'The ad promise may not match the landing page.',
    recommendedAction: 'Pause weak ads and test one pain-point page per audience.',
  },
  {
    trigger: 'Referral traffic converts better than ads',
    insight: 'Trust-based partners may be a stronger early growth channel.',
    recommendedAction: 'Prioritize partner outreach before scaling paid spend.',
  },
  {
    trigger: 'Cancellations rise before first visible progress',
    insight: 'Customers need proof that Credit Vivo is working for them.',
    recommendedAction: 'Send progress updates and show next steps immediately after scan.',
  },
];

export const leadSourceDirectives: LeadSourceDirective[] = [
  {
    source: 'Opt-in campaign pages',
    allowed: true,
    instruction: 'Send traffic to Credit Vivo pages and capture name, email, goal, campaign, and consent before follow-up.',
  },
  {
    source: 'Search ads and SEO',
    allowed: true,
    instruction: 'Target high-intent searches like denied car loan, collection not mine, mortgage credit review, and apartment denial.',
  },
  {
    source: 'Public referral partner outreach',
    allowed: true,
    instruction: 'Build lists of public business contacts such as realtors, auto dealers, mortgage brokers, tax preparers, and apartment locators.',
  },
  {
    source: 'Customer referrals',
    allowed: true,
    instruction: 'Ask satisfied opt-in customers to refer friends using a clear referral link and disclosure.',
  },
  {
    source: 'Private consumer credit-problem lists',
    allowed: false,
    instruction: 'Do not buy, scrape, or email people based on sensitive credit problems unless they clearly opted in and consented.',
  },
];

export const growthThinkingDirectives: GrowthThinkingDirective[] = [
  {
    principle: 'Mission first',
    behavior: 'Work every day to bring qualified, opt-in customers to Credit Vivo and move them toward free scans, paid upgrades, and retention.',
  },
  {
    principle: 'Numbers over guesses',
    behavior: 'Use visitors, leads, scan starts, scan completions, paid upgrades, churn, ad spend, and partner source before recommending a move.',
  },
  {
    principle: 'Tool-using operator',
    behavior: 'Use campaign pages, event tracking, lead capture, partner lists, scanner data, payment data, and founder briefs as tools.',
  },
  {
    principle: 'Verify the result',
    behavior: 'After every campaign or outreach push, check whether leads, scans, paid upgrades, and cost per customer improved.',
  },
  {
    principle: 'Find the bottleneck',
    behavior: 'If growth is weak, identify whether the issue is traffic, message, join rate, scanner completion, upgrade conversion, or churn.',
  },
  {
    principle: 'Protect trust',
    behavior: 'Use opt-in consumer leads and public partner outreach. Do not scrape private consumer credit-problem contacts or use sensitive data without consent.',
  },
  {
    principle: 'Approval-aware',
    behavior: 'Draft ads, emails, partner outreach, and customer follow-ups, but require founder approval before sending or spending money.',
  },
  {
    principle: 'Compile, notify, execute',
    behavior: 'Compile the best partner/contact list, notify the owner with the plan, then execute only approved outreach actions.',
  },
];

export const potentialCustomerSegments: PotentialCustomerSegment[] = [
  {
    segment: 'Auto loan denied or high-rate shoppers',
    problem: 'Denied for financing, quoted a high APR, or told credit is the issue.',
    whyCreditVivoFits: 'Free AI Credit Check-In can help them understand possible report issues before applying again.',
    whereToFind: 'Google searches, auto dealer referrals, used-car dealers, finance managers, short videos about auto denial.',
    campaignPath: '/auto-loan-denial',
    priority: 'high',
  },
  {
    segment: 'Mortgage-ready homebuyers',
    problem: 'Trying to qualify for a home loan but worried collections, late payments, or balances may block approval.',
    whyCreditVivoFits: 'Credit Vivo can help them review possible report issues early and organize next steps.',
    whereToFind: 'Realtors, mortgage brokers, first-time buyer groups, housing counselors, mortgage readiness content.',
    campaignPath: '/mortgage-readiness',
    priority: 'high',
  },
  {
    segment: 'Renters denied for apartments',
    problem: 'Rejected by rental screening or worried old collections/accounts may affect approval.',
    whyCreditVivoFits: 'Credit Vivo can help renters understand what may be on the report before the next application.',
    whereToFind: 'Apartment locators, rental groups, renter forums, Google searches, housing nonprofits.',
    campaignPath: '/apartment-denial',
    priority: 'high',
  },
  {
    segment: 'Consumers with collections they do not recognize',
    problem: 'Collection account appears unfamiliar, duplicated, wrong balance, or wrong dates.',
    whyCreditVivoFits: 'Scanner can flag possible collection-reporting issues and explain them in plain English.',
    whereToFind: 'SEO content, credit forums for topic research, debt collection search ads, educational videos.',
    campaignPath: '/collection-not-mine',
    priority: 'high',
  },
  {
    segment: 'Credit card applicants denied or stuck with low limits',
    problem: 'Denied for a card, offered secured-only options, or confused by adverse action reason codes.',
    whyCreditVivoFits: 'Credit Vivo can help them check report factors and possible errors before reapplying.',
    whereToFind: 'Credit card education content, secured card searches, adverse action letter searches.',
    campaignPath: '/join?campaign=credit-card-denial',
    priority: 'medium',
  },
  {
    segment: 'Identity mix-up or wrong personal information consumers',
    problem: 'Wrong address, name variation, mixed file, unfamiliar account, or possible identity confusion.',
    whyCreditVivoFits: 'Credit Vivo can start with data hygiene and plain-English report review.',
    whereToFind: 'Identity theft/mixed file searches, CFPB complaint topic research, credit report error content.',
    campaignPath: '/join?campaign=identity-mixup',
    priority: 'medium',
  },
  {
    segment: 'Debt payoff and rebuilding consumers',
    problem: 'Trying to rebuild credit after collections, charge-offs, or high balances.',
    whyCreditVivoFits: 'Credit Vivo can separate possible report errors from education and next-step planning.',
    whereToFind: 'Credit education content, community partners, credit unions, financial coaches, tax preparers.',
    campaignPath: '/join?campaign=credit-rebuild',
    priority: 'medium',
  },
  {
    segment: 'Small business starters needing personal credit readiness',
    problem: 'Need stronger personal credit before business credit, lease, auto, or funding application.',
    whyCreditVivoFits: 'Credit Vivo can help them understand personal report issues before applying for financing.',
    whereToFind: 'Small business groups, chambers of commerce, tax preparers, business funding content.',
    campaignPath: '/join?campaign=business-credit-readiness',
    priority: 'medium',
  },
];

export const defaultMillionDollarMath = calculateGrowthMath({
  monthlyRevenueGoal: 1000000,
  averageRevenuePerPaidCustomer: 45,
  freeToPaidConversionRate: 0.08,
});
