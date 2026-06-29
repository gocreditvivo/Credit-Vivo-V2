from credit_vivo_proprietary_engine import parse_reports, result_to_dict, write_outputs
from openpyxl import load_workbook

SAMPLE = """
--- PAGE 1 ---
Experian Credit Report

MIDLAND CREDIT MANAGEMENT
Account Number: 1234567890
Account Type: Collection
Original Creditor: CAPITAL ONE BANK
Balance: $1,234
Status: Collection
Date Opened: 01/10/2021
Date Reported: 04/01/2026
Remarks: Account placed for collection

--- PAGE 2 ---
CAPITAL ONE
Account Number: 999988881111
Account Type: Credit Card
Balance: $0
Status: Charge-off transferred or sold
Date Opened: 05/01/2019
Date of First Delinquency: 10/01/2020
"""

SAMPLE_EQUIFAX = """
--- PAGE 1 ---
Equifax Credit Report

MIDLAND CREDIT MANAGEMENT
Account Number: 1234567890
Account Type: Collection
Original Creditor: CAPITAL ONE BANK
Balance: $1,999
Status: Collection Account
Date Opened: 01/10/2021
Date Reported: 05/01/2026
Date of First Delinquency: 02/01/2021
Remarks: Account placed for collection
"""

SAMPLE_TRANSUNION = """
--- PAGE 1 ---
TransUnion Credit Report

MIDLAND CREDIT MANAGEMENT
Account Number: 1234567890
Account Type: Collection
Original Creditor: CAPITAL ONE BANK
Balance: $1,234
Status: Paid collection
Date Opened: 01/10/2021
Date Reported: 04/01/2026
Date of First Delinquency: 01/01/2021
Remarks: Account placed for collection
"""

BOILERPLATE_SAMPLE = """
--- PAGE 1 ---
Experian Credit Report

For more information, go to www.consumerfinance.gov/learnmore for additional information.
Supplying information to a consumer reporting agency violates the FCRA if you know or have reasonable cause to believe the information is inaccurate.
This section represents the last reported status of the account.
Account types is good for your credit.
The company must give you the name, address, and phone number of the furnisher.
"""

REALISTIC_EQUIFAX = """
--- PAGE 1 ---
Equifax Credit Report

CREDIT ONE BANK
PO Box 98873, Las Vegas, NV 89193-8873 | (877) 825-3242 Date Reported: 03/11/2026 | Balance: $488
Account Number: *6902 | Owner: Individual Account Credit Limit: $500 | High Credit: $696
Loan/Account Type: Credit Card | Status: Pays As Agreed

Date Opened: 12/27/2022 Date of 1st Delinquency: Terms Frequency: Monthly
Date of Last Activity: 03/11/2026 Date Major Delinquency 1st Reported: Months Reviewed: 38
Scheduled Payment Amount: $30 Amount Past Due: $60
Actual Payment Amount: Charge Off Amount: Balloon Payment Amount:
Date of Last Payment: 02/11/2026 Date Closed: Balloon Payment Date:
"""

REALISTIC_EXPERIAN = """
--- PAGE 1 ---
Experian Credit Report

Account information disputed by consumer (Meets requirement
of the Fair Credit Reporting Act).
CREDIT ONE BANK
POTENTIALLY NEGATIVE
Account Info
Account Name CREDIT ONE BANK
Account Number 444796XXXXXXXXXX
Account Type Credit card
Responsibility Individual
Date Opened 12/27/2022
Status Open.
Status Updated Sep 2023
Balance $488
Balance Updated 03/11/2026
Recent Payment -
Monthly Payment $30
Credit Limit $500
Highest Balance $696
Terms -
Payment History
30 days past due as of Aug 2023
By Apr 2030, this account is scheduled to go to a positive status.
"""

REALISTIC_TRANSUNION = """
--- PAGE 1 ---
TransUnion Credit Report

CREDIT ONE BANK
444796268171****
Account Information
Address PO BOX 98872 LAS VEGAS, NV 89193-8872
Monthly Payment $30
Date Opened 12/27/2022
Responsibility Individual Account
Account Type Revolving Account
Loan Type CREDIT CARD
Balance $488
Date Updated 03/11/2026
Payment Received $0
Last Payment Made 02/11/2026
Pay Status Current Account
Terms $30 per month; paid Monthly
High Balance (Hist.)
High balance of $696 from 10/2023 to 03/2026
Credit Limit (Hist.)
Credit limit of $500 from 10/2023 to 03/2026
"""

