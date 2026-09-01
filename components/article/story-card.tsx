import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { WPPost } from '@/types/wordpress';
import {
  decode,
  formatDate,
  postImage,
  postImageSource,
  postTerms,
  readingTime,
} from '@/lib/wordpress/helpers';

type Variant =
  | 'lead'
  | 'standard'
  | 'horizontal'
  | 'compact'
  | 'feature'
  | 'mini';
export function StoryCard({
  post,
  variant = 'standard',
  index,
}: {
  post: WPPost;
  variant?: Variant;
  index?: number;
}) {
  const image = postImage(post);
  const imageSource = postImageSource(post);
  const term = postTerms(post)[0];
  return (
    <article className={`story story-${variant}`}>
      {variant === 'compact' && index !== undefined && (
        <span className="story-index">{String(index).padStart(2, '0')}</span>
      )}
      {image && imageSource && variant !== 'compact' && (
        <Link href={`/article/${post.slug}`} className="story-image">
          <Image
            src={imageSource}
            alt={image.alt_text || decode(post.title.rendered)}
            fill
            priority={variant === 'lead'}
            sizes={
              variant === 'lead'
                ? '(max-width: 800px) 100vw, 62vw'
                : variant === 'mini'
                  ? '112px'
                  : '(max-width: 800px) 100vw, 36vw'
            }
          />
        </Link>
      )}
      <div className="story-copy">
        <div className="story-kicker">
          {term?.name || 'Technology'}
          <span>{formatDate(post.date)}</span>
        </div>
        <h2>
          <Link href={`/article/${post.slug}`}>
            {decode(post.title.rendered)}
          </Link>
        </h2>
        {variant !== 'compact' && <p>{decode(post.excerpt.rendered)}</p>}
        <div className="story-meta">
          <span>
            {readingTime(post.content.rendered, post.fallback_reading_time)} min
            read
          </span>
          <Link
            href={`/article/${post.slug}`}
            aria-label={`Read ${decode(post.title.rendered)}`}
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
