import { readFileSync } from 'node:fs'
import process from 'node:process'
import { URL } from 'node:url'

const migration = readFileSync(
  new URL('../supabase/migrations/202610140001_s0_foundation.sql', import.meta.url),
  'utf8',
)

const requiredTables = [
  'tenants',
  'tenant_memberships',
  'buyers',
  'buyer_identifiers',
  'evidence_items',
  'contacts',
  'contact_verifications',
  'buyer_assessments',
  'duplicate_candidates',
  'data_provider_authorizations',
  'cost_entries',
  'supplier_evaluations',
  'supplier_evaluation_items',
  'delivery_batches',
  'delivery_batch_buyers',
  'outreach_requests',
  'audit_events',
]

for (const table of requiredTables) {
  if (!migration.includes(`create table public.${table}`)) {
    throw new Error(`Missing table: ${table}`)
  }
}

for (const control of [
  'create or replace function public.can_access_tenant',
  'create or replace function public.has_tenant_role',
  'enable row level security',
  'evidence_provenance_immutable',
  'evidence_pending_insert',
  'outreach_review_update',
  'outreach_pending_insert',
  'review_artifacts_reviewer_insert',
  'audit_review_mutation',
  'buyers_editor_insert',
]) {
  if (!migration.includes(control)) throw new Error(`Missing security control: ${control}`)
}

if (migration.includes("for all to authenticated using (public.has_tenant_role")) {
  throw new Error('Generic write policies must not grant analysts review or delete access')
}

process.stdout.write(
  `Schema static check passed: ${requiredTables.length} tables and required RLS controls found.\n`,
)

