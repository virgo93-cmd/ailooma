import { siteConfig } from '@/config/site';
import { headers } from 'next/headers';
import {
  getPublishedSitemapPosts,
  renderUrlset,
  sitemapResponse,
} from '@/lib/wordpress/sitemap-data';

export const revalidate = 300;

export async function GET() {
  await headers();
  const posts = await getPublishedSitemapPosts();
  const authorSlugs = new Set(
    posts.flatMap((post) => post._embedded?.author ?? []).map((author) => author.slug),
  );
  const entries = [...authorSlugs].map((slug) => ({
    url: `${siteConfig.url}/author/${slug}`,
  }));

  return sitemapResponse(renderUrlset(entries));
}
