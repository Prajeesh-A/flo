/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // Enable ESLint checks for better code quality
  },
  typescript: {
    ignoreBuildErrors: false, // Enable TypeScript checks for better code quality
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flo-do2v.onrender.com',
      },
    ],
    domains: ["flo-do2v.onrender.com"],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
