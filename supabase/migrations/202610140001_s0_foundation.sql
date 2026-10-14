-- Africa Buyer AI S0 foundation
-- Review before applying. This migration has not been executed against a live database.

create extension if not exists pgcrypto;

create type public.membership_role as enum ('viewer', 'analyst', 'reviewer', 'owner');
create type public.review_state as enum ('pending', 'verified', 'rejected', 'superseded');
create type public.buyer_grade as enum ('A', 'B', 'C', 'ungraded');
create type public.contact_kind as enum ('email', 'phone', 'whatsapp', 'website', 'other');
create type public.duplicate_state as enum ('pending', 'confirmed', 'dismissed', 'merged');
create type public.outreach_state as enum ('pending', 'approved', 'rejected', 'dispatched');

create table public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tenant_memberships (
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.membership_role not null default 'viewer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (tenant_id, user_id)
);

create or replace function public.can_access_tenant(target_tenant_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.tenant_memberships membership
    where membership.tenant_id = target_tenant_id
      and membership.user_id = auth.uid()
  );
$$;

create or replace function public.has_tenant_role(
  target_tenant_id uuid,
  allowed_roles public.membership_role[]
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.tenant_memberships membership
    where membership.tenant_id = target_tenant_id
      and membership.user_id = auth.uid()
      and membership.role = any(allowed_roles)
  );
$$;

revoke all on function public.can_access_tenant(uuid) from public;
revoke all on function public.has_tenant_role(uuid, public.membership_role[]) from public;
grant execute on function public.can_access_tenant(uuid) to authenticated;
grant execute on function public.has_tenant_role(uuid, public.membership_role[]) to authenticated;

create table public.buyers (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  legal_name text not null check (length(trim(legal_name)) > 0),
  trading_name text,
  country_code text not null default 'NG' check (country_code ~ '^[A-Z]{2}$'),
  city text,
  business_type text,
  operating_status public.review_state not null default 'pending',
  is_demo boolean not null default false,
  created_by uuid default auth.uid() references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, id)
);

create table public.buyer_identifiers (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  buyer_id uuid not null,
  identifier_type text not null check (identifier_type in ('registration', 'domain', 'phone', 'address', 'alias')),
  raw_value text not null,
  normalized_value text not null,
  is_verified boolean not null default false,
  created_at timestamptz not null default now(),
  foreign key (tenant_id, buyer_id) references public.buyers(tenant_id, id) on delete cascade
);

create index buyer_identifiers_lookup_idx
  on public.buyer_identifiers (tenant_id, identifier_type, normalized_value);

create table public.evidence_items (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  buyer_id uuid not null,
  source_url text not null,
  publisher text,
  captured_at timestamptz not null,
  claim_type text not null,
  claim_text text not null,
  review_status public.review_state not null default 'pending',
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  supersedes_evidence_id uuid,
  created_by uuid default auth.uid() references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, id),
  foreign key (tenant_id, buyer_id) references public.buyers(tenant_id, id) on delete cascade,
  foreign key (tenant_id, supersedes_evidence_id) references public.evidence_items(tenant_id, id)
);

create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  buyer_id uuid not null,
  kind public.contact_kind not null,
  value text not null,
  normalized_value text not null,
  lawful_use_basis text,
  is_company_level boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, id),
  foreign key (tenant_id, buyer_id) references public.buyers(tenant_id, id) on delete cascade
);

create index contacts_lookup_idx on public.contacts (tenant_id, kind, normalized_value);

create table public.contact_verifications (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  contact_id uuid not null,
  status public.review_state not null default 'pending',
  method text not null,
  verified_at timestamptz,
  evidence_id uuid,
  reviewer_id uuid default auth.uid() references auth.users(id),
  created_at timestamptz not null default now(),
  foreign key (tenant_id, contact_id) references public.contacts(tenant_id, id) on delete cascade,
  foreign key (tenant_id, evidence_id) references public.evidence_items(tenant_id, id)
);

create table public.buyer_assessments (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  buyer_id uuid not null,
  grade public.buyer_grade not null default 'ungraded',
  is_relevant_importer_or_wholesaler boolean not null default false,
  is_confirmed_importer boolean not null default false,
  rationale text not null,
  reviewer_id uuid default auth.uid() references auth.users(id),
  reviewed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  foreign key (tenant_id, buyer_id) references public.buyers(tenant_id, id) on delete cascade
);

