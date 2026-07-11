# Credit Vivo V2 — ChatGPT / Codex Handoff

## Current Priority

Sprint 1 + 2 verify, then start Parser MVP planning/build.

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

Customer uploads a PDF or TXT credit report. Credit Vivo reads it, pulls out the key information, finds negative accounts and score blockers, and shows the customer a clean AI Credit Boost Plan.

## Parser Build Plan

Detailed parser plan has been added here:

```text
docs/CV2_PARSER_BUILD_PLAN.md
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

Then: begin Parser MVP.

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
2. Add a parser service/helper that accepts text input.
3. Parse sample report text into mock account cards.
4. Display parsed results on the findings page.
5. Keep customer wording clear and result-first.
6. Run build/typecheck.
7. Update this handoff.

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
- Account cards
- AI Credit Boost Plan draft

## Do Not Build Yet

Do not build full AI, full Metro 2 engine, paid submissions, real dispute mailing, or attorney routing until parser MVP works.

## Approval Rule

No dispute, letter, complaint, or attorney escalation is sent automatically. Parser output is a draft/customer review result only.

## Latest Status

Status: PARSER MVP PLANNED — CODEX SHOULD VERIFY BUILD, THEN START PARSER SLICE

Last ChatGPT update:

- Created `docs/CV2_PARSER_BUILD_PLAN.md`.
- Updated this handoff for Parser MVP.
- Parser is not finished yet.
- Next build target is a simple working parser slice using sample/mock text first.

Latest ChatGPT commits:

- `a5a40000363b45585d0e174309c371e0436609b2` — Updated homepage to result-first Credit Vivo voice.
- `d53da7ddecf8c171b655ce05a537340ed133f816` — Updated disclosure page for CV2 launch voice.
- `f278e861cdcf37f9de50259cc6267a45b9e7a060` — Tightened footer disclosure and public voice.
- `9a9c491e61476e5d62047fd7917294eadae19a39` — Added parser build plan.

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
