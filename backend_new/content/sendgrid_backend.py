"""
SendGrid email backend for Django
"""
import logging
from django.core.mail.backends.base import BaseEmailBackend
from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, From, To, Subject, PlainTextContent, HtmlContent

logger = logging.getLogger(__name__)


class SendGridBackend(BaseEmailBackend):
    """
    A Django email backend that uses SendGrid API
    """
    
    def __init__(self, fail_silently=False, **kwargs):
        super().__init__(fail_silently=fail_silently, **kwargs)
        self.api_key = getattr(settings, 'SENDGRID_API_KEY', None)
        if not self.api_key:
            if not self.fail_silently:
                raise ValueError("SENDGRID_API_KEY setting is required")
            logger.error("SENDGRID_API_KEY setting is required")
        
        self.client = SendGridAPIClient(api_key=self.api_key) if self.api_key else None
    
    def send_messages(self, email_messages):
        """
        Send one or more EmailMessage objects and return the number of email
        messages sent.
        """
        if not self.client:
            if not self.fail_silently:
                raise ValueError("SendGrid client not initialized")
            return 0
        
        num_sent = 0
        for message in email_messages:
            sent = self._send(message)
            if sent:
                num_sent += 1
        return num_sent
    
    def _send(self, email_message):
        """Send a single email message"""
        try:
            # Create the SendGrid mail object
            mail = Mail()
            
            # Set from email
            from_email = email_message.from_email or settings.DEFAULT_FROM_EMAIL
            mail.from_email = From(from_email)
            
            # Set subject
            mail.subject = Subject(email_message.subject)
            
            # Add recipients
            for recipient in email_message.to:
                mail.add_to(To(recipient))
            
            # Add CC recipients
            if hasattr(email_message, 'cc') and email_message.cc:
                for cc_recipient in email_message.cc:
                    mail.add_cc(cc_recipient)
            
            # Add BCC recipients
            if hasattr(email_message, 'bcc') and email_message.bcc:
                for bcc_recipient in email_message.bcc:
                    mail.add_bcc(bcc_recipient)
            
            # Set content
            if email_message.body:
                mail.add_content(PlainTextContent(email_message.body))
            
            # Add HTML content if available
            if hasattr(email_message, 'alternatives') and email_message.alternatives:
                for content, mimetype in email_message.alternatives:
                    if mimetype == 'text/html':
                        mail.add_content(HtmlContent(content))
                        break
            
            # Send the email
            response = self.client.send(mail)
            
            # Log success
            logger.info(f"Email sent successfully to {email_message.to}. Status: {response.status_code}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email via SendGrid: {str(e)}")
            if not self.fail_silently:
                raise
            return False
