from operator_ai import (
    ApprovalLevel,
    OperatorEvent,
    approval_for_action,
    build_operator_brief,
    recommend_operator_action,
)


def test_safe_health_check_can_be_auto_safe():
    event = OperatorEvent(
        area="website",
        event_type="down",
        severity="high",
        detail="Website health check failed.",
    )

    action = recommend_operator_action(event)

    assert action["recommended_action_type"] == "website_health_check"
    assert action["approval_required"] is False
    assert action["approval_level"] == ApprovalLevel.AUTO_SAFE.value


def test_compliance_letter_requires_approval():
    event = OperatorEvent(
        area="compliance",
        event_type="letter_ready",
        severity="high",
        detail="Dispute letter is ready.",
        customer_id="customer_123",
    )

    action = recommend_operator_action(event)

    assert action["recommended_action_type"] == "send_dispute_letter"
    assert action["approval_required"] is True
    assert action["approval_level"] == ApprovalLevel.COMPLIANCE_APPROVAL.value


def test_unknown_action_defaults_to_founder_approval():
    assert approval_for_action("new_unknown_action") == ApprovalLevel.FOUNDER_APPROVAL


def test_operator_brief_prioritizes_high_risk_events():
    brief = build_operator_brief([
        OperatorEvent(area="growth", event_type="campaign_needed", severity="low", detail="Need campaign."),
        OperatorEvent(area="security", event_type="review", severity="critical", detail="Security event."),
    ])

    assert brief["ok"] is True
    assert brief["events_reviewed"] == 2
    assert brief["actions"][0]["area"] == "security"
    assert brief["approval_required_count"] >= 1
