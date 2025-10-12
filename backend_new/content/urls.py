from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'services', views.ServiceCardViewSet)
router.register(r'metrics', views.MetricBoxViewSet)
router.register(r'features', views.FeatureCardViewSet)
router.register(r'testimonials', views.TestimonialViewSet)
router.register(r'navigation', views.NavigationItemViewSet)
router.register(r'pricing-plans', views.PricingPlanViewSet)
router.register(r'faq-items', views.FAQItemViewSet)
router.register(r'social-links', views.SocialMediaLinkViewSet)
router.register(r'contact-submissions', views.ContactFormSubmissionViewSet)
router.register(r'video-tabs', views.VideoTabViewSet)
router.register(r'country-data', views.CountryDataViewSet)
router.register(r'demo-tabs', views.DemoTabViewSet)

# The API URLs are now determined automatically by the router
urlpatterns = [
    path('', include(router.urls)),

    # Single instance endpoints
    path('hero/', views.hero_section_detail, name='hero-detail'),
    path('about/', views.about_section_detail, name='about-detail'),
    path('analytics/', views.analytics_section_detail, name='analytics-detail'),
    path('footer/', views.footer_section_detail, name='footer-detail'),
    path('pricing/', views.pricing_section_detail, name='pricing-detail'),
    path('faq/', views.faq_section_detail, name='faq-detail'),
    path('contact/', views.contact_section_detail, name='contact-detail'),
    path('social/', views.social_media_section_detail, name='social-detail'),
    path('enhanced-footer/', views.enhanced_footer_section_detail, name='enhanced-footer-detail'),
    path('site-settings/', views.site_settings_detail, name='site-settings-detail'),

    # New section endpoints
    path('about-tablet/', views.about_tablet_section_detail, name='about-tablet-detail'),
    path('ai-analytics/', views.ai_powered_analytics_section_detail, name='ai-analytics-detail'),
    path('architecting-excellence/', views.architecting_excellence_section_detail, name='about-us-detail'),
    path('why-choose-us/', views.why_choose_us_section_detail, name='why-choose-us-detail'),
    path('human-touch/', views.human_touch_section_detail, name='human-touch-detail'),
    path('video-tabs-section/', views.video_tabs_section_detail, name='video-tabs-section-detail'),
    path('metrics-display/', views.metrics_display_section_detail, name='metrics-display-detail'),
    path('pricing-features/', views.pricing_features_section_detail, name='pricing-features-detail'),
    path('video-tabs-demo/', views.video_tabs_demo_section_detail, name='video-tabs-demo-detail'),
    path('benefits/', views.benefits_section_detail, name='benefits-detail'),

    # Contact form submissions
    path('contact-submissions/', views.contact_submissions, name='contact-submissions'),

    # Privacy Policy
    path('privacy-policy/', views.privacy_policy_detail, name='privacy-policy-detail'),

    # Combined endpoint for all website data
    path('website-data/', views.website_data, name='website-data'),
]
