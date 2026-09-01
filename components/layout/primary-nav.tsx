'use client';

import Link from 'next/link';
import { Menu, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { siteConfig } from '@/config/site';
import { ThemeToggle } from '@/components/layout/theme-toggle';

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function PrimaryNav() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => menu.current?.removeAttribute('open');
  return (
    <>
      <nav aria-label="Primary navigation">
        {siteConfig.nav.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="nav-actions">
        <ThemeToggle />
        <Link
          href="/search"
          className="icon-link"
          aria-label="Search"
          aria-current={pathname === '/search' ? 'page' : undefined}
        >
          <Search size={19} />
        </Link>
        <Link href="/#newsletter" className="subscribe-link">
          Subscribe
        </Link>
        <details className="mobile-menu" ref={menu}>
          <summary aria-label="Open navigation menu">
            <Menu size={21} />
          </summary>
          <div>
            {siteConfig.nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/search"
              aria-current={pathname === '/search' ? 'page' : undefined}
              onClick={closeMenu}
            >
              Search
            </Link>
          </div>
        </details>
      </div>
    </>
  );
}
