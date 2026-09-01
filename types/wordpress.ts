export type Rendered = { rendered: string };

export type WPMedia = {
  id: number;
  source_url: string;
  alt_text: string;
  caption?: Rendered;
  media_details?: { width?: number; height?: number };
};

export type WPAuthor = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  avatar_urls?: Record<string, string>;
  link?: string;
};

export type WPTerm = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  count?: number;
};

export type WPPost = {
  id: number;
  slug: string;
  date: string;
  modified: string;
  link: string;
  title: Rendered;
  excerpt: Rendered;
  content: Rendered;
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  fallback_reading_time?: number;
  _embedded?: {
    author?: WPAuthor[];
    'wp:featuredmedia'?: WPMedia[];
    'wp:term'?: WPTerm[][];
  };
};

export type WPPage = WPPost;
export type PagedResult<T> = { items: T[]; total: number; totalPages: number };
