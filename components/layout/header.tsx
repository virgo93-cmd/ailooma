import Link from 'next/link';
import { PrimaryNav } from '@/components/layout/primary-nav';

export function Header() {
  return (
    <header className="site-header">
      <div className="topbar shell">
        <span>Independent technology publication</span>
        <span>AI · Automation · Software · Practical Guides</span>
      </div>
      <div className="nav shell">
        <Link href="/" className="brand" aria-label="AILooma home">
          <span className="brand-mark">A</span>
          <span className="brand-word">AILooma</span>
        </Link>
        <PrimaryNav />
      </div>
    </header>
  );
}
