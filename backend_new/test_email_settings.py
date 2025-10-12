#!/usr/bin/env python
"""
Quick script to test email settings
Run this with: python test_email_settings.py
"""

import os
import django
from django.conf import settings

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'floneo_backend.settings')
django.setup()

from content.utils import test_email_connection

def main():
    print("🔧 Current Email Configuration:")
    print(f"EMAIL_BACKEND: {settings.EMAIL_BACKEND}")
    print(f"SENDGRID_API_KEY: {'SET' if getattr(settings, 'SENDGRID_API_KEY', None) else 'NOT SET'}")
    print(f"DEFAULT_FROM_EMAIL: {settings.DEFAULT_FROM_EMAIL}")
    print()

    print("🧪 Testing SendGrid email...")
    success = test_email_connection()

    if success:
        print("✅ SendGrid email configuration is working!")
        print("📧 Check your email inbox for the test message.")
    else:
        print("❌ SendGrid email configuration failed!")
        print()
        print("🔍 Setup Instructions:")
        print("1. Go to https://app.sendgrid.com/")
        print("2. Sign up for a free account")
        print("3. Go to Settings > API Keys")
        print("4. Create a new API key with 'Mail Send' permissions")
        print("5. Add SENDGRID_API_KEY to your Render environment variables")
        print("6. Verify your sender email address in SendGrid")

if __name__ == "__main__":
    main()
