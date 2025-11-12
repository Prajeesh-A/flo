"""
URL configuration for  floneo_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from content.health import health_check, ready_check, live_check

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('content.urls')),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    # Health check endpoints
    path('health/', health_check, name='health_check'),
    path('healthz/', health_check, name='health_check_k8s'),  # Kubernetes style
    path('ready/', ready_check, name='ready_check'),
    path('live/', live_check, name='live_check'),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
