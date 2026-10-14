# Africa Buyer AI S0 Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Build and verify the first responsive Africa Buyer AI foundation with evidence-based buyer review, strict S0 acceptance logic, and a reviewable Supabase tenant-isolation migration.

**Architecture:** A TanStack Start application composes small feature modules over a framework-independent TypeScript domain model. The browser initially uses labelled synthetic fixtures; Supabase SQL defines the future persistent model and RLS boundary without touching a live database.

**Tech Stack:** TanStack Start, React, TypeScript, Tailwind CSS, Bun 1.x, Vitest, Testing Library, ESLint, Playwright, Supabase PostgreSQL.

**Spec:** `docs/superpowers/specs/2026-10-14-africa-buyer-ai-s0-foundation-design.md`

## Global Constraints

- S0 is `undetermined` while any required metric is unmeasured and passes only when all nine frozen criteria pass.
- Demo data is visibly labelled and excluded from every real acceptance metric.
- No paid API, purchase, external outreach, production deployment, or destructive database operation.
- Total S0 budget is capped at CNY 1,000; this implementation records CNY 0 external spend.
- Supabase service-role credentials never enter browser code.
- All tenant-owned rows use RLS and cross-tenant access is denied.
- The seven views must work at 375 px without horizontal page overflow.
- GitHub repository `zxc2084302707-hash/1` remains the sole code source.

## Review Focus

- An empty or demo-only dataset must produce `unmeasured` metrics and overall `undetermined`.
- Exact threshold values must pass while values immediately below them fail.
- A qualified-buyer cost denominator of zero must remain unmeasured rather than divide by zero.
- Supplier reviews must include three distinct suppliers with ten eligible decisions each before the metric is measured.
- Tenant B must be unable to select or mutate tenant A records even when it knows their UUIDs.

---

### Task 1: Repository memory, conventions, and reproducible scaffold

**Files:**
- Create: `AGENTS.md`, `.gitignore`, `.editorconfig`, `package.json`, `tsconfig.json`, `vite.config.ts`, `eslint.config.js`, `vitest.config.ts`
- Create: `docs/PRODUCT_VISION.md`, `docs/PRD.md`, `docs/DECISIONS.md`, `docs/PROJECT_STATUS.md`, `docs/DATA_MODEL.md`, `docs/COST_LEDGER.md`, `docs/LEARNING_LOG.md`
- Create: `.agents/skills/{data-validation,architecture-review,cost-aware-development,learning-handoff}/SKILL.md`

**Interfaces:**
- Consumes: approved design specification.
- Produces: Bun scripts `dev`, `build`, `typecheck`, `lint`, `test`, `test:run`, and `check`; durable project rules for all later tasks.

- [x] Create the package and toolchain files with pinned compatible dependencies and strict TypeScript settings.
- [x] Run the Bun bootstrap through a workspace-local Bun binary and verify a frozen install is repeatable.
- [x] Write the eight memory documents and four focused skills with S0, cost, evidence, and handoff controls.
- [x] Run `git diff --check` and commit `chore: establish project foundation`.

### Task 2: S0 domain model and acceptance engine

**Files:**
- Create: `src/domain/types.ts`, `src/domain/s0.ts`, `src/domain/s0.test.ts`

**Interfaces:**
- Produces: `evaluateS0(input: S0Input): S0Evaluation`, `MetricState`, `S0State`, and typed metric evidence.

- [x] Write failing tests for empty data, demo exclusion, all exact thresholds, each below-threshold case, zero cost denominator, incomplete supplier samples, and missing written authorization.
- [x] Run `bun test src/domain/s0.test.ts` and verify the tests fail because the evaluator is absent.
- [x] Implement the minimum typed evaluator with nine named metrics and explicit numerator, denominator, threshold, and exclusion text.
- [x] Run the domain tests and verify all pass.
- [x] Commit `feat: add evidence-based S0 evaluation`.

### Task 3: Normalization and buyer deduplication

**Files:**
- Create: `src/domain/normalize.ts`, `src/domain/normalize.test.ts`

**Interfaces:**
- Produces: `normalizeCompanyName(value: string): string`, `normalizeDomain(value: string): string | null`, `normalizePhone(value: string): string | null`, and `deterministicDuplicateKeys(buyer: BuyerIdentity): string[]`.

