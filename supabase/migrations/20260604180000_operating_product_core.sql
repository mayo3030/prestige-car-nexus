create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'staff')),
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

create or replace function public.is_staff()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.roles
    where user_id = auth.uid()
      and role in ('admin', 'staff')
  );
$$;

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  stock_number text unique not null,
  slug text unique not null,
  title text not null,
  make text not null,
  model text not null,
  year integer not null,
  vehicle_type text not null,
  status text not null default 'available' check (status in ('available', 'pending', 'sold', 'draft')),
  price integer not null,
  monthly_payment integer,
  down_payment integer,
  lease_term_months integer,
  mileage integer not null default 0,
  location text not null default 'New Jersey',
  vin text,
  exterior_color text,
  interior_color text,
  transmission text,
  fuel_type text,
  drivetrain text,
  image_url text,
  description text,
  features text[] not null default '{}',
  history_report jsonb not null default '{}'::jsonb,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vehicle_media (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  url text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  source text not null default 'website',
  lead_type text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'won', 'lost')),
  first_name text not null,
  last_name text,
  email text not null,
  phone text,
  subject text,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  vehicle_interest text,
  message text,
  priority text not null default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.finance_applications (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'new' check (status in ('new', 'reviewing', 'approved', 'declined', 'closed')),
  first_name text not null,
  last_name text,
  email text not null,
  phone text,
  vehicle_price integer not null,
  down_payment integer not null,
  loan_term_months integer not null,
  interest_rate numeric(5,2) not null,
  requested_vehicle text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sell_submissions (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'new' check (status in ('new', 'reviewing', 'listed', 'rejected', 'closed')),
  make text not null,
  model text not null,
  year integer not null,
  mileage integer not null,
  vin text,
  exterior_color text,
  interior_color text,
  transmission text,
  description text,
  listing_type text not null default 'fixed_price' check (listing_type in ('fixed_price', 'auction')),
  asking_price integer not null,
  location text not null,
  seller_name text not null,
  seller_email text not null,
  seller_phone text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'requested' check (status in ('requested', 'confirmed', 'completed', 'cancelled')),
  first_name text not null,
  last_name text,
  email text not null,
  phone text,
  requested_time timestamptz,
  appointment_type text not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  source text not null default 'website',
  status text not null default 'active' check (status in ('active', 'needs_human', 'closed')),
  intent text,
  priority text not null default 'normal',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.tickets (
  id uuid primary key default gen_random_uuid(),
  ticket_number text unique not null,
  subject text not null,
  description text,
  status text not null default 'new' check (status in ('new', 'open', 'in_progress', 'resolved', 'closed')),
  priority text not null default 'normal' check (priority in ('low', 'normal', 'medium', 'high', 'urgent')),
  type text not null default 'general',
  lead_id uuid references public.leads(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.roles enable row level security;
alter table public.vehicles enable row level security;
alter table public.vehicle_media enable row level security;
alter table public.leads enable row level security;
alter table public.finance_applications enable row level security;
alter table public.sell_submissions enable row level security;
alter table public.appointments enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.tickets enable row level security;
alter table public.audit_logs enable row level security;

drop policy if exists "Profiles are self readable" on public.profiles;
create policy "Profiles are self readable"
on public.profiles for select
using (id = auth.uid() or public.is_staff());

drop policy if exists "Profiles are self writable" on public.profiles;
create policy "Profiles are self writable"
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "Staff can read roles" on public.roles;
create policy "Staff can read roles"
on public.roles for select
using (public.is_staff());

drop policy if exists "Public can read available vehicles" on public.vehicles;
create policy "Public can read available vehicles"
on public.vehicles for select
using (status = 'available' or public.is_staff());

drop policy if exists "Staff can manage vehicles" on public.vehicles;
create policy "Staff can manage vehicles"
on public.vehicles for all
using (public.is_staff())
with check (public.is_staff());

drop policy if exists "Public can read vehicle media" on public.vehicle_media;
create policy "Public can read vehicle media"
on public.vehicle_media for select
using (
  exists (
    select 1
    from public.vehicles v
    where v.id = vehicle_id
      and (v.status = 'available' or public.is_staff())
  )
);

drop policy if exists "Staff can manage vehicle media" on public.vehicle_media;
create policy "Staff can manage vehicle media"
on public.vehicle_media for all
using (public.is_staff())
with check (public.is_staff());

drop policy if exists "Public can create leads" on public.leads;
create policy "Public can create leads"
on public.leads for insert
with check (true);

drop policy if exists "Staff can manage leads" on public.leads;
create policy "Staff can manage leads"
on public.leads for all
using (public.is_staff())
with check (public.is_staff());

drop policy if exists "Public can create finance applications" on public.finance_applications;
create policy "Public can create finance applications"
on public.finance_applications for insert
with check (true);

drop policy if exists "Staff can manage finance applications" on public.finance_applications;
create policy "Staff can manage finance applications"
on public.finance_applications for all
using (public.is_staff())
with check (public.is_staff());

drop policy if exists "Public can create sell submissions" on public.sell_submissions;
create policy "Public can create sell submissions"
on public.sell_submissions for insert
with check (true);

drop policy if exists "Staff can manage sell submissions" on public.sell_submissions;
create policy "Staff can manage sell submissions"
on public.sell_submissions for all
using (public.is_staff())
with check (public.is_staff());

drop policy if exists "Public can create appointments" on public.appointments;
create policy "Public can create appointments"
on public.appointments for insert
with check (true);

drop policy if exists "Staff can manage appointments" on public.appointments;
create policy "Staff can manage appointments"
on public.appointments for all
using (public.is_staff())
with check (public.is_staff());

drop policy if exists "Staff can manage conversations" on public.conversations;
create policy "Staff can manage conversations"
on public.conversations for all
using (public.is_staff())
with check (public.is_staff());

drop policy if exists "Staff can manage messages" on public.messages;
create policy "Staff can manage messages"
on public.messages for all
using (public.is_staff())
with check (public.is_staff());

drop policy if exists "Staff can manage tickets" on public.tickets;
create policy "Staff can manage tickets"
on public.tickets for all
using (public.is_staff())
with check (public.is_staff());

drop policy if exists "Staff can read audit logs" on public.audit_logs;
create policy "Staff can read audit logs"
on public.audit_logs for select
using (public.is_staff());

insert into public.vehicles (
  stock_number, slug, title, make, model, year, vehicle_type, price, monthly_payment,
  down_payment, lease_term_months, mileage, location, exterior_color, interior_color,
  transmission, fuel_type, drivetrain, image_url, description, features, history_report, is_featured
) values
  (
    'JAL-2401', '2024-toyota-camry-xse', '2024 Toyota Camry XSE', 'Toyota', 'Camry XSE', 2024,
    'sedan', 34250, 429, 2999, 36, 18, 'North Bergen, NJ', 'Wind Chill Pearl', 'Black SofTex',
    '8-Speed Automatic', 'Gasoline', 'FWD',
    'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2670',
    'A new-car lease option sourced through Jersey Auto Lease partner dealers with transparent terms and home delivery.',
    array['Manufacturer warranty', 'Blind spot monitor', 'Heated front seats', 'Wireless Apple CarPlay', 'Free NJ delivery'],
    '{"accidents":0,"owners":0,"serviceRecords":0,"titleStatus":"New"}'::jsonb,
    true
  ),
  (
    'JAL-2402', '2024-honda-cr-v-ex-l', '2024 Honda CR-V EX-L', 'Honda', 'CR-V EX-L', 2024,
    'suv', 37900, 489, 3499, 36, 22, 'Jersey City, NJ', 'Platinum White Pearl', 'Gray Leather',
    'CVT', 'Gasoline', 'AWD',
    'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?q=80&w=2574',
    'Family-ready SUV lease with broker-negotiated pricing, dealer paperwork support, and driveway delivery.',
    array['AWD', 'Leather-trimmed seats', 'Honda Sensing', 'Power tailgate', 'Remote delivery paperwork'],
    '{"accidents":0,"owners":0,"serviceRecords":0,"titleStatus":"New"}'::jsonb,
    true
  ),
  (
    'JAL-2403', '2024-hyundai-tucson-sel', '2024 Hyundai Tucson SEL', 'Hyundai', 'Tucson SEL', 2024,
    'suv', 31875, 399, 2499, 36, 12, 'Elizabeth, NJ', 'Shimmering Silver', 'Black Cloth',
    '8-Speed Automatic', 'Gasoline', 'AWD',
    'https://images.unsplash.com/photo-1633695634169-2df5c9b41b86?q=80&w=2671',
    'High-value compact SUV lease with competitive monthly payment and strong factory coverage.',
    array['AWD', 'SmartSense safety', 'Heated seats', '10.25 inch display', 'Factory warranty'],
    '{"accidents":0,"owners":0,"serviceRecords":0,"titleStatus":"New"}'::jsonb,
    true
  )
on conflict (stock_number) do nothing;
