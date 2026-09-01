import type { WPAuthor, WPMedia, WPPost, WPTerm } from '@/types/wordpress';

export const fallbackAuthor: WPAuthor = {
  id: 2,
  name: 'Femica Maydinda Harend',
  slug: 'femica-maydinda-harend',
  description:
    'Femica Maydinda Harend is a technology writer at AILooma focused on artificial intelligence, automation, productivity software, and practical troubleshooting. She writes clear, step-by-step guides that help readers understand tools, compare options, and solve everyday technology problems with confidence.',
};

export const fallbackCategories: WPTerm[] = [
  { id: 3, name: 'Artificial Intelligence', slug: 'ai', description: 'AI reporting, tools, and practical applications.' },
  { id: 4, name: 'Tutorials', slug: 'tutorials', description: 'Step-by-step technology and automation tutorials.' },
  { id: 5, name: 'Software', slug: 'software', description: 'Software comparisons and practical recommendations.' },
  { id: 6, name: 'Tools', slug: 'tools', description: 'Useful tools for modern work and productivity.' },
  { id: 7, name: 'Guides', slug: 'guides', description: 'Practical guides and troubleshooting references.' },
];

const media = (id: number, file: string, alt: string): WPMedia => ({
  id,
  source_url: `/article-images/${file}`,
  alt_text: alt,
  media_details: { width: 1600, height: 900 },
});

function post(input: {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: number;
  image: WPMedia;
  minutes: number;
}): WPPost {
  const term = fallbackCategories.find((item) => item.id === input.category)!;
  return {
    id: input.id,
    slug: input.slug,
    date: '2026-09-01T12:00:00',
    modified: '2026-09-01T12:00:00',
    link: `/article/${input.slug}`,
    title: { rendered: input.title },
    excerpt: { rendered: input.excerpt },
    content: { rendered: `<p>${input.excerpt}</p>` },
    author: fallbackAuthor.id,
    featured_media: input.image.id,
    categories: [input.category],
    tags: [],
    fallback_reading_time: input.minutes,
    _embedded: {
      author: [fallbackAuthor],
      'wp:featuredmedia': [input.image],
      'wp:term': [[term]],
    },
  };
}

export const fallbackPosts: WPPost[] = [
  post({
    id: 37,
    slug: 'how-to-fix-slow-windows-11-pc',
    title: 'How to Fix a Slow Windows 11 PC: A Safe Step-by-Step Guide',
    excerpt: 'Diagnose and fix a slow Windows 11 PC with built-in tools, safe performance checks, and official Microsoft recovery options.',
    category: 7,
    image: media(50, 'fix-slow-windows-11.jpg', 'Laptop performance diagnostics resolving a slow computer'),
    minutes: 4,
  }),
  post({
    id: 35,
    slug: 'best-ai-productivity-tools-actually-useful',
    title: 'AI Productivity Tools That Are Actually Useful',
    excerpt: 'A practical, hype-free guide to choosing AI tools for writing, research, meetings, and office workflows—and measuring whether they really save time.',
    category: 6,
    image: media(48, 'useful-ai-productivity-tools.jpg', 'Professional using an organized set of AI productivity tools'),
    minutes: 4,
  }),
  post({
    id: 33,
    slug: 'best-free-microsoft-office-alternatives-work-study',
    title: 'Best Free Microsoft Office Alternatives for Work and Study',
    excerpt: 'Compare five credible free office alternatives for desktop work, live collaboration, Microsoft file compatibility, and self-hosted editing.',
    category: 5,
    image: media(46, 'free-office-alternatives.jpg', 'Open productivity workspace with document spreadsheet and presentation tools'),
    minutes: 3,
  }),
  post({
    id: 31,
    slug: 'n8n-tutorial-for-beginners-build-first-workflow',
    title: 'n8n Tutorial for Beginners: Build Your First Workflow',
    excerpt: 'Learn n8n fundamentals by building and testing a simple form workflow, then extend it safely with the applications you already use.',
    category: 4,
    image: media(44, 'n8n-beginner-workflow.jpg', 'Modular automation nodes connected in a beginner workflow'),
    minutes: 4,
  }),
  post({
    id: 29,
    slug: 'ai-agents-for-productivity-practical-use-cases',
    title: 'AI Agents for Productivity: How They Work and Where They Help',
    excerpt: 'A practical guide to AI agents, useful productivity workflows, guardrails, implementation steps, and metrics that show whether an agent actually works.',
    category: 3,
    image: media(42, 'ai-agents-productivity.jpg', 'Abstract AI agent orchestration system connecting productivity workflows'),
    minutes: 4,
  }),
];

export function fallbackPostResult(query: Record<string, string | number | boolean | undefined>) {
  let items = [...fallbackPosts];
  if (query.slug) items = items.filter((item) => item.slug === query.slug);
  if (query.categories) items = items.filter((item) => item.categories.includes(Number(query.categories)));
  if (query.author) items = items.filter((item) => item.author === Number(query.author));
  if (query.exclude) items = items.filter((item) => item.id !== Number(query.exclude));
  if (query.search) {
    const search = String(query.search).toLowerCase();
    items = items.filter((item) => `${item.title.rendered} ${item.excerpt.rendered}`.toLowerCase().includes(search));
  }
  const perPage = Number(query.per_page || 12);
  const page = Math.max(1, Number(query.page || 1));
  const total = items.length;
  return {
    items: items.slice((page - 1) * perPage, page * perPage),
    total,
    totalPages: Math.max(1, Math.ceil(total / perPage)),
  };
}
