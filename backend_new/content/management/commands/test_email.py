from django.core.management.base import BaseCommand
from content.utils import test_email_connection


class Command(BaseCommand):
    help = 'Test email configuration and send a test email'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Testing email configuration...'))
        
        success = test_email_connection()
        
        if success:
            self.stdout.write(self.style.SUCCESS('✅ Email test completed successfully!'))
        else:
            self.stdout.write(self.style.ERROR('❌ Email test failed. Check the logs for details.'))
