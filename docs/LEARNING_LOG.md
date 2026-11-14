# Learning Log

## 2026-10-14

- The connected repository is usable for Git fetch and push even though GitHub API access is unavailable.
- The environment has Node.js but no global Bun; the repository will bootstrap a pinned workspace-local Bun binary before using the Bun lockfile.
- S0 needs a three-state metric model because treating absent observations as zero incorrectly converts missing evidence into a measured failure.
- TanStack Start's current Vite build produces a Fetch-style SSR handler. A small Node adapter is required for a self-listening built application in this environment.
- Vitest and Playwright test patterns must be separated; otherwise Vitest attempts to execute Playwright suites outside its runner.
- Cross-tenant data safety needs composite tenant foreign keys as well as RLS; RLS alone does not prevent a same-tenant child row from referencing another tenant's UUID.
- At 375 px, converting record-table rows to labelled cards avoids horizontal scrolling while preserving the field meaning hidden with the desktop header.
- TanStack file routes use a trailing underscore to detach `/buyers/$buyerId` from the `/buyers` parent component; browser tests must assert the detail-page heading so list-card text cannot create a false pass.
- Supplier acceptance needs a distinct `(supplier, buyer)` sample tied to the eligible real-buyer population. Extra incomplete suppliers must not invalidate three completed ten-record samples.
- RLS approval safety depends on insert constraints as well as update policies. Pending-only inserts, reviewer-only transitions, and database audit triggers prevent pre-approved rows and preserve decision history.


## 2026-11-13 · PickVela static-site maintenance

- Pexels asset 11031636 is a PNG even though other site photo URLs are JPEG. Check actual CDN content and response codes instead of deriving extensions from neighboring assets.

## 2026-11-14 · PickVela mobile voting path

- Keeping a referral label only in JavaScript memory loses attribution when a visitor refreshes or opens a poll in a new tab. Put the source on navigable poll URLs and test the URL after reload.
- A page link with only a generic title and no `og:image` gives WhatsApp recipients little context. A static image per poll and a sender-choice challenge can be tested without storing names, phone numbers or unverifiable referral counts.
- A WhatsApp Channel with no measured audience is a destination for public-content viewers, not an acquisition source by itself. The owner ruled out personal-contact seeding because that audience is not targeted; future cold-start tests must separate public reach from site votes.
