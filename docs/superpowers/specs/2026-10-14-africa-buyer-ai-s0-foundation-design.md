# Africa Buyer AI S0 Foundation Design

Date: 2026-10-14  
Status: Proposed for implementation review

## Purpose

Africa Buyer AI is a multi-tenant B2B buyer intelligence workspace for Chinese exporters selling into Africa. The first market is Nigerian small appliances, including blenders, electric kettles, and irons. The first commercial deliverable is a reviewed list of 20 A/B-grade companies with lawful, usable business contact details, source evidence, and a clear match rationale.

This foundation must support discovery, verification, scoring, deduplication, review, cost control, and human-approved follow-up. It must never represent demo data or unmeasured acceptance criteria as real progress.

## S0 acceptance contract

S0 remains `undetermined` until every required metric is measured from eligible, non-demo evidence. It passes only when all of these conditions pass:

- 100 real, unique candidate companies.
- At least 90% are verified operating businesses.
- At least 70% are relevant A/B-grade importers or wholesalers.
- At least 15 are confirmed grade-A importers.
- At least 60 of 100 have verified, lawful, usable company contact details.
- Data cost is at most CNY 8 per qualified A/B buyer, excluding labor.
- All 20 delivered companies are A/B grade and meet the contact requirement.
- Three Chinese suppliers each review 10 records, with at least 70% acceptance.
- At least one core data provider has written authorization for commercial SaaS use.

Demo records, records without tenant ownership, and records lacking the required verification evidence are excluded from denominators and delivery counts. A metric with no eligible observations is `unmeasured`, never zero and never passed. Before S0 passes, the product must not claim commercial delivery readiness.

## Scope

The first implementation provides:

1. A responsive application shell and seven focused views: overview, buyers, buyer detail, evidence review, contact verification, cost ledger, and S0 acceptance.
2. A typed domain layer containing the acceptance calculation and validation rules.
3. A local demonstration repository with clearly labelled synthetic records so the interface works without Supabase credentials.
4. A Supabase migration proposal covering tenants, users, buyers, evidence, contacts, scoring, deduplication, authorization, cost, supplier evaluation, delivery selection, and outreach approval.
5. Row-level security policies and SQL tests or assertions demonstrating tenant isolation.
6. Project memory documents and four project-specific skills.
7. Automated unit tests, type checking, linting, production build validation, and a 375 px layout check.

Real buyer acquisition, paid data-provider integrations, production deployment, automated external outreach, and destructive database execution are outside this implementation.

## Technical approach

Use a single TanStack Start application with React, TypeScript, Tailwind CSS, Bun, Vitest, and Supabase. Keep domain calculations independent of React and Supabase so acceptance logic can be tested without a browser or database.

The application has four layers:

- `domain`: entities, status enums, validation, scoring inputs, and S0 calculations. It contains no framework or database imports.
- `data`: repository interfaces and adapters. The initial demo adapter returns explicitly synthetic data; a Supabase adapter can be enabled only when required environment variables exist.
- `features`: buyer review, evidence, contacts, costs, authorization, supplier evaluation, delivery, and S0 presentation.
- `routes`: pages and navigation composed from feature modules.

Server-side code owns Supabase service interactions. Browser code may use only the public client configuration and authenticated tenant-scoped operations. Service-role credentials must never be exposed to browser bundles.

## Core data model

Every tenant-owned row includes `tenant_id`, timestamps, and an immutable identifier. The minimum tables are:

- `tenants` and `tenant_memberships` for organization ownership and roles.
- `buyers` for normalized legal and trading identities, operating status, geography, business type, product categories, and demo status.
- `buyer_identifiers` for registration numbers, domains, phones, addresses, and other deduplication keys.
- `evidence_items` for source URL, publisher, captured time, claim type, excerpt or structured fact, accessibility, and review status.
- `contacts` and `contact_verifications` for company-level contact channels, lawful-use basis, verification method, status, and verification time.
- `buyer_assessments` for grade, importer/wholesaler relevance, rationale, reviewer, and linked evidence.
- `duplicate_candidates` for deterministic or reviewed duplicate links and resolution.
- `data_provider_authorizations` for provider, permitted use, written evidence, effective dates, and review status.
- `cost_entries` for provider, purpose, amount, currency, conversion basis, related buyer or acquisition batch, and eligibility.
- `supplier_evaluations` and `supplier_evaluation_items` for the three-by-ten external review requirement.
- `delivery_batches` and `delivery_batch_buyers` for the final 20-company package and its eligibility snapshot.
- `outreach_requests` for proposed messages, approval status, approver, and dispatch audit fields. No automatic dispatch integration is included.

