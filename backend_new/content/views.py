from rest_framework import viewsets, status
from rest_framework.mixins import CreateModelMixin
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db import models
from django.core.management import call_command
from django.conf import settings as django_settings
import os
import io

from .models import (
    HeroSection, AboutSection, ServiceCard, MetricBox,
    FeatureCard, AnalyticsSection, Testimonial,
    FooterSection, NavigationItem, PricingSection, PricingPlan, PricingFeature,
    FAQSection, FAQItem, ContactSection, SocialMediaSection, SocialMediaLink,
    EnhancedFooterSection, SiteSettings, ContactFormSubmission,
    AboutTabletSection, AIPoweredAnalyticsSection, ArchitectingExcellenceSection,
    WhyChooseUsSection, HumanTouchSection, VideoTabsSection, VideoTab, CountryData,
    MetricsDisplaySection, PricingFeaturesSection, VideoTabsDemoSection, DemoTab,
    BenefitsSection, BenefitItem, ContactSubmission, PrivacyPolicy,
    BlogCategory, BlogTag, BlogPost, NewsletterSubscription
)
from .serializers import (
    HeroSectionSerializer, AboutSectionSerializer, ServiceCardSerializer,
    MetricBoxSerializer, FeatureCardSerializer, AnalyticsSectionSerializer,
    TestimonialSerializer, FooterSectionSerializer, NavigationItemSerializer,
    PricingSectionSerializer, PricingPlanSerializer, FAQSectionSerializer, FAQItemSerializer,
    ContactSectionSerializer, SocialMediaSectionSerializer, SocialMediaLinkSerializer,
    EnhancedFooterSectionSerializer, SiteSettingsSerializer, ContactFormSubmissionSerializer,
    WebsiteDataSerializer, AboutTabletSectionSerializer, AIPoweredAnalyticsSectionSerializer,
    ArchitectingExcellenceSectionSerializer, WhyChooseUsSectionSerializer, HumanTouchSectionSerializer, VideoTabsSectionSerializer,
    VideoTabSerializer, CountryDataSerializer, MetricsDisplaySectionSerializer,
    PricingFeaturesSectionSerializer, VideoTabsDemoSectionSerializer, DemoTabSerializer,
    BenefitsSectionSerializer, ContactSubmissionSerializer, PrivacyPolicySerializer,
    BlogCategorySerializer, BlogTagSerializer, BlogPostListSerializer, BlogPostDetailSerializer,
    NewsletterSubscriptionSerializer
)


class ServiceCardViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for service cards (read-only)"""
    queryset = ServiceCard.objects.all()
    serializer_class = ServiceCardSerializer


class MetricBoxViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for metric boxes (read-only)"""
    queryset = MetricBox.objects.all()
    serializer_class = MetricBoxSerializer


class FeatureCardViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for feature cards (read-only)"""
    queryset = FeatureCard.objects.all()
    serializer_class = FeatureCardSerializer


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for testimonials (read-only)"""
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer


class NavigationItemViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for navigation items (read-only)"""
    queryset = NavigationItem.objects.filter(is_active=True)
    serializer_class = NavigationItemSerializer


class PricingPlanViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for pricing plans (read-only)"""
    queryset = PricingPlan.objects.all()
    serializer_class = PricingPlanSerializer


class FAQItemViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for FAQ items (read-only)"""
    queryset = FAQItem.objects.filter(is_active=True)
    serializer_class = FAQItemSerializer


class SocialMediaLinkViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for social media links (read-only)"""
    queryset = SocialMediaLink.objects.filter(is_active=True)
    serializer_class = SocialMediaLinkSerializer


