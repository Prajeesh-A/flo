from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from django.core.mail import get_connection
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
        
        # Send email using EmailMultiAlternatives for better HTML support
        email = EmailMultiAlternatives(
            subject=subject,
            body=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[getattr(settings, 'CONTACT_EMAIL_RECIPIENT', 'admin@floneo.co')],  # Send to admin
        )
        email.attach_alternative(html_message, "text/html")
        email.send(fail_silently=False)

        logger.info(f"Contact notification email sent for submission from {submission.email}")
        return True

    except Exception as e:
        logger.error(f"Failed to send contact notification email: {str(e)}")
        logger.error(f"Email settings - HOST: {settings.EMAIL_HOST}, PORT: {settings.EMAIL_PORT}, USER: {settings.EMAIL_HOST_USER}")
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
        
        # Send confirmation email using EmailMultiAlternatives
        email = EmailMultiAlternatives(
            subject=subject,
            body=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[submission.email],
        )
        email.attach_alternative(html_message, "text/html")
        email.send(fail_silently=False)
        
        logger.info(f"Contact confirmation email sent to {submission.email}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send contact confirmation email: {str(e)}")
        return False


def test_email_connection():
    """
    Test the email connection and configuration (Resend).
    Run via: python manage.py test_email
    """
    try:
        # Check if Resend API key is configured
        if hasattr(settings, 'RESEND_API_KEY') and settings.RESEND_API_KEY:
            logger.info("Testing Resend email configuration...")

            # Send a test email — routed through ResendBackend automatically
            email = EmailMultiAlternatives(
                subject='🧪 Test Email from floneo.co',
                body='This is a test email to verify Resend configuration.\n\nIf you receive this email, your Resend setup is working correctly!',
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[getattr(settings, 'CONTACT_EMAIL_RECIPIENT', 'admin@floneo.co')],
            )

            # Add HTML version
            html_content = """
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #4CAF50;">🧪 Resend Test Email</h2>
                    <p>This is a test email to verify your Resend configuration.</p>
                    <p><strong>If you receive this email, your Resend setup is working correctly!</strong></p>
                    <hr style="border: 1px solid #eee; margin: 20px 0;">
                    <p style="color: #666; font-size: 12px;">
                        Sent from floneo.co contact system<br>
                        Powered by Resend
                    </p>
                </body>
            </html>
            """
            email.attach_alternative(html_content, "text/html")
            email.send(fail_silently=False)

            logger.info("✅ Resend test email sent successfully!")
            return True
        else:
            logger.error("❌ RESEND_API_KEY not configured")
            return False

    except Exception as e:
        logger.error(f"❌ Resend email test failed: {str(e)}")
        logger.error(f"Settings - API_KEY: {'SET' if getattr(settings, 'RESEND_API_KEY', None) else 'NOT SET'}, FROM_EMAIL: {settings.DEFAULT_FROM_EMAIL}")
        return False



