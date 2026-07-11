# Credit Vivo V2 — ChatGPT / Codex Handoff

## Current Priority

Sprint 1 — Public Site Voice and Conversion

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

## Timeline Rule

Use the ChatGPT + Codex timeline for this build.

- ChatGPT sets the business/product build estimate.
- Codex sets the technical task estimate after reviewing repo files.
- Codex updates ETA after every run based on actual files changed, build results, errors, and blockers.
- If Codex finds blockers, the ETA must be updated immediately.

Current working timeline:

- Sprint 1 homepage/content conversion update: 1–2 days.
- Sprint 2 disclosures system: 1–2 days.
- Sprint 3 customer app shell: 1–2 weeks.
- Sprint 4 backend engine foundation: 1–2 weeks.
- Sprint 5 scanner MVP: 2–3 weeks.
- Sprint 6 dispute builder/tracker: 1–2 weeks.
- Sprint 7 attorney support layer: 1 week.
- Sprint 8 Supabase/security: 1–2 weeks.
- Sprint 9 monitoring/protection/marketplace pages: 1–2 weeks.
- Sprint 10 launch QA: 1 week.

Working MVP ETA: 6–10 weeks.
Commercial-ready ETA: 10–16 weeks.
Confidence: Medium until Codex completes repo review and build check.

## Codex Task Now

Verify Sprint 1 homepage update and run build/typecheck.

Tasks:

- [x] Update `src/pages/Home.tsx` hero.
- [x] Remove weak/vague customer language from homepage hero.
- [x] Add result-first customer sections.
- [x] Add attorney support section lower on homepage.
- [x] Add footer disclosure line: `Results are not guaranteed. See Disclosures.`
- [ ] Confirm mobile layout.
- [ ] Run build/typecheck.
- [ ] Update this file after the run.
- [ ] Update `docs/CV2_MASTER_TASK_TRACKER.md` after the run.

Approved homepage hero now applied:

```text
Fix what’s hurting your score.

Credit Vivo helps find credit report errors, negative accounts, bad tradelines, and score blockers — then builds your AI Credit Boost Plan so you can get ready for better loans and financing.
```

Approved trust chips now applied:

```text
Repair credit report errors
Remove inaccurate negatives
Challenge bad tradelines
```

Attorney section now applied:

```text
Attorney support when credit problems need more pressure.

If credit reporting problems do not get fixed, Credit Vivo helps organize your reports, dispute history, bureau responses, evidence, and timeline for attorney support.

Attorney support may be available for eligible unresolved credit-reporting issues.
```

## Do Not Use On Homepage

Do not use weak/vague words on the homepage:

- possible reporting issue
- work toward
- credit position
- may be blocking
- opportunity readiness
- possible score direction

Those belong only in disclosures, terms, approval screens, or internal compliance notes.

## Handoff Tracking Rule

After every Codex run, update this file with:

1. Task completed.
2. Files changed.
3. Tests/build/typecheck run.
4. Errors.
5. Blockers.
6. What is still incomplete.
7. Next recommended task.
8. Next task ETA.
9. Sprint ETA remaining.
10. Full CV2 ETA remaining.
11. Confidence level.

## Current ETA

Next task ETA: 1–2 hours for Codex build/typecheck verification.
Sprint ETA remaining: same day if build passes; 1 day if fixes are needed.
Full CV2 MVP ETA remaining: 6–10 weeks.
Commercial-ready ETA remaining: 10–16 weeks.
Confidence: Medium.

## Latest Status

Status: HOMEPAGE UPDATED BY CHATGPT — READY FOR CODEX VERIFY

Last ChatGPT update:

- Fixed typo from `bad tradlines` to `bad tradelines`.
- Updated `src/pages/Home.tsx` with result-first founder voice.
- Added attorney support homepage section.
- Added short disclosure line near pricing section.
- Build/typecheck not run by ChatGPT; Codex must run it next.

Latest ChatGPT commits:

- `a5a40000363b45585d0e174309c371e0436609b2` — Updated homepage to result-first Credit Vivo voice.

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
