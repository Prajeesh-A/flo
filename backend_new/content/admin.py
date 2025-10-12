from django.contrib import admin
from django.utils.html import format_html
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


@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'tagline', 'is_visible', 'order']
    list_editable = ['is_visible', 'order']
    fieldsets = (
        ('Section Settings', {
            'fields': ('is_visible', 'order')
        }),
        ('Main Content', {
            'fields': ('tagline', 'title', 'description')
        }),
        ('Call to Action Buttons', {
            'fields': ('cta_primary_text', 'cta_primary_url', 'cta_secondary_text', 'cta_secondary_url')
        }),
        ('Visual Settings', {
            'fields': ('background_image', 'background_color', 'text_color')
        }),
    )

    def has_add_permission(self, request):
        # Only allow one instance
        return not HeroSection.objects.exists()


@admin.register(AboutSection)
class AboutSectionAdmin(admin.ModelAdmin):
    list_display = ['title']
    fields = ['title', 'description', 'content']

    def has_add_permission(self, request):
        # Only allow one instance
        return not AboutSection.objects.exists()


@admin.register(ServiceCard)
class ServiceCardAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'color']
    list_editable = ['order']
    list_filter = ['color']
    search_fields = ['title', 'description']
    ordering = ['order', 'id']

    fieldsets = (
        ('Content', {
            'fields': ('title', 'description', 'image')
        }),
        ('Display Settings', {
            'fields': ('color', 'order')
        }),
    )


@admin.register(MetricBox)
class MetricBoxAdmin(admin.ModelAdmin):
    list_display = ['label', 'value', 'suffix', 'order', 'color']
    list_editable = ['order', 'value', 'suffix']
    list_filter = ['color']
    search_fields = ['label', 'description']
    ordering = ['order', 'id']

    fieldsets = (
        ('Metric Data', {
            'fields': ('value', 'suffix', 'label', 'description')
        }),
        ('Display Settings', {
            'fields': ('color', 'order')
        }),
    )


@admin.register(FeatureCard)
class FeatureCardAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon_name', 'order']
    list_editable = ['order', 'icon_name']
    search_fields = ['title', 'description']
    ordering = ['order', 'id']

    fieldsets = (
        ('Content', {
            'fields': ('title', 'description')
        }),
        ('Display Settings', {
            'fields': ('icon_name', 'order'),
            'description': 'Icon names from Lucide React (e.g., zap, bar-chart-3, clock, shield)'
        }),
    )


@admin.register(AnalyticsSection)
class AnalyticsSectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'subtitle']
    fields = ['title', 'subtitle', 'description', 'content', 'savings_amount']

    def has_add_permission(self, request):
        # Only allow one instance
        return not AnalyticsSection.objects.exists()


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['author_name', 'author_title', 'author_company', 'order']
    list_editable = ['order']
    search_fields = ['author_name', 'author_title', 'author_company', 'quote']
    ordering = ['order', 'id']

    fieldsets = (
        ('Testimonial Content', {
            'fields': ('quote',)
        }),
        ('Author Information', {
            'fields': ('author_name', 'author_title', 'author_company')
        }),
        ('Display Settings', {
            'fields': ('order',)
        }),
    )


@admin.register(FooterSection)
class FooterSectionAdmin(admin.ModelAdmin):
    list_display = ['tagline', 'copyright_text']
    fields = ['tagline', 'copyright_text']

    def has_add_permission(self, request):
        # Only allow one instance
        return not FooterSection.objects.exists()


