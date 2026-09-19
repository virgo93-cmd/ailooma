import { siteConfig } from '@/config/site';
import { headers } from 'next/headers';
import {
  getSitemapPages,
  renderUrlset,
  sitemapResponse,
} from '@/lib/wordpress/sitemap-data';

export const revalidate = 300;

const indexablePageSlugs = new Set([
  'about-us',
  'contact-us',
  'editorial-policy',
  'corrections-policy',
  'ai-content-policy',
  'privacy-policy',
  'terms-conditions',
  'disclaimer',
]);

export async function GET() {
  await headers();
  const pages = await getSitemapPages();
  const entries = [
    { url: siteConfig.url },
    ...pages
      .filter((page) => indexablePageSlugs.has(page.slug))
      .map((page) => ({
        url: `${siteConfig.url}/${page.slug}`,
        lastmod: page.modified,
      })),
  ];

  return sitemapResponse(renderUrlset(entries));
}
