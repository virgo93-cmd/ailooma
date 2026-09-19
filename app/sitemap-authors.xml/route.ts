import { siteConfig } from '@/config/site';
import { headers } from 'next/headers';
import {
  getPublishedSitemapPosts,
  getSitemapAuthors,
  renderUrlset,
  sitemapResponse,
} from '@/lib/wordpress/sitemap-data';

export const revalidate = 300;

export async function GET() {
  await headers();
  const posts = await getPublishedSitemapPosts();
  const authors = await getSitemapAuthors(posts.map((post) => post.author));
  const entries = authors.map((author) => ({
    url: `${siteConfig.url}/author/${author.slug}`,
  }));

  return sitemapResponse(renderUrlset(entries));
}
