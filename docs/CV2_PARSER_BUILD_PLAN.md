# Credit Vivo V2 — Parser Build Plan

## Plain-English Goal

The parser is the engine that reads a customer's uploaded credit report and turns it into simple Credit Vivo results.

Customer uploads a PDF or TXT credit report. Credit Vivo reads it, pulls out the key information, finds negative accounts and score blockers, and shows the customer a clean AI Credit Boost Plan.

## Before Build Rule

Before coding the parser, Codex must read this plan and explain the build approach in plain English.

Do not build blind. First plan the smallest safe parser slice.

## Compliance Standards Required

The parser must be planned around these standards:

```text
FCRA
FACTA
CROA
FDCPA
Metro 2
GLBA / data security
MD / VA / DC state rule placeholders
```

### Plain-English Meaning

The parser should not only read a report. It should help find possible credit-report problems that may hurt the customer's score.

It should look for:

- wrong account information
- wrong balances
- wrong account status
- wrong or inconsistent dates
- missing or inconsistent Date of First Delinquency
- duplicate accounts
- collection issues
- charge-off issues
- original creditor missing
- bureau mismatches
- old addresses / wrong names
- possible mixed-file identity problems
- possible re-aging indicators
- payment history inconsistencies
- dispute remark issues

The scanner should not make legal conclusions. It should say:

```text
Possible issue found
Why it matters
Which bureau/account is affected
What proof may help
Recommended next action
```

## Metro 2 Fields to Extract

Parser should extract these fields where available:

- account name
- furnisher name
- bureau reporting
- account type
- creditor classification
- original creditor
- account number / masked account number
- balance
- past due amount
- credit limit / high credit
- date opened
- date closed
- last updated date
- date reported
- Date of First Delinquency if available
- charge-off date if available
- collection opened / assigned date if available
- status
- payment status
- payment history
- remarks
- dispute status / consumer dispute notation

## FCRA / FACTA Issue Flags

MVP issue flags should include:

- balance mismatch
- status mismatch
- date mismatch
- missing original creditor
- duplicate collection
- collection and original creditor double-report issue
- missing or inconsistent DOFD
- possible re-aging
- account reported by one bureau but missing from another
- late payment inconsistency
- paid account still showing wrong status
- charge-off still updating suspiciously
- old address / identity mismatch

## FDCPA Collection Logic

For collections, parser should flag:

- collection account found
- original creditor missing
- collector name missing
- balance mismatch
- duplicate collection
- collection date may not restart reporting age
- customer may need validation/evidence checklist

## CROA-Safe Build Rules

Parser output must stay as a draft/customer review result.

Do not:

- promise score increase
- promise deletion
- promise approval
- send disputes automatically
- send attorney requests automatically
- tell customer an item is legally invalid as a final conclusion

Do:

- show score blockers
- show possible errors
- show proof needed
- require customer approval before action
- keep legal limits in disclosure/terms/approval screens

## GLBA / Security Planning

Parser must assume credit reports are sensitive data.

Required planning:

- no real credit reports committed to repo
- sample/mock data only in repo
- future uploaded reports stored securely
- access controlled by customer/admin role
- audit log every upload/scan/action
- consent log before report analysis
- encryption/secure storage plan before production

## What the Parser Must Do First

1. Accept pasted sample report text.
2. Accept TXT/raw text upload.
3. Plan PDF extraction, but do not block MVP on perfect PDF parsing.
4. Extract report text.
5. Find customer identity details.
6. Find accounts and tradelines.
7. Find negative accounts.
8. Find collections.
9. Find charge-offs.
10. Extract balances, dates, statuses, payment history, and remarks.
11. Compare bureau differences when available.
12. Flag score blockers.
13. Create account cards.
14. Create an AI Credit Boost Plan.
15. Save scan result for the customer dashboard later.

## Parser MVP Scope

Build the MVP in a way that works with sample/mock data first, then connect to real storage.

### MVP Input

- pasted sample report text
- TXT/raw text upload
- PDF upload planning/stub

### MVP Output

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
- Creditor classification
- Original creditor if available
- Status
- Balance
- Opened date
- Closed date if available
- Last updated date
- Payment status
- Negative reason
- Possible issue flag
- Score blocker level
- Recommended next action
- Proof needed

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
- Possible re-aging indicator
- Missing or inconsistent DOFD

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
backend/compliance_guardian_ai/
```

## First Codex Build Task

Codex should start with the smallest working parser slice:

1. Inspect current `/scan`, `/findings`, `/dashboard`, and related files.
2. Explain in plain English what it will build before coding.
3. Add a parser service/helper that accepts sample text input.
4. Parse sample report text into mock account cards.
5. Add basic FCRA / Metro 2 issue flags.
6. Display parsed results on the findings page.
7. Keep customer wording clear and result-first.
8. Run build/typecheck.
9. Update `CHATGPT_CODEX_HANDOFF.md`.

## Do Not Build Yet

Do not build full AI, paid submissions, real dispute mailing, real attorney routing, or full production storage until parser MVP works.

Do not use real customer reports in repo.

## Approval Rule

No dispute, letter, complaint, or attorney escalation is sent automatically. Parser output is a draft/customer review result only.

## Founder Decision Needed Before Coding

Before Codex starts parser code, Tim should approve:

```text
Build smallest parser MVP first using pasted/sample text.
Then add TXT upload.
Then add PDF extraction.
Then connect to dashboard.
Then add Supabase/security.
```
