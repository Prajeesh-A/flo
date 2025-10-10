from django.core.management.base import BaseCommand
from content.models import (
    HeroSection, AboutSection, ServiceCard, MetricBox, 
    FeatureCard, AnalyticsSection, Testimonial, 
    FooterSection, NavigationItem
)


class Command(BaseCommand):
    help = 'Populate initial data for the  floneo website'

    def handle(self, *args, **options):
        self.stdout.write('Populating initial data...')

        # Create Hero Section
        hero, created = HeroSection.objects.get_or_create(
            defaults={
                'tagline': 'Build. Automate. Scale.',
                'title': 'Low-Code/No-Code Platform',
                'description': 'Turn manual processes into instant, powerful applications',
                'cta_primary_text': 'Get Started',
                'cta_secondary_text': 'Watch Demo'
            }
        )
        if created:
            self.stdout.write(f'✓ Created Hero Section')

        # Create About Section
        about, created = AboutSection.objects.get_or_create(
            defaults={
                'title': 'About  floneo',
                'description': 'We help businesses automate their processes and scale efficiently',
                'content': ' floneo is a comprehensive low-code/no-code platform that empowers businesses to transform their manual processes into powerful, automated applications.'
            }
        )
        if created:
            self.stdout.write(f'✓ Created About Section')

        # Create Service Cards
        services_data = [
            {
                'title': 'Process Automation',
                'description': 'Automate repetitive tasks and workflows to increase efficiency and reduce errors.',
                'color': 'blue',
                'order': 1
            },
            {
                'title': 'Data Integration',
                'description': 'Connect and synchronize data across multiple systems and platforms seamlessly.',
                'color': 'green',
                'order': 2
            },
            {
                'title': 'Custom Applications',
                'description': 'Build tailored applications that fit your specific business requirements.',
                'color': 'purple',
                'order': 3
            },
            {
                'title': 'Analytics & Reporting',
                'description': 'Generate insights and reports to make data-driven business decisions.',
                'color': 'orange',
                'order': 4
            }
        ]

        for service_data in services_data:
            service, created = ServiceCard.objects.get_or_create(
                title=service_data['title'],
                defaults=service_data
            )
            if created:
                self.stdout.write(f'✓ Created Service Card: {service.title}')

        # Create Metric Boxes
        metrics_data = [
            {
                'value': '85',
                'suffix': '%',
                'label': 'Process Efficiency',
                'description': 'of leaders use  floneo to cut hours and speed decisions',
                'color': 'blue',
                'order': 1
            },
            {
                'value': '92',
                'suffix': '%',
                'label': 'Budget Control',
                'description': 'gain budget control in 2 weeks',
                'color': 'green',
                'order': 2
            },
            {
                'value': '78',
                'suffix': '%',
                'label': 'Improved Savings',
                'description': 'of users improve savings in 3 months',
                'color': 'purple',
                'order': 3
            },
            {
                'value': '95',
                'suffix': '%',
                'label': 'Faster Adoption',
                'description': 'of teams accelerate process adoption in under 6 weeks',
                'color': 'orange',
                'order': 4
            }
        ]

        for metric_data in metrics_data:
            metric, created = MetricBox.objects.get_or_create(
                label=metric_data['label'],
                defaults=metric_data
            )
            if created:
                self.stdout.write(f'✓ Created Metric Box: {metric.label}')

        # Create Feature Cards
        features_data = [
            {
                'title': 'Faster Process Cycles',
                'description': 'Prototype in hours, launch in weeks.',
                'icon_name': 'zap',
                'order': 1
            },
            {
                'title': 'Easy Workflow',
                'description': 'Drag-and-drop UI, no steep learning curve.',
                'icon_name': 'bar-chart-3',
                'order': 2
            },
            {
                'title': 'Real-time Monitoring',
                'description': 'Real-time monitoring and alerts.',
                'icon_name': 'clock',
                'order': 3
            },
            {
                'title': 'AI Assistant',
                'description': 'AI assistant to answer questions instantly.',
                'icon_name': 'shield',
                'order': 4
            }
        ]

        for feature_data in features_data:
            feature, created = FeatureCard.objects.get_or_create(
                title=feature_data['title'],
                defaults=feature_data
            )
            if created:
                self.stdout.write(f'✓ Created Feature Card: {feature.title}')

        # Create Analytics Section
        analytics, created = AnalyticsSection.objects.get_or_create(
            defaults={
                'title': 'More than Automation',
                'subtitle': 'Our Analytics Feature',
                'description': 'Turn Insights Into Savings',
                'content': 'Our advanced analytics tools provide you with clear, actionable insights into your spending habits, helping you make smarter financial decisions.',
                'savings_amount': '$500+'
            }
        )
        if created:
            self.stdout.write(f'✓ Created Analytics Section')

        # Create Testimonial
        testimonial, created = Testimonial.objects.get_or_create(
            author_name='Leo Donovan',
            defaults={
                'quote': ' floneo makes managing your business processes simple and smart. With intuitive tools and real-time insights, we empower you to take control of your operations—whether it\'s automating workflows, saving time, or growing efficiency.',
                'author_title': 'CEO, Founder',
                'author_company': ' floneo',
                'order': 1
            }
        )
        if created:
            self.stdout.write(f'✓ Created Testimonial: {testimonial.author_name}')

        # Create Footer Section
        footer, created = FooterSection.objects.get_or_create(
            defaults={
                'tagline': 'Build. Automate. Scale.',
                'copyright_text': '© 2025  floneo. All rights reserved.'
            }
        )
        if created:
            self.stdout.write(f'✓ Created Footer Section')

        # Create Navigation Items
        nav_items_data = [
            {'label': 'Features', 'href': '#features', 'order': 1},
            {'label': 'Services', 'href': '#services', 'order': 2},
            {'label': 'Analytics', 'href': '#analytics', 'order': 3},
            {'label': 'Pricing', 'href': '#pricing', 'order': 4},
        ]

        for nav_data in nav_items_data:
            nav_item, created = NavigationItem.objects.get_or_create(
                label=nav_data['label'],
                defaults=nav_data
            )
            if created:
                self.stdout.write(f'✓ Created Navigation Item: {nav_item.label}')

        self.stdout.write(
            self.style.SUCCESS('Successfully populated initial data!')
        )