def test_parse_sample_report(tmp_path):
    result = parse_reports({
        "experian.pdf": {"text": SAMPLE, "bureau": "Experian"},
        "equifax.pdf": {"text": SAMPLE_EQUIFAX, "bureau": "Equifax"},
        "transunion.pdf": {"text": SAMPLE_TRANSUNION, "bureau": "TransUnion"},
    })
    data = result_to_dict(result)
    assert data["paid_ai_used"] is False
    assert data["tradelines"]
    assert data["issues"]
    labels = {x["customer_label"] for x in data["issues"]}
    assert "Collection review" in labels or "Charge-off review" in labels
    assert data["letter_workflow"]["send_letters_automatically"] is False
    assert "FCRA" in data["letter_workflow"]["fcra_notice_of_dispute"]
    assert "formal notice of dispute" in data["letter_workflow"]["fcra_notice_of_dispute"]
    assert "written results" in data["letter_workflow"]["fcra_notice_of_dispute"]
    assert data["letter_workflow"]["fcra_notice_rules"]["consumer_notice_contents"]
    assert data["letter_workflow"]["fcra_notice_rules"]["bureau_dispute_rules"]
    assert data["letter_workflow"]["fcra_notice_rules"]["furnisher_dispute_rules"]
    assert data["letter_workflow"]["fcra_notice_rules"]["credit_vivo_controls"]
    assert data["recommended_letter_queue"]
    assert data["recommended_letter_queue"][0]["tracking_status"] == "draft_not_sent"
    assert data["recommended_letter_queue"][0]["customer_approval_required"] is True
    assert data["recommended_letter_queue"][0]["letter_subject"]
    assert "DRAFT" in data["recommended_letter_queue"][0]["draft_letter_body"]
    assert "CUSTOMER REVIEW AND APPROVAL REQUIRED" in data["recommended_letter_queue"][0]["draft_letter_body"]
    assert "FCRA" in data["recommended_letter_queue"][0]["draft_letter_body"]
    assert data["fcra_review"]
    assert data["fcra_review"][0]["dispute_history_complete"] is False
    assert data["metro2_fcra_review"]
    metro2_fields = {
        field
        for row in data["metro2_fcra_review"]
        for field in row["metro2_fields_to_review"]
    }
    assert "Current Balance" in metro2_fields
    assert "Date of First Delinquency" in metro2_fields
    assert any("FCRA 611" in section for row in data["metro2_fcra_review"] for section in row["fcra_sections"])
    assert data["metro2_requirement_review"]
    requirement_profiles = {row["metro2_profile"] for row in data["metro2_requirement_review"]}
    assert "Collection account" in requirement_profiles
    assert "Charge-off account" in requirement_profiles or "Closed, sold, transferred, or assigned account" in requirement_profiles
    requirement_text = " ".join(
        " ".join(row["required_core_fields"]) + " " +
        " ".join(row["missing_or_needs_validation"]) + " " +
        " ".join(row["warning_flags"])
        for row in data["metro2_requirement_review"]
    )
    assert "Date of First Delinquency" in requirement_text
    assert "Original Creditor" in requirement_text
    assert "Validate against official licensed CDIA Metro 2 CRRG" in " ".join(
        row["production_note"] for row in data["metro2_requirement_review"]
    )
    assert data["fcra_compliance_review"]
    fcra_areas = {row["fcra_area"] for row in data["fcra_compliance_review"]}
    assert "FCRA accuracy and completeness" in fcra_areas
    assert "Bureau reinvestigation duty" in fcra_areas
    assert "Direct furnisher dispute" in fcra_areas
    assert "DOFD and obsolete information review" in fcra_areas
    assert "Disputed-account notation" in fcra_areas
    fcra_text = " ".join(
        row["law_reference"] + " " +
        row["plain_english"] + " " +
        " ".join(row["scanner_signals"]) + " " +
        row["tracking_action"]
        for row in data["fcra_compliance_review"]
    )
    assert "FCRA 611" in fcra_text
    assert "FCRA 623" in fcra_text
    assert "Regulation V 12 CFR 1022.43" in fcra_text
    assert "dispute notation" in fcra_text
    cross_labels = {x["customer_label"] for x in data["issues"] if x["issue_type"].startswith("cross_bureau")}
    assert "Balance differs across bureaus" in cross_labels
    assert "Status differs across bureaus" in cross_labels
    assert "Dates differ across bureaus" in cross_labels

    write_outputs(result, tmp_path)
    assert (tmp_path / "credit_vivo_parser_result.json").exists()
    assert (tmp_path / "tradelines.csv").exists()
    assert (tmp_path / "review_issues.csv").exists()
    workbook_path = tmp_path / "credit_vivo_desktop_scanner_output.xlsx"
    assert workbook_path.exists()
    workbook = load_workbook(workbook_path, read_only=True)
    assert workbook.sheetnames == [
        "Summary",
        "3 Bureau Comparison",
        "Detected Errors",
        "Review Items",
        "Metro 2 + FCRA Review",
        "Metro 2 Requirements",
        "FCRA Compliance Review",
        "FCRA Notice Rules",
        "Dispute Methods",
        "Dispute SOP",
        "Draft Letters",
        "FCRA Review",
    ]
    comparison = workbook["3 Bureau Comparison"]
    headers = [comparison.cell(row=1, column=column).value for column in range(1, comparison.max_column + 1)]
    assert headers[0] == "Account Name"
    assert headers[1].startswith("Equifax ")
    assert "Equifax Balance" in headers
    assert "Equifax Raw Evidence" in headers
    assert "Experian Balance" in headers
    assert "Experian Account #" in headers
    assert "Experian Raw Evidence" in headers
    assert "Equifax Balance" in headers
    assert "TransUnion Balance" in headers
    assert headers[-20:] == [
        "Errors",
        "Findings",
        "Dispute Targets",
        "Primary Dispute Method",
        "Secondary Dispute Methods",
        "Metro 2 Field Focus",
        "CFPB/CFPA Escalation Trigger",
        "Bureau Dispute Draft",
        "Furnisher Dispute Draft",
        "SOP Round",
        "SOP Status",
        "SOP Timing",
        "SOP Required Packet",
        "SOP Tracking Checklist",
        "SOP Approval Gate",
        "SOP Escalation Rule",
        "Tracking Status",
        "Missing Bureaus",
        "Matched Bureaus",
        "Group ID",
    ]
    errors_column = headers.index("Errors") + 1
    bureau_letter_column = headers.index("Bureau Dispute Draft") + 1
    furnisher_letter_column = headers.index("Furnisher Dispute Draft") + 1
    primary_method_column = headers.index("Primary Dispute Method") + 1
    secondary_method_column = headers.index("Secondary Dispute Methods") + 1
    metro2_focus_column = headers.index("Metro 2 Field Focus") + 1
    sop_round_column = headers.index("SOP Round") + 1
    sop_tracking_column = headers.index("SOP Tracking Checklist") + 1
    comparison_flags = " ".join(
        str(comparison.cell(row=row, column=errors_column).value or "")
        for row in range(2, comparison.max_row + 1)
    )
    assert "Balance differs" in comparison_flags
    assert "Status differs" in comparison_flags
    assert "DOFD differs" in comparison_flags
    bureau_letters = " ".join(
        str(comparison.cell(row=row, column=bureau_letter_column).value or "")
        for row in range(2, comparison.max_row + 1)
    )
    furnisher_letters = " ".join(
        str(comparison.cell(row=row, column=furnisher_letter_column).value or "")
        for row in range(2, comparison.max_row + 1)
    )
    assert "To: Credit Bureau" in bureau_letters
    assert "forward all relevant dispute information to the furnisher" in bureau_letters
    assert "To: Furnisher / Collector" in furnisher_letters
    assert "basis for reporting" in furnisher_letters
    primary_methods = " ".join(
        str(comparison.cell(row=row, column=primary_method_column).value or "")
        for row in range(2, comparison.max_row + 1)
    )
    secondary_methods = " ".join(
        str(comparison.cell(row=row, column=secondary_method_column).value or "")
        for row in range(2, comparison.max_row + 1)
    )
    metro2_focus = " ".join(
        str(comparison.cell(row=row, column=metro2_focus_column).value or "")
        for row in range(2, comparison.max_row + 1)
    )
    assert "FCRA Bureau Dispute" in primary_methods
    assert "Direct Furnisher Dispute" in secondary_methods
    assert "Current Balance" in metro2_focus
    sop_rounds = " ".join(
        str(comparison.cell(row=row, column=sop_round_column).value or "")
        for row in range(2, comparison.max_row + 1)
    )
    sop_tracking = " ".join(
        str(comparison.cell(row=row, column=sop_tracking_column).value or "")
        for row in range(2, comparison.max_row + 1)
    )
    assert "Round 1 bureau dispute" in sop_rounds
    assert "tracking number" in sop_tracking
    expert = workbook["Metro 2 + FCRA Review"]
    expert_headers = [expert.cell(row=1, column=column).value for column in range(1, expert.max_column + 1)]
    assert "Metro 2 Fields To Review" in expert_headers
    assert "FCRA Sections / Duties" in expert_headers
    requirements = workbook["Metro 2 Requirements"]
    requirement_headers = [requirements.cell(row=1, column=column).value for column in range(1, requirements.max_column + 1)]
    assert "Metro 2 Profile" in requirement_headers
    assert "Required/Core Fields" in requirement_headers
    assert "Missing / Needs Validation" in requirement_headers
    requirements_text = " ".join(
        str(requirements.cell(row=row, column=column).value or "")
        for row in range(2, requirements.max_row + 1)
        for column in range(1, requirements.max_column + 1)
    )
    assert "Collection account" in requirements_text
    assert "Date of First Delinquency" in requirements_text
    assert "official licensed CDIA Metro 2 CRRG" in requirements_text
    fcra_compliance = workbook["FCRA Compliance Review"]
    fcra_headers = [fcra_compliance.cell(row=1, column=column).value for column in range(1, fcra_compliance.max_column + 1)]
    assert "FCRA Area" in fcra_headers
    assert "Law Reference" in fcra_headers
    assert "Scanner Signals" in fcra_headers
    assert "Tracking Action" in fcra_headers
    fcra_workbook_text = " ".join(
        str(fcra_compliance.cell(row=row, column=column).value or "")
        for row in range(2, fcra_compliance.max_row + 1)
        for column in range(1, fcra_compliance.max_column + 1)
    )
    assert "Bureau reinvestigation duty" in fcra_workbook_text
    assert "Direct furnisher dispute" in fcra_workbook_text
    assert "DOFD and obsolete information review" in fcra_workbook_text
    assert "FCRA 623" in fcra_workbook_text
    notice_rules = workbook["FCRA Notice Rules"]
    notice_rule_text = " ".join(
        str(notice_rules.cell(row=row, column=2).value or "")
        for row in range(2, notice_rules.max_row + 1)
    )
    assert "customer approval required" in notice_rule_text
    assert "written reinvestigation results" in notice_rule_text
    dispute_methods = workbook["Dispute Methods"]
    method_text = " ".join(
        str(dispute_methods.cell(row=row, column=1).value or "") + " " +
        str(dispute_methods.cell(row=row, column=2).value or "")
        for row in range(2, dispute_methods.max_row + 1)
    )
    assert "FCRA Bureau Dispute" in method_text
    assert "Direct Furnisher Dispute" in method_text
    assert "CFPB / CFPA Complaint Escalation" in method_text
    assert "Metro 2 Field-Level Dispute" in method_text
    dispute_sop = workbook["Dispute SOP"]
    sop_text = " ".join(
        str(dispute_sop.cell(row=row, column=1).value or "") + " " +
        str(dispute_sop.cell(row=row, column=2).value or "") + " " +
        str(dispute_sop.cell(row=row, column=9).value or "")
        for row in range(2, dispute_sop.max_row + 1)
    )
    assert "Round 1" in sop_text
    assert "Round 2" in sop_text
    assert "Round 3" in sop_text
    assert "CFPB" in sop_text
    draft_letters = (tmp_path / "draft_dispute_letters.txt").read_text(encoding="utf-8")
    assert "DRAFT" in draft_letters
    assert "CUSTOMER REVIEW AND APPROVAL REQUIRED" in draft_letters


