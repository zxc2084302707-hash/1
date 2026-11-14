# Project Status

Last updated: 2026-10-14

## Current state

- Repository: active on branch `work`; GitHub remote is `zxc2084302707-hash/1`.
- Product implementation: S0 foundation implemented across seven responsive views.
- Domain controls: S0 evaluation, ownership/evidence eligibility, supplier-sample deduplication, and deterministic buyer deduplication implemented test-first.
- Real buyer data: none.
- Supabase business schema: 17-table migration and tenant-isolation test drafted; not applied.
- Production deployment: none.
- External outreach: none.
- S0: `undetermined`.

Historical Lovable claims, including seven pages and 23 passing tests, are not current evidence and are not inherited.

## Current cycle

Foundation implementation complete on the current branch. Current verification:

- TypeScript: passed (`bun run typecheck`).
- Unit/component tests: 26 passed, 0 failed (`bun run test:run`).
- ESLint: passed with zero warnings (`bun run lint`).
- Production SSR build: passed (`bun run build`).
- Mobile browser: 10 passed, 0 failed at 375 px (`bun run test:mobile`), covering all seven views, two distinct buyer details, and both not-found states.
- Supabase schema static check: passed for 17 required tables and security controls.
- Supabase pgTAP tenant-isolation test: unrun because no disposable local Supabase database is configured.
- Cloud environment draft: tested install and startup instructions saved; draft still requires user-side publication before a future environment inherits them.
- Independent branch review: all seven Important findings fixed; two Minor follow-ups remain documented (broader per-table live RLS tests and metric-card audit context).

## Blockers and next step

S0 cannot be evaluated because there is no eligible real buyer dataset, supplier review sample, or written provider authorization. Next, provision a disposable Supabase development database, run the migration and RLS tests, then design the lawful real-data acquisition pilot under the CNY 1,000 cap.


## PickVela site maintenance · 2026-11-13

The separate `buylink-ng-free` static-site branch corrected Pexels photo 11031636 from `.jpeg` (HTTP 404) to `.png` (HTTP 200). This does not change the Africa Buyer AI S0 state above. Checks for this change: `node --check docs/app.js`; `bun run typecheck`; `bun run test:run` (26 passed); `bun run lint` (passed after declaring static-site browser globals and removing dead no-op code); `bun run build` (passed); `bun run test:mobile` (10 passed). The PickVela public vote-flow and Nigerian mobile-network checks remain unrun.

## PickVela mobile voting path · 2026-11-14

The PickVela-only static site now leads TikTok visitors to the first poll from a visible home CTA and the header. It keeps `src=tiktok` or another source on poll links, navigation, refresh and return, so referral labels do not silently become `direct`. Poll choices have a clear tap instruction and more readable mobile text; their two reference images load eagerly on direct poll pages. Prominent WhatsApp prompts were moved to the poll flow while the existing Channel still publicly describes the former wholesale brand; the footer retains the original Channel link.

Local 375 px phone and 1280 px desktop screenshots were inspected. All four poll pages loaded their two images, and source-preserving navigation and no horizontal overflow were checked at 375 px. The browser smoke check intercepted `buylink_log_event` so it did not write test events. `node --check docs/app.js`, TypeScript, lint, build, 26 unit tests and 10 mobile tests passed. A real vote write and Nigerian-network test remain unrun.

The first visual check against the live site, before local interception was added, generated a **test** `view` event (`id=6`, `source=tiktok`, 2026-11-14 01:14 UTC). An earlier Work screenshot generated another (`id=5`, 2026-11-13 09:34 UTC). Neither is a real TikTok visitor. They remain in the append-only raw events for provenance and must be excluded from organic traffic claims. A read-only check after this work still showed 1 post-baseline vote, sourced `chatgptcom`, and 0 new interest records or share-button taps.
