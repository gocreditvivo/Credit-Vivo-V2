# Credit Vivo Competitive Moat Plan

## Goal

Build software better than a generic dispute-letter or upload tool by making Credit Vivo strong in five areas:

## 1. Evidence-first parser

Every extracted field should keep:
- bureau
- source file
- page number
- raw snippet
- confidence score

This is stronger than a black-box answer because the admin can verify exactly where the data came from.

## 2. Cross-bureau comparison

Credit Vivo should compare the same account across Experian, Equifax, and TransUnion:
- balance
- status
- pay status
- opened date
- reported date
- DOFD/removal date
- original creditor
- remarks

## 3. Customer-friendly roadmap

Customers should not see scary backend terms. They should see:
- Profile Cleanup
- Collection Review
- Bureau Match Review
- Reporting Accuracy Review
- Factual Review
- Track Progress

## 4. Admin review before action

Parser output should never automatically send disputes. The moat is the review workflow:
- confidence scoring
- evidence snippets
- admin approval
- customer approval
- mail tracking
- response tracking

## 5. Feedback loop

Every admin correction should improve the parser:
- missed creditor alias
- missed field
- wrong category
- wrong confidence
- bad block split
- bureau-specific pattern

This creates a private Credit Vivo knowledge base over time.

## Next upgrades after v16

1. Add creditor alias library
2. Add bureau-specific page templates
3. Add correction feedback database
4. Add parser regression tests
5. Add side-by-side 3-bureau workbook export
6. Add document confidence report
7. Add scanned PDF OCR option using self-hosted OCR if needed
