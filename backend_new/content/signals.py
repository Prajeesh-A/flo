"""
Django signals for the content app.

Fires when a BlogPost is published → sends blog notification emails to all
active NewsletterSubscription subscribers.
"""
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
import logging

logger = logging.getLogger(__name__)


@receiver(pre_save, sender='content.BlogPost')
def track_blog_publish_state(sender, instance, **kwargs):
    """
    Before saving, track whether this is a new publish event.
    We mark the instance so post_save knows if status just changed to 'published'.
    """
    instance._was_published_before = False  # default

    if instance.pk:
        try:
            old = sender.objects.get(pk=instance.pk)
            # Only trigger if status is changing TO 'published' (not already published)
            instance._was_published_before = (old.status == 'published')
        except sender.DoesNotExist:
            pass  # New object


@receiver(post_save, sender='content.BlogPost')
def send_blog_notification_on_publish(sender, instance, created, **kwargs):
    """
    After saving a BlogPost, if it just became 'published', send email
    notifications to all active newsletter subscribers.
    """
    if instance.status != 'published':
        return

    # Only send if this is a NEW publish (status just changed to published)
    was_published_before = getattr(instance, '_was_published_before', False)
    if was_published_before:
        return  # Already published before — don't re-notify

    # Fire the bulk notification
    try:
        from .utils import send_blog_published_notification
        from .models import NewsletterSubscription

        subscribers = NewsletterSubscription.objects.filter(is_active=True)
        subscriber_emails = list(subscribers.values_list('email', flat=True))

        if not subscriber_emails:
            logger.info(f"Blog '{instance.title}' published — no active subscribers to notify.")
            return

        logger.info(f"Blog '{instance.title}' published — notifying {len(subscriber_emails)} subscribers.")
        send_blog_published_notification(instance, subscriber_emails)

    except Exception as e:
        logger.error(f"Failed to send blog notification emails: {e}")
