export const videoTemplates = [
    { id: "weekly-report-refresh-3min", title: "Weekly Report Refresh", duration: 180, format: "9:16", scenes: 12, visualStyle: "animated-dashboard" },
    { id: "negative-account-review-3min", title: "Negative Account Review", duration: 180, format: "9:16", scenes: 12, visualStyle: "animated-card-sort" },
    { id: "dispute-packet-3min", title: "Dispute Packet Explainer", duration: 180, format: "9:16", scenes: 12, visualStyle: "packet-layer-animation" },
    { id: "credit-process-3min", title: "Credit Improvement Process", duration: 180, format: "9:16", scenes: 12, visualStyle: "timeline-animation" },
];

export const animationTemplates = [
    { id: "bureau-cards-slide", title: "Bureau Cards Slide", elements: ["Equifax card", "Experian card", "TransUnion card"], motion: "slide-in-staggered" },
    { id: "comparison-table-reveal", title: "3-Bureau Comparison Table Reveal", elements: ["field row", "bureau columns", "issue highlight"], motion: "row-highlight" },
    { id: "negative-account-sort", title: "Negative Account Sort", elements: ["collection card", "charge-off card", "late-payment card"], motion: "sort-by-issue" },
    { id: "dispute-packet-layers", title: "Dispute Packet Layers", elements: ["letter", "comparison", "report page", "evidence", "tracking"], motion: "stack-layers" },
    { id: "mail-tracking-timeline", title: "Mail Tracking Timeline", elements: ["draft", "approved", "mailed", "delivered", "response due"], motion: "progress-line" },
];

export const imageTemplates = [
    { id: "hero-square", title: "Hero Square Ad", size: "1080x1080", headline: "Find errors. Build disputes. Track progress.", visual: "dashboard mockup" },
    { id: "weekly-refresh-story", title: "Weekly Refresh Story", size: "1080x1920", headline: "Upload your latest reports.", visual: "three bureau cards" },
    { id: "three-bureau-comparison", title: "3-Bureau Comparison Ad", size: "1080x1350", headline: "Your 3 reports may not match.", visual: "comparison table" },
    { id: "negative-account-review", title: "Negative Account Review Ad", size: "1200x628", headline: "Collections and charge-offs need detail.", visual: "negative account cards" },
];

export const exportProfiles = [
    { label: "Vertical Reel", size: "1080x1920", aspect: "9:16", fps: 30 },
    { label: "YouTube / Website", size: "1920x1080", aspect: "16:9", fps: 30 },
    { label: "Square Social", size: "1080x1080", aspect: "1:1", fps: 30 },
    { label: "Portrait Feed Ad", size: "1080x1350", aspect: "4:5", fps: 30 },
    { label: "Web Ad", size: "1200x628", aspect: "1.91:1", fps: 30 },
];
