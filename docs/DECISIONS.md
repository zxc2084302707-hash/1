# Decision Log

## 2026-10-14 — Repository and restart

Use `zxc2084302707-hash/1` as the sole repository. Start from the empty repository and do not depend on the inaccessible Lovable project or its historical claims.

## 2026-10-14 — S0 truth model

Represent each metric as `unmeasured`, `failing`, or `passing`. Overall S0 is `undetermined` if any metric is unmeasured, `failed` if all are measured and at least one fails, and `passed` only when every metric passes.

## 2026-10-14 — Data and persistence

Use clearly labelled synthetic fixtures until eligible real data exists. Keep the domain logic independent of React and Supabase. Store future tenant data in Supabase with membership-based RLS and append-oriented evidence history.

## 2026-10-14 — Outreach and database safety

Represent outreach as approval requests only. Do not integrate automatic dispatch in S0. Keep migrations as reviewable files and do not apply them to an unknown or production database during foundation work.

## 2026-10-14 — Runtime and routing

Use TanStack Start file routes and SSR. The installed build emits a Fetch handler, so `scripts/serve-built.mjs` provides the tested Node HTTP/static adapter. Development uses Vite through the pinned workspace-local Bun binary.

## 2026-10-14 — Database validation boundary

Keep the migration unapplied until a disposable local Supabase target is identified. Static schema validation does not substitute for pgTAP RLS execution; project status must keep the latter explicitly unrun.

