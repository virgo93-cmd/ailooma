import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
export function SectionHeading({
  eyebrow,
  title,
  href,
}: {
  eyebrow: string;
  title: string;
  href?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {href && (
        <Link href={href}>
          View all <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
