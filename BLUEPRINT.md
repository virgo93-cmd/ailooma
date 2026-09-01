# AILooma Frontend Blueprint

## Architecture

AILooma is a Next.js App Router application written in TypeScript. Server Components perform content retrieval; client JavaScript is limited to native disclosure navigation and form behavior. Shared code is separated into `app`, `components`, `config`, `lib/wordpress`, and `types`.

## Headless WordPress integration

WordPress remains at `cms.ailooma.biz.id`. `lib/wordpress/client.ts` is the only HTTP access layer and exposes typed functions for posts, pages, categories, tags, authors, search, and pagination. Configuration comes from `WORDPRESS_API_URL`; UI components never fetch WordPress directly. Embedded REST resources reduce duplicate media, author, and taxonomy requests. Article HTML is allowlist-sanitized before rendering.

## Route architecture

- `/` editorial homepage
- `/article/[slug]` long-form article
- `/category/[slug]` category landing and pagination
- `/author/[slug]` contributor profile and archive
- `/search?q=` functional WordPress search
- `/[slug]` WordPress-managed trust and information pages
- `/robots.txt`, `/sitemap.xml`, and custom 404

## Component system

The publication shell uses shared Header and Footer components. Editorial composition uses `StoryCard` variants (`lead`, `feature`, `standard`, `horizontal`, `compact`), section headings, newsletter CTA, and content-aware empty states. Variants share semantics and data mapping while retaining distinct visual treatments.

## Responsive strategy

Desktop uses asymmetric lead layouts, multi-column editorial feeds, and a restrained article context rail. Tablet progressively reduces columns. Mobile replaces navigation with a touch-friendly disclosure, uses vertical story hierarchy, edge-aware hero imagery, single-column feeds, readable 18px article text, and horizontally scrollable code/tables.

## SEO architecture

Root metadata defines title templates, canonical origin, Open Graph, and X metadata. Articles generate record-specific metadata and Article JSON-LD. Category, author, page, and search routes provide focused metadata. Sitemap content is sourced from WordPress. Breadcrumbs, semantic landmarks, real dates, authors, and conditional image/schema fields prevent fabricated data.

## Content architecture

WordPress owns posts, authors, taxonomies, media, and publication pages. Navigation is centralized in `config/site.ts`. Featured and editor-curated placement can later be driven by a dedicated WordPress taxonomy or custom field without changing card components.

## Caching and revalidation

WordPress requests use Next.js fetch caching with a configurable five-minute default (`WORDPRESS_REVALIDATE`). The authenticated `POST /api/revalidate` endpoint invalidates the shared WordPress cache tag using stale-while-revalidate behavior. It remains disabled unless `WORDPRESS_REVALIDATE_SECRET` is configured and accepts the secret only through the `x-ailooma-secret` header. Failed homepage requests degrade to an intentional newsroom-unavailable state distinct from a legitimately empty newsroom.

## Deployment

The standard Next.js build is Vercel-ready. Production uses `NEXT_PUBLIC_SITE_URL=https://ailooma.biz.id` and the WordPress REST URL shown in `.env.example`. DNS and CMS hosting are outside this repository.

## Future AdSense integration

Future ad components should be explicit editorial separators, never card lookalikes. Safe insertion points are between homepage sections, after meaningful article intervals, and after articles. Reserved dimensions must prevent layout shift; consent and script loading should be centralized in the root layout. No ad placeholders are rendered today.
