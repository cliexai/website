-- =============================================================
-- ClieX AI – Client Portal Schema
-- Run this in Supabase SQL Editor (after schema.sql)
-- =============================================================

-- ── Profiles table ────────────────────────────────────────────
-- Auto-populated from Google OAuth data on sign-up
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  avatar_url  text,
  plan        text default 'free',
  created_at  timestamptz default now()
);

alter table public.profiles enable row level security;

-- Users can only read their OWN profile
create policy "Users read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can update their OWN profile
create policy "Users update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Admins (authenticated users with service role) can read all profiles
create policy "Admins read all profiles"
  on public.profiles for select
  using (auth.role() = 'service_role');

-- ── Trigger: auto-create profile on new user sign-up ──────────
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Drop and recreate the trigger to avoid duplicates on re-run
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
