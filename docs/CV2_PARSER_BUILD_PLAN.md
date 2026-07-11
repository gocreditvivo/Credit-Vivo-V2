# Credit Vivo V2 — Parser Build Plan

## Plain-English Goal

The parser is the engine that reads a customer's uploaded credit report and turns it into simple Credit Vivo results.

Customer uploads a PDF or TXT credit report. Credit Vivo reads it, pulls out the key information, finds negative accounts and score blockers, and shows the customer a clean AI Credit Boost Plan.

## What the Parser Must Do First

1. Accept a PDF or TXT upload.
2. Extract report text.
3. Find customer identity details.
4. Find accounts and tradelines.
5. Find negative accounts.
6. Find collections.
7. Find charge-offs.
8. Extract balances, dates, statuses, payment history, and remarks.
9. Compare bureau differences when available.
10. Flag score blockers.
11. Create account cards.
12. Create an AI Credit Boost Plan.
13. Save scan result for the customer dashboard.

## Parser MVP Scope

Build the MVP in a way that works with sample/mock data first, then connect to real storage.

### MVP Input

- PDF upload
- TXT/raw text upload
- Sample pasted report text for testing

### MVP Output

- Customer identity block
- Account list
- Negative account list
- Collection list
- Charge-off list
- Score blocker list
- Account cards
- AI Credit Boost Plan draft

## Simple Customer Result

The customer should not see raw technical data first. The customer should see:

```text
What is hurting my score?
What needs to be fixed?
What proof may be needed?
What action comes next?
```

## Account Card Fields

Each account card should show:

- Account name
- Bureau or bureaus reporting
- Account type
- Status
- Balance
- Opened date
- Closed date if available
- Last updated date
- Payment status
- Negative reason
- Score blocker level
- Recommended next action

## Score Blocker Examples

- Collection account
- Charge-off account
- High credit card balance
- Late payment history
- Bureau mismatch
- Duplicate account
- Wrong balance
- Wrong status
- Date mismatch
- Missing original creditor
- Possible mixed identity detail

## Backend Modules to Create Later

```text
backend/credit_report_parser_ai/
backend/identity_match_ai/
backend/account_match_ai/
backend/metro2_accuracy_ai/
backend/score_impact_ai/
backend/score_goal_ai/
backend/dispute_reason_ai/
backend/evidence_checklist_ai/
backend/dispute_tracker_ai/
```

## First Codex Build Task

Codex should start with the smallest working parser slice:

1. Inspect current `/scan`, `/findings`, `/dashboard`, and related files.
2. Add a parser service/helper that accepts text input.
3. Parse sample report text into mock account cards.
4. Display parsed results on the findings page.
5. Keep customer wording clear and result-first.
6. Run build/typecheck.
7. Update `CHATGPT_CODEX_HANDOFF.md`.

## Do Not Build Yet

Do not build full AI, full Metro 2 engine, paid submissions, real dispute mailing, or attorney routing until parser MVP works.

## Approval Rule

No dispute, letter, complaint, or attorney escalation is sent automatically. Parser output is a draft/customer review result only.
