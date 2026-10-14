begin;

select plan(8);

-- Fixed test identities. Run only against a disposable local Supabase database.
insert into auth.users (
  id, instance_id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) values
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'tenant-a@example.invalid', '', now(), '{}', '{}', now(), now()),
  ('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'tenant-b@example.invalid', '', now(), '{}', '{}', now(), now());

insert into public.tenants (id, name) values
  ('a0000000-0000-0000-0000-000000000001', 'Tenant A'),
  ('b0000000-0000-0000-0000-000000000002', 'Tenant B');

insert into public.tenant_memberships (tenant_id, user_id, role) values
  ('a0000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'owner'),
  ('b0000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', 'owner');

insert into public.buyers (id, tenant_id, legal_name, country_code, is_demo) values
  ('a1000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Buyer A', 'NG', false),
  ('b1000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002', 'Buyer B', 'NG', false);

set local role authenticated;
select set_config('request.jwt.claim.sub', '10000000-0000-0000-0000-000000000001', true);

select results_eq(
  $$ select legal_name from public.buyers order by legal_name $$,
  $$ values ('Buyer A'::text) $$,
  'Tenant A can select its own buyer and cannot see Tenant B'
);

select is(
  (select count(*) from public.buyers where id = 'b1000000-0000-0000-0000-000000000002'),
  0::bigint,
  'Knowing Tenant B buyer UUID does not bypass select RLS'
);

select lives_ok(
  $$ insert into public.buyers (tenant_id, legal_name, country_code) values ('a0000000-0000-0000-0000-000000000001', 'Buyer A2', 'NG') $$,
  'Tenant A writable role can insert into its own tenant'
);

select throws_ok(
  $$ insert into public.buyers (tenant_id, legal_name, country_code) values ('b0000000-0000-0000-0000-000000000002', 'Forbidden', 'NG') $$,
  '42501',
  null,
  'Tenant A cannot insert into Tenant B'
);

select results_eq(
  $$ with changed as (
       update public.buyers set legal_name = 'Forbidden'
       where id = 'b1000000-0000-0000-0000-000000000002'
       returning 1
     ) select count(*) from changed $$,
  $$ values (0::bigint) $$,
  'Tenant A cannot update an invisible Tenant B row'
);

select is(
  (select legal_name from public.buyers where id = 'a1000000-0000-0000-0000-000000000001'),
  'Buyer A'::text,
  'Tenant A can read its own unchanged buyer'
);

select ok(public.can_access_tenant('a0000000-0000-0000-0000-000000000001'), 'Membership helper accepts Tenant A');
select isnt(public.can_access_tenant('b0000000-0000-0000-0000-000000000002'), true, 'Membership helper rejects Tenant B');

select * from finish();
rollback;
