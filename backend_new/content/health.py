from django.http import JsonResponse
from django.db import connection
from django.conf import settings
import time
import os

def health_check(request):
    """
    Health check endpoint for Railway / monitoring.
    ALWAYS returns HTTP 200 so Railway healthcheck passes.
    DB/API status is reported in body for observability only.
    """
    start_time = time.time()

    health_status = {
        'status': 'healthy',
        'timestamp': int(time.time()),
        'version': '1.0.0',
        'environment': 'production' if not settings.DEBUG else 'development',
        'checks': {}
    }

    # Database connectivity check — failures are non-fatal for the HTTP response
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            cursor.fetchone()
        health_status['checks']['database'] = {
            'status': 'healthy',
            'message': 'Database connection successful'
        }
    except Exception as e:
        # Report degraded — but do NOT flip to 503 (would kill Railway deploy)
        health_status['status'] = 'degraded'
        health_status['checks']['database'] = {
            'status': 'unhealthy',
            'message': f'Database connection failed: {str(e)}'
        }

    # API endpoints check — failures are non-fatal for the HTTP response
    try:
        from .models import HeroSection
        hero_count = HeroSection.objects.count()
        health_status['checks']['api'] = {
            'status': 'healthy',
            'message': f'API accessible, {hero_count} hero sections found'
        }
    except Exception as e:
        health_status['checks']['api'] = {
            'status': 'degraded',
            'message': f'API check skipped (migrations may be pending): {str(e)}'
        }

    # Response time
    response_time = (time.time() - start_time) * 1000
    health_status['response_time_ms'] = round(response_time, 2)

    # Always return 200 — Railway healthcheck only needs the process to be alive
    return JsonResponse(health_status, status=200)


def ready_check(request):
    """
    Readiness check for Kubernetes/container orchestration
    """
    try:
        # Check if all critical services are ready
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            cursor.fetchone()
        
        return JsonResponse({
            'status': 'ready',
            'timestamp': int(time.time())
        })
    except Exception as e:
        return JsonResponse({
            'status': 'not_ready',
            'error': str(e),
            'timestamp': int(time.time())
        }, status=503)

def live_check(request):
    """
    Liveness check for Kubernetes/container orchestration
    """
    return JsonResponse({
        'status': 'alive',
        'timestamp': int(time.time())
    })
