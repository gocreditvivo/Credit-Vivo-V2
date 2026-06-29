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
        "FCRA Notice Rules",
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
    assert headers[-5:] == ["Errors", "Findings", "Missing Bureaus", "Matched Bureaus", "Group ID"]
    errors_column = headers.index("Errors") + 1
    comparison_flags = " ".join(
        str(comparison.cell(row=row, column=errors_column).value or "")
        for row in range(2, comparison.max_row + 1)
    )
    assert "Balance differs" in comparison_flags
    assert "Status differs" in comparison_flags
    assert "DOFD differs" in comparison_flags
    expert = workbook["Metro 2 + FCRA Review"]
    expert_headers = [expert.cell(row=1, column=column).value for column in range(1, expert.max_column + 1)]
    assert "Metro 2 Fields To Review" in expert_headers
    assert "FCRA Sections / Duties" in expert_headers
    notice_rules = workbook["FCRA Notice Rules"]
    notice_rule_text = " ".join(
        str(notice_rules.cell(row=row, column=2).value or "")
        for row in range(2, notice_rules.max_row + 1)
    )
    assert "customer approval required" in notice_rule_text
    assert "written reinvestigation results" in notice_rule_text
    draft_letters = (tmp_path / "draft_dispute_letters.txt").read_text(encoding="utf-8")
    assert "DRAFT" in draft_letters
    assert "CUSTOMER REVIEW AND APPROVAL REQUIRED" in draft_letters


def test_boilerplate_disclosure_text_is_not_a_tradeline():
    result = parse_reports({"experian_boilerplate.pdf": {"text": BOILERPLATE_SAMPLE, "bureau": "Experian"}})
    data = result_to_dict(result)
    assert data["tradelines"] == []
    assert data["issues"] == []
