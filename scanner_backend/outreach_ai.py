from __future__ import annotations

from dataclasses import dataclass
from enum import Enum
from typing import Dict, List


class OutreachStatus(str, Enum):
    COMPILED = "compiled"
    OWNER_NOTIFIED = "owner_notified"
    WAITING_APPROVAL = "waiting_owner_approval"
    READY_TO_EXECUTE = "ready_to_execute"


@dataclass(frozen=True)
class OutreachContact:
    name: str
    partner_type: str
    email: str
    fit_reason: str
    source: str


def compile_partner_contacts(contacts: List[Dict[str, str]]) -> List[OutreachContact]:
    compiled: List[OutreachContact] = []
    seen_emails = set()

    for contact in contacts:
        email = contact.get("email", "").strip().lower()
        if not email or "@" not in email or email in seen_emails:
            continue

        seen_emails.add(email)
        compiled.append(
            OutreachContact(
                name=contact.get("name", "").strip() or "Unknown partner",
                partner_type=contact.get("partner_type", "").strip() or "Referral partner",
                email=email,
                fit_reason=contact.get("fit_reason", "").strip() or "May refer consumers who need credit report review.",
                source=contact.get("source", "").strip() or "public_business_contact",
            )
        )

    return compiled


def draft_owner_notification(contacts: List[OutreachContact]) -> Dict[str, object]:
    partner_types: Dict[str, int] = {}
    for contact in contacts:
        partner_types[contact.partner_type] = partner_types.get(contact.partner_type, 0) + 1

    return {
        "status": OutreachStatus.OWNER_NOTIFIED.value,
        "title": "Growth AI compiled a partner outreach list",
        "message": "Review and approve before any outreach is sent.",
        "contact_count": len(contacts),
        "partner_types": partner_types,
        "approval_required": True,
    }


def build_execution_queue(contacts: List[OutreachContact], owner_approved: bool = False) -> Dict[str, object]:
    status = OutreachStatus.READY_TO_EXECUTE if owner_approved else OutreachStatus.WAITING_APPROVAL

    return {
        "status": status.value,
        "owner_approved": owner_approved,
        "can_send_now": owner_approved,
        "execution_note": (
            "Approved for outreach execution."
            if owner_approved
            else "Outreach is drafted but blocked until owner approval."
        ),
        "tasks": [
            {
                "action": "send_partner_outreach_email" if owner_approved else "draft_partner_outreach_email",
                "partner_name": contact.name,
                "partner_type": contact.partner_type,
                "email": contact.email,
                "fit_reason": contact.fit_reason,
                "status": "ready" if owner_approved else "approval_required",
            }
            for contact in contacts
        ],
    }


def build_outreach_plan(contacts: List[Dict[str, str]], owner_approved: bool = False) -> Dict[str, object]:
    compiled = compile_partner_contacts(contacts)
    return {
        "ok": True,
        "service": "credit-vivo-outreach-ai",
        "workflow": "compile_notify_execute",
        "compiled_contacts": [contact.__dict__ for contact in compiled],
        "owner_notification": draft_owner_notification(compiled),
        "execution_queue": build_execution_queue(compiled, owner_approved=owner_approved),
        "guardrail": "Growth AI may compile and draft. Owner approval is required before outreach is sent.",
    }
