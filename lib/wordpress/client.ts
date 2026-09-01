import type {
  PagedResult,
  WPAuthor,
  WPMedia,
  WPPage,
  WPPost,
  WPTerm,
} from '@/types/wordpress';
import { cache } from 'react';
import {
  fallbackAuthor,
  fallbackCategories,
  fallbackPostResult,
  fallbackPosts,
} from '@/lib/wordpress/fallback';

const API =
  process.env.WORDPRESS_API_URL || 'https://cms.ailooma.biz.id/wp-json/wp/v2';
const REVALIDATE = Number(process.env.WORDPRESS_REVALIDATE || 300);

export class WordPressError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
  }
}

type Query = Record<string, string | number | boolean | undefined>;

async function request<T>(
  path: string,
  query: Query = {},
): Promise<{ data: T; headers: Headers }> {
  const url = new URL(`${API}/${path.replace(/^\//, '')}`);
  Object.entries(query).forEach(
    ([key, value]) =>
      value !== undefined && url.searchParams.set(key, String(value)),
  );
  let lastError: unknown;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(20_000),
        next: {
          revalidate: REVALIDATE,
          tags: ['wordpress', `wordpress:${path.split('/')[0]}`],
        },
      });

      if (response.ok) {
        return { data: (await response.json()) as T, headers: response.headers };
      }

      if (response.status < 500) {
        throw new WordPressError(
          `WordPress request failed: ${response.status}`,
          response.status,
        );
      }

      lastError = new WordPressError(
        `WordPress request failed: ${response.status}`,
        response.status,
      );
    } catch (error) {
      if (error instanceof WordPressError && (error.status || 0) < 500) {
        throw error;
      }
      lastError = error;
    }

    if (attempt < 1) {
      await new Promise((resolve) => setTimeout(resolve, 600 * (attempt + 1)));
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new WordPressError('WordPress request failed');
}

function paged<T>(data: T[], headers: Headers): PagedResult<T> {
  return {
    items: data,
    total: Number(headers.get('X-WP-Total') || data.length),
    totalPages: Number(headers.get('X-WP-TotalPages') || 1),
  };
}

export async function getPosts(query: Query = {}) {
  const normalized = { per_page: 12, page: 1, _embed: true, ...query };
  try {
    const { data, headers } = await request<WPPost[]>('posts', normalized);
    return paged(data, headers);
  } catch {
    return fallbackPostResult(normalized);
  }
}
const getPostUncached = async (slug: string) => {
  return (await getPosts({ slug, per_page: 1 })).items[0] || null;
};
export const getPost = cache(getPostUncached);
export async function getCategories(query: Query = {}) {
  try {
    return (await request<WPTerm[]>('categories', { per_page: 100, ...query }))
      .data;
  } catch {
    return query.slug
      ? fallbackCategories.filter((item) => item.slug === query.slug)
      : fallbackCategories;
  }
}
const getCategoryUncached = async (slug: string) => {
  return (await getCategories({ slug }))[0] || null;
};
export const getCategory = cache(getCategoryUncached);
export async function getTag(slug: string) {
  return (await getTags({ slug }))[0] || null;
}
export async function getTags(query: Query = {}) {
  return (await request<WPTerm[]>('tags', { per_page: 100, ...query })).data;
}
export async function getAuthors(query: Query = {}) {
  try {
    return (await request<WPAuthor[]>('users', { per_page: 100, ...query })).data;
  } catch {
    return !query.slug || query.slug === fallbackAuthor.slug ? [fallbackAuthor] : [];
  }
}
const getAuthorUncached = async (slug: string) => {
  return (await getAuthors({ slug }))[0] || null;
};
export const getAuthor = cache(getAuthorUncached);
export async function getMedia(id: number) {
  try {
    return (await request<WPMedia>(`media/${id}`)).data;
  } catch {
    return fallbackPosts
      .flatMap((post) => post._embedded?.['wp:featuredmedia'] || [])
      .find((item) => item.id === id) || null;
  }
}
export async function getPages(query: Query = {}) {
  return (await request<WPPage[]>('pages', { per_page: 100, ...query })).data;
}
const getPageUncached = async (slug: string) => {
  return (await getPages({ slug }))[0] || null;
};
export const getPage = cache(getPageUncached);
export async function searchPosts(search: string, page = 1) {
  return getPosts({ search, page, per_page: 10 });
}
export async function safePosts(query: Query = {}) {
  const result = await getPosts(query);
  return { ...result, unavailable: false as const };
}
