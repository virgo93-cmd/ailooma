import { siteConfig } from '@/config/site';
import { renderUrlset, sitemapResponse } from '@/lib/wordpress/sitemap-data';

export const revalidate = 300;

export async function GET() {
  const entries = siteConfig.nav.map((item) => ({
    url: `${siteConfig.url}${item.href}`,
  }));

  return sitemapResponse(renderUrlset(entries));
}
