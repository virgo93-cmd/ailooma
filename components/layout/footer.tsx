import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <Link href="/" className="brand brand-light">
            <span>AI</span>Looma
            <i />
          </Link>
          <p>Practical intelligence for the way technology works now.</p>
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
          <h3>Stay curious</h3>
          <p>
            A focused briefing on useful AI, software, and modern work.
            Newsletter sign-up is coming soon.
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
