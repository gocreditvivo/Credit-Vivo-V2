const state = {
  page: "dashboard",
  bureau: "Experian",
  findingFilter: "all",
  selectedAccount: "jefferson",
  selectedPlan: "advanced",
  chatOpen: false,
  chatMessages: [
    {
      sender: "bot",
      text: "Hi, I am Vivo Assistant. I can help you find updates, upload documents, understand your dispute status, or learn what happens next.",
    },
  ],
  uploads: [
    { bureau: "Equifax", file: "sample-equifax-report.pdf", status: "Scanned", progress: 100 },
    { bureau: "Experian", file: "sample-experian-report.pdf", status: "Ready for review", progress: 88 },
    { bureau: "TransUnion", file: "sample-transunion-report.pdf", status: "Ready for review", progress: 92 },
  ],
};

const accounts = [
  {
    id: "jefferson",
    name: "Sample Collection Agency / Original Creditor",
    type: "Collection",
    amount: "$1,801",
    severity: "critical",
    bureaus: ["Equifax", "Experian", "TransUnion"],
    issue: "Possible duplicate balance with the original creditor.",
    recommendation: "Request ownership proof, chain of title, original creditor records, and delete or correct any duplicate active balance.",
    fields: [
      ["Account/Furnisher", "Sample Collection Agency", "Sample Collection Agency", "Sample Collection Agency"],
      ["Account Type", "Debt buyer account", "Collection", "Collection"],
      ["Balance", "$1,801", "$1,801", "$1,801"],
      ["Original Creditor", "Sample Original Creditor", "Sample Original Creditor", "Sample Original Creditor"],
      ["Status", "Collection", "Collection", "Collection"],
      ["Date of First Delinquency", "Needs verification", "Needs verification", "Needs verification"],
    ],
  },
  {
    id: "lvnv",
    name: "Sample Debt Buyer / Bank Card",
    type: "Collection",
    amount: "$628",
    severity: "high",
    bureaus: ["Equifax", "Experian", "TransUnion"],
    issue: "Debt buyer reporting needs chain-of-title validation.",
    recommendation: "Validate assignment, servicing authority, original creditor, and itemization.",
    fields: [
      ["Account/Furnisher", "Sample Debt Buyer", "Sample Debt Buyer", "Sample Debt Buyer"],
      ["Account Type", "Debt buyer account", "Collection", "Collection"],
      ["Balance", "$628", "$628", "$628"],
      ["Original Creditor", "Sample Bank Card", "Sample Bank Card", "Sample Bank Card"],
      ["Status", "Collection", "Collection", "Collection"],
      ["Date Opened/Assigned", "Needs source record", "Needs source record", "Needs source record"],
    ],
  },
  {
    id: "midland-synchrony",
    name: "Sample Collection Company / Retail Card",
    type: "Collection",
    amount: "$4,454",
    severity: "high",
    bureaus: ["Equifax", "Experian", "TransUnion"],
    issue: "Balance and ownership need verification.",
    recommendation: "Request purchase agreement, itemization, original balance, and state collection authority proof.",
    fields: [
      ["Account/Furnisher", "Sample Collection Company", "Sample Collection Company", "Sample Collection Company"],
      ["Account Type", "Debt buyer account", "Collection", "Collection"],
      ["Balance", "$4,454", "$4,454", "$4,454"],
      ["Original Creditor", "Sample Retail Bank", "Sample Retail Bank", "Sample Retail Bank"],
      ["Status", "Collection", "Collection", "Collection"],
      ["Past Due", "$4,454", "Needs verification", "Needs verification"],
    ],
  },
  {
    id: "credit-one",
    name: "Sample Credit Card Bank",
    type: "Late payment",
    amount: "$488",
    severity: "medium",
    bureaus: ["Equifax", "Experian", "TransUnion"],
    issue: "One reported late payment needs proof before dispute.",
    recommendation: "Treat as credit-boost/utilization item unless payment records show the late is wrong.",
    fields: [
      ["Account/Furnisher", "Sample Credit Card Bank", "Sample Credit Card Bank", "Sample Credit Card Bank"],
      ["Account Type", "Credit card", "Credit card", "Credit card"],
      ["Balance", "$488", "$488", "$488"],
      ["Credit Limit", "$500", "$500", "$500"],
      ["Payment Status", "Pays as agreed", "One 30-day late history", "One 30-day late history"],
      ["Recommended Action", "Paydown review", "Verify late", "Verify late"],
    ],
  },
  {
    id: "fidelity",
    name: "Sample Mortgage Servicer",
    type: "Mortgage",
    amount: "$0",
    severity: "high",
    bureaus: ["Equifax"],
    issue: "Company status and exact furnisher identity need verification.",
    recommendation: "Verify legal name, NMLS/company history, successor servicer, transfer records, and historical late reporting.",
    fields: [
      ["Account/Furnisher", "Sample Mortgage Servicer", "", ""],
      ["Account Type", "Conventional real estate mortgage", "", ""],
      ["Balance", "$0", "", ""],
      ["Status", "Closed/sold", "", ""],
      ["Entity Status", "Needs successor check", "", ""],
      ["Recommended Action", "NMLS/entity verification", "", ""],
    ],
  },
];