@admin.register(NavigationItem)
class NavigationItemAdmin(admin.ModelAdmin):
    list_display = ['label', 'href', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    list_filter = ['is_active']
    search_fields = ['label', 'href']
    ordering = ['order', 'id']

    fieldsets = (
        ('Navigation Item', {
            'fields': ('label', 'href', 'is_active')
        }),
        ('Display Settings', {
            'fields': ('order',)
        }),
    )


# New comprehensive admin classes

class PricingFeatureInline(admin.TabularInline):
    model = PricingFeature
    extra = 1
    fields = ['feature_text', 'is_included', 'order']
    ordering = ['order']


@admin.register(PricingSection)
class PricingSectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_visible', 'order']
    list_editable = ['is_visible', 'order']
    fieldsets = (
        ('Section Settings', {
            'fields': ('is_visible', 'order')
        }),
        ('Content', {
            'fields': ('title', 'subtitle', 'description')
        }),
        ('Visual Settings', {
            'fields': ('background_color',)
        }),
    )

    def has_add_permission(self, request):
        return not PricingSection.objects.exists()


@admin.register(PricingPlan)
class PricingPlanAdmin(admin.ModelAdmin):
    list_display = ['name', 'plan_type', 'price', 'price_period', 'is_popular', 'order']
    list_editable = ['order', 'is_popular', 'price']
    list_filter = ['plan_type', 'is_popular']
    search_fields = ['name', 'description']
    ordering = ['order', 'id']
    inlines = [PricingFeatureInline]

    fieldsets = (
        ('Plan Details', {
            'fields': ('name', 'plan_type', 'description', 'is_popular')
        }),
        ('Pricing', {
            'fields': ('price', 'price_period')
        }),
        ('Call to Action', {
            'fields': ('cta_text', 'cta_url')
        }),
        ('Display Settings', {
            'fields': ('order',)
        }),
    )


@admin.register(FAQSection)
class FAQSectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_visible', 'order']
    list_editable = ['is_visible', 'order']
    fieldsets = (
        ('Section Settings', {
            'fields': ('is_visible', 'order')
        }),
        ('Content', {
            'fields': ('title', 'subtitle', 'description')
        }),
        ('Visual Settings', {
            'fields': ('background_color',)
        }),
    )

    def has_add_permission(self, request):
        return not FAQSection.objects.exists()


@admin.register(FAQItem)
class FAQItemAdmin(admin.ModelAdmin):
    list_display = ['question_preview', 'is_active', 'order']
    list_editable = ['is_active', 'order']
    list_filter = ['is_active']
    search_fields = ['question', 'answer']
    ordering = ['order', 'id']

    fieldsets = (
        ('FAQ Content', {
            'fields': ('question', 'answer')
        }),
        ('Settings', {
            'fields': ('is_active', 'order')
        }),
    )

    def question_preview(self, obj):
        return obj.question[:50] + "..." if len(obj.question) > 50 else obj.question
    question_preview.short_description = "Question"


@admin.register(ContactSection)
class ContactSectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'email', 'phone', 'is_visible', 'order']
    list_editable = ['is_visible', 'order']
    fieldsets = (
        ('Section Settings', {
            'fields': ('is_visible', 'order')
        }),
        ('Content', {
            'fields': ('title', 'subtitle', 'description')
        }),
        ('Contact Information', {
            'fields': ('email', 'phone', 'address')
        }),
        ('Form Settings', {
            'fields': ('form_title', 'form_submit_text', 'form_success_message')
        }),
        ('Visual Settings', {
            'fields': ('background_color',)
        }),
    )

    def has_add_permission(self, request):
        return not ContactSection.objects.exists()


@admin.register(SocialMediaSection)
class SocialMediaSectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_visible', 'order']
    list_editable = ['is_visible', 'order']
    fieldsets = (
        ('Section Settings', {
            'fields': ('is_visible', 'order')
        }),
        ('Content', {
            'fields': ('title', 'subtitle')
        }),
        ('Visual Settings', {
            'fields': ('background_color',)
        }),
    )

    def has_add_permission(self, request):
        return not SocialMediaSection.objects.exists()


@admin.register(SocialMediaLink)
class SocialMediaLinkAdmin(admin.ModelAdmin):
    list_display = ['platform_name', 'platform', 'url_preview', 'is_active', 'order']
    list_editable = ['is_active', 'order']
    list_filter = ['platform', 'is_active']
    search_fields = ['platform_name', 'url']
    ordering = ['order', 'id']

    fieldsets = (
        ('Platform Details', {
            'fields': ('platform', 'platform_name', 'url')
        }),
        ('Display Settings', {
            'fields': ('icon_class', 'is_active', 'order')
        }),
    )

    def url_preview(self, obj):
        return obj.url[:30] + "..." if len(obj.url) > 30 else obj.url
    url_preview.short_description = "URL"


