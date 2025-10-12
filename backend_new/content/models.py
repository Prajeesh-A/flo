from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from colorfield.fields import ColorField
from ckeditor.fields import RichTextField
from django.utils import timezone


class HeroSection(models.Model):
    """Hero section content - should only have one instance"""
    is_visible = models.BooleanField(default=True, help_text="Show/hide this section")
    order = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(100)])

    # Content fields
    tagline = models.CharField(max_length=100, default="Build. Automate. Scale.")
    title = models.CharField(max_length=200, default="Low-Code/No-Code Platform")
    description = RichTextField(default="Turn manual processes into instant, powerful applications")
    cta_primary_text = models.CharField(max_length=50, default="Get Started")
    cta_primary_url = models.CharField(max_length=200, default="#", help_text="URL for primary CTA")
    cta_secondary_text = models.CharField(max_length=50, default="Watch Demo")
    cta_secondary_url = models.CharField(max_length=200, default="#", help_text="URL for secondary CTA")

    # Visual fields
    background_image = models.ImageField(upload_to='hero/', blank=True, null=True)
    background_color = ColorField(default='#FFFFFF', help_text="Background color for the section")
    text_color = ColorField(default='#000000', help_text="Text color for the section")

    # Meta fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Hero Section"
        verbose_name_plural = "Hero Section"
        ordering = ['order']

    def __str__(self):
        return f"Hero Section: {self.title}"

    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if not self.pk and HeroSection.objects.exists():
            raise ValueError("Only one Hero Section instance is allowed")
        super().save(*args, **kwargs)


class AboutSection(models.Model):
    """About Us section content - should only have one instance"""
    title = models.CharField(max_length=200, default="About  floneo")
    description = models.TextField(default="We help businesses automate their processes")
    content = models.TextField(default="Detailed about content goes here")

    class Meta:
        verbose_name = "About Section"
        verbose_name_plural = "About Section"

    def __str__(self):
        return f"About Section: {self.title}"

    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if not self.pk and AboutSection.objects.exists():
            raise ValueError("Only one About Section instance is allowed")
        super().save(*args, **kwargs)


class ServiceCard(models.Model):
    """Service cards for the services section"""
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='services/', blank=True, null=True)
    color = models.CharField(max_length=50, default="blue", help_text="CSS color class or hex code")
    order = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Service Card"
        verbose_name_plural = "Service Cards"

    def __str__(self):
        return self.title


class MetricBox(models.Model):
    """Metrics/statistics boxes"""
    value = models.CharField(max_length=10, help_text="e.g., '85', '2.5', '500'")
    suffix = models.CharField(max_length=10, default="%", help_text="e.g., '%', 'K', 'M', 'x'")
    label = models.CharField(max_length=100)
    description = models.TextField()
    color = models.CharField(max_length=50, default="blue", help_text="CSS color class or hex code")
    order = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Metric Box"
        verbose_name_plural = "Metric Boxes"

    def __str__(self):
        return f"{self.value}{self.suffix} - {self.label}"


class FeatureCard(models.Model):
    """Feature cards for the features section"""
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon_name = models.CharField(
        max_length=50,
        default="zap",
        help_text="Lucide icon name (e.g., 'zap', 'bar-chart-3', 'clock', 'shield')"
    )
    order = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Feature Card"
        verbose_name_plural = "Feature Cards"

    def __str__(self):
        return self.title


class AnalyticsSection(models.Model):
    """Analytics section content - should only have one instance"""
    title = models.CharField(max_length=200, default="More than Automation")
    subtitle = models.CharField(max_length=100, default="Our Analytics Feature")
    description = models.TextField(default="Turn Insights Into Savings")
    content = models.TextField(default="Our advanced analytics tools provide you with clear, actionable insights...")
    savings_amount = models.CharField(max_length=20, default="$500+")

    class Meta:
        verbose_name = "Analytics Section"
        verbose_name_plural = "Analytics Section"

    def __str__(self):
        return f"Analytics Section: {self.title}"

    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if not self.pk and AnalyticsSection.objects.exists():
            raise ValueError("Only one Analytics Section instance is allowed")
        super().save(*args, **kwargs)


class Testimonial(models.Model):
    """Customer testimonials"""
    quote = models.TextField()
    author_name = models.CharField(max_length=100)
    author_title = models.CharField(max_length=100)
    author_company = models.CharField(max_length=100, blank=True)
    order = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Testimonial"
        verbose_name_plural = "Testimonials"

    def __str__(self):
        return f"{self.author_name} - {self.author_title}"


