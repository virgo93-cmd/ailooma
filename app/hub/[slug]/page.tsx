import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { StoryCard } from '@/components/article/story-card';
import { getTopicHub, topicHubs } from '@/config/hubs';
import { siteConfig } from '@/config/site';
import { getCategory, getPosts } from '@/lib/wordpress/client';
import { decode } from '@/lib/wordpress/helpers';
import type { WPPost } from '@/types/wordpress';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return topicHubs.map((hub) => ({ slug: hub.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hub = getTopicHub((await params).slug);
  if (!hub) return { title: 'Topic hub not found' };
  const canonical = `/hub/${hub.slug}`;
  return {
    title: `${hub.label} Hub`,
    description: hub.description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      title: `${hub.label} Hub | AILooma`,
      description: hub.description,
      url: canonical,
    },
  };
}

function searchable(post: WPPost) {
  return decode(
    `${post.title.rendered} ${post.excerpt.rendered}`,
  ).toLowerCase();
}

function pathStories(
  posts: WPPost[],
  keywords: readonly string[],
  offset: number,
  used: Set<number>,
) {
  const matched = posts.filter(
    (post) =>
      !used.has(post.id) &&
      keywords.some((keyword) => searchable(post).includes(keyword)),
  );
  const fallback = posts
    .filter((post) => !used.has(post.id))
    .slice(offset, offset + 2);
  const selected = (matched.length ? matched : fallback).slice(0, 2);
  selected.forEach((post) => used.add(post.id));
  return selected;
}

export default async function TopicHubPage({ params }: Props) {
  const hub = getTopicHub((await params).slug);
  if (!hub) notFound();

  const category = await getCategory(hub.categorySlug).catch(() => null);
  const result = category
    ? await getPosts({ categories: category.id, per_page: 13 }).catch(() => ({
        items: [],
        total: 0,
        totalPages: 0,
      }))
    : { items: [], total: 0, totalPages: 0 };
  const [lead, ...stories] = result.items;
  const pathStoryIds = new Set<number>();
  const url = `${siteConfig.url}/hub/${hub.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}/#collection`,
        name: `${hub.label} Hub`,
        description: hub.description,
        url,
        isPartOf: { '@id': `${siteConfig.url}/#website` },
        about: hub.label,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteConfig.url,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Topic Hubs',
            item: `${siteConfig.url}/hub`,
          },
          { '@type': 'ListItem', position: 3, name: hub.label, item: url },
        ],
      },
      ...(result.items.length
        ? [
            {
              '@type': 'ItemList',
              name: `Latest ${hub.label} articles`,
              itemListElement: result.items.map((post, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: decode(post.title.rendered),
                url: `${siteConfig.url}/article/${post.slug}`,
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <main className="topic-hub">
      <header className="hub-hero shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/hub">Topic Hubs</Link>
          <span>/</span>
          <span>{hub.label}</span>
        </nav>
        <div className="hub-hero-grid">
          <div>
            <p className="eyebrow">{hub.eyebrow}</p>
            <h1>{hub.title}</h1>
          </div>
          <div className="hub-dek">
            <p>{hub.description}</p>
            <span>
              {result.total} {result.total === 1 ? 'article' : 'articles'} in
              this desk
            </span>
          </div>
        </div>
      </header>

      <section
        className="hub-introduction shell"
        aria-labelledby="hub-introduction-title"
      >
        <div>
          <p className="eyebrow">A clear place to begin</p>
          <h2 id="hub-introduction-title">What this hub is for</h2>
        </div>
        <div className="hub-introduction-copy">
          {hub.introduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ul>
            {hub.focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="hub-path-section">
        <div className="shell">
          <div className="hub-section-heading">
            <div>
              <p className="eyebrow">Choose your path</p>
              <h2>Read with a purpose.</h2>
            </div>
            <p>
              Three practical routes through the {hub.label.toLowerCase()} desk.
            </p>
          </div>
          <div className="hub-path-grid">
            {hub.paths.map((path, index) => {
              const picks = pathStories(
                result.items,
                path.keywords,
                index * 2,
                pathStoryIds,
              );
              return (
                <article className="hub-path-card" key={path.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{path.title}</h3>
                  <p>{path.description}</p>
                  {picks.length > 0 && (
                    <ul>
                      {picks.map((post) => (
                        <li key={post.id}>
                          <Link href={`/article/${post.slug}`}>
                            {decode(post.title.rendered)}{' '}
                            <ArrowUpRight size={15} aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {lead && (
        <section
          className="hub-feature shell"
          aria-labelledby="hub-feature-title"
        >
          <div className="hub-section-heading">
            <div>
              <p className="eyebrow">Start here</p>
              <h2 id="hub-feature-title">Featured from the desk</h2>
            </div>
          </div>
          <StoryCard post={lead} variant="lead" />
        </section>
      )}

      {stories.length > 0 && (
        <section
          className="hub-latest shell"
          id="latest"
          aria-labelledby="hub-latest-title"
        >
          <div className="hub-section-heading">
            <div>
              <p className="eyebrow">Continue exploring</p>
              <h2 id="hub-latest-title">Latest {hub.label.toLowerCase()}</h2>
            </div>
            <Link href={`/category/${hub.categorySlug}`}>
              View complete archive <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="hub-story-grid">
            {stories.map((post) => (
              <StoryCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      <section className="hub-faq shell" aria-labelledby="hub-faq-title">
        <div>
          <p className="eyebrow">Before you continue</p>
          <h2 id="hub-faq-title">Common questions</h2>
        </div>
        <div>
          {hub.faqs.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <nav className="hub-related shell" aria-label="Other topic hubs">
        <p className="eyebrow">Explore another desk</p>
        <div>
          {topicHubs
            .filter((item) => item.slug !== hub.slug)
            .map((item) => (
              <Link href={`/hub/${item.slug}`} key={item.slug}>
                {item.label}
              </Link>
            ))}
        </div>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  );
}
