"""
Resend email backend for Django.
Uses the Resend Python SDK — compatible with EmailMultiAlternatives / EmailMessage.
"""
import logging
import resend

from django.core.mail.backends.base import BaseEmailBackend
from django.conf import settings

logger = logging.getLogger(__name__)


class ResendBackend(BaseEmailBackend):
    """
    A Django email backend that sends via the Resend API.

    Required Railway env var:  RESEND_API_KEY
    Optional Railway env var:  DEFAULT_FROM_EMAIL  (must be a verified sender)

    Common issues:
    - Sender domain not verified in Resend dashboard → resend.com/domains
    - Using onboarding@resend.dev without domain verification only allows
      sending to the email you registered with on Resend
    """

    def __init__(self, fail_silently=False, **kwargs):
        super().__init__(fail_silently=fail_silently, **kwargs)
        self.api_key = getattr(settings, 'RESEND_API_KEY', None)

        if not self.api_key:
            msg = "RESEND_API_KEY is not set. Email sending is disabled."
            logger.error(msg)
            if not self.fail_silently:
                raise ValueError(msg)

        resend.api_key = self.api_key

    def send_messages(self, email_messages):
        if not self.api_key:
            return 0
        num_sent = 0
        for message in email_messages:
            if self._send(message):
                num_sent += 1
        return num_sent

    def _send(self, email_message):
        try:
            from_email = email_message.from_email or settings.DEFAULT_FROM_EMAIL
            to = list(email_message.to)

            if not to:
                logger.warning("Resend: skipping — no 'to' recipients.")
                return False

            subject  = email_message.subject or "(no subject)"
            text_body = email_message.body or ""
            html_body = None

            if hasattr(email_message, 'alternatives') and email_message.alternatives:
                for content, mimetype in email_message.alternatives:
                    if mimetype == 'text/html':
                        html_body = content
                        break

            params: resend.Emails.SendParams = {
                "from":    from_email,
                "to":      to,
                "subject": subject,
                "text":    text_body,
            }
            if html_body:
                params["html"] = html_body
            if getattr(email_message, 'cc', None):
                params["cc"] = list(email_message.cc)
            if getattr(email_message, 'bcc', None):
                params["bcc"] = list(email_message.bcc)
            if getattr(email_message, 'reply_to', None):
                params["reply_to"] = list(email_message.reply_to)

            # Log attempt — visible in Railway deployment logs
            logger.info(
                f"[Resend] Sending email | from='{from_email}' | to={to} | subject='{subject}'"
            )

            response = resend.Emails.send(params)

            logger.info(
                f"[Resend] SUCCESS | to={to} | subject='{subject}' | id={response.get('id', 'unknown')}"
            )
            return True

        except Exception as e:
            # Full error details so you can debug from Railway logs
            logger.error(
                f"[Resend] FAILED | from='{email_message.from_email}' | to={email_message.to} | "
                f"error={type(e).__name__}: {str(e)}"
            )
            logger.error(
                "[Resend] FIX: Verify your sender domain at resend.com/domains "
                "OR set DEFAULT_FROM_EMAIL=onboarding@resend.dev in Railway and "
                "set CONTACT_EMAIL_RECIPIENT to your Resend-registered email."
            )
            if not self.fail_silently:
                raise
            return False
