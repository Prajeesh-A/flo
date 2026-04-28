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
        hostname: 'flo-1m00.onrender.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
      },
    ],
    domains: ["flo-1m00.onrender.com", "res.cloudinary.com", "localhost", "127.0.0.1"],

  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
