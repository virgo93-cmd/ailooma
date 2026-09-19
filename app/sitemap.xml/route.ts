import { siteConfig } from '@/config/site';
import { renderSitemapIndex, sitemapResponse } from '@/lib/wordpress/sitemap-data';

export const revalidate = 300;

export function GET() {
  const children = [
    'sitemap-articles.xml',
    'sitemap-categories.xml',
    'sitemap-hubs.xml',
    'sitemap-pages.xml',
    'sitemap-authors.xml',
  ].map((path) => `${siteConfig.url}/${path}`);

  return sitemapResponse(renderSitemapIndex(children));
}
