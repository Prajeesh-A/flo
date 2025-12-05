from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db import models

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
    BlogCategory, BlogTag, BlogPost
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
    BlogCategorySerializer, BlogTagSerializer, BlogPostListSerializer, BlogPostDetailSerializer
)


class ServiceCardViewSet(viewsets.ModelViewSet):
    """API endpoint for service cards"""
    queryset = ServiceCard.objects.all()
    serializer_class = ServiceCardSerializer


class MetricBoxViewSet(viewsets.ModelViewSet):
    """API endpoint for metric boxes"""
    queryset = MetricBox.objects.all()
    serializer_class = MetricBoxSerializer


class FeatureCardViewSet(viewsets.ModelViewSet):
    """API endpoint for feature cards"""
    queryset = FeatureCard.objects.all()
    serializer_class = FeatureCardSerializer


class TestimonialViewSet(viewsets.ModelViewSet):
    """API endpoint for testimonials"""
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer


class NavigationItemViewSet(viewsets.ModelViewSet):
    """API endpoint for navigation items"""
    queryset = NavigationItem.objects.filter(is_active=True)
    serializer_class = NavigationItemSerializer


class PricingPlanViewSet(viewsets.ModelViewSet):
    """API endpoint for pricing plans"""
    queryset = PricingPlan.objects.all()
    serializer_class = PricingPlanSerializer


class FAQItemViewSet(viewsets.ModelViewSet):
    """API endpoint for FAQ items"""
    queryset = FAQItem.objects.filter(is_active=True)
    serializer_class = FAQItemSerializer


class SocialMediaLinkViewSet(viewsets.ModelViewSet):
    """API endpoint for social media links"""
    queryset = SocialMediaLink.objects.filter(is_active=True)
    serializer_class = SocialMediaLinkSerializer


class ContactFormSubmissionViewSet(viewsets.ModelViewSet):
    """API endpoint for contact form submissions"""
    queryset = ContactFormSubmission.objects.all()
    serializer_class = ContactFormSubmissionSerializer
    http_method_names = ['post']  # Only allow POST requests


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
