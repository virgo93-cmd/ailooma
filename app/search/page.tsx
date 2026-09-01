import { Search } from 'lucide-react';
import Link from 'next/link';
import { searchPosts } from '@/lib/wordpress/client';
import { StoryCard } from '@/components/article/story-card';
import { EmptyState } from '@/components/article/empty-state';
export const metadata = {
  title: 'Search',
  description: 'Search AILooma articles and practical technology guides.',
};
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const s = await searchParams,
    q = (s.q || '').trim(),
    page = Math.max(1, Number(s.page) || 1);
  const result = q
    ? await searchPosts(q, page)
        .then((data) => ({ ...data, unavailable: false }))
        .catch(() => ({
          items: [],
          total: 0,
          totalPages: 0,
          unavailable: true,
        }))
    : { items: [], total: 0, totalPages: 0, unavailable: false };
  return (
    <main className="search-page shell">
      <header>
        <p className="eyebrow">Search the archive</p>
        <h1>Find useful answers.</h1>
        <search>
          <form>
            <Search />
            <input
              name="q"
              defaultValue={q}
              placeholder="Search AI, tools, software…"
              aria-label="Search articles"
            />
            <button>Search</button>
          </form>
        </search>
      </header>
      {q && (
        <section>
          <h2>
            {result.total} {result.total === 1 ? 'result' : 'results'} for “{q}”
          </h2>
          {result.items.length ? (
            <>
              <div className="search-results">
                {result.items.map((p) => (
                  <StoryCard key={p.id} post={p} variant="horizontal" />
                ))}
              </div>
              <SearchPagination
                query={q}
                page={page}
                total={result.totalPages}
              />
            </>
          ) : (
            <EmptyState
              title={
                result.unavailable
                  ? 'Search is temporarily unavailable'
                  : 'No matching stories'
              }
              message={
                result.unavailable
                  ? 'AILooma could not reach the newsroom. Please try your search again shortly.'
                  : 'Try a broader term or check the spelling.'
              }
            />
          )}
        </section>
      )}
    </main>
  );
}

function SearchPagination({
  query,
  page,
  total,
}: {
  query: string;
  page: number;
  total: number;
}) {
  if (total < 2) return null;
  return (
    <nav className="pagination" aria-label="Search result pages">
      {page > 1 && (
        <Link
          href={{ pathname: '/search', query: { q: query, page: page - 1 } }}
        >
          Previous
        </Link>
      )}
      <span>
        Page {page} of {total}
      </span>
      {page < total && (
        <Link
          href={{ pathname: '/search', query: { q: query, page: page + 1 } }}
        >
          Next
        </Link>
      )}
    </nav>
  );
}
