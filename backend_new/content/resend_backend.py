"""
Resend email backend for Django.

Drop-in replacement for content/sendgrid_backend.py.
Uses the Resend Python SDK to send emails while remaining fully compatible
with Django's EmailMultiAlternatives / EmailMessage interface.

All business logic, templates, and triggers in utils.py and signals.py are
unchanged — only this transport layer is swapped.
"""
import logging
import resend

from django.core.mail.backends.base import BaseEmailBackend
from django.conf import settings

logger = logging.getLogger(__name__)


class ResendBackend(BaseEmailBackend):
    """
    A Django email backend that sends via the Resend API.

    Compatible with:
    - django.core.mail.send_mail()
    - EmailMultiAlternatives (HTML + plain text)
    - EmailMessage (plain text only)

    Required Django setting:
        RESEND_API_KEY = os.getenv('RESEND_API_KEY')

    Optional Django settings:
        DEFAULT_FROM_EMAIL  — used as the from address
    """

    def __init__(self, fail_silently=False, **kwargs):
        super().__init__(fail_silently=fail_silently, **kwargs)

        self.api_key = getattr(settings, 'RESEND_API_KEY', None)

        if not self.api_key:
            msg = "RESEND_API_KEY is required but not set in Django settings."
            logger.error(msg)
            if not self.fail_silently:
                raise ValueError(msg)

        # Configure the resend SDK with the API key
        resend.api_key = self.api_key

    def send_messages(self, email_messages):
        """
        Send one or more EmailMessage objects.
        Returns the number of messages successfully sent.
        """
        if not self.api_key:
            return 0

        num_sent = 0
        for message in email_messages:
            if self._send(message):
                num_sent += 1
        return num_sent

    def _send(self, email_message):
        """Send a single EmailMessage via Resend API."""
        try:
            # ── From address ────────────────────────────────────────────────
            from_email = email_message.from_email or settings.DEFAULT_FROM_EMAIL

            # ── Recipients ──────────────────────────────────────────────────
            to = list(email_message.to)
            if not to:
                logger.warning("Resend: skipping email with no 'to' recipients.")
                return False

            # ── Subject ─────────────────────────────────────────────────────
            subject = email_message.subject or "(no subject)"

            # ── Body — prefer HTML if available, else plain text ────────────
            html_body = None
            text_body = email_message.body or ""

            # EmailMultiAlternatives attaches HTML as an alternative
            if hasattr(email_message, 'alternatives') and email_message.alternatives:
                for content, mimetype in email_message.alternatives:
                    if mimetype == 'text/html':
                        html_body = content
                        break

            # Build the payload dict
            params: resend.Emails.SendParams = {
                "from": from_email,
                "to": to,
                "subject": subject,
                "text": text_body,
            }

            if html_body:
                params["html"] = html_body

            # ── CC / BCC ────────────────────────────────────────────────────
            if getattr(email_message, 'cc', None):
                params["cc"] = list(email_message.cc)

            if getattr(email_message, 'bcc', None):
                params["bcc"] = list(email_message.bcc)

            # ── Reply-To ────────────────────────────────────────────────────
            if getattr(email_message, 'reply_to', None):
                # Resend expects a single string for reply_to
                params["reply_to"] = list(email_message.reply_to)

            # ── Send ────────────────────────────────────────────────────────
            response = resend.Emails.send(params)

            logger.info(
                f"Resend: email sent to {to} | "
                f"subject='{subject}' | id={response.get('id', 'unknown')}"
            )
            return True

        except Exception as e:
            logger.error(f"Resend: failed to send email to {email_message.to}: {e}")
            if not self.fail_silently:
                raise
            return False
