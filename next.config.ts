import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    domains: ['cdn.dribbble.com', 'images.unsplash.com', 'your-domain.com'], // ← Add allowed domains here
  },
};

export default nextConfig;
