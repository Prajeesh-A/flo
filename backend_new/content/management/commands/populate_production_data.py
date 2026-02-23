from django.core.management.base import BaseCommand
from content.models import (
    HeroSection, ContactSection,
    MetricBox, FeatureCard, CountryData,
    HumanTouchSection, ChatMessage,
    VideoTabsSection, VideoTab,
    VideoTabsDemoSection, DemoTab,
    MetricsDisplaySection, PricingFeaturesSection,
    BenefitsSection, BenefitItem,
)


class Command(BaseCommand):
    help = 'Populate missing production data for all empty sections'

    def handle(self, *args, **options):
        self.stdout.write('Populating missing production data...\n')

        self._fix_hero_section()
        self._fix_contact_section()
        self._populate_metric_boxes()
        self._populate_feature_cards()
        self._populate_country_data()
        self._populate_chat_messages()
        self._populate_video_tabs()
        self._populate_demo_tabs()
        self._populate_benefit_items()

        self.stdout.write(self.style.SUCCESS('\nAll missing production data populated successfully!'))

    def _fix_hero_section(self):
        """Always update hero section to correct production content (removes leftover test data)"""
        hero = HeroSection.objects.first()
        if not hero:
            self.stdout.write('HeroSection: Not found, skipping.')
            return

        hero.tagline = 'Build. Automate. Scale.'
        hero.title = 'floneo'
        hero.description = (
            'floneo Low-Code/No-Code platform turns manual processes into instant, '
            'powerful applications. Build and deploy real business solutions in hours, not months.'
        )
        hero.cta_primary_text = 'Get Started Free'
        hero.cta_primary_url = '/contact'
        hero.cta_secondary_text = 'Watch Demo'
        hero.cta_secondary_url = '#'
        hero.is_visible = True
        hero.save()
        self.stdout.write(self.style.SUCCESS('HeroSection: Updated to production content.'))

    def _fix_contact_section(self):
        """Always update contact section with real contact details"""
        contact = ContactSection.objects.first()
        if not contact:
            self.stdout.write('ContactSection: Not found, skipping.')
            return

        contact.title = 'Get in Touch'
        contact.subtitle = 'Contact Us'
        contact.description = "We'd love to hear from you"
        contact.email = 'contact@floneo.co'
        contact.phone = ''
        contact.address = ''
        contact.form_title = 'Contact our sales team'
        contact.form_submit_text = 'Send Message'
        contact.form_success_message = "Thank you! We'll get back to you soon."
        contact.save()
        self.stdout.write(self.style.SUCCESS('ContactSection: Updated with real contact details.'))

    def _populate_metric_boxes(self):
        """Populate MetricBox data matching frontend fallback"""
        if MetricBox.objects.exists():
            self.stdout.write('MetricBox: Already has data, skipping.')
            return

        metrics = [
            {
                'value': '68',
                'suffix': '%',
                'label': 'Faster Process Developments',
                'description': 'Teams build, test, and roll out workflows 68% faster compared to traditional development.',
                'color': '#FFC107',
                'order': 1,
            },
            {
                'value': '72',
                'suffix': '%',
                'label': 'Less Operational Overheads',
                'description': 'By automating approvals, handoffs, and reporting, organizations cut repetitive manual work by 72%. FloNeo optimizes team time and resources — allowing talent to focus on innovation, not administration.',
                'color': '#00D084',
                'order': 2,
            },
            {
                'value': '99',
                'suffix': '%',
                'label': 'Accuracy and Compliance',
                'description': 'Each workflow built on FloNeo runs with 99.3% data accuracy across integrated systems. Every action is tracked, logged, and audit-ready — ensuring full governance without friction.',
                'color': '#FF1493',
                'order': 3,
            },
        ]

        for data in metrics:
            MetricBox.objects.create(**data)
        self.stdout.write(self.style.SUCCESS(f'MetricBox: Created {len(metrics)} metric boxes.'))

    def _populate_feature_cards(self):
        """Populate FeatureCard data"""
        if FeatureCard.objects.exists():
            self.stdout.write('FeatureCard: Already has data, skipping.')
            return

        features = [
            {
                'title': 'Lightning Fast',
                'description': 'Build and deploy applications in hours, not months. Our platform accelerates development by 10x.',
                'icon_name': 'zap',
                'order': 1,
            },
            {
                'title': 'Advanced Analytics',
                'description': 'Get real-time insights with AI-powered analytics dashboards. Track performance and optimize workflows.',
                'icon_name': 'bar-chart-3',
                'order': 2,
            },
            {
                'title': 'Time Saving',
                'description': 'Automate repetitive tasks and save hundreds of hours per month. Focus on what matters most.',
                'icon_name': 'clock',
                'order': 3,
            },
            {
                'title': 'Enterprise Security',
                'description': 'Bank-grade security with end-to-end encryption. SOC 2 compliant and GDPR ready.',
                'icon_name': 'shield',
                'order': 4,
            },
            {
                'title': 'Seamless Integration',
                'description': 'Connect with 200+ tools and services. REST APIs, webhooks, and native integrations included.',
                'icon_name': 'plug',
                'order': 5,
            },
            {
                'title': 'Scalable Infrastructure',
                'description': 'Built to scale from startup to enterprise. Auto-scaling infrastructure handles any workload.',
                'icon_name': 'layers',
                'order': 6,
            },
        ]

        for data in features:
            FeatureCard.objects.create(**data)
        self.stdout.write(self.style.SUCCESS(f'FeatureCard: Created {len(features)} feature cards.'))

    def _populate_country_data(self):
        """Populate CountryData for the global reach ticker"""
        if CountryData.objects.exists():
            self.stdout.write('CountryData: Already has data, skipping.')
            return

        countries = [
            {'name': 'France', 'flag_emoji': '🇫🇷', 'country_code': 'fr', 'order': 1},
            {'name': 'Ukraine', 'flag_emoji': '🇺🇦', 'country_code': 'ua', 'order': 2},
            {'name': 'Netherlands', 'flag_emoji': '🇳🇱', 'country_code': 'nl', 'order': 3},
            {'name': 'USA', 'flag_emoji': '🇺🇸', 'country_code': 'us', 'order': 4},
            {'name': 'Canada', 'flag_emoji': '🇨🇦', 'country_code': 'ca', 'order': 5},
            {'name': 'Japan', 'flag_emoji': '🇯🇵', 'country_code': 'jp', 'order': 6},
            {'name': 'Denmark', 'flag_emoji': '🇩🇰', 'country_code': 'dk', 'order': 7},
            {'name': 'Germany', 'flag_emoji': '🇩🇪', 'country_code': 'de', 'order': 8},
            {'name': 'Australia', 'flag_emoji': '🇦🇺', 'country_code': 'au', 'order': 9},
            {'name': 'United Kingdom', 'flag_emoji': '🇬🇧', 'country_code': 'gb', 'order': 10},
            {'name': 'India', 'flag_emoji': '🇮🇳', 'country_code': 'in', 'order': 11},
            {'name': 'Brazil', 'flag_emoji': '🇧🇷', 'country_code': 'br', 'order': 12},
            {'name': 'Singapore', 'flag_emoji': '🇸🇬', 'country_code': 'sg', 'order': 13},
            {'name': 'South Korea', 'flag_emoji': '🇰🇷', 'country_code': 'kr', 'order': 14},
            {'name': 'Sweden', 'flag_emoji': '🇸🇪', 'country_code': 'se', 'order': 15},
        ]

        for data in countries:
            CountryData.objects.create(**data)
        self.stdout.write(self.style.SUCCESS(f'CountryData: Created {len(countries)} countries.'))

    def _populate_chat_messages(self):
        """Populate ChatMessage data for Human Touch Section"""
        try:
            section = HumanTouchSection.objects.first()
        except HumanTouchSection.DoesNotExist:
            self.stdout.write('ChatMessage: HumanTouchSection not found, skipping.')
            return

        if not section:
            self.stdout.write('ChatMessage: HumanTouchSection not found, skipping.')
            return

        if section.chat_messages.exists():
            self.stdout.write('ChatMessage: Already has data, skipping.')
            return

        messages = [
            {'text': 'Yo, Michi!', 'sender': 'user', 'order': 1, 'delay': 0},
            {'text': 'Have you heard of floneo?', 'sender': 'user', 'order': 2, 'delay': 0.5},
            {'text': 'Hi, Michi', 'sender': 'bot', 'order': 3, 'delay': 1.5},
            {'text': "No, I haven't. What is it?", 'sender': 'bot', 'order': 4, 'delay': 2},
            {'text': "It's an app for managing your finances", 'sender': 'user', 'order': 5, 'delay': 3},
            {'text': 'Check it out 😊', 'sender': 'user', 'order': 6, 'delay': 3.5},
            {'text': 'Wow 😍😍😍', 'sender': 'bot', 'order': 7, 'delay': 4.5},
            {'text': 'It looks very convenient and modern! I want to try it', 'sender': 'bot', 'order': 8, 'delay': 5},
            {'text': 'Really cool App', 'sender': 'user', 'order': 9, 'delay': 6},
            {'text': '😍', 'sender': 'user', 'order': 10, 'delay': 6.2},
            {'text': 'Already installed it! Thanks!', 'sender': 'bot', 'order': 11, 'delay': 7},
        ]

        for msg_data in messages:
            ChatMessage.objects.create(human_touch_section=section, **msg_data)
        self.stdout.write(self.style.SUCCESS(f'ChatMessage: Created {len(messages)} chat messages.'))

    def _populate_video_tabs(self):
        """Populate VideoTab data for Video Tabs Section"""
        try:
            section = VideoTabsSection.objects.first()
        except VideoTabsSection.DoesNotExist:
            self.stdout.write('VideoTab: VideoTabsSection not found, skipping.')
            return

        if not section:
            self.stdout.write('VideoTab: VideoTabsSection not found, skipping.')
            return

        if section.tabs.exists():
            self.stdout.write('VideoTab: Already has data, skipping.')
            return

        tabs = [
            {
                'tab_title': 'Build',
                'tab_description': 'Create powerful applications with our intuitive drag-and-drop builder',
                'video_url': '',
                'is_active': True,
                'order': 1,
            },
            {
                'tab_title': 'Automate',
                'tab_description': 'Streamline your workflows with intelligent automation',
                'video_url': '',
                'is_active': True,
                'order': 2,
            },
            {
                'tab_title': 'Scale',
                'tab_description': 'Grow your business without technical limitations',
                'video_url': '',
                'is_active': True,
                'order': 3,
            },
        ]

        for tab_data in tabs:
            VideoTab.objects.create(section=section, **tab_data)
        self.stdout.write(self.style.SUCCESS(f'VideoTab: Created {len(tabs)} video tabs.'))

    def _populate_demo_tabs(self):
        """Populate DemoTab data for Video Tabs Demo Section"""
        try:
            section = VideoTabsDemoSection.objects.first()
        except VideoTabsDemoSection.DoesNotExist:
            self.stdout.write('DemoTab: VideoTabsDemoSection not found, skipping.')
            return

        if not section:
            self.stdout.write('DemoTab: VideoTabsDemoSection not found, skipping.')
            return

        if section.demo_tabs.exists():
            self.stdout.write('DemoTab: Already has data, skipping.')
            return

        demos = [
            {
                'tab_title': 'Workflow Builder',
                'tab_description': 'See how easy it is to create complex workflows visually',
                'tab_icon': 'play',
                'is_active': True,
                'order': 1,
            },
            {
                'tab_title': 'Integration Hub',
                'tab_description': 'Connect your favorite tools in seconds',
                'tab_icon': 'plug',
                'is_active': True,
                'order': 2,
            },
            {
                'tab_title': 'Analytics Dashboard',
                'tab_description': 'Real-time insights at your fingertips',
                'tab_icon': 'bar-chart',
                'is_active': True,
                'order': 3,
            },
        ]

        for demo_data in demos:
            DemoTab.objects.create(section=section, **demo_data)
        self.stdout.write(self.style.SUCCESS(f'DemoTab: Created {len(demos)} demo tabs.'))

    def _populate_benefit_items(self):
        """Ensure BenefitsSection has benefit items (check existing data)"""
        try:
            section = BenefitsSection.objects.first()
        except BenefitsSection.DoesNotExist:
            self.stdout.write('BenefitItem: BenefitsSection not found, skipping.')
            return

        if not section:
            self.stdout.write('BenefitItem: BenefitsSection not found, skipping.')
            return

        # Benefits already populated from init_content, just verify
        count = section.benefits.count()
        if count > 0:
            self.stdout.write(f'BenefitItem: Already has {count} items, skipping.')
        else:
            items = [
                {'title': 'Rapid Development', 'icon': '⚡', 'position': 'top-left', 'order': 1},
                {'title': 'Enterprise Security', 'icon': '🔒', 'position': 'top-right', 'order': 2},
                {'title': 'Scalable Infrastructure', 'icon': '📈', 'position': 'bottom-center', 'order': 3},
                {'title': 'No-Code Builder', 'icon': '🎨', 'position': 'middle-left', 'order': 4},
                {'title': '24/7 Support', 'icon': '🛟', 'position': 'middle-right', 'order': 5},
                {'title': 'Cloud Native', 'icon': '☁️', 'position': 'bottom-left', 'order': 6},
            ]
            for item_data in items:
                BenefitItem.objects.create(section=section, is_active=True, **item_data)
            self.stdout.write(self.style.SUCCESS(f'BenefitItem: Created {len(items)} benefit items.'))
