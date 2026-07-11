# Credit Vivo V2 — ChatGPT / Codex Handoff

## Current Priority

Sprint 1 + 2 verify, then Parser MVP planning/build.

## Build Standard

Keep it simple. Say the result. Use everyday customer words. Build bold. Compliance stays in disclosures, terms, footer, consent, and approval flows.

Public voice:

- Fix what’s hurting your score.
- Repair credit report errors.
- Remove inaccurate negative accounts.
- Challenge bad tradelines.
- Build your AI Credit Boost Plan.
- Get ready for better loans and financing.
- Attorney support when credit problems need more pressure.

## Plain-English Parser Goal

The parser reads a customer's uploaded credit report and turns it into simple Credit Vivo results.

Customer uploads or pastes credit report text. Credit Vivo reads it, pulls out the key information, finds negative accounts and score blockers, flags possible FCRA / Metro 2 issues, and shows the customer a clean AI Credit Boost Plan.

## Parser Build Plan

Detailed parser plan has been updated here:

```text
docs/CV2_PARSER_BUILD_PLAN.md
```

Codex must read that file before parser coding.

## Compliance Planning Gate Before Build

Before writing parser code, Codex must explain the build in plain English and confirm the parser plan covers:

```text
FCRA
FACTA
CROA
FDCPA
Metro 2
GLBA / data security
MD / VA / DC state placeholders
```

Parser must flag possible issues, not final legal conclusions.

Correct output language:

```text
Possible issue found
Why it matters
Which bureau/account is affected
What proof may help
Recommended next action
```

## Timeline Rule

Use the ChatGPT + Codex timeline for this build.

- ChatGPT sets the business/product build estimate.
- Codex sets the technical task estimate after reviewing repo files.
- Codex updates ETA after every run based on actual files changed, build results, errors, and blockers.
- If Codex finds blockers, the ETA must be updated immediately.

Current working timeline:

- Sprint 1 homepage/content conversion update: same day after build passes.
- Sprint 2 disclosures system: same day after build passes.
- Parser planning gate: same day.
- Parser MVP smallest slice: 2–5 days after build passes.
- Sprint 3 customer app shell: 1–2 weeks.
- Sprint 4 backend engine foundation: 1–2 weeks.
- Sprint 5 scanner/parser MVP: 2–3 weeks.
- Sprint 6 dispute builder/tracker: 1–2 weeks.
- Sprint 7 attorney support layer: 1 week.
- Sprint 8 Supabase/security: 1–2 weeks.
- Sprint 9 monitoring/protection/marketplace pages: 1–2 weeks.
- Sprint 10 launch QA: 1 week.

Working MVP ETA: 6–10 weeks.
Commercial-ready ETA: 10–16 weeks.
Confidence: Medium until Codex completes repo review and build check.

## Codex Task Now

First: verify current UI and run build/typecheck.

Then: explain parser plan in plain English before coding.

Then: begin smallest Parser MVP slice.

### Verify Tasks

- [x] Update `src/pages/Home.tsx` hero.
- [x] Remove weak/vague customer language from homepage hero.
- [x] Add result-first customer sections.
- [x] Add attorney support section lower on homepage.
- [x] Add footer disclosure line: `Results are not guaranteed. See Disclosures.`
- [x] Update `src/pages/Disclosure.tsx` with clean disclosure system.
- [x] Update footer disclosure language and link.
- [ ] Confirm mobile layout.
- [ ] Run build/typecheck.
- [ ] Update this file after the run.
- [ ] Update `docs/CV2_MASTER_TASK_TRACKER.md` after the run.

### Parser MVP First Build Task

Codex should start with the smallest working parser slice:

1. Inspect current `/scan`, `/findings`, `/dashboard`, and related files.
2. Explain in plain English what it will build before coding.
3. Add a parser service/helper that accepts sample text input.
4. Parse sample report text into mock account cards.
5. Add basic FCRA / Metro 2 issue flags.
6. Display parsed results on the findings page.
7. Keep customer wording clear and result-first.
8. Run build/typecheck.
9. Update this handoff.

## Parser MVP Output Required

The customer should see:

```text
What is hurting my score?
What needs to be fixed?
What proof may be needed?
What action comes next?
```

MVP outputs:

- Customer identity block
- Account list
- Negative account list
- Collection list
- Charge-off list
- Score blocker list
- FCRA / Metro 2 issue flags
- Account cards
- AI Credit Boost Plan draft
- Evidence checklist draft

## Do Not Build Yet

Do not build full AI, paid submissions, real dispute mailing, real attorney routing, or full production storage until parser MVP works.

Do not use real customer reports in repo.

## Approval Rule

No dispute, letter, complaint, or attorney escalation is sent automatically. Parser output is a draft/customer review result only.

## Latest Status

Status: PARSER COMPLIANCE PLAN UPDATED — WAITING FOR FOUNDER APPROVAL BEFORE PARSER CODE

Last ChatGPT update:

- Created `docs/CV2_PARSER_BUILD_PLAN.md`.
- Updated parser plan with FCRA, FACTA, CROA, FDCPA, Metro 2, GLBA/security, and MD/VA/DC placeholders.
- Updated this handoff for the parser planning gate.
- Parser is not finished yet.
- Next build target is a simple working parser slice using sample/mock text first, after founder approval and Codex build verification.

Latest ChatGPT commits:

- `a5a40000363b45585d0e174309c371e0436609b2` — Updated homepage to result-first Credit Vivo voice.
- `d53da7ddecf8c171b655ce05a537340ed133f816` — Updated disclosure page for CV2 launch voice.
- `f278e861cdcf37f9de50259cc6267a45b9e7a060` — Tightened footer disclosure and public voice.
- `9a9c491e61476e5d62047fd7917294eadae19a39` — Added parser build plan.
- `bb6f66f8fd74fe22f4c5d87844b509413c251fb6` — Added FCRA / FACTA / Metro 2 parser planning requirements.

## Next Codex Response Required

Codex must report:

```text
Completed:
Files changed:
Build/typecheck:
Errors:
Blockers:
Still incomplete:
Next task:
Next task ETA:
Sprint ETA remaining:
Full CV2 MVP ETA remaining:
Commercial-ready ETA remaining:
Confidence:
```