class FooterSection(models.Model):
    """Footer section content - should only have one instance"""
    tagline = models.CharField(max_length=100, default="Build. Automate. Scale.")
    copyright_text = models.CharField(max_length=100, default="© 2025  floneo. All rights reserved.")

    class Meta:
        verbose_name = "Footer Section"
        verbose_name_plural = "Footer Section"

    def __str__(self):
        return f"Footer Section: {self.tagline}"

    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if not self.pk and FooterSection.objects.exists():
            raise ValueError("Only one Footer Section instance is allowed")
        super().save(*args, **kwargs)


class NavigationItem(models.Model):
    """Navigation menu items"""
    label = models.CharField(max_length=50)
    href = models.CharField(max_length=100, help_text="URL or anchor link (e.g., '#features', '/about')")
    order = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Navigation Item"
        verbose_name_plural = "Navigation Items"

    def __str__(self):
        return self.label


# New comprehensive models for all sections

class PricingSection(models.Model):
    """Pricing section content - should only have one instance"""
    is_visible = models.BooleanField(default=True, help_text="Show/hide this section")
    order = models.IntegerField(default=5, validators=[MinValueValidator(1), MaxValueValidator(100)])

    title = models.CharField(max_length=200, default="Choose Your Plan")
    subtitle = models.CharField(max_length=100, default="Flexible pricing for every business")
    description = RichTextField(default="Select the perfect plan for your needs")

    background_color = ColorField(default='#FFFFFF', help_text="Background color for the section")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Pricing Section"
        verbose_name_plural = "Pricing Section"

    def __str__(self):
        return f"Pricing Section: {self.title}"

    def save(self, *args, **kwargs):
        if not self.pk and PricingSection.objects.exists():
            raise ValueError("Only one Pricing Section instance is allowed")
        super().save(*args, **kwargs)


class PricingPlan(models.Model):
    """Individual pricing plans"""
    PLAN_TYPES = [
        ('basic', 'Basic'),
        ('pro', 'Pro'),
        ('enterprise', 'Enterprise'),
    ]

    name = models.CharField(max_length=100)
    plan_type = models.CharField(max_length=20, choices=PLAN_TYPES, default='basic')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    price_period = models.CharField(max_length=20, default='month', help_text="e.g., 'month', 'year'")
    description = models.TextField()
    is_popular = models.BooleanField(default=False, help_text="Mark as most popular plan")
    cta_text = models.CharField(max_length=50, default="Get Started")
    cta_url = models.CharField(max_length=200, default="#")
    order = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Pricing Plan"
        verbose_name_plural = "Pricing Plans"

    def __str__(self):
        return f"{self.name} - ${self.price}/{self.price_period}"


class PricingFeature(models.Model):
    """Features for pricing plans"""
    plan = models.ForeignKey(PricingPlan, on_delete=models.CASCADE, related_name='features')
    feature_text = models.CharField(max_length=200)
    is_included = models.BooleanField(default=True)
    order = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Pricing Feature"
        verbose_name_plural = "Pricing Features"

    def __str__(self):
        return f"{self.plan.name}: {self.feature_text}"


class FAQSection(models.Model):
    """FAQ section content - should only have one instance"""
    is_visible = models.BooleanField(default=True, help_text="Show/hide this section")
    order = models.IntegerField(default=6, validators=[MinValueValidator(1), MaxValueValidator(100)])

    title = models.CharField(max_length=200, default="Frequently Asked Questions")
    subtitle = models.CharField(max_length=100, default="Help Center", blank=True)
    description = RichTextField(default="Find answers to common questions", blank=True)

    background_color = ColorField(default='#FFFFFF', help_text="Background color for the section")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "FAQ Section"
        verbose_name_plural = "FAQ Section"

    def __str__(self):
        return f"FAQ Section: {self.title}"

    def save(self, *args, **kwargs):
        if not self.pk and FAQSection.objects.exists():
            raise ValueError("Only one FAQ Section instance is allowed")
        super().save(*args, **kwargs)


class FAQItem(models.Model):
    """Individual FAQ questions and answers"""
    question = models.CharField(max_length=300)
    answer = RichTextField()
    order = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "FAQ Item"
        verbose_name_plural = "FAQ Items"

    def __str__(self):
        return self.question[:100] + "..." if len(self.question) > 100 else self.question


