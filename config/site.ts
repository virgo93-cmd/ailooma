export const siteConfig = {
  name: 'AILooma',
  description: 'Practical intelligence for the way technology works now.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ailooma.biz.id',
  nav: [
    { label: 'AI', href: '/category/ai' },
    { label: 'Tutorials', href: '/category/tutorials' },
    { label: 'Software', href: '/category/software' },
    { label: 'Tools', href: '/category/tools' },
    { label: 'Guides', href: '/category/guides' },
  ],
  footer: [
    { label: 'About', href: '/about-us' },
    { label: 'Contact', href: '/contact-us' },
    { label: 'Terms & Conditions', href: '/terms-conditions' },
    { label: 'Disclaimer', href: '/disclaimer' },
  ],
} as const;
