from growth_ai import GrowthSnapshot
from vivo_command_ai import COMMAND_MISSIONS, build_command_brief


def test_command_missions_include_growth_scanner_operator():
    mission_ids = {mission.id for mission in COMMAND_MISSIONS}

    assert "growth" in mission_ids
    assert "scanner" in mission_ids
    assert "operator" in mission_ids
    assert "compliance" in mission_ids


def test_command_brief_combines_growth_and_operator():
    brief = build_command_brief(
        growth_snapshot=GrowthSnapshot(
            visitors=10000,
            leads=1000,
            free_scans_started=500,
            free_scans_completed=400,
            paid_customers=20,
            monthly_recurring_revenue=900,
        )
    )

    assert brief["ok"] is True
    assert brief["service"] == "vivo-command-ai"
    assert brief["operating_standard"] == "mission_oriented_verify_after_action_approval_gated"
    assert brief["revenue_goal"]["monthly_target"] == 1000000
    assert brief["revenue_goal"]["paid_customer_gap"] == 22203
    assert brief["growth_brief"]["service"] == "credit-vivo-growth-ai"
    assert brief["operator_brief"]["service"] == "credit-vivo-operator-ai"
    assert brief["ai_operating_system"]["service"] == "credit-vivo-ai-operating-system"
    assert brief["top_actions"]


def test_command_brief_keeps_sensitive_actions_approval_gated():
    brief = build_command_brief()

    approval_required = brief["automation_policy"]["approval_required"]

    assert "send customer messages" in approval_required
    assert "send dispute letters" in approval_required
    assert "issue refunds" in approval_required
    assert "refer to attorney/legal provider" in approval_required