class ContactSection(models.Model):
    """Contact section content - should only have one instance"""
    is_visible = models.BooleanField(default=True, help_text="Show/hide this section")
    order = models.IntegerField(default=7, validators=[MinValueValidator(1), MaxValueValidator(100)])

    title = models.CharField(max_length=200, default="Get in Touch")
    subtitle = models.CharField(max_length=100, default="Contact Us", blank=True)
    description = RichTextField(default="We'd love to hear from you", blank=True)

    # Contact information
    email = models.EmailField(default="contact@ floneo.com")
    phone = models.CharField(max_length=20, default="+1 (555) 123-4567", blank=True)
    address = models.TextField(default="123 Business St, City, State 12345", blank=True)

    # Form settings
    form_title = models.CharField(max_length=100, default="Send us a message")
    form_submit_text = models.CharField(max_length=50, default="Send Message")
    form_success_message = models.TextField(default="Thank you! We'll get back to you soon.")

    background_color = ColorField(default='#FFFFFF', help_text="Background color for the section")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Contact Section"
        verbose_name_plural = "Contact Section"

    def __str__(self):
        return f"Contact Section: {self.title}"

    def save(self, *args, **kwargs):
        if not self.pk and ContactSection.objects.exists():
            raise ValueError("Only one Contact Section instance is allowed")
        super().save(*args, **kwargs)


class SocialMediaSection(models.Model):
    """Social media section content - should only have one instance"""
    is_visible = models.BooleanField(default=True, help_text="Show/hide this section")
    order = models.IntegerField(default=8, validators=[MinValueValidator(1), MaxValueValidator(100)])

    title = models.CharField(max_length=200, default="Connect With Us", blank=True)
    subtitle = models.CharField(max_length=100, default="Follow us on social media", blank=True)

    background_color = ColorField(default='#FFFFFF', help_text="Background color for the section")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Social Media Section"
        verbose_name_plural = "Social Media Section"

    def __str__(self):
        return f"Social Media Section: {self.title}"

    def save(self, *args, **kwargs):
        if not self.pk and SocialMediaSection.objects.exists():
            raise ValueError("Only one Social Media Section instance is allowed")
        super().save(*args, **kwargs)


class SocialMediaLink(models.Model):
    """Individual social media links"""
    PLATFORM_CHOICES = [
        ('facebook', 'Facebook'),
        ('twitter', 'Twitter/X'),
        ('instagram', 'Instagram'),
        ('linkedin', 'LinkedIn'),
        ('youtube', 'YouTube'),
        ('tiktok', 'TikTok'),
        ('discord', 'Discord'),
        ('slack', 'Slack'),
        ('threads', 'Threads'),
        ('other', 'Other'),
    ]

    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    platform_name = models.CharField(max_length=50, help_text="Display name (e.g., 'Follow us on Twitter')")
    url = models.URLField()
    icon_class = models.CharField(max_length=50, default="fab fa-facebook", help_text="CSS icon class")
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Social Media Link"
        verbose_name_plural = "Social Media Links"

    def __str__(self):
        return f"{self.platform_name} - {self.platform}"


# Enhanced Footer Section
class EnhancedFooterSection(models.Model):
    """Enhanced footer section content - should only have one instance"""
    is_visible = models.BooleanField(default=True, help_text="Show/hide this section")
    order = models.IntegerField(default=9, validators=[MinValueValidator(1), MaxValueValidator(100)])

    # Main branding
    company_name = models.CharField(max_length=100, default=" floneo")
    tagline = models.CharField(max_length=200, default="Build. Automate. Scale.")
    description = RichTextField(default="Empowering businesses with automation", blank=True)

    # Legal links
    privacy_policy_text = models.CharField(max_length=50, default="Privacy Policy")
    privacy_policy_url = models.CharField(max_length=200, default="/privacy")
    terms_conditions_text = models.CharField(max_length=50, default="Terms and Conditions")
    terms_conditions_url = models.CharField(max_length=200, default="/terms")

    # Copyright
    copyright_text = models.CharField(max_length=200, default="© 2025  floneo. All rights reserved.")

    # Made in attribution
    show_made_in_framer = models.BooleanField(default=True, help_text="Show 'Made in Framer' attribution")

    background_color = ColorField(default='#F5F5F5', help_text="Background color for the section")
    text_color = ColorField(default='#000000', help_text="Text color for the section")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Enhanced Footer Section"
        verbose_name_plural = "Enhanced Footer Section"

    def __str__(self):
        return f"Footer: {self.company_name}"

    def save(self, *args, **kwargs):
        if not self.pk and EnhancedFooterSection.objects.exists():
            raise ValueError("Only one Enhanced Footer Section instance is allowed")
        super().save(*args, **kwargs)