const findings = [
  {
    category: "collections",
    accountId: "jefferson",
    title: "Possible duplicate collection balance",
    severity: "critical",
    bureaus: "EQ, EX, TU",
    text: "A sample collection agency and sample original creditor appear tied to the same debt. Ownership and active-balance reporting should be verified.",
  },
  {
    category: "collections",
    accountId: "lvnv",
    title: "Debt buyer ownership needs validation",
    severity: "high",
    bureaus: "EQ, EX, TU",
    text: "The sample debt buyer should prove ownership, assignment, original creditor, and itemized balance.",
  },
  {
    category: "collections",
    accountId: "midland-synchrony",
    title: "Collection balance/itemization review",
    severity: "high",
    bureaus: "EQ, EX, TU",
    text: "The sample retail-card collection needs separate source records and itemization.",
  },
  {
    category: "chargeoffs",
    accountId: "jefferson",
    title: "Original creditor charge-off relationship",
    severity: "high",
    bureaus: "EQ, EX, TU",
    text: "The original creditor and collection agency should not both report an active balance if the debt was sold or transferred.",
  },
  {
    category: "late",
    accountId: "credit-one",
    title: "Credit card late-payment proof",
    severity: "medium",
    bureaus: "EX, TU",
    text: "Dispute only if payment records contradict the reported 30-day late.",
  },
  {
    category: "identity",
    accountId: "fidelity",
    title: "Furnisher name/entity mismatch",
    severity: "high",
    bureaus: "EQ",
    text: "A sample mortgage servicer appears with a possible name mismatch and inactive/successor concern.",
  },
  {
    category: "differences",
    accountId: "fidelity",
    title: "Bureau-only mortgage difference",
    severity: "medium",
    bureaus: "EQ",
    text: "The mortgage appears only on Equifax in the sample data and should be compared against source records.",
  },
];

const vault = [
  {
    title: "Credit reports",
    count: 3,
    docs: [
      ["Equifax report", "Uploaded"],
      ["Experian report", "Uploaded"],
      ["TransUnion report", "Uploaded"],
    ],
  },
  {
    title: "IDs",
    count: 1,
    docs: [
      ["Driver license", "Verified"],
      ["SSN proof", "Needed"],
    ],
  },
  {
    title: "Utility bills",
    count: 1,
    docs: [
      ["Proof of address", "Uploaded"],
      ["Alternate address proof", "Optional"],
    ],
  },
  {
    title: "Dispute letters",
    count: 5,
    docs: [
      ["Equifax bureau dispute", "Draft"],
      ["Collection validation", "Draft"],
      ["Debt buyer validation", "Draft"],
    ],
  },
  {
    title: "Responses",
    count: 2,
    docs: [
      ["Equifax response", "Pending"],
      ["Furnisher response", "Pending"],
    ],
  },
];

const disputes = {
  "Draft disputes": [
    ["Sample Collection Agency", "Ownership and duplicate balance review"],
    ["Sample Debt Buyer", "Chain of title and itemization"],
  ],
  "Sent disputes": [
    ["Equifax", "Bureau reinvestigation requested"],
    ["Experian", "Bureau reinvestigation requested"],
  ],
  "Pending responses": [
    ["TransUnion", "Expected response window open"],
    ["Sample Collection Company", "Waiting for validation"],
  ],
  "Closed disputes": [
    ["Sample Credit Card Bank", "Monitoring only"],
  ],
};

