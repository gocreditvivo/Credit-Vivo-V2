from main import health


def test_scanner_saves_raw_text_by_default():
    status = health()

    assert status["write_raw_text"] is True
    assert status["pdf_text_engine"] == "pypdf"
