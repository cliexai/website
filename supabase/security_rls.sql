-- =============================================================
-- ClieX AI – Leads Table Security (RLS Lockdown)
-- Run this in Supabase SQL Editor
-- =============================================================

-- ── Step 1: Make sure RLS is enabled on leads ─────────────────
alter table public.leads enable row level security;

-- ── Step 2: Drop any existing loose policies ──────────────────
-- (Safe to run even if policies don't exist yet)
drop policy if exists "Allow anon insert" on public.leads;
drop policy if exists "Allow anyone to insert leads" on public.leads;
drop policy if exists "Allow authenticated to select" on public.leads;
drop policy if exists "Allow authenticated to delete" on public.leads;
drop policy if exists "Admins read leads" on public.leads;
drop policy if exists "Admins delete leads" on public.leads;
drop policy if exists "Public can insert leads" on public.leads;

-- ── Step 3: CREATE strict policies ────────────────────────────

-- Policy 1: Anyone (even unauthenticated visitors) can INSERT a lead.
-- This allows the contact form on cliexai.com to work.
create policy "Public can insert leads"
  on public.leads
  for insert
  with check (true);

-- Policy 2: Only the service_role (used by Edge Functions and the
-- Supabase Dashboard) can SELECT all leads.
-- Regular anon/authenticated users CANNOT read the leads table.
create policy "Service role reads leads"
  on public.leads
  for select
  using (auth.role() = 'service_role');

-- Policy 3: Only the service_role can DELETE leads.
-- This means the admin dashboard frontend (which uses the anon key)
-- CANNOT delete leads directly. Deletes must go through an Edge Function.
create policy "Service role deletes leads"
  on public.leads
  for delete
  using (auth.role() = 'service_role');
