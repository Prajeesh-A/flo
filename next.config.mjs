/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: false, // Enable ESLint checks for better code quality
  },
  typescript: {
    ignoreBuildErrors: false, // Enable TypeScript checks for better code quality
  },
  images: {
    unoptimized: true, // Required for static export
    domains: ["flo-do2v.onrender.com"],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
