# AILooma Content Depth and Sitemap Implementation

**Date:** 2026-09-20 (Asia/Jakarta)
**Scope:** Content-depth review for the current 57 published WordPress posts, request-time multi-sitemap architecture, validation, and deployment. This log records editorial scope and outcomes; it does not store article bodies.

## Baseline and method

- Previous implementation log records 60 published articles, with three overlapping secondary posts moved to Draft. The live WordPress inventory immediately before this phase contained **57 published articles**; it still contains 57 after the content updates.
- A pre-update local REST word-count snapshot (HTML stripped; captions and some article-end matter can affect the estimate) gave **20 articles at or below 500 words**, **11 at 501–800**, and **26 above 800**. The approximate median was **716 words**. The separately supplied public crawler reported an editorial-body median of approximately **728** using its own article-body detector; those methods are not interchangeable.
- Word count was only a triage aid. The KEEP/ENRICH decision was based on the page’s stated reader task, completeness, and nearby AILooma coverage. No target word count was applied.
- Current post-update local REST count: 57 posts; median **849** (same approximate HTML-stripping method). This is not a quality score and includes material that a stricter editorial-body detector may exclude. Content additions were targeted at 24 posts, not distributed across the corpus for SEO.

## Article contracts and depth triage

“Intent boundary” names the primary task retained by that page and the adjacent topic intentionally left to the linked/neighbor article. ENRICH rows received specific, task-relevant additions; KEEP_AS_IS rows were not expanded in this phase. Earlier title, structure, sourcing, and overlap remediations remain documented in `CONTENT_REMEDIATION_IMPLEMENTATION.md`.

