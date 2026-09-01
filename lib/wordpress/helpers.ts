import type { WPPost } from '@/types/wordpress';

export const decode = (value = '') =>
  value
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#8217;/g, '’')
    .replace(/&#8220;|&#8221;/g, '“')
    .replace(/&hellip;/g, '…')
    .trim();
export const postImage = (post: WPPost) =>
  post._embedded?.['wp:featuredmedia']?.[0];
const localFeaturedImages: Record<string, string> = {
  'ai-agents-for-productivity-practical-use-cases':
    '/article-images/ai-agents-productivity.jpg',
  'n8n-tutorial-for-beginners-build-first-workflow':
    '/article-images/n8n-beginner-workflow.jpg',
  'best-free-microsoft-office-alternatives-work-study':
    '/article-images/free-office-alternatives.jpg',
  'best-ai-productivity-tools-actually-useful':
    '/article-images/useful-ai-productivity-tools.jpg',
  'how-to-fix-slow-windows-11-pc':
    '/article-images/fix-slow-windows-11.jpg',
};
export const postImageSource = (post: WPPost) =>
  localFeaturedImages[post.slug] || postImage(post)?.source_url;
export const postAuthor = (post: WPPost) => post._embedded?.author?.[0];
export const postTerms = (post: WPPost) =>
  post._embedded?.['wp:term']?.flat() || [];
export const readingTime = (html: string, fallback?: number) =>
  fallback ||
  Math.max(
    1,
    Math.ceil(decode(html).split(/\s+/).filter(Boolean).length / 220),
  );
export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