@admin.register(EnhancedFooterSection)
class EnhancedFooterSectionAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'tagline', 'is_visible', 'order']
    list_editable = ['is_visible', 'order']
    fieldsets = (
        ('Section Settings', {
            'fields': ('is_visible', 'order')
        }),
        ('Branding', {
            'fields': ('company_name', 'tagline', 'description')
        }),
        ('Legal Links', {
            'fields': ('privacy_policy_text', 'privacy_policy_url', 'terms_conditions_text', 'terms_conditions_url')
        }),
        ('Footer Text', {
            'fields': ('copyright_text', 'show_made_in_framer')
        }),
        ('Visual Settings', {
            'fields': ('background_color', 'text_color')
        }),
    )

    def has_add_permission(self, request):
        return not EnhancedFooterSection.objects.exists()


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ['site_name', 'primary_email', 'maintenance_mode']
    list_editable = ['maintenance_mode']
    fieldsets = (
        ('Basic Information', {
            'fields': ('site_name', 'site_description', 'site_logo', 'favicon')
        }),
        ('SEO Settings', {
            'fields': ('meta_title', 'meta_description', 'meta_keywords')
        }),
        ('Contact Information', {
            'fields': ('primary_email', 'primary_phone')
        }),
        ('Analytics', {
            'fields': ('google_analytics_id', 'facebook_pixel_id')
        }),
        ('Maintenance Mode', {
            'fields': ('maintenance_mode', 'maintenance_message'),
            'description': 'Enable maintenance mode to show a maintenance page to visitors'
        }),
    )

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()


@admin.register(ContactFormSubmission)
class ContactFormSubmissionAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject_preview', 'is_read', 'created_at']
    list_editable = ['is_read']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    ordering = ['-created_at']
    readonly_fields = ['name', 'email', 'phone', 'subject', 'message', 'created_at']

    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'phone', 'created_at')
        }),
        ('Message', {
            'fields': ('subject', 'message')
        }),
        ('Admin Actions', {
            'fields': ('is_read', 'admin_notes')
        }),
    )

    def subject_preview(self, obj):
        if obj.subject:
            return obj.subject[:30] + "..." if len(obj.subject) > 30 else obj.subject
        return "No subject"
    subject_preview.short_description = "Subject"

    def has_add_permission(self, request):
        # Don't allow manual creation of form submissions
        return False

    def get_readonly_fields(self, request, obj=None):
        if obj:  # Editing an existing object
            return self.readonly_fields
        return []


# New admin classes for additional sections

@admin.register(AboutTabletSection)
class AboutTabletSectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_visible', 'order', 'enable_3d_animation']
    list_editable = ['is_visible', 'order', 'enable_3d_animation']
    fieldsets = (
        ('Section Settings', {
            'fields': ('is_visible', 'order')
        }),
        ('Content', {
            'fields': ('title', 'subtitle', 'description')
        }),
        ('Media', {
            'fields': ('video_url', 'video_file', 'poster_image')
        }),
        ('Animation Settings', {
            'fields': ('enable_3d_animation', 'animation_duration')
        }),
        ('Visual Settings', {
            'fields': ('background_color', 'text_color')
        }),
    )

    def has_add_permission(self, request):
        return not AboutTabletSection.objects.exists()


@admin.register(AIPoweredAnalyticsSection)
class AIPoweredAnalyticsSectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'subtitle', 'is_visible', 'order']
    list_editable = ['is_visible', 'order']
    fieldsets = (
        ('Section Settings', {
            'fields': ('is_visible', 'order')
        }),
        ('Content', {
            'fields': ('title', 'subtitle', 'description')
        }),
        ('Features', {
            'fields': (
                'feature_1_title', 'feature_1_description',
                'feature_2_title', 'feature_2_description',
                'feature_3_title', 'feature_3_description'
            )
        }),
        ('Visual Settings', {
            'fields': ('background_color', 'accent_color')
        }),
    )

    def has_add_permission(self, request):
        return not AIPoweredAnalyticsSection.objects.exists()


@admin.register(ArchitectingExcellenceSection)
class ArchitectingExcellenceSectionAdmin(admin.ModelAdmin):
    list_display = ['main_title_line1', 'main_title_line2', 'badge_text', 'is_visible', 'order']
    list_editable = ['is_visible', 'order']
    fieldsets = (
        ('Section Settings', {
            'fields': ('is_visible', 'order')
        }),
        ('Main Content', {
            'fields': ('badge_text', 'main_title_line1', 'main_title_line2', 'subtitle')
        }),
        ('Philosophy Card', {
            'fields': ('philosophy_title', 'philosophy_button_text', 'philosophy_button_url')
        }),
        ('Animated Counters', {
            'fields': (
                'counter_1_value', 'counter_1_label',
                'counter_2_value', 'counter_2_label'
            )
        }),
        ('Team Card', {
            'fields': ('team_name', 'team_role', 'team_image')
        }),
        ('Step Carousel', {
            'fields': (
                'step_1_title', 'step_1_description',
                'step_2_title', 'step_2_description',
                'step_3_title', 'step_3_description',
                'step_4_title', 'step_4_description'
            )
        }),
        ('Visual Settings', {
            'fields': ('background_color',)
        }),
    )

    def has_add_permission(self, request):
        return not ArchitectingExcellenceSection.objects.exists()


