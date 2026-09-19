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
  const entries = posts.map((post) => ({
    url: `${siteConfig.url}/article/${post.slug}`,
    lastmod: post.modified,
  }));

  return sitemapResponse(renderUrlset(entries));
}
