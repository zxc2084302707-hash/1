---
name: architecture-review
description: Use when adding or changing Supabase tables, RLS policies, tenant ownership, browser data access, evidence history, deduplication, or outreach workflow boundaries.
---

# Architecture Review

Review trust boundaries before convenience. A `tenant_id` column without enforced RLS is not tenant isolation.

## Review contract

1. Identify actor, tenant, browser/server boundary, mutable records, and protected evidence.
2. Require membership-based RLS for every tenant-owned table and cover select, insert, update, and delete.
3. Test same-tenant success and cross-tenant denial using known UUIDs.
4. Keep service-role credentials on the server and out of client bundles.
5. Make evidence and approval history append-oriented; preserve actor, time, previous state, and new state.
6. Model outreach as `pending → approved/rejected`; dispatch remains a separate, human-authorized action.

## Decision result

Return `approved`, `approved with conditions`, or `blocked`, with the exact missing test or control. A demo deadline does not waive isolation.

## Common mistakes

- Trusting a client-supplied tenant ID.
- Enabling RLS without policies for every operation.
- Allowing automatic merges from fuzzy similarity.
- Applying a migration to an unidentified database during review.