class ContactFormSubmissionViewSet(viewsets.ModelViewSet):
    """API endpoint for contact form submissions — saves to ContactSubmission and sends email"""
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer
    http_method_names = ['post']  # Only allow POST requests

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                submission = serializer.save()
                # Send email notification
                from .utils import send_contact_notification_email
                try:
                    send_contact_notification_email(submission)
                except Exception as email_err:
                    import logging
                    logging.getLogger(__name__).warning(f'Email notification failed: {email_err}')
                return Response({
                    'message': 'Contact form submitted successfully',
                    'success': True
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({
                    'error': 'Failed to process submission',
                    'message': str(e),
                    'success': False
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({
            'error': 'Invalid form data',
            'errors': serializer.errors,
            'success': False
        }, status=status.HTTP_400_BAD_REQUEST)


# Single instance endpoints (for sections that should only have one instance)

@api_view(['GET'])
def hero_section_detail(request):
    """Get hero section content"""
    try:
        hero = HeroSection.objects.first()
        if not hero:
            # Create default hero section if none exists
            hero = HeroSection.objects.create()
        serializer = HeroSectionSerializer(hero, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def about_section_detail(request):
    """Get about section content"""
    try:
        about = AboutSection.objects.first()
        if not about:
            # Create default about section if none exists
            about = AboutSection.objects.create()
        serializer = AboutSectionSerializer(about, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def analytics_section_detail(request):
    """Get analytics section content"""
    try:
        analytics = AnalyticsSection.objects.first()
        if not analytics:
            # Create default analytics section if none exists
            analytics = AnalyticsSection.objects.create()
        serializer = AnalyticsSectionSerializer(analytics, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def footer_section_detail(request):
    """Get footer section content"""
    try:
        footer = FooterSection.objects.first()
        if not footer:
            # Create default footer section if none exists
            footer = FooterSection.objects.create()
        serializer = FooterSectionSerializer(footer, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# New single instance endpoints

@api_view(['GET'])
def pricing_section_detail(request):
    """Get pricing section content"""
    try:
        pricing = PricingSection.objects.first()
        if not pricing:
            pricing = PricingSection.objects.create()
        serializer = PricingSectionSerializer(pricing, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def faq_section_detail(request):
    """Get FAQ section content"""
    try:
        faq = FAQSection.objects.first()
        if not faq:
            faq = FAQSection.objects.create()
        serializer = FAQSectionSerializer(faq, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def contact_section_detail(request):
    """Get contact section content"""
    try:
        contact = ContactSection.objects.first()
        if not contact:
            contact = ContactSection.objects.create()
        serializer = ContactSectionSerializer(contact, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def social_media_section_detail(request):
    """Get social media section content"""
    try:
        social = SocialMediaSection.objects.first()
        if not social:
            social = SocialMediaSection.objects.create()
        serializer = SocialMediaSectionSerializer(social, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def enhanced_footer_section_detail(request):
    """Get enhanced footer section content"""
    try:
        footer = EnhancedFooterSection.objects.first()
        if not footer:
            footer = EnhancedFooterSection.objects.create()
        serializer = EnhancedFooterSectionSerializer(footer, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def site_settings_detail(request):
    """Get site settings"""
    try:
        settings = SiteSettings.objects.first()
        if not settings:
            settings = SiteSettings.objects.create()
        serializer = SiteSettingsSerializer(settings, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Combined endpoint for all website data
@api_view(['GET'])
def website_data(request):
    """Get all website data in a single request"""
    try:
        # Get or create single instance sections
        hero_section = HeroSection.objects.first()
        if not hero_section:
            hero_section = HeroSection.objects.create()

        about_section = AboutSection.objects.first()
        if not about_section:
            about_section = AboutSection.objects.create()

        analytics_section = AnalyticsSection.objects.first()
        if not analytics_section:
            analytics_section = AnalyticsSection.objects.create()

        pricing_section = PricingSection.objects.first()
        if not pricing_section:
            pricing_section = PricingSection.objects.create()

        faq_section = FAQSection.objects.first()
        if not faq_section:
            faq_section = FAQSection.objects.create()

        contact_section = ContactSection.objects.first()
        if not contact_section:
            contact_section = ContactSection.objects.create()

        social_media_section = SocialMediaSection.objects.first()
        if not social_media_section:
            social_media_section = SocialMediaSection.objects.create()

        footer_section = FooterSection.objects.first()
        if not footer_section:
            footer_section = FooterSection.objects.create()

        enhanced_footer_section = EnhancedFooterSection.objects.first()
        if not enhanced_footer_section:
            enhanced_footer_section = EnhancedFooterSection.objects.create()

        site_settings = SiteSettings.objects.first()
        if not site_settings:
            site_settings = SiteSettings.objects.create()

        # Get multiple instance data
        service_cards = ServiceCard.objects.all().order_by('order', 'id')
        metric_boxes = MetricBox.objects.all().order_by('order', 'id')
        feature_cards = FeatureCard.objects.all().order_by('order', 'id')
        testimonials = Testimonial.objects.all().order_by('order', 'id')
        pricing_plans = PricingPlan.objects.all().order_by('order', 'id')
        faq_items = FAQItem.objects.filter(is_active=True).order_by('order', 'id')
        social_media_links = SocialMediaLink.objects.filter(is_active=True).order_by('order', 'id')
        navigation_items = NavigationItem.objects.filter(is_active=True).order_by('order', 'id')

        # Prepare data for serializer
        data = {
            'hero_section': hero_section,
            'about_section': about_section,
            'service_cards': service_cards,
            'metric_boxes': metric_boxes,
            'feature_cards': feature_cards,
            'analytics_section': analytics_section,
            'testimonials': testimonials,
            'pricing_section': pricing_section,
            'pricing_plans': pricing_plans,
            'faq_section': faq_section,
            'faq_items': faq_items,
            'contact_section': contact_section,
            'social_media_section': social_media_section,
            'social_media_links': social_media_links,
            'footer_section': footer_section,
            'enhanced_footer_section': enhanced_footer_section,
            'navigation_items': navigation_items,
            'site_settings': site_settings,
        }

        serializer = WebsiteDataSerializer(data, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# New viewsets for additional sections

class VideoTabViewSet(viewsets.ModelViewSet):
    """API endpoint for video tabs"""
    queryset = VideoTab.objects.filter(is_active=True)
    serializer_class = VideoTabSerializer


class CountryDataViewSet(viewsets.ModelViewSet):
    """API endpoint for country data"""
    queryset = CountryData.objects.filter(is_active=True)
    serializer_class = CountryDataSerializer


class DemoTabViewSet(viewsets.ModelViewSet):
    """API endpoint for demo tabs"""
    queryset = DemoTab.objects.filter(is_active=True)
    serializer_class = DemoTabSerializer


# New single instance endpoints

@api_view(['GET'])
def about_tablet_section_detail(request):
    """Get about tablet section content"""
    try:
        section = AboutTabletSection.objects.first()
        if not section:
            section = AboutTabletSection.objects.create()
        serializer = AboutTabletSectionSerializer(section, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def ai_powered_analytics_section_detail(request):
    """Get AI-powered analytics section content"""
    try:
        section = AIPoweredAnalyticsSection.objects.first()
        if not section:
            section = AIPoweredAnalyticsSection.objects.create()
        serializer = AIPoweredAnalyticsSectionSerializer(section, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def architecting_excellence_section_detail(request):
    """Get about us section content"""
    try:
        section = ArchitectingExcellenceSection.objects.first()
        if not section:
            section = ArchitectingExcellenceSection.objects.create()
        serializer = ArchitectingExcellenceSectionSerializer(section, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def why_choose_us_section_detail(request):
    """Get why choose us section content"""
    try:
        section = WhyChooseUsSection.objects.first()
        if not section:
            section = WhyChooseUsSection.objects.create()
        serializer = WhyChooseUsSectionSerializer(section, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def human_touch_section_detail(request):
    """Get human touch section content"""
    try:
        section = HumanTouchSection.objects.first()
        if not section:
            section = HumanTouchSection.objects.create()
        serializer = HumanTouchSectionSerializer(section, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def video_tabs_section_detail(request):
    """Get video tabs section content"""
    try:
        section = VideoTabsSection.objects.first()
        if not section:
            section = VideoTabsSection.objects.create()
        serializer = VideoTabsSectionSerializer(section, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def metrics_display_section_detail(request):
    """Get metrics display section content"""
    try:
        section = MetricsDisplaySection.objects.first()
        if not section:
            section = MetricsDisplaySection.objects.create()
        serializer = MetricsDisplaySectionSerializer(section, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def pricing_features_section_detail(request):
    """Get pricing features section content"""
    try:
        section = PricingFeaturesSection.objects.first()
        if not section:
            section = PricingFeaturesSection.objects.create()
        serializer = PricingFeaturesSectionSerializer(section, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def video_tabs_demo_section_detail(request):
    """Get video tabs demo section content"""
    try:
        section = VideoTabsDemoSection.objects.first()
        if not section:
            section = VideoTabsDemoSection.objects.create()
        serializer = VideoTabsDemoSectionSerializer(section, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def benefits_section_detail(request):
    """Get benefits section content"""
    try:
        section = BenefitsSection.objects.first()
        if not section:
            section = BenefitsSection.objects.create()
        serializer = BenefitsSectionSerializer(section, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def contact_submissions(request):
    """Handle contact form submissions"""
    if request.method == 'POST':
        serializer = ContactSubmissionSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            try:
                # Save the contact submission
                submission = serializer.save()

                # Send email notification
                from .utils import send_contact_notification_email
                send_contact_notification_email(submission)

                return Response({
                    'message': 'Contact form submitted successfully',
                    'success': True
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({
                    'error': 'Failed to process submission',
                    'message': str(e),
                    'success': False
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({
                'error': 'Invalid form data',
                'errors': serializer.errors,
                'success': False
            }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def privacy_policy_detail(request):
    """Get active privacy policy content"""
    try:
        privacy_policy = PrivacyPolicy.objects.filter(is_active=True).first()
        if not privacy_policy:
            # Create a default privacy policy if none exists
            privacy_policy = PrivacyPolicy.objects.create(
                title="Privacy Policy",
                subtitle="How we protect your information",
                is_active=True
            )
        serializer = PrivacyPolicySerializer(privacy_policy, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Blog Management API Views

class BlogCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for blog categories"""
    queryset = BlogCategory.objects.filter(is_active=True).order_by('order', 'name')
    serializer_class = BlogCategorySerializer


class BlogTagViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for blog tags"""
    queryset = BlogTag.objects.filter(is_active=True).order_by('name')
    serializer_class = BlogTagSerializer


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for blog posts with different serializers for list and detail views"""
    queryset = BlogPost.objects.filter(status='published').select_related('author', 'category').prefetch_related('tags').order_by('-published_at', '-created_at')

    def get_queryset(self):
        """Get published blog posts with optimized queries"""
        queryset = BlogPost.objects.filter(
            status='published'
        ).select_related(
            'author', 'category'
        ).prefetch_related(
            'tags'
        ).order_by('-published_at', '-created_at')

        # Filter by category if provided
        category_slug = self.request.query_params.get('category', None)
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)

        # Filter by tag if provided
        tag_slug = self.request.query_params.get('tag', None)
        if tag_slug:
            queryset = queryset.filter(tags__slug=tag_slug)

        # Filter by featured status if provided
        is_featured = self.request.query_params.get('featured', None)
        if is_featured is not None:
            queryset = queryset.filter(is_featured=is_featured.lower() == 'true')

        return queryset

    def get_serializer_class(self):
        """Use different serializers for list and detail views"""
        if self.action == 'list':
            return BlogPostListSerializer
        return BlogPostDetailSerializer

    def retrieve(self, request, *args, **kwargs):
        """Override retrieve to handle both ID and slug lookups, and increment view count"""
        lookup_value = kwargs.get('pk')

        # Try to get by slug first, then by ID
        try:
            if lookup_value.isdigit():
                instance = self.get_queryset().get(id=lookup_value)
            else:
                instance = self.get_queryset().get(slug=lookup_value)
        except BlogPost.DoesNotExist:
            return Response({'error': 'Blog post not found'}, status=status.HTTP_404_NOT_FOUND)

        # Increment view count
        BlogPost.objects.filter(id=instance.id).update(view_count=models.F('view_count') + 1)

        # Refresh instance to get updated view count
        instance.refresh_from_db()

        serializer = self.get_serializer(instance)
        return Response(serializer.data)


# Blog-related API endpoints

@api_view(['GET'])
def blog_categories_list(request):
    """Get all active blog categories"""
    try:
        categories = BlogCategory.objects.filter(is_active=True).order_by('order', 'name')
        serializer = BlogCategorySerializer(categories, many=True, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def blog_tags_list(request):
    """Get all active blog tags"""
    try:
        tags = BlogTag.objects.filter(is_active=True).order_by('name')
        serializer = BlogTagSerializer(tags, many=True, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def featured_blogs_list(request):
    """Get featured blog posts"""
    try:
        blogs = BlogPost.objects.filter(
            status='published',
            is_featured=True
        ).select_related(
            'author', 'category'
        ).prefetch_related(
            'tags'
        ).order_by('-published_at')[:6]  # Limit to 6 featured posts

        serializer = BlogPostListSerializer(blogs, many=True, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def recent_blogs_list(request):
    """Get recent blog posts"""
    try:
        limit = int(request.query_params.get('limit', 5))
        blogs = BlogPost.objects.filter(
            status='published'
        ).select_related(
            'author', 'category'
        ).prefetch_related(
            'tags'
        ).order_by('-published_at')[:limit]

        serializer = BlogPostListSerializer(blogs, many=True, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def populate_data_trigger(request):
    """HTTP trigger to run populate_production_data command.
    Usage: GET /api/populate-data/?key=FloNeo2025Populate
    """
    secret_key = request.query_params.get('key', '')
    if secret_key != 'FloNeo2025Populate':
        return Response({'error': 'Invalid key'}, status=status.HTTP_403_FORBIDDEN)

    try:
        output = io.StringIO()
        call_command('populate_production_data', stdout=output)
        result = output.getvalue()
        return Response({'status': 'success', 'output': result})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def setup_blogs_trigger(request):
    """HTTP trigger to delete demo blogs and create real blog posts.
    Usage: GET /api/setup-blogs/?key=FloNeo2025Populate
    """
    secret_key = request.query_params.get('key', '')
    if secret_key != 'FloNeo2025Populate':
        return Response({'error': 'Invalid key'}, status=status.HTTP_403_FORBIDDEN)

    try:
        output = io.StringIO()
        call_command('setup_blogs', stdout=output)
        result = output.getvalue()
        return Response({'status': 'success', 'output': result})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def newsletter_subscribe(request):
    """Subscribe to the blog newsletter"""
    serializer = NewsletterSubscriptionSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({
            'error': 'Invalid email address',
            'errors': serializer.errors,
            'success': False
        }, status=status.HTTP_400_BAD_REQUEST)

    email = serializer.validated_data['email']

    # Check if already subscribed
    existing = NewsletterSubscription.objects.filter(email=email).first()
    if existing:
        if existing.is_active:
            return Response({
                'message': 'You are already subscribed!',
                'success': True,
                'already_subscribed': True
            }, status=status.HTTP_200_OK)
        else:
            # Re-activate subscription
            existing.is_active = True
            existing.unsubscribed_at = None
            existing.save()
            return Response({
                'message': 'Welcome back! Your subscription has been reactivated.',
                'success': True
            }, status=status.HTTP_200_OK)

    # Create new subscription
    try:
        # Get IP address
        ip = request.META.get('HTTP_X_FORWARDED_FOR', '').split(',')[0].strip() or request.META.get('REMOTE_ADDR')
        subscription = NewsletterSubscription.objects.create(
            email=email,
            ip_address=ip,
            source='blog_page'
        )

        # Send notification email to admin
        try:
            from .utils import send_newsletter_notification_email
            send_newsletter_notification_email(subscription)
        except Exception as email_err:
            import logging
            logging.getLogger(__name__).warning(f'Newsletter notification email failed: {email_err}')

        return Response({
            'message': 'Successfully subscribed! You will receive our latest articles.',
            'success': True
        }, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({
            'error': 'Failed to process subscription',
            'message': str(e),
            'success': False
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def test_email_trigger(request):
    """
    Send a test email to diagnose Resend configuration.
    Usage: GET /api/test-email/?key=FloNeo2025Populate&to=your@email.com
    Returns exact success/failure details in the response body.
    """
    secret_key = request.query_params.get('key', '')
    if secret_key != 'FloNeo2025Populate':
        return Response({'error': 'Invalid key'}, status=status.HTTP_403_FORBIDDEN)

    to_email = request.query_params.get('to', django_settings.CONTACT_EMAIL_RECIPIENT)

    try:
        from django.core.mail import send_mail
        from django.conf import settings as s

        result = send_mail(
            subject='[Floneo] Test Email — Resend Configuration Check',
            message=(
                'This is a test email sent from floneo-backend on Railway.\n\n'
                'If you see this, Resend is configured correctly!\n\n'
                f'FROM: {s.DEFAULT_FROM_EMAIL}\n'
                f'TO:   {to_email}\n'
                f'BACKEND: {s.EMAIL_BACKEND}\n'
            ),
            from_email=s.DEFAULT_FROM_EMAIL,
            recipient_list=[to_email],
            fail_silently=False,
        )
        return Response({
            'success': True,
            'sent': result,
            'from': s.DEFAULT_FROM_EMAIL,
            'to': to_email,
            'backend': s.EMAIL_BACKEND,
            'message': f'Test email sent successfully ({result} message(s))'
        })

    except Exception as e:
        from django.conf import settings as s
        return Response({
            'success': False,
            'error': str(e),
            'error_type': type(e).__name__,
            'from': getattr(s, 'DEFAULT_FROM_EMAIL', 'NOT SET'),
            'to': to_email,
            'backend': getattr(s, 'EMAIL_BACKEND', 'NOT SET'),
            'resend_api_key_set': bool(getattr(s, 'RESEND_API_KEY', '')),
            'fix_hint': (
                'Common fix: verify your sender domain at resend.com/domains, '
                'OR set DEFAULT_FROM_EMAIL=onboarding@resend.dev in Railway env vars '
                'and set CONTACT_EMAIL_RECIPIENT to your Resend account email.'
            )
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
