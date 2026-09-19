import { topicHubs } from '@/config/hubs';
import { siteConfig } from '@/config/site';
import { renderUrlset, sitemapResponse } from '@/lib/wordpress/sitemap-data';

export const revalidate = 86_400;

export function GET() {
  const entries = [
    { url: `${siteConfig.url}/hub` },
    ...topicHubs.map((hub) => ({
      url: `${siteConfig.url}/hub/${hub.slug}`,
    })),
  ];

  return sitemapResponse(renderUrlset(entries));
}
