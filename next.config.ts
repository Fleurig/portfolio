import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    turbo: {},
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};

export default nextConfig;