class SiteSettings(models.Model):
    """Global site settings - should only have one instance"""
    site_name = models.CharField(max_length=100, default=" floneo")
    site_description = models.TextField(default="Low-Code/No-Code Platform for Business Automation")
    site_logo = models.ImageField(upload_to='site/', blank=True, null=True)
    favicon = models.ImageField(upload_to='site/', blank=True, null=True)

    # SEO settings
    meta_title = models.CharField(max_length=60, default=" floneo - Business Automation Platform")
    meta_description = models.CharField(max_length=160, default="Transform your business with our low-code automation platform")
    meta_keywords = models.CharField(max_length=200, default="automation, low-code, business, platform", blank=True)

    # Contact information
    primary_email = models.EmailField(default="contact@ floneo.com")
    primary_phone = models.CharField(max_length=20, default="+1 (555) 123-4567", blank=True)

    # Analytics
    google_analytics_id = models.CharField(max_length=20, blank=True, help_text="Google Analytics tracking ID")
    facebook_pixel_id = models.CharField(max_length=20, blank=True, help_text="Facebook Pixel ID")

    # Maintenance mode
    maintenance_mode = models.BooleanField(default=False, help_text="Enable maintenance mode")
    maintenance_message = models.TextField(default="We're currently updating our site. Please check back soon!", blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"

    def __str__(self):
        return f"Site Settings: {self.site_name}"

    def save(self, *args, **kwargs):
        if not self.pk and SiteSettings.objects.exists():
            raise ValueError("Only one Site Settings instance is allowed")
        super().save(*args, **kwargs)


class ContactFormSubmission(models.Model):
    """Store contact form submissions"""
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()

    # Admin fields
    is_read = models.BooleanField(default=False)
    admin_notes = models.TextField(blank=True, help_text="Internal notes for admin use")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Contact Form Submission"
        verbose_name_plural = "Contact Form Submissions"

    def __str__(self):
        return f"{self.name} - {self.email} ({self.created_at.strftime('%Y-%m-%d')})"


# Additional Models for Missing Sections

class AboutTabletSection(models.Model):
    """About Tablet section with 3D animation content"""
    is_visible = models.BooleanField(default=True, help_text="Show/hide this section")
    order = models.IntegerField(default=2, validators=[MinValueValidator(1), MaxValueValidator(100)])

    # Content fields
    title = models.CharField(max_length=200, default="Experience the Future")
    subtitle = models.CharField(max_length=100, default="3D Interactive Demo", blank=True)
    description = RichTextField(default="Discover our platform through an immersive 3D experience")

    # Media fields
    video_url = models.URLField(blank=True, help_text="External video URL (YouTube, Vimeo, etc.)")
    video_file = models.FileField(upload_to='videos/', blank=True, null=True, help_text="Upload video file")
    poster_image = models.ImageField(upload_to='videos/', blank=True, null=True, help_text="Video poster/thumbnail")

    # Video player settings
    video_autoplay = models.BooleanField(default=True, help_text="Enable video autoplay")
    video_muted = models.BooleanField(default=False, help_text="Mute video by default (False = unmuted)")
    video_loop = models.BooleanField(default=True, help_text="Enable video looping")
    video_controls = models.BooleanField(default=False, help_text="Show video controls")

    # Animation settings
    enable_3d_animation = models.BooleanField(default=True, help_text="Enable 3D tablet animation")
    animation_duration = models.FloatField(default=1.0, help_text="Animation duration in seconds")

    # Visual settings
    background_color = ColorField(default='#FFFFFF', help_text="Background color for the section")
    text_color = ColorField(default='#000000', help_text="Text color for the section")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "About Tablet Section"
        verbose_name_plural = "About Tablet Section"

    def __str__(self):
        return f"About Tablet: {self.title}"

    def save(self, *args, **kwargs):
        if not self.pk and AboutTabletSection.objects.exists():
            raise ValueError("Only one About Tablet Section instance is allowed")
        super().save(*args, **kwargs)


class AIPoweredAnalyticsSection(models.Model):
    """AI-Powered Analytics showcase section"""
    is_visible = models.BooleanField(default=True, help_text="Show/hide this section")
    order = models.IntegerField(default=3, validators=[MinValueValidator(1), MaxValueValidator(100)])

    # Content fields
    title = models.CharField(max_length=200, default="AI-Powered Analytics")
    subtitle = models.CharField(max_length=100, default="Smart Insights", blank=True)
    description = RichTextField(default="Harness the power of AI to transform your data into actionable insights")

    # Features
    feature_1_title = models.CharField(max_length=100, default="Real-time Analysis")
    feature_1_description = models.TextField(default="Get instant insights from your data")
    feature_2_title = models.CharField(max_length=100, default="Predictive Modeling")
    feature_2_description = models.TextField(default="Forecast trends and outcomes")
    feature_3_title = models.CharField(max_length=100, default="Automated Reports")
    feature_3_description = models.TextField(default="Generate reports automatically")

    # Visual settings
    background_color = ColorField(default='#F8F9FA', help_text="Background color for the section")
    accent_color = ColorField(default='#007BFF', help_text="Accent color for highlights")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "AI-Powered Analytics Section"
        verbose_name_plural = "AI-Powered Analytics Section"

    def __str__(self):
        return f"AI Analytics: {self.title}"

    def save(self, *args, **kwargs):
        if not self.pk and AIPoweredAnalyticsSection.objects.exists():
            raise ValueError("Only one AI-Powered Analytics Section instance is allowed")
        super().save(*args, **kwargs)


class ArchitectingExcellenceSection(models.Model):
    """About Us section - Architecting Excellence"""
    is_visible = models.BooleanField(default=True, help_text="Show/hide this section")
    order = models.IntegerField(default=4, validators=[MinValueValidator(1), MaxValueValidator(100)])

    # Main content fields
    badge_text = models.CharField(max_length=50, default="ABOUT US")
    main_title_line1 = models.CharField(max_length=100, default="Architecting", help_text="First line of main title")
    main_title_line2 = models.CharField(max_length=100, default="Excellence", help_text="Second line of main title")
    subtitle = models.TextField(default="Together, we're creating a seamless experience that puts you in charge of your operations without IT bottlenecks.", help_text="Main subtitle/description")

    # Philosophy card content
    philosophy_title = models.TextField(default="OUR philosophy is simple: workflow creation must be visual, instant, and effortlessly scalable, empowering you to build the future of your operations—fast.", help_text="Philosophy card main text")
    philosophy_button_text = models.CharField(max_length=50, default="View Services")
    philosophy_button_url = models.CharField(max_length=200, default="#", help_text="URL for philosophy card button")

    # Animated counters in dark gradient card
    counter_1_value = models.IntegerField(default=70, help_text="First percentage counter (e.g., 70 for 70%)")
    counter_1_label = models.CharField(max_length=100, default="Process Efficiency", help_text="Label for first counter")
    counter_2_value = models.IntegerField(default=85, help_text="Second percentage counter (e.g., 85 for 85%)")
    counter_2_label = models.CharField(max_length=100, default="Automation Success", help_text="Label for second counter")

    # Team card content
    team_name = models.CharField(max_length=100, default="Team floneo")
    team_role = models.CharField(max_length=100, default="CCO & Co-Founder")
    team_image = models.ImageField(upload_to='team/', blank=True, null=True, help_text="Team member profile image")

    # Step carousel content
    step_1_title = models.CharField(max_length=100, default="Drag & Drop", help_text="Step 1 title")
    step_1_description = models.TextField(default="Build workflows visually with our intuitive drag-and-drop interface", help_text="Step 1 description")
    step_2_title = models.CharField(max_length=100, default="Connect", help_text="Step 2 title")
    step_2_description = models.TextField(default="Seamlessly integrate with your existing tools and systems", help_text="Step 2 description")
    step_3_title = models.CharField(max_length=100, default="Automate", help_text="Step 3 title")
    step_3_description = models.TextField(default="Deploy and scale your automated workflows instantly", help_text="Step 3 description")
    step_4_title = models.CharField(max_length=100, default="Scale", help_text="Step 4 title")
    step_4_description = models.TextField(default="Grow your operations without technical limitations", help_text="Step 4 description")

    # Visual settings
    background_color = ColorField(default='#FFFFFF', help_text="Background color for the section")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "About Us Section"
        verbose_name_plural = "About Us Section"

    def __str__(self):
        return f"About Us: {self.main_title_line1} {self.main_title_line2}"

    def save(self, *args, **kwargs):
        if not self.pk and ArchitectingExcellenceSection.objects.exists():
            raise ValueError("Only one About Us Section instance is allowed")
        super().save(*args, **kwargs)


class WhyChooseUsSection(models.Model):
    """Why Choose Us section with statistics and global reach"""
    is_visible = models.BooleanField(default=True, help_text="Show/hide this section")
    order = models.IntegerField(default=5, validators=[MinValueValidator(1), MaxValueValidator(100)])

    # Content fields
    badge_text = models.CharField(max_length=50, default="WHY CHOOSE US")
    title = models.CharField(max_length=200, default="Why Choose Us")
    subtitle = models.CharField(max_length=200, default="that puts you in charge of your operations without IT bottlenecks", blank=True)
    description = RichTextField(default="Experience unparalleled quality and innovation", blank=True)

    # Statistics
    stat_1_value = models.CharField(max_length=10, default="75")
    stat_1_label = models.CharField(max_length=50, default="spending habits")
    stat_2_value = models.CharField(max_length=10, default="60")
    stat_2_label = models.CharField(max_length=50, default="cost reductions")
    stat_3_value = models.CharField(max_length=10, default="45")
    stat_3_label = models.CharField(max_length=50, default="efficiency gains")

    # Global reach section
    global_title = models.CharField(max_length=100, default="Global Reach")
    global_description = models.TextField(default="Our app supports users in over 140 countries, offering global tools to manage and optimize your finances.")

    # Visual settings
    background_color = ColorField(default='#FFFFFF', help_text="Background color for the section")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Why Choose Us Section"
        verbose_name_plural = "Why Choose Us Section"

    def __str__(self):
        return f"Why Choose Us: {self.title}"

    def save(self, *args, **kwargs):
        if not self.pk and WhyChooseUsSection.objects.exists():
            raise ValueError("Only one Why Choose Us Section instance is allowed")
        super().save(*args, **kwargs)


class ChatMessage(models.Model):
    """Chat message for Human Touch Section"""
    SENDER_CHOICES = [
        ('user', 'User'),
        ('bot', 'Bot'),
    ]

    human_touch_section = models.ForeignKey('HumanTouchSection', on_delete=models.CASCADE, related_name='chat_messages')
    text = models.TextField(help_text="Chat message text")
    sender = models.CharField(max_length=10, choices=SENDER_CHOICES, default='user')
    order = models.IntegerField(default=1, help_text="Order of message in conversation")
    delay = models.FloatField(default=0, help_text="Animation delay in seconds")

    class Meta:
        ordering = ['order']
        verbose_name = "Chat Message"
        verbose_name_plural = "Chat Messages"

    def __str__(self):
        return f"{self.sender}: {self.text[:50]}..."


class HumanTouchSection(models.Model):
    """Human Touch / Workflow Management section"""
    is_visible = models.BooleanField(default=True, help_text="Show/hide this section")
    order = models.IntegerField(default=5, validators=[MinValueValidator(1), MaxValueValidator(100)])

    # Content fields
    title = models.CharField(max_length=200, default="The Human Touch in Automation")
    subtitle = models.CharField(max_length=100, default="Workflow Management", blank=True)
    description = RichTextField(default="Combining human insight with automated efficiency")

    # Features/Benefits
    benefit_1_title = models.CharField(max_length=100, default="Intuitive Design")
    benefit_1_description = models.TextField(default="User-friendly interface that anyone can master")
    benefit_2_title = models.CharField(max_length=100, default="Smart Automation")
    benefit_2_description = models.TextField(default="Intelligent workflows that adapt to your needs")
    benefit_3_title = models.CharField(max_length=100, default="Human Oversight")
    benefit_3_description = models.TextField(default="Maintain control while automating processes")

    # Call to action
    cta_text = models.CharField(max_length=50, default="Learn More")
    cta_url = models.CharField(max_length=200, default="#")

    # Visual settings
    background_color = ColorField(default='#F8F9FA', help_text="Background color for the section")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Human Touch Section"
        verbose_name_plural = "Human Touch Section"

    def __str__(self):
        return f"Human Touch: {self.title}"

    def save(self, *args, **kwargs):
        if not self.pk and HumanTouchSection.objects.exists():
            raise ValueError("Only one Human Touch Section instance is allowed")
        super().save(*args, **kwargs)


class VideoTabsSection(models.Model):
    """Video Tabs interface section"""
    is_visible = models.BooleanField(default=True, help_text="Show/hide this section")
    order = models.IntegerField(default=6, validators=[MinValueValidator(1), MaxValueValidator(100)])

    # Content fields
    title = models.CharField(max_length=200, default="See It In Action")
    subtitle = models.CharField(max_length=100, default="Interactive Video Demos", blank=True)
    description = RichTextField(default="Explore our features through interactive video demonstrations")

    # Visual settings
    background_color = ColorField(default='#FFFFFF', help_text="Background color for the section")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Video Tabs Section"
        verbose_name_plural = "Video Tabs Section"

    def __str__(self):
        return f"Video Tabs: {self.title}"

    def save(self, *args, **kwargs):
        if not self.pk and VideoTabsSection.objects.exists():
            raise ValueError("Only one Video Tabs Section instance is allowed")
        super().save(*args, **kwargs)


class VideoTab(models.Model):
    """Individual video tabs for the video tabs section"""
    section = models.ForeignKey(VideoTabsSection, on_delete=models.CASCADE, related_name='tabs')

    # Tab content
    tab_title = models.CharField(max_length=100)
    tab_description = models.TextField(blank=True)

    # Video content
    video_url = models.URLField(blank=True, help_text="External video URL (YouTube, Vimeo, etc.)")
    video_file = models.FileField(upload_to='videos/', blank=True, null=True, help_text="Upload video file")
    poster_image = models.ImageField(upload_to='videos/', blank=True, null=True, help_text="Video poster/thumbnail")

    # Settings
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Video Tab"
        verbose_name_plural = "Video Tabs"

    def __str__(self):
        return f"{self.tab_title} - {self.section.title}"


class CountryData(models.Model):
    """Country data for global reach ticker"""
    name = models.CharField(max_length=100)
    flag_emoji = models.CharField(max_length=10, help_text="Country flag emoji (e.g., 🇺🇸)")
    country_code = models.CharField(max_length=2, help_text="ISO country code (e.g., US, FR)")
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'name']
        verbose_name = "Country Data"
        verbose_name_plural = "Country Data"

    def __str__(self):
        return f"{self.flag_emoji} {self.name}"


