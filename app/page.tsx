import Link from 'next/link';
import { StoryCard } from '@/components/article/story-card';
import { Newsletter } from '@/components/home/newsletter';
import { SectionHeading } from '@/components/home/section-heading';
import { safePosts } from '@/lib/wordpress/client';
import type { WPPost } from '@/types/wordpress';

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
  const latest = posts.slice(4, 9);
  const ai = posts
    .filter((post) => inDesk(post, /(^|-)ai($|-)|artificial/))
    .slice(0, 3);
  const tutorials = posts
    .filter((post) => inDesk(post, /tutorial|how-to/))
    .slice(0, 4);
  const software = posts
    .filter((post) => inDesk(post, /software|tools?|productivity|comparison/))
    .slice(0, 4);
  const guides = posts
    .filter((post) => inDesk(post, /guides?|explainer|troubleshoot/))
    .slice(0, 4);

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

      <section className="desk-nav shell" id="topics" aria-labelledby="desk-nav-title">
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
              '/category/ai',
            ],
            [
              '02',
              'Tutorials',
              'Workflows explained one clear step at a time.',
              '/category/tutorials',
            ],
            [
              '03',
              'Software',
              'Straightforward choices for work and study.',
              '/category/software',
            ],
            [
              '04',
              'Tools',
              'Useful products matched to real needs.',
              '/category/tools',
            ],
            [
              '05',
              'Guides',
              'Reliable answers worth keeping nearby.',
              '/category/guides',
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
            {(ai.length ? ai : posts.slice(1, 4)).map((post, index) => (
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
          {(tutorials.length ? tutorials : posts.slice(2, 6)).map(
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
            {(software.length ? software : posts.slice(5, 9)).map(
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
          {(guides.length ? guides : posts.slice(0, 4)).map((post, index) => (
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
