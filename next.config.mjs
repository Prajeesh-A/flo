/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' for dynamic routes
  // Ya phir backend API use karke build time pe generate karo
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
    domains: ["flo-do2v.onrender.com"],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