class MetricsDisplaySection(models.Model):
    """Metrics display section with animated counters"""
    is_visible = models.BooleanField(default=True, help_text="Show/hide this section")
    order = models.IntegerField(default=7, validators=[MinValueValidator(1), MaxValueValidator(100)])

    # Content fields
    title = models.CharField(max_length=200, default="Our Impact in Numbers")
    subtitle = models.CharField(max_length=100, default="Key Metrics", blank=True)
    description = RichTextField(default="See the measurable impact of our platform", blank=True)

    # Visual settings
    background_color = ColorField(default='#F8F9FA', help_text="Background color for the section")
    enable_animation = models.BooleanField(default=True, help_text="Enable counter animations")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Metrics Display Section"
        verbose_name_plural = "Metrics Display Section"

    def __str__(self):
        return f"Metrics: {self.title}"

    def save(self, *args, **kwargs):
        if not self.pk and MetricsDisplaySection.objects.exists():
            raise ValueError("Only one Metrics Display Section instance is allowed")
        super().save(*args, **kwargs)


class PricingFeaturesSection(models.Model):
    """Pricing features comparison section"""
    is_visible = models.BooleanField(default=True, help_text="Show/hide this section")
    order = models.IntegerField(default=8, validators=[MinValueValidator(1), MaxValueValidator(100)])

    # Content fields
    title = models.CharField(max_length=200, default="Compare Features")
    subtitle = models.CharField(max_length=100, default="Feature Comparison", blank=True)
    description = RichTextField(default="See what's included in each plan", blank=True)

    # Visual settings
    background_color = ColorField(default='#FFFFFF', help_text="Background color for the section")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Pricing Features Section"
        verbose_name_plural = "Pricing Features Section"

    def __str__(self):
        return f"Pricing Features: {self.title}"

    def save(self, *args, **kwargs):
        if not self.pk and PricingFeaturesSection.objects.exists():
            raise ValueError("Only one Pricing Features Section instance is allowed")
        super().save(*args, **kwargs)


