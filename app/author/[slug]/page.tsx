import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAuthor, getAuthors, getPosts } from '@/lib/wordpress/client';
import { StoryCard } from '@/components/article/story-card';
import { EmptyState } from '@/components/article/empty-state';
import { siteConfig } from '@/config/site';
type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() {
  const authors = await getAuthors().catch(() => []);
  return authors.map((author) => ({ slug: author.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = await getAuthor((await params).slug).catch(() => null);
  return a
    ? { title: a.name, description: a.description || `Articles by ${a.name}.` }
    : { title: 'Author' };
}
export default async function AuthorPage({ params }: Props) {
  const author = await getAuthor((await params).slug).catch(() => null);
  if (!author) notFound();
  const { items } = await getPosts({ author: author.id, per_page: 12 }).catch(
    () => ({ items: [] }),
  );
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    url: `${siteConfig.url}/author/${author.slug}`,
    ...(author.description ? { description: author.description } : {}),
  };
  return (
    <main className="archive shell">
      <header className="author-head">
        {author.avatar_urls?.['96'] && (
          <Image
            src={author.avatar_urls['96']}
            alt=""
            width={112}
            height={112}
          />
        )}
        <div>
          <p className="eyebrow">Contributor</p>
          <h1>{author.name}</h1>
          {author.description && <p>{author.description}</p>}
        </div>
      </header>
      <h2 className="archive-subtitle">Latest from {author.name}</h2>
      {items.length ? (
        <div className="archive-grid">
          {items.map((p) => (
            <StoryCard key={p.id} post={p} />
          ))}
        </div>
      ) : (
        <EmptyState title="No published articles yet" />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  );
}