const plans = [
  {
    id: "free",
    name: "Free Credit Snapshot",
    price: "$0",
    cadence: "free account",
    label: "Start free",
    description: "Free portal account with education, upload intake, document vault, and plain-language credit snapshot.",
    includes: ["Upload reports", "Learning center", "Document vault", "Portal updates"],
    internal: "No disputes, no forensic scanner, and no credit repair fee on the free account.",
  },
  {
    id: "starter",
    name: "Vivo Starter",
    price: "$29",
    cadence: "monthly after eligible work",
    label: "Low cost",
    description: "Affordable guided review for customers who want education, monitoring, and a clear action plan.",
    includes: ["Credit action plan", "Basic findings", "Document reminders", "Portal support"],
    internal: "Starter keeps customer view simple and does not show forensic scanner output.",
  },
  {
    id: "plus",
    name: "Vivo Plus",
    price: "$59",
    cadence: "monthly after eligible work",
    label: "Best value",
    description: "Lower-cost dispute support with customer-friendly findings, dispute drafts, tracking, and response management.",
    includes: ["Dispute drafts", "Bureau and furnisher tracking", "Response reminders", "Email/SMS portal alerts"],
    internal: "Backend scanner may rank issues, but customer sees plain-language findings.",
  },
  {
    id: "advanced",
    name: "Vivo Advanced + Attorney Backup",
    price: "$99",
    cadence: "monthly after eligible work",
    label: "Top tier",
    description: "Premium review priced below common attorney-backed competitors, with internal forensic review and attorney escalation route.",
    includes: ["Internal forensic review", "License/entity checks", "Escalation packet", "Attorney backup route"],
    internal: "Forensic scanner and raw Metro 2/FCRA logic remain backend-only.",
  },
];

const disclosureItems = [
  {
    key: "croa_rights",
    title: "CROA Consumer Credit File Rights",
    requiredBefore: "Payment and dispute service",
    status: "Required",
    text: "Customers can dispute inaccurate information directly with credit bureaus and furnishers for free. Accurate, current, and verifiable information cannot legally be removed just because it is negative.",
    link: "./disclosures.html",
  },
  {
    key: "three_day_cancel",
    title: "3-Business-Day Cancellation",
    requiredBefore: "Contract and payment",
    status: "Required",
    text: "If CROA applies, customers can cancel without penalty within three business days after signing the service agreement.",
    link: "./disclosures.html",
  },
  {
    key: "fcra_summary",
    title: "FCRA Summary of Rights",
    requiredBefore: "Credit report pull and disputes",
    status: "Required",
    text: "Customers have rights to dispute incomplete or inaccurate report information, submit supporting documents, and receive investigation results.",
    link: "./disclosures.html",
  },
  {
    key: "credit_pull_auth",
    title: "Credit Pull Authorization",
    requiredBefore: "Credit report access",
    status: "Required",
    text: "Customer authorizes Credit Vivo and its provider to access credit-report data for the requested credit analysis and dispute-support services.",
    link: "./terms.html",
  },
  {
    key: "dispute_auth",
    title: "Dispute Authorization",
    requiredBefore: "Bureau and furnisher disputes",
    status: "Required",
    text: "Customer authorizes Credit Vivo to prepare and submit customer-approved disputes to bureaus, furnishers, and complaint portals.",
    link: "./disclosures.html",
  },
  {
    key: "privacy_glba",
    title: "Privacy + GLBA Notice",
    requiredBefore: "Account creation and upload",
    status: "Required",
    text: "Explains collection, use, sharing, security, and privacy choices for sensitive identity, financial, and credit-report information.",
    link: "./privacy.html",
  },
  {
    key: "no_guarantee",
    title: "No Guarantee / Results Vary",
    requiredBefore: "Marketing and checkout",
    status: "Required",
    text: "Credit Vivo does not guarantee score increases, credit approvals, removals, or deletion of accurate information.",
    link: "./disclosures.html",
  },
  {
    key: "attorney_escalation",
    title: "Attorney Escalation Disclosure",
    requiredBefore: "Advanced plan",
    status: "Top tier",
    text: "Attorney backup is not automatic legal representation and must follow separate attorney-service terms where required.",
    link: "./disclosures.html",
  },
  {
    key: "sms_email",
    title: "SMS / Email Consent and Opt-Out",
    requiredBefore: "Automated reminders",
    status: "Required",
    text: "Customers must consent to service messages and review requests, and must have a clear route to opt out.",
    link: "./privacy.html",
  },
  {
    key: "google_reviews",
    title: "Google Review Disclosure",
    requiredBefore: "Review automation",
    status: "Required",
    text: "Credit Vivo may ask for honest feedback, but does not offer incentives, ask for five-star reviews, gate reviews, or post reviews for customers.",
    link: "./disclosures.html",
  },
];

