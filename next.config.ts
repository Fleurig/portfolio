import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  turbopack: {},
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  transpilePackages: ['@mdxeditor/editor'],
};

export default withNextIntl(withMDX(nextConfig));
