import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <Link href="/" className="brand brand-light">
            <span className="brand-mark">A</span>
            <span className="brand-word">AILooma</span>
          </Link>
          <p>
            Clear, useful reporting for people who want technology to work
            better—not feel more complicated.
          </p>
        </div>
        <div>
          <h3>Explore</h3>
          {siteConfig.nav.map((x) => (
            <Link key={x.href} href={x.href}>
              {x.label}
            </Link>
          ))}
        </div>
        <div>
          <h3>Publication</h3>
          {siteConfig.footer.map((x) => (
            <Link key={x.href} href={x.href}>
              {x.label}
            </Link>
          ))}
        </div>
        <div>
          <h3>The weekly signal</h3>
          <p>
            Useful AI, dependable software, and practical ways to work smarter.
            No hype, no noise.
          </p>
          <span className="coming-soon">
            Coming soon <ArrowUpRight size={15} />
          </span>
        </div>
      </div>
      <div className="shell copyright">
        © {new Date().getFullYear()} AILooma. All rights reserved.
      </div>
    </footer>
  );
}