| ID | Live slug | Before | Decision | Unique reader task / boundary and reason |
|---:|---|---:|---|---|
| 401 | `how-ai-agents-improve-everyday-productivity` | P2 | KEEP_AS_IS | Knowledge workers assess agent use cases and limits; leaves capability definitions to 124 and control steps to 53. |
| 403 | `how-to-build-automated-workflow-with-n8n` | P1 | ENRICH | n8n builders make event workflows reliable; added workflow contract, idempotency/retry boundaries, validation cases, and official webhook reference; distinct from beginner build guides 31/373. |
| 405 | `best-free-productivity-software-windows-users` | P1 | ENRICH | Windows users shortlist free software by job; added task matrix, licensing caveats, and reversible file-fidelity check; not an Office-suite-only comparison (33) or PDF guide (258). |
| 407 | `best-browser-tools-faster-remote-work` | P1 | KEEP_AS_IS | Individual users choose browser features for focus and safer remote work; leaves team selection to 377 and handoff mechanics to 260. |
| 409 | `how-to-secure-windows-11-pc-step-by-step` | P1 | KEEP_AS_IS | Current Windows users audit existing device settings; not first-day setup (270) or the broader backup/recovery plan (379). |
| 371 | `how-ai-agents-changing-workflows-2026` | P1 | KEEP_AS_IS | Team owners redesign processes around governance and approval; not an individual suitability matrix (29) or developer release checklist (236). |
| 373 | `how-to-build-simple-n8n-automation-workflow` | P2 | KEEP_AS_IS | Reader completes a small n8n workflow; leaves reliability patterns to 403 and a specific research digest to 98. |
| 377 | `best-browser-productivity-tools-remote-work-2` | P1 | KEEP_AS_IS | Distributed teams select browser workflow tooling; separates product-selection criteria from solo tool choice (407) and async handoff routine (260). |
| 379 | `how-to-secure-windows-11-privacy-backup-recovery` | P1 | KEEP_AS_IS | Windows owners plan privacy, independent backup, and recovery; leaves day-one migration to 270 and device-setting audit to 409. |
| 270 | `how-to-secure-windows-11-pc-privacy-backup-guide` | P0 | ENRICH | New-PC owner follows first-day setup; added ordered account/update/encryption/backup/migration checks and Microsoft guidance; excludes the ongoing audit (409) and long-term plan (379). |
| 260 | `best-browser-productivity-tools-remote-work` | P0 | ENRICH | Small team improves async handoff; added a reusable handoff card, reversible pilot, and failure cases; not a browser-product ranking or team selection framework (377). |
| 258 | `best-free-pdf-editors-windows-features-limits-privacy` | P1 | ENRICH | Windows user picks a PDF tool by operation and data path; added task matrix and safe verification/redaction checks; not general free software selection (405). |
| 256 | `build-private-ai-knowledge-base-ollama-open-webui` | P1 | ENRICH | Local-AI builder verifies a document assistant’s data path; added source/index/model/log/deletion checks and a public-data prototype sequence; distinct from general local Ollama setup (150). |
| 254 | `small-vs-large-language-models-use-case` | P1 | KEEP_AS_IS | Technical buyer selects model size by workload constraints; remains a decision framework, not a setup tutorial or private knowledge-base build (256). |
| 242 | `interactive-ai-tutorials-non-technical-users` | P0 | ENRICH | Non-coder chooses an interactive lesson; added a practical learning-loop/accessibility checklist and a clearly labeled official exercise example; not a directory/ranking (214). |
| 240 | `ai-powered-software-tools-guide` | P0 | ENRICH | User assesses AI-enabled features by task, data, and consequence; added capability/data-path matrix and a small acceptance note; not the broader productivity roundup (35). |
| 238 | `free-ai-software-tutorials-practical-examples` | P0 | ENRICH | Learner performs standalone exercises with sample data; added expected outcomes, failure checks, and a minimal learning record; not the sequential portfolio path (218). |
| 236 | `ai-software-guide-developers` | P0 | ENRICH | Developer moves a bounded prototype through release gates; added evidence/stop criteria and a labeled illustrative example; distinct from organizational lifecycle roadmap (177). |
| 222 | `ai-software-tutorials-real-world-examples` | P0 | ENRICH | Learner follows reproducible examples using synthetic inputs; added input/output checks and explicit fictional/example labeling; makes no real-world test claim and is not a project directory (218). |
| 220 | `ai-software-tutorials-for-non-programmers` | P0 | ENRICH | Non-coder creates a small image-classification exercise; added ordered class/test/export/troubleshooting checks plus official project links; not an accuracy or production tutorial. |
| 218 | `free-ai-software-tutorials-hands-on-projects` | P0 | ENRICH | Learner builds a progressive project portfolio; added progression checkpoints and reproducibility notes; separate from standalone exercise cards (238). |
| 216 | `ai-software-tutorials-for-professionals` | P0 | ENRICH | Working professional plans an AI learning path tied to one permitted task; added stages, resource-goal mapping, and accountability boundaries; not a workplace safety procedure (179). |
| 214 | `best-ai-software-tutorials-for-beginners` | P1 | ENRICH | Beginner compares official learning resources; added audience/prerequisite matrix and provider links; intentionally distinct from course-selection checklist 194 and sequential path 200. |
| 202 | `ai-tutorials-for-non-programmers` | P2 | KEEP_AS_IS | Non-programmer follows a time-boxed learning sequence; kept distinct from project-first guide 173 and the no-code course chooser 242. |
| 200 | `best-free-ai-tutorials` | P0 | ENRICH | Learner follows a no-cost concept-to-project path; added staged checkpoints and current provider prerequisites; not a resource directory (214/181). |
| 198 | `ai-tutorials-for-developers` | P0 | ENRICH | Developer maps learning resources to stack/destination; added provider/resource fit and prerequisite checks; not a beginner roadmap (200). |
| 196 | `step-by-step-ai-tutorials` | P0 | ENRICH | Learner uses a verification-first loop for small projects; added expected-result/failure-case record; not the standalone sample exercise set (238). |
| 194 | `best-ai-tutorials-for-beginners` | P0 | KEEP_AS_IS | Reader chooses an appropriate first course using a narrow checklist; current criteria and starter project answer that bounded question without needing a directory expansion. |
| 181 | `free-ai-development-resources-hands-on-learning` | P2 | KEEP_AS_IS | Developer browses hands-on resources; remains a resource directory, separate from provider-to-stack mapping (198). |
| 179 | `how-non-technical-professionals-use-ai-safely` | P2 | KEEP_AS_IS | Non-technical employee applies workplace safety and review boundaries; not an AI training plan (216) or sensitive-data security guide (127). |
| 177 | `ai-implementation-roadmap-prototype-responsible-production` | P2 | KEEP_AS_IS | Organization plans responsible AI adoption across lifecycle; leaves implementation artifacts to developer gates (236). |
| 175 | `how-to-evaluate-learn-new-ai-tool` | P2 | KEEP_AS_IS | User evaluates one new AI tool systematically; distinct from feature-category selection (240). |
| 173 | `how-to-learn-ai-from-scratch-project-tutorial` | P2 | KEEP_AS_IS | Beginner learns foundational concepts through a first project; leaves the 21-day non-coder schedule to 202. |
| 162 | `notion-n8n-windows11-google-sheets-sync` | P2 | KEEP_AS_IS | Reader assembles a specific Notion/n8n/Sheets/backup integration; retained as an end-to-end build, not general automation advice. |
| 160 | `google-sheets-api-integration-notion-n8n` | P2 | KEEP_AS_IS | Reader connects Sheets and Notion through n8n; separate from weekly research digest (98) and backup monitoring (158). |
| 158 | `windows-11-backup-google-sheets-api` | P2 | KEEP_AS_IS | Technical reader monitors a Windows backup workflow; distinct from general file recovery advice (105/379). |
| 150 | `how-to-run-ollama-local-ai-on-windows` | P2 | KEEP_AS_IS | Windows user installs/runs local Ollama; leaves document retrieval/indexing and deletion boundaries to 256. |
| 147 | `n8n-research-automation-workflow-examples` | P2 | KEEP_AS_IS | Researcher surveys n8n automation patterns; not the single weekly digest implementation (98) or reliability tutorial (403). |
| 131 | `when-you-should-not-use-ai-five-tasks-human-judgment` | P2 | KEEP_AS_IS | Reader identifies tasks where human judgment should remain primary; retained as a boundary-setting explainer, not an AI adoption plan. |
| 127 | `how-to-protect-sensitive-data-when-using-ai-tools-at-work` | P2 | KEEP_AS_IS | Employee limits exposure of sensitive work data to AI tools; remains the data-protection guide, not the general safe-use workflow (179). |
| 105 | `practical-guide-backing-up-digital-life` | P2 | KEEP_AS_IS | Household/user designs a broad multi-device file backup routine; not Windows-specific recovery (379). |
| 103 | `7-free-windows-tools-diagnose-slow-unstable-pc` | P2 | KEEP_AS_IS | Reader chooses diagnostic utilities for a slow/unstable Windows PC; complements, but does not replace, symptom-led fixes (37/62). |
| 101 | `how-to-choose-note-taking-software-you-keep-using` | P2 | KEEP_AS_IS | Reader selects a sustainable notes app; leaves cross-tool productivity-system design to 59. |
| 98 | `build-weekly-research-digest-n8n-google-sheets` | P2 | KEEP_AS_IS | Reader builds one weekly research digest; distinct from general research workflow examples (147). |
| 96 | `how-to-fact-check-ai-generated-answers` | P0 | ENRICH | Reader checks claims in a single generated answer; added a source ledger, claim-to-evidence workflow, and illustrative contradiction case; not broad research planning (122). |
| 62 | `why-laptop-keeps-freezing-fix` | P2 | KEEP_AS_IS | Laptop owner diagnoses freeze symptoms safely; not general slow-PC optimization (37). |
| 59 | `how-to-build-simple-digital-productivity-system` | P2 | KEEP_AS_IS | Reader establishes a simple personal work system; not a review of one note-taking product (101). |
| 55 | `10-everyday-tasks-automate-n8n` | P2 | KEEP_AS_IS | Reader identifies everyday automation candidates; not a reliability-focused implementation guide (403). |
| 53 | `how-to-use-ai-agents-for-everyday-work-without-losing-control` | P0 | ENRICH | Employee applies a bounded agent with approval, logging, and rollback; added a task/control matrix and pilot stop criteria; separate from suitability screening (29). |
| 37 | `how-to-fix-slow-windows-11-pc` | P2 | KEEP_AS_IS | Windows owner troubleshoots system-wide slowness; not laptop-freeze diagnosis (62) or security hardening (409). |
| 35 | `best-ai-productivity-tools-actually-useful` | P2 | KEEP_AS_IS | User compares AI product categories for productivity; leaves per-feature data-path assessment to 240. |
| 33 | `best-free-microsoft-office-alternatives-work-study` | P2 | KEEP_AS_IS | Student/worker compares office suites and file compatibility; distinct from broad Windows utilities (405). |
| 31 | `n8n-tutorial-for-beginners-build-first-workflow` | P2 | KEEP_AS_IS | Beginner builds a first n8n workflow; not a second-step simple build (373) or reliability pattern (403). |
| 29 | `ai-agents-for-productivity-practical-use-cases` | P0 | ENRICH | Team/user screens agent tasks by risk and reversibility; added task matrix and pilot boundaries; not agent/assistant taxonomy (124) or operating controls (53). |
| 129 | `practical-framework-evaluating-ai-answers` | P0 | ENRICH | Reviewer evaluates AI answers by consequence and evidence; added case-level acceptance/stop criteria and a clearly fictional contradiction example; not the claim-check workflow (96). |
| 124 | `ai-agents-vs-ai-assistants-practical-difference` | P0 | ENRICH | Reader distinguishes system capability/authority; added a capability matrix and review/stop boundaries; leaves workflow selection to 29 and safe-operation steps to 53. |
| 122 | `how-to-use-ai-for-research-without-spreading-misinformation` | P0 | ENRICH | Researcher preserves source provenance while using AI; added a claim/source ledger and conflict-resolution workflow; separate from fact-checking one answer (96). |