const learningModules = [
  {
    title: "Credit Reports",
    tag: "Start here",
    text: "A credit report is a record of accounts, balances, payment history, collections, public-record items, inquiries, names, addresses, and other identifying details.",
    action: "Check that the account belongs to you and that dates, balances, status, and ownership are accurate.",
  },
  {
    title: "Credit Scores",
    tag: "Basics",
    text: "Scores are calculated from credit-report data. Common score factors include payment history, balances compared with limits, age of accounts, new credit, and account mix.",
    action: "Focus first on accurate reporting, on-time payments, and lower revolving balances.",
  },
  {
    title: "Utilization",
    tag: "Credit boost",
    text: "Credit-card utilization compares card balances with credit limits. High utilization can hurt scores even when the account is paid on time.",
    action: "When possible, reduce balances and avoid maxed-out cards before statements report.",
  },
  {
    title: "Disputing Errors",
    tag: "FCRA",
    text: "You can dispute information that is incomplete, inaccurate, or unverifiable. Bureaus and furnishers need enough detail to investigate the specific item.",
    action: "Keep copies of reports, letters, proof of identity, proof of address, and any payment or settlement records.",
  },
  {
    title: "Collections",
    tag: "Review",
    text: "Collection accounts should be checked for correct ownership, original creditor, balance, dates, account status, and whether the same debt is being reported twice.",
    action: "Ask for validation and itemization when ownership, amount, or authority is unclear.",
  },
  {
    title: "Charge-Offs",
    tag: "Review",
    text: "A charge-off does not always mean the debt disappeared. Reporting should still be accurate about balance, transfer, sale, dates, and payment history.",
    action: "Compare original creditor reporting with any collection or debt-buyer reporting tied to the same debt.",
  },
  {
    title: "Documents To Keep",
    tag: "Vault",
    text: "Strong disputes usually need clean records. Useful documents include ID, proof of address, credit reports, statements, payment proof, police reports, and bureau responses.",
    action: "Upload documents to the vault so each dispute has support before it is sent.",
  },
  {
    title: "Attorney Escalation",
    tag: "Top tier",
    text: "Attorney backup is for advanced escalation when the facts support it. It is not automatic legal representation and does not guarantee a result.",
    action: "Use escalation for serious accuracy, validation, identity, or reinvestigation concerns after review.",
  },
];

const faqItems = [
  {
    question: "What does Credit Vivo do?",
    answer: "Credit Vivo helps customers organize credit reports, identify possible reporting issues, prepare customer-approved disputes, store documents, and track responses.",
  },
  {
    question: "Can I dispute credit report errors myself?",
    answer: "Yes. You can dispute inaccurate or incomplete information directly with the credit bureaus and furnishers for free. Credit Vivo is an optional support service.",
  },
  {
    question: "Can Credit Vivo guarantee a score increase or removal?",
    answer: "No. Credit Vivo does not guarantee score increases, account removals, approvals, or deletion of accurate, current, and verifiable information.",
  },
  {
    question: "Will customers see the forensic scanner?",
    answer: "No. The scanner is an internal backend tool. Customers see plain-language findings, recommended next steps, document requests, and dispute status.",
  },
  {
    question: "Do you pull credit reports?",
    answer: "The MVP is prepared for a credit-report provider connection. Before any pull, the customer must complete identity verification, privacy consent, FCRA acknowledgment, and credit-pull authorization.",
  },
  {
    question: "Is the credit pull a hard inquiry?",
    answer: "Credit Vivo should connect to a soft-pull credit-report provider for this workflow. The final provider must confirm inquiry type before launch.",
  },
  {
    question: "When can Credit Vivo charge customers?",
    answer: "Payment timing depends on the service and applicable law. If CROA applies, covered credit repair fees should not be charged before the covered work is fully performed.",
  },
  {
    question: "How much does Credit Vivo cost?",
    answer: "The launch draft uses a free Credit Snapshot, Vivo Starter at $29/month, Vivo Plus at $59/month, and Vivo Advanced + Attorney Backup at $99/month after eligible work where required.",
  },
  {
    question: "Why is Credit Vivo priced lower than many competitors?",
    answer: "Credit Vivo keeps the portal simple, uses backend automation carefully, avoids showing raw scanner logs to customers, and offers a no-setup-fee launch structure while still keeping attorney escalation in the top tier.",
  },
  {
    question: "How long do disputes take?",
    answer: "Credit bureau investigations often take about 30 days, but timing can vary based on the dispute, documents, and applicable rules.",
  },
  {
    question: "What happens when responses arrive?",
    answer: "Customers can upload bureau or furnisher responses to the Document Vault. Credit Vivo then tracks the result and recommends the next customer-approved step.",
  },
  {
    question: "What is attorney escalation?",
    answer: "Attorney escalation is a top-tier route for issues that may need legal review. It is not automatic representation and must follow separate attorney-service terms.",
  },
  {
    question: "Can Credit Vivo file CFPB or state complaints?",
    answer: "Credit Vivo can help organize complaint packets where appropriate, but a complaint does not guarantee a correction, payment, deletion, or legal outcome.",
  },
  {
    question: "Can I opt out of messages or review requests?",
    answer: "Yes. Customers should be able to opt out of marketing or review-request messages. Review requests must ask for honest feedback only.",
  },
  {
    question: "Can Credit Vivo text or email me when there is an update?",
    answer: "Yes, if you consent. Text and email alerts should stay short and direct you to sign in to the portal for details. Sensitive account details should stay inside the portal.",
  },
];

