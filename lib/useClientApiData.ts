"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook for client-side only API data fetching
 * This ensures API calls only happen in the browser, not during SSG build time
 */
export function useClientApiData<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only fetch data if we're on the client side
    if (!isClient) {
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("useClientApiData: Starting API call...");
        const result = await apiCall();
        console.log("useClientApiData: API call successful", result);

        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        console.error("useClientApiData: API call failed", err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : "An error occurred");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [isClient, ...dependencies]);

  return { 
    data, 
    loading: loading || !isClient, // Show loading until client-side and data is fetched
    error,
    isClient 
  };
}
