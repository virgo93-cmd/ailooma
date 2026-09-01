import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategories, getCategory, getPosts } from '@/lib/wordpress/client';
import { StoryCard } from '@/components/article/story-card';
import { EmptyState } from '@/components/article/empty-state';
import { siteConfig } from '@/config/site';
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};
export async function generateStaticParams() {
  const categories = await getCategories().catch(() => []);
  return categories.map((category) => ({ slug: category.slug }));
}
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const page = Math.max(1, Number((await searchParams).page) || 1);
  const canonical = page > 1 ? `/category/${slug}?page=${page}` : `/category/${slug}`;
  const c = await getCategory(slug).catch(() => null);
  const configured = siteConfig.nav.find(
    (item) => item.href === `/category/${slug}`,
  );
  return c
    ? {
        title: c.name,
        description: c.description || `Latest ${c.name} articles from AILooma.`,
        alternates: { canonical },
      }
    : configured
      ? {
          title: configured.label,
          description: `Latest ${configured.label} articles from AILooma.`,
          alternates: { canonical },
        }
      : { title: 'Category not found' };
}
export default async function CategoryPage({ params, searchParams }: Props) {
  const slug = (await params).slug,
    page = Math.max(1, Number((await searchParams).page) || 1);
  const category = await getCategory(slug).catch(() => null);
  const configured = siteConfig.nav.find(
    (item) => item.href === `/category/${slug}`,
  );
  if (!category && !configured) notFound();
  const name = category?.name || configured!.label;
  const result = category
    ? await getPosts({
        categories: category.id,
        page,
        per_page: 10,
      }).catch(() => ({ items: [], total: 0, totalPages: 0 }))
    : { items: [], total: 0, totalPages: 0 };
  const [lead, ...rest] = result.items;
  return (
    <main className="archive shell">
      <header>
        <p className="eyebrow">AILooma / Desk</p>
        <h1>{name}</h1>
        {category?.description && <p>{category.description}</p>}
        <span>
          {result.total} {result.total === 1 ? 'story' : 'stories'}
        </span>
      </header>
      {lead ? (
        <>
          <StoryCard post={lead} variant="lead" />
          <div className="archive-grid">
            {rest.map((p) => (
              <StoryCard key={p.id} post={p} />
            ))}
          </div>
          <Pagination page={page} total={result.totalPages} />
        </>
      ) : (
        <EmptyState title={`No ${name} stories yet`} />
      )}
    </main>
  );
}
function Pagination({ page, total }: { page: number; total: number }) {
  if (total < 2) return null;
  return (
    <nav className="pagination" aria-label="Pagination">
      {page > 1 && <a href={`?page=${page - 1}`}>Previous</a>}
      <span>
        Page {page} of {total}
      </span>
      {page < total && <a href={`?page=${page + 1}`}>Next</a>}
    </nav>
  );
}
