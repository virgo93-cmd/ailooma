import type { MetadataRoute } from 'next';
import {
  getAuthors,
  getCategories,
  getPages,
  safePosts,
} from '@/lib/wordpress/client';
import { siteConfig } from '@/config/site';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories, authors, pages] = await Promise.all([
    safePosts({ per_page: 100 }),
    getCategories().catch(() => []),
    getAuthors().catch(() => []),
    getPages().catch(() => []),
  ]);
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...posts.items.map((p) => ({
      url: `${siteConfig.url}/article/${p.slug}`,
      lastModified: new Date(p.modified),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...categories.map((c) => ({
      url: `${siteConfig.url}/category/${c.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...authors.map((a) => ({
      url: `${siteConfig.url}/author/${a.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
    ...pages.map((p) => ({
      url: `${siteConfig.url}/${p.slug}`,
      lastModified: new Date(p.modified),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ];
}
