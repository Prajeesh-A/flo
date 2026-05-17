from django.contrib.auth.models import User
from django.test import TestCase, override_settings
from rest_framework.test import APIClient


@override_settings(
    EMAIL_BACKEND="django.core.mail.backends.locmem.EmailBackend",
    CORS_ALLOWED_ORIGINS=["https://floneo.co"],
    CORS_ALLOW_ALL_ORIGINS=False,
)
class PublicApiRegressionTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_public_cms_mutation_endpoints_are_read_only(self):
        payload = {
            "name": "QA Country",
            "flag_emoji": "QA",
            "country_code": "QA",
            "is_active": True,
            "order": 1,
        }

        for path in ("/api/country-data/", "/api/video-tabs/", "/api/demo-tabs/"):
            response = self.client.post(path, payload, format="json")
            self.assertIn(response.status_code, (403, 405), path)
            options = self.client.options(path)
            if "Allow" in options.headers:
                self.assertNotIn("POST", options.headers.get("Allow", ""))
            self.assertNotIn(
                "POST",
                options.headers.get("Access-Control-Allow-Methods", ""),
            )

    def test_public_forms_still_accept_valid_submissions(self):
        contact = self.client.post(
            "/api/contact-submissions/",
            {
                "name": "QA Contact",
                "email": "qa@example.com",
                "company": "QA",
                "phone": "+91 9999999999",
                "message": "This is a regression test contact submission.",
            },
            format="json",
        )
        self.assertEqual(contact.status_code, 201, contact.content)

        newsletter = self.client.post(
            "/api/newsletter/subscribe/",
            {"email": "subscriber@example.com"},
            format="json",
        )
        self.assertEqual(newsletter.status_code, 201, newsletter.content)

        duplicate = self.client.post(
            "/api/newsletter/subscribe/",
            {"email": "subscriber@example.com"},
            format="json",
        )
        self.assertEqual(duplicate.status_code, 200, duplicate.content)
        self.assertTrue(duplicate.json()["already_subscribed"])

    def test_emergency_triggers_require_staff_authentication(self):
        for path in ("/api/populate-data/", "/api/setup-blogs/", "/api/test-email/"):
            response = self.client.get(path)
            self.assertIn(response.status_code, (401, 403), path)

        staff = User.objects.create_user(
            username="staff",
            password="password",
            is_staff=True,
        )
        self.client.force_authenticate(staff)
        response = self.client.get("/api/test-email/")
        self.assertEqual(response.status_code, 200, response.content)

    def test_cors_does_not_reflect_untrusted_origins(self):
        trusted = self.client.get("/api/hero/", HTTP_ORIGIN="https://floneo.co")
        self.assertEqual(
            trusted.headers.get("Access-Control-Allow-Origin"),
            "https://floneo.co",
        )
        self.assertNotIn(
            "POST",
            trusted.headers.get("Access-Control-Allow-Methods", ""),
        )

        untrusted = self.client.get(
            "/api/hero/",
            HTTP_ORIGIN="https://evil.example",
        )
        self.assertNotEqual(
            untrusted.headers.get("Access-Control-Allow-Origin"),
            "https://evil.example",
        )
