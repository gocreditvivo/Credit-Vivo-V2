# Credit Vivo V2 — ChatGPT / Codex Handoff

## Current Priority

Parser MVP + Score Impact Engine verification.

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

## What ChatGPT Built Now

ChatGPT added the first working local parser + score impact code.

Files changed:

```text
src/lib/creditParser.ts
src/pages/FreeScan.tsx
CHATGPT_CODEX_HANDOFF.md
```

New code added:

```text
Local credit report text parser
Bureau detector: Experian / Equifax / TransUnion
Account block extraction
Identity extraction
Account card extraction
Collection detection
Charge-off detection
High utilization detection
Late payment detection
Basic FCRA / Metro 2 issue flags
Score Impact Engine ranking
Evidence/proof-needed checklist
Draft packet queue stubs
FCRA review stubs
```

## Plain-English Parser Goal

The parser reads a customer's uploaded or pasted credit report and turns it into simple Credit Vivo results.

Customer pastes report text or uploads a TXT report. Credit Vivo reads it, pulls out accounts, finds negative accounts and score blockers, flags possible FCRA / Metro 2 issues, and shows a clean AI Credit Boost Plan.

## Compliance Planning Gate Covered

Parser plan now covers:

```text
FCRA
FACTA
CROA
FDCPA
Metro 2
GLBA / data security
MD / VA / DC state placeholders
e-OSCAR-aware packet prep
```

Correct output language:

```text
Possible issue found
Why it matters
Which bureau/account is affected
What proof may help
Recommended next action
```

Parser must flag possible issues, not final legal conclusions.

## Timeline Rule

Use the ChatGPT + Codex timeline for this build.

- ChatGPT sets the business/product build estimate.
- Codex sets the technical task estimate after reviewing repo files.
- Codex updates ETA after every run based on actual files changed, build results, errors, and blockers.
- If Codex finds blockers, the ETA must be updated immediately.

Current working timeline:

- Parser MVP smallest slice: started by ChatGPT, needs Codex verify/fix.
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
Confidence: Medium until Codex completes build/typecheck.

## Codex Task Now

Codex must verify and harden the new parser code.

Tasks:

- [x] Add local parser file: `src/lib/creditParser.ts`.
- [x] Add Score Impact Engine ranking inside parser helper.
- [x] Update `/scan` to accept pasted text and TXT files.
- [x] Keep PDF path connected to backend parser.
- [ ] Run build/typecheck.
- [ ] Fix TypeScript/build errors if any.
- [ ] Test pasted sample Equifax text.
- [ ] Test pasted sample Experian text.
- [ ] Test pasted sample TransUnion text.
- [ ] Confirm `/findings` renders local parser results.
- [ ] Add better account matching across bureaus.
- [ ] Add anonymized test fixtures only. Do not commit real credit reports.
- [ ] Update this handoff after the run.
- [ ] Update `docs/CV2_MASTER_TASK_TRACKER.md` after the run.

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

Do not build paid submissions, real dispute mailing, real attorney routing, or full production storage until parser MVP works.

Do not use real customer reports in repo.

## Approval Rule

No dispute, letter, complaint, or attorney escalation is sent automatically. Parser output is a draft/customer review result only.

## Latest Status

Status: PARSER + SCORE IMPACT CODE STARTED — READY FOR CODEX BUILD VERIFY

Last ChatGPT update:

- Created `src/lib/creditParser.ts`.
- Connected `/scan` to local parser for pasted report text and TXT files.
- Added score blocker ranking.
- Added possible FCRA / Metro 2 issue flags.
- Added e-OSCAR-aware packet prep note in parser output.
- Build/typecheck not run by ChatGPT; Codex must run it next.

Latest ChatGPT commits:

- `21f9907c4fe19509c567ffd6cc9d2511afe641f7` — Added local credit parser and score impact engine.
- `363ced11ad7a789ba2f08cd1c6d7ccf66acf0277` — Connected scan page to local parser MVP.

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