@admin.register(WhyChooseUsSection)
class WhyChooseUsSectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'badge_text', 'is_visible', 'order']
    list_editable = ['is_visible', 'order']
    fieldsets = (
        ('Section Settings', {
            'fields': ('is_visible', 'order')
        }),
        ('Content', {
            'fields': ('badge_text', 'title', 'subtitle', 'description')
        }),
        ('Statistics', {
            'fields': (
                'stat_1_value', 'stat_1_label',
                'stat_2_value', 'stat_2_label',
                'stat_3_value', 'stat_3_label'
            )
        }),
        ('Global Reach', {
            'fields': ('global_title', 'global_description')
        }),
        ('Visual Settings', {
            'fields': ('background_color',)
        }),
    )

    def has_add_permission(self, request):
        return not WhyChooseUsSection.objects.exists()


class ChatMessageInline(admin.TabularInline):
    model = ChatMessage
    extra = 1
    fields = ['text', 'sender', 'order', 'delay']
    ordering = ['order']


@admin.register(HumanTouchSection)
class HumanTouchSectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'subtitle', 'is_visible', 'order']
    list_editable = ['is_visible', 'order']
    inlines = [ChatMessageInline]
    fieldsets = (
        ('Section Settings', {
            'fields': ('is_visible', 'order')
        }),
        ('Content', {
            'fields': ('title', 'subtitle', 'description')
        }),
        ('Benefits', {
            'fields': (
                'benefit_1_title', 'benefit_1_description',
                'benefit_2_title', 'benefit_2_description',
                'benefit_3_title', 'benefit_3_description'
            )
        }),
        ('Call to Action', {
            'fields': ('cta_text', 'cta_url')
        }),
        ('Visual Settings', {
            'fields': ('background_color',)
        }),
    )

    def has_add_permission(self, request):
        return not HumanTouchSection.objects.exists()


class VideoTabInline(admin.TabularInline):
    model = VideoTab
    extra = 1
    fields = ['tab_title', 'tab_description', 'video_url', 'video_file', 'is_active', 'order']
    ordering = ['order']


@admin.register(VideoTabsSection)
class VideoTabsSectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_visible', 'order']
    list_editable = ['is_visible', 'order']
    inlines = [VideoTabInline]
    fieldsets = (
        ('Section Settings', {
            'fields': ('is_visible', 'order')
        }),
        ('Content', {
            'fields': ('title', 'subtitle', 'description')
        }),
        ('Visual Settings', {
            'fields': ('background_color',)
        }),
    )

    def has_add_permission(self, request):
        return not VideoTabsSection.objects.exists()


@admin.register(CountryData)
class CountryDataAdmin(admin.ModelAdmin):
    list_display = ['name', 'flag_emoji', 'country_code', 'is_active', 'order']
    list_editable = ['is_active', 'order']
    list_filter = ['is_active']
    search_fields = ['name', 'country_code']
    ordering = ['order', 'name']

    fieldsets = (
        ('Country Information', {
            'fields': ('name', 'flag_emoji', 'country_code')
        }),
        ('Display Settings', {
            'fields': ('is_active', 'order')
        }),
    )


@admin.register(MetricsDisplaySection)
class MetricsDisplaySectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_visible', 'order', 'enable_animation']
    list_editable = ['is_visible', 'order', 'enable_animation']
    fieldsets = (
        ('Section Settings', {
            'fields': ('is_visible', 'order')
        }),
        ('Content', {
            'fields': ('title', 'subtitle', 'description')
        }),
        ('Animation Settings', {
            'fields': ('enable_animation',)
        }),
        ('Visual Settings', {
            'fields': ('background_color',)
        }),
    )

    def has_add_permission(self, request):
        return not MetricsDisplaySection.objects.exists()


