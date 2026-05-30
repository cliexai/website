-- =============================================================
-- ClieX AI – Leads Table Security (RLS Lockdown)
-- Run this in Supabase SQL Editor
-- =============================================================

-- ── Step 1: Make sure RLS is enabled on leads ─────────────────
alter table public.leads enable row level security;

-- ── Step 2: Drop any existing policies ────────────────────────
drop policy if exists "Allow anon insert" on public.leads;
drop policy if exists "Allow anyone to insert leads" on public.leads;
drop policy if exists "Allow authenticated to select" on public.leads;
drop policy if exists "Allow authenticated to delete" on public.leads;
drop policy if exists "Admins read leads" on public.leads;
drop policy if exists "Admins delete leads" on public.leads;
drop policy if exists "Public can insert leads" on public.leads;
drop policy if exists "Service role reads leads" on public.leads;
drop policy if exists "Service role deletes leads" on public.leads;
drop policy if exists "Admin reads leads" on public.leads;
drop policy if exists "Admin deletes leads" on public.leads;

-- ── Step 3: Create strict policies ────────────────────────────

-- Anyone (even unauthenticated visitors) can INSERT a lead.
-- This allows the contact form on cliexai.com to work.
create policy "Public can insert leads"
  on public.leads for insert
  with check (true);

-- Only the designated admin email can SELECT leads.
-- The admin authenticates via the 2FA flow in AdminPage.tsx.
create policy "Admin reads leads"
  on public.leads for select
  using (auth.jwt() ->> 'email' = 'cliexai@gmail.com');

-- Only the designated admin email can DELETE leads.
create policy "Admin deletes leads"
  on public.leads for delete
  using (auth.jwt() ->> 'email' = 'cliexai@gmail.com');