Evidence is append-oriented. Corrections create a new review or superseding evidence reference instead of erasing provenance. Acceptance results are computed from current eligible records and stored snapshots may be used only for audit history.

## Deduplication

Deterministic matches use normalized registration number, verified domain, verified phone, and strong address identity. Fuzzy name or address similarity creates a duplicate candidate for human review and never merges records automatically. A merge operation must preserve aliases, evidence, contacts, costs, and an audit trail.

## Tenant isolation and roles

Supabase authentication maps a user to one or more tenant memberships. RLS permits access only when `tenant_id` belongs to the authenticated user's active membership. Roles are:

- `viewer`: read tenant records.
- `analyst`: create and update research records.
- `reviewer`: approve evidence, contacts, assessments, duplicates, delivery membership, and outreach requests.
- `owner`: manage memberships and tenant configuration.

Cross-tenant reads and writes are denied even when a caller knows another record's UUID. Authorization helper functions must use stable SQL and avoid trusting tenant identifiers supplied only by the client.

## S0 state model

Each metric returns:

- `unmeasured`: no eligible population or required review sample exists.
- `failing`: measured but below its threshold.
- `passing`: measured and at or above its threshold.

Overall S0 returns `undetermined` while any metric is unmeasured, `failed` when all metrics are measured and one or more fail, and `passed` only when every metric passes. The UI displays the numerator, denominator, threshold, evidence timestamp, and exclusion reasons. It never substitutes demo records or estimates.

## User experience

The desktop layout uses a persistent navigation rail and a compact review workspace. At 375 px the navigation becomes a top bar plus an accessible menu, cards become a single column, tables switch to labelled record cards, and primary actions remain reachable without horizontal scrolling.

All synthetic content carries a visible `DEMO` badge. Status colors are paired with text. Empty states explain which evidence or review is missing. The S0 page leads with `Undetermined` until real measurements exist and includes no celebratory or commercial-readiness language.

## Error handling and auditability

Repository operations return typed errors distinguishing authentication, authorization, validation, connectivity, and unexpected failures. UI errors explain the recoverable action without exposing secrets. Mutating review actions record actor, timestamp, previous state, and new state. External source failures do not downgrade verification silently; they create a pending recheck state.

## Testing and validation

Required checks are:

- Unit tests for every S0 boundary, especially empty datasets, demo exclusion, exact thresholds, missing authorization, and incomplete supplier reviews.
- Unit tests for normalization and deterministic duplicate keys.
- Component tests for status labelling and mobile table-to-card presentation where practical.
- TypeScript checking, ESLint, and a production build.
- Supabase policy tests demonstrating same-tenant access and cross-tenant denial for each tenant-owned table.
- A 375 px browser inspection covering all seven views, navigation, overflow, action reachability, labels, and focus behavior.

No check may be reported as passed unless it executed in the current repository state. Historical Lovable results are not inherited.

## Documentation and project memory

The repository will maintain `AGENTS.md` plus:

- `docs/PRODUCT_VISION.md`
- `docs/PRD.md`
- `docs/DECISIONS.md`
- `docs/PROJECT_STATUS.md`
- `docs/DATA_MODEL.md`
- `docs/COST_LEDGER.md`
- `docs/LEARNING_LOG.md`

It will also contain project-local skills for `data-validation`, `architecture-review`, `cost-aware-development`, and `learning-handoff`. Each development cycle updates project status, decisions where needed, cost ledger, and learning log.

## Cost and operational controls

The total S0 budget cap is CNY 1,000. New paid services and paid APIs require prior approval. The initial build uses free local tooling and incurs CNY 0 external cost. No email, WhatsApp, or other external outreach is sent. No production environment is published. Supabase migrations remain reviewable files until the target database and approval are explicitly established.

## Delivery sequence

1. Establish repository conventions, memory documents, and project skills.
2. Scaffold the application and test harness with frozen dependency versions.
3. Implement the domain model and S0 calculation test-first.
4. Build the seven responsive views against labelled demo data.
5. Add the Supabase schema, RLS policies, evidence chain, deduplication, authorization, and cost migration proposal with policy tests.
6. Run all required checks and repair setup or product defects.
7. Update project memory, record zero or actual cost, commit the verified state, and save tested install/start instructions to the cloud environment draft.

## Completion criteria

This foundation is complete when the repository contains the documented system, all required local checks pass, every view has been inspected at 375 px, tenant isolation is represented by executable migration and policy tests, S0 displays `undetermined` with demo-only data, and the cloud environment draft contains tested reproducible setup and startup instructions. This does not constitute S0 commercial acceptance or production readiness.
