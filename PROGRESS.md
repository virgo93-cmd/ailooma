# AILooma Progress

## Completed

- Standard Next.js + TypeScript App Router project foundation
- Centralized, typed WordPress REST client with caching and error handling
- Responsive publication design system, header, mobile navigation, and footer
- Multi-section editorial homepage with content-aware fallback states
- Five reusable editorial story treatments
- Long-form article route with metadata, structured data, authorship, related stories, and sanitized WordPress HTML
- Editorial category pages with pagination
- Author profile and archive architecture
- Functional paginated WordPress search foundation and empty state
- WordPress-driven information pages, custom 404, robots, and sitemap
- Responsive image host configuration and environment template
- Blueprint and project documentation
- Final lint, TypeScript, production build, and dependency audit pass
- Dedicated Software/Tools and Editor’s Picks homepage compositions
- Automatic article table of contents generated from sanitized headings
- Responsive loading and recoverable error states
- Branded 1200×630 social preview with Open Graph and X metadata
- Graceful configured category landing pages before WordPress taxonomy setup
- Authenticated WordPress Editor connection verified with least-privilege capabilities
- Live CMS taxonomy created for AI, Tutorials, Software, Tools, and Guides
- Three clearly labeled Development Preview posts were used for end-to-end testing and later moved to WordPress Trash
- Existing public About, Contact, Terms, and Disclaimer routes aligned with the frontend footer
- Homepage, article, category, author, and search routes verified against live WordPress data
- Search pagination now preserves the query and exposes accessible previous/next navigation
- CMS-unavailable states are distinct from legitimate empty-content states
- WordPress data layer now includes individual media and tag access plus request-level memoization
- Article BreadcrumbList and Person structured data added without fabricated attributes
- Live posts, authors, and WordPress pages are prerendered through `generateStaticParams`
- Accessible active states added to desktop, mobile, and search navigation
- Mobile navigation closes after selection without replacing native disclosure semantics
- Gutenberg galleries, wide/full alignment, pullquotes, buttons, embeds, captions, and text alignment styled
- Sanitized YouTube and Vimeo embeds supported through an explicit hostname allowlist
- Secure on-demand revalidation endpoint added and disabled until a deployment secret is configured
- Five owner-authored articles revised, assigned custom featured images, and published
- Public author profile updated to Femica Maydinda Harend with a factual editorial biography
- Final professional redesign completed across the shared publication system and editorial routes
- Article pages now use a responsive three-zone reading layout with table of contents, long-form body, and a related-reading sidebar
- Sidebar stories include compact thumbnails, category context, titles, and short excerpts
- Final spacing, image ratios, focus treatment, and low-JavaScript behavior refined for future AdSense integration
- Clean production build verified against the five current public articles after clearing stale preview cache
- Five current featured images mirrored locally as production-safe fallbacks while WordPress remains the canonical media source
- Next Image cache extended to 31 days so newly published WordPress media remains available after its first successful optimization
- A real-content emergency snapshot keeps homepage, categories, search, and author archives populated during temporary WordPress outages
- Future article slugs explicitly remain dynamic and appear through five-minute ISR or secure on-demand revalidation

## In Progress

- None

## Pending

- Configure a newsletter provider before enabling subscriptions
- Add social accounts only when the publication supplies them
- Add an editorial curation field/taxonomy for explicit homepage control
- Add on-demand revalidation when a secure WordPress webhook is desired
- Add AdSense only after editorial and policy readiness
- Review and publish the four policy-page drafts with owner-approved language

## Decisions

- WordPress REST API is the initial content transport.
- Five-minute revalidation balances freshness and CMS load.
- Missing content produces designed empty states; no fake articles or metrics are created.
- Newsletter UI clearly remains inactive until a provider is configured.
- Navigation and policy links are centralized and route to WordPress-managed pages.

## Known Issues

- WordPress availability and actual taxonomy slugs determine which live sections populate.
- Trust-policy footer routes return the designed 404 until matching WordPress pages exist.
- Live editorial population depends on the WordPress REST endpoint being reachable from Vercel.
- The requested `privacy-policy` slug was already reserved in WordPress, so the new draft was assigned `privacy-policy-2` and needs owner review before publication.
- WordPress retains its empty system category `Uncategorized`; the Editor integration role cannot delete the configured default category.
- The WordPress host occasionally responds slowly; designed loading and unavailable states remain in place.
- WordPress media returned connection timeouts during final QA; local fallbacks prevent the five current featured images from disappearing while the host is unavailable.

## Next Steps

1. Review and publish the remaining trust-policy pages.
2. Add production environment variables and the revalidation secret in Vercel.
3. Deploy to Vercel and verify the production domain.
4. Connect newsletter and social links when real accounts exist.
