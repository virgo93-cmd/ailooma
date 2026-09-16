import Link from 'next/link';
import type { Metadata } from 'next';
import { StoryCard } from '@/components/article/story-card';
import { Newsletter } from '@/components/home/newsletter';
import { SectionHeading } from '@/components/home/section-heading';
import { safePosts } from '@/lib/wordpress/client';
import type { WPPost } from '@/types/wordpress';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

function inDesk(post: WPPost, pattern: RegExp) {
  return post._embedded?.['wp:term']
    ?.flat()
    .some((term) => pattern.test(term.slug));
}

export default async function Home() {
  const result = await safePosts({ per_page: 24 });
  const posts = result.items;
  if (!posts.length) {
    return (
      <main>
        <section className="offline-home shell">
          <div className="offline-intro">
            <p className="eyebrow">AILOOMA / THE TECHNOLOGY DESK</p>
            <h1>Useful technology. Explained properly.</h1>
            <p>
              Practical reporting on artificial intelligence, automation,
              software, and the tools shaping modern work.
            </p>
          </div>
          <output className="offline-status">
            <span>Newsroom status</span>
            <h2>
              {result.unavailable
                ? 'The editorial feed is temporarily delayed.'
                : 'The first edition is being prepared.'}
            </h2>
            <p>
              {result.unavailable
                ? 'Our published stories remain in WordPress, but the newsroom connection is not responding right now. The feed will return automatically.'
                : 'New reporting will appear here as soon as it is published.'}
            </p>
          </output>
        </section>
        <Newsletter />
      </main>
    );
  }

  const lead = posts[0];
  const secondary = posts.slice(1, 4);
  const usedIds = new Set([lead.id, ...secondary.map((post) => post.id)]);
  const takeUnique = (source: WPPost[], count: number) => {
    const selected: WPPost[] = [];
    for (const post of source) {
      if (usedIds.has(post.id)) continue;
      usedIds.add(post.id);
      selected.push(post);
      if (selected.length === count) break;
    }
    return selected;
  };
  const latest = takeUnique(posts.slice(4), 5);
  const ai = takeUnique(
    posts.filter((post) => inDesk(post, /(^|-)ai($|-)|artificial/)),
    3,
  );
  const tutorials = takeUnique(
    posts.filter((post) => inDesk(post, /tutorial|how-to/)),
    4,
  );
  const software = takeUnique(
    posts.filter((post) => inDesk(post, /software|tools?|productivity|comparison/)),
    4,
  );
  const guides = takeUnique(
    posts.filter((post) => inDesk(post, /guides?|explainer|troubleshoot/)),
    4,
  );
  const aiDisplay = ai.length ? ai : takeUnique(posts, 3);
  const tutorialsDisplay = tutorials.length ? tutorials : takeUnique(posts, 4);
  const softwareDisplay = software.length ? software : takeUnique(posts, 4);
  const guidesDisplay = guides.length ? guides : takeUnique(posts, 4);

  return (
    <main>
      <section className="hero shell">
        <div className="hero-grid">
          <StoryCard post={lead} variant="lead" />
          <div className="hero-side">
            <div className="hero-side-head">
              <p className="eyebrow">Top stories</p>
              <span>{String(secondary.length).padStart(2, '0')}</span>
            </div>
            {secondary.map((post, index) => (
              <StoryCard
                key={post.id}
                post={post}
                variant="mini"
                index={index + 1}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        className="desk-nav shell"
        id="topics"
        aria-labelledby="desk-nav-title"
      >
        <div className="desk-nav-copy">
          <p className="eyebrow">Browse by topic</p>
          <h2 id="desk-nav-title">Technology, sorted.</h2>
          <p>
            Five focused desks for understanding what matters, choosing better
            tools, and solving real technology problems.
          </p>
        </div>
        <div className="desk-nav-links">
          {[
            [
              '01',
              'AI',
              'Practical intelligence beyond the hype.',
              '/hub/artificial-intelligence',
            ],
            [
              '02',
              'Tutorials',
              'Workflows explained one clear step at a time.',
              '/hub/tutorials',
            ],
            [
              '03',
              'Software',
              'Straightforward choices for work and study.',
              '/hub/software',
            ],
            [
              '04',
              'Tools',
              'Useful products matched to real needs.',
              '/hub/tools',
            ],
            [
              '05',
              'Guides',
              'Reliable answers worth keeping nearby.',
              '/hub/guides',
            ],
          ].map(([number, label, description, href]) => (
            <Link href={href} key={href}>
              <span>{number}</span>
              <strong>{label}</strong>
              <p>{description}</p>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      {latest.length > 0 && (
        <section className="section shell">
          <SectionHeading
            eyebrow="Latest"
            title="Fresh from the newsroom"
            href="/search"
          />
          <div className="latest-grid">
            {latest.map((post, index) => (
              <StoryCard
                key={post.id}
                post={post}
                variant={index < 2 ? 'standard' : 'horizontal'}
              />
            ))}
          </div>
        </section>
      )}

      <section className="section ink-section">
        <div className="shell">
          <SectionHeading
            eyebrow="Artificial Intelligence"
            title="AI, with the noise removed"
            href="/category/ai"
          />
          <div className="three-grid">
            {aiDisplay.map((post, index) => (
              <StoryCard
                key={post.id}
                post={post}
                variant={index === 0 ? 'feature' : 'standard'}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section shell">
        <SectionHeading
          eyebrow="Learn by doing"
          title="Tutorials you can follow"
          href="/category/tutorials"
        />
        <div className="tutorial-grid">
          {tutorialsDisplay.map(
            (post, index) => (
              <StoryCard
                key={post.id}
                post={post}
                variant="compact"
                index={index + 1}
              />
            ),
          )}
        </div>
      </section>

      <section className="section tools-section">
        <div className="shell">
          <SectionHeading
            eyebrow="Software & tools"
            title="A better digital toolkit"
            href="/category/tools"
          />
          <div className="tools-grid">
            {softwareDisplay.map(
              (post, index) => (
                <StoryCard
                  key={post.id}
                  post={post}
                  variant={index === 0 ? 'feature' : 'compact'}
                  index={index || undefined}
                />
              ),
            )}
          </div>
        </div>
      </section>

      <section className="section shell editors-section">
        <SectionHeading
          eyebrow="Editor’s Picks"
          title="Keep these guides close"
          href="/category/guides"
        />
        <p className="section-intro">
          Durable references selected for their practical value—not ranked by
          invented popularity.
        </p>
        <div className="editors-grid">
          {guidesDisplay.map((post, index) => (
            <StoryCard
              key={post.id}
              post={post}
              variant={index === 0 ? 'lead' : 'compact'}
              index={index}
            />
          ))}
        </div>
      </section>
      <Newsletter />
    </main>
  );
}
