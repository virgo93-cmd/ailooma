import type { WPAuthor, WPPage, WPPost, WPTerm } from '@/types/wordpress';

const apiBase =
  process.env.WORDPRESS_API_URL || 'https://cms.ailooma.biz.id/wp-json/wp/v2';
const revalidateSeconds = Number(process.env.WORDPRESS_REVALIDATE || 300);

type WPCollection<T> = {
  items: T[];
  totalPages: number;
};

async function wordpressCollection<T>(
  resource: string,
  query: Record<string, string | number>,
): Promise<WPCollection<T>> {
  const url = new URL(`${apiBase}/${resource}`);
  Object.entries(query).forEach(([key, value]) =>
    url.searchParams.set(key, String(value)),
  );

  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    next: {
      revalidate: revalidateSeconds,
      tags: ['wordpress', `wordpress:${resource}`],
    },
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`WordPress ${resource} request failed (${response.status})`);
  }

  return {
    items: (await response.json()) as T[],
    totalPages: Number(response.headers.get('X-WP-TotalPages') || 1),
  };
}

export async function getPublishedSitemapPosts(): Promise<WPPost[]> {
  const query = {
    status: 'publish',
    per_page: 100,
    _fields: 'id,slug,modified,author,categories',
  };
  const first = await wordpressCollection<WPPost>('posts', {
    ...query,
    page: 1,
  });
  const posts = [...first.items];

  for (let page = 2; page <= first.totalPages; page += 1) {
    const result = await wordpressCollection<WPPost>('posts', {
      ...query,
      page,
    });
    posts.push(...result.items);
  }

  return posts;
}

export async function getSitemapCategories(): Promise<WPTerm[]> {
  const { items } = await wordpressCollection<WPTerm>('categories', {
    per_page: 100,
    _fields: 'id,slug,count',
  });
  return items;
}

export async function getSitemapPages(): Promise<WPPage[]> {
  const { items } = await wordpressCollection<WPPage>('pages', {
    status: 'publish',
    per_page: 100,
    _fields: 'slug,modified',
  });
  return items;
}

export async function getSitemapAuthors(
  authorIds: number[],
): Promise<WPAuthor[]> {
  if (!authorIds.length) return [];
  const { items } = await wordpressCollection<WPAuthor>('users', {
    include: [...new Set(authorIds)].join(','),
    per_page: 100,
    _fields: 'id,slug',
  });
  return items;
}

export type SitemapEntry = { url: string; lastmod?: string };

function xmlEscape(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function renderUrlset(entries: SitemapEntry[]) {
  const urls = [...new Map(entries.map((entry) => [entry.url, entry])).values()];
  const body = urls
    .map(
      ({ url, lastmod }) =>
        `  <url><loc>${xmlEscape(url)}</loc>${
          lastmod && Number.isFinite(Date.parse(lastmod))
            ? `<lastmod>${xmlEscape(lastmod)}</lastmod>`
            : ''
        }</url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;
}

export function sitemapResponse(xml: string) {
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}

export function renderSitemapIndex(urls: string[]) {
  const sitemaps = [...new Set(urls)]
    .map((url) => `  <sitemap><loc>${xmlEscape(url)}</loc></sitemap>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps}\n</sitemapindex>`;
}
