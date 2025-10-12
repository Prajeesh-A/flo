from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


def send_contact_notification_email(submission):
    """
    Send email notification when a contact form is submitted
    """
    try:
        # Email subject
        subject = f'New Contact Form Submission from {submission.name}'
        
        # Email content
        html_message = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>New Contact Form Submission</title>
            <style>
                body {{
                    font-family: 'Arial', sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }}
                .header {{
                    background: linear-gradient(135deg, #2ECC71, #27AE60);
                    color: white;
                    padding: 30px;
                    text-align: center;
                    border-radius: 10px 10px 0 0;
                }}
                .content {{
                    background: #f9f9f9;
                    padding: 30px;
                    border-radius: 0 0 10px 10px;
                    border: 1px solid #ddd;
                }}
                .field {{
                    margin-bottom: 20px;
                    padding: 15px;
                    background: white;
                    border-radius: 8px;
                    border-left: 4px solid #2ECC71;
                }}
                .field-label {{
                    font-weight: bold;
                    color: #2C2C2E;
                    margin-bottom: 5px;
                }}
                .field-value {{
                    color: #555;
                }}
                .message-field {{
                    background: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    border: 1px solid #ddd;
                    margin-top: 10px;
                }}
                .footer {{
                    text-align: center;
                    margin-top: 30px;
                    padding: 20px;
                    color: #666;
                    font-size: 14px;
                }}
                .timestamp {{
                    color: #888;
                    font-size: 12px;
                }}
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🚀 New Contact Form Submission</h1>
                <p>floneo.co</p>
            </div>
            
            <div class="content">
                <div class="field">
                    <div class="field-label">👤 Full Name:</div>
                    <div class="field-value">{submission.name}</div>
                </div>
                
                <div class="field">
                    <div class="field-label">📧 Email Address:</div>
                    <div class="field-value">{submission.email}</div>
                </div>
                
                <div class="field">
                    <div class="field-label">🏢 Company:</div>
                    <div class="field-value">{submission.company or 'Not provided'}</div>
                </div>
                
                <div class="field">
                    <div class="field-label">💬 Message:</div>
                    <div class="message-field">{submission.message}</div>
                </div>
                
                <div class="field">
                    <div class="field-label">🕒 Submitted At:</div>
                    <div class="field-value timestamp">{submission.submitted_at.strftime('%B %d, %Y at %I:%M %p UTC')}</div>
                </div>
                
                {f'''
                <div class="field">
                    <div class="field-label">🌐 IP Address:</div>
                    <div class="field-value timestamp">{submission.ip_address}</div>
                </div>
                ''' if submission.ip_address else ''}
            </div>
            
            <div class="footer">
                <p>This email was automatically generated from the floneo.co contact form.</p>
                <p>Please respond to the customer directly at: <strong>{submission.email}</strong></p>
            </div>
        </body>
        </html>
        """
        
        # Plain text version
        plain_message = f"""
        New Contact Form Submission - floneo.co
        
        Full Name: {submission.name}
        Email: {submission.email}
        Company: {submission.company or 'Not provided'}
        
        Message:
        {submission.message}
        
        Submitted: {submission.submitted_at.strftime('%B %d, %Y at %I:%M %p UTC')}
        {f'IP Address: {submission.ip_address}' if submission.ip_address else ''}
        
        ---
        Please respond to the customer directly at: {submission.email}
        """
        
        # Send email
        send_mail(
            subject=subject,
            message=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=['admin@floneo.co'],
            html_message=html_message,
            fail_silently=False,
        )
        
        logger.info(f"Contact notification email sent for submission from {submission.email}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send contact notification email: {str(e)}")
        # Don't raise the exception - we don't want email failures to break form submission
        return False


def send_contact_confirmation_email(submission):
    """
    Send confirmation email to the person who submitted the contact form
    """
    try:
        subject = 'Thank you for contacting floneo - We\'ll be in touch soon!'
        
        html_message = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Thank you for contacting floneo</title>
            <style>
                body {{
                    font-family: 'Arial', sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }}
                .header {{
                    background: linear-gradient(135deg, #2ECC71, #27AE60);
                    color: white;
                    padding: 30px;
                    text-align: center;
                    border-radius: 10px 10px 0 0;
                }}
                .content {{
                    background: #f9f9f9;
                    padding: 30px;
                    border-radius: 0 0 10px 10px;
                    border: 1px solid #ddd;
                }}
                .highlight {{
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    border-left: 4px solid #2ECC71;
                    margin: 20px 0;
                }}
                .footer {{
                    text-align: center;
                    margin-top: 30px;
                    padding: 20px;
                    color: #666;
                    font-size: 14px;
                }}
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🎉 Thank You, {submission.name}!</h1>
                <p>Your message has been received</p>
            </div>
            
            <div class="content">
                <p>Hi {submission.name},</p>
                
                <p>Thank you for reaching out to floneo! We've received your message and our team will review it shortly.</p>
                
                <div class="highlight">
                    <h3>What happens next?</h3>
                    <ul>
                        <li>📧 Our team will review your message within 24 hours</li>
                        <li>🤝 A member of our sales team will reach out to discuss your needs</li>
                        <li>🚀 We'll help you get started with floneo's powerful platform</li>
                    </ul>
                </div>
                
                <p>In the meantime, feel free to explore our platform and learn more about how floneo can transform your business operations.</p>
                
                <p>Best regards,<br>
                <strong>The floneo Team</strong></p>
            </div>
            
            <div class="footer">
                <p>If you have any urgent questions, please don't hesitate to contact us directly at admin@floneo.co</p>
            </div>
        </body>
        </html>
        """
        
        plain_message = f"""
        Thank You, {submission.name}!
        
        Thank you for reaching out to floneo! We've received your message and our team will review it shortly.
        
        What happens next?
        - Our team will review your message within 24 hours
        - A member of our sales team will reach out to discuss your needs  
        - We'll help you get started with floneo's powerful platform
        
        In the meantime, feel free to explore our platform and learn more about how floneo can transform your business operations.
        
        Best regards,
        The floneo Team
        
        ---
        If you have any urgent questions, please contact us at admin@floneo.co
        """
        
        send_mail(
            subject=subject,
            message=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[submission.email],
            html_message=html_message,
            fail_silently=False,
        )
        
        logger.info(f"Contact confirmation email sent to {submission.email}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send contact confirmation email: {str(e)}")
        return False
