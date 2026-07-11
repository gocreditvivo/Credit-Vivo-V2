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

## Codex Task Now

Update homepage to approved result-first Credit Vivo voice.

Tasks:

- [ ] Update `src/pages/Home.tsx` hero.
- [ ] Remove weak/vague customer language.
- [ ] Add/result-first customer sections.
- [ ] Add attorney support section lower on homepage.
- [ ] Add footer disclosure line: `Results are not guaranteed. See Disclosures.`
- [ ] Confirm mobile layout.
- [ ] Run build/typecheck.
- [ ] Update this file after the run.
- [ ] Update `docs/CV2_MASTER_TASK_TRACKER.md` after the run.

Approved homepage hero:

```text
Fix what’s hurting your score.

Credit Vivo helps find credit report errors, negative accounts, bad tradelines, and score blockers — then builds your AI Credit Boost Plan so you can get ready for better loans and financing.
```

Approved trust chips:

```text
Repair credit report errors
Remove inaccurate negative accounts
Challenge bad tradelines
```

Attorney section:

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

Next task ETA: 4–8 hours
Sprint ETA remaining: 1–2 days
Full CV2 ETA remaining: 6–10 weeks
Confidence: Medium

## Latest Status

Status: READY FOR CODEX

Last ChatGPT update:

- Created `docs/CV2_CONTENT_VOICE.md`.
- Created `docs/CV2_MASTER_TASK_TRACKER.md`.
- Added ETA/handoff tracking rules to `docs/CV2_MASTER_TASK_TRACKER.md`.
- Created this `CHATGPT_CODEX_HANDOFF.md` file.

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
Full CV2 ETA remaining:
Confidence:
```