**Triage totals:** 57 reviewed; **24 ENRICH**, **33 KEEP_AS_IS**. Of the 20 pre-update P0 articles, 19 were enriched and the intentionally bounded course-selection checklist (194) was kept as is. Five P1 pages (214, 256, 258, 403, 405) were enriched; the other six P1 pages were kept. All 26 P2 pages were kept. Thus **one ≤500-word article was intentionally left short**, and **24 short (≤800-word) articles received substantive additions**. No P2 article was expanded solely because it could hold more words.

## Changes actually applied to WordPress

24 existing published posts were updated in place: **29, 53, 96, 122, 124, 129, 196, 198, 200, 214, 216, 218, 220, 222, 236, 238, 240, 242, 256, 258, 260, 270, 403, 405**. Additions supplied task steps, decision matrices, validation and failure cases, prerequisites/limitations, illustrative synthetic examples, or context-specific primary-source links as appropriate. The newly added official references include Google Machine Learning Crash Course and exercises, Kaggle Learn, Hugging Face Learn, NIST AI RMF and Generative AI Profile, Microsoft Windows Backup/recovery guidance, n8n Webhook workflow documentation, and the Teachable Machine project/training references. Links are provider documentation or learning resources, not claims of endorsement or hands-on product testing.

Every update was checked through the WordPress response to retain `publish` status, slug, author ID, and category IDs. No title, slug, category, author, original publish date, media, or redirect was changed in this phase. The three merged secondary posts were not touched. No fabricated statistics, studies, rankings, benchmarks, first-hand experience, or outcome claims were added. Synthetic/fictional examples are labeled as illustrative.

