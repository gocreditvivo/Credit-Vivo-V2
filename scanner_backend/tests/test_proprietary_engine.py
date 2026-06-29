from credit_vivo_proprietary_engine import parse_reports, result_to_dict

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

def test_parse_sample_report():
    result = parse_reports({"experian.pdf": {"text": SAMPLE, "bureau": "Experian"}})
    data = result_to_dict(result)
    assert data["paid_ai_used"] is False
    assert data["tradelines"]
    assert data["issues"]
    labels = {x["customer_label"] for x in data["issues"]}
    assert "Collection review" in labels or "Charge-off review" in labels
    assert data["letter_workflow"]["send_letters_automatically"] is False
    assert "FCRA" in data["letter_workflow"]["fcra_notice_of_dispute"]
    assert data["recommended_letter_queue"]
    assert data["recommended_letter_queue"][0]["tracking_status"] == "draft_not_sent"
    assert data["recommended_letter_queue"][0]["customer_approval_required"] is True
    assert data["recommended_letter_queue"][0]["letter_subject"]
    assert "DRAFT" in data["recommended_letter_queue"][0]["draft_letter_body"]
    assert "CUSTOMER REVIEW AND APPROVAL REQUIRED" in data["recommended_letter_queue"][0]["draft_letter_body"]
    assert "FCRA" in data["recommended_letter_queue"][0]["draft_letter_body"]
    assert data["fcra_review"]
    assert data["fcra_review"][0]["dispute_history_complete"] is False
