"use client";

import React, { useState, useEffect } from "react";
import { api, useApiData } from "@/lib/api";

export default function ApiDebugger() {
  const [manualTestResult, setManualTestResult] = useState<any>(null);
  const [manualTestError, setManualTestError] = useState<string | null>(null);
  const [manualTestLoading, setManualTestLoading] = useState(false);

  // Test using useApiData hook
  const {
    data: hookData,
    loading: hookLoading,
    error: hookError,
  } = useApiData(api.getAboutTabletSection);

  // Manual API test
  const testApiManually = async () => {
    setManualTestLoading(true);
    setManualTestError(null);
    setManualTestResult(null);

    try {
      const result = await api.getAboutTabletSection();
      setManualTestResult(result);
      console.log("Manual API test result:", result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setManualTestError(errorMessage);
      console.error("Manual API test error:", error);
    } finally {
      setManualTestLoading(false);
    }
  };

  // Test on component mount
  useEffect(() => {
    testApiManually();
  }, []);

  return (
    <div style={{ 
      position: "fixed", 
      top: "10px", 
      right: "10px", 
      background: "white", 
      border: "2px solid #ccc", 
      padding: "20px", 
      borderRadius: "8px",
      maxWidth: "400px",
      maxHeight: "80vh",
      overflow: "auto",
      zIndex: 9999,
      fontSize: "12px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    }}>
      <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>🔍 API Debugger</h3>
      
      <div style={{ marginBottom: "15px" }}>
        <h4 style={{ margin: "0 0 5px 0", color: "#666" }}>useApiData Hook Test:</h4>
        <div>Loading: {hookLoading ? "✅ Yes" : "❌ No"}</div>
        <div>Error: {hookError ? `❌ ${hookError}` : "✅ None"}</div>
        <div>Data: {hookData ? "✅ Received" : "❌ None"}</div>
        {hookData && (
          <div style={{ background: "#f0f0f0", padding: "5px", marginTop: "5px", borderRadius: "3px" }}>
            <div>Title: {hookData.title}</div>
            <div>Video URL: {hookData.video_url || "None"}</div>
          </div>
        )}
      </div>

      <div style={{ marginBottom: "15px" }}>
        <h4 style={{ margin: "0 0 5px 0", color: "#666" }}>Manual API Test:</h4>
        <button 
          onClick={testApiManually} 
          disabled={manualTestLoading}
          style={{ 
            padding: "5px 10px", 
            marginBottom: "5px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer"
          }}
        >
          {manualTestLoading ? "Testing..." : "🔄 Test API"}
        </button>
        <div>Loading: {manualTestLoading ? "✅ Yes" : "❌ No"}</div>
        <div>Error: {manualTestError ? `❌ ${manualTestError}` : "✅ None"}</div>
        <div>Data: {manualTestResult ? "✅ Received" : "❌ None"}</div>
        {manualTestResult && (
          <div style={{ background: "#f0f0f0", padding: "5px", marginTop: "5px", borderRadius: "3px" }}>
            <div>Title: {manualTestResult.title}</div>
            <div>Video URL: {manualTestResult.video_url || "None"}</div>
          </div>
        )}
      </div>

      <div style={{ fontSize: "10px", color: "#888" }}>
        API Base URL: {process.env.NEXT_PUBLIC_API_URL || "https://flo-do2v.onrender.com/api"}
      </div>
    </div>
  );
}