## Sitemap architecture

- **Before:** one `/sitemap.xml` URL set.
- **After:** `/sitemap.xml` index with five meaningful child files: article, category, hub, static page, and author sitemap.
- `robots.txt` continues to expose only `https://ailooma.biz.id/sitemap.xml`.
- Article and page inventories are queried from the published WordPress REST API with the shared `wordpress` cache tag and a 300-second data revalidation. The author sitemap derives real author slugs embedded in those published post responses, avoiding a separate public WordPress users endpoint that returned HTTP 500. The existing WordPress webhook invalidates the shared tag. A normal post publish/update/draft therefore changes article and author sitemap membership or `lastmod` without requiring a Vercel redeploy. CMS-backed sitemaps render on request so CMS timeouts do not fail static-site generation. The category sitemap uses the five canonical category paths in the site’s declared navigation, not the intermittently timing-out CMS category listing endpoint. Hub routes come from the existing hub registry.
- Article sitemap locations are `/article/{slug}` only; `lastmod` comes from WordPress `modified`. Pages include the homepage and only the eight intended public policy/contact/about pages that are published in WordPress. Search is excluded. Authors are limited to those associated with live posts.
- Expected successful public inventory: 57 articles, 5 categories, 6 hubs, up to 9 public pages (home + 8 CMS pages), and only live article authors (currently 1). Totals will be replaced with observed public counts after deployment.

