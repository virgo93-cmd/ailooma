import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/article/best-software-ai-tutorials-beginners',
        destination: '/article/best-ai-software-tutorials-for-beginners',
        permanent: true,
      },
      {
        source: '/article/best-free-productivity-software-windows',
        destination: '/article/best-free-productivity-software-windows-users',
        permanent: true,
      },
      {
        source: '/article/best-free-productivity-software-windows-2026',
        destination: '/article/best-free-productivity-software-windows-users',
        permanent: true,
      },
      {
        source: '/article/how-to-fact-check-ai-answers-before-you-trust-them',
        destination: '/article/how-to-fact-check-ai-generated-answers',
        permanent: true,
      },
      {
        source: '/article/how-to-sync-google-sheets-with-notion-using-n8n',
        destination: '/article/google-sheets-api-integration-notion-n8n',
        permanent: true,
      },
      {
        source: '/article/how-to-build-weekly-research-digest-with-n8n-google-sheets',
        destination: '/article/build-weekly-research-digest-n8n-google-sheets',
        permanent: true,
      },
    ];
  },
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
