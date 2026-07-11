# Credit Vivo V2 — Parser Build Plan

## Plain-English Goal

The parser is the engine that reads a customer's uploaded credit report and turns it into simple Credit Vivo results.

Customer uploads a PDF or TXT credit report. Credit Vivo reads it, pulls out the key information, finds negative accounts and score blockers, and shows the customer a clean AI Credit Boost Plan.

## Before Build Rule

Before coding the parser, Codex must read this plan and explain the build approach in plain English.

Do not build blind. First plan the smallest safe parser slice.

## Real Report Samples Available Outside Repo

Tim uploaded six real report samples for planning and testing outside the repository:

```text
Equifax — March 25, 2026
Equifax — June 29, 2026
Experian — March 25, 2026
Experian — June 29, 2026
TransUnion — March 25/26, 2026
TransUnion — June 29, 2026
```

Do not commit those reports or real personal data into the repo. Use them only to design parser rules, expected fields, sample shapes, and test cases. Any committed fixtures must be fake/anonymized.

## Compliance Standards Required

The parser must be planned around these standards:

```text
FCRA
FACTA
CROA
FDCPA
Metro 2
e-OSCAR-aware dispute preparation
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
- account still showing collection/charge-off after paid/settled status
- balance growth after charge-off or collection
- removal date mismatch across bureaus

The scanner should not make legal conclusions. It should say:

```text
Possible issue found
Why it matters
Which bureau/account is affected
What proof may help
Recommended next action
```

## Three-Bureau Parser Reality

The three bureaus do not show the same credit data in the same format.

### Equifax style

Equifax uses structured account pages with labels like:

```text
Date Reported
Balance
Account Number
Owner
Loan/Account Type
Status
Date Opened
Date of 1st Delinquency
Date Major Delinquency 1st Reported
Amount Past Due
Charge Off Amount
Narrative Codes
24 Month History
```

### Experian style

Experian uses account-card style sections with labels like:

```text
Account Name
Account Number
Account Type
Responsibility
Date Opened
Status
Status Updated
Balance
Balance Updated
Original Balance
On Record Until
Payment History
Historical Info
Original Creditor
Contact Info
Comment
```

### TransUnion style

TransUnion uses account information blocks with labels like:

```text
Date Opened
Responsibility
Account Type
Loan Type
Balance
Date Updated
Last Payment Made
Pay Status
Date Closed
High Balance
Credit Limit
Estimated month and year this item will be removed
Remarks
Payment History
```

### CV2 parser rule

Build a translator layer:

```text
Equifax field -> CV2 standard field
Experian field -> CV2 standard field
TransUnion field -> CV2 standard field
```

Do not build only for one bureau.

## Metro 2 Fields to Extract

Parser should extract these fields where available:

- account name
- furnisher name
- bureau reporting
- account type
- loan type / portfolio type
- creditor classification
- original creditor
- account number / masked account number
- ownership / responsibility
- balance
- past due amount
- credit limit / high credit
- original balance / original amount
- scheduled payment
- actual payment / payment received
- date opened
- date closed
- last updated date
- date reported
- Date of First Delinquency if available
- estimated removal date / on-record-until date
- charge-off date if available
- collection opened / assigned date if available
- status
- payment status
- payment history
- remarks
- dispute status / consumer dispute notation
- narrative codes / remark codes
- contact information for furnisher/collector

## FCRA / FACTA Issue Flags

MVP issue flags should include:

- balance mismatch
- status mismatch
- date mismatch
- missing original creditor
- duplicate collection
- collection and original creditor double-report issue
- missing or inconsistent DOFD
- removal date mismatch
- possible re-aging
- account reported by one bureau but missing from another
- late payment inconsistency
- paid account still showing wrong status
- charge-off still updating suspiciously
- old address / identity mismatch
- dispute remark missing after dispute
- account marked disputed but no clear resolution path

## FDCPA Collection Logic

For collections, parser should flag:

- collection account found
- original creditor missing
- collector name missing
- balance mismatch
- duplicate collection
- collection date may not restart reporting age
- customer may need validation/evidence checklist
- insurance/utility/telecom collection category
- paid/settled collection still reporting negative status

## e-OSCAR-Aware Dispute Preparation

Credit Vivo does not claim direct e-OSCAR access.

Credit Vivo should prepare disputes that survive the e-OSCAR process by making the dispute field-level, evidence-backed, and hard to reduce into a vague generic code.

### Bad dispute

```text
This account is wrong. Please delete.
```

### Credit Vivo dispute-ready format

```text
Account: Capital One
Field disputed: balance / past due / charge-off reporting / removal date
Problem: Equifax, Experian, and TransUnion report different dates, statuses, balance history, or removal timing.
Evidence: attached three-bureau comparison and source report pages.
Request: investigate and correct inaccurate/incomplete reporting, or delete if unverifiable.
```

### Required output from parser for packet builder

- account identifier
- bureau reporting
- furnisher / collector name
- field disputed
- raw value by bureau
- normalized CV2 value
- source page / raw snippet reference
- confidence score
- possible issue reason
- evidence needed
- recommended next action
- bureau packet summary
- furnisher packet summary

## Evidence Tracking Requirement

Every extracted value should store evidence:

```text
source_file
bureau
page_number if available
raw_snippet
field_name
extracted_value
confidence
parser_method
```

The customer does not need to see all of this, but admin/legal review needs it.

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
5. Detect bureau format.
6. Find customer identity details.
7. Find accounts and tradelines.
8. Find negative accounts.
9. Find collections.
10. Find charge-offs.
11. Extract balances, dates, statuses, payment history, and remarks.
12. Normalize bureau fields into CV2 standard fields.
13. Compare bureau differences when available.
14. Flag score blockers.
15. Create account cards.
16. Create an AI Credit Boost Plan.
17. Create an evidence checklist.
18. Save scan result for the customer dashboard later.

## Parser MVP Scope

Build the MVP in a way that works with sample/mock data first, then connect to real storage.

### MVP Input

- pasted sample report text
- TXT/raw text upload
- PDF upload planning/stub
- fake/anonymized snippets modeled from Equifax, Experian, and TransUnion layouts

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
- e-OSCAR-ready dispute packet data object

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
- Removal date mismatch
- Paid/settled collection still reporting as collection

## Backend Modules to Create Later

```text
backend/credit_report_parser_ai/
backend/bureau_format_detector/
backend/equifax_parser/
backend/experian_parser/
backend/transunion_parser/
backend/identity_match_ai/
backend/account_match_ai/
backend/metro2_accuracy_ai/
backend/score_impact_ai/
backend/score_goal_ai/
backend/dispute_reason_ai/
backend/evidence_checklist_ai/
backend/dispute_packet_builder/
backend/dispute_tracker_ai/
backend/compliance_guardian_ai/
```

## First Codex Build Task

Codex should start with the smallest working parser slice:

1. Inspect current `/scan`, `/findings`, `/dashboard`, and related files.
2. Explain in plain English what it will build before coding.
3. Add a parser service/helper that accepts sample text input.
4. Add bureau format detector.
5. Parse fake/anonymized Equifax, Experian, and TransUnion sample text into account cards.
6. Normalize fields into CV2 standard account model.
7. Add basic FCRA / Metro 2 / e-OSCAR-ready issue flags.
8. Display parsed results on the findings page.
9. Keep customer wording clear and result-first.
10. Run build/typecheck.
11. Update `CHATGPT_CODEX_HANDOFF.md`.

## Do Not Build Yet

Do not build full AI, paid submissions, real dispute mailing, real attorney routing, direct e-OSCAR access, or full production storage until parser MVP works.

Do not use real customer reports in repo.

## Approval Rule

No dispute, letter, complaint, or attorney escalation is sent automatically. Parser output is a draft/customer review result only.

## Founder Decision Approved

Tim approved starting the parser planning/build path after reviewing the e-OSCAR-aware strategy.

Build sequence:

```text
Build smallest parser MVP first using pasted/sample text.
Then add TXT upload.
Then add PDF extraction.
Then connect to dashboard.
Then add Supabase/security.
Then add packet builder and tracking.
```