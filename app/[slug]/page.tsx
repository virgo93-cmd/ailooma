import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPage, getPages } from '@/lib/wordpress/client';
import { decode } from '@/lib/wordpress/helpers';
import { sanitizeContent } from '@/lib/wordpress/sanitize';
type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() {
  const pages = await getPages().catch(() => []);
  return pages.map((page) => ({ slug: page.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getPage((await params).slug).catch(() => null);
  return p
    ? {
        title: decode(p.title.rendered),
        description: decode(p.excerpt.rendered),
        alternates: { canonical: `/${p.slug}` },
      }
    : { title: 'Page not found' };
}
export default async function ContentPage({ params }: Props) {
  const page = await getPage((await params).slug).catch(() => null);
  if (!page) notFound();
  return (
    <main className="content-page shell">
      <header>
        <p className="eyebrow">AILooma</p>
        <h1>{decode(page.title.rendered)}</h1>
      </header>
      <div
        className="prose"
        dangerouslySetInnerHTML={{
          __html: sanitizeContent(page.content.rendered),
        }}
      />
    </main>
  );
}