const portalUpdates = [
  {
    title: "Equifax dispute packet sent",
    type: "Dispute",
    time: "Today, 10:42 AM",
    status: "Unread",
    tone: "good",
    text: "Your Equifax dispute packet was sent. The response window is now being tracked in your Dispute Center.",
  },
  {
    title: "Document needed",
    type: "Action needed",
    time: "Yesterday, 4:15 PM",
    status: "Unread",
    tone: "medium",
    text: "Please upload a current proof of address so Credit Vivo can keep your next dispute packet complete.",
  },
  {
    title: "TransUnion response received",
    type: "Response",
    time: "Jun 20, 2026",
    status: "Unread",
    tone: "good",
    text: "A bureau response was added to your Document Vault. Sign in to review the result and next recommended step.",
  },
  {
    title: "Advanced review queued",
    type: "Review",
    time: "Jun 19, 2026",
    status: "Read",
    tone: "",
    text: "Your top-tier review is queued for internal analysis. Customer-facing updates will stay simple and easy to understand.",
  },
];

const notificationPreferences = [
  {
    channel: "Portal",
    description: "Always on. Full updates, documents, and dispute details appear after secure login.",
    checked: true,
    locked: true,
  },
  {
    channel: "Email",
    description: "Send account notices, document reminders, dispute updates, and response alerts by email.",
    checked: true,
    locked: false,
  },
  {
    channel: "Text",
    description: "Send short SMS alerts when an update is ready. Customers can reply STOP to opt out.",
    checked: true,
    locked: false,
  },
  {
    channel: "Review requests",
    description: "Ask for honest feedback after eligible milestones. No incentives, no rating requests, no review gating.",
    checked: false,
    locked: false,
  },
];

const messageTemplates = [
  {
    channel: "Email",
    subject: "You have a Credit Vivo update",
    body: "Hi there, you have a new update in your Credit Vivo portal. Please sign in to review the details.",
  },
  {
    channel: "Text",
    subject: "SMS alert",
    body: "Credit Vivo: You have a new portal update. Sign in to review it. Reply STOP to opt out.",
  },
  {
    channel: "Portal",
    subject: "Full update",
    body: "Your dispute packet was sent, the response window is being tracked, and the next step will appear here when a response arrives.",
  },
];

const chatQuickReplies = [
  "What is my dispute status?",
  "How do I upload documents?",
  "Do I have updates?",
  "Explain my credit score",
  "Attorney escalation",
];

const pageTitles = {
  dashboard: "Dashboard",
  learning: "Learning",
  faq: "FAQs",
  updates: "Updates",
  upload: "Upload Reports",
  payment: "Plans & Payment",
  disclosures: "Disclosures",
  findings: "Findings",
  account: "Account Detail",
  vault: "Document Vault",
  disputes: "Dispute Center",
};

function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function severityBadge(severity) {
  const label = severity === "critical" ? "Very High" : severity[0].toUpperCase() + severity.slice(1);
  return `<span class="badge ${severity}"><span class="severity-dot ${severity === "medium" ? "amber" : "red"}"></span>${label}</span>`;
}

function setPage(page) {
  state.page = page;
  $all(".page").forEach((section) => section.classList.remove("active"));
  $(`#${page}-page`).classList.add("active");
  $all(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.page === page));
  $("#page-title").textContent = pageTitles[page];
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderDashboard() {
  $("#negative-list").innerHTML = accounts
    .slice(0, 4)
    .map((account) => `
      <article class="account-item">
        <div>
          <h3>${account.name}</h3>
          <div class="account-meta">
            ${severityBadge(account.severity)}
            <span class="badge">${account.type}</span>
            <span class="badge">${account.amount}</span>
            <span class="badge">${account.bureaus.join(", ")}</span>
          </div>
        </div>
        <button class="small-action" type="button" data-account="${account.id}">Review</button>
      </article>
    `)
    .join("");

  $("#issue-strip").innerHTML = [
    ["Collections", "Debt buyer authority and itemization need review."],
    ["Charge-offs", "Sold/transferred balances need clean reporting."],
    ["Late payments", "Only dispute when payment proof supports it."],
    ["Identity issues", "Names, account numbers, and ownership must match."],
    ["Bureau differences", "Each bureau should report consistent core facts."],
  ]
    .map(([title, text]) => `
      <article class="issue-card">
        <strong>${title}</strong>
        <p>${text}</p>
      </article>
    `)
    .join("");
}