## Validation and deployment record

- `npm run lint` (Oxlint + TypeScript): **PASS**.
- First sandbox-only production build could not reach WordPress (`EACCES`); a permitted build then exposed a transient WordPress categories `504`. Category sitemap was changed to use the five stable, canonical navigation routes; CMS-driven article/page/author sitemaps are request-time with tagged data caching.
- `npm run build` after the adjustment and author-source fix: **PASS**, Next.js 16.3.4; 91 static/dynamic route outputs generated, including all five child sitemap routes and the index. The final sandboxed run printed recoverable `EACCES` fetch warnings for existing fallback-capable CMS page requests; generation completed successfully.
- First Vercel deployment of commit `4bbed04` completed. Public validation exposed an HTTP 500 in the author sitemap because the WordPress users listing endpoint was unavailable; author lookup was changed to embedded author metadata.
- Follow-up commit `947b0fb` deployed successfully on Vercel. The final public checks below were performed against this deployment.
- Expected redirect list retained in `next.config.ts`: all six permanent routes from `CONTENT_REMEDIATION_IMPLEMENTATION.md`; final HTTP destination/status and sitemap exclusion checks are pending deployment.

## Post-deployment verification results

Final public check after deployment `947b0fb`:

- Index and all five child sitemap URLs returned HTTP 200 and parsed as the expected XML roots. Index listed exactly the five intended child files.
- URL counts: articles 57; categories 5; hubs 6; pages 9 (home + eight CMS pages); authors 1. Total: **78**.
- All 57 WordPress-published posts appeared once in the article sitemap; CMS inventory also returned 57. Article coverage: **100%**.
- Article `<lastmod>` matched the WordPress `modified` value for **57/57** posts after normalizing PowerShell’s parsed ISO timestamps.
- Duplicate URLs across the five children: **0**. Wrong-host URLs: **0**. Search/noindex and six legacy/redirect URLs in sitemaps: **0**.
- The three merged posts were confirmed still Draft (IDs 234, 375, and 57); none appeared in the sitemap. All six known historical URLs returned HTTP **308** to their configured replacement; each target was in the live article sitemap.
- Eight representative pages spanning enriched/unchanged content, tutorials, AI agents, n8n, browser tools, and Windows guidance returned HTTP 200 and had matching canonical, Article and BreadcrumbList JSON-LD, author name, Open Graph, Twitter card, image, and contextual-link checks: **8/8**.
- The existing `robots.txt` implementation still names only `/sitemap.xml`; `/search` remains noindex and absent from the index. No live WordPress publish/draft webhook event was replayed as part of verification; automatic membership/modified-date updates are provided by the shared cache tag and existing webhook invalidation.

## Remaining human editorial review

The site owner/editor should verify that the tutorial steps still match the current product interfaces and account/licensing conditions before relying on them; inspect the linked official sources and source-specific caveats; and confirm that any personal expertise/author biography reflects the author accurately. Synthetic examples are instructional, not reported experiments. No AdSense approval outcome is implied by these technical/content checks.
