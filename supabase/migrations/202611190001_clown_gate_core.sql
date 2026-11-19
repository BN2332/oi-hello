-- Clown Gate: core tables for PIX collection and webhook idempotency.
-- Run this migration in the Supabase SQL Editor before enabling the API.

create extension if not exists pgcrypto;

create table if not exists public.cg_customers (
  id uuid primary key default gen_random_uuid(),
  cpf_cnpj_hash text not null unique,
  asaas_customer_id text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.cg_payments (
  id uuid primary key default gen_random_uuid(),
  idempotency_key text not null unique,
  external_reference text not null unique,
  asaas_payment_id text unique,
  amount_cents bigint not null check (amount_cents >= 100),
  description varchar(100) not null,
  customer_hash text not null,
  status text not null default 'CREATING',
  last_event text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create index if not exists cg_payments_status_created_idx
  on public.cg_payments (status, created_at desc);

create index if not exists cg_payments_customer_hash_idx
  on public.cg_payments (customer_hash);

create table if not exists public.cg_webhook_events (
  event_id text primary key,
  event_type text not null,
  asaas_payment_id text,
  payload jsonb not null,
  received_at timestamptz not null default now()
);

create index if not exists cg_webhook_events_payment_idx
  on public.cg_webhook_events (asaas_payment_id, received_at desc);

-- All writes are performed server-side with the Supabase service-role key.
-- Do not create public or authenticated policies for these tables.
alter table public.cg_customers enable row level security;
alter table public.cg_payments enable row level security;
alter table public.cg_webhook_events enable row level security;

revoke all on public.cg_customers from anon, authenticated;
revoke all on public.cg_payments from anon, authenticated;
revoke all on public.cg_webhook_events from anon, authenticated;

grant all on public.cg_customers to service_role;
grant all on public.cg_payments to service_role;
grant all on public.cg_webhook_events to service_role;