class VideoTabsDemoSection(models.Model):
    """Video Tabs Demo section"""
    is_visible = models.BooleanField(default=True, help_text="Show/hide this section")
    order = models.IntegerField(default=9, validators=[MinValueValidator(1), MaxValueValidator(100)])

    # Content fields
    title = models.CharField(max_length=200, default="Interactive Demo")
    subtitle = models.CharField(max_length=100, default="Try It Yourself", blank=True)
    description = RichTextField(default="Experience our platform through interactive demos")

    # Demo settings
    enable_autoplay = models.BooleanField(default=False, help_text="Auto-play demo videos")
    demo_duration = models.IntegerField(default=30, help_text="Demo duration in seconds")

    # Visual settings
    background_color = ColorField(default='#F8F9FA', help_text="Background color for the section")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Video Tabs Demo Section"
        verbose_name_plural = "Video Tabs Demo Section"

    def __str__(self):
        return f"Video Demo: {self.title}"

    def save(self, *args, **kwargs):
        if not self.pk and VideoTabsDemoSection.objects.exists():
            raise ValueError("Only one Video Tabs Demo Section instance is allowed")
        super().save(*args, **kwargs)


class DemoTab(models.Model):
    """Individual demo tabs for the video tabs demo section"""
    section = models.ForeignKey(VideoTabsDemoSection, on_delete=models.CASCADE, related_name='demo_tabs')

    # Tab content
    tab_title = models.CharField(max_length=100)
    tab_description = models.TextField(blank=True)
    tab_icon = models.CharField(max_length=50, default="play", help_text="Icon name for the tab")

    # Demo content
    demo_url = models.URLField(blank=True, help_text="External demo URL")
    demo_video = models.FileField(upload_to='demos/', blank=True, null=True, help_text="Upload demo video")
    demo_image = models.ImageField(upload_to='demos/', blank=True, null=True, help_text="Demo screenshot/image")

    # Settings
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Demo Tab"
        verbose_name_plural = "Demo Tabs"

    def __str__(self):
        return f"{self.tab_title} - {self.section.title}"


