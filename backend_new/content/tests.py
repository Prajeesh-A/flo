from django.contrib.auth.models import User
from django.core import mail
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings
from django.urls import reverse
from rest_framework.test import APIClient

import tempfile

from content.admin import BlogPostAdmin, BlogPostImageInline
from content.models import BlogCategory, BlogPost, BlogPostImage


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
        self.assertEqual(len(mail.outbox), 2)
        self.assertIn("New Contact Form Submission", mail.outbox[0].subject)
        self.assertIn("Thank you for contacting", mail.outbox[1].subject)
        self.assertEqual(mail.outbox[1].to, ["qa@example.com"])

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

        preflight = self.client.options(
            "/api/country-data/",
            HTTP_ORIGIN="https://floneo.co",
            HTTP_ACCESS_CONTROL_REQUEST_METHOD="POST",
        )
        methods = preflight.headers.get("Access-Control-Allow-Methods", "")
        self.assertIn("GET", methods)
        self.assertIn("OPTIONS", methods)
        self.assertNotIn("PUT", methods)
        self.assertNotIn("PATCH", methods)
        self.assertNotIn("DELETE", methods)

    def test_blog_detail_returns_ordered_active_gallery_images(self):
        with tempfile.TemporaryDirectory() as media_root, override_settings(MEDIA_ROOT=media_root):
            author = User.objects.create_user(username="blog-admin", password="password")
            category = BlogCategory.objects.create(name="QA", slug="qa", is_active=True)
            blog = BlogPost.objects.create(
                title="QA Multi Image Blog",
                slug="qa-multi-image-blog",
                excerpt="Testing multiple image support.",
                content="<p>Gallery regression content.</p>",
                author=author,
                category=category,
                status="published",
            )

            png = (
                b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01"
                b"\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00"
                b"\x00\x00\x0cIDATx\x9cc\xf8\xff\xff?\x00\x05\xfe\x02"
                b"\xfeA\xe2e\x9a\x00\x00\x00\x00IEND\xaeB`\x82"
            )
            BlogPostImage.objects.create(
                blog_post=blog,
                image=SimpleUploadedFile("second.png", png, content_type="image/png"),
                alt_text="Second image",
                caption="Second caption",
                order=2,
            )
            BlogPostImage.objects.create(
                blog_post=blog,
                image=SimpleUploadedFile("first.png", png, content_type="image/png"),
                alt_text="First image",
                caption="First caption",
                order=1,
            )
            BlogPostImage.objects.create(
                blog_post=blog,
                image=SimpleUploadedFile("hidden.png", png, content_type="image/png"),
                alt_text="Hidden image",
                order=0,
                is_active=False,
            )

            response = self.client.get(f"/api/blogs/{blog.slug}/")

        self.assertEqual(response.status_code, 200, response.content)
        images = response.json()["images"]
        self.assertEqual(len(images), 2)
        self.assertEqual([image["alt_text"] for image in images], ["First image", "Second image"])
        self.assertTrue(images[0]["image_url"].startswith("http://testserver/media/blog/gallery/"))

    def test_blog_admin_exposes_multiple_image_inline(self):
        self.assertIn(BlogPostImageInline, BlogPostAdmin.inlines)

        staff = User.objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="password",
        )
        self.client.force_login(staff)
        response = self.client.get(reverse("admin:content_blogpost_add"))

        self.assertEqual(response.status_code, 200, response.content)
        self.assertContains(response, "Blog Post Images")
        self.assertContains(response, "name=\"gallery_images-TOTAL_FORMS\"")
