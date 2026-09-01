import Link from 'next/link';
import { PrimaryNav } from '@/components/layout/primary-nav';

export function Header() {
  return (
    <header className="site-header">
      <div className="topbar shell">
        <span>Practical technology, clearly explained</span>
        <span>AILooma · Est. 2026</span>
      </div>
      <div className="nav shell">
        <Link href="/" className="brand" aria-label="AILooma home">
          <span>AI</span>Looma
          <i />
        </Link>
        <PrimaryNav />
      </div>
    </header>
  );
}
