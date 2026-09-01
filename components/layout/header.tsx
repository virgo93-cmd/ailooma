import Link from 'next/link';
import { Menu } from 'lucide-react';
import { PrimaryNav } from '@/components/layout/primary-nav';

export function Header() {
  return (
    <header className="site-header">
      <div className="nav shell">
        <Link href="/#topics" className="header-menu" aria-label="Browse topics">
          <Menu size={22} />
        </Link>
        <Link href="/" className="brand" aria-label="AILooma home">
          <span className="brand-mark">A</span>
          <span className="brand-word">AILooma</span>
        </Link>
        <PrimaryNav />
      </div>
    </header>
  );
}
