# Cache headers middleware for Django API responses
import hashlib
import json
from django.utils.cache import patch_cache_control, patch_response_headers
from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin


class APICacheMiddleware(MiddlewareMixin):
    """
    Middleware to add appropriate cache headers to API responses
    based on content type and update frequency.
    """
    
    # Cache durations in seconds
    CACHE_DURATIONS = {
        # Static content (rarely changes) - 1 hour
        'static': 3600,
        # Semi-static content (changes occasionally) - 15 minutes  
        'semi_static': 900,
        # Dynamic content (changes frequently) - 5 minutes
        'dynamic': 300,
        # Real-time content (changes very frequently) - 1 minute
        'realtime': 60,
    }
    
    # Endpoint categorization
    ENDPOINT_CATEGORIES = {
        # Static content endpoints (rarely change)
        'static': [
            '/api/hero/',
            '/api/about/',
            '/api/footer/',
            '/api/enhanced-footer/',
            '/api/site-settings/',
            '/api/contact/',
            '/api/social/',
            '/api/navigation/',
            '/api/social-links/',
        ],
        
        # Semi-static content (changes occasionally)
        'semi_static': [
            '/api/services/',
            '/api/features/',
            '/api/testimonials/',
            '/api/pricing-plans/',
            '/api/faq-items/',
            '/api/architecting-excellence/',
            '/api/human-touch/',
            '/api/why-choose-us/',
            '/api/about-tablet/',
            '/api/pricing-features/',
            '/api/video-tabs-section/',
            '/api/video-tabs-demo/',
            '/api/country-data/',
            '/api/demo-tabs/',
            '/api/video-tabs/',
        ],
        
        # Dynamic content (changes frequently)
        'dynamic': [
            '/api/analytics/',
            '/api/ai-analytics/',
            '/api/metrics/',
            '/api/metrics-display/',
            '/api/benefits/',
        ],
        
        # Real-time content (changes very frequently)
        'realtime': [
            '/api/contact-submissions/',
        ],
    }
    
    def process_response(self, request, response):
        """
        Add cache headers to API responses based on endpoint category.
        """
        # Only process API responses
        if not request.path.startswith('/api/'):
            return response
            
        # Only process successful JSON responses
        if not isinstance(response, JsonResponse) or response.status_code != 200:
            return response
            
        # Determine cache category for this endpoint
        cache_category = self._get_cache_category(request.path)
        cache_duration = self.CACHE_DURATIONS.get(cache_category, self.CACHE_DURATIONS['dynamic'])
        
        # Add cache control headers
        patch_cache_control(
            response,
            public=True,
            max_age=cache_duration,
            s_maxage=cache_duration * 2,  # CDN can cache longer
            stale_while_revalidate=cache_duration * 4,  # Allow stale content while revalidating
        )
        
        # Add ETag for better caching
        if hasattr(response, 'content'):
            etag_value = self._generate_etag(response.content)
            response['ETag'] = f'"{etag_value}"'
        
        # Add Last-Modified header
        from django.utils.http import http_date
        from django.utils import timezone
        response['Last-Modified'] = http_date(timezone.now().timestamp())
        
        # Add Vary header for better caching
        response['Vary'] = 'Accept, Accept-Encoding'
        
        # Add custom headers for debugging
        response['X-Cache-Category'] = cache_category
        response['X-Cache-Duration'] = str(cache_duration)
        
        return response
    
    def _get_cache_category(self, path):
        """
        Determine the cache category for a given API path.
        """
        for category, endpoints in self.ENDPOINT_CATEGORIES.items():
            for endpoint in endpoints:
                if path.startswith(endpoint):
                    return category
        
        # Default to dynamic if not categorized
        return 'dynamic'
    
    def _generate_etag(self, content):
        """
        Generate an ETag value based on response content.
        """
        if isinstance(content, bytes):
            content_str = content.decode('utf-8', errors='ignore')
        else:
            content_str = str(content)
        
        # Create hash of content
        return hashlib.md5(content_str.encode('utf-8')).hexdigest()[:16]


class CORSCacheMiddleware(MiddlewareMixin):
    """
    Enhanced CORS middleware with caching considerations.
    """
    
    def process_response(self, request, response):
        """
        Add CORS headers optimized for caching.
        """
        # Only process API responses
        if not request.path.startswith('/api/'):
            return response
        
        # Add CORS headers
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With'
        response['Access-Control-Expose-Headers'] = 'ETag, Last-Modified, Cache-Control'
        response['Access-Control-Max-Age'] = '86400'  # 24 hours for preflight cache
        
        return response


class PerformanceHeadersMiddleware(MiddlewareMixin):
    """
    Add performance-related headers to all responses.
    """
    
    def process_response(self, request, response):
        """
        Add performance and security headers.
        """
        # Security headers
        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'DENY'
        response['X-XSS-Protection'] = '1; mode=block'
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        
        # Performance headers
        if request.path.startswith('/api/'):
            # Add timing information for API responses
            if hasattr(request, '_start_time'):
                import time
                duration = (time.time() - request._start_time) * 1000
                response['X-Response-Time'] = f'{duration:.2f}ms'
        
        return response
    
    def process_request(self, request):
        """
        Record request start time for performance measurement.
        """
        import time
        request._start_time = time.time()
        return None


class CompressionMiddleware(MiddlewareMixin):
    """
    Add compression hints for better performance.
    """
    
    def process_response(self, request, response):
        """
        Add compression-related headers.
        """
        # Only for API responses
        if request.path.startswith('/api/') and isinstance(response, JsonResponse):
            # Hint that this content should be compressed
            response['Content-Encoding-Hint'] = 'gzip, br'
            
            # Add content length if not already present
            if not response.get('Content-Length'):
                if hasattr(response, 'content'):
                    response['Content-Length'] = str(len(response.content))
        
        return response
