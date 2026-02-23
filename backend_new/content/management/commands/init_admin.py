from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.conf import settings
import os

class Command(BaseCommand):
    help = 'Creates a superuser from environment variables if one does not exist'

    def handle(self, *args, **options):
        username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
        email = os.environ.get('DJANGO_SUPERUSER_EMAIL')
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

        if not username or not email or not password:
            self.stdout.write(self.style.WARNING(
                'Missing DJANGO_SUPERUSER environment variables. Skipping admin creation.'
            ))
            return

        if User.objects.filter(username=username).exists():
            # Always update password and ensure superuser/staff flags are set
            user = User.objects.get(username=username)
            user.set_password(password)
            user.email = email
            user.is_superuser = True
            user.is_staff = True
            user.save()
            self.stdout.write(self.style.SUCCESS(f'Superuser "{username}" updated successfully.'))
        else:
            self.stdout.write(f'Creating superuser "{username}"...')
            User.objects.create_superuser(username=username, email=email, password=password)
            self.stdout.write(self.style.SUCCESS(f'Superuser "{username}" created successfully!'))