- [x] Write failing tests for case, punctuation, Nigerian phone formats, URL subpaths, invalid values, and equivalent deterministic identifiers.
- [x] Run the focused tests and verify failure.
- [x] Implement normalization and strong-key generation; fuzzy names must never generate an automatic merge key.
- [x] Run focused and domain tests, then commit `feat: add safe buyer deduplication keys`.

### Task 4: Responsive application shell and seven views

**Files:**
- Create: `index.html`, `src/main.tsx`, `src/styles.css`, `src/app/App.tsx`, `src/app/routes.ts`, `src/app/demo-data.ts`
- Create: `src/components/{AppShell,StatusBadge,MetricCard,BuyerCard,EvidenceList}.tsx`
- Create: `src/pages/{Overview,Buyers,BuyerDetail,Evidence,Contacts,Costs,S0}.tsx`
- Create: `src/app/App.test.tsx`

**Interfaces:**
- Consumes: `evaluateS0`, domain types, and explicitly synthetic fixtures.
- Produces: seven client-routed views, accessible navigation, and an `Undetermined` demo-only S0 screen.

- [x] Write failing component tests asserting seven navigation destinations, visible DEMO labels, text-backed statuses, and `Undetermined` S0 output.
- [x] Run the focused component test and verify failure.
- [x] Implement the application shell, routes, fixtures, reusable components, and pages with semantic markup and empty-state explanations.
- [x] Add responsive CSS that converts navigation and record grids at 720 px and prevents page-level horizontal overflow at 375 px.
- [x] Run component and domain tests, then commit `feat: build buyer intelligence review workspace`.

### Task 5: Supabase schema, RLS, and audit proposal

**Files:**
- Create: `supabase/migrations/202610140001_s0_foundation.sql`
- Create: `supabase/tests/tenant_isolation.sql`
- Modify: `docs/DATA_MODEL.md`

**Interfaces:**
- Produces: append-oriented evidence tables, tenant-owned buyer workflow tables, membership-based `can_access_tenant(uuid)` helper, RLS policies, and executable pgTAP-style isolation assertions.

- [x] Write the tenant-isolation SQL test first for same-tenant select, cross-tenant select denial, and cross-tenant mutation denial.
- [x] Define enums, tables, constraints, indexes, audit fields, and updated-at triggers without executing against a live database.
- [x] Enable RLS on every tenant-owned table and add membership-based select/insert/update/delete policies.
- [x] Document entity relationships, evidence immutability, deduplication, authorization, cost, and migration review procedure.
- [x] Run a SQL static validation check for required RLS statements and commit `feat: define Supabase tenant data model`.

### Task 6: Quality gates and 375 px browser validation

**Files:**
- Create: `playwright.config.ts`, `tests/mobile.spec.ts`
- Modify: product files only where checks expose a defect.

**Interfaces:**
- Consumes: running app at the configured local base URL.
- Produces: automated 375 px assertions for all seven routes, no horizontal overflow, navigation reachability, and visible page headings.

- [x] Write the mobile test and verify it fails before browser/runtime readiness.
- [x] Install the required Playwright Chromium binary only if absent and without paid services.
- [x] Run `bun run typecheck`, `bun run test:run`, `bun run lint`, and `bun run build`; diagnose and fix every setup or product failure.
- [x] Start the built app, run the 375 px Playwright suite across seven routes, and inspect captured failures before fixes.
- [x] Rerun all gates and commit `test: enforce mobile and build readiness`.

### Task 7: Final project memory and cloud environment handoff

**Files:**
- Modify: `docs/DECISIONS.md`, `docs/PROJECT_STATUS.md`, `docs/COST_LEDGER.md`, `docs/LEARNING_LOG.md`
- Modify: this plan's task checkboxes.

**Interfaces:**
- Produces: current evidence for files changed, commit, exact test outcomes, actual cost, blockers, next plan, and technical learning; tested cloud install/start instructions.

- [x] Record actual check counts and distinguish passed, failed, skipped, and unrun checks.
- [x] Record CNY 0 or any approved actual cost and retain S0 as `undetermined`.
- [x] Run `git status`, `git diff --check`, full `bun run check`, production build, and mobile suite once against the final state.
- [x] Save the tested install script and startup/readiness instructions to the cloud environment configuration draft.
- [x] Commit `docs: record verified S0 foundation status`, push `work`, and report the immutable commit SHA.
