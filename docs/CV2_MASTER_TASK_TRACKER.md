# Credit Vivo V2 — Master Task Tracker

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

## Completion Goal

Credit Vivo is complete when it has:

1. A bold score-first public site.
2. Customer signup/login.
3. Secure report upload.
4. AI scanner/parser.
5. Account cards.
6. Score blockers.
7. AI Credit Boost Plan.
8. Dispute builder.
9. Customer approval workflow.
10. Dispute tracker.
11. Attorney support escalation queue.
12. Monitoring/protection guidance.
13. Admin dashboard.
14. Disclosures folder and footer links.
15. Supabase schema, RLS, audit logs, and secure storage.
16. Build/typecheck passing.
17. Vercel production site rendering correctly.

---

## Handoff Tracking Rule

Codex must use this file as the master tracker and `CHATGPT_CODEX_HANDOFF.md` as the daily/run handoff.

After every Codex run, update both files:

1. What was completed.
2. Files changed.
3. Build/typecheck/test result.
4. Errors.
5. Blockers.
6. What remains incomplete.
7. Next recommended task.
8. Estimated time to complete the next task.
9. Estimated time to complete the current sprint.
10. Estimated time to complete full CV2 launch readiness.

Status values:

- TODO
- IN PROGRESS
- BLOCKED
- READY FOR REVIEW
- DONE

ETA format:

```text
Next task ETA: __ hours/days
Sprint ETA remaining: __ days
Full CV2 ETA remaining: __ weeks/months
Confidence: Low / Medium / High
```

---

## Current Completion Estimate

This is a planning estimate only. Codex must update after every run based on actual codebase status.

- Sprint 1: 1–2 days
- Sprint 2: 1–2 days
- Sprint 3: 3–5 days
- Sprint 4: 4–7 days
- Sprint 5: 7–14 days
- Sprint 6: 5–10 days
- Sprint 7: 3–7 days
- Sprint 8: 5–10 days
- Sprint 9: 5–10 days
- Sprint 10: 3–7 days

Full CV2 MVP launch readiness estimate: 6–10 weeks if Codex can work continuously and blockers are handled fast.

---

## Sprint 1 — Public Site Voice and Conversion

Status: TODO
ETA remaining: 1–2 days

Tasks:

- [ ] Update homepage hero with approved bold wording.
- [ ] Remove weak phrases from homepage.
- [ ] Add result-first customer sections.
- [ ] Add attorney support section lower on homepage.
- [ ] Add footer disclosure link: Results are not guaranteed. See Disclosures.
- [ ] Confirm mobile layout.
- [ ] Run build/typecheck.

Homepage hero:

```text
Fix what’s hurting your score.

Credit Vivo helps find credit report errors, negative accounts, bad tradelines, and score blockers — then builds your AI Credit Boost Plan so you can get ready for better loans and financing.
```

Trust chips:

```text
Repair credit report errors
Remove inaccurate negative accounts
Challenge bad tradelines
```

---

## Sprint 2 — Disclosure System

Status: TODO
ETA remaining: 1–2 days

Tasks:

- [ ] Create or verify `disclosures/` folder.
- [ ] Add no-guarantee disclosure.
- [ ] Add credit repair disclosure.
- [ ] Add attorney support disclosure.
- [ ] Add dispute approval disclosure.
- [ ] Add CROA disclosure.
- [ ] Add FCRA disclosure.
- [ ] Add MD/VA/DC state disclosure placeholders.
- [ ] Link disclosures from footer, terms, signup, checkout, and approval screens.

Rule:

Public homepage stays bold. Legal limits live in disclosures and approval flows.

---

## Sprint 3 — Customer App Shell

Status: TODO
ETA remaining: 3–5 days

Tasks:

- [ ] Signup/login page.
- [ ] Customer dashboard.
- [ ] Upload report page.
- [ ] Score dashboard.
- [ ] Account cards page.
- [ ] Score blockers page.
- [ ] AI Credit Boost Plan page.
- [ ] Dispute tracker page.
- [ ] Customer approval screen.
- [ ] Attorney support request/escalation page.

---

## Sprint 4 — Backend Engine Foundation

Status: TODO
ETA remaining: 4–7 days

Create/update backend modules:

