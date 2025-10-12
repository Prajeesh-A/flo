from rest_framework import serializers
from .models import (
    HeroSection, AboutSection, ServiceCard, MetricBox,
    FeatureCard, AnalyticsSection, Testimonial,
    FooterSection, NavigationItem, PricingSection, PricingPlan, PricingFeature,
    FAQSection, FAQItem, ContactSection, SocialMediaSection, SocialMediaLink,
    EnhancedFooterSection, SiteSettings, ContactFormSubmission,
    AboutTabletSection, AIPoweredAnalyticsSection, ArchitectingExcellenceSection,
    WhyChooseUsSection, HumanTouchSection, ChatMessage, VideoTabsSection, VideoTab, CountryData,
    MetricsDisplaySection, PricingFeaturesSection, VideoTabsDemoSection, DemoTab,
    BenefitsSection, BenefitItem, ContactSubmission
)


class HeroSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSection
        fields = '__all__'


class AboutSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSection
        fields = '__all__'


class ServiceCardSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = ServiceCard
        fields = ['id', 'title', 'description', 'image', 'image_url', 'color', 'order']
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class MetricBoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetricBox
        fields = '__all__'


class FeatureCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeatureCard
        fields = '__all__'


class AnalyticsSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalyticsSection
        fields = '__all__'


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'


class FooterSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterSection
        fields = '__all__'


class NavigationItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = NavigationItem
        fields = ['id', 'label', 'href', 'order', 'is_active']
        
    def to_representation(self, instance):
        # Only return active navigation items
        if not instance.is_active:
            return None
        return super().to_representation(instance)


# New serializers for enhanced models

class PricingFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = PricingFeature
        fields = ['feature_text', 'is_included', 'order']


class PricingPlanSerializer(serializers.ModelSerializer):
    features = PricingFeatureSerializer(many=True, read_only=True)

    class Meta:
        model = PricingPlan
        fields = '__all__'


class PricingSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PricingSection
        fields = '__all__'


class FAQItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQItem
        fields = '__all__'


class FAQSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQSection
        fields = '__all__'


class ContactSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSection
        fields = '__all__'


class SocialMediaLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMediaLink
        fields = '__all__'


class SocialMediaSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMediaSection
        fields = '__all__'


class EnhancedFooterSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnhancedFooterSection
        fields = '__all__'


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = '__all__'


class ContactFormSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactFormSubmission
        fields = ['name', 'email', 'phone', 'subject', 'message']

    def create(self, validated_data):
        return ContactFormSubmission.objects.create(**validated_data)


# Combined serializer for frontend consumption
class WebsiteDataSerializer(serializers.Serializer):
    """Combined serializer for all website data"""
    hero_section = HeroSectionSerializer(read_only=True)
    about_section = AboutSectionSerializer(read_only=True)
    service_cards = ServiceCardSerializer(many=True, read_only=True)
    metric_boxes = MetricBoxSerializer(many=True, read_only=True)
    feature_cards = FeatureCardSerializer(many=True, read_only=True)
    analytics_section = AnalyticsSectionSerializer(read_only=True)
    testimonials = TestimonialSerializer(many=True, read_only=True)
    pricing_section = PricingSectionSerializer(read_only=True)
    pricing_plans = PricingPlanSerializer(many=True, read_only=True)
    faq_section = FAQSectionSerializer(read_only=True)
    faq_items = FAQItemSerializer(many=True, read_only=True)
    contact_section = ContactSectionSerializer(read_only=True)
    social_media_section = SocialMediaSectionSerializer(read_only=True)
    social_media_links = SocialMediaLinkSerializer(many=True, read_only=True)
    footer_section = FooterSectionSerializer(read_only=True)
    enhanced_footer_section = EnhancedFooterSectionSerializer(read_only=True)
    navigation_items = NavigationItemSerializer(many=True, read_only=True)
    site_settings = SiteSettingsSerializer(read_only=True)


# New serializers for additional sections

class AboutTabletSectionSerializer(serializers.ModelSerializer):
    video_file_url = serializers.SerializerMethodField()
    poster_image_url = serializers.SerializerMethodField()

    class Meta:
        model = AboutTabletSection
        fields = '__all__'

    def get_video_file_url(self, obj):
        if obj.video_file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.video_file.url)
            return obj.video_file.url
        return None

    def get_poster_image_url(self, obj):
        if obj.poster_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.poster_image.url)
            return obj.poster_image.url
        return None


class AIPoweredAnalyticsSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIPoweredAnalyticsSection
        fields = '__all__'


class ArchitectingExcellenceSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArchitectingExcellenceSection
        fields = '__all__'


class WhyChooseUsSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhyChooseUsSection
        fields = '__all__'


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'text', 'sender', 'order', 'delay']


class HumanTouchSectionSerializer(serializers.ModelSerializer):
    chat_messages = ChatMessageSerializer(many=True, read_only=True)

    class Meta:
        model = HumanTouchSection
        fields = '__all__'


class CountryDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountryData
        fields = '__all__'


class VideoTabSerializer(serializers.ModelSerializer):
    video_file_url = serializers.SerializerMethodField()
    poster_image_url = serializers.SerializerMethodField()

    class Meta:
        model = VideoTab
        fields = '__all__'

    def get_video_file_url(self, obj):
        if obj.video_file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.video_file.url)
            return obj.video_file.url
        return None

    def get_poster_image_url(self, obj):
        if obj.poster_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.poster_image.url)
            return obj.poster_image.url
        return None


class VideoTabsSectionSerializer(serializers.ModelSerializer):
    tabs = VideoTabSerializer(many=True, read_only=True)

    class Meta:
        model = VideoTabsSection
        fields = '__all__'


class MetricsDisplaySectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetricsDisplaySection
        fields = '__all__'


class PricingFeaturesSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PricingFeaturesSection
        fields = '__all__'


class DemoTabSerializer(serializers.ModelSerializer):
    demo_video_url = serializers.SerializerMethodField()
    demo_image_url = serializers.SerializerMethodField()

    class Meta:
        model = DemoTab
        fields = '__all__'

    def get_demo_video_url(self, obj):
        if obj.demo_video:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.demo_video.url)
            return obj.demo_video.url
        return None

    def get_demo_image_url(self, obj):
        if obj.demo_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.demo_image.url)
            return obj.demo_image.url
        return None


class BenefitItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BenefitItem
        fields = ['id', 'title', 'icon', 'position', 'is_active', 'order', 'created_at', 'updated_at']


class BenefitsSectionSerializer(serializers.ModelSerializer):
    benefits = BenefitItemSerializer(many=True, read_only=True)

    class Meta:
        model = BenefitsSection
        fields = '__all__'


class VideoTabsDemoSectionSerializer(serializers.ModelSerializer):
    demo_tabs = DemoTabSerializer(many=True, read_only=True)

    class Meta:
        model = VideoTabsDemoSection
        fields = '__all__'


class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['name', 'email', 'company', 'message']

    def validate_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        return value.strip()

    def validate_email(self, value):
        return value.lower().strip()

    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters long.")
        return value.strip()

    def create(self, validated_data):
        # Add IP address and user agent from request context
        request = self.context.get('request')
        if request:
            validated_data['ip_address'] = self.get_client_ip(request)
            validated_data['user_agent'] = request.META.get('HTTP_USER_AGENT', '')

        return super().create(validated_data)

    def get_client_ip(self, request):
        """Get the client's IP address from the request"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip
