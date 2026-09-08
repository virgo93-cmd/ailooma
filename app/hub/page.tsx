import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { topicHubs } from '@/config/hubs';

export const metadata: Metadata = {
  title: 'Technology Topic Hubs',
  description:
    'Explore AILooma topic hubs for artificial intelligence, tutorials, software, tools, and practical technology guides.',
  alternates: { canonical: '/hub' },
};

export default function TopicHubIndex() {
  return (
    <main className="hub-index shell">
      <header className="hub-index-head">
        <p className="eyebrow">AILooma / Knowledge map</p>
        <h1>Five ways into useful technology.</h1>
        <p>
          Choose a topic hub for context, guided reading paths, and the latest
          reporting from each AILooma desk.
        </p>
      </header>
      <div className="hub-directory">
        {topicHubs.map((hub, index) => (
          <Link href={`/hub/${hub.slug}`} key={hub.slug}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <p>{hub.eyebrow}</p>
              <h2>{hub.label}</h2>
              <strong>{hub.description}</strong>
            </div>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        ))}
      </div>
    </main>
  );
}