def send_newsletter_notification_email(subscription):
    """Send notification email to admin when a new newsletter subscriber signs up"""
    try:
        recipient = getattr(settings, 'CONTACT_EMAIL_RECIPIENT', 'admin@floneo.co')
        from_email = settings.DEFAULT_FROM_EMAIL

        subject = f"📬 New Blog Subscriber: {subscription.email}"

        text_content = f"""
New Newsletter Subscription

Email: {subscription.email}
Subscribed At: {subscription.subscribed_at.strftime('%Y-%m-%d %H:%M:%S') if subscription.subscribed_at else 'Just now'}
Source: {subscription.source}

---
This notification was sent from floneo.co
        """.strip()

        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 12px 12px 0 0;">
                        <h2 style="color: white; margin: 0;">📬 New Blog Subscriber</h2>
                    </div>
                    <div style="background: #f8f9fa; padding: 25px; border-radius: 0 0 12px 12px; border: 1px solid #e9ecef;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px; font-weight: bold; color: #495057;">Email:</td>
                                <td style="padding: 10px; color: #212529;">{subscription.email}</td>
                            </tr>
                            <tr style="background: white;">
                                <td style="padding: 10px; font-weight: bold; color: #495057;">Source:</td>
                                <td style="padding: 10px; color: #212529;">{subscription.source}</td>
                            </tr>
                        </table>
                    </div>
                    <p style="color: #666; font-size: 12px; margin-top: 15px; text-align: center;">
                        Sent from floneo.co blog subscription system
                    </p>
                </div>
            </body>
        </html>
        """

        email = EmailMultiAlternatives(
            subject=subject,
            body=text_content,
            from_email=from_email,
            to=[recipient],
        )
        email.attach_alternative(html_content, "text/html")
        email.send(fail_silently=False)

        logger.info(f"✅ Newsletter notification sent to {recipient} for subscriber {subscription.email}")
        return True

    except Exception as e:
        logger.error(f"❌ Newsletter notification email failed: {str(e)}")
        return False


def send_blog_published_notification(blog_post, subscriber_emails: list):
    """
    Send a blog publish notification to all active newsletter subscribers.
    Called automatically by signals.py when a BlogPost status changes to 'published'.

    Args:
        blog_post: The BlogPost model instance that was just published
        subscriber_emails: List of subscriber email strings
    """
    if not subscriber_emails:
        return

    try:
        from_email = settings.DEFAULT_FROM_EMAIL
        site_url = getattr(settings, 'SITE_URL', 'https://floneo.co')

        # Build the blog URL using slug if available, else id
        blog_identifier = blog_post.slug if blog_post.slug else str(blog_post.pk)
        blog_url = f"{site_url}/blogs/{blog_identifier}"

        # Get excerpt for email preview
        excerpt = blog_post.get_excerpt() if hasattr(blog_post, 'get_excerpt') else ''
        if len(excerpt) > 200:
            excerpt = excerpt[:200] + '...'

        # Author name
        author_name = blog_post.author.get_full_name() or blog_post.author.username if blog_post.author else 'Floneo Team'

        # Category
        category_name = blog_post.category.name if blog_post.category else 'General'

        subject = f"📖 New Article: {blog_post.title}"

        html_template = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0; padding:0; background-color:#f4f4f8; font-family: 'Arial', sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f8; padding: 40px 20px;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">

                            <!-- Header -->
                            <tr>
                                <td style="background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%); padding: 32px 40px; border-radius: 16px 16px 0 0; text-align: center;">
                                    <p style="color: #ffffff; font-size: 28px; font-weight: 800; margin: 0; letter-spacing: -0.5px;">floneo</p>
                                    <p style="color: rgba(255,255,255,0.6); font-size: 13px; margin: 6px 0 0 0; text-transform: uppercase; letter-spacing: 2px;">New Article Published</p>
                                </td>
                            </tr>

                            <!-- Body -->
                            <tr>
                                <td style="background: #ffffff; padding: 40px; border-radius: 0 0 16px 16px;">

                                    <!-- Category badge -->
                                    <p style="display: inline-block; background: #f0f4ff; color: #3b5bdb; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 5px 12px; border-radius: 20px; margin: 0 0 20px 0;">
                                        {category_name}
                                    </p>

                                    <!-- Title -->
                                    <h1 style="color: #0a0e27; font-size: 26px; font-weight: 800; line-height: 1.3; margin: 0 0 16px 0;">
                                        {blog_post.title}
                                    </h1>

                                    <!-- Meta: author + read time -->
                                    <p style="color: #9ca3af; font-size: 13px; margin: 0 0 24px 0;">
                                        By <strong style="color: #6b7280;">{author_name}</strong>
                                        &nbsp;·&nbsp;
                                        {blog_post.reading_time} min read
                                    </p>

                                    <!-- Divider -->
                                    <hr style="border: none; border-top: 1px solid #f0f0f0; margin: 0 0 24px 0;">

                                    <!-- Excerpt -->
                                    <p style="color: #4b5563; font-size: 16px; line-height: 1.7; margin: 0 0 32px 0;">
                                        {excerpt}
                                    </p>

                                    <!-- CTA Button -->
                                    <table cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <td align="center">
                                                <a href="{blog_url}"
                                                   style="display: inline-block; background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%); color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 700; padding: 16px 40px; border-radius: 12px; letter-spacing: 0.3px;">
                                                    Read Full Article →
                                                </a>
                                            </td>
                                        </tr>
                                    </table>

                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td style="padding: 28px 0; text-align: center;">
                                    <p style="color: #9ca3af; font-size: 12px; margin: 0 0 6px 0;">
                                        You're receiving this because you subscribed to floneo blog updates.
                                    </p>
                                    <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                                        <a href="{site_url}" style="color: #6b7280; text-decoration: underline;">floneo.co</a>
                                        &nbsp;·&nbsp;
                                        No spam. We only email when we publish.
                                    </p>
                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        """

        plain_text = f"""New article from floneo: {blog_post.title}

By {author_name} · {blog_post.reading_time} min read

{excerpt}

Read the full article: {blog_url}

---
You're receiving this because you subscribed to floneo blog updates.
Unsubscribe: {site_url}
"""

        # Send individually to each subscriber so we don't expose the full list in CC/BCC
        success_count = 0
        fail_count = 0

        for email_address in subscriber_emails:
            try:
                email = EmailMultiAlternatives(
                    subject=subject,
                    body=plain_text,
                    from_email=from_email,
                    to=[email_address],
                )
                email.attach_alternative(html_template, "text/html")
                email.send(fail_silently=False)
                success_count += 1
            except Exception as e:
                logger.warning(f"Failed to send blog notification to {email_address}: {e}")
                fail_count += 1

        logger.info(
            f"✅ Blog notification for '{blog_post.title}': "
            f"{success_count} sent, {fail_count} failed out of {len(subscriber_emails)} subscribers."
        )
        return True

    except Exception as e:
        logger.error(f"❌ Blog published notification failed: {str(e)}")
        return False

