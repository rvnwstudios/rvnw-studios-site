create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  company text,
  project_details text not null,
  vertical text,
  disciplines text[] not null default '{}',
  budget text,
  timeline text
);