function renderUploads() {
  $("#upload-status").innerHTML = state.uploads
    .map((item) => `
      <div class="status-row">
        <div>
          <strong>${item.bureau}: ${item.file}</strong>
          <span class="muted">${item.status}</span>
          <div class="progress" aria-label="${item.progress}% complete"><span style="width:${item.progress}%"></span></div>
        </div>
        <span class="badge ${item.progress === 100 ? "good" : "medium"}">${item.progress}%</span>
      </div>
    `)
    .join("");
}

function renderPlans() {
  $("#plan-grid").innerHTML = plans
    .map((plan) => `
      <article class="plan-card ${plan.id === state.selectedPlan ? "selected" : ""}">
        <div class="plan-topline">
          <span class="badge ${plan.id === "advanced" ? "critical" : plan.id === "plus" ? "good" : ""}">${plan.label}</span>
          <button class="small-action" type="button" data-plan="${plan.id}">${plan.id === state.selectedPlan ? "Selected" : "Select"}</button>
        </div>
        <h3>${plan.name}</h3>
        <p class="plan-price">${plan.price}<span>${plan.cadence}</span></p>
        <p class="muted">${plan.description}</p>
        <ul>
          ${plan.includes.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <div class="internal-note">
          <strong>Internal rule</strong>
          <p>${plan.internal}</p>
        </div>
        <button class="primary-button" type="button" data-page-link="disclosures">Continue to disclosures</button>
      </article>
    `)
    .join("");
}

function renderDisclosureList() {
  $("#disclosure-list").innerHTML = disclosureItems
    .map((item) => `
      <article class="disclosure-card">
        <div class="disclosure-title">
          <h3>${item.title}</h3>
          <span class="badge ${item.status === "Top tier" ? "medium" : "good"}">${item.status}</span>
        </div>
        <p>${item.text}</p>
        <div class="disclosure-actions">
          <span class="badge">Before: ${item.requiredBefore}</span>
          <a class="small-action" href="${item.link}">View</a>
        </div>
      </article>
    `)
    .join("");
}

function renderLearning() {
  $("#learning-grid").innerHTML = learningModules
    .map((module) => `
      <article class="learning-card">
        <div class="learning-card-head">
          <h3>${module.title}</h3>
          <span class="badge ${module.tag === "Top tier" ? "medium" : "good"}">${module.tag}</span>
        </div>
        <p>${module.text}</p>
        <div class="learning-action">
          <strong>Action</strong>
          <span>${module.action}</span>
        </div>
      </article>
    `)
    .join("");
}

function renderFaqs() {
  $("#faq-list").innerHTML = faqItems
    .map((item, index) => `
      <details class="faq-item" ${index < 2 ? "open" : ""}>
        <summary>
          <span>${item.question}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 15.4-6-6L7.4 8l4.6 4.6L16.6 8 18 9.4l-6 6Z" /></svg>
        </summary>
        <p>${item.answer}</p>
      </details>
    `)
    .join("");
}

function renderPortalUpdates() {
  $("#portal-updates-list").innerHTML = portalUpdates
    .map((update) => `
      <article class="portal-update-card ${update.status === "Unread" ? "unread" : ""}">
        <span class="update-icon ${update.tone}"></span>
        <div>
          <div class="update-title-row">
            <h3>${update.title}</h3>
            <span class="badge ${update.status === "Unread" ? "good" : ""}">${update.status}</span>
          </div>
          <p>${update.text}</p>
          <div class="account-meta">
            <span class="badge">${update.type}</span>
            <span class="badge">${update.time}</span>
          </div>
        </div>
      </article>
    `)
    .join("");
}

function renderNotificationPreferences() {
  $("#preference-grid").innerHTML = notificationPreferences
    .map((preference) => `
      <label class="preference-card">
        <input type="checkbox" ${preference.checked ? "checked" : ""} ${preference.locked ? "disabled" : ""} />
        <span>
          <strong>${preference.channel}</strong>
          <small>${preference.description}</small>
        </span>
      </label>
    `)
    .join("");

  $("#message-preview-grid").innerHTML = messageTemplates
    .map((template) => `
      <article class="message-preview">
        <span class="badge good">${template.channel}</span>
        <h3>${template.subject}</h3>
        <p>${template.body}</p>
      </article>
    `)
    .join("");
}

