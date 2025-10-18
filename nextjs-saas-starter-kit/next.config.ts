import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client"],
  images: {
    domains: ["images.unsplash.com", "avatars.githubusercontent.com"],
  },
};

export default nextConfig;
