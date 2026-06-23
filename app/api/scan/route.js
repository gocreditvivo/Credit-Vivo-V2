import { createDemoCase } from "../../../components/demoCase";

const MAX_UPLOAD_BYTES = 12 * 1024 * 1024;
const SAFE_TEXT = /[<>]/g;

function cleanText(value, fallback = "") {
  if (typeof value !== "string") return fallback;
  return value.replace(SAFE_TEXT, "").trim().slice(0, 500);
}

export async function POST(request) {
  let reportName = "sample-3-bureau-report.pdf";
  let consumerName = "Demo Customer";
  let consumerEmail = "demo.customer@example.com";
  let bureau = "3-bureau report";
  let notes = "";
  let communication = { portal: true, email: true, text: false };

  try {
    const form = await request.formData();
    const report = form.get("report");
    if (report && typeof report === "object" && "name" in report && report.name) {
      if ("size" in report && report.size > MAX_UPLOAD_BYTES) {
        return Response.json(
          { status: "error", message: "Demo upload is limited to 12 MB." },
          { status: 413 }
        );
      }
      reportName = cleanText(report.name, reportName);
    }
    consumerName = cleanText(form.get("consumerName"), consumerName);
    consumerEmail = cleanText(form.get("consumerEmail"), consumerEmail);
    bureau = cleanText(form.get("bureau"), bureau);
    notes = cleanText(form.get("notes"), "");
    const portal = form.get("portal");
    const email = form.get("email");
    const text = form.get("text");
    communication = {
      portal: portal === null ? true : portal === "true",
      email: email === null ? true : email === "true",
      text: text === null ? false : text === "true",
    };
  } catch {
    // Allow a bare POST to still return a demo case.
  }

  const demoCase = createDemoCase({
    consumerName,
    consumerEmail,
    reportName,
    bureau,
    source: notes ? "Manual portal upload with customer notes" : "Manual portal upload",
    status: "Manual review queued",
    communication,
  });

  return Response.json({
    status: "simulated",
    message: "Simulated Credit Vivo scan completed. No real bureau, text, email, or mail action was performed.",
    case: demoCase,
  });
}
