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

## 2026-11-14 · First published TikTok URL and share challenge

The owner supplied a TikTok short link that redirects to `@pickvela0/video/7707837638136352030`, establishing that one video is publicly addressable. Public access did not establish its caption, actual visual/audio content, views, audience geography or completion metrics. The existing WhatsApp Channel still publicly previews as BuyLink NG with wholesale/B2B description, so the owner/admin device must change its profile before it can be presented as a coherent PickVela channel.

The site now shares a chosen A/B side through a direct poll challenge URL (`src=wa_friend&friend=a|b`), shows the incoming friend's choice and whether the two picks match after voting, and serves 1200×630 licensed-reference photo previews for all four poll pages. This requires no new database table or paid service. `share` events still represent button taps only. The baseline report now shows 1 new vote (`chatgptcom`), 0 new interest records, 0 share taps and 5 poll-view events; events 5 and 6 are known QA, while TikTok-labelled events 7 and 8 are of unknown provenance and cannot be claimed as users. See `PICKVELA-GROWTH-DIAGNOSIS.md` for the 48-hour distribution test.

## 2026-11-14 · Public audience correction

The owner rejected recruiting from personal WhatsApp contacts because they are not the target audience. The cold-start plan now treats public TikTok videos as the first discovery source and the existing WhatsApp Channel as a direct-vote/retention surface after the admin renames it. `PICKVELA-PUBLIC-LAUNCH-KIT.md` contains copy-ready channel profile text, the three remaining original MP4 links and native comment-first captions. This is a planning/documentation update only; it does not imply the Channel was renamed or videos 2–4 were published. No new spend or production-site code change occurred in this update.

## 2026-11-14 · Account Check evidence and next content test

The owner supplied a green Account Check screenshot saying no unresolved issues. Its notice about the tool moving to Safety Center is not a penalty. This is positive account evidence within that tool's scope, not proof of individual For You eligibility. The public video remains accessible and its anonymous snapshot returned zero views at about 05:02 UTC. The next required owner evidence is the first video's Analytics/More insights eligibility and traffic page. No authenticated TikTok settings were changed by this assistant.

The profile and publishing guide now prepares `PickVela | Style Picks`, a concrete Nigeria style bio, own-brand disclosure and owned/licensed sound checks. A single 12-second bags scenario/comment review candidate was produced from the existing references and original music, while all four originals remain intact. The recommended direction is useful style decisions with native comments; website voting stays a separate pilot, not a requirement for the first interaction. At 09:22 UTC the anonymous public page still returned zero views for the first TikTok post; this cannot override owner-side analytics. Supabase read-only check still shows 1 post-baseline vote, 1 voting browser token, 0 new interests, 0 share-button taps and 7 poll-view events; public comments are not website participants. The vote source is `chatgptcom`, not proven TikTok or Nigeria traffic. Site checkout verification for this documentation cycle: typecheck passed, Vitest 26/26 passed, lint passed, build passed and Playwright mobile 10/10 passed. No site behavior or Render deployment changed.

Video delivery branch commit `1042dbd98dffcdbb993a2821813e269185c97cd4` contains the bag candidate, cover, contact sheet, render source and provenance manifest. Its immutable raw MP4 URL returned HTTP 200 with 1,661,573 bytes and the recorded SHA-256. It remains unpublished pending owner review and the individual TikTok post eligibility check.

The live site returned HTTP 200 at 09:25 UTC. The existing WhatsApp Channel public preview showed the old name `BuyLink NG` but a consumer-style description about everyday choices and free research. The admin-side rename is still pending; the description has already partly been updated.

## 2026-11-15 · Second post and editorial correction

The owner supplied the second TikTok URL, resolving to `@pickvela0/video/7708209919073226015`. Its public post page returns status 0, the expected errand caption, 12-second duration, PickVela original-music attribution and publication time 2026-11-15 01:51:30 UTC. Zero at this just-published stage cannot establish poor performance. The first post remains at zero both in the owner's report and the public HTML after more than a day. A green account check does not establish its recommendation eligibility; the next dependency is its in-app post status and analytics. No authenticated settings or posts were changed during this review.

`PICKVELA-EDITORIAL-RESET-2026-11-15.md` records official-page reference accounts, high- and low-reach examples, limits on what was visually reviewed, a 20–25 second before-buying-check script, and a precise first-post support draft. Automatic rollout of the remaining A/B originals is paused. The originals and the bag-test source branch remain intact. Useful buying checks are a content hypothesis, not a restored-reach or demand claim. The website has TikTok footer links already, but lacks a clickable TikTok entry and an established benefit beyond the same A/B question. No new growth feature, referral reward or paid distribution was added.

The read-only Supabase snapshot remains 1 post-baseline vote / 1 voting browser token (`chatgptcom`), 0 new interests, 0 share-button taps and 7 poll-view events including QA/unknown provenance. There are no verified Nigerian participants or new TikTok-attributed votes.

A specific sharing defect was fixed: when clipboard access is missing or denied, the site now exposes/selects the complete generated challenge URL rather than telling users to copy an address that omits their choice and share source. Browser tests cover an incoming A choice followed by a B vote, both clipboard failure modes, selection, mobile width and absence of a false copy event; 4/4 PickVela tests pass with all Supabase calls mocked. Typecheck passed, Vitest 26/26 passed, lint passed, build passed and the required general mobile suite 10/10 passed. These checks are not Nigerian-device/network or real-conversion evidence.

Production commit `1e569e943a5edced9a55c5e510cb4df06050095b` was deployed through existing Render static service `srv-dbr89cei0phs73f3q4t0`, deploy `dep-dbsh2m56e07s739rdqfg`, live at 2026-11-15 01:56:51 UTC. The live homepage returned HTTP 200; both live `app.js` and `style.css` matched the local SHA-256. This service uses a public repository URL and requires manual deployment despite its reported autoDeploy setting; the current Render deployment reference and deploy history were checked before a single explicit trigger. No duplicate deploy was queued. No account post, message or real pilot vote was sent during this work.

## 2026-11-15 · Owner analytics screenshot corrects zero-view inference

The owner supplied the first hair post's overview. It shows 0 video views, 1m59s total play time, 14.9s average watch time, 37.5% watched the full video and 0 likes/comments/shares/saves/new followers. This is inconsistent reporting, superseding the earlier inference of no viewing sample or no distribution. The screenshot's visible area has no explicit ineligible/review notice, but it does not show traffic sources, viewer counts, audience geography or the whole status interface. Neither a reporting delay/UI defect nor a recommendation restriction is diagnosed. No viewer count or organic/Nigerian audience is inferred from 119/14.9. The editorial reset document and support draft now describe the contradiction accurately. Next evidence: traffic sources / Viewers if available, and comparison of the same post after reopening or in an already accessible Studio view. Documentation-only update; prior product checks remain recorded above and were not rerun, no deploy or database write was needed, and new external cost is CNY 0.
