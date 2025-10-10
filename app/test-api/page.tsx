"use client";

import { useEffect, useState } from "react";

export default function TestAPI() {
  const [apiResult, setApiResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log("Testing API connection...");
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://flo-do2v.onrender.com/api";
        console.log("API URL:", API_URL);
        
        const response = await fetch(`${API_URL}/hero/`);
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("API Data:", data);
        setApiResult(data);
      } catch (err) {
        console.error("API Error:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    testAPI();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Connection Test</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <p><strong>NEXT_PUBLIC_API_URL:</strong> {process.env.NEXT_PUBLIC_API_URL || "Not set"}</p>
          <p><strong>Fallback URL:</strong> https://flo-do2v.onrender.com/api</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">API Test Results</h2>
          
          {loading && (
            <div className="text-blue-600">Testing API connection...</div>
          )}
          
          {error && (
            <div className="text-red-600">
              <strong>Error:</strong> {error}
            </div>
          )}
          
          {apiResult && (
            <div className="text-green-600">
              <strong>Success!</strong> API is working.
              <pre className="mt-4 bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(apiResult, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Browser Console</h2>
          <p>Check the browser console (F12) for detailed logs.</p>
        </div>
      </div>
    </div>
  );
}
