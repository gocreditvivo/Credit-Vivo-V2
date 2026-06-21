const form = document.querySelector("#scanForm");
const resultSection = document.querySelector("#result");
const resultTitle = document.querySelector("#resultTitle");
const resultText = document.querySelector("#resultText");
const emailLead = document.querySelector("#emailLead");

function recommendPlan(data) {
  const issue = data.get("issue");
  const goal = data.get("goal");
  const timeline = data.get("timeline");

  const attorneySignals = ["Identity theft", "Bankruptcy", "Repossession"];
  const plusSignals = ["Collections", "Charge-offs", "Late payments"];
  const urgentGoals = ["Buy a home", "Buy a car", "Rent an apartment"];

  if (attorneySignals.includes(issue)) {
    return {
      plan: "Credit Vivo Attorney Tier",
      summary:
        "Your answers suggest you may need a deeper review or escalation path. Attorney involvement depends on eligibility, legal review, and the partner law firm's process.",
    };
  }

  if (
    plusSignals.includes(issue) ||
    urgentGoals.includes(goal) ||
    timeline === "Within 90 days"
  ) {
    return {
      plan: "Credit Vivo Plus",
      summary:
        "Your answers suggest you may benefit from advanced bureau and creditor review, especially if you are working toward a time-sensitive approval goal.",
    };
  }

  return {
    plan: "Credit Vivo Core",
    summary:
      "Your answers suggest Core may be the best starting point for affordable bureau dispute support and clear progress tracking.",
  };
}

function buildEmailLink(data, recommendation) {
  const firstName = data.get("firstName");
  const email = data.get("email");
  const phone = data.get("phone");
  const goal = data.get("goal");
  const issue = data.get("issue");
  const timeline = data.get("timeline");

  const subject = encodeURIComponent(`Credit Vivo scan for ${firstName}`);
  const body = encodeURIComponent(
    [
      `New Credit Vivo scan`,
      ``,
      `Name: ${firstName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Goal: ${goal}`,
      `Main issue: ${issue}`,
      `Timeline: ${timeline}`,
      `Recommended plan: ${recommendation.plan}`,
      ``,
      `Note: Connect this form to your CRM or GoDaddy form handler before paid traffic.`,
    ].join("\n")
  );

  return `mailto:hello@creditvivo.com?subject=${subject}&body=${body}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const recommendation = recommendPlan(data);

  resultTitle.textContent = recommendation.plan;
  resultText.textContent = recommendation.summary;
  emailLead.href = buildEmailLink(data, recommendation);
  resultSection.hidden = false;

  const lead = {
    capturedAt: new Date().toISOString(),
    firstName: data.get("firstName"),
    email: data.get("email"),
    phone: data.get("phone"),
    goal: data.get("goal"),
    issue: data.get("issue"),
    timeline: data.get("timeline"),
    recommendation: recommendation.plan,
  };

  localStorage.setItem("creditVivoLatestLead", JSON.stringify(lead));
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
});
