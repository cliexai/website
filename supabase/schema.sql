-- =============================================================
-- ClieX AI – Supabase Schema
-- Run this once in your Supabase project's SQL Editor
-- =============================================================

-- ── Leads table ───────────────────────────────────────────────
-- Stores every form submission from the landing page
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  full_name   text not null,
  business    text not null,
  email       text not null,
  whatsapp    text not null,
  plan        text not null default 'Growth',
  created_at  timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.leads enable row level security;

-- Public visitors can INSERT (submit the form)
create policy "Public can insert leads"
  on public.leads
  for insert
  with check (true);

-- Only authenticated users (admins) can SELECT (read the admin dashboard)
create policy "Admins can read leads"
  on public.leads
  for select
  using (auth.role() = 'authenticated');

-- Only authenticated users can DELETE leads
create policy "Admins can delete leads"
  on public.leads
  for delete
  using (auth.role() = 'authenticated');
