from django.core.management.base import BaseCommand
from content.models import (
    HeroSection, AboutSection, ContactSection, SiteSettings,
    AnalyticsSection, EnhancedFooterSection, FooterSection,
    MetricBox, FeatureCard, CountryData, ServiceCard,
    HumanTouchSection, ChatMessage,
    VideoTabsSection, VideoTab,
    VideoTabsDemoSection, DemoTab,
    MetricsDisplaySection, PricingFeaturesSection,
    BenefitsSection, BenefitItem,
    AboutTabletSection, AIPoweredAnalyticsSection,
    ArchitectingExcellenceSection, WhyChooseUsSection,
    FAQSection, FAQItem,
    SocialMediaSection, SocialMediaLink,
    PricingSection, PricingPlan, PricingFeature,
    NavigationItem,
)


class Command(BaseCommand):
    help = 'Populate ALL production data - fixes existing and creates missing'

    def handle(self, *args, **options):
        self.stdout.write('='*60)
        self.stdout.write('POPULATING ALL PRODUCTION DATA')
        self.stdout.write('='*60 + '\n')

        self._fix_hero_section()
        self._fix_contact_section()
        self._fix_analytics_section()
        self._fix_ai_analytics_section()
        self._fix_architecting_excellence()
        self._fix_about_tablet_section()
        self._fix_why_choose_us_section()
        self._fix_human_touch_section()
        self._fix_benefits_section()
        self._fix_faq_section()
        self._fix_social_media()
        self._fix_enhanced_footer()
        self._fix_site_settings()
        self._fix_pricing_section()
        self._populate_metric_boxes()
        self._populate_feature_cards()
        self._populate_country_data()
        self._populate_chat_messages()
        self._populate_video_tabs()
        self._populate_faq_items()
        self._populate_navigation()
        self._populate_benefit_items()
        self._populate_service_cards()

        self.stdout.write('\n' + '='*60)
        self.stdout.write(self.style.SUCCESS('ALL PRODUCTION DATA POPULATED SUCCESSFULLY!'))
        self.stdout.write('='*60)

    # ========================================================
    # FIX methods - always update to correct production values
    # ========================================================

    def _fix_hero_section(self):
        hero = HeroSection.objects.first()
        if not hero:
            hero = HeroSection()
        hero.tagline = 'Build. Automate. Scale.'
        hero.title = 'floneo'
        hero.description = (
            "FloNeo's Low-Code/No-Code platform turns manual processes into instant, "
            "powerful applications. It gives teams the agility to build and deploy real "
            "business solutions in hours, not months."
        )
        hero.cta_primary_text = 'Get Started'
        hero.cta_primary_url = '/contact'
        hero.cta_secondary_text = 'Schedule a Demo'
        hero.cta_secondary_url = '#'
        hero.is_visible = True
        hero.order = 1
        hero.save()
        self.stdout.write(self.style.SUCCESS('[OK] HeroSection'))

    def _fix_contact_section(self):
        contact = ContactSection.objects.first()
        if not contact:
            contact = ContactSection()
        contact.title = 'Get in Touch'
        contact.subtitle = 'Contact Us'
        contact.description = "Ready to transform your business? Let's talk about how we can help you achieve your goals."
        contact.email = 'admin@floneo.co'
        contact.phone = '+91 7994147201'
        contact.address = 'door no 1-650, Kollam, Kerala 691572, India'
        contact.form_title = 'Contact our sales team'
        contact.form_submit_text = 'Send Message'
        contact.form_success_message = "Thank you for your message! We'll get back to you soon."
        contact.is_visible = True
        contact.order = 7
        contact.save()
        self.stdout.write(self.style.SUCCESS('[OK] ContactSection'))

    def _fix_analytics_section(self):
        section = AnalyticsSection.objects.first()
        if not section:
            section = AnalyticsSection()
        section.title = 'AI-Powered Analytics'
        section.subtitle = 'Smart Insights'
        section.description = 'Transform your data into actionable insights with our advanced analytics platform'
        section.content = 'Leverage machine learning algorithms to discover patterns and optimize your business operations'
        section.savings_amount = '$2.4M'
        section.save()
        self.stdout.write(self.style.SUCCESS('[OK] AnalyticsSection'))

    def _fix_ai_analytics_section(self):
        section = AIPoweredAnalyticsSection.objects.first()
        if not section:
            section = AIPoweredAnalyticsSection()
        section.title = 'AI-Powered Analytics'
        section.description = 'Harness the power of AI to transform your data into actionable insights'
        section.feature_1_title = 'Development Speed'
        section.feature_1_description = 'Accelerate delivery by replacing repetitive coding with visual workflows and reusable components.'
        section.feature_2_title = 'Scalability & Governance'
        section.feature_2_description = 'Build applications that scale securely without re-architecture or system rewrites.'
        section.feature_3_title = 'Cost Efficiency'
        section.feature_3_description = 'Reduce engineering overhead, maintenance effort, and long-term technical debt.'
        section.is_visible = True
        section.order = 3
        section.save()
        self.stdout.write(self.style.SUCCESS('[OK] AIPoweredAnalyticsSection'))

    def _fix_architecting_excellence(self):
        section = ArchitectingExcellenceSection.objects.first()
        if not section:
            section = ArchitectingExcellenceSection()
        section.badge_text = 'ABOUT US'
        section.main_title_line1 = 'Architecting'
        section.main_title_line2 = 'Excellence'
        section.subtitle = "Together, we're creating a seamless experience that puts you in charge of your operations without IT bottlenecks."
        section.philosophy_title = (
            "At FloNeo, we've redefined workflow creation. We believe it should be as simple "
            "as stacking blocks\u2014visual, instant, and accessible to everyone. FloNeo turns "
            "every user into a builder."
        )
        section.philosophy_button_text = 'View Services'
        section.philosophy_button_url = '#'
        section.counter_1_value = 70
        section.counter_1_label = 'Process Efficiency'
        section.counter_2_value = 85
        section.counter_2_label = 'Automation Success'
        section.team_name = 'Team floneo'
        section.team_role = 'CCO & Co-Founder'
        section.step_1_title = 'Define requirements.'
        section.step_1_description = 'Define application scope, goal, users type, data strategy in scope.'
        section.step_2_title = 'Design Prototype (floneo builder)'
        section.step_2_description = (
            '\u2022 Configure templates, select pre built templates & modify them. '
            '\u2022 Design user interfaces by drag and drop in Visual builder. '
            '\u2022 Data Modeling with Databases or connect to existing data. '
            '\u2022 Set the functional properties by FloNeo Workflow Blocks.'
        )
        section.step_3_title = 'Test the newly built app.'
        section.step_3_description = (
            '\u2022 Functional Testing '
            '\u2022 Integration Testing '
            '\u2022 Performance Testing (In case of users & transactions count is high) '
            '\u2022 Security & Compliance Review'
        )
        section.step_4_title = 'Deploy and manage.'
        section.step_4_description = (
            '\u2022 One click Deployment (Publish app in the web for users access) '
            '\u2022 Define user access & roles '
            '\u2022 Live Monitoring (Production)'
        )
        section.is_visible = True
        section.order = 4
        section.save()
        self.stdout.write(self.style.SUCCESS('[OK] ArchitectingExcellenceSection'))

    def _fix_about_tablet_section(self):
        section = AboutTabletSection.objects.first()
        if not section:
            section = AboutTabletSection()
        section.title = 'Experience the Future'
        section.subtitle = '3D Interactive Demo'
        section.description = 'Discover our platform through an immersive 3D experience'
        section.video_url = 'https://youtu.be/9pNIZ0hx7VE?si=g8zn45IbQRXx04fS'
        section.video_autoplay = True
        section.video_muted = False
        section.video_loop = True
        section.video_controls = False
        section.enable_3d_animation = True
        section.animation_duration = 1.0
        section.is_visible = True
        section.order = 2
        section.save()
        self.stdout.write(self.style.SUCCESS('[OK] AboutTabletSection'))

    def _fix_why_choose_us_section(self):
        section = WhyChooseUsSection.objects.first()
        if not section:
            section = WhyChooseUsSection()
        section.badge_text = 'WHY CHOOSE US'
        section.title = 'Architecting Excellence'
        section.subtitle = 'that puts you in charge of your operations without IT bottlenecks.'
        section.description = 'Experience unparalleled quality and innovation'
        section.stat_1_value = '75'
        section.stat_1_label = 'spending habits'
        section.stat_2_value = '60'
        section.stat_2_label = 'cost reductions'
        section.stat_3_value = '45'
        section.stat_3_label = 'efficiency gains'
        section.global_title = 'Global Reach'
        section.global_description = 'Our app supports users in over 140 countries, offering global tools to manage and optimize your finances.'
        section.is_visible = True
        section.order = 5
        section.save()
        self.stdout.write(self.style.SUCCESS('[OK] WhyChooseUsSection'))

    def _fix_human_touch_section(self):
        section = HumanTouchSection.objects.first()
        if not section:
            section = HumanTouchSection()
        section.title = 'The Human Touch in Automation'
        section.subtitle = 'Workflow Management'
        section.description = 'Combining human insight with automated efficiency'
        section.benefit_1_title = 'Intuitive Design'
        section.benefit_1_description = 'User-friendly interface that anyone can master'
        section.benefit_2_title = 'Smart Automation'
        section.benefit_2_description = 'Intelligent workflows that adapt to your needs'
        section.benefit_3_title = 'Human Oversight'
        section.benefit_3_description = 'Maintain control while automating processes'
        section.cta_text = 'Learn More'
        section.cta_url = '#'
        section.is_visible = True
        section.order = 5
        section.save()
        self.stdout.write(self.style.SUCCESS('[OK] HumanTouchSection'))

    def _fix_benefits_section(self):
        section = BenefitsSection.objects.first()
        if not section:
            section = BenefitsSection()
        section.title = 'More than'
        section.subtitle = 'Automation'
        section.description = "Floneo isn't just about managing processes \u2014 it builds, automates, and scales the workflows that fuel your business."
        section.cta_primary_text = 'Get Started Free'
        section.cta_primary_url = 'https://calendly.com/demo-floneo/demo-booking'
        section.cta_secondary_text = 'Learn More'
        section.cta_secondary_url = 'https://www.linkedin.com/company/floneo'
        section.is_visible = True
        section.order = 5
        section.save()
        self.stdout.write(self.style.SUCCESS('[OK] BenefitsSection'))

    def _fix_faq_section(self):
        section = FAQSection.objects.first()
        if not section:
            section = FAQSection()
        section.title = 'Architecting Excellence'
        section.subtitle = 'HELP CENTER'
        section.description = "Together, we're creating a seamless experience that puts you in charge of your operations without bottlenecks."
        section.is_visible = True
        section.order = 6
        section.save()
        self.stdout.write(self.style.SUCCESS('[OK] FAQSection'))

    def _fix_social_media(self):
        section = SocialMediaSection.objects.first()
        if not section:
            section = SocialMediaSection()
        section.title = 'Connect With Us'
        section.subtitle = 'Social Media'
        section.is_visible = True
        section.order = 8
        section.save()

        # Update/create social links with REAL URLs
        links = [
            {
                'platform': 'linkedin',
                'platform_name': 'LinkedIn',
                'url': 'https://www.linkedin.com/company/floneo-tech/',
                'icon_class': 'fab fa-linkedin-in',
                'order': 1,
            },
            {
                'platform': 'twitter',
                'platform_name': 'X',
                'url': 'https://x.com/Floneotech',
                'icon_class': 'fab fa-x-twitter',
                'order': 2,
            },
            {
                'platform': 'youtube',
                'platform_name': 'YouTube',
                'url': 'https://www.youtube.com/@FloneoTechnologies',
                'icon_class': 'fab fa-youtube',
                'order': 3,
            },
        ]
        # Clear old links and recreate with correct data
        SocialMediaLink.objects.all().delete()
        for link_data in links:
            SocialMediaLink.objects.create(is_active=True, **link_data)
        self.stdout.write(self.style.SUCCESS('[OK] SocialMediaSection + 3 links'))

    def _fix_enhanced_footer(self):
        section = EnhancedFooterSection.objects.first()
        if not section:
            section = EnhancedFooterSection()
        section.company_name = 'floneo'
        section.tagline = 'Build. Automate. Scale.'
        section.description = 'Transform your business with our innovative automation platform'
        section.copyright_text = '\u00a9 2025 floneo. All rights reserved.'
        section.privacy_policy_text = 'Privacy Policy'
        section.privacy_policy_url = '/privacy-policy'
        section.terms_conditions_text = 'Terms & Conditions'
        section.terms_conditions_url = '/terms'
        section.is_visible = True
        section.order = 9
        section.save()

        # Also update legacy footer
        footer = FooterSection.objects.first()
        if footer:
            footer.tagline = 'Build. Automate. Scale.'
            footer.copyright_text = '\u00a9 2025 floneo. All rights reserved.'
            footer.save()

        self.stdout.write(self.style.SUCCESS('[OK] EnhancedFooterSection + FooterSection'))

    def _fix_site_settings(self):
        section = SiteSettings.objects.first()
        if not section:
            section = SiteSettings()
        section.site_name = 'floneo'
        section.site_description = 'Low-Code/No-Code Platform for Business Automation'
        section.meta_title = 'floneo - Business Automation Platform'
        section.meta_description = 'Transform your business with our low-code automation platform'
        section.meta_keywords = 'automation, low-code, no-code, business, platform, workflow'
        section.primary_email = 'admin@floneo.co'
        section.primary_phone = '+91 7994147201'
        section.maintenance_mode = False
        section.save()
        self.stdout.write(self.style.SUCCESS('[OK] SiteSettings'))

    def _fix_pricing_section(self):
        section = PricingSection.objects.first()
        if not section:
            section = PricingSection()
        section.title = 'Architecting Excellence'
        section.subtitle = 'Flexible pricing for every business'
        section.description = "Together, we're creating a seamless experience that puts you in charge of your operations without bottlenecks."
        section.is_visible = True
        section.order = 5
        section.save()

        # Update pricing plans with correct data matching frontend
        plans_data = [
            {
                'name': 'Mini',
                'plan_type': 'basic',
                'price': '5.00',
                'price_period': 'month',
                'description': 'Perfect for individuals or small projects with essential features.',
                'is_popular': False,
                'cta_text': 'Buy Package',
                'cta_url': '/contact',
                'order': 1,
                'features': [
                    'Up to 3 projects',
                    'Basic analytics',
                    'Email support',
                    '5GB storage',
                    'Standard templates',
                ],
            },
            {
                'name': 'Basic',
                'plan_type': 'basic',
                'price': '10.00',
                'price_period': 'month',
                'description': 'Ideal for growing teams with core tools and functionality.',
                'is_popular': False,
                'cta_text': 'Buy Package',
                'cta_url': '/contact',
                'order': 2,
                'features': [
                    'Up to 10 projects',
                    'Advanced analytics',
                    'Priority support',
                    '50GB storage',
                    'Custom templates',
                    'Team collaboration',
                ],
            },
            {
                'name': 'Pro',
                'plan_type': 'pro',
                'price': '20.00',
                'price_period': 'month',
                'description': 'Advanced features and higher limits for scaling businesses.',
                'is_popular': True,
                'cta_text': 'Buy Package',
                'cta_url': '/contact',
                'order': 3,
                'features': [
                    'Unlimited projects',
                    'Premium analytics',
                    '24/7 phone support',
                    '500GB storage',
                    'White-label options',
                    'Advanced integrations',
                    'Custom workflows',
                ],
            },
        ]

        # Clear old plans and recreate
        PricingPlan.objects.all().delete()
        for plan_data in plans_data:
            features = plan_data.pop('features')
            plan = PricingPlan.objects.create(**plan_data)
            for i, feat_text in enumerate(features):
                PricingFeature.objects.create(plan=plan, feature_text=feat_text, is_included=True, order=i)
        self.stdout.write(self.style.SUCCESS('[OK] PricingSection + 3 plans'))

    # ========================================================
    # POPULATE methods - only create if missing
    # ========================================================

    def _populate_metric_boxes(self):
        if MetricBox.objects.exists():
            self.stdout.write('[OK] MetricBox: already has data')
            return
        metrics = [
            {'value': '68', 'suffix': '%', 'label': 'Faster Process Developments',
             'description': 'Teams build, test, and roll out workflows 68% faster compared to traditional development.',
             'color': '#FFC107', 'order': 1},
            {'value': '72', 'suffix': '%', 'label': 'Less Operational Overheads',
             'description': 'By automating approvals, handoffs, and reporting, organizations cut repetitive manual work by 72%. FloNeo optimizes team time and resources \u2014 allowing talent to focus on innovation, not administration.',
             'color': '#00D084', 'order': 2},
            {'value': '99', 'suffix': '%', 'label': 'Accuracy and Compliance',
             'description': 'Each workflow built on FloNeo runs with 99.3% data accuracy across integrated systems. Every action is tracked, logged, and audit-ready \u2014 ensuring full governance without friction.',
             'color': '#FF1493', 'order': 3},
        ]
        for data in metrics:
            MetricBox.objects.create(**data)
        self.stdout.write(self.style.SUCCESS(f'[OK] MetricBox: created {len(metrics)}'))

    def _populate_feature_cards(self):
        if FeatureCard.objects.exists():
            self.stdout.write('[OK] FeatureCard: already has data')
            return
        features = [
            {'title': 'Lightning Fast', 'description': 'Build and deploy applications in hours, not months. Our platform accelerates development by 10x.', 'icon_name': 'zap', 'order': 1},
            {'title': 'Advanced Analytics', 'description': 'Get real-time insights with AI-powered analytics dashboards. Track performance and optimize workflows.', 'icon_name': 'bar-chart-3', 'order': 2},
            {'title': 'Time Saving', 'description': 'Automate repetitive tasks and save hundreds of hours per month. Focus on what matters most.', 'icon_name': 'clock', 'order': 3},
            {'title': 'Enterprise Security', 'description': 'Bank-grade security with end-to-end encryption. SOC 2 compliant and GDPR ready.', 'icon_name': 'shield', 'order': 4},
            {'title': 'Seamless Integration', 'description': 'Connect with 200+ tools and services. REST APIs, webhooks, and native integrations included.', 'icon_name': 'plug', 'order': 5},
            {'title': 'Scalable Infrastructure', 'description': 'Built to scale from startup to enterprise. Auto-scaling infrastructure handles any workload.', 'icon_name': 'layers', 'order': 6},
        ]
        for data in features:
            FeatureCard.objects.create(**data)
        self.stdout.write(self.style.SUCCESS(f'[OK] FeatureCard: created {len(features)}'))

    def _populate_country_data(self):
        if CountryData.objects.exists():
            self.stdout.write('[OK] CountryData: already has data')
            return
        countries = [
            {'name': 'France', 'flag_emoji': '\U0001f1eb\U0001f1f7', 'country_code': 'fr', 'order': 1},
            {'name': 'Ukraine', 'flag_emoji': '\U0001f1fa\U0001f1e6', 'country_code': 'ua', 'order': 2},
            {'name': 'Netherlands', 'flag_emoji': '\U0001f1f3\U0001f1f1', 'country_code': 'nl', 'order': 3},
            {'name': 'USA', 'flag_emoji': '\U0001f1fa\U0001f1f8', 'country_code': 'us', 'order': 4},
            {'name': 'Canada', 'flag_emoji': '\U0001f1e8\U0001f1e6', 'country_code': 'ca', 'order': 5},
            {'name': 'Japan', 'flag_emoji': '\U0001f1ef\U0001f1f5', 'country_code': 'jp', 'order': 6},
            {'name': 'Denmark', 'flag_emoji': '\U0001f1e9\U0001f1f0', 'country_code': 'dk', 'order': 7},
            {'name': 'Germany', 'flag_emoji': '\U0001f1e9\U0001f1ea', 'country_code': 'de', 'order': 8},
            {'name': 'Australia', 'flag_emoji': '\U0001f1e6\U0001f1fa', 'country_code': 'au', 'order': 9},
            {'name': 'United Kingdom', 'flag_emoji': '\U0001f1ec\U0001f1e7', 'country_code': 'gb', 'order': 10},
            {'name': 'India', 'flag_emoji': '\U0001f1ee\U0001f1f3', 'country_code': 'in', 'order': 11},
            {'name': 'Brazil', 'flag_emoji': '\U0001f1e7\U0001f1f7', 'country_code': 'br', 'order': 12},
            {'name': 'Singapore', 'flag_emoji': '\U0001f1f8\U0001f1ec', 'country_code': 'sg', 'order': 13},
            {'name': 'South Korea', 'flag_emoji': '\U0001f1f0\U0001f1f7', 'country_code': 'kr', 'order': 14},
            {'name': 'Sweden', 'flag_emoji': '\U0001f1f8\U0001f1ea', 'country_code': 'se', 'order': 15},
        ]
        for data in countries:
            CountryData.objects.create(is_active=True, **data)
        self.stdout.write(self.style.SUCCESS(f'[OK] CountryData: created {len(countries)}'))

    def _populate_chat_messages(self):
        section = HumanTouchSection.objects.first()
        if not section:
            self.stdout.write('[SKIP] ChatMessage: no HumanTouchSection')
            return
        if section.chat_messages.exists():
            self.stdout.write('[OK] ChatMessage: already has data')
            return
        messages = [
            {'text': 'Yo, Michi!', 'sender': 'user', 'order': 1, 'delay': 0},
            {'text': 'Have you heard of floneo?', 'sender': 'user', 'order': 2, 'delay': 0.5},
            {'text': 'Hi, Michi', 'sender': 'bot', 'order': 3, 'delay': 1.5},
            {'text': "No, I haven't. What is it?", 'sender': 'bot', 'order': 4, 'delay': 2},
            {'text': "It's an app for managing your finances", 'sender': 'user', 'order': 5, 'delay': 3},
            {'text': 'Check it out \U0001f60a', 'sender': 'user', 'order': 6, 'delay': 3.5},
            {'text': 'Wow \U0001f60d\U0001f60d\U0001f60d', 'sender': 'bot', 'order': 7, 'delay': 4.5},
            {'text': 'It looks very convenient and modern! I want to try it', 'sender': 'bot', 'order': 8, 'delay': 5},
            {'text': 'Really cool App', 'sender': 'user', 'order': 9, 'delay': 6},
            {'text': '\U0001f60d', 'sender': 'user', 'order': 10, 'delay': 6.2},
            {'text': 'Already installed it! Thanks!', 'sender': 'bot', 'order': 11, 'delay': 7},
        ]
        for msg in messages:
            ChatMessage.objects.create(human_touch_section=section, **msg)
        self.stdout.write(self.style.SUCCESS(f'[OK] ChatMessage: created {len(messages)}'))

    def _populate_video_tabs(self):
        section = VideoTabsSection.objects.first()
        if not section:
            section = VideoTabsSection.objects.create(
                title='See It In Action',
                subtitle='Interactive Video Demos',
                description='Explore our features through interactive video demonstrations',
                is_visible=True,
                order=6,
            )
        if section.tabs.exists():
            self.stdout.write('[OK] VideoTab: already has data')
            return
        tabs = [
            {'tab_title': 'Build', 'tab_description': 'Create powerful applications with our intuitive drag-and-drop builder', 'is_active': True, 'order': 1},
            {'tab_title': 'Automate', 'tab_description': 'Streamline your workflows with intelligent automation', 'is_active': True, 'order': 2},
            {'tab_title': 'Scale', 'tab_description': 'Grow your business without technical limitations', 'is_active': True, 'order': 3},
        ]
        for tab in tabs:
            VideoTab.objects.create(section=section, **tab)
        self.stdout.write(self.style.SUCCESS(f'[OK] VideoTab: created {len(tabs)}'))

    def _populate_faq_items(self):
        # Clear all and recreate with correct data from frontend
        FAQItem.objects.all().delete()
        items = [
            {'question': 'How to view the demo?',
             'answer': "Demo will be ready by Nov 20'th 2025. Please reserve your slot in contact details.",
             'order': 1, 'is_active': True},
            {'question': 'How AI assists floneo?',
             'answer': 'With floneo, the workflow includes AI blocks that empower users to build and integrate custom functionalities.',
             'order': 2, 'is_active': True},
            {'question': 'Is floneo designed for a non-technical audience?',
             'answer': 'Floneo is exceptionally user-friendly, allowing users to create or manage applications without requiring any technical skills.',
             'order': 3, 'is_active': True},
            {'question': 'Is floneo optimized for particular market sectors?',
             'answer': 'floneo is highly versatile, capable of building applications for any type of business, including Startups, FinTech, BFSI, Energy, Manufacturing, Retail, and more.',
             'order': 4, 'is_active': True},
            {'question': 'What are the floneo licensing models?',
             'answer': 'Currently, we are offering floneo under three subscription based licensing models: Basic, Pro, and Enterprise.',
             'order': 5, 'is_active': True},
            {'question': 'How about on-premise deployment?',
             'answer': 'Yes, floneo has the flexibility of deploying on premises, private cloud, and as service also.',
             'order': 6, 'is_active': True},
        ]
        for item in items:
            FAQItem.objects.create(**item)
        self.stdout.write(self.style.SUCCESS(f'[OK] FAQItem: created {len(items)}'))

    def _populate_navigation(self):
        # Always recreate navigation to ensure correct data
        NavigationItem.objects.all().delete()
        items = [
            {'label': 'Home',     'href': '#',        'order': 1, 'is_active': True, 'nav_type': 'normal', 'open_in_new_tab': False, 'badge_text': ''},
            {'label': 'About Us', 'href': '#about-us','order': 2, 'is_active': True, 'nav_type': 'normal', 'open_in_new_tab': False, 'badge_text': ''},
            {'label': 'Features', 'href': '#features','order': 3, 'is_active': True, 'nav_type': 'normal', 'open_in_new_tab': False, 'badge_text': ''},
            {'label': 'Blogs',    'href': '/blogs',   'order': 4, 'is_active': True, 'nav_type': 'blog',   'open_in_new_tab': False, 'badge_text': ''},
            {'label': 'Help',     'href': '#help',    'order': 5, 'is_active': True, 'nav_type': 'normal', 'open_in_new_tab': False, 'badge_text': ''},
            {'label': 'Contact',  'href': '#contact', 'order': 6, 'is_active': True, 'nav_type': 'normal', 'open_in_new_tab': False, 'badge_text': ''},
        ]
        for item in items:
            NavigationItem.objects.create(**item)
        self.stdout.write(self.style.SUCCESS(f'[OK] NavigationItem: created {len(items)}'))

    def _populate_benefit_items(self):
        section = BenefitsSection.objects.first()
        if not section:
            self.stdout.write('[SKIP] BenefitItem: no BenefitsSection')
            return
        # Clear and recreate to match frontend exactly
        section.benefits.all().delete()
        items = [
            {'title': 'Top Security', 'icon': '\U0001f512', 'position': 'top-left', 'order': 1},
            {'title': 'Cloud Sync', 'icon': '\u2601\ufe0f', 'position': 'top-center', 'order': 2},
            {'title': 'Fast Transactions', 'icon': '\u26a1', 'position': 'top-right', 'order': 3},
            {'title': 'AI Analytics', 'icon': '\U0001f4ca', 'position': 'middle-left', 'order': 4},
            {'title': 'Real-time Monitoring', 'icon': '\U0001f4e1', 'position': 'middle-right', 'order': 5},
            {'title': 'Smart Alerts', 'icon': '\U0001f514', 'position': 'bottom-left', 'order': 6},
            {'title': 'Workflow Builder', 'icon': '\U0001f527', 'position': 'bottom-right', 'order': 7},
            {'title': 'Customizable Dashboards', 'icon': '\U0001f4bb', 'position': 'bottom-center', 'order': 8},
        ]
        for item in items:
            BenefitItem.objects.create(section=section, is_active=True, **item)
        self.stdout.write(self.style.SUCCESS(f'[OK] BenefitItem: created {len(items)}'))

    def _populate_service_cards(self):
        if ServiceCard.objects.exists():
            self.stdout.write('[OK] ServiceCard: already has data')
            return
        services = [
            {
                'title': 'Seamless Workflow Integration',
                'description': (
                    'Effortlessly design, connect, and automate workflows across teams and systems. '
                    'With our drag-and-drop builder and AI-powered recommendations, your operations '
                    'run smoother without IT bottlenecks.'
                ),
                'color': '#0066ff',
                'order': 1,
            },
            {
                'title': 'Data Analytics',
                'description': (
                    'Transform your data into actionable insights with powerful analytics tools. '
                    'Make data-driven decisions faster with real-time dashboards and intelligent reporting.'
                ),
                'color': '#2ecc71',
                'order': 2,
            },
            {
                'title': 'Workflow Management',
                'description': (
                    'Streamline your business processes with intelligent workflow automation. '
                    'Reduce manual tasks and increase productivity across your organization.'
                ),
                'color': '#9b59b6',
                'order': 3,
            },
            {
                'title': 'Integration Platform',
                'description': (
                    'Connect all your tools and systems with seamless integrations. '
                    'Build a unified ecosystem that works the way you do, without switching between apps.'
                ),
                'color': '#e74c3c',
                'order': 4,
            },
        ]
        for data in services:
            ServiceCard.objects.create(**data)
        self.stdout.write(self.style.SUCCESS(f'[OK] ServiceCard: created {len(services)}'))
