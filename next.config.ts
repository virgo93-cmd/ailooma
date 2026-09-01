import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cms.ailooma.biz.id' },
      { protocol: 'https', hostname: 'secure.gravatar.com' },
      { protocol: 'https', hostname: 'gravatar.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2678400,
  },
  poweredByHeader: false,
};
export default nextConfig;
