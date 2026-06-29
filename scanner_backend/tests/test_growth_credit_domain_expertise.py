from growth_credit_domain_expertise import build_credit_domain_expertise_brief


def test_credit_domain_expertise_includes_required_topics():
    brief = build_credit_domain_expertise_brief()
    topics = {topic["topic"] for topic in brief["topics"]}

    assert "FCRA" in topics
    assert "FACTA" in topics
    assert "Metro 2" in topics
    assert "Credit report dispute process" in topics
    assert "Soft pull vs hard pull" in topics


def test_credit_domain_expertise_supports_growth_use_cases():
    brief = build_credit_domain_expertise_brief()
    uses = " ".join(brief["how_growth_ai_uses_this"])

    assert "customer-facing language" in uses
    assert "ads and landing pages" in uses
    assert "scanner findings" in uses
    assert brief["service"] == "credit-vivo-growth-credit-domain-expertise"


def test_credit_domain_expertise_has_customer_angles():
    brief = build_credit_domain_expertise_brief()

    assert any("Collection" in angle for angle in brief["example_customer_angles"])
    assert any("auto loan" in angle for angle in brief["example_customer_angles"])