@admin.register(PricingFeaturesSection)
class PricingFeaturesSectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_visible', 'order']
    list_editable = ['is_visible', 'order']
    fieldsets = (
        ('Section Settings', {
            'fields': ('is_visible', 'order')
        }),
        ('Content', {
            'fields': ('title', 'subtitle', 'description')
        }),
        ('Visual Settings', {
            'fields': ('background_color',)
        }),
    )

    def has_add_permission(self, request):
        return not PricingFeaturesSection.objects.exists()


class DemoTabInline(admin.TabularInline):
    model = DemoTab
    extra = 1
    fields = ['tab_title', 'tab_description', 'tab_icon', 'demo_url', 'demo_video', 'is_active', 'order']
    ordering = ['order']


@admin.register(VideoTabsDemoSection)
class VideoTabsDemoSectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_visible', 'order', 'enable_autoplay']
    list_editable = ['is_visible', 'order', 'enable_autoplay']
    inlines = [DemoTabInline]
    fieldsets = (
        ('Section Settings', {
            'fields': ('is_visible', 'order')
        }),
        ('Content', {
            'fields': ('title', 'subtitle', 'description')
        }),
        ('Demo Settings', {
            'fields': ('enable_autoplay', 'demo_duration')
        }),
        ('Visual Settings', {
            'fields': ('background_color',)
        }),
    )

    def has_add_permission(self, request):
        return not VideoTabsDemoSection.objects.exists()


class BenefitItemInline(admin.TabularInline):
    model = BenefitItem
    extra = 1
    fields = ['title', 'icon', 'position', 'is_active', 'order']
    ordering = ['order', 'id']


@admin.register(BenefitsSection)
class BenefitsSectionAdmin(admin.ModelAdmin):
    inlines = [BenefitItemInline]

    fieldsets = (
        ('Visibility & Order', {
            'fields': ('is_visible', 'order')
        }),
        ('Content', {
            'fields': ('title', 'subtitle', 'description')
        }),
        ('Call to Action', {
            'fields': ('cta_primary_text', 'cta_primary_url', 'cta_secondary_text', 'cta_secondary_url')
        }),
        ('Visual Settings', {
            'fields': ('background_color',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )

    readonly_fields = ['created_at', 'updated_at']
    list_display = ['title', 'subtitle', 'is_visible', 'order']
    list_editable = ['is_visible', 'order']

    def has_add_permission(self, request):
        # Only allow one instance
        return not BenefitsSection.objects.exists()


@admin.register(BenefitItem)
class BenefitItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'position', 'section', 'is_active', 'order']
    list_filter = ['is_active', 'position', 'section']
    list_editable = ['is_active', 'order']
    ordering = ['section', 'order', 'id']
    search_fields = ['title']


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'company', 'short_message', 'submitted_at', 'is_read']
    list_filter = ['is_read', 'submitted_at', 'company']
    search_fields = ['name', 'email', 'company', 'message']
    readonly_fields = ['submitted_at', 'ip_address', 'user_agent']
    list_editable = ['is_read']
    date_hierarchy = 'submitted_at'
    ordering = ['-submitted_at']

    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'company')
        }),
        ('Message', {
            'fields': ('message',)
        }),
        ('Submission Details', {
            'fields': ('submitted_at', 'ip_address', 'user_agent'),
            'classes': ('collapse',)
        }),
        ('Admin Notes', {
            'fields': ('is_read', 'notes'),
            'classes': ('collapse',)
        }),
    )

    def short_message(self, obj):
        return obj.short_message
    short_message.short_description = 'Message Preview'

    def get_queryset(self, request):
        return super().get_queryset(request).select_related()

    actions = ['mark_as_read', 'mark_as_unread']

    def mark_as_read(self, request, queryset):
        updated = queryset.update(is_read=True)
        self.message_user(request, f'{updated} submissions marked as read.')
    mark_as_read.short_description = "Mark selected submissions as read"

    def mark_as_unread(self, request, queryset):
        updated = queryset.update(is_read=False)
        self.message_user(request, f'{updated} submissions marked as unread.')
    mark_as_unread.short_description = "Mark selected submissions as unread"


# Customize admin site header and title
admin.site.site_header = " floneo Admin"
admin.site.site_title = " floneo Admin Portal"
admin.site.index_title = "Welcome to  floneo Administration"
