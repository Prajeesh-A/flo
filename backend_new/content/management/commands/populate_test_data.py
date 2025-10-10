from django.core.management.base import BaseCommand
from content.models import (
    HeroSection, PricingSection, PricingPlan, PricingFeature,
    FAQSection, FAQItem, SocialMediaSection, SocialMediaLink
)


class Command(BaseCommand):
    help = 'Populate test data for the website'

    def handle(self, *args, **options):
        self.stdout.write('Populating test data...')

        # Update Hero Section
        hero, created = HeroSection.objects.get_or_create(
            id=1,
            defaults={
                'tagline': 'Build. Automate. Scale. Without the IT Bottleneck',
                'title': ' floneo',
                'description': ' floneo Low-Code/No-Code platform turns manual processes into instant, powerful applications. Build and deploy real business solutions in hours, not months.',
                'cta_primary_text': 'Get Started Free',
                'cta_primary_url': '/signup',
                'cta_secondary_text': 'Watch Demo',
                'cta_secondary_url': '/demo',
                'is_visible': True,
                'order': 1,
            }
        )
        if not created:
            hero.tagline = 'Build. Automate. Scale. Without the IT Bottleneck - UPDATED!'
            hero.title = ' floneo - UPDATED'
            hero.description = ' floneo Low-Code/No-Code platform turns manual processes into instant, powerful applications. Build and deploy real business solutions in hours, not months. [UPDATED FROM ADMIN]'
            hero.save()
        
        self.stdout.write(f'Hero section {"created" if created else "updated"}')

        # Create Pricing Section
        pricing_section, created = PricingSection.objects.get_or_create(
            id=1,
            defaults={
                'title': 'Choose Your Plan',
                'subtitle': 'Flexible pricing for every business',
                'description': 'Select the perfect plan for your needs',
                'is_visible': True,
                'order': 5,
            }
        )
        self.stdout.write(f'Pricing section {"created" if created else "exists"}')

        # Create Pricing Plans
        plans_data = [
            {
                'name': 'Starter',
                'plan_type': 'basic',
                'price': '0.00',
                'price_period': 'month',
                'description': 'Perfect for individuals and small teams getting started',
                'is_popular': False,
                'order': 1,
                'features': [
                    'Up to 3 applications',
                    '100 records per app',
                    'Basic templates',
                    'Email support',
                ]
            },
            {
                'name': 'Professional',
                'plan_type': 'pro',
                'price': '29.00',
                'price_period': 'month',
                'description': 'Ideal for growing businesses and teams',
                'is_popular': True,
                'order': 2,
                'features': [
                    'Unlimited applications',
                    '10,000 records per app',
                    'Advanced templates',
                    'Priority support',
                    'Custom integrations',
                    'Advanced analytics',
                ]
            },
            {
                'name': 'Enterprise',
                'plan_type': 'enterprise',
                'price': '99.00',
                'price_period': 'month',
                'description': 'For large organizations with advanced needs',
                'is_popular': False,
                'order': 3,
                'features': [
                    'Unlimited everything',
                    'Dedicated support',
                    'Custom development',
                    'SLA guarantee',
                    'Advanced security',
                    'White-label options',
                ]
            }
        ]

        for plan_data in plans_data:
            features = plan_data.pop('features')
            plan, created = PricingPlan.objects.get_or_create(
                name=plan_data['name'],
                defaults=plan_data
            )
            
            if created:
                for i, feature_text in enumerate(features):
                    PricingFeature.objects.create(
                        plan=plan,
                        feature_text=feature_text,
                        is_included=True,
                        order=i
                    )
            
            self.stdout.write(f'Pricing plan "{plan.name}" {"created" if created else "exists"}')

        # Create FAQ Section
        faq_section, created = FAQSection.objects.get_or_create(
            id=1,
            defaults={
                'title': 'Frequently Asked Questions',
                'subtitle': 'Help Center',
                'description': 'Find answers to common questions',
                'is_visible': True,
                'order': 6,
            }
        )
        self.stdout.write(f'FAQ section {"created" if created else "exists"}')

        # Create FAQ Items
        faq_data = [
            {
                'question': 'What is  floneo?',
                'answer': ' floneo is a low-code/no-code platform that helps businesses automate processes and build applications without extensive programming knowledge.',
                'order': 1,
            },
            {
                'question': 'How quickly can I build an application?',
                'answer': 'With  floneo, you can build and deploy business applications in hours or days, not months. Our intuitive drag-and-drop interface makes it easy.',
                'order': 2,
            },
            {
                'question': 'Do I need coding experience?',
                'answer': 'No!  floneo is designed for business users without coding experience. However, developers can also use advanced features for more complex applications.',
                'order': 3,
            },
        ]

        for faq_item_data in faq_data:
            faq_item, created = FAQItem.objects.get_or_create(
                question=faq_item_data['question'],
                defaults=faq_item_data
            )
            self.stdout.write(f'FAQ item "{faq_item.question[:30]}..." {"created" if created else "exists"}')

        # Create Social Media Section
        social_section, created = SocialMediaSection.objects.get_or_create(
            id=1,
            defaults={
                'title': 'Connect With Us',
                'subtitle': 'Follow us on social media',
                'is_visible': True,
                'order': 8,
            }
        )
        self.stdout.write(f'Social media section {"created" if created else "exists"}')

        # Create Social Media Links
        social_links_data = [
            {
                'platform': 'linkedin',
                'platform_name': 'LinkedIn',
                'url': 'https://linkedin.com/company/ floneo',
                'icon_class': 'fab fa-linkedin',
                'order': 1,
            },
            {
                'platform': 'twitter',
                'platform_name': 'Twitter',
                'url': 'https://twitter.com/ floneo',
                'icon_class': 'fab fa-twitter',
                'order': 2,
            },
            {
                'platform': 'instagram',
                'platform_name': 'Instagram',
                'url': 'https://instagram.com/ floneo',
                'icon_class': 'fab fa-instagram',
                'order': 3,
            },
        ]

        for social_data in social_links_data:
            social_link, created = SocialMediaLink.objects.get_or_create(
                platform=social_data['platform'],
                defaults=social_data
            )
            self.stdout.write(f'Social link "{social_link.platform_name}" {"created" if created else "exists"}')

        self.stdout.write(self.style.SUCCESS('Test data populated successfully!'))
