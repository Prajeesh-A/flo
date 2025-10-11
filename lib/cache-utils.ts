// Cache utilities for debugging and testing
import { mutate } from 'swr'

/**
 * Clear all SWR cache to force fresh data fetch
 * Useful for testing Django admin changes
 */
export function clearAllCache() {
  // Clear all SWR cache
  mutate(() => true, undefined, { revalidate: false })
  
  // Clear browser cache for API calls
  if (typeof window !== 'undefined') {
    // Clear fetch cache by adding timestamp
    const timestamp = Date.now()
    localStorage.setItem('cache-bust-timestamp', timestamp.toString())
  }
  
  console.log('🧹 All caches cleared - fresh data will be fetched')
}

/**
 * Clear specific endpoint cache
 */
export function clearEndpointCache(endpoint: string) {
  mutate(endpoint, undefined, { revalidate: true })
  console.log(`🧹 Cache cleared for: ${endpoint}`)
}

/**
 * Force refresh all FAQ data
 */
export function refreshFAQData() {
  clearEndpointCache('faq-section')
  clearEndpointCache('faq-items')
  console.log('🔄 FAQ data refreshed')
}

/**
 * Force refresh all metrics data
 */
export function refreshMetricsData() {
  clearEndpointCache('metrics-section')
  clearEndpointCache('metric-boxes')
  console.log('🔄 Metrics data refreshed')
}

/**
 * Add cache-busting parameter to API calls
 */
export function addCacheBuster(url: string): string {
  const separator = url.includes('?') ? '&' : '?'
  const timestamp = Date.now()
  return `${url}${separator}_cb=${timestamp}`
}

/**
 * Debug function to check current cache status
 */
export function debugCacheStatus() {
  if (typeof window !== 'undefined') {
    console.log('🔍 Cache Debug Info:')
    console.log('- Current timestamp:', Date.now())
    console.log('- Last cache bust:', localStorage.getItem('cache-bust-timestamp'))
    console.log('- API URL:', process.env.NEXT_PUBLIC_API_URL || 'Not set')
    console.log('- User Agent:', navigator.userAgent)
  }
}

/**
 * Test API connectivity with cache busting
 */
export async function testAPIConnectivity() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://flo-do2v.onrender.com/api'
  const endpoints = ['/hero/', '/faq/', '/faq-items/', '/metrics/']
  
  console.log('🧪 Testing API connectivity...')
  console.log('API Base URL:', API_BASE_URL)
  
  const results = []
  
  for (const endpoint of endpoints) {
    try {
      const url = addCacheBuster(`${API_BASE_URL}${endpoint}`)
      const startTime = Date.now()
      const response = await fetch(url)
      const endTime = Date.now()
      
      results.push({
        endpoint,
        status: response.status,
        success: response.ok,
        responseTime: endTime - startTime,
        url
      })
      
      console.log(`✅ ${endpoint}: ${response.status} (${endTime - startTime}ms)`)
    } catch (error) {
      results.push({
        endpoint,
        status: 'ERROR',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      
      console.log(`❌ ${endpoint}: ${error}`)
    }
  }
  
  return results
}

// Global debug functions for browser console
if (typeof window !== 'undefined') {
  (window as any).debugCache = {
    clearAll: clearAllCache,
    clearEndpoint: clearEndpointCache,
    refreshFAQ: refreshFAQData,
    refreshMetrics: refreshMetricsData,
    status: debugCacheStatus,
    testAPI: testAPIConnectivity
  }
  
  console.log('🛠️ Cache debug tools available:')
  console.log('- window.debugCache.clearAll() - Clear all caches')
  console.log('- window.debugCache.refreshFAQ() - Refresh FAQ data')
  console.log('- window.debugCache.refreshMetrics() - Refresh metrics data')
  console.log('- window.debugCache.testAPI() - Test API connectivity')
  console.log('- window.debugCache.status() - Show cache debug info')
}
