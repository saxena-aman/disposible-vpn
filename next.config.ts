import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com","assets.aceternity.com"], // Add unsplash to the list of allowed domains
  }
};

export default nextConfig;