function getChatReply(message) {
  const text = message.toLowerCase();

  if (text.includes("upload") || text.includes("document") || text.includes("id") || text.includes("utility")) {
    return "Use Document Vault for IDs, proof of address, credit reports, dispute letters, and responses. For new credit reports, go to Upload Reports and choose the bureau before uploading the PDF.";
  }

  if (text.includes("dispute") || text.includes("sent") || text.includes("response") || text.includes("status")) {
    return "Your Dispute Center shows draft disputes, sent disputes, pending responses, and closed disputes. Full details stay inside the portal, and we can text or email you when a new portal update is ready if you consent.";
  }

  if (text.includes("update") || text.includes("email") || text.includes("text") || text.includes("sms")) {
    return "Portal updates are the source of truth. Email and text alerts are optional and should only say that an update is ready, without sensitive credit details.";
  }

  if (text.includes("score") || text.includes("boost") || text.includes("utilization") || text.includes("learn")) {
    return "The Learning Center explains credit reports, scores, utilization, disputes, collections, and documents. We can help you understand score factors, but we do not guarantee a score increase.";
  }

  if (text.includes("attorney") || text.includes("legal") || text.includes("lawyer")) {
    return "Attorney escalation is for top-tier review when the facts support it. It is not automatic legal representation, and any attorney work must follow separate attorney-service terms.";
  }

  if (text.includes("pay") || text.includes("payment") || text.includes("billing") || text.includes("plan")) {
    return "Plans & Payment shows the launch draft: Free Credit Snapshot, Vivo Starter at $29/month, Vivo Plus at $59/month, and Vivo Advanced + Attorney Backup at $99/month after eligible work where required. Before payment or credit pull, customers should review required terms, privacy, FCRA/CROA disclosures, and authorization language.";
  }

  if (text.includes("delete") || text.includes("remove") || text.includes("guarantee")) {
    return "Credit Vivo cannot guarantee removals, score increases, approvals, or deletion of accurate, current, and verifiable information. We help organize and dispute information that may be inaccurate, incomplete, or unverifiable.";
  }

  return "I can help with uploads, documents, disputes, portal updates, learning, plans, and attorney escalation. For private account details, use the secure portal sections rather than sharing sensitive information in chat.";
}

function renderChat() {
  const chatbot = $("#chatbot");
  if (!chatbot) return;

  chatbot.classList.toggle("open", state.chatOpen);
  $("#chat-messages").innerHTML = state.chatMessages
    .map((message) => `
      <article class="chat-message ${message.sender}">
        <span>${message.sender === "bot" ? "Vivo" : "You"}</span>
        <p>${escapeHtml(message.text)}</p>
      </article>
    `)
    .join("");

  $("#chat-quick-replies").innerHTML = chatQuickReplies
    .map((reply) => `<button class="chat-chip" type="button" data-chat-prompt="${escapeHtml(reply)}">${reply}</button>`)
    .join("");

  const messages = $("#chat-messages");
  messages.scrollTop = messages.scrollHeight;
}

function sendChatMessage(text) {
  const cleanText = text.trim();
  if (!cleanText) return;

  state.chatMessages.push({ sender: "user", text: cleanText });
  state.chatMessages.push({ sender: "bot", text: getChatReply(cleanText) });
  renderChat();
}

function renderFindings() {
  const visible = state.findingFilter === "all"
    ? findings
    : findings.filter((finding) => finding.category === state.findingFilter);

  $("#findings-list").innerHTML = visible
    .map((finding) => `
      <article class="finding-card">
        <div>
          <h3>${finding.title}</h3>
          <p>${finding.text}</p>
          <div class="finding-meta">
            ${severityBadge(finding.severity)}
            <span class="badge">${finding.bureaus}</span>
          </div>
        </div>
        <button class="small-action" type="button" data-account="${finding.accountId}">Open</button>
      </article>
    `)
    .join("");
}

function renderAccountSelect() {
  $("#account-select").innerHTML = accounts
    .map((account) => `<option value="${account.id}">${account.name}</option>`)
    .join("");
  $("#account-select").value = state.selectedAccount;
}

function renderAccountDetail() {
  const account = accounts.find((item) => item.id === state.selectedAccount) || accounts[0];
  $("#account-detail").innerHTML = `
    <div class="detail-summary">
      <aside class="summary-block">
        <p class="eyebrow">Selected account</p>
        <h3>${account.name}</h3>
        <dl>
          <div><dt>Type</dt><dd>${account.type}</dd></div>
          <div><dt>Amount</dt><dd>${account.amount}</dd></div>
          <div><dt>Bureaus</dt><dd>${account.bureaus.join(", ")}</dd></div>
          <div><dt>Risk</dt><dd>${account.severity === "critical" ? "Very High" : account.severity}</dd></div>
        </dl>
      </aside>
      <section class="customer-explanation">
        <p class="eyebrow">Customer explanation</p>
        <h3>${account.issue}</h3>
        <p>${account.recommendation}</p>
        <div class="account-meta">
          <span class="badge">${account.bureaus.length} bureau${account.bureaus.length > 1 ? "s" : ""}</span>
          <span class="badge ${account.severity === "medium" ? "medium" : "critical"}">${account.severity === "critical" ? "Priority" : "Review"}</span>
        </div>
      </section>
    </div>
    <div class="recommendation-grid">
      <section class="summary-block">
        <p class="eyebrow">What happens next</p>
        <h3>Credit Vivo prepares a clean dispute path.</h3>
        <p class="muted">Customers see plain-language findings, document requests, dispute status, and response tracking.</p>
      </section>
      <section class="summary-block">
        <p class="eyebrow">Advanced review</p>
        <h3>Forensic scanner is internal only.</h3>
        <p class="muted">Top-tier customers can receive the benefit of forensic review, but raw backend scanner logs and Metro 2 scoring are not displayed in the customer portal.</p>
      </section>
    </div>
  `;
}

