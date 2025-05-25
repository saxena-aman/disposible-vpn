import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "assets.aceternity.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/create-vpn",
        permanent: true, // Set to false if you want a temporary redirect
      },
    ];
  },
};

export default nextConfig;
