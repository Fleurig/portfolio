import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Keep it fast during dev; safe default for most projects.
    turbo: {},
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default nextConfig;
