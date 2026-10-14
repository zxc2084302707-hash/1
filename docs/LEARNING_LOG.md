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

