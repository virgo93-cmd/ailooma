import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, safePosts } from '@/lib/wordpress/client';
import {
  decode,
  formatDate,
  postAuthor,
  postImage,
  postImageSource,
  postTerms,
  readingTime,
} from '@/lib/wordpress/helpers';
import { StoryCard } from '@/components/article/story-card';
import { siteConfig } from '@/config/site';
import { prepareArticleContent } from '@/lib/wordpress/sanitize';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = true;
export async function generateStaticParams() {
  const { items } = await safePosts({ per_page: 100 });
  return items.map((post) => ({ slug: post.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug).catch(() => null);
  if (!post) return { title: 'Article not found' };
  const title = decode(post.title.rendered),
    description = decode(post.excerpt.rendered),
    image = postImageSource(post);
  return {
    title,
    description,
    alternates: { canonical: `/article/${post.slug}` },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `/article/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: image ? [image] : [],
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      images: image ? [image] : [],
    },
  };
}
export default async function ArticlePage({ params }: Props) {
  const post = await getPost((await params).slug).catch(() => null);
  if (!post) notFound();
  const image = postImage(post),
    imageSource = postImageSource(post),
    author = postAuthor(post),
    term = postTerms(post)[0];
  const related = (
    await safePosts({
      categories: post.categories[0],
      exclude: post.id,
      per_page: 3,
    })
  ).items;
  const moreStories = (
    await safePosts({
      exclude: post.id,
      per_page: 4,
    })
  ).items;
  const articleContent = prepareArticleContent(post.content.rendered);
  const articleUrl = `${siteConfig.url}/article/${post.slug}`;
  const breadcrumbItems = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
    ...(term
      ? [
          {
            '@type': 'ListItem',
            position: 2,
            name: term.name,
            item: `${siteConfig.url}/category/${term.slug}`,
          },
        ]
      : []),
    {
      '@type': 'ListItem',
      position: term ? 3 : 2,
      name: decode(post.title.rendered),
      item: articleUrl,
    },
  ];
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: decode(post.title.rendered),
        description: decode(post.excerpt.rendered),
        datePublished: post.date,
        dateModified: post.modified,
        url: articleUrl,
        mainEntityOfPage: articleUrl,
        isPartOf: { '@id': `${siteConfig.url}/#website` },
        publisher: { '@id': `${siteConfig.url}/#organization` },
        ...(imageSource
          ? { image: new URL(imageSource, siteConfig.url).toString() }
          : {}),
        ...(author
          ? {
              author: {
                '@type': 'Person',
                name: author.name,
                url: `${siteConfig.url}/author/${author.slug}`,
              },
            }
          : {}),
      },
      { '@type': 'BreadcrumbList', itemListElement: breadcrumbItems },
      ...(author
        ? [
            {
              '@type': 'Person',
              name: author.name,
              url: `${siteConfig.url}/author/${author.slug}`,
              ...(author.description
                ? { description: author.description }
                : {}),
            },
          ]
        : []),
    ],
  };
  return (
    <main>
      <article>
        <header className="article-head shell">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            {term && <Link href={`/category/${term.slug}`}>{term.name}</Link>}
          </div>
          <p className="eyebrow">{term?.name || 'Technology'}</p>
          <h1>{decode(post.title.rendered)}</h1>
          <p className="article-dek">{decode(post.excerpt.rendered)}</p>
          <div className="byline">
            {author?.avatar_urls?.['96'] && (
              <Image
                src={author.avatar_urls['96']}
                alt=""
                width={42}
                height={42}
              />
            )}
            <div>
              <span>
                By{' '}
                {author ? (
                  <Link href={`/author/${author.slug}`}>{author.name}</Link>
                ) : (
                  'AILooma Editorial'
                )}
              </span>
              <small>
                Published {formatDate(post.date)} ·{' '}
                {readingTime(post.content.rendered)} min read
                {post.modified !== post.date
                  ? ` · Updated ${formatDate(post.modified)}`
                  : ''}
              </small>
            </div>
          </div>
        </header>
        {image && imageSource && (
          <figure className="article-hero shell">
            <Image
              src={imageSource}
              alt={image.alt_text || decode(post.title.rendered)}
              width={image.media_details?.width || 1600}
              height={image.media_details?.height || 900}
              priority
            />
            {image.caption?.rendered && (
              <figcaption>{decode(image.caption.rendered)}</figcaption>
            )}
          </figure>
        )}
        <div className="article-layout shell">
          <aside className="article-toc">
            <span>In this article</span>
            {articleContent.headings.length ? (
              <nav aria-label="Table of contents">
                {articleContent.headings.map((heading) => (
                  <a
                    className={heading.level === 3 ? 'toc-sub' : undefined}
                    href={`#${heading.id}`}
                    key={heading.id}
                  >
                    {heading.text}
                  </a>
                ))}
              </nav>
            ) : (
              <p>A focused read with no section navigation needed.</p>
            )}
          </aside>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: articleContent.html }}
          />
          {moreStories.length > 0 && (
            <aside className="article-rail" aria-label="More articles">
              <div className="rail-heading">
                <span>More to explore</span>
                <p>Useful reads from across the AILooma desk.</p>
              </div>
              <div className="rail-stories">
                {moreStories.map((item) => (
                  <StoryCard post={item} variant="mini" key={item.id} />
                ))}
              </div>
            </aside>
          )}
        </div>
      </article>
      {author && (
        <section className="author-strip shell">
          <div>
            {author.avatar_urls?.['96'] && (
              <Image
                src={author.avatar_urls['96']}
                alt=""
                width={72}
                height={72}
              />
            )}
            <div>
              <span>Written by</span>
              <h2>{author.name}</h2>
              <p>
                {author.description ||
                  'Author biography will be added by the editorial team.'}
              </p>
              <Link href={`/author/${author.slug}`}>
                More from {author.name}
              </Link>
            </div>
          </div>
        </section>
      )}
      {related.length > 0 && (
        <section className="section shell">
          <div className="section-heading">
            <div>
              <span>Keep reading</span>
              <h2>Related stories</h2>
            </div>
          </div>
          <div className="three-grid">
            {related.map((p) => (
              <StoryCard post={p} key={p.id} />
            ))}
          </div>
        </section>
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