- [ ] credit_report_parser_ai/
- [ ] identity_match_ai/
- [ ] identity_risk_ai/
- [ ] account_match_ai/
- [ ] account_tile_engine/
- [ ] metro2_accuracy_ai/
- [ ] score_impact_ai/
- [ ] score_simulation_ai/
- [ ] utilization_boost_ai/
- [ ] reporting_cycle_ai/
- [ ] credit_timing_engine/
- [ ] credit_timeline_ai/
- [ ] credit_event_alert_engine/
- [ ] score_goal_ai/
- [ ] dispute_reason_ai/
- [ ] evidence_checklist_ai/
- [ ] letter_packet_ai/
- [ ] dispute_tracker_ai/
- [ ] escalation_attorney_review_ai/
- [ ] compliance_guardian_ai/
- [ ] ml_model_correction_ai/
- [ ] feature_learning_engine/
- [ ] learning_database/
- [ ] credit_protection_ai/
- [ ] marketplace_ai/

---

## Sprint 5 — Scanner MVP

Status: TODO
ETA remaining: 7–14 days

Flow:

```text
Upload report -> parse accounts -> show account cards -> flag score blockers -> create AI Credit Boost Plan
```

Tasks:

- [ ] Accept PDF upload.
- [ ] Accept TXT/raw text upload.
- [ ] Extract identity block.
- [ ] Extract tradelines/accounts.
- [ ] Extract negative accounts.
- [ ] Extract collections.
- [ ] Extract charge-offs.
- [ ] Extract balances, dates, status, payment history, remarks.
- [ ] Detect bureau differences.
- [ ] Detect score blockers.
- [ ] Output account cards.
- [ ] Output score plan.
- [ ] Save scan result with audit log.

---

## Sprint 6 — Dispute Builder and Tracker

Status: TODO
ETA remaining: 5–10 days

Tasks:

- [ ] Generate draft dispute reasons.
- [ ] Generate evidence checklist.
- [ ] Generate letter packet draft.
- [ ] Require customer approval.
- [ ] Require admin review for risky/escalation items.
- [ ] Track letter status.
- [ ] Track bureau/furnisher responses.
- [ ] Track deadlines.
- [ ] Track next action.

No automatic sending without approval.

---

## Sprint 7 — Attorney Support Layer

Status: TODO
ETA remaining: 3–7 days

Tasks:

- [ ] Add eligible unresolved issue rules.
- [ ] Build attorney review queue.
- [ ] Build evidence packet summary.
- [ ] Include dispute history.
- [ ] Include bureau/furnisher responses.
- [ ] Include timeline.
- [ ] Include supporting documents.
- [ ] Add customer approval before attorney support request.

Public wording:

```text
Attorney support when credit problems need more pressure.
```

Safe line:

```text
Attorney support may be available for eligible unresolved credit-reporting issues.
```

---

## Sprint 8 — Supabase and Security

Status: TODO
ETA remaining: 5–10 days

Tasks:

- [ ] Supabase schema.
- [ ] Customer profiles table.
- [ ] Reports table.
- [ ] Scan results table.
- [ ] Account cards table.
- [ ] Disputes table.
- [ ] Letters table.
- [ ] Approvals table.
- [ ] Attorney queue table.
- [ ] Audit logs table.
- [ ] Consent logs table.
- [ ] Storage buckets.
- [ ] RLS policies.
- [ ] Admin role separation.
- [ ] Encryption/secure storage plan.

---

## Sprint 9 — Monitoring, Protection, Marketplace

Status: TODO
ETA remaining: 5–10 days

Tasks:

- [ ] Credit monitoring page.
- [ ] Identity protection page.
- [ ] Fraud alert guide.
- [ ] Credit freeze guide.
- [ ] New inquiry alert plan.
- [ ] New account alert plan.
- [ ] Auto loan readiness page.
- [ ] Mortgage readiness page.
- [ ] Apartment readiness page.
- [ ] Credit card readiness page.
- [ ] Insurance/financing readiness page.

---

## Sprint 10 — Launch QA

Status: TODO
ETA remaining: 3–7 days

Tasks:

- [ ] Build passes.
- [ ] Typecheck passes.
- [ ] Lint passes or documented.
- [ ] Vercel production renders.
- [ ] Main routes work.
- [ ] Mobile layout checked.
- [ ] Footer links checked.
- [ ] Disclosures checked.
- [ ] Signup flow checked.
- [ ] Upload flow checked.
- [ ] Scanner flow checked.
- [ ] Customer approval checked.
- [ ] Admin review checked.
- [ ] No real report data in repo.

---

## Codex Reporting Rule

After every run, update `CHATGPT_CODEX_HANDOFF.md` with:

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

---

## Latest Handoff Summary

Current priority: Sprint 1.

Next task:

```text
Update homepage to approved result-first Credit Vivo voice, add attorney support lower on homepage, add footer disclosure line, then run build/typecheck.
```

Next task ETA: 4–8 hours
Sprint ETA remaining: 1–2 days
Full CV2 ETA remaining: 6–10 weeks
Confidence: Medium