class BenefitsSection(models.Model):
    """Benefits section with floating benefit pills"""
    is_visible = models.BooleanField(default=True, help_text="Show/hide this section")
    order = models.IntegerField(default=5, validators=[MinValueValidator(1), MaxValueValidator(100)])

    # Content fields
    title = models.CharField(max_length=200, default="More than")
    subtitle = models.CharField(max_length=200, default="Automation")
    description = RichTextField(default=" floneo isn't just about managing processes — it's about automating and scaling the workflows that fuel your business.")

    # CTA fields
    cta_primary_text = models.CharField(max_length=100, default="Get Started")
    cta_primary_url = models.CharField(max_length=200, default="/contact")
    cta_secondary_text = models.CharField(max_length=100, default="Learn More")
    cta_secondary_url = models.CharField(max_length=200, default="/about")

    # Visual settings
    background_color = models.CharField(
        max_length=200,
        default="radial-gradient(circle at center, #a8e6cf 0%, #c8f2d4 40%, #e8f8ed 70%, #f8fdf9 100%)",
        help_text="CSS background (color, gradient, etc.)"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Benefits Section"
        verbose_name_plural = "Benefits Section"

    def save(self, *args, **kwargs):
        if not self.pk and BenefitsSection.objects.exists():
            raise ValueError("Only one Benefits Section instance is allowed")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Benefits Section: {self.title} {self.subtitle}"


class BenefitItem(models.Model):
    """Individual benefit pills that float around the benefits section"""
    POSITION_CHOICES = [
        ('top-center', 'Top Center'),
        ('top-left', 'Top Left'),
        ('top-right', 'Top Right'),
        ('middle-left', 'Middle Left'),
        ('middle-right', 'Middle Right'),
        ('bottom-left', 'Bottom Left'),
        ('bottom-right', 'Bottom Right'),
        ('bottom-center', 'Bottom Center'),
    ]

    section = models.ForeignKey(BenefitsSection, related_name='benefits', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    icon = models.CharField(max_length=10, default="🔒", help_text="Emoji icon for the benefit")
    position = models.CharField(max_length=20, choices=POSITION_CHOICES, default='top-center')
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Benefit Item"
        verbose_name_plural = "Benefit Items"
        ordering = ['order', 'id']

    def __str__(self):
        return f"{self.title} ({self.position})"


class ContactSubmission(models.Model):
    """Contact form submissions from website"""
    name = models.CharField(max_length=255, help_text="Full name of the person submitting the form")
    email = models.EmailField(help_text="Email address of the person submitting the form")
    company = models.CharField(max_length=255, blank=True, null=True, help_text="Company name (optional)")
    phone = models.CharField(max_length=20, blank=True, null=True, help_text="Phone number with country code (e.g., +1 555-123-4567)")
    message = models.TextField(help_text="Message content from the contact form")
    submitted_at = models.DateTimeField(default=timezone.now, help_text="When the form was submitted")
    ip_address = models.GenericIPAddressField(blank=True, null=True, help_text="IP address of the submitter")
    user_agent = models.TextField(blank=True, null=True, help_text="Browser user agent string")
    is_read = models.BooleanField(default=False, help_text="Mark as read/unread")
    notes = models.TextField(blank=True, null=True, help_text="Internal notes about this submission")

    class Meta:
        verbose_name = "Contact Submission"
        verbose_name_plural = "Contact Submissions"
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.name} ({self.email}) - {self.submitted_at.strftime('%Y-%m-%d %H:%M')}"

    @property
    def short_message(self):
        """Return truncated message for admin list display"""
        if len(self.message) > 100:
            return f"{self.message[:100]}..."
        return self.message


class PrivacyPolicy(models.Model):
    """Privacy Policy content management"""
    title = models.CharField(max_length=200, default="Privacy Policy", help_text="Page title")
    subtitle = models.CharField(max_length=300, blank=True, help_text="Optional subtitle")
    content = RichTextField(
        default="""
        <h2>Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us.</p>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our services.</p>

        <h2>Information Sharing</h2>
        <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent.</p>

        <h2>Data Security</h2>
        <p>We implement appropriate security measures to protect your personal information.</p>

        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us.</p>
        """,
        help_text="Privacy policy content (supports HTML formatting)"
    )
    last_updated = models.DateTimeField(auto_now=True, help_text="When the privacy policy was last updated")
    effective_date = models.DateField(help_text="When this privacy policy became effective")
    is_active = models.BooleanField(default=True, help_text="Whether this privacy policy is currently active")

    # SEO fields
    meta_title = models.CharField(max_length=60, blank=True, help_text="SEO meta title (leave blank to use title)")
    meta_description = models.CharField(max_length=160, blank=True, help_text="SEO meta description")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Privacy Policy"
        verbose_name_plural = "Privacy Policies"
        ordering = ['-effective_date']

    def __str__(self):
        return f"{self.title} (Effective: {self.effective_date})"

    def save(self, *args, **kwargs):
        # Set effective_date to today if not set
        if not self.effective_date:
            from datetime import date
            self.effective_date = date.today()
        super().save(*args, **kwargs)