def test_boilerplate_disclosure_text_is_not_a_tradeline():
    result = parse_reports({"experian_boilerplate.pdf": {"text": BOILERPLATE_SAMPLE, "bureau": "Experian"}})
    data = result_to_dict(result)
    assert data["tradelines"] == []
    assert data["issues"] == []


def test_parser_fills_columns_from_realistic_bureau_snippets():
    result = parse_reports({
        "equifax_realistic.pdf": {"text": REALISTIC_EQUIFAX, "bureau": "Equifax"},
        "experian_realistic.pdf": {"text": REALISTIC_EXPERIAN, "bureau": "Experian"},
        "transunion_realistic.pdf": {"text": REALISTIC_TRANSUNION, "bureau": "TransUnion"},
    })
    data = result_to_dict(result)
    by_bureau = {item["bureau"]: item for item in data["tradelines"]}

    assert by_bureau["Equifax"]["account_name"] == "CREDIT ONE BANK"
    assert by_bureau["Equifax"]["account_type"] == "Credit Card"
    assert by_bureau["Equifax"]["responsibility"] == "Individual"
    assert by_bureau["Equifax"]["credit_limit"] == "$500"
    assert by_bureau["Equifax"]["high_credit_or_original_amount"] == "$696"
    assert by_bureau["Equifax"]["past_due"] == "$60"
    assert by_bureau["Equifax"]["date_last_payment"] == "02/11/2026"

    assert by_bureau["Experian"]["account_name"] == "CREDIT ONE BANK"
    assert by_bureau["Experian"]["balance"] == "$488"
    assert by_bureau["Experian"]["date_reported"] == "03/11/2026"
    assert by_bureau["Experian"]["credit_limit"] == "$500"
    assert by_bureau["Experian"]["high_credit_or_original_amount"] == "$696"
    assert "disputed by consumer" in by_bureau["Experian"]["remarks"].lower()

    assert by_bureau["TransUnion"]["account_name"] == "CREDIT ONE BANK"
    assert by_bureau["TransUnion"]["account_number_masked"].endswith("8171")
    assert by_bureau["TransUnion"]["account_type"] == "Revolving Account"
    assert by_bureau["TransUnion"]["status"] == "Current Account"
    assert by_bureau["TransUnion"]["date_reported"] == "03/11/2026"
    assert by_bureau["TransUnion"]["date_last_payment"] == "02/11/2026"
    assert by_bureau["TransUnion"]["credit_limit"] == "$500"
    assert by_bureau["TransUnion"]["high_credit_or_original_amount"] == "$696"


def test_original_creditor_alone_does_not_merge_collection_with_card():
    result = parse_reports({
        "equifax_macys.pdf": {"bureau": "Equifax", "text": """
--- PAGE 1 ---
Equifax Credit Report

MACYS/CITIBANK NA - Closed
PO BOX 6789, SIOUX FALLS, SD 57117-6789 Date Reported: 12/25/2019 | Balance: $0
Account Number: *0540 | Owner: Individual Account Credit Limit: $100 | High Credit: $99
Loan/Account Type: Charge Account | Status: Pays As Agreed
"""},
        "transunion_midland.pdf": {"bureau": "TransUnion", "text": """
--- PAGE 1 ---
TransUnion Credit Report

MIDLAND CREDIT MANAGEMENT INC
32075****
Date Opened 02/17/2022
Responsibility Individual Account
Account Type Open Account
Loan Type FACTORING COMPANY ACCOUNT
Balance $1,445
Date Updated 03/19/2026
High Balance $1,127
Original Creditor CITIBANK N A
Pay Status >Collection<
Remarks Account information disputed by consumer (FCRA); >PLACED FOR COLLECTION<
"""},
    })
    data = result_to_dict(result)
    assert len(data["tradelines"]) == 2
    assert data["cross_bureau_groups"] == []
