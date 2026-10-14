# Data Model

The reviewable schema proposal is `supabase/migrations/202610140001_s0_foundation.sql`. It has not been applied to a live Supabase project.

## Ownership and isolation

`tenants` owns the business workspace and `tenant_memberships` maps authenticated users to `viewer`, `analyst`, `reviewer`, or `owner`. Every business table carries `tenant_id`. Composite foreign keys pair `tenant_id` with parent IDs so a child cannot reference another tenant's buyer, contact, evaluation, batch, or evidence item.

RLS uses two security-definer helpers with a fixed `public` search path:

- `can_access_tenant(uuid)` permits reads to any current member.
- `has_tenant_role(uuid, membership_role[])` permits writes by the required roles.

Viewer access is read-only. Analysts may insert pending buyers, identifiers, evidence, contacts, costs, supplier samples, and outreach drafts. Reviewer or owner authority is required for operating-state changes, identifier verification, contact verification, buyer assessment, duplicate resolution, provider authorization, delivery approval, evidence review, cost approval, and outreach approval. No business table exposes a delete policy, so deleting a buyer cannot cascade-delete its evidence. Membership changes require owner. Tenants are provisioned outside browser flows.

`supabase/tests/tenant_isolation.sql` is intended for a disposable local Supabase database. It proves same-tenant reads and writes, UUID-based cross-tenant select denial, cross-tenant insert rejection, cross-tenant update invisibility, and the membership helper boundary.

## Buyer identity and deduplication

`buyers` stores the legal/trading identity and operating status. `buyer_identifiers` stores normalized registration numbers, verified domains, verified phones, addresses, and aliases. The application may create deterministic duplicate candidates from registration, verified domain, verified phone, or strong address identity. Fuzzy name and address similarity only creates a `duplicate_candidates` review row; it never merges automatically.

A merge must preserve both buyer IDs in the duplicate record and move or retain aliases, evidence, contacts, assessments, and costs through a separately reviewed operation. This foundation does not execute merges.

## Evidence and contacts

`evidence_items` records the source URL, publisher, capture time, claim type, claim text, review status, reviewer, and optional superseded evidence. New evidence must enter as pending without reviewer fields. A database trigger makes provenance columns immutable. Corrections create a new row with `supersedes_evidence_id`; evidence has no delete policy.

`contacts` records company-level channels and lawful-use basis. `contact_verifications` records method, state, reviewer, evidence, and verification time. A contact contributes to S0 only when it is company-level, has a lawful-use basis, and has a verified review backed by evidence.

## Assessment, authorization, cost, and delivery

- `buyer_assessments` stores A/B/C grade, importer/wholesaler relevance, confirmed-importer status, rationale, and reviewer.
- `data_provider_authorizations` stores whether a core provider has reviewed written commercial SaaS permission and the evidence supporting it.
- `cost_entries` stores actual amount, currency, CNY conversion basis, approval, acquisition batch, and whether the cost counts toward S0. Labor remains excluded.
- `supplier_evaluations` and `supplier_evaluation_items` represent the three suppliers × ten records sample.
- `delivery_batches` and `delivery_batch_buyers` freeze eligibility snapshots for the final 20-company package.

## Outreach and audit

`outreach_requests` stores drafts and approval state. Analysts may create only pending, unreviewed requests; only reviewers or owners may approve or reject. No RLS policy permits a dispatched transition. The migration contains no email, WhatsApp, or dispatch integration.

`audit_events` is append-only under RLS and stores actor, action, entity, previous state, and new state. Security-definer triggers record insert/update history for evidence and every review/approval artifact. Authenticated clients have read-only access to the audit table; it has no client insert, update, or delete policy.

## Migration review procedure

1. Run `node scripts/check-supabase-schema.mjs` for the repository-level static contract.
2. Start a disposable local Supabase stack only when Docker/local Supabase is available.
3. Apply migrations from an empty local database.
4. Run `supabase test db supabase/tests/tenant_isolation.sql` or the installed CLI's equivalent.
5. Review failures before considering any remote target.
6. Identify and approve the exact non-production target before applying remotely. Production or destructive operations require a separate reviewed plan.