function renderVault() {
  $("#vault-grid").innerHTML = vault
    .map((group) => `
      <article class="vault-card">
        <h3>${group.title}<span class="badge good">${group.count}</span></h3>
        <ul>
          ${group.docs.map(([name, status]) => `
            <li>
              <strong>${name}</strong>
              <div class="doc-meta"><span class="badge ${status === "Needed" ? "medium" : "good"}">${status}</span></div>
            </li>
          `).join("")}
        </ul>
      </article>
    `)
    .join("");
}

function renderDisputes() {
  $("#dispute-columns").innerHTML = Object.entries(disputes)
    .map(([title, items]) => `
      <section class="dispute-lane">
        <h3>${title}<span class="badge">${items.length}</span></h3>
        ${items.map(([name, text]) => `
          <article class="dispute-card">
            <strong>${name}</strong>
            <p>${text}</p>
          </article>
        `).join("")}
      </section>
    `)
    .join("");
}

function handleUpload(files) {
  Array.from(files).forEach((file) => {
    state.uploads.unshift({
      bureau: state.bureau,
      file: file.name,
      status: "Uploaded for demo review",
      progress: 64,
    });
  });
  renderUploads();
}

function bindEvents() {
  $all("[data-page]").forEach((button) => {
    button.addEventListener("click", () => setPage(button.dataset.page));
  });

  document.body.addEventListener("click", (event) => {
    const pageLink = event.target.closest("[data-page-link]");
    if (pageLink) {
      event.preventDefault();
      setPage(pageLink.dataset.pageLink);
      return;
    }

    const button = event.target.closest("[data-account]");
    if (!button) return;
    state.selectedAccount = button.dataset.account;
    renderAccountSelect();
    renderAccountDetail();
    setPage("account");
  });

  document.body.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-chat-toggle]");
    if (toggle) {
      state.chatOpen = !state.chatOpen;
      renderChat();
      return;
    }

    const close = event.target.closest("[data-chat-close]");
    if (close) {
      state.chatOpen = false;
      renderChat();
      return;
    }

    const prompt = event.target.closest("[data-chat-prompt]");
    if (prompt) {
      state.chatOpen = true;
      sendChatMessage(prompt.dataset.chatPrompt);
    }
  });

  $("#chat-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = $("#chat-input");
    sendChatMessage(input.value);
    input.value = "";
    input.focus();
  });

  document.body.addEventListener("click", (event) => {
    const button = event.target.closest("[data-plan]");
    if (!button) return;
    state.selectedPlan = button.dataset.plan;
    renderPlans();
  });

  $all(".segment").forEach((button) => {
    button.addEventListener("click", () => {
      state.bureau = button.dataset.bureau;
      $all(".segment").forEach((item) => item.classList.toggle("active", item === button));
    });
  });

  $all(".filter-tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.findingFilter = button.dataset.filter;
      $all(".filter-tab").forEach((item) => item.classList.toggle("active", item === button));
      renderFindings();
    });
  });

  $("#account-select").addEventListener("change", (event) => {
    state.selectedAccount = event.target.value;
    renderAccountDetail();
  });

  const dropzone = $("#dropzone");
  const input = $("#file-input");
  input.addEventListener("change", (event) => handleUpload(event.target.files));

  ["dragenter", "dragover"].forEach((name) => {
    dropzone.addEventListener(name, (event) => {
      event.preventDefault();
      dropzone.classList.add("dragging");
    });
  });

  ["dragleave", "drop"].forEach((name) => {
    dropzone.addEventListener(name, (event) => {
      event.preventDefault();
      dropzone.classList.remove("dragging");
    });
  });

  dropzone.addEventListener("drop", (event) => handleUpload(event.dataTransfer.files));
}

function init() {
  renderDashboard();
  renderUploads();
  renderPlans();
  renderDisclosureList();
  renderLearning();
  renderFaqs();
  renderPortalUpdates();
  renderNotificationPreferences();
  renderChat();
  renderFindings();
  renderAccountSelect();
  renderAccountDetail();
  renderVault();
  renderDisputes();
  bindEvents();
}

init();