create table public.duplicate_candidates (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  first_buyer_id uuid not null,
  second_buyer_id uuid not null,
  match_method text not null check (match_method in ('registration', 'domain', 'phone', 'address', 'fuzzy_name', 'fuzzy_address')),
  match_score numeric(5,4),
  state public.duplicate_state not null default 'pending',
  resolved_by uuid references auth.users(id),
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  check (first_buyer_id <> second_buyer_id),
  unique (tenant_id, first_buyer_id, second_buyer_id),
  foreign key (tenant_id, first_buyer_id) references public.buyers(tenant_id, id) on delete cascade,
  foreign key (tenant_id, second_buyer_id) references public.buyers(tenant_id, id) on delete cascade
);

create table public.data_provider_authorizations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  provider_name text not null,
  is_core_provider boolean not null default false,
  permits_commercial_saas boolean not null default false,
  written_evidence_id uuid,
  effective_from date,
  effective_until date,
  review_status public.review_state not null default 'pending',
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  foreign key (tenant_id, written_evidence_id) references public.evidence_items(tenant_id, id),
  check (effective_until is null or effective_from is null or effective_until >= effective_from)
);

create table public.cost_entries (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  buyer_id uuid,
  acquisition_batch text,
  provider_name text not null,
  purpose text not null,
  amount numeric(12,2) not null check (amount >= 0),
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  amount_cny numeric(12,2) not null check (amount_cny >= 0),
  conversion_basis text not null,
  counts_toward_s0 boolean not null default true,
  approved_by uuid references auth.users(id),
  incurred_at timestamptz not null,
  created_at timestamptz not null default now(),
  foreign key (tenant_id, buyer_id) references public.buyers(tenant_id, id)
);

create table public.supplier_evaluations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  supplier_label text not null,
  evaluated_at timestamptz,
  created_at timestamptz not null default now(),
  unique (tenant_id, id)
);

create table public.supplier_evaluation_items (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  evaluation_id uuid not null,
  buyer_id uuid not null,
  accepted boolean,
  notes text,
  created_at timestamptz not null default now(),
  unique (tenant_id, evaluation_id, buyer_id),
  foreign key (tenant_id, evaluation_id) references public.supplier_evaluations(tenant_id, id) on delete cascade,
  foreign key (tenant_id, buyer_id) references public.buyers(tenant_id, id) on delete cascade
);

create table public.delivery_batches (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  name text not null,
  status public.review_state not null default 'pending',
  approved_by uuid references auth.users(id),
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, id)
);

create table public.delivery_batch_buyers (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  delivery_batch_id uuid not null,
  buyer_id uuid not null,
  eligibility_snapshot jsonb not null,
  created_at timestamptz not null default now(),
  unique (tenant_id, delivery_batch_id, buyer_id),
  foreign key (tenant_id, delivery_batch_id) references public.delivery_batches(tenant_id, id) on delete cascade,
  foreign key (tenant_id, buyer_id) references public.buyers(tenant_id, id)
);

create table public.outreach_requests (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  buyer_id uuid not null,
  channel public.contact_kind not null,
  draft_body text not null,
  status public.outreach_state not null default 'pending',
  requested_by uuid not null default auth.uid() references auth.users(id),
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  dispatched_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (tenant_id, buyer_id) references public.buyers(tenant_id, id),
  check (status <> 'dispatched' or (reviewed_by is not null and reviewed_at is not null and dispatched_at is not null))
);

create table public.audit_events (
  id bigint generated always as identity primary key,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  actor_id uuid default auth.uid() references auth.users(id),
  entity_type text not null,
  entity_id uuid not null,
  action text not null,
  previous_state jsonb,
  new_state jsonb,
  occurred_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger tenants_set_updated_at before update on public.tenants
for each row execute function public.set_updated_at();
create trigger memberships_set_updated_at before update on public.tenant_memberships
for each row execute function public.set_updated_at();
create trigger buyers_set_updated_at before update on public.buyers
for each row execute function public.set_updated_at();
create trigger evidence_set_updated_at before update on public.evidence_items
for each row execute function public.set_updated_at();
create trigger contacts_set_updated_at before update on public.contacts
for each row execute function public.set_updated_at();
create trigger delivery_batches_set_updated_at before update on public.delivery_batches
for each row execute function public.set_updated_at();
create trigger outreach_requests_set_updated_at before update on public.outreach_requests
for each row execute function public.set_updated_at();

create or replace function public.protect_evidence_provenance()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if row(old.tenant_id, old.buyer_id, old.source_url, old.publisher, old.captured_at, old.claim_type, old.claim_text, old.created_by, old.created_at)
     is distinct from
     row(new.tenant_id, new.buyer_id, new.source_url, new.publisher, new.captured_at, new.claim_type, new.claim_text, new.created_by, new.created_at) then
    raise exception 'Evidence provenance is immutable; create a superseding evidence item';
  end if;
  return new;
end;
$$;

create trigger evidence_provenance_immutable
before update on public.evidence_items
for each row execute function public.protect_evidence_provenance();

alter table public.tenants enable row level security;
alter table public.tenant_memberships enable row level security;

create policy tenants_read on public.tenants
for select to authenticated using (public.can_access_tenant(id));
create policy tenants_owner_update on public.tenants
for update to authenticated
using (public.has_tenant_role(id, array['owner']::public.membership_role[]))
with check (public.has_tenant_role(id, array['owner']::public.membership_role[]));

create policy memberships_read on public.tenant_memberships
for select to authenticated using (public.can_access_tenant(tenant_id));
create policy memberships_owner_write on public.tenant_memberships
for all to authenticated
using (public.has_tenant_role(tenant_id, array['owner']::public.membership_role[]))
with check (public.has_tenant_role(tenant_id, array['owner']::public.membership_role[]));

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'buyers', 'buyer_identifiers', 'contacts', 'contact_verifications',
    'buyer_assessments', 'duplicate_candidates', 'data_provider_authorizations',
    'cost_entries', 'supplier_evaluations', 'supplier_evaluation_items',
    'delivery_batches', 'delivery_batch_buyers'
  ] loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format(
      'create policy %I on public.%I for select to authenticated using (public.can_access_tenant(tenant_id))',
      table_name || '_read', table_name
    );
    execute format(
      'create policy %I on public.%I for all to authenticated using (public.has_tenant_role(tenant_id, array[''analyst'', ''reviewer'', ''owner'']::public.membership_role[])) with check (public.has_tenant_role(tenant_id, array[''analyst'', ''reviewer'', ''owner'']::public.membership_role[]))',
      table_name || '_write', table_name
    );
  end loop;
end;
$$;

alter table public.evidence_items enable row level security;
create policy evidence_read on public.evidence_items
for select to authenticated using (public.can_access_tenant(tenant_id));
create policy evidence_insert on public.evidence_items
for insert to authenticated
with check (public.has_tenant_role(tenant_id, array['analyst', 'reviewer', 'owner']::public.membership_role[]));
create policy evidence_review_update on public.evidence_items
for update to authenticated
using (public.has_tenant_role(tenant_id, array['reviewer', 'owner']::public.membership_role[]))
with check (public.has_tenant_role(tenant_id, array['reviewer', 'owner']::public.membership_role[]));

alter table public.outreach_requests enable row level security;
create policy outreach_read on public.outreach_requests
for select to authenticated using (public.can_access_tenant(tenant_id));
create policy outreach_insert on public.outreach_requests
for insert to authenticated
with check (public.has_tenant_role(tenant_id, array['analyst', 'reviewer', 'owner']::public.membership_role[]));
create policy outreach_review_update on public.outreach_requests
for update to authenticated
using (public.has_tenant_role(tenant_id, array['reviewer', 'owner']::public.membership_role[]))
with check (public.has_tenant_role(tenant_id, array['reviewer', 'owner']::public.membership_role[]));

alter table public.audit_events enable row level security;
create policy audit_read on public.audit_events
for select to authenticated using (public.can_access_tenant(tenant_id));
create policy audit_insert on public.audit_events
for insert to authenticated
with check (public.has_tenant_role(tenant_id, array['analyst', 'reviewer', 'owner']::public.membership_role[]));

comment on table public.evidence_items is 'Append-oriented source claims. Provenance columns are immutable; corrections create superseding rows.';
comment on table public.outreach_requests is 'Draft and approval audit only. No automatic dispatch integration is created by this migration.';
comment on table public.cost_entries is 'Actual external data cost; labor is excluded from the frozen S0 unit-cost metric.';
